import { test } from 'node:test';
import assert from 'node:assert/strict';
import { releaseAssets, releaseJobs, assertReleaseComplete } from './release-support.mjs';
import { describeLeave } from './leave-diagnostics.mjs';
const roundTrip = 'actual downloaded draft bytes reopened after reload; all 28 fields match on resave';
function complete() {
  const assets = releaseAssets.map(file => ({ file, matches: true }));
  return { assets, assetsAfter: structuredClone(assets), journeys: releaseJobs.map(job => ({
    name: job.name, exitCode: 0, ...(job.script === 'changes-browser.mjs' ? { result: {
      browser: job.browser, version: 'fictional test version', status: 'passed', checks: [roundTrip],
      leaveAttempts: Array.from({ length: 5 }, () => ({ status: 'passed', dialog: { type: 'beforeunload' } }))
    } } : {})
  })) };
}
test('release needs all six jobs and exact source observations on both sides', () => {
  assert.doesNotThrow(() => assertReleaseComplete(complete()));
  for (const phase of ['assets', 'assetsAfter']) {
    for (const mutate of [items => items.pop(), items => { items[0].matches = false; }, items => { items[0].file = items[1].file; }]) {
      const report = complete(); mutate(report[phase]); assert.throws(() => assertReleaseComplete(report));
    }
  }
  const missing = complete(); missing.journeys.pop(); assert.throws(() => assertReleaseComplete(missing));
  const duplicate = complete(); duplicate.journeys[5] = duplicate.journeys[4]; assert.throws(() => assertReleaseComplete(duplicate));
});
test('child failure or missing browser cannot be washed out by later passes', () => {
  for (const exit of [1, null, undefined]) {
    const report = complete(); report.journeys[3].exitCode = exit; assert.throws(() => assertReleaseComplete(report));
  }
  for (const replacement of [undefined, {}, { browser: 'chromium', version: '1', status: 'passed' }]) {
    const report = complete(); report.journeys[3].result = replacement; assert.throws(() => assertReleaseComplete(report));
  }
});
test('exit zero is insufficient without exact round trip and all observed warnings', () => {
  for (const mutate of [result => { result.status = 'failed'; }, result => { result.checks = []; }, result => result.leaveAttempts.pop(), result => { result.leaveAttempts[0].dialog = {}; }]) {
    const report = complete(); mutate(report.journeys[4].result); assert.throws(() => assertReleaseComplete(report));
  }
});
test('leave labels separate observed dialog with timeout from missing-dialog observations', () => {
  const base = { before: { document: 1 }, after: { document: 1 }, events: [], action: { completed: true }, dialog: { missing: true } };
  assert.equal(describeLeave(base), 'no-native-dialog-observed');
  assert.equal(describeLeave({ ...base, action: { error: { name: 'TimeoutError' } } }), 'navigation-api-timed-out-without-observed-native-dialog');
  assert.equal(describeLeave({ ...base, after: { document: 2 } }), 'page-changed-without-observed-native-dialog');
  assert.equal(describeLeave({ ...base, events: [{ type: 'beforeunload', prevented: true }] }), 'warning-request-observed-without-native-dialog');
  assert.equal(describeLeave({ ...base, dialog: { type: 'beforeunload' }, action: { error: { name: 'TimeoutError' } } }), 'native-dialog-observed; navigation-api-timed-out');
});
