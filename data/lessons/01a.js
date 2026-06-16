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
'The shape is unusual on purpose. You join an **eight-person team** and, across the semester, that team builds **one game**. There are **no written exams** — you are not graded on what you can recall under timed conditions. You are graded on what you and the team **produce**: a playable game, a ((GDD)) (Game Design Document), and the evidence you each contribute. This is project-based, portfolio-style assessment, and it rewards consistent delivery over last-minute heroics.\n\n' +
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
'Instead of one big exam, this minor grades you through an **achievement portfolio**: a menu of named achievements you can earn by *doing and evidencing* work, tiered as **silver / gold / platinum**. Think of it like a game’s trophy list — your final mark is a function of *how many* and *how high* the achievements you bank, not a single score on a single day.\n\n' +
'The tiers encode **ambition and difficulty**, not just effort:\n' +
'- **Silver** — the baseline. Solid, expected, competent work that meets the brief. Earning silvers reliably is what keeps you in safe-pass territory.\n' +
'- **Gold** — work that goes beyond the baseline: deeper craft, a harder problem solved, a contribution that clearly raised the team’s game.\n' +
'- **Platinum** — standout, often risky, work: genuine excellence, leadership, or something that pushed the project somewhere it could not have gone without you.\n\n' +
'Crucially, **achievements need evidence**. Claiming "I designed the combat" earns nothing; a documented feature spec ([[b3-03]]), a playtest you ran with notes, a merged Git history, an exported game-ready asset — *that* is bankable. The portfolio is the **redundant cue** for your grade: the tier names carry meaning, but every tier must be backed by an artefact a reviewer can open and verify, never colour or claim alone.\n\n' +
'Two things follow. First, the system is **legible and plannable** — because the thresholds are published, you can read them like a quest log and decide, in week one, which achievements you are aiming for and what evidence each demands (that planning is the next lesson, [[01-03]]). Second, it rewards being **versatile**: a solo-capable dev can pick up achievements across multiple tracks — a story beat *and* a coded mechanic *and* a blocked-out level — instead of being capped by a single specialism.\n\n' +
'A caution on honesty: tiers are not bought with hours. A platinum is not "a silver I spent longer on" — it is qualitatively harder or more impactful. Padding a small task does not promote it. The diagram lets you toggle achievements on and see how silver/gold/platinum picks move you across the grade thresholds — use it to feel the shape, not as the real rubric.',
    task:
'Sketch *your* version of the achievement list as a three-column table (Silver / Gold / Platinum) with **two example achievements per tier**, drawn from the five tracks (e.g. silver: "write a one-page pitch"; gold: "run a playtest and act on it"; platinum: "ship a coded, unit-tested mechanic"). For each of your six examples, name the **one artefact** that would prove it. Then write one sentence on why evidence — not the claim — is what actually earns the tier.',
    success: [
      'You can describe what silver, gold and platinum represent (baseline vs beyond vs standout), not just their order.',
      'You can name a concrete piece of evidence for an achievement in at least three different tracks.',
      'You can explain why a platinum is qualitatively harder, not just a silver done slowly.'
    ],
    skills: ['Reading an achievement rubric', 'Tiering work by ambition', 'Evidence-thinking'],
    simplified: 'Silver/gold/platinum here are a faithful model of a tiered, achievement-based rubric; the exact tier names, how many of each you need, and how they map to a final number are programme-specific — treat the published rubric for your minor as the source of truth.',
    goDeeper: 'Look up “specifications grading” and “portfolio assessment” for the educational theory behind achievement-style marking; then map those ideas onto your minor’s actual achievement list once you receive it.',
    quiz: [
      { q: 'What separates a gold achievement from a platinum one — is it just more hours?', a: 'No. Gold goes beyond the baseline (deeper craft, a harder problem solved); platinum is standout excellence, leadership or impact that the project could not have reached otherwise. A platinum is qualitatively harder or more influential, not a silver you spent longer on.' },
      { q: 'You “designed the whole combat system” but logged no artefacts. Why might that earn nothing?', a: 'Because achievements are graded on evidence, not claims. Without a documented spec, playtest notes, a Git history or a build that shows it, a reviewer has nothing verifiable to mark — the work is invisible to the portfolio.' }
    ],
    tags: ['achievements', 'portfolio', 'grading', 'silver gold platinum', 'evidence'] },
  {
    id: '01-03', title: 'A strategy for the achievement system: where to spend effort', pillarId: '0', phaseId: '01', moduleId: '01a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'achieve',
    prereq: '[[01-02]] (the silver/gold/platinum portfolio) first',
    concept:
'A published achievement list is a **plannable system**, so plan it like one. The naive move is to grind every silver you see; the smart move is to read the thresholds and spend effort where it *moves your grade most per hour*, while keeping the team’s shipped game healthy. This is the same scope-discipline muscle you will use on the GDD ([[01-05]]) — applied to your own grade.\n\n' +
'A working strategy in four moves:\n' +
'- **Secure the floor first.** Bank the silvers that guarantee a safe pass *early*, before you chase anything shiny. A locked floor removes panic and frees you to take risks later. Many of these are by-products of doing the project properly (a pitch, a scope check, a Git history).\n' +
'- **Pick a small number of reach achievements.** Choose one or two **gold/platinum** targets that align with work the game *needs anyway* — so the achievement and the project pull the same direction, never against it. A platinum bolted onto the side as "extra" is the classic over-scope trap.\n' +
'- **Exploit the seams.** A single, well-chosen artefact can satisfy more than one achievement and more than one track at once — a vertical-slice mechanic ([[f1-04]]) can evidence design, code *and* a level beat. As a versatile dev you can mine these overlaps that pure specialists miss.\n' +
'- **Time-box and de-risk.** Front-load risky platinum attempts so a failure leaves time to recover with a solid gold; never stake your pass on an unproven reach.\n\n' +
'Two cautions. First, **the game comes first** — chasing personal trophies while the team build slips is a bad trade, because much of your grade rides on the shipped game and on collaboration ([[02-01]]). The best achievements are the ones earned *by* helping the team ship. Second, **diminishing returns are real**: the tenth silver may be worth far less to your grade than turning an in-progress gold into a platinum, or than unblocking a teammate. Read the thresholds for where the curve bends.\n\n' +
'Use the diagram to experiment: toggle a mix of silver/gold/platinum picks and watch where you land relative to the thresholds, then ask which *single* change would lift you most for the least work. That question — highest grade-impact per hour, without hurting the ship — is the whole strategy in one line.',
    task:
'Draft a one-page **achievement plan** for your imagined semester. (1) List the silvers you would lock in the first three weeks to secure a safe pass. (2) Choose **one** gold and **one** platinum reach target, and in each case name the project work it is *already* part of (so it is not extra scope). (3) Identify one artefact that could evidence **two or more** achievements at once (a seam). (4) Write the single sentence that states your priority rule when the game build and a personal trophy compete for the same hour.',
    success: [
      'You can sequence effort: floor-securing silvers first, then a small number of aligned reach targets.',
      'You can tie each reach achievement to work the game needs anyway, avoiding bolt-on scope.',
      'You can identify a single artefact that evidences multiple achievements (a seam) and state a clear “game first” priority rule.'
    ],
    skills: ['Strategic effort allocation', 'Aligning grade with the build', 'Spotting achievement seams'],
    simplified: 'This is a general strategy, not a guaranteed optimisation — the right moves depend entirely on your minor’s actual thresholds, how achievements combine into a mark, and team agreements. The interactive thresholds are illustrative, not your real rubric.',
    goDeeper: 'Once you have the real achievement list, run this same exercise against it with your team, and read [[04-01]] on cutting scope — the same prioritisation logic governs both your grade and your game.',
    quiz: [
      { q: 'Why secure the “floor” silvers early instead of immediately chasing a platinum?', a: 'A locked safe-pass removes risk and panic, which frees you to attempt ambitious gold/platinum work later without your pass hanging in the balance. Front-loading the floor de-risks the whole semester.' },
      { q: 'A teammate needs help to keep the build on track, but you could spend that hour on a personal trophy. What does the strategy say?', a: 'Usually help the team. Much of your grade rides on the shipped game and on collaboration, so a personal achievement earned while the build slips is often a bad trade — and the strongest achievements are frequently the ones earned by helping the team ship.' },
      { q: 'What is an achievement “seam”, and why do versatile devs exploit them?', a: 'A seam is a single artefact that satisfies more than one achievement or track at once — e.g. a coded, tested mechanic that evidences design, code and a level beat. A versatile dev can spot and build these overlaps, earning more per hour than a narrow specialist.' }
    ],
    tags: ['strategy', 'achievements', 'prioritisation', 'scope', 'grading', 'effort'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
