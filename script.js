const year = new Date().getFullYear();
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = year));

document.querySelectorAll('[data-build]').forEach((el) => {
  el.textContent = 'Build 2026-04-30';
});
