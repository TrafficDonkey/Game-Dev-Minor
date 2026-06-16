/* Pillar 0 · Phase 01 · Module 01b — The GDD & the feasibility bar */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '01-04', title: 'The Game Design Document: what it is and why it is the spine', pillarId: '0', phaseId: '01', moduleId: '01b',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 20,
    diagram: 'gdd',
    concept:
'The ((GDD)) — Game Design Document — is the written description of the game you intend to build: what it is, how it plays, what is in it, and what is *not*. In this minor it is the **spine** of the project. It is the thing the team agrees on before building, the thing the assessors read, and the document graded on **complexity vs feasibility** ([[01-05]]). Get it right and the semester has a shared target; get it wrong and eight people build eight different games.\n\n' +
'A working GDD is not a novel and not a wishlist. Typical sections are a **one-line pitch** (the game in a sentence), **design pillars** (the three-or-so promises everything must serve), the **core loop** (the moment-to-moment verbs the player repeats — the seam to design, [[b0-02]]), the **mechanics**, the **content list** (levels, characters, assets), the **story and world** at a glance, the **art and audio direction**, the **scope and milestones**, and an explicit **out-of-scope** list. The out-of-scope list is the most under-used and most valuable part: writing down what you are *not* building is how a small team protects itself.\n\n' +
'Why a spine and not just notes? Because every role reads it differently. The storyteller takes the theme and world; the designer owns and authors most of it ([[b3-01]]); the level designer reads the content list and pillars to know what spaces to build; the 3D modeller reads the art direction and asset list; the programmer reads the mechanics to know what systems to write. The GDD is the handoff document where the five tracks meet — the pipeline ([[00-02]]) written down.\n\n' +
'Two honest cautions. First, a GDD is a **living document**, not a stone tablet: it changes as you prototype and learn what is fun. A GDD nobody updates is dead. Second, *length is not quality* — a tight ten-page GDD a team actually reads beats a fifty-page one nobody opens. You will author one for real in Pillar B ([[b3-01]]) and draft the capstone version in Pillar F ([[f0-02]]); this lesson is about knowing what it is and why it carries the project.',
    task:
'Find a small game you know well and reverse-engineer a **one-page GDD outline** for it from memory. Fill these headers with one or two lines each: *one-line pitch*, *three design pillars*, *core loop*, *key mechanics*, *content list* (what the player encounters), *art/mood*, and — most important — *out of scope* (three things this game deliberately does NOT do). The out-of-scope list is the real exercise: practise naming what a game leaves out.',
    success: [
      'You can list the main sections of a working GDD and say who on the team reads each.',
      'You can explain why the out-of-scope list protects a small team.',
      'You can articulate why the GDD is a living document, not a fixed contract.'
    ],
    skills: ['GDD anatomy', 'Out-of-scope thinking', 'Document-as-handoff'],
    simplified: 'There is no single official GDD template — sections vary by studio, engine and project. The list here is a common, practical shape, not a standard; your minor may prescribe its own headers.',
    goDeeper: 'For depth on authoring one, jump to [[b3-01]] and [[b3-02]] in the design pillar; for the GDD as a real artefact, read writing on lean one-page and one-sheet designs (e.g. Stone Librande’s "one-page designs" GDC talk).',
    quiz: [
      { q: 'Why is the GDD called the "spine" of an eight-person project?', a: 'Because every role builds from it: story, design, level, 3D and code all read it to know what to make, and the assessors grade it. It is the single shared description that keeps eight people building the same game instead of eight different ones.' },
      { q: 'What is the out-of-scope list and why does it matter so much for a student team?', a: 'It is the explicit list of things the game deliberately will NOT include. It matters because over-scoping is the number-one student-game failure — naming what you are not building protects the team’s time and makes the rest of the GDD feasible.' }
    ],
    tags: ['gdd', 'documentation', 'scope', 'pipeline', 'fundamentals'] },
  {
    id: '01-05', title: 'Complexity vs feasibility: the bar your GDD is graded on', pillarId: '0', phaseId: '01', moduleId: '01b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    diagram: 'scope',
    concept:
'Your GDD is not graded on how *ambitious* it is, and not on how *safe* it is — it is graded on the relationship between the two: **complexity vs feasibility**. Complexity is how much game you are proposing (mechanics, content, systems, polish). Feasibility is how much your team can actually finish, well, in the time and skill you have. The bar rewards a design that is **as rich as the team can credibly ship** — and punishes both a thin, trivial game *and* an over-scoped one that collapses into a buggy, unfinished mess.\n\n' +
'Picture it as a curve. Too little complexity and the game is finished but forgettable — low grade for low ambition. Push complexity up and the grade rises, because a richer, more interesting game is worth more — *as long as you can still finish it*. Past a point, feasibility falls off a cliff: the design now needs more people, more time or more skill than you have, and what you actually hand in is a fraction of the GDD, broken. The sweet spot is the **top of the deliverable curve** — the most interesting game you can still complete and polish. Over-scoping is the number-one student-game failure precisely because ambition feels free on paper and only costs you at the end.\n\n' +
'How do you judge feasibility honestly? Estimate against your *real* constraints: eight people, a fixed semester, mixed and still-growing skills, and the unglamorous truth that integration, bugfixing and polish eat far more time than first-draft features. A useful instinct: design the game so a **cut-down version still works** — a vertical slice you could ship if half the content fell away. That is what the capstone slice trains ([[f0-03]], [[f1-01]]).\n\n' +
'This is the through-line of the whole course, so internalise the move: when a feature is exciting but risky, ask "what is the smaller version that still delivers the idea?" and design *that*. Cutting scope is not failure — it is the core professional skill the minor is measuring. You will apply it concretely when you scope your first concept ([[04-01]]) and find the feasible-fun sweet spot in design ([[b5-02]]).',
    task:
'Take the one-page GDD outline you wrote in [[01-04]] (or any small game idea) and run a **feasibility pass** as if an eight-person student team had one semester. For each major feature, mark it *core* (the game dies without it), *nice* (improves it), or *cut* (over-scope). Then write the **smaller version** in two sentences: the same game with every *cut* feature gone and at least one *nice* feature traded for reliability. Notice whether the smaller version is actually still the game — if it is, you scoped well.',
    success: [
      'You can explain why both under-scoping and over-scoping score badly, and what the sweet spot is.',
      'You can sort a feature list into core / nice / cut against a real team and timeline.',
      'You can describe a smaller version of a game that still delivers its core idea.'
    ],
    skills: ['Complexity-vs-feasibility judgement', 'Feature triage (core/nice/cut)', 'Designing a cut-down version'],
    simplified: 'The complexity-vs-feasibility "curve" is a teaching model, not a measured formula — there is no exact score. Your minor’s rubric will phrase the trade-off in its own words; treat the curve as intuition, not a grading equation.',
    goDeeper: 'For scoping in practice, see [[04-01]] (cutting a first concept) and [[b5-02]] (the feasible-fun sweet spot); for why teams misjudge effort, read about the planning fallacy and look up postmortems of student or game-jam projects that over-scoped.',
    quiz: [
      { q: 'Two GDDs: one proposes a tiny, safe game that is clearly finishable; one proposes a huge, exciting game the team cannot finish. Why might both score poorly?', a: 'The first is feasible but too low-complexity — it gives up easy grade by being unambitious. The second is high-complexity but infeasible — what gets handed in is a broken fraction of it. The bar rewards the richest game the team can actually complete and polish, which is neither of these.' },
      { q: 'Why is "cutting scope" treated as a skill the minor is grading rather than a sign of failure?', a: 'Because shipping a finished, polished smaller game is harder and more valuable than starting an ambitious one that collapses. Triaging features into core/nice/cut and designing a deliverable version is exactly the professional judgement studios need, so the rubric rewards it.' }
    ],
    tags: ['scope', 'feasibility', 'complexity', 'feature triage', 'grading'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
