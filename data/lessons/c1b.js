/* Pillar C · Phase c1 · Module c1b — Guidance */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c1-04', title: 'Guiding the player without hand-holding', pillarId: 'C', phaseId: 'c1', moduleId: 'c1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'A level has to answer one question over and over: *where do I go?* Answer it badly and the player wanders, frustrated; answer it too loudly — a giant glowing arrow, a "GO HERE" marker — and you rob them of the satisfaction of *figuring it out*. The level designer’s craft is the middle path: lead the player so reliably that they feel clever, never herded. This is sometimes called **soft guidance** or *((leading the eye))*.\n\n' +
'The toolkit is mostly environmental, and most of it costs nothing extra to build:\n' +
'- **Light** is the strongest pull there is. Players move toward brightness and away from dark — a lit doorway in a gloomy room reads as "this way" before you’ve consciously decided. This is the direct seam to light and mood ([[c3-01]]).\n' +
'- **Lines and composition** funnel the eye: a railing, a row of pillars, a road, a fallen beam all point somewhere. You blocked these sightlines out in grey already ([[c1-03]]).\n' +
'- **Colour and contrast** flag the interactive — the one red door in a grey corridor, the yellow ledge you can climb. This *must* carry a second cue (shape, position, a worn texture) so colour-blind players aren’t lost; never let colour be the only signal.\n' +
'- **Motion and sound** grab attention hard: a flickering light, a fluttering banner, distant noise. Use sparingly — everything that moves competes.\n' +
'- **Landmarks** orient over distance: a tower, a mountain, a crashed ship visible from far away gives the player a constant "I’m heading there" anchor.\n\n' +
'The mindset is **breadcrumbs, not rails**. Place several weak cues that *agree* rather than one heavy-handed marker. When they reinforce each other — a lit doorway, at the end of a line of pillars, under a distant landmark — the player flows toward it without ever feeling told. And always run the inverse check: make the *wrong* paths quietly less inviting (darker, dead-ended, visually closed) so the right one wins by contrast. This is readability applied to space, the level-design cousin of the game-feel readability the designer worries about ([[b0-05]]).',
    task:
'Pick a real level you can replay (or a clear memory of one) and walk its first five minutes as a *guidance audit*. List every cue the designer used to tell you where to go — light, lines, colour, motion, sound, landmarks — and label each one **soft** (environmental, you barely noticed) or **hard** (an explicit marker/arrow/objective text). Then find one spot where you got lost or hesitated, and propose a *soft* fix (a light, a leading line, a landmark) that would have guided you without adding a single UI marker.',
    success: [
      'You can name at least four environmental guidance tools and how each pulls the eye.',
      'You can tell soft (environmental) guidance from hard (UI/marker) guidance in a real level.',
      'You can propose a soft fix for a confusing spot instead of reaching for an objective marker.',
      'You remember that colour cues need a redundant signal for colour-blind players.'
    ],
    skills: ['Soft guidance / leading the eye', 'Using light and composition to direct', 'Readability of space', 'Accessible cueing'],
    simplified: 'Which cue dominates is contextual: in a bright outdoor scene a landmark or leading line may beat light, while in a dark interior light wins. Treat the list as tools to combine and test, not a fixed ranking.',
    goDeeper: 'Search GDC talks on "player guidance" and level-design breakdowns of games known for marker-free navigation; many studios publish post-mortems on how they lead players with light and composition rather than HUD markers.',
    quiz: [
      { q: 'Why is a single bright objective marker often a worse solution than several environmental cues?', a: 'A hard marker does the thinking for the player, so the space stops teaching them to read it and the moment of "I worked it out" is lost. Several weak, agreeing cues (light, a leading line, a landmark) guide just as reliably while keeping the player feeling clever and the world feeling real.' },
      { q: 'You use a glowing colour to mark every climbable ledge. What accessibility problem does this create and how do you fix it?', a: 'If colour is the only signal, colour-blind players (and anyone in a low-contrast scene) can miss it. Add a redundant cue: a consistent shape, worn or chalked texture, position, or a subtle animation, so the "you can climb here" message survives without relying on the hue.' },
      { q: 'How can you guide a player by what you do to the *wrong* paths?', a: 'Make incorrect routes quietly less inviting — darker, visually closed, dead-ended, less detailed — so the correct path wins by contrast. Guidance is as much about gently discouraging the wrong way as advertising the right one.' }
    ],
    tags: ['guidance', 'leading the eye', 'light', 'composition', 'readability', 'accessibility'] },
  {
    id: 'c1-05', title: 'Critical path, golden path and optional space', pillarId: 'C', phaseId: 'c1', moduleId: 'c1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    diagram: 'blockout',
    concept:
'Once you can guide a player, you have to decide *how much freedom* to guide them through. Three terms map the structure of a level:\n' +
'- The **critical path** is the minimum route from entrance to exit — the spine every player must traverse to finish the level. It must always be solvable and never softlock.\n' +
'- The **golden path** is the *intended* route: the critical path plus the experience you designed around it — the set-pieces, the pacing beats, the moments you most want every player to see. A well-built golden path makes the critical path feel like an adventure, not a corridor.\n' +
'- **Optional space** is everything off to the side — side rooms, secrets, loot, lore, shortcuts, the scenic overlook. It rewards curiosity and gives different players different reasons to explore, but a player who ignores all of it must still finish.\n\n' +
'The key design tension is *width*. A **linear** level keeps the critical and golden paths nearly identical — tight, controllable pacing (your tension-and-release curve from [[c1-02]] lands exactly as authored), but less player freedom. An **open** level lets the two diverge widely — more agency and replay, but you lose control of pacing and sequence, and the cost to build all that optional space explodes. Most levels sit on a spectrum, often shaped like a *string of pearls*: open exploration "pearls" strung along a linear critical-path "string", so you get freedom in the rooms and control in the transitions.\n\n' +
'Two rules keep it honest. First, **the golden path must read** — your soft-guidance cues ([[c1-04]]) should make the intended route obvious enough that a player never gets stuck wondering, even while optional doors tempt them sideways. Second, **scope lives here.** Optional space is the single easiest place for a level to balloon: every side room is more blockout, art, encounters and testing. A student level is usually a strong golden path with a *few* meaningful optional pockets — not a sprawling open world. Cut optional space before you cut the critical path; the spine is what ships.',
    task:
'Sketch a one-screen top-down map of a small level (on paper or in any drawing tool). Draw and label three things: the **critical path** as a bold line from start to finish, the **golden path** as the intended route through your planned beats (mark 2–3 set-piece or pacing moments on it), and **2–3 optional pockets** branching off, each with a one-word reward (loot, lore, shortcut, view). Then write two sentences: where does your level sit on the linear-to-open spectrum, and which one optional pocket would you cut first if the team ran out of time?',
    success: [
      'You can define critical path, golden path and optional space and tell them apart on a map.',
      'You can explain the linear-vs-open trade-off in terms of pacing control versus player freedom and build cost.',
      'Your map has a critical path that always reaches the exit, with optional space genuinely optional.',
      'You can name the optional pocket you’d cut first — applying scope discipline to your own level.'
    ],
    skills: ['Critical vs golden path', 'Pacing control vs player freedom', 'Designing optional space', 'Scoping a level’s width'],
    simplified: 'The exact terms vary by studio — some teams say "main path / intended path / side content", or use "mainline" and "optional". The three roles (must-traverse, intended-experience, reward-the-curious) are what matter, not the labels.',
    goDeeper: 'Look up writing on the "string of pearls" structure and on linear-vs-open level layout; many open-world post-mortems discuss how they keep a readable golden path inside a free-roam space. The pacing seam back to [[a0-02]] (structure as pacing) is worth re-reading here.',
    quiz: [
      { q: 'What’s the difference between the critical path and the golden path?', a: 'The critical path is the bare minimum route a player must traverse to complete the level — it must always be solvable. The golden path is the *intended* experience built around that spine: the critical path plus the set-pieces and pacing beats you want every player to encounter.' },
      { q: 'Why does a more open level cost you pacing control, and how does the "string of pearls" structure recover some of it?', a: 'When players can roam, they hit your beats out of order or skip them, so your authored tension-and-release curve falls apart. A string-of-pearls layout strings open exploration "pearls" along a linear critical-path "string", giving freedom inside each area while the transitions between them stay controlled and sequenced.' },
      { q: 'A level designer is over scope. Why cut optional space before the critical path?', a: 'The critical path is the spine that lets the level be finished at all — without it there is no level. Optional space is the easiest thing to add and the easiest to balloon (each side room is more blockout, art, encounters and testing), so it is where you regain feasibility while still shipping a complete, playable level.' }
    ],
    tags: ['critical path', 'golden path', 'optional space', 'linear vs open', 'string of pearls', 'scope'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
