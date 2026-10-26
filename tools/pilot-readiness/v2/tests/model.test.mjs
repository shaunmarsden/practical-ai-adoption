import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  assess,
  validate,
  normaliseImport,
  emptyRecord,
  criteria,
  decisions,
} from "../../../../docs/pilot-readiness/model-v2.mjs";
import { assess as assessV1 } from "../../../../docs/pilot-readiness/model.mjs";
import { example } from "../../../../docs/pilot-readiness/examples-v2.mjs";
const root = fileURLToPath(new URL("../../../../", import.meta.url));
const read = (path) => JSON.parse(readFileSync(root + path));
const original = read("tools/pilot-readiness/adversarial/scenarios.json");
const frozenOutputs = read("tools/pilot-readiness/adversarial/results.json");
const transformed = read(
  "tools/pilot-readiness/v2/fixtures/original-30-v2.json",
).cases;
const challenges = read(
  "tools/pilot-readiness/v2/fixtures/new-challenges.json",
).cases;
const py = (operation, inputs) => {
  const r = spawnSync(
    process.env.PYTHON || "python3",
    [
      "-c",
      `import sys,json;sys.path.insert(0,'tools/pilot-readiness');from pilot_readiness_v2 import assess,normalise_import,validate\ninputs=json.load(sys.stdin);out=[]\nfor p in inputs:\n try: out.append(${operation})\n except (ValueError,TypeError,KeyError): out.append({'invalid':True})\nprint(json.dumps(out))`,
    ],
    {
      cwd: root,
      input: JSON.stringify(inputs),
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    },
  );
  assert.equal(r.status, 0, r.stderr);
  return JSON.parse(r.stdout);
};
test("PR #74 originals, expectations and recorded V1 outputs remain intact", () => {
  const hash = createHash("sha256")
    .update(
      readFileSync(root + "tools/pilot-readiness/adversarial/scenarios.json"),
    )
    .digest("hex");
  assert.equal(
    hash,
    "6301443b722507364a8f84d00c89515027b6b88a617104f59db3a858dc4ebb21",
  );
  for (const [i, c] of original.cases.entries())
    assert.deepEqual(assessV1(c.payload), frozenOutputs.results[i].browser);
  assert.equal(
    createHash("sha256")
      .update(
        readFileSync(root + "tools/pilot-readiness/pilot_readiness_v1.py"),
      )
      .digest("hex"),
    frozenOutputs.source_sha256["tools/pilot-readiness/pilot_readiness.py"],
  );
  assert.equal(transformed.length, 30);
  transformed.forEach((c, i) => {
    assert.equal(
      c.source_expected_recommendation,
      original.cases[i].expected_recommendation,
    );
    for (const key of Object.keys(c.payload.evidence))
      assert.ok(
        c.payload.evidence[key].note.startsWith(
          original.cases[i].payload.evidence[key].note,
        ),
      );
  });
});
test("all thirty cases: 23 observable adverse cases withheld, hidden deception remains", () => {
  const adverse = frozenOutputs.results
    .filter(
      (r) => r.comparison === "Potential false reassurance" && r.id !== "AD-19",
    )
    .map((r) => r.id);
  assert.equal(adverse.length, 23);
  for (const c of transformed) {
    const r = assess(c.payload);
    if (adverse.includes(c.source_id))
      assert.equal(r.decision, decisions.hold, c.source_id);
  }
  assert.equal(
    assess(transformed.find((c) => c.source_id === "AD-19").payload).decision,
    decisions.complete,
  );
  assert.equal(
    assess(transformed.find((c) => c.source_id === "AD-20").payload).decision,
    decisions.offline,
  );
  assert.equal(
    assess(transformed.find((c) => c.source_id === "AD-22").payload).decision,
    decisions.complete,
  );
  assert.equal(
    assess(transformed.find((c) => c.source_id === "AD-24").payload).decision,
    decisions.further,
  );
});
test("new challenge predictions, including the explicit negative control", () => {
  for (const c of challenges)
    assert.equal(assess(c.payload).decision, c.expected_decision, c.id);
});
test("full Python/browser output parity across all fixtures", () => {
  const records = [...transformed, ...challenges].map((c) => c.payload);
  const expected = py("assess(p)", records);
  records.forEach((p, i) => assert.deepEqual(assess(p), expected[i]));
  assert.deepEqual(criteria, read("tools/pilot-readiness/v2/criteria.json"));
});
test("known issue overrides all flags, even without owner or next-step details", () => {
  for (const activity of [
    "offline_experiment",
    "bounded_internal_pilot",
    "real_world_workflow",
    "wider_deployment",
    "unknown",
  ]) {
    const p = example("complete");
    p.scope.activity = activity;
    p.material_issue.status = "unresolved";
    const r = assess(p);
    assert.equal(r.decision, decisions.hold);
    assert.equal(r.known_issues.length, 1);
    assert.match(r.next_actions[0].owner, /not yet assigned/);
    assert.match(r.next_actions[0].action, /Assign a responsible owner/);
  }
});
test("single-criterion No/Unknown and unsupported Yes cannot complete an operational record", () => {
  const records = [];
  for (const c of criteria)
    for (const status of ["no", "unknown", "yes"]) {
      const p = example("complete");
      p.evidence[c.key].status = status;
      if (status === "yes") p.evidence[c.key].reference = "";
      records.push(p);
      assert.equal(
        assess(p).decision,
        status === "no" ? decisions.hold : decisions.further,
      );
    }
  const expected = py("assess(p)", records);
  records.forEach((p, i) => assert.deepEqual(assess(p), expected[i]));
});
test("scope routing is proportionate and cannot bypass issue assessment or permission", () => {
  const p = example("offline");
  assert.equal(assess(p).decision, decisions.offline);
  for (const key of ["external_effects", "people_impact"]) {
    const r = structuredClone(p);
    r.scope[key] = "yes";
    assert.notEqual(assess(r).assessment_route, "offline_learning");
  }
  for (const status of ["unknown", "unresolved"]) {
    const r = structuredClone(p);
    r.material_issue.status = status;
    assert.notEqual(assess(r).decision, decisions.offline);
  }
  const refused = structuredClone(p);
  refused.evidence.data_approval.status = "no";
  assert.equal(assess(refused).decision, decisions.hold);
});
test("V1 migration preserves all source data but resets every stronger condition", () => {
  const records = original.cases.map((c) => c.payload);
  const legacy = structuredClone(records[0]);
  legacy.extra_record = { custom: "Preserve me" };
  legacy.evidence.baseline.custom_note = "Keep this too";
  delete legacy.details;
  records.push(legacy);
  const expected = py("normalise_import(p)", records);
  records.forEach((p, i) => {
    const migrated = normaliseImport(p);
    assert.deepEqual(migrated, expected[i]);
    assert.deepEqual(migrated.migration.source_record, p);
    assert.equal(migrated.migration.date_reviewed, false);
    for (const c of criteria) {
      assert.equal(migrated.evidence[c.key].status, "unknown");
      assert.equal(migrated.evidence[c.key].note, p.evidence[c.key].note);
    }
    assert.equal(assess(migrated).decision, decisions.further);
  });
  assert.equal(normaliseImport(legacy).details.date, "");
});
test("V2 round trip and reviewed migration date remain explicit", () => {
  const p = normaliseImport(original.cases[21].payload);
  const complete = example("complete");
  Object.assign(p, complete, { migration: p.migration });
  assert.equal(assess(p).decision, decisions.further);
  p.migration.date_reviewed = true;
  assert.equal(assess(p).decision, decisions.complete);
  assert.deepEqual(normaliseImport(p), p);
});
test("malformed records, unsupported fields and versions fail in both implementations", () => {
  const records = [
    null,
    [],
    {},
    example("complete"),
    example("complete"),
    example("complete"),
    example("complete"),
    example("complete"),
    example("complete"),
    example("complete"),
    example("complete"),
    example("complete"),
  ];
  records[3].schema_version = 3;
  records[4].material_issue.status = "probably";
  records[5].scope.extra = "not discarded";
  records[6].details.date = "2026-02-30";
  records[7].evidence.rollback.note = 3;
  records[8].evidence.baseline.reference = "x".repeat(501);
  records[9].migration = null;
  delete records[10].evidence.quality_review;
  records[11].fictional = "true";
  const expected = py("assess(p)", records);
  records.forEach((p, i) => {
    assert.throws(() => validate(p));
    assert.deepEqual(expected[i], { invalid: true });
  });
});
test("supported non-ASCII notes and UTF-16 size boundaries have parity", () => {
  const records = [];
  for (const note of [
    "Fictional café record - Ελληνικά - Кириллица",
    "X".repeat(3000),
    "🚀".repeat(1500),
    "🚀".repeat(1501),
  ]) {
    const p = example("complete");
    p.evidence.baseline.note = note;
    records.push(p);
  }
  const expected = py("assess(p)", records);
  records.forEach((p, i) => {
    if (i === 3) assert.throws(() => assess(p));
    else assert.deepEqual(assess(p), expected[i]);
  });
});
test("short checkable reference and finding are accepted; no artificial word-count gate", () => {
  const p = example("complete");
  p.evidence.quality_review = {
    status: "yes",
    reference: "QR-14",
    note: "0 critical errors in 200 tests; accepted.",
  };
  assert.equal(assess(p).decision, decisions.complete);
});

test("offline production gaps do not become a prohibition when only a date is missing", () => {
  const p = example("offline");
  p.details.date = "";
  p.evidence.quality_review.status = "no";
  const r = assess(p);
  assert.equal(r.decision, decisions.further);
  assert.equal(r.assessment_route, "offline_learning");
  assert.deepEqual(r, py("assess(p)", [p])[0]);
});
test("risk positions and Unicode whitespace share exact Python/browser behaviour", () => {
  const records = [];
  for (const issue of ["none_identified", "unresolved", "unknown"])
    for (const note of ["", "\ufeff", "\u0085", "Fictional accepted finding"]) {
      const p = example("complete");
      p.material_issue.status = issue;
      p.evidence.quality_review.reference = note;
      records.push(p);
    }
  const out = py("assess(p)", records);
  records.forEach((p, i) => assert.deepEqual(assess(p), out[i]));
});

test("an unknown issue position retains the specific human investigation action", () => {
  const p = example("further");
  const r = assess(p);
  assert.equal(r.decision, decisions.further);
  assert.ok(
    r.next_actions.some(
      (a) =>
        a.owner === p.material_issue.owner &&
        a.action === p.material_issue.next_step,
    ),
  );
  assert.deepEqual(r, py("assess(p)", [p])[0]);
});
