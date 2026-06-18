/* Pillar D · Phase d5 · Module d5b — Export & optimise */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd5-03', title: 'Exporting to the engine: FBX vs glTF, scale and units', pillarId: 'D', phaseId: 'd5', moduleId: 'd5b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28, diagram: 'assetcheck',
    concept:
'Export is the seam where a gorgeous Blender file becomes a thing the engine can actually use — and it’s where more asset bugs are born than anywhere else. The model that looks right in Blender can arrive in the engine *100× too big*, rotated on its back, or with its origin floating a metre away. None of that is the engine being broken; it’s a units, axis and pivot mismatch you can prevent at export.\n\n' +
'**The two formats you’ll meet.**\n' +
'- **glTF / GLB** — an open, modern standard, and **Godot’s first-class, recommended import path**. `.glb` is a single self-contained binary (mesh + textures + materials in one file), tidy and well supported. For Godot, prefer glTF/glb — it’s the cleaner route, and Godot can also import `.blend` directly when Blender is installed.\n' +
'- **FBX** — the long-standing game-industry workhorse. Proprietary (Autodesk) but supported widely, including by Godot. It still works for skinned meshes, rigs and animation, but for Godot glTF is the lower-risk, better-tested choice today.\n\n' +
'**Scale and units are the #1 trap.** Engines think in **metres**: a 1-unit cube is 1 m. Blender’s default unit is also a metre, but if you modelled to the wrong real-world size, or left an **object-level scale** that isn’t `1,1,1`, the asset imports wrong and physics, lighting and snapping all misbehave. So before export: set real-world dimensions, then **apply transforms** ([[Ctrl+A]] → All Transforms) so scale is `1,1,1` and rotation is zeroed against the mesh.\n\n' +
'**Axis convention** differs too — Blender is **Z-up**, Godot (like most engines) is **Y-up** — so the exporter has a forward/up setting to convert. (glTF defines Y-up, so Godot’s glTF import handles this conversion cleanly; with FBX you set it yourself.) Get it wrong and assets lie on their side. And the **origin** you set in [[d5-02]] is the pivot the engine snaps and rotates around, so it must be deliberate.\n\n' +
'Clean export is teamwork, not pedantry: a mis-scaled asset becomes the **level designer’s** ([[c3-02]]) broken snapping and the **programmer’s** ([[e2-01]]) wrong collider. "Imports clean at correct scale" is part of *done*.',
    steps: [
      'In Blender, select the asset and check **Item → Dimensions** (N panel) against the intended real-world size in metres. Fix the size on the mesh, not via object scale.',
      'Apply transforms: [[Ctrl+A]] → **All Transforms** so Scale reads `1.000` and Rotation `0` in the N panel. This bakes any scaling into the mesh.',
      'Confirm the **origin/pivot** is where the engine should snap and rotate it (set in [[d5-02]]).',
      'Export glTF (the Godot-preferred path): **File → Export → glTF 2.0**, choose **`.glb`** (self-contained binary) and enable the data you need (mesh, materials, and — only if rigged — skinning + animation). glTF is Y-up, so Godot’s import converts orientation for you.',
      'Or export FBX (still supported by Godot): **File → Export → FBX**. Set **Limit to → Selected Objects**, **Apply Scale → "FBX All"** (a common fix when scale still arrives wrong), **Forward `-Z`, Up `Y`** for a Y-up engine, and bake/keep only the modifiers you want.',
      'In Godot, drop the file under `res://` and let it import; check three things immediately: real-world size against a 1 m reference cube, upright orientation, and pivot location. If size is off by ~100×, it’s almost always a metre-vs-centimetre unit mismatch — fix at export, not by scaling in-engine.'
    ],
    task:
'Take one finished prop (or a free asset you can open). Before touching the exporter, write down its intended real-world size in metres and where its pivot should be. Then run the export checklist above twice — once to **glTF/GLB** (your Godot default), once to **FBX** — and note, in a short paragraph, any difference you’d expect on import (textures embedded or not, animation support, file tidiness) and which you’d choose for *this* asset and why. For Godot, glb should be your usual answer.',
    success: [
      'You can state when you’d reach for FBX vs glTF/GLB and why.',
      'You can apply transforms and explain why a non-`1,1,1` scale breaks an import.',
      'You can diagnose a "100× too big" or "lying on its side" import as a units/axis problem and fix it at export.'
    ],
    skills: ['Export settings', 'Scale & units discipline', 'FBX vs glTF', 'Pivot/axis conventions'],
    simplified: 'Exact exporter labels and defaults shift between Blender versions, and Godot’s import options change between 4.x releases. Treat the specific menu names as common-default guidance — verify against your Blender and Godot version, and always sanity-check scale against a known 1 m reference in-engine.',
    goDeeper: 'Read the official Blender glTF/FBX exporter docs alongside Godot’s "Importing 3D scenes" documentation (covering glTF, .blend and the import dock). The glTF spec site (Khronos) is the authority on what GLB actually packs.',
    quiz: [
      { q: 'Your prop imports into the engine 100× too large. What’s the most likely cause and where do you fix it?', a: 'A units mismatch — typically centimetres vs metres, or an unapplied object scale. Fix it at the source: set the correct real-world size in Blender, apply transforms so scale is `1,1,1`, and use the exporter’s Apply-Scale option, rather than rescaling in the engine where it can break physics and snapping.' },
      { q: 'For Godot, which format should you reach for first, and when might FBX still appear?', a: 'Reach for `.glb` (glTF) first — it’s Godot’s first-class, recommended import path: one tidy self-contained file (mesh, materials, textures together) with clean Y-up orientation. FBX still works in Godot and may appear when an asset only ships as FBX or comes from an FBX-centric pipeline, but glTF is the lower-risk default. (Godot can also import `.blend` directly with Blender installed.)' }
    ],
    tags: ['export', 'fbx', 'gltf', 'scale', 'units', 'pivot'] },
  {
    id: 'd5-04', title: 'Naming conventions and clean file hygiene', pillarId: 'D', phaseId: 'd5', moduleId: 'd5b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20, diagram: 'assetcheck',
    concept:
'Naming feels like the most boring topic in 3D — and it’s one of the highest-leverage. On a solo project, a messy `Cube.001`, `untitled`, `final_FINAL_v2` graveyard slows *you* down. On an eight-person team it’s chaos: assets that won’t sort, duplicate materials, broken references when someone renames a file, and hours lost hunting for "the right one". A convention is cheap insurance that makes a project searchable, sortable and safe to refactor.\n\n' +
'**A convention is just a few rules everyone follows.** Common, sane choices:\n' +
'- **Prefix by type** so things group and you can guess a name: `SM_` static mesh, `SK_` skeletal mesh, `T_` texture, `M_` material, `MI_` material instance. (These are Unreal-flavoured but the *idea* — a type tag — is universal.)\n' +
'- **Category and descriptor next**: `SM_Crate_Wood_01`. Read it left-to-right: most general → most specific → variant number.\n' +
'- **Zero-padded numbers** (`_01`, not `_1`) so `09` and `10` sort in the right order.\n' +
'- **No spaces, no special characters, consistent case** — spaces and odd characters break command-line tools, some importers and version control. Use `_` or `PascalCase`, and *pick one*.\n' +
'- **Suffix texture maps by channel**: `_BC`/`_Albedo`, `_N` normal, `_R` roughness, `_M` metallic, `_AO`. This pairs with the PBR maps from [[d3-01]] so the engine (and your teammate) can auto-assign them.\n\n' +
'**File hygiene** is the same discipline at project scale: a predictable folder structure (`/Meshes`, `/Textures`, `/Materials`), no stray autosaves committed, no two materials that do the same job, and dead files deleted rather than left to rot. This is exactly where it meets **Git** ([[03-01]]): clean names and a stable layout mean fewer merge conflicts and references that don’t shatter when a file moves. Decide the convention *once, early*, write it in the project’s art bible, and the whole team’s `assetcheck` gets easier — naming is invisible when it works and a tax forever when it doesn’t.',
    task:
'Draft a one-page **naming convention** for a small game’s 3D assets: choose your prefixes (meshes, skeletal meshes, materials, textures), your separator and case rule, your number-padding rule, and your texture-map suffixes (tie them to the PBR channels). Then rename three real files you have (or three invented ones like `Cube.001`, `rock final`, `tex2`) to follow it, and write one sentence on what each old name would have cost a teammate.',
    success: [
      'You can write a concise, consistent naming convention covering meshes, materials and texture maps.',
      'You can explain why no-spaces, consistent case and zero-padded numbers matter for tools, sorting and version control.',
      'You can spot and fix names that would confuse a teammate or break a reference.'
    ],
    skills: ['Naming conventions', 'File hygiene', 'Project structure', 'Team-readiness'],
    simplified: 'The specific prefixes (`SM_`, `T_`, …) are conventions, not laws — Godot itself doesn’t impose them; you and your team pick a scheme (the prefix style shown was popularised by Unreal). What matters is that you choose a clear convention and apply it consistently across the whole project, not which exact letters you use.',
    goDeeper: 'The widely shared "Unreal Engine style guide" community document is a thorough, opinionated reference for asset naming and folder structure; adapt its ideas to your Godot project and team rather than copying it wholesale.',
    quiz: [
      { q: 'Why use `_01` instead of `_1`, and why ban spaces in asset names?', a: 'Zero-padding keeps numbers in correct order when sorted alphabetically (`_01 … _09 … _10`), otherwise `10` sorts before `2`. Banning spaces (and special characters) avoids breaking command-line tools, some importers and version-control paths, and keeps names safe to script against.' },
      { q: 'How does a naming convention reduce pain in Git and on a team?', a: 'Consistent, descriptive names and a stable folder layout mean assets sort and search predictably, references don’t shatter when files move, and there are fewer accidental duplicates — so fewer merge conflicts and far less time lost hunting for "the right file". The convention is shared infrastructure, agreed once and reused by everyone.' }
    ],
    tags: ['naming', 'file hygiene', 'conventions', 'project structure', 'pipeline'] },
  {
    id: 'd5-05', title: 'Import settings and the optimisation mindset', pillarId: 'D', phaseId: 'd5', moduleId: 'd5b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'A clean export is only half the handoff — what the engine *does* with your file on import is the other half, and it’s where a lot of cheap performance is won or thrown away. Import settings are the dials the engine offers to turn your raw mesh and textures into runtime-efficient data. Knowing the big ones makes you the artist whose assets "just run".\n\n' +
'**Texture import settings usually cost the most memory**, so start there:\n' +
'- **Resolution / max size** — a `4096` texture takes 4× the memory of `2048`. Author at a sane size for how big the asset reads on screen; a background prop rarely needs `4K`.\n' +
'- **Compression** — engines compress textures to GPU formats (e.g. BC/DXT/ASTC families). Compressed textures use a fraction of the memory; reserve uncompressed only where you see artefacts.\n' +
'- **Mipmaps** — pre-shrunk copies the GPU uses at distance. Keep them **on** for 3D world textures (sharper *and* faster at distance, less shimmer); turn off only for UI.\n' +
'- **sRGB vs linear** — colour maps (albedo) are sRGB; data maps (normal, roughness, metallic) must be **linear/raw**, or your lighting goes subtly wrong. This pairs directly with the PBR channels from [[d3-01]].\n\n' +
'**Mesh import settings** matter too: generate **LODs** ([[d1-04]]) or import the ones you authored, set **collision** appropriately (a cheap convex or box collider, not the render mesh, for the **programmer** in [[e2-01]]), and enable **mesh compression** where the engine offers it. Turn off rig/animation import for a static prop so you’re not shipping empty bones.\n\n' +
'The **optimisation mindset** behind all of this: *measure before you optimise, and optimise where the budget actually hurts*. Don’t halve a texture nobody sees while a transparent particle eats the frame. The engine **profiler** tells you whether you’re CPU-bound (draw calls — fix with batching and shared materials from [[d0-02]]) or GPU-bound (overdraw, texture memory, shader cost). Optimisation is a *targeted* response to a measured problem, not a vibe — and these import dials are your first, cheapest lever.',
    task:
'For one textured asset, write its **import recipe**: target texture max-size and why, which maps are sRGB vs linear (list each PBR map and tag it), mipmaps on/off, whether it needs LODs and collision, and whether rig/animation import should be off. Then name *one* thing you would NOT optimise yet and explain how you’d use a profiler to decide whether it’s ever worth it.',
    success: [
      'You can set sensible texture import settings (size, compression, mipmaps) and justify each.',
      'You can tag PBR maps as sRGB (colour) vs linear (data) and say why it matters for lighting.',
      'You can describe the measure-then-optimise mindset and name CPU- vs GPU-bound symptoms.'
    ],
    skills: ['Import settings', 'Texture compression & mipmaps', 'Optimisation mindset', 'Profiling literacy'],
    simplified: 'Exact compression formats, setting names and defaults vary by engine and platform (desktop vs mobile vs VR), and engines change them between versions. Treat the specific format names as illustrative and check your engine’s texture-import docs for the target platform.',
    goDeeper: 'Godot’s "Importing images" and "Importing 3D scenes" docs plus its profiling tools (the in-editor **Debugger → Profiler** and the **Monitors** panel) are the real teachers; the skill is reading a frame to find the actual bottleneck before you change anything.',
    quiz: [
      { q: 'Why must a normal map be imported as linear/raw while an albedo map is sRGB?', a: 'Albedo stores colour meant for human eyes, which is encoded in sRGB, so the engine decodes it to linear for lighting. A normal map stores *directions* (vector data), not colour — applying an sRGB curve corrupts those values and makes lighting subtly wrong. Same for roughness/metallic: data maps stay linear.' },
      { q: 'What does "measure before you optimise" mean in practice for a 3D artist?', a: 'It means using the engine profiler to find the real bottleneck before changing anything — are you CPU-bound (too many draw calls) or GPU-bound (overdraw, texture memory, shader cost)? Then you spend effort where the budget actually hurts, instead of shrinking a texture nobody notices while the true cost sits untouched.' }
    ],
    tags: ['import settings', 'texture compression', 'mipmaps', 'optimization', 'profiling', 'srgb'] },
  {
    id: 'd5-06', title: 'The game-ready checklist, start to finish', pillarId: 'D', phaseId: 'd5', moduleId: 'd5b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30, diagram: 'assetcheck',
    concept:
'This is where the whole pillar lands. You’ve learned the real-time mindset, poly budgets, topology and LODs, UVs, PBR and baking, rigging prep, modular kits and export. The **game-ready checklist** is the single habit that ties them together: a repeatable pass you run on *every* asset so "done" means "runs in the engine, at budget, looking right" — not "looks good in Blender".\n\n' +
'A solid checklist, top to bottom:\n' +
'- **Silhouette & budget** — reads at a glance; triangle count fits its role and on-screen count ([[d0-02]]).\n' +
'- **Topology** — clean enough for its job; deforming parts have the loops they need ([[d1-01]]).\n' +
'- **LODs** — authored or generated, with sensible switch distances ([[d1-04]]).\n' +
'- **UVs** — no overlaps where they shouldn’t be, consistent texel density, packed efficiently ([[d2-01]]).\n' +
'- **PBR maps** — albedo, normal, roughness, metallic, AO present and correct; bake is artefact-free ([[d3-01]]).\n' +
'- **Materials** — real-time material set up, channels assigned, sRGB/linear right.\n' +
'- **Transforms & pivot** — scale `1,1,1`, rotation zeroed, origin deliberate ([[d5-03]]).\n' +
'- **Naming & files** — convention followed, no stray files, folder structure right ([[d5-04]]).\n' +
'- **Export & import** — correct format, scale, axis; imports clean ([[d5-03]]).\n' +
'- **Validate in-engine** — checked at game distance, in game lighting, at every LOD, with the right collision, against the frame budget ([[d5-05]]).\n\n' +
'The discipline is to run this *before* you call an asset finished and hand it on — because a missed step becomes the **level designer’s** broken snap ([[c3-02]]) or the **programmer’s** wrong collider ([[e2-01]]), found late and fixed expensively. And the scope lesson recurs here: a checklist also tells you what an asset *doesn’t* need (a plain crate skips the high-poly and the bake), so you don’t gold-plate. Run the list, validate in-engine, ship. That’s the loop that makes you a reliable contributor to a team — and a solo dev who finishes.',
    steps: [
      'Make a reusable checklist (the list above) as a text file or note you can copy per asset — this is the artefact you’ll actually use.',
      'Pick one finished asset and walk it **top to bottom**, marking each line pass / fail / not-needed. Be honest: "not-needed" is a real, scoped answer (a simple prop may skip LODs or a bake).',
      'Fix every fail before going further — a half-passing asset is not done.',
      'Export and import into the engine using the [[d5-03]] settings, then **validate in-engine**: view it at game distance, under game lighting, cycle its LODs, confirm collision, and read it against budget in the profiler ([[d5-05]]).',
      'Only when every line is pass or justified not-needed do you mark the asset **done** and hand it on. Reuse the same checklist for the next one — speed comes from the routine, not from skipping it.'
    ],
    task:
'Build your own game-ready checklist as a copy-per-asset template (you’ll reuse it for years), then run it for real on one asset, recording pass / fail / not-needed for every line with a one-line note. Where you mark "fail", say what you’d do to fix it; where you mark "not-needed", justify the scope call. Finish with the in-engine validation step described above and a one-sentence verdict: is this asset *done*, and how do you know?',
    success: [
      'You have a reusable, ordered game-ready checklist you’d actually run on every asset.',
      'You can take one asset through the full list and honestly mark each item pass / fail / not-needed.',
      'You can state why "done" requires in-engine validation at budget, and justify which steps an asset legitimately skips.'
    ],
    skills: ['Game-ready checklist', 'Definition of done', 'In-engine validation', 'Scope discipline'],
    simplified: 'No single checklist fits every studio, engine or asset type — a character, a modular wall and a VFX mesh stress different lines. Treat this as a strong general template to adapt, and always validate against your real target platform’s budget rather than a generic number.',
    goDeeper: 'Watch a full end-to-end "prop breakdown" or "game-ready asset" walkthrough from an experienced environment artist and note the checks they make at each stage; build your personal checklist from what recurs across several of them and your own engine’s docs.',
    quiz: [
      { q: 'Why is "looks good in Blender" not enough to call an asset game-ready?', a: 'Because game-ready means it also runs: correct scale and pivot, clean import, sensible LODs and collision, right materials and sRGB/linear, and an in-engine check at game distance, in game lighting, against the frame budget. An asset that won’t import, blows the budget or reads wrong in-engine isn’t finished, however good the viewport looks.' },
      { q: 'On a checklist, why is "not-needed" a legitimate answer, and how does it relate to scope?', a: 'Because not every asset needs every step — a plain crate may skip a high-poly sculpt, a bake, or even LODs. Marking a line "not-needed" with a justification is a deliberate scope decision that avoids gold-plating, the opposite failure to skipping a step you actually needed. The checklist guards against both over- and under-doing it.' }
    ],
    tags: ['checklist', 'game-ready', 'definition of done', 'validation', 'scope', 'pipeline'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
