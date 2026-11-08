import assert from 'node:assert/strict';
export function resolveBase(value = 'http://localhost:8765') {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('BASE_URL must be an HTTP(S) site path without credentials, query or fragment.');
  url.pathname = url.pathname.replace(/\/+$/, '') + '/';
  return url;
}
const target = resolveBase(process.env.BASE_URL);
export const base = target.href.slice(0, -1);
export const appURL = path => new URL(path.replace(/^\/+/, ''), target).href;
export function assertStaticRequests(requests, paths) {
  const allowed = new Set(paths.map(appURL));
  assert.ok(requests.every(r => r.method === 'GET' && r.body === null && allowed.has(r.url)), 'only explicitly allowed static GET requests, with no body or added query');
}
