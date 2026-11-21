// three.js backgrounds for St. Rufus: "his father carried the cross" (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// Jerusalem from presentation_of_mary.bg3d.js (jerusalem3d(name, { base, ...overrides }), imported as jer.bg3d.js) for the
// Gospel scenes, and Rome from gelasius.bg3d.js (roma(name, { base, ...overrides }), imported as roma.bg3d.js) for Paul's letter:
//   jHook  (push-fast) a darkened afternoon over Jerusalem: the city on its hill, Golgotha with three crosses outside the walls
//   jRoad  (pan-r)     the road in from the country: olive groves, the city ahead in warm light
//   jWay   (pan-l)     the way of the cross under a heavy sky, Golgotha ahead
//   jName  (dolly)     golden light; the city looms in behind Simon and his sons
//   rLetter (pull)     Rome in golden light (Paul's greeting to Rufus and his mother)
//   rGlory  (arc)      sunset over Rome
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const J = await import('./jer.bg3d.js');
const R = await import('./roma.bg3d.js');
window.BG3D_LIB = prevLib;
const { jerusalem3d } = J, { roma } = R;

const DARK = [[0, '#1e1e34'], [0.24, '#3a3650'], [0.42, '#6e5e6e'], [0.52, '#b08a7e'], [0.58, '#c8a08a'], [1, '#c8a08a']];
export const SETS = {
  jHook: { base: 'dusk', move: 'push-fast', sky: DARK, fog: '#8a7a80', stars: 0, sun: null, breakAt: [300, 640], rays: { op: 0.1, dir: -0.3, spread: 0.8 },
    hemi: ['#e8dcd8', '#2e2830', 1.15], key: ['#ffd8b0', 1.0], cloudLit: '#a89aa8', cloudShade: '#3e3a52', mount: [250, 1035, 700, 0], crosses: [820, 1045, 520], air: 'dust',
    clouds: [[150, 460, 900, 11], [940, 450, 900, 11], [560, 600, 950, 8]] },
  jRoad: { base: 'wait', move: 'pan-r', mount: [760, 1015, 700, 0] },
  jWay: { base: 'dusk', move: 'pan-l', sky: DARK, fog: '#8a7a80', stars: 0, sun: null, breakAt: [260, 620], rays: { op: 0.08, dir: -0.3, spread: 0.7 },
    hemi: ['#e8dcd8', '#2e2830', 1.15], key: ['#ffd8b0', 1.0], cloudLit: '#a89aa8', cloudShade: '#3e3a52', mount: [880, 1035, 760, 0], crosses: [220, 1045, 560], air: 'dust',
    clouds: [[150, 460, 900, 11], [940, 450, 900, 11]] },
  jName: { base: 'wait', move: 'dolly', mount: [560, 1015, 620, 0],
    sky: [[0, '#8a5a4a'], [0.22, '#d08a62'], [0.4, '#f4b878'], [0.5, '#fadca0'], [1, '#fadca0']], fog: '#f4c890', sun: [860, 760, 0.7], rays: { op: 0.08, dir: 0.4, spread: 1.2 }, air: 'gold' },
  rLetter: { base: 'hook', move: 'pull', basilica: null, temples: [[760, 1100, 420]], colosseum: [200, 1095, 520] },
  rGlory: { base: 'glory', move: 'arc', basilica: null, temples: [[780, 1100, 440]] },
};
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, v]) => [k, () => (k[0] === 'r' ? roma(k, v) : jerusalem3d(k, v))]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
