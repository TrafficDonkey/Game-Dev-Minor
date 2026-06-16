/* Pillar B · Phase b2 · Module b2b — Progression & reward */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'b2-04', title: 'Progression and difficulty curves', pillarId: 'B', phaseId: 'b2', moduleId: 'b2b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'**Progression** is how a game changes *under* the player over time — and there are two strands that are easy to confuse. **Player progression** is the player getting better: learning the controls, reading the systems, building skill. **Character/account progression** is the avatar getting stronger: new abilities, bigger numbers, unlocked content. A good game advances both, but they are not the same lever, and beginners often reach for *character* power when the real problem is *player* learning.\n\n' +
'The **difficulty curve** is the line that tracks challenge against time. It should *rise*, but rarely smoothly. The classic shape is a **sawtooth**: ramp up tension, then drop it for a breather, then ramp higher than before. Flat-out monotonic difficulty exhausts players; flat difficulty bores them. This is the same try-fail-try-harder escalation the storyteller uses ([[a0-02]]) and the tension-and-release the level designer paces ([[a0-04]]) — the seam is real, because *who* owns the curve shifts scene by scene.\n\n' +
'Two forces complicate the line. First, the player is *also* climbing a learning curve, so perceived difficulty = challenge − skill. As skill rises, the same encounter feels easier, so you must add challenge just to hold steady — this is exactly the **flow channel** ([[b1-02]]), kept between boredom and anxiety. Second, **power creep**: if character progression outpaces challenge, the game trivialises itself; if challenge outpaces power, it walls the player out.\n\n' +
'Common progression structures: **linear** (steady unlocks), **gated** (a skill or item check opens the next area — the *metroidvania* pattern), **branching** (the player chooses a build), and **prestige/loop** (reset for a multiplier). Each implies a different difficulty job.\n\n' +
'For scope, beware the **content treadmill**: every new tier of progression is content someone must build, balance and test. A short game with a tight, well-tuned curve beats a long one that sags. Tie progression to your verbs and core loop ([[b0-02]]), not to a wish-list of unlocks — and remember most of the curve is *tuned numbers*, which is where designer-friendly, data-driven code earns its keep ([[e3-02]]).',
    task:
'Take a game you know and **map its first hour as a difficulty curve**. Sketch (on paper or in a list) the rough challenge level scene by scene and mark the *breathers* — the deliberate dips. Then separate the two strands: list three things the **player** learns in that hour, and three things the **character/account** gains. Finally, name one moment where the curve felt wrong (a spike, a wall, or a sag) and propose a fix that changes *challenge* or *teaching*, not just the avatar’s numbers.',
    success: [
      'You can distinguish player skill progression from character/account progression and give an example of each.',
      'You can describe a difficulty curve as a rising sawtooth with deliberate breathers, not a smooth line.',
      'You can explain perceived difficulty as challenge minus skill, and connect it to the flow channel.'
    ],
    skills: ['Difficulty-curve shaping', 'Player vs character progression', 'Flow-aware pacing'],
    simplified: 'The "sawtooth with breathers" and "difficulty = challenge − skill" are deliberate working models, not formulas — real curves are tuned by playtesting, and good games bend these shapes per genre (a roguelike spikes differently from a cozy game).',
    goDeeper: 'Jesse Schell’s *The Art of Game Design* covers the flow channel and interest curves; for the learning-curve angle, Raph Koster’s *A Theory of Fun* frames difficulty as a teaching problem.',
    quiz: [
      { q: 'A playtester is breezing through your mid-game even though the enemies hit harder. What’s probably happening?', a: 'Their *skill* (player progression) has risen faster than the *challenge*, so perceived difficulty — challenge minus skill — has dropped even as the raw numbers grew. The fix is usually new kinds of challenge (new mechanics, enemy behaviours, constraints) that demand fresh learning, not just bigger health bars.' },
      { q: 'Why is a smooth, always-rising difficulty curve usually worse than a sawtooth?', a: 'A monotonic ramp gives the player no recovery, so tension never releases and fatigue sets in. A sawtooth — ramp, breather, ramp higher — lets the player exhale and resets the contrast, so the next climb reads as a genuine escalation rather than more of the same.' }
    ],
    tags: ['progression', 'difficulty curve', 'pacing', 'flow', 'scope'] },
  {
    id: 'b2-05', title: 'Rewards, motivation and the ethics of engagement', pillarId: 'B', phaseId: 'b2', moduleId: 'b2b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'A **reward** is anything the game gives back for an action — points, loot, a new ability, a sound, a fanfare, a story beat. Rewards are how a game *answers* the player, and they connect straight to feedback and game feel: a reward that isn’t felt isn’t a reward.\n\n' +
'Designers borrow a useful idea from psychology: **reward schedules**. A **fixed** schedule pays out every time or on a clock (kill ten enemies → level up). A **variable** schedule pays out unpredictably (this chest *might* hold the rare drop). Variable-ratio rewards are unusually *compelling* — uncertainty plus a payoff drives repeated action, the same uncertainty-plus-stakes that creates tension ([[a0-04]]). This is exactly why loot, crits and gacha pulls feel gripping. It is also exactly where design tips into manipulation.\n\n' +
'Split motivation into two kinds. **Intrinsic** motivation is doing the thing because the *play itself* is satisfying — mastery, curiosity, expression, the joy of the verb ([[b0-02]]). **Extrinsic** motivation is doing it for an external prize — currency, badges, a number going up. Extrinsic rewards are powerful but fragile: pile too many on top of an already-fun activity and you can *crowd out* the intrinsic joy, so the player grinds resentfully instead of playing. The richest games make the *core loop* the reward and let extrinsic layers decorate it, not replace it.\n\n' +
'Then the ethics. Some patterns deliberately exploit human reward circuitry to maximise *time and spend* rather than *fun*: **dark patterns** like artificial fear-of-missing-out timers, daily-login coercion, grind-walls that sell shortcuts, and loot boxes that monetise variable-ratio uncertainty — increasingly **regulated as gambling** in some countries (treat specifics as jurisdiction- and date-dependent, not settled). The honest test: *does this reward serve the player’s experience, or extract from them?* A student team building one game for an expo has no business shipping predatory hooks — and the minor’s feasibility framing rewards *fun*, not retention metrics.\n\n' +
'So design rewards that *amplify* a loop already worth playing, prefer intrinsic where you can, use variable rewards for delight rather than compulsion, and be able to defend every hook out loud.',
    task:
'Audit the reward systems of a game you play. List its rewards and tag each as **intrinsic** (the play is the prize) or **extrinsic** (an external prize), and tag each schedule as **fixed** or **variable**. Then find one reward you think crosses into **manipulation** (or argue the game has none) and rewrite it into an *honest* version that still motivates — same delight, no exploitation. Finish with one sentence: for your own small game idea, what is the single reward that makes the *core loop itself* feel good?',
    success: [
      'You can distinguish intrinsic from extrinsic motivation and fixed from variable reward schedules.',
      'You can explain why variable-ratio rewards are so compelling — and why that power is an ethical pressure point.',
      'You can name at least one engagement dark pattern and articulate the player-serving-vs-extracting test.'
    ],
    skills: ['Reward-schedule design', 'Intrinsic vs extrinsic motivation', 'Ethics of engagement'],
    simplified: 'Reward-schedule terms come from behavioural psychology and are simplified here for design use. Whether loot boxes count as legal gambling varies by country and changes over time — verify current rules for any jurisdiction rather than trusting a fixed claim.',
    goDeeper: 'For motivation, look up self-determination theory (Ryan & Deci) and the overjustification effect; for the design and ethics, search GDC talks on reward schedules, the work on dark patterns in games (e.g. writing by Ramin Shokrizade), and current national rulings on loot boxes.',
    quiz: [
      { q: 'Why can adding more extrinsic rewards sometimes make a fun game *less* fun?', a: 'Because heavy extrinsic rewards can crowd out intrinsic motivation (the overjustification effect): the player reframes a thing they enjoyed as something they do for the prize, so when the prize is removed — or the grind drags — the original joy is gone and it feels like work.' },
      { q: 'A teammate proposes a daily-login streak that resets if the player misses a day. What’s the ethical question to ask?', a: 'Does the mechanic serve the player’s experience or extract time/money from them? A reset-on-miss streak uses loss-aversion and FOMO to coerce attendance rather than reward play. The honest version rewards *playing when you want to* — e.g. cumulative progress that never punishes absence — so motivation comes from delight, not anxiety.' },
      { q: 'What makes variable-ratio rewards (random loot, crits) so powerful, and why is that a warning sign?', a: 'Unpredictable payoffs combine uncertainty with a real reward, which drives repeated action far more strongly than predictable ones — the same uncertainty-plus-stakes that creates tension. That very strength is why the pattern can tip from delight into compulsion, so it must be used to enrich the loop, not to trap the player.' }
    ],
    tags: ['rewards', 'motivation', 'intrinsic', 'extrinsic', 'ethics', 'engagement'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
