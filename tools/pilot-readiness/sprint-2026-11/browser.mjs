import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import assert from "node:assert/strict";
import {
  assess,
  normaliseImport,
  MAX_IMPORT_BYTES,
} from "../../../docs/pilot-readiness/model-v2.mjs";
const cases = JSON.parse(
  await readFile(new URL("./cases.json", import.meta.url)),
).cases;
const dir = process.env.SPRINT_OUTPUT || "test-results/sprint-2026-11";
await mkdir(dir, { recursive: true });
const base = process.env.BASE_URL || "http://127.0.0.1:8765";
const results = [];
const browser = await chromium.launch({ headless: true, channel: "chromium" });
try {
  for (const width of process.env.ONLY_WIDTH
    ? [Number(process.env.ONLY_WIDTH)]
    : [1440, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      acceptDownloads: true,
    });
    const page = await context.newPage();
    const run = {
      width,
      cases: [],
      errors: [],
      requests: [],
      accessibility: [],
      overflow: [],
    };
    results.push(run);
    page.on("pageerror", (e) => run.errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") run.errors.push(m.text());
    });
    page.on("request", (r) =>
      run.requests.push({
        url: r.url(),
        method: r.method(),
        body: r.postData(),
      }),
    );
    await page.goto(base + "/pilot-readiness/");
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator(".skip")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.locator("#start").click();
    async function load(payload) {
      await page
        .locator("#import")
        .setInputFiles({
          name: "fictional-sprint.json",
          mimeType: "application/json",
          buffer: Buffer.from(JSON.stringify(payload)),
        });
      await page
        .getByRole("button", { name: "Replace assessment", exact: true })
        .click();
      await page.locator("#context-title").waitFor({ state: "visible" });
    }
    let lastExportBytes;
    async function exportRecord() {
      let d;
      try {
        [d] = await Promise.all([
          page.waitForEvent("download", { timeout: 10000 }),
          page.locator("#export").click({ timeout: 7000 }),
        ]);
      } catch (e) {
        await page.screenshot({
          path: `${dir}/export-timeout-${width}.png`,
          fullPage: true,
        });
        await writeFile(
          `${dir}/export-timeout-${width}.json`,
          JSON.stringify(
            {
              pilot: await page.locator("#pilot").inputValue(),
              message: await page.locator("#file-message").textContent(),
              formError: await page.locator("#form-error").textContent(),
              body: await page.locator("body").innerText(),
            },
            null,
            2,
          ),
        );
        throw e;
      }
      const path = await d.path();
      lastExportBytes = await readFile(path);
      return JSON.parse(lastExportBytes);
    }
    let caseIndex = 0;
    for (const c of cases.filter(
      (c) => !process.env.ONLY_CASE || c.id === process.env.ONLY_CASE,
    )) {
      // Keep independent case groups below Chromium's repeated-download limiter.
      // A real visitor saves one record; this suite saves many in rapid succession.
      if (caseIndex++ && (caseIndex - 1) % 6 === 0) {
        await page.reload();
        await page.locator("#start").click();
      }
      let expected;
      try {
        expected = assess(c.payload);
      } catch {}
      if (!expected) {
        await page
          .locator("#import")
          .setInputFiles({
            name: "invalid.json",
            mimeType: "application/json",
            buffer: Buffer.from(JSON.stringify(c.payload)),
          });
        await page.waitForFunction(() =>
          document
            .querySelector("#file-message")
            .textContent.startsWith("Import failed"),
        );
        run.cases.push({ id: c.id, invalidRejected: true });
        continue;
      }
      await load(c.payload);
      await page
        .getByRole("button", { name: "View result", exact: true })
        .click();
      await page.locator("#result-title").waitFor({ state: "visible" });
      const exported = await exportRecord();
      const decision = await page.locator("#result-title").innerText();
      run.cases.push({
        id: c.id,
        decision,
        decisionMatches: decision === expected.decision,
        exactRoundTrip: isDeepStrictEqual(exported, c.payload),
      });
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        width: innerWidth,
      }));
      if (dimensions.scroll > dimensions.width)
        run.overflow.push({ id: c.id, ...dimensions });
      if (
        ["SQ01", "SQ06", "SQ10", "SQ19", "SQ20", "SQ23", "SQ24"].includes(c.id)
      ) {
        const waiting = page.waitForEvent("download");
        await page.locator("#pdf").click();
        const download = await waiting;
        const stem = `${dir}/${c.id}-${width}`;
        await download.saveAs(stem + ".pdf");
        await writeFile(stem + ".json", JSON.stringify(c.payload, null, 2));
      }
      if (c.id === "SQ06") {
        await page.locator("#result-title").scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${dir}/issue-${width}.png` });
        run.accessibility.push({
          stage: "result",
          snapshot: await page.locator("#results").ariaSnapshot(),
          focusedHeading: await page
            .locator("#result-title")
            .evaluate((el) => el === document.activeElement),
        });
      }
    }
    // Malformed and oversized files must retain the existing record.
    await page.reload();
    await page.locator("#start").click();
    await load(cases[0].payload);
    const before = await exportRecord();
    for (const [name, body] of [
      ["malformed", "{"],
      ["oversized", " ".repeat(1000001)],
    ]) {
      await page
        .locator("#import")
        .setInputFiles({
          name: name + ".json",
          mimeType: "application/json",
          buffer: Buffer.from(body),
        });
      await page.waitForFunction(() =>
        document
          .querySelector("#file-message")
          .textContent.startsWith("Import failed"),
      );
      assert.deepEqual(await exportRecord(), before);
    }
    // Editing one field must not normalise another imported field.
    const original = structuredClone(
      cases.find((c) => c.id === "SQ19").payload,
    );
    await load(original);
    await page.locator('#steps [data-step="3"]').click();
    await page
      .locator("#note-quality_review")
      .fill("Fictional edited acceptance note.");
    original.evidence.quality_review.note = "Fictional edited acceptance note.";
    assert.deepEqual(await exportRecord(), original);
    await page.locator('#steps [data-step="1"]').click();
    await page
      .locator("#note-baseline")
      .fill("Fictional explicitly edited baseline.");
    original.evidence.baseline.note = "Fictional explicitly edited baseline.";
    assert.deepEqual(await exportRecord(), original);
    run.fieldEditingPreservesOtherImportedText = true;
    // Walk every condition with keyboard focus, fieldset names and native radio controls.
    await load(cases[0].payload);
    for (let n = 0; n < 10; n++) {
      await page.locator(`#steps [data-step="${n}"]`).click();
      const panel = page.locator(".question:visible");
      const h = panel.locator("h2");
      assert.equal(
        await h.evaluate((el) => el === document.activeElement),
        true,
      );
      assert.equal(await panel.locator("legend").count(), 1);
      assert.equal(await panel.locator("input[type=radio]").count(), 3);
      const controls = panel.locator("input:not([type=radio]),textarea");
      for (const el of await controls.all())
        assert.ok(await el.evaluate((e) => e.labels.length > 0));
      await panel.locator("input[value=unknown]").focus();
      await page.keyboard.press("ArrowUp");
      run.accessibility.push({
        condition: n + 1,
        legend: await panel.locator("legend").innerText(),
        labelled: true,
        headingFocused: true,
      });
    }
    // Generated size-boundary case, frozen intent: own exports must be importable.
    const source = {
      pilot: "Fictional near-limit migration",
      fictional: true,
      evidence: Object.fromEntries(
        Object.entries(cases[0].payload.evidence).map(([key, r]) => [
          key,
          { status: "unknown", note: r.note },
        ]),
      ),
      extension: "",
    };
    const initial = normaliseImport(source);
    source.extension = "X".repeat(
      MAX_IMPORT_BYTES - Buffer.byteLength(JSON.stringify(initial)) - 100,
    );
    const nearLimit = normaliseImport(source);
    await load(nearLimit);
    assert.deepEqual(await exportRecord(), nearLimit);
    assert.ok(lastExportBytes.length <= MAX_IMPORT_BYTES);
    run.boundaryExportBytes = lastExportBytes.length;
    await page
      .locator("#import")
      .setInputFiles({
        name: "own-export.json",
        mimeType: "application/json",
        buffer: lastExportBytes,
      });
    await page
      .getByRole("button", { name: "Replace assessment", exact: true })
      .click();
    await page.locator("#context-title").waitFor({ state: "visible" });
    assert.deepEqual(await exportRecord(), nearLimit);
    run.boundaryReimportExact = true;
    run.storage = await page.evaluate(() => ({
      local: Object.keys(localStorage),
      session: Object.keys(sessionStorage),
      cookie: document.cookie,
    }));
    run.onlyStaticLocalGets = run.requests.every(
      (r) =>
        r.url.startsWith(base + "/pilot-readiness/") &&
        r.method === "GET" &&
        !r.body,
    );
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(
    dir + "/browser-results.json",
    JSON.stringify(results, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      results.map((r) => ({
        width: r.width,
        cases: r.cases.length,
        roundTripFailures: r.cases
          .filter((c) => c.exactRoundTrip === false)
          .map((c) => c.id),
        decisionFailures: r.cases
          .filter((c) => c.decisionMatches === false)
          .map((c) => c.id),
        overflow: r.overflow,
        errors: r.errors,
        onlyStaticLocalGets: r.onlyStaticLocalGets,
      })),
      null,
      2,
    ),
  );
}
assert.equal(results.length, process.env.ONLY_WIDTH ? 1 : 2);
for (const r of results) {
  assert.ok(
    r.cases.every(
      (c) => c.invalidRejected || (c.exactRoundTrip && c.decisionMatches),
    ),
  );
  assert.equal(r.errors.length, 0);
  assert.equal(r.overflow.length, 0);
  assert.equal(r.onlyStaticLocalGets, true);
  assert.deepEqual(r.storage, { local: [], session: [], cookie: "" });
}
