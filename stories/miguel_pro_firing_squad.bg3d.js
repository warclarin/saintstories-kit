// three.js backgrounds for Bl. Miguel Pro: the firing squad (one story; browser module, build.mjs copies it to work/<slug>/bg3d.mjs).
// A new reusable set, mexico(mode): Mexico City in 1926-27. Two kinds of place:
//   court: the walled yard of the police headquarters (a high plastered wall with barred windows and a door, flat
//          rooftops beyond it, the twin bell towers and dome of the cathedral, the snowy volcanoes far off)
//   street: a colonial street (two-storey facades with balconies and arched doors, a sidewalk, cobbles)
//   plaza: the cathedral square, the cathedral front-on behind the characters (feast-day portrait)
// Modes (one per scene):
//   mHook   (push-fast)      court, cold dawn with a warm break of light (the firing squad)
//   mStreet (pan-r)          street at dusk, lit windows (secret Masses, 1926)
//   mNight  (push)           court at night, lit barred windows (arrest, the cell)
//   mPray   (tilt-up + rack) court, morning, light from above (he blesses the soldiers and prays)
//   mCross  (dolly)          court, light breaking and swelling behind him (arms like a cross)
//   mFuneral (pull)          street, soft gold day (the photos, the funeral crowd)
//   mGlory  (arc-r)          plaza at sunset, the cathedral (feast day)
// Deterministic: everything is drawn from timeline time. cam3d: one camera for the 3D and the SVG cards (makeRig).
// Exported for later reels: mexico(mode, extra), cathedral3d(), facades3d(), courtWall3d(), volcanoes3d(), flatRoofs3d().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, sprite, atScreen, makeRig, stars } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const A = await import('./agnes.bg3d.js');
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
const { cumulus, godRays } = A;
const { groundTex, tufts3d, particles } = E;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,220,160,.75)'], [0.55, 'rgba(255,180,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const hazeTex = glowTex([[0, 'rgba(240,226,210,.7)'], [0.45, 'rgba(236,222,206,.3)'], [1, 'rgba(236,222,206,0)']]);

/** A plastered wall texture: mottled plaster, a darker base band, cracks, barred windows and (optionally) a door. */
function plasterTex(base, seed, { win = '#3a3034', lit = 0, n = 5, door = true } = {}) {
  const r = rng(seed);
  return canvasTex(1024, 128, (g, w, h) => {
    g.fillStyle = col(base).getStyle(); g.fillRect(0, 0, w, h);
    for (let k = 0; k < 90; k++) { const x = r() * w, y = r() * h, rr = 8 + r() * 30; g.fillStyle = r() < 0.55 ? 'rgba(60,40,30,.07)' : 'rgba(255,245,225,.08)'; g.beginPath(); g.ellipse(x, y, rr * 1.6, rr * 0.7, 0, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = 'rgba(50,34,30,.22)'; g.fillRect(0, h * 0.8, w, h * 0.2);
    g.fillStyle = 'rgba(255,240,220,.18)'; g.fillRect(0, h * 0.79, w, 2);
    g.strokeStyle = 'rgba(60,40,34,.25)'; g.lineWidth = 1.2;
    for (let k = 0; k < 10; k++) { let x = r() * w, y = r() * h * 0.6; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 4; j++) { x += (r() - 0.5) * 14; y += 6 + r() * 8; g.lineTo(x, y); } g.stroke(); }
    for (let k = 0; k < n; k++) {
      const x = (k + 0.5) * w / n - 18, y = 26, ww = 36, hh = 46;
      g.fillStyle = 'rgba(255,245,230,.35)'; g.fillRect(x - 4, y - 4, ww + 8, hh + 8);
      g.fillStyle = lit && r() < 0.8 ? `rgba(255,${200 + Math.floor(r() * 30)},120,${0.75 + 0.2 * lit})` : col(win).getStyle(); g.fillRect(x, y, ww, hh);
      g.fillStyle = 'rgba(30,24,26,.9)'; for (let b = 1; b < 5; b++) g.fillRect(x + b * ww / 5 - 1.5, y, 3, hh);
      g.fillRect(x, y + hh * 0.5 - 1, ww, 2.5);
    }
    if (door) { const x = w * 0.5 + 60; g.fillStyle = '#5a3e2e'; g.fillRect(x, 50, 64, 78); g.fillStyle = 'rgba(30,20,18,.5)'; g.fillRect(x + 31, 50, 2, 78);
      for (let k = 0; k < 4; k++) { g.fillStyle = 'rgba(30,20,18,.35)'; g.fillRect(x + 6, 56 + k * 18, 52, 2); } }
  });
}
/** The high plastered yard wall (base at y 0, faces +z), with a tiled coping. */
export function courtWall3d({ w = 70, h = 6.5, plaster = '#d8c4a4', lit = 0, seed = 4 } = {}) {
  const g = new THREE.Group(), t = plasterTex(plaster, seed, { lit, n: 6 });
  const wall = box(w, h, 1.2, [lam(plaster), lam(plaster), lam(mixc(plaster, '#fff4e0', 0.2)), lam(plaster), lam('#ffffff', { map: t }), lam(plaster)]);
  wall.position.y = h / 2; g.add(wall);
  const cap = box(w + 0.4, 0.35, 1.8, lam(mixc(plaster, '#5a4a44', 0.35))); cap.position.y = h + 0.17; g.add(cap);
  return g;
}
/** Flat-roofed city houses with parapets and a few water tanks / chimneys (n houses from x0 to x1 around depth z). */
export function flatRoofs3d(n, x0, x1, z, { seed = 3, lit = 0, walls = ['#e2c8a4', '#d8a888', '#e8d6b4', '#c8a898', '#d4b890'], hmin = 6, hvar = 8 } = {}) {
  const g = new THREE.Group(), r = rng(seed), win = glowMat('#ffd98a');
  for (let k = 0; k < n; k++) {
    const w = 8 + r() * 9, hh = hmin + r() * hvar, d = 8 + r() * 6, x = x0 + (x1 - x0) * (k + r() * 0.5) / n, zz = z - r() * 40;
    const c = col(walls[Math.floor(r() * walls.length)]);
    const b = box(w, hh, d, lam(c)); b.position.set(x, hh / 2, zz); g.add(b);
    const p = box(w + 0.3, 0.6, d + 0.3, lam(mixc(c.getStyle(), '#6a5048', 0.3))); p.position.set(x, hh + 0.3, zz); g.add(p);
    if (r() < 0.35) { const tk = box(1.6, 1.4, 1.6, lam('#8a8078')); tk.position.set(x + (r() - 0.5) * w * 0.6, hh + 1.3, zz); g.add(tk); }
    if (lit) for (let j = 0; j < 2; j++) if (r() < 0.6 * lit) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.6), win); wn.position.set(x + (j - 0.5) * w * 0.4, hh * (0.35 + r() * 0.35), zz + d / 2 + 0.03); g.add(wn); }
  }
  return g;
}
/** Two-storey colonial facades in a row along x (base y 0, facing +z): pastel walls, balconies, arched doors, a cornice. */
export function facades3d(x0, x1, { seed = 5, lit = 0, walls = ['#e8b88a', '#d8846a', '#e8d4a0', '#c8a0b0', '#a8b8a0', '#e0c0a0'] } = {}) {
  const g = new THREE.Group(), r = rng(seed), win = lit ? glowMat('#ffd38a') : lam('#3e3236'), dk = lam('#4a3428'), iron = lam('#2a2426');
  for (let x = x0; x < x1;) {
    const w = 7 + r() * 5, hh = 8 + r() * 3, c = walls[Math.floor(r() * walls.length)];
    const b = box(w, hh, 4, lam(c)); b.position.set(x + w / 2, hh / 2, 0); g.add(b);
    const cor = box(w + 0.2, 0.5, 4.5, lam(mixc(c, '#fff4e0', 0.35))); cor.position.set(x + w / 2, hh + 0.25, 0.1); g.add(cor);
    const band = box(w + 0.05, 0.3, 4.2, lam(mixc(c, '#fff4e0', 0.3))); band.position.set(x + w / 2, hh * 0.48, 0.05); g.add(band);
    const nW = w > 10 ? 3 : 2;
    for (let j = 0; j < nW; j++) {
      const wx = x + w * (j + 0.5) / nW;
      const up = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.2), lit && r() < 0.5 ? glowMat('#ffd38a') : lam('#3e3236')); up.position.set(wx, hh * 0.72, 2.03); g.add(up);
      const bal = box(1.9, 0.18, 0.7, iron); bal.position.set(wx, hh * 0.58, 2.35); g.add(bal);
      const rail = box(1.9, 0.7, 0.06, iron); rail.position.set(wx, hh * 0.58 + 0.42, 2.68); g.add(rail);
      if (j === Math.floor(nW / 2)) { const dr = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 3.2), dk); dr.position.set(wx, 1.6, 2.03); g.add(dr);
        const ar = new THREE.Mesh(new THREE.CircleGeometry(0.9, 12, 0, Math.PI), dk); ar.position.set(wx, 3.2, 2.03); g.add(ar); }
      else { const lw = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.6), win); lw.position.set(wx, 2.4, 2.03); g.add(lw); }
    }
    x += w + 0.05;
  }
  return g;
}
/** The Metropolitan Cathedral of Mexico City as a simple shape: a stone facade, two bell towers with bell-shaped caps and
 * lanterns, a central dome behind. Faces +z; about 44 wide and 40 high. */
export function cathedral3d({ stone = '#c8bca8', lit = 0 } = {}) {
  const g = new THREE.Group(), sm = lam(stone), sh = lam(mixc(stone, '#5a5048', 0.3)), lt = lam(mixc(stone, '#fff6e0', 0.2)), win = lit ? glowMat('#ffd38a') : lam('#4a4048');
  const f = box(26, 20, 10, sm); f.position.set(0, 10, 0); g.add(f);
  const up = box(12, 6, 8, lt); up.position.set(0, 23, 0.5); g.add(up);
  const ped = new THREE.Mesh(new THREE.ConeGeometry(4.6, 3, 3), lt); ped.rotation.z = 0; ped.rotation.y = Math.PI / 6; ped.scale.set(1.4, 1, 0.4); ped.position.set(0, 27.4, 2); g.add(ped);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(4, 7), win); door.position.set(0, 3.5, 5.03); g.add(door);
  const da = new THREE.Mesh(new THREE.CircleGeometry(2, 14, 0, Math.PI), win); da.position.set(0, 7, 5.03); g.add(da);
  for (const x of [-7.5, 7.5]) { const d = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 5.2), win); d.position.set(x, 2.6, 5.03); g.add(d); }
  const rose = new THREE.Mesh(new THREE.CircleGeometry(1.6, 16), win); rose.position.set(0, 14, 5.03); g.add(rose);
  for (const sd of [-1, 1]) {
    const t = box(9, 27, 9, sm); t.position.set(sd * 17, 13.5, 0); g.add(t);
    const bel = box(7, 7, 7, lt); bel.position.set(sd * 17, 30.5, 0); g.add(bel);
    for (const fz of [3.52]) { const o = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 4.4), lam('#3a3038')); o.position.set(sd * 17, 30.5, fz); g.add(o); }
    const capm = new THREE.Mesh(new THREE.SphereGeometry(3.6, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), sh); capm.scale.set(1, 1.6, 1); capm.position.set(sd * 17, 34, 0); g.add(capm);
    const lan = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 2.2, 8), lt); lan.position.set(sd * 17, 40.7, 0); g.add(lan);
    const cr = box(0.3, 2, 0.3, sh); cr.position.set(sd * 17, 42.8, 0); g.add(cr); const cb = box(1.2, 0.3, 0.3, sh); cb.position.set(sd * 17, 43.2, 0); g.add(cb);
    const w2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 3.6), win); w2.position.set(sd * 17, 18, 4.53); g.add(w2);
  }
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 5.4, 5, 20), sm); drum.position.set(0, 26, -16); g.add(drum);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(5.6, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), sh); dome.scale.y = 1.25; dome.position.set(0, 28.5, -16); g.add(dome);
  const dl = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 2.4, 8), lt); dl.position.set(0, 36.6, -16); g.add(dl);
  if (lit) { const gl = sprite(warm, 60, 0.3 * lit, true); gl.position.set(0, 10, 8); g.add(gl); }
  return g;
}
/** Popocatépetl (a snow-capped cone) and Iztaccíhuatl (a long snowy ridge) far off, at depth z. */
export function volcanoes3d(x, z, { rock = '#8a8aa8', snow = '#f4f2f8', s = 1 } = {}) {
  const g = new THREE.Group();
  const popo = new THREE.Mesh(new THREE.CylinderGeometry(34 * s, 360 * s, 260 * s, 40, 1, true), lam(rock)); popo.position.set(x, 130 * s - 12, z); g.add(popo);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(37 * s, 140 * s, 86 * s, 40, 1, true), lam(snow, { emissive: col(snow), emissiveIntensity: 0.25 })); cap.position.set(x, 260 * s - 43 * s - 12 + 0.5, z); cap.scale.set(1.04, 1, 1.04); g.add(cap);
  const top = new THREE.Mesh(new THREE.CircleGeometry(37 * s * 1.04, 40), lam(snow)); top.rotation.x = -Math.PI / 2; top.position.set(x, 260 * s - 12 + 0.5, z); g.add(top);
  const izta = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), lam(rock)); izta.scale.set(520 * s, 170 * s, 160 * s); izta.position.set(x - 700 * s, -12, z + 80); g.add(izta);
  const isn = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 8, 0, Math.PI * 2, 0, Math.PI / 5), lam(snow, { emissive: col(snow), emissiveIntensity: 0.2 })); isn.scale.set(560 * s, 175 * s, 170 * s); isn.position.set(x - 700 * s, -12, z + 80); g.add(isn);
  return g;
}

const MODES = {
  hook: { kind: 'court', sky: [[0, '#1e2448'], [0.22, '#3e4670'], [0.4, '#8a7a92'], [0.5, '#e0a080'], [0.57, '#f4c494'], [1, '#f4c494']], fog: '#b09098',
    plaster: '#cdb698', ground: '#a8906e', hemi: ['#f8d0b8', '#2a2430', 1.2], key: ['#ffc090', 1.3, [-80, 25, -100]], breakAt: [300, 560], rays: { op: 0.09, dir: 0.5, spread: 1.0 },
    cloudLit: '#f0b49a', cloudShade: '#4a4a6e', stars: 0, lit: 0, air: 'dust', move: 'push-fast', cathedral: [780, 300, 170], volc: [170, 1500],
    clouds: [[140, 470, 900, 10], [940, 450, 900, 10], [660, 610, 950, 7]] },
  street: { kind: 'street', sky: [[0, '#141a3a'], [0.24, '#2e2e5a'], [0.42, '#7a5a7e'], [0.52, '#d8866e'], [0.57, '#eaa07a'], [1, '#eaa07a']], fog: '#8a6a7a',
    ground: '#7a6a62', hemi: ['#f0c0b0', '#2a2030', 1.05], key: ['#ffb880', 1.2, [80, 20, -100]], breakAt: null, rays: { op: 0 },
    cloudLit: '#d8908a', cloudShade: '#3a3458', stars: 40, lit: 1, air: null, move: 'pan-r', cathedral: [860, 360, 190], volc: null,
    clouds: [[150, 470, 900, 9], [930, 440, 900, 9]] },
  night: { kind: 'court', sky: [[0, '#0a0c20'], [0.26, '#161a38'], [0.44, '#2a2e52'], [0.54, '#3e4066'], [0.58, '#4a4a6e'], [1, '#4a4a6e']], fog: '#2e3050',
    plaster: '#8a8094', ground: '#4a4652', hemi: ['#9aa4d0', '#141420', 0.9], key: ['#c8d0ff', 0.8, [80, 40, -60]], moon: [880, 600], rays: { op: 0 },
    cloudLit: '#5a5a80', cloudShade: '#1e1e36', stars: 90, lit: 1, air: null, move: 'push', cathedral: [800, 320, 170], volc: null,
    clouds: [[160, 520, 900, 9], [700, 600, 950, 7]] },
  pray: { kind: 'court', sky: [[0, '#4a5a8a'], [0.24, '#8a98b8'], [0.42, '#dcc8b0'], [0.52, '#f4dcb8'], [0.57, '#f8e4c4'], [1, '#f8e4c4']], fog: '#dcc8b4',
    plaster: '#dcc8a8', ground: '#b49c78', hemi: ['#fff0dc', '#5a4a40', 1.35], key: ['#fff0c8', 1.4, [0, 60, -30]], breakAt: [540, 520], rays: { op: 0.13, dir: 0, spread: 0.8 }, swell: true,
    cloudLit: '#fff4e4', cloudShade: '#a8a4b8', stars: 0, lit: 0, air: 'dust', move: 'tilt-up', cathedral: [820, 300, 170], volc: [200, 1500],
    clouds: [[150, 460, 900, 10], [940, 470, 900, 10], [420, 600, 950, 7]] },
  cross: { kind: 'court', sky: [[0, '#3a3a6a'], [0.24, '#7a7aa0'], [0.42, '#e8c4a8'], [0.52, '#fce0b8'], [0.57, '#fff0d0'], [1, '#fff0d0']], fog: '#e8ccb4',
    plaster: '#d4bea0', ground: '#ac9472', hemi: ['#fff0dc', '#4a3a40', 1.3], key: ['#ffe8c8', 1.5, [0, 40, -100]], breakAt: [480, 560], rays: { op: 0.17, dir: 0, spread: 1.3, up: true }, swell: true,
    cloudLit: '#fff0dc', cloudShade: '#9a94b0', stars: 0, lit: 0, air: 'gold', move: 'dolly', cathedral: [850, 300, 180], volc: [190, 1500],
    clouds: [[150, 460, 900, 11], [950, 450, 900, 11], [700, 620, 950, 7]] },
  funeral: { kind: 'street', sky: [[0, '#5a6a94'], [0.24, '#9aa4bc'], [0.42, '#e4cfb0'], [0.52, '#f4dcb4'], [0.57, '#f8e4c0'], [1, '#f8e4c0']], fog: '#e0ccb0',
    ground: '#9a8a78', hemi: ['#fff0dc', '#5a4a44', 1.35], key: ['#ffd8b0', 1.35, [-80, 20, -100]], breakAt: [260, 620], rays: { op: 0.07, dir: 0.5, spread: 1.1 },
    cloudLit: '#fff2e2', cloudShade: '#b0a8b8', stars: 0, lit: 0, air: 'gold', move: 'pull', cathedral: [850, 330, 200], volc: [200, 1500],
    clouds: [[150, 470, 900, 9], [950, 450, 900, 10], [600, 610, 950, 6]] },
  glory: { kind: 'plaza', sky: [[0, '#141842'], [0.2, '#2e2c62'], [0.36, '#6a4a7e'], [0.47, '#d8827a'], [0.53, '#f8be86'], [0.57, '#fcd8a0'], [1, '#fcd8a0']], fog: '#d89a84',
    ground: '#8a7468', hemi: ['#ffd8c0', '#3a3440', 1.2], key: ['#ffb880', 1.5, [80, 12, -100]], sun: [880, 1000, 0.9], rays: { op: 0.08, dir: -0.4, spread: 1.6, up: true },
    cloudLit: '#ffc4a4', cloudShade: '#8a6a98', stars: 60, lit: 0.8, air: 'gold', move: 'arc', cathedral: [720, 0, 150], cathScale: 0.85, volc: [120, 1500],
    clouds: [[160, 470, 900, 9], [960, 520, 900, 8]] },
};

/** mexico(mode) or mexico(name, { base, ...overrides }). */
export function mexico(mode = 'hook', extra = null) {
  const P = extra ? { ...MODES[extra.base || 'hook'], ...extra } : MODES[mode], r = rng(mode.length * 19 + 3);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 140, 1700);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[mode] || {};
  const LK = { color: VL.key || P.key[0], int: P.key[1], pos: { l: [-80, 25, -100], r: [80, 25, -100], back: [0, 22, -100], top: [0, 60, -30] }[VL.from] || P.key[2] };
  const key = new THREE.DirectionalLight(LK.color, LK.int); key.position.set(...LK.pos); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 17, 0.8, { el0: 0.24, el1: 0.62 }));
  let sunGlow = null;
  if (P.sun) { sunGlow = sprite(warm, 1500, P.sun[2] * 0.85); sunGlow.position.copy(atScreen(cam, P.sun[0], P.sun[1], 2500)); scene.add(sunGlow); }
  if (P.moon) { const mg = sprite(glowTex([[0, 'rgba(240,244,255,1)'], [0.12, 'rgba(230,236,255,.9)'], [0.2, 'rgba(200,210,255,.25)'], [1, 'rgba(200,210,255,0)']]), 420, 0.9);
    mg.position.copy(atScreen(cam, P.moon[0], P.moon[1], 2400)); scene.add(mg); }
  const rp = P.rays, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length + 5 }) : null;
  if (rays) scene.add(rays.group);
  let breakGlow = null;
  if (P.breakAt) { breakGlow = sprite(warm, 560, 0.25, true); breakGlow.position.copy(atScreen(cam, P.breakAt[0], P.breakAt[1], 1200)); scene.add(breakGlow); }
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(70 + k * 5 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  // the volcanoes far off (aerial perspective: rock mixed with the fog)
  if (P.volc) { const p = atScreen(cam, P.volc[0], 1100, P.volc[1]); scene.add(volcanoes3d(p.x, -P.volc[1], { rock: mixc('#7a7898', P.fog, 0.55).getStyle(), snow: mixc('#f6f4fa', P.fog, 0.25).getStyle() })); }
  // the city beyond: flat rooftops, and the cathedral where the frame is open
  const wallsC = ['#e2c8a4', '#d8a888', '#e8d6b4', '#c8a898', '#d4b890'];
  scene.add(flatRoofs3d(26, -170, 170, P.kind === 'plaza' ? -230 : -120, { seed: 7, lit: P.lit, walls: wallsC.map((c) => mixc(c, P.fog, 0.35).getStyle()) }));
  if (P.kind !== 'plaza') scene.add(flatRoofs3d(18, -110, 110, -70, { seed: 9, lit: P.lit, walls: wallsC.map((c) => mixc(c, P.fog, 0.18).getStyle()), hmin: 5, hvar: 6 }));
  if (P.cathedral) {
    const [sx, sy, d] = P.cathedral, p = atScreen(cam, sx, 1100, d);
    const ca = cathedral3d({ stone: mixc('#c8bca8', P.fog, P.kind === 'plaza' ? 0.12 : 0.28).getStyle(), lit: P.lit });
    ca.position.set(p.x, P.kind === 'plaza' ? -0.5 : 0, -d); ca.scale.setScalar(P.cathScale ?? (P.kind === 'plaza' ? 1.15 : 0.6)); scene.add(ca);
    void sy;
  }
  // the near place: the yard wall, or a street of facades, or the open plaza
  let backZ = -46;
  if (P.kind === 'court') { const cw = courtWall3d({ plaster: P.plaster, lit: P.lit, seed: 4 + mode.length }); cw.position.z = -44; scene.add(cw); backZ = -44; }
  else if (P.kind === 'street') {
    const fa = facades3d(-60, 60, { seed: 5, lit: P.lit }); fa.position.z = -50; scene.add(fa);
    const curb = box(140, 0.35, 3, lam(mixc(P.ground, '#e8dcc8', 0.35))); curb.position.set(0, 0.17, -46.5); scene.add(curb); backZ = -48;
  } else backZ = -140;
  // ground: packed earth / cobbles / plaza paving
  const nearLen = -backZ + 20, z0 = 20;
  const gt = groundTex(P.ground, [mixc(P.ground, '#3a2a22', 0.35).getStyle(), mixc(P.ground, '#fff0d8', 0.3).getStyle(), mixc(P.ground, '#6a5a4a', 0.2).getStyle()], mode.length + 4, false);
  gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.repeat.set(700 / 14, nearLen / 14);
  const gr = new THREE.Mesh(new THREE.PlaneGeometry(700, nearLen, 70, 6), lam('#ffffff', { map: gt })); gr.rotation.x = -Math.PI / 2; gr.position.set(0, 0, z0 - nearLen / 2); scene.add(gr);
  for (let k = 0; k < 16; k++) {   // loose stones in the yard
    const s = 0.12 + r() * 0.3, rk = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), lam(mixc(P.ground, '#5a4a40', r() * 0.4)));
    rk.scale.y = 0.6; rk.position.set((r() * 2 - 1) * 12, s * 0.3, -22 - r() * (-backZ - 26)); scene.add(rk);
  }
  const weedC = [mixc(P.ground, '#4a5a2a', 0.5).getStyle(), mixc(P.ground, '#6a7a3a', 0.45).getStyle(), mixc(P.ground, '#8a8a4a', 0.4).getStyle()];
  if (P.kind === 'court') scene.add(tufts3d(40, { x: 14, z0: backZ + 2.5, z1: backZ + 1, h: [0.25, 0.5], colors: weedC, seed: 8 + mode.length }));
  // the foreground (front3d canvas over the SVG): a few low weeds and pebbles at the feet
  const front = new THREE.Scene(); front.fog = scene.fog;
  front.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const fkey = new THREE.DirectionalLight(LK.color, LK.int); fkey.position.set(...LK.pos); front.add(fkey);
  front.add(tufts3d(26, { x: 4.6, z0: -10, z1: -17, h: [0.06, 0.12], colors: weedC, seed: 11 + mode.length, blades: 4, r: 0.012 }));
  for (let k = 0; k < 10; k++) { const s = 0.04 + r() * 0.07, rk = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), new THREE.MeshBasicMaterial({ color: mixc(P.ground, '#3a2a24', 0.3 + r() * 0.2) }));
    rk.scale.y = 0.55; rk.position.set((r() * 2 - 1) * 4.2, s * 0.3, -10 - r() * 8); front.add(rk); }
  const haze = sprite(hazeTex, 1, P.kind === 'court' ? 0.18 : 0.25); haze.scale.set(420, 30, 1); haze.position.set(0, 6, -150); scene.add(haze);
  const air = P.air ? particles(P.air, { seed: mode.length * 7 + 2 }) : null;
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
      if (breakGlow) breakGlow.material.opacity = 0.12 + 0.3 * k;
      if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
      clouds.forEach(([c, x, j]) => { c.position.x = x + t * 1.2 * (1 + (j % 3) * 0.4) * (j % 2 ? 1 : -1); });
      haze.position.x = Math.sin(t * 0.2) * 6;
      if (air) air.update(t);
      return { ry, rz };
    } };
}

export const SETS = {
  mHook: () => mexico('mHook', { base: 'hook' }),
  mStreet: () => mexico('mStreet', { base: 'street' }),
  mNight: () => mexico('mNight', { base: 'night' }),
  mPray: () => mexico('mPray', { base: 'pray' }),
  mCross: () => mexico('mCross', { base: 'cross' }),
  mFuneral: () => mexico('mFuneral', { base: 'funeral' }),
  mGlory: () => mexico('mGlory', { base: 'glory' }),
};
export const BUILD = SETS;

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
