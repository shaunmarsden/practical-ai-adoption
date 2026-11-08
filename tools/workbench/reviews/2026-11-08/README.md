# Workbench maintenance and release checks

8 November 2026. This batch addresses two reproduced layout issues and makes production checks reusable. It adds no assessment criteria, approval process, backend or new work-data collection.

## Value and completion criteria

| Work | Practical value | Done when |
| --- | --- | --- |
| Verify local drafts after merging PR #95 | Detect a deployment mismatch or broken save/reopen journey | Deployed source matches its merge commit and fictional notes survive the live journey |
| Fix two text-enlargement issues | Keep headings, labels and the native file button readable on a narrow page | Original failing case passes unchanged after the smallest CSS fix and independent recheck |
| Maintain a release-verification command | Replace one-off scripts and avoid mistaking local success for deployment | Wrong revisions/targets fail; a matched deployment passes the real browser journeys with separate evidence |
| Retain findings and limits | Make the result inspectable without overstating software evidence | First failures, independent reports and exact limits remain available |

These are completion criteria for a bounded maintenance batch, not a requirement to consume a time or token allowance. No speculative feature is included.

## Initial deployment and reproduced defects

[PR #95](https://github.com/shaunmarsden/practical-ai-adoption/pull/95) merged as `e5ea82a44a5625e044b1f067d22345d90b44a911`. Its Pages deployment succeeded. The first maintained live run matched all 15 checked assets and passed the full workbench and draft journeys on the actual project URL. Its new reflow journey then failed at the reproduced enlargement issue; the overall release check correctly remained failed. See the unchanged [initial live report](initial-live-report.json), [journey log](initial-live-journey.log), [draft log](initial-live-drafts.log) and [reflow failure](initial-live-reflow.log).

The accessibility reviewer froze a challenge plan before testing the `e5ea82a` source. Normal 320-pixel layout and enlarged text at 390 pixels passed. Combining a 320 CSS-pixel viewport with 200% root text exposed two low-severity problems:

- **Page overflow:** the heading and some labels exceed their boxes. Document scroll width was 376 pixels for a 320-pixel viewport.
- **Native file button clipping:** Chromium and Firefox clip the button wording inside the narrow file input. Its external Reopen draft label and full help remain available.

The maintained regression reproduced the 376-versus-320 failure before the fix. Two CSS rules now allow main text and the native file button to wrap. The unchanged case then passed in Chromium, Firefox and Playwright WebKit, with document width 320. The independent reviewer rechecked the candidate and inspected the full button labels. The [first report](accessibility/REPORT.txt), [first measurements](accessibility/overflow-reproduction.json), [first image](accessibility/chromium-200-file-input.png), [post-fix report](accessibility/POST-FIX.txt), [post-fix measurements](accessibility/post-fix-results.json) and [post-fix image](accessibility/post-fix-chromium-file.png) retain the distinction.

Words can break awkwardly at this stress setting. Chromium and Firefox still clip the native filename area; the external label, full button and import status remain available. This is a partial native-control layout improvement, not a custom chooser or complete native-UI accessibility solution. The settings are a CSS text-enlargement stress case, not a formal WCAG failure finding under actual browser zoom.

## Independent checks

Three fresh AI contexts reviewed frozen source independently of the implementation conversation and old test keys. Each prepared new cases before execution. The coordinating context received findings and implemented the two CSS changes; reviewers did not edit production. Separate context does not mean external human validation, different model families or measured user understanding.

| Review | Observed scope and result | Original evidence |
| --- | --- | --- |
| Browser compatibility | 100 bounded checks passed across WebKit desktop/touch emulation and Firefox desktop/narrow layouts, including exact 28-note preservation, rejection, refusal, races, native edits and privacy | [Report](compatibility/REPORT.txt), [frozen plan](compatibility/frozen-plan.json), [first results](compatibility/results.json), [supplement](compatibility/supplement-results.json) |
| Parser and async resilience | 96 original parser cases, 18 Chromium and 18 WebKit journeys passed. Supplementary deterministic generation checked 3,000 specimens; additional size checks passed. No actionable defect was found in those cases. | [Report](resilience/REPORT.txt), [original parser results](resilience/parser-first-results.json), [Chromium results](resilience/browser-first-results.json), [WebKit results](resilience/webkit-first-results.json), [supplement](resilience/extended-first-results.json) |
| Accessibility/layout | 20 primary checks passed after a harness correction; extra stress checks revealed the two issues above. Candidate recheck used the same settings in all three engines. | [Plan](accessibility/challenges.txt), [first attempt](accessibility/first-results.json), [corrected primary run](accessibility/results-after-harness-fix.json), [post-fix report](accessibility/POST-FIX.txt) |

Counts use different granularity and overlap in themes. They are not a combined safety score. The resilience report corrects a runner label: one browser string case used 10,500 units, not the maximum 12,000; exact maximum was separately tested in parser cases. The accessibility first attempt stopped because axe required an explicit browser context; that harness problem and corrected run are retained separately. It is not described as an application failure.

Original reports are copied unchanged with `.txt` extensions; paths in them refer to their original ignored local audit folders. Published first result files, plans and selected screenshots are byte-identical. Full source snapshots, scripts and larger local artefacts remain in the audit workspace; this is a curated evidence record rather than a claim that every generated file is published. The [publication hash manifest](evidence.sha256) covers the copied evidence and was created after testing, not as independent timestamp proof.

## Maintained production verification

`npm run test:workbench:live` requires an explicit `BASE_URL` and full `EXPECTED_COMMIT`. It checks 15 deployed asset bodies against Git source before and after the journeys, and runs the maintained workbench, draft and reflow journeys against that site path. Local root URLs and GitHub Pages project prefixes use the same drivers. Privacy assertions allow only exact static URLs: added queries, foreign origins and request bodies fail.

Each invocation uses a new timestamped evidence folder under ignored `test-results/workbench-release/`, or a new explicit `RELEASE_OUTPUT`. Existing evidence directories are refused. Source mismatches and journey failures retain a failed report; a mismatch prevents note-entry journeys from running. Invalid configuration fails before report setup, so the invoking shell must retain stderr if those preflight errors matter.

For a maintainer with the existing Node/Playwright prerequisites, verify the current fetched main deployment:

```sh
git fetch origin main
BASE_URL=https://shaunmarsden.github.io/practical-ai-adoption EXPECTED_COMMIT="$(git rev-parse origin/main)" npm run test:workbench:live
```

This command makes no deployment or remote write. Its notes and downloads are fictional and browser-local. A deployment not yet updated to the requested commit, or changed during the journeys, must fail rather than be treated as a verified release. The command creates local test downloads and artefacts, which may be subject to device retention or sync.

A separate [harness review](release-harness/REPORT.txt) checked nine negative invocations. Wrong/missing source, changed assets, invalid targets and reused evidence directories all exited nonzero without claiming success. The altered candidate CSS was detected before journeys. These negative checks establish failure handling, not a completed positive release run. The post-merge positive result belongs in the release PR record and its new, separate live evidence folder.

## Regression checks and limits

After integrating the separately merged PRs #91 and #92, the maintained Node suite has 46 tests. Their record-retention cases and passive-feedback link were preserved; the independent baseline audits above still concern the earlier frozen source, not a new review of those PRs. Local workbench/draft journeys and the new four-combination reflow regression passed; all six steps were checked at 320/390 pixels and 100/200% root text. Reflow passed locally in Chromium, Firefox and WebKit; CI adds the Chromium regression to the existing full workflow. Two new Node tests cover URL-prefix resolution and rejection of foreign/query/body-bearing requests.

The browser tests use simulated controls and local fault injection. Browser engines and touch viewports do not establish actual Safari, mobile Firefox, physical devices, OS dialogs, real download UX, assistive technology or human comprehension. No screen-reader announcements were heard or scored. No claims are made about workplace outcomes, valid authority or all possible security/data-loss paths. Draft structure checks still do not verify truth or grant approval.
