// three.js backgrounds for Our Lady of the Miraculous Medal (browser module, build.mjs copies it to work/<slug>/bg3d.mjs).
// Every scene in 3D, cam3d (makeRig): the camera travels along each scene's cam.path, so every set-up holds a still camera.
//   the chapel of the Rue du Bac: cathedral(name, { base, ...colours }) from conrad_spider_chalice.bg3d.js, repainted in cream,
//     white and gold with a blue vault (oHook bright and golden, oVision evening with candles, oConfess dim, oGlory gold)
//   oFarm: a golden morning over Burgundy farm fields (anglia() from edmund_last_stand.bg3d.js, no abbey, no river boats)
//   Paris streets of 1832: paris(name, opts) = mexico() from miguel_pro_firing_squad.bg3d.js as an open plaza, with a row of
//     cream Parisian facades and grey slate roofs added (oCholera a gloomy dusk with lit windows, oHidden soft gold day).
// Deterministic: everything is drawn from timeline time. Exported for later reels: paris(name, opts), CHAPEL.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { lam, makeRig, rng } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const C = await import('./conrad.bg3d.js');
const E = await import('./edmund.bg3d.js');
const X = await import('./mexico.bg3d.js');
window.BG3D_LIB = prevLib;
const { cathedral } = C;
const { anglia } = E;
const { mexico, facades3d } = X;

const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
/** The Rue du Bac chapel colours: cream walls and columns, a warm stone floor, a deep blue ceiling, gold apse. */
export const CHAPEL = { wall: '#e6dccb', col: '#f4eee2', floorA: '#e0d2bc', floorB: '#a89478', ceil: '#2e3a6a', fog: '#8a7a74', bg: [[0, '#1e2240'], [1, '#6a5a5a']],
  hemi: ['#fff0dc', '#4a4048', 1.45], key: '#fff0c8', win: '#fff0d0', shaft: 0.14, apse: 1.1, air: 'gold' };
/** A Paris street of the 1830s: mexico() as an open plaza (no Mexican facades, no cathedral, no volcanoes) with cream stone
 * facades and slate roofs added 50 units back. */
export function paris(name, opts) {
  const v = mexico(name, { cathedral: null, volc: null, ...opts, kind: 'plaza' });
  const lit = opts.lit ?? 0;
  const fa = facades3d(-70, 70, { seed: 11, lit, walls: ['#e8dcc4', '#dcd0b8', '#efe6d4', '#d4c8b0', '#e4d8c0', '#cfc4ae'] }); fa.position.z = -50; v.scene.add(fa);
  // grey slate mansard roofs with chimneys along the top of the row
  const r = rng(name.length + 3), slate = lam('#6a6e80'), chim = lam('#a8907a');
  for (let x = -70; x < 70; x += 9 + r() * 3) {
    const w = 9, h = 9.6 + r() * 2.2, rf = box(w, 2.4, 3.2, slate); rf.position.set(x + w / 2, h + 0.9, -50.6); rf.rotation.x = -0.25; v.scene.add(rf);
    if (r() < 0.6) { const c = box(0.8, 1.8, 0.8, chim); c.position.set(x + 2 + r() * 5, h + 2.4, -51.4); v.scene.add(c); }
  }
  const curb = box(160, 0.35, 3, lam('#cfc4b0')); curb.position.set(0, 0.17, -46.5); v.scene.add(curb);
  return v;
}

export const SETS = {
  oHook:    () => cathedral('oHook', { base: 'altar', ...CHAPEL }),
  oVision:  () => cathedral('oVision', { base: 'later', ...CHAPEL, fog: '#4a4258', bg: [[0, '#10122a'], [1, '#3a3048']], hemi: ['#e8dcf0', '#24202a', 1.1], key: '#ffd8a8',
    win: '#7a90d0', shaft: 0.05, apse: 0.9, bigFlames: true, lamps: true }),
  oConfess: () => cathedral('oConfess', { base: 'choice', ...CHAPEL, fog: '#3e3640', bg: [[0, '#120e14'], [1, '#3a2c2c']], hemi: ['#ffd8b0', '#1e1818', 0.95], key: '#ffc090',
    win: '#c8a080', shaft: 0.05, apse: 0.6, bigFlames: true, air: 'dust' }),
  oGlory:   () => cathedral('oGlory', { base: 'hook', ...CHAPEL, fog: '#9a7a64', bg: [[0, '#2a1e30'], [1, '#8a6a50']], hemi: ['#ffe4c0', '#4a3a3a', 1.5], key: '#ffd8a0',
    win: '#ffd9a0', shaft: 0.16, apse: 1.3 }),
  oFarm:    () => anglia('oFarm', { base: 'abbey', move: 'push', abbey: null, ships: [], smoke: [], air: 'gold',
    sky: [[0, '#5a86c0'], [0.22, '#8ab0d8'], [0.4, '#d0dce4'], [0.5, '#f6e6c4'], [0.57, '#f8ecd0'], [1, '#f8ecd0']], fog: '#dcd4c4',
    hemi: ['#fff4e4', '#4a4a3a', 1.35], sun: [860, 700, 0.6], rays: { op: 0.05, dir: 0.5, spread: 1.0 }, cloudLit: '#ffffff', cloudShade: '#9aa4c0', near: '#7a9248' }),
  oCholera: () => paris('oCholera', { base: 'night', lit: 1, sky: [[0, '#14162a'], [0.26, '#262a44'], [0.44, '#4a4658'], [0.54, '#6a5a62'], [0.58, '#74646a'], [1, '#74646a']],
    fog: '#4a4854', ground: '#6a6460', stars: 0, air: 'dust', clouds: [[150, 470, 900, 10], [930, 450, 900, 10], [600, 600, 950, 7]], cloudLit: '#6a6a7e', cloudShade: '#2a2a3e' }),
  oHidden:  () => paris('oHidden', { base: 'funeral', lit: 0, ground: '#a89a88', air: 'gold' }),
};
// each set-up reads its light from the story's LIGHT table under its own name (cathedral reads window.__conradMode)
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, fn]) => [k, () => { window.__conradMode = k; return fn(); }]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
