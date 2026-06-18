/* Pillar E · Phase e1 · Module e1a — The runtime (Layer 1, engine-neutral)
 * GOLD-STANDARD EXEMPLAR MODULE (programming; shows the two-layer split). Anchor: e1-01. */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e1-01', title: 'The game loop: update and render', pillarId: 'E', phaseId: 'e1', moduleId: 'e1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24, diagram: 'playground',
    concept:
'*This is a **Layer-1, engine-neutral** lesson: the concept is true in every engine. Where it matters, it points to its Layer-2 (Godot — GDScript or C#) counterpart so you can see what transfers.*\n\n' +
'Every real-time game, in every engine, runs a **game loop**: a cycle that repeats many times a second, and on each pass does roughly three things — **process input**, **update the world**, **render the frame**. One pass is a **frame** ((tick)). At 60 fps the loop runs ~60 times a second; the game is really a flipbook redrawn fast enough to look continuous.\n\n' +
'In pseudocode:\n\n' +
'```\nwhile (running) {\n  input  = readInput()\n  update(world, input, dt)   // move things, run rules, check collisions\n  render(world)              // draw the current state\n}\n```\n\n' +
'The key insight is the separation of **update** (the simulation — where all your gameplay logic lives) from **render** (drawing what the simulation produced). Gameplay is "what is true now"; rendering is "show what’s true now". Keeping them separate is why the same game can run at different frame rates and still behave correctly — provided you respect **delta time** ([[e1-02]]).\n\n' +
'Here’s the two-layer point, stated openly: **in a from-scratch context (or a tutorial in JS) you write this loop yourself.** In a real engine you usually *don’t* — the engine owns the loop and calls *your* code each frame. In **Godot** that’s the `_process(delta)` method on a script attached to a node (e.g. `extends Node2D`); same idea elsewhere — in Unity/C# it’s `Update()` on a `MonoBehaviour`, in Unreal it’s `Tick()`. Same concept, different hook. Knowing the loop exists *underneath* Godot’s `_process()` is what makes engine behaviour stop being magic — and it’s exactly the kind of fundamental that transfers if you ever move to a different engine.\n\n' +
'One more distinction you’ll meet: many engines run a separate **fixed update** for physics (a steady step, regardless of frame rate) alongside the variable per-frame update. In Godot that’s `_physics_process(delta)` (same idea elsewhere: Unity’s `FixedUpdate`). Put physics-sensitive logic there; put per-frame logic (input polling, camera) in the normal `_process(delta)`. We’ll come back to it — for now, lock in: **loop → input, update, render, repeat.**',
    task:
'Open the **Code playground** above and run the game-loop demo. Watch how `update` changes state and `render` only draws it. Then, on paper or in the playground, list **five things** a platformer would do inside `update` each frame (e.g. apply gravity, read jump input, move the player, check ground collision, update the score) and **one** thing that belongs in `render` (draw the player sprite). Finally, write one sentence on where each of those would live in Godot (`_process(delta)` vs `_physics_process(delta)` vs the engine’s renderer).',
    success: [
      'You can describe the input → update → render cycle and what a "frame" is.',
      'You can explain why update (simulation) and render (drawing) are kept separate.',
      'You can map the loop to an engine hook (Godot `_process(delta)`; same idea elsewhere: Unity `Update()`, Unreal `Tick()`).'
    ],
    skills: ['The game loop', 'Update vs render', 'Engine loop hooks'],
    simplified: 'Real loops are more involved (fixed vs variable timestep, interpolation, multi-threading, vsync). This is the correct core model; we add fixed-timestep nuance in [[e1-02]] and [[e1-06]].',
    goDeeper: 'The canonical deep-dive is the "Game Loop" chapter of Robert Nystrom’s *Game Programming Patterns* (free to read online) — it covers fixed vs variable timestep thoroughly.',
    quiz: [
      { q: 'In a real engine like Godot, do you write the `while` loop yourself?', a: 'No — the engine owns the loop and calls your code each frame through hooks like Godot’s `_process(delta)` (same idea elsewhere: Unity’s `Update()`, Unreal’s `Tick()`). The loop still exists underneath; you just plug your per-frame logic into it.' },
      { q: 'Why separate "update" from "render"?', a: 'Update is the simulation (the authoritative game state and logic); render just draws that state. Separating them keeps gameplay correct independent of how often you draw, enables running at different frame rates, and makes the code far easier to reason about and test.' }
    ],
    tags: ['game loop', 'update', 'render', 'frame', 'engine-neutral'] },
  {
    id: 'e1-02', title: 'Delta time and frame independence', pillarId: 'E', phaseId: 'e1', moduleId: 'e1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'playground',
    concept:
'Here’s a bug every new game programmer ships once: the player moves *faster on a faster PC*. The fix is **delta time**, and it’s one of the most important habits in the whole pillar.\n\n' +
'The cause: if you write `position += speed` every frame, then a machine running 120 fps moves the player twice as far per second as one running 60 fps, because it runs the line twice as often. Movement is tied to frame rate, which is *hardware*, not design.\n\n' +
'**Delta time** ((dt)) is the time elapsed since the previous frame, in seconds. Multiply per-frame change by `dt` and motion becomes **frame-independent** — expressed per *second*, not per *frame*:\n\n' +
'```\n// WRONG — frame-dependent\nposition += speed;\n\n// RIGHT — frame-independent (speed is now units PER SECOND)\nposition += speed * dt;\n```\n\n' +
'At 60 fps, `dt ≈ 0.0167`; at 30 fps, `dt ≈ 0.0333` — twice as big, exactly compensating for running half as often. The player covers the same ground per second either way. The rule of thumb: **anything that changes continuously over time** — movement, rotation, timers, lerps, fuel draining — should be multiplied by `dt`. Things that happen *once* (a jump impulse, spawning an enemy) usually should not.\n\n' +
'Every engine hands you this value: Godot passes it as the `delta` parameter into `_process(delta)` / `_physics_process(delta)` (a `float`; a `double` in C#), and you can also call `get_process_delta_time()`. Same idea elsewhere: Unity’s `Time.deltaTime`, Unreal’s `DeltaSeconds`. Same concept, different name — another transferable fundamental.\n\n' +
'The honest caveat: for *physics*, naive `* dt` integration can become unstable or non-deterministic at varying frame rates, which is why engines run physics on a **fixed timestep** (in Godot, `_physics_process(delta)`, whose `delta` is the steady physics step; same idea elsewhere: Unity’s `FixedUpdate` / `Time.fixedDeltaTime`). The clean rule you can carry anywhere: **per-frame visual/gameplay motion → variable `dt`; physics and anything that must be deterministic → fixed timestep.** Get `* dt` into your fingers now and a whole class of "works on my machine" bugs never happens.',
    task:
'In the **Code playground**, find (or write) two movers: one that does `x += speed` and one that does `x += speed * dt`. Simulate a few frames at a high "fps" and a low "fps" and confirm the first one’s distance changes with frame rate while the second’s doesn’t. Then list three things in a game that should be multiplied by `dt` and two that should NOT (one-off events).',
    success: [
      'You can explain why frame-dependent movement runs faster on faster hardware.',
      'You can correctly apply `* dt` to continuous change and leave one-off events alone.',
      'You can name the engine’s delta-time value and why physics uses a fixed step.'
    ],
    skills: ['Delta time', 'Frame independence', 'Fixed vs variable timestep'],
    simplified: 'The `* dt` rule is the essential 90%. Fixed-timestep physics, accumulators and interpolation are the rigorous full story (see Nystrom’s game-loop chapter and Glenn Fiedler’s "Fix Your Timestep!").',
    goDeeper: 'Glenn Fiedler’s "Fix Your Timestep!" is the classic article on doing this rigorously for physics; pair it with any engine’s docs on `deltaTime` vs `fixedDeltaTime`.',
    quiz: [
      { q: 'After adding `* dt`, what does `speed` now represent, and why does that fix the bug?', a: 'It becomes units per *second* rather than per *frame*. Because `dt` is the seconds since the last frame, multiplying by it means the total distance per second is the same regardless of how many frames the machine renders — so movement no longer depends on frame rate.' },
      { q: 'Should a jump impulse or enemy spawn be multiplied by delta time?', a: 'No. Those are discrete, one-off events that happen on a single frame, not continuous change over time. Multiplying continuous motion (and timers, rotations, lerps) by `dt` is correct; multiplying a one-shot event by `dt` would wrongly scale it.' }
    ],
    tags: ['delta time', 'frame independence', 'dt', 'timestep', 'engine-neutral'] },
  {
    id: 'e1-03', title: 'Input handling', pillarId: 'E', phaseId: 'e1', moduleId: 'e1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    concept:
'Input is how the player’s intentions enter your simulation, and handling it well is more subtle than "if key pressed, move". The core distinction is between an input’s **state** and its **events**.\n\n' +
'- **State** is "is this held *right now*?" — `isKeyDown(Space)`. You check it every frame. Good for continuous actions: holding a movement key, aiming, charging.\n' +
'- **Events** are transitions — "was this *just pressed* this frame?" (`wasPressed`) or "*just released*?" (`wasReleased`). Good for discrete actions: jump, shoot, interact, pause. The classic beginner bug is using *state* for a jump, so holding the key bunny-hops or buffers; you want the *pressed* event.\n\n' +
'Engines wrap this for you. Godot centres on named **actions** defined in the **InputMap**: `Input.is_action_pressed("move_left")` (state) vs `Input.is_action_just_pressed("jump")` (event), with helpers like `Input.get_axis(...)` and `Input.get_vector(...)`. Same idea elsewhere — Unity’s Input System and Unreal’s Enhanced Input both map physical inputs to named actions too. The transferable lesson: **don’t scatter raw key codes through your gameplay code — read named *actions*** ("Jump", "Fire", "Interact"). That one habit makes rebinding, controllers and multiple control schemes possible later, and keeps your player controller readable.\n\n' +
'Two more ideas you’ll use. **Input buffering**: remembering a "jump pressed" for a few frames so a slightly-early press still fires when the player lands — it makes controls feel fair and responsive (a game-feel topic, [[b0-04]]). And **separating input from action**: the input layer should translate keys/buttons into *intentions* ("the player wants to jump"), and the gameplay layer decides whether that’s allowed ("are they on the ground?"). That separation is what lets the same controller work for keyboard, gamepad and remapped keys.\n\n' +
'It’s a small topic with an outsized effect on how a game *feels* — which is the seam to game design. Crisp, fair, rebindable input is invisible when right and infuriating when wrong.',
    task:
'For a simple character, write a short pseudocode `handleInput()` that uses **state** for horizontal movement (held left/right) and an **event** for jump (just-pressed), feeding into the kind of `update` you saw in [[e1-01]]. Then list which of these should be state vs event: sprint, shoot, open menu, aim-down-sights, dash. Finally, write one sentence on why reading a named action ("Jump") beats hard-coding the spacebar.',
    success: [
      'You can distinguish input state (held now) from input events (just pressed/released).',
      'You can choose the right one for a given action (movement vs jump).',
      'You can explain why named actions beat scattered raw key codes.'
    ],
    skills: ['Input state vs events', 'Action mapping', 'Input → intention separation'],
    simplified: 'Real input stacks add dead zones, analogue values, multiple devices, and event timing. The state/event split and "read named actions" habit are the durable core; engine input systems handle the rest.',
    goDeeper: 'Read your engine’s input docs (Godot’s InputMap and the Input singleton; same idea elsewhere in Unity’s Input System "actions" and Unreal’s Enhanced Input) — they all converge on the action-mapping idea this lesson teaches.',
    quiz: [
      { q: 'Why does using "is key held" for a jump usually feel wrong?', a: 'Because holding the key keeps the condition true every frame, so the character repeatedly jumps (bunny-hops) or the input feels mushy. Jump should fire on the *just-pressed* event — a single transition — so one press equals one jump.' },
      { q: 'What’s the benefit of reading a named action ("Jump") instead of a specific key?', a: 'It decouples gameplay from the physical input, so you can rebind keys, support gamepads, and offer multiple control schemes without touching gameplay code. It also makes the player controller far more readable.' }
    ],
    tags: ['input', 'actions', 'state vs event', 'input buffering', 'engine-neutral'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
