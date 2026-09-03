# Evidence Status

This page separates what exists from what has actually been shown.

Every guide here has a worked example and a scored test. None of that is the same as evidence that the guide helps somebody else, and two of the columns below are empty for every single row. That is the honest position, not a work in progress with a completion date.

## How to Read the Matrix

- **Worked example** means there is a public before-and-after using fictional information: an ordinary first attempt, and one written using the guide.
- **Scored test** gives the two results out of 30 against the [rubric](#the-rubric-these-scores-use), ordinary prompt first. Where a test ran more than one scenario, the figure is the hardest one.
- **Runs per prompt** is the one that matters most and reads worst. A test marked **1** ran each prompt once. A single run is weak evidence, and this repository has measured how weak: re-running one identical prompt on identical notes moved its score by a point, and another moved five. Three of twelve tests have been repeated. Nine have not.
- **Real use** means a guide has been used on genuine low-risk work and the finding logged. No guide here has this. The one record in [evidence](evidence/real-use-reusable-handover-workflow.md) says on its own first line that it is not a test of the current guides.
- **Outside scoring** means somebody other than the author scored the outputs. Nobody has.

Note the difference between *attempts* and *runs*. Several tests have two attempts, meaning a second, harder scenario was written after the first showed no difference. That is not the same as running the same prompt twice, which is what the runs column records.

The internal update row is the awkward one, and its figure says so. Its ordinary prompt was run twice on the same notes, which is where the one-point movement was found. Its starter was rewritten between those runs, so no single version of it was run twice.

## The Current Picture

| Guide | Worked example | Scored test | Runs per prompt | Real use | Outside scoring |
| --- | --- | --- | ---: | --- | --- |
| [You Have Been Given AI at Work](guides/you-have-been-given-ai-at-work.md), action list starter | [Yes](examples/ambleforth-action-list-example.md) | [22 to 27 vs 29 to 30](evaluations/ambleforth-action-list-review.md) | 3 | Not yet | Not yet |
| [You Have Been Given AI at Work](guides/you-have-been-given-ai-at-work.md), agenda starter | [Yes](examples/sowerby-crane-agenda-example.md) | [23 to 24 vs 29 to 30](evaluations/sowerby-crane-agenda-review.md) | 3 | Not yet | Not yet |
| [You Have Been Given AI at Work](guides/you-have-been-given-ai-at-work.md), internal update starter | [Yes](examples/netherford-internal-update-example.md) | [29 to 30 vs 28 to 29](evaluations/netherford-internal-update-review.md) | 2, ordinary prompt only | Not yet | Not yet |
| [Prompting Fundamentals](guides/prompting-fundamentals.md) | [Yes](examples/thornfield-team-connect-prompting-example.md) | [24 vs 30](evaluations/thornfield-team-connect-prompting-review.md) | 1 | Not yet | Not yet |
| [Finding a Good First AI Use Case](guides/finding-a-good-first-ai-use-case.md) | [Yes](examples/marlowe-birch-first-use-case-example.md) | [24 vs 30](evaluations/marlowe-birch-first-use-case-review.md) | 1 | Not yet | Not yet |
| [From a Prompt to a Useful Workflow](guides/from-a-prompt-to-a-useful-workflow.md) | [Yes](examples/juniper-vale-prompt-to-workflow-example.md) | [17 vs 29](evaluations/juniper-vale-prompt-to-workflow-review.md) | 1 | Not yet | Not yet |
| [How to Tell Whether AI Actually Helped](guides/how-to-tell-whether-ai-actually-helped.md) | [Yes](examples/calthorpe-rees-ai-trial-evaluation-example.md) | [20 vs 30](evaluations/calthorpe-rees-ai-trial-evaluation-review.md) | 1 | Not yet | Not yet |
| [When Not to Use AI](guides/when-not-to-use-ai.md) | [Yes](examples/ashworth-vale-ai-safeguards-example.md) | [29 vs 30](evaluations/ashworth-vale-ai-safeguards-review.md) | 1 | Not yet | Not yet |
| [Before You Put Work Data Into AI](guides/before-you-put-work-data-into-ai.md) | [Yes](examples/delacroix-partners-ai-data-safety-example.md) | [30 vs 30](evaluations/delacroix-partners-ai-data-safety-review.md) | 1 | Not yet | Not yet |
| [Before You Let AI Tools Work Together Unsupervised](guides/before-you-let-ai-tools-work-together-unsupervised.md) | [Yes](examples/grantley-utilities-agentic-oversight-example.md) | [14 vs 29](evaluations/grantley-utilities-agentic-oversight-review.md) | 1 | Not yet | Not yet |
| [The Gap Between AI Access and Actual Use](guides/the-gap-between-ai-access-and-actual-use.md) | [Yes](examples/hollis-speight-ai-access-gap-example.md) | [11 vs 28](evaluations/hollis-speight-ai-access-gap-review.md) | 1 | Not yet | Not yet |
| [Why AI Projects Stall After the Demo Works](guides/why-ai-projects-stall-after-the-demo-works.md) | [Yes](examples/pemberton-underwriters-ai-adoption-stall-example.md) | [28 vs 30](evaluations/pemberton-underwriters-ai-adoption-stall-review.md) | 1 | Not yet | Not yet |

## How Much Weight the Scores Can Carry

The three repeated tests are the only ones whose gaps have been checked, and checking them changed all three:

| Test | Single-run gap | Gap after three runs of each prompt |
| --- | --- | --- |
| Agenda starter | 6 points | 5 to 7 points, ranges do not overlap |
| Action list starter | 7 points | 2 to 8 points, ranges do not overlap |
| Internal update starter | 1 point against the guide | No gap, ranges overlap entirely |

Two of those three numbers moved materially, and one reversed into nothing. Repetition also corrected three specific claims: a failure listed as happening three times out of three turned out to happen once, a weakness described as a one-off turned out to repeat, and a seven-point gap turned out to be as little as two.

The nine tests marked **1** in the matrix have not had that check. Their gaps may hold, narrow, or disappear. A seventeen-point gap like the access-and-use test is unlikely to vanish, but nothing here has shown that it does not narrow.

The other limit repetition does nothing about: the same person wrote every scenario, every answer key, and scored every output. A scoring bias held consistently looks exactly like a real effect, which is why the last column exists and why it is the one that would change most.

## The Rubric These Scores Use

All twelve tests score two outputs against the same six areas, five points each: factual and evidence fidelity, task alignment, use of context, unknowns and conflicts, practical usefulness, and responsible use and human control. Each review lists what the scores mean and shows its own working, area by area, so a disagreement with a score can be aimed at a specific line rather than the total.

The rubric is project-authored. It is not endorsed by any organisation, and each review says so on its own first line.

## What Is Missing

Two things, and neither is a content gap.

**Nobody has used these guides on real work and logged it.** Not a single row. That is not a reason to manufacture a test: [issue #4](https://github.com/shaunmarsden/practical-ai-adoption/issues/4) deliberately says to wait for a genuine low-risk task rather than recruit one.

**Nobody outside this project has scored anything.** All three repeated tests state this limitation, and two name it as their next step. A single honest line from somebody who disagreed with one score, and said which one, would be worth more than another invented scenario.

If you try a guide, or read a review and think a score is wrong, say so in [Discussions](https://github.com/shaunmarsden/practical-ai-adoption/discussions). Please do not include employer, customer or confidential information.
