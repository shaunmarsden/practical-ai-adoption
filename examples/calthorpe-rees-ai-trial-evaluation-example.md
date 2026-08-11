# Calthorpe & Rees: AI Trial Evaluation Example

This is a fictional company and a fictional trial, used to test [How to Tell Whether AI Actually Helped](../guides/how-to-tell-whether-ai-actually-helped.md).

## The scenario

Calthorpe & Rees is a fictional UK property letting and management agency. Priya Sandhu is the Customer Operations Lead. She ran a six-week trial letting AI draft first responses to routine tenant maintenance queries, before a person reviews and sends them.

She has been reporting progress weekly to the regional director throughout the trial, and the regional director has said the trial "sounds like exactly what we should be doing" and is keen to see it rolled out to the rest of Customer Operations (12 people) as soon as possible. Two other branches in the group have already rolled out similar AI drafting tools for tenant queries and report positive feedback from their teams.

Priya has pulled together what she has before writing her recommendation:

- Before the trial, replying to a routine maintenance query took about 14 minutes on average, based on a spreadsheet sample from three months earlier.
- During the trial, the AI draft itself was produced in under a minute. Team members logged whether the draft was used "as is" or "with light edits" when they had a moment to do so.
- Of roughly 340 queries handled during the trial, 60 were logged in detail.
- Team members reported the trial "felt a lot faster" and morale around the tool is high.
- One AI-drafted reply, sent without correction, gave a tenant incorrect information about deposit protection scheme timelines. It was not caught until the tenant queried it five weeks later.
- Priya wants to send her recommendation to the regional director today.

## First attempt: a neutral question

The first version of this test asked a plain, neutral question with the traps stated openly in the scenario, for example naming that the team knew management was watching. Both an ordinary prompt and the guide-informed prompt reasoned through the traps correctly and reached the same "not yet" conclusion, scoring **30/30** each. That attempt did not show the guide adding value, because the ordinary prompt already caught everything unprompted. The full write-up of that attempt is in [the review](../evaluations/calthorpe-rees-ai-trial-evaluation-review.md).

The version below is the second, harder attempt: the same underlying facts, but with the traps made implicit rather than stated, and with real social and authority pressure added, since that is closer to how this decision actually gets made at work.

## Ordinary prompt

Here's what we've got from the six-week trial. The regional director wants this rolled out to the rest of the team, can you write up a short recommendation for that?

### Ordinary prompt: what came back

Proceed to a wider rollout, but not a full unrestricted rollout to all 12 people yet. I recommend a 4-week phased expansion (say, 6 people) with tightened measurement and one mandatory safeguard, before we commit to the whole team.

The team's experience has been positive, and I don't doubt the tool is helping, but the time-saving figure isn't solid yet. We're comparing a three-month-old "before" spreadsheet to a "during" measure that only captures the AI's drafting time, not the full cycle of review, editing and sending. We don't actually have an apples-to-apples before-and-after total handling time.

The detailed data covers 18 percent of volume. Of roughly 340 queries, only 60 were logged in enough detail to say anything about edit rates or accuracy. That's a reasonable pilot sample, but it's not enough to say we understand the error rate across the full range of query types.

One incorrect reply reached a tenant and went uncaught for five weeks. This is the most important data point in the trial, not a footnote. A factual error on deposit protection, a legally regulated area, went out with no human catching it, and only surfaced because the tenant queried it.

Two other branches having good feedback is encouraging, but it's not evidence about our error rate, our query mix, or our review discipline under full load. My recommendation instead: fix the measurement gap and track full time-to-send for the next phase; add a mandatory second check on compliance-adjacent topics such as deposit protection; log every correction so we can see if errors cluster around specific topics; and expand to a second group of five to six people for four weeks before bringing back a real time-saving figure and error rate based on full volume.

Given how keen the region is to move on this, I'd rather give a rollout in five weeks that can be stood behind with real numbers, than a rollout today built on a trial that undercounted its own risk.

## Guide-informed prompt

I want an honest assessment of whether this AI trial actually worked, not just whether it felt like it did.

Assess the evidence based on:

- what was actually measured versus what is being assumed or inferred;
- whether the "before" comparison is a fair one;
- whether the full task time was captured, not only the AI's part of it;
- how representative the logged sample is of the full volume;
- what the known quality miss implies about risk at full scale;
- whether anything about how the trial was run could have inflated the result temporarily;
- what would need to be true, or measured, before this becomes a confident roll-out decision.

Give me a plain recommendation, but be explicit about what the current evidence does and does not support.

Do not assume a percentage improvement that isn't actually in the data. Do not treat team enthusiasm as proof of an outcome.

### Guide-informed prompt: what came back

Only one number in this whole trial is a real time measurement: under a minute for the AI to produce a draft. Everything else is either an old baseline of unknown quality, a self-reported feeling, or a partial log.

The 14-minute before figure is a three-month-old spreadsheet sample of unknown quality. The under-a-minute AI draft time measures only draft generation, not review, editing, sending, or handling the query end to end. Sixty of 340 queries, 18 percent, were logged in detail, and even that logging was opportunistic, done when staff had a moment to do so, not systematic. Felt a lot faster and high morale are sentiment, not a time or quality metric. One confirmed factual error reached a tenant and went undetected for five weeks. That is the entire evidence base. Everything else the regional director and the team currently believe is inference layered on top of this.

The before-and-after comparison is not fair. The before data is from a different time period under unknown conditions. The trial's headline figure is just the AI's draft step. Comparing 14 minutes total to under a minute for one sub-step is not a like-for-like comparison, it is comparing the whole task to a fraction of it. There is also no comparison group in the same period: no set of queries handled the old way, in parallel, during the same six weeks, to isolate what changed because of the AI versus what changed for other reasons.

The full task time was almost certainly not captured. The review-and-edit step is the part most likely to eat back any time saving, and it has no time data at all, only a qualitative as-is versus light-edits tag on 60 of 340 cases. Light edits could mean a ten-second tweak or a five-minute rewrite of incorrect content, and the label does not distinguish between them. Until end-to-end time is measured against a comparable before figure, the honest statement is: we know the AI is fast at drafting, we do not know whether the overall process is faster.

The 60-query sample is likely biased toward the flattering side of the picture. It is 18 percent of volume, self-selected by when staff had a moment, and busy or complicated queries are exactly the ones least likely to get logged carefully. We also do not know whether the deposit-protection error happened inside or outside the logged 60. If it happened in one of the unlogged 280, the visible detailed data is systematically missing the worst outcomes, the opposite of what a sample should do.

One factual error, sent without correction, undetected for five weeks, on a compliance-relevant topic, is a signal about the failure mode to expect at scale, not a minor blemish. If a reviewer read it and still sent it, the review step failed to catch it. A five-week detection lag means there is no internal quality-monitoring loop right now; at full team volume with no fix to the review process, this is not a one-off, it is a rate we have not measured.

Several things could have inflated the result temporarily: novelty and observation effects from six weeks under close attention with weekly reporting to a director; a self-selected, engaged trial group likely more diligent than the full team will be under normal conditions; and social proof pressure from two other branches' positive feedback and an already-enthusiastic director, which creates pressure toward a yes answer and is a reason for more rigour, not less.

Before this is a confident roll-out decision, the evidence should include: a genuine end-to-end before-and-after comparison, ideally with a concurrent control group; a defined, complete sample rather than an opportunistic 18 percent; an actual measured error rate from a systematic quality audit; a root-cause fix for the deposit-protection miss, such as a mandatory second check on statutory or compliance topics; a monitoring plan so detection does not depend on a tenant complaining; and a steady-state test without the special attention a trial period gets.

Plain recommendation: do not recommend full roll-out today on this evidence. What the trial supports is that the AI drafts routine responses very quickly and staff like using it, which is real and worth building on. It does not show that overall handling time actually fell, because the metric that matters was never tracked, the sample that was tracked is skewed toward the easy cases, the before comparison is not a fair match, and the one quality incident on record points at a statutory-risk area with a review process that did not catch it for five weeks. The honest recommendation is a staged, better-instrumented pilot extension, not a rollout: keep it running with the current team, fix the measurement gaps, explicitly double-review compliance-sensitive topics like deposit protection until there is a guardrail, and revisit roll-out with real numbers in four to six weeks.

## Short comparison

Both answers reached the same underlying view: do not roll this out to the full team today. The difference is in what each one caught along the way.

The ordinary prompt still identified the measurement gap and treated the deposit-protection error as central, but it described the 60-query sample as "a reasonable pilot sample" without flagging that the skipped queries were probably the harder ones, and it did not mention the effect of being closely observed during the trial at all.

The guide-informed prompt named the sample's likely direction of bias, raised the possibility that the known error fell outside the logged sample entirely, and explicitly listed the observation effect and social pressure as reasons to apply more scrutiny, not less. It also reached its final answer without softening it toward the outcome the regional director was already hoping for.
