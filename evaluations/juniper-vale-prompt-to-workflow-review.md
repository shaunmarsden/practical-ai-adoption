# Juniper Vale: From a Prompt to a Useful Workflow Review

This is a project-authored scoring review, not an OpenAI rubric or any other organisation's.

## Result

| | Baseline | Workflow-informed |
| --- | ---: | ---: |
| Score | 17/30 | 29/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Workflow-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 2 | 5 | The baseline turns the proposed date into a decision, picks one of the two budget figures and names owners the notes don't support. The workflow-informed output keeps the distinctions the notes make. |
| Task alignment | 4 | 5 | Both give an update and an action list. The workflow-informed output also lists the checks needed before the update is shared. |
| Use of context | 3 | 5 | The baseline covers the main task but drops the fact that the date, budget and owner are unresolved. The workflow-informed output uses those details and leaves out the irrelevant personal matter. |
| Unknowns, updates and conflicts | 1 | 5 | The baseline hides all three important unknowns. The workflow-informed output labels confirmed, pending and conflicting information separately. |
| Practical usefulness | 4 | 4 | The baseline is readable but needs substantial correction. The workflow-informed output gives a clear next step, though Mara still has to resolve the open points before using it. |
| Responsible use and human control | 3 | 5 | The baseline doesn't claim the update was sent, but it doesn't show the human checks either. The workflow-informed output leaves decisions, sharing and approval with Mara and Finance. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## Automatic failure review

The baseline didn't fail automatically. It makes several unsupported claims, and they need correcting before anyone uses it. But it is presented as a draft. It doesn't claim that Finance approved the budget, that the update was shared or that anyone completed the actions. Under this test's rules, that makes them scoring weaknesses, not an automatic failure.

The workflow-informed output didn't fail automatically either. It doesn't settle the proposed date, pick a budget figure, name an unsupported owner, include the private matter or claim that any action is done. It leaves the final checks and the decision to share with a person.

## What improved

The workflow-informed output found no new evidence. It handled the same notes more safely and showed the next human checks. It kept the proposed date apart from the confirmed meeting date. It showed both budget figures instead of choosing one. It left the possible owners unconfirmed, and it left out the private personal matter. It also gave Mara a clear step to review and share.

## What it still got wrong or left incomplete

It didn't resolve the budget, date or ownership questions, because the notes don't resolve them. The test doesn't show whether the workflow saves time in real use, or whether the team would find the output useful. And the action list is a draft, not a system of record.

## What a person still has to check

- Confirm the rota pilot date.
- Ask Finance to confirm the current budget figure and approval position.
- Confirm the owner for the freezer delivery check.
- Decide what the team needs to see.
- Review and share the final update by hand.

## What this test supports

In this one fictional scenario, the workflow brief produced a more careful and more useful draft from the same notes. It shows the value of setting out sources, limits, checks and the next human decision together.

## What this test does not support

- It is one fictional scenario.
- I ran it myself, so it isn't independent validation, and it includes no outside user's result.
- It doesn't show a real time saving or adoption outcome.
- It doesn't show that the workflow will work unchanged for every role or task.

## Test integrity

Both outputs are fixed fictional outputs made for this example, not live runs. The workflow-informed prompt got the same notes as the baseline, plus only the workflow brief, its limits and its review steps. I scored the outputs after comparing them with the notes. This is a project demonstration, not independent validation.

## Next evidence

Use the brief on one real, low-risk task when one comes up. Record what the AI prepared, what needed correcting and whether the workflow was worth repeating.
