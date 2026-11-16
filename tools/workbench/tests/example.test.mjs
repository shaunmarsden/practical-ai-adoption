import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fields, recordText } from '../../../docs/workbench/content.mjs';
import { draftText, parseDraft } from '../../../docs/workbench/draft.mjs';
import { fictionalExample } from '../../../docs/workbench/example.mjs';

test('first-run example is complete, fictional and has no human decision', () => {
  const example = fictionalExample();
  assert.deepEqual(Object.keys(example).sort(), fields.map(([id]) => id).sort());
  assert.equal(example.evidenceType, 'Fictional exercise');
  assert.equal(example.decision, 'No human decision recorded');
  assert.equal(example.decisionDate, '');
  assert.equal(example.readiness, 'Not applicable (explain below)');
  assert.match(example.boundary, /No AI trial proposed/);
  assert.match(example.permissions, /unknown/i);
  assert.match(example.results, /No pilot has happened/);
  assert.match(example.costs, /No productivity, cash or capacity benefit has been measured/);
  const exported = recordText(example, '2026-11-16T11:00:00.000Z');
  assert.match(exported, /Planning and self-reported decision record only/);
  assert.match(exported, /Human decision \(self-reported\): No human decision recorded/);
  assert.match(exported, /Evidence basis \(self-reported\): Fictional exercise/);
  assert.match(exported, /Known problems:/);
});

test('fictional example remains an editable, fully valid local draft', () => {
  const example = fictionalExample();
  const text = draftText(example, '2026-11-16T11:00:00.000Z');
  assert.deepEqual(parseDraft(text), example);
  assert.notStrictEqual(fictionalExample(), example);
});
