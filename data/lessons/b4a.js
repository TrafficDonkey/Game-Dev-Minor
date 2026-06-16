/* Pillar B · Phase b4 · Module b4a — Prototype */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b4-01', title: 'Prototyping: the fastest path to “is it fun?”', pillarId: 'B', phaseId: 'b4', moduleId: 'b4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A design on paper is a *hypothesis*: you think this loop is fun. A **prototype** is the experiment that tests it. The whole point is to learn the one thing you cannot reason your way to — *does it actually feel good to play?* — as cheaply and as early as possible. Almost every beginner gets this backwards, polishing art and story around a core they never proved was fun.\n\n' +
'A prototype is deliberately **ugly, narrow and disposable**. It isolates *one question* and answers nothing else. Grey boxes, programmer-art, placeholder sounds, a single mechanic with no menu, no save, no tutorial. If you find yourself adding a title screen, you have stopped prototyping. The mantra is "build to learn, not to keep" — most prototypes are meant to be thrown away once they have taught you their lesson.\n\n' +
'Match the prototype to the risk. Roughly three kinds:\n' +
'- A **feel prototype** answers "does this verb feel good?" — the jump, the swing, the shot. This is where ((game feel)) lives, and it usually needs to run, so it is a tiny script in the engine ([[f1-04]]).\n' +
'- A **system prototype** answers "is this loop / economy / progression balanced and interesting?" — often a spreadsheet or a paper model, no engine required.\n' +
'- A **paper prototype** answers "do these rules produce interesting decisions?" — cards, tokens and a friend, fast and free ([[b4-02]]).\n\n' +
'Pick the *cheapest medium that can answer the question*. You do not need Unity to discover that your turn-based combat is a coin-flip; you need index cards and ten minutes.\n\n' +
'Two disciplines make prototyping pay off. First, **state the question before you build** — "can the player chain dashes to cross the gap?" — so you know what success looks like. Second, **timebox it**: a day, an afternoon, an hour. A prototype that grows for two weeks has quietly become the game, and you have lost the right to throw it away. This is scope discipline in its rawest form — and it is exactly what the minor rewards, because a proven-fun small loop beats an unproven grand vision every time ([[b5-02]]).',
    task:
'Take one mechanic from a game idea (yours or invented). Write a **prototype plan** in five lines: (1) the *single question* the prototype must answer, phrased so you would know a yes from a no; (2) the **cheapest medium** that can answer it — paper, spreadsheet, or a tiny engine script — and why; (3) what you will deliberately **leave out** (art, audio, menus, content); (4) a **timebox** (hours or a day); (5) the **kill criterion** — what result would tell you to drop or pivot the mechanic rather than polish it.',
    success: [
      'You can phrase a prototype as one falsifiable question, not "build the game smaller".',
      'You can choose the cheapest medium (paper / spreadsheet / engine) that answers that question.',
      'You can name what to leave out and set a timebox so the prototype stays disposable.'
    ],
    skills: ['Prototyping mindset', 'Choosing the cheapest medium', 'Timeboxing & kill criteria'],
    simplified: 'The three "kinds" of prototype are a teaching split, not an industry-fixed taxonomy — real prototypes often answer a feel and a system question at once. Treat them as a prompt to pick a medium, not a rulebook.',
    goDeeper: 'For "build to learn, throw away", read about the rapid-prototyping culture behind studios like the early Experimental Gameplay Project (one prototype a week). Tracy Fullerton’s *Game Design Workshop* has a strong, practical chapter on prototyping for fun.',
    quiz: [
      { q: 'A teammate has spent a week making their combat prototype look and sound great, but still isn’t sure it’s fun. What went wrong?', a: 'They polished before proving the core. A prototype should isolate one question — "is this combat fun?" — in the ugliest, fastest form that can answer it. The art and audio time was spent before the central risk was retired, and now it’s expensive to change the thing that actually matters.' },
      { q: 'Why insist a prototype be disposable?', a: 'Because if you intend to keep it, you start building it "properly" — clean code, real art, menus — which is slow and makes you reluctant to scrap a bad idea. A disposable prototype lets you answer the question in hours and walk away from a "no" without sunk-cost pain.' },
      { q: 'When is paper the right prototype and when do you need the engine?', a: 'Use paper (or a spreadsheet) when the question is about *rules and decisions* — does this economy balance, are these choices interesting? Use a tiny engine build when the question is about *feel and timing* — does the jump feel good — because feel depends on real-time input and motion you can’t fake on a table.' }
    ],
    tags: ['prototyping', 'iteration', 'scope', 'game feel', 'fundamentals'] },
  {
    id: 'b4-02', title: 'Paper prototypes and rapid iteration', pillarId: 'B', phaseId: 'b4', moduleId: 'b4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 28,
    concept:
'A **paper prototype** is your game’s rules played out with physical bits — cards, dice, tokens, a hand-drawn grid, sticky notes — and a human "computing" what the code would do. It sounds primitive, and that is exactly the point: it costs minutes, not days, so you can test ten versions of a rule in the time one engine build would take.\n\n' +
'Paper shines on anything that is fundamentally about **decisions, information and numbers**: turn-based combat, card and deck systems, resource economies ([[b2-01]]), board-like movement, tech trees, even the *structure* of a real-time loop slowed to turns. You sit a friend down, you act as the engine (you flip the cards, you apply the damage, you announce what they see), and you watch where they hesitate, where they get bored, and where they break your rules in ways you never imagined. That last part is gold — players find the dominant strategy faster than you do ([[b1-01]]).\n\n' +
'What paper *cannot* test is **feel and timing** — anything where the fun lives in the millisecond between input and response (a dodge, a combo, the weight of a jump). For those you need a running build, because real-time feel can’t be simulated by a person moving tokens. Know the boundary: paper for *decisions*, engine for *feel*.\n\n' +
'The real skill here is **rapid iteration** — the loop *build → test → learn → change → test again*, run as tightly as you can. Each pass changes **one thing** so you know what caused the result. Change three rules at once and a better playtest tells you nothing about *which* change helped. Cheap medium plus one-variable changes is how you climb toward "fun" instead of guessing at it. This is the same iterate-on-feedback habit you will use when you watch real playtests ([[b4-03]]) and decide what to act on ([[b4-04]]) — paper just lets you spin the loop far faster and far cheaper.',
    task:
'Paper-prototype a tiny decision system and run **three iterations** on yourself or a friend. Use the steps below. Keep it to one mechanic — e.g. a 3-card combat exchange, a tiny resource trade, or a press-your-luck dice round. After each playtest, change exactly **one** rule or number, write down *why*, and play again. Your deliverable is a half-page log: the rule you changed each round and what it did to the decisions.',
    steps: [
      'Pick ONE question to answer, e.g. "do players face an interesting attack-vs-defend choice each turn?"',
      'Build the bits in 10 minutes: index cards for actions, a few dice/tokens for resources, a scrap of paper for the board or health track. Write numbers in pencil so you can change them mid-test.',
      'Recruit a "player" (a friend, family member, or yourself playing honestly). YOU are the engine: you read the rules, resolve actions, apply damage, and tell the player only what they’d actually see.',
      'Play one full round. Say nothing helpful. WATCH: where do they pause? what do they ignore? do they find a move that trivialises everything (a ((dominant strategy)))?',
      'Iteration 1: change exactly ONE thing — a single number, one rule, one card cost. Note *why* you’re changing it. Play again.',
      'Iterations 2 and 3: repeat the one-variable change. Resist the urge to fix three things at once — you’ll lose the cause-and-effect.',
      'Stop and log: list the three changes, what each did to the player’s decisions, and whether the mechanic is trending toward "interesting choices" or "obvious best move".'
    ],
    success: [
      'You ran at least three test-and-change passes on a physical version of a mechanic.',
      'Each iteration changed exactly one variable, with a written reason — so you can attribute the result.',
      'You can state what paper proved about the *decisions*, and name what still needs an engine build to test the *feel*.'
    ],
    skills: ['Paper prototyping', 'Rapid one-variable iteration', 'Running yourself as the engine', 'Spotting dominant strategies'],
    simplified: 'Acting as "the engine" by hand is an approximation — you can’t reproduce exact real-time pacing or hidden simultaneous actions perfectly. That’s fine: paper is for testing whether the *decisions* are interesting, not for verifying timing.',
    goDeeper: 'Look up case studies of teams paper-prototyping digital games before coding (strategy and card-battlers especially). Tracy Fullerton’s *Game Design Workshop* walks through physical prototyping in depth; many GDC talks on systems design show the spreadsheet-and-cards stage behind a shipped game.',
    quiz: [
      { q: 'Why change only one rule between paper-prototype iterations?', a: 'So you can attribute the result. If you change three numbers at once and the next playtest is better, you don’t know which change helped — or whether two helped and one hurt. One variable per pass keeps the cause-and-effect legible, which is the whole value of iterating.' },
      { q: 'Your game is a fast 2D action platformer. Which parts can paper test, and which can’t?', a: 'Paper can test the *decision* and *economy* layers — level structure, when power-ups appear, resource and health pacing, enemy placement as choices. It cannot test the *feel* — jump arc, coyote time, the snap of a dash — because those live in real-time input and motion, which need a running build.' },
      { q: 'During a paper test the player finds one move that wins every time and stops thinking. Is the test a failure?', a: 'No — it’s a success. You discovered a dominant strategy in minutes instead of after weeks of coding. That’s exactly what cheap prototyping is for: now you change one number or rule to break the dominant move and test whether the choice becomes interesting again.' }
    ],
    tags: ['paper prototype', 'iteration', 'playtesting', 'systems', 'rapid prototyping'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
