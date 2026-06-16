/* Pillar 0 · Phase 02 · Module 02b — Agile, Scrum & Kanban */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '02-04', title: 'Agile and Scrum for a student team', pillarId: '0', phaseId: '02', moduleId: '02b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'Your minor runs in **sprints** — short, fixed cycles where the team plans a chunk of work, builds it, shows it, and reflects ([[01-06]]). That rhythm comes from **Agile**, a way of working built on one honest admission: at the start of a game project, *nobody knows exactly what they are building*. You will not find the fun on paper. So instead of one giant year-long plan, Agile says **build a little, show it, learn, adjust** — over and over. For a game, where "is it fun?" can only be answered by playing it, this fits perfectly ((iteration)).\n\n' +
'**Scrum** is the most common concrete recipe for Agile, and it is almost certainly the one your minor uses. Its moving parts are small:\n\n' +
'- **Product backlog** — the full wish-list of everything the game might need, kept roughly in priority order. It is *never* finished; it changes as you learn.\n' +
'- **Sprint** — a fixed window, usually one to three weeks. The length does not change mid-project; that fixed cadence is the point.\n' +
'- **Sprint planning** — at the start, the team pulls the top backlog items it believes it can actually finish into the **sprint backlog**. Pulling, not being assigned: the team commits to what *it* judges feasible.\n' +
'- **Daily standup** — a short check-in: done / doing / blocked ([[02-03]]).\n' +
'- **Sprint review** — at the end, you demo *working* game to stakeholders (your tutors) and get feedback.\n' +
'- **Sprint retrospective** — the team, in private, asks "what should we keep, stop, start?" This is where a team actually improves.\n\n' +
'Three roles round it out: a **product owner** (guards priorities — what matters most), a **Scrum master** (guards the process — removes blockers), and the **developers** (everyone building). On an eight-person student team these are hats people wear, not separate hires ([[02-01]]).\n\n' +
'The trap to avoid: treating Scrum as ceremony for its own sake. The ceremonies exist to make work **visible**, **honest** and **small**. If a standup becomes a status report to a boss, or planning becomes wishful over-commitment, the method is being faked. Done right, Scrum is also a *scope* tool — a sprint that always over-commits is telling you the team is over-scoping, which is the single failure the minor grades hardest against ([[04-01]]).',
    task:
'Plan one realistic two-week sprint for a tiny team game on paper. Write a **sprint goal** in one sentence ("a player can walk into the test room and pick up a key"). Then list **five to eight backlog items** that serve that goal, each tagged with the track it belongs to — Story, Design, Level, 3D, Code or Team — and each small enough to finish in two weeks. Finally, write the two questions your **sprint review** demo must answer, and one thing you would put on the **retrospective** agenda before the sprint even starts (a risk you already suspect).',
    success: [
      'You can name the Scrum events (planning, standup, review, retro) and what each is for.',
      'You can explain why a fixed sprint length and a *pulled* (not assigned) backlog matter.',
      'Your sample sprint has a single clear goal and items small enough to actually finish.'
    ],
    skills: ['Sprint planning', 'Scrum roles & events', 'Sizing work to a cadence'],
    simplified: 'This is the common textbook Scrum; real teams (and your minor) bend it — some merge review and retro, run one-week sprints, or blend Scrum with Kanban ((Scrumban)). Treat it as a frame, not a rulebook.',
    goDeeper: 'The *Scrum Guide* by Schwaber & Sutherland is short, free and authoritative; for the games angle, look up Clinton Keith’s *Agile Game Development*, written specifically for studios.',
    quiz: [
      { q: 'Why is the sprint length kept fixed instead of "however long the work takes"?', a: 'A fixed cadence forces the team to size work to the time, not stretch time to the work. It creates a regular heartbeat of planning, demoing and reflecting, makes velocity measurable, and exposes over-scoping early — if you never finish a sprint, you are committing to too much.' },
      { q: 'A teammate says "the retrospective is a waste of time, let’s just build". What’s the counter-argument?', a: 'The retro is the only event aimed at improving *how the team works*, not the game itself. Skipping it means repeating the same mistakes — bad estimates, blocked handoffs, integration pain — every sprint. Fifteen honest minutes of keep/stop/start compounds across a semester.' },
      { q: 'How does Scrum double as a scope-discipline tool?', a: 'Each sprint the team pulls only what it believes it can finish, then sees what it actually finished. A persistent gap between committed and completed is hard evidence of over-scoping — the exact thing the minor grades against — so it surfaces feasibility problems while there is still time to cut.' }
    ],
    tags: ['agile', 'scrum', 'sprint', 'teamwork', 'process', 'scope'] },
  {
    id: '02-05', title: 'Kanban: visualising the work and limiting WIP', pillarId: '0', phaseId: '02', moduleId: '02b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 25,
    diagram: 'kanban',
    concept:
'Where Scrum gives you a *cadence* ([[02-04]]), **Kanban** gives you a *flow*. It is built from two simple ideas, and a small team can adopt them in an afternoon.\n\n' +
'**1. Make the work visible.** Put every task on a card, and put every card on a board with columns for the stages work passes through. A common game-team flow is **Backlog → To Do → In Progress → Review → Done**. Anyone can glance at the board and instantly read the state of the whole project — what is queued, what is being built, what is waiting on a check, what shipped. For a multidisciplinary team this is gold: a card tagged *3D* sitting in *Review* tells the level designer their asset is nearly ready to place ((handoff)).\n\n' +
'**2. Limit work-in-progress (WIP).** This is the idea most people miss, and it is the powerful one. You set a hard cap on how many cards may sit in *In Progress* at once — say three. When the column is full, you may **not** start anything new; you must first *finish* something and move it on. It feels counter-intuitive ("but I have spare time!") yet it is exactly right, because **starting work is not the goal — finishing it is.** A board with twelve things half-done has shipped nothing. A WIP limit forces the team to swarm on getting things *done*, surfaces bottlenecks (cards piling up before *Review* means review is the constraint), and kills the silent killer of student projects: a pile of 80%-finished features the night before the deadline.\n\n' +
'Kanban and Scrum are not rivals. Many teams run Scrum’s cadence *and* a Kanban board to manage the day-to-day flow within each sprint ((Scrumban)). The board is also where your **definition of done** lives — a card only reaches *Done* when it meets an agreed bar (built, reviewed, integrated, not just "works on my machine"), which ties straight into code review and pull requests ([[03-03]]).\n\n' +
'A caution on the board itself: never let colour be the *only* signal. If tracks are colour-coded, also print the track’s name or letter on the card, so a colourblind teammate reads the same board you do — a habit the [[kanban]] tool here follows deliberately.',
    steps: [
      'Open the **[[kanban]]** Sprint Board tool in this lesson. It seeds an example board across the five columns Backlog → To Do → In Progress → Review → Done.',
      'Read the **In Progress** column header: it shows a live WIP count and a text status (room to pull / at limit / over limit). The limit here is **3**.',
      'Add three or four cards of your own with the form, tagging each by track (Story / Design / Level / 3D / Code / Team). Keep each card to one finishable task, e.g. *Player controller: move + jump*.',
      'Move cards rightward — drag them, or use the ‹ / › buttons (keyboard- and touch-friendly) — until **In Progress** holds four cards. Watch the header flip to an over-limit warning.',
      'Now obey the rule: instead of starting more, move one *In Progress* card to **Review**, then **Done**, before pulling the next card from *To Do*. Feel the discipline of finishing before starting.',
      'Pseudocode the same rule a tool could enforce, so you understand what the board is doing:',
      '```\nfunction canStart(board):\n    inProgress = count(board.cards where col == "In Progress")\n    if inProgress >= WIP_LIMIT:\n        return false   // finish something first\n    return true\n```'
    ],
    task:
'Using the **[[kanban]]** board, model the *first sprint* of a tiny team game. Seed it with six to eight real cards spread across at least four tracks (you must include at least one Code, one 3D or Level, and one Team card). Drive the board for a simulated few days: pull work into *In Progress* only up to the WIP limit, push finished cards through *Review* to *Done*, and deliberately let one card pile up before *Review* so you can see a bottleneck form. Then write three sentences: which track was the **constraint** (where cards queued), what the **WIP limit forced** you to do differently, and one rule you would add to your team’s **definition of done** so a card can’t reach *Done* too cheaply.',
    success: [
      'You can explain *why* limiting WIP makes a team finish more, not less.',
      'You can read a board to spot the bottleneck — the stage where cards pile up.',
      'You can state a definition of done that prevents "done" from meaning "done on my machine".',
      'You drove the tool to over-limit and recovered by finishing rather than starting.'
    ],
    skills: ['Visualising work', 'Limiting WIP', 'Spotting bottlenecks', 'Definition of done'],
    simplified: 'Real Kanban adds metrics — cycle time, lead time, cumulative-flow diagrams — and per-column WIP limits. This lesson teaches the two core ideas (visualise + limit WIP); the measurement layer is a sensible next step once the habit is in place.',
    goDeeper: 'David J. Anderson’s *Kanban* is the canonical book; for a free start, the *Kanban Guide* and any "WIP limits explained" talk will reinforce why finishing beats starting.',
    quiz: [
      { q: 'Your board has nine cards in "In Progress" and the deadline is close. Why is that dangerous, and what does a WIP limit do about it?', a: 'Nine half-done cards is nine things that could each still fail to integrate, and zero shipped — the classic deadline disaster. A WIP limit caps how many can be open at once, forcing the team to drive cards to *Done* before pulling more, so finished, integrated work accumulates steadily instead of a last-night pile of 80%-complete features.' },
      { q: 'Cards keep piling up in the "Review" column. What is the board telling you?', a: 'Review is the bottleneck — the constraint that limits the whole flow. Work arrives faster than it can be reviewed. The fix is to relieve that stage (more reviewers, smaller cards, scheduled review time) rather than starting yet more new work upstream, which would only deepen the queue.' },
      { q: 'How do Scrum and Kanban fit together rather than compete?', a: 'Scrum supplies the time-boxed cadence — plan, demo, reflect on a fixed cycle ([[02-04]]); Kanban supplies the visible, WIP-limited flow of cards *within* that cycle. Many teams blend them (Scrumban): Scrum’s rhythm for planning and review, a Kanban board for the day-to-day movement of work.' }
    ],
    tags: ['kanban', 'wip', 'workflow', 'teamwork', 'process', 'definition of done'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
