// three.js backgrounds for St. Paul Lê Bảo Tịnh: the letter from prison (one story; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). Reuses two sets: tonkin() from theophane_venard_cage.bg3d.js (imported as tonkin.bg3d.js: the Hanoi
// citadel yard, the paddies with a village church) and the stone prison cell of alexandria() from
// catherine_of_alexandria.bg3d.js (imported as alex.bg3d.js).
//   pHook   (push-fast)      the citadel yard at night, moon and lanterns (chained, holding his letter)
//   pArrest (pan-r)          the citadel yard by day (arrested, 1841)
//   pCell   (push)           the prison cell, moonlight through the bars (he writes the letter)
//   pSem    (drift)          the paddies and a village church by day (the seminarians read it)
//   pCell2  (dolly)          the prison cell; the cell looms as the light swells (I am not alone)
//   pField  (tilt-up + rack) the execution ground by the paddies, light from above (1857)
//   pGlory  (arc)            the paddies at sunset with the Flag Tower and a village church (feast day)
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const T = await import('./tonkin.bg3d.js');
const X = await import('./alex.bg3d.js');
window.BG3D_LIB = prevLib;
const { tonkin } = T;
const { alexandria } = X;
void THREE;

export const SETS = {
  pHook: () => tonkin('pHook', { base: 'hook' }),
  pArrest: () => tonkin('pArrest', { base: 'court', move: 'pan-r' }),
  pCell: () => alexandria('pCell', { base: 'cell', move: 'push' }),
  pSem: () => tonkin('pSem', { base: 'field', move: 'drift', swell: false, rays: { op: 0.06, dir: 0.4, spread: 1.0 }, church: [880, 230], tower: null }),
  pCell2: () => alexandria('pCell2', { base: 'cell', move: 'dolly', win: [700, 600] }),
  pField: () => tonkin('pField', { base: 'field' }),
  pGlory: () => tonkin('pGlory', { base: 'glory' }),
};
export const BUILD = SETS;

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T0) => { for (const w of rigs) w.draw(T0); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
