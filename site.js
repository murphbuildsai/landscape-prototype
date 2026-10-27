/* Progressive enhancements only — content and navigation work without JavaScript. */
(function () {
  'use strict';
  document.querySelectorAll('[data-current-year]').forEach(function (node) { node.textContent = String(new Date().getFullYear()); });

  document.querySelectorAll('.yc-gallery-filters').forEach(function (control) {
    var root = control.nextElementSibling;
    if (!root || !root.classList.contains('yc-project-grid')) return;
    var buttons = control.querySelectorAll('[data-gallery-filter]');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var value = button.getAttribute('data-gallery-filter');
        buttons.forEach(function (b) { var active = b === button; b.classList.toggle('is-active', active); b.setAttribute('aria-pressed', active ? 'true' : 'false'); });
        root.querySelectorAll('[data-gallery-category]').forEach(function (item) {
          item.hidden = value !== 'all' && item.getAttribute('data-gallery-category') !== value;
        });
      });
    });
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var nodes = document.querySelectorAll('.section-heading, .service-tile, .process-step, .service-detail, .yc-project-item');
    if (nodes.length) {
      document.body.classList.add('js-ready');
      nodes.forEach(function (el) { el.classList.add('reveal-on-scroll'); });
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
      }, { threshold: 0.07, rootMargin: '0px 0px 40px 0px' });
      nodes.forEach(function (node) { observer.observe(node); });
    }
  }

  var form = document.querySelector('.yc-estimate-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      var file = form.querySelector('input[type="file"]');
      if (file && file.files.length && file.files[0].size > 3 * 1024 * 1024) {
        event.preventDefault();
        file.setCustomValidity('Choose an image smaller than 3 MB.');
        file.reportValidity();
        return;
      }
      var button = form.querySelector('button[type="submit"]');
      if (button && form.checkValidity()) { button.disabled = true; button.textContent = 'Sending request…'; }
    });
    var photo = form.querySelector('input[type="file"]');
    if (photo) photo.addEventListener('change', function () { photo.setCustomValidity(''); });
  }
})();
