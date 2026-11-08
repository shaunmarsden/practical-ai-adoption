# Three-browser release check

One maintainer command checks a specified source revision against a served preview or deployed site, then runs fictional browser journeys. It does not merge, deploy, submit notes or change the application.

```sh
npm ci
npx playwright install chromium firefox webkit
# Install Google Chrome separately if it is not already available.
BASE_URL=https://shaunmarsden.github.io/practical-ai-adoption \
EXPECTED_COMMIT=<full-40-character-commit> \
npm run test:workbench:live
```

Use the exact revision deployed at that URL. For a local check, serve `docs/`, set `BASE_URL=http://localhost:8765` and use the revision containing those served files. A local preview pass is not a deployment claim. The command was merged in [PR #100](https://github.com/shaunmarsden/practical-ai-adoption/pull/100). The [8 November PR #102 release result](live-2026-11-08-pr102.md) records a later live check; it does not imply the site is continuously verified.

The command requires installed **Google Chrome**, Playwright Firefox and Playwright WebKit. There is no silent Chromium substitution for Chrome and no automatic browser installation. Existing navigation/accessibility, draft and reflow suites still run in Playwright Chromium. CI installs all required engines and runs the same command against its local preview; it does not test production automatically.

## What must pass

1. All 16 explicit homepage, workbench and V2 asset files match the expected commit byte for byte over HTTP, before any journeys.
2. The existing three-size navigation/accessibility journey, draft preservation/failure suite and narrow-width/text-enlargement checks pass.
3. Chrome, Firefox and WebKit each run the unsaved-notes journey at 390 CSS pixels: real native cancelled reload/link/Back, exact retained state, failed save, text export, JSON checkpoint, actual downloaded-byte reopening after reload, all 28 fields on resave, restored controls, cancelled/rejected replacement and accepted reload/link leaving. The preview is explicitly reopened after the added reload. Partial native-date checks remain conditional on the engine exposing that state.
4. All 16 source files still match after the journeys. Each engine has its own successful report with browser version, five observed native navigation dialogs and the downloaded-byte round trip. An exit-zero process without those observations is insufficient.

Missing browsers, child errors, incomplete reports, unexpected dialogs, missed expected dialogs, wrong revisions and asset drift fail the overall command. Other engines still run after a child failure to collect evidence. There are **no automatic retries**; later successful jobs cannot turn the failed release into a pass. The output directory must be new. Use a new `RELEASE_OUTPUT` for every repeat, retaining the failed run.

WebKit's observed extra warning on dirty text export after cancelled Back remains a bounded caveat. Zero or one extra warning is accepted and the actual count is retained; more than one, incomplete downloads or changed notes fail. Fixing the browser quirk should not itself fail the check.

## Missed-warning diagnostics

Each native navigation records its label, decision, timings, browser version, URL/document identity, ready state, navigation type, activation state, changed status, all fictional note values, current step and exact preview before and after the action. It records main-frame/lifecycle/error events and the navigation API outcome separately from the observed dialog. A cancelled navigation API timeout is acceptable only when a real native dialog was observed and the page state remained identical. A timeout alone is never a pass.

An observational beforeunload listener is added after the application handler, only during an expected dirty leave, and removed afterwards. It logs `defaultPrevented`, return value and activation. It never prevents navigation, changes return value, wraps handlers or synthesises a warning. Its event log is an observation, not proof of why a browser did or did not show a dialog. Instrumentation and tracing can change timing and history-cache behaviour, so passing instrumented runs cannot establish the cause of the earlier Firefox miss.

Each successfully started Chrome/Firefox/WebKit journey writes `results.json` and `trace.zip`; journey failures also attempt `failure.png` and retain a failure-state snapshot. Launch/setup failures remain in the child log and fail the release, even when no child report exists. A trace-writing failure also fails the check. Traces and snapshots contain the generated fictional notes and test paths. Open a trace locally with `npx playwright show-trace <path>/trace.zip`. The aggregate `report.json` keeps per-child outcomes and separate logs, source hashes and target URL. CI uploads `test-results/` even after failure.

The separate controlled diagnostic test exercises Firefox's real cancelled warning, an unguarded fixture navigation, and a deliberately timed-out action with no browser navigation:

```sh
npm run test:workbench:diagnostics
```

Its two expected failed navigation observations are retained as negative controls. A passing control suite means those failures were detected and distinguished; it does not mean an unguarded application is acceptable.

Primary references: [Playwright dialogs](https://playwright.dev/docs/dialogs), [page navigation APIs](https://playwright.dev/docs/api/class-page) and [tracing API](https://playwright.dev/docs/api/class-tracing).

## Evidence boundaries

The [expectations](test-plan-2026-11-08.txt) were written before implementation by the maintainer. This is not a fresh or blinded AI review. The [verification record](verification-2026-11-08.json) distinguishes the historical PR #98 live check, first development failure, deliberately failing controls and the then-draft checks. The separate [PR #102 live record](live-2026-11-08-pr102.md) retains later deployment and software observations. The [owner-use log](../../../evidence/workbench-owner-use-2026-11-08.md) has a different evidence type. The PR #100 implementation changed maintainer tests and records; it added no application logic, assessment rules or approval conditions. Fictional automated checks do not establish physical-device/Safari application behaviour, screen-reader usability, guaranteed warnings or download retention, human comprehension, workplace benefit or operational permission.
