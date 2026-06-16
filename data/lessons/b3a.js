/* Pillar B · Phase b3 · Module b3a — Author the GDD */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b3-01', title: 'The GDD in depth: the designer as its main author', pillarId: 'B', phaseId: 'b3', moduleId: 'b3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    diagram: 'gdd',
    concept:
'You met the ((GDD)) — the **Game Design Document** — back in foundations as the spine of the project ([[01-04]]) and the thing the minor grades on **complexity vs feasibility** ([[01-05]]). Now you own it. In an eight-person team the **game designer is the GDD’s main author**: not its only contributor, but the person who keeps it coherent, current and honest.\n\n' +
'A GDD is not a novel and not a wish-list. It is the **shared source of truth** that lets five disciplines build the *same* game. The storyteller reads it for theme and tone, the level designer for the kind of spaces to block out ([[c0-01]]), the 3D modeller for the art direction and asset list, the programmer for the systems and features to script. When the GDD is clear, handoffs are cheap; when it is vague or stale, the team builds five slightly different games and the integration hurts.\n\n' +
'A working student GDD is usually built from a few standard sections: a **one-page pitch** and **design pillars** ([[b3-02]]); the **core loop** ([[b0-02]]); **mechanics and systems**; **progression and balance**; **story, world and characters** (the pull from Pillar A); **level/content plan**; **art direction and asset list**; **UI/UX and controls**; **audio**; **scope, milestones and risks**. You do not need all of them on day one — and a 60-page GDD nobody reads is worse than a tight 10-page one the team actually follows.\n\n' +
'Two habits make a designer’s GDD good. First, **it is a living document** — versioned in Git alongside the project ([[00-04]]), updated when the design changes, not written once and abandoned. Second, **every section earns its place**: if a paragraph does not change what someone builds, cut it. The GDD is a tool for *aligning and deciding*, and its real test is whether a teammate can read a section and start working without asking you what you meant.\n\n' +
'Scope lives here too. The GDD is exactly where over-scoping shows up first, because writing "and also a crafting system" costs one line but months of work ([[b5-02]]). The designer’s job is to keep the document’s ambition matched to what eight people can ship in a semester.',
    task:
'Find a real GDD section list (search "game design document template" or use the section list above) and **draft a one-page table of contents for a small game of your own** — just the section headings, plus one line under each saying *what that section will decide* and *who reads it*. Then mark each section **must-have for week one** or **fill in later**, and cut any section your tiny game does not need. The goal is to feel the GDD as a tool for alignment, not a form to fill in.',
    success: [
      'You can explain why the GDD is the team’s shared source of truth, and what each discipline reads it for.',
      'You can name the standard sections and decide which a small game actually needs.',
      'You can articulate why the GDD is a living, versioned document, not a write-once artifact.'
    ],
    skills: ['GDD authorship', 'Sectioning a design doc', 'Doc-as-alignment-tool'],
    simplified: 'There is no single official GDD format — section names and order vary by studio and school. The section list here is a common, sensible default; your minor may hand you its own template, which you should follow.',
    goDeeper: 'For structure and intent, read about GDDs on a practitioner site like the GDC vault or a studio postmortem; Tim Ryan’s classic "Anatomy of a Design Document" essays are a well-known starting point for the section breakdown.',
    quiz: [
      { q: 'Your team keeps building slightly different versions of the same feature. How does the GDD help?', a: 'A clear GDD is the single source of truth, so everyone builds from the same description instead of from memory or assumption. The fix is usually to write the feature down precisely (see [[b3-03]]) and keep that section current, so handoffs need no re-explaining.' },
      { q: 'Why can a shorter GDD be better than a longer one?', a: 'Because the GDD is read to decide and align, not to impress. A tight document people actually follow beats a 60-page one nobody reads. Every section should change what someone builds; if it does not, it is padding that hides the parts that matter.' }
    ],
    tags: ['gdd', 'documentation', 'game design', 'scope', 'team'] },
  {
    id: 'b3-02', title: 'The one-page pitch and the design pillars', pillarId: 'B', phaseId: 'b3', moduleId: 'b3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    diagram: 'gdd',
    concept:
'Before the full GDD comes the part everyone actually reads: the **one-page pitch** and the **design pillars**. These two short pieces sit at the front of the document and do most of the aligning work.\n\n' +
'A **one-page pitch** (sometimes a "one-pager" or "concept brief") answers, in a single page: what is this game, who is it for, and why is it worth making? A useful skeleton is a **hook** (one or two sentences a stranger gets instantly), the **core fantasy** (what the player *gets to be or do*), the **core loop** in a line ([[b0-02]]), the **genre and references** ("X meets Y" — naming games by name only, never copying them), the **platform and scope**, and **what makes it distinctive**. If you cannot fit the game on one page, you do not yet understand it well enough to make it with eight people.\n\n' +
'**Design pillars** are the three-to-four short phrases that capture what the game must always be — its non-negotiables. Good pillars are *specific and decision-making*: "tense, not twitchy", "every death teaches", "the world reacts to you". Bad pillars are bland adjectives that decide nothing ("fun", "immersive", "high quality" — every game claims those). Pillars are a **filter**: when someone proposes a feature, you ask *does it serve a pillar?* If it serves none, it is a candidate to cut — which is scope discipline made operational ([[b5-02]]). Pillars also keep the team aligned without you in every conversation: the level designer and programmer can each ask "is this on-pillar?" and usually agree.\n\n' +
'The seam to the rest of the document is direct. Pillars echo your **theme** from the story side ([[a5-01]]) and should point the same way as the **core loop** and the **kind of fun** you are chasing ([[b1-01]]). When pitch, pillars, loop and theme all say the same thing, the game feels intentional; when they contradict, the team feels it as constant friction.\n\n' +
'Keep both honest about scope. A one-pager that promises an open world and 40 hours is a pitch your team cannot cash. The pitch and pillars are the first place a feasibility reviewer looks ([[01-05]]).',
    task:
'Write a **one-page pitch** for a small game (real or invented): hook, core fantasy, one-line core loop, "X meets Y" references, platform/scope, and what makes it distinctive — keep it to a single page. Then write **three or four design pillars**, each a short specific phrase, and *test each one*: name a feature it tells you to keep and a feature it tells you to cut. If a pillar cuts nothing and keeps nothing, rewrite it until it decides something.',
    success: [
      'Your one-pager communicates the whole game to a stranger on a single page.',
      'Your pillars are specific phrases that actually filter features, not bland adjectives.',
      'You can show pitch, pillars, core loop and theme all pointing the same way.'
    ],
    skills: ['One-page pitching', 'Writing design pillars', 'Using pillars as a cut filter'],
    simplified: 'The exact pitch skeleton varies — some teams use "X meets Y" elevator lines, others a fuller one-page brief. The elements here are a reliable common set; adapt the order to your minor’s template.',
    goDeeper: 'Search talks and articles on "design pillars" and "game pitch one-pager"; many GDC talks open by stating a game’s pillars, which is a good way to see specific, decision-making pillars in the wild.',
    quiz: [
      { q: 'What makes a design pillar good rather than useless?', a: 'A good pillar is specific enough to make decisions: it tells you which features to keep and which to cut. "Tense, not twitchy" is a pillar; "fun" and "immersive" are not, because every game claims them and they filter nothing.' },
      { q: 'Why write a one-page pitch before the full GDD?', a: 'Because it forces you to understand the game well enough to compress it, and it is the part teammates and reviewers actually read first. If the game cannot fit on one page, that is a signal it is unclear or over-scoped — better to find that out before writing 40 more pages.' }
    ],
    tags: ['pitch', 'design pillars', 'gdd', 'scope', 'vision'] },
  {
    id: 'b3-03', title: 'Writing a feature so a team can build it', pillarId: 'B', phaseId: 'b3', moduleId: 'b3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'The pitch and pillars set the vision; this is where the designer’s GDD earns its keep — **writing a single feature precisely enough that a teammate can build it without asking you what you meant**. This is the most practical writing a game designer does, and the most often done badly.\n\n' +
'A vague feature line — "the player can dash" — hides every decision that actually matters. A buildable feature spec answers the questions a programmer, animator and level designer will otherwise have to guess or interrupt you to ask:\n' +
'- **What it is and why** — one sentence, tied to a pillar or the core loop.\n' +
'- **Player-facing behaviour** — the input, what happens, what the player sees and hears (the feel — distance, speed, cooldown, i-frames).\n' +
'- **Rules and numbers** — concrete starting values you expect to tune: dash distance, cooldown seconds, stamina cost. Mark them *tuning values*, not laws.\n' +
'- **States and edge cases** — what happens mid-air, into a wall, while stunned, during another dash. Edge cases are where features actually get built or broken.\n' +
'- **Feedback** — the juice: animation, sound, particles, screen-shake ([[b0-04]]) — because a mechanic without feedback feels broken.\n' +
'- **Dependencies and acceptance** — what must exist first, and a short *"done when…"* checklist so anyone can tell when it works.\n\n' +
'Two principles keep specs useful. First, **specify behaviour and intent, not implementation** — say *what* the dash does and how it should feel; let the programmer choose *how* to code it ([[a5-01]] is the same partnership from the story side). Second, **make numbers tunable, not sacred** — the first values are guesses you will change after playtesting ([[b4-01]], [[b4-03]]), so write them as a starting point and design the feature to be data-driven where you can.\n\n' +
'This is also where a designer practices empathy for the build. A good spec is short, scannable and answers questions *before they are asked*; it links to the systems it touches ([[b2-01]]) rather than re-explaining them. The acceptance checklist doubles as a definition of "done" your team can put on a board ([[02-05]]) — turning a paragraph of design into a piece of trackable work.',
    task:
'Pick **one** mechanic from a game you know (a dash, a grab, a reload, a parry). Write a **one-feature spec** using the headings above: what/why, player-facing behaviour, rules and concrete starting numbers (marked as tuning values), at least **three edge cases**, the feedback, and a 3-to-5-item *"done when…"* acceptance checklist. Then hand it to the harshest reader you have — yourself an hour later — and list every question a programmer could still ask. Each unanswered question is a hole in the spec; fill it.',
    success: [
      'Your spec separates *what/why/feel* from *how to implement it*.',
      'You handled real edge cases, not just the happy path.',
      'Your numbers are written as tunable starting values, and your "done when…" list is checkable by someone else.'
    ],
    skills: ['Feature specification', 'Edge-case thinking', 'Writing acceptance criteria'],
    simplified: 'Real teams range from heavyweight specs to a few lines on a card, depending on the feature’s risk. The headings here are a thorough default for an important mechanic; trivial features need far less. Match the spec’s weight to the feature’s risk.',
    goDeeper: 'Look at how agile teams write "user stories" and "acceptance criteria"; the same discipline applied to a game mechanic produces a buildable feature spec. Studio design-doc postmortems also show real feature pages.',
    quiz: [
      { q: 'Why should a feature spec describe behaviour and feel rather than how to code it?', a: 'Because the designer owns *what the feature does and how it should feel*; the programmer owns *how to implement it*. Over-specifying the code wastes the programmer’s judgement and ages badly, while under-specifying the behaviour leaves the team guessing. Specify intent and feel precisely, and leave implementation to the builder.' },
      { q: 'A spec lists dash distance and cooldown as fixed laws. What is the risk, and the fix?', a: 'Treating first-pass numbers as sacred makes the feature brittle and discourages the tuning that playtesting demands ([[b4-03]]). Mark them as tuning values and, where possible, make them data-driven so they can be changed without rewriting code — because you *will* change them.' },
      { q: 'What does a "done when…" checklist add to a feature spec?', a: 'It turns a paragraph of design into trackable, verifiable work: anyone can check the boxes to confirm the feature behaves as intended, and it becomes the card’s definition of "done" on the team board ([[02-05]]). It also forces you to decide, up front, what success actually looks like.' }
    ],
    tags: ['feature spec', 'acceptance criteria', 'edge cases', 'documentation', 'tuning'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
