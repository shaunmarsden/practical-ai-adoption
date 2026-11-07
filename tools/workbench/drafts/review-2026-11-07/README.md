# Pre-implementation AI challenges for local drafts

**Result:** The independently prepared challenges found no product defect in the initial implementation checkpoint. The feature saves and reopens user notes; it does not verify their truth, assess readiness or grant approval.

Baseline: [`8a27095`](https://github.com/shaunmarsden/practical-ai-adoption/commit/8a2709598985bbd87b4c5a00d95bc2a8cb2d2e2f), 7 November 2026. Initial implementation checkpoint: `2a6350dfe7d7fda4a2d8d91f091e806d02828d7f`, committed on the feature branch before the coordinating implementation context read the case files. No product repair followed these challenges. Passing checks on a draft PR do not establish deployment.

## Separation and sequence

I asked two fresh AI contexts to design bounded fictional challenges before implementation. Each initially received only the [shared feature contract](contract.txt), frozen contribution rules and four baseline workbench source files. Earlier tests, reviews, facilitator keys and the other reviewer's cases were withheld.

Each wrote its own case bundle and SHA-256 manifest, then sent only readiness, filenames and hashes. The [freeze record](freeze-record.json) retains those received hashes. Implementation began after both bundles were frozen. The initial code was committed before cases were revealed; reviewers then inspected that code and built their own runners. Expected facts and outcomes were not changed to fit results. The app received ordinary files and control actions, not case identifiers or expected answers.

The contract specified the file format, limits and intended behaviour. These are therefore independently prepared challenges against shared requirements, not a review with the requirements concealed. Separation concerns reviewer context and the concrete cases, not statistical independence, different model families, external expertise or human validation. The implementation context coordinated and summarised the work.

## Independent results

| Reviewer | Coverage | First completed feature results |
| --- | --- | --- |
| [Preservation and failure handling](preservation/REPORT.txt) | Exact 28-note round trip, CRLF/CR/Unicode/blanks, maximum note/file boundaries, dates, duplicate keys, unsupported/malformed input, replacement refusal, read/download failure and an intervening edit | 17 parser/serialiser checks and 24 browser checks passed. No product defect found. |
| [Privacy and approval wording](privacy/report.txt) | Five fictional browser scenarios, literal hostile-looking text, no automatic download/storage or note-bearing request, rejected imports, refused/accepted replacement, selected-wording/preview consistency, failed/delayed reads and reload defaults | P1-P5 passed 39 assertions on the first feature execution. No product defect found. |

Counts overlap in themes and granularity. They are not a population safety score or a measured misunderstanding rate. The preservation review used headless Google Chrome; the privacy review used Chromium at a 360 x 780 viewport. Neither is a physical-device or human-comprehension test.

The preservation reviewer first passed module checks but could not start the default browser. A second launch using installed Chrome failed under the sandbox. The same bounded runner then completed with reviewed execution permission. The [first results](preservation/first-results.json), [retry results](preservation/browser-retry-results.json) and [first completed browser results](preservation/browser-unsandboxed-results.json) retain these separately. The privacy review also retained its [initial sandbox launch failure](privacy/launch-failure.txt) before the [first feature execution](privacy/first-results.json). These launch problems occurred before page execution and were not workbench failures.

Native OS file-dialog cancellation was represented by an empty file selection. Read failure/delay and download failure were deliberately injected through browser APIs; those checks do not claim a real device fault occurred. Request and persistence observations cover the tested browser contexts, not OS download sync, extensions or untested browsers. Imported claims stayed self-reported; no V2 assessment or real authority was established.

## Original evidence

- Shared pre-implementation [contract](contract.txt) and [received freeze hashes](freeze-record.json).
- Preservation [frozen facts and expectations](preservation/cases.json), [freeze note](preservation/FROZEN.txt) and original [SHA256SUMS](preservation/SHA256SUMS), plus the individual input files and first actual saved draft.
- Privacy [frozen facts and expectations](privacy/frozen-cases.json), [freeze note](privacy/README.txt) and original [SHA256SUMS](privacy/SHA256SUMS), plus initial JSON/text downloads and execution results.
- Original runners and initial result files are retained under their reviewer folders. Do not execute the runners in this archive: some write outputs beside themselves and guard against overwriting first evidence.
- The [publication manifest](publication.sha256) covers the archived bytes. It was created during publication, not before implementation; it is not independent timestamp proof.

Two boundary inputs, `exact-4000000.json` and `over-4000000.json`, are stored as lossless `.json.gz` files to avoid committing megabytes of trailing spaces. The preservation review's original manifest hashes their decompressed bytes. All other published reviewer files are byte-identical copies. A narrow `.gitattributes` exception preserves intentional trailing spaces in the original `privacy/p1-record.txt` export rather than rewriting that evidence. Both original frozen manifests were checked again after execution. The very tall privacy screenshots remain in the local review workspace; they are not published as useful visual proof. Their limitations are retained in the original report. The maintained browser suite records focused draft-control screenshots separately.

Original scripts refer to the ignored `test-results/draft-review/{preservation,privacy}/` layout and local port 8769. To inspect a replay, use a separate scratch copy with the same directory depth inside a checkout of the initial checkpoint, expand the two gzip inputs there and point a local server at that checkpoint's `docs`. The runner launch variants also document the installed-browser path used in this environment. Never delete guard files or regenerate outputs in this archive. New executions cannot recreate fresh-context independence or strengthen the original result into a human study. The supported regression commands are in [Local workbench drafts](../README.md).

## Development checks and remaining limits

The maintained suite adds seven Node tests for the draft format and two desktop/mobile draft journeys. Local `npm test` passed all 35 tests. The new journeys passed exact save/reload/reopen/edit/save, atomic bad-file/read/refusal/race/download paths, literal markup, no observed persistent storage or note-bearing requests, no horizontal overflow and two axe scans at 1440 and 320 pixels. The retained workbench journeys also passed at desktop, 390 and 320 pixels with 18 axe scans.

An initial development browser runner timed out waiting for one of many rapid repeated downloads from a single document. It now compares all controls, active step and exact preview after each rejected file, with one downloaded-note comparison after that group. The rerun passed without changing production code. A separate syntax check also caught an extra parenthesis in the new test runner before execution; that runner-only error was corrected. Neither observation is presented as a product defect or an independent reviewer failure.

No Safari/Firefox, physical phone, screen-reader audit, human understanding study or workplace use was tested. Notes can still be false or contradictory. The format checks reject unsupported structure and preserve current data; they do not decide whether evidence or authority is sufficient. No approval wording was weakened, no readiness rule was added and no operational outcome claim follows from these software checks.
