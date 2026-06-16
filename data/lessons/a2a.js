/* Pillar A · Phase a2 · Module a2a — Build a world */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'a2-01', title: 'Worldbuilding foundations: internal consistency', pillarId: 'A', phaseId: 'a2', moduleId: 'a2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    diagram: 'narrative',
    concept:
'Worldbuilding is not "inventing lots of stuff" — it’s establishing a set of rules and *sticking to them*. The single quality that makes a world feel real is **internal consistency**: every part agrees with every other part. A dragon-filled fantasy and a hard sci-fi station can both feel utterly believable, because believability comes from *coherence*, not realism.\n\n' +
'Think of a world as a system with **premises** (the founding rules: magic exists and costs life-force; gravity is artificial and fails when the reactor dips) and **consequences** that follow from them. The craft is in the consequences. If magic costs life-force, then mages are probably rare, feared, and short-lived — and a kingdom of cheerful, ancient wizards would *break the world*. Players may never read your lore, but they feel the seams when a consequence is missing or contradicted. This is the worldbuilding equivalent of ((ludonarrative)) harmony from [[a1-03]]: when premise, world and play all agree, the world holds.\n\n' +
'Three working principles:\n\n' +
'- **Establish the rules early, then honour them.** A world that breaks its own rules for plot convenience loses the player’s trust instantly. If teleportation exists, why did the messenger ride three days? Either answer it or cut the messenger.\n' +
'- **Build outward from consequences, not lists.** Don’t write "the seven moons of Threa" because it sounds cool; ask what *seven moons* would *do* — to tides, calendars, religion, navigation. A few premises followed honestly beat a thousand disconnected facts.\n' +
'- **Consistency over realism.** Your world need not match physics; it must match *itself*. Cartoon physics is fine if it’s always cartoon physics.\n\n' +
'For a game, the world is delivered mostly through **space and systems**, not exposition — so internal consistency is also a level-design and 3D-art discipline. A consistent world tells the level designer what a building looks like and the artist what wear-and-tear belongs there ([[c0-03]]). And it disciplines scope: a tight, coherent premise generates more usable detail per hour than a sprawling, vague one — which is exactly where the next lessons go.',
    task:
'Pick **two founding premises** for an original small game world (e.g. "the sun hasn’t risen in 40 years" and "memories can be traded as currency"). For each premise, write **three consequences** that *must* follow — touching daily life, who holds power, and what people fear. Then deliberately find **one contradiction** a careless writer might introduce, and state the rule that resolves it. The point is to feel how a premise *forces* detail rather than you inventing it.',
    success: [
      'You can state that believability comes from internal consistency, not realism.',
      'You can derive concrete consequences from a founding premise rather than listing unconnected facts.',
      'You can spot a rule-break that would cost the player’s trust, and patch it.'
    ],
    skills: ['Premise → consequence reasoning', 'Internal consistency', 'World as system'],
    simplified: 'Real worldbuilding is iterative and messy — premises shift as the game is made. "Set rules early" is the working ideal; in practice you lock the load-bearing rules early and let surface detail evolve.',
    goDeeper: 'For consequence-driven worldbuilding, look up Brandon Sanderson’s lectures on magic systems and his "laws" (especially that limitations matter more than powers); for the systems view, M. John Harrison’s critiques of over-detailed worlds are a bracing counterpoint.',
    quiz: [
      { q: 'Why can a world full of dragons feel more believable than a "realistic" one?', a: 'Because believability comes from internal consistency, not realism. A dragon world that honours its own rules — what dragons eat, who fears them, how society adapted — feels coherent, while a realistic world that breaks its own logic for convenience feels fake.' },
      { q: 'You added teleportation to your lore, but your plot relies on a messenger taking three days to deliver news. What’s the problem and the fix?', a: 'It’s an internal contradiction — a rule (teleportation) is ignored when inconvenient, which breaks player trust. Fix it by constraining the rule (teleportation is rare, costly, or blocked here) or by cutting the messenger plot that depends on the rule not existing.' }
    ],
    tags: ['worldbuilding', 'consistency', 'premise', 'lore', 'fundamentals'] },
  {
    id: 'a2-02', title: 'Factions, history and culture', pillarId: 'A', phaseId: 'a2', moduleId: 'a2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'Once a world has its rules, it needs *people who disagree*. **Factions, history and culture** are the three engines that turn a static setting into a place with tension — and tension is what a game can actually use.\n\n' +
'**Factions** are groups with conflicting goals. They are the most directly *playable* part of a world, because a faction is essentially a want-and-obstacle (the conflict idea from [[a0-04]]) at the scale of a group. Good factions aren’t "good guys vs bad guys"; each has a reasonable goal, a method, and a cost. The merchant guild wants stability *because* it profits from trade; the reformers want upheaval *because* the system failed them. When two sympathetic factions both have a point, the player’s choices gain weight. Factions also hand the designer ready-made quest-givers, enemies, allies and reputation systems — a seam straight into mechanics ([[a5-01]]).\n\n' +
'**History** is consequence stretched across time. You don’t need a thousand-year timeline; you need a few **load-bearing events** that explain *why now*: the war that drew the borders, the plague that emptied the city, the betrayal the factions still argue about. History’s job is to make the present moment feel *caused* rather than arbitrary. The richest history is the kind the player can *find* — a battlefield grown over, a monument to a forgotten side — which is why it belongs as much to the level and 3D tracks as to the writer ([[c0-03]]).\n\n' +
'**Culture** is how the rules and history *feel* in daily life: what people eat, fear, swear by, celebrate; how they greet a stranger; what counts as rude. Culture is where a world becomes *texture* — and it’s the cheapest, highest-impact detail you can author, because a single specific custom (they touch the doorframe before entering a home) implies a whole belief system without a paragraph of lore.\n\n' +
'The scope discipline: factions, history and culture are bottomless. Build only the **slice the player will touch** — the two or three factions whose conflict the game is actually about, the handful of events that explain the level you’re shipping, the customs visible in the one town you built. Everything else is a note for later.',
    task:
'Design **two opposing factions** for your world from [[a2-01]]. For each, write its **goal**, its **method**, and the **cost** its method imposes on others — and make sure *both* goals are sympathetic. Then write **one historical event** that put them at odds, and **one cultural detail** (a custom, food, oath or taboo) that a player could *see* in the world without being told. Finally, name one quest or mechanic the faction conflict hands your designer for free.',
    success: [
      'Your factions have conflicting but *sympathetic* goals, not a hero/villain split.',
      'You can name a load-bearing historical event that explains the present situation.',
      'You can express culture through a single concrete, observable detail rather than exposition.'
    ],
    skills: ['Faction design', 'History as causation', 'Culture through detail'],
    simplified: 'Two factions is a deliberately small teaching scope. Larger games run many overlapping factions with reputation matrices; the principles (conflicting sympathetic goals, load-bearing events, observable culture) scale up, but the work grows fast — hence the scope warning.',
    goDeeper: 'For faction and political worldbuilding, study how tabletop settings (e.g. the faction structures in long-running RPG campaign settings) organise conflict; for culture-through-detail, read about "iceberg" worldbuilding where the visible custom implies the unseen mass.',
    quiz: [
      { q: 'Why should opposing factions both have sympathetic goals?', a: 'Because conflict between two reasonable positions gives the player’s choices real weight — there’s a genuine cost either way. A "good vs evil" split makes the choice obvious and the world flat; sympathetic opposition creates dilemmas, which is what a game can make interactive.' },
      { q: 'How can history be delivered to a player without a single line of exposition?', a: 'Through the environment and systems — a battlefield reclaimed by forest, a defaced monument, ruins of the losing side. The level and 3D tracks turn history into something the player discovers by looking, which lands harder than being told.' }
    ],
    tags: ['worldbuilding', 'factions', 'history', 'culture', 'conflict'] },
  {
    id: 'a2-03', title: 'The story bible: documenting a world', pillarId: 'A', phaseId: 'a2', moduleId: 'a2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A **story bible** is the single source of truth for everything about your world: its rules, factions, history, characters, places, names, tone and the canon that everyone on the team must not contradict. On a solo project it keeps *you* consistent across months; on an eight-person team it’s how the artist, level designer and programmer all build *the same world* without constant meetings.\n\n' +
'A story bible is a **working tool, not a novel**. The failure mode is writing a beautiful, unstructured 80-page lore dump nobody reads. Optimise it for **lookup and decision-making**: a teammate should find "how do mages age?" or "what’s the capital called?" in seconds. Practical shape:\n\n' +
'- **Pitch / premise** — the world in a paragraph, plus the founding rules from [[a2-01]]. Top of the document.\n' +
'- **Canon rules** — the load-bearing constraints (how magic/tech works and what it *costs*). The bits that, if broken, break the world.\n' +
'- **Factions** — goal, method, cost, relationships ([[a2-02]]).\n' +
'- **History** — only the load-bearing events, as a short timeline.\n' +
'- **Places** — the locations the game actually visits, with the mood and look each implies (a direct handoff to level design and 3D — [[c0-03]]).\n' +
'- **Characters** — want / need / flaw per [[a0-03]], kept lean.\n' +
'- **Style & naming** — tone, what words feel right, a naming convention so "Zyx’thar" and "Bob" don’t share a map.\n' +
'- **Glossary / open questions** — terms, and a list of things *not yet decided* (this is what stops the bible pretending to be finished).\n\n' +
'Treat the bible as **living and versioned**. It changes as the game is made; put it where the team can edit it and track changes — the same version-control instinct as [[03-01]]. Crucially, the bible sits *inside* the wider design documentation: it’s the world half of the project, while the ((GDD)) owns mechanics and scope ([[b3-01]]). Keep the seam clean — lore in the bible, rules-of-play in the GDD — and link between them.\n\n' +
'Scope rule, again: the bible documents the world you’re *shipping*, plus a thin margin. An entry for a continent the player never visits is a hobby, not a deliverable.',
    task:
'Draft a **one-page story-bible skeleton** for your world (from [[a2-01]] and [[a2-02]]) using these headings: *Premise & Rules*, *Factions*, *History (load-bearing events)*, *Places we visit*, *Key characters*, *Style & naming*, *Open questions*. Fill each with 1–3 bullet points — no prose paragraphs. Then write one sentence stating which parts belong here versus in the GDD, to keep the documents from overlapping.',
    success: [
      'Your bible is structured for fast lookup, not written as continuous prose.',
      'You can say what belongs in the story bible versus the GDD.',
      'You included an "open questions" section, treating the bible as living and unfinished.'
    ],
    skills: ['Story-bible structure', 'Documentation for a team', 'Lore vs GDD boundary'],
    simplified: 'Tools and exact section lists vary by studio (some fold the bible into a wiki, some into the GDD). The headings here are a sound starting template, not an industry standard — adapt them to your team and tool.',
    goDeeper: 'Look at how production teams describe their "world bible" or "franchise bible" in postmortems and GDC talks; for the wiki-as-bible approach, any team-editable wiki tool shows the lookup-first structure in action.',
    quiz: [
      { q: 'What’s the most common way a story bible fails, and how do you avoid it?', a: 'It becomes an unstructured lore dump nobody reads. Avoid it by optimising for lookup and decisions — clear headings, bullet points, a glossary, and an "open questions" list — so a teammate can find an answer in seconds rather than reading a novel.' },
      { q: 'Where’s the line between the story bible and the GDD?', a: 'The story bible owns the world — rules, factions, history, places, tone. The GDD owns the play — mechanics, systems, scope and features. Keep lore in the bible and rules-of-play in the GDD, and cross-link them so neither contradicts the other.' }
    ],
    tags: ['story bible', 'documentation', 'worldbuilding', 'canon', 'team'] },
  {
    id: 'a2-04', title: 'Worldbuilding for scope: just enough world', pillarId: 'A', phaseId: 'a2', moduleId: 'a2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    diagram: 'scope',
    concept:
'Worldbuilding is the most seductive scope trap in games, because it’s *fun* and *feels* like progress while costing the project nothing the day you do it — and everything later. You can spend a semester naming dynasties and never ship a level. The discipline this lesson teaches is **just-enough world**: build only what the player will *touch*, plus a thin margin, and turn the rest into notes.\n\n' +
'The mental tool is the **iceberg**, used honestly. The classic advice — "imply a vast world beneath a small visible tip" — is true, but easy to abuse into building the whole iceberg. The scope-aware version: the *visible tip* must be solid and specific, and the *submerged mass* should be **implied, not authored**. A single weathered sign reading "checkpoint closed since the Collapse" implies an entire history you never wrote. Implication is cheap; authoring is expensive. Spend your hours on the tip and let suggestion do the rest.\n\n' +
'Three rules of thumb:\n\n' +
'- **Demand-driven worldbuilding.** Build a piece of world only when the game *needs* it — a level needs a reason this place is ruined, a quest needs a faction to anger. World built ahead of demand is usually world built for the bin.\n' +
'- **Detail where the camera points.** The one town the player explores deserves real culture and history; the empire offstage needs a name and a vibe. Match worldbuilding density to where the player actually goes — the same logic as ((texel density)) in [[d2-01]], or the critical path in [[c1-05]].\n' +
'- **Notes are not debt.** An "open questions" list ([[a2-03]]) lets you *defer* worldbuilding without losing the idea. Capturing a thought costs a line; building it out costs a week.\n\n' +
'This is the worldbuilding face of the project-wide scope bar the minor grades you on — complexity vs feasibility ([[01-05]]). A small, dense, coherent world that fully supports one shippable game will always beat a vast, thin one that supports nothing. When in doubt, **cut world, keep tip**: a believable corner beats an unbelievable continent.',
    task:
'Take your world so far ([[a2-01]] to [[a2-03]]) and ruthlessly **split it into "tip" and "iceberg"**. List everything you’ve invented; mark each item *Build* (the player will touch it this game) or *Imply* (a note / a hint in the world). Aim for far more *Imply* than *Build*. Then, for one *Imply* item, write the **single cheap signal** — a sign, a ruin, a line of barked dialogue — that implies it without you authoring it. End with one sentence: what would you cut entirely if the game had to ship next month?',
    success: [
      'You can sort world detail into "build now" versus "imply / defer" honestly.',
      'You can imply a large piece of unseen world with one cheap, specific signal.',
      'You can connect worldbuilding scope to the minor’s complexity-vs-feasibility bar.'
    ],
    skills: ['Just-enough worldbuilding', 'The iceberg, used honestly', 'Demand-driven scope'],
    simplified: 'The "build the tip, imply the mass" ratio depends on genre — a narrative RPG authors more world than an arcade game. The principle (match density to where the player goes) holds; the exact ratio is a judgement call, not a formula.',
    goDeeper: 'The "iceberg" idea is often traced to Hemingway’s theory of omission applied to fiction; for the games-specific scope angle, revisit any GDC postmortem where a team describes cutting world content to ship — the pattern is near-universal.',
    quiz: [
      { q: 'Why is worldbuilding such a dangerous scope trap specifically?', a: 'Because it’s fun and feels like progress while producing nothing playable — you can author endless lore and still have no level to ship. It hides as productive work, which is why it needs explicit scope discipline: build only what the player touches, imply the rest.' },
      { q: 'How do you make a vast world without building a vast world?', a: 'By implying the submerged mass instead of authoring it — a single cheap, specific signal (a weathered sign, a ruin, a barked line) suggests a whole history the player fills in. You spend your hours making the visible "tip" solid and let suggestion do the heavy lifting.' }
    ],
    tags: ['scope', 'worldbuilding', 'iceberg', 'feasibility', 'cutting'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
