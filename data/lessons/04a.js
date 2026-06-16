/* Pillar 0 · Phase 04 · Module 04a — Scope it to fit */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '04-01', title: 'Choosing and cutting scope for a feasible eight-person semester', pillarId: '0', phaseId: '04', moduleId: '04a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    diagram: 'scope',
    concept:
'**Over-scoping is the number-one reason student games fail.** Not bad art, not weak code — *too much game for the time and team*. The minor knows this, which is why your GDD is graded on **complexity vs feasibility** ([[01-05]]), not on raw ambition. So before you fall in love with an idea, learn to size it.\n\n' +
'Start from the constraints, not the dream. You have **roughly one semester** and **eight people**, but eight people is not eight times the output — coordination, handoffs and integration eat into it ([[02-01]]). Some weeks are reviews, sprints and the expo ([[01-06]]), not building. A realistic rule of thumb: whatever you think you can build, **plan for about half**, and keep the other half as a "if we have time" wish-list. Plans slip; a buffer is not pessimism, it’s professionalism.\n\n' +
'The tool that saves you is the **vertical slice**: one small, *complete* piece of the game — one mechanic, one short level, one enemy, one beat of story — polished until it feels finished, rather than ten systems all at 40%. A finished slice proves the game is fun and gives the team something to rally around ([[f1-01]]). Breadth is where projects drown; depth is where they shine.\n\n' +
'When you cut, cut **content before systems** (fewer levels, not a worse core loop), cut **features that don’t serve your design pillars**, and protect the **core loop** ([[b0-02]]) at all costs — it’s the thing players actually do. A useful question for every feature: *"Does this earn its build time?"* Map features against **value** (how much it matters to the experience) versus **cost** (how long to build and integrate). Build high-value/low-cost first; the bottom-right quadrant — expensive and marginal — is where you say no.\n\n' +
'Cutting scope isn’t failure or lack of vision. **It’s the central design skill of small-team development**, and it shows up again when you draft and trim your own GDD ([[f0-03]]) and when you pick a genre that fits your scope ([[b5-02]]). The smaller game you actually ship beats the huge one you don’t.',
    task:
'Take a game idea (yours, or invent one in two sentences) and run a **scope triage**. (1) Write a one-line **core loop** — the thing the player does over and over. (2) List **8–10 features** you imagine it having. (3) Plot each on a value-vs-cost grid: tag it `high`/`low` value and `high`/`low` cost. (4) Circle the **vertical slice** — the smallest complete subset (one loop + the minimum around it) that would still feel like a real game. (5) Write the two sentences you’d say in a sprint review to justify cutting the most expensive low-value feature. Be honest about cost: most beginners under-estimate by half.',
    success: [
      'You can explain why over-scoping, not quality, is the main student-game failure.',
      'You can separate a core loop from optional content, and protect the loop when cutting.',
      'You can use a value-vs-cost judgement to decide what to build first and what to drop.',
      'You can describe a vertical slice and why a finished slice beats many half-features.'
    ],
    skills: ['Scope triage', 'Value-vs-cost prioritisation', 'Defining a vertical slice', 'Cutting without losing the core'],
    simplified: 'The "plan for half" and value/cost quadrant are practical heuristics, not exact formulas — every team and game differs. Treat them as a starting discipline, then calibrate with your own sprint velocity once you have a few weeks of real data.',
    goDeeper: 'For the mindset, look up GDC talks and postmortems on student and small-team scoping (search "scope" plus "postmortem"); the recurring lesson is identical across them. The classic short read is the "vertical slice" concept as used in studio pre-production.',
    quiz: [
      { q: 'Your team is behind. Do you cut a level or simplify the core combat mechanic? Why?', a: 'Cut the level. Content (levels, enemies, areas) is far cheaper to remove than systems, and removing one level doesn’t damage the experience the way a weakened core loop does. Protect the loop — it’s what players actually spend their time doing — and trim breadth instead.' },
      { q: 'Why is a polished vertical slice worth more than ten half-finished systems?', a: 'A finished slice proves the game is actually fun, can be shown and playtested, and gives the team a concrete target and morale boost. Ten systems at 40% prove nothing, can’t be tested as an experience, and tend to all fail integration at once near the deadline.' },
      { q: 'A feature is high-value but also high-cost. What do you do with it?', a: 'Don’t reject it outright, but don’t build it first. Schedule it after the high-value/low-cost work, look for a cheaper version that captures most of the value, and treat it as a candidate to cut if the buffer runs out. The hard "no" is reserved for low-value/high-cost features.' }
    ],
    tags: ['scope', 'feasibility', 'vertical slice', 'prioritisation', 'core loop', 'foundations'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
