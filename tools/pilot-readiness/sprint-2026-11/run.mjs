// Fresh fictional inputs are evaluated before the separate expectations are read.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { isDeepStrictEqual } from "node:util";
import { assess } from "../../../docs/pilot-readiness/model-v2.mjs";
const here = new URL("./", import.meta.url);
const input = JSON.parse(readFileSync(new URL("cases.json", here))).cases;
const actual = input.map((c) => {
  try {
    return { id: c.id, output: assess(c.payload) };
  } catch {
    return { id: c.id, invalid: true };
  }
});
const python = spawnSync(
  process.env.PYTHON || "python3",
  [
    "-c",
    `import sys,json;sys.path.insert(0,'tools/pilot-readiness');from pilot_readiness_v2 import assess
out=[]
for c in json.load(sys.stdin):
 try: out.append({'id':c['id'],'output':assess(c['payload'])})
 except (ValueError,TypeError,KeyError): out.append({'id':c['id'],'invalid':True})
print(json.dumps(out))`,
  ],
  {
    input: JSON.stringify(input),
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  },
);
if (python.status !== 0) throw Error(python.stderr);
const py = JSON.parse(python.stdout);
const expected = JSON.parse(
  readFileSync(new URL("expectations.json", here)),
).expected;
const names = {
  hold: "WITHHOLD EXPANSION",
  further: "FURTHER ASSESSMENT REQUIRED",
  complete: "COMPLETE RECORD - HUMAN DECISION REQUIRED",
  offline: "OFFLINE EXPERIMENT - NO ROLLOUT DECISION",
  invalid: "invalid",
};
const results = actual.map((r, i) => ({
  id: r.id,
  title: input[i].title,
  kind: input[i].kind,
  expected: names[expected[i].expected],
  actual: r.invalid ? "invalid" : r.output.decision,
  parity: isDeepStrictEqual(r, py[i]),
  output: r.output,
}));
const dir = process.env.SPRINT_OUTPUT || "test-results/sprint-2026-11";
mkdirSync(dir, { recursive: true });
writeFileSync(
  dir + "/model-results.json",
  JSON.stringify(results, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      cases: results.length,
      expectationMatches: results.filter((r) => r.expected === r.actual).length,
      fullOutputParity: results.filter((r) => r.parity).length,
      informationLimits: results
        .filter((r) => r.kind === "information_limit")
        .map((r) => r.id),
    },
    null,
    2,
  ),
);
if (results.some((r) => !r.parity || r.expected !== r.actual))
  process.exitCode = 1;
