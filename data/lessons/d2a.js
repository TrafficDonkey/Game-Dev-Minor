/* Pillar D · Phase d2 · Module d2a — UV unwrapping for games */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd2-01', title: 'UV unwrapping for games: seams, packing, texel density', pillarId: 'D', phaseId: 'd2', moduleId: 'd2a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30, diagram: 'assetcheck',
    concept:
'A **UV unwrap** is the flat map that tells the engine *which pixel of a texture lands on which triangle*. You already unwrap in Blender; the game-ready delta is three priorities you carry on top of "no stretching": where seams go, how tightly islands pack, and **texel density** — and these all feed [[d3-02]] (texturing) and [[d3-04]] (baking).\n\n' +
'**Seams** are the cuts that let a 3D surface lie flat — like the seams on a sewn jacket. Two rules beat "fewest seams": *hide them where they won’t be seen* (under edges, in crevices, on the back), and *cut where the surface changes direction hard* (a sharp 90° corner wants a seam, because forcing it flat causes ((stretching))). For baking later, seams also mark where the normal map gets a hard edge, so a clean seam now is a clean bake then.\n\n' +
'**((Texel density))** is how many texture pixels (texels) cover a unit of model surface — texels per metre. The goal is *consistency*: if the floor has 512 texels/m and a crate sitting on it has 2,000, the crate looks crisp and the floor looks blurry, and the mismatch reads as cheap. Give story-important and close-up surfaces a higher density, background filler less — but make the choice deliberately, not by accident of scale.\n\n' +
'**Packing** is arranging the flattened islands into the 0–1 UV square (the ((UV space))) with minimal wasted gaps, because empty UV space is wasted texture resolution. Leave a small **margin / padding** between islands so the texture filter and mipmaps don’t bleed one island’s colour onto its neighbour.\n\n' +
'The seam is a teamwork seam too: your texel density sets how sharp the surface looks at the distance the **level designer** ([[c3-02]]) places it, and a sane, consistent unwrap is what makes an **atlas** or **trim sheet** ([[d2-02]]) possible at all.',
    task:
'Take one game-ready low-poly you have (a crate, a barrel, a simple wall) and re-unwrap it with intent, using the steps below. Then write three sentences: where you put seams and why, what texel density you aimed for and how you checked it, and how much UV space you wasted after packing. The judgement — *not the click-path* — is the skill.',
    steps: [
      'In Blender, select the low-poly, enter Edit Mode ([[Tab]]) and switch a viewport to the **UV Editing** workspace.',
      'Mark seams deliberately: select an edge loop, then [[Ctrl+E]] → *Mark Seam*. Aim them at hard direction changes and hidden edges (back, underside, crevices).',
      'Select all faces ([[A]]) and unwrap: [[U]] → *Unwrap*. Inspect islands for stretching using the checker / stretch overlay (UV editor → overlays → *Display Stretching*).',
      'Check **texel density** consistently — use a checker texture so equal-size squares mean equal density, or a texel-density add-on; scale islands so a reference surface (e.g. the floor) and this asset match the target (a common figure is ~512–1024 texels/m for mid-distance props, but confirm against your project’s standard).',
      'Pack the islands: [[U]] → *Pack Islands*, and set a small **margin** so the texture filter and mipmaps don’t bleed across island edges.',
      'Sanity-check: no important seam on a front-facing flat surface, islands roughly the same texel density, and little wasted space in the 0–1 square.'
    ],
    success: [
      'Your seams sit on hidden edges and hard direction changes, not across visible flat faces.',
      'Texel density is consistent across the asset (and you can say how you verified it).',
      'Islands pack the 0–1 square with little waste and a sensible padding margin.'
    ],
    skills: ['UV unwrapping for games', 'Seam placement', 'Texel density', 'UV packing'],
    simplified: 'The Blender menu names and shortcuts above are common defaults — check your version, since UV tools move between releases. Texel-density figures are project- and platform-dependent; treat the numbers as ballpark and follow your project’s agreed standard.',
    goDeeper: 'The official Blender manual’s UV section and any reputable "texel density for games" breakdown go deeper; learning to read a checker-texture and a stretch overlay is the durable skill behind the menus.',
    quiz: [
      { q: 'Two crates use the same texture, but one looks crisp and the other blurry. What’s the likely cause?', a: 'Mismatched texel density — the blurry crate’s UV islands are smaller in UV space, so fewer texels cover the same surface area. Scale its islands up (or rebalance packing) so both share a consistent texels-per-metre.' },
      { q: 'Why not just minimise the number of seams?', a: 'Because seam *placement* matters more than seam *count*. A surface with too few seams stretches and distorts; the real rules are to hide seams where they won’t be seen and to cut where the surface changes direction hard, even if that means more cuts.' }
    ],
    tags: ['uv', 'seams', 'texel density', 'packing', 'unwrap', 'blender'] },
  {
    id: 'd2-02', title: 'Texture atlases and trim sheets', pillarId: 'D', phaseId: 'd2', moduleId: 'd2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24, diagram: null,
    concept:
'A **texture atlas** packs many objects’ UVs into *one* shared texture, so a whole kit of props or a modular building set draws from a single material. The payoff is performance: objects sharing one material can be batched, cutting **draw calls** (the per-object CPU cost from [[d0-02]]) and the number of textures the GPU juggles. For a modular level kit ([[d5-01]]), an atlas is often the difference between a scene that runs and one that stutters.\n\n' +
'A **trim sheet** is a specialised, reusable strip of horizontal details — edges, panels, pipes, bevels, grime borders — authored once at high quality. You then UV-map many different meshes onto *bands* of that one sheet: a wall, a door frame and a crate edge can all reuse the same metal trim. Because the detail repeats vertically (tiling along the strip), a trim sheet gives huge surface variety from a tiny amount of texture memory, and it’s the backbone of how AAA environments hit their density on a budget.\n\n' +
'The trade-offs are real, so choose deliberately:\n' +
'- **Atlas** — best when many *unique* objects each need their own spot and you want them on one material. Downside: you can’t tile a texture cleanly across an atlassed island, and one big texture can waste space if islands vary wildly in size.\n' +
'- **Trim sheet** — best for *architectural and hard-surface* detail that reads as repeating bands. Downside: it suits trims and panels, not organic or one-off hero surfaces.\n' +
'- **Unique unwrap** — best for a *hero* asset the player studies up close, where bespoke texel density beats sharing.\n\n' +
'This is a scope decision as much as a tech one: trim sheets and atlases let a small team dress a big level *fast*, which is exactly the feasibility win the minor rewards. The seam runs straight to the **level designer**, who builds the level from the kit your atlas/trim choices make cheap — and to the **graphics programmer** ([[e5-01]]), whose batching depends on shared materials.',
    task:
'Pick a small environment you could imagine building — say a sci-fi corridor or a medieval storeroom. List ~8 surfaces it needs (floor, wall, door, crate, pipe, panel, trim, hero console). For each, decide: **atlas**, **trim sheet**, or **unique unwrap**, and justify in one line. Then count how many distinct *materials* your choices imply — fewer is usually better for draw calls. The goal is to feel the trade-offs, not to texture anything yet.',
    success: [
      'You can explain how an atlas and a trim sheet each reduce draw calls and texture count.',
      'You can pick atlas vs trim sheet vs unique unwrap for a given surface and defend it.',
      'You can connect the choice to scope and to the level designer’s and programmer’s work.'
    ],
    skills: ['Texture atlases', 'Trim sheets', 'Material/draw-call budgeting', 'Texture reuse'],
    simplified: 'Batching rules and how many textures a material can carry are engine- and platform-specific; the "one material → fewer draw calls" idea is the durable principle, but profile your real target rather than trusting a rule of thumb.',
    goDeeper: 'Search for "trim sheet workflow" breakdowns from environment artists, and read your engine’s docs on static/dynamic batching and texture atlasing to see how the art choice and the runtime cost connect.',
    quiz: [
      { q: 'Why does putting a whole prop kit on one atlas help performance?', a: 'Because objects that share a single material can be batched into fewer draw calls, and the GPU binds one texture set instead of many. It trades a little per-object UV flexibility for a big reduction in the CPU-side cost of drawing lots of objects.' },
      { q: 'When is a trim sheet a better choice than an atlas?', a: 'For architectural / hard-surface detail that reads as repeating horizontal bands — edges, panels, pipes, grime borders — because many different meshes can reuse the same trim strip, giving lots of surface variety from very little texture memory. It’s poor for organic or one-off hero surfaces.' }
    ],
    tags: ['atlas', 'trim sheet', 'texture reuse', 'draw calls', 'modular', 'optimization'] },
  {
    id: 'd2-03', title: 'UV tricks: overlapping, mirroring, UDIM vs atlas', pillarId: 'D', phaseId: 'd2', moduleId: 'd2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24, diagram: null,
    concept:
'Three production UV tricks stretch your texture budget further — each with a catch worth knowing before you commit.\n\n' +
'**Overlapping UVs** — stack identical or repeated parts of a mesh on the *same* UV space so they share texels. The bolts around a wheel, the planks of a fence, the four legs of a table: unwrap one, overlap the rest on top. You get higher effective texel density for free, because all copies pull from the same patch. The catch: overlapping islands **cannot hold a unique baked map** (a normal/AO bake would write conflicting data to the same texels). The standard fix is to **offset the bake copies one UV tile across** while baking, then slide them back — so they bake unique but render shared.\n\n' +
'**Mirroring** — fold a symmetrical model so the left and right halves overlap, doubling texel density on a head, a character torso, a symmetrical machine. The catch: a *perfectly* mirrored texture looks artificial (text reads backwards, identical dirt on both sides). The pro move is to mirror the bulk for density, then add a small **unique overlay layer** (decals, asymmetric grime) on top so the eye doesn’t catch the symmetry.\n\n' +
'**UDIM vs atlas** — two answers to "one texture isn’t enough resolution":\n' +
'- An **atlas** ([[d2-02]]) packs everything into a *single* 0–1 texture — best for **real-time games**, because the engine wants few textures and batched materials.\n' +
'- **UDIM** spreads UVs across a *grid of numbered tiles* (1001, 1002, …), each its own texture — common in **film/offline** for enormous resolution. Most game engines don’t consume UDIMs natively, so for real-time you usually *collapse* a UDIM layout down into an atlas before export.\n\n' +
'The honest framing: these are *density-vs-uniqueness* trade-offs. Overlap and mirror buy resolution by giving up per-instance uniqueness; the right call depends on whether the player will ever notice the repeat — which loops back to scope, and to how close the **level designer** ([[c3-02]]) places the asset.',
    task:
'Take three assets — a symmetrical one (a helmet or car), a repeated-part one (a fence or a multi-bolt panel), and a hero one (a unique statue). For each, decide whether you’d use mirroring, overlapping, or a fully unique unwrap, and name the one *risk* your choice introduces (mirrored-looking symmetry, can’t-bake overlaps, or high texture cost). Then state, in one line, why a game asset would target an atlas rather than a UDIM layout.',
    success: [
      'You can explain how overlapping and mirroring raise texel density and what each costs.',
      'You can describe the bake-offset trick that lets overlapping UVs still bake uniquely.',
      'You can state why real-time games favour atlases over UDIMs.'
    ],
    skills: ['Overlapping UVs', 'UV mirroring', 'UDIM vs atlas', 'Density vs uniqueness trade-offs'],
    simplified: 'Engine UDIM support is version- and pipeline-dependent — some engines and renderers do handle UDIMs; "collapse to an atlas for real-time" is the common, safe default, not an absolute. Check your target engine before relying on either.',
    goDeeper: 'The Blender manual’s UDIM section and environment-artist breakdowns on "overlapping UVs and baking" show the offset-while-baking workflow concretely; pair them with your engine’s texture-import docs.',
    quiz: [
      { q: 'You overlapped the four identical legs of a table to save texture space, but now your normal-map bake is garbled. Why, and what’s the fix?', a: 'Because overlapping islands occupy the same texels, the baker writes conflicting normal data for each leg onto the same pixels. The fix is to offset the duplicate islands one UV tile across during the bake so each bakes uniquely, then move them back over the original so they share texels at render time.' },
      { q: 'Why do real-time game pipelines usually prefer an atlas over a UDIM layout?', a: 'Because engines want few textures and batched materials for performance, and most don’t consume UDIM tiles natively. UDIM suits film/offline where huge resolution matters more than draw-call cost; for games you typically collapse the layout into a single atlas before export.' }
    ],
    tags: ['overlapping uvs', 'mirroring', 'udim', 'atlas', 'texel density', 'baking'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
