// three.js backgrounds for St. Edmund: "the guardian wolf" (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// Seven set-ups of the same East Anglian world as "the last stand", built with anglia(name, { base, ...overrides }) from
// edmund_last_stand.bg3d.js (imported as edmund.bg3d.js):
//   wHook   (push-fast) the oak wood under a cold blue dusk, moonlight breaking through the canopy
//   wRaid   (pan-r)     red sky over the river: the beached longships and smoke as the Vikings leave
//   wSearch (drift)     the wood in grey-violet twilight, thick mist between the trunks
//   wFind   (dolly)     a clearing where warm light breaks through the leaves onto the wolf (the light swells)
//   wHome   (pan-l)     early morning: the path out of the wood to the settlement with its timber hall
//   wAbbey  (pull)      golden light over the abbey town of Bury St Edmunds
//   wGlory  (arc)       sunset over the fields, first stars, the abbey with lit windows
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
const { anglia } = E;

// oaks without the centre trunk (blurred, its forked limbs read as a windmill behind the characters)
const TREES = [[-22, -26, 26, 1], [-34, -46, 30, 2], [-16, -70, 28, 3], [24, -30, 27, 4], [36, -52, 32, 5], [-48, -90, 34, 7], [52, -96, 34, 8], [-62, -150, 32, 10], [66, -160, 30, 11]];
const WOODCLOUDS = [[150, 440, 900, 9], [940, 460, 900, 9]];
export const SETS = {
  wHook: { base: 'oak', woodTrees: TREES, move: 'push-fast', fog: '#5a6488', stars: 70,
    sky: [[0, '#0e1430'], [0.24, '#1e2850'], [0.42, '#3e4a78'], [0.52, '#7a86b0'], [0.58, '#9aa4c4'], [1, '#9aa4c4']],
    hemi: ['#c8d4ff', '#1e2030', 1.1], key: ['#c8d0ff', 0.9, [60, 40, -60]], breakAt: [760, 600], rays: { op: 0.13, dir: 0.2, spread: 0.7 },
    cloudLit: '#aab4d8', cloudShade: '#3a4268', clouds: WOODCLOUDS, swell: false, air: 'dust' },
  wRaid: { base: 'arrive', move: 'pan-r' },
  wSearch: { base: 'oak', woodTrees: TREES, move: 'drift', fog: '#7a7690', stars: 20,
    sky: [[0, '#1a1c36'], [0.24, '#3a3a5e'], [0.42, '#6a6484'], [0.52, '#a898a4'], [0.58, '#bcaeb4'], [1, '#bcaeb4']],
    hemi: ['#dcd8f0', '#26222a', 1.05], key: ['#d8d4f0', 0.8, [0, 60, -40]], breakAt: [300, 560], rays: { op: 0.07, dir: -0.2, spread: 0.6 },
    cloudLit: '#b8b0c8', cloudShade: '#46425e', clouds: WOODCLOUDS, swell: false },
  wFind: { base: 'oak', woodTrees: TREES, move: 'dolly', breakAt: [650, 520], rays: { op: 0.2, dir: 0.15, spread: 0.8 }, swell: true },
  wHome: { base: 'hall', move: 'pan-l', stars: 0,
    sky: [[0, '#5a6a9a'], [0.22, '#8a98c0'], [0.4, '#d8c4c0'], [0.5, '#f4d4a8'], [0.57, '#f8e2bc'], [1, '#f8e2bc']], fog: '#e0c8b0',
    hemi: ['#fff0dc', '#4a4434', 1.3], key: ['#ffc888', 1.3, [80, 25, -100]], sun: [900, 880, 0.75], rays: { op: 0.05, dir: 0.5, spread: 1.0 },
    cloudLit: '#fff0e0', cloudShade: '#9a98b4', air: 'gold' },
  wAbbey: { base: 'abbey', move: 'pull' },
  wGlory: { base: 'glory', move: 'arc' },
};

export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, v]) => [k, () => anglia(k, v)]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
