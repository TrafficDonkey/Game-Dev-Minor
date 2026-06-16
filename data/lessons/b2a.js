/* Pillar B · Phase b2 · Module b2a — Systems & balance */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b2-01', title: 'Systems design: parts, relationships, feedback loops', pillarId: 'B', phaseId: 'b2', moduleId: 'b2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    diagram: 'coreloop',
    concept:
'A **system** is a set of **parts** connected by **relationships** that produce behaviour none of the parts has alone. A single rule — "jump" — is a mechanic. Health that drains, regenerates, and gates which fights you can take is a *system*: several values wired together so that changing one ripples through the others. Systems design is the craft of wiring those parts so the whole behaves the way you want.\n\n' +
'Three pieces to name:\n' +
'- **Parts** are the values and entities: health, ammo, gold, a spawn timer, an enemy.\n' +
'- **Relationships** are the rules connecting them: "each hit costs 10 ammo", "low health speeds regen". Relationships are where design lives — the same parts wired differently make a different game.\n' +
'- **Feedback loops** are relationships that bend back on themselves, and they decide a system’s *feel*.\n\n' +
'A **((feedback loop))** is the heart of the topic. A **positive (reinforcing) loop** amplifies: winning earns gold, gold buys power, power wins more — the leader pulls away (a "snowball" or "rich-get-richer"). A **negative (balancing) loop** dampens: the leader in a kart racer gets worse items, the trailing player gets rockets — the pack stays close (rubber-banding). Neither is good or bad; they’re tools. Positive loops create *decisive* games and exciting runaway moments; negative loops keep things *close* and tense. Most good designs blend them — a small positive loop for momentum, a negative loop so one mistake isn’t fatal.\n\n' +
'Why this is core to your whole headstart: the **core loop** ([[b0-02]]) is itself a system, and so is every economy ([[b2-03]]) and progression curve ([[b2-04]]). Seeing parts/relationships/loops lets you *predict* behaviour before you build — and lets the programmer turn your design into code ([[e3-02]]) because you’ve specified the wiring, not just the vibe. The trap is **emergence you didn’t intend**: wire two loops together carelessly and you get a degenerate strategy or an inflation spiral you never designed. Map the loops first; the diagram here lets you feel a reinforcing vs balancing loop in motion.',
    task:
'Pick a system from a game you know (a combat economy, a crafting chain, a city-builder resource flow). On one page, draw it as a **box-and-arrow diagram**: boxes are parts (values/entities), arrows are relationships, and label each arrow with the rule. Then mark every **loop** you find and tag it **+** (reinforcing) or **−** (balancing). Finally, write one sentence predicting what happens if you *double* one relationship’s strength — does the system snowball, stall, or stay stable?',
    success: [
      'You can separate a system’s parts, relationships and feedback loops and say what each contributes.',
      'You can identify a reinforcing vs a balancing loop in a real game and explain its effect on play.',
      'You can predict a system’s behaviour from its loops rather than only by playing it.'
    ],
    skills: ['Systems thinking', 'Feedback loops (+/−)', 'Box-and-arrow modelling'],
    simplified: 'Positive/negative loop is the systems-dynamics convention; real systems chain many loops with delays, so single-loop reasoning is a first approximation, not a proof.',
    goDeeper: 'Donella Meadows’ *Thinking in Systems* is the clearest primer on stocks, flows and feedback; for the games angle, look at talks and writing on "systemic design" and second-order design.',
    quiz: [
      { q: 'What is the difference between a mechanic and a system?', a: 'A mechanic is a single rule or verb (jump, shoot). A system is several parts wired by relationships so they produce behaviour none has alone — health that drains, regenerates and gates progress is a system built from values and rules.' },
      { q: 'A racing game keeps the pack bunched together no matter who is ahead. What kind of feedback loop is doing that, and what is the trade-off?', a: 'A negative (balancing) loop — rubber-banding — that dampens the leader’s advantage to keep races close and tense. The trade-off is that skill matters less moment-to-moment and a dominant performance never feels decisively rewarded.' }
    ],
    tags: ['systems', 'feedback loops', 'emergence', 'design', 'snowball'] },
  {
    id: 'b2-02', title: 'Balancing: fairness, dominant strategies and counters', pillarId: 'B', phaseId: 'b2', moduleId: 'b2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'**Balancing** is tuning a system so the *interesting* choices stay interesting. It is not "make everything equal" — it is "make sure no option is so good it deletes the others, and no option is so weak it’s never worth picking". The enemy of balance is the **((dominant strategy))**: a choice that is better than the alternatives in (almost) every situation. Once players find it, the decision space collapses — why pick anything else? A game where one weapon, one build or one opening always wins is *solved*, and a solved game is boring even if it’s "fair".\n\n' +
'The classic design tool against dominance is the **counter**: every strong option has something that beats it, so power is *contextual*, not absolute. Rock-paper-scissors is the purest example — no option dominates because each is hard-countered. Real games soften this into webs of soft counters, but the principle holds: if A beats B beats C beats A, no single pick runs away with the game, and the *metagame* (reading your opponent, adapting) becomes the real depth.\n\n' +
'Distinguish two fairnesses. **Symmetric balance** gives everyone identical tools (most sports, chess) — fair by construction, but it can feel samey. **Asymmetric balance** gives different sides different tools that are *roughly equal in power* (different factions, hero kits) — far richer, far harder to tune, and the place dominant strategies love to hide. Asymmetry is balanced not by making sides identical but by making their *win conditions and weaknesses* trade off.\n\n' +
'How you actually balance: form a hypothesis, change *one* number, and **playtest** ([[b4-03]]) — watching what players do, because the dominant strategy is whatever they converge on, not what you intended. Beware the **nerf/buff seesaw**: weakening the top pick just crowns the next one, so tune toward a *spread* of viable options, not a single "correct" one. Flow theory ([[b1-02]]) is the felt side of this — balance keeps challenge matched to skill so the game neither trivialises nor walls the player. And remember scope: a small game with three well-countered options beats a sprawling roster you can never balance.',
    task:
'Take a game with several options (weapons, classes, units, cards). Name what you believe is its **dominant strategy** — or the closest thing — and write the **counter** that *should* exist to tame it. Then design a single, specific change (one number or one rule) to either weaken the dominant pick or strengthen its counter, and predict the **second-order effect**: which option becomes strong *next*? The goal is to feel that balance is a moving target you nudge, never "solve" once.',
    success: [
      'You can explain why a dominant strategy ruins a game even when it is technically fair.',
      'You can distinguish symmetric from asymmetric balance and the trade-off each makes.',
      'You can propose a one-variable change and reason about its knock-on (second-order) effect.'
    ],
    skills: ['Spotting dominant strategies', 'Designing counters', 'Symmetric vs asymmetric tuning'],
    simplified: 'Real balance uses telemetry, pick/win rates and statistics across thousands of matches; here you reason by hand from a few games, which builds the intuition but not the data discipline a live team uses.',
    goDeeper: 'Look at how competitive teams publish balance patch notes (the reasoning, not the numbers) to see counters and the nerf/buff seesaw in the open; Sirlin’s writing on balance and "degenerate strategies" is a sharp practitioner take.',
    quiz: [
      { q: 'Why is a dominant strategy a design problem even if every player has equal access to it?', a: 'Because it collapses the decision space: when one option is best almost everywhere, the other choices stop mattering and the game becomes solved. Equal access makes it "fair" but not interesting — the interesting part of a game is meaningful choice, which dominance destroys.' },
      { q: 'You nerf the strongest weapon and players immediately flock to the next-strongest. What does this tell you about how to balance?', a: 'That balancing one option in isolation just moves the throne — it is a seesaw. You balance toward a spread of viable options (often via counters and trade-offs) rather than chasing a single "correct" pick, accepting that the meta will keep shifting.' }
    ],
    tags: ['balancing', 'dominant strategy', 'counters', 'asymmetry', 'meta'] },
  {
    id: 'b2-03', title: 'In-game economies: sources, sinks and faucets', pillarId: 'B', phaseId: 'b2', moduleId: 'b2a',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 26,
    prereq: '[[b2-01]] (systems & feedback loops) first',
    concept:
'An **economy** is any system where a resource flows in, is held, and flows out — gold, ammo, mana, crafting parts, even time or health. It is a special, important case of systems design ([[b2-01]]), and getting its plumbing right is what keeps a game from feeling broken after hour three. Three terms carry the whole topic.\n\n' +
'- A **((source))** (or **faucet**) creates resource: loot drops, quest rewards, a mine that produces ore, regenerating mana. Sources set the *inflow*.\n' +
'- A **((sink))** destroys resource: shop purchases, repair costs, ammo spent, an upkeep fee. Sinks set the *outflow* — and good sinks are what give a resource *meaning*, because a currency you can never spend is just a score.\n' +
'- The **stock** is what’s currently held (your wallet, your ammo count). Stock rises when sources outpace sinks and falls when sinks outpace sources.\n\n' +
'The single most important idea is **balancing inflow against outflow over time**. If sources persistently exceed sinks, the resource *inflates*: everyone is rich, prices feel trivial, rewards stop motivating — the classic late-game where money is meaningless. If sinks exceed sources, the player is *starved*: they can never afford anything and the economy feels punishing. A healthy economy tunes the two so the player is usually *almost* able to afford the next thing — the tension that drives the grind-and-spend loop. This connects straight to progression and difficulty ([[b2-04]]): the economy *is* a pacing tool.\n\n' +
'Watch the feedback loops (this is why b2-01 is the prereq). Many economies hide a **reinforcing loop** — money buys production that makes more money — which snowballs unless a sink scales with wealth (rising upkeep, exponential costs) to act as a **balancing loop** and bend the curve. Two more cautions: **multi-currency** designs (soft vs hard, premium vs earned) exist mainly to wall off sinks and steer spending — be deliberate, not cargo-cult, about adding a second currency; and the moment real money enters, the economy carries **ethical weight** ([[b2-05]]) — designing artificial scarcity to pressure spending is a line to set on purpose. For scope: model the flow on paper (a simple inflow/outflow table per minute) *before* you build it — economies are cheap to sketch and expensive to fix live.',
    task:
'Map one game’s primary economy as a **flow table**: list every **source** (with a rough rate, e.g. "≈50 gold / encounter") and every **sink** (with a rough cost), then judge whether net flow trends toward **inflation**, **starvation**, or **balance** over a session. Identify the main **sink** that gives the currency meaning, and propose one new sink or one rate change that would fix the worst imbalance you found. Note any **reinforcing loop** in the economy and what balancing sink (if any) is holding it in check.',
    success: [
      'You can label the sources, sinks and stock of a real game’s economy.',
      'You can diagnose inflation vs starvation from inflow-vs-outflow reasoning.',
      'You can name the sink that gives a currency meaning and propose a targeted fix to rebalance flow.'
    ],
    skills: ['Source/sink/stock modelling', 'Diagnosing inflation & starvation', 'Sinks as meaning & pacing'],
    simplified: 'Rates here are eyeballed; production economies model flows with spreadsheets and simulation across player segments, and tune against live telemetry — the table you build is the right instinct at a fraction of the rigour.',
    goDeeper: 'Search GDC talks on "game economy design" and "currency sinks"; for the systems backbone, Donella Meadows’ stocks-and-flows framing (from *Thinking in Systems*) maps almost directly onto sources, sinks and stock.',
    quiz: [
      { q: 'What is the difference between a source and a sink, and why does a game need strong sinks?', a: 'A source creates a resource (loot, rewards, regeneration); a sink destroys it (purchases, repairs, upkeep). Strong sinks give the resource meaning and prevent inflation — without somewhere worthwhile to spend, a currency just piles up and stops motivating the player.' },
      { q: 'Late in a game, money becomes meaningless — everyone is rich and prices feel trivial. In economy terms, what has gone wrong and how do you fix it?', a: 'Sources have persistently outpaced sinks, so the resource has inflated. Fix it by adding or scaling a sink — rising upkeep, exponential upgrade costs, a money-hungry late-game system — often a balancing loop that grows with wealth to bend the runaway (reinforcing) curve back down.' }
    ],
    tags: ['economy', 'sources', 'sinks', 'inflation', 'progression', 'ethics'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
