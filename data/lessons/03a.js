/* Pillar 0 · Phase 03 · Module 03a — Git fundamentals */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: '03-01', title: 'Why version control, and the mental model (commits & history)', pillarId: '0', phaseId: '03', moduleId: '03a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 20,
    concept:
'Eight people building one game will touch the same files. Without ((version control)), that ends in chaos: `level_final.unity`, `level_final_v2.unity`, `level_FINAL_actually.unity`, two people overwriting each other’s work, and no way back when a "small change" breaks the build the night before a sprint review ([[01-06]]). **Git** is the tool the minor expects you to use to make that pain disappear, so learn its *mental model* before any commands.\n\n' +
'The core idea: Git stores your project as a **history of snapshots**. Each snapshot is a ((commit)) — a saved state of the whole project at a moment, with a message saying what changed, who made it, and when. You don’t save *differences* in your head; you save a *checkpoint* you can always return to. The history is a chain of these checkpoints, each pointing back to the one before, so the project has a complete, time-stamped story of how it got here.\n\n' +
'Three mental anchors:\n\n' +
'- A ((repository)) (repo) is the project folder plus its entire history, stored in a hidden `.git` directory. Clone it and you get *everything*, not just the latest files.\n' +
'- A **commit** is an intentional checkpoint. You choose what goes in it and write a message. Good commits are small and focused — "Add double-jump", not "stuff".\n' +
'- The **history** is the chain of commits. Because every state is saved, you can look at the project as it was last Tuesday, compare two versions, or undo a bad change without losing the good ones.\n\n' +
'Why this matters for *you* as a versatile dev across five roles: version control isn’t a programmer-only tool. The level designer commits a blockout scene, the 3D modeller commits an exported asset, the writer commits a dialogue file. Everyone’s work flows through the same history, which is exactly what lets a team integrate without stepping on each other. Game projects add wrinkles — big binary files, scenes that don’t merge cleanly — which we handle later ([[03-04]]); first, lock in the snapshot-and-history model.',
    task:
'Without touching Git yet, write the *story* of version control for your own work. Take any project folder you have (a Blender file, a document, some code) and list the **five checkpoints** you’d have wanted to save as you made it — each as a one-line commit message in the imperative ("Add X", "Fix Y", "Block out the second room"). Then write two sentences answering: which past checkpoint would you most want to return to, and what went wrong that made you wish you could? This is the snapshot-and-history model applied to real work.',
    success: [
      'You can explain a commit as a saved snapshot of the whole project with a message, not a saved diff.',
      'You can describe project history as a chain of commits you can return to or compare.',
      'You can say why a repo holds the full history, not just the latest files — and why that helps an eight-person team.'
    ],
    skills: ['Version-control mental model', 'Commits as snapshots', 'Reading project history'],
    simplified: 'Technically a commit stores a snapshot via content-addressed objects (and Git computes diffs on demand), not a literal copy of every file each time — but "a commit is a snapshot you can return to" is the correct working model and the one that makes everything else make sense.',
    goDeeper: 'The free *Pro Git* book by Scott Chacon and Ben Straub (git-scm.com/book) is the standard reference; its first two chapters cover this model clearly. GitHub’s own "Git Handbook" is a gentler start.',
    quiz: [
      { q: 'Why is naming files `level_final_v2` a worse system than Git commits?', a: 'Manual version names don’t scale, don’t record *why* a change was made or by whom, and give no safe way to merge two people’s work or return to an exact earlier state. Git keeps a complete, time-stamped history of snapshots with messages, so any past state is recoverable and changes are attributable.' },
      { q: 'If a teammate clones the repo, what do they get — just the latest files?', a: 'They get the full repository: the current files plus the entire commit history stored in the hidden `.git` folder. That’s why anyone can inspect, compare or roll back to any past state without asking the original author.' },
      { q: 'What makes a "good" commit?', a: 'A small, focused, intentional checkpoint with a clear message describing what changed (ideally in the imperative, like "Add double-jump"). Small commits are easier to understand, review and undo than one giant "stuff" commit.' }
    ],
    tags: ['git', 'version control', 'commits', 'history', 'fundamentals', 'team'] },
  {
    id: '03-02', title: 'The core Git loop: clone, add, commit, push, pull', pillarId: '0', phaseId: '03', moduleId: '03a',
    difficulty: 'Beginner', mode: 'handson', estMinutes: 30,
    concept:
'Day to day, Git is a small rhythm you repeat hundreds of times. Learn this loop and you can collaborate; everything else (branches, conflicts, LFS) builds on it ([[03-03]], [[03-04]]).\n\n' +
'First, understand the **three places** a file can be, because the commands move files between them:\n\n' +
'- the ((working directory)) — your actual files, where you edit;\n' +
'- the ((staging area)) (the "index") — a holding area for the exact changes you want in the next commit;\n' +
'- the **repository** — the committed history.\n\n' +
'The reason for the staging area is control: you decide *precisely* which changes go into a commit, instead of being forced to commit everything you touched. You stage with `git add`, then snapshot the staged set with `git commit`.\n\n' +
'The everyday loop, in order:\n\n' +
'- `git clone <url>` — once per project: copy a remote repo (e.g. on GitHub) to your machine, full history included.\n' +
'- `git pull` — *start of a work session*: fetch teammates’ commits from the remote and merge them into your copy, so you build on the latest work.\n' +
'- *...you edit files...*\n' +
'- `git add <files>` — stage the changes you want to keep.\n' +
'- `git commit -m "message"` — snapshot the staged changes into local history.\n' +
'- `git push` — send your new commits up to the shared remote for the team.\n\n' +
'The golden habit for a team: **pull before you start, commit in small focused chunks, push when a piece works.** Pulling first means you rarely surprise a teammate; small commits mean a broken change is easy to find and undo; pushing working pieces keeps the shared project moving. Commit messages are written for your *teammates and future self* — "Add coin pickup sound", not "asdf". You’ll run this loop from a terminal or from a Git GUI (GitHub Desktop, the engine’s built-in panel); the commands below are the universal ground truth underneath every GUI button.',
    task:
'Run the core loop once, for real, on a throwaay repo. Make a folder, put a text file in it, and take it through `init → add → commit`, then edit and commit again so you have a **two-commit history** you can read with `git log`. (If you have a GitHub account, instead `clone` an empty repo and `push` to it to feel the remote half.) Write down, in your own words, what each of the five commands did and which of the three places (working directory / staging / repository) it moved your file between.',
    steps: [
      'Install Git (git-scm.com) and confirm it works: `git --version`. Set your identity once per machine: `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"` — Git stamps every commit with this.',
      'Make a practice repo: create an empty folder, open a terminal in it, and run `git init`. This creates the hidden `.git` folder — the working directory is now a repository.',
      'Create a file (e.g. a `notes.txt`) and check status: `git status`. Git lists it as *untracked* — it exists in your working directory but isn’t staged or committed yet.',
      'Stage it: `git add notes.txt` (or `git add .` for everything). Run `git status` again — it’s now staged, sitting in the staging area, ready to commit.',
      'Commit it: `git commit -m "Add starter notes"`. That snapshots the staged change into the repository as commit #1, with your message and identity.',
      'Edit the file, save, then repeat `git add notes.txt` and `git commit -m "Expand the notes"`. You now have a two-commit history.',
      'Read the history: `git log --oneline`. You should see both commits, newest first, each with a short hash and your message — proof the chain from [[03-01]] is real.',
      'Optional remote half: on GitHub create an empty repo, then `git remote add origin <url>`, `git branch -M main`, and `git push -u origin main` to publish. From then on, a session is `git pull` at the start and `git push` when a piece works.'
    ],
    success: [
      'You ran add → commit twice and can read a two-commit history with `git log`.',
      'You can say, for each command, which of the three places (working directory / staging / repository) it acts on.',
      'You can state the team habit — pull at the start, small focused commits, push working pieces — and why each part helps.'
    ],
    skills: ['The core Git loop', 'Staging vs committing', 'Reading git log', 'Pull/push discipline'],
    simplified: 'Exact menu items and button labels differ between Git versions and GUIs (GitHub Desktop, the engine’s Version Control panel), and `init` vs `clone` are two ways to get a repo — check your tool. The five-command loop and the three-places model are stable across all of them.',
    goDeeper: 'Practise on a real remote with the free *Pro Git* book (git-scm.com/book, chapters 2–3) and GitHub’s "Hello World" guide; once the loop is reflex, move to branches and pull requests in [[03-03]].',
    quiz: [
      { q: 'What is the staging area for, and which command puts changes there?', a: 'The staging area (index) lets you choose exactly which changes go into the next commit instead of committing everything you touched. `git add <files>` moves changes from the working directory into staging; `git commit` then snapshots whatever is staged into the repository.' },
      { q: 'What’s the difference between `git commit` and `git push`?', a: '`git commit` saves a snapshot to your *local* repository — it’s offline and only on your machine. `git push` uploads your local commits to the shared *remote* (e.g. GitHub) so teammates can pull them. You commit often; you push when a piece is worth sharing.' },
      { q: 'Why pull at the start of a work session?', a: '`git pull` fetches teammates’ latest commits and merges them into your copy, so you build on current work rather than an outdated version. Pulling first dramatically reduces conflicts and the chance you redo or overwrite something a teammate already changed.' }
    ],
    tags: ['git', 'clone', 'commit', 'push', 'pull', 'staging'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
