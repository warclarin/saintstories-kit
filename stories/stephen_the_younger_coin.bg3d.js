// three.js backgrounds for St. Stephen the Younger: the coin (one story; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). Constantinople in the 760s, built from earlier sets plus one new landmark:
//   hagia3d(): a simple Hagia Sophia (square stone body, drum with a ring of windows, the great dome, two half domes and four
//     buttress towers; no minarets, which came centuries later), placed into roma() set-ups to turn Rome into Constantinople.
//   the imperial palace hall: cathedral() from conrad_spider_chalice.bg3d.js repainted in marble, porphyry red and gold under a
//     deep blue vault (sHook, sTrial bright; sQuote darker, candlelit).
//   sIcons  the city at dusk, embers in the air (the icons burned)        [roma(), base 'letter', + hagia3d]
//   sExile  a stormy dusk over the sea from an island cliff (Proconnesus) [taurica(), clement_anchor.bg3d.js, base 'hook']
//   sDeath  the city at night, light breaking from above (prison, the streets, his death) [roma(), base 'death', + hagia3d]
//   sGlory  golden sunset over the city (feast day)                       [roma(), base 'glory', + hagia3d]
// Every set-up holds move 'push' (the story's cam.path travels). cam3d: makeRig. Exported for later reels: hagia3d(), PALACE.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig, lam, glowMat, atScreen } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const R = await import('./roma.bg3d.js');
const C = await import('./clement.bg3d.js');
const K = await import('./conrad.bg3d.js');
window.BG3D_LIB = prevLib;

const col = (h) => new THREE.Color(h);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
/** A simple Hagia Sophia: base at y = 0, about 56 units wide and 36 tall at scale 1. lit = 0..1 warm windows. */
export function hagia3d({ stone = '#e2c4a2', dome = '#a8a8a0', lit = 0 } = {}) {
  const g = new THREE.Group(), m = lam(stone), dk = lam(col(stone).lerp(col('#5a4a3a'), 0.3)), dm = lam(dome);
  const body = box(34, 14, 34, m); body.position.y = 7; g.add(body);
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(12.5, 13, 3.2, 32), m); drum.position.y = 15.6; g.add(drum);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(12.6, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), dm); cap.position.y = 17.2; cap.scale.y = 0.78; g.add(cap);
  for (const sx of [-1, 1]) {   // half domes east and west, lower aisles
    const hd = new THREE.Mesh(new THREE.SphereGeometry(10, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), dm); hd.position.set(sx * 15, 13.6, 0); hd.scale.set(0.9, 0.62, 0.9); g.add(hd);
    const wing = box(12, 9, 30, m); wing.position.set(sx * 22, 4.5, 0); g.add(wing);
  }
  for (const [x, z] of [[-17, -17], [17, -17], [-17, 17], [17, 17]]) { const t = box(5, 19, 5, dk); t.position.set(x, 9.5, z); g.add(t); }
  const win = glowMat(lit ? '#ffd890' : '#4a3a3a', lit ? 0.95 : 1);
  for (let k = 0; k < 20; k++) { const a = (k / 20) * Math.PI * 2, w = box(0.9, 1.6, 0.4, win); w.position.set(Math.cos(a) * 12.9, 15.8, Math.sin(a) * 12.9); w.rotation.y = -a; g.add(w); }
  for (let k = -3; k <= 3; k++) { const w = box(1.6, 3.2, 0.3, win); w.position.set(k * 4, 7, 17.2); g.add(w); }
  const cross = box(0.5, 3.4, 0.5, lam('#e8c86a')); cross.position.y = 28.6; g.add(cross);
  const bar = box(2, 0.5, 0.5, lam('#e8c86a')); bar.position.y = 29.4; g.add(bar);
  return g;
}
/** Constantinople: a roma() set-up with the Great Church placed at screen (sx, sy), distance d. */
function city(name, opts, [sx, sy, d, lit] = [740, 1090, 380, 0]) {
  const v = R.roma(name, { basilica: null, temples: [], colosseum: null, aqueduct: null, ...opts });
  const p = atScreen(v.cam, sx, sy, d), h = hagia3d({ lit }); h.position.set(p.x, -2.5, p.z); h.scale.setScalar(d / 250 * 0.62); h.rotation.y = -0.4; v.scene.add(h);
  return v;
}
/** The imperial palace hall: marble, porphyry and gold under a deep blue vault (overrides for cathedral()). */
export const PALACE = { wall: '#d6c2a4', col: '#f0e6d2', floorA: '#d2b896', floorB: '#7a3a44', ceil: '#24204e', fog: '#6a5060', bg: [[0, '#1e1a3a'], [1, '#6a4a4a']],
  hemi: ['#fff0d8', '#3a2a30', 1.35], key: '#ffe0a8', win: '#ffe0a0', shaft: 0.12, apse: 1.25, air: 'gold' };
const hall = (name, extra) => () => { window.__conradMode = name; return K.cathedral(name, { base: 'hook', ...PALACE, ...extra }); };

export const BUILD = {
  sHook: hall('sHook', {}),
  sIcons: () => city('sIcons', { base: 'letter', move: 'push', air: 'embers' }, [760, 1090, 360, 1]),
  sExile: () => C.taurica('sExile', { base: 'hook', move: 'push' }),
  sTrial: hall('sTrial', {}),
  sQuote: hall('sQuote', { base: 'choice', ...PALACE, fog: '#3a2a34', bg: [[0, '#120e1a'], [1, '#3a2630']], hemi: ['#ffd8b0', '#1e1418', 1.0], key: '#ffc890',
    win: '#c8a080', shaft: 0.05, apse: 0.8, bigFlames: true, air: 'dust' }),
  sDeath: () => city('sDeath', { base: 'death', move: 'push' }, [760, 1080, 420, 1]),
  sGlory: () => city('sGlory', { base: 'glory', move: 'push' }, [760, 1088, 360, 1]),
};

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
