/* Pillar A · Phase a4 · Module a4a — The D&D gym */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'a4-01', title: 'Why D&D is a storytelling gym', pillarId: 'A', phaseId: 'a4', moduleId: 'a4a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    diagram: 'narrative',
    concept:
'Your class plays Dungeons & Dragons — so treat it as a *gym*, not a hobby. Tabletop roleplaying is the cheapest, fastest reps you will ever get at the exact skills game narrative demands, and the feedback is instant: you watch real humans react to your story in real time, with no engine, no build, and no four-week wait to test a level.\n\n' +
'Here is why it transfers so well. A tabletop game is an **interactive narrative under live constraints** — the same constraints a game has. Players have ((agency)): they do things you did not plan for, and the story has to absorb it. That is the central problem of game writing ([[a1-01]]), and at the table you face it every single session instead of once a milestone. You also practise **reacting to choice** (the seam to [[a4-04]]), **dramatic pacing** (the DM job that maps onto level pacing — [[c1-02]]), **character voice** for a cast you have to play solo ([[a4-03]]), and **worldbuilding that only reveals what the players touch** ([[a2-04]]), which is scope discipline in its purest form.\n\n' +
'The deeper lesson is structural. As Dungeon Master you are simultaneously the **writer**, the **level designer** (you describe and gate the space), the **systems referee** (the rules adjudicate outcomes), and the **AI** (you puppet every NPC). That is *the whole five-role pipeline* compressed into one chair — which is precisely the versatile, solo-capable dev this headstart is aiming you at. A DM who can improvise a believable tavern, pace a dungeon, and turn a player’s dumb plan into a better story is exercising muscles a narrative designer bills for.\n\n' +
'One honest caveat: a table is not a shipped game. Your players forgive rough edges, fill gaps with imagination, and never see your prep. A game has none of that grace — it must hold up cold, for strangers, forever. So D&D is the *training* medium, not the *target* medium. Use it to build instincts fast, then learn where those instincts must be tightened for a product that ships without you in the room.',
    task:
'Recall (or play) one D&D session — yours or any actual-play you have watched. List the **five hats** the DM wore in that session: one concrete moment where they acted as *writer*, *level designer*, *systems referee*, *NPC/AI*, and *pacer*. Then write two sentences on the single biggest difference between that table’s story holding up and the same story having to hold up in a shipped game with no DM present.',
    success: [
      'You can name at least four narrative-design skills D&D drills directly.',
      'You can explain how the DM role compresses the five-track pipeline into one seat.',
      'You can state, honestly, where table-tested story differs from a shipped game.'
    ],
    skills: ['D&D as deliberate practice', 'Mapping the DM to the five roles', 'Training vs target medium'],
    goDeeper: 'The official *Dungeon Master’s Guide* (any recent edition) is the canonical craft reference; for the "GM as designer" framing, look at indie GM-advice writing and any "running the game" talk series by experienced DMs.',
    quiz: [
      { q: 'In what sense is a tabletop session "the same problem" as game writing?', a: 'Both are interactive narratives where the audience acts: players exercise agency and take actions you did not script, so the story has to absorb and respond to choice rather than simply be delivered. D&D just lets you rehearse that problem every session instead of once per milestone.' },
      { q: 'Why is it a mistake to treat your D&D table as proof a game story works?', a: 'Players at a table forgive rough edges, fill gaps with imagination, and never see your prep, and a live DM patches problems on the fly. A shipped game has none of that grace — it must hold up cold for strangers with no one in the room to save it.' }
    ],
    tags: ['d&d', 'tabletop', 'deliberate practice', 'narrative', 'fundamentals'] },
  {
    id: 'a4-02', title: 'The DM’s craft: running a scene and dramatic pacing', pillarId: 'A', phaseId: 'a4', moduleId: 'a4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A Dungeon Master’s real job is not knowing the rules — it is **running a scene** so it has shape and momentum. Master that and you are practising the same pacing craft a level designer uses on a corridor and a designer uses on a session ([[c1-02]], [[b0-03]]).\n\n' +
'Think of a session as a string of scenes, each with a **purpose** and an **exit**. A scene exists to do one job — reveal a clue, force a choice, deliver a fight, breathe after danger — and it should *end* the moment that job is done. New DMs let scenes sag: the negotiation that resolved three minutes ago keeps going, the empty rooms get described in full. The fix is the same as a flat escalation in story structure ([[a0-02]]) — cut to the next beat. "Smash cut" is a legitimate, powerful DM move.\n\n' +
'Pacing at the table runs on **tension and release**. You raise tension with a ticking threat, a dwindling resource, an enemy at the door; you release it with a quiet moment, a win, a joke. A session that is all tension exhausts players; one that is all release bores them. The rhythm is a wave, not a ramp — exactly the curve a level wants ([[c1-02]]). A handy tool is the **soft and hard move**: a *soft* move warns ("you hear armour clanking closer"), giving the players a chance to act; a *hard* move delivers the consequence if they do not. Telegraph, then pay off.\n\n' +
'Two concrete techniques worth stealing for any game. First, **spotlight management**: every player should get a moment where their character matters, the way a good level gives each mechanic its showcase. Second, **the strong open and the clean cut** — start a scene *in media res*, in the middle of the action ("the door bursts open as you’re mid-sentence"), and leave before it drains. Over-prepared DMs script every line and choke when players go sideways; the skill is to prep *situations and stakes*, not a screenplay, then run them responsively. That is also why over-scoping your prep fails — you only ever play the rooms the players walk into ([[a2-04]]).',
    task:
'Take a scene — from a past session or invented — and write a **one-line scene card** for it: its *purpose* (the one job it does), its *exit* (what ends it), and one *soft move* plus one *hard move* you could use to raise tension. Then describe how you would open it *in media res* in a single sentence. Finally, name the moment you would "smash cut" away, so the scene does not overstay.',
    success: [
      'You can state a scene’s single purpose and its exit condition.',
      'You can give a soft move and a hard move that escalate the same threat.',
      'You can explain why DM pacing is the same skill as level and session pacing.'
    ],
    skills: ['Running a scene', 'Tension/release pacing', 'Soft vs hard moves', 'Spotlight management'],
    simplified: 'The soft-move / hard-move language comes from the Powered-by-the-Apocalypse / Dungeon-World family of games; classic D&D does not use those exact terms, but the telegraph-then-pay-off principle is universal.',
    goDeeper: 'For pacing and "moves", read about the GM principles in *Dungeon World*; for scene economy, any screenwriting book on entering late and leaving early (e.g. McKee on scene turning points) maps directly onto running a table.',
    quiz: [
      { q: 'A negotiation scene resolved two minutes ago but is still going. What’s the DM craft fix?', a: 'Cut. A scene should end when its job is done — the deal is struck, so smash-cut to the next beat. Letting a resolved scene run is the table version of a flat middle: it kills momentum even though nothing is technically wrong.' },
      { q: 'What is the difference between a soft move and a hard move, and why telegraph?', a: 'A soft move warns of a coming threat and gives players a chance to react ("you hear the trap mechanism click"); a hard move delivers the consequence if they don’t. Telegraphing makes outcomes feel fair and earned rather than arbitrary, which keeps tension productive instead of punishing.' }
    ],
    tags: ['dm craft', 'pacing', 'scenes', 'tension', 'moves'] },
  {
    id: 'a4-03', title: 'Character voice and improvisation', pillarId: 'A', phaseId: 'a4', moduleId: 'a4a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 25,
    diagram: 'narrative',
    concept:
'As DM you puppet an entire cast solo, on demand, with no script — which is the best **character-voice** drill in existence, and the exact skill that fills a game with believable NPCs ([[a0-03]], [[a3-01]]). The trick is that a memorable NPC is not a backstory; it is a **want plus a voice**, deliverable in three lines.\n\n' +
'Give every NPC two handles you can grab instantly. First, a **want** — what this person is trying to get in this scene (information, money, to be left alone, to impress you). The want drives every line, so you are never stuck for what they say. Second, a **distinguishing tag** — one vocal or behavioural quirk that makes them *sound* different from the last NPC: a verbal tic, a clipped rhythm, a posture, a thing they always reference. One tag, played consistently, reads as a whole character; pile on five and you forget them all. This is the same character economy a small game needs ([[a0-03]]) — one or two figures with real interiority beat a crowd of names.\n\n' +
'Improvisation is the engine underneath, and it runs on one principle from improv theatre: **"yes, and"** — accept what the table offers and build on it rather than blocking it ([[a4-04]]). When a player asks "is the bartender nervous?", the boring answer is "no". The generative answer is "yes — and he keeps glancing at the back door". You just made a plot out of a throwaway question. Improv also teaches you to **make offers** (hand the players something to react to) and to **fail forward** — never let an NPC interaction dead-end.\n\n' +
'For games the payoff is direct. When you sit down to write barks, a quest-giver, or a companion ([[a3-01]]), you will already have a library of voices in your head and a reflex for generating dialogue that *characterises* instead of just informing. The honest limit: improvised table voice is loose and forgiving; shipped dialogue must be tight, edited and consistent across a hundred lines. Improv builds the *instinct*; the writing craft tightens it.',
    task:
'Build and run a tiny NPC roster, out loud, solo. Invent three NPCs, give each a one-line *want* and a one-word *tag*, then improvise a short scene where a player approaches each one — speaking the lines aloud and staying in each voice. Record yourself or just do it in a room alone. Afterwards, write down which tag made the strongest voice and which want generated dialogue most easily.',
    steps: [
      'Make a 3-row table. Columns: *Name*, *Want* (one line: what they want in this scene), *Tag* (one word: a vocal or behavioural quirk).',
      'Fill it fast, in under two minutes — e.g. "Bram / wants you gone before his boss returns / twitchy", "Sela / wants to sell you a fake map / overfamiliar", "The Warden / wants a confession / slow".',
      'Pick a single situation that touches all three (you enter a frontier outpost asking about a missing caravan).',
      'Improvise *aloud*: voice each NPC reacting to the player, driven only by their want, coloured only by their tag. Speak in first person as the NPC.',
      'Force one "yes, and" per NPC: take whatever the imagined player says and build on it instead of shutting it down ([[a4-04]]).',
      'When an NPC has nothing left to want, end their bit — do not let it dribble (the scene-exit rule from [[a4-02]]).',
      'Debrief on paper: which *tag* produced the most distinct voice? Which *want* made lines easiest to generate? That is your evidence for "want + tag" over backstory.'
    ],
    success: [
      'You can voice three distinct NPCs back-to-back without them blurring together.',
      'Each NPC’s dialogue is visibly driven by a clear want, not exposition.',
      'You used "yes, and" to turn a player offer into new story at least once.'
    ],
    skills: ['Character voice on demand', 'Want + tag NPC design', 'Improv "yes, and"', 'Fail-forward dialogue'],
    simplified: 'Doing this aloud and solo feels awkward and that is fine — the awkwardness is the rep. A real table gives you live reactions this drill cannot, so treat it as shadow-boxing, not the match.',
    goDeeper: 'Keith Johnstone’s *Impro* is the foundational text on offers, blocking and status; for NPC voice specifically, study how a narrative game gives a minor character a memorable voice in only a handful of lines.',
    quiz: [
      { q: 'Why is "want + one tag" better than a full backstory for an NPC you have to voice live?', a: 'The want tells you what every line is trying to achieve, so you are never stuck for what the character says, and a single consistent tag makes them sound distinct without overload. Backstory is invisible to the player in the moment and gives you nothing to perform; want and tag are immediately playable.' },
      { q: 'A player asks an unplanned question about an NPC. How does "yes, and" turn that into an asset?', a: 'Instead of blocking with "no", you accept the premise and add to it — "yes, and here’s a consequence" — which converts a throwaway question into new plot. It keeps the fiction generative and teaches the reflex of building on player input rather than defending a script.' }
    ],
    tags: ['character voice', 'improvisation', 'npc', 'yes and', 'dialogue'] },
  {
    id: 'a4-04', title: 'Reacting to player choice: "yes, and", fail-forward', pillarId: 'A', phaseId: 'a4', moduleId: 'a4a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    diagram: 'narrative',
    concept:
'The hardest, most transferable DM skill is **reacting to choice** — absorbing what players actually do and turning it into story, instead of railroading them back onto your plan. This is the live, table-speed version of the central tension in all game narrative: ((agency)) versus authored intent ([[a1-07]]). Two principles carry most of the weight.\n\n' +
'**"Yes, and"** (from improv) means: accept the player’s contribution and build on it. Its enemies are *blocking* ("no, that doesn’t work") and the slightly subtler *"yes, but"* that technically allows the action while killing its momentum. "Yes, and" does not mean players always succeed — it means their *input is accepted into the fiction* and pushes it forward. A relative, **"no, and"**, is sometimes right too: the action fails *and* something new complicates it, so even a refusal generates story rather than a dead stop.\n\n' +
'**Fail-forward** is the rule that *failure must still move the story*. A locked door the party can’t pick should never end the adventure — failure means they get in but loudly (now there are guards), or the lock breaks and the key’s gone, or they find another way at a cost. In game terms this is the same instinct as designing failure states that teach or branch rather than just punish ([[b2-05]]) — a dead end is bad design at the table and in a level.\n\n' +
'The deepest version is the **illusion of agency**: skilled DMs let players feel their choices reshape the world while quietly keeping the experience coherent — the prepared dungeon can appear behind whichever door they pick. That is not a cheat; it is the same honest sleight every linear-but-reactive game uses to honour agency on a budget ([[a1-05]]), and it is the cheapest way to make choice *feel* real without authoring every branch (scope discipline, again — [[a2-04]]). The caveat: players sense a railroad when their choices are *visibly* erased, so the art is reacting genuinely to the *choices that matter* while flexing on the ones that don’t. Practise this at the table and you will write reactive game moments that respect the player without exploding your scope.',
    task:
'Write three "blocking" DM responses to plausible player actions (each a flat "no, that fails / that’s not possible"). Then rewrite each one as a **"yes, and"**, a **"no, and"**, *or* a **fail-forward** so the story moves regardless of the dice. Finally, in two sentences, give one example of the *illusion of agency* (a choice you’d let the player feel without authoring a real branch) and one example of a choice that genuinely *must* branch — and explain how you’d tell the two apart.',
    success: [
      'You can rewrite a blocking "no" into a response that keeps the fiction moving.',
      'You can design a failure that advances the story instead of dead-ending it.',
      'You can distinguish choices that must truly branch from ones the illusion of agency can cover.'
    ],
    skills: ['Yes-and / no-and reactions', 'Fail-forward design', 'Illusion of agency', 'Agency vs scope'],
    simplified: 'The "illusion of agency" is a deliberately blunt framing of a subtle craft; done badly it becomes railroading, done well it is honest reactivity on a budget. Knowing the difference is judgement that only reps build.',
    goDeeper: 'For fail-forward and reacting to choice, look at GM advice in the *Dungeon World* and indie-RPG tradition; for the game-design parallel, revisit writing on meaningful choice and the agency-vs-authorship debate around branching narrative games.',
    quiz: [
      { q: 'The party fails to pick a critical lock and there is no other way in. What does fail-forward do here?', a: 'It refuses the dead end: failure still advances the story but at a cost — they get in but trigger an alarm, the lock breaks and the key is lost, or a noisier route opens. The plot never stalls on a single failed roll; failure changes the situation instead of ending it.' },
      { q: 'How is the DM’s "illusion of agency" connected to scope in a real game?', a: 'It lets players feel their choices matter without the author paying to build every branch — the prepared content appears behind whichever door is chosen. That is the same budget-conscious reactivity branching games use; you author the choices that truly matter and use the illusion to honour the rest.' }
    ],
    tags: ['player choice', 'yes and', 'fail forward', 'agency', 'railroading'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
