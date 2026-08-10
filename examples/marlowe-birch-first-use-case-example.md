# Marlowe & Birch: Finding a Good First AI Use Case

**Everything in this example is fictional.** Marlowe & Birch Publishing and Nadia Foster were invented from scratch for this repository.

## The workplace situation

Marlowe & Birch Publishing is a fictional UK publisher with around 70 employees. Nadia Foster is its Operations Coordinator. She is comfortable using normal office software but is not technical, and wants to try AI on one real piece of work rather than start a large automation project.

She has six possible tasks in mind.

## The six tasks

### Task 1: Weekly project update

Every Friday, six project leads send Nadia short free-text updates. Nadia turns them into a one-page internal status summary showing what moved forward, what is delayed, decisions needed next week, and anything needing management attention. It normally takes about 55 minutes each week. The information is normal internal project information, not particularly sensitive. There is an existing summary format, and Nadia checks it before sending it internally.

### Task 2: Customer complaints and refunds

Nadia spends about three hours a week reviewing customer complaint emails and deciding whether the case should receive a replacement, a refund up to GBP 250, or escalation to a manager. The work involves interpreting customer messages and company policy. A wrong decision could affect a customer or cost the company money.

### Task 3: Copying approved order information

Every week Nadia spends around 90 minutes copying already-approved supplier order details from a spreadsheet into the company's purchasing system. The fields are fixed. There is no judgement involved. If the spreadsheet says Supplier, Order Number, Cost Centre and Amount, those exact values are copied into matching fields.

### Task 4: Quarterly board workforce summary

Once a quarter Nadia spends about three hours creating a short board summary from HR and finance reports. The source material contains salary information, absence data and other confidential employee information.

### Task 5: Internal newsletter ideas

Once a month Nadia spends around 20 minutes coming up with possible subject lines and short ideas for the staff newsletter. There are no material consequences if an idea is poor.

### Task 6: Supplier invoice decisions

Nadia spends around two hours a week reviewing supplier invoices against purchase orders, previous correspondence and approval limits before deciding whether Finance should be asked to pay them. The information is sometimes incomplete or inconsistent. A mistake could result in money being paid incorrectly.

## An ordinary first attempt

The baseline prompt was deliberately ordinary, not absurdly weak. It used the same six tasks above.

```text
I want to start using AI at work. Based on the six tasks below, which one should I try first? Rank them, explain your choice, and suggest a small first experiment.
```

### Baseline output

**Ranking: which task to try first**

1. Task 1 - Weekly project update (start here)
2. Task 5 - Newsletter ideas
3. Task 3 - Copying approved order info
4. Task 6 - Supplier invoice decisions
5. Task 2 - Customer complaints and refunds
6. Task 4 - Quarterly board workforce summary

**Why Task 1 wins**

A good first AI experiment for someone who is "comfortable but not technical" and wants to try it on one real piece of work needs four things at once, and Task 1 is the only one that has all four:

- Recurring, so she can judge it fairly - weekly cadence means she gets several attempts within a month, not one shot in three months.
- Low sensitivity - ordinary internal project chatter, so there is no data-handling decision to resolve before she even starts.
- A quality bar she already owns - there is an existing summary format and she checks it before sending. That means she can compare AI output directly against her own normal standard, and nothing goes out the door unchecked.
- Plays to what generative AI is actually good at - turning six scrappy free-text updates into a structured one-pager (progress, delays, decisions, escalations) is a synthesis-and-drafting task, which is the core strength of these tools. It is not asking the AI to make a judgement call with consequences.

It also saves the most safely realisable time of any low-risk option: up to around 55 minutes a week if it works, with a built-in human check so a bad week costs her nothing but a bit of editing.

**Why the others rank lower**

- Task 5 (newsletter ideas) is genuinely safe and a fine confidence-builder, but it is only 20 minutes a month with no real consequence either way. There is not much of "one real piece of work" to learn from, and not much time to reclaim. Good second try, not first.
- Task 3 (copying order data) looks safe because there is "no judgement involved," but that is exactly the tell that this is not an AI task at all. Fixed fields, exact values, spreadsheet to system: that is a job for a simple script, macro, or the purchasing system's own import feature, not a language model. Using AI here adds a new failure mode (transcription slips, dropped rows) to a process that currently has none, for a task AI is not the right tool for.
- Task 6 (invoice decisions) has real potential later; cross-referencing documents is something AI can help a human do faster, but it involves incomplete or inconsistent information and a decision with financial consequences if wrong. That is second-phase work, once Nadia and her manager have seen AI perform reliably on Task 1 and have a view on how much to trust it.
- Task 2 (complaints and refunds) carries the same judgement-and-money risk as Task 6, but adds a customer-facing dimension: a wrong call affects a real person, not just an internal figure. Not a first experiment.
- Task 4 (board summary) ranks last because it combines the two biggest risk factors at once: confidential personal data (salary, absence, individual employee information) and a high-stakes, low-frequency audience (the board, once a quarter). Even if the drafting task itself is easy for AI, this is the one place a data-handling mistake would actually matter, and there is no room to iterate and learn before the next quarter. This should wait until there is a clear answer on which AI tool is approved for confidential HR and finance data, if ever.

**Suggested first experiment (Task 1)**

Keep it deliberately small: one week, no new process.

1. This Friday, once Nadia has the six project leads' updates in hand as usual, paste them into whatever AI tool the company has approved for business use, not a personal AI account, since it is still internal company information.
2. Paste in the existing summary template alongside them and ask it to draft the four sections: what moved forward, what is delayed, decisions needed next week, anything needing management attention.
3. Nadia reviews and edits it exactly as she already does before sending. Nothing changes about the checking step.
4. Time it against her usual 55 minutes, and do this for 2 to 3 consecutive Fridays rather than judging off one week, since the six leads will not all write in the same style.
5. At the end of three weeks, she will have a genuine answer to two things: how much time it actually saved once editing is factored in, and how much she trusts the output. That is exactly the evidence needed before deciding whether to extend AI to a higher-stakes task like Task 6 or Task 2.

## A guide-informed attempt

This prompt used the checklist in [Finding a Good First AI Use Case](../guides/finding-a-good-first-ai-use-case.md). It used the same six tasks, with no extra factual evidence.

```text
I want to choose one sensible first AI experiment from the six tasks below.

Assess them based on:
- whether the task happens often enough and takes enough effort for improvement to matter;
- whether AI is actually suited to the kind of work;
- whether a simpler rules-based automation may be better;
- whether the information is appropriate to use;
- how easy the output is for a person to check;
- what could happen if the output is wrong;
- whether the first experiment can remain small, reversible and human-controlled;
- what baseline and success measure would make the trial useful.

Rank all six tasks.

Then give me:
1. the one you would try first;
2. why it is a good first experiment;
3. why the others would not be your first choice;
4. the smallest useful trial;
5. what I should measure;
6. what a person must still check or decide.

Do not assume permissions, policies or facts that are not provided.
Do not assume AI is the right tool just because a task is repetitive.
```

### Guide-informed output

**Ranking (best first experiment to worst fit for a first experiment)**

1. Task 1 - Weekly project update: best first experiment
2. Task 5 - Newsletter ideas: safe, but too small to teach you much
3. Task 4 - Quarterly board workforce summary: blocked by unresolved data-sensitivity questions
4. Task 2 - Complaints and refunds: worthwhile eventually, wrong shape for a first trial
5. Task 6 - Supplier invoice decisions: same problem as Task 2, slightly worse, since the data is incomplete or inconsistent, making it harder to check
6. Task 3 - Copying approved order info: not an AI task at all; this is where rules-based automation belongs instead

**1. The one I'd try first: Task 1, Weekly project update**

**2. Why it's a good first experiment**

Running it against the assessment criteria:

- Frequency and effort: weekly, 55 minutes. Recurring enough that a saving compounds, but not so operationally central that a bad week causes a crisis.
- Suited to AI: this is exactly what language models are good at, turning six loosely-structured free-text updates into a structured synthesis (progress, delays, decisions needed, escalations). It is summarisation and categorisation, not judgement with consequences.
- Rules-based alternative: not realistic. The inputs are free text from six different people with no fixed format, so a template or macro cannot reliably extract "what is delayed" or "what needs escalation." This is a case where AI is genuinely the right tool, not just an available one.
- Information appropriateness: described as normal internal project information, not sensitive. The one task on the list where a data policy does not need checking first.
- Checkability: high. Nadia already knows the six updates and already reviews the summary before it goes out. The AI is slotting into a review step that already exists, not creating a new trust requirement.
- Consequence of a wrong output: low and recoverable. Worst case is an awkward or incomplete summary that Nadia catches before sending, or corrects next week. No customer, money or confidential data involved.
- Small, reversible, human-controlled: yes on all three. Nadia can run it for two or three weeks in parallel with her current process, compare outputs side by side, and drop it with zero cleanup if it does not help.
- Baseline and success measure exist naturally: time (currently around 55 minutes) and an existing format to compare against, both make the trial measurable without extra setup.

**3. Why the others would not be the first choice**

- Task 5 (newsletter ideas) is genuinely low-risk and AI-suited, but at 20 minutes a month the effort saved is too small to matter, and because there are no material consequences, it teaches you almost nothing about how to handle a case where checking matters or output could be wrong. Fine as a very-low-stakes second trial, not the most useful first one.
- Task 4 (quarterly board summary) touches salary, absence and other confidential employee data. Nothing in the brief says what is permitted here: whether the company allows this data into whatever AI tool would be used, under what access or retention terms, or whether HR or data-protection sign-off is needed. That is a policy question to resolve before any trial, not something to default into for a first experiment. It is also only quarterly, so even once cleared, it gives few chances to learn and iterate.
- Task 2 (complaints and refunds) is a strong long-term candidate; it is frequent and time-consuming, but the output is a decision with real money and customer consequences (up to GBP 250, or escalation). A first experiment should be one where a wrong output is cheap to catch and cheap to be wrong about; this one is neither. If pursued later, the safer shape is "AI drafts a recommendation with reasoning, Nadia decides" rather than "AI decides," so a mistake is a mis-drafted suggestion, not a paid-out refund.
- Task 6 (supplier invoice decisions) has the same financial-consequence problem as Task 2, made worse by the source information sometimes being incomplete or inconsistent. That is a harder judgement problem, and checking an AI's judgement on incomplete data is itself effortful, which erodes the time saved.
- Task 3 (copying approved order info) is the one to actively rule out as an AI trial. There is no judgement in it: fixed fields, spreadsheet to system, values copied as-is. That is the textbook case for simple rules-based automation (a script, a macro, an import template, or existing integration tooling), which will be more accurate and more reliable than an AI doing manual-feeling data entry. Using generative AI here would add error risk for no benefit over deterministic automation. High frequency and effort do not make it an AI task; that is the "repetitive does not mean AI-suited" trap worth watching for.

**4. The smallest useful trial (Task 1)**

Run it in parallel, not as a replacement, for two to three consecutive Fridays:

- Nadia collects the six updates as normal.
- She feeds them into an AI tool and asks it to produce a draft using the existing summary format (what moved forward, delayed, decisions needed, management attention).
- She edits the draft into the version she actually sends, using her normal judgement, and keeps both the draft and the final side by side.
- The current manual process continues untouched underneath; nothing changes for the six project leads or for whoever receives the summary.
- No new data leaves the building beyond what already goes into the existing report, and nothing is sent externally without Nadia's review.

**5. What to measure**

- Time: minutes from receiving the six updates to a sent, checked summary, compared against the roughly 55-minute baseline. Track editing time separately from generation time, so you can see whether the saving is real or just moved.
- Edit distance: how much Nadia has to change, add or delete from the draft each week. A lot of correction each time signals the tool is not actually saving effort, just relocating it.
- Miss rate: did the draft correctly surface every genuine delay, decision-needed item and escalation that was in the six updates, with nothing invented or dropped?
- Nadia's own judgement: after two or three weeks, would she rather draft from scratch or edit the AI's draft. That qualitative call matters as much as the numbers.

**6. What a person must still check or decide**

- Nadia still reads all six original updates herself. The summary is a drafting aid, not a substitute for knowing what project leads actually said.
- She still decides what counts as "needing management attention." That is a judgement call about organisational priorities, not something to hand to a drafting tool.
- She still checks the draft against the existing format and against the source updates before sending, exactly as she does today.
- Before running any trial, confirm what AI tool is actually permitted for this kind of internal content, since that is a company policy question this brief does not answer.
- If this trial goes well and Nadia wants to move to Task 2 or Task 6 next, the decision to redesign those as "AI recommends, human decides" rather than "AI decides" should be made explicitly before starting, not assumed by carrying over Task 1's setup.

## Short comparison

Both outputs ranked Task 1 first and correctly identified Task 3 as a poor fit for AI rather than defaulting to it because the task is repetitive. Neither invented a company policy on data handling. The guide-informed output went further: it flagged information-appropriateness for every task rather than only the most obvious one, gave an explicit set of measures instead of "time it," and was internally consistent about ranking Task 3 last (not merely risky, but not an AI task at all) rather than ranking it above tasks that are AI-suited but genuinely risky. [Read the scored review](../evaluations/marlowe-birch-first-use-case-review.md).
