// three.js backgrounds for St. James of the Marches: the poisoned cup (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// Medieval Bosnia, built from earlier sets:
//   the royal hall: cathedral() from conrad_spider_chalice.bg3d.js repainted as a torchlit stone-and-timber court (jHook, jCup dark;
//     jCourt brighter).
//   mountain-lake country: lakeAlps() from the same file (anglia() + a lake + blue ranges): jRoad (golden afternoon with a friary),
//     jLeave (blue dusk), jPreach (sunset, a town), jGlory (glory sky, the friary lit).
// Every set-up holds move 'push' (the story's cam.path travels). cam3d: makeRig. Exported for later reels: COURT.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const K = await import('./conrad.bg3d.js');
window.BG3D_LIB = prevLib;
void THREE;

/** A medieval Balkan royal hall: grey stone, dark timber ceiling, torchlight (overrides for cathedral()). */
export const COURT = { wall: '#9a8a78', col: '#b8a890', floorA: '#a89276', floorB: '#5e4a3a', ceil: '#2a1e18', fog: '#4a3628', bg: [[0, '#1a1210'], [1, '#4a3424']],
  hemi: ['#ffd0a0', '#2a1e18', 1.1], key: '#ffb070', win: '#e8b070', shaft: 0.07, apse: 0.8, bigFlames: true, air: 'dust' };
const hall = (name, extra) => () => { window.__conradMode = name; return K.cathedral(name, { base: 'choice', ...COURT, ...extra }); };
const LAKE = { ships: [], smoke: [], move: 'push' };
const lake = (name, extra) => () => { window.__conradMode = name; return K.lakeAlps(name, { ...LAKE, ...extra }); };

export const BUILD = {
  jHook: hall('jHook', {}),
  jRoad: lake('jRoad', { base: 'abbey', abbey: [800, 1112, 300, 0], lake: '#5a7a9a', glintX: 250 }),
  jCourt: hall('jCourt', { base: 'hook', hemi: ['#ffe0b8', '#3a2a24', 1.3], key: '#ffd8a0', win: '#ffd9a0', shaft: 0.12, apse: 1, bigFlames: false }),
  jCup: hall('jCup', { fog: '#3a2a26', bg: [[0, '#120c0c'], [1, '#3a2620']], hemi: ['#ffc890', '#1a1210', 0.95], shaft: 0.04, apse: 0.6 }),
  jLeave: lake('jLeave', { base: 'oak', lake: '#3a4a6a', fog: '#8a8496', glintX: 300 }),
  jPreach: lake('jPreach', { base: 'arrive', abbey: [820, 1105, 320, 1], lake: '#6a5a6a', fog: '#a86a58', glintX: 220 }),
  jGlory: lake('jGlory', { base: 'glory', abbey: [800, 1092, 360, 1], lake: '#4a5a8a', fog: '#d89a84', glintX: 300 }),
};

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
