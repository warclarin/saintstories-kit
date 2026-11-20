// three.js backgrounds for the Presentation of the Blessed Virgin Mary (browser module; build.mjs copies it to
// work/<slug>/bg3d.mjs). Jerusalem in the time of the Second Temple, two locales, one set-up per scene (all-3D, cam3d):
//   'hook'  (push-fast) golden morning in the Temple court: the sanctuary rises behind the steps little Mary climbs
//   'home'  (pan-r)     dusk at Joachim and Anne's house: courtyard wall, flat-roofed houses, olive trees; the Temple far off
//   'wait'  (drift-l)   soft afternoon at the house; the Temple on its great platform across the valley
//   'climb' (push)      morning: the court of the Temple, colonnades converging on the sanctuary
//   'altar' (dolly)     the court in warm gold; the sanctuary and its golden doorway loom in behind (real dolly zoom)
//   'dusk'  (tilt-up + rack) evening: the Temple glowing on its platform, first stars, the parents' road home
//   'glory' (arc-r)     sunset glory in the court, gold motes, stars
// Layers, far to near: sky gradient + sun glow + rays -> cumulus -> Judean ridges in aerial perspective -> terraced valley
// with olive groves -> the city and the Temple Mount -> the near ground (court paving or a dusty yard) ending behind the feet.
// Deterministic: everything is drawn from timeline time. Exported for later reels: jerusalem3d(mode), temple3d(), templeMount3d(),
// house3d(), colonnade3d(), paveTex().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, sprite, atScreen, makeRig, stars } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const A = await import('./agnes.bg3d.js');
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
const { cumulus, godRays, fields, olive3d, cypress3d } = A;
const { groundTex, tufts3d, particles } = E;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,224,160,.75)'], [0.55, 'rgba(255,190,120,.22)'], [1, 'rgba(255,180,120,0)']]);
const holy = glowTex([[0, 'rgba(255,250,228,1)'], [0.25, 'rgba(255,232,170,.7)'], [0.6, 'rgba(255,210,140,.18)'], [1, 'rgba(255,200,130,0)']]);
const mistTex = glowTex([[0, 'rgba(250,240,228,.8)'], [0.45, 'rgba(246,234,222,.35)'], [1, 'rgba(246,234,222,0)']]);

/** Large pale paving stones in staggered rows (repeats). */
export function paveTex(a = '#e8dcc4', b = '#d6c6a8', seed = 3) {
  const r = rng(seed);
  const t = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = b; g.fillRect(0, 0, w, h);
    const rows = 6, rh = h / rows;
    for (let i = 0; i < rows; i++) {
      let x = (i % 2) * -40;
      while (x < w) { const sw = 70 + r() * 60; g.fillStyle = mixc(a, b, r() * 0.6).getStyle(); g.fillRect(x + 2, i * rh + 2, sw - 4, rh - 4);
        g.fillStyle = 'rgba(255,250,235,.12)'; g.fillRect(x + 4, i * rh + 3, sw - 10, 5); x += sw; }
    }
    for (let k = 0; k < 60; k++) { g.fillStyle = 'rgba(90,70,40,.06)'; g.beginPath(); g.ellipse(r() * w, r() * h, 20 + r() * 50, 8 + r() * 14, 0, 0, Math.PI * 2); g.fill(); }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
const stoneTex = (c, seed = 5) => {   // ashlar blocks for walls
  const r = rng(seed);
  const t = canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = mixc(c, '#5a4a3a', 0.25).getStyle(); g.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) { let x = (i % 2) * -30; while (x < w) { const bw = 50 + r() * 40; g.fillStyle = mixc(c, '#fff4e0', (r() - 0.4) * 0.3).getStyle(); g.fillRect(x + 2, i * 32 + 2, bw - 4, 28); x += bw; } }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
};

/** Herod's Temple sanctuary (the Holy Place), simplified: a wide porch front with "shoulders", a taller centre, a great
 * doorway with a golden vine above it, gold bands and roof spikes, on a stepped platform. Base at y = 0, front faces +z.
 * About 34 wide and 26 high. glow 0..1 = light in the doorway. */
export function temple3d({ stone = '#f2e6d0', gold = '#e8b84a', glow = 0.6 } = {}) {
  const g = new THREE.Group(), sm = lam(stone), sh = lam(mixc(stone, '#8a7458', 0.25)), gm = lam(gold, { emissive: gold, emissiveIntensity: 0.35 });
  // steps up to the porch
  for (let k = 0; k < 8; k++) { const s = box(22 - k * 0.6, 0.45, 1.1, k % 2 ? sm : lam(mixc(stone, '#c8b090', 0.2))); s.position.set(0, 0.22 + k * 0.45, 6 - k * 1.1); g.add(s); }
  const plat = box(40, 3.6, 30, sh); plat.position.set(0, 1.8, -12); g.add(plat);
  const Y = 3.6;
  // shoulders (the wide porch) and the taller centre block
  const porch = box(34, 15, 6, sm); porch.position.set(0, Y + 7.5, -1); g.add(porch);
  const body = box(22, 13, 22, sh); body.position.set(0, Y + 6.5, -15); g.add(body);
  const centre = box(16, 22, 6.4, sm); centre.position.set(0, Y + 11, -0.9); g.add(centre);
  // cornices: gold bands
  for (const [w, y, z, d] of [[34.6, Y + 15, -1, 6.4], [16.6, Y + 22, -0.9, 6.8], [34.6, Y + 0.4, -1, 6.4]]) { const b = box(w, 0.55, d, gm); b.position.set(0, y, z); g.add(b); }
  // roof spikes (the gilded points against birds)
  for (let k = -7; k <= 7; k++) { if (Math.abs(k) < 4) continue; const s = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.4, 5), gm); s.position.set(k * 2.2, Y + 16, 1.6); g.add(s); }
  for (let k = -3; k <= 3; k++) { const s = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.6, 5), gm); s.position.set(k * 2.2, Y + 23.1, 1.8); g.add(s); }
  // pilasters on the porch front
  for (const x of [-15.5, -10.5, 10.5, 15.5]) { const p = box(1.2, 14.4, 0.6, lam(mixc(stone, '#fff8ec', 0.4))); p.position.set(x, Y + 7.6, 2.2); g.add(p); }
  // the great doorway: dark recess, glowing veil light, a golden vine frieze above
  const dr = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 13), lam('#4a3424')); dr.position.set(0, Y + 6.8, 2.4); g.add(dr);
  const veil = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 11.8), glowMat(mixc('#6a3a2a', '#ffd890', glow).getStyle())); veil.position.set(0, Y + 6.6, 2.5); g.add(veil);
  const frame = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.32, 6, 24, Math.PI), gm); frame.position.set(0, Y + 13.2, 2.6); g.add(frame);
  const vine = box(8.4, 1.0, 0.5, gm); vine.position.set(0, Y + 14.2, 2.6); g.add(vine);
  for (let k = 0; k < 7; k++) { const gr = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 6), gm); gr.position.set(-3.6 + k * 1.2, Y + 13.4 - (k % 2) * 0.3, 2.9); g.add(gr); }
  const glowS = sprite(holy, 26, 0.55 * glow, true); glowS.position.set(0, Y + 8, 4); g.add(glowS);
  // windows high on the centre
  for (const x of [-4.5, 4.5]) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.6), lam('#5a4432')); wn.position.set(x, Y + 18.5, 2.4); g.add(wn); }
  g.userData.glow = glowS; g.userData.veil = veil;
  return g;
}
/** The Temple Mount seen from across the valley: massive retaining walls of pale ashlar, a colonnade along the top, and the
 * sanctuary rising in the middle. Base at y = 0; about 160 wide, 70 high. lit: window glow at dusk. */
export function templeMount3d({ stone = '#e6d4b4', lit = 0 } = {}) {
  const g = new THREE.Group(), st = stoneTex(stone, 7); st.repeat.set(8, 2);
  const wall = box(160, 24, 90, lam('#ffffff', { map: st })); wall.position.set(0, 12, 0); g.add(wall);
  const top = box(162, 1, 92, lam(mixc(stone, '#fff4e0', 0.3))); top.position.y = 24.5; g.add(top);
  // the royal stoa along the front edge
  const stoa = box(150, 7, 8, lam(mixc(stone, '#fff4e0', 0.15))); stoa.position.set(0, 28.5, 40); g.add(stoa);
  for (let k = 0; k < 30; k++) { const c = box(1.2, 6, 0.4, lam(mixc(stone, '#6a5440', 0.35))); c.position.set(-72 + k * 5, 28.2, 44.2); g.add(c); }
  const roof = box(152, 1, 9, lam('#a8805a')); roof.position.set(0, 32.4, 40); g.add(roof);
  const t = temple3d({ glow: lit ? 1 : 0.5 }); t.scale.setScalar(1.7); t.position.set(0, 24.5, 6); g.add(t);
  if (lit) { const win = glowMat('#ffd98a', 1); for (let k = 0; k < 22; k++) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), win); wn.position.set(-66 + k * 6.3, 28, 44.3); g.add(wn); } }
  g.userData.temple = t;
  return g;
}
/** A flat-roofed Judean stone house: whitewashed block, parapet, a dark door and small windows, a ladder or stair. */
export function house3d(w, h, d, c, r, { lit = 0 } = {}) {
  const g = new THREE.Group(), m = lam(c), dk = lam(mixc(c, '#3a2a20', 0.55));
  const b = box(w, h, d, m); b.position.y = h / 2; g.add(b);
  const par = box(w + 0.3, 0.5, d + 0.3, lam(mixc(c, '#8a6a4a', 0.2))); par.position.y = h + 0.1; g.add(par);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.2), dk); door.position.set((r() - 0.5) * w * 0.4, 1.1, d / 2 + 0.02); g.add(door);
  for (let k = 0; k < 2; k++) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.8), lit && r() < 0.6 ? glowMat('#ffd98a') : dk); wn.position.set(-w * 0.3 + k * w * 0.6, h * 0.65, d / 2 + 0.02); g.add(wn); }
  if (r() < 0.5) { const st = box(0.9, h * 0.9, 0.5, lam(mixc(c, '#8a6a4a', 0.3))); st.position.set(w / 2 + 0.45, h * 0.45, d * 0.2); g.add(st); }
  return g;
}
/** A roofed colonnade (stoa) along z, from z0 to z1 at x, columns every `step`. Faces the court (side = -1 left, +1 right). */
export function colonnade3d(x, z0, z1, side, { c = '#efe2c8', h = 7, step = 4 } = {}) {
  const g = new THREE.Group(), cm = lam(c), rm = lam(mixc(c, '#8a6a4a', 0.35)), back = lam(mixc(c, '#6a5040', 0.3));
  const len = z0 - z1;
  const wall = box(1, h + 1, len, back); wall.position.set(x + side * 5, (h + 1) / 2, (z0 + z1) / 2); g.add(wall);
  for (let z = z0; z >= z1; z -= step) {
    const cl = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, h, 10), cm); cl.position.set(x, h / 2, z); g.add(cl);
    const cap = box(1.2, 0.4, 1.2, cm); cap.position.set(x, h + 0.1, z); g.add(cap);
  }
  const ent = box(1.6, 1.0, len + 1, cm); ent.position.set(x, h + 0.7, (z0 + z1) / 2); g.add(ent);
  const roof = box(6.4, 0.5, len + 1.4, rm); roof.position.set(x + side * 2.6, h + 1.4, (z0 + z1) / 2); roof.rotation.z = side * -0.08; g.add(roof);
  return g;
}

const GL = -3;   // the valley floor below the near ground (house locale)
const DRY = ['#b8a070', '#a89464', '#c8ac78', '#9a9a64', '#b09a68', '#8e9460', '#c0a470'];
const MODES = {
  hook:  { loc: 'court', move: 'push-fast', sky: [[0, '#5a6aa0'], [0.22, '#9aa8c8'], [0.4, '#f0d0a8'], [0.5, '#fae2b4'], [1, '#fae2b4']], fog: '#f0d8b4',
    ridges: ['#c8a8a0', '#b89a8e', '#a89070'], hemi: ['#fff0d8', '#6a5440', 1.4], key: ['#ffe0a8', 1.4], sun: [180, 640, 0.85],
    rays: { op: 0.08, dir: -0.6, spread: 1.0 }, cloudLit: '#fff2e0', cloudShade: '#c8b0b8', stars: 0, glow: 0.8, templeZ: -110, air: 'gold',
    clouds: [[150, 470, 900, 9], [930, 440, 900, 10], [700, 600, 950, 6]] },
  home:  { loc: 'house', move: 'pan-r', sky: [[0, '#2a2e5a'], [0.22, '#5a5280'], [0.4, '#c08a8a'], [0.5, '#f0b484'], [0.56, '#f6c898'], [1, '#f6c898']], fog: '#d8a890',
    ridges: ['#9a7a90', '#8a6e7e', '#7a6a58'], hemi: ['#ffdcc4', '#4a3a34', 1.25], key: ['#ffb880', 1.3], sun: [900, 900, 0.75],
    rays: { op: 0.05, dir: 0.5, spread: 0.9 }, cloudLit: '#f8c8a8', cloudShade: '#7a6688', stars: 20, mount: [300, 1035, 700, 1], near: '#a89068', air: 'dust',
    clouds: [[140, 470, 900, 10], [880, 470, 900, 9], [520, 610, 950, 6]] },
  wait:  { loc: 'house', move: 'drift', sky: [[0, '#4a6aa8'], [0.24, '#8aa8d0'], [0.42, '#e0d0b8'], [0.52, '#f4e0bc'], [1, '#f4e0bc']], fog: '#e8d4b4',
    ridges: ['#b8a8b0', '#a8988e', '#9a8a68'], hemi: ['#fff4e0', '#5a4a3a', 1.4], key: ['#fff0c8', 1.3], sun: [160, 600, 0.6],
    rays: { op: 0.05, dir: -0.5, spread: 0.9 }, cloudLit: '#fffaf0', cloudShade: '#c0b8c8', stars: 0, mount: [500, 1010, 700, 0], near: '#b49a6c', air: 'dust',
    clouds: [[160, 480, 900, 9], [900, 450, 900, 10], [560, 600, 950, 6]] },
  climb: { loc: 'court', move: 'push', sky: [[0, '#4a64a8'], [0.22, '#8aa4d0'], [0.4, '#e8d4b8'], [0.5, '#f8e4bc'], [1, '#f8e4bc']], fog: '#f0dcb8',
    ridges: ['#b8a8b0', '#a89a90', '#9a8c6a'], hemi: ['#fff4e0', '#6a5440', 1.45], key: ['#fff0c8', 1.35], sun: [860, 560, 0.7],
    rays: { op: 0.07, dir: 0.6, spread: 1.0 }, cloudLit: '#fffaf0', cloudShade: '#c4bccc', stars: 0, glow: 0.6, templeZ: -112, air: 'dust',
    clouds: [[140, 470, 900, 9], [940, 470, 900, 9]] },
  altar: { loc: 'court', move: 'dolly', sky: [[0, '#8a5a4a'], [0.22, '#d08a62'], [0.4, '#f4b878'], [0.5, '#fadca0'], [1, '#fadca0']], fog: '#f4c890',
    ridges: ['#c89a8a', '#b8887a', '#a07a5a'], hemi: ['#ffe8c8', '#6a4a34', 1.4], key: ['#ffc888', 1.5], sun: [540, 760, 0.6],
    rays: { op: 0.1, dir: 0, spread: 1.4 }, cloudLit: '#ffe0b8', cloudShade: '#c8909a', stars: 0, glow: 1, templeZ: -100, air: 'gold',
    clouds: [[130, 470, 900, 9], [950, 460, 900, 9]] },
  dusk:  { loc: 'house', move: 'tilt-up', sky: [[0, '#141a3e'], [0.24, '#34366a'], [0.42, '#8a6a8e'], [0.52, '#e8a888'], [0.58, '#f4c49c'], [1, '#f4c49c']], fog: '#b8908e',
    ridges: ['#6a5a7a', '#5a5068', '#4e4a44'], hemi: ['#ffd8c8', '#2e2830', 1.15], key: ['#ffc898', 1.0], sun: null, breakAt: [640, 900],
    rays: { op: 0.12, dir: 0, spread: 0.9, up: true }, cloudLit: '#e8b8b0', cloudShade: '#4e4a6a', stars: 60, mount: [640, 1030, 650, 1], near: '#8a7458', air: 'gold', noYard: true,
    clouds: [[140, 450, 900, 9], [940, 470, 900, 9]] },
  glory: { loc: 'court', move: 'arc', sky: [[0, '#1a1c48'], [0.2, '#3a3270'], [0.36, '#8a5a86'], [0.47, '#e08a7a'], [0.53, '#f8c088'], [0.57, '#fcdca4'], [1, '#fcdca4']], fog: '#e0a088',
    ridges: ['#a07a98', '#806a8a', '#6a5a50'], hemi: ['#ffdcc4', '#3a3040', 1.25], key: ['#ffb880', 1.5], sun: [860, 980, 0.9],
    rays: { op: 0.09, dir: -0.4, spread: 1.6, up: true }, cloudLit: '#ffc8a8', cloudShade: '#8a6a98', stars: 70, glow: 1, templeZ: -104, air: 'gold' },
};

/** jerusalem3d(mode): one of the set-ups above (a court of the Temple or the parents' house across the valley). */
export function jerusalem3d(mode = 'hook') {
  const P = MODES[mode], r = rng(mode.length * 17 + 3), court = P.loc === 'court';
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 180, 1600);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[mode] || {};
  const pos = { l: [-80, 25, -60], r: [80, 25, -60], back: [0, 22, -100], top: [0, 60, -30] }[VL.from] || [-60, 30, -60];
  const key = new THREE.DirectionalLight(VL.key || P.key[0], P.key[1]); key.position.set(...pos); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 19, 0.8, { el0: 0.26, el1: 0.62 }));
  let sunGlow = null;
  if (P.sun) { sunGlow = sprite(warm, 1500, P.sun[2] * 0.85); sunGlow.position.copy(atScreen(cam, P.sun[0], P.sun[1], 2500)); scene.add(sunGlow); }
  const rp = P.rays, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length }) : null;
  if (rays) scene.add(rays.group);
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(140 + k * 3 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  // Judean hills: rounded, dry, in aerial perspective
  [[-1100, 60, 0], [-820, 40, 1], [-600, 22, 2]].forEach(([z, amp, i]) =>
    scene.add(ridge({ w: 3600, d: 220, z, y: -14, amp, color: mixc(P.ridges[i], P.fog, 0.22 - i * 0.05).getStyle(), seed: 9 + i * 4, freq: 0.6 + i * 0.25 })));
  let veilGlow = null, templeObj = null;
  const flames = [];
  if (court) {
    // ---------------------------------------------------------------- the court of the Temple
    const TZ = P.templeZ;
    const pav = paveTex('#efe2c8', '#d8c8a8', mode.length);
    const len = 20 - TZ + 40;
    pav.repeat.set(18, len / 6);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, len), lam('#ffffff', { map: pav })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, 20 - len / 2); scene.add(floor);
    const t = temple3d({ glow: P.glow }); t.position.set(0, 0, TZ); scene.add(t); templeObj = t; veilGlow = t.userData.glow;
    // colonnades converging on the sanctuary, and the outer wall behind them
    scene.add(colonnade3d(-13, -36, TZ + 4, -1, { h: 7 }), colonnade3d(13, -36, TZ + 4, 1, { h: 7 }));
    const wall = box(240, 12, 2, lam(mixc('#d8c4a4', P.fog, 0.15))); wall.position.set(0, 6, TZ - 40); scene.add(wall);
    // two great lampstands in the court, and the altar of offering to one side
    for (const x of [-8, 8]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.3, 6, 8), lam('#c8963e', { emissive: '#6a4a14', emissiveIntensity: 0.3 })); post.position.set(x, 3, TZ + 22); scene.add(post);
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.4, 0.6, 12), lam('#c8963e')); bowl.position.set(x, 6.2, TZ + 22); scene.add(bowl);
      const fl = sprite(warm, 5, 0.9, true); fl.position.set(x, 7, TZ + 22); scene.add(fl); flames.push(fl);
    }
    const alt = box(7, 3.2, 7, lam('#cbb89a')); alt.position.set(-22, 1.6, TZ + 18); scene.add(alt);
    // the city roofs beyond the outer wall, and cypresses
    for (let k = 0; k < 24; k++) { const hh = 4 + r() * 5; const h = house3d(6 + r() * 4, hh, 6, mixc('#e8dcc4', '#c8b494', r()).getStyle(), r); h.position.set(-110 + k * 9.5, 0, TZ - 50 - r() * 30); scene.add(h); }
    for (let k = 0; k < 6; k++) scene.add(cypress3d(-60 + k * 24 + (r() - 0.5) * 6, TZ - 46, 16 + r() * 6, '#3a5a3a'));
  } else {
    // ---------------------------------------------------------------- the house of Joachim and Anne, across the valley
    scene.add(fields(2600, 1100, GL, -680, 7, DRY));
    for (let k = 0; k < 70; k++) scene.add(olive3d(-160 + (k % 14) * 24 + (r() - 0.5) * 10, -70 - Math.floor(k / 14) * 40 - r() * 20, 7 + r() * 3, 60 + k, '#7a8a64', GL));
    // the Temple Mount across the valley, placed in the open part of the frame
    const [sx, sy, d, lit] = P.mount, p = atScreen(cam, sx, sy, d);
    const tm = templeMount3d({ lit }); tm.position.set(p.x, GL - 6, p.z); tm.scale.setScalar(d / 700 * 1.3); tm.rotation.y = -0.12; scene.add(tm); templeObj = tm.userData.temple; veilGlow = templeObj.userData.glow;
    const foot = ridge({ w: 900, d: 260, x: p.x, z: p.z + 40, y: GL - 8, amp: 18, color: mixc('#a8946a', P.fog, 0.25).getStyle(), seed: 31, freq: 1.4 }); scene.add(foot);
    // the city around the Mount
    for (let k = 0; k < 60; k++) { const hh = 6 + r() * 8; const h = house3d(8 + r() * 6, hh, 8, mixc('#ecdcc4', '#c8b090', r()).getStyle(), r, { lit }); h.position.set(p.x - 380 + k * 13 + (r() - 0.5) * 6, GL - 4 + r() * 6, p.z + 60 + r() * 50); h.scale.setScalar(d / 700); scene.add(h); }
    const mist = [[-200, -2, -380, 600, 50], [260, -3, -420, 640, 60]].map(([x, y, z, w, h], k) => { const m = sprite(mistTex, 1, 0.45); m.scale.set(w, h, 1); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });
    scene.userData.mist = mist;
    if (!P.noYard) {
      // the courtyard: a low stone wall with a gate, the house to the side, a fig tree
      const yw = stoneTex('#d8c4a0', 11); yw.repeat.set(10, 1);
      const yard = box(70, 2.0, 0.9, lam('#ffffff', { map: yw })); yard.position.set(0, 1.0, -44); scene.add(yard);
      const cap = box(70.4, 0.3, 1.1, lam('#e8d8b8')); cap.position.set(0, 2.1, -44); scene.add(cap);
      const h1 = house3d(14, 6.5, 10, '#efe2cc', r, { lit: mode === 'home' ? 1 : 0 }); h1.position.set(-21, 0, -52); scene.add(h1);
      const h2 = house3d(10, 5, 8, '#e4d4bc', r, { lit: mode === 'home' ? 1 : 0 }); h2.position.set(24, 0, -56); scene.add(h2);
      scene.add(olive3d(-9, -48, 9, 12, '#76885e'), olive3d(12, -50, 8, 13, '#7e9064'));
    }
  }
  // the near ground: court paving (already laid) or a dusty yard, with sparse grass at the sides
  if (!court) {
    const nearLen = P.noYard ? 48 : 66, z0 = 20;
    const gt = groundTex(P.near, ['#c8ac78', '#8a7a4a', '#d8c090'], mode.length, true); gt.repeat.set(700 / 14, 1);
    const brow = new THREE.Mesh(new THREE.PlaneGeometry(700, nearLen, 70, 6), lam('#ffffff', { map: gt })); brow.rotation.x = -Math.PI / 2; brow.position.set(0, 0, z0 - nearLen / 2); scene.add(brow);
    if (P.noYard) {
      const rim = new THREE.Mesh(new THREE.PlaneGeometry(700, 0.9), lam(mixc(P.near, '#fff0c0', 0.35), { emissive: mixc(P.near, '#fff0c0', 0.3), emissiveIntensity: 0.25 }));
      rim.rotation.x = -Math.PI / 2; rim.position.set(0, 0.02, z0 - nearLen + 0.45); scene.add(rim);
      const bank = new THREE.Mesh(new THREE.PlaneGeometry(700, 12), lam(mixc(P.near, '#3a3020', 0.35))); bank.position.set(0, -6, z0 - nearLen); scene.add(bank);
    }
  }
  const grassC = court ? ['#8a8a50', '#a0985a', '#7a7a44'] : [mixc(P.near || '#a89068', '#3a4a1a', 0.4).getStyle(), mixc(P.near || '#a89068', '#7a8a40', 0.45).getStyle(), '#9a8a4a'];
  if (!court) scene.add(tufts3d(200, { x: 9, z0: -20.5, z1: -40, h: [0.14, 0.26], colors: grassC, seed: 3 + mode.length }));
  // foreground (front3d canvas): low grass at the feet (house) or a few weeds in the paving cracks at the sides (court)
  const front = new THREE.Scene(); front.fog = scene.fog;
  front.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const fkey = new THREE.DirectionalLight(VL.key || P.key[0], P.key[1]); fkey.position.set(...pos); front.add(fkey);
  if (court) {
    for (const sd of [-1, 1]) front.add(tufts3d(14, { x: 1.2, z0: -10, z1: -16, h: [0.06, 0.12], colors: grassC, seed: sd + 9 + mode.length, blades: 4, r: 0.01 }).translateX(sd * 4.6));
  } else {
    front.add(tufts3d(120, { x: 4.6, z0: -9, z1: -16.8, h: [0.07, 0.14], colors: grassC, seed: 11 + mode.length, blades: 4, r: 0.012 }));
    front.add(tufts3d(50, { x: 4.4, z0: -17.4, z1: -19.4, h: [0.08, 0.16], colors: grassC, seed: 21 + mode.length, blades: 4, r: 0.014 }));
  }
  const air = P.air ? particles(P.air, { seed: mode.length * 5 + 2 }) : null;
  if (air) scene.add(air.points);
  let R = { move: P.move, amt: 0.07, ox: 540, oy: 1000, plane: 20 }, dirF = new THREE.Vector3(0, 0, -1);
  const P0 = cam.position.clone();
  return { scene, cam, front,
    rig(o) {
      R = { ...R, ...o };
      const f0 = (H / 2) / Math.tan(FOV * Math.PI / 360), z = R.plane;
      dirF = cam.localToWorld(new THREE.Vector3((R.ox - W / 2) / f0 * z, -(R.oy - H / 2) / f0 * z, -z)).sub(cam.position).normalize();
    },
    update(t, p) {
      let ry = 0, rz = 0;
      const mv = P.move, D = R.plane, Am = R.amt / 0.07;
      const toward = (u) => cam.position.copy(P0).addScaledVector(dirF, u);
      if (mv === 'push-fast') toward(1.6 * Am * p);
      else if (mv === 'push') toward(1.3 * Am * p);
      else if (mv === 'pull') toward(1.4 * Am * (1 - p));
      else if (mv === 'pan-r' || mv === 'pan-l') { const sg = mv === 'pan-r' ? 1 : -1; cam.position.set(P0.x + sg * (-0.75 + 1.5 * p) * Am, P0.y, P0.z - 0.35 * Am); }
      else if (mv === 'tilt-up') { cam.position.set(P0.x, P0.y + 0.55 * p * Am, P0.z); cam.setViewOffset(W, H, 0, -95 * p * Am, W, H); }
      else if (mv === 'dolly') { const z = 9 * p; cam.position.set(P0.x, P0.y, P0.z + z); cam.fov = 2 * Math.atan(TH * D / (D + z)) * 180 / Math.PI; cam.updateProjectionMatrix(); }
      else if (mv === 'drift') cam.position.set(P0.x + (0.4 - 0.8 * p) * Am, P0.y, P0.z - 0.15 * Am);
      else { const a = (-0.05 + 0.1 * p) * Am; cam.position.set(P0.x + D * Math.sin(a), P0.y, P0.z - D + D * Math.cos(a) - 0.3 * Am); ry = a; rz = (p - 0.5) * 0.016; }
      if (rays) rays.update(t, mode === 'altar' || mode === 'dusk' ? Math.min(1, 0.3 + t * 0.12) : 1);
      if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
      if (veilGlow) veilGlow.material.opacity = (court ? 0.55 : 0.8) * (P.glow ?? 0.7) * (0.85 + 0.15 * Math.sin(t * 1.3)) * (mode === 'altar' ? Math.min(1.25, 0.7 + t * 0.08) : 1);
      flames.forEach((fl, k) => { fl.material.opacity = 0.75 + 0.2 * Math.sin(t * 6.5 + k * 1.9); });
      clouds.forEach(([c, x, j]) => { c.position.x = x + t * (1.3 + (j % 3) * 0.5) * (j % 2 ? 1 : -1); });
      (scene.userData.mist || []).forEach(([m, x, j]) => { m.position.x = x + t * (2 + j * 0.6) * (j % 2 ? -1 : 1); });
      if (air) air.update(t);
      return { ry, rz };
    } };
}

export const BUILD = { jerHook: () => jerusalem3d('hook'), jerHome: () => jerusalem3d('home'), jerWait: () => jerusalem3d('wait'), jerClimb: () => jerusalem3d('climb'),
  jerAltar: () => jerusalem3d('altar'), jerDusk: () => jerusalem3d('dusk'), jerGlory: () => jerusalem3d('glory') };

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
