import { emptyRecord, caveat } from './content.mjs';
import { checkedTestResults, TEST_CASES } from './test-results.mjs';
import { comparisonFindings } from './comparison.mjs';

/**
 * Export a readable, literal snapshot of the two separate sets of notes.
 * This is not a merged save format, evidence verification or approval.
 */
export function completeReviewPackText(workflow, outcomes, exportedAt = new Date().toISOString()) {
  const notes = { ...emptyRecord(), ...workflow };
  const cases = checkedTestResults(outcomes);
  const show = id => notes[id] || 'Not recorded';
  const lines = [
    'AI Adoption Workbench - combined review pack',
    'Pack format: 1',
    'Exported: ' + exportedAt,
    '',
    caveat,
    'REVIEW COPY ONLY. This snapshot combines the current Workbench notes and separately recorded test observations.',
    'It does not save either editable JSON draft, verify evidence, run V2 or grant permission or approval.',
    'Keep the two source JSON files separately. Do not replace them with this text report.',
    'All labels and outcomes are self-reported. Fictional examples are not real trials.',
    '',
    'READ THESE BEFORE MAKING ANY DECISION',
    'Existing unresolved problems:', show('issues'),
    'Permission status:', show('permissions'),
    'Evidence basis (self-reported):', show('evidenceType'),
    'V2 readiness position (self-reported):', show('readiness'),
    'Separate V2 reference and scope:', show('readinessRecord'),
    'Human decision (self-reported):', show('decision'),
    'Decision-maker and authority reference:', show('decisionOwner'),
    'Decision date:', show('decisionDate'),
    'Reasons, evidence and conditions:', show('rationale'),
    'Next action, owner and review trigger:', show('next'),
    '',
    '1. ORIGINAL PROBLEM AND POSSIBLE IMPROVEMENT',
    'Work and intended outcome:', show('work'),
    'Accountable workflow owner:', show('owner'),
    'Current process and problem:', show('current'),
    'Baseline and source references:', show('baseline'),
    'People and consequences:', show('impact'),
    '',
    '2. OPTIONS AND PROPOSED APPROACH',
    'Non-AI option:', show('nonAi'),
    'Possible AI contribution:', show('ai'),
    'Evidence and trade-offs:', show('tradeoffs'),
    'Preferred route and alternative:', show('route'),
    '',
    '3. TEST BOUNDARY AND MEASUREMENT PLAN',
    'Pilot boundary or reason not to trial:', show('boundary'),
    'Trial roles and continuity cover:', show('roles'),
    'Comparison and sample plan:', show('sample'),
    'Success conditions and unacceptable errors:', show('thresholds'),
    'Stop, contain and recover:', show('stop'),
    '',
    '4. REPORTED TEST OBSERVATIONS (SEPARATE FROM WORKBENCH DRAFT)'
  ];
  for (let i = 0; i < cases.length; i++) {
    const caseNote = cases[i], [, title, challenge] = TEST_CASES[i];
    lines.push('', caseNote.id + ' - ' + title,
      'Challenge:', challenge,
      'Reported status:', caseNote.status,
      'Expected behaviour:', caseNote.expected || 'Not recorded',
      'Actual observation:', caseNote.actual || (caseNote.status === 'Not run' ? 'Not run' : 'Not recorded'),
      'Evidence reference:', caseNote.evidence || 'Not recorded',
      'Reviewer or observer:', caseNote.reviewer || 'Not recorded',
      'Outstanding issue or follow-up:', caseNote.followup || 'Not recorded',
      'Record checks (not a pass/fail verdict):');
    const flags = comparisonFindings(caseNote);
    lines.push(...(flags.length ? flags.map(flag => '- ' + flag) :
      ['- No field gaps flagged. Evidence and expectations still need human review.']));
  }
  lines.push('', '5. RESULTS, LIMITATIONS AND REVIEW NEEDS',
    'Results reported in workflow notes:', show('results'),
    'Costs, rework and claimed benefit:', show('costs'),
    'Missing cases and limitations:', show('limits'),
    'Further questions or required review:', show('followup'),
    '',
    'REVIEWER HANDOVER',
    'Read both original editable JSON records and any referenced evidence. Compare reported outcomes with expectations.',
    'Unrun, inconclusive and problematic cases remain open unless a person checks their evidence and records a fresh decision.',
    'A reported positive decision cannot resolve unknown permissions or adverse observations.',
    'This pack is not evidence of workplace value, an approval document or an automatic readiness judgement.');
  return lines.join('\n') + '\n';
}
