/* Pillar 0 · Phase 01 · Module 01a — The shape of the minor */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '01-01', title: 'The minor at a glance: 30 ECTS, 8-person team, one game, no written exams', pillarId: '0', phaseId: '01', moduleId: '01a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 16,
    concept:
'This minor is one semester worth **30 ECTS** — and in the Dutch HBO system one ECTS credit is roughly **28 hours of study**, so 30 credits is on the order of **840 hours**. That is not a side project; it is effectively your whole semester. Budget it like a job: treat the work as the thing you spend your weeks on, not something you cram before a deadline.\n\n' +
'The shape is unusual on purpose. You join an **eight-person team** and, across the semester, that team builds **one game**. There are **no written exams** — you are not graded on what you can recall under timed conditions. You are graded on what you and the team **produce**. Concretely, the mark splits into two halves: **50% is your individual achievement portfolio** ([[01-02]]) — achievements you earn by attending lessons and finishing individual assignments — and **50% is the group game and your contribution to it**, graded by the lecturers each in their own area of expertise. This is project- and portfolio-based assessment, and it rewards consistent delivery over last-minute heroics.\n\n' +
'Why does this matter for *you*, a learner aiming to be a **versatile, solo-capable dev** across five role-tracks? Because an eight-person team means **specialisation pressure**: you will be tempted to pick one lane and hide in it. The headstart these lessons give you is the opposite — enough fluency in story, design, level, 3D and code that you can take a useful slice of *any* of the eight roles, fill gaps, and understand every handoff. That makes you the teammate who unblocks others, which a project-graded course quietly rewards.\n\n' +
'Three realities to internalise now. First, **scope is the whole game** — eight people for one semester is a *small* game, and over-scoping is the number-one way student teams fail; the GDD itself is judged on complexity *versus feasibility* ([[01-05]]). Second, **the team is the unit** — your individual grade rides partly on collaboration, communication and Git hygiene ([[03-01]]), not just personal brilliance. Third, **there is a public ending** — an expo where you ship in front of people ([[01-07]]). Plan backwards from that.\n\n' +
'Everything else in this pillar — the achievement portfolio, the GDD, the sprint rhythm, Git, scoping — is detail under this one frame: *a small team, one feasible game, judged by what you ship.*',
    task:
'Write a half-page **reality budget** for yourself. (1) Convert 30 ECTS to hours using ~28 hours/credit, then divide by the number of teaching weeks you expect (assume ~20 if you do not know) to get a rough **hours-per-week** figure. (2) List the five role-tracks and mark, honestly, which one you would *default* to and which two you are weakest in. (3) Write two sentences on how being versatile (rather than hiding in your default lane) would help an eight-person team that is graded on one shipped game.',
    success: [
      'You can state the three defining facts: 30 ECTS, an eight-person team, one game, no written exams.',
      'You can explain why project/portfolio grading rewards consistent delivery and collaboration over recall.',
      'You can articulate why versatility (not just one specialism) is an asset on a small team.'
    ],
    skills: ['Reading the course structure', 'Time/effort budgeting', 'Framing the solo-dev goal'],
    simplified: 'The ~28 hours-per-ECTS figure and the “one game per eight-person team” shape are the common Dutch-HBO pattern; exact hours, team size and rules vary by institution and year — check your own programme’s handbook for the binding numbers.',
    goDeeper: 'Read your minor’s official module handbook / study guide for the exact ECTS breakdown, assessment rubric and team rules — it is the one truly authoritative source, and these lessons are a headstart, not a substitute for it.',
    quiz: [
      { q: 'There are no written exams — so how are you actually graded?', a: 'On what the team produces and the evidence you personally contribute: a playable game, the GDD, and your documented work across the semester. It is project- and portfolio-based, so steady delivery and collaboration matter more than recall under timed pressure.' },
      { q: 'Eight people, one game, one semester — what is the single biggest risk that frame implies?', a: 'Over-scoping. A small team for a short time can only build a small game, and the GDD is graded on complexity versus feasibility, so the chief danger is designing more game than the team can finish.' }
    ],
    tags: ['minor', 'ects', 'team', 'assessment', 'scope', 'fundamentals'] },
  {
    id: '01-02', title: 'The achievement portfolio: silver / gold / platinum and the grade thresholds', pillarId: '0', phaseId: '01', moduleId: '01a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 20, diagram: 'achieve',
    concept:
'Half your grade — a full **50%** — is this **individual achievement portfolio**. (The other half is the group game and your contribution to it; see [[01-01]].) Instead of an exam, you bank named **achievements** two ways: by **attending lessons** and by **finishing individual assignments**. They come in three tiers — **silver, gold, platinum** — and here the tiers mean *specific* things, not just "good / better / best":\n\n' +
'- **Silver = attendance.** You earn a silver by attending **all the lectures of a track**. Show up to everything in, say, the level-design track and that track’s silver is yours. Silvers are participation, not assignments.\n' +
'- **Gold = an individual assignment.** Each track offers **two gold achievements**, each a piece of assessed individual work.\n' +
'- **Platinum = a harder individual assignment.** Each track also offers **two platinum achievements** — assignments at a **higher skill level** that carry **more weight** on your final grade.\n\n' +
'The thresholds are blunt and worth memorising. To **complete the whole semester you need at least eight gold achievements — that is a 6** (a pass). If you **also** earn **eight platinum achievements**, your achievement grade is a **10**. Everything between a 6 and a 10 is driven by how many platinum you stack on top of your eight gold.\n\n' +
'Now do the arithmetic for *your* five tracks. Each track offers 2 gold and 2 platinum, so across five tracks there are **10 gold and 10 platinum available** — and you need **8 of each** for the top. That slack (you may drop two) is the whole game of planning: you choose *where* to spend the harder platinum effort ([[01-03]]). It also rewards being **versatile** — gold and platinum are spread across story, design, level, 3D and code, so breadth lets you collect them instead of being capped by one specialism.\n\n' +
'Two honest notes. Gold and platinum are *assignments*, so they need **real deliverables** — a feature spec ([[b3-03]]), an exported game-ready asset ([[d5-06]]), a unit-tested mechanic ([[f1-04]]) — work a lecturer can open and assess. And the **planner below counts your gold and platinum against these thresholds**; the 6-and-10 anchors are the course’s stated rule, so use it to plan, then confirm the exact details against your programme handbook.',
    task:
'Plan your portfolio against the real thresholds, then check it in the planner above. For your **five tracks** (story, design, level, 3D, code): (1) note that each track’s **silver** is simply *attend all its lectures* — list the tracks you commit to full attendance. (2) There are **10 gold** available (2 per track) and you need **8** — pick the eight gold assignments you would definitely finish and mark the two you would let slide. (3) There are **10 platinum** available and **8** make a 10 — circle the platinum you would *reach* for, choosing ones aligned with work the game needs anyway. Tally it: does your plan clear **8 gold** (a 6), and how close to **8 platinum** (a 10) does it get?',
    success: [
      'You can state how silver (attend a track’s lectures), gold (two assignments per track) and platinum (two harder assignments per track) are each earned — not just their order.',
      'You can state the thresholds: ≥8 gold = a 6, +8 platinum = a 10, with the portfolio worth 50% of the grade.',
      'You can work out that five tracks offer 10 gold and 10 platinum, so you need 8 of each and may drop two.'
    ],
    skills: ['Reading the achievement rules', 'Gold/platinum threshold maths', 'Planning across five tracks'],
    simplified: 'These are the rules as the course states them: silver = attendance, two gold and two platinum per track, 8 gold = a 6, 8 platinum = a 10, portfolio = 50% of the grade. The exact assignment list, how the in-between grades scale, and any participation requirements are programme-specific — treat your minor’s handbook and rubric as the binding source.',
    goDeeper: 'Get your minor’s real achievement list and assignment briefs as early as you can, then redo this plan against them. [[01-03]] turns these thresholds into a where-to-spend-effort strategy.',
    quiz: [
      { q: 'How do you earn a *silver* versus a *gold* in this minor?', a: 'A silver comes from attendance — attending all the lectures of a track. A gold comes from finishing an individual assignment, and each track offers two of them. Silver is participation; gold is assessed work.' },
      { q: 'What gets you a 6, and what lifts that to a 10?', a: 'At least eight gold achievements complete the semester and earn a 6. Adding eight platinum achievements on top takes the achievement grade to a 10 — the platinum you bank between zero and eight is what moves you from a 6 toward a 10.' },
      { q: 'You chose five tracks, each offering two gold. How many gold are available, and how many do you need?', a: 'Ten are available (two per track × five tracks) and you need eight — so you can afford to drop two and still pass. That slack is exactly what you plan around when deciding where to spend effort.' }
    ],
    tags: ['achievements', 'portfolio', 'grading', 'silver gold platinum', 'thresholds', 'attendance'] },
  {
    id: '01-03', title: 'A strategy for the achievement system: where to spend effort', pillarId: '0', phaseId: '01', moduleId: '01a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'achieve',
    prereq: '[[01-02]] (the achievement rules: silver/gold/platinum) first',
    concept:
'The achievement rules ([[01-02]]) are a system with clear levers, so plan them rather than grind blindly. Three facts set the strategy: **silver comes from attendance**, **a 6 needs eight gold**, and **a 10 needs eight platinum on top**. Spend your effort in that order.\n\n' +
'A working strategy in four moves:\n' +
'- **Bank the silvers for free — just show up.** Silver is attendance: attend every lecture of every track you are in and those silvers are yours with zero extra work. Skipping lectures throws away guaranteed achievements *and* the context that makes the assignments easier, so treat attendance as non-negotiable.\n' +
'- **Secure eight gold — that is your pass.** Gold achievements are individual assignments, two per track, **ten available** across your five tracks. You need **eight**, so you have slack: let your two weakest tracks’ gold go if you must, but never drift below eight, because eight gold *is* the 6 that completes the semester. Do them steadily, sprint by sprint, not in an end-of-term panic.\n' +
'- **Climb with platinum — but only where it aligns.** Each platinum is harder and weighs more; eight of them turn your 6 into a 10. Choose platinum assignments that overlap work the **game needs anyway** ([[f1-04]]) so the achievement and the build pull the same way. A platinum bolted on as "extra" is the classic over-scope trap ([[04-01]]).\n' +
'- **Mine the seams.** Because gold and platinum are spread across all five tracks, one strong artefact — a vertical-slice mechanic, say — can be the deliverable for assignments in more than one track. A versatile dev spots these overlaps that pure specialists miss.\n\n' +
'Two cautions. First, **the game is the other 50%** — chasing personal achievements while the team build slips is a bad trade, because half your grade is the shipped game and your contribution to it ([[02-01]]). The best platinum is often the one earned *by* doing the work the team needed. Second, **diminishing returns are real**: once your eight gold are safe, a ninth gold does almost nothing, while turning a gold into a platinum moves you up the 6→10 line. Always ask: *what single change lifts my grade most for the least hours, without hurting the ship?*\n\n' +
'Use the planner below to tick your real targets — it counts your gold toward the 6 and your platinum toward the 10, and names the cheapest next step.',
    task:
'Draft a one-page **achievement plan**, then verify it in the planner above. (1) Commit to **full attendance** on your tracks (the free silvers) and note any track you might skip. (2) Choose the **eight gold** assignments you will lock to clear a 6, and name which two of the ten you would drop. (3) Decide how many **platinum** you will realistically reach for, tying each to project work it is already part of (so it is not extra scope). (4) Identify one artefact that could satisfy assignments in **two or more** tracks (a seam). (5) Write the single sentence stating your priority rule when the team build and a personal achievement compete for the same hour.',
    success: [
      'You treat attendance as free silvers and lock eight gold as the pass before reaching for platinum.',
      'You tie each platinum target to work the game needs anyway (no bolt-on scope) and can name a cross-track seam.',
      'You can explain why, once eight gold are safe, converting a gold to a platinum beats a ninth gold — and have a clear “game-first” priority rule.'
    ],
    skills: ['Sequencing gold then platinum', 'Aligning grade with the build', 'Spotting cross-track seams'],
    simplified: 'This is a general strategy, not a guaranteed optimisation — the right moves depend on your minor’s real assignment list and any rules about spreading across tracks. The planner’s 6-and-10 anchors are the course’s stated thresholds; the in-between scaling is illustrative. Confirm the binding rubric.',
    goDeeper: 'Once you have the real achievement list, run this exercise against it with your team, and read [[04-01]] on cutting scope — the same prioritisation logic governs both your grade and your game.',
    quiz: [
      { q: 'Why is attending every lecture the easiest grade win in this minor?', a: 'Because silver achievements are earned purely by attendance — attend all of a track’s lectures and that silver is yours for free. Skipping lectures throws away guaranteed achievements and the context that makes the gold/platinum assignments easier.' },
      { q: 'You already have eight gold locked. Is a ninth gold or a first platinum the better use of an hour?', a: 'The platinum. Eight gold already secures the 6, so a ninth adds essentially nothing, whereas platinum is what moves you up the 6→10 line. Once the floor is safe, convert toward platinum — ideally on work the game needs anyway.' },
      { q: 'A teammate needs help to keep the build on track, but you could spend that hour on a personal platinum. What does the strategy say?', a: 'Usually help the team. Half your grade is the group game and your contribution to it, so a personal achievement earned while the build slips is often a bad trade — and the strongest achievements are frequently the ones earned by helping the team ship.' }
    ],
    tags: ['strategy', 'achievements', 'prioritisation', 'gold platinum', 'attendance', 'grading'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
