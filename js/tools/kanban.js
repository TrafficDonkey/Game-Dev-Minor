/* =============================================================================
 * Game Dev Academy — Tool: Sprint / Kanban Board.
 * The rhythm the team will actually run: cards flow Backlog → To Do → In Progress
 * → Review → Done. Every card carries a TRACK tag (Story / Design / Level / 3D /
 * Code / Team) that sets both a coloured left border AND a readable text tag — so
 * the colour is never the only signal. Move cards by HTML5 drag-and-drop OR by the
 * ‹ / › buttons (keyboard- and touch-friendly). "In Progress" shows a WIP count and
 * warns IN TEXT past a small limit — the discipline of limiting work-in-progress.
 * Persists the whole board; pure DOM; offline.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;

  // The five columns of the flow, in order. Moving a card = stepping along this list.
  var COLS = [
    { id: 'backlog', name: 'Backlog' },
    { id: 'todo',    name: 'To Do' },
    { id: 'doing',   name: 'In Progress' },
    { id: 'review',  name: 'Review' },
    { id: 'done',    name: 'Done' }
  ];

  // Each track maps to a pillar hue + a single-letter tag. Colour is decorative;
  // the letter + word ALWAYS carry the meaning (colourblind-safe).
  var TRACKS = [
    { id: 'Story',  p: 'A', letter: 'S' },
    { id: 'Design', p: 'B', letter: 'D' },
    { id: 'Level',  p: 'C', letter: 'L' },
    { id: '3D',     p: 'D', letter: '3' },
    { id: 'Code',   p: 'E', letter: 'C' },
    { id: 'Team',   p: '0', letter: 'T' }
  ];

  var WIP_LIMIT = 3;               // a small, teachable cap on the "In Progress" column
  var SEED = [                      // only used when the board is empty on first mount
    { text: 'Write the one-page GDD: core loop + design pillars', track: 'Design', col: 'doing' },
    { text: 'Greybox the tutorial room (blockout only)',          track: 'Level',  col: 'todo' },
    { text: 'Modular wall kit — 4 pieces, game-ready',            track: '3D',     col: 'backlog' },
    { text: 'Player controller: move + jump',                     track: 'Code',   col: 'todo' },
    { text: 'Sprint retro notes',                                 track: 'Team',   col: 'backlog' }
  ];

  function track(id) { for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i]; return TRACKS[1]; }
  function colName(id) { for (var i = 0; i < COLS.length; i++) if (COLS[i].id === id) return COLS[i].name; return id; }
  function colIndex(id) { for (var i = 0; i < COLS.length; i++) if (COLS[i].id === id) return i; return 0; }
  function uid() { return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function mount(container, opts) {
    opts = opts || {};
    var compact = !!opts.compact;

    // --- state: restore the saved board, or seed an example board when empty ----
    var saved = store.toolState('kanban');
    var cards = (saved && Array.isArray(saved.cards)) ? saved.cards.slice() : null;
    if (!cards || !cards.length) {
      cards = SEED.map(function (s) { return { id: uid(), text: s.text, track: s.track, col: s.col }; });
    }
    // sanitise: drop cards with unknown columns/tracks so a stale save can't break render
    cards = cards.filter(function (c) {
      return c && typeof c.text === 'string'
        && colIndex(c.col) > -1 && COLS.some(function (x) { return x.id === c.col; })
        && TRACKS.some(function (t) { return t.id === c.track; });
    });

    var dragId = null;                        // id of the card currently being dragged
    var listeners = [];                       // tracked (el, type, fn) for clean disposal

    function on(el, type, fn) { el.addEventListener(type, fn); listeners.push([el, type, fn]); }
    function save() { store.setToolState('kanban', { cards: cards }); }
    function cardsIn(colId) { return cards.filter(function (c) { return c.col === colId; }); }

    container.innerHTML = '';

    // --- shell ------------------------------------------------------------------
    if (!compact) {
      container.insertAdjacentHTML('beforeend',
        '<div class="callout" role="note" style="margin:0 0 14px;border-color:var(--accent)">'
        + '<span class="ct">The sprint rhythm</span>'
        + 'A board makes the work visible. Cards flow left to right; the team pulls the next card only when there is room. '
        + 'The golden rule is <b>limit work-in-progress</b> — too many cards "In Progress" means everything is half-done and '
        + 'nothing ships. Tag every card with its track so anyone can see the balance of the sprint at a glance.</div>');
    }

    // add-card form (real form controls, keyboard-usable)
    var form = ui.h('form', { class: 'tool-controls', 'aria-label': 'Add a card to the board' });
    form.style.alignItems = 'flex-end';
    form.innerHTML =
      '<div class="ctrl" style="flex:1 1 220px;min-width:160px">'
      + '<label for="kb-text">New card</label>'
      + '<input id="kb-text" class="field" type="text" maxlength="120" autocomplete="off" '
      + 'placeholder="e.g. Build the pause menu" />'
      + '</div>'
      + '<div class="ctrl" style="min-width:130px">'
      + '<label for="kb-track">Track</label>'
      + '<select id="kb-track" class="field">'
      + TRACKS.map(function (t) {
          return '<option value="' + t.id + '">' + ui.esc(t.id) + ' (' + t.letter + ')</option>';
        }).join('')
      + '</select></div>'
      + '<button type="submit" class="btn primary sm">' + ui.icon('check') + ' Add card</button>';
    container.appendChild(form);

    var textInput = form.querySelector('#kb-text');
    var trackSelect = form.querySelector('#kb-track');
    trackSelect.value = 'Design';

    on(form, 'submit', function (e) {
      e.preventDefault();
      var t = (textInput.value || '').trim();
      if (!t) { textInput.focus(); ui.toast && ui.toast('Type a card title first'); return; }
      cards.push({ id: uid(), text: t, track: trackSelect.value, col: 'backlog' });
      textInput.value = '';
      save();
      render();
      textInput.focus();   // keep the cursor in the box for fast entry
    });

    // the board itself
    var board = ui.h('div', { class: 'kb-cols' });
    if (compact) board.style.gridTemplateColumns = 'repeat(auto-fit, minmax(118px, 1fr))';
    board.setAttribute('role', 'list');
    board.setAttribute('aria-label', 'Sprint board columns');
    container.appendChild(board);

    // a tiny live region announces moves for screen readers
    var live = ui.h('div', { class: 'sr-only', 'aria-live': 'polite' });
    container.appendChild(live);

    // --- render -----------------------------------------------------------------
    function render() {
      board.innerHTML = '';
      COLS.forEach(function (col) {
        var list = cardsIn(col.id);
        var colEl = ui.h('div', { class: 'kb-col', 'data-col': col.id, role: 'listitem' });

        // header: name + count. "In Progress" also gets the WIP status inline.
        var head = '<h5><span>' + ui.esc(col.name) + '</span>'
          + '<span class="mono" aria-label="' + list.length + ' cards">' + list.length + '</span></h5>';
        colEl.insertAdjacentHTML('beforeend', head);

        if (col.id === 'doing') {
          var over = list.length > WIP_LIMIT;
          var cls = over ? 'flag bad' : (list.length === WIP_LIMIT ? 'flag warn' : 'flag ok');
          var msg = over
            ? 'Over WIP limit (' + list.length + '/' + WIP_LIMIT + ') — finish something before starting more'
            : (list.length === WIP_LIMIT
                ? 'At WIP limit (' + list.length + '/' + WIP_LIMIT + ') — pull no new work yet'
                : 'WIP ' + list.length + '/' + WIP_LIMIT + ' — room to pull');
          var fi = over ? '!' : (list.length === WIP_LIMIT ? '=' : 'OK');
          colEl.insertAdjacentHTML('beforeend',
            '<div class="' + cls + '" style="width:100%;margin:0 0 6px;font-size:.72rem" role="status">'
            + '<span class="fi" aria-hidden="true">' + fi + '</span><span>' + ui.esc(msg) + '</span></div>');
        }

        if (!list.length) {
          colEl.insertAdjacentHTML('beforeend',
            '<p class="dim mono" style="font-size:.7rem;text-align:center;margin:10px 4px;opacity:.7">'
            + (col.id === 'done' ? 'shipped items land here' : 'drop a card here') + '</p>');
        }
        list.forEach(function (c) { colEl.appendChild(cardEl(c)); });

        // drag-and-drop wiring (mouse). Buttons cover keyboard/touch.
        on(colEl, 'dragover', function (e) {
          if (dragId == null) return;
          e.preventDefault();
          if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
          colEl.classList.add('drop');
        });
        on(colEl, 'dragleave', function (e) {
          // only clear when the pointer truly left the column, not on inner children
          if (!colEl.contains(e.relatedTarget)) colEl.classList.remove('drop');
        });
        on(colEl, 'drop', function (e) {
          e.preventDefault();
          colEl.classList.remove('drop');
          if (dragId == null) return;
          moveTo(dragId, col.id);
        });

        board.appendChild(colEl);
      });
    }

    function cardEl(c) {
      var tk = track(c.track);
      var idx = colIndex(c.col);
      var el = ui.h('div', {
        class: 'kb-card', 'data-id': c.id, draggable: 'true',
        'aria-label': c.text + ' — ' + c.track + ' track, in ' + colName(c.col)
      });
      el.style.borderLeftColor = 'var(--p-' + tk.p + ')';

      el.innerHTML =
        // track tag: coloured chip but always shows the word + letter (never hue alone)
        '<span class="badge" style="font-size:.6rem;padding:2px 7px;margin-bottom:5px;'
        + 'color:var(--p-' + tk.p + ');border-color:color-mix(in srgb,var(--p-' + tk.p + ') 45%,var(--line))">'
        + '<b>' + tk.letter + '</b> ' + ui.esc(c.track) + '</span>'
        + '<div style="margin:2px 0 7px;color:var(--ink);line-height:1.4">' + ui.esc(c.text) + '</div>'
        + '<div style="display:flex;align-items:center;gap:5px">'
        + '<button type="button" class="btn sm ghost kb-left" aria-label="Move left to '
        + (idx > 0 ? ui.esc(COLS[idx - 1].name) : 'nowhere') + '"' + (idx === 0 ? ' disabled' : '')
        + ' style="padding:2px 9px;line-height:1">‹</button>'
        + '<button type="button" class="btn sm ghost kb-right" aria-label="Move right to '
        + (idx < COLS.length - 1 ? ui.esc(COLS[idx + 1].name) : 'nowhere') + '"' + (idx === COLS.length - 1 ? ' disabled' : '')
        + ' style="padding:2px 9px;line-height:1">›</button>'
        + '<span class="dim mono" style="flex:1;font-size:.62rem;text-align:center">' + ui.esc(colName(c.col)) + '</span>'
        + '<button type="button" class="btn sm ghost kb-del" aria-label="Delete card: ' + ui.esc(c.text) + '"'
        + ' style="padding:2px 9px;line-height:1;color:var(--bad)">×</button>'
        + '</div>';

      // drag source
      on(el, 'dragstart', function (e) {
        dragId = c.id;
        el.style.opacity = '.45';
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          try { e.dataTransfer.setData('text/plain', c.id); } catch (err) { /* IE guard */ }
        }
      });
      on(el, 'dragend', function () { dragId = null; el.style.opacity = ''; clearDropHints(); });

      // step buttons (keyboard + touch path)
      on(el.querySelector('.kb-left'),  'click', function () { step(c.id, -1); });
      on(el.querySelector('.kb-right'), 'click', function () { step(c.id, 1); });
      on(el.querySelector('.kb-del'),   'click', function () { remove(c.id); });
      return el;
    }

    function clearDropHints() {
      Array.prototype.forEach.call(board.querySelectorAll('.kb-col.drop'), function (n) { n.classList.remove('drop'); });
    }

    // --- mutations --------------------------------------------------------------
    function find(id) { for (var i = 0; i < cards.length; i++) if (cards[i].id === id) return cards[i]; return null; }

    function step(id, dir) {
      var c = find(id); if (!c) return;
      var i = colIndex(c.col) + dir;
      if (i < 0 || i >= COLS.length) return;
      c.col = COLS[i].id;
      announce(c);
      save(); render(); focusCard(id);
    }
    function moveTo(id, colId) {
      var c = find(id); if (!c || c.col === colId) return;
      c.col = colId;
      announce(c);
      save(); render(); focusCard(id);
    }
    function remove(id) {
      var c = find(id);
      cards = cards.filter(function (x) { return x.id !== id; });
      if (c) live.textContent = 'Deleted "' + c.text + '".';
      save(); render();
    }
    function announce(c) {
      live.textContent = 'Moved "' + c.text + '" to ' + colName(c.col)
        + (c.col === 'doing' && cardsIn('doing').length > WIP_LIMIT ? '. Over the WIP limit.' : '') + '.';
    }
    function focusCard(id) {
      // after a re-render, return focus to the moved card so keyboard flow continues
      var node = board.querySelector('.kb-card[data-id="' + id + '"]');
      if (node) { var btn = node.querySelector('.kb-right:not([disabled]), .kb-left:not([disabled])'); if (btn) btn.focus(); }
    }

    render();

    // --- dispose: drop every tracked listener so nothing leaks on unmount -------
    return function dispose() {
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2]); });
      listeners = [];
      dragId = null;
    };
  }

  GDA.tools.register({
    id: 'kanban',
    icon: 'check',
    title: 'Sprint Board (Kanban)',
    blurb: 'A working Kanban board for your sprints: add cards tagged by track (Story / Design / Level / 3D / Code / Team), '
      + 'drag them — or use the ‹ / › buttons — across Backlog → To Do → In Progress → Review → Done, and watch the '
      + 'work-in-progress limit warn you when too much is half-finished. The visible, limit-WIP rhythm a small team lives by.',
    category: 'Foundations',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
