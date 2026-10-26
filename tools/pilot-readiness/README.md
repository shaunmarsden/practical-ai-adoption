# AI pilot readiness checker

A small, deterministic Python decision aid for checking whether an AI workflow pilot has enough recorded evidence to **consider** wider use. No model calls, dependencies or uploads. Run locally with Python 3.

It checks ten items, including baseline, representative test results, quality review, data approval, human oversight, named ownership, rollback, training and monitoring.

## Run it

From this folder:

```bash
python pilot_readiness.py examples/fictional-not-ready.json
python -m unittest discover -s tests -v
```

To assess your own pilot, copy the example JSON and replace **every** status and note with your own information. Use `yes`, `no` or `unknown`. For `yes`, write a specific evidence note, ideally naming the record or decision you can inspect. The programme checks presence, **not truth**.

## Decisions

- **DO NOT EXPAND**: at least one essential control (quality review, owner, oversight, data approval or rollback) is missing or unknown.
- **LIMITED PILOT ONLY**: essential controls are recorded but a wider rollout requirement is incomplete. This is not permission to continue a trial without its own approvals.
- **READY FOR HUMAN REVIEW**: all ten items are marked yes with notes. A qualified person must still examine the underlying records and authorise any expansion.

The ten-item checklist and gates are **this project's suggested decision aid**, not a named, validated OpenAI, Anthropic or Google standard. The evidence is self-reported. The tool cannot prove financial benefit, legal compliance, user acceptance or security.

The example is fictional and intentionally lacks data approval. Eight tests cover decision paths and validation. They demonstrate the code's specified behaviour, not effectiveness in real workplaces.

For related published advice, see [official adoption resources](../../research/official-ai-adoption-resources.md), [selecting a first use case](../../guides/finding-a-good-first-ai-use-case.md) and [why pilots stall](../../guides/why-ai-projects-stall-after-the-demo-works.md).
