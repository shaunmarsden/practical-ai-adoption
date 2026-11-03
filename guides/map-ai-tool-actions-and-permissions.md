# Map What an AI Tool Can Do Before Connecting It

**Start here:** Write down each action the proposed AI system can take, the system it touches and who is authorised to allow it. A tool's technical ability to make a change does not mean it has permission to do so.

This is a companion to [Before You Let AI Tools Work Together Unsupervised](before-you-let-ai-tools-work-together-unsupervised.md), adapted from the private Personal AI Knowledge Base's *Agentic AI Risk and Permission Checklist* and *AI Adoption Lifecycle: Decisions and Controls*. These are independently authored working references, not certified security or legal controls.

## Map each permission separately

| Action | Decision to record |
| --- | --- |
| **Read** | Which source, data categories, purpose, users and retention rules are permitted? |
| **Suggest** | What evidence supports the recommendation, and who makes the actual decision? |
| **Draft** | Who reviews and approves before the draft is used? |
| **Prepare a change** | Can the change be shown and checked before execution? |
| **Write or update** | Who can authorise the exact record or system change, and how will it be traced or reversed? |
| **Send, publish, pay or decide for someone** | Is this action genuinely necessary, separately authorised and controlled for its potential consequences? |

Use the least authority needed for the test. A read-only prototype does not establish that writing or sending is safe. Separate the permission to develop a tool from permission to process particular data, access a system or operate it.

## Challenge predictable failures

- External content may contain instructions aimed at the AI rather than facts for the task. How are untrusted inputs kept from authorising actions?
- What happens if two records look alike, sources disagree or a required source is missing?
- Could an action happen twice after a retry or tool failure?
- Can the system explain and record attempted versus completed changes?
- What happens if a connected system is offline, a reviewer rejects the result or an urgent error is discovered?
- Can access be revoked promptly and the previous workflow restored?

Test representative exceptions and hostile or misleading inputs in a **permitted, non-production environment**. Passing tests does not replace specialist review or production permission.

## Make human review meaningful

A reviewer should have access to the underlying evidence, understand the consequence, be able to edit or reject and have enough time and authority to intervene. A mandatory approval click without these conditions is not effective oversight.

Some actions are too consequential for this sort of general guide. Obtain relevant security, privacy, professional and legal advice before allowing them, and do not use this worksheet as a substitute for those decisions.

## Copyable action and permission record

```text
Work outcome and accountable owner:
Current workflow and simpler alternatives:
Proposed tool and named system:
Action (read / suggest / draft / prepare / write / send / decide):
Source data and approved purpose:
Scope, least privilege and prohibited actions:
Who grants each permission and how it is recorded:
What a reviewer sees and can approve, reject or escalate:
Known exceptional or malicious inputs and test result:
Action log, duplicate handling and failure recovery:
Stop, revoke, rollback and incident owners:
Security, privacy and other required approvals (actual status):
Pilot boundary and review date:
Outstanding uncertainty and next decision:
```

## Fictional illustration, not a security test

A fictional AI assistant prepares an address correction for review. The first design asks it to update a live customer record automatically. Mapping the actions separately shows that **reading the address**, **drafting a proposed correction** and **writing it to the customer system** require different permissions and checks. This does not establish that any design is secure or approved.

**Source and limitations:** Adapted from private working references dated 20th–21st October 2026. No real system, vulnerability test or formal security assessment was completed for this public guide.
