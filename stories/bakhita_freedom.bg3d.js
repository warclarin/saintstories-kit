// three.js backgrounds for St. Josephine Bakhita: the freedom story (browser module; build.mjs copies it to
// work/<slug>/bg3d.mjs because STORY.bg3d points here). The characters stay 2D SVG on top; this draws the sky,
// the Venice canal, the Darfur savanna and two interiors (the sisters' chapel, a palace hall) in real 3D.
// Deterministic: every frame is drawn from timeline time in HyperFrames' hf-seek listener (no clocks, no Math.random).
// Reusable for later 3D reels: venice(), savanna(), hall() and the helpers are exported.
import * as THREE from './three.module.min.js';

export const W = 1080, H = 1920, FOV = 38;
export const TH = Math.tan((FOV / 2) * Math.PI / 180);   // half-height of the view at distance 1
export function rng(seed) {   // mulberry32
  return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export const clamp01 = (x) => Math.min(1, Math.max(0, x));
export const EASE = { p3o: (x) => 1 - (1 - x) ** 3, sio: (x) => -(Math.cos(Math.PI * x) - 1) / 2 };
const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);

// ------------------------------------------------------------------ textures
export function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export const skyTex = (stops) => canvasTex(4, 1024, (g, w, h) => { const l = g.createLinearGradient(0, 0, 0, h); stops.forEach(([o, c]) => l.addColorStop(o, c)); g.fillStyle = l; g.fillRect(0, 0, w, h); });
export const glowTex = (stops) => canvasTex(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 0, 128, 128, 128); stops.forEach(([o, c]) => r.addColorStop(o, c)); g.fillStyle = r; g.fillRect(0, 0, 256, 256); });
const dotTex = glowTex([[0, 'rgba(255,255,255,1)'], [0.35, 'rgba(255,255,255,.8)'], [1, 'rgba(255,255,255,0)']]);
const warmGlow = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
// floor tiles (two colours), repeated
function tileTex(a, b, rep) {
  const t = canvasTex(128, 128, (g) => { g.fillStyle = a; g.fillRect(0, 0, 128, 128); g.fillStyle = b; g.fillRect(0, 0, 64, 64); g.fillRect(64, 64, 64, 64);
    g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 2; g.strokeRect(0, 0, 128, 128); g.strokeRect(0, 0, 64, 64); g.strokeRect(64, 64, 64, 64); });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); t.anisotropy = 4; return t;
}
// soft horizontal light streaks for water
function streakTex(seed, color = '255,255,255') {
  const r = rng(seed);
  const t = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512);
    for (let k = 0; k < 90; k++) { const x = r() * 256, y = r() * 512, w = 12 + r() * 50; g.fillStyle = `rgba(${color},${0.12 + r() * 0.3})`; g.fillRect(x, y, w, 2 + r() * 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
const stripeTex = (a, b) => { const t = canvasTex(16, 64, (g) => { for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? a : b; g.fillRect(0, k * 8, 16, 8); } }); return t; };

// ------------------------------------------------------------------ materials + shared pieces
export const lam = (color, o = {}) => new THREE.MeshLambertMaterial({ color, ...o });
export const glowMat = (color, op = 1) => new THREE.MeshBasicMaterial({ color, transparent: op < 1, opacity: op });
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);

export function ridge({ w = 800, d = 60, x = 0, z, y = 0, amp, color, seed = 1, freq = 1, segX = 160 }) {
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
export function cloud(x, y, z, s, color, op, seed, glow = 0.45) {
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
export function stars(n, seed, op, { size = 7, el0 = 0.12, el1 = 0.62, spread = 1.3 } = {}) {
  const r = rng(seed), pos = [];
  for (let k = 0; k < n; k++) {
    const az = (r() - 0.5) * spread, el = el0 + r() * (el1 - el0), R = 900;
    pos.push(R * Math.sin(az) * Math.cos(el), R * Math.sin(el), -R * Math.cos(az) * Math.cos(el));
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size, sizeAttenuation: false, map: dotTex, color: '#fff3d0', transparent: true, opacity: op, depthWrite: false, fog: false }));
}
export function sprite(tex, scale, op = 1, blend = false) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: op, depthWrite: false, fog: false, ...(blend ? { blending: THREE.AdditiveBlending } : {}) }));
  s.scale.set(scale, scale, 1); return s;
}
// world point that shows at screen (sx, sy) at distance `dist` from the camera's starting pose
export function atScreen(cam, sx, sy, dist) {
  const v = new THREE.Vector3((sx / W) * 2 - 1, -(sy / H) * 2 + 1, 0.5).unproject(cam).sub(cam.position).normalize();
  return cam.position.clone().addScaledVector(v, dist);
}
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}

// ------------------------------------------------------------------ Venice: a canal between palazzi, a bridge, a campanile and a dome
const PAL = {
  dusk: { walls: ['#8a5a6a', '#9a6a5a', '#7a5070', '#a87060', '#8e6478'], roof: '#5a3a4e', stone: '#b89aa0', water: '#4a3e6a', win: '#ffd98a', far: '#9a6a86' },
  day: { walls: ['#e0a878', '#d98a6a', '#e8c890', '#c9705a', '#efd8b0', '#e6b49a'], roof: '#b0583e', stone: '#efe6d6', water: '#3f8aa8', win: '#4a3a3a', far: '#d9c8b8' },
};
function palazzo(side, z, w, h, c, P, r, lit) {
  const g = new THREE.Group(), dep = 8;
  const body = box(dep, h, w, lam(c)); body.position.y = h / 2; g.add(body);
  const corn = box(dep + 0.6, 0.5, w + 0.3, lam(mixc(c, '#2a1c2a', 0.25))); corn.position.y = h + 0.1; g.add(corn);
  const face = -side * dep / 2 - 0.02;   // canal-facing side (x)
  const winMat = lit ? glowMat(P.win) : lam(P.win), darkWin = lam(mixc(c, '#2a1c2a', 0.55));
  const rows = Math.floor((h - 2.4) / 2.6), cols = Math.max(2, Math.floor(w / 2.2));
  for (let a = 0; a < rows; a++) for (let b = 0; b < cols; b++) {
    const on = lit ? r() < 0.45 : true;
    const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.5), on ? winMat : darkWin);
    wn.position.set(face, 2.6 + a * 2.6, -w / 2 + (b + 0.5) * (w / cols)); wn.rotation.y = -side * Math.PI / 2; g.add(wn);
    const arch = new THREE.Mesh(new THREE.CircleGeometry(0.45, 12, 0, Math.PI), on ? winMat : darkWin);
    arch.position.set(face, 2.6 + a * 2.6 + 0.75, wn.position.z); arch.rotation.y = -side * Math.PI / 2; g.add(arch);
  }
  // water door at the base
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.2), lam(mixc(c, '#1a1020', 0.6))); door.position.set(face, 1.1, 0); door.rotation.y = -side * Math.PI / 2; g.add(door);
  // a Venetian funnel chimney on some roofs
  if (r() < 0.6) {
    const ch = new THREE.Group(), cm = lam(mixc(c, '#2a1c2a', 0.15));
    const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.6, 8), cm); s1.position.y = 0.8;
    const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.22, 0.9, 8), cm); s2.position.y = 2.0;
    ch.add(s1, s2); ch.position.set((r() - 0.5) * 3, h + 0.3, (r() - 0.5) * (w - 1)); g.add(ch);
  }
  g.position.set(side * (11 + dep / 2), 0, z); return g;
}
function bridge(z, color) {
  const s = new THREE.Shape();
  s.moveTo(-10.5, 0); s.lineTo(-10.5, 3.0); s.quadraticCurveTo(0, 5.4, 10.5, 3.0); s.lineTo(10.5, 0); s.lineTo(7.4, 0);
  s.absellipse(0, 0, 7.4, 3.3, 0, Math.PI, false); s.lineTo(-10.5, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: 2.4, bevelEnabled: false }); g.translate(0, 0, -1.2);
  const m = new THREE.Mesh(g, lam(color)); m.position.z = z;
  // parapet: a thin band following the top of the arch
  const band = new THREE.Shape(); band.moveTo(-10.5, 3.0); band.quadraticCurveTo(0, 5.4, 10.5, 3.0); band.lineTo(10.5, 3.6); band.quadraticCurveTo(0, 6.0, -10.5, 3.6); band.lineTo(-10.5, 3.0);
  const bg = new THREE.ExtrudeGeometry(band, { depth: 2.6, bevelEnabled: false }); bg.translate(0, 0, -1.3);
  const par = new THREE.Mesh(bg, lam(mixc(color, '#2a1c2a', 0.15))); par.position.z = z;
  const grp = new THREE.Group(); grp.add(m, par);
  return grp;
}
function campanile(x, z, c, roof) {
  const g = new THREE.Group();
  const shaft = box(3.2, 34, 3.2, lam(c)); shaft.position.y = 17; g.add(shaft);
  const bell = box(3.6, 4, 3.6, lam(mixc(c, '#fff6e0', 0.2))); bell.position.y = 36; g.add(bell);
  const op = box(3.65, 2.2, 1.2, lam('#2a1c2a')); op.position.y = 36; g.add(op);
  const top = new THREE.Mesh(new THREE.ConeGeometry(2.6, 6, 4), lam(roof)); top.rotation.y = Math.PI / 4; top.position.y = 41; g.add(top);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), glowMat('#f2c46b')); tip.position.y = 44.5; g.add(tip);
  g.position.set(x, 0, z); return g;
}
function dome(x, z, c) {
  const g = new THREE.Group();
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 8, 9, 24), lam(c)); drum.position.y = 4.5; g.add(drum);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(7.2, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), lam(mixc(c, '#8a9aa8', 0.25))); cap.position.y = 9; g.add(cap);
  const lan = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 3, 12), lam(c)); lan.position.y = 17.4; g.add(lan);
  const cr = box(0.3, 2, 0.3, glowMat('#f2c46b')); cr.position.y = 20; g.add(cr);
  g.position.set(x, 0, z); return g;
}
function gondola(x, z) {
  const g = new THREE.Group(), m = lam('#16121a');
  const hull = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), m); hull.scale.set(0.75, 0.42, 5.2); g.add(hull);
  const prow = box(0.12, 1.3, 0.5, lam('#d8d0c0')); prow.position.set(0, 0.8, -5.0); g.add(prow);
  g.position.set(x, 0.12, z); return g;
}
function pole(x, z, a, b, h = 5) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, h, 8), new THREE.MeshLambertMaterial({ map: stripeTex(a, b) }));
  m.position.set(x, h / 2 - 0.6, z); return m;
}
export function venice(mode = 'dusk') {
  const dusk = mode === 'dusk', P = PAL[mode], r = rng(dusk ? 11 : 12);
  const scene = new THREE.Scene();
  scene.background = skyTex(dusk
    ? [[0, '#221f4e'], [0.3, '#5a3a6c'], [0.46, '#a85a7a'], [0.56, '#e88a6c'], [0.62, '#f6b070'], [1, '#f8c07a']]
    : [[0, '#3f8fcc'], [0.4, '#9fd0ea'], [0.6, '#f2e6c4'], [1, '#f6e3b8']]);
  scene.fog = new THREE.Fog(dusk ? '#c87a86' : '#d8e6ea', 50, 300);
  scene.add(new THREE.HemisphereLight(dusk ? '#ffc4b4' : '#fff4dc', dusk ? '#3a2846' : '#8a9a8a', dusk ? 1.6 : 2.0));
  const key = new THREE.DirectionalLight(dusk ? '#ffb27a' : '#fff0cc', dusk ? 2.0 : 2.6); key.position.set(dusk ? -30 : -60, dusk ? 20 : 70, dusk ? -120 : 40); scene.add(key);
  const fill = new THREE.DirectionalLight(dusk ? '#a58ac4' : '#cfe0ff', 0.8); fill.position.set(40, 30, 60); scene.add(fill);
  // water + moving light streaks
  const water = new THREE.Mesh(new THREE.PlaneGeometry(400, 900), lam(P.water)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -300); scene.add(water);
  const st = streakTex(dusk ? 3 : 4, dusk ? '255,214,160' : '255,255,255'); st.repeat.set(3, 40);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(22, 420), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: dusk ? 0.7 : 0.55, depthWrite: false }));
  sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, 0.03, -200); scene.add(sheen);
  // quays and palazzi on both sides
  for (const side of [-1, 1]) {
    const quay = box(3.2, 0.7, 420, lam(P.stone)); quay.position.set(side * 9.6, 0.35, -200); scene.add(quay);
    let z = 12;
    while (z > -230) {
      const w = 5 + r() * 5, h = 8 + r() * 9, c = P.walls[Math.floor(r() * P.walls.length)];
      scene.add(palazzo(side, z - w / 2, w, h, c, P, r, dusk && z > -150));
      z -= w + 0.25;
    }
  }
  scene.add(bridge(-62, P.stone));
  scene.add(campanile(-7, -265, P.far, P.roof));
  scene.add(dome(12, -300, mixc(P.far, '#ffffff', 0.25)));
  // a far row of roofs behind the canal end
  for (let k = 0; k < 14; k++) { const b = box(7, 6 + r() * 8, 6, lam(P.far)); b.position.set(-48 + k * 7.5, 3, -330 - r() * 20); scene.add(b); }
  const gond = gondola(5.6, -20); scene.add(gond);
  const gond2 = gondola(-6.2, -44); gond2.rotation.y = 0.08; scene.add(gond2);
  [[4.0, -12], [4.0, -15], [-4.4, -34], [-4.4, -37]].forEach(([x, z], i) => scene.add(pole(x, z, i < 2 ? '#2f5a9a' : '#b03030', '#f6f0e2')));
  const cam = camera(0, 3.2, 0, 0.065);
  const sunS = sprite(warmGlow, dusk ? 1000 : 520, dusk ? 0.9 : 0.85); sunS.position.copy(atScreen(cam, dusk ? 560 : 240, dusk ? 1120 : 640, 900)); scene.add(sunS);
  const st1 = dusk ? stars(30, 4, 0.9, { el0: 0.3 }) : null; if (st1) scene.add(st1);
  const cl = (dusk ? [[-70, 50, -360, 8, 1], [60, 62, -400, 9, 2], [0, 78, -450, 10, 3]] : [[-110, 62, -420, 10, 4], [80, 78, -470, 12, 5], [170, 55, -380, 8, 6]])
    .map(([x, y, z, s, sd]) => { const c = cloud(x, y, z, s, dusk ? '#ffc9b0' : '#fffaf0', dusk ? 0.55 : 0.95, sd, dusk ? 0.45 : 0.85); scene.add(c); return [c, x]; });
  return { scene, cam, update(t, p) {
    if (dusk) cam.position.set(0, 3.2 - 0.4 * p, -11 * p);        // push-fast: glide forward along the canal
    else cam.position.set(2.6 - 5.2 * p, 3.2, -1);               // pan-l: truck left along the quay
    st.offset.y = -t * 0.035; st.offset.x = Math.sin(t * 0.7) * 0.02;
    gond.position.y = 0.12 + 0.06 * Math.sin(t * 1.6); gond.rotation.z = 0.02 * Math.sin(t * 1.3);
    gond2.position.y = 0.12 + 0.05 * Math.sin(t * 1.4 + 1);
    if (st1) st1.material.opacity = 0.55 + 0.4 * Math.sin(t * 2.1);
    cl.forEach(([c, x], k) => { c.position.x = x + t * (1.2 + k * 0.4); });
  } };
}

// ------------------------------------------------------------------ Darfur savanna: acacias, a village of round huts, rocky hills
function acacia(x, z, s, c, seed) {
  const g = new THREE.Group(), r = rng(seed), bark = lam('#5a3d2a');
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.3, 4.2, 6), bark); tr.position.y = 2.1; tr.rotation.z = (r() - 0.5) * 0.25; g.add(tr);
  for (let k = 0; k < 2; k++) { const br = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 2.4, 5), bark); br.position.set((k ? 1 : -1) * 0.7, 3.8, 0); br.rotation.z = (k ? -1 : 1) * 0.7; g.add(br); }
  for (let k = 0; k < 3; k++) {
    const cr = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 8), lam(k === 1 ? mixc(c, '#fff6e0', 0.12) : c));
    cr.scale.set(2.2 + r() * 1.2, 0.55, 1.8 + r()); cr.position.set((k - 1) * 1.6, 4.8 + r() * 0.5, (r() - 0.5)); g.add(cr);
  }
  g.position.set(x, 0, z); g.scale.setScalar(s); return g;
}
function tukul(x, z, s, wall, thatch, door) {
  const g = new THREE.Group();
  const w = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.7, 2.0, 16), lam(wall)); w.position.y = 1.0; g.add(w);
  const rf = new THREE.Mesh(new THREE.ConeGeometry(2.2, 2.4, 16), lam(thatch)); rf.position.y = 3.15; g.add(rf);
  const d = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.3), door); d.position.set(0, 0.65, 1.66); g.add(d);
  g.position.set(x, 0, z); g.scale.setScalar(s); return g;
}
function rock(x, z, s, c, seed) {
  const r = rng(seed), m = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 0), lam(c));
  m.scale.set(s * (1 + r() * 0.6), s * (0.6 + r() * 0.4), s); m.rotation.set(r(), r() * 3, r()); m.position.set(x, s * 0.25, z); return m;
}
export function savanna(mode = 'sunset') {
  const night = mode === 'night', r = rng(night ? 51 : 52);
  const scene = new THREE.Scene();
  scene.background = skyTex(night
    ? [[0, '#0b1030'], [0.35, '#1e2858'], [0.52, '#4a4a82'], [0.6, '#8a6a92'], [0.64, '#c88a8a'], [1, '#c88a8a']]
    : [[0, '#4a2e66'], [0.28, '#b0566e'], [0.46, '#ec8a5a'], [0.6, '#f8c070'], [1, '#f8d090']]);
  scene.fog = new THREE.Fog(night ? '#5a4a7a' : '#f2a46c', 60, 420);
  scene.add(new THREE.HemisphereLight(night ? '#8a9ad8' : '#ffd0a0', night ? '#2a2034' : '#6a4a2a', night ? 1.3 : 1.8));
  const key = new THREE.DirectionalLight(night ? '#b8c4ff' : '#ffb070', night ? 1.0 : 2.6); key.position.set(night ? 40 : 20, night ? 60 : 14, -120); scene.add(key);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), lam(night ? '#3a3048' : '#c8955a')); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  scene.add(ridge({ w: 1600, d: 90, z: -400, amp: 46, color: night ? '#4a3e6a' : '#b0646a', seed: 7, freq: 0.8 }));
  scene.add(ridge({ w: 1200, d: 70, z: -250, amp: 18, color: night ? '#3e3456' : '#c0785a', seed: 8, freq: 1.3 }));
  // jebel: rocky outcrops on the plain
  [[-60, -170, 9], [-48, -190, 6], [70, -210, 11], [84, -190, 7]].forEach(([x, z, s], i) => scene.add(rock(x, z, s, night ? '#4a405e' : '#9a5a4a', 60 + i)));
  for (let k = 0; k < 14; k++) scene.add(rock(-40 + r() * 80, -20 - r() * 70, 0.4 + r() * 0.6, night ? '#4e4460' : '#a8744e', 80 + k));
  // acacias
  [[-26, -40, 1.2], [-9, -90, 1.0], [24, -60, 1.3], [44, -110, 1.0], [-50, -120, 1.1], [8, -150, 0.9], [-70, -70, 1.2], [70, -50, 1.1]]
    .forEach(([x, z, s], i) => scene.add(acacia(x, z, s, night ? '#2e3a3a' : '#5a7a3a', 20 + i)));
  // village of round huts on the right (the home she was taken from)
  const doorM = night ? glowMat('#ffb060') : lam('#2a1a14');
  [[6, -48, 1.2], [10.5, -55, 1.0], [14, -46, 1.1], [8, -64, 0.9], [17, -60, 1.0], [21, -50, 0.85]]
    .forEach(([x, z, s]) => scene.add(tukul(x, z, s, night ? '#5a4650' : '#b07a4a', night ? '#6a5a50' : '#d4a85a', doorM)));
  const cam = camera(0, 3.0, 0, 0.07);
  const sunS = sprite(warmGlow, night ? 700 : 1100, night ? 0.5 : 1.0); sunS.position.copy(atScreen(cam, night ? 540 : 680, night ? 1180 : 1130, 900)); scene.add(sunS);
  let st1 = null, st2 = null, moon = null;
  if (night) {
    st1 = stars(140, 5, 0.95, { size: 6, el0: 0.1, el1: 0.75, spread: 1.6 }); st2 = stars(70, 9, 0.9, { size: 9, el0: 0.15, el1: 0.7, spread: 1.6 });
    scene.add(st1, st2);
    moon = sprite(glowTex([[0, 'rgba(255,252,236,1)'], [0.1, 'rgba(255,250,230,1)'], [0.14, 'rgba(220,226,255,.45)'], [1, 'rgba(200,210,255,0)']]), 260);
    moon.position.copy(atScreen(cam, 860, 560, 900)); scene.add(moon);
  }
  const cl = (night ? [[-80, 90, -380, 9, 7]] : [[-80, 85, -380, 9, 7], [70, 120, -420, 10, 8]])
    .map(([x, y, z, s, sd]) => { const c = cloud(x, y, z, s, night ? '#8a8ab8' : '#ffc4a0', night ? 0.35 : 0.6, sd, night ? 0.25 : 0.5); scene.add(c); return [c, x]; });
  return { scene, cam, update(t, p) {
    let o = {};
    if (night) {   // arc-r: circle slowly around a point in front of the camera, with a slight roll
      const a = -0.13 + 0.26 * p, R = 36;
      cam.position.set(Math.sin(a) * R, 3.0, -R + Math.cos(a) * R);
      o = { ry: a * 0.9, rz: (p - 0.5) * 0.012 };
      st1.material.opacity = 0.6 + 0.35 * Math.sin(t * 2.3); st2.material.opacity = 0.6 + 0.35 * Math.sin(t * 1.7 + 2);
    } else cam.position.set(-6 + 12 * p, 3.0, 0);   // pan-r: truck right toward the village
    cl.forEach(([c, x], k) => { c.position.x = x + t * (1.0 + k * 0.4); });
    return o;
  } };
}

// ------------------------------------------------------------------ interiors: the sisters' chapel / a palace hall
function column(x, z, h, c) {
  const g = new THREE.Group(), m = lam(c), d = lam(mixc(c, '#2a1c2a', 0.18));
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.56, h, 16), m); sh.position.y = h / 2; g.add(sh);
  const base = box(1.5, 0.5, 1.5, d); base.position.y = 0.25; g.add(base);
  const cap = box(1.6, 0.55, 1.6, d); cap.position.y = h + 0.27; g.add(cap);
  g.position.set(x, 0, z); return g;
}
function candle(x, y, z) {
  const g = new THREE.Group();
  const c = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.0, 8), lam('#f6f0e2')); c.position.y = 0.5; g.add(c);
  const fl = sprite(warmGlow, 1.4, 0.95, true); fl.position.y = 1.15; g.add(fl);
  g.position.set(x, y, z); g.userData.flame = fl; return g;
}
export function hall(mode = 'chapel') {
  const chapel = mode === 'chapel', r = rng(chapel ? 71 : 72);
  const C = chapel
    ? { wall: '#c9a88e', col: '#e8dcc8', floorA: '#d8c4b0', floorB: '#a8746a', ceil: '#6a4a4a', fog: '#7a5650', bg: [[0, '#2a1a24'], [1, '#5a3a3a']] }
    : { wall: '#d8c8a8', col: '#f0e8d8', floorA: '#efe6d6', floorB: '#8a8a96', ceil: '#8a6a52', fog: '#a8907a', bg: [[0, '#4a3a30'], [1, '#8a7058']] };
  const scene = new THREE.Scene();
  scene.background = skyTex(C.bg);
  scene.fog = new THREE.Fog(C.fog, 30, 120);
  scene.add(new THREE.HemisphereLight(chapel ? '#ffd8b0' : '#fff2dc', '#4a3030', chapel ? 1.3 : 1.7));
  const key = new THREE.DirectionalLight('#ffe0a8', 1.6); key.position.set(-20, 30, 10); scene.add(key);
  const L = 90;   // hall length, from z = +16 (behind the camera, for the dolly) to the back wall
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(26, L + 30), lam('#ffffff', { map: tileTex(C.floorA, C.floorB, [9, (L + 30) / 2.9]) }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, 16 - (L + 30) / 2); scene.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(26, L + 30), lam(C.ceil, { side: THREE.DoubleSide })); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, 15, 16 - (L + 30) / 2); scene.add(ceil);
  const back = -L + 16;
  for (const side of [-1, 1]) {
    const wall = box(1, 16, L + 30, lam(C.wall)); wall.position.set(side * 12.5, 8, 16 - (L + 30) / 2); scene.add(wall);
    const beam = box(1.6, 1.2, L + 30, lam(mixc(C.col, '#2a1c2a', 0.12))); beam.position.set(side * 7, 10.5, 16 - (L + 30) / 2); scene.add(beam);
    for (let z = 14; z > back + 4; z -= 7) {
      scene.add(column(side * 7, z, 10, C.col));
      // a tall window in the outer wall between columns, glowing
      const wn = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 6), glowMat(chapel ? '#ffd9a0' : '#fff2d0', 0.9));
      wn.position.set(side * 11.98, 7, z - 3.5); wn.rotation.y = -side * Math.PI / 2; scene.add(wn);
      const wa = new THREE.Mesh(new THREE.CircleGeometry(1.2, 16, 0, Math.PI), wn.material); wa.position.set(side * 11.98, 10, z - 3.5); wa.rotation.y = -side * Math.PI / 2; scene.add(wa);
    }
  }
  for (let z = 14; z > back; z -= 7) { const rib = box(26, 0.6, 0.8, lam(mixc(C.ceil, '#2a1c2a', 0.2))); rib.position.set(0, 14.6, z); scene.add(rib); }
  // light shafts from the left windows
  const shaftM = new THREE.MeshBasicMaterial({ color: '#ffe4b0', transparent: true, opacity: chapel ? 0.10 : 0.08, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
  for (let z = 10; z > back + 10; z -= 14) { const sh = new THREE.Mesh(new THREE.PlaneGeometry(3, 18), shaftM); sh.position.set(-5, 6, z - 3); sh.rotation.set(0, Math.PI / 2, -0.75); scene.add(sh); }
  const backWall = box(26, 16, 1, lam(C.wall)); backWall.position.set(0, 8, back); scene.add(backWall);
  const flames = [];
  if (chapel) {
    // apse arch, altar, a glowing crucifix, candles and a round window
    const AX = -3.6;
    const apse = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), lam('#5a3a3e')); apse.position.set(AX, 4.5, back + 0.55); scene.add(apse);
    const apseTop = new THREE.Mesh(new THREE.CircleGeometry(4.5, 24, 0, Math.PI), apse.material); apseTop.position.set(AX, 9, back + 0.55); scene.add(apseTop);
    const glow = sprite(warmGlow, 16, 0.9, true); glow.position.set(AX, 7.2, back + 1.2); scene.add(glow);
    const alt = box(6, 1.6, 2, lam('#7e5a3c')); alt.position.set(AX, 0.8, back + 2); scene.add(alt);
    const cloth = box(6.3, 0.25, 2.2, lam('#fbf6ea')); cloth.position.set(AX, 1.65, back + 2); scene.add(cloth);
    const crossM = lam('#7a5232', { emissive: '#4a2a14', emissiveIntensity: 0.3 });
    const cv = box(0.35, 5, 0.3, crossM); cv.position.set(AX, 6.5, back + 1); scene.add(cv);
    const ch = box(2.6, 0.35, 0.3, crossM); ch.position.set(AX, 7.6, back + 1); scene.add(ch);
    const body = box(0.3, 1.8, 0.2, lam('#f0d8b8')); body.position.set(AX, 6.9, back + 1.2); scene.add(body);
    [-2.4, -1.5, 1.5, 2.4].forEach((x) => { const c = candle(AX + x, 1.78, back + 2); scene.add(c); flames.push(c.userData.flame); });
  } else {
    // a great window with red curtains, a gold-framed painting each side, chandeliers
    const win = new THREE.Mesh(new THREE.PlaneGeometry(6, 10), glowMat('#fff0c8')); win.position.set(0, 7, back + 0.55); scene.add(win);
    const winTop = new THREE.Mesh(new THREE.CircleGeometry(3, 24, 0, Math.PI), win.material); winTop.position.set(0, 12, back + 0.55); scene.add(winTop);
    const glow = sprite(warmGlow, 22, 0.75, true); glow.position.set(0, 8, back + 1.5); scene.add(glow);
    for (const side of [-1, 1]) {
      const cur = box(1.6, 11, 0.4, lam('#9a2030')); cur.position.set(side * 3.8, 6.5, back + 0.8); scene.add(cur);
      const fr = box(3.4, 4.4, 0.3, lam('#c9a24a', { emissive: '#5a4010', emissiveIntensity: 0.3 })); fr.position.set(side * 8, 7, back + 0.7); scene.add(fr);
      const pic = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.8), lam(side < 0 ? '#5a4a6a' : '#4a5a4a')); pic.position.set(side * 8, 7, back + 0.86); scene.add(pic);
    }
    const flag = box(0.12, 4, 0.12, lam('#6a6a6a')); flag.position.set(9, 2, back + 6); scene.add(flag);
    [-1, 0, 1].forEach((k) => { const st = box(0.8, 1.6, 0.04, lam(['#2f8a4a', '#f6f2e8', '#c8323a'][k + 1])); st.position.set(9.5 + k * 0.8, 3.2, back + 6); scene.add(st); });
    // no chandelier: centred, it read as a halo above Bakhita's head
    for (const z of []) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.08, 6, 24), lam('#c9a24a')); ring.rotation.x = Math.PI / 2; ring.position.set(0, 8.5, z); scene.add(ring);
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, fl = sprite(warmGlow, 1.6, 0.9, true); fl.position.set(Math.cos(a) * 1.4, 8.8, z + Math.sin(a) * 1.4); scene.add(fl); flames.push(fl); }
    }
    const desk = box(5, 1.4, 2, lam('#6a4a2e')); desk.position.set(0, 0.7, back + 8); scene.add(desk);
  }
  const cam = camera(0, 4.2, 0, 0.05);
  const f0 = FOV, d0 = 10;
  return { scene, cam, update(t, p) {
    if (chapel) {   // dolly zoom: the camera backs away while the lens zooms in, so the altar looms behind her
      const z = 7 * p; cam.position.set(0, 4.2, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    } else cam.position.set(0, 4.2, -9 * p);   // push: a slow dolly toward the window
    flames.forEach((fl, k) => { fl.material.opacity = 0.75 + 0.2 * Math.sin(t * 7 + k * 1.7); });
    return {};
  } };
}

// ------------------------------------------------------------------ the scenes this reel uses
export const BUILD = {
  veniceDusk: () => venice('dusk'),
  veniceDay: () => venice('day'),
  darfur: () => savanna('sunset'),
  starNight: () => savanna('night'),
  chapel: () => hall('chapel'),
  palace: () => hall('palace'),
};

// The same gentle hand-held wobble reel.js puts on the SVG (x ±5 px, y ±3.5 px, roll ±0.3°), as small camera rotations
export function yoyo(T, s0, half, a) {
  if (T < s0) return -a;
  const k = (T - s0) / half, n = Math.floor(k), e = EASE.sio(k - n);
  return n % 2 ? a - 2 * a * e : -a + 2 * a * e;
}

// ------------------------------------------------------------------ wiring (one WebGL renderer per 3D scene clip)
// update(t, p) may return { ry, rz } (extra yaw / roll in radians) for moves like an arc.
export function makeView(cv, build = BUILD) {
  const sc = cv.closest('.scene'), camEl = sc.querySelector('.cam');
  const LOOP = sc.hasAttribute('data-loop');
  const Z = +sc.dataset.zero, C = +sc.dataset.start, D = +sc.dataset.duration;
  const move = (camEl?.dataset.camv || 'push').split(/\s+/)[0];
  const fast = move === 'push-fast';
  const at = LOOP ? Z : Math.max(0, C - 0.4), span = (D + 0.8) * (fast ? 0.55 : 1), ease = fast ? EASE.p3o : EASE.sio;
  const hh0 = LOOP ? Z : Math.max(0, C - 0.8);
  const v = build[cv.dataset.bg3d]();
  const base = v.cam.rotation.clone();
  return { sc, v, C, D, Z,
    active: (T) => T >= C - 0.05 && T <= C + D + 0.05,
    pose(T) {
      const t = Math.max(0, T - Z), p = ease(clamp01((T - at) / span));
      const o = v.update(t, p) || {};
      const px = yoyo(T, hh0 - 0.3, 2.65, 5), py = yoyo(T, hh0 - 1.1, 2.05, 3.5), rot = yoyo(T, hh0 - 0.7, 3.35, 0.3);
      v.cam.rotation.set(base.x + (py / 960) * TH, base.y + (px / 960) * TH + (o.ry || 0), base.z + rot * Math.PI / 180 + (o.rz || 0), 'YXZ');
    } };
}
export function newRenderer(cv) {
  const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  r.setPixelRatio(1); r.setSize(W, H, false); return r;
}

if (!window.BG3D_MANUAL) {
  const views = [...document.querySelectorAll('canvas.bg3d')].map((cv) => { const renderer = newRenderer(cv); return { renderer, ...makeView(cv) }; });
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
