// Explicit, read-only release verification. No application deployment or writes.
import { request } from 'playwright';
import { execFileSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { base, appURL } from './browser-support.mjs';
import { releaseAssets as assets, releaseJobs, assertReleaseComplete } from './release-support.mjs';
if (!process.env.BASE_URL || !/^[a-f0-9]{40}$/.test(process.env.EXPECTED_COMMIT || '')) throw new Error('Set BASE_URL explicitly and EXPECTED_COMMIT to a full lowercase Git commit SHA.');
const commit = process.env.EXPECTED_COMMIT;
const output = resolve(process.env.RELEASE_OUTPUT || `test-results/workbench-release/${new Date().toISOString().replace(/[:.]/g, '-')}-${commit.slice(0, 8)}`);
// A failed run is evidence too. Never silently replace an existing run.
await mkdir(resolve(output, '..'), { recursive: true });
await mkdir(output);
const report = { base, target: ['localhost', '127.0.0.1', '[::1]'].includes(new URL(base).hostname) ? 'local-preview' : 'remote-site', expectedCommit: commit, runnerCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), startedAt: new Date().toISOString(), status: 'running', assets: [], journeys: [] };
const saveReport = () => writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
const hash = value => createHash('sha256').update(value).digest('hex');
try {
  // Resolve local source first; a missing revision/file cannot become success.
  const expected = assets.map(file => ({ file, body: execFileSync('git', ['show', `${commit}:docs/${file}`], { maxBuffer: 10_000_000 }) }));
  async function observeAssets(target) {
    const context = await request.newContext();
    try {
      for (const { file, body } of expected) {
        const response = await context.get(appURL(file), { headers: { 'Cache-Control': 'no-cache' } });
        const actual = await response.body();
        target.push({ file, url: response.url(), status: response.status(), expectedSha256: hash(body), actualSha256: hash(actual), matches: response.status() === 200 && response.url() === appURL(file) && body.equals(actual) });
      }
    } finally { await context.dispose(); }
  }
  await observeAssets(report.assets);
  await saveReport();
  if (report.assets.some(asset => !asset.matches)) throw new Error('Served assets do not match the requested commit. Journeys were not run.');
  for (const { name, script, browser } of releaseJobs) {
    console.log(`Release check: ${name}`);
    const logs = [];
    const exit = await new Promise(resolveExit => {
      const child = spawn(process.execPath, [`tools/workbench/tests/${script}`], { env: { ...process.env, BASE_URL: base, WORKBENCH_OUTPUT: join(output, name), TEST_BROWSER: browser }, stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000 });
      child.stdout.on('data', data => logs.push(data));
      child.stderr.on('data', data => logs.push(data));
      child.on('error', error => { logs.push(Buffer.from(error.stack)); });
      child.on('close', code => resolveExit(code));
    });
    await writeFile(join(output, `${name}.log`), Buffer.concat(logs));
    const journey = { name, browser, exitCode: exit };
    if (script === 'changes-browser.mjs') {
      try { journey.result = JSON.parse(await readFile(join(output, name, 'results.json'), 'utf8')); }
      catch (error) { journey.error = `Missing or invalid child report: ${error.message}`; }
    }
    report.journeys.push(journey);
    await saveReport();
    // Continue other engines for evidence. Any failure still fails the release.
  }
  report.assetsAfter = [];
  await observeAssets(report.assetsAfter);
  if (report.assetsAfter.some(asset => !asset.matches)) throw new Error('Served assets changed during the journeys or no longer match the requested commit.');
  assertReleaseComplete(report);
  report.status = 'passed';
  console.log(`Release verification passed: ${report.assets.length} served assets match ${commit} before and after the journeys; navigation/accessibility, draft and reflow checks plus Chrome, Firefox and WebKit leave/save/reopen journeys passed. Evidence: ${output}`);
} catch (error) {
  report.status = 'failed';
  report.error = error.message;
  console.error(`Release verification failed: ${error.message} Evidence: ${output}`);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  await saveReport();
}
