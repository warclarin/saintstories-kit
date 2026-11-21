// three.js backgrounds for St. Albert of Louvain (Brabant, Liège, Rome and Reims, 1166–1192; browser module, build.mjs
// copies it to work/<slug>/bg3d.mjs). Seven set-ups built with anglia(name, { base, ...overrides }) from
// edmund_last_stand.bg3d.js (imported as edmund.bg3d.js): flat northern fields, wooded ridges, a river with mist and a
// Romanesque cathedral town (abbey3d) standing in for Liège and Reims.
//   aHook  (push-fast) dusk over Reims: the cathedral with lit windows, first stars
//   aYouth (pan-r)     a clear morning in Brabant, the cathedral town of Liège across the valley
//   aElect (drift)     grey-gold afternoon at Liège, the cathedral behind the crowd
//   aRome  (dolly)     bright gold light; the great church looms in behind him as he appeals to the pope
//   aRoad  (tilt-up + rack) a cold violet dusk on the road outside Reims; light breaks through and swells after his death
//   aSaint (pull)      golden light over the cathedral town (his shrine)
//   aGlory (arc)       sunset over the fields, first stars, the cathedral with lit windows
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
const { anglia } = E;

export const SETS = {
  aHook: { base: 'glory', move: 'push-fast', abbey: [820, 1090, 380, 1], stars: 60 },
  aYouth: { base: 'abbey', move: 'pan-r', abbey: [770, 1110, 300, 0], air: 'dust',
    sky: [[0, '#4a7ab8'], [0.22, '#7aa4d0'], [0.4, '#c4d6e2'], [0.5, '#f2e4c4'], [0.57, '#f6ead0'], [1, '#f6ead0']], fog: '#dcd8cc',
    hemi: ['#fff4e4', '#4a4a3a', 1.35], key: ['#fff0d0', 1.3, [60, 30, -100]], sun: [900, 660, 0.55], rays: { op: 0.04, dir: 0.5, spread: 0.9 },
    cloudLit: '#ffffff', cloudShade: '#9aa4c0' },
  aElect: { base: 'abbey', move: 'drift', abbey: [600, 1105, 260, 0], air: null,
    sky: [[0, '#3a4660'], [0.22, '#6a7690'], [0.4, '#aaa8b0'], [0.5, '#e0c8a0'], [0.56, '#ead6b0'], [1, '#ead6b0']], fog: '#c8bcaa',
    hemi: ['#fff0dc', '#4a4434', 1.3], key: ['#ffe0b0', 1.2, [60, 40, -80]], sun: [880, 700, 0.5], rays: { op: 0.04, dir: 0.6, spread: 0.8 },
    cloudLit: '#ece4dc', cloudShade: '#8a8a9e' },
  aRome: { base: 'abbey', move: 'dolly', abbey: [600, 1100, 230, 1],
    sky: [[0, '#5a7ab0'], [0.22, '#8aa6cc'], [0.4, '#e0d0c0'], [0.5, '#f8d8a0'], [0.57, '#fbe4b8'], [1, '#fbe4b8']], fog: '#f0d8b4',
    sun: [240, 720, 0.8], rays: { op: 0.06, dir: -0.4, spread: 1.1 } },
  aRoad: { base: 'glory', move: 'tilt-up', abbey: [880, 1070, 900, 1], stars: 50, sun: null, breakAt: [520, 560],
    sky: [[0, '#141838'], [0.22, '#2e3062'], [0.4, '#5e507e'], [0.5, '#a8789a'], [0.56, '#c89aa4'], [1, '#c89aa4']], fog: '#8a7a96',
    hemi: ['#e0d4f0', '#262230', 1.1], key: ['#ffe0c0', 0.9, [0, 60, -40]], rays: { op: 0.15, dir: 0, spread: 0.7 }, swell: true,
    cloudLit: '#c8b8d8', cloudShade: '#46406a', clouds: [[150, 450, 900, 9], [940, 470, 900, 9]], air: 'dust' },
  aSaint: { base: 'abbey', move: 'pull', abbey: [770, 1110, 300, 1] },
  aGlory: { base: 'glory', move: 'arc' },
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
