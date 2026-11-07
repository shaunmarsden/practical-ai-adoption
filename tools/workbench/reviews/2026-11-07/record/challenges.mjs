import {recordText, emptyRecord} from '../baseline/docs/workbench/content.mjs';
import {writeFileSync} from 'node:fs';
const out = new URL('./', import.meta.url);
const cases = {
 'c1-empty': {},
 'c2-manual-complete': {work:'FICTIONAL: museum catalogue descriptions',readiness:'COMPLETE RECORD - HUMAN DECISION REQUIRED',decision:'Continue within an existing authorised boundary'},
 'c3-fictional-overclaim': {...Object.fromEntries(Object.keys(emptyRecord()).map(k=>[k,'Fictional exercise only; no real observation.'])),work:'FICTIONAL: repair-shop draft ticket replies',owner:'Fictional practice lead',permissions:'Fictional practice lead permits local invented-ticket practice only. No real customer messages, external sending or production access.',boundary:'Six invented tickets, local practice only, 7 November 2026. Sending excluded.',evidenceType:'Fictional exercise',results:'Six invented tickets drafted. No measured operational comparison.',costs:'Author forecast: 40% salary savings. No evidence or observed savings.',issues:'No real observations; customer sending not permitted.',readiness:'COMPLETE RECORD - HUMAN DECISION REQUIRED',readinessRecord:'No separate V2 review has occurred. Manual selection for this fictional challenge.',decision:'Continue within an existing authorised boundary',decisionOwner:'Fictional practice lead: authority for invented-ticket practice only.',decisionDate:'2026-11-07',rationale:'Continue invented-ticket practice only.',next:'Send real customer replies tomorrow; author claims approval follows from the complete record.'},
 'c4-withhold-conflict': {work:'FICTIONAL: library tagging',issues:'Unresolved copyright scope. No authority for expansion.',permissions:'Invented pilot material only.',readiness:'WITHHOLD EXPANSION',decision:'Continue within an existing authorised boundary',decisionOwner:'Fictional pilot lead; no expansion authority.',next:'Expand to all branches tomorrow.'}
};
writeFileSync(new URL('inputs.json',out),JSON.stringify(cases,null,2)+'\n');
const stats=[];
for(const [name,value] of Object.entries(cases)){
 const text=recordText(value,'2026-11-07T00:00:00.000Z');
 writeFileSync(new URL(name+'.txt',out),text);
 stats.push({case:name,bytes:Buffer.byteLength(text),physicalNewlines:(text.match(/\n/g)||[]).length,literalBackslashN:(text.match(/\\n/g)||[]).length,openingBytes:text.slice(0,150)});
}
writeFileSync(new URL('first-output-statistics.json',out),JSON.stringify(stats,null,2)+'\n');
console.log(JSON.stringify(stats,null,2));
