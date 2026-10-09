# Getting AI to Correct Your Writing Without Rewriting It

**Start here:** Copy the request below, paste your text under it, and send it to the AI tool you already use.

```text
Correct only the spelling, grammar and punctuation in the text below. Don't change the wording, word choice, order, tone or meaning. If you're not sure whether something is an error, leave it as it is. Return the whole text with your corrections.

[Paste your text here.]
```

Ask like that and you get your own text back with the mistakes fixed. Ask for it to be "polished" and you get a version with your wording changed.

## Why this needs its own request

"Correct and polish" is two jobs. Fixing mistakes is one. Improving the writing is the other. The tool does both unless you say otherwise, and what it improves is your wording.

In my test, that request changed things the writer had chosen. In all three runs it replaced the spoken "gonna", and it cut or reworded "Very, very good". It rewrote figures written as "GBP 12k" and "12,000". It picked one of two people for a sentence that could mean either. It listed these changes in its notes, but you have to read the notes to find them.

## What the test showed

I ran three requests on six short made-up passages, three runs each. The request above made every planted fix and changed nothing else, in 18 runs of 18. "Correct and polish" was safe in one run of 18. Where a sentence couldn't be fixed without choosing a meaning, the strict request left it alone and told me so.

It's one AI model, short passages I wrote and mistakes that were easy to spot. Treat it as a good sign, not a guarantee. [Read the passages](../examples/edit-without-rewriting-passages.md) and [the review](../evaluations/edit-without-rewriting-test.md).

## Check what changed

Don't take the tool's word for it. Word and Google Docs both have a compare feature that marks every difference between two versions. I haven't tested either for this. Read each change, and look hardest at:

- figures, dates and names;
- anything inside quotation marks, which records what someone said;
- any sentence the tool says it wasn't sure about.

## If you want to decide each change yourself

Use this request instead. It gives you a list, not a corrected copy.

```text
Check the text below for spelling, grammar and punctuation errors. Don't rewrite it, and don't return a corrected copy. List each suggested change on its own line, in this form: ORIGINAL: <the exact words from the text> | SUGGESTED: <your replacement> | REASON: <why>. I will decide which ones to apply.

[Paste your text here.]
```

Read each suggestion before you accept it. In my test, the lists found every planted mistake. They also included changes I'd have refused: a date reworded from "3rd March" to "3 March", a capital letter on a quoted sentence, and a new subject added to a sentence that had none. Accepting every suggestion was unsafe in 8 runs of 18.

## Before you paste

A message you want proofread can hold names, prices and details about people. Check it against [Before You Put Work Data Into AI](before-you-put-work-data-into-ai.md) first.
