// Questions route readers through existing guides. They are not readiness criteria.
const guide = (file, title) => ({ href: `https://github.com/shaunmarsden/practical-ai-adoption/blob/main/guides/${file}.md`, title });
export const steps = [
  {
    title: 'Describe the work',
    intro: 'Start with one recurring job. Follow an ordinary case and a difficult one from arrival to accepted completion. Mark missing information unknown.',
    links: [guide('map-a-workflow-before-choosing-ai', 'Map the work before choosing AI'), guide('finding-a-good-first-ai-use-case', 'Find a first use case')],
    fields: [
      ['work', 'Work and outcome sought', 'What starts the work, what counts as finished, and who benefits?'],
      ['owner', 'Accountable workflow owner', 'Use a role or safe reference. Who can authorise a change?'],
      ['current', 'Current process and main problem', 'Include handoffs, waiting, review, rework and what already works.'],
      ['baseline', 'Current evidence and baseline', 'Record source references, dates, sample and full-process quality/time. Separate observed, reported, forecast and unknown.'],
      ['impact', 'People, errors and consequences', 'Who could be affected? What happens if the result is wrong?']
    ]
  },
  {
    title: 'Compare options',
    intro: 'Compare a credible non-AI route as well as AI. Measuring first, changing nothing or simplifying the process can be the right choice. Defer options without necessary permission or controls.',
    links: [guide('compare-ai-with-other-ways-to-improve-work', 'Compare AI with other ways to improve work'), guide('when-not-to-use-ai', 'When not to use AI')],
    fields: [
      ['nonAi', 'Non-AI option', 'Consider removing a step, clarifying ownership, an existing tool, training or ordinary automation.'],
      ['ai', 'Possible AI contribution', 'What could AI prepare for review, and what must it never do? Write not applicable if appropriate.'],
      ['tradeoffs', 'Evidence and trade-offs for each option', 'Compare likely outcome, setup, review, support, costs and failure consequences. Label assumptions.'],
      ['route', 'Preferred route and strongest alternative', 'Why this route? What evidence would change your mind? No trial is required.']
    ]
  },
  {
    title: 'Plan a bounded pilot',
    intro: 'Only plan a trial if it is useful and permitted. Keep the current process available. Invented/public offline learning must have no real-person, operational or external effects and still needs applicable permission. No AI trial proposed? Record why in "Pilot boundary, or reason not to trial". Trial roles, sample, success conditions and stop/recovery fields can be skipped where they do not apply. For export, write "Not applicable - no AI trial proposed" in unused fields. Keep unresolved permissions and any baseline measurement plan.',
    links: [guide('run-a-controlled-team-ai-pilot', 'Run a controlled team pilot'), guide('before-you-put-work-data-into-ai', 'Check data permissions'), guide('map-ai-tool-actions-and-permissions', 'Map tool actions and permissions')],
    fields: [
      ['boundary', 'Pilot boundary, or reason not to trial', 'Define activity, scale, dates, users, tool/model/prompt version, exclusions and prohibited actions.'],
      ['permissions', 'Actual permission status', 'Record who permits the tool, data, purpose and each action, with references and restrictions. Unknown is not permission.'],
      ['roles', 'Trial runner, reviewer and continuity cover', 'Who checks source evidence, can reject outputs and has time, authority and cover?'],
      ['sample', 'Comparison and sample plan', 'Which ordinary and awkward cases, selection rules and period? Log every attempt, including failures.'],
      ['thresholds', 'Success conditions and unacceptable errors', 'Agree these before testing. Include full-process outcome, quality and review effort.'],
      ['stop', 'Stop, contain and recover', 'Who may stop the trial? What triggers this? How are incidents contained and the ordinary workflow restored?']
    ]
  },
  {
    title: 'Measure results',
    intro: 'Record what happened, including failures. A faster draft is not automatically a faster accepted job, usable capacity or money saved. Do not fill gaps with invented measurements.',
    links: [guide('how-to-tell-whether-ai-actually-helped', 'Measure the whole task'), guide('measure-ai-capacity-and-realised-value', 'Separate time, capacity and realised value')],
    fields: [
      ['evidenceType', 'Evidence basis', 'Choose what these notes describe. This is a user-entered label, not verification.', ['Not recorded', 'Plan or hypothesis only', 'Fictional exercise', 'Real bounded pilot observation', 'Sustained operational observation', 'Mixed evidence (explain below)']],
      ['results', 'Comparison results and source references', 'Record cases attempted, accepted, corrected and rejected; comparable baseline and trial periods; quality and full-process time.'],
      ['costs', 'Review, rework, costs and actual benefit', 'Include setup, support, failures and recovery. Count costs once. Separate observed benefit from forecasts and financial claims.'],
      ['limits', 'Missing cases, changes and limitations', 'What else could explain the result? Note tool/version changes and whether anyone independent checked the evidence.'],
      ['issues', 'Known problems and unresolved material issues', 'Keep adverse findings visible, even if other results are encouraging. If unknown, say so. Name a role, action and next step.']
    ]
  },
  {
    title: 'Review readiness separately',
    intro: 'For an established AI pilot being considered for wider use, open V2 separately. This workbench does not run its rules, transfer answers or validate the recorded result. Check actual records, scope and unresolved issues with the relevant people.',
    links: [{ href: '../pilot-readiness/', title: 'Open Pilot Readiness Assessment V2' }, guide('run-a-controlled-team-ai-pilot', 'Review the pilot boundary')],
    fields: [
      ['readiness', 'V2 review position (self-reported)', 'Leave not reviewed if you have not used V2. A complete record is never approval.', ['Not reviewed', 'Not applicable (explain below)', 'WITHHOLD EXPANSION', 'FURTHER ASSESSMENT REQUIRED', 'COMPLETE RECORD - HUMAN DECISION REQUIRED', 'OFFLINE EXPERIMENT - NO ROLLOUT DECISION']],
      ['readinessRecord', 'Review reference, date, scope and limits', 'Record the separate V2 report reference or why it is not applicable. Do not paste protected evidence.'],
      ['followup', 'Unresolved questions and required review', 'Who will inspect the evidence, handle issues or seek specialist advice? Record actions and review triggers.']
    ]
  },
  {
    title: 'Record a human decision',
    intro: 'Record an actual human judgement only when it has happened. Choosing an option here does not grant authority, resolve issues or authorise an action. A decision to stop, gather evidence or use a non-AI route is valid.',
    links: [guide('compare-ai-with-other-ways-to-improve-work', 'Revisit the options decision'), guide('map-ai-tool-actions-and-permissions', 'Recheck action authority')],
    fields: [
      ['decision', 'Human decision as reported', 'Nothing is selected on your behalf.', ['No human decision recorded', 'Stop or contain', 'Gather evidence, repeat or narrow', 'Use a non-AI route', 'Continue within an existing authorised boundary', 'Refer for a separate expansion decision', 'Other human decision (explain below)']],
      ['decisionOwner', 'Decision-maker role and authority reference', 'Who made the decision, and what authority do they hold for this exact scope?'],
      ['decisionDate', 'Decision date', 'Leave blank until a decision has happened.', 'date'],
      ['rationale', 'Reasons, evidence and conditions', 'Include disagreements and unresolved problems. A positive decision cannot make these disappear.'],
      ['next', 'Next action, responsible role and review date/triggers', 'Record scope, conditions, continuity cover and what would require a fresh decision.']
    ]
  }
];
export const caveat = 'Planning and self-reported decision record only. Not a validated assessment, independent verification or approval to deploy. Unanswered items remain unanswered. A V2 complete record requires a separate human decision. Fictional exercises, real observations and independent review are different kinds of evidence. No workplace benefit is established by using this workbench.';
export const fields = steps.flatMap(step => step.fields);
export function emptyRecord() {
  return Object.fromEntries(fields.map(([id, , , kind]) => [id, Array.isArray(kind) ? kind[0] : '']));
}
export function recordText(values, exportedAt = new Date().toISOString()) {
  const data = { ...emptyRecord(), ...values };
  const lines = ['AI Adoption Workbench decision record', 'Record format: 1', `Exported: ${exportedAt}`, '', caveat,
    '', 'REVIEW THESE FIRST', `Known problems: ${data.issues || 'Not recorded'}`, `Evidence basis (self-reported): ${data.evidenceType || 'Not recorded'}`, `V2 position (self-reported): ${data.readiness}`, `Human decision (self-reported): ${data.decision}`,
    '', 'Next action, responsible role and review date/triggers (self-reported):', data.next || 'Not recorded',
    '', 'Notes are copied literally, not checked for truth, consistency or sufficient authority. This is not a V2 assessment report. Keep any separate V2 report alongside this record.'];
  for (const step of steps) {
    lines.push('', step.title.toUpperCase());
    for (const [id, label] of step.fields) lines.push('', `${label}:`, data[id] || 'Not recorded');
    lines.push('', 'Related reading:', ...step.links.map(link => `${link.title}: ${new URL(link.href, 'https://shaunmarsden.github.io/practical-ai-adoption/workbench/').href}`));
  }
  return lines.join('\n') + '\n';
}
