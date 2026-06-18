# Game Dev Academy — Decisions & deviations

Brief-faithful build notes, and the few places I made a judgement call. (Final verification numbers
are filled in at the bottom once the full content build + validation completed.)

## Architecture
- **Reused the studio's house pattern** (the `interior-academy` / `vehicle-academy` single-page shell):
  classic-script data modules pushed onto a global, hash router, localStorage store with export/import,
  a `curric` access layer, and one file per module under `data/lessons/`. Namespace `GDA` / `GDA_DATA`,
  localStorage key `gameacademy.v1`. This is the proven, `file://`-safe, no-build architecture the brief
  asked for, and keeps data files small at the ~169-lesson scale.
- **Seven pillars: `0` + `A–F`.** The brief numbers the foundation pillar "Pillar 0", so its id is the
  digit `'0'` and its lesson ids begin with a digit (`00-01`, `03-02`). The shared markup engine's
  lesson-link regex and the validator's cross-ref regex were widened from `[a-f]` to `[0a-f]` so
  Pillar-0 cross-references render as links.
- **Added fenced code-block support** (```` ``` ````) to the shared markup engine (`js/ui.js` `prose()`),
  which the interior/vehicle courses never needed. The programming pillar relies on it; the validator
  checks fences are balanced.

## Curriculum
- **~169 lessons across 7 pillars** (0:23 · A:25 · B:24 · C:19 · D:26 · E:38 · F:14) — within the brief's
  150–190 target. Programming (E) and game-ready 3D (D) are the deep technical pillars per the brief
  (30–40 and 22–30 respectively). Every lesson is a genuinely distinct topic (no padding) and nothing
  core is missing (no stubs).
- **The five chosen tracks are all deep** (Story A, Design B, Levels C, 3D D, Code E), **plus** the
  minor/pipeline/team pillar (0) and a capstone (F). The **seams between disciplines** are cross-linked
  throughout — the explicit solo-dev goal.

## The two-layer programming split (brief-critical)
- Pillar E is split openly: **Layer 1 (engine-neutral)** = phases `e0` (CS fundamentals) and `e1`
  (game-programming concepts: game loop, delta time, vectors/transforms, FSMs, events, components),
  taught in pseudocode/JS and framed as transferable. **Layer 2 (engine-specific)** = phase `e2`,
  walled off in its own phase. The engine-specific level-building lessons live in Pillar C phase `c4`.
- **Engine resolved → Godot 4.x.** The minor's engine was initially unknown, so Layer 2 was built
  default-Unity-but-walled-off-and-swappable. The organisers later confirmed **Godot 4.x**, with
  **GDScript or C# both allowed** for the project and individual deliverables — so Layer 2 (phase `e2`),
  the in-engine level lessons (`c4`), the 3D-export/toolchain/capstone lessons, the shortcut reference and
  the glossary were all re-pointed to Godot. **GDScript is shown as the primary teaching language; C# is
  flagged as fully supported and equally valid** (closer to the JS/CS fundamentals, more transferable) —
  snippets aren't doubled. Layer 1 stays engine-neutral but now leads with Godot's hooks (`_process(delta)`,
  `_physics_process`, signals, `CharacterBody`) and names Unity/Unreal only as "same idea elsewhere," so the
  transferable framing the brief asked for is preserved as a genuine cross-engine reference rather than a
  hedge. The conversion was done by a parallel sub-agent pass against an accurate Godot-4.x mapping, then
  validated (`check.mjs`), browser-tested and spot-reviewed for Godot correctness.

## Aesthetic & signature
- Grounded in a **game engine's dark editor**: charcoal viewport-grey panels, hairline borders, a faint
  viewport grid, **X/Y/Z transform-gizmo accents** (red/green/blue) as a recurring motif, a warm **amber
  "play / selected"** signature accent, and **monospace for every code token, shortcut, id and spec**.
  Display type is a strong confident sans — deliberately not the cream-serif-on-charcoal AI cliché, and
  not a clone of any engine's branding.
- **Signature element: the interactive Pipeline Map** in the dashboard hero (chosen over the GDD builder)
  — it is the most on-theme single artefact for the solo-dev goal: click a role to see what it does and
  what it hands to the next. The GDD builder is still a full first-class tool.
- Seven pillar hues are distinct in hue and **always paired with a letter/label**; a colourblind mode
  swaps in an Okabe–Ito-derived palette; all colour-coded UI (gizmo axes, difficulty, PBR channels,
  flags) carries redundant text. A light "daylight editor" theme is included.

## Tools (10, all functional, honest about the medium)
- `pipeline` (signature), `gdd`, `scope`, `coreloop`, `blockout`, `achieve`, `kanban`, `assetcheck`,
  `playground`, `narrative`. Every tool is a real, illustrative JS concept-teacher — **none fakes a game
  engine or Blender**. The `playground` genuinely runs JavaScript (the language the browser speaks) as a
  local, single-user REPL to illustrate the game loop, FSMs and vectors — and says so.

## Honesty & uncertain details (labelled, not asserted)
- The site cannot run an engine or Blender; lessons teach concepts, click-paths/commands and JS demos.
- **Engine = Godot 4.x** (confirmed by the organisers), written in **GDScript or C#** (both allowed for
  project and deliverables). GDScript is the primary shown language, C# noted as equally valid; Layer-1
  fundamentals stay engine-neutral and are framed as what transfers.
- **Achievement grade model (corrected against the real rubric).** The minor's actual rules: grade =
  50% individual achievement portfolio + 50% the group game (graded by the lecturers in their areas);
  **silver = attending all of a track's lectures** (attendance), **gold = two individual assignments per
  track**, **platinum = two higher-skill assignments per track**; **≥8 gold → a 6**, **+8 platinum → a 10**.
  Lessons `01-01/01-02/01-03` and `f2-01` and the `achieve` tool were rewritten to match exactly: the
  planner is now **count-based** (5 tracks × 2 gold + 2 platinum = 10 of each available, need 8 of each),
  showing "—" below 8 gold, 6.0 at 8 gold, and +0.5 per platinum up to 10.0. The two anchors are the
  course's stated rule; the in-between +0.5/platinum scaling is labelled as the tool's interpretation to
  confirm with the programme. (Earlier versions described silver as generic "baseline work" and averaged a
  per-slot score — both wrong; fixed.)
- Engine/Blender shortcuts are flagged as remappable / version-dependent defaults.

## Build process
- Hand-built the shell, CSS design system, the signature Pipeline tool, the data spine (`pillars.js`),
  the 12 projects, the 10 milestones + evaluator, the Node validator (`check.mjs`), the authoring
  contract (`AUTHORING.md`), and **three gold-standard exemplar modules** (a0a story, d0a game-ready 3D,
  e1a programming with the two-layer split shown). The remaining 9 tools, the glossary, the shortcut
  reference and the other ~158 lessons were generated by parallel sub-agents against that contract, then
  validated with `check.mjs` and reviewed in the browser.

## Final verification (all green)
- `node check.mjs`: **169 lessons** (0:23 A:25 B:24 C:19 D:26 E:38 F:14), 59 lesson files,
  **142 glossary terms**, **56 shortcuts** (Godot/Blender/Git), 12 projects, 10 milestones —
  zero problems, zero warnings (every cross-reference resolves, every concept in word-count range,
  every ``` code fence balanced, every `diagram` tool id valid).
- Served locally: **zero console errors/warnings**; all 169 lessons render; **all 10 tools mount and
  interaction-tested** (the code playground genuinely evaluates user JS and catches errors; export/copy
  works; persistence verified); **all 60 in-lesson concept-tool embeds mount**; fenced code blocks render
  as `<pre>`; **export/import round-trips losslessly**; global search spans lessons, glossary, shortcuts
  and tools; colourblind / light / reduced-motion toggles all work; **responsive single-column at 375px
  phone width with no horizontal overflow** (fixed a grid-item `min-width` blow-out in the shared shell).
- Integrity: 0 orphan lessons (every lesson resolves its phase + module), 0 dead milestone targets,
  0 dead project cross-references, 0 invalid diagram tool ids.
- `file://`-safe: no `fetch` / `import` / ES modules / XHR anywhere in `js/` or `data/` — classic scripts
  only, exactly as the brief requires for double-click `index.html`.

## Small deviation worth noting
- Added a defensive `min-width: 0` to the top-bar grid item and made the search field shrinkable, plus
  `overflow-x: auto` on embedded tool frames, so a wide concept tool (e.g. the blockout grid) can never
  break the page layout at phone width. This is an improvement over the inherited shell CSS.

## Mobile + offline PWA pass (follow-up)
- **Mobile polish (phone-only, desktop untouched).** All new rules live in `@media (max-width: 640px)`
  (plus desktop-safe `overflow-wrap` for long inline `code`/`kbd` tokens). On phones: 16.5px reading
  size, ≥44px tap targets (icon buttons, sidebar rows, segmented buttons, checklist items), full-width
  prev/next and form fields, and momentum horizontal scroll for code blocks / wide diagrams. The
  existing ≤920px hamburger drawer is the mobile nav. Verified at **375px with zero horizontal overflow**
  across dashboard, code-heavy lessons, every tool, curriculum, glossary, projects and shortcuts; the
  desktop two-column layout (312px sidebar + main, 15.5px font) is confirmed unchanged.
- **Touch-usable tools.** The two drag-based tools degrade gracefully without drag: Kanban cards move via
  `‹ ›` buttons (tested) and blockout cells paint on tap (tested + persists). Other tools are
  textareas/selects/segmented buttons — touch-native.
- **Installable, offline PWA — no build, no backend.** Added `manifest.webmanifest` (standalone, relative
  `start_url`/`scope` for subpath hosting, three PNG icons incl. a maskable one — the X/Y/Z gizmo mark,
  drawn with Pillow), Apple touch-icon + meta, a favicon, and `sw.js` — a static service worker that
  precaches the whole app shell + all 59 lesson files + tools + icons (**96 entries**), serves cache-first
  for assets and network-first-with-cache-fallback for navigations. Verified: SW installs, activates and
  **controls** the page; the cache holds complete copies; the app renders and tools mount entirely through
  the SW. Registration is guarded (`location.protocol !== 'file:'`) so double-clicking `index.html` still
  works; the SW simply doesn't run there.
- **All paths relative, no external requests.** No leading-slash paths, no CDN, no webfonts (system stacks
  only) — works from `file://`, from `python -m http.server`, and from a hosted subpath like
  `user.github.io/repo/`.
- **Honest caveat documented in `SETUP.md`:** service workers (offline + install) require a secure context,
  so the LAN `http://<PC-IP>:8000` route works for reading but won't install/cache offline — the hosted
  `https` route (GitHub Pages / Netlify / Cloudflare Pages) is the one that installs. No backend added;
  cross-device progress is reconciled with the existing export/import JSON backup.
