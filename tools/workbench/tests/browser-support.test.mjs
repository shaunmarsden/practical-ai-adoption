import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveBase, assertStaticRequests, appURL } from './browser-support.mjs';

test('browser targets preserve local root and GitHub Pages project prefixes', () => {
  assert.equal(new URL('workbench/', resolveBase('http://localhost:8765')).href, 'http://localhost:8765/workbench/');
  assert.equal(new URL('workbench/', resolveBase('https://example.test/project/')).href, 'https://example.test/project/workbench/');
  assert.equal(new URL('workbench/', resolveBase('https://example.test/project///')).href, 'https://example.test/project/workbench/');
  for (const value of ['file:///tmp/site', 'https://user:secret@example.test', 'https://example.test/?notes=private', 'https://example.test/#draft']) assert.throws(() => resolveBase(value));
});

test('request guard rejects added queries, foreign origins and note-bearing bodies', () => {
  const good = { url: appURL('workbench/app.mjs'), method: 'GET', body: null };
  assertStaticRequests([good], ['workbench/app.mjs']);
  for (const changed of [{ url: good.url + '?note=canary' }, { url: 'https://unrelated.invalid/workbench/app.mjs' }, { method: 'POST' }, { body: 'canary' }]) {
    assert.throws(() => assertStaticRequests([{ ...good, ...changed }], ['workbench/app.mjs']));
  }
});
