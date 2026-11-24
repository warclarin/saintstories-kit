// St. Catherine of Alexandria (whole life, told as "her ancient story says" / "tradition says": the 1969 calendar reform found
// too few reliable facts; John Paul II restored her feast in 2002). Feast: November 25.
// All-3D backgrounds (catherine_of_alexandria.bg3d.js: alexandria(), a new set: the Egyptian coast, the Pharos, a prison cell,
// Mount Sinai with her monastery); cam3d; characters hd().
// Sources: Wikipedia "Catherine of Alexandria" (daughter of Constus, governor of Alexandria; born c. 287, died c. 305 aged
// 17-18; a vision of the Virgin Mary and the Child Jesus persuaded her to become a Christian; she rebuked the emperor Maxentius;
// "50 of the best pagan philosophers and orators" sent to dispute with her, several "conquered by her eloquence, declared
// themselves Christians"; in prison "a dove from heaven fed her daily"; the spiked breaking wheel "shattered" at her touch;
// beheaded; body said to be found at Mount Sinai about 800; patron of philosophers, scholars, students; one of the Fourteen
// Holy Helpers; feast removed 1969, restored 2002 as an optional memorial; iconography: crown, breaking wheel, sword, palm,
// book, long unbound hair); The Golden Legend (Ryan & Ripperger 1941, Columbia medmil text): age eighteen; to the emperor
// "Call upon them in need, and they cannot come to you!"; "fifty orators"; their master: "we are all converted, and believe
// in Christ!"; twelve days without food, "a white dove brought her food"; four spiked wheels, an angel struck the engine;
// angels bore her body to Mount Sinai; her last prayer "Jesus, good King, I implore Thee" (kept for the caption).
// Bloodless (Meta/YouTube): no executioner and no blow; the beheading is told in one line over her kneeling in light.
// Exported for later reels: catherine, emperorMax, sage, maryVision, laurelCrown, spikedWheel, wheelPieces, brokenWheel,
// scrollPile, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, book, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { crownHead } from './elizabeth_of_hungary_roses.mjs';
import { angelHD } from './cecilia_life.mjs';
import { dove } from './presentation_of_mary.mjs';
import { babyBundle } from './aparecida.mjs';
import { loaf } from './gelasius.mjs';
import { idol } from './longinus.mjs';
import { scroll } from './perpetua_arena.mjs';

const at = wordTimes('st_catherine_of_alexandria');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const flash = (t) => `<g opacity="0"${fadeIn(t, 0.12)}><g${fadeOut(t + 0.16, 0.7)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".8"/></g></g>`;
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props
/** A gold laurel wreath in hd() body space (an emperor's crown; sits on the hair). */
export const laurelCrown = (() => {
  let leaves = '';
  for (let k = 0; k < 9; k++) {
    const a = (-160 + k * 17.5) * Math.PI / 180, x = Math.cos(a) * 41, y = -268 + Math.sin(a) * 20;
    for (const sd of [-1, 1]) leaves += `<ellipse cx="${f(x)}" cy="${f(y + sd * 5)}" rx="9" ry="4.2" fill="${sd < 0 ? GOLD : '#c8963e'}" transform="rotate(${f(a * 180 / Math.PI + 90 + sd * 30)} ${f(x)} ${f(y + sd * 5)})"/>`;
  }
  return `<g><path d="M-42 -270 Q0 -292 42 -270" stroke="#c8963e" stroke-width="3" fill="none"/>${leaves}</g>`;
})();
/** A gold sceptre topped with an eagle-like knob (held in the hand). */
const sceptre = `<g transform="rotate(-6)"><rect x="-4" y="-170" width="8" height="230" rx="3" fill="#c8963e"/><circle cy="-178" r="13" fill="${GOLD}"/><circle cx="-4" cy="-182" r="4" fill="#fff0b8" opacity=".7"/></g>`;
/** The spiked wheel: wooden rim with an iron band and iron spikes, 8 spokes, a hub. Centre at (0,0), radius 150. */
export const spikedWheel = (() => {
  let spokes = '', spikes = '';
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; spokes += `<path d="M${f(Math.cos(a) * 26)} ${f(Math.sin(a) * 26)} L${f(Math.cos(a) * 132)} ${f(Math.sin(a) * 132)}" stroke="#7a5232" stroke-width="13" stroke-linecap="round"/>`; }
  for (let k = 0; k < 18; k++) { const a = k * Math.PI / 9, c = Math.cos(a), s = Math.sin(a), px = -s, py = c;
    spikes += `<path d="M${f(c * 152 + px * 9)} ${f(s * 152 + py * 9)} L${f(c * 186)} ${f(s * 186)} L${f(c * 152 - px * 9)} ${f(s * 152 - py * 9)}Z" fill="#b8c0ca"/>`
      + `<path d="M${f(c * 152)} ${f(s * 152)} L${f(c * 186)} ${f(s * 186)} L${f(c * 152 - px * 9)} ${f(s * 152 - py * 9)}Z" fill="#8a929c"/>`; }
  return `<g>${spikes}<circle r="146" fill="none" stroke="#6a4428" stroke-width="26"/><circle r="146" fill="none" stroke="#8a6040" stroke-width="10"/>`
    + `<circle r="158" fill="none" stroke="#7a828c" stroke-width="5"/>${spokes}<circle r="30" fill="#5a3a22"/><circle r="14" fill="#8a929c"/></g>`;
})();
/** The wheel bursting apart at time t: 8 rim pieces fly outward and fade, the hub drops. Centre at (0,0). */
export const wheelPieces = (t) => {
  let out = '';
  for (let k = 0; k < 8; k++) {
    const a0 = k * Math.PI / 4, a1 = a0 + Math.PI / 4, am = (a0 + a1) / 2, arc = `M${f(Math.cos(a0) * 146)} ${f(Math.sin(a0) * 146)} A146 146 0 0 1 ${f(Math.cos(a1) * 146)} ${f(Math.sin(a1) * 146)}`;
    let sp = ''; for (let j = 0; j < 2; j++) { const a = a0 + (j + 0.5) * Math.PI / 8, c = Math.cos(a), s = Math.sin(a);
      sp += `<path d="M${f(c * 152 - s * 9)} ${f(s * 152 + c * 9)} L${f(c * 184)} ${f(s * 184)} L${f(c * 152 + s * 9)} ${f(s * 152 - c * 9)}Z" fill="#b8c0ca"/>`; }
    const piece = `${sp}<path d="${arc}" stroke="#6a4428" stroke-width="26" fill="none"/><path d="${arc}" stroke="#8a6040" stroke-width="10" fill="none"/>`
      + `<path d="M${f(Math.cos(am) * 30)} ${f(Math.sin(am) * 30)} L${f(Math.cos(am) * 132)} ${f(Math.sin(am) * 132)}" stroke="#7a5232" stroke-width="13" stroke-linecap="round"/>`;
    const D = 320 + (k % 3) * 60, mx = f(Math.cos(am) * 120), my = f(Math.sin(am) * 120);
    out += `<g opacity="0"${M.tw([{ at: t, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t + 0.7, dur: 0.6, from: { opacity: 1 }, to: { opacity: 0 } }])}>`
      + `<g${M.tw([{ at: t, dur: 1.1, from: { x: 0, y: 0, rotation: 0 }, to: { x: f(Math.cos(am) * D), y: f(Math.sin(am) * D + 160), rotation: (k % 2 ? 1 : -1) * (90 + k * 12) }, ease: 'power2.out', origin: `${mx} ${my}` }])}>${piece}</g></g>`;
  }
  return out + `<g opacity="0"${M.tw([{ at: t, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t + 0.9, dur: 0.5, from: { opacity: 1 }, to: { opacity: 0 } }])}>`
    + `<g${M.tw([{ at: t, dur: 0.8, from: { y: 0 }, to: { y: 300 }, ease: 'power2.in' }])}><circle r="30" fill="#5a3a22"/><circle r="14" fill="#8a929c"/></g></g>`;
};
/** Her emblem: half of the broken wheel standing on the ground (base at 0,0). */
export const brokenWheel = (s = 1) => {
  let sp = '';
  for (let k = 0; k < 8; k++) { const a = Math.PI + k * Math.PI / 8 + Math.PI / 16, c = Math.cos(a), si = Math.sin(a);
    sp += `<path d="M${f(c * 152 - si * 9)} ${f(si * 152 + c * 9)} L${f(c * 184)} ${f(si * 184)} L${f(c * 152 + si * 9)} ${f(si * 152 - c * 9)}Z" fill="#b8c0ca"/>`; }
  let spokes = ''; for (const a of [Math.PI * 1.25, Math.PI * 1.5, Math.PI * 1.75]) spokes += `<path d="M${f(Math.cos(a) * 26)} ${f(Math.sin(a) * 26)} L${f(Math.cos(a) * 132)} ${f(Math.sin(a) * 132)}" stroke="#7a5232" stroke-width="13" stroke-linecap="round"/>`;
  return `<g transform="scale(${s}) translate(0,-10)"><ellipse cx="0" cy="14" rx="170" ry="16" fill="#1a0f1a" opacity=".25"/>${sp}`
    + `<path d="M-146 0 A146 146 0 0 1 146 0" stroke="#6a4428" stroke-width="26" fill="none"/><path d="M-146 0 A146 146 0 0 1 146 0" stroke="#8a6040" stroke-width="10" fill="none"/>`
    + `${spokes}<path d="M-30 0 A30 30 0 0 1 30 0Z" fill="#5a3a22"/><path d="M-14 0 A14 14 0 0 1 14 0Z" fill="#8a929c"/>`
    + `<path d="M-160 -4 L-140 6 L-150 12Z M150 -6 L162 6 L146 10Z" fill="#6a4428"/></g>`;
};
/** A small pile of scrolls and a codex on the ground (base at 0,0). */
export const scrollPile = (s = 1) => `<g transform="scale(${s})"><ellipse cy="4" rx="80" ry="10" fill="#1a0f1a" opacity=".22"/>`
  + `<g transform="translate(-30,-14) rotate(-90)">${scroll}</g><g transform="translate(22,-14) rotate(-80)">${scroll}</g><g transform="translate(-4,-46) rotate(-96)">${scroll}</g></g>`;
/** A small cloud for a floating figure to stand on (centre at 0,0). */
const cloudPad = (w = 1) => `<g transform="scale(${w},1)"><ellipse cx="0" cy="0" rx="120" ry="34" fill="#fff8ec" opacity=".92"/><ellipse cx="-62" cy="-12" rx="56" ry="30" fill="#fffdf6"/>`
  + `<ellipse cx="48" cy="-16" rx="64" ry="34" fill="#fffdf6"/><ellipse cx="0" cy="8" rx="128" ry="22" fill="#e8dce8" opacity=".6"/></g>`;

// ================================================================ characters
const SKC = '#ecc29c', HAIRC = '#b8742e';
/** St. Catherine: a young noblewoman of Alexandria; green gown, red mantle with gold lining, long auburn hair, a crown. */
export const catherine = (x, y, s, { crowned = true, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#2f6a58', mantle: '#b02e3c', lining: GOLD, trim: GOLD, belt: '#c8963e', skin: SKC, hair: HAIRC, hairStyle: 'long', beard: null,
  age: 'young', iris: '#5a7a3a', shoes: '#6a2a2a', ...o, over: (crowned ? crownHead() : '') + over });
/** The emperor Maxentius: white tunic, purple mantle with gold, short dark beard, gold laurel wreath. */
export const emperorMax = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: '#efe6d2', mantle: '#5a2a6e', lining: GOLD, trim: GOLD, belt: GOLD, skin: '#e2b48f', hair: '#2a1c14', hairStyle: 'short', beard: '#2a1c14', beardStyle: 'short',
  age: 'mid', iris: '#3a2a20', shoes: '#6a2a2a', mood: 'stern', ...o, over: laurelCrown + over });
const SAGES = [['#7a6a5a', '#e2d6be'], ['#5a6a7a', '#d2c6ac'], ['#6a5a4a', '#ece2cc'], ['#7a7a62', '#c8bca4']];
/** A pagan philosopher: plain tunic, a pale himation, grey or white hair and a long beard. */
export const sage = (x, y, s, i = 0, { over = '', ...o } = {}) => hd(x, y, s, {
  top: SAGES[i % 4][0], mantle: SAGES[i % 4][1], lining: dark(SAGES[i % 4][1], 0.1), trim: dark(SAGES[i % 4][0], 0.15), plain: true, belt: false,
  skin: ['#e2b48f', '#c99a72', '#d9a47e', '#b98a62'][i % 4], hair: ['#e8e2d8', '#9a948c', '#d8d2c8', '#6a625a'][i % 4], beard: ['#e8e2d8', '#9a948c', '#d8d2c8', '#6a625a'][i % 4],
  beardStyle: i % 2 ? 'full' : 'long', age: i % 3 === 1 ? 'mid' : 'old', iris: '#4a3a2a', shoes: '#5a3a22', mood: 'stern', ...o, over });
/** Mary with the Child Jesus, as in Catherine's vision: white gown, blue mantle and veil, halo, the Child in her arms. */
export const maryVision = (x, y, s, o = {}) => hd(x, y, s, { top: '#f4eee2', mantle: '#3a6ab8', lining: GOLD, trim: GOLD, belt: false, veil: '#3a6ab8', veilHair: 'parted',
  hair: '#4a3020', skin: '#e8bc96', beard: null, age: 'young', iris: '#4a3a2a', shoes: '#e8dcc8', halo: true, mood: 'tender', armL: 44, armR: 44, propR: babyBundle, ...o });
// background rows of philosophers (small cards, fading in one after another)
const sageRow = (y, xs, t, mood = 'stern') => xs.map(([x, s, fl], k) => `<g opacity="0"${fadeIn(t + k * 0.16, 0.5)}>${castShadow(x, y, s, 'kHook')}${sage(x, y, s, k, { flip: fl, mood, armR: [14, 2, 3], armL: k % 2 ? 26 : 12, propL: k % 2 ? scroll : '' })}</g>`).join('');

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  kHook:   { key: '#ffd8a0', from: 'l', tint: '#ffd8b0', amt: 0.12, rim: '#ffe0b8', rimOp: 0.85 },
  kYouth:  { key: '#fff4d8', from: 'r', tint: '#fff4e4', amt: 0.06, rim: '#fff8e8', rimOp: 0.7 },
  kEmp:    { key: '#ffb880', from: 'back', tint: '#ffbe9a', amt: 0.16, rim: '#ffc08a', rimOp: 0.85 },
  kDebate: { key: '#ffe0b0', from: 'r', tint: '#ffe4c4', amt: 0.1, rim: '#fff0d4', rimOp: 0.75 },
  kCell:   { key: '#c8d8ff', from: 'r', tint: '#9aa8d8', amt: 0.24, rim: '#d8e4ff', rimOp: 0.9 },
  kWheel:  { key: '#ffe0b8', from: 'top', tint: '#b8b0c8', amt: 0.16, rim: '#ffe8c8', rimOp: 0.85 },
  kSinai:  { key: '#ffe8c8', from: 'top', tint: '#a8aedc', amt: 0.18, rim: '#ffe8c0', rimOp: 0.9 },
  kGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `litk${++LID}`, d = 5;
  const offs = { l: [[d, 0]], r: [[-d, 0]], back: [[d, 0], [-d, 0], [0, d]], top: [[0, d], [d * 0.6, d * 0.6], [-d * 0.6, d * 0.6]] }[L.from];
  const rims = offs.map(([dx, dy], k) => `<feOffset in="SourceAlpha" dx="${dx}" dy="${dy}" result="o${k}"/><feComposite in="SourceAlpha" in2="o${k}" operator="out" result="e${k}"/>`).join('');
  const merge = offs.map((_, k) => `<feMergeNode in="e${k}"/>`).join('');
  return `<defs><filter id="${id}" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1680" height="2520" color-interpolation-filters="sRGB">`
    + `<feFlood flood-color="${L.tint}" result="t"/><feBlend in="SourceGraphic" in2="t" mode="multiply" result="m"/><feComposite in="m" in2="SourceAlpha" operator="in" result="mm"/>`
    + `<feComposite in="SourceGraphic" in2="mm" operator="arithmetic" k1="0" k2="${f(1 - L.amt)}" k3="${f(L.amt)}" k4="0" result="base"/>`
    + `${rims}<feMerge result="edge">${merge}</feMerge><feGaussianBlur in="edge" stdDeviation="1.6" result="eb"/>`
    + `<feFlood flood-color="${L.rim}" flood-opacity="${L.rimOp}"/><feComposite in2="eb" operator="in"/><feComposite in2="SourceAlpha" operator="in" result="rim"/>`
    + `<feMerge><feMergeNode in="base"/><feMergeNode in="rim"/></feMerge></filter></defs><g filter="url(#${id})">${svg}</g>`;
};
/** A soft cast shadow on the ground, thrown away from the scene's light (feet at x, y; s = character scale). */
export const castShadow = (x, y, s, mode) => {
  const from = LIGHT[mode].from;
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; layer(d) at 20 / d. Feet art y: depth 1 ~1345, 0.97 ~1312,
// 0.95 ~1322, 0.92 ~1310, 0.78 ~1262, MID 0.75 ~1240.
// 0 · hook: Catherine crowned with her book; the fifty wise men gather behind her; the Pharos over the harbour (push-fast)
function scene0() {
  const fw = at(0, 'fifty'), s = at(0, 'This is'), n = at(0, 'Saint Catherine');
  const C = (op) => catherine(400, 1345, 2.4, { armL: [26, 2, 3], propL: book(false), armR: [14, 2, 3], ...op });
  return MID(lit(sageRow(1240, [[600, 1.0, true], [672, 1.05, true], [744, 0.97, true], [816, 1.03, true], [880, 0.95, true]], fw), 'kHook'))
    + lit(castShadow(400, 1345, 2.4, 'kHook') + `<g${punch(fw + 0.2, 0.035, 420, 900)}>`
      + seq(C, [[0, { mood: 'determined', look: [2.6, 0] }], [s, { mood: 'happy', look: [0, 0] }], [n, { mood: 'happy', halo: n }]]) + '</g>', 'kHook')
    + NEAR(foliage('l', 1640, { color: '#3a3424' }) + foliage('r', 1660, { color: '#3a3424', seed: 5 }));
}

// 1 · a brilliant young noblewoman; the vision of Mary and the Child (pan-r)
function scene1() {
  const br = at(1, 'brilliant'), wn = at(1, 'won to'), vs = at(1, 'vision'), mr = at(1, 'Mary');
  const C = (op) => catherine(360, 1345, 2.3, { armL: [30, 2, 3], armR: [40, 2, 3], propR: book(true), ...op });
  return layer(0.88, `<g opacity="0"${M.tw([{ at: wn - 0.3, dur: 1.0, from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>`
      + glow(760, 760, 300, 0.75) + `<g transform="translate(760,1012)">${cloudPad(1.1)}</g>` + `<g${M.bob(6, 3.4)}>${lit(maryVision(760, 1000, 1.3), 'kYouth')}</g>`
      + sparkles(14, 600, 920, 520, 980, { seed: 8 }) + '</g>')
    + lit(castShadow(360, 1345, 2.3, 'kYouth') + popAt(br, 640, 1338, scrollPile(1.2), 0.6)
      + seq(C, [[0, { mood: 'happy', look: [1.4, 1.8] }], [br, { mood: 'happy', look: [0, 0] }], [wn - 0.1, { mood: 'surprised', look: [2.6, -1.6] }],
        [vs, { mood: 'awe', look: [2.6, -1.8] }], [mr + 0.3, { mood: 'tender', look: [2.4, -1.2] }]]), 'kYouth')
    + NEAR(bokeh(6, { seed: 31 }) + foliage('l', 1650, { color: '#3e4a2a', seed: 4 }));
}

// 2 · only eighteen, she tells the emperor his idols are useless (push)
function scene2() {
  const ei = at(2, 'eighteen'), id = at(2, 'idols'), q0 = at(2, 'Call upon'), qe = at(2, 'come to you', 0.7);
  const C = (op) => catherine(300, 1345, 2.25, { armL: [14, 2, 3], ...op });
  return layer(0.92, lit(castShadow(615, 1310, 1.2, 'kEmp') + idol(615, 1310, 0.74, { stone: '#c8bca8' })
      + `<g opacity="0"${fadeIn(id, 0.6)}>${glow(615, 960, 170, 0.5)}</g>`, 'kEmp'))
    + layer(0.95, lit(castShadow(800, 1322, 2.1, 'kEmp') + seq((op) => emperorMax(800, 1322, 2.1, { flip: true, armL: [16, 2, 3], armR: [26, 2, 3], propR: sceptre, look: [2.4, 0], ...op }),
      [[0, { mood: 'stern' }], [id, { mood: 'stern', look: [2.4, 0.6] }], [qe - 0.4, { mood: 'surprised', look: [2.4, 0] }]]), 'kEmp'))
    + lit(castShadow(300, 1345, 2.25, 'kEmp') + `<g${punch(q0, 0.035, 320, 900)}>`
      + seq(C, [[0, { mood: 'worried', look: [2.6, 0], armR: [14, 2, 3] }], [id - 0.3, { mood: 'determined', look: [2.6, 0], armR: [56, 3, 2.4] }],
        [q0 - 0.2, { mood: 'determined', look: [2.6, 0], talk: [q0, qe], armR: [60, 4, 2.2] }], [qe, { mood: 'determined', look: [2.6, 0], armR: [24, 2, 3] }]]) + '</g>', 'kEmp')
    + NEAR(foliage('l', 1650, { color: '#2a2030', seed: 6 }));
}

// 3 · the fifty philosophers; instead their leader cries out that they believe (drift-l)
function scene3() {
  const fp = at(3, 'fifty'), pw = at(3, 'wrong'), ins = at(3, 'Instead'), q0 = at(3, 'We are'), qe = at(3, 'in Christ', 0.6);
  const C = (op) => catherine(320, 1345, 2.25, { look: [2.4, -0.3], ...op });
  return MID(lit(sageRow(1240, [[480, 0.98, false], [556, 1.02, false], [880, 0.96, true]], fp - 0.2), 'kDebate'))
    + layer(0.92, lit(castShadow(830, 1310, 1.85, 'kDebate') + `<g opacity="0"${fadeIn(fp, 0.6)}>` + seq((op) => sage(830, 1310, 1.85, 1, { flip: true, armL: 24, propL: scroll, look: [2.4, 0], ...op }),
      [[0, { mood: 'stern', armR: [14, 2, 3] }], [ins, { mood: 'surprised', armR: [30, 2, 3] }], [q0 + 0.5, { mood: 'joy', armR: [60, 4, 2.4] }]]) + '</g>', 'kDebate'))
    + layer(0.97, lit(castShadow(640, 1312, 2.0, 'kDebate') + `<g opacity="0"${fadeIn(fp + 0.2, 0.6)}>` + seq((op) => sage(640, 1312, 2.0, 0, { flip: true, armL: 22, propL: scroll, look: [2.4, 0], ...op }),
      [[0, { mood: 'stern', armR: [16, 2, 3] }], [pw - 0.4, { mood: 'stern', armR: [82, 4, 2.2] }], [ins, { mood: 'surprised', armR: [30, 2, 3] }],
        [q0 - 0.2, { mood: 'joy', talk: [q0, qe], armR: [132, 6, 2] }], [qe, { mood: 'awe', armR: [120, 5, 2.2], look: [0, -1.6] }]]) + '</g>', 'kDebate'))
    + lit(castShadow(320, 1345, 2.25, 'kDebate') + seq(C, [[0, { mood: 'happy', armR: [118, 6, 2.2], armL: [24, 2, 3] }], [ins, { mood: 'happy', armR: [40, 2, 3], armL: [24, 2, 3] }],
      [q0 + 0.4, { mood: 'tender', armR: [30, 2, 3], armL: [30, 2, 3] }]]), 'kDebate')
    + `<g opacity="0"${fadeIn(q0, 0.8)}>${glow(640, 880, 380, 0.4)}${sparkles(16, 420, 900, 560, 1000, { seed: 12 })}</g>`
    + NEAR(foliage('r', 1660, { color: '#3a3024', seed: 9 }));
}

// 4 · prison without food; a white dove brings her bread (pan-l)
function scene4() {
  const dv = at(4, 'white dove'), fd = at(4, 'her food');
  const C = (op) => catherine(400, 1345, 2.3, { crowned: false, kneel: true, ...PRAY, ...op });
  const dovePath = M.tw([{ at: dv - 0.5, dur: 1.6, from: { x: 230, y: -470, scale: 0.55 }, to: { x: 0, y: 0, scale: 1 }, ease: 'power2.out' }]);
  return lit(castShadow(400, 1345, 2.3, 'kCell') + seq(C, [[0, { mood: 'sad', look: [0, 1.6] }], [dv - 0.2, { mood: 'surprised', look: [2.6, -2] }],
      [fd, { mood: 'tender', look: [2.2, -1.2] }]]), 'kCell')
    + `<g opacity="0"${fadeIn(dv - 0.5, 0.4)}><g transform="translate(560,1000)"><g${dovePath}><g${M.bob(6, 2.2)}><g transform="scale(0.85)">${dove(1)}${loaf(50, 12, 0.6)}</g></g></g></g></g>`
    + `<g opacity="0"${fadeIn(dv, 1.2)}>${glow(470, 1100, 330, 0.45)}${sparkles(10, 360, 700, 820, 1180, { seed: 15, color: '#e8f0ff' })}</g>`;
}

// 5 · the wheel of spikes; she prays, and it bursts apart (dolly)
function scene5() {
  const wh = at(5, 'wheel'), pr = at(5, 'She prayed'), br = at(5, 'broke');
  const WX = 730, WY = 1090;
  const frame = `<path d="M${WX - 70} 1322 L${WX - 10} ${WY} M${WX + 70} 1322 L${WX + 10} ${WY}" stroke="#5a3a22" stroke-width="22" stroke-linecap="round"/><rect x="${WX - 90}" y="1312" width="180" height="16" rx="6" fill="#4a2e1c"/>`;
  return MID(lit(`<g opacity="0"${fadeIn(0.4, 0.8)}>${castShadow(170, 1240, 1.15, 'kWheel')}${seq((op) => emperorMax(170, 1240, 1.15, { armR: [24, 2, 3], propR: sceptre, look: [2.4, 0], ...op }),
      [[0, { mood: 'stern' }], [br + 0.2, { mood: 'surprised' }]])}</g>`, 'kWheel'))
    + layer(0.95, lit(`<g opacity="0"${M.tw([{ at: wh - 0.4, dur: 0.9, from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>${frame}`
      + `<g${M.tw([{ at: br, dur: 0.05, from: { opacity: 1 }, to: { opacity: 0 } }])}><g transform="translate(${WX},${WY}) scale(1.2)"><g${M.spin(-22)}>${spikedWheel}</g></g></g>`
      + `<g transform="translate(${WX},${WY}) scale(1.2)">${wheelPieces(br)}</g></g>`, 'kWheel'))
    + lit(castShadow(360, 1345, 2.3, 'kWheel') + seq((op) => catherine(360, 1345, 2.3, { kneel: true, ...op }),
      [[0, { mood: 'determined', look: [2.6, -0.3], armL: [14, 2, 3], armR: [14, 2, 3] }], [pr - 0.2, { mood: 'peaceful', ...PRAY }],
        [br + 0.1, { mood: 'awe', look: [2.4, -1], ...PRAY }], [br + 1.6, { mood: 'tender', ...PRAY, halo: br + 1.6 }]]), 'kWheel')
    + `<g opacity="0"${fadeIn(pr, 1.0)}>${glow(380, 760, 360, 0.5)}</g>`
    + flash(br) + `<g opacity="0"${fadeIn(br + 0.1, 0.4)}>${sparkles(18, 480, 980, 760, 1320, { seed: 19 })}</g>`
    + NEAR(foliage('r', 1660, { color: '#262230', seed: 10 }));
}

// 6 · her death told in one line (kneeling in light); angels carry her to Sinai; the quotable line (tilt-up + rack focus)
function scene6() {
  const bh = at(6, 'beheaded'), an = at(6, 'angels'), q = at(6, 'The wheel');
  const lying = `<g transform="translate(230,-10) rotate(-90)">${catherine(0, 0, 1.5, { mood: 'peaceful', armL: 4, armR: 4, ph: 0.5 })}</g>`;
  const carried = `<g transform="translate(540,1060)"><g${M.tw([{ at: an, dur: 5.5, from: { y: 0 }, to: { y: -300 }, ease: 'sine.inOut' }])}>`
    + glow(0, -60, 400, 0.55) + angelHD(-300, 210, 1.05, { armR: [76, 2, 3], armL: [60, 2, 3], look: [2.4, 0] })
    + angelHD(320, 210, 1.05, { flip: true, armR: [76, 2, 3], armL: [60, 2, 3], look: [2.4, 0] }) + lying + '</g></g>';
  return layer(1.02, lit(`<g transform="translate(165,1352)">${brokenWheel(0.85)}</g>`
      + `<g opacity="0"${fadeIn(q, 1.0)}>${glow(165, 1250, 200, 0.8)}</g>`, 'kSinai'))
    + `<g${fadeOut(an - 0.2, 0.8)}>${lit(castShadow(470, 1345, 2.3, 'kSinai') + seq((op) => catherine(470, 1345, 2.3, { kneel: true, ...PRAY, ...op }),
      [[0, { mood: 'peaceful' }], [bh, { mood: 'peaceful', halo: bh }]]), 'kSinai')}${`<g opacity="0"${fadeIn(bh, 0.9)}>${glow(470, 900, 360, 0.55)}</g>`}</g>`
    + `<g opacity="0"${fadeIn(an - 0.3, 1.0)}>${lit(carried, 'kSinai')}</g>`
    + `<g opacity="0"${fadeIn(q, 0.8)}>${sparkles(16, 260, 860, 520, 1000, { seed: 22 })}</g>`
    + NEAR(bokeh(6, { seed: 41 }));
}

// 7 · feast-day portrait: crown, halo, palm, book, the broken wheel; her monastery at Sinai behind (arc-r)
function scene7() {
  const nv = at(7, 'November'), pt = at(7, 'patron'), pr = at(7, 'pray for us');
  return layer(1.04, lit(castShadow(190, 1370, 0.9, 'kGlory') + `<g transform="translate(180,1372)">${brokenWheel(0.88)}</g>`, 'kGlory'))
    + lit(castShadow(520, 1345, 2.35, 'kGlory') + seq((op) => catherine(520, 1345, 2.35, { halo: true, armR: [28, 2, 3], propR: palm_frond(1.1, -8), ...op }),
      [[0, { mood: 'happy', look: [0, 0], armL: [24, 2, 3], propL: book(false) }], [pt, { mood: 'happy', look: [-1.4, 0.6], armL: [40, 2, 3], propL: book(true) }],
        [pr, { mood: 'tender', armL: [40, 2, 3], propL: book(true) }]]), 'kGlory')
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(520, 740, 240, 0.45)}${sparkles(8, 400, 660, 620, 820, { seed: 33 })}</g>`
    + `<g opacity="0"${fadeIn(pt, 0.6)}>${glow(440, 1130, 140, 0.6)}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 520, 900, { seed: 27 })}</g>`
    + NEAR(bokeh(7, { seed: 45 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

export const STORY = {
  slug: 'st_catherine_of_alexandria', name: 'St_Catherine_of_Alexandria',
  bg3d: './catherine_of_alexandria.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'andrew.bg3d.js': './andrew_apostle.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  music: { story: "the life of St. Catherine of Alexandria, the girl who out-argued an emperor's philosophers",
    cues: { 1: 'Wonder: soft pulsing low drum, then a shimmer of high strings and harp rising as a heavenly light appears.',
      4: 'Hushed and dark: a low cello line, almost still, then a tender lift of strings as hope arrives.' } },
  cast: { catherine: { voice: 'bf_emma', speed: 0.95 }, philosopher: { voice: { bm_lewis: 0.6, am_onyx: 0.4 }, speed: 0.9 } },
  thumb_hook: "Fifty wise men couldn't break her", thumb_title: 'St. Catherine of Alexandria', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [1024, 1280, 'r']],
  fix: {
    'twˈɛnti fˈaɪv': 'twˈɛnti fˈɪfθ',      // November 25 -> November twenty-fifth
  },
  scenes: [
    { kicker: 'ALEXANDRIA, EGYPT · ABOUT 305', title: 'Fifty Against One', art: scene0, bg3d: 'kHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ["An emperor sent fifty wise men to break one girl's faith.", 'This is Saint Catherine of Alexandria.'] },
    { kicker: 'A NOBLE GIRL OF ALEXANDRIA', title: 'A Brilliant Mind', art: scene1, bg3d: 'kYouth', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Her ancient story says she was a brilliant young noblewoman, won to Christ by a vision of Mary.'] },
    { kicker: 'THE EMPEROR MAXENTIUS', title: 'She Faced the Emperor', art: scene2, bg3d: 'kEmp', front3d: true, cam: { move: 'push', oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['She was only eighteen, but she told the emperor his idols were useless:', { text: 'Call upon them in need, and they cannot come to you.', who: 'catherine' }] },
    { kicker: 'FIFTY PHILOSOPHERS', title: 'The Great Debate', art: scene3, bg3d: 'kDebate', front3d: true, cam: 'drift-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['So he sent fifty philosophers to prove her wrong.', 'Instead, they cried out:', { text: 'We are all converted, and believe in Christ.', who: 'philosopher' }] },
    { kicker: 'THE PRISON', title: 'Fed by a Dove', art: scene4, bg3d: 'kCell', front3d: true, cam: 'pan-l',
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['In prison, he starved her.', 'But tradition says a white dove brought her food.'] },
    { kicker: 'THE WHEEL', title: 'The Wheel Shattered', art: scene5, bg3d: 'kWheel', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 380, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Then he built a wheel of spikes.', { text: 'She prayed, and the wheel broke into pieces.', speed: 0.85 }] },
    { kicker: 'MOUNT SINAI', title: 'Carried by Angels', art: scene6, bg3d: 'kSinai', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['At last, he had her beheaded.', 'Tradition says angels carried her body to Mount Sinai.', 'The wheel broke before her faith ever did.'] },
    { kicker: 'FEAST DAY · NOVEMBER 25', title: 'Saint Catherine', art: scene7, bg3d: 'kGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is November 25, and she is the patron of students and philosophers.', 'Saint Catherine of Alexandria, pray for us.'] },
  ],
};
