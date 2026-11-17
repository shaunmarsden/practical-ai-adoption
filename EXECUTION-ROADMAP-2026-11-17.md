# Practical AI Adoption: research-led execution roadmap

**Prepared:** 17th November 2026  
**Status:** proposed work queue, not completed implementation or evidence of customer use  
**Scope:** the public Practical AI Adoption guides, AI Adoption Workbench, separate Pilot Readiness Assessment V2, testing and portfolio handover  
**Baseline:** `main` commit `b5e811623925eb590c771f6dc18f1c6618ff6f32`; refresh before acting

## The decision

Build the **smallest credible, usable and well-tested product that helps a person describe a workplace task, consider AI and non-AI routes, test carefully where authorised, preserve evidence and prepare a human decision**.

The repo already has far more than a concept: a six-stage notebook, a fictional non-AI example, separate JSON draft and test-observation files, five challenge cases, expected/actual comparison, complete review pack, V2 assessment and extensive automated browser checks. More features are not automatically more value.

**Sequence for this cycle: reliability -> first-use friction -> information integrity -> clear handover -> accessibility -> evidence/feedback -> optional extensions.** Progress by fixing reproduced failures, not by counting PRs. A passing test is software evidence, not observed human comprehension or business return.

## Current verified position (17th November)

- GitHub Pages and post-merge checks for `b5e81162` both reported **success**. The preceding `b65cdd27` post-merge run failed while its Pages deployment passed. Do not erase the failed observation or assume a root cause.
- PRs **#73** and **#74** remain draft. They preserve a historical V1/V2 methodology challenge; #74 has original adverse cases and deliberate failing suitability checks. Do not merge, close or rewrite these as routine cleanup without comparing current V2 and preserving the evidence.
- Open issue **#4** asks for real/outside use of a prompting guide. There is no verified independent user study, operational pilot, measured productivity result or independent methodological approval.
- Recent PRs #106-#115 added roadmap clarification, fictional example, review brief, proposed test sheet, reported outcomes, comparison, combined pack, simpler start and reduced export clutter. Recheck code before duplicating any of them.
- The `ROADMAP.md`, `PROJECT-CONTINUITY.md` and `tools/workbench/README.md` still contain older, dated statements. Preserve those records but add clear current links rather than retrospectively altering historical facts.
- This roadmap is a **plan**, not a statement that its tests or changes were performed.

## What the external research actually supports

1. **Simplify before adding a task list.** GOV.UK Design System says a task list helps when users need to return or work out of order, but should not be added if a simpler service will do. Our six steps already support free navigation; a new progress dashboard has no evidence basis yet. Source: https://design-system.service.gov.uk/components/task-list/
2. **Let people inspect and correct answers.** GOV.UK's Check answers pattern gives a good direction for review, but the Workbench is not a government service and exporting is not submitting. Source: https://design-system.service.gov.uk/patterns/check-answers/
3. **Accessibility testing is wider than axe.** WCAG 2.2 covers keyboard focus, status messages and pointer targets; Playwright explicitly cautions that automated scans cannot replace manual/inclusive testing. Sources: https://www.w3.org/TR/WCAG22/ and https://playwright.dev/docs/accessibility-testing
4. **Device emulation is not a physical-phone study.** Playwright can emulate viewport, user-agent and touch settings; document that scope instead of claiming real mobile usability. Source: https://playwright.dev/docs/emulation
5. **Do not casually add local browser storage.** OWASP flags security issues when sensitive information is placed in web storage. The Workbench's current memory-plus-explicit-file design is a deliberate privacy trade-off. Source: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
6. **Release evidence must be exact.** GitHub status checks describe whether changes passed CI; the separate deployed-asset checker must still confirm the published commit. Source: https://docs.github.com/en/pull-requests/reference/status-checks

These sources are design and testing references, **not proof that this particular Workbench works better**. Research supports what to inspect, not invented findings about visitor behaviour.

## Definition of done: every change

- Start with one observable problem, expected behaviour and an adversarial fictional scenario.
- Use only public or invented material. Do not import workplace, employer, client, learner or private data.
- Keep AI/non-AI choices, incomplete fields, unresolved material issues, self-reported evidence and human authority separate.
- Preserve byte-level round trips for both existing JSON formats unless a deliberate, versioned migration is approved and tested.
- Run repository checks, Node and Python parity, browser journeys, accessibility checks and live-asset verification **as applicable**. Report which actually ran.
- Keep failures and first observations visible. Do not remove failing tests merely to make CI green.
- Record CI URL, exact merged commit, Pages deployment and post-merge result. **A PR pass alone is not a live release pass.**
- Do not call something independently reviewed, validated, safe, production-proven or commercially successful without the right evidence.

## Priority scale and delivery rules

- **P0:** release defects, silent data loss, misleading approval, privacy leak, or inability to complete core task.
- **P1:** high-friction core journey, weak handover, hard-to-recover state or known accessibility failure.
- **P2:** justified improvements to maintainability, docs or optional use cases.
- **P3 / gated:** ideas requiring outside use, a buyer, a verified integration environment or a documented repeated failure.
- Work one P0/P1 batch at a time. Open a PR, run checks, review exact evidence, merge only with an authorised release instruction, verify live commit, then pick another.
- **Stop building new UI** if we cannot state the user problem, reproduce it and describe how a fix will be tested.

## Today's execution queue: achievable order, not a promise

| Order | Work | Why now | Done when |
| --- | --- | --- | --- |
| 1 | **R01-R04** establish clean release baseline and retain historical failures | Avoid adding features on unreliable evidence | Current main hash, Actions status and failing logs are accurately recorded |
| 2 | **J01-J05** run three end-to-end fictional journeys (no-AI, failed trial, incomplete evidence) | The tool's real shape is its full journey, not individual buttons | Repeatable scripts/checklist with first observed failures, not fabricated user feedback |
| 3 | **J06-J10** fix the highest-severity reproduced friction | Direct effect on first-run usability | Specific change, regression test and no lost functionality |
| 4 | **D01-D06** challenge save/reopen/export integrity across both JSON formats | Losing or misrepresenting notes defeats the product | Adverse, blank, partial and conflicting records survive |
| 5 | **H01-H05** evaluate the actual complete review pack as a decision handover | Main intended output | No critical evidence or authority field disappears |
| 6 | **A01-A05** targeted keyboard, zoom, focus and mobile review | Automated axe scans are insufficient | Tests or limitations recorded honestly |
| 7 | **R05-R08** record release and update execution ledger | Makes future work portable | Exact links, SHA, status and open defects saved |

If the first batch discovers a P0 failure, **repair it before working on lower-priority items**. A complete day of disciplined testing and a small fix is more useful than twelve superficial PRs. Tasks marked later or gated are part of the strategic queue, not today's commitment.

## Workstream R: reliability, delivery and historical evidence

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| R01 | P0 | Recheck `main` SHA, open PRs, issue #4, last five main Actions and Pages runs. Record links and statuses without rewriting history. |
| R02 | P0 | Investigate any reproducible post-merge `test-outcomes` failure using printed child logs and retained artefacts. Either reproduce a root cause and write a regression, or log it as unresolved intermittent. |
| R03 | P0 | Re-run exact-commit deployed asset verification after each release and confirm both before/after hashes; fail closed on mismatch. |
| R04 | P1 | Verify whether PR #73 or #74 contains still-unaddressed V2 issues, using frozen adverse cases. Preserve separate review provenance; do not silently close drafts. |
| R05 | P1 | Audit the `checks.yml` release chain for what a PR success and post-merge success actually cover; retain deployment as separate evidence. |
| R06 | P1 | Run fresh clean-checkout installation and documented commands. Flag any undocumented environment requirement. |
| R07 | P1 | Check timeouts, browser-version drift and flaky tests by repeating suspect journeys with frozen inputs; report first failure and repeat outcomes. |
| R08 | P1 | Introduce one dated release evidence template with SHA, first attempts, failures, successful reruns, browser matrix and unresolved limits. |
| R09 | P2 | Audit test duplication and runtime bottlenecks. Remove duplicate coverage only after equivalent checks are demonstrated. |
| R10 | P2 | Review dependency and action pinning for reproducibility and security without changing runtime behaviour unnecessarily. |
| R11 | P2 | Confirm broken relative links, supported paths and external navigation destinations in the public repository. |
| R12 | P2 | Check accessibility scanner output is retained for both success and failure, not only a final pass count. |

## Workstream J: first-time journey and task focus

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| J01 | P1 | Freeze a fictional **non-AI/no-trial** journey: start -> describe -> compare -> record decision/no decision -> export. No forced pilot or invented approval. |
| J02 | P1 | Freeze a fictional **problematic trial**: an ordinary case appears acceptable, a serious case fails and permission is unknown. All bad facts survive the whole path. |
| J03 | P1 | Freeze a fictional **incomplete/abandoned** route: partial notes, unsaved changes, save, reload, reopen and later continuation. Nothing is magically restored. |
| J04 | P1 | Run each journey at 1440, 390 and 320 CSS pixels; inspect first-screen actions, repeated explanations, page height and scroll effort. Emulation, not physical-device use. |
| J05 | P1 | Record first observed confusion from these **software-led** journeys separately from genuine user feedback. Do not pretend a script has comprehension. |
| J06 | P1 | Check whether the new first-step CTA lands on a visible, labelled field with clear focus in all supported browser engines. |
| J07 | P1 | Count visible top-level controls before/after export grouping. Remove duplicate prompts if they have no distinct purpose. |
| J08 | P1 | Reconcile "Your decision record" and "Complete review pack" wording so users know which output contains test evidence. |
| J09 | P1 | Make "save for editing" versus "export for reading" understandable beside the controls, not buried in a long paragraph. |
| J10 | P1 | Check the fictional-example route from first click to export and verify it never implies measured outcome or a real human sign-off. |
| J11 | P2 | Test whether navigating directly to later stages is practical without treating the six sections as mandatory gates. |
| J12 | P2 | Evaluate optional progressive disclosure of long explanations **only after** observing avoidable friction; do not hide safety-critical context. |
| J13 | P2 | Check no-script fallback for a clear usable guide route rather than a broken blank app. |
| J14 | P2 | Revisit whether two broad export areas need clearer titles or one shared handover landmark; preserve both editable source formats. |

## Workstream D: file integrity, privacy and hostile input

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| D01 | P0 | Verify 28-field draft round trip with blank, filled, multiline, Unicode, CRLF, long and contradictory notes. Exact values survive. |
| D02 | P0 | Verify five-case results JSON round trip including reported problem, inconclusive, Not run, missing evidence and long notes. |
| D03 | P0 | Reject malformed, oversized, future-version, duplicate-key, unsupported-field and invalid UTF-8 imports without changing current notes. |
| D04 | P0 | Assert every observed case requires an actual observation; do not coerce status to acceptable when text contradicts it. |
| D05 | P0 | Review combined pack for note omissions: issue, permission, source, V2 position, decision owner, date, rationale, recovery and five outcomes. |
| D06 | P0 | Exercise cancelled save/reopen/clear and unsaved beforeunload across browsers; never claim browser warnings always fire. |
| D07 | P1 | Examine what happens if the Workbench draft is changed after results JSON is saved. Make the pack's current-state nature explicit. |
| D08 | P1 | Test HTML-like text, extremely long words and control characters in notes and reports. Render them as inert literal content. |
| D09 | P1 | Assert no answer-bearing URL/query/body, telemetry, cookies, browser storage or remote API appears in note-entry and export journeys. |
| D10 | P1 | Document device download/sync exposure without falsely promising downloaded files are private forever. |
| D11 | P1 | Check failed download requests leave unsaved state appropriately visible; distinguish request from verified file retention. |
| D12 | P2 | Investigate an optional **two-file handover checklist**, not a new combined JSON format, if users demonstrably confuse report text with editable backups. |
| D13 | Gated | Consider browser autosave only after a documented need and a privacy/security decision. Do not silently add localStorage or cloud storage. |
| D14 | Gated | Consider importable bundle format only if repeated user evidence shows the two JSON files cause harmful confusion. Require migration/version tests. |

## Workstream H: evidence, decision and handover quality

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| H01 | P0 | Verify complete pack places adverse findings, permission and decision authority before any comforting result claims. |
| H02 | P0 | Compare literal pack export against both source sets; no missing problem or changed certainty, scope or causality. |
| H03 | P0 | Check "no AI", "stop", "gather more evidence" and "no decision" routes remain valid outputs, not errors. |
| H04 | P1 | Evaluate whether missing reviewer and source references are visible without claiming a test has failed automatically. |
| H05 | P1 | Verify no standalone comparison or review pack implies V2 approval, human sign-off or verified benefits. |
| H06 | P1 | Check whether references are traceable enough for human review without requiring sensitive source material in the public tool. |
| H07 | P1 | Test conflict between positive status and negative observed narrative. Preserve both and flag for human attention, not automatic semantic arbitration. |
| H08 | P2 | Tighten repetitive caveats by keeping one prominent full explanation and shorter context-specific reminders; do not remove material warnings. |
| H09 | P2 | Review report section order against a realistic reader decision: work, option, evidence, risk, authority, next action. |
| H10 | P2 | Add one printable/human-readable format only if plain text is demonstrated to be insufficient; avoid an unnecessary PDF engine. |
| H11 | Gated | Assess a CSV export only for a named reporting or interoperability need; do not duplicate JSON and text for appearance. |
| H12 | Gated | Any machine-generated synthesis must be optional, evidence-labelled and tested against false claims before release; the neutral literal report remains available. |

## Workstream A: accessibility, browsers and real-world constraints

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| A01 | P1 | Audit the full first-run route with keyboard only: skip link, start, six steps, example, exports, file inputs and dialogs. |
| A02 | P1 | Verify focus restoration and logical position after expanding options, changing steps, saving, importing and clearing. |
| A03 | P1 | Test 200% and 400% zoom/reflow, long selections, long filenames and 320-pixel viewports without horizontal scroll or clipped controls. |
| A04 | P1 | Run axe and targeted manual WCAG 2.2 checks for focus visibility/obscuring, labels, status messages and targets. |
| A05 | P1 | Test screen-reader-friendly names and live-region announcements in the actual interactive order. Note if no manual assistive-tech test was possible. |
| A06 | P1 | Review native `details` behaviour in Chromium, Firefox and WebKit; keyboard expansion must reveal all controls without losing focus. |
| A07 | P2 | Check no-JavaScript fallback and reduced-motion/high-contrast preferences where relevant. |
| A08 | P2 | Test actual physical smartphone and assistive technology when access is available; do not substitute emulation for these observations. |
| A09 | P2 | Record browser-specific beforeunload/keyboard exceptions, including known WebKit behaviour, without disguising them as complete support. |
| A10 | P2 | Verify status notices do not announce on every keystroke or leave stale success wording after edits. |

## Workstream E: evidence, feedback and independent scrutiny

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| E01 | P1 | Refresh EVIDENCE-STATUS against actual 2026 commits and distinguish software-run fictional tests from outside user observations. |
| E02 | P1 | Ensure the Workbench feedback invitation doesn't expose private notes or open in the same tab with unsaved work. |
| E03 | P1 | Keep a dated defect/feedback log: reported statement, provenance, reproduction, severity, decision, resolution and limitations. |
| E04 | P1 | Define at least three realistic but wholly invented task scenarios with source documents created from scratch; hold out adverse details from the implementation prompt when feasible. |
| E05 | P1 | Retain first failed outputs and repair evidence; don't rewrite the case so the new code appears to have passed from the start. |
| E06 | P2 | Review historical draft PR #74's frozen adverse cases against current V2; label resolved, still reproduced, out-of-scope or unverified. |
| E07 | P2 | Record any unsolicited GitHub feedback as attributed visitor report, not a scored user study. Keep private data out of public Issues/Discussions. |
| E08 | Gated | If a volunteer genuinely uses the tool, record what they understood and where they struggled with consent; distinguish participant reports from observed task completion. |
| E09 | Gated | Seek outside subject review of V2 only when a suitable independent reviewer is willing and the scope is defined; never invent their judgement. |
| E10 | Gated | Record permissible real-work use with proper boundaries if it naturally occurs. Do not manufacture a customer study to fill a portfolio gap. |
| E11 | P2 | Keep commercial and portfolio wording tied to what was tested, not unverified time savings or claim of broad adoption. |

## Workstream M: architecture, maintainability and portability

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| M01 | P1 | Catalogue shared inputs/outputs: 28-field draft, five-case results, V2 report and text handovers, including file/version ownership. |
| M02 | P1 | Write a simple dependency map and confirm one feature cannot silently change V2 readiness logic. |
| M03 | P1 | Trace runtime privacy boundary: static assets only, client-side state, local downloads and no model-dependent APIs. |
| M04 | P2 | Refactor repeated export code **only if** tests show a maintenance fault or repeated defect; preserve exactly named files and literal content. |
| M05 | P2 | Check imported JSON duplicate-key handling, Unicode, time formats and byte limits in both formats for consistent documented reasons. |
| M06 | P2 | Review comments and instructions for stale release assertions. Replace only operational claims, preserving dated historical test accounts. |
| M07 | P2 | Create a practical contributor quickstart showing one safe UI change, one test and one verified release record. |
| M08 | P2 | Confirm portability: plain HTML/JS still works without paying for an LLM, account, deployment platform or proprietary workflow engine. |
| M09 | P2 | Add an API/adapter boundary **only** after an actual integration requirement, not to make the project look technically impressive. |
| M10 | Gated | Assess an integration with an external CRM, n8n, Make, Copilot, Codex or Claude only on fictional fixtures with real platform access and a justified task. Never imply production deployment. |

## Workstream P: product usefulness, public positioning and selective commercial paths

| ID | Priority | Work and acceptance criterion |
| --- | --- | --- |
| P01 | P1 | Ensure README, public landing page and Workbench each say who the tool is for, what it produces and what it does not do. |
| P02 | P1 | Separate the lightweight reader path (ordinary task) from the deeper team workflow path, without inventing a new framework. |
| P03 | P1 | Update the project continuity handoff to name the new roadmap and actual release gates. Preserve personal account and confidential boundaries. |
| P04 | P2 | Build a factual feature inventory with tested claims, supported browsers and known limitations. No invented usage numbers. |
| P05 | P2 | Record one reproducible public demonstration using invented data and original downloaded outputs, not fake client screenshots or outcomes. |
| P06 | P2 | Provide a plain-English maintenance guide for using the tool in a future role, consulting or a platform-specific task. |
| P07 | P2 | Compare this project with the public List Hygiene Checker, Skill Author, Sales Proof Bench and related repositories before any new standalone product. |
| P08 | Gated | Only package a marketplace skill when a real buyer problem, narrow input/output contract, test cases and distribution route are evident. |
| P09 | Gated | Only build a paid assessment, consultation template or Upwork-specific variant when credible demand emerges; do not centre the roadmap on bidding or discounting. |
| P10 | Gated | Consider hosted accounts, collaborative workspaces, analytics, paid APIs and multi-tenant storage as a separate product with a privacy/security business case, not an automatic next step. |

## Dependencies, gates and explicit things NOT to build yet

| Gate | Prerequisite | Blocked or discouraged until met |
| --- | --- | --- |
| G1: reliable releases | Stable exact-commit CI, stored logs, clean live verification | Aggressive UI rework, new format migrations |
| G2: useful core journey | Three fictional adverse journeys, fixes for reproduced problems | More progress indicators, dashboards, field count expansion |
| G3: review integrity | Literal evidence retained with unknown permissions and decision authority | Automatic pass/fail verdicts, readiness scores, synthesised approvals |
| G4: documented user need | Real report of repeated friction or a verified integration use case | Autosave, accounts, collaborative sync, extra file formats |
| G5: external proof | Consent, source evidence and independent reviewer where appropriate | Claims of validation, productivity gains, adoption success or client results |
| G6: commercial signal | Clear buyer, budget, task, deliverable and ownership rights | Paid packaging, a large platform-specific build, hiring others |

Not planned: a general AI agent, model benchmark leaderboard, automated V2 completion, scraping private accounts, collecting users' inputs, inventing ROI, paid-user login or a second generic checklist already covered by other repositories.

## How to run the remainder of this workday

Work in **successive, finished batches**, not a clock-based promise. For each batch:

1. Read current branch and last CI results; reproduce the chosen P0/P1 issue on invented inputs.
2. Add one regression test that would fail before the fix or a documented observation if no defect is found.
3. Make the smallest change that solves the issue. Keep the no-AI and incomplete-data routes valid.
4. Run relevant tests, inspect errors and actual output, and retain failed evidence.
5. Open or update one PR. Merge only within the user's authorised release process and after CI passes.
6. Check GitHub Pages and post-merge exact-commit release status; do not say "live" prematurely.
7. Update the execution log with *done / blocked / not started*, exact links and evidence. Select the next item by risk, not by excitement.

**Pause for reassessment, not more feature work,** after two consecutive failed builds without a clear cause, a privacy or approval-boundary failure, unexpected schema migration, or external work requiring user consent.

## Decision ledger and completion tracker

Statuses below are *planning statuses*, not claims of tests already run:

| Work package | Status on drafting this plan | Evidence required to close |
| --- | --- | --- |
| Baseline and historical issue audit (R01-R04) | R01 source inventory completed in dated execution log; R02-R04 pending | New dated evidence log and direct run/PR links |
| Three first-use scenarios (J01-J05) | Not started | Frozen fixtures, browser outputs, first failures |
| Most important friction fix (J06-J10) | Not started | Reproduced issue, passing regression, merged SHA |
| JSON integrity and privacy review (D01-D11) | Not started | Actual round-trips and negative tests |
| Combined review pack challenge (H01-H07) | Not started | Literal adverse evidence retained |
| Accessibility and emulation review (A01-A06) | Not started | Test matrix and manual limits |
| Release and docs refresh (R05-R08, E01, P03) | Not started | Verified main/deploy Actions and updated links |

**Next executable item: J01**, after confirming R01 baseline in the dated execution log. Return to R02 if a current run reveals a failure. Do not jump to a cosmetic improvement until the first-use cases have been checked.

## Primary source files

- [Live repository](https://github.com/shaunmarsden/practical-ai-adoption), [Actions](https://github.com/shaunmarsden/practical-ai-adoption/actions), [open issues](https://github.com/shaunmarsden/practical-ai-adoption/issues), [pull requests](https://github.com/shaunmarsden/practical-ai-adoption/pulls)
- [AGENTS.md](AGENTS.md) for contribution and IP boundaries
- [PROJECT-CONTINUITY.md](PROJECT-CONTINUITY.md) for cross-account handover
- [ROADMAP.md](ROADMAP.md) for the historical evidence-led strategy
- [EVIDENCE-STATUS.md](EVIDENCE-STATUS.md) for actual testing claims
- [Workbench technical record](tools/workbench/README.md), [checks.yml](.github/workflows/checks.yml)
- [Historical critical draft PR #74](https://github.com/shaunmarsden/practical-ai-adoption/pull/74), [historical critique PR #73](https://github.com/shaunmarsden/practical-ai-adoption/pull/73)
- [Public evidence issue #4](https://github.com/shaunmarsden/practical-ai-adoption/issues/4)
