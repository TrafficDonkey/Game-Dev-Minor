/* Pillar E · Phase e1 · Module e1b — Math & motion (Layer 1, engine-neutral) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e1-04', title: 'Vectors and transforms: position, rotation, scale', pillarId: 'E', phaseId: 'e1', moduleId: 'e1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26, diagram: 'playground',
    concept:
'*Layer-1, engine-neutral: vectors are the same maths in Godot, Unreal and Unity — only the type names change. We point to those names so you see what transfers.*\n\n' +
'A ((vector)) is the single most-used idea in game code. It is just an ordered group of numbers: a 2D vector is `(x, y)`, a 3D vector is `(x, y, z)`. The trick is that one vector can mean two different things, and you must always know which:\n\n' +
'- A **position** — a point in space. "The player is at `(3, 0, 5)`."\n' +
'- A **direction / displacement** — an arrow with a length, no fixed location. "Move `(0, 0, 1)` per second" (forward).\n\n' +
'Treating a position like a direction (or vice-versa) is a classic source of "why is everything in the wrong place?" bugs. Both are stored identically; the *meaning* lives in your head and your naming.\n\n' +
'Vectors add and subtract component-wise, and these two operations carry almost all of game motion:\n\n' +
'```\nA + B  =  (Ax+Bx, Ay+By, Az+Bz)   // apply a movement to a position\nB - A  =  (Bx-Ax, By-Ay, Bz-Az)   // the arrow FROM A TO B (target - origin)\n```\n\n' +
'That second line is worth memorising: **target minus origin gives the direction to the target** — the basis of chasing, aiming and "look at". Scaling a vector by a number changes its length: `dir * speed * dt` is exactly the frame-independent move from [[e1-02]].\n\n' +
'Every object also has a **transform**: its **position**, **rotation** and **scale**, which together place it in the world. Rotation is the fiddly one — in 2D it is a single angle, but in 3D engines store it as a ((quaternion)) under the hood (to dodge a failure called gimbal lock) while showing you friendlier Euler angles in the inspector. You rarely build quaternions by hand; you ask the engine ("rotate 90° around up", "look at this point").\n\n' +
'Transforms also nest: a turret parented to a tank has a **local** transform (relative to the tank) and a **world** transform (relative to the scene). Move the tank and the turret follows for free. Names you will meet for the vector type: Godot `Vector3`, Unreal `FVector`, Unity `Vector3` (same idea elsewhere). In Godot a node’s transform is reached through `position`, `rotation`, `scale` (2D) or `global_transform` / `Transform3D` (3D). Same three numbers everywhere.',
    task:
'In the **Code playground**, represent two points `a = (1, 2)` and `b = (4, 6)`. Compute `b - a` to get the direction from `a` to `b`, and confirm by hand it points up-and-right. Then write a one-line "move toward target" step: `pos = pos + (target - pos) * speed * dt` and reason about what happens as `pos` nears `target`. Finally, in one sentence each, say which of these is a **position** and which is a **direction**: the camera’s location, "gravity is `(0, -9.8, 0)`", a spawn point, "the player faces `(0, 0, 1)`".',
    success: [
      'You can tell a position vector from a direction/displacement vector and name an example of each.',
      'You can compute `target - origin` to get a direction, and scale a direction by `speed * dt` to move.',
      'You can name the three parts of a transform and say why 3D rotation is stored as a quaternion, not raw Euler angles.'
    ],
    skills: ['Vectors as position vs direction', 'Vector add/subtract for motion', 'The transform (position/rotation/scale)'],
    simplified: 'Quaternions are stated as "the engine handles them" here — the full maths (and why they beat Euler angles for interpolation and gimbal lock) is a deeper topic you can take on later. Local-vs-world transform hierarchies also go deeper than this overview.',
    goDeeper: '"3D Math Primer for Graphics and Game Development" (Dunn & Parberry) is the standard reference; for an intuitive feel, the 3Blue1Brown "Essence of Linear Algebra" series builds vectors visually.',
    quiz: [
      { q: 'You want the direction from the player to an enemy. Which subtraction, and why that order?', a: '`enemy - player` (target minus origin). The result is the arrow pointing FROM the player TO the enemy. Reversing it (`player - enemy`) gives the arrow pointing back at the player — the opposite direction — which is the usual cause of things fleeing when they should chase.' },
      { q: 'Why do 3D engines store rotation as a quaternion instead of three Euler angles?', a: 'Euler angles suffer gimbal lock (axes can line up and you lose a degree of freedom) and interpolate awkwardly. Quaternions avoid gimbal lock and blend smoothly between orientations, so engines use them internally — even while showing friendlier Euler angles in the inspector.' }
    ],
    tags: ['vectors', 'transform', 'position', 'rotation', 'quaternion', 'engine-neutral'] },
  {
    id: 'e1-05', title: '3D math you actually need (dot, cross, lerp)', pillarId: 'E', phaseId: 'e1', moduleId: 'e1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 28, diagram: 'playground',
    concept:
'*Layer-1, engine-neutral. You will not derive these from scratch — engines ship them — but knowing what each *does* turns gameplay problems into one-liners.*\n\n' +
'Three operations cover an enormous amount of gameplay code. First, two preliminaries: a vector’s **length** (magnitude) is how long the arrow is, and **normalising** scales it to length 1 (a pure direction). Always normalise a direction before you trust an angle from it.\n\n' +
'**Dot product** (`A · B`) takes two vectors and returns a single number. For *normalised* vectors it equals the cosine of the angle between them, which gives you a cheap "are these aligned?" test:\n\n' +
'```\ndot = Ax*Bx + Ay*By + Az*Bz\n//  ~ +1  same direction\n//   0    perpendicular (90°)\n//  ~ -1  opposite\n```\n\n' +
'Use it for: *is the enemy in front of me?* (dot of my forward and the direction to it > 0), field-of-view cones, and how directly a surface faces a light (the heart of diffuse shading, [[e5-01]]).\n\n' +
'**Cross product** (`A × B`) takes two vectors and returns a *new vector perpendicular to both*. Its headline use is finding a surface’s **normal** — the facing direction of a triangle — and building a coordinate frame ("given forward and up, give me right"). It is also how you tell *which side* something is on (turn left or right to face a target).\n\n' +
'**Lerp** (linear interpolation) blends between two values by a fraction `t` in `0..1`:\n\n' +
'```\nlerp(a, b, t) = a + (b - a) * t\n//  t=0 -> a,  t=1 -> b,  t=0.5 -> halfway\n```\n\n' +
'Lerp is the workhorse of *smoothing*: easing a camera toward a target, fading health bars, blending colours, dissolving between two states. The same idea on vectors moves a point smoothly; on rotations the engine offers `slerp` (spherical lerp) so turns curve correctly. A common "smooth follow" trick is `pos = lerp(pos, target, k * dt)` each frame — cheap, springy, and everywhere in game feel ([[b0-04]]).\n\n' +
'You rarely write the formulas: in Godot they are methods on the vector type itself — `a.dot(b)`, `a.cross(b)`, `a.lerp(b, t)`, plus `a.length()`, `a.normalized()`, and `lerp(a, b, t)` / `a.slerp(b, t)` for scalars and rotations; Unreal and Unity mirror them (same idea elsewhere). Knowing *which tool answers which question* is the actual skill — and it transfers across engines.',
    task:
'In the **Code playground**: (1) write `dot(a, b)` and test it on `(1,0)`·`(1,0)` (expect 1), `(1,0)`·`(0,1)` (expect 0) and `(1,0)`·`(-1,0)` (expect -1). (2) Write `lerp(a, b, t)` and print `lerp(0, 100, 0.25)` (expect 25). (3) On paper, pick the right tool for each: "is the player within a 60° view cone?", "which way should the guard turn to face the noise?", "fade the screen from black to clear over 1 second". Name dot, cross or lerp for each and one sentence why.',
    success: [
      'You can state what dot returns (a number; alignment) and use its sign for in-front / behind / perpendicular.',
      'You can say what cross returns (a perpendicular vector) and name a use (surface normal, left/right side).',
      'You can write `lerp(a, b, t)` and use it to smooth a value, position or fade over time.'
    ],
    skills: ['Dot product for alignment/FOV', 'Cross product for normals/orientation', 'Lerp for smoothing & blending'],
    simplified: 'Cross product is right-handed and order-dependent (`A×B = -(B×A)`); engines fix a handedness convention and may differ — check yours. "Lerp toward target each frame" with `dt` is frame-rate-sensitive in the strict sense; it is fine for feel but not for deterministic physics.',
    goDeeper: 'Freya Holmér’s talks "The Beauty of Bézier Curves" and her lerp/spline explainers are an outstanding visual treatment; Dunn & Parberry’s "3D Math Primer" covers the rigorous version of all three.',
    quiz: [
      { q: 'You normalise the direction to a target and dot it with your normalised forward vector. The result is about -0.9. Where is the target?', a: 'Almost directly behind you. A dot near +1 means aligned (in front), near 0 means about 90° to the side, and near -1 means opposite — so -0.9 is roughly behind. This is exactly how a "can I see it?" or field-of-view check works.' },
      { q: 'What does `lerp(a, b, t)` give for t = 0, t = 1 and t = 0.5, and name one game use.', a: 'It returns `a` at t=0, `b` at t=1, and the halfway value at t=0.5 — a straight-line blend. Uses: smoothing a camera toward a target, fading UI, blending colours, or easing any value from one state to another over time.' },
      { q: 'Why use the cross product to get a triangle’s normal?', a: 'The cross of two of the triangle’s edge vectors is perpendicular to both, i.e. perpendicular to the triangle’s surface — that perpendicular is the normal, which lighting and physics use to know which way the face points.' }
    ],
    tags: ['dot product', 'cross product', 'lerp', 'normalize', 'vector math', 'engine-neutral'] },
  {
    id: 'e1-06', title: 'Collision and physics concepts', pillarId: 'E', phaseId: 'e1', moduleId: 'e1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'*Layer-1, engine-neutral. Engines bundle a physics engine (Godot ships its own; Unreal uses Chaos, Unity PhysX — same idea elsewhere) — you mostly *configure* it, but understanding the model is what makes it stop fighting you.*\n\n' +
'Physics in games is really two separable jobs: **collision detection** (did two shapes touch?) and **collision response / simulation** (what happens next — bounce, slide, stop, take damage). You can use either without the other: a pickup needs detection (a ((trigger))) but no bouncing; a falling crate needs both.\n\n' +
'**Colliders, not meshes.** Real-time physics almost never tests your detailed render mesh — far too expensive. Instead each object gets a cheap proxy **collider**: a box, sphere, capsule, or a simplified convex hull. Capsules are the standard for characters (they slide up steps and around corners). The cheap-shape rule is a direct seam to 3D and level design: your beautiful model and its collider are different objects, and the collider is what the game actually feels ([[d0-01]], [[c1-03]]).\n\n' +
'**Broad phase then narrow phase.** Testing every object against every other is O(n²) and dies fast. Engines first do a cheap **broad phase** (using bounding boxes / spatial partitioning) to throw out pairs that *can’t* be touching, then run exact **narrow-phase** tests only on the survivors. You don’t write this, but it explains why thousands of colliders can still tank your frame rate.\n\n' +
'**Static vs dynamic, and tunnelling.** Mark never-moving geometry **static** so the engine can optimise it; moving bodies are **dynamic** (or **kinematic** — moved by code, not forces). In Godot these map to distinct node types — `StaticBody2D/3D`, `RigidBody2D/3D` (forces), and `CharacterBody2D/3D` for the kinematic, code-driven case (you set `velocity` and call `move_and_slide()`); same idea elsewhere under other names. One bug to know by name: **tunnelling**, where a fast object skips *through* a thin wall because between two frames it teleported past it. The fix is **continuous collision detection** (sweep the shape along its path) — turn it on for bullets and fast players.\n\n' +
'**Triggers vs solid collisions.** A *solid* collision pushes objects apart and reports contact; a *trigger* overlaps freely and just fires an event (entered/exited a zone) — perfect for pickups, checkpoints and damage volumes, and the usual seam to gameplay and level scripting. In Godot a trigger is an `Area2D/3D` (with a `CollisionShape2D/3D`) that emits the `body_entered` / `body_exited` ((signal))s you connect to; same idea elsewhere (e.g. an OnTriggerEnter callback in Unity).\n\n' +
'Finally, recall from [[e1-02]]: physics runs on a **fixed timestep** for stability, separate from your variable render frame — which is why physics-touching code belongs in the fixed update, not the per-frame one.',
    task:
'Pick a game you know and audit its physics on paper. (1) List three things that need only a **trigger** (detection, no response) and two that need full **solid** collision response. (2) For the player character, name the collider shape you’d choose and why. (3) Name one object in that game fast enough to risk **tunnelling**, and state the fix. (4) In one sentence, say why the collider should be simpler than the render mesh — connecting to what you know about poly budgets from [[d0-01]].',
    success: [
      'You can separate collision detection from collision response and give an example that needs only one.',
      'You can explain why games collide simplified colliders (box/sphere/capsule/convex) instead of the render mesh.',
      'You can define tunnelling and name its fix (continuous collision detection), and say why physics uses a fixed timestep.'
    ],
    skills: ['Detection vs response', 'Colliders & collider shapes', 'Broad/narrow phase, triggers, tunnelling'],
    simplified: 'Real solvers (impulse-based response, friction, restitution, constraint solving, sleeping bodies) are far deeper than this conceptual map; the named engines differ in details and defaults. The goal here is the correct mental model, not a physics-engine implementation.',
    goDeeper: 'Ian Millington’s "Game Physics Engine Development" builds one from scratch; Erin Catto’s Box2D talks and GDC physics sessions are the practical canon. Your engine’s physics docs (colliders, layers, continuous detection) are the day-to-day reference.',
    quiz: [
      { q: 'What is the difference between a trigger and a solid collision, and when do you want a trigger?', a: 'A solid collision physically pushes objects apart and reports contact; a trigger lets shapes overlap freely and just fires enter/exit events. Use a trigger when you need to detect presence but not block movement — pickups, checkpoints, damage zones, cutscene volumes.' },
      { q: 'A bullet passes straight through a thin wall some frames. What is this called and how do you fix it?', a: 'Tunnelling: between two physics steps the fast object moved entirely past the thin collider, so no overlap was ever detected. The fix is continuous collision detection, which sweeps the shape along its travel path instead of only testing its start and end positions.' },
      { q: 'Why do engines run a broad phase before the narrow phase?', a: 'Exhaustively testing every pair of colliders is O(n²) and collapses with many objects. The broad phase uses cheap bounding-box / spatial checks to discard pairs that can’t possibly be touching, so the expensive exact (narrow-phase) test runs on only the few plausible pairs.' }
    ],
    tags: ['collision', 'physics', 'colliders', 'triggers', 'tunnelling', 'engine-neutral'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
