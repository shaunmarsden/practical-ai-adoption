# Local workbench drafts

Use **Save draft** to download a JSON file, then **Reopen draft** to choose that file when you return. The readable text export remains separate. There is no automatic saving or restoration, account, backend or persistent browser storage. A file may be retained or synced by the device; use fictional or non-sensitive notes and safe evidence references.

Reopening checks the file's structure, not the truth of its notes. It does not run V2, check authority or grant approval. Imported outcomes remain user-entered, self-reported claims. The existing text-export caveats and readiness rules are unchanged.

## Format and failure handling

Format version 1 uses exactly `format`, `schema_version`, `saved_at`, `notice` and `notes`. The format identifier is `practical-ai-adoption-workbench-draft`. The fixed notice is part of version 1; changing it needs explicit version-compatibility consideration. `saved_at` is a canonical UTC ISO timestamp, not a decision date. `notes` contains all 28 current field IDs as strings, including blanks and default selections.

Text notes allow up to 12,000 UTF-16 code units each. Select values must match the existing choices; a decision date must be blank or a real calendar date from year 0001 through 9999. These are file checks, not evidence or permission checks. The UTF-8 file limit is 4,000,000 bytes, including any BOM or extra whitespace. All notes allowed by the form can be saved and reopened, including expansion when JSON escapes characters.

Unknown or missing fields, unsupported versions, duplicate keys (including escaped equivalents), invalid types/dates/choices, bad UTF-8 and malformed or oversized files are rejected. Text exports and V2 files are not workbench drafts. There is no silent repair or migration. Valid JSON with a UTF-8 BOM is supported.

Validation finishes before notes are replaced. Non-default current notes require a replacement confirmation. Cancellation, rejection and read failure leave notes, active step and existing preview intact. If notes change while the local file is loading, loading is rejected so the newer edits survive. Clearing notes during a pending load also prevents that load from restoring them. Reopening successfully returns to the first step and refreshes any visible preview.

Native textareas normalise line endings. The workbench retains original imported strings until their visible control changes, so unedited CRLF/CR notes survive save/reopen and unrelated edits. Editing a note uses its new visible value. Save and reopen messages report only file handling, never verified evidence or approval.

## Checks and review evidence

The [pre-implementation challenge review](review-2026-11-07/README.md) retains the shared contract, frozen challenge files and hashes, initial implementation checkpoint, first results, environment failures and limitations. Two separate fresh AI contexts devised challenges before code was written; concrete case content was withheld from the implementation context until checkpoint `2a6350d` was committed.

Maintained regression commands, from the repository root:

```sh
npm test
npm run test:workbench:drafts
npm run test:workbench
```

The browser commands need the existing Playwright prerequisites and a local server serving `docs` on port 8765, or `BASE_URL` for another preview. CI runs both browser commands and the retained V2/PDF/sprint checks. Test downloads, screenshots and request observations go to ignored `test-results/`. Original archived review runners are evidence; do not run them in place or overwrite their first outputs.

The checks establish bounded file-preservation and failure-handling behaviour. They do not establish real user comprehension, genuine authority, financial benefit or safe operational use. No human recruitment is required to maintain or extend these software checks.

The [8 November release verification](../README.md#release-verification-on-8-november-2026) records the deployed draft feature and bounded Chromium, Firefox and WebKit checks, including the observed WebKit keyboard limitation.
