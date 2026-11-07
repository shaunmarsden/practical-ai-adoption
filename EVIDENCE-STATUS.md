# Evidence Status

This page separates what exists from what has been shown.

The original guide set has fictional examples and scored tests. Seven newer guides provide planning tools and illustrations but **do not** have scored experiments. Across the repository, no current guide has a logged real-work use test, and no outside person has scored its guide outputs. Software checks and fictional examples do not establish workplace value.

## AI Adoption Workbench

The [workbench](docs/workbench/index.html) is a guided notebook over existing guides, not another assessment. Its [software checks and limitations](tools/workbench/README.md) concern navigation, accessibility rules, local record export and preservation of unanswered or adverse notes. Fictional browser inputs do not establish guide effectiveness, independent human understanding, operational permission or workplace benefit. No real-use test or external user evaluation of the workbench has been conducted. The original guide evidence below is unchanged.

On 7 November 2026, [two fresh AI reviewer contexts examined the approval boundary](tools/workbench/reviews/2026-11-07/README.md) against frozen main at `e78ed2f`. Earlier tests, findings and facilitator keys were withheld, and each wrote fictional facts and expectations before executing challenges. Blank, completed-looking and contradictory records retained caveats, self-reported labels, missing authority and adverse findings. Neither reviewer demonstrated an actionable approval defect in those cases; no application change was justified. An optional opening-summary idea remains an unproven interpretation hypothesis.

This is **separate-context AI review in the same development environment**, not independent external human validation, observed user understanding, real-use evidence or proof that nobody could mistake a record for approval. The [original findings, expectations, first outputs and environment failures](tools/workbench/reviews/2026-11-07/README.md#retained-evidence) are retained. No rate of task completion or misunderstanding was measured, and no general safety claim follows. These limits remain evidence gaps, not a requirement to recruit testers before further development.

The [local Save draft and Reopen draft implementation](tools/workbench/drafts/README.md) has [separately prepared AI challenges frozen before implementation](tools/workbench/drafts/review-2026-11-07/README.md). The preservation reviewer passed 17 module and 24 browser checks; the privacy reviewer passed five scenarios with 39 assertions. Exact strings and blanks survived; rejected inputs, cancelled replacement and delayed-read edits preserved current notes. Imported decisions remained unverified self-reports. Initial browser-launch failures and first completed outputs are retained. These are bounded software observations in separate AI contexts, not external human validation, observed understanding or operational approval. Passing a draft PR's checks does not establish deployment.

## How to Read the Matrix

- The scenario column links the worked example. It's a before-and-after on made-up information: an ordinary first attempt, and one written using the guide. Every company and person in them is invented.
- The scored test column gives the two results out of 30, ordinary prompt first. Where a test ran more than one scenario, the figure is for the hardest one. **Don't compare these figures across rows.** Every test scores six areas out of five, so the scale is the same. But eight different sets of six areas are in use, and most are written for their own scenario. See [the rubrics](#the-rubrics-these-scores-use).
- The runs per prompt column matters most and looks worst. A test marked **1** ran each prompt once. The Juniper Vale test used fixed outputs, not live runs. One run is weak evidence, and I've measured how weak. Re-running one identical prompt on identical notes moved its score by a point, and another moved five. I've repeated three of the 12 tests. Nine haven't been repeated.
- Real use means someone has used the guide on real, low-risk work and logged what happened. No guide here has this. There are two records in [evidence](evidence/), and each says in its first line that it isn't a test of the current guides. One is [a reusable handover workflow](evidence/real-use-reusable-handover-workflow.md) used across repeated internal work. The other is [an AI-assisted report that went out with an incorrect figure in it](evidence/real-use-ai-assisted-fact-check-failure.md). The second is a negative finding, and it's the more useful of the two.
- Outside scoring means someone other than me scored the outputs. Nobody has.

Attempts and runs aren't the same thing. Several tests have two attempts: I wrote a second, harder scenario after the first showed no difference. That's different from running the same prompt twice, which is what the runs column counts.

The internal update row is the awkward one, and its figure shows it. I ran its ordinary prompt twice on the same notes, which is where the one-point movement came from. I rewrote its starter between those runs, so no single version of the starter ran twice.

## The Current Picture

| Guide | Scenario | Scored test | Runs per prompt | Real use | Outside scoring |
| --- | --- | --- | --- | --- | --- |
| [You Have Been Given AI at Work](guides/you-have-been-given-ai-at-work.md), action list starter | [Ambleforth](examples/ambleforth-action-list-example.md) | [22 to 27 vs 29 to 30](evaluations/ambleforth-action-list-review.md) | 3 | Not yet | Not yet |
| [You Have Been Given AI at Work](guides/you-have-been-given-ai-at-work.md), agenda starter | [Sowerby and Crane](examples/sowerby-crane-agenda-example.md) | [23 to 24 vs 29 to 30](evaluations/sowerby-crane-agenda-review.md) | 3 | Not yet | Not yet |
| [You Have Been Given AI at Work](guides/you-have-been-given-ai-at-work.md), internal update starter | [Netherford](examples/netherford-internal-update-example.md) | [29 to 30 vs 28 to 29](evaluations/netherford-internal-update-review.md) | 2 (ordinary prompt only) | Not yet | Not yet |
| [Prompting Fundamentals](guides/prompting-fundamentals.md) | [Thornfield](examples/thornfield-team-connect-prompting-example.md) | [24 vs 30](evaluations/thornfield-team-connect-prompting-review.md) | 1 | Not yet | Not yet |
| [Finding a Good First AI Use Case](guides/finding-a-good-first-ai-use-case.md) | [Marlowe & Birch](examples/marlowe-birch-first-use-case-example.md) | [24 vs 30](evaluations/marlowe-birch-first-use-case-review.md) | 1 | Not yet | Not yet |
| [From a Prompt to a Useful Workflow](guides/from-a-prompt-to-a-useful-workflow.md) | [Juniper Vale](examples/juniper-vale-prompt-to-workflow-example.md) | [17 vs 29](evaluations/juniper-vale-prompt-to-workflow-review.md) | None (fixed outputs) | Not yet | Not yet |
| [How to Tell Whether AI Actually Helped](guides/how-to-tell-whether-ai-actually-helped.md) | [Calthorpe & Rees](examples/calthorpe-rees-ai-trial-evaluation-example.md) | [20 vs 30](evaluations/calthorpe-rees-ai-trial-evaluation-review.md) | 1 | Not yet | Not yet |
| [When Not to Use AI](guides/when-not-to-use-ai.md) | [Ashworth & Vale](examples/ashworth-vale-ai-safeguards-example.md) | [29 vs 30](evaluations/ashworth-vale-ai-safeguards-review.md) | 1 | Not yet | Not yet |
| [Before You Put Work Data Into AI](guides/before-you-put-work-data-into-ai.md) | [Delacroix Partners](examples/delacroix-partners-ai-data-safety-example.md) | [30 vs 30](evaluations/delacroix-partners-ai-data-safety-review.md) | 1 | Not yet | Not yet |
| [Before You Let AI Tools Work Together Unsupervised](guides/before-you-let-ai-tools-work-together-unsupervised.md) | [Grantley Utilities](examples/grantley-utilities-agentic-oversight-example.md) | [14 vs 29](evaluations/grantley-utilities-agentic-oversight-review.md) | 1 | Not yet | Not yet |
| [The Gap Between AI Access and Actual Use](guides/the-gap-between-ai-access-and-actual-use.md) | [Hollis & Speight](examples/hollis-speight-ai-access-gap-example.md) | [11 vs 28](evaluations/hollis-speight-ai-access-gap-review.md) | 1 | Not yet | Not yet |
| [Why AI Projects Stall After the Demo Works](guides/why-ai-projects-stall-after-the-demo-works.md) | [Pemberton Underwriters](examples/pemberton-underwriters-ai-adoption-stall-example.md) | [28 vs 30](evaluations/pemberton-underwriters-ai-adoption-stall-review.md) | 1 | Not yet | Not yet |

## Newer guides without scored evaluations

These seven guides were added after the original scored-guide set. Their examples are hypothetical illustrations, not model runs or scored before-and-after tests. They are not missing from the matrix because someone forgot to count them; **their test status is different**.

| Guide | What it contains | Scored model test | Real use of guide | Outside scoring |
| --- | --- | --- | --- | --- |
| [Run a Controlled Team AI Pilot](guides/run-a-controlled-team-ai-pilot.md) | Pilot plan, record template, fictional example | Not conducted | Not yet | Not yet |
| [Build Role-Based AI Capability](guides/build-role-based-ai-capability.md) | Role-specific practice, learning record, fictional example | Not conducted | Not yet | Not yet |
| [Diagnose Why Team AI Adoption Is Not Working](guides/diagnose-why-team-ai-adoption-is-not-working.md) | Evidence-led adoption diagnostic, fictional example | Not conducted | Not yet | Not yet |
| [Compare AI with Other Ways to Improve Work](guides/compare-ai-with-other-ways-to-improve-work.md) | Options comparison and decision record, fictional example | Not conducted | Not yet | Not yet |
| [Map a Workflow Before Choosing AI](guides/map-a-workflow-before-choosing-ai.md) | Current-state process tracing and record, fictional example | Not conducted | Not yet | Not yet |
| [Map AI Tool Actions and Permissions](guides/map-ai-tool-actions-and-permissions.md) | Action, authority and failure-control record, fictional example | Not conducted | Not yet | Not yet |
| [Measure AI Capacity and Realised Value](guides/measure-ai-capacity-and-realised-value.md) | Evidence levels and value record, fictional arithmetic | Not conducted | Not yet | Not yet |

No new scores should be inferred from the earlier tests. Creating an assessment worksheet does not demonstrate its validity.

## One Test Scored by Script

This one isn't scored out of 30 and isn't one of the 12 above, so no count on this page includes it. It asks a narrower question: does the AI change text it was only asked to correct? A [script](scripts/edit_drift.py) scored 144 completed runs against a key I wrote first: 72 on each of two model settings. Each model ran four requests on six passages, three times each. Interrupted attempts were rerun and aren't part of that count.

| Guide | Scenario | Result | Runs per request | Real use | Outside scoring |
| --- | --- | --- | --- | --- | --- |
| [Getting AI to Correct Your Writing Without Rewriting It](guides/get-ai-to-correct-your-writing-without-rewriting-it.md) | [Six passages](examples/edit-without-rewriting-passages.md) | [Safe in 18 of 18 runs vs 1 of 18, plain request 11 of 18](evaluations/edit-without-rewriting-test.md) | 3 | Not yet | Not yet |

It's two model settings, and short passages and mistakes I wrote. The result column gives the first model's scores. On the second, edit-only was safe in 16 of 18 runs, "correct and polish" in five, and the plain request in 13. The [review](evaluations/edit-without-rewriting-test.md#a-second-model) gives both sets of results and the two misses on quotations.

## How Much Weight the Scores Can Carry

The three repeated tests are the only ones whose gaps I've checked. One gap held, one narrowed a long way, and one disappeared:

| Test | Single-run gap | Gap after repeat runs |
| --- | --- | --- |
| Agenda starter | 6 points | 5 to 7 points, ranges do not overlap. Confirmed |
| Action list starter | 7 points | 2 to 8 points, ranges do not overlap. Narrowed to as little as 2 |
| Internal update starter | 1 point against the guide | No gap. Baseline 29 to 30, starter 28 to 29, so the ranges meet |

So repeating the runs confirmed one result, narrowed another a lot, and removed the third. It also corrected three claims in the reviews. A failure recorded from a single run turned out to happen once in three. A weakness described as a one-off turned out to repeat in two of three. And a seven-point gap turned out to be as little as two.

The nine tests I haven't repeated haven't had that check. Their gaps may hold, narrow or disappear. A 17-point gap like the access-and-use test is unlikely to vanish, but nothing here shows that it doesn't narrow.

Repetition does nothing about the other limit. I wrote every scenario and every answer key, and scored every output. If I'm biased the same way every time, it looks just like a real effect. That's why the last column exists, and why it's the one that would change most.

## The Rubrics These Scores Use

There's no single rubric here, and the matrix would mislead if it suggested one.

Every test scores two outputs across six areas, five points each, so every figure is out of 30 on the same scale. What the six areas are varies. Eight different sets are in use across the 12 tests:

| Rubric | Used by |
| --- | --- |
| A shared general set: factual and evidence fidelity, task alignment, use of context, unknowns and conflicts, practical usefulness, responsible use and human control | The three starter tests, plus prompting fundamentals and prompt-to-workflow, so five tests |
| Seven scenario-specific sets, one per test | Safeguards, trial evaluation, data safety, agentic oversight, access gap, first use case, adoption stall |

The scenario-specific sets score whether an output caught the thing that scenario was built around, for example "identifying the hard-to-reverse handoff in the compensation chain" or "catching the false negative, quiet, self-deprecating, actually a daily user". They test that guide more sharply than a general set would, and they're why the scores can't be lined up against each other.

So 30 out of 30 on the data safety test and 30 out of 30 on the prompting test aren't the same measurement. Read each figure against its own review, not against the row above it.

I wrote every rubric. No organisation has endorsed any of them, and each review says so in its first line.

## A Change to the Examples

In October 2026 I gave five fictional characters who shared a first name different names, in eight files. Each keeps the same role, pronouns and story. The tests were run with the earlier names, and nothing else in those files changed.

## What Is Missing

The important gaps are external review and real-world use. The seven newer guides also have **no scored tests**, so their utility remains unestablished beyond their documented reasoning and illustrative examples.

**Nobody has used these guides on real work and logged it.** Not one row. That isn't a reason to set up a test: [issue #4](https://github.com/shaunmarsden/practical-ai-adoption/issues/4) says on purpose to wait for a real low-risk task rather than go looking for one.

**Nobody outside this project has scored anything.** All three repeated tests say so, and two name it as their next step. One line from someone who disagreed with one score, and said which, would be worth more than another made-up scenario.

If you try a guide, or read a review and think a score is wrong, say so in [Discussions](https://github.com/shaunmarsden/practical-ai-adoption/discussions). Please don't include employer, customer or confidential information.
