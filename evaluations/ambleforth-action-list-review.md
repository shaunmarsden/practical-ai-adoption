# Ambleforth Community Housing: Action List Review

This is a project-authored scoring rubric, not one endorsed by any organisation.

This scores the [Ambleforth action list example](../examples/ambleforth-action-list-example.md), which tests the action list starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

I gave the same meeting notes to the ordinary prompt and to the starter. The starter scored seven points higher on the first run. Repeat runs narrowed the gap but didn't close it.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 22/30 | 29/30 |
| Automatic failure | No | No |

## Repeat runs

The scores above come from one run of each prompt. The [internal update test](netherford-internal-update-review.md) later showed that the same prompt can move a point on its own. So I re-ran both prompts twice more on the same notes, in fresh isolated contexts, with nothing changed.

| Prompt | Run 1 | Run 2 | Run 3 | Range |
| --- | ---: | ---: | ---: | --- |
| Ordinary prompt | 22/30 | 24/30 | 27/30 | 22 to 27 |
| Guide-informed starter | 29/30 | 30/30 | 29/30 | 29 to 30 |

The gap holds, but it is narrower than one run suggested. The ranges don't overlap, so the starter beat the baseline in every pairing. But the gap is between two and eight points, not the seven the first run showed.

The spread is the number that matters. The baseline moved five points across three runs of the same prompt on the same notes. The starter moved one. Which of the two traps the baseline fell into changed from run to run:

| Trap | Runs where the ordinary prompt failed it |
| --- | --- |
| Named an owner for the fire door audit that the notes never name | 3 of 3 |
| Turned "the end of the month" into a specific month | 2 of 3 |

Its best run caught the month problem, writing "sorted by the end of the month, no owner, and end of which month wasn't nailed down". That is what the starter does, and that run scored 27. Its worst wrote "End of September", handed the fire door audit to Rowan, and scored 22.

So the case for this starter is not that it beats asking plainly. Asking plainly sometimes gets you 27. But it might get you 22, and you can't tell which without checking the notes yourself. That checking is the work the starter was meant to save.

The invented owner never varied. In all three runs the baseline gave the fire door audit to somebody: twice to Rowan by name, and once as "probably you". The notes say only that it needs a new owner and would be sorted out offline. All three starter runs said the owner was missing.

This defect is listed in [Which AI Mistakes Actually Get Through](https://github.com/shaunmarsden/practical-ai-sales-workflows/blob/main/guides/which-ai-mistakes-get-through.md). That page, in a sibling repository, sorts every scored defect across these three projects by whether a careful reader would catch it. This one is on the hard side. An action list with an owner on every row looks finished, and a missing owner is the one thing an action list should bring to light.

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 3 | 5 | The baseline stated three specifics the notes don't contain: a month for "the end of the month", an owner for the fire door audit, and a deadline for it. The guide-informed output said each was missing. |
| Task alignment | 4 | 4 | Both produced a usable action list that kept real actions apart from decisions. The guide-informed output folded the fire door audit into its reassignment, so the audit itself dropped off as outstanding work. The baseline kept it as a separate item. |
| Use of context | 4 | 5 | Both used all nine items. The guide-informed output also noted that the notes never name the month for the lift contract, and that the only date near the fire door audit is Priya's return, not a deadline. |
| Unknowns, updates and conflicts | 3 | 5 | This is the core difference. The baseline flagged three gaps correctly and filled three others with plausible specifics. The guide-informed output left every unstated owner and date unstated. |
| Practical usefulness | 4 | 5 | Both are easy to act on. The baseline's priorities help, but they partly rest on a link between the service charge check and the 2 October print slot that the notes don't make. The guide-informed gap summary is grounded and ready to act on. |
| Responsible use and human control | 4 | 5 | Neither took any action or mishandled personal information. The baseline gave ownership to Rowan with no basis in the notes, which quietly takes a decision that had been left to a person. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What the notes tested

The notes had one item with both a named owner and a stated date. The other eight were incomplete or not actions at all. What each run did with them:

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

Both runs handled the three items that aren't outstanding actions correctly. People often assume an ordinary prompt gets this part wrong. Here it didn't.

## Automatic failure review

The baseline didn't fail automatically. It invented three specifics, which costs points but isn't an automatic failure. A reviewer can check each one against the notes. It didn't claim any action was done, and it didn't take away a human decision. The Rowan attribution is the most serious of the three, because a reader is most likely to accept it without checking.

The guide-informed output didn't fail automatically either. It stated no owner or date the notes don't state, claimed nothing was done, and left the reassignment decision with a person.

## What improved

The guide-informed output isn't better organised. The baseline's grouping is arguably easier to skim. The gain is in fidelity alone.

It didn't name a month the notes never name, or an owner the notes never agreed. It didn't turn a colleague's return from leave into a deadline. It said "missing" six times, where the baseline said it three times and guessed three times. That is what the starter's last line asks for, and it is the whole of the difference.

## What it still got wrong

The guide-informed output lost something the baseline kept. Its item 6 is "find a new owner for the audit", so the audit itself vanishes as outstanding work. The baseline listed the reassignment and the audit as separate items. A reader working only from the guide-informed list could reassign the audit and think the item was closed.

This repeated in two of the three starter runs. The third framed the item the same way, but added a closing note that fixed it: "Item 6 is the only one with a named person attached to it in the notes, but she is the outgoing owner, not the new one, so the live owner is still missing." That run scored 30. So the collapse comes from the starter's wording, not chance, and it is the difference between its 29s and its 30.

Its closing summary also says "three of the six actions have no owner" and names the newsletter, service charge check and lift contract. That is right, but the fire door audit has no owner either. The count only works if "find a new owner" is an action Rowan owns by default, and the output doesn't say that anywhere else.

## What a person still has to check

- Which month "the end of the month" means for the lift maintenance contract.
- Who is picking up the tenant newsletter, before the 2 October print slot.
- Which named person in Finance is checking the service charge figures.
- Who takes the fire door audit while Priya is on leave, and that the audit itself is tracked, not just the reassignment.
- Whether Marcus has a date for the damp survey brief.

## What this test supports

- On these notes, the starter's "say that it is missing, do not guess" instruction changed the result. The starter scored higher in every pairing across three runs of each.
- The ordinary prompt didn't fail by leaving things out or summarising wrongly. It confidently filled in things nobody had said, and it invented an owner for the fire door audit in all three runs.
- The starter's main benefit is consistency, not peak quality. Its three runs landed within one point. The ordinary prompt's three runs spread across five points, and its best run was only two points behind the starter's worst.
- In all six runs, both prompts kept a dropped item, a decision and an already-answered query off the action list.

## What this test does not support

- It is one fictional scenario, run three times per prompt. Three runs of one scenario are not three scenarios.
- I ran it myself, so it isn't independent validation, and it includes no outside user's result.
- It doesn't show that the starter improves any other kind of task, or anything about the other two starters in the same guide.
- It doesn't show a real business outcome or a measured time saving.
- All runs used the same model. A different model may not repeat either result. The ordinary prompt's five-point spread shows how little to trust a single run of anything here.
- Repetition rules out run-to-run noise as the cause of the gap. It does nothing about one person having designed the scenario, written the answer key and scored all six outputs.

## Test integrity

I ran six runs in total, each in a fresh isolated context. Each run got only its own prompt and the fictional notes. None got the other runs, the rubric, the automatic-failure criteria, the trap list or any sign that this was a test or a comparison. I wrote the answer key before any run, and no run saw it.

All six runs used Claude Opus 5. The outputs are reproduced with only dash glyphs and currency symbols changed to ASCII. The [worked example](../examples/ambleforth-action-list-example.md) shows the first run of each prompt. I scored the repeat runs above but haven't reproduced them in full.

One risk remains, the same one the other reviews here carry. I designed the scenario, wrote the answer key, ran every prompt and scored every output. Repetition deals with run-to-run noise and nothing else. A scoring bias held steady across six runs looks exactly like a real effect, so treat the gap as a direction, not a measurement.

## Next evidence

Both other starters in this guide now have their own tests. What's left for this one is a real set of low-risk internal notes. Use the starter when one comes up, and log what it missed. The more valuable evidence, and the one thing these repeats can't supply, is someone other than me scoring these six outputs against the same rubric.
