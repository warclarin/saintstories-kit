// three.js backgrounds for St. John Berchmans (Brabant, Rome and Louisiana; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). Set-ups of anglia() from edmund_last_stand.bg3d.js (flat northern fields, a church town) and roma()
// from gelasius.bg3d.js (Rome), both imported as libraries. The camera travels along each scene's cam.path (makeRig), so every
// set-up holds move 'push' with a near-zero amount; no sway, no roll.
//   jHook    dusk in Rome, St. Peter's windows lit (the crowds come to see him)
//   jDiest   a golden morning in Brabant, the church town of Diest across the fields (the shoemaker's son)
//   jMech    grey-gold afternoon at Mechelen, the cathedral behind (his father says no)
//   jCollege bright day in Rome (the Roman College; the map covers it first)
//   jFever   a gloomy dusk, light breaking through and swelling (the fever and his death)
//   jCoteau  night under the oaks, light breaking from above (Grand Coteau, Louisiana: the healing)
//   jCanon   golden Rome with St. Peter's (canonized by Leo XIII)
//   jGlory   sunset over Brabant, the church with lit windows (feast day)
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const E = await import('./edmund.bg3d.js');
const R = await import('./roma.bg3d.js');
window.BG3D_LIB = prevLib;
const { anglia } = E;
const { roma } = R;

const NOSHIP = { ships: [], smoke: [] };
export const SETS = {
  jHook:    ['roma', { base: 'letter', move: 'push', temples: [], basilica: [800, 1085, 300, 1] }],
  jDiest:   ['anglia', { base: 'abbey', move: 'push', ...NOSHIP, abbey: [820, 1110, 300, 0], air: 'dust',
    sky: [[0, '#4a7ab8'], [0.22, '#7aa4d0'], [0.4, '#c4d6e2'], [0.5, '#f2e4c4'], [0.57, '#f6ead0'], [1, '#f6ead0']], fog: '#dcd8cc',
    hemi: ['#fff4e4', '#4a4a3a', 1.35], key: ['#fff0d0', 1.3, [-60, 30, -100]], sun: [180, 660, 0.55], rays: { op: 0.04, dir: -0.5, spread: 0.9 },
    cloudLit: '#ffffff', cloudShade: '#9aa4c0' }],
  jMech:    ['anglia', { base: 'raid', move: 'push', ...NOSHIP, abbey: [580, 1105, 260, 0], air: null }],
  jCollege: ['roma', { base: 'city', move: 'push', aqueduct: null, colosseum: [860, 1095, 460] }],
  jFever:   ['roma', { base: 'feast', move: 'push' }],
  jCoteau:  ['anglia', { base: 'oak', move: 'push' }],
  jCanon:   ['roma', { base: 'hook', move: 'push', colosseum: null, temples: [], basilica: [740, 1085, 300, 0] }],
  jGlory:   ['anglia', { base: 'glory', move: 'push', abbey: [800, 1080, 420, 1] }],
};
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, [lib, v]]) => [k, () => (lib === 'roma' ? roma : anglia)(k, v)]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
