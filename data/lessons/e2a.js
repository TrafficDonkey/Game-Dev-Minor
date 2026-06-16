/* Pillar E · Phase e2 · Module e2a — Unity/C# foundations (Layer 2, engine-specific) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e2-01', title: 'Layer 2 intro: how the neutral concepts map to Unity (and to Unreal/Godot)', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'*Engine-specific (Unity/C#) — the same ideas live in Unreal (C++/Blueprints) and Godot (GDScript); we name the equivalents as we go so the **concept** stays portable even though the syntax does not.*\n\n' +
'Everything in phase [[e1-01]] was deliberately engine-neutral: you wrote the loop, you owned the math, you reasoned in pseudocode. **Layer 2 is the moment the engine takes the wheel.** You stop writing the `while (running)` loop and start *plugging into* a loop the engine already runs for you. Nothing you learned is wasted — it becomes the mental model that makes the engine stop being magic.\n\n' +
'Here is the map, concept by concept:\n\n' +
'- The **game loop** ([[e1-01]]) → you no longer write it. Unity calls your `Update()` every frame; Unreal calls `Tick()`; Godot calls `_process()`.\n' +
'- **Delta time** ([[e1-02]]) → `Time.deltaTime` in Unity, `DeltaSeconds` in Unreal, the `delta` argument in Godot. Same value, different name.\n' +
'- **Fixed-step physics** → Unity `FixedUpdate()` / `Time.fixedDeltaTime`; Unreal physics sub-stepping; Godot `_physics_process()`.\n' +
'- **Input** ([[e1-03]]) → Unity’s Input System actions, Unreal’s Enhanced Input, Godot’s `InputMap`. All three converge on the *named action* habit you already learned.\n' +
'- **Vectors & transforms** ([[e1-04]]) → every object has a `Transform` (position/rotation/scale); Unity uses `Vector3`, Unreal `FVector`, Godot `Vector3`.\n' +
'- **Components** ([[e1-09]]) → Unity’s whole architecture is a component model: a `GameObject` is a bag of components. Unreal has Actors + Components; Godot composes via a node tree.\n\n' +
'**Why default to Unity/C#?** It is the minor’s house engine, C# is friendly, and the Asset Store and docs are vast. But treat the engine as *one binding of universal ideas*. When the minor’s team picks a different engine — and teams do — you re-bind the same concepts in an afternoon instead of re-learning game programming. That is the entire point of the two-layer split: **Layer 1 is the career, Layer 2 is the tool you happen to hold.**\n\n' +
'One honest caution: it is tempting to skip Layer 1 and just memorise Unity menus. Resist it. Menu knowledge expires; the loop, `dt` and vectors do not.',
    task:
'Build your own translation table. In a doc or notebook, make four rows — **game loop, delta time, input, transform** — and three columns: **Concept (Layer 1)**, **Unity/C#**, **the other engine you might use** (pick Unreal or Godot). Fill every cell from this lesson plus your own recall of [[e1-02]] and [[e1-04]]. Then write two sentences: one on *what you stop writing yourself* when you move to an engine, and one on *why that does not make Layer 1 a waste of time*.',
    success: [
      'You can state that the engine owns the loop and calls your code through a per-frame hook.',
      'You can map at least four Layer-1 concepts to their Unity name (and one other engine).',
      'You can explain why learning the neutral concept first makes switching engines cheap.'
    ],
    skills: ['Layer-1 → Layer-2 mapping', 'Engine-neutral mindset', 'Concept portability'],
    simplified: 'The engine equivalents here are the common, current ones; exact API names and menu paths shift between versions (Unity’s legacy Input vs Input System is the obvious example). Treat names as "check your version", concepts as durable.',
    goDeeper: 'Skim the "Order of execution for event functions" page in the Unity Manual to see the real loop you are plugging into; then glance at Godot’s "Idle and Physics processing" docs to confirm the same shape exists elsewhere.',
    quiz: [
      { q: 'When you move from a from-scratch JS game to Unity, what is the single biggest change to how your code runs?', a: 'You stop writing the main loop yourself. The engine owns the `while`-style loop and calls your code each frame through a hook (`Update()` in Unity). Your logic now lives inside methods the engine invokes, rather than inside a loop you control.' },
      { q: 'Why does the course teach engine-neutral concepts (Layer 1) before Unity specifics (Layer 2)?', a: 'Because the concepts — game loop, delta time, vectors, components — are true in every engine, while syntax and menus are not. Learning the durable idea first means switching to Unreal or Godot is a quick re-binding rather than re-learning game programming from scratch.' }
    ],
    tags: ['unity', 'c#', 'layer 2', 'engine mapping', 'portability'] },
  {
    id: 'e2-02', title: 'GameObjects, components and MonoBehaviour', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'*Engine-specific (Unity/C#) — the same idea is an Actor + Components in Unreal, and a Node tree in Godot.*\n\n' +
'Unity is built on **composition over inheritance**, the exact idea from [[e1-09]]. A **`GameObject`** is, on its own, almost nothing — an empty container with a name and a `Transform`. Its behaviour comes entirely from the **components** you attach: a `Renderer` to draw it, a `Collider` to give it physical shape, a `Rigidbody` to make physics move it, an `AudioSource` to make it sound. A "player" is not a `Player` class deep in an inheritance tree; it is a `GameObject` wearing the components that, together, make it act like a player.\n\n' +
'Your *own* behaviour is a component too — a **`MonoBehaviour`**. When you write a C# script and attach it, Unity treats it as one more component on that object, and calls its special methods at the right times:\n\n' +
'```csharp\nusing UnityEngine;\n\npublic class Player : MonoBehaviour {\n    public float speed = 5f;        // shows up as an editable field in the Inspector\n\n    void Start() {                  // called once, before the first frame\n        Debug.Log("Player ready");\n    }\n\n    void Update() {                 // called every frame — your hook into the loop\n        transform.Translate(Vector3.right * speed * Time.deltaTime);\n    }\n}\n```\n\n' +
'Three things to notice. First, `public` fields appear in the **Inspector**, so a designer can tune `speed` without touching code — that is the seam to [[b2-01]] and the data-driven habit of [[e3-02]]. Second, `transform` is always available because every component lives on a `GameObject` that has one. Third, `Start()` and `Update()` are not functions *you* call — the engine calls them. You are filling in blanks in a loop you do not own.\n\n' +
'((Prefab))s are the other half: a saved, reusable `GameObject` (a configured enemy, a coin) you can stamp into the world many times and edit in one place. The transferable shape — *an entity is a bag of components, and your script is just another component* — is exactly the Unreal Actor/Component and Godot node-tree story. Learn it once here; it re-binds everywhere.',
    task:
'Without an engine open, *design a `GameObject` on paper.* Pick one entity from a small game (a patrolling enemy, a pickup, a door) and list: (a) the **built-in components** it needs (Transform is free — what else: Renderer? Collider? Rigidbody? AudioSource?), and (b) the **MonoBehaviour script(s)** you would write and what each does. Then mark which fields you would make `public` so a designer could tune them in the Inspector, and note for each whether it belongs in `Start()` (once) or `Update()` (every frame).',
    success: [
      'You can describe a GameObject as a container whose behaviour comes from attached components.',
      'You can explain that a MonoBehaviour is your script *as a component*, with Start/Update called by the engine.',
      'You can identify which fields to expose to the Inspector and why (designer tuning, [[e3-02]]).'
    ],
    skills: ['GameObject/component model', 'MonoBehaviour lifecycle', 'Inspector-exposed fields'],
    simplified: 'Real Unity has many lifecycle methods (Awake, OnEnable, OnDisable, OnDestroy, FixedUpdate, LateUpdate) and execution-order rules. Start/Update are the two you need first; the full order is in the manual page named below.',
    goDeeper: 'Unity Manual: "Introduction to components", "Order of execution for event functions", and "Prefabs". For the pattern behind it, re-read [[e1-09]] on component/entity thinking.',
    quiz: [
      { q: 'If a GameObject is "almost nothing" on its own, where does a player’s behaviour actually come from?', a: 'From the components attached to it. Renderer draws it, Collider gives it shape, Rigidbody lets physics move it, and your MonoBehaviour script adds custom logic. The GameObject just composes them; behaviour is the sum of its components — composition over inheritance.' },
      { q: 'Who calls `Update()` on your MonoBehaviour, and when?', a: 'The Unity engine calls it — once per frame, as part of the game loop it owns. You never call `Update()` yourself; you write the body and the engine invokes it every frame, which is why `Time.deltaTime` belongs inside it.' },
      { q: 'Why make a tuning value like `speed` a `public` field?', a: 'Public fields appear in the Inspector, so a designer can change them live without editing or recompiling code. That separates tuning from logic — the data-driven, designer-friendly habit that makes balancing ([[b2-01]]) and iteration far faster.' }
    ],
    tags: ['gameobject', 'component', 'monobehaviour', 'prefab', 'inspector'] },
  {
    id: 'e2-03', title: 'Scripting the update loop in C#', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'*Engine-specific (Unity/C#) — `Update()` is `Tick()` in Unreal and `_process()` in Godot; `FixedUpdate()` is physics sub-stepping / `_physics_process()`.*\n\n' +
'Now you actually drive the loop you learned in [[e1-01]] — except you only fill in the per-frame body, because Unity runs the loop. Unity gives you **three update hooks**, and choosing the right one is the skill:\n\n' +
'- **`Update()`** — once per rendered frame, at a *variable* rate. Put per-frame gameplay here: reading input, moving non-physics objects, camera follow, timers. Multiply continuous change by `Time.deltaTime` — the [[e1-02]] rule, now with a real API.\n' +
'- **`FixedUpdate()`** — on a *fixed* timestep (default 0.02s ≈ 50 Hz), independent of frame rate. Put **physics** here: anything that touches a `Rigidbody` (`AddForce`, setting velocity). Use `Time.fixedDeltaTime` if you need the step. This is where frame-independent, deterministic physics lives.\n' +
'- **`LateUpdate()`** — after every `Update()` has run this frame. Use it for things that must react to final positions, classically a camera that follows a player who moved in `Update()`.\n\n' +
'The single most common beginner bug: reading a one-shot input event (jump pressed) inside `FixedUpdate()`. Because `FixedUpdate` may run zero or several times per frame, you can *miss* or *double-count* the press. The fix is the clean split: **read input in `Update()`, store the intent in a field, then apply physics in `FixedUpdate()`.** That is the engine-specific form of the input→intention separation from [[e1-03]].\n\n' +
'```csharp\npublic class Mover : MonoBehaviour {\n    public float speed = 5f;\n    float inputX;\n\n    void Update() {                       // variable rate — read input\n        inputX = Input.GetAxisRaw("Horizontal");\n    }\n    void FixedUpdate() {                   // fixed rate — apply motion\n        transform.position += Vector3.right * inputX * speed * Time.fixedDeltaTime;\n    }\n}\n```\n\n' +
'The honest scope note: do not sprinkle logic across all three hooks "just in case". Most simple objects need only `Update()`. Reach for `FixedUpdate()` the moment a `Rigidbody` is involved, and `LateUpdate()` only for follow-cameras and similar after-the-fact reads.',
    steps: [
      'Create a C# script (Assets ▸ Create ▸ C# Script), name it `Mover`, and drag it onto a GameObject — it becomes a component ([[e2-02]]).',
      'In `Update()`, read movement intent: `float inputX = Input.GetAxisRaw("Horizontal");` (use the Input System’s action read if your project uses it).',
      'Apply *non-physics* motion in `Update()` with `Time.deltaTime`: `transform.Translate(Vector3.right * inputX * speed * Time.deltaTime);`',
      'For a physics body instead, cache a `Rigidbody rb = GetComponent<Rigidbody>();` in `Awake()`, then in `FixedUpdate()` call `rb.MovePosition(...)` or set `rb.velocity` — never both styles on one object.',
      'Press [[Play]]. Confirm motion is smooth and the *same speed* whether the editor reports 60 or 200 fps (that is `* deltaTime` working).',
      'Deliberately move a `Rigidbody` inside `Update()` and watch it jitter; move it back to `FixedUpdate()` and watch it smooth out — feel why the split exists.'
    ],
    task:
'Write (on paper or in a scratch C# file) a `Mover` MonoBehaviour that supports BOTH a non-physics object and a physics object. For the non-physics path, move in `Update()` with `Time.deltaTime`. For the physics path, read input in `Update()`, store it, and apply it to a `Rigidbody` in `FixedUpdate()` with `Time.fixedDeltaTime`. Add a one-line comment on each method saying *why* that hook. Then answer in writing: where would a follow-camera’s code go, and why `LateUpdate()`?',
    success: [
      'You can place per-frame logic in `Update()` and physics logic in `FixedUpdate()`, each with the right delta.',
      'You can explain why reading a one-shot input in `FixedUpdate()` is buggy and how the read-in-Update/apply-in-Fixed split fixes it.',
      'You can justify when (and only when) to use `LateUpdate()`.'
    ],
    skills: ['Update vs FixedUpdate vs LateUpdate', 'deltaTime in code', 'Input/physics separation'],
    simplified: 'Default fixed timestep is 0.02s but it is a project setting (Edit ▸ Project Settings ▸ Time) and can change; the *principle* (fixed step for physics) is what matters. The Input snippet uses the legacy `Input` API for brevity — newer projects read named actions from the Input System.',
    goDeeper: 'Unity Manual: "Time and frame rate management" and the `Rigidbody.MovePosition` / `Time.fixedDeltaTime` script reference. For the rigorous physics-loop theory, Glenn Fiedler’s "Fix Your Timestep!" (referenced back in [[e1-02]]).',
    quiz: [
      { q: 'You apply a `Rigidbody` force inside `Update()` and the object jitters. What is the fix?', a: 'Move the physics call into `FixedUpdate()`, which runs on the fixed timestep the physics engine expects. `Update()` runs at a variable frame rate, so feeding physics from it produces inconsistent, jittery, frame-rate-dependent results.' },
      { q: 'Why read input in `Update()` but apply it in `FixedUpdate()`?', a: '`FixedUpdate()` can run zero or several times in a single rendered frame, so reading a one-shot press there can miss or double-count it. `Update()` runs once per frame and reliably catches the press; you store the intent and then apply the physics in `FixedUpdate()`.' },
      { q: 'What is `LateUpdate()` for?', a: 'Logic that must run *after* all `Update()` calls have finished this frame — most commonly a camera that follows an object which moved during `Update()`, so the camera reads the final position and avoids lag or jitter.' }
    ],
    tags: ['update', 'fixedupdate', 'lateupdate', 'c#', 'rigidbody', 'deltatime'] },
  {
    id: 'e2-04', title: 'A player controller', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    concept:
'*Engine-specific (Unity/C#) — a Character/Pawn + movement component in Unreal, a CharacterBody node in Godot. The control flow below is identical in all three.*\n\n' +
'A **player controller** is where every concept in this pillar converges into one script: input ([[e1-03]]), vectors and transforms ([[e1-04]]), delta time ([[e1-02]]) and the update hooks ([[e2-03]]). The goal of a *first* controller is humble and correct: move on the ground, face the right way, and jump once per press. Resist bolting on dashes, double-jumps and wall-runs — that is the [[b5-02]] scope trap in code form.\n\n' +
'A clean structure reads input as **intent**, then turns intent into motion. For grounded movement you have two common tools in Unity:\n\n' +
'- **`CharacterController`** — a built-in component for direct, non-Rigidbody movement; you call `Move()` with a vector. Predictable and great for typical third/first-person walkers; it handles slopes and steps but is *not* full physics.\n' +
'- **`Rigidbody`** — full physics. More emergent (it can be pushed, it collides dynamically), but you must respect `FixedUpdate()` and tune mass/drag, which is more work to get feeling tight.\n\n' +
'Here is the spine of a `CharacterController` version:\n\n' +
'```csharp\n[RequireComponent(typeof(CharacterController))]\npublic class PlayerController : MonoBehaviour {\n    public float speed = 6f, jump = 5f, gravity = -20f;\n    CharacterController cc; Vector3 vel;\n\n    void Awake() { cc = GetComponent<CharacterController>(); }\n\n    void Update() {\n        float x = Input.GetAxisRaw("Horizontal");\n        float z = Input.GetAxisRaw("Vertical");\n        Vector3 move = new Vector3(x, 0, z).normalized;   // no diagonal speed boost\n\n        if (cc.isGrounded) {\n            vel.y = -1f;                                   // keep grounded\n            if (Input.GetButtonDown("Jump")) vel.y = jump; // one-shot event!\n        }\n        vel.y += gravity * Time.deltaTime;                 // continuous → * dt\n        cc.Move((move * speed + Vector3.up * vel.y) * Time.deltaTime);\n    }\n}\n```\n\n' +
'Three details that separate "works" from "feels right": **normalize** the move vector so diagonals are not faster (the [[e1-05]] habit); use the *event* `GetButtonDown` for jump, not the held state (the [[e1-03]] bug); and multiply continuous change (`gravity`, the final `Move`) by `Time.deltaTime`. Tuning the three numbers — `speed`, `jump`, `gravity` — is pure game feel ([[b0-04]]), and exposing them in the Inspector lets you tune by playing, not recompiling.',
    steps: [
      'Add a `CharacterController` component to your player GameObject (or `[RequireComponent(typeof(CharacterController))]` on the script so Unity adds it).',
      'Cache it in `Awake()`: `cc = GetComponent<CharacterController>();` — caching beats calling `GetComponent` every frame.',
      'In `Update()`, read `Horizontal`/`Vertical` into a `Vector3`, then `.normalized` it so diagonal movement is not faster ([[e1-05]]).',
      'Handle jump as an *event*: only when `cc.isGrounded`, set `vel.y = jump` on `Input.GetButtonDown("Jump")`.',
      'Apply gravity continuously: `vel.y += gravity * Time.deltaTime;` then move once: `cc.Move((move * speed + Vector3.up * vel.y) * Time.deltaTime);`',
      'Press [[Play]] and tune `speed`, `jump`, `gravity` in the Inspector until it *feels* right — that feel-tuning is the design seam, not a coding step.'
    ],
    task:
'On paper, write the control flow of a minimal grounded controller as numbered steps (read input → build a normalized move vector → ground check → jump on event → apply gravity → move once with `deltaTime`). Mark next to each line which Layer-1 concept it uses ([[e1-02]], [[e1-03]], [[e1-04]] or [[e1-05]]). Then list **two** features you are deliberately NOT adding to v1 and one sentence on why holding scope here matters ([[b5-02]]). Keep it to ground-move-and-jump.',
    success: [
      'You can structure a controller as read-intent → build vector → apply with `deltaTime`.',
      'You correctly use a normalized vector, a jump *event*, and `* deltaTime` on continuous change.',
      'You can name the trade-off between `CharacterController` and `Rigidbody` movement, and you scoped v1 to ground + jump.'
    ],
    skills: ['Player controller structure', 'CharacterController vs Rigidbody', 'Input-driven movement', 'Scope discipline in code'],
    simplified: 'This is the *teaching* spine, not a shipping controller — a polished one adds coyote time, jump buffering ([[b0-04]]), variable jump height, and slope/air control. Names like `GetButtonDown` are the legacy Input API; the Input System reads the equivalent action. Numbers (`6/5/-20`) are illustrative; tune to feel.',
    goDeeper: 'Unity Manual: `CharacterController.Move` and the Starter Assets (Third Person) package to see a production-grade controller. For *feel*, Steve Swink’s book *Game Feel* and any "platformer jump physics" GDC talk.',
    quiz: [
      { q: 'Why call `.normalized` on the movement vector?', a: 'Without it, holding two directions (diagonal) produces a longer vector, so the player moves ~1.41× faster diagonally. Normalizing forces the direction vector to length 1, so speed is the same in every direction — you then multiply by your `speed` value.' },
      { q: 'Why is jump handled with `GetButtonDown` rather than `GetButton`?', a: 'Jump is a discrete event — one press, one jump. `GetButton` is true every frame the key is held, so it would re-trigger the jump constantly (bunny-hopping). `GetButtonDown` is true only on the frame of the press, giving exactly one jump per press ([[e1-03]]).' },
      { q: 'What is the main trade-off between using a `CharacterController` and a `Rigidbody` for the player?', a: '`CharacterController` gives direct, predictable movement (you call `Move`) and is easy to make feel tight, but it is not full physics. `Rigidbody` is full physics — emergent and pushable — but needs `FixedUpdate`, mass/drag tuning, and more care to feel responsive.' }
    ],
    tags: ['player controller', 'charactercontroller', 'rigidbody', 'jump', 'movement', 'scope'] },
  {
    id: 'e2-05', title: 'Interaction, triggers and collisions in-engine', pillarId: 'E', phaseId: 'e2', moduleId: 'e2a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'*Engine-specific (Unity/C#) — collision callbacks in Unreal (OnComponentHit / overlap events) and Godot (`body_entered` / `area_entered` signals) carry the same two flavours.*\n\n' +
'This is where objects start *talking to the world* — the engine form of the collision concepts in [[e1-06]]. In Unity, two ingredients make it work: a **`Collider`** (the shape used for contact — Box, Sphere, Capsule, or a Mesh collider) and the **physics callbacks** Unity fires when shapes meet. The crucial fork is **solid collisions vs triggers**:\n\n' +
'- **Solid collision** — both objects have non-trigger colliders, and at least one has a `Rigidbody`. They *block* each other physically. Unity calls `OnCollisionEnter(Collision c)` (also `Stay`/`Exit`). Use it for walls, floors, crates that shove.\n' +
'- **Trigger** — a collider with **Is Trigger** ticked. It does **not** block; things pass through, and Unity calls `OnTriggerEnter(Collider other)` (also `Stay`/`Exit`). Use it for pickups, checkpoints, damage zones, doors that open — anything that should *detect* without *blocking*.\n\n' +
'```csharp\n// On a coin: a trigger collider that grants score and removes itself.\nvoid OnTriggerEnter(Collider other) {\n    if (other.CompareTag("Player")) {\n        ScoreManager.Add(1);     // your game state ([[e2-06]])\n        Destroy(gameObject);\n    }\n}\n```\n\n' +
'Two rules save hours. **The `Rigidbody` rule:** for collision/trigger callbacks to fire, at least one of the two objects must have a `Rigidbody` (a moving pickup, or the moving player). Two static colliders never report contact. **The tag/layer rule:** filter *what* you react to — `CompareTag("Player")` (faster and allocation-free than `==` on `.tag`) so the coin ignores everything that is not the player. Physics **Layers** plus the collision matrix (Project Settings ▸ Physics) let you decide which categories can even touch, which is how you stop enemies colliding with each other or bullets hitting their own shooter.\n\n' +
'This is a major seam: triggers are how level design ([[c4-01]]) wires interactivity — a checkpoint volume, a "boss music starts here" zone, a door that opens — without any of it being solid geometry. Designer-placed volumes, programmer-written callbacks.',
    steps: [
      'Give the interactable a `Collider` and tick **Is Trigger** for a non-blocking volume (pickup, zone), or leave it unticked for a solid blocker (wall, crate).',
      'Ensure at least ONE of the two objects has a `Rigidbody` — usually the mover (player or the pickup). Without it, no callback fires.',
      'On the relevant script, implement the matching callback: `OnTriggerEnter(Collider other)` for triggers, `OnCollisionEnter(Collision c)` for solid hits.',
      'Filter inside the callback: `if (other.CompareTag("Player")) { ... }` so you only react to the intended object.',
      'Do the effect: grant score / open the door / apply damage — routing real changes through your game-state code ([[e2-06]]), then `Destroy(gameObject)` if it is one-shot.',
      'Set up **Layers** + the collision matrix (Project Settings ▸ Physics) so categories that should never interact (enemy↔enemy, bullet↔shooter) simply do not.'
    ],
    task:
'Design and pseudocode TWO interactions for a tiny game. (1) A **pickup**: trigger collider, on `OnTriggerEnter` check the tag, add to score, destroy itself. (2) A **trigger zone** a level designer would place: e.g. a checkpoint or a door-opener volume that fires once when the player enters. For each, write down: is it a trigger or a solid collision, which object carries the `Rigidbody`, and which callback you use. Finally, name one pair of objects you would put on separate Layers so they never collide, and why.',
    success: [
      'You can choose a trigger vs a solid collision for a given interaction and justify it.',
      'You can apply the two rules: at least one `Rigidbody` for callbacks, and tag/layer filtering inside the callback.',
      'You can name the matching Unity callback (`OnTriggerEnter` vs `OnCollisionEnter`) and route the effect through game state.'
    ],
    skills: ['Triggers vs collisions', 'Collision callbacks', 'Tag/layer filtering', 'Designer-placed interaction volumes'],
    simplified: 'There is a full matrix of which Rigidbody/collider/trigger combinations fire which callbacks (kinematic vs dynamic, static colliders); this lesson teaches the everyday cases. The exact matrix is in the Unity Manual page named below — worth a look when something unexpectedly does not fire.',
    goDeeper: 'Unity Manual: "Introduction to collision", the "Collision action matrix", and `OnTriggerEnter` / `OnCollisionEnter` script reference. Concept refresher: [[e1-06]]. For where designers place these volumes, [[c4-01]].',
    quiz: [
      { q: 'A coin should be picked up when the player walks into it, but the player should not bump into it like a wall. Trigger or solid collision?', a: 'A trigger. Tick "Is Trigger" on the coin’s collider so the player passes through it, and respond in `OnTriggerEnter`. A solid collision would physically block the player, which is wrong for a pickup — you want detection, not obstruction.' },
      { q: 'Your trigger callback never fires even though the colliders overlap. What is the most likely cause?', a: 'Neither object has a `Rigidbody`. Collision and trigger callbacks only fire when at least one of the two objects has a `Rigidbody` (usually the mover). Two static colliders overlapping report nothing. Add a Rigidbody to the moving object.' },
      { q: 'Why use physics Layers and the collision matrix instead of just filtering by tag in code?', a: 'Layers let the physics engine skip pairs that should never interact (enemy↔enemy, bullet↔shooter) before any callback is even considered — it is cheaper and cleaner than detecting and ignoring them in code. Tag checks then handle the finer "is this the player?" logic inside the callbacks that do fire.' }
    ],
    tags: ['collision', 'trigger', 'collider', 'rigidbody', 'layers', 'interaction'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
