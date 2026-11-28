// three.js backgrounds for St. Catherine Labouré: the 46-year secret (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// Reuses the Miraculous Medal reel's set-ups as they are (miraculous_medal.bg3d.js SETS): oHook (the Rue du Bac chapel), oVision
// (the chapel at night), oConfess (candlelit room), oHidden (a quiet Paris street), oGlory (the chapel in golden light).
// cam3d: makeRig. The light table comes from miraculous_medal.mjs (LIGHT, same keys).
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const MM = await import('./medal.bg3d.js');
window.BG3D_LIB = prevLib;

const use = (k) => () => { window.__conradMode = k; return MM.SETS[k](); };
export const BUILD = { oHook: use('oHook'), oVision: use('oVision'), oConfess: use('oConfess'), oHidden: use('oHidden'), oGlory: use('oGlory') };

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
