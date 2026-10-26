// Read-only public-site review. All entered records are invented.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
const site =
  process.env.REVIEW_URL ||
  "https://shaunmarsden.github.io/practical-ai-adoption/";
const base = new URL(site),
  app = new URL("pilot-readiness/", base);
const output = process.env.REVIEW_OUTPUT || "work/adversarial-live";
await mkdir(output, { recursive: true });
const cases = JSON.parse(
  await readFile(new URL("scenarios.json", import.meta.url), "utf8"),
).cases;
const localRoot = new URL("../../../", import.meta.url);
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const summary = {
  url: app.href,
  started_utc: new Date().toISOString(),
  desktop: null,
  mobile: null,
  asset_checks: [],
  pdfs: [],
  observations: [],
};
const sha = (b) => createHash("sha256").update(b).digest("hex");
try {
  const api = await browser.newContext();
  for (const path of [
    "index.html",
    "app.mjs",
    "model.mjs",
    "report.mjs",
    "examples.mjs",
    "style.css",
    "vendor/jspdf.umd.min.js",
    "vendor/NotoSans-Regular.ttf",
  ]) {
    const response = await api.request.get(new URL(path, app).href);
    assert.equal(response.status(), 200);
    const actual = await response.body(),
      local = await readFile(
        new URL("docs/pilot-readiness/" + path, localRoot),
      );
    assert.equal(sha(actual), sha(local), `deployed asset differs: ${path}`);
    summary.asset_checks.push({
      path,
      http_status: response.status(),
      sha256: sha(actual),
      matches_merged_checkout: true,
    });
  }
  await api.close();
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport,
      acceptDownloads: true,
    });
    const page = await context.newPage(),
      requests = [],
      pageErrors = [],
      consoleErrors = [],
      httpErrors = [];
    page.on("request", (r) =>
      requests.push({ url: r.url(), method: r.method(), body: r.postData() }),
    );
    page.on("pageerror", (e) => pageErrors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error")
        consoleErrors.push({ text: m.text(), location: m.location() });
    });
    page.on("response", (r) => {
      if (r.status() >= 400)
        httpErrors.push({ url: r.url(), status: r.status() });
    });
    const response = await page.goto(app.href);
    assert.equal(response.status(), 200);
    await page.screenshot({
      path: `${output}/intro-${viewport.width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Explore a fictional example" })
      .click();
    assert.equal(await page.locator(".question").count(), 10);
    const questions = await page.locator(".question legend").allTextContents();
    assert.equal(new Set(questions).size, 10);
    assert.equal(await page.locator("#fictional").isVisible(), true);
    async function showResult() {
      await page
        .getByRole("button", { name: "Review results", exact: true })
        .click();
      await page.locator("#consistency").check();
      await page
        .getByRole("button", { name: "Show rule-based result" })
        .click();
    }
    async function importRecord(payload) {
      await page.locator("#import").setInputFiles({
        name: "fictional-adversarial.json",
        mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify(payload)),
      });
      await page
        .getByRole("button", { name: "Replace assessment", exact: true })
        .click();
      await page.waitForFunction(
        (p) => document.querySelector("#pilot").value === p,
        payload.pilot,
      );
    }
    async function pdf(label) {
      const pending = page.waitForEvent("download");
      await page.getByRole("button", { name: "Download PDF report" }).click();
      const download = await pending;
      const filename = `${label}-${viewport.width}.pdf`;
      await download.saveAs(`${output}/${filename}`);
      summary.pdfs.push({
        label,
        viewport: viewport.width,
        path: filename,
        decision: await page.locator("#result-title").innerText(),
      });
    }
    await showResult();
    assert.equal(
      await page.locator("#result-title").innerText(),
      "DO NOT EXPAND",
    );
    await pdf("built-in-blocked");
    await page.screenshot({
      path: `${output}/blocked-${viewport.width}.png`,
      fullPage: true,
    });
    // Visit every check through the visible navigation, rather than just counting hidden DOM nodes.
    for (let n = 0; n < 10; n++) {
      await page
        .getByRole("button", { name: `Check ${n + 1}:`, exact: false })
        .click();
      assert.equal(await page.locator(".question:visible").count(), 1);
      assert.equal(
        await page.locator(".question:visible legend").innerText(),
        questions[n],
      );
    }
    const targets =
      viewport.width === 1440
        ? cases
        : cases.filter((c) =>
            ["AD-04", "AD-21", "AD-22", "AD-24"].includes(c.id),
          );
    for (const c of targets) {
      await importRecord(c.payload);
      await showResult();
      const decision = await page.locator("#result-title").innerText();
      summary.observations.push({
        viewport: viewport.width,
        id: c.id,
        decision,
        results_text: await page.locator("#results").innerText(),
      });
      if (["AD-04", "AD-22", "AD-24"].includes(c.id)) await pdf(c.id);
    }
    const original = cases.find((c) => c.id === "AD-04").payload;
    await importRecord(original);
    await showResult();
    await page.screenshot({
      path: `${output}/critical-review-${viewport.width}.png`,
      fullPage: true,
    });
    const pending = page.waitForEvent("download");
    await page.getByRole("button", { name: "Save assessment JSON" }).click();
    const json = await pending;
    await json.saveAs(`${output}/roundtrip-${viewport.width}.json`);
    assert.deepEqual(
      JSON.parse(
        await readFile(`${output}/roundtrip-${viewport.width}.json`, "utf8"),
      ),
      original,
    );
    if (viewport.width === 1440) {
      // Maximum accepted note length, multiple pages, plus a long unbroken token.
      const long = structuredClone(cases.find((c) => c.id === "AD-22").payload);
      long.pilot = "Fictional long note boundary test";
      for (const r of Object.values(long.evidence))
        r.note =
          "Fictional tested evidence reference with recorded limits and results. "
            .repeat(50)
            .slice(0, 2950) + " END-OF-NOTE";
      long.evidence.rollback.note =
        "Fictional recovery note with a long reference token: " +
        "X".repeat(2800) +
        " END-OF-NOTE";
      await importRecord(long);
      await showResult();
      await pdf("long-notes");
      await writeFile(
        `${output}/long-notes-input.json`,
        JSON.stringify(long, null, 2),
      );
      const unsupported = structuredClone(original);
      unsupported.pilot = "Fictional unsupported glyph 🚀";
      await importRecord(unsupported);
      await showResult();
      await page.getByRole("button", { name: "Download PDF report" }).click();
      await page.waitForFunction(() =>
        document
          .querySelector("#pdf-message")
          .textContent.includes("cannot represent"),
      );
      summary.unsupported_pdf_message = await page
        .locator("#pdf-message")
        .innerText();
      const tooLong = structuredClone(original);
      tooLong.pilot = "Fictional oversized import";
      tooLong.evidence.baseline.note = "x".repeat(3001);
      await page.locator("#import").setInputFiles({
        name: "oversized.json",
        mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify(tooLong)),
      });
      await page.waitForFunction(() =>
        document
          .querySelector("#file-message")
          .textContent.startsWith("Import failed"),
      );
      assert.equal(
        await page.locator("#pilot").inputValue(),
        unsupported.pilot,
      );
      summary.oversized_message = await page
        .locator("#file-message")
        .innerText();
      // Reproduce date provenance from an older Python-format record with no date.
      const legacy = {
        pilot: "Fictional historical undated record",
        evidence: structuredClone(
          cases.find((c) => c.id === "AD-22").payload.evidence,
        ),
      };
      await importRecord(legacy);
      const suppliedDate = await page.locator("#date").inputValue();
      await page.locator("#process").fill("Fictional historic batch sorting");
      await page
        .locator("#outcome")
        .fill("Fictional outcome entered only to exercise the legacy import");
      await showResult();
      await pdf("undated-import");
      summary.legacy_date_observation = {
        input_has_date: false,
        date_after_import: suppliedDate,
        date_was_not_manually_entered: true,
      };
    }
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const storage = await page.evaluate(() => ({
      localStorage: localStorage.length,
      sessionStorage: sessionStorage.length,
      cookies: document.cookie,
    }));
    assert.equal(storage.localStorage, 0);
    assert.equal(storage.sessionStorage, 0);
    const unexpected = requests.filter(
      (r) =>
        new URL(r.url).origin !== base.origin ||
        r.method !== "GET" ||
        r.body !== null ||
        new URL(r.url).search !== "" ||
        ![
          "",
          "index.html",
          "app.mjs",
          "model.mjs",
          "report.mjs",
          "examples.mjs",
          "style.css",
          "vendor/jspdf.umd.min.js",
          "vendor/NotoSans-Regular.ttf",
        ].some((path) => new URL(path, app).href === r.url),
    );
    assert.deepEqual(unexpected, []);
    assert.deepEqual(pageErrors, []);
    await writeFile(
      `${output}/requests-${viewport.width}.json`,
      JSON.stringify(requests, null, 2),
    );
    const result = {
      viewport,
      http_status: response.status(),
      ten_visible_questions_checked: true,
      roundtrip_matches: true,
      requests: requests.length,
      unexpected_requests: unexpected,
      page_errors: pageErrors,
      console_errors: consoleErrors,
      http_errors: httpErrors,
      storage,
    };
    summary[viewport.width === 1440 ? "desktop" : "mobile"] = result;
    await page.goto(base.href);
    assert.match(await page.title(), /Sort the Notes Yourself/);
    assert.equal(await page.locator("#quiz").count(), 1);
    const choices = page.locator("#quiz .choices button");
    assert.ok((await choices.count()) > 0);
    await choices.first().click();
    summary.homepage_quiz_interaction_verified = true;
    await context.close();
  }
  summary.completed_utc = new Date().toISOString();
  await writeFile(
    `${output}/live-summary.json`,
    JSON.stringify(summary, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        url: summary.url,
        assets: summary.asset_checks.length,
        desktop: summary.desktop,
        mobile: summary.mobile,
        scenario_observations: summary.observations.length,
        pdfs: summary.pdfs.length,
        legacy_date: summary.legacy_date_observation,
      },
      null,
      2,
    ),
  );
} catch (e) {
  summary.failure = String(e.stack || e);
  await writeFile(
    `${output}/live-summary.json`,
    JSON.stringify(summary, null, 2),
  );
  throw e;
} finally {
  await browser.close();
}
