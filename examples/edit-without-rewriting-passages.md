# Fictional Passages: Editing Without Rewriting

> Every passage below is fictional. The people, firms and figures were invented to test whether an AI tool corrects spelling, grammar and punctuation without changing what the writer said. Each passage contains deliberate mistakes. What they are is named below the re-run line.

## The Six Passages

### Passage 1: Customer email, ordinary errors

```text
Hi Marcus,

Thanks for your patience. We recieved the revised order on 14 March and its been processed, so the 1,450 units will leave the warehouse on Friday. I'm sorry the first batch went astray. There was a mix-up with the courier, and we have since changed supplier.

Your welcome to call me if you'd like to talk it through. I'm in the office all week. We definately want to keep your business, and I think we can make this alot easier for you from now on.

If your free on Thursday, I'd be glad to go through the new process with you. I've also attached the updated price list, which covers the colour options you asked about.

Kind regards,
Helen Ashworth
Brightwell Supplies
```

### Passage 2: Manager update in a plain, spoken voice

```text
Right. Quick one for the team. The depot move is gonna happen on the 9th whether we like it or not, and I've got nowt but good things to say about how you've handled it so far. Very, very good.

Three things. First, Dave's lot are still sorting out the racking, so don't touch anything on the east wall until they've signed it off. Second, keep the two stock lists seperate until Monday. I don't want anyone loosing a day over a mix-up. Third, the new rota is a bit of a faff, I know, but it's only for a fortnight. Check weather you can swap shifts, and if it's not working, tell me and I'll sort it.

That's it. Cheers, Jo.
```

### Passage 3: Brand spelling and a quotation with its own errors

```text
Subject: Skedulr feedback

Hi all,

I spoke to Rina Kapoor at Halden Care yesterday about the Skedulr rollout. Her comment was blunt: "we was never told about the change to the rota, and nobody asked us." She also said that the tool lost it's settings after the update, and that the change had a big affect on how she plans shifts. She rebuilt them from the Q3_forecast_FINAL_v2.xlsx file.

I've logged both points on the shared tracker at https://tracker.example.com/halden. Rina has asked if we can send a written summery by the end of the week, so I'll draft something tomorrow and share it before it goes out.
```

### Passage 4: Two sentences where the obvious fix changes the meaning

```text
Notes from Tuesday's catch-up

Sam told Priya she would need to approve the budget before Friday. Walking into the room, the projector was already broken, so we ran the review from a laptop. The delay occured because the supplier was late.

We also agreed to pause the pilot untill the data is clean. Nobody objected, and Priya definatly seemed relieved.
```

### Passage 5: Figures written three different ways

```text
Hi Dev,

A quick summary of the payment plan. The deposit was GBP 12k, so the balance of 12,000 falls due on 3rd March. The second instalment of GBP 1.2k follows on 21 March, and we will recieve the final payment in Febuary next year if nothing changes. Please send the invoices seperately so finance can match each one.

Thanks,
Alina
```

### Passage 6: A clean passage

```text
Hi team,

Here is the plan for next week. On Monday we will review the open tickets, and on Tuesday the new starters will shadow the support desk. Priya has agreed to lead the Wednesday session, which will cover the refund process and the escalation route. If anything changes, I will let you know by Thursday morning.

Please read the attached notes beforehand. They are short, and they will save us a good ten minutes on the day.

Thanks,
Tom
```

## The Four Requests

Each request went before one passage, followed by this line, which is the same in all three:

> Put your result between a line that says START and a line that says END, so I can copy it. You can tell me anything else outside those two lines.

**Rewrite:**

> Please correct and polish the text below so it reads well.

**Edit only:**

> Correct only the spelling, grammar and punctuation in the text below. Don't change the wording, word choice, order, tone or meaning. If you're not sure whether something is an error, leave it as it is. Return the whole text with your corrections.

**Plain** (added in a follow-up):

> Please fix any mistakes in the text below.

**Suggest:**

> Check the text below for spelling, grammar and punctuation errors. Don't rewrite it, and don't return a corrected copy. List each suggested change on its own line, in this form: ORIGINAL: <the exact words from the text> | SUGGESTED: <your replacement> | REASON: <why>. I will decide which ones to apply.

> **Re-running this yourself?** Copy everything above this line and stop here. The section below is the answer key: it lists the mistakes and the wording that must survive, so including it turns the test into an open-book exam and the result will look better than it should.

## The Answer Key

I wrote this before any run. Each planted mistake has one correct fix. A string to keep must appear in the edited text exactly as it is here.

| Passage | Planted mistakes (wrong => right) | Must survive exactly |
| --- | --- | --- |
| 1 | recieved => received; its been => it's been; Your welcome => You're welcome; definately => definitely; alot => a lot; If your free => If you're free | Marcus; 14 March; 1,450 units; Friday; Thursday; colour; Helen Ashworth; Brightwell Supplies |
| 2 | seperate => separate; loosing => losing; Check weather => Check whether | Right. Quick one for the team.; gonna; nowt; Very, very good.; Dave's lot; faff; That's it. Cheers, Jo.; the 9th; fortnight; Monday |
| 3 | it's settings => its settings; big affect => big effect; summery => summary | Skedulr feedback; Skedulr rollout; Rina Kapoor; Halden Care; "we was never told about the change to the rota, and nobody asked us."; Q3_forecast_FINAL_v2.xlsx; https://tracker.example.com/halden |
| 4 | occured => occurred; untill => until; definatly => definitely | Sam told Priya she would need to approve the budget before Friday.; Walking into the room, the projector was already broken |
| 5 | recieve => receive; Febuary => February; seperately => separately | GBP 12k; 12,000; 3rd March; GBP 1.2k; 21 March; Dev; Alina |
| 6 | none | the whole passage |

### What each passage is for

- **Passage 1:** ordinary mistakes with one correct fix each, and British spelling ("colour") that is correct.
- **Passage 2:** a plain, spoken voice. "Gonna", "nowt" and "Very, very good." are the writer's choices, not mistakes.
- **Passage 3:** a product name spelled on purpose, a file name, a link, and a quotation that has its own grammar slip. A quotation records what someone said.
- **Passage 4:** two sentences where the obvious fix changes the meaning. "She" could be Sam or Priya, and the opening phrase of the second sentence has no subject to attach to. Fixing either means choosing a meaning, so the right move is to leave both and say so.
- **Passage 5:** figures written three ways ("GBP 12k", "12,000", "GBP 1.2k") and dates written two ways. They may not add up. Nothing in the passage says which is right.
- **Passage 6:** no mistakes. The right result is no change.

### How a run is scored

Save the passage as one file and the key lines as two more: a fixes file with one `wrong => right` pair per line, and a keep file with one string per line. Then run the [drift script](../scripts/edit_drift.py) on the passage and the edited text:

```text
python3 scripts/edit_drift.py passage.txt edited.txt --fixes fixes.txt --keep keep.txt
```

For the suggestion request, apply the suggestions first with `--apply`. The script reports the planted fixes made, the figures, quotations and links lost, the kept strings that vanished, and the words changed beyond the planted fixes.

A run counts as safe if it loses no kept string, figure, quotation or link, changes no more than 3% of the words beyond the planted fixes, and leaves the clean passage exactly as it was.
