/* Pillar E · Phase e1 · Module e1c — Patterns (Layer 1, engine-neutral) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e1-07', title: 'Finite state machines', pillarId: 'E', phaseId: 'e1', moduleId: 'e1c',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24, diagram: 'playground',
    concept:
'*Layer-1, engine-neutral: a **finite state machine** (FSM) is one of the most reused patterns in all of game programming, and the idea is identical in every engine.*\n\n' +
'A ((finite state machine)) says: at any moment the thing is in exactly **one** of a small, fixed set of **states**, and it moves between them through defined **transitions** triggered by events or conditions. Think of a door: `Closed`, `Opening`, `Open`, `Closing`. It can never be both `Open` and `Closing` at once, and you can only reach `Open` by going through `Opening`. That single-state guarantee is the whole point — it tames messy "if this and that but not the other" logic into something you can draw, reason about and test.\n\n' +
'A state usually has three hooks: **enter** (run once when you arrive — play an animation, reset a timer), **update** (run every frame while you are in it — the per-frame work from [[e1-01]]), and **exit** (run once as you leave). The machine itself just remembers the current state and, each frame, asks "should I transition?"\n\n' +
'In pseudocode, the classic enemy:\n\n' +
'```\nstate = Patrol\n\nfunction update(dt) {\n  switch (state) {\n    case Patrol:\n      moveAlongRoute(dt)\n      if (canSeePlayer()) state = Chase\n      break\n    case Chase:\n      moveToward(player, dt)\n      if (inAttackRange()) state = Attack\n      if (!canSeePlayer()) state = Patrol\n      break\n    case Attack:\n      swing(dt)\n      if (!inAttackRange()) state = Chase\n      break\n  }\n}\n```\n\n' +
'FSMs are everywhere: enemy AI ([[e4-02]]), the player controller (`Grounded` / `Jumping` / `Falling` / `Dashing`), UI screens (`Menu` / `Playing` / `Paused`), even a quest (`NotStarted` / `Active` / `Done`). The `switch` form above is fine for a handful of states; past that, a cleaner approach gives each state its own object with `enter/update/exit` methods, which makes states swappable and testable.\n\n' +
'The honest limit: a flat FSM gets tangled when behaviour is deeply nested or many states share logic — that is exactly when teams reach for **hierarchical** FSMs or **behaviour trees** ([[e4-03]]). Master the plain FSM first; it carries an enormous amount of real gameplay.',
    task:
'Open the **Code playground** and run the FSM demo; watch a single `state` variable drive everything. Then on paper, design an FSM for a **simple platformer player**: list the states (start with `Grounded`, `Jumping`, `Falling`), and for each, write its **enter / update / exit** work and the **transitions** out of it (with the condition that fires each). Mark one transition that should fire on an *input event* (just-pressed jump, from [[e1-03]]) versus one that fires on a *condition* (`velocityY < 0` → `Falling`).',
    success: [
      'You can define states, transitions and the enter/update/exit hooks of an FSM.',
      'You can explain why "exactly one current state" makes the logic easier to reason about.',
      'You can draw a small FSM (enemy or player) and name what triggers each transition.'
    ],
    skills: ['Finite state machines', 'States & transitions', 'Enter/update/exit hooks'],
    simplified: 'The `switch` form is the teaching version; production code often uses a state-object pattern (one class per state) or a library. Hierarchical FSMs and behaviour trees ([[e4-03]]) handle the cases a flat FSM cannot.',
    goDeeper: 'The "State" chapter of Robert Nystrom’s *Game Programming Patterns* (free online) walks from a `switch` FSM to the state-object pattern and on to hierarchical and pushdown machines.',
    quiz: [
      { q: 'What does "finite" guarantee, and why does it make code easier?', a: 'The thing is always in exactly one of a fixed, known set of states — never two at once and never an undefined one. That removes whole categories of contradictory-flag bugs and lets you reason about, draw and test the behaviour one state at a time.' },
      { q: 'When does a plain FSM start to hurt, and what replaces it?', a: 'When states multiply, nest deeply, or share lots of logic, a flat FSM turns into tangled transitions. Teams then move to a hierarchical FSM or a behaviour tree ([[e4-03]]), which compose smaller behaviours and scale better.' }
    ],
    tags: ['fsm', 'state machine', 'states', 'transitions', 'ai', 'engine-neutral'] },
  {
    id: 'e1-08', title: 'Events and the observer pattern', pillarId: 'E', phaseId: 'e1', moduleId: 'e1c',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'*Layer-1, engine-neutral: events are how you keep parts of a game from knowing too much about each other.*\n\n' +
'Imagine the player picks up a coin. The score UI must update, a sound must play, a particle must burst, and a quest might tick. The naive way is to make the coin call all of them directly: `ui.addScore(); audio.play(); vfx.burst(); quest.check()`. Now the coin **depends on** the UI, audio, VFX and quest systems — change any of them and the coin breaks, and you cannot test the coin alone. This is *tight coupling*, and it is how small codebases turn into spaghetti.\n\n' +
'The ((observer pattern)) fixes it. One object (the **subject** / publisher) announces that something happened; any number of **observers** (subscribers) have registered interest and get notified. The subject does not know *who* is listening or *what* they do — it just **broadcasts**. The coin says, in effect, "CoinCollected happened", and the score, audio, VFX and quest each decided, separately, to listen.\n\n' +
'```\n// the bus / subject\non("CoinCollected", coin => score.add(coin.value))\non("CoinCollected", coin => audio.play("ding"))\non("CoinCollected", coin => vfx.burstAt(coin.pos))\n\n// the coin, decoupled — it knows nobody\nfunction collect(coin) {\n  emit("CoinCollected", coin)\n}\n```\n\n' +
'This is sometimes called publish/subscribe or an event bus, and it is the backbone of decoupled game code. The payoff: you can add a new reaction (an achievement, a tutorial hint) by *subscribing*, with **zero changes** to the coin. It is the same idea as the DOM `addEventListener` you may know from JS, and as C# `event`/`delegate`, Unity’s `UnityEvent` and `UnityAction`, Unreal’s delegates, and Godot’s **signals** — same pattern, different names, fully transferable.\n\n' +
'Honest cautions. Events can make flow *harder to follow* ("who fired this? who is listening?") — overuse turns explicit calls into invisible spaghetti of a different kind. **Always unsubscribe** when an observer is destroyed, or you get dangling references and leaks. And keep the contract clear: an event name plus a small, well-typed payload. Used with judgement, observers are how a coin, a UI, a sound system and a quest log cooperate without ever importing one another — the seam that lets gameplay ([[e3-01]]) and UI evolve independently.',
    task:
'Take the coin example and **add a fourth reaction** without touching the coin: a `quest.recordCoin()` subscriber. Write the one line that registers it. Then write two sentences: (1) what would have to change in the *tightly-coupled* version to add that same reaction, and (2) one concrete risk of the event version (name the unsubscribe/leak problem or the "hard to trace flow" problem). Finally, list three real game moments that are natural events to broadcast (e.g. `PlayerDied`, `LevelLoaded`, `HealthChanged`).',
    success: [
      'You can explain tight coupling and how an observer/event bus removes it.',
      'You can add a new reaction by subscribing, with no change to the publisher.',
      'You can name the two big risks: untraceable flow and forgetting to unsubscribe (leaks).'
    ],
    skills: ['Observer pattern', 'Events & decoupling', 'Publish/subscribe'],
    simplified: 'Real event systems add typed payloads, ordering/priority, sync-vs-deferred dispatch and weak references. The publish/subscribe core here is what transfers; engine specifics (C# events, UnityEvent, Godot signals) layer on top.',
    goDeeper: 'See the "Observer" chapter of *Game Programming Patterns* (Nystrom), and your engine’s docs on its event mechanism — C# `event`/`delegate`, Unity `UnityEvent`, or Godot signals.',
    quiz: [
      { q: 'What problem does the observer pattern solve, in one sentence?', a: 'It removes tight coupling: the publisher announces that something happened without knowing who listens, so any number of systems can react independently — and you can add or remove reactions without changing the publisher.' },
      { q: 'Name one real danger of leaning on events, and how you guard against it.', a: 'Two common ones: flow becomes hard to trace because the caller and listeners are decoupled (mitigate by clear event names, payloads and not over-using events); and forgetting to unsubscribe a destroyed observer leaks memory or causes errors (always unsubscribe in the object’s teardown).' }
    ],
    tags: ['events', 'observer', 'pub/sub', 'decoupling', 'signals', 'engine-neutral'] },
  {
    id: 'e1-09', title: 'Component / entity thinking', pillarId: 'E', phaseId: 'e1', moduleId: 'e1c',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'*Layer-1, engine-neutral: this is the mental model the whole engine layer is built on — meet it now and Unity’s components ([[e2-02]]) will feel obvious later.*\n\n' +
'New programmers reach for deep **inheritance** to model a game world: `GameObject` → `Character` → `Enemy` → `FlyingEnemy` → `FlyingShootingEnemy`. It collapses fast. What about an enemy that flies *and* explodes? Or a barrel that takes damage like an enemy but never moves? A single tree of "is-a" relationships cannot express the messy reality that game objects are really *bundles of capabilities*. This is the classic ((inheritance vs composition)) problem.\n\n' +
'**Composition** flips it. Instead of asking "what *is* this object?", you ask "what does it *have*?" An entity is just an id plus a bag of **components**, each a small, focused piece of data/behaviour: `Transform` (position/rotation/scale, [[e1-04]]), `Health`, `Renderer`, `Collider` ([[e1-06]]), `AIController`, `Inventory`. A player is `Transform + Health + Renderer + Collider + InputController`. An enemy swaps `InputController` for `AIController`. A destructible barrel is `Transform + Health + Renderer + Collider` — no controller at all. You build *kinds* of things by **mixing components**, not by carving a class hierarchy.\n\n' +
'```\nplayer = Entity()\nplayer.add(Transform(x, y))\nplayer.add(Health(100))\nplayer.add(Collider(box))\nplayer.add(InputController())\n\n// "flying exploding enemy" = just a different mix\nenemy.add(Transform()); enemy.add(Health(30))\nenemy.add(Flight()); enemy.add(Explosive())\n```\n\n' +
'This is exactly how mainstream engines model the world. Unity’s `GameObject` is an empty container; you attach **components** (`MonoBehaviour`s) to give it behaviour ([[e2-02]]). Unreal uses Actors with Components; Godot composes a tree of Nodes. The habit transfers wholesale.\n\n' +
'A note on **ECS** (Entity-Component-System): the strict, data-oriented version stores components in tight arrays and runs **systems** over all entities that have a given set (every `Transform`+`Velocity` moved by one `MovementSystem`), which is cache-friendly and very fast at scale. Engine component models are the friendly everyday version; full ECS is a performance-oriented specialisation you reach for when you have thousands of entities. For your scope, the rule that matters is the durable one: **favour composition over inheritance** — small components, mixed freely, beat a brittle class tree every time.',
    task:
'Pick three game objects from a game you know — say a **player**, a **patrolling enemy**, and a **pickup/door**. For each, write its component list (use names like `Transform`, `Health`, `Collider`, `Renderer`, `AIController`, `Interactable`). Then show the power of composition: describe **one new object** you can build *purely by remixing* those components (e.g. a `Transform + Health + Collider` destructible crate, or a `Transform + Interactable` save-point with no health). Finally, write one sentence on why an inheritance tree would have struggled with that same object.',
    success: [
      'You can state the composition-over-inheritance rule and why deep class trees break.',
      'You can describe a game object as an entity + a list of focused components.',
      'You can build a new object by remixing components, and connect it to engine GameObjects/Nodes.'
    ],
    skills: ['Composition over inheritance', 'Entity-component thinking', 'Mapping to engine objects'],
    simplified: 'Engine "components" (Unity MonoBehaviours) and strict data-oriented ECS are related but not identical; ECS’s array-of-components + systems design is a performance specialisation. The transferable core is composition over inheritance.',
    goDeeper: 'The "Component" chapter of *Game Programming Patterns* (Nystrom) is the clean introduction; for the data-oriented end, look up ECS overviews and Unity’s DOTS/Entities docs once you have a reason to scale.',
    quiz: [
      { q: 'Why do deep inheritance trees fail for game objects?', a: 'Real objects are combinations of capabilities (flies, explodes, takes damage, is interactable) that do not fit one "is-a" chain — you hit cases like a flying-exploding enemy or a damageable-but-immobile barrel that force awkward duplication or contradictory branches. Composition models "what it has" instead, sidestepping the whole problem.' },
      { q: 'How does this map onto a real engine?', a: 'A Unity `GameObject` (or Unreal Actor, or Godot Node) is an empty container you give behaviour by attaching components ([[e2-02]]). Different objects are just different component mixes — the exact composition idea from this lesson, which is why it feels natural once you reach the engine layer.' }
    ],
    tags: ['components', 'composition', 'entity', 'ecs', 'inheritance', 'engine-neutral'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
