// three.js backgrounds for St. Catherine of Alexandria (whole life; browser module, build.mjs copies it to work/<slug>/bg3d.mjs).
// A new reusable set, alexandria(name, { base, ...overrides }): late-Roman Alexandria on the Egyptian coast (white flat-roofed
// city with a few domes, temples, date palms, the harbour with ships and the Pharos lighthouse on its island), plus two
// variants: 'cell' (a stone prison cell with a barred window onto the night) and 'sinai' (the red granite peaks of Mount
// Sinai with St. Catherine's walled monastery, its basilica and bell tower).
//   kHook   (push-fast) golden morning over the harbour, the Pharos at right (portrait; the fifty wise men)
//   kYouth  (pan-r)     bright day over the city and its temples (a brilliant girl; the vision)
//   kEmp    (push)      dusk, lit windows, the temple of the idols (she faces the emperor)
//   kDebate (drift)     warm afternoon over the city (the debate)
//   kCell   (pan-l)     night prison cell, moonlight through the bars (the dove)
//   kWheel  (dolly)     storm over the city, a break of light swells; the temple looms behind her (the wheel)
//   kSinai  (tilt-up + rack) night over Mount Sinai, light from above (her death; the angels)
//   kGlory  (arc)       sunset over Sinai, the monastery lit (feast day)
// Layers, far to near: sky + sun + rays -> cumulus -> the sea to the horizon (or the Sinai ridges) -> the Pharos on its island,
// ships -> the city on its plain (flatCity3d, temples, palms) -> a sandy near ground ending just behind the characters' feet.
// Deterministic: drawn from timeline time only. cam3d: one camera for the 3D and the SVG cards (makeRig).
// Exported for later reels: alexandria(name, extra), pharos3d(), flatCity3d(), monastery3d(), datePalm3d().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, sprite, atScreen, makeRig, stars } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const A = await import('./agnes.bg3d.js');
const E = await import('./edmund.bg3d.js');
const N = await import('./andrew.bg3d.js');
const R = await import('./roma.bg3d.js');
window.BG3D_LIB = prevLib;
const { cumulus, godRays, cypress3d } = A;
const { groundTex, tufts3d, particles } = E;
const { boat3d } = N;
const { romanTemple3d, basilica3d } = R;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,224,160,.75)'], [0.55, 'rgba(255,190,120,.22)'], [1, 'rgba(255,180,120,0)']]);
const moonT = glowTex([[0, 'rgba(240,246,255,1)'], [0.18, 'rgba(220,232,255,.8)'], [0.5, 'rgba(190,210,250,.22)'], [1, 'rgba(180,200,250,0)']]);
const mistTex = glowTex([[0, 'rgba(250,240,228,.8)'], [0.45, 'rgba(246,234,222,.35)'], [1, 'rgba(246,234,222,0)']]);
function streakTex(seed, color, n = 120) {
  const r = rng(seed);
  const t = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512);
    for (let k = 0; k < n; k++) { const x = r() * 256, y = r() * 512, w = 10 + r() * 46; g.fillStyle = `rgba(${color},${0.12 + r() * 0.32})`; g.fillRect(x, y, w, 2 + r() * 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}

/** A date palm: a thin leaning trunk with a crown of drooping fronds. Base at (x, y, z). */
export function datePalm3d(x, z, h, seed, { y = 0, c = '#4a7a3a' } = {}) {
  const g = new THREE.Group(), r = rng(seed), m = lam(c, { side: THREE.DoubleSide }), tm = lam(mixc(c, '#5a3a22', 0.75));
  const lean = (r() - 0.5) * 0.25;
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.014 * h, 0.024 * h, h, 6), tm); tr.position.set(0, h / 2, 0); tr.rotation.z = lean; g.add(tr);
  const top = new THREE.Vector3(-Math.sin(lean) * h * 0.5, h * 0.98, 0);
  for (let k = 0; k < 9; k++) {
    const fr = new THREE.Mesh(new THREE.PlaneGeometry(0.32 * h, 0.055 * h), m); fr.position.copy(top);
    fr.rotation.set(0, (k / 9) * Math.PI * 2 + r() * 0.3, -0.45 - r() * 0.35); fr.translateX(0.14 * h); g.add(fr);
  }
  g.position.set(x, y, z); return g;
}

/** The white city: flat-roofed houses with parapets, a few small domes, dark doorways (lit: some glow at night).
 * n houses from x0 to x1 around depth z (spreading `depth` units back). */
export function flatCity3d(n, x0, x1, z, { seed = 3, y = 0, lit = 0, s = 1, depth = 30 } = {}) {
  const g = new THREE.Group(), r = rng(seed), win = glowMat('#ffd98a'), dk = lam('#6a5444');
  for (let k = 0; k < n; k++) {
    const w = (4 + r() * 5) * s, hh = (3 + r() * 5) * s, d = (4 + r() * 4) * s, x = x0 + (x1 - x0) * (k + r() * 0.6) / n, zz = z - r() * depth * s;
    const c = mixc('#f6eedf', '#dcc29a', r() * 0.8);
    const b = box(w, hh, d, lam(c)); b.position.set(x, y + hh / 2, zz); g.add(b);
    const cap = box(w + 0.3 * s, 0.4 * s, d + 0.3 * s, lam(mixc(c, '#fffaf0', 0.45))); cap.position.set(x, y + hh + 0.2 * s, zz); g.add(cap);
    if (r() < 0.16) { const dm = new THREE.Mesh(new THREE.SphereGeometry(Math.min(w, d) * 0.34, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), lam(mixc(c, '#f8f0e0', 0.35)));
      dm.position.set(x, y + hh + 0.35 * s, zz); g.add(dm); }
    const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.8 * s, 1.2 * s), lit && r() < 0.5 ? win : dk); wn.position.set(x + (r() - 0.5) * w * 0.5, y + hh * 0.5, zz + d / 2 + 0.02); g.add(wn);
  }
  return g;
}

/** The Pharos of Alexandria: a square tapering lower tower, an octagonal middle stage, a round lantern with a fire and a
 * small dome. About 50 high, base at y 0, front faces +z. Returns { group, fire } (fire: the beacon glow sprite). */
export function pharos3d({ stone = '#ece2cc', lit = 1 } = {}) {
  const g = new THREE.Group(), sm = lam(stone), sh = lam(mixc(stone, '#8a7458', 0.28));
  const base = box(15, 2.4, 15, sh); base.position.y = 1.2; g.add(base);
  const t1 = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 5.8, 28, 4, 1), sm); t1.rotation.y = Math.PI / 4; t1.position.y = 2.4 + 14; g.add(t1);
  for (let k = 0; k < 4; k++) {   // window slits on the front face of the lower tower
    const hy = 5 + k * 6, rr = 5.8 - 1.4 * hy / 28, wn = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.7), lam('#5a4636'));
    wn.position.set(0, 2.4 + hy, rr * 0.7071 + 0.05); g.add(wn);
  }
  const l1 = box(8.6, 0.9, 8.6, sh); l1.position.y = 30.8; g.add(l1);
  const t2 = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 3.3, 12, 8), sm); t2.position.y = 31.2 + 6; g.add(t2);
  const l2 = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.8, 8), sh); l2.position.y = 43.6; g.add(l2);
  const t3 = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.1, 5, 12), lam(mixc(stone, '#fff0c8', lit * 0.4))); t3.position.y = 46.5; g.add(t3);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.9, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), sh); dome.position.y = 49; g.add(dome);
  const fire = sprite(warm, 22, 0.85 * lit, true); fire.position.set(0, 46.5, 2.5); g.add(fire);
  return { group: g, fire };
}

/** St. Catherine's Monastery at Mount Sinai: granite fortress walls with crenels and corner towers, the basilica inside and a
 * bell tower with a gold cross. About 44 wide; base at y 0, front faces +z. */
export function monastery3d({ stone = '#c8a87e', lit = 0 } = {}) {
  const g = new THREE.Group(), sm = lam(stone), sh = lam(mixc(stone, '#5a4030', 0.3)), WD = 44, DP = 34, h = 11;
  for (const z of [DP / 2, -DP / 2]) { const b = box(WD, h, 1.6, sm); b.position.set(0, h / 2, z); g.add(b); }
  for (const x of [-WD / 2, WD / 2]) { const b = box(1.6, h, DP, sh); b.position.set(x, h / 2, 0); g.add(b); }
  for (let k = 0; k < 14; k++) { const c = box(1.4, 1.3, 1.8, sm); c.position.set(-WD / 2 + 1.5 + k * (WD - 3) / 13, h + 0.65, DP / 2); g.add(c); }
  for (const x of [-WD / 2, WD / 2]) { const t = box(4.4, h + 3.4, 4.4, sm); t.position.set(x, (h + 3.4) / 2, DP / 2); g.add(t); }
  const gate = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.6), lit ? glowMat('#ffc070') : lam('#4a3626')); gate.position.set(-8, 1.8, DP / 2 + 0.85); g.add(gate);
  const bas = basilica3d({ stone: '#dcc4a2', roof: '#7a6a62', lit }); bas.scale.setScalar(0.4); bas.position.set(-4, 0, -6); g.add(bas);
  const tower = box(4, 21, 4, lam('#dcc4a2')); tower.position.set(9, 10.5, 2); g.add(tower);
  const bell = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.4), lit ? glowMat('#ffd98a') : lam('#4a3626')); bell.position.set(9, 17, 4.02); g.add(bell);
  const tr = new THREE.Mesh(new THREE.ConeGeometry(3.2, 4, 4), lam('#7a5a4a')); tr.rotation.y = Math.PI / 4; tr.position.set(9, 23, 2); g.add(tr);
  const gm = glowMat('#f2c46b'), cr = box(0.35, 2.6, 0.35, gm); cr.position.set(9, 26.3, 2); g.add(cr);
  const crb = box(1.5, 0.35, 0.35, gm); crb.position.set(9, 26.8, 2); g.add(crb);
  for (let k = 0; k < 4; k++) g.add(cypress3d(-18 + k * 4.5, -10 + (k % 2) * 3, 9 + (k % 3) * 2, '#2e4a32', 0));
  if (lit) { const gl = sprite(warm, 70, 0.28, true); gl.position.set(0, 10, 14); g.add(gl); }
  return g;
}

const GL = -2.5, SEA = -3;
const SAND = ['#c8a874', '#b89a64', '#d8bc88'];
const MODES = {
  hook: { move: 'push-fast', sky: [[0, '#5a6aa0'], [0.22, '#94a6c8'], [0.4, '#eccca4'], [0.5, '#f8dcac'], [0.57, '#fbe6bc'], [1, '#fbe6bc']], fog: '#f0d4b0',
    hemi: ['#fff0d8', '#6a5440', 1.4], key: ['#ffd8a0', 1.4], sun: [200, 820, 0.85], rays: { op: 0.08, dir: 0.6, spread: 1.0 },
    cloudLit: '#fff2e0', cloudShade: '#c8b0b8', stars: 0, air: 'gold', near: '#c8a874', water: '#5a8ab0', streak: '255,240,210', streakOp: 0.35,
    sea: true, city: true, pharos: [900, 1040, 560, 0.95, 0.6], temples: [[250, 1090, 300]], ships: [[600, -430, 1.1], [760, -620, 1.2]],
    clouds: [[150, 470, 900, 9], [930, 440, 900, 10], [640, 600, 950, 6]] },
  youth: { move: 'pan-r', sky: [[0, '#3a78b8'], [0.36, '#8cc0e0'], [0.5, '#e4dcbc'], [0.57, '#f0e0b8'], [1, '#f0e0b8']], fog: '#e8dcbc',
    hemi: ['#ffffff', '#8a6a44', 1.6], key: ['#fff4d8', 1.6], sun: [860, 520, 0.5], rays: { op: 0.05, dir: -0.5, spread: 0.9 },
    cloudLit: '#ffffff', cloudShade: '#c4cede', stars: 0, air: 'dust', near: '#ccae78', water: '#4a8ab8', streak: '255,255,255', streakOp: 0.3,
    sea: true, city: true, pharos: [130, 1036, 900, 0.8, 0], temples: [[800, 1078, 250], [330, 1090, 420]], ships: [[560, -520, 1.0]],
    clouds: [[170, 480, 900, 9], [900, 450, 900, 10], [560, 610, 950, 6]] },
  emp: { move: 'push', sky: [[0, '#22284a'], [0.24, '#4a4a74'], [0.42, '#9a7a90'], [0.52, '#e8ac88'], [0.57, '#f2c69c'], [1, '#f2c69c']], fog: '#b8968e',
    hemi: ['#ffdcc8', '#3a3430', 1.2], key: ['#ffc090', 1.2], sun: [960, 940, 0.55], rays: { op: 0, dir: 0, spread: 0.5 },
    cloudLit: '#f0c4b0', cloudShade: '#6e6280', stars: 30, air: 'gold', near: '#a88a64', water: '#4a5a7a', streak: '255,200,160', streakOp: 0.3,
    sea: true, city: true, lit: 1, pharos: [130, 1036, 760, 0.85, 1], temples: [[780, 1072, 230]], ships: [],
    clouds: [[120, 470, 900, 10], [960, 500, 900, 10]] },
  debate: { move: 'drift', sky: [[0, '#6a7aa0'], [0.24, '#a8a8b8'], [0.42, '#e0c8a8'], [0.52, '#f0d4a8'], [0.57, '#f4dcb4'], [1, '#f4dcb4']], fog: '#e8ccaa',
    hemi: ['#fff0dc', '#5a4a3a', 1.35], key: ['#ffe0b0', 1.3], sun: [940, 660, 0.6], rays: { op: 0.05, dir: -0.5, spread: 0.9 },
    cloudLit: '#fff4e4', cloudShade: '#b8aab8', stars: 0, air: 'dust', near: '#c4a472', water: '#5a86a8', streak: '255,240,210', streakOp: 0.3,
    sea: true, city: true, pharos: [560, 1036, 1000, 0.8, 0], temples: [[160, 1080, 300], [900, 1082, 330]], ships: [[420, -700, 1.1]],
    clouds: [[160, 480, 900, 9], [900, 450, 900, 10]] },
  cell: { move: 'pan-l', cell: true, sky: [[0, '#0e1430'], [0.5, '#1e2a50'], [1, '#2e3a64']], fog: '#2a2a3e',
    hemi: ['#9aa8d8', '#1a141c', 0.75], key: ['#c8d8ff', 1.0], win: [760, 560], air: 'dust', near: '#5a5058', stars: 0 },
  wheel: { move: 'dolly', sky: [[0, '#1e2036'], [0.24, '#3e3a58'], [0.42, '#6e6478'], [0.52, '#a8928e'], [0.58, '#bca69a'], [1, '#bca69a']], fog: '#8a8090',
    hemi: ['#dcd4e8', '#2a2628', 1.1], key: ['#ffe0b8', 0.9], sun: null, breakAt: [560, 520], rays: { op: 0.16, dir: 0.1, spread: 0.8 }, swell: true,
    cloudLit: '#a8a0b8', cloudShade: '#3e3a56', stars: 0, air: 'dust', near: '#8a7a60', water: '#3e4a64', streak: '220,220,240', streakOp: 0.25,
    sea: true, city: true, pharos: [930, 1036, 760, 0.85, 0.5], temples: [[560, 1068, 220]], ships: [],
    clouds: [[130, 560, 900, 10], [960, 580, 900, 10], [420, 650, 950, 7]] },
  sinai: { move: 'tilt-up', sky: [[0, '#0e1230'], [0.24, '#1e2450'], [0.42, '#3e3e6e'], [0.52, '#7a6a8a'], [0.58, '#9a849a'], [1, '#9a849a']], fog: '#5a5a78',
    hemi: ['#c8ccf0', '#1e1c26', 1.0], key: ['#ffe8c8', 0.8], sun: null, breakAt: [540, 470], rays: { op: 0.15, dir: 0, spread: 0.8 }, swell: true,
    cloudLit: '#9a9ab8', cloudShade: '#2e2e4a', stars: 90, air: 'gold', near: '#7a6650',
    sinai: true, peaks: ['#5a4660', '#6a4a58', '#7a5248'], monastery: [790, 1058, 300, 1],
    clouds: [[130, 560, 900, 9], [960, 580, 900, 9]] },
  glory: { move: 'arc', sky: [[0, '#1a1c48'], [0.2, '#3a3270'], [0.36, '#8a5a86'], [0.47, '#e08a7a'], [0.53, '#f8c088'], [0.57, '#fcdca4'], [1, '#fcdca4']], fog: '#e0a088',
    hemi: ['#ffdcc4', '#3a3040', 1.25], key: ['#ffb880', 1.5], sun: [820, 940, 0.9], rays: { op: 0.09, dir: -0.4, spread: 1.6, up: true },
    cloudLit: '#ffc8a8', cloudShade: '#8a6a98', stars: 60, air: 'gold', near: '#a07a58',
    sinai: true, peaks: ['#9a5a6a', '#a8606a', '#b86a5a'], monastery: [800, 1060, 300, 1],
    clouds: [[150, 470, 900, 9], [960, 440, 900, 9]] },
};

/** alexandria(name, { base, ...overrides }): a set-up of Alexandria, the prison cell or Mount Sinai built on a mode above. */
export function alexandria(mode = 'hook', extra = null) {
  const P = extra ? { ...MODES[extra.base || 'hook'], ...extra } : MODES[mode], r = rng(mode.length * 23 + 7);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, P.cell ? 40 : 170, P.cell ? 160 : 1600);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[mode] || {};
  const pos = { l: [-80, 25, -100], r: [80, 25, -100], back: [0, 22, -100], top: [0, 60, -30] }[VL.from] || [-60, 30, -80];
  const key = new THREE.DirectionalLight(VL.key || P.key[0], P.key[1]); key.position.set(...pos); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 29, 0.8, { el0: 0.26, el1: 0.62 }));
  let sunGlow = null;
  if (P.sun) { sunGlow = sprite(warm, 1500, P.sun[2] * 0.85); sunGlow.position.copy(atScreen(cam, P.sun[0], P.sun[1], 2500)); scene.add(sunGlow); }
  const rp = P.rays || { op: 0 }, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length + 5 }) : null;
  if (rays) scene.add(rays.group);
  let breakGlow = null;
  if (P.breakAt) { breakGlow = sprite(warm, 520, 0.25, true); breakGlow.position.copy(atScreen(cam, P.breakAt[0], P.breakAt[1], 1200)); scene.add(breakGlow); }
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(210 + k * 3 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  const place = (obj, [sx, sy, d], s = 1, ry = 0, y = GL) => { const p = atScreen(cam, sx, sy, d); obj.position.set(p.x, y, p.z); obj.scale.setScalar(s * d / 250); obj.rotation.y = ry; scene.add(obj); return p; };

  let st = null, fire = null, fireOp = 0, moon = null, winRays = null;
  const ships = [];
  if (P.sea) {
    // the Mediterranean to the horizon, with drifting light streaks
    const water = new THREE.Mesh(new THREE.PlaneGeometry(5000, 2700), lam(mixc(P.water, P.fog, 0.18))); water.rotation.x = -Math.PI / 2; water.position.set(0, SEA, -1550); scene.add(water);
    st = streakTex(mode.length + 2, P.streak); st.repeat.set(10, 18);
    const sheen = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: P.streakOp, depthWrite: false }));
    sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, SEA + 0.05, -900); scene.add(sheen);
    // a low far coast at the edge of the sea
    scene.add(ridge({ w: 3600, d: 140, z: -1500, y: SEA - 2, amp: 10, color: mixc('#b89a7a', P.fog, 0.55).getStyle(), seed: 19, freq: 0.6 }));
    if (P.pharos) {   // the Pharos on its island (sx, sy, dist, scale, fire)
      const [sx, sy, d, s, f] = P.pharos, ph = pharos3d({ lit: f });
      const p = atScreen(cam, sx, sy, d), k = s * d / 250;
      ph.group.position.set(p.x, SEA + 1.2 * k, p.z); ph.group.scale.setScalar(k * 0.9); ph.group.rotation.y = -0.3; scene.add(ph.group);
      const isl = new THREE.Mesh(new THREE.CylinderGeometry(16 * k, 22 * k, 3 * k, 18), lam(mixc('#c8b08a', P.fog, 0.3))); isl.position.set(p.x, SEA, p.z); scene.add(isl);
      fire = f ? ph.fire : null; fireOp = 0.85 * f;
    }
    (P.ships || []).forEach(([sx, z, sc], k) => {
      const sh = boat3d({ s: sc * 3.2, hull: k % 2 ? '#6a4228' : '#5a3a26', sail: '#efe2c4', sailOn: true });
      const p = atScreen(cam, sx, 1200, -z); sh.position.set(p.x, SEA, z); sh.rotation.y = k % 2 ? 0.4 : -0.3; scene.add(sh); ships.push([sh, sh.position.x, k]);
    });
  }
  if (P.city) {
    // the plain the city stands on, down to the shore
    const plain = new THREE.Mesh(new THREE.PlaneGeometry(2600, 200), lam(mixc('#d0b484', P.fog, 0.25))); plain.rotation.x = -Math.PI / 2; plain.position.set(0, GL - 0.05, -128); scene.add(plain);
    for (let k = 0; k < 4; k++) scene.add(flatCity3d(22, -240 + k * 20, 240 - k * 10, -50 - k * 38, { seed: 7 + k, y: GL, lit: P.lit || 0, s: 1 + k * 0.35, depth: 24 }));
    (P.temples || []).forEach((t, k) => place(romanTemple3d({ stone: '#f2e8d4', roof: '#a8664a' }), t, 0.9, 0.25 - k * 0.45));
    for (let k = 0; k < 26; k++) { const side = k % 2 ? 1 : -1; scene.add(datePalm3d(side * (12 + r() * 120), -36 - r() * 110, 11 + r() * 6, 50 + k, { y: GL, c: mixc('#4a7a3a', P.fog, 0.15).getStyle() })); }
  }
  if (P.sinai) {
    // the red granite peaks of Sinai in aerial perspective, a desert floor, the monastery at the foot of the mountain
    [[-950, 270, 260, 0], [-640, 180, 220, 1], [-430, 95, 160, 2]].forEach(([z, amp, d, i]) =>
      scene.add(ridge({ w: 3600, d, z, y: GL - 4, amp, color: mixc(P.peaks[i], P.fog, 0.3 - i * 0.08).getStyle(), seed: 31 + i * 5, freq: 0.9 + i * 0.35 })));
    const desert = new THREE.Mesh(new THREE.PlaneGeometry(2600, 420), lam(mixc('#b48a62', P.fog, 0.3))); desert.rotation.x = -Math.PI / 2; desert.position.set(0, GL - 0.05, -238); scene.add(desert);
    if (P.monastery) { const [sx, sy, d, l] = P.monastery; place(monastery3d({ lit: l }), [sx, sy, d], 1.0, -0.3); }
    for (let k = 0; k < 18; k++) { const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(1 + r() * 2.5, 0), lam(mixc('#8a6a5a', P.fog, 0.2 + r() * 0.2)));
      rk.scale.y = 0.55; rk.position.set((r() * 2 - 1) * 140, GL, -50 - r() * 180); scene.add(rk); }
  }
  let mist = [];
  if (!P.cell) mist = [[-240, -1, -420, 560, 40], [180, -1.5, -480, 640, 46], [540, -1, -400, 480, 40]].map(([x, y, z, w, h], k) => {
    const m = sprite(mistTex, 1, P.sinai ? 0.3 : 0.38); m.scale.set(w, h, 1); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });

  // the near ground: sand (or the cell's stone floor) ending in a lit rim just behind the feet, a bank down to the plain
  const nearLen = P.cell ? 60 : 48, z0 = 20, zFar = z0 - nearLen;
  const gt = groundTex(P.near, P.cell ? ['#6a6068', '#4a4250', '#7a7078'] : SAND, mode.length + 3, !P.cell); gt.wrapS = THREE.RepeatWrapping; gt.repeat.set(700 / 14, 1);
  const brow = new THREE.Mesh(new THREE.PlaneGeometry(700, nearLen, 70, 6), lam('#ffffff', { map: gt })); brow.rotation.x = -Math.PI / 2; brow.position.set(0, 0, z0 - nearLen / 2); scene.add(brow);
  if (!P.cell) {
    const rim = new THREE.Mesh(new THREE.PlaneGeometry(700, 0.9), lam(mixc(P.near, '#fff0c0', 0.35), { emissive: mixc(P.near, '#fff0c0', 0.3), emissiveIntensity: 0.25 }));
    rim.rotation.x = -Math.PI / 2; rim.position.set(0, 0.02, zFar + 0.45); scene.add(rim);
    const bank = new THREE.Mesh(new THREE.PlaneGeometry(700, 12), lam(mixc(P.near, '#3a3020', 0.35))); bank.position.set(0, -6, zFar); scene.add(bank);
  } else {
    // the cell: a stone back wall with a barred window onto the night sky (the sky background shows through the hole)
    const wp = atScreen(cam, P.win[0], P.win[1], 27), wz = wp.z, WW = 2.6, WH = 3.2;
    const wallW = 44, wallH = 26, u = (wp.x + wallW / 2) / wallW, v = wp.y / wallH;
    const wt = canvasTex(1024, 608, (g, w, h) => {
      g.fillStyle = '#4e4450'; g.fillRect(0, 0, w, h);
      const rr = rng(41), rows = 16, cols = 14;
      for (let row = 0; row < rows; row++) for (let c = 0; c <= cols; c++) {
        const x = c * w / cols - (row % 2) * w / cols / 2, y = row * h / rows, sh = rr();
        g.fillStyle = sh < 0.33 ? '#5a4e5a' : sh < 0.66 ? '#544854' : '#483e4a'; g.fillRect(x + 3, y + 3, w / cols - 6, h / rows - 6);
        g.fillStyle = 'rgba(255,240,230,.06)'; g.fillRect(x + 3, y + 3, w / cols - 6, 4);
      }
      const px = u * w, py = (1 - v) * h, pw = WW / wallW * w, phh = WH / wallH * h;
      g.clearRect(px - pw / 2, py - phh / 2, pw, phh);
    });
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(wallW, wallH), lam('#ffffff', { map: wt, transparent: true, alphaTest: 0.5 }));
    wall.position.set(0, wallH / 2, wz); scene.add(wall);
    const ironM = lam('#1e1820');
    for (let k = -1; k <= 1; k++) { const b = box(0.16, WH, 0.16, ironM); b.position.set(wp.x + k * 0.7, wp.y, wz + 0.1); scene.add(b); }
    const sill = box(WW + 0.8, 0.35, 0.6, lam('#6a5e6a')); sill.position.set(wp.x, wp.y - WH / 2 - 0.1, wz + 0.25); scene.add(sill);
    moon = sprite(moonT, 7, 0.9); moon.position.set(wp.x + 0.5, wp.y + 0.6, wz - 30); scene.add(moon);
    scene.add(stars(40, 7, 0.9, { el0: 0.05, el1: 0.3, spread: 0.5 }));
    winRays = godRays(cam, P.win[0], P.win[1], 26, { n: 6, len: 34, width: 2.2, spread: 0.32, dir: -0.5, op: 0.1, seed: 9, color: '#d8e4ff' });
    scene.add(winRays.group);
  }
  const grassC = P.cell ? ['#a89458', '#8a7a48', '#c4ac6e'] : [mixc(P.near, '#5a5a2a', 0.35).getStyle(), mixc(P.near, '#9a9a52', 0.35).getStyle(), '#b8a466'];
  scene.add(tufts3d(P.cell ? 60 : 140, { x: 9, z0: -20.5, z1: zFar + 1, h: [0.12, 0.22], colors: grassC, seed: 3 + mode.length }));
  const front = new THREE.Scene(); front.fog = scene.fog;
  front.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const fkey = new THREE.DirectionalLight(VL.key || P.key[0], P.key[1]); fkey.position.set(...pos); front.add(fkey);
  front.add(tufts3d(P.cell ? 50 : 90, { x: 4.6, z0: -9, z1: -16.8, h: [0.07, 0.13], colors: grassC, seed: 11 + mode.length, blades: 4, r: 0.012 }));
  front.add(tufts3d(P.cell ? 20 : 36, { x: 4.4, z0: -17.4, z1: -19.4, h: [0.08, 0.15], colors: grassC, seed: 21 + mode.length, blades: 4, r: 0.014 }));
  const air = P.air ? particles(P.air, { seed: mode.length * 5 + 3 }) : null;
  if (air) scene.add(air.points);
  let Rg = { move: P.move, amt: 0.07, ox: 540, oy: 1000, plane: 20 }, dirF = new THREE.Vector3(0, 0, -1);
  const P0 = cam.position.clone();
  return { scene, cam, front,
    rig(o) {
      Rg = { ...Rg, ...o };
      const f0 = (H / 2) / Math.tan(FOV * Math.PI / 360), z = Rg.plane;
      dirF = cam.localToWorld(new THREE.Vector3((Rg.ox - W / 2) / f0 * z, -(Rg.oy - H / 2) / f0 * z, -z)).sub(cam.position).normalize();
    },
    update(t, p) {
      let ry = 0, rz = 0;
      const mv = P.move, D = Rg.plane, Am = Rg.amt / 0.07;
      const toward = (u) => cam.position.copy(P0).addScaledVector(dirF, u);
      if (mv === 'push-fast') toward(1.6 * Am * p);
      else if (mv === 'push') toward(1.3 * Am * p);
      else if (mv === 'pull') toward(1.4 * Am * (1 - p));
      else if (mv === 'pan-r' || mv === 'pan-l') { const sg = mv === 'pan-r' ? 1 : -1; cam.position.set(P0.x + sg * (-0.75 + 1.5 * p) * Am, P0.y, P0.z - 0.35 * Am); }
      else if (mv === 'tilt-up') { cam.position.set(P0.x, P0.y + 0.55 * p * Am, P0.z); cam.setViewOffset(W, H, 0, -95 * p * Am, W, H); }
      else if (mv === 'dolly') { const z = 9 * p; cam.position.set(P0.x, P0.y, P0.z + z); cam.fov = 2 * Math.atan(TH * D / (D + z)) * 180 / Math.PI; cam.updateProjectionMatrix(); }
      else if (mv === 'drift') cam.position.set(P0.x + (0.4 - 0.8 * p) * Am, P0.y, P0.z - 0.15 * Am);
      else { const a = (-0.05 + 0.1 * p) * Am; cam.position.set(P0.x + D * Math.sin(a), P0.y, P0.z - D + D * Math.cos(a) - 0.3 * Am); ry = a; rz = (p - 0.5) * 0.016; }
      const k = P.swell ? Math.min(1, 0.2 + t * 0.11) : 1;
      if (rays) rays.update(t, k);
      if (winRays) winRays.update(t, 1);
      if (breakGlow) breakGlow.material.opacity = 0.12 + 0.3 * k;
      if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
      if (fire) fire.material.opacity = fireOp * (0.82 + 0.18 * Math.sin(t * 5.3) * Math.sin(t * 2.1 + 1));
      if (moon) moon.material.opacity = 0.85 + 0.08 * Math.sin(t * 0.8);
      clouds.forEach(([c, x, j]) => { c.position.x = x + t * (1.3 + (j % 3) * 0.5) * (j % 2 ? 1 : -1); });
      mist.forEach(([m, x, j]) => { m.position.x = x + t * (2 + j * 0.6) * (j % 2 ? -1 : 1); });
      ships.forEach(([sh, x, j]) => { sh.position.x = x + t * 0.8 * (j % 2 ? -1 : 1); sh.position.y = SEA + 0.15 * Math.sin(t * 1.3 + j * 2); sh.rotation.z = 0.025 * Math.sin(t * 1.1 + j); });
      if (st) { st.offset.y = -t * 0.02; st.offset.x = Math.sin(t * 0.5) * 0.02; }
      if (air) air.update(t);
      return { ry, rz };
    } };
}

export const SETS = {
  kHook: { base: 'hook' }, kYouth: { base: 'youth' }, kEmp: { base: 'emp' }, kDebate: { base: 'debate' },
  kCell: { base: 'cell' }, kWheel: { base: 'wheel' }, kSinai: { base: 'sinai' }, kGlory: { base: 'glory' },
};
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, v]) => [k, () => alexandria(k, v)]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
