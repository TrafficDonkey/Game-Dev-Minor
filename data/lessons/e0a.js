/* Pillar E · Phase e0 · Module e0a — Code basics (Layer 1, engine-neutral) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e0-01', title: 'How to think like a programmer', pillarId: 'E', phaseId: 'e0', moduleId: 'e0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 22, diagram: 'playground',
    concept:
'*This is a **Layer-1, engine-neutral** lesson. We teach in JavaScript because your browser runs it, but the *way of thinking* is the same in C#, GDScript or C++ — it transfers to whatever engine the minor hands you.*\n\n' +
'Programming is not about memorising syntax. It is a way of **thinking**: taking a fuzzy goal ("the enemy should chase the player") and grinding it down into steps so precise and literal that a machine with zero common sense can follow them. The computer does *exactly* what you wrote — not what you meant. That gap, between intent and instruction, is where every bug lives, and learning to close it is the real skill.\n\n' +
'Three habits make up the mindset:\n\n' +
'- **Decomposition** — break a big problem into small, nameable pieces. "Make an enemy" becomes: detect the player, decide to chase, move toward them, stop when close. Each piece is something you can build and test alone. This same instinct is what keeps a whole *game* feasible ([[04-01]]) — small pieces, assembled.\n' +
'- **Precision** — be exact and literal. "Move toward the player" must become "each frame, step a little along the line from me to the player." Computers have no judgement; ambiguity becomes a bug.\n' +
'- **Modelling state** — at any instant the program holds a snapshot of *what is true now*: the player’s position, their health, whether a door is open. Code reads and changes that state. Most of programming is deciding what to track and how it changes over time.\n\n' +
'You will also adopt the **read–run–debug loop** as a daily rhythm: write a small piece, run it, see what *actually* happened, compare to what you expected, fix the difference, repeat. Beginners hunt for the "right" code in their heads; pros run tiny experiments constantly. The error messages are not failure — they are the computer telling you precisely where intent and instruction parted ways.\n\n' +
'Crucially, a programmer is **lazy in the good way**: never solve by hand what you can describe once and let the machine repeat a million times. Hold onto these — decompose, be precise, model state, run experiments — and the syntax in the next lessons is just vocabulary for ideas you already have.',
    task:
'Pick one tiny game behaviour — "a coin spins and disappears when the player touches it." On paper (no code), **decompose** it into 4–6 literal steps a dumb machine could follow, in order. Mark which steps happen *every frame* (the coin spinning, the touch check — this is the game loop you will meet in [[e1-01]]) and which happen *once* (it disappearing). Then open the **Code playground** above, run the sample, change one number, and re-run — practising the read–run–debug loop on something that already works.',
    success: [
      'You can take a fuzzy behaviour and break it into small, literal, ordered steps.',
      'You can explain why "the computer does exactly what you wrote, not what you meant".',
      'You can describe the read–run–debug loop and why running tiny experiments beats guessing.'
    ],
    skills: ['Decomposition', 'Precise/literal thinking', 'The debug loop'],
    simplified: 'This is the mindset, deliberately language-free. The concrete tools — variables, conditionals, loops, functions — arrive in the next three lessons; here we only want the way of thinking.',
    goDeeper: 'For the problem-solving mindset, the classic is *Think Like a Programmer* by V. Anton Spraul; for the broader craft and habits, *The Pragmatic Programmer* by Hunt & Thomas.',
    quiz: [
      { q: 'What does "decomposition" mean, and why does a game developer rely on it so heavily?', a: 'Breaking a big, vague problem into small, nameable pieces you can build and test one at a time. It is how you turn "make an enemy" into buildable steps — and the same instinct keeps an entire game scoped and feasible instead of an unbuildable blob.' },
      { q: 'Why is "the computer does exactly what you wrote, not what you meant" the root of most bugs?', a: 'A machine has no common sense or judgement; it follows your instructions literally. Any gap between what you intended and what you actually wrote becomes a bug, so precision is not a nicety — it is the job.' }
    ],
    tags: ['programming mindset', 'decomposition', 'debugging', 'problem solving', 'engine-neutral'] },
  {
    id: 'e0-02', title: 'Variables, types and expressions', pillarId: 'E', phaseId: 'e0', moduleId: 'e0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 24, diagram: 'playground',
    concept:
'*Layer-1, engine-neutral. The names below are JavaScript, but every engine language has the same furniture — a labelled box that holds a value of some type, combined with operators into expressions.*\n\n' +
'A **variable** is a named box that holds a value. You name it so you can read it and change it later. Naming is real design work: `playerHealth` tells the next reader (often future-you) what the number *means*; `h` does not.\n\n' +
'```js\nlet playerHealth = 100;   // a box named playerHealth, holding 100\nplayerHealth = playerHealth - 25;  // took 25 damage; now 75\n```\n\n' +
'Every value has a **type** — what kind of thing it is, which decides what you can do with it. The handful you will use constantly in games:\n\n' +
'- **number** — health, speed, position, a timer. (Many engine languages split this into `int` whole numbers and `float` decimals; JS has just one number type, which is a small simplification.)\n' +
'- **boolean** — `true`/`false`. The backbone of game logic: `isGrounded`, `isDead`, `doorOpen`.\n' +
'- **string** — text: a character’s name, a line of dialogue ([[a3-01]]).\n\n' +
'An **expression** is anything that computes to a value: `playerHealth - 25`, `speed * dt`, `health <= 0`. Operators combine values — arithmetic (`+ - * /`), comparison (`> < == >=`), and logical (`&&` and, `||` or, `!` not). A few traps worth meeting now: `=` *assigns* a value while `==` *compares* (mixing them up is a rite of passage); and `/` may behave differently for whole-number types in some languages, so dividing two integers can truncate.\n\n' +
'One more idea that sounds pedantic but saves real grief: **mutable vs constant**. A value that should never change — gravity, a max speed — is worth marking constant (`const` in JS) so the language stops you reassigning it by accident. Things that change over time stay variables.\n\n' +
'This is the vocabulary of *state* from [[e0-01]]: a running game is a pile of variables (positions, healths, flags), and gameplay is expressions reading and updating them every frame. Master this and the rest of programming is just deciding *which* boxes to keep and *how* the expressions change them.',
    task:
'In the **Code playground**, model a tiny combat exchange with variables. Declare `playerHealth = 100`, `damage = 30`, and a boolean `isAlive`. Write an expression that subtracts `damage` from `playerHealth`, then set `isAlive` to the *result of a comparison* (`playerHealth > 0`). Print both. Now change `damage` to `120`, re-run, and confirm `isAlive` flips to `false`. Finally, list five variables a 2D platformer player would need and give each a clear name and a type (number / boolean / string).',
    success: [
      'You can declare a variable, give it a meaningful name, and reassign it.',
      'You can pick the right type (number / boolean / string) for a piece of game state.',
      'You can write an expression that computes a value, and explain the `=` vs `==` difference.'
    ],
    skills: ['Variables & naming', 'Core types', 'Expressions & operators'],
    simplified: 'JS has one number type; most engine languages (C#, C++) split whole-number `int` from decimal `float`, and integer division can truncate. The concepts — box, type, expression — are identical; only the type names and a few edge cases differ.',
    goDeeper: 'Once you pick an engine, skim its language’s data-types page (C# "built-in types", GDScript "basics") to see how `int`/`float` and `const` are spelled there — the ideas map one-to-one.',
    quiz: [
      { q: 'Why does the *type* of a value matter, not just the value itself?', a: 'The type decides what operations are valid and how they behave — you can subtract numbers but not really subtract strings, and a boolean only ever holds true/false. Choosing the right type for each piece of game state keeps your logic correct and your code readable.' },
      { q: 'What is the difference between `=` and `==`?', a: '`=` is assignment — it puts a value into a variable. `==` is comparison — it asks whether two values are equal and produces a boolean. Accidentally writing `=` where you meant `==` (or vice versa) is one of the most common beginner bugs.' }
    ],
    tags: ['variables', 'types', 'expressions', 'operators', 'engine-neutral'] },
  {
    id: 'e0-03', title: 'Control flow: conditionals and loops', pillarId: 'E', phaseId: 'e0', moduleId: 'e0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 26, diagram: 'playground',
    concept:
'*Layer-1, engine-neutral. The shapes below — `if`, `while`, `for` — exist with near-identical syntax in C#, GDScript and C++.*\n\n' +
'So far code has run straight down, top to bottom. **Control flow** lets it *choose* and *repeat* — and that is where logic comes alive.\n\n' +
'**Conditionals** make decisions. An `if` runs a block only when an expression (a boolean from [[e0-02]]) is true; `else if` and `else` cover the other cases:\n\n' +
'```js\nif (playerHealth <= 0) {\n  state = "dead";\n} else if (playerHealth < 30) {\n  state = "lowHealth";   // play the heartbeat sound\n} else {\n  state = "ok";\n}\n```\n\n' +
'Order matters: the first true branch wins, so put the most specific test first. This is the literal-thinking from [[e0-01]] made concrete — you are spelling out every case a dumb machine must handle.\n\n' +
'**Loops** repeat work. A `while` loop runs as long as its condition holds; a `for` loop is the same idea packaged for a known count:\n\n' +
'```js\n// spawn a wave of 5 enemies\nfor (let i = 0; i < 5; i++) {\n  spawnEnemy();\n}\n```\n\n' +
'This is a programmer being *lazy in the good way*: describe the work once, let the machine repeat it. Loops are how you process every enemy in a list, every tile in a grid, every item in an inventory.\n\n' +
'Two cautions. First, the **infinite loop**: if a `while` condition never becomes false, the program hangs forever — a frozen game. Always make sure something inside changes toward the exit. Second — and this is the big seam — the **game loop** itself ([[e1-01]]) is just one giant `while (running)` that the engine runs for you, calling your code every frame. So the `if` you write for "is the player on the ground?" runs *60 times a second* inside that loop. Control flow is not abstract: it is the moment-to-moment behaviour the player feels, from a jump that only fires when grounded to an enemy that only attacks in range.',
    task:
'In the **Code playground**, write a small `for` loop that spawns 5 enemies (just `print("enemy " + i)`). Then add an `if/else if/else` that, given a `playerHealth` number, prints `"dead"`, `"low"` or `"ok"` — and test it with the values `0`, `20` and `90` to confirm each branch fires. On paper, write the boolean condition for "the player may jump" (hint: only when `isGrounded` is true) as an `if`, and explain in one line why a `while` loop with no changing variable inside is dangerous.',
    success: [
      'You can write an `if / else if / else` that routes to the correct branch, with the most specific test first.',
      'You can write a `for` or `while` loop to repeat work a set or conditional number of times.',
      'You can explain what an infinite loop is and how to avoid one, and connect control flow to the per-frame game loop.'
    ],
    skills: ['Conditionals (if/else)', 'Loops (for/while)', 'Avoiding infinite loops'],
    simplified: 'Branch and loop *syntax* is nearly identical across C-family languages and GDScript; only braces vs indentation and the keyword spellings differ. The control-flow concepts are universal.',
    goDeeper: 'Any engine language’s "control flow" doc (C# `if`/`for`, GDScript `match`/`for`) shows extras like `switch`/`match` and `break`/`continue` — useful refinements on the same ideas.',
    quiz: [
      { q: 'In an `if / else if / else` chain, why does branch order matter?', a: 'The first branch whose condition is true runs, and the rest are skipped. If a broad condition sits before a more specific one, the specific case never gets a chance — so you put the most specific tests first.' },
      { q: 'What is an infinite loop, and how do you prevent one?', a: 'A loop whose exit condition never becomes false, so it runs forever and freezes the program. You prevent it by making sure something inside the loop changes the value the condition checks, moving it toward the exit.' }
    ],
    tags: ['control flow', 'conditionals', 'loops', 'if else', 'engine-neutral'] },
  {
    id: 'e0-04', title: 'Functions and decomposition', pillarId: 'E', phaseId: 'e0', moduleId: 'e0a',
    difficulty: 'Beginner', mode: 'knowledge', estMinutes: 26, diagram: 'playground',
    concept:
'*Layer-1, engine-neutral. Functions exist everywhere — `void Jump()` in C#, `func jump()` in GDScript — and the engine itself calls *your* functions every frame ([[e1-01]]).*\n\n' +
'A **function** is a named, reusable chunk of code. You define the steps once; then you **call** it by name whenever you need them. This is [[e0-01]]’s decomposition made real — the single most important tool for keeping code (and a game) buildable.\n\n' +
'```js\n// definition: takes inputs (parameters), gives back a value (return)\nfunction takeDamage(health, amount) {\n  let result = health - amount;\n  if (result < 0) result = 0;   // never below zero\n  return result;\n}\n\n// calls: reuse the same logic with different inputs\nplayerHealth = takeDamage(playerHealth, 30);\nbossHealth   = takeDamage(bossHealth, 10);\n```\n\n' +
'Three ideas to lock in:\n\n' +
'- **Parameters** are the inputs you hand in (`health`, `amount`); **arguments** are the actual values at the call. They let one function serve many situations.\n' +
'- **Return** hands a value back to the caller. A function can return a result, or just *do* something (move a sprite) and return nothing.\n' +
'- **Scope**: variables declared inside a function are local — they exist only during the call and do not leak out. This containment is *why* functions tame complexity.\n\n' +
'Functions give you three wins at once. **Reuse** — write `takeDamage` once, call it for player, boss and breakable crate. **Naming** — a call like `if (isGrounded()) jump()` reads like the design, not like machinery. **The DRY rule** (*Don’t Repeat Yourself*): when the same logic appears twice, fold it into a function; then a fix or balance tweak happens in *one* place, not five — the same discipline that makes designer-facing tuning possible later ([[b3-03]]).\n\n' +
'A good function does **one thing** and is named for it. If you cannot name it cleanly, it is probably doing too much — split it. This habit is exactly how you turn a designer’s feature into code without drowning: `spawnWave`, `applyGravity`, `openDoor` — small, named, testable verbs. Programs are just functions calling functions, all the way down to the game loop calling yours.',
    task:
'In the **Code playground**, write and test a `takeDamage(health, amount)` function that returns the new health and never goes below `0`. Call it three times with different inputs and print each result. Then refactor: take the coin-pickup steps you decomposed back in [[e0-01]] and turn at least two of them into named functions (e.g. `spinCoin()`, `collectCoin()`). Finally, write one sentence naming a function that is doing *too much*, and how you would split it into two.',
    success: [
      'You can define a function with parameters and a return value, and call it with different arguments.',
      'You can explain reuse, naming and the DRY rule, and why local scope tames complexity.',
      'You can take a decomposed behaviour and express its pieces as small, single-purpose, well-named functions.'
    ],
    skills: ['Defining & calling functions', 'Parameters & return values', 'DRY / single responsibility'],
    simplified: 'JS functions ignore parameter types; typed engine languages (C#, C++) require you to declare each parameter’s and the return’s type (e.g. `int TakeDamage(int health, int amount)`). The concept — named, reusable, parameterised, returning — is identical.',
    goDeeper: 'The "one function, one job" and DRY ideas are argued at length in Robert C. Martin’s *Clean Code* (the Functions chapter); pair it with your engine’s style guide for naming conventions.',
    quiz: [
      { q: 'What do parameters and a return value let a function do?', a: 'Parameters let the same function work on different inputs (player vs boss health), and the return value hands a result back to the caller. Together they make one piece of logic reusable in many situations instead of being copy-pasted and edited each time.' },
      { q: 'What is the DRY rule and why does it matter for a game team?', a: '"Don’t Repeat Yourself" — when the same logic appears more than once, put it in a single function and call it. Then a bug fix or a balance tweak happens in one place, so the change is reliable and you do not forget one of the copies.' }
    ],
    tags: ['functions', 'parameters', 'return values', 'dry', 'engine-neutral'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
