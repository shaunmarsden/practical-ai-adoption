import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { steps, fields, emptyRecord, recordText, reviewBriefText, caveat } from '../../../docs/workbench/content.mjs';

test('an empty export remains an unanswered, non-permissive record', () => {
  const text = recordText(emptyRecord(), '2026-11-06T12:00:00.000Z');
  assert.ok(text.includes(caveat));
  assert.match(text, /Human decision \(self-reported\): No human decision recorded/);
  assert.match(text, /V2 position \(self-reported\): Not reviewed/);
  assert.match(text, /Known problems: Not recorded/);
  assert.match(text.split('DESCRIBE THE WORK')[0], /Evidence basis \(self-reported\): Not recorded/);
  assert.match(text.split('DESCRIBE THE WORK')[0], /Next action, responsible role and review date\/triggers \(self-reported\):\nNot recorded/);
  assert.match(text, /Work and outcome sought:\nNot recorded/);
  assert.match(text, /This is not a V2 assessment report/);
  assert.match(text, /Exported: 2026-11-06T12:00:00.000Z/);
});

test('a fictional manager handoff keeps evidence basis and literal next actions beside the decision', () => {
  const record = { ...emptyRecord(), work: 'Fictional Wren Quay public-notice digest.', evidenceType: 'Fictional exercise', issues: 'Tool permission and baseline unresolved.', decision: 'Use a non-AI route', next: 'Fictional coordinator: prepare checklist by 10 November.\nManager: review 3 baseline logs on 30 November. <not approval>' };
  const before = structuredClone(record);
  const text = recordText(record);
  const opening = text.split('DESCRIBE THE WORK')[0];
  for (const value of [record.issues, record.evidenceType, record.decision, record.next, caveat]) assert.ok(opening.includes(value), value);
  assert.ok(opening.indexOf(record.issues) < opening.indexOf(record.next));
  assert.ok(text.includes(`Evidence basis:\n${record.evidenceType}`));
  assert.ok(text.includes(`Next action, responsible role and review date/triggers:\n${record.next}`));
  assert.deepEqual(record, before);
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


test('review brief preserves negative findings, permission unknown and missing human authority', () => {
  const record = {
    ...emptyRecord(),
    work: 'Fictional harbour notice update',
    evidenceType: 'Fictional exercise',
    route: 'Try a shared notice register before any AI trial.',
    issues: 'Wrong date published in fictional test. Not resolved.',
    permissions: 'Unknown: no permission to change live notices.',
    results: 'No measured results or verified benefit.',
    readiness: 'COMPLETE RECORD - HUMAN DECISION REQUIRED',
    decision: 'Continue within an existing authorised boundary',
    decisionOwner: '',
    next: 'Stop; ask an authorised role to review the error.'
  };
  const original = structuredClone(record);
  const text = reviewBriefText(record, '2026-11-16T12:00:00.000Z');
  const front = text.split('WORK AND OPTIONS')[0];
  for (const value of [record.issues, record.permissions, record.evidenceType, record.readiness, record.decision, record.next, caveat]) {
    assert.ok(front.includes(value), 'opening retains adverse status or evidence');
  }
  assert.match(text, /Decision-maker role and authority reference:\nNot recorded/);
  assert.match(text, /No measured results or verified benefit/);
  assert.match(text, /not checked for truth, consistency, permission or authority/);
  assert.match(text, /not the complete decision record/);
  assert.ok(text.indexOf(record.issues) < text.indexOf(record.decision));
  assert.deepEqual(record, original);
});

test('review brief retains literal multiline and markup without inventing decisions', () => {
  const record = {
    ...emptyRecord(),
    issues: 'Fictional issue\n<script>alert(1)</script>\n' + 'z'.repeat(2300),
    next: 'Do not proceed until reviewed\nOwner: unknown',
    work: 'Fictional office task'
  };
  const text = reviewBriefText(record, '2026-11-16T12:00:00.000Z');
  assert.ok(text.includes(record.issues));
  assert.ok(text.includes(record.next));
  assert.match(text, /Human decision \(self-reported\): No human decision recorded/);
  assert.match(text, /V2 position \(self-reported\): Not reviewed/);
  const blank = reviewBriefText(emptyRecord(), '2026-11-16T12:00:00.000Z');
  assert.match(blank, /Known problems and unresolved material issues:\nNot recorded/);
  assert.match(blank, /Actual permission status:\nNot recorded/);
  assert.match(blank, /No human decision recorded/);
});
