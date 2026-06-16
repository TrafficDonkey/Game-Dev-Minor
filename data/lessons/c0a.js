/* Pillar C · Phase c0 · Module c0a — Space as story */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c0-01', title: 'What a level designer does (and the seam to everything)', pillarId: 'C', phaseId: 'c0', moduleId: 'c0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'A **level designer** decides *where the player is and what they do there*. Not the rules (that’s the game designer), not the look of a wall (that’s the 3D artist), not the code behind a door (that’s the programmer) — but the **space, the sequence, and the pacing** that turn a bag of mechanics into an experience you move through. If the designer says "the player can climb", the level designer decides *what there is to climb, in what order, and why it’s worth it*.\n\n' +
'Concretely, the role owns: the **layout** (the shape of the space and the path through it), the **pacing** (where the tension rises and where the player breathes), **guidance** (how the player knows where to go without a giant arrow), **encounter and puzzle placement** (what challenge sits where), and the **flow** that ties it together. The level designer is the person who makes a space *playable and readable*, then *fun*.\n\n' +
'Here’s why this role sits at the centre of the five tracks: a level is where **everything lands at once**. The designer’s mechanics get exercised here ([[b0-02]]). The storyteller’s world becomes a place you stand in ([[a1-02]]). The 3D modeller’s assets get arranged into rooms — often from a modular kit the level designer helped spec ([[c3-02]], [[d5-01]]). The programmer’s systems (triggers, doors, AI spawns) are wired into the space. The level designer is a **generalist and an integrator** — which is exactly the versatile, solo-capable profile this minor is steering you toward.\n\n' +
'A crucial habit from day one: levels are built in **grey first**. You block out raw geometry — boxes for walls, ramps, cover — and make it *play* before anyone textures a thing ([[c1-01]]). This is scope discipline made physical: you prove the space is fun while it’s cheap to change, long before expensive art arrives. A level that isn’t fun grey will not be saved by pretty.',
    task:
'Pick a single level or area from a game you know well (a tutorial zone, one mission, one arena). In a short list, separate out **who owned what**: which parts are *level design* (layout, path, pacing, where challenges sit, how you’re guided), versus *game design* (the rules/verbs), *story* (what the place says), *3D art* (the look), and *code* (the systems firing). Then write one sentence on the single level-design decision that most shaped how that area *felt* to play.',
    success: [
      'You can state what a level designer owns versus the other four roles.',
      'You can explain why the level is where all five tracks converge.',
      'You can articulate why levels are blocked out in grey before they’re made pretty.'
    ],
    skills: ['Scoping the level-design role', 'Seeing the five-track seams', 'Grey-first thinking'],
    goDeeper: 'For the shape of the discipline, search out GDC "level design workshop" talks and the writing of designers who’ve documented their process; Christopher Totten’s *An Architectural Approach to Level Design* is a thorough book-length treatment.',
    quiz: [
      { q: 'A teammate says "the level designer just decorates the rooms the artist built." Why is that backwards?', a: 'The level designer shapes the *playable space* — layout, path, pacing, where challenges and guidance go — usually in grey blockout, *before* art exists. The artist then dresses a space whose play has already been proven. Decoration is the 3D/set-dressing pass, not the level designer’s core job.' },
      { q: 'Why is the level designer often described as the integrator of the team?', a: 'Because the level is where every track lands at once: mechanics are exercised, the world becomes a place, assets are arranged into rooms, and systems are wired into triggers and spawns. The level designer pulls those threads into one coherent, playable experience.' }
    ],
    tags: ['level design', 'role', 'seams', 'blockout', 'fundamentals'] },
  {
    id: 'c0-02', title: 'Spatial storytelling: reading a space', pillarId: 'C', phaseId: 'c0', moduleId: 'c0a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    concept:
'Before you can *build* a space that tells a story, you need to **read** one. Spatial storytelling is the idea that a place communicates meaning through its shape, contents and arrangement — *who was here, what happened, what to do, how to feel* — without a single line of dialogue. It’s the level designer’s native language, and it leans hard on the storyteller and 3D tracks ([[a1-02]], [[c3-03]]).\n\n' +
'A space speaks on a few channels at once:\n' +
'- **Layout and scale** — a cramped corridor and a vast cathedral say opposite things about your power and safety. Verticality, width and ceiling height set *mood* before any prop loads.\n' +
'- **Affordances** — the shapes that tell you what you *can do*: a ledge says "climb", a waist-high wall says "take cover", a glowing gap says "go here". Players read affordances faster than text.\n' +
'- **Arrangement and contrast** — a tipped chair, a barricaded door, a trail of supplies. The *story* is in the difference from "normal": a clean room with one smashed window draws the eye straight to the break.\n' +
'- **Wear and history** — scorch marks, worn paths in the grass, water stains. These imply *time and events* the player never saw.\n\n' +
'Two professional reading habits. First, **the leading line**: the eye (and the feet) follow lines, light and contrast. A good designer reads a space and asks "where does this push me, and is that where I want the player to go?" — the seam to sightlines and composition ([[c1-03]]). Second, **the gestalt of the whole**: players don’t inventory props, they take an *overall impression* in a second or two, then notice details. Read for that first impression, then for the detail layer beneath it.\n\n' +
'Reading sharpens building. When you can walk into a game space and name *why* it reads as tense, safe, abandoned or sacred, you can reproduce that on purpose in grey blockout — and know which of those cues are cheap geometry (your job) versus expensive art (the modeller’s).',
    task:
'Walk through one area of a game you own and "read" it like a detective. Write down: (1) what the **layout and scale** make you feel before you notice any detail; (2) three **affordances** the space communicates (climb here, cover here, danger there) and *how* the shape says so; (3) one piece of **implied history** (something that happened here that you never witnessed) and the visual cue that implies it. Then note which of those cues are **geometry/layout** (level-design cheap) versus **art/props** (modeller’s work) — that split is the point.',
    success: [
      'You can name the channels a space speaks through (scale, affordances, arrangement, wear).',
      'You can identify implied history from a visual cue without being told the story.',
      'You can separate cheap layout cues from expensive art cues in a space you read.'
    ],
    skills: ['Reading a space', 'Affordance literacy', 'Layout vs art cost-awareness'],
    simplified: 'The term "affordance" is borrowed (loosely) from perception and design theory; here it means the visual shapes that suggest possible actions. Different sources use it more strictly — this is the working game-design sense.',
    goDeeper: 'For environmental/spatial storytelling, look up Harvey Smith and Matthias Worch’s GDC talk "What Happened Here?"; for the perception side, Donald Norman’s *The Design of Everyday Things* on affordances.',
    quiz: [
      { q: 'A player walks into your room and immediately feels unsafe, before any enemy appears. Name two purely spatial cues that could do that.', a: 'Examples: a low ceiling and tight, twisting layout (claustrophobia, ambush angles); strong shadow and a single sightline you can’t see around; verticality that puts the player in a pit looking up. None require an enemy or a prop — scale, light and layout carry the dread.' },
      { q: 'What is an "affordance" in a level, and why does it matter to readability?', a: 'It’s a shape or feature that signals a possible action — a ledge to climb, a low wall to vault, a glowing gap to pass through. Players read affordances faster than text, so consistent, honest affordances let you guide behaviour without UI clutter or hand-holding.' }
    ],
    tags: ['spatial storytelling', 'affordances', 'readability', 'environment', 'composition'] },
  {
    id: 'c0-03', title: 'Environmental storytelling in practice', pillarId: 'C', phaseId: 'c0', moduleId: 'c0a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    diagram: 'narrative',
    concept:
'Reading a space is the input; **environmental storytelling** is the output — composing a place so it *tells* a story through arrangement rather than cutscene. It’s one of the cheapest, highest-impact narrative tools a small team has, because it lives in props and layout you were placing anyway, and it asks nothing of the player but to *look*. This is the storyteller’s seam straight into level design ([[a1-02]], [[a0-01]]).\n\n' +
'The core technique is the **environmental vignette**: a deliberately composed little scene that implies an event. The classic worked example — two skeletons slumped against a wall beside an empty bottle and a scratched message — tells you *people sheltered here, ran out of supplies, and didn’t make it*, with no words. The player assembles the story themselves, and a story you *deduce* is more vivid and more *yours* than one you’re told.\n\n' +
'Make vignettes work with a few principles:\n' +
'- **Composition and focus.** Frame the vignette so the eye lands on it — use a sightline, a pool of light, or contrast against a plain background. An un-framed vignette is invisible.\n' +
'- **Imply, don’t spell out.** Give enough to deduce a story, not so much it becomes a diorama with a caption. Trust the player; ambiguity invites engagement.\n' +
'- **Consistency builds a world.** Recurring marks — the same faction’s graffiti, the same kind of barricade — accrue into history and culture across a level ([[a2-02]]).\n' +
'- **Readable from gameplay distance and angle.** Players move; a story only readable from one precise spot will be missed. Compose for the path the player actually takes ([[c1-05]]).\n\n' +
'A scope note, because this tool *invites* over-building: environmental storytelling is most powerful in **restraint**. A handful of well-placed, well-lit vignettes beats a level crammed with clutter that drowns the signal. And know the **cost split** — the *idea and placement* are level-design cheap; bespoke story-props can get expensive, so lean on your modular kit and a few hero pieces ([[c3-02]]). Done well, a single composed corner can carry more story than a page of dialogue, for a fraction of the production cost.',
    task:
'Design **one environmental vignette** on paper (sketch or bullet list — no engine needed). State: the **story it implies** in one sentence ("someone barricaded this door, then left in a hurry"); the **3–5 elements** that compose it and their arrangement; how you **frame** it so the player’s eye lands on it (light, sightline, contrast); and how it reads **from the player’s moving path**, not just one perfect spot. Finally, mark which elements come from a **modular/standard kit** (cheap) versus a **bespoke hero prop** (expensive) — and cut to at most one hero prop. Keep it to a single corner: restraint is the lesson.',
    success: [
      'Your vignette implies a clear story without any text or dialogue.',
      'You’ve framed it (light/sightline/contrast) so it reads from the player’s actual path.',
      'You’ve respected scope: few elements, mostly kit, at most one hero prop.'
    ],
    skills: ['Composing a vignette', 'Imply-don’t-tell storytelling', 'Framing for the player path', 'Scoping story-props'],
    goDeeper: 'Harvey Smith & Matthias Worch’s GDC talk "What Happened Here? Environmental Storytelling" is the canonical reference; for the wider craft, look at how immersive-sim and survival-horror levels reward looking.',
    quiz: [
      { q: 'Why is a story the player *deduces* from a vignette often stronger than one delivered in a cutscene?', a: 'Because the player does the assembly: they notice the cues, infer the event, and arrive at the meaning themselves. That act of deduction makes the story feel discovered and personal, and it respects the player’s intelligence — whereas a cutscene hands it over and stops the play.' },
      { q: 'A level has dozens of "story" props scattered everywhere but players report it feels like noise. What’s the fix?', a: 'Restraint and framing. Cut to a handful of deliberately composed vignettes, each framed with light, sightline or contrast so the eye lands on it. A few legible, well-placed beats read as story; wall-to-wall clutter drowns the signal and reads as set-dressing nobody parses.' }
    ],
    tags: ['environmental storytelling', 'vignette', 'narrative', 'composition', 'scope', 'seam'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
