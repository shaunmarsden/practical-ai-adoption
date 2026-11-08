import { chromium, firefox, webkit } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
import { emptyRecord, fields } from "../../../docs/workbench/content.mjs";
import { draftText } from "../../../docs/workbench/draft.mjs";
import { appURL, assertStaticRequests } from "./browser-support.mjs";
const output =
  (process.env.TEST_OUTPUT || "test-results/workbench-compatibility") + "/";
await mkdir(output, { recursive: true });
const records = [];
const engines = [
  [
    "chromium",
    chromium,
    process.env.CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
      : {},
  ],
  ["firefox", firefox, {}],
  ["webkit", webkit, {}],
];
for (const [name, engine, options] of engines) {
  let browser;
  try {
    browser = await engine.launch({ headless: true, ...options });
    for (const width of [1440, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        acceptDownloads: true,
      });
      const page = await context.newPage();
      const r = { engine: name, width, checks: {}, errors: [], requests: [] };
      records.push(r);
      page.on("pageerror", (e) => r.errors.push(e.message));
      page.on("console", (message) => {
        if (message.type() === "error") r.errors.push(message.text());
      });
      page.on("requestfailed", (request) =>
        r.errors.push(`Request failed: ${request.url()}`),
      );
      page.on("response", (response) => {
        if (response.status() >= 400)
          r.errors.push(`HTTP ${response.status()}: ${response.url()}`);
      });
      page.on("request", (q) =>
        r.requests.push({
          url: q.url(),
          method: q.method(),
          body: q.postData(),
        }),
      );
      page.on("dialog", (d) => d.accept());
      async function save() {
        const [dl] = await Promise.all([
          page.waitForEvent("download"),
          page.locator("#save-draft").click(),
        ]);
        const text = await readFile(await dl.path(), "utf8");
        return JSON.parse(text);
      }
      async function load(text) {
        await page.locator("#reopen-draft").setInputFiles({
          name: "fictional-bay-ledger.json",
          mimeType: "application/json",
          buffer: Buffer.from(text),
        });
        await page.waitForFunction(() =>
          /Draft reopened locally|Could not reopen draft/.test(
            document.querySelector("#draft-status").textContent,
          ),
        );
      }
      try {
        await page.goto(appURL("workbench/"), { waitUntil: "networkidle" });
        await page.locator("#workbench").waitFor({ state: "visible" });
        await page.keyboard.press("Tab");
        r.keyboard = {
          tabReachesSkip: await page
            .locator(".skip")
            .evaluate((e) => e === document.activeElement),
          initialFocus: await page.evaluate(() => ({
            id: document.activeElement.id,
            tag: document.activeElement.tagName,
          })),
        };
        if (!r.keyboard.tabReachesSkip) {
          await page.reload({ waitUntil: "networkidle" });
          await page.keyboard.press("Alt+Tab");
          r.keyboard.altTabReachesSkip = await page
            .locator(".skip")
            .evaluate((e) => e === document.activeElement);
        }
        assert.ok(
          r.keyboard.tabReachesSkip ||
            (name === "webkit" && r.keyboard.altTabReachesSkip),
          "Skip link must be reachable by the tested engine keyboard path",
        );
        const notes = emptyRecord();
        for (const [id, , , kind] of fields)
          if (!kind)
            notes[id] =
              `Fictional Bay Ledger ${id}.\r\nSecond finding\rThird finding\twith tab. Café Ελληνικά Кириллица. <script>inert()</script>`;
        assert.ok(
          notes.work.includes("\r\n") &&
            notes.work.includes("\r") &&
            notes.work.includes("\t"),
          "Fixture must contain actual CRLF/CR and tab characters",
        );
        notes.permissions = "Unknown. No permission for real operational use.";
        notes.issues =
          "Fictional unresolved critical omission. Review lead must contain and investigate.";
        notes.evidenceType = "Fictional exercise";
        notes.readiness = "COMPLETE RECORD - HUMAN DECISION REQUIRED";
        notes.decision = "Continue within an existing authorised boundary";
        notes.decisionDate = "2026-11-08";
        await load(draftText(notes, "2026-11-08T07:00:00.000Z"));
        assert.match(
          await page.locator("#draft-status").innerText(),
          /Draft reopened locally/,
        );
        assert.deepEqual((await save()).notes, notes);
        r.checks.exactDraftRoundTrip = true;
        await page.locator("#owner").fill("Fictional edited reviewer role");
        notes.owner = "Fictional edited reviewer role";
        assert.deepEqual((await save()).notes, notes);
        r.checks.unrelatedEditPreservesAllOtherStrings = true;
        await page.locator("#steps button").last().click();
        await page.locator("#review").click();
        const before = await page.locator("#summary").textContent();
        const issuePosition = before.indexOf(notes.issues);
        const detailsPosition = before.indexOf("DESCRIBE THE WORK");
        assert.ok(
          issuePosition >= 0 && detailsPosition > issuePosition,
          "The unresolved issue must be present before the detailed notes",
        );
        assert.ok(
          before.includes(notes.work),
          "The literal imported note must remain in the preview",
        );
        assert.equal(await page.locator("#summary script").count(), 0);
        r.checks.adverseFindingAndLiteralMarkup = true;
        for (const malformed of [
          "{",
          draftText(notes).replace(
            '"schema_version": 1',
            '"schema_version": 2',
          ),
        ]) {
          await load(malformed);
          assert.match(
            await page.locator("#draft-status").innerText(),
            /Could not reopen draft/,
          );
          assert.equal(await page.locator("#summary").textContent(), before);
          assert.equal(
            await page.locator("#steps [aria-current]").textContent(),
            "6. Record a human decision",
          );
        }
        assert.deepEqual((await save()).notes, notes);
        r.checks.rejectedFilesPreserveState = true;
        const dimensions = await page.evaluate(() => ({
          width: innerWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        assert.ok(dimensions.scroll <= dimensions.width);
        r.checks.noHorizontalOverflow = true;
        r.storage = await page.evaluate(() => ({
          local: localStorage.length,
          session: sessionStorage.length,
          cookie: document.cookie,
        }));
        assert.deepEqual(r.storage, { local: 0, session: 0, cookie: "" });
        assertStaticRequests(r.requests, [
          "workbench/",
          "workbench/index.html",
          "workbench/app.mjs",
          "workbench/content.mjs",
          "workbench/draft.mjs",
          "workbench/style.css",
          "pilot-readiness/icon.svg",
        ]);
        r.checks.onlyStaticGets = true;
        const feedback = page.getByRole("link", {
          name: "Share public feedback on GitHub",
          exact: true,
        });
        assert.equal(
          await feedback.count(),
          1,
          "Feedback link must be available",
        );
        {
          const target = await feedback.getAttribute("href");
          assert.equal(
            target,
            "https://github.com/shaunmarsden/practical-ai-adoption/discussions/new",
            "Feedback navigation must not carry notes or query parameters",
          );
          await context.route(target, (route) =>
            route.fulfill({
              contentType: "text/html",
              body: "<h1>Fictional feedback destination</h1>",
            }),
          );
          const [popup] = await Promise.all([
            page.waitForEvent("popup"),
            feedback.click(),
          ]);
          await popup.waitForLoadState();
          assert.equal(popup.url(), target);
          assert.equal(await popup.evaluate(() => window.opener), null);
          assert.equal(await page.locator("#owner").inputValue(), notes.owner);
          await popup.close();
          r.checks.feedbackPreservesNotebook = true;
        }
        await page.reload({ waitUntil: "networkidle" });
        assert.equal(await page.locator("#work").inputValue(), "");
        r.checks.reloadHasNoAutosave = true;
        assert.deepEqual(r.errors, []);
        r.status = r.keyboard.tabReachesSkip
          ? "PASS"
          : "PASS WITH KEYBOARD LIMITATION";
      } catch (e) {
        r.status = "FAIL";
        r.failure = e.stack;
        await page
          .screenshot({
            path: output + `compatibility-${name}-${width}-failure.png`,
          })
          .catch(() => {});
      }
      await context.close();
    }
  } catch (e) {
    records.push({ engine: name, status: "UNVERIFIED", failure: e.message });
  } finally {
    await browser?.close();
  }
  await writeFile(
    output + "compatibility-results.json",
    JSON.stringify(records, null, 2),
  );
}
if (records.some((r) => !r.status.startsWith("PASS"))) process.exitCode = 1;
console.log(
  JSON.stringify(
    records.map(({ requests, ...r }) => ({ ...r, requests: requests?.length })),
    null,
    2,
  ),
);
