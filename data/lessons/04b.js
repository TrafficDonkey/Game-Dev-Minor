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
'- **The engine** is **Godot 4.x** — the *integration point* where art, code, levels and audio meet and become a playable build. It owns the project folder (`project.godot` at the root). You may script in **GDScript or C#**; if you choose C#, install the **.NET / C# build of Godot** rather than the standard download.\n' +
'- **Blender** is your *asset source*. It exports game-ready meshes into the engine’s project folder — for Godot **prefer glTF (`.glb`)**, which Godot imports first-class (FBX works, but glTF is the cleaner path — [[d5-03]]). Blender’s own `.blend` files are working files, not what ships (Godot can even import `.blend` directly when Blender is installed).\n' +
'- **Git** is the *team’s memory* — every change, every version, recoverable ([[03-01]]). It tracks the project but, crucially, **not everything in the folder** (see below).\n' +
'- A sane **project structure** is the glue: a predictable folder layout so a teammate can find the player scene (`.tscn`) or a texture without asking.\n\n' +
'The single most important setup decision is what Git **ignores**. A Godot project generates a large, machine-specific editor cache — the **`.godot/`** folder (Godot 4’s reimport/cache directory) — that must *never* be committed: it bloats history, causes conflicts, and regenerates automatically. A `.gitignore` file lists it so Git skips it ([[03-04]]). You commit your **`project.godot`**, your scenes (**`.tscn`**) and resources (**`.tres`**), your scripts, and source assets plus their **`.import`** files; you ignore the generated `.godot/` cache. A real Godot advantage: its scene and resource files are **text-based**, so they diff and merge in Git far better than Unity’s binary scenes — versioning levels and reusable scenes (`PackedScene`s) is pleasant here. Get the ignore wrong and your first push is gigabytes of cache.\n\n' +
'There’s a scope angle here too ([[04-01]]): pick **one** Godot version and **one** export format for the whole team and write it down. Toolchain sprawl — three people on three Godot versions, two export formats — is a silent scope cost that shows up as broken imports in week three. Boring, locked, documented tooling is what lets the *interesting* work happen. Decide it once, on day one, together.',
    task:
'Set up a clean, version-controlled **Godot 4.x** project on your own machine following the steps below, then write a short **`TOOLCHAIN.md`** for your (imagined or real) team that pins down four things: the exact Godot version (and whether it’s the standard or the **.NET/C# build**), the Blender export format and units ([[d5-04]]), the folder layout under `res://`, and the rule for what Git ignores. Commit it. The deliverable is a repo a teammate could clone and open without a single question.',
    steps: [
      'Pick and pin Godot. Download **Godot 4.x** — the **standard** build for GDScript-only, or the **.NET/C#** build if anyone will write C#. Godot ships as a single portable executable, so simply keep the exact version everyone uses (e.g. in the repo or a pinned download link). Agree **one** version for the whole team and record it — mixed versions silently rewrite project files.',
      'Create the project (Project Manager → New Project), open it once so Godot generates its files, then quit the editor.',
      'Open a terminal in the project root and initialise Git: `git init`.',
      'Add a `.gitignore` **before your first commit**. Use the Godot template (GitHub publishes one named `Godot.gitignore`). At minimum it ignores the **`.godot/`** editor cache; if you use C#, also ignore the build output (`.mono/`, `bin/`, `obj/`).',
      'Plan a folder layout under `res://` — e.g. `art/`, `models/`, `materials/`, `scenes/`, `scripts/`, `audio/`, `ui/`. Add an empty `scenes/` and `scripts/` now so the structure exists from commit one. (Godot paths are lowercase by convention.)',
      'Decide your Blender → Godot export contract: format (**prefer glTF `.glb`** for Godot; FBX is allowed), scale (1 unit = 1 metre, apply transforms; Godot is **+Y up** so glTF imports cleanly) and a naming convention ([[d5-04]]). Put it in `TOOLCHAIN.md`.',
      'Stage and commit the foundation: `git add .gitignore TOOLCHAIN.md project.godot scenes scripts` (and any starter `.tscn`/`.tres`) then `git commit -m "chore: project skeleton + toolchain"`.',
      'Sanity-check what Git is tracking: `git status` should show a small, sane set of files — **not** the `.godot/` cache or thousands of generated files. If it does, fix `.gitignore` and `git rm -r --cached .godot` before pushing.',
      'Push to the team remote ([[03-02]]) and have one teammate test-clone it.'
    ],
    success: [
      'You have a Godot project under Git whose first commit excludes the generated `.godot/` cache.',
      'Your `res://` has a documented, predictable folder layout, not a flat dump.',
      'Your `TOOLCHAIN.md` pins the Godot version (and standard vs .NET build), export format/units and the .gitignore rule — enough for a teammate to clone and open with no questions.'
    ],
    skills: ['Setting up a Godot project under Git', 'Godot .gitignore hygiene', 'Project structure & toolchain docs'],
    simplified: 'Exact menu paths and ignore-template contents are version-dependent — use the current `Godot.gitignore` template for *your* Godot version rather than memorising a list, and check whether you need the standard or .NET/C# build. Large binary assets also want Git LFS, covered properly in [[03-04]].',
    goDeeper: 'GitHub’s `gitignore` repository hosts a maintained `Godot.gitignore` template; Godot’s official docs cover the recommended project organisation and the "version control" page (what to commit vs ignore, the `.import` system), and [[c4-01]] / [[e2-01]] begin the engine-specific Godot work this foundation supports.',
    quiz: [
      { q: 'Why must a Godot project’s `.godot/` folder be in `.gitignore` rather than committed?', a: 'It’s a large, machine-specific editor cache Godot regenerates automatically from your project on reimport. Committing it bloats history, triggers constant merge conflicts between teammates, and gains nothing — Git should track your source (`project.godot`, your `.tscn`/`.tres` files, scripts, and the assets plus their `.import` files) and let each machine rebuild the `.godot/` cache.' },
      { q: 'Your team has three people on three slightly different Godot versions. What can go wrong, and what’s the fix?', a: 'Different Godot versions can rewrite shared project/scene (`.tscn`) files in incompatible ways, causing broken imports and corrupted scenes that look like random bugs. The fix is to agree and pin one exact Godot version for everyone (standard or .NET build) and record it in the toolchain doc — boring, locked tooling prevents a whole class of "works on mine" failures.' },
      { q: 'What should you set up *before* your very first commit, and why the order?', a: 'The `.gitignore`. If you commit first, the generated `.godot/` cache gets into the repo and history; removing it afterwards needs `git rm -r --cached` and it lingers in history. Adding `.gitignore` first means those files are never tracked in the first place.' }
    ],
    tags: ['toolchain', 'git', 'gitignore', 'project structure', 'godot setup', 'pipeline'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
