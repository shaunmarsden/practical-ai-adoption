# Hollis & Speight: AI Access Gap Review

This is a project-authored scoring rubric, not one endorsed by IBM, Pluralsight or AiCore.

This scores the [Hollis & Speight example](../examples/hollis-speight-ai-access-gap-example.md), which tests [The Gap Between AI Access and Actual Use](../guides/the-gap-between-ai-access-and-actual-use.md). I gave the ordinary prompt and the guide-informed prompt the same five fictional people and asked who needs full AI training.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 11/30 | 28/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Separating stated confidence or title from actual evidence | 1 | 5 | The baseline treated every description as if it were already the answer. The guide-informed output said none of the five descriptions was evidence on its own. |
| Catching the false positive (confident, title-matching, no shown example) | 1 | 5 | The baseline fast-tracked Priti on her title and confidence alone. The guide-informed output named hers as the profile most likely to be taken at face value and least likely to be checked. |
| Catching the false negative (quiet, self-deprecating, actually a daily user) | 1 | 4 | The baseline gave Callum full training on his own modest view of himself. The guide-informed output named the same risk in reverse, but not the likely reason he undersold himself (fear that using AI would look like cutting corners). |
| Correctly confirming the true positive without over-flagging it | 4 | 5 | The baseline fast-tracked Marcus. The guide-informed output treated him as the strongest case, needing only a quick check, and told his specific description apart from Priti's vague confidence. |
| Catching the planner's own blind spot | 1 | 5 | The baseline exempted Dominic from any check, on his own general view of himself. The guide-informed output named this as a blind spot built into the exercise he was running. |
| Practical, low-friction next step | 3 | 4 | The baseline gave a workable plan built entirely on unchecked assumptions. The guide-informed output proposed one easy check for all five, Dominic included, but didn't say the rollout messages should address Callum's reason for playing down his use. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What improved

The guide-informed prompt didn't just add caveats to the same plan. It produced a different and more accurate one.

It flagged Priti, whose case for skipping training sounded strongest, as someone who might need the foundational session most. It said Callum's quiet self-assessment was no more evidence of low use than confidence is of high use. And it named the exercise's own blind spot: Dominic exempting himself.

It said confidence, a title and a stated intention to hold off are all stand-ins, not evidence, and it asked for the same check from everyone. But it didn't treat every self-report as equally unreliable. Marcus's specific, checkable description counted for more than Priti's vague confidence.

The baseline's plan would have skipped training for the person with the least hands-on use in the group. It would have loaded full training onto someone who was already using AI daily without saying so.

## What it still got wrong

It didn't ask why Callum played down his use. The likely reason, fear of looking like he was cutting corners, matters for how the rollout is explained. That gap cost it a point in two areas.

## What a person still has to check

- Run the specific-example check with each of the five people, Dominic included. This test's fictional answers are no substitute for asking.
- Decide how to bring up the possibility that some quiet self-assessments, like Callum's, come from a fear of looking like they're cutting corners. That is a culture and messaging question for the rollout, not only an evidence gap to close.
- Make sure "a specific task and what it produced" is checked, not just asked for. A specific answer that sounds rehearsed isn't automatically true.
- Decide what happens if someone's answer shows no use and no confidence at all. The check finds the gap. It doesn't make the training work.

## What this test supports

In this one fictional scenario, the guide-informed prompt produced a very different and more accurate training plan. It kept confidence and job title apart from evidence, and checked everyone, including the person designing the plan.

## What this test does not support

- It's one fictional scenario.
- I ran it myself, so it isn't independent validation.
- The two runs were separate and isolated, but used the same model family. A different model or tool might behave differently.
- It doesn't show a real training outcome or a measured rise in adoption.
- It doesn't include a result from an outside user.
- It doesn't show that an ordinary prompt would always miss these points. A more sceptical ordinary prompt, or a different model, might catch some of them without the guide. Here the ordinary prompt took every description at face value, which is the default this guide is meant to change.

## Test integrity

I ran each prompt in a fresh, isolated context. Neither run saw the other run, the rubric, the automatic-failure criteria or the expected reasoning, and neither was told this was a test or a comparison. The evaluator saw both outputs and the answer key only after both runs had finished. The result could still be skewed, because I designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Next I'll use the guide on a real training or rollout plan when one comes up, or log feedback if an outside user tries it.
