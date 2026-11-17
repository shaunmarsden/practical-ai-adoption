import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyRecord } from '../../../docs/workbench/content.mjs';
import { emptyTestResults } from '../../../docs/workbench/test-results.mjs';
import { completeReviewPackText } from '../../../docs/workbench/review-pack.mjs';

test('blank handover never invents trials, evidence, decisions or permissions', () => {
  const output = completeReviewPackText(emptyRecord(), emptyTestResults(), '2026-11-17T09:00:00.000Z');
  assert.match(output, /Human decision \(self-reported\):\nNo human decision recorded/);
  assert.match(output, /Permission status:\nNot recorded/);
  assert.equal((output.match(/Reported status:\nNot run/g) || []).length, 5);
  assert.match(output, /Keep the two source JSON files separately/);
  assert.match(output, /an automatic readiness judgement/);
});
test('positive self-report cannot conceal failure, missing permissions or omitted evidence', () => {
  const notes = { ...emptyRecord(), work: 'Invented library notice', issues: 'Unresolved wrong date', permissions: 'Unknown', decision: 'Continue within an existing authorised boundary', evidenceType: 'Fictional exercise', nonAi: 'Single source date list', ai: 'Not needed', route: 'Use non-AI first', next: 'Review bad date before changes' };
  const cases = emptyTestResults();
  cases[0].status = 'Observed - acceptable (reported)';
  cases[0].actual = 'Normal fictional notice looked good';
  cases[3].status = 'Observed - problem (reported)';
  cases[3].expected = 'Wrong date must be blocked';
  cases[3].actual = 'Wrong date went through\n<script>literal only</script>';
  cases[3].followup = 'Stop until correction';
  const beforeNotes = structuredClone(notes), beforeCases = structuredClone(cases);
  const result = completeReviewPackText(notes, cases, '2026-11-17T09:00:00.000Z');
  for (const value of [notes.issues, notes.permissions, notes.decision, notes.nonAi, notes.route, notes.next, cases[0].actual, cases[3].expected, cases[3].actual, cases[3].followup]) assert.ok(result.includes(value), value);
  assert.match(result, /No evidence reference recorded for this reported observation/);
  assert.doesNotMatch(result, /Reported problem has no next action recorded\./);
  assert.deepEqual(notes, beforeNotes); assert.deepEqual(cases, beforeCases);
});
test('incomplete observed case cannot be bundled, no fall-through to fictitious results', () => {
  const cases = emptyTestResults();
  cases[1].status = 'Observed - inconclusive (reported)';
  assert.throws(() => completeReviewPackText(emptyRecord(), cases), /Describe what actually happened/);
});
