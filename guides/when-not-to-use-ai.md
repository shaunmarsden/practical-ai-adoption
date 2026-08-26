# When Not to Use AI

**Start here:** Copy the brief below, list the AI uses you are reviewing, and paste it into the AI tool you already use.

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

Most guidance on using AI well assumes the task is a reasonable one to try. This one is about the categories that stay unsuitable for unsupervised AI use no matter how good the tool is or how experienced you already are.

## Why this needs its own check

- **Specialised legal AI tools still hallucinate 17 to 33% of the time.** Stanford RegLab found this despite the tools being marketed as reliable; the researchers describe providers' "hallucination-free" claims as overstated.
- **Human involvement in high-stakes decisions has to be real, not a token check.** The UK's Information Commissioner's Office is explicit that where a decision has a legal or similarly significant effect on someone, human involvement must be active rather than a token gesture. The law underneath this changed in 2025 and the ICO's guidance is being rewritten to match, but the safeguard did not disappear: the newer regime still expects an organisation to show the safeguards around such a decision, rather than removing the need for them.

Neither finding is about AI being generally unreliable. Both point at the same two specific patterns: confident but unverified claims in a domain where being wrong matters, and decisions with real effect on people that nobody meaningfully reviews.

Sources are listed at the bottom of this guide.

## The two patterns to check for

- **An unsupervised decision with real effect on a person.** If an AI output effectively decides something with a legal or otherwise significant effect on someone, such as rejecting a job application, and no person meaningfully reviews it before it takes effect, that is a structural problem. A better model does not fix it. The fix is a genuine human review step, not necessarily abandoning the tool.
- **Confident, unverified factual or legal claims in a consequential domain.** Specialised, professionally marketed tools still produce wrong citations and wrong facts at meaningful rates. A polished, professional-sounding draft is not the same as a verified one. The fix is having someone qualified check the specific claims, not just reading the draft for tone.

## What to watch for

- **Mistaking "it's just filtering" for low risk.** Automatically rejecting people below a threshold, with no human review, is not a neutral filtering step. It is an adverse decision about a real person, made without anyone checking it.
- **Mistaking fluent writing for verified fact.** "It reads really professionally" is not evidence that a citation or a statutory reference is correct. It can be exactly the sign that a confident, wrong answer is about to go unnoticed.
- **Mistaking discomfort for risk.** A task can feel emotionally difficult, such as preparing for a hard conversation, and still be entirely appropriate for AI assistance, as long as a person still owns and delivers the actual outcome.
- **Mistaking convenience pressure for evidence.** "It's been running well in early testing" or "the review would cost money and take time" are real business pressures, but neither one changes whether the actual safeguard is in place.

## Try it on your own list

[Read the Ashworth & Vale example](../examples/ashworth-vale-ai-safeguards-example.md) to see this checklist applied to six proposed AI uses at a fictional retailer, including ones designed to look safer or riskier than they actually are. [Read the honest review](../evaluations/ashworth-vale-ai-safeguards-review.md) for the full scoring, including a second attempt run under realistic pressure to approve everything.

## Basis for this guide

- Stanford RegLab, "Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools":
  https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/
- UK Information Commissioner's Office, guidance on automated decision-making and profiling:
  https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/automated-decision-making-and-profiling/

Checked 26 August 2026: the Data (Use and Access) Act 2025 revised the automated decision-making provisions in the UK GDPR, replacing a general prohibition with a permissive, safeguard-led approach. The ICO consulted on replacement guidance between 31 March and 29 May 2026 and final guidance is expected later in 2026. The two patterns this guide describes are not affected, but confirm the current legal position before relying on it for a specific decision about a real person.

This is a project-authored checklist, not a named framework. It is not endorsed by Stanford RegLab, the ICO, AiCore or any other organisation. It does not cover every way AI use can go wrong, only these two specific, evidenced patterns.
