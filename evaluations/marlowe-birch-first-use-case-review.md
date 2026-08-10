# Marlowe & Birch: Finding a Good First AI Use Case Review

This is a project-authored scoring rubric. It is not endorsed by DSIT, the ONS, OpenAI or AiCore.

## Result

**Baseline: 24/30**

**Guide-informed: 30/30**

**Automatic failure:**

Baseline: No

Guide-informed: No

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and task understanding | 4 | 5 | Both understood all six tasks correctly. The guide-informed output checked whether the information was appropriate to use for every task, not only the most obviously sensitive one. |
| Practical value and prioritisation | 4 | 5 | Both resisted picking the task with the largest time saving. The baseline is internally inconsistent: it says Task 3 is not an AI task at all, then ranks it above three AI-suited-but-risky tasks. The guide-informed output ranks Task 3 last, consistent with its own reasoning. |
| AI suitability versus simpler automation | 5 | 5 | Both correctly identified Task 3 as a rules-based automation candidate rather than an AI one. The baseline reached this without being told not to assume AI suits a repetitive task; the guide-informed prompt stated that caution explicitly. |
| Risk, privacy and human control | 4 | 5 | The guide-informed output has an explicit list of what a person must still check and explicitly declines to assume Task 4's data-handling policy. The baseline covers similar ground but less explicitly. |
| Testability and success measures | 3 | 5 | The baseline suggests timing the trial. The guide-informed output gives four distinct measures, including separating generation time from correction time. |
| Practical first-step usefulness | 4 | 5 | Both propose a small, reversible trial. The guide-informed output is more explicit about scope: run in parallel, and nothing changes for the six project leads. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What genuinely improved

The guide-informed prompt produced a more thoroughly developed answer, particularly on testability and on making the remaining human checks explicit. It did not produce a fundamentally different recommendation: both outputs chose the same first task.

- It checked information-appropriateness for every task, not just the obvious one.
- It gave four specific measures instead of one general instruction to time the trial.
- It explicitly declined to assume a data-handling policy for Task 4, naming the gap rather than filling it.
- It ranked Task 3 last for a reason consistent with its own analysis, rather than ranking it above genuinely AI-suited but risky tasks.

## What the test does not show as clearly as it might seem to

The single most important trap in this test, the risk of defaulting to AI for a fixed-rules copying task, was caught by both outputs. The baseline reached that conclusion without any prompt telling it not to assume AI suits a repetitive task. This test shows the guide improves thoroughness, consistency and the explicitness of what still needs checking. It does not show that an ordinary prompt would have failed the core safety check in this scenario.

## What a person still has to check

- Confirm which AI tool is actually approved for this kind of internal content before running any trial.
- Decide what "needing management attention" means for this organisation; that judgement is not something to hand to a drafting tool.
- Read the six original updates rather than relying on the summary alone, at least during the trial period.
- Resolve the Task 4 data-handling question separately and explicitly before considering it as a future experiment; do not treat this test's silence on it as an answer.
- Decide, if moving to Task 2 or Task 6 later, whether the AI drafts a recommendation for a person to decide, rather than assuming the same shape used for Task 1 carries over.

## What this test supports

In this one fictional scenario, the guide-informed prompt produced a more thorough and internally consistent result from the same task list. Both outputs avoided the specific trap the scenario was built to test.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- The two outputs were generated as separate, isolated runs, but by the same underlying model family; a different model or tool might behave differently.
- It does not show a real-world business outcome or a measured productivity improvement.
- It does not include an independent external user's result.

## Test integrity

Each run was generated in a fresh, isolated context with no visibility into the other run, the rubric, the automatic-failure criteria or the expected reasoning. Neither runner was told this was a test or comparison. The evaluator received both completed outputs and the answer key only after both runs were finished. A contamination risk remains because the same person designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real low-risk first-use-case decision when one naturally arises, or log feedback if an outside user tries it.
