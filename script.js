document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const demoMap = {
  launchpad: 'Weather: sunny. Schedule: loaded. Missing shoes: 1.',
  joke: 'Why did the dad bring a ladder to the beach? High tide strategy.',
  trip: 'Route optimized. Snack stop in 42 min. Peace treaty holding.'
};

document.querySelectorAll('[data-demo]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-demo');
    const output = document.getElementById(key);
    if (output && demoMap[key]) output.textContent = demoMap[key];
  });
});
