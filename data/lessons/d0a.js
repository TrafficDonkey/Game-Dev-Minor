/* Pillar D · Phase d0 · Module d0a — The real-time mindset
 * GOLD-STANDARD EXEMPLAR MODULE (game-ready 3D; assumes Blender skill). Anchor: d0-01. */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd0-01', title: '"Pretty render" vs "game-ready asset": what actually changes', pillarId: 'D', phaseId: 'd0', moduleId: 'd0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 22, diagram: 'assetcheck',
    concept:
'You already know Blender — so this pillar is not about modelling. It’s about the leap from a **render** (one beautiful frame your PC can take its time on) to a **game-ready asset** (a thing an engine must draw 60+ times a second, from any angle, alongside hundreds of others). The model might look identical in a viewport; what changes is everything *under* the surface.\n\n' +
'A render can afford millions of polygons, subdivision surfaces, ray-traced everything, procedural materials evaluated offline, and a 20-second frame time. A real-time asset cannot. The engine has a **frame budget** — at 60 fps it has ~16 ms to draw the *entire scene* — so each asset must be cheap. That forces a different set of priorities:\n' +
'- **Polygons are budgeted**, not free. A hero prop might get a few thousand triangles; a background rock gets a few hundred. (See [[d0-02]].)\n' +
'- **Detail moves from geometry into textures.** Bumps, seams and panel lines that a render would model are instead *baked* into a **normal map** on a low-poly mesh. (See [[d3-04]].)\n' +
'- **Materials must be real-time PBR** — a fixed set of texture maps the GPU reads, not a procedural node tree evaluated offline. (See [[d3-01]].)\n' +
'- **Topology and UVs matter**, because the mesh deforms, gets LODs, and shares texture space. A render doesn’t care about clean quads; a game does.\n' +
'- **It must export and import cleanly** — correct scale, sane pivot, consistent naming, FBX/glTF. (See [[d5-03]].)\n\n' +
'The mindset shift is from *"how good can this look?"* to *"how good can this look **for its cost**?"* — efficiency as a creative constraint. That constraint is also a seam: the **level designer** builds from your assets, and the **graphics programmer** writes the shaders that draw them, so your budgets and conventions affect their work directly. Get this mindset and the rest of the pillar is detail.',
    task:
'Open the **Game-ready 3D checklist** above and skim the categories — poly budget, UVs, LODs, materials, naming, export. Then take one Blender model you already have (or a free asset you can open) and write down three things that make it a *render* rather than a *game asset*: e.g. a subdivision modifier left on, no UVs (or auto-UVs), a 4-million-tri sculpt with no low-poly, a procedural material that can’t export. For each, name what you’d do instead for real-time.',
    success: [
      'You can explain the frame-budget reason real-time assets must be cheap.',
      'You can list at least four ways a game asset differs from a render asset.',
      'You can look at one of your own models and spot what makes it "render-only".'
    ],
    skills: ['Real-time mindset', 'Render vs game asset', 'Efficiency as a constraint'],
    simplified: 'Frame and poly budgets vary hugely by platform and engine — a PC game and a mobile game live in different worlds. The ~16 ms / 60 fps figure is the common PC target; treat all specific numbers as ballpark, and always profile the real target.',
    goDeeper: 'The free learning materials around real-time art (e.g. the official Unity and Unreal docs on importing meshes, and community game-art breakdowns) are the best next step; search "game ready asset workflow" from established environment artists.',
    quiz: [
      { q: 'Your sculpt looks amazing in Blender but tanks the engine’s frame rate. What’s the game-art fix, in one sentence?', a: 'Retopologise to a low-poly mesh and bake the sculpt’s detail into a normal map (plus the other PBR maps), so the engine draws a cheap mesh that *looks* high-poly — detail moves from geometry into textures.' },
      { q: 'Why is "how good for its cost?" the real-time artist’s question?', a: 'Because the engine must draw the whole scene within a tiny frame budget, every asset competes for that budget. An asset that looks 5% better but costs 3× the performance is usually the wrong call — efficiency is part of the craft, not separate from it.' }
    ],
    tags: ['game-ready', 'real-time', 'poly budget', 'normal map', 'pipeline'] },
  {
    id: 'd0-02', title: 'Poly budgets and the performance triangle', pillarId: 'D', phaseId: 'd0', moduleId: 'd0a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'assetcheck',
    concept:
'A **poly budget** is the rough triangle (and draw-call, and texture) allowance an asset gets so the whole scene fits the frame. Beginners obsess over a single model’s triangle count; pros think about the **whole frame** — because the GPU draws *everything at once*, and the bottleneck is often not where you expect.\n\n' +
'A useful mental model is a **performance triangle** of three costs that trade off:\n' +
'- **Geometry** — triangle and vertex count. More polys = more vertex work and memory.\n' +
'- **Draw calls / batches** — how many separate "draw this" commands the CPU sends the GPU. A hundred tiny unique objects can be *slower* than one big one, even with fewer triangles, because each call has overhead. This is why **modular kits sharing a material** (and atlasing) are so powerful.\n' +
'- **Overdraw / shading** — how expensive each pixel is to shade, and how many times you draw over the same pixels (transparency and dense foliage are the classic offenders).\n\n' +
'So "is 8,000 triangles too many?" has no answer without context: *for what platform, how many on screen, how close, how expensive is its material?* A single hero weapon at 15k can be fine; a tree at 15k that you place 500 times is a disaster. The honest rule is: **budgets are relative and you must profile the real target**. Mobile and VR are far tighter than a desktop with your RTX 3060 Ti.\n\n' +
'Two habits make you valuable to a team. First, **spend polys on silhouette and where the eye goes** — the reads-at-a-glance shape and the parts the player sees up close — and starve the rest. Second, **think in scenes, not assets**: ask "if there are 30 of these on screen, what does that cost?" That instinct is exactly what the level designer ([[c3-02]]) and graphics programmer ([[e5-01]]) need from you.',
    task:
'Pick three asset *roles* for an imagined small game: a **hero** object the player sees up close (e.g. a weapon), a **mid-ground** prop (a crate), and a **background** filler placed many times (a rock or a tree). Without looking anything up, assign each a *relative* triangle budget and justify it in one line — then say which of geometry, draw calls, or overdraw is the biggest risk for each. The point is the reasoning, not the exact numbers.',
    success: [
      'You can explain why a frame’s cost is more than the sum of triangle counts.',
      'You can name the three corners of the performance triangle.',
      'You can budget relatively by an asset’s role and on-screen count.'
    ],
    skills: ['Poly budgeting', 'Draw calls & batching', 'Thinking in scenes'],
    simplified: 'Real budgets depend on the engine, platform and your target hardware; the "performance triangle" is a teaching model, not an exact accounting. Always profile the actual target rather than trusting a single triangle number.',
    goDeeper: 'Engine profiler docs (Unity Profiler, Unreal’s stat/Insights) are the real teachers here — they show whether you’re bound by the CPU (draw calls) or the GPU (shading/overdraw). Learning to read a frame is the skill.',
    quiz: [
      { q: 'A scene runs slowly but the triangle count is low. Name two likely culprits.', a: 'Too many draw calls (lots of small, unique objects each issuing their own command — fix with batching / shared materials / atlasing) or heavy overdraw and expensive shading (transparency, dense foliage, costly materials). Low triangles doesn’t mean cheap.' },
      { q: 'Why can the same 10k-triangle model be "fine" in one place and "a disaster" in another?', a: 'Because cost is contextual: 10k for a single hero object the player studies up close is reasonable, but 10k for a rock placed 500 times multiplies into millions of triangles and many draw calls. Budget by role and on-screen count, not by the asset alone.' }
    ],
    tags: ['poly budget', 'draw calls', 'batching', 'overdraw', 'optimization'] },
  {
    id: 'd0-03', title: 'The asset pipeline: from concept to engine', pillarId: 'D', phaseId: 'd0', moduleId: 'd0a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    concept:
'Before drilling into topology, UVs and PBR, it helps to see the **whole asset pipeline** — the route every game model takes from idea to a thing running in the engine. Knowing the map keeps you from polishing step three while step six is broken.\n\n' +
'A typical game-ready prop pipeline:\n' +
'- **Reference & blockout** — gather reference, then rough the shape at the correct real-world *scale* to lock proportions and silhouette.\n' +
'- **High-poly** (when needed) — sculpt or hard-surface the detailed version that holds all the fine forms. Not every asset needs one.\n' +
'- **Low-poly / retopo** — build the efficient mesh the game will actually run, with clean topology and a good silhouette. (See [[d1-01]].)\n' +
'- **UV unwrap** — lay the low-poly’s surface out flat with sensible seams and texel density. (See [[d2-01]].)\n' +
'- **Bake** — transfer the high-poly’s detail (normals, AO, curvature) onto the low-poly’s UVs. (See [[d3-04]].)\n' +
'- **Texture** — author the PBR maps (albedo, roughness, metallic, normal, AO). (See [[d3-02]].)\n' +
'- **Export & import** — out as FBX/glTF at correct scale and naming; into the engine with the right import settings; assign a real-time material. (See [[d5-03]].)\n' +
'- **Validate in-engine** — check it at game distance, in game lighting, at its LODs, and against budget.\n\n' +
'Two truths about pipelines. First, they’re **iterative, not strictly linear** — you’ll bounce back to fix a UV after baking, or simplify the low-poly after profiling. Second, **the pipeline is shared** — your naming, scale and export choices land in the level designer’s scene and the programmer’s prefab, so discipline here is teamwork, not pedantry. A messy export is *their* bug. Treat "exports clean and runs in-engine at budget" as the real definition of *done* — a gorgeous Blender file that won’t import is not finished.',
    task:
'Write out the pipeline for **one** asset you’d like to make for a small game, as a checklist of the stages above — and beside each stage, note whether *this particular asset* actually needs it (does a simple crate need a high-poly sculpt and a bake? probably not). Deciding which stages to skip for a given asset is a real game-art skill, not laziness.',
    success: [
      'You can list the stages of a game-ready asset pipeline in order.',
      'You can decide which stages a given asset does and doesn’t need.',
      'You can state why "done" means "runs in-engine at budget", not "looks good in Blender".'
    ],
    skills: ['Asset pipeline', 'Scoping an asset', 'Definition of done'],
    goDeeper: 'Follow one complete "prop breakdown" from an experienced environment or prop artist (many post free breakdowns) to see the full pipeline on a single object end to end.',
    quiz: [
      { q: 'Does every game asset need a high-poly sculpt and a bake?', a: 'No. Simple hard-surface or low-detail assets (a plain crate, a basic wall) can be modelled directly as the low-poly and textured without a high-poly or bake. Part of the craft is choosing the shortest pipeline that meets the quality bar for that asset’s role.' },
      { q: 'Why is "looks great in Blender" not the same as "done"?', a: 'Because the asset has to export at correct scale and naming, import cleanly, run within budget, and read well in the game’s lighting and at game distance and LODs. A model that won’t import or blows the budget isn’t finished, however good the Blender viewport looks.' }
    ],
    tags: ['pipeline', 'workflow', 'retopo', 'bake', 'definition of done'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
