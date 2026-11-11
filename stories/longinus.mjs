// St. Longinus, the centurion at the Cross (whole life, as tradition tells it). Feast: October 16 (Roman Martyrology).
// Sources: John 19:34 and Mark 15:39 (USCCB); the name from the Gospel of Nicodemus; the healed eyes from the Golden Legend;
// the tomb guard and the refused silver from the Greek Synaxarion (Oct 16); the axe, the idols and the blinded governor
// Octavian, healed after the martyr's death, from Caxton's 1483 Golden Legend (Fordham sourcebook). Bernini's statue (1643)
// and the lance relic in St. Peter's (NC Register). The piercing is never shown: the lance is held at rest, and gold light
// (not blood) falls from the Cross. The beheading is told, not shown.
// New (exported for later reels): Longinus (armored centurion / preacher / old monk), the Holy Lance, Golgotha with three
// crosses, the empty tomb with its rolled stone, Cappadocia's rock chimneys, a stone idol (whole or broken), an axe,
// silver coins, a Roman governor in a toga, a marble statue in a basilica niche.
import { W, M, SKIES, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers, petals,
  butterflies, person, palm_frond, ground, dark, light, bokeh, crowd, FAR, BACK, MID, NEAR } from '../art.mjs';
import { roman, cloakBack, cloakFront, romanHelmet, BRONZE } from './martin_of_tours.mjs';
import { jerusalem } from './peter.mjs';
import { column } from './cecilia_wedding_angel.mjs';
import { cypress } from './nicholas.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const swap = (a, b, at, dur = 0.45) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;
const STORM = [[0, '#141224'], [0.4, '#33264a'], [0.68, '#7a3e56'], [1, '#b8624e']];
const CLEAR = [[0, '#2a2450'], [0.4, '#7a4e7a'], [0.66, '#e8946a'], [1, '#f8c88a']];
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const DAYC = [[0, '#3d7fb8'], [0.38, '#86c0e0'], [0.68, '#f2dcb4'], [1, '#f2dcb4']];
const HALL = [[0, '#2a1a26'], [0.45, '#5a3a40'], [1, '#8a5e4e']];

// Line starts (s from scene start), from `node build.mjs stories/longinus.mjs info`
const T = { s0c: 4.9, s2c: 6.08, s3b: 3.41, s3c: 5.73, s4b: 2.72, s5b: 1.61, s6b: 3.24, s6c: 6.3, s7c: 6.12, s7d: 10.75, s7f: 12.12 };

// ---------------------------------------------------------------- Longinus
export const SKL = '#dcaa84', HAIRL = '#3a2a1e', GREYL = '#cfc8be';
// Centurion in bronze armor and red cloak (helmet: false for the portrait)
export const longinus = (x, y, s, o = {}) => roman(x, y, s, { skin: SKL, hair: HAIRL, beard: HAIRL, ...o });
// After leaving the army: plain brown tunic, no armor
export const longinusPreacher = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#8a6444', skin: SKL, hair: HAIRL, beard: HAIRL, ...o });
// Old monk in Cappadocia: grey hair and beard, dark brown habit
export const longinusOld = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#5e4636', skin: SKL, hair: GREYL, beard: GREYL, ...o });

// ---------------------------------------------------------------- props
// The Holy Lance, held upright at rest: leaf-shaped iron blade, wooden shaft (hand at 0,0)
export const holyLance = (h = 230, { wood = '#7a5432', iron = '#c4ccd6', op = 1 } = {}) => `<g opacity="${op}"><rect x="-5" y="${-h}" width="10" height="${h + 90}" rx="4" fill="${wood}"/>`
  + `<rect x="0" y="${-h}" width="5" height="${h + 90}" fill="${dark(wood, 0.3)}" opacity=".6"/><rect x="-8" y="${-h - 6}" width="16" height="14" rx="3" fill="${dark(iron, 0.3)}"/>`
  + `<path d="M0 ${-h - 74} Q-17 ${-h - 30} -6 ${-h - 6} L6 ${-h - 6} Q17 ${-h - 30} 0 ${-h - 74}Z" fill="${iron}"/><path d="M0 ${-h - 74} Q17 ${-h - 30} 6 ${-h - 6} L1 ${-h - 6}Z" fill="${dark(iron, 0.3)}"/></g>`;
// Lance lying on the ground (centre at 0,0)
export const lanceDown = (len = 360) => `<g transform="rotate(-90)">${holyLance(len - 160)}</g>`;
export const axe = `<g><rect x="-5" y="-150" width="10" height="200" rx="4" fill="#7a5432"/><rect x="0" y="-150" width="5" height="200" fill="#5a3a22" opacity=".6"/>`
  + '<path d="M4 -148 Q52 -170 60 -116 Q52 -82 4 -98Z" fill="#c4ccd6"/><path d="M30 -150 Q58 -150 60 -116 Q56 -90 30 -94Z" fill="#8a96a6"/></g>';
export const coin = (x, y, r = 13, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot})"><ellipse rx="${r}" ry="${r * 0.42}" fill="#8e98a6"/><ellipse cy="-2" rx="${r}" ry="${r * 0.42}" fill="#dfe4ea"/><ellipse cx="-3" cy="-3" rx="${r * 0.5}" ry="${r * 0.18}" fill="#ffffff" opacity=".7"/></g>`;
export const coinBag = `<g><path d="M-30 0 Q-40 -46 -12 -60 L12 -60 Q40 -46 30 0Z" fill="#a88a5a"/><path d="M8 -60 Q40 -46 30 0 L12 0 Q24 -40 2 -58Z" fill="#7a5e3a" opacity=".7"/>`
  + '<path d="M-14 -60 Q0 -70 14 -60" stroke="#5a3e24" stroke-width="5" fill="none"/></g>';
// Martin's helmet as a separate object (resting on a rock)
export const helmetDown = (x, y, s = 1) => `<g transform="translate(${x},${y + 250 * s}) scale(${s})">${romanHelmet}</g>`;

// ---------------------------------------------------------------- people
// Roman governor: white toga with a purple band, grey hair, clean-shaven
const togaG = '<path d="M-38 -206 Q-4 -160 40 -120 L46 -96 Q0 -136 -42 -184Z" fill="#efe6d2"/><path d="M-38 -206 Q-4 -160 40 -120" stroke="#6a2a6e" stroke-width="7" fill="none"/>';
export const governor = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#e6dcc6', skin: '#e2b48f', hair: '#bfb8ae', beard: null, mood: 'stern', ...o, over: togaG + (o.over || '') });
const soldier = (x, y, s, i, o = {}) => roman(x, y, s, { skin: ['#d9a47e', '#c48a5f', '#e2b48f'][i % 3], hair: '#2a1e16', mood: 'stern', armR: 22, propR: holyLance(170), ...o });
const folk = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', girl: i % 2 === 1, robe: true, top: ['#7a5a8a', '#4a7a6a', '#a06a4a', '#5a6a9a'][i % 4],
  skin: ['#d9a47e', '#c48a5f', '#e0b08a', '#b97c52'][i % 4], hair: ['#2a1e16', '#4a3424', '#1a120c', '#5a3e2a'][i % 4], beard: i % 2 ? null : '#3a2a1e', ...o });

// ---------------------------------------------------------------- set pieces
// A wooden cross; fig: a dark silhouette of Christ with a gold halo (seen from afar)
export function crossOf(x, y, s = 1, { c = '#3a2630', fig = true, halo = true } = {}) {
  const f2 = fig ? `<g fill="${dark(c, 0.35)}"><circle cy="-472" r="22"/><path d="M-16 -452 Q0 -458 16 -452 L12 -330 Q0 -322 -12 -330Z"/><path d="M-118 -442 Q-60 -438 -14 -448 L-14 -436 Q-60 -430 -118 -432Z M118 -442 Q60 -438 14 -448 L14 -436 Q60 -430 118 -432Z"/>`
    + '<path d="M-12 -332 L-6 -250 L6 -250 L12 -332Z"/></g>' : '';
  const h2 = halo ? `<circle cy="-472" r="60" fill="url(#haloGlow)"/><circle cy="-472" r="32" fill="none" stroke="${GOLD}" stroke-width="5"/>` : '';
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-14" y="-560" width="28" height="560" fill="${c}"/><rect x="2" y="-560" width="12" height="560" fill="${dark(c, 0.3)}" opacity=".6"/>`
    + `<rect x="-130" y="-452" width="260" height="26" fill="${c}"/><rect x="-130" y="-434" width="260" height="8" fill="${dark(c, 0.3)}" opacity=".6"/>${h2}${f2}</g>`;
}
// Golgotha: a bare rocky mound with the three crosses (centre one with the halo)
export function golgotha(base, { c = '#4a3040', s = 0.6, cx = 540, top = 260, glowOp = 0.7 } = {}) {
  return `<path d="M-200 ${base} Q${cx - 340} ${base - top * 0.4} ${cx - 120} ${base - top} Q${cx} ${base - top - 20} ${cx + 120} ${base - top} Q${cx + 340} ${base - top * 0.4} ${W + 200} ${base} V${base + 400} H-200Z" fill="${c}"/>`
    + glow(cx, base - top - 280 * s, 420 * s, glowOp)
    + crossOf(cx - 230 * s, base - top + 30, s * 0.78, { c: dark(c, 0.2), fig: false, halo: false })
    + crossOf(cx + 230 * s, base - top + 30, s * 0.78, { c: dark(c, 0.2), fig: false, halo: false })
    + crossOf(cx, base - top - 10, s, { c: dark(c, 0.2) });
}
const lightning = (x, y, s = 1, ph = 0) => `<g transform="translate(${x},${y}) scale(${s})"${M.flick(3.4, ph, 0)}><path d="M0 0 L-30 120 L-6 116 L-36 250 L40 90 L12 96 L36 0Z" fill="#fff4dc" opacity=".8"/><circle cy="110" r="160" fill="url(#sunGlow)" opacity=".35"/></g>`;
// Rock tomb with a round doorway, the rolling stone moved aside, light inside
export function emptyTomb(x, y, s = 1, { rock = '#a88a72' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-300 0 Q-300 -330 -60 -380 Q240 -400 320 -160 L330 0Z" fill="${rock}"/><path d="M80 -392 Q260 -360 320 -160 L330 0 L160 0Z" fill="${dark(rock, 0.22)}" opacity=".6"/>`
    + `<path d="M-200 -260 Q-120 -330 0 -340" stroke="${light(rock, 0.25)}" stroke-width="10" fill="none" opacity=".6" stroke-linecap="round"/>`
    + `<circle cx="-40" cy="-110" r="104" fill="${dark(rock, 0.55)}"/><circle cx="-40" cy="-110" r="80" fill="url(#sunGlow)"${M.pulse(0.06, 2.8, 0, -40, -110)}/>`
    + `<rect x="-160" y="-110" width="240" height="110" fill="${rock}"/><path d="M-160 -110 H80" stroke="${dark(rock, 0.2)}" stroke-width="6"/>`
    + `<g transform="translate(190,-120)"><circle r="120" fill="${light(rock, 0.06)}"/><circle r="120" fill="none" stroke="${dark(rock, 0.25)}" stroke-width="10"/><circle r="70" fill="none" stroke="${dark(rock, 0.15)}" stroke-width="5"/>`
    + `<path d="M40 -112 A120 120 0 0 1 40 112 Q90 0 40 -112Z" fill="${dark(rock, 0.25)}" opacity=".6"/></g></g>`;
}
// Cappadocia's rock chimneys: soft cones with dark caps and cave doors
export function chimneys(base, { c = '#e2c49a', s = 1, seed = 1, list = null } = {}) {
  const L = list || [[-40, 1.0], [150, 1.4], [330, 0.9], [560, 1.25], [760, 1.0], [960, 1.5], [1120, 0.9]];
  return L.map(([x, k], i) => {
    const h = 300 * k * s, w = 80 * k * s, col = i % 2 ? c : light(c, 0.08), cap = dark(c, 0.45);
    const doors = [[-0.25, 0.55], [0.18, 0.35], [0.05, 0.75]].slice(0, 1 + ((i + seed) % 3)).map(([dx, dy]) => `<path d="M${dx * w * 2 - 9} ${-h * dy + 24} v-16 a9 9 0 0 1 18 0 v16Z" fill="${dark(c, 0.5)}"/>`).join('');
    return `<g transform="translate(${x},${base})"><path d="M${-w} 0 Q${-w * 0.6} ${-h * 0.6} ${-w * 0.22} ${-h} L${w * 0.22} ${-h} Q${w * 0.6} ${-h * 0.6} ${w} 0Z" fill="${col}"/>`
      + `<path d="M${w * 0.1} ${-h} L${w * 0.22} ${-h} Q${w * 0.6} ${-h * 0.6} ${w} 0 L${w * 0.4} 0 Q${w * 0.3} ${-h * 0.6} ${w * 0.1} ${-h}Z" fill="${dark(col, 0.18)}" opacity=".6"/>`
      + `<ellipse cy="${-h - 6}" rx="${w * 0.42}" ry="${w * 0.2}" fill="${cap}"/>${doors}</g>`;
  }).join('');
}
// A stone idol on a pedestal; broken: only the feet stay up, the pieces lie around
export function idol(x, y, s = 1, { stone = '#b8b0a4', broken = false, at = 0 } = {}) {
  const st = dark(stone, 0.2), ped = `<rect x="-70" y="-120" width="140" height="120" fill="${stone}"/><rect x="20" y="-120" width="50" height="120" fill="${st}" opacity=".6"/><rect x="-82" y="-136" width="164" height="20" fill="${light(stone, 0.1)}"/>`;
  const fig = `<rect x="-24" y="-200" width="48" height="66" rx="8" fill="${stone}"/><path d="M-40 -340 Q0 -350 40 -340 L32 -196 L-32 -196Z" fill="${stone}"/><path d="M14 -344 L40 -340 L32 -196 L14 -196Z" fill="${st}" opacity=".6"/>`
    + `<circle cy="-382" r="38" fill="${stone}"/><path d="M0 -420 A38 38 0 0 1 0 -344 A24 38 0 0 0 0 -420Z" fill="${st}" opacity=".5"/><path d="M-30 -404 Q0 -428 30 -404" stroke="${st}" stroke-width="8" fill="none"/>`
    + `<path d="M-40 -336 L-74 -250 L-58 -244 L-30 -310Z M40 -336 L70 -420 L84 -414 L54 -326Z" fill="${stone}"/>`;
  if (!broken) return `<g transform="translate(${x},${y}) scale(${s})">${ped}<g transform="translate(0,-136)">${fig}</g></g>`;
  const piece = (px, py, r, svg, d) => `<g${M.in('drop', at + d, 0.5)}><g transform="translate(${px},${py}) rotate(${r})">${svg}</g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${ped}<rect x="-24" y="-196" width="48" height="60" rx="8" fill="${stone}"/><path d="M-24 -196 L-8 -186 L6 -198 L24 -188" stroke="${st}" stroke-width="4" fill="none"/>`
    + piece(-150, -20, -30, `<circle r="38" fill="${stone}"/><path d="M-30 -22 Q0 -46 30 -22" stroke="${st}" stroke-width="8" fill="none"/>`, 0)
    + piece(150, -30, 74, `<path d="M-40 -70 Q0 -80 40 -70 L32 70 L-32 70Z" fill="${stone}"/><path d="M14 -74 L40 -70 L32 70 L14 70Z" fill="${st}" opacity=".6"/>`, 0.1)
    + piece(-230, -8, 20, `<rect x="-36" y="-12" width="72" height="22" rx="6" fill="${st}"/>`, 0.18)
    + piece(250, -6, -12, `<path d="M-20 0 L-6 -24 L18 -14 L22 6Z" fill="${st}"/>`, 0.24) + '</g>';
}
// Roman hall: columns, back wall
function hall(base) {
  return `<rect x="-200" y="380" width="${W + 400}" height="${base - 380}" fill="#6a4a46"/><rect x="-200" y="${base - 120}" width="${W + 400}" height="120" fill="#5a3c3a"/>`
    + [-40, 260, 820, 1120].map((cx) => column(cx, base, 820, { c: '#d8c4a8' })).join('')
    + `<rect x="-200" y="${base - 900}" width="${W + 400}" height="44" fill="#d8c4a8"/>`;
}
// Basilica niche with a marble statue of Longinus (lance in hand, arms open, looking up)
const MARBLE = '#efe8dc', MARS = '#d8cfc0';
export function statueNiche(x, y, s = 1) {
  const statue = person(0, -150, 1.75, { kind: 'layman', robe: true, top: MARBLE, skin: '#f4eee4', hair: MARS, beard: MARS, mood: 'happy',
    armL: [128, 0], armR: 26, propR: holyLance(230, { wood: '#e2dacb', iron: '#d4ccbe' }), under: `<path d="M-40 -212 Q-110 -150 -120 -20 L120 -40 Q96 -150 40 -212Z" fill="${MARS}"/>` });
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-260 0 V-760 a260 260 0 0 1 520 0 V0Z" fill="#c8b490"/><path d="M-210 -30 V-740 a210 210 0 0 1 420 0 V-30Z" fill="#4a3428"/>`
    + `<path d="M-210 -30 V-740 a210 210 0 0 1 420 0 V-30Z" fill="url(#sunGlow)" opacity=".35"/><rect x="-150" y="-150" width="300" height="120" fill="#e2d6c0"/><rect x="50" y="-150" width="100" height="120" fill="#c8b89e"/>`
    + `<rect x="-170" y="-166" width="340" height="20" fill="#f0e6d2"/>${statue}<rect x="-300" y="-30" width="600" height="30" fill="#b8a07a"/></g>`;
}

// ================================================================= scenes
// 0 · hook: the soldier with the spear on Golgotha (lance at rest); halo fades in on "made him a saint"
function scene0() {
  // sky, Jerusalem, Golgotha and the three crosses are 3D (bg3d 'golStorm': push-fast toward the hill)
  return FAR(lightning(1010, 420, 0.75, 0.2) + lightning(150, 470, 0.7, 1.8))
    + MID(tufts(1250, 8, '#3a2434', { seed: 3 }))
    + ground(1250, '#3e2836', { rim: '#a0606a' })
    + `<ellipse cx="380" cy="1300" rx="260" ry="34" fill="#ffcf8a" opacity=".2" filter="url(#blur14)"/>`
    + longinus(380, 1310, 2.3, { mood: 'determined', armL: 10, armR: 24, propR: holyLance(220), halo: T.s0c })
    + motes(14, { y0: 520, y1: 1240, seed: 4, color: '#ffd8a0' })
    + NEAR(foliage('l', 1650, { color: '#1e1420' }) + foliage('r', 1660, { color: '#1e1420', seed: 5 }));
}

// 1 · a centurion under Pilate; his eyes were failing
function scene1() {
  return FAR(sky([[0, '#4a4a6e'], [0.45, '#8a7a90'], [0.72, '#d8b08a'], [1, '#e8c89a']]) + glow(300, 600, 300, 0.35))
    + BACK(clouds(470, { color: '#6a6080', op: 0.65, drift: 60, seed: 8 }) + jerusalem(540, 1110, 0.95, { wall: '#d8c0a0' }) + hill(1150, 16, '#8a6a5a', 4))
    + MID(soldier(150, 1230, 1.25, 0, { flip: true }) + soldier(930, 1230, 1.25, 1))
    + ground(1230, '#a07a62', { rim: '#d8b090' }) + tufts(1236, 10, '#7a5a4a', { seed: 6 })
    + longinus(540, 1320, 2.25, { mood: 'worried', armL: [14, 2, 3], armR: 24, propR: holyLance(220) })
    + motes(10, { y0: 560, y1: 1200, seed: 9, color: '#f0dcc0' })
    + NEAR(foliage('r', 1650, { color: '#2e2a24', seed: 3 }));
}

// 2 · the Cross; blood and water (told, not shown): a gold drop of light falls toward his eyes
function scene2() {
  const drop = `<g${M.tw([{ at: T.s2c - 0.2, dur: 0.4, from: { opacity: 0 }, to: { opacity: 1 } }, { at: T.s2c - 0.2, dur: 1.8, from: { x: 0, y: 0 }, to: { x: -270, y: 240 }, ease: 'power1.in' }, { at: T.s2c + 1.6, dur: 0.5, from: { opacity: 1 }, to: { opacity: 0 } }])}>`
    + `<g transform="translate(650,520)">${glow(0, 0, 80, 0.9)}<circle r="9" fill="#fff4d0"/></g></g>`;
  const flash = `<g${M.tw([{ at: T.s2c + 1.4, dur: 0.4, from: { opacity: 0 }, to: { opacity: 1 } }, { at: T.s2c + 1.8, dur: 1.2, from: { opacity: 1 }, to: { opacity: 0.4 } }])}>${glow(380, 770, 200, 1)}</g>`;
  return FAR(sky(STORM, { stars: 8, seed: 6 }) + lightning(180, 420, 0.8, 0.9))
    + BACK(clouds(420, { color: '#5a4060', op: 0.55, drift: 40, seed: 9 }))
    + MID(golgotha(1200, { c: '#4a2e40', s: 1.05, cx: 650, top: 140, glowOp: 0.8 }))
    + ground(1260, '#3e2836', { rim: '#a0606a' })
    + longinus(380, 1320, 2.2, { mood: 'worried', armL: 10, armR: 30, propR: holyLance(220) })
    + drop + flash
    + motes(12, { x0: 300, x1: 760, y0: 560, y1: 1240, seed: 2, color: '#fff2c4', rise: 90 })
    + NEAR(foliage('l', 1660, { color: '#1e1420', seed: 7 }));
}

// 3 · the miracle: he can see; on his knees, "Truly this man was the Son of God!" (dolly: the Cross looms)
function scene3() {
  // background is 3D (bg3d 'golDawn': a real dolly zoom, the Cross looms behind him)
  return ground(1270, '#4a3040', { rim: '#d08a7a' }) + tufts(1276, 10, '#3a2434', { seed: 8 })
    + `<g transform="translate(830,1330)">${lanceDown(380)}</g>` + helmetDown(250, 1330, 0.9)
    + `<ellipse cx="540" cy="1310" rx="280" ry="36" fill="#ffd89a" opacity=".3" filter="url(#blur14)"/>`
    + longinus(540, 1320, 2.2, { kneel: true, helmet: false, mood: 'surprised', armL: [140, 3, 3], armR: [140, 3, 3.3], talk: [T.s3c, T.s3c + 2.4] })
    + sparkles(14, 300, 780, 560, 1100, { seed: 3 })
    + motes(14, { y0: 560, y1: 1240, seed: 5 })
    + NEAR(bokeh(7, { seed: 23 }));
}

// 4 · guarding the tomb; the silver he gave back (no other figures: the bag and coins drop at his feet)
function scene4() {
  const coins = `<g${M.in('drop', T.s4b + 1.2, 0.6)}><g transform="translate(330,1300) scale(1.6)">${coinBag}</g></g>`
    + [[240, 1322, 0], [290, 1344, 20], [400, 1330, -10], [450, 1350, 30], [190, 1352, -20], [500, 1318, 10], [350, 1356, 5]].map(([cx, cy, r], i) => `<g${M.in('drop', T.s4b + 1.4 + i * 0.07, 0.4)}>${coin(cx, cy, 22, r)}</g>`).join('');
  return FAR(sky([[0, '#b8603e'], [0.3, '#f09a62'], [0.55, '#f8d39a'], [0.75, '#bfe0ec'], [1, '#bfe0ec']]) + sun(860, 620, 56, 300))
    + BACK(clouds(440, { color: '#fff2e0', op: 0.7, seed: 5 }) + hill(1080, 40, '#b8a090', 3) + cypress(120, 1130, 1.1) + cypress(220, 1150, 0.8))
    + MID(emptyTomb(400, 1240, 1.1) + flowers(1240, 1290, 10, { seed: 6 }))
    + ground(1240, '#b89a72', { rim: '#ecd2a4' }) + tufts(1246, 12, '#8a7a4a', { seed: 4 })
    + coins
    + longinus(760, 1320, 2.2, { mood: 'determined', armL: [8], armR: [24], propR: holyLance(220), flip: true })
    + NEAR(foliage('r', 1640, { color: '#3a4a2e', seed: 3 }));
}

// 5 · leaving the army, preaching in Cappadocia (armor and helmet left on a rock)
function scene5() {
  // background is 3D (bg3d 'cappadocia': the camera trucks left past the rock chimneys)
  return ground(1230, '#c49a6e', { rim: '#ecc898' }) + tufts(1236, 10, '#9a7a4a', { seed: 2 })
    + `<g${M.in('fade', 0.2, 0.6)}><path d="M260 1310 Q270 1260 340 1256 Q410 1260 420 1310Z" fill="#a8845e"/>${helmetDown(340, 1262, 0.75)}<g transform="translate(380,1316)">${lanceDown(300)}</g></g>`
    + folk(130, 1300, 1.35, 1, { flip: true, mood: 'happy', armL: 14, armR: 14 }) + folk(900, 1300, 1.35, 0, { mood: 'happy', armL: 12, armR: [30, 4, 2.6] })
    + `<g${M.in('rise', 0, 0.9)}>${longinusPreacher(560, 1320, 2.15, { mood: 'happy', talk: [T.s5b, 99], armL: [74, 10, 1.8], armR: 14 })}</g>`
    + butterflies(2, { y0: 900, y1: 1100, seed: 4 })
    + NEAR(foliage('l', 1650, { color: '#4a3a24', seed: 2 }));
}

// 6 · an old man now; ordered to worship idols; he smashes them (old: sad on the first line, then determined)
function scene6() {
  const old = (mood) => longinusOld(500, 1320, 2.15, { mood, armL: [10, 2, 3], armR: 24, propR: axe });
  return FAR(sky(HALL))
    + BACK(hall(1240))
    + MID(swap(idol(870, 1240, 1.15), idol(870, 1240, 1.15, { broken: true, at: T.s6c + 1.3 }), T.s6c + 1.3, 0.3)
      + `<g${M.tw([{ at: T.s6c + 1.2, dur: 0.4, from: { opacity: 0 }, to: { opacity: 1 } }, { at: T.s6c + 1.6, dur: 1.5, from: { opacity: 1 }, to: { opacity: 0 } }])}>${glow(870, 1060, 260, 0.6)}</g>`)
    + ground(1240, '#4a3432', { rim: '#8a6a5a' })
    + governor(200, 1300, 1.6, { mood: 'stern', armL: 10, armR: [70, 3, 2] })
    + swap(old('sad'), old('determined'), T.s6b, 0.45)
    + motes(8, { y0: 600, y1: 1200, seed: 3, color: '#f0c890' })
    + NEAR(foliage('l', 1660, { color: '#1e1418', seed: 9 }));
}

// 7 · the governor goes blind (eyes shut), the martyr's death is told, "I have sinned!", his sight returns
function scene7() {
  const gov = (mood, talk) => governor(260, 1310, 1.55, { kneel: true, flip: true, mood, armL: [60, 3, 2.4], armR: [60, 3, 2.7], talk });
  return FAR(sky(GOLDSKY) + rays(600, 520, { op: 0.13 }) + glow(600, 600, 460, 0.7))
    + BACK(clouds(760, { color: '#ffe2b8', op: 0.5, seed: 13, drift: 30 }) + chimneys(1180, { c: '#e2b892', s: 0.75, seed: 4, list: [[60, 1.1], [240, 0.8], [880, 1.3], [1060, 0.9]] }))
    + ground(1240, '#b0805e', { rim: '#f2c890' })
    + `<g${fadeIn(T.s7c, 1.2)}>${beam(530, 690, 400, 820, 1300, 0.55)}</g>`
    + swap(longinusOld(650, 1310, 2.15, { mood: 'happy', armL: [40, 3, 2.6], armR: [10, 2, 3] }),
      longinusOld(650, 1310, 2.15, { mood: 'peaceful', halo: true, armL: [26, 2, 3], armR: 20, propL: palm_frond(1.1, -16) }), T.s7c, 1.2)
    + swap(gov('peaceful', [T.s7d, T.s7d + 1.4]), gov('joy', false), T.s7f, 0.5)
    + `<g${fadeIn(T.s7f, 0.6)}>${sparkles(10, 160, 360, 900, 1100, { seed: 7 })}</g>`
    + petals(16, { seed: 4, colors: ['#ffe2a0', '#ffffff'] })
    + NEAR(bokeh(6, { seed: 31 }));
}

// 8 · St. Peter's today: his marble statue with the lance (pull reveals the pilgrims)
function scene8() {
  return FAR(sky(HALL) + glow(540, 700, 520, 0.6))
    + BACK(`<rect x="-200" y="380" width="${W + 400}" height="900" fill="#8a6a50"/>` + column(40, 1260, 860, { c: '#e6d6b8' }) + column(1040, 1260, 860, { c: '#e6d6b8' })
      + `<rect x="-200" y="356" width="${W + 400}" height="40" fill="#e6d6b8"/>`)
    + MID(statueNiche(540, 1260, 1) + `<ellipse cx="540" cy="760" rx="220" ry="300" fill="url(#sunGlow)" opacity=".25"/>`)
    + ground(1260, '#6a4a3a', { rim: '#c8a070' })
    + crowd(1400, 12, { color: '#2e2026', flags: [['#f6d24a', '#ffffff', '#f6d24a']] })
    + motes(14, { y0: 500, y1: 1200, seed: 12 })
    + NEAR(bokeh(7, { seed: 41 }));
}

// 9 · feast day portrait: centurion saint with palm and lance, Golgotha's cross glowing behind
function scene9() {
  // background is 3D (bg3d 'golDusk': arc-r around the portrait)
  return ground(1250, '#4a3048', { rim: '#c07a7a' }) + tufts(1256, 10, '#3a2438', { seed: 3 })
    + glow(540, 1150, 480, 0.6)
    + longinus(540, 1300, 2.4, { helmet: false, mood: 'happy', halo: true, armL: [24, 2, 3], armR: [22, 2, 3.4], propL: palm_frond(1.1, -18), propR: holyLance(210) })
    + motes(16, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(bokeh(7, { seed: 17 }));
}

export const STORY = {
  slug: 'st_longinus', name: 'St_Longinus',
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  // three.js backgrounds (user's request) for the hook, the miracle, Cappadocia and the feast-day portrait
  bg3d: './longinus.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  thumb_hook: 'The spear that opened his eyes', thumb_title: 'St. Longinus', thumb_shift: -20, thumb_t: 6,
  wm_spots: [[56, 560, 'l'], [1024, 900, 'r'], [1024, 1300, 'r']],
  // Character voices: a Latin-speaking Roman soldier and a Roman governor -> Italian accents
  cast: {
    longinus: { voice: 'im_nicola', speed: 0.92 },
    governor: { voice: { im_nicola: 0.55, am_onyx: 0.45 }, speed: 0.85 },
  },
  fix: {
    'lˈɔŋɡɪnəs': 'lɑːndʒˈaɪnəs',             // Longinus -> lon-JY-nus
    'pˈɔntɪəs pˈɪleɪt': 'pˈɑːnʃəs pˈaɪlət',  // Pontius Pilate
    'sɛntʃˈʊɹɹiən': 'sɛntʃˈʊɹiən',           // centurion
    'ɑːktˈoʊbɚ sˈɪkstiːn': 'ɑːktˈoʊbɚ sˈɪkstiːnθ',   // October 16 -> sixteenth
  },
  scenes: [
    { kicker: 'GOLGOTHA · GOOD FRIDAY', title: 'The Spear at the Cross', art: scene0, bg3d: 'golStorm', cam: { move: 'push-fast', oy: 1000, ox: 420 },
      tone: { speed: 1.0, gap: 0.24, gain: 1 },
      say: ['He was the Roman soldier who drove a spear into the side of Jesus.', 'Yet that spear made him a saint.', 'This is Saint Longinus.'] },
    { kicker: 'JERUSALEM · AD 30s', title: 'A Roman Centurion', art: scene1, cam: 'pan-r',
      tone: { speed: 1.0, gap: 0.26 },
      say: ['Tradition names him Longinus, a centurion under Pontius Pilate.', 'The old stories say his eyes were failing.'] },
    { kicker: 'THE CROSS', title: 'Blood and Water', art: scene2, cam: { move: 'push', amt: 0.07, ox: 420, oy: 900 },
      tone: { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['When Jesus died, he pierced His side with a lance,', 'and at once, blood and water flowed out.', 'Tradition says a drop touched his eyes.'] },
    { kicker: 'THE MIRACLE', title: 'His Eyes Opened', art: scene3, bg3d: 'golDawn', cam: { move: 'dolly', amt: 0.08, ox: 540, oy: 1000 },
      tone: { speed: 0.95, gap: 0.3 },
      say: [{ text: 'Suddenly, he could see clearly.', beat: 0.9, speed: 0.85 }, 'He fell to his knees and cried out:', { text: 'Truly this man was the Son of God!', who: 'longinus' }] },
    { kicker: 'THE TOMB · EASTER', title: 'He Gave Back the Silver', art: scene4, cam: 'drift-l',
      tone: { speed: 1.0, gap: 0.26 },
      say: ['Tradition says he then guarded the tomb.', 'When Jesus rose, the chief priests offered him silver to say the body was stolen.', 'He gave the money back.'] },
    { kicker: 'CAPPADOCIA', title: 'From Soldier to Preacher', art: scene5, bg3d: 'cappadocia', cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.24, gain: 1 },
      say: ['So he left the army,', 'and went home to Cappadocia, to preach the Christ he had seen die.'] },
    { kicker: 'CAESAREA · CAPPADOCIA', title: 'The Idols Fall', art: scene6, cam: { move: 'push', amt: 0.07, ox: 600, oy: 1000 },
      tone: { speed: 0.95, gap: 0.28 },
      say: ['Many years later, the old man was arrested.', 'The governor ordered him to worship the idols.', 'Instead, he took an axe and smashed them.'] },
    { kicker: 'THE MARTYR', title: 'Healed by a Martyr', art: scene7, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.92, gap: 0.32, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['Then the governor went blind.', 'Longinus promised to pray for him after his own death.', 'So the governor had him beheaded,', 'then knelt by his body and cried:',
        { text: 'I have sinned!', who: 'governor' }, 'And his sight came back.'] },
    { kicker: 'ST. PETER’S · ROME', title: 'The Lance in Rome', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 900 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Today, his giant marble statue stands in Saint Peter’s, lance in hand.', 'He pierced the side of Christ, but Christ won his heart.'] },
    { kicker: 'FEAST DAY · OCTOBER 16', title: 'Patron of the Blind', art: scene9, bg3d: 'golDusk', cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.95, gap: 0.28 },
      say: ['His feast day is October 16.', 'He is a patron of soldiers and the blind. Saint Longinus, pray for us.'] },
  ],
};
