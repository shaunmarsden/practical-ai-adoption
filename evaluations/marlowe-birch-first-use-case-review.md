# Marlowe & Birch: Finding a Good First AI Use Case Review

This is a project-authored scoring rubric, not one endorsed by DSIT, the ONS, OpenAI or AiCore.

I gave an ordinary prompt and a guide-informed prompt the same six fictional tasks and asked which to try first. The [worked example](../examples/marlowe-birch-first-use-case-example.md) has both prompts and both outputs.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 24/30 | 30/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and task understanding | 4 | 5 | Both understood all six tasks. The guide-informed output checked whether the information was appropriate to use for its top pick as well as for the obviously sensitive board summary. |
| Practical value and prioritisation | 4 | 5 | Both resisted picking the task with the biggest time saving. The baseline contradicts itself: it says Task 3 isn't an AI task at all, then ranks it above three tasks that suit AI but carry risk. The guide-informed output ranks Task 3 last, which fits its own reasoning. |
| AI suitability versus simpler automation | 5 | 5 | Both saw Task 3 as a job for rules-based automation, not AI. The baseline got there without being told not to assume AI suits a repetitive task. The guide-informed prompt included that warning. |
| Risk, privacy and human control | 4 | 5 | The guide-informed output lists what a person must still check and refuses to assume a data-handling policy for Task 4. The baseline covers similar ground less directly. |
| Testability and success measures | 3 | 5 | The baseline suggests timing the trial. The guide-informed output gives four separate measures, including separating generation time from correction time. |
| Practical first-step usefulness | 4 | 5 | Both propose a small trial that can be undone. The guide-informed output is clearer about scope: run it alongside the current process, and nothing changes for the six project leads. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What improved

The guide-informed prompt gave a fuller answer, mainly on measuring the trial and on what a person still has to check. It didn't change the recommendation: both outputs chose the same first task.

It checked whether the information was appropriate to use for its top pick, not just the obviously sensitive board summary. It gave four specific measures, not one instruction to time the trial. It named the gap in Task 4's data-handling policy instead of filling it. And it ranked Task 3 last, which fits its own analysis, where the baseline ranked it above tasks that suit AI but carry risk.

## The trap both outputs avoided

The main trap in this test was treating a fixed-rules copying task as an AI task. Both outputs avoided it, and the baseline did so without any instruction telling it not to assume AI suits a repetitive task.

So the guide made the answer more thorough, more consistent and clearer about what still needs checking. This test doesn't show that an ordinary prompt would have failed the core safety check here.

## What a person still has to check

- Which AI tool is approved for this kind of internal content, before running any trial.
- What "needing management attention" means for this organisation. That's a judgement to keep, not one to hand to a drafting tool.
- The six original updates, not only the summary, at least during the trial.
- The Task 4 data-handling question. Settle it separately before treating Task 4 as a future experiment. This test's silence on it is not an answer.
- If moving to Task 2 or Task 6 later, whether the AI should draft a recommendation for a person to decide. Don't assume the Task 1 setup carries over.

## What this test supports

In this one fictional scenario, the guide-informed prompt gave a more thorough and more consistent answer from the same task list. Both outputs avoided the trap the scenario was built to test.

## What this test does not support

- It is one fictional scenario.
- I ran it myself, so it isn't independent validation.
- The two runs were separate and isolated, but used the same model family. A different model or tool might behave differently.
- It doesn't show a real business outcome or a measured productivity gain.
- It includes no outside user's result.

## Test integrity

I ran each prompt in a fresh, isolated context. Neither run saw the other run, the rubric, the automatic-failure criteria or the expected reasoning, and neither was told it was a test or a comparison. The scorer got the two outputs and the answer key only after both runs had finished.

One risk remains: I designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real, low-risk choice of first use case when one comes up, or log feedback if an outside user tries it.
