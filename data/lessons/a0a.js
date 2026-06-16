/* Pillar A · Phase a0 · Module a0a — Story & character
 * GOLD-STANDARD EXEMPLAR MODULE (storytelling / knowledge). Anchor lesson: a0-02. */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'a0-01', title: 'Why story matters in games — and when it doesn’t', pillarId: 'A', phaseId: 'a0', moduleId: 'a0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'Before you learn to write story for games, get honest about *how much story a given game actually needs*. Story is a **tool**, not a trophy — and some of the best games use almost none of it.\n\n' +
'Think of three rough tiers. **Story-led** games (narrative adventures, RPGs, many indies) make the story the point; the mechanics serve it. **Story-supported** games (most action, platformer, strategy titles) use story as motivation, context and glue — a reason to care, a thread between levels — while the *play* is the real draw. **Story-optional** games (puzzle, arcade, many multiplayer games) carry only an *implied* narrative: a theme, a setting, a vibe. Tetris has no plot, yet its escalating pace tells a tiny story of mounting pressure and relief.\n\n' +
'Why does this matter for *you*, spanning five roles? Because **story is expensive**. Dialogue, cutscenes, branching and voice work eat time and scope — the exact thing the minor warns you about. A small team’s story should be sized to what the game needs, not to what you wish you could write. Often the highest-impact "story" is **environmental** (a ruined room) or **systemic** (the tale that emerges from play), not scripted — and those are cheaper and lean on the level and design tracks.\n\n' +
'So the storyteller’s first job isn’t to write — it’s to decide **what kind of story this game wants**, and then deliver exactly that. A racing game needs a paragraph and a mood; a narrative puzzle game needs a careful arc. Match the ambition to the game and the team. This is scope discipline applied to story, and it connects straight to game design ([[b5-02]]) and level design ([[c0-03]]).',
    task:
'List three games you know well. For each, place it on the tier scale — **story-led**, **story-supported**, or **story-optional** — and write one sentence on *how* the game delivers whatever story it has (cutscene, dialogue, environment, systems, or pure implication). Then pick the one with the least explicit story and argue, in two sentences, whether more story would help it or just bloat it.',
    success: [
      'You can name the three tiers and place a real game in each.',
      'You can explain why story is a cost as well as a benefit, in scope terms.',
      'You can spot when a game’s "story" is environmental or systemic rather than scripted.'
    ],
    skills: ['Sizing narrative to a game', 'Story-as-tool thinking', 'Spotting delivery methods'],
    goDeeper: 'Jesse Schell’s *The Art of Game Design* has a clear, non-precious chapter on story in games; for the "story emerges from systems" view, look up writing on emergent narrative (e.g. talks on games like *Dwarf Fortress* and *RimWorld*).',
    quiz: [
      { q: 'A teammate wants full voiced cutscenes for your small action game. What’s the scope-aware pushback?', a: 'Voiced, animated cutscenes are some of the most expensive content a small team can attempt, and an action game is usually story-supported, not story-led. Suggest cheaper delivery — environmental beats, a few text or barks, a strong opening and closing — that gives the *feeling* of story for a fraction of the cost.' },
      { q: 'Does a game with no plot have no story?', a: 'Not necessarily. Many games carry an *implied* narrative through theme, setting and the arc of a session (rising pressure, a comeback, a clutch win). That implied story can be powerful and costs almost nothing to author.' }
    ],
    tags: ['story', 'scope', 'narrative tiers', 'fundamentals'] },
  {
    id: 'a0-02', title: 'Story structure: setup, conflict, escalation, resolution', pillarId: 'A', phaseId: 'a0', moduleId: 'a0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 22,
    concept:
'Almost every satisfying story moves through four jobs: **setup**, **conflict**, **escalation**, and **resolution**. You’ll hear fancier names — three-act structure, Freytag’s pyramid, the hero’s journey — but underneath they’re describing the same shape: establish a normal, break it, make things worse in rising steps, then resolve.\n\n' +
'- **Setup** establishes the world, the character, and what *normal* looks like — so the audience has something to lose. Keep it short; players are impatient.\n' +
'- **Conflict** is the inciting break: a problem, a threat, a desire that can’t be ignored. This is what gives the player a *reason to act*.\n' +
'- **Escalation** is the heart — a series of complications, each raising the stakes or the difficulty. The classic shape is *try, fail, try harder*. Flat middles are where stories (and games) sag.\n' +
'- **Resolution** pays off the setup: the conflict resolves, the character changes, the tension releases. Even a downer ending is a resolution.\n\n' +
'The twist for games: **this structure maps onto pacing, not just plot.** A single level has a setup (a calm intro), conflict (the first threat), escalation (harder rooms, a mini-boss), and resolution (the boss, then a breather). A whole game has the same arc across its campaign. So structure is a tool the **level designer** uses as much as the writer — the seam where story and pacing meet ([[c1-02]]). Players "read" escalation through *difficulty and spectacle*, not only through cutscenes.\n\n' +
'Beware two beginner traps. First, an **over-long setup** — players want conflict fast; reveal the world *while* they act. Second, a **flat escalation** — if level five feels like level two, the story is dead even if the prose is good. Vary the kind of pressure: new mechanics, new enemies, new stakes.',
    task:
'Take a small game idea (yours, or invent one in a sentence). Write a **four-beat outline** — one or two lines each for setup, conflict, escalation and resolution — and make the escalation beat list *three rising complications* (a try-fail-try-harder chain). Then mark, for each beat, whether you’d deliver it through **story** (cutscene/dialogue), **level** (a space or encounter), or **systems** (a mechanic getting harder). The goal is to feel structure as pacing, not just plot.',
    success: [
      'You can name the four jobs and what each one is for.',
      'Your outline has a genuinely *rising* escalation, not a flat middle.',
      'You can point at a single game level and identify its setup / conflict / escalation / resolution.'
    ],
    skills: ['Dramatic structure', 'Structure as pacing', 'Escalation design'],
    simplified: 'Four beats is a deliberate simplification of richer models (three/five-act, Freytag, Campbell). It is a sound working frame, not the only one — different genres bend it.',
    goDeeper: 'For structure, John Yorke’s *Into the Woods* is excellent on why stories take this shape; for the games angle, look at how a level designer talks about pacing in any "anatomy of a level" GDC talk.',
    quiz: [
      { q: 'A playtester says your game "drags in the middle". In structure terms, what’s most likely wrong and how do you fix it?', a: 'The escalation is flat — the middle stops raising the stakes or the challenge, so it reads as repetitive. Fix it by introducing a new complication: a new mechanic, a tougher enemy, a rising threat, or a stakes-changing reveal that makes the player re-engage.' },
      { q: 'How can a level designer use story structure without writing a word?', a: 'By pacing the space as a dramatic arc: a calm setup area, a first threat (conflict), rooms that escalate in difficulty and spectacle, then a climax (a boss or set-piece) and a breather (resolution). Players feel the structure through challenge and pacing.' }
    ],
    tags: ['structure', 'pacing', 'escalation', 'three-act', 'fundamentals'] },
  {
    id: 'a0-03', title: 'Character: want vs need, flaw and arc', pillarId: 'A', phaseId: 'a0', moduleId: 'a0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 20,
    concept:
'A character the player remembers usually has three things: a **want**, a **need**, and a **flaw** that keeps the two apart. Getting this triangle right is more useful than any amount of backstory.\n\n' +
'- The **want** is the external goal the character is chasing — rescue the sibling, win the title, escape the planet. It drives the plot and gives the player a clear objective.\n' +
'- The **need** is the internal lesson they don’t know they need — to trust people, to let go of guilt, to stop running. It drives the *meaning*.\n' +
'- The **flaw** is the trait that sabotages them — arrogance, fear, stubbornness. It creates conflict from the inside and makes the character feel real rather than a quest-dispenser.\n\n' +
'The **arc** is the journey from flaw toward need, usually *through* pursuing the want. A character who ends exactly as they began has a "flat" arc — fine for some power-fantasy or ensemble games, but most memorable protagonists *change*.\n\n' +
'For games, two wrinkles matter. First, the protagonist is often **the player**, so their "want" is frequently expressed as a *goal the mechanics support* (the want to get stronger is literally a progression system). The seam to game design is real: a character’s want and a game’s core loop should point the same way ([[a5-01]]). Second, your richest characters are often the **NPCs** — the people the player meets — because they can have arcs the player merely *witnesses*, which is cheap to deliver and emotionally effective.\n\n' +
'Keep it lean for scope: you do not need a cast of twenty. A small game with **one** well-drawn character (want, need, flaw, a small arc) beats a sprawling cast of names with no inner life. This is the D&D skill too — a memorable NPC is a want and a voice, nothing more ([[a4-03]]).',
    task:
'Invent one character in five lines: their **want** (external goal), their **need** (internal lesson), their **flaw** (what sabotages them), one **arc beat** (a moment the flaw costs them), and one line of dialogue that shows the flaw *without naming it*. Then write one sentence on how a *mechanic* in the game could express this character’s want (e.g. a hoarder who literally can’t drop items).',
    success: [
      'You can distinguish want (external) from need (internal) cleanly.',
      'Your character’s flaw actively creates conflict, rather than being a cosmetic trait.',
      'You can connect a character’s want to a mechanic or the core loop.'
    ],
    skills: ['Want/need/flaw', 'Character arc', 'Character ⇄ mechanic'],
    goDeeper: 'For the want/need framing, the screenwriting classics (e.g. Truby’s *The Anatomy of Story*) are the source; for game-specific character economy, study how a small narrative game gives one or two characters real interiority on a tiny budget.',
    quiz: [
      { q: 'What’s the difference between a character’s want and need, and why have both?', a: 'The want is the external goal that drives the plot (what they chase); the need is the internal lesson that drives the meaning (what they must learn). Having both lets the surface story pull the player forward while the deeper arc gives the ending weight.' },
      { q: 'Why can a flaw make a character feel more real?', a: 'A flaw generates conflict from the inside — the character gets in their own way — which makes them behave like a person rather than a goal-delivery machine. It also creates the room for an arc, as they struggle with (and maybe overcome) it.' }
    ],
    tags: ['character', 'want vs need', 'flaw', 'arc', 'npc'] },
  {
    id: 'a0-04', title: 'Conflict, stakes and tension', pillarId: 'A', phaseId: 'a0', moduleId: 'a0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'No conflict, no story. **Conflict** is simply a want meeting an obstacle, and it’s the engine that makes a player lean forward. But three related ideas often get muddled: conflict, **stakes**, and **tension**.\n\n' +
'**Conflict** is the clash itself — character vs character, vs environment, vs system, vs self. Games are unusually good at *environment* and *system* conflict because the obstacles are literally the level and the rules.\n\n' +
'**Stakes** are what’s at risk — what the player loses if the conflict goes badly. Stakes are what make conflict *matter*. "Defeat the boss" is a task; "defeat the boss or the village you spent an hour protecting burns" is stakes. Crucially, stakes can be mechanical (lose your run, your loot, your progress) as much as narrative, and players feel mechanical stakes immediately.\n\n' +
'**Tension** is the *felt uncertainty* about how the conflict resolves — the gap between "I might win" and "I might lose". Tension lives in the moment-to-moment, and it’s where games crush other media: a permadeath run, a boss at 5% health, a stealth section one footstep from discovery. Tension comes from **uncertainty plus stakes**: if the outcome is certain, there’s no tension no matter how high the stakes.\n\n' +
'For you as a multi-role dev, the payoff is that **conflict and tension are mostly delivered by mechanics and levels, not prose.** The designer sets the stakes (what a loss costs), the level designer shapes the tension curve (near-misses, escalating threat), and the storyteller frames *why it matters*. A great horror moment is 10% writing and 90% pacing, audio and what the player can’t see. Reinforce tension by making losses *legible* — the player must understand what they’re risking, or the stakes evaporate.',
    task:
'Pick a tense moment from a game you’ve played (a boss, a stealth beat, a clutch multiplayer round). In three short paragraphs, separate out: (1) the **conflict** (who/what against what), (2) the **stakes** (what a loss costs — narrative *and* mechanical), and (3) the source of **tension** (where the uncertainty comes from). Then propose one change that would *increase* the tension without changing the story — usually a tweak to stakes or uncertainty.',
    success: [
      'You can define conflict, stakes and tension distinctly and give a game example of each.',
      'You can explain why tension needs uncertainty, not just high stakes.',
      'You can name how stakes and tension are delivered mechanically, not just narratively.'
    ],
    skills: ['Stakes design', 'Tension & uncertainty', 'Conflict types'],
    goDeeper: 'For tension as the core of play, Brian Upton’s *The Aesthetic of Play* is a rich (denser) read; for a practical angle, study how roguelikes manufacture tension through permadeath and legible risk.',
    quiz: [
      { q: 'A boss fight has huge narrative stakes but feels boring. What’s probably missing?', a: 'Tension — the felt uncertainty of the outcome. If the fight is trivially winnable (or unwinnable), the stakes don’t register. Add uncertainty: a real chance of failure, swingy moments, a comeback mechanic, or visible risk so the player feels the outcome hanging in the balance.' },
      { q: 'Why do mechanical stakes (losing a run, loot, progress) often hit harder than narrative ones?', a: 'Because the player experiences them directly and immediately — they actually lose something they earned, not something a character loses in a cutscene. Smart designs align mechanical and narrative stakes so they reinforce each other.' }
    ],
    tags: ['conflict', 'stakes', 'tension', 'uncertainty'] },
  {
    id: 'a0-05', title: 'Theme: what your game is actually about', pillarId: 'A', phaseId: 'a0', moduleId: 'a0a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    concept:
'**Theme** is the idea underneath the plot — what the game is *really* about. Plot is "a courier crosses a ruined country"; theme is "connection survives collapse" or "the cost of carrying on alone". Theme is what makes a game feel like it means something instead of just happening.\n\n' +
'The reason theme is in a *game design* headstart, not just a writing one, is the medium’s superpower: in games, **theme can be expressed through mechanics**, not only story. A game about isolation can *make you* play alone; a game about sacrifice can *cost you* something real to progress; a game about futility can deny you a win. When the mechanics, the story and the art all say the same thing, you get **resonance** — the seam called ludonarrative harmony ([[a1-03]]). When they contradict — a story about a pacifist who mows down hundreds of enemies — you get dissonance.\n\n' +
'Practically, theme is a **decision filter**. Once you can state your game’s theme in a short phrase, it helps you cut: a feature that doesn’t serve the theme is a candidate to drop (scope discipline again). It guides the level designer’s mood, the artist’s palette, the composer’s tone, and the programmer’s feedback choices. A clear theme is one of the cheapest ways to make a small game feel coherent and intentional.\n\n' +
'Two cautions. First, **theme is discovered as often as planned** — you may find what your game is about by making it, then sharpen everything toward it. Second, don’t *lecture*: theme works best when it’s *felt* through play, not stated in a monologue. Trust the player to draw the meaning.',
    task:
'State the theme of a game you admire in a short phrase ("X is about Y"). Then find **one mechanic** in that game that expresses the theme (not the story — the rules), and **one** that arguably undercuts it. Finally, write a one-phrase theme for your own small game idea and name one feature it tells you to keep and one it tells you to cut.',
    success: [
      'You can state a game’s theme as a short "about" phrase, separate from its plot.',
      'You can find a mechanic that expresses (or contradicts) a theme.',
      'You can use a theme as a filter for what to keep or cut.'
    ],
    skills: ['Finding theme', 'Theme through mechanics', 'Theme as a cut filter'],
    goDeeper: 'Search out talks and writing on "theme through mechanics" / ludonarrative resonance; designers like Jonathan Blow and the team behind narrative-systemic games discuss expressing meaning through rules rather than cutscenes.',
    quiz: [
      { q: 'What’s the difference between a game’s plot and its theme?', a: 'Plot is the sequence of events (what happens); theme is the underlying idea the game is about (what it means). "A knight storms a castle" is plot; "power corrupts" is theme.' },
      { q: 'Why is "theme through mechanics" the storyteller’s biggest advantage in games?', a: 'Because rules and systems can make the player *experience* the theme rather than be told it — a game about loss can take something from you, a game about isolation can make you play alone. Mechanics expressing theme creates resonance that prose alone can’t.' }
    ],
    tags: ['theme', 'meaning', 'ludonarrative', 'resonance'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
