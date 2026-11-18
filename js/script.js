(function () {
  'use strict';

  var root = document.documentElement;
  var tabList = document.getElementById('tablist');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));
  var menuBtn = document.getElementById('menuBtn');
  var names = tabs.map(function (t) { return t.dataset.tab; });

  var TITLES = {
    home: 'Iroshan Dissanayake | Engineering Technologist',
    about: 'About | Iroshan Dissanayake',
    experience: 'Experience | Iroshan Dissanayake',
    skills: 'Skills | Iroshan Dissanayake',
    projects: 'Projects | Iroshan Dissanayake',
    contact: 'Contact | Iroshan Dissanayake'
  };

  function fromHash() {
    var h = window.location.hash.replace('#', '');
    return names.indexOf(h) > -1 ? h : 'home';
  }

  function closeMenu() {
    tabList.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function show(name) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === name;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p) {
      p.hidden = p.id !== 'panel-' + name;
    });
    document.title = TITLES[name] || TITLES.home;
    window.scrollTo(0, 0);
    closeMenu();
  }

  function go(name) {
    if (window.location.hash.replace('#', '') === name) {
      show(name);
    } else {
      window.location.hash = name; // triggers hashchange, which calls show()
    }
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { go(t.dataset.tab); });
  });

  // Arrow-key navigation across the tab list
  tabList.addEventListener('keydown', function (e) {
    var i = names.indexOf(document.activeElement.dataset.tab);
    if (i < 0) return;
    var next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      tabs[next].focus();
      go(names[next]);
    }
  });

  // Any element with data-goto jumps to that tab (buttons and links)
  Array.prototype.forEach.call(document.querySelectorAll('[data-goto]'), function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      go(el.dataset.goto);
    });
  });

  window.addEventListener('hashchange', function () { show(fromHash()); });

  menuBtn.addEventListener('click', function () {
    var open = tabList.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Projects filter
  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-tags]'));
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      items.forEach(function (it) {
        var tags = it.dataset.tags.split(' ');
        it.hidden = !(f === 'all' || tags.indexOf(f) > -1);
      });
    });
  });

  // Copy email
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn && navigator.clipboard) {
    var label = copyBtn.textContent;
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(copyBtn.dataset.email).then(function () {
        copyBtn.textContent = 'Email copied';
        setTimeout(function () { copyBtn.textContent = label; }, 2000);
      });
    });
  } else if (copyBtn) {
    copyBtn.hidden = true;
  }

  // Hide the CV buttons if the PDF has not been added to the repo yet
  var cvLinks = Array.prototype.slice.call(document.querySelectorAll('[data-cv]'));
  if (cvLinks.length && /^https?:$/.test(window.location.protocol)) {
    fetch(cvLinks[0].getAttribute('href'), { method: 'HEAD' })
      .then(function (r) { if (!r.ok) cvLinks.forEach(function (a) { a.hidden = true; }); })
      .catch(function () {});
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Start on the tab named in the URL
  show(fromHash());

  // One entrance sequence on first load
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () { root.classList.add('is-ready'); });
  });
})();
