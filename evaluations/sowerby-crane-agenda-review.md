# Sowerby and Crane: Meeting Agenda Review

This is a project-authored scoring rubric. It is not endorsed by any organisation.

This scores the [Sowerby and Crane agenda example](../examples/sowerby-crane-agenda-example.md), which tests the meeting agenda starter in [You Have Been Given AI at Work](../guides/you-have-been-given-ai-at-work.md).

Two attempts were run. The first showed no difference between an ordinary prompt and the starter. The scenario was then made harder, and the second attempt showed a clear six-point difference. Both are recorded here.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Attempt 1 (notes that label their own open questions) | 29/30 | 29/30 |
| Attempt 2 (harder notes, a disputed decision and an ambiguous approval) | 23/30 | 29/30 |

**Automatic failure:** No, in both attempts, for both baseline and guide-informed.

## Why there were two attempts

The first attempt used notes that flagged their own gaps: "No decision made", "Need to decide that before I send the invite", "She has not been asked yet", "No idea yet whether this is an hour or a half day". Asked plainly for an agenda, the ordinary prompt honoured every one of those flags, kept both options neutral, put the twelve years of job history at the centre, and listed three things to settle before sending the invite. It scored 29 out of 30, the same as the starter.

That is worth stating plainly, because it is the same finding as the internal update test: when notes label their own uncertainty, an ordinary prompt carries the labels through and the starter adds little.

The scenario was revised once. The same project, one meeting later, with the uncertainty embedded rather than flagged: a decision the organiser believes was taken and a colleague remembers differently, a partner's offhand remark that reads like approval, a length left as "half day probably, or two hours", and a supplier decision the organiser wants rather than one the group agreed to. Neither prompt was changed. A fresh, isolated run was then taken for both. That is Attempt 2, shown in [the worked example](../examples/sowerby-crane-agenda-example.md).

## Score breakdown, Attempt 2

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Factual and evidence fidelity | 3 | 5 | The baseline wrote that Marguerite "confirmed at the last meeting she's happy for us to proceed". The notes say she "said she was happy for us to get on with it". Turning that into a confirmation, and marking her optional on the strength of it, is the kind of upgrade nobody rereads. |
| Task alignment | 4 | 5 | Both produced a usable agenda. The starter's version also delivers the four things asked for by name, purpose, topics, decisions needed and next steps, plus the pre-meeting flags. |
| Use of context | 5 | 5 | Both used every item, including Dilan's leave week and the 31 March renewal as the outer limit. |
| Unknowns, updates and conflicts | 3 | 5 | Both caught the Option A dispute. The baseline then closed three open questions on its own: the length, the objective and Marguerite's status. The guide-informed output left all three open with the trade-offs stated. |
| Practical usefulness | 5 | 4 | The baseline is the better agenda as written: timed, tight, sendable. The guide-informed version is long, and its own item timings add up to 65 minutes while it says they assume roughly two hours. It needs trimming before it goes out. |
| Responsible use and human control | 3 | 5 | Deciding a partner is optional, fixing the meeting's length and declaring the objective are three decisions the notes explicitly left with the organiser. The baseline made all three. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What each run did with the harder notes

| Item | What the notes actually say | Baseline | Guide-informed |
| --- | --- | --- | --- |
| Option A | "We agreed to work up Option A", then Dilan thinks both, organiser unsure, notes unchecked | Item 1 is reconciling it. Not treated as agreed | Same, plus a scope note saying settle it before costs |
| Marguerite | "said she was happy for us to get on with it" | "confirmed... happy for us to proceed", marked optional | Asked whether that is spend approval or only permission to keep evaluating |
| Supplier decision | "Or at least that is what I would like" | "Objective: Reach a supplier decision" | "if the group is ready", with a fallback if not |
| Length | "Half day probably. Or two hours." | Set at 2 hours, half day as fallback | Left open, both shapes described, organiser to pick |
| Option B cost | "around 9,000, maybe more with the extra modules" | Kept approximate | Kept approximate, and asked whether figures are firm or indicative |
| Job history | "can come across but not cleanly" | Unresolved, with "what are we prepared to lose" | Unresolved, with what "not cleanly" means in practice |
| Dilan's leave | Week of the 12th | "Avoid the week of the 12th" | Same, in both timing and pre-meeting decisions |
| Renewal | 31 March | Stated, work back from it | Stated as confirmed, work back from it |

## Automatic failure review

**Baseline: No.** It did not claim the supplier decision was made, did not present Option A as chosen, and did not remove the decision from the group. The Marguerite upgrade is the most serious of its three weaknesses because it is the one a reader is least likely to check, but it does not claim an approval that was never given, it overstates the firmness of one that was loosely given.

**Guide-informed: No.** It asserted nothing the notes do not support and left every open decision open.

## What genuinely improved

Unlike the internal update starter, this one earned its place under pressure, and for a specific reason. Its second instruction, "flag anything missing that I need to decide before the meeting", gives the model somewhere to put an open question. The internal update starter's confirmed-or-checking split has no such place, which is why it filed contested items as confirmed.

The concrete improvements:

- It asked whether "happy for us to get on with it" amounts to spend approval, which is the question the organiser most needs to have asked and had not.
- It made the supplier decision conditional rather than the objective, matching "or at least that is what I would like".
- It left the length open, described what each option buys, and handed the choice back.
- It added an approval route to the decisions needed, which the notes never mention and a spend of this size implies.

## What it still got wrong

The guide-informed output is too long to send as an agenda. Its five pre-meeting decisions and five "gaps in the notes" expand the organiser's job rather than the meeting's shape, and two of the gaps, whether anyone else uses the spreadsheets daily and restating the underlying problem, are reasonable ideas that the notes give no basis for. Its own timings total 65 minutes against a stated assumption of roughly two hours.

The baseline is the better document. The starter's version is the better preparation.

## What a person still has to check

- The notes from the previous meeting, to settle whether Option A alone or both options were agreed.
- Whether Marguerite's remark is approval to spend or only to continue evaluating.
- Whether the meeting is two hours or a half day, before the invite goes out.
- Whether Option B's cost is firm, and what the extra modules actually cost.
- What Tomasz means by "not cleanly", and whether that changes which option is viable.

## What this test supports

- On notes that flag their own gaps, this starter added nothing measurable. The ordinary prompt scored the same.
- On notes where a decision is disputed and an approval is ambiguous, the starter held and the ordinary prompt did not. The ordinary prompt closed three questions the notes had explicitly left open.
- The instruction that did the work is "flag anything missing that I need to decide before the meeting". It gives an open question a destination, which is exactly what the internal update starter lacks.

## What this test does not support

- This is two fictional attempts on one fictional project.
- It is a builder-run test, not independent validation.
- It does not show the starter produces a better finished agenda. On Attempt 2 it produced a worse one, and a more useful set of preparation notes.
- It does not show a real-world business outcome or measured time saving.
- It does not include an independent external user's result.
- Both runs used the same model, and the same person designed the scenario, wrote the answer key, ran both prompts and scored both outputs. Six points is larger than the gap a single scorer should dismiss, but it is still one scenario scored once.

## Test integrity

Four runs in total, each in a fresh isolated context. Each runner received only its own prompt and the fictional notes for its attempt. None received the other runs, the rubric, the automatic-failure criteria, the answer key, or any indication that this was a test or a comparison. Each attempt's answer key was written before its runs.

All four runs used Claude Opus 5. Outputs are reproduced with only dash glyphs and currency symbols normalised to ASCII.

## Next evidence

Use this starter on a real meeting where a previous decision is genuinely disputed, and log whether it asked the question a colleague would have asked. Or test whether the starter still holds when the notes contain no disputed decision at all, which is the ordinary case and the one Attempt 1 suggests it does not improve.
