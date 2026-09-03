# Netherford Libraries: Internal Update Example

**Everything in this example is fictional.** Netherford Libraries, Cardinal Systems, Ines Adeyemi, Marguerite Loxley, Prisha Bhatt and the catalogue migration were invented from scratch for this repository.

This tests the first starter prompt in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md), the one that turns notes into a short internal update. That starter promises three things: do not invent progress, do not invent decisions or deadlines, and separate what is confirmed from what still needs checking.

Two attempts were run. This page shows the second, harder one. [The review](../evaluations/netherford-internal-update-review.md) explains why there were two and scores this attempt.

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

The ordinary prompt also disclosed an inference it had made, that "the 15th" and "the 8th" meant November and October, and asked to be corrected. The guide-informed output made the same inference silently. [Read the scored review](../evaluations/netherford-internal-update-review.md).
