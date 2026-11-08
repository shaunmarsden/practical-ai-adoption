import assert from 'node:assert/strict';
export const releaseAssets = ['index.html', 'workbench/index.html', 'workbench/app.mjs', 'workbench/content.mjs', 'workbench/draft.mjs', 'workbench/changes.mjs', 'workbench/style.css', 'pilot-readiness/index.html', 'pilot-readiness/icon.svg', 'pilot-readiness/style.css', 'pilot-readiness/app.mjs', 'pilot-readiness/model-v2.mjs', 'pilot-readiness/examples-v2.mjs', 'pilot-readiness/report.mjs', 'pilot-readiness/vendor/jspdf.umd.min.js', 'pilot-readiness/vendor/NotoSans-Regular.ttf'];
export const releaseJobs = [
  { name: 'journey', script: 'browser.mjs', browser: 'chromium' },
  { name: 'drafts', script: 'draft-browser.mjs', browser: 'chromium' },
  { name: 'reflow', script: 'reflow.mjs', browser: 'chromium' },
  ...['chrome', 'firefox', 'webkit'].map(browser => ({ name: `changes-${browser}`, script: 'changes-browser.mjs', browser }))
];
export function assertReleaseComplete(report) {
  for (const phase of ['assets', 'assetsAfter']) {
    assert.equal(report[phase]?.length, releaseAssets.length, `${phase}: all expected files must be observed`);
    for (const file of releaseAssets) {
      const observations = report[phase].filter(asset => asset.file === file);
      assert.equal(observations.length, 1, `${phase}: exactly one observation of ${file}`);
      assert.equal(observations[0].matches, true, `${phase}: ${file} must match source`);
    }
  }
  assert.equal(report.journeys.length, releaseJobs.length, 'all release jobs must run');
  for (const job of releaseJobs) {
    const observations = report.journeys.filter(result => result.name === job.name);
    assert.equal(observations.length, 1, `exactly one result for ${job.name}`);
    const result = observations[0];
    assert.equal(result.exitCode, 0, `${job.name} failed; inspect its log and diagnostics`);
    assert.ok(!result.error, `${job.name}: ${result.error}`);
    if (job.script === 'changes-browser.mjs') {
      assert.equal(result.result?.browser, job.browser, `${job.name}: browser identity is required`);
      assert.ok(typeof result.result.version === 'string' && result.result.version.length > 0, `${job.name}: browser version is required`);
      assert.equal(result.result.status, 'passed', `${job.name}: child must report a pass`);
      assert.ok(result.result.checks.includes('actual downloaded draft bytes reopened after reload; all 28 fields match on resave'), `${job.name}: downloaded-byte round trip is required`);
      assert.equal(result.result.leaveAttempts.length, 5, `${job.name}: all five native navigation attempts required`);
      assert.ok(result.result.leaveAttempts.every(attempt => attempt.status === 'passed' && attempt.dialog?.type === 'beforeunload'), `${job.name}: native warnings must be observed`);
    }
  }
}
