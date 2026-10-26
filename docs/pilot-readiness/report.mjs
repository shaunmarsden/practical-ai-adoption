import {
  criteria,
  assess,
  decisions,
  methodology,
  limitations,
} from "./model-v2.mjs";
export function buildReport(
  payload,
  fontBase64,
  JsPDF = globalThis.jspdf.jsPDF,
) {
  const result = assess(payload),
    doc = new JsPDF({ unit: "mm", format: "a4", compress: true });
  doc.addFileToVFS("NotoSans.ttf", fontBase64);
  doc.addFont("NotoSans.ttf", "NotoSans", "normal");
  doc.setFont("NotoSans");
  const printable = {
    pilot: payload.pilot,
    details: payload.details,
    scope: payload.scope,
    material_issue: payload.material_issue,
    evidence: payload.evidence,
  };
  const cmap = doc.getFont().metadata.cmap.unicode.codeMap;
  const missing = [
    ...new Set(
      [...JSON.stringify(printable)].filter(
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
    title: "AI Pilot Readiness Assessment V2",
    subject: "Method 2.0 / self-reported record / human decision required",
    author: "Practical AI Adoption",
  });
  let y = 30;
  const colours = {
    ink: [32, 45, 48],
    red: [147, 47, 40],
    amber: [119, 80, 10],
    blue: [36, 84, 123],
    muted: [80, 97, 102],
  };
  function header() {
    doc.setFontSize(9);
    doc.setTextColor(...colours.muted);
    doc.text("PRACTICAL AI ADOPTION / METHOD 2.0", 20, 16);
    doc.setDrawColor(208, 216, 213);
    doc.line(20, 20, 190, 20);
  }
  function space(height = 20) {
    if (y + height > 272) {
      doc.addPage();
      header();
      y = 30;
    }
  }
  function text(value, size = 10, colour = colours.ink) {
    const clean = String(value).replace(
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,
      "",
    );
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(clean, 170);
    for (const line of lines) {
      space(size * 0.49);
      doc.setFontSize(size);
      doc.setTextColor(...colour);
      doc.text(line, 20, y);
      y += size * 0.49;
    }
    y += 3;
  }
  function heading(value, colour = colours.blue) {
    space(24);
    y += 5;
    text(value, 14, colour);
  }
  header();
  text("AI Pilot Readiness Assessment V2", 21);
  if (payload.fictional)
    text("FICTIONAL EXAMPLE - no real business evidence", 11, colours.red);
  const colour =
    result.decision === decisions.hold
      ? colours.red
      : result.decision === decisions.further
        ? colours.amber
        : colours.blue;
  heading("Decision summary", colour);
  text(result.decision, 17, colour);
  text(result.reason);
  text("HUMAN DECISION REQUIRED. " + result.warning);
  if (result.known_issues.length) {
    heading("Known unresolved material issue", colours.red);
    for (const i of result.known_issues) {
      text(i.summary, 11, colours.red);
      text("Responsible human: " + i.owner);
      text("Required action: " + i.next_step);
    }
  } else {
    text(
      "Reported issue position: " +
        (payload.material_issue.status === "none_identified"
          ? "No material issue identified in the evidence reviewed. This is unverified."
          : "Unknown or insufficiently assessed. Further human investigation is required."),
      10,
      colour,
    );
    if (payload.material_issue.summary)
      text("Position note (user-reported): " + payload.material_issue.summary);
    if (payload.material_issue.owner)
      text(
        "Recorded responsible role (unverified): " +
          payload.material_issue.owner,
      );
    if (payload.material_issue.action !== "unknown")
      text("Recorded proposed human action: " + payload.material_issue.action);
    if (payload.material_issue.next_step)
      text("Recorded proposed next step: " + payload.material_issue.next_step);
  }
  heading("Pilot and assessment scope");
  text("Pilot: " + (payload.pilot || "Not supplied"));
  text(
    "Assessment date: " +
      (payload.details.date || "Not supplied - explicit selection required"),
  );
  text("Business process: " + (payload.details.process || "Not supplied"));
  text("Intended outcome: " + (payload.details.outcome || "Not supplied"));
  text("Internal reference: " + (payload.details.reference || "Not supplied"));
  for (const [key, value] of Object.entries(payload.scope))
    text(
      key.replaceAll("_", " ") +
        ": " +
        (value ? String(value).replaceAll("_", " ") : "Not supplied"),
    );
  if (payload.migration) {
    heading("V1 migration - reassessment required");
    text(
      "Historical V1 Yes answers were reset to Unknown, never converted to V2 acceptance. Original notes were retained; current V2 answers reflect any subsequent user edits. The complete original source record, including unsupported source fields, remains in JSON exports. The PDF prints the V2 record, not every legacy extension.",
    );
    text(
      "Assessment-date review: " +
        (payload.migration.date_reviewed
          ? "Explicitly confirmed by the user (not evidence verification)."
          : "NOT CONFIRMED - further assessment required."),
    );
  }
  heading(
    result.assessment_route === "offline_learning"
      ? "Operational conditions for any future real use"
      : "Known conditions not satisfied",
    colour,
  );
  if (!result.known_blockers.length)
    text(
      "No condition is reported as No. This does not establish independent acceptance.",
    );
  for (const b of result.known_blockers)
    text(
      b.requirement +
        " - NO" +
        (result.essential_blockers.some((e) => e.check === b.check)
          ? " / essential safeguard"
          : ""),
    );
  heading(
    "Missing or insufficient evidence",
    result.evidence_gaps.length ? colours.amber : colours.blue,
  );
  if (!result.evidence_gaps.length)
    text(
      "No applicable form or context gaps recorded. Supporting claims still require independent review.",
    );
  for (const g of result.evidence_gaps)
    text(g.check.replaceAll("_", " ") + ": " + g.problem);
  heading("Specific human-owned next actions", colour);
  for (const a of result.next_actions) text(a.owner + ": " + a.action);
  doc.addPage();
  header();
  y = 30;
  heading("All ten current-condition responses");
  text(
    "Every response and note is user-reported. A record of activity alone is not evidence of acceptable current findings. Offline routing does not assess production readiness.",
  );
  for (const [i, c] of criteria.entries()) {
    space(40);
    heading(`${i + 1}. ${c.title}`);
    text(c.question);
    const r = payload.evidence[c.key];
    text("Reported V2 response: " + r.status.toUpperCase());
    text("Supporting record reference: " + (r.reference || "Not supplied"));
    text("Finding and evidence note (unverified):");
    text(r.note || "Not supplied.");
  }
  heading("Methodology and limitations");
  text("Schema version 2 / methodology version 2.0");
  text(methodology);
  text(limitations);
  text(
    "The interface checks the presence of record references and findings for Yes. It does not measure truth, relevance, sufficiency or semantic consistency. No maturity score, confidence percentage or ROI is calculated.",
  );
  text(
    "Privacy: assessment answers remain in page memory. The app uses no persistent browser storage and uploads no answers. Exported JSON/PDF files persist on the device. GitHub Pages receives ordinary asset requests. The original V1 source, if imported, is preserved in JSON and is not independently verified.",
  );
  text(
    "Method and sources: github.com/shaunmarsden/practical-ai-adoption/tree/main/tools/pilot-readiness",
  );
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...colours.muted);
    doc.text("Self-reported / No operational approval / Method 2.0", 20, 285);
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
      "The local report font could not be loaded. Try again or save JSON.",
    );
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192)
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  buildReport(payload, btoa(binary)).save("ai-pilot-readiness-v2.pdf");
}
