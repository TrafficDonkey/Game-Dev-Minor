/* Pillar D · Phase d1 · Module d1a — Topology for games */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd1-01', title: 'Topology for games: tris, quads and what the GPU sees', pillarId: 'D', phaseId: 'd1', moduleId: 'd1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'((Topology)) is the *flow and arrangement* of your mesh’s faces and edges — not how many polygons, but how they’re laid out. For a render this is mostly an aesthetic concern. For a game it’s a hard requirement, because the mesh has to deform cleanly, accept a normal map without artefacts, subdivide into LODs, and be cheap to draw. Good topology is the difference between a model that *works* in-engine and one that fights you at every later stage.\n\n' +
'The first truth: **the GPU only ever draws triangles.** Quads and n-gons don’t exist at render time — the engine (or the exporter) ((triangulates)) everything before it reaches the GPU. So why model in quads at all? Because *you* and your tools work better with them:\n' +
'- **Quads predict deformation.** Edge loops of quads bend smoothly across joints; a quad-based shoulder or elbow deforms where you expect. (This feeds straight into rigging — see [[d4-01]].)\n' +
'- **Quads subdivide and retopologise cleanly**, which matters for generating LODs and for any subdivision work.\n' +
'- **Quads keep tools happy** — loop cuts, edge slides and many bake/UV tools assume quad flow.\n\n' +
'But quads are a *means*, not a rule. Triangles are completely legitimate in a final game mesh — much of a shipped asset *is* triangles, especially on flat, rigid, hard-surface areas that never deform. The honest guideline is: **quads where it deforms or where you still need to edit; triangles wherever they’re stable and cheaper.** A triangle that closes off a flat panel is fine; a stray triangle in the middle of a deforming cheek is a problem.\n\n' +
'The real point is *control*: you triangulate **deliberately** before export rather than letting the exporter guess, because an automatic triangulation can split a quad the "wrong" way and warp your baked normal map or pinch a shaded edge. Topology is where the modeller’s craft meets the [[d0-02]] performance budget and the graphics programmer’s shading — get it right and everything downstream gets easier.',
    task:
'Take one model you own (or open a free asset) and study its topology in wireframe. Find three regions and classify each: *(a)* an area that should be clean quads because it deforms or curves (a limb joint, a rounded surface), *(b)* an area where triangles are perfectly fine (a flat rigid panel, a bracket), and *(c)* any place where the flow looks wrong for its job. Write one sentence per region explaining *why* that topology suits — or doesn’t suit — what the surface has to do.',
    success: [
      'You can explain why the GPU only draws triangles yet artists still model in quads.',
      'You can name at least two concrete benefits of quad-based flow (deformation, subdivision/retopo, tool support).',
      'You can decide, for a given surface, whether quads matter there or triangles are fine.'
    ],
    skills: ['Reading topology', 'Quads vs tris reasoning', 'Triangulation awareness'],
    simplified: 'Whether the exporter or the engine triangulates, and exactly how a quad gets split, depends on your tool and its settings. The takeaway — triangulate deliberately for control rather than leaving it to chance — holds regardless of the specific pipeline.',
    goDeeper: 'For deformation-driven topology, study character-artist edge-flow breakdowns; for hard-surface, look at how panels and bevels are handled. Official Blender docs on triangulation and the "Triangulate" modifier cover the export side.',
    quiz: [
      { q: 'If the GPU only renders triangles, why bother modelling in quads?', a: 'Because quads serve the *authoring* and *deformation* stages: they predict how a surface bends, subdivide and retopologise cleanly, and keep modelling/UV/bake tools working as expected. The mesh still gets triangulated before the GPU sees it — quads are a means to a clean result, not a render-time requirement.' },
      { q: 'Are triangles ever acceptable in a finished game mesh?', a: 'Yes — triangles are completely fine, especially on flat, rigid, non-deforming hard-surface areas. The guideline is quads where it deforms or where you still need to edit, triangles wherever the surface is stable and a triangle is cheaper or simpler. Much of a shipped asset is triangles.' },
      { q: 'Why triangulate your mesh deliberately before export instead of letting the exporter do it?', a: 'Because an automatic triangulation can split a quad the wrong way, which can warp a baked normal map or pinch a shaded edge. Triangulating yourself gives you control over how each quad divides, so the in-engine shading and bake match what you authored.' }
    ],
    tags: ['topology', 'quads', 'triangles', 'deformation', 'game-ready'] },
  {
    id: 'd1-02', title: 'Silhouette-first, detail-where-it-counts modelling', pillarId: 'D', phaseId: 'd1', moduleId: 'd1a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'A real-time asset has a tight [[d0-02]] poly budget, so the question is never "where can I add detail?" — it’s "**where does detail actually pay for itself?**" The answer almost always starts with the ((silhouette)): the outline shape the player reads at a glance, from across the room, before any texture loads. A strong silhouette sells the asset; a muddy one no amount of texturing rescues.\n\n' +
'Spend your polygons in priority order:\n' +
'- **Silhouette first.** Geometry that changes the outline — a curved blade, a flared muzzle, a rounded helmet — *must* be real geometry, because a normal map cannot fake an edge against empty space. This is where polys earn their keep.\n' +
'- **Then the high-frequency reads near the eye** — surfaces the player gets close to.\n' +
'- **Everything else is texture.** Surface bumps, panel lines, screws, fabric weave, scratches: those go into the normal and other PBR maps on a flat-ish low-poly, not into geometry. (This is the [[d3-04]] bake and the [[d3-01]] map set.)\n\n' +
'The classic test for a curved silhouette edge is the **n-gon-free outline check**: orbit the model against a plain background and watch the *outline* faceting. If a curve reads as obvious flat chords, it needs more loops *there* — and nowhere else. Add geometry where the silhouette breaks; never add it uniformly "to be safe", which just burns budget.\n\n' +
'This is also a seam. Your silhouette decisions drive what the [[c0-01]] level designer can read at distance, and the budget you hold here is the budget the [[e5-01]] graphics programmer has to draw the whole scene. Silhouette-first isn’t an art-school nicety — it’s the most efficient possible use of a scarce resource, and it’s exactly the discipline that separates a render habit from a game-ready one.',
    task:
'Block out and refine ONE simple game prop in Blender with a strict, self-imposed triangle budget (pick a number — say 600 tris — and hold to it). Start from the silhouette, add loops only where the outline faceting shows, and consciously decide which details you are *deferring to a texture* rather than modelling. Keep a one-line tally of where every chunk of your budget went, then write two sentences naming what you chose NOT to model and why.',
    steps: [
      'Gather quick reference and identify the asset’s key *silhouette* — the 2–3 shapes that make it recognisable from far away.',
      'Block the primary forms with cheap primitives; ignore detail entirely at first. Set a triangle budget now, before modelling.',
      'In Blender, turn on the statistics overlay ([[N]] panel → View, or the Overlays dropdown → Statistics) to watch your tri count live as you work.',
      'Orbit the model against a plain background and check the OUTLINE for flat-chord faceting. Add edge loops ([[Ctrl+R]]) only where the silhouette breaks.',
      'For every bump, panel line, screw or scratch you’re tempted to model, ask: does it change the silhouette? If no, list it as "→ normal map" instead of adding geometry.',
      'Do a final budget tally: note roughly how many triangles each region cost, and confirm you’re at or under your self-imposed budget.'
    ],
    success: [
      'You modelled a prop at or under a self-imposed triangle budget.',
      'Your geometry is concentrated where it changes the silhouette, not spread uniformly.',
      'You can name specific details you deliberately deferred to a texture/normal map instead of modelling.'
    ],
    skills: ['Silhouette-first modelling', 'Budget-driven decisions', 'Detail triage (geo vs texture)'],
    simplified: 'Exact Blender menu locations (the statistics overlay, the Overlays dropdown) move between versions — check your build if a path differs. The 600-triangle figure is an arbitrary teaching constraint, not a real-world standard; real budgets depend on the asset’s role and the [[d0-02]] target hardware.',
    goDeeper: 'Watch a prop or weapon artist’s timelapse that calls out silhouette and budget decisions out loud; the running commentary on "this stays geo, this becomes texture" is the lesson.',
    quiz: [
      { q: 'Why must silhouette-defining edges be real geometry rather than a normal map?', a: 'A normal map only fakes the *direction surfaces face* to perturb lighting — it can’t change where the mesh ends against empty space. The outline is true geometry, so a curve, a flared edge or a notch in the silhouette must be modelled; the normal map handles only surface detail *within* the shape.' },
      { q: 'You have spare triangles left in your budget. Where should they go?', a: 'Where the silhouette still reads as faceted, or onto the high-frequency surfaces the player sees up close — not spread evenly across the model. Adding loops uniformly "to be safe" wastes budget on areas no one scrutinises; spend on the outline and the focal areas first.' }
    ],
    tags: ['silhouette', 'poly budget', 'detail triage', 'blockout', 'real-time'] },
  {
    id: 'd1-03', title: 'Common topology traps (n-gons, poles, shading)', pillarId: 'D', phaseId: 'd1', moduleId: 'd1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'Even with a good silhouette and a sane budget, specific topology mistakes will bite you at bake and shading time. Knowing the common traps lets you spot and fix them *before* they cost you a re-bake. Here are the ones that actually matter for game meshes.\n\n' +
'- **N-gons** — faces with more than four sides. They triangulate unpredictably, can render wrong, and frequently break bakes and shading on curved surfaces. A flat n-gon on a rigid panel might survive; an n-gon on anything curved or deforming is asking for trouble. Resolve them into tris/quads before you bake.\n' +
'- **Poles** — vertices where an unusual number of edges meet. A **((pole))** with 5 edges (an *E-pole*) or 3 edges (an *N-pole*) is normal and useful for redirecting edge flow, but placing one on a smooth curved surface pinches the shading and can smear a normal-map bake. Keep poles off prominent curves and out of deforming areas; tuck them into flat regions where the shading hides them.\n' +
'- **Shading artefacts** — dark smudges, hard pinches or banding usually trace back to one of three causes: bad topology (poles/n-gons in the wrong place), wrong **((smoothing / normals))** (a face marked smooth that should be hard, or vice versa), or a missing/incorrect hard edge. Real-time engines lean on **smoothing groups / hard edges** plus the normal map to get clean shading — and crucially, *your hard edges must match your UV seams* for the [[d3-05]] tangent-space normal bake to be clean.\n' +
'- **Long thin slivers and tiny triangles** — these shade poorly, can flicker, and waste vertices; avoid needle-thin faces, especially where they catch light.\n\n' +
'The unifying idea: **most "my normal map looks wrong" problems are really topology, smoothing, or seam problems upstream.** Before you blame the bake, audit the mesh. This is the seam where your topology discipline meets the [[d3-04]] baking stage and the [[d3-05]] normal-map rules — clean topology now saves hours of re-baking later.',
    task:
'Build a short personal "topology audit" checklist (5–7 items) you can run on any asset before exporting it — e.g. "no n-gons on curved/deforming surfaces", "no poles on prominent curves", "hard edges match UV seams", "no needle-thin tris". Then apply it to one model you own: list every issue you find and, for each, write the one-line fix. The deliverable is the checklist plus your findings on the real asset.',
    success: [
      'You can define n-gons and poles and say when each is harmless versus harmful.',
      'You can trace a shading artefact to at least three possible upstream causes (topology, smoothing/normals, seams).',
      'You can state the rule that hard edges should match UV seams for a clean tangent-space normal bake.'
    ],
    skills: ['Spotting topology traps', 'Diagnosing shading artefacts', 'Pre-export auditing'],
    simplified: 'The hard-edge-equals-UV-seam guidance is the safe default for tangent-space normal baking and resolves most cases; some pipelines and synced bakers relax it, but matching them is the reliable rule when you’re unsure. Exact tool terms (smoothing groups vs split normals) vary by software.',
    goDeeper: 'Read up on tangent-space normal baking and "why is my normal map showing seams/gradients" guides; the recurring answer is hard edges, UV seams and a synced baker. Blender’s docs on Auto Smooth / custom split normals cover the shading side.',
    quiz: [
      { q: 'Are poles always bad?', a: 'No. Poles (vertices where an unusual number of edges meet, like 3-edge N-poles and 5-edge E-poles) are normal and useful for redirecting edge flow. They only cause problems when placed on smooth, prominent curves or in deforming areas, where they pinch shading and can smear a normal bake. Tuck them into flat, hidden regions.' },
      { q: 'Your normal map shows a visible seam or a dark pinch in-engine. Name two upstream things to check before re-baking.', a: 'Check that your hard edges line up with your UV seams (a tangent-space normal bake expects them to match), and check the topology/smoothing at the artefact — a pole or n-gon on a curve, or a face set smooth that should be hard. Most "bad bake" problems are really topology, smoothing or seam problems upstream.' },
      { q: 'Why is an n-gon riskier on a curved surface than on a flat rigid panel?', a: 'N-gons triangulate unpredictably, and on a curved surface the chosen split changes how the face shades and how the normal map bakes, producing artefacts. A flat rigid panel has no curvature for a bad split to distort, so a flat n-gon is far more likely to survive — though resolving them before baking is still safest.' }
    ],
    tags: ['topology', 'n-gons', 'poles', 'shading', 'normal map', 'baking'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
