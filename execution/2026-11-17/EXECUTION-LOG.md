# Execution log: 17th November 2026

**Scope:** public Practical AI Adoption repository. This file records observed source and test state, not a promise of future work, independent validation or customer use.

## Baseline check (R01)

**Completed by:** direct GitHub repository and Actions inspection while drafting the execution roadmap.

- `main` at **`b5e811623925eb590c771f6dc18f1c6618ff6f32`**.
- [Latest post-merge check](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/44064892911): **success**, commit `b5e81162`.
- [Matching GitHub Pages build/deploy](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/44064892271): **success**, same commit.
- [Earlier failed post-merge check](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/44062922928): **failure**, commit `b65cdd27`. Pages for that commit separately succeeded. The root cause is **not verified**; a later success must not erase the earlier failure.
- Open draft [PR #73](https://github.com/shaunmarsden/practical-ai-adoption/pull/73) is a desk methodology critique, not outside validation.
- Open draft [PR #74](https://github.com/shaunmarsden/practical-ai-adoption/pull/74) preserves 30 frozen adversarial V2 cases, 24 potential false-reassurance disagreements and deliberate failing suitability checks in its historical branch. This is a reported finding from the original draft, **not a rerun against today's V2**.
- Open [issue #4](https://github.com/shaunmarsden/practical-ai-adoption/issues/4) requests real or outside use of an existing guide; no such use is established by checking the issue.

## Research review

Read live `AGENTS.md`, `ROADMAP.md`, `PROJECT-CONTINUITY.md`, `README.md`, `EVIDENCE-STATUS.md`, `tools/workbench/README.md`, `checks.yml`, the pathway coverage audit and current PR/issue metadata. Consulted public GOV.UK Design System, W3C WCAG 2.2, Playwright and OWASP guidance. See the [full roadmap](../../EXECUTION-ROADMAP-2026-11-17.md) for links and their limits.

## Work status at this checkpoint

| Package | Status | Next evidence |
| --- | --- | --- |
| R01 main/release/pr/issue audit | **Done** | Exact run IDs and SHA recorded above |
| R02 recurring release failure diagnosis | **Open, not reproduced against current main** | New failure log if it recurs; do not invent a root cause |
| R03 exact-commit asset verification | **Earlier release succeeded; not separately rerun today** | Fresh release invocation if application changes |
| R04 historical PR #73/#74 reconciliation | **Pending** | Source-by-source comparison to current V2 |
| J01 non-AI/no-trial fictional journey | **Not started** | Frozen input, browser path, export and first result |
| J02 failed-trial fictional journey | **Not started** | Frozen contradictory evidence and observations |
| J03 abandoned/partial save-reopen journey | **Not started** | Actual file round trips and warnings |
| All other roadmap items | **Not started under this plan** | Execute selectively by severity and evidence |

## Next work package

**J01:** run and record a complete invented non-AI route through the current Workbench. Use the existing community-club example, do not invent measured results or authorisation, and verify the resulting record and complete review pack. The first outcome could be a pass, a reproduced defect, or a documented limitation. Do not preselect the outcome.

A separate user study, a production trial and a commercial deployment are **not** part of this check.

## Editing this log

Append dated observations. Never replace the first failure with a later pass. For each subsequent batch add: task ID, expected behaviour, frozen fictional input reference, exact repo commit, actual command/CI run, observed output, severity, PR, decision, deployment, remaining risk.

## J01 browser validation and R02 follow-up (17th November 2026)

**PR:** [#118](https://github.com/shaunmarsden/practical-ai-adoption/pull/118), draft, unmerged. The original fictional community-club example remains the frozen J01 input; it is not evidence of actual club use or observed human comprehension.

**What the J01 browser test checks:** at 1440, 390 and 320 CSS pixels, load the fictional example, save and inspect actual draft JSON bytes, inspect the downloaded text decision record, visit the human decision section, and preview and download the complete review pack. Assertions retain the no-AI/no-trial route, unknown change authority, absence of measured benefits, blank decision-maker/date, no human decision, and five unrun challenge observations. This adds test coverage; it changes no application code or user data formats.

**First run:** [Repository checks #201](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/44120567323), commit `d44b980d0ffec51c1f5f8d5aa1522addc978ab75`, **failed**. The newly added J01 test had an incorrectly escaped newline in its own assertion; source output retained the expected unknown-authority wording. Separately, `test-results-browser.mjs` checked an asynchronous invalid-file status too early and observed `Reading local test results...` rather than the eventual error state. These are first observed browser-test failures, not verified application faults. CI retained the failed logs and artefacts.

**Repair:** Changed the J01 assertions to check the intended contents and wait for the asynchronous results-import status before asserting. No application source changed. Latest test commit `b1e474c7e183ca46f16379271be4c26acc4873b6`.

**Rerun:** [Repository checks #202](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/44121315059), **success**. The test-checkout release verifier reported 22 served assets matched its test merge commit `d295500b24fd4a1859a154f1dc26873c2cd09862` before and after its browser journeys; its navigation, download, cross-browser and local PDF checks passed. This is PR CI and local preview evidence, not exact deployed GitHub Pages verification, production operation, independent user observation or a fresh physical-phone test.

**Remaining:** Keep PR #118 for review and separate merge authorisation. The post-merge `main` Actions, Pages and exact public deployed-asset status for earlier merge `e3208088996d430f5ff059154c5e7404400a6c2e` have not been independently verified through the available connected GitHub run lookup, which filters for PR-triggered runs. R03 remains outstanding. J02 and J03 have not been executed under this roadmap.
