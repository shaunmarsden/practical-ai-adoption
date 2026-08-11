# Juniper Vale Community Kitchen: From a Prompt to a Useful Workflow

**Everything in this example is fictional.** Juniper Vale Community Kitchen and Mara Ellis were invented from scratch for this repository.

## The workplace situation

Juniper Vale Community Kitchen is a fictional community charity with a small team. Mara Ellis coordinates its weekly planning meeting. She wants to turn messy meeting notes into a short internal update and an action list.

The task happens every week. Mara knows what a useful update looks like, but the notes often contain suggestions, decisions and unresolved questions in the same paragraph.

The deliberately difficult parts of this example are:

- a proposed volunteer rota date that has not been agreed;
- two different budget figures in the notes;
- a possible action owner that was discussed but not confirmed;
- an irrelevant private personal matter that should not appear in the update.

## Source notes

```text
Weekly planning notes

- The next planning meeting is booked for 19 September.
- The Saturday volunteer rota pilot is proposed for 14 September. The notes say that this date is not agreed yet.
- Someone suggested that Ravi might check whether the freezer delivery can be moved. No owner was confirmed.
- One note shows a pilot budget of GBP 1,200. A later note shows GBP 1,500. Finance needs to check which figure is current.
- The notes also contain a private personal matter about one volunteer. It is not relevant to the team update or action list.
```

## An ordinary first attempt

The baseline prompt was deliberately ordinary:

```text
Turn these meeting notes into a short project update and action list for the team.
```

### Baseline output

**Project update**

- The Saturday volunteer rota pilot will start on 14 September.
- The pilot budget is GBP 1,500 and Finance will approve it.
- Ravi will arrange the freezer delivery change.

**Action list**

| Action | Owner | Date |
| --- | --- | --- |
| Start the volunteer rota pilot | Mara | 14 September |
| Confirm the GBP 1,500 budget with Finance | Ravi | Before the pilot |
| Move the freezer delivery | Ravi | Before the pilot |

This is a readable draft, but it has turned a proposed date into a decision, chosen one of two conflicting budget figures, assigned an owner that was not confirmed and turned a suggestion into an action. It does not mention that these points still need a person to check.

## A workflow-informed attempt

This prompt uses the brief in [From a Prompt to a Useful Workflow](../guides/from-a-prompt-to-a-useful-workflow.md). It uses the same source notes and asks the AI to separate preparation from decisions.

```text
Task:
Turn the planning notes below into a short internal update and action list.

Source material:
[the weekly planning notes]

AI should prepare:
- a short update for the team;
- an action list;
- a list of confirmed information, pending information and conflicts.

AI must not:
- turn a proposal into an agreed date;
- choose between conflicting budget figures;
- assign an owner when the notes do not confirm one;
- include the private personal matter;
- claim that Finance has approved anything.

Human checks:
- compare the update with the original notes;
- confirm the pilot date, budget figure and action owners;
- decide what can be shared with the team.

Output:
Give me the update, action list, confirmed information, pending information and conflicts. End with a short list of what a person still needs to check or decide.
```

### Workflow-informed output

**Internal update**

The next planning meeting is booked for 19 September. A Saturday volunteer rota pilot has been proposed for 14 September, but the date is not agreed yet. The budget figure is unresolved because the notes show both GBP 1,200 and GBP 1,500. Finance needs to confirm the current figure before the team treats it as settled.

**Action list**

| Action | Owner | Date | Status |
| --- | --- | --- | --- |
| Confirm whether the rota pilot can start on 14 September | Not confirmed | Before any team announcement | Pending |
| Confirm whether the pilot budget is GBP 1,200 or GBP 1,500 | Finance owner not confirmed | Before approval | Pending |
| Check whether the freezer delivery can be moved | Owner not confirmed | Not stated | Pending |

**Confirmed information**

- The next planning meeting is booked for 19 September.
- A Saturday volunteer rota pilot is being considered.

**Pending information and conflicts**

- The 14 September pilot date is proposed, not agreed.
- The notes contain conflicting budget figures of GBP 1,200 and GBP 1,500.
- The owner for the freezer delivery check is not confirmed.

**A person still needs to check or decide**

- Confirm the pilot date before announcing it.
- Ask Finance to confirm the current budget figure and approval position.
- Confirm who owns the freezer delivery check.
- Review the finished update and decide what is appropriate to share with the team.

The private personal matter has been left out because it is not needed for this task.

## Short comparison

The baseline output is easier to read than the source notes, but it makes the important uncertainties disappear. The workflow-informed output is more useful because it keeps the date, budget and owner questions visible and gives Mara a clear checking step.

Neither output makes a decision or sends an update. A person still needs to verify the notes, resolve the open points and decide what to share.

Read the [scored review](../evaluations/juniper-vale-prompt-to-workflow-review.md) for the limits of this fictional comparison.
