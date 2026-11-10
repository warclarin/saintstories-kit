// St. Josephine Bakhita (feast: February 8): the freedom story, Venice 1888–1890. One-story reel, narration first
// (STORY.flow) with three.js backgrounds (bakhita_freedom.bg3d.js: Venice canal, Darfur savanna, chapel, palace hall).
// Exported for later reels: bakhita, littleBakhita, bakhitaNun, sister, mimmina, michieli, patriarch, attorney,
// consul, trader, brokenChain, groundChain, decree, lampPost, mudHouses, consulHouse, font, kerchief.
import { W, M, SKIN, GOLD, sky, sun, rays, beam, clouds, waves, sparkles, motes, tufts, bokeh, person, coconut,
  ground, dark, light, f, rng, FAR, BACK, MID, NEAR } from '../art.mjs';
import { biretta, mozzetta, pectoral } from './charles_borromeo.mjs';

const SKB = '#5e3a26', HAIRB = '#140d0a', HABIT = '#1e1a22', RED = '#b3202e';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
// two copies of a character cross-fading at `at` (a change of mood or pose on the line it illustrates)
const swap = (a, b, at, dur = 0.5) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;

// ---------------------------------------------------------------- characters
export const kerchief = (c = '#f2ead8') => `<path d="M-45 -252 Q-49 -306 0 -308 Q49 -306 45 -252 Q38 -284 0 -286 Q-38 -284 -45 -252Z" fill="${c}"/>`
  + `<path d="M16 -303 Q42 -297 45 -252 Q39 -278 22 -285Z" fill="${dark(c, 0.22)}" opacity=".6"/><path d="M40 -268 q18 2 22 22 q-12 -8 -22 -10Z" fill="${dark(c, 0.1)}"/>`;
const earrings = `<circle cx="-40" cy="-235" r="4.5" fill="${GOLD}"/><circle cx="40" cy="-235" r="4.5" fill="${GOLD}"/>`;
const beads = `<path d="M-24 -207 Q0 -188 24 -207" stroke="${GOLD}" stroke-width="5" fill="none" stroke-dasharray="4 5" stroke-linecap="round"/>`;
const chestCross = `<path d="M-14 -206 Q0 -186 14 -206" stroke="#111" stroke-width="2" fill="none"/><path d="M0 -188 v26 M-8 -180 h16" stroke="#d8d8e0" stroke-width="4.5" stroke-linecap="round"/>`;
// Bakhita as a young woman in Venice (1888–1889): simple blue dress, cream kerchief, small gold earrings
export const bakhita = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#3e5a8a', skin: SKB, hair: HAIRB, ...o,
  over: kerchief(o.scarf || '#f2ead8') + earrings + (o.over || '') });
// Bakhita as a child in Darfur (c. 1877)
export const littleBakhita = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', robe: true, top: '#e07a3a', skin: SKB, hair: HAIRB, ...o, over: beads + earrings + (o.over || '') });
// Bakhita as a Canossian sister: black habit and veil, white wimple, a small cross
export const bakhitaNun = (x, y, s, o = {}) => person(x, y, s, { kind: 'nun', top: HABIT, veil: HABIT, skin: SKB, ...o, over: chestCross + (o.over || '') });
export const sister = (x, y, s, o = {}) => person(x, y, s, { kind: 'nun', top: HABIT, veil: HABIT, skin: '#f0d0b4', ...o });
export const mimmina = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', girl: true, robe: true, top: '#e8a0b0', skin: SKIN.fair, hair: '#c98a3a', mood: 'joy', ...o });
const ladyHat = '<ellipse cx="0" cy="-292" rx="58" ry="10" fill="#2a1a2a"/><path d="M-30 -292 Q-28 -328 0 -330 Q28 -328 30 -292Z" fill="#3a2234"/>'
  + '<path d="M-30 -300 Q0 -296 30 -300 L30 -292 Q0 -288 -30 -292Z" fill="#8a3a5a"/><path d="M18 -318 q34 -34 56 -10 q-28 -4 -48 20Z" fill="#c8a0c0"/>';
export const michieli = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, girl: true, top: '#5a2a4a', skin: '#f0d0b4', hair: '#4a2a1a', ...o, over: ladyHat + (o.over || '') });
export const patriarch = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', top: RED, collar: false, skin: '#ecc8a8', hair: '#d9d4cc', beard: null, ...o, over: biretta + mozzetta + pectoral + (o.over || '') });
const tie = '<path d="M-13 -209 L0 -190 L13 -209Z" fill="#fbf8f0"/><path d="M-9 -204 l9 5 l9 -5 v9 l-9 -4 l-9 4Z" fill="#141414"/>';
const mustache = (c) => `<path d="M-17 -234 Q-8 -241 0 -236 Q8 -241 17 -234 Q8 -230 0 -233 Q-8 -230 -17 -234Z" fill="${c}"/>`;
export const attorney = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#2a2a36', pants: '#22222c', skin: '#f0cfae', hair: '#8a8680', beard: null, ...o, over: tie + mustache('#7a7670') + (o.over || '') });
const pith = '<path d="M-46 -274 Q-44 -324 0 -326 Q44 -324 46 -274Z" fill="#ece0c4"/><path d="M14 -322 Q40 -312 46 -274 L30 -274 Q30 -306 14 -322Z" fill="#cdbf9e" opacity=".7"/><ellipse cx="0" cy="-274" rx="60" ry="9" fill="#d8caa8"/>';
export const consul = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#efe8d8', pants: '#e0d8c4', skin: '#f0cfae', hair: '#6a4a2a', beard: '#6a4a2a', ...o, over: pith + (o.over || '') });
const turban = '<path d="M-44 -262 Q-52 -320 0 -324 Q52 -320 44 -262 Q30 -282 0 -284 Q-30 -282 -44 -262Z" fill="#f2ece0"/><path d="M-40 -282 Q0 -300 42 -276 M-44 -300 Q0 -316 40 -298" stroke="#d6cdb8" stroke-width="4" fill="none"/>';
export const trader = (x, y, s, o = {}) => person(x, y, s, { kind: 'elder', top: '#e8e0d0', skin: '#9a6a44', hair: '#1a120c', beard: '#2a1a10', ...o, over: turban + (o.over || '') });

// ---------------------------------------------------------------- props
// a short chain hanging from the hand, its last link broken open (her traditional emblem)
export function brokenChain(n = 4, s = 1, c = '#a4a2b0') {
  let g = '';
  for (let k = 0; k < n; k++) {
    const yy = 8 + k * 19;
    g += k % 2 ? `<rect x="-3.2" y="${yy - 11}" width="6.4" height="22" rx="3" fill="${c}"/><rect x="-1" y="${yy - 9}" width="2" height="18" fill="${light(c, 0.4)}"/>`
      : `<ellipse cx="0" cy="${yy}" rx="8" ry="12" fill="none" stroke="${c}" stroke-width="4.6"/><path d="M-6 ${yy - 7} q-2 6 0 12" stroke="${light(c, 0.45)}" stroke-width="1.6" fill="none"/>`;
  }
  const yb = 8 + n * 19;
  g += `<path d="M-7 ${yb - 5} A8 12 0 0 0 5 ${yb + 11}" fill="none" stroke="${c}" stroke-width="4.6" stroke-linecap="round"/>`;
  return `<g transform="scale(${s})">${g}</g>`;
}
// two broken pieces of chain lying on the ground
export const groundChain = (x, y, s = 1, glowOp = 0.5) => `<g transform="translate(${x},${y}) scale(${s})">${glowOp ? `<ellipse cx="0" cy="-4" rx="110" ry="26" fill="url(#haloGlow)" opacity="${glowOp}"/>` : ''}`
  + `<g transform="translate(-70,-6) rotate(-80)">${brokenChain(4, 0.9)}</g><g transform="translate(70,-10) rotate(95) scale(-1,1)">${brokenChain(3, 0.9)}</g></g>`;
export const decree = '<g transform="translate(0,-14)"><rect x="-28" y="-44" width="56" height="70" rx="3" fill="#fbf6ea"/><rect x="8" y="-44" width="20" height="70" fill="#e8dcc4" opacity=".7"/>'
  + '<path d="M-18 -30 h36 M-18 -20 h36 M-18 -10 h28 M-18 0 h32" stroke="#b0a080" stroke-width="2.5"/><circle cx="12" cy="14" r="8" fill="#c8323a"/><circle cx="12" cy="14" r="4" fill="#e85a5a"/></g>';
const shell = `<g transform="rotate(30)"><path d="M-16 0 Q0 -22 16 0 Q0 8 -16 0Z" fill="#f4e8d4"/><path d="M-8 -2 L0 -16 M0 0 L0 -18 M8 -2 L0 -16" stroke="#d0c0a0" stroke-width="2"/></g>`;
const smallCrucifix = `<g transform="translate(0,-18)"><circle r="40" fill="url(#haloGlow)"/><path d="M0 -34 v62 M-16 -16 h32" stroke="#6e4a2c" stroke-width="8" stroke-linecap="round"/><path d="M0 -24 v26 M-8 -14 h16" stroke="#f0d8b8" stroke-width="3.5" stroke-linecap="round"/></g>`;

// ---------------------------------------------------------------- set pieces
export const lampPost = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-7" y="-420" width="14" height="420" fill="#231a26"/><rect x="-16" y="-18" width="32" height="18" fill="#2e2432"/>`
  + `<path d="M-22 -470 L22 -470 L16 -420 L-16 -420Z" fill="#2e2432"/><circle cx="0" cy="-446" r="70" fill="url(#sunGlow)" opacity=".75"${M.flick(2.6, 0.3, 0.75)}/>`
  + `<path d="M-14 -466 L14 -466 L11 -426 L-11 -426Z" fill="#ffe2a0"/><path d="M-26 -476 L26 -476 L0 -500Z" fill="#231a26"/></g>`;
// a quay of Istrian stone at the bottom of a Venice scene, edged where it meets the canal
const quay = (y, c, edge) => `<rect x="-200" y="${y}" width="${W + 400}" height="${1920 - y + 200}" fill="${c}"/><rect x="-200" y="${y}" width="${W + 400}" height="10" fill="${edge}"/>`
  + Array.from({ length: 6 }, (_, k) => `<path d="M-200 ${y + 60 + k * 70 + k * k * 8} H${W + 200}" stroke="${dark(c, 0.15)}" stroke-width="3" opacity=".6"/>`).join('')
  + Array.from({ length: 14 }, (_, k) => `<path d="M${-100 + k * 95 + (k % 2) * 40} ${y + 12} v52" stroke="${dark(c, 0.15)}" stroke-width="3" opacity=".5"/>`).join('');
// a stone floor seen from standing height (the near part of the 3D interiors)
const floor = (y, a, b) => `<rect x="-200" y="${y}" width="${W + 400}" height="${1920 - y + 200}" fill="${a}"/>`
  + Array.from({ length: 5 }, (_, k) => `<path d="M-200 ${y + 40 + k * 80 + k * k * 12} H${W + 200}" stroke="${b}" stroke-width="4" opacity=".45"/>`).join('')
  + Array.from({ length: 13 }, (_, k) => { const x0 = 540 + (k - 6) * 120; return `<path d="M${x0} ${y} L${f(540 + (x0 - 540) * 3.2)} 1920" stroke="${b}" stroke-width="4" opacity=".35"/>`; }).join('');
export function mudHouses(y, { c = '#c8925a' } = {}) {
  const r = rng(17);
  let s = '';
  for (let x = -80; x < W + 80; x += 130 + r() * 50) {
    const w = 120 + r() * 60, h = 110 + r() * 90, cc = r() < 0.5 ? c : light(c, 0.1);
    s += `<rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}" fill="${cc}"/><rect x="${f(x + w * 0.62)}" y="${f(y - h)}" width="${f(w * 0.38)}" height="${f(h)}" fill="${dark(cc, 0.18)}" opacity=".6"/>`
      + `<rect x="${f(x - 4)}" y="${f(y - h - 10)}" width="${f(w + 8)}" height="12" fill="${dark(cc, 0.2)}"/><path d="M${f(x + w * 0.3)} ${y} v-46 a14 14 0 0 1 28 0 v46Z" fill="${dark(cc, 0.55)}"/>`
      + `<rect x="${f(x + w * 0.66)}" y="${f(y - h + 28)}" width="18" height="22" fill="${dark(cc, 0.5)}"/>`;
  }
  return s;
}
export function consulHouse(x, y, s = 1, { wall = '#f4eee2' } = {}) {
  const wins = [0, 1].map((r) => [-1, 0, 1].map((k) => `<path d="M${k * 80 - 18} ${-60 - r * 120} v-56 a18 18 0 0 1 36 0 v56Z" fill="${r ? '#5a6a8a' : '#4a3a3a'}"/>`).join('')).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-260" width="300" height="260" fill="${wall}"/><rect x="60" y="-260" width="90" height="260" fill="${dark(wall, 0.15)}" opacity=".6"/>`
    + `<rect x="-160" y="-276" width="320" height="18" fill="${dark(wall, 0.2)}"/><rect x="-150" y="-134" width="300" height="10" fill="${dark(wall, 0.2)}"/>${wins}`
    + `<path d="M-130 -134 h260" stroke="#6a5a4a" stroke-width="4"/>${Array.from({ length: 14 }, (_, k) => `<path d="M${-126 + k * 19} -134 v-22" stroke="#6a5a4a" stroke-width="3"/>`).join('')}<path d="M-130 -156 h260" stroke="#6a5a4a" stroke-width="4"/>`
    + `<rect x="96" y="-372" width="5" height="100" fill="#6a6a6a"/><g transform="translate(101,-370)"><g${M.sway(4, 1.6, 0, 0, 0)}><rect width="20" height="40" fill="#2f8a4a"/><rect x="20" width="20" height="40" fill="#f6f2e8"/><rect x="40" width="20" height="40" fill="#c8323a"/></g></g></g>`;
}
function nile(y) {
  const r = rng(5);
  const palms = Array.from({ length: 9 }, (_, k) => { const x = 40 + k * 125 + r() * 40; return `<g transform="translate(${f(x)},${y - 4}) scale(${f(0.28 + r() * 0.1)})"><path d="M0 0 Q-6 -120 8 -240" stroke="#5a6a4a" stroke-width="16" fill="none"/>${[-150, -110, -60, -20, 20].map((a) => `<path d="M8 -240 q${f(60 * Math.cos(a * Math.PI / 180))} -30 ${f(110 * Math.cos(a * Math.PI / 180))} ${f(40 + 60 * Math.sin(a * Math.PI / 180))}" stroke="#5a7a4a" stroke-width="14" fill="none" stroke-linecap="round"/>`).join('')}</g>`; }).join('');
  return `<rect x="-200" y="${y - 8}" width="${W + 400}" height="14" fill="#c8a870"/>${palms}<rect x="-200" y="${y + 4}" width="${W + 400}" height="70" fill="#5a9cc4"/>`
    + waves(y + 8, 3, 200, 7, '#6aaad0', { foam: '#d9f0f7' }) + waves(y + 34, 4, 240, 6, '#4a8cb4', { foam: '#c9e4f2', phase: 1 });
}
// stone baptismal font
export const font = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-34" y="-150" width="68" height="150" fill="#cfc4b4"/><rect x="10" y="-150" width="24" height="150" fill="#a89c8c" opacity=".7"/>`
  + `<rect x="-60" y="-20" width="120" height="20" rx="4" fill="#b8ac9c"/><path d="M-92 -210 Q-80 -146 0 -142 Q80 -146 92 -210Z" fill="#ddd2c2"/><path d="M30 -144 Q80 -150 92 -210 L60 -210 Q56 -160 30 -144Z" fill="#b4a898" opacity=".7"/>`
  + `<ellipse cx="0" cy="-210" rx="92" ry="16" fill="#efe6d8"/><ellipse cx="0" cy="-208" rx="78" ry="11" fill="#7ab4d8"/><ellipse cx="-20" cy="-210" rx="30" ry="3" fill="#d9f0f7" opacity=".8"${M.flick(1.8, 0.2, 0.3)}/></g>`;
function arcade(y, c) {
  return Array.from({ length: 7 }, (_, k) => { const x = -60 + k * 200; return `<path d="M${x - 70} ${y} V${y - 360} A70 70 0 0 1 ${x + 70} ${y - 360} V${y}Z" fill="${dark(c, 0.35)}"/>`
    + `<rect x="${x + 70}" y="${y - 520}" width="130" height="520" fill="${c}"/><rect x="${x + 160}" y="${y - 520}" width="40" height="520" fill="${dark(c, 0.15)}" opacity=".6"/>`; }).join('')
    + `<rect x="-200" y="${y - 560}" width="${W + 400}" height="44" fill="${dark(c, 0.12)}"/>`;
}

// ---------------------------------------------------------------- scenes (in the 3D scenes the sky and set are the canvas behind)
// 0 · hook: Venice at dusk, a broken chain in her hand
function scene0() {
  return quay(1290, '#4a3448', '#a0707a')
    + MID(lampPost(940, 1290, 1.0))
    + bakhita(540, 1290, 2.35, { mood: 'determined', halo: 0.8, armL: [16, 2, 3], armR: [30, 2, 3.4], propL: brokenChain(4, 1.1) })
    + motes(14, { y0: 600, y1: 1250, seed: 3 })
    + NEAR(bokeh(7, { seed: 5 }));
}

// 1 · c. 1877, Darfur: seized as a little girl, her own name forgotten
function scene1() {
  const a = littleBakhita(680, 1300, 1.45, { mood: 'sad', armL: 12, armR: [74, 3, 2.4] });
  const b = littleBakhita(680, 1300, 1.45, { mood: 'worried', armL: 12, armR: [28, 2, 2.6] });
  return ground(1290, '#b07a44', { rim: '#e0a868' }) + tufts(1296, 14, '#8a6a3a', { seed: 4 })
    + trader(370, 1300, 1.9, { mood: 'stern', armL: [72, 2, 3], armR: [38, 2, 3.2] })
    + swap(a, b, 7.4)
    + `<g${fadeIn(9.6, 1.2)}>${sparkles(10, 560, 800, 860, 1120, { seed: 4 })}</g>`
    + motes(10, { color: '#ffd0a0', y0: 700, y1: 1250, seed: 6 })
    + NEAR(tufts(1640, 9, '#5a4022', { seed: 9, s: 2.4 }));
}

// 2 · 1883, Khartoum: bought by the Italian consul; for the first time, no one beat her
function scene2() {
  const a = bakhita(400, 1300, 1.8, { mood: 'sad', scarf: '#d8c8a8', top: '#8a6a4a', armL: 10, armR: 10 });
  const b = bakhita(400, 1300, 1.8, { mood: 'surprised', scarf: '#d8c8a8', top: '#8a6a4a', armL: 10, armR: [40, 2, 3] });
  return FAR(sky([[0, '#e2804e'], [0.34, '#f6c48a'], [0.6, '#f8e0b0'], [1, '#f8e0b0']]) + sun(860, 560, 56, 300))
    + BACK(clouds(470, { color: '#fff1dc', op: 0.6, seed: 9 }) + nile(1120))
    + MID(mudHouses(1250) + consulHouse(770, 1250, 1.05) + coconut(90, 1260, 0.85) + coconut(1010, 1260, 0.8, { flip: true }))
    + ground(1250, '#d8b07a', { rim: '#f2d29a' }) + tufts(1256, 10, '#b08a5a', { seed: 2 })
    + swap(a, b, 7.7)
    + consul(760, 1310, 1.85, { mood: 'happy', armL: [46, 3, 2.8], armR: 12 })
    + motes(8, { y0: 700, y1: 1200, seed: 2 })
    + NEAR(tufts(1660, 8, '#8a6a3a', { seed: 5, s: 2.2 }));
}

// 3 · 1888, Venice: nanny to Mimmina, left with the Canossian Sisters, where she learned about Jesus
function scene3() {
  const a = bakhita(560, 1300, 2.1, { mood: 'happy', armL: 12, armR: [34, 2, 3] });
  const b = bakhita(560, 1300, 2.1, { mood: 'joy', armL: 12, armR: [34, 2, 3] });
  const cross = `<g${M.in('pop', 10.6, 0.8)}>${smallCrucifix}</g>`;
  return quay(1290, '#cdb89c', '#efe2c8')
    + `<g${M.tw([{ at: 6.6, dur: 1.1, from: { opacity: 0, x: -120 }, to: { opacity: 1, x: 0 }, ease: 'power2.out' }])}>${sister(210, 1300, 1.85, { mood: 'joy', armL: [26, 2, 3], armR: [118, 6, 2.2], propR: cross })}</g>`
    + swap(a, b, 10.8)
    + mimmina(810, 1310, 1.2, { armL: [48, 3, 2.6], armR: 14 })
    + motes(10, { y0: 600, y1: 1200, seed: 8 })
    + NEAR(bokeh(6, { seed: 12, op: [0.25, 0.5] }));
}

// 4 · 1889: Mrs. Michieli comes back for her; for the first time in her life, Bakhita refuses (dolly)
function scene4() {
  const a = bakhita(630, 1300, 2.2, { mood: 'worried', armL: 10, armR: 14 });
  const b = bakhita(630, 1300, 2.2, { mood: 'determined', armL: 10, armR: [40, 2, 3] });
  return floor(1290, '#b08e80', '#7a5a52')
    + `<g${M.tw([{ at: 0.4, dur: 1.2, from: { opacity: 0, x: -110 }, to: { opacity: 1, x: 0 }, ease: 'power2.out' }])}>${michieli(240, 1310, 1.95, { mood: 'stern', armL: [80, 3, 2.4], armR: 14 })}</g>`
    + swap(a, b, 6.3)
    + sister(915, 1300, 1.6, { mood: 'worried', flip: true, armL: [30, 2, 3], armR: [30, 2, 3.2] })
    + motes(8, { y0: 700, y1: 1200, seed: 4, color: '#ffe2b0' });
}

// 5 · November 29, 1889: the Patriarch, the King's attorney, and the word "free"
function scene5() {
  const a = bakhita(545, 1300, 2.15, { mood: 'surprised', armL: [26, 2, 3], armR: 14, propL: brokenChain(4, 1.0) });
  const b = bakhita(545, 1300, 2.15, { mood: 'joy', armL: [128, 6, 1.6], armR: [128, 6, 1.8] });
  return floor(1290, '#c8c0b4', '#8a8478')
    + `<g${M.tw([{ at: 7.9, dur: 0.5, from: { opacity: 0 }, to: { opacity: 1 } }, { at: 8.4, dur: 2.5, from: { opacity: 1 }, to: { opacity: 0.35 } }])}>${glow(545, 930, 520, 0.9)}</g>`
    + patriarch(220, 1310, 1.9, { mood: 'happy', talk: [0.2, 4.6], armL: 12, armR: [44, 3, 2.6] })
    + attorney(870, 1310, 1.85, { mood: 'happy', armL: [60, 3, 2.8], armR: 12, propL: decree })
    + swap(a, b, 7.9, 0.35)
    + `<g${M.in('drop', 8.0, 0.7)}>${groundChain(545, 1312, 0.95, 0.45)}</g>`
    + `<g${fadeIn(7.9, 0.6)}>${sparkles(16, 300, 800, 620, 1120, { seed: 7 })}</g>`;
}

// 6 · January 9, 1890: baptized Josephine; in 1896, a Canossian sister herself (tilt-up + rack focus)
function scene6() {
  const drops = [0, 1, 2].map((k) => `<circle cx="${f(572 + k * 9)}" cy="${f(930 + k * 6)}" r="5" fill="#9fd4f2"${M.tw([{ at: 3.0 + k * 0.25, dur: 0.9, from: { opacity: 0, y: -20 }, to: { opacity: 0, y: 50 }, ease: 'none' }, { at: 3.0 + k * 0.25, dur: 0.2, from: { opacity: 0 }, to: { opacity: 1 } }])}/>`).join('');
  const kneeling = bakhita(600, 1310, 2.05, { kneel: true, mood: 'peaceful', top: '#f6f0e2', scarf: '#fbf8f0', armL: [36, 1, 3], armR: [36, 1, 3.2] });
  return FAR(sky([[0, '#2e1c2a'], [0.45, '#6a3e44'], [1, '#b07a5e']]) + rays(540, 470, { op: 0.1 }) + glow(540, 470, 380, 0.8))
    + BACK(arcade(1290, '#c9a88e') + `<circle cx="540" cy="470" r="90" fill="#8a4a3a"/><circle cx="540" cy="470" r="80" fill="#ffd38a"/>${Array.from({ length: 8 }, (_, k) => `<circle cx="${f(540 + 50 * Math.cos(k * Math.PI / 4))}" cy="${f(470 + 50 * Math.sin(k * Math.PI / 4))}" r="22" fill="${k % 2 ? '#e88a6a' : '#f2c46b'}" stroke="#8a4a3a" stroke-width="5"/>`).join('')}<circle cx="540" cy="470" r="24" fill="#c8506a" stroke="#8a4a3a" stroke-width="5"/>`)
    + MID(beam(470, 610, 360, 820, 1300, 0.45) + font(420, 1300, 1.1))
    + floor(1290, '#a88a78', '#6e5446')
    + patriarch(250, 1310, 1.85, { mood: 'happy', armL: 12, armR: [72, 2, 3], propR: shell })
    + `<g${fadeOut(6.6, 0.8)}>${kneeling}${drops}</g>`
    + `<g${fadeIn(6.6, 0.8)}>${bakhitaNun(640, 1310, 2.15, { mood: 'joy', halo: 7.0, armL: [30, 2, 3], armR: [30, 2, 3.3] })}</g>`
    + motes(14, { x0: 380, x1: 760, y0: 500, y1: 1250, color: '#fff2c4', seed: 9, rise: 120 })
    + NEAR(bokeh(7, { seed: 14 }));
}

// 7 · feast day, February 8: under the stars of her homeland, chains broken (arc)
function scene7() {
  const kids = [[150, '#e2b448', true], [300, '#4b8bc4', false], [790, '#d8644e', true], [935, '#6aa457', false]]
    .map(([x, top, girl], i) => person(x, 1345, 1.12, { kind: 'kid', top, girl, skin: ['#5e3a26', '#6e4428', '#4e3020', '#7a4a2e'][i], hair: HAIRB, pants: '#3a3a4a', mood: 'joy', flip: i > 1, armL: 12, armR: i % 2 ? [118, 14, 1.3] : 14 })).join('');
  return ground(1290, '#3a3048', { rim: '#8a6a9a' }) + tufts(1296, 12, '#2a2236', { seed: 7 })
    + groundChain(540, 1300, 1.0, 0.55)
    + bakhitaNun(540, 1285, 2.3, { mood: 'joy', halo: true, armL: [48, 4, 3], armR: [48, 4, 3.4] })
    + kids
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(7, { seed: 9 }));
}

export const STORY = {
  slug: 'st_josephine_bakhita_freedom', name: 'St_Josephine_Bakhita_Freedom',
  voice: 'am_michael', speed: 0.95, flow: true,
  bg3d: './bakhita_freedom.bg3d.js',
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'Sold as a slave, she said no', thumb_title: 'St. Josephine Bakhita', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'bækhˈiːɾɚ': 'bɑːkˈiːtə', 'bækhˈiːɾə': 'bɑːkˈiːtə',   // Bakhita -> bah-KEE-tah
    'dʒˈoʊsfiːn': 'dʒˈoʊzəfiːn',                       // Josephine
    'mˈɪmɪnə': 'mɪmˈiːnə',                             // Mimmina -> mim-MEE-nah
    'kˈænɑːʃən': 'kənˈɑːsiən',                         // Canossian -> ka-NOSS-ee-an
    'mˈɪsɪz. mˈɪtʃiːli': 'mˈɪsɪz mɪkiˈɛli',            // Mrs. Michieli -> mee-kee-EH-lee (no stop after Mrs.)
    'dˈɑːɹfɜː': 'dɑːɹfˈʊɹ',                            // Darfur -> dar-FOOR
    'twˈɛnti nˈaɪn,': 'twˈɛnti nˈaɪnθ,',               // November 29 -> twenty-ninth
    'dʒˈænjuːˌɛɹi nˈaɪn,': 'dʒˈænjuːˌɛɹi nˈaɪnθ,',     // January 9 -> ninth
    'fˈɛbɹuːˌɛɹi ˈeɪt,': 'fˈɛbɹuːˌɛɹi ˈeɪtθ,',         // February 8 -> eighth
  },
  scenes: [
    { kicker: 'A SLAVE WHO SAID NO', title: 'St. Josephine Bakhita', art: scene0, bg3d: 'veniceDusk', cam: { move: 'push-fast', amt: 0.06, oy: 760 },
      say: ['She was kidnapped as a child and sold as a slave.', 'Then one day in Venice, she refused to go back.', 'This is Saint Josephine Bakhita.'] },
    { kicker: 'c. 1877 · DARFUR, SUDAN', title: 'A Stolen Name', art: scene1, bg3d: 'darfur', cam: 'pan-r',
      say: ['Around 1877, slave traders seized a little girl of about eight in Darfur, Sudan.', 'In her terror, she forgot her own name, so they called her Bakhita, which means fortunate.'] },
    { kicker: '1883 · KHARTOUM', title: 'Sold Again and Again', art: scene2, cam: { move: 'drift-r', amt: 0.07 },
      say: ['She was sold again and again, until in 1883, an Italian consul in Khartoum bought her.', 'In his house, for the first time, no one beat her.'] },
    { kicker: '1888 · VENICE', title: 'The Sisters of Venice', art: scene3, bg3d: 'veniceDay', cam: 'pan-l',
      say: ['In Italy, she became the nanny of a little girl named Mimmina.', 'In November 1888, the family left them with the Canossian Sisters in Venice, where Bakhita learned about Jesus.'] },
    { kicker: '1889 · VENICE', title: 'She Said No', art: scene4, bg3d: 'chapel', cam: { move: 'dolly', amt: 0.07, oy: 900 },
      say: ['A year later, Mrs. Michieli came back to take her to Africa.', 'And for the first time in her life, Bakhita refused.'] },
    { kicker: 'NOVEMBER 29, 1889', title: 'Declared Free', art: scene5, bg3d: 'palace', cam: { move: 'push', amt: 0.07, oy: 900 },
      say: ['The sisters turned to the Patriarch of Venice, who asked the King\'s attorney.', 'On November 29, 1889, she was declared free, because Italian law did not recognize slavery.'] },
    { kicker: 'JANUARY 9, 1890 · VENICE', title: 'Daughter of God', art: scene6, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ['Free to choose, she stayed.', 'On January 9, 1890, she was baptized Josephine, and in 1896, she became a Canossian sister herself.'] },
    { kicker: 'FEAST DAY · FEBRUARY 8', title: 'Fortunate Indeed', art: scene7, bg3d: 'starNight', cam: 'arc-r',
      say: ['Her feast, February 8, is now a world day of prayer against human trafficking.', 'Saint Josephine Bakhita, pray for us.'] },
  ],
};
