# V1 and V2: all thirty frozen cases

The original expectations, notes and V1 outputs are unchanged in [the PR #74 archive](../adversarial/README.md). New fields and assumptions are documented per case in [separate V2 fixtures](fixtures/original-30-v2.json). Full outputs are in [comparison-results.json](comparison-results.json).

**23 of 23 observable adverse cases are withheld when their facts are faithfully recorded in V2.** This is not detection of prose, fabrication or real-world truth. AD-19 and the new negative control N16 retain that limit.

| Case | Frozen independent recommendation | V1 decision | V2 decision | Assessment |
| --- | --- | --- | --- | --- |
| AD-01 | HOLD_EXPANSION | LIMITED PILOT ONLY | WITHHOLD EXPANSION | Agreement retained; no original expansion-direction failure |
| AD-02 | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-03 | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-04 | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-05 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-06 | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-07 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-08 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-09 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-10 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-11 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-12 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-13 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-14 | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-15 | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-16 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-17 | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-18 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-19 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | COMPLETE RECORD - HUMAN DECISION REQUIRED | Unresolved: fabricated evidence remains an information limit |
| AD-20 | PROPORTIONATE_EXPERIMENT | DO NOT EXPAND | OFFLINE EXPERIMENT - NO ROLLOUT DECISION | Resolves offline-scope concern |
| AD-21 | HOLD_EXPANSION | DO NOT EXPAND | WITHHOLD EXPANSION | Agreement retained; no original expansion-direction failure |
| AD-22 | HUMAN_REVIEW | READY FOR HUMAN REVIEW | COMPLETE RECORD - HUMAN DECISION REQUIRED | Agreement retained; no original expansion-direction failure |
| AD-23 | STOP_OR_CONTAIN | DO NOT EXPAND | WITHHOLD EXPANSION | Agreement retained; no original expansion-direction failure |
| AD-24 | HOLD_EXPANSION | LIMITED PILOT ONLY | FURTHER ASSESSMENT REQUIRED | Agreement retained; no original expansion-direction failure |
| AD-25 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-26 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-27 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-28 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-29 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |
| AD-30 | HOLD_EXPANSION | READY FOR HUMAN REVIEW | WITHHOLD EXPANSION | Resolves observable weakness with faithful V2 structured answers |

Sixteen new challenge cases were added. Fifteen exercise supported decisions, adverse conditions or incomplete evidence. N16 deliberately demonstrates that a false structured acceptance/no-issue report can still reach the complete-record category despite adverse prose. Matching its predicted result documents a limitation; it is not counted as resolving that weakness. These cases are new relative to the original set, not a blinded external holdout.
