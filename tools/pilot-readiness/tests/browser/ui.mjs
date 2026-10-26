// Start a local server first. No app code is injected: tests use visible controls and file import.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { example } from "../../../../docs/pilot-readiness/examples.mjs";
const base = process.env.BASE_URL || "http://localhost:8765";
const dir = "test-results";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
let count = 0;
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport,
      acceptDownloads: true,
    });
    const page = await context.newPage(),
      errors = [],
      requests = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) =>
      requests.push({ url: r.url(), method: r.method(), data: r.postData() }),
    );
    await page.goto(base + "/pilot-readiness/");
    await page.screenshot({
      path: `${dir}/intro-${viewport.width}.png`,
      fullPage: true,
    });
    assert.equal(
      await page.title(),
      "AI Pilot Readiness Assessment | Practical AI Adoption",
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator(".skip")
        .evaluate((el) => el === document.activeElement),
      true,
      "keyboard skip link",
    );
    await page
      .getByRole("button", { name: "Explore a fictional example" })
      .click();
    await page
      .getByRole("button", { name: "Review results", exact: true })
      .click();
    await page.getByRole("button", { name: "Show rule-based result" }).click();
    assert.match(
      await page.locator("#review-error").innerText(),
      /Review the records/,
    );
    await page.locator("#consistency").check();
    await page.getByRole("button", { name: "Show rule-based result" }).click();
    assert.equal(
      await page.locator("#result-title").innerText(),
      "DO NOT EXPAND",
    );
    await page.screenshot({
      path: `${dir}/result-${viewport.width}.png`,
      fullPage: true,
    });
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download PDF report" }).click();
    await (
      await download
    ).saveAs(`${dir}/fictional-assessment-${viewport.width}.pdf`);
    await page.getByRole("button", { name: "Review answers again" }).click();
    await page
      .getByRole("button", { name: "Edit", exact: true })
      .nth(0)
      .click();
    await page.locator("input[name=business_outcome][value=yes]").check();
    await page.locator("#note-business_outcome").fill("done");
    await page.getByRole("button", { name: "Next check", exact: true }).click();
    assert.match(await page.locator("#form-error").innerText(), /at least 40/);
    await page.screenshot({
      path: `${dir}/validation-${viewport.width}.png`,
      fullPage: true,
    });
    // Import is local and replaces only after a confirmation dialog.
    async function load(p) {
      await page
        .locator("#import")
        .setInputFiles({
          name: "fictional.json",
          mimeType: "application/json",
          buffer: Buffer.from(JSON.stringify(p)),
        });
      await page
        .getByRole("button", { name: "Replace assessment", exact: true })
        .click();
    }
    async function result() {
      await page
        .getByRole("button", { name: "Review results", exact: true })
        .click();
      await page.locator("#consistency").check();
      await page
        .getByRole("button", { name: "Show rule-based result" })
        .click();
    }
    for (const [kind, decision] of [
      ["B", "LIMITED PILOT ONLY"],
      ["C", "READY FOR HUMAN REVIEW"],
      ["D", "LIMITED PILOT ONLY"],
    ]) {
      await load(example(kind));
      await result();
      assert.equal(await page.locator("#result-title").innerText(), decision);
      count++;
    }
    await load(example("E"));
    await page
      .getByRole("button", { name: "Review results", exact: true })
      .click();
    assert.match(
      await page.locator("#results").innerText(),
      /NOT been granted/,
    );
    assert.match(
      await page.locator("#results").innerText(),
      /tool|contradict/i,
    );
    await page
      .getByRole("button", { name: "Edit", exact: true })
      .nth(6)
      .click();
    await page.locator("input[name=data_approval][value=no]").check();
    await result();
    assert.equal(
      await page.locator("#result-title").innerText(),
      "DO NOT EXPAND",
    );
    await load(example("F"));
    await page
      .getByRole("button", { name: "Review results", exact: true })
      .click();
    assert.match(await page.locator("#form-error").innerText(), /at least 40/);
    const old = await page.locator("#pilot").inputValue();
    await page
      .locator("#import")
      .setInputFiles({
        name: "bad.json",
        mimeType: "application/json",
        buffer: Buffer.from("{bad json"),
      });
    await page.waitForFunction(() =>
      document
        .querySelector("#file-message")
        .textContent.startsWith("Import failed"),
    );
    assert.match(
      await page.locator("#file-message").innerText(),
      /Import failed/,
    );
    assert.equal(await page.locator("#pilot").inputValue(), old);
    // Exercise literal text rendering and multi-page wrapping, not HTML interpretation.
    const long = example("C");
    long.pilot = "Fictional <script>alert(1)</script> & report";
    long.evidence.baseline.note =
      "Fictional evidence note with measured results and limitations. ".repeat(
        45,
      ) + " FINAL NOTE MARKER";
    await load(long);
    await result();
    assert.equal(await page.locator("#results script").count(), 0);
    const exportEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "Save assessment JSON" }).click();
    const exported = await exportEvent;
    await exported.saveAs(`${dir}/roundtrip.json`);
    assert.deepEqual(
      JSON.parse(await readFile(`${dir}/roundtrip.json`, "utf8")),
      long,
    );
    const pdfEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download PDF report" }).click();
    await (await pdfEvent).saveAs(`${dir}/long-report-${viewport.width}.pdf`);
    // A font mismatch is reported explicitly, never silently mangled in the report.
    const unicode = example("C");
    unicode.pilot = "Fictional pilot 🚀";
    await load(unicode);
    await result();
    await page.getByRole("button", { name: "Download PDF report" }).click();
    await page.waitForFunction(() =>
      document
        .querySelector("#pdf-message")
        .textContent.includes("cannot represent"),
    );
    assert.match(await page.locator("#pdf-message").innerText(), /Save JSON/);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "no horizontal overflow",
    );
    assert.deepEqual(
      await page.evaluate(() => [localStorage.length, sessionStorage.length]),
      [0, 0],
    );
    for (const r of requests) {
      assert.equal(
        new URL(r.url).origin,
        new URL(base).origin,
        "no third-party request",
      );
      assert.equal(r.method, "GET");
      assert.equal(r.data, null);
      assert.equal(r.url.includes("Fictional"), false);
    }
    assert.deepEqual(errors, []);
    await writeFile(
      `${dir}/requests-${viewport.width}.json`,
      JSON.stringify(requests, null, 2),
    );
    await context.close();
    count += 10;
  }
  // Complete a fresh, unlabelled record through the guided form with keyboard controls.
  const fresh = await browser.newPage();
  await fresh.goto(base + "/pilot-readiness/");
  await fresh
    .getByRole("button", { name: "Start an assessment", exact: true })
    .click();
  await fresh
    .getByRole("button", { name: "Continue to the ten checks" })
    .click();
  assert.match(
    await fresh.locator("#form-error").innerText(),
    /Complete the pilot/,
  );
  await fresh.locator("#pilot").fill("Fictional fresh form test");
  await fresh.locator("#process").fill("Sorting synthetic batches");
  await fresh
    .locator("#outcome")
    .fill("Reduce sorting time without more errors");
  await fresh
    .getByRole("button", { name: "Continue to the ten checks" })
    .click();
  for (const [key, r] of Object.entries(example("C").evidence)) {
    await fresh.locator(`input[name="${key}"][value=yes]`).focus();
    await fresh.keyboard.press("Space");
    await fresh.locator("#note-" + key).fill(r.note);
    await fresh
      .getByRole("button", {
        name: key === "monitoring" ? "Review answers" : "Next check",
        exact: true,
      })
      .click();
  }
  await fresh.locator("#consistency").check();
  await fresh.getByRole("button", { name: "Show rule-based result" }).click();
  assert.equal(
    await fresh.locator("#result-title").innerText(),
    "READY FOR HUMAN REVIEW",
  );
  await fresh.getByRole("button", { name: "Clear and start again" }).click();
  await fresh.getByRole("button", { name: "Keep current answers" }).click();
  assert.equal(
    await fresh.locator("#pilot").inputValue(),
    "Fictional fresh form test",
  );
  await fresh.getByRole("button", { name: "Clear and start again" }).click();
  await fresh
    .getByRole("button", { name: "Replace assessment", exact: true })
    .click();
  await fresh.waitForFunction(
    () => document.querySelector("#pilot").value === "",
  );
  assert.equal(await fresh.locator("#pilot").inputValue(), "");
  // Confirm the pre-existing activity still loads and offers its quiz.
  const page = await browser.newPage();
  await page.goto(base + "/");
  assert.match(await page.title(), /Sort the Notes Yourself/);
  assert.equal(await page.locator("#quiz").count(), 1);
  console.log(
    `Browser journeys passed: ${count} scenario and interaction checks, two viewport sizes, existing homepage preserved.`,
  );
} finally {
  await browser.close();
}
