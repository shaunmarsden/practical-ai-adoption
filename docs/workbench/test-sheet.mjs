import { emptyRecord, caveat } from './content.mjs';

// Planning document only. Never generate test results or permission from notes.
export function safeTestSheetText(values, exportedAt = new Date().toISOString()) {
  const data = { ...emptyRecord(), ...values };
  const note = id => data[id] || 'Not recorded';
  const lines = [
    'AI Adoption Workbench - proposed test sheet',
    'Format: 1',
    'Exported: ' + exportedAt,
    '',
    caveat,
    'DRAFT ONLY. This sheet does not authorise a trial, prove it is safe or recommend using AI.',
    'Use invented/public non-sensitive examples until appropriate real-work permissions are confirmed.',
    'The cases below are suggested challenges, NOT completed tests or observed outcomes.',
    'If no AI trial is proposed, treat this as a planning checklist only. Do not run an AI trial.',
    '',
    'CHECK BEFORE ANY TEST',
    'Preferred route:', note('route'),
    'Non-AI alternative:', note('nonAi'),
    'Pilot boundary or reason not to trial:', note('boundary'),
    'Actual permissions (self-reported, unverified):', note('permissions'),
    'Known problems:', note('issues'),
    'Human decision (self-reported, unverified):', note('decision'),
    'Decision-maker role and authority:', note('decisionOwner'),
    '',
    'WORKFLOW AND PROPOSED COMPARISON',
    'Work and outcome sought:', note('work'),
    'Current process:', note('current'),
    'Baseline and source references:', note('baseline'),
    'Candidate AI contribution:', note('ai'),
    'Evidence and trade-offs:', note('tradeoffs'),
    '',
    'TRIAL DESIGN NOTES (AS ENTERED)',
    'Roles and continuity cover:', note('roles'),
    'Comparison and sample plan:', note('sample'),
    'Success conditions and unacceptable errors:', note('thresholds'),
    'Stop, contain and recover:', note('stop'),
    '',
    'CHALLENGE CASES - NOT YET RUN'
  ];
  const cases = [
    ['C1', 'Ordinary case', 'A typical permitted input reaches an accepted, checked output.'],
    ['C2', 'Awkward or exceptional case', 'An exception, conflicting source or unusual request needs review.'],
    ['C3', 'Missing or uncertain evidence', 'A necessary source, date or instruction is absent; do not fill it by guessing.'],
    ['C4', 'Unacceptable error and recovery', 'A wrong or unsafe result is detected; stop, contain and restore the ordinary route.'],
    ['C5', 'No permission or out-of-scope action', 'The proposed action lacks recorded permission; do not carry it out.']
  ];
  for (const [id, title, purpose] of cases) {
    lines.push('', id + ' - ' + title,
      'Challenge: ' + purpose,
      'Invented input/reference: Not prepared',
      'Expected behaviour and unacceptable result: Not agreed',
      'Actual outcome: Not run',
      'Reviewer and evidence reference: Not recorded',
      'Disposition and next step: Not decided');
  }
  lines.push('', 'REVIEW BEFORE PROCEEDING',
    'Evidence basis (self-reported):', note('evidenceType'),
    'Results to date:', note('results'),
    'Review, rework and costs:', note('costs'),
    'Missing cases and limitations:', note('limits'),
    'Outstanding follow-up:', note('followup'),
    'Next action, responsible role and review trigger:', note('next'),
    '',
    'Do not turn the proposed test cases into claimed results.',
    'Check actual permissions and evaluate the full record and, if relevant, the separate V2 assessment before any operational action.');
  return lines.join('\n') + '\n';
}
