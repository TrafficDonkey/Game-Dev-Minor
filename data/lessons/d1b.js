/* Pillar D · Phase d1 · Module d1b — LODs */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd1-04', title: 'Levels of detail (LODs): why and how', pillarId: 'D', phaseId: 'd1', moduleId: 'd1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'assetcheck',
    concept:
'A tree that fills your screen and a tree that’s a smudge on a distant hill should not cost the same to draw — but to the GPU, a 15k-triangle mesh is 15k triangles whether it covers a thousand pixels or four. ((LOD)) (Level Of Detail) fixes that waste: you author *several versions* of the same asset at decreasing complexity, and the engine swaps to a cheaper one as the object gets further away and smaller on screen. It’s one of the highest-leverage optimisation habits a game artist has, and it ties straight back to the poly budget thinking from [[d0-02]].\n\n' +
'A typical LOD chain looks like this:\n' +
'- **LOD0** — the full-detail mesh, used when the object is close. This is the one you built with clean topology in [[d1-01]].\n' +
'- **LOD1, LOD2…** — progressively decimated copies, each maybe 40–60% of the previous triangle count, used at mid and far range.\n' +
'- **Billboard / imposter** (optional, for things like trees) — a single flat card with a baked image, used at the extreme distance. Cheapest of all.\n\n' +
'The engine picks which LOD to show using **screen size** — roughly, how much of the screen the object’s bounds cover — not raw world distance, so it stays correct as the camera zooms or the resolution changes. The win is real: replace a 15k mesh with a 2k one at distance and you’ve cut vertex work and often draw cost dramatically, *and the player can’t tell*, because at that size the detail wasn’t resolvable anyway.\n\n' +
'Two honest caveats. First, the classic failure is **LOD popping** — a visible snap when LODs switch. You hide it by keeping silhouettes close between levels and switching at a distance where the change is small (some engines also offer ((dithering)) / cross-fade transitions). Second, **LODs are not free to make or maintain** — each level is another mesh to author, store and keep in sync. So scope them: a hero prop the player studies up close may not need any (it’s rarely far away), while a rock or tree scattered across a landscape *desperately* needs them. As ever in this pillar: spend the effort where the frame budget actually feels it.',
    task:
'Take three asset *roles* from an imagined open-ish scene — a **scattered prop** placed hundreds of times across a landscape (rock/tree), a **mid-ground building** the player approaches, and a **hero item** the player only ever sees in their hands or up close. For each, decide: does it need a LOD chain at all? If yes, sketch a rough chain (how many levels, and a *relative* triangle drop per level — e.g. "LOD0 100%, LOD1 ~50%, LOD2 ~20%, then a billboard"). Write one line per asset justifying the call by how far away and how numerous it gets. The reasoning is the deliverable, not exact numbers.',
    success: [
      'You can explain why an asset’s draw cost doesn’t shrink with distance unless you give it LODs.',
      'You can describe a LOD chain (LOD0 → cheaper copies → optional billboard) and how the engine chooses by screen size.',
      'You can decide which assets justify LODs and which don’t, and name what causes LOD popping.'
    ],
    skills: ['LOD concept', 'Distance-based optimisation', 'Scoping LOD work'],
    simplified: 'The "40–60% per level" and other triangle figures are rules of thumb, not standards — real LOD ratios and switch distances depend on the engine, the asset and the target hardware. Treat them as starting points and tune against the profiler on the actual target.',
    goDeeper: 'Godot 4.x handles this two ways: it **auto-generates mesh LODs** on import for 3D meshes (the engine simplifies the geometry and switches by screen size on its own), and it exposes **visibility ranges** (`visibility_range_begin` / `visibility_range_end`, with a begin/end *margin* for fading) on `GeometryInstance3D` so you can hand-author swaps and HLOD chains. Read the Godot docs on *mesh level of detail* and *visibility ranges*. (Same idea elsewhere: Unreal’s Nanite virtualises geometry for opaque static meshes and changes this story entirely — worth a look once classic LODs feel natural.)',
    quiz: [
      { q: 'Why does a distant, tiny object still cost a lot to draw if you don’t use LODs?', a: 'Because the GPU processes the mesh’s full geometry regardless of how small it appears — a 15k-triangle tree is 15k triangles of vertex work whether it fills the screen or covers four pixels. Distance only reduces cost if you actually swap in a cheaper mesh (a LOD).' },
      { q: 'What is LOD popping and how do you reduce it?', a: 'It’s the visible snap when the engine switches between LOD levels. You reduce it by keeping silhouettes and major forms similar between adjacent LODs, switching at a screen size small enough that the change is hard to see, and using dithered or cross-fade transitions where the engine supports them.' },
      { q: 'Which is more likely to need a LOD chain: a hero weapon the player holds, or a rock scattered 400 times across a hillside?', a: 'The rock. It’s placed many times and is usually viewed at a range of distances, so cheaper far meshes multiply into big savings. A hero weapon is nearly always close and on-screen alone, so its LOD0 is what gets used — extra LODs would rarely trigger.' }
    ],
    tags: ['lod', 'optimization', 'draw distance', 'real-time', 'poly budget'] },
  {
    id: 'd1-05', title: 'Authoring and exporting LOD chains', pillarId: 'D', phaseId: 'd1', moduleId: 'd1b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'Knowing *why* LODs matter ([[d1-04]]) is half the job; the other half is producing a clean chain and getting it into the engine without surprises. There are three ways to make the lower levels, in rough order of effort:\n\n' +
'- **Manual retopo / hand-decimation** — highest quality, most control over where detail is removed; reserved for important assets. You keep the silhouette and collapse interior loops the camera will never resolve at range.\n' +
'- **Blender’s `Decimate` modifier** — fast, automatic. *Collapse* mode (ratio-based) is the common choice; it’s blunt but fine for background props. Apply it to a *duplicate*, never your LOD0.\n' +
'- **Engine auto-LOD** — Godot 4.x generates mesh LODs automatically on import (and exposes `visibility_range_*` on `GeometryInstance3D` for hand-authored swaps). Convenient, variable quality; great for prototyping, sometimes not good enough for hero assets.\n\n' +
'However you make them, the discipline is in the details. Each LOD must keep the **same UVs and material assignments** so it textures identically — a LOD that needs its own texture set defeats the purpose. The **pivot, scale and orientation must match LOD0 exactly**, or levels will shift when they swap (a nasty, hard-to-spot pop). And the chain needs a **predictable naming convention** so the engine can group it automatically — the widespread default is suffixes like `Rock_LOD0`, `Rock_LOD1`, `Rock_LOD2`.\n\n' +
'How the chain reaches the engine depends on the engine. In **Godot 4.x** the common path is simplest of all: export your LOD0 as **glTF (`.glb`)** — Godot’s first-class import — and let Godot **auto-generate the lower LODs on import**, then tune the switch with the mesh-LOD threshold or `visibility_range_*` on the node. When you do want hand-authored levels (a billboard, a hero swap), you place them as siblings and drive them with `visibility_range_begin` / `visibility_range_end`. (Same idea elsewhere: FBX-based pipelines export every level in one file under a `_LOD0/_LOD1` naming convention so the engine builds a LOD Group automatically, or assemble that group by hand in-engine.) Either way, this is the same export discipline you’ll formalise in [[d5-03]] and on the final checklist in [[d5-06]]: correct scale, sane pivot, consistent names. A LOD chain that pops, re-textures itself, or imports as loose meshes isn’t done — *exports clean and switches invisibly in-engine at budget* is the bar.',
    task:
'Produce a three-level LOD chain for one simple asset (a crate, rock, barrel or similar) and a one-paragraph export note. Follow the steps below: duplicate LOD0, decimate to make LOD1 and LOD2 while preserving silhouette, UVs and pivot, name them by convention, and write down exactly how you’d export and how the engine would switch between them. You won’t run an engine here — so the deliverable is the named chain in Blender plus your written export/import plan (settings, naming, how the levels are switched — in Godot via auto-LOD on import or `visibility_range_*` — and at roughly what screen size each level should kick in).',
    steps: [
      'In Blender, select your finished LOD0 mesh. Duplicate it with [[Shift+D]] then [[Esc]] to drop the copy in place; rename the original `Crate_LOD0` and the copy `Crate_LOD1` in the Outliner.',
      'With `Crate_LOD1` selected, add a *Decimate* modifier (Properties → wrench icon → Add Modifier → Generate → Decimate). Set mode to *Collapse* and lower the *Ratio* (e.g. ~0.5) while watching the silhouette — stop before the outline visibly breaks. Apply the modifier ([[Ctrl+A]] in the modifier dropdown).',
      'Duplicate `Crate_LOD1`, rename it `Crate_LOD2`, and decimate further (e.g. ratio ~0.4 of LOD1) — accept more interior loss but protect the outer shape. Apply.',
      'Verify all three share the same UVs and material slots (the Decimate Collapse mode preserves UVs; spot-check in the UV Editor). Confirm pivot/origin and transforms match across all three (Object → Set Origin if any drifted; all should sit at the same world origin with scale 1).',
      'Export for the engine. For **Godot 4.x**, the recommended route is glTF: select your meshes and use File → Export → glTF 2.0 (`.glb`), with *Selected Objects* and the correct scale/units — Godot can then auto-generate the lower LODs on import, or you can drive your hand-made `_LOD1/_LOD2` siblings with `visibility_range_*`. (If your pipeline instead targets an FBX-based engine, export the levels together as one FBX with the `_LOD0/_LOD1/_LOD2` suffixes intact so the importer groups them.)',
      'Pseudocode the in-engine switching you expect (here written Godot-style with visibility ranges, but the screen-size logic is the same anywhere), e.g.:',
      '```\nCrate (Node3D)\n  Crate_LOD0   visible while screenSize > ~50%\n  Crate_LOD1   visible while ~50% > screenSize > ~20%\n  Crate_LOD2   visible while ~20% > screenSize > ~3%\n  (below ~3%  ->  cull / do not render)\n# In Godot: set visibility_range_begin / _end (+ margins) per mesh,\n# or let the auto-generated mesh LOD switch by the project LOD threshold.\n```',
      'Write your export note: which export shape you used (glTF with auto-LOD, glTF with hand-made `visibility_range_*` siblings, or one combined FBX), the naming/switching scheme, the screen-size thresholds above, and one line on how you’d test for LOD popping in-engine (orbit the camera out slowly and watch the switch points).'
    ],
    success: [
      'You have a named three-level chain (`_LOD0/_LOD1/_LOD2`) whose silhouette, UVs, material and pivot stay consistent across levels.',
      'You can state at least two ways to generate lower LODs and when each is appropriate.',
      'You can describe how the chain exports and how the engine switches levels (in Godot, auto-LOD on import or `visibility_range_*`), including rough screen-size switch points.'
    ],
    skills: ['Authoring a LOD chain', 'Blender Decimate workflow', 'LOD naming & export discipline'],
    prereq: '[[d1-04]] (why LODs exist) first',
    simplified: 'The exact Blender menu paths and glTF/FBX export options can shift between versions, and the screen-size thresholds (50% / 20% / 3%) are illustrative — set yours per asset and target. Godot’s auto-generated mesh LOD vs hand-authored `visibility_range_*` swaps are both valid; which you reach for depends on the asset and how invisible the switch needs to be.',
    goDeeper: 'Read the Godot 4.x docs on *mesh level of detail* (auto-LOD on import and the project LOD threshold) and *visibility ranges* (`visibility_range_begin` / `_end` and HLOD), then compare an auto-generated LOD against a hand-made chain on one asset to feel the quality/effort trade-off yourself. (For contrast, Unreal’s static-mesh LOD settings and Nanite show a different approach to the same problem.)',
    quiz: [
      { q: 'Why must every level in a LOD chain share the same UVs and material slots?', a: 'So the whole chain textures identically with one texture set. If a lower LOD had different UVs or materials it would need its own textures — extra memory and authoring that undoes the optimisation — and the surface could visibly change when the LOD switches.' },
      { q: 'You apply a Decimate modifier and the chain works, but objects visibly shift position when LODs swap in-engine. What’s the most likely cause?', a: 'Mismatched pivots/origins (or transforms) between the LODs. Every level must share LOD0’s exact origin, scale and orientation; if a copy’s pivot drifted, the engine places the cheaper mesh slightly differently and you get a position pop on switch.' },
      { q: 'What does a `_LOD0` / `_LOD1` / `_LOD2` naming convention buy you at export?', a: 'In FBX-based pipelines it lets the engine recognise the meshes as one LOD chain and group them automatically on import (when exported together), instead of importing unrelated loose meshes you’d wire up by hand. In Godot 4.x you lean on auto-generated mesh LOD or `visibility_range_*` instead, but a clear `_LOD` naming convention still keeps a hand-made chain organised and unambiguous.' }
    ],
    tags: ['lod', 'decimate', 'export', 'fbx', 'naming convention', 'optimization'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
