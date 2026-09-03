#!/usr/bin/env python3
"""Repository checks for Practical AI Adoption.

Three deterministic checks:

  1. Broken relative links in Markdown.
  2. Punctuation this repository has already ruled out.
  3. An evaluation whose stated score disagrees with its own breakdown table.

Check 2 enforces a rule this repository already states. AGENTS.md says: "Use
ASCII punctuation only. Do not use em dashes, en dashes or smart quotes." A
stated rule with nothing enforcing it does not hold: the sibling repository
practical-ai-sales-workflows had the same rule in writing and still needed em
dashes removed by hand in nineteen separate commits before a check existed.
Note that this repository rules out en dashes too, which the sibling does not,
so this check is deliberately stricter than the one over there.

Check 3 exists because the same sibling had five evaluations whose headline
totals disagreed with their own tables, unnoticed for months. Nobody re-adds a
column of numbers when the table above it looks reasonable.

These checks confirm arithmetic, links and punctuation. They cannot judge
whether a score is the right score, or whether a guide's advice is any good.
That still needs a person.

Run locally from the repository root:

    python3 .github/scripts/repo_checks.py

Exits 0 if everything passes, 1 if any check fails.
"""

import os
import re
import subprocess
import sys

failures = []


def tracked_files():
    out = subprocess.run(
        ["git", "ls-files"], capture_output=True, text=True, check=True
    ).stdout
    return [f for f in out.splitlines() if f]


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


ALL = tracked_files()
MD = [f for f in ALL if f.endswith(".md")]
# Content the punctuation rule applies to. Excludes .github/, so this script
# cannot flag its own source.
CONTENT = [f for f in ALL if f.endswith((".md", ".html"))
           and not f.startswith(".github/")]


def fail(check, path, detail):
    failures.append((check, path, detail))


# 1. Broken relative links in Markdown.
LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
for f in MD:
    base = os.path.dirname(f)
    for i, line in enumerate(read(f).splitlines(), 1):
        for target in LINK.findall(line):
            t = target.strip()
            if t.startswith(("http://", "https://", "#", "mailto:")):
                continue
            path = t.split("#")[0]
            if not path:
                continue
            resolved = os.path.normpath(os.path.join(base, path))
            if not os.path.exists(resolved):
                fail("broken-link", f"{f}:{i}", f"{t} -> {resolved}")


# 2. Punctuation AGENTS.md rules out. Characters are referred to by escape
# rather than literal so this file never flags itself.
BANNED_PUNCTUATION = {
    "\u2014": ("em-dash", "replace with a comma, colon or full stop"),
    "\u2013": ("en-dash", "replace with a plain hyphen or the word 'to'"),
    "\u201c": ("smart-quote", "replace with a straight double quote"),
    "\u201d": ("smart-quote", "replace with a straight double quote"),
    "\u2018": ("smart-quote", "replace with a straight single quote"),
    "\u2019": ("smart-quote", "replace with a straight apostrophe"),
}
for f in CONTENT:
    for i, line in enumerate(read(f).splitlines(), 1):
        for character, (label, remedy) in BANNED_PUNCTUATION.items():
            if character in line:
                fail(label, f"{f}:{i}", f"{remedy} (AGENTS.md)")


# 3. An evaluation's stated score must match its own breakdown table.
#
# Evaluations here score two outputs side by side, a baseline and a
# guide-informed or workflow-informed one, so a breakdown row carries two
# numbers:
#
#   | Area | Baseline | Guide-informed | Why it matters |
#   | Problem and task understanding | 4 | 5 | ... |
#
# and the stated result is either a single row:
#
#   | Score | 24/30 | 30/30 |
#
# or one row per attempt, where the breakdown heading names which attempt it
# belongs to ("## Score breakdown, Attempt 2"). The attempt number is matched
# so a two-attempt evaluation is checked against the right row rather than
# whichever happens to agree.
#
# Every breakdown section in a file is checked, not just the first, so a
# three-attempt evaluation with a table per attempt has each table validated
# against its own row.
#
# Known limit: an attempt that states a total without itemising it cannot be
# checked, because there is nothing to add up.
BREAKDOWN_HEADING = re.compile(r"^##\s*Score breakdown(?:,\s*Attempt\s*(\d+))?",
                               re.M | re.I)
AREA_ROW = re.compile(r"^\|\s*([A-Za-z][^|]*?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|",
                      re.M)
STATED_SCORE = re.compile(
    r"^\|\s*(Score|Attempt\s*(\d+)[^|]*?)\s*\|\s*(\d+)/(\d+)\s*\|\s*(\d+)/(\d+)\s*\|",
    re.M)
for f in MD:
    text = read(f)
    headings = list(BREAKDOWN_HEADING.finditer(text))
    stated = STATED_SCORE.findall(text)
    if not headings or not stated:
        continue
    for index, heading in enumerate(headings):
        # A breakdown section ends where the next one begins, so a table is
        # never read past its own attempt.
        end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
        rows = AREA_ROW.findall(text[heading.end():end])
        if not rows:
            continue
        wanted_attempt = heading.group(1)
        for label, attempt, left, left_max, right, right_max in stated:
            if wanted_attempt and attempt != wanted_attempt:
                continue
            if not wanted_attempt and not label.lower().startswith("score"):
                continue
            # Only check a fully itemised table, so a summarised one is
            # skipped rather than guessed at.
            if len(rows) * 5 != int(left_max):
                continue
            sums = (sum(int(r[1]) for r in rows), sum(int(r[2]) for r in rows))
            if sums != (int(left), int(right)):
                line = text[:heading.start()].count("\n") + 1
                fail("score-total", f"{f}:{line}",
                     f"the breakdown table sums to {sums[0]} and {sums[1]} "
                     f"but '{label.strip()}' states {left} and {right}")


# 4. Every scored review must be reachable from a guide.
#
# The whole claim of this repository is that its guides are tested, so a review
# nothing links to is evidence a reader cannot get to. The Thornfield prompting
# review sat unlinked while the README quoted its scores on the front page: two
# guides pointed at the worked example and neither pointed at the scoring.
GUIDES = [f for f in MD if f.startswith("guides/")]
EVALUATIONS = [f for f in MD if f.startswith("evaluations/")]
if GUIDES and EVALUATIONS:
    guide_text = "".join(read(g) for g in GUIDES)
    for ev in EVALUATIONS:
        if os.path.basename(ev) not in guide_text:
            fail("review-unreachable", ev,
                 "no guide links this review, so a reader cannot reach the "
                 "scoring for the guide it tests")


# Report
if failures:
    print(f"Repository checks failed ({len(failures)} issue(s)):\n")
    for check, path, detail in failures:
        print(f"  [{check}] {path}")
        print(f"      {detail}")
    print("\nFix the issues above, or adjust the check in "
          ".github/scripts/repo_checks.py if it is a false positive.")
    sys.exit(1)

print(f"All repository checks passed ({len(MD)} Markdown files scanned).")
sys.exit(0)
