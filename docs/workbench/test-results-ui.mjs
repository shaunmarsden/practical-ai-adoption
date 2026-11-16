import { comparisonText } from './comparison.mjs';
import { TEST_CASES, RESULT_STATUSES, emptyTestResults, checkedTestResults, testResultsJSON, parseTestResults, testResultsText, MAX_RESULTS_BYTES } from './test-results.mjs';

export function initialiseTestResults({ download, getNotes }) {
  const byId = id => document.getElementById(id);
  const host = byId('test-results-cases');
  const controls = [];
  let entries = emptyTestResults(), checkpoint = JSON.stringify(entries), revision = 0;
  const fieldNames = [
    ['expected', 'Expected behaviour and unacceptable result'],
    ['actual', 'What actually happened'],
    ['evidence', 'Safe evidence or source reference'],
    ['reviewer', 'Reviewer or observer role'],
    ['followup', 'Unresolved problem or next action']
  ];
  function make(tag, content, parent) {
    const node = document.createElement(tag);
    if (content) node.textContent = content;
    parent.append(node);
    return node;
  }
  for (const [id, title, challenge] of TEST_CASES) {
    const fieldset = make('fieldset', '', host);
    const legend = make('legend', id + ' - ' + title, fieldset);
    legend.id = 'case-' + id;
    make('p', challenge, fieldset);
    const row = {};
    const statusLabel = make('label', 'Reported status', fieldset);
    statusLabel.htmlFor = 'result-' + id + '-status';
    const status = make('select', '', fieldset);
    status.id = statusLabel.htmlFor;
    for (const choice of RESULT_STATUSES) make('option', choice, status).value = choice;
    row.status = status;
    for (const [name, label] of fieldNames) {
      const fieldLabel = make('label', label, fieldset);
      fieldLabel.htmlFor = 'result-' + id + '-' + name;
      const textarea = make('textarea', '', fieldset);
      textarea.id = fieldLabel.htmlFor;
      textarea.rows = 2;
      textarea.maxLength = 5000;
      row[name] = textarea;
    }
    controls.push({ id, row });
    fieldset.addEventListener('input', changed);
    fieldset.addEventListener('change', changed);
  }
  function readEntries() {
    return controls.map(({ id, row }) => ({
      id, status: row.status.value,
      expected: row.expected.value, actual: row.actual.value,
      evidence: row.evidence.value, reviewer: row.reviewer.value, followup: row.followup.value
    }));
  }
  function setEntries(next) {
    entries = checkedTestResults(next);
    for (let i = 0; i < controls.length; i++) {
      const { row } = controls[i], record = entries[i];
      for (const key of ['status', 'expected', 'actual', 'evidence', 'reviewer', 'followup'])
        row[key].value = record[key];
    }
    revision++;
    changed();
  }
  function hasChanges() { return JSON.stringify(readEntries()) !== checkpoint; }
  function beforeLeaving(event) {
    if (!hasChanges()) return;
    event.preventDefault(); event.returnValue = true;
  }
  function updateState() {
    const dirty = hasChanges();
    if (dirty) window.addEventListener('beforeunload', beforeLeaving);
    else window.removeEventListener('beforeunload', beforeLeaving);
    byId('test-results-changes').textContent = dirty
      ? 'Test result edits are only in this page. Save results JSON before leaving.'
      : 'No newer test-result edits. Downloads must be checked; nothing is saved automatically.';
  }
  function changed() {
    revision++;
    updateState();
    if (!byId('test-comparison-preview').hidden) {
      try { byId('test-comparison-preview').textContent = comparisonText(readEntries(), getNotes()); }
      catch { byId('test-comparison-preview').textContent = 'Record what happened in each observed case before comparing it.'; }
    }
    if (!byId('test-results-preview').hidden) {
      try { byId('test-results-preview').textContent = testResultsText(readEntries(), getNotes()); }
      catch { byId('test-results-preview').textContent = 'An observed case needs a description of what happened before it can be exported.'; }
    }
  }
  function report(message) { byId('test-results-status').textContent = message; }
  function capture() { return checkedTestResults(readEntries()); }
  function markDownloaded() { checkpoint = JSON.stringify(readEntries()); updateState(); }

  byId('preview-test-results').addEventListener('click', () => {
    try {
      byId('test-results-preview').textContent = testResultsText(capture(), getNotes());
      byId('test-results-preview').hidden = false;
      byId('test-results-preview').focus();
      report('Preview shows reported observations, not verified results.');
    } catch (error) { report(error.message); }
  });
  byId('export-test-results').addEventListener('click', () => {
    try {
      download(testResultsText(capture(), getNotes()), 'text/plain;charset=utf-8', 'ai-adoption-test-observations.txt');
      report('Text report download requested. This is not a verified trial result or approval.');
    } catch (error) { report('Could not export report. ' + error.message); }
  });
  byId('compare-test-results').addEventListener('click', () => {
    try {
      byId('test-comparison-preview').textContent = comparisonText(capture(), getNotes());
      byId('test-comparison-preview').hidden = false;
      byId('test-comparison-preview').focus();
      report('Comparison shows missing record fields and original statements. It does not decide whether tests passed.');
    } catch (error) { report(error.message); }
  });
  byId('export-test-comparison').addEventListener('click', () => {
    try {
      download(comparisonText(capture(), getNotes()), 'text/plain;charset=utf-8', 'ai-adoption-expected-observed-comparison.txt');
      report('Comparison download requested. Check the file and original evidence before judging the outcome.');
    } catch (error) { report('Could not export comparison. ' + error.message); }
  });
  byId('save-test-results').addEventListener('click', () => {
    try {
      download(testResultsJSON(capture()), 'application/json;charset=utf-8', 'ai-adoption-test-results.json');
      markDownloaded();
      report('Results JSON download requested. Check your downloads before leaving. No tests were verified.');
    } catch (error) { report('Could not save results. ' + error.message); }
  });
  byId('reopen-test-results').addEventListener('change', async event => {
    const picker = event.target, file = picker.files?.[0];
    picker.value = '';
    if (!file) return;
    const startingRevision = revision;
    picker.disabled = true; report('Reading local test results...');
    try {
      if (file.size > MAX_RESULTS_BYTES) throw new Error('Choose a results file no larger than 500 KB.');
      const buffer = await file.arrayBuffer();
      let text;
      try { text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(buffer); }
      catch { throw new Error('Results JSON must be valid UTF-8.'); }
      const parsed = parseTestResults(text);
      if (revision !== startingRevision) throw new Error('Notes changed while loading; choose the file again.');
      if (readEntries().some(entry => Object.values(entry).some((value, index) => index > 1 && value !== '')) &&
          !window.confirm('Replace all current test observations with this file? Save the current results first if needed.')) {
        report('Reopening cancelled. Existing results kept.'); return;
      }
      setEntries(parsed);
      checkpoint = JSON.stringify(readEntries());
      updateState();
      report('Local test observations reopened. They are not verified, approved or merged into the Workbench draft.');
    } catch (error) { report('Could not reopen results. ' + error.message + ' Existing results kept.'); }
    finally { picker.disabled = false; }
  });
  byId('clear-test-results').addEventListener('click', () => {
    if (!window.confirm('Clear all five test observations? Save them first if you need to keep them.')) return;
    setEntries(emptyTestResults());
    checkpoint = JSON.stringify(readEntries());
    byId('test-results-preview').hidden = true;
    byId('test-results-preview').textContent = '';
    byId('test-comparison-preview').hidden = true;
    byId('test-comparison-preview').textContent = '';
    updateState(); report('Test observations cleared. Workbench notes and saved files were not changed.');
  });
  window.addEventListener('pageshow', updateState);
  updateState();
}
