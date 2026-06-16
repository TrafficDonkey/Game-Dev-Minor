/* Pillar A · Phase a1 · Module a1a — The interactive difference */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'a1-01', title: 'The interactive difference: agency meets authored intent', pillarId: 'A', phaseId: 'a1', moduleId: 'a1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'Everything you learned about story so far — structure, character, conflict, theme ([[a0-02]], [[a0-03]], [[a0-05]]) — still holds. But games add one ingredient no novel or film has: **the audience acts**. The player is not watching the protagonist; they *are* the protagonist, making choices the author cannot fully control. That single fact reshapes the whole craft.\n\n' +
'The tension at the heart of game narrative is between two forces:\n\n' +
'- **((Agency))** — the player’s real power to affect the world, choose a path, and feel that *their* actions caused what happened. Agency is the reason play feels alive. Strip it away and you have a movie with a controller taped on.\n' +
'- **Authored intent** — the meaning, arc and emotional beats *you* want the experience to land. Without it, the player wanders through systems with no shape, no climax, no point.\n\n' +
'These two pull against each other. Maximum agency (a pure sandbox) struggles to deliver an authored climax, because the player might never walk into it. Maximum authorship (a fixed cutscene chain) delivers your arc perfectly but makes the player a passenger, and players resent being benched in an interactive medium. Great game writing is **the negotiation between the two** — giving the player meaningful freedom *inside* a shape you designed.\n\n' +
'A useful idea here is the **illusion of agency**. Often the player only needs to *feel* their choices matter; the branches can quietly converge. A door that "you chose" to open, an NPC who remembers your name, a path you picked — these read as freedom even when the story funnels back to the same beat. That is not cheating; it is craft, and it is far cheaper than truly branching content (a scope lesson you will meet again in [[a1-05]]).\n\n' +
'The big reframe for the rest of this phase: as a game storyteller you author *possibility space and reaction*, not a fixed sequence of events. Your tools become the level, the systems and the player’s own behaviour — which is exactly why narrative is a seam shared with design ([[a5-01]]) and level design ([[c0-01]]), not a solo writing job.',
    task:
'Take one story moment from a game you know — a choice, a betrayal, a death, a reveal. Write a short analysis: (1) how much **real agency** the player had over it (none / cosmetic / branching / fully systemic), (2) what **authored intent** the designers protected no matter what the player did, and (3) whether the moment used the **illusion of agency** to feel free while staying on rails. Then rewrite the same beat for *more* player agency and note one new cost (more content, weaker climax, harder to test) that extra freedom would create.',
    success: [
      'You can state the agency-vs-authorship tension in your own words.',
      'You can spot when a game uses the illusion of agency rather than true branching.',
      'You can name a concrete cost that more player agency adds to a small project.'
    ],
    skills: ['Agency vs authorship', 'Illusion of agency', 'Reframing story as possibility space'],
    simplified: 'The agency-vs-authorship split is a working frame, not a strict binary — real games sit on a spectrum and mix both per scene. It is a lens for decisions, not a law.',
    goDeeper: 'For the foundational debate, look up writing on the "narrative paradox" in interactive storytelling, and listen to GDC narrative-design talks on balancing player freedom against authored emotional beats.',
    quiz: [
      { q: 'Why can’t a game just maximise player agency and call it good storytelling?', a: 'Because unlimited freedom makes an authored arc nearly impossible to deliver — the player may never reach your climax, never meet the character who carries the theme, never feel the build you designed. Some authorship is what gives the freedom shape and meaning; the craft is balancing the two, not maxing one out.' },
      { q: 'Is the "illusion of agency" dishonest design?', a: 'No — it is a legitimate and common technique. Players largely need to *feel* their choices mattered; convergent branches and reactive details (an NPC remembering your name, a path you picked) deliver that feeling at a fraction of the cost of fully branching content. The line you avoid is making choices feel hollow once players notice nothing changed.' }
    ],
    tags: ['agency', 'authorship', 'interactivity', 'narrative paradox', 'fundamentals'] },
  {
    id: 'a1-02', title: 'Environmental storytelling: the space tells the story', pillarId: 'A', phaseId: 'a1', moduleId: 'a1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    diagram: 'narrative',
    concept:
'The cheapest, most game-native way to tell a story is to **let the space say it**. ((Environmental storytelling)) is narrative carried by the *arrangement of the world itself* — props, layout, wear, light, what is present and what is missing — read by a player who is already looking, because looking is how they play.\n\n' +
'A barricaded door with claw marks on the inside. A child’s drawing pinned above a soldier’s bunk. Two skeletons sharing one bottle in a sealed vault. None of these use a single line of dialogue, yet each implies a whole scene — a siege, a father far from home, a last drink before the air ran out. The player *assembles* the story from clues, and a story you helped author yourself feels truer than one narrated at you. This is "show, don’t tell" made physical, which is why it pairs tightly with [[a1-04]].\n\n' +
'Why it matters for a versatile, scope-aware dev:\n\n' +
'- **It is cheap and durable.** Reusing props and set dressing to imply events costs a fraction of voiced cutscenes, and it never interrupts play.\n' +
'- **It is delivered by the level and 3D tracks, not just the writer.** The storyteller specifies the *beat* ("a hasty evacuation went wrong here"); the level designer composes the space; the modeller supplies the props and wear. This is the clearest seam in the whole course — it runs straight into level design ([[c0-03]]) and set dressing ([[c3-03]]).\n' +
'- **It respects agency.** The player discovers it on their own terms, in their own order, which keeps them the active reader rather than a passenger.\n\n' +
'Two principles keep it readable. First, **composition guides the eye** — the same sightlines a level designer uses for navigation ([[c1-02]]) point the player at the story prop. Second, **legibility over cleverness**: if a scene is so subtle nobody decodes it, it is decoration, not storytelling. Use a clear focal element, then layer subtler clues around it for the players who look harder. And never rely on colour alone to carry the meaning — a red-lit room reads as danger only if shape, props and context agree, since some players will not see the red.',
    task:
'Design **one environmental-story vignette** in a single room — no dialogue, no text. Write: the **beat** it implies in one sentence ("someone hid here and did not make it out"); a list of **5–8 specific props** and their placement/wear; the **focal element** the player sees first; and **two subtler clues** for attentive players. Then write one sentence each for the level designer (how the space frames it) and the 3D modeller (which prop needs custom modelling vs a reused kit piece) — practising the handoff, not just the idea.',
    success: [
      'Your vignette implies a clear story beat using only objects, placement and wear.',
      'You chose a focal element plus subtler layered clues, not one flat clutter pile.',
      'You can hand the beat to the level and 3D tracks as a concrete spec.'
    ],
    skills: ['Environmental storytelling', 'Story-through-props', 'Storyteller → level → 3D handoff'],
    goDeeper: 'The canonical talk is Harvey Smith and Matthias Worch’s GDC session "What Happened Here? Environmental Storytelling"; for the theory of player-assembled meaning, read about "embedded vs emergent" narrative.',
    quiz: [
      { q: 'Why is environmental storytelling often the highest-value narrative tool for a small team?', a: 'It is cheap, it never interrupts play, and it is delivered mostly by assets and level layout the team is already building — props, wear and composition rather than voiced cutscenes. It also respects agency, since the player discovers and assembles the story themselves, which makes it land harder for far less cost.' },
      { q: 'What makes an environmental vignette fail?', a: 'Either it is so subtle nobody reads it (decoration, not story), or it is so cluttered there is no focal point and the implied beat dissolves. Fix it with clear composition: one focal element the eye lands on first, then subtler clues layered around it — and never let colour alone carry the meaning.' }
    ],
    tags: ['environmental storytelling', 'set dressing', 'show dont tell', 'level seam', 'props'] },
  {
    id: 'a1-03', title: 'Ludonarrative harmony (and dissonance)', pillarId: 'A', phaseId: 'a1', moduleId: 'a1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A game says things twice: once through its **story** (cutscenes, dialogue, text) and once through its **mechanics** (what the rules let and make you do). ((Ludonarrative)) is the relationship between those two voices — *ludo* (play) plus *narrative* (story). When they say the same thing, you get **harmony**; when they contradict, you get **dissonance**.\n\n' +
'The classic dissonance example: a story insists the hero is a compassionate, reluctant figure, while the mechanics have them cheerfully gun down hundreds of people for hours. The player’s *hands* learn one truth ("I am a killing machine") while their *ears* are told another ("I am a good person"). The mechanics usually win, because players believe what they *do* over what they are *told* — that is the whole point of an interactive medium, and it links straight back to "theme through mechanics" ([[a0-05]]).\n\n' +
'Harmony is the goal: make the rules and the story argue for the same idea, so the player *experiences* the theme instead of being lectured. A game about isolation that mechanically strands you alone; a game about scarcity where every bullet genuinely hurts to spend; a game about trust that makes cooperation the only path through. When play and story reinforce each other, a small game punches far above its weight, because every system is quietly doing narrative work for free.\n\n' +
'Two honest caveats for a working dev:\n\n' +
'- **Perfect harmony is not always the aim.** Plenty of beloved games are happily dissonant — fun, escapist power fantasies where nobody minds that the body count contradicts the gentle protagonist. Dissonance is a *tool you might choose*, not always a bug. The sin is the *unintended* kind that breaks immersion you were trying to build.\n' +
'- **It is a team-wide check, not a writer’s problem.** Harmony is forged where design, story and level work meet ([[a5-01]]), so it belongs on every discipline’s radar. The practical move is to ask, of any core mechanic: *what does this action teach the player to believe?* — and make sure that belief matches the story you are telling.',
    task:
'Pick a game you know and find **one harmony** and **one dissonance** in it. For each, name the **mechanic** (what the rules make you do), the **story claim** (what the narrative asserts), and whether they agree. Then take your own small game idea, state its theme in a phrase, and audit your *core* mechanic: write the sentence "this action teaches the player that ___" and check it against the theme. If it contradicts, propose either a mechanic tweak or an honest reframe of the story.',
    success: [
      'You can define ludonarrative harmony and dissonance and give a real example of each.',
      'You can explain why players trust what they do over what they are told.',
      'You can audit a core mechanic by asking what belief the action teaches.'
    ],
    skills: ['Ludonarrative harmony', 'Mechanic ⇄ theme audit', 'Diagnosing dissonance'],
    simplified: 'The term entered wide use from a single influential critique and now gets stretched to cover many things. Treat it as a practical lens — "do play and story agree?" — rather than a precise academic measure.',
    goDeeper: 'The phrase was popularised by Clint Hocking’s 2007 critique of a major shooter; from there, follow writing and GDC talks on "mechanics as metaphor" and theme through systems.',
    quiz: [
      { q: 'Why does a contradiction between mechanics and story usually resolve in favour of the mechanics?', a: 'Because games are interactive: the player *does* the mechanics for hours, so those actions become the experienced truth, while told story is comparatively passive. People believe what they repeatedly do over what a cutscene claims — so when the two disagree, the mechanics define how the game actually feels.' },
      { q: 'Is ludonarrative dissonance always a flaw to fix?', a: 'No. Many enjoyable games are deliberately dissonant — light power fantasies where the contradiction simply does not bother anyone. The problem case is *unintended* dissonance that undercuts a tone or theme you were genuinely trying to build. Harmony is a tool to reach for when meaning matters, not a universal rule.' }
    ],
    tags: ['ludonarrative', 'harmony', 'dissonance', 'mechanics', 'theme'] },
  {
    id: 'a1-04', title: 'Show, don’t tell — in a playable medium', pillarId: 'A', phaseId: 'a1', moduleId: 'a1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    concept:
'"Show, don’t tell" is old screenwriting advice — *dramatise* information rather than *state* it. Games take it furthest of any medium, because they add a third, stronger rung: **don’t show, let the player do**. The ladder of narrative delivery, from weakest to strongest, runs roughly:\n\n' +
'- **Tell** — text or narration states a fact ("the kingdom fell to plague"). Cheapest, lowest impact, easy to skip.\n' +
'- **Show** — the player witnesses it (a cutscene of the plague, bodies in the streets). More vivid, but the player is still watching.\n' +
'- **Do / experience** — the player *acts inside* the truth: they ration medicine, choose who to save, feel the streets empty out as they play. Strongest, most memorable, most game-native.\n\n' +
'The lesson for an interactive storyteller is to **push delivery down that ladder as far as scope allows**. A wall of opening text dumping lore is the weakest possible choice; the same information leaks more powerfully through environmental beats ([[a1-02]]), an NPC’s offhand reaction, or a mechanic that makes you *feel* the stakes ([[a1-03]]). When you must tell, tell briefly and late, *while* the player acts — reveal the world as they move through it, not in a static prologue.\n\n' +
'This is also where the seam to **game feel** shows up: a hit that *thuds*, an enemy that staggers, a door that groans open all "show" through feedback the player triggers themselves ([[b0-04]]). The most efficient game story is often invisible as "writing" — it lives in props, reactions, audio and the consequences of actions.\n\n' +
'Two cautions. First, **doing is expensive** — a fully experiential beat can cost far more than a line of text, so spend it on the moments that matter and tell the small stuff. Scope discipline applies to delivery method, not just content. Second, **don’t make it a guessing game**: showing must still be *legible*. If players consistently miss the point, add a light, well-timed tell. The craft is choosing the lowest rung that still lands clearly for the budget you have.',
    task:
'Find one moment in a game (or a film) that **tells** something it could have **shown** or let you **do** — clunky exposition, a lore dump, a "as you know" speech. Rewrite it twice: once as a **show** (a scene or environmental beat, no narration) and once as a **do** (a mechanic or player action that makes them feel it). Then judge honestly: which rung is worth the cost here, and where a short **tell** would actually be the smart, cheap choice. The goal is to wield the whole ladder, not to always climb to the top.',
    success: [
      'You can rank tell / show / do by impact and by cost.',
      'You can rewrite an exposition dump as a shown or played beat.',
      'You can argue when a plain *tell* is the right, scope-aware choice.'
    ],
    skills: ['Tell / show / do ladder', 'Cutting exposition', 'Delivery-method scoping'],
    goDeeper: 'For the principle’s roots, any solid screenwriting craft book covers "show, don’t tell"; for the game-specific extension into *doing*, study how narrative designers talk about "experiential" storytelling and the cost trade-offs in postmortem talks.',
    quiz: [
      { q: 'What does games add to "show, don’t tell" that film cannot?', a: 'A third, stronger rung: *do*. Beyond witnessing an event, the player can act inside it — ration the medicine, choose who to save, feel the consequence of their own input. Experiencing a truth through play lands harder and is more memorable than either being told it or watching it happen.' },
      { q: 'If "do" is the strongest delivery, why not make every beat experiential?', a: 'Because doing is the most expensive to build, and not every beat deserves that budget. Smart delivery spends the experiential, high-cost treatment on the moments that matter most and tells or shows the small stuff. A brief, well-placed tell is sometimes the correct, scope-aware call — the craft is the lowest rung that still reads clearly.' }
    ],
    tags: ['show dont tell', 'exposition', 'narrative delivery', 'game feel', 'scope'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
