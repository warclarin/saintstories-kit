// three.js backgrounds for St. Andrew the Apostle (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// The first ALL-3D-background reel: every scene draws its sky, water, hills and far buildings in 3D; the characters,
// props and the near shore stay 2D SVG on top. One builder, sea(mode), in eight set-ups, each moving its 3D camera
// with the scene's `cam` move:
//   'patras'  (hook, push-fast)   dusk sea at Patras, white town with lit windows on the far shore
//   'galilee' (pan-r)             bright Sea of Galilee ringed by hills, sailing boats, clouds
//   'jordan'  (dolly)             the Jordan at morning: green banks, reeds, light shafts; a real dolly zoom
//   'brother' (drift-l)           lake shore at sunrise with beached boats
//   'mission' (pan-l)             the Black Sea coast: tall snowy mountains, a ship crossing
//   'martyr'  (tilt-up)           Patras at deep dusk: town walls, heavy clouds; fog thickens like a rack focus
//   'scotland'(pull)              green hills and sea under a blue sky where a white X of cloud forms (the saltire legend)
//   'glory'   (arc-r)             golden sunset sea, glowing sun, slow arc
// Deterministic: every frame is drawn from timeline time only. Helpers come from bakhita_freedom.bg3d.js (copied next to
// this file as bakhita.bg3d.js); BG3D_MANUAL stops that module from wiring its own canvases.
// Exported for later reels: sea(mode), boat3d(), town3d(), saltireCloud().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, canvasTex, skyTex, glowTex, lam, glowMat, ridge, cloud, stars, sprite, atScreen, makeView, newRenderer } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const sio = (x) => -(Math.cos(Math.PI * clamp01(x)) - 1) / 2;
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
const winT = glowTex([[0, 'rgba(255,226,150,1)'], [0.4, 'rgba(255,200,110,.6)'], [1, 'rgba(255,180,90,0)']]);

/** A Galilean fishing boat: curved hull, mast, square-ish sail. Base at the waterline. */
export function boat3d({ hull = '#6a4028', sail = '#efe2c4', s = 1, sailOn = true } = {}) {
  const g = new THREE.Group();
  const sh = new THREE.Shape(); sh.moveTo(-3.2, 0.9); sh.quadraticCurveTo(-2.6, -0.6, 0, -0.7); sh.quadraticCurveTo(2.6, -0.6, 3.4, 1.1); sh.lineTo(-3.2, 0.9);
  const hg = new THREE.ExtrudeGeometry(sh, { depth: 1.4, bevelEnabled: false }); hg.translate(0, 0.4, -0.7);
  g.add(new THREE.Mesh(hg, lam(hull)));
  const rim = box(6.4, 0.18, 1.5, lam(mixc(hull, '#f0d0a0', 0.25))); rim.position.set(0.1, 1.38, 0); g.add(rim);
  if (sailOn) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 6, 6), lam('#4a3020')); mast.position.set(0, 4.2, 0); g.add(mast);
    const ss = new THREE.Shape(); ss.moveTo(-1.8, 0); ss.quadraticCurveTo(0, 0.4, 1.9, 0); ss.lineTo(1.6, 4.2); ss.quadraticCurveTo(0, 4.5, -1.6, 4.2); ss.lineTo(-1.8, 0);
    const sm = new THREE.Mesh(new THREE.ShapeGeometry(ss), lam(sail, { side: THREE.DoubleSide })); sm.position.set(0, 2.2, 0.12); g.add(sm);
  }
  g.scale.setScalar(s); return g;
}
/** A seaside town of white and ochre houses with flat roofs, a few lit windows (dusk). Returns { group, lights }. */
export function town3d(x0, x1, z, n, seed, { walls = ['#efe4d0', '#e2c8a0', '#d8b48a', '#f4ecdc'], lit = 0, wall = null } = {}) {
  const g = new THREE.Group(), r = rng(seed), lights = [];
  for (let k = 0; k < n; k++) {
    const x = x0 + (x1 - x0) * (k + r() * 0.5) / n, w = 3 + r() * 3, h = 2.5 + r() * 4, d = 3 + r() * 2, zz = z - r() * 14;
    const c = walls[k % walls.length];
    const b = box(w, h, d, lam(c)); b.position.set(x, h / 2 + r() * 2.5, zz); g.add(b);
    const roof = box(w + 0.3, 0.3, d + 0.3, lam(mixc(c, '#8a5a3e', 0.35))); roof.position.set(x, b.position.y + h / 2 + 0.15, zz); g.add(roof);
    if (r() < 0.25) { const dm = new THREE.Mesh(new THREE.SphereGeometry(w * 0.32, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), lam(mixc(c, '#ffffff', 0.15))); dm.position.set(x, b.position.y + h / 2 + 0.3, zz); g.add(dm); }
    if (lit && r() < lit) { const s = sprite(winT, 2.2 + r() * 1.2, 0.85, true); s.position.set(x + (r() - 0.5) * w * 0.5, b.position.y, zz + d / 2 + 0.3); g.add(s); lights.push([s, r() * 6.3]); }
  }
  if (wall) {   // a low town wall with towers along the shore
    const m = lam(wall), dm = lam(mixc(wall, '#1e1a22', 0.25));
    const wl = box(x1 - x0 + 10, 3.2, 1.6, m); wl.position.set((x0 + x1) / 2, 1.6, z + 6); g.add(wl);
    for (let tx = x0; tx <= x1; tx += (x1 - x0) / 4) { const tw = box(3, 6, 3, dm); tw.position.set(tx, 3, z + 6.2); g.add(tw); }
  }
  return { group: g, lights };
}
/** The saltire in the sky (legend of King Óengus, AD 832): two bands of white cloud crossing in an X. Returns { group, mats }. */
export function saltireCloud(x, y, z, len, s, seed = 3) {
  const g = new THREE.Group(), r = rng(seed), mats = [];
  for (const dir of [1, -1]) for (let k = 0; k < 13; k++) {
    const u = (k / 12 - 0.5) * len, c = cloud(u, dir * u + (r() - 0.5) * 2, (r() - 0.5) * 4, s * (0.8 + r() * 0.3), '#ffffff', 0.85, seed * 50 + k + (dir > 0 ? 0 : 20), 0.55);
    c.rotation.z = dir * Math.PI / 4; g.add(c); mats.push(c.children[0].material);
  }
  g.position.set(x, y, z); return { group: g, mats };
}

const MODES = {
  patras: { sky: [[0, '#1e1a44'], [0.32, '#5a3a6a'], [0.47, '#c8705e'], [0.55, '#f2a46a'], [1, '#f2a46a']], fog: '#a86a68', water: '#3e3660', streak: '255,190,150',
    hemi: ['#f8c8a8', '#221a2e', 1.25], key: ['#ffc890', 1.2], sun: [540, 1010, 0.95], cam: [0, 2.5, 6, 0.032], ridges: ['#5a3e60', '#43304e'], amp: [44, 16],
    town: { x0: 40, x1: 210, z: -150, n: 16, lit: 0.55 }, stars: 0.5, clouds: ['#ffb898', 0.5, 0.35] },
  galilee: { sky: [[0, '#3a7cc0'], [0.34, '#78b4e0'], [0.5, '#c6e4f0'], [0.56, '#eaf4ee'], [1, '#eaf4ee']], fog: '#d4e6e4', water: '#3a8aa8', streak: '255,255,255',
    hemi: ['#ffffff', '#5a7a5a', 1.6], key: ['#fff4d8', 1.5], sun: [860, 560, 0.5], cam: [0, 2.4, 0, 0.03], ridges: ['#8aa88a', '#6a9a62'], amp: [48, 20],
    boats: [[-24, -60, 1.0], [30, -95, 1.1], [-70, -150, 1.4], [70, -190, 1.6]], clouds: ['#ffffff', 0.85, 0.5] },
  jordan: { sky: [[0, '#2e5a8a'], [0.26, '#7aa4c4'], [0.46, '#f0dca8'], [0.54, '#f8e8b8'], [1, '#f8e8b8']], fog: '#e8dcb4', water: '#4a8a90', streak: '255,240,200',
    hemi: ['#fff6d8', '#4a5a3a', 1.7], key: ['#ffe8b0', 1.8], sun: [560, 900, 1.0], cam: [0, 2.5, 0, 0.03], ridges: ['#a8a878', '#7a9a5a'], amp: [30, 12],
    banks: '#6a8a4a', reeds: '#4a6a3a', shafts: true, clouds: ['#c8b890', 0.55, 0.25] },
  brother: { sky: [[0, '#e8906a'], [0.34, '#f8c896'], [0.5, '#f8e2b8'], [0.56, '#f4ead0'], [1, '#f4ead0']], fog: '#f0d8b8', water: '#5a8aa0', streak: '255,230,190',
    hemi: ['#fff0d8', '#5a5048', 1.55], key: ['#ffd8a0', 1.5], sun: [300, 960, 0.85], cam: [0, 2.4, 0, 0.03], ridges: ['#c0a08a', '#9a8a6a'], amp: [40, 16],
    boats: [[-40, -120, 1.4], [46, -140, 1.5]], clouds: ['#ffe4c8', 0.75, 0.5] },
  mission: { sky: [[0, '#2e5a8a'], [0.36, '#6a98c0'], [0.52, '#c8dce4'], [0.58, '#e4ece8'], [1, '#e4ece8']], fog: '#c8d8e0', water: '#2e6a88', streak: '235,245,255',
    hemi: ['#f4f8ff', '#3a4a5a', 1.5], key: ['#fff0d0', 1.6], sun: [240, 600, 0.45], cam: [0, 2.6, 0, 0.03], ridges: ['#6a7a90', '#4a6a5a'], amp: [110, 26], snow: true,
    ship: true, clouds: ['#ffffff', 0.8, 0.5] },
  martyr: { sky: [[0, '#141030'], [0.34, '#3e2448'], [0.48, '#8a3e4e'], [0.55, '#d8704e'], [1, '#d8704e']], fog: '#7a4450', water: '#2a2440', streak: '255,170,120',
    hemi: ['#f0b0a0', '#140e1e', 1.1], key: ['#ff9a6a', 1.1], sun: [760, 1030, 0.75], cam: [0, 2.5, 0, 0.03], ridges: ['#3e2a40', '#2e2034'], amp: [50, 18],
    town: { x0: -150, x1: -30, z: -120, n: 14, lit: 0.6, wall: '#6a4a52' }, stars: 0.6, clouds: ['#5a3a50', 0.75, 0.2], storm: true },
  scotland: { sky: [[0, '#3a6aa8'], [0.34, '#7ab0d8'], [0.5, '#cfe4ec'], [0.56, '#e8f0ea'], [1, '#e8f0ea']], fog: '#cfdcdc', water: '#3a6a88', streak: '255,255,255',
    hemi: ['#ffffff', '#3e5a3e', 1.55], key: ['#fff4dc', 1.5], sun: [880, 720, 0.4], cam: [0, 2.5, -4, 0.03], ridges: ['#6a8a6a', '#4a7a4a'], amp: [56, 22],
    saltire: true, clouds: ['#ffffff', 0.6, 0.5] },
  glory: { sky: [[0, '#6a3a5a'], [0.3, '#c8705e'], [0.46, '#f4b070'], [0.54, '#f8dc98'], [1, '#f8dc98']], fog: '#f0b888', water: '#7a5a78', streak: '255,220,160',
    hemi: ['#fff0d0', '#3a2a3a', 1.5], key: ['#ffd890', 1.6], sun: [540, 980, 1.15], cam: [0, 2.5, 0, 0.03], ridges: ['#9a6a6e', '#7a5060'], amp: [36, 14],
    boats: [[-60, -170, 1.5]], clouds: ['#ffd8b0', 0.7, 0.6] },
};

export function sea(mode = 'galilee') {
  const P = MODES[mode];
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  const fog = new THREE.Fog(P.fog, 60, 560); scene.fog = fog;
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-40, 50, -80); scene.add(key);
  if (P.stars) scene.add(stars(70, 9, P.stars, { el0: 0.22 }));
  // the water, with drifting light streaks
  const water = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), lam(P.water)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -480); scene.add(water);
  const st = streakTex(mode.length + 5, P.streak); st.repeat.set(8, 34);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(170, 380), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: 0.45, depthWrite: false }));
  sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, 0.03, -180); scene.add(sheen);
  // hills: far range (paler, foggier), near range; snow tops for the mountains
  if (P.snow) scene.add(ridge({ w: 1600, d: 90, z: -390, amp: P.amp[0] * 1.15, color: '#eef2f6', seed: 13, freq: 0.6 }));
  scene.add(ridge({ w: 1500, d: 90, z: -360, amp: P.amp[0], color: mixc(P.ridges[0], P.fog, 0.35).getStyle(), seed: 11, freq: 0.6 }));
  scene.add(ridge({ w: 1100, d: 50, z: -220, amp: P.amp[1], color: P.ridges[1], seed: 4 + mode.length, freq: 1.4 }));
  // river banks (Jordan): two green strips close in on both sides, reeds along them
  const reeds = [];
  if (P.banks) {
    for (const side of [-1, 1]) {
      const bank = ridge({ w: 60, d: 300, x: side * 46, z: -160, amp: 6, color: P.banks, seed: side > 0 ? 3 : 8, freq: 3, segX: 40 }); scene.add(bank);
      for (let k = 0; k < 18; k++) {
        const r = rng(k * 7 + (side > 0 ? 1 : 2)), g = new THREE.Group(), m = lam(P.reeds);
        for (let j = 0; j < 9; j++) { const h = 1.6 + r() * 1.8, rd = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.07, h, 5), m); rd.position.set((r() - 0.5) * 3, h / 2, (r() - 0.5) * 2); rd.rotation.z = (r() - 0.5) * 0.3; g.add(rd); }
        g.position.set(side * (15 + r() * 4), 0, -14 - k * 9); scene.add(g); reeds.push([g, k]);
      }
    }
  }
  // the town (Patras) with lit windows, and a wall for the martyr scene
  const lights = [];
  if (P.town) { const T = town3d(P.town.x0, P.town.x1, P.town.z, P.town.n, 21, { lit: P.town.lit, wall: P.town.wall }); scene.add(T.group); lights.push(...T.lights); }
  // boats on the water
  const boats = (P.boats || []).map(([x, z, s], k) => { const b = boat3d({ s, hull: k % 2 ? '#7a4a2a' : '#5e3a26', sail: mode === 'glory' ? '#f4d4b0' : '#efe2c4' }); b.position.set(x, 0, z); b.rotation.y = k % 2 ? 0.5 : -0.3; scene.add(b); return [b, x, k]; });
  // a merchant ship crossing (mission)
  let ship = null;
  if (P.ship) { ship = boat3d({ s: 3.2, hull: '#5a3a2a', sail: '#f2e8d4' }); ship.position.set(60, 0, -170); ship.rotation.y = 0.15; scene.add(ship); }
  // sky clouds
  const cl = [[-110, 80, -440, 10, 1], [60, 96, -480, 12, 2], [190, 70, -400, 9, 3], [-20, 120, -520, 13, 4]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s * (P.storm ? 1.4 : 1), P.clouds[0], P.clouds[1], 80 + sd, P.clouds[2]); scene.add(c); return [c, x, sd]; });
  // the saltire of cloud (Scotland)
  let salt = null;
  if (P.saltire) { salt = saltireCloud(-20, 76, -470, 72, 3.4, 5); salt.mats.forEach((m) => { m.opacity = 0; }); scene.add(salt.group); }
  const cam = camera(...P.cam);
  const sunS = sprite(warm, 900, P.sun[2]); sunS.position.copy(atScreen(cam, P.sun[0], P.sun[1], 900)); scene.add(sunS);
  // light shafts (Jordan, glory)
  const shafts = [];
  if (P.shafts || mode === 'glory') {
    const shM = new THREE.MeshBasicMaterial({ color: '#ffe8b0', transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    [[-16, -0.35], [-3, -0.18], [11, -0.04]].forEach(([x, rz]) => { const s = new THREE.Mesh(new THREE.PlaneGeometry(9, 90), shM); s.position.set(x, 20, -180); s.rotation.z = rz; scene.add(s); shafts.push(s); });
  }
  // everything except the sky in one root group, so the martyr scene can tilt the world (makeView owns cam.rotation)
  const root = new THREE.Group(); [...scene.children].forEach((c) => root.add(c)); scene.add(root);
  const d0 = 12;
  return { scene, cam, update(t, p) {
    let ry = 0;
    switch (mode) {
      case 'patras': cam.position.set(0, 2.5, 6 - 10 * p); break;                          // push-fast: glide toward the town
      case 'galilee': cam.position.set(-3.4 + 6.8 * p, 2.4, 0); break;                     // pan-r: truck right
      case 'jordan': { const z = 9 * p; cam.position.set(0, 2.5, z);                       // dolly zoom: back away while zooming in
        cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix(); break; }
      case 'brother': cam.position.set(1.6 - 3.2 * p, 2.4, 0); break;                      // drift-l
      case 'mission': cam.position.set(3.6 - 7.2 * p, 2.6, 0); break;                      // pan-l
      case 'martyr': root.rotation.x = -0.05 * p; fog.far = 560 - 260 * sio(t / 4); fog.near = 60 - 30 * sio(t / 4); break; // tilt-up, fog thickens
      case 'scotland': cam.position.set(0, 2.5 + 1.2 * p, -4 + 11 * p); break;             // pull back and up
      case 'glory': cam.position.set(-2.6 + 5.2 * p, 2.5, 0); ry = 0.05 - 0.1 * p; break;  // arc-r: truck + turn
    }
    st.offset.y = -t * 0.025; st.offset.x = Math.sin(t * 0.5) * 0.02;
    cl.forEach(([c, x, k]) => { c.position.x = x + t * (P.storm ? 2.2 : 0.9) * (0.8 + k * 0.3); });
    boats.forEach(([b, x, k]) => { b.position.x = x + t * (0.4 + k * 0.15) * (k % 2 ? -1 : 1); b.position.y = 0.15 * Math.sin(t * 1.3 + k); b.rotation.z = 0.03 * Math.sin(t * 1.1 + k * 2); });
    if (ship) { ship.position.x = 60 - t * 2.6; ship.position.y = 0.3 * Math.sin(t * 0.9); ship.rotation.z = 0.025 * Math.sin(t * 0.8); }
    lights.forEach(([s, ph]) => { s.material.opacity = 0.7 + 0.18 * Math.sin(t * 2.3 + ph); });
    reeds.forEach(([g, k]) => { g.rotation.z = 0.04 * Math.sin(t * 1.4 + k); });
    shafts.forEach((s, k) => { s.material.opacity = 0.06 + 0.04 * Math.sin(t * 0.9 + k * 2); });
    if (salt) { const a = 0.85 * sio((t - 0.6) / 3.2); salt.mats.forEach((m) => { m.opacity = a; }); salt.group.position.x = -20 + t * 0.4; }
    return { ry };
  } };
}

export const BUILD = {
  patras: () => sea('patras'), galilee: () => sea('galilee'), jordan: () => sea('jordan'), brother: () => sea('brother'),
  mission: () => sea('mission'), martyr: () => sea('martyr'), scotland: () => sea('scotland'), glory: () => sea('glory'),
};

// window.BG3D_LIB = true before importing: use the builders only (another module wires the canvases)
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
