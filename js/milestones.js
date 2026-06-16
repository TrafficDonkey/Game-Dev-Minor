/* =============================================================================
 * Game Dev Academy — milestone evaluator. Conditions live here (they reference
 * progress); titles/descriptions live in data/milestones.js.
 * Re-run after any lesson/task/project change; earns badges idempotently.
 * Each condition is satisfied by a key lesson OR by completing its project, so
 * either path up the ladder counts. Tolerant of lessons/projects not yet loaded.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};

  function C() { return GDA.curric; }
  function done(id) { return GDA.store.isDone(id); }
  function anyDone(ids) { return ids.some(done); }
  function projectComplete(pid) {
    var p = C().project(pid); if (!p || !p.checklist || !p.checklist.length) return false;
    var st = GDA.store.project(pid);
    return p.checklist.every(function (_, i) { return st.check[i]; });
  }

  var COND = {
    'ms-pipeline':   function () { return done('00-04') || projectComplete('p1'); },
    'ms-scope':      function () { return done('04-01') || projectComplete('p2'); },
    'ms-gdd':        function () { return anyDone(['b3-01', 'f0-02']) || projectComplete('p3'); },
    'ms-worldbible': function () { return done('a2-03') || projectComplete('p4'); },
    'ms-blockout':   function () { return done('c1-01') || projectComplete('p7'); },
    'ms-encounter':  function () { return done('c2-03') || projectComplete('p8'); },
    'ms-asset':      function () { return anyDone(['d5-03', 'd5-06']) || projectComplete('p9') || projectComplete('p10'); },
    'ms-mechanic':   function () { return anyDone(['e2-03', 'e2-08']) || projectComplete('p11'); },
    'ms-slice':      function () { return anyDone(['f1-04', 'f1-05']) || projectComplete('p12'); },
    'ms-portfolio':  function () { return anyDone(['f2-01', 'f2-02']); }
  };

  function evaluate() {
    if (!GDA.curric || !GDA.store) return;
    var newly = [];
    Object.keys(COND).forEach(function (id) {
      var should = false; try { should = !!COND[id](); } catch (e) {}
      var earnedNow = GDA.store.setMilestone(id, should);
      if (earnedNow) newly.push(id);
    });
    if (newly.length && GDA.ui) {
      var m = C().milestones().filter(function (x) { return x.id === newly[0]; })[0];
      GDA.ui.toast('★ Milestone earned: ' + (m ? m.title : newly[0]));
    }
  }

  GDA.milestones = { evaluate: evaluate, conditions: COND };
})(typeof window !== 'undefined' ? window : this);
