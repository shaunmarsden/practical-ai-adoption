import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
import {parseDraft,draftText} from '../../../docs/workbench/draft.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url));
const read=async name=>fs.readFile(path.join(dir,name),'utf8');
const results=[];
async function test(name,fn){try{const detail=await fn();results.push({name,result:'PASS',detail});}catch(e){results.push({name,result:'FAIL',error:e.stack});}await fs.writeFile(path.join(dir,'browser-retry-results.json'),JSON.stringify(results,null,2)+'\n');}
// Guard the first execution log against accidental reruns.
await fs.writeFile(path.join(dir,'BROWSER-RETRY-STARTED.txt'),new Date().toISOString()+'\n',{flag:'wx'});
const good=['literal-notes','limit-12000','exact-4000000','date-first-year','date-leap','bom'];
const bad=['over-12000','over-4000000','date-nonleap','date-zero-year','duplicate-top','duplicate-note-escaped','missing-next','boolean-note','unknown-metadata','changed-notice','malformed'];
for(const name of good)await test(`module accept ${name}`,async()=>{const original=JSON.parse((await read(name+'.json')).replace(/^\uFEFF/,''));const notes=parseDraft(await read(name+'.json'));assert.deepEqual(notes,original.notes);assert.deepEqual(parseDraft(draftText(notes)),notes);});
for(const name of bad)await test(`module reject ${name}`,async()=>{const text=await read(name+'.json');assert.throws(()=>parseDraft(text));}); // replaced below before execution
let browser;
try{
browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage();
let accept=true,dialogs=0;
page.on('dialog',async dialog=>{dialogs++;if(accept)await dialog.accept();else await dialog.dismiss();});
async function fresh(){await page.goto('http://127.0.0.1:8769/workbench/');await page.waitForSelector('#workbench:not([hidden])');}
async function snapshot(){return page.evaluate(()=>({notes:Object.fromEntries([...document.querySelectorAll('#panels textarea,#panels input,#panels select')].map(x=>[x.id,x.value])),step:document.querySelector('[aria-current="step"]')?.textContent,preview:document.querySelector('#summary').textContent,hidden:document.querySelector('#summary').hidden}));}
async function sentinel(){await fresh();await page.locator('#work').fill('Original fictional kelp-lantern stock check.  KEEP  ');await page.locator('#owner').fill('Night storekeeper');await page.locator('#steps button').nth(2).click();await page.locator('#permissions').fill('Unknown; no action authorised.');await page.locator('#steps button').nth(3).click();await page.locator('#issues').fill('Two labels unresolved.');await page.locator('#review').click();}
async function open(name){await page.locator('#reopen-draft').setInputFiles(path.join(dir,name+'.json'));await page.waitForFunction(()=>!document.querySelector('#reopen-draft').disabled);}
async function save(){const event=page.waitForEvent('download');await page.locator('#save-draft').click();const d=await event;return JSON.parse(await fs.readFile(await d.path(),'utf8'));}
await test('P01 browser literal save reload reopen save',async()=>{await fresh();await open('literal-notes');const first=await save();const expected=JSON.parse(await read('literal-notes.json')).notes;assert.deepEqual(first.notes,expected);await fs.writeFile(path.join(dir,'first-saved-draft.json'),JSON.stringify(first));await page.reload();await page.waitForSelector('#workbench:not([hidden])');await page.locator('#reopen-draft').setInputFiles(path.join(dir,'first-saved-draft.json'));await page.waitForFunction(()=>!document.querySelector('#reopen-draft').disabled);assert.deepEqual((await save()).notes,expected);assert.equal(await page.evaluate(()=>window.draftInjection),undefined);return {noteCount:Object.keys(expected).length};});
await test('P01 additional unrelated edit preserves CR LF',async()=>{await fresh();await open('literal-notes');await page.locator('#owner').fill('Fictional replacement role');const actual=(await save()).notes;const expected=JSON.parse(await read('literal-notes.json')).notes;expected.owner='Fictional replacement role';assert.deepEqual(actual,expected);});
for(const name of bad)await test('P02-P05 browser atomic rejection '+name,async()=>{await sentinel();const before=await snapshot();const oldDialogs=dialogs;await open(name);assert.deepEqual(await snapshot(),before);assert.equal(dialogs,oldDialogs);assert.match(await page.locator('#draft-status').textContent(),/Could not reopen/);});
for(const name of ['limit-12000','exact-4000000','date-first-year','date-leap'])await test('P02-P04 browser valid '+name,async()=>{await sentinel();await open(name);assert.deepEqual((await save()).notes,JSON.parse(await read(name+'.json')).notes);});
await test('P06 replacement cancel',async()=>{await sentinel();const before=await snapshot(),count=dialogs;accept=false;await open('literal-notes');accept=true;assert.equal(dialogs,count+1);assert.deepEqual(await snapshot(),before);});
await test('P07 no-file change adapter',async()=>{await sentinel();const before=await snapshot();await page.locator('#reopen-draft').setInputFiles([]);assert.deepEqual(await snapshot(),before);return 'Empty file list exercises cancelled/no-selection branch; native OS picker cancel itself not automated.';});
await test('P08 delayed read with newer edit',async()=>{await sentinel();await page.evaluate(()=>{const original=File.prototype.arrayBuffer;File.prototype.arrayBuffer=function(){const file=this;return new Promise((resolve,reject)=>{window.releaseDraftRead=()=>original.call(file).then(resolve,reject);});};});await page.locator('#reopen-draft').setInputFiles(path.join(dir,'literal-notes.json'));await page.waitForFunction(()=>typeof window.releaseDraftRead==='function');await page.locator('#steps button').nth(0).click();await page.locator('#work').fill('Newer fictional edit typed during the delayed read: KEEP THIS.');await page.locator('#steps button').nth(4).click();const before=await snapshot();await page.evaluate(()=>window.releaseDraftRead());await page.waitForFunction(()=>!document.querySelector('#reopen-draft').disabled);assert.deepEqual(await snapshot(),before);assert.match(await page.locator('#draft-status').textContent(),/Notes changed/);});
await test('P09 read error',async()=>{await sentinel();const before=await snapshot();await page.evaluate(()=>{File.prototype.arrayBuffer=()=>Promise.reject(new Error('Fictional disk read failure'));});await open('literal-notes');assert.deepEqual(await snapshot(),before);assert.match(await page.locator('#draft-status').textContent(),/Could not reopen/);});
await test('P10 repeated same input selection',async()=>{await sentinel();let count=dialogs;await open('literal-notes');await open('date-leap');assert.equal(dialogs,count+2);assert.deepEqual((await save()).notes,JSON.parse(await read('date-leap.json')).notes);});
await test('P11 save failure atomic',async()=>{await sentinel();const before=await snapshot();await page.evaluate(()=>{URL.createObjectURL=()=>{throw new Error('Fictional download failure');};});await page.locator('#save-draft').click();assert.deepEqual(await snapshot(),before);assert.match(await page.locator('#draft-status').textContent(),/could not start/);});
await test('P12 BOM',async()=>{await fresh();await open('bom');assert.deepEqual((await save()).notes,JSON.parse(await read('literal-notes.json')).notes);});
}catch(e){results.push({name:'browser harness',result:'ERROR',error:e.stack});await fs.writeFile(path.join(dir,'browser-retry-results.json'),JSON.stringify(results,null,2)+'\n');}finally{await browser?.close();}
console.log(JSON.stringify({total:results.length,pass:results.filter(x=>x.result==='PASS').length,failures:results.filter(x=>x.result!=='PASS')},null,2));
