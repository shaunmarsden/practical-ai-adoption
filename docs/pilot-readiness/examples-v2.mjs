import { emptyRecord, criteria } from "./model-v2.mjs";
const findings = [
  "Fictional BR-01 records measured savings above the agreed threshold, acceptable quality trade-offs and full operating costs within budget.",
  "Fictional BL-02 records a comparable baseline on the same batches, population and measurement method with sampling limits documented.",
  "Fictional RT-03 covers intended users, routine and exceptional cases at the proposed scale on the current workflow and model version.",
  "Fictional QR-04 records acceptable quality against agreed severity limits across affected groups, with material findings resolved.",
  "Fictional OW-05 records current role acceptance, stop authority, support budget and a tested continuity handover.",
  "Fictional HO-06 records an effective timed human review exercise with escalation and prevention of routine approval bypass.",
  "Fictional DP-07 records current permission for the actual data, purpose, tool and recipients, with applicable security and contract checks accepted.",
  "Fictional RC-08 records a proportionate safe-stop and manual recovery exercise, plus prevention and containment of irreversible external effects.",
  "Fictional UR-09 records willing users successfully performing the workflow, with instructions, support and sustainable maintenance cover.",
  "Fictional MO-10 records owned alerts, a practised incident response, review dates and re-evaluation after material changes.",
];
export function example(kind = "blocked") {
  const p = emptyRecord();
  p.pilot = "Fictional service batch review";
  p.fictional = true;
  p.details = {
    process: "Sorting synthetic service requests",
    outcome:
      "Reduce handling time while maintaining acceptable quality and sustainable costs",
    date: "2026-10-26",
    reference: "Invented V2 example",
  };
  p.scope = {
    activity: "bounded_internal_pilot",
    data: "synthetic_public",
    external_effects: "no",
    people_impact: "no",
    proposed_scale: "Five internal users reviewing synthetic batches",
    current_version: "Fictional workflow 2 / model A",
  };
  p.material_issue.status = "none_identified";
  criteria.forEach((c, i) => {
    p.evidence[c.key] = {
      status: "yes",
      reference: `Fictional record ${i + 1}`,
      note: findings[i],
    };
  });
  if (kind === "blocked") {
    p.evidence.quality_review.status = "no";
    p.evidence.quality_review.note =
      "Fictional QR-04 is complete, but records unresolved critical errors and rejects wider use.";
    p.material_issue = {
      status: "unresolved",
      summary: "Unacceptable critical errors remain in the proposed workflow.",
      owner: "Fictional operations lead",
      action: "contain",
      next_step:
        "Keep affected outputs out of use, resolve the failure and commission an acceptable retest.",
    };
  }
  if (kind === "further") {
    p.evidence.user_training.status = "unknown";
    p.evidence.monitoring.status = "unknown";
    p.material_issue.status = "unknown";
    p.material_issue.summary =
      "Operational support and the issue position have not yet been fully assessed.";
    p.material_issue.owner = "Fictional service owner";
    p.material_issue.action = "investigate";
    p.material_issue.next_step =
      "Investigate support, monitoring and potential material issues before considering wider use.";
  }
  if (kind === "offline") {
    p.scope.activity = "offline_experiment";
    p.scope.proposed_scale = "One offline learner; outputs discarded";
    for (const c of criteria)
      if (c.key !== "data_approval")
        p.evidence[c.key] = {
          status: "unknown",
          reference: "",
          note: "Not assessed for this non-operational learning exercise.",
        };
  }
  return p;
}
