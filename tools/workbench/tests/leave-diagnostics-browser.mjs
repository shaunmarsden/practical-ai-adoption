// Controlled Firefox checks of diagnostic distinctions, not application evidence.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { firefox } from 'playwright';
import { createLeaveDiagnostics } from './leave-diagnostics.mjs';
const output = process.env.DIAGNOSTIC_OUTPUT || 'test-results/leave-diagnostic-controls';
await mkdir(output, { recursive: true });
const attempts = [], report = { status: 'running', attempts };
const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'text/html');
  if (request.url === '/destination') { response.end('<h1>Fictional navigation destination</h1>'); return; }
  response.end(`<title>Fictional diagnostic fixture</title><form id="notes"><textarea id="work"></textarea></form>${request.url === '/guard' ? '<script>addEventListener("beforeunload", event => { event.preventDefault(); event.returnValue = true; });</script>' : ''}`);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await firefox.launch({ headless: true }); report.version = browser.version();
  for (const mode of ['guard', 'unguarded', 'action-timeout']) {
    const context = await browser.newContext();
    await context.tracing.start({ screenshots: true, snapshots: true });
    const page = await context.newPage();
    page.on('dialog', dialog => dialog.dismiss());
    const leave = createLeaveDiagnostics(page, attempts, { dialogTimeout: 1500 });
    try {
      await page.goto(`http://127.0.0.1:${server.address().port}/${mode}`);
      await page.locator('#work').click(); await page.locator('#work').fill('FICTIONAL: Pine Gable control');
      if (mode === 'guard') {
        await leave.run(mode, () => page.reload({ timeout: 1000 }), 'dismiss');
        assert.equal(await page.locator('#work').inputValue(), 'FICTIONAL: Pine Gable control');
        assert.ok(attempts.at(-1).events.some(event => event.type === 'beforeunload' && event.prevented));
      } else {
        const action = mode === 'unguarded' ? () => page.goto(`http://127.0.0.1:${server.address().port}/destination`) : () => { throw Object.assign(new Error('Controlled timeout without browser navigation'), { name: 'TimeoutError' }); };
        await assert.rejects(leave.run(mode, action, 'dismiss'), /Expected native beforeunload/);
        const result = attempts.at(-1);
        assert.equal(result.status, 'failed');
        assert.equal(result.observation, mode === 'unguarded' ? 'page-changed-without-observed-native-dialog' : 'navigation-api-timed-out-without-observed-native-dialog');
        if (mode === 'unguarded') {
          assert.equal(new URL(page.url()).pathname, '/destination');
          assert.equal(await page.locator('#work').count(), 0);
        } else assert.equal(await page.locator('#work').inputValue(), 'FICTIONAL: Pine Gable control');
      }
    } finally {
      leave.dispose(); await context.tracing.stop({ path: `${output}/${mode}.zip` }); await context.close();
    }
    assert.ok((await stat(`${output}/${mode}.zip`)).size > 0);
  }
  report.status = 'passed'; console.log('Firefox diagnostic controls passed: real cancellation, unguarded navigation and controlled action timeout remain distinct; negative observations retained.');
} catch (error) { report.status = 'failed'; report.error = error.stack; throw error; }
finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2)); }
