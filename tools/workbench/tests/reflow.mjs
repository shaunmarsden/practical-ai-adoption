import { chromium, firefox, webkit } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { appURL } from './browser-support.mjs';
const engine = process.env.TEST_BROWSER || 'chromium';
const type = { chromium, firefox, webkit }[engine];
if (!type) throw new Error('TEST_BROWSER must be chromium, firefox or webkit.');
const out = process.env.WORKBENCH_OUTPUT || `test-results/workbench-reflow/${engine}`;
await mkdir(out, { recursive: true });
const browser = await type.launch({ headless: true });
const results = [];
try {
  for (const width of [320, 390]) for (const textSize of [100, 200]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(appURL('workbench/'));
    await page.locator('#workbench').waitFor({ state: 'visible' });
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, textSize);
    const dimensions = await page.evaluate(() => {
      const file = document.querySelector('#reopen-draft');
      const button = getComputedStyle(file, '::file-selector-button');
      return { viewport: innerWidth, scroll: document.documentElement.scrollWidth, fileName: file.labels[0]?.textContent, nativeButton: { whiteSpace: button.whiteSpace, maxWidth: button.maxWidth, overflowWrap: button.overflowWrap }, inputWithinViewport: file.getBoundingClientRect().right <= innerWidth };
    });
    results.push({ width, textSize, ...dimensions });
    await writeFile(`${out}/results.json`, JSON.stringify({ engine, cases: results }, null, 2));
    await page.locator('.draft-tools').screenshot({ path: `${out}/${width}-text-${textSize}.png` });
    assert.equal(dimensions.scroll, dimensions.viewport, `${engine}: ${width}px at ${textSize}% text must not make the page overflow`);
    assert.equal(dimensions.fileName, 'Reopen draft');
    assert.equal(dimensions.inputWithinViewport, true);
    // Native shadow button geometry is not exposed. Check the applied wrapping
    // mechanism; retain screenshots for visual review of the actual label.
    if (textSize === 200) {
      assert.equal(dimensions.nativeButton.whiteSpace, 'normal');
      assert.equal(dimensions.nativeButton.maxWidth, '100%');
      assert.equal(dimensions.nativeButton.overflowWrap, 'anywhere');
    }
    for (let index = 0; index < 6; index++) {
      await page.locator('#steps button').nth(index).click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, `step ${index + 1} reflows`);
    }
    await context.close();
  }
  console.log(`${engine}: narrow-layout/text-enlargement regression passed (${results.length} combinations, all six steps).`);
} finally { await browser.close(); }
