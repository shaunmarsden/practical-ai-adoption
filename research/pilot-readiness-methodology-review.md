# Pilot readiness: independent desk review of the method

Review date: 26th October 2026. Scope: the ten criteria, five hard gates, Python and browser rules, browser tests, validation record and sample fictional report. This is an **independent desk critique of the published implementation**, not an external expert assessment, a user study or proof of real-world effectiveness.

## What is supported

- The decision is transparent and deterministic. The browser and Python test suite compares decisions across all 59,049 combinations of ten Yes/No/Unknown answers.
- An unknown or negative answer on quality review, ownership, human oversight, data approval or rollback blocks expansion.
- A complete record is labelled READY FOR HUMAN REVIEW, not an authorisation. Reports distinguish self-reported notes from verified evidence.
- The fictional blocked case correctly identifies an unknown data permission as an essential blocker.

The source and results are documented in [validation.md](../tools/pilot-readiness/validation.md). A successful code test supports **rule consistency**, not the validity of the rules themselves.

## Methodological weaknesses and practical consequences

| Issue | Why it matters | Recommended treatment |
| --- | --- | --- |
| Self-attested Yes can contradict the evidence note | The code cannot tell that a detailed note says permission was refused; an all-Yes record can still reach READY FOR HUMAN REVIEW | Keep the human review requirement visible; do not use the result as approval. In later versions consider a separately evidenced reviewer decision, not a fake AI truth score |
| Business outcome, baseline and representative test are not hard gates | Missing business value can produce LIMITED PILOT ONLY once essential safeguards are marked Yes. That label may be mistaken for an approved limited deployment | Explain that LIMITED PILOT ONLY is **not** permission to operate. Consider a clearer label in a separately reviewed methodology revision |
| The ten checks compress different risk levels into Yes/No/Unknown | A record may exist but have unacceptable residual risk; e.g. an error review can be completed and still find dangerous errors | Future decision design should distinguish **review completed** from **results acceptable against a pre-agreed threshold**, and stop on known unacceptable outcomes |
| No question explicitly requires affected users to accept the revised workflow | A pilot can be technically sound but ignored in daily operations | Treat real-user workflow fit and adoption evidence as a candidate additional dimension, after testing for overlap with training and monitoring |
| No explicit accountability for ongoing operating costs, maintenance, change control or incident response | A one-off pilot may be impractical or unsafe to sustain | Evaluate whether operational support, cost and change ownership should become separate required checks for expansion |
| No quantified treatment of pilot scope and risk severity | The same ten flags can describe a low-impact drafting helper and a high-impact decision system | Limit claims to a **first-pass checklist**. Do not present the output as a risk-tier or compliance decision |
| No assessment of baseline quality or representativeness | Any Yes note can claim a baseline and testing even when the sample is biased | Require human inspection of actual methodology, test coverage, errors and decision thresholds |
| No independent reviewer or user trials | Internal scenarios verify expected paths, not whether real managers interpret decisions correctly | Obtain permission for safe, non-confidential usability trials and independently scored cases before claiming validated value |

These are analytical risks inferred from the implementation. They are **not observed failures in customer deployments**.

## Relationship to published vendor resources

The [official resource guide](official-ai-adoption-resources.md) points to OpenAI's evaluation and use-case guidance, Anthropic's enterprise implementation guide and Google's framework landing page. Their general themes of measurement, ownership and iteration align with several checks here. That does **not** validate this ten-check scoring rule or its five selected gates.

The detailed Google whitepaper was not reviewed in the resource guide, so no claim about matching its internal maturity dimensions is appropriate.

## Release judgement and next evidence

The present tool is suitable as an **open-source first-pass conversation aid with human review**. It is not validated for operational go/no-go decisions without a qualified reviewer examining source records and the actual risk context.

Before selling an assessment service on the strength of this tool, complete:

1. **Publication smoke test:** confirm GitHub Pages serves the new route, the old homepage still works, and a PDF generated from the live fictional example opens correctly.
2. **Independent case review:** ask a reviewer who did not write the rules to assess a varied fictional case set *before* revealing tool outputs. Record disagreements and whether the tool gives misleading reassurance.
3. **User comprehension check:** watch whether people understand READY FOR HUMAN REVIEW and LIMITED PILOT ONLY as non-approvals, without prompting them towards the intended answer.
4. **Methodology revision proposal:** if the reviews uncover unsafe outcomes, document proposed changes, their effect on prior cases and a migration plan. Do not silently alter gates to improve apparent results.

## Boundaries

No organisation's internal records, client outcomes, financial savings or vendor endorsements were used in this review. External effectiveness, live publication, cross-browser accessibility and actual user understanding remain unverified.
