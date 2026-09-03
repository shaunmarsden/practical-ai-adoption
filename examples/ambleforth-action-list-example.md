# Ambleforth Community Housing: Action List Example

**Everything in this example is fictional.** Ambleforth Community Housing, Rowan Alcott, Deniz Kaya, Marcus Ilori, Fenella Wrenn, Priya Nadeem and the Rushmere block were invented from scratch for this repository.

This tests the third starter prompt in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md), the one that turns notes into an action list. That starter makes a specific, checkable promise: show any date that is actually stated, say when an owner or date is missing, and do not guess.

## The workplace situation

Ambleforth Community Housing manages around 900 homes. Rowan Alcott is its Operations Coordinator and takes the notes at the monthly property team meeting. The notes below are Rowan's own, written quickly during the meeting, in the state real notes are usually in.

Nine items came up. Only one of them has both a named owner and a stated date. The rest are missing an owner, missing a date, carry a vague deadline rather than a real one, or are not actions at all.

## Source information

Rowan's notes, used unchanged in both runs:

```text
Property team meeting, Tuesday 8 September 2026, 10am, Ambleforth Community Housing

Present: me (Rowan), Deniz Kaya (Repairs), Marcus Ilori (Assets), Fenella Wrenn (Housing Officer).
Priya Nadeem not there, annual leave until 5 October.

- Contractor framework. Deniz to get the approved contractor list into the board pack by Friday 18 September.
- Damp survey. Marcus is rewriting the damp survey brief for the Rushmere block. Didn't say when he'd have it.
- Tenant newsletter. Has to go out 2 October, that date is fixed by the printer's slot. We ran out of time before saying who is actually picking it up.
- Service charge figures. Someone in Finance will need to sanity check the service charge figures before they go out to tenants. No name agreed.
- Lift maintenance. We should get the lift maintenance contract sorted by the end of the month.
- Quarterly inspections. Talked about moving from six monthly to quarterly stock inspections. Agreed to leave it as it is for now and revisit at the next budget round.
- Fire door audit. This was Priya's. She is on leave until 5 October so it needs a new owner. We said we would sort that out offline.
- Void works budget. Agreed the void works budget line stays at 4,000 pounds.
- Bin store. Fenella said two tenants had asked about the bin store at Rushmere. She has already replied to both of them.
```

## An ordinary first attempt

The baseline prompt was deliberately ordinary, not absurdly weak. It used the exact notes above.

```text
Can you pull the actions out of these notes for me? Thanks
```

### Baseline output

Here are the actions from those notes.

**Actions with an owner**

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| 1 | Get the approved contractor list into the board pack | Deniz Kaya | Fri 18 September |
| 2 | Rewrite the damp survey brief for the Rushmere block | Marcus Ilori | Not stated, needs a date |
| 3 | Get the lift maintenance contract sorted | Unclear ("we"), needs naming | End of September |
| 4 | Find a new owner for the fire door audit (to be sorted offline) | You (Rowan), by implication | Before 5 October, when Priya returns |

**Actions with no owner yet, these are the gaps**

| # | Action | What's missing | Hard deadline |
| --- | --- | --- | --- |
| 5 | Tenant newsletter, produce and send | No owner agreed | Must go out 2 October (printer's slot, fixed) |
| 6 | Sanity check the service charge figures before they go to tenants | "Someone in Finance", no name | Before the figures go out, likely tied to the newsletter/2 Oct |
| 7 | Fire door audit itself (the work, not just reassigning it) | Owner vacant while Priya is on leave | |

**Decisions, not actions** (no follow-up needed)

- Stock inspections stay six-monthly for now; revisit at the next budget round.
- Void works budget line stays at GBP 4,000.

**Closed already**

- Fenella has replied to both tenants about the Rushmere bin store. Nothing outstanding.

Two things worth chasing first: the newsletter (fixed external deadline, no owner) and the Finance sanity check, since the service charge figures probably need to be signed off before the 2 October print slot. Item 3 also reads as a group "we should" rather than a real commitment, worth pinning to a person.

## A guide-informed attempt

This prompt is the action list starter from [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md), used unchanged. It used the same notes, with no extra factual evidence.

```text
Read the notes below and create an action list.

For each action, show what needs doing, who appears to own it and any date that is actually stated in the notes.
If an owner or date is missing, say that it is missing. Do not guess.

Notes:
[the notes above]
```

### Guide-informed output

Action list from the property team meeting notes (Tuesday 8 September 2026, Ambleforth Community Housing):

**1. Contractor framework, get the approved contractor list into the board pack**

- Owner: Deniz Kaya (Repairs)
- Date: Friday 18 September

**2. Damp survey, rewrite the damp survey brief for the Rushmere block**

- Owner: Marcus Ilori (Assets)
- Date: missing. The notes say he didn't state when it would be ready.

**3. Tenant newsletter, get the newsletter out**

- Owner: missing. The notes say the meeting ran out of time before agreeing who is picking it up.
- Date: 2 October, fixed by the printer's slot.

**4. Service charge figures, sanity check the figures before they go out to tenants**

- Owner: missing. The notes say someone in Finance will need to do it, but no name was agreed.
- Date: missing. Only stated as needing to happen before the figures go out to tenants.

**5. Lift maintenance, get the lift maintenance contract sorted**

- Owner: missing. No name stated.
- Date: stated only as "the end of the month". The notes do not name a month, so the exact date is not stated.

**6. Fire door audit, find a new owner for the audit**

- Owner of the audit itself: missing. It was Priya Nadeem's, and she is on annual leave until 5 October. The notes say reassignment would be sorted out offline but do not say who will do that.
- Date: missing. The only date stated is Priya's return from leave, 5 October.

**Decisions and closed items (no action needed)**

- Quarterly inspections: agreed to stay on six-monthly stock inspections for now and revisit at the next budget round. No date stated for that budget round.
- Void works budget: agreed the line stays at GBP 4,000.
- Bin store at Rushmere: two tenant queries, already answered by Fenella Wrenn (Housing Officer). Closed.

**Gaps worth chasing**

Three of the six actions have no owner (newsletter, service charge check, lift contract), one has an unresolved reassignment (fire door audit), and three have no usable date (damp brief, service charge check, fire door audit). The lift contract's "end of the month" needs confirming against a specific month.

For repository formatting, both raw outputs had their dash glyphs and currency symbols rendered as ASCII-safe Markdown. Their wording and meaning are unchanged.

## Short comparison

Both outputs are organised and usable, and both correctly separated the dropped inspections item, the budget decision and the already-answered bin store query from the real actions.

The difference is what each did with the things the notes never said. The baseline turned "the end of the month" into "End of September", named Rowan as the fire door owner "by implication", and gave that item a deadline of "Before 5 October, when Priya returns". None of those three specifics is in the notes. The guide-informed output stated each as missing, and explicitly noticed that the notes never name the month.

The baseline was better in one respect: it listed the fire door audit itself as an outstanding action as well as the reassignment, which the guide-informed output collapsed into one item. [Read the scored review](../evaluations/ambleforth-action-list-review.md).
