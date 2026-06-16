/* Pillar 0 · Phase 02 · Module 02a — Communication & critique */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '02-01', title: 'Roles, ownership and handoffs in an eight-person team', pillarId: '0', phaseId: '02', moduleId: '02a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'The minor puts you on an **eight-person team** building **one game**. Eight people is small enough that everyone matters and big enough that *who owns what* stops being obvious. The single biggest source of friction on a student team is not skill — it is **unclear ownership**: two people quietly building the same system, or a thing nobody thought was theirs sitting undone until the sprint review.\n\n' +
'**Ownership** means one named person is accountable for a slice of the game — the player controller, the tutorial level, the enemy art, the GDD. Owning it does not mean doing it all alone; it means *it is your job to make sure it happens and stays coherent*. Decisions inside that slice are yours to drive (with input); decisions that cross slices need a conversation. A good rule: **every deliverable has exactly one owner, never zero and never two.**\n\n' +
'A **handoff** is the moment work crosses a seam between owners — the storyteller hands a beat to the designer, the designer hands a feature to a programmer, the modeller hands a prop to the level designer. This is the pipeline you met in [[00-04]], now staffed by real people. Handoffs are where things break: an asset arrives at the wrong scale, a feature spec is too vague to build, a level assumes a mechanic that was cut. A clean handoff carries three things — *what it is, what it assumes, and what "done" means* — so the receiver is not guessing.\n\n' +
'You chose **five role-tracks** to become solo-capable, but on a team you still hold **one primary seat** and assist across the others. That breadth is a superpower here: a person who understands the receiving end of a handoff makes cleaner handoffs. Knowing what the programmer needs from your model ([[d5-04]]), or what the level designer needs from your mechanic, removes whole categories of friction. Ownership plus breadth is how eight people move like one.',
    task:
'Write a one-page **ownership map** for an imagined eight-person team building a small game. List 8–12 concrete deliverables (player controller, core loop spec, one level, the enemy, UI, music, the GDD, the build/version control, etc.) and assign each **exactly one owner** from eight named seats. Then circle three **handoffs** between owners and, for each, write the *what / assumes / done* the sender must carry. Flag any deliverable you found hard to give a single owner — that ambiguity is exactly what causes friction.',
    success: [
      'You can state why every deliverable needs exactly one owner — not zero, not two.',
      'You can describe a clean handoff as carrying what-it-is, what-it-assumes, and what-done-means.',
      'You can point at a seam in the pipeline and name who owns each side of it.'
    ],
    skills: ['Ownership mapping', 'Clean handoffs', 'Team seams'],
    simplified: 'Real teams blur these lines constantly — pairs co-own, owners change between sprints, and a producer may hold the map. "One owner per deliverable" is a discipline to start from, not a rigid law.',
    goDeeper: 'For ownership and accountability on creative teams, the RACI matrix (Responsible / Accountable / Consulted / Informed) is the classic framework; most game-studio postmortems on sites like Gamasutra/Game Developer cite communication and ownership, not tech, as the thing that hurt them.',
    quiz: [
      { q: 'Two teammates discover in the sprint review that they both built an inventory system. What went wrong and how do you prevent it?', a: 'A deliverable had two owners instead of one, so the work was duplicated and now must be reconciled. Prevent it with an explicit ownership map where every system has exactly one named owner, and a quick standup habit of saying what you are about to start.' },
      { q: 'Why does being cross-trained in five roles make you a better teammate even though you hold one seat?', a: 'Because you understand the receiving end of your handoffs — what the programmer needs from your model, what the level designer needs from your mechanic — so you deliver work in the shape the next person can actually use, removing friction at the seams.' }
    ],
    tags: ['team', 'ownership', 'handoffs', 'collaboration', 'roles'] },
  {
    id: '02-02', title: 'Giving and receiving critique without drama', pillarId: '0', phaseId: '02', moduleId: '02a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    concept:
'On a team, your work will be criticised constantly — in design reviews, art reviews, sprint reviews — and you will criticise others. **Critique is the engine of quality**, but done badly it becomes the thing that quietly poisons a team. Learning to give and take it well is a real, trainable skill, and it is graded behaviour in any group project.\n\n' +
'The core move when *giving* critique: **separate the work from the person, and the goal from your taste.** Critique the artefact ("this jump feels floaty because there is no coyote time"), never the maker ("you are sloppy"). Anchor feedback to a **shared goal** — the design pillars, the theme, the feasibility bar — not to what you personally would have made. "This doesn’t serve our \'tense and lonely\' pillar" lands; "I’d have done it differently" does not. And be **specific and actionable**: "the contrast is too low to read the path at night" beats "the lighting is bad".\n\n' +
'A useful frame is **observation → impact → suggestion**: what you see, the effect it has on the player or the project, and one concrete idea — offered, not mandated. Lead with what *works*, too; a review that is all wounds gets defended against, not absorbed.\n\n' +
'When *receiving*, the discipline is to **treat feedback as data, not a verdict.** Your job in the room is to *understand*, not to defend: ask clarifying questions, restate what you heard, resist the urge to explain why you’re right. You own the final decision on your slice ([[02-01]]) — you may decline a note — but you owe it a genuine hearing first. Remember that **a playtester or reviewer is usually right that something is wrong and usually wrong about the fix** — value the symptom over the prescription, the same instinct you’ll use reading playtests ([[b4-04]]).\n\n' +
'Keep it low-drama by making critique **routine and frequent**. When feedback is a normal daily thing, no single note carries weight, egos stay small, and the work — not the people — stays the subject.',
    task:
'Take a piece of work you can see clearly — a level, a mechanic, or a model from a game you know, or your own. Write **three critiques** of it using the *observation → impact → suggestion* frame, each anchored to a stated goal or pillar (invent a plausible one). Then rewrite one **bad** version of each note — vague, personal, or taste-based — and label exactly what makes it worse. Finally, write two sentences on how you’d *receive* the harshest of your three notes as data rather than an attack.',
    success: [
      'Your critiques target the work and a shared goal, never the person or your taste.',
      'You can turn a vague reaction into a specific, actionable observation-impact-suggestion note.',
      'You can explain why "right about the problem, wrong about the fix" matters when receiving feedback.'
    ],
    skills: ['Giving critique', 'Receiving critique', 'Feedback framing'],
    goDeeper: 'Pixar’s "plussing" and the "Braintrust" idea from Ed Catmull’s *Creativity, Inc.* are an excellent model of candid, low-ego critique; for the receiving side, look at how design teams run structured crits where the maker stays silent and only listens.',
    quiz: [
      { q: 'A teammate’s level isn’t fun and you have to say so. What’s the difference between a useful note and a harmful one?', a: 'A useful note targets the artefact and a shared goal, is specific, and offers a concrete idea: "the long empty corridor kills the pacing pillar — try a threat or a sightline here." A harmful note attacks the person or leans on personal taste: "this is boring, I’d never design it like this." Same opinion, opposite effect.' },
      { q: 'Why is a reviewer "usually right about the problem but wrong about the fix"?', a: 'Reviewers reliably feel *that* something is off — confusion, boredom, frustration — because they experience it directly. But their proposed solution is just one guess from outside the system. Treat the reaction as a real symptom to diagnose, not a spec to implement.' }
    ],
    tags: ['critique', 'feedback', 'communication', 'teamwork', 'reviews'] },
  {
    id: '02-03', title: 'Communication: standups, async updates and documentation', pillarId: '0', phaseId: '02', moduleId: '02a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'Most team failures are communication failures wearing a technical costume. Eight people building one game generate a constant stream of small decisions, and the team’s real job between sprint reviews is to keep everyone’s mental model of the game *in sync*. Three habits do most of that work: **standups**, **async updates**, and **documentation** — each tuned to a different timescale.\n\n' +
'A **standup** is a short, daily, synchronous check-in — classically each person answers three questions: *what did I do, what will I do next, what is blocking me*. Its real value is not status reporting (your task board does that) but **surfacing blockers and collisions early** — "I’m about to touch the player controller" lets someone say "so am I". Keep it short (a few minutes a person), standing or timeboxed, and take deep problems *offline* into a smaller conversation rather than letting one issue eat the meeting.\n\n' +
'**Async updates** carry communication across time, not just place — a message in the team channel, a comment on a task, a note in the build. These matter enormously for a student team whose eight people are rarely all free at once. The discipline is **write so the reader needs no follow-up**: context, what changed, and what you need from them. A good async update prevents a meeting; a vague one ("it’s broken") creates three.\n\n' +
'**Documentation** is communication across time *and* people — including future-you. The **GDD** is the team’s shared source of truth for the game ([[01-04]]); a feature written so a teammate can build it ([[b3-03]]) is documentation; a clear commit message ([[03-03]]) and a sane README are documentation. The trap is over-documenting: a doc nobody reads or updates is worse than none, because it lies. Write the *minimum durable record* — decisions, interfaces, how to run the build — and let chat handle the ephemeral.\n\n' +
'These habits front-load the **agile rhythm** you’ll formalise next ([[02-04]]): the daily standup is literally a Scrum ceremony, and a visible board is its backbone ([[02-05]]).',
    task:
'Draft the three artefacts for one imagined work-day on your team. (1) Your **standup** answer in three crisp lines (did / next / blocked). (2) One **async update** to the team channel about a change that affects someone else — context, what changed, what you need back — written so it needs no follow-up question. (3) One short **doc entry**: capture a single decision your team "made" (e.g. "we cut double-jump to hit scope") with the *what* and the *why*, in under 60 words. Then mark which of the three is the most likely to be skipped under deadline pressure, and why skipping it hurts.',
    success: [
      'You can explain what a standup is *for* (blockers and collisions), not just its three questions.',
      'You can write an async update that needs no follow-up to act on.',
      'You can name what belongs in durable documentation versus ephemeral chat — and the cost of over-documenting.'
    ],
    skills: ['Running a standup', 'Async writing', 'Right-sized documentation'],
    simplified: 'The "three questions" standup is one common format (Scrum’s daily); many teams adapt or replace it with a board walk or an async written standup. The principle — surface blockers fast — matters more than the ritual.',
    goDeeper: 'For async writing, study how distributed teams (e.g. GitLab’s public handbook) document by default; for documentation that stays alive, the idea of "docs as the minimum durable record" is echoed in most engineering-team handbooks.',
    quiz: [
      { q: 'What is a standup actually for, if the task board already shows status?', a: 'Surfacing blockers and collisions early — what’s stuck and who’s about to touch the same thing — so they get resolved before they cost a day. Status is a side effect; unblocking and coordinating is the point. Deep problems get taken offline, not solved in the meeting.' },
      { q: 'Why can over-documentation be worse than under-documentation?', a: 'A doc that nobody reads or updates drifts out of date and starts to *lie*, sending people the wrong way with false confidence. The fix is to document only the minimum durable record — decisions, interfaces, how to build — and let chat carry the ephemeral, so the docs that exist stay true.' }
    ],
    tags: ['communication', 'standup', 'async', 'documentation', 'teamwork'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
