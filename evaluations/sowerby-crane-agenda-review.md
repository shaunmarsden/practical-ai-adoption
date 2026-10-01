# Sowerby and Crane: Meeting Agenda Review

This is a project-authored scoring rubric, not one endorsed by any organisation.

This scores the [Sowerby and Crane agenda example](../examples/sowerby-crane-agenda-example.md), which tests the meeting agenda starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

I ran two attempts. In the first, the ordinary prompt and the starter scored the same. On harder notes, the starter scored six points higher.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Attempt 1 (notes that label their own open questions) | 29/30 | 29/30 |
| Attempt 2 (harder notes, a disputed decision and an ambiguous approval) | 23/30 | 29/30 |

Neither version hit an automatic failure in either attempt.

## Why there were two attempts

The first attempt used notes that flagged their own gaps: "No decision made", "She has not been asked yet". The ordinary prompt kept to every flag, as in the internal update test.

So I changed the scenario once. It is the same project, one meeting later, but the uncertainty sits inside the notes. The organiser believes a decision was taken, and a colleague remembers it differently. A partner's offhand remark reads like approval. The organiser wants a supplier decision the group never agreed to. I changed neither prompt. That is Attempt 2, shown in [the worked example](../examples/sowerby-crane-agenda-example.md).

## Repeat runs

Attempt 2 was one run of each prompt, and the [internal update test](netherford-internal-update-review.md) later showed that one prompt can move a point on its own. So I re-ran both Attempt 2 prompts twice more on the same notes, in fresh isolated contexts.

| Prompt | Run 1 | Run 2 | Run 3 | Range |
| --- | ---: | ---: | ---: | --- |
| Ordinary prompt | 23/30 | 24/30 | 24/30 | 23 to 24 |
| Guide-informed starter | 29/30 | 30/30 | 29/30 | 29 to 30 |

The gap holds. Every starter run scored at least five points above every ordinary-prompt run, and at its widest the gap is seven. It is the widest of the three starters. The [action list](ambleforth-action-list-review.md) gap narrows to two points at its closest once repeated, and the [internal update](netherford-internal-update-review.md) has none.

Which failures repeated matters more. Attempt 2 recorded three places where the ordinary prompt closed a question the notes had left open. Across three runs:

| Question the notes left open | Runs where the ordinary prompt closed it |
| --- | --- |
| Does "happy for us to get on with it" mean Marguerite approves the spend? | 3 of 3 |
| Is a supplier decision the agreed purpose, or the organiser's wish? | 3 of 3 |
| Is the meeting two hours or a half day? | 1 of 3 |

The first two repeat. The third doesn't: the two later runs built the agenda for two hours and handed the choice back with a reason, as the starter does.

All three starter runs asked whether Marguerite's remark amounted to spend approval, and all three kept the supplier decision conditional.

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

The baseline didn't fail. It didn't claim the supplier decision was made or present Option A as chosen. The Marguerite upgrade is its most serious weakness, because a reader is least likely to check it, but it overstates a loose approval. It doesn't claim one never given.

The guide-informed output didn't fail either. It asserted nothing the notes don't support and left every open decision open.

## What improved

Unlike the internal update starter, this one earned its place under pressure. Its second instruction, "flag anything missing that I need to decide before the meeting", gives an open question somewhere to go. The internal update starter's confirmed-or-checking split has no such place, which is why it filed contested items as confirmed.

It asked whether "happy for us to get on with it" amounts to spend approval, the question the organiser most needed to ask. It made the supplier decision conditional, left the length open with what each option buys, and added an approval route the notes never mention but a spend this size implies.

## What it still got wrong

The guide-informed output is too long to send as an agenda. Its five pre-meeting decisions and five "gaps in the notes" add to the organiser's job instead of shaping the meeting. Two of the gaps, whether anyone else uses the spreadsheets daily and restating the underlying problem, have no basis in the notes. Its timings total 65 minutes against a stated assumption of roughly two hours. Two of the three repeats also ran long enough to need trimming.

The baseline is the better document. The starter's version is the better preparation.

## What a person still has to check

- The notes from the previous meeting, to settle whether Option A alone or both options were agreed.
- Whether Marguerite's remark is approval to spend or only to keep evaluating.
- Whether the meeting is two hours or a half day, before the invite goes out.
- Whether Option B's cost is firm, and what the extra modules cost.
- What Tomasz means by "not cleanly", and whether that changes which option is viable.

## What this test does not support

- It is two fictional attempts on one fictional project. Three runs of one scenario are not three scenarios.
- It doesn't show the starter writes a better finished agenda. On Attempt 2 it wrote a worse agenda and more useful preparation notes.
- It shows no real business outcome or time saving.
- All runs used the same model. I designed the scenario, wrote the answer key, ran every prompt and scored every output, so it isn't independent validation and has no outside user's result. Repetition rules out run-to-run noise as the cause of the gap. It can't rule out a scoring bias I held across all six runs.

## Test integrity

I ran eight runs, each in a fresh isolated context. Each got only its own prompt and the fictional notes for its attempt: no other runs, rubric, automatic-failure criteria, answer key, or sign that this was a test. I wrote each answer key before its runs. All eight used Claude Opus 5. The outputs are reproduced with only dash glyphs and currency symbols changed to ASCII.

The [worked example](../examples/sowerby-crane-agenda-example.md) shows the first run of each prompt on the harder notes. I scored the four repeat runs but haven't reproduced them, because they differ in wording, not in what they got right.

## Next evidence

Use this starter on a real meeting where an earlier decision is disputed, and log whether it asked the question a colleague would have asked. The most useful evidence is still someone else scoring these eight outputs against the same rubric.

## Corrections

My Attempt 2 write-up listed all three questions as failures of the ordinary prompt. Only two survive repetition.
