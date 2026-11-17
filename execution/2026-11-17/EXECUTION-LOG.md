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
