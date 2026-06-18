/* Pillar E · Phase e2 · Module e2a — Godot 4.x foundations (Layer 2, engine-specific) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e2-01', title: 'Layer 2 intro: you are using Godot — GDScript or C#', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The same ideas exist in Unreal (C++/Blueprints) and Unity (C#); we name those equivalents in passing so the **concept** stays portable even though the syntax does not.*\n\n' +
'Everything in phase [[e1-01]] was deliberately engine-neutral: you wrote the loop, you owned the math, you reasoned in pseudocode. **Layer 2 is the moment the engine takes the wheel.** You stop writing the `while (running)` loop and start *plugging into* a loop Godot already runs for you. Nothing you learned is wasted — it becomes the mental model that makes the engine stop being magic.\n\n' +
'The minor’s engine is **Godot 4.x**, and you may write in **GDScript or C#** for both the group project and your individual deliverables. GDScript is Godot’s built-in, Python-flavoured language and the fastest way to read engine examples; it is what we show first. **C# is fully supported and equally valid** — statically typed, closer to the JS/C# fundamentals you built in Layer 1, and more transferable — so if you prefer it, use it. We will not double every snippet; we show GDScript and note the C# form only where it clarifies.\n\n' +
'Here is the map, concept by concept:\n\n' +
'- The **game loop** ([[e1-01]]) → you no longer write it. Godot calls your `_process(delta)` every frame.\n' +
'- **Delta time** ([[e1-02]]) → the `delta` argument passed into `_process` (a `float`; a `double` in C#). You can also ask `get_process_delta_time()`.\n' +
'- **Fixed-step physics** → Godot calls `_physics_process(delta)` on a fixed timestep for anything physics-related.\n' +
'- **Input** ([[e1-03]]) → named **InputMap** actions: `Input.is_action_just_pressed("jump")`, `Input.get_axis("move_left","move_right")`. This is the *named action* habit you already learned.\n' +
'- **Vectors & transforms** ([[e1-04]]) → `Vector2`/`Vector3` (same names as Layer 1); a node’s transform is its `position`, `rotation`, `scale`.\n' +
'- **Composition** ([[e1-09]]) → Godot composes via a **scene tree** of **Nodes**, and your script *extends a Node type*. There is no `MonoBehaviour` base class to inherit — the scriptable unit is a node with a script attached.\n\n' +
'A tiny taste of GDScript (note: tabs for indentation):\n\n' +
'```gdscript\nextends Node2D\n\nfunc _ready() -> void:\n\tprint("ready")          # called once, when the node enters the tree\n\nfunc _process(delta: float) -> void:\n\tposition.x += 60.0 * delta   # continuous change → × delta ([[e1-02]])\n```\n\n' +
'The same thing in C#: a `public partial class Foo : Node2D` with `public override void _Ready()` and `public override void _Process(double delta)` — PascalCase virtuals, a `double delta`, and `[Export]` instead of an exported var. Pick one language and stay consistent within a script.\n\n' +
'Treat the engine as *one binding of universal ideas*. That is the whole point of the two-layer split: **Layer 1 is the career, Layer 2 is the tool you happen to hold.** Do not skip Layer 1 and just memorise Godot menus — menu knowledge expires; the loop, `dt` and vectors do not.',
    task:
'Build your own translation table. In a doc or notebook, make four rows — **game loop, delta time, input, transform** — and three columns: **Concept (Layer 1)**, **Godot (GDScript)**, and **the C# form in Godot**. Fill every cell from this lesson plus your own recall of [[e1-02]] and [[e1-04]]. Then write two sentences: one on *what you stop writing yourself* when you move to an engine, and one on *why that does not make Layer 1 a waste of time*. If you are undecided on a language, note one reason you might pick GDScript and one reason you might pick C#.',
    success: [
      'You can state that the engine owns the loop and calls your code through a per-frame hook (`_process(delta)`).',
      'You can map at least four Layer-1 concepts to their Godot name, and give the C# equivalent for the frame hook.',
      'You can explain why learning the neutral concept first makes switching engines (or languages) cheap.'
    ],
    skills: ['Layer-1 → Layer-2 mapping', 'Godot scripting mindset', 'GDScript vs C# choice'],
    simplified: 'The engine equivalents here are the common, current Godot 4.x ones; exact API names and menu paths shift between point releases. Treat names as "check your version", concepts as durable.',
    goDeeper: 'Read Godot’s "Idle and Physics processing" and "GDScript basics" pages to see the real loop you are plugging into; if you lean C#, skim "C# basics" and "C# API differences to GDScript" in the Godot docs.',
    quiz: [
      { q: 'When you move from a from-scratch JS game to Godot, what is the single biggest change to how your code runs?', a: 'You stop writing the main loop yourself. The engine owns the `while`-style loop and calls your code each frame through a hook — `_process(delta)` in Godot. Your logic now lives inside methods the engine invokes, rather than inside a loop you control.' },
      { q: 'Godot supports both GDScript and C#. How should you choose, and does it matter for this course?', a: 'Either is fully valid for the minor. GDScript is built in, concise, and the quickest way to read engine examples; C# is statically typed, closer to the Layer-1 fundamentals, and more transferable. Pick one and stay consistent within a script — the underlying concepts (loop, delta, nodes) are identical in both.' },
      { q: 'Why does the course teach engine-neutral concepts (Layer 1) before Godot specifics (Layer 2)?', a: 'Because the concepts — game loop, delta time, vectors, composition — are true in every engine, while syntax and menus are not. Learning the durable idea first means switching engine or language is a quick re-binding rather than re-learning game programming from scratch.' }
    ],
    tags: ['godot', 'gdscript', 'c#', 'layer 2', 'engine mapping'] },
  {
    id: 'e2-02', title: 'Nodes, scenes and scripts in Godot', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The same idea is a `GameObject` + components in Unity, and an Actor + Components in Unreal.*\n\n' +
'Godot is built on **composition through a scene tree**, the exact idea from [[e1-09]]. The atom is a **Node**. A bare `Node` does almost nothing; behaviour comes from *which node type* it is and *what child nodes* you give it. Godot ships hundreds of typed nodes: a `Sprite2D` draws a texture, a `CollisionShape2D` gives a body its shape, a `CharacterBody2D` is a kinematic mover, an `AudioStreamPlayer` makes sound, a `Camera2D` frames the view. A "player" is not a deep `Player` class — it is a small **tree of nodes** that together act like a player.\n\n' +
'A saved tree of nodes is a **Scene**, stored as a text `.tscn` file. Scenes are first-class and *nestable*: a scene can be instanced as a child inside another scene, which is how Godot composes a whole game out of small, reusable parts. This is the rough equivalent of a prefab elsewhere — a reusable scene is a **`PackedScene`**.\n\n' +
'Your *own* behaviour is a **script attached to a node**. There is no `MonoBehaviour`-style base class to inherit; instead your script **extends a node type**, and Godot calls its special methods at the right times:\n\n' +
'```gdscript\nextends CharacterBody2D\n\n@export var speed: float = 220.0    # @export shows up as an editable field in the Inspector\n\nfunc _ready() -> void:              # called once, when the node enters the tree\n\tprint("Player ready")\n\nfunc _process(delta: float) -> void:   # called every frame — your hook into the loop\n\tposition.x += speed * delta\n```\n\n' +
'Three things to notice. First, an `@export var` appears in the **Inspector**, so a designer can tune `speed` without touching code — that is the seam to [[b2-01]] and the data-driven habit of [[e3-02]]. (In C# you write `[Export] public float Speed = 220f;`.) Second, `position` is available because the script *is* the node — there is no separate transform object to fetch. Third, `_ready()` and `_process()` are not functions *you* call — Godot calls them. You are filling in blanks in a loop you do not own.\n\n' +
'The transferable shape — *an entity is a tree of typed nodes, and your script is attached to one of them* — is exactly the Unity `GameObject`/component and Unreal Actor/Component story. Learn it once here; it re-binds everywhere.',
    task:
'Without an engine open, *design a scene on paper.* Pick one entity from a small game (a patrolling enemy, a pickup, a door) and sketch its **node tree**: pick a sensible root node type (e.g. `CharacterBody2D`, `Area2D`, or `StaticBody2D`) and list the child nodes it needs (a `Sprite2D`? a `CollisionShape2D`? an `AudioStreamPlayer`?). Then name the **script** you would attach and which node it extends, and note which values you would make `@export` so a designer could tune them in the Inspector. For each behaviour, say whether it belongs in `_ready()` (once) or `_process()` (every frame).',
    success: [
      'You can describe an entity as a small tree of typed Nodes saved as a Scene (`.tscn`).',
      'You can explain that a script extends a node type (no MonoBehaviour), with `_ready`/`_process` called by the engine.',
      'You can identify which values to `@export` to the Inspector and why (designer tuning, [[e3-02]]).'
    ],
    skills: ['Node/scene model', 'Script-on-node lifecycle', '@export fields'],
    simplified: 'Real Godot has many lifecycle/notification callbacks (`_enter_tree`, `_ready`, `_process`, `_physics_process`, `_exit_tree`, plus `_notification`). `_ready` and `_process` are the two you need first; the full set is in the docs page named below.',
    goDeeper: 'Godot docs: "Nodes and scenes", "Instancing", "Creating your first script", and "Using @export / exported properties". For the pattern behind it, re-read [[e1-09]] on component/entity thinking.',
    quiz: [
      { q: 'If a bare `Node` does "almost nothing", where does a player’s behaviour actually come from in Godot?', a: 'From the node type you choose and the child nodes you compose under it, plus the script you attach. A `Sprite2D` draws it, a `CollisionShape2D` gives it shape, a `CharacterBody2D` lets it move, and your script adds custom logic. The scene tree composes them — behaviour is the sum of the nodes.' },
      { q: 'Where does your script live, and what does it inherit from?', a: 'It is attached to a node and *extends a node type* (e.g. `extends CharacterBody2D`). There is no `MonoBehaviour` base class; the node itself is the scriptable unit, so `position`, signals and child lookups are available directly on `self`.' },
      { q: 'Why make a tuning value like `speed` an `@export var` (or `[Export]` in C#)?', a: 'Exported values appear in the Inspector, so a designer can change them live without editing or recompiling code. That separates tuning from logic — the data-driven, designer-friendly habit that makes balancing ([[b2-01]]) and iteration far faster.' }
    ],
    tags: ['node', 'scene', 'tscn', 'packedscene', 'export', 'inspector'] },
  {
    id: 'e2-03', title: 'Scripting the update loop in GDScript', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). `_process` is `Update()` in Unity and `Tick()` in Unreal; `_physics_process` is Unity’s `FixedUpdate()` / Unreal physics sub-stepping.*\n\n' +
'Now you actually drive the loop you learned in [[e1-01]] — except you only fill in the per-frame body, because Godot runs the loop. Godot gives you **two update callbacks**, and choosing the right one is the skill:\n\n' +
'- **`_process(delta)`** — once per rendered frame, at a *variable* rate. Put per-frame gameplay here: reading input, moving non-physics things, camera logic, timers, animation timing. Multiply continuous change by `delta` — the [[e1-02]] rule, now with a real argument handed to you.\n' +
'- **`_physics_process(delta)`** — on a *fixed* timestep (default 60 Hz), independent of frame rate. Put **physics** here: anything that moves a `CharacterBody2D/3D` or `RigidBody2D/3D`, especially `move_and_slide()`. Its `delta` is the fixed step. This is where frame-independent, deterministic physics lives.\n\n' +
'A common beginner bug: trying to detect a one-shot input *event* by polling a held state in the physics step and getting a miss or a double-trigger. The clean habit is the [[e1-03]] split: read the *event* with `Input.is_action_just_pressed("jump")`, store the intent, and apply the **motion** in `_physics_process` via the body’s `velocity` and `move_and_slide()`. (Godot conveniently delivers discrete events to `_input(event)` too, but the just-pressed helper is enough to start.)\n\n' +
'```gdscript\nextends CharacterBody2D\n\n@export var speed: float = 220.0\n\nfunc _physics_process(delta: float) -> void:\n\tvar dir := Input.get_axis("move_left", "move_right")  # -1, 0, or 1\n\tvelocity.x = dir * speed\n\tmove_and_slide()                                      # uses the fixed step internally\n```\n\n' +
'Why no explicit `* delta` on `velocity.x` here? Because `move_and_slide()` integrates `velocity` (a *per-second* speed) over the fixed step for you. The `delta` rule from [[e1-02]] still governs anything you integrate *by hand* — e.g. adding gravity: `velocity.y += gravity * delta`. The C# shape is identical: override `_PhysicsProcess(double delta)`, set `Velocity`, call `MoveAndSlide()`.\n\n' +
'The honest scope note: do not scatter logic across both callbacks "just in case". Most non-physics objects need only `_process`. Reach for `_physics_process` the moment a physics body or `move_and_slide()` is involved.',
    steps: [
      'Attach a script to a `CharacterBody2D` node (Attach Script in the Scene dock) — the script becomes the node’s behaviour ([[e2-02]]).',
      'Define your InputMap actions first (Project ▸ Project Settings ▸ Input Map): add `move_left`, `move_right`, `jump` and bind keys to them.',
      'In `_physics_process(delta)`, read movement intent with the named actions: `var dir := Input.get_axis("move_left", "move_right")`.',
      'Set the body’s velocity and slide: `velocity.x = dir * speed`, then `move_and_slide()` — the engine integrates velocity over the fixed step.',
      'For hand-integrated values (gravity, a manual timer in `_process`), multiply by the `delta` argument: `velocity.y += gravity * delta` ([[e1-02]]).',
      'Press [[F5]] to run. Confirm motion is the *same speed* whether the monitor reports 60 or 200 fps — that is the fixed step plus `delta` working.'
    ],
    task:
'Write (on paper or in a scratch `.gd` file) a `_physics_process(delta)` for a `CharacterBody2D` that walks left/right and applies gravity. Read horizontal intent with `Input.get_axis("move_left","move_right")`, set `velocity.x`, add gravity to `velocity.y` using `* delta`, and call `move_and_slide()`. Add a one-line comment saying *why* this lives in `_physics_process` and not `_process`. Then answer in writing: where would you read a one-shot jump press, and why is `Input.is_action_just_pressed` the right tool for it?',
    success: [
      'You can place per-frame logic in `_process` and physics/movement in `_physics_process`, using `delta` correctly.',
      'You can explain why `move_and_slide()` does not need a manual `* delta` but hand-integrated values (gravity) do.',
      'You can read a one-shot event with `Input.is_action_just_pressed` and apply the resulting motion in the physics step.'
    ],
    skills: ['_process vs _physics_process', 'delta in GDScript', 'velocity + move_and_slide'],
    simplified: 'Default physics tick is 60 Hz but it is a project setting (Project Settings ▸ Physics ▸ Common ▸ Physics Ticks per Second) and can change; the *principle* (fixed step for physics) is what matters. `move_and_slide` uses the node’s `velocity` and the fixed step implicitly in Godot 4 — older snippets that passed arguments are Godot 3 style.',
    goDeeper: 'Godot docs: "Idle and Physics processing" and the `CharacterBody2D` / `move_and_slide` class reference. For the rigorous physics-loop theory, Glenn Fiedler’s "Fix Your Timestep!" (referenced back in [[e1-02]]).',
    quiz: [
      { q: 'Your physics body jitters or behaves differently at different frame rates. Which callback should drive its movement, and why?', a: '`_physics_process(delta)`, which runs on a fixed timestep the physics system expects. `_process` runs at a variable frame rate, so feeding physics from it produces inconsistent, frame-rate-dependent results. Movement via `velocity` + `move_and_slide()` belongs in `_physics_process`.' },
      { q: 'Why does `velocity.x = dir * speed; move_and_slide()` not need a `* delta`, but `velocity.y += gravity * delta` does?', a: '`move_and_slide()` treats `velocity` as a per-second speed and integrates it over the fixed step for you, so the slide is already frame-independent. Gravity, by contrast, is something you integrate *by hand* into `velocity.y`, so you must multiply it by `delta` yourself — the [[e1-02]] rule still applies to any value you accumulate manually.' },
      { q: 'How do you reliably detect a single jump press, and where do you apply the resulting motion?', a: 'Read the discrete event with `Input.is_action_just_pressed("jump")` (true only on the frame of the press), store or act on that intent, and apply the upward velocity inside `_physics_process` before `move_and_slide()`. Polling a held state in the physics step risks missing or double-counting the press.' }
    ],
    tags: ['_process', '_physics_process', 'gdscript', 'characterbody', 'move_and_slide', 'delta'] },
  {
    id: 'e2-04', title: 'A player controller', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The same role is a Character/Pawn + movement component in Unreal and a `GameObject` + `CharacterController` in Unity. The control flow below is identical across engines.*\n\n' +
'A **player controller** is where every concept in this pillar converges into one script: input ([[e1-03]]), vectors and transforms ([[e1-04]]), delta time ([[e1-02]]) and the update callbacks ([[e2-03]]). The goal of a *first* controller is humble and correct: move on the ground, face the right way, and jump once per press. Resist bolting on dashes, double-jumps and wall-runs — that is the [[b5-02]] scope trap in code form.\n\n' +
'A clean structure reads input as **intent**, then turns intent into motion. For grounded movement Godot gives you two common body types:\n\n' +
'- **`CharacterBody2D` / `CharacterBody3D`** — a *kinematic* mover for direct, non-rigidbody movement: you set its `velocity` and call `move_and_slide()`. Predictable and great for typical platformer/walker controllers; it handles slopes and floors (with `is_on_floor()`) but is *not* full physics.\n' +
'- **`RigidBody2D` / `RigidBody3D`** — full physics. More emergent (it can be pushed, it collides dynamically), but you drive it via forces/impulses in `_physics_process` and tune mass/damp, which is more work to get feeling tight.\n\n' +
'Here is the spine of a `CharacterBody2D` platformer controller:\n\n' +
'```gdscript\nextends CharacterBody2D\n\n@export var speed: float = 220.0\n@export var jump_force: float = 380.0\n@export var gravity: float = 900.0\n\nfunc _physics_process(delta: float) -> void:\n\tvar dir := Input.get_axis("move_left", "move_right")   # -1, 0, or 1\n\tvelocity.x = dir * speed\n\n\tif is_on_floor():\n\t\tif Input.is_action_just_pressed("jump"):           # one-shot event!\n\t\t\tvelocity.y = -jump_force                        # up is -Y in 2D\n\telse:\n\t\tvelocity.y += gravity * delta                       # continuous → × delta\n\n\tmove_and_slide()\n```\n\n' +
'Three details that separate "works" from "feels right": use `get_axis` (or `get_vector` in top-down) so movement is clean and not double-speed on diagonals (the [[e1-05]] habit); use the *event* `is_action_just_pressed` for jump, not a held check (the [[e1-03]] bug); and multiply hand-integrated change like `gravity` by `delta`, while letting `move_and_slide()` handle the velocity integration. Tuning the numbers — `speed`, `jump_force`, `gravity` — is pure game feel ([[b0-04]]); exposing them as `@export` lets you tune by playing, not editing.',
    steps: [
      'Make a `CharacterBody2D` node with a `CollisionShape2D` and a `Sprite2D` child, and attach a script to the body ([[e2-02]]).',
      'Add InputMap actions `move_left`, `move_right`, `jump` (Project Settings ▸ Input Map) and bind keys.',
      'In `_physics_process(delta)`, read `Input.get_axis("move_left","move_right")` into a `dir` and set `velocity.x = dir * speed`.',
      'Handle jump as an *event*: only when `is_on_floor()`, set `velocity.y = -jump_force` on `Input.is_action_just_pressed("jump")` (remember up is -Y in 2D).',
      'Apply gravity continuously while airborne: `velocity.y += gravity * delta`, then call `move_and_slide()` once.',
      'Press [[F5]] and tune `speed`, `jump_force`, `gravity` in the Inspector until it *feels* right — that feel-tuning is the design seam, not a coding step.'
    ],
    task:
'On paper, write the control flow of a minimal grounded controller as numbered steps (read input → set horizontal `velocity` → floor check → jump on event → apply gravity → `move_and_slide()`). Mark next to each line which Layer-1 concept it uses ([[e1-02]], [[e1-03]], [[e1-04]] or [[e1-05]]). Then list **two** features you are deliberately NOT adding to v1 and one sentence on why holding scope here matters ([[b5-02]]). Keep it to ground-move-and-jump.',
    success: [
      'You can structure a controller as read-intent → set `velocity` → `move_and_slide()`, with `delta` on hand-integrated values.',
      'You correctly use a clean direction read, a jump *event*, and `is_on_floor()` for the ground check.',
      'You can name the trade-off between a `CharacterBody` and a `RigidBody`, and you scoped v1 to ground + jump.'
    ],
    skills: ['Player controller structure', 'CharacterBody vs RigidBody', 'Input-driven movement', 'Scope discipline in code'],
    simplified: 'This is the *teaching* spine, not a shipping controller — a polished one adds coyote time, jump buffering ([[b0-04]]), variable jump height, and slope/air control. Numbers (`220/380/900`) are illustrative; tune to feel. A 3D version uses `CharacterBody3D`, `Vector3` velocity and `up` along +Y.',
    goDeeper: 'Godot docs: the `CharacterBody2D` class reference and the official "2D platformer" / "your first 2D game" tutorials to see a fuller controller. For *feel*, Steve Swink’s book *Game Feel* and any "platformer jump physics" GDC talk.',
    quiz: [
      { q: 'Why read horizontal input with `get_axis` (or `get_vector` for top-down) instead of two separate key checks summed naively?', a: '`get_axis("move_left","move_right")` returns a clean -1/0/1 (and `get_vector` returns a normalized 2D direction), so you never accidentally move faster on diagonals or double-count opposing keys. It bakes the [[e1-05]] normalize habit into one call, and you then multiply by your `speed`.' },
      { q: 'Why is jump handled with `is_action_just_pressed` rather than `is_action_pressed`?', a: 'Jump is a discrete event — one press, one jump. `is_action_pressed` is true every frame the key is held, so it would re-trigger the jump constantly. `is_action_just_pressed` is true only on the frame of the press, giving exactly one jump per press ([[e1-03]]).' },
      { q: 'What is the main trade-off between a `CharacterBody2D` and a `RigidBody2D` for the player?', a: '`CharacterBody2D` is kinematic: you set `velocity` and call `move_and_slide()`, giving direct, predictable movement that is easy to make feel tight, but it is not full physics. `RigidBody2D` is full physics — emergent and pushable — but you drive it with forces in `_physics_process`, tune mass/damp, and work harder to make it feel responsive.' }
    ],
    tags: ['player controller', 'characterbody2d', 'rigidbody', 'jump', 'movement', 'scope'] },
  {
    id: 'e2-05', title: 'Interaction, triggers and collisions in-engine', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). Unity expresses the same two flavours as `OnCollisionEnter` vs `OnTriggerEnter`, and Unreal as hit vs overlap events.*\n\n' +
'This is where objects start *talking to the world* — the engine form of the collision concepts in [[e1-06]]. In Godot, contact is built from a **collision shape** (`CollisionShape2D/3D` holding a Box, Circle/Sphere, Capsule, or polygon) parented under a body, plus **signals** the engine emits when shapes meet. The crucial fork is **solid bodies vs detection areas**:\n\n' +
'- **Solid collision** — both objects are *bodies* (`StaticBody`, `CharacterBody`, or `RigidBody`) with collision shapes. They *block* each other physically. A `RigidBody` reports contact via its own signals (e.g. `body_entered`) when monitoring is on; a `CharacterBody` reports slides via `get_slide_collision_count()`. Use solid bodies for walls, floors, crates that shove.\n' +
'- **`Area2D` / `Area3D`** — a *detection* node. It does **not** block; things pass through, and it **emits signals** — `body_entered(body)` when a physics body enters, `area_entered(area)` when another area enters (plus the matching `*_exited`). Use it for pickups, checkpoints, damage zones, doors that open — anything that should *detect* without *blocking*.\n\n' +
'Connect the signal in the editor (Node dock ▸ Signals) or in code, and write the handler:\n\n' +
'```gdscript\n# On a coin: an Area2D that grants score and removes itself.\nextends Area2D\n\nfunc _ready() -> void:\n\tbody_entered.connect(_on_body_entered)   # wire the signal to our handler\n\nfunc _on_body_entered(body: Node) -> void:\n\tif body.is_in_group("player"):\n\t\tScore.add(1)            # your game state ([[e2-06]])\n\t\tqueue_free()            # remove this coin safely at frame end\n```\n\n' +
'Two rules save hours. **The detection rule:** an `Area2D` only emits `body_entered` when its **Monitoring** is on and the entering body has a matching collision shape — and the body must actually *move* into it (a static body sitting inside a never-moving area at startup may not re-fire). **The filtering rule:** decide *what* you react to. Use **groups** (`body.is_in_group("player")`) or check the body’s type, and use **collision layers + masks** (the 2D/3D physics layers on each shape) to decide which categories can even detect each other — that is how you stop enemies registering on each other or bullets hitting their own shooter, before any signal fires.\n\n' +
'This is a major seam: areas are how level design ([[c4-01]]) wires interactivity — a checkpoint volume, a "boss music starts here" zone, a door that opens — without any of it being solid geometry. Designer-placed `Area` nodes, programmer-written signal handlers.',
    steps: [
      'For a non-blocking volume (pickup, zone), use an `Area2D`/`Area3D` with a child `CollisionShape2D/3D`; for a solid blocker (wall, crate) use a `StaticBody`/`CharacterBody`/`RigidBody` with a shape instead.',
      'On the `Area2D`, confirm **Monitoring** is on and set its **collision layer/mask** so it watches the categories you care about (e.g. the player layer).',
      'Wire the signal: in the editor’s Node ▸ Signals panel connect `body_entered` to a handler, or in code `body_entered.connect(_on_body_entered)`.',
      'Filter inside the handler: `if body.is_in_group("player"):` (add the player to a "player" group) so you only react to the intended object.',
      'Do the effect: grant score / open the door / apply damage — routing real changes through your game-state code ([[e2-06]]), then `queue_free()` if the object is one-shot.',
      'Tune **collision layers and masks** so categories that should never interact (enemy↔enemy, bullet↔shooter) simply do not even test against each other.'
    ],
    task:
'Design and pseudocode TWO interactions for a tiny game. (1) A **pickup**: an `Area2D`, on `body_entered` check the body’s group, add to score, `queue_free()` itself. (2) A **trigger zone** a level designer would place: e.g. a checkpoint or a door-opener `Area2D` that fires once when the player enters. For each, write down: is it an `Area` (detection) or a solid body, which collision layer/mask it uses, and which signal you connect. Finally, name one pair of objects you would put on separate collision layers so they never detect each other, and why.',
    success: [
      'You can choose an `Area` (detection) vs a solid body for a given interaction and justify it.',
      'You can apply the two rules: monitoring + matching layer/mask for signals to fire, and group/layer filtering for *what* you react to.',
      'You can connect the right Godot signal (`body_entered` vs a body’s collision signal) and route the effect through game state.'
    ],
    skills: ['Areas vs solid bodies', 'Collision signals', 'Group / layer filtering', 'Designer-placed interaction volumes'],
    simplified: 'There is a full matrix of which body/area/monitoring combinations emit which signals (static vs kinematic vs rigid, monitorable flags); this lesson teaches the everyday cases. The exact behaviour is in the `Area2D` and `PhysicsBody2D` class references — worth a look when something unexpectedly does not fire.',
    goDeeper: 'Godot docs: "Physics introduction", the `Area2D` class reference (the `body_entered`/`area_entered` signals), and "Using signals". Concept refresher: [[e1-06]]. For where designers place these volumes, [[c4-01]].',
    quiz: [
      { q: 'A coin should be picked up when the player walks into it, but the player should not bump into it like a wall. Solid body or `Area2D`?', a: 'An `Area2D`. It detects entry without blocking, so the player passes through it; you respond to its `body_entered` signal. A solid body would physically block the player, which is wrong for a pickup — you want detection, not obstruction.' },
      { q: 'Your `Area2D`’s `body_entered` never fires even though the shapes overlap. What are the likely causes?', a: 'Either the area’s **Monitoring** is off, or its **collision mask** does not include the entering body’s layer, or the bodies never actually *move* into the area (an area and body both static at startup may not emit). Check monitoring, layer/mask, and that the player carries a collision shape on a watched layer.' },
      { q: 'Why use collision layers and masks instead of just checking the group in code?', a: 'Layers and masks let the physics engine skip pairs that should never interact (enemy↔enemy, bullet↔shooter) before any signal is even emitted — it is cheaper and cleaner than detecting and ignoring them in code. Group/type checks then handle the finer "is this the player?" logic inside the handlers that do fire.' }
    ],
    tags: ['collision', 'area2d', 'signal', 'collision layer', 'group', 'interaction'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
