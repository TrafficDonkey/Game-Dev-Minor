/* =============================================================================
 * Game Dev Academy — reference views: Glossary, Projects, Milestones,
 * and the engine + Blender + Git shortcut references. Registered as four views.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  GDA.views = GDA.views || {};
  var ui = GDA.ui, store = GDA.store, C = GDA.curric, router = GDA.router;

  /* --------------------------------- Glossary ------------------------------ */
  GDA.views.glossary = function (outlet) {
    var terms = C.glossary().slice().sort(function (a, b) { return a.term.localeCompare(b.term); });
    var cats = uniq(terms.map(function (t) { return t.category; })).sort();
    var q = router.query();
    var active = 'all', filterText = '';

    var html = '<div class="page-head"><div class="kicker">Reference</div><h1>Glossary</h1>'
      + '<p class="lede">' + terms.length + ' terms across the pipeline, storytelling, game design, level design, game-ready 3D, programming and the minor itself.</p></div>'
      + '<div class="glossary-controls"><div class="search" style="width:min(380px,60vw)"><span class="si">' + ui.icon('search') + '</span>'
      + '<input type="search" id="gsearch" placeholder="Filter terms…" autocomplete="off"></div></div>'
      + '<div class="glossary-controls" id="gcats"><span class="cat-chip on" data-c="all">All</span>'
      + cats.map(function (c) { return '<span class="cat-chip" data-c="' + ui.esc(c) + '">' + ui.esc(c) + '</span>'; }).join('') + '</div>'
      + '<div id="glist"></div>';
    outlet.innerHTML = html;

    var list = outlet.querySelector('#glist');
    function render() {
      var ft = filterText.toLowerCase();
      var shown = terms.filter(function (t) {
        if (active !== 'all' && t.category !== active) return false;
        if (!ft) return true;
        return (t.term + ' ' + t.def + ' ' + (t.category || '')).toLowerCase().indexOf(ft) >= 0;
      });
      list.innerHTML = shown.length ? shown.map(function (t) {
        var hit = q.t && q.t.toLowerCase() === t.term.toLowerCase();
        return '<div class="gterm' + (hit ? ' hit' : '') + '" id="g-' + slug(t.term) + '"><h4>' + ui.esc(t.term)
          + '<span class="gcat">' + ui.esc(t.category || '') + '</span></h4>'
          + '<div class="dim" style="color:var(--ink-2)">' + ui.line(t.def) + '</div>'
          + (t.related && t.related.length ? '<div class="dim" style="font-size:.82rem;margin-top:6px">See also: ' + t.related.map(ui.esc).join(', ') + '</div>' : '')
          + '</div>';
      }).join('') : '<div class="empty">No terms match.</div>';
    }
    render();
    if (q.t) { var el = outlet.querySelector('#g-' + slug(q.t)); if (el) el.scrollIntoView({ block: 'center' }); }

    outlet.querySelector('#gsearch').addEventListener('input', function (e) { filterText = e.target.value; render(); });
    Array.prototype.forEach.call(outlet.querySelectorAll('#gcats .cat-chip'), function (chip) {
      chip.addEventListener('click', function () {
        active = chip.getAttribute('data-c');
        Array.prototype.forEach.call(outlet.querySelectorAll('#gcats .cat-chip'), function (c) { c.classList.toggle('on', c === chip); });
        render();
      });
    });
  };

  /* --------------------------------- Projects ------------------------------ */
  GDA.views.projects = function (outlet) {
    var ps = C.projects();
    var html = '<div class="page-head"><div class="kicker">Apply it</div><h1>Projects</h1>'
      + '<p class="lede">' + ps.length + ' graded projects, each with a requirement checklist and stretch goals. They build a real body of work — a GDD, a blocked-out level, a game-ready asset, a scripted mechanic and a vertical slice. Tick items as you finish; progress saves on this device.</p></div>';
    if (!ps.length) { outlet.innerHTML = html + '<div class="empty">Projects are loading.</div>'; return; }

    ps.forEach(function (p) {
      var st = store.project(p.id);
      var doneN = Object.keys(st.check).filter(function (k) { return st.check[k]; }).length;
      html += '<div class="card project-card" id="p-' + ui.esc(p.id) + '" style="margin-bottom:16px">'
        + '<div class="ptag mono">' + ui.esc(p.id.toUpperCase()) + ' · ' + ui.diffBadge(p.difficulty || 'Intermediate') + '</div>'
        + '<h3 style="margin:6px 0 2px">' + ui.esc(p.title) + '</h3>'
        + '<p class="dim" style="margin:0 0 8px">' + ui.esc(p.tagline || '') + '</p>'
        + '<div class="concept-body">' + ui.prose(p.brief || '') + '</div>'
        + '<h4 style="margin:12px 0 4px">Requirements <span class="dim mono" style="font-size:.78rem">' + doneN + '/' + (p.checklist || []).length + '</span></h4>'
        + '<ul class="checklist" data-pid="' + ui.esc(p.id) + '">'
        + (p.checklist || []).map(function (c, i) {
            return '<li class="' + (st.check[i] ? 'on' : '') + '" data-i="' + i + '"><span class="cb">' + (st.check[i] ? '✓' : '') + '</span><span class="lab">' + ui.line(c) + '</span></li>';
          }).join('')
        + '</ul>';
      if (p.stretch && p.stretch.length) {
        html += '<h4 style="margin:10px 0 4px">Stretch goals</h4><ul>' + p.stretch.map(function (s) { return '<li class="stretch">' + ui.line(s) + '</li>'; }).join('') + '</ul>';
      }
      if (p.relatedLessons && p.relatedLessons.length) {
        html += '<div class="dim" style="font-size:.84rem;margin-top:8px">Builds on: ' + p.relatedLessons.map(function (id) {
          var L = C.lesson(id); return L ? '<a href="#/lesson/' + id + '" style="color:var(--accent)">' + ui.esc(L.title) + '</a>' : ui.esc(id);
        }).join(' · ') + '</div>';
      }
      html += '</div>';
    });
    outlet.innerHTML = html;

    Array.prototype.forEach.call(outlet.querySelectorAll('.checklist li'), function (li) {
      li.addEventListener('click', function () {
        var pid = li.parentElement.getAttribute('data-pid'), i = parseInt(li.getAttribute('data-i'), 10);
        var cur = !!store.project(pid).check[i];
        store.toggleProjectCheck(pid, i, !cur);
        li.classList.toggle('on', !cur);
        li.querySelector('.cb').textContent = !cur ? '✓' : '';
        if (GDA.milestones) GDA.milestones.evaluate();
      });
    });
    if (router.query().p) { var el = outlet.querySelector('#p-' + router.query().p); if (el) el.scrollIntoView({ block: 'start' }); }
  };

  /* -------------------------------- Milestones ----------------------------- */
  GDA.views.milestones = function (outlet) {
    if (GDA.milestones) GDA.milestones.evaluate();
    var ms = C.milestones();
    var earned = ms.filter(function (m) { return store.milestoneEarned(m.id); }).length;
    var html = '<div class="page-head"><div class="kicker">Progress</div><h1>Milestones</h1>'
      + '<p class="lede">A visible ladder from understanding the pipeline to a playable vertical slice and an achievement-portfolio plan ready for day one of the minor. ' + earned + ' of ' + ms.length + ' earned.</p></div>'
      + '<div class="ladder">';
    ms.forEach(function (m) {
      var on = store.milestoneEarned(m.id);
      html += '<div class="mstone' + (on ? ' earned' : '') + '"><span class="mdot">' + (on ? ui.icon('star') : '') + '</span>'
        + '<div class="mt">' + ui.esc(m.title) + '</div>'
        + '<div class="md">' + ui.line(m.desc) + '</div></div>';
    });
    html += '</div>';
    outlet.innerHTML = html;
  };

  /* -------------------------------- Shortcuts ------------------------------ */
  GDA.views.shortcuts = function (outlet) {
    var keys = C.hotkeys();
    var apps = uniq(keys.map(function (k) { return k.app; }));
    var active = 'all', filterText = (router.query().q || '');

    var html = '<div class="page-head"><div class="kicker">Reference</div><h1>Engine, Blender &amp; Git shortcuts</h1>'
      + '<p class="lede">The keys that matter across the pipeline: the default engine (Unity), Blender for game-ready assets, and Git on the command line. Engine and Blender keys are remappable and a few change between versions, so treat these as common defaults, not gospel.</p></div>'
      + '<div class="glossary-controls"><div class="search" style="width:min(360px,60vw)"><span class="si">' + ui.icon('search') + '</span>'
      + '<input type="search" id="ksearch" placeholder="Filter shortcuts…" autocomplete="off" value="' + ui.esc(filterText) + '"></div></div>'
      + '<div class="glossary-controls" id="kapps"><span class="cat-chip on" data-a="all">All</span>'
      + apps.map(function (a) { return '<span class="cat-chip" data-a="' + ui.esc(a) + '">' + ui.esc(a) + '</span>'; }).join('') + '</div>'
      + '<div id="klist"></div>';
    outlet.innerHTML = html;

    var list = outlet.querySelector('#klist');
    function render() {
      var ft = filterText.toLowerCase();
      var shown = keys.filter(function (k) {
        if (active !== 'all' && k.app !== active) return false;
        if (!ft) return true;
        return (k.action + ' ' + k.keys + ' ' + (k.context || '') + ' ' + k.app).toLowerCase().indexOf(ft) >= 0;
      });
      var grouped = {};
      shown.forEach(function (k) { (grouped[k.app] = grouped[k.app] || []).push(k); });
      list.innerHTML = Object.keys(grouped).map(function (app) {
        return '<h3 style="margin:18px 0 8px">' + ui.esc(app) + '</h3><div class="panel" style="padding:6px 14px">'
          + grouped[app].map(function (k) {
            return '<div style="display:flex;gap:14px;align-items:baseline;padding:8px 0;border-bottom:1px solid var(--line-soft)">'
              + '<div style="flex:0 0 160px">' + ui.line('[[' + k.keys + ']]') + '</div>'
              + '<div style="flex:1"><strong>' + ui.esc(k.action) + '</strong>'
              + (k.context ? '<div class="dim" style="font-size:.84rem">' + ui.line(k.context) + '</div>' : '') + '</div></div>';
          }).join('') + '</div>';
      }).join('') || '<div class="empty">No shortcuts match.</div>';
    }
    render();
    outlet.querySelector('#ksearch').addEventListener('input', function (e) { filterText = e.target.value; render(); });
    Array.prototype.forEach.call(outlet.querySelectorAll('#kapps .cat-chip'), function (chip) {
      chip.addEventListener('click', function () {
        active = chip.getAttribute('data-a');
        Array.prototype.forEach.call(outlet.querySelectorAll('#kapps .cat-chip'), function (c) { c.classList.toggle('on', c === chip); });
        render();
      });
    });
  };

  function uniq(a) { var s = {}, o = []; a.forEach(function (x) { if (x && !s[x]) { s[x] = 1; o.push(x); } }); return o; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
})(typeof window !== 'undefined' ? window : this);
