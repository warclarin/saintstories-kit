// St. Peter the Apostle (feast: June 29, with St. Paul). Sea of Galilee, fishing boat, keys, rooster, Jerusalem,
// Nero's Rome (Vatican Hill obelisk) and the inverted Petrine cross shown as an emblem at rest.
// Exports for later reels: peter, jesus, mantle, keys, net, fish, fishingBoat, campfire, rooster, sheep, jerusalem,
// romeSkyline, obelisk, petrineCross, rockOut, candle, followers.
import { W, M, SKIES, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  person, book, palm_frond, basilica, ground, dark, light, rng, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { flyer } from './francis.mjs';
import { cypress } from './nicholas.mjs';

const SKP = '#d9a47e', HAIRP = '#3a2a1e', MIDP = '#6a5a4e', GREYP = '#c9c2b6';
const BLUE = '#3f6a9e', YEL = '#e2a63c', RED = '#b8323e';
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ------------------------------------------------------------- characters
// Draped mantle (himation): back panel under the body, front fold from the left shoulder to the right hip.
export const mantleBack = (c) => `<path d="M-42 -212 Q-62 -110 -58 -6 L58 -6 Q62 -110 42 -212Z" fill="${dark(c, 0.12)}"/>`;
export const mantleFront = (c) => `<path d="M-40 -210 Q-24 -150 22 -112 Q46 -70 50 -8 L22 -6 Q16 -66 0 -100 Q-34 -140 -44 -196Z" fill="${c}"/>`
  + `<path d="M22 -112 Q46 -70 50 -8 L36 -7 Q32 -64 16 -104Z" fill="${dark(c, 0.3)}" opacity=".55"/>`
  + `<path d="M-36 -198 Q-24 -150 14 -114" stroke="${light(c, 0.3)}" stroke-width="3" fill="none" opacity=".6"/>`;
// Peter: blue tunic + yellow mantle (traditional colors). age: 'young' (dark hair) | 'mid' | 'old' (grey). mantle:false while fishing.
export const peter = (x, y, s, o = {}) => {
  const hair = o.age === 'old' ? GREYP : o.age === 'mid' ? MIDP : HAIRP, m = o.mantle !== false;
  return person(x, y, s, { kind: 'layman', robe: true, top: BLUE, skin: SKP, hair, beard: hair, ...o,
    under: (m ? mantleBack(YEL) : '') + (o.under || ''), over: (m ? mantleFront(YEL) : '') + (o.over || '') });
};
// Jesus: white robe, red mantle, long hair, beard, halo
export const jesus = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#f4efe4', skin: SKP, hair: '#5a3a24',
  beard: '#5a3a24', girl: true, halo: true, ...o, under: mantleBack(RED) + (o.under || ''), over: mantleFront(RED) + (o.over || '') });
const andrew = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#7a6a4a', skin: '#d39e78', hair: '#4a3424', beard: '#4a3424', ...o });
const disciple = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: ['#8a5a4a', '#5a7a6a', '#7a6a9a', '#9a7a4a'][i % 4],
  skin: ['#d9a47e', '#c48a5f', '#e0b08a', '#b97c52'][i % 4], hair: ['#2a1e16', '#4a3424', '#1a120c', '#5a3e2a'][i % 4], beard: i % 2 ? null : '#3a2a1e', ...o });

// ------------------------------------------------------------- props
const key1 = (c) => `<g><circle cx="0" cy="-58" r="14" fill="none" stroke="${c}" stroke-width="7"/><circle cx="0" cy="-58" r="14" fill="none" stroke="#fff" stroke-width="1.5" opacity=".4"/>`
  + `<rect x="-4" y="-46" width="8" height="70" rx="3" fill="${c}"/><rect x="1" y="-46" width="3" height="70" fill="${dark(c, 0.3)}" opacity=".5"/>`
  + `<path d="M4 12 h15 v6 h-6 v7 h-9Z M4 0 h11 v6 h-11Z" fill="${c}"/></g>`;
// Crossed keys of the kingdom: gold and silver
export const keys = (s = 1) => `<g transform="scale(${s})"><circle cy="-20" r="62" fill="url(#haloGlow)" opacity=".55"/>`
  + `<g transform="rotate(-24)">${key1(GOLD)}</g><g transform="rotate(24) scale(-1,1)">${key1('#e4e8ee')}</g></g>`;
export const net = (() => {
  let m = '<g opacity=".85">';
  for (let i = 0; i < 6; i++) m += `<path d="M${-30 + i * 12} 0 Q${-34 + i * 14} 70 ${-40 + i * 16} 140" stroke="#cdb88e" stroke-width="2.2" fill="none"/>`;
  for (let j = 1; j < 7; j++) m += `<path d="M${-30 - j} ${j * 20} Q4 ${j * 20 + 8} ${36 + j * 1.5} ${j * 20}" stroke="#cdb88e" stroke-width="2.2" fill="none"/>`;
  return m + [[-40, 140], [-8, 146], [24, 142], [44, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#d8a24a"/>`).join('') + '</g>';
})();
export const fish = (c = '#9ab8c8', s = 1, rot = 0) => `<g transform="rotate(${rot}) scale(${s})"><path d="M16 0 L32 -11 L30 11Z" fill="${dark(c, 0.25)}"/><ellipse rx="22" ry="10" fill="${c}"/>`
  + `<ellipse cx="-2" cy="4" rx="14" ry="4" fill="${light(c, 0.4)}" opacity=".7"/><circle cx="-13" cy="-2" r="2.4" fill="#2b1d14"/></g>`;
export const candle = `<g><rect x="-5" y="-30" width="10" height="34" rx="3" fill="#fbf6ea"/><circle cy="-38" r="18" fill="url(#sunGlow)"/><ellipse cy="-38" rx="4" ry="7" fill="#ffd98a"${M.flick(0.6, 0, 0.6)}/></g>`;
const flame = (s = 1) => `<g transform="scale(${s})"><circle cy="-16" r="30" fill="url(#sunGlow)" opacity=".9"/><g${M.pulse(0.14, 0.6, 0, 0, 0)}><path d="M0 0 Q-14 -14 -5 -36 Q0 -24 6 -30 Q15 -12 0 0Z" fill="#ff8a3a"/>`
  + '<path d="M0 -2 Q-7 -10 -2 -22 Q2 -14 5 -16 Q8 -8 0 -2Z" fill="#ffe08a"/></g></g>';
const headFlame = `<g transform="translate(0,-300)">${flame(1.15)}</g>`;

// ------------------------------------------------------------- set pieces
// Galilean fishing boat; crew is SVG in boat-local coords (feet at y 0, hidden below the gunwale at y -50)
export function fishingBoat(x, y, s = 1, { crew = '', sail = true, hull = '#7a4a2a', sailC = '#efe2c4' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><g${M.sway(1.5, 4.4)}><g${M.bob(6, 3.8)}>`
    + '<rect x="-6" y="-370" width="12" height="340" fill="#5a3d22"/><rect x="-60" y="-350" width="120" height="8" rx="4" fill="#5a3d22"/>'
    + (sail ? `<g${M.pulse(0.03, 3, 0, 0, -200)}><path d="M-56 -342 Q0 -300 56 -342 L80 -90 Q0 -70 -80 -90Z" fill="${sailC}"/><path d="M20 -320 Q40 -330 56 -342 L80 -90 Q60 -86 40 -84Z" fill="${dark(sailC, 0.14)}" opacity=".7"/></g>` : '')
    + crew
    + `<path d="M-230 -50 L230 -50 Q215 10 160 26 L-160 26 Q-215 10 -230 -50Z" fill="${hull}"/><path d="M-224 -38 L224 -38" stroke="${light(hull, 0.22)}" stroke-width="7"/>`
    + `<path d="M-190 6 L190 6" stroke="${dark(hull, 0.3)}" stroke-width="5" opacity=".6"/><path d="M-230 -50 Q-250 -70 -246 -86 M230 -50 Q250 -70 246 -86" stroke="${hull}" stroke-width="10" fill="none" stroke-linecap="round"/></g></g></g>`;
}
export function campfire(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><circle cy="-40" r="170" fill="url(#sunGlow)" opacity=".85"/>`
    + '<path d="M-52 2 L44 -16 M-44 -16 L52 2" stroke="#5a3a22" stroke-width="14" stroke-linecap="round"/>'
    + `<g${M.pulse(0.12, 0.7, 0, 0, -8)}><path d="M-30 -8 Q-38 -60 -6 -98 Q-4 -60 10 -52 Q14 -82 30 -90 Q42 -40 30 -8Z" fill="#f08a3a"/></g>`
    + `<g${M.pulse(0.16, 0.55, 0.2, 0, -8)}><path d="M-16 -8 Q-20 -46 0 -72 Q6 -40 18 -36 Q24 -20 16 -8Z" fill="#ffd36a"/></g>`
    + motes(6, { x0: -40, x1: 40, y0: -160, y1: -60, color: '#ffb060', size: [2, 4], rise: 90 }) + '</g>';
}
export function rooster(x, y, s = 1, { flip = false } = {}) {
  const c = '#c0602e';
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><g${M.bob(2, 1.8)}>`
    + '<path d="M-6 -8 v8 M8 -8 v8" stroke="#e2a33a" stroke-width="3.4" stroke-linecap="round"/>'
    + '<path d="M-18 -34 Q-60 -78 -46 -24 Q-64 -54 -54 -10 Q-40 -16 -16 -18Z" fill="#2e5a4a"/><path d="M-22 -32 Q-48 -70 -40 -30" stroke="#4a8a6a" stroke-width="3" fill="none"/>'
    + `<ellipse cx="0" cy="-26" rx="26" ry="19" fill="${c}"/><ellipse cx="-4" cy="-24" rx="15" ry="9" fill="${dark(c, 0.25)}" transform="rotate(-12)"/>`
    + `<g${M.sway(14, 1.1, 0, 12, -36)}><path d="M8 -36 Q14 -52 18 -54 L28 -44 Q22 -34 14 -30Z" fill="${c}"/><circle cx="20" cy="-50" r="11" fill="${c}"/>`
    + '<path d="M11 -58 q3 -11 8 -3 q4 -11 8 -2 q5 -7 5 3Z" fill="#d8323a"/><path d="M30 -52 L41 -48 L30 -45Z" fill="#e2a33a"/>'
    + '<ellipse cx="27" cy="-40" rx="3.5" ry="5.5" fill="#d8323a"/><circle cx="23" cy="-52" r="2.3" fill="#2b1d14"/><circle cx="23.6" cy="-52.8" r=".8" fill="#fff"/></g></g></g>';
}
export function sheep(x, y, s = 1, ph = 0, flip = false) {
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="2" rx="46" ry="9" fill="#1a0f1a" opacity=".18" filter="url(#soft)"/><g${M.bob(2, 2 + ph, ph)}>`
    + '<rect x="-26" y="-22" width="9" height="24" rx="4" fill="#4a3a3a"/><rect x="18" y="-22" width="9" height="24" rx="4" fill="#4a3a3a"/>'
    + [[-20, -40], [0, -48], [20, -40], [-10, -30], [12, -30]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="20" fill="#f4efe4"/>`).join('')
    + '<g transform="translate(34,-44)"><ellipse rx="16" ry="13" fill="#4a3a3a"/><circle cx="6" cy="-3" r="2.6" fill="#fff"/><ellipse cx="-10" cy="-10" rx="8" ry="4" fill="#4a3a3a" transform="rotate(-20)"/></g></g></g>';
}
// Jerusalem: flat-roofed stone houses around the Temple, low city wall in front
export function jerusalem(x, y, s = 1, { wall = '#e6d0a6', shade = 0.18, win = null } = {}) {
  let b = '';
  [[-480, 120, 120], [-370, 110, 165], [-255, 120, 125], [255, 120, 140], [370, 110, 180], [480, 120, 120]].forEach(([hx, w, h], i) => {
    const c = i % 2 ? wall : light(wall, 0.08);
    b += `<rect x="${hx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><rect x="${hx + w / 6}" y="${-h}" width="${w / 3}" height="${h}" fill="${dark(c, shade)}" opacity=".55"/>`
      + `<rect x="${hx - w / 2 - 4}" y="${-h - 8}" width="${w + 8}" height="10" fill="${dark(c, 0.1)}"/><path d="M${hx - 12} ${-h + 58} v-18 a12 12 0 0 1 24 0 v18Z" fill="${win || dark(c, 0.45)}"/>`;
  });
  const t = light(wall, 0.14);
  b += `<rect x="-170" y="-250" width="340" height="250" fill="${t}"/><rect x="60" y="-250" width="110" height="250" fill="${dark(t, shade)}" opacity=".5"/>`
    + `<rect x="-180" y="-262" width="360" height="16" fill="${GOLD}"/>` + [-150, -110, -70, 70, 110, 150].map((sx) => `<rect x="${sx - 2}" y="-284" width="4" height="22" fill="${GOLD}"/>`).join('')
    + `<rect x="-60" y="-220" width="120" height="220" fill="${dark(wall, 0.4)}"/><rect x="-60" y="-220" width="120" height="10" fill="${GOLD}"/>`
    + [-130, -95, 95, 130].map((cx) => `<rect x="${cx - 7}" y="-230" width="14" height="230" fill="${light(t, 0.15)}"/>`).join('')
    + `<path d="M-560 0 V-70 ${Array.from({ length: 28 }, (_, i) => `h20 v-14 h20 v14`).join(' ')} V0Z" fill="${dark(wall, 0.12)}" transform="translate(0,0)"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${b}</g>`;
}
// Ancient Rome skyline (pre-Colosseum): temples with pediments, an aqueduct, lit windows
export function romeSkyline(x, y, s = 1, { c = '#4a3050', win = '#ffd98a' } = {}) {
  const gap = dark(c, 0.35);
  const temple = (tx, w, h) => `<rect x="${tx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><path d="M${tx - w / 2 - 12} ${-h} L${tx} ${-h - w * 0.3} L${tx + w / 2 + 12} ${-h}Z" fill="${c}"/>`
    + Array.from({ length: Math.floor(w / 26) - 1 }, (_, i) => `<rect x="${tx - w / 2 + 18 + i * 26}" y="${-h + 14}" width="8" height="${h - 24}" fill="${gap}"/>`).join('');
  const arches = Array.from({ length: 14 }, (_, i) => `<path d="M${-540 + i * 78} -40 v-50 a26 26 0 0 1 52 0 v50Z" fill="${gap}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-560" y="-150" width="1120" height="150" fill="${c}"/>${arches}`
    + temple(-330, 200, 200) + temple(330, 170, 180) + temple(20, 240, 240)
    + `<rect x="-520" y="-210" width="120" height="70" fill="${c}"/><rect x="430" y="-230" width="110" height="90" fill="${c}"/>`
    + [[-500, -190], [-450, -190], [450, -205], [500, -205]].map(([wx, wy]) => `<rect x="${wx}" y="${wy}" width="16" height="22" fill="${win}" opacity=".7"/>`).join('') + '</g>';
}
// The Egyptian obelisk of Nero's circus on Vatican Hill (now in St. Peter's Square)
export const obelisk = (x, y, s = 1, c = '#5a3e5e') => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-40" y="-30" width="80" height="30" fill="${dark(c, 0.15)}"/>`
  + `<path d="M-22 -30 L-14 -360 L0 -394 L14 -360 L22 -30Z" fill="${c}"/><path d="M0 -394 L14 -360 L22 -30 L6 -30Z" fill="${dark(c, 0.25)}" opacity=".6"/></g>`;
// St. Peter's cross (inverted Latin cross), an emblem standing at rest with a warm glow
export const petrineCross = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle cy="-200" r="230" fill="url(#sunGlow)" opacity=".55"/>`
  + '<rect x="-14" y="-420" width="28" height="430" rx="5" fill="#7a5536"/><rect x="4" y="-420" width="10" height="430" rx="4" fill="#5a3d22" opacity=".6"/>'
  + '<rect x="-96" y="-136" width="192" height="26" rx="5" fill="#7a5536"/><rect x="-96" y="-118" width="192" height="8" rx="3" fill="#5a3d22" opacity=".55"/></g>';
export const rockOut = (x, y, s = 1, c = '#5a4458') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-270 70 Q-260 -50 -150 -90 Q-40 -122 60 -112 Q190 -100 260 -30 L280 70Z" fill="${c}"/>`
  + `<path d="M60 -112 Q190 -100 260 -30 L280 70 L120 70 Q140 -20 60 -112Z" fill="${dark(c, 0.25)}" opacity=".6"/><path d="M-200 -70 Q-100 -114 40 -110" stroke="${light(c, 0.3)}" stroke-width="6" fill="none" opacity=".6" stroke-linecap="round"/></g>`;
const cliff = (x, y, s = 1, c = '#b08a64') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-320 0 L-270 -320 Q-180 -430 -30 -410 Q110 -390 170 -280 L250 0Z" fill="${c}"/>`
  + `<path d="M-30 -410 Q110 -390 170 -280 L250 0 L60 0 Q90 -200 -30 -410Z" fill="${dark(c, 0.22)}" opacity=".6"/><ellipse cx="-110" cy="-120" rx="70" ry="90" fill="${dark(c, 0.5)}"/></g>`;
function courtyard(y, { wall = '#6a5a6e', top = 930 } = {}) {
  let st = '';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) st += `<rect x="${-80 + c * 130 + (r % 2) * 65}" y="${top + 20 + r * 58}" width="118" height="48" rx="8" fill="${(r + c) % 3 ? dark(wall, 0.06) : light(wall, 0.05)}"/>`;
  return `<rect x="-200" y="${top}" width="${W + 400}" height="${y - top}" fill="${wall}"/>${st}<rect x="-200" y="${top - 14}" width="${W + 400}" height="18" fill="${light(wall, 0.15)}"/>`
    + `<path d="M440 ${y} V${top + 110} Q540 ${top + 30} 640 ${top + 110} V${y}Z" fill="${dark(wall, 0.55)}"/>`;
}
export function followers(y, n = 12, { color = '#3a2a3e' } = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = 40 + (i * (W - 80)) / (n - 1), h = ((i * 37) % 5) * 4;
    out += `<g transform="translate(${f(x)},${f(y + h)})"><g${M.bob(6, 1.4 + (i % 4) * 0.25, i * 0.3)} fill="${color}"><circle cx="0" cy="-130" r="34"/><path d="M-60 0 Q-60 -90 0 -95 Q60 -90 60 0Z"/>`
      + '</g></g>';
  }
  return out;
}
function rain(n, seed = 3) {
  const r = rng(seed); let s = '';
  for (let i = 0; i < n; i++) {
    const x = r() * 1500 - 200, y = r() * 2300 - 900;
    s += `<g${M.drift(-180, 1100)}><path d="M${f(x)} ${f(y)} l-12 44" stroke="#cfd8f0" stroke-width="2.6" opacity=".4" stroke-linecap="round"/></g>`;
  }
  return s;
}
const moon = (x, y, r = 46) => `<circle cx="${x}" cy="${y}" r="${r * 4}" fill="url(#sunGlow)" opacity=".35"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f6efd8"/><circle cx="${x + 14}" cy="${y - 10}" r="${r * 0.22}" fill="#e2d8bc" opacity=".7"/>`;
const reeds = (x, y, s = 1, c = '#5a7a4a') => `<g transform="translate(${x},${y}) scale(${s})"><g${M.sway(3, 3.6, x % 2, 0, 0)}>`
  + [-20, -6, 8, 20].map((rx, i) => `<path d="M${rx} 0 Q${rx + (i % 2 ? 10 : -10)} -70 ${rx + (i % 2 ? 18 : -14)} -${120 + i * 14}" stroke="${i % 2 ? c : dark(c, 0.2)}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join('')
  + `<ellipse cx="-14" cy="-134" rx="6" ry="16" fill="#7a5a3a"/><ellipse cx="18" cy="-158" rx="6" ry="16" fill="#7a5a3a"/></g></g>`;

// ------------------------------------------------------------- scenes
// 0 · hook: the fisherman on the rock, keys in hand
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 5 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 7 }) + basilica(880, 1070, 0.4, { color: '#5a3a5e' }) + hill(1078, 14, '#6a4a72', 3, { freq: 1.4 }))
    + glow(540, 1120, 520, 0.85)
    + `<rect x="-200" y="1076" width="${W + 400}" height="900" fill="url(#seaDusk)"/>`
    + waves(1082, 6, 300, 7, '#7a5a8a', { foam: '#f2b28a', op: 0.9 }) + sparkles(12, 300, 780, 1090, 1160, { seed: 4, color: '#ffe0b0' })
    + MID(fishingBoat(150, 1170, 0.5, { hull: '#4a3040', sailC: '#e8c0a8' }) + waves(1185, 9, 360, 6, '#3c3a6e', { phase: 1 }))
    + rockOut(540, 1362, 1.0)
    + waves(1380, 10, 420, 5, '#2e2c5a', { phase: 2, foam: '#8a7aa8' })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${peter(540, 1252, 2.4, { age: 'old', halo: 0.6, mood: 'happy', armL: [26, 2, 3], armR: [30, 2, 3.4], propR: keys(1.15), propL: book(false) })}</g>`
    + motes(16, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · Bethsaida: the call by the Sea of Galilee (Peter's face changes from surprise to joy)
function scene1() {
  const P = (mood) => peter(380, 1320, 1.85, { mantle: false, mood, armL: [16, 2, 3], armR: [40, 4, 2.6], propR: net });
  const fadeOut = M.tw([{ at: 9.9, dur: 0.5, from: { opacity: 1 }, to: { opacity: 0 } }]);
  const fadeIn = M.tw([{ at: 9.9, dur: 0.5, from: { opacity: 0 }, to: { opacity: 1 } }]);
  return FAR(sky(SKIES.day) + sun(860, 520, 56, 260))
    + BACK(clouds(430, { seed: 4 }) + hill(1000, 50, '#a4b8c8', 3, { freq: 1.3 }) + hill(1030, 26, '#8aaa8a', 5, { freq: 2 }))
    + `<rect x="-200" y="1030" width="${W + 400}" height="400" fill="url(#seaG)"/>`
    + waves(1036, 5, 240, 6, '#5a9cc4', { foam: '#d9f0f7' }) + sparkles(10, 0, W, 1044, 1140, { seed: 6 })
    + MID(fishingBoat(140, 1190, 0.72, { crew: andrew(-40, 0, 1.0, { mood: 'joy', armR: [100, 6, 1.6], armL: 20, propR: fish('#9ab8c8', 1.2, 70) }) })
      + waves(1200, 9, 360, 6, '#3f86b0', { phase: 1, foam: '#cfe8f2' }))
    + ground(1240, '#e2c896', { rim: '#f6e6c0' }) + tufts(1246, 10, '#a99a5a', { seed: 3 })
    + reeds(1000, 1260, 1.1)
    + `<g${fadeOut}>${P('surprised')}</g><g opacity="0"${fadeIn}>${P('joy')}</g>`
    + jesus(790, 1320, 1.9, { flip: true, mood: 'happy', armR: [72, 6, 2.4], armL: 12 })
    + `<g transform="translate(560,1312)">${fish('#a8c4d0', 1.2, -8)}<g transform="translate(30,10)">${fish('#8aa8b8', 1.1, 14)}</g></g>`
    + NEAR(foliage('r', 1630, { color: '#2f5a35', seed: 9 }));
}

// 2 · walking on the water in the storm
function scene2() {
  const crew = disciple(-60, 0, 1.0, 0, { mood: 'worried', armL: [40, 6, 1.4] }) + disciple(70, 0, 0.95, 2, { mood: 'surprised', flip: true, armR: [70, 8, 1.2] });
  return FAR(sky([[0, '#10142e'], [0.5, '#2a3360'], [1, '#4a5a84']]) + glow(330, 820, 440, 0.7))
    + BACK(clouds(380, { color: '#5a6488', op: 0.8, drift: 90, seed: 2 }) + clouds(600, { color: '#4a5478', op: 0.7, drift: -60, seed: 8 }))
    + `<rect x="-200" y="980" width="${W + 400}" height="1000" fill="#1e3358"/>`
    + waves(990, 10, 300, 4, '#2e4a78', { foam: '#9fb8e0' })
    + MID(fishingBoat(880, 1080, 0.62, { sail: false, hull: '#4a3426', crew }) + waves(1095, 16, 360, 3.5, '#24406c', { phase: 1, foam: '#8aa8d8' }))
    + jesus(330, 1250, 1.85, { mood: 'happy', armR: [84, 4, 2], armL: 20 })
    + peter(770, 1385, 1.8, { mantle: false, mood: 'worried', armL: [104, 6, 1.4], armR: [64, 10, 1.1] })
    + waves(1250, 14, 380, 3, '#18325c', { phase: 3, foam: '#b8d0f2' })
    + waves(1330, 18, 460, 2.8, '#122848', { phase: 4, foam: '#7a98c8' })
    + rain(80, 3);
}

// 3 · "Who do you say that I am?" — Peter, the rock, and the keys
function scene3() {
  const sit = [[470, 0], [610, 3]].map(([x, i]) => disciple(x, 1190, 0.95, i, { sitting: true, mood: 'surprised', armL: 20, armR: 20 })).join('');
  return FAR(sky([[0, '#e89a6a'], [0.45, '#f8d39a'], [1, '#f6e3b8']]) + rays(540, 620, { op: 0.12 }))
    + BACK(cliff(150, 1150, 1.05) + hill(1110, 40, '#c9a06a', 4, { freq: 1.2 }))
    + MID(sit)
    + ground(1240, '#c9a46a', { rim: '#ecd2a0' }) + tufts(1246, 10, '#9a7a4a', { seed: 6 })
    + `<g transform="translate(560,650)"><g${M.in('pop', 9.2, 1.0)}>${glow(0, -20, 260, 0.9)}<g${M.bob(10, 3.2)}>${keys(2.2)}</g></g></g>`
    + peter(320, 1320, 1.85, { mood: 'joy', armL: [26, 3, 3], armR: [22, 3, 2.6] })
    + jesus(790, 1320, 1.9, { flip: true, mood: 'happy', armR: [122, 6, 2.2], armL: 14 })
    + sparkles(12, 380, 740, 480, 820, { seed: 7 })
    + NEAR(foliage('l', 1630, { color: '#5a4a2e', seed: 3 }));
}

// 4 · the courtyard fire, three denials, the rooster
function scene4() {
  const maid = person(230, 1320, 1.45, { kind: 'layman', girl: true, top: '#8a6a5a', pants: '#8a6a5a', skin: '#d9a47e', hair: '#2a1e16', mood: 'stern', armR: [80, 4, 2], armL: 10 });
  const guard = person(110, 1240, 1.0, { kind: 'layman', top: '#7a5a3a', pants: '#5a4a3a', skin: '#d9a47e', hair: '#2a1e16', beard: null, mood: 'stern', armL: 8, armR: 8,
    over: '<path d="M-44 -256 Q-44 -308 0 -310 Q44 -308 44 -256 L38 -250 L-38 -250Z" fill="#a07a3a"/>' });
  return FAR(sky(SKIES.night, { stars: 30, seed: 3 }) + moon(820, 470))
    + BACK(hill(1000, 30, '#2a2f52', 5) + jerusalem(540, 960, 0.6, { wall: '#3e3a5e', shade: 0.2, win: '#ffd98a' }))
    + MID(courtyard(1240, { wall: '#5a4a62', top: 960 }) + guard)
    + ground(1240, '#3e3446', { rim: '#7a6a7a' })
    + `<g${M.in('pop', 5.0, 0.7, 980, 946)}>${rooster(980, 946, 1.4, { flip: true })}</g>`
    + campfire(500, 1300, 1.15)
    + maid
    + peter(790, 1320, 1.85, { mood: 'sad', flip: true, armL: [18, 2, 3], armR: [14, 2, 3.2] })
    + motes(10, { x0: 420, x1: 600, y0: 1000, y1: 1250, color: '#ffb060', seed: 3 })
    + NEAR(foliage('r', 1650, { color: '#141428', seed: 2 }));
}

// 5 · dawn by the lake: "Do you love me?" — "Feed my sheep"
function scene5() {
  return FAR(sky(SKIES.sunrise) + sun(800, 990, 64, 320))
    + BACK(clouds(430, { color: '#fff4e4', op: 0.8, seed: 5 }) + hill(1020, 34, '#b8a6b8', 3, { freq: 1.2 }))
    + `<rect x="-200" y="1020" width="${W + 400}" height="400" fill="url(#seaG)"/>`
    + waves(1026, 5, 260, 7, '#7aa6c8', { foam: '#fff0d8' }) + sparkles(14, 640, 960, 1030, 1110, { seed: 9, color: '#fff2c8' })
    + MID(fishingBoat(900, 1150, 0.5, { sail: false }) + waves(1160, 8, 340, 6, '#5a8ab0', { phase: 1 }))
    + ground(1220, '#e6cc9a', { rim: '#f8e4b8' }) + tufts(1226, 10, '#b49a6a', { seed: 4 })
    + sheep(120, 1300, 1.15, 0.2) + sheep(980, 1320, 1.2, 0.5, true) + sheep(880, 1250, 0.85, 0.9, true)
    + campfire(530, 1295, 0.85) + `<g transform="translate(530,1262)">${fish('#c9a070', 1, 0)}</g>`
    + jesus(320, 1320, 1.85, { mood: 'happy', armR: [58, 5, 2.4], armL: 12 })
    + peter(730, 1320, 1.85, { mood: 'joy', flip: true, armL: [30, 3, 3], armR: [18, 2, 3.2] })
    + NEAR(foliage('l', 1640, { color: '#4a5a2e', seed: 6 }));
}

// 6 · Pentecost in Jerusalem
function scene6() {
  const ap = [[290, 1], [790, 3]].map(([x, i]) => disciple(x, 1220, 1.3, i, { mood: 'joy', flip: x > 540, armL: [i === 1 ? 120 : 20, 6, 1.6], over: headFlame })).join('');
  return FAR(sky(GOLDSKY) + rays(540, 560, { op: 0.14 }) + glow(540, 560, 380, 0.8))
    + flyer(540, 540, '#ffffff', 1.7, { dx: 0, dy: 0 })
    + BACK(clouds(760, { color: '#fff0d4', op: 0.6, seed: 11, drift: 30 }) + jerusalem(540, 1150, 1.0))
    + MID(`<rect x="300" y="1200" width="480" height="30" fill="#c9b08a"/><rect x="260" y="1228" width="560" height="30" fill="#b89e78"/>`)
    + ground(1256, '#a88e6a', { rim: '#d8be96' })
    + ap
    + peter(540, 1202, 1.85, { age: 'mid', mood: 'happy', talk: true, armR: [140, 10, 1.4], armL: [30, 3, 3], over: headFlame })
    + followers(1460, 12, { color: '#4a3446' })
    + motes(16, { y0: 500, y1: 1200, seed: 8, color: '#fff2c4' });
}

// 7 · Rome under Nero: the cross of St. Peter shown as his emblem, at rest, in a warm glow
function scene7() {
  return FAR(sky(SKIES.deep, { stars: 30, seed: 9 }) + glow(540, 900, 480, 0.6))
    + BACK(romeSkyline(540, 1130, 1))
    + MID(hill(1200, 36, '#3a2440', 6, { freq: 0.8 }) + obelisk(850, 1210, 0.9) + cypress(990, 1220, 0.9, '#22182c') + cypress(60, 1230, 0.85, '#22182c'))
    + `<g${M.in('fade', 1.0, 2.0)}>${beam(420, 700, 300, 860, 1300, 0.5)}</g>`
    + petrineCross(290, 1290, 1.0)
    + ground(1280, '#2e2034', { rim: '#6a4a6a' })
    + peter(600, 1312, 2.0, { age: 'old', mood: 'peaceful', halo: 2.0, armL: [28, 2, 3], armR: [24, 2, 3.3], propL: palm_frond(1.0, -14), propR: keys(0.9) })
    + motes(18, { x0: 200, x1: 860, y0: 600, y1: 1260, seed: 6, color: '#ffd9a0' })
    + NEAR(foliage('l', 1640, { color: '#1a1222' }) + foliage('r', 1660, { color: '#1a1222', seed: 3 }));
}

// 8 · Vatican Hill: the basilica over the tomb, "Petros eni" (Peter is here)
function scene8() {
  const pilgrims = [[90, 0, false], [210, 1, false], [870, 2, true], [990, 3, true]]
    .map(([x, i, fl]) => disciple(x, 1110, 0.95, i, { mood: 'peaceful', flip: fl, armL: [40, 2, 3], propL: candle, armR: 10 })).join('');
  const niche = '<g transform="translate(540,1170)">'
    + '<path d="M-180 240 V50 Q-180 -40 0 -62 Q180 -40 180 50 V240Z" fill="#241826"/>' + glow(0, 90, 220, 0.6)
    + '<rect x="-140" y="44" width="280" height="96" rx="8" fill="#e8dcc0"/><rect x="60" y="44" width="80" height="96" rx="8" fill="#cbbd9c" opacity=".6"/>'
    + '<text x="0" y="106" text-anchor="middle" font-family="DejaVu Serif, serif" font-size="27" font-weight="bold" fill="#6a4a3a" letter-spacing="1">ΠΕΤΡΟΣ ΕΝΙ</text>'
    + '<path d="M-96 60 l14 6 M80 128 l18 -4 M-70 128 l10 -6" stroke="#9a8a6a" stroke-width="2"/></g>';
  return FAR(sky(GOLDSKY) + rays(540, 560, { op: 0.13 }) + glow(540, 620, 440, 0.7))
    + BACK(clouds(820, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + basilica(540, 1110, 0.95, { color: '#3a2a40' }))
    + ground(1108, '#4a3242', { rim: '#c08a6a' })
    + `<g${M.in('fade', 1.5, 1.6)}>${niche}</g>`
    + pilgrims
    + petalsGold();
}
const petalsGold = () => motes(14, { y0: 500, y1: 1060, seed: 12, color: '#fff2c4' });

// 9 · feast day June 29, patron of fishermen
function scene9() {
  return FAR(sky(SKIES.dusk, { stars: 20, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(540, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + hill(1086, 22, '#6a4a72', 3, { freq: 1.5 }))
    + glow(540, 1110, 500, 0.85)
    + `<rect x="-200" y="1084" width="${W + 400}" height="900" fill="url(#seaDusk)"/>`
    + waves(1090, 6, 300, 7, '#7a5a8a', { foam: '#f2b28a', op: 0.9 })
    + MID(fishingBoat(880, 1180, 0.5, { hull: '#4a3040', sailC: '#e8c0a8', crew: disciple(0, 0, 1.0, 1, { mood: 'joy', armR: [130, 10, 1.4] }) })
      + waves(1195, 9, 360, 6, '#3c3a6e', { phase: 1 }))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1296, 10, '#3a2438', { seed: 7 })
    + peter(540, 1292, 2.4, { age: 'old', halo: 0.3, mood: 'happy', armL: [26, 2, 3], armR: [30, 2, 3.4], propR: keys(1.15), propL: book(false) })
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#f6d36b', '#f2a0b0'] })
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_peter_apostle', name: 'St_Peter_the_Apostle',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'The fisherman Jesus called Rock', thumb_title: 'St. Peter the Apostle', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'bɛθsˈeɪdə': 'bɛθsˈeɪɪdə',   // Bethsaida -> beth-SAY-ih-da
  },
  scenes: [
    { kicker: 'THE FIRST POPE', title: 'The Rock', art: scene0, cam: { move: 'push', amt: 0.08, oy: 1000 },
      say: ['He was a simple fisherman, yet Jesus built his Church on him.', 'This is Saint Peter, the Apostle.'] },
    { kicker: 'BETHSAIDA · SEA OF GALILEE', title: 'Fishers of Men', art: scene1, cam: { move: 'pan-r', amt: 0.07 },
      say: ['Simon, son of Jonah, was a fisherman from Bethsaida, with his brother Andrew.',
        'Jesus called them, Come after me, and I will make you fishers of men.', 'They left their nets.'] },
    { kicker: 'A STORM ON THE SEA', title: 'Walking on Water', art: scene2, cam: { move: 'tilt-up', amt: 0.06 },
      say: ['One stormy night, Peter walked on the water toward Jesus.', 'But he grew afraid and began to sink, and Jesus caught his hand.'] },
    { kicker: 'WHO DO YOU SAY I AM?', title: 'The Keys', art: scene3, cam: { move: 'push', amt: 0.08, oy: 900 },
      say: ['Jesus asked, Who do you say that I am?', 'Simon answered, You are the Messiah, the Son of the living God.',
        'Jesus named him Peter, the rock, and promised him the keys.'] },
    { kicker: 'THE NIGHT OF THE ARREST', title: 'Three Denials', art: scene4, cam: { move: 'drift-l', amt: 0.07 },
      say: ['But on the night Jesus was arrested, Peter denied him three times.', 'Then a rooster crowed, and Peter went out and wept bitterly.'] },
    { kicker: 'AFTER THE RESURRECTION', title: 'Feed My Sheep', art: scene5, cam: { move: 'pan-r', amt: 0.07 },
      say: ['After the Resurrection, Jesus asked him three times, Do you love me?', 'Three times Peter said yes, and Jesus told him, Feed my sheep.'] },
    { kicker: 'PENTECOST · JERUSALEM', title: 'Fearless Preacher', art: scene6, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['At Pentecost, filled with the Holy Spirit, Peter preached boldly in Jerusalem.', 'About three thousand people were baptized that day.'] },
    { kicker: 'c. AD 64 – 67 · ROME', title: 'Martyr in Rome', art: scene7, cam: { move: 'tilt-up', amt: 0.06 },
      say: ['He led the Church as the first pope, and came to Rome.',
        'Under Emperor Nero, he was crucified, tradition says upside down, feeling unworthy to die as his Lord did.'] },
    { kicker: 'VATICAN HILL · ROME', title: 'Peter Is Here', art: scene8, cam: { move: 'pull', amt: 0.06, oy: 1100 },
      say: ['He was buried on Vatican Hill, where Saint Peter\'s Basilica now stands.', 'Beneath it, a Greek inscription was found: Peter is here.'] },
    { kicker: 'FEAST DAY · JUNE 29', title: 'Patron of Fishermen', art: scene9, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['His feast, shared with Saint Paul, is June 29.', 'He is patron of the Church, the popes, and fishermen.', 'Saint Peter, pray for us.'] },
  ],
};
