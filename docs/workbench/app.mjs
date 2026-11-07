const stages = [
  {title:"Describe the work", help:"Start with the actual task, not the tool you hope to use.", fields:[
    ["task","What work is being done?","textarea","Name the task, inputs and expected output."],
    ["current","How does it work today?","textarea","Include hand-offs, checking and exceptions."],
    ["frequency","How often does it happen?","text","Estimate or note that you do not know."],
    ["people","Who is involved?","text","Use role names, not personal details."],
    ["problem","What would you like to improve?","textarea","State an observable outcome rather than assumed savings."]
  ], links:[["Map the workflow","../../guides/map-a-workflow-before-choosing-ai.md"],["Choose a use case","../../guides/finding-a-good-first-ai-use-case.md"]]},
  {title:"Compare the options", help:"Do not assume AI is the best choice. Record why each option is or is not suitable.", fields:[
    ["simplify","Could the process be simplified without software?","textarea","What would change?"],
    ["existing","Could an existing tool or conventional automation solve it?","textarea","Include available permissions and costs."],
    ["ai","What could AI assist with, if anything?","textarea","Specify draft, review and action boundaries."],
    ["preferred","Current preferred option","select","No option is treated as approved.",["Undecided","No change","Simplify the process","Existing software or conventional automation","Training or support","AI assistance with human review","Controlled automation"]],
    ["reason","What evidence supports that preference?","textarea","Record gaps and trade-offs."]
  ], links:[["Compare AI with other improvements","../../guides/compare-ai-with-other-ways-to-improve-work.md"],["When not to use AI","../../guides/when-not-to-use-ai.md"]]},
  {title:"Plan a controlled trial", help:"Only plan work that your organisation has authorised. A plan is not permission to run it.",fields:[
    ["scope","What is in and out of scope?","textarea","Use invented or otherwise permitted information."],
    ["permission","Which tool and data uses have been approved?","textarea","If unknown, write unknown and do not proceed with real data."],
    ["review","Who reviews the output and has stop authority?","textarea","Use role names."],
    ["baseline","What comparable baseline will you capture?","textarea","Include total effort and quality."],
    ["stop","What would stop the trial?","textarea","Include exceptions and escalation."]
  ],links:[["Run a controlled team pilot","../../guides/run-a-controlled-team-ai-pilot.md"],["Map permissions","../../guides/map-ai-tool-actions-and-permissions.md"]]},
  {title:"Measure what happened", help:"Leave this stage incomplete until results have actually been observed. A forecast is not a finding.",fields:[
    ["evidenceType","Status of the evidence","select","Do not mislabel estimates as actual outcomes.",["Not measured","Forecast only","Observed in a trial","Independently checked"]],
    ["before","Baseline effort and quality","textarea","Include sample size and method where known."],
    ["after","Trial effort and quality, including checking and rework","textarea","Keep like-for-like comparison limits visible."],
    ["limitations","What went wrong or could distort the comparison?","textarea","Record failed attempts as well as successes."],
    ["capacity","Was any usable capacity or realised benefit established?","textarea","Do not automatically turn time saved into money."]
  ],links:[["Measure the whole task","../../guides/how-to-tell-whether-ai-actually-helped.md"],["Capacity and value","../../guides/measure-ai-capacity-and-realised-value.md"]]},
  {title:"Review readiness",help:"This page cannot calculate a V2 outcome. Use the separate assessment and preserve its actual conclusion.",fields:[
    ["assessment","Pilot Readiness Assessment V2 status","select","Only select completed if you have actually performed the assessment.",["Not started","Further evidence needed","Assessment completed, decision pending","Expansion withheld","Offline experiment only"]],
    ["v2reference","Reference to a separately completed V2 assessment","text","Use a safe local reference; do not paste confidential evidence."],
    ["issues","What material issues or missing evidence remain?","textarea","Self-reported, not verified."],
    ["owner","Who must review the source evidence?","text","Role or responsible function."]
  ],links:[["Open V2 readiness assessment","../pilot-readiness/"],["V2 method and limitations","../../tools/pilot-readiness/v2/METHODOLOGY.md"]]},
  {title:"Record the human decision",help:"The workbench proposes nothing automatically. A human decision, including a refusal or deferral, is an ordinary outcome.",fields:[
    ["recommendation","What next action is proposed, if any?","textarea","This is a proposal, not an approval."],
    ["decision","Human decision status","select","Do not select approved without actual authority.",["Not decided","Deferred","Declined","Approved by responsible person"]],
    ["decisionOwner","Responsible decision-maker or role","text","Avoid personal details."],
    ["basis","Decision evidence and conditions","textarea","If approved, record the scope, conditions and independent evidence reference."],
    ["next","Owner and next review point","textarea","Include gaps that must be resolved."]
  ],links:[["Check for wider adoption gaps","../../guides/diagnose-why-team-ai-adoption-is-not-working.md"]]}
];
const data = Object.fromEntries(stages.map((s,i)=>[String(i),{}]));
let current = 0;
const $ = id=>document.getElementById(id);
const labels = stages.map(s=>s.title);
function snapshot(){return {kind:"practical-ai-adoption-workbench",version:1, status:"Self-reported worksheet; no independent verification or operational approval", stages:stages.map((s,i)=>({title:s.title,answers:Object.fromEntries(s.fields.map(f=>[f[1],data[i][f[0]]||"Not recorded"]))}))};}
function status(){const filled=stages.reduce((n,s,i)=>n+s.fields.filter(f=>Boolean((data[i][f[0]]||"").trim())).length,0);const total=stages.reduce((n,s)=>n+s.fields.length,0);$("status").textContent=filled+" of "+total+" fields recorded. Missing fields remain unknown; this is not a readiness score.";}
function field(spec){const [key,label,type,hint,options]=spec;const wrap=document.createElement("div");wrap.className="field";const id="field-"+key;const l=document.createElement("label");l.htmlFor=id;l.textContent=label;wrap.append(l);const small=document.createElement("small");small.textContent=hint;wrap.append(small);const el=document.createElement(type==="textarea"?"textarea":type==="select"?"select":"input");el.id=id;el.name=key;el.maxLength=2000;if(type==="text")el.type="text";if(type==="select"){for(const text of options){const o=document.createElement("option");o.value=text;o.textContent=text;el.append(o);}}el.value=data[current][key]||"";el.addEventListener("input",()=>{data[current][key]=el.value;status();$("record").hidden=true;});wrap.append(el);return wrap;}
function render(){const s=stages[current];$("count").textContent="Stage "+(current+1)+" of "+stages.length;$("stage-title").textContent=s.title;$("stage-help").textContent=s.help;const form=$("stage-form");form.replaceChildren(...s.fields.map(field));const nav=$("steps");nav.replaceChildren();stages.forEach((step,i)=>{const b=document.createElement("button");b.type="button";b.textContent=(i+1)+". "+step.title;if(i===current)b.setAttribute("aria-current","step");b.addEventListener("click",()=>go(i));nav.append(b);});const res=$("resources");res.replaceChildren();for(const [label,path] of s.links){const a=document.createElement("a");a.textContent=label;a.href=path.startsWith("../pilot-readiness")?path:"https://github.com/shaunmarsden/practical-ai-adoption/blob/main/"+path.replace(/^\.\.\/\.\.\//,"");a.target="_blank";a.rel="noopener noreferrer";res.append(a);}$("previous").disabled=current===0;$("next").disabled=current===stages.length-1;status();}
function go(i){current=i;render();$("stage-title").focus();}
$("previous").addEventListener("click",()=>go(current-1));$("next").addEventListener("click",()=>go(current+1));
$("stage-form").addEventListener("submit",e=>e.preventDefault());
$("review").addEventListener("click",()=>{const out=$("record");out.textContent=JSON.stringify(snapshot(),null,2);out.hidden=false;out.focus();});
$("download").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(snapshot(),null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="ai-adoption-workbench-record.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$("print").addEventListener("click",()=>{const out=$("record");out.textContent=JSON.stringify(snapshot(),null,2);out.hidden=false;window.print();});
$("clear").addEventListener("click",()=>{if(!window.confirm("Clear all answers? Save a JSON copy first if needed."))return;for(const key of Object.keys(data))data[key]={};go(0);$("record").hidden=true;});
render();
