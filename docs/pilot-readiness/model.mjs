// The decision function mirrors pilot_readiness.py. Interface checks are separate.
export const criteria = [
  [
    "business_outcome",
    "Business outcome",
    "Is there an agreed business outcome and a success threshold?",
    "A useful pilot needs a measurable reason to change the workflow.",
    "A trial brief naming the outcome, measure, threshold and decision date.",
    "Agree an outcome and success threshold with the sponsor; inspect the trial brief.",
  ],
  [
    "baseline",
    "Baseline for comparison",
    "Have you recorded how the process performed before the pilot?",
    "Without a fair comparison, accurate outputs alone cannot show business value.",
    "A dated sample of the current process, including time, quality and sampling method.",
    "Record a comparable baseline and check how the pilot results differ.",
  ],
  [
    "representative_test",
    "Representative testing",
    "Has the pilot been tested on representative work with recorded results?",
    "An easy demonstration may hide failures in ordinary work and difficult cases.",
    "A test log covering normal cases, exceptions, sample selection and results.",
    "Inspect a representative test log, including difficult cases and failures.",
  ],
  [
    "quality_review",
    "Quality and error review",
    "Has a named reviewer assessed quality and errors?",
    "Mistakes need a qualified reviewer and a record of their consequences.",
    "A dated error review naming the reviewer, severity and unresolved issues.",
    "Arrange a named quality reviewer and inspect the error log and unresolved risks.",
  ],
  [
    "workflow_owner",
    "Workflow owner",
    "Is there a named owner for the live workflow?",
    "Someone must be accountable for operation, decisions and follow-up.",
    "An ownership record naming the responsible role or person and their acceptance.",
    "Confirm the accountable workflow owner and their recorded acceptance.",
  ],
  [
    "human_oversight",
    "Human oversight",
    "Are human approval and exception handling defined where needed?",
    "People need to know when to intervene and where to send a difficult case.",
    "An approved workflow showing review points, escalation and exception handling.",
    "Walk through approval points and exceptions with the responsible reviewer.",
  ],
  [
    "data_approval",
    "Data permission and controls",
    "Are permission and controls recorded for the data used?",
    "A useful result does not establish permission to use or disclose the data.",
    "A permission record covering the data, approved tool, access and retention controls.",
    "Check data permission, approved tool use, access and retention with the appropriate owner.",
  ],
  [
    "rollback",
    "Stop or rollback arrangements",
    "Can the owner stop the workflow and return to a safe process?",
    "A failure needs a practical way to stop and recover.",
    "A stop procedure with triggers, responsible role and a recorded recovery exercise.",
    "Inspect the stop procedure and test a safe return to the previous process.",
  ],
  [
    "user_training",
    "Training and support",
    "Do users have instructions and a support route?",
    "A workable pilot depends on people knowing its limits and how to get help.",
    "User instructions, limits, training records and an agreed support route.",
    "Check user instructions, training needs and the available support route.",
  ],
  [
    "monitoring",
    "Monitoring and review",
    "Are ongoing monitoring and a review date agreed?",
    "Quality and value can change after the first test.",
    "A monitoring plan naming measures, review date, thresholds and review owner.",
    "Agree ongoing measures, review thresholds, a review owner and a review date.",
  ],
].map(([key, title, question, why, example, next]) => ({
  key,
  title,
  question,
  why,
  example,
  next,
}));
export const fields = {
  business_outcome: "An agreed business outcome and success threshold",
  baseline: "A baseline for comparison",
  representative_test: "A representative test with recorded results",
  quality_review: "A quality/error review with a named reviewer",
  workflow_owner: "A named owner for the live workflow",
  human_oversight: "Human approval and exception handling where needed",
  data_approval: "Permission and controls for the data used",
  rollback: "A stop/rollback plan",
  user_training: "User instructions and support",
  monitoring: "Ongoing monitoring and review date",
};
export const hardGates = [
  "quality_review",
  "workflow_owner",
  "human_oversight",
  "data_approval",
  "rollback",
];
export function assess(payload) {
  if (
    !payload ||
    typeof payload !== "object" ||
    typeof payload.pilot !== "string" ||
    !payload.pilot.trim()
  )
    throw Error("pilot must be a non-empty string");
  const e = payload.evidence;
  if (
    !e ||
    typeof e !== "object" ||
    Array.isArray(e) ||
    Object.keys(e).length !== 10 ||
    Object.keys(e).some((k) => !Object.hasOwn(fields, k))
  )
    throw Error("evidence must contain exactly the ten criterion keys");
  for (const [key, record] of Object.entries(e)) {
    if (!record || !["yes", "no", "unknown"].includes(record.status))
      throw Error(`${key}: status must be yes, no or unknown`);
    if (typeof record.note !== "string")
      throw Error(`${key}: note must be a string`);
    if (record.status === "yes" && !record.note.trim())
      throw Error(`${key}: yes requires a specific evidence note`);
  }
  const blockers = hardGates.filter((k) => e[k].status !== "yes");
  const gaps = Object.keys(fields).filter((k) => e[k].status !== "yes");
  return {
    pilot: payload.pilot.trim(),
    decision: blockers.length
      ? "DO NOT EXPAND"
      : gaps.length
        ? "LIMITED PILOT ONLY"
        : "READY FOR HUMAN REVIEW",
    reason: blockers.length
      ? "One or more essential control checks lack affirmative evidence."
      : gaps.length
        ? "Essential controls are recorded, but the case for wider use is incomplete."
        : "All checks are recorded as met; a responsible person must still validate the evidence and approve any expansion.",
    essential_blockers: blockers.map((k) => ({
      check: k,
      requirement: fields[k],
      status: e[k].status,
    })),
    remaining_gaps: gaps.map((k) => ({
      check: k,
      requirement: fields[k],
      status: e[k].status,
    })),
    checks_met: 10 - gaps.length,
    checks_total: 10,
    warning:
      "Self-reported notes are not independently verified. This tool cannot authorise deployment or establish ROI.",
  };
}
// A transparent form threshold, not an assessment of meaning or truth.
export function substantive(note) {
  const words = note.trim().split(/\s+/u).filter(Boolean);
  return (
    note.trim().length >= 40 &&
    words.length >= 6 &&
    new Set(words.map((w) => w.toLowerCase())).size >= 4
  );
}
export function formErrors(payload) {
  const errors = {};
  if (!payload.pilot?.trim()) errors.pilot = "Enter a pilot name.";
  for (const c of criteria) {
    const r = payload.evidence[c.key];
    if (!r || !["yes", "no", "unknown"].includes(r.status))
      errors[c.key] =
        "Choose Yes, No or Unknown. Unknown is appropriate when evidence is missing.";
    else if (r.status === "yes" && !substantive(r.note))
      errors[c.key] =
        "For Yes, identify a checkable record and what it shows: at least 40 characters, 6 words and 4 different words. Otherwise choose No or Unknown.";
  }
  return errors;
}
export function normaliseImport(input) {
  // Validate before replacing current answers. Preserve the Python evidence format.
  assess(input);
  const text = (value, max, label) => {
    if (value !== undefined && typeof value !== "string")
      throw Error(`${label} must be text`);
    if ((value || "").length > max)
      throw Error(`${label} exceeds ${max} characters`);
    return value || "";
  };
  if (
    input.details !== undefined &&
    (!input.details ||
      typeof input.details !== "object" ||
      Array.isArray(input.details))
  )
    throw Error("details must be an object");
  const meta = input.details || {};
  const details = Object.fromEntries(
    ["process", "outcome", "date", "reference"].map((k) => [
      k,
      text(meta[k], k === "date" ? 10 : 500, k),
    ]),
  );
  if (details.date && !validDate(details.date))
    throw Error("Assessment date must be a valid YYYY-MM-DD date");
  return {
    pilot: text(input.pilot, 200, "pilot"),
    details,
    fictional: input.fictional === true,
    evidence: Object.fromEntries(
      criteria.map((c) => [
        c.key,
        {
          status: input.evidence[c.key].status,
          note: text(input.evidence[c.key].note, 3000, c.key),
        },
      ]),
    ),
  };
}
export function validDate(s) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    Number(s.slice(0, 4)) >= 1900 &&
    !Number.isNaN(new Date(s).getTime()) &&
    new Date(s).toISOString().slice(0, 10) === s
  );
}
export const methodology =
  "This project uses ten conditions and five essential gates: quality review, workflow ownership, human oversight, data permission and rollback. A No or Unknown on any essential gate means DO NOT EXPAND. If these gates are Yes but another condition is No or Unknown, the result is LIMITED PILOT ONLY. Only ten Yes responses with notes produce READY FOR HUMAN REVIEW. These are the existing Python rules, not a validated vendor standard.";
export const limitations =
  "All answers and notes are user-reported and have not been independently verified. Note length and word counts check form only, not truth, relevance, sufficiency or contradictions. This tool does not establish compliance, security, financial benefit or a validated business case. No vendor designed, validated or endorsed it. Human approval is required before expansion; a limited result does not permit a pilot to continue without its own approvals.";
