/* Pillar D · Phase d3 · Module d3a — PBR */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd3-01', title: 'PBR explained: albedo, normal, roughness, metallic, AO', pillarId: 'D', phaseId: 'd3', moduleId: 'd3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26, diagram: 'assetcheck',
    concept:
'((PBR)) — *physically based rendering* — is a shading model where a surface is described by a small set of texture maps that mean roughly the same thing in every modern engine, so an asset authored once looks consistent under any lighting. Instead of hand-painting how a surface *looks* under one light, you describe what the surface *is*, and the engine computes the rest. That portability is why PBR is the game-art standard, and why a 3D modeller has to think in these channels.\n\n' +
'The metallic/roughness workflow (Unity, Unreal and Godot all default to it) uses these maps:\n' +
'- **Albedo** (base colour) — the surface’s flat colour with *no* lighting, no shadows, no highlights baked in. A common rookie error is painting shading into albedo; keep it clean and let the engine light it.\n' +
'- **Metallic** — a near black-or-white mask: is this pixel metal (white) or non-metal/*dielectric* (black)? Metals reflect their environment and tint reflections with their albedo; dielectrics (wood, plastic, skin) don’t. Mid-grey is usually wrong except at thin transitions like worn paint over steel.\n' +
'- **Roughness** — how rough vs polished the microsurface is. Black = mirror-smooth (tight, sharp reflections); white = rough/matte (broad, blurry reflections). This map does the heavy lifting for *material identity* — wet vs dry, scratched vs new.\n' +
'- **Normal** — fakes fine surface detail (bumps, pores, panel lines) by perturbing the lighting normal per pixel, so a flat low-poly face *catches light* like it has geometry it doesn’t. (Baked from the high-poly — see [[d3-04]] and [[d3-05]].)\n' +
'- **AO** (ambient occlusion) — a baked map of where ambient light is blocked (crevices, contact seams), adding cheap soft self-shadowing the real-time lighting can’t afford to compute.\n\n' +
'A useful mental split: **albedo + metallic + roughness** answer *"what is this made of?"*, while **normal + AO** answer *"what shape is its surface?"* (the seam back to topology and baking). Some pipelines add height/displacement, emissive (self-lit pixels) or a packed *ORM* texture (AO, roughness, metallic stuffed into one image’s R/G/B channels to save samples). PBR is a convention, not magic — get the channels right and the same asset reads correctly in your engine and the graphics programmer’s shader ([[e5-01]]).',
    task:
'Take any real object near you — a mug, a worn tool, a phone — and *channel-map* it in writing. For each PBR map, describe what its texture would contain: albedo (the flat colours, no shine), metallic (which parts are metal, as a black/white mask), roughness (which parts are glossy vs matte, light-to-dark), normal (what fine bumps/scratches you’d bake), and AO (where crevices darken). Then name one place you might be *tempted* to paint a highlight or shadow into albedo, and say why that belongs in roughness or the lighting instead.',
    success: [
      'You can name the five core metallic/roughness maps and what each one controls.',
      'You can explain why albedo must be free of baked lighting and shadow.',
      'You can split the maps into "what it’s made of" vs "what shape its surface is".'
    ],
    skills: ['PBR channels', 'Metallic/roughness workflow', 'Reading a material'],
    simplified: 'There are two common PBR conventions — *metallic/roughness* (used here, the engine default) and *specular/glossiness*. They store similar information differently; this lesson teaches metallic/roughness. Channel meanings (e.g. roughness black = smooth) are the common convention but a few tools invert roughness vs glossiness, so always check your map’s direction.',
    goDeeper: 'The original Allegorithmic/Adobe "PBR Guide" (free, two volumes) is the standard reference on the theory and on authoring valid albedo and metallic values; pair it with the Unity or Unreal docs on their standard/metallic material.',
    quiz: [
      { q: 'A new artist bakes shadows and a bright highlight into the albedo map "so it looks 3D". Why is that wrong in PBR?', a: 'Albedo must be pure surface colour with no lighting in it — the engine adds shadows and highlights dynamically from the real lights, normal map and roughness. Baked-in lighting fights the engine’s lighting, so the asset looks wrong from other angles and under other lights, breaking the whole point of PBR (consistency under any lighting).' },
      { q: 'What does the roughness map mostly control, and why is it doing the "heavy lifting" for how a material reads?', a: 'Roughness sets how sharp or blurry reflections are — smooth (black) gives tight mirror-like highlights, rough (white) gives broad matte ones. Because so much of how we recognise a material is in its reflections (wet vs dry, new vs scratched, metal vs plastic), getting roughness right often sells the material more than colour does.' },
      { q: 'Why is the metallic map usually nearly pure black or white rather than lots of grey?', a: 'Real surfaces are essentially either metal or not — metallic is a mask, not a dial. White means metal (reflects the environment, tints reflections with its colour), black means dielectric (wood, plastic, skin). Mid-grey only makes sense at thin transitions like worn paint revealing steel; broad grey usually signals an authoring mistake.' }
    ],
    tags: ['pbr', 'albedo', 'roughness', 'metallic', 'normal map', 'texturing'] },
  {
    id: 'd3-02', title: 'Authoring PBR textures (Substance vs free tools vs Blender)', pillarId: 'D', phaseId: 'd3', moduleId: 'd3a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 38,
    concept:
'Knowing the PBR channels ([[d3-01]]) is theory; *authoring* them is the craft. The good news for a solo dev on a budget: the workflow is the same whatever tool you use, and you can ship great textures with **zero paid software**.\n\n' +
'The tools, honestly ranked for a learner:\n' +
'- **Substance 3D Painter** — the industry standard. You paint *materials* directly onto your model’s surface in 3D, with smart masks that auto-detect edges and crevices from your baked maps. Fast and powerful, but a paid subscription. Worth knowing the name; not required to learn the skill.\n' +
'- **Free 3D painters** — *Quixel Mixer* and the open-source *ArmorPaint* / *Material Maker* cover much of the same ground (paint or procedurally build PBR sets) for free. Good enough to learn the entire workflow.\n' +
'- **Blender itself** — you already know it, and its **Texture Paint** workspace plus a Principled BSDF material can author a full PBR set: paint albedo, drive roughness/metallic with masks, and use baked AO/normal/curvature ([[d3-06]]) as masks to drive wear. Slower than Substance for complex edge wear, but completely free and already in your pipeline.\n\n' +
'Whatever the tool, the *method* is consistent. You start from your baked maps (normal, AO, curvature, world-space position) and your UVs ([[d2-01]]), then **layer** the material: a base, then larger variation (dirt, discoloration), then edge wear that uses the curvature/AO as a mask so grime sits in crevices and scratches catch exposed edges. Working in layers with masks — rather than painting final pixels — keeps it editable and is exactly how the paid tools work too, so the habit transfers.\n\n' +
'Two scope-and-correctness notes. First, **stay in valid PBR ranges**: pure black albedo and pure white albedo don’t exist in nature; metallic stays near 0 or 1. Out-of-range values look broken under PBR lighting. Second, **resolution is a budget**, not a vanity number — a 2K (`2048²`) map for a hero prop, 1K or 512 for background props; oversized textures eat memory and load time for detail no one sees ([[d5-05]]). Author to the texel density your UV pass set, not to "as big as possible".',
    task:
'Author a simple PBR material set for one low-poly prop you already have UV-unwrapped (a crate, a barrel, a sign). Using **Blender’s Texture Paint** (free, already installed) or any free PBR painter, produce at least albedo, roughness and a metallic value, and use a baked AO or curvature map as a mask to add one wear effect (grime in crevices *or* scratched edges). Keep the texture at a sensible size for the prop’s role, and check it under a couple of different lighting setups, not just one.',
    steps: [
      'Make sure the prop is unwrapped with sensible texel density ([[d2-01]]) and you have at least a baked **AO** (and ideally **curvature**) map to mask with ([[d3-06]]).',
      'In Blender, give the object a material with a **Principled BSDF**. Add an image texture for *Base Color* (albedo); create a new image and connect it.',
      'Switch to the **Texture Paint** workspace. Block in flat albedo colours — no painted shadows or highlights; keep values in valid range (no pure black/white).',
      'Add a second image for **Roughness**, connect it to the Principled `Roughness` input, and paint roughness variation: smoother where a surface is handled/polished, rougher where it’s matte or worn.',
      'Set **Metallic**: for a mostly non-metal prop, leave it near 0; for metal bands/rivets, mask those areas to ~1. Avoid broad mid-grey.',
      'Drive **wear with a mask**: feed your baked AO or curvature map into a mask (e.g. via a `ColorRamp`) and use it to darken albedo + raise roughness in crevices (grime) or lighten/scratch exposed edges.',
      'Connect your baked **Normal** map through a `Normal Map` node into the Principled `Normal` input so fine detail catches light ([[d3-05]]).',
      'Light-check: rotate an HDRI or swap a couple of light setups in the viewport. PBR should hold up under different lighting — if it only looks right under one light, something’s baked into albedo that shouldn’t be.',
      'Save/pack your images and note the resolution you chose and why (role-appropriate, not maximal).'
    ],
    success: [
      'You produced a working albedo + roughness + metallic set with one masked wear effect.',
      'Your albedo holds no baked lighting and your values stay in valid PBR ranges.',
      'You can state your texture resolution and justify it by the prop’s role.'
    ],
    skills: ['Authoring PBR maps', 'Layer-and-mask texturing', 'Texturing in Blender (free)'],
    simplified: 'The Blender node names (Principled BSDF, Normal Map, ColorRamp) and the Texture Paint workflow are described as common defaults — exact node sockets and menu paths shift between Blender versions, so confirm against your installed version. The site can’t run Blender, so these are click-paths, not shown output.',
    goDeeper: 'Watch a full prop-texturing breakdown in your tool of choice end to end, then re-do your prop. For the paid path, Adobe’s Substance 3D Painter tutorials show the smart-mask workflow the free tools imitate.',
    quiz: [
      { q: 'You only own free software. Can you still learn and ship real PBR texturing? Why or why not?', a: 'Yes. The workflow — start from baked maps, layer a base then variation then masked edge wear — is identical regardless of tool. Blender’s Texture Paint, Quixel Mixer, Material Maker or ArmorPaint all author valid PBR sets for free; Substance Painter is faster and industry-standard but not required to learn the skill.' },
      { q: 'Why texture by layering masks rather than painting the final pixels directly?', a: 'Masked layers stay editable — you can change the dirt amount, the edge-wear, or a colour without repainting from scratch — and masks driven by baked AO/curvature put grime and scratches in physically plausible places automatically. It’s also exactly how the industry tools work, so the habit transfers when you move to Substance.' },
      { q: 'Why not just author every texture at 4K to be safe?', a: 'Resolution is part of the performance budget: oversized maps eat GPU memory and load time for detail no one sees at game distance. Author to the texel density your UV pass set and the prop’s role — 2K for a hero, 1K or 512 for background props — not to the maximum the tool allows.' }
    ],
    tags: ['texturing', 'substance', 'blender', 'masks', 'pbr', 'workflow'] },
  {
    id: 'd3-03', title: 'Real-time materials vs offline materials', pillarId: 'D', phaseId: 'd3', moduleId: 'd3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'Both a film render and a game use "PBR materials", which hides a big difference: an **offline** material (Cycles, Arnold, a path tracer) can be almost arbitrarily expensive because a frame has *seconds or minutes* to compute; a **real-time** material has a few *milliseconds* for the whole scene ([[d0-01]]). Same physics, wildly different budget — and that budget reshapes what a material is allowed to be.\n\n' +
'Where they diverge:\n' +
'- **Procedural node trees vs flat textures.** In Blender you might build a material from a tall stack of noise, math and texture nodes evaluated at render time. The engine usually can’t afford that per pixel per frame, so you **bake** that procedural result down to flat texture maps (albedo/roughness/etc.) the GPU just samples. Your clever node graph becomes a few images.\n' +
'- **Ground-truth vs approximated lighting.** Offline renderers can path-trace true global illumination, soft shadows and accurate reflections by shooting many rays. Real-time *approximates*: baked lightmaps, light probes, screen-space reflections, and now real-time ray tracing on capable GPUs like your RTX 3060 Ti — but always within budget, with trade-offs and fallbacks.\n' +
'- **Shader cost is a hard ceiling.** Every extra texture sample, every transparent layer, every fancy effect multiplies across every pixel and every object on screen ([[d0-02]]). A material that’s "free" in Cycles can be the thing that tanks your frame rate in-engine.\n\n' +
'The practical consequence for a 3D modeller: **the material that ships is the baked, finite one**, not your Blender node graph. A gorgeous procedural material that can’t bake to a sane set of maps isn’t game-ready, however good the Cycles preview looks. This is the same "looks good in Blender ≠ done" rule from the pipeline lesson ([[d0-03]]).\n\n' +
'It’s also a seam to the graphics programmer. They write or assemble the actual real-time shaders ([[e5-01]], [[e5-02]]) and shader graphs ([[e5-03]]) that *read* your maps; your job is to hand over textures that stay in budget and in valid PBR ranges so their shader can light them correctly. Author with the real-time ceiling in mind, and your assets drop into the engine cleanly instead of becoming someone’s optimisation problem.',
    task:
'Take one material you’ve built (or seen) as a **procedural node graph** in Blender — something using noise, gradients or math nodes. Write a short "bake-down plan": which final maps you’d bake it to (albedo, roughness, normal, AO, maybe a packed ORM), at what resolution, and what *would be lost* by flattening it (e.g. infinite detail on zoom, view-dependent tricks). Then state one thing that material does which a real-time shader genuinely *can* do live, and one thing it can’t afford.',
    success: [
      'You can explain why a frame budget separates real-time from offline materials.',
      'You can describe baking a procedural material down to flat sampled maps.',
      'You can judge whether a material is "game-ready" by whether it bakes to a sane map set in budget.'
    ],
    skills: ['Real-time vs offline materials', 'Baking procedural to flat maps', 'Material budgeting'],
    simplified: 'Real-time lighting techniques (lightmaps, probes, screen-space and hardware ray tracing) are summarised at a high level and vary a lot by engine, render pipeline and platform; treat the specifics as "the kinds of approximations engines use", not a fixed spec, and check your engine’s renderer docs.',
    goDeeper: 'Read your engine’s rendering-pipeline overview (Unity URP/HDRP or Unreal’s lighting docs) on how it approximates global illumination, then compare a Blender Cycles render of an asset to the same asset in-engine to feel the difference in cost and look.',
    quiz: [
      { q: 'Your material is a 30-node procedural graph that renders beautifully in Cycles. Why might it not be game-ready, and what do you do?', a: 'A real-time engine usually can’t evaluate a deep node graph per pixel every frame within its few-millisecond budget. You bake the procedural result down to flat texture maps (albedo, roughness, normal, AO) the GPU just samples. If it can’t bake to a sane, in-budget set of maps, it isn’t game-ready however good the offline preview looks.' },
      { q: 'Both offline and real-time renderers use PBR. What is the core thing that makes their materials different?', a: 'The time budget. An offline frame has seconds or minutes, so it can path-trace true lighting and evaluate expensive procedural materials; a real-time frame has a few milliseconds for the whole scene, so it relies on baked/approximated lighting and flat, cheap-to-sample texture maps. Same physics model, drastically different cost ceiling.' }
    ],
    tags: ['real-time', 'offline', 'materials', 'baking', 'shaders', 'budget'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
