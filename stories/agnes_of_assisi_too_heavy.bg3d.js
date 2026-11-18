// three.js backgrounds for St. Agnes of Assisi: "too heavy to lift" (Mount Subasio, 1212; browser module, build.mjs copies
// it to work/<slug>/bg3d.mjs). One Umbrian landscape seen from the slope of Mount Subasio behind EVERY scene (all-3D
// backgrounds, the user's rule since 2026-11-18). Seven set-ups; each makes its scene's camera move itself, because the canvas
// sits outside the SVG camera: 'hook' (push-fast), 'dawn' (pan-r), 'church' (push), 'slope' (pan-l), 'miracle' (dolly),
// 'gold' (tilt-up through a view offset; rack focus = fog closing in), 'glory' (arc). The three main looks:
//   'hook'    clear morning: sun and soft god rays to the upper right, shaded cumulus, Assisi on its hill in the gap above
//             the characters, push-fast
//   'miracle' a heavy grey-violet sky with a break of warm light whose rays grow stronger over the scene; dolly zoom
//   'glory'   sunset: the sun sinking behind the Apennines, pink-lit clouds, first stars, Assisi's windows lit; arc-r
// Layers, far to near: sky gradient + sun + rays -> clouds -> three Apennine ridges in aerial perspective -> the valley of
// Spoleto as a patchwork of fields with farmhouses and cypress lines, under drifting mist -> Assisi in pink Subasio stone
// (town wall, towers, San Rufino's campanile, the Rocca) -> olive groves in the valley -> the brow of the slope ending just behind
// the characters, so the valley spreads out below them. Deterministic: everything is drawn from timeline time.
// Exported for later reels: subasio(mode), assisi3d(), cypress3d(), olive3d(), cumulus(), godRays(), fields().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, sprite, atScreen, newRenderer, makeView, stars } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,220,160,.75)'], [0.55, 'rgba(255,180,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const disc = glowTex([[0, 'rgba(255,252,236,1)'], [0.42, 'rgba(255,246,214,1)'], [0.5, 'rgba(255,226,170,.6)'], [1, 'rgba(255,200,140,0)']]);
const mistTex = glowTex([[0, 'rgba(255,248,238,.8)'], [0.45, 'rgba(250,242,232,.35)'], [1, 'rgba(250,242,232,0)']]);
const rayTex = canvasTex(64, 512, (g, w, h) => {
  const l = g.createLinearGradient(0, 0, 0, h); l.addColorStop(0, 'rgba(255,240,200,.9)'); l.addColorStop(0.35, 'rgba(255,232,190,.35)'); l.addColorStop(1, 'rgba(255,230,190,0)');
  g.fillStyle = l; g.fillRect(0, 0, w, h);
  const s = g.createLinearGradient(0, 0, w, 0); s.addColorStop(0, 'rgba(0,0,0,1)'); s.addColorStop(0.5, 'rgba(0,0,0,0)'); s.addColorStop(1, 'rgba(0,0,0,1)');
  g.globalCompositeOperation = 'destination-out'; g.fillStyle = s; g.fillRect(0, 0, w, h);
});

/** A tall Italian cypress. Base at (x, y, z). */
export function cypress3d(x, z, h, c = '#2e4a32', y = 0) {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.03, h * 0.04, h * 0.15, 5), lam('#4a3424')); t.position.y = h * 0.07; g.add(t);
  const k = new THREE.Mesh(new THREE.SphereGeometry(h * 0.11, 10, 10), lam(c)); k.scale.set(1, 4.4, 1); k.position.y = h * 0.55; g.add(k);
  const hi = new THREE.Mesh(new THREE.SphereGeometry(h * 0.07, 8, 8), lam(mixc(c, '#c8d8a0', 0.25))); hi.scale.set(1, 4.6, 1); hi.position.set(-h * 0.035, h * 0.6, h * 0.04); g.add(hi);
  g.position.set(x, y, z); return g;
}
/** A round grey-green olive tree. Base at (x, y, z). */
export function olive3d(x, z, h, seed = 1, c = '#7a9068', y = 0) {
  const g = new THREE.Group(), r = rng(seed);
  const t = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.05, h * 0.09, h * 0.45, 6), lam('#6a5440')); t.position.y = h * 0.22; t.rotation.z = (r() - 0.5) * 0.4; g.add(t);
  for (let k = 0; k < 3; k++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(h * (0.24 + r() * 0.08), 9, 7), lam(mixc(c, k % 2 ? '#c8d0a8' : '#4a5a40', r() * 0.35)));
    s.scale.y = 0.7; s.position.set((r() - 0.5) * h * 0.5, h * (0.55 + r() * 0.15), (r() - 0.5) * h * 0.3); g.add(s);
  }
  g.position.set(x, y, z); return g;
}
/** A shaded cumulus: lit puffs on top, a flatter, cooler underside. */
export function cumulus(seed, { lit = '#fff6ea', shade = '#c8c4d8', glow = 0.55, op = 1 } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const mt = lam(lit, { emissive: lit, emissiveIntensity: glow, fog: false, transparent: op < 1, opacity: op });
  const mb = lam(shade, { emissive: shade, emissiveIntensity: glow * 0.8, fog: false, transparent: op < 1, opacity: op });
  for (let k = 0; k < 6; k++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), mb); const rr = 0.9 + r() * 0.5;
    b.scale.set(rr * 1.5, rr * 0.45, rr); b.position.set((k - 2.5) * 1.2 + (r() - 0.5) * 0.4, 0, (r() - 0.5) * 0.6); g.add(b);
  }
  for (let k = 0; k < 9; k++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), mt); const rr = 0.6 + r() * 0.75 * (1 - Math.abs(k - 4) / 6);
    b.scale.set(rr * 1.15, rr, rr); b.position.set((k - 4) * 0.85 + (r() - 0.5) * 0.5, 0.35 + rr * 0.7 + (1 - Math.abs(k - 4) / 4) * 0.5, (r() - 0.5) * 0.6 + 0.2); g.add(b);
  }
  return g;
}
/** A fan of soft light shafts from screen point (sx, sy), pointing down (spread in radians). Returns { group, update(t, k) }. */
export function godRays(cam, sx, sy, dist, { n = 9, len = 1400, width = 70, spread = 1.1, dir = 0, op = 0.12, seed = 3, color = '#fff0c8' } = {}) {
  const g = new THREE.Group(), r = rng(seed), rays = [];
  g.position.copy(atScreen(cam, sx, sy, dist)); g.quaternion.copy(cam.quaternion);
  for (let k = 0; k < n; k++) {
    const m = new THREE.MeshBasicMaterial({ map: rayTex, color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, fog: false, side: THREE.DoubleSide });
    const geo = new THREE.PlaneGeometry(width * (0.6 + r() * 0.9), len * (0.7 + r() * 0.5)); geo.translate(0, -geo.parameters.height / 2, 0);
    const p = new THREE.Mesh(geo, m); p.rotation.z = dir + (k / (n - 1) - 0.5) * spread + (r() - 0.5) * 0.06; p.renderOrder = -1; g.add(p);
    rays.push([m, r() * 6.3, 0.6 + r() * 0.8]);
  }
  return { group: g, update(t, k = 1) { rays.forEach(([m, ph, sp]) => { m.opacity = op * k * (0.55 + 0.45 * Math.sin(t * sp + ph)); }); } };
}
/** A patchwork of fields (flat-shaded plots) on a plane at height y, centred at depth z. */
export function fields(w, d, y, z, seed = 2, palette = ['#9ab460', '#b8b86a', '#7e9e50', '#c8b070', '#a8a058', '#8aa860', '#b09a68']) {
  const geo = new THREE.PlaneGeometry(w, d, 90, 40).toNonIndexed(); geo.rotateX(-Math.PI / 2);
  const p = geo.attributes.position, cols = [], r = rng(seed), hash = (i, j) => { const s = Math.sin(i * 127.1 + j * 311.7 + seed * 17.3) * 43758.5453; return s - Math.floor(s); };
  for (let i = 0; i < p.count; i += 3) {
    const cx = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3, cz = (p.getZ(i) + p.getZ(i + 1) + p.getZ(i + 2)) / 3;
    const fi = Math.floor((cx + Math.sin(cz * 0.02) * 30) / 70), fj = Math.floor(cz / 38), c = col(palette[Math.floor(hash(fi, fj) * palette.length)]);
    c.lerp(col('#ffffff'), hash(fi + 7, fj) * 0.08);
    for (let k = 0; k < 3; k++) cols.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true })); m.position.set(0, y, z); return m;
}
/** A farmhouse (casale): stone block, tile roof, a small tower on some. Base at (x, y, z). */
function casale(x, y, z, s, r) {
  const g = new THREE.Group(), wall = mixc('#ead6c0', '#d8b8a0', r()), roof = mixc('#b8603e', '#8a4a32', r());
  const b = box(6, 4, 5, lam(wall)); b.position.y = 2; g.add(b);
  const rf = new THREE.Mesh(new THREE.ConeGeometry(4.6, 1.8, 4), lam(roof)); rf.rotation.y = Math.PI / 4; rf.scale.z = 0.8; rf.position.y = 4.9; g.add(rf);
  if (r() < 0.5) { const t = box(2.2, 7, 2.2, lam(wall)); t.position.set(2.2, 3.5, 0); g.add(t); const tr = new THREE.Mesh(new THREE.ConeGeometry(1.8, 1.2, 4), lam(roof)); tr.rotation.y = Math.PI / 4; tr.position.set(2.2, 7.6, 0); g.add(tr); }
  g.position.set(x, y, z); g.rotation.y = r() * 1.2; g.scale.setScalar(s); return g;
}
/** Assisi on its hill, in pink-white Subasio stone: tiers of houses with terracotta roofs, a town wall with towers, San
 * Rufino's campanile and the Rocca on the top. Local origin at the crest (y = 0); about 200 wide. lit = window glow 0..1. */
export function assisi3d({ wall = '#f0dccc', roof = '#c0623e', hillC = '#7a9a5a', lit = 0, foot = 160 } = {}) {
  const g = new THREE.Group(), r = rng(21);
  const dome = (sx, sy, sz, y, c) => { const m = new THREE.Mesh(new THREE.SphereGeometry(60, 36, 16, 0, Math.PI * 2, 0, Math.PI / 2), lam(c)); m.scale.set(sx, sy, sz); m.position.y = y; g.add(m); };
  dome(1.7, 1.0, 0.75, -60, hillC);
  dome(4.8, 2.3, 1.7, -foot, mixc(hillC, '#6a8a4a', 0.2).getStyle());   // foothill down to the valley floor (foot = local depth)
  const hy = (x) => 60 * (Math.sqrt(Math.max(0, 1 - (x / 102) ** 2)) - 1);
  const winM = glowMat('#ffd98a', lit || 1);
  // town wall with towers along the lower tier
  for (let k = -5; k <= 5; k++) { const x = k * 15; const wl = box(15.4, 5, 1.6, lam(mixc(wall, '#a89080', 0.35))); wl.position.set(x, hy(x) - 12, 32); g.add(wl);
    if (k % 2 === 0) { const tw = box(3.4, 9, 3.4, wl.material); tw.position.set(x, hy(x) - 10, 32); g.add(tw); } }
  // three tiers of houses
  for (const [dz, dy, n, hs] of [[26, -8, 24, 1], [15, -2, 20, 1.15], [4, 1, 14, 1.3]]) {
    for (let k = 0; k < n; k++) {
      const x = (k / (n - 1) - 0.5) * (n * 5.8) + (r() - 0.5) * 2.5, h = (4 + r() * 5) * hs, w = 4.6 + r() * 2;
      const c = mixc(wall, k % 3 ? '#ffffff' : '#d8b0a0', r() * 0.25), y0 = hy(x) + dy;
      const m = box(w, h, 4.2, lam(c)); m.position.set(x, y0 + h / 2 - 2, dz + (r() - 0.5) * 2); g.add(m);
      const rf = new THREE.Mesh(new THREE.ConeGeometry(w * 0.74, 1.6, 4), lam(mixc(roof, '#7a3422', r() * 0.35))); rf.rotation.y = Math.PI / 4; rf.scale.z = 0.75; rf.position.set(x, y0 + h - 1.2, m.position.z); g.add(rf);
      if (lit && r() < 0.55) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.2), winM); wn.position.set(x + (r() - 0.5) * w * 0.4, y0 + h * 0.5, m.position.z + 2.15); g.add(wn); }
    }
  }
  // San Rufino's campanile (left) and a church front
  const cw = lam(mixc(wall, '#ffffff', 0.15));
  const ch = box(16, 10, 9, cw); ch.position.set(-62, hy(-62) + 4, 14); g.add(ch);
  const chr = new THREE.Mesh(new THREE.ConeGeometry(11, 4.4, 4), lam(roof)); chr.rotation.y = Math.PI / 4; chr.scale.z = 0.6; chr.position.set(-62, hy(-62) + 11, 14); g.add(chr);
  const rose = new THREE.Mesh(new THREE.CircleGeometry(1.7, 18), lam('#8a6a5a')); rose.position.set(-62, hy(-62) + 6, 18.6); g.add(rose);
  const cmp = box(4, 22, 4, cw); cmp.position.set(-46, hy(-46) + 9, 12); g.add(cmp);
  for (const dx of [-1, 1]) { const op = new THREE.Mesh(new THREE.PlaneGeometry(1, 2.2), lam('#5a4038')); op.position.set(-46 + dx * 1, hy(-46) + 17, 14.05); g.add(op); }
  const crf = new THREE.Mesh(new THREE.ConeGeometry(3, 3.6, 4), lam(roof)); crf.rotation.y = Math.PI / 4; crf.position.set(-46, hy(-46) + 21.8, 12); g.add(crf);
  // the Rocca on the crest
  const rm = lam(mixc(wall, '#9a8a7a', 0.35));
  const rk = box(22, 9, 12, rm); rk.position.set(10, 12, 0); g.add(rk);
  for (let k = -9.5; k <= 9.5; k += 3.8) { const mer = box(2, 2, 12.2, rm); mer.position.set(10 + k, 17.4, 0); g.add(mer); }
  const tw = box(6, 17, 6, rm); tw.position.set(23, 16, 0); g.add(tw);
  for (const dx of [-2, 0, 2]) { const mer = box(1.5, 1.8, 6.2, rm); mer.position.set(23 + dx, 25.4, 0); g.add(mer); }
  // cypresses on the slopes of the town hill
  [[-92, 18], [-80, 22], [70, 20], [84, 16], [94, 12]].forEach(([x, z]) => g.add(cypress3d(x, z, 14, '#2e4a32', hy(x) - 4)));
  return g;
}

const MODES = {
  hook: { sky: [[0, '#3e6aae'], [0.22, '#6e98cc'], [0.42, '#b4cce4'], [0.52, '#f4dcb8'], [0.57, '#fae6c8'], [1, '#fae6c8']], fog: '#dcd8cc',
    near: '#86a654', valley: ['#9ab460', '#b8b86a', '#7e9e50', '#c8b070', '#a8a058', '#8aa860', '#b4c070'],
    ridges: ['#b4bcd6', '#98a6c4', '#7e9478'], hemi: ['#fff4dc', '#5a6a3a', 1.45], key: ['#ffe8c0', 1.45, [60, 50, -60]],
    sun: [880, 470, 0.95, 120], rays: { op: 0.075, dir: 0.75, spread: 0.9 }, cloudLit: '#fff8ee', cloudShade: '#c4c8dc', stars: 0, lit: 0, town: [560, 905], move: 'push-fast' },
  miracle: { sky: [[0, '#2e3058'], [0.2, '#5a5682'], [0.38, '#9a8eac'], [0.5, '#e8cca8'], [0.56, '#f4dcbc'], [1, '#f4dcbc']], fog: '#cfc6bc',
    near: '#7c9c50', valley: ['#8aa458', '#a8a862', '#748e4a', '#b8a468', '#98944e', '#80985a', '#a4ae66'],
    ridges: ['#a0a2c0', '#8a90b0', '#74866e'], hemi: ['#f4e8dc', '#4a5038', 1.25], key: ['#ffe0b0', 1.1, [0, 60, -40]],
    sun: null, rays: { op: 0.11, dir: 0, spread: 0.7 }, cloudLit: '#d8d0dc', cloudShade: '#7a7898', stars: 0, lit: 0, town: [560, 915], breakAt: [540, 640], move: 'dolly' },
  // scene 1 (pan-r): sunrise over Assisi, sun low on the left
  dawn: { sky: [[0, '#4a6aae'], [0.24, '#86a4d4'], [0.42, '#d8c8d8'], [0.5, '#f6d4b0'], [0.56, '#fae2c0'], [1, '#fae2c0']], fog: '#e8d8c8',
    near: '#8aa85a', valley: ['#9ab460', '#b8b86a', '#7e9e50', '#c8b070', '#a8a058', '#8aa860', '#b4c070'],
    ridges: ['#b8b8d4', '#9ca4c4', '#7e9478'], hemi: ['#fff0dc', '#5a6a3a', 1.4], key: ['#ffd8a8', 1.5, [-80, 30, -60]],
    sun: [230, 640, 0.95, 110], rays: { op: 0.07, dir: -0.6, spread: 0.9 }, cloudLit: '#fff2e4', cloudShade: '#c8c0d8', stars: 0, lit: 0.35, town: [470, 905], move: 'pan-r',
    clouds: [[120, 470, 900, 8], [780, 430, 900, 10], [1000, 560, 850, 8], [560, 620, 950, 6]] },
  // scene 2 (push): bright morning at Sant'Angelo, sun to the right
  church: { sky: [[0, '#3e66aa'], [0.24, '#709ad0'], [0.42, '#b8cce4'], [0.52, '#f2dcbc'], [0.57, '#f8e6cc'], [1, '#f8e6cc']], fog: '#dcd8cc',
    near: '#8aa65a', valley: ['#9ab460', '#b8b86a', '#7e9e50', '#c8b070', '#a8a058', '#8aa860', '#b4c070'],
    ridges: ['#b4bcd6', '#98a6c4', '#7e9478'], hemi: ['#fff4dc', '#5a6a3a', 1.45], key: ['#ffe8c0', 1.45, [60, 50, -60]],
    sun: [900, 560, 0.9, 95], rays: { op: 0.06, dir: 0.7, spread: 0.8 }, cloudLit: '#fff8ee', cloudShade: '#c4c8dc', stars: 0, lit: 0, town: [585, 915], move: 'push',
    clouds: [[110, 520, 850, 9], [420, 450, 1000, 7], [700, 620, 900, 6], [1020, 420, 900, 9]] },
  // scene 3 (pan-l): a clouding sky over the slope; Assisi, home, waits below on the left
  slope: { sky: [[0, '#40467a'], [0.24, '#6e74a4'], [0.42, '#aeaec8'], [0.52, '#e4ccb4'], [0.57, '#eed8c0'], [1, '#eed8c0']], fog: '#d4ccc4',
    near: '#7e9e56', valley: ['#8aa458', '#a8a862', '#748e4a', '#b8a468', '#98944e', '#80985a', '#a4ae66'],
    ridges: ['#a8aac4', '#8e94b2', '#74866e'], hemi: ['#f0e8e0', '#4a5038', 1.3], key: ['#ffe4c0', 1.1, [-40, 50, -40]],
    sun: null, rays: { op: 0, dir: 0, spread: 0.5 }, cloudLit: '#e8e2ea', cloudShade: '#8e8caa', stars: 0, lit: 0, town: [230, 920], move: 'pan-l',
    clouds: [[100, 470, 900, 11], [420, 520, 950, 10], [760, 460, 900, 12], [1000, 580, 850, 9], [600, 660, 900, 7]] },
  // scene 5 (tilt-up + rack): golden evening; the fog closes in on the rack (soft focus for the 3D layer)
  gold: { sky: [[0, '#a8563e'], [0.22, '#d8805a'], [0.4, '#f0a86e'], [0.52, '#f8d494'], [0.58, '#fae0a8'], [1, '#fae0a8']], fog: '#f0c490',
    near: '#8a9a52', valley: ['#a8a058', '#c0a864', '#8e9a50', '#c8a868', '#b09858', '#98a058', '#b8ac68'],
    ridges: ['#c8a08e', '#b08a86', '#8a8a5e'], hemi: ['#ffe8c8', '#5a4a3a', 1.35], key: ['#ffc888', 1.5, [0, 30, -100]],
    sun: [540, 690, 0.95, 120], rays: { op: 0.07, dir: 0, spread: 1.3 }, cloudLit: '#ffe0b8', cloudShade: '#c8909a', stars: 0, lit: 0.6, town: null, move: 'tilt-up',
    rack: [1, 2.5], clouds: [[110, 470, 900, 9], [970, 450, 900, 10], [300, 600, 900, 6], [800, 620, 900, 6]] },
  glory: { sky: [[0, '#141842'], [0.2, '#2e2c62'], [0.36, '#6a4a7e'], [0.47, '#d8827a'], [0.53, '#f8be86'], [0.57, '#fcd8a0'], [1, '#fcd8a0']], fog: '#d89a84',
    near: '#6c7e44', valley: ['#8a8a50', '#a08a58', '#76784a', '#a8805a', '#8c7c50', '#7a8250', '#9c9058'],
    ridges: ['#a07a98', '#806a90', '#62684e'], hemi: ['#ffd8c0', '#3a3440', 1.2], key: ['#ffb880', 1.6, [80, 12, -100]],
    sun: [850, 975, 1, 150], rays: { op: 0.08, dir: -0.4, spread: 1.6, up: true }, cloudLit: '#ffc4a4', cloudShade: '#8a6a98', stars: 80, lit: 0.95, town: [800, 925], move: 'arc' },
};

export function subasio(mode = 'hook') {
  const P = MODES[mode], r = rng(mode.length * 17 + 5);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 160, 1500);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(...P.key[2]); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 11, 0.85, { el0: 0.24, el1: 0.62 }));
  // sun: a disc far behind the mountains (so the ridges can hide its lower part) inside a wide glow
  let sunGlow = null;
  if (P.sun) {
    const [sx, sy, op, size] = P.sun;
    sunGlow = sprite(warm, 1500, op * 0.85); sunGlow.position.copy(atScreen(cam, sx, sy, 2500)); scene.add(sunGlow);
    const d = new THREE.Sprite(new THREE.SpriteMaterial({ map: disc, transparent: true, depthWrite: false, fog: false })); d.scale.set(size * 2500 / 960 * TH * 2, size * 2500 / 960 * TH * 2, 1);
    d.position.copy(atScreen(cam, sx, sy, 2500)); scene.add(d);
  }
  // light shafts: from the sun, or (miracle) from the break in the clouds; they grow over the scene
  const rp = P.rays, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length }) : null;
  if (rays) scene.add(rays.group);
  let breakGlow = null;
  if (P.breakAt) { breakGlow = sprite(warm, 560, 0.3, true); breakGlow.position.copy(atScreen(cam, P.breakAt[0], P.breakAt[1], 1200)); scene.add(breakGlow); }
  // clouds framing the sky (kept off the title at the top centre)
  const CL = P.clouds || (mode === 'miracle'
    ? [[90, 500, 900, 13], [990, 480, 900, 13], [300, 560, 950, 12], [790, 570, 950, 12], [180, 680, 820, 9], [900, 700, 820, 9], [540, 470, 1100, 9]]
    : [[150, 520, 850, 9], [930, 560, 800, 8], [330, 660, 900, 6], [760, 700, 950, 6], [1030, 400, 900, 10], [40, 380, 900, 9]]);
  const clouds = CL.map(([sx, sy, d, s], k) => {
    const c = cumulus(70 + k * 3 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: mode === 'miracle' ? 0.45 : 0.6, op: mode === 'miracle' ? 0.97 : 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900 * (mode === 'miracle' ? 1.25 : 1)); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  // Apennine ridges in aerial perspective
  [[-1000, 160, 0], [-780, 112, 1], [-570, 70, 2]].forEach(([z, amp, i]) =>
    scene.add(ridge({ w: 3400, d: 200, z, y: -30, amp, color: mixc(P.ridges[i], P.fog, 0.18 - i * 0.05).getStyle(), seed: 4 + i * 5, freq: 0.35 + i * 0.2 })));
  // the valley: patchwork fields, farmhouses, cypress lines, mist
  scene.add(fields(2600, 900, -30, -720, 3, P.valley));
  for (let k = 0; k < 18; k++) scene.add(casale(-500 + k * 58 + (r() - 0.5) * 30, -30, -330 - r() * 380, 1.4 + r() * 0.8, r));
  for (let k = 0; k < 40; k++) scene.add(cypress3d(-560 + k * 28 + (r() - 0.5) * 8, -300 - (k % 4) * 60 - r() * 30, 9 + r() * 5, '#2e4630', -30));
  const mist = [[-240, -14, -420, 520, 60], [160, -16, -480, 640, 70], [520, -14, -400, 480, 55], [-520, -18, -520, 520, 60]].map(([x, y, z, w, h], k) => {
    const m = sprite(mistTex, 1, mode === 'glory' ? 0.42 : 0.6); m.scale.set(w, h, 1); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });
  // Assisi on its hill, placed in the open gap of the frame
  if (P.town) {
  const tp = atScreen(cam, P.town[0], P.town[1], 330);
  const town = assisi3d({ hillC: mixc(P.near, P.fog, 0.35).getStyle(), lit: P.lit, foot: (tp.y + 30) / 0.3 }); town.position.copy(tp); town.scale.setScalar(0.3); town.rotation.y = -0.12; scene.add(town);
  }
  // the brow of the slope ends just behind the characters' feet, so the valley spreads out below them
  const slope = new THREE.Mesh(new THREE.PlaneGeometry(700, 48, 70, 6), lam(P.near)); slope.rotation.x = -Math.PI / 2; slope.position.set(0, 0, -4); scene.add(slope);
  // olive groves dotting the valley (instanced canopies in rows)
  const OL = 900, can = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 7, 5), lam('#ffffff'), OL), om = new THREE.Matrix4(), oq = new THREE.Quaternion(), os = new THREE.Vector3(), op3 = new THREE.Vector3();
  for (let k = 0; k < OL; k++) {
    const grove = k % 12, gx = -520 + grove * 90 + Math.sin(grove * 2.3) * 30, gz = -340 - (grove % 4) * 90;
    const i = Math.floor(k / 12), x = gx + (i % 9) * 6 + (r() - 0.5), z = gz - Math.floor(i / 9) * 6;
    om.compose(op3.set(x, -28, z), oq, os.set(2.4, 1.8, 2.4)); can.setMatrixAt(k, om); can.setColorAt(k, mixc('#6e8660', '#a8b490', r() * 0.6));
  }
  scene.add(can);
  // a few far birds gliding in the open sky (morning only)
  const birds = [];
  if (mode === 'hook') for (let k = 0; k < 4; k++) {
    const b = new THREE.Group(), bm = new THREE.MeshBasicMaterial({ color: '#3a3a4a', fog: false });
    for (const sd of [-1, 1]) { const wgt = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.25), bm); wgt.geometry.translate(sd * 0.8, 0, 0); wgt.userData.sd = sd; b.add(wgt); }
    b.position.copy(atScreen(cam, 700 + k * 70, 560 + (k % 2) * 40, 300)); b.quaternion.copy(cam.quaternion); scene.add(b); birds.push([b, b.position.clone(), k]);
  }
  const d0 = 14;
  return { scene, cam, update(t, p) {
    let ry = 0;
    const mv = P.move;
    if (mv === 'push-fast') cam.position.set(0, 2.6, -7 * p);
    else if (mv === 'push') cam.position.set(0, 2.6, -5 * p);
    else if (mv === 'pan-r' || mv === 'pan-l') { const sg = mv === 'pan-r' ? 1 : -1, x = sg * (-4 + 8 * p); cam.position.set(x, 2.6, 0); ry = -sg * (p - 0.5) * 0.05; }
    else if (mv === 'tilt-up') { cam.position.set(0, 2.6, 0); cam.setViewOffset(W, H, 0, -110 * p, W, H); }
    else if (mv === 'dolly') {
      const z = 8 * p; cam.position.set(0, 2.6, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    } else { const x = -3 + 6 * p; cam.position.set(x, 2.6, 0); ry = -x * 0.006; }
    if (P.rack) { const kr = Math.min(1, Math.max(0, (t - P.rack[0]) / P.rack[1])), e2 = kr * kr * (3 - 2 * kr);
      scene.fog.near = 160 - 130 * e2; scene.fog.far = 1500 - 1000 * e2; }
    // the light: steady in the morning and at sunset, swelling through the miracle
    const k = mode === 'miracle' ? Math.min(1, 0.25 + t * 0.12) : 1;
    if (rays) rays.update(t, k);
    if (breakGlow) breakGlow.material.opacity = 0.18 + 0.27 * k;
    if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
    clouds.forEach(([c, x, j]) => { c.position.x = x + t * (1.6 + (j % 3) * 0.6) * (j % 2 ? 1 : -1) * (mode === 'miracle' ? 0.6 : 1); });
    mist.forEach(([m, x, j]) => { m.position.x = x + t * (2 + j * 0.6) * (j % 2 ? -1 : 1); });
    birds.forEach(([b, p0, j]) => { b.position.set(p0.x + t * 3.2 + Math.sin(t * 0.4 + j) * 4, p0.y + Math.sin(t * 0.7 + j * 1.3) * 1.5, p0.z);
      b.children.forEach((w) => { w.rotation.y = 0; w.rotation.x = 0; w.scale.y = 1; w.rotation.z = w.userData.sd * Math.sin(t * 5 + j) * 0.35; }); });
    return { ry };
  } };
}

export const BUILD = { subasioHook: () => subasio('hook'), subasioDawn: () => subasio('dawn'), subasioChurch: () => subasio('church'), subasioSlope: () => subasio('slope'),
  subasioMiracle: () => subasio('miracle'), subasioGold: () => subasio('gold'), subasioGlory: () => subasio('glory') };

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
