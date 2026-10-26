# Browser assessment validation record

Run on 26 October 2026 against fictional records only. No real business pilot, permission or outcome was verified. Test expectations come from the requested cases and existing deterministic Python rules. No AI is used to generate or judge results.

## Methodology findings

| Fictional scenario | Observation | Interpretation and limit |
| --- | --- | --- |
| A: promising results, data approval unknown | DO NOT EXPAND | Missing essential permission blocks expansion despite other Yes responses. |
| B: technical accuracy, no baseline or meaningful outcome | LIMITED PILOT ONLY | No wider-use recommendation. Those business conditions are required, but are not among the existing five hard gates. |
| C: complete, plausible notes | READY FOR HUMAN REVIEW | Never automatic deployment approval. The tool has not inspected any supporting record. |
| D: training and monitoring unknown | LIMITED PILOT ONLY | Essential controls alone do not complete the wider-use case. Continued piloting needs its own approvals. |
| E: Yes note explicitly says permission was not granted | The pure rules return READY FOR HUMAN REVIEW | This is a real limitation, retained in a test. Note length does not detect contradictions. The interface warns on every criterion, requires a human consistency review and allows correction. Changing data approval to No produces DO NOT EXPAND in the browser journey. A false human confirmation can still pass. |
| F: repeated generic `approved` notes | All ten Yes inputs fail browser form validation | Empty, one-word and repeated-word notes are rejected by transparent character and word thresholds. A detailed false or irrelevant note can still pass. Python's original non-empty-note check is unchanged. |

The reviewer checkbox is not independent verification. Neither code parity nor fictional scenario testing validates the checklist for actual organisational adoption decisions.

## Automated checks completed locally

- Existing Python suite: 8 tests passed, run from `tools/pilot-readiness` as documented.
- Browser model suite: 8 tests passed. Field labels and hard gates match Python exactly. Complete output objects match for the original fixture, five scenarios and each single-criterion No/Unknown variation. Decisions match across all 59,049 combinations of three statuses across ten criteria. Malformed inputs are rejected in both implementations.
- Browser journeys: passed in Chromium at 1440 x 1000 and 390 x 844. Covered the built-in example, scenarios B to F via local JSON import, evidence validation, required consistency review, editing, invalid JSON preservation, JSON round trip, literal rendering of HTML-like text, PDF downloads and explicit unsupported-character errors.
- A fresh guided assessment completed all ten checks using keyboard-selected radio buttons, reached human review and exercised both cancelling and confirming a reset. The skip link received keyboard focus.
- The captured requests in both browser sizes were same-origin GETs only, without request bodies or assessment answers in URLs. Both localStorage and sessionStorage were empty. This establishes behaviour for the exercised journeys; inspect source and rerun after changes. It is not a guarantee about host logs, browser extensions or future code.
- No horizontal overflow at the tested mobile size; no uncaught browser page errors. Native labels, fieldsets, legends, progress, focus handling and status/alert regions were inspected. This is not an assistive-technology audit or accessibility certification.
- The original homepage still loads with the existing quiz. Its change is one navigation link. Python source, Python tests, original JSON fixture and official research links have no diff.

## Report checks

Downloaded the actual browser-generated PDF, rather than substituting a server-generated sample. The fictional blocked example is four A4 pages. The long-note test is six pages and retains its final note marker. Extracted text includes the tenth criterion, methodology and human approval wording; bounding-box checks found no text beyond the page margins. Pages were rendered with Poppler for visual review. A continuation-formatting issue found during review was corrected and the reports regenerated.

The PDF uses embedded Noto Sans. Unsupported characters stop PDF creation with an explicit error; the original text remains exportable as JSON. The PDF is not tagged for screen readers. The HTML result and JSON retain text access. Very long records may need more pages. PDF approval statements are limitations, not signatures or recorded authorisations.

## Failures encountered and corrected

- The first font URL returned 404. Retrieved the asset and licence from the official Noto font repository, then recorded its revision and checksums.
- The initial local preview could not bind under the restricted sandbox. Reran it with the environment's approved network permission.
- The test runtime initially had no installed Chromium binary. Installed a test-only browser under ignored `work/`; no runtime browser dependency was added to the application.
- Initial file-import and reset assertions raced asynchronous file parsing and dialog close events. Changed the tests to wait for the observed UI state; subsequent journeys passed.
- An initial Python invocation from the repository root failed module discovery. Ran the unchanged suite from its documented tool directory; all eight passed. CI uses that directory.
- Visual review found a missing space around the mobile heading break and header styling carried into continued PDF text. Corrected both, then regenerated browser artefacts.

These records describe development and test failures, not evidence of real business outcomes.

## Publication status

The actual Pages configuration was read from GitHub: legacy publication from `main:/docs`, with the existing homepage HTTP 200 and latest build marked built. Before merging this feature, the new `/practical-ai-adoption/pilot-readiness/` route returns HTTP 404. A passing feature-branch test does not establish deployment.

No Pages configuration change is needed. The contribution is offered on a dedicated feature branch for review. The pull request must not be merged automatically. After a human-approved merge, verify the Pages build's deployed commit, open the real assessment route, run the fictional example and download its report before calling publication verified.

## What remains unproven

No independent user testing, workplace adoption results, verified business value, legal or security review, semantic evidence validation, cross-browser certification or screen-reader audit. The form cannot distinguish plausible fictional notes from truthful records. The five gates and ten conditions remain the project's suggested decision aid, not a vendor-certified framework.
