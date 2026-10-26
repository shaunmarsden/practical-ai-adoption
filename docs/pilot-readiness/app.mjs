import {
  criteria,
  hardGates,
  assess,
  formErrors,
  substantive,
  normaliseImport,
  validDate,
  methodology,
  limitations,
} from "./model.mjs";
import { example } from "./examples.mjs";
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
let current = -1,
  fictional = false;
const localDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
$("date").value = localDate();
$("questions").innerHTML = criteria
  .map(
    (
      c,
      i,
    ) => `<section class="card question" id="panel-${c.key}" hidden aria-labelledby="title-${c.key}">
<p class="eyebrow">Check ${i + 1} of 10</p>${hardGates.includes(c.key) ? '<span class="tag">Essential gate</span>' : ""}
<h2 id="title-${c.key}" tabindex="-1">${c.title}</h2><p>${c.why}</p>
<fieldset><legend>${c.question}</legend><div class="choices">${["yes", "no", "unknown"].map((v) => `<label><input type="radio" name="${c.key}" value="${v}" aria-describedby="error-${c.key}">${v[0].toUpperCase() + v.slice(1)}</label>`).join("")}</div></fieldset>
<label for="note-${c.key}">Evidence note <span class="hint">(required for Yes)</span></label>
<p id="help-${c.key}" class="hint">Identify the record, what it shows and any limits. For Yes: at least 40 characters, 6 words and 4 different words. Length does not establish truth or sufficiency. No or Unknown may have an empty note.</p>
<textarea id="note-${c.key}" maxlength="3000" rows="5" aria-describedby="help-${c.key} error-${c.key}"></textarea>
<p class="error" id="error-${c.key}" hidden></p>
<p class="example"><strong>Example supporting evidence:</strong> ${c.example}</p>
<p class="hint">Consistency check: if your note says this condition is missing or unapproved, choose No or Unknown. The tool cannot understand or verify the note.</p>
</section>`,
  )
  .join("");
$("steps").innerHTML =
  '<button type="button" data-step="-1">Details</button>' +
  criteria
    .map(
      (c, i) =>
        `<button type="button" data-step="${i}" aria-label="Check ${i + 1}: ${c.title}">${i + 1}</button>`,
    )
    .join("") +
  '<button type="button" data-step="10">Review results</button>';
function payload() {
  return {
    pilot: $("pilot").value,
    fictional,
    details: Object.fromEntries(
      ["process", "outcome", "date", "reference"].map((id) => [
        id,
        $(id).value,
      ]),
    ),
    evidence: Object.fromEntries(
      criteria.map((c) => [
        c.key,
        {
          status:
            document.querySelector(`input[name="${c.key}"]:checked`)?.value ||
            "unknown",
          note: $("note-" + c.key).value,
        },
      ]),
    ),
  };
}
function rawPayload() {
  const p = payload();
  for (const c of criteria)
    if (!document.querySelector(`input[name="${c.key}"]:checked`))
      p.evidence[c.key].status = "";
  return p;
}
function showError(message) {
  $("form-error").textContent = message;
  $("form-error").hidden = false;
  $("form-error").focus();
}
function detailsOK() {
  for (const id of ["pilot", "process", "outcome", "date"]) {
    const valid =
      $(id).value.trim() && (id !== "date" || validDate($(id).value));
    $(id).setAttribute("aria-invalid", String(!valid));
    if (!valid) {
      showError(
        "Complete the pilot name, business process, intended outcome and a valid assessment date.",
      );
      $(id).focus();
      return false;
    }
  }
  return true;
}
function progress() {
  const p = rawPayload();
  const n = criteria.filter((c) => {
    const r = p.evidence[c.key];
    return r.status && (r.status !== "yes" || substantive(r.note));
  }).length;
  $("progress").value = n;
  $("progress-text").textContent =
    `${n} of 10 checks answered with valid input. This is progress, not a readiness score.`;
}
function openWorkspace() {
  $("workspace").hidden = false;
  $("fictional").hidden = !fictional;
  progress();
}
function show(step, focus = true) {
  current = step;
  $("details-panel").hidden = step !== -1;
  $("results").hidden = step !== 10;
  for (const [i, c] of criteria.entries())
    $("panel-" + c.key).hidden = step !== i;
  $("question-nav").hidden = step < 0 || step > 9;
  $("previous").textContent = step === 0 ? "Pilot details" : "Previous";
  $("next").textContent = step === 9 ? "Review answers" : "Next check";
  for (const b of $("steps").querySelectorAll("button")) {
    if (Number(b.dataset.step) === step) b.setAttribute("aria-current", "step");
    else b.removeAttribute("aria-current");
  }
  $("form-error").hidden = true;
  if (focus) {
    const heading =
      step === -1
        ? $("details-title")
        : step === 10
          ? $("result-title")
          : $("title-" + criteria[step].key);
    heading?.focus();
    heading?.scrollIntoView({ block: "start", behavior: "instant" });
  }
}
function currentOK() {
  if (current === -1) return detailsOK();
  const c = criteria[current];
  if (!c) return true;
  const error = formErrors(rawPayload())[c.key];
  const el = $("error-" + c.key);
  el.textContent = error || "";
  el.hidden = !error;
  $("note-" + c.key).setAttribute("aria-invalid", String(!!error));
  if (error) {
    showError(`${c.title}: ${error}`);
    return false;
  }
  return true;
}
function review() {
  if (!detailsOK()) {
    show(-1, false);
    $("form-error").hidden = false;
    $("details-panel").querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  const p = rawPayload(),
    errors = formErrors(p),
    first = criteria.findIndex((c) => errors[c.key]);
  if (first >= 0) {
    show(first);
    currentOK();
    return;
  }
  $("results").innerHTML =
    `<p class="eyebrow">Before interpreting the record</p><h2 id="result-title" tabindex="-1">Review your reported evidence</h2><p>A Yes does not prove that a condition was met. Read each note against its response, especially permissions, ownership and stop arrangements. If a note contradicts Yes, change the response to No or Unknown.</p>${records(p)}<label class="attestation"><input type="checkbox" id="consistency"> <span>I have reviewed the responses and notes for contradictions. Each Yes identifies supporting evidence, rather than a missing requirement. This is my own report, not independent verification.</span></label><button id="interpret" class="primary">Show rule-based result</button><p id="review-error" role="alert"></p>`;
  show(10);
  $("interpret").onclick = () => {
    if (!$("consistency").checked) {
      $("review-error").textContent =
        "Review the records and confirm the consistency check before continuing.";
      return;
    }
    renderResults(p);
  };
}
function records(p) {
  return criteria
    .map(
      (c, i) =>
        `<div class="record"><strong>${i + 1}. ${c.title}: ${p.evidence[c.key].status.toUpperCase()}</strong> <button type="button" data-edit="${i}">Edit</button><p><span class="hint">User-reported note:</span><br>${escape(p.evidence[c.key].note) || "Not supplied."}</p></div>`,
    )
    .join("");
}
function list(items, p) {
  return items.length
    ? '<ul class="result-list">' +
        items
          .map(
            (c) =>
              `<li><strong>${c.title} (${p.evidence[c.key].status.toUpperCase()})</strong><br>${c.next}</li>`,
          )
          .join("") +
        "</ul>"
    : "<p>None recorded. Supporting records still require verification.</p>";
}
function renderResults(p) {
  const r = assess(p),
    blockers = criteria.filter((c) =>
      r.essential_blockers.some((b) => b.check === c.key),
    ),
    other = criteria.filter(
      (c) =>
        r.remaining_gaps.some((g) => g.check === c.key) &&
        !hardGates.includes(c.key),
    );
  $("results").innerHTML =
    `<p class="eyebrow">Rule-based interpretation / unverified evidence</p><h2 id="result-title" tabindex="-1" class="decision ${blockers.length ? "blocked" : other.length ? "limited" : ""}">${r.decision}</h2><p>${r.reason}</p>${p.fictional ? '<p class="notice">FICTIONAL EXAMPLE: this result uses invented evidence.</p>' : ""}<p class="notice"><strong>Human approval is required.</strong> ${r.warning} A limited result does not authorise continued piloting without its own approvals.</p><h3>Essential blockers and next checks</h3>${list(blockers, p)}<h3>Other evidence gaps and next checks</h3>${list(other, p)}<h3>What remains with a human owner</h3><p>Inspect the actual records, resolve contradictions, confirm local permissions and decide whether to stop, test further or propose wider use. Record that decision separately. A completed questionnaire is not an independently validated business case.</p>${!r.remaining_gaps.length ? "<p>Before considering expansion, independently verify all ten supporting records below.</p>" : ""}<div class="actions"><button id="pdf" class="primary">Download PDF report</button><button id="edit-all">Review answers again</button></div><p id="pdf-message" role="status"></p><details><summary>All ten responses and evidence notes</summary>${records(p)}</details><details><summary>Methodology and limitations</summary><p>${methodology}</p><p>${limitations}</p></details>`;
  $("result-title").focus();
  $("pdf").onclick = async () => {
    const b = $("pdf");
    b.disabled = true;
    $("pdf-message").textContent = "Preparing the report on your device...";
    try {
      await downloadReport(p);
      $("pdf-message").textContent =
        "PDF prepared. Check your browser downloads.";
    } catch (e) {
      $("pdf-message").textContent = "PDF could not be created: " + e.message;
    } finally {
      b.disabled = false;
    }
  };
  $("edit-all").onclick = review;
}
$("results").addEventListener("click", (e) => {
  const button = e.target.closest("[data-edit]");
  if (button) show(Number(button.dataset.edit));
});
$("steps").onclick = (e) => {
  const b = e.target.closest("[data-step]");
  if (!b) return;
  const step = Number(b.dataset.step);
  if (step === 10) review();
  else show(step);
};
$("assessment").addEventListener("submit", (e) => e.preventDefault());
$("assessment").addEventListener("input", () => {
  progress();
  $("results").hidden = true;
});
$("begin").onclick = () => {
  if (detailsOK()) show(0);
};
$("previous").onclick = () => show(current - 1);
$("next").onclick = () => {
  if (currentOK()) {
    if (current === 9) review();
    else show(current + 1);
  }
};
$("start").onclick = () => {
  openWorkspace();
  show(-1);
};
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
  fictional = p.fictional === true;
  $("pilot").value = p.pilot;
  for (const id of ["process", "outcome", "date", "reference"])
    $(id).value = p.details?.[id] || (id === "date" ? localDate() : "");
  for (const c of criteria) {
    for (const el of document.querySelectorAll(`input[name="${c.key}"]`))
      el.checked = el.value === p.evidence[c.key].status;
    $("note-" + c.key).value = p.evidence[c.key].note;
    $("error-" + c.key).hidden = true;
  }
  openWorkspace();
  show(-1);
}
$("explore").onclick = async () => {
  if (await canReplace()) load(example("A"));
};
$("reset").onclick = async () => {
  if (await canReplace()) {
    $("assessment").reset();
    $("date").value = localDate();
    fictional = false;
    $("results").replaceChildren();
    $("file-message").textContent = "";
    openWorkspace();
    show(-1);
  }
};
function save(data, name, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
$("export").onclick = () => {
  const p = payload();
  if (!p.pilot.trim()) {
    show(-1);
    showError("Enter a pilot name before saving JSON.");
    return;
  }
  save(JSON.stringify(p, null, 2), "pilot-readiness.json", "application/json");
  $("file-message").textContent =
    "JSON prepared. Unanswered checks are saved as Unknown; this is a draft, not a readiness decision.";
};
$("import").onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > 100000)
      throw Error("Choose a JSON file smaller than 100 KB.");
    const p = normaliseImport(JSON.parse(await file.text()));
    if (await canReplace()) {
      load(p);
      $("file-message").textContent =
        "Imported locally. Check the details and all evidence notes before viewing results. Short Yes notes must be improved or changed to No or Unknown.";
    }
  } catch (err) {
    $("file-message").textContent =
      "Import failed. Current answers were kept. " + err.message;
  } finally {
    e.target.value = "";
  }
};
