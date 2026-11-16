import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyRecord } from '../../../docs/workbench/content.mjs';
import { safeTestSheetText } from '../../../docs/workbench/test-sheet.mjs';

test('blank work produces no invented results or authority', () => {
  const text = safeTestSheetText(emptyRecord(), '2026-11-16T16:00:00.000Z');
  assert.match(text, /DRAFT ONLY/);
  assert.match(text, /Actual permissions \(self-reported, unverified\):\nNot recorded/);
  assert.match(text, /Human decision \(self-reported, unverified\):\nNo human decision recorded/);
  assert.equal((text.match(/Actual outcome: Not run/g) || []).length, 5);
  assert.equal((text.match(/Disposition and next step: Not decided/g) || []).length, 5);
  assert.match(text, /do not run an AI trial/i);
});

test('adversarial positive decision never suppresses unknown permission or escaped error', () => {
  const notes = {
    ...emptyRecord(),
    work: 'Invented club update',
    issues: 'Fictional critical error still unresolved\n<script>alert(1)</script>',
    permissions: 'Unknown permission. Do not proceed.',
    route: 'Use a non-AI option.',
    boundary: 'No AI trial proposed.',
    evidenceType: 'Fictional exercise',
    decision: 'Continue within an existing authorised boundary',
    next: 'Investigate missing authority; no rollout.'
  };
  const before = structuredClone(notes);
  const text = safeTestSheetText(notes, '2026-11-16T16:00:00.000Z');
  for (const v of [notes.issues, notes.permissions, notes.boundary, notes.decision, notes.next]) assert.ok(text.includes(v));
  assert.ok(text.indexOf(notes.issues) < text.indexOf('CHALLENGE CASES'));
  assert.match(text, /Actual outcome: Not run/);
  assert.match(text, /Candidate AI contribution:\nNot recorded/);
  assert.deepEqual(notes, before);
});

test('missing evidence stays missing and literal long notes survive', () => {
  const notes = { ...emptyRecord(), baseline: 'Unknown', sample: 'No sample agreed', issues: 'z'.repeat(3000) };
  const text = safeTestSheetText(notes, '2026-11-16T16:00:00.000Z');
  for (const v of [notes.baseline, notes.sample, notes.issues]) assert.ok(text.includes(v));
  assert.match(text, /Expected behaviour and unacceptable result: Not agreed/);
  assert.match(text, /Reviewer and evidence reference: Not recorded/);
});
