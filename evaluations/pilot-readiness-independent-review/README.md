# Independent review pack: AI Pilot Readiness V2

**Status: prepared, NOT RUN.** All cases are fictional. This pack is a practical way to obtain outside judgement and non-technical comprehension evidence, **not** proof that the methodology has been validated.

## Aim and boundary

V2 currently uses ten current-condition checks, a separate unresolved-material-issue status and four distinct routes (three operational outcomes plus an offline-learning route). Its rules and implementation have been tested by the same AI-assisted development process. What remains untested is whether **someone outside that process** agrees with the decisions or understands what the labels mean.

Do not recruit real users, contact anyone, or put employer/customer data in this repository without specific approval. Only publish anonymous, consented results if appropriate.

## Files and separation

- [reviewer-pack.md](reviewer-pack.md): eight cases, independent judgement sheet and comprehension questions. **Give this file alone to the outside reviewer**. Do not show the key, the tool results, V2 code or the historical adversarial cases first.
- [facilitator-key.md](facilitator-key.md): *provisional* anticipated tensions, not ground truth. Keep this away from the reviewer until their first-pass responses are locked.
- This README: protocol and blank comparison template.

These are newly written fictional scenarios, not a blinded independent study merely because the prompts differ from previous fixtures. The facilitator and author share knowledge of V2.

## Simple protocol

1. Give one reviewer unfamiliar with the project **only** the reviewer pack. They read the eight fictional cases and choose one recommended disposition for each, citing the decisive facts and what they would need to see next. Allow uncertainty and alternate actions.
2. Ask the five plain-English comprehension questions **before explaining the tool**. Record verbatim answers where the reviewer agrees to this.
3. Lock and date the responses. Only then show the live [V2 assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/), its definitions and the facilitator key.
4. Have the facilitator enter the cases faithfully. Where a case is missing facts needed for a Yes, use Unknown rather than inventing evidence. Record exact entered choices and, if generated, local PDF/JSON filenames. Do **not** copy sensitive or identifying reviewer information into the public repo.
5. Compare the reviewer's direction, the rule-based result and the facilitator's provisional expectations. Identify disagreement **reasons**, not just agreement count. Distinguish an assessment-design issue from a misunderstanding or missing facts.
6. If a material false-reassurance risk appears, propose the smallest correction on a separate PR. If none appears, state only what this small review supports. Do not call one review a validation study.

**Suggested interpretation:** use no pass threshold. The most important signals are a confidently reassuring result despite a known unresolved risk, or users interpreting a complete record as authorisation.

## Comparison worksheet (copy locally, keep private until appropriate)

| Case | Reviewer decision and reason | V2 decision and entered assumptions | Agreement? | What was misunderstood or absent? | Proposed action |
| --- | --- | --- | --- | --- | --- |
| R01 | | | | | |
| R02 | | | | | |
| R03 | | | | | |
| R04 | | | | | |
| R05 | | | | | |
| R06 | | | | | |
| R07 | | | | | |
| R08 | | | | | |

For comprehension, record each answer verbatim and mark **clear / ambiguous / potentially unsafe understanding**, with a short quote supporting the judgement. Do not score a reviewer against wording they were never taught.

## What not to conclude

- A second AI run is **not** an independent human review.
- Deterministic parity and successful PDF generation establish software behaviour, not decision quality.
- A reviewer who agrees with all eight cases does not prove readiness triage is safe in other organisations or use cases.
- A reviewer who disagrees may reveal a scenario ambiguity rather than a defect. Preserve their original answer instead of rewriting the case to fit the tool.
- Neither this pack nor V2 gives legal, security, compliance or deployment approval.

**Current handoff:** prepare pack, obtain consent and outside review when convenient, compare results, then decide whether V2 needs a bounded change. No further application feature work is authorised by this pack.
