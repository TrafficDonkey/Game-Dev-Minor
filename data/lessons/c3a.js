/* Pillar C · Phase c3 · Module c3a — Light & mood */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c3-01', title: 'Light and mood in a level (the seam to 3D/graphics)', pillarId: 'C', phaseId: 'c3', moduleId: 'c3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'You blocked the level out in grey and paced it ([[c1-02]]); now **light** is what turns that grey box into a *place* with a feeling. For a level designer, lighting is the cheapest, strongest mood tool you own — and it sits on the seam between level design, 3D and graphics programming, so it pays to understand what light is actually doing.\n\n' +
'Light does three jobs at once. **It sets mood** — warm low light reads cosy or dusk; cold dim light reads tense or dead; a single hard key light reads dramatic. **It guides the eye** — players walk toward light and toward contrast, so a bright doorway is a free signpost (the seam to sightlines and guidance, [[c1-03]] and [[c1-04]]). **It reveals form** — the *direction* and *softness* of light is what makes your 3D geometry read as shape rather than flat colour.\n\n' +
'A few levers do most of the work:\n' +
'- **Key, fill and rim.** The key is your main light and sets the mood; fill softens shadows so the scene is readable; a rim or back light separates objects from the background. Borrowed straight from photography and film.\n' +
'- **Contrast and value.** *Where* it is bright vs dark matters more than how pretty any one light is. High contrast = drama and tension; low contrast = calm or fog. Squint at your scene — if everything is the same mid-grey, it will feel flat.\n' +
'- **Colour temperature.** Warm (orange) vs cool (blue) is the single most reliable mood dial. Mixing one warm and one cool light is a classic, instantly-readable look.\n\n' +
'The 3D and graphics seam: light only looks right because surfaces respond to it physically — that is what ((PBR)) materials encode (albedo, roughness, metallic), so a rough wall and a wet floor catch the same lamp completely differently ([[d3-01]]). And the final *grade* — bloom, colour grading, vignette — is added by **post-processing** in the engine, a graphics-programming topic ([[e5-05]]) you, as the level designer, *direct* even if you don’t code it.\n\n' +
'Scope and honesty: in a small game, lean on a few well-placed lights and a strong post-process grade rather than hand-placing fifty. And know the cost — real-time dynamic lights and shadows are expensive, so most shipped levels **bake** static lighting and keep only a few dynamic lights. The specifics of baked vs real-time differ by engine and version, so treat that as a concept here, not a settings recipe.',
    task:
'Pick one room from a level you’re blocking out (or sketch a single room in three lines). Write a short **lighting plan** for it: name the **mood** in one phrase ("tense", "safe haven", "eerie"), then specify a **key** light (direction + warm/cool), whether you want a **fill**, and one spot of deliberate **high contrast** (a bright zone the eye should go to, and why). Finally, mark which lights would be **baked** (static) vs **dynamic** (e.g. a flickering torch the player carries), and note one thing your *3D* assets need so they read well under this light (e.g. correct roughness on a floor).',
    success: [
      'You can state the mood of a space and choose a key-light direction and colour temperature that serves it.',
      'You can use light contrast to guide the player’s eye, not just to look pretty.',
      'You can explain why most levels bake static lighting and keep dynamic lights to a budget.',
      'You can name the seam to 3D (PBR surfaces) and to graphics (post-processing).'
    ],
    skills: ['Lighting for mood', 'Key/fill/rim & contrast', 'Light as player guidance', 'Baked vs dynamic budgeting'],
    simplified: 'Key/fill/rim and "bake the statics" is the working frame, not the whole of real-time lighting. Global illumination, light probes, lightmap resolution and the baked-vs-real-time tradeoff vary a lot by engine and version — check your engine’s lighting docs for specifics rather than treating any number here as fixed.',
    goDeeper: 'For the eye behind the levers, any cinematography primer on three-point lighting transfers directly; for the game-specific craft, look for GDC talks on "lighting the level" / environment lighting, and read your engine’s official lighting documentation (Unity URP/HDRP, Unreal Lumen, or Godot) for baked vs real-time workflows.',
    quiz: [
      { q: 'A playtester wanders past the exit and gets lost in your room. How can lighting fix it without adding a UI marker?', a: 'Light is a free signpost — players move toward brightness and contrast. Make the correct exit the brightest, highest-contrast spot in the room (a lit doorway, a shaft of light) and keep dead-ends dimmer. You guide the eye, and therefore the feet, with value rather than an arrow.' },
      { q: 'Why do most shipped levels bake static lighting instead of making every light dynamic?', a: 'Real-time dynamic lights and especially their shadows are expensive to compute every frame, which costs performance. Baking pre-computes the lighting for static geometry into textures, so it’s nearly free at runtime; you then spend your small dynamic-light budget only where things move or change (a torch, a muzzle flash).' },
      { q: 'How does the level designer’s lighting depend on the 3D and graphics tracks?', a: 'Surfaces only respond correctly to light because their PBR materials (albedo, roughness, metallic) say how they reflect it, so a wet floor and a dry wall react differently to the same lamp. And the final mood is sealed by post-processing (bloom, colour grade, vignette) applied by the graphics/engine layer, which the level designer directs.' }
    ],
    tags: ['lighting', 'mood', 'contrast', 'baked vs dynamic', 'post-processing', 'level design'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
