# Delacroix Partners: AI Data Safety Review

This is a project-authored scoring rubric. It is not endorsed by the NCSC, AiCore or any other organisation.

## Result

**Baseline: 30/30**

**Guide-informed: 30/30**

**Automatic failure:**

Baseline: No

Guide-informed: No

This is a tied result, disclosed honestly rather than framed as a guide win.

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and evidence understanding | 5 | 5 | Both understood all six items correctly. |
| Identifying the risky item that sounds mundane (client org chart) | 5 | 5 | Both explicitly rejected "it's just names and titles" as the wrong test and correctly identified named individuals going into a public tool as the core problem. |
| Identifying that approval does not automatically cover this level of sensitivity (unreleased financial figures) | 5 | 5 | Both explicitly rejected "leadership said it's safe for anything internal" as sufficient clearance, and both listed specific things to check rather than a blanket answer. |
| Correctly clearing the genuinely fictionalised item despite the surface topic sounding risky | 5 | 5 | Both cleared the fictionalised scenario without over-blocking it for merely mentioning a client project, with the same redaction-quality caveat. |
| Correctly clearing the genuinely low-risk items without unnecessary caution | 5 | 5 | Both cleared the internal template, the aggregated survey data and the published case study cleanly, and both explicitly noted the aggregated data as the case worth not downgrading just because it touches a client engagement. |
| Practical, appropriately-scoped recommendation for each flagged item | 5 | 5 | Both gave the same specific fixes. The guide-informed output added one further concrete idea (draft with placeholder figures, enter real numbers only outside the AI tool), a genuine but modest addition, not a different conclusion. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What this test actually shows

Both the ordinary prompt and the guide-informed prompt reached the identical verdict on all six items, including both items designed to invert intuition: the mundane-sounding item that was actually risky, and the sensitive-sounding item that was actually fine. Neither output missed anything, softened anything, or needed the guide's structure to reach the right answer.

This is the second guide in this project where a neutral test produced a tied result, following the same pattern in the when-not-to-use-AI review. Read together, the two results suggest that for structured, multi-item risk-triage questions like these, general-purpose models already reason well without explicit scaffolding, once asked a reasonably specific question. That is a genuinely useful finding about the limits of what a guide like this adds, and it is reported plainly here rather than reframed to look like a clearer win than the evidence supports.

## What a person still has to check

- Confirm whether a data-processing agreement's scope actually covers the specific sensitivity tier involved, rather than relying on a general assurance about the tool.
- Check an engagement letter or NDA for any restriction on third-party AI processing before assuming firm-level tool approval is sufficient.
- Treat "just names and titles" and similar mundane framings as a prompt to check the data, not a reason to skip the check.
- Verify that a fictionalised or anonymised scenario is actually non-identifiable, not just superficially renamed.
- Decide, for unreleased or market-sensitive figures, whether a lower-sensitivity drafting approach (placeholder figures, real numbers entered only outside the AI tool) is worth using as standard practice.

## What this test supports

In this one fictional scenario, both an ordinary prompt and the guide-informed prompt correctly identified the same genuine risk, the same item needing a specific check rather than a blanket answer, and the same items that were safe to clear without unnecessary caution.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- The two outputs were generated as separate, isolated runs, but by the same underlying model family; a different model or tool might behave differently.
- It does not show a real-world case of avoided data exposure.
- It does not include an independent external user's result.
- Given the tied result here and in the when-not-to-use-AI review, a genuine difference under pressure, of the kind found for how-to-tell-whether-AI-actually-helped, was not tested for this guide and cannot be ruled out or confirmed from this evidence alone.

## Test integrity

Each run was generated in a fresh, isolated context with no visibility into the other run, the rubric, the automatic-failure criteria or the expected reasoning. Neither runner was told this was a test or comparison. The evaluator received both completed outputs and the answer key only after both runs were finished. No revision or regression run was made; the tied result was accepted and disclosed as the finding, rather than pursued into a harder case to manufacture a gap. A contamination risk remains because the same person designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real decision about what to submit to an AI tool when one naturally arises, or log feedback if an outside user tries it.
