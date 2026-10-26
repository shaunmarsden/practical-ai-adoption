import {
  criteria,
  originalGates,
  emptyRecord,
  normaliseImport,
  assess,
  validate,
  decisions,
  methodology,
  limitations,
  MAX_IMPORT_BYTES,
} from "./model-v2.mjs";
import { example } from "./examples-v2.mjs";
import { downloadReport } from "./report.mjs";
const $ = (id) => document.getElementById(id);
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
let record = emptyRecord(),
  current = -2;
$("questions").innerHTML = criteria
  .map(
    (c, i) =>
      `<section id="panel-${c.key}" class="card question" hidden aria-labelledby="title-${c.key}"><p class="eyebrow">Condition ${i + 1} of 10</p>${originalGates.includes(c.key) ? '<span class="tag">Essential safeguard</span>' : ""}<h2 id="title-${c.key}" tabindex="-1">${c.title}</h2><p>${c.why}</p><fieldset><legend>${c.question}</legend><div class="choices">${["yes", "no", "unknown"].map((v) => `<label><input type="radio" name="${c.key}" value="${v}" data-path="evidence.${c.key}.status">${v[0].toUpperCase() + v.slice(1)}</label>`).join("")}</div></fieldset><p class="hint">Yes means the whole condition is currently satisfied for the stated scope, with acceptable findings. No means it is not satisfied. Choose Unknown if you cannot establish it. A completed activity alone is not Yes.</p><p id="prior-${c.key}" class="notice" hidden></p><label for="ref-${c.key}">Supporting record reference (needed for a supported Yes)</label><input id="ref-${c.key}" maxlength="500" data-path="evidence.${c.key}.reference"><label for="note-${c.key}">Finding and evidence note (needed for a supported Yes)</label><textarea id="note-${c.key}" maxlength="3000" rows="5" data-path="evidence.${c.key}.note"></textarea><p class="hint">Record what the evidence shows, its current scope and limits. Short, checkable references are welcome. Presence is checked; truth and adequacy are not verified.</p><p class="example"><strong>Example supporting evidence:</strong> ${c.example}</p><p class="hint">If there is a material unresolved issue, record it in Issues as well as choosing the appropriate condition response. The tool cannot discover it from this note.</p></section>`,
  )
  .join("");
$("steps").innerHTML =
  '<button type="button" data-step="-2">Scope</button><button type="button" data-step="-1">Issues</button>' +
  criteria
    .map(
      (c, i) =>
        `<button type="button" data-step="${i}" aria-label="Condition ${i + 1}: ${c.title}">${i + 1}</button>`,
    )
    .join("") +
  '<button type="button" data-step="10">View result</button>';
function get(path) {
  return path.split(".").reduce((v, k) => v?.[k], record);
}
function set(path, value) {
  const keys = path.split(".");
  let v = record;
  for (const k of keys.slice(0, -1)) v = v[k];
  v[keys.at(-1)] = value;
}
function read() {
  for (const el of document.querySelectorAll("[data-path]")) {
    const path = el.dataset.path;
    if (path.startsWith("migration.") && !record.migration) continue;
    if (el.type === "radio" && !el.checked) continue;
    set(path, el.type === "checkbox" ? el.checked : el.value);
  }
  return structuredClone(record);
}
function populate() {
  $("results").replaceChildren();
  for (const el of document.querySelectorAll("[data-path]")) {
    const value = get(el.dataset.path);
    if (el.type === "radio") el.checked = el.value === value;
    else if (el.type === "checkbox") el.checked = value === true;
    else el.value = value ?? "";
  }
  openWorkspace();
  $("migration-notice").hidden = !record.migration;
  $("date-review-label").hidden = !record.migration;
  $("legacy-source").textContent = record.migration
    ? JSON.stringify(record.migration.source_record, null, 2)
    : "";
  for (const c of criteria) {
    const prior = $("prior-" + c.key);
    prior.hidden = !record.migration;
    prior.textContent = record.migration
      ? `V1 reported ${record.migration.source_record.evidence[c.key].status.toUpperCase()}. That historical answer is not V2 acceptance. Original note retained below; reassess it against this question.`
      : "";
  }
}
function progress() {
  const count = criteria.filter(
    (c) => record.evidence[c.key].status !== "unknown",
  ).length;
  $("progress").value = count;
  $("progress-text").textContent =
    `${count} of 10 conditions answered Yes or No. Unknown remains an open question. This is navigation progress, not readiness.`;
}
function openWorkspace() {
  $("workspace").hidden = false;
  $("fictional").hidden = !record.fictional;
  progress();
}
function show(step, focus = true) {
  current = step;
  $("context-panel").hidden = step !== -2;
  $("issue-panel").hidden = step !== -1;
  $("results").hidden = step !== 10;
  $("question-nav").hidden = step === 10;
  for (const [i, c] of criteria.entries())
    $("panel-" + c.key).hidden = step !== i;
  $("previous").disabled = step === -2;
  $("previous").textContent = step === 0 ? "Issues" : "Previous";
  $("next").textContent =
    step === 9
      ? "Assess this record"
      : step === -2
        ? "Continue to issues"
        : step === -1
          ? "Continue to conditions"
          : "Next condition";
  for (const b of $("steps").querySelectorAll("button")) {
    if (Number(b.dataset.step) === step) b.setAttribute("aria-current", "step");
    else b.removeAttribute("aria-current");
  }
  $("form-error").hidden = true;
  if (focus) {
    const el =
      step === -2
        ? $("context-title")
        : step === -1
          ? $("issue-title")
          : step === 10
            ? $("result-title")
            : $("title-" + criteria[step].key);
    el?.focus();
    el?.scrollIntoView({ block: "start" });
  }
}
function alert(message) {
  $("form-error").textContent = message;
  $("form-error").hidden = false;
  $("form-error").focus();
}
function list(items, render) {
  return items.length
    ? '<ul class="result-actions">' +
        items.map((i) => "<li>" + render(i) + "</li>").join("") +
        "</ul>"
    : "";
}
function renderResult() {
  let p, r;
  try {
    p = read();
    r = assess(p);
  } catch (e) {
    alert(e.message);
    return;
  }
  const state =
    r.decision === decisions.hold
      ? "blocked"
      : r.decision === decisions.complete
        ? "complete"
        : r.decision === decisions.offline
          ? "offline"
          : "limited";
  const issues = r.known_issues.length
    ? '<div class="issue-alert"><h3>Known unresolved material issue</h3>' +
      r.known_issues
        .map(
          (i) =>
            `<p class="assessment-note"><strong>${escape(i.summary)}</strong></p><p><strong>Human owner:</strong> ${escape(i.owner)}<br><strong>Required next action:</strong> ${escape(i.next_step)}</p>`,
        )
        .join("") +
      "</div>"
    : `<p class="notice"><strong>Reported issue position:</strong> ${p.material_issue.status === "none_identified" ? "No material issue identified in the evidence reviewed. This is not independent verification." : "Unknown or insufficiently assessed. Investigate before relying on the record."}${p.material_issue.summary ? '<br><span class="assessment-note">' + escape(p.material_issue.summary) + "</span>" : ""}</p>`;
  $("results").innerHTML =
    `<p class="eyebrow">Self-reported record / schema 2 / method 2.0</p><h2 id="result-title" class="decision ${state}" tabindex="-1">${r.decision}</h2><p>${r.reason}</p>${p.fictional ? '<p class="notice">FICTIONAL DATA: this is not evidence of a real business outcome.</p>' : ""}${issues}${!r.known_issues.length && (p.material_issue.owner || p.material_issue.next_step) ? `<p class="assessment-note"><strong>Recorded issue context (unverified):</strong><br>Role: ${escape(p.material_issue.owner) || "Not assigned"}<br>Proposed action: ${escape(p.material_issue.action)}<br>Next step: ${escape(p.material_issue.next_step) || "Not supplied"}</p>` : ""}<p class="scope-summary"><strong>Scope:</strong> ${escape(p.scope.activity.replaceAll("_", " "))}<br><strong>Proposed use:</strong> ${escape(p.scope.proposed_scale) || "Not supplied"}<br><strong>Version:</strong> ${escape(p.scope.current_version) || "Not supplied"}<br><strong>Assessment date:</strong> ${escape(p.details.date) || "Not supplied"}<br><strong>Data:</strong> ${escape(p.scope.data.replaceAll("_", " "))}; external effects: ${escape(p.scope.external_effects)}; people/decisions: ${escape(p.scope.people_impact)}</p><p class="notice"><strong>Human approval is required.</strong> ${r.warning}</p><h3>${r.assessment_route === "offline_learning" ? "Operational conditions for any future real use" : "Known conditions not satisfied"}</h3>${list(r.known_blockers, (b) => `<strong>${escape(criteria.find((c) => c.key === b.check).title)}: NO</strong><p class="assessment-note">${escape(b.note) || "No note supplied."}</p><p>${escape(b.next_action)}</p>`) || "<p>No condition is reported as No. This does not establish that conditions are independently satisfied.</p>"}<h3>Missing or insufficient evidence</h3>${list(r.evidence_gaps, (g) => `<strong>${escape(g.check.replaceAll("_", " "))}:</strong> ${escape(g.problem)}<br>${escape(g.next_action)}`) || "<p>No applicable form or context gaps recorded. Supporting claims still require independent review.</p>"}<h3>Human-owned next actions</h3>${list(r.next_actions, (a) => `<strong>${escape(a.owner)}:</strong> ${escape(a.action)}`)}<div class="actions"><button id="pdf" class="primary">Download PDF report</button><button id="review-issues">Review scope and issues</button></div><p id="pdf-message" role="status" aria-live="polite"></p><h3>Ten reported responses and evidence notes</h3><p>These are acceptance claims, not independently verified findings.</p>${criteria.map((c, i) => `<details class="record-summary" ${p.evidence[c.key].status !== "yes" ? "open" : ""}><summary>${i + 1}. ${c.title}: ${p.evidence[c.key].status.toUpperCase()}</summary><p>${c.question}</p><p><strong>Record reference:</strong> ${escape(p.evidence[c.key].reference) || "Not supplied"}</p><p class="assessment-note">${escape(p.evidence[c.key].note) || "No finding note supplied."}</p><button type="button" data-edit="${i}">Edit this condition</button></details>`).join("")}<details><summary>Method and limits</summary><p>${methodology}</p><p>${limitations}</p></details>`;
  show(10);
  $("pdf").onclick = async () => {
    const button = $("pdf");
    button.disabled = true;
    $("pdf-message").textContent = "Preparing the report locally...";
    try {
      await downloadReport(p);
      $("pdf-message").textContent = "PDF prepared. Check your downloads.";
    } catch (e) {
      $("pdf-message").textContent = "PDF could not be created: " + e.message;
    } finally {
      button.disabled = false;
    }
  };
  $("review-issues").onclick = () => show(-1);
}
async function canReplace() {
  if (!$("workspace").hidden) {
    const d = $("confirm-dialog");
    d.showModal();
    return await new Promise((resolve) =>
      d.addEventListener("close", () => resolve(d.returnValue === "replace"), {
        once: true,
      }),
    );
  }
  return true;
}
function load(p) {
  record = structuredClone(p);
  populate();
  show(-2);
}
$("assessment").addEventListener("input", () => {
  read();
  progress();
  $("results").hidden = true;
});
$("assessment").addEventListener("submit", (e) => e.preventDefault());
$("steps").onclick = (e) => {
  const b = e.target.closest("[data-step]");
  if (!b) return;
  read();
  Number(b.dataset.step) === 10 ? renderResult() : show(Number(b.dataset.step));
};
$("results").onclick = (e) => {
  const b = e.target.closest("[data-edit]");
  if (b) show(Number(b.dataset.edit));
};
$("next").onclick = () => {
  read();
  current === 9 ? renderResult() : show(current + 1);
};
$("previous").onclick = () => {
  read();
  show(current - 1);
};
$("start").onclick = () => {
  openWorkspace();
  show(-2);
};
$("explore").onclick = async () => {
  if (await canReplace()) load(example($("example-kind").value));
};
$("reset").onclick = async () => {
  if (await canReplace()) {
    record = emptyRecord();
    populate();
    $("file-message").textContent = "";
    show(-2);
  }
};
$("today").onclick = () => {
  const d = new Date();
  $("date").value =
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  read();
};
function save(data, name) {
  const url = URL.createObjectURL(
    new Blob([data], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
$("export").onclick = () => {
  try {
    const p = read();
    validate(p);
    save(JSON.stringify(p, null, 2), "pilot-readiness-v2.json");
    $("file-message").textContent =
      "V2 draft prepared. Export is a record, not an assessment approval. Any original V1 source data is included.";
  } catch (e) {
    $("file-message").textContent = e.message;
  }
};
$("import").onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > MAX_IMPORT_BYTES)
      throw Error("Choose a JSON record of at most 1 MB.");
    const p = normaliseImport(JSON.parse(await file.text()));
    if (await canReplace()) {
      load(p);
      $("file-message").textContent = p.migration
        ? "V1 source retained. Reassess all ten V2 conditions, scope and material issues; review the date explicitly."
        : "V2 record imported locally without changing its date, responses or notes.";
    }
  } catch (err) {
    $("file-message").textContent =
      "Import failed; current answers were kept. " + err.message;
  } finally {
    e.target.value = "";
  }
};
populate();
$("workspace").hidden = true;
