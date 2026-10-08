# Netherford Libraries: Internal Update Review

This is a project-authored scoring rubric, not one endorsed by any organisation.

This scores the [Netherford internal update example](../examples/netherford-internal-update-example.md), which tests the internal update starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

I ran three attempts. The first showed no difference. On harder notes, the second scored the ordinary prompt higher, because the starter's two-column sort had nowhere to put a contested item. I rewrote the starter. The rewrite fixed the defect and still didn't beat the ordinary prompt.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Attempt 1 (notes that label their own uncertainty) | 29/30 | 29/30 |
| Attempt 2 (harder notes, uncertainty unlabelled, two internal conflicts) | 29/30 | 28/30 |
| Attempt 3 (same notes and prompts as Attempt 2, starter's sorting instruction rewritten) | 30/30 | 29/30 |

Neither version hit an automatic failure in Attempt 1 or Attempt 2.

## Why there were three attempts

The first attempt used notes that labelled their own uncertainty: "Not fixed yet", "Not signed off", "no new date has been agreed". The ordinary prompt carried every label through.

So I changed the scenario. It is the same project a fortnight later, but the uncertainty sits inside the notes: an impression reported as a result, a go live date the plan and the branch managers disagree about, and a sourced figure next to somebody's estimate. I changed neither prompt. That is Attempt 2, shown in [the worked example](../examples/netherford-internal-update-example.md).

## Score breakdown, Attempt 2

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 4 | 4 | Both read "the 15th" as 15 November, which the notes don't say. The baseline also read "the 8th" as 8 October. Only the baseline said it had made those guesses and asked to be corrected. |
| Task alignment | 5 | 5 | Both produced a short, clear update a team could read. |
| Use of context | 5 | 5 | Both used all eight items. The guide-informed output also worked out that eight branches and two training sessions remain, which the notes only imply. |
| Unknowns, updates and conflicts | 5 | 4 | Both caught the go live conflict and kept Prisha's estimate apart from the sourced figure. The guide-informed output then filed the disputed go live date, one person's impression of search speed and an unsigned kiosk plan under "Confirmed". |
| Practical usefulness | 5 | 5 | The baseline's two flagged items are sharper. The guide-informed output's counts of remaining work and its decommissioning dependency are more complete. Different strengths, both usable. |
| Responsible use and human control | 5 | 5 | Neither took action or overstated its authority. Both left the date decision with a person. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## Score breakdown, Attempt 3

For Attempt 3 I replaced the starter's third instruction with two lines. One sorts each point into confirmed, still needs checking, or what the notes disagree about. The other says to call something confirmed only if the notes settle it, because somebody's impression is not confirmation. The notes and the ordinary prompt stayed the same, and I ran both again.

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 5 | 4 | This baseline run left "the 15th" and "the 8th" alone instead of guessing the months, which the previous baseline run didn't. The revised starter still wrote "15 November" but left "the 8th" as it was, so it resolved one date and not the other. |
| Task alignment | 5 | 5 | Both produced a short, readable update. |
| Use of context | 5 | 5 | Both used all eight items. The starter also worked out that eight branches remain untested. |
| Unknowns, updates and conflicts | 5 | 5 | The rewrite worked. All three items it had misfiled moved to the right group. The starter also split the fact that testing has begun from Ines's impression of how it is going, which no earlier run did. The baseline flagged the date conflict twice, inline and in a closing note. |
| Practical usefulness | 5 | 5 | The starter's third group gives the decision needed before the 8th a section of its own. The baseline's two closing flags say the same in fewer words. |
| Responsible use and human control | 5 | 5 | Neither took action. Both left the date decision with a person. |

## What the rewrite fixed

It fixed the defect it was written for. Marguerite's impression and the unsigned kiosk plan went to "still to check", and the disputed go live date went to the new third group. The starter also separated "branch testing started Monday", a fact, from "Ines says feedback is positive", which no earlier run did. But the ordinary prompt scored 30 out of 30 on this run, against the starter's 29.

## The variance this test measured by accident

The ordinary prompt ran unchanged on unchanged notes in Attempt 3. It scored 30. The same prompt on the same notes had scored 29 the run before.

That one-point movement, with nothing changed, is the size of the gaps in Attempts 2 and 3. One run can't resolve a one-point difference. So Attempt 2 shows the starter had a specific, reproducible defect, not that the ordinary prompt is one point better.

I checked the six-point gap in the [agenda starter review](sowerby-crane-agenda-review.md) the same way. Three runs of each prompt gave 23, 24 and 24 for the ordinary prompt against 29, 30 and 29 for the starter. That gap survives repetition. The one-point gaps here don't.

## What each run did with the harder notes

| Item | What the notes say | Baseline | Guide-informed |
| --- | --- | --- | --- |
| Testing | "Ines says feedback is positive so far", 3 of 11 branches | Attributed to Ines, kept 3 of 11 | Attributed to Ines, kept 3 of 11, but under "Confirmed" |
| Supplier | Marguerite's impression of search speed, no test | Attributed to Marguerite, not called fixed | Attributed to Marguerite, but under "Confirmed" |
| Go live | Plan says 1 Nov, branch managers told the 15th, board papers go out on the 8th | Flagged the mismatch and that it needs settling before the papers | Flagged the mismatch, but also listed go live under "Confirmed" |
| Kiosks | "happy with the kiosk plan" next to "still need to get her the numbers she asked for" | Reported both, kept the outstanding action | Split them, putting the plan under "Confirmed" and the numbers under "still to check" |
| Budget | 61,000 sourced to the 5 September report, Prisha reckons nearer 70 | Kept apart, estimate attributed to Prisha | Kept apart, and added that the estimate is not yet in a finance report |
| Old system | December booking, cannot start until 30 days after go live | Stated both | Stated both, and noted the booking should be rechecked once go live is settled |
| Training | 4 of 6 sessions, 58 people | Correct | Correct |

The guide-informed output filed four entries under "Confirmed" in Attempt 2: testing, supplier, go live and kiosks. I count three misfiled items elsewhere because the testing entry names Ines as its source. The supplier entry names Marguerite the same way, so where that line falls is a judgement call.

The December decommissioning booking looked like a trap, but 30 days after either candidate go live date still falls in December. Both runs were right to report it without alarm.

## Automatic failure review

The Attempt 2 baseline didn't fail. Its month guess costs points, but the output discloses it and asks the reader to correct it.

The Attempt 2 guide-informed output didn't fail either. Filing three unsettled items under "Confirmed" is a real weakness, but each entry's own text carries the qualifier: Ines and Marguerite are named as sources, the go live entry states both dates, and the kiosk numbers appear as outstanding later. A reader who reads the entry isn't misled. A reader who trusts the heading is.

## What the starter changed

Not accuracy. Both runs caught the two hardest items, the go live conflict and the budget estimate.

It changed the shape, and the shape caused the loss. "Separate what is confirmed from what still needs checking" works when items sort into two piles. Three of these didn't. A date two sources disagree about is contested, not pending. One person's impression is a different kind of evidence, not an unchecked task. With no third option, the starter put all three in the wrong column. The ordinary prompt had no columns, so it described each one correctly.

## What it still got wrong

In Attempt 2, both runs turned "the 15th" and "the 8th" into November and October. That is probably right, but the notes don't name the months, and only the baseline disclosed the guess. In Attempt 3 the baseline left both dates alone, and the rewritten starter wrote "15 November" and left "the 8th". Nothing in the rewrite targeted dates, so this is most likely run-to-run movement.

## What a person still has to check

- Which go live date is now real, before the board papers go out.
- That someone has tested Marguerite's impression of the search speed.
- Whether Ines's "positive so far" holds beyond the first three branches.
- Prisha's revised budget figure, against a finance report.
- Whether the kiosk plan is agreed before the support contract numbers go out.

## What this test supports

- On notes that label their own uncertainty, the starter added nothing.
- Given only confirmed and still-to-check, it filed a disputed date, an impression and an unsigned plan as confirmed. A third group and a line saying an impression is not confirmation fixed that on the same notes.
- The fix didn't make the starter more accurate than asking plainly. An ordinary prompt matched or beat it in all three attempts.
- No run invented a decision or a piece of progress. Every impression was attributed to the person who held it. The only invented specifics were the months added to "the 15th" and "the 8th".

## What this test does not support

- It is three fictional attempts on one fictional project, on one model.
- I designed both scenarios, wrote the answer keys, ran every prompt and scored every output. It isn't independent validation and has no outside user's result.
- It doesn't show the starter is wrong in general, or that the rewritten starter is now right. It shows one defect gone on one set of notes.
- It shows no real business outcome or time saving.
- A one-point gap is inside the run-to-run noise measured above.

## Test integrity

I ran six runs, each in a fresh isolated context. Each got only its own prompt and the fictional notes for its attempt: no other runs, rubric, automatic-failure criteria, answer key, or sign that this was a test. I wrote each answer key before its runs. All six used Claude Opus 5. The outputs are reproduced with only dash glyphs and currency symbols changed to ASCII.

Attempt 3 changed the guide-informed prompt and held everything else constant. I re-ran both prompts instead of reusing Attempt 2's baseline, which would have hidden the variance above.

## Next evidence

This test can't say whether the rewritten starter holds on a different kind of conflict, or whether an ordinary prompt keeps matching it on long notes. Both need real notes. The next step is to use the revised starter on real low-risk internal notes when some come up, and log what it missed.

## Corrections

The interactive page [Sort the Notes Yourself](https://shaunmarsden.github.io/practical-ai-adoption/) marked the December decommissioning claim as "the notes disagree" until 15th September 2026, so anyone who sorted it correctly was told they were wrong. It now reads as something to check: 30 days after either candidate date lands in December, and what is missing is the December date the booking sits on.
