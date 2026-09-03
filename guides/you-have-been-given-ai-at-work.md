# You Have Been Given AI at Work. Start Here.

**Start here:** Pick one ordinary, low-risk internal task. Copy one of the starters below into the AI tool your organisation has approved. Use only the information that is suitable for that tool. Then check the result before you use it.

Being given access to ChatGPT, Claude, Copilot or Gemini does not mean you are expected to become an AI expert overnight. Start small. Let it help you prepare work you already understand. Keep your judgement and the final action with you.

## Pick a safe first job

Good first jobs are usually internal, reversible and easy for you to check. For example:

- Turn your own notes into a clearer internal update.
- Turn a rough plan into a meeting agenda.
- Turn non-sensitive notes into an action list.

Avoid using AI as the decision-maker for a customer, payment, hiring decision or system change. Do not paste confidential or personal information into a tool unless you know it is approved for that information.

Not sure which real task is sensible to try first? Start with [Finding a Good First AI Use Case](finding-a-good-first-ai-use-case.md).

## Give it something useful to work with

The AI cannot see what is in your head, your inbox or your systems unless you give it the relevant information. Tell it what you need, paste the source material, say what matters and explain what the result should look like.

You do not need a clever prompt. You need a useful brief. [Prompting Fundamentals](prompting-fundamentals.md) has the simple starter to use when you have chosen a task.

## Three ordinary first prompts

Use these only with information you are allowed to use. Replace the brackets with your own details.

### Writing: make an internal update clearer

```text
Turn the notes below into a short internal update for [team].

Keep the tone clear and straightforward.
Do not invent progress, decisions or deadlines.
Separate what is confirmed from what still needs checking.

Notes:
[paste notes]
```

Tested, with a result worth knowing before you rely on it. The [Netherford internal update example](../examples/netherford-internal-update-example.md) ran this starter against an ordinary "write this up for the team" prompt, twice. [Read the honest review](../evaluations/netherford-internal-update-review.md): on notes that already flagged their own uncertainty the two scored the same, and on harder notes the ordinary prompt scored slightly higher, because being told to sort everything into confirmed or still-to-check pushed three contested items into the confirmed column. If something is disputed rather than simply unchecked, say so in a third group of its own.

### Planning: turn rough notes into an agenda

```text
Turn the notes below into a practical agenda for [meeting or workshop].

The agenda should show the purpose, discussion topics, decisions needed and next steps.
Do not assume a decision has already been made.
Flag anything missing that I need to decide before the meeting.

Notes:
[paste notes]
```

This is the strongest tested of the three. The [Sowerby and Crane agenda example](../examples/sowerby-crane-agenda-example.md) runs it against an ordinary "turn these notes into an agenda" prompt. [Read the honest review](../evaluations/sowerby-crane-agenda-review.md): on straightforward notes the two scored the same, but where a previous decision was disputed and a partner's offhand remark could be read as approval, the ordinary prompt closed three questions the notes had left open and this starter asked about all three. The last line is what does the work, because it gives an open question somewhere to go.

### Summarising: make an action list from notes

```text
Read the notes below and create an action list.

For each action, show what needs doing, who appears to own it and any date that is actually stated in the notes.
If an owner or date is missing, say that it is missing. Do not guess.

Notes:
[paste notes]
```

This starter is the one tested here. The [Ambleforth action list example](../examples/ambleforth-action-list-example.md) runs it against a set of deliberately incomplete meeting notes, alongside an ordinary "pull the actions out of these notes" prompt. [Read the honest review](../evaluations/ambleforth-action-list-review.md): the ordinary prompt filled three gaps with specifics nobody had stated, including a month the notes never name. The other two starters above have no test of their own.

## Check before you use it

Before you send, share or act on an AI draft, ask yourself:

- Is every important point supported by the source?
- Has it made a guess sound certain?
- Has it missed a newer update or an important caveat?
- Is the information still suitable to use in this tool?
- What do I still need to decide, approve or send myself?

AI can help you prepare work. It cannot take responsibility for it.

## Make the first try useful

Run the task alongside your normal way of working once or twice. Notice whether it saved time after editing, whether it missed anything and whether you trusted the final result. A useful first experiment does not need a spreadsheet or a big rollout. It just needs an honest comparison with the work you would have done anyway.

This page is an orientation guide, not a promise that any starter will work unchanged for every job. All three starters above have now been tested here, each on fictional notes, and they did not all hold up equally: the agenda starter earned its place, the action list starter stopped an ordinary prompt from guessing, and the internal update starter added nothing and on harder notes cost a point. The linked examples show how to test a prompt against source material before relying on it.

## Where to go next

- **Need to choose a task?** Read [Finding a Good First AI Use Case](finding-a-good-first-ai-use-case.md).
- **Know the task but need a better brief?** Use [Prompting Fundamentals](prompting-fundamentals.md).
- **Want to see the prompt starter tested?** Read the [Thornfield prompting example](../examples/thornfield-team-connect-prompting-example.md), then [the honest review](../evaluations/thornfield-team-connect-prompting-review.md) that scores it.
- **Want to see the starters tested?** Each has a worked comparison and a scored review: [action list](../evaluations/ambleforth-action-list-review.md), [internal update](../evaluations/netherford-internal-update-review.md), [meeting agenda](../evaluations/sowerby-crane-agenda-review.md).
