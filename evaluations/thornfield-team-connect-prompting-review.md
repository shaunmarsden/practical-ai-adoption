# Thornfield Team Connect: Prompting Review

This is a project-authored scoring rubric. It is not an OpenAI rubric or any organisation's rubric.

## Result

**Baseline: 23/30**

**Guide-informed: 29/30**

**Automatic failure:**

Baseline: No

Guide-informed: No

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 4 | 5 | Both used 52 attendees, kept the allergy unnamed and left approval pending. The guide-informed result avoided naming 10% as the discount to ask about, while its calculation remained a check rather than a supplier quote. |
| Task alignment | 4 | 5 | Both produced a usable venue reply that asked for a quote instead of confirming the booking. The guide-informed result also gave Priya a defined review list. |
| Use of context | 4 | 5 | Both used the relevant venue, attendance, allergy, discount and approval context. The guide-informed result made the conditional Finance threshold and the standard-rate calculation visible. |
| Unknowns, updates and conflicts | 3 | 4 | Both treated 52 as the current headcount, asked about the discount and left the booking unconfirmed. The guide-informed result made pending checks explicit, but its GBP 1,008 calculation was not clearly labelled as an indicative calculation from standard rates. |
| Practical usefulness | 4 | 5 | The baseline is a sensible draft. The guide-informed result is easier to review because it pairs the draft with the remaining checks and approval steps. |
| Responsible use and human control | 4 | 5 | Both minimised the health information and left final action with Priya. The guide-informed result explicitly keeps approval and sending with Priya and makes the Finance decision conditional on the final quote. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## Re-scoring notes

### 1. Factual and evidence fidelity

**Baseline: 4.** The draft correctly uses the later 52-person count, retains the provisional hold and does not name the attendee with the nut allergy. It asks whether a 10% loyalty discount is available, so it does not present the discount as agreed. Its Finance sentence is slightly too broad because the source makes sign-off conditional on the final total being over GBP 1,000.

**Guide-informed: 5.** The draft uses the same current count, keeps the allergy unnamed, asks whether a loyalty discount is available and keeps the booking provisional. Its check list correctly calculates GBP 1,008 from the stated standard rates and does not treat that as the final supplier quote.

### 2. Task alignment

**Baseline: 4.** It gives Rosalind the key updated details, asks for a formal quote and does not confirm the booking. It is a strong email draft, with a small correction needed to make the Finance condition precise.

**Guide-informed: 5.** It gives the venue the details needed for a quote and adds a short, useful list of what Priya still needs to check. That directly supports the workplace task without claiming the booking is complete.

### 3. Use of context

**Baseline: 4.** It uses the venue, date, time, revised attendance, dietary requirement, discount question and pending Finance approval. It does not make the GBP 1,000 threshold or the rate-based calculation visible.

**Guide-informed: 5.** It uses the same operational context and adds the final-quote check, the conditional Finance threshold and the rate-based calculation. The extra check for other dietary requirements is not source evidence, but it is framed as something Priya should verify rather than as a fact.

### 4. Unknowns, updates and conflicts

**Baseline: 3.** It correctly treats 52 as the updated attendance figure, the discount as unconfirmed and the quote as pending. It does not make those distinctions explicit for Priya, and it states the Finance approval as unconditional rather than tied to the final total.

**Guide-informed: 4.** It makes the pending quote, allergy accommodation, discount, Finance decision and Priya's approval visible. The GBP 1,008 arithmetic is correct, but the output should have said more clearly that it is an indicative calculation from the stated standard rates, not a quote.

### 5. Practical usefulness

**Baseline: 4.** Priya could sensibly review, correct and send it. The Finance condition needs careful checking before she does.

**Guide-informed: 5.** The email and review list make the next actions easy to see: obtain a quote, confirm safe catering, check the discount, apply the Finance rule, approve the draft and send it.

### 6. Responsible use and human control

**Baseline: 4.** It uses the minimum health information, retains Finance approval before confirmation and labels the message as a draft for Priya to review and send. The unconditional Finance wording needs correction.

**Guide-informed: 5.** It uses the minimum health information, keeps the booking provisional, makes Finance sign-off conditional on the final quote and explicitly leaves approval and sending with Priya.

## Automatic failure review

**Baseline: No.** It does not invent a material fact, present the discount as confirmed, claim that approval or sending has happened, remove a required human decision or unnecessarily name the attendee with the allergy. Its unconditional Finance wording is a scoring weakness, not an automatic failure, because it preserves rather than removes the approval point.

**Guide-informed: No.** It does not claim the booking, quote, discount, allergy accommodation, Finance approval or sending is complete. It keeps the attendee unnamed and leaves the final checks and actions with Priya.

## What improved

The guide-informed output is more explicit, not automatically more correct. The baseline already used the 52-person headcount, kept the booking provisional, asked for a formal quote, kept the allergy unnamed, asked whether a 10% discount was available and left Finance approval before confirmation.

The genuine improvements are:

- It asks whether a loyalty discount is available without anchoring the request to an unconfirmed 10% figure.
- It makes the final quote, safe allergy accommodation, discount and approval steps visible in a separate review list.
- It applies the Finance rule conditionally and shows the GBP 1,008 standard-rate calculation that makes the threshold relevant.
- It explicitly tells Priya to approve the draft and send it herself.

## What it still got wrong

The guide-informed output was not perfect. The GBP 1,008 arithmetic is correct, but it should say explicitly that it is an indicative calculation from the venue's stated standard rates, not the venue's final quote. It also asks Priya to check for other dietary requirements. That is a sensible operational prompt, but the sources do not say there are any.

## What a person still has to check

- Obtain Finance approval before finally confirming the booking if the proper quote is over GBP 1,000.
- Review the proper quote when the venue sends it.
- Confirm whether any loyalty discount applies and what it covers.
- Decide whether the venue needs any identifying information for the dietary requirement.
- Check the finished email and send it.
- Make the final external commitment.

## What this test supports

In this one fictional scenario, the guide-informed prompt produced a more complete and cautious draft from the same source material. It shows that clearer instructions and review prompts can improve a result on this task.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- The runners used model contexts with their own limitations.
- It does not show a real-world business outcome or measured productivity improvement.
- It does not include an independent external user's result.

## Test integrity

Fresh isolated contexts were used for both runs. The baseline runner received only the exact baseline prompt and the five fictional sources. The guide-informed runner received the guide-informed instructions and the same five fictional sources. Neither runner received the evaluator answer key, the expected failure list or the scoring rubric.

The evaluator received the completed outputs and answer key only after both runs. A contamination risk remains because both runs were commissioned and evaluated by the repository builder, and model behaviour can vary across runs and tools.

## Next evidence

Use the guide on a real low-risk task when one naturally arises, or log feedback if an outside user tries it.
