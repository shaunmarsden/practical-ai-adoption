# AI Adoption Workbench

A browser notebook for one work question: describe the work, compare AI and non-AI options, plan a bounded pilot if justified, measure what happened, review readiness separately and record a human decision.

**[Open the live AI Adoption Workbench](https://shaunmarsden.github.io/practical-ai-adoption/workbench/).** [PR #86](https://github.com/shaunmarsden/practical-ai-adoption/pull/86) was merged on 7 November 2026 as `e78ed2ff9b08a9982ca07306f4f36ef572c7cb8c`. Its [Pages build and deployment](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/42365996296) succeeded, and a subsequent live smoke test confirmed the deployed files and behaviour described below.

No installation, account, backend, telemetry or paid API is needed. The existing homepage and repository README link to it. For a local preview, serve `docs/` and open `/workbench/`; no build or runtime dependency is required.

The later review below identifies its exact frozen source version; review findings are not operational approval.

## Why add it

The initial audit on 6 November 2026 inspected README, AGENTS, roadmap, evidence status, workflow discovery, options comparison, controlled pilot, measurement, value and action-permission guides, and V2's method and application. The guides already cover these questions. The justified addition is a place to keep notes while following that route, rather than another assessment or more guidance.

No blocking defect was found in the baseline checks. Open PRs #73 and #74 concern historical V1 critique; neither is a competing workbench. The baseline was main at `d3aeecde2a9556a74903d37e7e2773fefcd60db3`. No V1/V2 rules, frozen cases, expectations, assessment reports or deployment settings were changed. V2's dated validation document retains its historical pre-release wording; the current README separately describes its subsequent release. This work does not rewrite historical evidence.

## Behaviour and boundaries

- Six freely navigable steps link to established guides. They are a reading route, not mandatory sequential gates or a validated methodology.
- Notes stay in page memory. Save draft explicitly downloads local JSON; Reopen draft reads a supported file after checking its structure and confirming replacement of existing notes. There is no autosave, database or submission. Reload/closing can lose the page notes, so save first and reopen manually. [Unsaved-notes protection](unsaved-notes/README.md) warns about newer edits where the browser allows it; it is not autosave or a guarantee. Text areas allow up to 12,000 UTF-16 code units each. Use fictional or non-sensitive summaries and safe references. [Format, failure handling and draft tests](drafts/README.md).
- The text download includes every note, unanswered items, reading links, export timestamp, caveats and a prominent copy of known problems, self-reported V2 position and reported human decision. It is a plain text record, not an executable document or a V2 report.
- Partial exports are allowed. No completion score, recommended decision, permission check or semantic validation is calculated. Conflicting or false notes remain possible and need human inspection. A recorded positive decision cannot make an unresolved issue acceptable.
- V2 opens separately with no answer transfer. Its outcome is manually recorded, explicitly self-reported and unverified. Keep its own report alongside this notebook. A complete V2 record is never approval.
- Non-AI, no-trial, stop and gather-evidence routes remain available. Fictional exercises, observations and independent review remain distinct; labels entered by users do not verify those claims.
- The page's connection policy blocks programmatic connections. Static hosting still serves assets; deliberately following a guide opens GitHub. Browser extensions, device retention/sync, host logs and a user's later sharing are outside the application's control.

## Reproduce checks

From the repository root, using Node 22.12+ and Python 3.12 as in CI:

```sh
npm ci
python3 .github/scripts/repo_checks.py
npm test
npm run test:compare
```

Run the retained Python suite from its documented directory:

```sh
cd tools/pilot-readiness
python3 -m unittest discover -s tests -v
```

For browser checks, install Chromium with `npx playwright install chromium`, serve `docs` on port 8765, then in another terminal run:

```sh
npm run test:workbench
npm run test:workbench:drafts
npm run test:browser
npm run test:pdf
```

The existing PDF check needs `pdfplumber==0.11.9` on Python 3.12. Browser artefacts go to ignored `test-results/`. `BASE_URL` can select another local server. CI runs both browser suites and retains their artefacts. Axe is a development dependency only; the page loads no accessibility library or third-party asset.

## Verification on 6 November 2026

Baseline, before app changes:

- Repository checks passed across 73 Markdown files.
- 23 Node tests and 8 Python tests passed. All 59,049 retained V1 status combinations agreed with Python; the V2 comparison retained its 30 original and 16 new cases and its known false-reporting limits.
- Existing V2 browser suite passed 92 fixture journeys plus keyboard, migration, privacy, homepage and PDF download interactions at desktop/mobile sizes.
- All 13 downloaded V2 PDFs passed note/reference/issue retention and text-bound checks using the existing checker.

Workbench checks:

- Five new Node tests cover incomplete exports, adverse findings alongside positive claims, all-field literal export with Unicode/long/multiline notes, and links/resources pointing to actual guide files/V2. The combined suite has 28 passing tests.
- Three Chromium journeys at 1440, 390 and 320 CSS pixels cover all six steps, keyboard skip/Next focus, unique IDs, back/jump navigation, retained edits, actual blank/filled downloads, live preview, literal HTML-like text, separate V2 navigation, cancelled/confirmed clearing, loss on reload and the homepage entry link.
- Eighteen axe scans check applicable WCAG 2 A/AA and 2.1 A/AA rules, one per step per size, with no detected violations. All three journeys have no horizontal page overflow, uncaught page/console errors or failed requests. Desktop and narrow mobile screenshots were visually inspected.
- Request assertions allow only explicit local static assets with GET and no bodies during note entry/export. Cookies, localStorage and sessionStorage remain empty. A no-JavaScript check confirms a usable link to the established guide route.

Development findings are retained here: the first workbench browser run failed because the Next button and next-action note shared an ID. Renaming navigation IDs fixed the failure; the suite now checks all DOM IDs for uniqueness. The first Python baseline invocation used the wrong directory and failed to import the existing checker; its documented invocation passed. Narrow-screen visual review also showed that native selects can crop long outcome labels; the full current selection is now repeated below each select and checked in the journeys. The host's Python 3.9 could not install the pinned PDF dependency, so the PDF checks used a temporary Python 3.12 environment matching CI.

## Live production smoke test on 7 November 2026

This was a read-only check of the actual GitHub Pages site using fictional notes, not a local preview. No repository files, app code, Pages settings or deployment configuration were changed by the smoke test. These are dated observations, not continuous monitoring or independent validation.

| Check | Result and observed scope |
| --- | --- |
| Deployment | PASS. Six served files matched the merge commit byte for byte: all four Workbench files, the shared icon and homepage. Pages reported a successful build for `e78ed2f`. |
| Navigation | PASS. All six steps, keyboard Next, Back and direct jumps worked without losing notes. Homepage entry and header return worked. Guide links opened separately. V2 opened with a blank pilot and no notebook-note transfer. The no-JavaScript guide-route fallback remained visible. |
| Exports and preview | PASS. Nine actual UTF-8 text downloads covered blank, partial and filled records at three viewport sizes. Filled exports retained all 28 fields, Unicode, literal markup, newlines, tabs, an 11,936-character note, reading links, timestamp, unanswered items and caveats. Known problems stayed prominent alongside positive, unverified V2 and human-decision claims. Preview updated after edits; markup stayed literal rather than executing. |
| Mobile layout | PASS. Chromium at 1440 x 1000, with touch-enabled mobile emulation at 390 x 844 and 320 x 740. All six panels and the long preview had no horizontal page overflow. Representative screenshots were inspected. Long choices could crop inside native dropdowns, but their full current wording remained readable below. |
| Clearing and reload | PASS. Cancelling Clear retained notes; confirming cleared all 28 fields and the preview. Reload cleared notes. Existing downloaded files remained unchanged. |
| Privacy | PASS within the tested sessions. Note entry, preview and export generated only allowed same-site static GET requests, with no bodies or note-bearing URLs. localStorage, sessionStorage, cookies, IndexedDB, Cache Storage and service-worker registrations were empty. The page policy included `connect-src 'none'`. No console/runtime errors, failed requests or HTTP errors occurred in the Workbench journeys. |

Ten unique guide/V2 destinations were checked. One direct availability probe to the data-permission guide received GitHub HTTP 429. Following the actual Workbench link in a fresh browser then returned HTTP 200 and displayed the expected heading. The other nine destinations returned HTTP 200. The initial rate-limit response was retained as an observation, not silently counted as a first-attempt success or treated as a broken link.

These live checks do not repeat the earlier axe scans or establish complete accessibility. Mobile testing used Chromium emulation, not physical devices. Safari, Firefox and assistive technologies were not tested. Ordinary GitHub Pages access logs still receive static requests; deliberately following guides opens GitHub. Browser extensions, device retention/sync and session-recovery differences are outside this smoke test. Exported text persists on the device and is not a resumable backup: there is no import or autosave.

## Fresh-context AI review

The [7 November approval-boundary review](reviews/2026-11-07/README.md) preserves two fresh AI contexts' original findings, fictional expectations, first outputs, screenshots and environment failures. Neither established an actionable approval defect in its examined cases, so no application fix followed. The reviewers' contexts were separate from the implementation conversation and earlier answer keys; this is not independent external human validation or evidence of actual user comprehension. The optional summary-layout suggestion remains unproven. [Evidence Status](../../EVIDENCE-STATUS.md) records these distinctions.

## Evidence limits

The original software checks used invented inputs within the implementation process. They are not a blinded evaluation of advice, a real pilot or evidence of better adoption decisions. The later fresh-context AI review has the separate provenance and limits described above. No real employer/customer data was used.

Automated accessibility scans and visual inspection do not establish screen-reader usability, user comprehension, cross-browser support or complete WCAG conformance. Safari, Firefox, physical phones and assistive technologies were not tested. The readable UTF-8 text export cannot be reopened. Versioned JSON drafts support manual reopening with no automatic V2 integration. Users must review the evidence and obtain actual authority separately. Independent user understanding, real-work utility and realised benefits remain unestablished.

## Maintenance and deployed-release verification

The [8 November maintenance record](reviews/2026-11-08/README.md) documents two reproduced text-enlargement fixes, broader browser checks and the reusable deployed-site verifier. It preserves the initial failed release result and distinguishes independent AI/software observations from human or real-use evidence. Maintainers can run `npm run test:workbench:live` with explicit `BASE_URL` and `EXPECTED_COMMIT`; see the record for commands and limitations.

## Proposed unsaved-notes protection

The [unsaved-notes record](unsaved-notes/README.md) describes the changed-state warning, retained first failures, fresh AI challenges and Chrome/Firefox/WebKit checks. It is draft-branch evidence, not a deployed-release claim. Earlier dated browser and live observations above retain their original scope.
