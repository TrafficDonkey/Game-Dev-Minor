/* Pillar 0 · Phase 00 · Module 00a — The production pipeline */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '00-01', title: 'What a game actually is: loops, systems, content & feel', pillarId: '0', phaseId: '00', moduleId: '00a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 18,
    concept:
'Before you can make games across five roles, get a shared mental model of *what a game is made of*. Strip away the genre and a playable game is roughly four layers stacked together: **loops**, **systems**, **content**, and **feel**.\n\n' +
'- **Loops** are the repeating cycles of action the player performs. The ((core loop)) is the heartbeat — *aim, shoot, reload, take cover* in a shooter; *plant, water, harvest, sell* in a farming game. Around it sit longer loops: a session loop (start, play a run, get a reward, quit) and a progression loop (level up over many sessions). If the core loop isn’t satisfying on its own, no amount of story or art will save the game. This is the game designer’s territory ([[b0-02]]).\n' +
'- **Systems** are the rules and relationships that *make* the loops work: health and damage, economy, inventory, an enemy that chases you. A system is a set of parts that feed each other — designers tune them, programmers build them ([[b2-01]]).\n' +
'- **Content** is the authored stuff the systems run on: levels, characters, dialogue, 3D models, textures, sound. Content is where the level designers, storytellers and 3D artists live. Content is also where **scope explodes** — every level and model costs real hours.\n' +
'- **Feel** is the moment-to-moment *texture* of play: how a jump responds, screen shake on a hit, the satisfying *click* of a menu. This is ((game feel)), or "juice" ([[b0-04]]) — cheap to add, huge in impact, and the thing players remember without being able to name it.\n\n' +
'Why lead with this? Because every role you’re training feeds one or more of these layers, and a strong game keeps all four pointing the same way. A clever system with a boring loop fails; gorgeous content wrapped around mushy feel fails. As a versatile dev your job is to see the whole stack at once — and to know which layer a problem actually lives in before you try to fix it.',
    task:
'Pick a game you know well and break it into the four layers in writing. Name its **core loop** in one short cycle of verbs. List two **systems** that power that loop. Name two kinds of **content** the game ships. Then describe one piece of **feel** — a specific responsive detail (a sound, a shake, a snap) — and say what it adds. Finally, write one sentence on which layer you think the game is *strongest* in, and which is weakest.',
    success: [
      'You can split any game into loops, systems, content and feel.',
      'You can state a real game’s core loop as a short cycle of verbs.',
      'You can tell the difference between a system (a rule set) and content (authored stuff).'
    ],
    skills: ['The four-layer model', 'Spotting a core loop', 'Naming game feel'],
    goDeeper: 'For the loop/system view, Raph Koster’s *A Theory of Fun* is a short, classic starting point; for "feel", Steve Swink’s *Game Feel* is the canonical book.',
    quiz: [
      { q: 'A game has deep systems and gorgeous art but testers say it’s "boring". Which layer should you suspect first?', a: 'The loop. If the repeating core action isn’t satisfying on its own, rich systems and beautiful content can’t rescue it — players spend most of their time inside the loop, so a flat loop reads as a flat game.' },
      { q: 'What’s the difference between a system and content?', a: 'A system is a set of rules and relationships (health, economy, an enemy’s behaviour); content is the authored material the system runs on (a specific level, model, line of dialogue). One enemy AI is a system; the fifty placed enemies in a level are content.' }
    ],
    tags: ['fundamentals', 'core loop', 'systems', 'content', 'game feel'] },
  {
    id: '00-02', title: 'The production pipeline: concept → pre-production → production → polish → ship', pillarId: '0', phaseId: '00', moduleId: '00a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 22,
    concept:
'Games aren’t made in one burst — they move through phases, each with a different goal and a different question it’s trying to answer. The classic shape is **concept → pre-production → production → polish → ship**. Knowing where you are tells you what you should (and shouldn’t) be doing.\n\n' +
'- **Concept** answers *"what is this game and why would anyone play it?"* Output is cheap and disposable: a pitch, a one-pager, design pillars, maybe a rough sketch. You explore many ideas and throw most away. Cost of changing your mind here is almost zero.\n' +
'- **Pre-production** answers *"can we actually make this, and is it fun?"* You build prototypes, prove the core loop, find the technical risks, and write the ((GDD)) ([[01-04]]). The single most important job of pre-pro is to **lock a feasible scope** — over-scoping is the number-one reason student games fail ([[01-05]]). Decisions here are still cheap to change; later they won’t be.\n' +
'- **Production** is where the bulk of the work happens: building all the levels, models, systems and code to fill out the proven design. The key word is *proven* — production multiplies what pre-pro validated. Changing direction now is expensive because you’ve committed real content.\n' +
'- **Polish** answers *"how do we make it feel finished?"* Bug-fixing, balancing, tuning game feel, performance, the difficulty curve. Polish is where a decent game becomes a good one — and it’s almost always cut short, so plan for it deliberately.\n' +
'- **Ship** is releasing and showing the game — for you, the **expo and the Best Game Award** ([[01-07]]). Shipping is a skill of its own: finishing, cutting, and putting something playable in front of strangers.\n\n' +
'Two ideas make this real. First, the **cost of change rises sharply** the later you are — a feature that’s a sentence to cut in concept is a week to rip out in production. Second, on a student team these phases **overlap and loop**: you’ll revisit concept ideas during production, and run mini polish passes throughout (this is the agile rhythm of sprints, [[02-04]]). The pipeline is a map of intent, not a rigid waterfall — but ignoring it is how teams build the wrong thing beautifully.',
    task:
'Take a small game idea — yours or invented in one line — and write *one sentence per phase* describing what you’d actually do in it: the concept question you’d answer, the one thing you’d prototype in pre-production, what bulk work production would be, one thing you’d polish, and how you’d "ship" it for the expo. Then mark the phase where, realistically, you’d be most tempted to over-scope, and name one feature you’d cut to protect the schedule.',
    success: [
      'You can name the five phases in order and the question each one answers.',
      'You can explain why the cost of changing a decision rises the later you are.',
      'You can point at "lock a feasible scope" as the main job of pre-production.'
    ],
    skills: ['The production pipeline', 'Phase-appropriate work', 'Scope-locking in pre-pro'],
    simplified: 'Five phases is a clean teaching model; real studios use varied names (e.g. an extra "alpha/beta" split, or a "vertical slice" milestone in pre-pro) and the phases overlap heavily in agile production. The order and intent hold; the labels vary.',
    goDeeper: 'Look up how studios describe milestones like the "vertical slice" and "alpha/beta/gold" — and note that your capstone ([[f1-01]]) is itself a vertical-slice exercise. Any "how a game is made" GDC postmortem shows the phases in practice.',
    quiz: [
      { q: 'Your team wants to start building all the levels in week two. What phase are they skipping, and why does it matter?', a: 'They’re skipping pre-production — proving the core loop is fun and locking a feasible scope. Building content before the design is validated means you may produce a lot of polished material for a game that isn’t fun, and changing course later is far more expensive than it would have been on a prototype.' },
      { q: 'Why is polish almost always the phase that gets squeezed, and what should you do about it?', a: 'Because it comes last, so any delay earlier in the project eats into it — and it’s tempting to keep adding features instead. Protect polish by budgeting time for it up front and by cutting scope earlier, since a smaller game finished well beats a bigger one shipped rough.' }
    ],
    tags: ['pipeline', 'production', 'pre-production', 'scope', 'shipping'] },
  {
    id: '00-03', title: 'The disciplines on a game team and what each one owns', pillarId: '0', phaseId: '00', moduleId: '00a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 20,
    concept:
'A game is built by several distinct **disciplines**, each owning part of the stack. On your minor you’ll be on an **eight-person team** building one game, and you’ve chosen five role-tracks yourself — so you need to know both what each role owns *and* where they hand work to each other (the seams). Here’s the core cast.\n\n' +
'- **Game designer** owns the *rules and the fun*: mechanics, the core loop, balance, progression, and the ((GDD)) that documents it all. They decide what the game *does*, not how it’s coded. This is Pillar B.\n' +
'- **Storyteller / narrative designer** owns *meaning and motivation*: story, characters, world, dialogue and how narrative is delivered through play. Pillar A.\n' +
'- **Level designer** owns *space and pacing*: laying out levels, guiding the player, tension and release, encounters and puzzles. They turn the designer’s mechanics into places you actually play. Pillar C.\n' +
'- **3D artist / modeller** owns *the look in real time*: game-ready models, textures, materials — built to a poly budget, not a render farm. Pillar D ([[d0-01]]).\n' +
'- **Programmer** owns *making it run*: turning designs into working systems, the player controller, AI, tools. Pillar E.\n\n' +
'Beyond your five, real teams also have **producers** (schedule, scope and unblocking people — closely tied to the agile rhythm, [[02-04]]), **audio designers** (music and sound, a huge part of feel), **technical artists** (the bridge between art and code — shaders, pipelines), and **QA / testers**. On an eight-person student team one person often wears several hats, which is exactly why being versatile pays off.\n\n' +
'The crucial idea is **ownership without walls**. Each role *owns* decisions in its area — the designer decides the jump height, the programmer decides how it’s implemented — but the work only adds up if the seams are clean. A character’s want should match the core loop (story ⇄ design, [[a5-01]]); a level is shaped by both the encounters (design) and the kit of models it’s built from (3D, [[c3-02]]). Knowing who owns what stops two failures at once: stepping on a teammate’s decision, and a job falling through the cracks because *everyone* assumed someone else owned it.',
    task:
'Imagine the eight-person team for a small game. Write a one-line "owns…" statement for each of the five tracks (designer, storyteller, level designer, 3D artist, programmer). Then pick **one feature** of the game — say, a locked door the player must find a key for — and write, for each of the five roles, *one thing that role would contribute* to that single feature. The goal is to feel how one small feature touches every discipline and where the handoffs sit.',
    success: [
      'You can state what each of the five tracks owns in one clear line.',
      'You can name at least two roles beyond your five (producer, audio, tech artist, QA) and what they add.',
      'You can trace one small feature through all five disciplines and spot the handoffs.'
    ],
    skills: ['Team disciplines & ownership', 'Mapping a feature across roles', 'Seeing the seams'],
    goDeeper: 'Job listings from studios you admire are a surprisingly honest map of who owns what — read a few "level designer" vs "technical artist" postings to feel the boundaries. The next module ([[00-04]]) follows the handoff chain in detail.',
    quiz: [
      { q: 'The designer sets the jump height; the programmer implements jumping. Who "owns" the jump, and why does the distinction matter?', a: 'They own different layers of the same feature: the designer owns the *intent and tuning* (how high, how it should feel), the programmer owns the *implementation* (how it’s coded). The distinction prevents both stepping on each other and lets each tune their own part without renegotiating the whole feature.' },
      { q: 'Why does an eight-person team still benefit from each member being versatile across roles?', a: 'Because eight people can’t fully staff every discipline a game needs, so members wear multiple hats and cover gaps. A versatile dev can fill in where the team is thin, communicate across seams more fluently, and avoid the "everyone assumed someone else owned it" failure.' }
    ],
    tags: ['team', 'roles', 'disciplines', 'ownership', 'seams'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
