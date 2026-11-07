import { chromium } from "playwright";
import assert from "node:assert/strict";

const browser = await chromium.launch({headless:true});
try {
  for (const width of [1280,320]) {
    const page = await browser.newPage({viewport:{width,height:850},acceptDownloads:true});
    const requests=[];
    page.on("request",r=>requests.push(r.url()));
    await page.goto("http://localhost:8765/workbench/");
    await assert.equal(await page.locator("h1").textContent(),"Understand the work before choosing AI.");
    await page.locator("#field-task").fill("Synthetic queue note summary");
    await page.locator("#next").click();
    await assert.equal(await page.locator("#stage-title").textContent(),"Compare the options");
    await page.locator("#field-reason").fill("No verified results yet");
    await page.locator("#steps button").last().click();
    await page.locator("#field-decision").selectOption("Deferred");
    await page.locator("#review").click();
    const record=JSON.parse(await page.locator("#record").textContent());
    assert.equal(record.stages[0].answers["What work is being done?"],"Synthetic queue note summary");
    assert.equal(record.stages[1].answers["What evidence supports that preference?"],"No verified results yet");
    assert.equal(record.stages[5].answers["Human decision status"],"Deferred");
    assert.match(record.status,/no independent verification/i);
    const downloadPromise=page.waitForEvent("download");
    await page.locator("#download").click();
    const download=await downloadPromise;
    assert.equal(download.suggestedFilename(),"ai-adoption-workbench-record.json");
    assert.equal(await page.locator("body").evaluate(el=>el.scrollWidth<=innerWidth),true,"No horizontal overflow");
    assert.equal(requests.filter(url=>!url.startsWith("http://localhost:8765/")).length,0,"No external requests");
    await page.reload();
    await page.locator("#review").click();
    const fresh=JSON.parse(await page.locator("#record").textContent());
    assert.equal(fresh.stages[0].answers["What work is being done?"],"Not recorded");
    await page.close();
    console.log("Workbench scenario passed at width",width);
  }
} finally {await browser.close();}
