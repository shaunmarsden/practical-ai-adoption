import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fields, emptyRecord } from '../../../docs/workbench/content.mjs';
import { draftText, parseDraft, MAX_DRAFT_BYTES } from '../../../docs/workbench/draft.mjs';
const stamp = '2026-11-07T12:00:00.000Z';
const payload = () => JSON.parse(draftText(emptyRecord(), stamp));

test('draft round trip preserves every note, blank and exact string without mutating its source', () => {
  const notes = emptyRecord();
  for (const [id, , , kind] of fields) if (!kind) notes[id] = `FICTIONAL ${id}: Zoë 😀\r\nline\rthird\tend\n  \u0000"notes": {"decision":"APPROVED"}  `;
  const before = structuredClone(notes);
  const text = draftText(notes, stamp);
  assert.deepEqual(parseDraft(text), notes);
  assert.deepEqual(notes, before);
  assert.match(text, /does not verify evidence, run V2 or grant approval/);
  assert.equal(JSON.parse(text).saved_at, stamp);
  assert.equal(parseDraft(text).decisionDate, '');
});

test('every supported select choice remains a literal, unverified choice', () => {
  for (const [id, , , kind] of fields) if (Array.isArray(kind)) for (const value of kind) {
    const notes = { ...emptyRecord(), [id]: value, issues: 'FICTIONAL: unresolved error; no sending permission.' };
    assert.deepEqual(parseDraft(draftText(notes, stamp)), notes);
  }
});

test('all allowed maximum-length notes can be saved and reopened, including JSON escape expansion', () => {
  const notes = emptyRecord();
  for (const [id, , , kind] of fields) if (!kind) notes[id] = '\u0000'.repeat(12000);
  const text = draftText(notes, stamp);
  assert.ok(Buffer.byteLength(text) < MAX_DRAFT_BYTES);
  assert.deepEqual(parseDraft(text), notes);
  notes.work += 'x';
  assert.throws(() => draftText(notes, stamp), /12,000/);
});

test('file size is checked in UTF-8 bytes, including BOM and harmless whitespace', () => {
  const text = draftText(emptyRecord(), stamp);
  const exact = text + ' '.repeat(MAX_DRAFT_BYTES - Buffer.byteLength(text));
  assert.deepEqual(parseDraft(exact), emptyRecord());
  assert.throws(() => parseDraft(exact + ' '), /4 MB/);
  assert.deepEqual(parseDraft('\uFEFF' + text), emptyRecord());
  assert.throws(() => parseDraft('\uFEFF' + exact), /4 MB/);
});

test('malformed, foreign, future, incomplete and unexpected data are rejected without coercion', () => {
  for (const text of ['{', 'null', '[]', '"draft"', 'true']) assert.throws(() => parseDraft(text));
  const mutations = [
    p => { p.format = 'pilot-readiness'; }, p => { p.schema_version = 2; }, p => { p.schema_version = '1'; },
    p => { p.approved = true; }, p => { p.notice = 'Approved'; }, p => { delete p.saved_at; },
    p => { p.notes = []; }, p => { p.notes.work = null; }, p => { p.notes.work = 0; },
    p => { p.notes.work = {}; }, p => { p.notes.decision = 'APPROVED'; }, p => { delete p.notes.next; },
    p => { p.notes.approved = true; }, p => { p.notes.work = 'x'.repeat(12001); },
    p => { p.saved_at = '2026-02-30T00:00:00.000Z'; }, p => { p.saved_at = '2026-11-07'; },
  ];
  for (const mutate of mutations) {
    const p = payload(); mutate(p);
    const before = JSON.stringify(p);
    assert.throws(() => parseDraft(before));
    assert.equal(JSON.stringify(p), before);
  }
});

test('duplicate and escaped-equivalent keys cannot silently discard earlier data', () => {
  const text = draftText(emptyRecord(), stamp);
  assert.throws(() => parseDraft(text.replace('"format":', '"format":"ignored", "format":')), /duplicate/);
  assert.throws(() => parseDraft(text.replace('"work": ""', '"work":"discarded", "w\\u006frk":""')), /duplicate/);
  assert.throws(() => parseDraft(text.replace('"notes":', '"notes":{}, "n\\u006ftes":')), /duplicate/);
});

test('real calendar dates are preserved and blanks never gain today\'s date', () => {
  for (const decisionDate of ['', '0001-01-01', '2024-02-29', '9999-12-31']) {
    const notes = { ...emptyRecord(), decisionDate };
    assert.equal(parseDraft(draftText(notes, stamp)).decisionDate, decisionDate);
  }
  for (const decisionDate of ['0000-01-01', '2026-02-29', '2026-04-31', '2026-1-1', ' 2026-01-01']) {
    const p = payload(); p.notes.decisionDate = decisionDate;
    assert.throws(() => parseDraft(JSON.stringify(p)), /Decision date/);
  }
});
