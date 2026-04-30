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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setYear();
      markActiveNav();
    });
  } else {
    setYear();
    markActiveNav();
  }
})();
