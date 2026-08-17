# Pemberton Underwriters: AI Adoption Stall Review

This is a project-authored scoring rubric. It is not endorsed by Gartner, BCG, AiCore or any other organisation.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 28/30 | 30/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and evidence understanding | 5 | 5 | Both understood the situation fully. |
| Distinguishing tool-quality causes from adoption and process causes | 5 | 5 | Both explicitly rejected "get a better tool" as premature and identified the same organisational causes. |
| Handling of the accuracy complaint as a possible red herring | 5 | 5 | Both correctly compared the regular users' experience against the quitters' and reached the same conclusion: the complaint reflects how a bad draft was interpreted, not a real difference in tool quality. |
| Ownership, workflow-integration and incentive awareness | 5 | 5 | Both named the missing owner, the lack of process integration, the absence of follow-up training and the unresolved incentive question. |
| Practical, appropriately-scoped recommendation | 5 | 5 | Both gave a clear, similar action plan: name an owner, resolve the incentive question, update the process, run further training, start tracking usage. |
| Honest acknowledgement of what is not yet known | 3 | 5 | The baseline moved straight from diagnosis to a confident action plan. The guide-informed output kept a visible line between what the evidence supports and what still needs checking: the small two-against-thirteen sample, whether the specific failed claim reveals a real recurring weakness, other unstated causes, and whether the decline was sudden or gradual. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What genuinely improved

This test produced a smaller, more specific difference than the previous two. Both outputs reached the same correct diagnosis and a similar recommendation, and both resisted the leading framing of the ordinary prompt, which nudged toward blaming the tool. Neither result should be read as one being unsafe to act on. The guide-informed output improved specifically on completeness of caveats: it named the small sample size as a real limit on generalising, flagged that the specific failed claims should still be checked before fully ruling out a genuine model weakness, and raised other plausible causes the evidence does not yet confirm or rule out. The ordinary prompt's confidence was not misplaced given what it covered, but it did not pause to mark the edges of what the evidence actually proves.

## What the test does not show as clearly as it might seem to

Unlike the Calthorpe & Rees test, this one did not need a harder second attempt: the ordinary prompt already resisted the scenario's built-in pull toward blaming the tool, and the gap between the two outputs is real but modest, concentrated on one rubric area rather than spread across several. This is a more encouraging result for how AI models handle this kind of question generally, and a smaller, more honest claim for what this particular guide adds.

## What a person still has to check

- Look at the actual content of the claim or claims that were called inaccurate before ruling out a genuine, recurring model weakness.
- Treat the two-against-thirteen comparison as suggestive, not conclusive, given the small numbers involved.
- Get an explicit, written answer from management on whether AI-assisted time counts toward performance targets before assuming a training fix alone will solve adoption.
- Check whether the usage decline was sudden or gradual, since that changes whether the fix is mainly about a single incident or about sustained lack of support.
- Decide who takes ownership of the rollout before running any further training or process changes, since ownership was the first gap identified in both outputs.

## What this test supports

In this one fictional scenario, both an ordinary prompt and the guide-informed prompt reached the same correct diagnosis. The guide-informed prompt held a more honest line between supported conclusions and remaining uncertainty, which matters most when a confident-sounding recommendation is about to be acted on.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- The two outputs were generated as separate, isolated runs, but by the same underlying model family; a different model or tool might behave differently.
- It does not show a real-world case of a stalled AI rollout being diagnosed or fixed.
- It does not include an independent external user's result.

## Test integrity

Each run was generated in a fresh, isolated context with no visibility into the other run, the rubric, the automatic-failure criteria or the expected reasoning. Neither runner was told this was a test or comparison. The evaluator received both completed outputs and the answer key only after both runs were finished. No revision or regression run was needed, since the first attempt produced a genuine, non-zero difference without an automatic failure on either side. A contamination risk remains because the same person designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real stalled rollout when one naturally arises, or log feedback if an outside user tries it.
