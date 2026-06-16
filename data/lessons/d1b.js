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
    goDeeper: 'The Unity (LOD Group) and Unreal (static-mesh LOD / auto-LOD and Nanite) documentation explain how each engine evaluates and switches LODs. Note that Unreal’s Nanite changes this story for opaque static meshes by virtualising geometry — worth reading once you’re comfortable with classic LODs.',
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
'- **Engine auto-LOD** — Unity and Unreal can generate LODs on import. Convenient, variable quality; great for prototyping, sometimes not good enough for hero assets.\n\n' +
'However you make them, the discipline is in the details. Each LOD must keep the **same UVs and material assignments** so it textures identically — a LOD that needs its own texture set defeats the purpose. The **pivot, scale and orientation must match LOD0 exactly**, or levels will shift when they swap (a nasty, hard-to-spot pop). And the chain needs a **predictable naming convention** so the engine can group it automatically — the widespread default is suffixes like `Rock_LOD0`, `Rock_LOD1`, `Rock_LOD2`.\n\n' +
'There are two common export shapes. You can export each LOD as a separate mesh and assemble the LOD group in-engine, or — the cleaner route in many pipelines — export them together in one FBX using the engine’s LOD naming convention so it builds the LOD Group on import automatically. Either way, this is the same export discipline you’ll formalise in [[d5-03]] and on the final checklist in [[d5-06]]: correct scale, sane pivot, consistent names. A LOD chain that pops, re-textures itself, or imports as three loose meshes isn’t done — *exports clean and switches invisibly in-engine at budget* is the bar.',
    task:
'Produce a three-level LOD chain for one simple asset (a crate, rock, barrel or similar) and a one-paragraph export note. Follow the steps below: duplicate LOD0, decimate to make LOD1 and LOD2 while preserving silhouette, UVs and pivot, name them by convention, and write down exactly how you’d export and how the engine would group them. You won’t run an engine here — so the deliverable is the named chain in Blender plus your written export/import plan (settings, naming, how the LOD Group is formed, and at roughly what screen size each level should kick in).',
    steps: [
      'In Blender, select your finished LOD0 mesh. Duplicate it with [[Shift+D]] then [[Esc]] to drop the copy in place; rename the original `Crate_LOD0` and the copy `Crate_LOD1` in the Outliner.',
      'With `Crate_LOD1` selected, add a *Decimate* modifier (Properties → wrench icon → Add Modifier → Generate → Decimate). Set mode to *Collapse* and lower the *Ratio* (e.g. ~0.5) while watching the silhouette — stop before the outline visibly breaks. Apply the modifier ([[Ctrl+A]] in the modifier dropdown).',
      'Duplicate `Crate_LOD1`, rename it `Crate_LOD2`, and decimate further (e.g. ratio ~0.4 of LOD1) — accept more interior loss but protect the outer shape. Apply.',
      'Verify all three share the same UVs and material slots (the Decimate Collapse mode preserves UVs; spot-check in the UV Editor). Confirm pivot/origin and transforms match across all three (Object → Set Origin if any drifted; all should sit at the same world origin with scale 1).',
      'Select all three meshes and export: File → Export → FBX. Set *Selected Objects*, apply the correct scale/units for your engine, and keep the `_LOD0/_LOD1/_LOD2` suffixes intact so the importer can group them.',
      'Pseudocode the in-engine grouping you expect, e.g.:',
      '```\nLODGroup "Crate"\n  LOD0  Crate_LOD0   show while screenSize > ~50%\n  LOD1  Crate_LOD1   show while ~50% > screenSize > ~20%\n  LOD2  Crate_LOD2   show while ~20% > screenSize > ~3%\n  (below ~3%  ->  cull / do not render)\n```',
      'Write your export note: which export shape you used (one combined FBX vs separate meshes), the naming convention, the screen-size thresholds above, and one line on how you’d test for LOD popping in-engine (orbit the camera out slowly and watch the switch points).'
    ],
    success: [
      'You have a named three-level chain (`_LOD0/_LOD1/_LOD2`) whose silhouette, UVs, material and pivot stay consistent across levels.',
      'You can state at least two ways to generate lower LODs and when each is appropriate.',
      'You can describe how the chain exports and how the engine forms a LOD Group, including rough screen-size switch points.'
    ],
    skills: ['Authoring a LOD chain', 'Blender Decimate workflow', 'LOD naming & export discipline'],
    prereq: '[[d1-04]] (why LODs exist) first',
    simplified: 'The exact Blender menu paths and FBX options can shift between versions, and the screen-size thresholds (50% / 20% / 3%) are illustrative — set yours per asset and target. The single-FBX-by-naming-convention import is engine-dependent; some pipelines prefer assembling the LOD group manually in-engine, which is equally valid.',
    goDeeper: 'Read your engine’s import-pipeline docs on LOD groups (Unity LOD Group component; Unreal static-mesh LOD settings and the FBX LOD naming convention), then compare hand-made vs auto-generated LODs on one asset to feel the quality/effort trade-off yourself.',
    quiz: [
      { q: 'Why must every level in a LOD chain share the same UVs and material slots?', a: 'So the whole chain textures identically with one texture set. If a lower LOD had different UVs or materials it would need its own textures — extra memory and authoring that undoes the optimisation — and the surface could visibly change when the LOD switches.' },
      { q: 'You apply a Decimate modifier and the chain works, but objects visibly shift position when LODs swap in-engine. What’s the most likely cause?', a: 'Mismatched pivots/origins (or transforms) between the LODs. Every level must share LOD0’s exact origin, scale and orientation; if a copy’s pivot drifted, the engine places the cheaper mesh slightly differently and you get a position pop on switch.' },
      { q: 'What does a `_LOD0` / `_LOD1` / `_LOD2` naming convention buy you at export?', a: 'It lets the engine recognise the meshes as one LOD chain and build the LOD Group automatically on import (when exported together), instead of importing three unrelated loose meshes you’d have to wire up by hand.' }
    ],
    tags: ['lod', 'decimate', 'export', 'fbx', 'naming convention', 'optimization'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
