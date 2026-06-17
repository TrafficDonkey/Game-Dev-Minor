/* =============================================================================
 * Game Dev Academy — Tool: Achievement & Grade Planner.
 * Models the minor's ACTUAL achievement rules (confirm specifics with your
 * programme handbook):
 *   - The grade is 50% individual achievement portfolio + 50% the group game.
 *   - SILVER  = attending ALL lectures of a track (attendance — one per track).
 *   - GOLD    = two individual assignments per track.
 *   - PLATINUM= two higher-skill individual assignments per track (weigh more).
 *   - Thresholds: at least EIGHT gold -> a 6 (completes the semester);
 *     if you ALSO earn EIGHT platinum -> a 10.
 * With the five chosen tracks that's up to 10 gold + 10 platinum available
 * (2 each per track), and you need 8 of each for the top — so there's a little
 * room to choose where. This tool COUNTS your gold/platinum and estimates the
 * achievement-half grade, then shows where the next achievement helps most.
 *
 * HONESTY: the two anchors (8 gold = 6, 8 platinum = 10) are the course's stated
 * rule; the SCALING IN BETWEEN (each platinum ~ +0.5) is this tool's reasonable
 * interpretation — confirm the exact formula with the minor. It models only the
 * individual half, never the group game. Colour is always paired with a letter +
 * text. Real <button>/<checkbox> controls. Persists every toggle. Pure DOM, offline.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;

  var GOLD_NEEDED = 8, PLAT_NEEDED = 8, PASS = 6, TOP = 10;

  // The five chosen role-tracks (mapped to pillar letters for hue + a letter label).
  var TRACKS = [
    { id: 'story',  name: 'Story',  p: 'A' },
    { id: 'design', name: 'Design', p: 'B' },
    { id: 'level',  name: 'Level',  p: 'C' },
    { id: 'art3d',  name: '3D',     p: 'D' },
    { id: 'code',   name: 'Code',   p: 'E' }
  ];

  function blank() {
    var t = {};
    TRACKS.forEach(function (tr) { t[tr.id] = { silver: false, gold: [false, false], plat: [false, false] }; });
    return t;
  }

  function load(id) {
    var saved = store.toolState(id);
    var s = blank();
    var src = saved && saved.tracks;
    if (src) {
      TRACKS.forEach(function (tr) {
        var r = src[tr.id]; if (!r) return;
        s[tr.id].silver = !!r.silver;
        s[tr.id].gold = [!!(r.gold && r.gold[0]), !!(r.gold && r.gold[1])];
        s[tr.id].plat = [!!(r.plat && r.plat[0]), !!(r.plat && r.plat[1])];
      });
    }
    return s;
  }

  // grade for the ACHIEVEMENT HALF from the gold + platinum counts.
  function grade(gold, plat) {
    if (gold < GOLD_NEEDED) return null;                       // not yet a pass
    var p = Math.min(plat, PLAT_NEEDED);
    return PASS + (TOP - PASS) * (p / PLAT_NEEDED);            // 6 .. 10
  }

  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;
    var id = 'achieve';
    var state = load(id);

    function persist() { store.setToolState(id, { tracks: state }); }
    function counts() {
      var g = 0, p = 0, s = 0;
      TRACKS.forEach(function (tr) {
        var r = state[tr.id];
        if (r.silver) s++;
        g += (r.gold[0] ? 1 : 0) + (r.gold[1] ? 1 : 0);
        p += (r.plat[0] ? 1 : 0) + (r.plat[1] ? 1 : 0);
      });
      return { gold: g, plat: p, silver: s };
    }

    container.innerHTML = '';
    var root = ui.h('div', { class: 'achieve-tool' });
    container.appendChild(root);

    if (!compact) {
      root.appendChild(ui.frag(
        '<div class="callout" role="note" style="margin:0 0 14px;border-color:var(--accent)">'
        + '<span class="ct">How this minor grades you</span>'
        + 'Your grade is <b>half</b> this individual <b>achievement portfolio</b> and <b>half</b> the <b>group game</b> (graded by the lecturers in their areas). '
        + 'In the portfolio: <b>silver</b> = attending all of a track’s lectures, <b>gold</b> = two individual assignments per track, '
        + '<b>platinum</b> = two higher-skill assignments per track. <b>8 gold &rarr; a 6</b>; <b>+ 8 platinum &rarr; a 10</b>. '
        + 'Tick what you plan to earn and watch the estimate.</div>'));
    }

    var result = ui.h('div', { class: 'panel', style: 'margin-bottom:14px;border-color:color-mix(in srgb,var(--accent) 40%,var(--line))' });
    root.appendChild(result);

    var grid = ui.h('div', { style: 'display:grid;gap:8px;margin-bottom:12px' });
    root.appendChild(grid);
    TRACKS.forEach(function (tr) { grid.appendChild(buildTrack(tr)); });

    // legend (colour always paired with a letter + text)
    root.appendChild(ui.frag(
      '<div class="legend" aria-label="Achievement key">'
      + '<span class="lk"><b class="mono">S</b> silver = attended all a track’s lectures</span>'
      + '<span class="lk"><b class="mono" style="color:var(--p-B)">G</b> gold = an individual assignment (2 / track)</span>'
      + '<span class="lk"><b class="mono" style="color:var(--p-C)">P</b> platinum = a higher-skill assignment (2 / track)</span>'
      + '</div>'));

    if (!compact) {
      root.appendChild(ui.frag(
        '<div class="callout deeper" style="margin-top:14px">'
        + '<span class="ct">Read this before you trust the number</span>'
        + 'The two anchors — <b>8 gold = a 6</b> and <b>8 platinum = a 10</b> — are the course’s stated rule. The <b>scaling in between</b> '
        + '(this tool adds ~<b>0.5 per platinum</b> once your 8 gold are secured) is a reasonable interpretation, <b>not official</b> — confirm the exact formula '
        + 'with the minor. This is <b>only the individual half</b> of your grade; the other half is the <b>group game</b>, graded separately. '
        + 'And mind scope: <b>finishing</b> 8 gold beats <b>listing</b> 12 — the GDD itself is judged on complexity <i>versus</i> feasibility.</div>'));
    }

    // ----- a track row: silver toggle + two gold + two platinum -------------
    function buildTrack(tr) {
      var row = ui.h('div', { class: 'panel', style: 'padding:9px 12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap' });
      row.appendChild(ui.frag('<span style="font-weight:700;min-width:58px;color:var(--p-' + tr.p + ')">'
        + '<span class="mono" style="font-size:.7rem;color:var(--ink-3)">' + tr.p + '</span> ' + ui.esc(tr.name) + '</span>'));

      // silver (attendance) — a single toggle
      row.appendChild(tierBtn('S', state[tr.id].silver, 'ink-2',
        ui.esc(tr.name) + ' silver — attended all lectures',
        function (on) { state[tr.id].silver = on; }));

      row.appendChild(divider('Gold'));
      [0, 1].forEach(function (i) {
        row.appendChild(tierBtn('G' + (i + 1), state[tr.id].gold[i], 'p-B',
          ui.esc(tr.name) + ' gold assignment ' + (i + 1),
          function (on) { state[tr.id].gold[i] = on; }));
      });

      row.appendChild(divider('Plat'));
      [0, 1].forEach(function (i) {
        row.appendChild(tierBtn('P' + (i + 1), state[tr.id].plat[i], 'p-C',
          ui.esc(tr.name) + ' platinum assignment ' + (i + 1),
          function (on) { state[tr.id].plat[i] = on; }));
      });

      return row;
    }
    function divider(label) {
      return ui.h('span', { class: 'mono', style: 'font-size:.62rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-left:4px' }, label);
    }
    function tierBtn(letter, on, tone, label, set) {
      var b = ui.h('button', {
        type: 'button', role: 'checkbox', 'aria-checked': on ? 'true' : 'false', 'aria-label': label, title: label,
        style: 'min-width:34px;height:32px;border-radius:8px;border:1.5px solid '
          + (on ? 'var(--' + tone + ')' : 'var(--line)') + ';background:'
          + (on ? 'color-mix(in srgb,var(--' + tone + ') 22%,transparent)' : 'var(--panel-2)') + ';color:'
          + (on ? 'var(--' + tone + ')' : 'var(--ink-3)') + ';font-family:var(--mono);font-weight:700;font-size:.8rem'
      }, (on ? '✓' : '') + letter);
      b.addEventListener('click', function () {
        var v = b.getAttribute('aria-checked') !== 'true';
        set(v);
        b.setAttribute('aria-checked', v ? 'true' : 'false');
        b.style.borderColor = v ? 'var(--' + tone + ')' : 'var(--line)';
        b.style.background = v ? 'color-mix(in srgb,var(--' + tone + ') 22%,transparent)' : 'var(--panel-2)';
        b.style.color = v ? 'var(--' + tone + ')' : 'var(--ink-3)';
        b.textContent = (v ? '✓' : '') + letter;
        persist(); recompute();
      });
      return b;
    }

    // ----- recompute headline + guidance ------------------------------------
    function recompute() {
      var c = counts();
      var g = grade(c.gold, c.plat);
      var passed = g !== null;
      var gradeTxt = passed ? g.toFixed(1) : '—';
      var tone = !passed ? 'bad' : (g >= 8.5 ? 'ok' : (g >= 7 ? 'ok' : 'warn'));
      var band = !passed ? 'below a 6' : (g >= 9.5 ? 'a 10 — top band' : (g >= 7 ? 'strong' : 'a pass'));

      var goldPct = Math.min(100, Math.round(c.gold / GOLD_NEEDED * 100));
      var platPct = Math.min(100, Math.round(c.plat / PLAT_NEEDED * 100));

      // single next-step nudge
      var nudge;
      if (c.gold < GOLD_NEEDED) {
        nudge = '<b>' + (GOLD_NEEDED - c.gold) + ' more gold</b> to reach a <b>6</b> and complete the semester. Gold is the floor — secure it before chasing platinum.';
      } else if (c.plat < PLAT_NEEDED) {
        nudge = 'Your <b>6 is locked</b>. Each <b>platinum</b> now adds about <b>+0.5</b> — <b>' + (PLAT_NEEDED - c.plat) + ' more</b> for a <b>10</b>. Pick platinum assignments the game needs anyway.';
      } else {
        nudge = 'Eight gold and eight platinum — a <b>10</b> on the achievement half. Now protect the other half: ship the team game.';
      }

      result.innerHTML =
        '<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">'
        + '<div style="flex:0 0 auto;text-align:center;min-width:104px">'
        + '<div class="mono" style="font-size:.64rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)">Achievement half</div>'
        + '<div style="font-family:var(--display);font-weight:800;font-size:2.9rem;line-height:1;color:var(--' + tone + ');letter-spacing:-.02em">' + gradeTxt + '</div>'
        + '<span class="flag ' + tone + '" style="margin-top:4px">' + band + '</span></div>'
        + '<div style="flex:1;min-width:180px">'
        + bar('Gold', c.gold, GOLD_NEEDED, 'p-B', '→ a 6') + bar('Platinum', c.plat, PLAT_NEEDED, 'p-C', '→ a 10')
        + '<div class="readout" style="margin-top:4px">Silver (attendance): <b>' + c.silver + ' / ' + TRACKS.length + '</b> tracks</div>'
        + '</div></div>'
        + '<div class="dim" style="font-size:.84rem;margin-top:10px">' + nudge + '</div>';
    }
    function bar(label, n, need, tone, arrow) {
      var pct = Math.min(100, Math.round(n / need * 100));
      var done = n >= need;
      return '<div style="display:grid;grid-template-columns:74px 1fr auto;align-items:center;gap:9px;margin:3px 0">'
        + '<span style="font-weight:650;font-size:.84rem;color:var(--' + tone + ')">' + label + '</span>'
        + '<span class="minibar" style="margin:0"><i style="width:' + pct + '%;background:var(--' + tone + ')"></i></span>'
        + '<span class="readout" style="white-space:nowrap">' + (done ? '✓ ' : '') + '<b>' + n + ' / ' + need + '</b> <span class="dim">' + arrow + '</span></span>'
        + '</div>';
    }

    recompute();
    return function dispose() {};   // no timers / rAF / global listeners created
  }

  GDA.tools.register({
    id: 'achieve',
    icon: 'star',
    title: 'Achievement & Grade Planner',
    blurb: 'Plan the individual achievement portfolio against the minor’s real rules: silver = attending a track’s lectures, gold/platinum = two assignments each per track. Tick what you’ll earn across your five tracks and it counts toward the stated thresholds (8 gold = a 6, +8 platinum = a 10), showing where the next achievement helps most. A planning estimate to confirm with the minor; covers only the individual half, not the group game.',
    category: 'Foundations',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
