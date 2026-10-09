#!/usr/bin/env python3
"""Measure how far an edited text has drifted from the original.

It uses only the Python standard library and changes no file. It answers four
questions about an AI edit:

  1. Were any figures, quotations or links lost or added?
  2. How many words changed, and in how many places? Each place is one
     thing a person has to read and decide on.
  3. With a list of planted fixes: how many were made, and how many words
     differ from the original with only those fixes applied? A planted fix
     that was missed counts as a difference.
  4. With a list of strings that must survive: did they?

It can also apply a list of suggested changes to the original, so that
"suggestions a person applies" can be measured the same way as an edit.

Run, from the repository root:

    python3 scripts/edit_drift.py ORIGINAL EDITED [--fixes FILE] [--keep FILE]
    python3 scripts/edit_drift.py --apply ORIGINAL SUGGESTIONS > EDITED

A fixes file has one `wrong => right` pair per line. A keep file has one
string per line. A suggestions file has one suggestion per line, in the form
`ORIGINAL: words | SUGGESTED: words | REASON: why`.

Exit status is 1 if a figure, quotation or link was lost or a kept string
vanished, and 0 otherwise.
"""

import difflib
import re
import sys

WORD = re.compile(r"\w+(?:'\w+)?|[^\w\s]")
FIGURE = re.compile(r"\b\d[\d,.]*(?:st|nd|rd|th|k|m|%)?")
QUOTE = re.compile(r'"[^"\n]+"')
LINK = re.compile(r"https?://[^\s\"']+")


def tokens(text):
    return WORD.findall(text)


def things_to_protect(text):
    """Figures, quotations and links, as the strings that appear in the text."""
    return set(FIGURE.findall(text)) | set(QUOTE.findall(text)) | set(LINK.findall(text))


def changes(before, after):
    """The places where two texts differ, as (old words, new words) pairs."""
    a, b = tokens(before), tokens(after)
    ops = difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes()
    return [(" ".join(a[i1:i2]), " ".join(b[j1:j2]))
            for tag, i1, i2, j1, j2 in ops if tag != "equal"]


def words_changed(before, after):
    a, b = tokens(before), tokens(after)
    ops = difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes()
    return sum(max(i2 - i1, j2 - j1) for tag, i1, i2, j1, j2 in ops if tag != "equal")


def apply_fixes(text, fixes):
    for wrong, right in fixes:
        text = text.replace(wrong, right, 1)
    return text


def apply_suggestions(original, suggestions):
    """Apply every suggestion once. Returns the new text and the ones that didn't match."""
    text, unmatched = original, []
    for line in suggestions.splitlines():
        m = re.search(r"ORIGINAL:\s*(.+?)\s*\|\s*SUGGESTED:\s*(.*?)\s*(?:\|\s*REASON:.*)?$", line)
        if not m:
            continue
        old, new = (s.strip().strip('"') for s in m.groups())
        if old and old in text:
            text = text.replace(old, new, 1)
        else:
            unmatched.append(line.strip())
    return text, unmatched


def compare(original, edited, fixes=(), keep=()):
    lost = sorted(things_to_protect(original) - things_to_protect(edited))
    added = sorted(things_to_protect(edited) - things_to_protect(original))
    result = {
        "lost": lost, "added": added,
        "places": len(changes(original, edited)),
        "words": words_changed(original, edited),
        "of": len(tokens(original)),
        "keep_lost": [k for k in keep if k not in edited],
    }
    if fixes:
        expected = apply_fixes(original, fixes)
        result["fixed"] = sum(1 for wrong, right in fixes if right in edited and wrong not in edited)
        result["fixes"] = len(fixes)
        result["beyond_words"] = words_changed(expected, edited)
        result["beyond_places"] = len(changes(expected, edited))
        result["beyond_of"] = len(tokens(expected))
    return result


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def pairs(path):
    return [tuple(s.strip() for s in line.split("=>", 1))
            for line in read(path).splitlines() if "=>" in line]


def main(argv):
    if len(argv) >= 4 and argv[1] == "--apply":
        text, unmatched = apply_suggestions(read(argv[2]), read(argv[3]))
        sys.stdout.write(text)
        for line in unmatched:
            print("did not match the text:", line, file=sys.stderr)
        return 0
    if len(argv) < 3:
        print(__doc__)
        return 2
    original, edited = read(argv[1]), read(argv[2])
    fixes = pairs(argv[argv.index("--fixes") + 1]) if "--fixes" in argv else []
    keep = [s for s in read(argv[argv.index("--keep") + 1]).splitlines() if s] if "--keep" in argv else []
    r = compare(original, edited, fixes, keep)
    print(f"Figures, quotations and links lost: {r['lost'] or 'none'}")
    print(f"Figures, quotations and links added: {r['added'] or 'none'}")
    print(f"Words changed: {r['words']} of {r['of']}, in {r['places']} places")
    if fixes:
        print(f"Planted fixes made: {r['fixed']} of {r['fixes']}")
        print(f"Differences from the original with only the planted fixes applied: "
              f"{r['beyond_words']} words of {r['beyond_of']}, in {r['beyond_places']} places "
              f"(a planted fix that was missed counts here too)")
    if keep:
        print(f"Kept strings that vanished: {r['keep_lost'] or 'none'}")
    for old, new in changes(original, edited):
        print(f"  - {old or '(nothing)'}\n  + {new or '(nothing)'}")
    return 1 if r["lost"] or r["keep_lost"] else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
