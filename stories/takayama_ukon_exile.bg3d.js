// three.js backgrounds for Blessed Justo Takayama Ukon, "The Samurai of Christ" (browser module; build.mjs copies it to
// work/<slug>/bg3d.mjs). 'castleDusk' (hook, push-fast: his castle keep at dusk, windows lit, pines and hills),
// 'castleStorm' (the choice, dolly zoom: storm clouds roll in and the windows go dark when he gives the castle up),
// 'manilaBay' (the ship arrives, pan-r: the tropical bay from santo_nino_cebu.bg3d.js). Characters stay 2D SVG on top.
// Deterministic: every frame is drawn from timeline time only. Helpers come from bakhita_freedom.bg3d.js (copied next to
// this file as bakhita.bg3d.js), the bay from santo_nino_cebu.bg3d.js (copied as santo.bg3d.js).
// Exported for later reels: japanCastle(mode), castleKeep().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, skyTex, glowTex, lam, glowMat, ridge, cloud, sprite, atScreen, makeView, newRenderer, stars } = B;
window.BG3D_LIB = true;
const S = await import('./santo.bg3d.js');
window.BG3D_LIB = false;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
const winT = glowTex([[0, 'rgba(255,226,150,1)'], [0.4, 'rgba(255,200,110,.6)'], [1, 'rgba(255,180,90,0)']]);

/** A Japanese castle keep: stone base (sloped), three white storeys with dark hipped roofs, gold roof fish. Returns
 * { group, windows } (window glow sprites, so callers can fade them). Base at y 0, about 1.0 + 3 storeys tall at s = 1. */
export function castleKeep({ wall = '#efe9dc', roof = '#353b4a', stone = '#7a746a', s = 1 } = {}) {
  const g = new THREE.Group(), windows = [];
  const base = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 9, 4, 4, 1), lam(stone)); base.rotation.y = Math.PI / 4; base.position.y = 2; g.add(base);
  let y = 4;
  [[10, 3.6], [7.4, 3.2], [5, 2.8]].forEach(([w, h], i) => {
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * 0.8), lam(wall)); body.position.y = y + h / 2; g.add(body);
    // a row of small windows on the front face
    const n = 4 - i;
    for (let k = 0; k < n; k++) {
      const wx = (k - (n - 1) / 2) * (w / (n + 0.6));
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.8), glowMat('#3a3030')); pane.position.set(wx, y + h * 0.5, w * 0.4 + 0.02); g.add(pane);
      const gl = sprite(winT, 2.6, 0.9, true); gl.position.set(wx, y + h * 0.5, w * 0.4 + 0.3); g.add(gl); windows.push(gl);
    }
    y += h;
    // hipped roof with a wide overhang
    const rf = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.32, w * 0.86, 1.6, 4, 1), lam(roof)); rf.rotation.y = Math.PI / 4; rf.scale.z = 0.8; rf.position.y = y + 0.7; g.add(rf);
    y += 1.2;
  });
  const ridgeTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 0.4), lam(roof)); ridgeTop.position.y = y + 0.2; g.add(ridgeTop);
  [-1, 1].forEach((sd) => { const fish = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.9, 6), glowMat('#e8b84a')); fish.position.set(sd * 1.2, y + 0.75, 0); fish.rotation.z = -sd * 0.4; g.add(fish); });
  g.scale.setScalar(s);
  return { group: g, windows };
}
function pine(x, z, h, c, seed) {
  const g = new THREE.Group(), r = rng(seed);
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, h * 0.5, 6), lam('#3a2a22')); tr.position.y = h * 0.25; g.add(tr);
  for (let k = 0; k < 3; k++) { const c1 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 6), lam(c)); const s = h * (0.26 - k * 0.05); c1.scale.set(s * 1.6, s * 0.5, s * 1.2); c1.position.set((r() - 0.5) * h * 0.2, h * (0.5 + k * 0.17), 0); g.add(c1); }
  g.position.set(x, 0, z); return g;
}

const MODES = {
  dusk: { sky: [[0, '#2a2a52'], [0.34, '#6a4a6a'], [0.5, '#e0906a'], [0.58, '#f4c088'], [1, '#f4c088']], fog: '#a8786a', hills: ['#5a4a5e', '#3e3848'],
    ground: '#5a5048', hemi: ['#ffd8b0', '#2a2228', 1.25], key: ['#ffb880', 1.2], sun: [820, 900, 0.75], clouds: '#e0a090', cop: 0.6, lit: 1, star: 0.4, keep: 1.8, kx: 15 },
  storm: { sky: [[0, '#1a1c26'], [0.34, '#2e3240'], [0.52, '#5a5e6a'], [0.6, '#7a7a82'], [1, '#7a7a82']], fog: '#4e5058', hills: ['#3a3c46', '#2a2c34'],
    ground: '#3e3c40', hemi: ['#a8b0c0', '#18181e', 1.1], key: ['#c8d0e0', 0.6], sun: [540, 900, 0.15], clouds: '#4a4c58', cop: 0.85, lit: 1, star: 0, keep: 1.4, kx: -9 },
};
// dimAt: seconds from scene start when the castle windows go dark ("He gave up his castle"), set from `info`
export function japanCastle(mode = 'dusk', { dimAt = 99 } = {}) {
  const P = MODES[mode];
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 40, 420);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-40, 50, 30); scene.add(key);
  if (P.star) scene.add(stars(50, 9, P.star, { el0: 0.25 }));
  const gnd = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), lam(P.ground)); gnd.rotation.x = -Math.PI / 2; gnd.position.set(0, 0, -300); scene.add(gnd);
  scene.add(ridge({ w: 1400, d: 90, z: -330, amp: 70, color: mixc(P.hills[0], P.fog, 0.35).getStyle(), seed: 5, freq: 0.7 }));
  scene.add(ridge({ w: 1000, d: 60, z: -200, amp: 26, color: P.hills[1], seed: 8, freq: 1.2 }));
  // the castle on its hill, framed by pines
  const { group: keep, windows } = castleKeep({ s: P.keep });
  keep.position.set(P.kx, 0, -160); scene.add(keep);
  const r = rng(mode.length * 13);
  for (let k = 0; k < 26; k++) {
    const side = k % 2 ? 1 : -1, x = side * (22 + r() * 70), z = -90 - r() * 100;
    scene.add(pine(x, z, 5 + r() * 5, mode === 'dusk' ? '#2e3a30' : '#262c2a', 40 + k));
  }
  const cam = camera(0, 2.4, 8, 0.0);
  const sunS = sprite(warm, 800, P.sun[2]); sunS.position.copy(atScreen(cam, P.sun[0], P.sun[1], 700)); scene.add(sunS);
  const cl = [[-70, 70, -300, 10, 1], [40, 86, -340, 13, 2], [110, 60, -260, 9, 3], [-20, 100, -380, 15, 4]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, P.clouds, P.cop, 30 + sd, mode === 'dusk' ? 0.5 : 0.2); scene.add(c); return [c, x, sd]; });
  const d0 = 14;
  return { scene, cam, update(t, p) {
    if (mode === 'dusk') cam.position.set(0, 2.4, 8 - 9 * p);                    // push-fast toward the castle
    else {                                                                       // dolly zoom: back away while zooming in
      const z = 7 * p; cam.position.set(0, 2.4, 2 + z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    }
    const dim = Math.min(1, Math.max(0, (t - dimAt) / 1.2));
    windows.forEach((w, k) => { w.material.opacity = (1 - dim) * (0.8 + 0.2 * Math.sin(t * 2.3 + k)); });
    cl.forEach(([c, x, k]) => { c.position.x = x + t * (mode === 'storm' ? 2.2 : 0.9) * (1 + k * 0.2); });
    return {};
  } };
}

const V = window.BG3D_VARS || {};
export const BUILD = {
  castleDusk: () => japanCastle('dusk'),
  castleStorm: () => japanCastle('storm', { dimAt: V.dimAt ?? 99 }),
  manilaBay: () => S.bay('day'),
};

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
