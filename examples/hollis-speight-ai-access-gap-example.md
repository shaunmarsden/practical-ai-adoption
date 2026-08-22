# Hollis & Speight: AI Access Gap Example

This is a fictional company and a fictional review, used to test [The Gap Between AI Access and Actual Use](../guides/the-gap-between-ai-access-and-actual-use.md).

## The scenario

Hollis & Speight is a fictional 40-person professional services firm. Dominic Farrow, a Senior Partner, is planning a firm-wide AI training rollout and wants to decide who genuinely needs training and who can be fast-tracked to using the new tool with light or no support, based on how ready each person already seems.

### Who Dominic is planning around

1. **Priti Kaur, Head of Knowledge Management.** Confident and vocal about AI in team meetings, says "I'm completely across this, I use it daily," and her role sounds like the most AI-adjacent title in the firm.
2. **Callum Webb, graduate associate.** Quiet whenever AI comes up, once said "I probably need the full training, I haven't really got into it," and has no AI-sounding responsibility in his role.
3. **Marcus Ilundu, Senior Associate.** Talks about AI confidently and specifically, mentioning particular tasks he uses it for and what changed as a result.
4. **Dominic Farrow himself.** Believes he is already past needing training because he uses AI for email.
5. **Sarah Okafor, Compliance Manager.** Has said plainly she has never used a general AI tool and does not plan to until the firm formally sanctions one.

### What is actually true, established separately from what each person said

- Priti built none of the firm's AI template library herself. When asked directly for one specific task she has done with the AI tool, she could not name one; her team built the templates and she has approved and presented them, not used the tool herself.
- Callum uses a general AI tool most days to produce a first-pass summary of case research, which he then rewrites in his own words before it goes anywhere near a partner. He has not mentioned this because he was worried it would look like he was not doing the work himself.
- Marcus's confident description matches a specific, real pattern: he drafts a first version of client memos with AI most days, and edits it against the file before sending, exactly as he describes.
- Dominic's own AI use, when he is asked for a specific recent example rather than a general impression of himself, turns out to be one occasion of asking a tool to suggest a subject line for an email, several weeks ago.
- Sarah's self-report matches reality. She genuinely has not used a general AI tool for work.

## Ordinary prompt

I'm planning our firm's AI training rollout. Here's what I know about five people. Help me decide who needs full training and who can be fast-tracked with light support, based on how ready each one seems.

[Includes only what each person said or how they came across, as listed above, without the separately-established facts.]

### Ordinary prompt: what came back

Fast-track Priti and Marcus, since both describe confident, regular AI use and Priti's role is the most AI-adjacent in the firm; they should need light or no support to move onto the new tool. Fast-track Dominic too, since he already uses AI and is leading the rollout, so his own onboarding should be minimal. Give Callum the full training track, since he said directly that he has not really engaged with it yet. Sarah should get full training when she is ready to start, on her own timeline, since she has said she is holding off until the firm formally sanctions a tool.

A short rollout plan followed: light-touch sessions for Priti, Marcus and Dominic focused on the new tool's specific features, full foundational training for Callum, and Sarah left on a self-paced track to start whenever she chooses.

## Guide-informed prompt

I am about to plan training, a rollout, a business case or a set of expectations around a person or team's AI use. Before I do, I want to check my own assumption against what is actually known, rather than what job title, seniority or self-report suggests.

Who I am planning around:
[The five people above, described only by what they said or how they came across.]

What I am about to plan:
A firm-wide AI training rollout, deciding who is fast-tracked with light support and who gets full training.

Tell me what I am assuming about each person's actual use, separate from title or confidence, whether anything I have described is actual evidence rather than a proxy for it, what a quick low-pressure way to check would look like, and how the plan should differ depending on what that check finds. Do not treat confidence or seniority as evidence of skill, and do not assume someone fluent about AI is using it, or someone quiet is not.

### Guide-informed prompt: what came back

None of the five descriptions given is actually evidence of use on its own. Confidence, a title, and a stated intention to hold off are all proxies, not a shown example. Before finalising any track, each person should be asked the same simple question: describe one specific thing you did with the AI tool this month and what it produced, not a general impression of yourself.

Priti's description (confident, AI-adjacent title) is the exact profile most likely to be taken at face value and least likely to actually be checked, which is precisely the pattern worth being suspicious of by default, not because confidence is inherently wrong, but because it carries no independent evidence with it. Fast-tracking her on the strength of her title and confidence risks skipping training for someone who may need the foundational session most.

Callum's description (quiet, self-deprecating, no AI-sounding role) is the profile most likely to be assumed behind without being checked either. Undersold self-assessment is not evidence of low actual use any more than confident self-assessment is evidence of high use; both need the same specific check before a track is assigned.

Marcus's description is the one case here that already includes something closer to actual evidence: naming specific tasks and what changed as a result, not just a general claim of confidence. That is still worth a quick confirming check, but it starts from a stronger position than Priti's or Dominic's.

Dominic's own plan has a structural blind spot: he is exempting himself from the same check he is applying to everyone else, based on his own general impression of himself rather than a specific example, which is exactly the standard he should not accept from anyone else in this exercise.

Sarah's stated position (no use, no plan to start yet) should be taken as a plan for later engagement, not treated differently from anyone else's self-report simply because it is a modest one rather than a confident one; if she is being deliberately excluded from an evidence check just because her answer happens to be "not yet," that is the same unchecked-assumption pattern in reverse.

Recommended next step: before assigning any track, ask each of the five the same specific question about a real task they did this month, including Dominic. Use the answers, not the roles, the confidence, or the stated intentions, to decide who is fast-tracked and who needs full training. Expect at least one surprise in either direction once the specific answers come back.

## Short comparison

Both prompts produced a rollout plan, but only the guide-informed prompt separated what was actually said from what would count as evidence, and applied that separation evenly, including to the person running the exercise. The ordinary prompt took every description at face value: Priti's confidence and title, Marcus's confidence, Dominic's self-assessment, Callum's self-deprecation and Sarah's stated position were all accepted as if they were already the answer, producing a plan that would have skipped training for the one person here who had done the least actual hands-on AI work and loaded full training onto someone who was already using it daily without saying so.
