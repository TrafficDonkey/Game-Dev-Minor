/* =============================================================================
 * Game Dev Academy — Store
 * localStorage persistence + pub/sub + lossless export/import. Everything lives
 * under one key so a single JSON file round-trips the entire profile.
 * Runs over file:// — no fetch, no modules.
 * ========================================================================== */
(function (global) {
  'use strict';
  var KEY = 'gameacademy.v1';

  function defaults() {
    return {
      version: 1,
      prefs: { theme: 'dark', colorblind: false, reduceMotion: false, pillarFilter: 'all', units: 'metric' },
      lessons: {},      // id -> { done, task:bool, quiz:{i:bool}, notes }
      projects: {},     // projectId -> { check:{i:bool}, notes }
      milestones: {},   // id -> { earned, earnedAt }
      tools: {},        // toolId -> arbitrary saved state (e.g. saved mood boards, plans)
      streak: { last: null, days: [] }
    };
  }

  function deepMerge(base, over) {
    if (over == null) return base;
    Object.keys(over).forEach(function (k) {
      if (over[k] && typeof over[k] === 'object' && !Array.isArray(over[k]) && base[k] && typeof base[k] === 'object') {
        deepMerge(base[k], over[k]);
      } else { base[k] = over[k]; }
    });
    return base;
  }

  var state = defaults();
  var listeners = [];
  var saveTimer = null;

  function load() {
    try { var raw = localStorage.getItem(KEY); if (raw) deepMerge(state, JSON.parse(raw)); }
    catch (e) { console.warn('Store load failed', e); }
    return state;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('Store save failed', e); } }
  function commit(event) { if (saveTimer) clearTimeout(saveTimer); saveTimer = setTimeout(save, 120); emit(event || 'change'); }
  function emit(event) { listeners.forEach(function (l) { try { l(event, state); } catch (e) {} }); }
  function on(cb) { listeners.push(cb); return function () { listeners = listeners.filter(function (x) { return x !== cb; }); }; }

  /* ---- lessons ---- */
  function lesson(id) { return state.lessons[id] || (state.lessons[id] = { done: false, task: false, quiz: {}, notes: '' }); }
  function setLessonDone(id, done) { lesson(id).done = !!done; if (done) markPracticeToday(); commit('lessons'); }
  function setTaskDone(id, done) { lesson(id).task = !!done; if (done) markPracticeToday(); commit('lessons'); }
  function setQuiz(id, i, val) { lesson(id).quiz[i] = !!val; commit('lessons'); }
  function setNotes(id, txt) { lesson(id).notes = txt; commit('lessons'); }
  function isDone(id) { return !!(state.lessons[id] && state.lessons[id].done); }
  function lessonDoneCount(ids) { return (ids || []).filter(isDone).length; }

  /* ---- projects ---- */
  function project(id) { return state.projects[id] || (state.projects[id] = { check: {}, notes: '' }); }
  function toggleProjectCheck(id, i, val) { project(id).check[i] = !!val; markPracticeToday(); commit('projects'); }
  function setProjectNotes(id, txt) { project(id).notes = txt; commit('projects'); }

  /* ---- tools (saved widget state: mood boards, space plans, palettes) ---- */
  function toolState(id) { return state.tools[id] || (state.tools[id] = {}); }
  function setToolState(id, obj) { state.tools[id] = obj; commit('tools'); }

  /* ---- prefs ---- */
  function setPref(k, v) { state.prefs[k] = v; commit('prefs'); }

  /* ---- milestones ---- */
  function setMilestone(id, earned) {
    var cur = state.milestones[id];
    if (earned && (!cur || !cur.earned)) { state.milestones[id] = { earned: true, earnedAt: Date.now() }; commit('milestones'); return true; }
    if (!earned && cur && cur.earned) { state.milestones[id] = { earned: false, earnedAt: null }; commit('milestones'); }
    return false;
  }
  function milestoneEarned(id) { return !!(state.milestones[id] && state.milestones[id].earned); }

  /* ---- streak ---- */
  function markPracticeToday() {
    var today = new Date().toISOString().slice(0, 10);
    if (state.streak.last === today) return;
    state.streak.last = today;
    if (state.streak.days.indexOf(today) < 0) state.streak.days.push(today);
    if (state.streak.days.length > 800) state.streak.days = state.streak.days.slice(-800);
    commit('streak');
  }
  function currentStreak() {
    var days = state.streak.days.slice().sort();
    if (!days.length) return 0;
    var streak = 0, d = new Date();
    for (;;) {
      var iso = d.toISOString().slice(0, 10);
      if (days.indexOf(iso) >= 0) { streak++; d.setDate(d.getDate() - 1); }
      else if (streak === 0 && iso === new Date().toISOString().slice(0, 10)) { d.setDate(d.getDate() - 1); }
      else break;
    }
    return streak;
  }

  /* ---- export / import / reset ---- */
  function exportJSON() { return JSON.stringify(state, null, 2); }
  function importJSON(text) {
    var parsed = JSON.parse(text);
    var fresh = defaults();
    deepMerge(fresh, parsed);
    state = fresh; save(); emit('import'); return true;
  }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} state = defaults(); emit('reset'); }

  global.GDA = global.GDA || {};
  global.GDA.store = {
    KEY: KEY,
    load: load, save: save, commit: commit, on: on, emit: emit,
    get state() { return state; },
    lesson: lesson, setLessonDone: setLessonDone, setTaskDone: setTaskDone, setQuiz: setQuiz, setNotes: setNotes,
    isDone: isDone, lessonDoneCount: lessonDoneCount,
    project: project, toggleProjectCheck: toggleProjectCheck, setProjectNotes: setProjectNotes,
    toolState: toolState, setToolState: setToolState,
    setPref: setPref, setMilestone: setMilestone, milestoneEarned: milestoneEarned,
    markPracticeToday: markPracticeToday, currentStreak: currentStreak,
    exportJSON: exportJSON, importJSON: importJSON, reset: reset
  };
})(typeof window !== 'undefined' ? window : this);
