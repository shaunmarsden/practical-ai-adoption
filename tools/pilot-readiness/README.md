# AI Pilot Readiness Assessment V2

**[Open the browser assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/).** No installation, account, paid product or AI API is needed. Until the V2 pull request is approved, merged and its deployment checked, that public link still serves V1. This branch's V2 has been tested locally; publication is not inferred from tests.

V2 asks whether conditions are **currently acceptable for the actual workflow and proposed scale**, rather than whether a review, document or named role exists. It records material issues explicitly. A complete quality review that rejects wider use is not a Yes to acceptable quality.

## Use it

1. Identify the pilot, assessment date and intended scope. Choose an operational activity or a genuinely offline synthetic/public exercise. Do not enter confidential data or personal details; use safe references and role names.
2. Record the material issue position: none identified in the evidence reviewed, unresolved, or unknown. An unresolved issue withholds expansion even if all ten answers are Yes. It stays prominent in the result and opening PDF summary.
3. Review ten current-condition questions. Yes means the whole condition is currently satisfied; No means it is not. Use Unknown when you cannot establish it. For a supported Yes, provide a record reference and a finding note. Short concrete notes are accepted; no word-count score or semantic judgement is applied.
4. View the result at any stage. Missing information remains a visible gap. Follow the human-owned actions; inspect actual records before making a decision.
5. Download the PDF or save JSON to continue later. Explore four clearly labelled fictional examples without typing ten notes.

Every acceptance claim and issue position is self-reported. The app cannot establish truth, compliance, security, business value or actual authority to deploy. No result permits a pilot to continue without its own approvals.

## Decisions

| Operational decision | Meaning |
| --- | --- |
| WITHHOLD EXPANSION | A material issue is explicitly unresolved or at least one current required condition is No. Resolve the issue or unmet condition before reconsidering expansion. A human must determine appropriate containment where relevant. |
| FURTHER ASSESSMENT REQUIRED | No current condition is reported No and no issue is reported unresolved, but evidence, context, issue assessment or date review is missing, Unknown or unsupported. This is not permission to operate. |
| COMPLETE RECORD - HUMAN DECISION REQUIRED | All ten current conditions have affirmative references/findings, context and date are supplied, the legacy date is reviewed if relevant, and no material issue is reported. This describes record completeness, not verified suitability or approval. |

A separate scope route, **OFFLINE EXPERIMENT - NO ROLLOUT DECISION**, applies only to recorded synthetic/public offline learning with no real-person/operational impact or external effects, an assessed no-issue position and supported applicable data/tool permission. Other production conditions need not be established for that exercise. Missing identification/date information requires further assessment without treating production gaps as a ban on learning. A conflicting offline label, real data/effects, unknown issue position or missing permission cannot bypass assessment. Reassess before real use.

All ten conditions are required for an operational complete record. The five original safeguards remain separately identifiable, but no longer allow other known failed conditions to return a limited-operation label. See the [exact criteria, ordering and methodological changes](v2/METHODOLOGY.md).

## Versioning and old files

V2 uses `schema_version: 2` and `methodology_version: "2.0"`. [Migration rules](v2/MIGRATION.md) cover exact fields, limits and source preservation.

Valid supported V1 records can be imported. All ten current-condition statuses become Unknown; original notes are copied and the entire source object is retained in `migration.source_record`, including additional source fields. New references, scope and issue assessment are not inferred. Missing dates remain blank. Existing dates are preserved but require explicit review for V2. V2 files round-trip without changing answers or dates. Unsupported V2 fields/versions are rejected before replacement rather than silently discarded.

The exact legacy [Python checker](pilot_readiness_v1.py), [V1 browser model](../../docs/pilot-readiness/model.mjs), V1 examples and original model test assertions are retained for historical reproduction. Only their Python import points to the explicit V1 snapshot. They do not implement V2 and must not be used to claim a V2 result. The existing `pilot_readiness.py` command now delegates to V2, so V2 records cannot accidentally receive a V1 decision. The versioned module is also callable:

```bash
python3 tools/pilot-readiness/pilot_readiness_v2.py tools/pilot-readiness/v2/fixtures/example-blocked.json
python3 tools/pilot-readiness/pilot_readiness_v2.py tools/pilot-readiness/examples/fictional-not-ready.json --migrate
```

Run these commands from the repository root. The second prints an unassessed V2 draft with full original-source preservation, not an approval or semantic interpretation.

## Architecture and privacy

The same buildless GitHub Pages route, `docs/pilot-readiness/`, now loads [model-v2.mjs](../../docs/pilot-readiness/model-v2.mjs). The independent Python implementation is [pilot_readiness_v2.py](pilot_readiness_v2.py); parity tests compare full outputs. Shared question/action wording is checked against [criteria.json](v2/criteria.json). No paid infrastructure, authentication, tracking, external AI call or answer upload was added.

Answers live in page memory. No localStorage, sessionStorage, cookie or service worker is used by the application. The browser may recover form values through its own session features. JSON and PDF downloads persist on the device and must follow local handling rules. GitHub Pages receives ordinary asset requests, not submitted answers. All scripts and PDF assets are served with the site; the font request carries no answers.

The original meeting-notes homepage is preserved. Pages settings remain `main:/docs`; this branch does not change them. The PDF code/font and their licences remain [locally bundled](../../docs/pilot-readiness/vendor/README.md). Unsupported report characters fail with an explicit message; JSON retains the text. PDF preflight checks the V2 text it prints, rather than refusing an unprinted legacy extension. The full source object remains in JSON, not necessarily in the PDF.

## Tests and actual evidence

Read the [V2 validation record](v2/VALIDATION.md), [all thirty comparisons](v2/comparison.md) and [remaining limitations](v2/METHODOLOGY.md#limits).

With faithfully reassessed V2 structured facts, the 23 observable adverse cases from PR #74 withhold expansion. This is **not detection of the meaning of old notes**. The fabricated-evidence case AD-19 remains unresolved. A new negative control N16 also demonstrates that false structured Yes/no-issue claims can reach the complete-record category despite adverse prose. There is no keyword filter or hidden AI verifier.

The [PR #74 archive](adversarial/README.md) is copied from commit `b2440a8160cf4262a38b18f77bab3325982cbcda`. Its frozen scenarios, judgements and V1 results are unchanged. New V2 fixtures document every changed status and positive fictional supplement separately. This is development testing by the same assistant, not external independent validation or a blinded user study.

From the root, with Node 22+ and Python 3:

```bash
npm ci
npm test
npm run test:compare
(cd tools/pilot-readiness && python3 -m unittest discover -s tests -v)
npx playwright install chromium
python3 -m http.server 8765 --directory docs
```

Leave the server running. In a second terminal:

```bash
npm run test:browser
python3 -m pip install pdfplumber==0.11.9
npm run test:pdf
python3 .github/scripts/repo_checks.py
```

PDF extraction is optional maintainer tooling, not a visitor dependency. Browser tests write screenshots, requests, actual PDFs and matching input JSON under ignored `test-results/v2/`. CI runs the new suites, checks PDF text/bounds and retains artefacts. To inspect layout, render representative PDFs with Poppler, for example `pdftoppm -png test-results/v2/blocked-1440.pdf work/blocked`.

The unchanged V1 browser suite needs a V1 preview, not the V2 interface. [Reproduction instructions](v2/VALIDATION.md#historical-v1-checks) document the archived-site run. Historical PR #74 writer/live scripts likewise target V1; do not regenerate its frozen evidence against the V2 application.

The original [OpenAI, Anthropic and Google resource guide](../../research/official-ai-adoption-resources.md) remains external reading. It does not validate this method. No vendor designed, tested, validated or endorsed it. No customer outcome, saving or commercial effectiveness is claimed.
