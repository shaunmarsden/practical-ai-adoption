#!/usr/bin/env python3
"""Evidence-first decision aid for expansion of an AI workflow pilot."""
import argparse
import json
from pathlib import Path

FIELDS = {
    "business_outcome": "An agreed business outcome and success threshold",
    "baseline": "A baseline for comparison",
    "representative_test": "A representative test with recorded results",
    "quality_review": "A quality/error review with a named reviewer",
    "workflow_owner": "A named owner for the live workflow",
    "human_oversight": "Human approval and exception handling where needed",
    "data_approval": "Permission and controls for the data used",
    "rollback": "A stop/rollback plan",
    "user_training": "User instructions and support",
    "monitoring": "Ongoing monitoring and review date",
}
HARD_GATES = ("quality_review", "workflow_owner", "human_oversight", "data_approval", "rollback")
ALLOWED = {"yes", "no", "unknown"}


def assess(payload):
    if not isinstance(payload, dict) or not isinstance(payload.get("pilot"), str) or not payload["pilot"].strip():
        raise ValueError("pilot must be a non-empty string")
    evidence = payload.get("evidence")
    if not isinstance(evidence, dict):
        raise ValueError("evidence must be an object")
    if set(evidence) != set(FIELDS):
        raise ValueError("evidence must contain exactly these keys: " + ", ".join(FIELDS))
    for key, record in evidence.items():
        if not isinstance(record, dict) or record.get("status") not in ALLOWED:
            raise ValueError(f"{key}: status must be yes, no or unknown")
        if not isinstance(record.get("note"), str):
            raise ValueError(f"{key}: note must be a string")
        if record["status"] == "yes" and not record["note"].strip():
            raise ValueError(f"{key}: yes requires a specific evidence note")
    blockers = [k for k in HARD_GATES if evidence[k]["status"] != "yes"]
    gaps = [k for k in FIELDS if evidence[k]["status"] != "yes"]
    if blockers:
        decision = "DO NOT EXPAND"
        reason = "One or more essential control checks lack affirmative evidence."
    elif gaps:
        decision = "LIMITED PILOT ONLY"
        reason = "Essential controls are recorded, but the case for wider use is incomplete."
    else:
        decision = "READY FOR HUMAN REVIEW"
        reason = "All checks are recorded as met; a responsible person must still validate the evidence and approve any expansion."
    return {
        "pilot": payload["pilot"].strip(), "decision": decision, "reason": reason,
        "essential_blockers": [{"check": k, "requirement": FIELDS[k], "status": evidence[k]["status"]} for k in blockers],
        "remaining_gaps": [{"check": k, "requirement": FIELDS[k], "status": evidence[k]["status"]} for k in gaps],
        "checks_met": len(FIELDS) - len(gaps), "checks_total": len(FIELDS),
        "warning": "Self-reported notes are not independently verified. This tool cannot authorise deployment or establish ROI."
    }


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("input", type=Path, help="Path to a JSON pilot evidence record")
    args = p.parse_args()
    try:
        output = assess(json.loads(args.input.read_text(encoding="utf-8")))
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        p.exit(2, f"Input error: {exc}\n")
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
