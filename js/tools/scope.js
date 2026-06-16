/* =============================================================================
 * Game Dev Academy — Tool: Scope & Feasibility Estimator.
 * Premise: an 8-person team, ~one semester. You feed it the shape of your game —
 * dimension, core mechanics, levels, enemy types, multiplayer, procgen, open
 * world, custom engine, narrative branching, art volume, original audio — and it
 * sums a weighted "scope load" against a notional team-semester budget, then gives
 * you a TEXT verdict (Comfortable / Ambitious / Over-scoped) on a labelled gauge,
 * plus the RED FLAGS your choices tripped and a smaller alternative for each.
 *
 * The whole point: over-scoping is the #1 way student games die, and the GDD is
 * graded on complexity vs feasibility — so a smaller game you actually finish
 * beats a huge one you don't. The weights here are heuristic teaching aids, not a
 * precise model. Every colour is paired with a letter/word label. Pure DOM,
 * offline, keyboard-accessible. Persists all inputs.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;
  var ID = 'scope';

  // The notional budget: what an 8-person student team can plausibly ship in one
  // semester at a polished, finishable bar. Scope load is summed in the same
  // abstract "points" unit. ~100 = a full, comfortable semester.
  var BUDGET = 100;
  var COMFY = 78;   // at/under this many points → Comfortable
  var TIGHT = 108;  // between COMFY and this → Ambitious; above → Over-scoped

  // ---- choice-style fields (segmented buttons) ----------------------------
  // Each option carries a `load` (scope points) and a short `tag` shown on screen.
  var DIMENSION = {
    key: 'dimension', label: 'Dimension', help: 'How the game is built and rendered.',
    options: [
      { v: '2d',  tag: '2D',   load: 6,  note: 'Cheapest to build and animate — the classic student-friendly choice.' },
      { v: '25d', tag: '2.5D', load: 14, note: '3D assets on largely 2D gameplay — more art cost than it looks.' },
      { v: '3d',  tag: '3D',   load: 26, note: 'Full 3D multiplies art, animation, collision and camera work.' }
    ], def: '2d'
  };
  var MULTI = {
    key: 'multiplayer', label: 'Multiplayer', help: 'Networking is a whole discipline on its own.',
    options: [
      { v: 'none',   tag: 'None',   load: 0,  note: 'Single-player. One source of truth, far simpler to test.' },
      { v: 'local',  tag: 'Local',  load: 12, note: 'Same-screen / split-screen — extra input + camera work, but no netcode.' },
      { v: 'online', tag: 'Online', load: 40, note: 'Netcode, servers, lag, sync, cheating — a project-sized risk by itself.' }
    ], def: 'none'
  };
  var BRANCH = {
    key: 'branching', label: 'Narrative branching', help: 'Branching content is written, then cut, many times over.',
    options: [
      { v: 'none',  tag: 'None',  load: 0,  note: 'Linear or no story — write it once.' },
      { v: 'light', tag: 'Light', load: 9,  note: 'A few choices, small fork-and-merge — manageable.' },
      { v: 'heavy', tag: 'Heavy', load: 30, note: 'Deep branching multiplies writing, VO, testing and bugs combinatorially.' }
    ], def: 'none'
  };
  var ART = {
    key: 'art', label: 'Original-art volume', help: 'How much art the team must make from scratch.',
    options: [
      { v: 'low',  tag: 'Low',  load: 6,  note: 'Mostly free/asset-store art, small original set — fast.' },
      { v: 'med',  tag: 'Med',  load: 16, note: 'A consistent original style across the game — a real but doable load.' },
      { v: 'high', tag: 'High', load: 32, note: 'Bespoke art for everything — easily the biggest sink on a student team.' }
    ], def: 'low'
  };
  var CHOICE_FIELDS = [DIMENSION, MULTI, BRANCH, ART];

  // ---- numeric range fields ----------------------------------------------
  // load = count * per, with a label and a soft "this is a lot" threshold (hi).
  var RANGES = [
    { key: 'mechanics', label: 'Core mechanics', min: 1, max: 8, def: 3, per: 7, hi: 6,
      help: 'Distinct CORE verbs (jump, shoot, craft…). Each one must be designed, coded, tuned and taught.',
      unit: function (n) { return n === 1 ? 'mechanic' : 'mechanics'; } },
    { key: 'levels', label: 'Levels / areas', min: 1, max: 20, def: 4, per: 3.2, hi: 12,
      help: 'Distinct levels, rooms or areas. Each is design + blockout + art + scripting + testing.',
      unit: function (n) { return n === 1 ? 'level' : 'levels'; } },
    { key: 'enemies', label: 'Enemy / character types', min: 0, max: 15, def: 3, per: 4, hi: 9,
      help: 'Distinct enemy or NPC types. Each needs a model/sprite, animation, AI and balancing.',
      unit: function (n) { return n === 1 ? 'type' : 'types'; } }
  ];

  // ---- boolean toggle fields ----------------------------------------------
  var TOGGLES = [
    { key: 'procgen', label: 'Procedural generation', load: 16,
      note: 'Generators are deceptively hard to make consistently fun and bug-free.' },
    { key: 'openworld', label: 'Open world', load: 30,
      note: 'A seamless, full open world is a giant content and streaming problem.' },
    { key: 'customEngine', label: 'Custom engine (not Unity/Unreal/Godot)', load: 38,
      note: 'You would spend the semester building tools instead of building the game.' },
    { key: 'origAudio', label: 'Original audio / voice acting', load: 12,
      note: 'Composing music, SFX and recording/directing VO is its own production track.' }
  ];

  // ---- red-flag rules: each tests the live inputs and, if tripped, explains
  // why it is risky for a student team and what smaller thing to do instead. --
  var RED_FLAGS = [
    { id: 'online', test: function (s) { return s.multiplayer === 'online'; },
      title: 'Online multiplayer',
      why: 'Netcode, dedicated servers, latency, state sync and anti-cheat are a full project on their own — most pro studios staff a whole team for it.',
      instead: 'Ship single-player first, or do same-screen local multiplayer. Add online only as a stretch goal if everything else is done.' },
    { id: 'engine', test: function (s) { return s.customEngine; },
      title: 'Custom engine',
      why: 'You would burn the semester writing a renderer, physics and tools instead of a game — and still ship less than Godot gives you on day one.',
      instead: 'Use Godot, Unity or Unreal. If engine internals are the goal, build ONE small system (a 2D renderer or a physics demo), not a whole engine.' },
    { id: 'openworld', test: function (s) { return s.openworld; },
      title: 'Open world',
      why: 'A believable open world needs streaming, a flood of content and systems that hold together everywhere — content cost scales with area, fast.',
      instead: 'Make a few hand-crafted, dense levels (a "wide linear" hub). One great area beats ten empty square kilometres.' },
    { id: 'branching', test: function (s) { return s.branching === 'heavy'; },
      title: 'Heavy narrative branching',
      why: 'Branches multiply writing, voice lines, bug surface and testing combinatorially — most of what you write, players never see.',
      instead: 'Tell a strong linear story with a couple of meaningful choices near the end, or branch the flavour while the spine stays fixed.' },
    { id: 'mechanics', test: function (s) { return s.mechanics >= 6; },
      title: 'Too many core mechanics',
      dyn: function (s) { return s.mechanics + ' core mechanics'; },
      why: 'Each mechanic must be designed, coded, balanced AND taught to the player. Five half-baked verbs feel worse than two that sing.',
      instead: 'Cut to 1–3 core mechanics and go deep. Find the one verb your game is "about" and build everything around it.' },
    { id: 'levels', test: function (s) { return s.levels >= 12; },
      title: 'Too many levels / areas',
      dyn: function (s) { return s.levels + ' levels'; },
      why: 'Each level is design, blockout, art, scripting and testing. A big number here is the most common silent scope killer in student projects.',
      instead: 'Build 3–6 polished levels. A vertical slice of a few great levels reads as "finished"; twenty rough ones read as "abandoned".' },
    { id: 'enemies', test: function (s) { return s.enemies >= 9; },
      title: 'Too many enemy / character types',
      dyn: function (s) { return s.enemies + ' enemy/character types'; },
      why: 'Every type needs a model/sprite, animation set, AI behaviour and balancing — the cost is per type, and it adds up fast.',
      instead: 'Ship 2–4 enemy types with clear, readable behaviours. Reuse them in smarter combinations instead of adding new ones.' },
    { id: 'art', test: function (s) { return s.art === 'high' && s.dimension === '3d'; },
      title: 'High original-art volume in full 3D',
      why: 'Bespoke 3D art (model, UV, texture, rig, animate) for everything is the single biggest time sink — it sinks far more student teams than code does.',
      instead: 'Pick a stylised look that hides cost (flat-shaded, low-poly, silhouette-led), lean on a modular kit, and reuse assets hard.' }
  ];

  // current input state, restored from store.
  function defaults() {
    var s = {};
    CHOICE_FIELDS.forEach(function (f) { s[f.key] = f.def; });
    RANGES.forEach(function (r) { s[r.key] = r.def; });
    TOGGLES.forEach(function (t) { s[t.key] = false; });
    return s;
  }
  function load() {
    var saved = store && store.toolState ? store.toolState(ID) : null;
    var s = defaults();
    if (saved && typeof saved === 'object') {
      Object.keys(s).forEach(function (k) { if (saved[k] != null) s[k] = saved[k]; });
      // sanitise choice values to known options
      CHOICE_FIELDS.forEach(function (f) {
        if (!f.options.some(function (o) { return o.v === s[f.key]; })) s[f.key] = f.def;
      });
      RANGES.forEach(function (r) {
        var n = Math.round(Number(s[r.key]));
        if (!isFinite(n)) n = r.def;
        s[r.key] = Math.max(r.min, Math.min(r.max, n));
      });
      TOGGLES.forEach(function (t) { s[t.key] = !!s[t.key]; });
    }
    return s;
  }
  function save(s) { if (store && store.setToolState) store.setToolState(ID, s); }

  // ---- scoring ------------------------------------------------------------
  function chosen(field, s) {
    var v = s[field.key];
    for (var i = 0; i < field.options.length; i++) if (field.options[i].v === v) return field.options[i];
    return field.options[0];
  }
  function score(s) {
    var parts = [];
    CHOICE_FIELDS.forEach(function (f) {
      var o = chosen(f, s);
      if (o.load > 0) parts.push({ label: f.label + ': ' + o.tag, load: o.load });
    });
    RANGES.forEach(function (r) {
      var n = s[r.key];
      var load = Math.round(n * r.per * 10) / 10;
      if (load > 0) parts.push({ label: n + ' ' + r.unit(n), load: load });
    });
    TOGGLES.forEach(function (t) {
      if (s[t.key]) parts.push({ label: t.label, load: t.load });
    });
    var total = parts.reduce(function (a, p) { return a + p.load; }, 0);
    total = Math.round(total);
    var verdict;
    if (total <= COMFY) verdict = { key: 'comfortable', word: 'Comfortable', flag: 'ok', letter: 'C',
      gist: 'This fits a focused 8-person semester with room to polish and playtest. Hold this line.' };
    else if (total <= TIGHT) verdict = { key: 'ambitious', word: 'Ambitious', flag: 'warn', letter: 'A',
      gist: 'Doable, but only with tight discipline and an early cut list. Something will have to give — decide now what.' };
    else verdict = { key: 'overscoped', word: 'Over-scoped', flag: 'bad', letter: 'O',
      gist: 'Bigger than the budget. Cut features until the bar clears — a smaller game you finish beats a huge one you don’t.' };
    return { parts: parts, total: total, verdict: verdict };
  }
  function flagsFor(s) {
    return RED_FLAGS.filter(function (f) { return f.test(s); });
  }

  // ---- mount --------------------------------------------------------------
  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;
    var s = load();
    var listeners = [];
    function on(el, ev, fn) { el.addEventListener(ev, fn); listeners.push([el, ev, fn]); }

    container.innerHTML = '';
    var root = ui.h('div', { class: 'tool-frame scope-tool' });
    container.appendChild(root);

    // intro / premise — kept short in compact mode
    var intro = ui.h('div', { class: 'callout', role: 'note', style: 'margin:0 0 14px;border-color:var(--accent)' });
    intro.innerHTML = '<span class="ct">The premise</span>'
      + 'You are <b>8 people for ~one semester</b>. Set the shape of your game below and watch the <b>scope load</b> stack up against that budget. '
      + (compact ? '' : 'Over-scoping is the <b>#1 reason student games never ship</b>, and the GDD is graded on <b>complexity vs feasibility</b> — so aim to clear the bar, not max it out. ')
      + '<span class="dim">The weights are heuristic teaching aids, not a precise model.</span>';
    root.appendChild(intro);

    // ---- controls -------------------------------------------------------
    var controls = ui.h('div', { class: 'scope-controls grid', style: 'gap:14px;margin-bottom:16px' });
    root.appendChild(controls);

    // choice (segmented) fields
    CHOICE_FIELDS.forEach(function (f) {
      var wrap = ui.h('div', { class: 'ctrl', style: 'min-width:0' });
      var lab = ui.h('label', null,
        '<span>' + ui.esc(f.label) + '</span>'
        + '<span class="val" id="' + ID + '-' + f.key + '-tag"></span>');
      lab.setAttribute('id', ID + '-' + f.key + '-lab');
      var seg = ui.h('div', { class: 'seg', role: 'group' });
      seg.setAttribute('aria-labelledby', ID + '-' + f.key + '-lab');
      f.options.forEach(function (o) {
        var b = ui.h('button', { type: 'button' },
          ui.esc(o.tag) + ' <span class="dim mono" style="font-size:.7em">+' + o.load + '</span>');
        b.setAttribute('data-v', o.v);
        b.setAttribute('aria-pressed', s[f.key] === o.v ? 'true' : 'false');
        if (s[f.key] === o.v) b.classList.add('on');
        on(b, 'click', function () {
          s[f.key] = o.v; save(s);
          Array.prototype.forEach.call(seg.querySelectorAll('button'), function (bb) {
            var sel = bb.getAttribute('data-v') === o.v;
            bb.classList.toggle('on', sel);
            bb.setAttribute('aria-pressed', sel ? 'true' : 'false');
          });
          paint();
        });
        seg.appendChild(b);
      });
      var note = ui.h('div', { class: 'dim', id: ID + '-' + f.key + '-note', style: 'font-size:.78rem;margin-top:2px' });
      wrap.appendChild(lab); wrap.appendChild(seg);
      if (!compact) { var help = ui.h('div', { class: 'dim', style: 'font-size:.72rem' }, ui.esc(f.help)); wrap.appendChild(help); }
      wrap.appendChild(note);
      controls.appendChild(wrap);
    });

    // numeric ranges
    RANGES.forEach(function (r) {
      var wrap = ui.h('div', { class: 'ctrl', style: 'min-width:0' });
      var inputId = ID + '-' + r.key;
      var lab = ui.h('label', null,
        '<span>' + ui.esc(r.label) + '</span>'
        + '<span class="val"><span id="' + inputId + '-n">' + s[r.key] + '</span> '
        + '<span class="dim" id="' + inputId + '-u" style="font-weight:400">' + ui.esc(r.unit(s[r.key])) + '</span></span>');
      lab.setAttribute('for', inputId);
      var range = ui.h('input', { type: 'range', id: inputId,
        min: String(r.min), max: String(r.max), step: '1', value: String(s[r.key]) });
      range.setAttribute('aria-label', r.label);
      on(range, 'input', function () {
        s[r.key] = Math.round(Number(range.value)); save(s);
        var nEl = wrap.querySelector('#' + inputId + '-n');
        var uEl = wrap.querySelector('#' + inputId + '-u');
        if (nEl) nEl.textContent = s[r.key];
        if (uEl) uEl.textContent = r.unit(s[r.key]);
        paint();
      });
      wrap.appendChild(lab); wrap.appendChild(range);
      if (!compact) wrap.appendChild(ui.h('div', { class: 'dim', style: 'font-size:.72rem' }, ui.esc(r.help)));
      controls.appendChild(wrap);
    });

    // toggles
    var togWrap = ui.h('div', { class: 'ctrl', style: 'min-width:0;flex:1 1 100%' });
    togWrap.appendChild(ui.h('label', null, '<span>Heavyweight features</span>'
      + '<span class="dim mono" style="font-weight:400;font-size:.72rem">tap to toggle</span>'));
    var togRow = ui.h('div', { class: 'chip-row', role: 'group', 'aria-label': 'Heavyweight feature toggles' });
    TOGGLES.forEach(function (t) {
      var b = ui.h('button', { type: 'button', class: 'btn sm scope-toggle' });
      b.setAttribute('data-k', t.key);
      b.setAttribute('aria-pressed', s[t.key] ? 'true' : 'false');
      function render() {
        var onv = !!s[t.key];
        b.classList.toggle('primary', onv);
        b.setAttribute('aria-pressed', onv ? 'true' : 'false');
        b.innerHTML = '<span aria-hidden="true" style="font-weight:800">' + (onv ? '✓' : '+') + '</span> '
          + ui.esc(t.label) + ' <span class="dim mono" style="font-size:.82em">' + (onv ? 'ON' : 'off') + ' · +' + t.load + '</span>';
      }
      on(b, 'click', function () { s[t.key] = !s[t.key]; save(s); render(); paint(); });
      render();
      togRow.appendChild(b);
    });
    togWrap.appendChild(togRow);
    if (!compact) togWrap.appendChild(ui.h('div', { class: 'dim', style: 'font-size:.72rem;margin-top:4px' },
      'Each of these is a discipline of its own — toggling one on is a bigger decision than it looks.'));
    controls.appendChild(togWrap);

    // reset
    var actions = ui.h('div', { class: 'tool-controls', style: 'margin-bottom:14px' });
    var resetBtn = ui.h('button', { type: 'button', class: 'btn sm ghost' }, ui.icon('reset') + ' Reset to a small, safe scope');
    on(resetBtn, 'click', function () {
      s = defaults(); save(s);
      // re-render the whole tool to reflect reset cleanly
      cleanup();
      mount(container, opts);
    });
    actions.appendChild(resetBtn);
    root.appendChild(actions);

    // ---- gauge + verdict ------------------------------------------------
    var gauge = ui.h('div', { class: 'tool-stage scope-gauge', 'aria-live': 'polite' });
    root.appendChild(gauge);

    // ---- breakdown + red flags ------------------------------------------
    var breakdown = ui.h('div', { class: 'diagram-info', style: 'margin-top:14px' });
    root.appendChild(breakdown);

    var flagsWrap = ui.h('div', { class: 'scope-flags', style: 'margin-top:14px', 'aria-live': 'polite' });
    root.appendChild(flagsWrap);

    // reinforcement footer
    if (!compact) {
      var foot = ui.h('div', { class: 'callout simplify', style: 'margin-top:16px' });
      foot.innerHTML = '<span class="ct">Scope discipline</span>'
        + 'When the bar is in the red, do not add a producer — <b>cut</b>. The strongest student GDDs read as '
        + '"a small idea, fully realised." Graders reward a finished, polished slice far above an ambitious wreck. '
        + 'Decide your <b>cut list</b> before you start, and revisit this estimator every time the design grows.';
      root.appendChild(foot);
    }

    // ---- painters -------------------------------------------------------
    function pct(v) { return Math.max(0, Math.min(100, v)); }

    function paint() {
      var r = score(s);
      var v = r.verdict;

      // update the live tags on choice fields
      CHOICE_FIELDS.forEach(function (f) {
        var o = chosen(f, s);
        var tagEl = root.querySelector('#' + ID + '-' + f.key + '-tag');
        if (tagEl) tagEl.textContent = o.tag + ' (+' + o.load + ')';
        var noteEl = root.querySelector('#' + ID + '-' + f.key + '-note');
        if (noteEl) noteEl.textContent = o.note;
      });

      // --- gauge ---
      var fillPct = pct(r.total / BUDGET * 100);
      // budget marker sits at BUDGET on a 0..(TIGHT+pad) track; we render the bar
      // relative to a track max so the marker has a sensible position.
      var trackMax = Math.max(BUDGET * 1.6, r.total * 1.1);
      var fillRel = pct(r.total / trackMax * 100);
      var budgetMark = pct(BUDGET / trackMax * 100);
      var comfyMark = pct(COMFY / trackMax * 100);
      var tightMark = pct(TIGHT / trackMax * 100);
      var barColor = v.flag === 'ok' ? 'var(--ok)' : v.flag === 'warn' ? 'var(--warn)' : 'var(--bad)';

      gauge.innerHTML =
        '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">'
        + '<span class="flag ' + v.flag + '" style="font-size:.95rem;padding:6px 12px">'
        + '<span class="fi" aria-hidden="true">' + v.letter + '</span> Verdict: ' + ui.esc(v.word) + '</span>'
        + '<span class="readout"><b>' + r.total + '</b> scope points <span class="dim">/ ' + BUDGET + ' budget '
        + '(' + Math.round(fillPct) + '% of a team-semester)</span></span>'
        + '</div>'
        // the bar track
        + '<div style="position:relative;height:26px;background:var(--line);border-radius:99px;overflow:hidden;border:1px solid var(--line)">'
        + '<div style="position:absolute;inset:0 auto 0 0;width:' + fillRel + '%;background:' + barColor + ';border-radius:99px;transition:width .18s ease"></div>'
        + '<div style="position:absolute;top:0;bottom:0;left:' + budgetMark + '%;width:2px;background:var(--ink)" aria-hidden="true"></div>'
        + '</div>'
        // marker labels under the bar
        + '<div style="position:relative;height:18px;margin-top:2px;font-family:var(--mono);font-size:.62rem;color:var(--ink-3)">'
        + '<span style="position:absolute;left:' + comfyMark + '%;transform:translateX(-50%)">C ≤' + COMFY + '</span>'
        + '<span style="position:absolute;left:' + budgetMark + '%;transform:translateX(-50%);color:var(--ink-2)">budget ' + BUDGET + '</span>'
        + '<span style="position:absolute;left:' + tightMark + '%;transform:translateX(-50%)">O >' + TIGHT + '</span>'
        + '</div>'
        + '<p style="margin:8px 0 0;font-size:.92rem">' + ui.line(v.gist) + '</p>'
        // verdict legend — never colour alone
        + '<div class="legend" role="note">'
        + '<span class="lk"><span class="sw" style="background:var(--ok)"></span> <b>C</b> Comfortable — fits with polish to spare</span>'
        + '<span class="lk"><span class="sw" style="background:var(--warn)"></span> <b>A</b> Ambitious — doable only with strict cuts</span>'
        + '<span class="lk"><span class="sw" style="background:var(--bad)"></span> <b>O</b> Over-scoped — cut features to ship</span>'
        + '</div>';

      // --- breakdown (sorted, biggest first) ---
      var parts = r.parts.slice().sort(function (a, b) { return b.load - a.load; });
      var maxLoad = parts.length ? parts[0].load : 1;
      var rows = parts.map(function (p) {
        var w = pct(p.load / maxLoad * 100);
        return '<div style="display:flex;align-items:center;gap:8px;margin:4px 0">'
          + '<span style="flex:1 1 auto;min-width:0;font-size:.86rem">' + ui.esc(p.label) + '</span>'
          + '<span style="flex:0 0 110px;height:9px;background:var(--line);border-radius:99px;overflow:hidden">'
          + '<span style="display:block;height:100%;width:' + w + '%;background:var(--accent);border-radius:99px"></span></span>'
          + '<span class="mono" style="flex:0 0 38px;text-align:right;font-size:.78rem;color:var(--ink-2)">' + p.load + '</span>'
          + '</div>';
      }).join('');
      breakdown.innerHTML =
        '<h4 style="display:flex;justify-content:space-between;align-items:baseline">Where the load comes from'
        + '<span class="mono dim" style="font-size:.72rem">biggest sinks first</span></h4>'
        + (parts.length ? rows : '<p class="dim" style="margin:.3em 0">A minimal scope — almost nothing is stacking up yet. This is a strong place to start from.</p>')
        + '<p class="dim" style="font-size:.78rem;margin:.6em 0 0">Total <b>' + r.total + '</b> points of a notional <b>' + BUDGET + '</b>-point team-semester. Trim the longest bars first.</p>';

      // --- red flags ---
      var flags = flagsFor(s);
      if (!flags.length) {
        flagsWrap.innerHTML = '<div class="flag ok" style="font-size:.9rem"><span class="fi" aria-hidden="true">✓</span> '
          + 'No red-flag features tripped. Nothing here is a known student-project killer — keep it that way.</div>';
      } else {
        flagsWrap.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'
          + '<span class="flag bad" style="font-size:.86rem"><span class="fi" aria-hidden="true">!</span> '
          + flags.length + ' red flag' + (flags.length === 1 ? '' : 's') + ' tripped</span>'
          + '<span class="dim" style="font-size:.8rem">High-risk for a student team — each has a smaller alternative.</span></div>'
          + flags.map(function (f) {
            var title = f.dyn ? (f.title + ' — ' + ui.esc(f.dyn(s))) : ui.esc(f.title);
            return '<div class="panel" style="border-left:3px solid var(--bad);border-radius:0 var(--r-sm) var(--r-sm) 0;padding:10px 14px;margin:8px 0">'
              + '<div style="display:flex;align-items:center;gap:8px;font-weight:700">'
              + '<span class="badge" style="color:var(--bad);border-color:color-mix(in srgb,var(--bad) 45%,transparent)">RISK</span> '
              + title + '</div>'
              + '<p style="margin:.4em 0 .3em;font-size:.9rem"><b>Why it is risky:</b> ' + ui.line(f.why) + '</p>'
              + '<p style="margin:0;font-size:.9rem;color:var(--ink-2)"><b>Smaller instead:</b> ' + ui.line(f.instead) + '</p>'
              + '</div>';
          }).join('');
      }
    }

    function cleanup() {
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2]); });
      listeners.length = 0;
    }

    paint();

    return function dispose() {
      cleanup();
      container.innerHTML = '';
    };
  }

  GDA.tools.register({
    id: ID,
    icon: 'target',
    title: 'Scope & Feasibility Estimator',
    blurb: 'Set the shape of your game — dimension, mechanics, levels, enemies, multiplayer, procgen, open world, custom engine, branching, art and audio — and weigh its scope load against an 8-person, one-semester budget. Get a plain-text Comfortable / Ambitious / Over-scoped verdict, see which choices cost the most, and get a smaller alternative for every red flag. Because over-scoping is the #1 student-game killer, and the GDD is graded on complexity vs feasibility.',
    category: 'Foundations',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
