import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyRecord, fields } from '../../../docs/workbench/content.mjs';
import { createChangeTracker } from '../../../docs/workbench/changes.mjs';

test('each note changes from its checkpoint and exact reversion removes changes', () => {
  const base = emptyRecord(), tracker = createChangeTracker(base);
  assert.equal(tracker.hasChanges(base), false);
  for (const [id] of fields) {
    const edited = { ...base, [id]: `FICTIONAL ${id}` };
    assert.equal(tracker.hasChanges(edited), true, id);
    assert.equal(tracker.hasChanges({ ...base }), false, id);
  }
});

test('initial and later snapshots are copied, not aliased', () => {
  const base = emptyRecord(), tracker = createChangeTracker(base);
  base.work = 'FICTIONAL: changed original object';
  assert.equal(tracker.checkpointValue('work'), '');
  const imported = { ...emptyRecord(), work: 'FICTIONAL: Cinder Vale labels\r\nline\rthird 😀', decisionDate: '' };
  tracker.capture(imported, 'reopen');
  imported.work = 'later edit';
  assert.equal(tracker.checkpointValue('work'), 'FICTIONAL: Cinder Vale labels\r\nline\rthird 😀');
  assert.equal(tracker.checkpointValue('decisionDate'), '');
  assert.equal(tracker.checkpointKind(), 'reopen');
  assert.equal(tracker.hasChanges(imported), true);
});

test('download request checkpoint covers only the captured notes, not newer edits', () => {
  const tracker = createChangeTracker(emptyRecord());
  const captured = { ...emptyRecord(), work: 'FICTIONAL captured' };
  tracker.capture(captured, 'download');
  assert.equal(tracker.hasChanges(captured), false);
  assert.equal(tracker.checkpointKind(), 'download');
  assert.equal(tracker.hasChanges({ ...captured, work: 'FICTIONAL newer' }), true);
});

test('incomplete or unsupported checkpoint requests cannot discard existing state', () => {
  const base = { ...emptyRecord(), issues: 'FICTIONAL: unresolved issue' };
  const tracker = createChangeTracker(base);
  for (const [notes, kind] of [[{}, 'download'], [base, 'export'], [{ ...base, work: false }, 'reopen']]) assert.throws(() => tracker.capture(notes, kind));
  assert.equal(tracker.hasChanges(base), false);
  assert.equal(tracker.checkpointValue('issues'), base.issues);
  assert.equal(tracker.checkpointKind(), 'initial');
});

test('clearing resets to defaults without verifying a positive decision', () => {
  const base = { ...emptyRecord(), readiness: 'COMPLETE RECORD - HUMAN DECISION REQUIRED', decision: 'Continue within an existing authorised boundary', issues: 'FICTIONAL unresolved' };
  const tracker = createChangeTracker(base);
  tracker.capture(base, 'download');
  assert.equal(tracker.checkpointValue('issues'), base.issues);
  assert.equal(tracker.checkpointValue('readiness'), base.readiness);
  tracker.capture(emptyRecord(), 'clear');
  assert.equal(tracker.hasChanges(emptyRecord()), false);
  assert.equal(tracker.checkpointValue('decision'), 'No human decision recorded');
  assert.equal(tracker.checkpointKind(), 'clear');
});
