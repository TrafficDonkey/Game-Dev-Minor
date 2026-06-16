/* =============================================================================
 * Game Dev Academy — global search across lessons, glossary, shortcuts,
 * projects, design terms and interactive tools. Pure substring scoring,
 * rebuilt after import/reset. Works fully offline.
 * ========================================================================== */
(function (global) {
  'use strict';
  var index = null;

  function build() {
    var items = [];
    var C = global.GDA.curric;
    C.lessons().forEach(function (L) {
      var ph = C.phase(L.phaseId), pl = ph ? C.pillar(ph.pillarId) : null;
      items.push({
        kind: 'Lesson', title: L.title,
        sub: (pl ? pl.short || pl.title : '') + ' · ' + (ph ? ph.title : '') + ' · ' + L.difficulty,
        href: '/lesson/' + L.id,
        text: (L.concept || '') + ' ' + (L.task || '') + ' ' + (L.skills || []).join(' ') + ' ' + (L.tags || []).join(' ')
      });
    });
    C.glossary().forEach(function (g) {
      items.push({ kind: 'Term', title: g.term, sub: g.category || '', href: '/glossary?t=' + encodeURIComponent(g.term), text: g.def || '' });
    });
    C.hotkeys().forEach(function (k) {
      items.push({ kind: 'Shortcut', title: k.action, sub: (k.app || '') + ' · ' + (k.keys || ''), href: '/shortcuts?q=' + encodeURIComponent(k.action), text: (k.app || '') + ' ' + (k.keys || '') + ' ' + (k.context || '') });
    });
    C.projects().forEach(function (p) {
      items.push({ kind: 'Project', title: p.title, sub: p.tagline || '', href: '/projects?p=' + encodeURIComponent(p.id), text: (p.brief || '') });
    });
    C.tools().forEach(function (t) {
      items.push({ kind: 'Tool', title: t.title, sub: 'Interactive tool', href: '/tools/' + t.id, text: t.blurb || '' });
    });
    index = items;
    return items;
  }

  function search(q) {
    if (!index) build();
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    var terms = q.split(/\s+/), scored = [];
    index.forEach(function (it) {
      var title = (it.title || '').toLowerCase();
      var hay = (it.title + ' ' + it.sub + ' ' + it.text + ' ' + it.kind).toLowerCase();
      var score = 0, ok = true;
      terms.forEach(function (t) {
        var i = hay.indexOf(t);
        if (i < 0) { ok = false; return; }
        score += (title.indexOf(t) >= 0 ? 12 : 1) + (title.indexOf(t) === 0 ? 8 : 0) + Math.max(0, 4 - i / 25);
      });
      if (ok) scored.push({ it: it, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, 40).map(function (s) { return s.it; });
  }

  global.GDA = global.GDA || {};
  global.GDA.search = { build: build, search: search, rebuild: function () { index = null; } };
})(typeof window !== 'undefined' ? window : this);
