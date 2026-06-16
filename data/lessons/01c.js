/* Pillar 0 · Phase 01 · Module 01c — Sprints, reviews & the expo */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '01-06', title: 'Sprints, sprint reviews and the rhythm of the semester', pillarId: '0', phaseId: '01', moduleId: '01c',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'The minor isn’t one long sprint to a deadline — it runs as a *rhythm* of short, repeating cycles called ((sprints)). A sprint is a fixed block of time, usually **two weeks**, in which your eight-person team commits to a small slice of work, builds it, and shows it. Then the cycle resets. That heartbeat — plan, build, show, reflect — is the single most important habit the semester teaches.\n\n' +
'Each sprint has the same four moments:\n' +
'- **Planning** — at the start, the team pulls a handful of items off the backlog and agrees what "done" means for each. The trap is over-committing; a realistic sprint plan is honest about the eight people you actually have, not the ten you wish for.\n' +
'- **The work** — daily building, with a short standup to surface blockers (covered in [[02-03]]) and a board to make the work visible ([[02-05]]).\n' +
'- **The sprint review** — at the end, you *demo working software* to your tutors and peers. Not slides, not promises — a build someone can see run. This is where vague plans meet reality.\n' +
'- **The retrospective** — the team talks about the *process*: what went well, what to change next sprint. The review judges the product; the retro improves the team.\n\n' +
'Why does this matter so much for a versatile dev? Because the rhythm forces **integration**. If your 3D asset, your level, your mechanic and your story beat all have to appear in one demoable build every two weeks, the seams between the five roles ([[00-04]]) get tested constantly instead of in one terrifying week at the end. It also makes scope failures *cheap and early*: a feature that didn’t land in sprint 2 is a small course-correction, not a project-ender.\n\n' +
'The deeper lesson is honesty. A sprint review rewards a small thing that *works* over a big thing that *almost* works. That bias toward shippable, integrated slices is exactly the scope discipline the minor grades you on — and it’s the agile mindset you’ll formalise in [[02-04]].',
    task:
'Sketch a six-sprint plan (twelve weeks) for an imaginary tiny game your team is building. For each sprint write **one** demoable goal — a single thing a tutor could watch run at the review (e.g. "player moves and one enemy chases", "first level blocked out and walkable"). Then mark which of the five roles each goal leans on. Finally, look at sprint 1: is your first demo genuinely achievable by eight people in two weeks, or have you smuggled in a whole vertical slice? Cut it down until the answer is honestly yes.',
    success: [
      'You can name the four moments of a sprint and what each is for.',
      'You can explain why a sprint review demands a *running build*, not a presentation.',
      'You can write a sprint goal that is small, demoable and honestly achievable in the time.'
    ],
    skills: ['Sprint rhythm', 'Demoable goals', 'Review vs retro'],
    simplified: 'Two-week sprints and this four-ceremony shape are the common default; your exact minor may run one-week or three-week sprints and combine ceremonies. Treat the cadence as the idea, not a fixed number.',
    goDeeper: 'The *Scrum Guide* (Schwaber & Sutherland, free online) is the short, authoritative source on sprints, reviews and retrospectives; read it once and you’ll recognise every ceremony you do.',
    quiz: [
      { q: 'What’s the difference between a sprint review and a retrospective?', a: 'The review is about the *product* — you demo the working build to stakeholders and get feedback on what you made. The retrospective is about the *process* — the team reflects on how it worked together and picks one or two things to change next sprint.' },
      { q: 'Why does the two-week rhythm protect you against over-scoping?', a: 'Because every two weeks you must produce something that actually runs, scope problems surface early and cheaply. A feature that can’t fit becomes a small mid-project cut instead of a disaster discovered the week before the deadline.' }
    ],
    tags: ['sprints', 'scrum', 'sprint review', 'retrospective', 'rhythm'] },
  {
    id: '01-07', title: 'The expo and the Best Game Award: shipping in public', pillarId: '0', phaseId: '01', moduleId: '01c',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'The semester ends with an **expo** — a public event where every team puts its game on a screen and lets strangers, tutors, industry guests and other students *play it*. There’s usually a **Best Game Award** voted on at the event. This is the moment the whole rhythm of sprints ([[01-06]]) has been building toward: shipping in public.\n\n' +
'Shipping in public changes how you should work all semester, in three ways.\n\n' +
'**First, it sets a hard wall.** The expo date does not move. Everything in your GDD ([[01-04]]) is implicitly a promise you must keep by that date with eight people — which is exactly why the GDD is graded on complexity *versus* feasibility ([[01-05]]). A brilliant design you can’t finish makes a bad expo; a small game that’s *complete and polished* plays beautifully on the floor. The expo is scope discipline made physical.\n\n' +
'**Second, players at an expo behave nothing like your team.** They give you about *thirty seconds* before deciding whether to keep playing. They won’t read a wall of text, they’ll press every button, and they’ll do things you never imagined. This rewards a game with a strong, readable first minute and a clear core loop — and it’s why playtesting with outsiders all semester ([[b4-03]]), not just demoing to tutors, is so valuable. The expo is your final, highest-stakes playtest.\n\n' +
'**Third, the award is won on *experience*, not on technical ambition.** Voters remember how a game *felt* in two minutes — its feel, its clarity, its hook, its polish — far more than how clever its systems were under the hood. A tight, juicy, finished small game routinely beats a sprawling, half-working bigger one.\n\n' +
'For you, the takeaway is to build *toward* this from day one: a vertical slice that’s genuinely playable, and an achievement portfolio you’ve been assembling as you go ([[f2-02]]) so the expo is a celebration, not a panic. Shipping in public is the whole point — a real audience, a real deadline, a real game.',
    task:
'Imagine you have a *two-minute* slot to put your game in front of an expo stranger. Write the **first-30-seconds plan**: what the player sees, what they can do immediately, and the single moment you most want them to reach before they walk away. Then list three things you’d cut from a hypothetical over-scoped game to make sure that first 30 seconds is polished rather than rough. Finally, write one sentence on what you’d want a Best Game voter to *say* about your game afterwards — and check that your plan actually delivers that feeling.',
    success: [
      'You can explain why an immovable expo date is really a scope constraint.',
      'You can describe how expo players differ from your own team and why the first minute matters most.',
      'You can argue why a small finished game often beats a big half-finished one at the award.'
    ],
    skills: ['Shipping mindset', 'The first-minute hook', 'Polish over ambition'],
    simplified: 'The exact format — public expo, a Best Game Award, the voting method — varies by year and institution. The constant is the same: a fixed public ship date and an audience of fresh players judging the experience.',
    goDeeper: 'Watch any "how we made our student/jam game" post-mortem talk (GDC has many); the recurring lesson — finish small, polish the first minute, demo to strangers early — is exactly the expo lesson in disguise.',
    quiz: [
      { q: 'Why does an immovable expo date push you toward a smaller game?', a: 'Because the deadline can’t move but your eight-person capacity is fixed, the only variable left is scope. A finished, polished small game demos far better than an ambitious one that’s still broken on the day, so the date itself enforces feasibility.' },
      { q: 'A team has incredibly deep systems but loses the Best Game Award to a simpler game. How is that possible?', a: 'Expo voters judge the *experience* in a couple of minutes — feel, clarity, hook and polish — not the cleverness of the underlying systems. A tight, readable, finished small game gives a better two-minute experience than a deep game that’s hard to grasp or unfinished.' }
    ],
    tags: ['expo', 'shipping', 'best game award', 'scope', 'polish'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
