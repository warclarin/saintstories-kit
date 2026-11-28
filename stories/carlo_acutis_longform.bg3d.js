// three.js backgrounds for the St. Carlo Acutis long-form video (16:9, 1920x1080; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). Every scene has a 3D set; the characters stay SVG cards driven by the same camera (cam3d).
// Landscape camera: fov 24 (STORY.cam3d.fov), height 2.0, no pitch, so the horizon sits mid-frame and a card's feet meet
// the 3D ground at art y = 540 + 254 x depth (depth 1, 20 units away: y 794). One renderer for all ~30 scenes
// (cam3d.shared), because Chrome keeps only ~16 WebGL contexts.
// Sets (each a set-up per scene, see BUILD): square() St. Peter's Square with the basilica, colonnades, obelisk and crowd;
// milan() a Milan street with tram, lamps and the Duomo far off; london() the Thames at Westminster; room() home, bedroom
// and hospital interiors with a window view; church() a nave with altar (parish, adoration, the upper basilica in Assisi);
// sea() the Centola coast; umbria() Assisi on its hill (with the Sanctuary of the Spoliation); brazil() a parish in Campo Grande.
// Deterministic: everything is drawn from timeline time. Exported for later landscape reels: the set functions and helpers.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, sprite, atScreen, makeRig, stars } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const A = await import('./agnes.bg3d.js');
const E = await import('./edmund.bg3d.js');
window.BG3D_LIB = prevLib;
const { cumulus, godRays, fields, assisi3d, cypress3d, olive3d } = A;
const { groundTex, tufts3d, particles } = E;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
const cyl = (r0, r1, h, m, seg = 10) => new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), m);
const CAMY = 2.0;
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 5000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,246,220,1)'], [0.2, 'rgba(255,220,160,.75)'], [0.55, 'rgba(255,180,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const cool = glowTex([[0, 'rgba(230,240,255,1)'], [0.25, 'rgba(200,220,255,.6)'], [0.6, 'rgba(170,200,255,.18)'], [1, 'rgba(170,200,255,0)']]);
const mistTex = glowTex([[0, 'rgba(255,248,238,.8)'], [0.45, 'rgba(250,242,232,.35)'], [1, 'rgba(250,242,232,0)']]);
const disc = glowTex([[0, 'rgba(255,252,236,1)'], [0.42, 'rgba(255,246,214,1)'], [0.5, 'rgba(255,226,170,.6)'], [1, 'rgba(255,200,140,0)']]);

// ------------------------------------------------------------------ textures
function pavingTex(base, line, seed = 1, { cell = 64, cobble = false } = {}) {
  const r = rng(seed);
  const t = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let k = 0; k < 60; k++) { g.fillStyle = r() < 0.5 ? 'rgba(0,0,0,.05)' : 'rgba(255,250,235,.06)'; g.beginPath(); g.ellipse(r() * w, r() * h, 20 + r() * 50, 8 + r() * 20, 0, 0, Math.PI * 2); g.fill(); }
    g.strokeStyle = line; g.lineWidth = 2;
    if (cobble) for (let y = 0; y < h; y += cell / 2) for (let x = (y / (cell / 2)) % 2 ? cell / 4 : 0; x < w; x += cell / 2) { g.strokeRect(x + 1, y + 1, cell / 2 - 2, cell / 2 - 2); }
    else { for (let y = 0; y <= h; y += cell) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
      for (let y = 0; y < h; y += cell) for (let x = (y / cell) % 2 ? cell / 2 : 0; x <= w; x += cell) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + cell); g.stroke(); } }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t;
}
function planksTex(base, seed = 2) {
  const r = rng(seed);
  const t = canvasTex(512, 512, (g, w, h) => {
    for (let k = 0; k < 8; k++) { g.fillStyle = mixc(base, k % 2 ? '#ffffff' : '#000000', 0.04 + r() * 0.05).getStyle(); g.fillRect(k * 64, 0, 64, h); }
    g.strokeStyle = 'rgba(40,20,10,.35)'; g.lineWidth = 2;
    for (let k = 0; k <= 8; k++) { g.beginPath(); g.moveTo(k * 64, 0); g.lineTo(k * 64, h); g.stroke(); }
    for (let k = 0; k < 8; k++) { const y = r() * h; g.beginPath(); g.moveTo(k * 64, y); g.lineTo(k * 64 + 64, y); g.stroke(); }
    for (let k = 0; k < 120; k++) { g.strokeStyle = 'rgba(60,30,10,.12)'; g.lineWidth = 1; const x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 3, y + 30 + r() * 40); g.stroke(); }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t;
}
function checkerTex(a, b) {
  const t = canvasTex(128, 128, (g) => { g.fillStyle = a; g.fillRect(0, 0, 128, 128); g.fillStyle = b; g.fillRect(0, 0, 64, 64); g.fillRect(64, 64, 64, 64); g.strokeStyle = 'rgba(0,0,0,.1)'; g.strokeRect(0, 0, 128, 128); });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t;
}
/** A window view: sky gradient, optional sun/moon, a skyline silhouette ('city' | 'florence' | 'trees' | 'none') and stars. */
function viewTex(stops, { skyline = 'city', ink = '#5a5a7a', moon = false, sun = false, starsN = 0, seed = 3, lit = 0 } = {}) {
  const r = rng(seed);
  return canvasTex(512, 512, (g, w, h) => {
    const l = g.createLinearGradient(0, 0, 0, h); stops.forEach(([o, c]) => l.addColorStop(o, c)); g.fillStyle = l; g.fillRect(0, 0, w, h);
    for (let k = 0; k < starsN; k++) { g.fillStyle = `rgba(255,248,220,${0.5 + r() * 0.5})`; g.beginPath(); g.arc(r() * w, r() * h * 0.6, 1 + r() * 1.6, 0, 7); g.fill(); }
    if (moon) { g.fillStyle = '#f6efd8'; g.beginPath(); g.arc(w * 0.7, h * 0.26, 26, 0, 7); g.fill(); const gl = g.createRadialGradient(w * 0.7, h * 0.26, 20, w * 0.7, h * 0.26, 110); gl.addColorStop(0, 'rgba(246,239,216,.35)'); gl.addColorStop(1, 'rgba(246,239,216,0)'); g.fillStyle = gl; g.fillRect(0, 0, w, h); }
    if (sun) { const gl = g.createRadialGradient(w * 0.3, h * 0.55, 10, w * 0.3, h * 0.55, 200); gl.addColorStop(0, 'rgba(255,240,200,.95)'); gl.addColorStop(1, 'rgba(255,200,140,0)'); g.fillStyle = gl; g.fillRect(0, 0, w, h); }
    g.fillStyle = ink;
    if (skyline === 'city') { for (let x = 0; x < w;) { const bw = 30 + r() * 50, bh = 60 + r() * 120; g.fillRect(x, h - bh, bw - 4, bh); if (lit) for (let k = 0; k < 6; k++) if (r() < lit) { g.fillStyle = '#ffd98a'; g.fillRect(x + 4 + r() * (bw - 16), h - bh + 10 + r() * (bh - 20), 5, 7); g.fillStyle = ink; } x += bw; } }
    else if (skyline === 'florence') {
      for (let x = 0; x < w; x += 26) { const bh = 40 + r() * 40; g.fillRect(x, h - bh, 24, bh); }
      g.beginPath(); g.ellipse(w * 0.56, h - 110, 70, 90, 0, Math.PI, 0); g.fill(); g.fillRect(w * 0.56 - 80, h - 112, 160, 112);
      g.fillRect(w * 0.56 - 8, h - 230, 16, 30); g.beginPath(); g.moveTo(w * 0.56 - 12, h - 230); g.lineTo(w * 0.56, h - 252); g.lineTo(w * 0.56 + 12, h - 230); g.fill();
      g.fillRect(w * 0.76, h - 250, 34, 250); g.fillRect(w * 0.76 - 4, h - 256, 42, 10);
      if (lit) { g.fillStyle = '#ffd98a'; for (let k = 0; k < 24; k++) g.fillRect(r() * w, h - 20 - r() * 60, 4, 6); }
    } else if (skyline === 'trees') { for (let k = 0; k < 14; k++) { g.beginPath(); g.arc(k * 40 + r() * 20, h - 30 - r() * 40, 40 + r() * 30, 0, 7); g.fill(); } }
  });
}
/** A painted image on canvas (tapestry, poster): fn(g, w, h) draws it. */
const paintTex = (w, h, fn) => canvasTex(w, h, fn);
/** The canonization tapestry: a young man in a red polo shirt with a halo, on gold and blue (a simple house-style figure). */
function tapestryTex() {
  return paintTex(256, 384, (g, w, h) => {
    g.fillStyle = '#e8d6a8'; g.fillRect(0, 0, w, h); g.fillStyle = '#2f5a9a'; g.fillRect(12, 12, w - 24, h - 24);
    const gl = g.createRadialGradient(w / 2, 120, 10, w / 2, 120, 140); gl.addColorStop(0, 'rgba(255,236,180,.95)'); gl.addColorStop(1, 'rgba(255,236,180,0)'); g.fillStyle = gl; g.fillRect(12, 12, w - 24, h - 24);
    g.strokeStyle = '#f2c46b'; g.lineWidth = 6; g.beginPath(); g.arc(w / 2, 118, 52, 0, 7); g.stroke();
    g.fillStyle = '#cf3b3b'; g.beginPath(); g.moveTo(w / 2 - 70, h - 12); g.quadraticCurveTo(w / 2 - 74, 200, w / 2, 192); g.quadraticCurveTo(w / 2 + 74, 200, w / 2 + 70, h - 12); g.fill();
    g.fillStyle = '#f2c9a6'; g.beginPath(); g.arc(w / 2, 128, 38, 0, 7); g.fill();
    g.fillStyle = '#3a2418'; for (const [dx, dy, rr] of [[-26, -22, 14], [-10, -34, 15], [8, -36, 15], [24, -26, 13], [32, -10, 10], [-32, -8, 10]]) { g.beginPath(); g.arc(w / 2 + dx, 128 + dy, rr, 0, 7); g.fill(); }
    g.fillStyle = '#2b1d14'; g.beginPath(); g.arc(w / 2 - 13, 130, 4, 0, 7); g.arc(w / 2 + 13, 130, 4, 0, 7); g.fill();
    g.strokeStyle = '#b8584f'; g.lineWidth = 3; g.beginPath(); g.arc(w / 2, 142, 10, 0.2, Math.PI - 0.2); g.stroke();
    g.fillStyle = '#c9a24a'; g.fillRect(0, h - 16, w, 16);
  });
}

// ------------------------------------------------------------------ shared pieces
/** Instanced crowd: people (body + head) scattered by `place(r) -> [x, z] | null`, n of them, in bright clothes. */
function crowd3d(n, place, { seed = 5, s = 1, colors = ['#c8323a', '#3a6ab0', '#f2c46b', '#efe6d2', '#5a8a4a', '#8a4a8a', '#e88a4a', '#2a2a3a', '#ffffff'] } = {}) {
  const r = rng(seed), g = new THREE.Group();
  const bodyG = new THREE.CylinderGeometry(0.32 * s, 0.4 * s, 1.25 * s, 7); bodyG.translate(0, 0.62 * s, 0);
  const headG = new THREE.SphereGeometry(0.24 * s, 8, 6); headG.translate(0, 1.5 * s, 0);
  const body = new THREE.InstancedMesh(bodyG, lam('#ffffff'), n), head = new THREE.InstancedMesh(headG, lam('#ffffff'), n);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3();
  const skins = ['#f0c9a8', '#d9a47e', '#a86d45', '#e8bc9a', '#8a5534'];
  let k = 0, tries = 0;
  const pos = [];
  while (k < n && tries < n * 20) {
    tries++; const xz = place(r); if (!xz) continue;
    const hh = 0.85 + r() * 0.3; m4.compose(p.set(xz[0], 0, xz[1]), q, sc.set(1, hh, 1));
    body.setMatrixAt(k, m4); head.setMatrixAt(k, m4);
    body.setColorAt(k, col(colors[Math.floor(r() * colors.length)])); head.setColorAt(k, col(skins[Math.floor(r() * skins.length)])); pos.push([xz[0], xz[1], hh, r() * 6.3]); k++;
  }
  body.count = head.count = k; g.add(body, head);
  return { group: g, body, head, pos, update(t, amp = 0.05) {   // a gentle sway of the crowd (people shifting on their feet)
    for (let i = 0; i < k; i++) { const [x, z, hh, ph] = pos[i]; m4.compose(p.set(x + Math.sin(t * 0.8 + ph) * amp, Math.max(0, Math.sin(t * 1.3 + ph * 2)) * amp * 0.6, z), q, sc.set(1, hh, 1)); body.setMatrixAt(i, m4); head.setMatrixAt(i, m4); }
    body.instanceMatrix.needsUpdate = head.instanceMatrix.needsUpdate = true;
  } };
}
/** A street lamp (post + head) with a glow sprite when lit. */
function lamp3d(x, z, on, h = 6) {
  const g = new THREE.Group(), m = lam('#2e2a36');
  const p = cyl(0.12, 0.16, h, m, 6); p.position.y = h / 2; g.add(p);
  const arm = box(1.2, 0.12, 0.12, m); arm.position.set(0.5, h, 0); g.add(arm);
  const hd = box(0.6, 0.3, 0.4, m); hd.position.set(1.0, h - 0.1, 0); g.add(hd);
  if (on) { const gl = sprite(warm, 6, 0.85, true); gl.position.set(1.0, h - 0.4, 0.2); g.add(gl); const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), glowMat('#ffe6a8')); bulb.position.set(1.0, h - 0.32, 0); g.add(bulb); }
  g.position.set(x, 0, z); return g;
}
/** A round tree: trunk + three leaf balls. */
function tree3d(x, z, h, seed = 1, c = '#5a8a46') {
  const g = new THREE.Group(), r = rng(seed);
  const t = cyl(h * 0.04, h * 0.06, h * 0.5, lam('#5a4232'), 6); t.position.y = h * 0.25; g.add(t);
  for (let k = 0; k < 3; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(h * (0.22 + r() * 0.08), 10, 8), lam(mixc(c, k % 2 ? '#c8e0a0' : '#2a4a2a', r() * 0.3))); s.position.set((r() - 0.5) * h * 0.4, h * (0.6 + r() * 0.15), (r() - 0.5) * h * 0.25); g.add(s); }
  g.position.set(x, 0, z); return g;
}
/** A palm tree: a leaning trunk and a crown of fronds. */
function palm3d(x, z, h, seed = 1) {
  const g = new THREE.Group(), r = rng(seed), lean = (r() - 0.5) * 0.3;
  const t = cyl(h * 0.025, h * 0.04, h, lam('#8a6a4a'), 7); t.position.y = h / 2; t.rotation.z = lean; g.add(t);
  const top = new THREE.Vector3(-Math.sin(lean) * h, h, 0);
  for (let k = 0; k < 8; k++) { const f = new THREE.Mesh(new THREE.ConeGeometry(h * 0.06, h * 0.45, 4), lam(mixc('#3e7a3a', '#7aa84a', r() * 0.6))); f.geometry.translate(0, h * 0.22, 0);
    f.position.copy(top); f.rotation.set(0, k / 8 * Math.PI * 2, 1.9 + r() * 0.3, 'YXZ'); f.scale.z = 0.25; g.add(f); }
  g.position.set(x, 0, z); return g;
}
/** A gable roof prism along x. */
function gable(w, h, len, m) {
  const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.lineTo(-w / 2, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false }); g.translate(0, 0, -len / 2); g.rotateY(Math.PI / 2);
  return new THREE.Mesh(g, m);
}
/** A row of apartment blocks along x at depth z (x0..x1), with windows (lit 0..1 = share glowing) and balconies. */
function blocks3d(x0, x1, z, { walls = ['#e8b98a', '#d99a6c', '#f0d0a0', '#c98a62', '#e6c4a0'], hmin = 10, hvar = 6, lit = 0, seed = 5, win = '#6a8ab0', skip = null } = {}) {
  const g = new THREE.Group(), r = rng(seed), litM = glowMat('#ffd98a'), winM = lam(win), shut = lam('#4a6a4a');
  for (let x = x0, i = 0; x < x1; i++) {
    const w = 9 + r() * 5, h = hmin + r() * hvar, c = walls[i % walls.length];
    if (skip && x + w > skip[0] && x < skip[1]) { x += w + 0.4; continue; }
    const b = box(w, h, 10, lam(c)); b.position.set(x + w / 2, h / 2, z - 5); g.add(b);
    const cor = box(w + 0.6, 0.6, 10.6, lam(mixc(c, '#3a2a2a', 0.35))); cor.position.set(x + w / 2, h + 0.3, z - 5); g.add(cor);
    for (let wy = 2.2; wy < h - 1.2; wy += 2.6) for (let wx = x + 1.2; wx < x + w - 1.2; wx += 2.2) {
      const on = r() < lit, wm = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.4), on ? litM : winM); wm.position.set(wx + 0.45, wy + 0.7, z + 0.02); g.add(wm);
      if (!on && r() < 0.35) for (const sd of [-1, 1]) { const sh = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 1.4), shut); sh.position.set(wx + 0.45 + sd * 0.7, wy + 0.7, z + 0.03); g.add(sh); }
      if (r() < 0.12 && wy > 3) { const bal = box(1.8, 0.15, 0.7, lam('#3a3236')); bal.position.set(wx + 0.45, wy, z + 0.35); g.add(bal); }
    }
    x += w + 0.4;
  }
  return g;
}
/** Milan's Duomo as a white Gothic silhouette: a wide front, a forest of spires, the Madonnina on the tallest one. */
function duomo3d({ c = '#f2ece4', lit = 0 } = {}) {
  const g = new THREE.Group(), m = lam(c), gold = lam('#f2c46b', { emissive: '#a07a2a', emissiveIntensity: 0.5 });
  const front = box(60, 30, 20, m); front.position.y = 15; g.add(front);
  const roof = gable(20, 10, 60, m); roof.position.y = 30; g.add(roof);
  for (let k = -6; k <= 6; k++) { const h = 10 + (6 - Math.abs(k)) * 1.6; const s = new THREE.Mesh(new THREE.ConeGeometry(0.9, h, 6), m); s.position.set(k * 4.8, 30 + h / 2, 10.2); g.add(s); }
  for (let k = -4; k <= 4; k++) { const s = new THREE.Mesh(new THREE.ConeGeometry(0.7, 7, 6), m); s.position.set(k * 6.8, 33, -6); g.add(s); }
  for (let k = -3; k <= 3; k++) { const b = box(2.2, 34, 2.4, lam(mixc(c, '#ffffff', 0.25))); b.position.set(k * 9.6, 17, 10.6); g.add(b);
    const sp = new THREE.Mesh(new THREE.ConeGeometry(1.3, 9, 6), m); sp.position.set(k * 9.6, 38.5, 10.6); g.add(sp); }
  for (const sd of [-1, 1]) for (let k = 0; k < 6; k++) { const s = new THREE.Mesh(new THREE.ConeGeometry(0.6, 6, 6), m); s.position.set(sd * 30.5, 32 + (k % 2), 8 - k * 4); g.add(s); }
  const tw = box(6, 22, 6, m); tw.position.set(0, 44, -2); g.add(tw);
  const sp = new THREE.Mesh(new THREE.ConeGeometry(2.4, 18, 8), m); sp.position.set(0, 64, -2); g.add(sp);
  const mad = new THREE.Mesh(new THREE.SphereGeometry(1.1, 8, 6), gold); mad.position.set(0, 74, -2); g.add(mad);
  for (let k = -2; k <= 2; k++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 10), lit ? glowMat('#ffd98a') : lam('#8a7a74')); d.position.set(k * 10, 7, 10.05); g.add(d); }
  return g;
}
/** St. Peter's basilica: the facade with columns and attic, the drum and dome with lantern (proportions softened). */
function stPeters({ c = '#efe2cc', domeC = '#d8dce2', tapestry = true, lit = 0 } = {}) {
  const g = new THREE.Group(), m = lam(c), dk = lam(mixc(c, '#5a4a3a', 0.3));
  const f = box(100, 38, 14, m); f.position.y = 19; g.add(f);
  const att = box(102, 5, 15, lam(mixc(c, '#ffffff', 0.15))); att.position.y = 40.5; g.add(att);
  const ped = gable(36, 7, 4, m); ped.rotation.y = 0; ped.position.set(0, 38, 7.5); ped.rotation.y = Math.PI / 2; ped.rotation.y = 0;
  const pedS = new THREE.Shape(); pedS.moveTo(-18, 0); pedS.lineTo(18, 0); pedS.lineTo(0, 7); pedS.lineTo(-18, 0);
  const pedM = new THREE.Mesh(new THREE.ExtrudeGeometry(pedS, { depth: 3, bevelEnabled: false }), m); pedM.position.set(0, 36, 6.8); g.add(pedM);
  for (let k = -5; k <= 5; k++) { const cl = cyl(1.2, 1.3, 30, lam(mixc(c, '#ffffff', 0.2)), 12); cl.position.set(k * 8.6 + (k ? Math.sign(k) * 0.4 : 0), 15, 8); g.add(cl); }
  for (let k = -4; k <= 4; k++) { if (Math.abs(k) < 1) continue; const d = new THREE.Mesh(new THREE.PlaneGeometry(4, 8, 1, 1), dk); d.position.set(k * 8.6 + 4.3 * Math.sign(k), 6, 7.06); g.add(d); }
  for (let k = -6; k <= 6; k++) { const st = box(1, 3, 1, lam('#e8e0d4')); st.position.set(k * 7.8, 44.5, 6); g.add(st); }
  const loggia = new THREE.Mesh(new THREE.PlaneGeometry(6, 7), lit ? glowMat('#ffd9a0') : dk); loggia.position.set(0, 27, 7.07); g.add(loggia);
  if (tapestry) { const tp = new THREE.Mesh(new THREE.PlaneGeometry(10, 15), new THREE.MeshLambertMaterial({ map: tapestryTex(), emissive: '#3a3020', emissiveIntensity: 0.25 })); tp.position.set(0, 13.5, 8.6); g.add(tp); }
  const drum = cyl(16, 16, 12, m, 32); drum.position.set(0, 52, -40); g.add(drum);
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, cl = cyl(0.6, 0.6, 11, dk, 6); cl.position.set(Math.cos(a) * 16.4, 52, -40 + Math.sin(a) * 16.4); g.add(cl); }
  const dome = new THREE.Mesh(new THREE.SphereGeometry(16, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2), lam(domeC)); dome.scale.y = 1.35; dome.position.set(0, 58, -40); g.add(dome);
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, rib = new THREE.Mesh(new THREE.TorusGeometry(16.05, 0.25, 4, 18, Math.PI / 2), lam('#f0ece4')); rib.position.set(0, 58, -40); rib.scale.y = 1.35; rib.rotation.set(0, -a, 0); rib.rotation.order = 'YXZ'; rib.rotateX(0); g.add(rib); }
  const lan = cyl(2.4, 2.8, 6, m, 12); lan.position.set(0, 82, -40); g.add(lan);
  const lc = new THREE.Mesh(new THREE.ConeGeometry(2.4, 4, 12), lam(domeC)); lc.position.set(0, 87, -40); g.add(lc);
  const cr = box(0.4, 3, 0.4, lam('#f2c46b')); cr.position.set(0, 90.5, -40); g.add(cr);
  for (const sd of [-1, 1]) { const sd2 = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), lam(domeC)); sd2.scale.y = 1.3; sd2.position.set(sd * 40, 40, -24); g.add(sd2); }
  return g;
}
/** Bernini's colonnade: two arms of columns curving out from the facade, with an entablature and statues. */
function colonnade({ c = '#ece2d0', z0 = -340, z1 = -110, rx = 118, xEnd = 64 } = {}) {
  const g = new THREE.Group(), m = lam(c), st = lam('#e4dccc');
  const N = 90, colG = new THREE.CylinderGeometry(0.85, 0.95, 12, 10); colG.translate(0, 6, 0);
  const cols = new THREE.InstancedMesh(colG, m, N * 4), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s1 = new THREE.Vector3(1, 1, 1), p = new THREE.Vector3();
  let i = 0;
  const zc = (z0 + z1) / 2, rz = (z1 - z0) / 2;
  for (const sd of [-1, 1]) for (let k = 0; k < N; k++) {
    const a = -Math.PI / 2 + (k / (N - 1)) * Math.PI;   // from the facade end to the front end
    const x = sd * (xEnd + (rx - xEnd) * Math.cos(a)), z = zc + rz * Math.sin(a);
    for (const off of [0, 4.2]) { p.set(x + sd * off, 0, z); m4.compose(p, q, s1); if (i < N * 4) cols.setMatrixAt(i++, m4); }
    if (k % 3 === 0) { const sb = box(4, 2.4, 3.2, m); sb.position.set(x + sd * 2.1, 13.2, z); g.add(sb); const sta = box(0.8, 2.2, 0.8, st); sta.position.set(x + sd * 2.1, 15.5, z); g.add(sta); }
  }
  cols.count = i; g.add(cols);
  return g;
}
/** Egyptian obelisk with a cross on top. */
function obelisk3d(x, z) {
  const g = new THREE.Group(), m = lam('#d8c8b0');
  const base = box(4, 3, 4, lam('#c8b8a0')); base.position.y = 1.5; g.add(base);
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 22, 4), m); sh.rotation.y = Math.PI / 4; sh.position.y = 14; g.add(sh);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.6, 4), m); tip.rotation.y = Math.PI / 4; tip.position.y = 25.8; g.add(tip);
  const cr = box(0.18, 1.6, 0.18, lam('#c9a24a')); cr.position.y = 27.4; g.add(cr); const cb = box(0.9, 0.18, 0.18, cr.material); cb.position.y = 27.6; g.add(cb);
  g.position.set(x, 0, z); return g;
}
/** Westminster from across the Thames: the long palace, the Elizabeth Tower (Big Ben) with lit clock faces, the London Eye. */
function westminster() {
  const g = new THREE.Group(), m = lam('#c8b48a'), dk = lam('#9a8a6a'), roof = lam('#6a6a74');
  const pal = box(170, 14, 14, m); pal.position.set(-10, 7, 0); g.add(pal);
  for (let k = -16; k <= 16; k++) { const t = box(1.6, 18 + (k % 3 === 0 ? 4 : 0), 1.6, dk); t.position.set(-10 + k * 5.2, 9, 7.2); g.add(t); const c = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.6, 4), roof); c.position.set(-10 + k * 5.2, 19.5 + (k % 3 === 0 ? 4 : 0), 7.2); g.add(c); }
  const vt = box(14, 46, 14, m); vt.position.set(-86, 23, 0); g.add(vt);
  const et = box(7, 52, 7, m); et.position.set(80, 26, 4); g.add(et);
  const belfry = box(8, 10, 8, dk); belfry.position.set(80, 57, 4); g.add(belfry);
  const sp = new THREE.Mesh(new THREE.ConeGeometry(5, 14, 4), lam('#4a5058')); sp.rotation.y = Math.PI / 4; sp.position.set(80, 69, 4); g.add(sp);
  const face = new THREE.Mesh(new THREE.CircleGeometry(2.6, 24), glowMat('#fff3d0')); face.position.set(80, 48, 7.6); g.add(face);
  const fr = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.1, 24), lam('#c9a24a')); fr.position.set(80, 48, 7.62); g.add(fr);
  const eye = new THREE.Group(), em = lam('#e8eef4');
  const rim = new THREE.Mesh(new THREE.TorusGeometry(30, 0.5, 6, 64), em); eye.add(rim);
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, s = box(0.18, 30, 0.18, em); s.position.set(Math.cos(a) * 15, Math.sin(a) * 15, 0); s.rotation.z = a - Math.PI / 2; eye.add(s);
    const pod = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), em); pod.scale.set(1.4, 1, 1); pod.position.set(Math.cos(a) * 30, Math.sin(a) * 30, 0); eye.add(pod); }
  const legs = box(1, 34, 1, em); legs.position.set(-8, -16, 0); legs.rotation.z = -0.3; eye.add(legs); const legs2 = legs.clone(); legs2.position.x = 8; legs2.rotation.z = 0.3; eye.add(legs2);
  eye.position.set(-62, 32, 40); g.add(eye); g.userData.eye = eye;
  return g;
}
/** A white Italian seaside town on a hill with a church and bell tower. */
function seaTown(seed = 9, lit = 0) {
  const g = new THREE.Group(), r = rng(seed);
  for (let k = 0; k < 40; k++) {
    const x = (r() - 0.5) * 120, y = Math.max(0, 26 - Math.abs(x) * 0.35) * r() * 0.9, w = 4 + r() * 3, h = 3 + r() * 3;
    const b = box(w, h, 4, lam(mixc('#f6f0e6', '#f0c8a0', r() * 0.5))); b.position.set(x, y + h / 2, (r() - 0.5) * 20); g.add(b);
    const rf = new THREE.Mesh(new THREE.ConeGeometry(w * 0.72, 1.4, 4), lam(mixc('#c0623e', '#9a4a32', r()))); rf.rotation.y = Math.PI / 4; rf.scale.z = 0.7; rf.position.set(x, y + h + 0.6, b.position.z); g.add(rf);
  }
  const ch = box(12, 10, 10, lam('#fbf6ee')); ch.position.set(6, 30, -4); g.add(ch);
  const chr = gable(10.4, 4, 12.4, lam('#b8603e')); chr.rotation.y = Math.PI / 2; chr.position.set(6, 35, -4); g.add(chr);
  const bt = box(4, 18, 4, lam('#fbf6ee')); bt.position.set(-2, 34, -4); g.add(bt);
  const bc = new THREE.Mesh(new THREE.ConeGeometry(3.2, 4, 4), lam('#b8603e')); bc.rotation.y = Math.PI / 4; bc.position.set(-2, 45, -4); g.add(bc);
  return g;
}
/** The Sanctuary of the Spoliation (Santa Maria Maggiore, Assisi): a plain Romanesque front with a rose window and a bell tower. */
function spoliation3d({ lit = 0 } = {}) {
  const g = new THREE.Group(), m = lam('#ecd8c4'), dk = lam('#b89a86');
  const f = box(18, 16, 22, m); f.position.y = 8; g.add(f);
  const s = new THREE.Shape(); s.moveTo(-9, 0); s.lineTo(9, 0); s.lineTo(0, 5); s.lineTo(-9, 0);
  const pd = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 22, bevelEnabled: false }), m); pd.position.set(0, 16, -11); g.add(pd);
  const rose = new THREE.Mesh(new THREE.CircleGeometry(2.3, 24), lit ? glowMat('#ffd9a0') : lam('#7a5a4a')); rose.position.set(0, 11.5, 11.05); g.add(rose);
  const rr = new THREE.Mesh(new THREE.RingGeometry(2.3, 2.9, 24), dk); rr.position.set(0, 11.5, 11.06); g.add(rr);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 5.4), lit ? glowMat('#ffc880') : lam('#5a3a2a')); door.position.set(0, 2.7, 11.05); g.add(door);
  const arch = new THREE.Mesh(new THREE.RingGeometry(1.7, 2.3, 16, 1, 0, Math.PI), dk); arch.position.set(0, 5.4, 11.07); g.add(arch);
  const tw = box(5, 24, 5, m); tw.position.set(12, 12, -6); g.add(tw);
  for (const dx of [-1, 1]) { const op = new THREE.Mesh(new THREE.PlaneGeometry(1, 2.4), lam('#4a3430')); op.position.set(12 + dx * 1.1, 21, -3.45); g.add(op); }
  const tr = new THREE.Mesh(new THREE.ConeGeometry(3.8, 3, 4), lam('#b8603e')); tr.rotation.y = Math.PI / 4; tr.position.set(12, 25.5, -6); g.add(tr);
  return g;
}
/** A white parish church with blue trim and two towers (Campo Grande, Brazil). */
function parishBR() {
  const g = new THREE.Group(), m = lam('#fbf8f0'), bl = lam('#3a78b8');
  const n = box(16, 12, 26, m); n.position.y = 6; g.add(n);
  const s = new THREE.Shape(); s.moveTo(-8, 0); s.lineTo(8, 0); s.lineTo(0, 5); s.lineTo(-8, 0);
  const pd = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }), m); pd.position.set(0, 12, 12.5); g.add(pd);
  for (const sd of [-1, 1]) { const t = box(4.6, 20, 4.6, m); t.position.set(sd * 9.8, 10, 11); g.add(t); const c = new THREE.Mesh(new THREE.ConeGeometry(3, 4, 4), bl); c.rotation.y = Math.PI / 4; c.position.set(sd * 9.8, 22, 11); g.add(c);
    const cr = box(0.25, 2, 0.25, lam('#c9a24a')); cr.position.set(sd * 9.8, 25, 11); g.add(cr); }
  const band = box(16.2, 0.8, 26.2, bl); band.position.y = 12; g.add(band);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 5.6), lam('#6a3a2a')); door.position.set(0, 2.8, 13.06); g.add(door);
  const win = new THREE.Mesh(new THREE.CircleGeometry(1.6, 20), glowMat('#ffe0a0')); win.position.set(0, 9, 13.06); g.add(win);
  return g;
}

// ------------------------------------------------------------------ one stage: sky, light, ground, camera move
const LIGHTPOS = { l: [-80, 30, -60], r: [80, 30, -60], back: [0, 25, -100], top: [0, 70, -20], front: [10, 30, 60] };
/** Common set-up: sky + fog + lights + camera; returns the parts and an update() for the scene's move (anglia() moves). */
function stage(P, mode) {
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, P.fogNear ?? 140, P.fogFar ?? 1800);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const VL = (window.BG3D_VARS?.light || {})[mode] || {};
  const LK = { color: VL.key || P.key[0], int: P.key[1], pos: LIGHTPOS[VL.from] || P.key[2] };
  const key = new THREE.DirectionalLight(LK.color, LK.int); key.position.set(...LK.pos); scene.add(key);
  const cam = camera(0, CAMY, 0, P.pitch ?? 0);
  if (P.stars) scene.add(stars(P.stars, 13, 0.8, { el0: 0.06, el1: 0.4, spread: 2.2 }));
  let sunGlow = null;
  if (P.sun) {
    const [sx, sy, op, size = 0] = P.sun;
    sunGlow = sprite(warm, 1700, op * 0.85); sunGlow.position.copy(atScreen(cam, sx, sy, 2500)); scene.add(sunGlow);
    if (size) { const d = new THREE.Sprite(new THREE.SpriteMaterial({ map: disc, transparent: true, depthWrite: false, fog: false })); const sz = size * 2500 / (H / 2) * TH * 2; d.scale.set(sz, sz, 1); d.position.copy(atScreen(cam, sx, sy, 2500)); scene.add(d); }
  }
  const rp = P.rays;
  const rays = rp && rp.op > 0 ? godRays(cam, rp.at[0], rp.at[1], rp.dist ?? 400, { n: rp.n ?? 10, len: rp.len ?? 1500, width: rp.width ?? 60, spread: rp.spread ?? 1, dir: rp.dir ?? 0, op: rp.op, seed: mode.length, color: rp.color }) : null;
  if (rays) scene.add(rays.group);
  const clouds = (P.clouds || []).map(([sx, sy, d, s], k) => {
    const c = cumulus(90 + k * 3 + mode.length, { lit: P.cloudLit || '#fff8ee', shade: P.cloudShade || '#c4c8dc', glow: P.cloudGlow ?? 0.55, op: 1 });
    c.position.copy(atScreen(cam, sx, sy, d)); c.scale.setScalar(s * d / 900); c.lookAt(cam.position); scene.add(c); return [c, c.position.x, k];
  });
  const front = new THREE.Scene(); front.fog = scene.fog;
  front.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const fkey = new THREE.DirectionalLight(LK.color, LK.int); fkey.position.set(...LK.pos); front.add(fkey);
  const air = P.air ? particles(P.air, { seed: mode.length * 5 + 1, n: 320 }) : null;
  if (air) scene.add(air.points);
  const anim = [];   // extra per-frame updates from the set (trams, water, crowds)
  let R = { move: P.move, amt: 0.07, ox: W / 2, oy: H / 2, plane: 20 }, dirF = new THREE.Vector3(0, 0, -1);
  const P0 = cam.position.clone();
  const rig = (o) => {
    R = { ...R, ...o };
    const f0 = (H / 2) / Math.tan(FOV * Math.PI / 360), z = R.plane;
    dirF = cam.localToWorld(new THREE.Vector3((R.ox - W / 2) / f0 * z, -(R.oy - H / 2) / f0 * z, -z)).sub(cam.position).normalize();
  };
  const update = (t, p) => {
    let ry = 0, rz = 0;
    const mv = R.move || P.move, D = R.plane, A = R.amt / 0.07;
    const toward = (u) => cam.position.copy(P0).addScaledVector(dirF, u);
    if (mv === 'push-fast') toward(1.6 * A * p);
    else if (mv === 'push') toward(1.3 * A * p);
    else if (mv === 'pull') toward(1.4 * A * (1 - p));
    else if (mv === 'pan-r' || mv === 'pan-l') { const sg = mv === 'pan-r' ? 1 : -1; cam.position.set(P0.x + sg * (-0.75 + 1.5 * p) * A, P0.y, P0.z - 0.35 * A); }
    else if (mv === 'tilt-up') { cam.position.set(P0.x, P0.y + 0.55 * p * A, P0.z); cam.setViewOffset(W, H, 0, -60 * p * A, W, H); }
    else if (mv === 'tilt-down') { cam.position.set(P0.x, P0.y + 0.55 * (1 - p) * A, P0.z); cam.setViewOffset(W, H, 0, -60 * (1 - p) * A, W, H); }
    else if (mv === 'dolly') { const z = 9 * p; cam.position.set(P0.x, P0.y, P0.z + z); cam.fov = 2 * Math.atan(TH * D / (D + z)) * 180 / Math.PI; cam.updateProjectionMatrix(); }
    else if (mv === 'drift-l' || mv === 'drift-r') { const sg = mv === 'drift-r' ? 1 : -1; cam.position.set(P0.x + sg * (-0.4 + 0.8 * p) * A, P0.y, P0.z - 0.15 * A); }
    else if (mv === 'arc-l' || mv === 'arc-r') { const sg = mv === 'arc-r' ? 1 : -1, a = sg * (-0.05 + 0.1 * p) * A; cam.position.set(P0.x + D * Math.sin(a), P0.y, P0.z - D + D * Math.cos(a) - 0.3 * A); ry = a; rz = sg * (p - 0.5) * 0.016; }
    if (rays) rays.update(t, P.swell ? Math.min(1, 0.25 + t * 0.1) : 1);
    if (sunGlow) sunGlow.material.opacity = P.sun[2] * 0.85 * (0.94 + 0.06 * Math.sin(t * 0.7));
    clouds.forEach(([c, x, j]) => { c.position.x = x + t * (1.2 + (j % 3) * 0.5) * (j % 2 ? 1 : -1); });
    if (air) air.update(t);
    anim.forEach((fn) => fn(t, p));
    return { ry, rz };
  };
  return { scene, front, cam, LK, anim, rig, update, rays };
}
/** The near ground, by kind: 'grass' (field with tufts and a lit rim), 'paving' (stone square / street), 'floor' (planks or
 * tiles, for interiors), 'sand' (a beach). len = how far it runs; front tufts only on grass. */
function nearGround(S, P, mode) {
  const { scene, front } = S, G = P.ground || { kind: 'grass' };
  const len = G.len ?? 48, z0 = 20, zFar = z0 - len;
  let tex, color = G.color || P.near || '#7a9a52';
  if (G.kind === 'grass') { tex = groundTex(color, ['#a8742e', '#8a5a2a', '#c8963e'], mode.length, true); tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(1400 / 14, 1); }
  else if (G.kind === 'paving') { tex = pavingTex(color, G.line || 'rgba(60,50,50,.28)', mode.length, { cell: G.cell ?? 64, cobble: !!G.cobble }); tex.repeat.set(1400 / (G.tile ?? 6), len / (G.tile ?? 6)); }
  else if (G.kind === 'floor') { tex = G.tiles ? checkerTex(G.tiles[0], G.tiles[1]) : planksTex(color, mode.length); tex.repeat.set(G.tiles ? 60 / 3 : 60 / 8, G.tiles ? len / 3 : len / 8); }
  else if (G.kind === 'sand') { tex = groundTex(color, ['#e8d6a8', '#d8c090', '#f0e0b8'], mode.length, false); tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(1400 / 14, 1); }
  const w = G.kind === 'floor' ? 60 : 1400;
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(w, len, 4, 4), lam('#ffffff', { map: tex })); pl.rotation.x = -Math.PI / 2; pl.position.set(0, 0, z0 - len / 2); scene.add(pl);
  if (G.kind === 'grass' && G.rim !== false) {
    const rim = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.9), lam(mixc(color, '#fff0c0', 0.35), { emissive: mixc(color, '#fff0c0', 0.3), emissiveIntensity: 0.25 }));
    rim.rotation.x = -Math.PI / 2; rim.position.set(0, 0.02, zFar + 0.45); scene.add(rim);
    const bank = new THREE.Mesh(new THREE.PlaneGeometry(w, 14), lam(mixc(color, '#3a3020', 0.35))); bank.position.set(0, -7, zFar); scene.add(bank);
  }
  if (G.kind === 'grass') {
    const gc = [mixc(color, '#1e2a10', 0.28).getStyle(), mixc(color, '#7a8a40', 0.3).getStyle(), mixc(color, '#8a7a40', 0.32).getStyle()];
    scene.add(tufts3d(420, { x: 16, z0: -20.5, z1: zFar + 1, h: [0.16, 0.3], colors: gc, seed: 3 + mode.length }));
    front.add(tufts3d(260, { x: 8.5, z0: -9, z1: -16.8, h: [0.08, 0.16], colors: gc, seed: 11 + mode.length, blades: 5, r: 0.012 }));
    front.add(tufts3d(110, { x: 8.5, z0: -17.4, z1: -19.4, h: [0.1, 0.18], colors: gc, seed: 21 + mode.length, blades: 4, r: 0.014 }));
    S.hasFront = true;
  }
  if (G.kind === 'sand') {   // the waterline with foam, just behind the characters
    const foam = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1.2), lam('#ffffff', { emissive: '#ffffff', emissiveIntensity: 0.3 })); foam.rotation.x = -Math.PI / 2; foam.position.set(0, 0.03, zFar + 0.6); scene.add(foam);
    S.anim.push((t) => { foam.position.z = zFar + 0.6 + Math.sin(t * 0.9) * 0.5; });
  }
  return { zFar };
}

// ------------------------------------------------------------------ the sets
const SKY = {
  day: [[0, '#3e6aae'], [0.3, '#7aa4d6'], [0.48, '#c4d8ec'], [0.5, '#f2e4cc'], [1, '#f2e4cc']],
  morning: [[0, '#4a78b8'], [0.32, '#8ab2dc'], [0.47, '#d8e4ee'], [0.5, '#f6e6cc'], [1, '#f6e6cc']],
  gold: [[0, '#a8563e'], [0.25, '#d8805a'], [0.42, '#f0a86e'], [0.5, '#f8d494'], [1, '#fae0a8']],
  dusk: [[0, '#1e2244'], [0.24, '#4e3e6e'], [0.4, '#a86a7e'], [0.49, '#f0a07a'], [0.52, '#f6c08e'], [1, '#f6c08e']],
  night: [[0, '#0a0e26'], [0.3, '#16204a'], [0.46, '#2e3a6a'], [0.5, '#4a4a76'], [1, '#4a4a76']],
  grey: [[0, '#4a5068'], [0.3, '#7a8098'], [0.47, '#b8b4b8'], [0.5, '#d8ccc0'], [1, '#d8ccc0']],
  mourn: [[0, '#1a1a34'], [0.28, '#3a3456'], [0.44, '#7a6a80'], [0.5, '#c09a8e'], [1, '#c09a8e']],
  glory: [[0, '#141842'], [0.2, '#2e2c62'], [0.36, '#6a4a7e'], [0.46, '#d8827a'], [0.5, '#f8be86'], [0.53, '#fcd8a0'], [1, '#fcd8a0']],
  summer: [[0, '#2e6ab8'], [0.3, '#5a96d6'], [0.47, '#bcdcf0'], [0.5, '#eaf2f4'], [1, '#eaf2f4']],
  brazil: [[0, '#3a74c0'], [0.3, '#76aee0'], [0.46, '#cfe4ec'], [0.5, '#f8e2b8'], [1, '#f8e2b8']],
};
const HEMI = { day: ['#fff4dc', '#5a6a5a', 1.45], warm: ['#ffe8c8', '#5a4a3a', 1.35], dusk: ['#ffd8c0', '#3a3440', 1.2], night: ['#9aa8e0', '#1a1a2a', 0.9], grey: ['#e8e4e8', '#4a4a50', 1.25], room: ['#fff2e0', '#6a5a4a', 1.3] };

/** St. Peter's Square. modes: hook | canon (full crowd, morning / gold), youth (Pope Francis and young people: fewer people),
 * mourn (April 2025: dusk, a few people with candles). */
export function square(mode = 'hook') {
  const M = {
    hook: { sky: SKY.morning, fog: '#e4dccc', hemi: HEMI.day, key: ['#fff0d0', 1.5, [60, 40, -40]], sun: [1500, 300, 0.7], crowd: 2600, clouds: [[260, 200, 1300, 10], [1700, 160, 1300, 12], [1250, 330, 1400, 6]], air: null },
    canon: { sky: SKY.gold, fog: '#f0c890', hemi: HEMI.warm, key: ['#ffc888', 1.6, [-60, 30, -80]], sun: [420, 360, 0.95, 60], crowd: 2600, rays: { at: [420, 360], op: 0.08, spread: 1.6, dir: 0.3 }, clouds: [[160, 180, 1300, 9], [1640, 220, 1300, 10]], air: 'gold' },
    youth: { sky: SKY.day, fog: '#dcd8cc', hemi: HEMI.day, key: ['#fff0d0', 1.45, [60, 40, -40]], sun: [1600, 260, 0.6], crowd: 900, clouds: [[300, 220, 1300, 10], [1500, 180, 1300, 11]], air: null },
    mourn: { sky: SKY.mourn, fog: '#9a8a90', fogNear: 80, fogFar: 900, hemi: HEMI.dusk, key: ['#ffb890', 1.0, [-40, 20, -80]], crowd: 260, candles: true, stars: 40, air: null },
  }[mode];
  const P = { ...M, move: 'push', ground: { kind: 'paving', color: mode === 'mourn' ? '#8a7a80' : '#d8cab4', tile: 5, cell: 64, len: 520 } };
  const S = stage(P, 'sq_' + mode), { scene, cam } = S;
  nearGround(S, P, 'sq_' + mode);
  const sp = stPeters({ lit: mode === 'mourn' ? 1 : 0, tapestry: mode === 'hook' || mode === 'canon' }); sp.position.set(16, 0, -400); sp.scale.setScalar(1); scene.add(sp);
  scene.add(colonnade({ z0: -380, z1: -90, rx: 120, xEnd: 66 }).translateX(16));
  scene.add(obelisk3d(-26, -150));
  // fountains (two basins with a spout glow)
  for (const x of [-80, 100]) { const fb = cyl(5, 5.4, 1.2, lam('#cfc2ae'), 20); fb.position.set(x, 0.6, -170); scene.add(fb); const sp2 = cyl(0.8, 1.2, 5, lam('#d8ccba'), 10); sp2.position.set(x, 3, -170); scene.add(sp2); const wt = sprite(cool, 7, 0.5); wt.position.set(x, 5.6, -170); scene.add(wt); }
  if (M.crowd) {
    const cr = crowd3d(M.crowd, (r) => { const x = (r() * 2 - 1) * 120, z = -40 - r() * 300; const e = (x - 16) ** 2 / 120 ** 2 + (z + 235) ** 2 / 150 ** 2; return e < 1 && z < -36 && !(Math.abs(x + 26) < 4 && Math.abs(z + 150) < 4) ? [x, z] : null; }, { seed: mode.length + 3 });
    scene.add(cr.group); S.anim.push((t) => { if (Math.floor(t * 10) % 2 === 0) cr.update(t, 0.04); });
  }
  if (M.candles) { const r = rng(7); for (let k = 0; k < 60; k++) { const c = sprite(warm, 1.6, 0.9, true); c.position.set((r() - 0.5) * 70, 1.3, -36 - r() * 120); scene.add(c); S.anim.push((t) => { c.material.opacity = 0.7 + 0.25 * Math.sin(t * 6 + k * 1.7); }); } }
  return { scene: S.scene, cam: S.cam, front: S.hasFront ? S.front : undefined, rig: S.rig, update: S.update };
}
/** A Milan street. modes: day (blue sky, the tram), dusk (lit windows, the Duomo pink), night (lamps, homeless on the sidewalk),
 * evening (warm windows, early dark). */
export function milan(mode = 'day') {
  const M = {
    day: { sky: SKY.day, fog: '#d8dce4', hemi: HEMI.day, key: ['#fff0d4', 1.45, [70, 40, -40]], lit: 0.05, lamps: false, tram: true, clouds: [[260, 180, 1400, 9], [1500, 140, 1400, 11], [1000, 300, 1500, 6]] },
    dusk: { sky: SKY.dusk, fog: '#b48a90', hemi: HEMI.dusk, key: ['#ffb880', 1.25, [-80, 20, -100]], lit: 0.45, lamps: true, sun: [1200, 520, 0.8], stars: 30, clouds: [[220, 200, 1400, 9], [1700, 230, 1400, 10]] },
    night: { sky: SKY.night, fog: '#2a2e4a', fogNear: 60, fogFar: 900, hemi: HEMI.night, key: ['#ffd8a8', 0.8, [40, 30, 40]], lit: 0.55, lamps: true, stars: 90 },
    evening: { sky: [[0, '#1a2650'], [0.3, '#2e4078'], [0.46, '#6a6a96'], [0.5, '#b88a8a'], [1, '#b88a8a']], fog: '#6a6080', fogNear: 80, fogFar: 1100, hemi: HEMI.dusk, key: ['#ffc898', 1.0, [-60, 20, -80]], lit: 0.6, lamps: true, stars: 40 },
  }[mode];
  const P = { ...M, move: 'pan-r', ground: { kind: 'paving', color: mode === 'night' ? '#6a6672' : '#c8bcae', tile: 4, cell: 64, len: 46 } };
  const S = stage(P, 'mi_' + mode), { scene } = S;
  nearGround(S, P, 'mi_' + mode);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(1400, 30), lam(mode === 'night' ? '#2e2e3a' : '#5a5a64')); road.rotation.x = -Math.PI / 2; road.position.set(0, -0.02, -41); scene.add(road);
  for (let k = -30; k <= 30; k++) { const dash = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.3), lam('#e8e4d8')); dash.rotation.x = -Math.PI / 2; dash.position.set(k * 7, 0.01, -41); scene.add(dash); }
  for (const z of [-38, -44]) { const rail = new THREE.Mesh(new THREE.PlaneGeometry(1400, 0.15), lam('#8a8a94')); rail.rotation.x = -Math.PI / 2; rail.position.set(0, 0.02, z); scene.add(rail); }
  const far = new THREE.Mesh(new THREE.PlaneGeometry(1400, 400), lam(mode === 'night' ? '#4a4652' : '#b8ac9e')); far.rotation.x = -Math.PI / 2; far.position.set(0, -0.03, -256); scene.add(far);
  scene.add(blocks3d(-160, 200, -60, { lit: M.lit, seed: 5, skip: [-14, 30], hmin: 11, hvar: 7 }));
  scene.add(blocks3d(-260, 300, -150, { lit: M.lit, seed: 9, hmin: 16, hvar: 10, skip: [-40, 70], walls: ['#d8b898', '#c8a088', '#e0c8a8', '#b89078'] }));
  const dm = duomo3d({ c: mode === 'dusk' ? '#f0d0c8' : mode === 'night' ? '#b8b8d0' : '#f4eee6', lit: mode === 'day' ? 0 : 1 }); dm.traverse((o) => { if (o.material && o.material.emissive) { o.material = o.material.clone(); o.material.emissive.set(mode === 'night' ? '#3a3a5a' : '#6a6058'); o.material.emissiveIntensity = 0.35; } }); dm.position.set(30, 0, -820); dm.scale.setScalar(1.5); scene.add(dm);
  for (let k = -6; k <= 6; k++) { scene.add(lamp3d(k * 16 + 4, -28, M.lamps)); }
  for (let k = -5; k <= 5; k++) scene.add(tree3d(k * 22 - 8, -52, 8, k + 20, mode === 'night' ? '#2e4a3a' : '#5a8a46'));
  if (M.tram) {   // an orange Milan tram gliding along the far rails
    const tram = new THREE.Group(), tm = lam('#e88a2a'), wm = lam('#4a5a6a');
    const body = box(16, 3.2, 2.6, tm); body.position.y = 2.2; tram.add(body);
    const roof = box(15, 0.5, 2.4, lam('#d8d4cc')); roof.position.y = 4.0; tram.add(roof);
    for (let k = -6; k <= 6; k += 2) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.2), wm); wn.position.set(k, 2.8, 1.31); tram.add(wn); }
    const pant = box(0.1, 1.4, 0.1, lam('#2a2a2a')); pant.position.set(0, 4.9, 0); pant.rotation.z = 0.5; tram.add(pant);
    tram.position.set(-60, 0, -44); scene.add(tram);
    S.anim.push((t) => { tram.position.x = -70 + t * 6; });
  }
  return { scene: S.scene, cam: S.cam, front: undefined, rig: S.rig, update: S.update };
}
/** London: the Thames at Westminster seen from the South Bank, soft morning. */
export function london() {
  const P = { sky: [[0, '#5a78a8'], [0.3, '#90a8c8'], [0.47, '#d0d8e0'], [0.5, '#ece4d8'], [1, '#ece4d8']], fog: '#d4d4d8', hemi: HEMI.grey, key: ['#fff0dc', 1.3, [-60, 40, -60]],
    sun: [480, 330, 0.55], clouds: [[220, 170, 1400, 10], [900, 120, 1500, 12], [1700, 210, 1400, 9]], move: 'pull', ground: { kind: 'paving', color: '#b8aea4', tile: 4, len: 48 } };
  const S = stage(P, 'london'), { scene } = S;
  nearGround(S, P, 'london');
  const wall = box(1400, 1.0, 0.6, lam('#8a7e74')); wall.position.set(0, 0.5, -27.6); scene.add(wall);
  for (let k = -40; k <= 40; k++) { const p = cyl(0.06, 0.06, 1.2, lam('#2a3a4a'), 5); p.position.set(k * 2, 1.6, -27.6); scene.add(p); }
  const rail = box(1400, 0.08, 0.08, lam('#2a3a4a')); rail.position.set(0, 2.2, -27.6); scene.add(rail);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(1400, 300), lam('#6a7e8e')); water.rotation.x = -Math.PI / 2; water.position.set(0, -1.6, -164); scene.add(water);
  const r = rng(4), st = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512); for (let k = 0; k < 90; k++) { g.fillStyle = `rgba(255,250,240,${0.1 + r() * 0.3})`; g.fillRect(r() * 256, r() * 512, 12 + r() * 50, 2 + r() * 2); } });
  st.wrapS = st.wrapT = THREE.RepeatWrapping; st.repeat.set(30, 3);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(1400, 300), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: 0.4, depthWrite: false })); sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, -1.55, -164); scene.add(sheen);
  S.anim.push((t) => { st.offset.x = t * 0.01; });
  const wm = westminster(); wm.position.set(-20, -1.6, -330); scene.add(wm);
  const bank = new THREE.Mesh(new THREE.PlaneGeometry(1400, 400), lam('#7a8a6a')); bank.rotation.x = -Math.PI / 2; bank.position.set(0, -1.5, -520); scene.add(bank);
  scene.add(blocks3d(-500, 500, -430, { lit: 0, seed: 12, hmin: 14, hvar: 14, walls: ['#c8c0b8', '#b8a898', '#d8d0c8', '#a89888'], skip: [-40, 140] }));
  return { scene: S.scene, cam: S.cam, front: undefined, rig: S.rig, update: S.update };
}
/** An interior: back wall with a window view, side walls, a floor; modes for the Acutis home, Carlo's bedroom and hospital rooms. */
export function room(mode = 'living') {
  const M = {
    living:   { wall: '#e8d4b4', trim: '#b89470', floor: '#a8784e', view: [SKY.day, { skyline: 'city', ink: '#9aa4b8' }], hemi: HEMI.room, key: ['#fff0d4', 1.2, [30, 30, 40]], glow: [[-6, 6, -33, 18, 0.45]], frames: true, cross: true },
    kitchen:  { wall: '#f0e0c0', trim: '#c8a070', floor: '#b88a5a', view: [SKY.morning, { skyline: 'trees', ink: '#7a9a6a' }], hemi: HEMI.room, key: ['#fff2d8', 1.25, [30, 30, 40]], glow: [[-6, 6, -33, 18, 0.5]], frames: true, cross: true },
    bedroom:  { wall: '#b8cce0', trim: '#7a90aa', floor: '#a0784e', view: [SKY.day, { skyline: 'city', ink: '#8a9ab4' }], hemi: HEMI.room, key: ['#fff4dc', 1.2, [30, 30, 40]], glow: [[-6, 6, -33, 18, 0.4]], posters: true, cross: true },
    study:    { wall: '#2e3a5e', trim: '#1e2844', floor: '#5a4030', view: [SKY.night, { skyline: 'city', ink: '#141a34', moon: true, starsN: 40, lit: 0.4 }], hemi: HEMI.night, key: ['#ffd8a0', 0.9, [20, 20, 40]], glow: [[5, 3.4, -24, 14, 0.55]], posters: true, cross: true },
    sick:     { wall: '#d8c4a8', trim: '#a88a6a', floor: '#8a6a4a', view: [SKY.grey, { skyline: 'city', ink: '#8a8a98' }], hemi: ['#f0e4d8', '#4a4040', 1.1], key: ['#e8e0e0', 0.9, [30, 30, 40]], glow: [], frames: true, cross: true },
    hospital: { wall: '#d8e4dc', trim: '#a8bcb4', floor: '#c8ccc8', tiles: ['#d8dcd8', '#c8ccc8'], view: [SKY.grey, { skyline: 'city', ink: '#9a9cac' }], hemi: ['#f0f4f4', '#5a6060', 1.25], key: ['#f4f8ff', 1.1, [30, 30, 40]], glow: [], hospital: true },
    hospNight:{ wall: '#3a4466', trim: '#2a3250', floor: '#4a5066', tiles: ['#4a5066', '#424860'], view: [SKY.night, { skyline: 'city', ink: '#101630', moon: true, starsN: 60, lit: 0.3 }], hemi: HEMI.night, key: ['#c8d8ff', 0.75, [40, 40, -40]], glow: [], hospital: true, rays: true },
    florence: { wall: '#e0e4dc', trim: '#b0b8b0', floor: '#c8ccc8', tiles: ['#d8dcd8', '#c8ccc8'], view: [SKY.dusk, { skyline: 'florence', ink: '#5a3e52', lit: 1 }], hemi: ['#f4e8e0', '#5a5060', 1.2], key: ['#ffd0b0', 1.1, [30, 30, 40]], glow: [], hospital: true },
    papal:    { wall: '#e8dcc4', trim: '#c9a24a', floor: '#8a5a3a', view: [SKY.day, { skyline: 'none' }], hemi: HEMI.room, key: ['#fff0d0', 1.25, [30, 30, 40]], glow: [[-6, 6, -33, 18, 0.4]], drapes: true, frames: true, cross: true },
  }[mode];
  const P = { sky: [[0, M.wall], [1, M.wall]], fog: M.wall, fogNear: 200, fogFar: 2000, hemi: M.hemi, key: M.key, move: 'push', air: M.rays ? 'dust' : null,
    ground: { kind: 'floor', color: M.floor, tiles: M.tiles, len: 56 } };
  const S = stage(P, 'room_' + mode), { scene, cam } = S;
  nearGround(S, P, 'room_' + mode);
  const back = -36, wm = lam(M.wall), tm = lam(M.trim);
  const bw = box(60, 16, 0.6, wm); bw.position.set(0, 8, back); scene.add(bw);
  for (const sd of [-1, 1]) { const sw = box(0.6, 16, 56, lam(mixc(M.wall, '#2a1c2a', 0.12))); sw.position.set(sd * 17, 8, back + 28); scene.add(sw); }
  const base = box(60, 0.6, 0.3, tm); base.position.set(0, 0.3, back + 0.45); scene.add(base);
  // the window: a view texture behind a frame with mullions
  const WX = mode === 'study' ? 7 : 6.5, WY = 6.2, WW = 9, WH = 6.4;
  const vt = viewTex(M.view[0], M.view[1]);
  const view = new THREE.Mesh(new THREE.PlaneGeometry(WW, WH), new THREE.MeshBasicMaterial({ map: vt, fog: false })); view.position.set(WX, WY, back + 0.32); scene.add(view);
  const fr = lam('#f6f2ea');
  for (const [w, h, x, y] of [[WW + 0.8, 0.4, 0, WH / 2 + 0.2], [WW + 0.8, 0.5, 0, -WH / 2 - 0.25], [0.4, WH, -WW / 2 - 0.2, 0], [0.4, WH, WW / 2 + 0.2, 0], [0.18, WH, 0, 0], [WW, 0.18, 0, 0.6]]) { const b = box(w, h, 0.3, fr); b.position.set(WX + x, WY + y, back + 0.45); scene.add(b); }
  const sill = box(WW + 1.4, 0.25, 0.9, fr); sill.position.set(WX, WY - WH / 2 - 0.45, back + 0.7); scene.add(sill);
  if (mode !== 'study' && mode !== 'hospNight') { const wg = sprite(mode === 'florence' ? warm : warm, 18, 0.28, true); wg.position.set(WX, WY, back + 1.5); scene.add(wg); }
  for (const sd of [-1, 1]) { const cu = box(1.6, WH + 2, 0.3, lam(M.hospital ? '#b8d0c8' : mode === 'papal' ? '#9a2030' : mixc(M.wall, '#c86a4a', 0.4))); cu.position.set(WX + sd * (WW / 2 + 1.2), WY + 0.4, back + 0.7); scene.add(cu); }
  if (M.cross) { const cm = lam('#7a5232'); const cv = box(0.28, 2.2, 0.15, cm); cv.position.set(-4.5, 8.6, back + 0.4); scene.add(cv); const ch = box(1.3, 0.28, 0.15, cm); ch.position.set(-4.5, 9.0, back + 0.4); scene.add(ch); }
  if (M.frames) [[-10, 6.5, 2.6, 3.2, '#6a8ab8'], [-1.5, 6, 2.2, 1.8, '#c89a5a'], [-13.5, 5.6, 1.8, 2.4, '#8aa870']].forEach(([x, y, w, h, c]) => { const f = box(w + 0.3, h + 0.3, 0.12, lam('#c9a24a')); f.position.set(x, y, back + 0.36); scene.add(f); const pc = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lam(c)); pc.position.set(x, y, back + 0.43); scene.add(pc); });
  if (M.posters) [[-10, 6.6, 2.6, 3.6, '#3a6ab0'], [-5.8, 6.2, 2.0, 2.8, '#cf3b3b'], [-14, 5.8, 2.2, 3.0, '#5a9a5a']].forEach(([x, y, w, h, c], k) => { const pc = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lam(c)); pc.position.set(x, y, back + 0.36); pc.rotation.z = (k - 1) * 0.03; scene.add(pc);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(w * 0.25, 16), lam('#f6f0e2')); dot.position.set(x, y + 0.3, back + 0.38); scene.add(dot); });
  if (M.hospital) {
    const panel = box(9, 0.9, 0.4, lam('#c8d4d0')); panel.position.set(-6, 5.2, back + 0.5); scene.add(panel);
    for (let k = 0; k < 4; k++) { const led = new THREE.Mesh(new THREE.CircleGeometry(0.15, 8), glowMat(k % 2 ? '#7ee08a' : '#ffd36a')); led.position.set(-9 + k * 1.2, 5.2, back + 0.72); scene.add(led); }
    const mon = box(2.6, 1.8, 0.4, lam('#3a4048')); mon.position.set(-11, 7.6, back + 0.6); scene.add(mon);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.4), glowMat('#1a3a2a')); scr.position.set(-11, 7.6, back + 0.82); scene.add(scr);
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.08), glowMat('#7ee08a')); line.position.set(-11, 7.6, back + 0.84); scene.add(line);
    S.anim.push((t) => { line.position.x = -12 + ((t * 0.7) % 1) * 2; line.scale.y = 1 + (Math.sin(t * 9) > 0.92 ? 6 : 0); });
  }
  if (M.drapes) for (const x of [-16, 16]) { const d = box(3, 14, 0.4, lam('#9a2030')); d.position.set(x * 0.9, 7, back + 0.6); scene.add(d); }
  (M.glow || []).forEach(([x, y, z, s, op]) => { const g = sprite(warm, s, op, true); g.position.set(x, y, z); scene.add(g); });
  let shafts = null;
  if (M.rays) {   // moonlight through the window that turns golden over the scene (the death scene)
    shafts = godRays(cam, 1340, 380, 30, { n: 8, len: 40, width: 2.4, spread: 0.55, dir: 0.5, op: 0.07, seed: 4, color: '#fff0c8' }); scene.add(shafts.group);
    const glo = sprite(warm, 20, 0, true); glo.position.set(WX, WY, back + 2); scene.add(glo);
    S.anim.push((t) => { shafts.update(t, Math.min(1, 0.3 + t * 0.12)); glo.material.opacity = Math.min(0.6, Math.max(0, (t - 3) * 0.1)); });
  }
  return { scene: S.scene, cam: S.cam, front: undefined, rig: S.rig, update: S.update };
}
/** A church nave: tiled floor, two rows of columns with arches, side windows, the apse with altar, candles and a glow.
 * modes: parish (First Communion, warm), adoration (dim, the monstrance's glow), hall (a parish hall / exhibition),
 * basilica (the upper church of St. Francis in Assisi: frescoed walls, blue starry vault). */
export function church(mode = 'parish') {
  const M = {
    parish: { wall: '#ead8bc', col: '#f2e6d0', tiles: ['#e8dcc8', '#b89a7a'], hemi: ['#fff0d8', '#6a5040', 1.25], key: ['#ffe0b0', 1.1, [0, 30, -80]], glow: 0.7, fresco: false },
    adoration: { wall: '#4a3a4e', col: '#6a5a66', tiles: ['#5a4a52', '#3a2e38'], hemi: ['#c8b0c8', '#1a1018', 0.9], key: ['#ffd090', 1.2, [0, 20, -100]], glow: 1, fresco: false, dark: true },
    hall: { wall: '#e6dcc8', col: '#efe6d6', tiles: ['#d8ccb8', '#c4b49c'], hemi: ['#fff4e4', '#6a5a4a', 1.35], key: ['#fff0d0', 1.2, [30, 30, 40]], glow: 0.35, fresco: false },
    basilica: { wall: '#e8d4b4', col: '#ead8bc', tiles: ['#d8c4a4', '#a8846a'], hemi: ['#fff0dc', '#5a4a3a', 1.3], key: ['#ffe0b0', 1.25, [0, 30, -80]], glow: 0.9, fresco: true, vault: true },
  }[mode];
  const P = { sky: [[0, M.dark ? '#1a1220' : '#c8b8a0'], [1, M.dark ? '#2a1e2a' : '#e8d8c0']], fog: M.dark ? '#2a1e2a' : '#e0d0b8', fogNear: 60, fogFar: 600, hemi: M.hemi, key: M.key, move: 'push', air: 'dust',
    ground: { kind: 'floor', tiles: M.tiles, len: 180 } };
  const S = stage(P, 'ch_' + mode), { scene } = S;
  nearGround(S, P, 'ch_' + mode);
  const wm = lam(M.wall), cm = lam(M.col), back = -150;
  for (const sd of [-1, 1]) {
    const sw = box(0.8, 30, 190, wm); sw.position.set(sd * 22, 15, -60); scene.add(sw);
    for (let k = 0; k < 10; k++) {
      const z = -30 - k * 12;
      const c = cyl(0.9, 1.0, 13, cm, 14); c.position.set(sd * 11, 6.5, z); scene.add(c);
      const cap = box(2.4, 0.8, 2.4, cm); cap.position.set(sd * 11, 13.4, z); scene.add(cap);
      const ar = new THREE.Mesh(new THREE.TorusGeometry(6, 0.7, 6, 18, Math.PI), cm); ar.rotation.y = Math.PI / 2; ar.position.set(sd * 11, 13.8, z - 6); scene.add(ar);
      if (k < 9) { const win = new THREE.Mesh(new THREE.PlaneGeometry(3, 7), glowMat(['#ffd98a', '#a8c8f0', '#f0a8a0', '#c8e0a0'][(k + (sd > 0 ? 2 : 0)) % 4], M.dark ? 0.8 : 1)); win.position.set(sd * 21.5, 17, z - 6); win.rotation.y = -sd * Math.PI / 2; scene.add(win); }
      if (M.fresco) { const fz = new THREE.Mesh(new THREE.PlaneGeometry(9, 6), lam(['#c8a070', '#8aa0c0', '#b88a70', '#a0b088'][(k + (sd > 0 ? 1 : 0)) % 4])); fz.position.set(sd * 21.5, 7, z - 6); fz.rotation.y = -sd * Math.PI / 2; scene.add(fz); }
    }
    if (mode !== 'hall') for (let k = 0; k < 6; k++) { const pew = box(8, 1.2, 1.4, lam('#7a5232')); pew.position.set(sd * 5.2, 0.6, -46 - k * 6); scene.add(pew); const bk = box(8, 1.6, 0.3, lam('#6a4428')); bk.position.set(sd * 5.2, 1.4, -46.7 - k * 6); scene.add(bk); }
  }
  const vault = new THREE.Mesh(new THREE.PlaneGeometry(46, 200), M.vault ? new THREE.MeshLambertMaterial({ map: canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#2e4a8a'; g.fillRect(0, 0, w, h); g.fillStyle = '#f2c46b'; const r = rng(3); for (let k = 0; k < 120; k++) { g.beginPath(); g.arc(r() * w, r() * h, 2, 0, 7); g.fill(); } }) }) : lam(mixc(M.wall, '#2a1c2a', 0.25)));
  vault.rotation.x = Math.PI / 2; vault.position.set(0, 24, -60); scene.add(vault);
  // the apse
  const ap = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 26, 28, 1, true, Math.PI / 2, Math.PI), lam(mixc(M.wall, '#c9a24a', 0.25), { side: THREE.BackSide })); ap.position.set(0, 13, back); scene.add(ap);
  const bwall = box(46, 30, 0.8, wm); bwall.position.set(0, 15, back + 0.5); bwall.geometry.translate(0, 0, 0); scene.add(bwall);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(12, 1.2, 8, 28, Math.PI), lam('#c9a24a', { emissive: '#5a4010', emissiveIntensity: 0.3 })); arch.position.set(0, 13, back + 1); scene.add(arch);
  const hole = new THREE.Mesh(new THREE.PlaneGeometry(24, 13), lam(mixc(M.wall, '#c9a24a', 0.3))); hole.position.set(0, 6.5, back + 0.95); scene.add(hole);
  const alt = box(9, 2.4, 3, lam('#f0e6d4')); alt.position.set(0, 1.2, back + 5); scene.add(alt);
  const cloth = box(9.4, 0.25, 3.3, lam('#fbf8f0')); cloth.position.set(0, 2.5, back + 5); scene.add(cloth);
  const ant = box(9.2, 1.6, 0.1, lam('#c9a24a')); ant.position.set(0, 1.3, back + 6.6); scene.add(ant);
  const tab = box(1.6, 2, 1.2, lam('#e8c060', { emissive: '#8a6a20', emissiveIntensity: 0.35 })); tab.position.set(0, 3.6, back + 4.6); scene.add(tab);
  const crm = lam('#7a5232', { emissive: '#3a2010', emissiveIntensity: 0.3 });
  const cv = box(0.5, 7, 0.4, crm); cv.position.set(0, 11, back + 3); scene.add(cv); const ch = box(3.6, 0.5, 0.4, crm); ch.position.set(0, 12.6, back + 3); scene.add(ch);
  const flames = [];
  for (const x of [-3.6, -2.2, 2.2, 3.6]) { const c = cyl(0.12, 0.12, 1.4, lam('#fbf6ea'), 6); c.position.set(x, 3.3, back + 5); scene.add(c); const fl = sprite(warm, 1.2, 0.9, true); fl.position.set(x, 4.2, back + 5); scene.add(fl); flames.push(fl); }
  const gl = sprite(warm, 34, 0.5 * M.glow, true); gl.position.set(0, 6, back + 7); scene.add(gl);
  S.anim.push((t) => { flames.forEach((f, k) => { f.material.opacity = 0.75 + 0.2 * Math.sin(t * 7 + k * 1.7); }); gl.material.opacity = 0.5 * M.glow * (0.9 + 0.1 * Math.sin(t * 0.8)); });
  return { scene: S.scene, cam: S.cam, front: undefined, rig: S.rig, update: S.update };
}
/** The coast at Centola: sand, the summer sea, green headlands with a white town and church. */
export function sea() {
  const P = { sky: SKY.summer, fog: '#dce8ee', hemi: HEMI.day, key: ['#fff4dc', 1.5, [60, 40, -40]], sun: [1500, 250, 0.7], move: 'pan-l',
    clouds: [[200, 180, 1400, 9], [800, 120, 1500, 11], [1450, 200, 1400, 9]], ground: { kind: 'sand', color: '#ecd8ac', len: 52 } };
  const S = stage(P, 'sea'), { scene } = S;
  nearGround(S, P, 'sea');
  const water = new THREE.Mesh(new THREE.PlaneGeometry(3000, 2000), lam('#3a8ab8')); water.rotation.x = -Math.PI / 2; water.position.set(0, -0.05, -1010); scene.add(water);
  const r = rng(6), st = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512); for (let k = 0; k < 110; k++) { g.fillStyle = `rgba(255,255,255,${0.12 + r() * 0.35})`; g.fillRect(r() * 256, r() * 512, 10 + r() * 40, 2 + r() * 2); } });
  st.wrapS = st.wrapT = THREE.RepeatWrapping; st.repeat.set(60, 30);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(3000, 2000), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: 0.4, depthWrite: false })); sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, 0, -1010); scene.add(sheen);
  S.anim.push((t) => { st.offset.x = t * 0.004; st.offset.y = t * 0.002; });
  [[-900, 70, 0, -260], [-700, 46, 1, -330]].forEach(([z, amp, i, x]) => { const rg = ridge({ w: 900, d: 260, x, z, y: -8, amp, color: ['#6a8a5a', '#5a7a4a'][i], seed: 4 + i * 3, freq: 0.8 }); scene.add(rg); });
  const town = seaTown(9); town.position.set(-210, 4, -640); town.scale.setScalar(1.1); scene.add(town);
  const head = ridge({ w: 500, d: 200, x: 520, z: -1100, y: -8, amp: 60, color: '#7a9a8a', seed: 13, freq: 0.6 }); scene.add(head);
  for (let k = 0; k < 6; k++) { const u = new THREE.Group(); const pole = cyl(0.06, 0.06, 3, lam('#8a6a4a'), 5); pole.position.y = 1.5; u.add(pole);
    const top = new THREE.Mesh(new THREE.ConeGeometry(1.8, 0.8, 10), lam(['#cf3b3b', '#f2c46b', '#3a78b8'][k % 3])); top.position.y = 3.1; u.add(top); u.position.set(-60 + k * 22 + (k % 2) * 6, 0, -14 - (k % 3) * 4); scene.add(u); }
  return { scene: S.scene, cam: S.cam, front: undefined, rig: S.rig, update: S.update };
}
/** Assisi on its hill above the valley. modes: dusk (the website goes online; his wish), day (his home in Assisi, the
 * Sanctuary of the Spoliation close by), pilgrims (queues of pilgrims at the sanctuary), glory (sunset, the feast day). */
export function umbria(mode = 'day') {
  const M = {
    dusk: { sky: SKY.dusk, fog: '#c89a90', hemi: HEMI.dusk, key: ['#ffb880', 1.35, [-80, 20, -100]], sun: [520, 500, 0.9, 70], near: '#6c7e44', lit: 0.8, town: [1330, 500], stars: 40,
      valley: ['#8a8a50', '#a08a58', '#76784a', '#a8805a', '#8c7c50', '#7a8250', '#9c9058'], ridges: ['#a07a98', '#806a90', '#62684e'], cloudLit: '#ffc4a4', cloudShade: '#8a6a98', clouds: [[250, 190, 1300, 9], [1700, 160, 1300, 10]] },
    day: { sky: SKY.day, fog: '#dcd8cc', hemi: HEMI.day, key: ['#ffe8c0', 1.45, [60, 50, -60]], sun: [1560, 230, 0.8, 50], near: '#86a654', lit: 0, town: null, sanct: [1330, 150], valley: undefined,
      ridges: ['#b4bcd6', '#98a6c4', '#7e9478'], clouds: [[300, 180, 1300, 10], [900, 120, 1400, 8], [1650, 200, 1300, 9]] },
    pilgrims: { sky: SKY.morning, fog: '#e4dccc', hemi: HEMI.day, key: ['#ffe8c0', 1.45, [60, 50, -60]], sun: [1600, 200, 0.7, 45], near: '#86a654', lit: 0, town: null, sanct: [1300, 150], pilgrims: true,
      ridges: ['#b4bcd6', '#98a6c4', '#7e9478'], clouds: [[260, 170, 1300, 10], [1500, 150, 1400, 11]] },
    glory: { sky: SKY.glory, fog: '#d89a84', hemi: HEMI.dusk, key: ['#ffb880', 1.6, [80, 12, -100]], sun: [1380, 540, 1, 90], near: '#6c7e44', lit: 0.95, town: [560, 485], stars: 80,
      valley: ['#8a8a50', '#a08a58', '#76784a', '#a8805a', '#8c7c50', '#7a8250', '#9c9058'], ridges: ['#a07a98', '#806a90', '#62684e'], cloudLit: '#ffc4a4', cloudShade: '#8a6a98', air: 'gold',
      rays: { at: [1380, 540], op: 0.08, dir: Math.PI - 0.4, spread: 1.6, len: 900, n: 13 }, clouds: [[200, 200, 1300, 9], [900, 150, 1400, 7]] },
  }[mode];
  const P = { ...M, move: 'pull', ground: { kind: 'grass', color: M.near, len: 48 } };
  const S = stage(P, 'um_' + mode), { scene, cam } = S, r = rng(mode.length * 7 + 1);
  nearGround(S, P, 'um_' + mode);
  [[-1100, 170, 0], [-860, 120, 1], [-640, 74, 2]].forEach(([z, amp, i]) =>
    scene.add(ridge({ w: 4400, d: 220, z, y: -30, amp, color: mixc(M.ridges[i], M.fog, 0.18 - i * 0.05).getStyle(), seed: 4 + i * 5, freq: 0.3 + i * 0.2 })));
  scene.add(fields(3400, 900, -30, -720, 3, M.valley));
  for (let k = 0; k < 60; k++) scene.add(cypress3d(-800 + k * 28 + (r() - 0.5) * 8, -300 - (k % 4) * 60 - r() * 30, 9 + r() * 5, '#2e4630', -30));
  const OL = 1200, can = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 7, 5), lam('#ffffff'), OL), om = new THREE.Matrix4(), oq = new THREE.Quaternion(), os = new THREE.Vector3(), op3 = new THREE.Vector3();
  for (let k = 0; k < OL; k++) { const grove = k % 16, gx = -760 + grove * 96 + Math.sin(grove * 2.3) * 30, gz = -340 - (grove % 4) * 90, i = Math.floor(k / 16), x = gx + (i % 9) * 6 + (r() - 0.5), z = gz - Math.floor(i / 9) * 6;
    om.compose(op3.set(x, -28, z), oq, os.set(2.4, 1.8, 2.4)); can.setMatrixAt(k, om); can.setColorAt(k, mixc('#6e8660', '#a8b490', r() * 0.6)); }
  scene.add(can);
  const mist = [[-340, -14, -420, 620, 60], [200, -16, -480, 740, 70], [620, -14, -400, 580, 55]].map(([x, y, z, w, h], k) => { const m = sprite(mistTex, 1, mode === 'glory' ? 0.42 : 0.55); m.scale.set(w, h, 1); m.position.set(x, y, z); scene.add(m); return [m, x, k]; });
  S.anim.push((t) => mist.forEach(([m, x, j]) => { m.position.x = x + t * (2 + j * 0.6) * (j % 2 ? -1 : 1); }));
  if (M.town) { const ts = M.townScale ?? 0.42, tp = atScreen(cam, M.town[0], M.town[1], 330); const town = assisi3d({ hillC: mixc(M.near, M.fog, 0.35).getStyle(), lit: M.lit, foot: Math.max(150, (tp.y + 30) / ts) }); town.position.copy(tp); town.scale.setScalar(ts); town.rotation.y = -0.12; scene.add(town); }
  if (M.sanct) {   // the sanctuary close by on the right, on a terrace at the brow; a few houses of the town around it
    const [sx, d] = M.sanct, p = atScreen(cam, sx, H / 2 + 254 * 20 / d, d);
    const sn = spoliation3d({ lit: 0 }); sn.position.set(p.x, 0, -d); sn.rotation.y = -0.35; scene.add(sn);
    for (let k = 0; k < 8; k++) { const hx = p.x - 40 + k * 7 + (r() - 0.5) * 2, hh = 5 + r() * 4; const hb = box(6, hh, 6, lam(mixc('#ecd8c4', '#d8b8a0', r()))); hb.position.set(hx > p.x - 14 && hx < p.x + 16 ? hx - 30 : hx, hh / 2, -d - 12 - r() * 6); scene.add(hb); }
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 120), lam('#cbbca8')); floor.rotation.x = -Math.PI / 2; floor.position.set(p.x, 0.01, -d - 40); scene.add(floor);
    if (M.pilgrims) { const cr = crowd3d(140, (rr) => { const x = p.x - 34 + rr() * 30, z = -d + 12 + rr() * 34; return [x - (z + d) * 0.5, z]; }, { seed: 31 }); scene.add(cr.group); S.anim.push((t) => cr.update(t, 0.05)); }
  }
  return { scene: S.scene, cam: S.cam, front: S.front, rig: S.rig, update: S.update };
}
/** Campo Grande, Brazil: red earth, palms and a white parish church with blue trim, warm afternoon. */
export function brazil() {
  const P = { sky: SKY.brazil, fog: '#f0dcc0', hemi: HEMI.warm, key: ['#ffe0b0', 1.5, [-60, 40, -40]], sun: [300, 260, 0.8, 50], move: 'pan-l',
    clouds: [[700, 150, 1400, 10], [1600, 200, 1300, 9]], ground: { kind: 'paving', color: '#c8805a', line: 'rgba(90,40,20,.25)', tile: 4, len: 46, cobble: true } };
  const S = stage(P, 'brazil'), { scene } = S;
  nearGround(S, P, 'brazil');
  const far = new THREE.Mesh(new THREE.PlaneGeometry(1400, 500), lam('#b87a50')); far.rotation.x = -Math.PI / 2; far.position.set(0, -0.02, -276); scene.add(far);
  const ch = parishBR(); ch.position.set(10, 0, -96); scene.add(ch);
  [[-38, -70, 16], [-26, -84, 19], [44, -76, 17], [58, -90, 20], [-60, -110, 18], [80, -120, 22]].forEach(([x, z, h], k) => scene.add(palm3d(x, z, h, k + 4)));
  scene.add(blocks3d(-220, 260, -150, { lit: 0, seed: 21, hmin: 6, hvar: 4, walls: ['#f0e0c0', '#f8c8a0', '#e8f0e0', '#f0d8e8', '#c8e0f0'], skip: [-24, 44] }));
  return { scene: S.scene, cam: S.cam, front: undefined, rig: S.rig, update: S.update };
}

// ------------------------------------------------------------------ the scenes of this video
export const BUILD = {
  sqHook: () => square('hook'), sqCanon: () => square('canon'), sqYouth: () => square('youth'), sqMourn: () => square('mourn'),
  miDay: () => milan('day'), miDusk: () => milan('dusk'), miNight: () => milan('night'), miEvening: () => milan('evening'),
  london: () => london(),
  roomLiving: () => room('living'), roomKitchen: () => room('kitchen'), roomBedroom: () => room('bedroom'), roomStudy: () => room('study'), roomSick: () => room('sick'),
  roomHospital: () => room('hospital'), roomHospNight: () => room('hospNight'), roomFlorence: () => room('florence'), roomPapal: () => room('papal'),
  chParish: () => church('parish'), chAdoration: () => church('adoration'), chHall: () => church('hall'), chBasilica: () => church('basilica'),
  sea: () => sea(), umDusk: () => umbria('dusk'), umDay: () => umbria('day'), umPilgrims: () => umbria('pilgrims'), umGlory: () => umbria('glory'),
  brazil: () => brazil(),
};

if (!window.BG3D_LIB) {
  // cam3d with ONE shared WebGL renderer for every scene (cam3d.shared; a long video has more scenes than Chrome's ~16 contexts)
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2, shared: C3.shared !== false }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
