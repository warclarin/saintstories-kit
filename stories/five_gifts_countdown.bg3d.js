// three.js backgrounds for "5 Saints With Supernatural Gifts" (a countdown reel; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). No new set: every scene is a set-up of an earlier reel's world, one per saint's place.
//   yHook    Rome in golden morning light (five saints in a row)         [roma(), gelasius.bg3d.js, base 'hook']
//   yVincent a medieval cathedral town at golden hour (the open-air sermon) [anglia(), edmund_last_stand.bg3d.js, base 'abbey']
//   yPaola   a calm dawn on the beach by the strait, a ship far off       [taurica(), clement_anchor.bg3d.js, base 'relics']
//   yMartin  a colonial street in soft gold light (Lima, then Mexico)     [mexico(), miguel_pro_firing_squad.bg3d.js, base 'funeral']
//   yPio     inside a church, bright morning (Mass, confession)          [cathedral(), conrad_spider_chalice.bg3d.js, base 'altar']
//   yJoseph  Rome at dusk, St. Peter's lit (the flight before the Pope)  [roma(), base 'letter']
//   yOutro   golden sunset over the abbey country                        [anglia(), base 'glory']
// Every set-up uses move 'push' (the story's cam.path does the travelling). cam3d: makeRig, one camera for 3D + SVG cards.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const R = await import('./roma.bg3d.js');
const C = await import('./clement.bg3d.js');
const E = await import('./edmund.bg3d.js');
const X = await import('./mexico.bg3d.js');
const K = await import('./conrad.bg3d.js');
window.BG3D_LIB = prevLib;
void THREE;

export const BUILD = {
  yHook: () => R.roma('yHook', { base: 'hook', move: 'push' }),
  yVincent: () => E.anglia('yVincent', { base: 'abbey', move: 'push', ships: [], smoke: [] }),
  yPaola: () => C.taurica('yPaola', { base: 'relics', move: 'push' }),
  yMartin: () => X.mexico('yMartin', { base: 'funeral', move: 'push' }),
  // cathedral() reads its light from the story's LIGHT table under window.__conradMode
  yPio: () => { window.__conradMode = 'yPio'; return K.cathedral('altar'); },
  yJoseph: () => R.roma('yJoseph', { base: 'letter', move: 'push' }),
  yOutro: () => E.anglia('yOutro', { base: 'glory', move: 'push' }),
};

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
