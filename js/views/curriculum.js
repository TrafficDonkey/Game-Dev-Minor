/* =============================================================================
 * Game Dev Academy — Curriculum view. The whole course laid out by
 * pillar → phase → module → lesson, with a pillar filter and progress.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  GDA.views = GDA.views || {};
  var ui = GDA.ui, store = GDA.store, C = GDA.curric;

  GDA.views.curriculum = function (outlet) {
    var pillars = C.pillars();
    var filter = store.state.prefs.pillarFilter || 'all';
    var t = C.totals();

    var html = '<div class="page-head"><div class="kicker">The course</div>'
      + '<h1>Curriculum</h1>'
      + '<p class="lede">' + t.total + ' lessons across seven pillars — the pipeline and the team, then story, design, levels, game-ready 3D and programming, ending in a vertical slice that touches all five tracks. Pick anywhere; the order is a guide, not a lock. Difficulty ramps within each pillar.</p></div>';

    html += '<div class="glossary-controls"><span class="cat-chip filt' + (filter === 'all' ? ' on' : '') + '" data-f="all">All pillars</span>';
    pillars.forEach(function (p) {
      html += '<span class="cat-chip filt' + (filter === p.id ? ' on' : '') + '" data-f="' + p.id + '" style="border-color:color-mix(in srgb,var(--p-' + p.id + ') 45%,var(--line))">'
        + '<span class="pillar-dot" style="display:inline-block;width:9px;height:9px;border-radius:3px;margin-right:6px;background:var(--p-' + p.id + ')"></span>' + ui.esc(p.short) + '</span>';
    });
    html += '</div>';

    pillars.forEach(function (p) {
      if (filter !== 'all' && filter !== p.id) return;
      var pr = C.pillarProgress(p.id);
      html += '<section class="curr-pillar"><div class="pillar-head" style="padding-left:0">'
        + '<span class="pillar-dot" style="width:14px;height:14px;background:var(--p-' + p.id + ')"></span>'
        + '<h2 style="margin:0">' + ui.esc(p.title) + '</h2>'
        + '<span class="dim mono" style="font-size:.8rem;margin-left:auto">' + pr.done + '/' + pr.total + ' · ' + pr.pct + '%</span></div>'
        + '<p class="dim" style="max-width:74ch;margin:6px 0 6px">' + ui.esc(p.blurb) + '</p>';

      C.phasesOf(p.id).forEach(function (ph) {
        var pp = C.phaseProgress(ph.id);
        html += '<div class="ph-head"><span class="pn mono">' + phaseTag(ph) + '</span>'
          + '<h3 style="margin:0">' + ui.esc(ph.title) + '</h3>'
          + '<span class="dim mono" style="font-size:.76rem;margin-left:auto">' + pp.done + '/' + pp.total + '</span></div>';
        C.modulesOf(ph.id).forEach(function (mod) {
          var ls = C.lessonsOfModule(mod.id);
          if (!ls.length) return;
          html += '<div class="module-group"><div class="mod-title">' + ui.esc(mod.title) + '</div>';
          ls.forEach(function (L) {
            var d = store.isDone(L.id);
            html += '<a class="lrow' + (d ? ' done' : '') + '" href="#/lesson/' + L.id + '">'
              + '<span class="lr-tick">' + (d ? '✓' : '') + '</span>'
              + '<span class="lr-id">' + ui.esc(L.id) + '</span>'
              + '<span class="lr-title">' + ui.esc(L.title) + '</span>'
              + '<span class="badge mode m-' + L.mode + '" style="font-size:.6rem">' + (L.mode === 'handson' ? 'Hands-on' : 'Knowledge') + '</span>'
              + '<span class="diffdot d-' + L.difficulty + '" title="' + L.difficulty + '"></span>'
              + '</a>';
          });
          html += '</div>';
        });
        var orphan = C.lessonsOf(ph.id).filter(function (L) { return !C.module(L.moduleId); });
        orphan.forEach(function (L) {
          var d = store.isDone(L.id);
          html += '<a class="lrow' + (d ? ' done' : '') + '" href="#/lesson/' + L.id + '"><span class="lr-tick">' + (d ? '✓' : '')
            + '</span><span class="lr-id">' + ui.esc(L.id) + '</span><span class="lr-title">' + ui.esc(L.title) + '</span>'
            + '<span class="diffdot d-' + L.difficulty + '"></span></a>';
        });
      });
      html += '</section>';
    });

    outlet.innerHTML = html;
    Array.prototype.forEach.call(outlet.querySelectorAll('.filt'), function (chip) {
      chip.addEventListener('click', function () { store.setPref('pillarFilter', chip.getAttribute('data-f')); GDA.views.curriculum(outlet); });
    });
  };

  function phaseTag(ph) {
    var pl = ph.pillarId, idx = C.phasesOf(pl).map(function (x) { return x.id; }).indexOf(ph.id);
    return pl + idx;
  }
})(typeof window !== 'undefined' ? window : this);
