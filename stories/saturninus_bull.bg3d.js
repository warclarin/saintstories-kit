// three.js backgrounds for St. Saturninus: the bull of the Capitol (one story; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). Roman Toulouse (Tolosa) in the 250s, built on roma() from gelasius.bg3d.js with the Roman
// landmarks thinned out (no colosseum, no aqueduct, no Christian basilica: the Capitol temple and red-tiled roofs only).
//   sDragHook the hook: sunset over the town behind the side-view Capitol steps (the drag)
//   sHook    the Capitol temple at sunset, gold air                       [roma(), base 'hook', one near temple]
//   sCity    the town by day, the temple across the roofs                 [roma(), base 'city', temple right]
//   sTemple  bright afternoon in front of the Capitol (SVG steps + facade) [roma(), base 'hook', far temple only]
//   sTrial   the same square at dusk, the sacrifice fire lit              [roma(), base 'letter', no basilica]
//   sDrag    a stormy grey dusk, light breaking (the drag down the steps) [roma(), base 'feast', no Palatine]
//   sBurial  night, stars, the town asleep (two women bury him)           [roma(), base 'death', no basilica]
//   sGlory   golden sunset (feast; the SVG Saint-Sernin stands in front)  [roma(), base 'glory', no basilica/colosseum]
// Every set-up holds move 'push' (the story's cam.path travels). cam3d: makeRig. Exported for later reels: TOLOSA.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const R = await import('./roma.bg3d.js');
window.BG3D_LIB = prevLib;

/** Overrides that turn roma() into a small Roman provincial town (Tolosa): no colosseum, aqueduct or basilica. */
export const TOLOSA = { colosseum: null, aqueduct: null, basilica: null, palatine: null, move: 'push' };
const town = (name, o) => () => R.roma(name, { ...TOLOSA, ...o });

export const BUILD = {
  sDragHook: town('sDragHook', { base: 'hook', temples: [[880, 1100, 520]], air: 'gold' }),
  sHook:   town('sHook',   { base: 'hook', temples: [[560, 1100, 300]] }),
  sCity:   town('sCity',   { base: 'city', temples: [[800, 1096, 380]] }),
  sTemple: town('sTemple', { base: 'hook', temples: [[200, 1100, 520]], sun: [860, 720, 0.7] }),
  sTrial:  town('sTrial',  { base: 'letter', temples: [[200, 1100, 520]], air: 'embers' }),
  sDrag:   town('sDrag',   { base: 'feast', air: 'dust' }),
  sBurial: town('sBurial', { base: 'death', temples: [[860, 1096, 520]] }),
  sGlory:  town('sGlory',  { base: 'glory', temples: [] }),
};

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
