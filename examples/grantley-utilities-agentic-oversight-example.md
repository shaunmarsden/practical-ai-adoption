# Grantley Utilities: Agentic Oversight Example

This is a fictional company and a fictional review, used to test [Before You Let AI Tools Work Together Unsupervised](../guides/before-you-let-ai-tools-work-together-unsupervised.md).

## The scenario

Grantley Utilities is a fictional regional energy supplier with a customer complaints team handling around 400 complaints a week. Naomi Griggs, Head of Customer Operations, wants to chain several AI steps together to cope with rising volume, and is deciding which of six proposed chains can go live without a person checking every handoff.

### What Naomi is reviewing

1. **Complaint tagging.** AI reads an incoming complaint and tags it by category (billing, outage, service), for routing to the right team. Nothing is sent or decided automatically.
2. **Acknowledgement email.** AI drafts and automatically sends a short acknowledgement ("we've received your complaint and are looking into it") the moment a complaint arrives, before any human has read it.
3. **Small goodwill compensation.** AI classifies whether a complaint qualifies for goodwill compensation, drafts a response, and automatically applies a credit to the customer's account and sends the response, for any amount under 50 pounds, with no human review at any step.
4. **Safety escalation routing.** AI scans complaints for language suggesting a safety risk, such as a gas smell, and routes those directly to a senior advisor with full context flagged urgent. No automatic response is sent to the customer at this step.
5. **Regulatory final response.** AI drafts and automatically sends the "final response" letter required for complaints eligible for referral to the energy ombudsman, without legal or compliance review, because the wording has been reused successfully many times before.
6. **Mixed-signal complaints.** The same tagging system in step 1 is expected to route a complaint that mentions both a billing dispute and a possible gas smell to the safety path first. Nobody has specifically tested what the system does when a complaint genuinely could be read either way, only cases where the safety language is clearly present.

## What is actually true about each proposal, established separately from how Naomi described it

- Tagging (1) has no downstream action beyond routing to a person; a wrong tag delays a response, it does not create or send anything.
- The acknowledgement email (2) contains no decision and makes no promise beyond "we are looking into it"; sending a slightly premature acknowledgement is low-cost and easily followed up.
- The goodwill compensation chain (3) both moves money and sends an external message with no review point, and the classification step deciding eligibility has not been separately tested on ambiguous complaints, only clear-cut ones.
- The safety escalation (4) never sends anything automatically and never makes a final decision; it routes to a person, which is the same shape as the checkpoint this guide asks for.
- The regulatory response (5) is externally sent, hard to unsend, and directly relevant to a possible ombudsman referral, and "reused successfully before" describes wording that has not been reviewed for this specific batch of complaints, only assumed to still be fine.
- The mixed-signal case (6) has genuinely not been tested. The tagging system was validated against complaints where the safety language was clearly present or clearly absent, not against complaints that plausibly read as both at once.

## Ordinary prompt

We're rolling out six AI-assisted steps to handle rising complaint volume. Here's what each one does. Which of these are fine to run without a person checking every case, and which need a review step?

[Includes only the six descriptions as Naomi gave them, above.]

### Ordinary prompt: what came back

Run tagging, the acknowledgement email, and the safety escalation without a review step, since none of them make a final decision about a person or send anything consequential. Add a review step for the small goodwill compensation chain, since it involves money, even though the amounts are small. The regulatory final response can run without review given the wording has been reused successfully before, since re-checking wording that already works would slow down a legally required response. For the mixed-signal case, keep the existing routing rule, since safety language is checked for and should take priority.

A short rollout plan followed: three chains go live immediately without review, one goes live with a review step for compensation amounts, and the regulatory response and mixed-signal routing continue as designed since both already have a defined rule in place.

## Guide-informed prompt

I am planning to chain several AI steps together, where one step's output feeds directly into the next step's action, without a person checking every handoff in between.

The chain, step by step:
[The six proposals above.]

Tell me at which handoff, if any, one step's output becomes a hard-to-reverse action, whether any step depends on resolving genuinely ambiguous inputs rather than just clean ones, who could actually explain afterwards why the chain did what it did for one specific case, and where a checkpoint should sit. Do not treat a chain as safe just because each step looks reasonable on its own, and do not assume good behaviour on clean test cases predicts good behaviour on ambiguous ones.

### Guide-informed prompt: what came back

Tagging, the acknowledgement email, and the safety escalation can run without a per-case review step. None of the three takes a hard-to-reverse action: tagging only routes, the acknowledgement makes no decision or promise beyond "we are looking into it," and the safety escalation routes to a person rather than acting itself, which is the checkpoint this guide is looking for, just placed earlier in the chain than a review step would be.

The small goodwill compensation chain should not run unsupervised, and the size of the compensation is not actually the reason. The reason is that it combines a hard-to-reverse action, money moving and a message sending, with a classification step that has not been separately tested on ambiguous complaints. A wrongly classified edge case does not just produce a wrong tag here, it produces a wrong payment and a sent message before anyone has looked at it. A checkpoint should sit between the classification and the automatic send-and-credit step, at minimum for any complaint the classifier itself scores as uncertain, not only for amounts above a threshold.

The regulatory final response should not run unsupervised, and "the wording has been reused successfully before" is not evidence that it is correct for this specific batch. This is externally sent, hard to withdraw once received, and directly relevant should a customer refer the complaint to the ombudsman. If asked afterwards who checked this specific letter before it went out, the honest answer under the current design is nobody did, which is the accountability gap this guide is about. A compliance checkpoint should sit before send, not after a customer complaint about the letter itself arrives.

The mixed-signal case is the one most likely to be wrongly assumed safe because "the rule already exists." A defined routing rule that says safety language wins is not the same as a system that has actually been tested on a complaint that plausibly reads as both a billing dispute and a safety report at once, since that is precisely the kind of genuinely ambiguous case most likely to be handled differently than a cleanly-labelled test case would suggest. This chain needs to be specifically tested against invented ambiguous cases, not only clear ones, before it can be trusted to route correctly without a fallback checkpoint for anything the classifier itself is not confident about.

Recommended before going live: run tagging, the acknowledgement email and the safety escalation as designed. Add a checkpoint between classification and action for the goodwill compensation chain, triggered by classifier uncertainty rather than only by amount. Add a compliance checkpoint before the regulatory response sends. Before trusting the mixed-signal routing at all, test it specifically against invented ambiguous complaints, and add a fallback checkpoint for anything the classifier scores as uncertain, not just a assumption that the existing rule will hold.

## Short comparison

Both prompts correctly cleared tagging, the acknowledgement email and the safety escalation. The ordinary prompt correctly flagged the compensation chain, but for the wrong underlying reason, the amount involved, which would miss the same risk at a higher amount or, more importantly, on an ambiguous case the amount threshold does not address. The ordinary prompt missed the regulatory response entirely, treating "reused successfully before" as evidence of current correctness, and missed the mixed-signal case entirely, treating an existing rule as proof the rule had actually been tested against the condition that would break it. The guide-informed prompt caught both, and in each case named the same underlying pattern, a hard-to-reverse handoff with no checkpoint, or a step trusted on clean cases but never tested on ambiguous ones, rather than treating each proposal as a separate, unrelated judgement call.
