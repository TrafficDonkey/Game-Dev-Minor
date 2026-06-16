/* =============================================================================
 * Game Dev Academy — Tool: GDD Builder.
 * A structured drafting wizard for the minor's central deliverable, the Game
 * Design Document. Ten labelled sections (each a guided <textarea class="field">),
 * a complexity-vs-feasibility self-check that scores red-flag scope decisions, and
 * Export-as-Markdown / Copy-to-clipboard buttons. Every field persists live to the
 * store and restores on mount. Colour is always paired with a TEXT verdict — never
 * hue alone. Pure DOM, offline; no fetch, no libraries.
 *
 * Honest note: the exact GDD template varies by course/lecturer. This is a strong,
 * common skeleton — adapt the headings to your brief.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;

  var TOOL_ID = 'gdd';

  // The ten sections. `key` is the persisted field id; `compact` flags the ones
  // that also render in embedded/compact mode. `rows` tunes the textarea height.
  var SECTIONS = [
    { key: 'title', n: 1, label: 'Game title & one-line pitch', rows: 3, compact: true,
      hint: 'Working title, then ONE sentence a stranger could repeat. "A co-op cooking game where two chefs fight a haunted kitchen." If you can\'t say it in a sentence, the idea isn\'t sharp yet.' },
    { key: 'pillars', n: 2, label: 'Three design pillars', rows: 4, compact: true,
      hint: 'The 3 words/phrases every decision is measured against. e.g. "Tense, Readable, Fair." When two ideas conflict, the pillars decide. Keep it to three — more than three means none of them lead.' },
    { key: 'loop', n: 3, label: 'Core loop', rows: 4, compact: true,
      hint: 'The 15–60 second cycle the player repeats. e.g. "Scout → engage → loot → upgrade → repeat." If the loop isn\'t fun on paper, no amount of art saves it. This is the heart of the GDD.' },
    { key: 'mechanics', n: 4, label: 'Key mechanics', rows: 5,
      hint: 'The verbs the player performs (move, shoot, build, talk, stack). Aim for ~2 deeply-developed core mechanics, not ten shallow ones. List each, then one line on how it feels and what it interacts with.' },
    { key: 'world', n: 5, label: 'World & story / tone', rows: 5,
      hint: 'Setting, mood, the fiction that frames the mechanics. Who is the player, where, why? Tone in 2–3 adjectives. Story should justify the mechanics, not fight them. Environmental storytelling > cutscenes for a small team.' },
    { key: 'audience', n: 6, label: 'Target player & platform', rows: 4,
      hint: 'Who is this for, and where does it run? "PC, keyboard+mouse, players who like puzzle-platformers." Be concrete — "everyone" is not an audience. Platform shapes controls, scope and what\'s even possible.' },
    { key: 'scope', n: 7, label: 'Scope — what\'s IN / what\'s OUT', rows: 6,
      hint: 'TWO lists. IN: the must-have features for a playable vertical slice. OUT: tempting features you are deliberately cutting (and why). The OUT list is the most valuable part of any student GDD — protect it.' },
    { key: 'features', n: 8, label: 'Feature list', rows: 6,
      hint: 'Concrete features that deliver the IN-scope vision. Mark each Must / Should / Could (MoSCoW). Order by priority so that if time runs out, the bottom of the list is what gets cut — not the core loop.' },
    { key: 'art', n: 9, label: 'Art & audio direction', rows: 5,
      hint: 'Visual style (low-poly? pixel? flat?), palette, references, and the audio mood. Pick a style your team can actually produce — a consistent simple look beats an inconsistent ambitious one. Note tools (Blender, etc.).' },
    { key: 'risks', n: 10, label: 'Risks & unknowns', rows: 5,
      hint: 'What could sink this? "Never built networking", "art pipeline untested", "fun is unproven." Naming risks early is maturity, not weakness — the GDD is graded partly on whether you saw them coming.' }
  ];

  // Six scope red-flags. Each `true` answer adds `w` weight toward over-scoping.
  // `why` is the honest one-liner shown when the flag is raised.
  var FLAGS = [
    { key: 'online', w: 3, q: 'Online multiplayer / networking?',
      why: 'Netcode is its own specialism — it can eat a whole semester before the game is even fun. Prototype single-player first.' },
    { key: 'openworld', w: 3, q: 'Open world / large explorable map?',
      why: 'Open worlds need content density a small team can\'t fill. A tight handful of rooms beats an empty continent.' },
    { key: 'engine', w: 3, q: 'Custom engine (not Unity/Godot/Unreal)?',
      why: 'Writing an engine is a different project from writing a game. Use an existing one unless the assignment is the engine.' },
    { key: 'procgen', w: 2, q: 'Procedural generation?',
      why: 'Good procgen is hard to make fun and hard to debug. Hand-author your first levels; add generation later if it earns its place.' },
    { key: 'voice', w: 2, q: 'Voiced dialogue / lots of cutscenes?',
      why: 'Voice + cinematics balloon production cost for little play value. Text and environmental storytelling go far on a budget.' },
    { key: 'mechanics', w: 2, q: 'More than ~2 core mechanics?',
      why: 'Two mechanics done deeply out-fun five done shallowly. Extra systems multiply bugs, balancing and art needs.' },
    { key: 'levels', w: 2, q: 'Many levels / hours of content?',
      why: 'Each level is real work to build, test and polish. Ship one excellent vertical slice, not twenty thin ones.' }
  ];

  function blankState() {
    var s = { fields: {}, flags: {} };
    SECTIONS.forEach(function (sec) { s.fields[sec.key] = ''; });
    FLAGS.forEach(function (f) { s.flags[f.key] = false; });
    return s;
  }

  function loadState() {
    var saved = store.toolState(TOOL_ID) || {};
    var s = blankState();
    if (saved.fields) SECTIONS.forEach(function (sec) {
      if (typeof saved.fields[sec.key] === 'string') s.fields[sec.key] = saved.fields[sec.key];
    });
    if (saved.flags) FLAGS.forEach(function (f) {
      if (typeof saved.flags[f.key] === 'boolean') s.flags[f.key] = saved.flags[f.key];
    });
    return s;
  }

  // Verdict from the summed weight of raised flags. Each tier carries a TEXT
  // label and a reason — colour (via .flag class) is only a reinforcement.
  function verdict(state) {
    var score = 0;
    FLAGS.forEach(function (f) { if (state.flags[f.key]) score += f.w; });
    var tier, label, cls, reason;
    if (score <= 2) {
      tier = 'feasible'; cls = 'ok'; label = 'Looks feasible';
      reason = 'Looks feasible for an ~8-person semester. Keep this discipline — protect the scope as features tempt you.';
    } else if (score <= 5) {
      tier = 'watch'; cls = 'warn'; label = 'Watch your scope';
      reason = 'Watch your scope — this is ambitious. Cut one risky pillar or push it to a stretch goal before you commit.';
    } else {
      tier = 'over'; cls = 'bad'; label = 'Likely over-scoped';
      reason = 'Likely over-scoped — cut before you start. Pick ONE of the red flags to keep and drop the rest, or this won\'t ship.';
    }
    return { score: score, tier: tier, label: label, cls: cls, reason: reason };
  }

  // Assemble a Markdown document from the current fields. Empty sections still
  // appear (as a prompt placeholder) so the export doubles as a template.
  function toMarkdown(state) {
    var L = [];
    var titleField = (state.fields.title || '').trim();
    var docTitle = titleField ? titleField.split('\n')[0].trim() : 'Untitled Game';
    L.push('# Game Design Document — ' + docTitle);
    L.push('');
    L.push('_Drafted with the Game Dev Academy GDD Builder. The exact template varies by course — adapt headings to your brief._');
    L.push('');
    SECTIONS.forEach(function (sec) {
      L.push('## ' + sec.n + '. ' + sec.label);
      var v = (state.fields[sec.key] || '').trim();
      if (v) { L.push(''); L.push(v); }
      else { L.push(''); L.push('_(not written yet — ' + sec.hint.split('.')[0].toLowerCase() + ')_'); }
      L.push('');
    });

    // The feasibility self-check, written out as a checklist + verdict.
    var vd = verdict(state);
    L.push('## Complexity vs feasibility self-check');
    L.push('');
    FLAGS.forEach(function (f) {
      var on = !!state.flags[f.key];
      L.push('- [' + (on ? 'x' : ' ') + '] ' + f.q + (on ? '  — RISK: ' + f.why : ''));
    });
    L.push('');
    L.push('**Verdict (score ' + vd.score + '): ' + vd.label + '.** ' + vd.reason);
    L.push('');
    L.push('> Over-scoping is the #1 reason student games fail. The GDD is graded on complexity *vs feasibility* — an ambitious idea you can\'t finish scores worse than a small idea done well.');
    L.push('');
    return L.join('\n');
  }

  function download(filename, text) {
    try {
      var blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      return true;
    } catch (e) { return false; }
  }

  function copyText(text) {
    // Prefer the async clipboard API; fall back to a hidden textarea for file://.
    if (global.navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }
  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;
    var state = loadState();
    var timers = [];          // setTimeout ids we must clear on dispose
    var disposed = false;
    var saveTimer = null;

    function persist() {
      // Debounced live save of every field + flag.
      if (saveTimer) { clearTimeout(saveTimer); }
      saveTimer = setTimeout(function () {
        if (disposed) return;
        store.setToolState(TOOL_ID, { fields: state.fields, flags: state.flags });
      }, 300);
      timers.push(saveTimer);
    }

    var secs = compact ? SECTIONS.filter(function (s) { return s.compact; }) : SECTIONS;

    container.innerHTML = '';
    var html = '';

    if (!compact) {
      html += '<div class="callout prereq" role="note" style="margin:0 0 16px">'
        + '<span class="ct">The minor\'s central deliverable</span>'
        + 'A GDD is a <b>living plan</b>, not an essay — short, scannable, and honest about scope. '
        + 'Fill what you can; every field saves on this device as you type. '
        + 'The exact template <b>varies by course</b>, so treat these ten sections as a strong common skeleton and rename to match your brief.</div>';
    } else {
      html += '<p class="dim" style="margin:0 0 12px;font-size:.9rem">Pitch, pillars and core loop — the spine of your GDD. '
        + 'Open the full <a class="xref" href="#/tools/gdd">GDD Builder ›</a> for all ten sections and export.</p>';
    }

    // Section fields.
    html += '<div class="gdd-fields" style="display:flex;flex-direction:column;gap:14px">';
    secs.forEach(function (sec) {
      var fid = 'gdd-f-' + sec.key;
      html += '<div class="ctrl" style="min-width:0;width:100%">'
        + '<label for="' + fid + '" style="justify-content:flex-start;gap:8px">'
        + '<span class="mono" style="color:var(--accent)">' + sec.n + '</span>'
        + '<span style="color:var(--ink);font-family:var(--display);font-weight:700;font-size:.92rem">' + ui.esc(sec.label) + '</span></label>'
        + '<div class="dim" style="font-size:.8rem;margin:-1px 0 3px;line-height:1.45">' + ui.esc(sec.hint) + '</div>'
        + '<textarea class="field" id="' + fid + '" data-key="' + sec.key + '" rows="' + sec.rows + '" '
        + 'placeholder="' + ui.esc(sec.hint) + '" spellcheck="true"></textarea>'
        + '</div>';
    });
    html += '</div>';

    // Feasibility self-check panel (always shown, including compact mode).
    html += '<div class="panel" id="gdd-feas" style="margin-top:16px;border-color:color-mix(in srgb,var(--accent) 26%,var(--line))">'
      + '<h4 style="display:flex;align-items:center;gap:8px;margin:0 0 4px">' + ui.icon('target')
      + '<span>Complexity vs feasibility self-check</span></h4>'
      + '<p class="dim" style="font-size:.85rem;margin:0 0 12px">Tick every red flag your game includes. Over-scoping is the #1 reason student games never ship — the GDD is graded on complexity <b>vs feasibility</b>, so an honest cut here is worth more marks than ambition.</p>'
      + '<div class="gdd-flags" style="display:flex;flex-direction:column;gap:7px">';
    FLAGS.forEach(function (f) {
      var fid = 'gdd-flag-' + f.key;
      html += '<button type="button" class="gdd-flag" id="' + fid + '" data-key="' + f.key + '" aria-pressed="false" '
        + 'style="display:flex;align-items:flex-start;gap:10px;text-align:left;width:100%;padding:9px 11px;border:1px solid var(--line);'
        + 'border-radius:9px;background:var(--panel-2)">'
        + '<span class="gdd-box" aria-hidden="true" style="flex:0 0 auto;width:20px;height:20px;border:1.5px solid var(--line);'
        + 'border-radius:6px;display:grid;place-items:center;margin-top:1px;font-weight:800;font-size:13px;color:var(--bad)"></span>'
        + '<span style="min-width:0"><span style="font-weight:650;display:block">' + ui.esc(f.q)
        + ' <span class="mono dim" style="font-size:.7rem">+' + f.w + '</span></span>'
        + '<span class="gdd-why dim" style="font-size:.8rem;display:none;line-height:1.45;margin-top:2px">' + ui.esc(f.why) + '</span></span>'
        + '</button>';
    });
    html += '</div>';
    // Verdict readout — text label is primary; the .flag colour reinforces it.
    html += '<div id="gdd-verdict" aria-live="polite" style="margin-top:13px;display:flex;flex-direction:column;gap:6px"></div>';
    html += '</div>';

    // Export / copy actions (full mode only — compact is a focused embed).
    if (!compact) {
      html += '<div class="tool-controls" style="margin:16px 0 0;align-items:center">'
        + '<button type="button" class="btn primary" id="gdd-export">' + ui.icon('download') + ' Export as Markdown</button>'
        + '<button type="button" class="btn" id="gdd-copy">' + ui.icon('book') + ' Copy to clipboard</button>'
        + '<button type="button" class="btn ghost" id="gdd-clear">' + ui.icon('reset') + ' Clear all fields</button>'
        + '<span class="readout" id="gdd-count" style="margin-left:auto"></span>'
        + '</div>'
        + '<p class="dim" style="font-size:.78rem;margin:10px 0 0">Export downloads <code>game-gdd.md</code> — a plain Markdown file you can open in any editor, paste into your course\'s template, or hand in. Your draft also stays saved on this device.</p>';
    }

    container.innerHTML = html;

    // ---- wire up fields ----
    var textareas = Array.prototype.slice.call(container.querySelectorAll('textarea[data-key]'));
    textareas.forEach(function (ta) {
      var key = ta.getAttribute('data-key');
      ta.value = state.fields[key] || '';
      ta.addEventListener('input', function () {
        state.fields[key] = ta.value;
        persist();
        updateCount();
      });
    });

    // ---- wire up flags ----
    var flagBtns = Array.prototype.slice.call(container.querySelectorAll('.gdd-flag'));
    flagBtns.forEach(function (btn) {
      var key = btn.getAttribute('data-key');
      btn.addEventListener('click', function () {
        state.flags[key] = !state.flags[key];
        persist();
        paintFlag(btn, state.flags[key]);
        paintVerdict();
      });
      paintFlag(btn, !!state.flags[key]);
    });

    function paintFlag(btn, on) {
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var box = btn.querySelector('.gdd-box');
      var why = btn.querySelector('.gdd-why');
      if (box) {
        box.textContent = on ? '!' : '';
        box.style.borderColor = on ? 'var(--bad)' : 'var(--line)';
        box.style.background = on ? 'color-mix(in srgb,var(--bad) 18%,transparent)' : 'transparent';
      }
      btn.style.borderColor = on ? 'color-mix(in srgb,var(--bad) 45%,var(--line))' : 'var(--line)';
      if (why) why.style.display = on ? 'block' : 'none';
    }

    var verdictEl = container.querySelector('#gdd-verdict');
    function paintVerdict() {
      if (!verdictEl) return;
      var v = verdict(state);
      var raised = FLAGS.filter(function (f) { return state.flags[f.key]; }).length;
      verdictEl.innerHTML =
        '<span class="flag ' + v.cls + '" style="font-size:.92rem;font-weight:700">'
        + '<span class="fi" aria-hidden="true">' + (v.tier === 'feasible' ? '✓' : v.tier === 'watch' ? '⚠' : '✕') + '</span>'
        + 'Verdict: ' + ui.esc(v.label) + '</span>'
        + '<span class="dim" style="font-size:.85rem;line-height:1.45">' + ui.esc(v.reason) + '</span>'
        + '<span class="mono dim" style="font-size:.72rem">' + raised + ' red flag' + (raised === 1 ? '' : 's') + ' raised · scope score ' + v.score + '</span>';
    }

    var countEl = container.querySelector('#gdd-count');
    function updateCount() {
      if (!countEl) return;
      var filled = SECTIONS.filter(function (s) { return (state.fields[s.key] || '').trim().length > 0; }).length;
      var words = SECTIONS.reduce(function (sum, s) {
        var t = (state.fields[s.key] || '').trim();
        return sum + (t ? t.split(/\s+/).length : 0);
      }, 0);
      countEl.innerHTML = '<b>' + filled + '</b> / ' + SECTIONS.length + ' sections · <b>' + words + '</b> words';
    }

    // ---- actions ----
    var exportBtn = container.querySelector('#gdd-export');
    if (exportBtn) exportBtn.addEventListener('click', function () {
      var md = toMarkdown(state);
      var ok = download('game-gdd.md', md);
      if (ui.toast) ui.toast(ok ? 'Exported game-gdd.md' : 'Could not export — copy instead');
    });

    var copyBtn = container.querySelector('#gdd-copy');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var md = toMarkdown(state);
      copyText(md).then(function (ok) {
        if (ui.toast) ui.toast(ok ? 'GDD copied to clipboard' : 'Copy failed — use Export instead');
      });
    });

    var clearBtn = container.querySelector('#gdd-clear');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      if (!global.confirm || global.confirm('Clear every GDD field and reset the self-check on this device? This cannot be undone.')) {
        state = blankState();
        textareas.forEach(function (ta) { ta.value = ''; });
        flagBtns.forEach(function (btn) { paintFlag(btn, false); });
        store.setToolState(TOOL_ID, { fields: state.fields, flags: state.flags });
        paintVerdict();
        updateCount();
        if (ui.toast) ui.toast('GDD cleared');
      }
    });

    paintVerdict();
    updateCount();

    return function dispose() {
      disposed = true;
      if (saveTimer) clearTimeout(saveTimer);
      timers.forEach(function (t) { clearTimeout(t); });
      timers = [];
    };
  }

  GDA.tools.register({
    id: TOOL_ID,
    icon: 'scroll',
    title: 'GDD Builder',
    blurb: 'Draft the minor\'s central deliverable — a structured Game Design Document. Ten guided sections (pitch, pillars, core loop, mechanics, scope, risks and more), a complexity-vs-feasibility self-check that scores your scope red flags, and one-click export to Markdown. Saves as you type. The exact template varies by course — adapt the headings to your brief.',
    category: 'Design',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
