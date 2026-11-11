// three.js backgrounds for St. George and the dragon (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// One 3D lake of Silene in three set-ups: 'murk' (city in terror, pan-l: far walls, poison haze), 'shore' (George rides
// by, pan-r: misty shore with reeds), 'light' (the belt, a real dolly zoom toward light breaking through the mist).
// The characters, dragon, horse and near shore stay 2D SVG on top. Deterministic: drawn from timeline time only.
// Reuses the helpers and wiring of bakhita_freedom.bg3d.js (copied next to this file as bakhita.bg3d.js); setting
// BG3D_MANUAL first stops that module from starting its own renderers.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, canvasTex, skyTex, glowTex, lam, glowMat, ridge, cloud, sprite, atScreen, makeView, newRenderer } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
function streakTex(seed, color) {
  const r = rng(seed);
  const t = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512);
    for (let k = 0; k < 90; k++) { const x = r() * 256, y = r() * 512, w = 12 + r() * 50; g.fillStyle = `rgba(${color},${0.1 + r() * 0.3})`; g.fillRect(x, y, w, 2 + r() * 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
const warm = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
const toxic = glowTex([[0, 'rgba(170,230,150,.9)'], [0.4, 'rgba(140,210,130,.35)'], [1, 'rgba(120,190,120,0)']]);

// Silene on the far shore: a crenellated wall with towers and a dark gate, domed houses behind
function silene(x, z, c) {
  const g = new THREE.Group(), r = rng(31), m = lam(c), d = lam(mixc(c, '#1e2a2e', 0.25));
  const wall = box(64, 7, 2, m); wall.position.set(0, 3.5, 0); g.add(wall);
  for (let k = -31; k < 32; k += 2.4) { const mer = box(1.3, 1.3, 2.1, m); mer.position.set(k, 7.6, 0); g.add(mer); }
  for (const tx of [-30, -9, 9, 30]) { const tw = box(4.2, 11, 4.2, d); tw.position.set(tx, 5.5, 0.4); g.add(tw);
    for (const dx of [-1.4, 0, 1.4]) { const mer = box(1, 1.2, 4.3, d); mer.position.set(tx + dx, 11.6, 0.4); g.add(mer); } }
  const gate = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 5), lam('#2a2224')); gate.position.set(0, 2.5, 1.05); g.add(gate);
  const arch = new THREE.Mesh(new THREE.CircleGeometry(2.1, 16, 0, Math.PI), gate.material); arch.position.set(0, 5, 1.05); g.add(arch);
  for (let k = 0; k < 16; k++) {
    const hx = -28 + k * 3.8 + (r() - 0.5), hh = 7 + r() * 6, hc = mixc(c, '#ffffff', 0.08 + r() * 0.1);
    const h = box(3.4, hh, 3.4, lam(hc)); h.position.set(hx, hh / 2, -5 - r() * 6); g.add(h);
    if (r() < 0.55) { const dm = new THREE.Mesh(new THREE.SphereGeometry(1.7, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), lam(mixc(hc, '#ffffff', 0.12))); dm.position.set(hx, hh, h.position.z); g.add(dm); }
  }
  g.position.set(x, 0, z); return g;
}
function reeds(x, z, n, seed, c) {
  const g = new THREE.Group(), r = rng(seed), m = lam(c);
  for (let k = 0; k < n; k++) {
    const h = 1.4 + r() * 1.6, rd = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.06, h, 5), m);
    rd.position.set((r() - 0.5) * 3, h / 2, (r() - 0.5) * 2); rd.rotation.z = (r() - 0.5) * 0.25; g.add(rd);
  }
  g.position.set(x, 0, z); return g;
}

const MODES = {
  murk: { sky: [[0, '#16222a'], [0.34, '#2e4448'], [0.5, '#5e7262'], [0.56, '#7e8e72'], [1, '#7e8e72']], fog: '#6e8270', water: '#2e5248',
    hemi: ['#b8d0b0', '#1e2a24', 1.3], key: ['#d8e0b0', 1.2], city: true, haze: true, sun: [300, 760, 0.35], cam: [0, 2.6, 0, 0.032] },
  shore: { sky: [[0, '#1a262c'], [0.36, '#344a4c'], [0.52, '#6a7e6c'], [0.58, '#8a9a7c'], [1, '#8a9a7c']], fog: '#7a8e7a', water: '#335a4e',
    hemi: ['#c0d4b8', '#1e2a24', 1.4], key: ['#e8e4c0', 1.4], city: false, haze: false, sun: [760, 820, 0.5], cam: [0, 2.4, 0, 0.03] },
  light: { sky: [[0, '#22303a'], [0.3, '#4e6260'], [0.46, '#b8b48a'], [0.54, '#f0dca0'], [1, '#f0dca0']], fog: '#b8b890', water: '#3e6a5a',
    hemi: ['#fff0c8', '#2a3a30', 1.7], key: ['#ffe6a8', 2.0], city: false, haze: false, sun: [560, 900, 1.0], cam: [0, 2.6, 0, 0.03] },
};

export function lake(mode = 'murk') {
  const M = MODES[mode], r = rng(mode.length * 7 + 3);
  const scene = new THREE.Scene();
  scene.background = skyTex(M.sky);
  scene.fog = new THREE.Fog(M.fog, 50, mode === 'light' ? 620 : 520);
  scene.add(new THREE.HemisphereLight(M.hemi[0], M.hemi[1], M.hemi[2]));
  const key = new THREE.DirectionalLight(M.key[0], M.key[1]); key.position.set(-40, 50, -80); scene.add(key);
  // water with drifting light streaks
  const water = new THREE.Mesh(new THREE.PlaneGeometry(800, 900), lam(M.water)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -440); scene.add(water);
  const st = streakTex(mode.length, mode === 'light' ? '255,232,180' : '200,230,200'); st.repeat.set(6, 30);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(90, 300), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: mode === 'light' ? 0.6 : 0.4, depthWrite: false }));
  sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, 0.03, -150); scene.add(sheen);
  // far shore, hills
  const shore = new THREE.Mesh(new THREE.PlaneGeometry(900, 60), lam(mixc(M.water, '#4a5a3a', 0.6))); shore.rotation.x = -Math.PI / 2; shore.position.set(0, 0.05, -150); scene.add(shore);
  scene.add(ridge({ w: 1400, d: 80, z: -330, amp: 44, color: mixc(M.fog, '#2a3a34', 0.35).getStyle(), seed: 5, freq: 0.7 }));
  scene.add(ridge({ w: 1000, d: 60, z: -210, amp: 20, color: mixc(M.fog, '#2a3a34', 0.55).getStyle(), seed: 9, freq: 1.2 }));
  if (M.city) scene.add(silene(4, -140, '#a8987a'));
  // reeds in the shallows
  [[-11, -16, 22, 1], [12, -20, 20, 2], [-20, -34, 26, 3], [24, -40, 24, 4], [-6, -46, 14, 5]].forEach(([x, z, n, s]) => scene.add(reeds(x, z, n, s + mode.length, '#2a3a2a')));
  // low mist banks on the water
  const mist = [[-26, 0.8, -55, 1.6], [14, 0.7, -70, 1.9], [34, 0.9, -95, 2.2], [-10, 1.0, -120, 2.4]].map(([x, y, z, s], k) => {
    const c = cloud(x, y, z, s, mode === 'light' ? '#f0e8c8' : '#c8d8c4', mode === 'light' ? 0.28 : 0.3, 40 + k, 0.3); scene.add(c); return [c, x, k]; });
  // sky clouds, far away
  const sky = [[-90, 70, -420, 9, 1], [70, 88, -460, 11, 2], [170, 62, -380, 8, 3]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, mode === 'light' ? '#fff0d0' : '#9aaa98', mode === 'light' ? 0.6 : 0.5, 60 + sd, mode === 'light' ? 0.6 : 0.3); scene.add(c); return [c, x, sd]; });
  const cam = camera(...M.cam);
  const sunS = sprite(warm, 900, M.sun[2]); sunS.position.copy(atScreen(cam, M.sun[0], M.sun[1], 900)); scene.add(sunS);
  // light shafts (the belt scene)
  const shafts = [];
  if (mode === 'light') {
    const shM = new THREE.MeshBasicMaterial({ color: '#ffe8b0', transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    [[-14, -0.35], [-2, -0.2], [12, -0.05]].forEach(([x, rz]) => { const s = new THREE.Mesh(new THREE.PlaneGeometry(9, 120), shM); s.position.set(x, 30, -170); s.rotation.z = rz; scene.add(s); shafts.push(s); });
  }
  // the dragon's poison haze: green glows drifting over the water (city in terror)
  const haze = [];
  if (M.haze) for (let k = 0; k < 14; k++) {
    const s = sprite(toxic, 8 + r() * 10, 0.5, true); s.position.set(-30 + r() * 60, 1 + r() * 6, -30 - r() * 70); scene.add(s); haze.push([s, s.position.y, r() * 6.3]);
  }
  const d0 = 12;
  return { scene, cam, update(t, p) {
    if (mode === 'murk') cam.position.set(3.2 - 6.4 * p, 2.6, 0);          // pan-l: truck left along the shore
    else if (mode === 'shore') cam.position.set(-3.2 + 6.4 * p, 2.4, 0);   // pan-r: truck right
    else {                                                                  // dolly zoom: back away while zooming in
      const z = 9 * p; cam.position.set(0, 2.6, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    }
    st.offset.y = -t * 0.03; st.offset.x = Math.sin(t * 0.6) * 0.02;
    mist.forEach(([c, x, k]) => { c.position.x = x + t * (0.5 + k * 0.2) * (k % 2 ? -1 : 1); });
    sky.forEach(([c, x, k]) => { c.position.x = x + t * (1.0 + k * 0.4); });
    haze.forEach(([s, y0, ph], k) => { s.position.y = y0 + 0.4 * Math.sin(t * 0.8 + ph); s.material.opacity = 0.35 + 0.2 * Math.sin(t * 1.3 + ph); s.position.x += 0; });
    shafts.forEach((s, k) => { s.material.opacity = 0.09 + 0.04 * Math.sin(t * 0.9 + k * 2); });
    return {};
  } };
}

export const BUILD = { lakeMurk: () => lake('murk'), lakeShore: () => lake('shore'), lakeLight: () => lake('light') };

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
