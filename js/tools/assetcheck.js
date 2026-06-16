/* =============================================================================
 * Game Dev Academy — Tool: Game-Ready 3D Checklist.
 * Teaches the real-time mindset: a pretty render is not a game asset. Grouped,
 * checkable criteria across the eight things that decide whether a mesh ships —
 * poly budget, topology, UVs, LODs, materials/PBR, scale & pivot, naming, and
 * export/import. Every item is a real <button> checkbox; an overall readout and
 * a per-category status carry a TEXT label (never colour alone) so it reads on
 * any monitor and for colourblind users. An "Asset role" segmented control
 * (Hero / Mid-ground / Background) shows honest poly-budget GUIDANCE — with the
 * loud caveat that real budgets depend on platform/engine, so always profile.
 * Checked items + role persist. Pure DOM, offline, no engine output faked.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;
  var ID = 'assetcheck';

  // Eight categories, each with 2–4 concrete, CORRECT game-art criteria.
  // `k` is a stable key (used for persistence — text can be reworded safely).
  var CATS = [
    { id: 'budget', name: 'Poly budget', icon: 'cube',
      items: [
        { k: 'silhouette', t: 'Silhouette reads at the **distance the asset is actually seen** — spend triangles on the outline, not flat interior faces.' },
        { k: 'noflatsub', t: 'No wasted geometry: flat surfaces aren’t subdivided, hidden/back faces are deleted.' },
        { k: 'tricount', t: 'Tri count fits the budget for its **role** (see the role control below), not an arbitrary round number.' }
      ] },
    { id: 'topo', name: 'Topology', icon: 'grid',
      items: [
        { k: 'quads', t: 'Mostly **quads**; triangulate intentionally on export, not by accident.' },
        { k: 'nongon', t: 'No **n-gons** (5+ sided faces) in deforming areas — they shade and skin unpredictably.' },
        { k: 'loops', t: 'Clean edge loops follow the form and support deformation at joints (elbows, knees, knuckles).' },
        { k: 'nopoles', t: 'No stray poles / loose verts / non-manifold edges that break normals or baking.' }
      ] },
    { id: 'uv', name: 'UVs', icon: 'frame',
      items: [
        { k: 'texel', t: '**UV texel density is consistent** across the set — props at the same scale share the same pixels-per-metre.' },
        { k: 'overlap', t: 'No unintended overlaps; seams are hidden and shells use the 0–1 space efficiently.' },
        { k: 'padding', t: 'Enough padding between shells so mips don’t bleed colour across islands.' }
      ] },
    { id: 'lod', name: 'LODs', icon: 'layers',
      items: [
        { k: 'chain', t: 'LOD chain (LOD0 → LOD1 → LOD2…) for anything the camera leaves behind; far meshes cost far less.' },
        { k: 'silpreserve', t: 'Each LOD preserves the **silhouette** — drop interior detail first, keep the outline.' },
        { k: 'pop', t: 'Switch distances tuned so transitions don’t visibly “pop”.' }
      ] },
    { id: 'mat', name: 'Materials / PBR', icon: 'swatch',
      items: [
        { k: 'normalbake', t: '**Normal map baked** from the high-poly; **tangent space matches the engine** (flip green if your engine expects it).' },
        { k: 'pbrset', t: 'Full PBR set authored — base colour, metallic, roughness, normal, AO — in linear/sRGB as each map requires.' },
        { k: 'matcount', t: 'Material/draw-call count kept low: atlas where you can, share materials across the kit.' },
        { k: 'values', t: 'Albedo and roughness sit in physically sane ranges — no pure black/white base colour.' }
      ] },
    { id: 'scale', name: 'Scale & pivot', icon: 'ruler',
      items: [
        { k: 'realscale', t: 'Modelled at **real-world scale** (a 1.8 m door is 1.8 m in-engine) so physics and lighting behave.' },
        { k: 'pivot', t: 'Sensible **pivot / origin** — a door hinges on its hinge, a wheel spins on its axle, a prop sits on the floor.' },
        { k: 'transforms', t: 'Transforms applied: scale is 1,1,1 and rotation is zeroed before export.' }
      ] },
    { id: 'name', name: 'Naming', icon: 'book',
      items: [
        { k: 'convention', t: '**Consistent mesh / material / texture naming** so the team and the engine can find everything.' },
        { k: 'suffix', t: 'Map suffixes are predictable (`_BC`, `_N`, `_RMA`…) so importers and shaders auto-wire them.' },
        { k: 'nospaces', t: 'No spaces or odd characters in asset names — engine- and version-control-safe.' }
      ] },
    { id: 'export', name: 'Export / import', icon: 'upload',
      items: [
        { k: 'cleanexport', t: '**Exports clean as FBX / glTF** — correct axes and units, no leftover modifiers or junk.' },
        { k: 'noerrors', t: '**Imports into the engine without errors or warnings** (missing UVs, flipped normals, ngon spam).' },
        { k: 'ingame', t: 'Looks right *in a test scene under game lighting*, not just in the modelling viewport.' }
      ] }
  ];

  // Per-role poly-budget guidance. Numbers are deliberately ranges and clearly
  // framed as ROUGH starting points — never absolutes. The honest note below
  // hammers that home.
  var ROLES = [
    { id: 'hero', name: 'Hero', letter: 'H',
      budget: '~20k–100k+ tris',
      blurb: 'The thing the camera lingers on — playable character, key weapon, a boss. Carries the closest scrutiny, so it earns the most triangles and the best textures. Still: detail that never faces the camera is wasted detail.' },
    { id: 'mid', name: 'Mid-ground', letter: 'M',
      budget: '~2k–15k tris',
      blurb: 'Props and set-dressing the player walks past — crates, furniture, barrels, smaller NPCs. Seen but not studied. Lean meshes, shared materials, and a couple of LODs go a long way here.' },
    { id: 'bg', name: 'Background', letter: 'B',
      budget: '~100–2k tris',
      blurb: 'Distant terrain, skyline buildings, far foliage. Read as silhouette and value, almost never up close. Aggressive LODs, atlased textures, and impostors/billboards keep the frame fast.' }
  ];

  function findRole(id) { for (var i = 0; i < ROLES.length; i++) if (ROLES[i].id === id) return ROLES[i]; return null; }

  function totalItems() {
    var n = 0; CATS.forEach(function (c) { n += c.items.length; }); return n;
  }

  // status label for a category given how many of its items are checked
  function catStatus(done, total) {
    if (done === 0)     return { word: 'Not started', cls: '',     fi: '○' };
    if (done < total)   return { word: 'In progress', cls: 'warn', fi: '◐' };
    return                     { word: 'Done',        cls: 'ok',   fi: '✓' };
  }

  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;

    // ---- restore state ----
    var saved = store.toolState(ID) || {};
    var checked = (saved && typeof saved.checked === 'object' && saved.checked) ? saved.checked : {};
    var role = findRole(saved.role) ? saved.role : 'hero';
    // prune any keys that no longer exist (so stale saves can't inflate counts)
    var valid = {};
    CATS.forEach(function (c) { c.items.forEach(function (it) { valid[c.id + '.' + it.k] = true; }); });
    Object.keys(checked).forEach(function (key) { if (!valid[key] || !checked[key]) delete checked[key]; });

    function save() { store.setToolState(ID, { checked: checked, role: role }); }
    function isOn(cid, k) { return !!checked[cid + '.' + k]; }
    function countDone(c) { var d = 0; c.items.forEach(function (it) { if (isOn(c.id, it.k)) d++; }); return d; }

    container.innerHTML = '';
    var html = '';

    // ---- intro / honesty framing (full mode only) ----
    if (!compact) {
      html += '<div class="callout deeper" role="note" style="margin:0 0 14px">'
        + '<span class="ct">The real-time mindset</span>'
        + 'A gorgeous render is not a game asset. A <b>game-ready</b> mesh has to run in real time, deform without breaking, '
        + 'bake clean, and drop into the engine at the right scale with the right name. Walk this list before you call a model done. '
        + 'This checklist is a teacher, not a validator — it can’t open your file; <b>you</b> tick the honest answers.</div>';
    }

    // ---- asset role control ----
    html += '<div class="tool-controls" style="margin-bottom:12px">'
      + '<div class="ctrl" style="min-width:0">'
      + '<label id="' + ID + '-role-lab">Asset role <span class="dim">— sets the poly-budget guidance</span></label>'
      + '<div class="seg" role="group" aria-labelledby="' + ID + '-role-lab">'
      + ROLES.map(function (r) {
          return '<button type="button" data-role="' + r.id + '" aria-pressed="' + (r.id === role) + '">'
            + '<span class="mono" aria-hidden="true" style="opacity:.7">' + r.letter + '</span> ' + ui.esc(r.name) + '</button>';
        }).join('')
      + '</div></div></div>';

    // role guidance panel
    html += '<div class="diagram-info" id="' + ID + '-role-info" aria-live="polite" style="min-height:0;margin-bottom:14px"></div>';

    // ---- overall progress readout ----
    html += '<div class="tool-stage" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px">'
      + '<div class="readout" id="' + ID + '-overall" style="font-size:.92rem"></div>'
      + '<div style="flex:1;min-width:120px;height:6px;background:var(--line);border-radius:99px;overflow:hidden">'
      + '<i id="' + ID + '-bar" style="display:block;height:100%;width:0;background:var(--accent);border-radius:99px"></i></div>'
      + '<button type="button" class="btn sm ghost" id="' + ID + '-reset">' + ui.icon('reset') + ' Reset</button>'
      + '</div>';

    // ---- the categories ----
    html += '<div id="' + ID + '-cats" style="display:grid;gap:' + (compact ? '8px' : '12px') + '">';
    CATS.forEach(function (c) {
      html += '<section class="panel" data-cat="' + c.id + '" style="padding:' + (compact ? '10px 12px' : '14px 16px') + '">'
        + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:8px">'
        + '<span style="color:var(--ink-2);display:inline-flex">' + ui.icon(c.icon) + '</span>'
        + '<h4 style="margin:0;font-size:' + (compact ? '.96rem' : '1.04rem') + '">' + ui.esc(c.name) + '</h4>'
        + '<span class="flag" data-status style="margin-left:auto"></span>'
        + '</div>'
        + '<ul style="list-style:none;padding:0;margin:0;display:grid;gap:6px">';
      c.items.forEach(function (it) {
        var on = isOn(c.id, it.k);
        html += '<li>'
          + '<button type="button" class="ac-item" data-cat="' + c.id + '" data-k="' + it.k + '" role="checkbox" '
          + 'aria-checked="' + on + '" '
          + 'style="display:flex;gap:10px;align-items:flex-start;width:100%;text-align:left;padding:4px 2px">'
          + '<span class="ac-box" aria-hidden="true" style="width:20px;height:20px;flex:0 0 auto;margin-top:1px;'
          + 'border:1.6px solid var(--line);border-radius:6px;display:grid;place-items:center;'
          + 'color:var(--accent-on);font-weight:800;font-size:12px;line-height:1">' + (on ? '✓' : '') + '</span>'
          + '<span class="ac-lab" style="min-width:0;font-size:' + (compact ? '.86rem' : '.92rem') + ';line-height:1.45">' + ui.line(it.t) + '</span>'
          + '</button></li>';
      });
      html += '</ul></section>';
    });
    html += '</div>';

    // ---- honest budget caveat ----
    html += '<div class="callout simplify" role="note" style="margin:14px 0 0;font-size:.86rem">'
      + '<span class="ct">Honest budgets</span>'
      + 'These triangle ranges are <b>rough teaching starting points</b>, not rules. A Switch indie, a mobile title and a PC AAA '
      + 'live in completely different budgets, and your engine, target frame-rate, draw-call count and how many of the asset are on '
      + 'screen at once all move the number. <b>Always profile in your actual target before trusting any figure here.</b></div>';

    if (!compact) {
      html += '<p class="dim" style="font-size:.84rem;margin:12px 0 0">'
        + 'Scope tip: every one of these takes time. Modelling five game-ready hero assets is a semester; one good hero plus a small '
        + 'modular kit is a finishable project. Pick the smaller list — a shipped small thing beats an unfinished big one.</p>';
    }

    container.innerHTML = html;

    // ---- refs ----
    var overallEl = container.querySelector('#' + ID + '-overall');
    var barEl     = container.querySelector('#' + ID + '-bar');
    var roleInfo  = container.querySelector('#' + ID + '-role-info');
    var total     = totalItems();

    // ---- painters ----
    function paintRole() {
      var r = findRole(role);
      Array.prototype.forEach.call(container.querySelectorAll('.seg [data-role]'), function (b) {
        var on = b.getAttribute('data-role') === role;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      roleInfo.innerHTML =
        '<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">'
        + '<h4 style="margin:0;color:var(--accent)">' + ui.esc(r.name) + ' asset</h4>'
        + '<span class="badge" style="border-color:color-mix(in srgb,var(--accent) 45%,var(--line));color:var(--accent-2)">'
        + '<b>' + r.letter + '</b> budget: ' + ui.esc(r.budget) + '</span></div>'
        + '<p style="margin:.4em 0 0;font-size:.9rem;color:var(--ink-2)">' + ui.line(r.blurb) + '</p>';
    }

    function paintCat(c) {
      var sec = container.querySelector('.panel[data-cat="' + c.id + '"]');
      if (!sec) return 0;
      var done = countDone(c);
      var st = catStatus(done, c.items.length);
      var flag = sec.querySelector('[data-status]');
      flag.className = 'flag' + (st.cls ? ' ' + st.cls : '');
      flag.innerHTML = '<span class="fi" aria-hidden="true">' + st.fi + '</span> '
        + '<span>' + st.word + '</span> '
        + '<span class="mono" style="opacity:.8">' + done + '/' + c.items.length + '</span>';
      return done;
    }

    function paintAll() {
      var done = 0;
      CATS.forEach(function (c) { done += paintCat(c); });
      var pct = total ? Math.round((done / total) * 100) : 0;
      overallEl.innerHTML = 'Game-ready checks: <b>' + done + ' / ' + total + '</b> '
        + '<span class="dim mono">(' + pct + '%)</span>'
        + (done === total ? ' <span class="flag ok" style="margin-left:4px"><span class="fi" aria-hidden="true">✓</span> All clear</span>' : '');
      barEl.style.width = pct + '%';
    }

    // ---- handlers ----
    function onItemClick(e) {
      var btn = e.currentTarget;
      var cid = btn.getAttribute('data-cat'), k = btn.getAttribute('data-k');
      var key = cid + '.' + k;
      var now = !checked[key];
      if (now) checked[key] = true; else delete checked[key];
      btn.setAttribute('aria-checked', now ? 'true' : 'false');
      var box = btn.querySelector('.ac-box');
      box.textContent = now ? '✓' : '';
      box.style.background = now ? 'var(--accent)' : 'transparent';
      box.style.borderColor = now ? 'var(--accent)' : 'var(--line)';
      var lab = btn.querySelector('.ac-lab');
      if (lab) lab.style.color = now ? 'var(--ink-3)' : '';
      save();
      paintAll();
    }
    function onItemKey(e) {
      // role=checkbox should toggle on Space (and Enter is harmless to support)
      if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') { e.preventDefault(); onItemClick(e); }
    }
    function onRoleClick(e) {
      role = e.currentTarget.getAttribute('data-role');
      save();
      paintRole();
    }
    function onReset() {
      checked = {};
      save();
      Array.prototype.forEach.call(container.querySelectorAll('.ac-item'), function (btn) {
        btn.setAttribute('aria-checked', 'false');
        var box = btn.querySelector('.ac-box');
        box.textContent = '';
        box.style.background = 'transparent';
        box.style.borderColor = 'var(--line)';
        var lab = btn.querySelector('.ac-lab');
        if (lab) lab.style.color = '';
      });
      paintAll();
      ui.toast('Checklist reset');
    }

    // wire item buttons (track for clean removal)
    var itemBtns = Array.prototype.slice.call(container.querySelectorAll('.ac-item'));
    itemBtns.forEach(function (btn) {
      btn.addEventListener('click', onItemClick);
      btn.addEventListener('keydown', onItemKey);
      // reflect the restored "checked" dimming on the label
      if (btn.getAttribute('aria-checked') === 'true') {
        var lab = btn.querySelector('.ac-lab'); if (lab) lab.style.color = 'var(--ink-3)';
        var box = btn.querySelector('.ac-box');
        if (box) { box.style.background = 'var(--accent)'; box.style.borderColor = 'var(--accent)'; }
      }
    });
    var roleBtns = Array.prototype.slice.call(container.querySelectorAll('.seg [data-role]'));
    roleBtns.forEach(function (b) { b.addEventListener('click', onRoleClick); });
    var resetBtn = container.querySelector('#' + ID + '-reset');
    if (resetBtn) resetBtn.addEventListener('click', onReset);

    // ---- first paint ----
    paintRole();
    paintAll();

    // ---- dispose: detach every listener we attached ----
    return function dispose() {
      itemBtns.forEach(function (btn) {
        btn.removeEventListener('click', onItemClick);
        btn.removeEventListener('keydown', onItemKey);
      });
      roleBtns.forEach(function (b) { b.removeEventListener('click', onRoleClick); });
      if (resetBtn) resetBtn.removeEventListener('click', onReset);
      container.innerHTML = '';
    };
  }

  GDA.tools.register({
    id: ID,
    icon: 'cube',
    title: 'Game-Ready 3D Checklist',
    blurb: 'The real-time mindset as a checklist: poly budget, topology, UVs, LODs, materials/PBR, scale & pivot, naming and export/import — concrete, correct game-art criteria with an honest per-role poly-budget guide. A pretty render isn’t a game asset; tick the honest answers before you call a model done.',
    category: '3D Art',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
