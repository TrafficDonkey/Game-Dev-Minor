/* Pillar 0 · Phase 00 · Module 00b — How the five roles interlock (the seams) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '00-04', title: 'Story → design → level → art → code: the handoff chain', pillarId: '0', phaseId: '00', moduleId: '00b',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 22,
    diagram: 'pipeline',
    concept:
'A game is not five jobs done in parallel — it is one idea passed down a **chain**, where each role hands the next something to build on. Knowing the chain is the whole point of being a *versatile* dev: you can see what arrives at your desk and what you owe the person downstream.\n\n' +
'Walk the chain once. The **storyteller** decides what the game is *about* — its theme, tone, the fantasy the player steps into ([[a0-05]]). That hands the **designer** a reason for the mechanics to exist; the designer turns "about loneliness" into rules, verbs and a core loop ([[b0-02]]). The designer hands the **level designer** a set of verbs and a difficulty intent, and the level designer shapes *space* that teaches and paces those verbs ([[c0-01]]). The level designer hands the **3D modeller** a blockout — grey boxes with real dimensions — and the modeller replaces them with game-ready assets that fit the same footprint ([[d0-01]]). And the **programmer** is woven through all of it, turning the designer’s rules and the level’s triggers into systems that actually run ([[e1-01]]).\n\n' +
'Crucially the chain is a **loop, not a one-way street.** When the programmer discovers a mechanic isn’t fun, that feeds *back* to design. When the modeller finds a space is too cramped for the asset, that feeds back to the level designer. The arrows go both ways; a healthy team renegotiates constantly. This is why a *handoff* is really a *conversation* — you give the next person not just a file but the **intent** behind it.\n\n' +
'The scope lesson hides here too: every handoff is a place to *lose* fidelity or *add* cost. A story beat that needs a custom cutscene becomes a level set-piece, three new art assets and a scripting task. Tracing your idea down the chain is the fastest way to see what it will really cost — before you commit. The team and its disciplines that own each link are covered in [[00-03]].',
    task:
'Pick a single small feature from a game you know — one door the player must open in a clever way, one boss, one collectible. Trace it **down the whole chain** in five short lines: what the *story/theme* reason for it is, what *design* rule it becomes, what *space* the level designer must shape, what *art* assets it needs, and what the *programmer* must make run. Then add one line going *back up*: name one way a problem found late (in art or code) would force a change upstream (in level or design).',
    success: [
      'You can name the five links in order and say what each hands the next.',
      'You can explain why a handoff is a conversation about intent, not just a file drop.',
      'You can trace one feature down the chain and spot where it gains cost or loses fidelity.'
    ],
    skills: ['Reading the handoff chain', 'Tracing a feature across roles', 'Seeing feedback loops'],
    goDeeper: 'Any "how our game was made" postmortem (the GDC Vault has hundreds) shows the real chain — and where it broke. Watch one for a small team and note every place a decision in one discipline forced a change in another.',
    quiz: [
      { q: 'A teammate says "I finished the level, now art can start." Why is that framing slightly dangerous?', a: 'It treats the handoff as a one-way drop. The level’s blockout carries intent (pacing, sightlines, where the tense moment is) that art must preserve, and art will surface problems (a space too tight for the asset) that feed back to level design. Hand over the *intent* and stay in the conversation, don’t just toss the file over the wall.' },
      { q: 'Why does tracing an idea down the chain help with scope?', a: 'Because each handoff adds cost. A one-sentence story beat can fan out into a level set-piece, several art assets and a scripting task. Following the chain reveals the true cost of a feature before you commit, which is exactly the feasibility judgement the minor grades.' }
    ],
    tags: ['pipeline', 'handoff', 'seams', 'roles', 'collaboration', 'scope'] },
  {
    id: '00-05', title: 'The versatile dev: building tiny things end-to-end (the solo-dev goal)', pillarId: '0', phaseId: '00', moduleId: '00b',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 20,
    concept:
'Your goal in this course is unusual: not to master one of the five roles, but to become **versatile** — able to touch the whole pipeline, even if shallowly, so you can build a tiny thing *entirely by yourself*. This is the solo-dev mindset, and it is the best possible preparation for working in a team, because the person who has walked every link of the chain ([[00-04]]) is the person who hands off well.\n\n' +
'The trick that makes versatility achievable is **going end-to-end small instead of one-discipline deep.** A beginner’s instinct is to spend three months making one perfect 3D character. The versatile-dev move is to make a *terrible* character in an afternoon, drop it into a one-room level, give it a one-line story reason to exist, write the ten lines of code that make it move, and **play it**. You have now touched story, design, level, art and code in a single day. That complete-but-tiny loop teaches you more about how games fit together than any single polished asset ever could.\n\n' +
'Why does this matter for a *team* course? Because the minor builds one game with eight people, and the most valuable teammate is not the deepest specialist — it is the one who can **speak every language**. A programmer who understands texel density talks to artists better ([[d0-01]]); a level designer who can read a core loop ([[b0-02]]) designs spaces that serve the game. Versatility is the glue. It also makes you *unblockable*: when you’re waiting on someone, you can rough in their part yourself rather than stall.\n\n' +
'The discipline is **finishing**. A finished ugly thing teaches you the whole pipeline; a beautiful unfinished thing teaches you only its first step. So size every personal project to be *completable* — this is scope discipline ([[00-02]] covered the production phases; finishing is where they pay off). Versatile does not mean mediocre at everything; it means *capable across the chain and excellent at finishing small*.',
    task:
'Sketch — on paper, in five boxes — the smallest complete game you could build *alone* in a weekend: one **story** sentence (why does this exist?), one **mechanic**, one **room/level**, one **art asset** you’d need, and the one **bit of code** that makes it playable. The rule: it must be *finishable* in two days by one person. Then cross out anything that breaks that rule and write the smaller version. The output is a plan you could actually start, not a dream project.',
    success: [
      'You can explain why end-to-end-small beats one-discipline-deep for a beginner.',
      'You can argue why a versatile dev is the most valuable kind of teammate.',
      'You can scope a personal project down to something one person can finish in a weekend.'
    ],
    skills: ['End-to-end thinking', 'Versatility as team glue', 'Scoping to finishable'],
    simplified: 'A weekend is a rough yardstick for "tiny and finishable", not a rule — the point is a project small enough that one person completes the whole loop, whatever your real available time is.',
    goDeeper: 'Look up game-jam culture (e.g. Ludum Dare, Global Game Jam): the entire format exists to force a complete, tiny game end-to-end under a hard time limit, which is exactly the versatile-dev muscle.',
    quiz: [
      { q: 'Why is making one terrible game in a weekend often more useful than one beautiful asset in a month?', a: 'The tiny complete game makes you touch every link of the pipeline — story, design, level, art, code — so you learn how the parts fit and hand off. A single polished asset only teaches its own discipline and never shows you the seams or the feeling of finishing.' },
      { q: 'How does being versatile make you a better *team* member, not just a better solo dev?', a: 'Because you can speak every discipline’s language, hand off with the intent the next person needs, and rough in someone else’s part when you’re blocked. The glue between specialists is the person who understands all of them — versatility is that glue.' }
    ],
    tags: ['solo-dev', 'versatility', 'end-to-end', 'scope', 'finishing', 'game jam'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
