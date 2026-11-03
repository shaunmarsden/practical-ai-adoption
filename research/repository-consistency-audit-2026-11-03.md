# Repository consistency audit - 3rd November 2026

**Scope:** Public Practical AI Adoption repository after PR #84. Reviewed the current README, roadmap, evidence matrix, contribution rules, existing adoption pathway audit, newly added guides and GitHub Actions repository-check failure. This is a documentation and automated-check audit, not a human evaluation of guidance or an independent security review.

## Concrete failure found

The GitHub Actions **Repository checks** run on merge commit `2256fed` (PR #84) [failed](https://github.com/shaunmarsden/practical-ai-adoption/actions/runs/41661630973). Its log reported **13 issues**:

- **Seven guides omitted from `EVIDENCE-STATUS.md`:** the controlled team pilot guide and six organisational guides introduced in PRs #83 and #84. They are now listed together in a separate **unscored** section, without invented evaluations.
- **Six uses of prohibited en-dash punctuation** across five files. These have been replaced with plain ASCII punctuation.

The same CI check did **not report broken relative Markdown links or mismatched evaluation totals** in that run. That is a limited automated result, **not** proof every website URL, page anchor, image or browser interaction works. Because the first CI stage failed, the later Python/browser assessment tests were skipped. The new pull request must run those checks before anyone describes the entire suite as passing.

## Navigation and overlap

The README now has three complementary entry routes:

1. A **start here** task for someone completely new to AI.
2. A **six-question adoption path** from selecting work to considering wider use.
3. Topic tables for individual use, team adoption and deeper decision worksheets.

These are alternative ways to locate material, **not** three competing methodologies. The topic tables repeat some links deliberately; each serves a different reader need.

| Related guides | Distinct question each answers | Audit decision |
| --- | --- | --- |
| First use-case selection / workflow mapping / options comparison | Which task could help? / Where is the process constrained? / Is AI preferable to non-AI options? | Keep separate but cross-link; no new selection framework |
| Human-reviewed workflow / controlled team pilot | How does one bounded task work? / How does a team plan, record and decide on a trial? | Keep separate |
| AI results measurement / capacity and realised value | Did the trial help? / Did any task gain become usable capacity or independently supported business value? | Keep separate, distinguish financial claims |
| Access versus use / stalled rollout / adoption diagnostic | Are assumptions about skill supported? / Why did adoption fade? / What should the team investigate now? | Distinct uses, with acknowledged overlap |
| Unsupervised-chain safeguards / action-and-permission mapping | Where can a linked chain go wrong? / Which exact reads, changes and sends are permitted? | Keep separate; approval is never implied |
| Pilot readiness V2 / organisational options comparison | Is an existing pilot's expansion record adequate for human review? / Which intervention, including no AI, should we select? | Different decision points; never treat either as deployment authorisation |

The biggest immediate issue was **not excess duplicated content** but a quality-control gap: the new content arrived without corresponding evidence-register entries and introduced punctuation against the repository's stated style rule. No files were merged or deleted as duplicates in this audit.

## Evidence and wording consistency

- The original set of guides has scored fictional comparisons; the seven later guides have **illustrations or templates but no scored runs**.
- The live readiness tool has had technical and adversarial checks, but its independent eight-case review pack has not been administered to an outside human reviewer.
- A draft guide, a copied worksheet and a source citation are **not evidence of observed adoption, verified savings or professional approval**.
- The old pathway audit is marked as a historical checkpoint because the navigation change it recommended has already happened.
- README, roadmap and Evidence Status now describe the expanded content without saying every guide has a scored test.

## What this audit does not cover

No private repository contents were published as part of these repairs. This review did not reverify every external source, adjudicate copyright provenance, compare every old guide line-by-line or run an independent user study. GitHub Actions provides the deterministically checked baseline; human testing of comprehension and real use is still outstanding.

## Next decision

**Do not add another content batch yet.** First get the revised repository checks green and confirm the assessment test steps ran rather than being skipped. Then the most useful evidence is a genuine independent run of the existing eight-case assessment review pack, with disagreements recorded.

Do not change scoring or weaken the checker merely to turn CI green.
