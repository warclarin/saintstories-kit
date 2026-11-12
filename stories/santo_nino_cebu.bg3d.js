// three.js backgrounds for the Santo Niño de Cebú (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// One 3D Cebu bay in three set-ups: 'smoke' (hook, push-fast: dusk after the fire, smoke columns over the shore),
// 'day' (April 1521, pan-r: bright tropical sea, green islands of Mactan across the channel), 'fire' (1565, pan-l:
// the town burning on the far shore at dusk). Characters, ships and the near beach stay 2D SVG on top.
// Deterministic: every frame is drawn from timeline time only. Helpers come from bakhita_freedom.bg3d.js
// (copied next to this file as bakhita.bg3d.js); BG3D_MANUAL stops that module from wiring its own canvases.
// Exported for later reels: bay(mode), smokeColumn(), shoreHuts().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, rng, canvasTex, skyTex, glowTex, lam, ridge, cloud, sprite, atScreen, makeView, newRenderer, stars } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
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
const fireG = glowTex([[0, 'rgba(255,214,140,1)'], [0.25, 'rgba(255,140,60,.8)'], [0.6, 'rgba(220,70,30,.25)'], [1, 'rgba(200,60,30,0)']]);

// a row of small stilt huts with thatched cone roofs along a shore line (far away, simple boxes)
export function shoreHuts(x0, x1, z, n, seed, { wall = '#8a6a44', roof = '#5a4228', burnt = 0 } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  for (let k = 0; k < n; k++) {
    const x = x0 + (x1 - x0) * (k + r() * 0.6) / n, s = 0.8 + r() * 0.5, zz = z - r() * 8;
    const c = burnt ? mixc(wall, '#1e1618', burnt) : col(wall), rc = burnt ? mixc(roof, '#141012', burnt) : col(roof);
    const body = new THREE.Mesh(new THREE.BoxGeometry(3 * s, 2 * s, 2.6 * s), lam(c)); body.position.set(x, 1.2 * s + 0.6, zz); g.add(body);
    if (!burnt || r() < 0.5) { const cone = new THREE.Mesh(new THREE.ConeGeometry(2.4 * s, 2 * s, 4), lam(rc)); cone.rotation.y = Math.PI / 4; cone.position.set(x, 3.2 * s + 0.6, zz); g.add(cone); }
  }
  return g;
}
// a coconut palm far away: thin curved trunk + a crown of flat fronds
function palm(x, z, h, seed, c = '#2e4a2a') {
  const g = new THREE.Group(), r = rng(seed), m = lam(c), tm = lam(mixc(c, '#3a2a1e', 0.5));
  const lean = (r() - 0.5) * 0.3;
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, h, 6), tm); tr.position.set(0, h / 2, 0); tr.rotation.z = lean; g.add(tr);
  const top = new THREE.Vector3(-Math.sin(lean) * h, h * Math.cos(lean), 0);
  for (let k = 0; k < 7; k++) {
    const fr = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.5), m); fr.position.copy(top); const a = (k / 7) * Math.PI * 2;
    fr.rotation.set(0, a, -0.5 - r() * 0.3); fr.translateX(1.4); g.add(fr);
  }
  g.position.set(x, 0, z); return g;
}
// a column of smoke puffs rising from (x, z); returns [group, puffs] for the update loop
export function smokeColumn(x, z, { n = 7, s = 3, color = '#7a6e74', op = 0.5, seed = 1, rise = 2.2, height = 60 } = {}) {
  const g = new THREE.Group(), r = rng(seed), puffs = [];
  for (let k = 0; k < n; k++) {
    const c = cloud(0, 0, 0, s * (0.7 + r() * 0.5), color, op, seed * 10 + k, 0.15); g.add(c);
    puffs.push({ c, ph: k / n, dx: (r() - 0.5) * 4 });
  }
  g.position.set(x, 0, z);
  const update = (t) => puffs.forEach((p) => {
    const u = (p.ph + t * rise / height) % 1;   // 0 at the ground, 1 at the top
    p.c.position.set(p.dx + u * 14, u * height, 0); p.c.scale.setScalar(s * (0.6 + u * 1.8));
    p.c.children[0].material.opacity = op * Math.min(1, u * 6) * (1 - u);
  });
  return [g, update];
}

const MODES = {
  smoke: { sky: [[0, '#241a2e'], [0.34, '#4a3040'], [0.5, '#a8604a'], [0.56, '#e09060'], [1, '#e09060']], fog: '#8a6058', water: '#3a3456',
    hemi: ['#f0c0a0', '#1e1822', 1.2], key: ['#ffc890', 1.1], sun: [760, 980, 0.7], cam: [0, 2.6, 6, 0.032], streak: '255,190,140',
    isles: ['#4a3446', '#3a2a3a'], huts: { burnt: 0.85 }, smoke: 4, fires: 3, stars: 0.5 },
  day: { sky: [[0, '#3a7cc0'], [0.34, '#74b0e0'], [0.5, '#bfe2f0'], [0.56, '#e6f4f2'], [1, '#e6f4f2']], fog: '#cfe6ec', water: '#2a8aa0',
    hemi: ['#ffffff', '#4a7a6a', 1.6], key: ['#fff4d8', 1.6], sun: [820, 560, 0.55], cam: [0, 2.4, 0, 0.03], streak: '255,255,255',
    isles: ['#5a9a6a', '#4a8a5a'], huts: null, smoke: 0, fires: 0, stars: 0 },
  fire: { sky: [[0, '#1a1222'], [0.32, '#3e1e2a'], [0.48, '#8a3a2e'], [0.56, '#d86a3a'], [1, '#d86a3a']], fog: '#6a3a32', water: '#2e2236',
    hemi: ['#ffb080', '#1a1218', 1.1], key: ['#ff9a5a', 1.3], sun: [300, 1000, 0.9], cam: [0, 2.4, 0, 0.03], streak: '255,150,90',
    isles: ['#3a2430', '#2e1e28'], huts: { burnt: 0.45 }, smoke: 6, fires: 6, stars: 0.35 },
};

export function bay(mode = 'day') {
  const P = MODES[mode];
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 60, 560);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-40, 50, -80); scene.add(key);
  if (P.stars) scene.add(stars(60, 5, P.stars, { el0: 0.2 }));
  // the sea, with drifting light streaks
  const water = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), lam(P.water)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -440); scene.add(water);
  const st = streakTex(mode.length + 2, P.streak); st.repeat.set(8, 34);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(160, 360), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: mode === 'day' ? 0.5 : 0.42, depthWrite: false }));
  sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, 0.03, -170); scene.add(sheen);
  // islands across the channel (Mactan, Bohol far behind), palms on the near islet
  scene.add(ridge({ w: 1500, d: 90, z: -360, amp: 40, color: mixc(P.isles[0], P.fog, 0.45).getStyle(), seed: 11, freq: 0.6 }));
  scene.add(ridge({ w: 1100, d: 50, z: -230, amp: 12, color: P.isles[1], seed: 4, freq: 1.4 }));
  // the shore of Cebu town curving in from the left
  const shore = new THREE.Mesh(new THREE.PlaneGeometry(260, 34), lam(mixc(P.isles[1], '#c8a878', mode === 'day' ? 0.5 : 0.2)));
  shore.rotation.x = -Math.PI / 2; shore.position.set(-150, 0.06, -120); shore.rotation.z = 0.18; scene.add(shore);
  for (let k = 0; k < 9; k++) scene.add(palm(-250 + k * 26 + (k % 3) * 5, -112 - (k % 2) * 6, 9 + (k % 3) * 2, 20 + k, mode === 'day' ? '#2e6a3a' : '#2a1e24'));
  if (P.huts) scene.add(shoreHuts(-240, -40, -110, 12, 7, P.huts));
  // smoke columns and fire glows on the shore
  const smokes = [];
  for (let k = 0; k < P.smoke; k++) {
    const [g, up] = smokeColumn(-220 + k * 36, -118 - (k % 2) * 6, { seed: 3 + k, s: 4 + (k % 3), color: mode === 'fire' ? '#5a3e44' : '#6e6270', op: mode === 'fire' ? 0.6 : 0.5, rise: 2 + (k % 3) * 0.6, height: 70 + (k % 2) * 20 });
    scene.add(g); smokes.push(up);
  }
  const fires = [];
  for (let k = 0; k < P.fires; k++) {
    const s = sprite(fireG, mode === 'fire' ? 26 : 14, mode === 'fire' ? 0.85 : 0.5, true); s.position.set(-226 + k * (180 / Math.max(1, P.fires - 1)), 3, -112); scene.add(s); fires.push([s, k]);
  }
  // clouds far away
  const sky = [[-110, 80, -440, 10, 1], [60, 96, -480, 12, 2], [190, 70, -400, 9, 3]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, mode === 'day' ? '#ffffff' : '#8a6070', mode === 'day' ? 0.85 : 0.45, 70 + sd, mode === 'day' ? 0.5 : 0.25); scene.add(c); return [c, x, sd]; });
  const cam = camera(...P.cam);
  const sunS = sprite(warm, 900, P.sun[2]); sunS.position.copy(atScreen(cam, P.sun[0], P.sun[1], 900)); scene.add(sunS);
  return { scene, cam, update(t, p) {
    if (mode === 'smoke') cam.position.set(0, 2.6, 6 - 10 * p);            // push-fast: glide in toward the shore
    else if (mode === 'day') cam.position.set(-3.4 + 6.8 * p, 2.4, 0);     // pan-r: truck right along the beach
    else cam.position.set(3.4 - 6.8 * p, 2.4, 0);                          // pan-l: truck left
    st.offset.y = -t * 0.025; st.offset.x = Math.sin(t * 0.5) * 0.02;
    smokes.forEach((up) => up(t));
    fires.forEach(([s, k]) => { s.material.opacity = (mode === 'fire' ? 0.75 : 0.45) + 0.15 * Math.sin(t * 3.1 + k * 1.7); });
    sky.forEach(([c, x, k]) => { c.position.x = x + t * (0.8 + k * 0.3); });
    return {};
  } };
}

export const BUILD = { baySmoke: () => bay('smoke'), bayDay: () => bay('day'), bayFire: () => bay('fire') };

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
