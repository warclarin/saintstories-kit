// three.js backgrounds for St. Rose Philippine Duchesne: "the woman who prays always" (Sugar Creek, 1841; browser module,
// build.mjs copies it to work/<slug>/bg3d.mjs). Two sets:
//   prairie(mode): rolling Kansas prairie with tall swaying grass, a wooded creek line, bark lodges, log cabins with
//     chimney smoke and the little log mission church; 'hook' (morning, push-fast) and 'glory' (sunset with stars, arc-r).
//   logChapel(): inside the log chapel: log walls, plank floor, a plain altar with candles and a wooden cross, a window
//     shaft; a real dolly zoom, and the window light turns to evening at BG3D_VARS.dusk (seconds from the scene start).
// Characters, corn kernels and overlays stay SVG on top. Deterministic: everything is drawn from timeline time.
// Exported for later reels: prairie(mode), logChapel(), lodge3d(), cabin3d(), tree3d().
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, glowTex, skyTex, canvasTex, lam, glowMat, ridge, cloud, sprite, atScreen, newRenderer, makeView, stars } = B;
const V = window.BG3D_VARS || {};

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
function prism(w, h, d, mat) {   // gable roof along x, base at y = 0
  const s = new THREE.Shape(); s.moveTo(-d / 2, 0); s.lineTo(0, h); s.lineTo(d / 2, 0); s.lineTo(-d / 2, 0);
  const geo = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false }); geo.translate(0, 0, -w / 2); geo.rotateY(Math.PI / 2);
  return new THREE.Mesh(geo, mat);
}
const warm = glowTex([[0, 'rgba(255,243,210,1)'], [0.22, 'rgba(255,214,150,.75)'], [0.6, 'rgba(255,170,120,.22)'], [1, 'rgba(255,170,120,0)']]);
const smokeTex = glowTex([[0, 'rgba(240,236,232,.8)'], [0.5, 'rgba(230,226,222,.35)'], [1, 'rgba(230,226,222,0)']]);
const flameTex = glowTex([[0, 'rgba(255,250,220,1)'], [0.3, 'rgba(255,200,110,.8)'], [1, 'rgba(255,150,60,0)']]);

/** A Potawatomi bark lodge (domed wigwam) with bark bands and a dark doorway. Base at y = 0, about 5 wide. */
export function lodge3d(seed = 1, { bark = '#8a6a4a' } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.6, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), lam(mixc(bark, '#4a3a2a', r() * 0.25)));
  dome.scale.set(1, 0.85, 0.8); g.add(dome);
  for (const y of [0.7, 1.4]) { const band = new THREE.Mesh(new THREE.TorusGeometry(2.6 * Math.cos(Math.asin(y / 2.2)) * 0.99, 0.07, 4, 24), lam('#5a4430')); band.rotation.x = Math.PI / 2; band.scale.set(1, 0.8, 1); band.position.y = y; g.add(band); }
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.3), glowMat('#2a1c18')); door.position.set(0, 0.65, 2.06); g.add(door);
  return g;
}
/** A small log cabin with a shake roof and a stone chimney; `church` adds a belfry and a cross. Base at y = 0. */
export function cabin3d({ wood = '#8a5e3a', roof = '#5a4030', church = false, win = '#ffd98a' } = {}) {
  const g = new THREE.Group(), w = church ? 7 : 5, d = church ? 9 : 4.4, h = church ? 3.6 : 2.6;
  const body = box(w, h, d, lam(wood)); body.position.y = h / 2; g.add(body);
  for (let y = 0.4; y < h; y += 0.55) { const l = box(w + 0.3, 0.12, d + 0.3, lam(mixc(wood, '#2a1c14', 0.35))); l.position.y = y; g.add(l); }
  const rf = prism(w + 0.6, church ? 2.8 : 2, d + 0.6, lam(roof)); rf.rotation.y = Math.PI / 2; rf.position.y = h; g.add(rf);
  const wn = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.9), glowMat(win, 0.9)); wn.position.set(w / 2 - 1.2, h * 0.55, d / 2 + 0.02); g.add(wn);
  const dr = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.8), glowMat('#3a2418')); dr.position.set(church ? 0 : -0.8, 0.9, d / 2 + 0.02); g.add(dr);
  if (church) {
    const bel = box(1.4, 1.6, 1.4, lam(wood)); bel.position.set(0, h + 2.6, d / 2 - 1); g.add(bel);
    const br = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.4, 4), lam(roof)); br.rotation.y = Math.PI / 4; br.position.set(0, h + 4.1, d / 2 - 1); g.add(br);
    const gold = glowMat('#f2c46b'); const c1 = box(0.16, 1.3, 0.16, gold); c1.position.set(0, h + 5.4, d / 2 - 1); g.add(c1);
    const c2 = box(0.7, 0.16, 0.16, gold); c2.position.set(0, h + 5.6, d / 2 - 1); g.add(c2);
  } else { const ch = box(0.7, h + 1.8, 0.7, lam('#8a7a6a')); ch.position.set(-w / 2 + 0.6, (h + 1.8) / 2, -0.6); g.add(ch); g.userData.chimney = new THREE.Vector3(-w / 2 + 0.6, h + 1.9, -0.6); }
  return g;
}
/** A round prairie-creek tree (oak / cottonwood). Base at (x, 0, z). */
export function tree3d(x, z, h, seed = 1, { c = '#5a7a3a' } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.04, h * 0.06, h * 0.5, 6), lam('#5a4030')); tr.position.y = h * 0.25; g.add(tr);
  for (let k = 0; k < 4; k++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(h * (0.2 + r() * 0.1), 10, 8), lam(mixc(c, k % 2 ? '#2a3a20' : '#c8b060', r() * 0.3)));
    s.position.set((r() - 0.5) * h * 0.4, h * (0.55 + r() * 0.25), (r() - 0.5) * h * 0.3); g.add(s);
  }
  g.position.set(x, 0, z); return g;
}

const MODES = {
  hook: { sky: [[0, '#4a6aa8'], [0.38, '#9ab8d8'], [0.52, '#f4d8b0'], [0.58, '#f8e4c0'], [1, '#f8e4c0']], fog: '#e8d8bc', grass: '#b8a860',
    hemi: ['#fff4dc', '#6a5a3a', 1.5], key: ['#ffe4b8', 1.4], glow: [260, 1000, 0.7], stars: 0, cloud: '#fff4e4', tree: '#6a8a40' },
  glory: { sky: [[0, '#1a1e48'], [0.36, '#4a3e78'], [0.5, '#d88a78'], [0.57, '#f8c88a'], [1, '#f8c88a']], fog: '#d8a088', grass: '#a88a50',
    hemi: ['#ffe0c8', '#4a3a40', 1.35], key: ['#ffc890', 1.5], glow: [540, 1010, 0.95], stars: 60, cloud: '#f8c0a8', tree: '#5a6a3a' },
};

export function prairie(mode = 'hook') {
  const P = MODES[mode], r = rng(mode.length * 13 + 3);
  const scene = new THREE.Scene();
  scene.background = skyTex(P.sky);
  scene.fog = new THREE.Fog(P.fog, 70, 620);
  scene.add(new THREE.HemisphereLight(P.hemi[0], P.hemi[1], P.hemi[2]));
  const key = new THREE.DirectionalLight(P.key[0], P.key[1]); key.position.set(-50, 40, -60); scene.add(key);
  const cam = camera(0, 2.4, 0, 0.035);
  if (P.stars) scene.add(stars(P.stars, 9, 0.8, { el0: 0.22, el1: 0.6 }));
  const sun = sprite(warm, 1000, P.glow[2]); sun.position.copy(atScreen(cam, P.glow[0], P.glow[1], 900)); scene.add(sun);
  const plain = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), lam(P.grass)); plain.rotation.x = -Math.PI / 2; plain.position.set(0, 0, -600); scene.add(plain);
  scene.add(ridge({ w: 1700, d: 90, z: -440, amp: 40, color: mixc(P.grass, P.fog, 0.5).getStyle(), seed: 4, freq: 0.5 }));
  scene.add(ridge({ w: 1300, d: 70, z: -300, amp: 22, color: mixc(P.grass, '#6a7a4a', 0.35).getStyle(), seed: 9, freq: 0.9 }));
  scene.add(ridge({ w: 900, d: 50, z: -180, amp: 8, color: mixc(P.grass, '#8a8a4a', 0.2).getStyle(), seed: 13, freq: 1.5 }));
  // wooded creek line
  for (let k = 0; k < 40; k++) scene.add(tree3d(-150 + k * 7.5 + (r() - 0.5) * 4, -130 - r() * 30, 9 + r() * 7, 30 + k, { c: P.tree }));
  // the mission: lodges, cabins with smoke, the log church
  const smokes = [];
  [[-22, -62], [-12, -78], [16, -70], [30, -88], [-36, -96], [44, -110]].forEach(([x, z], k) => {
    const l = lodge3d(k + 3); l.position.set(x, 0, z); l.rotation.y = (r() - 0.5) * 0.6; scene.add(l); });
  [[-4, -84], [24, -104]].forEach(([x, z], k) => {
    const c = cabin3d(); c.position.set(x, 0, z); c.rotation.y = (k ? -0.3 : 0.25); scene.add(c);
    const at = c.userData.chimney.clone().applyMatrix4(c.matrixWorld.compose(c.position, c.quaternion, c.scale));
    for (let j = 0; j < 5; j++) { const s = sprite(smokeTex, 3, 0.5, false); scene.add(s); smokes.push([s, at, j]); }
  });
  const church = cabin3d({ church: true }); church.position.set(8, 0, -120); church.rotation.y = -0.15; scene.add(church);
  // clouds
  const sky = [[-120, 80, -480, 11, 1], [70, 100, -520, 13, 2], [200, 70, -440, 9, 3]].map(([x, y, z, s, sd]) => {
    const c = cloud(x, y, z, s, P.cloud, 0.6, 50 + sd, 0.5); scene.add(c); return [c, x, sd]; });
  const mist = [[-30, 1, -70, 2.2], [26, 0.9, -95, 2.4]].map(([x, y, z, s], k) => { const c = cloud(x, y, z, s, '#fff4e4', 0.2, 80 + k, 0.4); scene.add(c); return [c, x, k]; });
  // tall prairie grass near the camera: instanced blades that sway
  const N = 1400, blade = new THREE.ConeGeometry(0.05, 1, 3); blade.translate(0, 0.5, 0);
  const grass = new THREE.InstancedMesh(blade, lam('#ffffff'), N), base = [], m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v3 = new THREE.Vector3(), sv = new THREE.Vector3();
  for (let k = 0; k < N; k++) {
    const z = -3 - r() ** 0.7 * 60, x = (r() - 0.5) * (8 + -z * 0.9), h = 0.6 + r() * 1.1;
    base.push([x, z, h, r() * 6.3, (r() - 0.5) * 0.3]);
    grass.setColorAt(k, mixc(P.grass, k % 3 ? '#e8d890' : '#6a7a3a', r() * 0.5));
  }
  scene.add(grass);
  return { scene, cam, update(t, p) {
    let ry = 0;
    if (mode === 'hook') cam.position.set(0, 2.4, -6 * p);
    else { const x = -3 + 6 * p; cam.position.set(x, 2.4, 0); ry = -x * 0.006; }
    for (let k = 0; k < N; k++) {
      const [x, z, h, ph, lean] = base[k];
      e.set(0, 0, lean + Math.sin(t * 1.3 + ph + x * 0.2) * 0.12); q.setFromEuler(e);
      m4.compose(v3.set(x, 0, z), q, sv.set(1, h, 1)); grass.setMatrixAt(k, m4);
    }
    grass.instanceMatrix.needsUpdate = true;
    smokes.forEach(([s, a, j]) => { const k = ((t * 0.18 + j / 5) % 1); s.position.set(a.x + k * 3, a.y + k * 7, a.z); s.scale.setScalar(1.5 + k * 4); s.material.opacity = 0.45 * (1 - k); });
    sky.forEach(([c, x, k]) => { c.position.x = x + t * (1 + k * 0.4); });
    mist.forEach(([c, x, k]) => { c.position.x = x + t * (0.5 + k * 0.2) * (k % 2 ? -1 : 1); });
    sun.material.opacity = P.glow[2] * (0.92 + 0.08 * Math.sin(t * 0.8));
    return { ry };
  } };
}

// plank floor texture
const planks = canvasTex(256, 256, (g, w, h) => {
  for (let k = 0; k < 8; k++) { g.fillStyle = ['#8a6040', '#7a5434', '#946a48', '#80583a'][k % 4]; g.fillRect(k * 32, 0, 32, h); g.fillStyle = 'rgba(40,24,14,.5)'; g.fillRect(k * 32, 0, 2, h); }
});
export function logChapel() {
  const scene = new THREE.Scene();
  scene.background = skyTex([[0, '#24160f'], [1, '#4a3020']]);
  scene.fog = new THREE.Fog('#5a3a28', 26, 90);
  const hemi = new THREE.HemisphereLight('#ffdcb0', '#3a2418', 1.25); scene.add(hemi);
  const key = new THREE.DirectionalLight('#ffe4b0', 1.5); key.position.set(-20, 18, 6); scene.add(key);
  const L = 44, back = -30, front = 14, mid = (back + front) / 2, len = front - back;
  planks.wrapS = planks.wrapT = THREE.RepeatWrapping; planks.repeat.set(3, len / 6);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, len), lam('#ffffff', { map: planks })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, mid); scene.add(floor);
  const logM = [lam('#7a5232'), lam('#8a6040'), lam('#6e4a2c')], endM = lam('#c89a6a');
  for (const side of [-1, 1]) for (let y = 0.45, k = 0; y < 10; y += 0.86, k++) {
    const lg = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, len, 10), logM[k % 3]); lg.rotation.x = Math.PI / 2; lg.position.set(side * 7.4, y, mid); scene.add(lg);
  }
  for (let y = 0.45, k = 0; y < 10; y += 0.86, k++) {
    const lg = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 16, 10), logM[(k + 1) % 3]); lg.rotation.z = Math.PI / 2; lg.position.set(0, y, back); scene.add(lg);
    for (const side of [-1, 1]) { const en = new THREE.Mesh(new THREE.CircleGeometry(0.44, 12), endM); en.position.set(side * 8, y, back + 0.46); scene.add(en); }
  }
  for (let z = front; z > back; z -= 5) { const bm = box(16, 0.6, 0.6, lam('#4a3020')); bm.position.set(0, 9.6, z); scene.add(bm); }
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(16, len), lam('#3a2416', { side: THREE.DoubleSide })); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, 10, mid); scene.add(ceil);
  // altar, cloth, tabernacle, candles, wooden cross
  const alt = box(5, 1.5, 1.8, lam('#6a4428')); alt.position.set(0, 0.75, back + 2.2); scene.add(alt);
  const cloth = box(5.3, 0.22, 2, lam('#fbf6ea')); cloth.position.set(0, 1.56, back + 2.2); scene.add(cloth);
  const front_ = box(4.2, 1.1, 0.05, lam('#f2ecdc')); front_.position.set(0, 0.85, back + 3.21); scene.add(front_);
  const tab = box(0.9, 0.9, 0.7, lam('#c9a24a', { emissive: '#5a4010', emissiveIntensity: 0.4 })); tab.position.set(0, 2.1, back + 1.8); scene.add(tab);
  const crossM = lam('#5a3a22');
  const cv = box(0.4, 4.4, 0.3, crossM); cv.position.set(0, 5.6, back + 0.7); scene.add(cv);
  const chz = box(2.4, 0.4, 0.3, crossM); chz.position.set(0, 6.6, back + 0.7); scene.add(chz);
  const glow = sprite(warm, 14, 0.75, true); glow.position.set(0, 4.8, back + 1.2); scene.add(glow);
  const flames = [];
  [-1.8, 1.8].forEach((x) => {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.8, 8), lam('#f6efe0')); c.position.set(x, 2.07, back + 2.1); scene.add(c);
    const fl = sprite(flameTex, 0.9, 0.9, true); fl.position.set(x, 2.62, back + 2.1); scene.add(fl); flames.push(fl);
    const halo = sprite(warm, 3.4, 0.45, true); halo.position.set(x, 2.6, back + 2.2); scene.add(halo); flames.push(halo);
  });
  // benches
  for (const z of [back + 9, back + 14, back + 19]) for (const side of [-1, 1]) { const b = box(4.6, 0.25, 1, lam('#6a4428')); b.position.set(side * 3.6, 0.9, z); scene.add(b);
    for (const dx of [-1.8, 1.8]) { const lg = box(0.2, 0.9, 0.8, lam('#5a3a22')); lg.position.set(side * 3.6 + dx, 0.45, z); scene.add(lg); } }
  // window in the left wall with a light shaft (day -> evening at V.dusk)
  const winM = glowMat('#fff2c8', 0.95);
  const wn = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.4), winM); wn.position.set(-6.9, 5, back + 12); wn.rotation.y = Math.PI / 2; scene.add(wn);
  const fr1 = box(0.2, 2.6, 0.2, lam('#4a3020')); fr1.position.set(-6.85, 5, back + 12); scene.add(fr1);
  const fr2 = box(0.2, 0.2, 2.8, lam('#4a3020')); fr2.position.set(-6.85, 5, back + 12); scene.add(fr2);
  const shaftM = new THREE.MeshBasicMaterial({ color: '#ffe4b0', transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 14), shaftM); sh.position.set(-2.4, 3, back + 12); sh.rotation.set(0, Math.PI / 2, -0.85); scene.add(sh);
  const cam = camera(0, 3.8, 0, 0.05), d0 = 10;
  const day = col('#fff2c8'), eve = col('#f0905a'), dusk = V.dusk ?? 999;
  return { scene, cam, update(t, p) {
    const z = 7 * p; cam.position.set(0, 3.8, z);
    cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    const k = Math.min(1, Math.max(0, (t - dusk) / 1.2));
    winM.color.copy(day).lerp(eve, k); shaftM.opacity = 0.13 * (1 - k * 0.7); hemi.intensity = 1.25 - 0.35 * k; key.intensity = 1.5 - 0.8 * k;
    flames.forEach((fl, j) => { fl.material.opacity = (j % 2 ? 0.45 + 0.3 * k : 0.85) + 0.12 * Math.sin(t * 7 + j * 1.7); });
    return {};
  } };
}

export const BUILD = { prairieHook: () => prairie('hook'), prairieGlory: () => prairie('glory'), chapel: () => logChapel() };

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
