/* Pillar B · Phase b4 · Module b4b — Playtest */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b4-03', title: 'Playtesting: watching, not asking', pillarId: 'B', phaseId: 'b4', moduleId: 'b4b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'A prototype answers "could it be fun?"; a **playtest** answers "is it fun *for someone who isn’t me*?" The single most important rule of playtesting is counter-intuitive: **watch what players do, don’t trust what they say.** Players are generous, polite, and unreliable narrators of their own experience. They will tell you they "liked it" to spare your feelings, blame *themselves* for a confusing UI ("I’m just bad at games"), and invent rational-sounding reasons for choices they made on instinct. Their *behaviour*, though, is honest.\n\n' +
'So the playtest is an **observation session**, not an interview. You set a tester loose on the build and you *watch*: Where do they hesitate? What do they try that you never intended? Where do they die, quit, or sigh? Do they find the door you thought was obvious? The gold is in the **friction** — the moments the player struggles — because that is where your design assumptions are wrong. A tester getting stuck is not a tester being stupid; it is your level or your tutorial failing, and you just got that for free.\n\n' +
'The cardinal sin is **helping**. The instant you lean over and say "oh, you have to press the *other* button," you have destroyed the data — because the real player at home will have no one to lean over. **Shut up and take notes.** Sit on your hands. Let them be confused; the confusion *is the result*.\n\n' +
'Set this up cheaply and early. You do not need a lab — you need one person who has not seen the game, a build (even a paper prototype, [[b4-02]]), and a way to capture what happens (notes, or a screen recording). Give a one-line goal ("see how far you get") and then go quiet. Watch for the gap between your **intended** experience and the **observed** one; closing that gap is the whole job. This is the same discipline as receiving critique without arguing ([[02-02]]) — and it feeds straight into deciding what to actually change ([[b4-04]]).',
    task:
'Run one **silent playtest** of any small game or paper prototype with one person who hasn’t seen it. Give a single one-line goal, then say nothing else and *do not help*. As they play, write a running log of **observations only** — what they did, where they paused, what they tried — with zero interpretation (write "spent 40s circling the first room", not "got confused"). Mark every point where you *wanted* to intervene; each one is a design problem. Afterwards, list the three biggest gaps between what you intended and what you observed.',
    success: [
      'You can explain why observed behaviour beats reported opinion in a playtest.',
      'You ran a session where you stayed silent and did not help, even when it hurt.',
      'Your notes record actions and friction points, not your interpretations of them.'
    ],
    skills: ['Silent observation', 'Spotting friction', 'Separating behaviour from opinion'],
    simplified: 'This focuses on early, informal, one-on-one testing — the kind a student team runs constantly. Formal usability testing (metrics, larger samples, A/B tests, telemetry) is a deeper discipline used later in production.',
    goDeeper: 'Steve Krug’s *Don’t Make Me Think* and *Rocket Surgery Made Easy* are the classic, readable sources on cheap observational testing; for the games-specific angle, search GDC talks on "playtesting" and the practice of the "silent observer".',
    quiz: [
      { q: 'A tester says "I loved it, it was great!" but you watched them rage-quit a section twice. Which do you believe, and why?', a: 'Believe the behaviour. Players routinely soften their words to be kind or blame themselves for friction, but rage-quitting twice is hard data that a section is too hard, unclear, or unfair. Treat the rage-quit as the real result and the compliment as noise.' },
      { q: 'Why is helping a stuck tester the cardinal sin of playtesting?', a: 'Because the player at home will have no one to help them. The moment you intervene you replace their genuine confusion — your most valuable data — with a guided experience no real user will get, so you stop learning where your design actually fails.' },
      { q: 'Your notes say "the player got frustrated by the bad controls." What is wrong with that note?', a: 'It records your interpretation, not what happened. "Frustrated" and "bad controls" are conclusions. A useful note states the observable behaviour — "missed the jump four times in a row, then put the controller down" — and leaves the diagnosis for later analysis.' }
    ],
    tags: ['playtesting', 'observation', 'feedback', 'iteration', 'usability'] },
  {
    id: 'b4-04', title: 'Reading feedback and deciding what to change', pillarId: 'B', phaseId: 'b4', moduleId: 'b4b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 26,
    concept:
'A playtest ([[b4-03]]) hands you a pile of raw observations and comments. The hard part comes next: **deciding what to actually change.** Beginners make two opposite mistakes — they either fix *everything* a tester complained about (and steer the game by committee into mush), or they dismiss *everything* and learn nothing. The craft is in between, and it rests on one famous rule of thumb.\n\n' +
'**Listen to the problem; ignore the proposed solution.** When a player says "you should add a double-jump here," they have done two things: reported a real *problem* (they felt stuck, or the platforming felt limp) and guessed at a *fix* (double-jump). The problem is precious data; the fix is just one untrained guess. Your job is to dig past the suggestion to the symptom underneath — *why* did this room feel bad? — and then design the right fix yourself, which is often nothing like what they proposed.\n\n' +
'Then **separate signal from noise.** One tester’s opinion is an anecdote; a pattern across several is a signal. If five of six testers stall at the same door, that door is broken — fix it. If one tester hates a thing nobody else mentions, log it and move on. Watch especially for the gap between **taste** ("I’d prefer a different art style") and **function** ("I literally couldn’t tell the floor from the wall"); function bugs are near-objective and come first.\n\n' +
'Finally, **filter every change through your design pillars and your scope.** Not every valid problem is worth fixing *now*. A change that serves your core fun ([[b1-01]]) and theme stays; a change that bloats scope for a minor gripe gets parked. Cutting and deferring is a feature, not a failure ([[b5-02]]). Triage the list into **fix-now / fix-later / won’t-fix**, and write down *why* for each — your reasoning is what makes the next playtest sharper. Then change one thing, test again. Iteration is a loop, not a verdict.',
    task:
'Take the notes from a real or imagined playtest (use your [[b4-03]] session if you ran one) and turn them into a **triage table**. For each piece of feedback, write three columns: (1) the **observed problem** stripped of any suggested solution, (2) whether it’s **signal or noise** (how many testers, taste vs function), and (3) your verdict — **fix-now / fix-later / won’t-fix** — with a one-line reason tied to your design pillars or scope. Include at least one item where a tester’s *suggested* fix is wrong but the underlying problem is real, and write the better fix you’d make instead.',
    success: [
      'You consistently extract the problem from a tester’s suggested solution.',
      'You can tell a one-off opinion (noise) from a repeated pattern (signal) and weight them differently.',
      'Every change is triaged fix-now / fix-later / won’t-fix against your pillars and scope, with a reason.'
    ],
    skills: ['Feedback triage', 'Problem-vs-solution', 'Signal vs noise', 'Scope-aware iteration'],
    simplified: 'The "listen to the problem, not the solution" maxim is a widely-shared design principle, not a law — occasionally a tester’s exact fix is the right one. The point is to evaluate it as a designer rather than implement it reflexively.',
    goDeeper: 'The "users are good at reporting problems, bad at proposing solutions" idea runs through usability writing (Krug, Nielsen) and product design generally; for the games angle, look for GDC talks on turning playtest feedback into iteration plans.',
    quiz: [
      { q: 'A tester says "add a checkpoint right before the boss." How should you treat that, step by step?', a: 'Treat the suggestion as a clue, not an order. The real signal is a problem — the run-up to the boss is punishing or repetitive. Confirm whether other testers felt it (signal vs noise), then design the right fix, which might be a checkpoint, but might instead be shortening the run-up, easing the boss, or improving readability. Listen to the pain, choose the cure yourself.' },
      { q: 'Five testers complain, but each about a different thing, and none overlaps. What does that tell you versus five complaining about the same door?', a: 'Five different one-off gripes are mostly noise — personal taste and isolated moments — so you log them and prioritise lightly. Five complaints about the same door are a strong signal of a real, reproducible problem, and that earns a fix-now. Patterns, not volume of complaints, point to what to change.' },
      { q: 'Why write down a reason for every "won’t-fix" decision?', a: 'Because your reasoning — usually "out of scope" or "doesn’t serve our pillars" — is what keeps iteration disciplined and makes the next round sharper. It records that you saw the issue and chose deliberately, so the team isn’t re-litigating settled calls or quietly letting scope creep back in.' }
    ],
    tags: ['feedback', 'iteration', 'triage', 'scope', 'playtesting', 'decision-making'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
