import { steps, emptyRecord, recordText, caveat } from './content.mjs';
const byId = id => document.getElementById(id);
let active = 0;
const controls = new Map();
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
  }
  panels.push(panel);
});
function values() { return Object.fromEntries([...controls].map(([id, input]) => [id, input.value])); }
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
}
function refreshSummary() { byId('summary').textContent = recordText(values()); }
byId('caveat').textContent = caveat;
byId('notes').addEventListener('submit', event => event.preventDefault());
byId('notes').addEventListener('input', () => {
  byId('status').textContent = '';
  if (!byId('summary').hidden) refreshSummary();
});
byId('back-step').addEventListener('click', () => show(Math.max(0, active - 1)));
byId('next-step').addEventListener('click', () => show(Math.min(steps.length - 1, active + 1)));
byId('review').addEventListener('click', () => {
  refreshSummary();
  byId('summary').hidden = false;
  byId('summary').focus();
});
byId('export').addEventListener('click', () => {
  let url;
  try {
    url = URL.createObjectURL(new Blob([recordText(values())], { type: 'text/plain;charset=utf-8' }));
    const a = element('a', '', document.body);
    a.href = url;
    a.download = 'ai-adoption-decision-record.txt';
    a.click();
    a.remove();
    byId('status').textContent = 'Text record download requested. Check your downloads before closing this page.';
  } catch {
    refreshSummary();
    byId('summary').hidden = false;
    byId('status').textContent = 'Download could not start. Copy the record preview below to keep your notes.';
  } finally {
    if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
});
byId('reset').addEventListener('click', () => {
  if (!window.confirm('Clear all workbench notes? Export first if you need to keep them. Existing downloads will remain.')) return;
  for (const [id, value] of Object.entries(emptyRecord())) {
    controls.get(id).value = value;
    const selected = byId(`${id}-selection`);
    if (selected) selected.textContent = `Current selection: ${value}`;
  }
  byId('summary').textContent = '';
  byId('summary').hidden = true;
  byId('status').textContent = 'Workbench notes cleared. Existing downloads are unchanged.';
  show(0);
});
show(0, false);
byId('workbench').hidden = false;
