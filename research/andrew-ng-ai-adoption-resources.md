# Andrew Ng's AI adoption and transformation resources

**Reviewed:** 2nd November 2026. This note maps eight PDFs supplied for review to the existing Practical AI Adoption guides. It links to the publisher's material rather than republishing the PDFs, slides or diagrams.

## What the files are

| Supplied filename | Document | How it relates to the others |
| --- | --- | --- |
| `W1.pdf` | *AI for Everyone*, Week 1: **What is AI** (38 slide pages) | Foundations: machine learning, generative AI, data quality and limits |
| `W2.pdf` | *AI for Everyone*, Week 2: **Building AI Projects** (33 slide pages) | Project selection, ML/data science workflows, data and team roles |
| `W3.pdf` | *AI for Everyone*, Week 3: **Building AI in Your Company** (44 slide pages) | Business examples, team roles and the five-part transformation playbook |
| `W4.pdf` | *AI for Everyone*, Week 4: **AI and Society** (27 slide pages) | Hype, performance limits, bias, adversarial attacks, social and employment implications |
| `DeepLearning_AI-Playbook_v6.pdf` | Andrew Ng, *AI Transformation Playbook* (6 pages) | Main DeepLearning.AI-branded edition |
| `DeepLearning_AI-Playbook_v6 (1).pdf` | Same 6-page PDF | **Exact byte-for-byte duplicate** of the preceding file (SHA-256 `0cef7ae3550e026a8947fcf0fd1f12070aef91f285d1269c125affd414fbcfb9`) |
| `LandingAI_Transformation_Playbook_11-19.pdf` | Landing AI, *AI Transformation Playbook* (5 pages) | Another layout/edition covering substantially the same five-part method |
| `AI-Transformation-Playbook.pdf` | Landing AI, *AI Transformation Playbook* (12 pages) | Longer-layout edition of that same playbook, including its diagrams |

**Primary publisher links:** [DeepLearning.AI's *AI for Everyone* course and slide-download page](https://www.deeplearning.ai/courses/ai-for-everyone); [Landing AI's published transformation playbook PDF](https://landing.ai/wp-content/uploads/2018/12/AI-Transformation-Playbook-v8.pdf); [Andrew Ng's 2018 introduction to the playbook](https://medium.com/@andrewng/introducing-the-ai-transformation-playbook-58ccad4393e9).

The publisher states that its slide download may not reflect the latest videos. The business and technology examples in the older playbook are historical. They are **not** current statistics or proof that the same organisational structure is right for every workplace.

## Themes useful to this repository

### 1. Find a feasible, meaningful first project

The transformation playbook recommends pilots that are technically feasible, have measurable objectives and can gain early traction, rather than choosing only the largest imagined opportunity. Week 2 distinguishes a machine-learning build process (collect data, train, deploy, maintain) from a data-science project (collect, analyse, suggest changes, repeat).

**Existing place for this:** [Find a good first AI use case](../guides/finding-a-good-first-ai-use-case.md). Our guide should still ask whether an ordinary rule-based process, rather than AI, is sufficient. The playbook's illustrative 6-12-month timeline is not a requirement for our much smaller workplace tests.

### 2. Understand the work and data before choosing technology

Week 1 discusses missing values, incorrect labels and the limits of treating data quantity as usefulness. Week 2 starts with workflow steps and the difference between identifying patterns and implementing an AI decision. These are helpful foundations for asking what the actual input, output, error and review step are.

**Existing place for this:** [Turn a prompt into a useful workflow](../guides/from-a-prompt-to-a-useful-workflow.md) and [Before you put work data into AI](../guides/before-you-put-work-data-into-ai.md). Week 1's simple model-training explanations should not be confused with instructions for using a modern hosted generative-AI assistant.

### 3. Build capability across roles, not just through access to tools

The playbook proposes an internal AI capability, training for executives, business leaders and technical staff, and clear communication. These are the author's recommendations, chiefly written for large enterprises, **not universal staffing ratios**. Week 3 also identifies separate software, ML, data engineering and product responsibilities.

**Existing place for this:** [The gap between AI access and actual use](../guides/the-gap-between-ai-access-and-actual-use.md) and [Why AI projects stall after the demo works](../guides/why-ai-projects-stall-after-the-demo-works.md). For a small team, the useful principle is named ownership, relevant skills and support, not a requirement to create a central AI department.

### 4. Make strategy informed by real experience

The playbook's five steps are:

1. Execute pilot projects to gain momentum.
2. Build an in-house AI team.
3. Provide broad AI training.
4. Develop an AI strategy.
5. Develop internal and external communications.

Andrew Ng argues that early practical experience can improve later strategic choices. This is useful as an *ordering hypothesis*, not a universal sequence or evidence that strategy should always wait. Privacy, permissions, acceptable risk and organisational accountability still matter **before** a live pilot.

**Existing place for this:** [AI Pilot Readiness Assessment V2](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/) and its [documented methodology](../tools/pilot-readiness/v2/METHODOLOGY.md). Our tool checks reported readiness for a proposed expansion; it does not certify a transformation programme.

### 5. Treat social risk and adverse outcomes as real design questions

Week 4 explicitly covers bias, adversarial attacks, misuse, privacy and effects on jobs. Its illustrated examples are teaching cases; do not transplant their older performance claims into current risk estimates.

**Existing place for this:** [When not to use AI](../guides/when-not-to-use-ai.md) and [Before you let AI tools work together unsupervised](../guides/before-you-let-ai-tools-work-together-unsupervised.md). The practical application is to test representative mistakes, assign human responsibility and refuse high-consequence automation without adequate controls.

## What this source collection does *not* establish

- It is a set of educational and opinionated frameworks, not an independent controlled evaluation of adoption methods.
- Multiple branded PDFs and slide presentations repeat **one author's framework**. They must not be counted as independent corroborating sources.
- The 2018 economic projections, technology examples and suggested training-hour bands are time-bound or context-dependent; none is presented here as a current recommendation.
- The source material is copyrighted. This repository **links and summarises with attribution**; it does not mirror the PDFs, branded diagrams or course slides.
- The uploaded PDFs were inspected for this reading note, but any future claim requiring up-to-date figures or policy needs a separate, current original source.

## Suggested reading path

If you're **new to AI at work**, start with the four sections of [AI for Everyone](https://www.deeplearning.ai/courses/ai-for-everyone/), especially Weeks 1, 2 and 4. Then try [one ordinary task](../guides/you-have-been-given-ai-at-work.md).

If you **own a team's pilot**, read Week 3 and the [transformation playbook](https://landing.ai/wp-content/uploads/2018/12/AI-Transformation-Playbook-v8.pdf), then use our [first-use-case guide](../guides/finding-a-good-first-ai-use-case.md), [evaluation guide](../guides/how-to-tell-whether-ai-actually-helped.md) and [pilot assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/).

This is an attributed *reading guide*, not a replacement for the original material and not an endorsed DeepLearning.AI or Landing AI publication.
