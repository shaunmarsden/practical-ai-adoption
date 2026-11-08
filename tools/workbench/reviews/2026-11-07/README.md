# AI review of the workbench's approval boundary

**Result:** Two fresh AI reviewer contexts found no actionable defect that made the workbench confer approval in the cases they examined. I made no application changes. This does not establish that a person could not mistake a completed record for approval.

The review ran on 7 November 2026 against a frozen copy of merged main at [`e78ed2f`](https://github.com/shaunmarsden/practical-ai-adoption/commit/e78ed2ff9b08a9982ca07306f4f36ef572c7cb8c). Start with the findings table below, then inspect the original reports and outputs before drawing a stronger conclusion.

## What was separate, and what was not

Each reviewer began in a fresh context without the implementation conversation. Each initially read only the frozen contribution rules and four workbench source files. Earlier tests, review findings, usability packs and facilitator keys were withheld. Neither received the other reviewer's findings before recording their initial judgement. The shared review question was whether a completed record could be mistaken for approval.

Each wrote fictional facts and expected safe interpretations before executing the challenges. The original expectations, first generated outputs and initial findings are retained here. These were separate AI contexts within the same development environment, not independent external human reviewers, a blinded human study or third-party validation. The coordinating implementation context selected and synthesised the evidence for this report.

## Findings and observations

| Area | Observed result | What it supports |
| --- | --- | --- |
| Reaching the last step with blank notes | No approval/completion badge appears. Defaults remain Not reviewed and No human decision recorded. | Navigation and export do not themselves supply a positive decision. |
| Manual complete V2 and continuation choices without authority | Choices remain self-reported; missing permission, authority, date and report reference remain missing. | These particular unsupported claims were not presented as checked approval. |
| A filled fictional record claiming savings and real customer sending | The export retains the fictional basis, practice-only permission, restrictions and contradictory next action. | Filled fields do not trigger evidence verification, benefit calculation or wider authority. |
| Withheld expansion alongside an optimistic continuation note | The unresolved issue and WITHHOLD EXPANSION stay ahead of the positive human note. | The notebook does not compute a new result that overrides the recorded withholding. |
| Mobile outcome labels | At 320 CSS pixels, full HUMAN DECISION REQUIRED and authorised-boundary wording remains readable below cropped native selects. | The qualifier is available in this Chromium viewport; comprehension was not measured. |
| Actual browser download | Reviewer B's manually completed-looking case matches `recordText` byte for byte using its actual export timestamp. | One browser export retained the expected record content. |

The interface reviewer examined blank navigation/export, one contradictory fictional record and that record's mobile presentation. These are three challenge conditions, including reuse on mobile, not three independent trials. The record reviewer generated four fictional export challenges and checked one of them through an actual browser download. There is overlap in themes; these counts should not be added into a claimed population safety score.

The [interface report](interface-findings.txt) and [record report](record-findings.txt) contain the full initial judgements, source references, reproductions, protective wording and limits. The reports agree on no required fix; Reviewer A describes one optional P3 presentation opportunity, while Reviewer B leaves its severity unestablished. Those distinctions are preserved.

## Optional suggestion, not implemented

The opening summary repeats V2 and human-decision selections. Evidence basis, permission details, authority, date and report references appear later in the full record. Reviewer A suggested bringing some of those details into the opening block. Reviewer B also noted selective reading as a possible risk.

The position of these fields is observable. A reader overlooking them, and a proposed layout change improving understanding, remain hypotheses. Both reviewers noted strong existing caveats and did not require a fix. I retained the suggestion without adding warnings, mandatory fields, a semantic checker or another assessment. The review provides no basis to claim that the optional change is necessary or that it would improve comprehension.

## Retained evidence

| Evidence | Files |
| --- | --- |
| Expectations written before execution | [Interface expectations](interface-expectations.txt), [record expectations](record-expectations.txt) |
| Interface observations and original browser script | [Observations](interface/observations.json), [script](interface/review.cjs) |
| First interface outputs | [Blank preview](interface/blank-preview.txt), [blank export](interface/blank-export.txt), [contradictory export](interface/contradictory-export.txt) |
| Narrow-screen screenshots | [V2 selection](interface/mobile-v2.png), [human decision](interface/mobile-decision.png) |
| Four record inputs and original generator | [Inputs](record/inputs.json), [generator](record/challenges.mjs), [first output statistics](record/first-output-statistics.json) |
| First generated record outputs | [Empty](record/c1-empty.txt), [manual complete](record/c2-manual-complete.txt), [fictional overclaim](record/c3-fictional-overclaim.txt), [withholding conflict](record/c4-withhold-conflict.txt) |
| Actual record-review browser check | [Script](record/browser-export.mjs), [preview](record/c2-browser-first-preview.txt), [download](record/c2-browser-first-download.txt), [result](record/browser-first-result.json) |
| Environment failure and successful retry | [Initial launch failure excerpts](record/browser-first-launch-failure.txt), [successful retry log](record/browser-second-attempt.log) |
| Publication integrity | [SHA-256 manifest](evidence.sha256) for the copied original evidence |

The evidence files were copied byte for byte from the original review workspace. The manifest was made when preparing this documentation; it is not a pre-execution timestamp or proof of blinding. Original relative paths and source line references in the reports refer to the frozen review workspace. Its `baseline/docs/workbench/` corresponds to `docs/workbench/` at the linked commit; its `interface/` and `record/` folders are retained here under those names.

Both reviewers' initial sandboxed Chromium launches failed with a macOS permission error before page execution. The same bounded checks then succeeded with reviewed execution permission. Reviewer A records that failure in the findings; Reviewer B retains error excerpts separately. These are environment failures, not workbench failures. No challenge expectation or weak observation was rewritten to improve the result.

The coordinating context also ran the existing baseline checks: repository checks across 76 Markdown files, 28 Node tests, 24 sprint model cases and three workbench browser journeys with 18 axe scans. Those passing software checks are separate from the fresh reviewer judgements and do not establish decision quality.

## Inspect or replay without overwriting evidence

The original scripts write outputs next to themselves. Do not run them in this archive. To replay their software observations, copy `interface/` and `record/` into a new ignored folder such as `work/workbench-review-replay/`, recreate the frozen `baseline/` there, and keep new outputs separate:

```sh
mkdir -p work/workbench-review-replay/baseline
cp -R tools/workbench/reviews/2026-11-07/interface work/workbench-review-replay/
cp -R tools/workbench/reviews/2026-11-07/record work/workbench-review-replay/
git archive e78ed2ff9b08a9982ca07306f4f36ef572c7cb8c docs | tar -x -C work/workbench-review-replay/baseline
python3 -m http.server 8768 --bind 127.0.0.1 --directory work/workbench-review-replay/baseline/docs
```

With the repository's documented Playwright prerequisites installed, run the copied scripts in another terminal:

```sh
node work/workbench-review-replay/interface/review.cjs
node work/workbench-review-replay/record/challenges.mjs
node work/workbench-review-replay/record/browser-export.mjs
```

Use a free port or adjust the copied browser scripts if 8768 is in use. The generator overwrites only the copied first outputs in this scratch layout. New browser timestamps will differ. Replaying the scripts can reproduce software observations; it cannot reproduce fresh-context independence or provide human understanding evidence. No new replay is implied by publishing this archive.

## Limits and decision

No human comprehension, real workplace use, actual authority or financial benefit was tested. No actual V2 assessment was run by these reviewers; they examined the notebook's manual recording of V2 outcomes. The mobile review used Chromium viewport emulation, not a physical phone or assistive technology. There is no measured misunderstanding rate or claim of complete accessibility conformance.

An author can still enter false or contradictory notes. The notebook does not verify truth, authority, reference quality or prose consistency. The absence of a demonstrated defect in this small review is not proof of safety, approval or readiness for a real workflow.

No application fix was justified by this review. The optional presentation idea remains available if later evidence supports it. Human-review and real-use gaps remain openly recorded; recruiting participants is not a prerequisite for continued development. Unsolicited GitHub feedback can inform later work. No one was recruited or contacted, and no real employer or customer data was used.
