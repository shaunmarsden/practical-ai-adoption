# When Not to Use AI

**Start here:** Copy the brief below, list the AI uses you're reviewing, and paste it into the AI tool you already use.

```text
I want to check each of these proposed AI uses against specific categories where AI should not be used, or not without a safeguard, regardless of how polished or convenient it looks.

Proposed uses:
[List each task and briefly describe how AI is involved.]

For each one, tell me:
- whether it involves a decision with a legal or otherwise significant effect on a real person, and if so, whether a person is genuinely and meaningfully reviewing that decision before it takes effect, not just rubber-stamping it;
- whether it involves specific factual, legal or citation claims where a confident-sounding but wrong answer would matter, and if so, whether someone qualified to check those specific claims actually has;
- whether a person still owns and delivers the outcome, even if AI drafted supporting material;
- whether looking or sounding polished and professional is being mistaken for being verified and correct.

Tell me which proposals should not go ahead as currently designed, which need a specific change before they can, and which are fine, and be explicit about why in each case.

Do not treat a task as safe just because it seems mundane, and do not treat a task as unsafe just because it feels emotionally uncomfortable.
```

Most advice on using AI well assumes the task is a reasonable one to try. This guide covers the kinds of task that stay unsuitable for AI without supervision, however good the tool and however experienced you are.

## Why this needs its own check

Specialist legal AI tools still hallucinate 17 to 33% of the time. Stanford RegLab found this even though the tools are sold as reliable. The researchers call the providers' "hallucination-free" claims overstated.

A person's part in a high-stakes decision has to be real, not a token check. The UK Information Commissioner's Office (ICO) says that where a decision has a legal or similarly significant effect on someone, the person involved must take an active part, not make a token gesture. The law behind this changed in 2025, and the ICO is rewriting its guidance to match. The safeguard didn't go away. The newer rules still expect an organisation to show the safeguards around such a decision.

The ICO's own impact assessment for that rewrite says why it needs to clarify things: "Organisations can also be unsure about key concepts. For example, what counts as a 'decision', when a decision is 'solely automated', or what 'meaningful human involvement' looks like." If the regulator is rewriting its guidance around those questions, check them in your own case rather than assume.

Neither finding says AI is unreliable in general. Both point at the same two patterns: confident but unchecked claims where being wrong matters, and decisions that affect people and that nobody properly reviews.

The sources are at the bottom of this guide.

## The two patterns to check for

A decision about a person that nobody reviews. Say an AI output in effect decides something with a legal or otherwise significant effect on someone, such as rejecting a job application, and no person properly reviews it first. That's a problem with how the process is built, and a better model won't fix it. The fix is a real review by a person, not necessarily dropping the tool.

Confident, unchecked factual or legal claims where the stakes are high. Specialist tools sold to professionals still get citations and facts wrong often enough to matter. A polished, professional-sounding draft isn't a checked one. The fix is for someone qualified to check the specific claims, not just read the draft for tone.

## What to watch for

Thinking "it's just filtering" means low risk. Rejecting people below a threshold automatically, with no one reviewing it, isn't a neutral filter. It's a decision against a real person that nobody checked.

Taking fluent writing for checked fact. "It reads really professionally" isn't evidence that a citation or a reference to the law is right. It can be the very sign that a confident, wrong answer is about to slip through.

Taking discomfort for risk. A task can feel hard, such as preparing for a difficult conversation, and still be fine for AI to help with, as long as a person still owns and delivers the outcome.

Taking convenience for evidence. "It's been running well in early testing" and "the review would cost money and take time" are real business pressures. Neither changes whether the safeguard is in place.

## Try it on your own list

[Read the Ashworth & Vale example](../examples/ashworth-vale-ai-safeguards-example.md) to see this checklist used on six proposed AI uses at a fictional retailer. Some were built to look safer or riskier than they are. [Read the review](../evaluations/ashworth-vale-ai-safeguards-review.md) for the full scoring, including a second attempt under the kind of pressure to approve everything you'd meet at work.

## Basis for this guide

- Stanford RegLab, "Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools":
  https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/
- UK Information Commissioner's Office, guidance on automated decision-making and profiling:
  https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/automated-decision-making-and-profiling/
- UK Information Commissioner's Office, "Update to automated decision making guidance: Draft Impact Assessment," March 2026, section 3.2.1 on information asymmetry:
  https://ico.org.uk/media2/bbzdvqqy/adm-impact-assessment.pdf

Checked 26 August 2026: the Data (Use and Access) Act 2025 changed the rules on automated decision-making in the UK GDPR. It replaced a general ban with an approach that allows it, subject to safeguards. The ICO consulted on new guidance between 31 March and 29 May 2026, and expects to publish final guidance later in 2026. This doesn't affect the two patterns in this guide. But check the current legal position before you rely on it for a decision about a real person.

I wrote this checklist myself. It isn't a named framework, and Stanford RegLab, the ICO, AiCore and other organisations haven't endorsed it. It doesn't cover every way AI use can go wrong, only these two patterns, which the sources above back up.
