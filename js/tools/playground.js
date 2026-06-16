/* =============================================================================
 * Game Dev Academy — Tool: Code-Concept Playground.
 * Live, in-BROWSER JavaScript demos of engine-NEUTRAL concepts. Be honest: this
 * runs JavaScript (the language the browser already speaks) to ILLUSTRATE ideas
 * you'll later re-implement in a real engine — it is NOT a game engine and shows
 * no faked engine output. Three canvas/text demos:
 *   1) Game loop & delta time — frame-independent motion via rAF + dt, with a
 *      "simulate lag" control, plus Run / Pause / Step.
 *   2) Finite state machine — an agent cycling Patrol / Chase / Flee, driven by
 *      a "player nearby" toggle and a "take damage" button.
 *   3) Vectors & transforms — a position vector from the origin with add /
 *      normalise / rotate / lerp, using the X (red) and Y (green) axis colours,
 *      always carried with a text label.
 * Plus a "Fix / extend this logic" area: a prefilled snippet you edit and Run in
 * a try/catch via new Function(...), with returned value + captured console.log
 * printed to a .code-out. Every rAF id and timer is tracked and cancelled in
 * dispose(); the loop is paused when you switch demos. Persists the selected demo
 * and your edited exercise code. Fully keyboard-accessible; colour always paired
 * with a text label. Pure DOM, offline. compact mode shows only the game loop.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var ui = GDA.ui, store = GDA.store;
  var ID = 'playground';

  // ---- exercises (short, real, each fully runnable in the browser) ----------
  var EXERCISES = [
    {
      id: 'dt',
      title: 'Make movement frame-independent',
      prompt: 'This moves the box a fixed amount per FRAME, so it runs faster on a 144Hz monitor than a 30Hz one. Fix it: multiply by `dt` (seconds elapsed) so speed is the same in real-world time. Return the new x after one step at 60fps (dt = 1/60). speed is in pixels PER SECOND.',
      code:
        'var speed = 300;      // pixels per second\n' +
        'var dt = 1 / 60;      // seconds since last frame\n' +
        'var x = 0;\n' +
        '\n' +
        '// BUG: this adds a flat amount every frame, ignoring dt.\n' +
        'x = x + speed;\n' +
        '\n' +
        'return x;             // want ~5 (300 * 1/60), not 300'
    },
    {
      id: 'fsm',
      title: 'Fix the state-machine transition',
      prompt: 'A guard should CHASE when the player is near, otherwise PATROL. The transition is inverted. Fix the condition so it returns the correct next state. Try it with playerNear = true and = false.',
      code:
        'function nextState(state, playerNear) {\n' +
        '  if (state === "patrol") {\n' +
        '    // BUG: this chases when the player is FAR away.\n' +
        '    if (!playerNear) return "chase";\n' +
        '    return "patrol";\n' +
        '  }\n' +
        '  if (state === "chase") {\n' +
        '    return playerNear ? "chase" : "patrol";\n' +
        '  }\n' +
        '  return state;\n' +
        '}\n' +
        '\n' +
        'console.log("near ->", nextState("patrol", true));\n' +
        'console.log("far  ->", nextState("patrol", false));\n' +
        'return nextState("patrol", true);   // want "chase"'
    },
    {
      id: 'clamp',
      title: 'Implement clamp(v, min, max)',
      prompt: 'clamp keeps a value inside a range — vital for health bars, camera limits and timers. Implement it: return min if v is below min, max if above max, else v. The tests below should all print true.',
      code:
        'function clamp(v, min, max) {\n' +
        '  // TODO: return v limited to the range [min, max]\n' +
        '\n' +
        '}\n' +
        '\n' +
        'console.log(clamp(5, 0, 10) === 5);    // in range\n' +
        'console.log(clamp(-3, 0, 10) === 0);   // below min\n' +
        'console.log(clamp(99, 0, 10) === 10);  // above max\n' +
        'return clamp(120, 0, 100);             // want 100'
    }
  ];

  var DEMOS = [
    { id: 'loop', label: 'Game loop & delta time' },
    { id: 'fsm', label: 'Finite state machine' },
    { id: 'vec', label: 'Vectors & transforms' }
  ];

  function clampNum(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function mount(container, opts) {
    opts = opts || {};
    var compact = opts.compact === true;

    var saved = store.toolState(ID) || {};
    var demo = (!compact && DEMOS.some(function (d) { return d.id === saved.demo; })) ? saved.demo : 'loop';
    if (compact) demo = 'loop';

    var exId = EXERCISES.some(function (e) { return e.id === saved.exId; }) ? saved.exId : EXERCISES[0].id;
    var edits = (saved.edits && typeof saved.edits === 'object') ? saved.edits : {};

    // ---- per-mount resource tracking (everything dispose() must clean up) ----
    var rafId = 0;
    var timers = [];
    var running = false;        // is the live demo loop animating?
    var lastTs = 0;             // previous rAF timestamp (ms)

    container.innerHTML = '';
    var html = '';

    // honesty banner
    html += '<div class="callout deeper" role="note" style="margin:0 0 14px">'
      + '<span class="ct">What this really is</span>'
      + 'This runs <b>JavaScript</b> — the language your browser already speaks — to <b>illustrate</b> concepts you’ll '
      + 're-implement in a real engine. It is <b>not a game engine</b> and shows no engine output. The maths and loops below '
      + 'genuinely execute, so what you see is real JS, not a mock-up.</div>';

    // demo selector (hidden in compact — game loop only)
    if (!compact) {
      html += '<div class="tool-controls" style="margin-bottom:10px">'
        + '<div class="ctrl" style="min-width:0"><label for="pg-demo">Concept demo</label>'
        + '<div class="seg" role="tablist" aria-label="Choose a concept demo" id="pg-demo">'
        + DEMOS.map(function (d) {
            return '<button type="button" role="tab" data-demo="' + d.id + '" aria-selected="'
              + (d.id === demo ? 'true' : 'false') + '"' + (d.id === demo ? ' class="on"' : '') + '>'
              + ui.esc(d.label) + '</button>';
          }).join('')
        + '</div></div></div>';
    } else {
      html += '<div class="readout" style="margin-bottom:8px">' + ui.icon('play')
        + ' <b>Game loop &amp; delta time</b> — frame-independent motion</div>';
    }

    // the live demo mounts here
    html += '<div id="pg-demo-host"></div>';

    // exercise area (full mode only)
    if (!compact) {
      html += '<hr>';
      html += '<h3 style="display:flex;align-items:center;gap:8px;font-size:1.05rem">' + ui.icon('code')
        + ' Fix / extend this logic</h3>';
      html += '<p class="dim" style="font-size:.9rem;margin:.2em 0 12px">Edit the snippet and press '
        + '<b>Run</b>. Your code runs in a sandboxed <code>new Function</code> with a try/catch — '
        + 'a <code>return</code> value and any <code>console.log</code> output print below. Your edits are saved.</p>';

      html += '<div class="tool-controls" style="margin-bottom:10px">'
        + '<div class="ctrl"><label for="pg-ex">Exercise</label>'
        + '<select class="field" id="pg-ex">'
        + EXERCISES.map(function (e, i) {
            return '<option value="' + e.id + '"' + (e.id === exId ? ' selected' : '') + '>'
              + (i + 1) + '. ' + ui.esc(e.title) + '</option>';
          }).join('')
        + '</select></div></div>';

      html += '<div class="panel" id="pg-ex-prompt" style="margin-bottom:10px;font-size:.92rem" aria-live="polite"></div>';
      html += '<label class="sr-only" for="pg-code">Editable JavaScript exercise</label>';
      html += '<textarea class="field mono" id="pg-code" spellcheck="false" rows="11" '
        + 'style="font-size:.84rem;white-space:pre" aria-describedby="pg-ex-prompt"></textarea>';
      html += '<div class="chip-row" style="margin:10px 0">'
        + '<button type="button" class="btn primary sm" id="pg-run">' + ui.icon('play') + ' Run</button>'
        + '<button type="button" class="btn ghost sm" id="pg-reset">' + ui.icon('reset') + ' Reset snippet</button>'
        + '</div>';
      html += '<div class="readout" style="margin-bottom:4px">Output</div>';
      html += '<div class="code-out" id="pg-out" role="status" aria-live="polite">Press Run to evaluate.</div>';
    }

    container.innerHTML = html;

    var host = container.querySelector('#pg-demo-host');

    // ---- helpers shared by the three demos ----------------------------------
    function track(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
    function stopLoop() {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    }

    // current demo's frame handler + cleanup, swapped on demo change
    var activeTick = null;      // function(dtSeconds, nowMs) — advances + draws one frame
    var activeStill = null;     // function() — redraw current state without advancing

    function loop(ts) {
      if (!running) return;
      if (!lastTs) lastTs = ts;
      var dt = (ts - lastTs) / 1000;
      lastTs = ts;
      // guard against tab-switch hitches producing a huge dt jump
      if (dt > 0.1) dt = 0.1;
      if (activeTick) activeTick(dt, ts);
      rafId = requestAnimationFrame(loop);
    }
    function startLoop() {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(loop);
    }

    // ====================================================================
    //  DEMO 1 — Game loop & delta time
    // ====================================================================
    function buildLoopDemo() {
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      var W = compact ? 320 : 560, H = compact ? 120 : 150;

      host.innerHTML =
        '<div class="tool-stage">'
        + '<canvas id="pg-cv" width="' + (W * dpr) + '" height="' + (H * dpr) + '" '
        + 'style="width:100%;max-width:' + W + 'px;height:auto;border-radius:8px;background:#0f1115" '
        + 'role="img" aria-label="A square moving left to right; two boxes show that delta-time motion stays in sync while per-frame motion drifts when the frame rate changes."></canvas>'
        + '<div class="legend" style="margin-top:8px">'
        + '<span class="lk"><span class="sw" style="background:var(--accent)"></span> A &mdash; uses delta time (frame-independent)</span>'
        + '<span class="lk"><span class="sw" style="background:var(--bad)"></span> B &mdash; fixed step per frame (drifts)</span>'
        + '</div>'
        + '<div class="tool-controls" style="margin:12px 0 0">'
        + '<div class="ctrl"><label for="pg-fps">Simulated frame rate <span class="val" id="pg-fps-v"></span></label>'
        + '<input type="range" id="pg-fps" min="10" max="144" step="1"></div>'
        + '<div class="ctrl" style="min-width:0;justify-content:flex-end">'
        + '<div class="seg" role="group" aria-label="Loop controls">'
        + '<button type="button" id="pg-run-loop">' + ui.icon('play') + ' Run</button>'
        + '<button type="button" id="pg-pause-loop">Pause</button>'
        + '<button type="button" id="pg-step-loop">Step</button>'
        + '</div></div></div>'
        + '<div class="readout" id="pg-loop-read" style="margin-top:10px"></div>'
        + (compact ? '' :
            '<p class="dim" style="font-size:.86rem;margin:10px 0 0">Drag the slider to fake a slow or fast monitor. '
            + 'Box <b>A</b> multiplies its speed by <code>dt</code> (real seconds elapsed) so it crosses the track in the '
            + 'same wall-clock time at any frame rate. Box <b>B</b> moves a flat amount each frame, so it speeds up or '
            + 'crawls as the rate changes &mdash; the classic frame-dependence bug.</p>')
        + '</div>';

      var cv = host.querySelector('#pg-cv');
      var ctx = cv.getContext('2d');
      ctx.scale(dpr, dpr);

      var fpsEl = host.querySelector('#pg-fps');
      var fpsV = host.querySelector('#pg-fps-v');
      var read = host.querySelector('#pg-loop-read');

      var simFps = clampNum(saved.fps || 60, 10, 144);
      fpsEl.value = simFps;

      var SPEED = 130;          // px/sec for the dt-correct box A
      var perFrame = SPEED / 60; // box B was tuned at 60fps and never adapted
      var ax = 12, bx = 12;     // positions
      var trackL = 12, trackR = W - 28;
      var simAccum = 0;          // accumulator so the slider throttles the *simulated* step

      function setFpsLabel() { fpsV.textContent = simFps + ' fps'; }

      function drawBox(y, x, colour, letter) {
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, 16, 16);
        ctx.fillStyle = '#0f1115';
        ctx.font = 'bold 11px ' + (getComputedStyle(document.body).getPropertyValue('--mono') || 'monospace');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, x + 8, y + 8);
      }

      function render() {
        ctx.clearRect(0, 0, W, H);
        // track lines
        ctx.strokeStyle = '#2a2f38';
        ctx.lineWidth = 1;
        [H * 0.34, H * 0.7].forEach(function (y) {
          ctx.beginPath(); ctx.moveTo(trackL, y + 8); ctx.lineTo(trackR + 16, y + 8); ctx.stroke();
        });
        drawBox(H * 0.34, ax, getComputedStyle(document.body).getPropertyValue('--accent') || '#f0a830', 'A');
        drawBox(H * 0.7, bx, getComputedStyle(document.body).getPropertyValue('--bad') || '#e0584d', 'B');
      }

      function wrap(x) { return x > trackR ? trackL : x; }

      function advance(dt) {
        // Box A: physically correct — distance = speed * time.
        ax = wrap(ax + SPEED * dt);
        // Box B: ignores dt, just adds a flat step per *simulated* frame.
        bx = wrap(bx + perFrame);
      }

      // We use the real rAF for smooth redraw, but only advance the simulation at
      // the slider's chosen frame rate, so a low "fps" genuinely produces fewer,
      // larger steps — the honest cause of frame-dependence.
      activeTick = function (realDt) {
        simAccum += realDt;
        var step = 1 / simFps;
        var frames = 0;
        while (simAccum >= step && frames < 8) {
          advance(step);
          simAccum -= step;
          frames++;
        }
        render();
        updateRead(frames);
      };
      activeStill = function () { render(); updateRead(0); };

      function updateRead(framesThisTick) {
        var drift = Math.round(ax - bx);
        read.innerHTML =
          'Simulated rate <b>' + simFps + ' fps</b> &nbsp;·&nbsp; step <b>' + (1000 / simFps).toFixed(1) + ' ms</b>'
          + ' &nbsp;·&nbsp; A&minus;B gap <b>' + (drift >= 0 ? '+' : '') + drift + ' px</b> '
          + (Math.abs(drift) < 6
              ? '<span class="flag ok" style="margin-left:6px"><span class="fi">OK</span> in sync</span>'
              : '<span class="flag bad" style="margin-left:6px"><span class="fi">!</span> B has drifted</span>');
      }

      setFpsLabel();
      render();
      updateRead(0);

      fpsEl.addEventListener('input', function () {
        simFps = clampNum(parseInt(fpsEl.value, 10) || 60, 10, 144);
        setFpsLabel();
        save({ fps: simFps });
        if (!running) activeStill();
      });

      var runBtn = host.querySelector('#pg-run-loop');
      var pauseBtn = host.querySelector('#pg-pause-loop');
      var stepBtn = host.querySelector('#pg-step-loop');
      function syncBtns() {
        runBtn.classList.toggle('on', running);
        runBtn.setAttribute('aria-pressed', running ? 'true' : 'false');
        pauseBtn.classList.toggle('on', !running);
        pauseBtn.setAttribute('aria-pressed', !running ? 'true' : 'false');
      }
      runBtn.addEventListener('click', function () { startLoop(); syncBtns(); });
      pauseBtn.addEventListener('click', function () { stopLoop(); syncBtns(); });
      stepBtn.addEventListener('click', function () {
        stopLoop(); syncBtns();
        // one fixed simulated step at the chosen rate, then redraw
        advance(1 / simFps); render(); updateRead(1);
      });

      syncBtns();
      // auto-run on first paint so the concept is immediately visible
      startLoop(); syncBtns();
    }

    // ====================================================================
    //  DEMO 2 — Finite state machine
    // ====================================================================
    function buildFsmDemo() {
      var states = {
        patrol: { label: 'PATROL', colour: 'var(--p-C)', letter: 'P',
          desc: 'Walks a fixed route, scanning. Calm.' },
        chase:  { label: 'CHASE', colour: 'var(--warn)', letter: 'C',
          desc: 'Player spotted nearby — closes the distance.' },
        flee:   { label: 'FLEE', colour: 'var(--bad)', letter: 'F',
          desc: 'Hurt and outmatched — retreats to safety.' }
      };

      host.innerHTML =
        '<div class="tool-stage">'
        + '<div class="grid cols-2" style="gap:14px;align-items:start">'
        + '<div>'
        + '<div id="pg-fsm-vis" role="img" aria-live="polite" '
        + 'style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;'
        + 'min-height:150px;border-radius:8px;background:#0f1115;padding:16px"></div>'
        + '<div class="legend" style="margin-top:8px">'
        + '<span class="lk"><span class="sw" style="background:var(--p-C)"></span> P &mdash; Patrol</span>'
        + '<span class="lk"><span class="sw" style="background:var(--warn)"></span> C &mdash; Chase</span>'
        + '<span class="lk"><span class="sw" style="background:var(--bad)"></span> F &mdash; Flee</span>'
        + '</div></div>'
        + '<div>'
        + '<div class="chip-row" style="margin-bottom:12px">'
        + '<button type="button" class="btn sm" id="pg-near" aria-pressed="false">Player nearby: <b id="pg-near-v">no</b></button>'
        + '<button type="button" class="btn sm" id="pg-dmg">' + ui.icon('bolt') + ' Take damage</button>'
        + '<button type="button" class="btn ghost sm" id="pg-heal">' + ui.icon('reset') + ' Reset HP</button>'
        + '</div>'
        + '<div class="readout" id="pg-fsm-read"></div>'
        + '<div class="diagram-info" id="pg-fsm-info" style="margin-top:10px;min-height:0"></div>'
        + '</div></div>'
        + (compact ? '' :
            '<p class="dim" style="font-size:.86rem;margin:12px 0 0">A finite state machine is just <i>"which mode am I '
            + 'in, and what flips me to the next?"</i> Toggle <b>player nearby</b> and deal damage to drive the '
            + 'transitions. Below ~35% HP the agent abandons the chase and flees &mdash; the rule lives in one place, '
            + 'which is exactly why FSMs stay readable.</p>')
        + '</div>';

      var vis = host.querySelector('#pg-fsm-vis');
      var read = host.querySelector('#pg-fsm-read');
      var info = host.querySelector('#pg-fsm-info');
      var nearBtn = host.querySelector('#pg-near');
      var nearV = host.querySelector('#pg-near-v');

      var st = (saved.fsm && states[saved.fsm.state]) ? saved.fsm.state : 'patrol';
      var near = !!(saved.fsm && saved.fsm.near);
      var hp = (saved.fsm && typeof saved.fsm.hp === 'number') ? saved.fsm.hp : 100;
      var bob = 0;              // little idle animation phase

      // The single transition rule — the heart of the FSM.
      function nextState(cur) {
        if (hp <= 35 && cur !== 'flee') return 'flee';
        if (cur === 'flee') return hp > 60 ? 'patrol' : 'flee';   // recovers once healed
        if (cur === 'patrol') return near ? 'chase' : 'patrol';
        if (cur === 'chase') return near ? 'chase' : 'patrol';
        return cur;
      }

      function step() {
        var nxt = nextState(st);
        st = nxt;
      }

      function render() {
        var s = states[st];
        vis.innerHTML =
          '<div style="width:64px;height:64px;border-radius:14px;display:grid;place-items:center;'
          + 'font-family:var(--mono);font-weight:800;font-size:1.6rem;color:#0f1115;'
          + 'background:' + s.colour + ';transform:translateY(' + (Math.sin(bob) * 4).toFixed(1) + 'px)">' + s.letter + '</div>'
          + '<div style="font-family:var(--display);font-weight:800;letter-spacing:.04em;color:' + s.colour + '">' + s.label + '</div>'
          + '<div style="width:160px"><div class="minibar" style="margin:6px 0 2px">'
          + '<i style="width:' + hp + '%;background:' + (hp <= 35 ? 'var(--bad)' : hp <= 60 ? 'var(--warn)' : 'var(--ok)') + '"></i></div>'
          + '<div class="mono dim" style="font-size:.72rem;text-align:center">HP ' + hp + ' / 100</div></div>';
        read.innerHTML = 'State <b>' + s.label + '</b> &nbsp;·&nbsp; nearby <b>' + (near ? 'yes' : 'no')
          + '</b> &nbsp;·&nbsp; HP <b>' + hp + '</b>';
        info.innerHTML = '<h4 style="color:' + s.colour + '">' + s.label + '</h4><p style="margin:0">' + ui.esc(s.desc) + '</p>';
      }

      // gentle idle bob via the shared loop (advances state every ~0.5s of sim time)
      var acc = 0;
      activeTick = function (dt) {
        bob += dt * 4;
        acc += dt;
        if (acc >= 0.4) { acc = 0; step(); }
        render();
        persist();
      };
      activeStill = function () { step(); render(); persist(); };

      function persist() { save({ fsm: { state: st, near: near, hp: hp } }); }

      function syncNear() {
        nearV.textContent = near ? 'yes' : 'no';
        nearBtn.setAttribute('aria-pressed', near ? 'true' : 'false');
        nearBtn.classList.toggle('primary', near);
      }

      nearBtn.addEventListener('click', function () {
        near = !near; syncNear();
        if (!running) { step(); render(); persist(); }
      });
      host.querySelector('#pg-dmg').addEventListener('click', function () {
        hp = clampNum(hp - 25, 0, 100);
        step(); render(); persist();
      });
      host.querySelector('#pg-heal').addEventListener('click', function () {
        hp = 100; step(); render(); persist();
      });

      syncNear();
      render();
      // run the loop so the bob/animation is alive; transitions still respond instantly to clicks
      startLoop();
    }

    // ====================================================================
    //  DEMO 3 — Vectors & transforms
    // ====================================================================
    function buildVecDemo() {
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      var W = 560, H = 300;
      var cx = W / 2, cy = H / 2, scale = 26;   // px per unit

      host.innerHTML =
        '<div class="tool-stage">'
        + '<canvas id="pg-vcv" width="' + (W * dpr) + '" height="' + (H * dpr) + '" '
        + 'style="width:100%;max-width:' + W + 'px;height:auto;border-radius:8px;background:#0f1115" '
        + 'role="img" aria-label="A 2D grid with the origin at the centre. A position vector is drawn from the origin, plus its transformed result."></canvas>'
        + '<div class="legend" style="margin-top:8px">'
        + '<span class="lk axis-x"><span class="sw" style="background:var(--axis-x)"></span> X axis (red)</span>'
        + '<span class="lk axis-y"><span class="sw" style="background:var(--axis-y)"></span> Y axis (green)</span>'
        + '<span class="lk"><span class="sw" style="background:var(--accent)"></span> v &mdash; your vector</span>'
        + '<span class="lk"><span class="sw" style="background:var(--p-E)"></span> r &mdash; result</span>'
        + '</div>'
        + '<div class="tool-controls" style="margin:12px 0 0">'
        + '<div class="ctrl"><label for="pg-vx">v.x <span class="val" id="pg-vx-v"></span></label>'
        + '<input type="range" id="pg-vx" min="-7" max="7" step="0.5"></div>'
        + '<div class="ctrl"><label for="pg-vy">v.y <span class="val" id="pg-vy-v"></span></label>'
        + '<input type="range" id="pg-vy" min="-5" max="5" step="0.5"></div>'
        + '<div class="ctrl"><label for="pg-ang">Rotate <span class="val" id="pg-ang-v"></span></label>'
        + '<input type="range" id="pg-ang" min="0" max="360" step="5"></div>'
        + '<div class="ctrl"><label for="pg-t">Lerp t (v → target) <span class="val" id="pg-t-v"></span></label>'
        + '<input type="range" id="pg-t" min="0" max="1" step="0.05"></div>'
        + '</div>'
        + '<div class="chip-row" style="margin:10px 0 0">'
        + '<button type="button" class="btn sm" id="pg-norm" aria-pressed="false">Normalise (length → 1)</button>'
        + '<button type="button" class="btn sm" id="pg-addb">+ Add v &lang;2, 1&rang;</button>'
        + '<button type="button" class="btn ghost sm" id="pg-vreset">' + ui.icon('reset') + ' Reset</button>'
        + '</div>'
        + '<div class="readout" id="pg-vec-read" style="margin-top:10px"></div>'
        + (compact ? '' :
            '<p class="dim" style="font-size:.86rem;margin:10px 0 0">A vector is just a list of numbers with a direction. '
            + 'Set <b>v</b> with the sliders, then transform it: <b>normalise</b> scales it to length 1 (a pure direction), '
            + '<b>rotate</b> spins it about the origin, and <b>lerp</b> blends from v toward a target by <code>t</code>. '
            + 'These three operations underpin movement, aiming and smooth camera follow in every engine.</p>')
        + '</div>';

      var cv = host.querySelector('#pg-vcv');
      var ctx = cv.getContext('2d');
      ctx.scale(dpr, dpr);

      var v = (saved.vec && saved.vec.v) || { x: 4, y: 2 };
      var ang = (saved.vec && typeof saved.vec.ang === 'number') ? saved.vec.ang : 0;
      var t = (saved.vec && typeof saved.vec.t === 'number') ? saved.vec.t : 0;
      var normalised = !!(saved.vec && saved.vec.norm);
      var target = { x: -3, y: 3 };

      var sx = host.querySelector('#pg-vx'), sy = host.querySelector('#pg-vy');
      var sa = host.querySelector('#pg-ang'), stp = host.querySelector('#pg-t');
      var normBtn = host.querySelector('#pg-norm');
      sx.value = v.x; sy.value = v.y; sa.value = ang; stp.value = t;

      function css(name, fb) { return (getComputedStyle(document.body).getPropertyValue(name) || fb).trim() || fb; }
      function toPx(p) { return { x: cx + p.x * scale, y: cy - p.y * scale }; }

      function rotate(p, deg) {
        var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
        return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
      }
      function lerp(a, b, k) { return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }; }
      function len(p) { return Math.sqrt(p.x * p.x + p.y * p.y); }
      function norm(p) { var l = len(p); return l < 1e-6 ? { x: 0, y: 0 } : { x: p.x / l, y: p.y / l }; }

      // pipeline: v -> (normalise?) -> rotate -> lerp toward target
      function computeResult() {
        var base = normalised ? norm(v) : { x: v.x, y: v.y };
        var rot = rotate(base, ang);
        return lerp(rot, target, t);
      }

      function arrow(from, to, colour, lineW) {
        ctx.strokeStyle = colour; ctx.fillStyle = colour; ctx.lineWidth = lineW || 2.5;
        ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.stroke();
        var a = Math.atan2(to.y - from.y, to.x - from.x), h = 8;
        ctx.beginPath();
        ctx.moveTo(to.x, to.y);
        ctx.lineTo(to.x - h * Math.cos(a - 0.4), to.y - h * Math.sin(a - 0.4));
        ctx.lineTo(to.x - h * Math.cos(a + 0.4), to.y - h * Math.sin(a + 0.4));
        ctx.closePath(); ctx.fill();
      }
      function label(p, text, colour) {
        ctx.fillStyle = colour;
        ctx.font = 'bold 12px ' + css('--mono', 'monospace');
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(text, p.x + 6, p.y - 6);
      }

      function render() {
        ctx.clearRect(0, 0, W, H);
        // grid
        ctx.strokeStyle = '#21252c'; ctx.lineWidth = 1;
        for (var gx = cx % scale; gx < W; gx += scale) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
        for (var gy = cy % scale; gy < H; gy += scale) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
        // axes — X red, Y green, each with a text label
        var axisX = css('--axis-x', '#e5484d'), axisY = css('--axis-y', '#57c065');
        ctx.strokeStyle = axisX; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
        ctx.strokeStyle = axisY;
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
        ctx.fillStyle = axisX; ctx.font = 'bold 11px ' + css('--mono', 'monospace');
        ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.fillText('+X', W - 4, cy - 3);
        ctx.fillStyle = axisY; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText('+Y', cx + 4, 2);

        // target marker
        var tp = toPx(target);
        ctx.strokeStyle = css('--ink-3', '#717c8b'); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(tp.x, tp.y, 5, 0, Math.PI * 2); ctx.stroke();
        label(tp, 'target', css('--ink-3', '#717c8b'));

        // v (your vector) and r (result)
        var base = normalised ? norm(v) : v;
        arrow(toPx({ x: 0, y: 0 }), toPx(base), css('--accent', '#f0a830'), 2.5);
        label(toPx(base), 'v', css('--accent', '#f0a830'));
        var r = computeResult();
        arrow(toPx({ x: 0, y: 0 }), toPx(r), css('--p-E', '#8f86f2'), 3);
        label(toPx(r), 'r', css('--p-E', '#8f86f2'));
        updateRead(base, r);
      }

      function updateRead(base, r) {
        host.querySelector('#pg-vec-read').innerHTML =
          '<span class="axis-x">v</span> = (' + base.x.toFixed(2) + ', ' + base.y.toFixed(2) + ')'
          + ' &nbsp;·&nbsp; |v| = <b>' + len(base).toFixed(2) + '</b>'
          + ' &nbsp;·&nbsp; rotate <b>' + ang + '°</b>'
          + ' &nbsp;·&nbsp; lerp t <b>' + t.toFixed(2) + '</b>'
          + ' &nbsp;&rarr;&nbsp; <span style="color:var(--p-E)">r</span> = (' + r.x.toFixed(2) + ', ' + r.y.toFixed(2) + ')';
      }

      // this demo is static (no animation) — redraw on input only, keep the loop off
      activeTick = null;
      activeStill = render;

      function labels() {
        host.querySelector('#pg-vx-v').textContent = (+sx.value).toFixed(1);
        host.querySelector('#pg-vy-v').textContent = (+sy.value).toFixed(1);
        host.querySelector('#pg-ang-v').textContent = sa.value + '°';
        host.querySelector('#pg-t-v').textContent = (+stp.value).toFixed(2);
      }
      function persist() { save({ vec: { v: v, ang: ang, t: t, norm: normalised } }); }
      function refresh() { labels(); render(); persist(); }

      sx.addEventListener('input', function () { v.x = +sx.value; normalised = false; syncNorm(); refresh(); });
      sy.addEventListener('input', function () { v.y = +sy.value; normalised = false; syncNorm(); refresh(); });
      sa.addEventListener('input', function () { ang = parseInt(sa.value, 10); refresh(); });
      stp.addEventListener('input', function () { t = +stp.value; refresh(); });

      function syncNorm() {
        normBtn.setAttribute('aria-pressed', normalised ? 'true' : 'false');
        normBtn.classList.toggle('primary', normalised);
      }
      normBtn.addEventListener('click', function () { normalised = !normalised; syncNorm(); refresh(); });
      host.querySelector('#pg-addb').addEventListener('click', function () {
        v.x = clampNum(v.x + 2, -7, 7); v.y = clampNum(v.y + 1, -5, 5);
        normalised = false; sx.value = v.x; sy.value = v.y; syncNorm(); refresh();
      });
      host.querySelector('#pg-vreset').addEventListener('click', function () {
        v = { x: 4, y: 2 }; ang = 0; t = 0; normalised = false;
        sx.value = v.x; sy.value = v.y; sa.value = 0; stp.value = 0; syncNorm(); refresh();
      });

      syncNorm();
      refresh();
    }

    // ---- demo switching ------------------------------------------------------
    function showDemo(id) {
      stopLoop();
      activeTick = null; activeStill = null;
      if (id === 'fsm') buildFsmDemo();
      else if (id === 'vec') buildVecDemo();
      else buildLoopDemo();
    }

    function save(patch) {
      var cur = store.toolState(ID) || {};
      var merged = { demo: demo, exId: exId, edits: edits, fps: cur.fps, fsm: cur.fsm, vec: cur.vec };
      if (patch) Object.keys(patch).forEach(function (k) { merged[k] = patch[k]; });
      merged.demo = demo; merged.exId = exId; merged.edits = edits;
      store.setToolState(ID, merged);
    }

    if (!compact) {
      Array.prototype.forEach.call(container.querySelectorAll('#pg-demo button'), function (b) {
        b.addEventListener('click', function () {
          demo = b.getAttribute('data-demo');
          Array.prototype.forEach.call(container.querySelectorAll('#pg-demo button'), function (x) {
            var on = x === b;
            x.classList.toggle('on', on);
            x.setAttribute('aria-selected', on ? 'true' : 'false');
          });
          save();
          showDemo(demo);
        });
      });
    }

    // ---- exercise area (full mode only) -------------------------------------
    if (!compact) {
      var codeEl = container.querySelector('#pg-code');
      var promptEl = container.querySelector('#pg-ex-prompt');
      var outEl = container.querySelector('#pg-out');
      var selEl = container.querySelector('#pg-ex');

      function curEx() { return EXERCISES.filter(function (e) { return e.id === exId; })[0]; }

      function loadExercise() {
        var ex = curEx();
        promptEl.innerHTML = '<b>' + ui.esc(ex.title) + '.</b> ' + ui.line(ex.prompt);
        codeEl.value = (edits[exId] != null) ? edits[exId] : ex.code;
        outEl.textContent = 'Press Run to evaluate.';
        outEl.className = 'code-out';
      }

      function runCode() {
        var src = codeEl.value;
        var logs = [];
        // capture console.log within the sandbox without touching the real one
        var sandboxConsole = {
          log: function () { logs.push(Array.prototype.map.call(arguments, fmt).join(' ')); },
          warn: function () { logs.push('[warn] ' + Array.prototype.map.call(arguments, fmt).join(' ')); },
          error: function () { logs.push('[error] ' + Array.prototype.map.call(arguments, fmt).join(' ')); }
        };
        var result, threw = null;
        try {
          // 'console' is the only injected name; the body may `return` a value.
          var fn = new Function('console', '"use strict";\n' + src);
          result = fn(sandboxConsole);
        } catch (err) {
          threw = err;
        }
        var lines = [];
        if (logs.length) lines.push(logs.join('\n'));
        if (threw) {
          outEl.className = 'code-out';
          outEl.style.color = 'var(--bad)';
          lines.push((logs.length ? '\n' : '') + '✗ ' + (threw && threw.name ? threw.name + ': ' : 'Error: ')
            + (threw && threw.message ? threw.message : String(threw)));
        } else {
          outEl.style.color = '';
          lines.push((logs.length ? '\n' : '') + '→ returned: ' + fmt(result));
        }
        outEl.textContent = lines.join('\n').replace(/^\n/, '');
      }

      function fmt(v) {
        if (typeof v === 'string') return v;
        if (v === undefined) return 'undefined';
        if (v === null) return 'null';
        if (typeof v === 'function') return '[function ' + (v.name || 'anonymous') + ']';
        try { return JSON.stringify(v); } catch (e) { return String(v); }
      }

      selEl.addEventListener('change', function () {
        exId = selEl.value; save(); loadExercise();
      });
      codeEl.addEventListener('input', function () {
        edits[exId] = codeEl.value; save();
      });
      container.querySelector('#pg-run').addEventListener('click', runCode);
      container.querySelector('#pg-reset').addEventListener('click', function () {
        delete edits[exId]; save(); loadExercise();
      });
      // Ctrl/Cmd+Enter runs, like a real code editor
      codeEl.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runCode(); }
      });

      loadExercise();
    }

    // initial demo paint
    showDemo(demo);

    // ---- the only correct way to leave: cancel EVERYTHING -------------------
    return function dispose() {
      stopLoop();
      timers.forEach(function (t) { clearTimeout(t); });
      timers.length = 0;
      activeTick = null; activeStill = null;
      container.innerHTML = '';
    };
  }

  GDA.tools.register({
    id: ID,
    icon: 'code',
    title: 'Code-Concept Playground',
    blurb: 'Live, honest JavaScript demos of engine-neutral concepts: a delta-time game loop you can lag on purpose, a Patrol/Chase/Flee state machine, and vectors you can normalise, rotate and lerp. Then fix or extend short snippets and run them in the browser. It runs real JS to teach the ideas — it is not a game engine.',
    category: 'Code',
    mount: mount
  });
})(typeof window !== 'undefined' ? window : this);
