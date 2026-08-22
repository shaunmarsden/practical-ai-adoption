# Hollis & Speight: AI Access Gap Review

This is a project-authored scoring rubric. It is not endorsed by IBM, Pluralsight or AiCore.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 11/30 | 28/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Separating stated confidence or title from actual evidence | 1 | 5 | The baseline treated every description as if it were already the answer. The guide-informed output stated plainly that none of the five descriptions was evidence on its own. |
| Catching the false positive (confident, title-matching, no shown example) | 1 | 5 | The baseline fast-tracked Priti on her title and confidence alone. The guide-informed output named this exact profile as the one most likely to be taken at face value and least likely to be checked. |
| Catching the false negative (quiet, self-deprecating, actually a daily user) | 1 | 4 | The baseline assigned Callum full training based on his own modest self-assessment. The guide-informed output correctly named the symmetric risk, but did not surface the likely reason behind his undersell (fear that using AI would look like cutting corners), which is itself something worth knowing before designing rollout messaging. |
| Correctly confirming the true positive without over-flagging it | 4 | 5 | Both outputs fast-tracked Marcus. The guide-informed output additionally distinguished his specific, falsifiable description from Priti's vague confidence, showing real signal-versus-noise judgement rather than treating every claim as equally suspect. |
| Catching the planner's own blind spot | 1 | 5 | The baseline exempted Dominic from any check, on his own general self-assessment. The guide-informed output explicitly named this as a structural blind spot in the exercise he was running. |
| Practical, low-friction next step | 3 | 4 | The baseline produced a workable rollout structure, built entirely on unverified assumptions. The guide-informed output proposed one specific, low-friction check applied evenly to all five, including Dominic, but stopped short of flagging Callum's underlying reason for downplaying his use as something the rollout's messaging should also address. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What genuinely improved

The guide-informed prompt did not just add caveats to the same plan. It produced a different, more accurate plan: it correctly flagged Priti as the person most likely to need training despite the strongest-sounding case against it, correctly flagged Callum as someone likely already using AI daily despite the weakest-sounding case for it, and named the exercise's own blind spot, Dominic exempting himself. The baseline's plan would have skipped training for the person with the least actual hands-on use in the group and loaded full training onto someone who was already using AI daily without saying so.

- It stated explicitly that confidence, a title and a stated intention to hold off are all proxies, not evidence.
- It recommended the same specific check for everyone, including the person running the exercise.
- It distinguished Marcus's specific, checkable description from Priti's vague confidence, rather than treating all self-reports as equally unreliable.

## What the test does not show as clearly as it might seem to

This test shows the guide catches a title-and-confidence-driven false positive and a quiet false negative in the same pass, and catches the planner's own blind spot. It does not show that an ordinary prompt would always miss these; a more skeptically worded ordinary prompt, or a different model, might have caught some of this without the guide. What the ordinary prompt actually did here was accept every description at face value with no prompting to question it, which is the realistic default this guide exists to change.

## What a person still has to check

- Actually run the specific-example check with each of the five people, including Dominic, rather than treating this test's fictional answers as a substitute for asking.
- Decide how to raise the possibility that some quiet self-assessments, like Callum's, reflect a fear of looking like they are cutting corners, since that is a culture and messaging question the rollout should address, not only an evidence gap to close.
- Confirm that "a specific task and what it produced" is actually being checked, not just asked for, since a rehearsed-sounding specific answer is not automatically a true one either.
- Decide what happens if someone's honest answer reveals genuinely no use and no confidence; the guide's check surfaces the gap, it does not by itself make training effective.

## What this test supports

In this one fictional scenario, the guide-informed prompt produced a materially different and more accurate training plan than the ordinary prompt, by separating stated confidence and title from actual evidence and applying that check evenly, including to the person designing the plan.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- The two outputs were generated as separate, isolated runs, but by the same underlying model family; a different model or tool might behave differently.
- It does not show a real-world training outcome or a measured adoption improvement.
- It does not include an independent external user's result.

## Test integrity

Each run was generated in a fresh, isolated context with no visibility into the other run, the rubric, the automatic-failure criteria or the expected reasoning. Neither runner was told this was a test or comparison. The evaluator received both completed outputs and the answer key only after both runs were finished. A contamination risk remains because the same person designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real training or rollout plan when one naturally arises, or log feedback if an outside user tries it.
