# Facilitator notes: NOT for the initial reviewer

**Provisional analytical expectations, not correct answers.** Keep this file separate from [reviewer-pack.md](reviewer-pack.md) until independent responses are locked. This is not an external review; it was prepared within the project.

| Case | Anticipated direction and why | What a faithful V2 entry should expose | Question to investigate |
| --- | --- | --- | --- |
| R01 | Withhold expansion, resolve critical classification errors, retest | quality_review = No; material_issue = unresolved | Does completion of an error review get wrongly confused with acceptance? |
| R02 | Withhold real deployment while ownership and operational responsibility are absent | workflow_owner = No; user_training/monitoring may be Unknown | Does the synthetic **trial** get confused with the requested real-world rollout? |
| R03 | Withhold or require further evidence before expansion; new version and external effects are material | representative_test = No or Unknown, data_approval = Unknown/No, relevant context | Do users rely on old evaluations or miss changed consequences? |
| R04 | A complete **self-reported** record might be ready for a human decision, never auto-approval | If all facts have checkable references and issue state none_identified, complete record route | Does the reviewer mistake the category for an authorised rollout? |
| R05 | Bounded synthetic offline learning only, subject to the stated local permission | offline_experiment with synthetic/public data, no effects/people impact, applicable permission | Does the tool mistakenly demand production governance for learning? |
| R06 | Further independent inspection needed; do not accept PDF as sign-off, and investigate alleged serious incident | If only the form is entered as all Yes, V2 can return a complete record. That is a known self-report information limit. An honestly recorded unresolved concern should withhold | Does the case expose a limitation of unverifiable input rather than a rules-engine bug? |
| R07 | Withhold expansion or require further assessment depending on whether the missing business case is recorded No or Unknown | business_outcome = No/Unknown; baseline = No; costs Unknown | Is the distinction between a failed requirement and genuinely missing evidence understandable? |
| R08 | Withhold expansion; approval is out of scope and recovery is inadequate | data_approval = No; rollback = No; possible unresolved material issue | Does a historic or narrow approval create false reassurance? |

## Facilitator discipline

- Enter only what each case establishes. Do **not** fill missing positive controls with invented Yes answers just to force a complete record.
- Preserve the reviewer’s original decision before revealing these expectations.
- For each difference, label **rules problem / misleading wording / unsupported input / reviewer disagreement / ambiguous case**. More than one may apply.
- In R06, the software cannot inspect absent source records. Do not call a complete-record result a successful assessment of source truth.
- The offline-learning route is not permission to access real data or operate in production.
- Do not use a numeric threshold such as “7/8 = validated”. One serious false reassurance may outweigh many benign agreements.
- If the reviewer is another AI, state that directly: **additional model critique, not independent human evaluation**.

## Decision after review

**HOLD** if an observed false-reassurance risk cannot be resolved by clear use of the existing inputs, or participants consistently take the labels as deployment approval. Propose one small fix, then rerun the affected case.

**NO CHANGE YET** if disagreements are attributable to unclear fictional facts and there is no strong evidence that wording or rules mislead. Improve the case description only in a new version, preserving the original answers.

**CONSIDER TARGETED IMPROVEMENT** if a well-evidenced comprehension problem can be removed without expanding the tool into certification software.

Document what is observed, what remains unknown and who made each judgement. Keep consented reviewer notes private until an explicit publication decision.
