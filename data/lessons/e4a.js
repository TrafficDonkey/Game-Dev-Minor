/* Pillar E · Phase e4 · Module e4a — Behaviour (Layer 1, engine-neutral AI)
 * Branch: AI programming. The illusion of intelligence, FSMs, behaviour trees. */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e4-01', title: 'Game AI: the illusion of intelligence', pillarId: 'E', phaseId: 'e4', moduleId: 'e4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'playground',
    concept:
'*This branch is **engine-neutral** (Layer 1): the structures here — state machines, behaviour trees, perception — are true in every engine. Where it helps, it points at the Unity/C# counterpart.*\n\n' +
'The first thing to unlearn: **game AI is not academic AI.** It almost never learns, almost never "thinks", and is rarely trying to win. Its job is to produce **behaviour a player reads as intelligent and finds fun to play against** — what designers call the ((illusion of intelligence)). A guard who hears you, calls out "Who’s there?", searches your last-known position, shrugs, and goes back to patrolling *feels* smart. Under the hood it is a handful of `if` checks and a timer. That gap — simple machinery, convincing behaviour — is the whole craft.\n\n' +
'Three ideas frame everything that follows:\n\n' +
'- **Believable beats optimal.** A *perfect* enemy that headshots you the instant you’re visible isn’t fun; it’s a wall. Good AI is *deliberately* imperfect — reaction delays, missed first shots, audible "tells" — so the player has time to read it and respond. The seam to design is direct: this is difficulty and fairness ([[b2-02]]), and the readability of [[b0-05]].\n' +
'- **Telegraph everything.** If the AI is about to do something, it should *announce* it — a wind-up animation, a shout, a glowing tell. Players can only feel clever about beating an enemy whose intentions they could read. Hidden logic feels like cheating even when it isn’t.\n' +
'- **Perception is a design choice, not physics.** What the AI "knows" — sight cones, hearing radius, last-known position, memory that fades — is something you author. Most "smart" behaviour is really *good perception plus simple reactions*.\n\n' +
'Almost all enemy AI you’ll write sits on top of a tiny **decide loop** run each frame (or every few frames, to save cost): *sense → decide → act*. Sense gathers perception; decide picks one behaviour; act performs it. The rest of this module is two ways to structure the *decide* step cleanly — finite state machines ([[e4-02]]) and behaviour trees ([[e4-03]]) — so it doesn’t rot into a tangle of flags. This branch pairs naturally with story: an enemy’s behaviour *is* characterisation, and reactive AI is one engine of emergent narrative ([[a1-06]]).',
    task:
'Open the **Code playground** and run the guard demo: watch a single agent sense the player (a sight check), decide, and act, with a deliberate reaction delay. Then **deconstruct an enemy from a game you own**: pick one enemy type and write its *sense → decide → act* in plain words — what can it perceive (sight, sound, range?), what decisions it visibly makes, and at least two *telegraphs* it gives you before acting. Finish with one sentence on a tweak that would make it *fairer to read* without making it weaker.',
    success: [
      'You can explain why game AI aims for believable-and-fun behaviour, not optimal play.',
      'You can describe the sense → decide → act loop and give a concrete example.',
      'You can point to telegraphs/tells and perception as authored design choices, not emergent realism.'
    ],
    skills: ['The illusion of intelligence', 'Sense–decide–act loop', 'Telegraphing & perception'],
    simplified: 'Real games mix several techniques (FSMs, behaviour trees, utility AI, steering, navmeshes, sometimes ML) and run them at staggered rates for performance. This lesson is the framing; the structures come next.',
    goDeeper: 'The AI Game Programming Wisdom series and the annual GDC AI Summit talks are the practitioner canon. For the "deliberately imperfect / believable" philosophy, look up writing on the F.E.A.R. and Halo AI postmortems.',
    quiz: [
      { q: 'Why is a perfectly accurate, instantly-reacting enemy usually bad design?', a: 'Because it gives the player no time to perceive, read and respond — it feels like an unfair wall, not a challenge. Good AI is deliberately imperfect (reaction delays, telegraphs, missed shots) so the player can engage with it and feel clever for beating it.' },
      { q: 'What does it mean that an enemy "perception is a design choice"?', a: 'What the AI can sense — sight cones, hearing radius, last-known position, fading memory — is authored by you, not real physics. Most behaviour that reads as "smart" is really well-tuned perception feeding simple reactions.' }
    ],
    tags: ['game ai', 'illusion of intelligence', 'perception', 'telegraphing', 'engine-neutral'] },
  {
    id: 'e4-02', title: 'Finite state machines for enemies', pillarId: 'E', phaseId: 'e4', moduleId: 'e4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26, diagram: 'playground',
    concept:
'A ((finite state machine)) (FSM) is the workhorse of enemy AI: the agent is in exactly **one state** at a time, each state does one job, and **transitions** move it between states when conditions are met. You met the FSM as a general pattern in [[e1-07]]; here we point it at an enemy.\n\n' +
'A classic guard has four states and a few transitions:\n\n' +
'```\nPATROL  --sees player-->        CHASE\nCHASE   --in attack range-->    ATTACK\nCHASE   --lost player-->        SEARCH\nSEARCH  --timer expired-->      PATROL\nATTACK  --player out of range--> CHASE\n```\n\n' +
'Each state answers two questions: **what do I do while I’m here?** (Patrol walks the waypoints; Chase moves toward last-known position; Attack fires on a cooldown) and **what makes me leave?** (the transitions). That separation is the FSM’s gift — behaviour stays in small, named boxes instead of one swelling `if/else` that nobody can safely edit.\n\n' +
'In code, the cheap-and-clear version is a state field plus a switch run each tick:\n\n' +
'```\nstate = PATROL\nfunction update(dt) {\n  switch (state) {\n    case PATROL: patrol(dt); if (canSee(player)) state = CHASE; break\n    case CHASE:  moveTo(lastSeen, dt)\n                 if (inRange(player)) state = ATTACK\n                 else if (!canSee(player)) { startSearchTimer(); state = SEARCH }\n                 break\n    case ATTACK: faceAndFire(dt); if (!inRange(player)) state = CHASE; break\n    case SEARCH: lookAround(dt); if (searchTimedOut()) state = PATROL; break\n  }\n}\n```\n\n' +
'Two refinements make FSMs feel alive. **Enter/exit actions**: run something *once* on entering a state (play an alert bark and "!" telegraph on entering Chase — there’s your tell from [[e4-01]]) and once on leaving (holster the weapon). **A blackboard**: a small shared data bag (`lastSeen`, `health`, `alertLevel`) the states read and write, so they coordinate without tangling into each other.\n\n' +
'FSMs are perfect up to a point. They’re trivial to author, debug and *show a designer*, and they map cleanly to animation states. Their limit is **combinatorial explosion**: every new behaviour can need transitions to and from many existing states, and the diagram turns to spaghetti. When you feel that pain, reach for a behaviour tree ([[e4-03]]). In Unity these states are often modelled with an `enum` and a `switch`, or visually as an Animator state machine; the structure is identical.',
    task:
'On paper, design an FSM for **one** enemy of your choice (a melee grunt, a ranged sniper, or a fleeing critter). List its **states**, and for each: its *while-in* action and its *transitions out* (the condition and the target state). Mark at least **two enter-actions that telegraph** to the player. Then add one realistic new behaviour — say `FLEE` at low health — and honestly note **how many transitions it adds**. Open the **Code playground** to step the guard FSM and confirm one state is active at a time.',
    success: [
      'You can define states, transitions and the one-active-state rule of an FSM.',
      'You can express a working enemy as states with while-in actions and exit transitions.',
      'You can use enter/exit actions and a blackboard, and explain when an FSM stops scaling.'
    ],
    skills: ['Finite state machines', 'States, transitions & blackboard', 'Enter/exit actions'],
    prereq: '[[e1-07]] (the FSM pattern) helps, but this lesson re-states the essentials.',
    simplified: 'A plain switch-FSM is the clearest teaching form. Production code often uses a state-object pattern (one class per state) or hierarchical state machines; same idea, tidier scaling.',
    goDeeper: 'Robert Nystrom’s *Game Programming Patterns* has a "State" chapter (free online) covering the switch form, the state-object form and hierarchical state machines.',
    quiz: [
      { q: 'What is the defining rule of a finite state machine, and what does each state hold?', a: 'The agent is in exactly one state at a time. Each state defines what to do while in it (its behaviour) and the transitions out — the conditions that move it to another state. This keeps behaviour in small, named boxes instead of one giant branch.' },
      { q: 'Why might you move from an FSM to a behaviour tree as an enemy grows?', a: 'FSMs suffer combinatorial explosion: each new state can require many new transitions to and from existing states, and the graph becomes unmanageable spaghetti. Behaviour trees scale better because behaviours compose hierarchically instead of every state wiring to every other.' }
    ],
    tags: ['fsm', 'finite state machine', 'enemy ai', 'transitions', 'engine-neutral'] },
  {
    id: 'e4-03', title: 'Behaviour trees', pillarId: 'E', phaseId: 'e4', moduleId: 'e4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 28,
    concept:
'A ((behaviour tree)) (BT) solves the FSM’s scaling problem by replacing a web of state-to-state transitions with a **tree of composable tasks**, walked from the root **every tick**. Instead of "which state am I in and where can I go?", a BT asks "starting from the top, what’s the most important thing I can do *right now*?" Behaviours compose, so adding one rarely touches the others — that’s the win over the FSM ([[e4-02]]).\n\n' +
'Every node, when ticked, returns one of three results: **Success**, **Failure**, or **Running** (still working, ask me again next tick — this is what lets an action span many frames, like walking a path). The cleverness is all in how a few **composite** nodes interpret their children:\n\n' +
'- **Sequence** — run children left to right; stop and fail on the first **Failure**; succeed only if **all** succeed. It’s a logical **AND** / a checklist: *isDoorLocked? → haveKey? → unlock → openDoor.*\n' +
'- **Selector** (fallback) — run children left to right; stop and succeed on the first **Success**; fail only if **all** fail. It’s a logical **OR** / a priority list: *try Attack, else try Chase, else Patrol.*\n' +
'- **Decorator** — wraps one child to modify it: `Inverter` (flip success/failure), `Repeat`, `Cooldown`, or a condition guard like `WhileVisible`.\n' +
'- **Leaf** — the actual work: an **action** (`MoveTo`, `Fire`, `PlayBark`) or a **condition** check (`CanSeePlayer?`).\n\n' +
'Our guard becomes a root **Selector** of priorities, highest first:\n\n' +
'```\nSelector (do the most urgent thing that applies)\n├─ Sequence: [ CanSeePlayer? -> InAttackRange? -> Attack ]\n├─ Sequence: [ KnowLastSeen?  -> MoveTo(lastSeen) -> Search ]\n└─ Patrol\n```\n\n' +
'Each tick it tries to attack; if it can’t, it tries to hunt the last-known position; if it can’t, it patrols. Want the guard to **flee at low health**? Add one `Sequence: [ LowHealth? -> FleeToCover ]` near the top of the Selector — *one* insertion, no rewiring. That is the readability and scalability designers love; many engines (Unreal ships a BT editor; Unity has asset-store ones like Behavior Designer, and now a first-party Behavior package) expose BTs as **visual graphs** a designer can edit without touching code.\n\n' +
'A blackboard ([[e4-02]]) still carries shared data (`lastSeen`, `health`) between nodes. BTs aren’t automatically better than FSMs — for two or three states an FSM is simpler and clearer — but once behaviour grows, the BT’s composability is why it became the industry default for complex agents. The honest trade-off: a BT re-evaluates from the root each tick, so it can be a touch more expensive and its flow less obvious at a glance than a small FSM.',
    task:
'Take the enemy you designed as an FSM in [[e4-02]] and **redraw it as a behaviour tree.** Use a root `Selector` of priorities (most urgent first), and at least one `Sequence` whose children must all succeed (e.g. `CanSeePlayer? -> InRange? -> Attack`). For each leaf, label it **action** or **condition**, and for one action note when it would return **Running** rather than Success. Then add a new high-priority behaviour (flee, take cover, or call for backup) and confirm in writing that it required **inserting one branch** rather than rewiring the whole graph.',
    success: [
      'You can name the Success/Failure/Running results and why Running matters.',
      'You can explain Sequence (AND) vs Selector (OR/priority) and read a small tree’s flow.',
      'You can convert an FSM into a behaviour tree and add a behaviour without rewiring.'
    ],
    skills: ['Behaviour trees', 'Sequence/Selector/Decorator/Leaf', 'FSM → BT conversion'],
    prereq: '[[e4-02]] (FSMs) first — a BT is best understood as the answer to the FSM’s scaling pain.',
    simplified: 'Tick semantics vary slightly between BT libraries (memory/persistent nodes, parallel composites, event-driven vs polled ticking). The Success/Failure/Running + Sequence/Selector core is universal; check your library for the rest.',
    goDeeper: 'Unreal’s Behavior Tree docs are a solid hands-on reference; for theory, Ian Millington & John Funge’s *Artificial Intelligence for Games* covers FSMs, BTs, steering and pathfinding rigorously.',
    quiz: [
      { q: 'What is the difference between a Sequence and a Selector node?', a: 'A Sequence runs children in order and fails at the first failure (logical AND / a checklist — all must succeed). A Selector runs children in order and succeeds at the first success (logical OR / a priority list — it falls back down the list until one works).' },
      { q: 'Why does a node returning "Running" matter, and how do BTs scale better than FSMs?', a: '"Running" lets an action span multiple frames (e.g. walking a path) — the tree re-asks next tick instead of forcing instant Success/Failure. BTs scale better because behaviours compose hierarchically: adding one usually means inserting a single branch, not adding transitions to and from every existing state.' }
    ],
    tags: ['behaviour tree', 'selector', 'sequence', 'enemy ai', 'engine-neutral'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
