// Game Dev Academy — data integrity checker.
// Loads pillars.js + every data/lessons/*.js + reference data into a sandbox
// global and validates the schema, ids, counts and cross-references.
// Dev-only: eval is safe here (our own static files, never user input).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const BASE = dirname(fileURLToPath(import.meta.url));
const sandbox = { window: undefined };
sandbox.window = sandbox;            // files use (typeof window !== 'undefined' ? window : globalThis)
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);

const problems = [], warnings = [];

function load(rel) {
  const p = join(BASE, rel);
  if (!existsSync(p)) { problems.push(`MISSING FILE: ${rel}`); return; }
  try { vm.runInContext(readFileSync(p, 'utf8'), ctx, { filename: rel }); }
  catch (e) { problems.push(`PARSE ERROR in ${rel}: ${e.message}`); }
}

load('data/pillars.js');
const lessonDir = join(BASE, 'data/lessons');
const lessonFiles = existsSync(lessonDir) ? readdirSync(lessonDir).filter(f => f.endsWith('.js')).sort() : [];
for (const f of lessonFiles) load('data/lessons/' + f);
['glossary', 'hotkeys', 'projects', 'milestones'].forEach(n => load(`data/${n}.js`));

const D = sandbox.GDA_DATA || {};
const pillars = D.pillars || [], phases = D.phases || [], modules = D.modules || [], lessons = D.lessons || [];
const TOOLS = ['pipeline', 'gdd', 'scope', 'coreloop', 'blockout', 'achieve', 'kanban', 'assetcheck', 'playground', 'narrative'];
const DIFF = ['Beginner', 'Intermediate', 'Advanced'], MODE = ['knowledge', 'handson'];

const phaseIds = new Set(phases.map(p => p.id));
const moduleIds = new Set(modules.map(m => m.id));
const pillarIds = new Set(pillars.map(p => p.id));
const lessonIds = new Set(lessons.map(l => l.id));

phases.forEach(p => { if (!pillarIds.has(p.pillarId)) problems.push(`phase ${p.id}: unknown pillarId ${p.pillarId}`); });
modules.forEach(m => { if (!phaseIds.has(m.phaseId)) problems.push(`module ${m.id}: unknown phaseId ${m.phaseId}`); });

const seen = new Set();
const wc = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;

for (const L of lessons) {
  const id = L.id || '(no id)';
  if (seen.has(L.id)) problems.push(`duplicate lesson id: ${L.id}`); seen.add(L.id);
  ['id', 'title', 'pillarId', 'phaseId', 'moduleId', 'difficulty', 'mode', 'concept', 'task'].forEach(k => {
    if (!L[k]) problems.push(`${id}: missing ${k}`);
  });
  if (L.pillarId && !pillarIds.has(L.pillarId)) problems.push(`${id}: unknown pillarId ${L.pillarId}`);
  if (L.phaseId && !phaseIds.has(L.phaseId)) problems.push(`${id}: unknown phaseId ${L.phaseId}`);
  if (L.moduleId && !moduleIds.has(L.moduleId)) problems.push(`${id}: unknown moduleId ${L.moduleId}`);
  if (L.difficulty && !DIFF.includes(L.difficulty)) problems.push(`${id}: bad difficulty ${L.difficulty}`);
  if (L.mode && !MODE.includes(L.mode)) problems.push(`${id}: bad mode ${L.mode}`);
  if (L.diagram && !TOOLS.includes(L.diagram)) problems.push(`${id}: unknown diagram tool ${L.diagram}`);
  if (!Array.isArray(L.success) || L.success.length < 2) problems.push(`${id}: success needs ≥2 items`);
  if (!Array.isArray(L.skills) || L.skills.length < 2) problems.push(`${id}: skills needs ≥2 items`);
  if (!Array.isArray(L.quiz) || L.quiz.length < 2) problems.push(`${id}: quiz needs ≥2 items`);
  if (!Array.isArray(L.tags) || L.tags.length < 3) warnings.push(`${id}: tags <3`);
  (L.quiz || []).forEach((q, i) => { if (!q.q || !q.a) problems.push(`${id}: quiz[${i}] missing q/a`); });
  const n = wc(L.concept);
  if (n < 140) warnings.push(`${id}: concept short (${n} words)`);
  if (n > 540) warnings.push(`${id}: concept long (${n} words)`);
  // balanced ``` fences in any prose-rendered field
  [L.concept, L.task, ...(L.quiz || []).map(q => q && q.a)].forEach(s => {
    const fences = (String(s || '').match(/```/g) || []).length;
    if (fences % 2 !== 0) problems.push(`${id}: unbalanced \`\`\` code fence`);
  });
  // cross-reference check — pillars 0,a–f
  const refs = String(JSON.stringify([L.concept, L.task, L.steps, L.success, L.prereq, L.goDeeper, L.simplified, L.quiz]))
    .match(/\[\[[0a-f]\d-\d{1,2}\]\]/g) || [];
  refs.forEach(r => { const t = r.slice(2, -2); if (!lessonIds.has(t)) warnings.push(`${id}: dead cross-ref [[${t}]]`); });
}

const byPillar = {};
lessons.forEach(L => { byPillar[L.pillarId] = (byPillar[L.pillarId] || 0) + 1; });

modules.forEach(m => { if (!lessons.some(L => L.moduleId === m.id)) warnings.push(`module ${m.id} has NO lessons yet`); });

// project relatedLessons + milestone-target sanity (dead refs are warnings)
(D.projects || []).forEach(p => (p.relatedLessons || []).forEach(r => { if (!lessonIds.has(r)) warnings.push(`project ${p.id}: dead relatedLesson ${r}`); }));

console.log('=== Game Dev Academy — data check ===');
console.log(`pillars=${pillars.length} phases=${phases.length} modules=${modules.length} lessons=${lessons.length}`);
console.log('per pillar:', pillars.map(p => `${p.id}:${byPillar[p.id] || 0}`).join(' '));
console.log(`glossary=${(D.glossary || []).length} hotkeys=${(D.hotkeys || []).length} projects=${(D.projects || []).length} milestones=${(D.milestones || []).length}`);
console.log(`lesson files loaded: ${lessonFiles.length}`);
if (warnings.length) { console.log(`\n--- ${warnings.length} WARNINGS ---`); console.log(warnings.join('\n')); }
console.log(problems.length ? `\n*** ${problems.length} PROBLEMS ***\n` + problems.join('\n') : '\nALL CHECKS PASSED ✓');
process.exit(problems.length ? 1 : 0);
