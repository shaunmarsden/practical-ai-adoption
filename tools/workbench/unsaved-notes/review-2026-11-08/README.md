# Unsaved notes review, 8 November 2026

Two fresh AI contexts prepared fictional challenges from the proposed contract and frozen baseline `0ff54ba4f291fc1036443cffceedda6bf927e4f5`. The implementation conversation, earlier review keys and each other's cases were withheld. Both bundles were frozen before implementation; their concrete contents were withheld from the implementer until initial checkpoint `b81acdd20419bf240f31010926d5e6830d14974e` was committed.

This is separate-context AI review within the same development environment. It is not independent external human validation, observed comprehension, workplace evidence or operational approval. No confidential data was used. The feature remains a draft proposal, not a deployed change.

## Frozen evidence and first outcomes

- [Contract](contract.txt), [freeze receipt](freeze-record.json), [state cases](state/frozen-cases.json) and [browser plan](browser/challenge-plan.json).
- State cases SHA-256: `4fb1395ed2eae8037ea75295195f3698599153d1264e17b30e96273df9f1b4e4`.
- Browser plan SHA-256: `0d15464d1ef077df3585dccbe80c4a2a80f7f0756bdc8f7b03a4eb6ebef9d3f5`.
- State reviewer: [original report](state/review-report.txt), [first outputs](state/first-results.jsonl), [first console](state/first-run-console.txt) and [harness correction](state/harness-correction-notes.txt). The first run completed ten cases then stopped on a stale dialog listener. After correcting only the harness and executing the remaining four, 13 of 14 frozen cases passed. One actual failure remained: restored select helpers could display the old choice despite correctly tracking and exporting the new choice.
- Browser reviewer: [original report](browser/report.txt), [first outputs](browser/first-results.jsonl), [summary](browser/first-summary.json) and [six clean-navigation subcases](browser/supplemental-first-results.jsonl). All 24 composite cases and six clean subcases passed across installed Chrome 157.0.8103.38, Firefox 153.0 and Playwright WebKit 26.5. Native dirty reload, same-tab link and Back showed real beforeunload dialogs; cancellation retained notes, selections, preview and step; acceptance navigated.

The restored-helper defect was fixed by synchronising helpers from controls, including on pageshow. The visible preview is refreshed too. The [original frozen case recheck](state/final-original-pageshow-results.jsonl) passed unchanged. Synthetic pageshow is not proof of actual bfcache restoration.

## Later discoveries and repairs

These are post-discovery cases, not additional pre-implementation holdouts.

A maintainer probe found native partial dates with empty serialised value and `badInput=true` could be missed in Chrome and WebKit. The repair treats partial dates as changed, refuses JSON saving until completion/clearing, and reconciles native keyup/blur where input/change is absent. A fresh reviewer then found editing an already partial segment during a pending read could leave the revision unchanged. Counting partial editing keys prevents the stale import from replacing that edit. Unchanged cursor movement and blur still permit a pending read.

The [supplemental report](state/repair-supplement-report.txt), [final targeted review](state/final-repair-report.txt), first/final race observations and scripts retain the finding and repair. The final review also verified exact preview preservation after unchanged blur, cancelled clear and cancelled native reload. Its first reload harness incorrectly expected an aborted-navigation error; the [harness note](state/final-blur-harness-note.txt) and both consoles retain that correction. Native cancellation can instead time out in automation.

The browser reviewer [reran the original 24 cases](browser/post-fix/report.txt). Supplemental native partial-date checks passed in Chrome and WebKit. The same single-key gesture did not expose a partial date in Firefox; this is a coverage limitation, not a passing partial-date assertion there.

A maintainer partial-date probe's unlabelled rerun overwrote its initial local JSON/screenshots. The [disclosure](partial-date-evidence-note.txt) identifies this gap. The separately labelled [baseline reproduction](partial-date-baseline-reproduction.json) and [post-repair output](partial-date-after-native-date-events.json) are not presented as original first evidence. The reviewers' frozen cases and original results were unaffected.

## Browser sequencing investigation

The maintained combined runner initially observed an extra WebKit beforeunload during text export after cancelled navigation attempts. Its [instrumented failed retry](maintained-webkit-retry/results.json) is retained. Fresh [download isolation](browser/webkit-download-isolation/report.txt) produced four expected downloads with no dialogs or navigation. The [sequence investigation](browser/webkit-sequence/report.txt) independently reproduced the original assertion failure and isolated cancelled history Back as the trigger. Cancelled reload/link and a failed URL request alone did not trigger it. A delay and experimental new-tab Blob anchor did not fix it. The maintained test now explicitly checks the one extra WebKit warning, intact notes, complete text download and retained dirty state. This is a disclosed browser limitation, not a successful zero-dialog assertion. No timer-based warning bypass was added.

## Final maintained checks

The final [Chrome](final-maintained/chrome/results.json), [Firefox](final-maintained/firefox/results.json) and [WebKit](final-maintained/webkit/results.json) runs passed the maintained regression assertions. WebKit includes the explicit extra-warning caveat above. Partial-date native state was exposed in Chrome and WebKit; the Firefox gesture remained uncovered. Each run checks actual downloads, native leave acceptance/cancellation, changed-state checkpoints, exact CRLF reversion, restoration helpers/preview, invalid input, cancelled clearing, pending-read partial edits where exposed, and absence of note-bearing requests/storage.

Additional final local checks passed: 51 Node tests; workbench journeys at 1440, 390 and 320 pixels with 18 axe scans; draft preservation/failure/privacy/axe checks at 1440 and 320 pixels; and four narrow-layout/text-enlargement combinations over all six steps. The narrow WebKit draft/status screenshot was visually inspected. CI separately runs the existing assessment and PDF checks plus the new Chromium regression command.

## Evidence handling and limits

Original challenge files, first outputs, reports, harness corrections and selected native-date screenshots are copied byte for byte under `state/` and `browser/`. Their existing manifests are retained. `PUBLICATION-SHA256SUMS` inventories the published evidence; a publication hash is not independent proof of when a case was frozen. Some retained runners contain local paths and development adapters; the maintained test command is the reproducible regression entry point.

Headless Chrome, Firefox and Playwright WebKit are not physical-phone testing or actual Safari application assurance. Download events establish requests and inspectable generated bytes, not OS retention. Native warnings need browser support/user activation and cannot cover crashes or all mobile shutdowns. No screen-reader or human misunderstanding rate was measured. Saving, reopening, exporting and completing notes remain distinct from verification and actual authority. Guide and V2 logic are unchanged.
