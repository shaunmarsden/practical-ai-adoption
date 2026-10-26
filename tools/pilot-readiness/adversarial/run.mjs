// Observation runner. assess() receives only each payload, never the expected recommendation.
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { assess, formErrors } from "../../../docs/pilot-readiness/model.mjs";
const here = new URL("./", import.meta.url),
  root = fileURLToPath(new URL("../../../", import.meta.url));
const raw = readFileSync(new URL("scenarios.json", here));
const digest = createHash("sha256").update(raw).digest("hex");
assert.equal(
  digest,
  readFileSync(new URL("expectations.sha256", here), "utf8").split(" ")[0],
  "Frozen predictions must not change",
);
const cases = JSON.parse(raw).cases;
const py = spawnSync(
  process.env.PYTHON || "python3",
  [
    "-c",
    "import sys,json;sys.path.insert(0,'tools/pilot-readiness');from pilot_readiness import assess;print(json.dumps([assess(p) for p in json.load(sys.stdin)]))",
  ],
  {
    cwd: root,
    input: JSON.stringify(cases.map((c) => c.payload)),
    encoding: "utf8",
  },
);
assert.equal(py.status, 0, py.stderr);
const python = JSON.parse(py.stdout);
const results = cases.map((c, i) => {
  const actual = assess(c.payload);
  assert.deepEqual(actual, python[i]);
  assert.deepEqual(formErrors(c.payload), {});
  let comparison = "Agreement";
  if (
    c.expected_recommendation === "HUMAN_REVIEW" &&
    actual.decision !== "READY FOR HUMAN REVIEW"
  )
    comparison = "Potential unnecessary restriction";
  if (c.expected_recommendation === "PROPORTIONATE_EXPERIMENT")
    comparison = "Potential unnecessary restriction";
  else if (
    c.expected_recommendation !== "HUMAN_REVIEW" &&
    actual.decision === "READY FOR HUMAN REVIEW"
  )
    comparison = "Potential false reassurance";
  const caveat =
    c.id === "AD-19"
      ? "Hidden falsity is not inferable from the payload. This is an information limit, not a confirmed software defect."
      : c.id === "AD-20"
        ? "The tool blocks expansion, not the bounded experiment. This is a scope/wording concern, not proof that it prohibits experimentation."
        : null;
  return {
    id: c.id,
    expected_recommendation: c.expected_recommendation,
    comparison,
    caveat,
    form_errors: formErrors(c.payload),
    browser: actual,
    python: python[i],
  };
});
const count = (key) =>
  results.reduce((acc, r) => {
    const v = key === "decision" ? r.browser.decision : r[key];
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});
const sourceFiles = [
  "docs/pilot-readiness/model.mjs",
  "docs/pilot-readiness/app.mjs",
  "docs/pilot-readiness/report.mjs",
  "tools/pilot-readiness/pilot_readiness.py",
];
const source_sha256 = Object.fromEntries(
  sourceFiles.map((p) => [
    p,
    createHash("sha256")
      .update(readFileSync(root + p))
      .digest("hex"),
  ]),
);
const output = {
  expectations_sha256: digest,
  source_sha256,
  total: results.length,
  by_comparison: count("comparison"),
  by_decision: count("decision"),
  comparison_basis:
    "Agreement refers to expansion direction, not equivalence of next actions. STOP_OR_CONTAIN versus DO NOT EXPAND still leaves containment to a human.",
  note: "Judgement comparison is an analytical opinion, not a ground-truth accuracy measurement. Python parity establishes implementation agreement only.",
  results,
};
writeFileSync(
  new URL("results.json", here),
  JSON.stringify(output, null, 2) + "\n",
);
const rows = results.map((r) => {
  const c = cases.find((c) => c.id === r.id);
  return `| ${r.id} | ${c.title} | ${r.expected_recommendation} | ${r.browser.decision} | ${r.comparison} |`;
});
writeFileSync(
  new URL("case-comparison.md", here),
  "# Frozen judgements and observed decisions\n\nPredictions are in [scenarios.json](scenarios.json), fixed under [expectations.sha256](expectations.sha256). Full actual outputs are in [results.json](results.json). No expected recommendation is passed to the assessor.\n\n| Case | Fictional situation | Expected recommendation | Actual output | Comparison |\n| --- | --- | --- | --- | --- |\n" +
    rows.join("\n") +
    "\n\nThese counts describe this deliberately challenging set, not a real-world error rate. AD-19 has hidden falsity; the payload does not reveal it. AD-20 is a scope concern: DO NOT EXPAND does not explicitly prohibit the offline exercise.\n",
);
console.log(
  JSON.stringify(
    {
      total: output.total,
      by_comparison: output.by_comparison,
      by_decision: output.by_decision,
      all_python_outputs_match: true,
      all_browser_form_inputs_accepted: true,
    },
    null,
    2,
  ),
);
const observableDisagreements = results.filter(
  (r) => r.comparison === "Potential false reassurance" && r.id !== "AD-19",
);
if (process.argv.includes("--strict") && observableDisagreements.length) {
  console.error(
    `Adversarial suitability check FAILED: ${observableDisagreements.length} observable-risk cases reach READY FOR HUMAN REVIEW. Hidden-deception case AD-19 is excluded from this failure count.`,
  );
  process.exitCode = 1;
}
