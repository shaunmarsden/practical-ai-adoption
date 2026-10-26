# Practical AI Adoption

Plain-English guides for using AI well at work, based on evidence. You don't need a technical background.

It starts with one habit: give AI a better brief, then check what comes back. The examples are made up. Each test says what it does and doesn't show.

## Start here

**[Try one ordinary task with your approved AI tool](guides/you-have-been-given-ai-at-work.md).** The starting guide has three prompts for writing, planning and summarising. Pick one, give it information you're allowed to use, and check the result.

No coding or installation needed.

## Find the guide you need

### For your own work

| What you need | Open this guide |
| --- | --- |
| A clearer request and a way to check the answer | [Give AI a better brief](guides/prompting-fundamentals.md) |
| Help choosing a task to try | [Find a good first AI use case](guides/finding-a-good-first-ai-use-case.md) |
| Corrections without changing your wording | [Correct your writing without rewriting it](guides/get-ai-to-correct-your-writing-without-rewriting-it.md) |
| A process you can repeat, not another one-off prompt | [Turn a prompt into a useful workflow](guides/from-a-prompt-to-a-useful-workflow.md) |
| A fair check of whether it was worth the effort | [Tell whether AI actually helped](guides/how-to-tell-whether-ai-actually-helped.md) |

### For safety and team decisions

| What you need | Open this guide |
| --- | --- |
| A check before pasting work information | [Before you put work data into AI](guides/before-you-put-work-data-into-ai.md) |
| Help recognising work AI shouldn't do unsupervised | [When not to use AI](guides/when-not-to-use-ai.md) |
| A check before linking AI steps that can act without review | [Before you let AI tools work together unsupervised](guides/before-you-let-ai-tools-work-together-unsupervised.md) |
| A picture of how people actually use AI, beyond having a licence | [The gap between AI access and actual use](guides/the-gap-between-ai-access-and-actual-use.md) |
| Help understanding why a rollout has stalled | [Why AI projects stall after the demo works](guides/why-ai-projects-stall-after-the-demo-works.md) |

## Official adoption research

[OpenAI, Anthropic and Google adoption resources](research/official-ai-adoption-resources.md) collects links to publicly available vendor guides, including downloadable PDFs. It distinguishes publisher recommendations from evidence and shows how to apply the ideas to an ordinary workflow. No third-party PDFs are copied here.

## Check whether a pilot is ready to expand

**[Open the AI Pilot Readiness Assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/).** Complete ten guided checks in your browser, explore a fictional example and download a PDF report. No installation, account or AI API is needed. Answers stay in page memory unless you export them.

It identifies recorded blockers and evidence gaps; it never authorises deployment. [Methodology, tests and the existing Python checker](tools/pilot-readiness/README.md) explain the rules and validation limits.

For a short explanation of what the tool demonstrates, see [the portfolio overview](research/pilot-readiness-portfolio-explanation.md). A [methodology desk review](research/pilot-readiness-methodology-review.md) documents where its rules could still give false reassurance and what independent validation is missing.

## See one complete test

The [Thornfield Team Connect example](examples/thornfield-team-connect-prompting-example.md) gives an ordinary prompt and a guide-informed prompt the same made-up evidence. Both write a reply to a venue.

[Read the scored review](evaluations/thornfield-team-connect-prompting-review.md): ordinary prompt **24/30**, guide-informed **30/30**. Neither output failed automatically. I ran each prompt once and scored both outputs myself. This is one fictional test, not proof of a real business benefit.

Rather try checking an output yourself? [Sort nine claims from made-up meeting notes](https://shaunmarsden.github.io/practical-ai-adoption/). An AI prompt got three wrong, so I rewrote it. The page shows that an ordinary prompt still matched the rewritten one.

## What is actually proven, and what is not

Every guide has a worked example and a scored test. No guide has been used on real work and logged. Nobody outside this project has scored anything.

[Evidence Status](EVIDENCE-STATUS.md) links every example and review, including ties, failures and repeat runs. Eight of the 12 prompt-against-guide tests ran each prompt only once, and one (Juniper Vale) used fixed outputs, not live runs. The editing test is separate and was scored by a script. A single run is weak evidence, and scores from different tests aren't directly comparable.

<details>
<summary>How this differs from the big AI courses</summary>

You may have found [Generative AI for Beginners](https://github.com/microsoft/generative-ai-for-beginners) or the [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide). Both have tens of thousands of stars and far more resources than this, and both are more thorough than anything here. They're also a different thing. They teach you to build with AI through a structured course. This is for someone who got a licence on Monday, has an ordinary work task on Tuesday, and wants one page rather than 21 lessons.

Closer in aim are [GitHub's AI adoption playbook](https://github.com/github/ai-adoption-playbook), which is written for organisations rolling AI out rather than for the person receiving it, and [AI Literacy Superpowers](https://github.com/Habitat-Thinking/ai-literacy-superpowers), which packages a literacy framework as developer tooling. Both are worth reading if either suits you better than this.

I searched all four for a rubric or a scored result. The one thing here I didn't find in any of them is a scored before-and-after of the advice itself: an ordinary attempt and a guide-informed attempt on the same made-up notes, both scored, with the failures written down. [Evidence Status](EVIDENCE-STATUS.md) shows how far that goes and where it stops, including the two columns that are empty for every guide.

I haven't built a comparison table for this repository, as I did for [Practical AI Sales Workflows](https://github.com/shaunmarsden/practical-ai-sales-workflows/blob/main/COMPARISON.md). Only two projects do the same job. Scoring a 21-lesson course against a rubric it never signed up to would look like a comparison and work like a smear.

</details>

## What I plan to do next

The [Roadmap](ROADMAP.md) lists the two gaps this repository has. The tests named both, so I didn't have to guess: nobody outside the project has scored anything, and no guide here has a logged real use of its own.

## Existing real use evidence

There are two records, and neither tests the current guides as they stand.

[Editing an AI Draft Is Not Checking It](evidence/real-use-ai-assisted-fact-check-failure.md) is a negative finding from one real task that went outside the organisation. An AI-assisted report went out with a wrong figure in it. An ordinary editing pass didn't catch it, and a colleague spotted it afterwards. The lesson is that checking a claim against its source is a different job from improving the wording.

[Reusable AI Handover Workflow](evidence/real-use-reusable-handover-workflow.md) records repeated real use of a structured, AI-assisted way of writing handovers. It supports the ideas behind these guides.

## Related project

Looking for B2B sales workflows? [Practical AI Sales Workflows](https://github.com/shaunmarsden/practical-ai-sales-workflows) takes the same evidence-first approach to common sales jobs.
