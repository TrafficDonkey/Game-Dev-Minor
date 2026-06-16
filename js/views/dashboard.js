/* =============================================================================
 * Game Dev Academy — Dashboard. Signature pipeline-map hero (how the five roles
 * interlock), overall + per-pillar progress, the "give me a drill" randomizer,
 * continue-learning, and the export/import backup controls.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  GDA.views = GDA.views || {};
  var ui = GDA.ui, store = GDA.store, C = GDA.curric, router = GDA.router;

  function pill(p) {
    var pr = C.pillarProgress(p.id);
    return '<a class="card pillar-card" href="#/curriculum" style="--ph:var(--p-' + p.id + ')">'
      + '<span class="accentbar" style="background:var(--p-' + p.id + ')"></span>'
      + '<h3><span class="pillar-dot" style="background:var(--p-' + p.id + ')"></span>' + ui.esc(p.title) + '</h3>'
      + '<div class="tag mono">Pillar ' + p.id + ' · ' + ui.esc(p.tagline) + '</div>'
      + '<div class="minibar"><i style="width:' + pr.pct + '%;background:var(--p-' + p.id + ')"></i></div>'
      + '<div class="dim mono" style="font-size:.78rem">' + pr.done + ' / ' + pr.total + ' lessons · ' + pr.pct + '%</div></a>';
  }

  function randomDrill() {
    var pool = C.allDrills();
    if (!pool.length) return null;
    var seed = (new Date().getMinutes() * 60 + new Date().getSeconds() + Math.floor(performance.now())) % pool.length;
    return pool[seed];
  }

  GDA.views.dashboard = function (outlet) {
    var t = C.totals();
    var skills = C.skillsLearned(), skillsT = C.skillsTotal();
    var streak = store.currentStreak();
    var nextL = C.nextUp();
    var pillars = C.pillars();

    var html = '';
    html += '<div class="hero">'
      + '<div class="kicker mono" style="color:var(--accent);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:8px">A headstart for the Game Dev minor</div>'
      + '<h1>Game Dev Academy</h1>'
      + '<p class="sub">A real headstart across five role-tracks — storyteller, game designer, level designer, 3D modeller and programmer — built around how this minor actually works: an eight-person team, one game, a GDD graded on complexity vs feasibility, and an achievement portfolio. The goal: walk in versatile and able to build tiny things end-to-end. Built for one dev: you.</p>'
      + '<div class="hero-stage" id="pipeline-hero"></div>'
      + '<p class="dim" style="font-size:.82rem;margin-top:6px">↑ The pipeline map — click a role to see what it does and what it hands to the next. Seeing the seams is the whole point. <a href="#/tools/pipeline">Open the full map ›</a></p>'
      + '</div>';

    html += '<div class="stat-row">'
      + statRing(t.pct, 'Course complete')
      + stat(t.done + '<span class="dim" style="font-size:1rem">/' + t.total + '</span>', 'Lessons done')
      + stat(skills + '<span class="dim" style="font-size:1rem">/' + skillsT + '</span>', 'Skills banked')
      + stat(streak + '<span class="dim" style="font-size:1rem"> d</span>', 'Practice streak')
      + '</div>';

    html += '<div class="grid cols-2">';
    html += '<div class="card"><h3 style="margin-bottom:6px">Continue learning</h3>';
    if (nextL) {
      var ph = C.phase(nextL.phaseId), pl = ph ? C.pillar(ph.pillarId) : null;
      html += '<p class="dim mono" style="font-size:.78rem">' + (pl ? ui.esc(pl.short) + ' · ' : '') + (ph ? ui.esc(ph.title) : '') + '</p>'
        + '<p style="font-size:1.1rem;font-weight:700;margin:4px 0 12px">' + ui.esc(nextL.title) + '</p>'
        + '<a class="btn primary" href="#/lesson/' + nextL.id + '">' + ui.icon('play') + ' Resume ' + ui.esc(nextL.id) + '</a>';
    } else { html += '<p class="dim">No lessons loaded yet.</p>'; }
    html += '</div>';

    html += '<div class="card"><h3 style="margin-bottom:6px">Give me a drill</h3>'
      + '<p class="dim" style="font-size:.88rem">A short, concrete rep — pitch a feasible game in three sentences, block out a tutorial level, design a fair enemy, or deconstruct a game you love.</p>'
      + '<div class="drill-box" id="drill-box"></div>'
      + '<button class="btn sm" id="drill-again" style="margin-top:10px">' + ui.icon('dice') + ' Another drill</button>'
      + '</div>';
    html += '</div>';

    html += '<h2 style="margin:26px 0 12px">The seven pillars</h2>'
      + '<div class="grid cols-auto">' + pillars.map(pill).join('') + '</div>';

    var ms = C.milestones(), earned = ms.filter(function (m) { return store.milestoneEarned(m.id); }).length;
    html += '<div class="grid cols-2" style="margin-top:24px">';
    html += '<a class="card" href="#/milestones"><h3>' + ui.icon('flag') + ' Milestones</h3>'
      + '<p class="dim">' + earned + ' of ' + ms.length + ' badges earned — the ladder from understanding the pipeline to a playable vertical slice and an achievement-portfolio plan ready for day one.</p></a>';
    html += '<div class="card"><h3>' + ui.icon('download') + ' Backup &amp; restore</h3>'
      + '<p class="dim" style="font-size:.9rem">Everything is stored only on this device. Export a JSON backup, or import one to restore — progress, notes, GDD drafts, board states and saved plans.</p>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px">'
      + '<button class="btn sm" id="exp">' + ui.icon('download') + ' Export</button>'
      + '<button class="btn sm" id="imp">' + ui.icon('upload') + ' Import</button>'
      + '<button class="btn sm ghost" id="rst">' + ui.icon('reset') + ' Reset</button>'
      + '<input type="file" id="impfile" accept="application/json" style="display:none">'
      + '</div></div>';
    html += '</div>';

    outlet.innerHTML = html;

    // signature hero (compact interactive pipeline map)
    if (GDA.tools && GDA.tools.byId('pipeline')) {
      try { GDA.addDisposable(GDA.tools.byId('pipeline').mount(outlet.querySelector('#pipeline-hero'), { compact: true, hero: true })); } catch (e) { console.error(e); }
    } else {
      outlet.querySelector('#pipeline-hero').innerHTML = '<div class="dim" style="padding:14px">Pipeline map loads with the interactive tools.</div>';
    }

    var drillBox = outlet.querySelector('#drill-box');
    function showDrill() {
      var d = randomDrill();
      if (!d) { drillBox.innerHTML = '<p class="dim">Drills appear once lessons are loaded.</p>'; return; }
      var ph = C.phase(d.lesson.phaseId), pl = ph ? C.pillar(ph.pillarId) : null;
      drillBox.innerHTML = '<div class="dim mono" style="font-size:.74rem">' + (pl ? ui.esc(pl.short) : '') + ' · ' + ui.esc(d.lesson.title) + '</div>'
        + '<div class="dtext">' + ui.line(d.text) + '</div>'
        + '<a class="btn sm" href="#/lesson/' + d.lesson.id + '">Open the lesson ›</a>';
    }
    showDrill();
    outlet.querySelector('#drill-again').addEventListener('click', showDrill);

    outlet.querySelector('#exp').addEventListener('click', function () {
      var blob = new Blob([store.exportJSON()], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'game-academy-backup.json'; a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      ui.toast('Backup exported');
    });
    outlet.querySelector('#imp').addEventListener('click', function () { outlet.querySelector('#impfile').click(); });
    outlet.querySelector('#impfile').addEventListener('change', function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try { store.importJSON(rd.result); ui.toast('Backup imported'); router.navigate('/dashboard'); }
        catch (err) { ui.toast('Import failed — not a valid backup'); }
      };
      rd.readAsText(f);
    });
    outlet.querySelector('#rst').addEventListener('click', function () {
      if (confirm('Reset ALL progress, notes, GDD drafts, board states and saved plans on this device? This cannot be undone.')) {
        store.reset(); ui.toast('Everything reset'); router.navigate('/dashboard');
      }
    });
  };

  function stat(n, l) { return '<div class="stat"><div class="n">' + n + '</div><div class="l">' + ui.esc(l) + '</div></div>'; }
  function statRing(pct, l) {
    return '<div class="stat" style="display:flex;align-items:center;gap:14px">'
      + '<div class="ring" style="--pct:' + pct + ';position:relative"><span class="rv">' + pct + '%</span></div>'
      + '<div><div class="l" style="margin-top:0">' + ui.esc(l) + '</div></div></div>';
  }
})(typeof window !== 'undefined' ? window : this);
