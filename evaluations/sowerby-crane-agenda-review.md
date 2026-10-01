# Sowerby and Crane: Meeting Agenda Review

This is a project-authored scoring rubric, not one endorsed by any organisation.

This scores the [Sowerby and Crane agenda example](../examples/sowerby-crane-agenda-example.md), which tests the meeting agenda starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

I ran two attempts. In the first, the ordinary prompt and the starter scored the same. I then made the scenario harder, and in the second the starter scored six points higher. Both are recorded here.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Attempt 1 (notes that label their own open questions) | 29/30 | 29/30 |
| Attempt 2 (harder notes, a disputed decision and an ambiguous approval) | 23/30 | 29/30 |

Neither version hit an automatic failure in either attempt.

## Why there were two attempts

The first attempt used notes that flagged their own gaps: "No decision made", "Need to decide that before I send the invite", "She has not been asked yet", "No idea yet whether this is an hour or a half day". Asked plainly for an agenda, the ordinary prompt kept to every one of those flags. It kept both options neutral, put the twelve years of job history at the centre, and listed three things to settle before sending the invite. It scored 29 out of 30, the same as the starter.

This matches the internal update test. When notes label their own uncertainty, an ordinary prompt carries the labels through and the starter adds little.

So I changed the scenario once. It is the same project, one meeting later, but the uncertainty sits inside the notes instead of being flagged. The organiser believes a decision was taken, and a colleague remembers it differently. A partner's offhand remark reads like approval. The length is left as "half day probably, or two hours". The organiser wants a supplier decision, but the group never agreed to one. I didn't change either prompt, and took a fresh, isolated run of each. That is Attempt 2, shown in [the worked example](../examples/sowerby-crane-agenda-example.md).

## Repeat runs

Attempt 2 was one run of each prompt. The [internal update test](netherford-internal-update-review.md) later showed that re-running the same prompt on the same notes moved its score by a point. So a six-point gap from one run needed checking. I re-ran both Attempt 2 prompts twice more on the same notes, in fresh isolated contexts, with nothing changed.

| Prompt | Run 1 | Run 2 | Run 3 | Range |
| --- | ---: | ---: | ---: | --- |
| Ordinary prompt | 23/30 | 24/30 | 24/30 | 23 to 24 |
| Guide-informed starter | 29/30 | 30/30 | 29/30 | 29 to 30 |

The gap holds. Every starter run scored at least five points above every ordinary-prompt run, and the ranges don't come close to overlapping. At its narrowest the gap is five points; at its widest, seven. This is the widest gap of the three starters. The [action list](ambleforth-action-list-review.md) gap narrows to two points at its closest once repeated, and the [internal update](netherford-internal-update-review.md) has no gap at all.

Which failures repeated matters more than the numbers. Attempt 2 recorded three places where the ordinary prompt closed a question the notes had left open. Across three runs:

| Question the notes left open | Runs where the ordinary prompt closed it |
| --- | --- |
| Does "happy for us to get on with it" mean Marguerite approves the spend? | 3 of 3 |
| Is a supplier decision the agreed purpose, or the organiser's wish? | 3 of 3 |
| Is the meeting two hours or a half day? | 1 of 3 |

The first two failures repeat. The third doesn't. The two later runs both quoted the note back ("You wrote 'half day probably, or two hours'"), built the agenda for two hours and handed the choice back with a reason, as the starter does. My Attempt 2 write-up lists all three as failures of the ordinary prompt. Only two survive repetition, and this section corrects that.

All three starter runs asked whether Marguerite's remark amounted to spend approval, and all three kept the supplier decision conditional. The best single line came from a repeat, not the recorded run: "Happy for us to get on with it is not a spend approval, and it was given without the figures in front of her."

The starter's own weakness repeated too. Its longest run was a repeat, and two of the three ran long enough to need trimming before they could go out as an agenda. That is why it doesn't get a clean five for practical usefulness.

## Score breakdown, Attempt 2

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 3 | 5 | The baseline wrote that Marguerite "confirmed at the last meeting she's happy for us to proceed". The notes say she "said she was happy for us to get on with it". Turning that into a confirmation, and marking her optional because of it, is the kind of upgrade nobody rereads. |
| Task alignment | 4 | 5 | Both produced a usable agenda. The starter's also gives the four things asked for by name (purpose, topics, decisions needed and next steps), plus the pre-meeting flags. |
| Use of context | 5 | 5 | Both used every item, including Dilan's leave week and the 31 March renewal as the outer limit. |
| Unknowns, updates and conflicts | 3 | 5 | Both caught the Option A dispute. The baseline then closed three open questions itself: the length, the objective and Marguerite's status. The guide-informed output left all three open and set out the trade-offs. On repeat runs the objective and Marguerite failures held every time and the length one didn't, as the repeat runs section records. |
| Practical usefulness | 5 | 4 | The baseline is the better agenda as written: timed, tight, ready to send. The guide-informed version is long, and its item timings add up to 65 minutes while it says they assume roughly two hours. It needs trimming before it goes out. |
| Responsible use and human control | 3 | 5 | The notes left three decisions with the organiser: whether a partner is optional, how long the meeting runs, and what its objective is. The baseline made all three. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What each run did with the harder notes

| Item | What the notes say | Baseline | Guide-informed |
| --- | --- | --- | --- |
| Option A | "We agreed to work up Option A", then Dilan thinks both, organiser unsure, notes unchecked | Item 1 reconciles it. Not treated as agreed | Same, plus a scope note saying settle it before costs |
| Marguerite | "said she was happy for us to get on with it" | "confirmed... happy for us to proceed", marked optional | Asked whether that is spend approval or only permission to keep evaluating |
| Supplier decision | "Or at least that is what I would like" | "Objective: Reach a supplier decision" | "if the group is ready", with a fallback if not |
| Length | "Half day probably. Or two hours." | Set at 2 hours, half day as fallback | Left open, both shapes described, organiser to pick |
| Option B cost | "around 9,000, maybe more with the extra modules" | Kept approximate | Kept approximate, and asked whether figures are firm or indicative |
| Job history | "can come across but not cleanly" | Unresolved, with "what are we prepared to lose" | Unresolved, with what "not cleanly" means in practice |
| Dilan's leave | Week of the 12th | "Avoid the week of the 12th" | Same, in both timing and pre-meeting decisions |
| Renewal | 31 March | Stated, work back from it | Stated as confirmed, work back from it |

## Automatic failure review

The baseline didn't fail automatically. It didn't claim the supplier decision was made, didn't present Option A as chosen, and didn't take the decision away from the group. The Marguerite upgrade is the most serious of its three weaknesses, because a reader is least likely to check it. But it doesn't claim an approval that was never given. It overstates how firm a loose one was.

The guide-informed output didn't fail automatically either. It asserted nothing the notes don't support and left every open decision open.

## What improved

Unlike the internal update starter, this one earned its place under pressure, and for a clear reason. Its second instruction, "flag anything missing that I need to decide before the meeting", gives the model somewhere to put an open question. The internal update starter's confirmed-or-checking split has no such place, which is why it filed contested items as confirmed.

It asked whether "happy for us to get on with it" amounts to spend approval. That is the question the organiser most needed to ask and hadn't. It made the supplier decision conditional instead of the objective, matching "or at least that is what I would like". It left the length open, described what each option buys, and handed the choice back. And it added an approval route to the decisions needed. The notes never mention one, but a spend this size implies it.

## What it still got wrong

The guide-informed output is too long to send as an agenda. Its five pre-meeting decisions and five "gaps in the notes" add to the organiser's job instead of shaping the meeting. Two of the gaps, whether anyone else uses the spreadsheets daily and restating the underlying problem, are reasonable ideas the notes give no basis for. Its timings total 65 minutes against a stated assumption of roughly two hours.

The baseline is the better document. The starter's version is the better preparation.

## What a person still has to check

- The notes from the previous meeting, to settle whether Option A alone or both options were agreed.
- Whether Marguerite's remark is approval to spend or only to keep evaluating.
- Whether the meeting is two hours or a half day, before the invite goes out.
- Whether Option B's cost is firm, and what the extra modules cost.
- What Tomasz means by "not cleanly", and whether that changes which option is viable.

## What this test supports

- On notes that flag their own gaps, the starter added nothing I could measure. The ordinary prompt scored the same.
- On notes with a disputed decision and an ambiguous approval, the starter held and the ordinary prompt didn't. Across three runs of each, the ordinary prompt treated a vague remark as spend approval and stated a wished-for objective as agreed every time. The starter questioned both every time.
- The six-point gap survives repetition. Three runs of each prompt gave 23, 24 and 24 against 29, 30 and 29, and the ranges don't overlap.
- The instruction that did the work is "flag anything missing that I need to decide before the meeting". It gives an open question somewhere to go, which the internal update starter lacks.

## What this test does not support

- It is two fictional attempts on one fictional project. It is also one scenario: three runs of one scenario are not three scenarios.
- I ran it myself, so it isn't independent validation, and it includes no outside user's result.
- It doesn't show the starter writes a better finished agenda. On Attempt 2 it wrote a worse agenda and more useful preparation notes.
- It doesn't show a real business outcome or a measured time saving.
- All runs used the same model, and I designed the scenario, wrote the answer key, ran every prompt and scored every output. Repetition rules out run-to-run noise as the cause of the gap. It can't rule out a scoring bias I held consistently across all six runs.

## Test integrity

I ran eight runs in total, each in a fresh isolated context. Each run got only its own prompt and the fictional notes for its attempt. None got the other runs, the rubric, the automatic-failure criteria, the answer key, or any sign that this was a test or a comparison. I wrote each attempt's answer key before its runs.

All eight runs used Claude Opus 5. The outputs are reproduced with only dash glyphs and currency symbols changed to ASCII. The [worked example](../examples/sowerby-crane-agenda-example.md) shows the first run of each prompt on the harder notes. I scored the two repeat runs of each above but haven't reproduced them in full, because they differ in wording, not in what they got right or wrong.

## Next evidence

Use this starter on a real meeting where an earlier decision is disputed, and log whether it asked the question a colleague would have asked. Or test whether it still holds when the notes contain no disputed decision, which is the ordinary case and the one Attempt 1 suggests it doesn't improve. Repetition can't fix the fact that one person wrote the scenario and scored every run. So the most useful next evidence is still someone else scoring these same eight outputs against the same rubric.
