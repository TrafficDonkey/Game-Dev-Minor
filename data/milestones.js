/* =============================================================================
 * Game Dev Academy — milestone ladder (titles/descriptions).
 * Earn conditions live in js/milestones.js (they reference progress).
 * The ladder mirrors the brief: from understanding the pipeline to a playable
 * vertical slice and an achievement-portfolio plan ready for day one.
 * ========================================================================== */
;(function (root) {
  var D = root.GDA_DATA = root.GDA_DATA || {};
  D.milestones = [
    { id: 'ms-pipeline', title: 'Pipeline understood',
      desc: 'You can explain how the five role-tracks interlock — what each does and what it hands to the next — the foundation of being a versatile, solo-capable dev.' },
    { id: 'ms-gdd', title: 'First GDD drafted',
      desc: 'You drafted a full Game Design Document — the minor’s central deliverable and the team’s shared source of truth.' },
    { id: 'ms-scope', title: 'First feasible scope locked',
      desc: 'You scoped a concept an eight-person team could actually ship in a semester, and cut the red-flag features. Scope discipline is the difference between a finished game and a graveyard.' },
    { id: 'ms-worldbible', title: 'First worldbuilding bible',
      desc: 'You built a small, internally consistent world and documented it — and proved it with a playable quest.' },
    { id: 'ms-blockout', title: 'First blocked-out level',
      desc: 'You greyboxed a level with pacing, flow and sightlines — teaching the player through space, not text.' },
    { id: 'ms-encounter', title: 'First fair encounter',
      desc: 'You designed an enemy or encounter that is hard but fair — readable, counterable, and the player’s own fault when they lose.' },
    { id: 'ms-asset', title: 'First game-ready exported asset',
      desc: 'You made a real-time-ready 3D asset — clean topology, UVs and PBR — and exported it to run in an engine, not just render.' },
    { id: 'ms-mechanic', title: 'First scripted mechanic',
      desc: 'You implemented a mechanic in code (and ideally tested it) — the moment a design becomes something you can actually play.' },
    { id: 'ms-slice', title: 'First playable vertical slice',
      desc: 'You built a tiny slice that touches all five tracks — level, asset, mechanic, encounter and story — integrated and playable. The whole pipeline, proven.' },
    { id: 'ms-portfolio', title: 'Achievement-portfolio plan ready',
      desc: 'You mapped your five tracks onto the gold/platinum achievement structure and have a plan for the grade — ready for day one of the minor.' }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
