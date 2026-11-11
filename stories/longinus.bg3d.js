// three.js backgrounds for St. Longinus (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// Golgotha in three set-ups: 'storm' (hook, push-fast toward the three crosses), 'dawn' (the miracle, a real dolly zoom:
// the Cross looms behind the kneeling centurion), 'dusk' (feast-day portrait, arc-r around him); and 'cappadocia'
// (preaching among the rock chimneys, pan-l: the camera trucks left through the valley).
// Christ on the Cross is only a dark silhouette with a gold halo, far away. The characters, the near ground and the
// props stay 2D SVG on top. Deterministic: drawn from timeline time only. Reuses bakhita_freedom.bg3d.js helpers
// (copied next to this file as bakhita.bg3d.js); BG3D_MANUAL stops that module from starting its own renderers.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, skyTex, glowTex, lam, glowMat, ridge, cloud, stars, sprite, atScreen, makeView, newRenderer } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
const pale = glowTex([[0, 'rgba(255,248,230,.9)'], [0.3, 'rgba(255,236,200,.4)'], [1, 'rgba(255,230,190,0)']]);

// A wooden cross; fig: the silhouette of Christ with a gold halo ring
function cross(h, c, fig) {
  const g = new THREE.Group(), m = lam(c);
  const post = box(0.55, h, 0.5, m); post.position.y = h / 2; g.add(post);
  const bar = box(h * 0.56, 0.5, 0.48, m); bar.position.y = h * 0.8; g.add(bar);
  if (fig) {
    const fm = lam(mixc(c, '#000000', 0.35));
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), fm); head.position.set(0, h * 0.8 + 0.42, 0.35); g.add(head);
    const body = box(0.78, h * 0.3, 0.3, fm); body.position.set(0, h * 0.8 - h * 0.15, 0.35); g.add(body);
    const legs = box(0.42, h * 0.24, 0.28, fm); legs.position.set(0, h * 0.8 - h * 0.42, 0.35); g.add(legs);
    for (const s of [-1, 1]) { const arm = box(h * 0.22, 0.24, 0.26, fm); arm.position.set(s * h * 0.13, h * 0.8 + 0.05, 0.35); arm.rotation.z = s * 0.08; g.add(arm); }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.07, 8, 40), new THREE.MeshBasicMaterial({ color: '#f2c46b', fog: false }));
    ring.position.set(0, h * 0.8 + 0.42, 0.2); g.add(ring);
    const hg = sprite(warm, 3.4, 0.9); hg.position.set(0, h * 0.8 + 0.42, 0.1); g.add(hg);
  }
  return g;
}
// Golgotha: a bare rounded mound with three crosses (Christ's in the middle, a little higher)
function hillOfCrosses(x, z, c, crossC) {
  const g = new THREE.Group();
  const mound = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2), lam(c));
  mound.scale.set(30, 5, 16); g.add(mound);
  const r = rng(5);
  for (let k = 0; k < 18; k++) {   // stones on the slope
    const a = r() * Math.PI * 2, d = 0.4 + r() * 0.55, s = 0.3 + r() * 0.5;
    const st = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), lam(mixc(c, '#000000', 0.15 + r() * 0.1)));
    const px = Math.cos(a) * d * 30, pz = Math.sin(a) * d * 16; st.position.set(px, 5 * Math.sqrt(Math.max(0, 1 - d * d)), pz); g.add(st);
  }
  const c0 = cross(8.5, crossC, true); c0.position.set(0, 4.8, 0); g.add(c0);
  const cl = cross(6.6, crossC, false); cl.position.set(-9, 4.3, 1.5); cl.rotation.y = 0.25; g.add(cl);
  const cr = cross(6.6, crossC, false); cr.position.set(9, 4.3, 1.5); cr.rotation.y = -0.25; g.add(cr);
  g.position.set(x, 0, z); return g;
}
// Jerusalem far off: a long wall with towers and blocky houses
function city(x, z, c) {
  const g = new THREE.Group(), r = rng(17), m = lam(c), d = lam(mixc(c, '#1a1424', 0.25));
  const wall = box(70, 6, 2, m); wall.position.set(0, 3, 0); g.add(wall);
  for (const tx of [-34, -16, 2, 20, 34]) { const tw = box(4, 10, 4, d); tw.position.set(tx, 5, 0.5); g.add(tw); }
  for (let k = 0; k < 18; k++) { const hh = 6 + r() * 7, h = box(3.4, hh, 3.4, lam(mixc(c, '#ffffff', r() * 0.1))); h.position.set(-32 + k * 3.8, hh / 2, -4 - r() * 6); g.add(h); }
  const temple = box(16, 14, 10, lam(mixc(c, '#ffffff', 0.12))); temple.position.set(-6, 7, -10); g.add(temple);
  g.position.set(x, 0, z); return g;
}

const GOL = {
  storm: { sky: [[0, '#120f20'], [0.3, '#2a2040'], [0.48, '#5a3456'], [0.58, '#93485a'], [1, '#b8624e']], fog: '#5a3a50', ground: '#4a2e40',
    hill: '#4a2e40', crossC: '#2e1c28', hemi: ['#d8a0b0', '#1a1020', 1.2], key: ['#ffb090', 1.0], glow: 0.75, starsN: 30, clouds: '#4a3a5a', hx: 4, cityX: -70 },
  dawn: { sky: [[0, '#241f4a'], [0.3, '#6a4878'], [0.46, '#d88a6a'], [0.56, '#f8c88a'], [1, '#f8c88a']], fog: '#c88a7a', ground: '#5a3a4e',
    hill: '#5a3a4e', crossC: '#36202e', hemi: ['#ffd0b0', '#2a1a2a', 1.6], key: ['#ffd8a0', 1.6], glow: 0.75, starsN: 20, clouds: '#f0b0a0', hx: 0, cityX: -80 },
  dusk: { sky: [[0, '#1e1b48'], [0.32, '#5e3c6e'], [0.48, '#c06a6a'], [0.58, '#f0a070'], [1, '#f8c07a']], fog: '#a86a78', ground: '#4a3048',
    hill: '#5a3a5a', crossC: '#2e1e34', hemi: ['#f0c0c8', '#201428', 1.4], key: ['#ffc8a0', 1.3], glow: 0.85, starsN: 50, clouds: '#ffc9b0', hx: 0, cityX: -90 },
};
export function golgotha(mode = 'storm') {
  const M = GOL[mode];
  const scene = new THREE.Scene();
  scene.background = skyTex(M.sky);
  scene.fog = new THREE.Fog(M.fog, 80, 560);
  scene.add(new THREE.HemisphereLight(M.hemi[0], M.hemi[1], M.hemi[2]));
  const key = new THREE.DirectionalLight(M.key[0], M.key[1]); key.position.set(30, 40, -90); scene.add(key);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), lam(M.ground)); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  scene.add(ridge({ w: 1600, d: 90, z: -420, amp: 40, color: mixc(M.fog, '#1a1020', 0.35).getStyle(), seed: 3, freq: 0.8 }));
  scene.add(ridge({ w: 1200, d: 70, z: -260, amp: 14, color: mixc(M.fog, '#1a1020', 0.5).getStyle(), seed: 6, freq: 1.3 }));
  scene.add(city(M.cityX, -200, mixc(M.fog, '#e6d0a6', 0.35).getStyle()));
  const st = M.starsN ? stars(M.starsN, mode.length * 3, 0.8, { size: 6, el0: 0.2, el1: 0.7, spread: 1.4 }) : null; if (st) scene.add(st);
  const cam = camera(M.hx, 3, 0, 0.0);
  const hillX = mode === 'storm' ? 11 : 0, hillZ = mode === 'dusk' ? -90 : -72;
  const back = sprite(warm, mode === 'dawn' ? 34 : 46, M.glow); back.position.set(hillX, 14, hillZ - 6); scene.add(back);
  scene.add(hillOfCrosses(hillX, hillZ, M.hill, M.crossC));
  // rays from behind the Cross (dawn: the miracle)
  const rays = [];
  if (mode === 'dawn') {
    const rm = new THREE.MeshBasicMaterial({ color: '#fff0c8', transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    const pivot = new THREE.Group(); pivot.position.set(hillX, 12.5, hillZ - 8); scene.add(pivot);
    for (let k = 0; k < 12; k++) { const s = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 140), rm); s.position.y = 70; const arm = new THREE.Group(); arm.rotation.z = (k / 12) * Math.PI * 2; arm.add(s); pivot.add(arm); }
    rays.push(pivot);
  }
  const clouds = [[-70, 46, -300, 7, 1], [40, 60, -340, 8, 2], [120, 40, -280, 6, 3], [-140, 56, -360, 9, 4]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, M.clouds, mode === 'storm' ? 0.75 : 0.55, 70 + sd, mode === 'storm' ? 0.2 : 0.5); scene.add(c); return [c, x, sd]; });
  // dust blowing low over the ground (storm)
  const dust = [];
  if (mode === 'storm') for (let k = 0; k < 8; k++) {
    const s = sprite(pale, 6 + k % 3 * 3, 0.12); s.position.set(-30 + k * 8, 1.2, -30 - (k % 4) * 12); scene.add(s); dust.push([s, s.position.x, k]);
  }
  const d0 = 12;
  return { scene, cam, update(t, p) {
    let o = {};
    if (mode === 'storm') cam.position.set(M.hx, 3 + 0.4 * p, -8 * p);   // push-fast: rush toward the hill, rising a little
    else if (mode === 'dawn') {                                          // dolly zoom: back away while zooming in
      const z = 10 * p; cam.position.set(0, 3, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
      rays[0].rotation.z = t * 0.05;
    } else {                                                             // arc-r around the portrait
      const a = -0.12 + 0.24 * p, R = 30;
      cam.position.set(Math.sin(a) * R, 3, -R + Math.cos(a) * R);
      o = { ry: a * 0.9, rz: (p - 0.5) * 0.012 };
    }
    back.material.opacity = M.glow * (0.9 + 0.1 * Math.sin(t * 1.6));
    clouds.forEach(([c, x, k]) => { c.position.x = x + t * (mode === 'storm' ? 2.2 : 0.9) * (k % 2 ? 1 : 0.7); });
    dust.forEach(([s, x, k]) => { s.position.x = x + t * (3 + k % 3); s.material.opacity = 0.08 + 0.05 * Math.sin(t * 1.4 + k); });
    if (st) st.material.opacity = 0.55 + 0.25 * Math.sin(t * 2.1);
    return o;
  } };
}

// Cappadocia: rock chimneys ("fairy chimneys") with dark caps and cave doors on a warm valley floor
function chimney(x, z, h, w, c, seed) {
  const g = new THREE.Group(), r = rng(seed);
  const pts = []; for (let i = 0; i <= 12; i++) { const v = i / 12; pts.push(new THREE.Vector2(w * (1 - v) ** 1.3 * 0.86 + w * 0.14, v * h)); }
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 28), lam(c)); g.add(body);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), lam(mixc(c, '#3a2418', 0.55))); cap.scale.set(w * 0.42, w * 0.22, w * 0.42); cap.position.y = h + w * 0.05; g.add(cap);
  const dm = glowMat('#3a2418');
  for (let k = 0; k < 1 + (seed % 3); k++) {
    const v = 0.15 + r() * 0.5, rad = w * (1 - v) ** 1.3 * 0.86 + w * 0.14, a = (r() - 0.5) * 1.2;
    const door = new THREE.Mesh(new THREE.CircleGeometry(Math.min(0.5, rad * 0.22), 12), dm);
    door.position.set(Math.sin(a) * (rad + 0.02), v * h, Math.cos(a) * (rad + 0.02)); door.rotation.y = a; g.add(door);
  }
  g.position.set(x, 0, z); return g;
}
export function cappadocia() {
  const scene = new THREE.Scene();
  scene.background = skyTex([[0, '#3d7fb8'], [0.32, '#7ab6dc'], [0.48, '#cfe4ec'], [0.56, '#f2dcb4'], [1, '#f2dcb4']]);
  scene.fog = new THREE.Fog('#e8d4b4', 60, 520);
  scene.add(new THREE.HemisphereLight('#fff4e0', '#8a6a4a', 1.7));
  const key = new THREE.DirectionalLight('#fff0d0', 2.0); key.position.set(60, 70, 40); scene.add(key);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), lam('#c49a6e')); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  scene.add(ridge({ w: 1600, d: 90, z: -420, amp: 50, color: '#c8b0a0', seed: 11, freq: 0.7 }));
  scene.add(ridge({ w: 1200, d: 80, z: -260, amp: 22, color: '#d8b48c', seed: 12, freq: 1.1 }));
  const r = rng(77), C = ['#e8d0aa', '#dcc098', '#f0dcb8', '#d8b088'];
  // near row (keeps a gap behind the preacher), middle and far clusters
  [[-26, -34, 8, 2.6], [-17, -44, 11, 3.0], [-11, -38, 6, 2.2], [11, -40, 7, 2.4], [17, -48, 12, 3.2], [27, -36, 9, 2.8], [36, -52, 10, 3.0], [-36, -50, 9, 2.8]]
    .forEach(([x, z, h, w], i) => scene.add(chimney(x, z, h, w, C[i % 4], 10 + i)));
  for (let k = 0; k < 26; k++) { const x = -110 + r() * 220, z = -80 - r() * 130, h = 8 + r() * 12; scene.add(chimney(x, z, h, 2.4 + h * 0.15, C[k % 4], 40 + k)); }
  for (let k = 0; k < 14; k++) {   // shrubs
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.6 + r() * 0.6, 10, 8), lam('#7a8a4a')); s.scale.y = 0.6; s.position.set(-40 + r() * 80, 0.3, -24 - r() * 40); scene.add(s);
  }
  const cam = camera(0, 3, 0, 0.0);
  const sunS = sprite(warm, 700, 0.9); sunS.position.copy(atScreen(cam, 830, 620, 900)); scene.add(sunS);
  const cl = [[-90, 80, -400, 9, 1], [60, 100, -440, 10, 2], [160, 70, -380, 8, 3]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, '#ffffff', 0.85, 90 + sd, 0.6); scene.add(c); return [c, x, sd]; });
  return { scene, cam, update(t, p) {
    cam.position.set(7 - 14 * p, 3, 0);   // pan-l: truck left through the valley
    cl.forEach(([c, x, k]) => { c.position.x = x + t * (1.2 + k * 0.3); });
    return {};
  } };
}

export const BUILD = { golStorm: () => golgotha('storm'), golDawn: () => golgotha('dawn'), golDusk: () => golgotha('dusk'), cappadocia };

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
