/* Pillar C · Phase c3 · Module c3b — Build from kits */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.lessons = D.lessons || [];
  D.lessons.push(
  {
    id: 'c3-02', title: 'Building levels from modular kit assets (the seam to 3D)', pillarId: 'C', phaseId: 'c3', moduleId: 'c3b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 24,
    diagram: 'assetcheck',
    concept:
'A ((modular kit)) is a small set of reusable 3D pieces — walls, floors, corners, doorways, pillars, stairs, props — built to a shared **grid** so they snap together into endless layouts. Instead of modelling every room as a unique mesh, the level designer *assembles* the level from the kit, the way you build with a box of Lego. This is how most studios build environments, and it is the cleanest seam between your level track and your 3D track ([[d5-01]]).\n\n' +
'Why it matters for a small team. **It decouples building from modelling.** Once the 3D artist ships a tileset, the level designer can lay out, iterate and re-cut levels for days without touching Blender. One wall mesh, placed two hundred times, costs almost nothing extra: the GPU draws it cheaply through *instancing*, and your memory budget holds one copy. That is scope discipline made physical — a few dozen well-made pieces can build a whole game ([[04-01]]).\n\n' +
'The contract that makes a kit work is the **grid**. Every piece must align to the same unit (a 1m, 2m or 4m module is common) and have its **pivot** placed predictably — usually on the grid corner or edge, not the mesh centre — so pieces snap edge-to-edge with no gaps or overlaps ([[d5-02]]). If the artist and the level designer do not agree the grid and pivot rules up front, nothing lines up and the kit is useless. So this lesson is really about a *handoff*: the 3D track authors to a spec, the level track builds against it.\n\n' +
'Modularity has a cost too: kits can read as **repetitive** — the dreaded "copy-paste corridor". You fight that with variation pieces, rotation and mirroring, and a later set-dressing pass that breaks the grid with unique props ([[c3-03]]). And modular geometry is the *blockout you keep* — it carries the pacing, sightlines and critical path you established in greybox ([[c1-01]]) straight into the shippable level. In the engine, this same workflow appears as prefab/snapping tools ([[c4-03]]).',
    task:
'Pick a real game environment you can study (a corridor-and-rooms level you own or can watch footage of) and **reverse-engineer its kit**. List the smallest set of repeating pieces you can spot — e.g. *straight wall, corner wall, floor tile, doorway, T-junction, stair, pillar*. Estimate the **grid unit** the geometry seems built on (do walls and doors line up on a consistent spacing?). Then sketch, on paper or with simple boxes, a small two-room layout assembled *only* from your listed pieces, and mark one spot where repetition would show and how you would break it up.',
    success: [
      'You can explain why a modular kit decouples level layout from 3D modelling, and why that helps a small team.',
      'You can state the grid + pivot contract and why both tracks must agree it before any pieces are placed.',
      'You can identify the repeating pieces in a real level and name a concrete way to fight visible repetition.'
    ],
    skills: ['Kit-based level assembly', 'Grid & pivot handoff', 'Spotting and breaking repetition'],
    simplified: 'Grid sizes (1m / 2m / 4m modules) are common conventions, not rules — pick a unit that suits your asset scale and player size, then keep the whole kit consistent to it. Instancing/draw-call behaviour varies by engine and renderer.',
    goDeeper: 'Search GDC talks on modular environment design (the Insomniac and Naughty Dog environment-kit talks are widely referenced); Blender and Unity/Unreal docs cover grid snapping and prefab/instancing specifics for your version.',
    quiz: [
      { q: 'Why is the pivot point of a modular piece as important as its grid size?', a: 'The pivot is the anchor the piece snaps and rotates around. If pivots are placed inconsistently (some at the mesh centre, some at a corner), pieces will not line up edge-to-edge even on a correct grid — you get gaps, overlaps and rotation that swings pieces out of place. Agreeing pivot placement is part of the kit contract.' },
      { q: 'A reviewer says your kit-built level looks "copy-pasted". Name two cheap fixes.', a: 'Add variation and asymmetry without new core geometry: rotate and mirror existing pieces, swap in a few dedicated variation tiles (a cracked wall, a different floor), and run a set-dressing pass with unique props and lighting that breaks the grid. The structural kit stays the same; the surface reads as varied.' },
      { q: 'How does a modular kit support scope discipline?', a: 'A few dozen reusable pieces can build a whole game, so the team authors and optimises a small, finite set of assets instead of a unique mesh per room. Less to model, texture, review and load — and the level designer can iterate layouts for days without new art.' }
    ],
    tags: ['modular kit', 'level design', 'grid', 'pivots', 'seam to 3d', 'scope'] },
  {
    id: 'c3-03', title: 'Set dressing and detail passes', pillarId: 'C', phaseId: 'c3', moduleId: 'c3b',
    difficulty: 'Intermediate', mode: 'knowledge', estMinutes: 22,
    concept:
'((Set dressing)) is the pass where a grey, structural level becomes a *place*. The blockout ([[c1-01]]) and the modular kit ([[c3-02]]) give you correct geometry — the right shapes, distances and pacing. Set dressing adds the props, clutter, decals, foliage, lights and small unique meshes that make the space feel lived-in, tell its story, and hide the seams of the kit. Critically, it comes **last on purpose**: you do not dress a level until its layout and pacing are locked, because every prop you place is sunk cost that makes the level harder to change.\n\n' +
'Set dressing does real *design* work, not just decoration:\n' +
'- **Environmental storytelling** — an overturned chair, scorch marks, a barricaded door tell the story without a word ([[c0-03]]). This is the seam back to the story track.\n' +
'- **Guidance and readability** — a shaft of light, a trail of props or a colour accent leads the eye toward the path; clutter can gently block or discourage the wrong way ([[c1-03]]). Any prop that carries meaning needs a redundant cue (shape, light, placement), not colour alone, so colour-blind players read it too.\n' +
'- **Breaking modular repetition** — unique hero props and asymmetric clutter disguise the copy-paste grid of the kit.\n\n' +
'Work it as **detail passes**, not one heroic effort. A common rhythm: a *first pass* of large anchoring props (the big furniture, the focal set-piece), a *second pass* of medium clutter and decals, and a *polish pass* of small detail and lighting tweaks. Passing lets you stop at "good enough" at any point — vital for scope, because set dressing is a bottomless time-sink and you must spend the most effort where the player actually looks ([[04-01]]).\n\n' +
'Two traps. **Over-dressing** kills readability and performance — a floor of a hundred tiny props reads as noise and tanks the frame rate; favour a few well-placed pieces. And **dressing that fights the layout** — props that block sightlines or imply a path that does not exist — actively misleads the player. Good set dressing serves the level; it never overrides it.',
    task:
'Take a blocked-out space you have (from [[c1-01]] or a sketch) and write a **three-pass dressing plan** for one room. Pass 1: list 3–5 *anchor* props and where each goes and why (focal point, story beat, or path cue). Pass 2: list the medium clutter and any decals. Pass 3: name the lighting and small-detail touches. For at least two props, write one sentence of the *story* they imply. Finally, mark one area you will deliberately leave sparse — and justify it in scope and readability terms.',
    success: [
      'You can explain why set dressing comes after the layout and pacing are locked.',
      'You can show set dressing doing design work — storytelling, guidance — not just decoration.',
      'You can plan dressing as staged passes and name where over-dressing would hurt readability, performance or scope.'
    ],
    skills: ['Set dressing & detail passes', 'Dressing for story & guidance', 'Scoping a detail pass'],
    simplified: 'The exact pass structure (anchor → clutter → polish) is a sensible working rhythm, not a fixed standard; studios name and split passes differently. Prop-count performance limits depend entirely on your hardware, engine and how aggressively meshes are instanced or batched.',
    goDeeper: 'Look up environment-art and level-art breakdowns on set dressing and "kitbashing" (GDC and studio dev blogs); the principle of leading the eye with light and composition is covered in any cinematography or level-art talk on visual flow.',
    quiz: [
      { q: 'Why is set dressing deliberately the last pass on a level, not the first?', a: 'Because every prop placed is sunk cost that makes the layout harder to change. You lock geometry, pacing and the critical path first — when those are still moving, dressing is wasted work you will tear out. Dressing a level you might re-cut is the classic way to burn time you do not have.' },
      { q: 'Give one way set dressing guides the player and one way it can mislead them.', a: 'It guides by leading the eye — a shaft of light, a colour accent or a trail of props pointing toward the path, with clutter discouraging dead ends. It misleads when a prop blocks a sightline, hides the real exit, or implies a route that does not exist, so the dressing fights the intended flow instead of serving it.' },
      { q: 'What is the risk of over-dressing a level?', a: 'Too many props create visual noise that hurts readability (the player cannot tell important objects from decoration), can imply false paths, and tank performance through extra draw calls and overdraw. A few well-placed, meaningful pieces beat a floor full of clutter — and cost far less time.' }
    ],
    tags: ['set dressing', 'detail pass', 'environmental storytelling', 'readability', 'level art', 'scope'] }
  );
})(typeof window !== 'undefined' ? window : globalThis);
