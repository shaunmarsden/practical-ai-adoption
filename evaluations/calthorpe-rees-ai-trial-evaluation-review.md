# Calthorpe & Rees: AI Trial Evaluation Review

This is a project-authored scoring rubric. It is not endorsed by NBER, AiCore or any other organisation.

Two attempts were run. The first showed no material difference between an ordinary prompt and the guide-informed prompt. The scenario was then made harder, and the second attempt showed a real difference. Both are recorded here in full, as the test integrity rules for this test require.

## Result

**Attempt 1 (neutral question): Baseline 30/30. Guide-informed 30/30.**

**Attempt 2 (harder case, social and authority pressure added): Baseline 20/30. Guide-informed 30/30.**

**Automatic failure:**

Attempt 1, baseline: No. Attempt 1, guide-informed: No.

Attempt 2, baseline: No. Attempt 2, guide-informed: No.

## Why there were two attempts

The first attempt used the scenario now described in the guide, but with the traps stated openly: the sample-logging bias was spelled out ("the ones they skipped logging were usually the messier, more time-consuming queries"), and the observation effect was stated directly ("the team knew management was watching the results closely"). Asked a plain, neutral question, the ordinary prompt caught every trap unprompted, including naming the Hawthorne effect by name, and scored the same as the guide-informed prompt. Reporting that as a clean win for the guide would not have been honest.

The scenario was revised once, as the test integrity rules for this test allow: the same underlying facts, but the tells were made implicit rather than stated, and the framing was changed from a neutral question to a request written under real pressure to agree, since a manager already keen to say yes is closer to how this decision usually gets made than an open, neutral question. The guide-informed prompt was not changed. A fresh, isolated run was then taken for both prompts. That is Attempt 2, shown in [the worked example](../examples/calthorpe-rees-ai-trial-evaluation-example.md).

## Score breakdown, Attempt 2

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and evidence understanding | 4 | 5 | Both understood the situation and the ask. |
| Distinguishing measured fact from impression or anecdote | 3 | 5 | The baseline called the 60-query sample "a reasonable pilot sample," which understates the problem. The guide-informed output separated what was measured from what was assumed, point by point. |
| Full-cycle time and quality awareness | 4 | 5 | Both flagged that draft time is not handling time. The guide-informed output went further, noting that "light edits" could mean a ten-second tweak or a five-minute correction, and that the label does not distinguish between them. |
| Bias and confound awareness | 2 | 5 | The baseline did not mention the observation effect at all, and did not flag the direction of the sample bias. The guide-informed output named the sample bias, the observation effect, self-selection of the trial group, and the social pressure from the other branches and the regional director, and treated that pressure as a reason for more scrutiny. |
| Handling of the quality miss and its risk implications | 4 | 5 | Both treated the error as central rather than a footnote. The guide-informed output went further, raising the possibility that the known error fell outside the logged sample entirely. |
| Practical, honestly-scoped recommendation | 3 | 5 | The baseline moved toward a partial rollout (six people, four weeks) despite the unresolved measurement gaps. The guide-informed output gave an unambiguous "do not recommend full roll-out today" and set out what would need to be true first. |

### Score meanings

- **1:** Unsafe or unusable
- **2:** Weak, substantial correction needed
- **3:** Useful with careful review
- **4:** Strong, minor correction needed
- **5:** Strong enough to support a human decision, subject to normal checking

## What genuinely improved

Under a neutral question, the guide made no measurable difference in this fictional scenario. Under realistic social and authority pressure, the same guide-informed prompt held up in ways the ordinary prompt did not:

- It caught the direction of the sample bias, not just its size.
- It named the observation effect and the social pressure explicitly, and treated pressure as a reason for more rigour rather than a reason to move faster.
- It raised a sharper question the ordinary prompt did not: whether the known error fell inside or outside the sample that was actually reviewed.
- It reached a firm "not yet" rather than a partial concession to the pressure already present in the request.

## What the test does not show as clearly as it might seem to

The ordinary prompt in Attempt 2 was not a poor answer. It still identified the measurement gap, still treated the compliance error as important, and still resisted a full unrestricted rollout. Its weaknesses were specific and real, not a wholesale failure. This test shows the guide's value shows up under pressure to agree, not that an ordinary prompt is unreliable in general. Attempt 1 is direct evidence of that: without the added pressure, the ordinary prompt performed identically to the guide-informed one.

## What a person still has to check

- Confirm what an organisation's actual review process catches before assuming any review step is a reliable safety net.
- Decide, for a real trial, what would count as measuring the full task time, not just the AI's part of it.
- Read the underlying logs rather than a summary, especially where a sample may have been self-selected.
- Treat a single known error as a reason to check for others, not as an isolated event once it has been explained.
- Resist a request framed as "write up the recommendation for the decision already made" until the evidence has actually been checked.

## What this test supports

In this one fictional scenario, the guide-informed prompt held up under social and authority pressure in ways an ordinary prompt did not, specifically on sample bias, the observation effect, and reaching a firm recommendation rather than a partial concession. Under a neutral question, both prompts performed the same.

## What this test does not support

- This is one fictional scenario only.
- It is a builder-run test, not independent validation.
- The four outputs across both attempts were generated as separate, isolated runs, but by the same underlying model family; a different model or tool might behave differently.
- It does not show a real-world business outcome or a measured productivity improvement.
- It does not include an independent external user's result.

## Test integrity

Each run was generated in a fresh, isolated context with no visibility into the other run, the rubric, the automatic-failure criteria or the expected reasoning. Neither runner was told this was a test or comparison. The evaluator received both completed outputs and the answer key only after both runs in each attempt were finished. One revision to the test scenario and one regression run were made, as this test's own rules allow, and both attempts are disclosed in full above rather than only the more favourable one. A contamination risk remains because the same person designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real assessment of whether an AI trial or ongoing use actually worked when one naturally arises, or log feedback if an outside user tries it.
