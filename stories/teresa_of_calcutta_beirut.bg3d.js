// three.js backgrounds for St. Teresa of Calcutta, "The Day the Guns Fell Silent" (browser module; build.mjs copies it
// to work/<slug>/bg3d.mjs). One city street between flat-roofed apartment blocks with hills behind, in two set-ups:
// 'smoke' (hook, push-fast: a dusty orange dusk with smoke columns rising behind the roofs) and 'calm' (the turning
// point, a real dolly zoom: a clear pale morning, no smoke). Characters and vehicles stay 2D SVG on top; no people,
// weapons or flags are drawn in 3D. Deterministic: every frame is drawn from timeline time only. Helpers come from
// bakhita_freedom.bg3d.js (copied as bakhita.bg3d.js); the smoke columns from santo_nino_cebu.bg3d.js (santo.bg3d.js).
// Exported for later reels: cityStreet(mode), block().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, skyTex, glowTex, lam, glowMat, ridge, cloud, sprite, atScreen, makeView, newRenderer } = B;
window.BG3D_LIB = true;
const S = await import('./santo.bg3d.js');
window.BG3D_LIB = false;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
const warm = glowTex([[0, 'rgba(255,243,200,1)'], [0.22, 'rgba(255,217,138,.75)'], [0.6, 'rgba(255,176,112,.22)'], [1, 'rgba(255,176,112,0)']]);
const dustT = glowTex([[0, 'rgba(255,230,200,.45)'], [0.5, 'rgba(255,230,200,.16)'], [1, 'rgba(255,230,200,0)']]);

/** A flat-roofed apartment block (base at y 0) with rows of dark windows on the side facing the street. */
export function block(x, z, w, h, d, wall, win, seed) {
  const g = new THREE.Group(), r = rng(seed);
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lam(wall)); body.position.y = h / 2; g.add(body);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, 0.5, d + 0.6), lam(mixc(wall, '#2a2430', 0.35))); roof.position.y = h + 0.25; g.add(roof);
  const wm = glowMat(win), side = x < 0 ? 1 : -1;
  for (let fy = 3; fy < h - 2; fy += 3.4) for (let fz = -d / 2 + 2; fz < d / 2 - 1; fz += 3.2) {
    if (r() < 0.2) continue;
    const p = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.7), wm); p.position.set(side * (w / 2 + 0.03), fy, fz); p.rotation.y = side * Math.PI / 2; g.add(p);
  }
  for (let fy = 3; fy < h - 2; fy += 3.4) for (let fx = -w / 2 + 1.6; fx < w / 2 - 1; fx += 3) {
    if (r() < 0.25) continue;
    const p = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.7), wm); p.position.set(fx, fy, d / 2 + 0.03); g.add(p);
  }
  g.position.set(x, 0, z); return g;
}

const MODES = {
  smoke: { sky: [[0, '#2e2636'], [0.34, '#5a3a44'], [0.5, '#b0684a'], [0.57, '#e09a64'], [1, '#e09a64']], fog: '#9a6a58', near: 30, far: 330, ground: '#5a5058',
    walls: ['#8a7a78', '#9a8478', '#7a6e74', '#a08a7a'], win: '#3a3038', hills: '#5a4450', hemi: ['#ffd0a8', '#2a2028', 1.25], key: ['#ffb880', 1.3], sun: [560, 960, 0.8], smoke: 3, dust: 0.35 },
  calm: { sky: [[0, '#5a86c0'], [0.36, '#a8c8e4'], [0.5, '#f4dcb8'], [0.57, '#fbe8c4'], [1, '#fbe8c4']], fog: '#e8d4b8', near: 40, far: 420, ground: '#8a8088',
    walls: ['#d8c4a8', '#e0cdb4', '#c8b49c', '#e8d8c0'], win: '#7a8a9a', hills: '#a8a4b0', hemi: ['#ffffff', '#6a5a50', 1.6], key: ['#fff0d0', 1.7], sun: [600, 900, 0.95], smoke: 0, dust: 0.25 },
};
export function cityStreet(mode = 'smoke') {
  const P = MODES[mode], r = rng(mode.length * 13 + 2);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, P.near, P.far);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-20, 40, -80); scene.add(key);
  const gnd = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), lam(P.ground)); gnd.rotation.x = -Math.PI / 2; gnd.position.set(0, 0, -400); scene.add(gnd);
  // the hills behind the city
  scene.add(ridge({ w: 1500, d: 110, z: -420, amp: 60, color: mixc(P.hills, P.fog, 0.45).getStyle(), seed: 5, freq: 0.5 }));
  // two rows of blocks along the street (kept low near the camera so the title stays on open sky), a cross row far away
  for (let k = 0; k < 9; k++) for (const side of [-1, 1]) {
    const z = -26 - k * 26 - r() * 6, w = 14 + r() * 8, h = (k < 2 ? 12 : 18) + r() * (k < 2 ? 6 : 22), d = 18 + r() * 5;
    scene.add(block(side * (15 + w / 2 + r() * 3), z, w, h, d, P.walls[(k + (side > 0 ? 1 : 0)) % P.walls.length], P.win, 20 + k * 2 + side));
  }
  for (let k = 0; k < 7; k++) scene.add(block(-90 + k * 30 + r() * 6, -290 - r() * 20, 22, 16 + r() * 22, 16, mixc(P.walls[k % 4], P.fog, 0.35).getStyle(), P.win, 70 + k));
  const cam = camera(0, 2.6, 6, 0.03);
  const sunS = sprite(warm, 800, P.sun[2]); sunS.position.copy(atScreen(cam, P.sun[0], P.sun[1], 700)); scene.add(sunS);
  const smokes = [];
  for (let k = 0; k < P.smoke; k++) {
    const [g, up] = S.smokeColumn([-150, 120, -60][k], -300 - k * 20, { seed: 3 + k, s: 4 + (k % 2), color: '#4e444e', op: 0.75, rise: 2 + (k % 3) * 0.5, height: 70 });
    scene.add(g); smokes.push(up);
  }
  const cl = (mode === 'calm' ? [[-90, 60, -400, 9, 1], [80, 72, -440, 11, 2]] : []).map(([x, y, z, s, sd]) => { const c = cloud(x, y, z, s, '#ffffff', 0.8, 50 + sd, 0.5); scene.add(c); return [c, x, sd]; });
  const dust = [];
  for (let k = 0; k < 10; k++) { const s = sprite(dustT, 24 + r() * 24, P.dust); s.position.set(-40 + r() * 80, 1.5 + r() * 3, -20 - r() * 120); scene.add(s); dust.push([s, s.position.x, r() * 6.3]); }
  const d0 = 14;
  return { scene, cam, update(t, p) {
    if (mode === 'smoke') cam.position.set(0, 2.6, 6 - 9 * p);              // push-fast: glide down the street
    else {                                                                 // dolly zoom: back away while zooming in
      const z = 9 * p; cam.position.set(0, 2.6, 2 + z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    }
    smokes.forEach((up) => up(t));
    cl.forEach(([c, x, k]) => { c.position.x = x + t * (0.8 + k * 0.3); });
    dust.forEach(([s, x, ph]) => { s.position.x = x + t * 1.0 + Math.sin(t * 0.4 + ph) * 2; });
    return {};
  } };
}

export const BUILD = { beirutSmoke: () => cityStreet('smoke'), beirutCalm: () => cityStreet('calm') };

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
