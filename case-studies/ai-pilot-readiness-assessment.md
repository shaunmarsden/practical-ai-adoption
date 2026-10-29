# Case study: an AI pilot checker that needed its own checking

**Project:** [AI Pilot Readiness Assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/)  
**Type:** Independently developed, open-source demonstration, built with AI coding assistance  
**Status:** V2 deployed; production smoke tests reported on 26 October 2026 using fictional scenarios, not real organisational deployments

## The business question

An AI pilot can produce impressive demonstrations while leaving the practical questions unanswered. Did it meet an agreed business outcome? Were serious errors acceptable? Does someone have permission, authority and the ability to stop it? Is the workflow supportable after the trial?

I wanted a simple way for a manager to collect answers and see what needs checking **before wider use is considered**, without implying that an online form could approve a rollout.

## What I built

The [browser-based assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/) works on GitHub Pages, with no account, AI API or server handling assessment responses. It asks ten questions about outcomes, comparable baselines, current testing, acceptable quality, ownership, human oversight, data permissions, recovery, user readiness and ongoing monitoring.

It captures reported unresolved material issues separately and generates a downloadable PDF with the decision, issue owner, required action and evidence notes. Assessments can be exported as JSON; older V1 records are retained but **not** automatically treated as satisfying V2's stronger checks.

The rules are deterministic. A reported unresolved material issue, or a No to an operational condition, means **WITHHOLD EXPANSION**. Unknown or unsupported evidence means **FURTHER ASSESSMENT REQUIRED**. A fully completed self-reported record means **COMPLETE RECORD - HUMAN DECISION REQUIRED**, never approval. A bounded synthetic/public offline exercise has a separate non-rollout route.

## What went wrong in the first version

V1 asked whether a named person had reviewed quality. A fictional example recorded that the review had happened **and** had found unresolved critical errors. Because the response to "was it reviewed?" was Yes, the checker returned READY FOR HUMAN REVIEW with no blocker.

The code was following its rule. The rule was answering the wrong question.

An adversarial review recorded 30 deliberately difficult fictional cases. Of these, 23 had observable adverse facts that V1 did not adequately capture in its decision. Those cases were designed to expose weaknesses and **are not a real-world failure rate**.

## What changed in V2

Rather than adding an AI model to guess the meaning of notes, I revised the criteria so Yes refers to a **current acceptable condition** for the intended use, not the existence of a document or completed activity. The tool now asks directly about unresolved material issues, current permissions, effective oversight, tested recovery, real user acceptance, operating costs, maintenance and incident response.

With those adverse facts entered faithfully into V2's structured fields, all **23 of the 23 observable-risk regression cases** now return WITHHOLD EXPANSION. Another fictional case deliberately uses false structured answers and still appears complete. The tool cannot independently detect fabricated evidence.

## Testing and release

The repository documents Python/browser decision parity, automated browser journeys at desktop and mobile sizes, fictional adverse cases, PDF generation checks and CI results. After V2 was merged, a production smoke test reported that the live GitHub Pages assets matched the V2 merge, the main assessment journeys and downloads worked, and no answer uploads were observed.

These checks establish the **software's tested behaviour**, not that the ten-question method predicts business success or that real users interpret every result correctly. There has been no external methodological validation, real-manager study or verified client outcome.

## What this project demonstrates

The useful lesson is about decision design, not a particular technology. A tool can behave exactly as coded and still mislead when the question it asks is too weak. This project shows the value of testing the rule itself, retaining failed examples and making the human decision boundary explicit.

**Try the [live assessment](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/)** with its clearly fictional example, or inspect the [methodology](../tools/pilot-readiness/v2/METHODOLOGY.md), [V1-to-V2 comparison](../tools/pilot-readiness/v2/comparison.md) and [test record](../tools/pilot-readiness/v2/VALIDATION.md).

*This is an independently developed demonstration using fictional scenarios. No commercial results, deployment approvals, third-party verification or vendor endorsement are claimed.*
