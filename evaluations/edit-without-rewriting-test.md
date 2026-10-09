# Editing Without Rewriting: Three Ways to Ask an AI to Proofread

I wanted to know whether an AI tool can fix spelling, grammar and punctuation without changing what I said. I asked three ways, on six short passages with known mistakes, then added a fourth, plainer way. A strict edit-only request fixed every planted mistake and changed nothing else, in 18 runs of 18. A request to "correct and polish" was safe in one run of 18.

## What I Tested

The same passages, three requests:

- **Rewrite:** "Please correct and polish the text below so it reads well."
- **Edit only:** correct only spelling, grammar and punctuation, keep the wording, order and tone, and leave anything uncertain as it is.
- **Suggest:** list each change as the original words, a replacement and a reason, and return no corrected copy, so that a person decides.

The wording of all three is in the [passages file](../examples/edit-without-rewriting-passages.md). I wrote the edit-only request as a general rule. It names no passage and none of the traps.

## What I Decided in Advance

I wrote six passages of 60 to 124 words and a key before any run. Five passages hold 18 planted mistakes between them. Each has one correct fix. They also hold things that look wrong and aren't, or that can't be fixed without choosing a meaning:

- a plain spoken voice ("gonna", "nowt")
- a product name spelled on purpose
- a quotation with its own grammar slip
- a pronoun that could mean either of two people
- an opening phrase with no subject
- figures written three ways

The sixth passage has no mistakes. The right result is no change.

A run was **safe** if it:

- lost no string the key says must survive, and no figure, quotation or link;
- changed no more than 3% of the words beyond the planted fixes;
- left the clean passage exactly as it was.

A request **holds** if at least 16 of its 18 runs are safe. I set these rules:

- A guide is worth writing if edit-only or suggest holds and rewrite doesn't.
- No guide is needed if rewrite holds too.
- If neither edit-only nor suggest holds, I publish that and write no guide.
- If a request holds but makes under 80% of the planted fixes, I call it safe but timid.

I didn't add runs after seeing a result.

## Method

I made 54 runs on 9 October 2026: six passages, three requests, three runs each, each in a fresh conversation. The runs were Claude Code subagents on the same setting I used for my outbound qualification test in the sales repository. A subagent on that setting reported its model as `claude-opus-5-5`. That's self-reported. Each run read its input from a file and wrote its reply to another. The tool logs show nothing else. All three requests asked for the result between START and END lines, so a script could find it. Anything outside those lines was free for notes.

I scored with the [drift script](../scripts/edit_drift.py) in this repository. For the suggest request, the script applied every suggestion once, as a stand-in for a person who accepts them all. The marker lines were found in all 54 replies.

## Result

| | Rewrite | Edit only | Suggest | Plain |
| --- | ---: | ---: | ---: | ---: |
| Safe runs, of 18 | **1** | **18** | **10** | **11** |
| Planted fixes made, of 54 | 48 | 54 | 54 | 54 |
| Runs that lost something that had to survive | 10 | 0 | 8 | 7 |
| Words changed beyond the planted fixes, median | 9.8% | 0% | 0% | 0% |
| Places to read and decide on, median | 10 | 3 | 4 | 4 |
| Clean passage left alone, of 3 | 1 | 3 | 3 | 3 |

By the rules I set, edit-only holds, suggest and rewrite don't, and a guide is worth writing. Counting the runs that weren't safe, rewrite had 17 of 18 against none for edit-only. That's p below 0.000001, one-tailed, by an exact test. Suggest had 8 of 18 against none, p = 0.0014.

The plain request, "Please fix any mistakes in the text below.", was added afterwards: 18 more runs on the same passages, with a rule I wrote first. It would hold if at least 16 of 18 were safe. It didn't, so it doesn't hold. It was made the same day, on the same setting and scored by the same script. Plain against edit-only, counting runs that weren't safe, is 7 of 18 against none, p = 0.0038, one-tailed, by an exact test.

## What the Requests Did

**Rewrite changed the writer's voice and figures.** All three runs on the spoken-voice passage replaced "gonna". Two changed "Very, very good" to "Really well done" and one cut it, and each said so. On the figures passage, all three rewrote how the amounts and dates were written. All three added a currency to the figure that had none, and one said none of the values had changed. On the pronoun passage, all three picked a meaning, "I guessed Priya", and rewrote the sentence. They told me each change in their notes, which is honest, and it is also more to read: 135 words of notes on average, against 70 for edit-only.

**Edit-only fixed the mistakes and said what it left.** All 18 replies had every planted fix and no other change. On the two ambiguity passages all six said they'd left the pronoun and the opening phrase alone, and why, or that the figures might not add up. It also kept the quotation, the product name and the voice.

**A plain request kept most of what rewrite lost, and not all of it.** It made every planted fix and left the clean passage, the spoken voice, the product name, the file name and the link alone. But it changed things the strict request left. All three runs on the pronoun passage rewrote the sentence with no subject to "When we walked into the room", and said so. All three on the figures passage changed "3rd March" to "3 March". Two added "GBP" to the figure that had no currency, and one said "I've assumed it's pounds". One run capitalised the first word of the quotation. It still told me about the pronoun and the figures, as the strict request did.

**Suggest found every mistake and also proposed changes I'd have wanted to decline.** Two of three runs proposed capitalising the start of Rina's quotation, and one proposed "we were". All three suggested "When we walked into the room", which adds a subject the writer never gave. All three suggested "3 March" for "3rd March", which is a style choice. Applying every suggestion at once is the harshest way to use the list. A person would reject some. Two runs said in their notes that the quotation was Rina's own words and could stay as it was.

**Where all three agreed.** In all nine runs on the figures passage, the AI said the amounts might not add up. Noticing wasn't the difference. What differed was whether the text changed afterwards.

## What Went Wrong, and What I Can't Tell

- **Rewrite is the extreme phrasing.** "Correct and polish" invites a rewrite. The plain request shows a milder one does better, and still not well enough.
- **The mistakes were easy.** They were common spelling slips. Edit-only making all 54 fixes says nothing about subtler grammar.
- **The passages are short.** They run to 124 words at most, and I wrote them, the key and the rules. One model ran them. Three runs a cell is a small number.
- **The suggest result is a worst case.** My script accepts every suggestion. Nothing here shows what a person would do.
- **A missed fix also counts as drift.** The script measures every word that differs from the original with only the planted fixes applied. Rewrite missed 6 of its 54, mostly by rewording the sentence. I recomputed without them: rewrite is still safe in one run of 18, with the same median.
- **The script is strict.** A date written "3 March" for "3rd March" counts as a lost figure. I think that's right, since it's a change a reader should see, but it isn't a change of meaning.
- **I found no mistake I'd missed.** No edit-only or suggest run fixed a real error I hadn't planted, which suggests the passages were clean beyond the planted ones.
- **Flagging is a judgement.** I read each run's notes for whether it mentioned the ambiguity. That part isn't scripted.
- **It's fictional text.** It says nothing about a long document, a language other than English, or a writer's real prose.

## What I Did Next

By my own rule a guide was worth writing, so I wrote a short one: [Getting AI to Correct Your Writing Without Rewriting It](../guides/get-ai-to-correct-your-writing-without-rewriting-it.md). It gives the edit-only request as tested, and the suggestion request with the warning from this page. A compare or tracked-changes feature in a word processor should show the same changes as the script, but I haven't tried it. I then tested the plain request, "fix any mistakes". It didn't hold: safe in 11 runs of 18. The guide says so.
