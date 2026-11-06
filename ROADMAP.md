# Roadmap

This is where I'm heading. It isn't a promise to publish everything listed.

## Pilot readiness assessment: next evidence, not more features

The [V2 tool](https://shaunmarsden.github.io/practical-ai-adoption/pilot-readiness/) has been deployed and smoke-tested against fictional inputs. Its [case study](case-studies/ai-pilot-readiness-assessment.md) records why the first version's quality-review question produced false reassurance and how V2 changed the rules.

The remaining gap is **independent judgement and real-user understanding**. The adversarial cases and software checks were carried out within the same AI-assisted development process. They do not show that an outside reviewer agrees with the methodology or that a manager understands what the result permits.

Before describing this as a validated readiness method:

- Ask someone independent of the implementation to judge a small, varied fictional case set before seeing the tool's output. Keep disagreements.
- Observe whether a non-technical user understands the three operational decisions, particularly that a complete record is **not approval**.
- Only consider further criteria or automation if those reviews reveal a material weakness. Do not add a new framework or claim real-world outcome evidence.

## Guided workbench

The [AI Adoption Workbench](docs/workbench/index.html) provides a browser notebook through existing guidance, with a separate V2 link and local text export. It adds no readiness rules. Automated software checks do not fill the independent-review or real-use gaps below. Observe a non-technical reader using it before claiming that it makes the journey easier.

## Now

The original scored-guide tests identified two evidence gaps, and the seven more recent guides have not been scored. The repository has expanded since that first roadmap was written.

- **Nobody outside this project has scored anything here.** Two of the three starter reviews for [You Have Been Given AI at Work](guides/you-have-been-given-ai-at-work.md) end on the same next step: someone other than me scoring the same outputs against the same rubric. The third, the internal update starter, ends on a different open question: does it hold on notes with a different kind of conflict? Its own repeat run left that unsettled. The action list and agenda reviews now repeat their runs, and that rules out chance differences between runs, but nothing else. If one scorer is biased the same way every time, it looks just like a real effect.
- **No guide here has a logged real use of its own.** Both records in [evidence](evidence/) say so in their first lines: they record real use, but not of the current guides. The [fact-check failure](evidence/real-use-ai-assisted-fact-check-failure.md) is closer to what these guides are about, and it still doesn't test one.

## Next

- Log one real, low-risk use of any guide when a suitable task comes up.
- Record feedback if someone outside the project tries a guide without being asked.
- Re-test the internal update starter on notes with a different kind of conflict. Its two-column version failed, the rewrite fixed that, and an ordinary prompt still matched it. So what the starter is worth is still an open question.

## Later

The research and private-knowledge-base transfer added seven practical team and organisational guides. They are listed separately in [Evidence Status](EVIDENCE-STATUS.md) because their fictional illustrations were not run or scored.

Do not assume that more guidance is evidence of adoption. Before adding another topic, check the [six-stage coverage audit](research/ai-adoption-pathway-audit.md), existing guides and an actual reader need. Prioritise a clear route through the material, external review of the Pilot Readiness Assessment and one appropriately authorised low-risk use of an existing guide. Don't invent an exercise merely to fill an empty evidence column.
