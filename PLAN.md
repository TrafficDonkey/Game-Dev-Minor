# Game Dev Academy — Build Plan & Lesson Map (source of truth)

A local, offline, single-user headstart for a 30-ECTS university **Game Development minor**: an
eight-person team building one game, achievement-based grading (silver/gold/platinum), sprints &
reviews, an industry expo, and a **GDD** assessed on **complexity vs feasibility**. The learner
has chosen five role-tracks — **Storyteller, Game Designer, Level Designer, 3D Modeller,
Programmer** — and wants to become a **versatile solo-capable dev** who can touch the whole
pipeline. Windows PC, **RTX 3060 Ti**, Ryzen 7. Already has **Blender** skills (teach game-ready,
not Blender 101). NL / HBO context; no paid software required. Engine default **Unity + C#**,
clearly **swappable** to Unreal/Godot.

## Architecture (reuses the studio house pattern)
Static, `file://`-safe, no build. Namespace `GDA` / `GDA_DATA`, localStorage `gameacademy.v1`.
Classic-script data modules push onto a global; hash router; localStorage store with export/import;
`curric` access layer; one file per lesson in `data/lessons/*.js`. Validated by `check.mjs`.

## Pillars (7) — ids 0,A,B,C,D,E,F
- **0** Foundations — the minor, the pipeline & the team
- **A** Storytelling & narrative design
- **B** Game design
- **C** Level design
- **D** Game-ready 3D modelling
- **E** Game programming (two layers: engine-neutral + engine-specific Unity/C#, swappable)
- **F** Capstone — ready for day one

Lesson id = `<phaseId>-<NN>` (NN sequential WITHIN the phase, spanning its modules). Pillar 0 ids
begin with a digit (`00-01`). Cross-ref regex widened to `[0a-f]`.

## Tools (10) — embeddable concept demos (`diagram:` field)
`pipeline` (signature/hero) · `gdd` · `scope` · `coreloop` · `blockout` · `achieve` · `kanban` ·
`assetcheck` · `playground` · `narrative`

Difficulty: B=Beginner, I=Intermediate, A=Advanced. Mode: k=knowledge, h=handson.

---

## PILLAR 0 — Foundations: the minor, the pipeline & the team  (20)

### phase 00 — How games get made & the five roles  (B)
module 00a — The production pipeline
- 00-01  What a game actually is: loops, systems, content & feel — B k
- 00-02  The production pipeline: concept → pre-production → production → polish → ship — B k
- 00-03  The disciplines on a game team and what each one owns — B k
module 00b — How the five roles interlock (the seams)
- 00-04  Story → design → level → art → code: the handoff chain — B k — diagram:pipeline
- 00-05  The versatile dev: building tiny things end-to-end (the solo-dev goal) — B k

### phase 01 — How THIS minor works  (B)
module 01a — The shape of the minor
- 01-01  The minor at a glance: 30 ECTS, 8-person team, one game, no written exams — B k
- 01-02  The achievement portfolio: silver / gold / platinum and the grade thresholds — B k — diagram:achieve
- 01-03  A strategy for the achievement system: where to spend effort — I k — diagram:achieve
module 01b — The GDD & the feasibility bar
- 01-04  The Game Design Document: what it is and why it is the spine — B k — diagram:gdd
- 01-05  Complexity vs feasibility: the bar your GDD is graded on — I k — diagram:scope
module 01c — Sprints, reviews & the expo
- 01-06  Sprints, sprint reviews and the rhythm of the semester — B k
- 01-07  The expo and the Best Game Award: shipping in public — B k

### phase 02 — Working in a multidisciplinary team  (B/I)
module 02a — Communication & critique
- 02-01  Roles, ownership and handoffs in an eight-person team — B k
- 02-02  Giving and receiving critique without drama — I k
- 02-03  Communication: standups, async updates and documentation — B k
module 02b — Agile, Scrum & Kanban
- 02-04  Agile and Scrum for a student team — I k
- 02-05  Kanban: visualising the work and limiting WIP — I h — diagram:kanban

### phase 03 — Git & version control for a team  (B/I)
module 03a — Git fundamentals
- 03-01  Why version control, and the mental model (commits & history) — B k
- 03-02  The core Git loop: clone, add, commit, push, pull — B h
module 03b — Git on a team
- 03-03  Branches, pull requests and resolving merge conflicts — I h
- 03-04  Git for game projects: large binaries, LFS, .gitignore, scenes — I h

### phase 04 — A feasible first concept & your toolchain  (B)
module 04a — Scope it to fit
- 04-01  Choosing and cutting scope for a feasible eight-person semester — I k — diagram:scope
module 04b — Tooling setup
- 04-02  Your toolchain: engine, Blender, Git and project structure — B h

---

## PILLAR A — Storytelling & narrative design  (24)

### phase a0 — Narrative fundamentals  (B)
module a0a — Story & character
- a0-01  Why story matters in games — and when it doesn't — B k
- a0-02  Story structure: setup, conflict, escalation, resolution — B k
- a0-03  Character: want vs need, flaw and arc — B k
- a0-04  Conflict, stakes and tension — B k
- a0-05  Theme: what your game is actually about — I k

### phase a1 — Storytelling in an interactive medium  (I)
module a1a — The interactive difference
- a1-01  The interactive difference: agency meets authored intent — I k
- a1-02  Environmental storytelling: the space tells the story — I k — diagram:narrative
- a1-03  Ludonarrative harmony (and dissonance) — I k
- a1-04  Show, don't tell — in a playable medium — I k
module a1b — Shape of the story
- a1-05  Branching and non-linear narrative — I k
- a1-06  Emergent narrative: stories the systems tell — I k
- a1-07  Player agency vs authored story: the central tension — A k

### phase a2 — Worldbuilding & the story bible  (I)
module a2a — Build a world
- a2-01  Worldbuilding foundations: internal consistency — I k — diagram:narrative
- a2-02  Factions, history and culture — I k
- a2-03  The story bible: documenting a world — I k
- a2-04  Worldbuilding for scope: just enough world — I k — diagram:scope

### phase a3 — Writing for games  (I)
module a3a — Game-writing craft
- a3-01  Writing game dialogue — I k
- a3-02  Quest and mission narrative — I k
- a3-03  Narrative documentation and the writers' room — I k

### phase a4 — Dungeons & Dragons as a training gym  (B/I)
module a4a — The D&D gym
- a4-01  Why D&D is a storytelling gym — B k — diagram:narrative
- a4-02  The DM's craft: running a scene and dramatic pacing — I k
- a4-03  Character voice and improvisation — I h — diagram:narrative
- a4-04  Reacting to player choice: "yes, and", fail-forward — I k — diagram:narrative

### phase a5 — Story meets mechanics (the seam to design)  (I)
module a5a — The seam
- a5-01  Integrating story with mechanics — I k
- a5-02  Narrative delivery: how players actually receive story — I k

---

## PILLAR B — Game design  (24)

### phase b0 — Mechanics, the core loop & game feel  (B)
module b0a — Mechanics & loop
- b0-01  Mechanics, rules and verbs — B k
- b0-02  The core loop: the heartbeat of a game — B k — diagram:coreloop
- b0-03  Secondary loops and the session loop — I k — diagram:coreloop
module b0b — Game feel
- b0-04  Game feel and "juice": why input feels good — I k
- b0-05  Feedback, readability and clarity — I k

### phase b1 — What makes a game fun  (I)
module b1a — Theory of fun
- b1-01  The MDA framework: mechanics, dynamics, aesthetics — I k
- b1-02  Flow: matching challenge to skill — I k
- b1-03  Player motivation and player types — I k
- b1-04  Kinds of fun: the eight aesthetics of play — I k

### phase b2 — Systems, balance & progression  (I/A)
module b2a — Systems & balance
- b2-01  Systems design: parts, relationships, feedback loops — I k — diagram:coreloop
- b2-02  Balancing: fairness, dominant strategies and counters — I k
- b2-03  In-game economies: sources, sinks and faucets — A k
module b2b — Progression & reward
- b2-04  Progression and difficulty curves — I k
- b2-05  Rewards, motivation and the ethics of engagement — I k

### phase b3 — The GDD in depth  (I)
module b3a — Author the GDD
- b3-01  The GDD in depth: the designer as its main author — I k — diagram:gdd
- b3-02  The one-page pitch and the design pillars — I k — diagram:gdd
- b3-03  Writing a feature so a team can build it — I k

### phase b4 — Prototyping & playtesting  (I)
module b4a — Prototype
- b4-01  Prototyping: the fastest path to "is it fun?" — I k
- b4-02  Paper prototypes and rapid iteration — I h
module b4b — Playtest
- b4-03  Playtesting: watching, not asking — I k
- b4-04  Reading feedback and deciding what to change — I k

### phase b5 — Genres, patterns & designing for scope  (I)
module b5a — Patterns & scope
- b5-01  Genres and reusable design patterns — I k
- b5-02  Designing for your scope: the feasible-fun sweet spot — I k — diagram:scope
- b5-03  Deconstructing a game: the recurring drill — I k — diagram:coreloop

---

## PILLAR C — Level design  (20)

### phase c0 — Spatial & environmental storytelling  (B/I)
module c0a — Space as story
- c0-01  What a level designer does (and the seam to everything) — B k
- c0-02  Spatial storytelling: reading a space — I k
- c0-03  Environmental storytelling in practice — I k — diagram:narrative

### phase c1 — Blockout, pacing & guiding the player  (I)
module c1a — Blockout
- c1-01  Blockout / greyboxing: build the level in grey first — I h — diagram:blockout
- c1-02  Pacing and flow: tension and release — I k — diagram:blockout
- c1-03  Sightlines and composition: where the eye goes — I k — diagram:blockout
module c1b — Guidance
- c1-04  Guiding the player without hand-holding — I k
- c1-05  Critical path, golden path and optional space — I k — diagram:blockout

### phase c2 — Puzzles & encounters  (I/A)
module c2a — Puzzles
- c2-01  Puzzle design: teach, test, twist — I k — diagram:puzzle? (use blockout)
- c2-02  Designing a fair, invented puzzle — A k
module c2b — Encounters
- c2-03  Encounter design and the combat arena — I k — diagram:blockout
- c2-04  Fair difficulty curves in encounters — I k

### phase c3 — Light, mood & modular kits  (I)
module c3a — Light & mood
- c3-01  Light and mood in a level (the seam to 3D/graphics) — I k
module c3b — Build from kits
- c3-02  Building levels from modular kit assets (the seam to 3D) — I k — diagram:assetcheck
- c3-03  Set dressing and detail passes — I k

### phase c4 — Levels in the engine  (I) — engine-specific (Unity default, swappable)
module c4a — Engine level tools
- c4-01  The engine's level-building tools (Unity default; swappable) — I h
- c4-02  Greybox → playable: blockout in an engine scene — I h
- c4-03  ProBuilder / modular workflow inside the engine — I h
- c4-04  From your blockout planner to an engine scene — I h — diagram:blockout

---

## PILLAR D — Game-ready 3D modelling  (27)  (assumes Blender skill; teaches real-time)

### phase d0 — The leap to real-time  (B/I)
module d0a — The real-time mindset
- d0-01  "Pretty render" vs "game-ready asset": what changes — B k — diagram:assetcheck
- d0-02  Poly budgets and the performance triangle — I k — diagram:assetcheck
- d0-03  The asset pipeline: from concept to engine — I k

### phase d1 — Topology & LODs  (I)
module d1a — Topology for games
- d1-01  Topology for games: tris, quads and what the GPU sees — I k
- d1-02  Silhouette-first, detail-where-it-counts modelling — I h
- d1-03  Common topology traps (n-gons, poles, shading) — I k
module d1b — LODs
- d1-04  Levels of detail (LODs): why and how — I k — diagram:assetcheck
- d1-05  Authoring and exporting LOD chains — I h

### phase d2 — UVs & atlases  (I)
module d2a — UV unwrapping for games
- d2-01  UV unwrapping for games: seams, packing, texel density — I h — diagram:assetcheck
- d2-02  Texture atlases and trim sheets — I k
- d2-03  UV tricks: overlapping, mirroring, UDIM vs atlas — I k

### phase d3 — PBR texturing & baking  (I/A)
module d3a — PBR
- d3-01  PBR explained: albedo, normal, roughness, metallic, AO — I k — diagram:assetcheck
- d3-02  Authoring PBR textures (Substance vs free tools vs Blender) — I h
- d3-03  Real-time materials vs offline materials — I k
module d3b — Baking
- d3-04  Baking high-poly detail to a low-poly mesh — A h
- d3-05  Normal maps: tangent space, sync and pitfalls — A k
- d3-06  Baking AO, curvature and the rest of the set — I h

### phase d4 — Rigging & animation prep  (I)
module d4a — Prep to move
- d4-01  Rigging basics for games: skeletons and skinning — I k
- d4-02  Weight painting and clean deformation — I h
- d4-03  Animation prep: root motion, naming, export-ready — I k

### phase d5 — Modular kits & exporting  (I)
module d5a — Modular kits
- d5-01  Building a modular asset kit (the seam to level design) — I h — diagram:assetcheck
- d5-02  Grid, snapping and pivots for modular pieces — I k
module d5b — Export & optimise
- d5-03  Exporting to the engine: FBX vs glTF, scale and units — I h — diagram:assetcheck
- d5-04  Naming conventions and clean file hygiene — I k — diagram:assetcheck
- d5-05  Import settings and the optimisation mindset — I k
- d5-06  The game-ready checklist, start to finish — I h — diagram:assetcheck

---

## PILLAR E — Game programming  (36)  (Layer 1 engine-neutral · Layer 2 Unity/C# swappable)

### phase e0 — Programming fundamentals (Layer 1, engine-neutral)  (B)
module e0a — Code basics
- e0-01  How to think like a programmer — B k — diagram:playground
- e0-02  Variables, types and expressions — B k — diagram:playground
- e0-03  Control flow: conditionals and loops — B k — diagram:playground
- e0-04  Functions and decomposition — B k — diagram:playground
module e0b — Structure & data
- e0-05  Object-oriented thinking: classes and objects — I k
- e0-06  Core data structures: arrays, lists, maps — I k
- e0-07  Algorithms and Big-O, gently — I k

### phase e1 — Game-programming concepts (Layer 1, engine-neutral)  (I)
module e1a — The runtime
- e1-01  The game loop: update and render — I k — diagram:playground
- e1-02  Delta time and frame independence — I k — diagram:playground
- e1-03  Input handling — I k
module e1b — Math & motion
- e1-04  Vectors and transforms: position, rotation, scale — I k — diagram:playground
- e1-05  3D math you actually need (dot, cross, lerp) — I k — diagram:playground
- e1-06  Collision and physics concepts — I k
module e1c — Patterns
- e1-07  Finite state machines — I k — diagram:playground
- e1-08  Events and the observer pattern — I k
- e1-09  Component / entity thinking — I k

### phase e2 — Engine-specific application (Layer 2: Unity/C#, swappable)  (I)
module e2a — Unity/C# foundations
- e2-01  Layer 2 intro: how the neutral concepts map to Unity (and to Unreal/Godot) — I k
- e2-02  GameObjects, components and MonoBehaviour — I k
- e2-03  Scripting the update loop in C# — I h
- e2-04  A player controller — I h
- e2-05  Interaction, triggers and collisions in-engine — I h
module e2b — Systems & quality
- e2-06  UI and game state / scene management — I h
- e2-07  Debugging and the engine's tools — I h
- e2-08  Unit-testing a mechanic — I h — diagram:playground

### phase e3 — Branch: gameplay programming (the core)  (I)
module e3a — Gameplay
- e3-01  Gameplay programming: turning a design into systems — I k
- e3-02  Tuning, data-driven design and designer-friendly code — I k
- e3-03  Saving, loading and game state — I h

### phase e4 — Branch: AI programming (pairs with story)  (I/A)
module e4a — Behaviour
- e4-01  Game AI: the illusion of intelligence — I k — diagram:playground
- e4-02  Finite state machines for enemies — I k — diagram:playground
- e4-03  Behaviour trees — I k
module e4b — Navigation & generation
- e4-04  Pathfinding: grids, A* and navmeshes — A k — diagram:playground
- e4-05  Steering and natural movement — I k
- e4-06  Procedural generation of worlds and behaviour — A k — diagram:playground

### phase e5 — Branch: graphics programming (pairs with 3D)  (I/A)
module e5a — Shaders & effects
- e5-01  How the GPU draws: the rendering pipeline — I k
- e5-02  Shaders: vertex and fragment, on the GPU — A k
- e5-03  Shader graphs and a first effect — I h
- e5-04  Visual effects and particles — I k
- e5-05  Post-processing — I k

---

## PILLAR F — Capstone: ready for day one  (14 + projects)

### phase f0 — Draft a real GDD  (I/A)
module f0a — The GDD
- f0-01  Capstone brief: a feasible small game, end to end — I k — diagram:scope
- f0-02  Drafting the full GDD in the builder — A h — diagram:gdd
- f0-03  Feasibility-checking and cutting your own GDD — A k — diagram:scope

### phase f1 — The vertical slice (touch all five tracks)  (A)
module f1a — Build the slice
- f1-01  What a vertical slice is, and scoping one — I k — diagram:scope
- f1-02  Story + design: one mechanic, one beat — A k
- f1-03  Level + 3D: a small space from an asset you made — A h — diagram:blockout
- f1-04  Programming: the one mechanic, coded and tested — A h — diagram:playground
- f1-05  Integrating the slice and making it feel finished — A k

### phase f2 — Your achievement-portfolio plan  (I)
module f2a — Plan the grade
- f2-01  Mapping your five tracks to gold/platinum — I k — diagram:achieve
- f2-02  Building the portfolio as you go — I k — diagram:achieve

### phase f3 — Your solo-dev workflow  (I)
module f3a — Day-one readiness
- f3-01  Your personal engine + Blender + Git pipeline — I h
- f3-02  A week-one plan for the minor — I k
- f3-03  Where to go deeper: a map of the five careers — I k
- f3-04  Day-one checklist: walking in versatile and ready — I k

---

## Count (as built)
0:23 · A:25 · B:24 · C:19 · D:26 · E:38 · F:14  →  **169 lessons**. Within 150–190; E (programming
30–40) and D (3D 22–30) are the deep technical pillars per the brief; every lesson a distinct topic.

## Projects (12) → milestones
P1 deconstruct a core loop & pacing · P2 pitch + scope check · P3 draft a full GDD · P4 worldbuild +
short quest · P5 plan/run a D&D-style scene · P6 paper-prototype + playtest a mechanic · P7 block out
a tutorial level · P8 design a fair encounter · P9 make & texture a game-ready prop + export ·
P10 modular kit + small scene · P11 script a core mechanic + unit test (Unity/C#) · P12 the capstone
vertical slice (all five tracks).

## Milestones (10)
pipeline understood · first GDD drafted · first feasible scope locked · first worldbuilding bible ·
first blocked-out level · first fair encounter · first game-ready exported asset · first scripted
mechanic · first playable vertical slice · achievement-portfolio plan ready.

## Build order
1. Spine: pillars.js. 2. CSS retheme. 3. app.js + dashboard (pipeline hero). 4. AUTHORING.md +
3 exemplars (story a0-02, 3D d0-01, programming e1-01 two-layer). 5. 10 tools. 6. projects +
milestones + glossary + hotkeys. 7. check.mjs + index.html, browser-test shell. 8. Fan out lessons.
9. Validate + browser test + self-review.
