# Quality and product development sprint - 6 November 2026

This is an assistant-led repository inspection, software stress test and document walkthrough. It is not a study with real readers, an independent review or evidence of workplace outcomes. All new assessment inputs are invented. No historical guide scores, evaluation results, old development fixtures or PR #74 records were changed.

Baseline: main commit `d3aeecde2a9556a74903d37e7e2773fefcd60db3`. The October production smoke test is historical evidence; this sprint tests local branches and does not publish changes or certify the current live deployment.

## Baseline

| Check | Actual result | Limit |
| --- | --- | --- |
| Repository checks | Passed, 73 tracked Markdown files | Links, prohibited punctuation, arithmetic, evidence coverage and reachability; not factual or usability validation |
| `npm test` | 23 tests passed | Eight retained V1 tests, including all 59,049 response combinations, and 15 V2 tests |
| Python unit tests from `tools/pilot-readiness` | Eight passed | Retained V1 assertions; V2 parity is checked separately |
| Existing V2 browser suite | 92 fixture journeys passed at desktop and mobile sizes, plus export, migration, privacy and keyboard checks | Chromium; not physical devices or assistive technology |
| Existing PDF checker | 13 actual downloads passed text and bounds checks | Extraction alone does not establish readable layout |
| V2 comparison | Regenerated identically in an ignored scratch copy | Did not run the writer against historical tracked results |
| Additional link inspection | No broken local file links or Markdown fragments; 42 of 44 linked public URLs returned successful responses | Two 403 responses remain unverified, not proven broken |

An initial Python test invocation from the repository root failed to find `pilot_readiness_v1`. Repeating the documented command from `tools/pilot-readiness` passed all eight tests. That invocation error is not counted as a product defect.

[Public-link observations](quality-sprint-2026-11-06-links.json) retain URLs, response status and originating files. The two unverified resources are the Andrew Ng Medium playbook article and OpenAI's identifying/scaling-use-cases guide. Access restrictions cannot establish whether their content has disappeared. This pass checked availability, not the accuracy or currency of every cited claim.

## Confirmed defects

Severity here is a triage judgement: P2 means a functional data/evidence-preservation failure worth fixing before relying on that path; P3 means a documentation or cosmetic defect. It is not an estimate of real-world incident frequency. No P0 or P1 failure was established.

| ID | Severity | Reproduction and observed failure | Repair |
| --- | --- | --- | --- |
| D01 | P2 | Import SQ19/SQ20 and export without editing. CRLF/CR notes become LF; single-line references lose line breaks and concatenate text. | Preserve imported strings until their field is edited. |
| D02 | P2 | Import a valid 999,900-byte migrated draft, save it, then reimport the downloaded file. Indentation produces 1,000,884 bytes and the app rejects its own export. | Keep readable formatting where it fits; use compact JSON near the unchanged size limit. |
| D03 | P2 | Download SQ23's PDF. Its baseline note ends at the tab, losing `with tab.`. Extraction and rendered page 3 agree. | Render tabs as four spaces; retain exact tabs in JSON. |
| D04 | P3 | Follow the main README to the tool README. The first says V2 was deployed; the second says the public link still serves V1. | Correct the current tool README and explain that the old validation record is a dated development checkpoint. |
| D05 | P3 | Read the roadmap's claim that repeat runs rule out chance differences. Three runs give observed ranges, not that guarantee. | Weaken the current summary without changing any historical score or result. |
| D06 | P3 | Homepage footer claims a static page cannot reach a model without a backend. That general claim is not established by this implementation. | Describe this page's actual absence of AI requests/backend. |
| D07 | P3 | Open the homepage in a fresh browser. Its implicit `/favicon.ico` request returns 404. | Reuse the existing local assessment icon explicitly. |

[Draft PR #87](https://github.com/shaunmarsden/practical-ai-adoption/pull/87) contains D01-D03 and their regression coverage. Its [test record](https://github.com/shaunmarsden/practical-ai-adoption/blob/fix/pilot-import-text-preservation/tools/pilot-readiness/sprint-2026-11/README.md) gives commands, frozen inputs, first failures and repaired results. The documentation/navigation branch handles D04-D07 and the reader links below. No criterion or decision ordering was changed to improve scores.

## Fresh adversarial findings

Twenty-four Larch Quay inputs and separate predictions were frozen before first execution. Their payloads were invented from scratch, rather than transformed from development examples. The engines receive the records without the expected decisions. This is still assistant-authored testing, not blind or independent human judgement.

- SQ01: a supported bounded record reaches the complete-record category, with a human decision still required.
- SQ02-SQ08: permission gaps/refusal, unfinished review, competing claims, a material incident, a changed model and failed end-to-end benefit produce further assessment or withheld expansion as appropriate.
- SQ10-SQ13: genuinely permitted offline learning remains possible, while missing permission or effects on a person cannot use that route. Missing production-only training does not itself ban offline learning.
- SQ14-SQ15: missing version context and a whitespace-only reference cannot complete an operational record.
- SQ09 and SQ17-SQ24: literal markup stays inert; invalid versions/dates/types are rejected; valid Unicode, line endings, tabs and long references exercise exports. SQ19/SQ20/SQ23 exposed the failures above.
- **SQ16 remains a negative control:** false structured Yes/no-issue claims with adverse prose still reach COMPLETE RECORD - HUMAN DECISION REQUIRED. Both engines agree. This is the known self-report information limit, not a successful safety outcome or evidence that the prose was understood.
- A separately generated near-limit migration exposed D02. Its expectation was that the app must be able to reimport its own supported export, not that its size limit should be weakened.

All 24 model cases had full Python/JavaScript output parity and matched their frozen predictions. After repairs, 48 browser case journeys passed: 40 valid exact-JSON/decision checks and eight invalid-input rejections across 1440 x 900 and 320 x 900. Additional checks covered malformed and oversized files retaining current answers, explicit field edits, actual near-limit reimport, ten labelled question panels, heading focus, keyboard radio operation and no horizontal overflow. The engines were not changed.

Fourteen fresh PDF downloads and 13 retained-suite downloads passed full note/reference/issue/decision and page-bound checks. Representative issue-summary, long-reference and Unicode/tab pages were rendered and visually inspected. The repaired tab suffix is visible. PDF output remains untagged; HTML and JSON remain the text alternatives.

Failed attempts were retained. Rapid repeated downloads initially stopped the automated browser after ten downloads from one document; the markup case passed alone. Fresh-page groups allowed the full suite to complete. This is reported as a test-environment constraint, not quietly counted as a first-run pass or fixed by weakening the case.

The tested assessment requests were static same-origin GETs with no answer-bearing URL or body. No external AI/analytics requests occurred, and application localStorage/sessionStorage/cookies were empty. This does not cover browser extensions or host access logs.

## Five reader journeys

These are reproducible document walkthroughs, not observed users. They assess whether a named next action and supporting material exist. They do not measure comprehension, completion time or satisfaction.

| Reader and route | Enough support to take the next action? | Struggle found and action |
| --- | --- | --- |
| Employee: README Start here -> ordinary-task guide -> one prompt -> source check | Yes. An approved tool, low-risk task, three copyable starters and a check are explicit. Fictional failures and ties remain visible. | No new introductory course needed. The live quiz homepage did not point directly to the existing adoption reading route; add one link. |
| Manager choosing work: first-use-case guide -> shortlist -> comparison with non-AI options | Yes for a first shortlist. Workflow mapping and alternatives comparison add depth without being the same guide. | The selection page ended at its example and sources, without a link to planning the trial. Add direct individual-workflow and team-pilot links. |
| Team preparing a pilot: controlled-pilot guide -> boundary, permissions, roles, baseline, sample and stop conditions -> copyable record | Yes for planning a bounded, authorised comparison. The fictional illustration is labelled unscored. | The older individual-workflow page lacked the forward link to this newer team guide. Add it rather than duplicate the pilot record. Actual organisational approvals remain outside the repository. |
| Person measuring results: whole-task measurement guide -> baseline, full effort, quality, case selection and confounds | Yes for forming a comparison and identifying evidence gaps. Capacity/value guide handles the different financial question. | The older measurement page did not point to the newer value guide or separate expansion review. Add both, with no implied pass or ROI. |
| Expansion decision-maker: README -> assessment -> scope/issues -> ten conditions -> PDF -> responsible reviewer | Software supports a record and visible next actions. Explicit material issues withhold expansion. | Untrue structured answers can still mislead; software repairs do not solve that. Independent judgement, source inspection and permission stay necessary. Existing independent-review pack is prepared, not administered. |

## Duplication and interactive-pathway decision

The README's task-first route, question table and topic tables are alternative entry points. Their repeated links do not establish duplicate guidance. Selection, workflow mapping and non-AI comparison answer different questions. Whole-task measurement and realised value should stay distinct. Data permission and human control recur because they apply throughout, not because another safety framework is needed.

**Do not implement another interactive adoption pathway in this sprint.** The repository already has the reading map and copyable records. The reproduced navigation gaps are missing forward links, not evidence that readers need saved profiles, a wizard or another assessment. One homepage link to the existing map and short guide-to-guide links solve the demonstrated route breaks without a new product or state to maintain. A real reader study could change that decision.

## Changes and validation boundaries

Two separate branches are proposed: export repairs/regression coverage in PR #87, and current-status/navigation repairs with this audit. Neither is merged or deployed by this sprint. The original evidence matrix, evaluation files, archived results and independent-review pack remain unchanged. No private knowledge-base content, employer material, accounts, paid APIs, telemetry or automatic external actions were introduced.

The retained 23 Node tests, eight Python tests and 92 existing browser journeys were rerun for the export repairs. The 24 fresh parity cases, 48 fresh browser journeys, generated size boundary and 27 PDF checks passed. The documentation branch reruns repository checks, verifies all new link targets, completes/restarts all nine homepage claims at desktop and narrow mobile widths, checks its icon and confirms its quiz script is unchanged. It does not claim those branch-local repairs have reached production. The export-repair branch also passed [GitHub Actions run 42265564058](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/42265564058). Draft PR checks provide remote evidence separately from local runs.

## Outstanding weaknesses and three approval decisions

1. **Authorise an independent human review and comprehension session.** Use the existing review pack, obtain consent and preserve disagreements before showing tool decisions. Include whether a non-technical manager understands that complete-record status is not approval. No reviewer has been recruited or contacted by this sprint.
2. **Authorise one suitable real, low-risk guide application when it naturally arises.** Agree the task, permitted tool/data, baseline, reviewer and what can be published first. Record whole-process effort and failures; do not manufacture commercial savings or a task merely to fill the evidence matrix.
3. **Authorise targeted accessibility evaluation with assistive technology.** Test a screen-reader and keyboard journey, zoom and physical mobile browser, plus whether tagged PDF output is needed. Current labels, focus checks, reflow tests and plain-text alternatives do not settle access for those users. Choose any PDF/dependency change only after that evidence.

No extra framework, semantic AI verifier or interactive pathway is proposed for approval ahead of those needs. False claims, untagged PDFs, two access-restricted links, unobserved reader comprehension and the absence of real-use evidence remain explicit limitations.
