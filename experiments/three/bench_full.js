// EXPERIMENTAL bench driver: 3D background + the scene's 2D art drawn by three.js (svg2three.js) on ONE WebGL canvas per scene.
// BG3D_VARS.mode = 'vec' | 'sprite'. The SVG stays in the page (hidden) so GSAP keeps driving every motion.
window.BG3D_MANUAL = true;
const THREE = await import('./three.module.min.js');
const { makeView, newRenderer, W, H } = await import('./bgbuild.js');
const { convert } = await import('./svg2three.js');

const V = window.BG3D_VARS || {}, mode = V.mode || 'vec';
const defs = document.querySelector('body > svg defs')?.outerHTML || '';
const t0 = performance.now();
const views = [], waits = [];
for (const cv of document.querySelectorAll('canvas.bg3d')) {
  const sc = cv.closest('.scene'), svg = sc.querySelector('svg'), cam = svg.querySelector('.cam');
  const keep = sc.style.cssText; sc.style.display = 'block';   // getBBox/getCTM need a rendered element
  const renderer = newRenderer(cv); renderer.autoClear = false;
  const bg = makeView(cv, renderer);
  const art = convert(svg, cam, { mode, defs, zoom: V.zoom || 1.15 });
  const scene2d = new THREE.Scene(); scene2d.add(art.root);
  const ortho = new THREE.OrthographicCamera(0, W, 0, -H, -10, 10);
  sc.style.cssText = keep;
  svg.style.visibility = 'hidden';   // the browser no longer paints the SVG; three.js draws it
  views.push({ renderer, bg, art, scene2d, ortho });
  waits.push(art.ready);
  console.log('[bench]', mode, sc.id, JSON.stringify(art.stats));
}

function renderAt(T) {
  window.__timelines?.main?.seek(T, false);   // make sure GSAP has applied time T before we copy transforms
  for (const w of views) {
    if (!w.bg.active(T)) continue;
    w.bg.pose(T); w.art.sync();
    w.renderer.clear();
    w.renderer.render(w.bg.v.scene, w.bg.v.cam);
    w.renderer.render(w.scene2d, w.ortho);
  }
}
window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
await Promise.all(waits);
console.log('[bench] build ms', Math.round(performance.now() - t0));
renderAt(0);
window.__bg3dDone && window.__bg3dDone();
