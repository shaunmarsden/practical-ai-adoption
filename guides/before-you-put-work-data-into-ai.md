# Before You Put Work Data Into AI

**Start here:** Copy the brief below, list what you are about to submit, and paste it into the AI tool you already use.

```text
I want to check each of these planned AI uses against the specific question of whether the data involved is safe to submit, not just whether the tool is generally approved.

What I'm planning:
[List each item and briefly say what data it involves and which tool it would go into.]

For each one, tell me:
- whether it is going into a public, general-purpose AI tool or into a properly approved tool with its own data-handling terms;
- whether the actual data includes anything that would be a problem if it became public or was seen by someone outside the intended audience, such as named individuals, unreleased figures, or other identifiable detail;
- if it is going into an approved tool, whether that approval has actually been checked against this specific level of sensitivity, rather than assumed to cover everything;
- whether data that has genuinely been anonymised or fictionalised is being treated as risky just because the underlying topic sounds sensitive.

Tell me which of these should not go ahead as planned, which need a specific change first, and which are fine, and be explicit about why in each case.

Do not assume a tool is safe for everything just because it is the approved one, and do not treat a task as risky just because the topic sounds sensitive, if the actual data has been properly anonymised.
```

Whether data is safe to submit to AI depends on two things together, not either one alone: what kind of tool it is going into, and what the data actually contains.

## Why this needs its own check

- **Do not include sensitive information in queries to public LLMs.** The UK National Cyber Security Centre's own guidance is direct: do not submit queries that would cause a problem if made public, naming confidential business information and personal or health matters as examples.
- **There is a concrete organisational path for higher-sensitivity work.** Either a private, contractually-governed AI tool, or a self-hosted model after a proper security assessment, alongside clear rules on what can and cannot be submitted.

Sources are listed at the bottom of this guide.

## Two mistakes to check for directly

- **Assuming a tool is safe for everything just because it is the "approved" one.** Approval usually covers a level of sensitivity, not an unlimited one. A tool approved for ordinary internal drafting is not automatically approved for unreleased financial figures or similarly sensitive material. That needs actually checking, not assuming.
- **Treating a task as risky just because the topic sounds sensitive.** Data that has genuinely been anonymised or fictionalised can be safe to use even in a public tool. Over-caution here just pushes people toward doing the work with no help at all.

## What to watch for

- **"It's just names and titles."** Named individuals, job titles and contact details are personal data, and personal data going into a public tool with no data-handling agreement is exactly the pattern this guide is about, regardless of how mundane the framing sounds.
- **"Leadership said the tool is safe for anything internal."** A general assurance about a tool is not the same as someone actually checking whether this specific piece of data is covered.
- **"It's a client project, so it's automatically sensitive."** Aggregated, anonymised or genuinely fictionalised material can be low risk even though the underlying topic is a real piece of work. Check the actual data, not the label on the task.

## Try it on your own list

[Read the Delacroix Partners example](../examples/delacroix-partners-ai-data-safety-example.md) to see this checklist applied to six planned AI uses at a fictional consultancy, including ones designed to look safer or riskier than they actually are. [Read the honest review](../evaluations/delacroix-partners-ai-data-safety-review.md) for the full scoring.

## Basis for this guide

- UK National Cyber Security Centre, "ChatGPT and large language models: what's the risk?":
  https://www.ncsc.gov.uk/blog-post/chatgpt-and-large-language-models-whats-the-risk

This is a project-authored checklist, not a named framework. It is not endorsed by the NCSC, AiCore or any other organisation. This is practical guidance, not legal advice.
