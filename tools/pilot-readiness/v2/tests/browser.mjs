import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import {
  assess,
  criteria,
  decisions,
} from "../../../../docs/pilot-readiness/model-v2.mjs";
import { example } from "../../../../docs/pilot-readiness/examples-v2.mjs";
const base = process.env.BASE_URL || "http://localhost:8765";
const dir = process.env.TEST_OUTPUT || "test-results/v2";
await mkdir(dir, { recursive: true });
const original = JSON.parse(
  await readFile(new URL("../../adversarial/scenarios.json", import.meta.url)),
).cases;
const transformed = JSON.parse(
  await readFile(new URL("../fixtures/original-30-v2.json", import.meta.url)),
).cases;
const challenges = JSON.parse(
  await readFile(new URL("../fixtures/new-challenges.json", import.meta.url)),
).cases;
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const observations = [];
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport,
      acceptDownloads: true,
    });
    const page = await context.newPage();
    const requests = [],
      errors = [],
      consoleErrors = [];
    page.on("request", (r) =>
      requests.push({ url: r.url(), method: r.method(), body: r.postData() }),
    );
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    await page.goto(base + "/pilot-readiness/");
    assert.match(await page.title(), /Assessment V2/);
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator(".skip")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.screenshot({
      path: `${dir}/intro-${viewport.width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Explore a fictional example" })
      .click();
    assert.equal(await page.locator(".question").count(), 10);
    async function view() {
      await page
        .getByRole("button", { name: "View result", exact: true })
        .click();
      await page.locator("#result-title").waitFor({ state: "visible" });
      return await page.locator("#result-title").innerText();
    }
    async function load(p) {
      await page.locator("#import").setInputFiles({
        name: "fictional-v2.json",
        mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify(p)),
      });
      await page
        .getByRole("button", { name: "Replace assessment", exact: true })
        .click();
      await page.waitForFunction(
        (name) => document.querySelector("#pilot").value === name,
        p.pilot,
      );
      await page.locator("#context-title").waitFor({ state: "visible" });
    }
    async function download(label, payload) {
      const waiting = page.waitForEvent("download");
      await page.getByRole("button", { name: "Download PDF report" }).click();
      const dl = await waiting;
      const path = `${dir}/${label}-${viewport.width}.pdf`;
      await dl.saveAs(path);
      await writeFile(
        `${dir}/${label}-${viewport.width}.json`,
        JSON.stringify(payload, null, 2),
      );
      return path;
    }
    assert.equal(await view(), decisions.hold);
    assert.equal(await page.locator(".issue-alert").isVisible(), true);
    assert.match(
      await page.locator(".issue-alert").innerText(),
      /Unacceptable critical errors/,
    );
    await download("blocked", example("blocked"));
    await page.screenshot({
      path: `${dir}/blocked-${viewport.width}.png`,
      fullPage: true,
    });
    for (const kind of ["further", "complete", "offline"]) {
      const p = example(kind);
      p.pilot += " " + kind;
      await load(p);
      assert.equal(await view(), assess(p).decision);
      await download(kind, p);
    }
    // All thirty original transformations and all sixteen new challenge cases through real controls.
    for (const c of [...transformed, ...challenges]) {
      await load(c.payload);
      const decision = await view();
      assert.equal(decision, assess(c.payload).decision, c.source_id || c.id);
      observations.push({
        viewport: viewport.width,
        id: c.source_id || c.id,
        decision,
      });
      if (c.payload.material_issue.status === "unresolved")
        assert.equal(await page.locator(".issue-alert").isVisible(), true);
    }
    // Draft Yes without a reference remains insufficient, while a concise finding works.
    const short = example("complete");
    short.pilot = "Fictional concise record";
    short.evidence.quality_review = {
      status: "yes",
      reference: "QR-14",
      note: "0 critical errors in 200 tests; accepted.",
    };
    await load(short);
    assert.equal(await view(), decisions.complete);
    await page
      .getByRole("button", { name: "Condition 4:", exact: false })
      .click();
    await page.locator("#ref-quality_review").fill("");
    assert.equal(await view(), decisions.further);
    assert.match(
      await page.locator("#results").innerText(),
      /lacks a record reference/,
    );
    // A V2 round trip is exact, including HTML-like note text as plain text.
    const literal = example("complete");
    literal.pilot = "Fictional literal text";
    literal.evidence.baseline.note =
      '<script>throw new Error("injected")</script> & Fictional café - Ελληνικά - Кириллица';
    await load(literal);
    assert.equal(await view(), decisions.complete);
    assert.equal(await page.locator("#results script").count(), 0);
    await download("supported-text", literal);
    const jsonEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "Save assessment JSON" }).click();
    const dl = await jsonEvent;
    const jsonPath = `${dir}/roundtrip-${viewport.width}.json`;
    await dl.saveAs(jsonPath);
    assert.deepEqual(JSON.parse(await readFile(jsonPath, "utf8")), literal);
    // V1 source extensions and notes survive, but every current-condition answer is Unknown.
    const legacy = structuredClone(
      original.find((c) => c.id === "AD-04").payload,
    );
    legacy.pilot = "Fictional undated legacy source";
    delete legacy.details;
    legacy.extra_source_data = { note: "Fictional retained extension 🚀" };
    await load(legacy);
    assert.equal(await page.locator("#date").inputValue(), "");
    assert.equal(await page.locator("#migration-notice").isVisible(), true);
    assert.equal(
      await page
        .locator("input[name=quality_review][value=unknown]")
        .isChecked(),
      true,
    );
    assert.equal(
      await page.locator("#note-quality_review").inputValue(),
      legacy.evidence.quality_review.note,
    );
    assert.equal(await view(), decisions.further);
    const migratedEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "Save assessment JSON" }).click();
    const migratedDl = await migratedEvent;
    const migratedPath = `${dir}/migration-${viewport.width}.json`;
    await migratedDl.saveAs(migratedPath);
    const migrated = JSON.parse(await readFile(migratedPath, "utf8"));
    assert.deepEqual(migrated.migration.source_record, legacy);
    assert.equal(migrated.details.date, "");
    await download("migration", migrated);
    const invalid = example("complete");
    invalid.unsupported = "Do not discard me";
    await page.locator("#import").setInputFiles({
      name: "unsupported.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(invalid)),
    });
    await page.waitForFunction(() =>
      document
        .querySelector("#file-message")
        .textContent.startsWith("Import failed"),
    );
    assert.equal(await page.locator("#pilot").inputValue(), legacy.pilot);
    const unknownVersion = example("complete");
    unknownVersion.schema_version = 99;
    await page.locator("#import").setInputFiles({
      name: "future.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(unknownVersion)),
    });
    await page.waitForFunction(() =>
      document
        .querySelector("#file-message")
        .textContent.includes("Unsupported source schema"),
    );
    assert.equal(await page.locator("#pilot").inputValue(), legacy.pilot);
    if (viewport.width === 1440) {
      const long = example("complete");
      long.pilot = "Fictional long record";
      for (const r of Object.values(long.evidence))
        r.note =
          "Fictional measured finding with limits and accepted results. "
            .repeat(60)
            .slice(0, 2960) + " END-OF-NOTE";
      long.evidence.rollback.note =
        "Fictional recovery finding with reference token " +
        "X".repeat(2800) +
        " END-OF-NOTE";
      await load(long);
      await view();
      await download("long-notes", long);
      const unsupported = example("complete");
      unsupported.pilot = "Fictional unsupported glyph 🚀";
      await load(unsupported);
      await view();
      await page.getByRole("button", { name: "Download PDF report" }).click();
      await page.waitForFunction(() =>
        document
          .querySelector("#pdf-message")
          .textContent.includes("cannot represent"),
      );
      assert.match(await page.locator("#pdf-message").innerText(), /Save JSON/);
    }
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const storage = await page.evaluate(() => [
      localStorage.length,
      sessionStorage.length,
      document.cookie,
    ]);
    assert.deepEqual(storage, [0, 0, ""]);
    const assets = [
      "",
      "index.html",
      "style.css",
      "app.mjs",
      "model-v2.mjs",
      "examples-v2.mjs",
      "report.mjs",
      "vendor/jspdf.umd.min.js",
      "vendor/NotoSans-Regular.ttf",
      "icon.svg",
    ];
    const allowed = new Set(
      assets.map((p) => new URL(p, base + "/pilot-readiness/").href),
    );
    assert.deepEqual(
      requests.filter(
        (r) => !allowed.has(r.url) || r.method !== "GET" || r.body !== null,
      ),
      [],
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(consoleErrors, []);
    await writeFile(
      `${dir}/requests-${viewport.width}.json`,
      JSON.stringify(requests, null, 2),
    );
    await page.goto(base + "/");
    assert.match(await page.title(), /Sort the Notes Yourself/);
    assert.equal(await page.locator("#quiz").count(), 1);
    await page.locator("#quiz .choices button").first().click();
    await context.close();
  }
  // Fresh questionnaire journey without import: all ten current-condition questions and keyboard input.
  const page = await browser.newPage();
  await page.goto(base + "/pilot-readiness/");
  await page
    .getByRole("button", { name: "Start an assessment", exact: true })
    .click();
  assert.equal(await page.locator("#date").inputValue(), "");
  const p = example("complete");
  for (const [id, value] of [
    ["pilot", "Fictional fresh V2 journey"],
    ["process", p.details.process],
    ["outcome", p.details.outcome],
    ["date", p.details.date],
    ["scale", p.scope.proposed_scale],
    ["version", p.scope.current_version],
  ])
    await page.locator("#" + id).fill(value);
  await page.locator("#activity").selectOption(p.scope.activity);
  await page.locator("#data").selectOption(p.scope.data);
  await page.locator("#external-effects").selectOption("no");
  await page.locator("#people-impact").selectOption("no");
  await page.getByRole("button", { name: "Continue to issues" }).click();
  await page.locator("#issue-status").selectOption("none_identified");
  await page.getByRole("button", { name: "Continue to conditions" }).click();
  for (const c of criteria) {
    await page.locator(`input[name=${c.key}][value=yes]`).focus();
    await page.keyboard.press("Space");
    await page.locator("#ref-" + c.key).fill(p.evidence[c.key].reference);
    await page.locator("#note-" + c.key).fill(p.evidence[c.key].note);
    await page
      .getByRole("button", {
        name: c.key === "monitoring" ? "Assess this record" : "Next condition",
        exact: true,
      })
      .click();
  }
  assert.equal(
    await page.locator("#result-title").innerText(),
    decisions.complete,
  );
  await page.getByRole("button", { name: "Clear and start again" }).click();
  await page.getByRole("button", { name: "Keep current answers" }).click();
  assert.equal(
    await page.locator("#pilot").inputValue(),
    "Fictional fresh V2 journey",
  );
  await page.getByRole("button", { name: "Clear and start again" }).click();
  await page
    .getByRole("button", { name: "Replace assessment", exact: true })
    .click();
  await page.waitForFunction(
    () => document.querySelector("#pilot").value === "",
  );
  assert.equal(await page.locator("#date").inputValue(), "");
  assert.equal(await page.locator("#results").innerText(), "");
  await writeFile(
    `${dir}/observations.json`,
    JSON.stringify(observations, null, 2),
  );
  console.log(
    `V2 browser validation passed: ${observations.length} fixture journeys, four result routes, migration, PDFs, keyboard entry, privacy and homepage.`,
  );
} finally {
  await browser.close();
}
