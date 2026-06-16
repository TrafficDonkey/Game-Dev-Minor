/* =============================================================================
 * Game Dev Academy — curriculum access helpers (shared by every view).
 * Lessons are registered into GDA_DATA.lessons by the data/lessons/*.js modules
 * and ordered globally by `seq`. Pillars/phases/modules come from data/pillars.js.
 *
 * `seq` is derived if a lesson omits it: pillarOrder*100000 + phaseIndex*1000 +
 * lessonIndex*10, where lessonIndex is parsed from the numeric suffix of the id.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};

  function data() { return global.GDA_DATA || {}; }
  function pillars() { return (data().pillars || []).slice().sort(by('order')); }
  function pillar(id) { return pillars().filter(function (p) { return p.id === id; })[0] || null; }
  function phases() { return (data().phases || []).slice().sort(by('order')); }
  function phase(id) { return phases().filter(function (p) { return p.id === id; })[0] || null; }
  function phasesOf(pillarId) { return phases().filter(function (p) { return p.pillarId === pillarId; }); }
  function modules() { return data().modules || []; }
  function modulesOf(phaseId) { return modules().filter(function (m) { return m.phaseId === phaseId; }); }
  function module(id) { return modules().filter(function (m) { return m.id === id; })[0] || null; }

  function by(k) { return function (a, b) { return (a[k] || 0) - (b[k] || 0); }; }

  function pillarIndex(id) { var p = pillar(id); return p ? p.order : 0; }
  function phaseIndexWithin(ph) { var ps = phasesOf(ph.pillarId); return Math.max(0, ps.map(function (x) { return x.id; }).indexOf(ph.id)); }

  function computeSeq(L) {
    if (typeof L.seq === 'number') return L.seq;
    var ph = phase(L.phaseId);
    var pIdx = ph ? pillarIndex(ph.pillarId) : 0;
    var phIdx = ph ? phaseIndexWithin(ph) : 0;
    var m = String(L.id).match(/(\d+)\s*$/);
    var lIdx = m ? parseInt(m[1], 10) : 0;
    return pIdx * 100000 + phIdx * 1000 + lIdx * 10;
  }

  // All lessons, globally ordered by seq (derived if absent).
  function lessons() {
    return (data().lessons || []).map(function (L) {
      if (typeof L.seq !== 'number') L.seq = computeSeq(L);
      return L;
    }).slice().sort(by('seq'));
  }
  function lesson(id) { return (data().lessons || []).filter(function (L) { return L.id === id; })[0] || null; }
  function lessonsOf(phaseId) { return lessons().filter(function (L) { return L.phaseId === phaseId; }); }
  function lessonsOfPillar(pillarId) {
    var ids = phasesOf(pillarId).map(function (p) { return p.id; });
    return lessons().filter(function (L) { return ids.indexOf(L.phaseId) >= 0; });
  }
  function lessonsOfModule(moduleId) { return lessons().filter(function (L) { return L.moduleId === moduleId; }); }

  function index(id) { var all = lessons(); for (var i = 0; i < all.length; i++) if (all[i].id === id) return i; return -1; }
  function neighbours(id) { var all = lessons(), i = index(id); return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null }; }

  function done(id) { return GDA.store.isDone(id); }
  function totals() {
    var all = lessons(), d = all.filter(function (L) { return done(L.id); }).length;
    return { total: all.length, done: d, pct: all.length ? Math.round(d / all.length * 100) : 0 };
  }
  function phaseProgress(phaseId) {
    var ls = lessonsOf(phaseId), d = ls.filter(function (L) { return done(L.id); }).length;
    return { total: ls.length, done: d, pct: ls.length ? Math.round(d / ls.length * 100) : 0 };
  }
  function pillarProgress(pillarId) {
    var ls = lessonsOfPillar(pillarId), d = ls.filter(function (L) { return done(L.id); }).length;
    return { total: ls.length, done: d, pct: ls.length ? Math.round(d / ls.length * 100) : 0 };
  }

  // Distinct skills banked across completed lessons (the "skills learned" tally).
  function skillsLearned() {
    var set = {};
    lessons().forEach(function (L) {
      if (done(L.id)) (L.skills || []).forEach(function (s) { set[s.toLowerCase().trim()] = true; });
    });
    return Object.keys(set).length;
  }
  function skillsTotal() {
    var set = {};
    lessons().forEach(function (L) { (L.skills || []).forEach(function (s) { set[s.toLowerCase().trim()] = true; }); });
    return Object.keys(set).length;
  }

  // The "give me a drill" pool: each lesson's task, tagged with its lesson.
  function allDrills() {
    return lessons().filter(function (L) { return L.task; }).map(function (L) { return { text: L.task, lesson: L }; });
  }

  // Next unfinished lesson in global order (for "continue learning").
  function nextUp() {
    var all = lessons();
    for (var i = 0; i < all.length; i++) if (!done(all[i].id)) return all[i];
    return all[0] || null;
  }

  GDA.curric = {
    pillars: pillars, pillar: pillar, phases: phases, phase: phase, phasesOf: phasesOf,
    modules: modules, modulesOf: modulesOf, module: module,
    lessons: lessons, lesson: lesson, lessonsOf: lessonsOf, lessonsOfPillar: lessonsOfPillar, lessonsOfModule: lessonsOfModule,
    index: index, neighbours: neighbours, totals: totals, phaseProgress: phaseProgress, pillarProgress: pillarProgress,
    skillsLearned: skillsLearned, skillsTotal: skillsTotal, allDrills: allDrills, nextUp: nextUp,
    glossary: function () { return data().glossary || []; },
    glossaryTerm: function (t) { return (data().glossary || []).filter(function (g) { return g.term.toLowerCase() === String(t).toLowerCase(); })[0] || null; },
    hotkeys: function () { return data().hotkeys || []; },
    projects: function () { return data().projects || []; },
    project: function (id) { return (data().projects || []).filter(function (p) { return p.id === id; })[0] || null; },
    milestones: function () { return data().milestones || []; },
    tools: function () { return (GDA.tools && GDA.tools.registry) || []; }
  };
})(typeof window !== 'undefined' ? window : this);
