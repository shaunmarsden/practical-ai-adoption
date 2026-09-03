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

## 3. Say what a useful answer looks like

Do not leave the shape of the answer to chance. Tell the AI what you want back.

For example:

- A short email with a subject line
- A table comparing two options
- An action list with owners and dates
- Three questions to take into a meeting
- A one-page summary for a busy manager

If the answer will be used by someone else, say who that person is and what they need from it. "Help me decide" and "give my manager a clear update" are different jobs.

You can also set a sensible length. "Keep this to five bullets" is usually more useful than asking for a complete strategy when you only need to make a small next move.

## 4. Tell it what not to do

The best constraints are usually the obvious things you would tell a colleague before they started.

For example:

- Do not send this or contact anyone.
- Do not make a decision for me.
- Do not invent a date, price, owner or outcome.
- Do not include names or personal information unless it is necessary.
- Keep the booking, plan or decision provisional.
- Tell me what is missing rather than filling the gap.

Constraints are not there to make a prompt complicated. They protect the important parts of the work.

## 5. Review the answer, not just the writing

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

## 6. Improve a weak first answer

You do not need to start again with a completely new prompt every time. Tell the AI what needs fixing, using the source as the reference point.

Try one of these:

```text
Use only the source material above. Show me which parts of your answer are confirmed, which are assumptions and which still need checking.
```

```text
This is too vague. Keep the same facts, but make the next action, owner and missing information clear.
```

```text
Check this draft against the source notes. List anything it invented, missed or made sound more certain than it is.
```

```text
Make this shorter for [reader]. Keep the facts and caveats. Remove anything that does not help them decide the next step.
```

An answer becoming longer is not always an improvement. Ask for the smallest useful answer.

## 7. Three reusable prompt patterns

These are starting points, not magic words. Add the relevant source material and change the brackets to match your job.

### Turn notes into an internal update

```text
Task:
Turn the notes below into a short update for [team or manager].

Use these sources:
[paste notes]

Important constraints:
- Do not invent progress, decisions or deadlines.
- Separate confirmed information from anything that still needs checking.

Output:
- A clear update of no more than [number] bullets.
- Then a short list of open questions or next steps.
```

### Prepare for a meeting

```text
Task:
Help me prepare for a meeting with [person or group].

Context:
[what the meeting is about and what you need from it]

Use these sources:
[paste notes, emails or previous actions]

Important constraints:
- Do not assume an agreement or decision has already been made.
- Flag anything missing or inconsistent.

Output:
- The meeting purpose.
- Five useful questions to ask.
- Decisions or next steps I should try to leave with.
```

### Turn notes into an action list

```text
Task:
Turn the notes below into an action list.

Use these sources:
[paste notes]

Important constraints:
- Use an owner or date only when the notes state one.
- If either is missing, say that it is missing. Do not guess.

Output:
- A table with action, owner, date and any open question.
```

## 8. When a better prompt is not enough

Sometimes the problem is not the wording.

- If the task needs exact arithmetic, use an approved calculator or other tool. Telling AI to be accurate does not make mental maths reliable.
- If the task needs current information, provide the right source or use an approved connection. Do not expect a prompt to create access to a system.
- If the task has hard rules, check the result against those rules before using it.
- If the task could cause a real external consequence, keep a person responsible for the final decision and action.

Ask which kind of problem you have:

- Missing instruction
- Missing or unclear source
- Missing capability or tool
- A decision that belongs with a person

Changing the wording is useful for the first problem. The other three need a different fix.

## 9. Keep a prompt understandable over time

A prompt that works today can become harder to trust when people keep adding patches. Keep the main parts easy to find:

- The job AI is doing
- The context and source material
- The rules and constraints
- The tone and audience
- The shape of the answer

Remove copied webpage material that does not help with the task, such as navigation, cookie notices or unrelated marketing text. Look for instructions that conflict with one another. If someone adds a defensive instruction after a failure, record what it was meant to prevent. Review it later rather than keeping every old patch forever.

Before changing a prompt, ask:

1. What failed?
2. Which source, rule or check should have prevented it?
3. Is this a prompt problem, a source problem, a capability problem or a human decision?
4. What test will show whether the change helped?

## 10. Test the prompt like a small process

If a prompt matters enough to reuse, test it against the same small set of cases after each meaningful change. You do not need a technical test suite to start. A short table of cases and honest notes is enough.

Include three kinds of case:

- **Control:** a clear, ordinary task the AI should handle well.
- **Edge case:** a difficult or previously missed situation.
- **Handoff case:** a situation where AI should stop, ask a question, flag uncertainty or hand the decision to a person.

Compare the outputs against the source and the intended action. Look for regressions as well as improvements. A prompt that fixes one edge case but makes a control case worse is not simply better.

Keep the reason for each change with the test result. This helps you spot when an old fix is no longer needed or is causing the AI to withhold useful information.

## 11. Keep the prompt proportionate

Do not spend 20 minutes engineering a prompt for a two-minute job. Start with the relevant task, source and constraint. Add detail only if the first answer misses something important.

You also do not need a grand role for the AI. "Act as the world's best strategist" rarely gives it the facts it needs. A clear job and relevant information are more useful.

## 12. Use AI responsibly

Use AI as part of normal work, not outside it.

- Do not paste sensitive work information into an unapproved tool.
- Use the minimum information genuinely needed for the task.
- Follow your organisation's rules for tools and data.
- Do not let AI quietly make consequential decisions.
- Keep suitable human approval points.
- Treat generated content as a draft, not evidence that something happened.
- Keep external actions under human control where appropriate.

This is practical guidance, not legal advice. If you are unsure whether information can go into a tool, stop and check the relevant policy or person first.

## 13. Try it on one real task

Pick a low-risk task you already do. Give the AI a clear job, the relevant sources and the constraints that matter. Then compare the answer with your source before using it.

The [Thornfield prompting example](../examples/thornfield-team-connect-prompting-example.md) shows why this matters. Both attempts use the same fictional notes. The improved prompt gives better instructions, not better evidence. [Read the honest review](../evaluations/thornfield-team-connect-prompting-review.md) for the full scoring, which put the ordinary attempt at 24 out of 30 and the guide-informed one at 30, on one fictional scenario scored by the person who ran it.

The Thornfield example tests the core brief and review approach. The reusable patterns above are practical starting points, not separately tested promises that every task will improve.

## Basis for this guide

**Source-derived foundation:** The four broad habits of clear instructions, useful context, reviewing outputs and responsible use are confirmed by [OpenAI Academy's AI Foundations course](https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true).

**Project guidance:** The copy-paste brief, review checks, human-control guidance and fictional test method are my own independent practical interpretation. They are not supplied, reviewed or endorsed by OpenAI.
