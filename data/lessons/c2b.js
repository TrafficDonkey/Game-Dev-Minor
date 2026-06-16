/* Pillar C · Phase c2 · Module c2b — Encounters */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c2-03', title: 'Encounter design and the combat arena', pillarId: 'C', phaseId: 'c2', moduleId: 'c2b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    diagram: 'blockout',
    concept:
'An **((encounter))** is a designed moment of pressure — usually combat, but the same craft covers a chase, a stealth gauntlet or a timed escape. The level designer rarely writes the enemy AI ([[e4-02]]); your job is the *stage*: the space, the spawns, the cover and the cadence that turn a fight from a flat shooting-gallery into a moment the player remembers.\n\n' +
'Think of an encounter as a tiny dramatic arc — the same setup-conflict-escalation-resolution shape as a story beat ([[a0-04]]) — expressed entirely through space and pacing. A strong combat **arena** controls a few levers:\n\n' +
'- **Geometry**: cover, high ground, chokepoints and flanks. Cover the player can use *and lose* (destructible, or that the enemy can outflank) keeps them moving. A flat open box is the weakest arena there is.\n' +
'- **Sightlines and reveal**: what the player sees on entry shapes their plan ([[c1-03]]). Reveal the threat before the trap springs, or you get a cheap "gotcha" death the player can’t learn from.\n' +
'- **Spawns and waves**: *where* and *when* enemies arrive. Spawning behind a player who just cleared a room feels unfair; telegraphed reinforcements from a marked door feel like escalation.\n' +
'- **Entrances and exits**: how the player commits to the fight and how they can retreat or reposition. An arena with one door is a trap; one with two is a tactic.\n\n' +
'The classic rhythm is **breather → build → spike → breather**. Lead in with a calm approach that lets the player read the space, escalate the threat, hit a peak (an elite, a wave, a mini-boss), then release into safety. This is pacing as tension and release ([[c1-02]]) applied at the scale of a single room.\n\n' +
'Scope honesty: a memorable encounter is mostly **layout, not enemy count**. Throwing more bodies at the player is the over-scoper’s reflex — it costs AI work, balancing and frames, and usually plays *worse* than the same threat shaped by smart geometry. Design the arena first; the population is a tuning knob you turn last.',
    task:
'Take a square "combat box" — a flat 12×12 m room with one door — and **redesign it on paper** into a real arena. Add: at least two pieces of cover the player can use *and* lose, one piece of high ground, a second entrance, and a marked spawn point for reinforcements. Then annotate the **pacing**: where the player gets a breather, where the threat builds, and where the spike lands. Finally, write one sentence naming the *fantasy* of this fight (a desperate last stand? a clean ambush?) and how your layout serves it — not how many enemies you added.',
    success: [
      'You can list the levers of an arena (geometry, sightlines, spawns, entrances) and what each one does.',
      'Your redesign improves the fight through *layout*, not just by adding enemies.',
      'You can point at the breather → build → spike → breather rhythm in your own annotated arena.'
    ],
    skills: ['Arena layout', 'Encounter pacing', 'Spawn & sightline design'],
    simplified: 'Specific arena conventions vary by genre — an arena shooter, a tactics game and a melee brawler weight cover, ranges and verticality very differently. The levers here are the common toolkit, not a single recipe.',
    goDeeper: 'Search GDC talks on "anatomy of an encounter" or arena/combat design from action-game and shooter teams; many studios publish post-mortems on how a signature fight’s *space* was built before its enemies were tuned.',
    quiz: [
      { q: 'A playtester keeps dying to enemies that spawn behind them after they clear a room. Why does this feel unfair, and what’s the level-design fix?', a: 'A spawn the player can’t see or anticipate gives them no information to act on, so the death reads as the game cheating rather than the player failing. Fix it with telegraphing: spawn reinforcements from a visible, marked entrance, or reveal the threat before it engages, so the player can form and adjust a plan.' },
      { q: 'Your encounter feels flat even though it has plenty of enemies. What is the layout most likely missing?', a: 'Probably a dramatic rhythm and meaningful geometry. A flat open box with a constant stream of enemies has no breather → build → spike arc and no cover, high ground or chokepoints to create decisions. Shape the space and pace the threat before adding more bodies.' }
    ],
    tags: ['encounter', 'arena', 'combat', 'pacing', 'level design', 'spawns'] },
  {
    id: 'c2-04', title: 'Fair difficulty curves in encounters', pillarId: 'C', phaseId: 'c2', moduleId: 'c2b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A **((difficulty curve))** is how hard your game gets over time. Done well, it tracks the player’s rising skill so the challenge stays in the sweet spot between boredom and panic — the state of **((flow))** ([[b1-02]]). Done badly, it spikes, stalls or cheats, and players quit. Curves are designed at two scales: across the whole game (a campaign-wide ramp, owned with the designer at [[b2-04]]) and *within* a single encounter — which is where the level designer lives.\n\n' +
'The golden rule is **fair, not easy**. Players will happily lose many times to a tough fight if every loss is *legible* — if they understand what killed them and can see the better play. Difficulty becomes *unfair* when it stops teaching: invisible damage, unreadable attacks, randomness with no counter, or a spike with no warm-up. Fair difficulty is built from a few honest tools:\n\n' +
'- **A gentle entry**: open an encounter below its peak so the player reads the space and the threat before the pressure lands.\n' +
'- **Telegraphing**: every serious threat should announce itself — a wind-up, a sound, a tell — so reacting is a *skill*, not a coin-flip. This leans on feedback and readability ([[b0-05]]).\n' +
'- **Escalation, not a wall**: raise difficulty in steps the player can climb, not a cliff. Introduce one new pressure at a time (a new enemy type, then a tougher mix), never five at once.\n' +
'- **Recovery and checkpoints**: cheap retries and a checkpoint *before* the spike keep failure a lesson instead of a punishment. A brutal fight after a long unsaved trek feels unfair even if the fight itself is fair.\n\n' +
'Watch two traps. **Fake difficulty** inflates numbers (more health, more damage) instead of demanding more skill — it’s the lazy knob and it feels cheap. And the **difficulty illusion**: perceived fairness comes from *readability and recovery* as much as raw tuning, so a legible hard fight feels fairer than a sloppy easy one. The real levers are usually layout, telegraphing and checkpoint placement — not the enemy’s hit-points.',
    task:
'Pick a single encounter (yours, or one you redesigned in [[c2-03]]) and **map its difficulty curve** as a five-step ramp from entry to climax. For each step, write one line on the *one* new pressure it introduces (a new enemy, a flank opened, cover removed, a timer). Then audit it for fairness: mark where the player gets a **gentle entry**, where each threat is **telegraphed**, and where the **checkpoint** sits. Finally, find one place you were tempted to add difficulty by inflating numbers, and replace it with a *skill* demand instead (a tell to dodge, a flank to cover, a position to hold).',
    success: [
      'You can explain why "fair" and "easy" are different, and why a legible hard fight can feel fairer than a sloppy easy one.',
      'Your ramp introduces one new pressure per step rather than spiking everything at once.',
      'You can tell fake difficulty (inflated numbers) from real difficulty (a higher skill demand) and convert one to the other.'
    ],
    skills: ['Difficulty curves', 'Fairness & legibility', 'Telegraphing & checkpointing'],
    simplified: 'Flow and the challenge-skill balance are summarised here; the full model (Csíkszentmihályi’s flow, plus accessibility options and dynamic difficulty) is richer and is treated as a design-side topic at [[b1-02]] and [[b2-04]].',
    goDeeper: 'For the theory, read up on flow (Csíkszentmihályi) and how games apply it; for practice, study how a game you find *hard but fair* telegraphs its threats and places its checkpoints — then one you find *cheap*, and name the difference.',
    quiz: [
      { q: 'A boss is "hard" only because it has triple health and hits for huge damage, with no new attacks. Why is this fake difficulty, and what would make it fair?', a: 'Inflated numbers raise the time and punishment of a fight without asking the player to learn or do anything new, so it feels like a grind or a coin-flip rather than a test of skill. Make it fair by demanding skill instead: telegraphed attacks to read and dodge, new patterns to learn, and openings the player earns — and keep a checkpoint close so each attempt teaches.' },
      { q: 'Two encounters are tuned to the exact same numerical difficulty, but players call one fair and the other cheap. What most likely differs?', a: 'Legibility and recovery. The fair one telegraphs its threats, opens gently so the player can read it, and checkpoints before the spike; the cheap one hits with unreadable or unavoidable damage and a costly retry. Perceived fairness comes from readability and recovery as much as from the raw tuning.' }
    ],
    tags: ['difficulty', 'difficulty curve', 'fairness', 'flow', 'telegraphing', 'encounter'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
