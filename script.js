(function () {
  function setYear() {
    var year = String(new Date().getFullYear());
    var nodes = document.querySelectorAll('[data-year]');
    for (var i = 0; i < nodes.length; i += 1) {
      nodes[i].textContent = year;
    }
  }

  function markActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-links a[href]');

    for (var i = 0; i < links.length; i += 1) {
      var link = links[i];
      var href = link.getAttribute('href');
      if (!href) continue;

      if (href === path) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    }
  }

  function setupMenu() {
    var header = document.querySelector('.nav-wrap');
    var button = document.querySelector('.menu-toggle');
    if (!header || !button) return;

    button.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function setupFormStatus() {
    var form = document.querySelector('[data-contact-form]');
    var status = document.querySelector('[data-form-status]');
    if (!form || !status) return;

    form.addEventListener('submit', function () {
      status.textContent = 'Sending the transmission. Stand by for polite thunder.';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setYear();
      markActiveNav();
      setupMenu();
      setupFormStatus();
    });
  } else {
    setYear();
    markActiveNav();
    setupMenu();
    setupFormStatus();
  }
})();
