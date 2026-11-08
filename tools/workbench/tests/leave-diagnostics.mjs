import assert from 'node:assert/strict';

// Labels describe observations, not a diagnosis of the browser or application.
export function describeLeave(attempt) {
  if (attempt.dialog?.type === 'beforeunload') return attempt.action.error?.name === 'TimeoutError'
    ? 'native-dialog-observed; navigation-api-timed-out' : 'native-dialog-observed';
  if (attempt.before?.document !== attempt.after?.document) return 'page-changed-without-observed-native-dialog';
  if (attempt.events.some(event => event.type === 'beforeunload' && event.prevented)) return 'warning-request-observed-without-native-dialog';
  if (attempt.action.error?.name === 'TimeoutError') return 'navigation-api-timed-out-without-observed-native-dialog';
  return 'no-native-dialog-observed';
}

export async function pageState(page) {
  try {
    return await page.evaluate(() => ({
      url: location.href, document: performance.timeOrigin, readyState: document.readyState,
      activation: navigator.userActivation ? { active: navigator.userActivation.isActive, sticky: navigator.userActivation.hasBeenActive } : null,
      navigationType: performance.getEntriesByType('navigation')[0]?.type,
      changed: document.querySelector('#changes-status')?.dataset.changed ?? null,
      notes: Object.fromEntries([...document.querySelectorAll('#notes input,#notes textarea,#notes select')].map(el => [el.id, el.value])),
      step: document.querySelector('[aria-current="step"]')?.textContent ?? null,
      preview: document.querySelector('#summary')?.textContent ?? null,
      previewHidden: document.querySelector('#summary')?.hidden ?? null,
      badDate: document.querySelector('#decisionDate')?.validity.badInput ?? null
    }));
  } catch (error) { return { unavailable: error.message, url: page.url() }; }
}

export function createLeaveDiagnostics(page, attempts, { dialogTimeout = 10000 } = {}) {
  let current;
  const stamp = () => new Date().toISOString();
  const record = (type, details = {}) => current?.events.push({ at: stamp(), type, ...details });
  const listeners = {
    domcontentloaded: () => record('domcontentloaded'),
    load: () => record('load'),
    framenavigated: frame => { if (frame === page.mainFrame()) record('main-frame-navigation', { url: frame.url() }); },
    crash: () => record('page-crash'),
    pageerror: error => record('page-error', { message: error.message }),
    requestfailed: request => record('request-failed', { url: request.url(), failure: request.failure() }),
    console: message => {
      if (!message.text().startsWith('WORKBENCH-LEAVE:')) return;
      try { record('beforeunload', JSON.parse(message.text().slice('WORKBENCH-LEAVE:'.length))); }
      catch { record('diagnostic-console-decode-failure'); }
    }
  };
  for (const [event, listener] of Object.entries(listeners)) page.on(event, listener);
  return {
    async run(label, action, decision) {
      assert.ok(['accept', 'dismiss'].includes(decision));
      const attempt = { label, decision, startedAt: stamp(), events: [], before: await pageState(page) };
      attempts.push(attempt); current = attempt;
      try {
        // Observe only during an expected dirty leave. Do not prevent, change
        // returnValue, wrap application handlers or add clean-page listeners.
        await page.evaluate(() => {
          window.__workbenchLeaveObserver = event => console.debug('WORKBENCH-LEAVE:' + JSON.stringify({
            prevented: event.defaultPrevented, returnValue: String(event.returnValue),
            stickyActivation: navigator.userActivation?.hasBeenActive, document: performance.timeOrigin
          }));
          window.addEventListener('beforeunload', window.__workbenchLeaveObserver);
        });
        const dialog = page.waitForEvent('dialog', { predicate: item => item.type() === 'beforeunload', timeout: dialogTimeout })
          .then(item => ({ type: item.type(), observedAt: stamp() }), error => ({ missing: true, error: { name: error.name, message: error.message } }));
        // Handle both promises immediately. A no-dialog timeout must not hide
        // an earlier action error or become an unhandled rejection.
        const navigation = Promise.resolve().then(action).then(() => ({ completed: true }), error => ({ error: { name: error.name, message: error.message } }));
        [attempt.dialog, attempt.action] = await Promise.all([dialog, navigation]);
        attempt.after = await pageState(page);
        attempt.observation = describeLeave(attempt);
        assert.equal(attempt.dialog.type, 'beforeunload', `Expected native beforeunload: ${attempt.observation}`);
        if (decision === 'dismiss') {
          const stable = state => Object.fromEntries(['url', 'document', 'changed', 'notes', 'step', 'preview', 'previewHidden', 'badDate'].map(key => [key, state[key]]));
          assert.deepEqual(stable(attempt.after), stable(attempt.before), 'cancelled leave retains page, notes, step and preview');
        }
        else assert.ok(!attempt.action.error, `accepted navigation failed: ${attempt.action.error?.message}`);
        attempt.status = 'passed';
      } catch (error) {
        attempt.status = 'failed'; attempt.error = error.message;
        attempt.after ??= await pageState(page);
        if (attempt.action) attempt.observation ??= describeLeave(attempt);
        throw error;
      } finally {
        attempt.finishedAt = stamp(); current = undefined;
        // The document may already have navigated; absence is harmless.
        await page.evaluate(() => {
          window.removeEventListener('beforeunload', window.__workbenchLeaveObserver);
          delete window.__workbenchLeaveObserver;
        }).catch(error => { attempt.cleanupError = error.message; });
      }
    },
    dispose() { for (const [event, listener] of Object.entries(listeners)) page.off(event, listener); }
  };
}
