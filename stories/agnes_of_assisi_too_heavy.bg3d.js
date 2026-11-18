// three.js backgrounds for St. Agnes of Assisi: "too heavy to lift" (Mount Subasio, 1212; browser module, build.mjs copies
// it to work/<slug>/bg3d.mjs). One set, three set-ups:
//   subasio(mode): the green slope of Mount Subasio above the Umbrian valley, olive groves and cypresses, valley mist,
//   and Assisi on its hill (pale stone houses, terracotta roofs, a campanile, the Rocca on top).
//   'hook'    morning, push-fast toward the slope (the struggle at frame 0)
//   'miracle' a little brook winding down the slope, light breaking through the clouds; a real dolly zoom
//   'glory'   sunset with the first stars over the valley, arc-r for the feast-day portrait
// Characters, props and overlays stay SVG on top. Deterministic: everything is drawn from timeline time.
// Exported for later reels: subasio(mode), assisi3d(), cypress3d(), olive3d().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, cloud, sprite, atScreen, newRenderer, makeView, stars } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,243,210,1)'], [0.22, 'rgba(255,214,150,.75)'], [0.6, 'rgba(255,170,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const mistTex = glowTex([[0, 'rgba(255,248,236,.75)'], [0.5, 'rgba(250,240,228,.3)'], [1, 'rgba(250,240,228,0)']]);

/** A tall Italian cypress. Base at (x, 0, z). */
export function cypress3d(x, z, h, c = '#2e4a32') {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.03, h * 0.04, h * 0.15, 5), lam('#4a3424')); t.position.y = h * 0.07; g.add(t);
  const k = new THREE.Mesh(new THREE.SphereGeometry(h * 0.12, 10, 10), lam(c)); k.scale.set(1, 4.2, 1); k.position.y = h * 0.55; g.add(k);
  g.position.set(x, 0, z); return g;
}
/** A round grey-green olive tree. Base at (x, 0, z). */
export function olive3d(x, z, h, seed = 1, c = '#7a9068') {
  const g = new THREE.Group(), r = rng(seed);
  const t = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.05, h * 0.09, h * 0.45, 6), lam('#6a5440')); t.position.y = h * 0.22; t.rotation.z = (r() - 0.5) * 0.4; g.add(t);
  for (let k = 0; k < 3; k++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(h * (0.24 + r() * 0.08), 9, 7), lam(mixc(c, k % 2 ? '#c8d0a8' : '#4a5a40', r() * 0.35)));
    s.scale.y = 0.7; s.position.set((r() - 0.5) * h * 0.5, h * (0.55 + r() * 0.15), (r() - 0.5) * h * 0.3); g.add(s);
  }
  g.position.set(x, 0, z); return g;
}
/** Assisi on its hill: pale pink-cream stone houses with terracotta roofs, a basilica front, a campanile and the Rocca. */
export function assisi3d({ wall = '#e8d4bc', roof = '#c0623e', hillC = '#7a9a5a', lit = 0 } = {}) {
  const g = new THREE.Group(), r = rng(21);
  const hill = new THREE.Mesh(new THREE.SphereGeometry(60, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), lam(hillC)); hill.scale.set(1.6, 0.42, 0.7); g.add(hill);
  const hy = (x) => 25 * Math.sqrt(Math.max(0, 1 - (x / 96) ** 2));
  for (let k = 0; k < 34; k++) {
    const x = -78 + k * 4.7 + (r() - 0.5) * 2, z = 14 + (r() - 0.5) * 10, h = 3 + r() * 4, w = 3.6 + r() * 1.6;
    const c = mixc(wall, '#ffffff', r() * 0.18), m = box(w, h, 3.4, lam(c)); m.position.set(x, hy(x) + h / 2 - 1, z); g.add(m);
    const rf = new THREE.Mesh(new THREE.ConeGeometry(w * 0.74, 1.4, 4), lam(mixc(roof, '#6a2a1a', r() * 0.3))); rf.rotation.y = Math.PI / 4; rf.scale.z = 0.7; rf.position.set(x, hy(x) + h - 0.3, z); g.add(rf);
    if (lit && r() < 0.5) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.9), glowMat('#ffd98a', lit)); wn.position.set(x, hy(x) + h * 0.55, z + 1.75); g.add(wn); }
  }
  // basilica (left) + campanile
  const bas = box(14, 9, 8, lam(mixc(wall, '#ffffff', 0.2))); bas.position.set(-60, hy(-60) + 3.5, 12); g.add(bas);
  const brf = new THREE.Mesh(new THREE.ConeGeometry(9.8, 4, 4), lam(roof)); brf.rotation.y = Math.PI / 4; brf.scale.z = 0.6; brf.position.set(-60, hy(-60) + 10, 12); g.add(brf);
  const rose = new THREE.Mesh(new THREE.CircleGeometry(1.4, 16), lam('#8a6a5a')); rose.position.set(-60, hy(-60) + 5.5, 16.05); g.add(rose);
  const cmp = box(3.4, 16, 3.4, lam(mixc(wall, '#ffffff', 0.12))); cmp.position.set(-48, hy(-48) + 8, 10); g.add(cmp);
  const crf = new THREE.Mesh(new THREE.ConeGeometry(2.6, 3, 4), lam(roof)); crf.rotation.y = Math.PI / 4; crf.position.set(-48, hy(-48) + 17.5, 10); g.add(crf);
  // the Rocca fortress on the top
  const rk = box(18, 8, 10, lam(mixc(wall, '#8a7a6a', 0.3))); rk.position.set(8, 30, 4); g.add(rk);
  for (let k = -8; k <= 8; k += 3.2) { const mer = box(1.6, 1.6, 10.2, rk.material); mer.position.set(8 + k, 34.8, 4); g.add(mer); }
  const tw = box(5, 14, 5, rk.material); tw.position.set(19, 33, 4); g.add(tw);
  return g;
}

const MODES = {
  hook: { sky: [[0, '#4a72b0'], [0.36, '#9cc0e0'], [0.5, '#f6dcb4'], [0.56, '#fae8c8'], [1, '#fae8c8']], fog: '#e6dcc4', slope: '#8aa85a', valley: '#a8b878',
    hemi: ['#fff4dc', '#5a6a3a', 1.5], key: ['#ffe8c0', 1.4], glow: [820, 880, 0.75], stars: 0, cloud: '#fff6ea', lit: 0 },
  miracle: { sky: [[0, '#3e4a7a'], [0.3, '#8a8ab4'], [0.5, '#f2d4b0'], [0.56, '#f8e2c0'], [1, '#f8e2c0']], fog: '#dcd2c0', slope: '#7e9e56', valley: '#9cae70',
    hemi: ['#fff0d8', '#4a5a3a', 1.35], key: ['#ffe0b0', 1.3], glow: [540, 820, 0.3], stars: 0, cloud: '#f4eee8', lit: 0 },
  glory: { sky: [[0, '#1c1e4a'], [0.34, '#4a3e7a'], [0.48, '#d88a78'], [0.55, '#f8c88a'], [1, '#f8c88a']], fog: '#d8a088', slope: '#6a7e48', valley: '#8a8a58',
    hemi: ['#ffe0c8', '#3a3a40', 1.3], key: ['#ffc890', 1.5], glow: [540, 960, 0.95], stars: 60, cloud: '#f6c0a8', lit: 0.9 },
};

export function subasio(mode = 'hook') {
  const P = MODES[mode], r = rng(mode.length * 17 + 5);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 80, 700);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-40, 50, -60); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 11, 0.85, { el0: 0.2, el1: 0.6 }));
  const sun = sprite(warm, 1000, P.glow[2]); sun.position.copy(atScreen(cam, P.glow[0], P.glow[1], 900)); scene.add(sun);
  // the valley floor, far blue hills, then the near slope of the mountain
  const plain = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), lam(P.valley)); plain.rotation.x = -Math.PI / 2; plain.position.set(0, -6, -700); scene.add(plain);
  scene.add(ridge({ w: 1900, d: 120, z: -560, y: -6, amp: 70, color: mixc('#8a94b8', P.fog, 0.35).getStyle(), seed: 4, freq: 0.45 }));
  scene.add(ridge({ w: 1500, d: 90, z: -420, y: -6, amp: 38, color: mixc('#7a8aa0', P.valley, 0.4).getStyle(), seed: 7, freq: 0.7 }));
  // Assisi on its hill across the valley (left of centre)
  const town = assisi3d({ hillC: mixc(P.slope, P.fog, 0.3).getStyle(), lit: P.lit }); town.position.set(-150, -6, -330); town.rotation.y = 0.25; scene.add(town);
  // cypresses and olive groves on the near slope
  for (let k = 0; k < 26; k++) scene.add(olive3d(-120 + k * 9 + (r() - 0.5) * 6, -60 - r() * 70, 4 + r() * 2.5, 40 + k));
  for (let k = 0; k < 12; k++) scene.add(cypress3d(-90 + k * 16 + (r() - 0.5) * 8, -40 - r() * 60, 10 + r() * 6));
  const slope = new THREE.Mesh(new THREE.PlaneGeometry(600, 160, 60, 10), lam(P.slope));
  { const p = slope.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 0.03) * 1.2 + Math.sin(p.getX(i) * 0.11 + 1) * 0.4); slope.geometry.computeVertexNormals(); }
  slope.rotation.x = -Math.PI / 2; slope.position.set(0, 0, -60); scene.add(slope);
  // the brook (miracle set-up): a winding ribbon of water down the slope
  let water = null;
  if (mode === 'miracle') {
    const streak = canvasTex(64, 256, (g, w, h) => { g.fillStyle = '#7ab0cc'; g.fillRect(0, 0, w, h); const q = rng(5);
      for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(255,255,255,${0.15 + q() * 0.35})`; g.fillRect(q() * w, q() * h, 4 + q() * 14, 2); } });
    streak.wrapS = streak.wrapT = THREE.RepeatWrapping; streak.repeat.set(1, 6);
    const geo = new THREE.PlaneGeometry(3.2, 90, 2, 60), p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { const v = p.getY(i); p.setX(i, p.getX(i) * (1 + (v + 45) / 60) + Math.sin(v * 0.12) * 5); }
    water = new THREE.Mesh(geo, lam('#ffffff', { map: streak, emissive: '#5a90b0', emissiveIntensity: 0.35 }));
    water.rotation.x = -Math.PI / 2; water.position.set(6, 0.06, -52); scene.add(water);
    for (let k = 0; k < 30; k++) { const z = -10 - k * 2.8, x = 6 + Math.sin(-z * 0.12 - 2.5) * 5 + (k % 2 ? 3 : -3) * (1 + (52 + z) / 60);
      const st = new THREE.Mesh(new THREE.SphereGeometry(0.35 + r() * 0.3, 7, 5), lam('#a8a090')); st.scale.y = 0.5; st.position.set(x, 0.1, z); scene.add(st); }
  }
  // clouds, valley mist
  const sky = [[-130, 90, -520, 12, 1], [80, 110, -560, 14, 2], [210, 80, -470, 10, 3]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, P.cloud, 0.62, 60 + sd, 0.5); scene.add(c); return [c, x, sd]; });
  const mist = [[-80, -2, -240, 70], [60, -3, -280, 80], [180, -2, -250, 60]].map(([x, y, z, s], k) => { const m = sprite(mistTex, s, 0.5); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });
  // light breaking through (miracle): a warm glow that swells
  const holy = mode === 'miracle' ? sprite(warm, 260, 0, true) : null;
  if (holy) { holy.position.copy(atScreen(cam, 540, 900, 300)); scene.add(holy); }
  const d0 = 14;
  return { scene, cam, update(t, p) {
    let ry = 0;
    if (mode === 'hook') cam.position.set(0, 2.6, -7 * p);
    else if (mode === 'miracle') {
      const z = 8 * p; cam.position.set(0, 2.6, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
      holy.material.opacity = Math.min(0.32, 0.06 + t * 0.04);
      water.material.map.offset.y = t * 0.35;
    } else { const x = -3 + 6 * p; cam.position.set(x, 2.6, 0); ry = -x * 0.006; }
    sky.forEach(([c, x, k]) => { c.position.x = x + t * (1.2 + k * 0.4); });
    mist.forEach(([m, x, k]) => { m.position.x = x + t * (0.8 + k * 0.3) * (k % 2 ? -1 : 1); });
    sun.material.opacity = P.glow[2] * (0.92 + 0.08 * Math.sin(t * 0.8));
    return { ry };
  } };
}

export const BUILD = { subasioHook: () => subasio('hook'), subasioMiracle: () => subasio('miracle'), subasioGlory: () => subasio('glory') };

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
