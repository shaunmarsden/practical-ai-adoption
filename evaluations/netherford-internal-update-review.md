# Netherford Libraries: Internal Update Review

This is a project-authored scoring rubric, not one endorsed by any organisation.

This scores the [Netherford internal update example](../examples/netherford-internal-update-example.md), which tests the internal update starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

I ran three attempts. The first showed no difference. The second, on harder notes, showed a difference the other way from the one I expected. The ordinary prompt scored higher, because the starter's two-column sort had nowhere to put a contested item. I then rewrote the starter and re-ran the second attempt, with nothing else changed. The rewrite fixed the defect and still didn't beat the ordinary prompt. All three are recorded here.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Attempt 1 (notes that label their own uncertainty) | 29/30 | 29/30 |
| Attempt 2 (harder notes, uncertainty unlabelled, two internal conflicts) | 29/30 | 28/30 |
| Attempt 3 (same notes and prompts as Attempt 2, starter's sorting instruction rewritten) | 30/30 | 29/30 |

Neither version hit an automatic failure in Attempt 1 or Attempt 2.

## Why there were three attempts

The first attempt used notes where the note taker had already labelled most of the uncertainty: "Not fixed yet", "It has not started because", "Not signed off", "We have not seen it or tested it", "no new date has been agreed". Asked plainly for an update, the ordinary prompt carried every one of those labels through. It attributed one person's theory to that person and kept a sourced budget figure sourced. It scored 29 out of 30, the same as the starter.

So I changed the scenario once. It is the same project a fortnight later, but the uncertainty sits inside the notes instead of being stated. There is an impression reported as a result, a go live date the plan and the branch managers disagree about, and a sourced figure next to somebody's estimate. I didn't change either prompt, and took a fresh, isolated run of each. That is Attempt 2, shown in [the worked example](../examples/netherford-internal-update-example.md).

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

For Attempt 3 I replaced the starter's third instruction with two lines. The first sorts each point into confirmed, still needs checking, or what the notes disagree about. The second says to call something confirmed only if the notes settle it, because somebody's impression is not confirmation. Nothing else changed. The notes and the ordinary prompt were the same as in Attempt 2, and I ran both again in fresh isolated contexts.

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 5 | 4 | This baseline run left "the 15th" and "the 8th" alone instead of guessing the months, which the previous baseline run didn't. The revised starter still wrote "15 November" but left "the 8th" as it was, so it resolved one date and not the other. |
| Task alignment | 5 | 5 | Both produced a short, readable update. |
| Use of context | 5 | 5 | Both used all eight items. The starter also worked out that eight branches remain untested. |
| Unknowns, updates and conflicts | 5 | 5 | The rewrite worked. All three items it had misfiled moved to the right group. The starter also split the fact that testing has begun from Ines's impression of how it is going, which no earlier run did. The baseline flagged the date conflict twice, inline and in a closing note. |
| Practical usefulness | 5 | 5 | The starter's third group gives the decision needed before the 8th a section of its own. The baseline's two closing flags say the same in fewer words. |
| Responsible use and human control | 5 | 5 | Neither took action. Both left the date decision with a person. |

## What the rewrite fixed, and what it didn't

It fixed the defect it was written for, completely. Every item misfiled under "Confirmed" moved. Marguerite's impression of search speed and the unsigned kiosk plan went to "still to check". The disputed go live date went to the new third group, where it reads as the decision it is. The starter also went further than any earlier run. It separated "branch testing started Monday", which is a fact, from "Ines says feedback is positive", which is not.

It didn't make the starter better than asking plainly. The ordinary prompt scored 30 out of 30 on this run, against the starter's 29.

## The variance this test measured by accident

Attempt 3 re-ran the ordinary prompt unchanged, on unchanged notes, only to keep the comparison consistent. It scored 30. The same prompt on the same notes had scored 29 the run before.

That one-point movement, with nothing changed, is the same size as the gap in Attempt 2 and the gap in Attempt 3. It is the clearest evidence in this repository for a limit every review here already states: one run, scored once by one person, can't resolve a difference of one point. So read Attempt 2 as "the starter had a specific, reproducible defect", which it did. Don't read it as "the ordinary prompt is one point better", which this run contradicts.

I then checked the six-point gap in the [agenda starter review](sowerby-crane-agenda-review.md) the same way, with three runs of each prompt on the same notes. It gave 23, 24 and 24 for the ordinary prompt against 29, 30 and 29 for the starter. The ranges don't overlap, and the gap is at least five points at its narrowest. That gap survives repetition. The one-point gaps here don't.

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

One thing I designed as a trap turned out not to be one. The December decommissioning booking looked inconsistent with an unsettled go live date. But 30 days after either candidate date still falls in December, so both runs were right to report it without alarm. I've kept that here instead of dropping it, because a test is only worth as much as its answer key.

The interactive page had this wrong until 15th September 2026. [Sort the Notes Yourself](https://shaunmarsden.github.io/practical-ai-adoption/) asked visitors to place the same claim, and marked "the notes disagree" as the right answer. That is the reading the paragraph above retired. Both model runs and this review had it as something to check. Only the page carried the earlier version, so anyone who sorted it correctly was told they were wrong. It now reads as something to check, with the arithmetic spelled out: 30 days after either candidate date lands in December, and what is missing is the date in December the booking sits on.

## Automatic failure review

The Attempt 2 baseline didn't fail automatically. Its month guess is a scoring weakness, not an automatic failure, because the output itself discloses it and asks the reader to correct it.

The Attempt 2 guide-informed output didn't fail automatically either. Filing three unsettled items under "Confirmed" is a real weakness. But each entry's own text still carries the qualifier that contradicts the heading. Ines and Marguerite are named as the sources, the go live entry states both dates, and the kiosk numbers appear as outstanding two paragraphs later. A reader who reads the entry isn't misled. A reader who trusts the heading is.

## What the starter changed

Not accuracy. Both runs handled the substance the same way, and both caught the two hardest items in the notes, the go live conflict and the budget estimate.

It changed the shape, and the shape caused the loss. "Separate what is confirmed from what still needs checking" is a good instruction when items sort cleanly into two piles. Three of these didn't. A go live date that two sources disagree about is neither confirmed nor just pending. It is contested. One person's impression of search speed isn't an unchecked task. It is a different kind of evidence. Given two columns and no third option, the output put all three in the wrong one.

The ordinary prompt had no columns to fill, so it left them as prose and described each one correctly.

## What it still got wrong

In Attempt 2, both runs turned "the 15th" and "the 8th" into November and October. That is probably right, and it is the reading almost any colleague would make. But it is still a guess from notes that don't name the months. In a document meant to separate what is known from what isn't, that matters. Only the baseline disclosed it.

Attempt 3 split on this. Its baseline left both dates alone. The rewritten starter guessed one of the two, writing "15 November" and leaving "the 8th" as it stood. Nothing in the rewrite was aimed at date guessing. So this is most likely run-to-run movement of the kind measured above, not an effect of the change.

## What a person still has to check

- Which go live date is now real, before the board papers go out.
- That someone has tested Marguerite's impression of the search speed, since the indexing issue was the reason for the release.
- Whether Ines's "positive so far" holds beyond the first three branches.
- Prisha's revised budget figure, against a finance report.
- Whether the kiosk plan can be treated as agreed before the support contract numbers have been sent.

## What this test supports

- On notes that already label their own uncertainty, this starter added nothing. The ordinary prompt scored the same.
- The two-column version had a specific defect. Given only confirmed and still-to-check, it filed a disputed date, an impression and an unsigned plan as confirmed.
- Adding a third group for what the notes disagree about, plus a line saying an impression is not confirmation, fixed that defect on a re-run of the same notes.
- The fix didn't make the starter more accurate than asking plainly. On these notes an ordinary prompt matched or beat it in all three attempts.
- Across all three attempts and both prompts, no run invented a date, a decision or a piece of progress. Every impression was attributed to the person who held it.
- Re-running one identical prompt on identical notes moved its score by a point. That puts a number on how much weight a one-point gap can carry here.

## What this test does not support

- It is three fictional attempts on one fictional project.
- I ran it myself, so it isn't independent validation, and it includes no outside user's result.
- It doesn't show the starter is wrong in general. It shows that on these notes the split cost more than it gained, and that a two-column instruction needs a third option for contested items.
- It doesn't show a real business outcome or a measured time saving.
- All runs used the same model. A one-point gap is inside the range this test measured as run-to-run noise. So in Attempts 2 and 3 the two prompts performed about the same, and the interesting part is the starter's failure and its fix.
- It doesn't show the rewritten starter is now right in general. It shows one specific defect gone on one set of notes.

## Test integrity

I ran six runs in total, each in a fresh isolated context. Each run got only its own prompt and the fictional notes for its attempt. None got the other runs, the rubric, the automatic-failure criteria, the answer key, or any sign that this was a test or a comparison. I wrote each attempt's answer key before its runs.

All six runs used Claude Opus 5. The outputs are reproduced with only dash glyphs and currency symbols changed to ASCII.

Attempt 3 changed the guide-informed prompt, which the other attempts didn't. I held the notes, the ordinary prompt and the answer key constant. I re-ran both prompts instead of reusing Attempt 2's baseline, so the comparison is between two runs taken the same way at the same time. Reusing the earlier baseline would have hidden the variance reported above.

I designed both scenarios, wrote the answer keys, ran all six prompts and scored every output. So read the one-point gaps as "no material difference, with a specific weakness worth reporting and then fixed", not as measured results.

## Next evidence

This test can't settle two things. Does the rewritten starter hold on notes with a different kind of conflict? And does an ordinary prompt keep matching it once notes get long enough that a reader needs the sorting to find anything? Both need real notes, not another invented set. So the next step is to use the revised starter on real low-risk internal notes when some come up, and log what it missed.
