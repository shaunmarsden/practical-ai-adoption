import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyRecord } from '../../../docs/workbench/content.mjs';
import { TEST_CASES, emptyTestResults, checkedTestResults, testResultsJSON, parseTestResults, testResultsText } from '../../../docs/workbench/test-results.mjs';

test('blank report has five unrun cases and no invented results', () => {
  const entries = emptyTestResults(), output = testResultsText(entries, emptyRecord(), '2026-11-16T17:00:00.000Z');
  assert.equal(entries.length, 5);
  assert.equal(TEST_CASES.length, 5);
  assert.equal((output.match(/Reported status: Not run/g) || []).length, 5);
  assert.match(output, /Human decision \(self-reported\):\nNo human decision recorded/);
  assert.match(output, /These observations are user-entered and unverified/);
  assert.match(output, /permission status \(self-reported\):/i);
});

test('a failed case cannot disappear when another case is reported acceptable', () => {
  const entries = emptyTestResults();
  entries[0].status = 'Observed - acceptable (reported)';
  entries[0].actual = 'Invented ordinary record checked.';
  entries[3].status = 'Observed - problem (reported)';
  entries[3].actual = 'Fictional critical wrong date escaped review.\n<svg onload="bad()">literal</svg>';
  entries[3].evidence = 'Invented record Q4, row 2';
  entries[3].followup = 'Stop. Reviewer must inspect before any continuation.';
  const notes = { ...emptyRecord(), permissions: 'Unknown, no live permission.', issues: 'Critical problem unresolved.' };
  const output = testResultsText(entries, notes);
  for (const required of [entries[0].actual, entries[3].actual, entries[3].evidence, entries[3].followup, notes.permissions, notes.issues]) assert.ok(output.includes(required));
  assert.equal((output.match(/Observed - problem \(reported\)/g) || []).length, 1);
  assert.match(output, /An observed acceptable case does not cancel a reported problem/);
});

test('save-reopen keeps all literal notes and rejects invented or malformed statuses', () => {
  const entries = emptyTestResults();
  entries[1].status = 'Observed - inconclusive (reported)';
  entries[1].actual = 'Conflicting fictional sources, cannot decide.';
  entries[1].expected = 'Escalate disagreement rather than guess.';
  entries[1].reviewer = 'Reviewer role only';
  const before = structuredClone(entries);
  const text = testResultsJSON(entries, '2026-11-16T17:00:00.000Z');
  assert.deepEqual(parseTestResults(text), entries);
  assert.deepEqual(entries, before);
  assert.throws(() => checkedTestResults([{ ...entries[0], status: 'Approved' }, ...entries.slice(1)]));
  assert.throws(() => checkedTestResults([{ ...entries[0], status: 'Observed - acceptable (reported)' }, ...entries.slice(1)]), /Describe what actually happened/);
  assert.throws(() => parseTestResults(text.replace('"version": 1', '"version": 2')), /supported/);
  assert.throws(() => parseTestResults(text.replace('"format":', '"format": "discarded", "format":')), /Duplicate JSON keys/);
  assert.throws(() => parseTestResults('{' ), /not valid JSON/);
  assert.throws(() => parseTestResults(' '.repeat(500001)), /no larger than/);
  assert.throws(() => checkedTestResults([...entries].reverse()), /Unsupported case/);
});

test('unknown source context is not repaired or guessed in report', () => {
  const entries = emptyTestResults();
  entries[4].status = 'Observed - problem (reported)';
  entries[4].actual = 'Fictional out-of-scope API operation was attempted, blocked before execution.';
  const result = testResultsText(entries, { ...emptyRecord(), permissions: 'Unknown', boundary: 'No AI trial proposed.' });
  assert.match(result, /Permission status \(self-reported\):\nUnknown/);
  assert.match(result, /Boundary or reason not to trial:\nNo AI trial proposed/);
  assert.match(result, /Fictional out-of-scope API operation/);
  assert.match(result, /not permission, approval or independent validation/);
});
