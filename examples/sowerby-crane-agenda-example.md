# Sowerby and Crane: Meeting Agenda Example

**Everything in this example is fictional.** Sowerby and Crane, Kestrelby, Dilan Sarpong, Prisha Bhatt, Tomasz Wieczorek, Marguerite Loxley and the job tracking project were invented from scratch for this repository.

This tests the second starter prompt in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md), the one that turns rough notes into a meeting agenda. That starter promises two things beyond producing an agenda: do not assume a decision has already been made, and flag anything missing that the organiser needs to decide before the meeting.

Two attempts were run. This page shows the second, harder one. [The review](../evaluations/sowerby-crane-agenda-review.md) explains why there were two and scores this attempt.

## The workplace situation

Sowerby and Crane is a surveying practice of about forty people, replacing the spreadsheets it uses to track jobs. A first meeting has already happened. Someone is now organising the follow up and jots down rough notes beforehand, in the state such notes are usually in: half agenda, half thinking aloud.

The notes contain a decision the organiser believes was made, which a colleague remembers differently, and a partner's offhand remark that could be read as approval.

## Source information

The notes, used unchanged in both runs:

```text
Rough notes before the follow up job tracking meeting, Sowerby and Crane

- Follow up on the job tracking thing. We agreed to work up Option A.
- Although Dilan thinks we said we would look at both. I think it was A. Need to check my notes from last time.
- Prisha has the licence numbers now. Option A is 4,200 a year. Option B she has as around 9,000, maybe more with the extra modules.
- Tomasz has looked at the history question. He says the twelve years can come across but not cleanly, and he would want to talk it through.
- Marguerite came to the last one. She said she was happy for us to get on with it.
- Need to get to a supplier decision this time. Or at least that is what I would like.
- Half day probably. Or two hours.
- Dilan is on leave the week of the 12th.
- The renewal date turned out to be 31 March.
```

## An ordinary first attempt

```text
Can you turn these notes into an agenda for the meeting? Thanks
```

### Baseline output

**Job Tracking System, Follow-Up Meeting**

Sowerby and Crane

**Attendees:** Dilan, Prisha, Tomasz, Marguerite (optional, she confirmed at the last meeting she's happy for us to proceed)

**Duration:** 2 hours (half day as fallback if we need it)

**Scheduling note:** Avoid the week of the 12th, Dilan is on leave.

**Objective:** Reach a supplier decision.

**1. Recap and confirm scope (15 mins)**

- Confirm what was agreed last time: Option A only, or both A and B?
- My notes say Option A; Dilan's recollection is that we'd look at both
- *Action before the meeting: I need to check my notes from the last session*

**2. Costs (25 mins)**

- Prisha to walk through licence numbers
  - Option A: GBP 4,200/year
  - Option B: around GBP 9,000/year, potentially higher with the extra modules
- Confirm whether the Option B figure needs firming up, or whether it's already out of scope

**3. Data history and migration (30 mins)**

- Tomasz on the twelve years of history
- His view: it can come across, but not cleanly, he wants to talk it through
- Agree what "good enough" looks like, and what we're prepared to lose

**4. Timeline (15 mins)**

- Renewal date is 31 March, work back from there
- Identify the point of no return for a decision

**5. Decision (30 mins)**

- Supplier decision: Option A, Option B, or defer
- If we can't decide today, agree exactly what's still missing and who owns it

**6. Actions and next steps (5 mins)**

Two things worth flagging: the scope disagreement in item 1 is the one to settle first, since if it's genuinely both options then the Option B costs and migration questions get much bigger and a decision today may not be realistic. And the timings above add up to exactly two hours with no slack, so if you want the decision to have room, either the half day or trimming items 2 and 4 would help.

## A guide-informed attempt

This is the agenda starter from [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md), used unchanged, on the same notes.

```text
Turn the notes below into a practical agenda for the follow up job tracking meeting.

The agenda should show the purpose, discussion topics, decisions needed and next steps.
Do not assume a decision has already been made.
Flag anything missing that I need to decide before the meeting.

Notes:
[the notes above]
```

### Guide-informed output

**Follow-Up Meeting: Job Tracking Software, Sowerby and Crane**

**Purpose**

Review the work done since the last meeting on job tracking options and, if the group is ready, reach a supplier decision. If we are not ready, agree exactly what is outstanding and who closes it.

**Note on scope:** there is an unresolved question about whether we agreed to work up Option A only, or both A and B. Settle this at the top of the meeting before discussing costs, or the discussion will keep re-litigating it.

**1. Confirm scope and where we left off (10 min)**

- What was actually agreed last time, Option A only, or both options?
- I have it as Option A; Dilan has it as both. Reconcile against notes before going further.
- Agree what "worked up" means for the purposes of today's decision.

**2. Costs (15 min)**

Prisha to walk through the licence numbers now available:

- Option A: GBP 4,200/year
- Option B: around GBP 9,000/year, potentially more with additional modules
- Questions to cover: are these figures firm or indicative? What exactly is included? What sits outside the licence (implementation, training, support)?

**3. Data history (15 min)**

Tomasz on the twelve years of historical data:

- His position: the history can be migrated, but not cleanly, and he wants to talk it through
- What "not cleanly" means in practice, what is lost, degraded, or needs manual work
- Whether partial history or an archive-and-start-fresh approach is acceptable
- Effort and cost implications, and whether these differ between options

**4. Timing (10 min)**

- Renewal date confirmed as 31 March, work back from this to establish the real deadline
- What must be decided by when to hit that date, including procurement and implementation lead time
- Dilan is on leave the week of the 12th; factor this into any scheduling

**5. Decision (15 min)**

Attempt a supplier decision. If not possible, name the specific blocker.

**Decisions needed**

1. **Scope:** are we evaluating Option A alone, or A and B?
2. **Supplier:** which option do we proceed with? (Not yet decided, this is the aim of the meeting, not a foregone conclusion.)
3. **Data history:** how much of the twelve years do we bring across, and at what cost?
4. **Timeline:** what is the decision deadline given the 31 March renewal?
5. **Approval route:** who signs off the spend, and has that been confirmed?

**Next steps (to be assigned in the meeting)**

- Owner and date for firming up whichever cost figures are still indicative
- Owner for the data migration scoping work following Tomasz's input
- Owner for the approval/sign-off route
- Date and purpose of any further meeting, scheduled around the 12th

**Things you need to decide before the meeting**

1. **Check your notes on Option A vs both options.** You and Dilan remember the last meeting differently. Resolve this beforehand if you can, if you walk in disagreeing, you will spend the meeting on it.
2. **Length: half day or two hours.** These lead to different meetings. Two hours covers the agenda above with a decision attempt at the end. A half day allows genuine working-through of the migration question. Pick one and set the agenda accordingly, the timings above assume roughly two hours.
3. **Attendees.** Prisha and Tomasz clearly need to be there. Is Marguerite attending, or is her "happy for us to get on with it" comment standing in for her presence? Related: does "get on with it" constitute spend approval, or only permission to continue the evaluation? Worth being clear, because a supplier decision at GBP 4,200 or GBP 9,000 a year may need her explicit sign-off.
4. **Whether a decision is realistically achievable.** You want one. But Tomasz wants to talk the history question through, and that is unresolved. If the data answer changes the supplier choice, a decision today may not be available, decide in advance whether you would accept a conditional decision (for example, proceed with A subject to migration scoping) or hold out for a firm one.
5. **Date.** Not yet fixed. Avoid the week of the 12th if Dilan needs to be there, and note that the 31 March renewal sets the outer limit.

**Gaps in the notes**

- No date or invitee list yet
- Option B's cost is approximate, and the module question is open
- No named decision-maker or approval threshold
- Nothing on what happens if no decision is reached, no fallback, no rollover position on the existing contract
- The problem the change is meant to solve is not restated anywhere; if the group has drifted on why we are doing this, worth thirty seconds at the top

For repository formatting, both raw outputs had their dash glyphs and currency symbols rendered as ASCII-safe Markdown. Their wording and meaning are unchanged.

## Short comparison

Both runs caught the biggest problem in the notes: that the organiser and Dilan remember the last meeting differently, so Option A cannot be treated as chosen. Both kept Option B's cost soft and Tomasz's "not cleanly" unresolved.

Three things separate them, and all three are decisions the notes left open.

The ordinary prompt settled the meeting's length at two hours, when the notes say "Half day probably. Or two hours." It stated "Reach a supplier decision" as the objective, when the notes say "Or at least that is what I would like". And it marked Marguerite optional on the grounds that she "confirmed at the last meeting she's happy for us to proceed", which upgrades an offhand remark into an approval.

The guide-informed output left the length open with the trade-off spelled out, made the supplier decision conditional on the group being ready, and asked the question the notes invite: does "happy for us to get on with it" mean spend approval, or only permission to keep evaluating. [Read the scored review](../evaluations/sowerby-crane-agenda-review.md).
