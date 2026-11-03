# AI adoption pathway: coverage and gaps audit

**Reviewed:** 2nd November 2026. **Status:** repository navigation and evidence audit, not a validated adoption framework or a proposal to build six new products.

## Decision

**Improve navigation first.** Most practical topics already have a guide. The largest immediate obstacle is that the homepage organises them into "your own work" and "safety and team decisions", without showing the steps a reader can follow from their first task to a team decision. The second gap is evidence, not more guidance: no current guide has logged real-world use of that guide or outside scoring.

This six-part pathway is an **editorial map**, not a fixed process everyone must complete in order. Decisions on data permission and harmful consequences must be made before a trial, not postponed until the end.

| Reader's question | Existing content to reuse | Coverage | Remaining issue |
| --- | --- | --- | --- |
| **1. What is AI useful for, and where does it fail?** | [Start with an ordinary task](../guides/you-have-been-given-ai-at-work.md); [Prompting fundamentals](../guides/prompting-fundamentals.md); [When not to use AI](../guides/when-not-to-use-ai.md); [Andrew Ng reference notes](../research/andrew-ng-ai-adoption-resources.md) | **Good for practical first use** | No need to reproduce a technical AI course; make the existing starting point more visible. |
| **2. Which workflow is worth trying?** | [Find a first use case](../guides/finding-a-good-first-ai-use-case.md); [From a prompt to a workflow](../guides/from-a-prompt-to-a-useful-workflow.md); [Data safety](../guides/before-you-put-work-data-into-ai.md) | **Good** | A reader can still confuse a task suited to an AI draft with a system action that needs separate permission. Keep the distinction prominent. |
| **3. How can I run a controlled trial?** | [Prompt-to-workflow guide](../guides/from-a-prompt-to-a-useful-workflow.md); [Data safety](../guides/before-you-put-work-data-into-ai.md); [Unsupervised-tool safeguards](../guides/before-you-let-ai-tools-work-together-unsupervised.md); [Pilot Readiness V2 methodology](../tools/pilot-readiness/v2/METHODOLOGY.md) | **Partial for team pilots; good for low-risk individual trials** | Materials are distributed across guides. A linked route should distinguish offline exercises, bounded internal pilots and operational rollout. No new checklist yet. |
| **4. Did it improve the whole job?** | [How to tell whether AI helped](../guides/how-to-tell-whether-ai-actually-helped.md); [Business-model measurement reading note](../research/measuring-ai-adoption-business-model-references.md) | **Good conceptual coverage** | Only fictional scored comparisons. No recorded use of this guide on a real permitted task, and no outside scorer. |
| **5. Is wider use justified?** | [Pilot Readiness Assessment V2](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/); [Methodology](../tools/pilot-readiness/v2/METHODOLOGY.md); [V1-to-V2 case study](../case-studies/ai-pilot-readiness-assessment.md); [independent evaluation pack](../evaluations/pilot-readiness-independent-review/README.md) | **Working decision aid, not validated method** | The review pack is prepared, not carried out. Self-reported evidence can be untrue; a completed record is not approval. |
| **6. Will people use and maintain it?** | [Access versus actual use](../guides/the-gap-between-ai-access-and-actual-use.md); [Why projects stall after the demo](../guides/why-ai-projects-stall-after-the-demo-works.md); [Andrew Ng organisational guidance](../research/andrew-ng-ai-adoption-resources.md) | **Good diagnosis, lighter on day-to-day implementation** | There is no observed real-world application of these guides. A new training or operating-model document would be premature until an actual reader shows what is missing. |

*Note: Stages 3-6 overlap deliberately. Permission, ownership and human checks are conditions throughout, not separate boxes to tick just before wider deployment.*

## Overlap worth keeping, not duplicating

- [First use-case selection](../guides/finding-a-good-first-ai-use-case.md) asks **what to try**; [workflow design](../guides/from-a-prompt-to-a-useful-workflow.md) asks **how the task will run with source and review steps**. Keep both, with links, rather than merge them.
- [How to tell whether AI helped](../guides/how-to-tell-whether-ai-actually-helped.md) examines **results of an experiment**; [Pilot Readiness V2](../tools/pilot-readiness/v2/METHODOLOGY.md) assesses **reported operational conditions**. These answer different questions and should not share an implied pass score.
- [Access and actual use](../guides/the-gap-between-ai-access-and-actual-use.md) challenges assumptions **before planning**; [stalled projects](../guides/why-ai-projects-stall-after-the-demo-works.md) investigates **why use did not last**. They complement each other.
- [Data safety](../guides/before-you-put-work-data-into-ai.md), [When not to use AI](../guides/when-not-to-use-ai.md) and [unsupervised workflows](../guides/before-you-let-ai-tools-work-together-unsupervised.md) overlap on safeguards but address different decision boundaries. Do not collapse them into generic advice.

## Research contribution and its limits

The [OpenAI, Anthropic and Google index](../research/official-ai-adoption-resources.md) supplies vendor implementation perspectives, the [Andrew Ng index](../research/andrew-ng-ai-adoption-resources.md) adds historical project/team/training ideas, and [AI Business Models](../research/measuring-ai-adoption-business-model-references.md) raises useful questions about adoption and outcome metrics. These publications were produced for different audiences and are not independent validation of our guidance. Andrew Ng's different slide sets and playbook editions should not be counted as multiple corroborating studies.

## Priority and next action

1. **Now: one navigation change.** Add the six-part pathway to README using existing links, while retaining the direct "start here" option. This does not claim an original methodology has been tested.
2. **Next evidence: outside review.** Use the already prepared [eight-case independent review pack](../evaluations/pilot-readiness-independent-review/README.md). An outside reviewer should see cases before V2 decisions; no review has taken place yet.
3. **Then: one logged low-risk application.** When suitable and permissible, try one existing guide on real, non-sensitive work and record the full process and failure points. Do not invent usage because it would strengthen the portfolio.
4. **Only after evidence: targeted content fixes.** If a user cannot move from choosing a task to a safe trial, or cannot tell the difference between evidence and approval, fix that boundary. Otherwise **do not add a new framework or application**.

## Evidence constraint

The [Evidence Status](../EVIDENCE-STATUS.md) records fictional before/after guide tests, including ties, weak single-run comparisons and no outside scorer or actual use of the present guides. The live V2 assessment had a successful production smoke test, but the software tests do not establish that real managers find the method accurate or understandable. This audit was performed by comparing repository documents; it is **not** an independent external study.
