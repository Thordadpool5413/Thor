const storageKey = "bloombuddy-data-v1";

const periodForm = document.getElementById("period-form");
const moodForm = document.getElementById("mood-form");
const journalForm = document.getElementById("journal-form");

const periodList = document.getElementById("period-list");
const moodList = document.getElementById("mood-list");
const journalList = document.getElementById("journal-list");
const nextPeriod = document.getElementById("next-period");

const state = loadState();
renderAll();

periodForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const start = document.getElementById("period-start").value;
  const end = document.getElementById("period-end").value;

  if (!start || !end || start > end) {
    alert("Please pick a valid start and end date.");
    return;
  }

  state.periods.unshift({ start, end });
  saveAndRender();
  periodForm.reset();
});

moodForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const mood = document.getElementById("mood-select").value;
  const note = document.getElementById("mood-note").value.trim();

  if (!mood) {
    alert("Please pick your mood first.");
    return;
  }

  state.moods.unshift({
    mood,
    note,
    date: new Date().toISOString().slice(0, 10)
  });

  saveAndRender();
  moodForm.reset();
});

journalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entry = document.getElementById("journal-entry").value.trim();

  if (!entry) {
    alert("Please write a short entry first.");
    return;
  }

  state.journal.unshift({
    entry,
    date: new Date().toISOString().slice(0, 10)
  });

  saveAndRender();
  journalForm.reset();
});

function saveAndRender() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  renderAll();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && typeof saved === "object") {
      return {
        periods: Array.isArray(saved.periods) ? saved.periods : [],
        moods: Array.isArray(saved.moods) ? saved.moods : [],
        journal: Array.isArray(saved.journal) ? saved.journal : []
      };
    }
  } catch {
    // Ignore invalid local storage data and use defaults.
  }

  return {
    periods: [],
    moods: [],
    journal: []
  };
}

function renderAll() {
  renderPeriods();
  renderMoods();
  renderJournal();
}

function renderPeriods() {
  periodList.innerHTML = "";

  if (!state.periods.length) {
    periodList.innerHTML = "<li>No period dates yet.</li>";
    nextPeriod.textContent = "Add your first period date to estimate your next one.";
    return;
  }

  for (const item of state.periods.slice(0, 6)) {
    const li = document.createElement("li");
    li.textContent = `${pretty(item.start)} to ${pretty(item.end)}`;
    periodList.appendChild(li);
  }

  const latest = state.periods[0];
  const next = addDays(latest.start, 28);
  nextPeriod.textContent = `Your next period may start around ${pretty(next)}.`;
}

function renderMoods() {
  moodList.innerHTML = "";

  if (!state.moods.length) {
    moodList.innerHTML = "<li>No mood check-ins yet.</li>";
    return;
  }

  for (const item of state.moods.slice(0, 6)) {
    const li = document.createElement("li");
    const noteText = item.note ? ` — ${item.note}` : "";
    li.textContent = `${pretty(item.date)}: ${item.mood}${noteText}`;
    moodList.appendChild(li);
  }
}

function renderJournal() {
  journalList.innerHTML = "";

  if (!state.journal.length) {
    journalList.innerHTML = "<li>No journal entries yet.</li>";
    return;
  }

  for (const item of state.journal.slice(0, 6)) {
    const li = document.createElement("li");
    li.textContent = `${pretty(item.date)}: ${item.entry}`;
    journalList.appendChild(li);
  }
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function pretty(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
