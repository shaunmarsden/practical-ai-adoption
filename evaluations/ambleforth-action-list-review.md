# Ambleforth Community Housing: Action List Review

This is a project-authored scoring rubric. It is not endorsed by any organisation.

This scores the [Ambleforth action list example](../examples/ambleforth-action-list-example.md), which tests the action list starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 22/30 | 29/30 |
| Automatic failure | No | No |

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 3 | 5 | The baseline stated three specifics the notes do not contain: a month for "the end of the month", an owner for the fire door audit, and a deadline for it. The guide-informed output stated each as missing. |
| Task alignment | 4 | 4 | Both produced a usable action list that separated real actions from decisions. The guide-informed output collapsed the fire door audit into its reassignment, losing the audit itself as an outstanding action, which the baseline kept as a separate item. |
| Use of context | 4 | 5 | Both used all nine items. The guide-informed output also recorded that the notes never name the month for the lift contract, and that the only date near the fire door audit is Priya's return rather than a deadline. |
| Unknowns, updates and conflicts | 3 | 5 | The core difference. The baseline flagged three gaps correctly and filled three others with plausible specifics. The guide-informed output left every unstated owner and date unstated. |
| Practical usefulness | 4 | 5 | Both are easy to act on. The baseline's prioritisation is helpful but partly rests on a link between the service charge check and the 2 October print slot that the notes do not make. The guide-informed gap summary is directly actionable and grounded. |
| Responsible use and human control | 4 | 5 | Neither took any action or handled personal information badly. The baseline assigned ownership to Rowan without a basis in the notes, which quietly moves a decision that had been left to a person. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What the notes were designed to test

The notes contained one item with both a named owner and a stated date, and eight that were incomplete or not actions at all. What each run did with them:

| Item | What the notes actually say | Baseline | Guide-informed |
| --- | --- | --- | --- |
| Contractor framework | Owner and date both stated | Correct | Correct |
| Damp survey | Owner stated, no date | Said date not stated | Said date missing |
| Tenant newsletter | Date stated, no owner | Said no owner agreed | Said owner missing |
| Service charge figures | Owner implied only, never named | Kept it as "someone in Finance", but added an unsupported link to the 2 October slot | Said owner missing and date missing |
| Lift maintenance | "the end of the month", no month named | Stated "End of September" | Noticed no month is named |
| Quarterly inspections | Explicitly dropped | Listed as a decision, not an action | Listed as a decision, not an action |
| Fire door audit | Priya is the former owner and on leave | Named Rowan "by implication" and set a deadline | Said owner missing, did not assign anyone |
| Void works budget | A decision | Listed as a decision | Listed as a decision |
| Bin store | Already handled | Listed as closed | Listed as closed |

Both runs handled the three items that are not outstanding actions correctly. That is worth stating plainly, because it is the part an ordinary prompt is often assumed to get wrong and did not.

## Automatic failure review

**Baseline: No.** It invented three specifics, which is a scoring weakness rather than an automatic failure: each is visible as an assertion a reviewer can check against the notes, it did not claim any action had been completed, and it did not remove a human decision. The Rowan attribution is the most serious of the three because it is the one a reader is most likely to accept without checking.

**Guide-informed: No.** It asserted no owner or date the notes do not state, claimed nothing was done, and left the reassignment decision with a person.

## What improved

The guide-informed output is not better organised than the baseline. The baseline's grouping is arguably clearer to skim. The improvement is confined to fidelity:

- It did not name a month the notes never name.
- It did not name an owner the notes never agreed.
- It did not turn a colleague's return-from-leave date into a deadline.
- It said "missing" six times, where the baseline said it three times and guessed three times.

That is what the starter's last line asks for, and it is the whole of the difference.

## What it still got wrong

The guide-informed output lost something the baseline kept. Its item 6 is "find a new owner for the audit", so the fire door audit itself disappears as a piece of outstanding work. The baseline listed both the reassignment and the audit as separate items. A reader working only from the guide-informed list could reassign the audit and believe the item was closed.

Its closing summary also says "three of the six actions have no owner" and then names the newsletter, service charge check and lift contract. That is correct, but the fire door audit also has no owner, so the count depends on treating "find a new owner" as an action that Rowan owns by default, which the output does not say anywhere else.

## What a person still has to check

- Which month "the end of the month" means for the lift maintenance contract.
- Who is picking up the tenant newsletter, before the 2 October print slot.
- Which named person in Finance is checking the service charge figures.
- Who takes the fire door audit while Priya is on leave, and that the audit itself is tracked, not just the reassignment.
- Whether Marcus has a date for the damp survey brief.

## What this test supports

- On these notes, the starter's "say that it is missing, do not guess" instruction changed the result. The ordinary prompt filled three gaps with plausible specifics; the starter did not.
- The failure mode of an ordinary prompt here was not omission or a wrong summary. It was confident completion of things nobody had said.
- Both prompts correctly excluded a dropped item, a decision and an already-answered query from the action list.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- It does not show that the starter improves any other kind of task, or the other two starters in the same guide, which remain untested.
- It does not show a real-world business outcome or measured time saving.
- It does not include an independent external user's result.
- Both runs used the same model. A different model, or the same model on another day, may not repeat either result.

## Test integrity

Both runs were made in fresh, isolated contexts. Each runner received only its own prompt and the fictional notes. Neither received the other run, the rubric, the automatic-failure criteria, the trap list or any indication that this was a test or a comparison. The answer key was written before either run and was not visible to either.

Both runs used Claude Opus 5. The outputs are reproduced with only dash glyphs and currency symbols normalised to ASCII.

A contamination risk remains, and it is the same one the other reviews here carry: the same person designed the scenario, wrote the answer key, ran both prompts and scored both outputs. A single scorer cannot tell a real seven-point gap from their own consistency, so treat the gap as directional rather than measured.

## Next evidence

Test the other two starters in the same guide, the internal update and the meeting agenda, which currently have no test of their own. Or use this starter on a real set of low-risk internal notes when one naturally arises, and log what it missed.
