/* =============================================================================
 * Game Dev Academy — tiny hash router (#/path/:param?query)
 * ========================================================================== */
(function (global) {
  'use strict';
  var routes = [], notFound = null, current = null, currentQuery = {};

  function add(pattern, handler) {
    var keys = [];
    var rx = new RegExp('^' + pattern.replace(/:[^/]+/g, function (m) { keys.push(m.slice(1)); return '([^/]+)'; }) + '$');
    routes.push({ rx: rx, keys: keys, handler: handler });
    return this;
  }
  function setNotFound(fn) { notFound = fn; }
  function parse() { return location.hash.replace(/^#/, '') || '/'; }
  function parseQuery(qs) {
    var out = {};
    (qs || '').split('&').forEach(function (pair) {
      if (!pair) return; var kv = pair.split('='); out[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
    });
    return out;
  }
  function resolve() {
    var full = parse(), qi = full.indexOf('?');
    var path = qi >= 0 ? full.slice(0, qi) : full;
    currentQuery = qi >= 0 ? parseQuery(full.slice(qi + 1)) : {};
    for (var i = 0; i < routes.length; i++) {
      var m = path.match(routes[i].rx);
      if (m) {
        var params = {};
        routes[i].keys.forEach(function (k, idx) { params[k] = decodeURIComponent(m[idx + 1]); });
        current = path; routes[i].handler(params, path); return;
      }
    }
    if (notFound) notFound(path);
  }
  function navigate(path) { if (('#' + path) === location.hash) resolve(); else location.hash = path; }
  function start() { window.addEventListener('hashchange', resolve); resolve(); }

  global.GDA = global.GDA || {};
  global.GDA.router = { add: add, setNotFound: setNotFound, navigate: navigate, start: start,
    current: function () { return current; }, query: function () { return currentQuery; } };
})(typeof window !== 'undefined' ? window : this);
