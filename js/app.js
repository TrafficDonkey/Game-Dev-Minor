/* =============================================================================
 * Game Dev Academy — application shell: boot, layout, sidebar, search, routing,
 * and the theme / colourblind / reduced-motion toggles.
 * Loaded last; registers routes and starts the router.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA;
  var ui = GDA.ui, store = GDA.store, router = GDA.router, C = GDA.curric;
  var outlet = null;

  // Views register teardown fns (animation loops, key handlers) run before the next mount.
  var disposers = [];
  GDA.addDisposable = function (fn) { if (typeof fn === 'function') disposers.push(fn); };
  function disposeAll() { disposers.forEach(function (f) { try { f(); } catch (e) {} }); disposers = []; }

  var NAV = [
    { href: '/dashboard',  icon: 'home',    label: 'Dashboard' },
    { href: '/curriculum', icon: 'book',    label: 'Curriculum' },
    { href: '/tools',      icon: 'sliders', label: 'Interactive tools' },
    { href: '/projects',   icon: 'check',   label: 'Projects' },
    { href: '/glossary',   icon: 'book',    label: 'Glossary' },
    { href: '/shortcuts',  icon: 'git',     label: 'Engine · Blender · Git keys' },
    { href: '/milestones', icon: 'flag',    label: 'Milestones' }
  ];

  function prefersReducedMotion() { return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function applyPrefs() {
    var p = store.state.prefs;
    document.body.classList.toggle('theme-light', p.theme === 'light');
    document.body.classList.toggle('cb', !!p.colorblind);
    document.body.classList.toggle('reduce-motion', !!p.reduceMotion || prefersReducedMotion());
  }

  // Signature mark: an isometric transform gizmo — a cube with X/Y/Z axes (red/green/blue)
  // and an amber "play / selected" node. The X/Y/Z motif recurs across the site.
  function logoSVG() {
    return '<svg class="logo" viewBox="0 0 44 44" aria-hidden="true">' +
      '<rect width="44" height="44" rx="10" fill="var(--panel-2)"/>' +
      '<path d="M22 9l11 6v14l-11 6-11-6V15z" fill="none" stroke="var(--ink-3)" stroke-width="1.4" opacity=".7"/>' +
      '<path d="M22 22l11-7M22 22v13M22 22L11 15" fill="none" stroke="var(--line)" stroke-width="1"/>' +
      // gizmo axes from centre
      '<path d="M22 22l8 -4.6" stroke="var(--axis-x)" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M22 22v9.5" stroke="var(--axis-y)" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M22 22l-8 -4.6" stroke="var(--axis-z)" stroke-width="2.2" stroke-linecap="round"/>' +
      '<circle cx="22" cy="22" r="2.6" fill="var(--accent)"/></svg>';
  }

  function buildLayout() {
    var app = ui.h('div', { class: 'app' });
    var brand = ui.h('a', { class: 'brand', href: '#/dashboard', 'aria-label': 'Game Dev Academy home' },
      logoSVG() + '<div class="title">Game Dev Academy<small>Story · Design · Levels · Art · Code</small></div>');

    var topbar = ui.h('div', { class: 'topbar' });
    var menuBtn = ui.h('button', { class: 'iconbtn menu-toggle', 'aria-label': 'Toggle menu' }, ui.icon('menu'));
    menuBtn.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
    var search = buildSearch();
    var spacer = ui.h('div', { class: 'spacer' });

    var cbBtn = toggle('eye', 'colorblind', 'Colourblind-safe mode (adds labels/shapes to colour-coded UI)');
    var motionBtn = toggle('bolt', 'reduceMotion', 'Reduce motion');
    var themeBtn = ui.h('button', { class: 'iconbtn', 'aria-label': 'Toggle light / dark theme', title: 'Light / dark' }, ui.icon('sun'));
    themeBtn.addEventListener('click', function () { store.setPref('theme', store.state.prefs.theme === 'light' ? 'dark' : 'light'); applyPrefs(); });

    topbar.appendChild(menuBtn); topbar.appendChild(search.el); topbar.appendChild(spacer);
    topbar.appendChild(cbBtn); topbar.appendChild(motionBtn); topbar.appendChild(themeBtn);

    var sidebar = ui.h('nav', { class: 'sidebar', id: 'sidebar', 'aria-label': 'Curriculum navigation' });
    var scrim = ui.h('div', { class: 'scrim', 'aria-hidden': 'true' });
    scrim.addEventListener('click', function () { document.body.classList.remove('nav-open'); });

    var main = ui.h('main', { class: 'main' });
    outlet = ui.h('div', { class: 'main-inner', id: 'outlet', tabindex: '-1' });
    main.appendChild(outlet);

    app.appendChild(brand); app.appendChild(topbar); app.appendChild(sidebar); app.appendChild(main); app.appendChild(scrim);
    document.getElementById('app').appendChild(app);
    renderSidebar();

    store.on(function (ev) {
      if (ev === 'lessons' || ev === 'prefs' || ev === 'import' || ev === 'reset' || ev === 'milestones') renderSidebar();
      if (ev === 'import' || ev === 'reset') { GDA.search.rebuild(); router.navigate(router.current() || '/dashboard'); }
    });
  }

  function toggle(iconName, pref, title) {
    var btn = ui.h('button', { class: 'iconbtn', 'aria-label': title, title: title }, ui.icon(iconName));
    btn.classList.toggle('on', !!store.state.prefs[pref]);
    btn.addEventListener('click', function () {
      var v = !store.state.prefs[pref]; store.setPref(pref, v); applyPrefs(); btn.classList.toggle('on', v);
      if (pref === 'colorblind') router.navigate(router.current() || '/dashboard');
    });
    return btn;
  }

  function buildSearch() {
    var wrap = ui.h('div', { class: 'search', role: 'search' });
    var iconEl = ui.h('span', { class: 'si' }, ui.icon('search'));
    var input = ui.h('input', { type: 'search', placeholder: 'Search lessons, terms, shortcuts, tools…', 'aria-label': 'Search', autocomplete: 'off' });
    var kbd = ui.h('kbd', { 'aria-hidden': 'true' }, '/');
    var results = ui.h('div', { class: 'search-results', role: 'listbox' }); results.style.display = 'none';
    wrap.appendChild(iconEl); wrap.appendChild(input); wrap.appendChild(kbd); wrap.appendChild(results);
    var active = -1, list = [];
    function render() {
      var q = input.value;
      list = GDA.search.search(q);
      if (!q.trim()) { results.style.display = 'none'; return; }
      active = -1;
      if (!list.length) { results.innerHTML = '<div class="sr-empty">No matches for “' + ui.esc(q) + '”.</div>'; results.style.display = 'block'; return; }
      results.innerHTML = list.map(function (r, i) {
        return '<div class="sr-item" role="option" data-i="' + i + '"><span class="sr-kind k-' + r.kind.toLowerCase() + '">' + ui.esc(r.kind) + '</span>'
          + '<span class="sr-body"><strong>' + ui.esc(r.title) + '</strong> <span class="dim">' + ui.esc((r.sub || '').slice(0, 80)) + '</span></span></div>';
      }).join('');
      results.style.display = 'block';
      Array.prototype.forEach.call(results.querySelectorAll('.sr-item'), function (item) {
        item.addEventListener('mousedown', function (e) { e.preventDefault(); go(parseInt(item.getAttribute('data-i'), 10)); });
      });
    }
    function go(i) { var r = list[i]; if (!r) return; input.value = ''; results.style.display = 'none'; input.blur(); router.navigate(r.href); }
    input.addEventListener('input', render);
    input.addEventListener('focus', function () { if (input.value.trim()) render(); });
    input.addEventListener('blur', function () { setTimeout(function () { results.style.display = 'none'; }, 160); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; results.style.display = 'none'; input.blur(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(list.length - 1, active + 1); hl(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); hl(); }
      else if (e.key === 'Enter') { if (active >= 0) go(active); else if (list.length) go(0); }
    });
    function hl() { Array.prototype.forEach.call(results.querySelectorAll('.sr-item'), function (it, i) { it.classList.toggle('active', i === active); if (i === active) it.scrollIntoView({ block: 'nearest' }); }); }
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input && !/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ''))) { e.preventDefault(); input.focus(); }
    });
    return { el: wrap, input: input };
  }

  function renderSidebar() {
    var sb = document.getElementById('sidebar');
    if (!sb) return;
    var cur = router.current() || location.hash.replace('#', '').split('?')[0];
    var html = '<div class="side-section">';
    NAV.forEach(function (n) {
      var act = cur === n.href || (n.href !== '/dashboard' && cur && cur.indexOf(n.href) === 0);
      html += '<a class="navlink' + (act ? ' active' : '') + '" href="#' + n.href + '"><span class="ic">' + ui.icon(n.icon) + '</span>' + n.label + '</a>';
    });
    html += '</div>';

    var t = C.totals();
    html += '<div class="side-section"><div class="side-h">Curriculum <span class="dim">' + t.done + '/' + t.total + '</span></div>';
    var pillars = C.pillars();
    if (!pillars.length || !t.total) { html += '<div class="dim side-note">Curriculum is loading…</div>'; }
    pillars.forEach(function (pl) {
      var pp = C.pillarProgress(pl.id);
      html += '<div class="pillar-group"><div class="pillar-head"><span class="pillar-dot" style="background:var(--p-' + pl.id + ')"></span>'
        + '<span class="pillar-name"><span class="pl">' + pl.id + '</span>' + ui.esc(pl.short) + '</span>'
        + '<span class="dim mono" style="font-size:.68rem;margin-left:auto">' + pp.done + '/' + pp.total + '</span></div>';
      C.phasesOf(pl.id).forEach(function (ph) {
        var ls = C.lessonsOf(ph.id);
        if (!ls.length) return;
        var pr = C.phaseProgress(ph.id);
        var open = cur && ls.some(function (L) { return cur === '/lesson/' + L.id; });
        var idx = C.phasesOf(pl.id).map(function (x) { return x.id; }).indexOf(ph.id);
        html += '<details class="phase"' + (open ? ' open' : '') + '><summary><span class="twist">' + ui.icon('chev') + '</span>'
          + '<span class="ph-num">' + pl.id + idx + '</span><span class="ph-title">' + ui.esc(ph.title) + '</span></summary>';
        html += '<div class="ph-bar"><span class="pbar"><i style="width:' + pr.pct + '%;background:var(--p-' + pl.id + ')"></i></span><span class="dim" style="font-size:.7rem">' + pr.done + '/' + pr.total + '</span></div>';
        ls.forEach(function (L) {
          var ld = store.isDone(L.id), act = cur === '/lesson/' + L.id;
          html += '<a class="lesson-link' + (ld ? ' done' : '') + (act ? ' active' : '') + '" href="#/lesson/' + L.id + '">'
            + '<span class="tick">' + (ld ? '✓' : '') + '</span><span class="ll-title">' + ui.esc(L.title) + '</span>'
            + '<span class="diffdot d-' + L.difficulty + '" title="' + L.difficulty + '"></span></a>';
        });
        html += '</details>';
      });
      html += '</div>';
    });
    html += '</div>';
    sb.innerHTML = html;
    Array.prototype.forEach.call(sb.querySelectorAll('a[href]'), function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  function mount(fn) {
    return function (params) {
      disposeAll();
      document.body.classList.remove('nav-open');
      outlet.innerHTML = '';
      try { fn(outlet, params); }
      catch (e) { outlet.innerHTML = '<div class="empty"><h2>Something went wrong rendering this view.</h2><code>' + ui.esc(e.message) + '</code></div>'; console.error(e); }
      renderSidebar();
      window.scrollTo(0, 0);
      if (outlet.focus) outlet.focus({ preventScroll: true });
    };
  }

  function registerRoutes() {
    var V = GDA.views;
    router.add('/', mount(V.dashboard));
    router.add('/dashboard', mount(V.dashboard));
    router.add('/curriculum', mount(V.curriculum));
    router.add('/lesson/:id', mount(V.lesson));
    router.add('/tools', mount(function (o) { V.tools(o, {}); }));
    router.add('/tools/:tool', mount(function (o, p) { V.tools(o, { tool: p.tool }); }));
    router.add('/projects', mount(V.projects));
    router.add('/glossary', mount(V.glossary));
    router.add('/shortcuts', mount(V.shortcuts));
    router.add('/milestones', mount(V.milestones));
    router.setNotFound(mount(function (o) {
      o.innerHTML = '<div class="empty"><h2>Page not found</h2><p>That route doesn’t exist. <a class="btn" href="#/dashboard">Go to dashboard</a></p></div>';
    }));
  }

  function boot() {
    store.load();
    applyPrefs();
    if (global.matchMedia) { try { global.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', applyPrefs); } catch (e) {} }
    buildLayout();
    GDA.search.build();
    registerRoutes();
    if (GDA.milestones) GDA.milestones.evaluate();
    router.start();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  GDA.app = { renderSidebar: renderSidebar, applyPrefs: applyPrefs, outlet: function () { return outlet; } };
})(typeof window !== 'undefined' ? window : this);
