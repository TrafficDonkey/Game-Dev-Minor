/* Pillar D · Phase d3 · Module d3b — Baking */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd3-04', title: 'Baking high-poly detail to a low-poly mesh', pillarId: 'D', phaseId: 'd3', moduleId: 'd3b',
    difficulty: 'Advanced', mode: 'handson', estMinutes: 38,
    prereq: '[[d3-01]] (the PBR maps) and [[d2-01]] (clean UVs) first',
    concept:
'Baking is the trick that lets the whole real-time pipeline work: it **transfers detail from a high-poly mesh onto a low-poly mesh’s textures**, so the engine draws a cheap mesh that *looks* like the expensive one. This is the payoff of the render-vs-game-asset split from [[d0-01]] — millions of sculpted polygons become a few thousand triangles plus a ((normal map)) and friends.\n\n' +
'Mechanically, a baker shoots a **ray** outward from every point on the low-poly surface, finds where it hits the high-poly, and records what it found there — the high-poly’s surface direction (→ normal map), its occlusion (→ AO), its curvature, and so on, written into the low-poly’s UV layout ([[d2-01]]). Two things control those rays:\n' +
'- **The cage / ray distance.** Rays only search a short distance out and in. Too short and rays miss the high-poly (holes, black artifacts); too long and a ray meant for one panel catches a *neighbouring* form (intersection errors). A **cage** is an inflated copy of the low-poly that aims the rays cleanly; many bakers offer it, or an automatic "max frontal/rear distance" instead.\n' +
'- **Matching by name.** Bake one piece against the wrong neighbour and you get garbage where two parts overlap. The fix is **name-matched bake groups** — pair `bolt_low` only with `bolt_high` (a `_low` / `_high` suffix convention, sometimes via "Match by Mesh Name").\n\n' +
'The classic artifacts and their causes are worth memorising: **skewing / waviness** near hard edges (the low-poly normals lean, dragging the projection — fixed by a cage or by adding supporting geometry), **black or transparent spots** (rays missed — widen distance or fix the cage), and **bleeding seams** (no padding — turn up **dilation / edge padding** so colour spreads past the UV island and survives ((mipmapping))). Bake at higher resolution and downsize, and bake with **anti-aliasing** on. Done right, a bake is invisible; done wrong, it’s the single most common reason a student asset looks broken in-engine.',
    task:
'Take a high-poly form you’ve made (or any sculpt) and its low-poly retopo with finished UVs, and bake a **normal map** plus an **AO map** from high to low — following the steps below in Blender or a dedicated baker (Marmoset Toolbag, Substance Painter/Designer, or xNormal). Then deliberately *break* it: shorten the ray/cage distance until you get black artifacts, and lengthen it until you get intersection errors, so you can recognise each failure on sight. Write one line per artifact: what it looked like and which control fixed it.',
    steps: [
      'Prep names: suffix your meshes `<name>_low` and `<name>_high` so the baker can pair them automatically. Make sure the low-poly has non-overlapping UVs ([[d2-01]]) — overlapping islands bake on top of each other.',
      'Set hard/soft edges deliberately on the low-poly. A bake reads the low-poly’s shading; mismatched smoothing fights the normal map ([[d3-05]] covers the smoothing-group + UV-seam rule).',
      'Position both meshes in the *same* spot (overlapping). In Blender: select high, then low, **Render Properties → Bake** with `Selected to Active` ticked; in a dedicated baker, load the `_low`/`_high` pair into a bake group.',
      'Choose a cage or ray distance. Start with the baker’s auto distance, then add an explicit cage (an inflated low-poly copy) for any piece showing skew near hard edges.',
      'Bake the **normal map** first at 2× your target resolution (e.g. bake 2K for a 1K target), anti-aliasing on, then down-res. Check tangent-space settings now ([[d3-05]]) — getting them wrong wastes the bake.',
      'Bake the **AO map** in the same pass or a second one. Keep the same UVs and resolution so every map registers pixel-for-pixel.',
      'Add **edge padding / dilation** (8–16 px is a safe default at 1–2K) so island edges bleed outward and seams survive mipmaps.',
      'Inspect at 100%: hunt for black spots (rays missed → widen distance / fix cage), waviness near hard edges (skew → cage or supporting loops), and visible seam lines (raise padding). Re-bake only the broken map.'
    ],
    success: [
      'You can explain baking as ray-casting from the low-poly to the high-poly, recorded into the low-poly’s UVs.',
      'You can name the three big bake artifacts (skew, missed-ray black spots, seam bleed) and the control that fixes each.',
      'You can set up a name-matched, caged bake and produce a clean normal + AO map.'
    ],
    skills: ['High-to-low baking', 'Cages & ray distance', 'Diagnosing bake artifacts', 'Name-matched bake groups'],
    simplified: 'Exact menu paths and cage controls differ between Blender, Marmoset, Substance and xNormal, and between versions — treat the click-paths as the *shape* of the workflow and check your tool’s current docs. Padding pixel counts scale with texture resolution; the numbers given are ballpark for 1–2K.',
    goDeeper: 'Marmoset Toolbag’s baking documentation and the Substance baking guides are the clearest references on cages, skew and per-mesh-name matching; the classic "Bake busters" community write-ups catalogue every artifact with pictures.',
    quiz: [
      { q: 'What is a "cage" in baking and what problem does it solve?', a: 'A cage is an inflated copy of the low-poly mesh that controls the direction and length of the projection rays. It solves skewing and intersection errors: instead of rays shooting along the low-poly’s leaning normals (which warp the bake near hard edges) or catching the wrong neighbouring form, the cage aims them outward cleanly so each ray hits the intended part of the high-poly.' },
      { q: 'You bake a complex part and get black, garbled patches where two pieces of the model are close together. Two likely causes?', a: 'Either the ray distance / cage is too large so rays meant for one surface are hitting a neighbouring form (intersection error — shrink the distance or split the parts into separate name-matched bake groups), or the meshes aren’t name-matched so unrelated geometry is being projected onto each other. Isolating pieces with `_low`/`_high` pairs usually clears it.' },
      { q: 'Why bake at a higher resolution than your target and add edge padding?', a: 'Baking high then down-sizing gives free anti-aliasing, so edges and fine detail stay crisp instead of jagged. Edge padding (dilation) bleeds each UV island’s colour outward past its border so that texture filtering and mipmapping don’t pull the empty space between islands into the visible surface, which would show as dark seam lines in-engine.' }
    ],
    tags: ['baking', 'normal map', 'cage', 'high-poly', 'low-poly', 'artifacts'] },
  {
    id: 'd3-05', title: 'Normal maps: tangent space, sync and pitfalls', pillarId: 'D', phaseId: 'd3', moduleId: 'd3b',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 30,
    prereq: '[[d3-04]] (baking) first',
    concept:
'A ((normal map)) is the workhorse of real-time detail, and it’s also where a clean asset most often goes subtly wrong in-engine. The map stores, per texel, a **surface direction** — encoded as RGB, where the channels are the X, Y, Z components of the normal vector remapped to 0–1. That bluish colour you see is "mostly pointing straight out" (a normal near `(0,0,1)` reads as `(128,128,255)`).\n\n' +
'**Tangent space vs object space.** A *tangent-space* normal map stores directions *relative to the surface*, so it stays correct as the mesh bends, animates and is reused — which is why it’s the default for characters and most props. An *object-space* map stores directions in the model’s own space; it can be slightly cheaper and tolerant of UV issues but only suits rigid, non-mirrored, non-instanced meshes. Pick tangent space unless you have a specific reason.\n\n' +
'The pitfall that eats hours is **tangent-basis sync**. A tangent-space map is only meaningful against the exact tangent basis it was baked with. If your *baker* and your *engine* compute tangents differently, the lighting goes faintly wrong — soft waviness, a "greasy" look, wrong highlights. The fix is a **synced workflow**: bake and render with the same tangent basis. The de-facto standard is **MikkTSpace**, which Blender, Substance, Marmoset and Godot (and the other major engines) can all share — Godot generates MikkTSpace-compatible tangents, so use it on both ends and the bake matches.\n\n' +
'Two more channel-level traps:\n' +
'- **Green-channel (Y) convention.** **OpenGL** maps (Y+ up) and **DirectX** maps (Y- down) differ only in the green channel’s direction. Feed an engine the wrong one and every bump reads *inverted* — dents look like bumps. Match the convention or flip green. (**Godot wants OpenGL-style**; many tools default to DirectX, so flip green on export or in the import settings — always check your version.)\n' +
'- **Smoothing groups + UV seams.** Hard edges need a UV seam, and the bake must use the same smoothing. Mismatch shows as harsh gradients or seams that won’t hide. Keep one rule: a hard edge is a UV seam.\n\n' +
'Finally, **don’t over-compress**: normal maps need an appropriate format (engines have a "Normal Map" import flag that picks one) — generic colour compression mangles them.',
    task:
'Write a one-page **normal-map sanity checklist** you’ll run on every asset before it ships to the engine, turning this lesson into a habit. It must cover, in plain "check that…" language: tangent vs object space chosen on purpose; baker and engine using the *same* tangent basis (MikkTSpace where available); the Y/green convention matching the engine (OpenGL vs DirectX); hard edges paired with UV seams and consistent smoothing; and the engine import flag set to "normal map" so it isn’t colour-compressed. For each item, note the *symptom* you’d see in-engine if it were wrong.',
    success: [
      'You can explain why a tangent-space normal map needs the baker and engine to share a tangent basis.',
      'You can diagnose an inverted normal map (DirectX/OpenGL green-channel mismatch) from the "dents look like bumps" symptom.',
      'You can state the rule linking hard edges, UV seams and smoothing, and why normal maps need a non-colour compression format.'
    ],
    skills: ['Tangent vs object space', 'Tangent-basis sync (MikkTSpace)', 'OpenGL/DirectX normal convention', 'Normal-map import settings'],
    simplified: 'Godot expects OpenGL-style green, but exactly which tools expose a MikkTSpace toggle and where each baker hides the green-flip is version- and tool-dependent — verify against your current Godot version and baker rather than trusting a remembered default. The 0–255 encoding numbers are the common 8-bit case; some pipelines use higher bit depth.',
    goDeeper: 'The "Normal Map Compositing" and tangent-space articles by Morten Mikkelsen (the MikkTSpace author), plus your engine’s normal-map import documentation, are the authoritative sources; this baking detail feeds the real-time materials of [[d3-03]] and the shader work in [[e5-02]].',
    quiz: [
      { q: 'Your normal map looks "off" in the engine — soft, greasy, highlights in the wrong place — even though it baked fine. Most likely cause?', a: 'A tangent-basis mismatch: the baker and the engine are computing tangents differently, so a tangent-space map authored against one basis is being lit against another. Sync them — use the same basis on both ends (MikkTSpace is the common shared standard supported by Blender, Substance, Marmoset and the major engines).' },
      { q: 'All the bumps on your surface read as dents (and dents as bumps). What single setting is wrong?', a: 'The green-channel (Y) convention. OpenGL-style maps and DirectX-style maps differ only in the direction of the green channel, so feeding an engine the opposite convention inverts every bump. Flip the green channel or re-export in the engine’s expected convention.' },
      { q: 'Why pair every hard edge with a UV seam, and why not use ordinary texture compression on a normal map?', a: 'A hard edge means the surface shading splits, and the normal map can only carry that split cleanly if the UVs are also split there — otherwise you get harsh gradients or visible seams. Ordinary colour compression is tuned for perceptual colour, not vector data, so it corrupts the precise XYZ directions a normal map stores; engines provide a dedicated normal-map format/flag instead.' }
    ],
    tags: ['normal map', 'tangent space', 'mikktspace', 'directx vs opengl', 'smoothing', 'compression'] },
  {
    id: 'd3-06', title: 'Baking AO, curvature and the rest of the set', pillarId: 'D', phaseId: 'd3', moduleId: 'd3b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'The normal map gets the attention, but a full bake produces a **set of supporting maps** that you rarely ship directly — instead they *drive* your texturing. These are the "mesh maps" a smart-material workflow ([[d3-02]]) reads to know where dirt, wear and grime should fall, so the surface looks authored rather than uniform. Knowing what each one represents turns texturing from guesswork into something predictable.\n\n' +
'The common set, and what each captures:\n' +
'- **Ambient Occlusion (AO)** — how shadowed each point is by nearby geometry (crevices, contact). Drives soft shadowing in cavities and grounds parts together. Often multiplied into albedo or fed to the shader.\n' +
'- **Curvature** — convex (edges) vs concave (creases). The key map for **edge wear**: convex highlights become scuffs and exposed metal, concave lines collect grime.\n' +
'- **Thickness** — how "thin" the mesh is at each point (rays cast inward). Drives subsurface effects and where translucency or trapped dirt reads.\n' +
'- **Position** (world/bounding-space gradient) — lets you mask top-vs-bottom or front-vs-back, e.g. dust settling on upward faces, water streaks running down.\n' +
'- **Material/Object ID** — flat colour zones baked from your high-poly’s materials or mesh parts, so you can select "all the rubber" or "all the brass" in one click and texture them separately.\n' +
'- **World-space normal** — the surface direction in world space, used by some smart masks (e.g. directional dirt).\n\n' +
'Two practical truths. First, these maps **bake from the same high-to-low projection** as the normal map ([[d3-04]]) — same UVs, same cage, same name-matched groups — so bake them together and they register pixel-perfect. Second, they’re **inputs, not outputs**: AO might get baked into the final albedo/exported as its own channel, but curvature, thickness, position and ID usually live only in your texturing app, feeding generators. They’re scaffolding that makes a believable, art-directed surface fast — exactly the leverage a solo dev needs to texture a kit ([[d5-01]]) without hand-painting every panel.',
    task:
'Bake the **full supporting set** (AO, curvature, thickness, position, material ID, world-space normal) for the asset you baked in [[d3-04]], using your baker’s "bake all mesh maps" option, then open each one and write one line: *what is this map showing, and what texturing decision would I drive with it?* Finish by using two of them — most usefully curvature for edge wear and AO for crevice grime — to mask a simple dirt or wear layer, proving you can turn a bake into a believable surface rather than just looking at it.',
    steps: [
      'Reuse the exact bake setup from [[d3-04]] — same `_low`/`_high` name-matched groups, same UVs, same cage/distance — so every map lines up pixel-for-pixel with the normal map.',
      'For the **Material/Object ID** map, assign distinct flat colours (or separate mesh parts) on the high-poly first; the baker reads those into clean ID zones you can mask by.',
      'Run "bake all" / mesh maps: AO, curvature, thickness, position, world-space normal, and ID in one pass at your target resolution.',
      'Open each map at 100% and sanity-check: AO should darken crevices not whole panels; curvature should show bright edges and dark creases; ID zones should be crisp, not bleeding (raise padding if they bleed).',
      'In your texturing app, plug **curvature** into an edge-wear generator and **AO** into a crevice-grime mask — adjust their contrast/range to taste rather than accepting defaults.',
      'Use the **ID map** to confine a material (e.g. paint only the metal parts) so different surfaces wear differently.',
      'Decide per map whether it ships: AO often does (own channel or multiplied into albedo); curvature, thickness, position and world normal usually stay as authoring inputs only.'
    ],
    success: [
      'You can name the common supporting maps and say what surface information each one captures.',
      'You can explain why these maps bake from the same projection as the normal map and must share UVs and cage.',
      'You can use curvature and AO to drive edge wear and crevice grime instead of hand-painting them.'
    ],
    skills: ['Baking mesh maps (AO, curvature, thickness, position, ID)', 'Driving smart masks from bakes', 'Material/object ID setup'],
    simplified: 'Map names and the exact "bake all" workflow vary by tool (Substance, Marmoset, Blender add-ons) and version — the *concepts* transfer even when a menu calls thickness "transmission" or splits position into separate axes. Whether AO is baked into albedo or kept separate is a project decision, not a fixed rule.',
    goDeeper: 'Substance Painter/Designer’s documentation on baking and on generators/mask-builders is the best practical reference for how each mesh map feeds smart materials; pair it with any "from bake to textured prop" breakdown to see the maps used end to end ([[d3-02]]).',
    quiz: [
      { q: 'You want convincing edge wear — scuffs on raised edges, grime in the recesses — without hand-painting it. Which baked maps drive that, and how?', a: 'Curvature drives the edge wear: its convex (bright) areas mark raised edges where a wear/scuff generator exposes the material beneath, and its concave (dark) areas mark creases. Ambient occlusion drives the crevice grime: its dark cavities mask where dirt accumulates. Both are baked from the same projection as the normal map and fed into generators rather than painted.' },
      { q: 'Why is a Material/Object ID map useful, and what do you do on the high-poly to get a clean one?', a: 'An ID map gives flat, selectable colour zones so you can mask and texture "all the rubber" or "all the brass" in one click, letting different surfaces wear and shade differently. To get a clean one you assign distinct flat colours (or separate, named mesh parts) to the high-poly before baking, so the baker writes crisp, non-bleeding ID regions into the low-poly’s UVs.' },
      { q: 'Are these supporting maps things you ship to the engine, or something else?', a: 'Mostly something else — they’re authoring *inputs*. Curvature, thickness, position and world-space normal usually live only inside the texturing app where they feed generators and masks; the engine never sees them. AO is the common exception: it’s often shipped as its own channel or multiplied into the albedo. The shipped result is the finished PBR set, not the scaffolding that built it.' }
    ],
    tags: ['baking', 'ambient occlusion', 'curvature', 'mesh maps', 'smart materials', 'texturing'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
