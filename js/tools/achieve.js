/* =============================================================================
 * Game Dev Academy — Tool: Achievement & Grade Planner.
 * The individual portfolio is graded on ACHIEVEMENTS at silver / gold / platinum
 * levels. The anchors the course states (and which you MUST confirm with the
 * minor): roughly "8 gold = a 6 (a pass), 8 platinum = a 10". This tool models
 * those anchors so you can plan WHERE to spend effort — eight slots, each with a
 * name, a track and a level, summed into an estimated achievement grade plus a
 * per-track breakdown showing where pushing gold -> platinum buys the most.
 *
 * HONESTY: this is a PLANNING ESTIMATE only. The exact grading formula must be
 * confirmed with the minor, and this models only the individual portfolio
 * (~half the grade) — the other half is the group game. Colour is always paired
 * with a text label. Real <button>/<select> controls. Persists every slot.
 * Pure DOM, offline.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;

  var SLOT_COUNT = 8;

  // The five role-tracks (mapped onto the course pillar letters for hue + a letter
  // label, so colour is never the only signal). Track is a plain text label too.
  var TRACKS = [
    { id: 'story',  name: 'Story',  p: 'A' },
    { id: 'design', name: 'Design', p: 'B' },
    { id: 'level',  name: 'Level',  p: 'C' },
    { id: 'art3d',  name: '3D',     p: 'D' },
    { id: 'code',   name: 'Code',   p: 'E' }
  ];
  function track(id) { for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i]; return TRACKS[1]; }

  // Achievement levels. score is the per-slot "fraction of a platinum":
  //   platinum = 1.00 (full), gold = the pass anchor, silver = partial below pass,
  //   none = 0 contribution. We anchor on the course's stated mapping below.
  var LEVELS = [
    { id: 'none',     name: 'none',     letter: '–', score: 0,    tone: 'ink-3' },
    { id: 'silver',   name: 'silver',   letter: 'S', score: 0.45, tone: 'ink-2' },
    { id: 'gold',     name: 'gold',     letter: 'G', score: 0.75, tone: 'p-B'   },
    { id: 'platinum', name: 'platinum', letter: 'P', score: 1.0,  tone: 'p-C'   }
  ];
  function level(id) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i]; return LEVELS[0]; }

  // Grade anchors AS GIVEN BY THE COURSE (confirm with the minor):
  //   a full set of GOLD     -> 6  (a pass)
  //   a full set of PLATINUM -> 10
  // We interpolate linearly on the average per-slot score. gold's score (0.75)
  // maps to 6, platinum's score (1.0) maps to 10; silver/none fall proportionally
  // below 6 on the same line, with a floor of 1 (you can't score below 1).
  var GOLD_GRADE = 6, PLAT_GRADE = 10;
  var GOLD_S = level('gold').score, PLAT_S = level('platinum').score;
  function scoreToGrade(avg) {
    // line through (GOLD_S, 6) and (PLAT_S, 10):
    var g = GOLD_GRADE + (avg - GOLD_S) * (PLAT_GRADE - GOLD_GRADE) / (PLAT_S - GOLD_S);
    if (g < 1) g = 1;
    if (g > 10) g = 10;
    return g;
  }

  function blankSlots() {
    var a = [];
    for (var i = 0; i < SLOT_COUNT; i++) a.push({ name: '', track: 'design', level: 'none' });
    return a;
  }

  function load(id) {
    var saved = store.toolState(id);
    var slots = (saved && Array.isArray(saved.slots)) ? saved.slots : null;
    var out = blankSlots();
    if (slots) {
      for (var i = 0; i < SLOT_COUNT; i++) {
        var s = slots[i];
        if (!s) continue;
        out[i].name = (typeof s.name === 'string') ? s.name.slice(0, 80) : '';
        out[i].track = track(s.track).id;
        out[i].level = level(s.level).id;
      }
    }
    return out;
  }

  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;
    var id = 'achieve';
    var slots = load(id);

    function persist() { store.setToolState(id, { slots: slots }); }

    container.innerHTML = '';
    var root = ui.h('div', { class: 'achieve-tool' });
    container.appendChild(root);

    // --- intro / anchor statement (honest, always shown) ----------------------
    if (!compact) {
      root.appendChild(ui.frag(
        '<div class="callout" role="note" style="margin:0 0 14px;border-color:var(--accent)">'
        + '<span class="ct">How this minor grades you</span>'
        + 'The individual half of your grade is an <b>achievement portfolio</b> at <b>silver / gold / platinum</b> levels. '
        + 'The anchors the course states — <b>which you must confirm with the minor</b> — are roughly '
        + '<b>8 gold &rarr; a 6 (a pass)</b> and <b>8 platinum &rarr; a 10</b>. '
        + 'Fill in eight slots below to plan where your effort lands.</div>'));
    }

    // --- result readout (prominent number) ------------------------------------
    var result = ui.h('div', { class: 'panel', style: 'margin-bottom:14px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;border-color:color-mix(in srgb,var(--accent) 40%,var(--line))' });
    root.appendChild(result);

    // --- slots grid -----------------------------------------------------------
    var slotsWrap = ui.h('div', { class: 'achieve-slots', style: 'display:grid;gap:8px;margin-bottom:14px' });
    root.appendChild(slotsWrap);
    slots.forEach(function (s, i) { slotsWrap.appendChild(buildSlot(s, i)); });

    // --- per-track breakdown --------------------------------------------------
    var breakdown = ui.h('div', { class: 'panel', style: 'margin-bottom:12px' });
    root.appendChild(breakdown);

    // --- legend (colour ALWAYS paired with a letter + text) -------------------
    root.appendChild(ui.frag(
      '<div class="legend" aria-label="Achievement level key">'
      + LEVELS.map(function (lv) {
          return '<span class="lk"><span class="sw" style="background:var(--' + lv.tone + ')"></span>'
            + '<b class="mono" style="color:var(--' + lv.tone + ')">' + lv.letter + '</b> ' + ui.esc(lv.name) + '</span>';
        }).join('')
      + '</div>'));

    // --- honest caveat + scope discipline (always shown) ----------------------
    root.appendChild(ui.frag(
      '<div class="callout deeper" style="margin-top:14px">'
      + '<span class="ct">Read this before you trust the number</span>'
      + 'This is a <b>planning estimate</b>, not your real grade. The <b>exact formula must be confirmed with the minor</b> — '
      + 'they may weight tracks, require a spread across all five, or count achievements differently. '
      + 'It also models <b>only the individual achievement portfolio (~half the grade)</b>; '
      + 'the other half is the <b>group game</b>, graded separately. '
      + 'And remember the #1 reason student games fail: <b>over-scoping</b>. '
      + 'Eight focused achievements you actually finish beat twenty you list and never ship — '
      + 'the GDD itself is graded on complexity <i>versus feasibility</i>.</div>'));

    // ----- a single slot row ------------------------------------------------
    function buildSlot(s, i) {
      var row = ui.h('div', { class: 'panel', style: 'padding:10px 12px;display:grid;grid-template-columns:1fr;gap:8px' });
      if (!compact) row.style.gridTemplateColumns = 'minmax(0,1fr) auto';

      var num = i + 1;

      // left column: number + name field
      var left = ui.h('div', { style: 'display:flex;align-items:center;gap:9px;min-width:0' });
      left.appendChild(ui.frag('<span class="mono" aria-hidden="true" style="color:var(--ink-3);font-size:.8rem;flex:0 0 auto">' + (num < 10 ? '0' : '') + num + '</span>'));
      var name = ui.h('input', {
        type: 'text', class: 'field', value: s.name,
        placeholder: 'Achievement ' + num + ' — what you\'ll build',
        'aria-label': 'Name of achievement ' + num,
        maxlength: '80',
        style: 'min-width:0'
      });
      name.addEventListener('input', function () { s.name = name.value.slice(0, 80); persist(); recompute(); });
      left.appendChild(name);
      row.appendChild(left);

      // right column: track picker + level segmented control
      var right = ui.h('div', { style: 'display:flex;align-items:center;gap:10px;flex-wrap:wrap' });

      // TRACK picker — a real <select>
      var trackWrap = ui.h('label', { class: 'ctrl', style: 'min-width:auto;gap:3px' });
      trackWrap.appendChild(ui.frag('<span style="font-size:.66rem">Track</span>'));
      var sel = ui.h('select', {
        class: 'field', 'aria-label': 'Track for achievement ' + num,
        style: 'padding:6px 9px;width:auto;min-width:96px'
      });
      TRACKS.forEach(function (t) {
        var o = ui.h('option', { value: t.id, text: t.name });
        if (t.id === s.track) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', function () { s.track = track(sel.value).id; persist(); recompute(); });
      trackWrap.appendChild(sel);
      right.appendChild(trackWrap);

      // LEVEL segmented control — real <button>s, aria-pressed, letter + colour
      var lvlWrap = ui.h('div', { style: 'display:flex;flex-direction:column;gap:3px' });
      lvlWrap.appendChild(ui.frag('<span class="mono" style="font-size:.66rem;color:var(--ink-2)">Level</span>'));
      var seg = ui.h('div', { class: 'seg', role: 'group', 'aria-label': 'Achievement level for achievement ' + num });
      LEVELS.forEach(function (lv) {
        var on = lv.id === s.level;
        var b = ui.h('button', {
          type: 'button', class: on ? 'on' : '',
          'aria-pressed': on ? 'true' : 'false',
          'aria-label': lv.name + ' for achievement ' + num,
          title: lv.name,
          'data-lvl': lv.id
        }, '<span class="mono" style="font-weight:700">' + lv.letter + '</span> ' + lv.name);
        b.addEventListener('click', function () {
          s.level = lv.id; persist();
          Array.prototype.forEach.call(seg.querySelectorAll('button'), function (x) {
            var xon = x.getAttribute('data-lvl') === s.level;
            x.classList.toggle('on', xon);
            x.setAttribute('aria-pressed', xon ? 'true' : 'false');
          });
          recompute();
        });
        seg.appendChild(b);
      });
      lvlWrap.appendChild(seg);
      right.appendChild(lvlWrap);

      row.appendChild(right);
      return row;
    }

    // ----- recompute the estimate + breakdown -------------------------------
    function recompute() {
      var total = 0, filled = 0;
      var byTrack = {};
      TRACKS.forEach(function (t) { byTrack[t.id] = { sum: 0, count: 0, plat: 0, gold: 0, silver: 0, none: 0 }; });

      slots.forEach(function (s) {
        var lv = level(s.level);
        total += lv.score;
        if (lv.id !== 'none') filled++;
        var bt = byTrack[track(s.track).id];
        bt.sum += lv.score; bt.count++;
        bt[lv.id]++;
      });

      var avg = total / SLOT_COUNT;             // average per-slot fraction-of-platinum
      var grade = scoreToGrade(avg);
      var gradeTxt = grade.toFixed(1);

      // band label for the number (text, never colour alone)
      var band, tone;
      if (grade < 5.5) { band = 'below pass'; tone = 'bad'; }
      else if (grade < 7) { band = 'a pass'; tone = 'warn'; }
      else if (grade < 8.5) { band = 'solid'; tone = 'ok'; }
      else { band = 'top band'; tone = 'ok'; }

      // headline points won across the spent achievements (how far the next push
      // from gold -> platinum would move you), for the "where it helps" message.
      result.innerHTML =
        '<div style="flex:0 0 auto;text-align:center;min-width:118px">'
        + '<div class="mono" style="font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)">Est. achievement grade</div>'
        + '<div class="display" style="font-family:var(--display);font-weight:800;font-size:2.9rem;line-height:1;color:var(--' + tone + ');letter-spacing:-.02em">' + gradeTxt + '</div>'
        + '<span class="flag ' + tone + '" style="margin-top:4px">' + band + '</span>'
        + '</div>'
        + '<div style="flex:1;min-width:160px">'
        + '<div class="readout">Slots filled: <b>' + filled + ' / ' + SLOT_COUNT + '</b> · '
        + 'on the course anchors, <b>8 gold</b> &rarr; <b>6</b> and <b>8 platinum</b> &rarr; <b>10</b>.</div>'
        + '<div class="dim" style="font-size:.84rem;margin-top:6px">' + advice(grade, byTrack) + '</div>'
        + '</div>';

      paintBreakdown(byTrack);
    }

    // a single, honest, specific nudge about where to push next
    function advice(grade, byTrack) {
      // find the track with the most gold-but-not-platinum slots — the cheapest
      // marginal points are upgrading an already-strong gold to platinum.
      var bestUp = null;
      TRACKS.forEach(function (t) {
        var bt = byTrack[t.id];
        if (bt.gold > 0 && (!bestUp || bt.gold > bestUp.gold)) bestUp = { name: t.name, gold: bt.gold, p: t.p };
      });
      // any silver sitting below a pass is the biggest single jump (S->G crosses 6).
      var bestRescue = null;
      TRACKS.forEach(function (t) {
        var bt = byTrack[t.id];
        if (bt.silver > 0 && (!bestRescue || bt.silver > bestRescue.silver)) bestRescue = { name: t.name, silver: bt.silver, p: t.p };
      });

      if (grade <= 1.01 && byTrack.design.count === SLOT_COUNT && allNone()) {
        return 'Nothing planned yet — name an achievement, pick its track, and set a level to see your estimate move.';
      }
      var parts = [];
      if (bestRescue) parts.push('Lifting a <b>silver</b> in <b>' + ui.esc(bestRescue.name) + '</b> to <b>gold</b> crosses the pass line — your biggest single jump.');
      if (bestUp) parts.push('Pushing a <b>gold</b> in <b>' + ui.esc(bestUp.name) + '</b> to <b>platinum</b> is the cheapest way to climb toward a 10.');
      if (!parts.length) parts.push('Eight platinum is a perfect 10 — but a focused, finished few beats an over-scoped many.');
      return parts.join(' ');
    }
    function allNone() { for (var i = 0; i < slots.length; i++) if (slots[i].level !== 'none') return false; return true; }

    // ----- per-track text breakdown -----------------------------------------
    function paintBreakdown(byTrack) {
      var rows = TRACKS.map(function (t) {
        var bt = byTrack[t.id];
        var avg = bt.count ? bt.sum / bt.count : 0;
        var pct = Math.round(avg * 100);
        // text composition so colour is never the only signal
        var comp = [];
        if (bt.plat)   comp.push(bt.plat + 'P');
        if (bt.gold)   comp.push(bt.gold + 'G');
        if (bt.silver) comp.push(bt.silver + 'S');
        if (bt.none)   comp.push(bt.none + '–');
        var compTxt = comp.length ? comp.join(' · ') : 'empty';
        return '<div style="display:grid;grid-template-columns:64px 1fr 90px;align-items:center;gap:10px;padding:5px 0;border-bottom:1px solid var(--line-soft)">'
          + '<span style="font-weight:700;color:var(--p-' + t.p + ')">' + ui.esc(t.name) + '</span>'
          + '<span class="minibar" style="margin:0"><i style="width:' + pct + '%;background:var(--p-' + t.p + ')"></i></span>'
          + '<span class="readout" style="text-align:right">' + ui.esc(compTxt) + '</span>'
          + '</div>';
      }).join('');
      breakdown.innerHTML =
        '<div class="mono" style="font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);margin-bottom:6px">Per-track breakdown</div>'
        + rows
        + '<div class="dim" style="font-size:.8rem;margin-top:8px">Bars show each track\'s average fraction of a platinum. '
        + 'Tags read <b>P</b>latinum · <b>G</b>old · <b>S</b>ilver · <b>–</b> none. '
        + 'A spread across all five tracks is usually safer than maxing one — confirm what the minor expects.</div>';
    }

    recompute();

    // No timers, rAF, intervals or global listeners were created — nothing to
    // tear down. Returning an explicit no-op dispose keeps the contract clear.
    return function dispose() {};
  }

  GDA.tools.register({
    id: 'achieve',
    icon: 'star',
    title: 'Achievement & Grade Planner',
    blurb: 'Plan the individual achievement portfolio. Eight slots — name, track (Story / Design / Level / 3D / Code) and a silver / gold / platinum level — modelled onto the course anchors (≈ 8 gold = a 6, 8 platinum = a 10) to estimate your achievement grade and show which gold→platinum push helps most. A planning estimate to confirm with the minor; covers only the individual half, not the group game.',
    category: 'Foundations',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
