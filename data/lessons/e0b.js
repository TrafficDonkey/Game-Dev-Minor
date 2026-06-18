/* Pillar E · Phase e0 · Module e0b — Structure & data (Layer 1, engine-neutral) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e0-05', title: 'Object-oriented thinking: classes and objects', pillarId: 'E', phaseId: 'e0', moduleId: 'e0b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'*Layer-1, engine-neutral: the idea is true everywhere; we note the Godot counterpart (same idea elsewhere) so you can see what transfers.*\n\n' +
'Once you have variables, functions and loops ([[e0-02]]–[[e0-04]]), the next leap is **bundling data and the behaviour that acts on it together**. That bundle is an ((object)). A ((class)) is the *blueprint*; an object is one *instance* made from it. Write the `Enemy` class once, then spawn a hundred enemy objects, each with its own `health`, `position` and `state`.\n\n' +
'A class names two things: **fields** (the data each object carries) and **methods** (functions that operate on that data). For an enemy:\n\n' +
'```\nclass Enemy {\n  health = 100\n  position = { x: 0, y: 0 }\n  speed = 3\n\n  takeDamage(amount) {\n    this.health = this.health - amount\n    if (this.health <= 0) this.die()\n  }\n\n  die() { /* play effect, remove from world */ }\n}\n```\n\n' +
'`this` refers to the particular object the method is running on — *this* enemy’s health, not another’s. That is the whole point: each instance keeps its own state, but they all share one definition of *how an enemy behaves*. Change `takeDamage` once and every enemy obeys.\n\n' +
'Three ideas you will lean on constantly:\n\n' +
'- ((Encapsulation)) — keep an object’s data private and expose methods to change it. Outsiders call `takeDamage(10)` instead of writing `enemy.health -= 10`, so the death check can never be skipped. The object guards its own rules.\n' +
'- ((Inheritance)) — a `FlyingEnemy` can extend `Enemy`, reusing its fields and overriding `move()`. Powerful, but deep inheritance trees get brittle; favour shallow hierarchies.\n' +
'- ((Composition)) — instead of one giant class, build an object from small parts (a `Health`, a `Mover`, a `Weapon`). Game code trends hard toward composition, which is exactly the seam to **component/entity thinking** ([[e1-09]]) and to how engines work.\n\n' +
'This is the model engines are built on: in **Godot** a script *extends a Node type* — `extends Node`, `extends Node2D`, `extends CharacterBody2D` — so the class is your node’s behaviour ([[e2-02]]). (Same idea elsewhere: Unreal classes extend `AActor`; Unity scripts inherit from `MonoBehaviour`.) Learn classes now and that engine layer stops being mysterious. The mantra: *a class models one clear thing — its data and what it can do.*',
    task:
'On paper or in the playground, design **three classes** for a small game: `Player`, `Coin`, and `Door`. For each, list its **fields** (data) and **methods** (verbs it can do), e.g. `Player` has `health`, `coins`, and methods `move()`, `collect(coin)`, `takeDamage(n)`. Then answer in one sentence each: (a) which field on `Player` should be *encapsulated* (changed only through a method) and why, and (b) one place you would prefer *composition* over *inheritance* (hint: a `Coin` and a `Door` that both glow — is "Glower" a base class or a part?).',
    success: [
      'You can explain the difference between a class (blueprint) and an object (instance), and what `this` refers to.',
      'You can list a class’s fields and methods and say why data and behaviour belong together.',
      'You can give a one-line reason to prefer composition over deep inheritance in game code.'
    ],
    skills: ['Classes vs objects', 'Encapsulation', 'Composition over inheritance'],
    simplified: 'OOP has more (interfaces, polymorphism, abstract classes, access modifiers) and a real debate about how much to use it. The class/instance, encapsulation and composition ideas here are the durable core you need before engine scripts.',
    goDeeper: 'For why games favour composition, read about the Entity-Component pattern in Robert Nystrom’s *Game Programming Patterns* (free online); it leads straight into [[e1-09]] and engine component systems.',
    quiz: [
      { q: 'What is the difference between a class and an object?', a: 'A class is the blueprint — it defines the fields (data) and methods (behaviour) a thing has. An object is one concrete instance built from that blueprint, with its own copy of the data. One `Enemy` class can produce many enemy objects, each with its own `health`.' },
      { q: 'Why is "composition over inheritance" a common rule of thumb in game code?', a: 'Deep inheritance trees get rigid: a `FlyingShootingEnemy` may not fit a single chain. Composition builds objects from small reusable parts (a `Health`, a `Mover`, a `Weapon`), which mix and match freely. It is also how engine component systems work, so the habit transfers directly.' }
    ],
    tags: ['oop', 'classes', 'objects', 'encapsulation', 'composition', 'engine-neutral'] },
  {
    id: 'e0-06', title: 'Core data structures: arrays, lists, maps', pillarId: 'E', phaseId: 'e0', moduleId: 'e0b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'*Layer-1, engine-neutral: every language and engine gives you these three, under slightly different names.*\n\n' +
'A program is mostly **data being moved around**, and the *shape* you store it in decides what is easy and what is slow. Three structures cover the vast majority of game code.\n\n' +
'**Array** — a fixed-size, ordered row of slots, accessed by an integer ((index)) starting at `0`. `tiles[5]` jumps straight to the sixth slot instantly because the computer can compute its memory address. Great for grids and anything of known, fixed length (a tilemap, an inventory of 8 slots). Weakness: the size is fixed and inserting in the middle means shuffling everything along.\n\n' +
'**List** (dynamic array) — like an array but it **grows and shrinks**: `add`, `remove`, `length`. This is your default container for "a bunch of things that changes" — the enemies currently alive, projectiles in flight, items on the ground.\n\n' +
'```\nenemies = []\nenemies.push(newEnemy())     // add one\nfor (e of enemies) e.update(dt)  // walk them all each frame\n```\n\n' +
'**Map** (dictionary / hash map) — stores **key → value** pairs and looks a value up *by key* almost instantly, instead of scanning. Keys are usually strings or ids: `playerStats["strength"]`, or `entitiesById[42]`. Reach for a map when you ask "given this id/name, what is its data?" — loot tables, settings, a registry of entities, localisation strings.\n\n' +
'```\nloot = { "common": sword, "rare": shield }\nitem = loot["rare"]   // direct lookup, no loop\n```\n\n' +
'The choosing rule is about **access pattern**, not taste:\n\n' +
'- Need a *stable position / grid coordinate* and a fixed count → **array**.\n' +
'- Need a *changing collection* you iterate over → **list**.\n' +
'- Need to *find one thing fast by name or id* → **map**.\n\n' +
'A classic beginner mistake is a `for` loop scanning a list to find an entity by id every frame — fine for 10 entities, a real cost for 10,000. A map turns that scan into a direct lookup ([[e0-07]] makes the cost difference precise). Names differ — GDScript has `Array` and `Dictionary`, C# `List<T>` and `Dictionary<K,V>`, C++ `std::vector` and `std::map` — but the three shapes and when to use them are the same everywhere.',
    task:
'For a small top-down game, pick the right structure for each of these and write one line saying why: (1) the 20×15 grid of floor tiles, (2) the enemies currently alive, (3) "given an item id, get its name, icon and price", (4) the player’s 6 hotbar slots, (5) which door ids the player has unlocked. Then take case (2) or (3) and write 3–4 lines of pseudocode that adds to it and reads from it.',
    success: [
      'You can match array / list / map to a problem from its access pattern (fixed-index, changing collection, lookup-by-key).',
      'You can explain why looking something up in a map beats scanning a list for it.',
      'You can name the equivalent type in at least one real language (e.g. GDScript `Array` / `Dictionary`, or C# `List<T>` / `Dictionary<K,V>`).'
    ],
    skills: ['Arrays & indexing', 'Dynamic lists', 'Maps / key-value lookup'],
    simplified: 'There are many more structures (sets, queues, stacks, trees, graphs) and "map" hides real machinery (hashing, collisions). For game logic, mastering array vs list vs map and choosing by access pattern covers most of what you write day to day.',
    goDeeper: 'Any intro data-structures resource covers the rest; your engine’s collection docs (GDScript `Array`/`Dictionary`, or C# `System.Collections.Generic`) show the exact methods and their costs.',
    quiz: [
      { q: 'You need to look up an entity by its numeric id thousands of times per frame. Array scan, list scan, or map?', a: 'A map (dictionary / hash map) keyed by id. A scan of an array or list checks elements one by one — cost grows with the collection size. A map computes the slot from the key, so the lookup stays fast no matter how many entities exist.' },
      { q: 'When is a plain array a better fit than a dynamic list?', a: 'When the count is fixed and you access by a stable position — a tilemap grid, a fixed number of inventory slots. Direct indexing is instant and the memory is compact. A list is for collections that grow and shrink, like the set of enemies currently alive.' }
    ],
    tags: ['data structures', 'array', 'list', 'map', 'dictionary', 'engine-neutral'] },
  {
    id: 'e0-07', title: 'Algorithms and Big-O, gently', pillarId: 'E', phaseId: 'e0', moduleId: 'e0b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'*Layer-1, engine-neutral: a way to reason about cost that holds in any language or engine.*\n\n' +
'An ((algorithm)) is just a precise recipe of steps to solve a problem — find the nearest enemy, sort the leaderboard, path from A to B. For the same problem there are usually several recipes, and they are not equal: some stay cheap as the data grows, some explode. ((Big-O)) is the shorthand for *how an algorithm’s cost grows as the input grows* — it ignores exact milliseconds and asks the shape of the curve.\n\n' +
'You only need a few classes, worst to read first as best:\n\n' +
'- **O(1)** — *constant*: cost does not grow with input. A map lookup, reading `array[i]`. The dream.\n' +
'- **O(log n)** — *logarithmic*: cost barely grows; doubling the data adds one step. Binary search in sorted data.\n' +
'- **O(n)** — *linear*: cost grows in step with input. One loop over `n` items — checking every enemy once.\n' +
'- **O(n log n)** — a good general **sort** (the leaderboard).\n' +
'- **O(n²)** — *quadratic*: a loop inside a loop over the same data. Cheap at `n = 10` (100 steps), painful at `n = 1000` (a million). The classic trap: checking every object against every other object for collisions.\n\n' +
'Why it matters in games: your code runs **every frame**, inside the game loop ([[e1-01]]), with a budget of about 16 ms at 60 fps. An O(n²) routine that is invisible with 20 objects can blow the whole frame at 500. The fix is rarely "write faster lines" — it is *choosing a better-shaped algorithm or data structure*: swap a list-scan (O(n)) for a map lookup (O(1)) ([[e0-06]]); use a spatial grid so collision checks only compare nearby objects instead of all pairs; let a navmesh and A* ([[e4-04]]) avoid brute-forcing every path.\n\n' +
'The honest framing: Big-O is about **growth**, not absolute speed, and for small `n` the "worse" algorithm can win (less overhead). Do not pre-optimise everything into knots — write the clear version first, then, when the profiler points at a hot loop, ask "what is this in Big-O, and is there a cheaper shape?" That single question is most of practical performance work, and it pairs with **scoping** ([[04-01]]): the cheapest algorithm is the one you don’t run.',
    task:
'Classify the Big-O of each: (a) finding the max of an unsorted list, (b) looking a value up in a map by key, (c) for every bullet, checking it against every enemy (nested loops). Then take case (c) — a bullets-vs-enemies check that is O(n·m) — and describe in 2–3 sentences one concrete way to make it cheaper (e.g. a spatial grid / buckets so each bullet only tests nearby enemies). No code required, just the reasoning.',
    success: [
      'You can read O(1), O(n) and O(n²) and say roughly how each scales as input grows.',
      'You can spot a nested loop over the same data as a quadratic cost that may not survive large inputs.',
      'You can suggest a better-shaped fix (data structure or algorithm) rather than just "optimise the code".'
    ],
    skills: ['Big-O / growth', 'Spotting O(n²)', 'Algorithmic cost-reduction'],
    simplified: 'This skips the formal maths (limits, average vs worst case, space complexity, amortised cost). The goal is a working instinct for "does this get dangerous as it grows, and is there a cheaper shape?" — which is what game performance work actually uses day to day.',
    goDeeper: 'For the rigorous version, any algorithms course or *Grokking Algorithms* (Bhargava) is friendly; for the games angle, profile a real scene and read your engine’s docs on its profiler and spatial-partitioning tools.',
    quiz: [
      { q: 'A collision routine loops over every object and, inside, loops over every object again. What is its Big-O, and why is it risky?', a: 'O(n²) — quadratic. The work is the square of the object count, so it is cheap for a handful of objects but explodes as the count grows (1000 objects is a million checks). It can quietly blow your per-frame budget, which is why games use spatial partitioning to only compare nearby objects.' },
      { q: 'Does a lower Big-O always mean a faster program?', a: 'No. Big-O describes how cost *grows* with input, not absolute speed. For small inputs an algorithm with worse Big-O but less overhead can be faster. Big-O matters most when the input gets large or the code runs every frame; otherwise prefer the clearest version and profile before optimising.' }
    ],
    tags: ['algorithms', 'big-o', 'complexity', 'performance', 'optimisation', 'engine-neutral'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
