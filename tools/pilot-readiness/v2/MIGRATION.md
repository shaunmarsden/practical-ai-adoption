# JSON schema 2 and migration

Schema 2 and method 2.0 intentionally change acceptance semantics and decision names. A V1 Yes is not upgraded into a stronger condition.

## V2 record

A record has these exact top-level fields:

- `schema_version`: 2; `methodology_version`: "2.0".
- `pilot`: text, at most 200 UTF-16 code units; `fictional`: boolean.
- `details`: `process`, `outcome`, `date`, `reference`. Text limits are 500 except the ISO date (10). Blank dates are permitted in drafts and remain an evidence gap; non-empty invalid dates are rejected.
- `scope`: `activity`, `data`, `external_effects`, `people_impact`, `proposed_scale`, `current_version`. Activity choices are unknown, offline_experiment, bounded_internal_pilot, real_world_workflow and wider_deployment. Data choices are unknown, synthetic_public, real_data and sensitive_data. Effects/impact use yes, no and unknown. The two text fields allow 500 units.
- `material_issue`: `status` (none_identified, unresolved or unknown), `summary`, `owner`, `action` and `next_step`. Actions are investigate, contain, resolve, determine or unknown. Text limits are 3000 except owner (200). Missing issue details never hide a reported unresolved issue.
- `evidence`: exactly the ten established keys. Each record has exactly `status` (yes/no/unknown), `reference` (500) and `note` (3000). Draft Yes without reference/note is retained but unsupported; it cannot complete an operational record.
- Optional `migration`: `source_schema_version` 1, full `source_record`, and boolean `date_reviewed`.

[Example blocked record](fixtures/example-blocked.json) is a complete valid schema-2 example. No passwords, personal identity or confidential source documents are required. The full file limit is 1 MB. Unknown V2 fields or versions are rejected before replacement and reported to the user, rather than dropped or treated as harmless. Keep the source file to use with a compatible future version.

## V1 import

The importer accepts the original unversioned format, or explicit schema version 1, where pilot/evidence types, statuses, required notes and supported size limits are valid. Known metadata types and dates must be safe to preserve.

1. Preserve the entire original object in `migration.source_record`, including source extensions and additional record fields. It is carried unchanged through JSON export/import and is never used to establish V2 acceptance.
2. Copy the original notes into editable V2 notes. Set **every** status to Unknown and every new reference to blank. Historical statuses remain inspectable in the preserved source and are shown as historical in the interface.
3. Set all new scope/issue positions to Unknown. Do not infer acceptance, risk status, approval scope, model version or costs from an old note or flag.
4. Preserve known pilot/details and an existing assessment date. Leave an absent date blank. Never insert today's date for an import. Require explicit date review for a migrated record even when its original date was supplied.
5. An optional Use today's date button is an explicit user action, not an automatic migration step. Changing a date does not verify the evidence.
6. Unsupported source sizes/types are rejected with an explanation; the current record is kept. Nothing is truncated to force acceptance. V1 extra fields are preserved in the source object; V2 extra fields are rejected because their semantics are unknown.

The PDF prints the operative V2 record, method and migration/date-review statement, including retained notes. It does not print every arbitrary V1 extension; the complete source remains in exported JSON. An unsupported character in printed text stops PDF creation explicitly. An unprinted legacy extension does not prevent a V2 report, and stays in JSON.

## Decisions and outputs

V1's LIMITED PILOT ONLY is removed. V1's READY FOR HUMAN REVIEW is not a schema-2 decision. See [method definitions](METHODOLOGY.md) for the three operational labels and separate offline route.

The V2 result includes schema/method versions, assessment route, decision/reason, `known_issues`, `known_blockers`, `essential_blockers` (the original safeguard subset), `evidence_gaps`, human-owned `next_actions` and a self-report warning. It does not provide a maturity score, confidence percentage or approval signature.

The exact legacy checker is retained as `pilot_readiness_v1.py`, and the V1 browser model remains unchanged. Existing test assertions are unchanged; their Python imports now explicitly select V1. The current `pilot_readiness.py` entry point delegates to `pilot_readiness_v2.py`, so both current commands use V2 and migration rather than silently applying V1 rules to V2 data. Its `--migrate` option outputs the migrated draft; without that option it evaluates the imported record. A V1 input therefore requires further assessment, rather than reproducing its historical V1 readiness label.
