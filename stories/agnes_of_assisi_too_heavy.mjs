// St. Agnes of Assisi: "too heavy to lift" (one-story reel; feast: November 19 in the Franciscan calendar, Nov 16 in the
// Roman Martyrology). Facts (sources: Thomas of Celano, "The Life of St. Clare", tr. Paschal Robinson, Dolphin Press 1910,
// the chapter on Agnes's conversion; Franciscan Media "Saint Agnes of Assisi"; Wikipedia "Agnes of Assisi"; franciscans.ie):
// born Caterina Offreduccio c. 1197, Clare's younger sister ("tender in years"). Clare left home in March 1212 to follow
// Francis; sixteen days later Agnes joined her at the church of Sant'Angelo in Panzo on Mount Subasio. The next day twelve
// men of the family came: "Why didst thou come to this place? Make ready at once to return home with us." She refused;
// a knight tried to drag her away by the hair (not shown), the others carried her down the slope while she cried "Help me,
// dearest sister, and suffer me not to be taken from Christ the Lord." Clare prayed in tears; Agnes's body became so heavy
// that the men could not carry her across a little brook, nor could farmers from the fields ("She was eating lead all
// night, and therefore it is no wonder she is so heavy"). Her uncle Monaldo raised his arm to strike her and a terrible pain
// seized it. Clare asked them to leave Agnes in her care; they left; Francis cut her hair with his own hands. Later abbess
// at Monticelli (Florence); returned to nurse Clare in 1253 and died 16 Nov 1253; cult approved by Benedict XIV in 1753.
// Iconography: Poor Clare (brown habit, white cord, black veil, white wimple) holding a book.
// Martyrdom-free story; kept bloodless: no hair-pulling or blow is shown, only men pulling her arms and a raised hand.
// All seven scenes have three.js backgrounds (all-3D backgrounds standard since 2026-11-18); characters stay SVG.
// Exported for later reels: agnesA, clare, francisHD, knight, monaldo, panzoChurch, monstrance, scissors.
import fs from 'fs';
import { W, M, GOLD, sky, sun, rays, clouds, hill, sparkles, motes, tufts, flowers, ground, book, dark, light, bokeh,
  FAR, BACK, MID, NEAR } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { assisi, olive } from './francis.mjs';

const SLUG = 'st_agnes_of_assisi_too_heavy';
const at = wordTimes(SLUG);
let TIM = null;
try { TIM = JSON.parse(fs.readFileSync(new URL(`../work/${SLUG}/timings.json`, import.meta.url), 'utf8')); } catch { /* not narrated yet */ }
/** [start, end] of line i of a scene, in seconds from the scene start (flow lead-ins included). */
const lineSpan = (sc, i, a = 0.3, b = 999) => { const se = TIM?.[sc]?.sentences?.[i]; const L = sc === 0 ? 0.3 : 0.1; return se ? [+(L + se.start).toFixed(2), +(L + se.end).toFixed(2)] : [a, b]; };

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.6) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.6) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.1) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.035, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
/** Lean a character (feet at x, y) by deg degrees, with a small pulling sway. */
const lean = (x, y, deg, svg, sway = 0, per = 1.1, ph = 0) => `<g transform="translate(${x},${y})"><g${sway ? M.sway(sway, per, ph) : ''}><g transform="rotate(${deg})"><g transform="translate(${-x},${-y})">${svg}</g></g></g></g>`;
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props (hd() hand / body space)
/** A pair of iron shears (Francis cuts Agnes's hair). */
export const scissors = '<g transform="rotate(-30)"><path d="M-3 -6 L-6 -40 M3 -6 L6 -40" stroke="#c8ccd6" stroke-width="4.5" stroke-linecap="round"/>'
  + '<circle cx="-5" cy="4" r="6.5" fill="none" stroke="#8a8e98" stroke-width="3.4"/><circle cx="5" cy="4" r="6.5" fill="none" stroke="#8a8e98" stroke-width="3.4"/></g>';
/** Clare's monstrance: a gold sunburst on a stem. */
export const monstrance = (() => {
  let r = ''; for (let k = 0; k < 16; k++) { const a = k * 22.5 * Math.PI / 180, l = k % 2 ? 26 : 34; r += `M${(Math.cos(a) * 14).toFixed(1)} ${(-46 + Math.sin(a) * 14).toFixed(1)} L${(Math.cos(a) * l).toFixed(1)} ${(-46 + Math.sin(a) * l).toFixed(1)} `; }
  return `<g transform="translate(0,-4)"><circle cy="-46" r="40" fill="url(#haloGlow)" opacity=".8"/><path d="${r}" stroke="${GOLD}" stroke-width="3.4" stroke-linecap="round"/>`
    + `<circle cy="-46" r="14" fill="${GOLD}"/><circle cy="-46" r="9" fill="#fffaf0"/><path d="M-3 -32 L-4 6 L4 6 L3 -32Z" fill="#c9a24a"/><ellipse cy="8" rx="15" ry="5" fill="#c9a24a"/></g>`;
})();
const bookHeld = `<g transform="translate(-2,2) scale(1.05)">${book(true)}</g>`;
const headband = '<path d="M-38 -272 Q0 -292 38 -272" stroke="#f2c46b" stroke-width="4" fill="none"/><circle cx="-24" cy="-281" r="4" fill="#f6f0e2"/><circle cx="-14" cy="-285" r="3.4" fill="#f2a0b0"/>';
const cordKnots = '<path d="M-14 -112 Q-18 -70 -14 -30" stroke="#efe6d4" stroke-width="4" fill="none"/><circle cx="-16" cy="-84" r="4.4" fill="#e2d8c4"/><circle cx="-15" cy="-58" r="4.4" fill="#e2d8c4"/>';
const hoodBack = (c) => `<path d="M-38 -212 Q0 -190 38 -212 L32 -194 Q0 -176 -32 -194Z" fill="${dark(c, 0.18)}"/><path d="M-30 -200 Q0 -184 30 -200" stroke="${dark(c, 0.35)}" stroke-width="2" fill="none" opacity=".6"/>`;
const helmet = (c = '#9aa0ac') => `<path d="M-44 -272 Q-46 -320 0 -322 Q46 -320 44 -272 Q0 -284 -44 -272Z" fill="${c}"/><path d="M-30 -306 Q0 -318 26 -310" stroke="${light(c, 0.4)}" stroke-width="4" fill="none" opacity=".7"/>`
  + `<path d="M-44 -272 Q0 -284 44 -272" stroke="${dark(c, 0.3)}" stroke-width="4" fill="none"/><path d="M0 -322 V-284" stroke="${dark(c, 0.25)}" stroke-width="3"/>`;
const capNoble = '<path d="M-44 -274 Q-48 -314 -6 -318 Q40 -320 46 -276 Q0 -288 -44 -274Z" fill="#2a1e2a"/><path d="M-44 -276 Q0 -290 46 -278" stroke="#f2c46b" stroke-width="3.4" fill="none"/><path d="M30 -310 Q60 -300 58 -262" stroke="#2a1e2a" stroke-width="10" fill="none" stroke-linecap="round"/>';

// ================================================================ characters (hd rig)
const SKA = '#f0c6a2', POOR = '#7c5c40', VEIL = '#211c22', WIMPLE = '#f8f4ec', CORD = '#efe6d4';
/** St. Agnes of Assisi. Default: the noble girl of fifteen (rose gown, long auburn hair, gold headband). nun: the Poor Clare. */
export const agnesA = (x, y, s, { nun = false, over = '', ...o } = {}) => nun
  ? hd(x, y, s, { top: POOR, plain: true, belt: CORD, trim: dark(POOR, 0.12), veil: VEIL, wimple: WIMPLE, skin: SKA, hair: '#7a4424', beard: null,
    age: 'young', iris: '#5a3a24', ...o, over: cordKnots + over })
  : hd(x, y, s, { top: '#c8566e', trim: GOLD, belt: '#f2c46b', skin: SKA, hair: '#8a4a26', hairStyle: 'long', beard: null, age: 'young',
    iris: '#5a3a24', shoes: '#7a3a3a', ...o, over: headband + over });
/** St. Clare in the Poor Clare habit. */
export const clare = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: POOR, plain: true, belt: CORD, trim: dark(POOR, 0.12), veil: VEIL,
  wimple: WIMPLE, skin: '#ecc09c', hair: '#6a3e22', beard: null, age: 'mid', iris: '#4a3424', ...o, over: cordKnots + over });
/** St. Francis of Assisi: grey-brown habit with the hood down, white cord, tonsure, short beard (detailed rig). */
export const francisHD = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#7a6048', plain: true, belt: CORD, trim: dark('#7a6048', 0.12),
  skin: '#d9a47e', hair: '#5a3e2a', hairStyle: 'tonsure', beard: '#5a3e2a', beardStyle: 'short', age: 'mid', iris: '#4a3020', ...o,
  over: hoodBack('#7a6048') + cordKnots + over });
const KN = [['#a8343a', '#2a2a30'], ['#3a5a8a', '#4a3020'], ['#5a6a3a', '#1e1a18'], ['#8a5a2a', '#3a2a20']];
/** A knight of the family: surcoat over mail, round steel helmet, boots. */
export const knight = (x, y, s, i = 0, { over = '', ...o } = {}) => hd(x, y, s, { top: KN[i % 4][0], trim: GOLD, belt: '#4a3424', skin: ['#d9a47e', '#c99a72', '#e2b48f'][i % 3],
  hair: KN[i % 4][1], beard: KN[i % 4][1], beardStyle: i % 2 ? 'short' : 'full', age: 'mid', iris: '#3a2a1e', shoes: '#3a2a22', ...o, over: helmet() + over });
/** Lord Monaldo, Agnes's uncle: crimson tunic, dark green mantle, noble cap, greying beard. */
export const monaldo = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#7a2a3a', mantle: '#2a4a3a', lining: GOLD, trim: GOLD, belt: '#3a2418',
  skin: '#d9a47e', hair: '#7a746e', beard: '#7a746e', beardStyle: 'full', age: 'mid', iris: '#3a2a1e', shoes: '#2a1e18', ...o, over: capNoble + over });

// ================================================================ set pieces
/** The little Benedictine church of Sant'Angelo in Panzo: stone nave, bell gable, round-arched door. Base centre at (x, y). */
export function panzoChurch(x, y, s = 1, { stone = '#d8c6a8', roof = '#b0603e', open = true } = {}) {
  let st = ''; for (let yy = -40, k = 0; yy > -300; yy -= 40, k++) st += `<path d="M-150 ${yy} H150" stroke="${dark(stone, 0.18)}" stroke-width="2" opacity=".45"/>`
    + [...Array(4)].map((_, j) => `<path d="M${-120 + j * 80 + (k % 2) * 40} ${yy} v40" stroke="${dark(stone, 0.18)}" stroke-width="2" opacity=".4"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-300" width="300" height="300" fill="${stone}"/>${st}`
    + `<rect x="80" y="-300" width="70" height="300" fill="${dark(stone, 0.25)}" opacity=".45"/>`
    + `<path d="M-172 -296 L0 -400 L172 -296Z" fill="${roof}"/><path d="M0 -400 L172 -296 L60 -296Z" fill="${dark(roof, 0.28)}" opacity=".6"/>`
    + `<rect x="-36" y="-470" width="72" height="90" fill="${stone}"/><path d="M-44 -470 L0 -506 L44 -470Z" fill="${roof}"/>`
    + `<path d="M-18 -384 V-440 Q0 -458 18 -440 V-384Z" fill="#3a2a24"/><path d="M-10 -420 Q0 -436 10 -420 L12 -400 L-12 -400Z" fill="#c9a24a"/>`
    + `<path d="M0 -506 V-540 M-12 -526 H12" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>`
    + `<circle cx="0" cy="-232" r="24" fill="${dark(stone, 0.35)}"/><circle cx="0" cy="-232" r="16" fill="#ffd98a" opacity=".85"/>`
    + `<path d="M-52 0 V-120 Q0 -176 52 -120 V0Z" fill="${dark(stone, 0.3)}"/>`
    + (open ? `<path d="M-42 0 V-116 Q0 -164 42 -116 V0Z" fill="#ffdc9a" opacity=".85"/><path d="M-42 0 V-116 Q0 -164 42 -116 V0Z" fill="url(#sunGlow)" opacity=".6"/>` : `<path d="M-42 0 V-116 Q0 -164 42 -116 V0Z" fill="#5a3a24"/>`)
    + '</g>';
}
const slopeGround = (y, seed = 3, c = '#86a456') => ground(y, c, { rim: light(c, 0.3) }) + tufts(y + 30, 24, dark(c, 0.25), { seed }) + tufts(y + 100, 18, dark(c, 0.15), { seed: seed + 5, s: 1.3 })
  + [[120, y + 160], [930, y + 120], [700, y + 260]].map(([sx, sy], k) => `<ellipse cx="${sx}" cy="${sy}" rx="${30 + k * 8}" ry="${12 + k * 3}" fill="#a8a090"/><ellipse cx="${sx - 6}" cy="${sy - 4}" rx="${16 + k * 4}" ry="5" fill="#c8c0b0"/>`).join('');
/** A brook crossing the slope in front of the characters' feet. */
const brook = (y) => `<path d="M-200 ${y + 40} Q200 ${y - 20} 540 ${y + 30} Q860 ${y + 80} 1280 ${y + 10} L1280 ${y + 70} Q860 ${y + 140} 540 ${y + 90} Q200 ${y + 40} -200 ${y + 100}Z" fill="#7ab0cc"/>`
  + `<g${M.scroll(240, 4)}>${[...Array(12)].map((_, k) => `<path d="M${-200 + k * 120} ${y + 58 + (k % 3) * 10} h${40 + (k % 2) * 20}" stroke="#e8f4fa" stroke-width="3" stroke-linecap="round" opacity=".7"/>`).join('')}</g>`;
const DAWN = [[0, '#6a8ac8'], [0.38, '#b8c8e0'], [0.62, '#f6d8b4'], [1, '#f6e2c4']];
/** A small man far off (the rest of the twelve). */
const farMan = (x, y, i, o = {}) => knight(x, y, 1.15, i, { mood: 'stern', armL: 10, armR: 12, ...o });

// ================================================================ scenes
// 0 · hook (3D subasioHook, push-fast): at frame 0 two knights are already pulling at Agnes, who kneels in prayer and does
// not move (visual teaser); more men behind; they strain on "could not lift"; halo + look at us on "This is Saint"
function scene0() {
  const tL = at(0, 'could not'), tW = at(0, 'So what'), tT = at(0, 'This is');
  const kL = seq((o) => knight(250, 1282, 2.0, 0, { armL: 14, look: [2.4, 0.6], ...o }), [[0, { mood: 'stern', armR: [52, 2, 0.9] }], [tL, { mood: 'pain', armR: [56, 3, 0.7] }], [tT, { mood: 'surprised', armR: [50, 2, 0.9] }]]);
  const kR = seq((o) => knight(830, 1282, 2.0, 1, { flip: true, armL: 14, look: [2.4, 0.6], ...o }), [[0, { mood: 'stern', armR: [52, 2, 0.9] }], [tL + 0.2, { mood: 'pain', armR: [56, 3, 0.7] }], [tW, { mood: 'surprised', armR: [48, 2, 0.9] }]]);
  return slopeGround(1250, 2)
    + MID(farMan(640, 1205, 2, { flip: true, armR: [40, 3, 1.4] }) + farMan(150, 1210, 3, { armR: [30, 3, 1.6] }) + farMan(960, 1212, 0, { flip: true }))
    + glow(540, 1150, 380, 0.45)
    + `<g opacity="0"${fadeIn(tL - 0.2, 0.8)}>${rays(540, 900, { op: 0.1, color: '#fff0d0' })}${glow(540, 1020, 430, 0.5)}<ellipse cx="540" cy="1352" rx="230" ry="34" fill="#ffe9a8" opacity=".35"/></g>`
    + lean(250, 1282, -7, kL, 1.6, 0.9, 0) + lean(830, 1282, 7, kR, 1.6, 0.9, 0.4)
    + `<g${punch(tT, 0.03, 540, 940)}>`
    + seq((o) => agnesA(540, 1352, 2.3, { kneel: true, ...PRAY, ...o }),
      [[0, { mood: 'peaceful' }], [tW, { mood: 'determined', look: [0, -0.6] }], [tT, { mood: 'happy', halo: true }]])
    + '</g>'
    + `<g opacity="0"${fadeIn(tL, 0.6)}>${sparkles(12, 380, 700, 900, 1300, { seed: 3, color: '#fff2c0' })}</g>`
    + motes(12, { seed: 3, y0: 600, y1: 1250 })
    + NEAR(tufts(1690, 14, '#5a7a3a', { seed: 31, s: 2.2 }));
}

// 1 · setup (SVG, pan-r): Assisi at dawn; Clare in the new habit at the little church; Francis steps in on "Saint Francis";
// Agnes runs in on "Sixteen days later"; Clare opens her arms on "followed"
function scene1() {
  const tF = at(1, 'Saint Francis'), tS = at(1, 'Sixteen'), tFo = at(1, 'followed');
  return MID(olive(60, 1200, 1.1) + olive(1020, 1190, 1.0) + panzoChurch(790, 1215, 0.78))
    + slopeGround(1240, 5, '#90aa60')
    + `<g opacity="0"${fadeIn(tFo, 0.6)}>${glow(560, 1000, 360, 0.5)}${sparkles(10, 420, 760, 880, 1180, { seed: 6, color: '#fff2d0' })}</g>`
    + seq((o) => clare(640, 1325, 2.05, { armL: 12, ...o }), [
      [0, { mood: 'peaceful', ...PRAY }], [tF, { mood: 'happy', look: [2.4, 0], armR: 18 }], [tS + 0.2, { mood: 'surprised', flip: true, look: [2.6, 0], armR: 18 }],
      [tFo, { mood: 'joy', flip: true, armL: [60, 2, 3], armR: [60, 2, 3] }]])
    + `<g opacity="0"${walkIn(tF - 0.3, 200)}>${seq((o) => francisHD(820, 1300, 1.95, { flip: true, armL: 12, look: [1.6, 0], ...o }),
      [[0, { mood: 'happy', armR: [40, 2, 3] }], [tFo, { mood: 'joy', armR: [90, 3, 2.4] }]])}</g>`
    + `<g opacity="0"${M.tw([{ at: tS - 0.2, dur: 1.4, from: { x: -380, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }])}>`
    + `<g${M.tw([{ at: tS - 0.2, dur: 1.4, from: { rotation: 6 }, to: { rotation: 0 }, ease: 'power2.out', origin: '330 1330' }])}>`
    + seq((o) => agnesA(330, 1330, 1.9, { armL: [30, 4, 0.8], look: [2.6, -0.4], ...o }), [[0, { mood: 'determined', armR: [40, 4, 0.8] }], [tFo, { mood: 'joy', armL: [64, 2, 3], armR: [64, 2, 3] }]])
    + '</g></g>'
    + NEAR(tufts(1660, 10, '#5a7a3a', { seed: 12, s: 2 }));
}

// 2 · Sant'Angelo in Panzo (SVG, push): the sisters at the church door; the men march in on "Twelve men"; the lead knight
// speaks (his own voice); Agnes worried, then firm on "She refused" (a small shake of the head)
function scene2() {
  const [q0, q1] = lineSpan(2, 1, 2, 6), tM = at(2, 'Twelve'), tR = at(2, 'She refused');
  return MID(panzoChurch(300, 1220, 1.0) + olive(1040, 1200, 1.05)
      + `<g opacity="0"${walkIn(tM - 0.2, 260, 1.4)}>${farMan(660, 1200, 2, { flip: true })}${farMan(760, 1196, 3, { flip: true })}${farMan(880, 1204, 0, { flip: true })}${farMan(990, 1200, 1, { flip: true })}</g>`)
    + slopeGround(1245, 8, '#8aa65a')
    + seq((o) => clare(150, 1335, 2.0, { armL: 12, look: [2.4, 0], ...o }), [[0, { mood: 'tender', armR: [50, 2, 3] }], [tM + 0.2, { mood: 'worried', armR: [62, 2, 3] }], [tR, { mood: 'determined', armR: [62, 2, 3] }]])
    + `<g${M.tw([{ at: tR, dur: 0.35, from: { rotation: 0 }, to: { rotation: -2.5 }, ease: 'sine.inOut', origin: '370 1340' }, { at: tR + 0.35, dur: 0.35, from: { rotation: -2.5 }, to: { rotation: 2.5 }, ease: 'sine.inOut', origin: '370 1340' }, { at: tR + 0.7, dur: 0.35, from: { rotation: 2.5 }, to: { rotation: 0 }, ease: 'sine.inOut', origin: '370 1340' }])}>`
    + seq((o) => agnesA(370, 1340, 1.95, { armL: 12, ...o }), [
      [0, { mood: 'tender', look: [-2, 0], armR: 18 }], [tM, { mood: 'surprised', look: [2.6, 0], armR: [40, 2, 3] }], [q0 + 0.3, { mood: 'worried', look: [2.6, 0], armR: 20 }],
      [tR, { mood: 'determined', look: [2.6, 0], ...PRAY }]])
    + '</g>'
    + `<g opacity="0"${walkIn(tM - 0.4, 300, 1.1)}>` + seq((o) => knight(790, 1335, 2.05, 0, { flip: true, armL: 14, look: [1.8, 0.4], ...o }), [
      [0, { mood: 'stern', armR: 18 }], [q0 - 0.1, { mood: 'stern', talk: [q0, q1], armR: [70, 3, 2.2] }], [q1 + 0.1, { mood: 'stern', armR: [110, 3, 2] }], [tR + 0.3, { mood: 'surprised', armR: 30 }]]) + '</g>'
    + NEAR(tufts(1660, 10, '#5a7a3a', { seed: 9, s: 2 }));
}

// 3 · down the mountain (SVG, pan-l): two knights haul Agnes down the slope (arms only, no blows); Clare reaches out from the
// church above; tears on "young girl"; Agnes cries out to Clare (her own voice)
function scene3() {
  const [q0, q1] = lineSpan(3, 2, 3, 7), tG = at(3, 'grabbed'), tD = at(3, 'dragged'), tY = at(3, 'young girl');
  const drag = M.tw([{ at: tD - 0.2, dur: 7, from: { x: 0 }, to: { x: -110 }, ease: 'sine.inOut' }]);
  return MID(`<path d="M-120 1180 L1200 980 L1200 1300 L-120 1300Z" fill="#7e9e56"/>` + panzoChurch(900, 1020, 0.5) + olive(640, 1110, 0.8) + olive(120, 1190, 0.9)
      + seq((o) => clare(830, 1066, 1.1, { flip: true, look: [1.6, 0.8], ...o }), [[0, { mood: 'worried', armL: 12, armR: [70, 2, 2.4] }], [q0, { mood: 'worried', tears: true, armL: [80, 3, 2], armR: [100, 3, 2] }]]))
    + `<path d="M-200 1290 L1280 1150 L1280 2200 L-200 2200Z" fill="#86a456"/><path d="M-200 1290 L1280 1150" stroke="#b0c880" stroke-width="6" opacity=".5"/>`
    + tufts(1320, 18, '#5e7e3a', { seed: 14 })
    + `<g${drag}>`
    + seq((o) => knight(250, 1335, 2.0, 2, { flip: true, armR: [18, 6, 0.8], look: [-1, 0], ...o }), [[0, { mood: 'stern', armL: 20 }], [tG, { mood: 'stern', armL: [62, 3, 0.8] }]])
    + seq((o) => agnesA(520, 1318, 1.95, { look: [2.4, -1.2], ...o }), [
      [0, { mood: 'surprised', armL: 20, armR: 20 }], [tG, { mood: 'worried', armL: [70, 4, 0.8], armR: [44, 4, 0.9] }], [tY, { mood: 'worried', tears: true, armL: [70, 4, 0.8], armR: [44, 4, 0.9] }],
      [q0 - 0.1, { mood: 'worried', tears: true, talk: [q0, q1], armL: [70, 4, 0.8], armR: [120, 6, 1.2] }]])
    + seq((o) => knight(770, 1300, 2.0, 3, { flip: true, armL: 14, look: [1.8, 0.4], ...o }), [[0, { mood: 'stern', armR: 20 }], [tG, { mood: 'stern', armR: [58, 3, 0.9] }]])
    + '</g>'
    + NEAR(tufts(1690, 12, '#4e6e34', { seed: 19, s: 2.2 }));
}

// 4 · the turning point (3D subasioMiracle, dolly): by the little brook Clare kneels in prayer; Agnes grows too heavy (glow,
// sparkles) on the climax line; the knights strain and give up; Monaldo raises his hand and a pain seizes the arm
function scene4() {
  const tP = at(4, 'prayed'), tH = at(4, 'so heavy'), tN = at(4, 'no one'), tU = at(4, 'Her uncle'), tR = at(4, 'raised'), tPa = at(4, 'sharp pain');
  return slopeGround(1250, 4, '#82a052') + brook(1255)
    + `<g opacity="0"${fadeIn(tP - 0.2, 1)}>${glow(170, 1040, 300, 0.45)}</g>`
    + `<g opacity="0"${fadeIn(tH - 0.2, 1)}>${rays(540, 960, { op: 0.07, color: '#fff2d0' })}${glow(540, 1080, 400, 0.45)}<ellipse cx="540" cy="1356" rx="250" ry="38" fill="#ffe9a8" opacity=".45"/></g>`
    + lean(360, 1278, -8, seq((o) => knight(360, 1278, 1.9, 0, { armL: 14, look: [2.2, 0.8], ...o }), [
      [0, { mood: 'stern', armR: [54, 2, 0.8] }], [tH, { mood: 'pain', armR: [58, 3, 0.6] }], [tN + 0.3, { mood: 'surprised', armR: [30, 2, 2] }]]), 1.4, 0.8)
    + seq((o) => clare(170, 1345, 2.0, { kneel: true, ...PRAY, ...o }), [[0, { mood: 'worried', look: [2.4, 0], armL: 14, armR: 14 }], [tP, { mood: 'peaceful', halo: tP + 0.2 }]])
    + seq((o) => agnesA(560, 1352, 2.15, { kneel: true, ...PRAY, ...o }), [[0, { mood: 'worried', look: [-2, 0] }], [tP + 0.3, { mood: 'peaceful' }], [tPa, { mood: 'peaceful', halo: tPa }]])
    + `<g${fadeOut(tU - 0.2, 0.6)}>` + lean(800, 1300, 8, seq((o) => knight(800, 1300, 2.0, 1, { flip: true, armL: 14, look: [2.2, 0.8], ...o }), [
      [0, { mood: 'stern', armR: [54, 2, 0.8] }], [tH + 0.2, { mood: 'pain', armR: [58, 3, 0.6] }], [tN, { mood: 'surprised', armR: [40, 2, 2] }]]), 1.4, 0.8, 0.5) + '</g>'
    + `<g opacity="0"${walkIn(tU - 0.2, 240, 0.9)}>` + `<g${M.tw([{ at: tPa, dur: 0.5, from: { rotation: 0 }, to: { rotation: 5 }, ease: 'power2.out', origin: '800 1300' }])}>`
    + seq((o) => monaldo(800, 1300, 2.05, { flip: true, look: [2.2, 0.8], ...o }), [
      [0, { mood: 'stern', armL: 12, armR: 30 }], [tR, { mood: 'stern', armL: 12, armR: [150, 2, 2] }], [tPa, { mood: 'pain', armL: [40, 2, 1.5], armR: 22 }]])
    + '</g></g>'
    + `<g opacity="0"${fadeIn(tH, 0.5)}>${sparkles(16, 380, 740, 880, 1300, { seed: 8, color: '#fff2b0' })}</g>`
    + `<g opacity="0"${fadeIn(tH, 1)}>${motes(12, { seed: 6, x0: 360, x1: 760, y0: 760, y1: 1280 })}</g>`
    + NEAR(bokeh(5, { seed: 17, op: [0.2, 0.45] }));
}

// 5 · what came of it (SVG, tilt-up + rack): the men walk away; Francis cuts her hair (locks fall); Agnes becomes a Poor
// Clare beside her sister; halo and rays on the quotable line
function scene5() {
  const tG = at(5, 'gave up'), tC = at(5, 'cut her hair'), tSt = at(5, 'stayed'), tTw = at(5, 'Twelve');
  const lock = (x, y, k) => `<g opacity="0"${M.tw([{ at: tC + 0.2 + k * 0.18, dur: 1.4, from: { y: -20, opacity: 1, rotation: 0 }, to: { y: 150, opacity: 0, rotation: 40 }, ease: 'power1.in', origin: `${x} ${y}` }])}><path d="M${x} ${y} q8 14 2 28 q-6 12 2 22" stroke="#8a4a26" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  return `<g opacity="0"${fadeIn(tTw - 0.4, 1.2)}>${rays(540, 760, { op: 0.13 })}</g>`
    + MID(`<g${M.tw([{ at: tG - 0.3, dur: 3.2, from: { x: 0, opacity: 1 }, to: { x: -420, opacity: 0 }, ease: 'power1.in' }])}>${[880, 950, 1020, 1090].map((x, k) => knight(x, 1170, 0.8, k, { flip: true, mood: 'sad', armL: 10, armR: 10 })).join('')}</g>`
      + panzoChurch(560, 1205, 0.95) + olive(80, 1200, 1.0) + olive(1010, 1195, 0.95))
    + slopeGround(1250, 7, '#a0a060')
    + glow(540, 1050, 420, 0.5)
    + seq((o) => clare(225, 1330, 2.0, { armL: 12, look: [2.4, 0.4], ...o }), [[0, { mood: 'happy', armR: 18 }], [tC, { mood: 'tender', armR: [40, 2, 3] }], [tSt, { mood: 'joy', armR: [70, 2, 3] }], [tTw, { mood: 'peaceful', ...PRAY }]])
    + seq((o) => (o.nun ? agnesA(530, 1345, 2.15, { kneel: true, ...PRAY, ...o }) : agnesA(530, 1345, 2.15, { kneel: true, ...PRAY, ...o })), [
      [0, { mood: 'happy', look: [0, 0.6] }], [tC, { mood: 'peaceful' }], [tSt, { nun: true, mood: 'tender' }], [tTw + 0.2, { nun: true, mood: 'peaceful', halo: tTw + 0.3 }]])
    + [[-30, -300], [10, -306], [36, -292]].map(([dx, dy], k) => lock(530 + dx * 2.15, 1345 + 84 * 2.15 + dy * 2.15, k)).join('')
    + seq((o) => francisHD(790, 1330, 2.05, { flip: true, armL: 12, look: [1.8, 1], ...o }), [
      [0, { mood: 'happy', armR: 20 }], [tC - 0.3, { mood: 'tender', armR: [72, 3, 1.2], propR: scissors }], [tSt, { mood: 'joy', armR: [100, 2, 3] }], [tTw, { mood: 'peaceful', ...PRAY }]])
    + `<g opacity="0"${fadeIn(tSt, 0.8)}>${sparkles(16, 300, 780, 760, 1100, { seed: 9, color: '#fff2d0' })}</g>`
    + NEAR(bokeh(6, { seed: 23 }));
}

// 6 · feast day (3D subasioGlory, arc-r): portrait of the Poor Clare with halo and book; Clare steps in with the monstrance on
// "November 19"; tender on "pray for us"
function scene6() {
  const tN = at(6, 'November'), tP = at(6, 'Saint Agnes');
  return slopeGround(1290, 11, '#7a8a4e')
    + flowers(1330, 1560, 12, { seed: 5, colors: ['#ffffff', '#f6d36b', '#f2a0b0'] })
    + glow(540, 1080, 470, 0.7)
    + `<g opacity="0"${walkIn(tN - 0.2, -200)}>` + seq((o) => clare(230, 1300, 2.05, { armL: [38, 2, 3.3], armR: [20, 1, 3], propL: monstrance, look: [2.4, -0.2], halo: true, ...o }), [
      [0, { mood: 'happy' }], [tP, { mood: 'tender' }]]) + '</g>'
    + seq((o) => agnesA(560, 1330, 2.3, { nun: true, halo: true, armL: [30, 2, 3], armR: [40, 2, 3.3], propR: bookHeld, ...o }), [
      [0, { mood: 'happy' }], [tN + 0.4, { mood: 'happy', look: [-2, 0] }], [tP, { mood: 'tender' }]])
    + motes(12, { seed: 19, y0: 600, y1: 1250 })
    + NEAR(bokeh(7, { seed: 29 }));
}

export const STORY = {
  slug: SLUG, name: 'St_Agnes_of_Assisi_Too_Heavy',
  bg3d: './agnes_of_assisi_too_heavy.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { knight: { voice: { im_nicola: 0.6, am_onyx: 0.4 }, speed: 0.95 }, agnes: { voice: 'if_sara', speed: 1.0 } },
  thumb_hook: "Twelve men couldn't lift her", thumb_title: 'St. Agnes of Assisi', thumb_scene: 0, thumb_t: 7.6,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 760, 'l']],
  fix: {
    'ɐsˈɪsi': 'əsˈiːsi',                                // Assisi (uh-SEE-see)
    'mɑːnˈældoʊ': 'moʊnˈɑːldoʊ',                         // Monaldo (moh-NAHL-doh)
    'noʊvˈɛmbɚ nˈaɪntiːn': 'noʊvˈɛmbɚ nˌaɪntˈiːnθ',     // November 19 -> nineteenth
  },
  scenes: [
    { kicker: '1212 · MOUNT SUBASIO, ITALY', title: 'Too Heavy to Lift', art: scene0, bg3d: 'subasioHook', cam: { move: 'push-fast', ox: 540, oy: 950 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Twelve angry men came to drag a girl out of a church.', 'They could not even lift her.', 'So what held her down?', 'This is Saint Agnes of Assisi.'] },
    { kicker: '1212 · ASSISI, ITALY', title: 'She Followed Her Sister', art: scene1, bg3d: 'subasioDawn', cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Her sister Clare had just left home to follow Saint Francis.', 'Sixteen days later, Agnes followed her.'] },
    { kicker: "SANT'ANGELO IN PANZO", title: 'Come Home With Us', art: scene2, bg3d: 'subasioChurch', cam: { move: 'push', ox: 540, oy: 950 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['The next day, twelve men from her family came for her:', { text: 'Why did you come here? Come home with us, now.', who: 'knight' }, 'She refused.'] },
    { kicker: 'DOWN THE MOUNTAIN', title: 'Help Me, Sister!', art: scene3, bg3d: 'subasioSlope', cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['A knight grabbed her, and they dragged her away.', 'Still a young girl, she cried out:', { text: "Help me, dearest sister! Don't let them take me from Christ the Lord!", who: 'agnes' }] },
    { kicker: 'TOLD BY THOMAS OF CELANO', title: 'The Power of Prayer', art: scene4, bg3d: 'subasioMiracle', cam: { move: 'dolly', amt: 0.08, ox: 540, oy: 950 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['Clare knelt and prayed.', { text: 'Suddenly, Agnes grew so heavy that no one could lift her.', speed: 0.85 }, 'Her uncle Monaldo raised his arm to strike her, but a sharp pain froze it.'] },
    { kicker: 'GIVEN TO GOD FOREVER', title: 'Francis Cut Her Hair', art: scene5, bg3d: 'subasioGold', cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['The men gave up and left.', 'Saint Francis cut her hair, and she stayed with Clare.', 'Twelve men could not carry her away from Christ.'] },
    { kicker: 'FEAST DAY · NOVEMBER 19', title: "Clare's Little Sister", art: scene6, bg3d: 'subasioGlory', cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is November 19.', 'Saint Agnes of Assisi, pray for us.'] },
  ],
};
