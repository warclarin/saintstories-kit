// three.js backgrounds for St. Albert the Great (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// The forest from roch_dog.bg3d.js (copied next to this file as roch.bg3d.js) in two set-ups: 'woodsDusk' (hook,
// push-fast: warm low sun between the trunks) and 'woodsLight' (the book of nature, drift-l: the bright clearing with
// light shafts, the camera trucking slowly left instead of the dolly zoom). Characters and props stay 2D SVG on top.
// Deterministic: every frame is drawn from timeline time only. Exported for later reels: woods(mode).
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { FOV, makeView, newRenderer } = B;
window.BG3D_LIB = true;
const R = await import('./roch.bg3d.js');
window.BG3D_LIB = false;

/** 'dusk': the forest at dusk (push-fast). 'light': the bright clearing with a slow sideways drift. */
export function woods(mode = 'light') {
  if (mode === 'dusk') return R.forest('dusk');
  const v = R.forest('light'), upd = v.update;
  v.update = (t, p) => {
    upd(t, 0);                                               // mist and light shafts; p = 0 keeps the lens unzoomed
    v.cam.fov = FOV; v.cam.updateProjectionMatrix();
    v.cam.position.set(2.5 - 5 * p, 2.6, 4);                 // drift-l: truck left
    return {};
  };
  return v;
}

export const BUILD = { woodsDusk: () => woods('dusk'), woodsLight: () => woods('light') };

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
