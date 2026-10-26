import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  criteria,
  fields,
  hardGates,
  assess,
  substantive,
  formErrors,
  normaliseImport,
  validDate,
} from "../../../../docs/pilot-readiness/model.mjs";
import { example } from "../../../../docs/pilot-readiness/examples.mjs";
const root = fileURLToPath(new URL("../../../../", import.meta.url));
const py = (source, input) => {
  const r = spawnSync(process.env.PYTHON || "python3", ["-c", source], {
    cwd: root,
    input: JSON.stringify(input),
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024,
  });
  assert.equal(r.status, 0, r.stderr);
  return JSON.parse(r.stdout);
};
const importPy =
  "import sys,json; sys.path.insert(0,'tools/pilot-readiness'); from pilot_readiness import assess,FIELDS,HARD_GATES; ";
test("criterion labels and five gates match the existing Python checker exactly", () => {
  const data = py(importPy + "print(json.dumps([FIELDS,HARD_GATES]))");
  assert.deepEqual(fields, data[0]);
  assert.deepEqual(hardGates, data[1]);
  assert.equal(criteria.length, 10);
});
test("adversarial scenarios A to D follow the specified decisions", () => {
  for (const [s, decision] of [
    ["A", "DO NOT EXPAND"],
    ["B", "LIMITED PILOT ONLY"],
    ["C", "READY FOR HUMAN REVIEW"],
    ["D", "LIMITED PILOT ONLY"],
  ]) {
    assert.equal(assess(example(s)).decision, decision);
    assert.deepEqual(formErrors(example(s)), {});
  }
});
test("scenario E: contradiction cannot be understood by these rules", () => {
  const p = example("E");
  assert.deepEqual(formErrors(p), {});
  assert.equal(assess(p).decision, "READY FOR HUMAN REVIEW");
  // This intentionally documents a weakness. The interface asks a human to review it.
  p.evidence.data_approval.status = "no";
  assert.equal(assess(p).decision, "DO NOT EXPAND");
});
test("scenario F: generic and repeated words fail the separate form checks", () => {
  assert.equal(Object.keys(formErrors(example("F"))).length, 10);
  for (const value of [
    "",
    "done",
    "approved",
    "done ".repeat(30),
    "approved done ".repeat(20),
  ])
    assert.equal(substantive(value), false);
  assert.equal(substantive(example("C").evidence.baseline.note), true);
});
test("full output parity for every single failed criterion, both non-Yes states, fixtures and scenarios", () => {
  const inputs = ["A", "B", "C", "D", "E"].map(example);
  inputs.push(
    JSON.parse(
      readFileSync(
        root + "tools/pilot-readiness/examples/fictional-not-ready.json",
      ),
    ),
  );
  for (const c of criteria)
    for (const status of ["no", "unknown"]) {
      const p = example("C");
      p.evidence[c.key] = { status, note: "" };
      inputs.push(p);
    }
  const outputs = py(
    importPy + "print(json.dumps([assess(p) for p in json.load(sys.stdin)]))",
    inputs,
  );
  inputs.forEach((p, i) => assert.deepEqual(assess(p), outputs[i]));
});
test("all 59,049 status combinations agree with Python decisions", () => {
  const expected = py(
    importPy +
      "import itertools; p={'pilot':'Fictional exhaustive check','evidence':{k:{'status':'yes','note':'Fictional evidence record with sufficient detail for form checks.'} for k in FIELDS}}; out=[]\nfor values in itertools.product(['yes','no','unknown'], repeat=10):\n for k,v in zip(FIELDS,values): p['evidence'][k]['status']=v\n out.append(assess(p)['decision'])\nprint(json.dumps(out))",
  );
  const statuses = ["yes", "no", "unknown"];
  for (let i = 0; i < 3 ** 10; i++) {
    let n = i;
    const p = example("C");
    for (let j = 9; j >= 0; j--) {
      p.evidence[criteria[j].key].status = statuses[n % 3];
      n = Math.floor(n / 3);
    }
    assert.equal(assess(p).decision, expected[i], `combination ${i}`);
  }
});
test("malformed payloads fail in both Python and browser decision functions", () => {
  const inputs = [
    null,
    [],
    {},
    { pilot: "", evidence: {} },
    example("C"),
    example("C"),
    example("C"),
    example("C"),
    example("C"),
  ];
  inputs[4].evidence.baseline.note = " ";
  delete inputs[5].evidence.baseline;
  inputs[6].evidence.extra = { status: "yes", note: "x" };
  inputs[7].evidence.rollback.status = "maybe";
  inputs[8].evidence.monitoring.note = 7;
  const out = py(
    importPy +
      "out=[]\nfor p in json.load(sys.stdin):\n try: assess(p); out.append(False)\n except (ValueError,TypeError): out.append(True)\nprint(json.dumps(out))",
    inputs,
  );
  inputs.forEach((p, i) => {
    assert.equal(out[i], true);
    assert.throws(() => assess(p));
  });
});
test("import round trip, bounds, missing details and actual calendar dates", () => {
  assert.deepEqual(normaliseImport(example("C")), example("C"));
  assert.equal(
    normaliseImport({
      pilot: "Old Python file",
      evidence: example("C").evidence,
    }).details.date,
    "",
  );
  const p = example("C");
  p.evidence.baseline.note = "x".repeat(3001);
  assert.throws(() => normaliseImport(p));
  for (const d of [
    "2026-02-30",
    "2026-99-99",
    "2026-1-01",
    "1899-01-01",
    "not-a-date",
  ])
    assert.equal(validDate(d), false);
  assert.equal(validDate("2028-02-29"), true);
});
