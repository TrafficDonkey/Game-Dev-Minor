/* Pillar F · Phase f1 · Module f1a — Build the slice (the vertical slice, all five tracks) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'f1-01', title: 'What a vertical slice is, and scoping one', pillarId: 'F', phaseId: 'f1', moduleId: 'f1a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22, diagram: 'scope',
    concept:
'A **vertical slice** is a small piece of your game built to *finished quality* — one mechanic, one short stretch of level, real art, real sound, real feel — as opposed to a *horizontal* slice that roughs out the whole game at placeholder quality. The classic phrase is "**one good minute**": a fragment so polished it could be a trailer, even though 95% of the game does not exist yet.\n\n' +
'Why does the capstone end here, after you drafted the GDD ([[f0-02]])? Because a slice is where all five tracks finally *touch the same object*. The story track supplies one beat, the design track one mechanic, the level track a small space, the 3D track one asset you made, and the programming track the code that makes the mechanic real. A slice is the smallest thing that proves you can run the **whole pipeline** ([[00-04]]) — the actual goal of being a versatile, solo-capable dev.\n\n' +
'The slice is also the single best **scope teacher** in the course. Over-scoping is the number-one student-game failure ([[04-01]]), and a slice forces the opposite discipline: you cannot fake *finished*. "One mechanic, one beat, one space" sounds tiny until you build it to quality — then you discover that even a single jump that *feels good* needs input, animation, sound, particles and tuning. Going **deep on a sliver** rather than **wide on a stub** is the lesson, and it is the same complexity-vs-feasibility bar the GDD is graded on ([[01-05]]).\n\n' +
'How to scope one honestly: pick the **core verb** of your game (the thing the player does most), choose the *single* most representative moment, and cut everything that is not that moment. No menus you can skip, no second level, no second enemy type unless the slice genuinely needs it. If you would be proud to loop those 60 seconds in front of the expo crowd ([[01-07]]), the scope is right. If you are still adding "just one more thing", it is not.',
    task:
'Take your GDD concept (or a small game idea in one sentence) and define a vertical slice for it on one page: name the **one core verb**, the **one moment** that best shows it, and exactly what each of the five tracks contributes to that moment (one line each: story beat, mechanic, space, one asset, the code). Then write a "**not in the slice**" list of at least five things you are deliberately leaving out. Open the **Scope** tool above and sanity-check that your slice sits on the feasible side.',
    success: [
      'You can explain a vertical slice as "one good minute" at finished quality, versus a horizontal placeholder pass.',
      'You can name the single core verb and the one moment your slice will showcase.',
      'You can list what each of the five tracks contributes, and what you are deliberately cutting.'
    ],
    skills: ['Vertical vs horizontal slice', 'Scoping to one moment', 'Cross-track planning'],
    simplified: 'In industry a "vertical slice" can be a substantial multi-week deliverable; here it is deliberately tiny (one mechanic, one beat) so a solo learner can actually finish it. The principle — finished quality on a narrow scope — is the same at both sizes.',
    goDeeper: 'Search GDC talks on "vertical slice" and on cutting scope for student and indie games; the recurring message is that a small thing finished beats a large thing half-built.',
    quiz: [
      { q: 'What is the difference between a vertical slice and a horizontal slice?', a: 'A vertical slice builds one small part of the game to finished quality (art, sound, feel, one polished mechanic and moment), proving the whole pipeline works on a sliver. A horizontal slice roughs out the entire game at placeholder quality. The slice goes deep and narrow; the horizontal pass goes wide and shallow.' },
      { q: 'Why is a vertical slice such a good scope-discipline exercise?', a: 'Because you cannot fake "finished". Building even one mechanic to real quality reveals how much input, animation, sound, tuning and feel a single moment actually needs, which forces you to cut everything that is not that moment, and teaches the complexity-vs-feasibility judgement the GDD is graded on.' }
    ],
    tags: ['vertical slice', 'scope', 'capstone', 'one good minute', 'feasibility'] },
  {
    id: 'f1-02', title: 'Story + design: one mechanic, one beat', pillarId: 'F', phaseId: 'f1', moduleId: 'f1a',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 24,
    prereq: '[[f1-01]] (what the slice is) and a chosen core verb first',
    concept:
'With the slice scoped, the first thing to lock is the **seam between story and design**: the *one mechanic* and the *one narrative beat* it carries. In a slice these are not two tasks — they are one decision, because the strongest slices make the mechanic and the moment say the same thing (theme through mechanics, [[a0-05]]; ludonarrative harmony, [[a1-03]]).\n\n' +
'Start from the **core verb** the slice exists to show — *open*, *climb*, *steal*, *talk down*, *repair*. A mechanic is that verb plus its rules and feedback ([[b0-01]]): what it does, when it fails, and how the game responds. Keep it to **one** mechanic with depth, not three with none. A single well-tuned grapple beats grapple-plus-dash-plus-shoot that all feel mushy.\n\n' +
'The **beat** is one unit of story the moment delivers — a small arc with setup, a turn, and a release ([[a0-02]]). It does not need a cutscene. The cheapest, strongest beats in a slice are *environmental* ([[a1-02]]) and *systemic*: a locked door and a body tell a beat; the mechanic *succeeding* is itself the climax. Decide the beat as **want meeting obstacle** ([[a0-04]]) — the player wants past the door, the mechanic is how, and the space is why it matters.\n\n' +
'Now bind them. Ask: *does performing the mechanic advance the beat?* If the verb is "earn trust" and the mechanic is "shoot everything", you have dissonance — fix one until they agree. The tightest slices pass a simple test: a stranger watching the one minute could describe both *what the player does* and *what it means* without being told either. That is the seam working.\n\n' +
'Hold scope here ruthlessly. One verb, one mechanic, one beat, one space. The slice is judged on how *finished and coherent* that single moment feels ([[01-05]]), not on how much it contains.',
    task:
'Write a one-page "slice brief" for the story+design seam. State: (1) the **core verb** in one word; (2) the **mechanic** — its rules, its fail state, and the feedback the game gives ([[b0-05]]); (3) the **beat** — setup, turn, release, and how it is delivered (environment / systems / a line or two of text, *not* a cutscene); (4) one sentence proving the mechanic and the beat say the same thing. Then write the "stranger test": the single sentence a silent observer should be able to say after watching the moment.',
    success: [
      'You have exactly one mechanic and one beat, each described concretely (rules, fail state, feedback; setup, turn, release).',
      'You can show that performing the mechanic advances the beat — harmony, not dissonance.',
      'Your slice would pass the "stranger test": an observer could state both what the player does and what it means.'
    ],
    skills: ['Mechanic ⇄ beat binding', 'Ludonarrative harmony in practice', 'Single-verb discipline'],
    simplified: 'Tying one mechanic to one beat is the cleanest case on purpose. Bigger games weave many mechanics and beats with deliberate tension and contrast; the slice teaches the harmony case first so you can recognise dissonance later.',
    goDeeper: 'Revisit the MDA framework ([[b1-01]]) and writing on theme-through-mechanics; for the design half, any "anatomy of a core mechanic" GDC talk shows how much depth one verb can carry.',
    quiz: [
      { q: 'Why fold "story beat" and "design mechanic" into a single decision for a slice?', a: 'Because the slice is judged on coherence, and the strongest moments make the mechanic and the beat express the same idea (ludonarrative harmony). Deciding them together lets you bind the verb the player performs to the meaning the moment carries, instead of stapling a story onto unrelated rules.' },
      { q: 'A slice has a "earn the villager’s trust" beat but the only mechanic is combat. What is wrong and how do you fix it?', a: 'It is ludonarrative dissonance: the verb (fight) contradicts the meaning (build trust). Fix one side until they agree, either change the mechanic to a non-combat verb that expresses trust (talk, help, give) or change the beat to one combat genuinely serves. The mechanic must advance the beat.' }
    ],
    tags: ['mechanic', 'beat', 'ludonarrative', 'core verb', 'slice'] },
  {
    id: 'f1-03', title: 'Level + 3D: a small space from an asset you made', pillarId: 'F', phaseId: 'f1', moduleId: 'f1a',
    difficulty: 'Advanced', mode: 'handson', estMinutes: 38, diagram: 'blockout',
    prereq: '[[f1-02]] (the mechanic and beat) and a game-ready asset workflow ([[d0-03]]) first',
    concept:
'Now the slice needs a place to happen, built from the **level** and **3D** tracks at once. The discipline: block out a small space in grey first ([[c1-01]]), make it serve *this* mechanic and *this* beat, and dress it with **one asset you modelled and exported yourself** ([[d5-03]]). One real asset, used well and repeated, is enough — a modular kit of one ([[d5-01]]).\n\n' +
'The order matters. **Greybox before art.** A blocked-out space with correct scale, sightlines ([[c1-03]]) and pacing ([[c1-02]]) tells you whether the moment works before you spend an hour texturing. If the jump distance is wrong or the player cannot see where to go ([[c1-04]]), you find out in grey, where it is cheap to move a box. Painting a beautiful room you then have to demolish is the trap.\n\n' +
'The space is *designed*, not decorated: it should **guide the player to the mechanic, stage the beat, and resolve** ([[c0-02]]). Use the environment to carry the story beat ([[c0-03]]) — the locked door, the scorch mark, the thing just out of reach — so the level *is* the storytelling, no cutscene required ([[a1-02]]). The seam to 3D is your own asset: model it game-ready ([[d0-01]]), keep it on budget ([[d0-02]]), export it clean, and place it so it does real work (a cover piece, a landmark, the object the mechanic acts on).\n\n' +
'Scope check, again: a slice space is *rooms, not a region*. One entrance, one moment, one exit. If you are building a second area, you have left the slice.',
    steps: [
      'Sketch the space on paper first: mark entrance, the spot where the mechanic happens, where the beat reads, and the exit. One path, one moment.',
      'Open the **Blockout** tool above and lay the beat out as a flow — setup space, the mechanic moment, the release — checking the player is always guided toward the next thing.',
      'In the engine or on a grid, greybox with primitives at *real scale* (use a player-height reference block). Walk it mentally against the mechanic from [[f1-02]]: does the jump/reach/sightline actually work?',
      'Iterate the grey until the moment reads with zero art. Move boxes, not textures. This is the cheap stage, spend your time here.',
      'In Blender, model ONE game-ready asset the space needs ([[d1-02]]): clean topology, sane poly budget ([[d0-02]]), UVs ([[d2-01]]), a simple PBR material ([[d3-01]]).',
      'Export it correctly: prefer glTF/glb for Godot (its first-class import; FBX works too), correct scale and units, sane pivot, clear name ([[d5-03]], [[d5-04]]). Import and confirm it lands at the right size with no scale surprises.',
      'Place the asset to do real work, as cover, a landmark, or the object the mechanic acts on, and repeat/rotate it modularly rather than modelling more pieces.',
      'Re-walk the space with the asset in: does it still guide the player and stage the beat? Note (do not yet fix) anything that needs the programming pass ([[f1-04]]).'
    ],
    task:
'Block out and partly dress the slice space. Deliverable: (1) a paper or tool sketch of the flow (entrance, mechanic moment, beat, exit); (2) a greybox of the space at correct scale that you have "walked" against your mechanic; (3) **one** game-ready asset you modelled and exported yourself, placed to do real work and reused modularly. Write three lines on what the *grey* taught you that you would have missed if you had textured first.',
    success: [
      'You blocked out a small, single-path space at correct scale and validated the mechanic in grey before any art.',
      'The space guides the player to the mechanic and stages the beat through the environment, not a cutscene.',
      'You modelled, exported clean, and placed one game-ready asset of your own, reused modularly instead of multiplying pieces.'
    ],
    skills: ['Greybox-first level building', 'Environmental staging of a beat', 'Placing your own game-ready asset'],
    simplified: 'Exact greybox tooling and import settings vary by engine and version; treat menu paths as common defaults and check your engine. The principle (grey before art, scale and guidance first) is engine-independent.',
    goDeeper: 'Any "anatomy of a level" or "blockout to beauty" GDC talk shows the greybox-first discipline end to end; pair it with your engine’s docs on mesh import scale and units.',
    quiz: [
      { q: 'Why greybox the slice space before modelling and texturing it?', a: 'Because grey is where scale, sightlines, guidance and pacing are cheap to fix, moving a box costs seconds, redoing a textured room costs hours. You validate that the moment actually works (the jump reaches, the player can read where to go) before investing in art that you might have to demolish.' },
      { q: 'You only have time to make one 3D asset for the slice. How do you get a whole space from it?', a: 'Use it modularly: place, rotate and repeat the single asset to build the space, and lean on the greybox geometry and lighting for the rest. One clean, game-ready, well-placed asset reused across the space reads as intentional, far better than several rushed unique props.' }
    ],
    tags: ['blockout', 'greybox', 'modular', 'game-ready asset', 'level design'] },
  {
    id: 'f1-04', title: 'Programming: the one mechanic, coded and tested', pillarId: 'F', phaseId: 'f1', moduleId: 'f1a',
    difficulty: 'Advanced', mode: 'handson', estMinutes: 40, diagram: 'playground',
    prereq: '[[f1-02]] (the mechanic spec) and the engine-neutral runtime ([[e1-01]], [[e1-02]]) first',
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The transferable concept underneath is the same in any engine (a `Tick()` in Unreal, an `Update()` in Unity): the mechanic is logic that runs in the loop, reads input, respects delta time, and can be tested in isolation.*\n\n' +
'This is where the mechanic from [[f1-02]] becomes *real code*. The slice needs exactly one mechanic, coded to feel good and **tested** so it does not silently break while you polish everything else.\n\n' +
'Separate the mechanic into two halves you already know. The **logic** is plain, engine-neutral state and rules ([[e1-07]]): given input and the world, what should happen? Keep this in a small, testable piece. The **engine glue** wires that logic into the loop, in Godot a script that `extends CharacterBody2D` (or another `Node` type) reading input in `_process(delta)` and moving things by the `delta` parameter ([[e1-02]]), physics-sensitive work in `_physics_process(delta)` with `move_and_slide()`. The split is the whole point of the two-layer pillar: the rules are transferable, only the glue is engine-specific ([[e2-01]]).\n\n' +
'Code for **feel**, not just function ([[b0-04]]): read the *just-pressed* event for one-shot actions and held *state* for continuous ones ([[e1-03]]); multiply continuous motion by delta time; add the juice ([[b0-05]]) that makes the verb satisfying. A jump that merely changes `y` is correct and dead; the same jump with a crisp input window, a sound and a small squash *feels* like a game.\n\n' +
'Then **test the mechanic** ([[e2-08]]). You cannot run an engine in this site, but the *logic* half is pure and testable anywhere, which is exactly why you split it out. A test pins behaviour: "from grounded, a jump press sets upward velocity"; "you cannot double-jump in the air"; "after `dt`, position advanced by `speed * dt`". When integration ([[f1-05]]) starts breaking things, your tests tell you instantly whether the *mechanic* still holds.',
    steps: [
      'Write the mechanic’s rules as plain pseudocode first, no engine: inputs, state, the update step, the fail/blocked cases. This is the testable core.',
      'Put that core in an engine-neutral function/class so it has no engine references. Example (JS-style logic you can prototype in the playground above):',
      '```js\n// pure logic: no engine. given current state + input + dt -> new state\nfunction stepJump(s, input, dt) {\n  if (s.grounded && input.jumpPressed) { s.vy = JUMP_SPEED; s.grounded = false; }\n  s.vy += GRAVITY * dt;          // continuous -> * dt\n  s.y  += s.vy * dt;\n  if (s.y <= 0) { s.y = 0; s.vy = 0; s.grounded = true; }\n  return s;\n}\n```',
      'In Godot, write the glue: a script on a `Node` (e.g. `extends CharacterBody2D`) that reads the just-pressed action in `_process(delta)`, calls the logic, and applies the result (scale motion by `delta`; put physics-sensitive movement in `_physics_process(delta)` and call `move_and_slide()`). GDScript sketch:',
      '```gdscript\nextends CharacterBody2D\n\n@export var speed: float = 220.0\n\nfunc _physics_process(delta: float) -> void:\n\t# input: just-pressed for one-shots, held state for continuous\n\tif Input.is_action_just_pressed("jump") and is_on_floor():\n\t\tvelocity.y = JUMP_SPEED\n\tvelocity.x = Input.get_axis("move_left", "move_right") * speed\n\tvelocity.y += GRAVITY * delta   # continuous -> * delta\n\tmove_and_slide()\n```',
      'C# is equally valid in Godot if you prefer static typing: the same script becomes `public partial class Player : CharacterBody2D` with `public override void _PhysicsProcess(double delta)`, `Input.IsActionJustPressed("jump")`, `IsOnFloor()` and `MoveAndSlide()`. Pick one language for the slice; do not mix per-file.',
      'Add feel: input buffering / coyote time for fairness ([[b0-04]]), a sound, and a small visual response (squash, particle) on the action.',
      'Write tests against the *pure logic* (in Godot, a GUT test for GDScript, or NUnit/xUnit if you went C#; the same asserts work on the JS core in the playground):',
      '```js\n// example asserts (engine-agnostic)\nassert(stepJump({y:0,vy:0,grounded:true}, {jumpPressed:true}, 0.016).vy > 0);   // jump leaves ground\nassert(stepJump({y:5,vy:2,grounded:false},{jumpPressed:true}, 0.016).vy <= 2 + 0.001); // no double-jump thrust\n```',
      'Run the tests, then tune constants (JUMP_SPEED, GRAVITY, buffer window) until the verb feels right. Re-run tests after tuning to confirm rules still hold.'
    ],
    task:
'Code your one mechanic with the logic/glue split. Deliverable: (1) the **pure logic** as pseudocode or a JS function (prototype it in the **Code playground** above); (2) a short description of the **engine glue** (which Godot callback reads input — `_process(delta)` vs `_physics_process(delta)` — where the `delta` parameter applies, and whether you use GDScript or C#); (3) at least **two tests** of the pure logic stating exact expected behaviour (e.g. "no double-jump", "speed scales with dt"); (4) two feel additions you would add and why. If you have Godot installed, build it for real; if not, the JS core plus the glue description is a complete deliverable.',
    success: [
      'Your mechanic separates engine-neutral logic from engine-specific glue, with delta time and event-vs-state input handled correctly.',
      'You wrote at least two tests that pin the mechanic’s behaviour and would catch a regression during integration.',
      'You can name concrete "feel" additions (buffering, sound, squash) and why they matter to the verb.'
    ],
    skills: ['Logic/glue separation', 'Coding for feel', 'Testing a mechanic'],
    simplified: 'Test-framework specifics differ (Godot GUT for GDScript, NUnit/xUnit for C#, custom asserts); the JS asserts here illustrate the *idea* of pinning behaviour. The durable habit is keeping the mechanic’s logic pure enough to test at all. Godot class names and InputMap actions are version-dependent — check your version.',
    goDeeper: 'Robert Nystrom’s *Game Programming Patterns* (free online) for the loop/state side; Godot’s docs on `CharacterBody2D`, InputMap and the GUT add-on (or your C# test runner) for the test side; and any "game feel" talk for the juice that makes one verb satisfying.',
    quiz: [
      { q: 'Why split the mechanic into pure "logic" and engine "glue"?', a: 'Because the logic (rules and state) is engine-neutral and transferable, while only the glue (which callback fires — in Godot `_process`/`_physics_process` — and how input and rendering attach) is engine-specific. The split keeps the rules portable across engines and, crucially, lets you unit-test the pure logic in isolation without running Godot.' },
      { q: 'Why bother testing one mechanic in a slice this small?', a: 'Because integration and polish (f1-05) will change scenes, input and timing around the mechanic, and a test instantly tells you whether the mechanic’s behaviour still holds rather than you discovering a silent break at the expo. Tests pin behaviour like "no double-jump" so a regression fails loudly, not quietly.' }
    ],
    tags: ['mechanic', 'unit test', 'delta time', 'godot', 'logic vs glue'] },
  {
    id: 'f1-05', title: 'Integrating the slice and making it feel finished', pillarId: 'F', phaseId: 'f1', moduleId: 'f1a',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 26,
    prereq: '[[f1-02]], [[f1-03]] and [[f1-04]] (the three track-pieces) first',
    concept:
'You now have a beat and mechanic ([[f1-02]]), a space and an asset ([[f1-03]]), and the coded, tested mechanic ([[f1-04]]). **Integration** is the step that fuses them into one continuous minute, and "**making it feel finished**" is the polish that separates a tech demo from something you would loop at the expo ([[01-07]]). This is the seam where all five tracks finally meet on the same screen ([[00-05]]).\n\n' +
'First, **integrate**: drop the mechanic into the real space, place the asset where the mechanic acts on it, and play the moment start to finish. Things *will* break, scale, input or timing will shift now that the pieces share a scene, which is exactly why you tested the mechanic in isolation ([[f1-04]]): re-run the tests to confirm the *logic* still holds while you fix the *glue*. Get to a state where the moment plays through, beginning to end, without a stop.\n\n' +
'Then **polish for feel** ([[b0-04]], [[b0-05]]). The cheap wins that read as "finished": clear **feedback** on the mechanic (sound, a screen or particle response), **readable guidance** so the player never wonders where to go ([[c1-04]]), **lighting and mood** that sells the beat ([[c3-01]]), and a clean **start and stop** so the loop has a shape ([[a0-02]]). Audio is the highest-impact, lowest-cost polish in a slice, a footstep, an impact and an ambient bed transform the same visuals.\n\n' +
'Keep the **finish bar honest**: finished means *coherent and intentional*, not *big*. A scope trap hides here, "just one more feature" is how a clean slice rots into an unfinished demo. Polish what exists; do not add. Use a tiny **finish checklist**: does the moment start cleanly, does the mechanic feel good, does the beat read, can the player always tell what to do, does it end. When every box is ticked, the slice is done, and you have proved, on one screen, that you can run the whole pipeline. That is the day-one readiness the capstone exists to give you ([[f3-04]]).',
    task:
'Integrate your three pieces into one playable (or fully storyboarded, if you lack the engine) minute, then run a **finish pass**. Write a one-page finish checklist for *your* slice with at least six concrete items (e.g. "jump has a sound", "exit is visible from the mechanic spot", "ambient audio bed", "clean fade in/out"), tick what is done, and list what remains. Crucially, write a "**will NOT add**" line naming the tempting feature you are refusing, to keep the slice finished rather than re-opened.',
    success: [
      'Your three track-pieces play as one continuous moment, with the mechanic’s tests still green after integration.',
      'You applied cheap, high-impact polish (feedback, audio, guidance, lighting, a clean start/stop) rather than new features.',
      'You can state a concrete finish checklist and defend a "will not add" line that protects the scope.'
    ],
    skills: ['Cross-track integration', 'Polish for "finished" feel', 'Holding scope at the finish line'],
    simplified: 'There is no single objective "finished", quality bars differ by team and platform. The working definition here (coherent, intentional, plays clean start-to-finish) is a sound bar for a slice, not an industry shipping standard.',
    goDeeper: 'Study "game feel" and "juice" talks (e.g. the classic Vlambeer/Jan Willem Nijman "art of screenshake" talk) for the polish layer; pair with any post-mortem on cutting scope to ship.',
    quiz: [
      { q: 'After integrating the pieces, the mechanic behaves oddly in the scene. How do your earlier tests help?', a: 'Re-running the mechanic’s unit tests tells you instantly whether the pure logic still holds. If the tests pass, the bug is in the integration/glue (scale, input wiring, scene setup), not the rules, which narrows the search enormously. That is the payoff of splitting and testing the logic in f1-04.' },
      { q: 'What is the cheapest, highest-impact polish for making a slice feel finished?', a: 'Audio and feedback. A footstep, an impact sound, an ambient bed and a clear visual/sound response on the mechanic transform the same visuals from a tech demo into a moment, for very little time. Plus readable guidance and a clean start/stop so the minute has a shape. All of this without adding new features.' }
    ],
    tags: ['integration', 'polish', 'game feel', 'finished', 'scope discipline'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
