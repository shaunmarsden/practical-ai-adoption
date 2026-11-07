import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { steps, fields, emptyRecord, recordText, caveat } from '../../../docs/workbench/content.mjs';

test('an empty export remains an unanswered, non-permissive record', () => {
  const text = recordText(emptyRecord(), '2026-11-06T12:00:00.000Z');
  assert.ok(text.includes(caveat));
  assert.match(text, /Human decision \(self-reported\): No human decision recorded/);
  assert.match(text, /V2 position \(self-reported\): Not reviewed/);
  assert.match(text, /Known problems: Not recorded/);
  assert.match(text, /Work and outcome sought:\nNot recorded/);
  assert.match(text, /This is not a V2 assessment report/);
  assert.match(text, /Exported: 2026-11-06T12:00:00.000Z/);
});

test('a positive reported decision cannot erase adverse findings or unknown permission', () => {
  const record = { ...emptyRecord(), issues: 'A wrong date escaped review. Action: stop and inspect. Owner: reviewer.', permissions: 'Unknown', readiness: 'COMPLETE RECORD - HUMAN DECISION REQUIRED', decision: 'Continue within an existing authorised boundary' };
  const before = structuredClone(record);
  const text = recordText(record);
  const opening = text.split('DESCRIBE THE WORK')[0];
  assert.ok(opening.includes(record.issues));
  assert.ok(opening.includes(record.readiness));
  assert.ok(opening.includes('Not a validated assessment'));
  assert.ok(text.includes('Actual permission status:\nUnknown'));
  assert.deepEqual(record, before);
});

test('all notes survive export literally, including multiline, Unicode and long tokens', () => {
  const record = Object.fromEntries(fields.map(([id]) => [id, `${id}: Fictional Zoë\n<script>bad()</script>\n${'z'.repeat(1200)} END-${id}`]));
  const text = recordText(record);
  for (const [id, label] of fields) assert.ok(text.includes(`${label}:\n${record[id]}`), id);
  assert.equal(fields.length, new Set(fields.map(([id]) => id)).size);
});

test('each step routes to existing source or V2, without passing note parameters', async () => {
  for (const step of steps) {
    assert.ok(step.links.length);
    for (const { href } of step.links) {
      const url = new URL(href, 'https://shaunmarsden.github.io/practical-ai-adoption/workbench/');
      assert.equal(url.search, '');
      const path = url.hostname === 'github.com' ? url.pathname.split('/blob/main/')[1] : 'docs/pilot-readiness/index.html';
      await access(path);
    }
  }
  const html = await readFile('docs/workbench/index.html', 'utf8');
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /<noscript>/);
});


test('workbench shell resources and navigation targets exist', async () => {
  const html = await readFile('docs/workbench/index.html', 'utf8');
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (target.startsWith('#')) {
      assert.ok(html.includes(`id="${target.slice(1)}"`), target);
    } else if (target.startsWith('https:')) {
      assert.ok(target.startsWith('https://github.com/shaunmarsden/practical-ai-adoption'));
      if (target.includes('/blob/main/')) await access(target.split('/blob/main/')[1]);
    } else {
      const url = new URL(target, new URL('../../../docs/workbench/index.html', import.meta.url));
      await access(target.endsWith('/') ? new URL('index.html', url) : url);
    }
  }
});
