// three.js backgrounds for St. Moses the Black, "The Leaking Basket" (browser module; build.mjs copies it to
// work/<slug>/bg3d.mjs). One desert of Scetis in three set-ups: 'dawn' (hook, push-fast: rose dawn over the dunes),
// 'day' (the basket, pan-r: bright sand and blue sky as he sets out), 'gold' (the turning point, dolly zoom toward the
// domed church under a low golden sun). Characters, cells and the sand trail stay 2D SVG on top.
// Deterministic: every frame is drawn from timeline time only. Helpers come from bakhita_freedom.bg3d.js (copied next
// to this file as bakhita.bg3d.js). Exported for later reels: scetis(mode), domeCell(), datePalm().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, skyTex, glowTex, lam, glowMat, ridge, cloud, sprite, atScreen, makeView, newRenderer, stars } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
const dustT = glowTex([[0, 'rgba(255,236,200,.5)'], [0.5, 'rgba(255,236,200,.18)'], [1, 'rgba(255,236,200,0)']]);

/** A mud-brick monk's cell with a low dome (base at y 0). big: the church (wider, two domes, a gold cross). */
export function domeCell(x, z, s, wall, { big = false } = {}) {
  const g = new THREE.Group(), m = lam(wall), dm = lam(mixc(wall, '#fff0d0', 0.18));
  const w = big ? 9 : 3.2, h = big ? 3.6 : 2, d = big ? 5 : 3;
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); body.position.y = h / 2; g.add(body);
  (big ? [[-2.2, 2.6], [2.4, 1.9]] : [[0, 1.5]]).forEach(([dx, r]) => {
    const dome = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), dm); dome.position.set(dx, h, 0); g.add(dome);
  });
  const door = new THREE.Mesh(new THREE.PlaneGeometry(big ? 1.3 : 0.8, big ? 2 : 1.3), glowMat('#3a2616')); door.position.set(0, big ? 1 : 0.65, d / 2 + 0.02); g.add(door);
  if (big) {
    const cm = glowMat('#f2c46b');
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.5, 0.16), cm); v.position.set(-2.2, h + 2.6 + 0.75, 0); g.add(v);
    const hz = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.16, 0.16), cm); hz.position.set(-2.2, h + 2.6 + 1.0, 0); g.add(hz);
  }
  g.scale.setScalar(s); g.position.set(x, 0, z); return g;
}
/** A date palm: thin leaning trunk and a crown of flat fronds. */
export function datePalm(x, z, h, seed, c = '#4a7a3a') {
  const g = new THREE.Group(), r = rng(seed), m = lam(c, { side: THREE.DoubleSide }), tm = lam(mixc(c, '#5a3a22', 0.75));
  const lean = (r() - 0.5) * 0.25;
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, h, 6), tm); tr.position.set(0, h / 2, 0); tr.rotation.z = lean; g.add(tr);
  const top = new THREE.Vector3(-Math.sin(lean) * h * 0.5, h * 0.98, 0);
  for (let k = 0; k < 8; k++) {
    const fr = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.55), m); fr.position.copy(top);
    fr.rotation.set(0, (k / 8) * Math.PI * 2, -0.45 - r() * 0.35); fr.translateX(1.5); g.add(fr);
  }
  g.position.set(x, 0, z); return g;
}

const MODES = {
  dawn: { sky: [[0, '#3a3a6a'], [0.34, '#a0607a'], [0.5, '#f0a070'], [0.58, '#f8d090'], [1, '#f8d090']], fog: '#e0a07a', sand: '#b8875a', far: '#8a5a6a', mid: '#a8745a',
    hemi: ['#ffd8b8', '#4a3228', 1.5], key: ['#ffb080', 1.6], sun: [760, 960, 0.85], cloud: '#f0b0a0', cop: 0.55, wall: '#b08a62', palm: '#3e5a3a', star: 0.35 },
  day: { sky: [[0, '#3a78b8'], [0.36, '#8cc0e0'], [0.52, '#ecdcb4'], [0.58, '#f0e0b8'], [1, '#f0e0b8']], fog: '#ecd8b0', sand: '#d8b078', far: '#d0b490', mid: '#c89a64',
    hemi: ['#ffffff', '#8a6a44', 1.7], key: ['#fff4d8', 1.7], sun: [840, 520, 0.5], cloud: '#ffffff', cop: 0.8, wall: '#c8a070', palm: '#4a7a3a', star: 0 },
  gold: { sky: [[0, '#b8603e'], [0.34, '#f0a46a'], [0.52, '#f8d894'], [0.58, '#fbe4a8'], [1, '#fbe4a8']], fog: '#f0b878', sand: '#c89a62', far: '#c07a5a', mid: '#c08a58',
    hemi: ['#ffe4b8', '#5a3a24', 1.6], key: ['#ffc070', 1.9], sun: [540, 900, 1.0], cloud: '#ffd0a0', cop: 0.6, wall: '#d0a878', palm: '#5a6a3a', star: 0 },
};
export function scetis(mode = 'day') {
  const P = MODES[mode];
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 50, 460);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(mode === 'day' ? 40 : -10, mode === 'day' ? 60 : 16, -60); scene.add(key);
  if (P.star) scene.add(stars(50, 7, P.star, { el0: 0.28 }));
  const gnd = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1200), lam(P.sand)); gnd.rotation.x = -Math.PI / 2; gnd.position.set(0, 0, -400); scene.add(gnd);
  // dunes: far ridges paler, nearer ones lower
  scene.add(ridge({ w: 1600, d: 110, z: -380, amp: 44, color: mixc(P.far, P.fog, 0.4).getStyle(), seed: 5, freq: 0.55 }));
  scene.add(ridge({ w: 1300, d: 80, z: -250, amp: 22, color: P.mid, seed: 9, freq: 0.9 }));
  scene.add(ridge({ w: 900, d: 60, z: -150, amp: 9, color: mixc(P.mid, P.sand, 0.5).getStyle(), seed: 13, freq: 1.5 }));
  // the monks' cells scattered over the plain, a few palms, and the church (in 'gold' it stands where the dolly looks)
  const r = rng(mode.length * 11 + 3);
  [[-34, -90, 1.5], [-58, -130, 1.6], [30, -110, 1.5], [62, -150, 1.7], [-18, -170, 1.6], [84, -100, 1.4]].forEach(([x, z, s]) => {
    if (mode === 'gold' && Math.abs(x - 16) < 20) return;
    scene.add(domeCell(x, z, s, P.wall));
  });
  if (mode !== 'dawn') scene.add(domeCell(mode === 'gold' ? 16 : 48, mode === 'gold' ? -150 : -190, 2.4, P.wall, { big: true }));
  for (let k = 0; k < 9; k++) { const side = k % 2 ? 1 : -1; scene.add(datePalm(side * (26 + r() * 70), -70 - r() * 120, 7 + r() * 4, 30 + k, P.palm)); }
  const cam = camera(0, 2.5, 6, 0.0);
  const sunS = sprite(warm, mode === 'day' ? 600 : 950, P.sun[2]); sunS.position.copy(atScreen(cam, P.sun[0], P.sun[1], 800)); scene.add(sunS);
  const cl = [[-110, 44, -380, 8, 1], [90, 52, -420, 10, 2], [170, 38, -340, 7, 3]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, P.cloud, P.cop, 50 + sd, 0.5); scene.add(c); return [c, x, sd]; });
  // low drifting dust
  const dust = [];
  for (let k = 0; k < 10; k++) { const s = sprite(dustT, 26 + r() * 26, 0.5); s.position.set(-70 + r() * 140, 1.5 + r() * 2, -30 - r() * 120); scene.add(s); dust.push([s, s.position.x, r() * 6.3]); }
  const d0 = 14;
  return { scene, cam, update(t, p) {
    if (mode === 'dawn') cam.position.set(0, 2.5, 6 - 9 * p);              // push-fast: glide in over the sand
    else if (mode === 'day') cam.position.set(-3.5 + 7 * p, 2.5, 2);        // pan-r: truck right as he walks
    else {                                                                 // dolly zoom: back away while zooming in
      const z = 8 * p; cam.position.set(0, 2.5, 2 + z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    }
    cl.forEach(([c, x, k]) => { c.position.x = x + t * (0.8 + k * 0.25); });
    dust.forEach(([s, x, ph]) => { s.position.x = x + t * 1.4 + Math.sin(t * 0.4 + ph) * 2; });
    return {};
  } };
}

export const BUILD = { desertDawn: () => scetis('dawn'), desertDay: () => scetis('day'), desertGold: () => scetis('gold') };

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
