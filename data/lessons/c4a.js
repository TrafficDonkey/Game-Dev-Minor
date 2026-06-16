/* Pillar C · Phase c4 · Module c4a — Engine level tools
 * Engine-specific (Unity/C# default, swappable to Unreal/Godot). Hands-on. */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c4-01', title: 'The engine’s level-building tools (Unity default; swappable)', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'*Engine-specific (Unity/C#) — the same ideas are Actors + the World Outliner in Unreal, and Nodes + the Scene tree in Godot. The level-design thinking is identical; only the menus move.*\n\n' +
'A level in an engine is a **scene** — a saved file holding a tree of objects with positions, components and references. Before you build anything, you need to read the room: the handful of tools every engine gives you to assemble, view and arrange a level. In Unity these are the **Hierarchy** (the scene tree), the **Scene view** (the 3D editor viewport), the **Inspector** (the selected object’s components and values), the **Project** window (your assets on disk) and the **Game view** (what the player sees through the camera).\n\n' +
'The object you place is a ((GameObject)) — an empty container. It does nothing until you add **components**: a `Transform` (always present — position, rotation, scale), a `MeshRenderer` to show geometry, a `Collider` to give it physical presence. This is the same component thinking from the code track ([[e1-09]]); a level is built from the same parts a programmer uses, just arranged by hand.\n\n' +
'Three habits separate a tidy level from chaos. **One**: parent related objects under empty GameObjects so the Hierarchy reads like an outline (a `Corridor_A` parent holding its walls, lights and props), not a flat list of 400 items. **Two**: name everything — `Wall_North_01`, not `Cube (37)` — so the seam to 3D and code stays sane ([[d5-04]]). **Three**: learn the navigation and gizmos cold, because you will use them ten thousand times: orbit, pan, frame-selected, and the move/rotate/scale handles.\n\n' +
'This is the engine where every track lands: your blocked-out spaces ([[c1-01]]), your modular kit ([[d5-01]]) and your scripted mechanics ([[e2-04]]) all meet inside this scene. Today you only learn to *move around and place things deliberately* — the foundation for everything in this phase.',
    task:
'In your engine of choice, create a fresh scene and **place five objects deliberately**: a ground plane and four primitives arranged as a tiny room (three walls and a doorway gap). Parent all of them under one empty GameObject named `Room_01`. Rename every child meaningfully. Then frame the selection, orbit around it, and switch to Game view to see it through the camera. The goal is fluency with the five windows and the transform gizmos — not a pretty room.',
    steps: [
      'Create a scene: [[Ctrl+N]] (Unity: *File ▸ New Scene*), then save it with [[Ctrl+S]] into `Assets/Scenes/`.',
      'Add a floor: *GameObject ▸ 3D Object ▸ Plane*. Notice it arrives with a `Transform`, `MeshRenderer` and `MeshCollider` already on it — inspect them in the Inspector.',
      'Add walls: *GameObject ▸ 3D Object ▸ Cube* three times. Use the **Move** [[W]], **Rotate** [[E]] and **Scale** [[R]] gizmos to stretch each cube thin and stand it on edge as a wall; leave a gap for a doorway.',
      'Create an empty parent: *GameObject ▸ Create Empty*, rename it `Room_01`, then drag the plane and three cubes onto it in the Hierarchy so they become its children.',
      'Rename children: slow double-click each in the Hierarchy → `Floor`, `Wall_North`, `Wall_East`, `Wall_West`.',
      'Navigate: select `Room_01`, press [[F]] to frame it, hold [[Alt]]+drag to orbit, and use the right-mouse + [[W]][[A]][[S]][[D]] flythrough to move like a player.',
      'Check the player’s view: switch from Scene view to the **Game** tab to see the room through the Main Camera; reposition the camera if the room is off-screen.'
    ],
    success: [
      'You can name the five core editor windows and say what each is for.',
      'You can place, rename and parent objects so the Hierarchy reads like a clean outline.',
      'You can navigate the viewport and use the move/rotate/scale gizmos without hunting for them.'
    ],
    skills: ['Engine scene navigation', 'GameObject + component basics', 'Hierarchy hygiene'],
    simplified: 'Menu paths and default hotkeys are Unity defaults and shift between versions and rebindable layouts — treat them as "common defaults, check your version" rather than guarantees. Unreal and Godot use the same concepts under different names.',
    goDeeper: 'The official Unity Manual sections on the Editor interface and on GameObjects are the canonical reference; Unreal’s and Godot’s editor docs cover the exact same workflow under their own naming.',
    quiz: [
      { q: 'What is a GameObject before you add any components, and what does that tell you about how levels are built?', a: 'It is an empty container with only a Transform — it has a position but no appearance, collision or behaviour. It tells you a level is assembled from components: you add a MeshRenderer to see it, a Collider to make it solid, scripts to make it act. Same component thinking the programmer uses.' },
      { q: 'Why parent and rename objects instead of leaving a flat list of "Cube (37)"?', a: 'A parented, named Hierarchy reads like an outline, so you (and the team) can find, move and toggle whole rooms at once. It keeps the seam to 3D and code clean — scripts and artists reference objects by name, and a flat wall of duplicates becomes unworkable fast.' }
    ],
    tags: ['engine', 'unity', 'scene', 'hierarchy', 'gameobject', 'level tools'] },
  {
    id: 'c4-02', title: 'Greybox → playable: blockout in an engine scene', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    concept:
'*Engine-specific (Unity/C#) — the same workflow is BSP/static-mesh blockout in Unreal and CSGShapes/MeshInstances in Godot. The discipline is the one you already learned in [[c1-01]]; here you make it *walkable*.*\n\n' +
'A paper or planner blockout proves the *shape*. An engine blockout proves the **feel** — distances, heights, sightlines and timing as a body-sized camera actually moves through them. The single most important rule: **block out to real scale**. Pick a player height (a common default is ~1.8 m, with a capsule radius near 0.3–0.4 m) and build everything relative to it. A door that looks fine on paper is claustrophobic at 1.0 m and cartoonish at 4.0 m. Get scale wrong now and every asset you make later ([[d5-03]]) will fight the level.\n\n' +
'Keep the greybox **grey on purpose**. Use one or two plain materials so you judge *space*, not decoration — the same reason you greybox at all ([[c1-01]]). Resist texturing; resist props. The question this stage answers is only: *is this space good to move through?*\n\n' +
'To make it playable you need three things working together: **collision** on the geometry (primitives ship with colliders; custom meshes may need a `MeshCollider` or a cheap box approximation), a **player you can drive** (a built-in first-person controller or a capsule with a simple movement script — the seam to [[e2-04]]), and a **spawn point** so you start where you intend. Then you *walk it* — repeatedly — and feel where the pacing sags ([[c1-02]]) or a sightline fails to pull you forward ([[c1-03]]).\n\n' +
'This is iteration, not construction. Block, walk, note, adjust, walk again. Five honest walkthroughs beat an hour of careful placement, because the level only tells the truth when you’re inside it at speed.',
    task:
'Take a small space you already blocked on paper or in the planner ([[c1-01]]) and rebuild it to real scale in an engine scene. Drop in a controllable player (built-in FPS controller or a capsule + simple move script) and a spawn point. Then **walk it five times**, each time fixing one thing: a wall too close, a jump too far, a doorway you can’t see, a room that drags. Keep it grey. Stop when it *feels* right to move through, not when it looks finished.',
    steps: [
      'Set a scale reference: add a *Capsule* primitive (~2 units tall in Unity defaults ≈ a 1.8–2 m human) and keep it visible while you build, so every wall and gap is judged against a human body.',
      'Block the space: use scaled cubes for walls, floors and ramps (matching your paper layout). Apply one flat grey material so nothing distracts from the spatial read.',
      'Give it collision: primitives include colliders by default; if you import any custom blockout mesh, add a `MeshCollider` (or a box approximation) so the player can’t walk through it.',
      'Add a player: use the engine’s built-in first-person controller package, or attach a `CharacterController` + a short movement script to a capsule (the seam to [[e2-04]]).',
      'Add a spawn: position the player capsule at the intended start; place the Main Camera on/under the player so the Game view is the player’s eyes.',
      'Press [[Ctrl+P]] (Unity Play) and **walk the level**. Note every friction point out loud or on paper as you go.',
      'Exit Play, fix exactly one issue, and walk it again. Repeat five times — block, walk, note, adjust.'
    ],
    success: [
      'Your blockout is built to a consistent real-world scale you can state (player height and door/corridor sizes).',
      'You can actually walk the space with a controllable player from a deliberate spawn point.',
      'You changed the layout based on how it *felt* to move through, not how it looked from above.'
    ],
    skills: ['Building to real scale', 'Playable greybox setup', 'Walk-and-iterate loop'],
    prereq: '[[c1-01]] (blockout/greyboxing) and ideally [[c1-02]] (pacing) first',
    simplified: 'Exact capsule/player dimensions and the name of the built-in controller vary by engine and version (Unity’s Starter Assets, Unreal’s Third/First Person template, Godot’s CharacterBody3D). The principle — build to a fixed human scale and walk it — is universal.',
    goDeeper: 'Search GDC talks on "blockout" and "greyboxing" by level designers; the lesson on building to scale recurs constantly. Unity’s and Unreal’s template projects ship a ready player you can borrow for blockout.',
    quiz: [
      { q: 'Why is "build to real scale" the first rule of an engine blockout, more than visual polish?', a: 'Because the whole point of an engine blockout is to test how space feels to a body-sized player moving through it — distances, heights, jump gaps, sightlines. If the scale is wrong, every judgement you make is wrong, and every asset you author later to fit the level will be the wrong size too.' },
      { q: 'What does walking a greybox five times give you that staring at it from above never will?', a: 'The truth about pacing and readability. From above you see a map; inside it at player speed you feel where the space drags, where a turn hides the goal, where a gap is unfair. Iterating walkthroughs is how a level earns its layout before any art is made.' }
    ],
    tags: ['blockout', 'greybox', 'scale', 'playable', 'iteration', 'engine'] },
  {
    id: 'c4-03', title: 'ProBuilder / modular workflow inside the engine', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'*Engine-specific (Unity/C#) — ProBuilder is Unity’s in-editor modelling tool. Unreal has Geometry/Modeling Mode (and legacy BSP); Godot has CSG shapes. All solve the same problem: shape level geometry without leaving the engine.*\n\n' +
'You have two ways to build level geometry. **In-engine modelling** (Unity’s **ProBuilder**) lets you push, pull and carve simple meshes right in the scene — perfect for fast, throwaway blockout where round-tripping to Blender would be friction. **A modular kit** is the opposite philosophy: a small set of art-finalised pieces — walls, floors, corners, doorways — built once in Blender ([[d5-01]]) and snapped together like LEGO. The professional flow uses *both*: ProBuilder to find the shape, then a modular kit to make it real.\n\n' +
'The thing that makes either workflow sane is **grid snapping**. Set a grid increment (commonly 0.25 m, 0.5 m or 1 m) and every piece lands on it, so walls meet flush with no hairline gaps or z-fighting seams. Modular kits *only* work if every piece was modelled to that same grid with consistent pivots ([[d5-02]]) — that is the contract between the 3D track and the level track, and it’s why naming and pivots matter so much on the art side.\n\n' +
'ProBuilder’s power moves are few: **extrude** a face to grow a corridor, **bevel** an edge, **boolean/carve** a doorway, and reassign materials per-face. It is deliberately crude — that’s the point. Geometry built this way is fine for blockout and even for simple shipped levels, but it is *not* a substitute for game-ready modelling: watch your poly count and topology if a ProBuilder mesh survives into production ([[d0-02]]).\n\n' +
'The honest workflow for a small team: **ProBuilder for the rough cut, modular kit for the final art.** You greybox the space fast in-engine, lock the layout by walking it ([[c4-02]]), then replace grey blocks with snapped kit pieces — same footprint, real art. Scope discipline: a tight modular kit of 10–15 pieces builds an entire level; a sprawling one-off mesh per room does not.',
    task:
'Build one small room **twice**. First, model it with the engine’s in-editor tool (ProBuilder or equivalent): a floor, four walls, and a doorway carved with a boolean — all on a fixed grid. Second, set up *fake* modular snapping: make three simple kit pieces (a wall, a floor tile, a corner — cubes are fine as stand-ins) and snap copies together on the same grid to rebuild the room. Compare: which was faster to *shape*, which was tidier to *assemble*?',
    steps: [
      'Enable grid snapping: in Unity, turn on grid snapping in the Scene view (the snap settings let you set the increment, e.g. 0.5). Decide your grid unit and write it down.',
      'Install/open the in-editor modeller (Unity: install **ProBuilder** via the Package Manager, then *Tools ▸ ProBuilder ▸ New Shape*).',
      'ProBuilder pass: create a cube, **extrude** faces to form a room with a floor and four walls, then **boolean/carve** a doorway opening. Assign a grey material per-face where useful.',
      'Walk it (Play) to confirm scale and collision still feel right — ProBuilder meshes generate colliders, but verify.',
      'Modular pass: make three stand-in kit pieces sized exactly to the grid — `Kit_Wall` (1×3×0.25), `Kit_Floor` (1×1), `Kit_Corner`. Set each pivot to a corner so they snap predictably ([[d5-02]]).',
      'Snap copies: with grid snapping on, [[Ctrl]]-drag (hold to snap) duplicates of the kit pieces into a grid, tiling the same room footprint flush with no gaps.',
      'Compare and note: which method shaped the space faster, which assembled cleaner, and which you’d hand to an artist to finalise.'
    ],
    success: [
      'You can carve a simple room with the engine’s in-editor modelling tool on a fixed grid.',
      'You can snap modular pieces together flush using grid snapping and corner pivots.',
      'You can explain when to reach for in-engine modelling vs a modular kit — rough cut vs final art.'
    ],
    skills: ['In-engine geometry (ProBuilder)', 'Grid snapping', 'Modular assembly thinking'],
    simplified: 'ProBuilder is a Unity package and its menu paths and version may differ from yours; Unreal’s Modeling Mode and Godot’s CSG are the equivalents. The stand-in "kit" here uses primitives — a real kit is art-finalised meshes from the 3D track ([[d5-01]]).',
    goDeeper: 'Unity’s ProBuilder documentation covers extrude/bevel/boolean and Pro-grids snapping; for modular design principles, look up GDC talks on modular environment kits (the contract of grid, pivot and snapping is the recurring lesson).',
    quiz: [
      { q: 'What makes a modular kit actually snap together cleanly, and whose job is it?', a: 'Every piece must be modelled to a shared grid increment with consistent, predictable pivots (often a corner), so pieces land flush on the grid with no gaps or overlaps. That contract is set on the 3D side ([[d5-02]]) — the level designer relies on the artist having honoured the grid and pivot conventions.' },
      { q: 'When should you use in-engine modelling (ProBuilder) versus a modular kit?', a: 'Use in-engine modelling for fast, throwaway blockout and finding the shape without round-tripping to Blender. Use a modular kit for the final, art-finalised level. The pro flow does both: ProBuilder rough cut, then replace grey blocks with snapped kit pieces on the same footprint.' }
    ],
    tags: ['probuilder', 'modular', 'kit', 'snapping', 'grid', 'engine'] },
  {
    id: 'c4-04', title: 'From your blockout planner to an engine scene', pillarId: 'C', phaseId: 'c4', moduleId: 'c4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30, diagram: 'blockout',
    concept:
'*Engine-specific (Unity/C#) — the porting habit is the same in any engine; only the import and snapping menus change.*\n\n' +
'You’ve planned a level — on paper, in the **blockout planner** below, or as a rough Blender mesh. Now you carry that plan into a real scene without losing its intent. The trap is treating the plan as a *picture to admire*; treat it as a **build order** instead. A good port is methodical, not artistic: you’re transcribing a layout, then re-checking it by walking ([[c4-02]]).\n\n' +
'Start with the seam to 3D you already know: **scale and units**. Decide the engine’s world unit equals one metre and import (or build) everything to that, so the planner’s 4×6 m room is a 4×6 m room in the scene — not 4×6 of some mystery unit ([[d5-03]]). If you bring a blockout mesh from Blender, apply transforms and export to a clean scale before import; if you build from primitives, set your grid to the planner’s grid.\n\n' +
'Then port **layout before detail**. Place the major masses first — floors, the critical-path corridors, the key landmarks the player navigates by ([[c1-05]]) — and only then the secondary spaces. Drop a spawn point and the level’s goal early, because the *relationship* between start, path and goal is the thing the planner encodes and the thing most worth preserving. Keep the Hierarchy parented by area ([[c4-01]]) so the scene mirrors the plan’s regions.\n\n' +
'Finally, **close the loop**: walk it, compare against the plan, and expect to change the plan. The planner captured your *intent*; the engine reveals the *truth*. A corridor that read as tense on the grid may feel merely long in play; a sightline that guided the eye on paper may be blocked by a wall’s real height. Porting is not the end of design — it’s where paper design meets the body, and the level finally starts designing back. Use the interactive planner to lay out a small level, then transcribe it.',
    task:
'Use the blockout planner to design a small level (a spawn, a critical path of 3–5 spaces, one optional pocket, and a goal). Then **port it to an engine scene** as a build order: set your unit/grid, place the major masses on the critical path first, add the spawn and goal, parent the Hierarchy by region, then walk it. Write down **two things the engine revealed** that the plan got wrong — and fix one of them in the scene, leaving the plan as-was so you can see the gap.',
    steps: [
      'Plan it: in the planner below, lay out spawn → critical path (3–5 spaces) → one optional pocket → goal. Note each space’s rough dimensions and the grid unit.',
      'Set the contract: decide 1 world unit = 1 metre; set the Scene grid snap to the planner’s increment so the scene and plan share a scale ([[d5-03]]).',
      'Major masses first: block the floors and the critical-path corridors with scaled primitives, matching the planner’s footprint — layout before any detail.',
      'Place anchors: drop a spawn point at the start and a clear marker at the goal, so the start→path→goal relationship from the plan is visible immediately.',
      'Mirror the regions: parent objects under empty GameObjects named per planner region (`Region_Entry`, `Region_Hub`, …) so the Hierarchy reads like the plan ([[c4-01]]).',
      'Add the optional pocket and a controllable player + collision (reuse your [[c4-02]] setup).',
      'Walk it (Play), compare to the plan, and record two mismatches between intent and feel; fix one in the scene and leave the plan unchanged to study the gap.'
    ],
    success: [
      'Your scene shares a stated scale and grid with your plan (1 unit = 1 m).',
      'You ported layout before detail, anchored by spawn, critical path and goal.',
      'You walked the result and named concrete ways the engine contradicted the plan.'
    ],
    skills: ['Plan-to-scene porting', 'Scale/unit discipline', 'Intent vs feel reconciliation'],
    simplified: 'Whether you import a Blender blockout or build from primitives, the unit/scale step is the one that bites — engines and exporters disagree on default units, so confirm 1 unit = 1 m at import ([[d5-03]]) rather than trusting defaults.',
    goDeeper: 'For the discipline of porting a plan faithfully, study any "anatomy of a level" GDC talk where a designer shows the paper map beside the shipped space; the gap between them is exactly what this lesson trains.',
    quiz: [
      { q: 'Why treat your blockout plan as a "build order" rather than a finished picture?', a: 'Because the plan’s value is its layout intent — the relationship between spawn, critical path and goal — not its looks. Porting it as a build order (scale first, major masses, then detail) preserves that intent and keeps you from fussing over decoration before the space is even walkable.' },
      { q: 'You walk the ported level and it feels worse than the plan looked. Is the plan wrong, the port wrong, or neither?', a: 'Often neither — the plan captured intent and the engine revealed truth the plan couldn’t. Distances and sightlines feel different at player speed than they read on a grid. The right move is to change the *scene* (and update the plan), because the body in the space is the final authority.' }
    ],
    tags: ['blockout', 'planner', 'porting', 'scale', 'critical path', 'engine'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
