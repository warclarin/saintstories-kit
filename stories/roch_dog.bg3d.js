// three.js backgrounds for San Roque, "The Dog with the Bread" (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// One forest near Piacenza in three set-ups: 'dusk' (hook, push-fast: warm low sun between the trunks), 'mist' (driven
// out, pan-l: cold grey-green fog), 'light' (the dog and Gottardo, dolly zoom toward a clearing full of golden light).
// Characters, the lean-to, the dog and the town wall stay 2D SVG on top.
// Deterministic: every frame is drawn from timeline time only. Helpers come from bakhita_freedom.bg3d.js
// (copied next to this file as bakhita.bg3d.js). Exported for later reels: forest(mode).
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, canvasTex, skyTex, glowTex, lam, ridge, cloud, sprite, atScreen, makeView, newRenderer } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
const mistT = glowTex([[0, 'rgba(255,255,255,.55)'], [0.5, 'rgba(255,255,255,.22)'], [1, 'rgba(255,255,255,0)']]);
// a soft vertical light shaft texture
const shaftT = canvasTex(64, 256, (g, w, h) => { const l = g.createLinearGradient(0, 0, w, 0); l.addColorStop(0, 'rgba(255,240,200,0)'); l.addColorStop(0.5, 'rgba(255,240,200,.9)'); l.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = l; g.fillRect(0, 0, w, h);
  const v = g.createLinearGradient(0, 0, 0, h); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(0.3, 'rgba(0,0,0,1)'); g.globalCompositeOperation = 'destination-in'; g.fillStyle = v; g.fillRect(0, 0, w, h); });

const MODES = {
  dusk: { sky: [[0, '#2a2440'], [0.36, '#6a4a5a'], [0.5, '#d8885a'], [0.58, '#f0b070'], [1, '#f0b070']], fog: '#8a6a52', near: 18, far: 260,
    trunk: '#3a2a22', leaves: ['#2e4a2a', '#3a5a2e', '#2a4030'], ground: '#3a3a24', hemi: ['#ffd0a0', '#1a1a14', 1.0], key: ['#ffb070', 1.2], sun: [560, 980, 0.8], mist: 0.25, shafts: 0.35 },
  mist: { sky: [[0, '#6a7478'], [0.4, '#8a9490'], [0.56, '#a8b0a8'], [1, '#a8b0a8']], fog: '#8a948a', near: 6, far: 150,
    trunk: '#2e302a', leaves: ['#3a4a38', '#44543e', '#36443a'], ground: '#3a4236', hemi: ['#c8d0d0', '#1e2220', 1.1], key: ['#d8e0e0', 0.5], sun: [700, 700, 0.25], mist: 0.6, shafts: 0 },
  light: { sky: [[0, '#2e4a3e'], [0.4, '#7a9466'], [0.54, '#e0c880'], [1, '#e0c880']], fog: '#a8a070', near: 16, far: 240,
    trunk: '#4a3a28', leaves: ['#3e6a32', '#4e7a38', '#3a5a2e'], ground: '#3a4426', hemi: ['#fff0c8', '#2a3018', 1.3], key: ['#ffe0a0', 1.3], sun: [540, 980, 0.7], mist: 0.3, shafts: 0.35 },
};
function tree(x, z, h, r, P, seed) {
  const g = new THREE.Group(), q = rng(seed);
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.7, r, h, 8), lam(P.trunk)); tr.position.y = h / 2; g.add(tr);
  for (let k = 0; k < 4; k++) {   // a crown of a few blobs
    const b = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), lam(P.leaves[k % P.leaves.length]));
    const s = h * (0.22 + q() * 0.12); b.scale.set(s * 1.2, s * 0.9, s * 1.2);
    b.position.set((q() - 0.5) * h * 0.3, h * (0.9 + q() * 0.25), (q() - 0.5) * h * 0.3); g.add(b);
  }
  g.position.set(x, 0, z); return g;
}
export function forest(mode = 'dusk') {
  const P = MODES[mode];
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, P.near, P.far);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-20, 30, -60); scene.add(key);
  const gnd = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), lam(P.ground)); gnd.rotation.x = -Math.PI / 2; gnd.position.set(0, 0, -300); scene.add(gnd);
  scene.add(ridge({ w: 900, d: 60, z: -260, amp: 30, color: mixc(P.leaves[0], P.fog, 0.55).getStyle(), seed: 3, freq: 1.4 }));
  // trees on both sides with a gap down the middle (a path toward the light), denser and paler with distance
  const r = rng(mode.length * 7 + 1);
  for (let k = 0; k < 120; k++) {
    const z = -16 - r() * 210, side = r() < 0.5 ? -1 : 1, x = side * (5 + r() * 40 + Math.max(0, -z) * 0.12);
    const h = 10 + r() * 12, rr = 0.35 + r() * 0.35;
    if (z > -50 && Math.abs(x) < 26) continue;   // keep near crowns out of the sky behind the title
    scene.add(tree(x, z, h, rr, P, 100 + k));
  }
  const cam = camera(0, 2.6, 8, 0.02);
  const sunS = sprite(warm, 700, P.sun[2]); sunS.position.copy(atScreen(cam, P.sun[0], P.sun[1], 600)); scene.add(sunS);
  // drifting mist banks and light shafts
  const mists = [];
  for (let k = 0; k < 14; k++) { const s = sprite(mistT, 30 + r() * 30, P.mist); s.position.set(-60 + r() * 120, 2 + r() * 4, -20 - r() * 140); scene.add(s); mists.push([s, s.position.x, r() * 6.3]); }
  const shafts = [];
  for (let k = 0; k < (P.shafts ? 6 : 0); k++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(4 + r() * 4, 60), new THREE.MeshBasicMaterial({ map: shaftT, transparent: true, opacity: P.shafts, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
    m.position.set(-20 + k * 8 + r() * 4, 24, -40 - r() * 50); m.rotation.z = 0.35; scene.add(m); shafts.push([m, k]);
  }
  const d0 = 14;
  return { scene, cam, update(t, p) {
    if (mode === 'dusk') cam.position.set(0, 2.6, 8 - 8 * p);                 // push-fast: glide in between the trees
    else if (mode === 'mist') cam.position.set(3 - 6 * p, 2.6, 4);            // pan-l: truck left through the fog
    else {                                                                   // dolly zoom: back away while zooming in
      const z = 10 * p; cam.position.set(0, 2.6, 2 + z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    }
    mists.forEach(([s, x, ph]) => { s.position.x = x + t * 0.8 + Math.sin(t * 0.3 + ph) * 2; });
    shafts.forEach(([m, k]) => { m.material.opacity = P.shafts * (0.75 + 0.25 * Math.sin(t * 0.7 + k * 1.3)); });
    return {};
  } };
}

export const BUILD = { forestDusk: () => forest('dusk'), forestMist: () => forest('mist'), forestLight: () => forest('light') };

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
