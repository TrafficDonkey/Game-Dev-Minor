/* Pillar 0 · Phase 04 · Module 04b — Tooling setup */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '04-02', title: 'Your toolchain: engine, Blender, Git and project structure', pillarId: '0', phaseId: '04', moduleId: '04b',
    difficulty: 'Beginner', mode: 'handson', estMinutes: 35,
    concept:
'A game team’s real first deliverable isn’t a feature — it’s a **working toolchain everyone shares**. Before anyone scripts a jump or models a crate, the team needs a project that opens cleanly on eight machines, talks to version control, and has a place for every kind of file. Setting that up badly costs weeks of "it works on mine"; setting it up well is mostly free. This lesson wires together the four tools you already know about into one pipeline.\n\n' +
'The four pieces and how they connect:\n\n' +
'- **The engine** (default **Unity**, swappable to Unreal/Godot) is the *integration point* — where art, code, levels and audio meet and become a playable build. It owns the project folder.\n' +
'- **Blender** is your *asset source*. It exports game-ready meshes (FBX or glTF — [[d5-03]]) into the engine’s asset folder. Blender’s own `.blend` files are working files, not what ships.\n' +
'- **Git** is the *team’s memory* — every change, every version, recoverable ([[03-01]]). It tracks the project but, crucially, **not everything in the folder** (see below).\n' +
'- A sane **project structure** is the glue: a predictable folder layout so a teammate can find the player prefab or a texture without asking.\n\n' +
'The single most important setup decision is what Git **ignores**. An engine project generates large, machine-specific folders — Unity’s `Library/`, `Temp/`, `obj/`, `Build/` — that must *never* be committed: they bloat history, cause constant conflicts, and regenerate automatically. A `.gitignore` file lists them so Git skips them ([[03-04]]). You commit your `Assets/`, `Packages/` and `ProjectSettings/`; you ignore the generated rest. Get this wrong and your first push is gigabytes of garbage.\n\n' +
'There’s a scope angle here too ([[04-01]]): pick **one** engine and **one** export format for the whole team and write it down. Toolchain sprawl — three people on three Unity versions, two export formats — is a silent scope cost that shows up as broken imports in week three. Boring, locked, documented tooling is what lets the *interesting* work happen. Decide it once, on day one, together.',
    task:
'Set up a clean, version-controlled engine project on your own machine following the steps below, then write a short **`TOOLCHAIN.md`** for your (imagined or real) team that pins down four things: the exact engine + version, the Blender export format and units ([[d5-04]]), the folder layout under `Assets/`, and the rule for what Git ignores. Commit it. The deliverable is a repo a teammate could clone and open without a single question.',
    steps: [
      'Pick and pin the engine. Install your chosen engine (Unity Hub lets you pin an exact editor version). Agree **one** version for the whole team and record it — mixed versions silently corrupt project files.',
      'Create the project, then immediately quit the editor so it has generated its folders.',
      'Open a terminal in the project root and initialise Git: `git init`.',
      'Add a `.gitignore` **before your first commit**. Use the engine-appropriate template (GitHub publishes one named `Unity.gitignore`; Godot and Unreal have theirs). It excludes generated folders like `Library/`, `Temp/`, `Logs/`, `obj/`, `Build/` and `*.csproj`/`*.sln` for Unity.',
      'Plan a folder layout under `Assets/` — e.g. `Art/`, `Models/`, `Materials/`, `Prefabs/`, `Scenes/`, `Scripts/`, `Audio/`, `UI/`. Add an empty `Scenes/` and `Scripts/` now so the structure exists from commit one.',
      'Decide your Blender → engine export contract: format (FBX or glTF), scale (1 unit = 1 metre, apply transforms, +Y up vs +Z up per engine) and a naming convention ([[d5-04]]). Put it in `TOOLCHAIN.md`.',
      'Stage and commit the foundation: `git add .gitignore TOOLCHAIN.md Assets ProjectSettings Packages` then `git commit -m "chore: project skeleton + toolchain"`.',
      'Sanity-check what Git is tracking: `git status` should show a small, sane set of files — **not** `Library/` or thousands of generated files. If it does, fix `.gitignore` and `git rm -r --cached Library` before pushing.',
      'Push to the team remote ([[03-02]]) and have one teammate test-clone it.'
    ],
    success: [
      'You have an engine project under Git whose first commit excludes all generated/`Library/`-style folders.',
      'Your `Assets/` has a documented, predictable folder layout, not a flat dump.',
      'Your `TOOLCHAIN.md` pins engine version, export format/units and the .gitignore rule — enough for a teammate to clone and open with no questions.'
    ],
    skills: ['Setting up an engine project under Git', 'Engine .gitignore hygiene', 'Project structure & toolchain docs'],
    simplified: 'Exact menu paths, the Unity Hub flow and ignore-template contents are version-dependent — use the current `.gitignore` template for *your* engine and version rather than memorising a list. Large binary assets also want Git LFS, covered properly in [[03-04]].',
    goDeeper: 'GitHub’s `gitignore` repository hosts maintained `Unity.gitignore`, `Godot.gitignore` and `UnrealEngine.gitignore` templates; your engine’s official docs cover the recommended project structure and version-control setup, and [[c4-01]] / [[e2-01]] begin the engine-specific work this foundation supports.',
    quiz: [
      { q: 'Why must a Unity project’s `Library/` folder be in `.gitignore` rather than committed?', a: 'It’s a large, machine-specific cache the engine regenerates automatically from your `Assets/` and `ProjectSettings/`. Committing it bloats history, triggers constant merge conflicts between teammates, and gains nothing — Git should track your source (`Assets/`, `Packages/`, `ProjectSettings/`) and let each machine rebuild the generated rest.' },
      { q: 'Your team has three people on three slightly different engine versions. What can go wrong, and what’s the fix?', a: 'Different editor versions can rewrite shared project/scene files in incompatible ways, causing broken imports and corrupted scenes that look like random bugs. The fix is to agree and pin one exact version for everyone and record it in the toolchain doc — boring, locked tooling prevents a whole class of "works on mine" failures.' },
      { q: 'What should you set up *before* your very first commit, and why the order?', a: 'The `.gitignore`. If you commit first, the generated folders (e.g. `Library/`, `Temp/`) get into the repo and history; removing them afterwards needs `git rm -r --cached` and they linger in history. Adding `.gitignore` first means those files are never tracked in the first place.' }
    ],
    tags: ['toolchain', 'git', 'gitignore', 'project structure', 'engine setup', 'pipeline'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
