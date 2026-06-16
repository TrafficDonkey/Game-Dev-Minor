/* Pillar E · Phase e4 · Module e4b — Navigation & generation (AI branch, Layer 1, engine-neutral) */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'e4-04', title: 'Pathfinding: grids, A* and navmeshes', pillarId: 'E', phaseId: 'e4', moduleId: 'e4b',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 32, diagram: 'playground',
    prereq: '[[e1-04]] (vectors) and [[e0-06]] (data structures) help; this is the densest lesson in the branch.',
    concept:
'*Layer-1, engine-neutral. The algorithm is the same everywhere; what changes is the name of the engine component that runs it for you.*\n\n' +
'Pathfinding answers one question: *given a start and a goal, what route gets there?* Almost every game reduces the world to a **graph** — nodes you can stand on, edges you can travel — and searches it. Two common ways to build that graph:\n\n' +
'- A **grid**: chop the world into square (or hex) cells; walkable cells are nodes, neighbours are edges. Simple, great for top-down and tile games.\n' +
'- A **navmesh** ((navmesh)): cover the walkable floor with connected polygons. Far fewer nodes than a fine grid, follows arbitrary geometry, and is what 3D engines use. You usually *bake* it from the level mesh.\n\n' +
'The classic search over either is **A*** ((a-star)). It is breadth-first search made smart: it always expands the node with the lowest `f = g + h`, where `g` is the real cost to reach that node from the start, and `h` is a **heuristic** — a cheap *estimate* of the remaining cost to the goal (for a grid, straight-line or Manhattan distance). The heuristic is what makes A* head *toward* the goal instead of flooding outward.\n\n' +
'```\nopen = {start}              // frontier, a priority queue on f\ncameFrom = {}              // to rebuild the path\ng[start] = 0\nwhile open not empty:\n  current = node in open with lowest f = g + h\n  if current == goal: return reconstruct(cameFrom, goal)\n  move current from open to closed\n  for each neighbour n of current:\n    tentative = g[current] + cost(current, n)\n    if tentative < g[n]:\n      cameFrom[n] = current\n      g[n] = tentative\n      add n to open\n```\n\n' +
'Two honest caveats. First, **A* is optimal only if the heuristic never *over*-estimates** the true remaining cost (it is *admissible*); straight-line distance is safe because nothing is shorter than a straight line. Second, the raw path hugs grid corners — games **smooth** it (string-pulling / funnel) and let local [[e4-05]] steering walk it naturally.\n\n' +
'In engines you rarely write A* yourself: Unity bakes a **NavMesh** and you call `NavMeshAgent.SetDestination`; Unreal has the **Navigation System** and `AIMoveTo`; Godot has `NavigationAgent`. Same idea — graph plus A* — wrapped in a component. Knowing what is underneath is what lets you debug "why won’t this agent go through the door?" (usually a hole in the bake).',
    task:
'Open the **Code playground** and run the grid A* demo: place a start, a goal and some walls, and watch which cells it expands. Then on paper, take a 5×5 grid with two wall cells, mark start and goal, and hand-trace the first **three** node expansions — writing `g`, `h` (use Manhattan distance) and `f` for each. Finally, in two sentences, explain why a navmesh needs far fewer nodes than a 1-metre grid covering the same room, and name the engine component you would actually call (`NavMeshAgent` / `AIMoveTo` / `NavigationAgent`).',
    success: [
      'You can describe how a world becomes a graph (grid cells or navmesh polys) that A* searches.',
      'You can explain `f = g + h` and why the heuristic must not over-estimate.',
      'You can name the engine component that bakes/runs navigation and a common failure (a hole in the bake).'
    ],
    skills: ['Graph search / A*', 'Grids vs navmeshes', 'Heuristics & admissibility', 'Engine navigation components'],
    simplified: 'Real navigation adds dynamic obstacle avoidance, off-mesh links (jumps/ladders), hierarchical pathfinding for big maps, path caching and crowd systems. A* on a graph is the correct core; engines layer the rest on top.',
    goDeeper: 'Amit Patel’s "Red Blob Games" interactive A* guide is the clearest visual explanation anywhere; pair it with your engine’s navmesh docs (Unity NavMesh, Unreal Navigation System, Godot Navigation).',
    quiz: [
      { q: 'In A*, what are `g` and `h`, and why does the heuristic have to be an *under*-estimate?', a: '`g` is the actual cost already paid to reach a node from the start; `h` is a cheap estimate of the cost still remaining to the goal. If `h` never over-estimates the true remaining cost (it is *admissible*), A* is guaranteed to find the shortest path. Over-estimating can make it commit to a worse route too early.' },
      { q: 'Why do 3D engines prefer a navmesh over a fine grid?', a: 'A navmesh covers the walkable floor with a handful of large polygons that follow the real geometry, so the search graph has far fewer nodes than a dense grid of the same area — it is faster to search, uses less memory, and produces paths that hug the actual floor rather than snapping to square cells.' },
      { q: 'An agent refuses to cross a doorway it clearly should fit through. What is the likely cause?', a: 'A gap or missing connection in the baked navmesh at that spot — the doorway did not generate walkable polygons (often a width/step-height/bake-setting issue), so to the pathfinder there is simply no edge to cross there. Re-baking with the right agent radius/height usually fixes it.' }
    ],
    tags: ['pathfinding', 'a-star', 'navmesh', 'grid', 'heuristic', 'engine-neutral'] },
  {
    id: 'e4-05', title: 'Steering and natural movement', pillarId: 'E', phaseId: 'e4', moduleId: 'e4b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'*Layer-1, engine-neutral. Steering is the local, per-frame layer that sits *on top* of the global path from [[e4-04]].*\n\n' +
'Pathfinding tells an agent *which way* to go; **steering** decides *how it actually moves* this frame so the motion looks alive instead of robotic. The idea (Craig Reynolds’ steering behaviours) is to treat movement as forces: each frame you compute a **steering force**, add it to **velocity**, and add velocity (scaled by [[e1-02]] `dt`) to **position**. Because forces accumulate, motion gets momentum and curves — no instant turns.\n\n' +
'```\nsteering = desiredVelocity - velocity   // pull toward what we want\nsteering = clamp(steering, maxForce)\nvelocity = clamp(velocity + steering * dt, maxSpeed)\nposition = position + velocity * dt\n```\n\n' +
'A few core behaviours, each just a rule for `desiredVelocity`:\n\n' +
'- **Seek**: aim straight at a target. **Flee**: the negative — aim away.\n' +
'- **Arrive**: like seek, but scale speed *down* inside a slowing radius so the agent eases to a stop instead of overshooting and jittering.\n' +
'- **Pursue / evade**: seek/flee a *predicted* future position, so a chaser leads its target.\n' +
'- **Wander**: a small, slowly-drifting random target ahead of the agent — gives idle creatures believable, non-twitchy roaming.\n' +
'- **Obstacle / separation**: a small push away from nearby obstacles and neighbours so a group does not pile into one point.\n\n' +
'The real power is **blending**: sum several behaviours (often weighted) into one force — *follow the path* + *avoid that rock* + *keep apart from teammates*. Weighted-sum is the simple approach; priority/arbitration (only obey lower-priority urges when higher ones are satisfied) avoids forces cancelling to mush. **Flocking** ((flocking)) is just three steering rules — separation, alignment, cohesion — summed across neighbours, and it produces convincing birds, fish and crowds from almost nothing.\n\n' +
'The seam to feel and design: steering is *most* of what makes an enemy read as menacing, skittish or dumb ([[b0-04]] game feel). The split to remember — **pathfinder = global route; steering = local, momentum-based movement along it and around dynamic stuff.** Engines bundle a basic version inside the nav agent (an `Arrive`-like stop and avoidance), but hand-rolled steering is how you get character.',
    task:
'Pick an enemy archetype (a charging brute, a circling sniper, a skittish critter) and write, in 4–6 lines of pseudocode, which steering behaviours you would blend for it and roughly what weights — e.g. brute = `seek(player) * 1.0 + separation * 0.3`. Then explain in one sentence why **Arrive** (not plain **Seek**) is the right choice when an agent needs to stop *on* a waypoint, and what visible bug plain Seek causes there.',
    success: [
      'You can state the steering loop: force → velocity → position, all frame-rate-independent with `dt`.',
      'You can describe seek, flee, arrive, wander and separation and pick behaviours for an enemy type.',
      'You can explain how blending (weighted sum) combines path-following with local avoidance, and how it relates to flocking.'
    ],
    skills: ['Steering behaviours', 'Blending / arbitration', 'Arrive vs seek', 'Flocking'],
    simplified: 'I describe weighted-sum blending as the everyday tool; production crowds use context steering, RVO/ORCA collision avoidance and priority arbitration to avoid the deadlocks that naive summing can cause. The behaviours here are the durable vocabulary.',
    goDeeper: 'Craig Reynolds’ original "Steering Behaviors for Autonomous Characters" paper is the source; "The Nature of Code" by Daniel Shiffman has the most approachable, visual treatment of seek/arrive/flocking.',
    quiz: [
      { q: 'How do pathfinding and steering divide the work?', a: 'Pathfinding is the *global* planner: it produces a route (a list of waypoints) across the whole level. Steering is the *local*, per-frame layer that actually moves the agent along that route with momentum, easing into stops and pushing around dynamic obstacles and other agents the planner did not know about.' },
      { q: 'Why use Arrive instead of Seek when an agent must stop on a point?', a: 'Plain Seek always pushes at full speed toward the target, so the agent overshoots, turns around, overshoots again, and jitters around the point forever. Arrive scales the desired speed down to zero inside a slowing radius, so the agent decelerates smoothly and settles on the target.' }
    ],
    tags: ['steering', 'flocking', 'seek', 'arrive', 'movement', 'engine-neutral'] },
  {
    id: 'e4-06', title: 'Procedural generation of worlds and behaviour', pillarId: 'E', phaseId: 'e4', moduleId: 'e4b',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 30, diagram: 'playground',
    concept:
'*Layer-1, engine-neutral. Procedural generation ((procgen)) is an algorithm that *authors content* — levels, items, terrain, even behaviour — instead of a human placing every piece.*\n\n' +
'The single most important concept is the **seed**: procgen is driven by a *seeded* pseudo-random number generator, so the same seed always produces the same output. That is what makes a generated world reproducible, shareable and *debuggable* — without it you cannot reliably reproduce the bug a player found. Treat the seed as input, the world as a deterministic function of it.\n\n' +
'A few workhorse techniques you should recognise:\n\n' +
'- **Noise** (Perlin / simplex): smooth, continuous random fields. Sample it for terrain height, biome maps, cave density — the basis of most natural-looking worlds.\n' +
'- **Random walks / drunkard’s walk**: carve a node through a grid to dig organic caves and dungeons.\n' +
'- **Room-and-corridor / BSP**: split space into rectangles, place rooms, connect them — classic for roguelike dungeons.\n' +
'- **Wave Function Collapse & tile constraints**: place tiles so neighbours stay compatible — great for coherent rooms from a tileset.\n' +
'- **Grammars / rule rewriting** (incl. L-systems): expand symbols by rules to grow plants, quests or mission graphs.\n\n' +
'Two design truths the minor will test. First, **scope.** Procgen *looks* like a shortcut to "infinite content" and is the all-time classic over-scope trap — a generator that makes *interesting, fair, finishable* levels is much harder than one that makes *many* levels. The pragmatic answer is **hand-authored chunks, procedurally assembled** (rooms/encounters a designer built, stitched by code): you keep human quality and still get variety. This is a direct seam to [[c1-01]] blockout and [[c2-02]] fair puzzles — procgen does not exempt you from level-design craft, it *industrialises* it. Second, generation almost always needs a **validation/repair pass**: generate, then check (is the exit reachable? path-test it with [[e4-04]]) and fix or regenerate, so you never ship an impossible map.\n\n' +
'"Behaviour" generation is the same idea aimed at AI: pick patrol routes, compose encounter mixes, or assemble dialogue/quests from rules — bounded by designer-set constraints so the *system* surprises you within a frame *you* control.',
    task:
'Design (on paper, no engine) a tiny procedural dungeon generator as numbered steps: how you place rooms, how you connect them, and crucially the **validation pass** that proves the player can reach the exit (hint: reuse the [[e4-04]] pathfinder). State explicitly what the generator does when validation *fails* (regenerate? carve a guaranteed corridor?). Then write two sentences on why you would seed the RNG and how that helps you debug a "soft-locked, no path to exit" report from a playtester.',
    success: [
      'You can explain seeds and why deterministic, reproducible generation matters for sharing and debugging.',
      'You can name appropriate techniques (noise, random walk, room/corridor, WFC, grammars) for a given goal.',
      'You can argue why a validation/repair pass is mandatory and why hand-authored-chunks-assembled beats fully-random for scope and quality.'
    ],
    skills: ['Seeded PRNG / determinism', 'Procgen techniques', 'Validation & repair passes', 'Procgen scope discipline'],
    simplified: 'Each technique here is a whole field (noise octaves, WFC backtracking, constraint solvers). This is a recognise-and-choose map, not an implementation manual; the seed, the validation pass and the scope lesson are the parts that matter most for the minor.',
    goDeeper: 'The "Procedural Content Generation in Games" book (Shaker, Togelius, Nelson — free online) is the academic reference; Amit Patel’s map-generation articles and the original Wave Function Collapse repo show concrete, readable implementations.',
    quiz: [
      { q: 'Why seed the random number generator in a procedural generator?', a: 'A seeded PRNG makes generation deterministic: the same seed always yields the same world. That lets players share worlds by sharing a seed, lets you reproduce and debug a specific generated map a tester reported, and makes test results repeatable — without it, every run is different and bugs become unreproducible.' },
      { q: 'Why is a validation/repair pass usually mandatory after generation?', a: 'Random generation can easily produce unwinnable layouts — an unreachable exit, a sealed key, an isolated room. A validation pass (e.g. path-test the exit with A*) catches these so you can repair the map or regenerate before the player ever sees it, instead of shipping a soft-lock.' },
      { q: 'Why is "hand-authored chunks, procedurally assembled" often better than fully random generation?', a: 'It keeps the human-authored quality, pacing and fairness of designer-built rooms or encounters while still giving variety from the way code stitches them together. Fully random generation is far harder to make consistently interesting and fair, and is a classic over-scope trap; assembling vetted chunks is a much more feasible route to the same payoff.' }
    ],
    tags: ['procedural generation', 'procgen', 'seed', 'noise', 'validation', 'engine-neutral'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
