/* Pillar E · Phase e2 · Module e2b — Systems & quality (Layer 2, Unity/C#, swappable) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e2-06', title: 'UI and game state / scene management', pillarId: 'E', phaseId: 'e2', moduleId: 'e2b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 32,
    concept:
'*Engine-specific (Unity/C#) — the same ideas are **Widgets + GameInstance/level streaming** in Unreal and **Control nodes + `SceneTree.change_scene_to_*`** in Godot. The transferable concept underneath is: a game is a set of **scenes** plus a small amount of **state** that must survive moving between them.*\n\n' +
'Three things sit together here and beginners tangle them, so we will keep them apart.\n\n' +
'**Scenes** are Unity’s unit of "a loaded chunk of game" — a main menu, a level, a game-over screen. You load one with `SceneManager.LoadScene("Level1")`. By default that **destroys** the current scene and everything in it, which is exactly why naive state vanishes between levels.\n\n' +
'**UI** in Unity lives on a `Canvas`. You build it from `Text` (TMP), `Image` and `Button` components, then **drive it from script**: a button’s `onClick` calls a method; a script updates a health bar by setting an `Image`’s `fillAmount`. The durable habit (the seam to game feel, [[b0-04]]): UI should *read* game state, not *own* it. The score lives in a game-state object; the UI label just displays it.\n\n' +
'**Game state** is the data that defines "where the player is in the game": current score, lives, level, paused-or-not. The classic structure is a tiny **state machine** for the whole game — `MainMenu → Playing → Paused → GameOver` — the same FSM idea from [[e1-07]], now governing the *application*, not an enemy. Pausing is usually `Time.timeScale = 0` (freezes time-based motion; remember anything not using `Time.deltaTime` keeps running).\n\n' +
'The piece that ties it together: **persisting state across scene loads.** A score object created in `Level1` is destroyed when you load `Level2`. Two common fixes: mark an object `DontDestroyOnLoad(gameObject)` so a single **manager** survives every load, or keep run data in a plain static/`ScriptableObject` holder that scenes read on start. Pick one owner for run state and route everything through it — scattered state is the bug factory here. We push this further into real save files in [[e3-03]].',
    task:
'Block out the **state and scene flow** for a tiny 2-level game on paper, then wire the script skeleton (no full project needed). 1) Draw the game-state FSM: `MainMenu → Playing → Paused → GameOver`, with the events that cause each transition. 2) Decide the **owner** of run state (score, lives, current level) and how it survives a scene load — name the exact mechanism (`DontDestroyOnLoad` manager *or* a `ScriptableObject` holder). 3) Write the C# skeleton below in by hand and fill the three TODOs: load the next level, update the score label, and toggle pause. Keep it honest — a label that *reads* `GameState.score`, never a label that *stores* the score.',
    steps: [
      'Create the UI: [[GameObject]] → UI → Canvas, then add a Button and a TMP Text under it. (Click-path is a common default; check your Unity version.)',
      'Make ONE owner for run state that survives loads:',
      '```csharp\npublic class GameState : MonoBehaviour {\n  public static GameState I;       // simple single access point\n  public int score, lives = 3, level = 1;\n  void Awake() {\n    if (I != null) { Destroy(gameObject); return; } // keep only the first\n    I = this; DontDestroyOnLoad(gameObject);\n  }\n}\n```',
      'Drive scene flow + UI from a manager:',
      '```csharp\nusing UnityEngine;\nusing UnityEngine.SceneManagement;\nusing TMPro;\n\npublic class GameFlow : MonoBehaviour {\n  public TMP_Text scoreLabel;\n  bool paused;\n\n  void Update() { scoreLabel.text = "Score: " + GameState.I.score; } // UI READS state\n\n  public void NextLevel() {\n    GameState.I.level++;\n    SceneManager.LoadScene("Level" + GameState.I.level); // TODO: confirm scene name\n  }\n  public void TogglePause() {\n    paused = !paused;\n    Time.timeScale = paused ? 0f : 1f; // freezes dt-based motion\n  }\n}\n```',
      'Wire the Button’s onClick (in the Inspector) to `GameFlow.NextLevel` or `TogglePause`.',
      'Add the scenes to [[File]] → Build Settings so `LoadScene` can find them by name.'
    ],
    success: [
      'You can name the three separate concerns — scenes, UI, and game state — and keep UI as a *reader* of state.',
      'You can model the whole-game flow as an FSM (MainMenu/Playing/Paused/GameOver) with clear transitions.',
      'You can explain why state dies on a scene load and choose one mechanism (`DontDestroyOnLoad` manager or a data holder) to persist it.'
    ],
    skills: ['Scene management', 'UI driven by state', 'Whole-game state machine', 'Persisting state across loads'],
    simplified: 'Click-paths, the `static` singleton shortcut and `LoadScene` overloads are version-dependent and remappable — treat them as common defaults, not guarantees. A `static` instance is the simplest owner to teach; production projects often prefer a `ScriptableObject` or a proper service so it is testable ([[e2-08]]) and survives domain reloads.',
    goDeeper: 'Unity’s manual sections on the Scene Manager, the UI Toolkit / uGUI Canvas, and `ScriptableObject` are the right references; for the application-level state machine, revisit [[e1-07]] and apply it one level up.',
    quiz: [
      { q: 'You set the player’s score in `Level1`, load `Level2`, and the score is gone. Why — and what fixes it?', a: 'Loading a scene destroys the previous scene and its objects by default, so the object holding the score is gone. Fix it by giving run state a single owner that survives loads — e.g. a manager marked `DontDestroyOnLoad`, or a `ScriptableObject`/static holder that each scene reads on start.' },
      { q: 'Why should a UI health bar *read* game state rather than store the health itself?', a: 'Because the UI is a view, not the source of truth. If health lives in one game-state object and the bar just displays it (e.g. via `fillAmount`), every system agrees on one value, the UI can be rebuilt or swapped freely, and you avoid two copies of "health" drifting out of sync.' }
    ],
    tags: ['unity', 'ui', 'scene management', 'game state', 'singleton', 'pause'] },
  {
    id: 'e2-07', title: "Debugging and the engine's tools", pillarId: 'E', phaseId: 'e2', moduleId: 'e2b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 30,
    concept:
'*Engine-specific (Unity/C#) — Unreal has the **Output Log + `UE_LOG`**, the **Blueprint debugger** and **Insights**; Godot has the **Debugger panel** and `print()`. The transferable skill is the same everywhere: form a hypothesis, observe reality, and close the gap — the engine just gives you the instruments.*\n\n' +
'Debugging is not flailing; it is **the scientific method on a deadline**. State what you expect, observe what actually happens, and change one thing at a time until expectation and reality agree. New programmers lose hours by guessing and editing randomly; you will be faster by *looking first*.\n\n' +
'Unity gives you a tiered toolkit. The cheapest tool is **`Debug.Log`** — print a value to the **Console** to confirm a line ran and a variable holds what you think. Use `Debug.LogWarning`/`Debug.LogError` for severity, and remember that excessive logging every frame tanks performance and buries the message that matters. A step up is **`Debug.DrawRay`/`DrawLine`** to *see* invisible logic in the Scene view — a raycast, a target direction, a navmesh sample — which often reveals the bug instantly.\n\n' +
'The power tool is the **breakpoint debugger**: attach your IDE (Visual Studio / Rider) to the Unity Editor, set a breakpoint, and execution **freezes** so you can inspect every variable, the call stack, and step line-by-line (`F10` over, `F11` into). This beats scattering logs once a bug is non-trivial.\n\n' +
'Two Unity-specific instruments round it out. The **Inspector at runtime** shows live values changing as you play — watch a velocity or a state enum tick over without a single log. The **Profiler** ([[Ctrl+7]] is a common default) answers "*why is it slow?*" by showing per-frame CPU/GPU/memory cost, so you optimise the real hotspot instead of guessing. The deep version is a topic of its own; for now, learn to read the frame graph.\n\n' +
'A read on the most common Unity error: a `NullReferenceException` means you used something that is `null` — usually an Inspector reference you forgot to assign, or a `GetComponent` that found nothing. Read the line number in the Console, look at what is on that line, and check what could be null. The error is information, not noise — read it.',
    task:
'Run a deliberate **debugging drill** on a small bug (write the buggy snippet yourself, or use the one in [[e2-04]]/[[e2-05]]). 1) Write down your **hypothesis** in one sentence before touching anything ("I expect `speed` to be 5 but the player isn’t moving, so I think `dt` is 0"). 2) Add a single targeted `Debug.Log` to test exactly that hypothesis — not ten scattered logs. 3) If a value is geometric (a direction, a raycast), add a `Debug.DrawRay` and watch it in the Scene view. 4) Re-create a `NullReferenceException` on purpose (call a method on an unassigned reference), read the Console line, and fix it by assigning the reference. Note in one line *which* tool found the bug fastest — that judgement is the skill.',
    steps: [
      'Confirm a line runs and a value is right:',
      '```csharp\nDebug.Log($"speed={speed} dt={Time.deltaTime} pos={transform.position}");\n// LogWarning / LogError for severity; do NOT log this every frame forever\n```',
      'Visualise invisible logic in the Scene view:',
      '```csharp\nDebug.DrawRay(transform.position, transform.forward * 2f, Color.green); // see the ray you cast\n```',
      'Use the real debugger: open your IDE, attach to Unity (Debug → Attach to Unity / Rider’s play button), set a breakpoint by clicking the gutter, press Play.',
      'When it halts: inspect locals, read the Call Stack, step with [[F10]] (over) and [[F11]] (into).',
      'Read a `NullReferenceException`: the Console line "...:42" points at the exact line — open it, find what is `null` (often an unassigned Inspector field), assign it, re-run.',
      'Ask "why slow?" with the Profiler ([[Ctrl+7]], a common default) — read the most expensive frame, not a guess.'
    ],
    success: [
      'You debug as hypothesis → observe → change-one-thing, not by random edits.',
      'You pick the right instrument: a targeted `Debug.Log` or `DrawRay` for a quick check, the breakpoint debugger for anything non-trivial.',
      'You can read a `NullReferenceException` (or stack trace) and trace it to the line and the null reference.'
    ],
    skills: ['Hypothesis-driven debugging', 'Debug.Log / DrawRay', 'Breakpoint debugging', 'Reading exceptions'],
    simplified: 'Menu paths, the `Ctrl+7` Profiler shortcut and the IDE attach flow are version- and tool-dependent (Visual Studio vs Rider) — treat them as common defaults and check your setup. Deep Profiler use (markers, memory, GPU) is its own subject; here we only learn to read the frame and find a hotspot.',
    goDeeper: 'Unity’s manual on the Console, the Profiler and "Debugging C# code in Unity" (attaching the IDE) is the reference; the general mindset is covered well in David Agans’ *Debugging* and in any treatment of rubber-duck debugging.',
    quiz: [
      { q: 'A value looks wrong. When is a `Debug.Log` enough, and when should you reach for the breakpoint debugger?', a: 'A single targeted `Debug.Log` is enough to confirm one specific thing — did this line run, is this variable what I expect. Once the bug spans several variables or you do not even know where it goes wrong, attach the debugger: a breakpoint freezes execution so you can inspect all locals, read the call stack, and step line-by-line instead of guessing where to log.' },
      { q: 'What does a `NullReferenceException` tell you, and what is the usual cause in Unity?', a: 'It means you used a reference that was `null` — you tried to call a method or read a field on nothing. The Console gives the exact line; the usual causes are an Inspector field you forgot to assign or a `GetComponent` that found no matching component. Read the line, find which thing is null, and make sure it is assigned/exists.' }
    ],
    tags: ['unity', 'debugging', 'debug.log', 'breakpoints', 'profiler', 'null reference'] },
  {
    id: 'e2-08', title: 'Unit-testing a mechanic', pillarId: 'E', phaseId: 'e2', moduleId: 'e2b',
    difficulty: 'Intermediate', mode: 'handson', estMinutes: 34, diagram: 'playground',
    concept:
'*Engine-specific (Unity/C#) — Unity ships the **Test Framework** (NUnit) with **EditMode** and **PlayMode** tests; Unreal has the **Automation** system, Godot has **GUT**. The transferable idea is universal: a **unit test** is a small piece of code that calls your logic with a known input and **asserts** the output is what you expect — automatically, every time.*\n\n' +
'Why bother on a student game? Because tests catch the bug *you already fixed once* from coming back. The moment a mechanic has a rule that’s easy to get subtly wrong — "damage never takes health below 0", "score caps at the combo limit", "you can’t double-jump twice" — a test pins that rule down so a later refactor can’t quietly break it. It also forces a design that’s the seam to clean code: **logic you can test is logic you’ve separated from the engine.**\n\n' +
'That separation is the whole technique. A `MonoBehaviour` that mixes input, physics and rules is painful to test. Pull the *rule* into a plain C# class with no Unity dependencies — a `Health` class with a `TakeDamage(int)` method, a `Combo` class with `Add()` — and you can test it in milliseconds with no scene, no Play mode. This is the same push toward small, pure functions you met in [[e1-09]] (component thinking) and is exactly what makes the capstone’s one mechanic ([[f1-04]]) provably correct.\n\n' +
'The shape every test shares is **Arrange → Act → Assert**: set up the object and inputs, call the method, assert the result. Good tests check the **boundaries** — zero, the max, one past the max, negative — because that’s where bugs live. In Unity, **EditMode** tests run instantly against pure logic (use these for rules); **PlayMode** tests run in a running scene over frames (for things that genuinely need the loop), and return with `yield return null` to advance a frame.\n\n' +
'You are not aiming for 100% coverage on a 14-week project — that’s over-scoping ([[01-05]]). Aim for tests on the **two or three rules that would be embarrassing to break**, written the moment they’re tricky. A handful of sharp tests on your core mechanic is the high-value version.',
    task:
'Test-drive one real rule from your game. 1) Pick a mechanic with a crisp rule and pull it into a **plain C# class** (no `MonoBehaviour`) — e.g. `Health.TakeDamage(int)` that clamps at 0, or a combo counter that caps. 2) In the **Code playground** above, port that pure logic to JS and write three asserts in **Arrange/Act/Assert** shape: a normal case, a **boundary** (exactly 0 / exactly the cap), and an **edge** (overkill damage, or one past the cap). Confirm they pass, then deliberately break the clamp and watch a test fail — that red is the point. 3) Write the equivalent Unity EditMode test as a short snippet (below) so you know the real shape. 4) In one line, justify *why these two or three rules* and not "test everything" — tie it to scope.',
    steps: [
      'Separate the rule from the engine — a pure, testable class:',
      '```csharp\npublic class Health {\n  public int Max, Current;\n  public Health(int max) { Max = Current = max; }\n  public void TakeDamage(int amount) {\n    Current = Mathf.Max(0, Current - amount); // rule: never below 0\n  }\n  public bool IsDead => Current == 0;\n}\n```',
      'Write an EditMode test (Window → General → Test Runner → EditMode → Create Test):',
      '```csharp\nusing NUnit.Framework;\n\npublic class HealthTests {\n  [Test]\n  public void Damage_StopsAtZero_NotNegative() {\n    var h = new Health(10);   // Arrange\n    h.TakeDamage(15);         // Act  (overkill)\n    Assert.AreEqual(0, h.Current);  // Assert: clamped, not -5\n    Assert.IsTrue(h.IsDead);\n  }\n}\n```',
      'Test the boundaries on purpose: 0, exactly Max, one past Max, a negative input — that is where bugs hide.',
      'Run the suite in the Test Runner; a green row is a kept promise, a red row is the bug found before your teammates did.',
      'Use a PlayMode test ONLY when the rule truly needs the running loop — advance frames with `yield return null` inside an `[UnityTest]`.'
    ],
    success: [
      'You can pull a rule out of a `MonoBehaviour` into a plain, testable class.',
      'You can write a test in Arrange/Act/Assert shape and choose boundary/edge inputs, not just the happy path.',
      'You can say when to use EditMode (pure logic, instant) vs PlayMode (needs the running scene), and why a few sharp tests beat chasing full coverage.'
    ],
    skills: ['Unit testing (NUnit / Test Framework)', 'Arrange-Act-Assert', 'Separating logic from the engine', 'Boundary testing'],
    simplified: 'The Test Runner menu path and EditMode/PlayMode split are version-dependent (Unity Test Framework / UTF package) — treat the click-path as a common default. The playground runs JS, so it illustrates the *shape* of a test and the red/green loop; it is not the Unity test runner. Mocking, fakes and CI integration are real and deeper than this headstart.',
    goDeeper: 'Unity’s "Unity Test Framework" manual (EditMode vs PlayMode, `[Test]` and `[UnityTest]`) plus the NUnit assertion docs; on testable design generally, Michael Feathers’ *Working Effectively with Legacy Code* and Kent Beck on test-first thinking.',
    quiz: [
      { q: 'Why is the first practical step of "writing a test" usually a *refactor* of your gameplay code?', a: 'Because logic tangled inside a `MonoBehaviour` (with input, physics and rendering) is hard to test in isolation. You first pull the rule into a plain C# class with no Unity dependencies; then you can test it instantly in EditMode with no scene. Testability and clean separation are the same goal — writing the test pushes you toward better-structured code.' },
      { q: 'You have two weeks left. Should you aim for full test coverage of your game? What should you test?', a: 'No — chasing full coverage on a short student project is over-scoping. Write a handful of sharp tests on the two or three rules that would be embarrassing or hard to debug if they broke (damage clamping, score caps, a no-double-jump rule), and test their boundaries. A few high-value tests on the core mechanic is the realistic, worthwhile version.' }
    ],
    tags: ['unity', 'unit testing', 'nunit', 'arrange-act-assert', 'editmode', 'testable design'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
