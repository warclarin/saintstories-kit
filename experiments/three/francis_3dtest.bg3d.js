// EXPERIMENTAL three.js backgrounds for the St. Francis 3D test (browser module; build.mjs copies it to work/<slug>/bg3d.mjs
// when STORY.bg3d is set). Characters stay 2D SVG on top; this draws the sky, hills, town, trees and clouds in real 3D.
// Deterministic: every frame is drawn from timeline time in HyperFrames' hf-seek listener (no clocks, no Math.random).
import * as THREE from './three.module.min.js';

const W = 1080, H = 1920, FOV = 38;
const TH = Math.tan((FOV / 2) * Math.PI / 180);   // half-height of the view at distance 1
function rng(seed) {   // mulberry32
  return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const EASE = { p3o: (x) => 1 - (1 - x) ** 3, sio: (x) => -(Math.cos(Math.PI * x) - 1) / 2 };
const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);

// ------------------------------------------------------------------ textures
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const skyTex = (stops) => canvasTex(4, 1024, (g, w, h) => { const l = g.createLinearGradient(0, 0, 0, h); stops.forEach(([o, c]) => l.addColorStop(o, c)); g.fillStyle = l; g.fillRect(0, 0, w, h); });
const glowTex = (stops) => canvasTex(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 0, 128, 128, 128); stops.forEach(([o, c]) => r.addColorStop(o, c)); g.fillStyle = r; g.fillRect(0, 0, 256, 256); });
const dotTex = glowTex([[0, 'rgba(255,255,255,1)'], [0.35, 'rgba(255,255,255,.8)'], [1, 'rgba(255,255,255,0)']]);

// ------------------------------------------------------------------ materials + set pieces
const lam = (color, o = {}) => new THREE.MeshLambertMaterial({ color, ...o });
const glowMat = (color, op = 1) => new THREE.MeshBasicMaterial({ color, transparent: op < 1, opacity: op });

// a long rolling ridge: rounded hills along x, falling to `y` at its front and back edges
function ridge({ w = 800, d = 60, x = 0, z, y = 0, amp, color, seed = 1, freq = 1, segX = 160 }) {
  const g = new THREE.PlaneGeometry(w, d, segX, 14); g.rotateX(-Math.PI / 2);
  const r = rng(seed), ph = [r() * 6.3, r() * 6.3, r() * 6.3], p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const px = p.getX(i) + x, v = p.getZ(i) / d + 0.5;
    const prof = Math.sin(Math.PI * v) ** 0.7;
    const n = 0.55 + 0.25 * Math.sin(px * 0.013 * freq + ph[0]) + 0.14 * Math.sin(px * 0.031 * freq + ph[1]) + 0.06 * Math.sin(px * 0.07 * freq + ph[2]);
    p.setY(i, y + amp * n * prof);
  }
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, lam(color)); m.position.set(x, 0, z); return m;
}

function cypress(x, z, s = 1, c = '#2f4a34') {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.8, 6), lam('#5a3d22')); trunk.position.y = 0.4;
  const crown = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), lam(c)); crown.scale.set(0.75, 2.8, 0.75); crown.position.y = 3.2;
  g.add(trunk, crown); g.position.set(x, 0, z); g.scale.setScalar(s); return g;
}
function olive(x, z, s = 1, c = '#7f9a62', seed = 3) {
  const g = new THREE.Group(), r = rng(seed);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 1.6, 6), lam('#7a5a3a')); trunk.position.y = 0.8;
  g.add(trunk);
  for (let k = 0; k < 5; k++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.9 + r() * 0.5, 12, 9), lam(k % 2 ? c : mixc(c, '#fff6e0', 0.15)));
    b.position.set((r() - 0.5) * 2.2, 2.1 + r() * 1.0, (r() - 0.5) * 1.4); b.scale.y = 0.75; g.add(b);
  }
  g.position.set(x, 0, z); g.scale.setScalar(s); return g;
}

function cloud(x, y, z, s, color, op, seed, glow = 0.45) {
  const g = new THREE.Group(), r = rng(seed);
  const m = lam(color, { emissive: color, emissiveIntensity: glow, fog: false, transparent: op < 1, opacity: op, depthWrite: op >= 1 });
  for (let k = 0; k < 7; k++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), m);
    const rr = 0.7 + r() * 0.7; b.scale.set(rr * 1.3, rr * 0.8, rr);
    b.position.set((k - 3) * 1.25 + (r() - 0.5) * 0.6, (1 - Math.abs(k - 3) / 3) * 0.6 + r() * 0.3, (r() - 0.5) * 0.8);
    g.add(b);
  }
  g.position.set(x, y, z); g.scale.setScalar(s); return g;
}

// a pyramid roof sitting on a w×d box top
function roofMesh(w, d, h, color) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(Math.SQRT1_2, 1, 4), lam(color));
  m.rotation.y = Math.PI / 4; m.scale.set(w * 1.12, h, d * 1.12); return m;
}
// a gable (ridge) roof along x
function gableMesh(w, d, h, color) {
  const shape = new THREE.Shape(); shape.moveTo(-d / 2 - 0.2, 0); shape.lineTo(0, h); shape.lineTo(d / 2 + 0.2, 0); shape.lineTo(-d / 2 - 0.2, 0);
  const g = new THREE.ExtrudeGeometry(shape, { depth: w + 0.4, bevelEnabled: false }); g.translate(0, 0, -(w + 0.4) / 2); g.rotateY(Math.PI / 2);
  return new THREE.Mesh(g, lam(color));
}

// Assisi-like hill town: houses on a dome-shaped hill, a basilica + campanile (left) and the Rocca fortress (top right)
function hillTown({ x = 0, z, s = 1, wall, roof, hillC, win = null, seed = 21 }) {
  const G = new THREE.Group(), r = rng(seed);
  const RX = 28, RY = 8, RZ = 16;
  const hgt = (hx, hz) => RY * Math.sqrt(Math.max(0, 1 - (hx / RX) ** 2 - (hz / RZ) ** 2));
  const hill = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 24, 0, Math.PI * 2, 0, Math.PI / 2), lam(hillC));
  hill.scale.set(RX, RY, RZ); G.add(hill);
  const wallL = mixc(wall, '#fff6e0', 0.12), winM = win && glowMat(win);
  const house = (hx, hz, w, h, d, c, rc, rot = 0) => {
    const g = new THREE.Group(), base = hgt(hx, hz) - 0.8;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h + 0.8, d), lam(c)); b.position.y = (h + 0.8) / 2; g.add(b);
    const rf = roofMesh(w, d, 0.9 + w * 0.25, rc); rf.position.y = h + 0.8 + (0.9 + w * 0.25) / 2; g.add(rf);
    if (winM && r() < 0.75) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.5), winM); wn.position.set((r() - 0.5) * w * 0.4, h * 0.55 + 0.6, d / 2 + 0.02); g.add(wn); }
    g.position.set(hx, base, hz); g.rotation.y = rot; G.add(g);
  };
  // houses, back rows first
  for (let k = 0; k < 90; k++) {
    const hx = (r() - 0.5) * 46, hz = (r() - 0.5) * 22;
    if (hgt(hx, hz) < 1.6 || (hx < -9 && hx > -21 && hz > -5)) continue;   // keep the basilica corner clear
    house(hx, hz, 1.5 + r() * 1.1, 1.2 + r() * 1.6, 1.5 + r() * 0.9, k % 2 ? wall : wallL, roof, (r() - 0.5) * 0.25);
  }
  // basilica (long nave with a gable roof and a rose window) + campanile
  { const bx = -15, bz = 2, by = hgt(bx, bz) - 1.0, g = new THREE.Group();
    const nave = new THREE.Mesh(new THREE.BoxGeometry(8, 4.2, 4), lam(wallL)); nave.position.y = 2.1; g.add(nave);
    const gr = gableMesh(8, 4, 1.8, roof); gr.position.y = 4.2; g.add(gr);
    const rose = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24), winM || lam(mixc(wall, '#2a1c2a', 0.4)));
    rose.position.set(4.02, 3.0, 0); rose.rotation.y = Math.PI / 2; g.add(rose);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.6), lam(mixc(wall, '#2a1c2a', 0.5))); door.position.set(4.02, 0.8, 0); door.rotation.y = Math.PI / 2; g.add(door);
    g.position.set(bx, by, bz); g.rotation.y = -1.25; G.add(g);
    const cx = -10.5, cz = 1, cy = hgt(cx, cz) - 1.0, t = new THREE.Group();
    const tw = new THREE.Mesh(new THREE.BoxGeometry(1.7, 9.5, 1.7), lam(wallL)); tw.position.y = 4.75; t.add(tw);
    const ar = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.2), lam(mixc(wall, '#2a1c2a', 0.45))); ar.position.set(0, 8.2, 0.86); t.add(ar);
    const tr = roofMesh(1.7, 1.7, 1.8, roof); tr.position.y = 9.5 + 0.9; t.add(tr);
    t.position.set(cx, cy, cz); G.add(t); }
  // Rocca Maggiore: keep with merlons + a round-ish tower, on the summit behind the town
  { const rx = 6, rz = -7, ry = hgt(rx, rz) - 0.6, g = new THREE.Group(), c = mixc(wall, '#2a1c2a', 0.1);
    const keep = new THREE.Mesh(new THREE.BoxGeometry(7, 3.6, 4), lam(c)); keep.position.y = 1.8; g.add(keep);
    for (let k = 0; k < 6; k++) { const mr = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 4.1), lam(c)); mr.position.set(-3.1 + k * 1.24, 3.95, 0); g.add(mr); }
    const tw = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 6.5, 12), lam(mixc(wall, '#2a1c2a', 0.15))); tw.position.set(4.2, 3.25, 0.5); g.add(tw);
    g.position.set(rx, ry, rz); G.add(g); }
  G.position.set(x, 0, z); G.scale.setScalar(s); return G;
}

function stars(n, seed, op) {
  const r = rng(seed), pos = [];
  for (let k = 0; k < n; k++) {
    const az = (r() - 0.5) * 1.1, el = 0.2 + r() * 0.42, R = 900;
    pos.push(R * Math.sin(az) * Math.cos(el), R * Math.sin(el), -R * Math.cos(az) * Math.cos(el));
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 7, sizeAttenuation: false, map: dotTex, color: '#fff3d0', transparent: true, opacity: op, depthWrite: false, fog: false }));
}
function sprite(tex, scale, op = 1) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: op, depthWrite: false, fog: false }));
  s.scale.set(scale, scale, 1); return s;
}
// world point that shows at screen (sx, sy) at distance `dist` from the camera's starting pose
function atScreen(cam, sx, sy, dist) {
  const v = new THREE.Vector3((sx / W) * 2 - 1, -(sy / H) * 2 + 1, 0.5).unproject(cam).sub(cam.position).normalize();
  return cam.position.clone().addScaledVector(v, dist);
}

// The same gentle hand-held wobble reel.js puts on the SVG (x ±5 px, y ±3.5 px, roll ±0.3°), as small camera rotations
function yoyo(T, s0, half, a) {
  if (T < s0) return -a;
  const k = (T - s0) / half, n = Math.floor(k), e = EASE.sio(k - n);
  return n % 2 ? a - 2 * a * e : -a + 2 * a * e;
}

// ------------------------------------------------------------------ scenes
export { yoyo, EASE, clamp01, TH, W, H };
export const BUILD = {
  // Scene 1 (hook): Assisi at dusk, stars, a warm glow behind the town. Camera: push-fast (a real dolly forward).
  assisiDusk() {
    const scene = new THREE.Scene();
    scene.background = skyTex([[0, '#221f4e'], [0.34, '#5a3a6c'], [0.5, '#a85a7a'], [0.6, '#e88a6c'], [0.64, '#f0a070'], [1, '#f8c07a']]);
    scene.fog = new THREE.Fog('#ee9a70', 60, 520);
    scene.add(new THREE.HemisphereLight('#ffc4b4', '#3a2846', 1.7));
    const key = new THREE.DirectionalLight('#ffb27a', 2.4); key.position.set(-40, 30, -120); scene.add(key);
    const fill = new THREE.DirectionalLight('#a58ac4', 0.9); fill.position.set(30, 40, 80); scene.add(fill);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), lam('#4a3350')); ground.rotation.x = -Math.PI / 2; scene.add(ground);
    scene.add(ridge({ w: 1600, d: 90, z: -380, amp: 55, color: '#9a5c80', seed: 3, freq: 0.7 }));
    scene.add(ridge({ w: 1100, d: 70, z: -230, amp: 26, color: '#70466c', seed: 5 }));
    scene.add(hillTown({ z: -100, wall: '#7a5878', roof: '#5e3e60', hillC: '#55395c', win: '#ffd98a' }));
    scene.add(ridge({ w: 70, d: 30, x: -52, z: -52, amp: 6, color: '#4e3454', seed: 8, freq: 2 }));
    scene.add(ridge({ w: 70, d: 30, x: 52, z: -48, amp: 5, color: '#4e3454', seed: 9, freq: 2 }));
    [[-30, -60, 1.1], [-35, -70, 1.25], [-24, -78, 0.95], [27, -58, 1.15], [33, -68, 1.3], [22, -84, 0.9]]
      .forEach(([x, z, s]) => scene.add(cypress(x, z, s, '#2c2238')));
    const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.5, 3000);
    cam.position.set(0, 5, 0); cam.rotation.set(0.085, 0, 0, 'YXZ'); cam.updateMatrixWorld();
    const glow = sprite(glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]), 900);
    glow.position.copy(atScreen(cam, 540, 1150, 700)); scene.add(glow);
    const st1 = stars(30, 4, 0.9), st2 = stars(26, 9, 0.9); scene.add(st1, st2);
    const clouds = [[-60, 70, -330, 7, 1], [70, 95, -360, 8, 2], [10, 120, -420, 9, 3]].map(([x, y, z, s, sd]) => {
      const c = cloud(x, y, z, s, '#ffc9b0', 0.5, sd); scene.add(c); return [c, x]; });
    return { scene, cam, update(t, p) {
      cam.position.set(0, 5 - 0.7 * p, -16 * p);
      st1.material.opacity = 0.55 + 0.4 * Math.sin(t * 2.1);
      st2.material.opacity = 0.55 + 0.4 * Math.sin(t * 1.7 + 2);
      clouds.forEach(([c, x], k) => { c.position.x = x + t * (1.2 + k * 0.4); });
    } };
  },

  // Scene 2: sunny Umbrian countryside, Assisi on a far hill, cypresses and olive trees. Camera: pan-r (a real truck right).
  countryDay() {
    const scene = new THREE.Scene();
    scene.background = skyTex([[0, '#f09a62'], [0.3, '#f8d39a'], [0.5, '#c8e4ee'], [0.62, '#bfe0ec'], [1, '#bfe0ec']]);
    scene.fog = new THREE.Fog('#c4e0e8', 70, 620);
    scene.add(new THREE.HemisphereLight('#fff4dc', '#6f9a58', 1.9));
    const key = new THREE.DirectionalLight('#fff0cc', 2.6); key.position.set(-70, 80, 30); scene.add(key);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), lam('#8fbf6e')); ground.rotation.x = -Math.PI / 2; scene.add(ground);
    scene.add(ridge({ w: 1800, d: 100, z: -440, amp: 60, color: '#a8c4cc', seed: 2, freq: 0.6 }));
    scene.add(ridge({ w: 1300, d: 80, z: -280, amp: 30, color: '#b2cc98', seed: 6 }));
    scene.add(hillTown({ x: -14, z: -200, s: 0.7, wall: '#e2cba8', roof: '#c0623e', hillC: '#a8c48a', seed: 22 }));
    scene.add(ridge({ w: 900, d: 60, z: -120, amp: 3.5, color: '#9cc87a', seed: 12, freq: 1.4 }));
    // a row of cypresses along a lane and olive groves (near ones give the strongest parallax)
    for (let k = 0; k < 9; k++) scene.add(cypress(-8 + k * 7, -95 - k * 4, 1.15, '#3a6a3e'));
    const r = rng(31);
    for (let k = 0; k < 14; k++) scene.add(olive(-70 + k * 11 + (r() - 0.5) * 5, -55 - r() * 30, 0.9 + r() * 0.3, '#7f9a62', 40 + k));
    const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.5, 3000);
    cam.position.set(-8, 5, 0); cam.rotation.set(0.085, 0, 0, 'YXZ'); cam.updateMatrixWorld();
    const sun = sprite(glowTex([[0, 'rgba(255,250,232,1)'], [0.12, 'rgba(255,246,214,1)'], [0.16, 'rgba(255,226,150,.7)'], [0.45, 'rgba(255,200,120,.2)'], [1, 'rgba(255,200,120,0)']]), 520);
    sun.position.copy(atScreen(cam, 260, 690, 900)); scene.add(sun);
    const clouds = [[-90, 110, -420, 10, 4], [60, 140, -470, 12, 5], [150, 95, -380, 8, 6]].map(([x, y, z, s, sd]) => {
      const c = cloud(x, y, z, s, '#fffaf0', 0.95, sd, 0.85); scene.add(c); return [c, x]; });
    return { scene, cam, update(t, p) {
      cam.position.set(-8 + 16 * p, 5, 0);
      clouds.forEach(([c, x], k) => { c.position.x = x + t * (1.5 + k * 0.5); });
    } };
  },
};

// ------------------------------------------------------------------ wiring (one WebGL renderer per 3D scene clip)
// makeView(canvas, renderer): the 3D background of one scene clip; pose(T) moves its camera for timeline time T
export function makeView(cv, renderer) {
  const sc = cv.closest('.scene'), camEl = sc.querySelector('.cam');
  const LOOP = sc.hasAttribute('data-loop');
  const Z = +sc.dataset.zero, C = +sc.dataset.start, D = +sc.dataset.duration;
  const move = (camEl?.dataset.camv || 'push').split(/\s+/)[0];
  const fast = move === 'push-fast';
  const at = LOOP ? Z : Math.max(0, C - 0.4), span = (D + 0.8) * (fast ? 0.55 : 1), ease = fast ? EASE.p3o : EASE.sio;
  const hh0 = LOOP ? Z : Math.max(0, C - 0.8);
  const v = BUILD[cv.dataset.bg3d]();
  const base = v.cam.rotation.clone();
  return { sc, v, C, D, Z,
    active: (T) => T >= C - 0.05 && T <= C + D + 0.05,
    pose(T) {
      const t = Math.max(0, T - Z), p = ease(clamp01((T - at) / span));
      v.update(t, p);
      const px = yoyo(T, hh0 - 0.3, 2.65, 5), py = yoyo(T, hh0 - 1.1, 2.05, 3.5), rot = yoyo(T, hh0 - 0.7, 3.35, 0.3);
      v.cam.rotation.set(base.x + (py / 960) * TH, base.y + (px / 960) * TH, base.z + rot * Math.PI / 180, 'YXZ');
    } };
}
export function newRenderer(cv) {
  const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  r.setPixelRatio(1); r.setSize(W, H, false); return r;
}

if (!window.BG3D_MANUAL) {
  const views = [...document.querySelectorAll('canvas.bg3d')].map((cv) => { const renderer = newRenderer(cv); return { renderer, ...makeView(cv, renderer) }; });
  const renderAt = (T) => {
    for (const w of views) {
      if (!w.active(T)) continue;   // clip not on screen: skip the GPU work
      w.pose(T); w.renderer.render(w.v.scene, w.v.cam);
    }
  };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
