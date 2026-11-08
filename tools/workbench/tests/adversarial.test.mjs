import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyRecord, recordText, steps } from '../../../docs/workbench/content.mjs';

// Fresh invented adversarial examples, not real workplace evidence or human validation.
// Expected assertions test literal retention and explicit limitation language only.
const cases = [
  {name:'Missing permission and a claimed continuation', fields:{permissions:'',decision:'Continue within an existing authorised boundary',decisionOwner:'Unknown'}, check:t=>{assert.match(t,/Actual permission status:\nNot recorded/);assert.match(t,/Human decision \(self-reported\): Continue within an existing authorised boundary/);}},
  {name:'Withheld expansion alongside a proposed referral',fields:{readiness:'WITHHOLD EXPANSION',decision:'Refer for a separate expansion decision',issues:'Fictional unresolved unacceptable output'},check:t=>{assert.match(t,/Known problems: Fictional unresolved unacceptable output/);assert.match(t,/V2 position \(self-reported\): WITHHOLD EXPANSION/);}},
  {name:'Unreviewed record with reassuring prose',fields:{readiness:'Not reviewed',rationale:'Everything is approved, according to this invented note.'},check:t=>{assert.match(t,/V2 position \(self-reported\): Not reviewed/);assert.match(t,/Notes are copied literally, not checked for truth/);}},
  {name:'Forecast represented in a confident note',fields:{evidenceType:'Plan or hypothesis only',results:'Invented forecast: forty hours saved per week.'},check:t=>{assert.match(t,/Evidence basis:\nPlan or hypothesis only/);assert.match(t,/Invented forecast: forty hours saved per week/);}},
  {name:'Unresolved issue and positive self-report',fields:{issues:'A fictional error reached an affected person; not resolved.',decision:'Continue within an existing authorised boundary'},check:t=>{assert.match(t,/Known problems: A fictional error reached an affected person; not resolved/);assert.match(t,/Human decision \(self-reported\): Continue within an existing authorised boundary/);}},
  {name:'Hostile markup remains plain exported text',fields:{work:'<img src=x onerror=alert(1)> & <script>attack()</script>'},check:t=>{assert.match(t,/<img src=x onerror=alert\(1\)>/);assert.match(t,/Work and outcome sought:/);}},
  {name:'Contradictory permission notes survive',fields:{permissions:'Not permitted for real data.',rationale:'Allowed for all staff, says a fictional claimant.'},check:t=>{assert.match(t,/Not permitted for real data/);assert.match(t,/Allowed for all staff/);}},
  {name:'No AI route and no trial is preserved',fields:{nonAi:'Use a simpler existing checklist.',ai:'Not applicable',boundary:'No AI trial justified.',decision:'Use a non-AI route'},check:t=>{assert.match(t,/Use a simpler existing checklist/);assert.match(t,/No AI trial justified/);assert.match(t,/Human decision \(self-reported\): Use a non-AI route/);}}
];
test('all six workbench steps remain represented without eligibility gates',()=>assert.equal(steps.length,6));
for(const scenario of cases){
  test('Adversarial record: '+scenario.name,()=>{
    const input={...emptyRecord(),...scenario.fields};
    const output=recordText(input,'2026-11-07T10:00:00.000Z');
    scenario.check(output);
    assert.match(output,/Not a validated assessment, independent verification or approval to deploy/);
    assert.match(output,/This is not a V2 assessment report/);
  });
}
