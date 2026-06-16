/* =============================================================================
 * Game Dev Academy — the 12 graded projects (the spine of your achievement
 * portfolio). Each runs solo on briefs you can do without the team or a real
 * engine licence, and builds a real body of work: a GDD, a blocked-out level,
 * a game-ready asset, a scripted mechanic and a vertical slice. Ticking every
 * checklist item marks a project complete and lights its milestone badge
 * (see data/milestones.js + js/milestones.js).
 * brief uses markdown-lite: **bold** and [[lesson-id]] cross-references.
 * ========================================================================== */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};

  D.projects = [

    { id: 'p1', title: 'Deconstruct a game’s core loop & pacing', difficulty: 'Beginner',
      tagline: 'Take a game you love apart and name why it works',
      brief:
'The fastest way to build a designer’s eye is **reverse-engineering games that already work**. Pick one game you know well and pull it apart along four axes: its **core loop**, its **level pacing**, how it **delivers story**, and the **systems** underneath.\n\n' +
'Use the deconstruction method in [[b5-03]], the core-loop idea from [[b0-02]] and the pacing lens from [[c1-02]]. This is analysis, not redesign — you are training observation. Sketch the core loop in the **Core-loop sketcher** so you can see the flow.\n\n' +
'**Deliverable:** a one-page written deconstruction plus a core-loop diagram, specific enough that someone who hasn’t played the game understands what makes it tick.',
      checklist: [
        'Game chosen and named, with its genre and a one-line "fantasy" (what it makes you feel).',
        'Core loop mapped (the 3–6 actions the player repeats) and diagrammed in the sketcher.',
        'One level or section’s pacing traced: where tension rises, where it releases.',
        'Story delivery identified: cutscene, environmental, systemic/emergent, or none.',
        'Two or three underlying systems named (economy, progression, AI, etc.).',
        'A verdict: the single thing the design does best, and one thing you’d cut.'
      ],
      stretch: [
        'Find the "second-to-second", "minute-to-minute" and "session" loops separately.',
        'Identify one moment of ludonarrative harmony (or dissonance) and explain it.'
      ],
      relatedLessons: ['b5-03', 'b0-02', 'c1-02', 'a5-02'] },

    { id: 'p2', title: 'Pitch a feasible game in three sentences + a scope check', difficulty: 'Beginner',
      tagline: 'A tight pitch that could survive an eight-person semester',
      brief:
'Over-scoping is the **number-one student-game failure**, and this minor grades your GDD on **complexity vs feasibility**. Write a three-sentence pitch for a small game, then run it through the **Scope / feasibility estimator** and cut until it’s green.\n\n' +
'Lean on [[04-01]] (choosing & cutting scope) and [[01-05]] (the feasibility bar). A good three-sentence pitch names the **fantasy**, the **core loop**, and the **hook** — and implies a scope an eight-person team could actually ship in one semester.\n\n' +
'**Deliverable:** the three-sentence pitch plus a screenshot/summary of the scope estimate, with the red-flag features you removed listed.',
      checklist: [
        'A three-sentence pitch: fantasy, core loop, hook — no more.',
        'Run through the Scope estimator with an honest feature list.',
        'At least two "red-flag" features identified and explicitly cut or shrunk.',
        'A one-line statement of what the game is deliberately NOT.',
        'A realistic "smallest fun version" (the vertical slice you’d build first) named.'
      ],
      stretch: [
        'Write a second, even smaller version and argue which you’d actually pitch to a team.',
        'List the one feature you’d add first if the team turned out to be ahead of schedule.'
      ],
      relatedLessons: ['04-01', '01-05', 'b5-02', 'b3-02'] },

    { id: 'p3', title: 'Draft a full GDD in the builder', difficulty: 'Intermediate',
      tagline: 'The minor’s central deliverable, start to finish',
      brief:
'The **Game Design Document** is the spine of the minor and the designer’s main job. Use the **GDD builder** to draft a complete document for your [[p2]] pitch — every core section filled, and the complexity-vs-feasibility check addressed.\n\n' +
'Work from [[01-04]] (what a GDD is), [[b3-01]] (the GDD in depth) and [[b3-03]] (writing a buildable feature). A GDD is not a novel — it’s a shared source of truth a team builds from. Favour clarity and decisions over prose.\n\n' +
'**Deliverable:** a saved GDD draft covering pitch, pillars, core loop, mechanics, world, scope and a feature list — exported from the builder.',
      checklist: [
        'One-page pitch and 3 design pillars filled in.',
        'Core loop and primary mechanics described clearly.',
        'World / setting and tone summarised (links to your story work).',
        'A feature list with at least one feature written so a programmer could build it.',
        'Scope section: what’s in, what’s out, and the feasibility check addressed.',
        'Draft saved and exported from the GDD builder.'
      ],
      stretch: [
        'Add a "risks & unknowns" section naming the two scariest features.',
        'Mark each feature as must-have / nice-to-have / cut-first.'
      ],
      relatedLessons: ['01-04', 'b3-01', 'b3-03', 'f0-02'] },

    { id: 'p4', title: 'Worldbuild a setting & write a short quest', difficulty: 'Intermediate',
      tagline: 'Just enough world, expressed as one playable quest',
      brief:
'Build a small, **internally consistent** world and prove it by writing one short quest set in it. Use the **Narrative gym** generators to spark ideas, then shape them deliberately.\n\n' +
'Use [[a2-01]] (worldbuilding foundations), [[a2-04]] (just-enough world for your scope) and [[a3-02]] (quest & mission narrative). Resist the urge to write an encyclopedia — build only the world the quest needs, and let the rest stay implied.\n\n' +
'**Deliverable:** a one-page mini story bible (the rules of the world) plus a single quest with a beginning, a choice, and two possible outcomes.',
      checklist: [
        'A one-line premise and 3–5 world rules that stay internally consistent.',
        'One faction or force with a clear want, and what opposes it.',
        'A quest with a hook, a complication, and a player choice that matters.',
        'At least two outcomes the choice can lead to (fail-forward, not game-over).',
        'One piece of environmental storytelling the level could show instead of tell.'
      ],
      stretch: [
        'Write three lines of dialogue that reveal character without exposition.',
        'Name how a mechanic could express this world’s central theme.'
      ],
      relatedLessons: ['a2-01', 'a2-04', 'a3-02', 'a1-02'] },

    { id: 'p5', title: 'Plan & run a short D&D-style scene', difficulty: 'Intermediate',
      tagline: 'The storyteller’s gym — improvise, react, pace',
      brief:
'The class plays D&D, so train like it. Plan a short tabletop scene (a single encounter or social beat) and run it — solo by voicing all sides, or with friends. The point is **reacting to player choice** and **dramatic pacing** in real time.\n\n' +
'Use [[a4-02]] (running a scene & pacing), [[a4-03]] (character voice & improvisation) and [[a4-04]] ("yes, and" / fail-forward). Use the **Narrative gym** "react to this player choice" drill to warm up.\n\n' +
'**Deliverable:** a one-page scene plan (the situation, the stakes, three NPCs with a voice each) plus a short reflection on a moment you improvised when players went off-script.',
      checklist: [
        'A scene premise with clear stakes and a ticking pressure (why now?).',
        'Three NPCs, each with a one-line want and a distinct voice.',
        'Two or three ways the scene could branch on a player choice.',
        'The scene actually run (solo or with players).',
        'A reflection naming one moment you said "yes, and" and improvised.'
      ],
      stretch: [
        'Prepare a "fail-forward" outcome for the most likely failure, so a miss still moves the story.',
        'Map one tabletop technique to how a video game would deliver the same beat.'
      ],
      relatedLessons: ['a4-02', 'a4-03', 'a4-04', 'a4-01'] },

    { id: 'p6', title: 'Paper-prototype & playtest a single mechanic', difficulty: 'Intermediate',
      tagline: 'Find out if it’s fun before you build it',
      brief:
'You can test a mechanic for "is it fun?" long before any code exists. Build a **paper prototype** of one mechanic and playtest it with at least one real person — watching, not asking.\n\n' +
'Use [[b4-02]] (paper prototypes & rapid iteration), [[b4-03]] (playtesting: watch, don’t ask) and [[b4-04]] (reading feedback). Pick a mechanic simple enough to fake with paper, dice or tokens — movement, resource trade-offs, a combat exchange.\n\n' +
'**Deliverable:** the prototype (photos/description), notes from one playtest, and the single change you made as a result.',
      checklist: [
        'One mechanic isolated and faked with paper / dice / tokens.',
        'A rules sheet short enough to teach in a minute.',
        'At least one playtest run with a real person.',
        'Observations recorded by watching (confusion, fun, exploits) — not just opinions.',
        'One concrete iteration made and re-tested or planned.'
      ],
      stretch: [
        'Run a second playtester and compare where they got stuck.',
        'Write the "fun hypothesis" before testing and judge whether it held.'
      ],
      relatedLessons: ['b4-02', 'b4-03', 'b4-04', 'b4-01'] },

    { id: 'p7', title: 'Block out a tutorial level with pacing notes', difficulty: 'Intermediate',
      tagline: 'Teach one mechanic through space alone',
      brief:
'Design a short **tutorial level** that teaches a single mechanic without a wall of text. Use the **Level blockout planner** to lay out a top-down greybox with pacing, flow and sightline notes.\n\n' +
'Work from [[c1-01]] (blockout / greyboxing), [[c1-02]] (pacing & flow), [[c1-04]] (guiding without hand-holding) and [[c2-01]] (teach, test, twist). A great tutorial level introduces a mechanic safely, tests it, then twists it — all through level geometry and placement.\n\n' +
'**Deliverable:** a blockout plan (saved in the planner) plus pacing notes that mark where you teach, test and twist.',
      checklist: [
        'A top-down blockout laid out in the planner, with a clear start and end.',
        'One mechanic chosen; the level teaches it through space, not text.',
        'A "teach → test → twist" beat structure marked on the plan.',
        'Sightlines used to lead the eye toward the next objective.',
        'Pacing notes: where tension rises and where the player can breathe.',
        'The critical path is clear, with at least one piece of optional space.'
      ],
      stretch: [
        'Add an environmental-storytelling detail that hints at what happened here.',
        'Mark where you’d place a checkpoint and why.'
      ],
      relatedLessons: ['c1-01', 'c1-02', 'c1-04', 'c2-01'] },

    { id: 'p8', title: 'Design a fair enemy or encounter', difficulty: 'Intermediate',
      tagline: 'Hard but fair — the player should blame themselves',
      brief:
'Design one enemy (or a small encounter) that is **challenging but fair** — when the player loses, they should understand why and want to try again.\n\n' +
'Use [[c2-03]] (encounter & arena design), [[c2-04]] (fair difficulty curves) and [[b2-02]] (balancing & counters). Fairness comes from readable telegraphs, counterable attacks, and an arena that gives the player tools.\n\n' +
'**Deliverable:** an enemy/encounter spec: the enemy’s behaviour, its tells, its counter, and the arena that makes the fight fair.',
      checklist: [
        'The enemy’s goal and behaviour described (what it does and when).',
        'Every dangerous attack has a readable telegraph (a "tell").',
        'A clear counter the player can learn and execute.',
        'An arena sketch that supports the fight (cover, space, hazards).',
        'A difficulty note: how it ramps, and how a new player learns it.',
        'A "fairness check": name how the player avoids feeling cheated.'
      ],
      stretch: [
        'Design an easy / normal / hard variant by changing only numbers, not rules.',
        'Add a second enemy that combos with the first to create a new problem.'
      ],
      relatedLessons: ['c2-03', 'c2-04', 'b2-02', 'e4-02'] },

    { id: 'p9', title: 'Make & texture a game-ready prop, then export it', difficulty: 'Advanced',
      tagline: 'From Blender to engine-ready, the real-time way',
      brief:
'Take your Blender skills and make one **game-ready** prop — not a pretty render, but an asset an engine can run: sane poly count, clean UVs, PBR textures, correct scale and naming, exported and import-checked.\n\n' +
'Use [[d0-01]] (render vs game-ready), [[d2-01]] (UVs for games), [[d3-02]] (authoring PBR) and [[d5-03]] (export). Run it through the **Game-ready 3D checklist** before you call it done.\n\n' +
'**Deliverable:** the prop as an exported FBX/glTF plus the checklist passed, and a screenshot of it in a real-time viewer (engine viewport or glTF viewer).',
      checklist: [
        'A single prop modelled with a sensible poly budget for its role.',
        'Clean UVs with reasonable texel density (no wasted space, no stretching).',
        'A PBR material set (at least albedo, normal, roughness).',
        'Correct real-world scale and a sensible pivot/origin.',
        'Clear, consistent naming (mesh, material, textures).',
        'Exported (FBX or glTF) and opened successfully in a real-time viewer.',
        'The Game-ready 3D checklist passed (or each warning justified).'
      ],
      stretch: [
        'Author one LOD and confirm it swaps cleanly.',
        'Bake AO or a normal from a higher-poly version.'
      ],
      relatedLessons: ['d0-01', 'd2-01', 'd3-02', 'd5-03'] },

    { id: 'p10', title: 'Build a modular kit & assemble a small scene', difficulty: 'Advanced',
      tagline: 'The seam between 3D and level design, made real',
      brief:
'Build a small **modular kit** (walls, floors, a couple of props) on a grid, then assemble it into a small scene — proving the seam between 3D modelling and level design.\n\n' +
'Use [[d5-01]] (building a modular kit), [[d5-02]] (grid, snapping, pivots) and [[c3-02]] (building levels from kits). The win is **reuse**: a handful of pieces that snap together into something that reads as a place.\n\n' +
'**Deliverable:** the kit (a handful of snapping pieces) plus one assembled scene, screenshotted in a viewer or engine.',
      checklist: [
        'A kit of at least 4–6 modular pieces built to a consistent grid.',
        'Pivots and dimensions set so pieces snap without gaps or overlaps.',
        'Consistent texel density and a shared material/atlas across the kit.',
        'One scene assembled from the kit that reads as a coherent space.',
        'Naming and file organisation a teammate could pick up.'
      ],
      stretch: [
        'Add a "hero" piece that breaks the grid to avoid a repetitive look.',
        'Show the same kit assembled two different ways.'
      ],
      relatedLessons: ['d5-01', 'd5-02', 'c3-02', 'c4-03'] },

    { id: 'p11', title: 'Script a core mechanic with a unit test (Unity/C#)', difficulty: 'Advanced',
      tagline: 'Engine-specific — code one mechanic and prove it works',
      brief:
'Implement one **core mechanic** in code and back it with a **unit test**. This is the Layer-2 (engine-specific) project — defaults to **Unity / C#**, but the structure ports directly to Unreal or Godot.\n\n' +
'Use [[e2-03]] (scripting the update loop), [[e2-04]] (a player controller) and [[e2-08]] (unit-testing a mechanic). First nail the *logic* (use the **Code playground** to prototype a state machine or movement rule), then wire it into the engine and test the pure logic.\n\n' +
'**Deliverable:** the mechanic running in the engine, plus at least one passing unit test of its core logic, and a note on what the test protects.',
      checklist: [
        'One mechanic chosen and implemented (movement, a simple FSM, a pickup, etc.).',
        'The core logic separated from engine glue so it can be tested.',
        'At least one unit test that asserts the logic’s behaviour.',
        'The test passes, and you can state what change would make it fail.',
        'A short note: how this maps to Unreal (C++/Blueprints) or Godot (GDScript).'
      ],
      stretch: [
        'Prototype the same logic in the Code playground first and compare.',
        'Add an edge-case test (zero input, boundary, rapid toggling).'
      ],
      relatedLessons: ['e2-03', 'e2-04', 'e2-08', 'e1-07'] },

    { id: 'p12', title: 'The capstone vertical slice — touch all five tracks', difficulty: 'Advanced',
      tagline: 'One tiny playable slice that proves the whole pipeline',
      brief:
'This is the capstone. Build a **tiny vertical slice** that touches all five tracks: a **small level** (level design) built from an **asset you made** (3D), with **one mechanic you coded** (programming), a **designed encounter or puzzle** (game design), and a sliver of **environmental/narrative story** (storytelling).\n\n' +
'It runs through the whole capstone arc [[f1-01]], [[f1-02]], [[f1-03]], [[f1-04]] and [[f1-05]], and pulls in p3–p11. The hard part isn’t any single track — it’s **integration and scope**: keep it small enough to actually finish and make feel intentional.\n\n' +
'**Deliverable:** a short playable slice (even rough) plus a one-page write-up showing where each of the five tracks shows up.',
      checklist: [
        'A small, intentional space (level design) — minutes, not hours, of play.',
        'At least one asset you modelled and made game-ready (3D) used in it.',
        'One mechanic you implemented yourself (programming) that works.',
        'A designed encounter or puzzle (game design) with a fair challenge.',
        'A sliver of story told through the environment or a single beat (storytelling).',
        'It’s integrated and playable end to end (rough is fine; finished-feeling is the goal).',
        'A one-page map of where each of the five tracks appears.'
      ],
      stretch: [
        'Add one "juice" pass (feedback, sound, a screen shake) so it feels alive.',
        'Get one person to play it and note the first thing they did.'
      ],
      relatedLessons: ['f1-01', 'f1-03', 'f1-04', 'f1-05'] }

  ];

})(typeof window !== 'undefined' ? window : globalThis);
