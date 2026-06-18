/* Pillar C · Phase c1 · Module c1a — Blockout */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c1-01', title: 'Blockout / greyboxing: build the level in grey first', pillarId: 'C', phaseId: 'c1', moduleId: 'c1a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 35,
    concept:
'A ((blockout)) (also called *greyboxing* or *whiteboxing*) is the level built in plain grey shapes — boxes, ramps, blocking volumes — with **no art, no textures, no lighting**. It exists to answer one question before anyone spends a day modelling: *does the space play well?* You test movement, distances, sightlines, pacing and encounter spacing while everything is still cheap to move. Pushing a grey wall takes seconds; moving a finished, textured, lit wall can cost hours and break three other people’s work.\n\n' +
'Grey is the point, not a placeholder you tolerate. Stripping out colour and detail forces you — and your playtesters — to judge the *space and the play*, not the prettiness. A blockout that is fun in grey will be fun when art lands; a blockout that is boring in grey will not be saved by textures. This is why the level designer almost always blocks out **before** the 3D artist builds the real geometry — the seam runs blockout → modular kit ([[d5-01]]) → final art, and the kit’s grid is usually chosen to match the blockout.\n\n' +
'Build to a **grey-box scale** that matches your real metrics: a door the player can fit through, a jump they can actually clear, a corridor wide enough for combat. Use a known unit — a `1×1×2`m human-sized reference block — and measure everything against it. Get player **traversal metrics** (run speed, jump height, reach) locked early, because the whole level is built to them.\n\n' +
'Scope warning: a blockout tempts you to keep adding rooms because grey boxes are so cheap to place. Resist it. Block out the *smallest space that proves the idea* — one good room beats five grey ones nobody will polish. The blockout is where over-scoping is cheapest to catch, so catch it here, not after the art pass ([[c4-02]]).',
    task:
'Block out one small interior space — an entrance, a fight room, and an exit — on paper or in any free 3D/grid tool you have. Place a human-sized reference box and build everything to its scale. Annotate three things on your blockout: the **player path** (entrance → goal), one **sightline** you want the player to get on arrival, and one **cover or blocking** piece. Keep it grey and keep it to three connected spaces — no more.',
    steps: [
      'Set your unit: decide 1 grid square = 1 metre, and drop a `1×1×2`m reference box for the player’s body. Everything measures against it.',
      'Lock rough traversal metrics first: e.g. walk ≈ 4 m/s, jump clears ≈ 1m up / 2m across, door ≥ 1m wide / 2m tall. Write them on the page — the level is built to these numbers.',
      'Block the **shell**: floor, outer walls, ceiling height. Use simple boxes; no bevels, no detail.',
      'Block the **path**: entrance, the route to the goal, the exit. Walk it in your head — is anything too long, too cramped, a dead end?',
      'Block the **gameplay geometry**: cover, ledges, the one piece that creates the encounter or puzzle. Place it, don’t decorate it.',
      'Frame **one intentional sightline**: stand at the entrance, make sure the player’s eye lands on the goal or a hook (the seam to [[c1-03]]).',
      'Grey-test it: imagine (or, in an engine, actually walk) the space. Mark anything that feels wrong and *move the grey box* — that is the whole point of doing this in grey.'
    ],
    success: [
      'Your space is built to a stated, human-sized scale with a reference block.',
      'You can point to the player path, one deliberate sightline, and one gameplay piece.',
      'You kept it to a small, provable space instead of sprawling because grey is cheap.'
    ],
    skills: ['Greyboxing a space', 'Building to traversal metrics', 'Testing play before art'],
    diagram: 'blockout',
    simplified: 'The traversal numbers (run speed, jump height) are illustrative defaults — every game tunes its own, and you set yours from your prototype, not from these figures.',
    goDeeper: 'Search GDC talks on "blockout" and level-design metrics; many studios publish their grey-box scale blocks and metric guides. The principle is engine-agnostic — only the box-pushing tool changes. In **Godot 4.x** you greybox with **CSG** nodes (`CSGBox3D`, `CSGCombiner3D`) for quick volumes and **GridMap** for snapping modular boxes to a grid; the same idea elsewhere uses ProBuilder (Unity) or BSP/geometry brushes (Unreal). You can also block out in Blender and import the `.glb`.',
    quiz: [
      { q: 'Why block out in plain grey instead of just building the level with rough art?', a: 'Grey forces you and your testers to judge the space and the play, not the looks, and grey boxes are cheap to move so you can iterate fast. A level that is fun in grey will be fun with art; one that is dull in grey won’t be rescued by textures.' },
      { q: 'Why lock player traversal metrics (run speed, jump height, reach) before building much?', a: 'Because the whole level’s geometry — corridor widths, gap sizes, ledge heights — is sized to those metrics. If they change later, every distance you built is suddenly wrong, so you pin them down first and build everything to them.' }
    ],
    tags: ['blockout', 'greybox', 'level design', 'metrics', 'scope'] },
  {
    id: 'c1-02', title: 'Pacing and flow: tension and release', pillarId: 'C', phaseId: 'c1', moduleId: 'c1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'**Pacing** is how a level controls the rhythm of *effort and rest* over time, and **flow** is how smoothly the player moves through it. A great level is not relentless — it breathes. Stretches of **tension** (combat, a hard platforming run, a chase) are followed by **release** (a quiet corridor, a view, a save point, a moment to loot). Plotted over time, the intensity should look like a wave, not a flat line and not a single endless spike.\n\n' +
'This is story structure made spatial. The four-beat shape — setup, conflict, escalation, resolution ([[a0-02]]) — is exactly the pacing curve of a good level: a calm intro, a first threat, rising rooms and a mini-climax, then a breather. The level designer delivers a dramatic arc *without writing a word*, which is the seam where story and level design meet ([[c0-02]]). Players "read" escalation through difficulty, density and spectacle far more than through cutscenes.\n\n' +
'Two failure shapes recur. The **flat line** — every room the same intensity — reads as monotony, even if each room is individually fine; this is the level-design version of a sagging middle. The **endless spike** — wall-to-wall combat with no rest — exhausts the player and erases the contrast that makes tension *feel* tense. Tension only registers against release; without quiet, the loud stops landing.\n\n' +
'Flow is the other half: a level flows when the player rarely stops, gets lost, or backtracks pointlessly. Dead ends, confusing junctions and unclear goals break flow and dump the player out of the experience. You preserve flow by guiding them ([[c1-04]]) and by composing what they see ([[c1-03]]) so the next objective reads naturally.\n\n' +
'Practically, **rest beats are deliberate design, not gaps**. A vista after a hard fight, a safe room before a boss, a downhill stretch after a climb — these are placed on purpose to reset the player and reload the tension. Scope note: you do not need many beats; even a five-minute level wants one clear up, one clear down.',
    task:
'Take a level you know well (or your blockout from [[c1-01]]) and draw its **intensity-over-time curve** — a simple line, time on the x-axis, "how hard/tense" on the y-axis. Mark each tension peak and each release valley, and label what creates each one (an encounter, a climb, a vista, a save room). Then find one stretch that is too flat or too spiky and write one sentence on the beat you would add or cut to fix the rhythm.',
    success: [
      'You can plot a level as a tension-and-release curve, not a flat line.',
      'You can name what creates each peak and each valley in spatial/encounter terms.',
      'You can connect a level’s pacing to the setup-conflict-escalation-resolution arc.'
    ],
    skills: ['Pacing as a curve', 'Designing rest beats', 'Flow vs friction'],
    diagram: 'blockout',
    goDeeper: 'Look for "anatomy of a level" and level-pacing GDC talks; designers often show the literal intensity graph they paced a level against. Kremers’ *Level Design: Concept, Theory & Practice* is a solid book-length treatment.',
    quiz: [
      { q: 'A playtester says your level is "exhausting" even though every encounter is fun on its own. What is the pacing problem?', a: 'It is an endless spike — wall-to-wall tension with no release. Tension only feels tense against rest, so without quiet beats the contrast disappears and the player just gets worn down. Add deliberate rest beats (a vista, a safe room, a calm corridor) between the peaks.' },
      { q: 'How does a level designer deliver story escalation without any cutscene or dialogue?', a: 'By escalating difficulty, enemy density and spectacle through the space — calm intro, first threat, harder rooms, a climax, then a breather. Players read that rising-and-falling intensity curve as a dramatic arc, which is the same setup-conflict-escalation-resolution shape a writer uses.' }
    ],
    tags: ['pacing', 'flow', 'tension', 'rhythm', 'level design'] },
  {
    id: 'c1-03', title: 'Sightlines and composition: where the eye goes', pillarId: 'C', phaseId: 'c1', moduleId: 'c1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'A ((sightline)) is what the player can see from a given spot, and **composition** is how you arrange a space so their eye lands where you want it. Because the player controls the camera, you cannot *frame* a shot the way film does — but you can shape the geometry, light and contrast so the eye is *drawn* to the right thing. This is the quiet craft that makes a level feel guided without a single arrow on screen.\n\n' +
'A handful of reliable tools move the eye:\n' +
'- **Leading lines** — corridors, railings, beams, the edge of a path — point toward the goal. The geometry itself becomes an arrow.\n' +
'- **Contrast and value** — the eye goes to the brightest or most different thing in view. A pool of light, a saturated colour against grey, a moving element all pull attention (the seam to light and mood, [[c3-01]]).\n' +
'- **Framing** — an archway, a window, a gap in rubble isolates the important thing and says "look here".\n' +
'- **Landmarks** — a tall, distinct silhouette (a tower, a glowing door) gives the player a fixed point to navigate toward across a big space.\n\n' +
'The other half is **hiding** what the player should not see yet. A good sightline reveals the next goal but conceals the surprise — the ambush around the corner, the drop you only notice when you commit. You control reveals by breaking sightlines with walls, height changes and dog-legs, then *opening* them at the moment you want the payoff. This is how a level builds tension spatially ([[c1-02]]) and how it sets up a fair encounter ([[c2-03]]).\n\n' +
'Two practical cautions. First, **colour and brightness are cues, but never the only cue** — about 1 in 12 men has some colour-vision deficiency, so back a "look here" highlight with shape, motion, framing or a distinct silhouette, not hue alone. Second, you compose all of this *in the blockout* ([[c1-01]]) — sightlines are a geometry decision, not a lighting afterthought, even though light sharpens them later in the engine ([[c4-02]]).',
    task:
'Pick one spot in a level (or in your [[c1-01]] blockout) where the player first arrives, and design its **arrival sightline**. Name: (1) the one thing you want them to notice first and the tool you use to draw the eye to it (leading line, contrast, framing, or landmark), (2) one thing you deliberately hide from this vantage and how you break the sightline to hide it, and (3) a non-colour backup cue for your main highlight so it still reads for a colour-blind player.',
    success: [
      'You can name at least three tools that draw the player’s eye and use one deliberately.',
      'You can design a sightline that reveals the goal while hiding a surprise.',
      'You always pair a colour/brightness cue with a redundant non-colour cue.'
    ],
    skills: ['Composing sightlines', 'Leading the eye', 'Controlling reveals'],
    diagram: 'blockout',
    simplified: 'The "1 in 12 men" figure for colour-vision deficiency is the commonly cited rough rate (about 8%); the exact number varies by population and condition — treat it as "plan for it", not a precise statistic.',
    goDeeper: 'Study composition fundamentals (leading lines, value, framing) from any art/cinematography source, then watch level-design breakdowns of games praised for guiding players "invisibly" to see the same tools used in 3D space.',
    quiz: [
      { q: 'You can’t frame a shot because the player owns the camera. How do you still control where their eye goes?', a: 'You shape the space itself: leading lines (corridors, railings, beams) point toward the goal, contrast and light pull the eye to the brightest/most different thing, framing (an archway or window) isolates it, and a distinct landmark silhouette gives a fixed point to head for. The geometry and light do the directing.' },
      { q: 'Why must a "look here" highlight use more than just colour or brightness?', a: 'Because roughly 1 in 12 men has some colour-vision deficiency, a hue-only or brightness-only cue can be invisible to them. Back it with a redundant cue — shape, motion, framing, or a distinctive silhouette — so the guidance reads for every player.' }
    ],
    tags: ['sightlines', 'composition', 'leading lines', 'readability', 'accessibility'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
