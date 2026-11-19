// three.js backgrounds for St. Edmund the Martyr: "the last stand" (East Anglia, 869; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). One flat East Anglian landscape in late autumn behind EVERY scene (all-3D backgrounds), seven
// set-ups; each moves its own camera to match its scene's `cam` (the canvas sits outside the SVG camera):
//   'hook'   (push-fast) stormy dusk: Viking longships on the river, smoke rising from burning villages
//   'raid'   (pan-r)     grey-gold afternoon: longships rowing upriver, more smoke on the horizon
//   'hall'   (drift-l)   the king's timber hall with its steep thatched roof, firelight in the door, evening
//   'arrive' (dolly)     a red sky; the beached fleet and the smoke loom in behind the king (real dolly zoom)
//   'oak'    (tilt-up + rack) a November oak wood at twilight; light breaks through the canopy; fog closes in on the rack
//   'abbey'  (pull)      golden light over the abbey town of Bury St Edmunds
//   'glory'  (arc-r)     sunset over the fields, first stars, the abbey far off with lit windows
// Layers, far to near: sky gradient + sun glow + rays -> shaded cumulus (from agnes.bg3d.js) -> low wooded ridges -> a
// patchwork of autumn fields with woods and mist -> the river (with the fleet) -> the near ground ending just behind the
// characters' feet. Deterministic: everything is drawn from timeline time.
// Exported for later reels: anglia(mode), longship3d(), hall3d(), abbey3d(), oak3d(), smoke3d().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, sprite, atScreen, newRenderer, makeView, stars } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const A = await import('./agnes.bg3d.js');
window.BG3D_LIB = prevLib;
const { cumulus, godRays, fields } = A;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,220,160,.75)'], [0.55, 'rgba(255,180,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const fire = glowTex([[0, 'rgba(255,214,140,1)'], [0.25, 'rgba(255,150,70,.7)'], [0.6, 'rgba(220,90,40,.2)'], [1, 'rgba(200,70,30,0)']]);
const smokeT = glowTex([[0, 'rgba(70,62,66,.75)'], [0.45, 'rgba(80,72,76,.35)'], [1, 'rgba(90,80,84,0)']]);
const mistTex = glowTex([[0, 'rgba(240,236,232,.8)'], [0.45, 'rgba(236,230,226,.35)'], [1, 'rgba(236,230,226,0)']]);
const stripeTex = (a, b, n = 7) => canvasTex(64, 64, (g, w, h) => { for (let k = 0; k < n; k++) { g.fillStyle = k % 2 ? a : b; g.fillRect(k * w / n, 0, w / n + 1, h); } });
function streakTex(seed, color) {
  const r = rng(seed);
  const t = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512);
    for (let k = 0; k < 90; k++) { const x = r() * 256, y = r() * 512, w = 12 + r() * 50; g.fillStyle = `rgba(${color},${0.1 + r() * 0.3})`; g.fillRect(x, y, w, 2 + r() * 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
/** A gable roof (triangular prism) of width w, height h and length len, along x, base at y = 0. */
function gable(w, h, len, m) {
  const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.lineTo(-w / 2, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false }); g.translate(0, 0, -len / 2); g.rotateY(Math.PI / 2);
  return new THREE.Mesh(g, m);
}

/** A Viking longship: dark clinker hull, curling dragon prow and stern, a row of painted shields and a striped square sail. */
export function longship3d({ hull = '#3a2a22', sail = ['#b8323a', '#efe6d2'], oars = true, sailUp = true } = {}) {
  const g = new THREE.Group(), hm = lam(hull), hl = lam(mixc(hull, '#8a6a4a', 0.35));
  const h = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), hm); h.scale.set(10, 1.7, 1.9); h.position.y = 1.4; g.add(h);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 6, 40), hl); rim.rotation.x = Math.PI / 2; rim.scale.set(10, 1.9, 1); rim.position.y = 1.4; g.add(rim);
  for (const sd of [-1, 1]) {   // prow and stern posts curling up
    const c = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.22, 6, 14, Math.PI * 1.15), hm); c.position.set(sd * 9.3, 2.9, 0); c.rotation.z = sd > 0 ? -0.2 : Math.PI + 0.2; c.rotation.y = sd > 0 ? 0 : Math.PI; g.add(c);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 6), hm); head.scale.set(1.4, 0.9, 0.9); head.position.set(sd * 9.0, 4.4, 0); g.add(head);
  }
  const SH = ['#c8323a', '#e8c24a', '#2f5a8a', '#efe6d2'];
  for (let k = -6; k <= 6; k++) for (const sd of [-1, 1]) {
    const s = new THREE.Mesh(new THREE.CircleGeometry(0.42, 14), lam(SH[(k + 6 + (sd > 0 ? 1 : 0)) % 4])); s.position.set(k * 1.25, 1.62, sd * 1.95 * Math.sqrt(Math.max(0.15, 1 - (k * 1.25 / 10) ** 2)));
    if (sd < 0) s.rotation.y = Math.PI; g.add(s);
    const b = new THREE.Mesh(new THREE.CircleGeometry(0.1, 8), lam('#9a9aa0')); b.position.copy(s.position); b.position.z += sd * 0.01; b.rotation.y = s.rotation.y; g.add(b);
  }
  if (oars) for (let k = -4; k <= 4; k++) for (const sd of [-1, 1]) {
    const o = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.4, 4), hl); o.position.set(k * 1.6, 0.8, sd * 3.2); o.rotation.x = sd * 1.1; g.add(o);
  }
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 10, 6), hl); mast.position.y = 6.2; g.add(mast);
  if (sailUp) {
    const sm = new THREE.MeshLambertMaterial({ map: stripeTex(sail[0], sail[1]), side: THREE.DoubleSide });
    const sp = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 5.6, 8, 4), sm); const pp = sp.geometry.attributes.position;
    for (let i = 0; i < pp.count; i++) pp.setZ(i, 0.6 * Math.cos(pp.getX(i) / 7.6 * Math.PI) * (0.5 + pp.getY(i) / 11.2));
    sp.geometry.computeVertexNormals(); sp.position.set(0, 7.6, 0.3); g.add(sp);
    const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 8.4, 5), hl); yard.rotation.z = Math.PI / 2; yard.position.set(0, 10.4, 0.3); g.add(yard);
  }
  return g;
}
/** An Anglo-Saxon royal hall: plank walls, a steep thatched roof with crossed gable beams, a lit door. len along x. */
export function hall3d({ len = 22, w = 9, wall = '#7a5232', thatch = '#b0904e', lit = 0.9 } = {}) {
  const g = new THREE.Group(), wm = lam(wall), dk = lam(mixc(wall, '#1a1010', 0.4)), tm = lam(thatch);
  const b = box(len, 4.2, w, wm); b.position.y = 2.1; g.add(b);
  for (let k = 0; k <= 18; k++) { const p = box(0.12, 4.2, 0.1, dk); p.position.set(-len / 2 + k * len / 18, 2.1, w / 2 + 0.06); g.add(p); }
  const roof = gable(w + 2.4, 7.4, len + 1.6, tm); roof.position.y = 4.0; g.add(roof);
  const eave = gable(w + 2.6, 0.6, len + 1.7, lam(mixc(thatch, '#5a4428', 0.4))); eave.position.y = 3.8; g.add(eave);
  for (const sd of [-1, 1]) {   // crossed gable beams (carved horns) at both ends
    for (const rz of [0.62, -0.62]) { const bm = box(0.3, 3.6, 0.3, dk); bm.position.set(sd * (len / 2 + 0.85), 11.6, rz > 0 ? 0.6 : -0.6); bm.rotation.x = rz; g.add(bm); }
  }
  const door = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.2), glowMat(mixc('#3a2014', '#ffb060', lit).getStyle())); door.position.set(0, 1.6, w / 2 + 0.08); g.add(door);
  const dg = sprite(fire, 9, 0.55 * lit, true); dg.position.set(0, 1.8, w / 2 + 0.6); g.add(dg);
  const porch = gable(3.4, 1.6, 2.4, tm); porch.rotation.y = Math.PI / 2; porch.position.set(0, 3.6, w / 2 + 1.0); g.add(porch);
  return g;
}
/** The abbey of Bury St Edmunds as a simple Romanesque silhouette: long nave, crossing tower, west towers, apse, town houses. */
export function abbey3d({ stone = '#ddd0bc', roof = '#6a6a78', lit = 0 } = {}) {
  const g = new THREE.Group(), sm = lam(stone), rm = lam(roof), win = glowMat('#ffd98a', 1), dkw = lam('#4a4048');
  const nave = box(44, 12, 11, sm); nave.position.set(0, 6, 0); g.add(nave);
  const nr = gable(11.6, 5, 44.4, rm); nr.position.y = 12; g.add(nr);
  const tr = box(11, 12, 30, sm); tr.position.set(6, 6, 0); g.add(tr);
  const trr = gable(30.4, 5, 11.4, rm); trr.rotation.y = Math.PI / 2; trr.position.set(6, 12, 0); g.add(trr);
  const tw = box(9, 30, 9, sm); tw.position.set(6, 15, 0); g.add(tw);
  const twr = new THREE.Mesh(new THREE.ConeGeometry(6.8, 6, 4), rm); twr.rotation.y = Math.PI / 4; twr.position.set(6, 33, 0); g.add(twr);
  for (const dz of [-7.5, 7.5]) { const wt = box(6.5, 22, 6.5, sm); wt.position.set(-23, 11, dz); g.add(wt); const wr = new THREE.Mesh(new THREE.ConeGeometry(4.8, 5, 4), rm); wr.rotation.y = Math.PI / 4; wr.position.set(-23, 24.5, dz); g.add(wr); }
  const ap = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.5, 12, 18, 1, false, 0, Math.PI), sm); ap.position.set(22, 6, 0); g.add(ap);
  for (let k = 0; k < 9; k++) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.6), lit ? win : dkw); wn.position.set(-17 + k * 4.2, 7, 5.56); g.add(wn); }
  for (let k = 0; k < 3; k++) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 3), lit ? win : dkw); wn.position.set(6 - 2.4 + k * 2.4, 22, 4.56); g.add(wn); }
  const r = rng(41);   // the town around the abbey
  for (let k = 0; k < 26; k++) {
    const x = -70 + k * 5.6 + (r() - 0.5) * 2, z = 12 + (k % 3) * 5 + r() * 3, hh = 3 + r() * 2.4, c = mixc('#e8dcc4', '#c8a888', r());
    const hs = box(4.4, hh, 4, lam(c)); hs.position.set(x, hh / 2, z); g.add(hs);
    const hr = gable(4.8, 2.4, 4.4, lam(mixc('#8a6a4a', '#6a5a5a', r()))); hr.position.set(x, hh, z); hr.rotation.y = Math.PI / 2; g.add(hr);
    if (lit && r() < 0.5) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.9), win); wn.position.set(x, hh * 0.55, z + 2.02); g.add(wn); }
  }
  return g;
}
/** An English oak in late autumn: thick trunk, a few heavy limbs, clumps of rust and olive leaves. Base at (x, y, z). */
export function oak3d(x, z, h, seed = 1, { y = 0, leaves = ['#8a5a2a', '#a8742e', '#6e6a34', '#b8863a', '#5a4a2a'], trunk = '#4a3a2e' } = {}) {
  const g = new THREE.Group(), r = rng(seed), tm = lam(trunk);
  const t = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.07, h * 0.11, h * 0.6, 8), tm); t.position.y = h * 0.3; g.add(t);
  for (let k = 0; k < 4; k++) { const a = k * 1.7 + r(), l = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.025, h * 0.045, h * 0.4, 6), tm);
    l.position.set(Math.cos(a) * h * 0.12, h * 0.62, Math.sin(a) * h * 0.08); l.rotation.set(Math.sin(a) * 0.8, 0, Math.cos(a) * 0.9); g.add(l); }
  for (let k = 0; k < 7; k++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(h * (0.2 + r() * 0.1), 10, 8), lam(leaves[Math.floor(r() * leaves.length)]));
    s.scale.y = 0.72; s.position.set((r() - 0.5) * h * 0.75, h * (0.72 + r() * 0.22), (r() - 0.5) * h * 0.45); g.add(s);
  }
  g.position.set(x, y, z); return g;
}
/** A column of smoke rising from a burning village, with a fire glow at its foot. Returns { group, update(t) }. */
export function smoke3d(x, y, z, s = 1, seed = 1) {
  const g = new THREE.Group(), r = rng(seed), puffs = [];
  const fg = sprite(fire, 14 * s, 0.75, true); fg.position.set(x, y + 1.5 * s, z); g.add(fg);
  for (let k = 0; k < 9; k++) { const p = sprite(smokeT, 1, 0.8); g.add(p); puffs.push([p, k / 9, 0.7 + r() * 0.6, r() * 6.3]); }
  return { group: g, update(t) {
    fg.material.opacity = 0.6 + 0.2 * Math.sin(t * 3.1 + seed);
    puffs.forEach(([p, k0, sp, ph]) => { const k = (k0 + t * 0.05 * sp) % 1, sz = (6 + 26 * k) * s;
      p.scale.set(sz, sz, 1); p.position.set(x + (k * 14 + Math.sin(t * 0.5 + ph) * 1.5) * s, y + (3 + k * 46) * s, z); p.material.opacity = 0.75 * Math.sin(Math.PI * Math.min(1, k * 1.15)); });
  } };
}

const GL = -2.5;   // height of the lowland (fields, river, fleet) below the near ground
const AUT = ['#8a8a50', '#a09058', '#6e7a44', '#b09a60', '#7a6a40', '#8e9450', '#a8945a'];
const MODES = {
  hook: { sky: [[0, '#1e2244'], [0.2, '#3e3c66'], [0.38, '#8a6a7e'], [0.5, '#e09a72'], [0.56, '#f4c08a'], [1, '#f4c08a']], fog: '#b89088',
    near: '#5e6a3a', valley: AUT, ridges: ['#6a5a74', '#5a5266', '#4a4a44'], hemi: ['#ffd8c0', '#3a3030', 1.25], key: ['#ffb880', 1.3, [-80, 20, -100]],
    sun: [200, 960, 0.9], rays: { op: 0.06, dir: -0.5, spread: 1.0 }, cloudLit: '#f8c0a0', cloudShade: '#6a5a78', stars: 0,
    ships: [[780, 1, -100, 0.45], [560, 0.85, -140, 0.45], [980, 1.1, -150, 0.4]], smoke: [[880, 1150, 330, 1.2], [1020, 1140, 420, 1], [140, 1150, 460, 0.8]], move: 'push-fast',
    clouds: [[120, 470, 900, 10], [900, 450, 900, 11], [640, 610, 950, 7], [300, 640, 900, 6]] },
  raid: { sky: [[0, '#3a4660'], [0.22, '#6a7690'], [0.4, '#aaa8b0'], [0.5, '#e0c8a0'], [0.56, '#ead6b0'], [1, '#ead6b0']], fog: '#c8bcaa',
    near: '#6a7440', valley: AUT, ridges: ['#8a8aa0', '#76788a', '#5a6048'], hemi: ['#fff0dc', '#4a4434', 1.3], key: ['#ffe0b0', 1.2, [60, 40, -80]],
    sun: [860, 700, 0.55], rays: { op: 0.045, dir: 0.6, spread: 0.8 }, cloudLit: '#ece4dc', cloudShade: '#8a8a9e', stars: 0,
    ships: [[480, 0.9, -80, 0.5], [820, 1, -120, 0.5], [160, 0.85, -150, 0.5]], smoke: [[700, 1140, 360, 1.1], [960, 1135, 420, 1.3], [300, 1140, 480, 0.9], [560, 1130, 560, 0.8]], move: 'pan-r',
    clouds: [[110, 480, 900, 10], [800, 440, 900, 12], [460, 600, 950, 7], [1000, 600, 900, 7]] },
  hall: { sky: [[0, '#22284a'], [0.24, '#4a4a72'], [0.42, '#9a7e8e'], [0.52, '#e8b08a'], [0.57, '#f2c89c'], [1, '#f2c89c']], fog: '#b8988e',
    near: '#5a6438', valley: AUT, ridges: ['#7a6a84', '#645a70', '#4e5040'], hemi: ['#ffdcc8', '#3a3430', 1.2], key: ['#ffc090', 1.2, [-60, 25, -60]],
    sun: [940, 900, 0.6], rays: { op: 0, dir: 0, spread: 0.5 }, cloudLit: '#f0c4b0', cloudShade: '#6e6280', stars: 30,
    hall: [540, 70], ships: [], smoke: [], move: 'drift',
    clouds: [[120, 470, 900, 10], [960, 500, 900, 10], [300, 610, 950, 6]] },
  arrive: { sky: [[0, '#2a1830'], [0.22, '#5a2a3e'], [0.4, '#a84a40'], [0.5, '#e8864a'], [0.56, '#f4aa66'], [1, '#f4aa66']], fog: '#a86a58',
    near: '#4e5030', valley: ['#7a6a44', '#8a7448', '#5e6038', '#987a50', '#6a5a3a', '#7a7a44', '#8e7a4e'], ridges: ['#6a3a4a', '#5a3442', '#463a34'],
    hemi: ['#ffc8a8', '#2a2024', 1.2], key: ['#ff9a60', 1.4, [0, 20, -100]], sun: [540, 1000, 0.8], rays: { op: 0.05, dir: 0, spread: 1.4 },
    cloudLit: '#f0a080', cloudShade: '#5a3048', stars: 0, beach: true,
    ships: [[230, 0.95, -100, 0.33, true], [560, 1, -125, 0.33, true], [880, 0.95, -105, 0.33, true]], smoke: [[640, 1130, 300, 1.4], [400, 1135, 380, 1.1], [900, 1130, 420, 1.2]], move: 'dolly',
    clouds: [[110, 470, 900, 11], [960, 460, 900, 11], [300, 600, 950, 7], [800, 610, 950, 7]] },
  oak: { sky: [[0, '#141a36'], [0.24, '#2e3660'], [0.42, '#6a6a8e'], [0.52, '#c8a8a0'], [0.58, '#dcc0aa'], [1, '#dcc0aa']], fog: '#8a8496',
    near: '#4a4a30', valley: AUT, ridges: ['#4e5068', '#44465a', '#3a3c3a'], hemi: ['#e8dcf0', '#2a2628', 1.15], key: ['#ffe0b0', 0.9, [0, 60, -40]],
    sun: null, breakAt: [540, 560], rays: { op: 0.1, dir: 0, spread: 0.7 }, cloudLit: '#c8c0d8', cloudShade: '#4e4a6a', stars: 40,
    ships: [], smoke: [], wood: true, rack: [1, 2.5], move: 'tilt-up',
    clouds: [[150, 440, 900, 9], [940, 460, 900, 9]] },
  abbey: { sky: [[0, '#a8563e'], [0.22, '#d8805a'], [0.4, '#f0a86e'], [0.52, '#f8d494'], [0.58, '#fae0a8'], [1, '#fae0a8']], fog: '#f0c490',
    near: '#7a8448', valley: ['#a8a058', '#c0a864', '#8e9a50', '#c8a868', '#b09858', '#98a058', '#b8ac68'], ridges: ['#c8a08e', '#b08a86', '#8a8a5e'],
    hemi: ['#ffe8c8', '#5a4a3a', 1.35], key: ['#ffc888', 1.5, [0, 30, -100]], sun: [300, 760, 0.9], rays: { op: 0.07, dir: -0.4, spread: 1.2 },
    cloudLit: '#ffe0b8', cloudShade: '#c8909a', stars: 0, abbey: [730, 1110, 230, 0], ships: [], smoke: [], move: 'pull',
    clouds: [[110, 470, 900, 9], [970, 450, 900, 10], [600, 600, 900, 6]] },
  glory: { sky: [[0, '#141842'], [0.2, '#2e2c62'], [0.36, '#6a4a7e'], [0.47, '#d8827a'], [0.53, '#f8be86'], [0.57, '#fcd8a0'], [1, '#fcd8a0']], fog: '#d89a84',
    near: '#5e6a3c', valley: ['#8a8a50', '#a08a58', '#76784a', '#a8805a', '#8c7c50', '#7a8250', '#9c9058'], ridges: ['#a07a98', '#806a90', '#62684e'],
    hemi: ['#ffd8c0', '#3a3440', 1.2], key: ['#ffb880', 1.6, [80, 12, -100]], sun: [820, 1010, 1], rays: { op: 0.08, dir: -0.4, spread: 1.6, up: true },
    cloudLit: '#ffc4a4', cloudShade: '#8a6a98', stars: 80, abbey: [800, 1080, 420, 1], ships: [], smoke: [], move: 'arc' },
};

export function anglia(mode = 'hook') {
  const P = MODES[mode], r = rng(mode.length * 13 + 7);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 160, 1500);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(...P.key[2]); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 13, 0.8, { el0: 0.26, el1: 0.62 }));
  let sunGlow = null;
  if (P.sun) { sunGlow = sprite(warm, 1500, P.sun[2] * 0.85); sunGlow.position.copy(atScreen(cam, P.sun[0], P.sun[1], 2500)); scene.add(sunGlow); }
  const rp = P.rays, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length }) : null;
  if (rays) scene.add(rays.group);
  let breakGlow = null;
  if (P.breakAt) { breakGlow = sprite(warm, 520, 0.25, true); breakGlow.position.copy(atScreen(cam, P.breakAt[0], P.breakAt[1], 1200)); scene.add(breakGlow); }
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(90 + k * 3 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  // low East Anglian ridges with dark woodland belts, in aerial perspective
  [[-1000, 34, 0], [-760, 24, 1], [-560, 14, 2]].forEach(([z, amp, i]) =>
    scene.add(ridge({ w: 3400, d: 200, z, y: -12, amp, color: mixc(P.ridges[i], P.fog, 0.2 - i * 0.05).getStyle(), seed: 6 + i * 5, freq: 0.5 + i * 0.3 })));
  scene.add(fields(2600, 1100, GL, -660, 5, P.valley));
  // woods: instanced canopies in clumps across the fields
  const WN = 700, can = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 7, 5), lam('#ffffff'), WN), om = new THREE.Matrix4(), oq = new THREE.Quaternion(), os = new THREE.Vector3(), op3 = new THREE.Vector3();
  for (let k = 0; k < WN; k++) {
    const cl = k % 20, cx = -620 + cl * 64 + Math.sin(cl * 2.1) * 26, cz = -260 - (cl % 5) * 90 - Math.cos(cl) * 30, i = Math.floor(k / 20);
    const x = cx + (r() - 0.5) * 40, z = cz + (r() - 0.5) * 30, sz = 3 + r() * 2.6;
    om.compose(op3.set(x, GL + sz * 0.5, z), oq, os.set(sz, sz * 0.8, sz)); can.setMatrixAt(k, om); can.setColorAt(k, mixc('#5a5030', '#a07838', r() * 0.8));
  }
  scene.add(can);
  // the river: a broad slow ribbon with drifting light streaks
  const water = new THREE.Mesh(new THREE.PlaneGeometry(2600, 100), lam(mixc('#4a6878', P.fog, 0.3))); water.rotation.x = -Math.PI / 2; water.position.set(0, GL + 0.1, -110); scene.add(water);
  const st = streakTex(mode.length, '255,236,210'); st.repeat.set(30, 1);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(2600, 100), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: 0.35, depthWrite: false })); sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, GL + 0.15, -110); scene.add(sheen);
  // the fleet
  const ships = (P.ships || []).map(([sx, s, z, sc, beached], k) => {
    const sh = longship3d({ sail: k % 2 ? ['#2f5a8a', '#efe6d2'] : ['#b8323a', '#efe6d2'], sailUp: true, oars: !beached });
    const p = atScreen(cam, sx, 1200, -z); sh.position.set(p.x, GL - 0.6, z); sh.scale.setScalar(sc * s * 3.0); sh.rotation.y = (k % 2 ? 0.25 : -0.25) + (beached ? 0.9 : 0); scene.add(sh); return [sh, sh.position.x, k, beached];
  });
  const smokes = (P.smoke || []).map(([sx, sy, d, s], k) => { const p = atScreen(cam, sx, sy, d); const sm = smoke3d(p.x, GL, p.z, s * d / 300, k + 3); scene.add(sm.group); return sm; });
  const mist = [[-240, -4, -420, 520, 50], [160, -5, -480, 640, 60], [520, -4, -400, 480, 50], [-520, -6, -520, 520, 50]].map(([x, y, z, w, h], k) => {
    const m = sprite(mistTex, 1, mode === 'oak' ? 0.7 : 0.5); m.scale.set(w, h, 1); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });
  // the hall, the abbey
  if (P.hall) { const hl = hall3d({ lit: 1 }); hl.position.set(0, 0, -P.hall[1]); hl.rotation.y = -0.1; scene.add(hl);
    for (let k = 0; k < 6; k++) scene.add(oak3d(-40 + k * 16 + (r() - 0.5) * 6, -P.hall[1] - 18 - r() * 10, 16 + r() * 6, 50 + k)); }
  if (P.abbey) { const [sx, sy, d, lit] = P.abbey, p = atScreen(cam, sx, sy, d); const ab = abbey3d({ lit }); ab.position.set(p.x, GL, p.z); ab.scale.setScalar(d / 230 * 0.95); ab.rotation.y = -0.35; scene.add(ab); }
  // the oak wood: big trunks close by on both sides, canopies framing the sky gap at the top
  if (P.wood) {
    [[-22, -26, 26, 1], [-34, -46, 30, 2], [-16, -70, 28, 3], [24, -30, 27, 4], [36, -52, 32, 5], [14, -84, 26, 6], [-48, -90, 34, 7], [52, -96, 34, 8], [0, -140, 30, 9], [-30, -150, 32, 10], [34, -160, 30, 11]]
      .forEach(([x, z, h, s]) => scene.add(oak3d(x, z, h, s, { leaves: ['#6a3e22', '#8a5428', '#5a4a26', '#9a6a2e', '#4a3420'] })));
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(700, 260), lam('#4a3a26')); floor.rotation.x = -Math.PI / 2; floor.position.set(0, -0.02, -130); scene.add(floor);
  }
  // the near ground: ends just behind the characters' feet (longer under the hall and in the wood)
  const nearLen = P.hall ? 110 : P.wood ? 60 : P.beach ? 40 : 48;
  const brow = new THREE.Mesh(new THREE.PlaneGeometry(700, nearLen, 70, 6), lam(P.near)); brow.rotation.x = -Math.PI / 2; brow.position.set(0, 0, -nearLen / 2 + 20); scene.add(brow);
  if (!P.hall && !P.wood) { const bank = new THREE.Mesh(new THREE.PlaneGeometry(700, 12), lam(mixc(P.near, '#3a3020', 0.35))); bank.position.set(0, -6, -nearLen + 20); scene.add(bank); }
  const d0 = 14;
  return { scene, cam, update(t, p) {
    let ry = 0, rz = 0;
    const mv = P.move;
    if (mv === 'push-fast') cam.position.set(0, 2.6, -7 * p);
    else if (mv === 'push') cam.position.set(0, 2.6, -5 * p);
    else if (mv === 'pull') cam.position.set(0, 2.6, 6 * p);
    else if (mv === 'pan-r' || mv === 'pan-l') { const sg = mv === 'pan-r' ? 1 : -1, x = sg * (-4 + 8 * p); cam.position.set(x, 2.6, 0); ry = -sg * (p - 0.5) * 0.05; }
    else if (mv === 'tilt-up') { cam.position.set(0, 2.6, 0); cam.setViewOffset(W, H, 0, -110 * p, W, H); }
    else if (mv === 'dolly') {
      const z = 8 * p; cam.position.set(0, 2.6, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    } else if (mv === 'drift') { const x = 2.5 - 5 * p; cam.position.set(x, 2.6, 0); ry = -x * 0.004; }
    else { const x = -3 + 6 * p; cam.position.set(x, 2.6, 0); ry = -x * 0.006; rz = (p - 0.5) * 0.004; }
    if (P.rack) { const kr = Math.min(1, Math.max(0, (t - P.rack[0]) / P.rack[1])), e2 = kr * kr * (3 - 2 * kr);
      scene.fog.near = 160 - 130 * e2; scene.fog.far = 1500 - 1000 * e2; }
    const k = mode === 'oak' ? Math.min(1, 0.2 + t * 0.11) : 1;   // the light breaking through the wood swells over the scene
    if (rays) rays.update(t, k);
    if (breakGlow) breakGlow.material.opacity = 0.12 + 0.3 * k;
    if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
    clouds.forEach(([c, x, j]) => { c.position.x = x + t * (1.4 + (j % 3) * 0.5) * (j % 2 ? 1 : -1); });
    mist.forEach(([m, x, j]) => { m.position.x = x + t * (2 + j * 0.6) * (j % 2 ? -1 : 1); });
    ships.forEach(([sh, x, j, beached]) => { if (beached) { sh.rotation.z = 0.01 * Math.sin(t * 0.8 + j); return; }
      sh.position.x = x + t * (mode === 'raid' ? 1.6 : 1.0) * (j % 2 ? -1 : 1); sh.position.y = GL - 0.6 + 0.12 * Math.sin(t * 1.3 + j * 2); sh.rotation.z = 0.02 * Math.sin(t * 1.1 + j); });
    smokes.forEach((s) => s.update(t));
    st.offset.x = t * 0.01;
    return { ry, rz };
  } };
}

export const BUILD = { angliaHook: () => anglia('hook'), angliaRaid: () => anglia('raid'), angliaHall: () => anglia('hall'), angliaArrive: () => anglia('arrive'),
  angliaOak: () => anglia('oak'), angliaAbbey: () => anglia('abbey'), angliaGlory: () => anglia('glory') };

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
