/* Pillar 0 · Phase 03 · Module 03b — Git on a team */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '03-03', title: 'Branches, pull requests and resolving merge conflicts', pillarId: '0', phaseId: '03', moduleId: '03b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    prereq: '[[03-02]] (the core clone → add → commit → push → pull loop) first',
    concept:
'The solo Git loop from [[03-02]] keeps *your* work safe. A **branch** is what lets eight people work at once without overwriting each other. A branch is just a moving label pointing at a line of commits — cheap, instant, and the heart of team Git.\n\n' +
'The working pattern is **feature branches**. Nobody commits straight to `main` (the branch that must always build). Instead each piece of work gets its own branch off `main`:\n\n' +
'```\ngit switch -c feature/jump-mechanic   # make + move to a new branch\n# ...commit your work here...\ngit push -u origin feature/jump-mechanic\n```\n\n' +
'When the feature is done you open a **pull request** (PR) — GitHub/GitLab terminology for "please review my branch and merge it into `main`". A PR is a *conversation and a gate*: teammates read the diff, comment, and approve before it lands. For a student team this is gold — it is where critique ([[02-02]]) becomes a habit and where `main` stays shippable for the sprint review ([[01-06]]).\n\n' +
'Sometimes two branches change *the same lines* of the same file. Git cannot guess which wins, so it stops and reports a **merge conflict**. This is normal, not a disaster. Git marks the clash inside the file with conflict markers:\n\n' +
'```\n<<<<<<< HEAD\nplayerSpeed = 8;      // your branch\n=======\nplayerSpeed = 6;      // the branch you are merging in\n>>>>>>> main\n```\n\n' +
'You **resolve** it by editing the file to the version you actually want (keep one, keep both, or write something new), deleting the `<<<<`, `====`, `>>>>` markers, then `git add` the file and commit. The key mindset: a conflict is Git *handing you the decision*, not failing. Conflicts get smaller and rarer when branches are **short-lived and merged often** — the real fix is a habit, not a command. Merging once a day beats one giant merge at the end of the sprint.\n\n' +
'One game-specific warning that the next lesson expands: text files (code, `.cs`, `.gd`) merge line-by-line, but **binary game files — Blender `.blend`, engine scenes, textures — do not.** Git cannot merge two changes to a scene; one overwrites the other. That changes how a game team coordinates, and is exactly why [[03-04]] exists.',
    task:
'Make a throwaway practice repo and rehearse the whole branch → PR → conflict cycle by hand, so it is muscle memory before the team relies on it. Deliberately *create* a merge conflict on one file, then resolve it. Write down, in your own words, the four-line recipe for resolving any conflict (find markers → choose the real content → delete markers → add + commit). Finally, note one rule your future team should adopt to keep conflicts rare.',
    steps: [
      'Create a sandbox repo: `git init conflict-practice`, then add a file `notes.txt` with one line of text, `git add notes.txt`, `git commit -m "base"`.',
      'Branch and edit: `git switch -c edit-a`, change the line to "version A", commit it.',
      'Go back and branch differently: `git switch main`, then `git switch -c edit-b`, change the SAME line to "version B", commit it.',
      'Trigger the conflict: `git switch main`, `git merge edit-a` (clean), then `git merge edit-b` — Git stops and reports a conflict.',
      'Open `notes.txt` and find the [[<<<<<<< HEAD]] / `=======` / `>>>>>>> edit-b` markers wrapping the two versions.',
      'Resolve: edit the file to the single line you actually want and DELETE all three marker lines.',
      'Finish: `git add notes.txt`, then `git commit` — the conflict is resolved and recorded.',
      'On a real project this maps to a PR: push the feature branch, open the PR on GitHub/GitLab, get a review, resolve any conflict against `main`, then merge.'
    ],
    success: [
      'You can create a feature branch, push it, and explain what a pull request is for.',
      'You can resolve a merge conflict by editing out the markers, then add + commit.',
      'You can explain why short-lived, frequently-merged branches prevent painful conflicts.'
    ],
    skills: ['Feature-branch workflow', 'Pull requests & review', 'Resolving merge conflicts'],
    simplified: 'Commands are shown in modern Git (`git switch`); older tutorials use `git checkout -b` / `git checkout`, which still work. "Pull request" (GitHub/GitLab) is also called a "merge request" (GitLab). The host UI changes between versions — treat menu names as common defaults, not guarantees.',
    goDeeper: 'The free *Pro Git* book by Scott Chacon (git-scm.com/book) has clear chapters on branching and resolving conflicts; for the team pattern, read about "trunk-based development" vs "Git Flow" and pick the lightest one your team can sustain.',
    quiz: [
      { q: 'Why does a team use feature branches instead of everyone committing to `main`?', a: 'So work proceeds in parallel without clobbering each other, and `main` stays in a known-good, shippable state. Each branch is isolated until it is reviewed in a pull request and merged, which keeps the build green for the sprint review.' },
      { q: 'Git reports a merge conflict. Is something broken, and what do you do?', a: 'Nothing is broken — two branches changed the same lines and Git is asking you to choose. Open the file, edit it to the content you actually want, delete the `<<<<<<<`, `=======` and `>>>>>>>` marker lines, then `git add` the file and commit. Frequent small merges keep conflicts rare.' },
      { q: 'Why can Git merge two edits to a `.cs` file but not to an engine scene file?', a: 'Code is text, so Git can compare and combine changes line by line. Scenes, `.blend` files and textures are binary blobs Git cannot read or merge — it can only keep one whole version or the other, which is why binary assets need extra coordination (see [[03-04]]).' }
    ],
    tags: ['git', 'branches', 'pull request', 'merge conflict', 'teamwork', 'workflow'] },
  {
    id: '03-04', title: 'Git for game projects: large binaries, LFS, .gitignore, scenes', pillarId: '0', phaseId: '03', moduleId: '03b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    prereq: '[[03-03]] (branches and conflicts) first — this is the game-specific layer on top',
    concept:
'Git was built for source code. A game project is mostly *not* source code — it is gigabytes of textures, meshes, audio, `.blend` files and engine scenes. Three habits stop Git from choking on a game repo, and a student team that skips them ends up with a 30 GB repo nobody can clone.\n\n' +
'**1. `.gitignore` — never commit generated files.** Engines produce huge, machine-specific folders that must NOT go in version control: Unity’s `Library/`, `Temp/`, `obj/`; Unreal’s `Saved/`, `Intermediate/`, `DerivedDataCache/`; Godot’s `.godot/`. They are rebuilt automatically on each machine, bloat the repo, and cause endless conflicts. A `.gitignore` file lists patterns Git skips. Use the engine’s official template (GitHub publishes one per engine) as your starting point.\n\n' +
'**2. Git LFS — for the big binaries you DO keep.** You still need to track your real art: textures, models, audio. But Git stores a *full copy of every version* of every file, so a 50 MB texture edited ten times becomes 500 MB of history. **Git LFS (Large File Storage)** fixes this: Git stores a tiny text pointer in history and keeps the heavy file in a separate store, so cloning stays fast. You tell LFS which extensions to handle:\n\n' +
'```\ngit lfs install\ngit lfs track "*.png" "*.fbx" "*.wav" "*.blend"\ngit add .gitattributes      # commit this — it is how teammates inherit the rules\n```\n\n' +
'**3. Binary files cannot be merged — so coordinate, do not collide.** As [[03-03]] warned, Git cannot merge two people’s edits to one scene or `.blend`; one overwrites the other and that work is *gone*. The team-level fixes: split work into **many smaller scenes / prefabs** so two people rarely touch the same file; agree *who owns which scene* this sprint (a Kanban/ownership habit, [[02-05]]); and use **file locking** (Git LFS supports locks; many teams lock scenes before editing). This is also why the 3D track’s naming and export discipline ([[d5-04]]) matters — clean, separate, well-named files collide far less.\n\n' +
'The through-line: Git on a game project is 20% commands and 80% *agreements about who touches what*. Set up `.gitignore` and LFS once at the start of the project (it belongs in your toolchain setup, [[04-02]]); the coordination habits you practise all semester.',
    task:
'For a small game project, draft the three pieces of Git hygiene before any art exists, because retrofitting them later means rewriting history. Write a starter `.gitignore` (list the generated folders for your chosen engine), a `git lfs track` line covering the binary types your game will use, and a one-paragraph "scene ownership" rule your team will follow so two people never edit the same scene at once. Then explain in two sentences what would go wrong if you committed the engine’s `Library/` (or `Saved/`) folder.',
    steps: [
      'Initialise and add LFS up front: `git init`, then `git lfs install` (run once per machine).',
      'Tell LFS which binaries to handle: `git lfs track "*.png" "*.fbx" "*.wav" "*.blend"` — this writes a `.gitattributes` file.',
      'Commit the rules so teammates inherit them: `git add .gitattributes`, `git commit -m "Set up LFS tracking"`.',
      'Create a `.gitignore` from the engine’s official template (search "github gitignore Unity/Unreal/Godot"); confirm it ignores `Library/` & `Temp/` (Unity), `Saved/` & `Intermediate/` (Unreal), or `.godot/` (Godot).',
      'Verify nothing generated is staged: `git status` should show source, assets and the config files — never the ignored engine folders.',
      'Agree the human rules in writing: one scene = one owner per sprint; split big scenes into smaller ones; optionally `git lfs lock <scene>` before editing a shared binary and `git lfs unlock` after.',
      'Sanity check before the first big commit: clone the repo fresh into another folder and confirm it pulls quickly and the engine rebuilds its ignored folders on open.'
    ],
    success: [
      'You can list which engine folders belong in `.gitignore` and say why generated files are never committed.',
      'You can set up Git LFS and explain why big binaries need it (full-history copies bloat the repo).',
      'You can state at least two team habits that prevent lost work on un-mergeable binary files.'
    ],
    skills: ['.gitignore for engines', 'Git LFS for binaries', 'Binary coordination & locking'],
    simplified: 'Exact ignore patterns and folder names are engine- and version-specific — always start from the engine’s current official `.gitignore` template rather than memorising a list. LFS quotas/limits depend on your host (GitHub, GitLab, self-hosted); check the host’s storage limits before committing a large asset library.',
    goDeeper: 'Read the Git LFS docs (git-lfs.com) and your engine’s official "version control" guide (Unity, Unreal and Godot each publish one). For the bigger team picture, look at how studios use Perforce for huge binary projects — it is the industry norm for art-heavy games and worth knowing exists.',
    quiz: [
      { q: 'Why must you never commit Unity’s `Library/` (or Unreal’s `Saved/`) folder?', a: 'It is generated, machine-specific, and large — the engine rebuilds it automatically on each computer. Committing it bloats the repo with gigabytes that change constantly and cause needless conflicts, while providing nothing a teammate cannot regenerate by opening the project.' },
      { q: 'What problem does Git LFS solve that plain Git does not?', a: 'Plain Git keeps a full copy of every version of every file in history, so repeatedly edited binaries (textures, models, audio) balloon the repo. LFS stores a small pointer in Git history and keeps the heavy file in a separate store, so the repo and clones stay fast even with a big asset library.' },
      { q: 'Two artists edit the same engine scene on separate branches. What happens on merge, and how do teams avoid it?', a: 'Git cannot merge a binary scene, so one version overwrites the other and that work is lost. Teams avoid it by splitting work into many small scenes/prefabs, assigning clear per-sprint ownership of each scene, and using file locking (Git LFS locks) before editing shared binaries.' }
    ],
    tags: ['git', 'git lfs', 'gitignore', 'binaries', 'scenes', 'game project'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
