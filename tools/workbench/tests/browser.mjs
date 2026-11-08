import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { steps, fields, emptyRecord, caveat } from '../../../docs/workbench/content.mjs';
import { base, appURL, assertStaticRequests } from './browser-support.mjs';
const output = process.env.WORKBENCH_OUTPUT || 'test-results/workbench';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
let scans = 0;
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [], requests = [], failures = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('request', request => requests.push({ url: request.url(), method: request.method(), body: request.postData() }));
    page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
    await page.goto(`${base}/workbench/`);
    await page.getByRole('navigation', { name: 'Workbench steps' }).waitFor();
    assert.equal(await page.locator('[id]').evaluateAll(els => new Set(els.map(el => el.id)).size === els.length), true, 'unique DOM IDs');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#main').evaluate(el => el === document.activeElement), true);
    assert.equal(await page.getByRole('button', { name: 'Back', exact: true }).isDisabled(), true);
    const downloadText = async () => {
      const pending = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Export text record' }).click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'ai-adoption-decision-record.txt');
      return readFile(await download.path(), 'utf8');
    };
    const blank = await downloadText();
    assert.ok(blank.includes('Human decision (self-reported): No human decision recorded'));
    assert.ok(blank.includes('Work and outcome sought:\nNot recorded'));
    const expected = emptyRecord();
    // Fictional stress case: attractive timing claim, unacceptable escaped error,
    // unknown permission and an unverified positive V2/decision claim. Never infer clearance.
    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];
      if (index) {
        await page.getByRole('button', { name: 'Next', exact: true }).focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator(`#step-${index}`).evaluate(el => el === document.activeElement), true);
      }
      assert.equal(await page.locator('button[aria-current="step"]').innerText(), `${index + 1}. ${step.title}`);
      for (const [id, , , kind] of step.fields) {
        const control = page.locator(`#${id}`);
        const value = Array.isArray(kind) ? (id === 'readiness' ? 'COMPLETE RECORD - HUMAN DECISION REQUIRED' : id === 'decision' ? 'Continue within an existing authorised boundary' : 'Fictional exercise') : kind === 'date' ? '2026-11-06' :
          id === 'issues' ? 'Fictional case: a wrong deadline escaped review. Reviewer must stop and inspect.' :
          id === 'permissions' ? 'Unknown: no permitted live trial.' :
          `${id}: Fictional Zoë\n<svg onload="alert(1)">literal notes</svg>\n${'x'.repeat(180)} END-${id}`;
        expected[id] = value;
        if (Array.isArray(kind)) {
          await control.selectOption(value);
          assert.equal(await page.locator(`#${id}-selection`).innerText(), `Current selection: ${value}`);
        }
        else await control.fill(value);
        assert.equal(await control.inputValue(), value);
      }
      const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      assert.deepEqual(scan.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `axe step ${index} at ${viewport.width}`);
      scans++;
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'no horizontal overflow');
      await page.screenshot({ path: `${output}/${viewport.width}-step-${index + 1}.png`, fullPage: true });
    }
    assert.equal(await page.getByRole('button', { name: 'Next', exact: true }).isDisabled(), true);
    await page.getByRole('button', { name: 'Review all notes' }).click();
    const preview = await page.locator('#summary').innerText();
    assert.ok(preview.includes(caveat));
    assert.ok(preview.indexOf(expected.issues) < preview.indexOf('DESCRIBE THE WORK'));
    assert.equal(await page.locator('#summary svg').count(), 0, 'notes remain literal text');
    const exported = await downloadText();
    for (const [id, label] of fields) assert.ok(exported.includes(`${label}:\n${expected[id]}`), `export preserves ${id}`);
    // Navigate backwards and through step controls without losing notes.
    await page.getByRole('button', { name: 'Back', exact: true }).click();
    await page.getByRole('button', { name: '1. Describe the work', exact: true }).click();
    assert.equal(await page.locator('#work').inputValue(), expected.work);
    await page.locator('#work').fill('Changed after preview');
    assert.ok((await page.locator('#summary').innerText()).includes('Changed after preview'));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    // No answer-bearing requests, storage or cookies, even after export and preview.
    assertStaticRequests(requests,
      ['/', '/workbench/', '/workbench/index.html', '/workbench/style.css', '/workbench/app.mjs', '/workbench/content.mjs', '/workbench/draft.mjs', '/pilot-readiness/icon.svg']);
    assert.deepEqual(await page.evaluate(() => [localStorage.length, sessionStorage.length, document.cookie]), [0, 0, '']);
    assert.deepEqual(await context.cookies(), []);
    assert.deepEqual(errors, []);
    assert.deepEqual(failures, []);
    // Feedback must not navigate away from unsaved notes or pass their contents.
    // A local response isolates this behaviour without posting to Discussions.
    const feedbackUrl = 'https://github.com/shaunmarsden/practical-ai-adoption/discussions/new';
    await context.route(feedbackUrl, route => route.fulfill({ contentType: 'text/html', body: '<h1>Fictional feedback destination</h1>' }));
    const feedbackPopup = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Share public feedback on GitHub', exact: true }).click();
    const feedback = await feedbackPopup;
    await feedback.waitForLoadState();
    assert.equal(feedback.url(), feedbackUrl);
    assert.equal(await feedback.evaluate(() => window.opener), null);
    assert.equal(await page.locator('#work').inputValue(), 'Changed after preview');
    await feedback.close();
    // Links resolve to repository files (checked in unit tests) or the existing local V2.
    await page.getByRole('button', { name: '5. Review readiness separately', exact: true }).click();
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Open Pilot Readiness Assessment V2 (new tab)' }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.match(await popup.title(), /AI Pilot Readiness Assessment V2/);
    assert.equal(new URL(popup.url()).search, '');
    await popup.close();
    await page.getByRole('button', { name: '1. Describe the work', exact: true }).click();
    assert.equal(await page.locator('#work').inputValue(), 'Changed after preview');
    page.once('dialog', dialog => dialog.dismiss());
    await page.getByRole('button', { name: 'Clear notes' }).click();
    assert.equal(await page.locator('#work').inputValue(), 'Changed after preview');
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Clear notes' }).click();
    for (const [id, value] of Object.entries(emptyRecord())) assert.equal(await page.locator(`#${id}`).inputValue(), value);
    await page.locator('#work').fill('Only in memory');
    await page.reload();
    assert.equal(await page.locator('#work').inputValue(), '', 'reload retains no notes');
    await page.goto(base);
    await page.getByRole('link', { name: 'Open the AI Adoption Workbench' }).click();
    assert.equal(page.url(), appURL('workbench/'));
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${base}/workbench/`);
  assert.equal(await page.getByRole('link', { name: 'existing guide route' }).isVisible(), true);
  assert.equal(await page.locator('#workbench').isVisible(), false);
  await context.close();
  console.log(`Workbench browser checks passed: 3 viewport journeys, ${scans} axe scans, literal text exports, navigation, reset, privacy, V2 link and no-JavaScript route.`);
} finally { await browser.close(); }
