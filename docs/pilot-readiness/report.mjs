import { criteria, assess, methodology, limitations } from "./model.mjs";
export function buildReport(
  payload,
  fontBase64,
  JsPDF = globalThis.jspdf.jsPDF,
) {
  const result = assess(payload);
  const doc = new JsPDF({ unit: "mm", format: "a4", compress: true });
  doc.addFileToVFS("NotoSans.ttf", fontBase64);
  doc.addFont("NotoSans.ttf", "NotoSans", "normal");
  doc.setFont("NotoSans");
  const allText = JSON.stringify(payload);
  const cmap = doc.getFont().metadata.cmap.unicode.codeMap;
  const missing = [
    ...new Set(
      [...allText].filter(
        (ch) => ch.codePointAt(0) > 31 && !cmap[ch.codePointAt(0)],
      ),
    ),
  ];
  if (missing.length)
    throw Error(
      "The PDF font cannot represent these characters: " +
        missing.join(" ") +
        ". Save JSON to preserve the original text, or use supported characters for the PDF.",
    );
  doc.setProperties({
    title: "AI Pilot Readiness Assessment",
    subject: "User-reported evidence; human approval required",
    author: "Practical AI Adoption",
  });
  let y = 30;
  function header() {
    doc.setFontSize(9);
    doc.setTextColor(23, 94, 83);
    doc.text("PRACTICAL AI ADOPTION / PILOT READINESS", 20, 16);
    doc.setDrawColor(208, 216, 213);
    doc.line(20, 20, 190, 20);
  }
  header();
  function space(height = 20) {
    if (y + height > 272) {
      doc.addPage();
      header();
      y = 30;
    }
  }
  function text(value, size = 10, colour = [32, 45, 48]) {
    doc.setFontSize(size);
    doc.setTextColor(...colour);
    // Only remove non-printing controls; all visible user text is retained.
    const clean = String(value).replace(
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,
      "",
    );
    const lines = doc.splitTextToSize(clean, 170);
    const height = size * 0.49;
    for (const line of lines) {
      space(height);
      doc.setFontSize(size);
      doc.setTextColor(...colour);
      doc.text(line, 20, y);
      y += height;
    }
    y += 3;
  }
  function heading(value) {
    space(25);
    y += 5;
    text(value, 14, [23, 94, 83]);
  }
  text("AI Pilot Readiness Assessment", 23);
  if (payload.fictional)
    text("FICTIONAL EXAMPLE - not real business evidence", 11, [147, 47, 40]);
  text(payload.pilot, 15);
  text("Assessment date: " + (payload.details?.date || "Not supplied"));
  text("Business process: " + (payload.details?.process || "Not supplied"));
  text("Intended outcome: " + (payload.details?.outcome || "Not supplied"));
  text("Internal reference: " + (payload.details?.reference || "Not supplied"));
  heading("Executive summary");
  text(
    result.decision,
    17,
    result.essential_blockers.length ? [147, 47, 40] : [23, 94, 83],
  );
  text("Rule-based interpretation: " + result.reason);
  text(
    "Evidence status: all answers and notes below are user-reported. None has been independently verified. Completing the questionnaire is not a validated business case.",
  );
  text(
    "Human approval is required. Do not expand on the strength of this report. A responsible person must inspect the supporting records and make the decision. A limited result does not authorise continued piloting without its own approvals.",
  );
  heading("Essential blockers");
  if (!result.essential_blockers.length)
    text(
      "None recorded. This reflects the supplied answers, not verification of the safeguards.",
    );
  for (const b of result.essential_blockers)
    text(b.requirement + " - " + b.status.toUpperCase());
  heading("Other outstanding evidence gaps");
  const other = result.remaining_gaps.filter(
    (g) => !result.essential_blockers.some((b) => b.check === g.check),
  );
  if (!other.length)
    text(
      "No other gaps recorded. The supporting records still need independent review.",
    );
  for (const g of other) text(g.requirement + " - " + g.status.toUpperCase());
  heading("Recommended next checks");
  const checks = result.remaining_gaps.length
    ? criteria.filter((c) =>
        result.remaining_gaps.some((g) => g.check === c.key),
      )
    : criteria;
  for (const c of checks) text(c.title + ": " + c.next);
  text(
    "Human owner: verify the records, resolve contradictions, confirm permissions and decide whether further testing, a stop or an expansion proposal is appropriate. Record the decision separately.",
  );
  doc.addPage();
  header();
  y = 30;
  heading("All ten criteria: user-reported record");
  for (const [i, c] of criteria.entries()) {
    space(42);
    heading(`${i + 1}. ${c.title}`);
    text(c.question);
    text(
      "Reported response: " +
        payload.evidence[c.key].status.toUpperCase() +
        (result.essential_blockers.some((b) => b.check === c.key)
          ? " / ESSENTIAL BLOCKER"
          : ""),
    );
    text("Evidence note (user-reported, unverified):");
    text(
      payload.evidence[c.key].note.trim() ||
        "Not supplied. No supporting information recorded.",
    );
  }
  heading("Methodology and limitations");
  text(methodology);
  text(limitations);
  text(
    "The browser requires Yes notes to contain at least 40 characters, 6 words and 4 different words. This is a form check only. The original Python checker requires a non-empty note. Both use the same decisions for records accepted by the browser. No maturity score or confidence percentage is calculated.",
  );
  text(
    "Privacy: answers are processed in page memory. The application does not upload them or write them to browser storage. Downloaded reports and JSON files remain on your device and must be handled under your organisation's rules.",
  );
  text(
    "Method and source: github.com/shaunmarsden/practical-ai-adoption/tree/main/tools/pilot-readiness",
  );
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(80, 97, 102);
    doc.text("Self-reported / Human approval required", 20, 285);
    doc.text(`${i} / ${pages}`, 190, 285, { align: "right" });
  }
  return doc;
}
export async function downloadReport(payload) {
  const response = await fetch(
    new URL("./vendor/NotoSans-Regular.ttf", import.meta.url),
  );
  if (!response.ok)
    throw Error(
      "The local report font could not be loaded. Check the connection to this site and try again.",
    );
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192)
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  const doc = buildReport(payload, btoa(binary));
  doc.save("ai-pilot-readiness-assessment.pdf");
}
