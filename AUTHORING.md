# Game Dev Academy — Lesson Authoring Contract (binding)

You are writing lessons for a **local, offline, single-user** course that gives one motivated dev a
real **headstart for a university Game Development minor** (30 ECTS, HBO/Netherlands). The learner
has chosen five role-tracks — **Storyteller, Game Designer, Level Designer, 3D Modeller, Programmer**
— and wants to become a **versatile, solo-capable dev** who can touch the whole pipeline. They have a
Windows PC with an **RTX 3060 Ti** and **Ryzen 7**, and **already know Blender** (teach game-ready /
real-time technique, NOT Blender basics). The minor's engine is **Godot 4.x** (confirmed by the
organisers), and you may write in **GDScript or C#** for both the group project and individual
deliverables.

This is a **genuine headstart across five roles, not mastery** — say so where a topic runs deeper.
**Show the seams**: constantly connect each track to the others (story → design → level → 3D → code).
**Scope discipline is a through-line** — over-scoping is the #1 student-game failure and the minor
grades the GDD on complexity vs feasibility; reinforce realistic scoping wherever it fits.

Match the three gold-standard exemplar files exactly in shape, depth and tone:
- `data/lessons/a0a.js` → lesson `a0-02` — knowledge **story principle**
- `data/lessons/d0a.js` → lesson `d0-01` — game-ready **3D** (assumes Blender, teaches real-time)
- `data/lessons/e1a.js` → lesson `e1-01` — **programming** (Layer-1 engine-neutral; shows the split)

**Read the exemplar that matches your lesson's pillar/mode before writing.**

## File format (exact)
Each module is ONE file `data/lessons/<moduleId>.js` containing ALL lessons for that module. Valid
classic-script JS that runs over `file://` (no ES modules, no imports, no fetch). Template:

```js
/* Pillar <X> · Phase <phaseId> · Module <moduleId> — <module title> */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
    { id: '<id>', title: '...', pillarId: '<0|A|B|C|D|E|F>', phaseId: '<phaseId>', moduleId: '<moduleId>',
      difficulty: 'Beginner'|'Intermediate'|'Advanced', mode: 'knowledge'|'handson',
      estMinutes: <int>, /* prereq?, diagram?, steps?, simplified?, goDeeper?, */
      concept: '...', task: '...', success: ['...'], skills: ['...'],
      quiz: [{ q: '...', a: '...' }], tags: ['...'] },
    { /* next lesson in this module */ }
  );
})(typeof window !== 'undefined' ? window : globalThis);
```
Do NOT set `seq` — it is derived from the id. Use **single quotes** for JS strings; in prose prefer
the curly apostrophe `’` (needs no escaping). One unbalanced quote breaks the whole file.

## Ids (copy from the stub list, exactly)
`id` = `<phaseId>-<NN>` where NN is the lesson number WITHIN the phase, spanning its modules
(e.g. phase `a1` has `a1-01 … a1-07` split across modules `a1a` and `a1b`). **Pillar 0 ids begin
with a digit** (`00-01`, `01-04`, `03-02`). Always set `pillarId`, `phaseId`, `moduleId` to match.

## Required fields per lesson
- `id`, `title`, `pillarId`, `phaseId`, `moduleId`, `difficulty`, `mode` — from the stub; copy exactly.
- `estMinutes` — realistic, 10–45.
- `concept` — **150–450 words**, markdown-lite (below). Teach the idea properly; this is the heart.
- `task` — ALWAYS present. A concrete thing the learner DOES with no team and no licensed software
  required: a drill, a doc to draft, a level to block out, a small script (in pseudocode or JS for
  Layer-1; described engine steps for Layer-2), a 3D-prep exercise, or a "deconstruct this game"
  analysis. Honest about the medium (see below).
- `success` — 2–4 "you’ve got it when…" criteria (array of strings).
- `skills` — 2–4 short skill names this lesson banks (array).
- `quiz` — 2–3 `{q, a}` click-to-reveal questions; answers 1–3 sentences that genuinely teach.
- `tags` — 3–6 lowercase search keywords.

## Optional fields (use when they help)
- `prereq` — short string, e.g. `'[[e1-01]] (the game loop) first'`. Use on Advanced lessons (guidance, not a lock).
- `steps` — array of procedure / click-path / pseudocode strings. Use for any hands-on procedure
  (a Blender or engine click-path, a Git command sequence, an algorithm in pseudocode). Be exact and
  correct; use the key markup for shortcuts. NEVER claim to show real engine/Blender output.
- `simplified` — one string flagging where you simplified, or where a detail is **version-dependent or
  uncertain**. Add it whenever you simplify or whenever an engine/tool specific could have changed.
  Honesty is mandatory.
- `goDeeper` — one string pointing to real further study (a named book/author, official Unity/Unreal/
  Godot/Blender docs, a known talk series like GDC, the MDA paper). No invented sources.
- `diagram` — a tool id to embed an interactive concept demo. Use ONLY when the lesson directly
  teaches that concept. One of: `pipeline`, `gdd`, `scope`, `coreloop`, `blockout`, `achieve`,
  `kanban`, `assetcheck`, `playground`, `narrative`. (The stub says when a diagram is wanted.)

## Markdown-lite syntax (used in concept, task, steps, success, quiz)
- `**bold**`, `*italic*`, `` `code` `` (engine terms, file types, function/variable names, units).
- `[[Ctrl+S]]` or `[[Tab]]` → keyboard-shortcut chip (split on `+`). Use for engine/Blender/Git keys.
- `[[e1-01]]` → clickable lesson cross-reference (pattern `<digit-or-a–f><digit>-<digits>`, pillars
  0,a–f). Cross-link related lessons — especially across pillars to show the **seams**.
- `((term))` → a vocabulary chip for game-dev jargon (juice, ludonarrative, texel density, navmesh, …).
- Blank line = new paragraph. A block of lines each starting `- ` becomes a bulleted list.
- **Fenced code blocks** for pseudocode / C# / GDScript / shader snippets: open and close with a line
  of three backticks ```` ``` ````, optionally with a language tag on the open fence (```` ```js ````).
  Content renders literally in a monospace `<pre>` (no markup inside). Keep snippets short and correct.
  **Fences must be balanced** (an even number of ```` ``` ```` per field) or the file renders wrong.

## Accuracy rules (non-negotiable)
- **Game-dev concepts must be correct**: the game loop, delta time / frame-independence, the MDA
  framework, PBR maps (albedo/normal/roughness/metallic/AO), finite state machines & behaviour trees,
  pathfinding (A*, navmeshes), shaders (vertex/fragment, GPU), version control. If you’re unsure of a
  number or a tool specific, **say so** (use `simplified`) rather than assert.
- **The two-layer programming split.** Pillar E Layer-1 lessons (phases `e0`, `e1`) are **engine-
  neutral**: teach the concept in plain terms / pseudocode / JS, frame it as **transferable**, and when
  you name the engine hook lead with **Godot** (e.g. `_process(delta)`), mentioning other engines only as
  "same idea elsewhere." Pillar E Layer-2 lessons (phase `e2`) and the engine-level lessons (phase `c4`)
  are **engine-specific for Godot 4.x**: open with a one-line banner like *"Engine-specific (Godot 4.x —
  GDScript or C#)."* Show code in **GDScript** as the primary language, and note that **C# is fully
  supported and equally valid** in Godot (statically typed, closer to the e0/e1 fundamentals, more
  transferable) — the learner may pick either; do NOT double every snippet. Keep the transferable concept
  visible, and label engine-specific content as such, everywhere.
- **Tool honesty — the site cannot run an engine or Blender.** Teach with concepts, exact click-paths,
  and JS *concept* demos only; **never fake engine or Blender output**, never imply a screenshot is
  real engine output. The browser runs JS, so JS demos of logic (game loop, FSM, vectors) are fair —
  but they illustrate the concept, they are not the engine.
- **Blender is assumed.** Do not teach Blender 101 (navigation, basic modelling). Teach the *game-ready*
  delta: poly budgets, topology, LODs, UVs for games, PBR, baking, export, optimisation.
- **Git is essential** for a team project — teach it properly and as a working habit.
- **Engine specifics may change** between versions and are remappable — state shortcuts/menus as
  "common defaults / check your version", not guarantees.
- **Scope & feasibility** appear as a through-line: where a topic invites over-scoping, say so and show
  the smaller version.
- **Colour-coded info needs a redundant cue** (label, shape, text) — note this where a lesson or its
  diagram uses colour to carry meaning (e.g. PBR channels, gizmo axes, difficulty).
- **No copyrighted reproduction.** Original wording only; reference games, engines and tools by name
  only; never reproduce manuals, brand guidelines, asset-store text or images. Game-deconstruction
  drills use the learner’s own observation of games they own/play.
- Be honest about **depth**: a real headstart to walk in versatile and ready — not mastery of any one
  of five careers. Add `goDeeper` where the real topic runs deeper.

## Quality bar
Never stub (no "coming soon", no one-liners) and never pad (no filler to hit a count). Every lesson
earns its place with real, specific content and a concrete task. Write in plain, active, encouraging
voice — you’re teaching a motivated dev who wants to do this for real.
