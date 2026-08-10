# Thornfield Team Connect: Prompting Example

**Everything in this example is fictional.** Thornfield Facilities Group, Merewick Hall, Priya Chandran, Rosalind Whitmore, Dean Okafor, Grace Lindqvist and the Team Connect event were invented from scratch for this repository.

## The workplace situation

Thornfield Facilities Group manages and maintains commercial office buildings across the South East. Priya Chandran is its Office & Events Coordinator. Every quarter, Thornfield brings four regional teams together for a half-day Team Connect event with workshops, a leadership update and lunch.

The next event is on Thursday 10 September 2026. Merewick Hall is holding the Garden Room provisionally. Priya needs to respond before Friday 4 September at 5pm so the venue can prepare a quote. The relevant information is scattered across an email, a Teams message and Priya's notes.

## Source information

### Source 1: Venue email

**From:** Rosalind Whitmore, Venue Coordinator at Merewick Hall

**Sent:** Wednesday 12 August 2026

**Subject:** Thornfield Team Connect, provisional hold

> Hi Priya,
>
> Thanks for the call.
>
> I've put a provisional hold on the Garden Room for Thursday 10 September, 9:30am to 2:30pm, for 45 guests.
>
> Standard room hire is GBP 280 for the half day, plus catering.
>
> Our standard buffet lunch is GBP 14.00 per head.
>
> Please send final numbers and dietary requirements by Friday 4 September at 5pm. Once I have those, I can send you a proper quote.
>
> Best,
> Rosalind

### Source 2: Teams message

**From:** Dean Okafor

**Sent:** Thursday 20 August 2026

> Priya, RSVP count is in.
>
> Final number is 52 attending, up from the 45 we first said. Finance and ops are both sending extra people this time.
>
> Also, Grace Lindqvist from the Reading office flagged that she's got a serious nut allergy. Wanted to make sure whoever's doing catering knows.
>
> She said it's fine to mention as long as they take it seriously. Obviously don't want it lost in the shuffle.

### Source 3: Priya's note to self

**Undated**

> Reminder: Merewick's coordinator mentioned on the phone earlier this year that they sometimes do a loyalty discount for repeat bookings. Think she said 10%.
>
> Didn't get that in writing though.
>
> Worth asking again.

### Source 4: Finance reminder

**From:** Thornfield Finance Team

**Sent:** Monday 16 March 2026

> Reminder: any single event or venue booking over GBP 1,000 total needs Finance sign-off before being confirmed with the supplier, regardless of budget code.
>
> Bookings of GBP 1,000 or less can be approved directly by the department lead.

### Source 5: Venue follow-up

**From:** Rosalind Whitmore

**Sent:** Tuesday 1 September 2026

> Hi Priya,
>
> Just a reminder that our cut-off for changing numbers or menu requirements is Friday 4 September at 5pm.
>
> Anything after that we can't guarantee.
>
> Let me know when you're ready.
>
> Best,
> Rosalind

## An ordinary first attempt

The baseline prompt was deliberately ordinary, not absurdly weak. It used the exact source information above.

```text
Can you write an email to the venue confirming our event details based on the notes below? Thanks
```

### Baseline output

**Subject:** Thornfield Team Connect, 10 September

Hi Rosalind,

Please update the provisional hold for the Garden Room on Thursday 10 September, 9:30am to 2:30pm, to 52 guests.

For catering, please note that one attendee has a serious nut allergy. Could you confirm how this can be accommodated safely?

Please send a formal quote based on the final number, and let me know whether a 10% loyalty discount is available for this repeat booking. We will need Finance sign-off before confirming the booking.

Best,

Priya

Draft for Priya to review and send.

## A guide-informed attempt

This prompt used the habits in [Prompting Fundamentals: Give AI a Better Brief](../guides/prompting-fundamentals.md). It used the same source information, with no extra factual evidence.

```text
Task:
Help Priya draft a reply to the venue before its deadline. The reply should provide the details the venue needs to prepare a proper quote. It must not claim that the booking is finally confirmed.

Use these sources:
[The five sources above]

Important constraints:
- Treat a later source as current when it clearly updates an earlier provisional detail.
- Separate confirmed information from assumptions or unconfirmed possibilities.
- Do not invent facts or silently fill gaps.
- Minimise unnecessary personal information when raising dietary needs.
- Flag anything that prevents a safe final confirmation.
- Keep any consequential internal approval and external sending with Priya.

Output:
- A concise, polite email to the venue.
- Then "Priya still needs to check" with the necessary checks or approvals.

Before you finish:
- Point out important missing or pending information.
- Do not invent facts to fill gaps.
```

### Guide-informed output

**Subject:** Thornfield Team Connect - quote request

Hi Rosalind,

Thank you for the reminder.

Please could you prepare a quote for the Garden Room on Thursday 10 September, 9:30am to 2:30pm, for 52 attendees, including the standard buffet lunch.

One attendee has a serious nut allergy. Please let us know whether you can safely accommodate this and what catering controls or alternatives would be needed.

As a repeat customer, could you also confirm whether a loyalty discount is available?

The booking remains provisional while we review the quote and complete our internal approval.

Best,

Priya

### Priya still needs to check

- Whether there are any other dietary requirements to include before the 4 September, 5pm deadline.
- Written confirmation that the serious nut allergy can be safely accommodated.
- The final quoted total and any loyalty discount.
- Finance sign-off before confirming if the total exceeds &pound;1,000. The standard room hire plus buffet estimate is &pound;1,008 before any discount or other charges.
- Approve this draft and send it to the venue.

For repository formatting, the raw guide-informed output's dash glyph and currency symbols are rendered with ASCII-safe Markdown. Its wording and meaning are unchanged.

## Short comparison

Both outputs were already strong. They used the current 52-person headcount, kept the booking provisional, asked for a quote, kept the allergy unnamed and treated the discount as unconfirmed. The guide-informed output made the pending checks and Priya's responsibilities more explicit. It made the conditional Finance threshold and standard-rate estimate visible, and avoided anchoring the venue to the uncertain 10% discount figure. [Read the scored review](../evaluations/thornfield-team-connect-prompting-review.md).
