# Project continuity and next development cycle

This document lets a new maintainer, coding assistant or future ChatGPT conversation continue **Practical AI Adoption** without relying on the original chat history. It contains public project facts and decisions only. It is not evidence of customer use, income, external validation or personal account ownership.

## Start here

- Source repository: https://github.com/shaunmarsden/practical-ai-adoption
- Public website: https://shaunmarsden.github.io/practical-ai-adoption/
- AI Adoption Workbench: https://shaunmarsden.github.io/practical-ai-adoption/workbench/
- Pilot Readiness Assessment V2: https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/
- Contribution and IP boundaries: [AGENTS.md](AGENTS.md)
- Product and technical limits: [tools/workbench/README.md](tools/workbench/README.md), [EVIDENCE-STATUS.md](EVIDENCE-STATUS.md)
- Current feature work and tests: [GitHub pull requests](https://github.com/shaunmarsden/practical-ai-adoption/pulls), [GitHub Actions](https://github.com/shaunmarsden/practical-ai-adoption/actions)

The first action in any new session is to **read AGENTS.md, this file and the current open PRs, then verify the latest main commit and Actions results**. This document is a handover, not a substitute for checking current GitHub state.

## What exists

This is a public, plain-English collection of practical workplace AI guides and a small static website. The Workbench is a six-stage, client-side notebook for describing a task, comparing AI and non-AI alternatives, planning a bounded trial where appropriate, recording results, reviewing readiness separately and recording an actual human decision. It supports saving and reopening local JSON drafts and exporting text decision records. Unsaved-note protection is best effort; no autosave, account, server-side user-data store, paid AI API or automatic real-world action is part of the Workbench. The Pilot Readiness Assessment V2 is a **separate** self-reported assessment, not automatic approval.

The repository retains adversarial fictional tests, browser checks, dated release observations, failures and stated evidence limits. Do not turn these into claims of observed customer benefit, human comprehension, independent validation or proof of safety. Consult EVIDENCE-STATUS.md and the dated test reports for precise findings.

## How work should proceed

1. Make decisions from the **live repository**, not a stale chat summary. Check the status and overlap of old PRs before creating another.
2. Prefer one substantial, bounded development batch with a useful result over many cosmetic or documentation-only PRs. Write acceptance criteria before implementation.
3. Use genuine fictional scenarios, test failure modes, keep actual first failures and repeat checks after fixes. Do not erase or retrospectively strengthen evidence.
4. Keep all real external actions and releases subject to the maintainer's approval. Do not merge or deploy a new PR without permission.
5. Preserve the independent project boundary. Never copy employment, employer, client, prospect, learner or proprietary training materials into this repository or a public AI tool.
6. Treat volunteers' public comments as **reported feedback**, not formal usability validation. Do not require the maintainer to recruit test participants; the public Workbench already links to GitHub Discussions. Do not invent private-feedback links or claims.
7. Stay practical: test with real browser interactions and accessible controls, keep the tool usable without paid services, and do not build a new framework without a demonstrated need.

## Prioritised next cycle

**A. Product usefulness and first-run clarity.** Review the complete path taken by a person arriving at the public website: can they find the correct first task, start the Workbench with a fictional example, choose the no-AI/no-trial route, save a draft, resume it and produce a readable decision record? Identify genuine friction in the application and fix it with browser regression tests. Do not claim these tests represent actual users.

**B. Feedback without outreach.** Keep the existing public GitHub Discussions invitation prominent. A dedicated private feedback form would be useful, but **no form URL has been verified for this repository**. Only add a private link after a form actually exists, with a clear notice about what it collects. Do not reuse a form belonging to a different repository.

**C. Release confidence.** Preserve cross-browser Chrome, Firefox and Playwright WebKit checks; test save/reopen, unsaved-note warnings, export integrity, mobile/reflow/accessibility and the deployed files. Record limitations including native browser differences and the lack of physical-device or real-user testing.

**D. Clean the backlog.** Review the two older draft PRs #73 and #74 about historical Pilot Readiness methodology. Determine whether their findings are already implemented or documented in V2. Close obsolete duplicates with reasons; carry forward only concrete unresolved defects. Do not rewrite or erase historical review findings.

This ordering is a working recommendation, not a release promise. Re-check it when priorities or evidence change.

## Reproducible development

The site lives in `docs/`. Use the current `package.json` scripts rather than inventing commands. On a compatible Node/Python setup:

```sh
git clone https://github.com/shaunmarsden/practical-ai-adoption.git
cd practical-ai-adoption
npm ci
python3 .github/scripts/repo_checks.py
npm test
npm run test:compare
```

Some browser tests need Playwright browsers and a local HTTP server; see [tools/workbench/README.md](tools/workbench/README.md) and [GitHub Actions workflow](.github/workflows/checks.yml) for exact instructions. Do not assume passing unit tests proves a release.

## Portability and backup

GitHub keeps the public repository and its tracked history independently of a ChatGPT conversation. To retain a local source snapshot, use GitHub **Code > Download ZIP** or clone the repository. A ZIP does not preserve the full Git commit history, pull-request discussion, issue history, GitHub Actions artefacts or service credentials; a clone preserves Git history but not all GitHub-hosted discussion records. Check access to GitHub, Pages/domain settings and any separate services using accounts that you personally control and are authorised to use.

This public file intentionally contains **no** account credentials, private chat exports, workplace context or secrets. Keep any personal continuity notes and ChatGPT data exports in a private personal location, subject to employment and data-handling rules.

## Prompt for a fresh coding assistant or new ChatGPT account

> Continue development of https://github.com/shaunmarsden/practical-ai-adoption. Read AGENTS.md and PROJECT-CONTINUITY.md first, then inspect main, current open PRs, Actions, README, ROADMAP, EVIDENCE-STATUS and the Workbench documentation. Identify the shortest credible path to a useful improvement in first-run workflow and decision-record quality. Use invented data only, preserve evidence boundaries, run existing regression/browser tests, prepare a reviewable PR and do not merge or claim deployment without approval. Give a concise report of what changed, actual results, failed checks and remaining risks. Do not assume anything about private conversations or employer records.
