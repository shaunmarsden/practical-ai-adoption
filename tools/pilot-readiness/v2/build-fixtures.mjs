// Fixture construction only. No scenario names or IDs are used by either decision engine.
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { example } from "../../../docs/pilot-readiness/examples-v2.mjs";
const source = new URL("../adversarial/scenarios.json", import.meta.url);
const raw = readFileSync(source),
  original = JSON.parse(raw).cases;
const sha = createHash("sha256").update(raw).digest("hex");
const changes = {
  "AD-01": { business_outcome: "no", baseline: "no" },
  "AD-02": { quality_review: "no" },
  "AD-03": { quality_review: "no" },
  "AD-04": { quality_review: "no" },
  "AD-05": { workflow_owner: "no" },
  "AD-06": { human_oversight: "no" },
  "AD-07": { data_approval: "no" },
  "AD-08": { rollback: "no" },
  "AD-09": { representative_test: "no" },
  "AD-10": { user_training: "no" },
  "AD-11": { workflow_owner: "no", user_training: "no" },
  "AD-12": { business_outcome: "no" },
  "AD-13": { representative_test: "no" },
  "AD-14": { quality_review: "no" },
  "AD-15": { human_oversight: "no", rollback: "no" },
  "AD-16": { monitoring: "no" },
  "AD-17": { data_approval: "no" },
  "AD-18": { business_outcome: "no" },
  "AD-19": {},
  "AD-20": { quality_review: "unknown" },
  "AD-21": { data_approval: "no" },
  "AD-22": {},
  "AD-23": { quality_review: "no" },
  "AD-24": { user_training: "unknown", monitoring: "unknown" },
  "AD-25": { data_approval: "no" },
  "AD-26": { workflow_owner: "no" },
  "AD-27": { monitoring: "no" },
  "AD-28": { baseline: "no" },
  "AD-29": { data_approval: "no" },
  "AD-30": { data_approval: "no" },
};
const incidentCases = [
  "AD-02",
  "AD-03",
  "AD-04",
  "AD-06",
  "AD-14",
  "AD-15",
  "AD-17",
  "AD-23",
];
const cases = original.map((c) => {
  const p = example("complete"),
    supplements = structuredClone(p.evidence);
  p.pilot = c.payload.pilot;
  p.details = structuredClone(c.payload.details);
  for (const key of Object.keys(p.evidence)) {
    p.evidence[key].note = c.payload.evidence[key].note;
    if (!changes[c.id][key])
      p.evidence[key].note +=
        "\nV2 fictional supplement: " + supplements[key].note;
    if (changes[c.id][key]) p.evidence[key].status = changes[c.id][key];
  }
  if (incidentCases.includes(c.id))
    p.material_issue = {
      status: "unresolved",
      summary: c.principal_risk + " " + c.relevant_evidence,
      owner: "Fictional responsible sponsor",
      action: "contain",
      next_step:
        c.missing_evidence +
        " Investigate and determine safe containment before reconsidering expansion.",
    };
  if (c.id === "AD-24") p.material_issue.status = "unknown";
  if (c.id === "AD-20") {
    p.scope = {
      activity: "offline_experiment",
      data: "synthetic_public",
      external_effects: "no",
      people_impact: "no",
      proposed_scale: "One offline synthetic-data learner; outputs discarded",
      current_version: "Fictional learning exercise",
    };
  }
  return {
    source_id: c.id,
    source_expected_recommendation: c.expected_recommendation,
    source_sha256: sha,
    transformations: Object.entries(changes[c.id]).map(([key, status]) => ({
      key,
      from: c.payload.evidence[key].status,
      to: status,
      reason: `The original facts must be answered against V2's current acceptable-condition question, not V1's activity-existence question.`,
    })),
    material_issue_basis: incidentCases.includes(c.id)
      ? "The case states an unacceptable unresolved exposure; this is entered explicitly, not inferred by the engine."
      : c.id === "AD-24"
        ? "Operational arrangements are insufficiently assessed."
        : "No additional material issue is stipulated; this is an explicit fictional assumption, not a conclusion drawn from a note.",
    assumptions: [
      "Unchanged dimensions receive explicitly invented positive V2 supplements, including scope, measured value, full costs and sustainable support. These are not recovered from V1 flags.",
      "References are fictional V2 record references; they have not been independently verified.",
      c.id === "AD-19"
        ? "The fabricated record remains undiscoverable: the preparer falsely claims acceptable conditions and no issue. Expected residual limitation."
        : c.id === "AD-20"
          ? "The original case states synthetic offline use, no real effects and discarded outputs; applicable local tool/data permission is explicitly assumed in the separate V2 record."
          : "The supplemental positive facts apply only where they do not replace the specified adverse condition.",
    ],
    payload: p,
  };
});
writeFileSync(
  new URL("fixtures/original-30-v2.json", import.meta.url),
  JSON.stringify(
    {
      source_pr: 74,
      source_commit: "b2440a8160cf4262a38b18f77bab3325982cbcda",
      source_sha256: sha,
      cases,
    },
    null,
    2,
  ) + "\n",
);
// New challenge judgements fixed before execution against either engine.
const newCases = [];
function add(id, title, expected, reason, edit) {
  const p = example("complete");
  p.pilot = "Fictional " + title;
  edit(p);
  newCases.push({
    id,
    title,
    expected_decision: expected,
    judgement_reason: reason,
    payload: p,
  });
}
const hold = "WITHHOLD EXPANSION",
  further = "FURTHER ASSESSMENT REQUIRED",
  complete = "COMPLETE RECORD - HUMAN DECISION REQUIRED",
  offline = "OFFLINE EXPERIMENT - NO ROLLOUT DECISION";
add(
  "N01",
  "accurate draft tool without support",
  further,
  "Technical acceptance does not establish operational support.",
  (p) => {
    p.evidence.user_training.status = "unknown";
  },
);
add(
  "N02",
  "viable internal low-risk assistant",
  complete,
  "The stipulated bounded case has proportionate effective safeguards and a complete record.",
  (p) => {},
);
add(
  "N03",
  "rejected quality review despite ten Yes flags",
  hold,
  "Explicit unresolved material issues must override all affirmative flags.",
  (p) => {
    p.material_issue = {
      status: "unresolved",
      summary: "The completed review rejects the remaining severe failures.",
      owner: "Fictional duty owner",
      action: "contain",
      next_step: "Isolate the affected step and retest after correction.",
    };
  },
);
add(
  "N04",
  "conflicting purpose approvals",
  hold,
  "An internal approval does not resolve an explicit current refusal.",
  (p) => {
    p.evidence.data_approval.status = "no";
    p.material_issue = {
      status: "unresolved",
      summary: "Two approval records conflict; the current purpose is refused.",
      owner: "Fictional data owner",
      action: "determine",
      next_step:
        "Resolve the conflicting permission before real data is processed.",
    };
  },
);
add(
  "N05",
  "unresolved overnight incident",
  hold,
  "An unresolved incident prevents a reassuring result.",
  (p) => {
    p.material_issue = {
      status: "unresolved",
      summary: "An overnight exception incident remains unresolved.",
      owner: "Fictional incident lead",
      action: "investigate",
      next_step: "Investigate the affected outputs and establish containment.",
    };
  },
);
add(
  "N06",
  "untested changed model",
  hold,
  "Current-version acceptance is explicitly not satisfied.",
  (p) => {
    p.evidence.representative_test.status = "no";
  },
);
add(
  "N07",
  "irreversible message consequence",
  hold,
  "A software rollback is insufficient for a message already sent externally.",
  (p) => {
    p.scope.external_effects = "yes";
    p.evidence.rollback.status = "no";
    p.material_issue.status = "unresolved";
    p.material_issue.summary = "Incorrect external notices cannot be recalled.";
  },
);
add(
  "N08",
  "current sensitive-data acceptance record",
  complete,
  "Stipulated current in-scope permission and specialist acceptance can support human review; the tool does not certify it.",
  (p) => {
    p.scope.data = "sensitive_data";
    p.scope.people_impact = "yes";
    p.evidence.data_approval.note +=
      " Fictional specialist review accepts this specific sensitive-data purpose and safeguards.";
  },
);
add(
  "N09",
  "current empowered owner",
  complete,
  "A current owner with demonstrated authority satisfies the ownership condition.",
  (p) => {},
);
add(
  "N10",
  "owner without stop authority",
  hold,
  "A named person lacking authority is not effective ownership.",
  (p) => {
    p.evidence.workflow_owner.status = "no";
  },
);
add(
  "N11",
  "offline synthetic sandbox",
  offline,
  "Production governance should not prohibit bounded learning with applicable permission.",
  (p) => {
    Object.assign(p, example("offline"));
    p.pilot = "Fictional offline synthetic sandbox";
  },
);
add(
  "N12",
  "offline label with real effects",
  further,
  "Scope contradiction must not bypass operational safeguards.",
  (p) => {
    p.scope.activity = "offline_experiment";
    p.scope.people_impact = "yes";
  },
);
add(
  "N13",
  "unknown incident position",
  further,
  "Unknown is not evidence of no material issue.",
  (p) => {
    p.material_issue.status = "unknown";
  },
);
add(
  "N14",
  "affirmative flags without record reference",
  further,
  "An unsupported Yes must not complete the record.",
  (p) => {
    p.evidence.quality_review.reference = "";
  },
);
add(
  "N15",
  "public-data sandbox without permission",
  hold,
  "Offline scope cannot bypass applicable permission.",
  (p) => {
    Object.assign(p, example("offline"));
    p.pilot = "Fictional public-data sandbox without permission";
    p.evidence.data_approval.status = "no";
  },
);
add(
  "N16",
  "false no-issue statement with adverse prose",
  complete,
  "A negative control: if structured answers falsely claim acceptance and no issue, the rule engine cannot discover prose meaning. This remains a limitation, not a success.",
  (p) => {
    p.evidence.quality_review.note =
      "Fictional completed review says severe errors remain, but the preparer falsely selected Yes and no issue.";
  },
);
writeFileSync(
  new URL("fixtures/new-challenges.json", import.meta.url),
  JSON.stringify(
    {
      provenance:
        "New fictional challenge cases, not a blinded external test. Judgements fixed before execution. N16 intentionally preserves the semantic self-report limit.",
      cases: newCases,
    },
    null,
    2,
  ) + "\n",
);
console.log("Separate V2 fixtures written; original PR #74 files unchanged.");
