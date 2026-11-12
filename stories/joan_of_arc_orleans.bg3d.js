// three.js backgrounds for St. Joan of Arc: the Siege of Orléans (anime style; browser module, build.mjs copies it to
// work/<slug>/bg3d.mjs). One pastel Loire in three set-ups: 'dusk' (hook, push-fast toward the Tourelles on the bridge),
// 'night' (April 29: Orléans across the river with torches on the walls, pan-r), 'sunset' (May 7 evening: a real dolly
// zoom with the Tourelles looming behind Joan). Characters, boat and near bank stay SVG on top. Deterministic: drawn
// from timeline time only. Helpers and wiring come from bakhita_freedom.bg3d.js (copied next to this file as bakhita.bg3d.js).
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { W, H, FOV, TH, rng, canvasTex, skyTex, glowTex, lam, ridge, cloud, stars, sprite, atScreen, makeView, newRenderer } = B;

const col = (h) => new THREE.Color(h);
const mixc = (a, b, t) => col(a).lerp(col(b), t);
const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
function camera(x, y, z, pitch) {
  const cam = new THREE.PerspectiveCamera(FOV, W / H, 0.3, 3000);
  cam.position.set(x, y, z); cam.rotation.set(pitch, 0, 0, 'YXZ'); cam.updateMatrixWorld(); return cam;
}
function streakTex(seed, color) {
  const r = rng(seed);
  const t = canvasTex(256, 512, (g) => { g.clearRect(0, 0, 256, 512);
    for (let k = 0; k < 90; k++) { const x = r() * 256, y = r() * 512, w = 12 + r() * 50; g.fillStyle = `rgba(${color},${0.12 + r() * 0.3})`; g.fillRect(x, y, w, 2 + r() * 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
const warm = glowTex([[0, 'rgba(255,243,210,1)'], [0.22, 'rgba(255,214,170,.75)'], [0.6, 'rgba(255,170,150,.22)'], [1, 'rgba(255,170,150,0)']]);
const torchG = glowTex([[0, 'rgba(255,236,170,1)'], [0.3, 'rgba(255,190,110,.6)'], [1, 'rgba(255,150,90,0)']]);
const moonG = glowTex([[0, 'rgba(255,255,245,1)'], [0.18, 'rgba(240,240,255,.9)'], [0.24, 'rgba(200,210,255,.35)'], [1, 'rgba(180,190,255,0)']]);

// a round tower with a crenel ring and a pastel cone roof
function tower(x, z, r, h, wall, roof, g) {
  const t = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.06, h, 20), lam(wall)); t.position.set(x, h / 2, z); g.add(t);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.16, r * 1.12, 1.1, 20), lam(mixc(wall, '#ffffff', 0.1))); ring.position.set(x, h + 0.2, z); g.add(ring);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(r * 1.24, r * 1.9, 20), lam(roof)); cone.position.set(x, h + 0.75 + r * 0.95, z); g.add(cone);
  for (const yy of [h * 0.45, h * 0.72]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1.1), lam('#3a2e48')); w.position.set(x, yy, z + r + 0.02); g.add(w); }
}
// the Tourelles: twin towers and a gatehouse on the bridge's last piers, south bank of the Loire
function tourelles(x, z, wall, roof) {
  const g = new THREE.Group(), m = lam(wall), d = lam(mixc(wall, '#3a2e48', 0.2));
  const pier = box(16, 3, 8, d); pier.position.set(0, 1.5, 0); g.add(pier);
  const gate = box(8, 10, 6, m); gate.position.set(0, 8, 0); g.add(gate);
  for (let k = -3.5; k <= 3.6; k += 1.4) { const mer = box(0.8, 1, 6.1, m); mer.position.set(k, 13.5, 0); g.add(mer); }
  const door = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.6), lam('#3a2e48')); door.position.set(0, 4.8, 3.02); g.add(door);
  tower(-5.4, 0.6, 2.6, 15, wall, roof, g); tower(5.4, 0.6, 2.6, 15, wall, roof, g);
  g.position.set(x, 0, z); return g;
}
// the long stone bridge toward the city: deck on piers
function bridge(x0, x1, z, c) {
  const g = new THREE.Group(), m = lam(c), d = lam(mixc(c, '#3a2e48', 0.25));
  const deck = box(x1 - x0, 1.3, 4, m); deck.position.set((x0 + x1) / 2, 4.2, z); g.add(deck);
  const par = box(x1 - x0, 0.7, 0.4, m); par.position.set((x0 + x1) / 2, 5.2, z + 1.8); g.add(par);
  for (let x = x0 + 2; x < x1; x += 6) { const p = box(1.8, 4, 4.4, d); p.position.set(x, 2, z); g.add(p); }
  return g;
}
// Orléans on the north bank: crenellated wall with towers, houses, the twin towers of the cathedral
function city(z, wall, roof, lit) {
  const g = new THREE.Group(), r = rng(17), m = lam(wall);
  const w = box(150, 8, 2, m); w.position.set(0, 4, z); g.add(w);
  for (let k = -74; k < 75; k += 2.2) { const mer = box(1.1, 1.1, 2.1, m); mer.position.set(k, 8.5, z); g.add(mer); }
  for (let tx = -70; tx <= 70; tx += 17.5) tower(tx, z + 0.6, 2.2, 11, wall, roof, g);
  for (let k = 0; k < 40; k++) {
    const hx = -72 + k * 3.7 + (r() - 0.5), hh = 7 + r() * 7, hc = mixc(wall, '#ffffff', r() * 0.15);
    const h = box(3.3, hh, 3.3, lam(hc)); h.position.set(hx, hh / 2, z - 4 - r() * 8); g.add(h);
    const rf = new THREE.Mesh(new THREE.ConeGeometry(2.6, 2.6, 4), lam(roof)); rf.rotation.y = Math.PI / 4; rf.position.set(hx, hh + 1.3, h.position.z); g.add(rf);
    if (lit && r() < 0.45) { const win = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.9), new THREE.MeshBasicMaterial({ color: '#ffd890' })); win.position.set(hx + (r() - 0.5), hh * 0.6, h.position.z + 1.67); g.add(win); }
  }
  // Sainte-Croix: nave and two towers
  const nave = box(10, 16, 18, lam(mixc(wall, '#ffffff', 0.12))); nave.position.set(8, 8, z - 16); g.add(nave);
  for (const tx of [3, 13]) { const t = box(4.2, 28, 4.2, lam(mixc(wall, '#ffffff', 0.15))); t.position.set(tx, 14, z - 8); g.add(t);
    const sp = new THREE.Mesh(new THREE.ConeGeometry(2.6, 7, 4), lam(roof)); sp.rotation.y = Math.PI / 4; sp.position.set(tx, 31.5, z - 8); g.add(sp); }
  return g;
}

const MODES = {
  dusk: { sky: [[0, '#2e3478'], [0.3, '#7464b4'], [0.45, '#d48cb8'], [0.53, '#f8b4b0'], [1, '#f8b4b0']], fog: '#d8a8c4', water: '#8a80c0',
    hemi: ['#ffdcec', '#3a3060', 1.45], key: ['#ffe0c8', 1.3], sun: [760, 980, 0.8], cam: [0, 2.6, 0, 0.03], stars: 0.6 },
  night: { sky: [[0, '#121846'], [0.38, '#283070'], [0.5, '#4e528e'], [1, '#4e528e']], fog: '#3e4280', water: '#262c62',
    hemi: ['#a8b4f0', '#141838', 1.2], key: ['#c8d0ff', 0.7], sun: null, cam: [0, 2.4, 0, 0.03], stars: 1 },
  sunset: { sky: [[0, '#5a4aa8'], [0.28, '#c088c0'], [0.44, '#ffb0a0'], [0.53, '#ffd8a4'], [1, '#ffd8a4']], fog: '#f0c0b4', water: '#a48cbc',
    hemi: ['#fff0e0', '#4a3a60', 1.6], key: ['#ffd8a8', 1.8], sun: [820, 940, 1.0], cam: [0, 2.6, 0, 0.03], stars: 0 },
};

export function loire(mode = 'dusk') {
  const M = MODES[mode], r = rng(mode.length * 7 + 5);
  const scene = new THREE.Scene();
  scene.background = skyTex(M.sky);
  scene.fog = new THREE.Fog(M.fog, 60, 560);
  scene.add(new THREE.HemisphereLight(M.hemi[0], M.hemi[1], M.hemi[2]));
  const key = new THREE.DirectionalLight(M.key[0], M.key[1]); key.position.set(-50, 60, 40); scene.add(key);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), lam(M.water)); water.rotation.x = -Math.PI / 2; water.position.set(0, 0, -440); scene.add(water);
  const st = streakTex(mode.length, mode === 'night' ? '200,210,255' : '255,236,220'); st.repeat.set(6, 30);
  const sheen = new THREE.Mesh(new THREE.PlaneGeometry(120, 300), new THREE.MeshBasicMaterial({ map: st, transparent: true, opacity: mode === 'night' ? 0.35 : 0.55, depthWrite: false }));
  sheen.rotation.x = -Math.PI / 2; sheen.position.set(0, 0.03, -150); scene.add(sheen);
  scene.add(ridge({ w: 1400, d: 80, z: -340, amp: 40, color: mixc(M.fog, '#3a2e60', 0.3).getStyle(), seed: 5, freq: 0.7 }));
  const wall = mode === 'night' ? '#8a86b8' : '#f0d8d0', roof = mode === 'night' ? '#4a3e78' : '#9a78b8';
  const cam = camera(...M.cam);
  let towers = null;
  if (mode === 'night') {
    scene.add(city(-120, wall, roof, true));
    const north = new THREE.Mesh(new THREE.PlaneGeometry(900, 40), lam(mixc(M.water, '#3a3a6a', 0.5))); north.rotation.x = -Math.PI / 2; north.position.set(0, 0.04, -132); scene.add(north);
  } else {
    scene.add(city(-210, wall, roof, false));
    const north = new THREE.Mesh(new THREE.PlaneGeometry(900, 40), lam(mixc(M.water, '#a0a0c0', 0.4))); north.rotation.x = -Math.PI / 2; north.position.set(0, 0.04, -222); scene.add(north);
    const tz = mode === 'sunset' ? -80 : -84, tx = mode === 'sunset' ? 12 : 13;
    towers = tourelles(tx, tz, wall, roof); scene.add(towers);
    scene.add(bridge(tx - 120, tx - 7, tz, wall));
    const south = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), lam(mixc(M.water, '#88a070', 0.55))); south.rotation.x = -Math.PI / 2; south.position.set(tx + 34, 0.05, tz); scene.add(south);
  }
  if (M.stars) scene.add(stars(mode === 'night' ? 120 : 50, 9, M.stars, { el0: 0.2, el1: 0.6 }));
  // torches on the walls (night) and their reflections
  const torches = [];
  if (mode === 'night') {
    for (let k = 0; k < 14; k++) {
      const x = -66 + k * 10 + (r() - 0.5) * 3, s = sprite(torchG, 5 + r() * 2, 0.95, true); s.position.set(x, 9.6, -118.5); scene.add(s);
      const rf = sprite(torchG, 4, 0.45, true); rf.scale.set(2.2, 12, 1); rf.position.set(x, -0.2, -110); scene.add(rf);
      torches.push([s, rf, r() * 6.3]);
    }
    const moon = sprite(moonG, 160, 1); moon.position.copy(atScreen(cam, 820, 520, 900)); scene.add(moon);
  }
  if (M.sun) { const sunS = sprite(warm, 900, M.sun[2]); sunS.position.copy(atScreen(cam, M.sun[0], M.sun[1], 900)); scene.add(sunS); }
  // mist on the water, pastel clouds in the sky
  const mist = [[-26, 0.8, -50, 1.6], [16, 0.7, -66, 1.9], [36, 0.9, -96, 2.2], [-12, 1.0, -124, 2.4]].map(([x, y, z, s], k) => {
    const c = cloud(x, y, z, s, mode === 'night' ? '#8890d0' : '#ffe8f0', 0.28, 40 + k, 0.35); scene.add(c); return [c, x, k]; });
  const skyC = [[-100, 74, -430, 10, 1], [60, 92, -470, 12, 2], [180, 66, -390, 9, 3], [-20, 120, -520, 13, 4]].filter(([, y]) => mode !== 'sunset' || y < 80).map(([x, y, z, s, sd]) => {
    const c = cloud(x, y * (mode === 'sunset' ? 0.7 : 1), z, s, mode === 'night' ? '#6a70b0' : (mode === 'sunset' ? '#ffe0d8' : '#ffd8ec'), mode === 'night' ? 0.45 : 0.75, 60 + sd, mode === 'night' ? 0.2 : 0.6);
    scene.add(c); return [c, x, sd]; });
  const d0 = 12;
  return { scene, cam, update(t, p) {
    if (mode === 'dusk') cam.position.set(0, 2.6, -6 * p);                  // push-fast toward the Tourelles
    else if (mode === 'night') cam.position.set(-5 + 10 * p, 2.4, 0);       // pan-r along the city walls
    else {                                                                  // dolly zoom: back away while zooming in
      const z = 4 * p; cam.position.set(0, 2.6, z);
      cam.fov = 2 * Math.atan(TH * d0 / (d0 + z)) * 180 / Math.PI; cam.updateProjectionMatrix();
    }
    st.offset.y = -t * 0.03; st.offset.x = Math.sin(t * 0.6) * 0.02;
    mist.forEach(([c, x, k]) => { c.position.x = x + t * (0.5 + k * 0.2) * (k % 2 ? -1 : 1); });
    skyC.forEach(([c, x, k]) => { c.position.x = x + t * (1.0 + k * 0.4); });
    torches.forEach(([s, rf, ph]) => { const f = 0.8 + 0.2 * Math.sin(t * 9 + ph) * Math.sin(t * 5.3 + ph * 2); s.material.opacity = f; rf.material.opacity = 0.35 * f; });
    return {};
  } };
}

export const BUILD = { loireDusk: () => loire('dusk'), loireNight: () => loire('night'), loireSunset: () => loire('sunset') };

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
