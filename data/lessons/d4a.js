/* Pillar D · Phase d4 · Module d4a — Prep to move */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'd4-01', title: 'Rigging basics for games: skeletons and skinning', pillarId: 'D', phaseId: 'd4', moduleId: 'd4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'To make a model *move*, you give it a **skeleton** — a hierarchy of ((bones)) (also called *joints*) — and then **skin** the mesh to it, so each vertex follows the bones it belongs to. This is the bridge between your static, game-ready mesh and an animator’s work, and it has real-time rules a pretty render never worries about.\n\n' +
'A **skeleton** is a tree of transforms ([[e1-04]]): a hip root, a spine up to the head, two arm chains, two leg chains. Each bone has a position, rotation and scale *relative to its parent*, so rotating the upper arm carries the forearm and hand with it. That parent-child hierarchy is exactly the transform hierarchy a programmer works with in the engine — your bones become the engine’s ((bone)) transforms at runtime.\n\n' +
'**Skinning** binds vertices to bones. Each vertex stores a small list of **weights** — "I am 70% upper-arm, 30% forearm" — that must sum to 1. As bones move, each vertex blends the bones’ transforms by those weights. This is called **linear blend skinning**, and it is what the GPU runs every frame.\n\n' +
'The game-ready constraints:\n' +
'- **Influences per vertex are capped.** Engines commonly limit a vertex to **4 bone influences** (sometimes 2 on mobile). Five small weights become four plus rounding error — so author clean, deliberate weights, not a spray of tiny ones.\n' +
'- **Bone count costs.** Every bone is a transform updated and uploaded each frame; a 200-bone hero is fine, the same on 50 enemies on screen is not. Budget bones like you budget polys ([[d0-02]]).\n' +
'- **The bind pose matters.** Rig in a neutral pose (often a relaxed **A-pose** or **T-pose**) so deformation has room to work in both directions.\n' +
'- **Match the engine’s skeleton when you can.** Humanoid rigs that fit the engine’s standard (e.g. Unity’s Humanoid) can *retarget* shared animation — a huge time-saver for a small team.\n\n' +
'You don’t have to be the team’s animator, but rigging is the seam where your mesh meets the programmer ([[e1-09]]) and the animator. A clean skeleton with sane names and capped influences is a gift to everyone downstream.',
    task:
'Take a character or creature you could model (or one you have) and **plan its skeleton on paper** before touching Blender. Draw the bone hierarchy as a tree: root at the hip, spine chain, head, two arm chains, two leg chains, and any extras the design actually needs (a tail? a jaw? fingers, or just a single hand bone?). Beside it, write a rough **bone budget** and one sentence on *why* — is this a lone hero you see up close, or a crowd enemy where every bone multiplies? Cutting finger bones you’ll never animate is scope discipline, not laziness.',
    success: [
      'You can explain how a bone hierarchy and per-vertex weights combine to deform a mesh.',
      'You can state why engines cap bone influences per vertex (commonly 4) and why bone count is a budget.',
      'You can sketch a sensible humanoid skeleton hierarchy from the root outward.'
    ],
    skills: ['Skeletons & bone hierarchy', 'Skinning & vertex weights', 'Rig budgeting for real-time'],
    simplified: 'The 4-influences-per-vertex and bone-count figures are common defaults, not laws — they vary by engine, platform and import settings (mobile and VR are tighter; some pipelines allow more). Treat them as ballpark and check your target. "Linear blend skinning" is the standard; dual-quaternion and other methods exist for better deformation.',
    goDeeper: 'The official Blender rigging/Armature docs and your engine’s skeletal-mesh import docs (e.g. Unity’s Humanoid / Avatar system, Unreal’s Skeletal Mesh) are the real next step; search reputable "game character rigging" breakdowns for full worked examples.',
    quiz: [
      { q: 'A vertex needs to be influenced by six bones to deform "perfectly", but the engine only allows four. What do you do?', a: 'Re-author the weights so the vertex is driven by the four bones that matter most, and let the engine’s influence cap (often 4) prune the rest. In practice a vertex rarely needs more than 2–4 meaningful influences; six usually means messy weight painting, not a real requirement.' },
      { q: 'Why does bone count behave like a budget rather than a free choice?', a: 'Every bone is a transform that is updated and uploaded to the GPU each frame for each instance. A 150-bone hero seen alone is cheap; the same rig on 40 enemies on screen multiplies that cost. Budget bones by the character’s role and on-screen count, just like polygons.' }
    ],
    tags: ['rigging', 'skeleton', 'skinning', 'weights', 'real-time'] },
  {
    id: 'd4-02', title: 'Weight painting and clean deformation', pillarId: 'D', phaseId: 'd4', moduleId: 'd4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'Skinning a mesh is rarely automatic-and-done. **Weight painting** is the craft of tuning each vertex’s bone influences so the mesh *deforms cleanly* — elbows that don’t collapse, shoulders that don’t tear, a waist that bends without pinching. This is where topology ([[d1-01]]) and rigging meet: good edge loops at the joints give the weights something to bend around; bad topology can’t be saved by painting.\n\n' +
'A weight is a `0–1` value per vertex per bone; painting just edits those values with a brush. The goals are simple to state and fiddly to hit:\n' +
'- **Smooth falloff across a joint.** Influence should *blend* from one bone to the next over a band of vertices, not flip abruptly — a hard seam reads as a crease or a tear when the joint bends.\n' +
'- **Weights sum to 1 (normalised).** A vertex that’s 0.7 + 0.3 is fine; one left at 0.5 + 0.5 with a stray 0.2 elsewhere will misbehave. Keep them normalised.\n' +
'- **Respect the influence cap.** Keep meaningful influences to the engine’s limit (often 4); prune tiny stray weights so they don’t survive export ([[d5-03]]).\n' +
'- **Test by posing, not by looking.** Flat weights look fine until the joint moves. You must rotate the bone to its extremes and *watch* the surface.\n\n' +
'The single most common bug is a vertex accidentally weighted to a far-away bone — a stomach vertex that’s 5% weighted to a hand, so it lurches when the arm raises. Hunting those down is most of the job.\n\n' +
'Game-ready means deformation must look acceptable across the *whole* animation range with no fix-up rig (no offline corrective shapes you can’t afford), within the influence cap. That’s a tighter bar than a hero render that only ever holds one pose.',
    steps: [
      'Bind the mesh: select the mesh, then shift-select the armature, [[Ctrl+P]] → *With Automatic Weights*. This is a *starting point*, not a finish.',
      'Select the mesh and enter **Weight Paint** mode (the mode dropdown). The surface shows weight as a heat scale — *0* cool to *1* warm; always confirm with the on-screen value or vertex selection, never colour alone.',
      'Pick a bone to paint (in pose-aware weight paint you can [[Ctrl]]+click the bone). Paint *Add* to increase, [[Ctrl]] for *Subtract*, and keep **Auto Normalize** on so weights re-balance to sum to 1.',
      'Pose-test as you go: in Pose Mode rotate the joint to its extreme (bend the elbow fully), then return to weight paint and smooth the crease. Use the *Blur*/*Smooth* brush to soften harsh falloff bands.',
      'Hunt strays: use *Weights → Limit Total* (cap to 4) and check for vertices weighted to wrong bones — a quick way is to select one bone’s vertex group and reveal what it touches.',
      'Clean up: *Weights → Normalize All* and *Clean* (remove near-zero weights) so tiny strays don’t export. Re-test every major joint one last time.'
    ],
    task:
'Open any rigged character (bind one with *Automatic Weights* if you must) and **fix one joint** end to end — pick the elbow or the hip. Pose the joint to its extreme so the problem shows, then weight-paint until the bend is smooth: blend the falloff, kill any stray influence, cap to 4 influences, normalise, and re-pose to confirm. Write one line on what the *worst* artefact was before you fixed it (collapse? tear? a vertex pulled by the wrong bone?) — naming the failure is how you learn to spot it fast next time.',
    success: [
      'You can bind a mesh and then improve the result by hand instead of trusting auto-weights.',
      'You can produce smooth falloff across a joint and verify it by posing to extremes, not by the rest pose.',
      'You can find and remove a stray/wrong-bone weight and keep weights normalised within the influence cap.'
    ],
    skills: ['Weight painting', 'Clean joint deformation', 'Finding stray weights', 'Posing to test'],
    simplified: 'Click-paths and brush/menu names are common Blender defaults and move between versions — check your version’s Weight Paint menus. "Automatic Weights" quality depends heavily on clean topology and bone placement; on a messy mesh it can be near-useless, which is the point about topology mattering first.',
    goDeeper: 'Blender’s Weight Paint documentation plus a reputable "game character weight painting" walkthrough will show the brush workflow on a full body; for deformation theory, read up on how joint edge-loops and bone placement drive a clean bend.',
    quiz: [
      { q: 'Your character’s arm looks perfectly weighted in the rest pose but the elbow collapses when bent. What went wrong, and how do you even *see* it?', a: 'Flat-looking rest weights say nothing about deformation — the falloff across the joint is probably too abrupt or the loop weights are off. You only see it by posing: rotate the elbow to its extreme, then smooth the weight falloff across the joint band until the bend holds its volume.' },
      { q: 'Why is clean topology at the joints a prerequisite for good weight painting, not a separate concern?', a: 'Weights bend the surface around the edges you gave it. With proper edge loops at the elbow/knee/shoulder, the mesh has rings to rotate and the falloff has somewhere to live; with too few or badly placed edges, no amount of painting prevents pinching or collapse. Topology first, then weights.' }
    ],
    tags: ['weight painting', 'deformation', 'rigging', 'skinning', 'topology'] },
  {
    id: 'd4-03', title: 'Animation prep: root motion, naming, export-ready', pillarId: 'D', phaseId: 'd4', moduleId: 'd4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A rig that deforms beautifully can still be a nightmare to *ship* if it isn’t prepared for the engine. **Animation prep** is the disciplined handoff: the conventions that let an animator animate it, a programmer drive it ([[e3-01]]), and the engine import it without surprises. Boring, and exactly what separates a hobby asset from a production one.\n\n' +
'**Root motion vs in-place.** A movement animation can be authored two ways. With **root motion**, the character’s actual displacement is baked into the **root bone**, and the engine reads that motion to move the character — footsteps stay planted, no sliding. With **in-place** animation, the character runs on the spot and *code* moves the transform at a set speed. Each is valid; the team must agree *which*, because mixing them gives you a character that either slides or moves twice as fast. The root bone’s behaviour is the contract between you and the programmer.\n\n' +
'**Naming and hierarchy are the real export.** Engines and retargeting systems match bones by *name*. So:\n' +
'- **Stable, conventional bone names** (`Hips`, `Spine`, `UpperArm_L`/`UpperArm_R`) — consistent left/right suffixes, no `Bone.001` noise. This mirrors the file-naming hygiene in [[d5-04]].\n' +
'- **One clean root**, sane hierarchy, no stray helper bones the engine will choke on (or that you must explicitly mark to strip).\n' +
'- **Correct scale and orientation** so the rig imports at the right size and facing — the same scale/units discipline as any mesh export ([[d5-03]]).\n' +
'- **Apply transforms, sane bind pose**, and decide whether you export the mesh and skeleton once and animations separately, or all together — small teams usually split *skeleton+mesh* from *clips* so animations are reusable.\n\n' +
'Done right, a humanoid rig that matches the engine’s standard skeleton can **retarget** shared animation across characters — one of the biggest force-multipliers a small team has. The prep is the price of that gift.',
    task:
'Write a one-page **rig handoff sheet** for a character — the doc you’d hand the animator and programmer. Include: the bone-naming convention (with the exact left/right suffix you’ll use), the root-bone decision (**root motion** or **in-place**, and one line on why), export scale/units and forward axis, and how you’ll split the export (mesh+skeleton vs animation clips). Then list two things you’ll *strip or rename* before export. This sheet is the seam: it’s what makes your rig usable by people who aren’t you.',
    success: [
      'You can explain root motion vs in-place animation and why the team must pick one consistently.',
      'You can state why bone naming and hierarchy are effectively *the* export contract for rigs and retargeting.',
      'You can write a short handoff spec covering names, root behaviour, scale/axis and export split.'
    ],
    skills: ['Root motion vs in-place', 'Rig naming conventions', 'Export-ready prep', 'Animation handoff'],
    simplified: 'Whether to use root motion, and how to split exports, is a team/engine choice with real trade-offs — root motion is great for grounded movement but harder to blend and network; in-place is simpler to control. Exact bone-name standards differ per engine (Unity Humanoid, Unreal’s Mannequin, Mixamo, etc.); pick one and be consistent rather than assuming a universal standard.',
    goDeeper: 'Read your engine’s docs on importing skeletal animation and root motion (Unity’s Animation/Humanoid and Root Motion pages; Unreal’s Skeletal Mesh and Root Motion), and look at an established naming convention (e.g. a standard humanoid skeleton) to see why consistency enables retargeting.',
    quiz: [
      { q: 'A teammate’s character moves across the floor at double the intended speed. What mismatch most likely caused it?', a: 'Root motion and code-driven movement got combined: the animation already moves the character via the root bone *and* the controller also moves the transform, so the displacements add. Pick one — root motion or in-place — per animation and make the code respect that choice.' },
      { q: 'Why does sloppy bone naming break more than just tidiness?', a: 'Engines and retargeting systems map animation onto skeletons by matching bone names. Inconsistent or auto-numbered names (`Bone.001`, mismatched `_L`/`_R`) break retargeting and force per-character fix-ups, so you lose the ability to share one animation set across characters — a huge cost for a small team.' }
    ],
    tags: ['animation prep', 'root motion', 'naming', 'export', 'retargeting'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
