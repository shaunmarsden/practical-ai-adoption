# Pemberton Underwriters: AI Adoption Stall Example

This is a fictional company and a fictional rollout, used to test [Why AI Projects Stall After the Demo Works](../guides/why-ai-projects-stall-after-the-demo-works.md).

## The scenario

Pemberton Underwriters is a fictional UK insurance underwriting firm with around 150 staff. The Claims Operations team has 15 claims handlers. Three months ago, a 30-minute demo showed an AI tool drafting an initial claims-assessment summary from submitted documents, turning a task that normally took about 40 minutes into a reviewed draft in around 12 minutes. The demo was well received, and several handlers said afterwards they were keen to use it.

### What is known now

- Usage logs show only 2 of the 15 handlers use the tool regularly. The rest have used it once or twice, or not at all.
- IT confirms the tool is fully approved and there have been no data or security incidents.
- A handful of handlers who tried it once said the draft "wasn't quite right" on a specific claim and went back to writing manually. Asked the same question, the two regular users describe the accuracy as "about what I'd expect, I check it like anything else" and have not raised the same complaint.
- There was one 30-minute demo. No further training session has been run since.
- No one has been given responsibility for supporting the rollout since the demo. The person who ran the original demo moved to a different team seven weeks ago and was not replaced in that role.
- The claims-handling checklist and process documents were never updated to say when or how the AI draft should be used. Using it is entirely optional and left to individual habit.
- One handler asked their manager whether time saved using the AI counted toward their weekly case-closure target in the same way as ordinary casework, and did not get a clear answer. They said they now default to the familiar manual approach, especially when busy.
- No one has been tracking adoption or outcomes since the demo. The 2-of-15 figure came from a one-off check this week, not an ongoing measure.
- Management's working assumption has been that a good demo would be enough to drive adoption on its own.

## Ordinary prompt

We had a great demo of an AI tool for drafting claims summaries three months ago, but now almost nobody on the team uses it. A few people say the drafts aren't accurate enough. Should we look at getting a better AI tool?

### Ordinary prompt: what came back

No, switching tools now would be solving the wrong problem. Everything described points to an adoption and management failure, not a tool-capability failure. Before spending money or time evaluating alternatives, it is worth seeing whether this tool actually gets a fair run.

Look at what is actually missing, none of which has anything to do with the AI's output quality. There is no owner: the person who ran the demo left seven weeks ago and was never replaced in that role, so nobody is currently accountable for the rollout succeeding. There is no process integration: the checklist and case-handling documents were never updated to say when or how the tool should be used, so it is optional, which in practice means it is whatever each handler's habit already was, and habits do not change themselves. There is no incentive clarity: a handler asked directly whether AI-assisted time savings count toward their case-closure target and got no answer, and the rational response to that is to do the work the way that is guaranteed to count. There was one 30-minute demo three months ago and nothing since: no refresher, no Q&A, no guidance on handling a draft that is off, no peer coaching from the two people who have made it work. And there has been no measurement: the 2-of-15 number is a one-off spot check, not a tracked metric, so this has been running on autopilot.

The accuracy complaint does not hold up as a tool problem either. The detail that matters most is that the two regular users describe accuracy as "about what I'd expect, I check it like anything else." The people who tried it once and stopped hit one imperfect draft and went back to manual entirely. That is not a pattern of the tool being unreliable, it is a pattern of people not yet trusting or knowing how to work with an assistive draft, meaning skim, correct, move on, versus treating one imperfect output as proof it does not work. A new tool would hit the same wall for the same reasons.

Before evaluating alternatives: name an owner for the rollout, ideally one of the two people already using it well. Get management to answer the target question explicitly, in writing: does AI-assisted time count the same as manual casework toward closure targets. Update the checklist and process documents to state when and how the draft should be used. Run a short second session, ideally led by one of the regular users, focused specifically on what to do when the draft is not quite right, since that is the exact failure mode people hit and abandoned on. Start actually tracking usage and a few outcome measures monthly, so it is possible to tell in three months whether the changes worked.

If all of that is done and adoption still stalls, or the accuracy complaints persist under real usage with real support behind it, that is the point where evaluating a different tool becomes a reasonable next step, with much better evidence for what is actually needed. Right now there is no evidence the current tool is inadequate, only evidence it was never properly rolled out.

## Guide-informed prompt

I want to understand why adoption of this AI tool stalled after a successful demo, not just accept the first explanation offered.

Assess this based on:

- what the evidence actually shows about the tool's output quality, versus what a few people assumed or reported;
- whether the people still using it regularly report the same problem as the people who stopped;
- what happened, or did not happen, to support adoption after the demo, such as training, a named owner, or updates to the normal process;
- whether people have a clear, consistent understanding of how using the tool affects how their work or performance is judged;
- whether anyone is actually tracking adoption or outcomes, or whether this is the first time anyone has looked;
- what a demo can and cannot tell you about whether something will actually get used afterwards.

Give me your best explanation for why adoption stalled, and be explicit about which parts of that explanation the evidence actually supports, and which parts would need more checking.

Do not assume the AI's output quality is the problem just because a few people said so. Do not recommend a new tool without first ruling out the alternative explanations.

### Guide-informed prompt: what came back

Two of 15 handlers use the tool regularly and describe its accuracy the same way anyone would describe a normal tool: about what they would expect, checked like anything else. That is a description of normal review behaviour, not a complaint. A handful of the people who stopped after one try cited a bad draft on one specific claim.

That is not two groups with different experiences of quality. It is a near-universal early experience, the tool gets some claims wrong the first time, met with two different responses to it. The regular users treated a bad draft as a normal thing to check and correct, the same way they would treat a colleague's draft or their own first pass. The people who quit treated one bad draft as proof the tool was not quite right and reverted. If the tool were actually unreliable in a way that mattered, the two heavy users, who have fed it far more claims by volume, would be expected to have hit and reported the same problem. They have not. So the output-quality explanation, as the cause of stalled adoption, is weakly supported at best. What the evidence actually shows is a difference in how a single bad output got interpreted, not a difference in how good the tool is.

Worth flagging as a real gap, though: nobody has actually measured accuracy. "About what I'd expect" and "wasn't quite right" are both anecdote, not data. The evidence does not support quality as the cause, but it also cannot be fully ruled out without more information, since it would help to look at the specific claim or claims that went wrong to see whether it was a genuine model failure on a case type that recurs, or an unfamiliar interface being misread as an error by someone who had used it once.

Everything else in the situation points the same direction. There is no named owner: the person who ran the demo left seven weeks ago and was not replaced in that function, so there is currently no one whose job it is to answer questions, troubleshoot a bad draft, or chase usage. There is no training beyond the demo: a 30-minute demo shows what is possible, it does not teach someone how to handle the tool producing something wrong, which, per the two regular users, happens and needs a check-it-like-anything-else workflow that the people who quit were never shown. There is no process integration: the claims checklist still does not say when or how to use the draft, so using it is entirely optional and left to individual habit, which under time pressure defaults to the familiar path. There is an unresolved incentive question: a handler asked whether time saved counted toward the case-closure target and got no clear answer, then explicitly said they now default to manual work, especially when busy, which is a direct, stated causal link rather than an inference. And nobody was watching: the 2-of-15 figure is the first time anyone has checked since the demo, meaning three months of decline went unmonitored.

Best explanation: adoption stalled because the organisation ran a demo and then did nothing else. It did not assign an owner, did not train people on how to work with an imperfect draft, did not put the tool into the standard process, and did not resolve whether using it helps or hurts someone's numbers. Into that vacuum, a single rough output was enough to send several handlers back to the safe, familiar, unambiguously credited manual method, while the two people who kept going did so through their own initiative, not because of anything management provided. A demo shows that a tool can work. It shows nothing about whether people will keep using it once the novelty, the presenter and the room's social pressure are gone.

What is solid: the regular users do not report the same accuracy complaint as the quitters, which undercuts tool quality as the primary driver. No owner, no follow-up training, no process update and no usage tracking since the demo are all stated as fact. The performance-measurement ambiguity is a stated, direct cause for at least one handler's reversion. And since this is the first-ever look at adoption, "usage crashed" really means "usage was never checked until now," so the actual shape of the decline, gradual or immediate, is not known.

What needs more checking: what specifically went wrong on the claim or claims that were called inaccurate, ideally by talking to those handlers about the actual case rather than just the verdict. Whether the two regular users differ from the quitters in some other way, such as tenure or comfort with new tools, given this is two people against thirteen, too small a group to generalise from confidently. Whether the closure-target ambiguity is the whole incentive story, or whether there is also something subtler, such as a flawed AI draft feeling like a personal accountability risk. And the actual usage trend over the three months, since a front-loaded drop-off and a slow fade would point to different fixes.

A new tool is not recommended at this point. Nothing here rules out the current tool being perfectly adequate. The next right move is closing the specific gaps: an owner, a brief refresher covering what to do when the draft is off, a process line stating when to use it, a clear management answer on how AI-assisted time counts toward targets, then re-measuring adoption in a month with something more granular than a one-off headcount.

## Short comparison

Both answers reached the same underlying diagnosis: this is an adoption failure, not a tool failure, and a replacement is not the right next step. Both correctly noticed that the regular users do not report the accuracy problem the quitters do, and both named the same organisational gaps: missing owner, no process integration, no training reinforcement, and the unresolved incentive question.

The difference is in how each one held its own uncertainty. The ordinary prompt moved decisively from diagnosis to a five-point action plan, and only mentioned reconsidering the tool as a distant fallback if the fixes did not work. The guide-informed prompt kept a visible line between what the evidence already supports and what still needs checking: the small two-against-thirteen sample, the possibility that the specific failed claim reveals a real recurring weakness, other unstated reasons someone might avoid a visibly AI-assisted file, and whether the decline was sudden or gradual. Both are useful. The guide-informed answer is the more honest one to act on first, since it does not let a strong recommendation quietly imply more certainty than the evidence actually supports.
