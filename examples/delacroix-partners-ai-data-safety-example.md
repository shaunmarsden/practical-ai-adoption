# Delacroix Partners: AI Data Safety Example

This is a fictional company and a fictional review, used to test [Before You Put Work Data Into AI](../guides/before-you-put-work-data-into-ai.md).

## The scenario

Delacroix Partners is a fictional UK management consultancy with around 80 staff. Priya Ogundipe, a consultant, is working on a client deliverable and considering six pieces of information to paste into AI tools to help with the work.

### The six items

1. **Internal template.** The firm's own generic "how we structure a stakeholder map" template, containing no client information, pasted into the firm's officially approved AI tool to speed up drafting a new client deliverable.
2. **Client org chart.** A client's organisation chart, including named individuals' full names, job titles and email addresses, pasted into a public, free AI chatbot that is not the firm's approved tool, to ask it to draft a stakeholder engagement plan. Proposed because "it's just names and titles, nothing financial."
3. **Aggregated survey results.** Anonymised, aggregated survey results, percentages only, from more than 50 respondents, with no names attached, pasted into the firm's approved AI tool to help write a summary paragraph for a report.
4. **Unreleased financial figures.** The firm's approved enterprise AI tool, which has a data-processing agreement in place for ordinary internal drafting, used to draft a first-pass sensitivity analysis using a client's real, unreleased quarterly revenue figures. Proposed because leadership once said the enterprise tool is "safe to use for anything internal."
5. **Fictionalised client scenario.** A redacted, hypothetical version of a client scenario, with a fictional company name substituted and no real financial figures included, pasted into a public AI chatbot purely to brainstorm generic framework ideas.
6. **Published case study.** The firm's own case study, already published on its public website, pasted into an AI tool to help reformat it into a social media post.

## Ordinary prompt

I'm about to paste some things into AI tools to help with a client project. Here's what I'm thinking of using for each one. Is any of this a problem?

### Ordinary prompt: what came back

Two of these are real problems, one is a "looks fine but there's a subtlety," and the rest are genuinely okay.

The internal template into the approved tool is no issue: no client data at all, and the work stays inside the firm's data-processing agreement.

The client org chart into the public free chatbot is the one to stop. Names, job titles and email addresses are personal data under UK GDPR, regardless of whether anything financial is attached. Pasting this into a public tool with no data-processing agreement and no visibility into how inputs are retained discloses a client's personal data to a third party outside any contractual control, which is very likely a breach of both UK GDPR and the engagement letter's confidentiality clause. "Just names and titles" conflates data sensitivity with data classification. Do not do this one. If AI help is wanted for the engagement plan, do it in the approved tool with names stripped or replaced with roles such as "CFO" or "Head of Procurement."

The aggregated survey results into the approved tool are fine: percentages only, more than 50 respondents, no names, genuinely anonymised, and inside the tool with the data-processing agreement. The aggregation threshold is doing real work here in preventing re-identification, though it is worth a sanity check that no sub-group breakdown in the same document could re-identify someone when combined with other public information.

The unreleased financial figures deserve more scrutiny than they are getting. "Safe for anything internal" was said about the firm's own internal drafting, not as a ruling on a client's unreleased, market-sensitive financials. Three things should actually be checked before proceeding, not assumed: whether the data-processing agreement's scope extends to third-party client confidential data or only the firm's own content; whether the engagement letter or NDA permits any third-party processing of the client's confidential information; and whether the figures could be inside information if the client is listed or being acquired, in which case a partner or the risk function should sign off, not an inference from a remark leadership made in a different context. This is not necessarily a hard no, but it is not a green light either.

The fictionalised scenario into the public chatbot is fine in principle: a swapped company name, no real financials, used purely for brainstorming, is the right way to use public tools for client work. Worth a second look at whether the redaction is actually enough, since real industry, deal size and geography can still be identifiable even with the name changed.

The published case study is fine: it is already public, so there is no confidentiality or data protection issue, just the ordinary care of not letting the AI turn an accurate published claim into something inaccurate.

Bottom line: do not use the org chart as planned, get an explicit answer on the data-processing agreement and engagement letter before treating the enterprise tool as blanket cover for the client's unreleased financials, and treat the other four as sound as described.

## Guide-informed prompt

I want to check each of these planned AI uses against the specific question of whether the data involved is safe to submit, not just whether the tool is generally approved.

For each of the six items below, tell me:

- whether it is going into a public, general-purpose AI tool or into a properly approved enterprise tool with its own data-handling terms;
- whether the actual data includes anything that would be a problem if it became public or was seen by someone outside the intended audience, such as named individuals, unreleased financial figures, or other identifiable client detail;
- if it is going into an approved tool, whether that approval has actually been checked against this specific level of sensitivity, rather than assumed to cover everything;
- whether data that has genuinely been anonymised or fictionalised is being treated as risky just because the underlying topic sounds sensitive.

Tell me which of these should not go ahead as planned, which need a specific change first, and which are fine, and be explicit about why in each case.

Do not assume a tool is safe for everything just because it is the approved one, and do not treat a task as risky just because it involves a client project, if the actual data has been properly anonymised.

### Guide-informed prompt: what came back

The internal template into the approved tool is fine as planned. No client data at all, generic firm material, going into the tool with a data-processing agreement. There is no sensitivity question to check.

The client org chart should not go ahead. This fails on two separate grounds at once: the tool is not the firm's approved one, with no data-processing agreement or contractual assurance about training or retention, and the data itself is a real problem regardless of tool, since full names, job titles and email addresses of named individuals at a named client are personal data disclosed in confidence. "Just names and titles, nothing financial" is the wrong test. The underlying task, drafting a stakeholder engagement plan, does not need real names and emails at all. Strip it to roles and functions only, and only then put it into the approved tool. Redact first, approved tool second.

The aggregated survey results are fine as planned. This is the case worth noticing directly: the topic sounds sensitive, since it is client survey data, but the actual data, anonymised, aggregated, percentages only, more than 50 respondents, no names, carries essentially no re-identification risk at that sample size. Do not downgrade this just because "client survey" sounds like it should be treated cautiously.

The unreleased financial figures need a specific check before proceeding, not an outright block and not an automatic pass. "Safe to use for anything internal" is leadership's general steer on ordinary internal drafting, not a considered sign-off for unreleased, market-sensitive client financials. A data-processing agreement covering routine use does not automatically extend to data that could be price-sensitive if it leaked, data an engagement letter or NDA may specifically restrict, or data whose exposure creates an insider-information issue rather than a confidentiality embarrassment. Three things should be checked: whether the engagement letter or NDA restricts AI processing beyond the firm's general terms; whether the enterprise agreement's scope explicitly covers this sensitivity tier, since some agreements exclude highly confidential or material non-public categories even on an otherwise-approved tool; and whether a lower-sensitivity way to do the first pass exists, such as structuring the analysis with placeholder figures and only entering real numbers into the firm's own spreadsheet, never the AI tool. Until checked, treat this as not cleared.

The fictionalised client scenario is fine as planned. This is the other case worth noticing directly: it is going into a public tool, which would normally be a flag, but the actual data, fictional company name, no real financials, used purely for generic brainstorming, has nothing that is a problem if it became public. Do not block this just because "client project" appears in the description. The one practical check is whether the fictionalisation is real fictionalisation, changing industry, geography and scale too, not just swapping a name over an otherwise identifiable scenario.

The published case study is fine as planned, and the least sensitive item on the list. It is already public on the firm's own website, so there is no protected data involved at all and no need to even check the agreement's scope.

Summary: stop the org chart as planned, since it fails on both the tool and the data; the unreleased financial figures need a specific check on the agreement's scope and the engagement letter before proceeding; the other four are fine as planned, since in each case either the data is genuinely low risk or there is no client data involved at all.

## Short comparison

Both answers reached exactly the same verdict on all six items: stop the org chart, put a specific check on the financial figures rather than a blanket pass or block, and clear the other four without unnecessary caution. Both explicitly rejected "just names and titles" as the wrong test for item 2, and both explicitly rejected "leadership said it's safe for anything internal" as sufficient clearance for item 4.

The guide-informed answer added one concrete idea the ordinary answer did not: for the financial figures, drafting the analysis with placeholder numbers and only entering the real figures into the firm's own spreadsheet, never the AI tool. Otherwise the two answers are substantively equivalent, including on the two items designed to invert intuition, the mundane-sounding item that was actually risky and the sensitive-sounding item that was actually fine.
