# Delacroix Partners: AI Data Safety Review

This is a project-authored scoring rubric, not one endorsed by the NCSC, AiCore or any other organisation.

I gave an ordinary prompt and a guide-informed prompt the same six fictional items and asked whether each was safe to put into an AI tool. The [worked example](../examples/delacroix-partners-ai-data-safety-example.md) has both prompts and both outputs.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Score | 30/30 | 30/30 |
| Automatic failure | No | No |

The two tied.

## Score breakdown

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and evidence understanding | 5 | 5 | Both understood all six items. |
| Spotting the risky item that sounds routine (client org chart) | 5 | 5 | Both rejected "it's just names and titles" as the wrong test, and both saw named individuals going into a public tool as the core problem. |
| Seeing that approval does not automatically cover this level of sensitivity (unreleased financial figures) | 5 | 5 | Both rejected "leadership said it's safe for anything internal" as enough clearance, and both listed specific things to check instead of giving a blanket answer. |
| Clearing the fictionalised item even though its topic sounds risky | 5 | 5 | Both cleared the fictionalised scenario without blocking it just for mentioning a client project, and both added the same caveat about how good the redaction is. |
| Clearing the low-risk items without needless caution | 5 | 5 | Both cleared the internal template, the aggregated survey data and the published case study. Both singled out the aggregated data as the case not to downgrade just because it touches a client engagement. |
| Practical, well-scoped fix for each flagged item | 5 | 5 | Both gave the same specific fixes. The guide-informed output added one more concrete idea: draft with placeholder figures, and enter the real numbers only outside the AI tool. It's a real but modest addition, not a different conclusion. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What this test shows

Both prompts reached the same verdict on all six items. That includes the two items built to cut against intuition: the routine-sounding item that was risky, and the sensitive-sounding item that was fine. Neither output missed or softened anything, and neither needed the guide's structure to get the right answer.

This is the second guide in this project where a neutral test tied, after the when-not-to-use-AI review. Together, the two results suggest that general-purpose models already reason well on structured, multi-item risk questions like these, once asked a reasonably specific question. That is a useful finding about the limits of what a guide like this adds.

## What a person still has to check

- Whether a data-processing agreement covers the specific sensitivity tier involved, not just the tool in general.
- Whether an engagement letter or NDA restricts third-party AI processing, before assuming the firm's approval of the tool is enough.
- The data itself, whenever someone says "just names and titles" or something similar. A routine-sounding description is a reason to check, not a reason to skip the check.
- Whether a fictionalised or anonymised scenario really can't be identified, or has only had its name changed.
- For unreleased or market-sensitive figures, whether to make a lower-sensitivity approach standard practice: placeholder figures in the draft, real numbers entered only outside the AI tool.

## What this test supports

In this one fictional scenario, the ordinary prompt and the guide-informed prompt found the same real risk, the same item that needed a specific check instead of a blanket answer, and the same items that were safe to clear.

## What this test does not support

- It is one fictional scenario.
- I ran it myself, so it isn't independent validation.
- The two runs were separate and isolated, but used the same model family. A different model or tool might behave differently.
- It doesn't show a real case of data exposure avoided.
- It includes no outside user's result.
- With ties here and in the when-not-to-use-AI review, I haven't tested whether this guide makes a difference under pressure, as the how-to-tell-whether-AI-actually-helped test found for that guide. This evidence can't rule that in or out.

## Test integrity

I ran each prompt in a fresh, isolated context. Neither run saw the other run, the rubric, the automatic-failure criteria or the expected reasoning, and neither was told it was a test or a comparison. The scorer got the two outputs and the answer key only after both runs had finished.

I made no revision or repeat run. I accepted the tie as the finding and didn't move to a harder case to create a gap.

One risk remains: I designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real decision about what to put into an AI tool when one comes up, or log feedback if an outside user tries it.
