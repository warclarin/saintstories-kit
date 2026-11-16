// three.js backgrounds for St. Elizabeth of Hungary: the miracle of the roses (browser module; build.mjs copies it to
// work/<slug>/bg3d.mjs). One snowy Thuringian valley with the Wartburg on its hill, pines and falling snow, in three
// set-ups: 'hook' (winter dusk, push-fast), 'miracle' (warm light breaking behind the castle, a real dolly zoom) and
// 'glory' (rose-gold evening with stars, arc). Characters, props and the near snow stay SVG on top.
// Deterministic: everything is drawn from timeline time. Exported for later reels: castle3d(), pine3d(), winterValley(mode).
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, lam, glowMat, ridge, cloud, sprite, atScreen, makeView, newRenderer, stars } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
// gable roof: a triangular prism running along x (w long, h high, d deep), base at y = 0
function prism(w, h, d, mat) {
  const s = new THREE.Shape(); s.moveTo(-d / 2, 0); s.lineTo(0, h); s.lineTo(d / 2, 0); s.lineTo(-d / 2, 0);
  const geo = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false }); geo.translate(0, 0, -w / 2); geo.rotateY(Math.PI / 2);
  return new THREE.Mesh(geo, mat);
}
const warm = glowTex([[0, 'rgba(255,243,210,1)'], [0.22, 'rgba(255,214,150,.75)'], [0.6, 'rgba(255,170,130,.22)'], [1, 'rgba(255,170,130,0)']]);
const flakeTex = glowTex([[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,.85)'], [1, 'rgba(255,255,255,0)']]);
const winGlow = glowTex([[0, 'rgba(255,226,150,.9)'], [0.5, 'rgba(255,200,120,.3)'], [1, 'rgba(255,200,120,0)']]);

/** The Wartburg in snow: Romanesque hall with lit arcade windows, square keep with a pyramid roof and gold cross,
 * half-timbered wing, curtain wall. Snow on every roof. Base at y = 0, about 36 wide. */
export function castle3d({ wall = '#e8dcc8', roof = '#8a4a3a', timber = '#6b4a2a', win = '#ffd98a', snow = '#f4f6fb', lit = 1 } = {}) {
  const g = new THREE.Group(), m = lam(wall), md = lam(mixc(wall, '#3a3048', 0.22)), rm = lam(roof), sm = lam(snow), wm = glowMat(win);
  const roofed = (w, h, d, y, x, z = 0) => {
    const r = prism(w + 0.6, h, d + 0.8, rm); r.position.set(x, y, z); g.add(r);
    const k = 0.18, s = prism(w + 0.7, h * (1 - k), (d + 0.8) * (1 - k), sm); s.position.set(x, y + h * k + 0.06, z); g.add(s);
  };
  const hall = box(16, 7, 6, m); hall.position.set(0, 3.5, 0); g.add(hall); roofed(16, 3.6, 6, 7, 0);
  for (let k = -3; k <= 3; k++) for (const [y, hh] of [[5.2, 1.5], [2.4, 1.2]]) {
    const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, hh), wm); w.position.set(k * 2.1, y, 3.02); g.add(w);
  }
  const keep = box(4.4, 15, 4.4, m); keep.position.set(11, 7.5, 0.4); g.add(keep);
  const kr = new THREE.Mesh(new THREE.ConeGeometry(3.5, 4.8, 4), rm); kr.rotation.y = Math.PI / 4; kr.position.set(11, 17.4, 0.4); g.add(kr);
  const ks = new THREE.Mesh(new THREE.ConeGeometry(2.7, 3.7, 4), sm); ks.rotation.y = Math.PI / 4; ks.position.set(11, 17.98, 0.4); g.add(ks);
  const gold = glowMat('#f2c46b'); const c1 = box(0.25, 2.2, 0.25, gold); c1.position.set(11, 20.9, 0.4); g.add(c1); const c2 = box(1.2, 0.25, 0.25, gold); c2.position.set(11, 21.4, 0.4); g.add(c2);
  for (const y of [11, 8]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.4), wm); w.position.set(11, y, 2.62); g.add(w); }
  const wing = box(6, 6, 5, lam('#f0e6d4')); wing.position.set(-11, 3, -0.4); g.add(wing); roofed(6, 3, 5, 6, -11, -0.4);
  const tm = lam(timber);
  for (const x of [-13.8, -11, -8.2]) { const b = box(0.3, 6, 0.1, tm); b.position.set(x, 3, 2.12); g.add(b); }
  for (const y of [0.2, 3, 5.8]) { const b = box(6, 0.3, 0.1, tm); b.position.set(-11, y, 2.12); g.add(b); }
  const ww = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.2), wm); ww.position.set(-12.4, 4.2, 2.14); g.add(ww);
  const cw = box(38, 2.6, 1, md); cw.position.set(0, 1.3, 6); g.add(cw);
  for (let k = -18; k <= 18; k += 1.6) { const c = box(0.8, 0.8, 1.05, md); c.position.set(k, 3, 6); g.add(c); }
  const cws = box(38.2, 0.25, 1.2, sm); cws.position.set(0, 2.66, 6); g.add(cws);
  if (lit) [[-4, 5.2], [3, 5.2], [11, 11], [-12.4, 4.2]].forEach(([x, y]) => { const s = sprite(winGlow, 3.2, 0.55 * lit, true); s.position.set(x, y, 3.4); g.add(s); });
  return g;
}
/** A snowy fir: dark blue-green cone with a white cap. Base at (x, 0, z). */
export function pine3d(x, z, h, seed = 1, { c = '#2e4a4e', snow = '#eef2f8' } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const t1 = new THREE.Mesh(new THREE.ConeGeometry(h * 0.3, h * 0.62, 7), lam(mixc(c, '#1a2a30', r() * 0.3))); t1.position.y = h * 0.36; g.add(t1);
  const t2 = new THREE.Mesh(new THREE.ConeGeometry(h * 0.22, h * 0.5, 7), lam(c)); t2.position.y = h * 0.66; g.add(t2);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(h * 0.13, h * 0.3, 7), lam(snow)); cap.position.y = h * 0.86; g.add(cap);
  const skirt = new THREE.Mesh(new THREE.ConeGeometry(h * 0.24, h * 0.12, 7), lam(snow)); skirt.position.y = h * 0.47; g.add(skirt);
  g.position.set(x, 0, z); return g;
}

const MODES = {
  hook: { sky: [[0, '#1c2350'], [0.36, '#3e4680'], [0.5, '#9a7aa0'], [0.56, '#eab0a0'], [1, '#eab0a0']], fog: '#a89cb8', snow: '#d6dcec',
    hemi: ['#dfe4ff', '#4a4060', 1.35], key: ['#ffd0b0', 1.1], glow: [250, 1010, 0.55], castle: [9, -110, 0.65], flakes: 520, stars: 34 },
  miracle: { sky: [[0, '#2a2c5c'], [0.3, '#6a5a8e'], [0.46, '#f2b892'], [0.55, '#ffe2ac'], [1, '#ffe2ac']], fog: '#e8ccb4', snow: '#efe6e4',
    hemi: ['#fff0dc', '#5a4a60', 1.6], key: ['#ffe0b0', 1.8], glow: [540, 930, 1.0], castle: [0, -120, 0.65], flakes: 360, stars: 0, shafts: true },
  glory: { sky: [[0, '#141a40'], [0.38, '#40386e'], [0.52, '#c8808a'], [0.58, '#f6c896'], [1, '#f6c896']], fog: '#c8a0a8', snow: '#e4dce8',
    hemi: ['#ffe8e0', '#4a3a5a', 1.45], key: ['#ffd8b0', 1.3], glow: [540, 1010, 0.85], castle: [12, -170, 0.6], flakes: 220, stars: 60 },
};

export function winterValley(mode = 'hook') {
  const P = MODES[mode], r = rng(mode.length * 11 + 5);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 60, 640);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-50, 40, -60); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.035);
  if (P.stars) scene.add(stars(P.stars, 7 + mode.length, 0.8, { el0: 0.2, el1: 0.6 }));
  const sun = sprite(warm, 1000, P.glow[2]); sun.position.copy(atScreen(cam, P.glow[0], P.glow[1], 900)); scene.add(sun);
  // snow plain and far ranges
  const plain = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), lam(P.snow)); plain.rotation.x = -Math.PI / 2; plain.position.set(0, 0, -600); scene.add(plain);
  scene.add(ridge({ w: 1700, d: 90, z: -430, amp: 70, color: mixc(P.snow, P.fog, 0.45).getStyle(), seed: 3, freq: 0.6 }));
  scene.add(ridge({ w: 1300, d: 70, z: -300, amp: 34, color: mixc(P.snow, '#6a7090', 0.32).getStyle(), seed: 8, freq: 1.0 }));
  scene.add(ridge({ w: 900, d: 50, z: -190, amp: 12, color: mixc(P.snow, '#8a90b0', 0.18).getStyle(), seed: 12, freq: 1.6 }));
  // the castle hill (snowy mound with firs) and the Wartburg on top
  const [cx, cz, cs] = P.castle;
  const mound = new THREE.Mesh(new THREE.SphereGeometry(26, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), lam(mixc(P.snow, '#7a8098', 0.12)));
  mound.scale.set(1, 0.3, 0.55); mound.position.set(cx, 0, cz); scene.add(mound);
  const castle = castle3d({ lit: 1 }); castle.scale.setScalar(cs); castle.position.set(cx, 7.4, cz + 1); scene.add(castle);
  for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI - Math.PI / 2 + (r() - 0.5) * 0.2, d = 18 + r() * 7;
    scene.add(pine3d(cx + Math.sin(a) * d, cz + 8 + Math.cos(a) * 6 * r(), 4 + r() * 3, 20 + k)); }
  // firs on both sides of the valley, nearer
  for (let k = 0; k < 26; k++) { const side = k % 2 ? 1 : -1, x = side * (12 + r() * 26), z = -24 - r() * 120;
    scene.add(pine3d(x, z, 5 + r() * 6, 40 + k)); }
  // clouds
  const sky = [[-110, 80, -480, 10, 1], [60, 96, -520, 12, 2], [190, 70, -440, 9, 3]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, mode === 'hook' ? '#9a8cb8' : '#ffe0d0', 0.55, 70 + sd, 0.5); scene.add(c); return [c, x, sd]; });
  // low mist over the snow
  const mist = [[-24, 0.8, -60, 1.8], [18, 0.7, -80, 2.0], [-4, 1.0, -130, 2.6]].map(([x, y, z, s], k) => {
    const c = cloud(x, y, z, s, mode === 'miracle' ? '#fff0dc' : '#e8e4f0', 0.26, 90 + k, 0.4); scene.add(c); return [c, x, k]; });
  // light shafts behind the castle (the miracle)
  const shafts = [];
  if (P.shafts) {
    const shM = new THREE.MeshBasicMaterial({ color: '#ffe8b8', transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    [[-16, -0.32], [-3, -0.12], [10, 0.08], [22, 0.26]].forEach(([x, rz]) => { const s = new THREE.Mesh(new THREE.PlaneGeometry(9, 140), shM); s.position.set(cx + x, 40, cz - 30); s.rotation.z = rz; scene.add(s); shafts.push(s); });
  }
  // falling snow: a box of flakes in front of the camera, positions from timeline time only
  const N = P.flakes, base = [], pos = new Float32Array(N * 3);
  for (let k = 0; k < N; k++) base.push([(r() - 0.5) * 30, r() * 16, -3 - r() * 42, 0.7 + r() * 0.8, r() * 6.3]);
  const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const flakes = new THREE.Points(fg, new THREE.PointsMaterial({ size: 0.16, map: flakeTex, color: '#ffffff', transparent: true, opacity: 0.9, depthWrite: false, fog: false }));
  scene.add(flakes);
  const d0 = 14;
  return { scene, cam, update(t, p) {
    let ry = 0;
    if (mode === 'hook') cam.position.set(0, 2.6, -6 * p);                                  // push in toward the castle
    else if (mode === 'miracle') {                                                             // dolly zoom: back away while zooming in
      const z = 10 * p; cam.position.set(0, 2.6, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    } else { const x = 3 - 6 * p; cam.position.set(x, 2.6, 0); ry = x * 0.006; }             // arc-l
    for (let k = 0; k < N; k++) {
      const [x0, y0, z0, v, ph] = base[k];
      pos[k * 3] = x0 + Math.sin(t * 0.7 + ph) * 0.6; pos[k * 3 + 1] = (((y0 - t * v) % 16) + 16) % 16 - 1; pos[k * 3 + 2] = z0 + cam.position.z;
    }
    fg.attributes.position.needsUpdate = true;
    sky.forEach(([c, x, k]) => { c.position.x = x + t * (1 + k * 0.4); });
    mist.forEach(([c, x, k]) => { c.position.x = x + t * (0.5 + k * 0.2) * (k % 2 ? -1 : 1); });
    shafts.forEach((s, k) => { s.material.opacity = 0.1 + 0.05 * Math.sin(t * 0.9 + k * 2); });
    sun.material.opacity = P.glow[2] * (0.92 + 0.08 * Math.sin(t * 0.8));
    return { ry };
  } };
}

export const BUILD = { valleyHook: () => winterValley('hook'), valleyMiracle: () => winterValley('miracle'), valleyGlory: () => winterValley('glory') };

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
