import { chromium, firefox, webkit } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { emptyRecord } from '../../../docs/workbench/content.mjs';
import { draftText } from '../../../docs/workbench/draft.mjs';
import { appURL, assertStaticRequests } from './browser-support.mjs';
import { createLeaveDiagnostics, pageState } from './leave-diagnostics.mjs';
const name = process.env.TEST_BROWSER || 'chromium';
const type = { chromium, chrome: chromium, firefox, webkit }[name];
if (!type) throw new Error('Choose chromium, chrome, firefox or webkit.');
const output = process.env.WORKBENCH_OUTPUT || `test-results/workbench-changes/${name}`;
await mkdir(output, { recursive: true });
const browser = await type.launch({ headless: true, ...(name === 'chrome' ? { channel: 'chrome' } : {}) });
const results = { browser: name, version: browser.version(), checks: [], dialogs: [], leaveAttempts: [] };
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
const page = await context.newPage();
const leave = createLeaveDiagnostics(page, results.leaveAttempts);
let beforeAction = 'dismiss', confirmAction = 'accept', actionLabel = 'initial';
const requests = [], errors = [], downloads = [];
page.on('request', r => requests.push({ url: r.url(), method: r.method(), body: r.postData() }));
page.on('pageerror', e => errors.push(e.message));
page.on('download', d => downloads.push(d.suggestedFilename()));
page.on('dialog', async dialog => {
  const item = { actionLabel, type: dialog.type(), action: dialog.type() === 'beforeunload' ? beforeAction : confirmAction };
  results.dialogs.push(item);
  await dialog[item.action]();
});
const changed = async value => assert.equal(await page.locator('#changes-status').getAttribute('data-changed'), String(value));
const snapshot = () => page.evaluate(() => ({
  notes: Object.fromEntries([...document.querySelectorAll('#notes input,#notes textarea,#notes select')].map(el => [el.id, el.value])),
  step: document.querySelector('[aria-current="step"]')?.textContent,
  preview: document.querySelector('#summary').textContent,
  hidden: document.querySelector('#summary').hidden,
  changed: document.querySelector('#changes-status').dataset.changed,
  badDate: document.querySelector('#decisionDate').validity.badInput
}));
async function native(action, decision, label) {
  actionLabel = label;
  beforeAction = decision;
  await leave.run(label, action, decision);
}
async function save(button = 'save-draft') {
  actionLabel = button;
  const pending = page.waitForEvent('download');
  await page.locator('#' + button).click();
  return readFile(await (await pending).path(), 'utf8');
}
const file = notes => ({ name: 'fictional-guard.json', mimeType: 'application/json', buffer: Buffer.from(draftText(notes)) });
try {
  await page.goto(appURL(''));
  await page.getByRole('link', { name: 'Open the AI Adoption Workbench' }).click();
  await page.locator('#workbench').waitFor({ state: 'visible' });
  await changed(false);
  await page.reload();
  await page.locator('#workbench').waitFor({ state: 'visible' });
  assert.equal(results.dialogs.length, 0);
  results.checks.push('initial load and clean reload have no warning');
  await page.locator('#work').click();
  await page.locator('#work').fill('FICTIONAL: Rowan Tide card sorting');
  await page.locator('#review').click();
  await changed(true);
  const original = await snapshot();
  await native(() => page.reload({ timeout: 2000 }), 'dismiss', 'cancel reload');
  assert.deepEqual(await snapshot(), original);
  await native(() => page.locator('header a').click({ noWaitAfter: true, timeout: 2000 }), 'dismiss', 'cancel same-tab link');
  assert.deepEqual(await snapshot(), original);
  await native(() => page.goBack({ timeout: 2000 }), 'dismiss', 'cancel Back');
  assert.deepEqual(await snapshot(), original);
  results.checks.push('native cancelled reload, same-tab link and Back retain notes/step/preview');
  await page.locator('#steps button').nth(1).click();
  await page.locator('#steps button').nth(0).click();
  await changed(true);
  const prior = results.dialogs.length;
  await page.evaluate(() => { window.originalUrl = URL.createObjectURL; URL.createObjectURL = () => { throw new Error('Fictional failed request'); }; });
  await page.locator('#save-draft').click();
  await changed(true);
  assert.match(await page.locator('#draft-status').innerText(), /could not start/);
  await page.evaluate(() => { URL.createObjectURL = window.originalUrl; });
  const text = await save('export');
  assert.match(text, /FICTIONAL: Rowan Tide card sorting/);
  assert.equal(await page.locator('#work').inputValue(), original.notes.work);
  await changed(true);
  const exportDialogs = results.dialogs.length - prior;
  assert.ok(results.dialogs.slice(prior).every(item => item.type === 'beforeunload' && item.action === 'dismiss'), 'only the documented native leave warning is allowed at text export');
  if (name === 'webkit') {
    // WebKit can warn again after cancelled Back when a later Blob
    // download starts. Do not bypass real leave protection.
    assert.ok(exportDialogs <= 1, 'at most one known cancelled-Back WebKit follow-on warning');
    if (exportDialogs) results.limitations = ['WebKit cancelled Back caused one extra native warning at text export; dismissal retained notes and produced the complete download.'];
  } else assert.equal(exportDialogs, 0, 'text download does not open a leave warning');
  const afterText = results.dialogs.length;
  const savedBytes = await save();
  const requested = JSON.parse(savedBytes);
  await changed(false);
  assert.match(await page.locator('#changes-status').innerText(), /cannot confirm the file was kept/);
  assert.equal(results.dialogs.length, afterText, 'JSON request adds no leave warning');
  results.checks.push('failed JSON and text export keep changes; JSON request captures only its notes');
  const cleanDialogs = results.dialogs.length;
  await page.reload();
  await page.locator('#workbench').waitFor({ state: 'visible' });
  assert.equal(results.dialogs.length, cleanDialogs);
  assert.equal(await page.locator('#work').inputValue(), '');
  await page.locator('#reopen-draft').setInputFiles({ name: 'actual-downloaded-fictional-draft.json', mimeType: 'application/json', buffer: Buffer.from(savedBytes) });
  await page.getByText('Draft reopened locally.', { exact: false }).waitFor();
  await changed(false);
  assert.deepEqual(JSON.parse(await save()).notes, requested.notes);
  results.checks.push('actual downloaded draft bytes reopened after reload; all 28 fields match on resave');
  // Reload closes the preview. Restore the original open-preview precondition.
  await page.locator('#review').click();

  await page.locator('#work').fill('FICTIONAL: newer version'); await changed(true);
  await page.locator('#work').fill(requested.notes.work); await changed(false);
  await page.locator('#steps button').nth(3).click();
  await page.locator('#evidenceType').selectOption('Fictional exercise'); await changed(true);
  await page.locator('#evidenceType').selectOption('Not recorded'); await changed(false);
  await page.locator('#steps button').nth(5).click();
  await page.locator('#decisionDate').fill('2026-11-08'); await changed(true);
  await page.locator('#decisionDate').fill(''); await changed(false);
  results.checks.push('text/select/date edits and reversions follow the checkpoint');
  await page.locator('#steps button').nth(0).click();
  await page.evaluate(() => { window.statusMutations = 0; new MutationObserver(rows => { window.statusMutations += rows.length; }).observe(document.querySelector('#changes-status'), { childList: true, characterData: true, subtree: true }); });
  await page.locator('#owner').fill('FICTIONAL role 1');
  const mutations = await page.evaluate(() => window.statusMutations);
  await page.locator('#owner').fill('FICTIONAL role 2');
  assert.equal(await page.evaluate(() => window.statusMutations), mutations);
  results.checks.push('unchanged dirty-state wording is not rewritten per keystroke');
  const imported = { ...emptyRecord(), work: 'FICTIONAL: Crag Meadow\r\nsecond\rthird 😀', evidenceType: 'Fictional exercise', issues: 'Unknown permission; no approval.' };
  await page.locator('#reopen-draft').setInputFiles(file(imported));
  await page.getByText('Draft reopened locally.', { exact: false }).waitFor();
  await changed(false);
  const visible = await page.locator('#work').inputValue();
  await page.locator('#work').fill(visible + ' edit'); await changed(true);
  await page.locator('#work').fill(visible); await changed(false);
  assert.equal(JSON.parse(await save()).notes.work, imported.work);
  await page.evaluate(() => {
    document.querySelector('#work').value = 'FICTIONAL: restored controls';
    document.querySelector('#readiness').value = 'WITHHOLD EXPANSION';
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  await changed(true);
  assert.equal(await page.locator('#readiness-selection').innerText(), 'Current selection: WITHHOLD EXPANSION');
  assert.match(await page.locator('#summary').innerText(), /FICTIONAL: restored controls/);
  results.checks.push('CRLF exact reversion and synthetic pageshow reconcile notes, helpers and preview');
  const beforeBad = await snapshot();
  await page.locator('#reopen-draft').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{') });
  await page.getByText('Could not reopen draft.', { exact: false }).waitFor();
  assert.deepEqual(await snapshot(), beforeBad);
  confirmAction = 'dismiss';
  await page.locator('#reset').click();
  assert.deepEqual(await snapshot(), beforeBad);
  confirmAction = 'accept';
  await page.locator('#reset').click(); await changed(false);
  results.checks.push('rejected import/cancelled clear preserve state; confirmed clear resets it');
  await page.locator('#steps button').nth(5).click();
  await page.locator('#decisionDate').click(); await page.locator('#decisionDate').press('1');
  const partial = await page.locator('#decisionDate').evaluate(el => ({ value: el.value, badInput: el.validity.badInput }));
  results.partialDateGesture = partial;
  if (partial.badInput) {
    await changed(true);
    const count = downloads.length;
    await page.locator('#save-draft').click();
    assert.equal(downloads.length, count);
    assert.match(await page.locator('#draft-status').innerText(), /Complete or clear/);
    await page.evaluate(() => { window.originalRead = File.prototype.arrayBuffer; File.prototype.arrayBuffer = async function () { await new Promise(resolve => { window.releaseRead = resolve; }); return window.originalRead.call(this); }; });
    await page.locator('#reopen-draft').setInputFiles(file(emptyRecord()));
    await page.getByText('Reading local draft...', { exact: true }).waitFor();
    await page.locator('#decisionDate').press('ArrowUp');
    await page.evaluate(() => window.releaseRead());
    await page.getByText('Notes changed while the file was loading.', { exact: false }).waitFor();
    await changed(true);
    await page.evaluate(() => { File.prototype.arrayBuffer = window.originalRead; });
    results.checks.push('native partial date warns, blocks JSON and rejects a stale read after another partial edit');
  } else results.checks.push('partial-date gesture not exposed in this engine; not counted as a passing partial-state test');
  await page.locator('#decisionDate').fill('');
  await page.locator('#steps button').nth(0).click();
  await page.locator('#work').fill('FICTIONAL: discard after explicit confirmation');
  await native(() => page.reload({ timeout: 10000 }), 'accept', 'accept reload');
  await page.locator('#workbench').waitFor({ state: 'visible' });
  await changed(false);
  assert.equal(await page.locator('#work').inputValue(), '');
  assert.deepEqual(await page.evaluate(() => [localStorage.length, sessionStorage.length, document.cookie]), [0, 0, '']);
  assert.deepEqual(await context.cookies(), []);
  assertStaticRequests(requests, ['/', '/workbench/', '/workbench/style.css', '/workbench/app.mjs', '/workbench/content.mjs', '/workbench/draft.mjs', '/workbench/changes.mjs', '/pilot-readiness/icon.svg']);
  assert.deepEqual(errors, []);
  results.checks.push('accepted native discard reloads defaults; no note-bearing requests or storage observed');
  await page.locator('#work').fill('FICTIONAL: leave after explicit acceptance');
  await native(() => page.locator('header a').click({ noWaitAfter: true, timeout: 10000 }), 'accept', 'accept same-tab link');
  await page.waitForURL(appURL(''));
  await page.getByRole('link', { name: 'Open the AI Adoption Workbench' }).click();
  await page.locator('#workbench').waitFor({ state: 'visible' });
  await changed(false);
  assert.equal(await page.locator('#work').inputValue(), '');
  results.checks.push('accepted same-tab leave returns to homepage; reopening workbench shows defaults');
  assertStaticRequests(requests, ['/', '/workbench/', '/workbench/style.css', '/workbench/app.mjs', '/workbench/content.mjs', '/workbench/draft.mjs', '/workbench/changes.mjs', '/pilot-readiness/icon.svg']);
  assert.deepEqual(errors, []);
  assert.deepEqual(await page.evaluate(() => [localStorage.length, sessionStorage.length, document.cookie]), [0, 0, '']);
  assert.deepEqual(await context.cookies(), []);
  results.status = 'passed';
  await page.locator('.draft-tools').screenshot({ path: `${output}/status.png` });
  console.log(`${name}: unsaved-notes checks passed; native dialogs observed; partial-date gesture exposed=${partial.badInput}.`);
} catch (error) {
  results.status = 'failed'; results.error = error.stack;
  results.failureState = await pageState(page);
  await page.screenshot({ path: `${output}/failure.png`, timeout: 5000 }).catch(e => { results.screenshotError = e.message; });
  throw error;
} finally {
  leave.dispose();
  try { await context.tracing.stop({ path: `${output}/trace.zip` }); }
  catch (error) { results.traceError = error.message; results.status = 'failed'; process.exitCode = 1; }
  await writeFile(`${output}/results.json`, JSON.stringify({ ...results, requests, errors }, null, 2));
  await context.close(); await browser.close();
}
