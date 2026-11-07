import { fields } from './content.mjs';

export const DRAFT_FORMAT = 'practical-ai-adoption-workbench-draft';
export const DRAFT_VERSION = 1;
export const MAX_DRAFT_BYTES = 4_000_000;
export const MAX_NOTE_LENGTH = 12_000;
// Part of format version 1, not an instruction read from an imported file.
export const DRAFT_NOTICE = 'User-entered notes only. Saving or reopening this draft does not verify evidence, run V2 or grant approval.';
const envelopeKeys = ['format', 'schema_version', 'saved_at', 'notice', 'notes'];
const fieldKeys = fields.map(([id]) => id);
const bytes = text => new TextEncoder().encode(text).byteLength;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
function exactKeys(value, keys) {
  return object(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
}
function dateValid(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.slice(0, 4) === '0000') return false;
  const time = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(time.getTime()) && time.toISOString().slice(0, 10) === value;
}
function timestampValid(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false;
  const time = new Date(value);
  return Number.isFinite(time.getTime()) && time.toISOString() === value;
}
function checkedNotes(notes) {
  if (!exactKeys(notes, fieldKeys)) throw new Error('The draft must contain exactly the workbench notes for this version.');
  const copy = {};
  for (const [id, label, , kind] of fields) {
    const value = notes[id];
    if (typeof value !== 'string') throw new Error(`${label} must be text.`);
    if (Array.isArray(kind)) {
      if (!kind.includes(value)) throw new Error(`${label} has an unsupported choice.`);
    } else if (kind === 'date') {
      if (value !== '' && !dateValid(value)) throw new Error('Decision date must be blank or a real date in YYYY-MM-DD format.');
    } else if (value.length > MAX_NOTE_LENGTH) throw new Error(`${label} is longer than 12,000 characters.`);
    copy[id] = value;
  }
  return copy;
}
// JSON.parse normally accepts duplicate keys, silently losing earlier values.
// Syntax and the flat envelope/notes shape are checked first. Tokenise strings
// (including escaped keys) so text that merely looks like JSON is untouched.
function rejectDuplicateKeys(text) {
  const stack = [];
  const tokens = text.matchAll(/"(?:[^"\\]|\\.)*"|[{}\[\]:,]|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null/g);
  for (const [token] of tokens) {
    const current = stack.at(-1);
    if (token === '{') stack.push({ kind: 'object', key: true, seen: new Set() });
    else if (token === '[') stack.push({ kind: 'array' });
    else if (token === '}' || token === ']') stack.pop();
    else if (token === ',' && current?.kind === 'object') current.key = true;
    else if (token.startsWith('"') && current?.kind === 'object' && current.key) {
      const key = JSON.parse(token);
      if (current.seen.has(key)) throw new Error('The draft contains duplicate JSON keys. No notes were replaced.');
      current.seen.add(key);
      current.key = false;
    }
  }
}
export function parseDraft(text) {
  if (typeof text !== 'string' || bytes(text) > MAX_DRAFT_BYTES) throw new Error('Choose a workbench JSON draft no larger than 4 MB (4,000,000 bytes).');
  const source = text.startsWith('\uFEFF') ? text.slice(1) : text;
  let data;
  try { data = JSON.parse(source); }
  catch { throw new Error('This file is not valid JSON. Choose a draft saved by this workbench.'); }
  if (!exactKeys(data, envelopeKeys)) throw new Error('This file has missing or unsupported draft fields.');
  if (data.format !== DRAFT_FORMAT || data.schema_version !== DRAFT_VERSION) throw new Error('This is not a supported workbench draft version. Text records and V2 reports cannot be reopened here.');
  if (data.notice !== DRAFT_NOTICE || !timestampValid(data.saved_at)) throw new Error('The draft has unsupported format details or an invalid save timestamp.');
  const notes = checkedNotes(data.notes);
  rejectDuplicateKeys(source);
  return notes;
}
export function draftText(notes, savedAt = new Date().toISOString()) {
  if (!timestampValid(savedAt)) throw new Error('The save timestamp is invalid.');
  const text = JSON.stringify({ format: DRAFT_FORMAT, schema_version: DRAFT_VERSION, saved_at: savedAt, notice: DRAFT_NOTICE, notes: checkedNotes(notes) }, null, 2) + '\n';
  if (bytes(text) > MAX_DRAFT_BYTES) throw new Error('The draft is too large to save. Your notes remain in this page.');
  return text;
}
