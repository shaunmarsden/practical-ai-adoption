import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyTestResults } from '../../../docs/workbench/test-results.mjs';
import { emptyRecord } from '../../../docs/workbench/content.mjs';
import { comparisonFindings, comparisonText } from '../../../docs/workbench/comparison.mjs';

test('blank comparison does not imply a trial or a pass', () => {
  const entries = emptyTestResults();
  const result = comparisonText(entries, emptyRecord(), '2026-11-16T18:00:00.000Z');
  assert.equal((result.match(/Case status remains Not run/g) || []).length, 5);
  assert.match(result, /Expected behaviour has not been recorded/);
  assert.match(result, /does not independently verify evidence, calculate a pass rate or authorise/);
  assert.match(result, /Permission status \(self-reported\):\nNot recorded/);
  assert.match(result, /Human decision \(self-reported\):\nNo human decision recorded/);
});

test('acceptable reported result is never automatically treated as meeting expectation', () => {
  const entries = emptyTestResults();
  entries[0].expected = 'Reject if the date is inconsistent.';
  entries[0].status = 'Observed - acceptable (reported)';
  entries[0].actual = 'Fictional test: inconsistent date was accepted.';
  entries[0].evidence = 'Fictional test reference';
  entries[0].reviewer = 'Fictional role';
  const result = comparisonText(entries);
  assert.ok(result.includes(entries[0].expected));
  assert.ok(result.includes(entries[0].actual));
  assert.match(result, /Reported acceptable is not independently checked/);
  assert.doesNotMatch(result, /Automatically passed|Verified pass|Overall score/);
});

test('problem, missing evidence and inconclusive cases retain separate explicit warnings', () => {
  const entries = emptyTestResults();
  entries[1].status = 'Observed - problem (reported)';
  entries[1].expected = 'Escalate disputed source.';
  entries[1].actual = 'Fictional record used the disputed source.';
  entries[2].status = 'Observed - inconclusive (reported)';
  entries[2].actual = 'Fictional missing source cannot be recovered.';
  entries[3].actual = 'Earlier observation still present despite status Not run.';
  const result = comparisonText(entries, { ...emptyRecord(), issues: 'Critical unresolved observation', permissions: 'Unknown' });
  for (const value of [entries[1].expected, entries[1].actual, entries[2].actual, entries[3].actual, 'Critical unresolved observation', 'Unknown'])
    assert.ok(result.includes(value));
  for (const warning of [
    'Reported problem has no next action recorded.',
    'Reported inconclusive case has no follow-up recorded.',
    'No evidence reference recorded for this reported observation.',
    'Observation text exists while the status is Not run.'
  ]) assert.ok(result.includes(warning));
  assert.equal(comparisonFindings(entries[4]).includes('Case status remains Not run.'), true);
});

test('comparison reproduces untrusted content literally and never changes saved inputs', () => {
  const entries = emptyTestResults();
  entries[4].status = 'Observed - problem (reported)';
  entries[4].expected = 'Never carry out an unauthorised action.';
  entries[4].actual = 'Fictional attempted action\n<svg onload="alert(1)"></svg>';
  entries[4].evidence = 'Fictional source\n' + 'x'.repeat(1200);
  const snapshot = structuredClone(entries);
  const result = comparisonText(entries, { ...emptyRecord(), issues: 'Unresolved issue' });
  assert.ok(result.includes(entries[4].actual));
  assert.ok(result.includes(entries[4].evidence));
  assert.deepEqual(entries, snapshot);
});
