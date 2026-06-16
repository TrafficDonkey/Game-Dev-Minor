/* =============================================================================
 * Game Dev Academy — Tool: The Pipeline Map (signature).
 * The five role-tracks as a chain — Story → Design → Level → 3D → Code — plus the
 * Foundations layer (team, Git, sprints) that wraps them and the playtest loop
 * that feeds back. Click a role to see what it does, what it produces, and what
 * it HANDS to the next role (the seam). Fully keyboard-accessible: each role is a
 * real button; colour is always paired with a letter + text label. Persists the
 * last role you opened. Pure DOM, offline.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;

  // Each role: pillar id (for hue + letter), name, what it does, what it makes,
  // and the explicit handoff to the next role(s) — the "seam" the solo dev must see.
  var ROLES = [
    { id: 'story', p: 'A', name: 'Storyteller', verb: 'imagines the fiction',
      does: 'Builds the world, characters, theme and narrative — the *why* behind everything. Runs and plays D&D to train voice, improvisation and pacing.',
      makes: ['A story bible & world rules', 'Characters, factions, stakes', 'Quests, dialogue, environmental beats'],
      handoff: 'Hands **Design** a theme and fantasy to express as mechanics, and hands **Level** the beats and mood to place in space. Story without mechanics is a screenplay; the seam is where it becomes a game.',
      pairsWith: 'AI programming (believable characters) and level design (environmental storytelling).' },
    { id: 'design', p: 'B', name: 'Game Designer', verb: 'decides how it plays',
      does: 'Owns the **core loop**, mechanics, systems and balance — and is the main author of the **GDD**. The hub the whole team reads from.',
      makes: ['The GDD & design pillars', 'Mechanics & systems specs', 'Balance, economy, progression'],
      handoff: 'Hands **Level** what the space must teach and test, hands **Code** the systems to implement, and tells **3D** what assets the design needs. Receives playtest results from **Code** and iterates.',
      pairsWith: 'Every track — design is the connective tissue, and the GDD is graded on complexity vs feasibility.' },
    { id: 'level', p: 'C', name: 'Level Designer', verb: 'shapes the space',
      does: 'Turns mechanics into places: **blockout**, pacing, sightlines, encounters and puzzles that guide the player without hand-holding.',
      makes: ['Greybox / blockout layouts', 'Pacing, flow & encounter plans', 'Scripted level events'],
      handoff: 'Consumes **3D** kits to build from, and hands **Code** the triggers and scripting the level needs. Sends **3D** an asset list ("I need these modular pieces").',
      pairsWith: '3D (modular kits) and story (the level is where environmental story lives).' },
    { id: 'art3d', p: 'D', name: '3D Modeller', verb: 'builds what you see',
      does: 'Makes **game-ready** assets, not pretty renders: correct topology, LODs, UVs, PBR textures and modular kits the engine can run in real time.',
      makes: ['Game-ready meshes & LODs', 'PBR materials & atlases', 'Modular kits for levels'],
      handoff: 'Hands **Level** the kits to assemble a scene, and hands **Code** assets to wire up (props, characters, FX-ready meshes). Exports clean FBX/glTF at the right scale and naming.',
      pairsWith: 'Level design (kits) and graphics programming (shaders & materials).' },
    { id: 'code', p: 'E', name: 'Programmer', verb: 'brings it to life',
      does: 'Implements it all in the engine: the game loop, player controller, AI, UI, and the systems the GDD describes. **Nothing is playable until code runs it.**',
      makes: ['A running, playable build', 'Gameplay / AI / graphics systems', 'Tools that help the team'],
      handoff: 'Pulls in **3D** assets and **Level** scripts, realises **Design**’s systems and **Story**’s logic — then hands a **playable build** back to the team to playtest, closing the loop.',
      pairsWith: 'All of it. Gameplay is the core; AI pairs with story, graphics pairs with 3D.' }
  ];

  function mount(container, opts) {
    opts = opts || {};
    var hero = !!opts.hero;
    var saved = store.toolState('pipeline');
    var cur = (saved && ROLES.some(function (r) { return r.id === saved.role; })) ? saved.role : 'design';

    container.innerHTML = '';
    var html = '';

    if (!hero) {
      html += '<div class="callout" role="note" style="margin:0 0 14px;border-color:var(--accent)">'
        + '<span class="ct">The solo-dev goal</span>'
        + 'You won’t master five careers in one minor — but you can learn how they <b>interlock</b>, so you can build tiny things end-to-end and be a versatile teammate. '
        + 'Click any role to see what it does and what it <b>hands to the next</b>.</div>';
    }

    // foundations band
    html += '<div class="panel" style="padding:8px 12px;margin-bottom:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;border-style:dashed">'
      + '<span class="badge" style="border-color:color-mix(in srgb,var(--p-0) 50%,var(--line));color:var(--p-0)"><b>0</b> Foundations</span>'
      + '<span class="dim" style="font-size:.84rem">Team, Git, sprints &amp; the GDD wrap the whole pipeline — every role commits to the same repo and reviews together.</span></div>';

    // the role chain
    html += '<div class="pipe-chain" role="group" aria-label="The five role-tracks in pipeline order" '
      + 'style="display:flex;align-items:stretch;gap:4px;overflow-x:auto;padding:4px 2px 10px">';
    ROLES.forEach(function (r, i) {
      html += roleBtn(r, r.id === cur);
      if (i < ROLES.length - 1) html += arrow();
    });
    // output
    html += '<div style="display:flex;align-items:center" aria-hidden="true">' + arrowGlyph() + '</div>'
      + '<div class="pipe-out" style="flex:0 0 auto;align-self:center;border:1px solid var(--ok);color:var(--ok);'
      + 'background:color-mix(in srgb,var(--ok) 10%,transparent);border-radius:10px;padding:10px 12px;font-weight:700;font-size:.84rem;text-align:center">'
      + ui.icon('play') + '<br>Playable<br>game</div>';
    html += '</div>';

    // feedback loop note
    html += '<div class="dim mono" style="font-size:.72rem;text-align:center;margin:-2px 0 12px">↻ playtest feedback loops back from the build to design — the cycle every sprint</div>';

    // info panel
    html += '<div class="diagram-info" id="pipe-info" aria-live="polite"></div>';

    container.innerHTML = html;

    var info = container.querySelector('#pipe-info');
    function paint() {
      var r = ROLES.filter(function (x) { return x.id === cur; })[0];
      Array.prototype.forEach.call(container.querySelectorAll('.pipe-node'), function (b) {
        var on = b.getAttribute('data-r') === cur;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var pl = (GDA.curric && GDA.curric.pillar) ? GDA.curric.pillar(r.p) : null;
      info.innerHTML =
        '<h4 style="color:var(--p-' + r.p + ')">' + ui.esc(r.name) + ' <span class="dim mono" style="font-size:.72rem">— Pillar ' + r.p + '</span></h4>'
        + '<p style="margin:.2em 0 .6em"><b>' + ui.esc(r.name) + '</b> ' + ui.line(r.verb) + '. ' + ui.line(r.does) + '</p>'
        + '<div class="grid cols-2" style="gap:12px">'
        + '<div><div class="dim mono" style="font-size:.68rem;text-transform:uppercase;letter-spacing:.08em">Produces</div><ul style="margin:.3em 0">'
        + r.makes.map(function (m) { return '<li>' + ui.line(m) + '</li>'; }).join('') + '</ul></div>'
        + '<div><div class="dim mono" style="font-size:.68rem;text-transform:uppercase;letter-spacing:.08em">Hands to the next →</div>'
        + '<p style="margin:.3em 0">' + ui.line(r.handoff) + '</p></div></div>'
        + '<div class="dim" style="font-size:.84rem;margin-top:6px"><b>Pairs with:</b> ' + ui.line(r.pairsWith)
        + (pl ? ' · <a class="xref" href="#/curriculum">Pillar ' + r.p + ' lessons ›</a>' : '') + '</div>';
    }

    Array.prototype.forEach.call(container.querySelectorAll('.pipe-node'), function (b) {
      b.addEventListener('click', function () { cur = b.getAttribute('data-r'); store.setToolState('pipeline', { role: cur }); paint(); });
    });

    paint();
    return function dispose() {};
  }

  function roleBtn(r, on) {
    return '<button class="pipe-node' + (on ? ' on' : '') + '" data-r="' + r.id + '" aria-pressed="' + (on ? 'true' : 'false') + '" '
      + 'style="flex:0 0 auto;width:118px;text-align:left;border:1px solid color-mix(in srgb,var(--p-' + r.p + ') 50%,var(--line));'
      + 'border-top-width:3px;border-top-color:var(--p-' + r.p + ');border-radius:10px;padding:10px;background:var(--panel-2)">'
      + '<span class="mono" style="font-size:.66rem;color:var(--p-' + r.p + ')">ROLE ' + r.p + '</span>'
      + '<span style="display:block;font-weight:700;font-size:.92rem;margin:2px 0">' + ui.esc(r.name) + '</span>'
      + '<span class="dim" style="font-size:.74rem">' + ui.esc(r.verb) + '</span></button>';
  }
  function arrow() { return '<div style="display:flex;align-items:center;color:var(--ink-3)" aria-hidden="true">' + arrowGlyph() + '</div>'; }
  function arrowGlyph() { return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'; }

  GDA.tools.register({
    id: 'pipeline',
    icon: 'compass',
    title: 'The Pipeline Map',
    blurb: 'How the five role-tracks interlock: Story → Design → Level → 3D → Code, wrapped by the team/Git/sprint foundation and closed by the playtest loop. Click a role to see what it does and what it hands to the next — the seams a versatile dev has to see.',
    category: 'Foundations',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
