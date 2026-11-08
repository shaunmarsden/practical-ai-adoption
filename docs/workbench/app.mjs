import { steps, emptyRecord, recordText, caveat } from './content.mjs';
import { draftText, parseDraft, MAX_DRAFT_BYTES } from './draft.mjs';
import { createChangeTracker } from './changes.mjs';
const byId = id => document.getElementById(id);
let active = 0;
const controls = new Map();
let notes = emptyRecord(), editRevision = 0, observedBadDate = false;
const displayed = new Map();
const checkpointDisplayed = new Map();
const changeTracker = createChangeTracker(notes);
function element(tag, text, parent) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  parent?.append(el);
  return el;
}
const buttons = [], panels = [];
steps.forEach((step, index) => {
  const item = element('li', '', byId('steps'));
  const button = element('button', `${index + 1}. ${step.title}`, item);
  button.type = 'button';
  button.addEventListener('click', () => show(index));
  buttons.push(button);
  const panel = element('section', '', byId('panels'));
  panel.setAttribute('aria-labelledby', `step-${index}`);
  const heading = element('h2', `${index + 1}. ${step.title}`, panel);
  heading.id = `step-${index}`;
  heading.tabIndex = -1;
  element('p', step.intro, panel);
  const reading = element('p', 'Related reading: ', panel);
  step.links.forEach((link, i) => {
    if (i) reading.append(' / ');
    const a = element('a', `${link.title} (new tab)`, reading);
    a.href = link.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });
  for (const [id, label, hint, kind] of step.fields) {
    const group = element('div', '', panel);
    group.className = 'field';
    const lab = element('label', label, group);
    lab.htmlFor = id;
    const help = element('p', hint, group);
    help.id = `${id}-help`;
    const input = element(Array.isArray(kind) ? 'select' : kind === 'date' ? 'input' : 'textarea', '', group);
    input.id = id;
    input.name = id;
    input.setAttribute('aria-describedby', help.id);
    if (Array.isArray(kind)) {
      for (const choice of kind) element('option', choice, input).value = choice;
      // Native selects can crop long choices on narrow screens. Keep the full
      // selected wording readable outside the control as well.
      const selected = element('p', `Current selection: ${input.value}`, group);
      selected.id = `${id}-selection`;
      input.addEventListener('change', () => { selected.textContent = `Current selection: ${input.value}`; });
    }
    else if (kind === 'date') input.type = 'date';
    else { input.rows = 4; input.maxLength = 12000; }
    controls.set(id, input);
    displayed.set(id, input.value);
    checkpointDisplayed.set(id, input.value);
  }
  panels.push(panel);
});
// Native textareas normalise CRLF/CR. Retain imported strings until their
// visible control changes, so unrelated edits and resaving cannot lose data.
function incompleteDate() { return controls.get('decisionDate').validity.badInput; }
function values() {
  const badDate = incompleteDate();
  if (badDate !== observedBadDate) { observedBadDate = badDate; editRevision++; }
  for (const [id, input] of controls) {
    if (input.value !== displayed.get(id)) {
      // Returning to the checkpoint's displayed text restores its exact
      // original string too (including imported CRLF rather than native LF).
      notes[id] = input.value === checkpointDisplayed.get(id) ? changeTracker.checkpointValue(id) : input.value;
      displayed.set(id, input.value);
      const selected = byId(`${id}-selection`);
      if (selected) selected.textContent = `Current selection: ${input.value}`;
      editRevision++;
    }
  }
  return { ...notes };
}
function populate(data, kind) {
  notes = { ...data };
  for (const [id, input] of controls) {
    input.value = notes[id];
    displayed.set(id, input.value);
    const selected = byId(`${id}-selection`);
    if (selected) selected.textContent = `Current selection: ${input.value}`;
  }
  editRevision++;
  rememberCheckpoint(data, kind);
}
function show(index, focus = true) {
  active = index;
  panels.forEach((panel, i) => { panel.hidden = i !== active; });
  buttons.forEach((button, i) => {
    if (i === active) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  byId('back-step').disabled = active === 0;
  byId('next-step').disabled = active === steps.length - 1;
  if (focus) panels[active].querySelector('h2').focus();
  updateChanges();
}
function refreshSummary() { byId('summary').textContent = recordText(values()); }
byId('caveat').textContent = caveat;
byId('notes').addEventListener('submit', event => event.preventDefault());
function warnBeforeLeaving(event) {
  if (!changeTracker.hasChanges(values()) && !incompleteDate()) return;
  event.preventDefault();
  event.returnValue = true; // Legacy implementations; browsers choose the text.
}
function updateChanges() {
  const changed = changeTracker.hasChanges(values()) || incompleteDate();
  if (changed) window.addEventListener('beforeunload', warnBeforeLeaving);
  else window.removeEventListener('beforeunload', warnBeforeLeaving);
  const cleanMessages = {
    initial: 'No edits to keep yet. Nothing is saved automatically.',
    reopen: 'No changes since this draft was reopened. Its notes are still unverified.',
    download: 'Draft download requested. No newer edits. Check your downloads; this page cannot confirm the file was kept.',
    clear: 'Notes cleared. Nothing is saved automatically.'
  };
  const message = incompleteDate()
    ? 'The decision date is incomplete. Complete or clear it before saving a draft.'
    : changed
    ? 'Newer edits are only in this page. Save draft to request a copy you can reopen.'
    : cleanMessages[changeTracker.checkpointKind()];
  const status = byId('changes-status');
  // Avoid repeating a live-region announcement for each keystroke.
  if (status.textContent !== message) status.textContent = message;
  status.dataset.changed = String(changed);
}
function rememberCheckpoint(captured, kind) {
  changeTracker.capture(captured, kind);
  for (const [id, input] of controls) {
    const rendered = input.cloneNode(true);
    rendered.value = captured[id];
    checkpointDisplayed.set(id, rendered.value);
  }
  updateChanges();
}
function onNotesEdited() {
  values();
  byId('status').textContent = '';
  if (!byId('summary').hidden) refreshSummary();
  updateChanges();
}
byId('notes').addEventListener('input', onNotesEdited);
byId('notes').addEventListener('change', onNotesEdited);
// Some engines emit no input/change event for an incomplete native date.
function reconcileDateEdit(event) {
  const input = controls.get('decisionDate');
  // A native date segment can change while both value='' and badInput=true
  // stay constant. Count editing keys so a pending import cannot replace it.
  const partialKeyEdit = event.type === 'keyup' && incompleteDate() &&
    (event.key.length === 1 || ['ArrowUp', 'ArrowDown', 'Backspace', 'Delete'].includes(event.key));
  if (partialKeyEdit) editRevision++;
  if (partialKeyEdit || input.value !== displayed.get('decisionDate') || incompleteDate() !== observedBadDate) onNotesEdited();
}
controls.get('decisionDate').addEventListener('keyup', reconcileDateEdit);
controls.get('decisionDate').addEventListener('blur', reconcileDateEdit);
// Browsers may restore controls from history without a fresh input event.
window.addEventListener('pageshow', () => {
  values();
  if (!byId('summary').hidden) refreshSummary();
  updateChanges();
});
byId('back-step').addEventListener('click', () => show(Math.max(0, active - 1)));
byId('next-step').addEventListener('click', () => show(Math.min(steps.length - 1, active + 1)));
byId('review').addEventListener('click', () => {
  refreshSummary();
  byId('summary').hidden = false;
  byId('summary').focus();
  updateChanges();
});
function download(text, type, filename) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  try {
    const a = element('a', '', document.body);
    a.href = url;
    a.download = filename;
    try { a.click(); } finally { a.remove(); }
  } finally { setTimeout(() => URL.revokeObjectURL(url), 1000); }
}
byId('export').addEventListener('click', () => {
  try {
    download(recordText(values()), 'text/plain;charset=utf-8', 'ai-adoption-decision-record.txt');
    byId('status').textContent = 'Text record download requested. Check your downloads before closing this page.';
  } catch {
    refreshSummary();
    byId('summary').hidden = false;
    byId('status').textContent = 'Download could not start. Copy the record preview below to keep your notes.';
  }
});
byId('save-draft').addEventListener('click', () => {
  if (incompleteDate()) {
    byId('draft-status').textContent = 'Complete or clear the decision date before saving a draft. Your notes remain here.';
    updateChanges();
    return;
  }
  try {
    const captured = values();
    download(draftText(captured), 'application/json;charset=utf-8', 'ai-adoption-workbench-draft.json');
    rememberCheckpoint(captured, 'download');
    byId('draft-status').textContent = 'Draft download requested. Check your downloads before closing. Saving is not approval.';
  } catch {
    byId('draft-status').textContent = 'Draft download could not start. Your notes remain here. Try again or use the text export.';
    updateChanges();
  }
});
byId('reopen-draft').addEventListener('change', async event => {
  const picker = event.target;
  const file = picker.files?.[0];
  picker.value = '';
  if (!file) return;
  values();
  const revision = editRevision;
  picker.disabled = true;
  byId('draft-status').textContent = 'Reading local draft...';
  try {
    if (file.size > MAX_DRAFT_BYTES) throw new Error('Choose a file no larger than 4 MB (4,000,000 bytes).');
    const buffer = await file.arrayBuffer();
    // Decode strictly: File.text() silently replaces invalid UTF-8 bytes.
    let text;
    try { text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(buffer); }
    catch { throw new Error('The file must contain valid UTF-8 text.'); }
    const imported = parseDraft(text);
    values();
    if (editRevision !== revision) throw new Error('Notes changed while the file was loading. Choose the file again when you are ready.');
    const current = values(), defaults = emptyRecord();
    if ((incompleteDate() || Object.keys(defaults).some(id => current[id] !== defaults[id])) &&
        !window.confirm('Replace all current notes with this local draft? Save your current draft first if you need to keep it. Reopening does not verify evidence or grant approval.')) {
      byId('draft-status').textContent = 'Reopening cancelled. Your current notes are unchanged.';
      return;
    }
    populate(imported, 'reopen');
    byId('status').textContent = '';
    if (!byId('summary').hidden) refreshSummary();
    byId('draft-status').textContent = 'Draft reopened locally. Notes have not been verified. This does not run V2 or grant approval.';
    show(0);
  } catch (error) {
    byId('draft-status').textContent = `Could not reopen draft. ${error.message} Your current notes are unchanged.`;
  } finally { picker.disabled = false; }
});
byId('reset').addEventListener('click', () => {
  if (!window.confirm('Clear all workbench notes? Export first if you need to keep them. Existing downloads will remain.')) return;
  populate(emptyRecord(), 'clear');
  byId('draft-status').textContent = '';
  byId('summary').textContent = '';
  byId('summary').hidden = true;
  byId('status').textContent = 'Workbench notes cleared. Existing downloads are unchanged.';
  show(0);
});
show(0, false);
byId('workbench').hidden = false;
