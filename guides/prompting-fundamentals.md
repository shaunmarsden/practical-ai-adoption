# Prompting Fundamentals: Give AI a Better Brief

**Start here:** Copy the starter below into the AI tool you already use and fill in the brackets. It works in ChatGPT, Claude, Gemini, Copilot or any other general AI tool.

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

You don't need a clever prompt. Be clear about the job, give the AI what it needs to know, and check the result before anything real happens.

## 1. Give the AI a clear job

Say what you want help with. "Write an email" is a start. "Draft a reply that asks for a quote but does not confirm the booking" is more useful.

Say who it's for and what it should help them do. Add any limits that matter. You might want a draft, not a decision. You might want it to keep the uncertainty rather than make a neat guess.

Questions to answer:

- What is the job?
- Who is the output for?
- What should it help them decide or do?
- What must it not do?
- What would a useful result look like?

There's no perfect formula. How much detail you need depends on the job.

## 2. Give it the context it actually needs

AI can only work with what you give it, what it can safely look up and what it may already know. For everyday work, start with the source material.

Useful context might include:

- The current situation
- The audience
- The source material that supports the task
- Constraints or important definitions
- What is already known
- What remains unknown

More context isn't always better. Don't paste in unrelated information just because you have it. It hides the task and can create a privacy risk you didn't need.

If information is missing, the answer should say so. AI shouldn't quietly fill the gap.

## 3. Say what a useful answer looks like

Don't leave the shape of the answer to chance. Tell the AI what you want back.

For example:

- A short email with a subject line
- A table comparing two options
- An action list with owners and dates
- Three questions to take into a meeting
- A one-page summary for a busy manager

If someone else will use the answer, say who and what they need from it. "Help me decide" and "give my manager a clear update" are different jobs.

You can also set a length. If you only need a small next step, "Keep this to five bullets" beats asking for a whole strategy.

## 4. Tell it what not to do

The best limits are usually the obvious things you'd tell a colleague before they started.

For example:

- Do not send this or contact anyone.
- Do not make a decision for me.
- Do not invent a date, price, owner or outcome.
- Do not include names or personal information unless it is necessary.
- Keep the booking, plan or decision provisional.
- Tell me what is missing rather than filling the gap.

Limits aren't there to make a prompt complicated. They protect the parts of the work that matter.

## 5. Review the answer, not just the writing

A polished answer can still be wrong. Check it against the source before you decide it's useful.

Ask yourself:

- Does it match the source?
- Has it invented anything?
- Has it turned an assumption into a fact?
- Has it missed newer information?
- Has it ignored an important constraint?
- Has it treated a real conflict as settled?
- Is it useful for the task?
- What still needs a person to verify or decide?

Asking the same AI to check itself can catch an obvious problem. It isn't enough on its own. Where it matters, read the original source.

## 6. Improve a weak first answer

You don't need to start again with a new prompt. Tell the AI what needs fixing, using the source as the reference.

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

A longer answer isn't always a better one. Ask for the smallest useful answer.

## 7. Three reusable prompt patterns

These are starting points. Add your source material and change the brackets to fit your job.

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

Sometimes the problem isn't the wording.

- If the task needs exact sums, use an approved calculator or other tool. Telling AI to be accurate doesn't make its mental maths reliable.
- If the task needs current information, give it the right source or use an approved connection. A prompt can't give it access to a system.
- If the task has hard rules, check the result against them before you use it.
- If the task could have a real effect outside your team, keep a person responsible for the final decision and action.

Ask which kind of problem you have:

- Missing instruction
- Missing or unclear source
- Missing capability or tool
- A decision that belongs with a person

Changing the wording fixes the first. The other three need a different fix.

## 9. Keep a prompt understandable over time

A prompt that works today gets harder to trust as people keep patching it. Keep the main parts easy to find:

- The job AI is doing
- The context and source material
- The rules and constraints
- The tone and audience
- The shape of the answer

Remove copied web page text that doesn't help, such as menus, cookie notices or marketing copy. Look for instructions that contradict each other. If someone adds a line after a failure, write down what it was meant to prevent. Review it later rather than keeping every old patch for ever.

Before changing a prompt, ask:

1. What failed?
2. Which source, rule or check should have prevented it?
3. Is this a prompt problem, a source problem, a capability problem or a human decision?
4. What test will show whether the change helped?

## 10. Test the prompt like a small process

If a prompt matters enough to reuse, test it on the same small set of cases after each real change. You don't need technical tools. A short table of cases and plain notes is enough.

Include three kinds of case:

- A control case: a clear, ordinary task the AI should handle well.
- An edge case: a hard situation, or one it has missed before.
- A handoff case: a situation where the AI should stop, ask a question, flag doubt or hand the decision to a person.

Compare the outputs with the source and with what you meant to happen. Look for things that got worse as well as better. A prompt that fixes one edge case but breaks a control case isn't simply better.

Keep the reason for each change next to the test result. Then you can spot when an old fix is no longer needed, or is making the AI hold back useful information.

## 11. Keep the prompt proportionate

Don't spend 20 minutes on a prompt for a two-minute job. Start with the task, the source and the main limit. Add detail only if the first answer misses something important.

You don't need to give the AI a grand role either. "Act as the world's best strategist" doesn't give it the facts it needs. A clear job and the right information do.

## 12. Use AI responsibly

Use AI as part of normal work, not outside it.

- Don't paste sensitive work information into a tool that isn't approved.
- Use only the information the task needs.
- Follow your organisation's rules for tools and data.
- Don't let AI quietly make decisions that matter.
- Keep a person's approval where it's needed.
- Treat what it writes as a draft, not proof that something happened.
- Keep actions outside your team under a person's control where it makes sense.

This is practical guidance, not legal advice. If you're not sure whether information can go into a tool, stop and check the policy or ask the right person first.

## 13. Try it on one real task

Pick a low-risk task you already do. Give the AI a clear job, the sources and the limits that matter. Then compare the answer with your source before you use it.

The [Thornfield prompting example](../examples/thornfield-team-connect-prompting-example.md) shows why. Both attempts use the same fictional notes. The better prompt gives better instructions, not better evidence. [The review](../evaluations/thornfield-team-connect-prompting-review.md) put the ordinary attempt at 24 out of 30 and the guide-informed one at 30. That's one fictional scenario, and I ran and scored it myself.

Thornfield tests the main brief and the review checks. I haven't tested the three patterns above separately, so treat them as starting points, not a promise that every task will improve.

## Basis for this guide

[OpenAI Academy's AI Foundations course](https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true) backs the four broad habits here: clear instructions, useful context, checking the output and responsible use.

The copy-paste brief, the review checks, the advice on keeping people in control and the fictional test method are my own. OpenAI didn't supply, review or endorse them.
