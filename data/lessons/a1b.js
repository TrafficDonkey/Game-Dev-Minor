/* Pillar A · Phase a1 · Module a1b — Shape of the story */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'a1-05', title: 'Branching and non-linear narrative', pillarId: 'A', phaseId: 'a1', moduleId: 'a1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'A ((branching narrative)) lets the player’s choices change what happens next. It’s the most obvious way to give story to an interactive medium — and the most dangerous to your scope, because branches *multiply*. Understanding the common shapes lets you give the *feeling* of choice without authoring an infinite tree.\n\n' +
'Think of a few structures, cheapest to most expensive:\n\n' +
'- **Linear with flavour.** One path; choices change *dialogue colour* or which line you hear, not the outcome. Cheap, and honestly what most "story games" mostly are.\n' +
'- **Branch and bottleneck (the "string of pearls").** The story opens into choices, then funnels back to a shared beat — a *node* — before opening again. You author divergence *locally* and reconverge, so content doesn’t explode. This is the workhorse shape for a reason.\n' +
'- **Hub and spoke.** A central area unlocks self-contained missions in any order; the spokes don’t need to know about each other. Order is non-linear, but each spoke is authored once.\n' +
'- **Full tree / state-tracked.** Every choice is remembered and recombines later. Most expressive, brutally expensive — content grows roughly *exponentially* with truly independent binary choices, which is why almost no one builds a pure tree.\n\n' +
'The trap is **combinatorial explosion**: ten genuinely independent two-way choices imply on the order of a thousand end-states. Real games dodge this by reconverging (bottlenecks), by tracking a few **flags/variables** instead of whole paths (a `reputation` number, a `metGuard` boolean) and reacting to *state* rather than to every history, and by letting most choices be *local* — they matter now, not forever.\n\n' +
'For you as a small-team dev: branching is a scope decision before it’s a writing one ([[04-01]]). Pick the cheapest shape that delivers the feeling you want. A tight branch-and-bottleneck with a couple of remembered flags reads as "my choices mattered" for a fraction of a tree’s cost — and it’s the kind of restraint the feasibility bar rewards ([[b5-02]]).',
    task:
'Take a short scene (a conversation, a heist beat, a moral dilemma) and **draw its branch graph** on paper. First draw it as a *full tree* with 3 sequential binary choices and count the leaf nodes. Then redraw the *same* scene as a **branch-and-bottleneck**: let the three choices diverge locally but reconverge to one shared next beat, and replace one "remembered" branch with a single tracked **flag** (e.g. `trustedAlly = true`) that a later line checks. Write one sentence on how many distinct chunks of content you had to author in each version.',
    success: [
      'You can name and sketch at least three branching shapes and rank them by cost.',
      'You can explain combinatorial explosion and two concrete ways to avoid it (bottlenecks, flags).',
      'You can convert a small branching scene into a branch-and-bottleneck that tracks state, not whole paths.'
    ],
    skills: ['Branching structures', 'Avoiding combinatorial explosion', 'State/flag-based choice'],
    simplified: 'The "exponential" count assumes choices are independent and each fully forks the rest of the story — real designs reconverge constantly, so practical content cost is far lower. Treat the tree count as the worst case that motivates bottlenecking.',
    goDeeper: 'Look up writing on the "string of pearls" structure and on how narrative-system games track choices with variables/flags; tools like Twine or ink (by inkle) are free ways to feel branching cost first-hand.',
    quiz: [
      { q: 'Why is a pure branching tree almost never built, and what’s the standard fix?', a: 'Content grows roughly exponentially — independent binary choices multiply end-states into the hundreds or thousands, far past what a small team can author or test. The standard fix is branch-and-bottleneck: diverge locally, then reconverge to shared beats, and track a few state flags instead of remembering whole paths.' },
      { q: 'A designer wants "choices that matter" but has a tiny budget. What shape do you recommend?', a: 'Branch-and-bottleneck with a handful of tracked flags. Most choices stay local (they change the moment, then the story reconverges), while a couple of remembered flags let later beats acknowledge earlier decisions — giving the *feeling* of consequence without authoring a tree.' }
    ],
    tags: ['branching', 'non-linear', 'choice', 'scope', 'narrative structure'] },
  {
    id: 'a1-06', title: 'Emergent narrative: stories the systems tell', pillarId: 'A', phaseId: 'a1', moduleId: 'a1b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    concept:
'Not all story is written. ((Emergent narrative)) is the story that arises *from systems interacting* and the player making sense of the result — no author scripted that specific moment, yet it reads as a story. The smuggler who panics and crashes, the base that falls because one colonist held a grudge: nobody wrote those beats; the *rules* produced them and the player narrated them.\n\n' +
'The distinction worth holding is **authored vs emergent**. Authored narrative is hand-placed content (a cutscene, a scripted ambush) — high control, high cost, identical every run. Emergent narrative is *generated by play* — low per-incident cost, high replayability, but you give up control over the specifics. You design the *space of possible stories*, not the stories themselves.\n\n' +
'What makes systems produce good stories rather than noise?\n\n' +
'- **Legible state.** The player must be able to *read* what’s happening — who’s angry, who’s hurt, what’s on fire — or the emergent event reads as a bug, not a beat.\n' +
'- **Persistent consequences.** Actions leave marks that interact later. A wound, a reputation, a burned bridge feeding the next event is what turns incidents into a *narrative*.\n' +
'- **Interacting systems, not one.** Stories emerge at the *seams* between systems — hunger × weather × morale — because their collision creates situations no single system anticipated.\n' +
'- **The player as narrator.** Emergence is half psychology: humans compulsively assign intent and story to outcomes. Your job is to make outcomes *coherent enough* to narrate.\n\n' +
'This is deeply a **seam** topic: the storyteller frames *why* events matter, but the events themselves are built by the **systems designer** ([[b2-01]]) and the **programmer** ([[e4-06]]). It’s also a scope superpower for a small team — a handful of well-chosen interacting systems can generate endless distinct sessions far cheaper than authoring them. The cost moves from *writing content* to *designing and tuning systems*, and tuning is its own hard, open-ended work — emergent systems are notoriously prone to producing dull or absurd outcomes until balanced ([[b2-01]]).',
    task:
'Pick a game you’ve played that produces emergent stories. Write down **one specific story** that happened in *your* playthrough (two or three sentences). Then reverse-engineer it: list the **systems** that had to interact to produce it (e.g. AI behaviour × physics × an economy × permadeath), and identify which two **legibility** cues let you *read* the event as a story rather than noise. Finally, name one tiny game you could scope where *two* interacting systems would generate stories — and state what would have to be legible for the player to narrate them.',
    success: [
      'You can distinguish authored from emergent narrative and state the trade-off (control vs cost vs replayability).',
      'You can point at a real emergent story and name the interacting systems behind it.',
      'You can explain why legibility and persistent consequences are what separate emergent story from noise.'
    ],
    skills: ['Authored vs emergent', 'Designing the story space', 'Reading systems as narrative'],
    simplified: 'Calling systems "interacting" hides a lot of tuning work — most emergent designs spend far longer balancing systems so outcomes are interesting rather than degenerate. The framing here is the goal, not a promise it comes for free.',
    goDeeper: 'Look up talks and writing on emergent narrative in systemic games (often discussed around titles like Dwarf Fortress, RimWorld and the immersive-sim lineage); the phrase "story generator" vs "story" is a useful one to search.',
    quiz: [
      { q: 'What separates an emergent *story* from emergent *noise*?', a: 'Legibility and persistent consequences. If the player can read what’s happening (who’s hurt, angry, on fire) and earlier events leave marks that feed later ones, outcomes cohere into something narratable. Without legibility, the same system collision just reads as a random or buggy event.' },
      { q: 'Where does the cost go when you choose emergent over authored narrative?', a: 'From writing content to designing and *tuning* systems. You stop hand-authoring each beat (cheap per incident, huge replayability) but take on open-ended balancing work, because interacting systems readily produce dull or absurd outcomes until they’re tuned.' }
    ],
    tags: ['emergent', 'systemic', 'replayability', 'systems', 'narrative'] },
  {
    id: 'a1-07', title: 'Player agency vs authored story: the central tension', pillarId: 'A', phaseId: 'a1', moduleId: 'a1b',
    difficulty: 'Advanced', mode: 'knowledge', estMinutes: 26,
    prereq: '[[a1-01]] (agency vs authored intent) and [[a1-05]] (branching) first',
    concept:
'Here is the contradiction at the heart of game narrative, and you should hold it consciously: **the more freedom you give the player, the less control you have over the story — and vice versa.** Agency and authorship pull in opposite directions. Every narrative game lives somewhere on that line, and pretending the tension doesn’t exist is how projects over-scope and stories fall flat.\n\n' +
'Picture a spectrum. At one end, a **fully authored** linear story: total dramatic control, zero narrative agency — closer to a film with input. At the other, a **fully emergent sandbox**: total agency, but you can’t guarantee any particular beat, theme or climax will ever happen. Neither extreme is "better"; they’re different games. The craft is choosing your *point* on the line on purpose, per moment.\n\n' +
'Designers have a toolkit of honest (and dishonest) techniques for managing the tension:\n\n' +
'- **The illusion of choice.** Options that feel meaningful but reconverge — the branch-and-bottleneck again ([[a1-05]]). Used well it respects the player; overused it becomes the "your choices matter (they don’t)" complaint.\n' +
'- **Agency where it’s cheap, authorship where it counts.** Give wide freedom in *how* (route, tactics, order) while keeping *what happens* at key beats authored. Players feel free moment-to-moment and still hit your climax.\n' +
'- **Soft gating and the golden path.** Let the player roam, but shape space and incentives so they tend toward the beats you authored — a level-design seam ([[c0-03]]).\n' +
'- **Embrace emergence and author the frame.** Surrender beat-level control; author the *premise, tone and stakes* instead, and let systems fill the middle ([[a1-06]]).\n\n' +
'There is no resolving this tension — only choosing it deliberately. Be wary of the seductive goal of "total freedom *and* a perfectly authored story": chasing both at full strength is a classic scope killer, because it implies authoring every branch the freedom permits. The mature move is to **state your priority** — is this game *about* its authored arc, or *about* what the player makes happen? — and let that decision cascade into design, level and code ([[a5-01]]). That single call is one of the most important a narrative-leaning team makes.',
    task:
'Place **four games you know** on the agency↔authorship spectrum — draw the line, mark each game, and write one sentence justifying each placement (what it gives the player freedom over, and what it keeps authored). Then take a small game idea of your own and **make the call**: write one sentence declaring whether it prioritises authored arc or player agency, and list **two concrete techniques** from the lesson you’d use to manage the tension (e.g. "agency in route, authored at the two boss beats; soft-gate toward them with level layout"). End with one feature your *priority decision tells you to cut*.',
    success: [
      'You can articulate the agency-vs-authorship tension and why it cannot simply be "solved".',
      'You can place real games on the spectrum and justify the placement.',
      'You can make and defend a deliberate priority for a project and name techniques that fit it.',
      'You can explain why "total freedom plus a fully authored story" is a scope trap.'
    ],
    skills: ['Agency↔authorship trade-off', 'Choosing a narrative priority', 'Managing the tension deliberately'],
    simplified: 'The single "spectrum" line is a teaching simplification — real games sit at different points moment-to-moment (free exploration, authored cutscene, emergent combat) rather than at one fixed spot. Use the line to reason about each *moment*, not just the whole game.',
    goDeeper: 'The agency-vs-narrative debate runs through games criticism and the ludology-vs-narratology discussions; for the practical design angle, study how immersive sims and choice-driven RPGs publicly discuss "the illusion of choice" and where they spend authored content.',
    quiz: [
      { q: 'Why can’t you just maximise both player agency and authored story?', a: 'They pull against each other: more freedom means more possible paths, and authoring a satisfying, controlled story for *every* path explodes in cost. Maximising both at full strength implies writing every branch the freedom allows, which is infeasible — so you must choose a priority and manage the rest with techniques like bottlenecks and soft gating.' },
      { q: 'Name a technique that grants real-feeling agency while protecting an authored climax.', a: '"Agency where it’s cheap, authorship where it counts": give the player wide freedom in *how* they proceed (route, tactics, order, dialogue colour) while keeping the *key story beats* fixed. Players feel free moment-to-moment yet still arrive at the authored climax. Soft-gating the space toward those beats reinforces it.' },
      { q: 'A team wants both a branching epic and a fully open world on a one-semester budget. What’s your advice?', a: 'Name the scope trap directly: that combination implies authoring content for every branch the open world permits. Push them to declare a priority — authored arc *or* player agency — then use the illusion of choice, soft gating, or emergent-with-authored-frame to deliver the *feeling* of the other side cheaply.' }
    ],
    tags: ['agency', 'authored', 'tension', 'scope', 'illusion of choice', 'advanced'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
