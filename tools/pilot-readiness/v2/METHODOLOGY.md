# Method 2.0: current acceptable conditions

V1's known failure was not fixed by more note validation: a truthful Yes to "a review occurred" could coexist with a review rejecting wider use. V2 changes what is being asserted and what the rules use.

This is this project's proposed decision aid. It is not a legal, security or vendor certification framework. All inputs remain self-reported.

## Exact conditions

| Key | Yes now means |
| --- | --- |
| business_outcome | Results meet the agreed business threshold, with acceptable trade-offs and viable full operating costs, including human review and support. |
| baseline | The baseline is relevant and comparable to this workflow and its intended users, with justified adjustments and limits. |
| representative_test | Current tests cover intended scale, routine work, exceptions, affected users and the actual workflow/model version. |
| quality_review | Results meet agreed quality and error-severity limits, with no known unacceptable finding remaining. A completed review can correctly be answered No. |
| workflow_owner | A current accountable owner accepted the role with authority, resources and continuity cover. A historic name or powerless coordinator is insufficient. |
| human_oversight | Necessary approvals, practical review and exception handling demonstrably work under realistic workload without routine bypass. |
| data_approval | Permission and safeguards are current and cover the actual data, purpose, tool and proposed use, including applicable security/contract restrictions. |
| rollback | Proportionate stopping, recovery and containment have been demonstrated. Irreversible consequences need prevention/containment, not a claim that software rollback recalls an external action. |
| user_training | Users can and will operate the process, supported by usable training, support and sustainable maintenance. Attendance alone is insufficient. |
| monitoring | Monitoring, incident response and re-evaluation after material changes are workable and owned, with appropriate review dates/triggers. |

The five original gates are quality, ownership, oversight, permission and recovery. Their keys are retained for traceability, but their semantics are strengthened as above. All ten conditions now matter directly: **any operational No withholds expansion**. This replaces the V1 separation in which other failures could yield LIMITED PILOT ONLY. No numerical score is used.

## Material issue position and decision ordering

The user separately records `none_identified`, `unresolved` or `unknown`. An unresolved material issue may concern quality, safety, security, applicable requirements or other operational risk. The user supplies a summary, human owner/role, required action and specific next step. If these details are missing, the issue still withholds expansion and the result explicitly requires an owner and action to be determined. The tool does not guess the risk status from prose.

Rules in order:

1. A reported unresolved material issue produces WITHHOLD EXPANSION, regardless of every condition flag or an offline label.
2. A genuinely recorded synthetic/public offline learning boundary, with no real-person/operational impact or external effects, assessed issue position and supported applicable permission, uses the offline-learning route. Production conditions are displayed for future real use, but do not prohibit learning. Identification/date gaps require further assessment without becoming a production-governance prohibition.
3. For operational assessment, any No produces WITHHOLD EXPANSION. All known failed conditions remain visible, including the five original safeguards.
4. Unknown conditions, Yes without both a reference and finding, unknown issue position, missing context/identification/date or unreviewed migration date produce FURTHER ASSESSMENT REQUIRED. No permission to operate is implied.
5. Only an otherwise complete record produces COMPLETE RECORD - HUMAN DECISION REQUIRED. This means complete reported evidence, not independently established suitability.

The offline route is labelled OFFLINE EXPERIMENT - NO ROLLOUT DECISION. It is outside the three operational outcomes. Real or sensitive data, real people/decisions or external effects contradict an offline claim and require operational reassessment. Missing or refused applicable permission cannot use this route. A user must reassess before changing the boundary.

Scope records the activity, data context, external consequences, impact on people/decisions, proposed scale and current version. Consequential contexts add an explicit specialist/human-review action; the tool does not assign a numerical risk tier or decide compliance. The strengthened quality/data/oversight criteria still require acceptable evidence for that actual scope. A qualified reviewer must decide what evidence is sufficient.

## Evidence, language and report treatment

A Yes needs a supporting record reference and a finding note to complete the record. Presence is checked, not truth or semantic sufficiency. There is no minimum word count, maturity percentage or fabricated ROI. Concise checkable notes no longer fail a verbosity threshold.

Known material issues are prominent, with human ownership and actions, in both the result and the opening report summary. Negative condition notes are visible near the result. Missing evidence and current-condition claims are distinguished. Complete records use a neutral blue treatment, insufficient results amber and withheld expansion red; no green approval cue is used. Notes with positive claims remain available for independent checking. The report identifies method/schema and migration provenance.

## Evidence from adversarial cases

See [all thirty results](comparison.md). Separate fixtures reassess the frozen facts against the stronger questions; the engine contains no case identifiers, fictional names or evidence-phrase filters. Their transformations and invented supplements are explicit. Positive scope, measured-value, cost and support facts not established in V1 are added as fictional assumptions rather than inferred from old Yes flags.

Twenty-three observable adverse cases are withheld for faithfully recorded V2 facts. The sixteen new challenge cases include effective low-risk operation, unsupported support, rejected quality, conflicting approvals, incidents, version changes, irreversible effects, authority and offline permission. They are new cases, not an external blinded holdout. N16 predicts a complete record under false structured claims and adverse prose; that outcome documents the remaining information limit.

## Limits

Neither changed wording nor structured fields can make a false claim true. AD-19's fabricated records and N16's false acceptance/no-issue claims remain undetectable without actual record inspection. Someone can still select Yes while typing adverse prose. V2 makes that Yes false to the question, rather than a truthful report that a rejected review happened, but it does not semantically police the answer.

This has not been independently validated by an outside expert or tested with actual managers. The same assistant built V1, reviewed it and implemented V2. Software parity, fictional judgements and browser tests are different evidence classes; none establishes actual business effectiveness, security, compliance or reliable user understanding. A responsible qualified person must inspect the source records, current controls, intended consequences and local approvals before any real decision. Do not promote the tool as validated risk clearance.

The [OpenAI, Anthropic and Google readings](../../../research/official-ai-adoption-resources.md) are supporting context. No vendor designed, tested or endorsed this method. Their publications are not its validation data.
