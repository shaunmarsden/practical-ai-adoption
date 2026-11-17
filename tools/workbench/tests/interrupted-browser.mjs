// J03: frozen fictional interrupted-work journey. Both JSON sources are separate.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { base, assertStaticRequests } from './browser-support.mjs';

const output = process.env.WORKBENCH_OUTPUT || 'test-results/workbench-interrupted';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
try {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 850 }, acceptDownloads: true });
    const page = await context.newPage();
    const requests = [], errors = [];
    page.on('request', request => requests.push({ url: request.url(), method: request.method(), body: request.postData() }));
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/workbench/');
    await page.locator('#workbench').waitFor({ state: 'visible' });

    // Partially populated workflow, with unknown permission and no human decision.
    await page.locator('#work').fill('FICTIONAL: volunteer rota handover, unfinished');
    await page.locator('#owner').fill('Unknown: no confirmed authority for real changes');
    await page.getByRole('button', { name: '3. Plan a bounded pilot' }).click();
    await page.locator('#permissions').fill('Unknown: fictional example only; no real trial authorised');
    await page.getByRole('button', { name: '4. Measure results' }).click();
    await page.locator('#evidenceType').selectOption('Fictional exercise');
    await page.locator('#issues').fill('Incomplete instructions and unverified permission');
    assert.equal(await page.locator('#decision').inputValue(), 'No human decision recorded');
    assert.match(await page.locator('#changes-status').innerText(), /Newer edits are only in this page/);

    const draftPending = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Save draft', exact: true }).click();
    const draftFile = await draftPending;
    assert.equal(draftFile.suggestedFilename(), 'ai-adoption-workbench-draft.json');
    const draftBytes = await readFile(await draftFile.path(), 'utf8');
    const savedNotes = JSON.parse(draftBytes).notes;
    assert.equal(savedNotes.work, 'FICTIONAL: volunteer rota handover, unfinished');
    assert.equal(savedNotes.decisionOwner, '');
    assert.equal(savedNotes.decisionDate, '');
    assert.equal(savedNotes.permissions, 'Unknown: fictional example only; no real trial authorised');

    // One unrun challenge case retains planned expectations; no trial is implied.
    await page.locator('#result-C3-expected').fill('Missing rota source must be called out, not guessed.');
    const resultsPending = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Save results JSON' }).click();
    const resultsFile = await resultsPending;
    assert.equal(resultsFile.suggestedFilename(), 'ai-adoption-test-results.json');
    const resultsBytes = await readFile(await resultsFile.path(), 'utf8');
    const savedResults = JSON.parse(resultsBytes);
    assert.equal(savedResults.cases[2].status, 'Not run');
    assert.equal(savedResults.cases[2].expected, 'Missing rota source must be called out, not guessed.');

    // Edits made AFTER saving must not be silently recovered.
    await page.locator('#result-C3-expected').fill('FICTIONAL: unsaved observation edit');
    await page.getByRole('button', { name: '1. Describe the work' }).click();
    await page.locator('#work').fill('FICTIONAL: unsaved later version');
    assert.match(await page.locator('#changes-status').innerText(), /Newer edits are only in this page/);
    assert.match(await page.locator('#test-results-changes').innerText(), /edits are only in this page/);
    const dialogPending = page.waitForEvent('dialog');
    const reload = page.reload();
    const dialog = await dialogPending;
    assert.equal(dialog.type(), 'beforeunload');
    await dialog.accept();
    await reload;
    await page.locator('#workbench').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#work').inputValue(), '');
    assert.equal(await page.locator('#result-C3-expected').inputValue(), '');
    assert.equal(await page.locator('#decision').inputValue(), 'No human decision recorded');

    // Recover the two ORIGINAL downloaded files separately.
    await page.locator('#reopen-draft').setInputFiles({ name: 'saved-workflow.json', mimeType: 'application/json', buffer: Buffer.from(draftBytes) });
    await page.getByText('Draft reopened locally.', { exact: false }).waitFor();
    await page.locator('#reopen-test-results').setInputFiles({ name: 'saved-results.json', mimeType: 'application/json', buffer: Buffer.from(resultsBytes) });
    await page.getByText('Local test observations reopened.', { exact: false }).waitFor();
    assert.equal(await page.locator('#work').inputValue(), savedNotes.work);
    assert.equal(await page.locator('#permissions').inputValue(), savedNotes.permissions);
    assert.equal(await page.locator('#result-C3-expected').inputValue(), savedResults.cases[2].expected);
    assert.equal(await page.locator('#result-C3-status').inputValue(), 'Not run');

    // Continue carefully: no invented result, approval, or reauthorisation.
    await page.locator('#work').fill('FICTIONAL: volunteer rota handover, resumed and still unfinished');
    await page.getByRole('button', { name: '6. Record a human decision' }).click();
    assert.equal(await page.locator('#decision').inputValue(), 'No human decision recorded');
    assert.equal(await page.locator('#decisionOwner').inputValue(), '');
    assert.equal(await page.locator('#decisionDate').inputValue(), '');
    await page.getByRole('button', { name: 'Preview complete review pack' }).click();
    const preview = await page.locator('#review-pack-preview').innerText();
    for (const phrase of ['resumed and still unfinished', 'Unknown: fictional example only; no real trial authorised',
      'Incomplete instructions and unverified permission', 'Missing rota source must be called out, not guessed.',
      'No human decision recorded', 'This pack is not evidence of workplace value']) assert.ok(preview.includes(phrase), phrase);
    assert.ok(!preview.includes('FICTIONAL: unsaved later version'));
    assert.ok(!preview.includes('FICTIONAL: unsaved observation edit'));
    const packPending = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Export complete review pack' }).click();
    const packFile = await packPending;
    const packText = await readFile(await packFile.path(), 'utf8');
    for (const phrase of ['resumed and still unfinished', 'Missing rota source must be called out, not guessed.',
      'Unknown: fictional example only; no real trial authorised', 'Keep the two source JSON files separately'])
      assert.ok(packText.includes(phrase), phrase);
    assert.equal(await page.locator('#review-pack-preview script').count(), 0);
    assert.equal(await page.evaluate(() => [localStorage.length, sessionStorage.length, document.cookie].join('|')), '0|0|');
    assertStaticRequests(requests, ['/workbench/', '/workbench/style.css', '/workbench/app.mjs', '/workbench/content.mjs',
      '/workbench/example.mjs', '/workbench/test-sheet.mjs', '/workbench/test-results.mjs',
      '/workbench/test-results-ui.mjs', '/workbench/comparison.mjs', '/workbench/review-pack.mjs',
      '/workbench/draft.mjs', '/workbench/changes.mjs', '/pilot-readiness/icon.svg']);
    assert.deepEqual(errors, []);
    await context.close();
  }
  console.log('J03 interrupted fictional journey passed at 1440, 390, and 320 CSS pixels: separate saved JSON sources, unsaved loss, explicit reload, reopen, continuation and report retention.');
} finally { await browser.close(); }
