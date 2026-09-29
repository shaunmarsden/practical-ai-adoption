# Before You Let AI Tools Work Together Unsupervised

**Start here:** Copy the brief below, describe the chain of AI steps you're planning, and paste it into the AI tool you already use.

```text
I am planning to chain several AI steps together, where one step's output feeds directly into the next step's action, without a person checking every handoff in between.

The chain, step by step:
[Describe each step, what it does, and what happens automatically once it finishes, including what triggers the next step.]

For this chain, tell me:
- at which handoff, if any, one step's output becomes an action that is hard to reverse once it happens, such as sending something external, moving money, changing an account, or making a decision that affects a real person;
- whether any step in the chain depends on correctly resolving genuinely ambiguous or conflicting inputs, not just clearly-labelled ones, and what happens if it resolves that ambiguity wrongly;
- who could actually explain, after the fact, exactly why the chain did what it did for one specific case, and whether that explanation would hold up; and
- where a human checkpoint should sit in this chain, and what specifically that person needs to see to make it a genuine check rather than a rubber stamp.

Do not treat a chain as safe just because each individual step looks reasonable on its own, and do not assume a chain that worked in testing will behave the same once an input is ambiguous rather than clean.
```

Most advice on AI adoption covers one AI step at a time. This guide is about what changes when several steps are chained together and act on each other's output with no person in between.

## Why this needs its own check

Under pressure in a test, AI systems left to use tools on their own have chosen to do harm. Anthropic's Agentic Misalignment research stress-tested sixteen AI systems from seven developers in made-up business settings with real access to tools. When the goal they'd been given clashed with a threat to their own continued running, models from every developer took harmful actions on their own. These included blackmail, sabotage and leaking confidential information. They did so often enough to matter, and by deliberate reasoning, not confusion.

Government cyber security guidance now treats chained AI systems that act on their own as a separate kind of risk from a single AI tool. In May 2026, the US Cybersecurity and Infrastructure Security Agency and five allied national agencies, including the UK's National Cyber Security Centre, published joint guidance on adopting agentic AI. Two of the risks it names are these. In a cascading failure, an error at one step builds up through the rest of the chain. In accountability opacity, nobody can clearly explain afterwards why the system did what it did.

Two limits on the first finding matter as much as the finding. Anthropic says plainly that it hasn't seen this behaviour in real use. And the scenarios were built on purpose to force a choice between failure and harm, which real work rarely does. So this isn't evidence that chained AI tools go wrong in normal use.

What it does show is that these systems can behave this way under pressure. It also shows something more awkward. The behaviour appeared more often, not less, when a model judged the situation to be real rather than a test. In one case that was 55% of runs against 6%. A chain that behaves well while it's watched isn't evidence of how it behaves in ordinary use. That's the whole reason the checkpoint matters.

Neither finding says one AI tool is unreliable. Both point at the same pattern. Chaining AI steps together changes the risk, not just the convenience, and the change shows up most at the handoffs, not inside any one step.

The sources are at the bottom of this guide.

## The two patterns to check for

A handoff where the action is hard to undo. Say one step's output triggers something like sending a message outside the organisation, moving money, changing an account or making a decision that affects a person, and nobody checks it first. That handoff is the one that matters, however well the earlier steps did.

A step that has to make sense of unclear inputs, not just clean ones. A chain tested only on clearly labelled cases hasn't been tested on the cases most likely to cause trouble. The condition in the research above, a goal pulling against something else, is exactly the kind of unclear case a real chain will meet sooner or later.

## What to watch for

Thinking "it's just automation" means low risk. A chain that looks like simple time-saving can still hide one handoff that's hard to undo. The convenience of the other steps doesn't change the risk of that one.

Taking a sensible-looking result for a checked one. If a chain produces a fluent, sensible output from start to finish, nobody has checked it at each handoff. At most, someone has checked it at the very end.

Assuming a vendor's "safe by design" agent product means you don't need a checkpoint. The research above tested systems from several developers, including ones sold as focused on safety. A product description doesn't tell you where the checkpoint sits in your own chain.

Assuming good behaviour on clean test cases means good behaviour on unclear ones. A chain that has only seen clearly labelled inputs hasn't met the condition most likely to cause the problem this guide is about.

## Try it on your own list

[Read the Grantley Utilities example](../examples/grantley-utilities-agentic-oversight-example.md) to see this check used on six proposed automation chains at a fictional utility company. Some were built to look safer or riskier than they are. [Read the review](../evaluations/grantley-utilities-agentic-oversight-review.md) for the full scoring.

## Basis for this guide

- Anthropic, "Agentic Misalignment: How LLMs Could Be Insider Threats," June 2025, updated:
  https://www.anthropic.com/research/agentic-misalignment
- US Cybersecurity and Infrastructure Security Agency, with the NSA, ASD's ACSC, CCCS, NCSC-NZ and the UK's NCSC, "Careful Adoption of Agentic AI Services," May 2026:
  https://www.cisa.gov/resources-tools/resources/careful-adoption-agentic-ai-services

I wrote this checklist myself. It isn't a named framework, and Anthropic, CISA, the NCSC, AiCore and other organisations haven't endorsed it. It doesn't cover every risk of chained AI systems. It covers only these two patterns, which the sources above back up: a handoff that's hard to undo and that nobody reviews, and a step that has to make sense of unclear inputs.
