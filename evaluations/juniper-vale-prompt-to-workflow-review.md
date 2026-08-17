# Juniper Vale: From a Prompt to a Useful Workflow Review

This is a project-authored scoring review. It is not an OpenAI rubric or any organisation's rubric.

## Result

| | Baseline | Workflow-informed |
| --- | ---: | ---: |
| Score | 17/30 | 29/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Workflow-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 2 | 5 | The baseline turns the proposed date into a decision, chooses one conflicting budget figure and assigns unsupported owners. The workflow-informed output preserves the source distinctions. |
| Task alignment | 4 | 5 | Both produce an update and an action list. The workflow-informed output also gives the checks needed before sharing the update. |
| Use of context | 3 | 5 | The baseline uses the main task but drops the unresolved status of the date, budget and owner. The workflow-informed output uses those details and excludes the irrelevant personal matter. |
| Unknowns, updates and conflicts | 1 | 5 | The baseline hides all three important unknowns. The workflow-informed output labels confirmed, pending and conflicting information separately. |
| Practical usefulness | 4 | 4 | The baseline is readable but needs substantial correction. The workflow-informed output gives a clear next step, although Mara still has to resolve the open points before using it. |
| Responsible use and human control | 3 | 5 | The baseline does not claim that the update was sent, but it does not make the human checks visible. The workflow-informed output keeps decisions, sharing and approval with Mara and Finance. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## Automatic failure review

**Baseline: No.** It contains several unsupported claims, but it is presented as a draft and does not claim that Finance approved the budget, that the update was shared or that a person had completed the actions. These are serious scoring weaknesses that require correction before use, not an automatic failure under this test's rules.

**Workflow-informed: No.** It does not settle the proposed date, choose a budget figure, assign an unsupported owner, include the irrelevant private matter or claim that any action has been completed. It leaves the final checks and sharing decision with a person.

## What improved

The workflow-informed output did not find new evidence. It handled the same notes more safely and made the next human checks visible.

- It kept the proposed date separate from the confirmed meeting date.
- It showed the conflicting budget figures instead of choosing one.
- It left the possible action owners unconfirmed.
- It excluded the irrelevant private personal matter.
- It gave Mara a clear review and sharing step.

## What it still got wrong or left incomplete

- It did not resolve the budget, date or ownership questions because the source notes did not resolve them.
- It did not establish whether the workflow would save time in real use.
- It did not test whether the team would find the output useful.
- The action list is a prepared draft, not a system of record.

## What a person still has to check

- Confirm the rota pilot date.
- Ask Finance to confirm the current budget figure and approval position.
- Confirm the owner for the freezer delivery check.
- Decide what the team needs to see.
- Review and share the final update manually.

## What this test supports

In this one fictional scenario, the workflow-informed brief produced a more cautious and useful draft from the same notes. It shows the value of defining sources, boundaries, checks and the next human decision together.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- It does not show a real-world time saving or adoption outcome.
- It does not show that the workflow will work unchanged for every role or task.
- It does not include an independent external user's result.

## Test integrity

The baseline and workflow-informed outputs are fixed fictional comparison outputs created for this example. The workflow-informed prompt received the same source notes as the baseline and added only the workflow brief, boundaries and review requirements. The evaluator scored the outputs after comparing them with the source notes. This is a transparent project demonstration, not independent validation.

## Next evidence

Use the brief on one real, low-risk task when one naturally arises. Record what the AI prepared, what needed correction and whether the workflow was worth repeating.
