# Adversarial review: read the findings first

**[Read the review and prioritised findings](review.md).** The current tool can return READY FOR HUMAN REVIEW when a completed review explicitly records unacceptable critical failures. It should not be promoted as reliable readiness triage without targeted changes.

This folder adds evidence and test material only. The application, Python checker, decision rules, Pages settings and existing tests are unchanged. The review was performed by the same assistant that built the application. It is a fresh, reproducible adversarial analysis, not an independent external expert audit or completed user research.

## What is here

- [Judgement basis](judgement-basis.md): the decision standard set before execution and before reading PR #73's conclusions.
- [Thirty frozen fictional cases](scenarios.json) and [their SHA-256](expectations.sha256): risks, evidence, missing evidence, recommendations, reasoning, uncertainty and exact payloads.
- [Case comparison](case-comparison.md) and [full Python/browser outputs](results.json): observations kept separate from judgements.
- [Live evidence index](evidence/README.md): deployment hashes, network capture, screenshots, PDF samples and report checks.
- [Related draft desk review, PR #73](https://github.com/shaunmarsden/practical-ai-adoption/pull/73): read after freezing expectations and running the batch. This review adds case-level testing, live deployment checks and concrete report evidence rather than replacing that draft.

All cases are invented. AD-19 intentionally puts deception outside the observable payload. AD-20 explores a scope mismatch; the tool says not to expand, not that an offline experiment is forbidden. The 24 potential false-reassurance disagreements include AD-19. Only 23 contain observable adverse facts. These are not estimates of a population failure rate.

## Reproduce the analytical comparison

From the repository root, with Node 22+ and Python 3:

```bash
node tools/pilot-readiness/adversarial/run.mjs
node tools/pilot-readiness/adversarial/probes.mjs
```

The runner verifies the frozen file hash, passes only payloads to the assessors, checks Python/browser parity and records full results. It does not pass expected judgements to the assessment function. It exits normally when the observation process succeeds, even when the methodology is challenged.

To make the unresolved methodological disagreements fail explicitly:

```bash
node tools/pilot-readiness/adversarial/run.mjs --strict
```

On the reviewed implementation, **expect exit code 1**: 23 observable-risk cases still reach READY FOR HUMAN REVIEW. This is an intentional adverse result, not a broken test to make green. AD-19's hidden deception and AD-20's scope ambiguity are excluded from that strict failure count. An external reviewer should reconsider the frozen judgements independently; changing the expectations to match current output would defeat the test.

## Reproduce the live review

From the repository root:

```bash
npm ci
npx playwright install chromium
node tools/pilot-readiness/adversarial/live-review.mjs
```

This visits the actual published site. It only reads public pages and enters invented records into browser memory. It does not change Pages settings or deploy anything. It writes artefacts to ignored `work/adversarial-live/`. `REVIEW_URL` can select another site root, and `REVIEW_OUTPUT` can select another local output directory. The asset comparison deliberately fails if the live application has changed from the checkout; inspect that difference instead of assuming a deployment failure.

The live script records 30 scenario journeys at desktop size and four selected cases at mobile size, plus the built-in blocked example and content boundary probes. It captures console errors rather than hiding them. The observed favicon 404 is retained; no uncaught application exception was observed. Network assertions cover requests Playwright exposes, complemented by source inspection. Normal hosting requests, including the browser's favicon lookup, remain possible.

## Recheck the downloaded report evidence

With Python 3 and `pdfplumber` installed:

```bash
python3 tools/pilot-readiness/adversarial/check-reports.py
```

This reads the six committed PDFs downloaded from the live application, checks decisions, notes, limits and text bounds, and regenerates [report-checks.json](evidence/report-checks.json). It does not create substitute PDFs. For visual inspection, install Poppler and run, for example:

```bash
pdftoppm -scale-to 1200 -png tools/pilot-readiness/adversarial/evidence/reports/critical-review.pdf work/critical-review
```

Rerun the original suites separately. Their passing result establishes rule consistency and scripted behaviour, not the methodological suitability challenged here:

```bash
npm test
(cd tools/pilot-readiness && python3 -m unittest discover -s tests -v)
```

No new test dependency is needed for the analytical runner; Playwright is already a development dependency. PDF extraction uses optional maintainer tooling, not application runtime code. The original CI has not been changed to turn a known adverse finding into a passing suitability claim.
