/* Pillar B · Phase b5 · Module b5a — Patterns & scope */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b5-01', title: 'Genres and reusable design patterns', pillarId: 'B', phaseId: 'b5', moduleId: 'b5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A **genre** is a bundle of expectations — a shorthand both players and developers already understand. Say "platformer" and people picture jumping over gaps; say "roguelike" and they expect permadeath and procedural runs. Genres are not a cage; they are a *starting library* of solved problems you do not have to re-solve from scratch.\n\n' +
'Underneath genres sit **design patterns**: small, reusable solutions to recurring design problems, much like patterns in programming ([[b2-01]] systems). A pattern is more portable than a genre because it crosses genre lines. A few you will meet everywhere:\n\n' +
'- **Risk/reward** — offer more power for more danger (a chest in the monster room, a high-roll move that can backfire).\n' +
'- **Resource management** — give the player something scarce to spend (ammo, mana, stamina) so choices have weight.\n' +
'- **The core gameplay loop** — a tight do-this-then-that cycle the player repeats with pleasure ([[b0-02]]).\n' +
'- **Lock and key** — gate progress behind something the player must find or earn (a literal key, an ability, a level).\n' +
'- **Teach / test / twist** — introduce a mechanic safely, test it, then complicate it (the bones of level pacing too, [[c0-01]]).\n\n' +
'Why this matters for a *feasible* student game: **patterns are how you borrow proven fun cheaply.** You do not invent a brand-new genre; you pick a familiar frame, reach for a handful of patterns that fit your theme ([[a0-01]]), and spend your scarce time on *one* thing you do differently. The famous indie hits are usually "known genre + one fresh twist", not a from-scratch reinvention.\n\n' +
'The trap is treating genre conventions as *laws*. Conventions earn their place when they serve your game and become dead weight when copied on autopilot. Know the pattern, know *why* it works, then decide — keep it, bend it, or drop it. That judgement is the designer’s real job.',
    task:
'Pick a genre you know well and list its **five most common conventions** (e.g. for a twin-stick shooter: waves of enemies, pickups, a score, a screen-clearing bomb, escalating difficulty). For each, write one sentence on the *design problem it solves*. Then choose **one** convention you would deliberately break for a small original game, and argue in two sentences why breaking it makes the game more interesting rather than just broken.',
    success: [
      'You can name several genre-independent patterns (risk/reward, resource management, lock-and-key, teach/test/twist).',
      'You can explain a convention in terms of the problem it solves, not just "that’s how these games are".',
      'You can justify keeping, bending, or dropping a convention on purpose.'
    ],
    skills: ['Genre literacy', 'Recognising design patterns', 'Convention vs. law'],
    simplified: 'There is no single canonical list of game design patterns the way there is for software. Treat the patterns here as a working vocabulary, not a fixed taxonomy — different designers name and slice them differently.',
    goDeeper: 'Bjork & Holopainen’s *Patterns in Game Design* is the classic attempt at a formal pattern library; Raph Koster’s *A Theory of Fun* explains why these patterns hook us. For genre as a living, breakable thing, study any "deconstruction" talk on a genre-bending indie.',
    quiz: [
      { q: 'How is a design pattern different from a genre?', a: 'A genre is a whole bundle of expectations players attach to a kind of game (platformer, roguelike). A pattern is a single reusable solution to a recurring problem (risk/reward, lock-and-key) that can appear across many genres. Patterns are the smaller, more portable building blocks.' },
      { q: 'Why is "known genre + one twist" good scope advice for a student team?', a: 'A familiar genre gives you a library of solved problems, so you spend your limited time on the one thing you do differently instead of reinventing basics. Trying to invent a whole new genre multiplies the unknowns and the risk — usually a recipe for over-scoping.' }
    ],
    tags: ['genre', 'design patterns', 'conventions', 'scope', 'fundamentals'] },
  {
    id: 'b5-02', title: 'Designing for your scope: the feasible-fun sweet spot', pillarId: 'B', phaseId: 'b5', moduleId: 'b5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24, diagram: 'scope',
    concept:
'Over-scoping is the **number-one reason student games fail**, and the minor knows it — your GDD is graded on *complexity vs feasibility*, not on ambition ([[01-05]]). So the design skill that matters most here is not dreaming bigger; it is finding the **feasible-fun sweet spot**: the smallest design that is still genuinely *fun*, and that eight people can actually finish in a semester.\n\n' +
'Think of two axes. **Fun** is how good the game is to play. **Feasibility** is whether you can build it with your team, time and skill. Plot a feature and it lands in one of four zones:\n\n' +
'- **Fun *and* feasible** — your core. Build these first.\n' +
'- **Feasible but not fun** — busywork; cut it.\n' +
'- **Fun but not feasible** — the seductive trap (online multiplayer, an open world, 40 enemy types). Shrink it or drop it.\n' +
'- **Neither** — obvious cut.\n\n' +
'The move is to **maximise fun *per unit of cost*.** A small game that nails one loop beats a sprawling one that does ten things at 40%. Find your *one* pillar of fun ([[b3-02]]) and protect it; everything else is negotiable. "Cut your second-best idea" is painful precisely because the idea is good — but a good idea you cannot finish is worth zero at the expo.\n\n' +
'Practical scoping habits:\n\n' +
'- **Vertical slice over breadth** — one polished level beats ten grey ones. Depth reads as quality.\n' +
'- **Reuse ruthlessly** — one enemy with three behaviours, one modular kit ([[c0-01]]), one mechanic explored deeply.\n' +
'- **Content is the hidden cost** — every level, line, and asset is *labour*, often more than the code. Procedural or systemic fun is cheaper than authored content.\n' +
'- **Budget time, not features** — decide how many weeks you have, then ask what fits, not the reverse ([[04-01]]).\n\n' +
'Prototype early to learn which features are actually fun *before* you commit scope to them ([[b4-01]]) — cutting on evidence beats cutting on guesswork.',
    task:
'Take a game idea (yours or invented) and brain-dump **eight features** you would love it to have. Draw the two-by-two grid — *fun* against *feasible* for a small team — and place all eight. Then write your honest verdict: which **one** feature is your fun pillar (protect at all costs), which **three** are nice-to-haves, and which you will **cut now**. Finish with one sentence naming the cut that hurt the most and why cutting it was still right.',
    success: [
      'You can place features on a fun-vs-feasibility grid and act on where they land.',
      'You can name your single fun pillar and defend cutting everything that threatens it.',
      'You can articulate why a small, deep game usually beats a large, shallow one for a student team.'
    ],
    skills: ['Scoping to feasibility', 'Fun-per-cost thinking', 'Cutting on purpose'],
    simplified: 'The fun-vs-feasibility grid is a thinking aid, not a measurement. "Fun" can only be estimated until you playtest, which is exactly why prototyping early matters — it turns guesses about both axes into evidence.',
    goDeeper: 'For scope discipline specifically, search GDC talks on "scoping" and "postmortems" of small/student games — the failure stories are the most instructive. Mark Cerf and many indie postmortems hammer the same point: finish small.',
    quiz: [
      { q: 'A feature is genuinely fun but your team cannot realistically build it this semester. What do you do?', a: 'Shrink it until it is feasible, or cut it. "Fun but not feasible" is the most dangerous zone because the fun keeps tempting you to keep it. A fun feature you never finish ships as zero — a smaller version you actually complete ships as something.' },
      { q: 'Why does a small, deep game usually score better than a large, shallow one in a feasibility-graded course?', a: 'Because the grade rewards complexity matched to feasibility, and polish reads as quality. One well-built loop or level demonstrates skill and is finishable; ten half-built systems demonstrate over-reach and usually arrive broken. Depth maximises fun per unit of cost.' },
      { q: 'How does prototyping change how you scope?', a: 'It lets you cut on evidence instead of guesswork. By testing whether a feature is actually fun before committing weeks of content to it, you avoid pouring scope into ideas that look good on paper but fall flat in play.' }
    ],
    tags: ['scope', 'feasibility', 'cutting', 'fun', 'vertical slice'] },
  {
    id: 'b5-03', title: 'Deconstructing a game: the recurring drill', pillarId: 'B', phaseId: 'b5', moduleId: 'b5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'coreloop',
    concept:
'A designer’s eye is *trained*, not born — and the gym is **deconstruction**: playing a game with the deliberate intent to take it apart and understand *why* it works. Do it often and you stop seeing "fun" as magic and start seeing the machinery: loops, feedback, pacing, and the choices behind them. This is a recurring drill, not a one-off lesson; the minor uses it as a repeating project (P1) for exactly that reason.\n\n' +
'A useful pass works from the outside in:\n\n' +
'- **The core loop** — what does the player *do*, over and over, and why is repeating it satisfying? Name the verbs ([[b0-02]]).\n' +
'- **Mechanics, dynamics, aesthetics** — read it through MDA ([[b1-01]]): what rules are coded, what behaviour emerges, what *feeling* results? Which of the kinds of fun is it serving ([[b1-04]])?\n' +
'- **Game feel** — what makes the moment-to-moment satisfying — the juice, feedback and readability ([[b0-04]])?\n' +
'- **Pacing & teaching** — how does it introduce ideas (teach/test/twist), and how does it ration tension and release?\n' +
'- **The seams** — how do its story, levels, art and code reinforce one another? Where do they fight?\n\n' +
'Two disciplines keep deconstruction honest. First, **be specific** — "it’s fun" is useless; "the dash has 0.2s of invulnerability, so it rewards aggressive dodging" is gold. Second, **ask what you would steal *and what you would cut*** — strong deconstruction notices both the brilliant choice and the bloat, then sizes the lesson to *your* scope ([[b5-02]]). The point is not to copy; it is to harvest reusable principles ([[b5-01]]) and to watch a real designer’s decisions under pressure.\n\n' +
'Deconstruction also sharpens playtesting: learning to *watch a game work* is the same muscle as watching a player struggle with yours ([[b4-03]]).',
    task:
'Pick one game you own and run a **structured deconstruction** in roughly a page. Cover, in order: (1) the **core loop** in one sentence (the repeated verbs); (2) one **mechanic** and the **dynamic** it produces; (3) one moment of strong **game feel** and what specifically causes it; (4) one **pacing** or teaching choice; (5) one **seam** where two disciplines reinforce each other. End with two lists: **three things you would steal** and **two you would cut** — and for one steal, note how you would shrink it to fit a small team.',
    success: [
      'You can name a real game’s core loop precisely, in terms of verbs.',
      'Your notes are specific and mechanical, not vague praise.',
      'You can separate what is worth reusing from what is bloat, and size the lesson to your own scope.'
    ],
    skills: ['Structured deconstruction', 'Reading the core loop', 'Steal-and-shrink judgement'],
    goDeeper: 'The "Game Maker’s Toolkit" and "Design Doc" style of video essay is deconstruction made visible; GDC postmortems show designers deconstructing their *own* games. Build the habit of writing a short teardown after every game you finish.',
    quiz: [
      { q: 'Why is "this game is fun" a failed deconstruction?', a: 'Because it identifies an effect without its cause, so you cannot reuse anything. Good deconstruction is mechanical and specific — naming the exact rule, timing, or feedback that produces the fun — so the principle can be lifted into your own design.' },
      { q: 'What two things should every deconstruction harvest, not just one?', a: 'What you would steal *and* what you would cut. Noticing only the brilliant choices makes you copy bloat along with the gold; spotting the over-built or weak parts is how you learn scope discipline and avoid importing someone else’s mistakes.' },
      { q: 'How does the deconstruction habit feed back into playtesting?', a: 'Both train the same skill: watching a game work and explaining *why* in specific terms. Learning to see the machinery behind another game’s fun is the same muscle you use to watch a player struggle with yours and diagnose the real cause.' }
    ],
    tags: ['deconstruction', 'core loop', 'mda', 'analysis', 'drill'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
