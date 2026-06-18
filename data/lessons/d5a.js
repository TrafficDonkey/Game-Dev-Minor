/* Pillar D · Phase d5 · Module d5a — Modular kits */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd5-01', title: 'Building a modular asset kit (the seam to level design)', pillarId: 'D', phaseId: 'd5', moduleId: 'd5a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 35, diagram: 'assetcheck',
    concept:
'A ((modular kit)) is a small set of reusable pieces — wall, corner, doorway, floor, pillar, trim — designed so a level designer can *snap them together* into a whole environment, like LEGO. Instead of modelling a unique building, you model the **vocabulary** of a building once and let it be rebuilt endlessly. This is the single biggest efficiency multiplier in game art, and it is the most direct seam between your pillar and level design ([[c3-02]]): you make the kit, they build the level from it.\n\n' +
'Modularity pays off three ways. **Memory and performance**: a handful of meshes sharing one material draws far cheaper than hundreds of unique objects, because pieces *instance* and *batch* (the draw-call story from [[d0-02]]). **Speed**: a designer blocks out in grey ([[c1-01]]) then swaps grey for kit pieces in hours, not weeks. **Iteration**: change the wall mesh once and every wall in the game updates.\n\n' +
'The rule that makes it all work is the **grid**. Every piece is authored to a shared module size — say a 4m wall, 2m doorway, 4×4m floor — so edges meet seamlessly when snapped to that grid ([[d5-02]] covers the grid and pivots in depth). A piece that is 4.1m wide breaks the whole kit. Two more rules: pieces should **tile** (a wall’s left edge matches its right so a run of them looks continuous) and **share a texture atlas / trim sheet** ([[d2-02]]) so the whole kit is one or two materials.\n\n' +
'The classic scope trap is building a *huge* kit before testing one piece in-engine. Don’t. A real kit starts tiny — straight wall, corner, floor, doorway — proves it snaps and tiles in the engine, *then* grows. Five reliable pieces beat fifty that don’t line up. Plan the kit with the level designer first: what spaces must it build, and at what grid? That conversation is the kit’s real spec.',
    task:
'Plan and block a **minimal modular kit** for one simple interior (a corridor-and-room space). On paper or in Blender, define a grid module (e.g. 4m) and design the smallest set that can build it: straight wall, inner corner, floor, doorway. For each piece, write its exact dimensions on the grid and mark where its edges must line up with its neighbours. You are designing the *system*, not finishing art — grey boxes at correct sizes are the deliverable.',
    steps: [
      'Agree the **spec with level design** first: what must this kit build (one corridor + one room), and at what grid module? Pick a clean number — 4m is a common wall/floor unit; write it down.',
      'Set Blender’s units to metric and turn on the grid; make 1 Blender unit = 1 metre so the grid squares are real-world sized (the scale story continues in [[d5-03]]).',
      'Block the **floor tile** first: a flat 4×4m plane on the grid. This is your reference module — everything else is built around it.',
      'Block a **straight wall**: 4m long, sitting exactly on a grid edge, with its origin/pivot at a grid intersection (so it snaps cleanly — detailed in [[d5-02]]).',
      'Block a **corner** and a **doorway**: the corner joins two walls at 90°; the doorway is a wall with an opening at a consistent height (e.g. 2m tall). Keep widths on the grid.',
      'Check **tiling**: place two straight walls end to end. Do the edges meet with no gap and no overlap? If not, your width is off the module — fix the mesh, not the placement.',
      'Plan **one shared material**: note that all pieces will sit on one atlas/trim sheet ([[d2-02]]) so the kit batches into a few draw calls, not dozens.',
      'Mentally (or in-engine later, [[c3-02]]) snap the four pieces into the corridor-and-room. If four pieces build the space, the kit works — only then consider adding variants.'
    ],
    success: [
      'You can explain why a modular kit beats unique meshes for memory, speed and iteration.',
      'Your pieces are all authored to one stated grid module and tile without gaps.',
      'You started with the smallest set that builds the space, not a sprawling kit.',
      'You can name the seam: you author the kit, the level designer builds from it.'
    ],
    skills: ['Modular kit design', 'Authoring to a grid', 'Tiling pieces', 'The 3D↔level seam'],
    simplified: 'The 4m module and 2m doorway are illustrative defaults — real kits pick a grid to suit the game’s scale and the engine’s units (some teams work in 1m or imperial-derived sizes). The principle (one shared module, pieces tile, shared material) is what matters; the exact numbers are the team’s call.',
    goDeeper: 'Search GDC talks on "modular environment design" (the workflow popularised by studios building large worlds from kits); the official Godot docs on GridMap and using a MeshLibrary, plus the CSG nodes for greyboxing ([[c4-03]]), show the same ideas in-engine (same concept lives in other engines too).',
    quiz: [
      { q: 'Why must every piece in a modular kit be authored to one shared grid module?', a: 'Because pieces are snapped to that grid to build the level, so their edges only meet seamlessly if their dimensions are exact multiples of the module. A wall that is 4.1m instead of 4m leaves gaps or overlaps everywhere it tiles, breaking the whole kit. The grid is the contract that lets the pieces interlock.' },
      { q: 'A modular kit of 8 meshes sharing one material is drawn cheaply, but 200 unique props are slow even at similar triangle counts. Why?', a: 'Draw calls and batching. Repeated pieces sharing a material can be instanced/batched into very few GPU commands, while 200 unique objects each issue their own draw call with per-call overhead. Modularity wins on the draw-call axis of the performance triangle ([[d0-02]]), not just on memory.' },
      { q: 'What is the scope-smart way to start a kit, and why?', a: 'Start with the smallest set that builds the target space — wall, corner, floor, doorway — and prove it snaps and tiles in-engine before adding variants. A few reliable pieces that line up beat a huge kit that doesn’t; you catch grid/pivot mistakes cheaply on four pieces, not fifty.' }
    ],
    tags: ['modular kit', 'grid', 'tiling', 'batching', 'level design', 'workflow'] },
  {
    id: 'd5-02', title: 'Grid, snapping and pivots for modular pieces', pillarId: 'D', phaseId: 'd5', moduleId: 'd5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'A modular kit only snaps together cleanly if three things agree: the **grid**, the **dimensions**, and the **pivot** (origin) of every piece. Lesson [[d5-01]] introduced the grid as the kit’s contract; this lesson is the precision behind it — the small details that decide whether a designer’s level assembles in seconds or fights them all day.\n\n' +
'**The grid** is a shared spacing both you (in Blender) and the level designer (in the engine) snap to. Pick a power-of-two-friendly module — commonly 0.5m, 1m, 2m or 4m — and author every dimension as a multiple of it. The engine has its own grid-snap (often `Ctrl`-drag, with a configurable increment); set both grids to the same module so pieces land on-grid in both tools.\n\n' +
'**The pivot** is the point a piece rotates and snaps around — its local origin. This is the detail beginners miss. If a wall’s pivot sits at its *centre*, snapping it to a grid point puts half the wall on one side of the line; if the pivot sits at a **consistent corner or grid intersection**, every piece snaps predictably and walls line up end to end. The rule: **put pivots on the grid, in the same relative spot for every piece** (e.g. bottom-back-left corner for all walls). A floor tile’s pivot at a corner lets it tile by whole-module steps without guessing.\n\n' +
'In Blender this is *Object Origin*, not the 3D cursor’s whim — you set it deliberately (Object → Set Origin, or snap the cursor to a vertex then origin-to-cursor). Get it wrong and the asset still looks fine in Blender but is misery to place in-engine, which is exactly why "looks good in Blender" isn’t "done" ([[d0-03]]).\n\n' +
'Two more snapping habits. **Rotate in clean increments** — author pieces so 90° rotations keep them on-grid (a corner that only works at one rotation is half a kit). And keep **transforms clean on export**: apply scale and rotation so the piece arrives in-engine at 1:1 with a sane pivot ([[d5-03]] and [[d5-04]] cover export and naming). Clean pivots are a gift to the level designer ([[c3-02]]) — they are why your kit feels like LEGO instead of a jigsaw.',
    task:
'Take the four pieces you planned in [[d5-01]] (wall, corner, floor, doorway) and, for each, decide and write down: (1) its grid module and exact dimensions, (2) the *exact* pivot location (e.g. "bottom-back-left corner, on a grid intersection") using the **same relative spot for every piece**, and (3) whether it stays on-grid at 90°/180°/270° rotations. Then sketch two walls snapped end to end and confirm the pivots make their edges meet with no gap. If a pivot would put a piece half-off the grid, move it and note the fix.',
    success: [
      'You can explain why a piece’s pivot location — not just its size — decides whether it snaps cleanly.',
      'You place pivots on the grid in a consistent relative spot across the whole kit.',
      'You can state why a piece must stay on-grid through 90° rotations to be fully reusable.',
      'You connect clean pivots and applied transforms to a frustration-free handoff to level design.'
    ],
    skills: ['Setting pivots/origins', 'Grid snapping', 'Clean rotations', 'Export-ready transforms'],
    simplified: 'Grid-snap shortcuts and origin-setting menus differ by version and tool — Blender’s Set Origin options and the engine’s snap increment (often a Ctrl-drag with a configurable step) are common defaults, not guarantees; check your version. The chosen module sizes (0.5/1/2/4m) are conventions, not rules.',
    goDeeper: 'Read the official Blender manual on Object Origins and snapping, and Godot’s documentation on grid/snap settings in the 3D viewport and GridMap (snap-to-grid is built in; the same idea exists in other engines). Modular-environment GDC talks show how studios standardise pivots across an entire kit.',
    quiz: [
      { q: 'Two walls are both exactly 4m, but when snapped to the same grid points they overlap by half a metre. What is the likely cause?', a: 'A pivot/origin problem, not a size problem. If a wall’s origin is at its centre, snapping that origin to a grid point puts half the wall across the line, so two walls snapped to adjacent points overlap. Move the pivot to a consistent corner on the grid (same relative spot for every piece) and they meet edge to edge.' },
      { q: 'Why must a modular corner piece stay on-grid when rotated 90°?', a: 'Because the designer rotates pieces constantly to build different layouts. If a corner only lines up at one orientation, it falls off the grid when turned and you effectively need a separate mesh per direction — half a kit. Authoring it so 90° rotations keep it grid-aligned (with a sensible pivot) makes one mesh serve all four directions.' },
      { q: 'You set a clean pivot in Blender but the piece still lands wrong in the engine. What export-side habit likely got skipped?', a: 'Applying transforms — un-applied scale or rotation, or a non-uniform scale, makes the piece import at the wrong size or with a skewed pivot. Apply scale/rotation so the piece exports at 1:1 with its intended origin; clean transforms and naming ([[d5-03]], [[d5-04]]) are part of "done", since a kit that looks right in Blender but misbehaves in-engine isn’t finished ([[d0-03]]).' }
    ],
    tags: ['pivot', 'grid', 'snapping', 'origin', 'modular kit', 'transforms'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
