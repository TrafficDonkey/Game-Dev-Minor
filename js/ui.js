/* =============================================================================
 * Game Dev Academy — shared UI helpers (no dependencies, runs over file://)
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Inline markup shared by prose() and line():
  //   **bold**           -> <strong>
  //   *em*               -> <em>
  //   `code`             -> <code> (measurements, finishes, fixture names, file types)
  //   [[Ctrl+R]]         -> <kbd> keyboard shortcut (split on + into keys)
  //   [[a1-02]]          -> clickable lesson cross-reference
  //   ((term))           -> <span class="termref"> a design-vocabulary chip
  function inlineMarkup(escaped) {
    return escaped
      .replace(/\[\[([^\]]+)\]\]/g, function (_, k) {
        var t = k.trim();
        // a lesson-id cross-reference (a1-02, c0-09, 01-03, f1-03) becomes a clickable link;
        // anything else (S, Ctrl+R, Tab) is a keyboard chip. Pillar 0 ids start with a digit.
        if (/^[0a-f]\d-\d{1,2}$/.test(t)) {
          var L = (GDA.curric && GDA.curric.lesson) ? GDA.curric.lesson(t) : null;
          return '<a class="xref" href="#/lesson/' + t + '"' + (L ? ' title="' + esc(L.title) + '"' : '') + '>' + t + '</a>';
        }
        var keys = t.split('+').map(function (p) { return '<kbd>' + p.trim() + '</kbd>'; }).join('<span class="kplus">+</span>');
        return '<span class="kbd-combo">' + keys + '</span>';
      })
      .replace(/\(\(([^)]+)\)\)/g, '<span class="termref">$1</span>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  }

  // Known fenced-code language tags (a leading one is stripped from the block).
  var CODE_LANGS = { js: 1, javascript: 1, ts: 1, typescript: 1, cs: 1, csharp: 1, c: 1, cpp: 1,
    gdscript: 1, gd: 1, glsl: 1, hlsl: 1, shader: 1, python: 1, py: 1, text: 1, txt: 1, json: 1,
    bash: 1, sh: 1, shell: 1, pseudo: 1, pseudocode: 1, yaml: 1, ini: 1 };

  function renderBlocks(text) {
    return String(text).split(/\n\n+/).map(function (block) {
      if (!block.trim()) return '';
      var lines = block.split('\n');
      if (lines.every(function (l) { return /^\s*-\s+/.test(l); })) {
        return '<ul>' + lines.map(function (l) {
          return '<li>' + inlineMarkup(esc(l.replace(/^\s*-\s+/, ''))) + '</li>';
        }).join('') + '</ul>';
      }
      return '<p>' + inlineMarkup(esc(block)).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  // markdown-lite block prose: ``` fenced code blocks become <pre>; outside them,
  // paragraphs split on blank lines, inline markup, single \n -> <br>, and a run of
  // "- " lines becomes a <ul>. Code blocks render literally (escaped), no markup.
  function prose(text) {
    if (!text) return '';
    var segs = String(text).split('```');
    var out = '';
    for (var i = 0; i < segs.length; i++) {
      if (i % 2 === 1) { // inside a fence
        var body = segs[i].replace(/^\r?\n/, '');
        var first = (body.split('\n')[0] || '').trim().toLowerCase();
        if (CODE_LANGS[first] && body.indexOf('\n') >= 0) body = body.slice(body.indexOf('\n') + 1);
        body = body.replace(/\s+$/, '');
        out += '<pre class="code-pre">' + esc(body) + '</pre>';
      } else {
        out += renderBlocks(segs[i]);
      }
    }
    return out;
  }

  // A single step / list line (inline markup, no paragraph wrapping).
  function line(text) { return inlineMarkup(esc(text)); }

  function h(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    if (html != null) e.innerHTML = html;
    return e;
  }

  function frag(html) { var t = document.createElement('template'); t.innerHTML = html; return t.content; }

  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) { toastEl = h('div', { class: 'toast', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  function reduceMotion() {
    var p = GDA.store && GDA.store.state.prefs;
    if (p && p.reduceMotion) return true;
    return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Difficulty + mode badges (reused everywhere). No "track" concept in this course.
  function diffBadge(d) { return '<span class="badge diff d-' + esc(d) + '">' + esc(d) + '</span>'; }
  function modeBadge(m) {
    var label = m === 'handson' ? 'Hands-on' : 'Knowledge';
    return '<span class="badge mode m-' + esc(m) + '">' + label + '</span>';
  }

  // Stroke-based icon set — studio / sample-library flavoured.
  function icon(name) {
    var P = {
      home:     '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
      book:     '<path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M8 3v18"/>',
      sliders:  '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><circle cx="4" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="20" cy="14" r="2"/>',
      eye:      '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
      ruler:    '<path d="M3 17 17 3l4 4L7 21z"/><path d="M7 11l2 2M11 7l2 2M9 15l1.5 1.5"/>',
      palette:  '<path d="M12 3a9 9 0 1 0 0 18c1.7 0 2-1.4 1.2-2.3-.8-1 .1-2.2 1.3-2.2H17a4 4 0 0 0 4-4c0-5-4-7.5-9-7.5z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="11" r="1"/>',
      cube:     '<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
      briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
      star:     '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
      check:    '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
      flag:     '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
      grid:     '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
      compass:  '<circle cx="12" cy="12" r="9"/><path d="M16 8l-2.5 5.5L8 16l2.5-5.5z"/>',
      pencil:   '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
      layers:   '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
      search:   '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
      sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
      lamp:     '<path d="M9 2h6l3 8H6z"/><path d="M12 10v8M8 22h8"/>',
      menu:     '<path d="M3 6h18M3 12h18M3 18h18"/>',
      chev:     '<path d="M9 6l6 6-6 6"/>',
      code:     '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
      gamepad:  '<rect x="2" y="6" width="20" height="12" rx="5"/><path d="M6 11h4M8 9v4M15.5 11h.01M18 13h.01"/>',
      axis:     '<path d="M5 19V5M5 19h14M5 12h7M5 8h4"/><path d="M5 5l0-2M19 19l2 0"/>',
      git:      '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 8.2v7.6M8.2 6H14a3 3 0 0 1 3 3v.2"/>',
      cpu:      '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>',
      map:      '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
      play:     '<path d="M7 4v16l13-8z"/>',
      sword:    '<path d="M14.5 3.5 7 11l-2 5 5-2 7.5-7.5a1.4 1.4 0 0 0-3-3zM5 16l3 3M6.5 14.5l3 3"/>',
      puzzle:   '<path d="M10 4h4v2.5a1.6 1.6 0 1 0 3.2 0V4H20v3.2a1.6 1.6 0 1 0 0 3.2V14h-2.5a1.6 1.6 0 1 0 0 3.2H20V20H4v-6h2.5a1.6 1.6 0 1 0 0-3.2H4V4h6z"/>',
      scroll:   '<path d="M6 3h12a1 1 0 0 1 1 1v14a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V3zM6 3a2 2 0 0 0-2 2v2h2M9 8h7M9 12h7M9 16h4"/>',
      gradcap:  '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M22 10v5"/><path d="M6 12.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.5"/>',
      wrench:   '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.6-3.6a6 6 0 0 1-7.8 7.8l-6.6 6.6a2.1 2.1 0 0 1-3-3l6.6-6.6a6 6 0 0 1 7.8-7.8z"/>',
      target:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
      bolt:     '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
      reset:    '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
      download: '<path d="M12 3v12M7 11l5 5 5-5"/><path d="M5 21h14"/>',
      upload:   '<path d="M12 21V9M7 13l5-5 5 5"/><path d="M5 3h14"/>',
      info:     '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      dice:     '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.3"/><circle cx="16" cy="8" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="8" cy="16" r="1.3"/><circle cx="16" cy="16" r="1.3"/>',
      swatch:   '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
      sofa:     '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 11a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2z"/><path d="M5 19v2M19 19v2"/>',
      plan:     '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 9h6V3M15 21v-7h6M9 9v6h6"/>',
      frame:    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 16l5-5 4 4 3-3 6 6"/><circle cx="9" cy="9" r="1.5"/>',
      pencilruler: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>'
    };
    return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }

  GDA.ui = {
    esc: esc, prose: prose, line: line, inlineMarkup: inlineMarkup, h: h, frag: frag,
    toast: toast, icon: icon, reduceMotion: reduceMotion,
    diffBadge: diffBadge, modeBadge: modeBadge
  };
})(typeof window !== 'undefined' ? window : this);
