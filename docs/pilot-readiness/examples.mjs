import { criteria } from "./model.mjs";
const notes = [
  "Fictional trial brief TB-01 sets a target of 15 minutes less sorting time per batch, with no increase in serious errors.",
  "Fictional baseline BL-02 records 20 manual batches, their sorting times and error counts before the trial.",
  "Fictional test log TL-03 covers 30 routine batches and 10 difficult batches, with results and sampling limits recorded.",
  "Fictional review QR-04 names the operations reviewer and records each error, its severity and the resolution.",
  "Fictional ownership record OW-05 names the service operations lead as accountable owner and records acceptance.",
  "Fictional workflow HW-06 requires a reviewer to approve every category before use and routes uncertain cases to the duty lead.",
  "Fictional permission DP-07 records approval for synthetic data in the trial tool, restricted access and deletion after testing.",
  "Fictional recovery log RB-08 records a stop exercise and restoration of manual sorting by the duty lead.",
  "Fictional training record UT-09 includes user instructions, known limits, a practice session and a support route.",
  "Fictional plan MR-10 sets weekly quality checks, an error stop threshold and a review by the operations lead on 2026-11-30.",
];
export function example(kind = "A") {
  const p = {
    pilot: "Fictional batch sorting pilot",
    fictional: true,
    details: {
      process: "Sorting synthetic service requests into categories",
      outcome: "Reduce sorting time without increasing serious errors",
      date: "2026-10-26",
      reference: `Fictional scenario ${kind}`,
    },
    evidence: Object.fromEntries(
      criteria.map((c, i) => [c.key, { status: "yes", note: notes[i] }]),
    ),
  };
  if (kind === "A")
    p.evidence.data_approval = {
      status: "unknown",
      note: "Fictional data approval has not yet been obtained. Promising trial results do not resolve this gap.",
    };
  if (kind === "B")
    for (const key of ["baseline", "business_outcome"])
      p.evidence[key] = {
        status: "no",
        note: "Fictional technical accuracy was checked, but no meaningful business comparison or agreed target exists.",
      };
  if (kind === "D")
    for (const key of ["user_training", "monitoring"])
      p.evidence[key] = {
        status: "unknown",
        note: "Fictional operational arrangements have not yet been agreed.",
      };
  if (kind === "E")
    p.evidence.data_approval.note =
      "Fictional review DP-07 confirms that permission has NOT been granted; the required data review remains incomplete.";
  if (kind === "F")
    for (const r of Object.values(p.evidence)) r.note = "approved";
  return p;
}
