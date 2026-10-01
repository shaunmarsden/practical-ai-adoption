# Ambleforth Community Housing: Action List Review

This is a project-authored scoring rubric, not one endorsed by any organisation.

This scores the [Ambleforth action list example](../examples/ambleforth-action-list-example.md), which tests the action list starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

The starter scored seven points higher than the ordinary prompt on the first run. Repeat runs narrowed the gap but didn't close it.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 22/30 | 29/30 |
| Automatic failure | No | No |

## Repeat runs

The scores above come from one run of each prompt, and the [internal update test](netherford-internal-update-review.md) later showed that one prompt can move a point on its own. So I re-ran both prompts twice more on the same notes, in fresh isolated contexts.

| Prompt | Run 1 | Run 2 | Run 3 | Range |
| --- | ---: | ---: | ---: | --- |
| Ordinary prompt | 22/30 | 24/30 | 27/30 | 22 to 27 |
| Guide-informed starter | 29/30 | 30/30 | 29/30 | 29 to 30 |

The gap holds but is narrower than one run suggested. The starter beat the baseline in every pairing, by between two and eight points, not seven.

The spread matters more. The baseline moved five points across three runs of the same prompt on the same notes. The starter moved one. The baseline failed the two traps differently:

| Trap | Runs where the ordinary prompt failed it |
| --- | --- |
| Named an owner for the fire door audit that the notes never name | 3 of 3 |
| Turned "the end of the month" into a specific month | 2 of 3 |

The best baseline run caught the month problem, as the starter does, and scored 27. The worst wrote "End of September", handed the fire door audit to Rowan, and scored 22.

So the case for this starter is not that it beats asking plainly, which sometimes gets you 27. But it might get you 22, and you can't tell which without checking the notes yourself. That checking is the work the starter was meant to save.

The invented owner never varied: twice Rowan by name, once "probably you". The notes say only that the audit needs a new owner. All three starter runs said the owner was missing.

[Which AI Mistakes Actually Get Through](https://github.com/shaunmarsden/practical-ai-sales-workflows/blob/main/guides/which-ai-mistakes-get-through.md), in a sibling repository, sorts this among the defects a careful reader is unlikely to catch. A list with an owner on every row looks finished.

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 3 | 5 | The baseline stated three specifics the notes don't contain: a month for "the end of the month", an owner for the fire door audit, and a deadline for it. The guide-informed output said each was missing. |
| Task alignment | 4 | 4 | Both produced a usable action list that kept real actions apart from decisions. The guide-informed output folded the fire door audit into its reassignment, so the audit itself dropped off as outstanding work. The baseline kept it as a separate item. |
| Use of context | 4 | 5 | Both used all nine items. The guide-informed output also noted that the notes never name the month for the lift contract, and that the only date near the fire door audit is Priya's return, not a deadline. |
| Unknowns, updates and conflicts | 3 | 5 | This is the core difference. The baseline flagged five gaps correctly and filled three others with plausible specifics. The guide-informed output left every unstated owner and date unstated. |
| Practical usefulness | 4 | 5 | Both are easy to act on. The baseline's priorities help, but they partly rest on a link between the service charge check and the 2 October print slot that the notes don't make. The guide-informed gap summary is grounded and ready to act on. |
| Responsible use and human control | 4 | 5 | Neither took any action or mishandled personal information. The baseline gave ownership to Rowan with no basis in the notes, which quietly takes a decision that had been left to a person. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What the notes tested

One item had both a named owner and a stated date. The other eight were incomplete or not actions at all.

| Item | What the notes say | Baseline | Guide-informed |
| --- | --- | --- | --- |
| Contractor framework | Owner and date both stated | Correct | Correct |
| Damp survey | Owner stated, no date | Said date not stated | Said date missing |
| Tenant newsletter | Date stated, no owner | Said no owner agreed | Said owner missing |
| Service charge figures | Owner implied only, never named | Kept it as "someone in Finance", but added an unsupported link to the 2 October slot | Said owner missing and date missing |
| Lift maintenance | "the end of the month", no month named | Stated "End of September" | Noticed no month is named |
| Quarterly inspections | Dropped | Listed as a decision, not an action | Listed as a decision, not an action |
| Fire door audit | Priya is the former owner and on leave | Named Rowan "by implication" and set a deadline | Said owner missing, didn't assign anyone |
| Void works budget | A decision | Listed as a decision | Listed as a decision |
| Bin store | Already handled | Listed as closed | Listed as closed |

Both runs handled the three items that aren't outstanding actions correctly.

## Automatic failure review

The baseline didn't fail. It invented three specifics, which costs points, but a reviewer can check each against the notes. It claimed no action was done. The Rowan attribution is the most serious, because a reader is most likely to accept it unchecked.

The guide-informed output didn't fail either. It stated no owner or date the notes don't state, and left the reassignment decision with a person.

## What improved

The guide-informed output isn't better organised, and the baseline's grouping is arguably easier to skim. The gain is in fidelity alone. It flagged all eight gaps in the notes, seven of them with the word "missing". The baseline flagged five and guessed at three. That is what the starter's last line asks for ("say that it is missing, do not guess"), and it is the whole of the difference.

## What it still got wrong

The starter lost something the baseline kept. Its item 6 is "find a new owner for the audit", so the audit itself vanishes as outstanding work. A reader could reassign the audit and think the item was closed.

This repeated in two of the three starter runs. The third added a closing note: "Item 6 is the only one with a named person attached to it in the notes, but she is the outgoing owner, not the new one, so the live owner is still missing." That run scored 30. So the collapse comes from the starter's wording, not chance, and it is the difference between its 29s and its 30.

Its closing summary also says "three of the six actions have no owner" and names the newsletter, service charge check and lift contract. The fire door audit has no owner either, and the count only works if "find a new owner" is an action Rowan owns by default.

## What a person still has to check

- Which month "the end of the month" means for the lift maintenance contract.
- Who is picking up the tenant newsletter, before the 2 October print slot.
- Which named person in Finance is checking the service charge figures.
- Who takes the fire door audit while Priya is on leave, and that the audit itself is tracked, not just the reassignment.
- Whether Marcus has a date for the damp survey brief.

## What this test does not support

- It is one fictional scenario, run three times per prompt. Three runs of one scenario are not three scenarios.
- It doesn't show the starter improves any other task, or anything about the other two starters in the guide. It shows no real business outcome or time saving.
- All runs used the same model, and a different model may not repeat either result.
- I designed the scenario, wrote the answer key, ran every prompt and scored every output, so it isn't independent validation and has no outside user's result. Repetition deals with run-to-run noise and nothing else. A scoring bias held across six runs looks like a real effect, so treat the gap as a direction, not a measurement.

## Test integrity

I ran six runs, each in a fresh isolated context. Each got only its own prompt and the fictional notes: no other runs, rubric, automatic-failure criteria, trap list, or sign that this was a test. I wrote the answer key before any run. All six used Claude Opus 5. The outputs are reproduced with only dash glyphs and currency symbols changed to ASCII.

The [worked example](../examples/ambleforth-action-list-example.md) shows the first run of each prompt. I scored the repeat runs but haven't reproduced them.

## Next evidence

Use the starter on real low-risk internal notes when some come up, and log what it missed. The most valuable evidence is someone other than me scoring these six outputs against the same rubric.
