/* Pillar C · Phase c2 · Module c2a — Puzzles */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c2-01', title: 'Puzzle design: teach, test, twist', pillarId: 'C', phaseId: 'c2', moduleId: 'c2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    diagram: 'blockout',
    concept:
'A good puzzle isn’t a wall you throw at the player — it’s a *tiny lesson with a quiz at the end*. The cleanest pattern for designing one is **teach, test, twist**, and once you see it you’ll spot it in almost every well-made puzzle game.\n\n' +
'- **Teach.** Introduce one new idea in a safe, low-stakes space where failure is cheap and the solution is almost forced. The player can’t help but discover the rule — a button that opens a nearby door, a box that’s clearly pushable. You’re not testing yet; you’re *installing a verb* in the player’s head.\n' +
'- **Test.** Now ask them to *use* that idea in a slightly harder situation where they have to choose to apply it. This confirms they actually learned it rather than stumbling through. The test is where the player feels clever.\n' +
'- **Twist.** Finally, bend the idea — combine it with an earlier one, invert it, or reveal a hidden property (the button also closes a *different* door). The twist is the payoff: it rewards mastery and keeps the rule from going stale.\n\n' +
'The deep principle underneath is **one new idea at a time**. Beginner puzzle designers stack three unfamiliar mechanics into one room and call the confusion "difficulty". Real difficulty comes from *depth* — recombining understood ideas — not from *obscurity*. If the player is stuck because they don’t understand the rules, that’s a teaching failure; if they’re stuck because they haven’t yet *seen the combination*, that’s a good puzzle.\n\n' +
'This is the same teach-test-twist rhythm a level designer uses to introduce *any* mechanic, puzzle or not — it’s how a tutorial level paces a new verb ([[c1-01]]), and it’s a sibling of dramatic escalation in story ([[a0-02]]). It leans hard on **readability**: the player must be able to *see* the rule operating ([[b0-05]]). And it connects straight to game design — a puzzle is just a mechanic ([[b0-01]]) wearing a level-design hat.',
    task:
'Pick a single simple mechanic — a pushable box, a switch, a light beam, a portal, gravity flip; whatever you like. Design a **three-room mini-sequence** that runs it through teach → test → twist. Write two or three sentences per room: what the room contains, what the player must do, and *what they learn or prove*. The teach room should be almost impossible to fail; the twist room should recombine the idea with something from the test room (or invert it). Then write one sentence naming the single new idea — if you can’t name exactly one, your sequence is teaching too much at once.',
    success: [
      'You can state the one new idea a puzzle teaches, in a single sentence.',
      'Your teach room makes the rule almost unavoidable; the twist genuinely recombines or inverts it.',
      'You can tell apart difficulty-from-depth (good) and difficulty-from-obscurity (a teaching failure).'
    ],
    skills: ['Teach-test-twist structure', 'One-idea-at-a-time pacing', 'Readability of rules'],
    goDeeper: 'Look up talks on puzzle design from teams behind tightly-taught puzzle games (the "teach, then test, then surprise" idea is discussed widely at GDC); for the broader principle of pacing a single idea, revisit any "anatomy of a level" breakdown.',
    quiz: [
      { q: 'A player is stuck on your puzzle. How do you tell whether that’s good difficulty or a design failure?', a: 'Ask *why* they’re stuck. If they don’t understand the rules — they never learned what the mechanic does — that’s a teaching failure (fix the teach step). If they understand the pieces but haven’t yet seen how to combine them, that’s good difficulty from depth: the puzzle is working.' },
      { q: 'Why introduce only one new idea per puzzle?', a: 'Because real difficulty comes from depth — recombining ideas the player already understands — not from obscurity. Stacking several unfamiliar mechanics at once just creates confusion, which reads as unfair rather than challenging, and you can’t tell which idea the player failed to grasp.' }
    ],
    tags: ['puzzle', 'teach-test-twist', 'pacing', 'readability', 'level design'] },
  {
    id: 'c2-02', title: 'Designing a fair, invented puzzle', pillarId: 'C', phaseId: 'c2', moduleId: 'c2a',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 26,
    prereq: '[[c2-01]] (teach, test, twist) first',
    concept:
'Designing *a* puzzle from scratch — not a variant of one you’ve seen — means owning the hardest property of all: **fairness**. A fair puzzle is one the player can solve through *reasoning from what the game has shown them*, with no leaps that require outside knowledge, pixel-hunting, or reading the designer’s mind. The classic anti-pattern is the old adventure-game "use the rubber duck on the radiator" solution — technically consistent, but unguessable.\n\n' +
'Fairness rests on a few testable commitments:\n\n' +
'- **The solution is reachable from in-game knowledge.** Every rule the puzzle relies on was *taught* earlier (this is why teach-test-twist matters, [[c2-01]]). No solution should depend on trivia the player can’t derive.\n' +
'- **The goal is legible; the method is the puzzle.** The player should quickly understand *what* they’re trying to achieve. The challenge is *how*, not guessing the objective. A foggy goal is frustration, not difficulty.\n' +
'- **Failure teaches.** A wrong attempt should leave a clue, not just a dead end — the player should end each failure knowing *more* than before. This is the "fail forward" idea you practise at the D&D table ([[a4-04]]).\n' +
'- **One intended solution, but tolerate clever ones.** Aim for a clear intended path, yet expect players to break your puzzle in delightful ways. A solution you didn’t plan but that follows your rules is a *gift*, not a bug — don’t patch out creativity.\n\n' +
'The trap on the *other* side is the **moon-logic / read-the-designer’s-mind** puzzle, where the answer makes sense only *after* you’re told it. The cure is the same as for everything else in this course: **playtest, and watch** ([[b4-03]]). You cannot judge your own puzzle’s fairness — you already know the answer, so you’re the worst possible tester. Hand it to someone cold, say nothing, and watch where they get stuck. If three testers all dead-end at the same step, that step is unfair, however elegant it felt to you.\n\n' +
'And the scope warning: a single genuinely fair, well-taught puzzle is worth more than ten clever-on-paper ones you never had time to test. Building bespoke puzzle content is *expensive* — each one needs teaching, testing and tuning. Make few, make them fair, and lean on recombination ([[c2-01]]) rather than an ever-growing pile of new mechanics.',
    task:
'Invent **one** original puzzle (not a copy of an existing one) around a single mechanic. Write it up as a short spec: (1) the **mechanic and the one new idea**; (2) the **goal** the player can see; (3) the **intended solution**, step by step; (4) where and how each required rule was **taught** before this room; and (5) one **wrong attempt** and the *clue* the player gets from failing it. Then do a paper "cold-read" pass: read only the room description and goal, *not* your solution, and honestly ask — could a player who knows only the taught rules reason their way here? If not, mark exactly which leap is unfair and how you’d teach or signpost it.',
    success: [
      'Your puzzle’s every required rule was demonstrably taught earlier — no outside knowledge or moon-logic.',
      'The goal is legible up front; the difficulty lives in the method, not in guessing the objective.',
      'A failed attempt in your design leaves the player a clue, and you’ve named at least one unintended-but-valid solution you’d allow.',
      'You can explain why you, the author, are the worst person to judge the puzzle’s fairness.'
    ],
    skills: ['Designing fair puzzles', 'Auditing for moon-logic', 'Fail-forward feedback', 'Cold-read playtesting'],
    simplified: 'Treating fairness as "solvable from taught knowledge + legible goal + failure-teaches" is a practical working frame, not a formal proof. Some celebrated puzzles deliberately break a rule (a single rug-pull twist); that works only once you’ve earned the player’s trust, and is the exception, not the method.',
    goDeeper: 'For the failure-mode vocabulary, read up on "moon logic" and adventure-game design post-mortems; for the constructive side, look at how puzzle-platformer designers talk about teaching mechanics without text. The pacing connects back to encounter design ([[c2-03]]) and guiding the player ([[c1-04]]).',
    quiz: [
      { q: 'What separates a "fair" hard puzzle from an "unfair" one?', a: 'A fair puzzle can be solved by reasoning from rules the game has already taught, with a legible goal — the difficulty is in finding the method. An unfair one relies on outside knowledge, a hidden goal, or "moon logic" that only makes sense after you’re told the answer.' },
      { q: 'Why can’t you reliably judge the fairness of a puzzle you designed?', a: 'Because you already know the solution, so everything looks obvious to you — you can’t un-see it. Fairness is about whether someone *without* the answer can reason there, so you must hand it to cold testers, stay silent, and watch where they actually get stuck.' },
      { q: 'A playtester solves your puzzle a way you never intended, but it obeys your rules. Bug or feature?', a: 'Feature. A solution that follows your stated rules but that you didn’t foresee is a sign of a rich, fair system — players feel brilliant for finding it. Patch it out only if it trivialises everything or breaks later content; otherwise celebrate it.' }
    ],
    tags: ['puzzle', 'fairness', 'moon logic', 'playtesting', 'scope', 'level design'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
