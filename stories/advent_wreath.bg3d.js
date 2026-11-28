// ALL-3D reel: the first Advent wreath (Wichern, Rauhes Haus, Hamburg 1839). Everything in the picture is three.js:
// cel-shaded chibi characters (chibi()), the candle wheel (wheel3d()), three sets and a free camera (camRig: orbit, crane,
// low and high angles, level horizon). The SVG art is empty. Word times come from STORY.bg3d_vars.T.
//   hook   Betsaal, the wheel ablaze over Wichern and the children        [betsaal 'warm']
//   farm   the thatched Rauhes Haus in snow at dusk, children arriving     [farm()]
//   ask    Betsaal by lamplight, children crowding Wichern                 [betsaal 'lamp']
//   build  the wheel on the floor, candles fixed one by one, then hoisted  [betsaal 'lamp']
//   first  dark Betsaal, one flame                                          [betsaal 'night']
//   grow   candles lighting one by one, the room brightening               [betsaal 'night' -> 'warm']
//   fir    the wheel wrapped in fir and white ribbons (1860)                [betsaal 'warm', fir]
//   home   a family's four-candle wreath today, lit one by one             [home()]
//   last   the first purple candle, a child's face                          [home()]
// Exported for later reels: chibi, wheel3d, wreath3d, camRig, betsaalRoom, farm3d, homeRoom.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;
const B = await import('./bakhita.bg3d.js');
window.BG3D_LIB = prevLib;
const { rng, glowTex, sprite, canvasTex, newRenderer, W, H } = B;

const TV = (window.BG3D_VARS && window.BG3D_VARS.T) || {};
const tt = (i, k, d) => (TV[i] && Number.isFinite(TV[i][k]) ? TV[i][k] : d);

// ------------------------------------------------------------------ materials and small helpers
const GRAD = (() => { const t = new THREE.DataTexture(new Uint8Array([120, 190, 255]), 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const toon = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: GRAD, ...o });
const flat = (c, o = {}) => new THREE.MeshBasicMaterial({ color: c, ...o });
const put = (m, x = 0, y = 0, z = 0) => { m.position.set(x, y, z); return m; };
const lathe = (pts, mat, seg = 32) => new THREE.Mesh(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg), mat);
const box = (w, h, d, mat, x = 0, y = 0, z = 0) => put(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat), x, y, z);
const sm = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
const io3 = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const yawTo = (a, b) => Math.atan2(b[0] - a[0], b[1] - a[1]);
const FLAME = glowTex([[0, 'rgba(255,246,210,1)'], [0.18, 'rgba(255,214,130,.75)'], [0.5, 'rgba(255,170,70,.22)'], [1, 'rgba(255,150,60,0)']]);
const MOTE = glowTex([[0, 'rgba(255,240,200,1)'], [0.3, 'rgba(255,220,160,.6)'], [1, 'rgba(255,210,150,0)']]);
const SNOWT = glowTex([[0, 'rgba(255,255,255,1)'], [0.45, 'rgba(240,244,255,.7)'], [1, 'rgba(230,236,255,0)']]);

// value of a schedule [[t, v], …] at time t, each change eased over `dur` (dur 0 = instant)
function at(list, t, dur = 0.4) {
  let v = list[0][1];
  for (let i = 1; i < list.length; i++) {
    const [ti, vi] = list[i]; if (t < ti) break;
    const e = dur ? sm((t - ti) / dur) : 1;
    v = Array.isArray(vi) ? vi.map((x, k) => v[k] + (x - v[k]) * e) : typeof vi === 'number' ? v + (vi - v) * e : vi;
  }
  return v;
}

// ------------------------------------------------------------------ camera: keys { t, look, r, a, e, fov, dur }
// a = azimuth (deg, 0 = camera on +z of the target), e = elevation (deg, + above looking down, - below looking up).
// Hold-and-move: creep 6 % during the hold, then an eased move of `dur` s landing on the key's word.
export function camRig(cam, keys, bounds = null) {
  const K = keys.map((k) => ({ dur: 1.3, fov: 46, ...k }));
  const pose = (look, r, a, e, fov) => {
    const ar = a * Math.PI / 180, er = e * Math.PI / 180;
    cam.position.set(look[0] + r * Math.cos(er) * Math.sin(ar), look[1] + r * Math.sin(er), look[2] + r * Math.cos(er) * Math.cos(ar));
    if (bounds) cam.position.clamp(new THREE.Vector3(...bounds[0]), new THREE.Vector3(...bounds[1]));   // stay inside the room
    cam.up.set(0, 1, 0); cam.lookAt(look[0], look[1], look[2]);
    if (cam.fov !== fov) { cam.fov = fov; cam.updateProjectionMatrix(); }
  };
  return (t) => {
    let A = K[0], Bk = null, u = 0;
    for (let i = 1; i < K.length; i++) {
      const k = K[i];
      if (t >= k.t) { A = k; continue; }
      Bk = k; const h0 = K[i - 1].t, s0 = Math.max(h0, k.t - k.dur);
      u = t < s0 ? 0.06 * ((t - h0) / Math.max(0.01, s0 - h0)) : 0.06 + 0.94 * io3((t - s0) / Math.max(0.01, k.t - s0));
      break;
    }
    if (!Bk) { const d = t - A.t; return pose(A.look, A.r * (1 - 0.012 * d), A.a + (A.spin ?? 0.8) * d, A.e, A.fov); }
    const L = (p, q) => p + (q - p) * u;
    pose(A.look.map((x, i) => L(x, Bk.look[i])), L(A.r, Bk.r), L(A.a, Bk.a), L(A.e, Bk.e), L(A.fov, Bk.fov));
  };
}

// ------------------------------------------------------------------ chibi character (person units: feet 0, head 2.52, r .42)
// o: kind 'gown'|'boy'|'girl'|'woman', top, legs, dress, apron, hair, style 'short'|'side'|'braids'|'bun', cap, scarf, bands,
// skin, s (1 adult, .62 child), pos [x, z], walk [[t0, t1, [x, z], [x, z]]], face [[t, yaw]], up [[t, pitch]],
// mood [[t, name]], arms [[t, [lOut, lFwd, rOut, rFwd]]], propR (Object3D in the right hand)
const MOODS = {
  happy: { m: 'smile' }, joy: { m: 'grin', bu: 0.03 }, surprised: { m: 'o', bu: 0.05, eye: 1.15 }, awe: { m: 'o', bu: 0.035, eye: 1.08 },
  worried: { m: 'frown', bt: 0.32, bu: 0.015 }, think: { m: 'line', bt: -0.12 }, tender: { m: 'smile', closed: true }, peaceful: { m: 'smile', closed: true },
};
export function chibi(o = {}) {
  const P = { skin: '#eab792', hair: '#5a3a22', top: '#4a5a7a', legs: '#4a3a30', shoes: '#2e2420', kind: 'boy', style: 'short', s: 1, pos: [0, 0], ...o };
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(0.72, 28), flat('#140c10', { transparent: true, opacity: 0.3, depthWrite: false }));
  sh.rotation.x = -Math.PI / 2; sh.position.y = 0.015; g.add(sh);
  const legs = [];
  if (P.kind !== 'gown') for (const s of [-1, 1]) {
    const hip = put(new THREE.Group(), s * 0.15, 0.98, 0); body.add(hip); legs.push(hip);
    hip.add(put(new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.62, 6, 12), toon(P.kind === 'boy' ? P.legs : (P.stock || '#e8e0d0'))), 0, -0.48, 0));
    const boot = put(new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), toon(P.shoes)), 0, -0.9, 0.06); boot.scale.set(0.14, 0.09, 0.21); hip.add(boot);
  }
  if (P.kind === 'gown') {
    body.add(lathe([[0.001, 0.04], [0.56, 0.04], [0.53, 0.5], [0.47, 1.1], [0.44, 1.6], [0.43, 1.9], [0.33, 2.04], [0.15, 2.12]], toon(P.top)));
    for (const s of [-1, 1]) { const sh2 = put(new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), toon(P.shoes)), s * 0.17, 0.06, 0.42); sh2.scale.set(0.13, 0.07, 0.16); body.add(sh2); }
  } else {
    const tor = lathe([[0.001, 0.9], [0.4, 0.92], [0.44, 1.2], [0.43, 1.55], [0.41, 1.85], [0.33, 2.02], [0.15, 2.1]], toon(P.top)); tor.scale.z = 0.84; body.add(tor);
    if (P.kind === 'girl' || P.kind === 'woman') {
      body.add(lathe([[0.001, P.kind === 'woman' ? 0.1 : 0.3], [0.52, P.kind === 'woman' ? 0.1 : 0.3], [0.48, 0.62], [0.42, 1.0], [0.4, 1.2]], toon(P.dress || P.top)));
      if (P.apron) { const ap = box(0.5, 0.75, 0.04, toon(P.apron), 0, P.kind === 'woman' ? 0.6 : 0.75, 0.43); ap.rotation.x = -0.1; body.add(ap); }
    } else {
      for (const y of [1.3, 1.55, 1.8]) body.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), toon('#d8c8a0')), 0, y, 0.365));
      const belt = put(new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.03, 6, 32), toon('#3a2a1e')), 0, 1.0, 0); belt.rotation.x = Math.PI / 2; belt.scale.y = 0.84; body.add(belt);
    }
  }
  if (P.bands) {   // Lutheran preaching bands (Beffchen) and white collar
    const c = put(new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.035, 6, 24), toon('#f4f0e6')), 0, 2.07, 0.02); c.rotation.x = Math.PI / 2; body.add(c);
    for (const s of [-1, 1]) { const b = box(0.075, 0.24, 0.02, toon('#fbf8f0'), s * 0.045, 1.9, 0.355); b.rotation.x = -0.18; body.add(b); }
  }
  if (P.scarf) { const sc = put(new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.075, 8, 24), toon(P.scarf)), 0, 2.06, 0); sc.rotation.x = Math.PI / 2; body.add(sc); }
  body.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.22, 12), toon(P.skin)), 0, 2.15, 0));
  const arm = (s) => {
    const p = put(new THREE.Group(), s * 0.4, 1.95, 0);
    p.add(put(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.6, 6, 12), toon(P.sleeve || P.top)), 0, -0.4, 0));
    p.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 10), toon(P.skin)), 0, -0.82, 0));
    body.add(p); return p;
  };
  const armL = arm(-1), armR = arm(1);
  if (P.propR) { const h = put(new THREE.Group(), 0, -0.84, 0.04); h.add(P.propR); armR.add(h); }
  // head
  const head = put(new THREE.Group(), 0, 2.52, 0); body.add(head);
  head.add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 36, 26), toon(P.skin)));
  for (const s of [-1, 1]) head.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 10), toon(P.skin)), s * 0.41, -0.02, 0));
  const onFace = (m, x, y, lift = 0.004) => {
    const n = new THREE.Vector3(x, y, Math.sqrt(Math.max(0, 0.42 ** 2 - x * x - y * y))).normalize();
    m.position.copy(n.clone().multiplyScalar(0.42 + lift)); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n); head.add(m); return m;
  };
  const INK = '#2b1d14';
  const eyes = [-1, 1].map((s) => {
    const e = new THREE.Group();
    const pu = new THREE.Mesh(new THREE.SphereGeometry(0.066, 18, 14), flat(INK)); pu.scale.set(1, 1.3, 0.45); e.add(pu);
    e.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.023, 10, 8), flat('#ffffff')), -0.02, 0.036, 0.03));
    e.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), flat('#ffffff', { transparent: true, opacity: 0.8 })), 0.022, -0.03, 0.03));
    return onFace(e, s * 0.145, -0.01, 0);
  });
  for (const s of [-1, 1]) onFace(new THREE.Mesh(new THREE.CircleGeometry(0.075, 20), flat('#ef6f6a', { transparent: true, opacity: 0.32, depthWrite: false })), s * 0.25, -0.12, 0.006);
  const brows = [-1, 1].map((s) => { const gB = new THREE.Group(), b = box(0.11, 0.026, 0.02, flat(P.brow || P.hair)); gB.add(b); onFace(gB, s * 0.145, 0.125, 0.004); return [gB, b, s]; });
  const arc = (a, rot, c = '#5a2620', r = 0.06) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.014, 6, 20, Math.PI * a), flat(c)); const gM = new THREE.Group(); m.rotation.z = rot; gM.add(m); return gM; };
  const mouths = {
    smile: onFace(arc(0.75, Math.PI + Math.PI * 0.125), 0, -0.18),
    grin: (() => { const gM = new THREE.Group(); gM.add(new THREE.Mesh(new THREE.CircleGeometry(0.08, 20, Math.PI, Math.PI), flat('#6a2622'))); gM.add(put(new THREE.Mesh(new THREE.CircleGeometry(0.035, 14, Math.PI, Math.PI), flat('#e8787a')), 0, -0.035, 0.002)); return onFace(gM, 0, -0.17); })(),
    o: (() => { const m = new THREE.Mesh(new THREE.CircleGeometry(0.045, 18), flat('#5a2620')); m.scale.y = 1.3; const gM = new THREE.Group(); gM.add(m); return onFace(gM, 0, -0.2); })(),
    frown: onFace(arc(0.5, Math.PI * 0.25, '#5a2620', 0.045), 0, -0.23),
    line: (() => { const gM = new THREE.Group(), m = new THREE.Mesh(new THREE.CapsuleGeometry(0.013, 0.07, 4, 8), flat('#5a2620')); m.rotation.z = Math.PI / 2; gM.add(m); return onFace(gM, 0, -0.2); })(),
  };
  // hair
  const hm = toon(P.hair);
  if (P.style !== 'none') {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.455, 32, 14, 0, Math.PI * 2, 0, 1.18), hm); cap.rotation.x = -0.32; head.add(cap);
    head.add(new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 16, Math.PI, Math.PI, 0, P.style === 'braids' || P.style === 'bun' ? 2.2 : 1.95), hm));
  }
  if (P.style === 'short') { const fr = put(new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 10), hm), 0.08, 0.3, 0.28); fr.scale.set(1.3, 0.45, 0.8); head.add(fr); }
  if (P.style === 'side') {
    const sw = put(new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 12), hm), -0.12, 0.3, 0.22); sw.scale.set(1.35, 0.5, 0.9); sw.rotation.z = 0.25; head.add(sw);
    for (const s of [-1, 1]) head.add(box(0.06, 0.2, 0.12, hm, s * 0.405, -0.03, 0.08));
  }
  if (P.style === 'braids') for (const s of [-1, 1]) {
    head.add(put(new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.42, 6, 10), hm), s * 0.36, -0.45, -0.08));
    head.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), toon(P.ribbon || '#c84a4a')), s * 0.36, -0.72, -0.08));
  }
  if (P.style === 'bun') head.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), hm), 0, 0.22, -0.4));
  if (P.cap) {
    head.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.47, 0.16, 28), toon(P.cap)), 0, 0.3, -0.02));
    const br = box(0.5, 0.035, 0.22, toon(P.cap), 0, 0.24, 0.42); br.rotation.x = 0.25; head.add(br);
  }
  if (P.scarfHead) { const hs = new THREE.Mesh(new THREE.SphereGeometry(0.475, 28, 14, 0, Math.PI * 2, 0, 1.5), toon(P.scarfHead)); hs.rotation.x = -0.45; head.add(hs); }
  g.scale.setScalar(1.45 * P.s);
  g.position.set(P.pos[0], 0, P.pos[1]);
  const ph = (P.pos[0] * 1.7 + P.pos[1] * 0.9) % 6.28;
  const faceL = P.face || [[0, 0]], upL = P.up || [[0, 0]], moodL = P.mood || [[0, 'happy']], armsL = P.arms || [[0, [0.12, 0, 0.12, 0]]];
  return { group: g, head, P, update(t) {
    let x = P.pos[0], z = P.pos[1], walking = 0, yaw = at(faceL, t, 0.45);
    for (const [t0, t1, a, b] of P.walk || []) {
      if (t < t0) break;
      const u = Math.min(1, (t - t0) / (t1 - t0)); x = a[0] + (b[0] - a[0]) * u; z = a[1] + (b[1] - a[1]) * u;
      if (u < 1) { walking = 1; yaw = Math.atan2(b[0] - a[0], b[1] - a[1]); }
    }
    g.position.set(x, 0, z); g.rotation.y = yaw;
    const sw = Math.sin(t * 8.5 + ph) * walking;
    legs.forEach((l, i) => { l.rotation.x = (i ? 1 : -1) * 0.55 * sw; });
    body.position.y = walking ? Math.abs(Math.sin(t * 8.5 + ph)) * 0.06 : 0.012 * Math.sin(t * 2.6 + ph);
    const up = at(upL, t, 0.5);
    head.rotation.x = -up + 0.03 * Math.sin(t * 0.9 + ph); head.rotation.y = 0.07 * Math.sin(t * 0.7 + ph); head.rotation.z = 0.03 * Math.sin(t * 1.1 + ph);
    body.rotation.x = -up * 0.1;
    const A = at(armsL, t, 0.2);
    const swing = walking ? 0.45 * sw : 0.03 * Math.sin(t * 1.6 + ph);
    armL.rotation.set(-A[1] + swing, 0, -A[0]); armR.rotation.set(-A[3] - swing, 0, A[2]);
    const M = MOODS[at(moodL, t, 0)] || MOODS.happy;
    for (const k in mouths) mouths[k].visible = k === M.m;
    brows.forEach(([gB, b, s]) => { b.position.y = M.bu || 0; b.rotation.z = -s * (M.bt || 0); });
    const k = (t + ph) % 3.7, blink = k < 0.14 ? Math.abs(Math.cos((k / 0.14) * Math.PI)) * 0.9 + 0.1 : 1;
    eyes.forEach((e) => { e.scale.setScalar(M.eye || 1); e.scale.y = (M.closed ? 0.14 : blink) * (M.eye || 1); });
  } };
}

// ------------------------------------------------------------------ flames, candles, the wheel, a modern wreath
function flame(h = 0.17) {
  const g = new THREE.Group();
  const core = put(new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), flat('#fff4c0', { transparent: true })), 0, h * 0.5, 0); core.scale.set(h * 0.26, h * 0.55, h * 0.26); g.add(core);
  const inner = put(new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), flat('#ffb040', { transparent: true })), 0, h * 0.32, 0); inner.scale.set(h * 0.18, h * 0.3, h * 0.18); g.add(inner);
  const glow = sprite(FLAME, h * 6.5, 0, true); glow.position.y = h * 0.5; g.add(glow);
  return { group: g, set(on, t, ph) {
    const f = 1 + 0.1 * Math.sin(t * 13 + ph) + 0.06 * Math.sin(t * 23 + ph * 2);
    g.visible = on > 0.01; g.scale.set(on, on * f, on);
    core.material.opacity = inner.material.opacity = Math.min(1, on * 1.2);
    glow.material.opacity = 0.85 * on * (0.9 + 0.1 * f);
  } };
}
function candle(r, h, color) {
  const g = new THREE.Group();
  g.add(put(new THREE.Mesh(new THREE.CylinderGeometry(r * 1.5, r * 1.7, 0.04, 14), toon('#b08a4a')), 0, 0.02, 0));
  g.add(put(new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 14), toon(color)), 0, 0.04 + h / 2, 0));
  g.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.05, 4), flat('#2a2020')), 0, 0.06 + h, 0));
  const fl = flame(0.11 + r * 1.1); fl.group.position.y = 0.065 + h; g.add(fl.group);
  return { group: g, fl, tip: h + 0.1 };
}
// Wichern's wheel: n candles, day 1 a Sunday (big white), then six small red ones (the traditional picture)
export function wheel3d({ R = 1.6, n = 24, fir = false, ropes = true } = {}) {
  const g = new THREE.Group(), wood = toon('#8a5a32'), dark = toon('#6a4224');
  const rim = new THREE.Mesh(new THREE.TorusGeometry(R, 0.11, 10, 72), wood); rim.rotation.x = Math.PI / 2; rim.scale.z = 1.3; g.add(rim);
  const rim2 = new THREE.Mesh(new THREE.TorusGeometry(R - 0.14, 0.05, 8, 72), dark); rim2.rotation.x = Math.PI / 2; g.add(rim2);
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2, sp = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, R - 0.15, 8), wood);
    sp.rotation.z = Math.PI / 2; const gS = new THREE.Group(); sp.position.x = (R - 0.15) / 2; gS.add(sp); gS.rotation.y = a; g.add(gS); }
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.34, 18), dark));
  const ropeGrp = new THREE.Group(); g.add(ropeGrp);
  if (ropes) for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4, p = new THREE.Vector3(Math.cos(a) * R, 0.05, Math.sin(a) * R), top = new THREE.Vector3(0, 2.6, 0);
    const len = p.distanceTo(top), m = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, len, 5), toon('#b89a6a'));
    m.position.copy(p.clone().add(top).multiplyScalar(0.5)); m.lookAt(top); m.rotateX(Math.PI / 2); ropeGrp.add(m);
  }
  if (ropes) ropeGrp.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 6, 5), toon('#b89a6a')), 0, 5.6, 0));
  const candles = [];
  for (let k = 0; k < n; k++) {
    const a = Math.PI / 2 + (k / n) * Math.PI * 2, sun = k % 7 === 0;
    const c = sun ? candle(0.085, 0.5, '#f6f0e2') : candle(0.042, 0.3, '#c0333a');
    c.group.position.set(Math.cos(a) * R, 0.11, Math.sin(a) * R); g.add(c.group);
    candles.push({ ...c, sun, k, ph: k * 1.37, local: c.group.position.clone().add(new THREE.Vector3(0, c.tip, 0)) });
  }
  if (fir) {
    const r = rng(41), greens = ['#2e5a36', '#3a6e40', '#24482c', '#467a48'].map((c) => toon(c));
    for (let i = 0; i < 170; i++) {
      const a = r() * Math.PI * 2, rr = R + (r() - 0.5) * 0.36, s = 0.1 + r() * 0.1;
      const m = put(new THREE.Mesh(new THREE.IcosahedronGeometry(s, 0), greens[i % 4]), Math.cos(a) * rr, (r() - 0.6) * 0.22, Math.sin(a) * rr);
      m.rotation.set(r() * 3, r() * 3, r() * 3); m.scale.y = 0.7; g.add(m);
    }
    for (let i = 0; i < 4; i++) {   // white ribbons with bows at the rope points
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4, x = Math.cos(a) * R, z = Math.sin(a) * R, rib = toon('#fbf6ea', { side: THREE.DoubleSide });
      const tail = box(0.12, 0.8, 0.02, rib, x, -0.45, z); tail.rotation.y = -a; g.add(tail);
      for (const s of [-1, 1]) { const b = put(new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), rib), x + Math.cos(a + Math.PI / 2) * s * 0.12, 0.02, z + Math.sin(a + Math.PI / 2) * s * 0.12); b.scale.set(1, 0.6, 0.5); g.add(b); }
    }
  }
  return { group: g, candles, ropes: ropeGrp,
    set(t, litFn, showFn) {
      for (const c of candles) { const s = showFn ? showFn(c.k) : 1; c.group.visible = s > 0.01; c.group.scale.setScalar(Math.max(0.001, s)); c.fl.set(litFn(c.k), t, c.ph); }
    },
    tip(k) { return g.localToWorld(candles[k].local.clone()); } };
}
// a family Advent wreath: fir ring, three purple candles and one rose (lit in the order 0, 1, 2 (rose), 3)
export function wreath3d({ R = 0.55 } = {}) {
  const g = new THREE.Group(), r = rng(7), greens = ['#2e5a36', '#3a6e40', '#24482c', '#467a48'].map((c) => toon(c));
  for (let i = 0; i < 120; i++) {
    const a = r() * Math.PI * 2, rr = R + (r() - 0.5) * 0.3, s = 0.07 + r() * 0.07;
    const m = put(new THREE.Mesh(new THREE.IcosahedronGeometry(s, 0), greens[i % 4]), Math.cos(a) * rr, 0.05 + r() * 0.1, Math.sin(a) * rr);
    m.rotation.set(r() * 3, r() * 3, r() * 3); g.add(m);
  }
  for (let i = 0; i < 14; i++) { const a = r() * Math.PI * 2, rr = R + (r() - 0.5) * 0.22;
    g.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), toon('#c0283a')), Math.cos(a) * rr, 0.16, Math.sin(a) * rr)); }
  const cols = ['#6a3a8e', '#6a3a8e', '#e08aaa', '#6a3a8e'], candles = [];
  for (let k = 0; k < 4; k++) {
    const a = Math.PI * 0.75 - k * Math.PI / 2, c = candle(0.075, 0.55, cols[k]);
    c.group.position.set(Math.cos(a) * R, 0.06, Math.sin(a) * R); g.add(c.group);
    candles.push({ ...c, k, ph: k * 2.1, local: c.group.position.clone().add(new THREE.Vector3(0, c.tip, 0)) });
  }
  return { group: g, candles, set(t, litFn) { for (const c of candles) c.fl.set(litFn(c.k), t, c.ph); }, tip(k) { return g.localToWorld(candles[k].local.clone()); } };
}

// ------------------------------------------------------------------ scene base, air
function base(bg, fogC, near = 22, far = 60) {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(bg); scene.fog = new THREE.Fog(fogC, near, far);
  const cam = new THREE.PerspectiveCamera(46, W / H, 0.05, 500);
  return { scene, cam };
}
function skyDome(stops) {   // [[y01, color], …] bottom → top, rotation-proof
  const geo = new THREE.SphereGeometry(300, 32, 20), col = [], c = new THREE.Color(), pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = (pos.getY(i) / 300 + 1) / 2; let k = 0; while (k < stops.length - 2 && y > stops[k + 1][0]) k++;
    const [y0, c0] = stops[k], [y1, c1] = stops[k + 1]; c.set(c0).lerp(new THREE.Color(c1), Math.min(1, Math.max(0, (y - y0) / (y1 - y0)))); col.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
}
function motes(scene, { n = 40, x = [-4, 4], y = [0.5, 6], z = [-8, 0], color = '#ffd8a0', size = 7, seed = 9, rise = 0.25, tex = MOTE, op = 0.7 } = {}) {
  const r = rng(seed), b = [];
  for (let i = 0; i < n; i++) b.push([x[0] + r() * (x[1] - x[0]), r(), z[0] + r() * (z[1] - z[0]), r() * 6.3, 0.6 + r() * 0.8]);
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size, sizeAttenuation: false, map: tex, color, transparent: true, opacity: op, depthWrite: false, fog: false }));
  scene.add(pts);
  return { pts, update(t) {
    const a = geo.attributes.position, hy = y[1] - y[0];
    b.forEach(([px, py, pz, ph, sp], i) => { const yy = ((py * hy + t * rise * sp) % hy + hy) % hy; a.setXYZ(i, px + 0.25 * Math.sin(t * 0.7 + ph), y[0] + yy, pz + 0.2 * Math.cos(t * 0.5 + ph)); });
    a.needsUpdate = true;
  } };
}

// ------------------------------------------------------------------ textures
const PLANKS = (() => { const t = canvasTex(512, 512, (g, w, h) => { const r = rng(3);
  for (let i = 0; i < 8; i++) { const y = i * 64; g.fillStyle = `hsl(28, ${34 + r() * 8}%, ${34 + r() * 9}%)`; g.fillRect(0, y, w, 64);
    g.fillStyle = 'rgba(40,20,10,.45)'; g.fillRect(0, y, w, 3); for (let k = 0; k < 2; k++) g.fillRect(r() * w, y, 3, 64);
    g.fillStyle = 'rgba(255,230,200,.06)'; for (let k = 0; k < 6; k++) g.fillRect(r() * w, y + 8 + r() * 48, 60 + r() * 120, 2); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 4); return t; })();
const paneTex = (mode) => canvasTex(128, 192, (g, w, h) => {
  const l = g.createLinearGradient(0, 0, 0, h);
  if (mode === 'dusk') { l.addColorStop(0, '#2c3a72'); l.addColorStop(0.7, '#8a6a9a'); l.addColorStop(1, '#e8a888'); } else { l.addColorStop(0, '#0c1430'); l.addColorStop(1, '#2a3c6c'); }
  g.fillStyle = l; g.fillRect(0, 0, w, h);
  g.fillStyle = mode === 'dusk' ? '#3a3050' : '#141a34'; g.beginPath(); g.moveTo(0, h); g.lineTo(0, h * 0.8); g.lineTo(30, h * 0.72); g.lineTo(60, h * 0.8); g.lineTo(70, h * 0.62); g.lineTo(74, h * 0.5); g.lineTo(78, h * 0.62); g.lineTo(90, h * 0.78); g.lineTo(w, h * 0.74); g.lineTo(w, h); g.fill();
  const r = rng(mode === 'dusk' ? 5 : 6); g.fillStyle = 'rgba(255,255,255,.85)'; for (let i = 0; i < 40; i++) { g.beginPath(); g.arc(r() * w, r() * h, 0.8 + r() * 1.6, 0, 7); g.fill(); }
  g.fillStyle = '#ffd890'; for (let i = 0; i < 4; i++) g.fillRect(10 + r() * 100, h * 0.82 + r() * 20, 3, 4);
});
const TIMBER = (() => { const t = canvasTex(512, 160, (g, w, h) => { g.fillStyle = '#ece2cc'; g.fillRect(0, 0, w, h);
  g.fillStyle = '#5a3a24'; g.fillRect(0, 0, w, 12); g.fillRect(0, h - 12, w, 12); g.fillRect(0, h / 2 - 5, w, 10);
  for (let x = 0; x <= w; x += 64) g.fillRect(x - 5, 0, 10, h);
  g.lineWidth = 8; g.strokeStyle = '#5a3a24'; for (let x = 0; x < w; x += 128) { g.beginPath(); g.moveTo(x, h / 2); g.lineTo(x + 64, 12); g.stroke(); } });
  t.wrapS = THREE.RepeatWrapping; return t; })();
const THATCH = (() => { const t = canvasTex(256, 256, (g, w, h) => { g.fillStyle = '#9a7442'; g.fillRect(0, 0, w, h); const r = rng(12);
  for (let i = 0; i < 900; i++) { g.strokeStyle = `rgba(${r() < 0.5 ? '70,48,24' : '190,150,90'},${0.25 + r() * 0.35})`; g.lineWidth = 1 + r() * 2; const x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 4, y + 14 + r() * 16); g.stroke(); } });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 2); return t; })();

// ------------------------------------------------------------------ the Betsaal (prayer hall) of the Rauhes Haus
export function betsaalRoom(scene, { pane = 'night' } = {}) {
  const X = 8, Z0 = -13, Z1 = 8, HC = 6.6, plaster = toon('#e6d9be'), timber = toon('#5a3a22'), lightWood = toon('#7a5434');
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(2 * X, Z1 - Z0), toon('#ffffff', { map: PLANKS })); floor.rotation.x = -Math.PI / 2; floor.position.z = (Z0 + Z1) / 2; scene.add(floor);
  scene.add(box(2 * X, HC, 0.3, plaster, 0, HC / 2, Z0), box(2 * X, HC, 0.3, plaster, 0, HC / 2, Z1), box(0.3, HC, Z1 - Z0, plaster, -X, HC / 2, (Z0 + Z1) / 2), box(0.3, HC, Z1 - Z0, plaster, X, HC / 2, (Z0 + Z1) / 2));
  scene.add(box(2 * X, 0.25, Z1 - Z0, toon('#6a4a30'), 0, HC, (Z0 + Z1) / 2));
  for (let z = Z0 + 1.6; z < Z1; z += 2.6) scene.add(box(2 * X, 0.36, 0.32, timber, 0, HC - 0.3, z));
  for (const x of [-X + 0.2, X - 0.2]) {
    for (let z = Z0 + 0.2; z <= Z1; z += 3.5) scene.add(box(0.3, HC, 0.32, timber, x, HC / 2, z));
    scene.add(box(0.3, 0.26, Z1 - Z0, timber, x, 2.3, (Z0 + Z1) / 2), box(0.3, 0.3, Z1 - Z0, timber, x, HC - 0.15, (Z0 + Z1) / 2));
  }
  for (let x = -X + 0.2; x <= X; x += 3.2) { scene.add(box(0.32, HC, 0.3, timber, x, HC / 2, Z0 + 0.2)); scene.add(box(0.32, HC, 0.3, timber, x, HC / 2, Z1 - 0.2)); }
  scene.add(box(2 * X, 0.26, 0.3, timber, 0, 2.3, Z0 + 0.2), box(2 * X, 0.26, 0.3, timber, 0, 2.3, Z1 - 0.2));
  const pm = flat('#ffffff', { map: paneTex(pane), fog: false });
  for (const x of [-X + 0.32, X - 0.32]) for (const z of [-8.8, -3.3, 2.2]) {
    const s = Math.sign(x), fr = toon('#4a2e1c');
    const p = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.0), pm); p.position.set(x, 3.6, z); p.rotation.y = -s * Math.PI / 2; scene.add(p);
    scene.add(box(0.2, 2.2, 0.14, fr, x - s * 0.02, 3.6, z - 0.75), box(0.2, 2.2, 0.14, fr, x - s * 0.02, 3.6, z + 0.75), box(0.2, 0.14, 1.6, fr, x - s * 0.02, 4.65, z), box(0.3, 0.16, 1.7, fr, x - s * 0.08, 2.55, z));
    scene.add(box(0.12, 2.0, 0.06, fr, x - s * 0.03, 3.6, z), box(0.12, 0.06, 1.4, fr, x - s * 0.03, 3.7, z));
  }
  // back wall: plain wooden cross, table with Bible and lamp
  scene.add(box(0.26, 2.6, 0.16, lightWood, 0, 4.3, Z0 + 0.3), box(1.5, 0.26, 0.16, lightWood, 0, 4.8, Z0 + 0.3));
  const tab = new THREE.Group(); tab.position.set(0, 0, Z0 + 1.6); scene.add(tab);
  tab.add(box(3, 0.16, 1.2, lightWood, 0, 1.6, 0)); for (const [x, z] of [[-1.35, -0.5], [1.35, -0.5], [-1.35, 0.5], [1.35, 0.5]]) tab.add(box(0.14, 1.6, 0.14, timber, x, 0.8, z));
  tab.add(box(0.9, 0.12, 0.62, toon('#3a2a24'), -0.6, 1.74, 0.05)); const pg = box(0.82, 0.04, 0.56, toon('#f4ecd8'), -0.6, 1.82, 0.05); pg.rotation.z = 0.04; tab.add(pg);
  // benches along the walls
  for (const x of [-6.2, 6.2]) for (const z of [-9.5, -5.2, -0.9, 3.4]) {
    scene.add(box(0.9, 0.12, 3.4, lightWood, x, 1.0, z)); for (const dz of [-1.4, 1.4]) scene.add(box(0.7, 1.0, 0.12, timber, x, 0.5, z + dz));
  }
  scene.add(put(new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 6, 16), toon('#3a3a3a')), 0, HC - 0.4, -4));
  return { HC, tableLamp: new THREE.Vector3(0.8, 1.9, Z0 + 1.6) };
}
function lamp(scene, p, on = 1) {
  const g = new THREE.Group(); g.position.copy(p); scene.add(g);
  g.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.2, 14), toon('#a8803a')), 0, 0, 0));
  g.add(put(new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), flat('#fff0c8', { transparent: true, opacity: 0.85 })), 0, 0.28, 0));
  const gl = sprite(FLAME, 2.6, 0.75 * on, true); gl.position.y = 0.28; g.add(gl);
  const L = new THREE.PointLight('#ffc070', 4 * on, 14, 1); L.position.set(0, 0.4, 0); g.add(L);
  return { g, L, gl };
}

// ------------------------------------------------------------------ the people
const WICH = { kind: 'gown', top: '#1e1c24', sleeve: '#1e1c24', hair: '#4a2e1c', style: 'side', bands: true, skin: '#ecbc98', shoes: '#141014' };
const KIDS = [
  { kind: 'boy', top: '#55627a', legs: '#4a3a2e', hair: '#6a4426', cap: '#3a3a44', skin: '#eab792' },
  { kind: 'girl', top: '#8a3a3a', dress: '#8a3a3a', apron: '#efe6d2', hair: '#c08a4a', style: 'braids', skin: '#f0c4a0', ribbon: '#3a5a8a' },
  { kind: 'boy', top: '#6a5038', legs: '#3a3a44', hair: '#2e2018', skin: '#d9a27a' },
  { kind: 'boy', top: '#4a6a52', legs: '#4a3a2e', hair: '#a8743c', scarf: '#b84a3a', skin: '#f0c4a0' },
  { kind: 'girl', top: '#3e5a8a', dress: '#3e5a8a', apron: '#efe6d2', hair: '#4a2e1e', style: 'braids', skin: '#eab792' },
  { kind: 'boy', top: '#7a6a5a', legs: '#3a3028', hair: '#d8b070', cap: '#5a4a3a', skin: '#f0c4a0' },
  { kind: 'boy', top: '#5a4a6a', legs: '#3a3a44', hair: '#3a2618', scarf: '#d8a84a', skin: '#d9a27a' },
];
const kid = (i, o) => chibi({ ...KIDS[i % KIDS.length], s: 0.62, ...o });
const taper = () => { const g = new THREE.Group(); g.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.1, 8), toon('#f6f0e2')), 0, 0.45, 0)); const f = flame(0.12); f.group.position.y = 1.0; g.add(f.group); g.rotation.x = 0.5; return { g, f }; };

// people around the wheel: each looks up at it
function circleKids(scene, idx, ring, center, o = {}) {
  return ring.map(([x, z], j) => { const c = kid(idx[j], { pos: [x, z], face: [[0, yawTo([x, z], center)]], up: [[0, 0.5]], mood: [[0, 'awe']], ...(o[j] || {}) }); scene.add(c.group); return c; });
}

// ------------------------------------------------------------------ the scenes
const HALL = [[-7.4, 0.3, -12.5], [7.4, 6.2, 7.6]], HOME = [[-5.5, 0.3, -4.5], [5.5, 5.2, 6.6]];
const WH = [0, -4];   // the wheel's floor point

function sHook() {
  const v = base('#1a100c', '#2a1810', 18, 50), T = { wheel: tt(0, 'wheel', 1.6), candles: tt(0, 'candles', 3.6), this: tt(0, 'this', 5.7) };
  betsaalRoom(v.scene, { pane: 'night' });
  const wh = wheel3d(); wh.group.position.set(0, 4.4, -4); v.scene.add(wh.group);
  v.scene.add(new THREE.HemisphereLight('#ffd6a0', '#3a2014', 1.0));
  const warm = new THREE.PointLight('#ffb060', 7, 26, 1); warm.position.set(0, 4.0, -4); v.scene.add(warm);
  const fill = new THREE.DirectionalLight('#ffcf9a', 0.8); fill.position.set(3, 6, 6); v.scene.add(fill);
  const wich = chibi({ ...WICH, pos: [-1.9, -2.5], face: [[0, yawTo([-1.9, -2.5], WH)], [T.this - 0.2, 0.35]], up: [[0, 0.45], [T.this - 0.2, 0.05]],
    mood: [[0, 'awe'], [T.this, 'happy']], arms: [[0, [0.12, 0, 0.12, 0]], [T.candles, [0.12, 0, 0.5, 1.6]], [T.this, [0.12, 0, 0.15, 0.2]]] });
  v.scene.add(wich.group);
  const kids = circleKids(v.scene, [0, 1, 2, 3, 4, 5, 6], [[0.9, -2.2], [2.1, -3.4], [-0.3, -1.6], [1.8, -5.3], [-0.7, -5.7], [0.6, -6.1], [-2.7, -3.9]], WH,
    { 0: { mood: [[0, 'awe'], [T.candles, 'joy']], arms: [[0, [0.1, 0, 0.1, 0]], [T.candles, [0.1, 0, 0.6, 2.2]]] }, 2: { mood: [[0, 'awe'], [T.candles + 0.4, 'joy']] }, 1: { mood: [[0, 'surprised'], [T.this, 'joy']] } });
  const air = motes(v.scene, { n: 46, x: [-4, 4], y: [1, 6.2], z: [-8, 0] });
  const rig = camRig(v.cam, [
    { t: 0, look: [-1.5, 3.6, -3.2], r: 7.6, a: 198, e: -10, fov: 52 },
    { t: T.wheel, look: [0, 4.0, -4], r: 6.6, a: 48, e: -30, fov: 54, dur: 1.5 },
    { t: T.candles, look: [0.4, 3.2, -2.9], r: 5.4, a: 80, e: -4, fov: 50 },
    { t: T.this, look: [-0.6, 3.1, -3.8], r: 9.6, a: 22, e: 7, fov: 50 }], HALL);
  return { ...v, update(t) {
    rig(t); wh.set(t, () => 1); warm.intensity = 7 * (1 + 0.05 * Math.sin(t * 9) + 0.03 * Math.sin(t * 17));
    wich.update(t); kids.forEach((k) => k.update(t)); air.update(t);
  } };
}

function farm3d(scene) {
  scene.add(skyDome([[0, '#2a2a4a'], [0.48, '#e8a080'], [0.53, '#c88aa0'], [0.62, '#5a5a98'], [1, '#141838']]));
  const snow = toon('#eaf0fa');
  const g = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), snow); g.rotation.x = -Math.PI / 2; scene.add(g);
  const r = rng(21);
  for (let i = 0; i < 26; i++) { const m = put(new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), snow), (r() - 0.5) * 60, 0, -30 + r() * 50); m.scale.set(2 + r() * 4, 0.3 + r() * 0.5, 1.5 + r() * 3); if (Math.abs(m.position.x) < 8 && m.position.z > -15 && m.position.z < 6) continue; scene.add(m); }
  const path = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 22), toon('#c8cede')); path.rotation.x = -Math.PI / 2; path.rotation.z = 0.55; path.position.set(-4.5, 0.02, 1); scene.add(path);
  // the thatched farmhouse (Rauhes Haus), long side facing +z
  const hz = -10, wallH = 3.2, wm = toon('#ffffff', { map: TIMBER });
  TIMBER.repeat.set(3, 1);
  scene.add(box(12, wallH, 6, wm, 0, wallH / 2, hz));
  const ang = Math.atan2(3.4, 3.8), sl = Math.hypot(3.8, 3.4) + 0.4;
  for (const s of [1, -1]) {
    const roof = box(13.4, 0.5, sl, toon('#ffffff', { map: THATCH }), 0, wallH + 1.7, hz + s * 1.9); roof.rotation.x = s * ang; scene.add(roof);
    const sn = box(13.0, 0.2, sl * 0.8, snow, 0, wallH + 1.7 + 0.32 * Math.cos(ang), hz + s * (1.9 - 0.32 * Math.sin(ang)) - s * 0.2); sn.rotation.x = s * ang; scene.add(sn);
  }
  const tri = new THREE.Shape([new THREE.Vector2(-3, 0), new THREE.Vector2(3, 0), new THREE.Vector2(0, 3.3)]);
  for (const x of [-6, 6]) { const gb = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.2, bevelEnabled: false }), toon('#e6dac4')); gb.rotation.y = Math.PI / 2; gb.position.set(x - 0.1, wallH, hz); scene.add(gb); }
  scene.add(box(1.2, 2.3, 0.14, toon('#5a3a24'), 0, 1.15, hz + 3.02));
  const winM = flat('#ffcf7a'), win = [];
  for (const x of [-4.2, -2.2, 2.2, 4.2]) { scene.add(box(1.0, 1.0, 0.08, winM, x, 1.75, hz + 3.03)); const gl = sprite(FLAME, 3.4, 0.55, true); gl.position.set(x, 1.75, hz + 3.3); scene.add(gl); win.push(gl);
    scene.add(box(1.2, 0.12, 0.2, toon('#5a3a24'), x, 1.2, hz + 3.08)); }
  scene.add(box(0.8, 1.6, 0.8, toon('#8a6a5a'), 2.6, 7.0, hz - 0.6));
  const doorL = new THREE.PointLight('#ffb860', 5, 14, 1); doorL.position.set(0, 2.4, hz + 4.2); scene.add(doorL);
  // firs, a bare tree, a fence
  const fir = (x, z, s = 1) => { const gF = new THREE.Group(); gF.position.set(x, 0, z); gF.scale.setScalar(s);
    gF.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1, 8), toon('#4a3020')), 0, 0.5, 0));
    [[1.9, 2.2, 1.6], [1.5, 2.0, 2.9], [1.0, 1.8, 4.1]].forEach(([rr, h, y]) => { gF.add(put(new THREE.Mesh(new THREE.ConeGeometry(rr, h, 10), toon('#2a4a38')), 0, y, 0)); gF.add(put(new THREE.Mesh(new THREE.ConeGeometry(rr * 0.75, h * 0.35, 10), snow), 0, y + h * 0.36, 0)); });
    scene.add(gF); };
  [[-10, -6, 1.1], [9, -4, 1.0], [-12, -15, 1.3], [11, -16, 1.4], [15, 1, 1.2], [-17, 3, 1.3], [-22, -10, 1.6], [20, -8, 1.5], [6, 6, 0.9]].forEach((a) => fir(...a));
  const bare = new THREE.Group(); bare.position.set(7.5, 0, -1); scene.add(bare); const bm = toon('#4a3a34');
  bare.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 4, 8), bm), 0, 2, 0));
  for (let i = 0; i < 6; i++) { const b = put(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 2.2, 6), bm), 0, 2.8 + i * 0.3, 0); b.rotation.z = (i % 2 ? 1 : -1) * (0.6 + i * 0.08); b.rotation.y = i * 1.1; b.translateY(1); bare.add(b); }
  for (let x = -8; x <= 8; x += 1.6) { if (Math.abs(x) < 1.5) continue; scene.add(box(0.14, 1.1, 0.14, toon('#6a4a30'), x, 0.55, -5)); }
  scene.add(box(6.6, 0.1, 0.08, toon('#6a4a30'), -4.9, 0.85, -5), box(6.6, 0.1, 0.08, toon('#6a4a30'), 4.9, 0.85, -5));
  // Hamburg far off on the horizon: spires and roofs, a few lit windows
  const city = new THREE.Group(); city.position.set(-70, 0, 55); city.rotation.y = Math.PI * 0.75; scene.add(city); const cm = flat('#3a3a62'), lit = flat('#ffd890');
  for (let i = 0; i < 24; i++) { const w = 3 + r() * 4, h = 3 + r() * 5, x = -40 + i * 3.6; city.add(box(w, h, 3, cm, x, h / 2, r() * 6)); if (r() < 0.6) city.add(box(0.5, 0.6, 0.1, lit, x + (r() - 0.5) * w * 0.6, h * 0.6, 1.6 + r() * 6)); }
  for (const [x, h] of [[-22, 26], [-4, 34], [12, 22], [28, 18]]) { city.add(box(3.4, h * 0.6, 3.4, cm, x, h * 0.3, 2)); city.add(put(new THREE.Mesh(new THREE.ConeGeometry(2.2, h * 0.5, 8), cm), x, h * 0.6 + h * 0.25, 2)); }
  const cityGlow = sprite(FLAME, 60, 0.18, true); cityGlow.position.set(-70, 8, 55); scene.add(cityGlow);
  scene.add(new THREE.HemisphereLight('#9aa4e0', '#e0d8f0', 1.25));
  const key = new THREE.DirectionalLight('#ffc4a0', 1.2); key.position.set(-30, 12, 30); scene.add(key);
  return { win, hz };
}

function sFarm() {
  const v = base('#2a2a4a', '#8a84b0', 30, 140), T = { name: tt(1, 'name', 1.6), took: tt(1, 'took', 3.6), slums: tt(1, 'slums', 6.0) };
  const F = farm3d(v.scene), door = [0.4, -6.3];
  const wich = chibi({ ...WICH, pos: [0.7, -6.4], face: [[0, 0.5], [T.took, -0.6]], up: [[0, 0]], mood: [[0, 'happy'], [T.took, 'tender']],
    arms: [[0, [0.12, 0, 0.12, 0]], [T.name + 0.2, [0.12, 0, 0.9, 0.5]], [T.took, [0.12, 0, 0.6, 1.2]]] });
  v.scene.add(wich.group);
  const route = (i, x0, z0, x1, z1, t0, t1, o = {}) => { const c = kid(i, { pos: [x0, z0], walk: [[t0, t1, [x0, z0], [x1, z1]]], face: [[0, yawTo([x0, z0], [x1, z1])], [t1, yawTo([x1, z1], door)]], mood: [[0, 'worried'], [t1, 'happy']], up: [[0, 0.05]], ...o }); v.scene.add(c.group); return c; };
  const kids = [route(3, -8.6, 4.5, -1.4, -4.8, 0.0, 5.6), route(1, -10.2, 6.0, -2.4, -3.8, 0.4, 6.4), route(5, -12.0, 7.2, -0.6, -3.4, 0.6, 7.2), route(2, -6.4, 3.0, 0.8, -4.4, 0.0, 4.4)];
  const flakes = motes(v.scene, { n: 160, x: [-16, 14], y: [0, 14], z: [-18, 14], color: '#ffffff', size: 6, seed: 4, rise: -0.9, tex: SNOWT, op: 0.9 });
  const rig = camRig(v.cam, [
    { t: 0, look: [-1, 2.6, -6], r: 26, a: -30, e: 22, fov: 44 },
    { t: T.name, look: [0.7, 3.4, -6.4], r: 7.6, a: 12, e: -8, fov: 46 },
    { t: T.took, look: [-1.8, 2.0, -2.2], r: 9.5, a: 62, e: 9, fov: 46 },
    { t: T.slums, look: [-3.4, 2.4, -1], r: 11, a: 118, e: 6, fov: 46 }]);
  return { ...v, update(t) { rig(t); wich.update(t); kids.forEach((k) => k.update(t)); flakes.update(t); F.win.forEach((w, i) => { w.material.opacity = 0.5 + 0.08 * Math.sin(t * 3 + i); }); } };
}

function hallScene(pane, hemiI, hemiSky) {
  const v = base('#1a100c', pane === 'night' ? '#10101c' : '#2a1a10', 18, 50);
  const R = betsaalRoom(v.scene, { pane });
  const hemi = new THREE.HemisphereLight(hemiSky, '#2a1810', hemiI); v.scene.add(hemi);
  return { v, R, hemi };
}

function sAsk() {
  const { v, R } = hallScene('dusk', 0.95, '#ffd8b0'), T = { asked: tt(2, 'asked', 1.4), when: tt(2, 'when', 2.9), needed: tt(2, 'needed', 4.1), see: tt(2, 'see', 5.4) };
  const L = lamp(v.scene, R.tableLamp);
  const warm = new THREE.PointLight('#ffb870', 4, 22, 1); warm.position.set(-1.5, 4.5, -1); v.scene.add(warm);
  const key = new THREE.DirectionalLight('#ffd0a0', 0.7); key.position.set(4, 7, 5); v.scene.add(key);
  const WP = [0, -4.6];
  const wich = chibi({ ...WICH, pos: WP, face: [[0, 0], [T.needed, -0.5], [T.see, 0.15]], up: [[0, -0.25], [T.needed, 0.25], [T.see, -0.1]],
    mood: [[0, 'happy'], [T.needed, 'think'], [T.see, 'joy']], arms: [[0, [0.12, 0, 0.12, 0]], [T.needed, [0.12, 0, 0.2, 1.9]], [T.see, [0.12, 0, 0.35, 2.8]]] });
  v.scene.add(wich.group);
  const ring = [[-1.5, -2.9], [1.4, -3.0], [-0.55, -2.2], [0.75, -2.1], [-2.3, -3.9], [2.2, -4.0], [1.9, -1.6]];
  const kids = ring.map(([x, z], j) => { const c = kid(j, { pos: [x, z], face: [[0, yawTo([x, z], WP)]], up: [[0, 0.45]],
    mood: [[0, 'happy'], [T.when - 0.05 + j * 0.07, j % 2 ? 'surprised' : 'worried'], [T.see, 'surprised']],
    arms: j === 2 ? [[0, [0.1, 0, 0.1, 0]], [T.asked, [0.1, 0, 0.2, 1.5]]] : j === 3 ? [[0, [0.1, 0, 0.1, 0]], [T.when, [0.1, 0, 0.5, 2.6]]] : [[0, [0.1, 0, 0.1, 0]]] });
    v.scene.add(c.group); return c; });
  const air = motes(v.scene, { n: 30, x: [-4, 4], y: [1, 6], z: [-8, 0], size: 5, op: 0.5 });
  const rig = camRig(v.cam, [
    { t: 0, look: [0, 1.6, -3.1], r: 8.5, a: -8, e: 30, fov: 50 },
    { t: T.when, look: [0, 3.5, -4.6], r: 6.2, a: 10, e: -14, fov: 46 },
    { t: T.needed, look: [0, 3.6, -4.6], r: 4.2, a: -48, e: -2, fov: 44 },
    { t: T.see, look: [0, 3.5, -4.6], r: 3.6, a: 8, e: -4, fov: 44 }], HALL);
  return { ...v, update(t) { rig(t); wich.update(t); kids.forEach((k) => k.update(t)); air.update(t); L.L.intensity = 4 * (1 + 0.04 * Math.sin(t * 7)); } };
}

function sBuild() {
  const { v, R } = hallScene('dusk', 1.0, '#ffd8b0'), T = { wheel: tt(3, 'wheel', 1.6), fixed: tt(3, 'fixed', 2.9), big: tt(3, 'big', 5.7), small: tt(3, 'small', 7.0) };
  lamp(v.scene, R.tableLamp);
  const warm = new THREE.PointLight('#ffb870', 4, 22, 1); warm.position.set(0, 4.5, -1); v.scene.add(warm);
  const key = new THREE.DirectionalLight('#ffd0a0', 0.8); key.position.set(-4, 8, 5); v.scene.add(key);
  const wh = wheel3d({ ropes: true }); v.scene.add(wh.group);
  const hold = candle(0.042, 0.3, '#c0333a'); hold.fl.set(0, 0, 0);
  const wich = chibi({ ...WICH, pos: [-2.1, -3.4], propR: hold.group, face: [[0, yawTo([-2.1, -3.4], WH)]], up: [[0, 0.55], [T.big, 0.2]],
    mood: [[0, 'happy'], [T.fixed, 'think'], [T.big, 'joy']], arms: [[0, [0.12, 0, 0.12, 0]], [T.wheel, [0.12, 0, 0.3, 1.0]], [T.fixed, [0.12, 0, 0.3, 1.25]], [T.big, [0.12, 0, 0.25, 0.2]]] });
  v.scene.add(wich.group);
  const kids = [[0.4, -6.3], [1.8, -5.7], [-0.9, -6.2], [2.4, -4.4]].map(([x, z], j) => { const c = kid([1, 6, 0, 4][j], { pos: [x, z], face: [[0, yawTo([x, z], WH)]], up: [[0, 0.35]], mood: [[0, 'surprised'], [T.big + j * 0.1, 'joy']] }); v.scene.add(c.group); return c; });
  const n = wh.candles.length, span = Math.max(1.2, T.big - T.fixed - 0.3);
  const rise0 = T.small + 0.9;
  const rig = camRig(v.cam, [
    { t: 0, look: [-1.1, 2.8, -3.8], r: 6.0, a: 72, e: 36, fov: 56 },
    { t: T.fixed, look: [-0.8, 2.3, -3.9], r: 6.2, a: 58, e: 42, fov: 56 },
    { t: T.big, look: [0.3, 0.6, -3.0], r: 3.6, a: -20, e: 24, fov: 46 },
    { t: rise0 + 0.6, look: [0, 2.4, -4], r: 7.4, a: 0, e: -12, fov: 50, dur: 1.4 }], HALL);
  return { ...v, update(t) {
    rig(t);
    const y = 0.15 + 4.25 * io3(Math.min(1, Math.max(0, (t - rise0) / 1.6)));
    wh.group.position.set(0, y, -4);
    wh.ropes.visible = t > rise0 - 0.2;
    const pulse = (on) => 1 + 0.18 * Math.max(0, Math.sin((t - on) * 6)) * (t > on && t < on + 1.6 ? 1 : 0);
    wh.set(t, () => 0, (k) => sm((t - T.fixed - (k / n) * span) / 0.18) * (wh.candles[k].sun ? pulse(T.big) : pulse(T.small)));
    wich.update(t); kids.forEach((c) => c.update(t));
  } };
}

function sFirst() {
  const { v } = hallScene('night', 0.38, '#7a8ac8'), T = { looked: tt(4, 'looked', 2.4), one: tt(4, 'one', 3.65) };
  const moon = new THREE.DirectionalLight('#8aa0e0', 0.55); moon.position.set(-8, 6, 2); v.scene.add(moon);
  const wh = wheel3d(); wh.group.position.set(0, 4.4, -4); v.scene.add(wh.group);
  const warm = new THREE.PointLight('#ffb060', 2.6, 14, 1); v.scene.add(warm);
  const kids = circleKids(v.scene, [0, 1, 2, 3, 4, 5], [[0.8, -2.0], [-0.8, -2.1], [1.9, -3.0], [-1.9, -3.1], [0.1, -1.3], [2.2, -5.0]], WH,
    Object.fromEntries([0, 1, 2, 3, 4, 5].map((j) => [j, { up: [[0, 0.05], [T.looked - 0.3 + j * 0.08, 0.55]], mood: [[0, 'happy'], [T.looked + j * 0.08, 'awe'], [T.one + 0.3, 'tender']] }])));
  const wich = chibi({ ...WICH, pos: [-2.4, -5.2], face: [[0, yawTo([-2.4, -5.2], WH)]], up: [[0, 0.4]], mood: [[0, 'tender']] }); v.scene.add(wich.group);
  const rig = camRig(v.cam, [
    { t: 0, look: [0, 2.9, -3.2], r: 7.2, a: 0, e: -4, fov: 50 },
    { t: T.looked, look: [0, 2.3, -2.2], r: 4.0, a: 175, e: -2, fov: 50 },
    { t: T.one, look: [0, 4.9, -2.4], r: 2.6, a: 196, e: -6, fov: 44, dur: 1.2 }], HALL);
  return { ...v, update(t) { rig(t); wh.set(t, (k) => (k === 0 ? 1 : 0)); const p = wh.tip(0); warm.position.copy(p); warm.intensity = 2.6 * (1 + 0.08 * Math.sin(t * 11));
    kids.forEach((c) => c.update(t)); wich.update(t); } };
}

function sGrow() {
  const { v, hemi } = hallScene('night', 0.38, '#7a8ac8'), T = { each: tt(5, 'each', 0.1), dark: tt(5, 'dark', 2.6), bright: tt(5, 'bright', 3.6) };
  const moon = new THREE.DirectionalLight('#8aa0e0', 0.5); moon.position.set(-8, 6, 2); v.scene.add(moon);
  const wh = wheel3d(); wh.group.position.set(0, 4.4, -4); v.scene.add(wh.group);
  const warm = new THREE.PointLight('#ffb060', 2, 30, 1); warm.position.set(0, 4.0, -4); v.scene.add(warm);
  const kids = circleKids(v.scene, [0, 1, 2, 3, 4, 5, 6], [[0.9, -2.2], [2.1, -3.4], [-0.3, -1.6], [1.8, -5.3], [-1.9, -5.2], [0.2, -6.1], [-2.7, -3.9]], WH,
    Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((j) => [j, { mood: [[0, 'awe'], [T.bright + j * 0.1, 'joy']], arms: j % 3 === 0 ? [[0, [0.1, 0, 0.1, 0]], [T.bright + 0.3, [1.2, 0.6, 1.2, 0.6]]] : [[0, [0.1, 0, 0.1, 0]]] }])));
  const wich = chibi({ ...WICH, pos: [-1.9, -2.5], face: [[0, yawTo([-1.9, -2.5], WH)]], up: [[0, 0.45]], mood: [[0, 'tender'], [T.bright, 'joy']] }); v.scene.add(wich.group);
  const air = motes(v.scene, { n: 46, x: [-4, 4], y: [1, 6.2], z: [-8, 0] });
  const n = wh.candles.length, t0 = 0.2, t1 = T.bright + 0.8;
  const count = (t) => 1 + (n - 1) * io3(Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));
  const rig = camRig(v.cam, [
    { t: 0, look: [0, 4.2, -4], r: 5.6, a: -34, e: -28, fov: 54 },
    { t: T.dark, look: [0, 3.6, -4], r: 7.8, a: 50, e: -12, fov: 54, dur: 1.6 },
    { t: T.bright, look: [0, 3.0, -3.8], r: 7.0, a: 100, e: 12, fov: 52, dur: 1.3 }], HALL);
  return { ...v, update(t) {
    rig(t); const c = count(t); wh.set(t, (k) => sm((c - k) / 0.6)); const f = c / n;
    warm.intensity = (2 + 6 * f) * (1 + 0.04 * Math.sin(t * 9)); hemi.intensity = 0.38 + 0.6 * f; hemi.color.set('#7a8ac8').lerp(new THREE.Color('#ffd6a0'), f);
    kids.forEach((k) => k.update(t)); wich.update(t); air.update(t);
  } };
}

function sFir() {
  const { v } = hallScene('dusk', 1.0, '#ffd8b0'), T = { fir: tt(6, 'fir', 0.9), wheel: tt(6, 'wheel', 2.2) };
  const wh = wheel3d({ fir: true }); wh.group.position.set(0, 4.4, -4); v.scene.add(wh.group);
  const warm = new THREE.PointLight('#ffb060', 7, 26, 1); warm.position.set(0, 4.0, -4); v.scene.add(warm);
  const kids = circleKids(v.scene, [3, 1, 6, 4], [[1.0, -2.1], [-1.0, -2.2], [2.2, -4.6], [-2.1, -4.8]], WH, { 0: { mood: [[0, 'joy']] }, 1: { mood: [[0, 'joy']] } });
  const air = motes(v.scene, { n: 30, x: [-3, 3], y: [3, 6.2], z: [-7, -1] });
  const rig = camRig(v.cam, [
    { t: 0, look: [0.9, 4.5, -2.7], r: 2.6, a: 24, e: 6, fov: 46 },
    { t: T.wheel, look: [0, 3.8, -4], r: 6.5, a: 60, e: 18, fov: 52, dur: 1.4 }], HALL);
  return { ...v, update(t) { rig(t); wh.set(t, () => 1); warm.intensity = 7 * (1 + 0.05 * Math.sin(t * 9)); kids.forEach((k) => k.update(t)); air.update(t); } };
}

export function homeRoom(scene) {
  const X = 6, Z0 = -5, Z1 = 7, HC = 5.6, wall = toon('#6a7e6c'), wain = toon('#efe2c8'), wood = toon('#7a5434');
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(2 * X, Z1 - Z0), toon('#ffffff', { map: PLANKS })); floor.rotation.x = -Math.PI / 2; floor.position.z = (Z0 + Z1) / 2; scene.add(floor);
  scene.add(box(2 * X, HC, 0.3, wall, 0, HC / 2, Z0), box(2 * X, HC, 0.3, wall, 0, HC / 2, Z1), box(0.3, HC, Z1 - Z0, wall, -X, HC / 2, (Z0 + Z1) / 2), box(0.3, HC, Z1 - Z0, wall, X, HC / 2, (Z0 + Z1) / 2));
  scene.add(box(2 * X, 1.5, 0.32, wain, 0, 0.75, Z0 + 0.02), box(0.32, 1.5, Z1 - Z0, wain, -X + 0.02, 0.75, (Z0 + Z1) / 2), box(0.32, 1.5, Z1 - Z0, wain, X - 0.02, 0.75, (Z0 + Z1) / 2));
  scene.add(box(2 * X, 0.2, Z1 - Z0, toon('#e8dcc4'), 0, HC, (Z0 + Z1) / 2));
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.6), flat('#ffffff', { map: paneTex('night'), fog: false })); pane.position.set(2.0, 3.0, Z0 + 0.17); scene.add(pane);
  const fr = toon('#f4ecdc');
  scene.add(box(2.5, 0.16, 0.2, fr, 2.0, 4.3, Z0 + 0.2), box(2.6, 0.2, 0.4, fr, 2.0, 1.66, Z0 + 0.25), box(0.16, 2.8, 0.2, fr, 0.8, 3.0, Z0 + 0.2), box(0.16, 2.8, 0.2, fr, 3.2, 3.0, Z0 + 0.2), box(0.08, 2.6, 0.12, fr, 2.0, 3.0, Z0 + 0.22), box(2.2, 0.08, 0.12, fr, 2.0, 3.1, Z0 + 0.22));
  // a crucifix and a picture on the wall, a shelf, a lamp
  scene.add(box(0.12, 0.8, 0.06, wood, -2.4, 3.6, Z0 + 0.2), box(0.5, 0.12, 0.06, wood, -2.4, 3.8, Z0 + 0.2));
  const sh = new THREE.Group(); sh.position.set(-X + 0.5, 0, 0.5); scene.add(sh);
  sh.add(box(0.7, 3.6, 2.4, wood, 0, 1.8, 0)); const bc = ['#8a3a3a', '#3a5a8a', '#c8a050', '#4a7a4a', '#6a4a7a'];
  for (let s = 0; s < 3; s++) for (let i = 0; i < 7; i++) sh.add(box(0.5, 0.5 + ((i * 7 + s) % 3) * 0.1, 0.22, toon(bc[(i + s) % 5]), 0.12, 0.6 + s * 1.1 + 0.27, -0.9 + i * 0.28));
  // round table
  scene.add(put(new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.12, 40), wood), 0, 1.55, 0), put(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.3, 1.5, 14), wood), 0, 0.78, 0));
  scene.add(put(new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.02, 40), toon('#f4ecdc')), 0, 1.62, 0));
  const fl = new THREE.Group(); fl.position.set(-3.6, 0, -3.6); scene.add(fl);
  fl.add(put(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.6, 8), toon('#3a3030')), 0, 1.8, 0), put(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 0.6, 18, 1, true), toon('#f0d8a8', { side: THREE.DoubleSide })), 0, 3.7, 0));
  const lg = sprite(FLAME, 3.2, 0.5, true); lg.position.set(0, 3.5, 0); fl.add(lg);
  const lampL = new THREE.PointLight('#ffc080', 2.2, 14, 1); lampL.position.set(-3.6, 3.4, -3.2); scene.add(lampL);
  return { HC };
}
const MOM = { kind: 'woman', top: '#8a3a44', dress: '#3a3a5a', hair: '#5a3a26', style: 'bun', skin: '#eab792', stock: '#3a3a44' };
const GIRL = { kind: 'girl', top: '#e0b04a', dress: '#3e6a9a', hair: '#7a4a2a', style: 'braids', skin: '#f0c4a0', ribbon: '#c84a4a', stock: '#e8e0d0', s: 0.62 };
const BOY = { kind: 'boy', top: '#4a7a5a', legs: '#3a4a6a', hair: '#3a2618', skin: '#d9a27a', s: 0.62 };

function homeScene(sceneI) {
  const v = base('#120c10', '#1a1218', 16, 40); homeRoom(v.scene);
  const hemi = new THREE.HemisphereLight('#ffd6b0', '#2a1c18', 0.55); v.scene.add(hemi);
  const wr = wreath3d(); wr.group.position.set(0, 1.62, 0); v.scene.add(wr.group);
  const warm = new THREE.PointLight('#ffb060', 1, 16, 1); warm.position.set(0, 2.6, 0); v.scene.add(warm);
  const moon = new THREE.DirectionalLight('#8aa0e0', 0.35); moon.position.set(3, 6, -8); v.scene.add(moon);
  return { v, hemi, wr, warm };
}
function sHome() {
  const { v, hemi, wr, warm } = homeScene(7), T = { homes: tt(7, 'homes', 0.4), four: tt(7, 'four', 1.9), one: tt(7, 'one', 4.4), light: tt(7, 'light', 6.4) };
  const C = [0, 0];
  const mom = chibi({ ...MOM, pos: [-1.9, -1.0], face: [[0, yawTo([-1.9, -1.0], C)]], up: [[0, -0.2]], mood: [[0, 'tender'], [T.light, 'joy']] }); v.scene.add(mom.group);
  const girl = chibi({ ...GIRL, pos: [1.65, -0.9], face: [[0, yawTo([1.65, -0.9], C)]], up: [[0, -0.1]], mood: [[0, 'happy'], [T.one, 'awe'], [T.light, 'joy']] }); v.scene.add(girl.group);
  const boy = chibi({ ...BOY, pos: [0.5, -1.9], face: [[0, yawTo([0.5, -1.9], C)]], up: [[0, -0.05]], mood: [[0, 'happy'], [T.one + 0.5, 'joy']], arms: [[0, [0.1, 0, 0.1, 0]], [T.light, [1.3, 0.5, 1.3, 0.5]]] }); v.scene.add(boy.group);
  const lit = (k, t) => sm((t - (T.one - 0.1 + k * Math.max(0.35, (T.light - T.one) / 4))) / 0.25);
  const rig = camRig(v.cam, [
    { t: 0, look: [0, 1.9, -0.4], r: 6.4, a: 24, e: 24, fov: 50 },
    { t: T.four, look: [0, 1.75, 0], r: 3.3, a: 8, e: 58, fov: 46 },
    { t: T.one, look: [0.4, 2.1, -0.2], r: 3.4, a: -42, e: 6, fov: 46 },
    { t: T.light, look: [0, 2.2, -0.6], r: 6.4, a: 14, e: 12, fov: 50 }], HOME);
  return { ...v, update(t) { rig(t); let n = 0; wr.set(t, (k) => { const x = lit(k, t); n += x; return x; });
    warm.intensity = (0.6 + 1.6 * n) * (1 + 0.05 * Math.sin(t * 9)); hemi.intensity = 0.5 + 0.12 * n; mom.update(t); girl.update(t); boy.update(t); } };
}
function sLast() {
  const { v, hemi, wr, warm } = homeScene(8), T = { answer: tt(8, 'answer', 2.2), flame: tt(8, 'flame', 3.0), closer: tt(8, 'closer', 4.6), advent: tt(8, 'advent', 5.6) };
  const C = [0, 0];
  const girl = chibi({ ...GIRL, pos: [1.25, -0.55], face: [[0, yawTo([1.25, -0.55], C)]], up: [[0, -0.25]], mood: [[0, 'awe'], [T.closer, 'joy'], [T.advent, 'tender']],
    arms: [[0, [0.1, 0, 0.1, 0]], [T.flame, [0.1, 0, 0.25, 1.5]]] }); v.scene.add(girl.group);
  const mom = chibi({ ...MOM, pos: [-1.6, -1.4], face: [[0, yawTo([-1.6, -1.4], [1.25, -0.55])]], up: [[0, -0.1]], mood: [[0, 'tender']] }); v.scene.add(mom.group);
  const rig = camRig(v.cam, [
    { t: 0, look: [0.4, 2.15, -0.1], r: 3.2, a: -32, e: 4, fov: 46 },
    { t: T.flame, look: [0.6, 2.2, -0.3], r: 3.4, a: -20, e: 8, fov: 46 },
    { t: T.closer, look: [1.2, 2.35, -0.5], r: 3.0, a: -52, e: 7, fov: 44 },
    { t: T.advent, look: [0, 1.7, -0.1], r: 3.4, a: 0, e: 70, fov: 52, dur: 1.6, spin: 4 }], HOME);
  return { ...v, update(t) { rig(t); wr.set(t, (k) => (k === 0 ? 1 : 0)); warm.intensity = 2.2 * (1 + 0.05 * Math.sin(t * 9)); hemi.intensity = 0.62; girl.update(t); mom.update(t); } };
}

export const BUILD = { hook: sHook, farm: sFarm, ask: sAsk, build: sBuild, first: sFirst, grow: sGrow, fir: sFir, home: sHome, last: sLast };

if (!window.BG3D_LIB) {
  const views = [...document.querySelectorAll('canvas.bg3d')].map((cv) => {
    const sc = cv.closest('.scene'), renderer = newRenderer(cv);
    const Z = +sc.dataset.zero, C = +sc.dataset.start, D = +sc.dataset.duration, v = BUILD[cv.dataset.bg3d]();
    return { renderer, v, Z, active: (T) => T >= C - 0.05 && T <= C + D + 0.05 };
  });
  const renderAt = (T) => { for (const w of views) { if (!w.active(T)) continue; w.v.update(Math.max(0, T - w.Z)); w.renderer.render(w.v.scene, w.v.cam); } };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
