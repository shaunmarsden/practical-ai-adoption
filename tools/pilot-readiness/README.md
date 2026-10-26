# AI Pilot Readiness Assessment

**[Open the browser assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/).** No installation, registration, AI API or paid product is needed.

For a business manager considering wider use of an existing AI pilot. Review ten conditions, record references to evidence, identify gaps and download a PDF for a sponsor or workflow owner. It is decision support, not certification or deployment approval.

## Use the assessment

1. Start an assessment, or choose the clearly labelled fictional example. The example intentionally lacks data approval.
2. Identify the pilot, process, intended outcome and assessment date. Use an optional internal reference if useful. Avoid personal information and sensitive details.
3. Answer each check Yes, No or Unknown. For Yes, identify a checkable record and what it shows. Examples describe possible evidence, not proof that a requirement is met.
4. Read the responses and notes together. Correct a Yes if its note describes an unmet requirement. Confirm your own consistency review, then view the rule-based interpretation.
5. Download the PDF or save JSON to your device. A responsible person must inspect the actual records and record any approval separately.

Use Previous, Next or the numbered navigation to move between checks. Progress counts valid form inputs, not readiness. An unanswered check becomes Unknown in a draft JSON export. Import accepts the Python evidence format, with optional `details` (process, outcome, date, reference) and a `fictional` flag. Short Yes notes from older files must be improved or changed before results are shown. Import validates the file before replacing current answers and asks before replacement. To start a real assessment after exploring an example, clear the record; editing an example retains its fictional label.

## Decisions and essential gates

- **DO NOT EXPAND**: at least one essential control is No or Unknown. The five gates are quality review, workflow ownership, human oversight, data permission and rollback.
- **LIMITED PILOT ONLY**: the five gates are recorded as Yes, but another condition is No or Unknown. This does not authorise a pilot to continue without its own approvals.
- **READY FOR HUMAN REVIEW**: all ten conditions are recorded as Yes with notes. A responsible person must still verify the records and decide whether expansion is appropriate.

Business outcome, baseline and representative testing remain required for a complete record even though they are not hard gates. Good technical performance alone cannot produce READY FOR HUMAN REVIEW without them. No numerical maturity score, confidence percentage or ROI is generated.

The browser decision function in [model.mjs](../../docs/pilot-readiness/model.mjs) mirrors [pilot_readiness.py](pilot_readiness.py). The five gates, categories, reasons and output fields are unchanged. The existing Python CLI and its example remain available and unchanged.

### Evidence form checks are not verification

The Python checker accepts any non-empty Yes note. The browser adds a separate form requirement: at least **40 characters, 6 whitespace-separated words and 4 different words** for every Yes. It rejects empty notes, `done`, `approved` and repeated one-word padding. It does not decide whether a note is specific, true, relevant or adequate. Plausible nonsense can pass. The threshold is a transparent input aid, not a validated evidence standard or a change to decision categories.

A human consistency review is required before the browser displays results. There is no keyword-based or AI semantic validation. A long note saying approval was refused can still pass the underlying rules if labelled Yes. The interface asks the user to correct it to No or Unknown; that correction blocks expansion at an essential gate. The review confirmation is self-reported and cannot prove that the user read or checked anything. Do not use the output as an independently validated business case.

For inputs accepted by the browser, decisions match the Python checker. The browser deliberately rejects some short notes accepted by the CLI and imposes file and field size limits. These differences are input validation, documented here rather than silently changing Python behaviour.

## PDF report

Download creates a text-based, paginated A4 PDF on your device. It includes pilot details, the decision and reason, essential blockers, other gaps, criterion-specific next checks, all ten responses and notes, methodology, privacy and limitations. Reports label evidence as user-reported and require human approval on every page. Example records are visibly labelled fictional.

The locally bundled Noto Sans font supports Latin, Greek and Cyrillic characters. If a character is unsupported (for example, some emoji or CJK characters), export stops with an explicit message rather than silently losing text. Save JSON to preserve the original characters, or use supported characters for the PDF. The full notes are retained in JSON. Reports and files may contain sensitive information if you enter it; handle them under your organisation's rules.

## Privacy and architecture

Buildless HTML, CSS and JavaScript in [docs/pilot-readiness](../../docs/pilot-readiness/). There is no authentication, analytics, AI API, backend for answers or external runtime service. All assets, including PDF code and the font, are served from this site. Report generation requests only the local font, without answers in the request. The application never uploads answers or puts them in URLs.

Answers live in page memory. The app uses neither localStorage nor sessionStorage, cookies or a service worker. Refreshing or closing clears the app's memory, though browsers may retain form values through their own session recovery. Downloaded JSON/PDF files persist on the user's device. The host receives ordinary page/asset requests; this is not a promise that GitHub keeps no hosting logs.

The existing [meeting-notes activity](https://shaunmarsden.github.io/practical-ai-adoption/) remains at the homepage. The new route is `/practical-ai-adoption/pilot-readiness/`. Pages currently serves `main:/docs`; no framework build or deployment configuration change is required. Merging an approved pull request into `main` is the existing publication path. A feature branch or passing CI does not establish that the new route is live.

Only the PDF library and font are bundled runtime dependencies. Their licences, pinned origins and checksums are in [vendor provenance](../../docs/pilot-readiness/vendor/README.md). Playwright is a development-only browser test dependency; visitors do not download or run it.

## Run the existing Python checker

From this folder, with Python 3:

```bash
python3 pilot_readiness.py examples/fictional-not-ready.json
python3 -m unittest discover -s tests -v
```

Copy the JSON and replace every status and note with your own information. Use `yes`, `no` or `unknown`. The CLI checks presence, not truth. It ignores optional browser metadata.

## Reproduce the tests

From the repository root, with Node 22 or later and Python 3:

```bash
npm ci
npm test
python3 .github/scripts/repo_checks.py
(cd tools/pilot-readiness && python3 -m unittest discover -s tests -v)
npx playwright install chromium
python3 -m http.server 8765 --directory docs
```

Leave the server running. In a second terminal:

```bash
npm run test:browser
```

`BASE_URL` can select another local preview origin. Browser artefacts are written to ignored `test-results/`. The GitHub checks workflow runs the same tests and uploads screenshots, request logs and sample PDFs. Test PDF text and layout can be inspected with `pdftotext` and `pdftoppm` (Poppler); these are maintainer tools, not visitor requirements.

See the [validation record](validation.md) for actual results, adverse findings and their limits. These tests check code and fictional inputs. They do not establish business effectiveness, genuine permissions, accessibility certification or legal compliance. The checklist and gates are this project's decision aid. No OpenAI, Anthropic or Google framework has been reproduced, and no vendor designed, validated or endorsed the tool.

Related reading: [official OpenAI, Anthropic and Google adoption resources](../../research/official-ai-adoption-resources.md), [selecting a first use case](../../guides/finding-a-good-first-ai-use-case.md) and [why pilots stall](../../guides/why-ai-projects-stall-after-the-demo-works.md). The reading links remain independent of this methodology.
