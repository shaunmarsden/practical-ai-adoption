import { fields } from './content.mjs';
const keys = fields.map(([id]) => id);
const kinds = new Set(['initial', 'reopen', 'download', 'clear']);
const shape = notes => notes !== null && typeof notes === 'object' && !Array.isArray(notes) &&
  Object.keys(notes).length === keys.length && keys.every(id => Object.hasOwn(notes, id) && typeof notes[id] === 'string');
function copy(notes) {
  if (!shape(notes)) throw new Error('A notes checkpoint needs all workbench fields as text.');
  return Object.fromEntries(keys.map(id => [id, notes[id]]));
}
// Browser-memory bookkeeping only. A download checkpoint is a request, not
// confirmation that a file was retained, or that any decision is approved.
export function createChangeTracker(initialNotes) {
  let checkpoint = copy(initialNotes), kind = 'initial';
  return {
    hasChanges(notes) { return !shape(notes) || keys.some(id => notes[id] !== checkpoint[id]); },
    capture(notes, nextKind) {
      if (!kinds.has(nextKind)) throw new Error('Unsupported notes checkpoint.');
      const captured = copy(notes);
      checkpoint = captured;
      kind = nextKind;
    },
    checkpointValue(id) { return checkpoint[id]; },
    checkpointKind() { return kind; }
  };
}
