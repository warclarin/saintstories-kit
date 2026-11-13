// three.js backgrounds for Jesús Nazareno, the Black Nazarene (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
// 'manilaFeast' (hook, push-fast): a Manila street at night during the Traslación, lit windows, lamp glows and a river
// of candle lights toward Quiapo's dome. 'oceanDusk' (pan-l): the open Pacific at dusk for the galleon. 'manilaFire'
// (the 1929 fire / 1945 war, dolly zoom): the same street dark, smoke columns and fire glows behind the rooftops.
// Characters, the image, the galleon and the church facade stay 2D SVG on top.
// Deterministic: every frame is drawn from timeline time only. Helpers come from bakhita_freedom.bg3d.js (copied next to
// this file as bakhita.bg3d.js) and santo_nino_cebu.bg3d.js (as santo.bg3d.js, builders only via BG3D_LIB).
// Exported for later reels: manila(mode), ocean(mode).
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
window.BG3D_LIB = true;
const S = await import('./santo.bg3d.js');
const { W, H, FOV, TH, rng, canvasTex, skyTex, glowTex, lam, ridge, cloud, sprite, atScreen, makeView, newRenderer, stars } = B;
const { smokeColumn } = S;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
const fireG = glowTex([[0, 'rgba(255,214,140,1)'], [0.25, 'rgba(255,140,60,.8)'], [0.6, 'rgba(220,70,30,.25)'], [1, 'rgba(200,60,30,0)']]);
const candleG = glowTex([[0, 'rgba(255,250,220,1)'], [0.3, 'rgba(255,214,140,.7)'], [1, 'rgba(255,190,110,0)']]);

// window grid texture: lit (warm) or dark panes on a wall colour
function windowTex(seed, wall, lit, dark) {
  const r = rng(seed);
  return canvasTex(64, 128, (g, w, h) => {
    g.fillStyle = wall; g.fillRect(0, 0, w, h);
    for (let y = 8; y < h - 8; y += 18) for (let x = 6; x < w - 6; x += 16) {
      g.fillStyle = r() < lit ? `rgba(255,${200 + Math.floor(r() * 40)},${120 + Math.floor(r() * 60)},1)` : dark;
      g.fillRect(x, y, 9, 11);
    }
  });
}
// a row of town buildings along one side of the street (x side = -1 left, 1 right)
function street(side, P, seed) {
  const g = new THREE.Group(), r = rng(seed);
  let z = 4;
  while (z > -260) {
    const w = 8 + r() * 10, h = 7 + r() * 16 * (z < -60 ? 1.2 : 1), d = 8 + r() * 6;
    const wall = P.walls[Math.floor(r() * P.walls.length)];
    const tex = windowTex(seed * 100 + Math.floor(-z), wall, P.lit, P.dark);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(Math.max(1, Math.round(w / 6)), Math.max(1, Math.round(h / 8)));
    const m = new THREE.MeshLambertMaterial({ map: tex, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: P.glowWin });
    const b = new THREE.Mesh(new THREE.BoxGeometry(d, h, w), m);
    b.position.set(side * (9 + d / 2 + r() * 2), h / 2, z - w / 2); g.add(b);
    if (r() < 0.45) {   // a pitched tile roof on some houses
      const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(d, w) * 0.72, 3 + r() * 2, 4), lam(P.roof));
      roof.rotation.y = Math.PI / 4; roof.position.set(b.position.x, h + 1.5, b.position.z); roof.scale.set(d / Math.max(d, w), 1, w / Math.max(d, w)); g.add(roof);
    }
    z -= w + 0.6;
  }
  return g;
}
const MODES = {
  feast: { sky: [[0, '#140e2a'], [0.36, '#2e1a44'], [0.5, '#6a3050'], [0.56, '#a8505a'], [1, '#a8505a']], fog: '#4a2a44',
    walls: ['#8a6a5a', '#7a5a6a', '#9a7a62', '#6a5a72', '#a08870'], roof: '#4a2a2e', lit: 0.55, dark: '#2a1e2a', glowWin: 0.55,
    road: '#2a1e28', hemi: ['#ffc8a0', '#1a1424', 0.9], key: ['#ffd8a0', 0.7], stars: 0.6, smoke: 0, fires: 0, candles: 160 },
  fire: { sky: [[0, '#140c18'], [0.32, '#3a1620'], [0.48, '#8a3424'], [0.56, '#d8642e'], [1, '#d8642e']], fog: '#5a2a24',
    walls: ['#4a3a3a', '#3e3238', '#54403a', '#3a3440'], roof: '#2a1c1e', lit: 0.12, dark: '#1a1418', glowWin: 0.8,
    road: '#221a1c', hemi: ['#ff9a60', '#140e12', 0.9], key: ['#ff8a4a', 1.0], stars: 0, smoke: 7, fires: 6, candles: 0 },
};
export function manila(mode = 'feast') {
  const P = MODES[mode];
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 30, 300);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(30, 40, -60); scene.add(key);
  if (P.stars) scene.add(stars(70, 9, P.stars, { el0: 0.2 }));
  const road = new THREE.Mesh(new THREE.PlaneGeometry(18, 600), lam(P.road)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0, -260); scene.add(road);
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(200, 600), lam(mixc(P.road, '#000000', 0.2))); walk.rotation.x = -Math.PI / 2; walk.position.set(0, -0.02, -260); scene.add(walk);
  scene.add(street(-1, P, 3)); scene.add(street(1, P, 8));
  // far skyline and the Quiapo dome at the end of the street
  scene.add(ridge({ w: 900, d: 40, z: -330, amp: 26, color: mixc(P.walls[0], P.fog, 0.6).getStyle(), seed: 5, freq: 2.2 }));
  const dome = new THREE.Mesh(new THREE.SphereGeometry(9, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), lam(mode === 'fire' ? '#3a2a2a' : '#b89a80'));
  dome.position.set(0, 22, -300); scene.add(dome);
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 10, 24), lam(mode === 'fire' ? '#2e2224' : '#a08870')); drum.position.set(0, 17, -300); scene.add(drum);
  const base = new THREE.Mesh(new THREE.BoxGeometry(30, 14, 16), lam(mode === 'fire' ? '#2a2024' : '#9a8068')); base.position.set(0, 7, -296); scene.add(base);
  // street lamps
  const lamps = [];
  for (let k = 0; k < 10; k++) for (const sd of [-1, 1]) {
    const z = 2 - k * 22, s = sprite(warm, 6, mode === 'fire' ? 0.25 : 0.7, true); s.position.set(sd * 8.2, 6, z); scene.add(s); lamps.push([s, k]);
  }
  // a river of candle lights along the street (the procession) and fire glows / smoke behind the rooftops
  const candles = [], r = rng(31);
  for (let k = 0; k < P.candles; k++) {
    const s = sprite(candleG, 0.6 + r() * 0.5, 0.8, true); s.position.set((r() - 0.5) * 15, 1.4 + r() * 0.8, -6 - r() * 220); scene.add(s); candles.push([s, r() * 6.3]);
  }
  const smokes = [];
  for (let k = 0; k < P.smoke; k++) {
    const [g, up] = smokeColumn(-60 + k * 20, -150 - (k % 3) * 30, { seed: 5 + k, s: 6 + (k % 3) * 2, color: '#4a3236', op: 0.55, rise: 2 + (k % 3) * 0.5, height: 90 + (k % 2) * 30 });
    scene.add(g); smokes.push(up);
  }
  const fires = [];
  for (let k = 0; k < P.fires; k++) { const s = sprite(fireG, 40 + (k % 3) * 12, 0.8, true); s.position.set(-70 + k * 28, 10, -170 - (k % 2) * 40); scene.add(s); fires.push([s, k]); }
  const sky = [[-60, 70, -380, 10, 1], [70, 86, -420, 12, 2]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, mode === 'fire' ? '#5a2a2a' : '#5a3a5a', 0.45, 80 + sd, 0.2); scene.add(c); return [c, x, sd]; });
  const cam = camera(0, 3, 10, 0.035);
  const glowS = sprite(warm, 700, mode === 'fire' ? 0.8 : 0.5); glowS.position.copy(atScreen(cam, 540, 1000, 700)); scene.add(glowS);
  const d0 = 16;
  return { scene, cam, update(t, p) {
    if (mode === 'feast') cam.position.set(0, 3, 10 - 9 * p);              // push-fast: glide up the street
    else {                                                                 // dolly zoom: back away while zooming in
      const z = 12 * p; cam.position.set(0, 3, 4 + z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    }
    candles.forEach(([s, ph]) => { s.material.opacity = 0.6 + 0.3 * Math.sin(t * 4 + ph); });
    lamps.forEach(([s, k]) => { s.material.opacity = (mode === 'fire' ? 0.2 : 0.65) + 0.05 * Math.sin(t * 2 + k); });
    smokes.forEach((up) => up(t));
    fires.forEach(([s, k]) => { s.material.opacity = 0.7 + 0.2 * Math.sin(t * 3.1 + k * 1.7); });
    sky.forEach(([c, x, k]) => { c.position.x = x + t * (0.6 + k * 0.3); });
    return {};
  } };
}

// the open Pacific: a wide sea to the horizon, sun low, clouds, drifting light streaks
function streakTex(seed, color) {
  const r = rng(seed);
  const t = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512);
    for (let k = 0; k < 90; k++) { const x = r() * 256, y = r() * 512, w = 12 + r() * 50; g.fillStyle = `rgba(${color},${0.1 + r() * 0.3})`; g.fillRect(x, y, w, 2 + r() * 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
export function ocean(mode = 'dusk') {
  const scene = new THREE.Scene();
  scene.background = skyTex([[0, '#221f4e'], [0.34, '#5a3a6a'], [0.48, '#c06a6a'], [0.56, '#f0a070'], [1, '#f0a070']]);
  scene.fog = new THREE.Fog('#a06070', 80, 700);
  scene.add(new THREE.HemisphereLight('#ffc8a8', '#2a2040', 1.2));
  const key = new THREE.DirectionalLight('#ffb880', 1.2); key.position.set(40, 30, -80); scene.add(key);
  scene.add(stars(40, 4, 0.5, { el0: 0.3 }));
  const water = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1400), lam('#4a3a66')); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -600); scene.add(water);
  const st = streakTex(7, '255,190,150'); st.repeat.set(10, 40);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(220, 500), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: 0.45, depthWrite: false }));
  sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, 0.03, -240); scene.add(sheen);
  const swells = [];
  for (let k = 0; k < 6; k++) {   // long low swells rolling toward the camera
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 400, 8, 1), lam('#5a4a7a', { transparent: true, opacity: 0.5 }));
    m.rotation.z = Math.PI / 2; scene.add(m); swells.push([m, k]);
  }
  const sky = [[-140, 60, -520, 14, 1], [40, 90, -560, 16, 2], [200, 50, -480, 11, 3], [-30, 120, -600, 18, 4]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, '#d88a8a', 0.6, 90 + sd, 0.35); scene.add(c); return [c, x, sd]; });
  const cam = camera(0, 3, 0, 0.03);
  const sunS = sprite(warm, 1000, 0.85); sunS.position.copy(atScreen(cam, 760, 1010, 900)); scene.add(sunS);
  return { scene, cam, update(t, p) {
    cam.position.set(4 - 8 * p, 3 + 0.25 * Math.sin(t * 0.9), 0);         // pan-l: truck left, a gentle swell
    st.offset.y = -t * 0.03; st.offset.x = Math.sin(t * 0.5) * 0.02;
    swells.forEach(([m, k]) => { const z = -((k * 40 + t * 6) % 240) - 10; m.position.set(0, 0.05, z); });
    sky.forEach(([c, x, k]) => { c.position.x = x + t * (0.8 + k * 0.3); });
    return {};
  } };
}

export const BUILD = { manilaFeast: () => manila('feast'), manilaFire: () => manila('fire'), oceanDusk: () => ocean('dusk') };

if (!window.BG3D_LIB_NAZ) {
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
