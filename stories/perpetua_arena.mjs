// St. Perpetua: "Thrown to the Beasts" (one story: prison, trial and the arena of Carthage, 203). Feast: March 7 (with St. Felicity).
// Source: the Passion of Perpetua and Felicity (her own prison diary + an eyewitness ending), trans. R.E. Wallis (New Advent).
// The wild cow's charge is hidden in a dust cloud; the gladiator's sword stays lowered; her death is told, not shown.
// New (exported for later reels): Perpetua (white tunic, teal palla, pinned-up hair), Felicity (pregnant or not, kerchief),
// amphitheater stands with a cheering crowd, arena gate with a lifting portcullis, fierce wild cow, dust cloud,
// water jar, tribunal dais, Roman prison vault, Carthage on its hill by the sea, golden ladder (her vision), gladius, scroll.
import { W, M, SKIES, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  person, palm_frond, ground, dark, light, rng, f, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { roman } from './martin_of_tours.mjs';
import { column, notes } from './cecilia_wedding_angel.mjs';
import { mantleBack, mantleFront, followers } from './peter.mjs';
import { babyBundle } from './aparecida.mjs';
import { kerchief } from './bakhita_freedom.mjs';
import { cypress } from './nicholas.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const swap = (a, b, at, dur = 0.45) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;
const HOT = [[0, '#7a3440'], [0.3, '#d8784a'], [0.62, '#f4c27a'], [1, '#f8dca0']];
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];
const LATE = [[0, '#5a2a4a'], [0.34, '#c0604a'], [0.7, '#f0a46a'], [1, '#f6c48a']];
const SAND = '#e2c08a';

// Line starts (s from scene start), from `node build.mjs stories/perpetua_arena.mjs info`
const T = { s0c: 6.24, s1b: 4.92, s2b: 3.08, s2q: 5.19, s2c: 7.35, s2d: 8.71, s3f: 3.59, s3b: 5.46, s3c: 7.82, s3j: 9.29, s3d: 11.75, s3p: 12.89, s4b: 3.74, s4c: 7.32, s5q: 1.69, s5b: 4.42, s5c: 9.54 };

// ---------------------------------------------------------------- characters
export const SKP = '#d4a07a', HAIRP = '#2a1a12', TUNIC_P = '#f4ede0', PALLA_P = '#2f7a84';
const bun = `<ellipse cx="0" cy="-298" rx="25" ry="17" fill="${HAIRP}"/><path d="M-14 -306 Q0 -313 14 -306" stroke="${light(HAIRP, 0.35)}" stroke-width="3" fill="none" opacity=".5"/>`;
const hairpin = `<path d="M10 -312 L30 -296" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/><circle cx="9" cy="-313" r="4" fill="${GOLD}"/>`;
const girdle = `<path d="M-38 -124 Q0 -114 38 -124" stroke="${GOLD}" stroke-width="5" fill="none"/>`;
// Perpetua: young noble matron of Carthage; white tunic, teal palla, hair pinned up with a gold pin
export const perpetua = (x, y, s, { palla = true, under = '', over = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, girl: true, top: TUNIC_P, skin: SKP, hair: HAIRP, beard: null, ...o,
  under: bun + (palla && !o.kneel ? mantleBack(PALLA_P) : '') + under,
  over: (palla && !o.kneel ? mantleFront(PALLA_P) : '') + girdle + hairpin + over });
// Felicity: young slave woman, plain tunic and kerchief; pregnant before the games
const bump = (c) => `<path d="M-30 -166 Q-58 -128 -46 -84 Q0 -66 46 -84 Q58 -128 30 -166Z" fill="${c}"/><path d="M22 -160 Q58 -124 46 -84 Q36 -78 24 -76 Q40 -120 14 -160Z" fill="${dark(c, 0.25)}" opacity=".55"/>`
  + `<path d="M-34 -140 Q-46 -116 -40 -96" stroke="${light(c, 0.3)}" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>`;
export const FELT = '#b07a4e', SKF = '#9a6340';
export const felicity = (x, y, s, { pregnant = false, over = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, girl: true, top: FELT, skin: SKF, hair: '#1a120c', beard: null, ...o,
  over: (pregnant && !o.kneel && !o.sitting ? bump(FELT) : '') + kerchief('#efe4cc') + over });
const togaC = (stripe) => `<path d="M-38 -206 Q-4 -160 40 -120 L44 -100 Q0 -140 -40 -186Z" fill="#efe6d2"/><path d="M-38 -206 Q-4 -160 40 -120" stroke="${stripe}" stroke-width="6" fill="none"/>`;
// Her father: grey-haired noble in a toga
export const pFather = (x, y, s, o = {}) => person(x, y, s, { kind: 'elder', top: '#8a6a52', skin: '#cc9a72', ...o, over: togaC('#6a2a4a') + (o.over || '') });
// Hilarianus, the procurator: white toga with a purple stripe
const judge = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#efe6d2', skin: '#e2b48f', hair: '#3a2a1e', beard: null, mood: 'stern', ...o, over: togaC('#6a2a6e') + (o.over || '') });
const brother = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#5a7a6a', pants: '#8a6a4a', skin: SKP, hair: HAIRP, beard: null, ...o });
const guard = (x, y, s, o = {}) => roman(x, y, s, { skin: '#d9a47e', mood: 'stern', armR: 22, propR: spear, ...o });
const mother = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', girl: true, robe: true, top: '#e2a0a8', skin: '#c48a5f', hair: '#2a1e16', ...o });

// ---------------------------------------------------------------- props
const spear = '<g><rect x="-4" y="-270" width="8" height="330" rx="3" fill="#6b4a2a"/><path d="M0 -312 L-11 -268 L11 -268Z" fill="#c4ccd6"/><path d="M0 -312 L11 -268 L2 -268Z" fill="#8a96a6"/></g>';
// Short Roman sword; held lowered with `gladiusDown`
export const gladius = '<g><rect x="-5" y="-112" width="10" height="100" fill="#dfe5ec"/><rect x="0" y="-112" width="5" height="100" fill="#b8c2ce"/><path d="M-5 -112 L0 -128 L5 -112Z" fill="#dfe5ec"/>'
  + '<rect x="-16" y="-14" width="32" height="9" rx="4" fill="#8a6a3a"/><rect x="-4" y="-6" width="8" height="22" rx="3" fill="#6b4a2a"/><circle cy="20" r="7" fill="#c99a4a"/></g>';
export const gladiusDown = `<g transform="rotate(180)">${gladius}</g>`;
export const scroll = '<g transform="translate(0,-16) rotate(-8)"><rect x="-34" y="-30" width="68" height="52" rx="3" fill="#f4ead2"/><rect x="14" y="-30" width="20" height="52" fill="#e2d4b4" opacity=".7"/>'
  + '<rect x="-40" y="-36" width="80" height="11" rx="5" fill="#c8a878"/><rect x="-40" y="18" width="80" height="11" rx="5" fill="#c8a878"/>'
  + '<path d="M-24 -16 H22 M-24 -6 H18 M-24 4 H22 M-24 12 H10" stroke="#8a6a4a" stroke-width="2.5"/></g>';
// Clay water jar (the "vessel" of her talk with her father); feet at (x, y), ~165 px tall at s = 1
export function waterJar(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="62" ry="11" fill="#1a0f1a" opacity=".3"/>`
    + '<path d="M-30 -138 Q-62 -140 -52 -100" stroke="#9a5230" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M30 -138 Q62 -140 52 -100" stroke="#7a4024" stroke-width="10" fill="none" stroke-linecap="round"/>'
    + '<path d="M-26 -150 Q-28 -134 -40 -124 Q-72 -96 -66 -50 Q-60 -2 0 0 Q60 -2 66 -50 Q72 -96 40 -124 Q28 -134 26 -150Z" fill="#c0703e"/>'
    + '<path d="M18 -142 Q58 -104 64 -50 Q60 -8 10 -1 Q48 -44 30 -128Z" fill="#8a4a2a" opacity=".55"/>'
    + '<rect x="-34" y="-164" width="68" height="17" rx="7" fill="#d08050"/><ellipse cx="0" cy="-164" rx="30" ry="6" fill="#4a2a1a"/>'
    + `<path d="M-62 -82 Q0 -66 62 -82" stroke="#5a2a1a" stroke-width="5" fill="none" opacity=".55"/><path d="M-56 -62 Q0 -48 56 -62" stroke="${GOLD}" stroke-width="3" fill="none" opacity=".7"/>`
    + '<path d="M-42 -116 Q-60 -92 -56 -62" stroke="#e8a070" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/></g>';
}
// The fierce wild cow of the Passion: dark hide, long horns, head lowered; faces right (flip to face left)
export function wildCow(x, y, s = 1, { flip = false, c = '#4a2e26', snort = true } = {}) {
  const horn = '#efe4cc', d = dark(c, 0.3);
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="2" rx="110" ry="14" fill="#1a0f1a" opacity=".25"/><g${M.bob(2, 0.9, x % 1)}>`
    + `<rect x="-78" y="-66" width="18" height="66" rx="7" fill="${d}"/><rect x="34" y="-66" width="18" height="66" rx="7" fill="${d}"/>`
    + `<path d="M-96 -112 Q-122 -96 -112 -60" stroke="${c}" stroke-width="7" fill="none"/><ellipse cx="-112" cy="-58" rx="7" ry="11" fill="${d}"/>`
    + `<rect x="-100" y="-142" width="170" height="90" rx="38" fill="${c}"/><ellipse cx="40" cy="-138" rx="50" ry="34" fill="${c}"/>`
    + `<path d="M-90 -70 Q-10 -50 66 -70" stroke="${d}" stroke-width="10" fill="none" opacity=".5"/><path d="M-70 -134 Q0 -146 50 -164" stroke="${light(c, 0.25)}" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/>`
    + `<rect x="-58" y="-66" width="18" height="66" rx="7" fill="${c}"/><rect x="54" y="-66" width="18" height="66" rx="7" fill="${c}"/>`
    + `<g transform="translate(92,-96)"><ellipse rx="36" ry="30" fill="${c}"/><ellipse cx="26" cy="16" rx="21" ry="16" fill="#7a5048"/><circle cx="32" cy="14" r="3" fill="#2b1d14"/><circle cx="22" cy="20" r="3" fill="#2b1d14"/>`
    + `<circle cx="4" cy="-8" r="5" fill="#2b1d14"/><circle cx="3" cy="-10" r="1.6" fill="#fff"/><path d="M-8 -18 L12 -12" stroke="#2b1d14" stroke-width="3.5" stroke-linecap="round"/>`
    + `<path d="M-14 -24 Q-30 -62 6 -74" stroke="${horn}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M8 -26 Q30 -58 58 -54" stroke="${horn}" stroke-width="9" fill="none" stroke-linecap="round"/>`
    + `<ellipse cx="-22" cy="-18" rx="12" ry="7" fill="${d}" transform="rotate(-30 -22 -18)"/></g>`
    + (snort ? `<g transform="translate(150,-66)"><g${M.pulse(0.3, 0.9)}><circle r="10" fill="#fff6e8" opacity=".45"/><circle cx="16" cy="-6" r="7" fill="#fff6e8" opacity=".3"/></g></g>` : '')
    + '</g></g>';
}
// Sand cloud (hides the charge)
export function dust(x, y, s = 1, { at = 0, hold = 1.2, c = '#f0d8a8' } = {}) {
  const R = rng(9); let p = '';
  for (let i = 0; i < 11; i++) p += `<circle cx="${f((R() - 0.5) * 360)}" cy="${f(-R() * 220)}" r="${f(70 + R() * 70)}" fill="${i % 3 ? c : light(c, 0.3)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><g${M.tw([{ at, dur: 0.35, from: { opacity: 0, scale: 0.4 }, to: { opacity: 0.97, scale: 1 }, ease: 'power2.out' }])}>`
    + `<g${M.tw([{ at: at + hold, dur: 1.0, from: { opacity: 1 }, to: { opacity: 0 } }])} filter="url(#blur6)">${p}</g></g></g>`;
}
// The golden ladder of her first vision, rising into the light
export function goldLadder(x, y0, y1, w = 120) {
  let r = '';
  for (let y = y0 - 60; y > y1; y -= 70) r += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="10" rx="5" fill="${GOLD}"/>`;
  return `<g opacity=".75"><rect x="${x - w / 2 - 14}" y="${y1}" width="14" height="${y0 - y1}" rx="7" fill="${GOLD}"/><rect x="${x + w / 2}" y="${y1}" width="14" height="${y0 - y1}" rx="7" fill="${GOLD}"/>${r}`
    + `<rect x="${x - w / 2 - 40}" y="${y1}" width="${w + 80}" height="${y0 - y1}" fill="url(#beam)" opacity=".35"/></g>`;
}

// ---------------------------------------------------------------- set pieces
const off = (x, k = 34) => k * (1 - Math.min(1, ((x - 540) / 760) ** 2));   // gentle dip toward the middle: the curve of the oval
// Amphitheater stands: arcade on top, tiers packed with a (bobbing) crowd, podium wall at `base`
export function arenaStands(base = 1160, { top = 560, stone = '#d8ac7a', tiers = 4, seed = 3, crowdC = ['#7a4a3a', '#4a3a5a', '#8a6a3a', '#5a2a2a', '#3a4a5a', '#a86a4a'], dim = 0 } = {}) {
  const R = rng(seed), st = dim ? dark(stone, dim) : stone;
  let s = `<path d="M-200 ${top} Q540 ${top + 2 * 34} ${W + 200} ${top} V${base} H-200Z" fill="${dark(st, 0.08)}"/>`;
  // arcade
  for (let i = 0; i < 17; i++) {
    const x = -190 + i * 92, y = top + off(x) + 26;
    s += `<path d="M${x - 30} ${f(y + 100)} V${f(y + 34)} a30 30 0 0 1 60 0 V${f(y + 100)}Z" fill="${dark(st, 0.5)}"/>`;
  }
  s += `<path d="M-200 ${top} Q540 ${top + 68} ${W + 200} ${top} V${top + 18} Q540 ${top + 86} -200 ${top + 18}Z" fill="${light(st, 0.15)}"/>`;
  const rowH = (base - 130 - (top + 140)) / tiers;
  for (let t = 0; t < tiers; t++) {
    const y0 = top + 140 + t * rowH;
    s += `<path d="M-200 ${f(y0)} Q540 ${f(y0 + 68)} ${W + 200} ${f(y0)} V${f(y0 + rowH)} Q540 ${f(y0 + rowH + 68)} -200 ${f(y0 + rowH)}Z" fill="${t % 2 ? st : dark(st, 0.06)}"/>`
      + `<path d="M-200 ${f(y0 + rowH - 6)} Q540 ${f(y0 + rowH + 62)} ${W + 200} ${f(y0 + rowH - 6)}" stroke="${light(st, 0.25)}" stroke-width="5" fill="none"/>`;
    let row = '';
    for (let x = -190 + (t % 2) * 22; x < W + 200; x += 44) {
      const c = dim ? dark(crowdC[Math.floor(R() * crowdC.length)], dim) : crowdC[Math.floor(R() * crowdC.length)], y = y0 + rowH - 8 + off(x) * 0;
      const yy = f(y0 + rowH - 8 + (34 * 2) * 0.5 * (1 - Math.min(1, ((x - 540) / 740) ** 2)));
      row += `<g transform="translate(${f(x + (R() - 0.5) * 10)},${yy})"><path d="M-19 0 Q-19 -30 0 -32 Q19 -30 19 0Z" fill="${c}"/><circle cy="-42" r="13" fill="${dim ? dark('#c48a62', dim) : ['#c48a62', '#9a6340', '#e0b08a', '#b97c52'][Math.floor(R() * 4)]}"/></g>`;
    }
    s += `<g${M.bob(3, 0.8 + t * 0.13, t * 0.2)}>${row}</g>`;
  }
  // podium wall around the sand
  s += `<rect x="-200" y="${base - 130}" width="${W + 400}" height="130" fill="${dark(st, 0.18)}"/><rect x="-200" y="${base - 138}" width="${W + 400}" height="14" fill="${light(st, 0.2)}"/>`
    + `<rect x="-200" y="${base - 100}" width="${W + 400}" height="22" fill="${dim ? dark('#9a3a2a', dim) : '#9a3a2a'}" opacity=".75"/>`;
  return s;
}
// Arena gate with an iron portcullis that lifts at `lift` (null = shut); a dark beast with horns waits behind
export function arenaGate(x, y, s = 1, { lift = null, beast = true, stone = '#c89a6a' } = {}) {
  const bars = `<g fill="#2a2228">${[-80, -48, -16, 16, 48, 80].map((bx) => `<rect x="${bx - 6}" y="-290" width="12" height="290"/>`).join('')}<rect x="-96" y="-230" width="192" height="12"/><rect x="-96" y="-120" width="192" height="12"/></g>`;
  const frame = `<path d="M-150 0 V-300 a150 150 0 0 1 300 0 V0Z M-100 0 V-290 a100 100 0 0 1 200 0 V0Z" fill="${stone}" fill-rule="evenodd"/>`
    + `<path d="M60 -440 a150 150 0 0 1 90 140 V0 H110 V-300 Q110 -390 60 -440Z" fill="${dark(stone, 0.2)}" opacity=".6"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-100 0 V-290 a100 100 0 0 1 200 0 V0Z" fill="#1a1216"/>`
    + (beast ? `<g opacity=".9"><path d="M-40 -170 Q-80 -230 -30 -240 M40 -170 Q80 -230 30 -240" stroke="#d8ccb4" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cy="-140" rx="52" ry="44" fill="#2e1e1e"/>`
      + `<circle cx="-18" cy="-148" r="6" fill="#ffcf6a"${M.flick(1.6, 0.3, 0.6)}/><circle cx="18" cy="-148" r="6" fill="#ffcf6a"${M.flick(1.6, 0.3, 0.6)}/></g>` : '')
    + `<g${lift == null ? '' : M.tw([{ at: lift, dur: 2.2, from: { y: 0 }, to: { y: -135 }, ease: 'power1.inOut' }])}>${bars}</g>${frame}`
    + `<path d="M-150 -300 a150 150 0 0 1 300 0" stroke="${light(stone, 0.25)}" stroke-width="10" fill="none"/></g>`;
}
// Roman prison vault: stone blocks, a small barred window with a shaft of light
export function prisonVault({ winX = 700 } = {}) {
  let blocks = '';
  for (let r = 0; r < 18; r++) for (let c = 0; c < 9; c++) blocks += `<rect x="${-200 + c * 170 + (r % 2) * 85}" y="${380 + r * 52}" width="162" height="46" rx="6" fill="${(r + c) % 3 ? '#4a3c4a' : '#54444f'}"/>`;
  return `<rect x="-200" y="-300" width="${W + 400}" height="1630" fill="#2e242e"/><rect x="-200" y="370" width="${W + 400}" height="960" fill="#3a2e3a"/>${blocks}`
    + `<rect x="${winX}" y="520" width="150" height="120" rx="10" fill="#c9d6f0"/><path d="M${winX + 30} 520 V640 M${winX + 60} 520 V640 M${winX + 90} 520 V640 M${winX + 120} 520 V640" stroke="#2a222c" stroke-width="9"/>`;
}
// Roman Carthage on its hill above the sea: white houses, a temple and cypresses
export function carthage(x, y, s = 1, { wall = '#f2e8d6', roof = '#c0704a', shade = 0.18 } = {}) {
  const house = (hx, hy, w, h) => `<rect x="${hx}" y="${hy - h}" width="${w}" height="${h}" fill="${wall}"/><rect x="${hx + w * 0.62}" y="${hy - h}" width="${w * 0.38}" height="${h}" fill="${dark(wall, shade)}"/>`
    + `<path d="M${hx - 6} ${hy - h} L${hx + w / 2} ${hy - h - 22} L${hx + w + 6} ${hy - h}Z" fill="${roof}"/><rect x="${hx + w * 0.3}" y="${hy - h * 0.6}" width="12" height="16" rx="5" fill="${dark(wall, 0.45)}"/>`;
  let t = `<g transform="translate(${x},${y}) scale(${s})"><path d="M-520 0 Q-300 -170 0 -230 Q300 -170 520 0Z" fill="${dark(wall, 0.38)}"/>`;
  [[-420, -20, 90, 60], [-320, -70, 100, 70], [-200, -120, 90, 80], [170, -130, 100, 74], [290, -80, 90, 66], [400, -30, 100, 56], [-120, -40, 80, 50], [120, -50, 90, 54]].forEach(([hx, hy, w, h]) => { t += house(hx, hy, w, h); });
  // temple on the top of the hill (Byrsa)
  t += `<rect x="-110" y="-262" width="220" height="24" fill="${wall}"/>${[-90, -54, -18, 18, 54, 90].map((cx) => `<rect x="${cx - 8}" y="-352" width="16" height="92" fill="${cx > 30 ? dark(wall, shade) : wall}"/>`).join('')}`
    + `<path d="M-124 -352 L0 -404 L124 -352Z" fill="${wall}"/><path d="M0 -404 L124 -352 L40 -352Z" fill="${dark(wall, shade)}"/></g>`;
  return t + cypress(x - 270, y - 120, 0.45, '#3a5a3a') + cypress(x + 250, y - 110, 0.5, '#3a5a3a');
}
function tribunal(x, y, s = 1, c = '#e6d8bc') {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-190" y="-230" width="380" height="230" fill="${c}"/><rect x="80" y="-230" width="110" height="230" fill="${dark(c, 0.18)}" opacity=".7"/>`
    + `<rect x="-206" y="-246" width="412" height="22" fill="${light(c, 0.12)}"/><rect x="-150" y="-180" width="300" height="120" fill="none" stroke="${dark(c, 0.2)}" stroke-width="6"/>`
    + `<rect x="-206" y="-20" width="412" height="20" fill="${dark(c, 0.12)}"/></g>`;
}
function colonnade(base, { c = '#e8dcc2', n = 6, h = 640 } = {}) {
  return Array.from({ length: n }, (_, i) => column(-60 + i * (W + 120) / (n - 1), base, h, { c })).join('')
    + `<rect x="-200" y="${base - h - 60}" width="${W + 400}" height="44" fill="${c}"/><rect x="-200" y="${base - h - 18}" width="${W + 400}" height="12" fill="${dark(c, 0.18)}"/>`;
}
// Arena ruins today: broken arches in golden light
function ruins(y, c = '#d8a888') {
  const arch = (x, h, broken) => `<path d="M${x - 70} ${y} V${y - h} ${broken ? `L${x - 40} ${y - h - 30} L${x - 20} ${y - h + 10}` : `a70 70 0 0 1 140 0`} V${y}H${x + 40} V${y - h + 40} a30 30 0 0 0 -60 0 V${y}Z" fill="${c}"/>`;
  return arch(140, 300, false) + arch(330, 380, true) + arch(760, 360, false) + arch(950, 280, true)
    + `<rect x="-200" y="${y - 6}" width="${W + 400}" height="12" fill="${dark(c, 0.2)}"/>`;
}

// ---------------------------------------------------------------- scenes
// 0 · hook: the sand at Carthage, a packed crowd, the iron gate lifting on the beast; she stands calm
function scene0() {
  return FAR(sky(HOT) + sun(820, 470, 46, 300) + rays(820, 470, { op: 0.08 }))
    + BACK(arenaStands(1160, { top: 520, seed: 3 }))
    + MID(arenaGate(870, 1170, 0.95, { lift: 0.8 }))
    + ground(1160, SAND, { rim: '#f6dcae' }) + `<ellipse cx="480" cy="1300" rx="300" ry="40" fill="#fff0c8" opacity=".25" filter="url(#blur14)"/>`
    + perpetua(450, 1310, 2.35, { mood: 'determined', armL: 10, armR: 10, halo: T.s0c })
    + motes(14, { y0: 700, y1: 1260, seed: 4, color: '#f6dcae' })
    + NEAR(`<rect x="-200" y="1570" width="${W + 400}" height="500" fill="#3a2418" opacity=".45" filter="url(#blur14)"/>`);
}

// 1 · a young noble mother of Carthage … then arrested with Felicity
function scene1() {
  const SW = T.s1b;
  const villa = FAR(sky(DAYSKY) + sun(860, 520, 44, 260))
    + BACK(clouds(470, { seed: 5, op: 0.8 }) + waves(1010, 6, 240, 7, '#5aa6c8', { foam: '#e8f6fa' }) + carthage(300, 1040, 0.85))
    + MID(column(60, 1250, 820) + column(1020, 1250, 820) + `<rect x="-200" y="1130" width="${W + 400}" height="20" fill="#efe4cc"/>`
      + Array.from({ length: 24 }, (_, i) => `<rect x="${-180 + i * 62}" y="1150" width="22" height="100" rx="8" fill="${i % 2 ? '#e2d4b8' : '#efe4cc'}"/>`).join(''))
    + ground(1250, '#d8c4a0', { rim: '#f2e2c0' })
    + pFather(290, 1310, 1.75, { mood: 'happy', armL: 10, armR: [30, 3, 2.6] })
    + perpetua(620, 1320, 2.2, { mood: 'joy', armL: [46, 2, 3], armR: [46, 2, 3.3], propR: babyBundle })
    + flowers(1300, 1360, 10, { seed: 5 }) + butterfliesSafe()
    + NEAR(foliage('r', 1640, { color: '#3a5a32', seed: 3 }));
  const arrest = FAR(sky([[0, '#4a3a4a'], [0.4, '#8a6a6a'], [1, '#d8a888']]))
    + BACK(carthage(540, 1070, 1.1, { wall: '#d8c8b4', roof: '#9a5a42', shade: 0.25 }))
    + MID(guard(110, 1240, 1.45, { mood: 'stern' }))
    + ground(1250, '#b8987a', { rim: '#d8b898' })
    + perpetua(430, 1320, 2.1, { mood: 'determined', armL: 12, armR: 12 })
    + felicity(700, 1310, 1.85, { pregnant: true, mood: 'worried', armL: 30, armR: 30 })
    + guard(940, 1320, 1.75, { flip: true })
    + NEAR(`<rect x="-200" y="1570" width="${W + 400}" height="500" fill="#2a1a1a" opacity=".45" filter="url(#blur14)"/>`);
  return swap(villa, arrest, SW);
}
const butterfliesSafe = () => '';

// 2 · prison: her father begs; she points to a water jar; "I am a Christian"
function scene2() {
  const P = T.s2b, Q = T.s2q, N = T.s2c, C = T.s2d;
  return FAR(sky([[0, '#1e1626'], [1, '#2e2434']]))
    + BACK(prisonVault({ winX: 470 }))
    + `<path d="M475 600 L615 600 L780 1300 L340 1300Z" fill="url(#beam)" opacity=".38" filter="url(#blur6)"/>`
    + ground(1240, '#2a2230', { rim: '#4a3c56' })
    + swap(pFather(260, 1320, 1.95, { mood: 'sad', talk: [0.1, P - 0.2], armL: 14, armR: [62, 5, 1.6] }),
      pFather(260, 1320, 1.95, { mood: 'worried', talk: [N, N + 0.9], armL: 14, armR: 20 }), N - 0.3)
    + waterJar(545, 1310, 1.15)
    + `<g${fadeOut(P - 0.3, 0.3)}>${perpetua(820, 1320, 2.15, { flip: true, mood: 'sad', armL: 12, armR: 12 })}</g>`
    + `<g${fadeIn(P - 0.3, 0.3)}><g${fadeOut(C, 0.4)}>${perpetua(820, 1320, 2.15, { flip: true, mood: 'happy', talk: [Q, N - 0.2], armL: 12, armR: [42, 2, 2] })}</g></g>`
    + `<g${fadeIn(C, 0.4)}>${perpetua(820, 1320, 2.15, { flip: true, mood: 'determined', talk: [C + 0.1, C + 4], armL: 12, armR: [30, 2, 3] })}</g>`
    + motes(10, { x0: 380, x1: 760, y0: 640, y1: 1200, seed: 6, color: '#dfe6ff' });
}

// 3 · the trial: father holds up her baby (human beat), the judge demands a sacrifice, she refuses
function scene3() {
  const F = T.s3f, H = T.s3b, J = T.s3c, JQ = T.s3j, A = T.s3d, PQ = T.s3p;
  return FAR(sky([[0, '#3a2430'], [0.5, '#8a5a4a'], [1, '#c89a7a']]) + glow(540, 700, 380, 0.4))
    + BACK(followers(1010, 13, { color: '#5a3a3e' }) + colonnade(1080, { c: '#e2d2b4', n: 6, h: 600 }))
    + MID(tribunal(310, 1150, 0.85) + judge(310, 955, 1.45, { talk: [JQ, A - 0.3], armL: 10, armR: [J > 0 ? 70 : 10, 4, 1.4] }))
    + ground(1150, '#b89a7a', { rim: '#d8bc98' })
    + pFather(560, 1330, 1.6, { kneel: true, mood: 'sad', talk: [F, H - 0.3], armL: [30, 3, 1.8], armR: [78, 4, 2], propR: babyBundle })
    + swap(perpetua(860, 1330, 2.1, { flip: true, mood: 'sad', armL: 12, armR: 12 }),
      perpetua(860, 1330, 2.1, { flip: true, mood: 'determined', talk: [PQ, PQ + 2.4], armL: 12, armR: [28, 2, 3] }), J)
    + NEAR(`<rect x="-200" y="1570" width="${W + 400}" height="500" fill="#2a1a1a" opacity=".45" filter="url(#blur14)"/>`);
}

// 4 · the arena: she walks in singing a psalm; the wild cow charges (hidden in dust); she stands, fixes her hair, helps Felicity up
function scene4() {
  const C = T.s4b, D = T.s4c, HELP = D + 2.9;
  const walk = M.tw([{ at: 0, dur: 2.2, from: { x: -260 }, to: { x: 0 }, ease: 'power2.out' }]);
  const charge = M.tw([{ at: C, dur: 1.35, from: { x: 700 }, to: { x: 0 }, ease: 'power1.in' }]);
  const leave = M.tw([{ at: C + 1.9, dur: 2.2, from: { x: 0 }, to: { x: -640 }, ease: 'power1.in' }]);
  return FAR(sky(HOT) + sun(240, 480, 42, 280))
    + BACK(arenaStands(1150, { top: 500, seed: 7 }))
    + MID(`<g${fadeIn(C - 0.05, 0.1)}><g${fadeOut(C + 2.6, 1.2)}><g${leave}><g${charge}>${wildCow(560, 1200, 1.25, { flip: true })}</g></g></g></g>`)
    + ground(1150, SAND, { rim: '#f6dcae' }) + `<path d="M120 1290 q30 -8 60 0 M640 1340 q30 -8 60 0 M860 1250 q24 -6 48 0" stroke="#c8a070" stroke-width="5" fill="none" opacity=".6"/>`
    + `<g${fadeOut(C + 1.4, 0.2)}><g${walk}>${felicity(250, 1260, 1.6, { mood: 'happy', armL: 14, armR: 14 })}${perpetua(470, 1310, 2.2, { mood: 'happy', talk: [0.4, C - 0.2], armL: [20, 2, 2.6], armR: [24, 2, 3] })}`
      + `${notes(5, { x0: 520, x1: 760, y0: 640, y1: 900, seed: 4 })}</g></g>`
    + `<g${fadeIn(C + 1.6, 0.3)}><g${fadeOut(HELP, 0.45)}>`
      + felicity(780, 1300, 1.7, { kneel: true, mood: 'worried', armL: 20, armR: 30 }) + perpetua(430, 1310, 2.2, { mood: 'determined', armL: 22, armR: [177, 2, 0.9] }) + sparkles(5, 470, 540, 560, 640, { seed: 3, size: 0.9 }) + '</g></g>'
    + `<g${fadeIn(HELP, 0.45)}>${felicity(760, 1300, 1.7, { flip: true, mood: 'happy', armL: 14, armR: [58, 3, 2] })}${perpetua(450, 1310, 2.2, { mood: 'happy', armL: 14, armR: [66, 3, 2.4] })}</g>`
    + dust(540, 1290, 1.35, { at: C + 1.05, hold: 1.5 })
    + motes(12, { y0: 700, y1: 1260, seed: 8, color: '#f6dcae' })
    + NEAR(`<rect x="-200" y="1570" width="${W + 400}" height="500" fill="#3a2418" opacity=".45" filter="url(#blur14)"/>`);
}

// 5 · last words to her brother; a young gladiator with a trembling, lowered sword; she reaches out to steady his hand (dolly)
function scene5() {
  const Q = T.s5q, G = T.s5b, B = T.s5c;
  const enter = M.tw([{ at: G + 0.2, dur: 1.4, from: { x: 300, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);   // single tween: from-state renders at once
  return FAR(sky(LATE) + glow(540, 760, 420, 0.5))
    + BACK(arenaStands(1150, { top: 500, seed: 11, dim: 0.18 }))
    + ground(1150, '#d8b080', { rim: '#f0cc98' })
    + brother(150, 1250, 1.45, { mood: 'worried', armL: 10, armR: [40, 3, 2] })
    + `<g${enter}>${roman(850, 1320, 2.0, { flip: true, skin: '#e2b48f', mood: 'worried', armL: 10, armR: [14, 3, 0.22], propR: gladiusDown })}</g>`
    + swap(perpetua(470, 1320, 2.2, { flip: true, mood: 'happy', talk: [Q, G - 0.3], armL: 12, armR: [52, 3, 2.2] }),
      perpetua(470, 1320, 2.2, { mood: 'peaceful', armL: 12, armR: [B > 0 ? 72 : 12, 2, 3] }), B - 0.2, 0.6)
    + motes(10, { y0: 700, y1: 1240, seed: 12, color: '#ffd8a0' })
    + NEAR(`<rect x="-200" y="1570" width="${W + 400}" height="500" fill="#2a1418" opacity=".5" filter="url(#blur14)"/>`);
}

// 6 · glory: arena ruins in golden light, the golden ladder of her vision, palm and prison diary (tilt-up + rack focus)
function scene6() {
  return FAR(sky(GOLDSKY) + rays(540, 600, { op: 0.13 }) + glow(540, 700, 540, 0.85))
    + BACK(clouds(760, { color: '#ffe8c8', op: 0.5, seed: 4, drift: 20 }) + goldLadder(540, 1180, 380) + ruins(1190))
    + beam(400, 680, 200, 880, 1300, 0.4)
    + MID(hill(1230, 10, '#c88a6a', 4))
    + ground(1250, '#c8946a', { rim: '#f2c49a' }) + flowers(1260, 1330, 12, { seed: 6, colors: ['#ffffff', '#f6d36b', '#2f7a84'] })
    + perpetua(540, 1310, 2.35, { mood: 'peaceful', halo: true, armL: [26, 2, 3], armR: [30, 2, 3.4], propL: palm_frond(1.05, -16), propR: scroll })
    + motes(18, { y0: 520, y1: 1240, seed: 8, color: '#fff2c4' })
    + NEAR(bokeh(7, { seed: 31 }));
}

// 7 · feast day with St. Felicity; patron of mothers (arc)
function scene7() {
  return FAR(sky(SKIES.dusk, { stars: 22, seed: 5 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 2 }) + waves(1060, 6, 240, 7, '#6a5a8a', { foam: '#c8b8e0' }) + carthage(540, 1110, 0.9, { wall: '#d8c0c8', roof: '#8a4a5a', shade: 0.22 }))
    + glow(540, 1050, 480, 0.8)
    + MID(hill(1230, 14, '#5a3a52', 6))
    + ground(1250, '#4a3046', { rim: '#c08a7a' }) + tufts(1256, 10, '#2e1e32', { seed: 2 })
    + felicity(300, 1320, 1.9, { mood: 'joy', halo: 0.4, armL: [24, 2, 3], armR: 14, propL: palm_frond(0.9, -16) })
    + mother(965, 1345, 1.3, { flip: true, mood: 'joy', armL: [46, 2, 3], armR: [46, 2, 3.3], propR: babyBundle })
    + perpetua(600, 1300, 2.35, { mood: 'happy', halo: 0.2, armL: 14, armR: [26, 2, 3.4], propR: palm_frond(1.05, 16) })
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#2f7a84', '#f6d36b'] })
    + motes(14, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(6, { seed: 12 }) + foliage('l', 1640, { color: '#2a1a34' }) + foliage('r', 1660, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_perpetua_arena', name: 'St_Perpetua_Thrown_to_the_Beasts',
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'Rome sent beasts to break her', thumb_title: 'St. Perpetua', thumb_shift: -20,
  wm_spots: [[56, 520, 'l'], [1024, 520, 'r'], [56, 1300, 'l']],
  // Character voices: nearest accent to each speaker (Kokoro has no Latin/North African voice: Italian for Roman Carthage)
  cast: {
    perpetua: { voice: 'if_sara', speed: 0.95 },
    father: { voice: 'im_nicola', speed: 0.9 },
    judge: { voice: { im_nicola: 0.55, am_onyx: 0.45 }, speed: 0.85 },
  },
  fix: {
    'pɚpˈɛɾuːə': 'pɚpˈɛtʃuːə',            // Perpetua -> per-PET-choo-uh
    'tˈuːhˈʌndɹɪd θɹˈiː': 'tˈuː ˈoʊ θɹˈiː',   // 203 -> two oh three
    'mˈɑːɹtʃ sˈɛvən': 'mˈɑːɹtʃ sˈɛvənθ',     // March 7 -> seventh
    'aɪɐm ɐ kɹˈɪstʃən': 'ˈaɪ ˈæm ɐ kɹˈɪstʃən',   // I am (not I'm)
  },
  scenes: [
    { kicker: 'CARTHAGE · 203', title: 'Thrown to the Beasts', art: scene0, cam: { move: 'push-fast', oy: 1000, ox: 470 },
      tone: { speed: 1.0, gap: 0.24, gain: 1 },
      say: ['Rome threw a young mother to the wild beasts, sure she would beg for mercy.', 'She never did.', 'This is Saint Perpetua.'] },
    { kicker: 'ROMAN AFRICA', title: 'A Young Mother', art: scene1, cam: 'pan-r',
      tone: { speed: 1.0, gap: 0.26 },
      say: ['She was twenty-two, from a noble family in Carthage, with a baby boy.', 'In 203, she was arrested for her faith, with a pregnant slave named Felicity.'] },
    { kicker: 'THE PRISON', title: 'A Water Jar', art: scene2, cam: 'drift-l',
      tone: { speed: 0.92, gap: 0.32, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['In prison, her father begged her to give it up.', 'She pointed to a water jar.', { text: 'Can this be called anything else?', who: 'perpetua' },
        'He said no.', { text: 'Then I can’t call myself anything but what I am: a Christian.', who: 'perpetua' }] },
    { kicker: 'THE TRIAL', title: 'Have Pity', art: scene3, cam: { move: 'push', amt: 0.07, ox: 760, oy: 1000 },
      tone: { speed: 0.95, gap: 0.26 },
      say: ['At her trial, her father held up her baby and cried:', { text: 'Have pity on your child!', who: 'father' }, 'It broke her heart to see him grieve.',
        'The judge ordered:', { text: 'Offer a sacrifice for the emperors.', who: 'judge' }, 'She answered:', { text: 'I will not. I am a Christian.', who: 'perpetua' }] },
    { kicker: 'THE ARENA', title: 'Still Standing', art: scene4, cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.24, gain: 1 },
      say: ['On the day of the games, she walked in calmly, singing a psalm.', 'A fierce wild cow charged and threw her to the ground.',
        'She got up, fixed her torn tunic and her hair, and helped Felicity stand.'] },
    { kicker: 'THE LAST MOMENT', title: 'Steady Hands', art: scene5, cam: { move: 'dolly', amt: 0.08, ox: 520, oy: 1000 },
      tone: { speed: 0.92, gap: 0.32, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['She told her brother:', { text: 'Stand fast in the faith, and love one another.', who: 'perpetua' }, 'Then a young gladiator came to end her life. His hand shook.',
        { text: 'So she guided his trembling hand herself.', beat: 0.9, speed: 0.85 }] },
    { kicker: 'MARTYR OF CARTHAGE', title: 'Her True Name', art: scene6, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['She died for Christ that day, and her prison diary still tells her story.', 'Rome took her life. It never took her name: Christian.'] },
    { kicker: 'FEAST DAY · MARCH 7', title: 'Patron of Mothers', art: scene7, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.95, gap: 0.28 },
      say: ['Her feast day, with Saint Felicity, is March 7.', 'She is a patron of mothers. Saint Perpetua, pray for us.'] },
  ],
};
