// three.js backgrounds for St. Catherine of Siena, "She Brought the Pope Home" (browser module; build.mjs copies it to
// work/<slug>/bg3d.mjs). The river, bridge and walled town from joan_of_arc_orleans.bg3d.js (copied next to this file
// as loire.bg3d.js) stand in for Avignon on the Rhône: 'rhoneDusk' (hook, push-fast toward the bridge towers) and
// 'rhoneSunset' (the turning point, a real dolly zoom). Characters, the ship and the near bank stay 2D SVG on top.
// Deterministic: every frame is drawn from timeline time only.
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeView, newRenderer } = B;
window.BG3D_LIB = true;
const L = await import('./loire.bg3d.js');
window.BG3D_LIB = false;

export const BUILD = { rhoneDusk: () => L.loire('dusk'), rhoneSunset: () => L.loire('sunset') };

if (!window.BG3D_LIB) {
  const views = [...document.querySelectorAll('canvas.bg3d')].map((cv) => { const renderer = newRenderer(cv); return { renderer, ...makeView(cv, BUILD) }; });
  const renderAt = (T) => {
    for (const w of views) {
      if (!w.active(T)) continue;
      w.pose(T); w.renderer.render(w.v.scene, w.v.cam);
    }
  };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
