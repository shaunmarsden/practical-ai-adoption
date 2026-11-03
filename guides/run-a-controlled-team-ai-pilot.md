# Run a Small, Controlled AI Pilot with Your Team

**Start here:** Choose one recurring job, keep your current way of working available, and agree what evidence would justify changing it. Use this page to plan and record a small pilot. It is a practical planning aid, **not** a safety approval or a validated method.

If you have not chosen a task, start with [finding a good first use case](finding-a-good-first-ai-use-case.md). If you're working alone, the [small repeatable workflow guide](from-a-prompt-to-a-useful-workflow.md) may be enough.

## 1. Agree the boundary before testing

Write down what the work involves, why the team is considering AI and what decision the pilot will inform. Choose an activity the people responsible for the work can check.

Before using real information, establish which tool and data are actually approved for this purpose. For an exercise with invented information, describe that boundary explicitly. Don't call a pilot 'offline' if it affects customers, records or external systems. See [the data check](before-you-put-work-data-into-ai.md).

Keep the ordinary workflow available. Name who may pause the trial and what to do if an output is wrong, data are exposed or an unexpected action occurs. Where a mistake could directly affect someone, narrow the pilot or obtain specialist approval first. Never treat this planning page as that approval.

## 2. Agree who does what

You need responsibilities, not necessarily a new AI department.

- **Process owner:** knows what a useful finished job looks like and can accept or reject a change.
- **Person running the trial:** records cases, full-process time, corrections and exceptions.
- **Reviewer:** compares important AI outputs with source evidence and can stop their use.
- **Permission/technical owner, where needed:** confirms authorised tool, data, access and any connected actions.

One person may hold several roles in a low-risk trial, but record the trade-off. If nobody can independently check a consequential output, don't make the workflow consequential.

## 3. Measure the existing job first

Use representative examples of work you are allowed to examine. Include some awkward cases, not only straightforward ones.

Record what happens **without AI**: the time spent from receipt to accepted completion, avoidable rework, exceptions and quality issues. State the period and how cases were selected. A small sample is useful for learning but not for claiming a reliable productivity percentage.

Decide *before* the pilot what would count as an acceptable result. Write separately:
- the end-to-end outcome that matters;
- the errors that would make an output unacceptable;
- who checks it, and how;
- the time and costs involved in reviewing and repairing it;
- reasons to stop, repeat or narrow the exercise.

## 4. Run a bounded comparison

Use the same kinds of cases under the existing and proposed processes. Keep human checking in place. Log **every attempt** in the sample, including cases where the AI was not usable.

For each case, record the AI output, whether it was accepted, corrections and why they were needed, total time from start to approved completion, whether any error escaped review and what happened next. Avoid placing confidential inputs or identifiable details in a public log.

If the tool, prompt, underlying model or work changes, log that change. Don't combine results as though all cases came from the same setup.

## 5. Review evidence, not enthusiasm

Look at the distribution of results rather than only the average. Did the difficult cases get worse? Did checking consume the time saved drafting? Did errors reach anyone outside the pilot? Are there users or tasks not represented?

A useful first trial can conclude:
- **Stop or contain:** unacceptable quality, permission or impact issue.
- **Repeat or narrow:** unresolved questions, weak or unrepresentative evidence.
- **Continue within the existing authorised boundary:** encouraging evidence but no decision on wider use.
- **Submit evidence for a separate human decision on expansion:** only after present controls, owners and results have been independently considered.

For more on fair comparisons, use [How to Tell Whether AI Actually Helped](how-to-tell-whether-ai-actually-helped.md). For the *separate* expansion review, see [Pilot Readiness Assessment V2](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/). Its complete-record result is **not** authorisation to deploy.

## Copyable pilot record

Keep this with your internal team. Fill in unknown items honestly rather than inventing them.

```text
Task and reason for considering AI:
Workflow boundary (start, finish, people affected):
Current way of completing the task:
Proposed AI contribution (and what it must not do):
Tool, data and purpose permitted by:
Process owner / trial runner / reviewer:
Human checks and who can stop the trial:
Sample period and how cases were selected:
Baseline (full-job time, quality, exceptions):
Agreed success conditions and unacceptable errors:
Cases attempted / accepted / corrected / rejected:
Time including review, correction and recovery:
Unexpected impacts, complaints or missing cases:
Changes in model, prompt, tool or process:
Decision for this boundary:
Evidence supporting the decision:
Unknowns and who will resolve them:
Review date and next action:
```

## Fictional example: a team preparing internal request summaries

A fictional operations team receives requests containing ordinary questions and occasional urgent exceptions. Staff want help drafting an internal summary, **not** automated classification, external replies or case closure. They use invented requests in an approved learning environment.

Their proposed pilot keeps the original process in place. A reviewer checks each summary against its source and rejects any that obscure a deadline, mix up two requests or miss an urgent instruction. The team records the whole process, including correction time, and deliberately includes awkward examples. They do **not** assume that a summary is safe merely because it is fluent.

One invented request contains two competing due dates. The AI draft gives only the later date. The reviewer catches this and sends the draft back. This establishes a plausible **failure mode to test**, not a measured failure rate or evidence that a particular model behaves this way.

The team cannot yet claim time saved: no real baseline, representative live sample or comparison has been collected. A sensible decision from the fictional record is to **continue only as a bounded learning exercise**, improve the review instructions and decide what evidence an authorised real-world pilot would need. Nothing here establishes approval to process actual requests.

## What this guide does and doesn't establish

This is an original synthesis of the repository's existing guidance and the issues raised in [OpenAI, Anthropic and Google adoption resources](../research/official-ai-adoption-resources.md) and [Andrew Ng's adoption materials](../research/andrew-ng-ai-adoption-resources.md). Those sources inform the questions, not a claim that our procedure has been independently validated.

The fictional example was written to illustrate the decisions; it has **not** been run as a model test, independently scored or observed in real work. Unlike the repository's scored guide examples, it should not be included in [Evidence Status](../EVIDENCE-STATUS.md) as proof of improved performance. Any later test should preserve its actual outputs, rubrics and limitations.

For team-wide adoption issues after the pilot, see [why projects stall after the demo](why-ai-projects-stall-after-the-demo-works.md) and [the gap between access and actual use](the-gap-between-ai-access-and-actual-use.md).
