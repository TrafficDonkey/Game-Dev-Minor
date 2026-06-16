/* =============================================================================
 * Game Dev Academy — Tool: The Narrative Gym (D&D storytelling drills).
 * A training gym for the storytelling lessons: five generators that fire fresh
 * prompts from internal, ORIGINAL curated word banks (no copyrighted settings,
 * characters or text — every fragment is invented, generic fantasy/sci-fi). Each
 * generator teaches a different muscle a Game-Dev storyteller has to build:
 * worldbuilding, NPC depth, improvisation ("yes, and" / fail-forward), quest
 * structure, and character voice. Save any prompt to a notes list that persists
 * on this device; clear it when you've outgrown it.
 *
 * HONEST: this is pure browser JS picking from arrays — real randomness, real
 * drills. It does not run a game, an engine, or any external service.
 * Accessible: every generator is a real <button>, the active one carries an
 * aria-pressed letter + label (never hue alone), and saved prompts are a list.
 * dispose() removes the one global listener it installs. Offline, no deps.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;
  var ID = 'narrative';

  // --- ORIGINAL curated word banks ----------------------------------------
  // All fragments invented for this tool. Generic fantasy / sci-fi only — no
  // names, settings or text lifted from any published work.

  var PLACES = [
    'a drowned lighthouse that still turns its lamp under the waves',
    'a market town built across the spine of a sleeping stone titan',
    'a frontier station orbiting a planet no one is allowed to name',
    'a salt-mine city lit entirely by glowing fungus',
    'a monastery balanced on a single impossible pillar of rock',
    'a canal district where the streets are water and the boats are homes',
    'a derelict colony ship that became a generations-deep village',
    'a forest where the trees grow downward from a floating island',
    'a border fort half-buried in a slow-moving glacier',
    'a desert oasis fed by a spring that only flows at night',
    'a clockwork undercity beneath a quiet farming village',
    'a coastal ruin that rises from the tide for one hour each day',
    'a trade outpost grown inside a hollow, petrified leviathan',
    'a mountain pass guarded by a gate no one remembers building',
    'a swamp settlement on stilts above water that never reflects the sky'
  ];
  var TWISTS = [
    'but the buildings quietly rearrange themselves every full moon',
    'but no one here has dreamed in living memory',
    'but the local language has no word for "goodbye"',
    'but every map of the place is subtly, deliberately wrong',
    'but the dead are kept around as polite, forgetful guests',
    'but sound travels backwards after dusk',
    'but the wells give up memories instead of water',
    'but its only law is enforced by a creature nobody has seen',
    'but the children are born knowing a craft they never learned',
    'but shadows here are bought, sold, and occasionally stolen',
    'but the seasons arrive in the wrong order, on purpose',
    'but the place forgets any visitor who stays longer than a week',
    'but iron rusts in minutes and so everything is made of bone or glass',
    'but the stars overhead are a painted ceiling — and it is peeling',
    'but every door opens onto a room that was somewhere else yesterday'
  ];
  var TENSIONS = [
    'A drought of the one resource that keeps the lights on is six weeks away.',
    'Two families who built this place together now refuse to speak.',
    'An outsider arrived last spring and people are starting to vanish.',
    'The old protector is dying and three rivals want the empty seat.',
    'A buried secret is about to surface, and half the town helped bury it.',
    'A festival everyone loves is funded by something everyone hides.',
    'The thing in the dark used to be tame, and lately it has been hungry.',
    'A debt is coming due, and the price was never measured in coin.',
    'Newcomers and old-timers are one bad night from open conflict.',
    'The machine that protects them is failing, and no one alive can fix it.',
    'A prophecy nobody believes is quietly coming true, step by step.',
    'Their leader is keeping the peace with a lie that is unravelling.'
  ];

  var NPC_ROLES = [
    'a retired mercenary now running a failing tavern',
    'a young cartographer mapping places that do not exist yet',
    'a temple cook who hears more secrets than the priests',
    'a smuggler who only moves harmless-looking objects',
    'a toll-keeper at a bridge to nowhere in particular',
    'a disgraced engineer rebuilding something forbidden',
    'a travelling tooth-puller and unlicensed surgeon',
    'a ferry pilot who has crossed the same water for forty years',
    'a junior archivist drowning in records no one reads',
    'a beast-tamer whose last beast is missing',
    'a moneylender who keeps better stories than ledgers',
    'a night-watch captain one mistake away from retirement',
    'a wandering musician collecting one song from every town',
    'a glassblower whose pieces show the future, sometimes'
  ];
  var NPC_WANTS = [
    'wants to leave this place forever, just once they could afford it',
    'wants their estranged child to write back',
    'wants the respect they were promised and never given',
    'wants one quiet season with nothing going wrong',
    'wants to finish the work their mentor abandoned',
    'wants to be remembered for something true',
    'wants out of a bargain they made too young',
    'wants to protect a person who does not want protecting',
    'wants the courage to confess something small and ancient',
    'wants proof that the rumour about them is false',
    'wants to find the one who left without saying why',
    'wants enough to retire before their luck runs out'
  ];
  var NPC_SECRETS = [
    'is secretly the heir to the thing they pretend to hate',
    'caused the disaster everyone blames on weather',
    'has been quietly feeding the creature in the dark',
    'is two people sharing one well-kept name',
    'already knows how the story ends and is terrified',
    'owes the villain a favour they have not been asked to repay yet',
    'forged the document the whole town’s claim rests on',
    'is not from around here, or from now',
    'has been stealing small amounts of time from everyone they meet',
    'buried the previous holder of their job, literally',
    'is the only one who remembers the way things actually were',
    'keeps a second life in a place no one would think to look'
  ];
  var NPC_VOICES = [
    'speaks in slow proverbs and refuses to be hurried',
    'answers every question with a smaller, sharper question',
    'never finishes a sentence; you do it for them',
    'is relentlessly, suspiciously cheerful',
    'whispers when excited and booms when afraid',
    'numbers everything: "three reasons, and the first is..."',
    'apologises constantly, then does exactly as they please',
    'talks to their tools more warmly than to people',
    'uses sea-words for everything, even on dry land',
    'is blunt to the point of accidental cruelty, then mortified',
    'switches to a private nickname the moment they trust you',
    'tells the truth only as a joke, so you never quite believe it'
  ];

  var SITUATIONS = [
    'The party has the locked vault open and a guard rounding the corner.',
    'A grieving widow asks them to lie to the town council, tonight.',
    'They’ve cornered the thief — who turns out to be twelve years old.',
    'The bridge is out and the thing chasing them is not slowing down.',
    'A dying messenger presses a sealed letter into their hands.',
    'The friendly innkeeper just served them the missing person’s coat.',
    'The ritual is half-finished and the candles are guttering.',
    'A child offers to guide them, for a price they can’t yet name.',
    'The map ends at a cliff that should not be there.',
    'Two NPCs they like are about to duel over a misunderstanding.',
    'The treasure is real, and so is the family still living on top of it.',
    'A trusted ally quietly slips a second key into their pack.'
  ];
  var PLAYER_MOVES = [
    'a player ignores your plot hook entirely and adopts the goat',
    'a player tries to seduce the obviously cursed statue',
    'a player asks a question you genuinely never considered',
    'a player attempts a wildly creative use of a mundane item',
    'a player decides the villain is right and wants to help them',
    'a player rolls a critical failure at the worst possible moment',
    'a player wants to befriend the monster instead of fighting it',
    'a player proposes a plan that completely skips your dungeon',
    'a player insists on stopping to interview a background extra',
    'a player tries to bribe their way past with something worthless',
    'a player breaks the thing you needed intact, gleefully',
    'a player asks for a flashback that rewrites their backstory'
  ];

  var PATRONS = [
    'a nervous guild treasurer with shaking hands',
    'a masked patron who pays in old, untraceable coin',
    'a child speaking on behalf of someone unseen',
    'the very official the party were warned about',
    'a dying scholar with one last unfinished question',
    'a rival adventurer too injured to finish the job',
    'a talking raven that insists it represents a client',
    'a village elder out of options and almost out of time',
    'a merchant who needs a problem to simply disappear',
    'a temple that cannot be seen to ask for this directly'
  ];
  var TASKS = [
    'recover an object that everyone describes differently',
    'escort someone who clearly does not want to arrive',
    'deliver a message before a third party reads it',
    'find out why the shipments keep arriving empty',
    'remove a tenant who legally cannot be removed',
    'verify whether the rumoured ruin is actually there',
    'broker peace between two parties who both want war',
    'retrieve a debt from someone who has nothing left',
    'guard a door for one night and ask no questions',
    'identify the body before the festival begins'
  ];
  var COMPLICATIONS = [
    'but the pay is only half real and the patron knows it',
    'but a second party was hired to do the exact opposite',
    'but the object wants to stay lost and will resist',
    'but completing it makes a sympathetic NPC’s life much worse',
    'but the deadline is a lie, and the real one already passed',
    'but the patron is the problem they were hired to solve',
    'but success exposes a secret the party would rather keep',
    'but the only route runs through somewhere they are banned',
    'but the "simple" target is far better defended than promised',
    'but doing it right and doing it fast are mutually exclusive'
  ];

  var EMOTIONS = [
    'barely-contained grief',
    'smug, needling triumph',
    'exhausted, flat resignation',
    'giddy, reckless joy',
    'cold, patient menace',
    'frightened bravado',
    'tender, awkward affection',
    'simmering, righteous fury',
    'nervous over-politeness',
    'wistful nostalgia for a thing that never was',
    'wounded pride pretending not to be',
    'manic, sleep-deprived clarity'
  ];
  var CONSTRAINTS = [
    'speak only in questions',
    'never use the word "I"',
    'every line must mention a colour',
    'you may not say the other person’s name',
    'speak only in sentences of five words or fewer',
    'never directly answer what you’re asked',
    'work a lie into every second sentence',
    'use no words longer than two syllables',
    'end every line on an unfinished thought',
    'frame everything as if it already happened',
    'never use the past tense',
    'compliment the person you are arguing with, each time'
  ];

  // --- Generators ----------------------------------------------------------
  // Each returns { lines: [ {k, v}, ... ] } where k is a labelled field name.
  // Labels (not just hue) carry meaning, so the output is colourblind-safe.

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  var GENS = {
    world: {
      label: 'Worldbuilding seed', icon: 'map', p: 'A',
      hint: 'Place + an unusual twist + a simmering tension. Hold the scope down: one location, one strange rule, one problem. That is plenty to design a level or a quest around.',
      gen: function () {
        return { lines: [
          { k: 'Place', v: cap(pick(PLACES)) },
          { k: 'Twist', v: cap(pick(TWISTS).replace(/^but /, '… ')) },
          { k: 'Tension', v: pick(TENSIONS) }
        ] };
      }
    },
    npc: {
      label: 'NPC generator', icon: 'briefcase', p: 'B',
      hint: 'Role + want + secret + a voice quirk. A want plus a secret is a whole character — the want is what they show you, the secret is what they hide. The quirk is how you play them at the table.',
      gen: function () {
        return { lines: [
          { k: 'Role', v: cap(pick(NPC_ROLES)) },
          { k: 'Wants', v: cap(pick(NPC_WANTS)) },
          { k: 'Secret', v: cap(pick(NPC_SECRETS)) },
          { k: 'Voice', v: cap(pick(NPC_VOICES)) }
        ] };
      }
    },
    react: {
      label: 'React to a player choice', icon: 'bolt', p: 'C',
      hint: 'A situation + a move you did not plan for. Improvise out loud in the spirit of "yes, and" and fail-forward: never just block it. Say what their action causes, then hand a new, harder problem back.',
      gen: function () {
        return { lines: [
          { k: 'Situation', v: pick(SITUATIONS) },
          { k: 'Then', v: cap(pick(PLAYER_MOVES)) + '.' },
          { k: 'Your job', v: 'Out loud, in under thirty seconds: accept it ("yes"), build on it ("and…"), and turn a flat failure into a forward step. What new complication do you hand back?' }
        ] };
      }
    },
    quest: {
      label: 'Quest hook', icon: 'scroll', p: 'D',
      hint: 'A patron + a task + a complication. The complication is the design: a task without one is an errand. Keep the chain short enough to finish in a session — small and complete beats sprawling and abandoned.',
      gen: function () {
        return { lines: [
          { k: 'Patron', v: cap(pick(PATRONS)) },
          { k: 'Task', v: cap(pick(TASKS)) },
          { k: 'Complication', v: cap(pick(COMPLICATIONS).replace(/^but /, '… but ')) }
        ] };
      }
    },
    voice: {
      label: 'Character-voice drill', icon: 'eye', p: 'E',
      hint: 'An emotion + a hard speaking constraint. Improvise a short monologue or a few lines of dialogue that hit the emotion while obeying the rule. Constraints force voice — they stop everyone sounding like you.',
      gen: function () {
        return { lines: [
          { k: 'Emotion', v: cap(pick(EMOTIONS)) },
          { k: 'Constraint', v: cap(pick(CONSTRAINTS)) },
          { k: 'Drill', v: 'Speak six to ten lines in character. Hold the emotion the whole time and never break the constraint. If you slip, start the line over.' }
        ] };
      }
    }
  };

  // Render a prompt object to a readable plain-text string (for saving).
  function asText(genKey, prompt) {
    var g = GENS[genKey];
    var head = g ? g.label : 'Prompt';
    return head + '\n' + prompt.lines.map(function (l) { return l.k + ': ' + l.v; }).join('\n');
  }

  // --- Mount ---------------------------------------------------------------
  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;

    var saved = store.toolState(ID);
    var notes = (saved && Array.isArray(saved.notes)) ? saved.notes.slice() : [];

    // Which generators to show. Compact = the two most lesson-central muscles
    // (NPC depth + improvisation); full = all five.
    var keys = compact ? ['npc', 'react'] : ['world', 'npc', 'react', 'quest', 'voice'];

    // restore last-opened generator if valid, else first available
    var cur = (saved && keys.indexOf(saved.cur) >= 0) ? saved.cur : keys[0];
    // the currently displayed prompt object (regenerated, never persisted —
    // only what the user explicitly saves is kept)
    var current = null;

    container.innerHTML = '';
    var html = '';

    if (!compact) {
      html += '<div class="callout prereq" role="note" style="margin:0 0 14px">'
        + '<span class="ct">The storyteller’s gym</span>'
        + 'Voice, worldbuilding and improvisation are <b>trained, not gifted</b> — the same way you train Git or modelling. '
        + 'Pick a muscle, hit the button for a fresh prompt, and actually <em>say the lines out loud</em> or sketch the seed. '
        + 'Every fragment below is invented and generic — bring your own world to it. '
        + 'Tie it to your D&D sessions: a real table is the best rep machine there is.</div>';
    }

    // generator selector — real buttons, labelled + lettered (never hue alone)
    html += '<div class="seg" role="group" aria-label="Choose a drill" id="nv-seg" style="margin-bottom:12px">';
    keys.forEach(function (k) {
      var g = GENS[k];
      html += '<button type="button" data-k="' + k + '" aria-pressed="' + (k === cur ? 'true' : 'false') + '"'
        + ' style="display:inline-flex;align-items:center;gap:7px">'
        + '<span class="mono" aria-hidden="true" style="font-weight:700;color:var(--p-' + g.p + ')">' + g.p + '</span>'
        + '<span>' + ui.esc(g.label) + '</span></button>';
    });
    html += '</div>';

    // hint + roll button + stage
    html += '<div class="tool-stage" style="padding:14px 16px">'
      + '<p class="dim" id="nv-hint" style="margin:0 0 10px;font-size:.9rem"></p>'
      + '<div class="chip-row" style="margin-bottom:12px">'
      + '<button type="button" class="btn primary sm" id="nv-roll">' + ui.icon('dice') + '<span id="nv-roll-lbl">Roll a prompt</span></button>'
      + '<button type="button" class="btn sm" id="nv-save" disabled>' + ui.icon('download') + 'Save to notes</button>'
      + '</div>'
      + '<div class="diagram-info" id="nv-out" aria-live="polite" style="min-height:96px">'
      + '<p class="dim" style="margin:0">Hit <b>Roll a prompt</b> for a fresh combination, then improvise on it.</p></div>'
      + '</div>';

    // saved notes list
    html += '<div style="margin-top:16px">'
      + '<div class="tool-controls" style="margin-bottom:8px;align-items:center;justify-content:space-between">'
      + '<div class="readout">Saved prompts <b id="nv-count">0</b></div>'
      + '<button type="button" class="btn ghost sm" id="nv-clear">' + ui.icon('reset') + 'Clear all</button>'
      + '</div>'
      + '<div id="nv-notes"></div>'
      + '</div>';

    container.innerHTML = html;

    var seg = container.querySelector('#nv-seg');
    var hintEl = container.querySelector('#nv-hint');
    var rollLbl = container.querySelector('#nv-roll-lbl');
    var outEl = container.querySelector('#nv-out');
    var saveBtn = container.querySelector('#nv-save');
    var clearBtn = container.querySelector('#nv-clear');
    var notesEl = container.querySelector('#nv-notes');
    var countEl = container.querySelector('#nv-count');

    function persist() { store.setToolState(ID, { cur: cur, notes: notes }); }

    function paintHint() {
      var g = GENS[cur];
      hintEl.innerHTML = ui.line(g.hint);
      rollLbl.textContent = 'Roll: ' + g.label;
      Array.prototype.forEach.call(seg.querySelectorAll('button'), function (b) {
        var on = b.getAttribute('data-k') === cur;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function paintPrompt() {
      var g = GENS[cur];
      if (!current) {
        outEl.innerHTML = '<p class="dim" style="margin:0">Hit <b>Roll a prompt</b> for a fresh combination, then improvise on it.</p>';
        saveBtn.disabled = true;
        return;
      }
      var rows = current.lines.map(function (l) {
        return '<div style="display:flex;gap:10px;margin:.3em 0">'
          + '<span class="mono" style="flex:0 0 auto;min-width:96px;font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:var(--p-' + g.p + ');padding-top:2px">' + ui.esc(l.k) + '</span>'
          + '<span style="flex:1;min-width:0">' + ui.line(l.v) + '</span></div>';
      }).join('');
      outEl.innerHTML = '<h4 style="color:var(--p-' + g.p + ');display:flex;align-items:center;gap:7px">'
        + '<span class="mono" aria-hidden="true">' + g.p + '</span>' + ui.esc(g.label) + '</h4>' + rows;
      saveBtn.disabled = false;
    }

    function roll() {
      current = GENS[cur].gen();
      paintPrompt();
    }

    function paintNotes() {
      countEl.textContent = String(notes.length);
      if (!notes.length) {
        notesEl.innerHTML = '<p class="dim" style="font-size:.88rem;margin:0">No saved prompts yet. When a roll sparks something, hit <b>Save to notes</b> and it is kept on this device.</p>';
        clearBtn.disabled = true;
        return;
      }
      clearBtn.disabled = false;
      notesEl.innerHTML = notes.map(function (n, i) {
        var g = GENS[n.k];
        var p = g ? g.p : '0';
        var label = g ? g.label : 'Prompt';
        var body = n.lines.map(function (l) {
          return '<div style="display:flex;gap:8px;margin:.15em 0"><span class="mono dim" style="flex:0 0 auto;min-width:84px;font-size:.66rem;text-transform:uppercase;letter-spacing:.05em">' + ui.esc(l.k) + '</span><span style="flex:1;min-width:0">' + ui.line(l.v) + '</span></div>';
        }).join('');
        return '<div class="panel" style="padding:10px 12px;margin:8px 0;border-left:3px solid var(--p-' + p + ')">'
          + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
          + '<span class="mono" aria-hidden="true" style="font-weight:700;color:var(--p-' + p + ')">' + p + '</span>'
          + '<b style="font-size:.9rem">' + ui.esc(label) + '</b>'
          + '<button type="button" class="btn ghost sm no-print" data-del="' + i + '" aria-label="Delete this saved prompt" style="margin-left:auto;padding:3px 8px">Remove</button>'
          + '</div>' + body + '</div>';
      }).join('');
    }

    // --- events ----------------------------------------------------------
    // One delegated click handler on the container — easy to remove cleanly.
    function onClick(e) {
      var t = e.target;

      var segBtn = t.closest ? t.closest('#nv-seg button') : null;
      if (segBtn && seg.contains(segBtn)) {
        cur = segBtn.getAttribute('data-k');
        current = null;
        persist();
        paintHint();
        paintPrompt();
        return;
      }

      if (t.closest && t.closest('#nv-roll')) { roll(); return; }

      if (t.closest && t.closest('#nv-save')) {
        if (!current) return;
        notes.unshift({ k: cur, lines: current.lines.slice() });
        if (notes.length > 100) notes = notes.slice(0, 100);
        persist();
        paintNotes();
        if (ui.toast) ui.toast('Saved to notes');
        return;
      }

      if (t.closest && t.closest('#nv-clear')) {
        if (!notes.length) return;
        notes = [];
        persist();
        paintNotes();
        return;
      }

      var del = t.closest ? t.closest('[data-del]') : null;
      if (del) {
        var idx = parseInt(del.getAttribute('data-del'), 10);
        if (idx >= 0 && idx < notes.length) {
          notes.splice(idx, 1);
          persist();
          paintNotes();
        }
        return;
      }
    }
    container.addEventListener('click', onClick);

    // initial paint
    paintHint();
    paintPrompt();
    paintNotes();

    return function dispose() {
      container.removeEventListener('click', onClick);
    };
  }

  GDA.tools.register({
    id: ID,
    icon: 'scroll',
    title: 'The Narrative Gym',
    blurb: 'D&D-style storytelling drills: five generators that fire fresh worldbuilding seeds, NPCs, quest hooks, voice constraints and improvise-this-now player curveballs — all from original, generic word banks. Roll a prompt, say the lines out loud, and save the keepers. Training reps for the storytelling lessons.',
    category: 'Story',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
