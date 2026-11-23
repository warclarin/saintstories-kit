// three.js backgrounds for St. Théophane Vénard: singing in the cage (one story; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). A new reusable set, tonkin(mode): northern Vietnam (Tonkin) around 1860, plus two French places.
// Kinds of place:
//   court:  the yard of the Hanoi citadel: a brick rampart with crenels and a gate tower with a two-tier roof, the
//           mandarin's pavilion (red columns, curved hip roofs), the octagonal Flag Tower beyond, palms and bamboo
//   pond:   the same yard with a lotus pond behind the cage (dusk)
//   field:  the execution ground by the paddies: rice fields under water, dikes, bamboo clumps, palms, thatched huts,
//           karst hills far off, the citadel and the Flag Tower on the horizon
//   france: a Poitou hillside (green ridges, a patchwork of fields, oaks, a village church with a slate spire)
//   carmel: the brick Carmel of Lisieux with its chapel, in golden light
// Modes (one per scene):
//   tHook   (push-fast)      court at night: moon, stars, lanterns on the rampart (the cage)
//   tFrance (pan-r)          france, a bright day (the boy and the goat)
//   tCourt  (push)           court, morning (the trial before the mandarin)
//   tCourt2 (dolly)          court, a break of light swelling behind him (he kisses the cross)
//   tPond   (drift-l)        pond at dusk, lanterns lit (nine weeks in the cage)
//   tField  (tilt-up + rack) field, early morning light from above (February 2, 1861)
//   tCarmel (pull)           carmel, late golden afternoon (St. Thérèse)
//   tGlory  (arc-r)          field at sunset, first stars, the Flag Tower and a village church (feast day)
// Deterministic: everything is drawn from timeline time. cam3d: one camera for the 3D and the SVG cards (makeRig).
// Exported for later reels: tonkin(mode, extra), flagTower3d(), pavilion3d(), citadelWall3d(), gate3d(), palm3d(),
// bamboo3d(), hut3d(), vnChurch3d(), frenchChurch3d(), carmel3d(), brickTex().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, sprite, atScreen, makeRig, stars, ridge } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const A = await import('./agnes.bg3d.js');
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
const { cumulus, godRays, fields } = A;
const { groundTex, tufts3d, particles, oak3d } = E;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 4000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,220,160,.75)'], [0.55, 'rgba(255,180,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const redGlow = glowTex([[0, 'rgba(255,236,200,1)'], [0.18, 'rgba(255,150,110,.8)'], [0.5, 'rgba(230,80,70,.25)'], [1, 'rgba(230,80,70,0)']]);
const hazeTex = glowTex([[0, 'rgba(240,226,210,.7)'], [0.45, 'rgba(236,222,206,.3)'], [1, 'rgba(236,222,206,0)']]);

/** A brick texture (rows of bricks with mortar and soft weathering). */
export function brickTex(base, seed = 1, { rows = 16, cols = 24 } = {}) {
  const r = rng(seed);
  return canvasTex(512, 256, (g, w, h) => {
    g.fillStyle = col(base).multiplyScalar(0.7).getStyle(); g.fillRect(0, 0, w, h);
    const bh = h / rows, bw = w / cols;
    for (let j = 0; j < rows; j++) for (let i = -1; i < cols + 1; i++) {
      const x = i * bw + (j % 2 ? bw / 2 : 0), c = col(base).lerp(col(r() < 0.5 ? '#3a2420' : '#f0d8b8'), r() * 0.22);
      g.fillStyle = c.getStyle(); g.fillRect(x + 1.5, j * bh + 1.5, bw - 3, bh - 3);
    }
    for (let k = 0; k < 40; k++) { g.fillStyle = r() < 0.6 ? 'rgba(40,30,30,.12)' : 'rgba(80,100,60,.12)'; g.beginPath(); g.ellipse(r() * w, h * (0.5 + r() * 0.5), 20 + r() * 50, 6 + r() * 14, 0, 0, Math.PI * 2); g.fill(); }
  });
}
/** A curved hip roof (four slopes) of footprint w x d and height h, with upturned corner tips; base at y 0. */
function hipRoof(w, d, h, c, { tips = true } = {}) {
  const g = new THREE.Group(), m = lam(c);
  const rf = new THREE.Mesh(new THREE.ConeGeometry(Math.SQRT1_2, 1, 4, 1), m); rf.rotation.y = Math.PI / 4; rf.scale.set(w, h, d); rf.position.y = h / 2; g.add(rf);
  const eave = box(w * 0.98, 0.18, d * 0.98, lam(mixc(c, '#1a1418', 0.35))); eave.position.y = 0.05; g.add(eave);
  if (tips) for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const tp = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.4, 5), m);
    tp.position.set(sx * w / 2, 0.45, sz * d / 2); tp.rotation.set(sz * 0.9, 0, -sx * 0.9); g.add(tp);
  }
  return g;
}
/** The mandarin's pavilion: a stone platform, red lacquered columns, dark wooden screens and two tiers of curved roofs. */
export function pavilion3d({ w = 14, d = 9, h = 4.6, wood = '#9a2e26', roof = '#4a4038', stone = '#b8aa94', lit = 0 } = {}) {
  const g = new THREE.Group(), wm = lam(wood);
  const pl = box(w + 2, 0.9, d + 2, lam(stone)); pl.position.y = 0.45; g.add(pl);
  const st = box(4, 0.45, 1.4, lam(mixc(stone, '#fff4e0', 0.2))); st.position.set(0, 0.22, d / 2 + 1.6); g.add(st);
  for (let i = 0; i <= 4; i++) for (const sz of [-1, 1]) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, h, 10), wm); c.position.set(-w / 2 + (w * i) / 4, 0.9 + h / 2, sz * d / 2); g.add(c);
  }
  const back = box(w, h, 0.3, lam('#3a2a26')); back.position.set(0, 0.9 + h / 2, -d / 2 + 0.6); g.add(back);
  const win = lit ? glowMat('#ffd38a') : lam('#5a3a2e');
  for (let i = 0; i < 3; i++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(w / 4.2, h * 0.7), win); p.position.set(-w / 3 + (w * i) / 3, 0.9 + h * 0.48, -d / 2 + 0.77); g.add(p); }
  const beam = box(w + 0.4, 0.5, d + 0.4, lam(mixc(wood, '#2a1a1a', 0.3))); beam.position.y = 0.9 + h + 0.25; g.add(beam);
  const r1 = hipRoof(w + 3.4, d + 3, 2.4, roof); r1.position.y = 0.9 + h + 0.5; g.add(r1);
  const up = box(w * 0.5, 1.4, d * 0.5, wm); up.position.y = 0.9 + h + 2.2; g.add(up);
  const r2 = hipRoof(w * 0.62 + 1.6, d * 0.62 + 1.4, 1.9, roof); r2.position.y = 0.9 + h + 2.9; g.add(r2);
  const ridgeB = box(w * 0.3, 0.3, 0.3, lam(mixc(roof, '#e8c46a', 0.4))); ridgeB.position.y = 0.9 + h + 4.6; g.add(ridgeB);
  if (lit) { const gl = sprite(warm, 26, 0.35 * lit, true); gl.position.set(0, 3, d / 2 + 1); g.add(gl); }
  return g;
}
/** The brick rampart of the citadel (base y 0, faces +z) with crenels on top. */
export function citadelWall3d({ w = 160, h = 7, brick = '#a86a4a', seed = 3 } = {}) {
  const g = new THREE.Group(), t = brickTex(brick, seed); t.wrapS = THREE.RepeatWrapping; t.repeat.set(w / 20, 1);
  const bm = lam(brick), wall = box(w, h, 2.4, [bm, bm, lam(mixc(brick, '#fff4e0', 0.15)), bm, lam('#ffffff', { map: t }), bm]);
  wall.position.y = h / 2; g.add(wall);
  const cm = lam(mixc(brick, '#3a2420', 0.15));
  for (let x = -w / 2 + 1; x < w / 2; x += 2.6) { const c = box(1.4, 0.9, 0.8, cm); c.position.set(x, h + 0.45, 0.8); g.add(c); }
  return g;
}
/** A citadel gate: a thick masonry block with an arched passage and a two-tier roofed watch pavilion on top. */
export function gate3d({ brick = '#a86a4a', roof = '#4a4038', wood = '#9a2e26', lit = 0 } = {}) {
  const g = new THREE.Group(), t = brickTex(brick, 9, { rows: 12, cols: 10 });
  const bm = lam(brick), blk = box(18, 9, 7, [bm, bm, bm, bm, lam('#ffffff', { map: t }), bm]); blk.position.y = 4.5; g.add(blk);
  const dk = lam('#1e1418'), door = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.4), dk); door.position.set(0, 2.2, 3.53); g.add(door);
  const ar = new THREE.Mesh(new THREE.CircleGeometry(2.1, 16, 0, Math.PI), dk); ar.position.set(0, 4.4, 3.53); g.add(ar);
  const pv = pavilion3d({ w: 9, d: 5, h: 2.6, wood, roof, stone: mixc(brick, '#d8c8b0', 0.5).getStyle(), lit }); pv.position.y = 9; g.add(pv);
  return g;
}
/** The Flag Tower of Hanoi (1812): three square brick terraces, an octagonal tower, a lantern room and a yellow flag. */
export function flagTower3d({ brick = '#b87a5a', flag = '#e8c03a', lit = 0 } = {}) {
  const g = new THREE.Group(), bm = lam(brick), lt = lam(mixc(brick, '#fff4e0', 0.2));
  [[18, 3.4], [13, 3.4], [9, 3.4]].forEach(([s, h], k) => { const b = box(s, h, s, k % 2 ? lt : bm); b.position.y = k * 3.4 + h / 2; g.add(b); });
  const tw = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.7, 18, 8), bm); tw.position.y = 10.2 + 9; g.add(tw);
  const lr = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 2.6, 8), lt); lr.position.y = 29.5; g.add(lr);
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + Math.PI / 8, wn = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.5), lit ? glowMat('#ffd38a') : lam('#3a2a2a'));
    wn.position.set(Math.sin(a) * 3.12, 29.5, Math.cos(a) * 3.12); wn.rotation.y = a; g.add(wn); }
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 3.4, 1.2, 8), bm); cap.position.y = 31.4; g.add(cap);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 9, 6), lam('#5a4a3a')); pole.position.y = 36.4; g.add(pole);
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.8, 8, 1), lam(flag, { side: THREE.DoubleSide, emissive: col(flag), emissiveIntensity: 0.15 }));
  fl.position.set(2.3, 39.4, 0); g.add(fl); g.userData.flag = fl;
  return g;
}
/** A coconut palm: a gently leaning trunk and drooping fronds. */
export function palm3d(x, z, h, seed = 1, { trunk = '#7a6248', leaf = '#3e6e36', y = 0 } = {}) {
  const g = new THREE.Group(), r = rng(seed), lean = (r() - 0.5) * 0.5, tm = lam(trunk);
  let px = 0, py = 0;
  for (let k = 0; k < 5; k++) { const s = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.028, h * 0.036, h / 5, 7), tm);
    const a = lean * (k + 1) / 5; s.position.set(px + Math.sin(a) * h / 10, py + h / 10, 0); s.rotation.z = -a; g.add(s); px += Math.sin(a) * h / 5; py += h / 5; }
  for (let k = 0; k < 9; k++) {
    const fg = new THREE.Group(), len = h * (0.32 + r() * 0.1);
    const fm = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 4), lam(mixc(leaf, k % 2 ? '#8ab060' : '#24401e', r() * 0.4)));
    fm.scale.set(len / 2, h * 0.012, h * 0.05); fm.position.x = len / 2; fg.add(fm);
    fg.rotation.set(0, k * 0.7 + r() * 0.3, -0.35 - r() * 0.45); fg.position.set(px, py, 0); g.add(fg);
  }
  g.position.set(x, y, z); return g;
}
/** A bamboo clump: thin culms leaning out, with leafy crowns. */
export function bamboo3d(x, z, h, seed = 1, { c = '#7a9a4a', leaf = ['#4f8a3a', '#6aa04a', '#3e6e30'], y = 0 } = {}) {
  const g = new THREE.Group(), r = rng(seed), cm = lam(c);
  for (let k = 0; k < 8; k++) {
    const hh = h * (0.7 + r() * 0.35), cu = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.012, h * 0.016, hh, 5), cm);
    const ax = (r() - 0.5) * 0.5, az = (r() - 0.5) * 0.6; cu.position.set(Math.sin(az) * hh / 2 * -1, hh / 2, Math.sin(ax) * hh / 2); cu.rotation.set(ax, 0, az); g.add(cu);
  }
  for (let k = 0; k < 7; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(h * (0.16 + r() * 0.08), 9, 7), lam(leaf[k % leaf.length]));
    s.scale.set(1.3, 0.75, 1); s.position.set((r() - 0.5) * h * 0.6, h * (0.6 + r() * 0.35), (r() - 0.5) * h * 0.4); g.add(s); }
  g.position.set(x, y, z); return g;
}
/** A thatched village house. */
export function hut3d(x, z, s = 1, seed = 1, { wall = '#b89a6a', thatch = '#9a7a3a', y = 0 } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const b = box(5, 2.6, 3.6, lam(mixc(wall, '#8a6a4a', r() * 0.3))); b.position.y = 1.3; g.add(b);
  const rf = new THREE.Mesh(new THREE.ConeGeometry(Math.SQRT1_2, 1, 4), lam(mixc(thatch, '#6a5228', r() * 0.3))); rf.rotation.y = Math.PI / 4; rf.scale.set(6.4, 2.8, 4.8); rf.position.y = 2.6 + 1.4; g.add(rf);
  const dr = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.8), lam('#3a2a20')); dr.position.set(0.6, 0.9, 1.81); g.add(dr);
  g.position.set(x, y, z); g.rotation.y = (r() - 0.5) * 0.6; g.scale.setScalar(s); return g;
}
/** A Vietnamese village church: a white nave with a red roof and a pointed bell tower. */
export function vnChurch3d({ wall = '#efe2c8', roof = '#8a3e2e', lit = 0 } = {}) {
  const g = new THREE.Group(), wm = lam(wall), rm = lam(roof);
  const nave = box(7, 5, 14, wm); nave.position.y = 2.5; g.add(nave);
  const rf = box(5.2, 5.2, 14.4, rm); rf.rotation.z = Math.PI / 4; rf.position.y = 5; g.add(rf);
  const tw = box(3.4, 11, 3.4, wm); tw.position.set(0, 5.5, 7.6); g.add(tw);
  const sp = new THREE.Mesh(new THREE.ConeGeometry(2.4, 4.6, 4), rm); sp.rotation.y = Math.PI / 4; sp.position.set(0, 13.3, 7.6); g.add(sp);
  const cr = box(0.25, 1.6, 0.25, lam('#e8c46a')); cr.position.set(0, 16.4, 7.6); g.add(cr); const cb = box(1, 0.25, 0.25, lam('#e8c46a')); cb.position.set(0, 16.6, 7.6); g.add(cb);
  const dw = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.4), lit ? glowMat('#ffd38a') : lam('#4a2e22')); dw.position.set(0, 1.2, 9.32); g.add(dw);
  return g;
}
/** A French village church in pale stone: nave, slate roof, a square tower and a slate spire. */
export function frenchChurch3d({ stone = '#ddd0b8', slate = '#5a5a6a' } = {}) {
  const g = new THREE.Group(), sm = lam(stone), rm = lam(slate);
  const nave = box(6.5, 5.5, 15, sm); nave.position.y = 2.75; g.add(nave);
  const rf = box(4.8, 4.8, 15.4, rm); rf.rotation.z = Math.PI / 4; rf.position.y = 5.5; g.add(rf);
  const tw = box(3.6, 10, 3.6, sm); tw.position.set(0, 5, 8.2); g.add(tw);
  const sp = new THREE.Mesh(new THREE.ConeGeometry(2.6, 8, 8), rm); sp.position.set(0, 14, 8.2); g.add(sp);
  const cr = box(0.2, 1.4, 0.2, lam('#3a3a44')); cr.position.set(0, 18.6, 8.2); g.add(cr);
  return g;
}
/** The Carmel of Lisieux: a long red-brick convent with a slate roof, its chapel with a gable bell turret, a garden wall. */
export function carmel3d({ brick = '#b06848', slate = '#4a4a58', lit = 0 } = {}) {
  const g = new THREE.Group(), t = brickTex(brick, 5, { rows: 20, cols: 30 }), bm = lam(brick), tm = lam('#ffffff', { map: t }), rm = lam(slate);
  const conv = box(30, 8, 8, [bm, bm, bm, bm, tm, bm]); conv.position.set(-6, 4, -4); g.add(conv);
  const cr = box(5.7, 5.7, 30.4, rm); cr.rotation.x = 0; const crg = new THREE.Group(); cr.rotation.z = Math.PI / 4; crg.add(cr); crg.rotation.y = Math.PI / 2; crg.position.set(-6, 8, -4); g.add(crg);
  const win = lit ? glowMat('#ffd38a') : lam('#3a3440');
  for (let i = 0; i < 8; i++) for (const yy of [2.4, 5.8]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.6), win); w.position.set(-19.5 + i * 3.6, yy, 0.03); g.add(w); }
  const ch = box(8, 10, 16, [bm, bm, bm, bm, tm, bm]); ch.position.set(14, 5, -2); g.add(ch);
  const chr = box(5.8, 5.8, 16.4, rm); chr.rotation.z = Math.PI / 4; chr.position.set(14, 10, -2); g.add(chr);
  const bell = box(2.2, 3.4, 1, bm); bell.position.set(14, 15.5, 6); g.add(bell);
  const bc = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.6, 4), rm); bc.rotation.y = Math.PI / 4; bc.position.set(14, 18, 6); g.add(bc);
  const crs = box(0.25, 1.4, 0.25, lam('#e8e0d0')); crs.position.set(14, 19.4, 6); g.add(crs);
  const rose = new THREE.Mesh(new THREE.CircleGeometry(1.4, 16), win); rose.position.set(14, 7, 6.03); g.add(rose);
  const dr = new THREE.Mesh(new THREE.PlaneGeometry(2, 3.4), lam('#3a2a22')); dr.position.set(14, 1.7, 6.03); g.add(dr);
  const gw = box(60, 2.4, 0.8, bm); gw.position.set(0, 1.2, 9); g.add(gw);
  if (lit) { const gl = sprite(warm, 40, 0.25 * lit, true); gl.position.set(0, 5, 4); g.add(gl); }
  return g;
}
/** A lotus pond (water plane with pads and pink flowers) centred at (x, z), w x d. */
function pond3d(x, z, w, d, { water = '#3e4a7a', glow = '#d88a8a', seed = 4 } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const wt = new THREE.Mesh(new THREE.PlaneGeometry(w, d), lam(water, { emissive: col(glow), emissiveIntensity: 0.35 })); wt.rotation.x = -Math.PI / 2; wt.position.set(x, 0.03, z); g.add(wt);
  const rim = box(w + 1, 0.3, 0.6, lam('#8a7a6a')); rim.position.set(x, 0.15, z + d / 2); g.add(rim);
  const pad = lam('#3e7a46'), padL = lam('#5a9a5a'), fl = lam('#f2a0bc', { emissive: col('#f2a0bc'), emissiveIntensity: 0.25 });
  for (let k = 0; k < 42; k++) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(0.5 + r() * 0.6, 12), k % 3 ? pad : padL); p.rotation.x = -Math.PI / 2;
    p.position.set(x + (r() - 0.5) * w * 0.95, 0.06, z + (r() - 0.5) * d * 0.9); g.add(p);
    if (k % 4 === 0) { const b = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 6), fl); b.position.set(p.position.x, 0.4, p.position.z); g.add(b); }
  }
  return { group: g, water: wt };
}
/** A red silk lantern hanging on the rampart (a small body plus an additive glow). */
function lantern3d(x, y, z, s = 1, c = '#d8404e') {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.5 * s, 10, 8), glowMat(c)); b.scale.y = 1.25; g.add(b);
  const gl = sprite(redGlow, 7 * s, 0.75, true); g.add(gl);
  g.position.set(x, y, z); g.userData.glow = gl; return g;
}

const MODES = {
  hook: { kind: 'court', sky: [[0, '#0a0c22'], [0.26, '#161a3c'], [0.44, '#2a2c56'], [0.54, '#40406a'], [0.58, '#4e4a72'], [1, '#4e4a72']], fog: '#2a2c4e',
    brick: '#6a4e50', ground: '#4a4250', hemi: ['#8a94c8', '#141420', 0.85], key: ['#ffb070', 0.9, [-80, 30, -60]], moon: [880, 560], rays: { op: 0 },
    cloudLit: '#5a5a84', cloudShade: '#1e1e3a', stars: 110, lit: 1, lanterns: true, air: 'gold', move: 'push-fast',
    gate: [970, 46], tower: [250, 230], pavilion: null, palms: true, clouds: [[160, 520, 900, 9], [740, 640, 950, 6]] },
  france: { kind: 'france', sky: [[0, '#3a6ab8'], [0.26, '#6a9ad4'], [0.44, '#b8d4ec'], [0.54, '#e8eef0'], [0.58, '#f2f0e4'], [1, '#f2f0e4']], fog: '#d8e4ea',
    ground: '#7a9a4a', hemi: ['#fff8e8', '#4a5a3a', 1.35], key: ['#fff0d0', 1.35, [80, 40, -60]], sun: [930, 470, 0.8], rays: { op: 0.06, dir: -0.5, spread: 1.0 },
    cloudLit: '#ffffff', cloudShade: '#b8c4d8', stars: 0, lit: 0, air: null, move: 'pan-r', church: [210, 220], clouds: [[140, 520, 900, 10], [640, 470, 950, 9], [980, 610, 900, 8]] },
  court: { kind: 'court', sky: [[0, '#5a7ab0'], [0.26, '#8aa8cc'], [0.44, '#dcd0b8'], [0.54, '#f4dcb0'], [0.58, '#f8e4c0'], [1, '#f8e4c0']], fog: '#e0d0b8',
    brick: '#a86a4a', ground: '#a8906e', hemi: ['#fff0dc', '#5a4a40', 1.3], key: ['#ffe0b8', 1.35, [-80, 30, -80]], breakAt: [300, 560], rays: { op: 0.07, dir: 0.5, spread: 1.0 },
    cloudLit: '#fff4e4', cloudShade: '#a8acc0', stars: 0, lit: 0, air: 'dust', move: 'push', gate: null, tower: [330, 240], pavilion: [790, 36], palms: true,
    clouds: [[150, 470, 900, 10], [940, 450, 900, 10], [560, 610, 950, 7]] },
  court2: { kind: 'court', sky: [[0, '#2e2e5a'], [0.2, '#5a5a86'], [0.4, '#c8a8a0'], [0.52, '#fce0b8'], [0.58, '#fff0d0'], [1, '#fff0d0']], fog: '#ecd0b4',
    brick: '#a46a4c', ground: '#ac9472', hemi: ['#fff0dc', '#4a3a40', 1.3], key: ['#ffe8c8', 1.5, [0, 30, -100]], breakAt: [420, 720], rays: { op: 0.17, dir: 0, spread: 1.3, up: true }, swell: true,
    cloudLit: '#fff0dc', cloudShade: '#9a94b0', stars: 0, lit: 0, air: 'gold', move: 'dolly', gate: null, tower: [360, 240], pavilion: [810, 34], palms: true,
    clouds: [[150, 460, 900, 11], [950, 450, 900, 11], [700, 620, 950, 7]] },
  pond: { kind: 'pond', sky: [[0, '#1a1a44'], [0.24, '#3a3264'], [0.4, '#8a5a82'], [0.5, '#e0907a'], [0.56, '#f4b48a'], [1, '#f4b48a']], fog: '#9a6a82',
    brick: '#8a5a52', ground: '#6a5a5a', hemi: ['#f8c8c0', '#2a2030', 1.05], key: ['#ffb888', 1.15, [80, 20, -100]], rays: { op: 0 },
    cloudLit: '#f0a090', cloudShade: '#4a3a60', stars: 40, lit: 1, lanterns: true, air: 'gold', move: 'drift', gate: null, tower: [650, 250], pavilion: null, palms: true,
    clouds: [[150, 470, 900, 9], [930, 440, 900, 9]] },
  field: { kind: 'field', sky: [[0, '#6a7aa8'], [0.24, '#a8b4cc'], [0.42, '#ecdcc0'], [0.52, '#f8e8c8'], [0.57, '#fbf0d6'], [1, '#fbf0d6']], fog: '#e8dcc4',
    ground: '#8a8a5a', hemi: ['#fff4e0', '#5a5a40', 1.35], key: ['#fff0c8', 1.4, [0, 60, -30]], breakAt: [420, 500], rays: { op: 0.14, dir: 0, spread: 0.9 }, swell: true,
    cloudLit: '#fff8ec', cloudShade: '#b0b0c4', stars: 0, lit: 0, air: 'dust', move: 'tilt-up', tower: [700, 300], church: null,
    clouds: [[150, 460, 900, 10], [940, 470, 900, 10], [640, 610, 950, 7]] },
  carmel: { kind: 'carmel', sky: [[0, '#4a5a94'], [0.24, '#8a96bc'], [0.42, '#e8c8a8'], [0.52, '#f8d8a8'], [0.57, '#fce4b8'], [1, '#fce4b8']], fog: '#e8ccac',
    ground: '#7a8a48', hemi: ['#ffe8cc', '#4a4a38', 1.3], key: ['#ffd0a0', 1.4, [-80, 18, -100]], sun: [140, 880, 0.75], rays: { op: 0.09, dir: 0.6, spread: 1.1 },
    cloudLit: '#ffe4c8', cloudShade: '#9a94b4', stars: 0, lit: 0.6, air: 'gold', move: 'pull', clouds: [[620, 470, 900, 10], [980, 560, 900, 8]] },
  glory: { kind: 'field', sky: [[0, '#141842'], [0.2, '#2e2c62'], [0.36, '#6a4a7e'], [0.47, '#d8827a'], [0.53, '#f8be86'], [0.57, '#fcd8a0'], [1, '#fcd8a0']], fog: '#d89a84',
    ground: '#6a6a4a', hemi: ['#ffd8c0', '#3a3440', 1.2], key: ['#ffb880', 1.5, [80, 12, -100]], sun: [880, 1010, 0.9], rays: { op: 0.08, dir: -0.4, spread: 1.6, up: true },
    cloudLit: '#ffc4a4', cloudShade: '#8a6a98', stars: 60, lit: 0.8, air: 'gold', move: 'arc', tower: [800, 300], church: [240, 260],
    clouds: [[160, 470, 900, 9], [960, 520, 900, 8]] },
};

/** tonkin(mode) or tonkin(name, { base, ...overrides }). */
export function tonkin(mode = 'hook', extra = null) {
  const P = extra ? { ...MODES[extra.base || 'hook'], ...extra } : MODES[mode], r = rng(mode.length * 23 + 5);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 140, 1700);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[mode] || {};
  const LK = { color: VL.key || P.key[0], int: P.key[1], pos: { l: [-80, 25, -100], r: [80, 25, -100], back: [0, 22, -100], top: [0, 60, -30] }[VL.from] || P.key[2] };
  const key = new THREE.DirectionalLight(LK.color, LK.int); key.position.set(...LK.pos); scene.add(key);
  const cam = camera(0, 2.6, 0, 0.03);
  const fogged = (c, t) => mixc(c, P.fog, t).getStyle();
  if (P.stars) scene.add(stars(P.stars, 19, 0.85, { el0: 0.24, el1: 0.62 }));
  let sunGlow = null;
  if (P.sun) { sunGlow = sprite(warm, 1500, P.sun[2] * 0.85); sunGlow.position.copy(atScreen(cam, P.sun[0], P.sun[1], 2500)); scene.add(sunGlow); }
  if (P.moon) { const mg = sprite(glowTex([[0, 'rgba(244,246,255,1)'], [0.12, 'rgba(232,238,255,.9)'], [0.2, 'rgba(200,210,255,.25)'], [1, 'rgba(200,210,255,0)']]), 420, 0.9);
    mg.position.copy(atScreen(cam, P.moon[0], P.moon[1], 2400)); scene.add(mg); }
  const rp = P.rays, src = P.sun ? [P.sun[0], P.sun[1]] : P.breakAt;
  const rays = rp.op > 0 && src ? godRays(cam, src[0], src[1], 400, { n: rp.up ? 13 : 10, len: rp.up ? 900 : 1500, width: 60, spread: rp.spread, dir: rp.dir + (rp.up ? Math.PI : 0), op: rp.op, seed: mode.length + 7 }) : null;
  if (rays) scene.add(rays.group);
  let breakGlow = null;
  if (P.breakAt) { breakGlow = sprite(warm, 560, 0.25, true); breakGlow.position.copy(atScreen(cam, P.breakAt[0], P.breakAt[1], 1200)); scene.add(breakGlow); }
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(80 + k * 5 + mode.length, { lit: P.cloudLit, shade: P.cloudShade, glow: 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  const VN = P.kind === 'court' || P.kind === 'pond' || P.kind === 'field';
  // far hills: karst-like ridges in Tonkin, soft green ridges in France
  const hillC = VN ? ['#6a7a8a', '#5e7a6a', '#4e6a4e'] : ['#8aa0b0', '#7a9a6a', '#6a8a4a'];
  [[-900, 140, 3.2, 0], [-620, 90, 2.4, 1], [-420, 50, 1.6, 2]].forEach(([z, amp, fq, k]) => scene.add(ridge({ w: 2600, d: 120, z, y: -6, amp, color: fogged(hillC[k], 0.6 - k * 0.15), seed: 11 + k + mode.length, freq: VN ? fq : fq * 0.5 })));
  // lowland: paddies (Tonkin) or a patchwork of fields (France)
  const low = VN ? ['#7cba5c', '#9ccc6a', '#a8d0d8', '#8ab85a', '#b8dce0', '#6aa64e'].map((c) => fogged(c, 0.2))
    : ['#9ab460', '#b8b86a', '#7e9e50', '#c8b070', '#a8a058', '#8aa860'].map((c) => fogged(c, 0.15));
  if (P.kind !== 'carmel') scene.add(fields(1400, 380, -2, -230, 3 + mode.length, low));
  else scene.add(fields(1400, 380, -2, -260, 6, low));
  // trees, huts, landmarks
  if (VN) {
    for (let k = 0; k < 22; k++) { const x = (r() * 2 - 1) * 160, z = -70 - r() * 150, h = 9 + r() * 6;
      scene.add(k % 3 ? bamboo3d(x, z, h, 20 + k, { y: -2 }) : palm3d(x, z, h * 1.3, 40 + k, { y: -2 })); }
    for (let k = 0; k < 8; k++) scene.add(hut3d((r() * 2 - 1) * 140, -90 - r() * 120, 1.2, 60 + k, { y: -2 }));
    if (P.tower) { const [sx, d] = P.tower, p = atScreen(cam, sx, 1100, d), t = flagTower3d({ brick: fogged('#b87a5a', 0.3), lit: P.lit }); t.position.set(p.x, -2, -d); t.scale.setScalar(0.9); scene.add(t); scene.userData.tower = t; }
    if (P.church) { const [sx, d] = P.church, p = atScreen(cam, sx, 1100, d), ch = vnChurch3d({ wall: fogged('#efe2c8', 0.25), roof: fogged('#8a3e2e', 0.25), lit: P.lit }); ch.position.set(p.x, -2, -d); ch.rotation.y = 0.5; ch.scale.setScalar(1.6); scene.add(ch); }
  } else {
    const leaves = P.kind === 'carmel' ? ['#5e7a3a', '#7a8a3e', '#8a8a42', '#4e6a32'] : ['#4e7a36', '#5e8a40', '#3e6a2e', '#6e9a46'];
    for (let k = 0; k < 18; k++) scene.add(oak3d((r() * 2 - 1) * 170, -60 - r() * 170, 9 + r() * 6, 30 + k, { y: -2, leaves }));
    if (P.church) { const [sx, d] = P.church, p = atScreen(cam, sx, 1100, d), ch = frenchChurch3d({ stone: fogged('#ddd0b8', 0.3), slate: fogged('#5a5a6a', 0.3) }); ch.position.set(p.x, -2, -d); ch.rotation.y = -0.5; ch.scale.setScalar(1.5); scene.add(ch); }
  }
  // the near place
  let backZ = -46;
  const lanterns = [];
  let pond = null;
  if (P.kind === 'court' || P.kind === 'pond') {
    const cw = citadelWall3d({ brick: P.brick, seed: 4 + mode.length }); cw.position.z = -48; scene.add(cw); backZ = -46.8;
    if (P.gate) { const [sx, d] = P.gate, p = atScreen(cam, sx, 1100, d); const gt = gate3d({ brick: P.brick, lit: 0 }); gt.position.set(p.x, 0, -49); scene.add(gt); }
    if (P.pavilion) { const [sx, d] = P.pavilion, p = atScreen(cam, sx, 1100, d); const pv = pavilion3d({ lit: P.lit }); pv.position.set(p.x, 0, -d); scene.add(pv); }
    if (P.lanterns) for (let k = 0; k < 9; k++) { const L = lantern3d(-44 + k * 11 + (r() - 0.5) * 3, 6.2, -46.6, 1, k % 3 === 1 ? '#e0a02e' : '#d8404e'); scene.add(L); lanterns.push([L, r() * 6.3]); }
    if (P.kind === 'pond') { pond = pond3d(0, -34, 46, 18, { glow: '#e09080' }); scene.add(pond.group); }
  } else if (P.kind === 'carmel') {
    const cm = carmel3d({ lit: P.lit }); const p = atScreen(cam, 760, 1100, 72); cm.position.set(p.x, 0, -72); cm.rotation.y = -0.35; scene.add(cm); backZ = -60;
    for (let k = 0; k < 6; k++) scene.add(oak3d(-30 + k * 9 + (r() - 0.5) * 4, -50 - r() * 6, 6 + r() * 3, 70 + k, { leaves: ['#5e7a3a', '#7a8a3e', '#4e6a32'] }));
  } else {
    backZ = -40;
    const dike = box(700, 0.6, 2, lam(fogged('#8a7a5a', 0.1))); dike.position.set(0, -0.3, -41); scene.add(dike);
    if (P.kind === 'france') backZ = -60;
  }
  // near ground
  const nearLen = -backZ + 20, z0 = 20;
  const leafC = P.kind === 'france' || P.kind === 'carmel' ? ['#6a8a3a', '#8aa24a', '#c8b060'] : [mixc(P.ground, '#3a2a22', 0.35).getStyle(), mixc(P.ground, '#fff0d8', 0.3).getStyle(), mixc(P.ground, '#6a5a4a', 0.2).getStyle()];
  const gt = groundTex(P.ground, leafC, mode.length + 4, P.kind !== 'court' && P.kind !== 'pond');
  gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.repeat.set(700 / 14, nearLen / 14);
  const gr = new THREE.Mesh(new THREE.PlaneGeometry(700, nearLen, 70, 6), lam('#ffffff', { map: gt })); gr.rotation.x = -Math.PI / 2; gr.position.set(0, 0, z0 - nearLen / 2); scene.add(gr);
  if (P.kind === 'field') { const rim = new THREE.Mesh(new THREE.PlaneGeometry(700, 6), lam(fogged('#6a6a44', 0.1))); rim.rotation.x = -Math.PI / 2.2; rim.position.set(0, -0.8, backZ - 1.5); scene.add(rim); }
  const grassC = P.kind === 'france' ? ['#4e7a30', '#6a9a3e', '#8aae4a'] : P.kind === 'carmel' ? ['#5e7a34', '#7a8a3e', '#9a9a4a']
    : [mixc(P.ground, '#4a5a2a', 0.5).getStyle(), mixc(P.ground, '#6a7a3a', 0.45).getStyle(), mixc(P.ground, '#8a8a4a', 0.4).getStyle()];
  scene.add(tufts3d(P.kind === 'france' || P.kind === 'carmel' || P.kind === 'field' ? 160 : 40, { x: 16, z0: -21, z1: backZ + 1, h: [0.25, 0.55], colors: grassC, seed: 8 + mode.length }));
  // the foreground (front3d canvas over the SVG): low grass and pebbles at the feet
  const front = new THREE.Scene(); front.fog = scene.fog;
  front.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const fkey = new THREE.DirectionalLight(LK.color, LK.int); fkey.position.set(...LK.pos); front.add(fkey);
  const fC = grassC.map((c) => mixc(c, '#1a1a14', 0.2).getStyle());
  front.add(tufts3d(P.kind === 'court' || P.kind === 'pond' ? 24 : 40, { x: 4.6, z0: -10, z1: -17, h: [0.06, 0.13], colors: fC, seed: 11 + mode.length, blades: 4, r: 0.012 }));
  for (let k = 0; k < 10; k++) { const s = 0.04 + r() * 0.07, rk = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), new THREE.MeshBasicMaterial({ color: mixc(P.ground, '#3a2a24', 0.3 + r() * 0.2) }));
    rk.scale.y = 0.55; rk.position.set((r() * 2 - 1) * 4.2, s * 0.3, -10 - r() * 8); front.add(rk); }
  const haze = sprite(hazeTex, 1, 0.22); haze.scale.set(420, 30, 1); haze.position.set(0, 4, -160); scene.add(haze);
  const air = P.air ? particles(P.air, { seed: mode.length * 7 + 3 }) : null;
  if (air) scene.add(air.points);
  const flag = scene.userData.tower?.userData.flag || null, fp = flag ? flag.geometry.attributes.position : null, f0 = fp ? Float32Array.from(fp.array) : null;
  let Rg = { move: P.move, amt: 0.07, ox: 540, oy: 1000, plane: 20 }, dirF = new THREE.Vector3(0, 0, -1);
  const P0 = cam.position.clone();
  return { scene, cam, front,
    rig(o) {
      Rg = { ...Rg, ...o };
      const fz = (H / 2) / Math.tan(FOV * Math.PI / 360), z = Rg.plane;
      dirF = cam.localToWorld(new THREE.Vector3((Rg.ox - W / 2) / fz * z, -(Rg.oy - H / 2) / fz * z, -z)).sub(cam.position).normalize();
    },
    update(t, p) {
      let ry = 0, rz = 0;
      const mv = Rg.move || P.move, D = Rg.plane, Am = Rg.amt / 0.07;
      const toward = (u) => cam.position.copy(P0).addScaledVector(dirF, u);
      if (mv === 'push-fast') toward(1.6 * Am * p);
      else if (mv === 'push') toward(1.3 * Am * p);
      else if (mv === 'pull') toward(1.4 * Am * (1 - p));
      else if (mv === 'pan-r' || mv === 'pan-l') { const sg = mv === 'pan-r' ? 1 : -1; cam.position.set(P0.x + sg * (-0.75 + 1.5 * p) * Am, P0.y, P0.z - 0.35 * Am); }
      else if (mv === 'tilt-up') { cam.position.set(P0.x, P0.y + 0.55 * p * Am, P0.z); cam.setViewOffset(W, H, 0, -95 * p * Am, W, H); }
      else if (mv === 'dolly') { const z = 9 * p; cam.position.set(P0.x, P0.y, P0.z + z); cam.fov = 2 * Math.atan(TH * D / (D + z)) * 180 / Math.PI; cam.updateProjectionMatrix(); }
      else if (mv === 'drift-l' || mv === 'drift-r' || mv === 'drift') { const sg = mv === 'drift-r' ? 1 : -1; cam.position.set(P0.x + sg * (-0.4 + 0.8 * p) * Am, P0.y, P0.z - 0.15 * Am); }
      else { const sg = mv === 'arc-l' ? -1 : 1, a = sg * (-0.05 + 0.1 * p) * Am; cam.position.set(P0.x + D * Math.sin(a), P0.y, P0.z - D + D * Math.cos(a) - 0.3 * Am); ry = a; rz = sg * (p - 0.5) * 0.016; }
      const k = P.swell ? Math.min(1, 0.2 + t * 0.11) : 1;
      if (rays) rays.update(t, k);
      if (breakGlow) breakGlow.material.opacity = 0.12 + 0.3 * k;
      if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
      clouds.forEach(([c, x, j]) => { c.position.x = x + t * 1.1 * (1 + (j % 3) * 0.4) * (j % 2 ? 1 : -1); });
      lanterns.forEach(([L, ph]) => { L.userData.glow.material.opacity = 0.62 + 0.18 * Math.sin(t * 2.3 + ph); L.position.y = 6.2 + 0.05 * Math.sin(t * 1.4 + ph); });
      if (pond) pond.water.material.emissiveIntensity = 0.32 + 0.05 * Math.sin(t * 0.9);
      if (fp) { for (let i = 0; i < fp.count; i++) { const x0 = f0[i * 3] + 2.2; fp.setZ(i, Math.sin(x0 * 1.6 - t * 3) * 0.25 * (x0 / 4.4)); } fp.needsUpdate = true; }
      haze.position.x = Math.sin(t * 0.2) * 6;
      if (air) air.update(t);
      return { ry, rz };
    } };
}

export const SETS = {
  tHook: () => tonkin('tHook', { base: 'hook' }),
  tFrance: () => tonkin('tFrance', { base: 'france' }),
  tCourt: () => tonkin('tCourt', { base: 'court' }),
  tCourt2: () => tonkin('tCourt2', { base: 'court2' }),
  tPond: () => tonkin('tPond', { base: 'pond' }),
  tField: () => tonkin('tField', { base: 'field' }),
  tCarmel: () => tonkin('tCarmel', { base: 'carmel' }),
  tGlory: () => tonkin('tGlory', { base: 'glory' }),
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
