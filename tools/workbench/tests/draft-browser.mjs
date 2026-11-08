import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fields, emptyRecord, caveat } from '../../../docs/workbench/content.mjs';
import { DRAFT_FORMAT, DRAFT_NOTICE, MAX_DRAFT_BYTES } from '../../../docs/workbench/draft.mjs';
import { base, appURL, assertStaticRequests } from './browser-support.mjs';
const output = process.env.WORKBENCH_OUTPUT || 'test-results/workbench-drafts';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
const envelope = notes => ({ format: DRAFT_FORMAT, schema_version: 1, saved_at: '2026-11-07T12:00:00.000Z', notice: DRAFT_NOTICE, notes });
const file = (text, name = 'fictional-draft.json') => ({ name, mimeType: 'application/json', buffer: Buffer.from(text) });
try {
  for (const width of [1440, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    const requests = [], errors = [];
    page.on('request', r => requests.push({ url: r.url(), method: r.method(), body: r.postData() }));
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`${base}/workbench/`);
    await page.locator('#workbench').waitFor({ state: 'visible' });
    const picker = page.locator('#reopen-draft');
    const save = async () => {
      const pending = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Save draft', exact: true }).click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'ai-adoption-workbench-draft.json');
      const text = await readFile(await download.path(), 'utf8');
      return { text, data: JSON.parse(text) };
    };
    const blank = await save();
    assert.deepEqual(blank.data.notes, emptyRecord());
    assert.equal(blank.data.notice, DRAFT_NOTICE);
    const notes = emptyRecord();
    for (const [id, , , kind] of fields) if (!kind) notes[id] = `FICTIONAL ${id}: Aster Moor archive\r\nsecond\rthird\t\"notes\":{}  Zoë 😀 <img src="https://invalid.example/notes" onerror="alert(1)">`;
    notes.work = '😀'.repeat(6000);
    notes.evidenceType = 'Fictional exercise';
    notes.readiness = 'COMPLETE RECORD - HUMAN DECISION REQUIRED';
    notes.decision = 'Continue within an existing authorised boundary';
    notes.decisionDate = '';
    notes.decisionOwner = '';
    notes.permissions = 'Unknown. No operational permission.';
    notes.issues = 'FICTIONAL: an escaped error remains unresolved. Role: reviewer; action: inspect.';
    await picker.setInputFiles(file(JSON.stringify(envelope(notes))));
    await page.getByText('Draft reopened locally.', { exact: false }).waitFor();
    assert.equal(await page.locator('#step-0').evaluate(el => el === document.activeElement), true);
    assert.deepEqual((await save()).data.notes, notes, 'unedited imported CRLF/CR retained');
    await page.reload();
    assert.equal(await page.locator('#work').inputValue(), '', 'no automatic restore');
    await picker.setInputFiles(file(JSON.stringify(envelope(notes))));
    await page.getByText('Draft reopened locally.', { exact: false }).waitFor();
    await page.locator('#owner').fill('FICTIONAL: edited role');
    const edited = { ...notes, owner: 'FICTIONAL: edited role' };
    assert.deepEqual((await save()).data.notes, edited, 'unrelated edit preserves every other exact string');
    await page.getByRole('button', { name: '6. Record a human decision', exact: true }).click();
    await page.getByRole('button', { name: 'Review all notes' }).click();
    const preview = await page.locator('#summary').innerText();
    assert.ok(preview.includes(caveat));
    assert.ok(preview.includes(notes.issues));
    assert.equal(await page.locator('#summary img').count(), 0);
    assert.equal(await page.locator('#decisionOwner').inputValue(), '');
    assert.equal(await page.locator('#decisionDate').inputValue(), '');
    const controlValues = () => page.locator('#notes input,#notes textarea,#notes select').evaluateAll(els => Object.fromEntries(els.map(el => [el.id, el.value])));
    const beforeBad = await controlValues();
    const bad = [
      '{', JSON.stringify({ ...envelope(notes), schema_version: 2 }),
      JSON.stringify({ ...envelope(notes), approved: true }),
      JSON.stringify({ ...envelope(notes), notes: { ...notes, work: false } }),
      JSON.stringify({ ...envelope(notes), notes: { ...notes, decisionDate: '2026-02-30' } }),
      JSON.stringify(envelope(notes)).replace('"format":', '"format":"discarded","format":'),
      ' '.repeat(MAX_DRAFT_BYTES + 1),
      JSON.stringify({ ...envelope(notes), notes: Object.fromEntries(Object.entries(notes).filter(([key]) => key !== 'next')) }),
    ];
    for (const text of bad) {
      await picker.setInputFiles(file(text));
      await page.getByText('Could not reopen draft.', { exact: false }).waitFor();
      assert.equal(await page.locator('#summary').innerText(), preview, 'bad file preserves existing preview');
      assert.equal(await page.locator('button[aria-current="step"]').innerText(), '6. Record a human decision');
      assert.deepEqual(await controlValues(), beforeBad, 'bad file preserves all displayed notes');
    }
    await picker.setInputFiles({ name: 'invalid-utf8.json', mimeType: 'application/json', buffer: Buffer.from([0xc3, 0x28]) });
    await page.getByText('The file must contain valid UTF-8 text.', { exact: false }).waitFor();
    assert.deepEqual((await save()).data.notes, edited);
    // Cancelled replacement is an atomic no-op, including the preview and step.
    page.once('dialog', dialog => dialog.dismiss());
    await picker.setInputFiles(file(blank.text));
    await page.getByText('Reopening cancelled.', { exact: false }).waitFor();
    assert.equal(await page.locator('#summary').innerText(), preview);
    assert.deepEqual((await save()).data.notes, edited);
    // Explicit fault injection: edits while a local File read is pending.
    await page.evaluate(() => {
      window.originalRead = File.prototype.arrayBuffer;
      File.prototype.arrayBuffer = async function () {
        await new Promise(resolve => { window.releaseRead = resolve; });
        return window.originalRead.call(this);
      };
    });
    await picker.setInputFiles(file(blank.text));
    await page.getByText('Reading local draft...', { exact: true }).waitFor();
    await page.getByRole('button', { name: '1. Describe the work', exact: true }).click();
    await page.locator('#work').fill('FICTIONAL: edited while loading');
    await page.evaluate(() => window.releaseRead());
    await page.getByText('Notes changed while the file was loading.', { exact: false }).waitFor();
    await page.evaluate(() => { File.prototype.arrayBuffer = window.originalRead; });
    const concurrent = { ...edited, work: 'FICTIONAL: edited while loading' };
    assert.deepEqual((await save()).data.notes, concurrent);
    // A failed local read and failed download cannot clear current notes.
    await page.evaluate(() => { File.prototype.arrayBuffer = async () => { throw new Error('Fictional read failure'); }; });
    await picker.setInputFiles(file(blank.text));
    await page.getByText('Fictional read failure', { exact: false }).waitFor();
    await page.evaluate(() => { File.prototype.arrayBuffer = window.originalRead; });
    assert.deepEqual((await save()).data.notes, concurrent);
    await page.evaluate(() => { window.originalUrl = URL.createObjectURL; URL.createObjectURL = () => { throw new Error('Fictional download failure'); }; });
    await page.getByRole('button', { name: 'Save draft', exact: true }).click();
    await page.getByText('Draft download could not start.', { exact: false }).waitFor();
    await page.evaluate(() => { URL.createObjectURL = window.originalUrl; });
    assert.deepEqual((await save()).data.notes, concurrent);
    // Retry the same file, then accept replacement with an entirely blank draft.
    page.once('dialog', dialog => dialog.accept());
    await picker.setInputFiles(file(blank.text));
    await page.getByText('Draft reopened locally.', { exact: false }).waitFor();
    assert.deepEqual((await save()).data.notes, emptyRecord());
    assert.equal(await picker.inputValue(), '');
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    assert.deepEqual(scan.violations.map(v => v.id), []);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(await page.evaluate(() => [localStorage.length, sessionStorage.length, document.cookie]), [0, 0, '']);
    assert.deepEqual(await context.cookies(), []);
    const allowed = ['/workbench/', '/workbench/style.css', '/workbench/app.mjs', '/workbench/content.mjs', '/workbench/draft.mjs', '/workbench/changes.mjs', '/pilot-readiness/icon.svg'];
    assertStaticRequests(requests, allowed);
    assert.deepEqual(errors, []);
    await writeFile(`${output}/observations-${width}.json`, JSON.stringify({ width, requests, errors, axeViolations: scan.violations }, null, 2));
    await writeFile(`${output}/first-populated-draft-${width}.json`, JSON.stringify(envelope(notes), null, 2));
    await page.locator('.draft-tools').screenshot({ path: `${output}/draft-tools-${width}.png` });
    await context.close();
  }
  console.log('Draft browser checks passed: exact save/reload/reopen/edit/save at 1440 and 320 pixels; atomic bad/read/replace/race/download paths; literal markup; privacy and axe checks.');
} finally { await browser.close(); }
