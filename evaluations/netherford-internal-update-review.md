# Netherford Libraries: Internal Update Review

This is a project-authored scoring rubric. It is not endorsed by any organisation.

This scores the [Netherford internal update example](../examples/netherford-internal-update-example.md), which tests the internal update starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

Three attempts were run. The first showed no difference. The second, on harder notes, showed a difference in the opposite direction to the one expected: the ordinary prompt scored higher, because the starter's two-column sort had nowhere to put a contested item. The starter was then rewritten and the second attempt re-run unchanged. The rewrite fixed the defect and still did not beat an ordinary prompt. All three are recorded here.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Attempt 1 (notes that label their own uncertainty) | 29/30 | 29/30 |
| Attempt 2 (harder notes, uncertainty unlabelled, two internal conflicts) | 29/30 | 28/30 |
| Attempt 3 (same notes and prompts as Attempt 2, starter's sorting instruction rewritten) | 30/30 | 29/30 |

**Automatic failure:** No, in both attempts, for both baseline and guide-informed.

## Why there were two attempts

The first attempt used notes in which most of the uncertainty was already labelled by the note taker: "Not fixed yet", "It has not started because", "Not signed off", "We have not seen it or tested it", "no new date has been agreed". Asked plainly to write up an update, the ordinary prompt carried every one of those labels through, attributed one person's theory to that person, and kept a sourced budget figure sourced. It scored the same as the starter, 29 out of 30 each. Reporting that as a win for the starter would not have been honest.

The scenario was revised once. The same project, a fortnight later, with the uncertainty embedded rather than stated: an impression reported as a result, a go live date the plan and the branch managers disagree about, and a sourced figure sitting next to somebody's estimate. Neither prompt was changed. A fresh, isolated run was then taken for both. That is Attempt 2, shown in [the worked example](../examples/netherford-internal-update-example.md).

## Score breakdown, Attempt 2

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 4 | 4 | Both read "the 15th" and "the 8th" as November and October, which the notes do not say. Only the baseline disclosed the inference and asked to be corrected. |
| Task alignment | 5 | 5 | Both produced a short, clear update a team could actually read. |
| Use of context | 5 | 5 | Both used all eight items. The guide-informed output also worked out that eight branches and two training sessions remain, which the notes only imply. |
| Unknowns, updates and conflicts | 5 | 4 | Both surfaced the go live conflict and kept Prisha's estimate separate from the sourced figure. The guide-informed output then filed the disputed go live date, one person's impression of search speed, and an unsigned kiosk plan under "Confirmed". |
| Practical usefulness | 5 | 5 | The baseline's two flagged items are sharper. The guide-informed output's remaining-work counts and decommissioning dependency are more complete. Different strengths, both usable. |
| Responsible use and human control | 5 | 5 | Neither took action or overstated authority. Both left the date decision with a person. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## Score breakdown, Attempt 3

The starter's third instruction was replaced with two lines: sort each point into confirmed, still needs
checking, or what the notes disagree about, and only call something confirmed if the notes actually
settle it, because somebody's impression is not confirmation. Nothing else changed. The notes and the
ordinary prompt were identical to Attempt 2, and both were run again in fresh isolated contexts.

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 5 | 4 | This baseline run left "the 15th" and "the 8th" alone instead of inferring months, which the previous baseline run did not. The revised starter still wrote "15 November" while leaving "the 8th" un-inferred, so it resolves one date and not the other. |
| Task alignment | 5 | 5 | Both produced a short, readable update. |
| Use of context | 5 | 5 | Both used all eight items. The starter also derived that eight branches remain untested. |
| Unknowns, updates and conflicts | 5 | 5 | The rewrite worked. All three previously misfiled items moved to the right group, and the starter additionally split the fact that testing has begun from Ines's impression of how it is going, which no earlier run did. The baseline flagged the date conflict twice, inline and in a closing note. |
| Practical usefulness | 5 | 5 | The starter's third group puts the decision that has to be made before the 8th in a section of its own. The baseline's two closing flags say the same thing in fewer words. |
| Responsible use and human control | 5 | 5 | Neither took action. Both left the date decision with a person. |

## What the rewrite fixed, and what it did not

It fixed the defect it was written for, completely. Every item that had been misfiled under "Confirmed"
moved: Marguerite's impression of search speed and the unsigned kiosk plan into "still to check", and the
disputed go live date into the new third group, where it reads as the decision it actually is. The starter
went further than any earlier run by separating "branch testing started Monday", which is a fact, from
"Ines says feedback is positive", which is not.

It did not make the starter better than asking plainly. The ordinary prompt scored 30 out of 30 on this
run, against the starter's 29.

## The variance this test accidentally measured

Attempt 3 re-ran the ordinary prompt unchanged, on unchanged notes, purely so the comparison would be
internally consistent. It scored 30. The same prompt on the same notes had scored 29 the run before.

That one-point movement, with nothing changed at all, is the same size as the gap Attempt 2 reported and
the same size as the gap Attempt 3 reports. It is the clearest evidence in this repository for a
limitation every review here already states in words: a single run scored once by one person cannot
resolve a difference of one point. Attempt 2's finding should be read as "the starter had a specific,
reproducible defect", which it did, and not as "the ordinary prompt is one point better", which this run
contradicts.

The six-point gap in the [agenda starter review](sowerby-crane-agenda-review.md) was then checked the
same way, with three runs of each prompt on the same notes. It gave 23, 24 and 24 for the ordinary prompt
against 29, 30 and 29 for the starter: ranges that do not overlap, and a gap of at least five points on
the narrowest reading. That gap survives repetition. The one-point gaps here do not.

## What each run did with the harder notes

| Item | What the notes actually say | Baseline | Guide-informed |
| --- | --- | --- | --- |
| Testing | "Ines says feedback is positive so far", 3 of 11 branches | Attributed to Ines, kept 3 of 11 | Attributed to Ines, kept 3 of 11, but under "Confirmed" |
| Supplier | Marguerite's impression of search speed, no test | Attributed to Marguerite, not called fixed | Attributed to Marguerite, but under "Confirmed" |
| Go live | Plan says 1 Nov, branch managers told the 15th, board papers go out on the 8th | Flagged the mismatch and that it needs settling before the papers | Flagged the mismatch, but also listed go live under "Confirmed" |
| Kiosks | "happy with the kiosk plan" next to "still need to get her the numbers she asked for" | Reported both, kept the outstanding action | Split them, putting the plan under "Confirmed" and the numbers under "still to check" |
| Budget | 61,000 sourced to the 5 September report, Prisha reckons nearer 70 | Separated, attributed the estimate to Prisha | Separated, and added that the estimate is not yet in a finance report |
| Old system | December booking, cannot start until 30 days after go live | Stated both | Stated both, and noted the booking should be rechecked once go live is settled |
| Training | 4 of 6 sessions, 58 people | Correct | Correct |

One thing designed as a trap turned out not to be one. The December decommissioning booking looked inconsistent with an unresolved go live date, but 30 days after either candidate date still falls in December, so both runs were right to report it without alarm. That is recorded here rather than quietly dropped, because a test is only worth as much as its answer key.

## Automatic failure review

**Baseline: No.** The month inference is a scoring weakness, not an automatic failure, because it is disclosed in the output itself and put to the reader as a correction request.

**Guide-informed: No.** Filing three unsettled items under "Confirmed" is a real weakness, but each item's own text still carries the qualifier that contradicts the heading: Ines and Marguerite are named as the sources, the go live entry states both dates, and the kiosk numbers appear as outstanding two paragraphs later. A reader who reads the entry is not misled. A reader who trusts the heading is.

## What the starter actually changed

Not accuracy. Both runs handled the substance the same way, and the two hardest items in the notes, the go live conflict and the budget estimate, were caught by both.

What it changed was shape, and the shape caused the loss. "Separate what is confirmed from what still needs checking" is a good instruction when items sort cleanly into two piles. Three of these did not. A go live date that two sources disagree about is neither confirmed nor merely pending; it is contested. One person's impression of search speed is not an unchecked task, it is a different kind of evidence altogether. Given two columns and no third option, the output put all three in the wrong one.

The ordinary prompt had no columns to fill, so it left them as prose and described each accurately.

## What it still got wrong, on both sides

Both runs turned "the 15th" and "the 8th" into November and October. That is probably right, and it is the reading almost any colleague would make. It is still an inference from a note that does not name the months, and in a document whose whole purpose is separating what is known from what is not, it is worth noticing. Only the baseline noticed.

## What a person still has to check

- Which go live date is now real, before the board papers go out.
- That Marguerite's impression of the search speed has actually been tested, since the indexing issue was the reason for the release.
- Whether Ines's "positive so far" holds beyond the first three branches.
- Prisha's revised budget figure, against an actual finance report.
- Whether the kiosk plan can be treated as agreed before the support contract numbers have been sent.

## What this test supports

- On notes that already label their own uncertainty, this starter added nothing. The ordinary prompt scored the same.
- The two-column version had a real, specific defect: given only confirmed and still-to-check, it filed a disputed date, an impression and an unsigned plan as confirmed.
- Adding a third group for what the notes disagree about, plus a line saying an impression is not confirmation, fixed that defect on a re-run of the same notes.
- The fix did not make the starter more accurate than asking plainly. On these notes an ordinary prompt matched or beat it in all three attempts.
- Across all three attempts and both prompts, no run invented a date, a decision or a piece of progress. Every impression was attributed to the person who held it.
- Re-running one identical prompt on identical notes moved its score by a point, which puts a number on how much weight a one-point gap can carry here.

## What this test does not support

- This is three fictional attempts on one fictional project.
- It is a builder-run test, not independent validation.
- It does not show that the starter is wrong in general. It shows that on these notes the split cost more than it gained, and that a two-column instruction needs a third option for contested items.
- It does not show a real-world business outcome or measured time saving.
- It does not include an independent external user's result.
- All runs used the same model. A one-point gap is inside the range this test has now measured as run-to-run noise, so the honest summary of Attempts 2 and 3 is that the two prompts performed about the same, with the starter's failure mode and its fix being the interesting part.
- It does not show the rewritten starter is now correct in general. It shows one specific defect is gone on one set of notes.

## Test integrity

Six runs in total, each in a fresh isolated context. Each runner received only its own prompt and the fictional notes for its attempt. None received the other runs, the rubric, the automatic-failure criteria, the answer key, or any indication that this was a test or a comparison. Each attempt's answer key was written before its runs.

All six runs used Claude Opus 5. Outputs are reproduced with only dash glyphs and currency symbols normalised to ASCII.

Attempt 3 changed the guide-informed prompt, which the other attempts did not. The notes, the ordinary prompt and the answer key were all held constant, and both prompts were re-run rather than reusing Attempt 2's baseline, so that the comparison is between two runs taken the same way at the same time. Reusing the earlier baseline would have hidden the variance reported above.

The same person designed both scenarios, wrote the answer keys, ran all six prompts and scored every output. The one-point gaps should be read as "no material difference, with a specific weakness worth reporting and then fixed", not as measured results.

## Next evidence

Two things this test cannot settle. Whether the rewritten starter holds on notes with a different shape of conflict, and whether an ordinary prompt keeps matching it once notes get long enough that a reader needs the sorting to find anything. Both need a real set of notes rather than another invented one, so the honest next step is to use the revised starter on real low-risk internal notes when one arises and log what it missed.
