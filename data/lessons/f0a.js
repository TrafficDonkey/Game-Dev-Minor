/* Pillar F · Phase f0 · Module f0a — The GDD (capstone: draft a real GDD) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'f0-01', title: 'Capstone brief: a feasible small game, end to end', pillarId: 'F', phaseId: 'f0', moduleId: 'f0a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    diagram: 'scope',
    prereq: '[[04-01]] (scoping) and [[b5-02]] (feasible-fun) first — this is where you apply them for real.',
    concept:
'This is the capstone. Everything in the five tracks was practice; now you decide **one small game** and carry it end to end — a feasible game you could genuinely scope, design, level, model, and code with a team in a semester. The deliverable of this phase is a real ((GDD)), and the only grade that matters is the one the minor cares about: **complexity vs feasibility** ([[01-05]]), not raw ambition.\n\n' +
'The brief is deliberately tight. Pick a game that is **small, complete, and yours** — one core loop ([[b0-02]]), one or two mechanics, a handful of spaces, a sliver of story. The test is not "is this impressive?" but "could eight people *finish* this and show it at the expo ([[01-07]])?" The smaller game you ship beats the huge one you abandon — that is the whole minor in one sentence.\n\n' +
'What makes this *end to end* is that your one idea must touch all five tracks at once, because a real game does:\n' +
'- **Story** — a theme and a tiny narrative frame, sized to what the game needs, not what you wish you could write ([[a0-01]]).\n' +
'- **Design** — the core loop and the one or two mechanics that make it fun ([[b0-02]], [[b3-02]]).\n' +
'- **Level** — one short space, blocked out in grey before it is pretty ([[c1-01]]).\n' +
'- **3D** — one or two game-ready assets you can actually make and export ([[d0-01]]).\n' +
'- **Code** — the one mechanic, coded and testable ([[e1-01]]).\n\n' +
'A useful framing is the **vertical slice**: not the whole game, but one *complete* slice of it — one loop, one space, one mechanic, polished until it feels finished ([[f1-01]]). The GDD you draft this phase describes the *small whole*; the slice you build next ([[f1-01]]) proves a piece of it. Both live or die on the same discipline: choosing little, and choosing well.\n\n' +
'So the capstone brief is really a scoping decision dressed as a creative one. Before you write a word of GDD, you commit to a game you can *finish*. That single honest choice is the most senior thing in this whole course.',
    task:
'Write your **capstone brief** — half a page, no more. State: (1) the **game in one sentence** (the hook); (2) the **core loop** in one line (the repeated verbs); (3) **one theme** ("X is about Y"); (4) the **one mechanic** that carries the fun; (5) the **smallest content** that still makes it a game (how many spaces, enemies, beats). Then, for each of the five tracks above, write **one line** on what that track contributes. Finish with the honest sentence: *"Eight people could finish this in a semester because ___."* If you cannot complete that sentence truthfully, the game is still too big — shrink it now, on paper, where shrinking is free.',
    success: [
      'You can state a small game as a hook, a core loop, a theme and one carrying mechanic.',
      'You can show your one idea touching all five tracks without any track ballooning.',
      'You can justify the game as finishable by a real team in a real semester.'
    ],
    skills: ['Scoping a capstone', 'Whole-pipeline thinking', 'Committing to a finishable game'],
    simplified: 'There is no single "right size" for a student game — it depends on the team’s skill and the engine. The "could eight people finish this?" test is a judgement call, not a formula; calibrate it against your own sprint velocity once you have a few weeks of data ([[04-01]]).',
    goDeeper: 'Study postmortems of student and game-jam projects (search "student game postmortem scope"); the recurring lesson is always the same — the teams that finished scoped down early. The "vertical slice" concept as used in studio pre-production is the professional version of this brief.',
    quiz: [
      { q: 'Why does the capstone insist your one game idea touch all five tracks rather than going deep on your favourite one?', a: 'Because the goal of the minor is a versatile, solo-capable dev who can see a whole game through — and because a real game only works when story, design, level, art and code reinforce each other. Touching all five end to end, on a small scale, is worth more than mastering one in isolation. It also surfaces the seams early, where they are cheap to fix.' },
      { q: 'A teammate pitches an open-world game with crafting and online co-op for the capstone. What is the scope-aware response?', a: 'Name it as "fun but not feasible" ([[b5-02]]) and shrink it before falling in love with it. Open worlds, crafting and networking are each a semester of work alone; together they guarantee an unfinished game. Offer the smallest version that keeps the appeal — one handcrafted space, one systemic mechanic, local only — and reserve the rest as an "if we have time" wish-list.' }
    ],
    tags: ['capstone', 'scope', 'vertical slice', 'gdd', 'feasibility'] },
  {
    id: 'f0-02', title: 'Drafting the full GDD in the builder', pillarId: 'F', phaseId: 'f0', moduleId: 'f0a',
    difficulty: 'Advanced', mode: 'handson', estMinutes: 40,
    diagram: 'gdd',
    prereq: '[[f0-01]] (your capstone brief) — you draft the GDD *from* that brief.',
    concept:
'Time to turn your capstone brief ([[f0-01]]) into a real, full ((GDD)) using the **GDD builder** above. You learned what a GDD is in foundations ([[01-04]]) and how to author one as a designer ([[b3-01]]); this is where you actually write the whole thing for *your* game and feel it work as a tool for alignment, not a form to fill in.\n\n' +
'A GDD is the **shared source of truth** that lets five disciplines build the *same* game ([[b3-01]]). The storyteller reads it for theme and tone, the level designer for the spaces to block out ([[c0-01]]), the 3D modeller for art direction and the asset list ([[d0-01]]), the programmer for the systems to script ([[e1-01]]). Your job is to write each section so a teammate can read it and *start working without asking you what you meant*.\n\n' +
'A working student GDD is built from a standard set of sections — pitch and pillars, core loop, mechanics and systems, progression and balance, story/world/characters, level and content plan, art direction and asset list, UI/UX and controls, audio, and scope/milestones/risks ([[b3-01]]). You do not need all of them at full depth on day one. The discipline that keeps it useful: **every section earns its place** — if a paragraph does not change what someone builds, cut it. A tight ten-page GDD the team follows beats a sixty-page one nobody reads.\n\n' +
'Two habits make this draft good. First, **write the feature pages buildably** — for your one carrying mechanic, specify behaviour, concrete tuning numbers, edge cases and a "done when…" checklist, exactly as in [[b3-03]]. Second, **keep it living** — a GDD is versioned in Git alongside the project ([[03-04]]) and updated when the design changes, not written once and abandoned. The builder gives you the scaffold; the thinking is yours.\n\n' +
'Watch scope as you write. The GDD is exactly where over-scoping shows up first, because typing "and also a crafting system" costs one line but months of work ([[b5-02]]). You will feasibility-check and cut this very document next ([[f0-03]]) — so draft honestly now, and flag anything you already suspect is too big.',
    task:
'Using the **GDD builder** above, draft the **full GDD for your capstone game** from your f0-01 brief. Fill every core section (skip none, but keep each as short as it can honestly be). Write your **one carrying mechanic** as a proper buildable feature page ([[b3-03]]) with starting numbers and a "done when…" list. Produce a **one-line asset list** the modeller could start from, and a **content plan** (how many spaces, beats, enemies). End with a **scope/risks** section that names the one or two things you are most worried about. Export or save the draft — you will cut it in [[f0-03]].',
    steps: [
      'Open the GDD builder above and start from your f0-01 capstone brief — paste the hook, core loop, theme and carrying mechanic into the top sections.',
      'Pitch & pillars: write the one-page pitch (hook, core fantasy, "X meets Y", platform/scope) and 3–4 specific design pillars that each cut and keep a feature ([[b3-02]]).',
      'Core loop & mechanics: state the loop in a line ([[b0-02]]); list the one or two mechanics; expand the carrying mechanic into a full feature page — behaviour, tuning numbers, ≥3 edge cases, feedback, a "done when…" checklist ([[b3-03]]).',
      'Story, world & characters: a short theme statement and the minimum narrative frame, sized to the game ([[a0-01]]); note how story is delivered (environmental/systemic over cutscenes where cheaper).',
      'Level & content plan: how many spaces, what each teaches/tests, and the critical path ([[c1-01]]); keep it to the smallest count that still feels like a game.',
      'Art direction & asset list: the look in two lines, plus a one-line, game-ready asset list the modeller could pick up ([[d0-01]], [[d5-06]]).',
      'UI/UX, controls & audio: name the named input actions ([[e1-03]]), the core UI screens, and the audio you actually need.',
      'Scope, milestones & risks: a rough sprint-by-sprint plan and an honest list of the 1–2 biggest risks; flag anything you already suspect is over-scoped for the cut in [[f0-03]].',
      'Save or export the draft (and, on a real team, commit it to Git — [[03-04]]) so it is versioned and ready to trim.'
    ],
    success: [
      'You produced a complete GDD draft for your own game, with no section left as a stub.',
      'Your carrying mechanic is written as a buildable feature page (numbers, edge cases, "done when…").',
      'Your asset list and content plan are concrete enough for the modeller and level designer to start.',
      'You named your top one or two scope risks honestly, ready to cut next.'
    ],
    skills: ['Drafting a full GDD', 'Buildable feature pages', 'Asset & content planning', 'Surfacing scope risk early'],
    simplified: 'The builder above is a teaching scaffold with a sensible common section set — it is not your minor’s official template. If the minor hands you its own GDD format, follow that; the *thinking* (buildable sections, every section earns its place, keep it living) transfers either way.',
    goDeeper: 'Tim Ryan’s classic "Anatomy of a Design Document" essays are the well-known starting point for section breakdowns; studio GDD postmortems (search "game design document postmortem") show real feature pages and how much detail each section actually needs.',
    quiz: [
      { q: 'You have written a beautiful 50-page GDD and the team is still building slightly different games. What likely went wrong?', a: 'Length is not the same as clarity. The sections that matter are probably buried in padding, or the feature pages describe vision without buildable specifics — behaviour, numbers, edge cases, "done when…" ([[b3-03]]). Cut the padding so the load-bearing parts are findable, and make every feature page answer a builder’s questions before they are asked.' },
      { q: 'Why draft the asset list and content plan inside the GDD rather than leaving them to the modeller and level designer later?', a: 'Because they are the clearest early signal of scope. A content plan that lists twelve unique spaces and forty assets is over-scoped on paper, before anyone wastes a week building. Putting them in the GDD lets the team see the true size of the game and cut on evidence ([[f0-03]]) while cutting is still cheap.' }
    ],
    tags: ['gdd', 'documentation', 'capstone', 'feature spec', 'asset list'] },
  {
    id: 'f0-03', title: 'Feasibility-checking and cutting your own GDD', pillarId: 'F', phaseId: 'f0', moduleId: 'f0a',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 30,
    diagram: 'scope',
    prereq: '[[f0-02]] (your drafted GDD) — you cannot cut what you have not yet written down.',
    concept:
'A first-draft GDD is *always* too big. That is not a failure — it is the point. You drafted honestly ([[f0-02]]); now comes the senior skill that the minor actually grades: **feasibility-checking and cutting your own document down to something eight people can finish**. Over-scoping is the number-one reason student games fail ([[04-01]], [[b5-02]]), and the cut is where you prove you have learned that lesson, not just heard it.\n\n' +
'Cutting your *own* GDD is harder than cutting in the abstract, because every feature is now an idea you fell in love with while writing it. Three disciplines make it survivable:\n' +
'- **Budget time, not features.** Decide how many building weeks you really have (subtract reviews, sprints, the expo, slipping, integration), then ask *what fits* — not the reverse. A realistic rule: plan for about **half** of what feels possible, and keep the rest as a wish-list ([[04-01]]).\n' +
'- **Cut content before systems.** Fewer spaces, beats and assets is cheap and barely hurts the experience; a weaker core loop hurts everything. Protect the loop ([[b0-02]]) at all costs and trim breadth around it.\n' +
'- **Cut what serves no pillar.** A feature that advances none of your design pillars ([[b3-02]]) is a candidate to drop, however nice it is.\n\n' +
'Run every feature through a **value-vs-cost** judgement: build high-value/low-cost first; the expensive/marginal quadrant is where you say no ([[04-01]]). Be ruthless about the *hidden* costs — content is labour, and every asset and line is work the asset list already exposed ([[f0-02]]). The painful cut — your good-but-unfinishable second idea — is exactly the one that proves the discipline. A good idea you cannot ship is worth **zero** at the expo ([[b5-02]]).\n\n' +
'When you cut, update the GDD in place — it is a living, versioned document ([[03-04]]), so the cut is a real edit, not a mental note. What survives is your **vertical slice**: the one loop, one space, one mechanic you will actually build next ([[f1-01]]). End with a one-paragraph **feasibility statement** the team (and a reviewer) can read: here is the smaller game, here is why it fits, here is what we cut and why. That paragraph is the difference between an ambitious wish and a plan.',
    task:
'Run a **feasibility pass and cut** on the GDD you drafted in [[f0-02]]. (1) Estimate your real **building weeks** and halve your plan. (2) Make a **value-vs-cost** table of every feature, mechanic, space and asset; tag each `high`/`low` on both axes. (3) **Cut** until what remains fits the halved budget — content before systems, anything off-pillar, the expensive/marginal quadrant first; protect the core loop. (4) Mark the survivors as your **vertical slice** ([[f1-01]]). (5) Write the **feasibility statement**: one paragraph naming the smaller game, why it fits the time and team, and the single cut that hurt most — and why cutting it was still right. Edit the cuts into the GDD itself, do not just list them.',
    success: [
      'You estimated real building time and planned to roughly half of your gut feel.',
      'You cut content and off-pillar features first and protected the core loop.',
      'What remains is an identified vertical slice that fits the team and the semester.',
      'You can defend the smallest, most painful cut as the right call in one honest paragraph.'
    ],
    skills: ['Feasibility-checking a GDD', 'Cutting your own work', 'Value-vs-cost triage', 'Writing a feasibility statement'],
    simplified: 'The "plan for half" heuristic and the value/cost quadrant are working aids, not exact measurements — "value" and "cost" can only be estimated until you prototype ([[b4-01]]) and gather real sprint velocity. Treat them as a starting discipline and recalibrate with evidence.',
    goDeeper: 'Game-jam and student-team postmortems are the richest source here (search "scope postmortem"): the teams that shipped almost all cut hard and early. Mark Cerny’s "Method" talk and many indie postmortems hammer the same point — finish small, then expand only if time remains.',
    quiz: [
      { q: 'Your GDD is over budget. Do you cut a level or simplify the core combat mechanic, and why?', a: 'Cut the level. Content (levels, enemies, assets) is far cheaper to remove than systems and barely dents the experience, whereas weakening the core loop ([[b0-02]]) damages the thing players actually spend their time doing. Always protect the loop and trim breadth around it.' },
      { q: 'Why is cutting your *own* GDD harder than the scope drills you did earlier, and how do you make it bearable?', a: 'Because every feature is now an idea you fell in love with while writing it, so the cuts feel personal. Make it bearable by deciding the rule in advance — budget time then cut to fit, content before systems, off-pillar features go — and by reframing it: a good idea you cannot finish is worth zero at the expo, so the cut is what lets the game exist at all.' },
      { q: 'What is the feasibility statement for, and who reads it?', a: 'It is a single honest paragraph describing the smaller game, why it fits the time and team, and what you cut and why. The team reads it to stay aligned on the *real* scope, and a feasibility reviewer ([[01-05]]) reads it to grade complexity vs feasibility. It turns an ambitious wish into a defensible plan.' }
    ],
    tags: ['scope', 'feasibility', 'cutting', 'gdd', 'vertical slice', 'capstone'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
