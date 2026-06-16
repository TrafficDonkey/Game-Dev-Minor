/* Pillar B · Phase b0 · Module b0a — Mechanics & loop */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b0-01', title: 'Mechanics, rules and verbs', pillarId: 'B', phaseId: 'b0', moduleId: 'b0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 20,
    concept:
'Game design starts with three words that are easy to blur together: **mechanics**, **rules** and **verbs**. Getting them clear is the foundation everything else in this pillar sits on.\n\n' +
'A **mechanic** is a *thing the game lets happen* — jumping, shooting, trading, stacking blocks, drawing a card. It is a unit of interaction. A **rule** is the *constraint that governs* a mechanic: how high you jump, how much a shot costs, what a legal trade is, when a block locks. Mechanics are what the player can do; rules are the limits and consequences that make doing it meaningful. Remove the rules (infinite ammo, no gravity, no fail state) and most mechanics stop being interesting — the friction is the point.\n\n' +
'A **((verb))** is the player-facing word for a mechanic — *run, hide, build, persuade, burn*. Verbs are a designer’s sharpest tool because they describe the *experience*, not the implementation. "The game is about **sneaking** and **distracting**" tells you more about the feel than any list of systems. A useful exercise is to ask: *what are the three to five verbs my player does most?* If you can’t name them, the design isn’t focused yet.\n\n' +
'Two ideas matter for a multi-role dev. First, **verbs should be few and deep, not many and shallow** — a small game with three rich, combinable verbs (a classic is *move, jump, shoot*) beats one with twenty thin ones. This is scope discipline in disguise ([[b5-02]]): each verb is real work to build, balance and teach. Second, **mechanics carry meaning** — the verbs you give a player are a statement about what the game is *about*, which is the seam straight to theme ([[a0-05]]) and to how story and rules reinforce each other ([[a5-01]]). A game whose only verb is *destroy* says something different from one whose verbs are *tend* and *repair*.\n\n' +
'Keep the distinction handy: mechanic (what can happen), rule (how it’s governed), verb (what the player feels they’re doing).',
    task:
'Pick a game you know well and write its **verb list**: the three to five things the player does most, as plain verbs (*dash, grab, throw…*). For your top two verbs, write the **mechanic** (one sentence on what happens) and at least one **rule** that governs it (a cost, a limit, a cooldown, a condition). Then add one sentence: *what would break if you removed that rule?* — to feel why the constraint, not the action, is where the design lives.',
    success: [
      'You can state the difference between a mechanic, a rule and a verb, with an example of each.',
      'You can reduce a game to a short list of core verbs.',
      'You can explain why removing a rule often kills a mechanic’s interest.'
    ],
    skills: ['Mechanic vs rule vs verb', 'Verb-list thinking', 'Constraint as design'],
    goDeeper: 'Anna Anthropy & Naomi Clark’s *A Game Design Vocabulary* is excellent on verbs as the unit of design; Raph Koster’s *A Theory of Fun* connects mechanics to the patterns players learn.',
    quiz: [
      { q: 'A teammate lists fifteen mechanics for a two-month project. What’s the scope-aware reframing?', a: 'Ask for the three to five core *verbs* instead. Fifteen mechanics is almost certainly unfocused and unbuildable in two months; forcing a short verb list reveals what the game is really about and what to cut. Few, deep, combinable verbs beat many shallow ones — and each verb is real work to build, balance and teach.' },
      { q: 'Why are the rules, not the mechanics, often where the fun lives?', a: 'A mechanic is just an action; the rules give it cost, limits and consequence, which create the meaningful decisions players actually enjoy. Infinite ammo, no gravity or no fail state usually drains the interest out of an action — the friction the rules add is what makes the choice matter.' }
    ],
    tags: ['mechanics', 'rules', 'verbs', 'fundamentals', 'scope'] },
  {
    id: 'b0-02', title: 'The core loop: the heartbeat of a game', pillarId: 'B', phaseId: 'b0', moduleId: 'b0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 24,
    diagram: 'coreloop',
    concept:
'If verbs are the words of a game, the **((core loop))** is its sentence — the short cycle of actions a player repeats over and over, second by second, that *is* the moment-to-moment experience. Name a game and you can usually state its core loop in one breath: *explore → fight → loot → upgrade → explore harder*; *aim → shoot → reload → reposition*; *plant → water → harvest → sell → buy seeds*. The core loop is the heartbeat: if it doesn’t feel good on the tenth repetition, the game doesn’t work, no matter how good the story or art.\n\n' +
'A healthy core loop has three properties. It is **short** — measured in seconds to a minute, so the player does it hundreds of times a session. It is **rewarding** — each pass gives feedback or a small payoff (a hit lands, a coin drops, a bar fills) so repetition feels like progress, not a chore. And it is **self-feeding** — the output of one pass sets up the next: loot funds upgrades, upgrades let you reach harder areas, harder areas drop better loot. That feedback is what makes "just one more" loops compelling, and it borders on the ethics of engagement ([[b2-05]]) — design it to respect the player.\n\n' +
'Drawing the loop is a designer’s most useful early diagram, because it exposes problems fast. A **broken loop** has a dead end (you earn a currency nothing spends), a **flat loop** gives no escalating payoff (pass fifty feels like pass five), and a **chore loop** has steps that aren’t fun on their own (a mandatory ten-second walk between every fight). The interactive demo lets you toggle steps and watch the cycle to feel these failure modes.\n\n' +
'For you across five roles, the core loop is the **shared spine**. The programmer literally builds it inside the game loop’s update tick ([[e1-01]]); the level designer paces space *around* it ([[c1-02]]); the artist and writer dress and motivate it. When a small game is fun, it’s almost always because one tight core loop earns its keep. **Prototype the loop first** ([[b4-01]]) — before content, story or polish — because if the loop isn’t fun bare, nothing bolted on top will save it.',
    task:
'Diagram the core loop of a game you love as a **labelled cycle**: 3–6 boxes joined by arrows back to the start, each box a player action (use verbs). Mark where the **reward** is and where one pass **feeds** the next. Then do the same for a small game idea of your own — and stress-test it by asking the three diagnostic questions: is it *short* (seconds, not minutes)? Is each pass *rewarded*? Does the output of one pass *set up* the next? Note any dead end, flat stretch or chore step you find.',
    success: [
      'You can state a real game’s core loop as a short cycle of verbs.',
      'You can identify the reward and the self-feeding link in a loop.',
      'You can diagnose a broken, flat or chore loop and say what’s wrong.'
    ],
    skills: ['Core-loop diagramming', 'Loop diagnosis', 'Reward & feedback'],
    simplified: 'Real games nest several loops at once (a second-to-second loop inside a session loop inside a long-term meta-loop). This lesson isolates the innermost moment-to-moment loop on purpose; the next lesson zooms out.',
    goDeeper: 'Search out talks and writing on the "core gameplay loop"; Daniel Cook’s essay "Chemistry of Game Design" (Lostgarden) breaks loops into skill-atoms and feedback in depth.',
    quiz: [
      { q: 'Why prototype the core loop before story, art or content?', a: 'Because the loop is what the player does hundreds of times — if it isn’t fun bare, no amount of story, art or content layered on top will rescue it. Building the cheap, ugly version of the loop first answers "is this fun?" early, while it’s still cheap to change or abandon.' },
      { q: 'What makes a loop "self-feeding", and why does it matter?', a: 'The output of one pass sets up the next — loot funds upgrades, upgrades unlock harder areas, harder areas drop better loot. That chained payoff is what creates momentum and the "just one more" pull; a loop where one pass doesn’t lead anywhere quickly goes flat.' },
      { q: 'A player says your game "gets boring after ten minutes" even though the controls feel great. In loop terms, what’s the likely fault?', a: 'A flat loop — the moment-to-moment action feels fine but each pass stops escalating, so pass fifty feels like pass five with no rising payoff or new wrinkle. Fix it by adding escalation or a feeding link: new rewards, rising challenge, or progression that changes how the next pass plays.' }
    ],
    tags: ['core loop', 'gameplay loop', 'feedback', 'reward', 'fundamentals'] },
  {
    id: 'b0-03', title: 'Secondary loops and the session loop', pillarId: 'B', phaseId: 'b0', moduleId: 'b0a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    diagram: 'coreloop',
    concept:
'A real game is rarely one loop — it is **nested loops running at different timescales**, like gears of different sizes turning together. Once the core loop (lesson [[b0-02]]) feels good, design zooms out to the loops *around* it: secondary loops and the session loop.\n\n' +
'Think in three rough layers:\n\n' +
'- **Core / moment-to-moment loop** — seconds. Aim-shoot-reload; plant-water-harvest. This is *game feel* territory ([[b0-04]]).\n' +
'- **Secondary loops** — minutes to an hour. The systems that sit on top: upgrading gear, levelling a skill, managing an economy ([[b2-03]]), completing a quest, climbing a difficulty curve ([[b2-04]]). These give the core loop *direction* and longer-term goals.\n' +
'- **Session / meta loop** — a play session, or the whole game. The reason to come back: "finish this dungeon", "beat the next boss", "complete the story". The **((session loop))** is the arc of a single sitting — a satisfying start, middle and stopping point — and the meta loop spans many sessions.\n\n' +
'The art is **alignment**: the loops must point the same way and feed one another, or the game feels incoherent. The core loop earns a currency; a secondary loop spends it on upgrades; those upgrades make the core loop feel better and open the next session goal. When that chain is clean, the player always has a reason at every timescale — a reason to do the *next action*, finish the *next upgrade*, and return for the *next session*. When it’s broken — a secondary loop that doesn’t touch the core, an economy with no sink, a session with no natural stopping point — the game leaks engagement.\n\n' +
'Two cautions for a small-team dev. First, **scope** ([[b5-02]]): every extra loop is a whole system to build, balance and teach — most student games need *one* strong core loop and *one* light secondary loop, not a tower of five. Adding loops is the seductive over-scoping trap. Second, design the **stop**, not just the pull: an ethical session loop gives a clean place to put the game down, rather than engineering compulsion ([[b2-05]]). Use the loop diagram to lay the layers concentrically and check that each outer ring genuinely feeds the inner one.',
    task:
'Take the game whose **core loop** you diagrammed last lesson and draw the **nested loops** around it: one secondary loop (minutes–hour) and the session loop (one sitting). Show with arrows how they connect — what the core loop *produces* that a secondary loop *consumes*, and what goal the session loop sets. Then audit your own small game idea: write its three layers and circle any loop that does **not** feed the others. Finally, cut to a feasible set — for a student-scope game, justify keeping at most one secondary loop, and name the one you’d drop.',
    success: [
      'You can place a game’s loops on three timescales (moment, secondary, session/meta).',
      'You can show how an outer loop feeds the core loop, and spot one that doesn’t.',
      'You can argue a feasible loop count for a small team and cut the rest.'
    ],
    skills: ['Nested-loop design', 'Loop alignment', 'Session-loop & stopping points', 'Loop-count scoping'],
    simplified: 'The three-layer split (moment / secondary / session-meta) is a clean teaching model; designers slice loops more finely (per-encounter, per-run, per-day, per-season). The principle — nested loops that must feed one another — holds at any granularity.',
    goDeeper: 'Look up "nested gameplay loops" and the engagement-loop diagrams used in free-to-play design talks (read them critically — many optimise for retention over player wellbeing); pair with reading on session design and natural stopping points.',
    quiz: [
      { q: 'What distinguishes a secondary loop from the core loop?', a: 'Timescale and role. The core loop is the seconds-long action the player repeats constantly; a secondary loop runs over minutes to an hour and sits on top — upgrading, levelling, questing, managing an economy. Secondary loops give the core loop longer-term direction and goals, but they only work if they feed back into the core loop.' },
      { q: 'Why is "every secondary loop is a system to build" a scope warning?', a: 'Because each additional loop is a full system to design, balance, teach and maintain — not just a feature you bolt on. Adding loops is a classic over-scoping trap; most student-scope games are better served by one strong core loop and a single light secondary loop than by a tower of half-finished systems.' },
      { q: 'What does it mean for nested loops to be "aligned", and what goes wrong when they aren’t?', a: 'Aligned loops point the same way and feed one another: the core loop earns something a secondary loop spends, which improves the core loop and sets up the next session goal. When a loop doesn’t connect — a secondary system that never touches the core, an economy with no sink, a session with no stopping point — the game feels incoherent and leaks the player’s motivation.' }
    ],
    tags: ['secondary loops', 'session loop', 'nested loops', 'progression', 'scope'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
