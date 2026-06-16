/* =============================================================================
 * Game Dev Academy — Tools view. Grid of all interactive concept tools,
 * or a single mounted tool when /tools/:tool is routed.
 * ========================================================================== */
(function (global) {
  'use strict';
  var GDA = global.GDA = global.GDA || {};
  GDA.views = GDA.views || {};
  var ui = GDA.ui;

  GDA.views.tools = function (outlet, params) {
    var reg = GDA.tools.registry;
    if (params && params.tool) {
      var t = GDA.tools.byId(params.tool);
      if (!t) { outlet.innerHTML = '<div class="empty"><h2>Unknown tool</h2><a class="btn" href="#/tools">Back to tools</a></div>'; return; }
      outlet.innerHTML = '<div class="crumbs" style="font-family:var(--mono);font-size:.76rem;color:var(--ink-3);margin-bottom:10px">'
        + '<a href="#/tools">Interactive tools</a> › <span>' + ui.esc(t.title) + '</span></div>'
        + '<div class="page-head"><div class="kicker">Interactive tool · illustrative</div><h1>' + ui.esc(t.title) + '</h1>'
        + '<p class="lede">' + ui.esc(t.blurb) + '</p></div>'
        + '<div class="tool-frame" id="tool-host"></div>';
      var host = outlet.querySelector('#tool-host');
      try { var dispose = t.mount(host, {}); GDA.addDisposable(dispose); }
      catch (e) { host.innerHTML = '<div class="empty">This tool failed to start. <code>' + ui.esc(e.message) + '</code></div>'; console.error(e); }
      return;
    }

    var html = '<div class="page-head"><div class="kicker">Learn by doing</div><h1>Interactive tools</h1>'
      + '<p class="lede">Functional concept-teachers — every one is real and illustrative. None fakes a game engine or Blender output; they teach the ideas the lessons reference, and several save your work on this device.</p></div>'
      + '<div class="grid cols-auto">';
    reg.forEach(function (t) {
      html += '<a class="card tool-card" href="#/tools/' + t.id + '">'
        + '<div class="ti">' + ui.icon(t.icon || 'sliders') + '</div>'
        + '<h3 style="margin:0">' + ui.esc(t.title) + '</h3>'
        + '<p class="dim" style="margin:0;font-size:.9rem">' + ui.esc(t.blurb) + '</p></a>';
    });
    html += '</div>';
    if (!reg.length) html += '<div class="empty">Tools are loading.</div>';
    outlet.innerHTML = html;
  };
})(typeof window !== 'undefined' ? window : this);
