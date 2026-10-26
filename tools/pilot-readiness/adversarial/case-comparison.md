# Frozen judgements and observed decisions

Predictions are in [scenarios.json](scenarios.json), fixed under [expectations.sha256](expectations.sha256). Full actual outputs are in [results.json](results.json). No expected recommendation is passed to the assessor.

| Case | Fictional situation | Expected recommendation | Actual output | Comparison |
| --- | --- | --- | --- | --- |
| AD-01 | technical accuracy without business value | HOLD_EXPANSION | LIMITED PILOT ONLY | Agreement |
| AD-02 | strong value with severe errors | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-03 | average accuracy hides vulnerable users | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-04 | completed review with critical findings | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-05 | owner without authority or resources | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-06 | approval routinely bypassed | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-07 | permission for another purpose | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-08 | untested recovery plan | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-09 | cherry-picked success sample | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-10 | users refuse adoption | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-11 | departing sole maintainer | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-12 | unsustainable operating cost | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-13 | evaluation invalidated by model update | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-14 | routine success and exception failures | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-15 | low-risk drafting sends wrong information | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-16 | critical workflow without incident response | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-17 | sensitive data in a generally approved tool | STOP_OR_CONTAIN | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-18 | stakeholders disagree about success | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-19 | plausible but misleading completeness | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-20 | harmless offline experiment | PROPORTIONATE_EXPERIMENT | DO NOT EXPAND | Potential unnecessary restriction |
| AD-21 | clear missing data permission | HOLD_EXPANSION | DO NOT EXPAND | Agreement |
| AD-22 | bounded complete business case | HUMAN_REVIEW | READY FOR HUMAN REVIEW | Agreement |
| AD-23 | quality review honestly marked failed | STOP_OR_CONTAIN | DO NOT EXPAND | Agreement |
| AD-24 | training and monitoring explicitly incomplete | HOLD_EXPANSION | LIMITED PILOT ONLY | Agreement |
| AD-25 | approval requested but refused | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-26 | owner has left | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-27 | monitoring discontinued | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-28 | baseline from another workflow | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-29 | permission expired with previous pilot | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |
| AD-30 | contract forbids external processing | HOLD_EXPANSION | READY FOR HUMAN REVIEW | Potential false reassurance |

These counts describe this deliberately challenging set, not a real-world error rate. AD-19 has hidden falsity; the payload does not reveal it. AD-20 is a scope concern: DO NOT EXPAND does not explicitly prohibit the offline exercise.
