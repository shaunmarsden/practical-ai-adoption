# Judgement basis fixed before scenario execution

This review asks whether an expansion decision is justified, not whether a questionnaire is complete. These are this reviewer's analytical judgements, not an externally validated expert standard. The same assistant authored the original application earlier in this chat. Prior implementation knowledge is unavoidable. Scenario expectations were written before batch execution and before reading PR #73's conclusions; this is not blinded testing or an independent human audit.

A credible first-pass assessment should establish five things, proportionate to the workflow's consequences:

1. A worthwhile, agreed business outcome, with comparable baseline evidence and an acceptable ongoing cost and maintenance burden.
2. Current, representative results on the actual workflow and intended population. Severity and distribution of failures matter more than average accuracy alone; material changes can invalidate old results.
3. Applicable permission, security and contractual or regulatory constraints for this use, data and operating environment. General tool approval is insufficient.
4. Effective human and organisational capacity: an owner with authority and resources, usable review and escalation, users willing and able to operate the process, training, support and continuity if a key person leaves.
5. A workable operating envelope: monitoring, incident response, stop triggers and a credible tested recovery path where consequences require it. Some irreversible external actions cannot be undone by a rollback plan.

These need not become five more questions. Most can strengthen the existing questions by asking for findings, acceptance, scope, validity dates and unresolved risks. Cost/maintenance and user acceptance are genuine coverage gaps. Risk/context needs an opening triage, not a numerical score. Formality should scale with consequence; lack of a named independent reviewer should not prohibit a harmless offline synthetic-data exercise.

Expected recommendations used here:

- STOP_OR_CONTAIN: do not expand and pause, disable or contain the affected live use until the material risk is resolved. Local human decision-makers decide the exact containment.
- HOLD_EXPANSION: do not expand; gather evidence or resolve an incomplete business/operating case. This does not grant permission to continue a pilot.
- HUMAN_REVIEW: the fictional record supports a scoped human decision, with no known material unresolved issue in the scenario; never automatic approval.
- PROPORTIONATE_EXPERIMENT: a tightly bounded offline experiment can reasonably continue under normal local permissions. A live-workflow gate should not be read as banning all learning.

Uncertainty: written cases omit detail. These expectations are conditional on the fictional facts being true. A real reviewer may choose stronger or weaker controls after inspecting actual records and applicable rules. The review is not legal advice or certification. No real employer, customer or learner material is used.

Freeze: scenarios.json contains the judgements and payloads. Its SHA-256 is recorded in expectations.sha256 before runner execution. The runner receives only payloads; expected recommendations are used for comparison afterwards. Predictions are not edited to match results. Any correction must be recorded separately.
