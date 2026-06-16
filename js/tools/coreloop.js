/* =============================================================================
 * Game Dev Academy — Tool: Core-Loop & Mechanics Sketcher.
 * Define your game's CORE LOOP as an ordered ring of steps (the heartbeat the
 * player repeats every few seconds: e.g. Explore → Encounter → Reward → Upgrade →
 * back to Explore). Edit the steps as a keyboard-accessible list (add / remove /
 * move / rename), see them ALSO drawn as an SVG cycle diagram with arrows looping
 * back to the start, and sketch optional secondary / meta loops (session,
 * progression) beneath. A tight 3–6 step loop is the goal; the tool warns when the
 * loop bloats past ~7 steps — the #1 scope smell in student games. Nodes use the
 * --accent hue but are ALWAYS labelled with their text, never colour alone.
 * Persists steps + secondary loops. Pure DOM + inline SVG, offline.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;
  var ID = 'coreloop';

  // A classic, honest default core loop students recognise (action RPG flavour).
  var DEFAULT_CORE = ['Explore', 'Encounter', 'Reward', 'Upgrade'];
  // Secondary / meta loops sit outside the moment-to-moment loop. Default examples.
  var DEFAULT_META = [
    { name: 'Session loop', steps: 'Log in → Do a run → Spend earnings → Set next goal → Log off' },
    { name: 'Progression loop', steps: 'Beat area → Unlock biome → Face harder foes → Earn better gear' }
  ];

  var TIGHT_MIN = 3, TIGHT_MAX = 6, BLOAT = 7; // scope thresholds

  function clone(a) { return JSON.parse(JSON.stringify(a)); }

  function load() {
    var s = store.toolState(ID);
    var core = (s && Array.isArray(s.core) && s.core.length) ? s.core.slice() : DEFAULT_CORE.slice();
    var meta = (s && Array.isArray(s.meta)) ? clone(s.meta) : clone(DEFAULT_META);
    // sanitise
    core = core.map(function (x) { return String(x == null ? '' : x); });
    meta = meta.map(function (m) { return { name: String(m && m.name || ''), steps: String(m && m.steps || '') }; });
    return { core: core, meta: meta };
  }

  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;
    var state = load();

    container.innerHTML = '';

    // ----- shell --------------------------------------------------------------
    var root = ui.h('div', { class: 'coreloop' });

    if (!compact) {
      root.appendChild(ui.h('div', { class: 'callout', role: 'note', style: 'margin:0 0 14px;border-color:var(--accent)' },
        '<span class="ct">The heartbeat</span>'
        + 'Your <b>core loop</b> is the handful of actions the player repeats every few seconds — the verb-cycle the whole game hangs off. '
        + 'Nail a tight <b>3–6 step</b> loop that’s fun on its own, and everything else (story, art, levels) is decoration on a beating heart. '
        + 'Sketch yours below; watch the cycle diagram redraw live.'));
    }

    // Two-column layout: editor + diagram. Stacks on narrow / compact via CSS grid.
    var grid = ui.h('div', { class: 'cl-grid', style: 'display:grid;gap:16px;'
      + (compact ? 'grid-template-columns:1fr' : 'grid-template-columns:minmax(0,1fr) minmax(0,1fr)') });
    root.appendChild(grid);

    // --- editor column --------------------------------------------------------
    var editCol = ui.h('div', { class: 'panel', style: 'min-width:0' });
    editCol.appendChild(ui.h('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px' },
      '<span class="mono" style="font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)">Core loop steps</span>'));
    var listWrap = ui.h('ol', { class: 'cl-list', style: 'list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px', 'aria-label': 'Ordered core-loop steps' });
    editCol.appendChild(listWrap);

    var addRow = ui.h('div', { style: 'display:flex;gap:8px;margin-top:10px;flex-wrap:wrap' });
    var addBtn = ui.h('button', { class: 'btn sm', type: 'button' }, ui.icon('bolt') + ' Add step');
    var resetBtn = ui.h('button', { class: 'btn sm ghost', type: 'button', title: 'Restore the default example loop' }, ui.icon('reset') + ' Reset');
    addRow.appendChild(addBtn);
    addRow.appendChild(resetBtn);
    editCol.appendChild(addRow);

    // live status / scope readout
    var statusWrap = ui.h('div', { style: 'margin-top:12px;display:flex;flex-direction:column;gap:8px' });
    var countOut = ui.h('div', { class: 'readout', 'aria-live': 'polite' });
    var scopeFlag = ui.h('div', { 'aria-live': 'polite' });
    statusWrap.appendChild(countOut);
    statusWrap.appendChild(scopeFlag);
    editCol.appendChild(statusWrap);

    grid.appendChild(editCol);

    // --- diagram column -------------------------------------------------------
    var diagCol = ui.h('div', { class: 'tool-stage', style: 'min-width:0;display:flex;flex-direction:column;gap:8px' });
    diagCol.appendChild(ui.h('div', { class: 'mono', style: 'font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)' }, 'Cycle diagram'));
    var svgHost = ui.h('div', { style: 'width:100%' });
    diagCol.appendChild(svgHost);
    diagCol.appendChild(ui.h('div', { class: 'legend' },
      '<span class="lk"><span class="sw" style="background:var(--accent)"></span>Loop step (numbered, plays in order)</span>'
      + '<span class="lk"><span class="sw" style="background:transparent;border-color:var(--ink-3)"></span>→ arrow shows play order, last step returns to the first</span>'));
    grid.appendChild(diagCol);

    // --- secondary / meta loops (full width) ----------------------------------
    var metaSection = null, metaList = null, metaAddBtn = null;
    if (!compact) {
      metaSection = ui.h('div', { class: 'panel', style: 'margin-top:16px' });
      metaSection.appendChild(ui.h('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px' },
        '<span class="mono" style="font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)">Secondary / meta loops</span>'));
      metaSection.appendChild(ui.h('p', { class: 'dim', style: 'font-size:.84rem;margin:.2em 0 .8em' },
        'Bigger cycles that wrap the core loop on longer timescales — a <b>session loop</b> (one sitting), a <b>progression loop</b> (unlocks over days). '
        + 'They give the core loop a reason to keep spinning. Keep these as plain sentences; they don’t have to be a strict ring.'));
      metaList = ui.h('div', { style: 'display:flex;flex-direction:column;gap:8px' });
      metaSection.appendChild(metaList);
      metaAddBtn = ui.h('button', { class: 'btn sm', type: 'button', style: 'margin-top:10px' }, ui.icon('layers') + ' Add meta loop');
      metaSection.appendChild(metaAddBtn);
      root.appendChild(metaSection);
    }

    container.appendChild(root);

    // ===== rendering ==========================================================

    function persist() {
      store.setToolState(ID, { core: state.core.slice(), meta: clone(state.meta) });
    }

    // Re-draw the editable step list. Rebuilt wholesale on structural change so the
    // numbering, move-button disabled states and ARIA labels stay correct.
    function renderList() {
      listWrap.innerHTML = '';
      state.core.forEach(function (label, i) {
        var li = ui.h('li', { style: 'display:flex;align-items:center;gap:7px;background:var(--panel-2);border:1px solid var(--line);'
          + 'border-left:3px solid var(--accent);border-radius:9px;padding:7px 8px' });

        var num = ui.h('span', { class: 'mono', 'aria-hidden': 'true',
          style: 'flex:0 0 auto;width:22px;height:22px;border-radius:6px;display:grid;place-items:center;'
          + 'background:var(--accent-ink);color:var(--accent);font-size:.78rem;font-weight:700' }, String(i + 1));
        li.appendChild(num);

        var input = ui.h('input', { type: 'text', class: 'field', value: label,
          'aria-label': 'Step ' + (i + 1) + ' label',
          style: 'flex:1;min-width:0;padding:6px 9px' });
        input.addEventListener('input', function () { state.core[i] = input.value; persist(); renderDiagram(); renderStatus(); });
        li.appendChild(input);

        // move up / down / remove — real buttons, keyboard-usable, labelled.
        var up = ui.h('button', { class: 'iconbtn', type: 'button', title: 'Move step up',
          'aria-label': 'Move step ' + (i + 1) + ' up', style: 'width:30px;height:30px;border:1px solid var(--line)' }, glyphUp());
        up.disabled = i === 0;
        if (up.disabled) up.style.opacity = '.35';
        up.addEventListener('click', function () { if (i > 0) { swap(i, i - 1); } });

        var down = ui.h('button', { class: 'iconbtn', type: 'button', title: 'Move step down',
          'aria-label': 'Move step ' + (i + 1) + ' down', style: 'width:30px;height:30px;border:1px solid var(--line)' }, glyphDown());
        down.disabled = i === state.core.length - 1;
        if (down.disabled) down.style.opacity = '.35';
        down.addEventListener('click', function () { if (i < state.core.length - 1) { swap(i, i + 1); } });

        var del = ui.h('button', { class: 'iconbtn', type: 'button', title: 'Remove step',
          'aria-label': 'Remove step ' + (i + 1), style: 'width:30px;height:30px;border:1px solid var(--line);color:var(--bad)' }, glyphX());
        del.disabled = state.core.length <= 1;
        if (del.disabled) del.style.opacity = '.35';
        del.addEventListener('click', function () { removeStep(i); });

        li.appendChild(up); li.appendChild(down); li.appendChild(del);
        listWrap.appendChild(li);
      });
    }

    function swap(a, b) {
      var t = state.core[a]; state.core[a] = state.core[b]; state.core[b] = t;
      persist(); renderList(); renderDiagram(); renderStatus();
    }
    function removeStep(i) {
      if (state.core.length <= 1) return;
      state.core.splice(i, 1);
      persist(); renderList(); renderDiagram(); renderStatus();
    }
    function addStep() {
      state.core.push('New step');
      persist(); renderList(); renderDiagram(); renderStatus();
      // focus the new input for immediate typing
      var inputs = listWrap.querySelectorAll('input.field');
      var last = inputs[inputs.length - 1];
      if (last) { last.focus(); last.select(); }
    }

    // ----- SVG cycle diagram --------------------------------------------------
    // Nodes evenly spaced around a circle; arrows along the ring in play order,
    // the final arrow curving back to step 1 to show the loop closes.
    function renderDiagram() {
      var steps = state.core;
      var n = steps.length;
      var size = compact ? 240 : 320;
      var cx = size / 2, cy = size / 2;
      var R = size / 2 - (compact ? 44 : 54);   // ring radius for node centres
      var nodeR = compact ? 26 : 32;

      // position each node, starting at the top (12 o'clock), going clockwise.
      var pts = [];
      for (var i = 0; i < n; i++) {
        var ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
        pts.push({ x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang), ang: ang });
      }

      var parts = [];
      parts.push('<svg viewBox="0 0 ' + size + ' ' + size + '" width="100%" '
        + 'style="max-width:' + size + 'px;margin:0 auto;display:block" role="img" '
        + 'aria-label="Core loop cycle diagram: ' + ui.esc(steps.map(function (s, k) { return (k + 1) + ' ' + s; }).join(', then ')) + ', looping back to the start.">');

      // arrowhead marker
      parts.push('<defs><marker id="cl-ah" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto-start-reverse">'
        + '<path d="M1 1L8 4.5L1 8z" fill="var(--ink-3)"/></marker></defs>');

      if (n === 1) {
        // single step: a self-loop so the "it repeats" idea still reads.
        var p = pts[0];
        parts.push(selfLoop(p, nodeR));
      } else {
        // arrows between consecutive nodes along the ring (slightly inset so they
        // start/end at node edges, not centres).
        for (var a = 0; a < n; a++) {
          var from = pts[a], to = pts[(a + 1) % n];
          parts.push(ringArrow(from, to, cx, cy, R, nodeR, a === n - 1));
        }
      }

      // nodes on top of arrows
      for (var j = 0; j < n; j++) {
        var pt = pts[j];
        var label = steps[j] || ('Step ' + (j + 1));
        parts.push(nodeMarkup(pt, nodeR, j + 1, label));
      }

      parts.push('</svg>');
      svgHost.innerHTML = parts.join('');
    }

    function nodeMarkup(p, r, idx, label) {
      var fontMain = compact ? 9 : 10.5;
      var lines = wrapLabel(label, compact ? 9 : 11);
      var lineH = fontMain + 1.5;
      var startY = p.y + 4 - ((lines.length - 1) * lineH) / 2;
      var text = lines.map(function (ln, k) {
        return '<tspan x="' + p.x.toFixed(1) + '" y="' + (startY + k * lineH).toFixed(1) + '">' + ui.esc(ln) + '</tspan>';
      }).join('');
      // number badge above the node
      var badgeY = p.y - r - (compact ? 5 : 7);
      return '<g>'
        + '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + r + '" '
        + 'fill="var(--accent-ink)" stroke="var(--accent)" stroke-width="2"/>'
        + '<text x="' + p.x.toFixed(1) + '" y="' + badgeY.toFixed(1) + '" text-anchor="middle" '
        + 'font-family="var(--mono)" font-size="' + (compact ? 8.5 : 9.5) + '" font-weight="700" fill="var(--accent-2)">' + idx + '</text>'
        + '<text text-anchor="middle" font-family="var(--sans)" font-size="' + fontMain + '" font-weight="600" '
        + 'fill="var(--ink)">' + text + '</text>'
        + '</g>';
    }

    // an arrow that follows the ring's arc from one node toward the next.
    function ringArrow(from, to, cx, cy, R, nodeR, isClosing) {
      // pull start/end in to the node rim along the chord direction
      var dx = to.x - from.x, dy = to.y - from.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len, uy = dy / len;
      var sx = from.x + ux * (nodeR + 4), sy = from.y + uy * (nodeR + 4);
      var ex = to.x - ux * (nodeR + 8), ey = to.y - uy * (nodeR + 8);
      // bow the path outward along the arc so it reads as a ring, not a polygon.
      var mx = (sx + ex) / 2, my = (sy + ey) / 2;
      var ox = mx - cx, oy = my - cy;
      var ol = Math.sqrt(ox * ox + oy * oy) || 1;
      var bow = R * 0.18;
      var bx = mx + (ox / ol) * bow, by = my + (oy / ol) * bow;
      var stroke = isClosing ? 'var(--accent)' : 'var(--ink-3)';
      var width = isClosing ? 2.4 : 1.8;
      var dash = isClosing ? ' stroke-dasharray="5 3"' : '';
      // closing arrow uses the accent + dashes so "returns to start" is obvious
      // even without colour (the dash pattern is the redundant cue).
      return '<path d="M' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ' Q' + bx.toFixed(1) + ' ' + by.toFixed(1)
        + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + '" fill="none" stroke="' + stroke + '" stroke-width="'
        + width + '"' + dash + ' marker-end="url(#cl-ah)"/>';
    }

    function selfLoop(p, r) {
      // a little loop hanging off the right of a lone node
      var x = p.x + r, y = p.y;
      return '<path d="M' + x.toFixed(1) + ' ' + (y - 6).toFixed(1)
        + ' C' + (x + 40) + ' ' + (y - 34) + ' ' + (x + 40) + ' ' + (y + 34) + ' ' + x.toFixed(1) + ' ' + (y + 6).toFixed(1)
        + '" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-dasharray="5 3" marker-end="url(#cl-ah)"/>';
    }

    // ----- scope status -------------------------------------------------------
    function renderStatus() {
      var n = state.core.length;
      countOut.innerHTML = 'Core loop: <b>' + n + '</b> step' + (n === 1 ? '' : 's')
        + ' <span class="dim">(target ' + TIGHT_MIN + '–' + TIGHT_MAX + ')</span>';

      var flag;
      if (n >= BLOAT) {
        flag = '<div class="flag bad"><span class="fi">!</span> Scope smell: ' + n + ' steps. '
          + 'A loop this long is hard to make fun and harder to finish — the #1 reason student games miss the deadline. '
          + 'Fold steps together or cut to ' + TIGHT_MIN + '–' + TIGHT_MAX + '.</div>';
      } else if (n >= TIGHT_MIN && n <= TIGHT_MAX) {
        flag = '<div class="flag ok"><span class="fi">✓</span> Tight loop. '
          + 'This is the sweet spot — small enough to build, repeatable enough to be a heartbeat.</div>';
      } else if (n < TIGHT_MIN) {
        flag = '<div class="flag warn"><span class="fi">i</span> Very short. '
          + 'One or two steps can work (think Tetris), but check the loop still has a real decision in it — '
          + 'not just "press button, thing happens".</div>';
      } else { // exactly TIGHT_MAX+? handled above; this covers nothing extra
        flag = '';
      }
      scopeFlag.innerHTML = flag;
    }

    // ----- meta loops ---------------------------------------------------------
    function renderMeta() {
      if (!metaList) return;
      metaList.innerHTML = '';
      if (!state.meta.length) {
        metaList.appendChild(ui.h('p', { class: 'dim', style: 'font-size:.86rem;margin:0' },
          'No meta loops yet — add one to describe what keeps the player coming back across a session or across days.'));
      }
      state.meta.forEach(function (m, i) {
        var row = ui.h('div', { style: 'background:var(--panel-2);border:1px solid var(--line);'
          + 'border-left:3px solid var(--p-C);border-radius:9px;padding:9px 10px;display:flex;flex-direction:column;gap:6px' });

        var top = ui.h('div', { style: 'display:flex;gap:7px;align-items:center' });
        var name = ui.h('input', { type: 'text', class: 'field', value: m.name,
          placeholder: 'Loop name (e.g. Session loop)', 'aria-label': 'Meta loop ' + (i + 1) + ' name',
          style: 'flex:1;min-width:0;padding:6px 9px;font-weight:600' });
        name.addEventListener('input', function () { state.meta[i].name = name.value; persist(); });
        var del = ui.h('button', { class: 'iconbtn', type: 'button', title: 'Remove this meta loop',
          'aria-label': 'Remove meta loop ' + (i + 1), style: 'width:30px;height:30px;border:1px solid var(--line);color:var(--bad)' }, glyphX());
        del.addEventListener('click', function () { state.meta.splice(i, 1); persist(); renderMeta(); });
        top.appendChild(name); top.appendChild(del);

        var steps = ui.h('input', { type: 'text', class: 'field', value: m.steps,
          placeholder: 'Step 1 → Step 2 → Step 3 …', 'aria-label': 'Meta loop ' + (i + 1) + ' steps',
          style: 'padding:6px 9px;font-size:.9rem' });
        steps.addEventListener('input', function () { state.meta[i].steps = steps.value; persist(); });

        row.appendChild(top); row.appendChild(steps);
        metaList.appendChild(row);
      });
    }

    // ===== wire-up ============================================================
    addBtn.addEventListener('click', addStep);
    resetBtn.addEventListener('click', function () {
      state.core = DEFAULT_CORE.slice();
      persist(); renderList(); renderDiagram(); renderStatus();
      ui.toast('Core loop reset to the example.');
    });
    if (metaAddBtn) metaAddBtn.addEventListener('click', function () {
      state.meta.push({ name: '', steps: '' });
      persist(); renderMeta();
      var inputs = metaList.querySelectorAll('input.field');
      var first = inputs[inputs.length - 2]; // the name input of the new row
      if (first) first.focus();
    });

    // initial paint
    renderList();
    renderDiagram();
    renderStatus();
    renderMeta();

    // ----- dispose: this tool creates no timers / rAF / global listeners. All
    // listeners are on elements inside `container`, which the host clears on
    // unmount, so there is nothing to manually tear down. We still return a real
    // dispose() per the contract.
    return function dispose() {
      container.innerHTML = '';
    };
  }

  // small inline glyphs (stroke icons sized for the 30px control buttons)
  function svgWrap(body) {
    return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" '
      + 'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }
  function glyphUp() { return svgWrap('<path d="M12 19V5M6 11l6-6 6 6"/>'); }
  function glyphDown() { return svgWrap('<path d="M12 5v14M6 13l6 6 6-6"/>'); }
  function glyphX() { return svgWrap('<path d="M6 6l12 12M18 6L6 18"/>'); }

  // greedy word-wrap so long step labels fit inside the node circles.
  function wrapLabel(label, maxChars) {
    var words = String(label).trim().split(/\s+/);
    if (!words.length || words[0] === '') return ['?'];
    var lines = [], cur = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (!cur) { cur = w; }
      else if ((cur + ' ' + w).length <= maxChars) { cur += ' ' + w; }
      else { lines.push(cur); cur = w; }
      if (lines.length >= 2) break; // cap at 3 lines total to stay inside the node
    }
    if (cur && lines.length < 3) lines.push(cur);
    // hard-truncate any single word that overruns the node
    lines = lines.map(function (ln) { return ln.length > maxChars + 3 ? ln.slice(0, maxChars + 2) + '…' : ln; });
    return lines.slice(0, 3);
  }

  GDA.tools.register({
    id: ID,
    icon: 'compass',
    title: 'Core-Loop Sketcher',
    blurb: 'Define your game’s core loop as an ordered ring of steps and watch it draw itself as a cycle diagram — arrows looping back to the start. Add session and progression meta-loops beneath. Aims you at a tight 3–6 step heartbeat and warns when the loop bloats past 7 (the classic over-scoping smell). Everything you type is saved.',
    category: 'Design',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
