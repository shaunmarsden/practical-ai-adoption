import { checkedTestResults, TEST_CASES } from './test-results.mjs';
import { caveat, emptyRecord } from './content.mjs';

// This is a completeness checklist, not a semantic verdict on whether an
// observation meets an expectation. All findings come from literal fields.
export function comparisonFindings(entry) {
  const findings = [];
  if (!entry.expected.trim()) findings.push('Expected behaviour has not been recorded.');
  if (entry.status === 'Not run') {
    findings.push('Case status remains Not run.');
    if (entry.actual.trim()) findings.push('Observation text exists while the status is Not run. Check the status and preserve the source notes.');
  } else {
    if (!entry.evidence.trim()) findings.push('No evidence reference recorded for this reported observation.');
    if (!entry.reviewer.trim()) findings.push('No reviewer or observer role recorded.');
  }
  if (entry.status === 'Observed - problem (reported)' && !entry.followup.trim()) findings.push('Reported problem has no next action recorded.');
  if (entry.status === 'Observed - inconclusive (reported)' && !entry.followup.trim()) findings.push('Reported inconclusive case has no follow-up recorded.');
  if (entry.status === 'Observed - acceptable (reported)') findings.push('Reported acceptable is not independently checked and does not override other problems.');
  return findings;
}

export function comparisonText(entries, notes = emptyRecord(), exportedAt = new Date().toISOString()) {
  const cases = checkedTestResults(entries), data = { ...emptyRecord(), ...notes };
  const note = id => data[id] || 'Not recorded';
  const lines = [
    'AI Adoption Workbench - expected and observed comparison',
    'Format: 1',
    'Exported: ' + exportedAt,
    '',
    caveat,
    'This report places user-entered expectations next to reported observations.',
    'It checks missing fields and status inconsistencies, not whether an outcome met the expectation.',
    'It does not independently verify evidence, calculate a pass rate or authorise a trial, deployment or change.',
    '',
    'REVIEW BEFORE ANY CONCLUSION',
    'Permission status (self-reported):', note('permissions'),
    'Existing unresolved problems:', note('issues'),
    'Evidence basis (self-reported):', note('evidenceType'),
    'V2 position (self-reported):', note('readiness'),
    'Human decision (self-reported):', note('decision'),
    'Next action:', note('next')
  ];
  for (let i = 0; i < cases.length; i++) {
    const entry = cases[i], [, title, challenge] = TEST_CASES[i];
    lines.push('', entry.id + ' - ' + title,
      'Challenge:', challenge,
      'Reported status:', entry.status,
      'EXPECTED BEHAVIOUR AND UNACCEPTABLE RESULT',
      entry.expected || 'Not recorded',
      'ACTUAL OBSERVATION (SELF-REPORTED)',
      entry.actual || (entry.status === 'Not run' ? 'Not run' : 'Not recorded'),
      'EVIDENCE REFERENCE',
      entry.evidence || 'Not recorded',
      'REVIEWER / OBSERVER',
      entry.reviewer || 'Not recorded',
      'UNRESOLVED PROBLEMS / NEXT ACTION',
      entry.followup || 'Not recorded',
      'CHECK THE RECORD');
    const findings = comparisonFindings(entry);
    lines.push(...(findings.length ? findings.map(f => '- ' + f) : ['- No required field gaps flagged by this checklist; substantive review is still needed.']));
  }
  lines.push('', 'REQUIRED HUMAN REVIEW',
    'Inspect source evidence and compare the original expected and observed text yourself.',
    'Keep every reported problem, inconclusive case, unrun test and unknown permission visible.',
    'This comparison does not replace the full Workbench record or the separate V2 readiness assessment.');
  return lines.join('\n') + '\n';
}
