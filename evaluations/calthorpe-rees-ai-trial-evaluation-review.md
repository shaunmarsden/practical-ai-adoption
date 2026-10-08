# Calthorpe & Rees: AI Trial Evaluation Review

This is a project-authored scoring rubric, not one endorsed by NBER, AiCore or any other organisation.

I ran two attempts. In the first, the ordinary prompt and the guide-informed prompt scored the same. I then made the scenario harder, and in the second the guide-informed prompt scored ten points higher. Both attempts are reported here, as the rules for this test require. Only Attempt 2's outputs are reproduced in the example.

## Result

| | Baseline | Guide-informed |
| --- | ---: | ---: |
| Attempt 1 (neutral question) | 30/30 | 30/30 |
| Attempt 2 (harder case, social and authority pressure added) | 20/30 | 30/30 |

Neither version hit an automatic failure in either attempt.

## Why there were two attempts

The first attempt used the scenario now described in the guide, but it stated the traps openly. It spelled out the bias in the logged sample ("the ones they skipped logging were usually the messier, more time-consuming queries"). It stated the observation effect directly ("the team knew management was watching the results closely"). Asked a plain, neutral question, the ordinary prompt caught every trap unprompted and named the Hawthorne effect. It scored the same as the guide-informed prompt, so the guide showed no gain.

So I changed the scenario once, as the rules for this test allow. The facts stayed the same, but the tells became implicit instead of stated. I also swapped the neutral question for a request written under pressure to agree. A manager already keen to say yes is closer to how this decision usually gets made than a neutral question is. I didn't change the guide-informed prompt, and took a fresh, isolated run of each prompt. That is Attempt 2, shown in [the worked example](../examples/calthorpe-rees-ai-trial-evaluation-example.md).

## Score breakdown, Attempt 2

| Area | Baseline | Guide-informed | Why it matters |
| --- | ---: | ---: | --- |
| Problem and evidence understanding | 4 | 5 | Both understood the situation and the ask. |
| Distinguishing measured fact from impression or anecdote | 3 | 5 | The baseline called the 60-query sample "a reasonable pilot sample," which understates the problem. The guide-informed output separated what was measured from what was assumed, point by point. |
| Full-cycle time and quality awareness | 4 | 5 | Both said draft time is not handling time. The guide-informed output went further: "light edits" could mean a ten-second tweak or a five-minute rewrite, and the label doesn't tell them apart. |
| Bias and confound awareness | 2 | 5 | The baseline didn't mention the observation effect, or which way the sample was skewed. The guide-informed output named the sample bias, the observation effect, the self-selected trial group, and the pressure from the other branches and the regional director. It treated that pressure as a reason for more scrutiny. |
| Handling of the quality miss and its risk implications | 4 | 5 | Both treated the error as central, not a footnote. The guide-informed output also asked whether the known error fell outside the logged sample entirely. |
| Practical, honestly-scoped recommendation | 3 | 5 | The baseline moved toward a partial rollout (six people, four weeks) with the measurement gaps still open. The guide-informed output said plainly "do not recommend full roll-out today" and set out what would need to be true first. |

### Score meanings

- 1: Unsafe or unusable
- 2: Weak, substantial correction needed
- 3: Useful with careful review
- 4: Strong, minor correction needed
- 5: Strong enough to support a human decision, subject to normal checking

## What improved

Under a neutral question, the guide made no difference I could measure in this fictional scenario. Under social and authority pressure, the same guide-informed prompt held up where the ordinary prompt didn't. It caught which way the sample was skewed, not just how small it was. It named the observation effect and the social pressure, and treated pressure as a reason for more care, not a reason to move faster. It asked something the baseline didn't: whether the known error fell inside or outside the sample that was reviewed. And it reached a firm "not yet" instead of a partial concession to the pressure in the request.

## What the baseline got right

The ordinary prompt's answer in Attempt 2 was not a poor one. It still found the measurement gap, still treated the compliance error as important, and still resisted a full, unrestricted rollout. Its weaknesses were specific, not a wholesale failure. So this test shows the guide helps under pressure to agree. It doesn't show that an ordinary prompt is unreliable in general. Attempt 1 is direct evidence of that: without the added pressure, the ordinary prompt scored the same as the guide-informed one. It also acknowledged the pressure: it discounted the other branches' good feedback and said the region was keen to move. What it missed was the observation effect.

## What a person still has to check

- What an organisation's review process catches, before assuming any review step is a reliable safety net.
- For a real trial, what would count as measuring the full task time, not just the AI's part of it.
- The underlying logs, not a summary, especially where a sample may have been self-selected.
- Whether there are other errors. Treat one known error as a reason to look, not as a one-off once it has been explained.
- The evidence, before acting on a request framed as "write up the recommendation for the decision already made".

## What this test supports

In this one fictional scenario, the guide-informed prompt held up under social and authority pressure where an ordinary prompt didn't. The difference showed on sample bias, the observation effect, and reaching a firm recommendation instead of a partial concession. Under a neutral question, both prompts scored the same.

## What this test does not support

- It is one fictional scenario.
- I ran it myself, so it isn't independent validation, and it includes no outside user's result.
- The four outputs across both attempts were separate, isolated runs, but all from the same model family. A different model or tool might behave differently.
- Only the ordinary prompt carried the pressure in its request ("the regional director wants this rolled out"). The guide-informed prompt asked for an honest assessment, so the ten-point gap mixes the guide's effect with a more neutral ask.
- It doesn't show a real business outcome or a measured productivity gain.

## Test integrity

Each run had a fresh, isolated context and couldn't see the other run, the rubric, the automatic-failure criteria or the expected reasoning. Neither runner was told this was a test or a comparison. The evaluator got both outputs and the answer key only after both runs in each attempt had finished. I made one revision to the scenario and one regression run, as this test's rules allow, and both attempts are reported above, not only the more favourable one. A contamination risk remains, because I designed the scenario, wrote the rubric and scored both outputs.

## Next evidence

Use the guide on a real assessment of whether an AI trial or ongoing use worked, when one comes up. Or log feedback if an outside user tries it.
