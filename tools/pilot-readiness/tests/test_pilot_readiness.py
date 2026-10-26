import unittest
from pilot_readiness import FIELDS, assess


def case(status="yes"):
    return {"pilot": "Fictional support triage assistant", "evidence": {
        k: {"status": status, "note": "Fictional signed-off record"} for k in FIELDS}}


class ReadinessTests(unittest.TestCase):
    def test_all_checks_pass_requires_human_review(self):
        result = assess(case())
        self.assertEqual(result["decision"], "READY FOR HUMAN REVIEW")
        self.assertEqual(result["checks_met"], 10)

    def test_missing_data_approval_blocks(self):
        payload = case()
        payload["evidence"]["data_approval"] = {"status": "unknown", "note": ""}
        self.assertEqual(assess(payload)["decision"], "DO NOT EXPAND")

    def test_missing_owner_blocks(self):
        payload = case()
        payload["evidence"]["workflow_owner"] = {"status": "no", "note": "Owner not nominated"}
        self.assertEqual(assess(payload)["decision"], "DO NOT EXPAND")

    def test_noncritical_gap_keeps_pilot_limited(self):
        payload = case()
        payload["evidence"]["monitoring"] = {"status": "unknown", "note": ""}
        self.assertEqual(assess(payload)["decision"], "LIMITED PILOT ONLY")

    def test_unknown_is_not_pass(self):
        payload = case("unknown")
        self.assertEqual(assess(payload)["checks_met"], 0)
        self.assertEqual(assess(payload)["decision"], "DO NOT EXPAND")

    def test_yes_requires_note(self):
        payload = case()
        payload["evidence"]["quality_review"]["note"] = ""
        with self.assertRaises(ValueError):
            assess(payload)

    def test_missing_field_rejected(self):
        payload = case()
        del payload["evidence"]["baseline"]
        with self.assertRaises(ValueError):
            assess(payload)

    def test_extra_field_rejected(self):
        payload = case()
        payload["evidence"]["surprise"] = {"status": "yes", "note": "x"}
        with self.assertRaises(ValueError):
            assess(payload)


if __name__ == "__main__":
    unittest.main()
