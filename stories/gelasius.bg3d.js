// three.js backgrounds for Pope St. Gelasius I (Rome, 492–496; browser module, build.mjs copies it to work/<slug>/bg3d.mjs).
// A reusable late-antique ROME: roma(name, { base, ...overrides }), the first Rome set in the kit (2026-11-21).
//   rHook   (push-fast) golden morning over Rome: the Lateran-style basilica, the Colosseum, temples and stone pines
//   rCity   (pan-r)     a dusty afternoon: the aqueduct striding across the plain, crowded tiled roofs (a hungry city)
//   rLetter (push)      dusk: the basilica's windows lit, first stars (the letter to the emperor)
//   rFeast  (dolly)     a heavy grey-violet sky over the Palatine with its old temples; a break of light swells (the Lupercalia)
//   rDeath  (tilt-up + rack) night: stars, the basilica glowing far off, light breaking from above
//   rGlory  (arc)       sunset over the city, lit windows, gold motes
// Layers, far to near: sky gradient + sun + rays -> cumulus -> the Alban and Sabine hills in aerial perspective -> the
// Campagna (fields, olive groves, cypress lines) -> the city (basilica3d, colosseum3d, romanTemple3d, aqueduct3d, roofs,
// stone pines) -> a dusty near ground ending just behind the characters' feet. Deterministic: drawn from timeline time.
// Exported for later reels: roma(name, extra), basilica3d(), colosseum3d(), romanTemple3d(), aqueduct3d(), stonePine3d(), roofs3d().
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
const mistTex = glowTex([[0, 'rgba(250,240,228,.8)'], [0.45, 'rgba(246,234,222,.35)'], [1, 'rgba(246,234,222,0)']]);
/** A gable roof (triangular prism) w wide, h high, len long; axis 'x' (ridge along x) or 'z' (ridge along z, gable faces +z). */
function gable(w, h, len, m, axis = 'z') {
  const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.lineTo(-w / 2, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false }); g.translate(0, 0, -len / 2);
  if (axis === 'x') g.rotateY(Math.PI / 2);
  return new THREE.Mesh(g, m);
}
const arcTex = (stone = '#dcc8a4', dark = '#6a5444', rows = 3, per = 8) => canvasTex(256, 128, (g, w, h) => {
  g.fillStyle = stone; g.fillRect(0, 0, w, h);
  const rh = h * 0.8 / rows;
  for (let r = 0; r < rows; r++) for (let k = 0; k < per; k++) {
    const x = (k + 0.5) * w / per, y0 = h * 0.2 + r * rh, aw = w / per * 0.56;
    g.fillStyle = dark; g.beginPath(); g.moveTo(x - aw / 2, y0 + rh * 0.92); g.lineTo(x - aw / 2, y0 + rh * 0.42); g.arc(x, y0 + rh * 0.42, aw / 2, Math.PI, 0); g.lineTo(x + aw / 2, y0 + rh * 0.92); g.fill();
  }
  g.fillStyle = 'rgba(0,0,0,.12)'; for (let r = 0; r <= rows; r++) g.fillRect(0, h * 0.2 + r * rh - 2, w, 3);
  g.fillStyle = dark; for (let k = 0; k < per * 2; k++) g.fillRect((k + 0.4) * w / per / 2, h * 0.07, 4, 8);
});

/** An early Christian basilica (like the Lateran or old St. Peter's): a tall nave with a tiled gable roof, lower aisles,
 * a facade with three arched windows and an atrium wall in front, a round apse behind. Facade faces +z; about 34 wide, 22 high. */
export function basilica3d({ stone = '#e8d8bc', roof = '#a8583a', lit = 0 } = {}) {
  const g = new THREE.Group(), sm = lam(stone), sh = lam(mixc(stone, '#8a7458', 0.25)), rm = lam(roof), win = lit ? glowMat('#ffd98a') : lam('#5a4636');
  const nave = box(16, 17, 60, sm); nave.position.set(0, 8.5, 0); g.add(nave);
  const nr = gable(17.2, 5.2, 61, rm); nr.position.y = 17; g.add(nr);
  for (const sd of [-1, 1]) {
    const ai = box(9, 9.5, 58, sh); ai.position.set(sd * 12.5, 4.75, 0); g.add(ai);
    const ar = box(9.6, 0.8, 58.6, rm); ar.position.set(sd * 12.5, 9.8, 0); ar.rotation.z = sd * -0.2; g.add(ar);
    for (let k = 0; k < 9; k++) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.8), win); w.position.set(sd * 8.02, 13, -24 + k * 6); w.rotation.y = sd * Math.PI / 2; g.add(w); }
  }
  for (const x of [-4.2, 0, 4.2]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 4.4), win); w.position.set(x, 12.6, 30.02); g.add(w);
    const a = new THREE.Mesh(new THREE.CircleGeometry(1.2, 12, 0, Math.PI), win); a.position.set(x, 14.8, 30.02); g.add(a); }
  const door = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 5.4), lit ? glowMat('#ffc070') : lam('#4a3626')); door.position.set(0, 2.7, 30.03); g.add(door);
  const ap = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 13, 20, 1, false, Math.PI / 2, Math.PI), sm); ap.position.set(0, 6.5, -30); g.add(ap);
  // the atrium: a low arcaded wall around the forecourt
  const at = new THREE.MeshLambertMaterial({ map: arcTex(stone, '#7a6450', 1, 10) }); at.map.wrapS = THREE.RepeatWrapping; at.map.repeat.set(2, 1);
  const front = box(34, 5, 1, at); front.position.set(0, 2.5, 52); g.add(front);
  for (const sd of [-1, 1]) { const s = box(1, 5, 22, at); s.position.set(sd * 16.5, 2.5, 41); g.add(s); }
  if (lit) { const gl = sprite(warm, 46, 0.35, true); gl.position.set(0, 12, 34); g.add(gl); }
  return g;
}
/** The Colosseum: an open ring of arcades, three tiers and an attic, darker inside. About 64 across, 19 high. */
export function colosseum3d({ stone = '#dcc8a4' } = {}) {
  const g = new THREE.Group(), t = arcTex(stone, '#6a5444', 3, 8); t.wrapS = THREE.RepeatWrapping; t.repeat.set(10, 1);
  const out = new THREE.Mesh(new THREE.CylinderGeometry(32, 32, 19, 64, 1, true), lam('#ffffff', { map: t })); out.position.y = 9.5; out.scale.z = 0.82; g.add(out);
  const inn = new THREE.Mesh(new THREE.CylinderGeometry(30.5, 24, 17, 48, 1, true), lam(mixc(stone, '#5a4636', 0.45), { side: THREE.BackSide })); inn.position.y = 8.5; inn.scale.z = 0.82; g.add(inn);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(31.3, 0.7, 6, 64), lam(mixc(stone, '#fff4e0', 0.2))); rim.rotation.x = Math.PI / 2; rim.position.y = 19; rim.scale.y = 0.82; g.add(rim);
  return g;
}
/** A Roman temple: podium, six front columns, a pediment roof, the cella behind. Faces +z; about 15 wide, 16 high. */
export function romanTemple3d({ stone = '#efe4d0', roof = '#9a5a3a', ruined = false } = {}) {
  const g = new THREE.Group(), sm = lam(stone), sh = lam(mixc(stone, '#8a7458', 0.3));
  const pod = box(15, 3, 24, sh); pod.position.y = 1.5; g.add(pod);
  const cella = box(11, 9, 15, sm); cella.position.set(0, 7.5, -4); g.add(cella);
  for (let k = 0; k < 6; k++) { const hgt = ruined && (k === 1 || k === 4) ? 4 + k : 9.5;
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, hgt, 10), sm); c.position.set(-6 + k * 2.4, 3 + hgt / 2, 9.5); g.add(c); }
  if (!ruined) {
    const ent = box(15, 1.1, 22, sm); ent.position.set(0, 13.1, 0.5); g.add(ent);
    const ped = gable(15.4, 3.6, 22.4, lam(roof)); ped.position.set(0, 13.6, 0.5); g.add(ped);
    const tri = gable(14, 3.1, 0.3, sm); tri.position.set(0, 13.7, 11.8); g.add(tri);
  }
  return g;
}
/** A Roman aqueduct: tall piers with arches, carrying the water channel along x. len long, h high. */
export function aqueduct3d(len = 300, h = 16, { stone = '#d4bc98' } = {}) {
  const g = new THREE.Group(), sm = lam(stone), sh = lam(mixc(stone, '#6a5444', 0.3));
  for (let x = -len / 2; x <= len / 2; x += 7) { const p = box(2, h, 2.4, sm); p.position.set(x, h / 2, 0); g.add(p);
    const a = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.7, 4, 10, Math.PI), sm); a.position.set(x + 3.5, h - 3.2, 0); g.add(a); }
  const top = box(len + 4, 2.4, 2.8, sm); top.position.y = h + 0.6; g.add(top);
  const ch = box(len + 4, 0.6, 3, sh); ch.position.y = h + 2.1; g.add(ch);
  return g;
}
/** An umbrella (stone) pine: a tall bare trunk with a flat, dark canopy. Base at (x, y, z). */
export function stonePine3d(x, z, h, seed = 1, { y = 0, c = '#3e5a34' } = {}) {
  const g = new THREE.Group(), r = rng(seed), lean = (r() - 0.5) * 0.25;
  const t = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.025, h * 0.04, h * 0.78, 6), lam('#6a4a34')); t.position.set(Math.sin(lean) * h * 0.39, h * 0.39, 0); t.rotation.z = -lean; g.add(t);
  for (let k = 0; k < 4; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(h * (0.2 + r() * 0.08), 10, 6), lam(mixc(c, k % 2 ? '#7a9a58' : '#24361e', r() * 0.35)));
    s.scale.set(1.3, 0.34, 1); s.position.set(Math.sin(lean) * h * 0.78 + (r() - 0.5) * h * 0.35, h * (0.8 + r() * 0.06), (r() - 0.5) * h * 0.2); g.add(s); }
  g.position.set(x, y, z); return g;
}
/** A spread of Roman houses with red-tiled roofs (n houses from x0 to x1 around depth z). */
export function roofs3d(n, x0, x1, z, { seed = 3, y = 0, lit = 0, s = 1 } = {}) {
  const g = new THREE.Group(), r = rng(seed), win = glowMat('#ffd98a');
  for (let k = 0; k < n; k++) {
    const w = (5 + r() * 4) * s, hh = (3.5 + r() * 4) * s, d = (5 + r() * 3) * s, x = x0 + (x1 - x0) * (k + r() * 0.6) / n, zz = z - r() * 30 * s;
    const c = mixc('#efdcc0', '#d8b48c', r()); const b = box(w, hh, d, lam(c)); b.position.set(x, y + hh / 2, zz); g.add(b);
    const rf = gable(w + 0.6 * s, 1.8 * s, d + 0.6 * s, lam(mixc('#b8603e', '#8a4a32', r())), 'x'); rf.position.set(x, y + hh, zz); g.add(rf);
    if (lit && r() < 0.45) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.8 * s, 1 * s), win); wn.position.set(x, y + hh * 0.55, zz + d / 2 + 0.02); g.add(wn); }
  }
  return g;
}

const GL = -2.5;
const CAMPAGNA = ['#a8a058', '#bca866', '#8e9a50', '#c8a868', '#a89458', '#98a058', '#b8a462'];
const MODES = {
  hook: { move: 'push-fast', sky: [[0, '#5a6aa0'], [0.22, '#94a6c8'], [0.4, '#eccca4'], [0.5, '#f8dcac'], [0.57, '#fbe6bc'], [1, '#fbe6bc']], fog: '#f0d4b0',
    ridges: ['#b8a0a8', '#a8948e', '#9a8a68'], hemi: ['#fff0d8', '#6a5440', 1.4], key: ['#ffd8a0', 1.4], sun: [180, 700, 0.85], rays: { op: 0.08, dir: -0.6, spread: 1.0 },
    cloudLit: '#fff2e0', cloudShade: '#c8b0b8', stars: 0, air: 'gold', near: '#b09a6a',
    basilica: [720, 1085, 300, 0], colosseum: [160, 1095, 520], temples: [[440, 1100, 460]], pines: true, roofs: true,
    clouds: [[150, 470, 900, 9], [930, 440, 900, 10], [700, 600, 950, 6]] },
  city: { move: 'pan-r', sky: [[0, '#6a7aa0'], [0.24, '#a8a8b8'], [0.42, '#e0c8a8'], [0.52, '#f0d4a8'], [0.57, '#f4dcb4'], [1, '#f4dcb4']], fog: '#e8ccaa',
    ridges: ['#b8a8a8', '#a8988e', '#9a8a68'], hemi: ['#fff0dc', '#5a4a3a', 1.35], key: ['#ffe0b0', 1.3], sun: [900, 640, 0.6], rays: { op: 0.05, dir: 0.5, spread: 0.9 },
    cloudLit: '#fff4e4', cloudShade: '#b8aab8', stars: 0, air: 'dust', near: '#a8925e',
    aqueduct: [540, 1080, 320], colosseum: [800, 1095, 460], roofs: true, pines: true,
    clouds: [[160, 480, 900, 9], [900, 450, 900, 10]] },
  letter: { move: 'push', sky: [[0, '#22284a'], [0.24, '#4a4a74'], [0.42, '#9a7a90'], [0.52, '#e8ac88'], [0.57, '#f2c69c'], [1, '#f2c69c']], fog: '#b8968e',
    ridges: ['#7a6a84', '#645a70', '#4e5040'], hemi: ['#ffdcc8', '#3a3430', 1.2], key: ['#ffc090', 1.2], sun: [940, 920, 0.55], rays: { op: 0, dir: 0, spread: 0.5 },
    cloudLit: '#f0c4b0', cloudShade: '#6e6280', stars: 30, air: 'gold', near: '#8a7a5a',
    basilica: [760, 1085, 280, 1], temples: [[250, 1100, 480]], roofs: true, lit: 1, pines: true,
    clouds: [[120, 470, 900, 10], [960, 500, 900, 10]] },
  feast: { move: 'dolly', sky: [[0, '#1e2036'], [0.24, '#3e3a58'], [0.42, '#6e6478'], [0.52, '#a8928e'], [0.58, '#bca69a'], [1, '#bca69a']], fog: '#8a8090',
    ridges: ['#5a566a', '#4e4a5c', '#45443e'], hemi: ['#dcd4e8', '#2a2628', 1.1], key: ['#ffe0b8', 0.9], sun: null, breakAt: [600, 560],
    rays: { op: 0.16, dir: 0.1, spread: 0.8 }, swell: true, cloudLit: '#a8a0b8', cloudShade: '#3e3a56', stars: 0, air: 'dust', near: '#7a7258',
    palatine: [560, 1085, 260], pines: true, roofs: true,
    clouds: [[150, 440, 900, 11], [940, 460, 900, 11], [420, 590, 950, 8], [800, 600, 950, 8]] },
  death: { move: 'tilt-up', sky: [[0, '#0e1230'], [0.24, '#1e2450'], [0.42, '#3e3e6e'], [0.52, '#7a6a8a'], [0.58, '#9a849a'], [1, '#9a849a']], fog: '#5a5a78',
    ridges: ['#3e3e58', '#36364c', '#30302e'], hemi: ['#c8ccf0', '#1e1c26', 1.0], key: ['#ffe8c8', 0.8], sun: null, breakAt: [540, 520],
    rays: { op: 0.14, dir: 0, spread: 0.8, up: false }, swell: true, cloudLit: '#9a9ab8', cloudShade: '#2e2e4a', stars: 90, air: 'gold', near: '#5e5a48',
    basilica: [640, 1075, 420, 1], roofs: true, lit: 1, pines: true,
    clouds: [[150, 450, 900, 9], [940, 470, 900, 9]] },
  glory: { move: 'arc', sky: [[0, '#1a1c48'], [0.2, '#3a3270'], [0.36, '#8a5a86'], [0.47, '#e08a7a'], [0.53, '#f8c088'], [0.57, '#fcdca4'], [1, '#fcdca4']], fog: '#e0a088',
    ridges: ['#a07a98', '#806a8a', '#6a5a50'], hemi: ['#ffdcc4', '#3a3040', 1.25], key: ['#ffb880', 1.5], sun: [860, 1000, 0.9], rays: { op: 0.09, dir: -0.4, spread: 1.6, up: true },
    cloudLit: '#ffc8a8', cloudShade: '#8a6a98', stars: 70, air: 'gold', near: '#9a8458',
    basilica: [760, 1085, 330, 1], colosseum: [180, 1095, 560], roofs: true, lit: 1, pines: true },
};

/** roma(name, { base, ...overrides }): a set-up of late-antique Rome built on one of the modes above. */
export function roma(mode = 'hook', extra = null) {
  const P = extra ? { ...MODES[extra.base || 'hook'], ...extra } : MODES[mode], r = rng(mode.length * 19 + 5);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 170, 1500);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[mode] || {};
  const pos = { l: [-80, 25, -100], r: [80, 25, -100], back: [0, 22, -100], top: [0, 60, -30] }[VL.from] || [-60, 30, -80];
  const key = new THREE.DirectionalLight(VL.key || P.key[0], P.key[1]); key.position.set(...pos); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 23, 0.8, { el0: 0.26, el1: 0.62 }));
  let sunGlow = null;
  if (P.sun) { sunGlow = sprite(warm, 1500, P.sun[2] * 0.85); sunGlow.position.copy(atScreen(cam, P.sun[0], P.sun[1], 2500)); scene.add(sunGlow); }
  const rp = P.rays, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length }) : null;
  if (rays) scene.add(rays.group);
  let breakGlow = null;
  if (P.breakAt) { breakGlow = sprite(warm, 520, 0.25, true); breakGlow.position.copy(atScreen(cam, P.breakAt[0], P.breakAt[1], 1200)); scene.add(breakGlow); }
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(170 + k * 3 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  // the Alban and Sabine hills, the Campagna
  [[-1100, 70, 0], [-820, 44, 1], [-600, 20, 2]].forEach(([z, amp, i]) =>
    scene.add(ridge({ w: 3600, d: 220, z, y: -14, amp, color: mixc(P.ridges[i], P.fog, 0.22 - i * 0.05).getStyle(), seed: 13 + i * 4, freq: 0.55 + i * 0.25 })));
  scene.add(fields(2600, 1100, GL, -680, 11, CAMPAGNA));
  // the plain between the near ground and the Campagna (the city stands on it)
  const plain = new THREE.Mesh(new THREE.PlaneGeometry(2600, 260), lam(mixc('#a89a68', P.fog, 0.25))); plain.rotation.x = -Math.PI / 2; plain.position.set(0, GL - 0.05, -150); scene.add(plain);
  for (let k = 0; k < 40; k++) scene.add(olive3d(-420 + (k % 20) * 44 + (r() - 0.5) * 14, -520 - Math.floor(k / 20) * 60 - r() * 30, 9 + r() * 3, 80 + k, '#7a8a64', GL));
  for (let k = 0; k < 14; k++) scene.add(cypress3d(-360 + k * 52 + (r() - 0.5) * 16, -460 - r() * 40, 20 + r() * 6, '#2e4a32', GL));
  // the city: landmarks placed where the characters leave the frame open, roofs and pines around them
  const place = (obj, [sx, sy, d], s = 1, ry = 0) => { const p = atScreen(cam, sx, sy, d); obj.position.set(p.x, GL, p.z); obj.scale.setScalar(s * d / 250); obj.rotation.y = ry; scene.add(obj); return p; };
  const lit = P.lit || 0;
  if (P.roofs) for (let k = 0; k < 5; k++) scene.add(roofs3d(18, -260 + k * 20, 260 - k * 10, -150 - k * 70, { seed: 7 + k, y: GL, lit, s: 1 + k * 0.4 }));
  if (P.basilica) { const [sx, sy, d, l] = P.basilica; place(basilica3d({ lit: l }), [sx, sy, d], 0.95, -0.35); }
  if (P.colosseum) place(colosseum3d(), P.colosseum, 0.9, 0.2);
  (P.temples || []).forEach((t, k) => place(romanTemple3d({ ruined: false }), t, 0.9, 0.25 - k * 0.4));
  if (P.aqueduct) place(aqueduct3d(260, 16), P.aqueduct, 0.9, 0.12);
  if (P.palatine) {   // the Palatine hill with old temples and a ruined one on top
    const p = atScreen(cam, P.palatine[0], P.palatine[1], P.palatine[2]), s = P.palatine[2] / 250;
    scene.add(ridge({ w: 420 * s, d: 160 * s, x: p.x, z: p.z - 20 * s, y: GL - 2, amp: 30 * s, color: mixc('#8a8a5e', P.fog, 0.25).getStyle(), seed: 41, freq: 2.2 }));
    const t1 = romanTemple3d({ ruined: true }); t1.position.set(p.x - 40 * s, GL + 22 * s, p.z - 30 * s); t1.scale.setScalar(s * 0.9); t1.rotation.y = 0.3; scene.add(t1);
    const t2 = romanTemple3d(); t2.position.set(p.x + 34 * s, GL + 20 * s, p.z - 40 * s); t2.scale.setScalar(s * 0.8); t2.rotation.y = -0.4; scene.add(t2);
    for (const [t, e] of [[t1, 22], [t2, 20]]) {   // stone terraces under the temples, down to the plain (so nothing floats)
      const tb = box(17 * t.scale.x, (e + 2) * s, 26 * t.scale.x, lam(mixc('#b8a888', P.fog, 0.2))); tb.position.set(t.position.x, GL + (e * s - 2 * s) / 2, t.position.z); tb.rotation.y = t.rotation.y; scene.add(tb); }
  }
  if (P.pines) for (let k = 0; k < 16; k++) scene.add(stonePine3d(-170 + k * 22 + (r() - 0.5) * 10, -90 - r() * 120, 16 + r() * 6, 30 + k, { y: GL }));
  const mist = [[-240, -4, -420, 560, 46], [180, -5, -480, 640, 56], [540, -4, -400, 480, 46]].map(([x, y, z, w, h], k) => {
    const m = sprite(mistTex, 1, 0.42); m.scale.set(w, h, 1); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });
  // the near ground: dusty earth with sparse grass, a lit rim just behind the feet, a bank down to the city
  const nearLen = 48, z0 = 20, zFar = z0 - nearLen;
  const gt = groundTex(P.near, ['#c8ac78', '#8a7a4a', '#d8c090'], mode.length + 3, true); gt.wrapS = THREE.RepeatWrapping; gt.repeat.set(700 / 14, 1);
  const brow = new THREE.Mesh(new THREE.PlaneGeometry(700, nearLen, 70, 6), lam('#ffffff', { map: gt })); brow.rotation.x = -Math.PI / 2; brow.position.set(0, 0, z0 - nearLen / 2); scene.add(brow);
  const rim = new THREE.Mesh(new THREE.PlaneGeometry(700, 0.9), lam(mixc(P.near, '#fff0c0', 0.35), { emissive: mixc(P.near, '#fff0c0', 0.3), emissiveIntensity: 0.25 }));
  rim.rotation.x = -Math.PI / 2; rim.position.set(0, 0.02, zFar + 0.45); scene.add(rim);
  const bank = new THREE.Mesh(new THREE.PlaneGeometry(700, 12), lam(mixc(P.near, '#3a3020', 0.35))); bank.position.set(0, -6, zFar); scene.add(bank);
  const grassC = [mixc(P.near, '#3a4a1a', 0.4).getStyle(), mixc(P.near, '#7a8a40', 0.45).getStyle(), '#9a8a4a'];
  scene.add(tufts3d(200, { x: 9, z0: -20.5, z1: zFar + 1, h: [0.14, 0.26], colors: grassC, seed: 3 + mode.length }));
  const front = new THREE.Scene(); front.fog = scene.fog;
  front.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const fkey = new THREE.DirectionalLight(VL.key || P.key[0], P.key[1]); fkey.position.set(...pos); front.add(fkey);
  front.add(tufts3d(110, { x: 4.6, z0: -9, z1: -16.8, h: [0.07, 0.14], colors: grassC, seed: 11 + mode.length, blades: 4, r: 0.012 }));
  front.add(tufts3d(46, { x: 4.4, z0: -17.4, z1: -19.4, h: [0.08, 0.16], colors: grassC, seed: 21 + mode.length, blades: 4, r: 0.014 }));
  const air = P.air ? particles(P.air, { seed: mode.length * 5 + 3 }) : null;
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
      const k = P.swell ? Math.min(1, 0.2 + t * 0.11) : 1;
      if (rays) rays.update(t, k);
      if (breakGlow) breakGlow.material.opacity = 0.12 + 0.3 * k;
      if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
      clouds.forEach(([c, x, j]) => { c.position.x = x + t * (1.3 + (j % 3) * 0.5) * (j % 2 ? 1 : -1); });
      mist.forEach(([m, x, j]) => { m.position.x = x + t * (2 + j * 0.6) * (j % 2 ? -1 : 1); });
      if (air) air.update(t);
      return { ry, rz };
    } };
}

export const SETS = {
  rHook: { base: 'hook' }, rCity: { base: 'city' }, rLetter: { base: 'letter' }, rFeast: { base: 'feast' }, rDeath: { base: 'death' }, rGlory: { base: 'glory' },
};
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, v]) => [k, () => roma(k, v)]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
