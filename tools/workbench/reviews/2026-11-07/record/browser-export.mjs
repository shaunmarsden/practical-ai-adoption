import { chromium } from 'playwright';
import {readFileSync,writeFileSync} from 'node:fs';
import {recordText,steps} from '../baseline/docs/workbench/content.mjs';
const folder=new URL('./',import.meta.url);
const inputs=JSON.parse(readFileSync(new URL('inputs.json',folder),'utf8'))['c2-manual-complete'];
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({acceptDownloads:true});
 await page.goto('http://127.0.0.1:8768/workbench/');
 for (let i=0;i<steps.length;i++) {
  await page.locator('#steps button').nth(i).click();
  for(const [id,,,kind] of steps[i].fields) {
   if(!(id in inputs))continue;
   if(Array.isArray(kind))await page.locator('#'+id).selectOption(inputs[id]);
   else await page.locator('#'+id).fill(inputs[id]);
  }
 }
 await page.locator('#review').click();
 const preview=await page.locator('#summary').innerText();
 writeFileSync(new URL('c2-browser-first-preview.txt',folder),preview);
 const pending=page.waitForEvent('download');
 await page.locator('#export').click();
 const download=await pending;
 await download.saveAs(new URL('c2-browser-first-download.txt',folder).pathname);
 const actual=readFileSync(new URL('c2-browser-first-download.txt',folder),'utf8');
 const stamp=actual.match(/^Exported: (.+)$/m)?.[1];
 const expected=recordText(inputs,stamp);
 const result={suggestedFilename:download.suggestedFilename(),downloadMatchesRecordText:actual===expected,exportedAt:stamp,status:await page.locator('#status').innerText(),physicalNewlines:(actual.match(/\n/g)||[]).length};
 writeFileSync(new URL('browser-first-result.json',folder),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result,null,2));
} catch(error) {
 writeFileSync(new URL('browser-first-error.txt',folder),String(error.stack||error)+'\n');
 throw error;
} finally {await browser.close();}
