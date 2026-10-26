# Local V2 branch evidence

These records describe local fictional-data checks, not a V2 deployment or an outside audit.

- [Browser observations](browser-observations.json): all 30 transformed cases and 16 new challenges at desktop and mobile sizes (92 fixture journeys).
- [PDF checks](pdf-checks.json): actual local browser-download hashes, page counts, decisions and text/reference/issue/bounds checks for 13 reports. These are generated samples, not real pilot records.
- [Desktop requests](requests-desktop.json) and [mobile requests](requests-mobile.json): explicit local asset URLs, GETs, no bodies. No assessment answers were uploaded.

Raw screenshots, matching input JSON and PDFs are generated in ignored `test-results/v2/` and retained by CI. Recreate them with the commands in the [validation record](../VALIDATION.md). This folder does not duplicate the actual V1 live evidence in PR #74, which remains an unchanged archive.

Report hashes include PDF creation metadata and can differ on rerun. Correctness is checked against the matching payload, decision, complete notes and bounds rather than expecting byte-identical newly generated PDFs. The manifest is a local captured run; CI artefacts describe the remote run separately.
