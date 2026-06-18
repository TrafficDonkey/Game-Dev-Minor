/* Pillar E · Phase e3 · Module e3a — Gameplay programming (the core branch) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e3-01', title: 'Gameplay programming: turning a design into systems', pillarId: 'E', phaseId: 'e3', moduleId: 'e3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'*Branch lesson. The Layer-2 foundations ([[e2-01]]) gave you nodes, the scene tree and a `_process(delta)` to hang code on. Gameplay programming is what you build on top: the **systems** that make a design actually playable. The thinking here is engine-neutral; the concrete examples use Godot 4.x (GDScript, C# equally valid).*\n\n' +
'**Gameplay programming is the translation layer between the GDD and a running game.** A designer writes "the player can pick up a key and the key opens its matching door" ([[b3-03]]). Your job is to turn that sentence into **systems** — small, well-bounded bundles of state and behaviour — that produce that experience reliably, frame after frame.\n\n' +
'The core skill is **decomposition**: reading a feature and naming the systems it implies. "Pick up a key and open its door" is really several: an *inventory* (what the player holds), a *pickup/interaction* trigger ((trigger)), a *lock* on the door that checks the inventory, and *feedback* (a sound, a UI flash) so the player understands what happened. Miss the feedback system and the mechanic works but feels broken — which is the seam back to game feel ([[b0-04]]).\n\n' +
'Three habits separate gameplay code that survives a semester from code that collapses:\n\n' +
'- **One system owns one responsibility.** The `Health` system tracks and changes HP; it does not also play the death animation or update the UI. It *announces* "I died" and other systems react ([[e1-08]]). This keeps an eight-person team from stepping on each other.\n' +
'- **State lives in data, behaviour lives in methods.** "Is the door locked?" is a `bool`; "open the door" is a method. Designers will want to flip that `bool` without reading your code — which is the whole next lesson ([[e3-02]]).\n' +
'- **Build the smallest version that proves the fun, then extend.** A prototype ([[b4-01]]) of the key-and-door can be two booleans and a `print()`. Resist coding the inventory UI before you know the mechanic feels good. Over-engineering a system you later cut is the programmer’s version of over-scoping ([[04-01]]).\n\n' +
'Most gameplay systems reduce to patterns you already met in Layer 1: a finite state machine for a door or an enemy ([[e1-07]]), components for reusable behaviour ([[e1-09]]), events to keep systems decoupled. Gameplay programming is mostly *choosing which pattern* a feature needs — and choosing the small one.',
    task:
'Take one feature line from a real or imagined GDD — e.g. *"The player collects three batteries to power the exit door."* On paper, **decompose it into systems**: list each system, one sentence on what state it owns and what it does, and which systems must talk to which (draw arrows). You should land on something like a `BatteryPickup` trigger, a `PowerCounter` (state: how many collected), a `Door` that listens for "powered", and a feedback system. Then mark which **single** system you would build first to prove the loop is fun, and write the two-line `print()` version of it.',
    success: [
      'You can read a one-line feature and name the distinct systems it requires.',
      'You can keep each system to one responsibility and connect them by announcements/events rather than direct reaching-in.',
      'You can identify the smallest buildable slice that proves the mechanic before extending it.'
    ],
    skills: ['Feature decomposition', 'System responsibility boundaries', 'Prototype-first gameplay'],
    simplified: 'Real codebases add architecture layers (services, managers, dependency injection) this lesson skips. The "one system, one responsibility; announce rather than reach in; build the smallest proof first" core is what transfers to any engine and any team.',
    goDeeper: 'Robert Nystrom’s *Game Programming Patterns* (free online) is the standard reference for the patterns gameplay systems are built from; pair its Component and Observer chapters with this lesson.',
    quiz: [
      { q: 'Why should a `Health` system not also play the death animation and update the health bar?', a: 'Because that bundles three responsibilities into one system, making it harder to reuse, test, and divide among a team. Instead, `Health` should announce an event ("died" / "changed") that the animation and UI systems listen for — decoupling them so any can change without breaking the others.' },
      { q: 'A teammate wants to build the full inventory UI before testing whether picking up the key is fun. What is the scope-disciplined response?', a: 'Build the smallest version that proves the mechanic first — a couple of booleans and a debug log are enough to feel the key-and-door loop. Coding polished UI for a mechanic you have not validated risks elaborate work on something you may cut, the programmer’s form of over-scoping.' }
    ],
    tags: ['gameplay programming', 'systems', 'decomposition', 'scope', 'gdd'] },
  {
    id: 'e3-02', title: 'Tuning, data-driven design and designer-friendly code', pillarId: 'E', phaseId: 'e3', moduleId: 'e3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 28,
    concept:
'*Branch lesson, mostly engine-neutral. The principle — separate **values** from **code** — is universal; the Godot 4.x mechanisms named here have direct equivalents in other engines.*\n\n' +
'Balancing a game means changing numbers — jump height, enemy HP, fire rate, drop chance — over and over until it feels right ([[b2-02]]). The question gameplay programming answers is: **who changes those numbers, and how painfully?** If every tweak means a programmer editing code and the team rebuilding, balancing crawls. **Data-driven design** fixes this: the *logic* lives in code, the *values* live in data the designer can edit without touching code.\n\n' +
'The first step is just **stop hard-coding magic numbers**. Compare:\n\n' +
'```gdscript\n# Hard-coded — designer must ask a programmer to change feel\nif charge_time > 1.5:\n\tfire_big()\n\n# Tunable — the threshold is a named, exposed value\nif charge_time > big_shot_charge_seconds:\n\tfire_big()\n```\n\n' +
'In **Godot 4.x**, the simplest move is an **`@export` variable** (`@export var big_shot_charge_seconds: float = 1.5`), which appears in the **Inspector** so a designer can drag a slider with the game running. In C# the same thing is an `[Export]` field. The next step up is a custom **`Resource`** — a data asset (a `.tres` file) holding a block of tuning values (an `EnemyStats` resource: HP, speed, damage) that many enemies share and a designer edits like a spreadsheet. You define it once (`extends Resource` with `@export` fields), then create as many `.tres` instances as you need. *Engine-swap note:* the same idea is Unreal’s **Data Assets / Data Tables** — different container, same separation of values from code.\n\n' +
'Beyond the engine, teams externalise tuning into **plain files** — `CSV`, `JSON` — so weapon tables or level configs can be edited, diffed in Git and balanced without a programmer or even a rebuild. A `weapons.csv` with one row per weapon is a classic: designers own the file, code just reads it.\n\n' +
'The deeper habit is **designer-friendly code**: name values for what they *mean* (`coyoteTimeSeconds`, not `t`), pick units a designer thinks in (seconds, not frames — and recall frames are unreliable anyway, [[e1-02]]), give sane defaults, and clamp inputs so a bad value can’t crash the build. You are building the **tuning surface** the whole team balances on. Done well, the designer iterates ten times an hour without you; done badly, you become the bottleneck for every "make it 10% faster". This is the most direct seam between the programmer and designer tracks ([[b3-03]]).',
    task:
'Find five **magic numbers** in a small piece of gameplay logic (yours, the playground’s, or invented) — e.g. move speed, jump force, coyote-time window, enemy HP, coin value. For each, write: a clear **name**, the **unit** a designer would think in, a sensible **default**, and a **safe range** to clamp to. Then sketch (in pseudocode or as table columns) an `EnemyStats` data asset — or a `weapons.csv` header row — that pulls a set of these out of code into editable data. Finish with one sentence on how this changes who can balance the game and how fast.',
    success: [
      'You can spot hard-coded magic numbers and replace them with named, exposed, clamped tuning values.',
      'You can describe a data asset (e.g. a Godot `Resource`/`.tres`) or external file (CSV/JSON) that lets a designer tune without editing code.',
      'You can explain why data-driven design speeds up balancing and removes the programmer as a bottleneck.'
    ],
    skills: ['Data-driven design', 'Exposing tuning values', 'Designer-friendly naming & units'],
    simplified: 'Inspector `@export` fields, custom `Resource`/`.tres` assets and external CSV/JSON are the practical 90% for a student team. Full data pipelines (live-reload, validation tooling, designer editors) exist but are beyond a semester; the principle — values out of code, into editable data — is what matters.',
    goDeeper: 'Read Godot’s docs on `@export` annotations and on writing a custom `Resource` (the `.tres` data-asset pattern); for the design rationale, Ryan Hipple’s well-known "ScriptableObject architecture" GDC talk (Unity) explains the same separation, which maps directly onto Godot Resources and Unreal Data Tables.',
    quiz: [
      { q: 'What is the difference between the *logic* and the *values* in data-driven design, and why separate them?', a: 'Logic is the behaviour in code (how charging a shot works); values are the numbers that tune it (the charge threshold, the damage). Separating them lets designers edit values in the Inspector (via an `@export` field), a custom `Resource`/`.tres` asset, or a CSV without touching or recompiling code — so balancing is fast and the programmer is not the bottleneck.' },
      { q: 'Why express a tunable as `coyoteTimeSeconds` rather than a frame count, and why clamp it?', a: 'Seconds are frame-rate independent and the unit a designer naturally reasons in, whereas frame counts vary with hardware ([[e1-02]]). Clamping to a safe range means a mistyped or extreme value cannot crash or break the build, keeping the tuning surface safe for non-programmers to use.' }
    ],
    tags: ['data-driven design', 'tuning', 'godot resources', 'balancing', 'designer-friendly'] },
  {
    id: 'e3-03', title: 'Saving, loading and game state', pillarId: 'E', phaseId: 'e3', moduleId: 'e3a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'*Branch lesson. The serialization concept is engine-neutral; the file-access and JSON helpers named here are Godot 4.x (GDScript, C# equally valid), with one-line equivalents noted for other engines.*\n\n' +
'A save system answers one question: **what is the minimum data that, written down now and read back later, recreates this game state?** Getting that question right is most of the work; the file I/O is the easy part.\n\n' +
'The key idea is **separating saved state from runtime objects**. You do *not* serialize your live **nodes** — they hold engine references, scene-tree handles and behaviour that mean nothing in a file. Instead you define a small, plain **save model**: a serializable structure (a `Dictionary`, or a custom `Resource`) holding only the facts you need to restore — player position, health, inventory ids, which doors are open, the current level. **Saving** copies the live world *into* that model and writes it; **loading** reads it back and *applies* it to a freshly built world. This is the same instinct as data-driven design ([[e3-02]]): values, separated from behaviour.\n\n' +
'Turning that model into text and back is **serialization** ((serialization)) — usually to `JSON`. In **Godot 4.x**, `JSON.stringify(data)` and `JSON.parse_string(text)` turn a dictionary to text and back; you open a file with `FileAccess.open("user://save.json", FileAccess.WRITE)` and write under the `user://` path (a real, per-user, writable folder — never inside the game build). For a save made of typed values you can instead use a custom `Resource` with `ResourceSaver.save()` / `ResourceLoader.load()`. *Engine-swap note:* Unreal uses `USaveGame` + `SaveGameToSlot`. Same three steps everywhere: **gather → serialize → write**, then **read → deserialize → apply**.\n\n' +
'Three things that bite real projects:\n\n' +
'- **Versioning.** Ship a save, then add a field, and old saves break. Store a `version` int and handle older ones — even if "handle" just means "ignore incompatible saves" for a student game.\n' +
'- **When** to save. Autosave at safe points (checkpoints, level load); avoid mid-physics-frame writes. A central state owner — a game-state manager that holds the authoritative model — keeps this sane (the seam to scene/state management, [[e2-06]]).\n' +
'- **Trust.** Local save files can be edited; never assume they are valid. Read defensively, default missing fields, and wrap the load in error handling so a corrupt file fails gracefully instead of crashing.',
    task:
'Design and write (in pseudocode or GDScript — C# is equally valid) a save system for a tiny game state: player position `(x, y)`, current health, a list of collected item ids, and the current level name. Define the **save model** as a serializable class, then write a `Save()` that gathers live values into it and serializes to JSON, and a `Load()` that deserializes and applies them back — defaulting any missing field. Add a `version` field and one sentence on how you would treat a save whose version is older than the game expects. Keep it small: this is the whole mechanic, no UI required.',
    steps: [
      'Define the save model — a plain serializable structure. In GDScript a `Dictionary` is the simplest fit:\n```gdscript\nfunc make_save() -> Dictionary:\n\treturn {\n\t\t"version": 1,\n\t\t"px": 0.0, "py": 0.0,\n\t\t"health": 100,\n\t\t"items": [],\n\t\t"level": "",\n\t}\n```\n(In C# you would model this as a small serializable class or a `Godot.Collections.Dictionary`.)',
      'GATHER: copy live runtime values into a fresh dictionary (`player.position.x/y → px/py`, current `health`, held item ids, active level name). Do NOT store node references.',
      'SERIALIZE + WRITE: `var json := JSON.stringify(data)`, then open `var f := FileAccess.open("user://save.json", FileAccess.WRITE)` and `f.store_string(json)` — the `user://` folder is per-user and writable; never write inside the build.',
      'READ + DESERIALIZE: on load, check `FileAccess.file_exists("user://save.json")`, read it with `FileAccess.get_file_as_string("user://save.json")`, then `var data: Variant = JSON.parse_string(json)`. Guard the result: `JSON.parse_string` returns `null` on malformed text, so a corrupt file fails gracefully.',
      'CHECK VERSION: if `data.version` is older than the current version, migrate the fields you can and default the rest — or, for a student game, refuse the save with a clear message rather than crashing.',
      'APPLY: move the player to `(px, py)`, set `health`, rebuild the inventory from `items`, load `level`. Default any field that was missing (`data.get("health", 100)`) so an incomplete save still loads.',
      'Engine-swap note: in Unreal use a `USaveGame` subclass with `SaveGameToSlot` / `LoadGameFromSlot`; in Godot you can also save a typed custom `Resource` via `ResourceSaver.save()` / `ResourceLoader.load()` instead of JSON. The gather → serialize → write / read → deserialize → apply shape is identical.'
    ],
    success: [
      'You can define a minimal serializable save model that captures state without referencing live engine objects.',
      'You can implement the gather → serialize → write and read → deserialize → apply round trip (e.g. with `JSON.stringify`/`JSON.parse_string` and a `user://` file).',
      'You can name at least two real pitfalls — versioning, save timing, or untrusted/corrupt files — and how you guard against them.'
    ],
    skills: ['Save/load architecture', 'Serialization (JSON)', 'Save versioning & defensive loading'],
    simplified: 'JSON to a `user://` file is the right tool for a student game. Production saves add binary formats, compression, encryption/anti-tamper, cloud sync and robust migration — all beyond a semester. The gather/serialize/apply round trip and the separation of saved state from live objects are the durable, transferable core.',
    goDeeper: 'Read Godot’s docs on `FileAccess`, the `JSON` class, and the `user://` data path (and on custom `Resource` saving with `ResourceSaver`); for the broader concept, any reference on object serialization and schema versioning applies equally to Unreal’s `USaveGame`.',
    quiz: [
      { q: 'Why serialize a separate save model instead of the live nodes themselves?', a: 'Live nodes hold engine-specific references (scene-tree handles, child nodes, behaviour) that are meaningless once written to a file and cannot be reconstructed cleanly. A small plain structure (a dictionary or a custom resource) captures only the facts needed to restore state, so saving and loading become a clean copy in and copy out, independent of the engine’s runtime objects.' },
      { q: 'You add a new field to your save after players already have save files. What goes wrong, and how do you guard against it?', a: 'Old saves lack the new field, so loading them can break or read garbage. Store a `version` number in the save, read defensively by defaulting missing fields, and on an older version either migrate the data you can or refuse the save gracefully — never crash on an unexpected or corrupt file.' }
    ],
    tags: ['save load', 'serialization', 'game state', 'json', 'versioning'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
