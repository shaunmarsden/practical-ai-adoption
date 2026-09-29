# Thornfield Team Connect: Prompting Review

This is a project-authored scoring rubric, not an OpenAI rubric or any organisation's rubric.

I gave an ordinary prompt and a guide-informed prompt the same five fictional sources and scored the two venue emails they wrote. The [worked example](../examples/thornfield-team-connect-prompting-example.md) has both prompts and both outputs.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 24/30 | 30/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 4 | 5 | Both used 52 attendees, kept the allergy unnamed and left approval pending. The guide-informed draft didn't name 10% as the discount to ask about, and it treated its own sum as a check, not a supplier quote. |
| Task alignment | 4 | 5 | Both wrote a usable reply that asked for a quote rather than confirming the booking. The guide-informed draft also gave Priya a list of what to check. |
| Use of context | 4 | 5 | Both used the venue, attendance, allergy, discount and approval details. The guide-informed draft also showed when Finance has to sign off and the sum from the standard rates. |
| Unknowns, updates and conflicts | 4 | 5 | Both treated 52 as the current headcount, asked about the discount and left the booking unconfirmed. The baseline made the Finance condition too broad. The guide-informed draft listed the checks still to do and called GBP 1,008 an estimate from the standard rates. |
| Practical usefulness | 4 | 5 | The baseline is a sensible draft. The guide-informed draft is easier to review because the remaining checks and approvals sit beside it. |
| Responsible use and human control | 4 | 5 | Both kept health details to a minimum and left the final action with Priya. The guide-informed draft said approval and sending were hers, and tied the Finance decision to the final quote. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## Re-scoring notes

### 1. Factual and evidence fidelity

**Baseline: 4.** It uses the later count of 52, keeps the hold provisional and doesn't name the attendee with the nut allergy. It asks whether a 10% loyalty discount is available, so it doesn't present the discount as agreed. Its Finance sentence is a little too broad: the source only needs sign-off if the final total is over GBP 1,000.

**Guide-informed: 5.** It uses the same count, keeps the allergy unnamed, asks whether a loyalty discount is available and keeps the booking provisional. Its check list works out GBP 1,008 correctly from the standard rates and doesn't treat that as the final quote.

### 2. Task alignment

**Baseline: 4.** It gives Rosalind the updated details, asks for a formal quote and doesn't confirm the booking. It's a strong draft that needs one small fix, to the Finance condition.

**Guide-informed: 5.** It gives the venue what it needs to quote and adds a short list of what Priya still has to check. It doesn't claim the booking is done.

### 3. Use of context

**Baseline: 4.** It uses the venue, date, time, new attendance, dietary need, discount question and pending Finance approval. It doesn't show the GBP 1,000 threshold or the sum from the rates.

**Guide-informed: 5.** It uses the same details and adds the final-quote check, the Finance threshold and the sum. Its check for other dietary requirements isn't in the sources, but it's framed as something Priya should confirm, not as a fact.

### 4. Unknowns, updates and conflicts

**Baseline: 4.** It treats 52 as the updated attendance, the discount as unconfirmed and the quote as pending. It states Finance approval as always needed rather than tied to the final total. That's a minor fix to an otherwise strong draft.

**Guide-informed: 5.** It shows the pending quote, the allergy arrangements, the discount, the Finance decision and Priya's approval. The GBP 1,008 sum is right, and it calls it an estimate from the standard rates, not a quote.

### 5. Practical usefulness

**Baseline: 4.** Priya could review, correct and send it. She needs to check the Finance condition first.

**Guide-informed: 5.** The email and the list make the next steps plain: get a quote, confirm safe catering, check the discount, apply the Finance rule, approve the draft and send it.

### 6. Responsible use and human control

**Baseline: 4.** It uses the least health information needed, keeps Finance approval before confirmation and labels the message as a draft for Priya to review and send. The Finance wording needs fixing.

**Guide-informed: 5.** It uses the least health information needed, keeps the booking provisional, ties Finance sign-off to the final quote and leaves approval and sending with Priya.

## Automatic failure review

**Baseline: No.** It doesn't invent a material fact, present the discount as confirmed, claim that approval or sending has happened, remove a human decision or name the attendee with the allergy. Its Finance wording costs it marks but isn't an automatic failure, because it keeps the approval step rather than removing it.

**Guide-informed: No.** It doesn't claim the booking, quote, discount, allergy arrangements, Finance approval or sending is done. It keeps the attendee unnamed and leaves the final checks and actions with Priya.

## What improved

The guide-informed draft spells more out, but that doesn't make it more correct. The baseline already used the 52-person headcount, kept the booking provisional, asked for a formal quote, kept the allergy unnamed, asked whether a 10% discount was available and left Finance approval until before confirmation.

The guide-informed draft did better in four ways. It asked about a loyalty discount without tying the request to the unconfirmed 10% figure. It put the final quote, safe allergy arrangements, discount and approval steps in a separate review list. It applied the Finance rule only if the total goes over the limit, and showed the GBP 1,008 sum that makes the rule relevant. And it told Priya to approve the draft and send it herself.

## What it still got wrong

The guide-informed draft has no material factual error in the areas I scored. It asks Priya to check for other dietary requirements. That's a sensible prompt, but the sources don't say there are any. It's framed as a check, not a claim that more exist.

## What a person still has to check

- Get Finance approval before confirming the booking if the proper quote is over GBP 1,000.
- Review the proper quote when the venue sends it.
- Confirm whether any loyalty discount applies and what it covers.
- Decide whether the venue needs anything that identifies the person with the dietary requirement.
- Check the finished email and send it.
- Make the final commitment to the venue.

## What this test supports

In this one fictional scenario, the guide-informed prompt produced a more complete and careful draft from the same sources. It shows that clearer instructions and review prompts can improve the result on this task.

## What this test does not support

- It's one fictional scenario.
- I ran it myself, so it isn't independent validation.
- The runs used model contexts with their own limits.
- It doesn't show a real business outcome or a measured productivity gain.
- It doesn't include a result from an outside user.

## Test integrity

I ran each prompt in a fresh, separate context. The ordinary prompt got only its exact wording and the five fictional sources. The guide-informed prompt got its instructions and the same five sources. Neither saw the answer key, the list of expected failures or the scoring rubric.

I saw the outputs and the answer key only after both runs. The result could still be skewed, because I set up and scored both runs, and a model can behave differently from one run or tool to the next.

## Next evidence

Next I'll use the guide on a real low-risk task when one comes up, or log feedback if an outside user tries it.
