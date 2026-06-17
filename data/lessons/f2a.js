/* Pillar F · Phase f2 · Module f2a — Plan the grade */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'f2-01', title: 'Mapping your five tracks to gold/platinum', pillarId: 'F', phaseId: 'f2', moduleId: 'f2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24, diagram: 'achieve',
    prereq: '[[01-02]] (the silver/gold/platinum portfolio) and [[01-03]] (the effort strategy) first',
    concept:
'You spent five pillars becoming versatile across **story, design, level, 3D and code**. Now turn that breadth into a *graded plan* against the real rules ([[01-02]]): **silver is attendance** (attend a track’s lectures and its silver is free), and each track offers **two gold and two platinum** individual assignments. Across your five tracks that is **10 gold and 10 platinum available** — you need **8 gold for a 6** and **8 platinum for a 10**.\n\n' +
'The key move for a versatile dev is **coverage then depth**. *Coverage* is your eight gold: because golds are spread across all five tracks, you collect them by doing solid individual work in several tracks — a story beat, a designed encounter, a blocked-out level, a game-ready prop, a coded mechanic — exactly the breadth a small eight-person team is short of. Ten are available and you need eight, so you can let your two weakest golds slide. *Depth* is platinum: a platinum is a higher-skill assignment, so you cannot reach all ten — concentrate them where you are strongest **and** where the game genuinely needs depth, and push those toward the eight platinum that make a 10 ([[01-03]]). Never bolt a platinum onto a track the game does not use.\n\n' +
'A clean way to build the map is a grid: the five tracks down the side, each with its **two gold and two platinum** slots across. For each slot, mark whether you will *attempt* it and name the single artefact that would prove it — a feature spec for design ([[b3-03]]), an exported asset for 3D ([[d5-06]]), a unit-tested mechanic for code ([[f1-04]]), a blockout for level ([[c1-01]]), a quest or worldbuilding beat for story ([[a3-02]]). The vertical slice ([[f1-01]]) is your richest source, because one slice legitimately satisfies several tracks’ assignments at once.\n\n' +
'Two cautions. First, **the team game is the other 50%** — your map must serve the shipped game, not compete with it ([[01-03]]). Second, this is a *plan*: your minor’s real assignment briefs are the binding rubric, so remap onto those the moment you have them. Use the planner to tick your targets and watch your gold count cross the 6 and your platinum count climb toward the 10.',
    task:
'Build your **achievement map** in the planner above and on paper. (1) Mark the tracks you will attend in full — those silvers are free. (2) Across your five tracks’ **ten gold** slots, choose the **eight** you will commit to (coverage) and justify each by the game work it is already part of; note the two you would drop. (3) Choose which tracks you push to **platinum** (depth) — be honest about how many of the eight you can realistically reach — and tie each to work the game needs anyway. (4) For every slot you will attempt, name the **one artefact** that proves it. (5) Mark which slots the vertical slice ([[f1-01]]) alone could satisfy — that overlap is your highest-value work.',
    success: [
      'You can lay your five tracks across their gold and platinum slots as a deliberate coverage-then-depth plan (8 gold for the 6, platinum toward the 10).',
      'You can justify each gold/platinum target by the game work it is already part of, not bolt-on scope, and know silver is just attendance.',
      'You can name a concrete proving artefact for every assignment you will attempt.'
    ],
    skills: ['Cross-track grade mapping', 'Coverage vs depth judgement', 'Slot-to-artefact thinking'],
    simplified: 'The grid and the “collect eight gold for coverage, push a few platinum for depth” shape follow the course’s stated rules (silver = attendance, two gold + two platinum per track, 8 gold = a 6, 8 platinum = a 10). The exact assignment list and how grades scale between are programme-specific — remap onto your minor’s real briefs.',
    goDeeper: 'Pair this with [[01-03]] (where to spend effort) and [[f0-03]] (cutting your own GDD); once you have the real assignment briefs, redo this map against them with your team so personal targets and the shared build line up.',
    quiz: [
      { q: 'Why does a versatile dev collect gold across several tracks but push only a couple to platinum?', a: 'You need eight gold for a 6, and golds are spread across all five tracks, so breadth is how you collect them — and it fills the gaps an eight-person team is short of. Platinum is a higher-skill assignment you cannot realistically reach in every track, so you concentrate it where you are strongest and the game needs depth, climbing toward the eight platinum that make a 10.' },
      { q: 'In this minor, is "silver" something you plan assignments around?', a: 'No — silver is attendance. You earn a track’s silver simply by attending all its lectures, so it is a free achievement you secure by showing up. The planning is about which gold and platinum *assignments* to do across your tracks.' }
    ],
    tags: ['achievements', 'portfolio', 'five tracks', 'gold platinum', 'planning', 'attendance', 'capstone'] },
  {
    id: 'f2-02', title: 'Building the portfolio as you go', pillarId: 'F', phaseId: 'f2', moduleId: 'f2a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'achieve',
    concept:
'A plan ([[f2-01]]) only earns marks if the *evidence* exists when assessment comes. The single biggest portfolio mistake is leaving evidence to the end: at the deadline you are exhausted, the build is on fire, and the proof of work you actually did months ago is gone — undocumented, unscreenshotted, buried in chat. Achievements are graded on **evidence, not claims** ([[01-02]]), so capture the artefact *as you make it*, not after.\n\n' +
'The habit is simple: every meaningful piece of work leaves a **trace** at the moment it happens. Most of these are by-products of doing the project properly, which is the point — good process *is* the portfolio.\n' +
'- **Code** evidences itself through Git: clean commits, a readable history, merged pull requests ([[03-03]]). Write commit messages a reviewer can follow; the log becomes proof for free.\n' +
'- **Design** leaves feature specs ([[b3-03]]), the GDD’s version history, and playtest notes — what you observed and what you changed because of it.\n' +
'- **Level and 3D** leave blockout screenshots, before/after passes, and exported assets with their stats; capture the *process*, not only the final shot.\n' +
'- **Story** leaves the bible, quest drafts and dialogue, dated as they evolve.\n\n' +
'Three working rules. First, **date and contextualise everything** — a screenshot with no date or note is weak evidence; one line of "what, when, why, my part" turns an artefact into a claim a reviewer can verify, which matters because much of your grade rides on collaboration and your *individual* contribution ([[02-01]]). Second, **keep a running log** — a simple dated list of what you did and the artefact link, updated weekly, so nothing is reconstructed from memory. Third, **align with the sprint rhythm** ([[01-06]]): each sprint review is a natural checkpoint to file evidence while it is fresh.\n\n' +
'One honest scope note: do not let documentation become its own over-scope. The goal is *lightweight, continuous* capture — a commit, a screenshot, a dated line — not a polished report after every task. Capture cheaply and often; the shipped game and the team come first ([[01-03]]). Use the diagram to revisit your tier targets mid-semester and check, honestly, which already have filed evidence and which are still just intentions.',
    task:
'Set up your **portfolio-as-you-go system** and run it for one imagined sprint. (1) Create a single running **evidence log** (a doc or spreadsheet) with columns: *date · what I did · track · artefact link · tier it supports*. (2) Take the achievement map from [[f2-01]] and, for each target, write the *capture rule* — the exact trace that work will leave (e.g. "commit + PR", "playtest notes", "before/after blockout shots"). (3) Invent one week of plausible capstone work and fill in three to five log rows as if you had just done them, each with the one-line "what, when, why, my part" context. (4) Mark any row whose artefact is missing or weak — that is a gap to fix now, not at the deadline.',
    success: [
      'You maintain a single dated evidence log that links artefacts to the tiers they support.',
      'You can state the cheap capture rule (the trace) for each kind of work before you do it.',
      'You can explain why dated, contextualised evidence captured continuously beats reconstructing proof at the deadline.'
    ],
    skills: ['Continuous evidence capture', 'Evidence logging & dating', 'Tying artefacts to achievements'],
    simplified: 'What counts as acceptable evidence, and how/where you submit it, are set by your minor’s rubric and assessors — some want a formal portfolio system, others accept Git history and a shared drive. Confirm the required format early and shape your log to fit it.',
    goDeeper: 'Reinforce the underlying habits in [[03-03]] (clean Git history and PRs as free evidence), [[b4-03]] (playtest notes worth filing) and [[01-06]] (using sprint reviews as evidence checkpoints).',
    quiz: [
      { q: 'Why capture evidence as you work rather than assembling the portfolio at the end?', a: 'Because at the deadline the build is under pressure and the proof of earlier work is often gone — undocumented or buried. Achievements are graded on evidence, not claims, so capturing the artefact at the moment of work (a commit, a dated screenshot, playtest notes) is the only reliable way to have verifiable proof when assessment comes.' },
      { q: 'How does normal good process double as portfolio evidence, with one example?', a: 'Doing the project properly already leaves traces: clean Git commits and merged pull requests evidence your code for free, GDD version history and playtest notes evidence design, exported assets with stats evidence 3D. Good process is the portfolio — you mostly have to capture and date it, not manufacture it.' },
      { q: 'Why date and add a one-line context note to each artefact?', a: 'Because a reviewer must verify your individual contribution and when it happened — much of the grade rides on collaboration and your personal part. A dated "what, when, why, my part" note turns a raw screenshot or file into a claim someone can actually check.' }
    ],
    tags: ['portfolio', 'evidence', 'git', 'documentation', 'sprints', 'capstone'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
