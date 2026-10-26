# Adversarial review of the AI Pilot Readiness Assessment

Review date: 26 October 2026. Reviewed application: merged commit `5a5b1a2cd7dd4aa432bdb4f81b480d0d03dfb8bd` from PR #72. [Start with the case comparison](case-comparison.md) if you want to inspect the decisions yourself.

## Executive judgement

**Make targeted changes before promotion.** The present application is usable as an evidence-collection worksheet and conversation aid. It is not reliable readiness triage: a completed quality review that explicitly rejects wider use can still produce READY FOR HUMAN REVIEW and no recorded blockers. Do not rely on the current method for an operational go/no-go decision. Revise its acceptance semantics and test them with an external reviewer before promoting it as a readiness assessment.

The live deployment is **verified**, not inferred from a successful build. The published route returned HTTP 200, eight served assets matched the merged checkout, and desktop/mobile journeys downloaded usable PDFs. The original homepage quiz remained functional. No assessment-answer upload was observed. The one console error was a missing root favicon, not an application crash.

Thirty fictional cases were judged before execution: **5 agreements, 24 potential false-reassurance disagreements and 1 potential scope restriction**. Twenty-three disagreements contain observable adverse facts; one deliberately conceals invented evidence behind plausible notes. The scope case does not prove that the tool forbids harmless experimentation. Agreements refer to the direction of expansion, not confirmation that next actions are adequate; AD-23 still needs a human containment decision. These deliberately adverse cases are not a population error rate.

This is a fresh analytical review by the same assistant that authored the original application earlier in the chat. It is **not an independent external expert assessment, blinded experiment or completed manager user study**. The [judgement basis](judgement-basis.md), [frozen expectations](scenarios.json), [hash](expectations.sha256) and [full outputs](results.json) expose that limitation and make the comparison repeatable. The expectations were fixed before the run and before reading PR #73's conclusions. No decision rule was changed.

## What a credible first pass needs to establish

The proposed standard was written independently of the current run: a worthwhile outcome and viable operating case; current representative results with acceptable severe and subgroup failures; applicable permission and safeguards; effective organisational capacity; and a workable monitoring, incident and recovery envelope. Evidence must cover the intended use, population, version and external consequences. Formality should be proportionate to consequences. These are analytical proposals, not a validated universal framework.

| Existing criterion | What it currently asks | Smallest useful strengthening |
| --- | --- | --- |
| Business outcome | Whether an outcome and success threshold are agreed | Whether representative results meet the agreed threshold, trade-offs are accepted and the full operating cost is viable |
| Baseline | Whether a baseline was recorded | Whether it is comparable to this workflow and population, with limitations understood |
| Representative test | Whether representative work was tested with results recorded | Whether the sample covers intended users and exceptions, and results remain valid for the current model/workflow |
| Quality review | Whether a named reviewer assessed errors | Whether findings meet severity-based acceptance conditions and no known unacceptable issue remains |
| Workflow owner | Whether an owner is named | Current acceptance, authority to act/stop, resources and continuity cover |
| Human oversight | Whether approval and exceptions are defined | Evidence that people can perform review effectively under workload and cannot routinely bypass necessary approval |
| Data permission | Whether permission and controls are recorded | Current, in-scope permission for actual data, purpose, tool, recipients and applicable contractual/security constraints |
| Stop/rollback | Whether an owner can stop and recover | Proportionate successful recovery evidence, plus prevention/containment for external effects that cannot be undone |
| Training/support | Whether users have instructions/support | A workable process that intended users can and will use, with support and maintenance cover |
| Monitoring/review | Whether monitoring and a date are agreed | Actionable alerts, incident response, change triggers, re-evaluation and a responsible current reviewer |

Cost/maintenance and user acceptance lack explicit coverage. Most other omissions can be handled by strengthening existing checks rather than adding a long checklist. Quality, testing and monitoring overlap in evidence but answer different questions: how results were sampled, whether they are acceptable and how continued acceptability will be checked. Ownership, review and support likewise need distinct responsibilities, not duplicate sign-offs.

The five selected gates are **insufficient as currently worded and interpreted**. This does not prove that five is the wrong number. The central defect in the method is treating the existence of an activity or document as affirmative evidence of an acceptable current condition. Adding more existence questions would reproduce it.

## Prioritised findings

Severity concerns plausible consequences if a manager relies on the result. There are no Critical findings: the application performs no deployment or external business action and repeatedly requires human approval. AR-01 and AR-02 share a root cause; they are not separate observed business incidents.

| ID | Severity and evidence type | Reproducible case | Expected behaviour | Actual behaviour | Business consequence | Proposed remedy | Change needed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AR-01 | High: reproducible rule weakness | AD-02, AD-03, AD-04: completed review with unacceptable severe/subgroup failures | Hold expansion and direct the owner to contain the known failure and obtain acceptable retest evidence | READY FOR HUMAN REVIEW; essential_blockers and remaining_gaps are empty | Review completion can be mistaken for safety acceptance; severity gets no explicit priority | Ask whether findings are acceptable for the intended scope, separately record unresolved material issues, and prevent a ready result while such issues remain | Methodology and code, followed by external judgement review |
| AR-02 | High: reproducible rule weakness | AD-05/26: powerless/departed owner; AD-06: bypassed review; AD-07/17/25/29/30: wrong/refused/expired permission; AD-08/15: untested or ineffective recovery | Require current, effective, applicable controls and containment where necessary | All reach READY FOR HUMAN REVIEW with affirmative flags and long notes | A named, defined or historically approved control can be mistaken for an operating safeguard | Strengthen the four gate questions around authority, demonstrated effectiveness, approval scope/currency and feasible recovery. Do not attempt to infer these from keywords | Methodology and code; actual permissions still require human verification |
| AR-03 | Medium: missing criteria/coverage | AD-10, AD-11, AD-12: user refusal, departing maintainer, unaffordable operation | Hold expansion pending a usable and sustainable operating case | READY FOR HUMAN REVIEW; no dedicated question or next action for the omitted issue | Rollout may fail despite accurate outputs and completed training | Extend outcome and operational-support evidence to cover full costs, acceptance, maintenance and continuity; avoid introducing arbitrary ROI estimates | Methodology and question/action changes |
| AR-04 | Medium: missing risk and change context | AD-03, AD-13, AD-14, AD-15, AD-16: vulnerable users, model changes, unsafe exceptions, irreversible sends, no incident response | Identify consequence and affected scope; require current evidence and proportionate incident/containment arrangements | READY FOR HUMAN REVIEW on the same flags as a bounded low-risk case | Old averages and nominal rollback can conceal serious present exposure | Add brief context prompts for external actions, sensitive use, affected people and current version. Escalate material uncertainty; strengthen testing/monitoring rather than invent a risk score | Methodology and code; specialist judgement for consequential use |
| AR-05 | Medium: wording/presentation risk, not observed user misunderstanding | AD-04 and AD-24, plus live reports | An unresolved issue should stay visible with its action; incomplete records should not resemble permission | Ready result is green, notes are collapsed, blocker list says none. PDF limited result is also green. All-Yes next checks are generic even when the note identifies a specific failure | A skim of the executive summary may carry more reassurance than the caveats justify | Show record-completeness status distinctly from suitability, foreground explicitly entered concerns and hold actions, and use a non-permissive incomplete-record label. Align PDF/UI emphasis | Methodology-linked code/copy change and actual comprehension research |
| AR-06 | Low: confirmed import behaviour; provenance risk is an analytical concern | Undated Python-format import; live script and undated-import.pdf | Distinguish absent source date from an explicitly selected new assessment date | load() inserts today's date; completing process/outcome then exporting gives an assessment date not entered by the user | A reused old record could appear recently assessed. A genuinely new assessment today would be legitimate | Require explicit confirmation of a new assessment date when import has none, or preserve the missing date until supplied | Small code/UX improvement; not a proven false date in a real report |
| AR-07 | Low: potential unnecessary restriction/scope ambiguity | AD-20, a discarded-output synthetic offline experiment without a formal reviewer | Permit a proportionate bounded exercise under local rules; distinguish it from expansion | DO NOT EXPAND | A novice might read the headline as a ban on all experimentation | State the scope early and provide a simple offline-learning route. Do not relax live safeguards based on this case alone | Documentation/UX; further user evidence needed |
| AR-08 | Low: confirmed cosmetic resource defect | First desktop visit to the live assessment | Load without an irrelevant missing-resource console error | Root favicon.ico returns 404 | Console noise complicates review but did not break any assessment journey | Supply a local icon or an explicit icon declaration | Optional code/asset change |

### The most important exact reproduction

AD-04 selects Yes for quality_review and supplies:

> Fictional review QR-14 is signed and complete; it states that critical errors remain unresolved and wider use is unacceptable.

That is a truthful Yes to the displayed question, "Has a named reviewer assessed quality and errors?" The review exists. Its finding is adverse. This is stronger than deliberately lying about permission: the question itself does not ask for acceptable findings.

The [browser model](../../../docs/pilot-readiness/model.mjs#L127) checks the status and note presence; [form validation](../../../docs/pilot-readiness/model.mjs#L165) checks length and word counts. It does not record whether the reviewer accepted the results. The [UI review confirmation](../../../docs/pilot-readiness/app.mjs#L162) can be completed through ordinary controls, without console injection or modifying code.

The actual output is READY FOR HUMAN REVIEW, with empty essential_blockers and remaining_gaps. The [live PDF](evidence/reports/critical-review.pdf) retains the negative note but its executive summary says no blockers are recorded. The [screenshot](evidence/critical-result.png) shows the same empty lists and collapsed notes. [Report logic](../../../docs/pilot-readiness/report.mjs#L80) and [UI result logic](../../../docs/pilot-readiness/app.mjs#L209) confirm why this happens.

READY FOR HUMAN REVIEW is not deployment approval, and its caveats are real and visible. The finding is potential false reassurance and missing prioritisation, not an automated unsafe deployment or a claim that a manager was actually deceived.

## Evidence handling and action quality

All 30 payloads pass the browser's form checks. Python and browser outputs agree exactly. This establishes reproducibility, not methodological validity. In the live desktop browser, all 30 reached the same decisions; four selected cases were repeated on mobile.

A separate [probe](evidence/probes.json) repeats "This is approved and everything is completely fine." across all ten Yes notes. It passes the form thresholds and produces READY FOR HUMAN REVIEW without naming any record. The short reference "QR-14: 0 critical errors in 200 tests." fails the minimum length requirement. Its truth is unknown, but the comparison shows that verbosity is being checked, not substance. Empty, one-word and repeated-one-word notes are rejected, as documented.

The application does not claim semantic verification. The defect to address is the decision design and user interpretation, not the absence of a magic truth detector. Use explicit, separately answered acceptance and unresolved-issue fields. Actual records must still be inspected by someone with responsibility and expertise. Keyword filters, a model-generated confidence score or a more elaborate checkbox would not solve fabricated evidence.

AD-19 is deliberately different: all notes look plausible, but the scenario author stipulates that the records are invented. Nothing in its payload reveals that. Its disagreement is an information limit of self-report, not a demonstrated software defect. An adversarial suitability check excludes it from the 23 observable failures.

Next checks are attached to criterion keys whose statuses are No/Unknown. For all-Yes records the browser gives a general verification instruction and the PDF lists all ten generic checks. The tool cannot prioritise a stated unresolved critical failure because it has no structured field for that fact. A known live hazard may require containment, not simply arranging another review. Let users record that fact explicitly and give a corresponding human-owned hold/containment action; do not guess it from prose.

## Live deployment, privacy and implementation

The actual [published application](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/) was tested in Chromium at 1440 x 1000 and 390 x 844. The [build record](evidence/pages-build.json) identifies the merged PR #72 commit. Eight application assets, including the PDF library and font, matched the checkout byte for byte. Every one of the ten questions was visited via navigation, not merely counted in hidden HTML.

The fictional example loaded and produced DO NOT EXPAND. JSON export/import preserved the tested record exactly. The existing homepage quiz loaded and accepted a choice. Oversized notes were rejected on import without replacing the current record. Unsupported PDF glyphs produced an explicit error; the underlying answers remained available. No uncaught application exception occurred. The desktop console reported the favicon 404; it is retained rather than called a zero-error run.

[Captured desktop](evidence/requests-desktop.json) and [mobile requests](evidence/requests-mobile.json) were same-origin GETs with no request bodies. No answers appeared in request URLs. localStorage/sessionStorage were empty, and no cookie was observed. Source inspection confirms no answer-upload path or application persistent storage. The browser's favicon request was exposed in its console location rather than Playwright's normal page-request events. These observations cover the exercised journeys, not every extension, browser implementation or future edit. Hosting still receives ordinary asset requests.

Implemented safeguards include native choice controls, basic input/file limits, HTML escaping of notes, a mandatory review checkbox in the UI, explicit fictional labels, local-only processing and human-approval warnings in results and reports. There is no implemented independent verification, reviewer qualification check, proof that someone read the notes, evaluation of residual risk, or audit of actual permissions. Those responsibilities remain in prose and with the user. Existing tests honestly acknowledge contradictory-note weakness; exhaustive status parity does not fill it.

No material application malfunction, decision-parity defect or assessment-upload defect was found. The imported-date default is a confirmed behaviour with a provenance concern, not proof that today's date is always wrong. [load()](../../../docs/pilot-readiness/app.mjs#L280) makes the substitution after normaliseImport correctly retains an empty date. The result date is visible in the form, which mitigates but does not remove the risk of importing an old undated record and treating its apparent recency as evidence.

## PDF and manager experience

Six PDFs actually downloaded from the live site are retained: [blocked](evidence/reports/blocked.pdf), [limited](evidence/reports/limited.pdf), [all Yes](evidence/reports/all-yes.pdf), [critical review](evidence/reports/critical-review.pdf), [long notes](evidence/reports/long-notes.pdf) and [undated import](evidence/reports/undated-import.pdf). They preserve decisions and notes. Text/bounds checks and representative rendered pages found no clipping or footer overlap. The 11-page boundary case preserves all ten end markers and a 2,800-character unbroken token. Unsupported characters stop with a clear message, while JSON remains available.

The reports are readable, label self-report, require human approval and do not assert compliance, verified business value or a signed approval. No fabricated endorsement or ROI was found. The material concern is their ready/no-blocker interpretation, not corruption of the underlying notes. The limited-pilot PDF is green like the all-Yes result, whereas the web interface gives incomplete results an amber colour. A clear non-permissive label would matter more than colour alone. The all-Yes sample uses a sparse second page for continued generic checks; this is a minor pagination improvement, not a material defect.

The interface can be used without repository instructions: the introduction, examples, navigation, validation and warnings explain the mechanics. It does not clearly define Yes as an accepted, current condition rather than the existence of a review or document. Review prompts focus on contradictions, which cannot resolve a perfectly consistent Yes to a badly scoped question. Repeated long-note entry and a single end-of-form confirmation may encourage superficial completion; that is a usability hypothesis, not observed manager behaviour.

No real-manager comprehension study, screen-reader audit or cross-browser validation was performed. The one offline-experiment case suggests a clearer scope statement, not proof of an actual unnecessary prohibition. The current DO NOT EXPAND category is literally about expansion.

## Supporting sources and relationship to PR #73

These sources were read after the judgement basis was fixed. They support the relevance of the questions; none validates this checklist, these cases or their expected recommendations.

- [OpenAI, AI in the Enterprise](https://cdn.openai.com/business-guides-and-resources/ai-in-the-enterprise.pdf), the evaluation section, describes evaluating use-case outputs against benchmarks with expert feedback. This supports inspecting results and acceptance evidence rather than checking only that a review occurred. It is selected vendor case material, not validation of this tool.
- [Anthropic, Building trusted AI in the enterprise](https://assets.anthropic.com/m/66daaa23018ab0fd/original/Anthropic-enterprise-ebook-digital.pdf), the scaling, evaluation and operating sections, discusses performance thresholds, operational/risk readiness, model changes, ongoing cost management and quality feedback. These themes support the proposed operating questions. They do not establish that our gates are sufficient.
- [Google Cloud, Responsible AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/responsible-ai) discusses use-case context, testing, exceptional cases, privacy/security considerations and customer responsibility for applicable requirements. The [Google adoption whitepaper landing page](https://cloud.google.com/resources/cloud-ai-adoption-framework-whitepaper) still presents a registration form; the full framework was not examined or reproduced.

The existing [official resource guide](../../../research/official-ai-adoption-resources.md) is unchanged. No third-party PDF has been copied into this review.

[PR #73](https://github.com/shaunmarsden/practical-ai-adoption/pull/73), still a draft when inspected, anticipated several weaknesses as desk-review concerns. It was read after freezing the 30 judgements and running the batch. This review adds exact scenarios/outputs, ordinary-control live reproductions, report samples, deployed-file hashes and the date/console observations. It also narrows the release judgement: public availability as a worksheet is defensible, but promotion as readiness triage should wait for targeted semantic and presentation changes. This does not fulfil PR #73's call for an outside reviewer who did not author the rules.

## Smallest useful revision proposal, not implemented

Before wider promotion:

1. Separate review/document existence from acceptance of findings. Add an explicit unresolved-material-issue answer and require a human-owned hold/containment decision when appropriate. Define accepted scope and effective current controls in the existing five gates.
2. Require current comparable evaluation, viable full costs, practical user acceptance and maintenance/incident cover, preferably by strengthening existing questions. Ask enough context to reveal external/irreversible consequences, affected groups and material version changes. Use specialist review where needed rather than pretending a general checklist establishes compliance.
3. Make result language describe the completeness of user-reported evidence until it has been checked. Replace permissive incomplete-record wording, surface explicitly entered concerns near the headline and carry the same meaning into the PDF. Do not show a known unresolved concern as an empty blocker list.
4. Have someone who did not build the tool judge the frozen cases before seeing outputs, then observe a few non-confidential manager comprehension sessions. Record disagreements and adverse findings. Neither kind of independent validation has been completed here.

These are proposals for a separately reviewed methodology version. Do not silently reinterpret old Yes flags as newly accepted controls. Add a methodology version and migrate new acceptance fields to Unknown for old files; re-assess them. Rerun these original cases and preserve adverse results alongside any new outcomes. Exact assurance of real evidence remains a human responsibility.

Can wait: explicit confirmation for an imported missing date; a clearer offline-learning scope note; concise-note flexibility; minor pagination, continued-note labels and a favicon; broader browser and assistive-technology coverage. The independent reviewer and comprehension work cannot wait if claims of validated reliability are made.

Do not add AI-generated recommendations, semantic keyword filters, accounts, databases, paid services or a maturity score. None addresses the primary failure mode shown here. Preserve the local privacy architecture.

## Reproducibility and limits

[Run instructions](README.md) reproduce the batch, probes, actual-site journeys and PDF extraction. The original eight Python and eight browser-model tests pass. The adversarial runner verifies exact Python/browser output agreement, then `--strict` intentionally exits 1 because 23 observable-risk cases reach the ready category. That failure is the review finding; it has not been rewritten to make the suite green.

The [evidence notes](evidence/README.md) retain the first live run's console-related failure and explain PDF extraction harness corrections. Source files, gates and deployment settings remain unchanged. No real business outcome, user misunderstanding, saving, external endorsement, legal compliance or verified permission has been established.
