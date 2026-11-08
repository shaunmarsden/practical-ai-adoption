import { chromium,firefox,webkit } from 'playwright';
import { writeFile } from 'node:fs/promises';
const results=[];
const label=process.env.PROBE_LABEL || 'new-run';
const base=process.env.BASE_URL || 'http://127.0.0.1:8771';
for(const [name,type] of Object.entries({chromium,firefox,webkit})){
 const browser=await type.launch({headless:true});const page=await browser.newPage();
 await page.goto(base+'/workbench/');await page.locator('#workbench').waitFor({state:'visible'});
 await page.locator('#steps button').nth(5).click();await page.locator('#decisionDate').click();await page.locator('#decisionDate').press('1');
 results.push({name,...await page.locator('#decisionDate').evaluate(el=>({value:el.value,badInput:el.validity.badInput,valid:el.validity.valid,changed:document.querySelector('#changes-status').dataset.changed}))});
 await page.screenshot({path:`test-results/unsaved-review/partial-date-${label}-${name}.png`});
 await browser.close();
}
await writeFile(`test-results/unsaved-review/partial-date-${label}.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
