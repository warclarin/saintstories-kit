// three.js backgrounds for St. Cecilia (whole life; browser module, build.mjs copies it to work/<slug>/bg3d.mjs).
// Rome from gelasius.bg3d.js (roma(name, { base, ...overrides }), imported as roma.bg3d.js); the house scenes add SVG
// columns of her peristyle in front of the 3D city and sky.
//   cHook  (push-fast) sunset over Rome, lit windows (portrait with the organ)
//   cYouth (pan-r)     golden morning over the city (a girl who gave her heart to God)
//   cWed   (drift)     dusk, the basilica-like hall lit (the wedding)
//   cMart  (push)      night, stars (Valerian and Tiburtius)
//   cBath  (dolly)     a heavy grey-violet sky with light breaking through (the bath)
//   cThree (tilt-up + rack) night; light breaks from above and swells (three more days)
//   c1599  (pull)      dusk; Santa Cecilia in Trastevere with lit windows (the tomb opened in 1599)
//   cGlory (arc)       sunset glory
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const R = await import('./roma.bg3d.js');
window.BG3D_LIB = prevLib;
const { roma } = R;

export const SETS = {
  cHook: { base: 'glory', move: 'push-fast' },
  cYouth: { base: 'hook', move: 'pan-r', basilica: null, temples: [[760, 1100, 440]] },
  cWed: { base: 'letter', move: 'drift' },
  cMart: { base: 'death', move: 'push', swell: false, rays: { op: 0, dir: 0, spread: 0.5 }, basilica: [760, 1080, 400, 1] },
  cBath: { base: 'feast', move: 'dolly', palatine: null, basilica: [700, 1085, 360, 0] },
  cThree: { base: 'death', move: 'tilt-up', basilica: null, temples: [[780, 1095, 460]] },
  c1599: { base: 'letter', move: 'pull', basilica: [620, 1085, 260, 1], temples: [] },
  cGlory: { base: 'glory', move: 'arc', basilica: [780, 1085, 360, 1] },
};
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, v]) => [k, () => roma(k, v)]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
