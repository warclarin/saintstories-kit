// three.js backgrounds for St. Conrad of Constance: the spider in the chalice (browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). Two worlds, every scene in 3D, cam3d (makeRig): the camera travels along each scene's cam.path, so
// every set-up holds a still camera (no sway, no roll).
//   cathedral(mode): inside a Romanesque cathedral (Constance, 10th century): a stone-tiled floor that meets the characters' feet,
//     round-arched arcades on thick columns converging to a gold apse with a cross, a timber ceiling, clerestory windows with
//     light shafts, candles and dust in the air. Modes: 'hook' (golden Easter light), 'altar' (bright Easter morning),
//     'choice' (dim and tense, candlelight), 'later' (dusk: blue windows, lamps).
//   lake set-ups of anglia() from edmund_last_stand.bg3d.js (imported as a library) with the Alps added far behind the water
//     (Lake Constance) and the Romanesque cathedral town (abbey3d) on the shore.
//     cLake (golden afternoon: the bishop by the lake), cCanon (gold: canonized), cGlory (sunset, lit windows: feast day).
// Deterministic: everything is drawn from timeline time. Exported for later reels: cathedral(mode), lakeAlps(name, opts).
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, sprite, atScreen, makeRig } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
const { anglia, particles } = E;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,220,160,.75)'], [0.55, 'rgba(255,180,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const flameT = glowTex([[0, 'rgba(255,240,200,1)'], [0.3, 'rgba(255,190,110,.7)'], [1, 'rgba(255,150,80,0)']]);
/** Stone floor slabs in two tones with soft wear (repeats). */
function slabTex(a, b, seed = 3) {
  const r = rng(seed);
  return canvasTex(512, 512, (g, w, h) => {
    const n = 4, s = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      g.fillStyle = mixc(a, b, (i + j) % 2 ? 0.55 + r() * 0.2 : r() * 0.25).getStyle(); g.fillRect(i * s, j * s, s, s);
      g.fillStyle = 'rgba(255,240,210,.06)'; g.beginPath(); g.ellipse(i * s + s * r(), j * s + s * r(), s * 0.4, s * 0.15, r() * 3, 0, Math.PI * 2); g.fill();
    }
    g.strokeStyle = 'rgba(40,24,16,.35)'; g.lineWidth = 4;
    for (let k = 0; k <= n; k++) { g.beginPath(); g.moveTo(k * s, 0); g.lineTo(k * s, h); g.stroke(); g.beginPath(); g.moveTo(0, k * s); g.lineTo(w, k * s); g.stroke(); }
  });
}
/** Ashlar wall: rows of stone blocks with mortar lines (repeats). */
function ashlarTex(c, seed = 5) {
  const r = rng(seed);
  return canvasTex(256, 256, (g, w, h) => {
    const rows = 6, rh = h / rows;
    for (let k = 0; k < rows; k++) { const off = k % 2 ? 0.5 : 0;
      for (let i = -1; i < 4; i++) { g.fillStyle = mixc(c, k % 2 ? '#fff4e0' : '#2a1c1a', 0.06 + r() * 0.1).getStyle(); g.fillRect((i + off) * w / 3 + 2, k * rh + 2, w / 3 - 4, rh - 4); } }
  });
}
const CM = {
  hook:   { wall: '#b89878', col: '#d8c0a0', floorA: '#c8ac86', floorB: '#8a6a50', ceil: '#3e2a22', fog: '#5a4034', bg: [[0, '#2a1a18'], [1, '#6a4a3a']],
    hemi: ['#ffdcb0', '#3a2a24', 1.25], key: '#ffd8a0', win: '#ffd9a0', shaft: 0.13, apse: 1, air: 'dust' },
  altar:  { wall: '#c4a888', col: '#e0ccac', floorA: '#d4ba94', floorB: '#9a7a5c', ceil: '#4a3428', fog: '#7a5c48', bg: [[0, '#3a2a22'], [1, '#8a6a52']],
    hemi: ['#fff0d8', '#4a3a30', 1.45], key: '#fff0c8', win: '#fff2d0', shaft: 0.15, apse: 0.9, air: 'dust' },
  choice: { wall: '#8a7060', col: '#b09a80', floorA: '#a08868', floorB: '#6a5040', ceil: '#2a1c18', fog: '#3a2a26', bg: [[0, '#140c0e'], [1, '#3a2620']],
    hemi: ['#ffcc98', '#1e1414', 0.95], key: '#ffb878', win: '#e8b888', shaft: 0.06, apse: 0.6, air: 'dust' },
  later:  { wall: '#7a6a70', col: '#a89a9a', floorA: '#9a8a80', floorB: '#5e5054', ceil: '#221a22', fog: '#2a2634', bg: [[0, '#10101e'], [1, '#2e2a3e']],
    hemi: ['#c8c8f0', '#1a1418', 0.95], key: '#ffd0a0', win: '#8aa0d8', shaft: 0.05, apse: 0.7, air: 'gold' },
};
/** Inside a Romanesque cathedral: cathedral('hook' | 'altar' | 'choice' | 'later'). The floor is at y = 0, so a character card
 * 20 units away stands on it like on the outdoor ground (feet art y ~1345 at depth 1). */
export function cathedral(mode = 'hook', extra = null) {   // extra (2026-11-26, Miraculous Medal): { base, ...overrides of CM }
  const C = extra ? { ...CM[extra.base || 'hook'], ...extra } : CM[mode], r = rng(mode.length * 11 + 3);
  const scene = new THREE.Scene();
  scene.background = skyTex(C.bg);
  scene.fog = new THREE.Fog(C.fog, 40, 160);
  scene.add(new THREE.HemisphereLight(C.hemi[0], C.hemi[1], C.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[window.__conradMode || ''] || {};
  const key = new THREE.DirectionalLight(VL.key || C.key, 1.4);
  key.position.set(...({ l: [-30, 30, 10], r: [30, 30, 10], back: [0, 25, -60], top: [0, 60, -10] }[VL.from] || [-30, 30, 10])); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  const L = 120, z0 = 16, zc = z0 - L / 2, back = z0 - L + 6, NX = 5.4;
  // floor, ceiling, outer walls
  const ft = slabTex(C.floorA, C.floorB, mode.length); ft.wrapS = ft.wrapT = THREE.RepeatWrapping; ft.repeat.set(4, L / 6);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(26, L), lam('#ffffff', { map: ft })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, zc); scene.add(floor);
  const wt = ashlarTex(C.wall, 7); wt.wrapS = wt.wrapT = THREE.RepeatWrapping; wt.repeat.set(L / 5, 4);
  const wallM = lam('#ffffff', { map: wt });
  for (const sd of [-1, 1]) { const w = box(1, 18, L, wallM); w.position.set(sd * 12.5, 9, zc); scene.add(w); }
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(26, L), lam(C.ceil, { side: THREE.DoubleSide })); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, 17, zc); scene.add(ceil);
  for (let z = z0; z > back; z -= 5) { const bm = box(26, 0.7, 0.9, lam(mixc(C.ceil, '#000000', 0.25))); bm.position.set(0, 16.5, z); scene.add(bm); }
  // the nave arcades: thick columns with cushion capitals and round arches, a clerestory wall with small round-headed windows
  const colM = lam(C.col), capM = lam(mixc(C.col, '#fff4e0', 0.2)), archM = lam(mixc(C.col, '#2a1c1a', 0.08));
  const winM = glowMat(C.win, 0.95), shaftM = new THREE.MeshBasicMaterial({ color: '#ffe8b8', transparent: true, opacity: C.shaft, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
  const SP = 6, zs = []; for (let z = -26; z > back + 8; z -= SP) zs.push(z);
  for (const sd of [-1, 1]) {
    zs.forEach((z) => {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 7, 14), colM); c.position.set(sd * NX, 3.5, z); scene.add(c);
      const base = box(1.7, 0.5, 1.7, capM); base.position.set(sd * NX, 0.25, z); scene.add(base);
      const cap = box(1.7, 0.7, 1.7, capM); cap.position.set(sd * NX, 7.3, z); scene.add(cap);
      // round arch from this column to the next one
      const a = new THREE.Mesh(new THREE.TorusGeometry(SP / 2, 0.42, 8, 20, Math.PI), archM); a.rotation.y = Math.PI / 2; a.position.set(sd * NX, 7.6, z - SP / 2); scene.add(a);
    });
    const cw = box(0.8, 9, L, wallM); cw.position.set(sd * NX, 12.5, zc); scene.add(cw);
    zs.forEach((z) => {
      const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.4), winM); wn.position.set(sd * (NX - 0.42), 12.6, z - SP / 2); wn.rotation.y = sd * Math.PI / 2 * -1; scene.add(wn);
      const wa = new THREE.Mesh(new THREE.CircleGeometry(0.55, 12, 0, Math.PI), winM); wa.position.set(sd * (NX - 0.42), 13.8, z - SP / 2); wa.rotation.y = wn.rotation.y; scene.add(wa);
      // the dark aisle behind the arches with a glowing aisle window
      const aw = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3), glowMat(mixc(C.win, C.fog, 0.35).getStyle(), 0.85)); aw.position.set(sd * 12, 4.2, z - SP / 2); aw.rotation.y = -sd * Math.PI / 2; scene.add(aw);
    });
  }
  // light shafts from the left clerestory
  for (let k = 0; k < zs.length; k += 2) { const sh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 22), shaftM); sh.position.set(-1.2, 7, zs[k] - SP / 2); sh.rotation.set(0, Math.PI / 2, -0.62); scene.add(sh); }
  // the apse: a half-cylinder with a gold semi-dome glow, a triumphal arch, the high altar with candles and a cross
  const apseZ = back + 2;
  const apseWall = new THREE.Mesh(new THREE.CylinderGeometry(NX, NX, 11, 24, 1, true, Math.PI / 2, Math.PI), lam(mixc('#c89a4a', C.fog, 0.2), { side: THREE.BackSide, emissive: '#6a4a18', emissiveIntensity: 0.5 * C.apse }));
  apseWall.position.set(0, 5.5, apseZ); scene.add(apseWall);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(NX, 24, 12, Math.PI / 2, Math.PI, 0, Math.PI / 2), lam('#e0b860', { side: THREE.BackSide, emissive: '#a87a28', emissiveIntensity: 0.6 * C.apse }));
  dome.position.set(0, 11, apseZ); scene.add(dome);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(NX + 0.2, 0.7, 8, 28, Math.PI), archM); arch.position.set(0, 11, apseZ + 0.3); scene.add(arch);
  const ag = sprite(warm, 24, 0.75 * C.apse, true); ag.position.set(0, 8.5, apseZ + 1); scene.add(ag);
  const crossM = lam('#d8a840', { emissive: '#8a6018', emissiveIntensity: 0.7 });
  const cv = box(0.45, 4.6, 0.3, crossM); cv.position.set(0, 10.2, apseZ - 3); scene.add(cv);
  const ch = box(2.6, 0.45, 0.3, crossM); ch.position.set(0, 11.2, apseZ - 3); scene.add(ch);
  const alt = box(5, 1.6, 2.2, lam('#9a7a5a')); alt.position.set(0, 0.8, apseZ + 1.6); scene.add(alt);
  const cloth = box(5.3, 0.25, 2.4, lam('#fbf6ea')); cloth.position.set(0, 1.65, apseZ + 1.6); scene.add(cloth);
  const flames = [];
  const candle = (x, y, z, h = 1.1, s = 1.6) => {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, h, 8), lam('#f6f0e2')); c.position.set(x, y + h / 2, z); scene.add(c);
    const fl = sprite(flameT, s, 0.95, true); fl.position.set(x, y + h + 0.15, z); scene.add(fl); flames.push(fl);
  };
  [-1.9, -1.1, 1.1, 1.9].forEach((x) => candle(x, 1.78, apseZ + 1.6));
  // tall candle stands down the nave (between the columns)
  zs.slice(0, 5).forEach((z, k) => { for (const sd of [-1, 1]) {
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 2.6, 6), lam('#6a5030')); st.position.set(sd * (NX - 1.4), 1.3, z - 1); scene.add(st);
    candle(sd * (NX - 1.4), 2.6, z - 1, 0.7, 2.2 + ((C.bigFlames ?? (mode === 'later' || mode === 'choice')) ? 1.2 : 0)); } });
  // hanging lamps at dusk
  if (C.lamps ?? mode === 'later') for (const z of [-30, -42, -54]) { const lp = sprite(warm, 6, 0.6, true); lp.position.set(0, 9, z); scene.add(lp); flames.push(lp); }
  // dust in the shafts
  window.__conradAirSeed = (window.__conradAirSeed || 0) + 1;
  const air = C.air ? particles(C.air, { seed: mode.length * 5 + 1, n: 200 }) : null;
  if (air) scene.add(air.points);
  return { scene, cam, update(t) {
    flames.forEach((fl, k) => { fl.material.opacity = 0.78 + 0.17 * Math.sin(t * 7.3 + k * 1.9); });
    ag.material.opacity = 0.75 * C.apse * (0.92 + 0.08 * Math.sin(t * 0.9));
    if (air) air.update(t);
    return {};
  } };
}

/** anglia() set-up as Lake Constance: the river widened into the lake, the Alps far behind, the cathedral town on the shore. */
export function lakeAlps(name, opts) {
  const v = anglia(name, opts), r = rng(name.length + 9);
  // the lake: a broad sheet of water from just behind the near ground to the far shore
  const water = new THREE.Mesh(new THREE.PlaneGeometry(3400, 520), lam(mixc(opts.lake || '#5a7a9a', opts.fog || '#c8b8a8', 0.25)));
  water.rotation.x = -Math.PI / 2; water.position.set(0, -2.4, -330); v.scene.add(water);
  const glint = sprite(warm, 1, 0.35, true); glint.scale.set(900, 30, 1); glint.position.set(opts.glintX ?? 200, -2.3, -420); v.scene.add(glint);
  // the Alps: two blue ranges with pale peaks, far behind the lake
  [[-1600, 300, '#8a94b8', 3], [-1350, 190, '#7a86a8', 8]].forEach(([z, amp, c, s]) =>
    v.scene.add(ridge({ w: 5200, d: 260, z, y: -20, amp, color: mixc(c, opts.fog || '#c8b8a8', 0.35).getStyle(), seed: s, freq: 1.4 })));
  void r;
  return v;
}

const LAKE = { ships: [], smoke: [], lake: '#5a7a9a' };
export const SETS = {
  cHook:   () => cathedral('hook'),
  cAltar:  () => cathedral('altar'),
  cChoice: () => cathedral('choice'),
  cLater:  () => cathedral('later'),
  cLake:   () => lakeAlps('cLake', { base: 'abbey', move: 'push', ...LAKE, abbey: [760, 1112, 300, 0], air: 'gold',
    sky: [[0, '#4a78b0'], [0.22, '#7aa0cc'], [0.4, '#c4d0dc'], [0.5, '#f4e0bc'], [0.57, '#f8e8c8'], [1, '#f8e8c8']], fog: '#d8d0c4',
    hemi: ['#fff4e4', '#4a4a3a', 1.35], sun: [200, 700, 0.6], rays: { op: 0.05, dir: -0.5, spread: 1.0 }, cloudLit: '#ffffff', cloudShade: '#9aa4c0', near: '#6e8a44', glintX: -150 }),
  cCanon:  () => lakeAlps('cCanon', { base: 'abbey', move: 'push', ...LAKE, abbey: [820, 1110, 300, 0], lake: '#6a7a9a', glintX: 250 }),
  cGlory:  () => lakeAlps('cGlory', { base: 'glory', move: 'push', ...LAKE, abbey: [800, 1092, 360, 1], lake: '#4a5a8a', fog: '#d89a84', glintX: 300 }),
};
// each cathedral set-up reads its light from the story's LIGHT table under its own name
export const BUILD = Object.fromEntries(Object.entries(SETS).map(([k, fn]) => [k, () => { window.__conradMode = k; return fn(); }]));

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
