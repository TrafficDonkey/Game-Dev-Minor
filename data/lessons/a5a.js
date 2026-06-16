/* Pillar A · Phase a5 · Module a5a — The seam to design */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'a5-01', title: 'Integrating story with mechanics', pillarId: 'A', phaseId: 'a5', moduleId: 'a5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'This is the seam the whole Storytelling pillar has been building toward: making the **story** and the **mechanics** say the same thing. When they agree, the player *feels* the meaning instead of being told it — the harmony you met as ((ludonarrative)) harmony ([[a1-03]]). When they disagree, the play undermines the prose. The fix is not "write better cutscenes"; it is to design so the two are aimed at one target from the start.\n\n' +
'A practical way to find that target is to **align the want with the verb**. A character’s external want ([[a0-03]]) should point the same direction as the game’s core loop ([[b0-02]]) — the thing the player actually *does* every minute. If the protagonist wants to escape and the loop is "explore, find a key, open a door", want and verb pull together. If the loop is "shoot waves of enemies" while the story insists this is a peaceful soul, you have dissonance, and players notice even if they can’t name it.\n\n' +
'Three reliable techniques, cheapest first:\n' +
'- **Theme through mechanics.** Let a rule *enact* the idea ([[a0-05]]) — a game about scarcity makes resources genuinely scarce; a game about trust makes you depend on an NPC. This is the storyteller’s biggest advantage over film: the player lives the premise.\n' +
'- **Reskin, don’t bolt on.** Often the mechanic exists and the story is a *frame* around it. A timer becomes "the tide is coming in"; a health bar becomes "your oxygen". Same system, but now it carries fiction at near-zero extra cost — and that is scope discipline applied to narrative.\n' +
'- **Mechanics as characterisation.** What the player *can* and *can’t* do says who they are. A character who cannot jump, only trudge, reads as heavy and tired without one line of dialogue.\n\n' +
'Watch the trap of the **"narrative wrapper"**: a story stapled over a loop it doesn’t touch, where you could swap the plot for any other and the game would play identically. That’s a sign the integration is only skin-deep. The goal is for someone to be unable to remove the story without changing how the game *plays*. The designer owns the loop, you own the meaning — and this lesson is where you two agree on one thing the game is about, then make both the rules and the words serve it.',
    task:
'Take one game you know well and one small idea of your own. For the known game, name its **core loop in one verb-phrase** and its **theme/protagonist want in one phrase**, then judge: do they harmonise, or is the story a removable *wrapper*? For your own idea, pick a single mechanic and apply each of the three techniques to it — write one line where the mechanic *enacts* the theme, one line where you *reskin* an existing system to carry fiction, and one line where what the player *can’t do* characterises them. Keep it to half a page.',
    success: [
      'You can state a game’s core loop and its theme/want and say whether they harmonise or clash.',
      'You can show a mechanic enacting a theme rather than a story merely sitting on top of it.',
      'You can spot a "narrative wrapper" — a story you could swap out without changing the play.'
    ],
    skills: ['Aligning want with verb', 'Theme through mechanics', 'Reskinning vs bolting on', 'Spotting narrative wrappers'],
    simplified: 'Real projects rarely get perfect harmony on every system — you pick a few load-bearing mechanics to carry the theme and let the rest be neutral. Total alignment is the ideal, not a delivery requirement.',
    goDeeper: 'Look up talks and writing on ludonarrative resonance and "mechanics as metaphor" (e.g. designers who speak about meaning emerging from rules); the MDA framework ([[b1-01]]) gives you the vocabulary to argue about it precisely.',
    quiz: [
      { q: 'A teammate says "the story and the gameplay don’t fit". Reframed as the seam, what’s the cheapest first thing to check?', a: 'Whether the protagonist’s *want* points the same way as the *core loop* (the verb the player does every minute). If the want is "escape" but the loop is "fight endless waves", they pull apart. Often you can realign by reskinning the loop or re-stating the want, before writing any new content.' },
      { q: 'What is a "narrative wrapper", and why is it a warning sign?', a: 'A story stapled over a loop it doesn’t actually touch — you could swap the plot for a completely different one and the game would play identically. It signals shallow integration: the fiction isn’t carried by the rules, so the player experiences play and story as two separate things instead of one.' },
      { q: 'Give an example of a mechanic *characterising* the player without dialogue.', a: 'Limiting what the player can do: a protagonist who can only trudge slowly and cannot jump reads as heavy, tired or burdened; one who can wall-run and dash reads as agile and confident. The verb-set is characterisation — the player learns who they are by what the rules let them do.' }
    ],
    tags: ['integration', 'mechanics', 'theme', 'ludonarrative', 'core loop', 'seam'] },
  {
    id: 'a5-02', title: 'Narrative delivery: how players actually receive story', pillarId: 'A', phaseId: 'a5', moduleId: 'a5a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'Story doesn’t reach the player by magic — it arrives through specific **delivery channels**, and each has a different cost, a different feel, and a different risk of being skipped. Choosing channels well is a design decision, not a writing one, and it is where the storyteller hands off to the level, design and code tracks.\n\n' +
'The common channels, roughly cheapest to most expensive:\n' +
'- **Environmental** — the space itself tells it: a ruined room, a scrawled note, a body where it fell ([[a1-02]], [[c0-03]]). Cheap, unskippable-ish, and it respects the player; it is *show, don’t tell* in physical form ([[a1-04]]).\n' +
'- **Systemic / emergent** — the story the rules produce in play ([[a1-06]]): a desperate last stand, a comeback, a betrayal in a multiplayer match. Costs almost nothing to author and is uniquely the player’s.\n' +
'- **Ambient / "barks"** — short spoken or text lines triggered by events ("Reloading!", "I heard something"). Cheap, reinforce character and state, easy to over-repeat.\n' +
'- **In-world readables & logs** — notes, terminals, codex entries ([[a3-02]]). Cheap and optional, but easy to over-stuff; most players skim them.\n' +
'- **Interactive dialogue** — conversations, sometimes branching ([[a3-01]]). Medium-to-expensive (every branch multiplies the writing), high agency.\n' +
'- **Cutscenes** — scripted, often non-interactive. The most expensive and the most skipped; they pause the verb, so use them sparingly and short.\n\n' +
'Two principles cut through the menu. First, **diegetic beats non-diegetic** when you can manage it: a story delivered *inside* the world (a sign, an overheard line, a UI that exists in the fiction) keeps the player present, where a stack of menus and lore dumps pushes them out. Second, **respect the channel of attention**: a player mid-combat will not read a paragraph, so don’t deliver plot there — that’s the seam to pacing ([[b0-05]]) and to ((game feel)) ([[b0-04]]). Put quiet story in quiet moments.\n\n' +
'For a small team this is also pure scope discipline: leaning on the *cheap, unskippable, diegetic* end (environment, systems, barks, reskinned UI) often delivers more felt story than an expensive cutscene the player skips. Pick the lightest channel that lands the beat — and always assume some players will skip everything optional, so the *essential* story must survive on the channels they can’t avoid.',
    task:
'List six story beats you’d want in a small game (one sentence each — e.g. "the town was abandoned in a hurry", "your guide doesn’t trust you yet"). For each beat, assign the **cheapest delivery channel that would still land it** from the list above, and mark whether it’s **diegetic** or not and whether a player could **skip** it. Then audit: if every skippable beat were skipped, does the *essential* spine of your story still come through? Rewrite any essential beat that currently lives on a skippable channel.',
    success: [
      'You can name the main delivery channels and rank them by rough authoring cost.',
      'You can match a beat to the cheapest channel that still lands it, and say if it’s diegetic or skippable.',
      'You can guarantee the essential story survives even if all optional content is skipped.'
    ],
    skills: ['Choosing delivery channels', 'Diegetic vs non-diegetic', 'Costing narrative delivery', 'Skip-proofing the spine'],
    simplified: '"Cheapest to most expensive" is a rough ordering for a small team and bends with your tools and talent — a studio with a writers’ room and voice actors weighs these differently. Treat it as a default, not a law.',
    goDeeper: 'For the diegetic/non-diegetic distinction and unskippable environmental delivery, study how immersive-sim and survival-horror designers talk about audio logs, environmental notes and "show, don’t tell"; the term ((diegetic)) comes from film theory and is worth reading on directly.',
    quiz: [
      { q: 'Why is environmental storytelling often the best *value* channel for a small team?', a: 'It is cheap to author (a prop placement, a note, a changed room), hard to fully skip because it’s in the player’s path, and diegetic — it keeps the player inside the world rather than pausing the game for a cutscene. It also leans on the level and 3D tracks you already have, so it spreads the cost across roles.' },
      { q: 'What does "diegetic beats non-diegetic" mean for delivery, and why?', a: 'Prefer delivering story *inside* the fiction (a sign, an overheard line, a UI that exists in the world) over delivering it through out-of-world devices (menus, lore screens, narrator text). Diegetic delivery keeps the player immersed and present; non-diegetic delivery pulls them out of the experience to "read the game".' },
      { q: 'You must convey one essential plot point, but your only plan is an optional codex entry. What’s the risk and the fix?', a: 'Most players skim or skip optional readables, so an essential beat parked there will be missed by many. Move it to an unavoidable channel — an environmental beat on the critical path, a scripted bark, a short forced moment — and reserve the codex for enrichment that’s fine to miss.' }
    ],
    tags: ['delivery', 'diegetic', 'environmental', 'cutscenes', 'scope', 'pacing'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
