# Evidence from the published application

Captured on 26 October 2026. Everything entered was fictional. No claim here concerns a real business pilot.

- [Pages build](pages-build.json): built commit `5a5b1a2cd7dd4aa432bdb4f81b480d0d03dfb8bd`, the PR #72 merge.
- [Pages configuration](pages-config.json): existing `main:/docs` configuration. Not changed by this review.
- [Live summary](live-summary.json): HTTP results, eight byte-for-byte asset hashes, 30 desktop and four mobile case observations, PDF downloads, console capture, import/export and storage checks.
- [Final live rerun](final-live-summary.json): completed again with a strict allowlist of application asset URLs and no query strings. It reproduced the same decisions, date default and favicon error.
- [Strict suitability result](strict-result.txt): expected exit code 1 for 23 observable-risk disagreements, retained rather than made green.
- [Desktop requests](requests-desktop.json), [mobile requests](requests-mobile.json): same-origin GETs, no bodies. The browser's missing root favicon appears in the console location in the live summary; Playwright did not expose it as an ordinary page request. It contains no assessment answers.
- [Critical-case screenshot](critical-result.png): READY FOR HUMAN REVIEW and no recorded blockers from AD-04. The contradictory note is behind the collapsed responses section.
- [Evidence-form probes](probes.json): exact generic-note payloads, decisions and form validation results. A vague sentence passes; a short concrete reference fails the length threshold. Neither is independently verified.
- [Report checks](report-checks.json): SHA-256, page counts, note preservation and text-bound checks for the six PDFs below.

| Committed PDF | Original live download name | Input | What it establishes |
| --- | --- | --- | --- |
| [Blocked](reports/blocked.pdf) | built-in-blocked-1440.pdf | Existing fictional example A | DO NOT EXPAND and unknown data approval retained |
| [Limited](reports/limited.pdf) | AD-24-1440.pdf | AD-24 in scenarios.json | Training/monitoring gaps retained, continued-pilot disclaimer visible |
| [All Yes](reports/all-yes.pdf) | AD-22-1440.pdf | AD-22 in scenarios.json | Human-review decision and unverified status retained; no approval claimed |
| [Critical review](reports/critical-review.pdf) | AD-04-1440.pdf | AD-04 in scenarios.json | Readiness/no-blocker summary coexists with a note saying wider use is unacceptable |
| [Long notes](reports/long-notes.pdf) | long-notes-1440.pdf | [Exact boundary input](long-notes-input.json) | Eleven pages, ten end markers, 2,800-character unbroken token preserved |
| [Undated import](reports/undated-import.pdf) | undated-import-1440.pdf | AD-22 evidence, no input date; see live script | Today assigned as assessment date without manual date entry |

The capture paths in live-summary.json retain the original download names. The table maps them to the curated repository copies. Other mobile downloads and raw renders were checked locally; they are not duplicated here.

## Negative observations and harness corrections

The first live run stopped on an assertion expecting an empty console. [Its summary is retained](first-attempt-summary.json). A second run captured the error location and showed `https://shaunmarsden.github.io/favicon.ico` returning 404. The observation was not removed or relabelled a successful zero-error run. Only the host-specific absolute checkout path in the retained exception stack was redacted. Subsequent checks found no uncaught page errors and completed desktop and mobile journeys.

The first PDF extraction assertion matched a sentence without accounting for a line break. A later full-note check initially treated page headers and footers inserted into extracted text as note corruption. The script was corrected to compare whitespace-normalised body text across pages. All ten long-note end markers and the entire unbroken token are preserved. These were harness corrections; no report-generation code was modified.

There was no application deployment or data transmission failure observed in these journeys. A missing favicon is a real cosmetic console error. No assistive-technology, cross-browser, penetration or actual-manager comprehension study was performed. Testing all these invented cases cannot establish real-world safety or the truth of any supplied evidence.
