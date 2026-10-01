# Pemberton Underwriters: AI Adoption Stall Review

This is a project-authored scoring rubric, not one endorsed by Gartner, BCG, AiCore or any other organisation.

I gave an ordinary prompt and a guide-informed prompt the same fictional stalled rollout and scored both answers. The [worked example](../examples/pemberton-underwriters-ai-adoption-stall-example.md) has both prompts and both outputs. The guide is [Why AI Projects Stall After the Demo Works](../guides/why-ai-projects-stall-after-the-demo-works.md).

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 28/30 | 30/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and evidence understanding | 5 | 5 | Both understood the situation fully. |
| Distinguishing tool-quality causes from adoption and process causes | 5 | 5 | Both rejected "get a better tool" as premature and named the same organisational causes. |
| Handling of the accuracy complaint as a possible red herring | 5 | 5 | Both compared the regular users' experience with the quitters' and reached the same conclusion: the complaint reflects how people read one bad draft, not a real difference in tool quality. |
| Ownership, workflow-integration and incentive awareness | 5 | 5 | Both named the missing owner, the process that was never updated, the lack of follow-up training and the unanswered incentive question. |
| Practical, appropriately-scoped recommendation | 5 | 5 | Both gave a clear, similar plan: name an owner, settle the incentive question, update the process, run more training and start tracking usage. |
| Honest acknowledgement of what is not yet known | 3 | 5 | The baseline went straight from diagnosis to a confident plan. The guide-informed output kept a clear line between what the evidence supports and what still needs checking: the small two-against-thirteen sample, whether the failed claim shows a real recurring weakness, other unstated causes, and whether the decline was sudden or gradual. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What improved

The difference here is smaller and narrower than in the two tests before it. Both outputs reached the same correct diagnosis and a similar plan. Both resisted the ordinary prompt's leading framing, which nudged towards blaming the tool. Neither is unsafe to act on.

The guide-informed output did better on one thing: it marked the limits of its own conclusions. It said the small sample limits how far the finding can be generalised. It said the failed claims should still be checked before ruling out a real weakness in the model. And it raised other plausible causes the evidence can't yet confirm or rule out. The baseline's confidence wasn't misplaced for what it covered, but it didn't stop to say where the evidence ran out.

## How much the guide added

Unlike the Calthorpe & Rees test, this one didn't need a harder second attempt. The ordinary prompt already resisted the scenario's built-in pull towards blaming the tool. The gap between the two outputs is real but modest, and it sits in one area of the rubric rather than several. That is encouraging for how AI models handle this kind of question in general, and a smaller claim for what this guide adds.

## What a person still has to check

- Read the claim or claims called inaccurate before ruling out a real, recurring weakness in the model.
- Treat the two-against-thirteen comparison as a pointer, not proof, because the numbers are small.
- Get a written answer from management on whether AI-assisted time counts towards performance targets, before assuming training alone will fix adoption.
- Check whether usage fell suddenly or gradually. That tells you whether the fix is mainly about one incident or about a long lack of support.
- Decide who owns the rollout before running more training or changing the process. Both outputs named the missing owner as the first gap.

## What this test supports

In this one fictional scenario, the ordinary prompt and the guide-informed prompt reached the same correct diagnosis. The guide-informed prompt kept a firmer line between what the evidence supports and what is still uncertain. That matters most when someone is about to act on a confident-sounding recommendation.

## What this test does not support

- It is one fictional scenario.
- I ran it myself, so it isn't independent validation.
- The two outputs came from separate, isolated runs, but from the same model family. A different model or tool might behave differently.
- It doesn't show a real stalled rollout being diagnosed or fixed.
- It includes no outside user's result.

## Test integrity

I ran each prompt in a fresh, isolated context. Neither run could see the other run, the rubric, the automatic-failure criteria or the expected reasoning, and neither was told it was a test or a comparison. I scored both outputs against the answer key only after both runs had finished.

I didn't need a revised or repeat run, because the first attempt showed a real difference and neither side failed automatically. One risk remains: I designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real stalled rollout when one comes up, or log feedback if an outside user tries it.
