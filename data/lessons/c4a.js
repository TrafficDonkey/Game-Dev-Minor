/* Pillar C · Phase c4 · Module c4a — Engine level tools
 * Engine-specific (Godot 4.x — GDScript or C#). Hands-on. */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c4-01', title: 'The engine’s level-building tools (Godot 4.x)', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The level-design thinking is the same idea in any engine; only the menus move.*\n\n' +
'A level in Godot is a **scene** — a saved `.tscn` file holding a **tree of nodes** with positions, properties and (optionally) attached scripts. Before you build anything, you need to read the room: the handful of editor docks Godot gives you to assemble, view and arrange a level. These are the **Scene** dock (the node tree of the current scene), the **3D viewport** (the editor workspace, with **2D**, **Script** and **AssetLib** tabs alongside), the **Inspector** (the selected node’s properties), the **FileSystem** dock (your project files on disk, all under `res://`) and **Play** ([[F5]]/[[F6]]) to run the scene and see it through the active `Camera3D`.\n\n' +
'The thing you place is a ((Node)) — Godot’s universal building block. Unlike an empty container you bolt components onto, *the node type is the behaviour*: a `Node3D` is a bare transform (position, rotation, scale), a `MeshInstance3D` shows geometry, a `StaticBody3D` with a `CollisionShape3D` child gives it physical presence. You compose behaviour by **nesting child nodes and attaching a script**, not by adding components to one object ([[e1-09]]). A saved tree of nodes is a scene; a scene can be instanced inside another, which is how whole rooms get reused.\n\n' +
'Three habits separate a tidy level from chaos. **One**: group related nodes under a parent `Node3D` so the Scene dock reads like an outline (a `Corridor_A` parent holding its walls, lights and props), not a flat list of 400 items. **Two**: name everything — `Wall_North_01`, not `MeshInstance3D5` — so the seam to 3D and code stays sane ([[d5-04]]). **Three**: learn the navigation and gizmos cold, because you will use them ten thousand times: orbit, pan, frame-selected, and the move/rotate/scale handles.\n\n' +
'This is the engine where every track lands: your blocked-out spaces ([[c1-01]]), your modular kit ([[d5-01]]) and your scripted mechanics ([[e2-04]]) all meet inside this scene. Today you only learn to *move around and place things deliberately* — the foundation for everything in this phase.',
    task:
'In Godot, create a fresh 3D scene and **place five nodes deliberately**: a ground plane and four primitives arranged as a tiny room (three walls and a doorway gap). Group all of them under one `Node3D` named `Room_01`. Rename every child meaningfully. Then frame the selection, orbit around it, and **Play** the scene to see it through a camera. The goal is fluency with the editor docks and the transform gizmos — not a pretty room.',
    steps: [
      'Create a scene: *Scene ▸ New Scene*, choose **3D Scene** as the root (you get a `Node3D`), then save with [[Ctrl+S]] into `res://scenes/`.',
      'Add a floor: select the root, click **+** (Add Child Node), add a `MeshInstance3D`, and in the Inspector set its **Mesh** to a new `PlaneMesh`. For collision, add a `StaticBody3D` with a `CollisionShape3D` child, or use a single `StaticBody3D` parent — Godot keeps mesh and collision as separate nodes by design.',
      'Add walls: add three more `MeshInstance3D` nodes with a `BoxMesh`. Use the **Move**, **Rotate** and **Scale** gizmos (toolbar buttons, or [[Q]]/[[W]]/[[E]]/[[R]] in common defaults) to stretch each box thin and stand it on edge as a wall; leave a gap for a doorway.',
      'Create the parent: add a plain `Node3D`, rename it `Room_01`, then drag the plane and three walls onto it in the Scene dock so they become its children.',
      'Rename children: double-click each in the Scene dock → `Floor`, `Wall_North`, `Wall_East`, `Wall_West`.',
      'Navigate: select `Room_01`, press [[F]] to frame it, hold the **middle mouse** and drag to orbit, and hold **right mouse** + [[W]][[A]][[S]][[D]] for a flythrough to move like a player.',
      'Check the player’s view: add a `Camera3D`, position it to see the room, mark it **Current** in the Inspector, then **Play Scene** [[F6]] to view through it.'
    ],
    success: [
      'You can name the core editor docks (Scene, Inspector, FileSystem, viewport) and say what each is for.',
      'You can place, rename and group nodes so the Scene tree reads like a clean outline.',
      'You can navigate the viewport and use the move/rotate/scale gizmos without hunting for them.'
    ],
    skills: ['Engine scene navigation', 'Node + scene-tree basics', 'Scene-tree hygiene'],
    simplified: 'Menu paths and default hotkeys are Godot 4.x common defaults and shift between versions and rebindable layouts — treat them as "common defaults, check your version" rather than guarantees. In Unity the same idea is a GameObject + components in the Hierarchy; in Unreal it is Actors in the World Outliner.',
    goDeeper: 'The official Godot docs sections on the editor interface, on nodes and scenes, and on the 3D editor are the canonical reference; they cover this exact workflow.',
    quiz: [
      { q: 'In Godot, how do you give a node geometry and physical presence, and what does that tell you about how levels are built?', a: 'A bare `Node3D` has only a transform — a position but no appearance or collision. You compose behaviour by nesting purpose-built child nodes: a `MeshInstance3D` to show it, a `StaticBody3D` + `CollisionShape3D` to make it solid, a script to make it act. A level is assembled from the scene tree — the node type is the behaviour, not a component bolted onto a blank object.' },
      { q: 'Why group and rename nodes instead of leaving a flat list of "MeshInstance3D5"?', a: 'A grouped, named Scene tree reads like an outline, so you (and the team) can find, move and toggle whole rooms at once. It keeps the seam to 3D and code clean — scripts and artists reference nodes by name via paths, and a flat wall of duplicates becomes unworkable fast.' }
    ],
    tags: ['engine', 'godot', 'scene', 'scene tree', 'node', 'level tools'] },
  {
    id: 'c4-02', title: 'Greybox → playable: blockout in an engine scene', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The discipline is the one you already learned in [[c1-01]]; here you make it *walkable* with Godot’s **CSG** nodes.*\n\n' +
'A paper or planner blockout proves the *shape*. An engine blockout proves the **feel** — distances, heights, sightlines and timing as a body-sized camera actually moves through them. The single most important rule: **block out to real scale**. In Godot, 1 world unit = 1 metre, so pick a player height (a common choice is ~1.8 m, with a capsule radius near 0.3–0.4 m) and build everything relative to it. A door that looks fine on paper is claustrophobic at 1.0 m and cartoonish at 4.0 m. Get scale wrong now and every asset you make later ([[d5-03]]) will fight the level.\n\n' +
'Godot’s fast greyboxing tool is **CSG** (Constructive Solid Geometry): drop a `CSGBox3D`, `CSGCylinder3D` or `CSGCombiner3D` and push/subtract solids right in the viewport — carve a doorway by setting a child box’s **Operation** to **Subtraction**. CSG is meant for blockout, not shipping geometry, so it is perfect here. Keep the greybox **grey on purpose**: one or two plain materials so you judge *space*, not decoration ([[c1-01]]). Resist texturing; resist props. The question this stage answers is only: *is this space good to move through?*\n\n' +
'To make it playable you need three things working together: **collision** on the geometry (turn on **Use Collision** on each CSG node, or add `StaticBody3D` + `CollisionShape3D` under imported meshes), a **player you can drive** (a `CharacterBody3D` with a `CollisionShape3D`, a `Camera3D` child, and a short `move_and_slide()` script — the seam to [[e2-04]]), and a **spawn point** so you start where you intend. Then you *walk it* — repeatedly — and feel where the pacing sags ([[c1-02]]) or a sightline fails to pull you forward ([[c1-03]]).\n\n' +
'This is iteration, not construction. Block, walk, note, adjust, walk again. Five honest walkthroughs beat an hour of careful placement, because the level only tells the truth when you’re inside it at speed.',
    task:
'Take a small space you already blocked on paper or in the planner ([[c1-01]]) and rebuild it to real scale in a Godot scene using CSG nodes. Drop in a controllable `CharacterBody3D` player and a spawn point. Then **walk it five times**, each time fixing one thing: a wall too close, a jump too far, a doorway you can’t see, a room that drags. Keep it grey. Stop when it *feels* right to move through, not when it looks finished.',
    steps: [
      'Set a scale reference: add a `CSGCylinder3D` ~1.8 m tall (1 unit = 1 m in Godot) and keep it visible while you build, so every wall and gap is judged against a human body.',
      'Block the space: use `CSGBox3D` nodes for walls, floors and ramps (matching your paper layout). Apply one flat grey `StandardMaterial3D` so nothing distracts from the spatial read.',
      'Carve openings: to cut a doorway, add a `CSGBox3D` as a child of the wall and set its **Operation** to **Subtraction** (or nest the room under a `CSGCombiner3D`). Enable **Use Collision** on each CSG node so the player can’t walk through it.',
      'Add a player: add a `CharacterBody3D` with a `CollisionShape3D` (capsule) and a child `Camera3D`. Attach a short movement script that reads input and calls `move_and_slide()` (the seam to [[e2-04]]).',
      'Add a spawn: position the `CharacterBody3D` at the intended start; the child `Camera3D` is the player’s eyes — mark it **Current**.',
      'Press [[F5]] (Play) / [[F6]] (Play Scene) and **walk the level**. Note every friction point out loud or on paper as you go.',
      'Stop the game, fix exactly one issue, and walk it again. Repeat five times — block, walk, note, adjust.'
    ],
    success: [
      'Your blockout is built to a consistent real-world scale you can state (player height and door/corridor sizes, in metres).',
      'You can actually walk the space with a controllable `CharacterBody3D` from a deliberate spawn point.',
      'You changed the layout based on how it *felt* to move through, not how it looked from above.'
    ],
    skills: ['Building to real scale', 'CSG greybox setup', 'Walk-and-iterate loop'],
    prereq: '[[c1-01]] (blockout/greyboxing) and ideally [[c1-02]] (pacing) first',
    simplified: 'Exact capsule dimensions and CSG details vary by version — Godot 4.x uses CSG nodes for blockout and `CharacterBody3D` for a kinematic player. (In Unity the same step is a Capsule + `CharacterController`; in Unreal a template pawn.) The principle — build to a fixed human scale and walk it — is universal.',
    goDeeper: 'Search GDC talks on "blockout" and "greyboxing" by level designers; the lesson on building to scale recurs constantly. Godot’s docs cover CSG for prototyping and the `CharacterBody3D` movement tutorial gives you a ready player to walk a blockout with.',
    quiz: [
      { q: 'Why is "build to real scale" the first rule of an engine blockout, more than visual polish?', a: 'Because the whole point of an engine blockout is to test how space feels to a body-sized player moving through it — distances, heights, jump gaps, sightlines. If the scale is wrong, every judgement you make is wrong, and every asset you author later to fit the level will be the wrong size too.' },
      { q: 'What does walking a greybox five times give you that staring at it from above never will?', a: 'The truth about pacing and readability. From above you see a map; inside it at player speed you feel where the space drags, where a turn hides the goal, where a gap is unfair. Iterating walkthroughs is how a level earns its layout before any art is made.' }
    ],
    tags: ['blockout', 'greybox', 'scale', 'playable', 'iteration', 'engine'] },
  {
    id: 'c4-03', title: 'CSG + GridMap modular workflow inside Godot', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). Godot gives you two in-engine level-geometry tools: **CSG** nodes for free-form blockout and **GridMap** for snapping a modular kit. Both solve the same problem — shape level geometry without leaving the engine. (In Unity the rough-cut tool is ProBuilder; in Unreal, Modeling Mode.)*\n\n' +
'You have two ways to build level geometry. **CSG** (`CSGBox3D`, `CSGCylinder3D`, `CSGCombiner3D`) lets you push, pull and **subtract** simple solids right in the scene — perfect for fast, throwaway blockout where round-tripping to Blender would be friction ([[c4-02]]). **A modular kit driven by GridMap** is the opposite philosophy: a small set of art-finalised pieces — walls, floors, corners, doorways — built once in Blender ([[d5-01]]), collected into a `MeshLibrary`, then *painted* onto a grid with the **GridMap** node like 3D tiles. The professional flow uses *both*: CSG to find the shape, then a GridMap kit to make it real.\n\n' +
'The thing that makes the modular workflow sane is the **grid**. A `GridMap` has a fixed **Cell Size** (commonly 1 m, or 2 m for larger kits), and every piece you paint lands on a cell, so walls meet flush with no hairline gaps or z-fighting seams. A `MeshLibrary` only works if every piece was modelled to that same cell size with consistent origins/pivots ([[d5-02]]) — that is the contract between the 3D track and the level track, and it’s why naming and pivots matter so much on the art side.\n\n' +
'CSG’s power moves are few: stretch a `CSGBox3D` to grow a corridor, nest boxes in a `CSGCombiner3D`, and set a child’s **Operation** to **Subtraction** to carve a doorway. It is deliberately crude — that’s the point. CSG is fine for blockout but is *not* a substitute for game-ready modelling: if a CSG mesh survives toward production, bake it down and watch poly count and topology ([[d0-02]]). GridMap, by contrast, instances real meshes from your library, so it stays cheap and game-ready.\n\n' +
'The honest workflow for a small team: **CSG for the rough cut, a GridMap kit for the final art.** You greybox the space fast in-engine, lock the layout by walking it ([[c4-02]]), then rebuild it by painting snapped kit pieces with GridMap — same footprint, real art. Scope discipline: a tight `MeshLibrary` of 10–15 pieces builds an entire level; a sprawling one-off mesh per room does not.',
    task:
'Build one small room **twice**. First, shape it with **CSG**: a floor, four walls, and a doorway carved with a `CSGBox3D` set to **Subtraction** — all sized in whole metres. Second, set up a **GridMap** kit: make three simple kit pieces (a wall, a floor tile, a corner — `BoxMesh` stand-ins are fine), bundle them into a `MeshLibrary`, and paint copies onto the GridMap to rebuild the room on the cell grid. Compare: which was faster to *shape*, which was tidier to *assemble*?',
    steps: [
      'Decide your grid: in Godot, 1 unit = 1 m. Pick a cell size (e.g. 1 m) and write it down — CSG boxes and the GridMap cell will both use it. Enable **Snap to grid** in the viewport (the magnet toolbar / *Transform ▸ Configure Snap*).',
      'CSG pass: add a `CSGCombiner3D`. Inside it, build a room from `CSGBox3D` nodes (floor + four walls), then add a small `CSGBox3D` child set **Operation = Subtraction** and slide it through a wall to carve a doorway.',
      'Walk it (Play) to confirm scale and collision feel right — enable **Use Collision** on the CSG nodes so the player is stopped by the geometry.',
      'Build a MeshLibrary: make three stand-in kit pieces sized to the cell — `Kit_Wall`, `Kit_Floor`, `Kit_Corner` — each a `MeshInstance3D` with its origin at a cell corner so they tile predictably ([[d5-02]]). Add a `StaticBody3D` + `CollisionShape3D` to each so painted tiles are solid. Save them as scenes, then *Scene ▸ Export As ▸ MeshLibrary…* (or convert via the MeshLibrary panel).',
      'GridMap pass: add a `GridMap` node, set its **Cell Size** to your grid unit, and assign your `MeshLibrary`. Pick a piece from the palette and **left-click to paint** cells, [[Shift]] or right-click to erase — tile the same room footprint flush with no gaps.',
      'Walk the GridMap room (Play) and confirm the painted tiles snap flush and collide.',
      'Compare and note: which method shaped the space faster, which assembled cleaner, and which you’d hand to an artist to finalise.'
    ],
    success: [
      'You can carve a simple room with CSG nodes (including a Subtraction doorway) sized in whole metres.',
      'You can build a `MeshLibrary` and paint modular pieces flush with `GridMap` on a fixed cell size.',
      'You can explain when to reach for CSG vs a GridMap kit — rough cut vs final art.'
    ],
    skills: ['In-engine geometry (CSG)', 'GridMap + MeshLibrary', 'Modular assembly thinking'],
    simplified: 'CSG and GridMap details and menu paths may differ slightly by Godot 4.x version — the MeshLibrary export step in particular has moved between releases, so check your version. The stand-in "kit" here uses primitives — a real kit is art-finalised meshes from the 3D track ([[d5-01]]).',
    goDeeper: 'Godot’s docs cover CSG for prototyping and the `GridMap`/`MeshLibrary` tutorial end to end; for modular design principles, look up GDC talks on modular environment kits (the contract of grid, pivot and snapping is the recurring lesson).',
    quiz: [
      { q: 'What makes a GridMap modular kit actually snap together cleanly, and whose job is it?', a: 'Every piece in the `MeshLibrary` must be modelled to the GridMap’s cell size with consistent origins/pivots (often a cell corner), so painted tiles land flush on cells with no gaps or overlaps. That contract is set on the 3D side ([[d5-02]]) — the level designer relies on the artist having honoured the cell size and origin conventions.' },
      { q: 'When should you use CSG versus a GridMap kit?', a: 'Use CSG for fast, throwaway blockout and finding the shape without round-tripping to Blender. Use a GridMap + MeshLibrary for the final, art-finalised level, because it instances real game-ready meshes cheaply. The pro flow does both: CSG rough cut, then repaint the same footprint with GridMap kit pieces.' }
    ],
    tags: ['csg', 'gridmap', 'meshlibrary', 'modular', 'snapping', 'godot'] },
  {
    id: 'c4-04', title: 'From your blockout planner to a Godot scene', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30, diagram: 'blockout',
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The porting habit is the same idea in any engine; only the import and snapping menus change.*\n\n' +
'You’ve planned a level — on paper, in the **blockout planner** below, or as a rough Blender mesh. Now you carry that plan into a real Godot scene without losing its intent. The trap is treating the plan as a *picture to admire*; treat it as a **build order** instead. A good port is methodical, not artistic: you’re transcribing a layout, then re-checking it by walking ([[c4-02]]).\n\n' +
'Start with the seam to 3D you already know: **scale and units**. Godot’s world unit is already one metre, so build everything to that and the planner’s 4×6 m room is a 4×6 m room in the scene — not 4×6 of some mystery unit ([[d5-03]]). If you bring a blockout mesh from Blender, apply transforms and export **glTF (.glb)** — Godot’s first-class import path — at a clean scale before importing; if you build from primitives, set the viewport snap to the planner’s grid.\n\n' +
'Then port **layout before detail**. Place the major masses first — floors, the critical-path corridors, the key landmarks the player navigates by ([[c1-05]]) — and only then the secondary spaces. Drop a spawn point and the level’s goal early, because the *relationship* between start, path and goal is the thing the planner encodes and the thing most worth preserving. Group nodes by area under parent `Node3D`s ([[c4-01]]) so the scene tree mirrors the plan’s regions.\n\n' +
'Finally, **close the loop**: walk it, compare against the plan, and expect to change the plan. The planner captured your *intent*; the engine reveals the *truth*. A corridor that read as tense on the grid may feel merely long in play; a sightline that guided the eye on paper may be blocked by a wall’s real height. Porting is not the end of design — it’s where paper design meets the body, and the level finally starts designing back. Use the interactive planner to lay out a small level, then transcribe it.',
    task:
'Use the blockout planner to design a small level (a spawn, a critical path of 3–5 spaces, one optional pocket, and a goal). Then **port it to a Godot scene** as a build order: set your grid, place the major masses on the critical path first, add the spawn and goal, group the scene tree by region, then walk it. Write down **two things the engine revealed** that the plan got wrong — and fix one of them in the scene, leaving the plan as-was so you can see the gap.',
    steps: [
      'Plan it: in the planner below, lay out spawn → critical path (3–5 spaces) → one optional pocket → goal. Note each space’s rough dimensions and the grid unit.',
      'Set the contract: Godot is already 1 unit = 1 m; set the viewport **Snap** increment to the planner’s grid (e.g. 1 m) so the scene and plan share a scale ([[d5-03]]).',
      'Major masses first: block the floors and the critical-path corridors with `CSGBox3D` nodes (or imported `.glb` blockout), matching the planner’s footprint — layout before any detail.',
      'Place anchors: drop a spawn point (a `Marker3D` or your player node) at the start and a clear marker at the goal, so the start→path→goal relationship from the plan is visible immediately.',
      'Mirror the regions: group nodes under parent `Node3D`s named per planner region (`Region_Entry`, `Region_Hub`, …) so the Scene tree reads like the plan ([[c4-01]]).',
      'Add the optional pocket and a controllable `CharacterBody3D` player + collision (reuse your [[c4-02]] setup).',
      'Walk it (Play [[F6]]), compare to the plan, and record two mismatches between intent and feel; fix one in the scene and leave the plan unchanged to study the gap.'
    ],
    success: [
      'Your scene shares a stated scale and grid with your plan (Godot’s 1 unit = 1 m).',
      'You ported layout before detail, anchored by spawn, critical path and goal.',
      'You walked the result and named concrete ways the engine contradicted the plan.'
    ],
    skills: ['Plan-to-scene porting', 'Scale/unit discipline', 'Intent vs feel reconciliation'],
    simplified: 'Whether you import a Blender blockout (prefer glTF/.glb in Godot) or build from CSG primitives, the scale step still bites at the Blender→export boundary — confirm a 4×6 m room reads as 4×6 m in Godot ([[d5-03]]) rather than trusting export defaults.',
    goDeeper: 'For the discipline of porting a plan faithfully, study any "anatomy of a level" GDC talk where a designer shows the paper map beside the shipped space; the gap between them is exactly what this lesson trains.',
    quiz: [
      { q: 'Why treat your blockout plan as a "build order" rather than a finished picture?', a: 'Because the plan’s value is its layout intent — the relationship between spawn, critical path and goal — not its looks. Porting it as a build order (scale first, major masses, then detail) preserves that intent and keeps you from fussing over decoration before the space is even walkable.' },
      { q: 'You walk the ported level and it feels worse than the plan looked. Is the plan wrong, the port wrong, or neither?', a: 'Often neither — the plan captured intent and the engine revealed truth the plan couldn’t. Distances and sightlines feel different at player speed than they read on a grid. The right move is to change the *scene* (and update the plan), because the body in the space is the final authority.' }
    ],
    tags: ['blockout', 'planner', 'porting', 'scale', 'critical path', 'engine'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
