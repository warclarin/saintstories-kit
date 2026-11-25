// three.js backgrounds for St. Leonard of Port Maurice: the Stations in the Colosseum (browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). Set-ups of roma() from gelasius.bg3d.js (imported as a library). Every set-up holds a fixed camera
// (move 'push' with a near-zero amount from the story: the Ricks Clips motion standard, no sway, no tilt).
//   lHook   golden evening inside the arena (the SVG ruin card covers the city; sky and sand from 3D)
//   lRome   afternoon over Rome with the Colosseum close on the right (he wants the arena made holy; the map of Italy)
//   lPope   dusk at St. Peter's: the basilica's windows lit (the nobles; the Pope says yes)
//   lArena  a cold December evening inside the arena (the edict, the fourteen shrines, the sermon, the Way of the Cross)
//   lNight  night on the Palatine, stars, light from above (he comes home and dies that night)
//   lToday  night, the Colosseum close behind, stars (the Good Friday Way of the Cross today)
//   lGlory  sunset over Rome, the Colosseum on the left (feast day)
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const R = await import('./roma.bg3d.js');
window.BG3D_LIB = prevLib;
const { roma } = R;

const INSIDE = { basilica: null, colosseum: null, temples: [], roofs: false, aqueduct: null, palatine: null, pines: false };
export const SETS = {
  lHook: { base: 'hook', move: 'push', ...INSIDE, near: '#c8ae7c', sun: [880, 760, 0.8], rays: { op: 0.07, dir: -0.5, spread: 1.0 } },
  lRome: { base: 'city', move: 'push', aqueduct: null, colosseum: [700, 1100, 330] },
  lPope: { base: 'letter', move: 'push', temples: [] },
  lArena: { base: 'hook', move: 'push', ...INSIDE, near: '#b89e70', sky: [[0, '#2a3460'], [0.28, '#6a6a98'], [0.44, '#d8a088'], [0.54, '#f0c09a'], [0.58, '#f4cca4'], [1, '#f4cca4']],
    fog: '#d0a890', sun: [160, 860, 0.7], rays: { op: 0.06, dir: 0.5, spread: 1.0 }, hemi: ['#ffe0c8', '#4a3a3a', 1.25], key: ['#ffc090', 1.2] },
  lNight: { base: 'death', move: 'push', basilica: null, palatine: [560, 1085, 300] },
  lToday: { base: 'death', move: 'push', basilica: null, colosseum: [560, 1100, 280], swell: false, rays: { op: 0.08, dir: 0, spread: 0.8 } },
  lGlory: { base: 'glory', move: 'push', basilica: [820, 1085, 330, 1], colosseum: [200, 1095, 520] },
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
