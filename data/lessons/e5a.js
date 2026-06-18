/* Pillar E · Phase e5 · Module e5a — Shaders & effects (graphics branch; pairs with 3D) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e5-01', title: 'How the GPU draws: the rendering pipeline', pillarId: 'E', phaseId: 'e5', moduleId: 'e5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'*This is the graphics branch — it pairs with everything you learned in 3D (Pillar D). The GPU concepts here are **universal**: the same pipeline runs under Godot, Unreal or any engine. Where a tool name appears, it is flagged as engine-specific.*\n\n' +
'Your CPU runs the game loop ([[e1-01]]); the **GPU** turns geometry into the pixels on screen. It does this with a **rendering pipeline** — a fixed sequence of stages that every triangle flows through, the same way each frame. Knowing the stages is what lets you reason about why something is slow, why a material looks wrong, and where a shader plugs in.\n\n' +
'The core path, simplified:\n\n' +
'- **Vertex processing** — every vertex of every mesh is transformed from its local space, through world space, to the camera’s view, and finally to clip/screen space. This is where your model’s position, rotation and scale ([[e1-04]]) actually land it on screen. The **vertex shader** runs here, once per vertex.\n' +
'- **Rasterization** — the GPU figures out which screen **pixels** each triangle covers, turning continuous triangles into a grid of candidate pixels called ((fragments)). Vertex outputs (UVs, normals, colours) are **interpolated** across the triangle’s face.\n' +
'- **Fragment processing** — for each covered fragment, the **fragment (pixel) shader** runs and computes a colour: sampling textures (your albedo/normal/roughness maps from [[d3-01]]), doing lighting, etc.\n' +
'- **Output merge** — depth-testing (is this fragment behind something already drawn?), blending (for transparency), and writing the final pixel to the framebuffer.\n\n' +
'Two ideas that change how you think. First, the GPU is **massively parallel**: it runs the same tiny program over thousands of vertices and millions of fragments at once. That is why it is fast, and why shader code must be simple and branch-light. Second, the cost story is concrete: more triangles = more vertex work; more screen coverage and texture lookups = more fragment work. This is the *real* reason behind the poly budgets and performance triangle from [[d0-02]] — you now see what the budget is *buying*.\n\n' +
'Modern engines wrap this in a **renderer** you pick (Godot 4’s Forward+, Mobile and Compatibility backends; Unreal’s deferred/forward), but the vertex → rasterize → fragment → merge spine is constant underneath.',
    task:
'Draw the pipeline as a five-box flow (vertex → rasterize → fragment → output merge, with "mesh in" before and "pixel on screen" after). For each box write one sentence on what it does. Then take one asset you made in Pillar D and trace it: how many vertices roughly enter vertex processing, and which of *your* texture maps get sampled in the fragment stage? Finally, answer in one line: if a screen-filling fog effect is slow, is that more likely a **vertex** cost or a **fragment** cost — and why?',
    success: [
      'You can name the main pipeline stages in order and say what each does.',
      'You can explain the difference between per-vertex and per-fragment work and why the GPU is parallel.',
      'You can connect poly budgets and texture cost to specific pipeline stages.'
    ],
    skills: ['The rendering pipeline', 'Vertex vs fragment work', 'GPU parallelism', 'Reading render cost'],
    simplified: 'This is the classic rasterization pipeline. Real GPUs add stages (tessellation, geometry/compute shaders, early-Z) and modern engines layer deferred shading, tiled/clustered lighting and ray tracing on top. The vertex → rasterize → fragment → merge core is the durable mental model.',
    goDeeper: 'The opening chapters of *Real-Time Rendering* (Akenine-Möller et al.) are the standard reference; for a gentle visual intro, the official Godot rendering docs and "LearnOpenGL" walk the same stages.',
    quiz: [
      { q: 'What is a fragment, and how does it differ from a final pixel?', a: 'A fragment is a candidate pixel produced by rasterization — all the data needed to potentially colour one screen location for one triangle. Several fragments can compete for the same pixel (overlapping triangles); after depth-testing and blending in the output-merge stage, one (or a blend) becomes the final pixel.' },
      { q: 'Why must shader code be kept simple and branch-light?', a: 'Because the GPU runs the same shader program in parallel across thousands of vertices and millions of fragments. Heavy work or divergent branches multiply across all of them, so a few extra instructions per fragment can cost a lot overall — performance is dominated by how cheap the per-element program is.' }
    ],
    tags: ['gpu', 'rendering pipeline', 'rasterization', 'fragments', 'vertex shader', 'engine-neutral'] },
  {
    id: 'e5-02', title: 'Shaders: vertex and fragment, on the GPU', pillarId: 'E', phaseId: 'e5', moduleId: 'e5a',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 30,
    prereq: '[[e5-01]] (the rendering pipeline) first — a shader is a program for two of its stages.',
    concept:
'A **shader** is a small program that runs *on the GPU*, at a specific pipeline stage, in massive parallel. The two you write most are the **vertex shader** (runs once per vertex) and the **fragment/pixel shader** (runs once per fragment). They are not optional decoration — *everything* you see is the output of a shader. A "material" is mostly a shader plus the data (textures, colours, numbers) you feed it.\n\n' +
'**Vertex shader** — its main job is to output the final clip-space position of each vertex (the transform from [[e5-01]]). It can also move vertices for effects: wind on grass, a wobbling flag, water waves — all done by offsetting positions here, cheaply, because there are far fewer vertices than fragments. It passes data *down* to the fragment stage (UVs, world normal, vertex colour), which the rasterizer interpolates.\n\n' +
'**Fragment shader** — its job is to output a colour for each fragment. This is where texture sampling and lighting math live: sample the albedo at the interpolated UV ([[d2-01]]), perturb the surface normal with the normal map ([[d3-01]]), compute how much light hits it, apply roughness. Most of a game’s "look" is fragment-shader work.\n\n' +
'A tiny fragment shader, in GLSL-flavoured pseudocode:\n\n' +
'```glsl\n// inputs interpolated from the vertices\nin vec2 uv;\nin vec3 worldNormal;\nuniform sampler2D albedoTex;   // a texture you bound\nuniform vec3 lightDir;\n\nvoid main() {\n  vec3 base = texture(albedoTex, uv).rgb;\n  float ndotl = max(dot(normalize(worldNormal), -lightDir), 0.0); // [[e1-05]] dot product\n  outColor = vec4(base * ndotl, 1.0);   // simple diffuse lighting\n}\n```\n\n' +
'Note the **uniform** vs **interpolated** split: a *uniform* is the same for every fragment in a draw (light direction, time, a tint); an *interpolated* `in` varies per fragment (the UV). Animate a uniform like `time` from the CPU and the GPU does the rest — that is the engine of most effects.\n\n' +
'*Engine-specific (Godot 4.x) — in Godot you write text shaders in the **Godot shading language** (a GLSL-like language: you set `shader_type spatial;` then fill in `vertex()` and `fragment()` functions). Unreal uses HLSL/material nodes; Unity uses HLSL. The language differs; vertex-out-position and fragment-out-colour, uniforms vs interpolants, and the math are the same everywhere.* Most game devs reach for a node-based **VisualShader** ([[e5-03]]) before hand-writing code — but reading this lesson is why the graph’s nodes make sense.',
    task:
'On paper, label which stage each effect belongs in (vertex or fragment): (a) grass swaying in wind, (b) a glowing rim of light on a character’s edge, (c) scrolling a water texture, (d) flattening a mesh into the ground as it dies, (e) tinting everything red when the player is hurt. Then take the pseudocode above and describe, in words, what you would change to make the surface pulse brighter over time using a `time` uniform (hint: multiply the colour by something derived from `time`).',
    success: [
      'You can state what a vertex shader and a fragment shader each output, and where each runs.',
      'You can distinguish a uniform (per-draw) from an interpolated input (per-fragment).',
      'You can place a given effect in the right shader stage and reason about its cost.'
    ],
    skills: ['Vertex shaders', 'Fragment shaders', 'Uniforms vs interpolants', 'Shader cost reasoning'],
    simplified: 'GLSL-flavoured pseudocode is shown for readability; Godot’s real shading language is close to this but has its own built-ins and a `shader_type` declaration, and Godot already provides lighting if you use a `spatial` shader — you usually only override `fragment()`. The diffuse term is the simplest lighting model — real PBR shading (from [[d3-01]]) adds specular, energy conservation and more. Concepts transfer; syntax does not.',
    goDeeper: 'For hand-written shaders, "The Book of Shaders" (Gonzalez Vivo & Lowe) teaches fragment shaders interactively; Godot’s shading-language docs and Freya Holmér’s shader talks are excellent for the game-engine flavour.',
    quiz: [
      { q: 'Why are vertex-shader effects (like wind sway) often cheaper than doing the same thing in the fragment shader?', a: 'There are usually far fewer vertices than fragments. A mesh might have a few thousand vertices but cover millions of fragments on screen, so moving work to the per-vertex stage runs it far fewer times. Position offsets are a natural fit for the vertex shader anyway, since it already outputs position.' },
      { q: 'What is the difference between a uniform and an interpolated input in a shader?', a: 'A uniform is a value set once per draw call and identical for every vertex/fragment in it (e.g. light direction, current time, a tint colour). An interpolated input varies smoothly across a triangle — the rasterizer blends the vertices’ values so each fragment gets its own (e.g. UV coordinates, world normal).' },
      { q: 'Roughly how would you make a material pulse brighter over time?', a: 'Feed a `time` uniform from the CPU each frame and use a periodic function of it — e.g. multiply the output colour by `0.5 + 0.5 * sin(time)` so brightness oscillates. The GPU recomputes per fragment every frame; you only update the single uniform.' }
    ],
    tags: ['shaders', 'vertex shader', 'fragment shader', 'glsl', 'uniforms', 'engine-neutral'] },
  {
    id: 'e5-03', title: 'Shader graphs and a first effect', pillarId: 'E', phaseId: 'e5', moduleId: 'e5a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    prereq: '[[e5-02]] (what vertex/fragment shaders do) so the nodes mean something.',
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#) — this lesson uses Godot’s **VisualShader**. The same idea is the **Material Editor** node graph in Unreal. The nodes and wires map almost one-to-one across engines; the concept is fully transferable.*\n\n' +
'A **visual shader** is a node-based way to build a shader without hand-writing the shading language. You drop **nodes** (sample a texture, add, multiply, a `Time` node, a `Fresnel` node) and wire their outputs into inputs, ending at the **Output node** whose ports are exactly the PBR channels you learned in [[d3-01]]: Albedo, Normal, Metallic, Roughness, Emission. Under the hood the graph *compiles to* a real vertex+fragment shader ([[e5-02]]) — the graph is a friendlier face on the same machine.\n\n' +
'Why graphs dominate in studios: they are fast to iterate, readable by artists and designers (the seam to your other roles), and they preview live. The trade-off is less control than hand-written code and occasional overhead, but for most game effects a graph is the right tool.\n\n' +
'Your first classic effect is a **Fresnel rim glow** — a bright edge that appears where a surface faces away from the camera, used for highlights, shields, ghostly outlines and selection feedback (a juice/readability concern, [[b0-04]]). It uses the **Fresnel** node, which is just `dot(viewDirection, normal)` ([[e1-05]]) reshaped so edges glow. Wire it through a colour and a power control, into **Emission**, and you have a self-lit rim that needs no scene light.\n\n' +
'*C# is fully supported in Godot and equally valid for the gameplay scripts that drive a shader (setting parameters each frame), but the shader graph itself is the same VisualShader resource either way — the language choice does not change this lesson.*\n\n' +
'You cannot run an engine in this course, so the steps below are the exact click-path and node graph; build it for real in your engine and watch it preview. Keep the scope tiny: one node graph, one effect, one tweakable strength — that is a complete, shippable shader.',
    steps: [
      '1. Select the mesh (a `MeshInstance3D`) in the scene. In the Inspector, under *Material*, create a new **ShaderMaterial**, then on its *Shader* slot create a new **VisualShader**. Double-click the VisualShader to open the shader editor at the bottom of the screen.',
      '2. The graph opens with an **Output** node on the right carrying PBR ports (Albedo, Metallic, Roughness, Emission…). The shader mode is *spatial* (3D) by default — that gives you those PBR ports.',
      '3. Right-click the canvas (or use the **Add Node** button) → search **Fresnel**. Add the *Fresnel* node; it outputs a value near 0 facing the camera and near 1 at glancing edges.',
      '4. Add a **Power** (Scalar → Power, or a *Pow* node); wire Fresnel → its base input. Add a **uniform** float for the exponent to control how tight the rim is (higher = thinner edge): right-click → add a *ScalarUniform* named `rim_power`.',
      '5. Add a **ColorUniform** (a `vec3`/color uniform) named `rim_color`. Add a **VectorOp → Multiply** node and multiply the Power output by `rim_color`.',
      '6. Wire the Multiply result into the Output node’s **Emission** port so the rim is self-lit. Optionally feed **Albedo** from a *Texture2D* sample node for the body of the material.',
      '7. Add a **ScalarUniform** `rim_strength` (default 1) and multiply it into the chain. Uniforms automatically appear as editable parameters on the ShaderMaterial in the Inspector (under *Shader Parameters*).',
      '8. The shader applies live as you wire it — no separate save step is needed, but [[Ctrl+S]] the scene (`.tscn`) to keep your changes. Tweak `rim_color` / `rim_strength` live under *Shader Parameters* in the Inspector and watch the viewport update.'
    ],
    task:
'Build the rim-glow VisualShader from the steps above in Godot (or the equivalent Unreal Material if you are on that engine). Apply it to an asset you made in Pillar D. Then **extend it once**: add a `Time` node and a `Sin` node so the rim **pulses**, wiring the result into the strength — exactly the animated-uniform idea from [[e5-02]] (`Time` is a built-in input, so the GPU animates it with no script). Write three sentences: what each of Fresnel, Power and Emission contributed, and one gameplay use you would put this effect to (selection highlight, low-health warning, interactable prompt).',
    success: [
      'You built a working node graph that outputs a camera-edge rim glow via the Emission channel.',
      'You can name what the Fresnel, Power, Multiply and Emission nodes each do.',
      'You exposed at least one property and tuned the effect live, and added a time-driven pulse.'
    ],
    skills: ['Shader graphs', 'The Fresnel effect', 'Exposed material properties', 'Animating a shader with time'],
    simplified: 'Exact node names and menu paths are version-dependent (VisualShader node names and categories shift between Godot 4.x releases, and the Unreal equivalent differs) — treat the click-path as a common-defaults guide and check your version. The Fresnel node hides some math (it is a reshaped view-normal dot product); the principle is what matters.',
    goDeeper: 'Godot’s official VisualShader and shading-language docs, Ben Cloward’s shader-graph tutorial series, and the Godot demo projects all build effects node-by-node from here (dissolve, hologram, water).',
    quiz: [
      { q: 'A visual shader avoids writing code — does that mean it is not really a shader?', a: 'No. The graph is a visual authoring tool that compiles down to a real vertex+fragment shader running on the GPU. The nodes and wires become the same kind of program you would otherwise hand-write in the Godot shading language — you have just built it visually.' },
      { q: 'Why wire the rim result into Emission rather than Base Color?', a: 'Emission makes the surface appear to emit its own light, so the rim glows regardless of scene lighting and reads clearly as a highlight. Base Color is modulated by lights and shadow, so the rim could be dimmed or lost — Emission gives the dependable, self-lit look the effect needs.' }
    ],
    tags: ['visual shader', 'fresnel', 'rim glow', 'emission', 'node-based', 'engine-specific'] },
  {
    id: 'e5-04', title: 'Visual effects and particles', pillarId: 'E', phaseId: 'e5', moduleId: 'e5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'**Visual effects (VFX)** are the sparks, smoke, fire, dust, magic and impact flashes that sell a moment. Most are built from **particle systems**: an **emitter** spawns many small, short-lived **particles**, each with its own position, velocity, size, colour and lifetime, all animated over that lifetime. One explosion might be hundreds of particles born at once and fading over a second.\n\n' +
'The mental model is a tiny simulation, frame-by-frame ([[e1-01]]), driven by curves and randomness:\n\n' +
'- **Emission** — how many spawn, and when (a burst for an impact; a steady rate for a torch).\n' +
'- **Initial state** — starting position (a shape: cone, sphere, edge), velocity, size, colour, rotation, with **random ranges** so no two particles match (variation is what kills the "fake" look).\n' +
'- **Over-lifetime** — particles usually scale, fade (colour/alpha over life), slow down, and rotate as they age; gravity or wind can pull them.\n' +
'- **Rendering** — each particle is typically a camera-facing **billboard** (a quad always facing the camera) showing a texture, often with **additive blending** so overlapping particles brighten (great for fire/magic) — versus alpha blending for smoke.\n\n' +
'`particle.velocity += gravity * dt; particle.position += velocity * dt; particle.age += dt` — the same delta-time motion ([[e1-02]]) you already know, run over a swarm. The shader and blend mode are the [[e5-02]] knowledge applied to billboards.\n\n' +
'VFX is **game feel** ([[b0-04]]) made visible: a hit feels meatier with a spark and a puff, a pickup pops with a sparkle. But it is also a classic **scope and performance trap**. Particles are cheap individually and ruinous in bulk — thousands of large, overlapping, additive particles cause **overdraw** (the same fragments shaded many times, [[e5-01]]). Discipline: a few well-timed, well-shaped effects beat a constant blizzard. For a student game, build a small reusable set — hit, pickup, footstep dust, one ambient — not a bespoke effect for everything.\n\n' +
'*Engine-specific — Godot ships two node types: **GPUParticles2D/3D** (simulated on the GPU, for high counts, driven by a `ParticleProcessMaterial`) and **CPUParticles2D/3D** (the same controls on the CPU, useful on weaker GPUs or the Compatibility renderer). Unreal has **Niagara**. The emitter → initial → over-lifetime → render model is shared by all of them.*',
    task:
'Pick one effect — a melee hit spark, a magic pickup, or a dust puff on landing — and write a one-page "particle spec" a teammate could build: emission (burst or rate, count), initial velocity/size/colour with their random ranges, what changes over lifetime (size curve, colour/alpha fade), the texture and blend mode (additive vs alpha), and the lifetime in seconds. Then add a **budget line**: the maximum particle count you would allow on screen at once, and one sentence on why over-spawning hurts performance.',
    success: [
      'You can describe a particle system as emitter + per-particle state animated over lifetime.',
      'You can choose burst vs rate emission and additive vs alpha blending for a given effect.',
      'You can explain overdraw and write a sane particle budget for a small game.'
    ],
    skills: ['Particle systems', 'Emission & lifetime curves', 'Billboards & blend modes', 'VFX budgeting'],
    simplified: 'This is the standard billboard-particle model. Modern GPU systems (Godot’s GPUParticles, Unreal Niagara) simulate huge counts on the GPU and add meshes, ribbons/trails, collision and flipbook animation — more power, same core concepts. Exact property/menu names are version-dependent.',
    goDeeper: 'Godot’s GPUParticles and ParticleProcessMaterial docs, Unreal’s Niagara learning path, and the GDC talks on real-time VFX go deep on timing, shape and the art of "feel".',
    quiz: [
      { q: 'Why use random ranges for a particle’s starting velocity, size and colour?', a: 'Identical particles read as obviously fake and mechanical. Spreading each starting value over a random range makes the swarm look organic and varied — real smoke, sparks and dust are irregular. Controlled randomness is most of what makes an effect convincing.' },
      { q: 'What is overdraw, and why do particles make it worse?', a: 'Overdraw is the same screen fragments being shaded multiple times because many surfaces overlap there. Particles are usually large, transparent, camera-facing quads that pile up — every overlapping layer re-runs the fragment shader on those pixels, so a dense burst can shade some pixels dozens of times and tank the frame rate.' }
    ],
    tags: ['vfx', 'particles', 'emitter', 'billboards', 'overdraw', 'game feel'] },
  {
    id: 'e5-05', title: 'Post-processing', pillarId: 'E', phaseId: 'e5', moduleId: 'e5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'**Post-processing** is a set of full-screen image effects applied *after* the scene is rendered, treating the finished frame as a picture and re-shading it. The whole image becomes the input to one more fragment-shader pass ([[e5-02]]): the screen is a giant quad, the rendered frame is a texture, and effects read neighbouring pixels to produce the final look. It is the cheap, high-impact layer that makes a "flat" scene feel cinematic.\n\n' +
'Common effects, and what each does:\n\n' +
'- **Bloom** — bright areas bleed a soft glow (extract bright pixels, blur, add back). Sells emissive things: lights, magic, your rim glow from [[e5-03]].\n' +
'- **Tonemapping & colour grading** — maps high-dynamic-range light into displayable range and shifts the palette (teal-orange, cold, warm). This is where a level’s **mood** ([[c3-01]]) is dialled in for real — the seam from level/3D to graphics.\n' +
'- **Ambient occlusion (SSAO)** — darkens contact creases and corners using the depth buffer, grounding objects in the scene.\n' +
'- **Depth of field, motion blur, vignette, chromatic aberration, film grain** — focus and stylistic touches.\n' +
'- **Anti-aliasing (FXAA/TAA)** — smooths the jagged edges rasterization leaves ([[e5-01]]).\n\n' +
'Two honest warnings. **Order matters** and these effects are global — they hit *everything*, so a heavy grade can wreck readability or hide gameplay-critical contrast (a UI/feedback concern, [[b0-04]]). And it is a **taste trap**: new devs pile on bloom, grain, aberration and blur until the image is mush. The discipline is restraint — a tasteful grade and a touch of bloom lift a scene; a stack of every effect buries it. Post-processing also costs fragment time per pixel of the screen, so on a budget keep the stack lean.\n\n' +
'*Engine-specific — Godot exposes these effects on an **`Environment`** resource attached to a **`WorldEnvironment`** node (glow for bloom, tonemap, adjustments for colour grading, plus SSAO, SSR and more); some are also configurable per-`Camera3D`. Unreal uses a **Post Process Volume** with the same effect set. The effects and their meaning are identical across engines; only where you tick the boxes differs.*',
    task:
'Take a screenshot of any game you own and write down which post-processing effects you can identify (look for glow around lights = bloom, a colour cast = grading, soft far backgrounds = depth of field, darkened corners = vignette, grounded shadows in creases = AO). Then write a **three-effect "house grade"** you would apply to a calm, warm indoor level and a **different** three-effect grade for a cold, tense one — and one sentence on a readability risk you would watch for in each.',
    success: [
      'You can explain that post-processing re-shades the finished frame as a full-screen pass.',
      'You can name what bloom, colour grading and ambient occlusion each contribute.',
      'You can argue for restraint and spot when post fx harm readability or performance.'
    ],
    skills: ['Post-processing', 'Bloom & colour grading', 'Mood through grade', 'Effect restraint'],
    simplified: 'Effect names, the Environment workflow and defaults are version- and renderer-dependent (Godot’s Forward+ renderer supports more than the Mobile/Compatibility backends; some effects are Forward+-only). The "full-screen pass that re-shades the frame" model holds everywhere; treat specifics as common defaults to verify in your version.',
    goDeeper: 'Godot’s Environment and post-processing docs, Unreal’s Post Process Volume reference, and colour-grading talks/LUT tutorials go deep; for the why, any DOP/cinematography primer on grading and mood transfers directly.',
    quiz: [
      { q: 'Mechanically, how does a post-processing effect work?', a: 'After the scene is rendered to a texture, the engine draws a full-screen quad and runs a fragment shader that samples that texture (and often the depth buffer and neighbouring pixels) to compute each final pixel. Effects are just extra full-screen passes re-shading the finished image.' },
      { q: 'Why can post-processing hurt a game even though it looks impressive?', a: 'It is global and applied late, so a heavy grade or stacked effects can crush contrast, wash out colours, blur or glow over gameplay-critical detail, and cost real fragment time per screen pixel. Readability and performance suffer — restraint and a light, intentional grade beat piling on every effect.' }
    ],
    tags: ['post-processing', 'bloom', 'colour grading', 'ambient occlusion', 'screen-space', 'mood'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
