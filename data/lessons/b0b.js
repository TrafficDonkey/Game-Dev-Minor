/* Pillar B · Phase b0 · Module b0b — Game feel */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b0-04', title: 'Game feel and “juice”: why input feels good', pillarId: 'B', phaseId: 'b0', moduleId: 'b0b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'((Game feel)) is the *tactile* quality of control — the felt sense that pressing a button does something satisfying. Two games can share the exact same mechanic ("jump") and one feels like a wet sponge while the other feels crisp and alive. The mechanic is identical ([[b0-01]]); the *feel* is everything wrapped around it.\n\n' +
'Steve Swink’s book *Game Feel* breaks it into three ingredients: **real-time control** (you act and the world responds *now*), **simulated space** (objects move with believable physics — momentum, acceleration, weight), and **polish** (the layer of effects that amplifies every action). Feel lives mostly in that third layer, and that layer is what designers call ((juice)).\n\n' +
'Juice is the cheap, high-impact stuff piled onto a single input so it lands harder than it "should":\n' +
'- **Animation**: squash-and-stretch, anticipation before a hit, follow-through after a landing.\n' +
'- **Screen response**: screenshake on impact, a brief ((hit-stop)) (freezing the frame for ~50–100 ms so a blow registers), a tiny camera kick or zoom.\n' +
'- **Particles & trails**: dust on landing, sparks on a parry, a swoosh behind a swing.\n' +
'- **Audio**: a punchy, layered sound with no latency — often the single biggest contributor to feel.\n' +
'- **Timing curves**: easing in/out instead of linear motion so movement has weight.\n\n' +
'A crucial subtlety: good feel often *fakes the physics*. A jump that uses a higher gravity on the way down than the way up feels better than a "correct" parabola; coyote time (a few frames of grace after you walk off a ledge) feels fair even though it’s a lie. Feel is perceptual, not physical.\n\n' +
'For you as a multi-role dev, the payoff is that feel is a **whole-team** property and one of the highest returns on effort a small game can buy. The programmer owns responsiveness and frame-independent motion ([[e1-02]]); the 3D and VFX side own particles and trails ([[e5-04]]); audio owns the punch; the designer tunes the numbers. *Restraint matters too* — over-juicing (constant shake, blinding particles) becomes noise and hurts readability, which is the next lesson ([[b0-05]]). Juice should reward the actions that matter, not every frame.',
    task:
'Pick one **verb** from a game you own — a jump, a melee hit, a gun shot, a dash. Play it slowly and make a **juice inventory**: list every separate piece of feedback fired by that single input (animation, screenshake, hit-stop, particles, sound, camera move, controller rumble). Aim for at least six. Then pick the *one* element you think contributes most to the feel, and argue in two sentences what the action would feel like with that element removed.',
    success: [
      'You can name Swink’s three parts of game feel (real-time control, simulated space, polish).',
      'You can list several distinct juice elements stacked on a single input.',
      'You can explain why good feel often fakes the physics (e.g. asymmetric jump gravity, coyote time).'
    ],
    skills: ['Diagnosing game feel', 'Juice inventory', 'Perceptual vs physical motion'],
    simplified: 'The hit-stop range (~50–100 ms) is a typical ballpark, not a rule — tune it by hand per game; too long feels sluggish. "Coyote time" is usually a few frames, also tuned to taste.',
    goDeeper: 'Steve Swink’s *Game Feel* is the canonical text. For a fast, practical primer, search the GDC talk and the classic web piece both titled around "juice it or lose it" (Jonasson & Purho) — short demos of the same game with juice toggled on and off.',
    quiz: [
      { q: 'Two games have the identical "jump" mechanic but one feels far better. Where does the difference live?', a: 'In the polish / juice layer wrapped around the mechanic, not the mechanic itself: responsiveness, animation (squash-stretch, anticipation), audio punch, particles, screen response and the motion’s easing curves. Feel is the felt experience of an input, separate from the rule it triggers.' },
      { q: 'Why might a designer deliberately make a jump *not* obey real physics?', a: 'Because feel is perceptual. A higher gravity on descent than ascent reads as snappier and more controllable, and "coyote time" (grace frames after leaving a ledge) feels fair to the player even though it isn’t physically truthful. The goal is how it feels, not physical accuracy.' },
      { q: 'Give one reason more juice can make a game worse.', a: 'Over-juicing — constant screenshake, blinding particles, effects on every frame — becomes visual noise. It buries the feedback that actually matters and damages readability, so the player can no longer tell important events from decoration.' }
    ],
    tags: ['game feel', 'juice', 'polish', 'feedback', 'fundamentals'] },
  {
    id: 'b0-05', title: 'Feedback, readability and clarity', pillarId: 'B', phaseId: 'b0', moduleId: 'b0b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'If ((juice)) is about making actions *feel* good ([[b0-04]]), **feedback**, ((readability)) and clarity are about making the game *understandable*. Juice that the player can’t parse is just noise. These two ideas are partners, and they pull in slightly different directions — which is exactly why a designer has to balance them.\n\n' +
'**Feedback** is the game answering the player. Every action and every state change should produce a perceivable response: you took damage (flash, sound, controller rumble, health bar drops), the enemy is staggered (it flinches), this door is locked (it rattles, it doesn’t open). The danger isn’t too little juice — it’s **silent failure**, where the player does something and the game says nothing, so they can’t tell if it worked, if they hit, or *why* they died. Unexplained outcomes feel unfair even when the rules are fair.\n\n' +
'**Readability** is whether the player can instantly *read* the game state from the screen: what’s a threat, what’s interactive, where the floor is, whose attack is incoming. It’s built from **visual hierarchy** — the most important things are the loudest (contrast, motion, size, position), and decoration stays quiet. This is the seam to level design’s sightlines and composition ([[c1-03]]) and to guiding the player ([[c1-04]]): both are readability at the level scale.\n\n' +
'Three working principles:\n' +
'- **Telegraphing**: a fair threat announces itself before it lands — a wind-up animation, a flash, a sound — so reacting is a skill, not a coin flip. This is the readability side of stakes and tension ([[a0-04]]).\n' +
'- **Signal vs noise**: reserve your loudest feedback (big shake, bright flash) for the events that matter most. If everything shouts, nothing is heard.\n' +
'- **Redundant cues**: never let *colour alone* carry meaning. Roughly 1 in 12 men has some colour-vision deficiency, so pair colour with shape, icon, position or text — a red *spiky* threat marker, not just a red dot. This is an accessibility baseline, not a nicety.\n\n' +
'Clarity is cheap insurance: a small game that reads instantly feels more professional than a flashy one the player can’t follow. When you playtest ([[b4-03]]), confusion is the bug you’ll see most — and it’s usually a feedback or readability failure, not a fun failure.',
    task:
'Take a screenshot (or a clear memory) of one busy moment from a game — a combat scene, a crowded HUD. Do a **readability audit**: (1) list the three things the player most needs to read in that instant; (2) for each, name the visual cues that make it stand out (contrast, motion, size, position, icon); (3) find one case where *colour alone* carries meaning and propose a redundant cue (shape/icon/text) to back it up. Then name one piece of feedback that’s **missing** — an action or state with no clear response — and say what you’d add.',
    success: [
      'You can tell feedback (the game answering an action) apart from readability (reading the current state).',
      'You can spot a silent-failure case and propose the response that fixes it.',
      'You can apply signal-vs-noise and add a redundant cue wherever colour alone carries meaning.'
    ],
    skills: ['Feedback design', 'Visual hierarchy & readability', 'Telegraphing', 'Accessible redundant cues'],
    simplified: 'The "~1 in 12 men" figure for colour-vision deficiency is a commonly cited approximate prevalence (about 8%); it varies by population and is far lower in women. Treat it as a reason to add redundant cues, not an exact statistic.',
    goDeeper: 'For visual hierarchy and signal/noise, any "game UI/UX" or "readability" GDC talk is gold; for accessibility baselines, the Game Accessibility Guidelines (gameaccessibilityguidelines.com) cover colour, telegraphing and feedback in practical, free detail.',
    quiz: [
      { q: 'What’s the difference between feedback and readability?', a: 'Feedback is the game responding to a specific action or state change (you hit, you got hurt, the door is locked). Readability is whether the player can instantly read the current game state from the screen — what’s a threat, what’s interactive, where to go. One answers "what just happened?", the other "what’s going on right now?".' },
      { q: 'A playtester dies and complains it was "unfair", but the rules were fair. What’s the likely real problem?', a: 'A feedback or readability failure — usually missing telegraphing. If the lethal threat didn’t announce itself (wind-up, flash, sound) or the player couldn’t read it among the noise, the loss feels arbitrary even though the rules are fair. Add a clear tell before the hit lands.' },
      { q: 'Why is it unsafe to use colour as the only way to mark danger?', a: 'Because a notable share of players (around 8% of men) have some colour-vision deficiency, so a colour-only cue is invisible or ambiguous to them. Pair colour with a redundant cue — a distinct shape, icon, position or text label — so the meaning survives without the colour.' }
    ],
    tags: ['feedback', 'readability', 'clarity', 'telegraphing', 'accessibility', 'ux'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
