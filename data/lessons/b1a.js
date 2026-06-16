/* Pillar B · Phase b1 · Module b1a — Theory of fun */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b1-01', title: 'The MDA framework: mechanics, dynamics, aesthetics', pillarId: 'B', phaseId: 'b1', moduleId: 'b1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'**MDA** is the most useful lens a game designer owns. It splits a game into three layers — **Mechanics**, **Dynamics**, **Aesthetics** — and, crucially, points out that *you* and the *player* read those layers from opposite ends.\n\n' +
'- **Mechanics** are the rules and components you actually author: the verbs, the numbers, the systems ([[b0-01]]). "A jump has this height; enemies spawn on this timer; cards deal this damage."\n' +
'- **Dynamics** are the *run-time behaviour* that emerges when players engage those mechanics. You don’t write dynamics directly — they happen. A spawn timer plus a scoring rule *produces* the dynamic of rushing, hoarding, or turtling. Dynamics are where most "fun" (and most bugs in the fun) live.\n' +
'- **Aesthetics** are the *emotional responses* the dynamics evoke: tension, triumph, curiosity, camaraderie. This is what the player is actually here for — the felt experience, not the rules.\n\n' +
'The key insight: **the designer builds left-to-right (mechanics → dynamics → aesthetics), but the player experiences right-to-left.** A player feels an aesthetic (this is tense!), which came from a dynamic (every enemy might be the last hit I can take), which came from a mechanic (one-hit-kill rule). So when a playtester says "the middle is boring," they’re reporting an *aesthetic* failure — and your fix lives two layers down, in a *mechanic*. You can rarely patch a feeling directly; you tune a rule and watch the dynamic shift.\n\n' +
'This makes MDA a debugging tool, not just vocabulary. Decide the **target aesthetics** first (what should this game make people feel?), then ask which dynamics produce them, then design the smallest mechanics that yield those dynamics. That chain is also a scope filter: a mechanic that doesn’t serve a target aesthetic is a candidate to cut ([[b5-02]]). And it connects straight to story — the aesthetic you’re chasing is often the same feeling the narrative wants ([[a1-03]]).',
    task:
'Take a game you know well and fill in the MDA chain for **one** satisfying moment. Write: the **aesthetic** (the feeling — name it specifically, not just "fun"), the **dynamic** (the run-time behaviour that produced it), and the **mechanic(s)** (the authored rules underneath). Then do it backwards: pick one *mechanic* in that game and predict the dynamic and aesthetic it creates. Finally, name one **target aesthetic** for your own small game idea and the single mechanic you’d build first to chase it.',
    success: [
      'You can define mechanics, dynamics and aesthetics and give a distinct example of each.',
      'You can explain why designers build left-to-right but players experience right-to-left.',
      'You can trace a "boring" or "great" feeling down to the dynamic and the mechanic causing it.'
    ],
    skills: ['MDA decomposition', 'Aesthetic-first design', 'Diagnosing fun through layers'],
    simplified: 'MDA is one model among several (the "Elemental Tetrad," the "lenses," DDE). It is an excellent working frame for diagnosing fun, not a law — treat the three layers as a thinking tool.',
    goDeeper: 'The source is the short 2004 paper "MDA: A Formal Approach to Game Design and Game Research" by Hunicke, LeBlanc and Zubek — readable in an afternoon and worth reading in full.',
    quiz: [
      { q: 'A playtester says your game "feels grindy and joyless" late on. Which MDA layer is that feedback, and where do you fix it?', a: 'That is an *aesthetic* report (a feeling). You can rarely patch a feeling directly — you look at the *dynamic* causing it (e.g. reward pacing flattens out so effort stops paying off) and change a *mechanic* two layers down (reward rate, cost curve, new verb). Then re-test the feeling.' },
      { q: 'Why can’t a designer author dynamics the way they author mechanics?', a: 'Dynamics are emergent — they only appear when real players engage the mechanics at run time. You set the rules; the behaviour arises from them (and from how players actually play). That is why playtesting is essential: it is the only way to see your dynamics.' }
    ],
    tags: ['mda', 'mechanics', 'dynamics', 'aesthetics', 'theory of fun'] },
  {
    id: 'b1-02', title: 'Flow: matching challenge to skill', pillarId: 'B', phaseId: 'b1', moduleId: 'b1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'**Flow** is the state of absorbed, effortless focus — the "in the zone" feeling where time disappears and the player is neither bored nor stressed. It comes from psychologist Mihály Csíkszentmihályi, and for games it’s the single most useful model of *why* difficulty matters.\n\n' +
'The core idea is a balance between two rising quantities: the **challenge** the game presents and the **skill** the player has. Picture them on two axes.\n\n' +
'- Challenge **far above** skill → **anxiety**: the player is overwhelmed, fails repeatedly, quits.\n' +
'- Challenge **far below** skill → **boredom**: the player is unchallenged, disengages, quits.\n' +
'- Challenge **roughly matched** to skill → the **flow channel**: tense enough to demand attention, fair enough to feel winnable.\n\n' +
'The catch is that **skill rises as the player plays** — so a fixed difficulty slides them out of flow over time. A level that was a perfect challenge in minute one is trivial by minute thirty. So flow isn’t a setting; it’s a *moving target*. The designer’s job is to keep the challenge curve climbing *alongside* the skill curve — which is exactly what a difficulty curve ([[b2-04]]) and good pacing ([[c1-02]]) are for. You also widen the channel with **options**: difficulty settings, optional challenges, and assists let players self-select a challenge that matches their skill.\n\n' +
'Two practical levers keep players in flow. First, **clear goals and immediate feedback** — flow collapses if the player doesn’t know what to do or whether they’re succeeding ([[b0-05]]). Second, **the rubber band**: short controlled spikes (a hard room, a boss) followed by a release (a breather), so the average tracks the skill curve without flat-lining. Flow is felt as pacing, not just numbers — which is why it’s a level-design skill as much as a tuning one.',
    task:
'Map a game you play onto the flow channel. Sketch (on paper) the two-axis diagram — *challenge* vs *skill* — and plot **three moments**: one that felt like anxiety (too hard), one like boredom (too easy), and one in flow. For each, name what *moved* you out of or into the channel (a difficulty spike, a power-up that out-paced the challenge, a new mechanic). Then propose one concrete change to the boredom moment that would pull it back into flow *without* simply adding more enemies.',
    success: [
      'You can describe the flow channel and the anxiety/boredom failure modes on either side.',
      'You can explain why flow is a moving target, because player skill rises during play.',
      'You can name at least two levers (curve, options, clear goals/feedback) that hold a player in flow.'
    ],
    skills: ['Flow / challenge-skill balance', 'Reading difficulty as pacing', 'Designing for a moving skill curve'],
    simplified: 'The neat two-axis "flow channel" is a simplification of the fuller flow model (which lists several preconditions like clear goals, immediate feedback and a sense of control). It is the part most directly useful to game difficulty.',
    goDeeper: 'Csíkszentmihályi’s *Flow: The Psychology of Optimal Experience* is the primary source; Jenova Chen’s thesis and the game *Flow* apply it directly to dynamic difficulty.',
    quiz: [
      { q: 'Players love your tutorial but abandon level three in droves. In flow terms, what likely happened and how do you check?', a: 'Challenge probably jumped above the players’ skill — a difficulty spike pushed them into anxiety. Check by watching real players ([[b4-03]]): where exactly do they fail and rage-quit? The fix is to smooth the curve (teach the needed skill earlier, or soften the spike), not to make the whole game easier.' },
      { q: 'Why does a single fixed difficulty eventually fail to keep a player in flow?', a: 'Because the player’s skill rises as they play, while a fixed challenge stays put — so the gap widens into boredom. Flow needs the challenge curve to climb alongside the skill curve, via rising difficulty, new mechanics, or player-selectable options.' }
    ],
    tags: ['flow', 'difficulty', 'challenge', 'skill', 'pacing', 'theory of fun'] },
  {
    id: 'b1-03', title: 'Player motivation and player types', pillarId: 'B', phaseId: 'b1', moduleId: 'b1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'Different players want different things from the *same* game — and designing as if everyone wants what *you* want is a classic trap. A few models help you think about this without over-engineering it.\n\n' +
'The oldest is **Bartle’s taxonomy**, from multiplayer worlds: **Achievers** (chase goals, completion, mastery), **Explorers** (chase discovery and how the systems work), **Socialisers** (chase other people), and **Killers** (chase competition and acting *on* other players). It was built for MUDs, so it skews multiplayer — but the spirit generalises: a good game offers more than one reason to keep playing.\n\n' +
'A deeper, better-evidenced lens is **Self-Determination Theory**, which says intrinsic motivation rests on three needs: **competence** (I’m getting good at this), **autonomy** (these are *my* choices), and **relatedness** (I matter to others). Games are unusually good at all three — levelling up *is* competence; an open route *is* autonomy; a guild *is* relatedness. When a game feels hollow despite lots of content, one of these three is usually missing.\n\n' +
'The practical takeaways for a *small* game and a versatile dev:\n' +
'- **Players aren’t one type.** Most people are a blend, and the same person plays differently on different days. Treat these as *motivations to support*, not boxes to sort people into.\n' +
'- **You can’t serve everyone — so choose.** Scope discipline means picking a *primary* motivation to nail (say, mastery) and maybe one secondary, rather than half-serving all four ([[b5-02]]).\n' +
'- **This is the ethical fork too.** The same motivation knobs that make a game compelling can be twisted into compulsion — a line worth holding ([[b2-05]]).\n\n' +
'Knowing your target motivation also tells you *who to recruit as playtesters* and how to read their feedback ([[b4-03]]): an Achiever and an Explorer will complain about completely different things.',
    task:
'Pick a game with a clear audience and identify its **primary** player motivation (achievement, exploration, social, competition — or, in SDT terms, competence/autonomy/relatedness). Point to **two concrete features** that exist to serve that motivation. Then name a feature that serves a *different* motivation, and judge whether it strengthens the game or dilutes its focus. Finally, state the single primary motivation your own small game idea should target, and the one feature you’d build to serve it first.',
    success: [
      'You can name Bartle’s four types and the three SDT needs, and tell the two models apart.',
      'You can identify a game’s primary target motivation and the features that serve it.',
      'You can argue for picking a primary motivation rather than trying to serve all of them.'
    ],
    skills: ['Player-motivation models', 'Designing for a target audience', 'Motivation as a scope filter'],
    simplified: 'Bartle’s four types come from text MUDs and are a rough, much-debated taxonomy, not a validated personality test — useful as a design prompt, not as science. Self-Determination Theory is the better-evidenced model where you need rigour.',
    goDeeper: 'Richard Bartle’s original "Hearts, Clubs, Diamonds, Spades" essay for the taxonomy; Deci & Ryan for Self-Determination Theory; and Daniel Pink’s *Drive* for an accessible take on autonomy/mastery/purpose.',
    quiz: [
      { q: 'Why is "design for all four Bartle types" usually bad advice for a small student game?', a: 'Serving every motivation well takes huge breadth of content and systems — exactly the scope a small team lacks. Trying to please everyone tends to half-serve everyone. It is stronger to pick one primary motivation to nail and, at most, one secondary to support.' },
      { q: 'A game has tons of content but players say it feels "empty." How might Self-Determination Theory explain it?', a: 'One of competence, autonomy or relatedness is probably missing. Maybe progress doesn’t feel earned (no competence), choices don’t matter (no autonomy), or there’s no social meaning (no relatedness). More content won’t fix a missing need — the design has to restore the one that’s absent.' }
    ],
    tags: ['motivation', 'player types', 'bartle', 'self-determination', 'audience'] },
  {
    id: 'b1-04', title: 'Kinds of fun: the eight aesthetics of play', pillarId: 'B', phaseId: 'b1', moduleId: 'b1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'"Fun" is too blunt a word to design with. The MDA authors ([[b1-01]]) replaced it with **eight aesthetics** — eight distinct *kinds* of fun a game can deliver. Naming the one you’re chasing is far more useful than saying "make it fun."\n\n' +
'- **Sensation** — pleasure of the senses: art, sound, *game feel*, juice ([[b0-04]]).\n' +
'- **Fantasy** — make-believe; being someone or somewhere else.\n' +
'- **Narrative** — drama; the unfolding story ([[a0-04]]).\n' +
'- **Challenge** — obstacle courses; mastery and difficulty (the home of flow, [[b1-02]]).\n' +
'- **Fellowship** — the social frame: cooperation, community, shared play.\n' +
'- **Discovery** — exploring unknown territory, systems or secrets.\n' +
'- **Expression** — self-discovery; making something your own (builds, avatars, creative play).\n' +
'- **Submission** — pastime; the comfortable, almost meditative loop you sink into.\n\n' +
'Two things make this list a working tool rather than trivia. First, **a game blends a few of these, with a lead.** A puzzle game is mostly *Challenge* + *Discovery*; a co-op shooter is *Challenge* + *Fellowship* + *Sensation*; a cosy farming game is *Submission* + *Expression*. Identifying your **lead aesthetic** and one or two supports is a design decision, not a description — it tells you what to invest in and what to cut ([[b5-02]]). Second, it’s a **shared vocabulary** for the team: "we’re leaning on Discovery here, so don’t over-explain the map" aligns the level designer, the writer and the programmer on the same target.\n\n' +
'Beware the beginner instinct to chase *all eight*. That’s the over-scoping reflex in disguise — a small game that nails *two* aesthetics beats a sprawling one that gestures at all of them. Your lead aesthetic is also a natural seed for your design pillars ([[b3-02]]): the feeling you’re protecting when every other decision is up for debate.',
    task:
'List the eight aesthetics from memory (sensation, fantasy, narrative, challenge, fellowship, discovery, expression, submission), then **profile two different games** you know: for each, mark its **lead** aesthetic and one or two **supporting** ones, and write one sentence on a feature that delivers the lead. Then profile your own small game idea the same way — lead plus at most two supports — and name one aesthetic you’re deliberately *not* chasing (and why that’s a scoping win, not a loss).',
    success: [
      'You can list the eight aesthetics and give a one-line example of each.',
      'You can profile a real game as a blend with one clear lead aesthetic.',
      'You can choose a lead aesthetic for your own game and justify what you’re leaving out.'
    ],
    skills: ['The eight aesthetics', 'Identifying a lead aesthetic', 'Aesthetic focus as scope discipline'],
    simplified: 'These eight are MDA’s deliberately non-exhaustive starter list ("fun" broken into kinds), not a complete or scientific taxonomy of enjoyment. Use them to *name and aim*, not to file every game neatly into one slot.',
    goDeeper: 'The same MDA paper (Hunicke, LeBlanc, Zubek, 2004) introduces the eight aesthetics; for a richer catalogue of "what players enjoy," see the lenses in Jesse Schell’s *The Art of Game Design*.',
    quiz: [
      { q: 'Why is naming a "lead aesthetic" more useful than aiming to "make the game fun"?', a: '"Fun" gives you nothing to act on; a named aesthetic does. If your lead is Discovery, you invest in hidden systems and a readable-but-not-spoon-fed world and you cut things that don’t serve it. It turns a vague goal into design decisions — and into a shared target for the whole team.' },
      { q: 'How does the eight-aesthetics list reinforce scope discipline?', a: 'It exposes the over-scoping reflex of chasing every kind of fun at once. Committing to one lead and one or two supporting aesthetics — and consciously dropping the rest — concentrates a small team’s effort where it actually lands, which is how a small game punches above its weight.' }
    ],
    tags: ['aesthetics', 'kinds of fun', 'mda', 'lead aesthetic', 'scope'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
