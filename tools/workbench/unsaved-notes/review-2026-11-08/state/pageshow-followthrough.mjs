import { chromium } from 'playwright';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {emptyRecord} from '../../../docs/workbench/content.mjs';
const browser=await chromium.launch({headless:true});const p=await browser.newPage();
await p.addInitScript(()=>{window.__blobs=[];URL.createObjectURL=b=>(__blobs.push(b),'blob:test');URL.revokeObjectURL=()=>{};HTMLAnchorElement.prototype.click=function(){};});
await p.goto('http://127.0.0.1:8771/workbench/');await p.waitForSelector('#workbench:not([hidden])');
const original='Copper\r\nTin\rZinc\n';
const data={format:'practical-ai-adoption-workbench-draft',schema_version:1,saved_at:'2026-11-08T12:00:00.000Z',notice:'User-entered notes only. Saving or reopening this draft does not verify evidence, run V2 or grant approval.',notes:{...emptyRecord(),work:original}};
await p.locator('#reopen-draft').setInputFiles({name:'fiction.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await p.waitForFunction(()=>!document.getElementById('reopen-draft').disabled);
await p.evaluate(()=>{document.getElementById('work').value='Restored fictional note';document.getElementById('evidenceType').value='Fictional exercise';document.getElementById('decisionDate').value='2026-11-07';window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});
const changed=await p.locator('#changes-status').getAttribute('data-changed');const helper=await p.locator('#evidenceType-selection').innerText();const selected=await p.locator('#evidenceType').inputValue();
await p.locator('#save-draft').click();const captured=await p.evaluate(async()=>JSON.parse(await __blobs.at(-1).text()));assert.equal(captured.notes.work,'Restored fictional note');assert.equal(captured.notes.evidenceType,'Fictional exercise');assert.equal(captured.notes.decisionDate,'2026-11-07');
// A fresh reopen restores the original checkpoint, then exercise round-trip without intervening Save.
p.once('dialog',d=>d.accept());await p.locator('#reopen-draft').setInputFiles({name:'fiction.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await p.waitForFunction(()=>!document.getElementById('reopen-draft').disabled);
await p.evaluate(()=>{const el=document.getElementById('work');el.value='Restored fictional note';window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));el.value='Copper\nTin\nZinc\n';window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});
const reverted=await p.locator('#changes-status').getAttribute('data-changed');await p.locator('#save-draft').click();const revertedData=await p.evaluate(async()=>JSON.parse(await __blobs.at(-1).text()));assert.equal(reverted,'false');assert.equal(revertedData.notes.work,original);
const result={changed,selected,helper,capturedNotes:captured.notes,fullVisibleRevertChanged:reverted,exactRestoredString:revertedData.notes.work,limit:'Synthetic pageshow, not an actual bfcache restoration.'};writeFileSync(new URL('./pageshow-followthrough-result.json',import.meta.url),JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(result));await browser.close();
