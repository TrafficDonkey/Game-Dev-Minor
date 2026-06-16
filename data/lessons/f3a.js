/* Pillar F · Phase f3 · Module f3a — Day-one readiness (your solo-dev workflow) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'f3-01', title: 'Your personal engine + Blender + Git pipeline', pillarId: 'F', phaseId: 'f3', moduleId: 'f3a',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 35,
    concept:
'You now know the five tracks. This lesson wires them into **one pipeline you can run alone**, so that an idea can travel from Blender to the engine to a commit without friction. A solo-capable dev’s real edge isn’t any single skill — it’s a *smooth path between tools* so nothing gets lost in the gaps.\n\n' +
'Think of three tools and the seams between them:\n\n' +
'- **Blender → engine.** You model and texture game-ready ([[d5-06]]), then **export** a clean `.fbx` or `.glb` with correct scale and units ([[d5-03]]) into the engine’s asset folder. The seam is the export settings *and* a consistent naming convention so the file is recognisable months later.\n' +
'- **Engine.** You import the asset, build a scene or blockout ([[c4-01]]), and script a mechanic in C# ([[e2-01]]). The engine is the *integration point* where all five tracks finally meet.\n' +
'- **Everything → Git.** Code, scenes, and small assets are versioned and pushed ([[03-01]]). Large binaries go through **Git LFS**, and a good `.gitignore` keeps the engine’s generated folders (Unity’s `Library/`, `Temp/`, `Obj/`) out of the repo ([[03-04]]).\n\n' +
'The discipline that makes this *flow* rather than *fight* is **a fixed project structure**. Decide once where source `.blend` files live, where exported game assets land, where scripts go, and which folders Git ignores — then never improvise. A typical layout keeps editable sources *outside* or clearly separate from the engine project, exports *inside* it, and a single `README` describing the layout so a teammate (or future you) can navigate it cold.\n\n' +
'This is the **solo-dev goal** from the very first pillar made concrete ([[00-05]]): not mastery of one tool, but a working loop where you can make a thing in Blender, get it running in the engine, and commit it — then do it again tomorrow. In the minor you’ll plug into the *team’s* repo and conventions, but having run your own pipeline end-to-end is exactly what lets you contribute on day one instead of week three.',
    task:
'Set up a tiny end-to-end pipeline on your own machine and **commit it**. Create a project folder with a deliberate structure, initialise Git, add a `.gitignore` for your engine, make a throwaway asset in Blender, export it into the engine project, and push the result. The asset can be a single textured cube — the point is the *path*, not the art. Write a 3-line `README` describing where each kind of file lives.',
    steps: [
      'Make a root folder, e.g. `my-pipeline/`, with subfolders: `src-blender/` (editable `.blend`), `engine-project/` (the engine project), and a top-level `README.md`.',
      'In a terminal at the root: `git init`, then create a `.gitignore`. For Unity, ignore at least `engine-project/Library/`, `Temp/`, `Obj/`, `Logs/`, `.vs/` (check your engine’s official `.gitignore`).',
      'Set up Git LFS for big binaries: `git lfs install`, then `git lfs track "*.fbx" "*.png" "*.blend"` — this writes a `.gitattributes` file ([[03-04]]).',
      'In Blender: model a cube, give it a simple material, and **export** to `engine-project/Assets/Models/` as `.fbx` or `.glb`, applying transforms and checking scale/units ([[d5-03]]).',
      'In the engine: open `engine-project`, confirm the model imports at the right size, drop it into a scene, and save the scene.',
      'Stage and commit everything: `git add .`, then `git commit -m "Pipeline skeleton: cube from Blender into engine"`. Push to a remote if you have one (`git push`).',
      'Write the `README.md`: one line each for where `.blend` sources, exported assets, and scripts live, so the layout is self-documenting.'
    ],
    success: [
      'You can move an asset from Blender into the engine with correct scale and a clean import.',
      'Your repo commits source and scene but ignores the engine’s generated folders, with LFS handling binaries.',
      'You can describe your project structure in three lines so a teammate could navigate it.'
    ],
    skills: ['End-to-end pipeline', 'Project structure', 'Git + LFS hygiene', 'Blender → engine handoff'],
    simplified: 'Exact ignore lists, LFS tracking and import settings are engine- and version-specific — always start from your engine’s official `.gitignore` and docs rather than this sketch.',
    goDeeper: 'GitHub publishes maintained `.gitignore` templates for Unity, Unreal and Godot; pair them with your engine’s "version control" and "import settings" docs and the Git LFS guide.',
    quiz: [
      { q: 'Why ignore Unity’s `Library/` (or the equivalent generated folders) in Git?', a: 'Those folders are regenerated by the engine from your source assets every time the project opens. Committing them bloats the repo, causes constant merge conflicts, and stores nothing you can’t rebuild. Version the *sources*; let the engine regenerate the rest.' },
      { q: 'What problem does a fixed project structure solve for a solo dev?', a: 'It removes a hundred tiny decisions ("where does this file go?") and makes the project navigable cold — by a teammate or by future-you. Knowing exactly where sources, exports, scripts and ignored folders live is what lets the pipeline flow instead of fragmenting.' }
    ],
    tags: ['pipeline', 'git', 'lfs', 'blender', 'project structure', 'workflow'] },
  {
    id: 'f3-02', title: 'A week-one plan for the minor', pillarId: 'F', phaseId: 'f3', moduleId: 'f3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'Walking into the first week of the minor, the temptation is to start *building*. Resist it. Week one is where teams either set themselves up to ship or quietly seed the failure they’ll hit at the expo — and the difference is almost never coding speed. It’s **alignment, scope and setup**.\n\n' +
'Here’s a sane week-one shape for an eight-person team, in rough order:\n\n' +
'- **Meet and map roles.** Eight people, five disciplines — who owns what, and where the handoffs are ([[02-01]]). You bring a rare advantage: you can touch all five tracks, which makes you the person who *spots the seams* between specialists.\n' +
'- **Converge on one feasible concept.** Not the coolest idea — the one a small team can actually finish. This is the scope conversation, and it’s the single highest-leverage hour of the semester ([[04-01]], [[b5-02]]). Over-scoping is the number-one student-game failure; week one is when you cut.\n' +
'- **Stand up the shared toolchain.** One engine version everyone uses, a shared Git repo with LFS and a `.gitignore` agreed *before* anyone commits ([[03-04]]), and a project structure decided together ([[f3-01]]).\n' +
'- **Start the GDD and the board.** A one-page pitch and design pillars to align everyone ([[f0-01]]), and a Kanban/Scrum board so work is visible from day one ([[02-05]]).\n\n' +
'Notice what is *not* in week one: polished art, a clever mechanic, a vertical slice. Those come after alignment. The classic trap is a team that spends week one prototyping in eight slightly different engine versions on no shared repo, then loses week three to merge chaos and a scope nobody agreed to.\n\n' +
'Your personal week-one goal is narrower: **be the person who makes the team’s pipeline real.** Help set up the repo, the structure and the engine version; draft the first scope cut; and make one tiny thing travel end-to-end ([[f3-01]]) so the team has a *working skeleton* to build on. Setup is unglamorous and it is exactly where a versatile dev earns their place.',
    task:
'Write your own **week-one plan** as a dated checklist (Mon–Fri) for the first week of the minor, assuming an eight-person team and one shared game. For each day, list 1–3 concrete outcomes (e.g. "repo + `.gitignore` + LFS agreed and pushed", "one-page pitch drafted", "scope cut #1 — three features dropped"). Mark which items *you* would personally drive given your five-track range, and put a star next to the single item that, if skipped, would hurt the team most.',
    success: [
      'Your plan front-loads alignment, scope and shared setup over building.',
      'You can name the concrete week-one artifacts: shared repo + ignore/LFS, engine version, one-page pitch, a board.',
      'You can identify where your multi-track range is most useful in the first week.'
    ],
    skills: ['Week-one planning', 'Team setup', 'Scope-first thinking'],
    goDeeper: 'Look up post-mortems of student and game-jam projects (many are on dev blogs and GDC talks) — the recurring lesson is that week-one alignment and scope, not skill, decide whether the team ships.',
    quiz: [
      { q: 'Why is converging on a feasible scope the highest-leverage task in week one?', a: 'Because over-scoping is the number-one reason student games fail, and the GDD is graded on complexity *versus feasibility*. An hour spent cutting to a finishable concept in week one saves weeks of doomed work and protects the grade more than any amount of clever code.' },
      { q: 'What should a team agree about Git *before* anyone makes a commit?', a: 'The shared repo, the `.gitignore` (so generated engine folders never enter history), and Git LFS for large binaries. Agreeing these up front prevents bloated history and the merge chaos that hits teams who each start in their own ad-hoc setup.' }
    ],
    tags: ['week one', 'planning', 'team', 'scope', 'setup', 'onboarding'] },
  {
    id: 'f3-03', title: 'Where to go deeper: a map of the five careers', pillarId: 'F', phaseId: 'f3', moduleId: 'f3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'This course gave you a real **headstart across five roles — not mastery of any one.** That was the deal from the start, and it’s the honest framing. Each of these tracks is a *career* people spend decades in. Here’s a map of where each one goes deeper, so you can pick a direction (or stay deliberately broad) with open eyes.\n\n' +
'- **Storyteller / narrative designer.** Beyond structure and theme lie branching dialogue systems, narrative tooling (ink, Yarn, Twine), quest design at scale, and writing rooms. The craft deepens toward *interactive* writing — agency, ludonarrative harmony, emergent story ([[a4-01]] hints at the improv muscle behind it).\n' +
'- **Game designer.** Deeper waters: systems and economy design, balancing at scale, formal playtesting and metrics, and the discipline of the GDD and feature specs that a whole team builds from ([[f0-01]]). Designers grow by shipping and *measuring*, not theorising.\n' +
'- **Level designer.** Beyond blockout and pacing: metrics-driven layout, encounter scripting, lighting and environment art, and engine-specific level tooling ([[c4-01]]). It sits on the seam between design and 3D and rewards people who speak both.\n' +
'- **3D modeller / technical artist.** Game-ready modelling opens into character art, hard-surface, the full PBR and baking pipeline, shaders, and *technical art* — the bridge role between artists and programmers. The deepest pay-off is performance-aware art that runs fast on real hardware.\n' +
'- **Programmer.** Branches into gameplay, AI, graphics, tools, engine and networking. Each is deep; gameplay is the foundational one and the easiest to grow from the engine-neutral fundamentals you learned ([[e1-01]]).\n\n' +
'Two honest points. First, the **T-shaped** path is common and powerful: broad across all five (which you now are), deep in one. Pick the track you *enjoyed most*, not the one that sounds most impressive — you’ll go deep faster on something you like. Second, **technical art and the designer-who-codes** are unusually valuable precisely because they live on the seams you’ve been learning to see; breadth is not a consolation prize, it’s a specialism of its own.\n\n' +
'You don’t have to choose now. But knowing the map means your next thousand hours can be *aimed*.',
    task:
'Draw your own **T-shape**. List all five tracks across the top (your breadth bar). Then pick the *one* you most want to go deep in, and write a short "depth ladder" for it: 3–5 increasingly advanced topics or projects that take you from where this course left you toward professional competence. End with one concrete next step you could start this month (a tutorial series, a small project, an official doc set to read).',
    success: [
      'You can describe, for each track, one direction it deepens into beyond this course.',
      'You can articulate the T-shaped model and why breadth plus one depth is valuable.',
      'You have a personal depth ladder and a concrete first step for your chosen track.'
    ],
    skills: ['Career mapping', 'T-shaped planning', 'Choosing a specialism'],
    simplified: 'This map is a sketch of large fields — real career paths blur and overlap (e.g. technical art spans 3D and code). Treat it as a compass, not a syllabus.',
    goDeeper: 'For each track, the official engine/Blender docs plus a respected book are the best deep-dive starts (e.g. Schell’s *The Art of Game Design* for design, Nystrom’s *Game Programming Patterns* for code); GDC talks are a free, high-signal way to sample a specialism before committing.',
    quiz: [
      { q: 'What does it honestly mean that this course is a "headstart, not mastery"?', a: 'Each of the five tracks is a career people spend decades in; one course can make you versatile and ready to contribute across the pipeline, but not expert in any single one. The value is breadth and the ability to see the seams — which is exactly what a small team needs.' },
      { q: 'Why is a "T-shaped" developer valuable on a small team?', a: 'Breadth across all five tracks lets them communicate with every specialist and fill gaps, while one area of depth lets them carry real weight in that area. On a small or solo team, that combination of glue plus a deep skill is often worth more than narrow expertise alone.' }
    ],
    tags: ['careers', 't-shaped', 'specialisation', 'depth', 'self-direction'] },
  {
    id: 'f3-04', title: 'Day-one checklist: walking in versatile and ready', pillarId: 'F', phaseId: 'f3', moduleId: 'f3a',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 20,
    concept:
'This is the last lesson, and its job is simple: turn everything you’ve learned into a short list you can *check* before the minor starts, so you walk in versatile and ready rather than hoping you are. Readiness isn’t a feeling — it’s a set of things that are true.\n\n' +
'Group it into four buckets.\n\n' +
'- **Tools work, and connect.** Engine installed and opened a project; Blender exports a game-ready asset that imports at correct scale ([[d5-03]]); Git installed with a remote you can push to, LFS set up, a sane `.gitignore` ([[03-04]]); and you’ve run *one* asset all the way through the pipeline ([[f3-01]]).\n' +
'- **You can speak all five tracks.** You can read a space as story, name a core loop and a game’s theme, describe what makes a level pace well, explain a poly budget and PBR maps, and read or write a simple mechanic from the engine-neutral fundamentals ([[e1-01]]). Not expert — *conversant*, which is what lets you work with every specialist on the team.\n' +
'- **You understand how the minor is graded.** You know the GDD is judged on complexity *versus feasibility* ([[f0-01]]), how the silver/gold/platinum achievement portfolio maps to your tracks ([[f2-01]]), and that you’ll build evidence as you go rather than scrambling at the end ([[f2-02]]).\n' +
'- **You have a scope reflex.** When an idea balloons, your instinct is to cut to the finishable version — the single most important habit the whole course tried to build ([[b5-02]]). Over-scoping is what sinks student games; a working scope reflex is your life raft.\n\n' +
'The mindset underneath all of it: **a versatile dev ships small, complete things and sees the seams between disciplines.** You don’t need to be the best programmer, artist or writer in the room. You need a working pipeline, enough fluency in each track to collaborate, and the discipline to keep scope honest. That combination is genuinely rare, and it’s what makes you useful from day one — not week three.\n\n' +
'Run the checklist. Fix the gaps. Then go build something small and finish it.',
    task:
'Build your personal **day-one checklist** as four buckets — *tools*, *five-track fluency*, *how the minor is graded*, *scope reflex* — with concrete, checkable items under each (something is either true or it isn’t; "I understand pacing" is weak, "I can name a level’s setup/escalation/climax/breather" is checkable). Then honestly tick what’s already true and circle the 2–3 gaps to close before the minor starts. Finish with one sentence on the smallest complete thing you could build this week to prove your pipeline works end-to-end.',
    success: [
      'You have a checklist of *checkable* readiness items, not vague intentions.',
      'You’ve identified your real gaps and a plan to close them before day one.',
      'You can state, in one sentence, what makes a versatile dev useful from day one.'
    ],
    skills: ['Readiness self-audit', 'Pipeline verification', 'Scope discipline as a habit'],
    goDeeper: 'Revisit the capstone vertical slice ([[f1-01]]) as your proof-of-readiness project — a tiny game that touches all five tracks is the most honest test that your checklist is really true.',
    quiz: [
      { q: 'Why phrase a readiness checklist as "checkable" items rather than feelings?', a: 'Because a feeling of readiness is unreliable, but a fact is verifiable: "Blender exports an asset that imports at correct scale" is either true or it isn’t. Checkable items expose your real gaps so you can close them, instead of discovering them in week one of the minor.' },
      { q: 'What is the single habit the whole course most wanted to build, and why?', a: 'A scope reflex — the instinct to cut an idea down to a finishable version. Over-scoping is the number-one cause of student-game failure and the GDD is graded on feasibility, so the ability to keep scope honest protects both the project and the grade more than any single skill.' }
    ],
    tags: ['day one', 'checklist', 'readiness', 'scope', 'versatility', 'capstone'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
