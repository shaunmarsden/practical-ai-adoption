# V2 validation record

Date: 26 October 2026. Scope: branch implementation, fictional records and local previews. **V2 is not live.** A pull request and passing CI do not establish publication. After an approved merge, verify the actual deployed commit, questions, material-issue override, imports/exports and PDF downloads before changing that status.

## Methodological regression evidence

[All thirty cases](comparison.md) retain the original expected recommendations, notes and V1 results from PR #74. The frozen source SHA-256 remains `6301443b722507364a8f84d00c89515027b6b88a617104f59db3a858dc4ebb21`. The review archive is copied from commit `b2440a8160cf4262a38b18f77bab3325982cbcda`, without changing its files. The V1 Python checker is retained byte for byte as `pilot_readiness_v1.py`; its hash is compared to PR #74's recorded source hash. The V1 browser model and examples are unchanged.

[Separate V2 records](fixtures/original-30-v2.json) disclose each changed status, explicit material-issue input, scope assumption and fictional positive supplement. No old Yes was silently upgraded. The engine uses no scenario identifiers, fictional names or evidence-phrase filters.

- **23 of 23 observable adverse cases:** withhold expansion when their facts are faithfully entered into the stronger structured conditions/issue position. Zero of those 23 remain a complete operational record under those stated inputs.
- **AD-19:** remains an information limit. Plausible fabricated records and false acceptance/no-issue claims can still produce a complete record. No semantic or fabrication detection is claimed.
- **AD-20:** uses the offline-learning route with synthetic/public information, no real effects and explicitly assumed applicable permission. Production governance is not treated as a prohibition on learning.
- **AD-01, AD-21, AD-22, AD-23, AD-24:** retain the original expansion-direction agreement, with non-permissive labels and stronger semantics. AD-22 has a practical path to independent human decision; AD-24 requires further assessment.

Sixteen [new challenge cases](fixtures/new-challenges.json) were authored before their first execution. All sixteen predicted outputs match. Fifteen exercise the intended rules for incomplete support, a viable bounded case, unacceptable findings, conflicting permission, incidents, model changes, irreversible effects, correctly scoped permission, authority, offline use, unknown risks and unsupported evidence. **N16 is a negative control:** false structured claims with adverse prose still reach the complete-record category. Its predicted match documents an unresolved self-report limitation, not a successful safety finding. These are new relative to the original cases, not a blinded external holdout or population error rate.

## Software checks

- `npm test`: 23 Node tests passed, comprising eight retained V1 model tests and fifteen V2 tests. The V1 suite retains all 59,049 status-combination comparisons. V2 tests cover the frozen archive, all 46 records, full Python/browser output parity, single-condition No/Unknown/unsupported Yes, issue override, scope routing, metadata/date review, short notes, malformed inputs, unsupported fields/versions and Unicode size/whitespace boundaries.
- Existing Python unit suite: 8 tests passed. Assertions are unchanged; imports now explicitly select the exact V1 checker. The current `pilot_readiness.py` command delegates to V2. The versioned V2 command, migration command and explicit V1 command were also executed.
- V2 browser suite: **92 fixture journeys** passed, all 30 transformed cases and 16 new cases at 1440 x 1000 and 390 x 844. Additional interactions cover four examples/routes, explicit issue visibility, concise notes, unsupported Yes, exact V2 JSON round trip, V1 source/notes/extensions preservation, absent dates, unsupported input/version retention, literal HTML-like text, unsupported PDF glyphs and the long-note report.
- A fresh form journey completed all ten current-condition questions using keyboard-selected radio controls and record references, without importing a ready-made record. Cancelled and confirmed reset paths were exercised. The skip link received keyboard focus. All ten conditions remain navigable and native labels/fieldsets are retained.
- No uncaught page errors or console errors were observed on the V2 assessment journeys. A local icon eliminates the assessment's previous missing-favicon request. Request assertions allow only explicit same-origin application asset URLs, GETs and empty bodies; no answer-bearing request was observed. localStorage/sessionStorage and cookies were empty. This does not make claims about host logs, browser extensions or untested future changes.
- The original meeting-notes homepage loaded and accepted a quiz answer at both sizes. No homepage functionality was replaced.

## PDF and visual checks

Thirteen actual V2 browser downloads were extracted and checked: blocked, insufficient, complete, offline, supported-text and migrated records at both sizes, plus a long-note boundary record. Decisions, all references, full notes, known issue summaries, owners and actions are retained. Page bounds and footer separation passed. The long record preserves all ten end markers and a 2,800-character unbroken token. The known unresolved issue heading appears on the opening summary page.

Representative desktop/mobile screenshots and rendered report pages were inspected. Adverse results are red, incomplete results amber and complete records neutral blue. There is no green approval treatment. Scope and consequences appear in the report. Undated imports remain explicitly undated; a V1 date-review statement is printed. Supported Latin/Greek/Cyrillic text is retained. Unsupported glyphs fail explicitly with JSON available; unprinted legacy extensions remain in JSON and do not incorrectly block a PDF.

Reports are not tagged accessibility PDFs. The HTML result and JSON offer text access. No screen-reader audit, real-manager comprehension study, cross-browser certification, legal/security audit or external methodological validation was completed. The same assistant authored V1, its adversarial review and V2.

## Development findings and corrections

- The first browser run found that the navigation and final action both had the accessible name View result. Renamed the final action Assess this record. The repeated full journeys then passed.
- Review identified a boundary where missing offline metadata plus a negative production-only condition could imply a prohibition on learning. The separate offline route now retains a further-assessment result for metadata gaps without using production governance to withhold the exercise; Python/browser regression tests cover it.
- Python and JavaScript length/whitespace handling were aligned, including UTF-16 units, BOM and NEL, rather than claiming parity only for ASCII examples.
- Report inspection found technical enum values such as bounded_internal_pilot in scope text. Values are now printed with ordinary spaces, and historical implementation labels were replaced with the manager-facing Essential safeguard label.
- Further review found that a recorded investigation owner/next step on an Unknown issue position needed to be retained explicitly in actions and PDF context. Both engines and report checks now cover that preservation.
- The default Python command was made a V2 entry point. The exact V1 implementation was retained explicitly so a V2 input cannot accidentally be evaluated under V1 by using the familiar current command.

These are development observations, not real organisational outcomes. No failure or original expectation was edited to improve the apparent V1 results.

## Historical V1 checks

The unchanged V1 browser suite was also run against an isolated local snapshot of `origin/main` at the PR #72 merge, rather than pretending V1 UI assertions apply to V2. Its 26 scenario/interaction groups passed at both sizes.

To reproduce that baseline from a checkout where main still denotes V1, use:

```bash
mkdir -p work/v1-preview
git archive 5a5b1a2cd7dd4aa432bdb4f81b480d0d03dfb8bd docs | tar -x -C work/v1-preview
python3 -m http.server 8766 --directory work/v1-preview/docs
```

In another terminal:

```bash
BASE_URL=http://localhost:8766 npm run test:v1:browser
```

The historical PR #74 writer/live scripts should be run from their original commit if reproducing that review. Do not overwrite frozen V1 outputs with new V2 source metadata. Current V2 tests read the frozen archive and compare it without rewriting it.

## CI and release

Repository CI runs the retained/new logic tests, Python unit tests, V2 browser journeys, PDF extraction/bounds and the V2 scenario comparison, retaining screenshots, request logs, input JSON and actual PDFs. See the pull request's check result for the current remote execution; local success is not a claim that a remote run or deployment succeeded.

**Recommendation: ready for human review and publication**, subject to review, an approved merge and actual deployment verification. This is not an assertion of external validation, operational approval or suitability for consequential decisions without qualified record inspection. AD-19 and N16 remain explicit limitations. Do not market a complete record as validated risk clearance.
