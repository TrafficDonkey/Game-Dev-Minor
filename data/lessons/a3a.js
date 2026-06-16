/* Pillar A · Phase a3 · Module a3a — Game-writing craft */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'a3-01', title: 'Writing game dialogue', pillarId: 'A', phaseId: 'a3', moduleId: 'a3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'Game dialogue is not screenplay dialogue with a controller attached. It has to survive being *interrupted*, replayed, skipped, triggered out of order, and heard while the player is busy doing something else. That changes how you write it.\n\n' +
'Three jobs every line should earn its place against: **character** (who is speaking, in one breath), **information** (what the player needs to know or feel), and **flavour** (the world’s texture). The best lines do two or three at once; a line that does none is cut. Beginners over-write because they treat dialogue as the *main* delivery channel — but in a game, much of the story is already told by the space and the systems ([[c0-03]], [[a1-02]]), so dialogue can be lean.\n\n' +
'Practical craft for the interactive medium:\n\n' +
'- **Write for the ear, not the page.** Players hear or speed-read it; long monologues stall play. Short lines, plain words, one idea per line.\n' +
'- **Subtext over on-the-nose.** Let characters *not* say the thing — show want and flaw through how they talk, not a status report ([[a0-03]]).\n' +
'- **Barks** — short, reusable one-liners triggered by events ("Reloading!", "Behind you!") — carry huge weight cheaply. They are systemic, not scripted, and pair tightly with the code that fires them ([[e3-01]]).\n' +
'- **Respect player agency.** Don’t put words in the player-character’s mouth that contradict how the player just acted — that is a fast route to ludonarrative dissonance ([[a1-04]]).\n' +
'- **Branching multiplies cost.** Every choice you write doubles the lines, the voice recording, and the testing. Most game dialogue is a *spine* with small branches, not a true tree ([[a1-05]]). Scope it ruthlessly.\n\n' +
'A note on voice acting: a small student team usually has **text-only** dialogue or, at most, a few placeholder recordings. Write so the line reads well *silently*, and tag emotion in the script for whoever (or whatever) delivers it later. Text-only is not a failure — many acclaimed games never voice a word.',
    task:
'Take a single small scene: an NPC the player meets at a turning point. Write the encounter as **6–10 lines** of dialogue. Constraints: no line longer than ~12 words; every line must earn at least one of character / information / flavour (label which, in brackets, after each line); and at least one line must use **subtext** — the character means something they don’t say. Then write **two barks** the same NPC could shout during later combat or traversal, and note the event that triggers each.',
    success: [
      'Every line of your scene earns character, information, or flavour — ideally more than one.',
      'At least one line carries subtext rather than stating the feeling outright.',
      'You can explain why barks are a cheap, systemic way to deliver character and information.'
    ],
    skills: ['Writing for the ear', 'Subtext & economy', 'Barks & systemic dialogue'],
    simplified: 'The character/information/flavour split is a working heuristic, not a law — some lines exist purely for pacing or comedy. Use it as a cutting filter, not a cage.',
    goDeeper: 'For interactive dialogue craft, look up talks and writing by game writers such as Emily Short and Jurie Horneman; the GDC Narrative Summit regularly covers barks, branching cost and writing for systems.',
    quiz: [
      { q: 'Why is a screenplay-trained writer’s instinct for long, polished monologues often wrong in games?', a: 'Players are *acting*, not passively watching, so long speeches stall the play they came for, and lines can be skipped, replayed or triggered out of order. Game dialogue is leaner, written for the ear, and shares the storytelling load with space, systems and barks.' },
      { q: 'What makes barks such an efficient narrative tool for a small team?', a: 'They are short, reusable lines fired by game events rather than hand-authored scenes, so a handful of recordings or text lines deliver character and information across countless moments. They are systemic — written once, triggered by code — which is far cheaper than branching scripted dialogue.' }
    ],
    tags: ['dialogue', 'subtext', 'barks', 'writing', 'scope'] },
  {
    id: 'a3-02', title: 'Quest and mission narrative', pillarId: 'A', phaseId: 'a3', moduleId: 'a3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'A **quest** (or mission) is the unit where story and mechanics fuse: it is a *task* the systems can track and a *beat* the narrative can land. Designing one well means thinking like a writer and a designer at the same time — the seam to game design made concrete ([[a5-01]]).\n\n' +
'Most quests share a skeleton: a **hook** (why the player cares), an **objective** (what the game tracks), a **complication** (a twist that stops it being a fetch-and-return), and a **resolution** (payoff, and a consequence that sticks). Strip the complication and you get the infamous *fetch quest* — mechanically valid, narratively dead. The complication is where craft lives: the item is guarded, the ally lied, the rescue arrives too late.\n\n' +
'Quests come in layers, and naming them keeps scope honest:\n\n' +
'- **Main / critical-path quests** carry the spine of the story. Few, authored, high-production.\n' +
'- **Side quests** deepen the world, factions and characters ([[a2-03]]). Optional, lower-cost, but the place a world earns its texture.\n' +
'- **Radiant / repeatable tasks** are systemically generated ("clear N camps"). Cheap, infinite, and *thin* — use sparingly; they are filler dressed as content.\n\n' +
'The structural craft is the same four-job arc you learned for stories ([[a0-02]]), now expressed as gameplay: the objective *is* the conflict, the complication *is* the escalation, the resolution releases tension. A quest also has to be **legible** — the player must always know what they’re doing and why, or the narrative evaporates into confusion. That legibility is a level-design and UI problem as much as a writing one.\n\n' +
'Scope warning, because quests are where over-scoping hides: every quest needs writing, scripting, often unique assets and bespoke testing. A small team is far better served by **a few memorable quests with real complications** than a map littered with markers. Quantity of quests is the easiest fake-progress trap in a student GDD — resist it.',
    task:
'Design **one side quest** on paper using the four-job skeleton. Write: the **hook** (one line — why the player cares), the **objective** the game tracks, a **complication** that turns it from a fetch quest into a story, and a **resolution** with a consequence that persists in the world. Then label which layer it is (main / side / radiant) and justify the label in one sentence. Finally, list the *production cost* it implies — new dialogue, new assets, new scripting — and name one thing you’d cut to keep it feasible.',
    success: [
      'Your quest has a genuine complication, not just "go there, bring this back".',
      'You can map the quest onto setup / conflict / escalation / resolution.',
      'You can state the production cost of the quest and a realistic cut to keep it feasible.'
    ],
    skills: ['Quest structure', 'Complication design', 'Quest-layer scoping'],
    simplified: 'Hook / objective / complication / resolution is one clean model among several (some teams add "stakes" or "branch" as explicit beats). It is enough to design solid quests; richer frameworks exist for branching-heavy RPGs.',
    goDeeper: 'For quest and mission writing, study postmortems and GDC talks from open-world RPG narrative teams on the difference between fetch quests and memorable side content; the design seam is covered further in [[a5-01]].',
    quiz: [
      { q: 'What single beat usually separates a memorable quest from a dead "fetch quest"?', a: 'The **complication** — a twist that breaks the simple go-there-bring-it-back loop: the item is guarded, the giver lied, the rescue is too late. Without it the quest is a mechanically valid task with no story; with it, the objective becomes genuine conflict and escalation.' },
      { q: 'Why are radiant / repeatable quests a scope trap rather than a content win?', a: 'They are systemically generated and feel like a lot of content, but each is narratively thin and interchangeable, so they pad the map without deepening the world. A few authored quests with real complications give far more narrative value per unit of work than many repeatable ones.' }
    ],
    tags: ['quests', 'missions', 'structure', 'fetch quest', 'scope'] },
  {
    id: 'a3-03', title: 'Narrative documentation and the writers’ room', pillarId: 'A', phaseId: 'a3', moduleId: 'a3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'On a team, a story that lives only in the writer’s head doesn’t exist. **Narrative documentation** is how the story becomes something the level designer, artist and programmer can build *from* — the writer’s real deliverable, alongside the prose itself. This is the same handoff discipline as the rest of the pipeline ([[02-03]]), pointed at story.\n\n' +
'The core documents a small team actually uses:\n\n' +
'- **Story bible** — the canonical reference for world, characters, factions, tone and rules ([[a2-03]]). One source of truth so the whole team stays consistent.\n' +
'- **Beat sheet / narrative outline** — the spine of the story as ordered beats, mapped onto the levels or missions that deliver them. This is where writing meets pacing and level design ([[a0-02]]).\n' +
'- **Character one-pagers** — want / need / flaw, voice samples, and a line or two on how each character behaves, so anyone writing a bark or a quest stays in voice ([[a0-03]]).\n' +
'- **Dialogue / quest scripts** in a shared, trackable format — frequently a spreadsheet or a structured table: an ID, the speaker, the line, the trigger condition, and emotion/notes. IDs matter because the programmer wires lines to events by ID, and version control tracks changes line-by-line ([[03-03]]).\n\n' +
'The **writers’ room** is the *process* around those docs: a small group breaking story together — pitching beats, pressure-testing them, killing the ones that don’t serve theme or scope, and dividing the writing. For a student team it might be two people and a whiteboard, but the habits matter: write things down, keep one canon, review each other’s pages, and treat narrative as a living backlog, not a finished novel handed over once.\n\n' +
'Keep the documentation *proportional to the game*. A tiny game needs a one-page bible and a beat sheet, not a 200-page tome. Over-documenting is its own scope failure — pages no one reads are wasted effort. Write the smallest set of docs that lets the rest of the team build confidently without asking you what happens next.',
    task:
'For a small game idea, draft a **mini narrative documentation set**: (1) a half-page **story bible** stub (world in 3 sentences, tone in 3 words, one hard "rule" of the world); (2) a **beat sheet** of 4–6 ordered beats, each tagged with the level or mission that delivers it; and (3) **three rows of a dialogue table** with columns `ID | speaker | line | trigger | notes`. Then write one sentence on what you deliberately left *out* to keep the documentation proportional to the game’s size.',
    success: [
      'Your beat sheet maps story beats onto the levels/missions that deliver them.',
      'Your dialogue table rows include an ID and a trigger, not just the line — the form a programmer can wire up.',
      'You can justify what you left out of the docs as proportional to the game’s scope.'
    ],
    skills: ['Story bible & beat sheet', 'Trackable dialogue scripts', 'Writers’-room habits'],
    simplified: 'Real studios use dedicated narrative tools (e.g. branching-dialogue editors and databases). A spreadsheet with IDs and triggers is the honest small-team version and teaches the same discipline; the tools change, the structure does not.',
    goDeeper: 'Look up writing on running a games writers’ room and on dialogue databases / narrative tooling from narrative leads at story-heavy studios; the GDC Narrative Summit covers documentation and process repeatedly.',
    quiz: [
      { q: 'Why does a dialogue line in a team script need an ID and a trigger, not just the text?', a: 'Because the line has to be *wired up*: the programmer connects it to a game event by its ID, and the trigger says when it fires. The ID also lets version control track edits line-by-line and lets other docs reference the line unambiguously — turning prose into something a team can actually build with.' },
      { q: 'How can over-documenting a small game’s story be a scope failure?', a: 'Documentation that no one reads is wasted effort, and an oversized bible can slow the team and go stale faster than it’s updated. The goal is the smallest set of living docs — bible, beat sheet, character pages, trackable scripts — that lets the team build confidently, proportional to the game’s actual size.' }
    ],
    tags: ['documentation', 'story bible', 'beat sheet', 'writers room', 'pipeline'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
