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
'You spent five pillars becoming versatile across **story, design, level, 3D and code**. Now turn that breadth into a *graded plan*. The achievement portfolio ([[01-02]]) is a published menu of silver / gold / platinum achievements, and your job here is to lay your five tracks across that menu so the work the capstone needs anyway *also* earns the tiers you are aiming for.\n\n' +
'The key insight for a versatile dev is **coverage versus depth**. A pure specialist banks deep achievements in one column and nothing elsewhere; you can bank a *silver or gold in several tracks* — a story beat, a designed encounter, a blocked-out level, a game-ready prop, a coded mechanic — which is exactly what a small, eight-person team is short of. But coverage has a ceiling: a platinum is qualitatively harder, not a silver done five times, so you cannot platinum everything. Pick **one or two tracks to push to gold/platinum** and let the rest sit at a reliable silver. Choose the deep ones where you are strongest *and* where the game genuinely needs depth — never bolt a platinum onto a track the game does not use ([[01-03]]).\n\n' +
'A clean way to build the map is a five-by-three grid: tracks down the side, tiers across the top. For each track, write the *highest tier you realistically aim for* and the single artefact that would prove it — a feature spec for design ([[b3-03]]), an exported asset for 3D ([[d5-06]]), a unit-tested mechanic for code ([[f1-04]]), a blockout for level ([[c1-01]]), a quest or worldbuilding beat for story ([[a3-02]]). The vertical slice ([[f1-01]]) is your richest source, because one slice legitimately touches all five tracks at once.\n\n' +
'Two cautions. First, **the team game comes first** — your map must serve the shipped game, not compete with it; trophies earned while the build slips are a bad trade ([[01-03]]). Second, this is a *plan*, not a guarantee: your minor’s real achievement list, tier names and thresholds are the binding rubric — map onto *those* the moment you receive them. Use the diagram to toggle a mix of tiers across tracks and watch where coverage-plus-one-deep-spike lands you against the thresholds.',
    task:
'Build your **five-by-three achievement map**. Draw a grid with the five tracks (story, design, level, 3D, code) down the side and silver / gold / platinum across the top. (1) For each track, circle the *highest tier you honestly aim for* given your strengths and the time. (2) Pick exactly **one or two** tracks to take to gold/platinum and justify each in one line by naming the game work it is already part of. (3) For every circled cell, name the **one artefact** that proves it. (4) Mark which cells the vertical slice ([[f1-01]]) alone could evidence — that overlap is your highest-value work.',
    success: [
      'You can lay your five tracks across the silver/gold/platinum tiers as a deliberate coverage-plus-depth plan.',
      'You can justify each gold/platinum target by the game work it is already part of, not as bolt-on scope.',
      'You can name a concrete proving artefact for every tier you are aiming for.'
    ],
    skills: ['Cross-track grade mapping', 'Coverage vs depth judgement', 'Tier-to-artefact thinking'],
    simplified: 'The five-by-three grid and the “coverage plus one or two deep spikes” shape are a teaching model. Your minor’s actual achievement list, tier names, counts and how they combine into a mark are programme-specific — treat the published rubric as the source of truth and remap onto it.',
    goDeeper: 'Pair this with [[01-03]] (where to spend effort) and [[f0-03]] (cutting your own GDD); once you have the real achievement list, redo this grid against it with your team so personal targets and the shared build line up.',
    quiz: [
      { q: 'Why does a versatile dev usually aim for silver/gold across several tracks plus one or two deep spikes, rather than a platinum in everything?', a: 'Because a platinum is qualitatively harder, not a silver repeated — you cannot realistically reach standout depth in all five tracks in one semester. Broad silver/gold coverage fills the gaps an eight-person team is short of, while one or two aligned deep spikes capture the high-tier marks where you are strongest and the game needs depth.' },
      { q: 'You map a platinum onto a track the capstone game barely uses. What is wrong with that?', a: 'It is bolt-on scope: a trophy chased for its own sake rather than work the game needs. That pulls effort away from the shipped game your grade mostly rides on. Reach targets should align with work the game requires anyway, so the achievement and the build pull the same direction.' }
    ],
    tags: ['achievements', 'portfolio', 'five tracks', 'gold platinum', 'planning', 'capstone'] },
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
