# Prompting Fundamentals: Give AI a Better Brief

**Start here:** Copy the starter below, paste it into the AI tool you already use, and replace the bracketed sections. It works in ChatGPT, Claude, Gemini, Copilot or another general AI tool.

```text
Task:
[What do you need help with?]

Context:
[What does the AI need to know?]

Use these sources:
[Paste or attach the relevant information.]

Important constraints:
[What must it preserve, avoid or not assume?]

Output:
[What should the answer look like and who is it for?]

Before you finish:
- Separate confirmed information from assumptions.
- Point out important missing or conflicting information.
- Do not invent facts to fill gaps.
- Tell me what I still need to check or approve.
```

You do not need a clever prompt. You need to be clear about the work, give the AI the information it needs and check the result before anything real happens.

## 1. Give the AI a clear job

Say what you want help with. "Write an email" is a start. "Draft a reply that asks for a quote but does not confirm the booking" is more useful.

Tell it who the output is for and what the output should help someone do. Add any important boundary. For example, you may need a draft, not a final decision. You may need it to preserve uncertainty instead of making a neat guess.

Questions worth answering:

- What is the job?
- Who is the output for?
- What should it help them decide or do?
- What must it not do?
- What would a useful result look like?

There is no perfect prompt formula. The useful level of detail depends on the job.

## 2. Give it the context it actually needs

AI can only work with the information you give it, the information it can safely look up or what it may already know. For everyday work, start with the relevant source material.

Useful context might include:

- The current situation
- The audience
- The source material that supports the task
- Constraints or important definitions
- What is already known
- What remains unknown

More context is not automatically better context. Do not paste unrelated information into a chat just because you have it. It makes the task harder to see and can create an unnecessary privacy risk.

If the information is missing, the answer should say so. AI should not quietly fill the gap.

## 3. Review the answer, not just the writing

A polished answer can still be wrong. Check whether it is supported by the source before you decide it is useful.

Ask yourself:

- Does it match the source?
- Has it invented anything?
- Has it turned an assumption into a fact?
- Has it missed newer information?
- Has it ignored an important constraint?
- Has it treated a genuine conflict as settled?
- Is it actually useful for the task?
- What still needs a person to verify or decide?

Asking the same AI to double-check itself can help spot an obvious problem. It is not enough validation on its own. Read the original source where it matters.

## 4. Use AI responsibly

Use AI as part of normal work, not outside it.

- Do not paste sensitive work information into an unapproved tool.
- Use the minimum information genuinely needed for the task.
- Follow your organisation's rules for tools and data.
- Do not let AI quietly make consequential decisions.
- Keep suitable human approval points.
- Treat generated content as a draft, not evidence that something happened.
- Keep external actions under human control where appropriate.

This is practical guidance, not legal advice. If you are unsure whether information can go into a tool, stop and check the relevant policy or person first.

## Try it on one real task

Pick a low-risk task you already do. Give the AI a clear job, the relevant sources and the constraints that matter. Then compare the answer with your source before using it.

The [Thornfield prompting example](../examples/thornfield-team-connect-prompting-example.md) shows why this matters. Both attempts use the same fictional notes. The improved prompt gives better instructions, not better evidence.

## Basis for this guide

**Source-derived foundation:** The four broad habits of clear instructions, useful context, reviewing outputs and responsible use are confirmed by [OpenAI Academy's AI Foundations course](https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true).

**Project guidance:** The copy-paste brief, review checks, human-control guidance and fictional test method are Shaun's independent practical interpretation. They are not supplied, reviewed or endorsed by OpenAI.
