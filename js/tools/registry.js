/* =============================================================================
 * Game Dev Academy — interactive-tool registry.
 * Each tool file calls GDA.tools.register({ id, title, blurb, icon, category,
 * mount(container, opts) -> disposeFn }). Tools are concept-teachers: real,
 * functional, illustrative — never faked software output.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  var registry = [], byId = {};
  GDA.tools = {
    registry: registry,
    register: function (def) { if (!byId[def.id]) { registry.push(def); byId[def.id] = def; } },
    byId: function (id) { return byId[id] || null; }
  };
})(typeof window !== 'undefined' ? window : this);
