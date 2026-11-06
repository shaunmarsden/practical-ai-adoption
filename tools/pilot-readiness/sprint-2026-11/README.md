# Fresh fictional stress tests - 6 November 2026

These are software and document-inspection tests by the same assistant working on the repairs. They are not independent human judgement, real-user testing or evidence of commercial outcomes. No AI service executes these cases.

## Inputs and expectations

[24 invented Larch Quay records](cases.json) and [separate expectations](expectations.json) were written and hashed before their first execution. They do not reuse the original development fixture payloads. The engines receive only the record. The runner reads expectations after computing outputs. This separation prevents answer-dependent execution; it does not make an assistant-authored review blind or independent. The two `.sha256` files record the original input bytes.

The cases cover ambiguous and competing claims, missing or refused permission, unfinished quality reviews, changed model versions, review costs, explicit unresolved incidents, legitimate offline learning, scope conflicts, missing context, literal markup, unsupported versions, invalid dates/types, Unicode, tabs, line endings and long references.

SQ16 deliberately records false Yes/no-issue claims alongside adverse prose. It reaches COMPLETE RECORD - HUMAN DECISION REQUIRED in both engines. This remains an information limit, not a successful safety test or a new defect: the tool cannot interpret prose or verify claims. An independent responsible person must inspect the records. No criteria were changed to obtain matches.

## Confirmed defects and reproduction

Baseline: `d3aeecde2a9556a74903d37e7e2773fefcd60db3`. The [first observed results](baseline-results.json) and [size-boundary result](boundary-baseline.json) retain failures separately from repaired results.

### P2: imported strings changed without an edit

1. Serve `docs/` and open `/pilot-readiness/`.
2. Import the payload from SQ19 or SQ20 in `cases.json`.
3. View the result and save assessment JSON without editing any field.
4. Compare the export with the input. SQ19's CRLF/CR note becomes LF. SQ20's reference fields lose line breaks and concatenate text.

The import message promised unchanged notes. Native textarea and single-line input normalisation was copied over the imported record whenever the app read the form. The repair retains the original string until that control's displayed value changes. Regression checks also edit an unrelated field and then deliberately edit the affected field. JSON preserves original formatting; editing a field uses its new visible value.

### P2: a valid record exported a file it could not import

1. Create a valid migrated V2 draft whose compact JSON is 999,900 bytes. `browser.mjs` generates this boundary record without a large committed fixture.
2. Import it and save JSON.
3. Reimport the exact downloaded bytes.

Before the repair, indentation expanded the file to 1,000,884 bytes. The app rejected its own export against its 1,000,000-byte file limit. The repair keeps readable indentation where it fits and uses compact JSON near the limit. Neither the record-size limit nor the schema was weakened.

### P2: a tab silently removed PDF evidence text

1. Import SQ23 and download the PDF.
2. Inspect the comparable-baseline note on page 3.
3. The original note ends `line\twith tab.`; the old PDF stops at `line`.

Both text extraction and the rendered page showed the missing suffix. The repair renders tabs as four spaces before calling the bundled PDF library. The exact tab remains in JSON. Full-note extraction checks detect loss of any following words.

## Baseline and repaired checks

The baseline repository checks passed across 73 Markdown files. The existing 23 Node tests, including retained V1 exhaustive parity, and eight Python tests passed. The existing browser suite passed 92 fixture journeys at 1440 x 1000 and 390 x 844, plus migration, keyboard, privacy and export interactions. Its 13 PDF downloads passed the existing extraction/bounds checker. The 30-case comparison regenerated identically in an ignored scratch copy, without writing historical results.

All 24 fresh model cases matched the frozen predictions and had full JavaScript/Python output parity. A match on SQ16 documents the remaining limitation. The first browser attempt found SQ19/SQ20 string changes, then stopped during rapid mobile exports. SQ09 passed alone. Repeated runs reached the same per-document download limit; using fresh pages between small case groups let the complete suite run. This was an automated-browser download constraint, not a markup execution or decision failure. Failed attempts remain in the baseline record.

After repairs, `browser.mjs` requires all 24 cases at 1440 x 900 and 320 x 900: 40 valid decision/exact-JSON journeys and eight rejected-input journeys. It additionally checks malformed/oversized input retention, deliberate field edits, the actual near-limit export/reimport, ten labelled question panels, heading focus, keyboard radio operation, inert literal markup, no horizontal overflow, empty application storage, and same-origin static GET requests only. Seven records at both sizes produce 14 actual PDFs for note/reference/issue/decision/bounds inspection. Representative rendered issue, Unicode/tab and long-reference pages are reviewed separately from extraction.

No full assistive-technology audit, tagged-PDF repair, physical-device test or independent manager-comprehension study was performed. Automated labels/focus and a narrow viewport are useful checks, not accessibility certification.

## Reproduce

From the repository root, with the documented Node/Python/browser prerequisites:

```bash
npm test
npm run test:sprint
python3 -m http.server 8765 --bind 127.0.0.1 --directory docs
```

In a second terminal:

```bash
npm run test:sprint:browser
python3 tools/pilot-readiness/v2/tests/check_pdfs.py test-results/sprint-2026-11
python3 .github/scripts/repo_checks.py
```

`SPRINT_OUTPUT` can select another ignored output directory. `BASE_URL` selects a permitted preview; the suite uses invented data, but it is not a substitute for post-merge production verification. CI runs the fresh suites and retains artefacts under `test-results/`. No runtime dependency, account, telemetry or external action was added. The PR #74 archive, old fixtures, comparisons and guide evaluation results are unchanged.
