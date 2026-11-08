// Explicit, read-only release verification. No application deployment or writes.
import { chromium } from 'playwright';
import { execFileSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { base, appURL } from './browser-support.mjs';
if (!process.env.BASE_URL || !/^[a-f0-9]{40}$/.test(process.env.EXPECTED_COMMIT || '')) throw new Error('Set BASE_URL explicitly and EXPECTED_COMMIT to a full lowercase Git commit SHA.');
const commit = process.env.EXPECTED_COMMIT;
const output = resolve(process.env.RELEASE_OUTPUT || `test-results/workbench-release/${new Date().toISOString().replace(/[:.]/g, '-')}-${commit.slice(0, 8)}`);
// A failed run is evidence too. Never silently replace an existing run.
await mkdir(resolve(output, '..'), { recursive: true });
await mkdir(output);
const report = { base, expectedCommit: commit, startedAt: new Date().toISOString(), status: 'running', assets: [], journeys: [] };
const saveReport = () => writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
const hash = value => createHash('sha256').update(value).digest('hex');
const assets = ['index.html', 'workbench/index.html', 'workbench/app.mjs', 'workbench/content.mjs', 'workbench/draft.mjs', 'workbench/style.css', 'pilot-readiness/index.html', 'pilot-readiness/icon.svg', 'pilot-readiness/style.css', 'pilot-readiness/app.mjs', 'pilot-readiness/model-v2.mjs', 'pilot-readiness/examples-v2.mjs', 'pilot-readiness/report.mjs', 'pilot-readiness/vendor/jspdf.umd.min.js', 'pilot-readiness/vendor/NotoSans-Regular.ttf'];
let browser;
try {
  // Resolve local source first; a missing revision/file cannot become success.
  const expected = assets.map(file => ({ file, body: execFileSync('git', ['show', `${commit}:docs/${file}`], { maxBuffer: 10_000_000 }) }));
  async function observeAssets(target) {
    browser = await chromium.launch({ headless: true, channel: 'chromium' });
    const context = await browser.newContext();
    for (const { file, body } of expected) {
      const response = await context.request.get(appURL(file), { headers: { 'Cache-Control': 'no-cache' } });
      const actual = await response.body();
      target.push({ file, url: response.url(), status: response.status(), expectedSha256: hash(body), actualSha256: hash(actual), matches: response.status() === 200 && response.url() === appURL(file) && body.equals(actual) });
    }
    await browser.close(); browser = undefined;
  }
  await observeAssets(report.assets);
  await saveReport();
  if (report.assets.some(asset => !asset.matches)) throw new Error('Deployed assets do not match the requested commit. Journeys were not run.');
  for (const [name, script] of [['journey', 'browser.mjs'], ['drafts', 'draft-browser.mjs'], ['reflow', 'reflow.mjs']]) {
    const logs = [];
    const exit = await new Promise((resolveExit, reject) => {
      const child = spawn(process.execPath, [`tools/workbench/tests/${script}`], { env: { ...process.env, BASE_URL: base, WORKBENCH_OUTPUT: join(output, name), TEST_BROWSER: 'chromium' }, stdio: ['ignore', 'pipe', 'pipe'] });
      child.stdout.on('data', data => logs.push(data));
      child.stderr.on('data', data => logs.push(data));
      child.on('error', reject);
      child.on('close', code => resolveExit(code));
    });
    await writeFile(join(output, `${name}.log`), Buffer.concat(logs));
    report.journeys.push({ name, exitCode: exit });
    await saveReport();
    if (exit !== 0) throw new Error(`${name} failed; inspect ${join(output, `${name}.log`)}.`);
  }
  report.assetsAfter = [];
  await observeAssets(report.assetsAfter);
  if (report.assetsAfter.some(asset => !asset.matches)) throw new Error('Deployed assets changed during the journeys or no longer match the requested commit.');
  report.status = 'passed';
  console.log(`Release verification passed: ${report.assets.length} deployed assets match ${commit} before and after the journeys; browser, draft and reflow journeys passed. Evidence: ${output}`);
} catch (error) {
  report.status = 'failed';
  report.error = error.message;
  console.error(`Release verification failed: ${error.message} Evidence: ${output}`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  report.finishedAt = new Date().toISOString();
  await saveReport();
}
