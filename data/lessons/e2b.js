/* Pillar E · Phase e2 · Module e2b — Systems & quality (Layer 2, Godot 4.x — GDScript or C#) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e2-06', title: 'UI and game state / scene management', pillarId: 'E', phaseId: 'e2', moduleId: 'e2b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The transferable concept underneath is: a game is a set of **scenes** plus a small amount of **state** that must survive moving between them. (Same idea elsewhere: Unreal’s Widgets + GameInstance/level streaming.)*\n\n' +
'Three things sit together here and beginners tangle them, so we will keep them apart.\n\n' +
'**Scenes** are Godot’s unit of "a loaded chunk of game" — a main menu, a level, a game-over screen — each a saved tree of nodes (a `.tscn`). You switch the running one with `get_tree().change_scene_to_file("res://levels/level_2.tscn")`. By default that **frees** the current scene and everything in it, which is exactly why naive state vanishes between levels.\n\n' +
'**UI** in Godot is built from **`Control` nodes** — `Button`, `Label`, `TextureProgressBar`, and `Container`s for layout — usually placed under a `CanvasLayer` so they draw on top of the world. You **drive it from script** by connecting **signals**: a `Button` emits `pressed`, and a script updates a health bar by setting its `value`. The durable habit (the seam to game feel, [[b0-04]]): UI should *read* game state, not *own* it. The score lives in a game-state object; the `Label` just displays it.\n\n' +
'**Game state** is the data that defines "where the player is in the game": current score, lives, level, paused-or-not. The classic structure is a tiny **state machine** for the whole game — `MainMenu → Playing → Paused → GameOver` — the same FSM idea from [[e1-07]], now governing the *application*, not an enemy. Pausing is `get_tree().paused = true`; you then set each node’s `process_mode` to decide what keeps running (a pause menu stays `PROCESS_MODE_ALWAYS`).\n\n' +
'The piece that ties it together: **persisting state across scene loads.** A score object inside `level_1.tscn` is freed when you change scenes. The clean Godot fix is an **autoload (singleton)**: register a script under Project → Project Settings → Globals/Autoload, and that one **manager** node lives outside the swapped scene and survives every change. Pick one owner for run state and route everything through it — scattered state is the bug factory here. We push this further into real save files in [[e3-03]].\n\n' +
'*C# is fully supported here and equally valid:* the same `GetTree().ChangeSceneToFile(...)`, the same autoload, `[Signal]`-declared events, and PascalCase `Control` nodes — pick whichever language you prefer for the project.',
    task:
'Block out the **state and scene flow** for a tiny 2-level game on paper, then wire the script skeleton (no full project needed). 1) Draw the game-state FSM: `MainMenu → Playing → Paused → GameOver`, with the events that cause each transition. 2) Decide the **owner** of run state (score, lives, current level) and how it survives a scene change — name the exact mechanism (a Godot **autoload singleton**). 3) Write the GDScript skeleton below out by hand and fill the three TODOs: change to the next level, update the score label, and toggle pause. Keep it honest — a `Label` that *reads* `GameState.score`, never one that *stores* the score.',
    steps: [
      'Build the UI: add a `CanvasLayer`, then a `Button` and a `Label` under it. (Node names/menus are common defaults; check your Godot version.)',
      'Make ONE owner for run state as an **autoload** (Project → Project Settings → Globals → Autoload → add the script, name it `GameState`):',
      '```gdscript\n# game_state.gd — registered as the autoload "GameState"\nextends Node\n\nvar score: int = 0\nvar lives: int = 3\nvar level: int = 1\n# Because it is an autoload, this node lives outside the swapped scene\n# and survives every change_scene_to_file().\n```',
      'Drive scene flow + UI from a node script on the level:',
      '```gdscript\nextends Node\n\n@onready var score_label: Label = $CanvasLayer/Label\n\nfunc _process(_delta: float) -> void:\n\tscore_label.text = "Score: %d" % GameState.score   # UI READS state\n\nfunc next_level() -> void:\n\tGameState.level += 1\n\tget_tree().change_scene_to_file("res://levels/level_%d.tscn" % GameState.level) # TODO: confirm path\n\nfunc toggle_pause() -> void:\n\tget_tree().paused = not get_tree().paused           # freezes processing\n```',
      'Connect the `Button`’s `pressed` signal (Node dock → Signals, or in code with `button.pressed.connect(next_level)`) to `next_level` or `toggle_pause`.',
      'Reference scenes by their `res://` path — `change_scene_to_file` loads the `.tscn` directly, so there is no separate build-list to maintain.'
    ],
    success: [
      'You can name the three separate concerns — scenes, UI (`Control` nodes), and game state — and keep UI as a *reader* of state.',
      'You can model the whole-game flow as an FSM (MainMenu/Playing/Paused/GameOver) with clear transitions.',
      'You can explain why state dies on a scene change and use one mechanism (a Godot autoload singleton) to persist it.'
    ],
    skills: ['Scene management', 'UI driven by state', 'Whole-game state machine', 'Persisting state across loads'],
    simplified: 'Node names, menu paths and the autoload setup are version-dependent and remappable — treat them as common defaults, not guarantees. An autoload is the simplest run-state owner to teach; production projects often add a proper service or a `Resource` holder so it is testable ([[e2-08]]) and easy to reset between runs.',
    goDeeper: 'Godot’s manual sections on `SceneTree`/`change_scene_to_file`, `Control` nodes and GUI containers, and "Singletons (Autoload)" are the right references; for the application-level state machine, revisit [[e1-07]] and apply it one level up.',
    quiz: [
      { q: 'You set the player’s score in `level_1.tscn`, change to `level_2.tscn`, and the score is gone. Why — and what fixes it?', a: 'Changing scenes frees the previous scene and its nodes by default, so the node holding the score is gone. Fix it by giving run state a single owner that lives outside the swapped scene — in Godot, an **autoload (singleton)** node that each level reads on start.' },
      { q: 'Why should a UI health bar *read* game state rather than store the health itself?', a: 'Because the UI is a view, not the source of truth. If health lives in one game-state object and the bar just displays it (e.g. by setting a `TextureProgressBar`’s `value`), every system agrees on one value, the UI can be rebuilt or swapped freely, and you avoid two copies of "health" drifting out of sync.' }
    ],
    tags: ['godot', 'ui', 'control nodes', 'scene management', 'game state', 'autoload'] },
  {
    id: 'e2-07', title: "Debugging and the engine's tools", pillarId: 'E', phaseId: 'e2', moduleId: 'e2b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). The transferable skill is the same everywhere: form a hypothesis, observe reality, and close the gap — the engine just gives you the instruments. (Same idea elsewhere: Unreal’s Output Log + `UE_LOG`, the Blueprint debugger and Insights.)*\n\n' +
'Debugging is not flailing; it is **the scientific method on a deadline**. State what you expect, observe what actually happens, and change one thing at a time until expectation and reality agree. New programmers lose hours by guessing and editing randomly; you will be faster by *looking first*.\n\n' +
'Godot gives you a tiered toolkit. The cheapest tool is **`print()`** — write a value to the **Output** panel to confirm a line ran and a variable holds what you think. Use `push_warning()`/`push_error()` for severity, and remember that excessive printing every frame tanks performance and buries the message that matters. A step up is **`draw_line`/drawing in `_draw()`** (2D) or a temporary debug mesh / `RayCast2D`/`RayCast3D` node you can *see* in the viewport — a raycast, a target direction, a navigation sample — which often reveals the bug instantly.\n\n' +
'The power tool is the **built-in debugger**: set a breakpoint by clicking the gutter (or write `breakpoint`) and run the project — execution **freezes** at that line so you can inspect every variable in the **Stack Frames / Variables** view, read the call stack, and step line-by-line with **Step Into** and **Step Over** ([[F11]] into, [[F10]] over are common defaults). This beats scattering prints once a bug is non-trivial. It works for both GDScript and C# (attach an external C# debugger like VS Code/Rider for the C# side).\n\n' +
'Two Godot-specific instruments round it out. The **Remote scene tree** (the *Remote* tab while the game runs) shows the live node tree and lets you select a node and watch its properties change in the Inspector as you play — see a velocity or a state value tick over without a single print. The **Debugger → Profiler / Monitors** answers "*why is it slow?*" by showing per-frame CPU cost and engine monitors (draw calls, objects, memory), so you optimise the real hotspot instead of guessing. The deep version is a topic of its own; for now, learn to read the frame.\n\n' +
'A read on a very common Godot error: trying to use a node or value that is `null` — usually an `@onready`/`$Path` reference that did not resolve, or a `get_node()` that found nothing — raises an error like "Invalid call. Nonexistent function ... on a null instance." Read the line number in the Output, look at what is on that line, and check what could be `null`. The error is information, not noise — read it.',
    task:
'Run a deliberate **debugging drill** on a small bug (write the buggy snippet yourself, or use the one in [[e2-04]]/[[e2-05]]). 1) Write down your **hypothesis** in one sentence before touching anything ("I expect `speed` to be 5 but the player isn’t moving, so I think `delta` is 0"). 2) Add a single targeted `print()` to test exactly that hypothesis — not ten scattered prints. 3) If a value is geometric (a direction, a raycast), draw it (a `RayCast2D` node or a `_draw()` line) and watch it in the viewport. 4) Re-create a null-instance error on purpose (call a method on an unassigned reference / a wrong `$Path`), read the Output line, and fix it. Note in one line *which* tool found the bug fastest — that judgement is the skill.',
    steps: [
      'Confirm a line runs and a value is right:',
      '```gdscript\nprint("speed=", speed, " delta=", delta, " pos=", position)\n# push_warning() / push_error() for severity; do NOT print this every frame forever\n```',
      'Visualise invisible logic in the viewport (custom 2D drawing):',
      '```gdscript\nfunc _draw() -> void:\n\tdraw_line(Vector2.ZERO, Vector2.RIGHT * 64, Color.GREEN, 2.0) # see the direction\n# (or add a RayCast2D/RayCast3D node and read is_colliding())\n```',
      'Use the real debugger: click the gutter beside a line to set a breakpoint (or write `breakpoint`), then run the project.',
      'When it halts: inspect the Variables / Stack Frames, read the call stack, step with [[F10]] (over) and [[F11]] (into).',
      'Read a null-instance error: the Output line "...:42" points at the exact line — open it, find what is `null` (often an `@onready`/`$Path` that did not resolve), fix the path or assign it, re-run.',
      'Ask "why slow?" with the **Debugger → Profiler / Monitors** — read the most expensive frame and the draw-call/object counts, not a guess.'
    ],
    success: [
      'You debug as hypothesis → observe → change-one-thing, not by random edits.',
      'You pick the right instrument: a targeted `print()` or a drawn ray for a quick check, the breakpoint debugger for anything non-trivial.',
      'You can read a null-instance error (or stack trace) and trace it to the line and the null reference.'
    ],
    skills: ['Hypothesis-driven debugging', 'print() / debug drawing', 'Breakpoint debugging', 'Reading errors'],
    simplified: 'Panel names, the `F10`/`F11` step shortcuts and the C# external-debugger flow are version- and tool-dependent — treat them as common defaults and check your setup. Deep Profiler/Monitors use (custom monitors, memory, GPU timing) is its own subject; here we only learn to read the frame and find a hotspot.',
    goDeeper: 'Godot’s manual on "Debugging" (the Output panel, the script debugger, the remote scene tree) and "The Profiler" is the reference; the general mindset is covered well in David Agans’ *Debugging* and in any treatment of rubber-duck debugging.',
    quiz: [
      { q: 'A value looks wrong. When is a `print()` enough, and when should you reach for the breakpoint debugger?', a: 'A single targeted `print()` is enough to confirm one specific thing — did this line run, is this variable what I expect. Once the bug spans several variables or you do not even know where it goes wrong, use a breakpoint: it freezes execution so you can inspect all variables, read the call stack, and step line-by-line instead of guessing where to print.' },
      { q: 'What does a "null instance" error tell you, and what is the usual cause in Godot?', a: 'It means you used a reference that was `null` — you tried to call a method or read a property on nothing. The Output gives the exact line; the usual causes are an `@onready var x = $Path` whose path is wrong (the node was not found) or a `get_node()` that returned nothing. Read the line, find which thing is null, and fix the path or assign it.' }
    ],
    tags: ['godot', 'debugging', 'print', 'breakpoints', 'profiler', 'null instance'] },
  {
    id: 'e2-08', title: 'Unit-testing a mechanic', pillarId: 'E', phaseId: 'e2', moduleId: 'e2b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 34, diagram: 'playground',
    concept:
'*Engine-specific (Godot 4.x — GDScript or C#). For GDScript the community standard is **GUT** (Godot Unit Test); for C# you use a normal **C# test runner** (NUnit/xUnit). The transferable idea is universal: a **unit test** is a small piece of code that calls your logic with a known input and **asserts** the output is what you expect — automatically, every time. (Same idea elsewhere: Unreal’s Automation system.)*\n\n' +
'Why bother on a student game? Because tests catch the bug *you already fixed once* from coming back. The moment a mechanic has a rule that’s easy to get subtly wrong — "damage never takes health below 0", "score caps at the combo limit", "you can’t double-jump twice" — a test pins that rule down so a later refactor can’t quietly break it. It also forces a design that’s the seam to clean code: **logic you can test is logic you’ve separated from the engine.**\n\n' +
'That separation is the whole technique. A node script that mixes input, physics and rules is painful to test. Pull the *rule* into a plain class with no node/scene dependencies — a `Health` class (a `RefCounted` in GDScript, or a plain C# class) with a `take_damage(amount)` method, a `Combo` with `add()` — and you can test it in milliseconds with no scene running. This is the same push toward small, pure functions you met in [[e1-09]] (component thinking) and is exactly what makes the capstone’s one mechanic ([[f1-04]]) provably correct.\n\n' +
'The shape every test shares is **Arrange → Act → Assert**: set up the object and inputs, call the method, assert the result. Good tests check the **boundaries** — zero, the max, one past the max, negative — because that’s where bugs live. In **GUT**, a test is a method named `test_*` on a script that `extends GutTest`, and you assert with `assert_eq`, `assert_true`, etc. Most rule tests need no running scene; when a thing genuinely needs the loop you can instance a scene and `await` a frame.\n\n' +
'You are not aiming for 100% coverage on a 14-week project — that’s over-scoping ([[01-05]]). Aim for tests on the **two or three rules that would be embarrassing to break**, written the moment they’re tricky. A handful of sharp tests on your core mechanic is the high-value version.',
    task:
'Test-drive one real rule from your game. 1) Pick a mechanic with a crisp rule and pull it into a **plain, node-free class** (a `RefCounted` in GDScript, or a plain C# class) — e.g. `Health.take_damage(amount)` that clamps at 0, or a combo counter that caps. 2) In the **Code playground** above, port that pure logic to JS and write three asserts in **Arrange/Act/Assert** shape: a normal case, a **boundary** (exactly 0 / exactly the cap), and an **edge** (overkill damage, or one past the cap). Confirm they pass, then deliberately break the clamp and watch a test fail — that red is the point. 3) Write the equivalent GUT test as a short snippet (below) so you know the real shape. 4) In one line, justify *why these two or three rules* and not "test everything" — tie it to scope.',
    steps: [
      'Separate the rule from the engine — a pure, testable class (no node, no scene):',
      '```gdscript\n# health.gd\nextends RefCounted\nclass_name Health\n\nvar max_hp: int\nvar current: int\n\nfunc _init(max_value: int) -> void:\n\tmax_hp = max_value\n\tcurrent = max_value\n\nfunc take_damage(amount: int) -> void:\n\tcurrent = max(0, current - amount)   # rule: never below 0\n\nfunc is_dead() -> bool:\n\treturn current == 0\n```',
      'Write a GUT test (install the GUT addon, put tests under res://test/, run from the GUT panel or CLI):',
      '```gdscript\nextends GutTest\n\nfunc test_damage_stops_at_zero_not_negative() -> void:\n\tvar h := Health.new(10)        # Arrange\n\th.take_damage(15)              # Act (overkill)\n\tassert_eq(h.current, 0)        # Assert: clamped, not -5\n\tassert_true(h.is_dead())\n```',
      'Test the boundaries on purpose: 0, exactly max, one past max, a negative input — that is where bugs hide.',
      'Run the suite from the GUT panel (or the command line in CI); a green row is a kept promise, a red row is the bug found before your teammates did.',
      'Only when the rule truly needs the running loop, instance the scene in the test and `await get_tree().process_frame` to advance a frame. (Using C#? Write the same logic class and assert it with NUnit/xUnit instead.)'
    ],
    success: [
      'You can pull a rule out of a node script into a plain, testable class (a `RefCounted` or plain C# class).',
      'You can write a test in Arrange/Act/Assert shape and choose boundary/edge inputs, not just the happy path.',
      'You can say when a pure logic test (instant, no scene) is enough vs when you genuinely need a running scene, and why a few sharp tests beat chasing full coverage.'
    ],
    skills: ['Unit testing (GUT / C# runner)', 'Arrange-Act-Assert', 'Separating logic from the engine', 'Boundary testing'],
    simplified: 'GUT is a community addon (install it from the Asset Library) and its API/panel can change between versions — treat the snippet as the common shape, not a guarantee. The playground runs JS, so it illustrates the *shape* of a test and the red/green loop; it is not GUT. Mocking, fakes and CI integration are real and deeper than this headstart.',
    goDeeper: 'The GUT (Godot Unit Test) documentation for GDScript (assertions, doubling, the runner), and the NUnit/xUnit docs if you test the C# side; on testable design generally, Michael Feathers’ *Working Effectively with Legacy Code* and Kent Beck on test-first thinking.',
    quiz: [
      { q: 'Why is the first practical step of "writing a test" usually a *refactor* of your gameplay code?', a: 'Because logic tangled inside a node script (with input, physics and rendering) is hard to test in isolation. You first pull the rule into a plain class with no node/scene dependencies (a `RefCounted` or a plain C# class); then you can test it instantly with no scene running. Testability and clean separation are the same goal — writing the test pushes you toward better-structured code.' },
      { q: 'You have two weeks left. Should you aim for full test coverage of your game? What should you test?', a: 'No — chasing full coverage on a short student project is over-scoping. Write a handful of sharp tests on the two or three rules that would be embarrassing or hard to debug if they broke (damage clamping, score caps, a no-double-jump rule), and test their boundaries. A few high-value tests on the core mechanic is the realistic, worthwhile version.' }
    ],
    tags: ['godot', 'unit testing', 'gut', 'arrange-act-assert', 'refcounted', 'testable design'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
