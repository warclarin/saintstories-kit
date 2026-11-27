// three.js backgrounds for "5 Saints Who Refused to Break" (a countdown reel; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). No new set: every scene is a set-up of an earlier reel's world, one per saint's place.
//   xHook      Rome at sunset (five saints in a row)                [roma(), gelasius.bg3d.js, base 'glory']
//   xClement   night storm over the Black Sea from the cliff top    [taurica(), clement_anchor.bg3d.js, base 'anchor']
//   xCatherine Alexandria under a heavy sky (the spiked wheel)      [alexandria(), catherine_of_alexandria.bg3d.js, base 'wheel']
//   xBart      grey mountains of Armenia at dawn                    [alexandria(), base 'sinai' recoloured, no monastery]
//   xLawrence  Rome at dusk, temples, embers in the air (the grill) [roma(), base 'letter', no basilica]
//   xDenis     golden dawn over the valley, the abbey of Saint-Denis far off [anglia(), edmund_last_stand.bg3d.js, base 'abbey']
//   xOutro     golden sunset over the abbey country                 [anglia(), base 'glory']
// Every set-up uses move 'push' (the story's cam.path does the travelling). cam3d: makeRig, one camera for 3D + SVG cards.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const R = await import('./roma.bg3d.js');
const C = await import('./clement.bg3d.js');
const K = await import('./catherine.bg3d.js');
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
void THREE;

export const BUILD = {
  xHook: () => R.roma('xHook', { base: 'glory', move: 'push' }),
  xClement: () => C.taurica('xClement', { base: 'anchor', move: 'push' }),
  xCatherine: () => K.alexandria('xCatherine', { base: 'wheel', move: 'push' }),
  xBart: () => K.alexandria('xBart', { base: 'sinai', move: 'push', monastery: null, stars: 0,
    sky: [[0, '#3a4a72'], [0.24, '#6a7898'], [0.42, '#b0a8b4'], [0.52, '#e0c4aa'], [0.58, '#ecd2b4'], [1, '#ecd2b4']], fog: '#b8aab0',
    hemi: ['#f0e8f0', '#3a3430', 1.25], key: ['#ffe0c0', 1.1], breakAt: [560, 520], rays: { op: 0.12, dir: 0.1, spread: 0.8 },
    cloudLit: '#e8e0e8', cloudShade: '#6a6a88', peaks: ['#6a6a82', '#787286', '#867a6e'], near: '#7a7252', air: 'dust' }),
  xLawrence: () => R.roma('xLawrence', { base: 'letter', move: 'push', basilica: null, temples: [[250, 1100, 480], [820, 1092, 400]], air: 'embers' }),
  xDenis: () => E.anglia('xDenis', { base: 'abbey', move: 'push' }),
  xOutro: () => E.anglia('xOutro', { base: 'glory', move: 'push' }),
};

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
