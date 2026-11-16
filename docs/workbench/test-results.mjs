import { caveat, emptyRecord } from './content.mjs';

export const TEST_CASES = [
  ['C1', 'Ordinary case', 'A typical authorised input reaches an accepted, checked result.'],
  ['C2', 'Awkward or exceptional case', 'An exception or conflicting source is checked rather than guessed.'],
  ['C3', 'Missing or uncertain evidence', 'A missing source, date or instruction is acknowledged.'],
  ['C4', 'Unacceptable error and recovery', 'An unacceptable error is detected and contained, with a recovery route.'],
  ['C5', 'No permission or out-of-scope action', 'An unauthorised action is stopped rather than executed.']
];
export const RESULT_STATUSES = ['Not run', 'Observed - acceptable (reported)', 'Observed - problem (reported)', 'Observed - inconclusive (reported)'];
export const RESULTS_FORMAT = 'practical-ai-adoption-workbench-test-results';
export const RESULTS_VERSION = 1;
export const MAX_RESULTS_BYTES = 500_000;
const MAX_ENTRY_LENGTH = 5000;
const fields = ['expected', 'actual', 'evidence', 'reviewer', 'followup'];
const exact = (value, keys) => value !== null && typeof value === 'object' && !Array.isArray(value) &&
  Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));

export function emptyTestResults() {
  return TEST_CASES.map(([id]) => ({ id, status: 'Not run', expected: '', actual: '', evidence: '', reviewer: '', followup: '' }));
}

export function checkedTestResults(entries) {
  if (!Array.isArray(entries) || entries.length !== TEST_CASES.length) throw new Error('The file must contain exactly five cases.');
  return entries.map((entry, index) => {
    if (!exact(entry, ['id', 'status', ...fields]) || entry.id !== TEST_CASES[index][0] ||
        !RESULT_STATUSES.includes(entry.status)) throw new Error('Unsupported case or reported result status.');
    const copy = { id: entry.id, status: entry.status };
    for (const field of fields) {
      if (typeof entry[field] !== 'string' || entry[field].length > MAX_ENTRY_LENGTH) throw new Error('Each case note must be text of at most 5,000 characters.');
      copy[field] = entry[field];
    }
    // A report cannot silently claim a test happened without explaining what was seen.
    if (entry.status !== 'Not run' && !entry.actual.trim()) throw new Error('Describe what actually happened before marking a case as observed.');
    // "Not run" is allowed to retain a planned expected result, but not an actual
    // observation. Changing the status back must not silently erase earlier evidence.
    return copy;
  });
}
const validTime = value => typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) &&
  Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
const byteLength = value => new TextEncoder().encode(value).byteLength;
// Detect duplicate keys before JSON.parse silently replaces one observation
// with another. The flat five-case schema has no arbitrary nested objects.
function rejectDuplicateKeys(source) {
  const stack = [];
  for (const match of source.matchAll(/"(?:[^"\\]|\\.)*"|[{}\[\]:,]|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null/g)) {
    const token = match[0], current = stack.at(-1);
    if (token === '{') stack.push({ kind: 'object', key: true, seen: new Set() });
    else if (token === '[') stack.push({ kind: 'array' });
    else if (token === '}' || token === ']') stack.pop();
    else if (token === ',' && current?.kind === 'object') current.key = true;
    else if (token.startsWith('"') && current?.kind === 'object' && current.key) {
      const key = JSON.parse(token);
      if (current.seen.has(key)) throw new Error('Duplicate JSON keys; observations were not replaced.');
      current.seen.add(key); current.key = false;
    }
  }
}
export function testResultsJSON(entries, savedAt = new Date().toISOString()) {
  if (!validTime(savedAt)) throw new Error('Invalid save time.');
  const text = JSON.stringify({
    format: RESULTS_FORMAT, version: RESULTS_VERSION, saved_at: savedAt,
    notice: 'Self-reported test observations only; not verified, not approval or permission.',
    cases: checkedTestResults(entries)
  }, null, 2) + '\n';
  if (byteLength(text) > MAX_RESULTS_BYTES) throw new Error('The test results file is too large.');
  return text;
}
export function parseTestResults(text) {
  if (typeof text !== 'string' || byteLength(text) > MAX_RESULTS_BYTES) throw new Error('Choose a test results JSON file no larger than 500 KB.');
  const source = text.startsWith('\uFEFF') ? text.slice(1) : text;
  let parsed;
  try { parsed = JSON.parse(source); }
  catch { throw new Error('The selected file is not valid JSON.'); }
  rejectDuplicateKeys(source);
  if (!exact(parsed, ['format', 'version', 'saved_at', 'notice', 'cases']) ||
      parsed.format !== RESULTS_FORMAT || parsed.version !== RESULTS_VERSION ||
      !validTime(parsed.saved_at) ||
      parsed.notice !== 'Self-reported test observations only; not verified, not approval or permission.')
    throw new Error('This is not a supported Workbench test results file.');
  return checkedTestResults(parsed.cases);
}
export function testResultsText(entries, notes = emptyRecord(), exportedAt = new Date().toISOString()) {
  const cases = checkedTestResults(entries), data = { ...emptyRecord(), ...notes };
  const show = key => data[key] || 'Not recorded';
  const lines = [
    'AI Adoption Workbench - reported test observations', 'Format: 1', 'Exported: ' + exportedAt, '',
    caveat,
    'These observations are user-entered and unverified. A status is not permission, approval or independent validation.',
    'Not run and observed cases are kept separately. Do not calculate an overall pass rate or readiness conclusion.',
    '',
    'WORK AND PERMISSION CONTEXT (FROM CURRENT WORKBENCH NOTES)',
    'Work:', show('work'), 'Preferred route:', show('route'),
    'Boundary or reason not to trial:', show('boundary'),
    'Permission status (self-reported):', show('permissions'),
    'Existing unresolved problems:', show('issues'),
    'Evidence basis (self-reported):', show('evidenceType'),
    'Human decision (self-reported):', show('decision'),
    ''
  ];
  for (let i = 0; i < cases.length; i++) {
    const entry = cases[i], [, title, challenge] = TEST_CASES[i];
    lines.push(entry.id + ' - ' + title,
      'Challenge: ' + challenge,
      'Reported status: ' + entry.status,
      'Expected behaviour and unacceptable result:', entry.expected || 'Not recorded',
      'Actual observation:', entry.actual || (entry.status === 'Not run' ? 'Not run' : 'Not recorded'),
      'Evidence reference:', entry.evidence || 'Not recorded',
      'Reviewer or observer:', entry.reviewer || 'Not recorded',
      'Next action, including unresolved defects:', entry.followup || 'Not recorded',
      '');
  }
  lines.push('REVIEW REQUIRED', 'Compare observations with the source evidence and the complete decision record.',
    'An observed acceptable case does not cancel a reported problem, unknown permission or a failed case.',
    'Do not claim these are completed trials if only invented examples or simulations were used.');
  return lines.join('\n') + '\n';
}
