// three.js backgrounds for St. Peter of Alexandria: the torn robe (browser module, build.mjs copies it to work/<slug>/bg3d.mjs).
// Set-ups of alexandria() from catherine_of_alexandria.bg3d.js (imported as a library):
//   pHook   (push-fast) the prison cell at night, moonlight through the bars (the vision)
//   pArrest (pan-r + drone) dusk over the city, lit windows, the Pharos fire (the arrest; the crowd)
//   pCell   (tilt-up + rack) the cell (Arius's envoys; the boy Christ in the torn robe)
//   pStorm  (dolly) a night storm over the city behind the prison wall (the wall broken open)
//   pTomb   (push + hero) a pale dawn by the sea at Bucolia, the city behind (St. Mark's tomb)
//   pNicaea (pull) bright day over a lake shore city, no Pharos (Nicaea, 325)
//   pGlory  (arc) sunset over the harbour, the Pharos lit (feast day)
// Deterministic: drawn from timeline time only. cam3d: one camera for the 3D and the SVG cards (makeRig).
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const X = await import('./alexandria.bg3d.js');
window.BG3D_LIB = prevLib;
const { alexandria } = X;

export const SETS = {
  pHook: { base: 'cell', move: 'push', hemi: ['#b8c0e8', '#1a141c', 0.9] },
  pArrest: { base: 'emp', move: 'push', ships: [] },
  pCell: { base: 'cell', move: 'push' },
  pStorm: { base: 'wheel', move: 'push', sky: [[0, '#0c0e1e'], [0.24, '#1c1e34'], [0.42, '#34324a'], [0.52, '#4e4858'], [0.58, '#5a5262'], [1, '#5a5262']], fog: '#3e3a4c',
    hemi: ['#9aa0c8', '#1a1620', 0.8], key: ['#ffb070', 0.8], breakAt: [300, 560], rays: { op: 0 }, swell: false, cloudLit: '#6a6a88', cloudShade: '#22223a',
    near: '#5a5048', water: '#2a3248', streakOp: 0.15, lit: 1, pharos: [930, 1036, 760, 0.85, 1], temples: [] },
  pTomb: { base: 'hook', move: 'push', sky: [[0, '#3a4a80'], [0.22, '#7a86b0'], [0.4, '#e0b8a8'], [0.5, '#f8d0a8'], [0.57, '#fbe0bc'], [1, '#fbe0bc']],
    sun: [880, 880, 0.75], rays: { op: 0.07, dir: -0.6, spread: 1.0 }, pharos: [960, 1040, 620, 0.9, 0.4], temples: [], ships: [[540, -520, 1.0]] },
  pNicaea: { base: 'youth', move: 'push', pharos: null, ships: [], temples: [[160, 1080, 320]] },
  pGlory: { base: 'hook', move: 'push', sky: [[0, '#1a1c48'], [0.2, '#3a3270'], [0.36, '#8a5a86'], [0.47, '#e08a7a'], [0.53, '#f8c088'], [0.57, '#fcdca4'], [1, '#fcdca4']],
    fog: '#e0a088', hemi: ['#ffdcc4', '#3a3040', 1.25], key: ['#ffb880', 1.5], sun: [820, 940, 0.9], rays: { op: 0.09, dir: -0.4, spread: 1.6, up: true },
    cloudLit: '#ffc8a8', cloudShade: '#8a6a98', stars: 60, near: '#a07a58', water: '#4a5a8a', lit: 1, pharos: [930, 1040, 620, 0.9, 1], temples: [] },
};
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, v]) => [k, () => alexandria(k, v)]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
