// three.js backgrounds for St. Clement I: "the anchor" (one story; browser module, build.mjs copies it to work/<slug>/bg3d.mjs).
// A new reusable set, taurica(mode): the Crimean coast by the Black Sea seen from a cliff top (the near ground ends at a
// rocky brow, the sea lies below it to the horizon), with pale limestone headlands, the walls of Chersonesus, a stone
// quarry cut into the plateau, Roman ships and the open sea. Scene 1 uses Rome from gelasius.bg3d.js (roma()).
//   cHook   (push-fast) stormy dusk over the sea, a break of sunset light (portrait with the anchor)
//   cRome   (drift-r)   Rome at dusk, lit windows (the letter)                       [roma(), base 'letter']
//   cExile  (pan-l)     grey-gold morning: the quarry, Chersonesus on the far headland
//   cSpring (dolly)     hot hazy noon in the quarry; light breaks through and swells (the spring)
//   cAnchor (tilt-up + rack) night storm at sea, light breaking from above (the anchor)
//   cRelics (pull)      calm dawn, the sea pulled back, a ship far off (Cyril finds the relics)
//   cGlory  (arc-r)     golden sunset sea with sailing ships (feast day; patron of sailors)
// Deterministic: everything is drawn from timeline time. cam3d: one camera for the 3D and the SVG cards (makeRig).
// Exported for later reels: taurica(mode, extra), quarry3d(), cliffs3d().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, ridge, sprite, atScreen, makeRig, stars } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const A = await import('./agnes.bg3d.js');
const E = await import('./edmund.bg3d.js');
const N = await import('./andrew.bg3d.js');
const R = await import('./roma.bg3d.js');
window.BG3D_LIB = prevLib;
const { cumulus, godRays } = A;
const { groundTex, tufts3d, particles } = E;
const { boat3d, town3d } = N;
const { roma } = R;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,220,160,.75)'], [0.55, 'rgba(255,180,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const mistTex = glowTex([[0, 'rgba(240,236,232,.8)'], [0.45, 'rgba(236,230,226,.35)'], [1, 'rgba(236,230,226,0)']]);
function streakTex(seed, color, n = 120) {
  const r = rng(seed);
  const t = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512);
    for (let k = 0; k < n; k++) { const x = r() * 256, y = r() * 512, w = 10 + r() * 46; g.fillStyle = `rgba(${color},${0.12 + r() * 0.32})`; g.fillRect(x, y, w, 2 + r() * 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}

/** A stone quarry cut into the plateau: stepped limestone walls with tool marks and loose blocks. Base at y = 0, faces +z. */
export function quarry3d({ w = 26, h = 11, stone = '#e2d4b8', seed = 3 } = {}) {
  const g = new THREE.Group(), r = rng(seed), sm = lam(stone), dk = lam(mixc(stone, '#5a4a3a', 0.3)), lt = lam(mixc(stone, '#fff6e0', 0.25)), md = lam(mixc(stone, '#8a7a62', 0.25));
  const steps = 4;
  for (let k = 0; k < steps; k++) {   // terraces stepping back and up, broken into uneven cut blocks
    const hh = h * (k + 1) / steps, ww = w - k * 1.6, n = 3 + (k % 2);
    for (let j = 0; j < n; j++) { const bw = ww / n, bh = hh * (0.85 + r() * 0.3), b = box(bw * (0.96 - r() * 0.08), bh, 4, [sm, lt, md][(j + k) % 3]);
      b.position.set(-ww / 2 + bw * (j + 0.5), bh / 2, -k * 3.6 + (r() - 0.5) * 0.6); g.add(b); }
    for (let j = 0; j < 7; j++) { const m = box(0.12, hh * (0.4 + r() * 0.5), 0.05, dk); m.position.set(-w / 2 + 1 + r() * (w - 2 - k * 1.6), hh * 0.45, -k * 3.6 + 2.03); g.add(m); }
  }
  for (let k = 0; k < 9; k++) { const s = 0.8 + r() * 1.4, bl = box(s * 1.6, s, s, r() < 0.5 ? sm : lt); bl.position.set((r() - 0.5) * w * 1.1, s / 2, 3 + r() * 6); bl.rotation.y = (r() - 0.5) * 0.6; g.add(bl); }
  return g;
}
/** Pale limestone sea cliffs: a long ridge whose sea-facing side drops steeply. */
export function cliffs3d({ x = -400, z = -600, w = 1100, amp = 46, color = '#d8c8ac', seed = 7 } = {}) {
  return ridge({ w, d: 160, x, z, y: -14, amp, color, seed, freq: 0.8 });
}

const SEA = -9;   // the sea surface, below the cliff-top ground the characters stand on
const DRY = ['#8a8a54', '#a09a5e', '#b0a468'];
const MODES = {
  hook: { sky: [[0, '#1a1e3e'], [0.2, '#34385e'], [0.38, '#6a5a78'], [0.5, '#d08a6e'], [0.56, '#f0b484'], [1, '#f0b484']], fog: '#8a7486',
    water: '#2e3a58', streak: '255,200,170', streakOp: 0.4, whitecaps: 0.35, near: '#8a7e5e', stone: '#cbbba0',
    hemi: ['#f8c8b0', '#2a2430', 1.2], key: ['#ffb880', 1.3, [80, 20, -100]], sun: [800, 1000, 0.85], rays: { op: 0.07, dir: -0.4, spread: 1.0 },
    cloudLit: '#e8a890', cloudShade: '#4a4466', stars: 0, cliffs: true, town: null, ships: [[300, 1, -260, 0.9]], air: null, move: 'push-fast',
    clouds: [[140, 470, 900, 11], [930, 450, 900, 12], [620, 600, 950, 8], [260, 640, 900, 7]] },
  exile: { sky: [[0, '#5a6a8a'], [0.24, '#9aa4b4'], [0.42, '#dccaa8'], [0.52, '#f0d8b0'], [0.57, '#f4e0bc'], [1, '#f4e0bc']], fog: '#d8c8aa',
    water: '#4a7088', streak: '255,245,225', streakOp: 0.35, whitecaps: 0.1, near: '#a8986a', stone: '#e2d4b8',
    hemi: ['#fff0dc', '#5a4a3a', 1.35], key: ['#ffe0b0', 1.3, [-60, 40, -80]], sun: [240, 660, 0.6], rays: { op: 0.05, dir: 0.5, spread: 0.9 },
    cloudLit: '#fff2e4', cloudShade: '#a8a4b4', stars: 0, cliffs: true, town: { x0: 30, x1: 120, z: -430, n: 16, lit: 0 }, quarry: [[-15, -62, 0.4, 16, 7]],
    ships: [[620, 1, -330, 0.7]], air: 'dust', move: 'pan-l',
    clouds: [[160, 480, 900, 9], [900, 450, 900, 10], [560, 610, 950, 6]] },
  spring: { sky: [[0, '#6a7ea4'], [0.24, '#b0b8c4'], [0.42, '#ecdcb8'], [0.52, '#f8e6bc'], [0.57, '#fbecc8'], [1, '#fbecc8']], fog: '#ecdcb8',
    water: '#5a8098', streak: '255,250,235', streakOp: 0.3, whitecaps: 0.05, near: '#b4a270', stone: '#eadcc0',
    hemi: ['#fff6e0', '#6a5a40', 1.45], key: ['#fff0c8', 1.5, [0, 60, -40]], sun: null, breakAt: [640, 560], rays: { op: 0.15, dir: 0.15, spread: 0.8 }, swell: true,
    cloudLit: '#fff8ea', cloudShade: '#c0b8b8', stars: 0, cliffs: true, town: null, quarry: [[-14, -58, 0.45, 15, 7], [17, -66, -0.45, 15, 8]], ships: [], air: 'dust', move: 'dolly',
    clouds: [[150, 450, 900, 10], [940, 470, 900, 10], [420, 600, 950, 7]] },
  anchor: { sky: [[0, '#0a0c22'], [0.24, '#181c3e'], [0.42, '#2e3258'], [0.52, '#5a5a7a'], [0.58, '#76708a'], [1, '#76708a']], fog: '#3e4058',
    water: '#1a2236', streak: '200,210,240', streakOp: 0.5, whitecaps: 0.55, near: '#5a5644', stone: '#8a8270',
    hemi: ['#c0c8e8', '#14141e', 1.0], key: ['#ffe8c8', 0.8, [0, 60, -30]], sun: null, breakAt: [540, 520], rays: { op: 0.15, dir: 0, spread: 0.8 }, swell: true,
    cloudLit: '#7a7a9a', cloudShade: '#22223a', stars: 0, cliffs: true, town: null, ships: [[760, 1, -160, 0.9, true]], air: null, storm: true, move: 'tilt-up',
    clouds: [[150, 440, 900, 12], [940, 450, 900, 12], [400, 580, 950, 9], [780, 600, 950, 9]] },
  relics: { sky: [[0, '#4a5a8a'], [0.24, '#9a9ab8'], [0.42, '#e8c0a8'], [0.52, '#f8d8b4'], [0.57, '#fbe4c4'], [1, '#fbe4c4']], fog: '#ecccb4',
    water: '#6a86a0', streak: '255,236,215', streakOp: 0.4, whitecaps: 0, near: '#c8b48a', stone: '#e8dac0', beach: true,
    hemi: ['#fff0e0', '#5a4a44', 1.4], key: ['#ffd8b0', 1.4, [-80, 15, -100]], sun: [260, 1010, 0.9], rays: { op: 0.06, dir: -0.5, spread: 1.2 },
    cloudLit: '#ffe6d4', cloudShade: '#b0a0b8', stars: 0, cliffs: true, town: null, ships: [[760, 1, -300, 0.8]], air: 'gold', move: 'pull',
    clouds: [[150, 470, 900, 9], [960, 450, 900, 10], [640, 610, 900, 6]] },
  glory: { sky: [[0, '#141842'], [0.2, '#2e2c62'], [0.36, '#6a4a7e'], [0.47, '#d8827a'], [0.53, '#f8be86'], [0.57, '#fcd8a0'], [1, '#fcd8a0']], fog: '#d89a84',
    water: '#5a4a6e', streak: '255,215,160', streakOp: 0.55, whitecaps: 0, near: '#8a7a58', stone: '#d8c4a4',
    hemi: ['#ffd8c0', '#3a3440', 1.2], key: ['#ffb880', 1.6, [80, 12, -100]], sun: [800, 1010, 1], rays: { op: 0.08, dir: -0.4, spread: 1.6, up: true },
    cloudLit: '#ffc4a4', cloudShade: '#8a6a98', stars: 70, cliffs: true, town: null, ships: [[260, 1, -240, 0.8], [620, 1, -380, 0.7], [940, 0.9, -200, 0.6]], air: 'gold', move: 'arc' },
};

/** taurica(mode) or taurica(name, { base, ...overrides }). */
export function taurica(mode = 'exile', extra = null) {
  const P = extra ? { ...MODES[extra.base || 'exile'], ...extra } : MODES[mode], r = rng(mode.length * 17 + 5);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 170, 1600);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[mode] || {};
  const LK = { color: VL.key || P.key[0], int: P.key[1], pos: { l: [-80, 25, -100], r: [80, 25, -100], back: [0, 22, -100], top: [0, 60, -30] }[VL.from] || P.key[2] };
  const key = new THREE.DirectionalLight(LK.color, LK.int); key.position.set(...LK.pos); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  if (P.stars) scene.add(stars(P.stars, 13, 0.8, { el0: 0.26, el1: 0.62 }));
  let sunGlow = null;
  if (P.sun) { sunGlow = sprite(warm, 1500, P.sun[2] * 0.85); sunGlow.position.copy(atScreen(cam, P.sun[0], P.sun[1], 2500)); scene.add(sunGlow); }
  const rp = P.rays, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length + 3 }) : null;
  if (rays) scene.add(rays.group);
  let breakGlow = null;
  if (P.breakAt) { breakGlow = sprite(warm, 520, 0.25, true); breakGlow.position.copy(atScreen(cam, P.breakAt[0], P.breakAt[1], 1200)); scene.add(breakGlow); }
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(60 + k * 5 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900 * (P.storm ? 1.25 : 1)); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  // the Black Sea to the horizon, with drifting light streaks and whitecaps
  const water = new THREE.Mesh(new THREE.PlaneGeometry(5000, 2600), lam(mixc(P.water, P.fog, 0.15))); water.rotation.x = -Math.PI / 2; water.position.set(0, SEA, -1300); scene.add(water);
  const st = streakTex(mode.length + 2, P.streak); st.repeat.set(10, 18);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: P.streakOp, depthWrite: false }));
  sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, SEA + 0.05, -700); scene.add(sheen);
  let caps = null;
  if (P.whitecaps) { const ct = streakTex(mode.length + 9, '255,255,255', 70); ct.repeat.set(14, 22);
    caps = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), new THREE.MeshBasicMaterial({ map: ct, transparent: true, opacity: P.whitecaps, depthWrite: false }));
    caps.rotation.x = -Math.PI / 2; caps.position.set(0, SEA + 0.08, -700); scene.add(caps); }
  // headlands: pale limestone cliffs on the left, a lower far coast on the right
  if (P.cliffs) {
    scene.add(cliffs3d({ x: -620, z: -900, w: 1300, amp: 60, color: mixc(P.stone, P.fog, 0.35).getStyle(), seed: 7 }));
    scene.add(cliffs3d({ x: -460, z: -520, w: 700, amp: 30, color: mixc(P.stone, P.fog, 0.15).getStyle(), seed: 9 }));
    scene.add(cliffs3d({ x: 760, z: -1200, w: 1400, amp: 26, color: mixc(P.stone, P.fog, 0.5).getStyle(), seed: 12 }));
  }
  // Chersonesus: a walled town on the far headland
  if (P.town) { const T = town3d(P.town.x0, P.town.x1, P.town.z, P.town.n, 31, { walls: ['#efe4d0', '#e4d2b0', '#d8c098', '#f4ecdc'], lit: P.town.lit, wall: '#cbb894' }); T.group.position.y = -2; scene.add(T.group); }
  // ships on the sea
  const ships = (P.ships || []).map(([sx, s, z, sc, moored], k) => {
    const sh = boat3d({ s: sc * s * 3.2, hull: k % 2 ? '#6a4228' : '#5a3a26', sail: mode === 'glory' ? '#f4d4b0' : '#efe2c4', sailOn: !moored });
    const p = atScreen(cam, sx, 1200, -z); sh.position.set(p.x, SEA, z); sh.rotation.y = k % 2 ? 0.4 : -0.3; scene.add(sh); return [sh, sh.position.x, k];
  });
  // the quarry: stepped stone walls on the plateau, behind the characters
  const quarryOn = !!P.quarry;
  (P.quarry || []).forEach(([x, z, ry, w = 20, h = 8], k) => { const q = quarry3d({ w, h, stone: P.stone, seed: 5 + k }); q.position.set(x, 0, z); q.rotation.y = ry; scene.add(q); });
  const mist = [[-260, SEA + 4, -420, 560, 40], [200, SEA + 3, -520, 680, 44], [560, SEA + 4, -440, 480, 40]].map(([x, y, z, w, h], k) => {
    const m = sprite(mistTex, 1, P.storm ? 0.25 : 0.45); m.scale.set(w, h, 1); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });
  // the near ground: a rocky cliff top (or the quarry floor) ending in a lit brow above the sea
  const nearLen = quarryOn ? 120 : P.beach ? 40 : 46, z0 = 20, zFar = z0 - nearLen;
  const gt = groundTex(P.near, ['#8a7a5a', '#c8b48a', '#6a6048'], mode.length + 4, !P.beach);
  gt.wrapS = THREE.RepeatWrapping; gt.repeat.set(700 / 14, 1);
  const brow = new THREE.Mesh(new THREE.PlaneGeometry(700, nearLen, 70, 6), lam('#ffffff', { map: gt })); brow.rotation.x = -Math.PI / 2; brow.position.set(0, 0, z0 - nearLen / 2); scene.add(brow);
  if (!quarryOn) {
    const rim = new THREE.Mesh(new THREE.PlaneGeometry(700, 0.9), lam(mixc(P.near, '#fff0c0', 0.35), { emissive: mixc(P.near, '#fff0c0', 0.3), emissiveIntensity: 0.25 }));
    rim.rotation.x = -Math.PI / 2; rim.position.set(0, 0.02, zFar + 0.45); scene.add(rim);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(700, 12), lam(mixc(P.stone, '#3a3028', 0.45))); face.position.set(0, -6, zFar); scene.add(face);
  }
  for (let k = 0; k < 14; k++) {   // a few rocks on the cliff top
    const s = 0.3 + r() * 0.7, rk = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), lam(mixc(P.stone, '#6a5a48', r() * 0.4)));
    rk.scale.y = 0.6; rk.position.set((r() * 2 - 1) * 14, s * 0.3, -22 - r() * (nearLen - 30)); scene.add(rk);
  }
  const grassC = P.beach ? ['#b0a070', '#9a8a5e', '#c4b07a'] : [mixc(P.near, '#2a2a10', 0.3).getStyle(), mixc(P.near, DRY[1], 0.4).getStyle(), mixc(P.near, DRY[2], 0.4).getStyle()];
  scene.add(tufts3d(P.beach ? 80 : 200, { x: 9, z0: -20.5, z1: zFar + 1, h: [0.14, 0.26], colors: grassC, seed: 3 + mode.length }));
  // the foreground (front3d canvas over the SVG): low dry grass around the feet
  const front = new THREE.Scene(); front.fog = scene.fog;
  front.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const fkey = new THREE.DirectionalLight(LK.color, LK.int); fkey.position.set(...LK.pos); front.add(fkey);
  front.add(tufts3d(P.beach ? 60 : 140, { x: 4.6, z0: -9, z1: -16.8, h: [0.08, 0.15], colors: grassC, seed: 11 + mode.length, blades: 4, r: 0.012 }));
  front.add(tufts3d(P.beach ? 20 : 50, { x: 4.4, z0: -17.4, z1: -19.4, h: [0.09, 0.16], colors: grassC, seed: 21 + mode.length, blades: 4, r: 0.014 }));
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
      clouds.forEach(([c, x, j]) => { c.position.x = x + t * (P.storm ? 3.2 : 1.3) * (1 + (j % 3) * 0.4) * (j % 2 ? 1 : -1); });
      mist.forEach(([m, x, j]) => { m.position.x = x + t * (2 + j * 0.6) * (j % 2 ? -1 : 1); });
      ships.forEach(([sh, x, j]) => { sh.position.x = x + t * 0.8 * (j % 2 ? -1 : 1); sh.position.y = SEA + (P.storm ? 0.5 : 0.15) * Math.sin(t * 1.3 + j * 2); sh.rotation.z = (P.storm ? 0.07 : 0.025) * Math.sin(t * 1.1 + j); });
      st.offset.y = -t * (P.storm ? 0.06 : 0.02); st.offset.x = Math.sin(t * 0.5) * 0.02;
      if (caps) { caps.material.map.offset.y = -t * (P.storm ? 0.09 : 0.03); caps.material.opacity = P.whitecaps * (0.75 + 0.25 * Math.sin(t * 2.1)); }
      if (air) air.update(t);
      return { ry, rz };
    } };
}

export const SETS = {
  cHook: () => taurica('cHook', { base: 'hook' }),
  cRome: () => roma('cRome', { base: 'letter', move: 'drift' }),
  cExile: () => taurica('cExile', { base: 'exile' }),
  cSpring: () => taurica('cSpring', { base: 'spring' }),
  cAnchor: () => taurica('cAnchor', { base: 'anchor' }),
  cRelics: () => taurica('cRelics', { base: 'relics' }),
  cGlory: () => taurica('cGlory', { base: 'glory' }),
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
