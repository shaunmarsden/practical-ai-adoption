# Finding a Good First AI Use Case

**Start here:** Copy the checklist below, fill in the tasks you are actually considering, and paste it into the AI tool you already use.

```text
I want to choose one sensible first AI experiment from a list of tasks I could try.

Here are the tasks:
[For each task, say: what it involves, how often it happens, how long it takes, what could go wrong if the output is wrong, and whether the information is sensitive.]

Assess them based on:
- whether the task happens often enough and takes enough effort for improvement to matter;
- whether AI is actually suited to the kind of work, or whether a simpler rules-based automation would do it better;
- whether the information is appropriate to use;
- how easy the output is for me to check;
- what could happen if the output is wrong;
- whether the first experiment can stay small, reversible and under my control;
- what a fair baseline and success measure would look like.

Rank the tasks.

Then give me:
1. the one you would try first;
2. why it is a good first experiment;
3. why the others would not be your first choice;
4. the smallest useful trial;
5. what I should measure;
6. what I still need to check or decide.

Do not assume permissions, policies or facts I have not given you.
Do not assume AI is the right tool just because a task is repetitive.
```

Most people trying AI at work do not fail because the tool is weak. They fail because they picked the wrong first task, either something too risky to learn safely from, or something so low-stakes it proves nothing either way.

## Start with a job, not a feature

A good first AI use case usually starts with an existing piece of work you already do, not with a model capability you have read about. If you cannot point to the task before you open an AI tool, that is worth noticing.

Two UK studies back this up, not because they are the final word, but because they show this is a common, well-documented barrier rather than a personal failing. The government's 2026 AI Adoption Research found that not having identified a use for AI is one of the most common barriers UK businesses report. The Office for National Statistics found the same pattern in its 2023 survey of UK firms: difficulty identifying activities or business use cases was the most commonly reported barrier to AI adoption. Sources are listed at the end of this guide.

## What a strong first experiment usually looks like

A task worth trying first usually has most of these:

- **It happens often enough to matter.** A one-off task gives you one data point. Something recurring lets you judge whether it actually helps.
- **It plays to what AI is actually good at.** Interpreting messy language, drafting, summarising or spotting patterns in text. Not fixed, rule-based data entry.
- **You already know what a good result looks like.** If you cannot judge the output, you cannot learn from the trial.
- **The information is appropriate to use.** Ordinary work content is easier to start with than anything confidential or personal.
- **It is small enough to try without new tooling or integration.** You should be able to run it alongside your current process, not replace it on day one.
- **A person still makes the consequential call.** The trial should not need to hand over a decision that affects a customer, a payment or someone's employment.
- **You can measure it against something.** A rough sense of the current time or quality is enough. Without it, you cannot tell whether the trial actually helped.

## What to watch for

- **A repetitive task is not automatically an AI task.** If the rules are fixed and there is no real judgement involved, a simple script, macro or existing system feature is usually a better fit, and more reliable, than a language model.
- **A task can be too sensitive or consequential for a first try**, even if AI could plausibly help with part of it. Confidential personal data, financial approval and anything customer-facing are usually better as a second or third experiment, once you have a working sense of how much to trust the output.
- **A task can be too easy to prove anything.** If it takes minutes and nothing meaningful hangs on getting it right, a good result will not tell you much either way.
- **Watch for a vague idea of success.** If you could not say in advance what "it worked" would look like, the trial will not settle anything.

## Try it on your own list

Write down two or three real tasks you actually do, with enough detail to judge them against the checklist above; how often, how long, what a wrong answer would cost, and whether the information is sensitive. Then run the starter prompt at the top of this guide.

The [Marlowe & Birch example](../examples/marlowe-birch-first-use-case-example.md) shows this tested against six deliberately mixed tasks, including one that looks like a good AI candidate but is not. [Read the honest review](../evaluations/marlowe-birch-first-use-case-review.md) for what the comparison did and did not show.

## Basis for this guide

**Public evidence:** the barrier this guide addresses is documented in the UK government's [2026 AI Adoption Research](https://www.gov.uk/government/publications/ai-adoption-research/ai-adoption-research) and the [ONS's 2023 survey of management practices and technology adoption in UK firms](https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/articles/managementpracticesandtheadoptionoftechnologyandartificialintelligenceinukfirms2023/2025-03-24).

**Project guidance:** the selection checklist, the starter prompt, the worked example and the test method are this project's own independent interpretation. They are not supplied, reviewed or endorsed by DSIT, the ONS, OpenAI or AiCore.
