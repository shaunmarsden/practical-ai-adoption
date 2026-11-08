# Unsaved notes protection

This change warns before leaving newer notes. It does not save them automatically, verify evidence or grant approval.

A checkpoint is the initial blank page, a successfully reopened draft, the exact notes captured in a JSON download request, or a confirmed clear. Editing any of the 28 fields marks the page changed; reverting to the checkpoint clears that state. A text export or failed JSON request does not move the checkpoint. A requested download is not proof that the user kept a file. The status says to check downloads.

The page attaches a native `beforeunload` handler only while notes have changed. Internal step navigation and links that open another tab do not leave the editing page. Cancelled leaving, clearing and replacement retain the current notes. Rejected files and edits during a pending read cannot silently replace newer work. Imported CRLF/CR strings survive unedited controls and visible reversion. Browser-restored controls are reconciled on `pageshow`; the synthetic test is not proof of actual history-cache behaviour.

Incomplete native date input can have an empty serialised value. When the browser exposes `badInput`, it counts as changed and JSON saving asks the user to complete or clear it. Editing an already incomplete segment also invalidates a pending import. This does not add an assessment rule.

## Limits

The browser chooses the warning text and normally needs prior user interaction. Mobile app shutdown, process termination and crashes may give no warning. A clean checkpoint means no newer edits, not guaranteed retention, evidence verification or permission. There is no autosave, localStorage, sessionStorage, telemetry, backend, note transfer or new external action. Device downloads and browser recovery remain outside the application's control. In Playwright WebKit 26.5, cancelling Back then exporting dirty text caused one extra native warning; dismissing it retained notes and produced the complete download. No warning bypass was added.

Primary references: [MDN beforeunload](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) and [Playwright dialog behaviour](https://playwright.dev/docs/dialogs).

## Reproduce

Serve `docs/` locally, install the required Playwright browsers, then run from the repository root:

```sh
npm test
BASE_URL=http://localhost:8765 TEST_BROWSER=chrome npm run test:workbench:changes
BASE_URL=http://localhost:8765 TEST_BROWSER=firefox npm run test:workbench:changes
BASE_URL=http://localhost:8765 TEST_BROWSER=webkit npm run test:workbench:changes
npm run test:workbench
npm run test:workbench:drafts
npm run test:workbench:reflow
```

`chrome` selects installed Google Chrome; the default is Playwright Chromium. Browser artefacts are written under ignored `test-results/workbench-changes/`. CI runs the maintained changes suite in Chromium. The [review record](review-2026-11-08/README.md) preserves separately prepared challenges, original failures and subsequent repairs. These are AI/software tests with fictional inputs, not human comprehension or workplace evidence. This draft change has not been deployed.
