// V2 is an explicit new method. The V1 model remains in model.mjs for historical tests.
export const SCHEMA_VERSION = 2;
export const METHODOLOGY_VERSION = "2.0";
export const MAX_IMPORT_BYTES = 1000000;
export const criteria = [
  [
    "business_outcome",
    "Business outcome",
    "Do results meet the agreed business threshold, with acceptable trade-offs and viable operating costs?",
    "A worthwhile outcome needs measured results and a sustainable full cost, including review and support.",
    "Accepted results against the target, a comparable baseline and a costed operating record.",
    "Agree the business threshold and acceptable trade-offs; demonstrate that results and full operating costs meet them.",
  ],
  [
    "baseline",
    "Comparable baseline",
    "Is the baseline relevant and comparable to this workflow and its intended users?",
    "A baseline from a different process may give a misleading comparison.",
    "A dated baseline with the same task, population and measurement method, or justified adjustments.",
    "Obtain a comparable baseline and document its limitations before relying on the comparison.",
  ],
  [
    "representative_test",
    "Current representative testing",
    "Do current tests cover the intended scale, users and exceptions on this workflow and model version?",
    "Chosen success cases or tests of an old version cannot establish current performance.",
    "Sampling and results covering routine work, difficult cases, affected groups and the current version.",
    "Test the current version on representative work, users and exceptions at the intended scale.",
  ],
  [
    "quality_review",
    "Acceptable quality",
    "Do results meet agreed quality and error-severity limits, with no known unacceptable findings?",
    "Completing a review is different from accepting its findings. Serious or concentrated failures need resolution.",
    "Reviewer acceptance against severity limits, subgroup results and evidence that material failures were resolved.",
    "Contain unacceptable output where needed, resolve the findings and obtain an acceptable representative retest.",
  ],
  [
    "workflow_owner",
    "Effective ownership",
    "Has a current accountable owner accepted the role with authority, resources and continuity cover?",
    "A name alone cannot operate, stop or maintain a workflow.",
    "Current role acceptance, stop authority, resources and a workable handover or cover arrangement.",
    "Appoint an accountable current owner with authority, resources and continuity cover.",
  ],
  [
    "human_oversight",
    "Effective human oversight",
    "Do necessary approvals and exception handling work under realistic conditions, without routine bypass?",
    "An approval step must be practical and effective before it is relied on.",
    "A realistic review exercise showing interventions, escalation, workload and prevention of bypass.",
    "Demonstrate effective review and exception handling; prevent unreviewed external actions where approval is necessary.",
  ],
  [
    "data_approval",
    "Current data permission",
    "Are permissions and safeguards current and applicable to the actual data, purpose, tool and proposed use?",
    "General tool approval or an old permission does not cover every use. Relevant security and contractual restrictions matter.",
    "Current in-scope permission, access/retention safeguards and resolution of relevant security or contractual restrictions.",
    "Confirm current in-scope permissions and safeguards with the authorised data/security owner; resolve conflicting or refused approvals.",
  ],
  [
    "rollback",
    "Demonstrated recovery",
    "Have proportionate stopping, recovery and containment arrangements been demonstrated for this use?",
    "A written plan is insufficient where recovery matters. Some external consequences cannot be reversed.",
    "A proportionate stop/recovery exercise and prevention or containment for irreversible effects.",
    "Demonstrate stopping and recovery where proportionate; prevent or contain consequences that rollback cannot reverse.",
  ],
  [
    "user_training",
    "Users and sustainable support",
    "Can and will intended users operate the workflow, with training, support and sustainable maintenance?",
    "Training attendance does not establish a workable accepted process or ongoing support.",
    "User acceptance under realistic work, instructions, support, maintenance capacity and continuity arrangements.",
    "Resolve user acceptance and workflow fit; provide usable training, support and sustainable maintenance.",
  ],
  [
    "monitoring",
    "Monitoring and response",
    "Are monitoring, incident response and re-evaluation after material changes workable and owned?",
    "A dashboard without a response or current review owner cannot manage a changing workflow.",
    "Owned alerts, incident exercises, review dates and triggers for re-testing after material changes.",
    "Establish owned monitoring and incident response, review dates and re-evaluation after material changes.",
  ],
].map(([key, title, question, why, example, next]) => ({
  key,
  title,
  question,
  why,
  example,
  next,
}));
export const fields = Object.fromEntries(
  criteria.map((c) => [c.key, c.question]),
);
export const originalGates = [
  "quality_review",
  "workflow_owner",
  "human_oversight",
  "data_approval",
  "rollback",
];
export const decisions = {
  hold: "WITHHOLD EXPANSION",
  further: "FURTHER ASSESSMENT REQUIRED",
  complete: "COMPLETE RECORD - HUMAN DECISION REQUIRED",
  offline: "OFFLINE EXPERIMENT - NO ROLLOUT DECISION",
};
export const warning =
  "All answers, acceptance claims and issue positions are self-reported, not independently verified. No result authorises operation, expansion or deployment, certifies compliance or proves business value.";
export const methodology =
  "Method 2.0 assesses current acceptable conditions for the stated use, not whether an activity occurred. Any No or reported unresolved material issue withholds expansion. Unknown conditions, unsupported Yes answers, missing context or an unreviewed legacy date require further assessment. Only a fully supported record with no reported material issue goes to independent human decision. A strictly bounded synthetic/public offline experiment has a separate scope route, subject to applicable permission and an assessed issue position.";
export const limitations =
  "The tool does not read meaning, detect fabricated evidence or independently establish that a condition is satisfied. It uses structured answers, not keywords or an AI model. A false Yes or false no-issue claim can still mislead. A qualified responsible person must inspect the records, consequences and applicable requirements. The method has not been externally validated or tested with real managers. No vendor designed, tested, validated or endorsed it.";
export function emptyRecord() {
  return {
    schema_version: 2,
    methodology_version: "2.0",
    pilot: "",
    fictional: false,
    details: { process: "", outcome: "", date: "", reference: "" },
    scope: {
      activity: "unknown",
      data: "unknown",
      external_effects: "unknown",
      people_impact: "unknown",
      proposed_scale: "",
      current_version: "",
    },
    material_issue: {
      status: "unknown",
      summary: "",
      owner: "",
      action: "unknown",
      next_step: "",
    },
    evidence: Object.fromEntries(
      criteria.map((c) => [
        c.key,
        { status: "unknown", reference: "", note: "" },
      ]),
    ),
  };
}
const object = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
function keys(v, required, label, optional = []) {
  if (!object(v)) throw Error(`${label} must be an object`);
  const extra = Object.keys(v).filter(
    (k) => !required.includes(k) && !optional.includes(k),
  );
  if (extra.length)
    throw Error(
      `${label}: unsupported fields ${extra.join(", ")}; nothing was discarded`,
    );
  if (required.some((k) => !Object.hasOwn(v, k)))
    throw Error(`${label}: missing required fields`);
}
function text(v, max, label) {
  if (typeof v !== "string" || v.length > max)
    throw Error(`${label} must be text of at most ${max} characters`);
}
function choice(v, allowed, label) {
  if (!allowed.includes(v)) throw Error(`${label}: invalid choice`);
}
export function validDate(s) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    Number(s.slice(0, 4)) >= 1900 &&
    !Number.isNaN(new Date(s).getTime()) &&
    new Date(s).toISOString().slice(0, 10) === s
  );
}
export function validate(p) {
  keys(
    p,
    [
      "schema_version",
      "methodology_version",
      "pilot",
      "fictional",
      "details",
      "scope",
      "material_issue",
      "evidence",
    ],
    "record",
    ["migration"],
  );
  if (p.schema_version !== 2 || p.methodology_version !== "2.0")
    throw Error(
      "Unsupported schema or methodology version; nothing was discarded",
    );
  text(p.pilot, 200, "pilot");
  if (typeof p.fictional !== "boolean")
    throw Error("fictional must be boolean");
  keys(p.details, ["process", "outcome", "date", "reference"], "details");
  for (const k of Object.keys(p.details))
    text(p.details[k], k === "date" ? 10 : 500, k);
  if (p.details.date && !validDate(p.details.date))
    throw Error("Assessment date must be a real YYYY-MM-DD date");
  keys(
    p.scope,
    [
      "activity",
      "data",
      "external_effects",
      "people_impact",
      "proposed_scale",
      "current_version",
    ],
    "scope",
  );
  choice(
    p.scope.activity,
    [
      "unknown",
      "offline_experiment",
      "bounded_internal_pilot",
      "real_world_workflow",
      "wider_deployment",
    ],
    "activity",
  );
  choice(
    p.scope.data,
    ["unknown", "synthetic_public", "real_data", "sensitive_data"],
    "data",
  );
  for (const k of ["external_effects", "people_impact"])
    choice(p.scope[k], ["yes", "no", "unknown"], k);
  for (const k of ["proposed_scale", "current_version"])
    text(p.scope[k], 500, k);
  keys(
    p.material_issue,
    ["status", "summary", "owner", "action", "next_step"],
    "material_issue",
  );
  choice(
    p.material_issue.status,
    ["none_identified", "unresolved", "unknown"],
    "material issue status",
  );
  choice(
    p.material_issue.action,
    ["investigate", "contain", "resolve", "determine", "unknown"],
    "material issue action",
  );
  for (const k of ["summary", "owner", "next_step"])
    text(p.material_issue[k], k === "owner" ? 200 : 3000, k);
  keys(
    p.evidence,
    criteria.map((c) => c.key),
    "evidence",
  );
  for (const c of criteria) {
    const r = p.evidence[c.key];
    keys(r, ["status", "reference", "note"], c.key);
    choice(r.status, ["yes", "no", "unknown"], c.key);
    text(r.reference, 500, `${c.key} reference`);
    text(r.note, 3000, `${c.key} note`);
  }
  if (Object.hasOwn(p, "migration")) {
    keys(
      p.migration,
      ["source_schema_version", "source_record", "date_reviewed"],
      "migration",
    );
    if (
      p.migration.source_schema_version !== 1 ||
      typeof p.migration.date_reviewed !== "boolean"
    )
      throw Error("Invalid migration metadata");
    validateV1(p.migration.source_record);
  }
  let serial;
  try {
    serial = JSON.stringify(p);
  } catch {
    throw Error("Record must be serialisable JSON");
  }
  if (new TextEncoder().encode(serial).length > MAX_IMPORT_BYTES)
    throw Error("Record exceeds the supported 1 MB import size");
  return p;
}
function validateV1(p) {
  if (!object(p) || typeof p.pilot !== "string" || !p.pilot.trim())
    throw Error("V1 pilot must be a non-empty string");
  if (Object.hasOwn(p, "schema_version") && p.schema_version !== 1)
    throw Error("Unsupported source schema version");
  keys(
    p.evidence,
    criteria.map((c) => c.key),
    "V1 evidence",
  );
  for (const c of criteria) {
    const r = p.evidence[c.key];
    if (
      !object(r) ||
      !["yes", "no", "unknown"].includes(r.status) ||
      typeof r.note !== "string" ||
      (r.status === "yes" && !r.note.trim())
    )
      throw Error("Invalid V1 evidence record");
    text(r.note, 3000, c.key);
  }
  text(p.pilot, 200, "V1 pilot");
}
export function normaliseImport(input) {
  if (object(input) && input.schema_version === 2) {
    validate(input);
    return structuredClone(input);
  }
  validateV1(input);
  const p = emptyRecord();
  p.pilot = input.pilot;
  p.fictional = input.fictional === true;
  if (input.details !== undefined) {
    if (!object(input.details)) throw Error("V1 details must be an object");
    for (const k of Object.keys(p.details)) {
      if (input.details[k] !== undefined) {
        text(input.details[k], k === "date" ? 10 : 500, k);
        p.details[k] = input.details[k];
      }
    }
  }
  for (const c of criteria) p.evidence[c.key].note = input.evidence[c.key].note;
  p.migration = {
    source_schema_version: 1,
    source_record: structuredClone(input),
    date_reviewed: false,
  };
  validate(p);
  return p;
}
export function assess(p) {
  validate(p);
  const issue = p.material_issue,
    scope = p.scope;
  const supported = (r) =>
    r.status === "yes" && r.reference.trim() && r.note.trim();
  const blockers = criteria
    .filter((c) => p.evidence[c.key].status === "no")
    .map((c) => ({
      check: c.key,
      requirement: c.question,
      status: "no",
      note: p.evidence[c.key].note,
      reference: p.evidence[c.key].reference,
      next_action: c.next,
    }));
  const gaps = [];
  const gap = (check, problem, next_action) =>
    gaps.push({ check, problem, next_action });
  if (!p.pilot.trim())
    gap(
      "pilot",
      "Pilot not identified",
      "Identify the pilot without entering sensitive details.",
    );
  for (const k of ["process", "outcome", "date"])
    if (!p.details[k].trim())
      gap(
        k,
        `${k} not supplied`,
        k === "date"
          ? "Select an assessment date explicitly; an import does not set today automatically."
          : `Record the ${k} being assessed.`,
      );
  if (p.migration && !p.migration.date_reviewed)
    gap(
      "migration_date",
      "Legacy assessment date has not been reviewed",
      "Review and explicitly confirm the date for this V2 reassessment.",
    );
  const safeOffline =
    scope.activity === "offline_experiment" &&
    scope.data === "synthetic_public" &&
    scope.external_effects === "no" &&
    scope.people_impact === "no" &&
    issue.status === "none_identified" &&
    supported(p.evidence.data_approval);
  if (scope.activity === "unknown")
    gap(
      "activity",
      "Activity scope is unknown",
      "Choose the actual activity and the proposed scale of use.",
    );
  if (scope.data === "unknown")
    gap(
      "data",
      "Data context is unknown",
      "Establish whether actual data is synthetic/public, real or sensitive.",
    );
  for (const k of ["external_effects", "people_impact"])
    if (scope[k] === "unknown")
      gap(
        k,
        `${k.replaceAll("_", " ")} is unknown`,
        "Establish external consequences and effects on real people before relying on the record.",
      );
  if (
    (scope.activity === "offline_experiment" &&
      !["synthetic_public", "unknown"].includes(scope.data)) ||
    (scope.activity === "offline_experiment" &&
      (scope.external_effects === "yes" || scope.people_impact === "yes"))
  )
    gap(
      "scope_conflict",
      "The offline description conflicts with real data or effects",
      "Use the actual operational scope; an offline label cannot bypass safeguards.",
    );
  if (!safeOffline) {
    for (const k of ["proposed_scale", "current_version"])
      if (!scope[k].trim())
        gap(
          k,
          `${k.replaceAll("_", " ")} not supplied`,
          "Record the intended scale and the workflow/model version that the evidence covers.",
        );
  }
  if (issue.status === "unknown")
    gap(
      "material_issue",
      "Material issue position is unknown or insufficiently assessed",
      "Have a responsible owner investigate quality, safety, security, applicable requirements and operational concerns.",
    );
  if (issue.status === "unresolved") {
    for (const k of ["summary", "owner", "next_step"])
      if (!issue[k].trim())
        gap(
          `issue_${k}`,
          `Material issue ${k.replaceAll("_", " ")} not supplied`,
          "Assign a responsible human to describe the issue and determine investigation, containment and resolution.",
        );
    if (issue.action === "unknown")
      gap(
        "issue_action",
        "Material issue action is not determined",
        "Have the responsible human determine the appropriate investigation, containment or resolution.",
      );
  }
  for (const c of criteria) {
    if (safeOffline && c.key !== "data_approval") continue;
    const r = p.evidence[c.key];
    if (r.status === "unknown")
      gap(
        c.key,
        "Current acceptable condition has not been established",
        c.next,
      );
    else if (r.status === "yes" && !supported(r))
      gap(
        c.key,
        "Yes lacks a record reference or finding note",
        `Identify the supporting record and what it demonstrates. ${c.next}`,
      );
  }
  const knownIssues =
    issue.status === "unresolved"
      ? [
          {
            summary:
              issue.summary.trim() ||
              "An unresolved material issue is reported; a description is still needed.",
            owner: issue.owner.trim() || "Responsible owner not yet assigned",
            action: issue.action,
            next_step:
              issue.next_step.trim() ||
              "Assign a responsible owner to investigate, contain where necessary and resolve the issue or determine an appropriate course.",
          },
        ]
      : [];
  let decision,
    reason,
    route = "operational";
  if (knownIssues.length) {
    decision = decisions.hold;
    reason =
      "A material issue is reported as unresolved. Withhold expansion and have a responsible human investigate, contain or resolve it before reconsideration.";
  } else if (safeOffline) {
    route = "offline_learning";
    decision = gaps.length ? decisions.further : decisions.offline;
    reason = gaps.length
      ? "The offline learning boundary is recorded, but assessment identification or date information is missing. This does not prohibit learning or authorise operational use."
      : "This is recorded as a synthetic/public offline exercise with no real people or external effects and applicable permission. Production governance gaps do not prohibit learning. This is no operational approval; reassess before any real use.";
  } else if (blockers.length) {
    decision = decisions.hold;
    reason =
      "One or more required current conditions are recorded as not satisfied. Withhold expansion until the named conditions are resolved.";
  } else if (gaps.length) {
    decision = decisions.further;
    reason =
      "Evidence or context is incomplete, unknown or unsupported. This is not permission to continue or expand a pilot.";
  } else {
    decision = decisions.complete;
    reason =
      "All ten current conditions have affirmative references and findings, with no material issue reported. This describes a complete self-reported record, not verified suitability. An independent responsible person must decide.";
  }
  const actions = [];
  if (knownIssues.length) {
    const i = knownIssues[0];
    actions.push({
      check: "material_issue",
      owner: i.owner,
      action: `${i.summary} Next: ${i.next_step} Human action: ${i.action === "unknown" ? "determine appropriate containment and investigation" : i.action}.`,
    });
  }
  if (
    issue.status === "unknown" &&
    (issue.owner.trim() || issue.next_step.trim())
  )
    actions.push({
      check: "material_issue",
      owner: issue.owner.trim() || "Responsible owner not yet assigned",
      action:
        issue.next_step.trim() ||
        "Investigate the material issue position before relying on the assessment.",
    });
  if (route !== "offline_learning")
    for (const b of blockers)
      actions.push({
        check: b.check,
        owner: "Responsible workflow owner",
        action: b.next_action,
      });
  for (const g of gaps)
    actions.push({
      check: g.check,
      owner: "Responsible workflow owner",
      action: g.next_action,
    });
  if (route === "offline_learning")
    actions.push({
      check: "scope",
      owner: "Person responsible for the exercise",
      action:
        "Keep the exercise offline and within applicable permissions. Reassess before real data, external actions, real people or operational use.",
    });
  if (decision === decisions.complete) {
    for (const c of criteria)
      actions.push({
        check: c.key,
        owner: "Independent responsible reviewer",
        action: `Inspect the actual acceptance evidence. ${c.next}`,
      });
  }
  if (
    scope.external_effects === "yes" ||
    scope.people_impact === "yes" ||
    scope.data === "sensitive_data"
  )
    actions.push({
      check: "consequences",
      owner: "Responsible owner and appropriate specialist reviewer",
      action:
        "Independently check affected people, external or irreversible consequences and applicable permissions/security requirements for the intended scale. This tool does not establish compliance.",
    });
  return {
    schema_version: 2,
    methodology_version: "2.0",
    pilot: p.pilot.trim(),
    assessment_route: route,
    decision,
    reason,
    known_issues: knownIssues,
    known_blockers: blockers,
    essential_blockers: blockers.filter((b) => originalGates.includes(b.check)),
    evidence_gaps: gaps,
    next_actions: actions,
    warning,
  };
}
