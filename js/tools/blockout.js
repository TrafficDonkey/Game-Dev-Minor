/* =============================================================================
 * Game Dev Academy — Tool: Level Blockout Planner.
 * A top-down GRID you paint with cell types (Floor, Wall, Start, Goal, Enemy,
 * Cover, Pickup, Hazard, Door, Checkpoint). This is a PLAN tool — a greybox on
 * paper — NOT a level editor and NOT a running game. It exists to teach blockout
 * thinking: rough out space, mark the critical path, place pacing beats, then
 * iterate before any art exists. Pick a brush, click or click-drag to paint.
 * Every cell carries its LETTER, so the grid reads with colour off (colourblind
 * safe). Persists the grid, brush, size and notes. Pure DOM, offline.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;

  // The palette. Each type: key, single-letter/symbol glyph, name, the CSS
  // variable that tints it, and a one-line "what it's for" used in the legend.
  // 'empty' is the eraser target. Colour is NEVER the only signal — glyph always
  // renders inside the cell.
  var TYPES = [
    { k: 'empty', g: '.', name: 'Empty',      hue: 'var(--ink-3)',  note: 'Nothing here yet — void / out of bounds.' },
    { k: 'floor', g: 'F', name: 'Floor',      hue: 'var(--p-C)',    note: 'Walkable space. The room the player moves through.' },
    { k: 'wall',  g: '#', name: 'Wall',       hue: 'var(--ink-2)',  note: 'Blocks movement and sightlines. Shapes the path.' },
    { k: 'start', g: 'S', name: 'Start',      hue: 'var(--ok)',     note: 'Where the player spawns. Place exactly one.' },
    { k: 'goal',  g: 'G', name: 'Goal / Exit',hue: 'var(--accent)', note: 'The objective / level exit. Place exactly one.' },
    { k: 'enemy', g: 'E', name: 'Enemy',      hue: 'var(--bad)',    note: 'An encounter / threat. Pace these — not a wall of them.' },
    { k: 'cover', g: 'C', name: 'Cover',      hue: 'var(--p-D)',    note: 'Half-height cover — breaks sightlines, gives breathing room.' },
    { k: 'pickup',g: 'P', name: 'Pickup',     hue: 'var(--p-B)',    note: 'Health / ammo / collectible. Reward, or bait toward risk.' },
    { k: 'hazard',g: 'H', name: 'Hazard',     hue: 'var(--warn)',   note: 'Environmental damage — pit, spikes, fire. Tests reading the space.' },
    { k: 'door',  g: 'D', name: 'Door / Gate',hue: 'var(--p-E)',    note: 'A gate / transition. Often a key, switch or pacing pause.' },
    { k: 'check', g: 'K', name: 'Checkpoint', hue: 'var(--p-A)',    note: 'A respawn / save beat. Place before spikes in difficulty.' }
  ];
  var BY_KEY = {};
  TYPES.forEach(function (t) { BY_KEY[t.k] = t; });

  // grid sizes (cols x rows). 'medium' is the default per spec.
  var SIZES = {
    small:  { c: 12, r: 8,  label: 'Small 12×8' },
    medium: { c: 16, r: 12, label: 'Medium 16×12' },
    large:  { c: 24, r: 16, label: 'Large 24×16' }
  };

  function blankGrid(c, r) {
    var g = [];
    for (var y = 0; y < r; y++) {
      var row = [];
      for (var x = 0; x < c; x++) row.push('empty');
      g.push(row);
    }
    return g;
  }

  // Resize a grid, preserving the overlapping top-left region. Used when the
  // size switch changes so a half-drawn plan isn't lost.
  function resizeGrid(old, c, r) {
    var g = blankGrid(c, r);
    if (!old) return g;
    for (var y = 0; y < r; y++) {
      for (var x = 0; x < c; x++) {
        if (old[y] && old[y][x]) g[y][x] = old[y][x];
      }
    }
    return g;
  }

  // Count how many of each key exist — drives the live readout & sanity flags.
  function tally(grid) {
    var t = {};
    TYPES.forEach(function (ty) { t[ty.k] = 0; });
    grid.forEach(function (row) {
      row.forEach(function (k) { if (t[k] != null) t[k]++; });
    });
    return t;
  }

  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;

    // ---- restore state -----------------------------------------------------
    var saved = store.toolState('blockout') || {};
    var sizeKey = SIZES[saved.size] ? saved.size : (compact ? 'small' : 'medium');
    var size = SIZES[sizeKey];
    var brush = BY_KEY[saved.brush] ? saved.brush : 'floor';
    var notes = typeof saved.notes === 'string' ? saved.notes : '';

    var grid;
    if (saved.grid && Array.isArray(saved.grid) && saved.grid.length) {
      // re-fit whatever was saved to the current size (defensive against edits)
      grid = resizeGrid(saved.grid, size.c, size.r);
    } else {
      grid = blankGrid(size.c, size.r);
    }

    function persist() {
      store.setToolState('blockout', { size: sizeKey, brush: brush, notes: notes, grid: grid });
    }

    // ---- build DOM ---------------------------------------------------------
    container.innerHTML = '';
    var html = '';

    if (!compact) {
      html += '<div class="callout prereq" role="note" style="margin:0 0 14px">'
        + '<span class="ct">This is a plan, not a level</span>'
        + 'A blockout (greybox) is the level <b>before any art</b> — rough shapes that prove the space is fun to move through. '
        + 'Rough it here on paper, walk the critical path with your eyes, then build it for real in the engine. '
        + '<b>Keep it small:</b> one tight, well-paced room beats a sprawling map you never finish — over-scoping is the #1 reason student levels die.</div>';
    }

    // controls: brush palette, size switch, eraser, clear
    html += '<div class="tool-controls" style="align-items:flex-start">';

    // palette
    html += '<div class="ctrl" style="min-width:240px;flex:1 1 280px">'
      + '<label id="bo-brush-lbl">Brush <span class="val" id="bo-brush-val"></span></label>'
      + '<div class="chip-row" role="radiogroup" aria-labelledby="bo-brush-lbl" id="bo-palette">';
    TYPES.forEach(function (t) {
      html += paletteChip(t);
    });
    html += '</div></div>';

    // size + actions
    html += '<div class="ctrl" style="min-width:150px">'
      + '<label>Grid size</label>'
      + '<div class="seg" role="group" aria-label="Grid size" id="bo-size">';
    Object.keys(SIZES).forEach(function (key) {
      var on = key === sizeKey;
      html += '<button type="button" data-size="' + key + '" class="' + (on ? 'on' : '') + '" aria-pressed="'
        + (on ? 'true' : 'false') + '">' + ui.esc(SIZES[key].label) + '</button>';
    });
    html += '</div></div>';

    html += '<div class="ctrl" style="min-width:130px">'
      + '<label>Actions</label>'
      + '<div class="chip-row">'
      + '<button type="button" class="btn sm" id="bo-erase" aria-pressed="false" title="Paint Empty">' + ui.icon('reset') + 'Eraser</button>'
      + '<button type="button" class="btn sm ghost" id="bo-clear" title="Clear the whole grid">Clear</button>'
      + '</div></div>';

    html += '</div>'; // /tool-controls

    // the grid stage
    html += '<div class="tool-stage" style="overflow:auto">'
      + '<div id="bo-grid" role="grid" aria-label="Level blockout grid, ' + size.c + ' columns by ' + size.r + ' rows" '
      + 'style="display:grid;gap:2px;width:max-content;margin:0 auto;'
      + 'grid-template-columns:repeat(' + size.c + ',' + (compact ? 20 : 26) + 'px);user-select:none;touch-action:none"></div>'
      + '<p class="dim mono" style="font-size:.7rem;text-align:center;margin:8px 0 0">'
      + 'Click a cell to paint · click-drag to paint many · pick a brush above · letters always show so it reads with colour off</p>'
      + '</div>';

    // live readout / sanity flags
    html += '<div class="chip-row" id="bo-readout" style="margin-top:12px" aria-live="polite"></div>';

    // pacing notes
    html += '<div class="ctrl" style="min-width:100%;margin-top:12px">'
      + '<label for="bo-notes">Pacing, flow &amp; sightline notes</label>'
      + '<textarea class="field" id="bo-notes" rows="' + (compact ? 3 : 4) + '" '
      + 'placeholder="Walk the critical path S → G with your eyes. Where does the player rest, then tense up? What can they see ahead (sightlines)? Where is the difficulty spike — is there a checkpoint before it? What is this room teaching?"></textarea></div>';

    // legend
    html += '<div class="legend" id="bo-legend" aria-label="Cell-type legend"></div>';

    container.innerHTML = html;

    // ---- element refs ------------------------------------------------------
    var gridEl   = container.querySelector('#bo-grid');
    var paletteEl= container.querySelector('#bo-palette');
    var brushVal = container.querySelector('#bo-brush-val');
    var sizeEl   = container.querySelector('#bo-size');
    var eraseBtn = container.querySelector('#bo-erase');
    var clearBtn = container.querySelector('#bo-clear');
    var readoutEl= container.querySelector('#bo-readout');
    var notesEl  = container.querySelector('#bo-notes');
    var legendEl = container.querySelector('#bo-legend');

    notesEl.value = notes;

    // ---- legend (always letter + name, colour is secondary) ----------------
    (function renderLegend() {
      legendEl.innerHTML = TYPES.map(function (t) {
        return '<span class="lk" title="' + ui.esc(t.note) + '">'
          + '<span class="sw" style="background:' + t.hue + ';display:inline-grid;place-items:center;'
          + 'font-family:var(--mono);font-weight:800;font-size:9px;color:var(--accent-on);width:16px;height:16px">'
          + ui.esc(t.g) + '</span>'
          + '<b style="font-family:var(--mono);font-size:.74rem">' + ui.esc(t.g) + '</b> ' + ui.esc(t.name) + '</span>';
      }).join('');
    })();

    // ---- brush selection ---------------------------------------------------
    function setBrush(k) {
      brush = k;
      var t = BY_KEY[k];
      brushVal.textContent = t.g + ' ' + t.name;
      Array.prototype.forEach.call(paletteEl.querySelectorAll('[data-brush]'), function (b) {
        var on = b.getAttribute('data-brush') === k;
        b.classList.toggle('on', on);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      // eraser button reflects whether the brush is currently Empty
      var erasing = k === 'empty';
      eraseBtn.classList.toggle('on', erasing);
      eraseBtn.setAttribute('aria-pressed', erasing ? 'true' : 'false');
      persist();
    }

    // ---- cell rendering ----------------------------------------------------
    // We render once, then mutate individual cell buttons on paint (fast, no
    // full re-render). Each cell is a real <button> so it is keyboard reachable.
    function styleCell(btn, k) {
      var t = BY_KEY[k] || BY_KEY.empty;
      btn.setAttribute('data-k', k);
      btn.textContent = t.g;
      btn.setAttribute('aria-label', 'Row ' + (Number(btn.getAttribute('data-y')) + 1)
        + ' column ' + (Number(btn.getAttribute('data-x')) + 1) + ': ' + t.name);
      if (k === 'empty') {
        btn.style.background = 'var(--panel)';
        btn.style.color = 'var(--ink-3)';
        btn.style.borderColor = 'var(--line-soft)';
      } else {
        btn.style.background = 'color-mix(in srgb,' + t.hue + ' 26%, var(--panel))';
        btn.style.color = 'var(--ink)';
        btn.style.borderColor = 'color-mix(in srgb,' + t.hue + ' 60%, var(--line))';
      }
    }

    var cellSize = compact ? 20 : 26;
    (function buildCells() {
      var frag = document.createDocumentFragment();
      for (var y = 0; y < size.r; y++) {
        for (var x = 0; x < size.c; x++) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'bo-cell';
          btn.setAttribute('role', 'gridcell');
          btn.setAttribute('data-x', x);
          btn.setAttribute('data-y', y);
          btn.style.cssText = 'width:' + cellSize + 'px;height:' + cellSize + 'px;padding:0;border:1px solid var(--line-soft);'
            + 'border-radius:3px;font-family:var(--mono);font-weight:800;font-size:'
            + (compact ? 10 : 12) + 'px;line-height:1;display:grid;place-items:center';
          styleCell(btn, grid[y][x]);
          frag.appendChild(btn);
        }
      }
      gridEl.appendChild(frag);
    })();

    function cellAt(x, y) {
      return gridEl.querySelector('.bo-cell[data-x="' + x + '"][data-y="' + y + '"]');
    }

    // paint one cell (model + view), keeping Start/Goal singular.
    function paintCell(x, y) {
      if (x < 0 || y < 0 || x >= size.c || y >= size.r) return;
      if (grid[y][x] === brush) return; // no-op, avoid churn while dragging
      // Start and Goal are singular — painting a new one clears the old.
      if (brush === 'start' || brush === 'goal') {
        for (var yy = 0; yy < size.r; yy++) {
          for (var xx = 0; xx < size.c; xx++) {
            if (grid[yy][xx] === brush) {
              grid[yy][xx] = 'empty';
              styleCell(cellAt(xx, yy), 'empty');
            }
          }
        }
      }
      grid[y][x] = brush;
      styleCell(cellAt(x, y), brush);
    }

    // ---- live readout + scope/sanity flags ---------------------------------
    function renderReadout() {
      var t = tally(grid);
      var chips = '';
      // a couple of always-on counters
      chips += '<span class="readout"><b>' + t.floor + '</b> floor</span>';
      chips += '<span class="readout"><b>' + (t.enemy) + '</b> enemy · <b>' + t.pickup + '</b> pickup · <b>' + t.hazard + '</b> hazard</span>';

      // sanity flags — each carries a letter/word, never colour alone
      if (t.start === 0)      chips += flag('bad', 'No Start (S) — where does the player spawn?');
      else if (t.start > 1)   chips += flag('warn', t.start + ' Starts (S) — keep exactly one');
      else                    chips += flag('ok', 'Start (S) placed');

      if (t.goal === 0)       chips += flag('bad', 'No Goal (G) — what is the player heading toward?');
      else if (t.goal > 1)    chips += flag('warn', t.goal + ' Goals (G) — keep exactly one');
      else                    chips += flag('ok', 'Goal (G) placed');

      if (t.floor === 0)      chips += flag('warn', 'No Floor (F) yet — block out the walkable space first');

      // scope nudge — big plans on a student timeline are the danger
      var painted = 0; TYPES.forEach(function (ty) { if (ty.k !== 'empty') painted += t[ty.k]; });
      var cap = size.c * size.r;
      if (painted > cap * 0.62) chips += flag('warn', 'Dense map — is every cell earning its place? Cut before you build.');

      if (t.enemy >= 6 && t.check === 0)
        chips += flag('warn', t.enemy + ' enemies, no Checkpoint (K) — add a respawn beat before the hard part');

      readoutEl.innerHTML = chips;
    }

    // ---- pointer paint (mousedown / mouseover / mouseup) -------------------
    var painting = false;

    function targetCell(e) {
      var el = e.target;
      if (el && el.classList && el.classList.contains('bo-cell')) return el;
      return null;
    }

    function onDown(e) {
      var c = targetCell(e);
      if (!c) return;
      e.preventDefault();
      painting = true;
      paintCell(Number(c.getAttribute('data-x')), Number(c.getAttribute('data-y')));
    }
    function onOver(e) {
      if (!painting) return;
      var c = targetCell(e);
      if (!c) return;
      paintCell(Number(c.getAttribute('data-x')), Number(c.getAttribute('data-y')));
    }
    function onUp() {
      if (!painting) return;
      painting = false;
      renderReadout();
      persist();
    }
    // keyboard / single-click activation (covers Enter/Space and plain clicks
    // that didn't trigger a drag, e.g. accessibility tooling)
    function onClick(e) {
      var c = targetCell(e);
      if (!c) return;
      // mousedown already painted on pointer; this catches keyboard activation.
      // Re-applying the same brush is a no-op inside paintCell, so it's safe.
      paintCell(Number(c.getAttribute('data-x')), Number(c.getAttribute('data-y')));
      renderReadout();
      persist();
    }

    gridEl.addEventListener('mousedown', onDown);
    gridEl.addEventListener('mouseover', onOver);
    gridEl.addEventListener('click', onClick);
    // mouseup can land outside the grid mid-drag — listen on the document.
    document.addEventListener('mouseup', onUp);
    // dragging out of the window then releasing shouldn't leave us stuck on.
    window.addEventListener('blur', onUp);

    // ---- palette / size / action wiring ------------------------------------
    function onPaletteClick(e) {
      var b = e.target.closest && e.target.closest('[data-brush]');
      if (!b || !paletteEl.contains(b)) return;
      setBrush(b.getAttribute('data-brush'));
    }
    paletteEl.addEventListener('click', onPaletteClick);

    function onEraseClick() { setBrush('empty'); }
    eraseBtn.addEventListener('click', onEraseClick);

    function onClearClick() {
      grid = blankGrid(size.c, size.r);
      Array.prototype.forEach.call(gridEl.querySelectorAll('.bo-cell'), function (b) {
        styleCell(b, 'empty');
      });
      renderReadout();
      persist();
      ui.toast('Grid cleared');
    }
    clearBtn.addEventListener('click', onClearClick);

    function onSizeClick(e) {
      var b = e.target.closest && e.target.closest('[data-size]');
      if (!b || !sizeEl.contains(b)) return;
      var key = b.getAttribute('data-size');
      if (key === sizeKey) return;
      sizeKey = key;
      size = SIZES[key];
      grid = resizeGrid(grid, size.c, size.r);
      // rebuild the grid DOM for the new dimensions
      gridEl.innerHTML = '';
      gridEl.style.gridTemplateColumns = 'repeat(' + size.c + ',' + cellSize + 'px)';
      gridEl.setAttribute('aria-label', 'Level blockout grid, ' + size.c + ' columns by ' + size.r + ' rows');
      var frag = document.createDocumentFragment();
      for (var y = 0; y < size.r; y++) {
        for (var x = 0; x < size.c; x++) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'bo-cell';
          btn.setAttribute('role', 'gridcell');
          btn.setAttribute('data-x', x);
          btn.setAttribute('data-y', y);
          btn.style.cssText = 'width:' + cellSize + 'px;height:' + cellSize + 'px;padding:0;border:1px solid var(--line-soft);'
            + 'border-radius:3px;font-family:var(--mono);font-weight:800;font-size:'
            + (compact ? 10 : 12) + 'px;line-height:1;display:grid;place-items:center';
          styleCell(btn, grid[y][x]);
          frag.appendChild(btn);
        }
      }
      gridEl.appendChild(frag);
      Array.prototype.forEach.call(sizeEl.querySelectorAll('[data-size]'), function (sb) {
        var on = sb.getAttribute('data-size') === key;
        sb.classList.toggle('on', on);
        sb.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      renderReadout();
      persist();
    }
    sizeEl.addEventListener('click', onSizeClick);

    function onNotesInput() { notes = notesEl.value; persist(); }
    notesEl.addEventListener('input', onNotesInput);

    // ---- first paint -------------------------------------------------------
    setBrush(brush);
    renderReadout();

    // ---- dispose: remove every listener we attached ------------------------
    return function dispose() {
      gridEl.removeEventListener('mousedown', onDown);
      gridEl.removeEventListener('mouseover', onOver);
      gridEl.removeEventListener('click', onClick);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onUp);
      paletteEl.removeEventListener('click', onPaletteClick);
      eraseBtn.removeEventListener('click', onEraseClick);
      clearBtn.removeEventListener('click', onClearClick);
      sizeEl.removeEventListener('click', onSizeClick);
      notesEl.removeEventListener('input', onNotesInput);
    };
  }

  // A palette chip is a real button carrying its glyph + name (colour secondary).
  function paletteChip(t) {
    return '<button type="button" class="cat-chip" data-brush="' + t.k + '" role="radio" aria-checked="false" '
      + 'title="' + ui.esc(t.note) + '" '
      + 'style="display:inline-flex;align-items:center;gap:6px">'
      + '<span aria-hidden="true" style="display:inline-grid;place-items:center;width:18px;height:18px;border-radius:4px;'
      + 'font-family:var(--mono);font-weight:800;font-size:11px;color:var(--accent-on);background:' + t.hue + '">'
      + ui.esc(t.g) + '</span>'
      + '<span><b style="font-family:var(--mono)">' + ui.esc(t.g) + '</b> ' + ui.esc(t.name) + '</span></button>';
  }

  function flag(kind, msg) {
    var glyph = kind === 'ok' ? '✓' : (kind === 'bad' ? '✕' : '!');
    return '<span class="flag ' + kind + '"><span class="fi" aria-hidden="true">' + glyph + '</span>' + ui.esc(msg) + '</span>';
  }

  GDA.tools.register({
    id: 'blockout',
    icon: 'map',
    title: 'Level Blockout Planner',
    blurb: 'Paint a top-down greybox of your level: floors, walls, the Start→Goal critical path, enemies, cover, pickups, hazards, doors and checkpoints. A PLAN tool — not a level editor — for practising blockout, pacing and sightline thinking before any art exists. Every cell shows its letter, so it reads with colour off.',
    category: 'Levels',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
