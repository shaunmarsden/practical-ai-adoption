# You Have Been Given AI at Work. Start Here.

**Start here:** Pick one ordinary, low-risk internal task. Copy one of the starters below into the AI tool your organisation has approved. Only give it information that's suitable for that tool. Check the result before you use it.

Having ChatGPT, Claude, Copilot or Gemini doesn't mean you have to become an AI expert overnight. Start small. Let it help you prepare work you already understand. Keep the judgement and the final action with you.

## Pick a safe first job

Good first jobs are internal, easy to undo and easy for you to check. For example:

- Turn your own notes into a clearer internal update.
- Turn a rough plan into a meeting agenda.
- Turn non-sensitive notes into an action list.

Don't let AI make the decision on a customer, a payment, a hire or a system change. Don't paste confidential or personal information into a tool unless you know it's approved for that.

Not sure which task to try first? Start with [Finding a Good First AI Use Case](finding-a-good-first-ai-use-case.md).

## Give it something useful to work with

The AI can't see your head, your inbox or your systems. Tell it what you need, paste in the source material, say what matters and say what the result should look like.

You don't need a clever prompt. You need a useful brief. [Prompting Fundamentals](prompting-fundamentals.md) has a simple starter for when you've chosen a task.

## Three ordinary first prompts

Only use these with information you're allowed to use. Replace the brackets with your own details.

### Writing: make an internal update clearer

```text
Turn the notes below into a short internal update for [team].

Keep the tone clear and straightforward.
Do not invent progress, decisions or deadlines.
Sort each point into what is confirmed, what still needs checking, or what the notes disagree about.
Only call something confirmed if the notes actually settle it. Somebody's impression is not confirmation.

Notes:
[paste notes]
```

The third and fourth lines are there because a test failed. An earlier version said only "separate what is confirmed from what still needs checking". On notes with a disputed date, it put three contested items under confirmed. The [Netherford internal update example](../examples/netherford-internal-update-example.md) shows that run, the ordinary prompt that beat it, and the re-run after I fixed the wording. [Read the review](../evaluations/netherford-internal-update-review.md). The fix worked, but an ordinary "write this up for the team" prompt still scored as well on the same notes. Use this starter because it makes you sort the points, not because it's more accurate than asking plainly.

### Planning: turn rough notes into an agenda

```text
Turn the notes below into a practical agenda for [meeting or workshop].

The agenda should show the purpose, discussion topics, decisions needed and next steps.
Do not assume a decision has already been made.
Flag anything missing that I need to decide before the meeting.

Notes:
[paste notes]
```

This one did best in testing. The [Sowerby and Crane agenda example](../examples/sowerby-crane-agenda-example.md) runs it against an ordinary "turn these notes into an agenda" prompt. [Read the review](../evaluations/sowerby-crane-agenda-review.md). On simple notes the two scored the same. Then I used notes where an earlier decision was disputed and a partner's offhand remark could be read as approval. In the first run, the ordinary prompt closed three questions the notes had left open, and this starter asked about all three. In two repeat runs, it closed two of the three again every time. The last line does the work, because it gives an open question somewhere to go.

### Summarising: make an action list from notes

```text
Read the notes below and create an action list.

For each action, show what needs doing, who appears to own it and any date that is actually stated in the notes.
If an owner or date is missing, say that it is missing. Do not guess.

Notes:
[paste notes]
```

The [Ambleforth action list example](../examples/ambleforth-action-list-example.md) runs this starter on meeting notes with gaps left in on purpose, alongside an ordinary "pull the actions out of these notes" prompt. [Read the review](../evaluations/ambleforth-action-list-review.md). The ordinary prompt filled gaps with details nobody had given, including a month the notes never name and an owner for a job that had none. Over three runs each, the ordinary prompt scored between 22 and 27 out of 30, and this starter between 29 and 30. The range is the point, not the average. Asking plainly sometimes gets you nearly the same answer, and you can't tell when without checking the notes yourself.

## Check before you use it

Before you send, share or act on an AI draft, ask yourself:

- Does the source back up every important point?
- Has it made a guess sound certain?
- Has it missed a newer update or an important caveat?
- Is the information still suitable for this tool?
- What do I still need to decide, approve or send myself?

AI can help you prepare work. It can't take responsibility for it.

## Make the first try useful

Do the task alongside your normal way of working once or twice. Notice whether it saved time after editing, whether it missed anything and whether you trusted the result. You don't need a spreadsheet or a big rollout. You need a fair comparison with the work you'd have done anyway.

This page gets you started. It doesn't promise that any starter will work unchanged for every job. I've tested all three starters on fictional notes, and they didn't do equally well. The agenda starter earned its place. The action list starter stopped an ordinary prompt guessing at owners and dates. The internal update starter failed its first hard test, and even after I rewrote it, an ordinary prompt matched it. Testing changed one prompt and showed the other two were worth keeping. The linked examples show how to test a prompt against the source before you rely on it.

## Where to go next

- Need to choose a task? Read [Finding a Good First AI Use Case](finding-a-good-first-ai-use-case.md).
- Know the task but need a better brief? Use [Prompting Fundamentals](prompting-fundamentals.md).
- Want to see the prompt starter tested? Read the [Thornfield prompting example](../examples/thornfield-team-connect-prompting-example.md), then [the review](../evaluations/thornfield-team-connect-prompting-review.md) that scores it.
- Want to see these three starters tested? Each has a worked example and a scored review: [action list](../evaluations/ambleforth-action-list-review.md), [internal update](../evaluations/netherford-internal-update-review.md), [meeting agenda](../evaluations/sowerby-crane-agenda-review.md).
