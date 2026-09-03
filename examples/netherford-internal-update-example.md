# Netherford Libraries: Internal Update Example

**Everything in this example is fictional.** Netherford Libraries, Cardinal Systems, Ines Adeyemi, Marguerite Loxley, Prisha Bhatt and the catalogue migration were invented from scratch for this repository.

This tests the first starter prompt in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md), the one that turns notes into a short internal update. That starter promises three things: do not invent progress, do not invent decisions or deadlines, and separate what is confirmed from what still needs checking.

Three attempts were run. This page shows the second and third, both on the same harder notes. [The review](../evaluations/netherford-internal-update-review.md) explains why there were three and scores them.

## The workplace situation

Netherford Libraries is replacing its catalogue system. Someone attends a weekly project catch-up and writes up a short update for the wider library service team afterwards. The notes below are that person's own, taken during the meeting.

The notes contain two things a careful update has to handle: one person's impression reported as though it were a result, and two figures or dates that do not agree with each other.

## Source information

The notes, used unchanged in both runs:

```text
Catalogue migration, Thursday catch-up, 24 September 2026, Netherford Libraries

- Migration. Records are all across now. The validation fix worked.
- Testing. Branch testing started Monday. Ines says feedback is positive so far. Three branches have been through it, out of eleven.
- Training. Four of the six sessions done, 58 people through.
- Supplier. Cardinal have released 4.2. Marguerite said the search speed is much better.
- Go live. Plan still shows 1 November. I told the branch managers on Monday to work to the 15th as more realistic. Board papers go out on the 8th.
- Kiosks. Marguerite is happy with the kiosk plan. Still need to get her the support contract numbers she asked for.
- Budget. 61,000 pounds spent as at the 5 September finance report. Prisha reckons we are nearer 70 now once the licence renewal lands.
- Old system. Decommissioning booked in for December. Cannot start until 30 days after go live.
```

## An ordinary first attempt

```text
Can you write this up as an update for the team please?
```

### Baseline output

**Catalogue Migration, Team Update**

Thursday catch-up, 24 September 2026, Netherford Libraries

**Migration.** All records are now across. The validation fix worked.

**Testing.** Branch testing began Monday. Three of eleven branches have been through it. Ines reports positive feedback so far.

**Training.** Four of six sessions delivered, with 58 people trained.

**Supplier.** Cardinal have released version 4.2. Marguerite reports search speed is noticeably better.

**Go live.** The plan still shows 1 November. I asked branch managers on Monday to work to 15 November as a more realistic date. Board papers go out on 8 October.

**Kiosks.** Marguerite is happy with the kiosk plan. Outstanding action: get her the support contract numbers she requested.

**Budget.** GBP 61,000 spent as at the 5 September finance report. Prisha expects this to be nearer GBP 70,000 once the licence renewal lands.

**Old system.** Decommissioning is booked for December. It cannot begin until 30 days after go live.

**Two things worth flagging**

- The plan date (1 November) and the date branch managers are working to (15 November) don't currently match, and board papers go out on 8 October. Worth deciding before then which date the papers should carry.
- Testing is three branches into eleven with go live around five to seven weeks out.

One assumption to check: I've read "the 15th" and "the 8th" as 15 November and 8 October respectively, correct these if I've got them the wrong way round.

## A guide-informed attempt

This is the internal update starter from [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md), used unchanged, on the same notes.

```text
Turn the notes below into a short internal update for the library service team.

Keep the tone clear and straightforward.
Do not invent progress, decisions or deadlines.
Separate what is confirmed from what still needs checking.

Notes:
[the notes above]
```

### Guide-informed output

**Catalogue migration, internal update**

Thursday catch-up, 24 September 2026, Netherford Libraries

**Confirmed**

- **Migration:** All records are now across. The validation fix worked.
- **Testing:** Branch testing began Monday. Three of eleven branches have completed it. Ines reports feedback is positive so far.
- **Training:** Four of six sessions delivered, with 58 people trained.
- **Supplier:** Cardinal have released version 4.2. Marguerite reports search speed is much improved.
- **Kiosks:** Marguerite is happy with the kiosk plan.
- **Budget:** GBP 61,000 spent as at the 5 September finance report.
- **Go live:** The plan still shows 1 November. I asked branch managers on Monday to work to the 15th as a more realistic date. Board papers go out on the 8th.
- **Old system:** Decommissioning is booked for December. It cannot start until 30 days after go live.

**Still to check or confirm**

- **Go live date:** The 1 November plan date and the 15 November date given to branch managers do not currently match. Which date the board papers should carry needs deciding before the 8th.
- **Kiosk support contract numbers:** Still to be sent to Marguerite.
- **Budget position:** Prisha's estimate is nearer GBP 70,000 once the licence renewal lands. This is not yet reflected in a finance report.
- **Remaining testing and training:** Eight branches still to test; two training sessions still to run. No dates recorded for these in the catch-up.
- **Decommissioning date:** Depends on the confirmed go live date, so the December booking should be checked once that is settled.

For repository formatting, both raw outputs had their dash glyphs and currency symbols rendered as ASCII-safe Markdown. Their wording and meaning are unchanged.

## Short comparison

This is the one test in this repository where the ordinary prompt scored higher than the guide-informed one.

Both caught the go live conflict, both kept Prisha's estimate away from the sourced figure, and both attributed Ines's and Marguerite's impressions to the people who held them rather than stating them as results.

The difference is what the starter's third instruction did. Asked to sort every item into confirmed or still to be checked, the guide-informed output put three things in "Confirmed" that were not: a go live date that two sources disagree about, one person's impression of search speed, and a kiosk plan whose own support numbers have not been sent yet. The ordinary prompt, with no columns to fill, left all three as prose and got them right.

The ordinary prompt also disclosed an inference it had made, that "the 15th" and "the 8th" meant November and October, and asked to be corrected. The guide-informed output made the same inference silently.

That result changed the starter. The rest of this page is the re-run.

## Attempt 3: the starter, rewritten

The failure above was structural. A two-column sort has nowhere to put an item that is contested rather than merely unchecked, so the third instruction was rewritten to give it one, and to say plainly that an impression is not confirmation:

```text
Turn the notes below into a short internal update for the library service team.

Keep the tone clear and straightforward.
Do not invent progress, decisions or deadlines.
Sort each point into what is confirmed, what still needs checking, or what the notes disagree about.
Only call something confirmed if the notes actually settle it. Somebody's impression is not confirmation.

Notes:
[the same notes as above]
```

The notes did not change. The ordinary prompt did not change. Both were run again in fresh isolated contexts.

### Revised starter output

**Catalogue migration, team update**

Thursday catch-up, 24 September 2026, Netherford Libraries

**Confirmed**

- **Migration.** All records are across. The validation fix worked.
- **Testing.** Branch testing started Monday. Three of eleven branches have been through it.
- **Training.** Four of the six sessions are complete, with 58 people trained.
- **Supplier.** Cardinal have released version 4.2.
- **Budget.** GBP 61,000 spent as at the 5 September finance report.
- **Old system.** Decommissioning is booked in for December, and cannot start until 30 days after go live.

**Still to check or do**

- **Testing feedback.** Ines reports feedback is positive so far. That is an early impression, not a validated result, eight branches remain untested.
- **Search speed.** Marguerite said search speed in 4.2 is much better. Not yet measured or verified on our side.
- **Kiosks.** Marguerite is happy with the kiosk plan. The support contract numbers she asked for still need to be sent to her.
- **Budget position.** Prisha's estimate is nearer GBP 70,000 once the licence renewal lands. The GBP 61,000 figure is the last confirmed number; the GBP 70,000 figure is not yet in a finance report.

**Where the notes disagree**

- **Go live date.** The plan still shows 1 November. Branch managers were told on Monday to work to 15 November as more realistic. These two dates have not been reconciled, and board papers go out on the 8th. Which date the board sees needs deciding before then.
- **Knock-on for decommissioning.** Because decommissioning cannot start until 30 days after go live, the December booking depends on which go live date holds. Worth checking against whichever date is settled.

### Ordinary prompt, run again on the same notes

**Catalogue Migration, Team Update**

Netherford Libraries, Thursday catch-up, 24 September 2026

**Migration.** All records are now across. The validation fix worked as intended.

**Testing.** Branch testing began Monday. Three of eleven branches have been through it so far. Ines reports feedback is positive to date.

**Training.** Four of six sessions complete, with 58 people trained.

**Supplier.** Cardinal have released version 4.2. Marguerite has noted a marked improvement in search speed.

**Go live.** The plan still shows 1 November. I asked branch managers on Monday to work towards the 15th as a more realistic date, worth noting the plan and the working assumption currently differ. Board papers go out on the 8th.

**Kiosks.** Marguerite is happy with the kiosk plan. Outstanding: the support contract numbers she asked for still need to go to her.

**Budget.** GBP 61,000 spent as at the 5 September finance report. Prisha expects this to be nearer GBP 70,000 once the licence renewal lands.

**Old system.** Decommissioning is booked for December. It cannot begin until 30 days after go live.

Two things to flag: the go live date discrepancy (plan says 1 November, managers working to the 15th) will need resolving before board papers go out on the 8th, and the December decommissioning slot depends on the actual go live date holding.

### What the re-run showed

The rewrite fixed the defect it was written for. All three items that had been misfiled under "Confirmed" moved: Marguerite's search speed impression and the unsigned kiosk plan into "still to check", and the disputed go live date into the new third group, where it reads as the decision it actually is. The starter also separated the fact that testing has begun from Ines's impression of how it is going, which no earlier run did.

It did not make the starter score higher than an ordinary prompt. The ordinary prompt, unchanged, on unchanged notes, scored 30 out of 30 this time against the starter's 29. It had scored 29 the run before, on the same prompt and the same notes.

That one-point movement, on an identical prompt and identical input, is the same size as the difference this test set out to measure. [Read the scored review](../evaluations/netherford-internal-update-review.md).
