/* =============================================================================
 * Game Dev Academy — Lesson view. Renders one lesson from the locked
 * schema: concept → (steps) → task → success → skills → (simplify/deeper) →
 * quiz → notes, with completion + prev/next. May embed an interactive tool.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  GDA.views = GDA.views || {};
  var ui = GDA.ui, store = GDA.store, C = GDA.curric;

  function badges(L) {
    return ui.diffBadge(L.difficulty) + ui.modeBadge(L.mode)
      + '<span class="est mono">~' + (L.estMinutes || 20) + ' min</span>';
  }

  GDA.views.lesson = function (outlet, params) {
    var L = C.lesson(params.id);
    if (!L) {
      outlet.innerHTML = '<div class="empty"><h2>Lesson not found</h2>'
        + '<p>The lesson <code>' + ui.esc(params.id) + '</code> isn’t in the curriculum yet. '
        + '<a class="btn" href="#/curriculum">Browse the curriculum</a></p></div>';
      return;
    }
    var ph = C.phase(L.phaseId), pl = ph ? C.pillar(ph.pillarId) : null, mod = C.module(L.moduleId);
    var ls = store.lesson(L.id);

    var html = '<article class="lesson">';
    // breadcrumbs
    html += '<div class="crumbs">'
      + '<a href="#/curriculum">Curriculum</a><span>›</span>'
      + (pl ? '<a href="#/curriculum">' + ui.esc(pl.short) + '</a><span>›</span>' : '')
      + (ph ? '<span>' + ui.esc(ph.title) + '</span>' : '')
      + (mod ? '<span>›</span><span>' + ui.esc(mod.title) + '</span>' : '')
      + '</div>';

    html += '<h1>' + ui.esc(L.title) + '</h1>';
    html += '<div class="meta">' + badges(L) + '</div>';

    if (L.prereq) {
      html += '<div class="callout prereq"><span class="ct">Be comfortable with</span>' + ui.line(L.prereq) + '</div>';
    }

    // Concept
    html += '<section class="block concept"><h2><span class="bi">' + ui.icon('book') + '</span>The idea</h2>'
      + '<div class="concept-body">' + ui.prose(L.concept) + '</div></section>';

    // Embedded interactive demo (a real concept tool — never faked software output)
    if (L.diagram) {
      html += '<section class="block"><h2><span class="bi">' + ui.icon('sliders') + '</span>Try it</h2>'
        + '<div class="tool-frame" id="lesson-embed"></div>'
        + '<p class="dim" style="font-size:.84rem;margin-top:8px">Interactive concept tool — illustrative, it teaches the idea but does not run a game engine or Blender. '
        + '<a href="#/tools/' + ui.esc(L.diagram) + '">Open the full tool ›</a></p></section>';
    }

    // Steps (hands-on click-path)
    if (L.steps && L.steps.length) {
      var label = L.mode === 'handson' ? 'Step by step' : 'Walk it through';
      html += '<section class="block steps"><h2><span class="bi">' + ui.icon('compass') + '</span>' + label + '</h2>'
        + '<ol class="steps-list">' + L.steps.map(function (s) { return '<li>' + ui.line(s) + '</li>'; }).join('') + '</ol></section>';
    }

    // Task
    html += '<section class="block task"><h2><span class="bi">' + ui.icon('target') + '</span>Your task</h2>'
      + '<div class="task-card"><div class="task-do">'
      + '<button class="cb-task" role="checkbox" aria-checked="' + (ls.task ? 'true' : 'false') + '" aria-label="Mark task done"></button>'
      + '<div class="td-body">' + ui.prose(L.task) + '</div></div></div></section>';

    // Success criteria
    if (L.success && L.success.length) {
      html += '<section class="block success"><h2><span class="bi">' + ui.icon('check') + '</span>You’ve got it when…</h2>'
        + '<ul class="success-list">' + L.success.map(function (s) { return '<li>' + ui.line(s) + '</li>'; }).join('') + '</ul></section>';
    }

    // Skills
    if (L.skills && L.skills.length) {
      html += '<section class="block skills"><h2><span class="bi">' + ui.icon('bolt') + '</span>What this adds</h2>'
        + '<div class="skill-chips">' + L.skills.map(function (s) { return '<span class="skill-chip">' + ui.esc(s) + '</span>'; }).join('') + '</div></section>';
    }

    // Simplify / go-deeper honesty callouts
    if (L.simplified) html += '<div class="callout simplify"><span class="ct">Where this is simplified</span>' + ui.line(L.simplified) + '</div>';
    if (L.goDeeper) html += '<div class="callout deeper"><span class="ct">Go deeper</span>' + ui.line(L.goDeeper) + '</div>';

    // Quiz
    if (L.quiz && L.quiz.length) {
      html += '<section class="block"><h2><span class="bi">' + ui.icon('info') + '</span>Quick check</h2>';
      L.quiz.forEach(function (q, i) {
        var got = ls.quiz[i];
        html += '<div class="quiz-item" data-qi="' + i + '">'
          + '<div class="quiz-q"><span class="qn">Q' + (i + 1) + '</span><span>' + ui.line(q.q) + '</span><span class="quiz-toggle">reveal</span></div>'
          + '<div class="quiz-a">' + ui.prose(q.a)
          + '<label class="quiz-check"><input type="checkbox" class="qgot"' + (got ? ' checked' : '') + '> I got this right</label>'
          + '</div></div>';
      });
      html += '</section>';
    }

    // Notes
    html += '<section class="block notes"><h2><span class="bi">' + ui.icon('pencil') + '</span>Your notes</h2>'
      + '<textarea placeholder="Jot what clicked, what to revisit, links to your boards / plans / renders…">' + ui.esc(ls.notes || '') + '</textarea></section>';

    // Actions
    var n = C.neighbours(L.id);
    html += '<div class="lesson-actions">'
      + '<button class="complete-toggle' + (ls.done ? ' done' : '') + '">' + ui.icon('check')
      + '<span>' + (ls.done ? 'Completed' : 'Mark complete') + '</span></button>'
      + '<div class="prevnext">'
      + (n.prev ? '<a class="pn" href="#/lesson/' + n.prev.id + '"><span class="pn-k">‹ Prev</span><span class="pn-t">' + ui.esc(n.prev.title) + '</span></a>' : '')
      + (n.next ? '<a class="pn" href="#/lesson/' + n.next.id + '"><span class="pn-k">Next ›</span><span class="pn-t">' + ui.esc(n.next.title) + '</span></a>' : '')
      + '</div></div>';

    html += '</article>';
    outlet.innerHTML = html;

    // ---- wire interactions ----
    if (L.diagram && GDA.tools && GDA.tools.byId(L.diagram)) {
      var host = outlet.querySelector('#lesson-embed');
      try { var dispose = GDA.tools.byId(L.diagram).mount(host, { compact: true }); GDA.addDisposable(dispose); } catch (e) { console.error(e); }
    }

    var taskBtn = outlet.querySelector('.cb-task');
    if (taskBtn) taskBtn.addEventListener('click', function () {
      var v = !store.lesson(L.id).task; store.setTaskDone(L.id, v);
      taskBtn.setAttribute('aria-checked', v ? 'true' : 'false');
      if (GDA.milestones) GDA.milestones.evaluate();
    });

    Array.prototype.forEach.call(outlet.querySelectorAll('.quiz-item'), function (item) {
      var qi = parseInt(item.getAttribute('data-qi'), 10);
      item.querySelector('.quiz-q').addEventListener('click', function () { item.classList.toggle('open'); });
      var got = item.querySelector('.qgot');
      if (got) got.addEventListener('change', function () { store.setQuiz(L.id, qi, got.checked); });
    });

    var ta = outlet.querySelector('.notes textarea');
    if (ta) ta.addEventListener('input', function () { store.setNotes(L.id, ta.value); });

    var ct = outlet.querySelector('.complete-toggle');
    ct.addEventListener('click', function () {
      var v = !store.lesson(L.id).done; store.setLessonDone(L.id, v);
      ct.classList.toggle('done', v);
      ct.querySelector('span').textContent = v ? 'Completed' : 'Mark complete';
      if (v) ui.toast('Lesson complete — ' + C.skillsLearned() + ' skills banked');
      if (GDA.milestones) GDA.milestones.evaluate();
    });
  };
})(typeof window !== 'undefined' ? window : this);
