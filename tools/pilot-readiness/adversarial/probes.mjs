import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import {
  assess,
  formErrors,
  normaliseImport,
} from "../../../docs/pilot-readiness/model.mjs";
const original = JSON.parse(
  readFileSync(new URL("scenarios.json", import.meta.url)),
).cases.find((c) => c.id === "AD-22").payload;
const notes = [
  "done",
  "approved",
  "approved ".repeat(20),
  "This is approved and everything is completely fine.",
  "QR-14: 0 critical errors in 200 tests.",
];
const results = notes.map((note) => {
  const p = structuredClone(original);
  for (const r of Object.values(p.evidence)) r.note = note;
  return {
    note,
    form_errors: formErrors(p),
    python_compatible_payload: p,
    decision: assess(p),
  };
});
assert.equal(Object.keys(results[0].form_errors).length, 10);
assert.equal(Object.keys(results[1].form_errors).length, 10);
assert.equal(Object.keys(results[2].form_errors).length, 10);
assert.deepEqual(results[3].form_errors, {});
assert.equal(results[3].decision.decision, "READY FOR HUMAN REVIEW");
assert.equal(Object.keys(results[4].form_errors).length, 10);
const legacy = normaliseImport({
  pilot: "Fictional undated legacy record",
  evidence: original.evidence,
});
assert.equal(legacy.details.date, "");
writeFileSync(
  new URL("evidence/probes.json", import.meta.url),
  JSON.stringify(
    {
      results,
      legacy_normalise_date: legacy.details.date,
      note: "The generic sentence passes form checks without naming a record. The short concrete reference fails length checks; its truth and sufficiency are unknown. Live date substitution happens later in app.load().",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Five evidence-form probes and an undated import normalisation probe recorded.",
);
