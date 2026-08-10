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
| Factual and evidence fidelity | 4 | 5 | Both used the current headcount and did not invent approval. The guide-informed result also kept the discount clearly unconfirmed. |
| Task alignment | 4 | 5 | Both drafted a usable venue reply. The guide-informed result made the request for a proper quote and provisional status clearer. |
| Use of context | 4 | 5 | Both used the relevant sources. The guide-informed result drew the practical limit from the Finance reminder more clearly. |
| Unknowns, updates and conflicts | 3 | 5 | The baseline did not explain why 52 replaces 45, or what remains pending. The guide-informed result handled the update, quote, discount and approval as unfinished work. |
| Practical usefulness | 4 | 5 | The baseline is a sensible draft. The guide-informed result is more ready for Priya to review because its checks are visible. |
| Responsible use and human control | 4 | 4 | Both minimised the health information and left final action with Priya. The guide-informed result is stronger, but it could have labelled GBP 1,008 explicitly as an indicative calculation rather than leaving that to the reader. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What improved

The guide-informed prompt told the AI what the email was for, what it must not claim and what Priya still needed to own. That changed the result in practical ways:

- It called the 52-person count current without treating the earlier 45-person provisional hold as an unresolved conflict.
- It asked for a quote rather than confirming the booking.
- It asked whether a loyalty discount was available instead of presenting a 10% discount as agreed.
- It kept the dietary requirement operational without naming the attendee.
- It made the internal approval point visible and gave Priya a short review list.

## What it still got wrong

The guide-informed output was not perfect. It described GBP 1,008 as an estimate, which is better than calling it a final quote, but it did not explicitly say that the calculation is indicative and based only on the venue's standard rates. It also asked Priya to check for other dietary requirements. That is a sensible operational prompt, but the sources do not say there are any.

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
