// St. Albert of Louvain (c. 1166–1192), bishop of Liège and martyr (whole life). Feast: November 21.
// All-3D backgrounds (albert_of_louvain.bg3d.js, built on anglia() from edmund_last_stand.bg3d.js); cam3d; characters hd().
// Sources: Wikipedia "Albert of Louvain" (born c. 1166 at Louvain, son of Duke Godfrey III and brother of Henry I of
// Brabant; elected 8 September 1191 though under the canonical age of 30; Henry VI backed Lothar of Hochstaden; appealed to
// Celestine III, made cardinal May 1192; priest and bishop at Reims, 19–20 September 1192; persuaded by German knights to ride
// outside Reims and killed, 24 November 1192; buried in Reims Cathedral; canonized by Paul V, 9 August 1613; attributes:
// cardinal's attire, three swords); Catholic Encyclopedia "St. Albert of Louvain" (chosen "by the suffrages of both people
// and chapter"; Henry VI "violently intruded his own venal choice"; Celestine III made him cardinal and sent him to Reims;
// German knights of the Emperor's following "took advantage of the confiding kindness" of the bishop; feast 21 November);
// Catholic Online (canon of Liège at twelve; "greeted them with his customary gentleness").
// No words of Albert are recorded, so there is no character voice. The death is shown bloodless: swords raised, a flash of
// light, then the saint kneeling in peace with his halo; no blow is shown.
// Exported for later reels: albertL, knight, emperorHenry, popeCelestine, kiteShield, threeSwords, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, book, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { sword } from './joan_of_arc.mjs';
import { mitre } from './francis.mjs';
import { crozier, horse } from './martin_of_tours.mjs';
import { crown, heavenCrown } from './edmund_last_stand.mjs';
import { pallium } from './leo_the_great.mjs';
import { tiara } from './charles_borromeo.mjs';
import { circlet } from './elizabeth_of_hungary_roses.mjs';

const at = wordTimes('st_albert_of_louvain');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;

// ================================================================ props
const pectoralCross = `<path d="M-14 -200 Q0 -176 0 -166 Q0 -176 14 -200" stroke="${GOLD}" stroke-width="2.5" fill="none"/><path d="M0 -170 v24 M-8 -161 h16" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
/** A white surplice with a lace hem over a black cassock (body space). */
const surplice = '<path d="M-40 -208 Q0 -196 40 -208 L64 -74 Q0 -60 -64 -74Z" fill="#f8f4ec"/><path d="M14 -204 L40 -208 L64 -74 L34 -68Z" fill="#e4ded2" opacity=".8"/>'
  + '<path d="M-64 -74 Q0 -60 64 -74" stroke="#e8e2d6" stroke-width="6" fill="none" stroke-dasharray="5 4"/>';
/** A small ducal coronet (circlet with pearls). */
const ducal = circlet();
/** Mail rings over a knight's tunic (body space). */
const mailRings = (() => {
  let d = '';
  for (let r = 0; r < 9; r++) for (let c = 0; c < 8; c++) { const x = -44 + c * 12.6 + (r % 2) * 6, y = -196 + r * 14; d += `M${f(x - 5)} ${y} a5 4 0 0 0 10 0 `; }
  return `<path d="${d}" stroke="#5a6270" stroke-width="2" fill="none" opacity=".55"/>`;
})();
/** A surcoat (sleeveless tunic) over the mail, with a belt. */
const surcoat = (c) => `<path d="M-30 -196 L30 -196 L52 -8 L-52 -8Z" fill="${c}"/><path d="M10 -196 L30 -196 L52 -8 L24 -8Z" fill="${dark(c, 0.3)}" opacity=".6"/>`
  + '<path d="M-38 -110 Q0 -102 38 -110" stroke="#3a2a1e" stroke-width="8" fill="none"/>';
/** A conical helmet with a nose guard, over a mail coif. */
const nasalHelm = '<g><path d="M-48 -236 Q-52 -196 -42 -176 L42 -176 Q52 -196 48 -236 Q44 -214 34 -210 L-34 -210 Q-44 -214 -48 -236Z" fill="#8a929e"/>'
  + '<path d="M-44 -258 Q-42 -320 0 -334 Q42 -320 44 -258 Q0 -270 -44 -258Z" fill="#9aa4b2"/><path d="M8 -332 Q40 -316 44 -258 Q30 -262 16 -264Z" fill="#6a7684" opacity=".7"/>'
  + '<path d="M-44 -258 Q0 -270 44 -258 L44 -268 Q0 -280 -44 -268Z" fill="#6a7684"/><rect x="-4" y="-270" width="8" height="30" rx="3" fill="#7a8694"/>'
  + '<path d="M-30 -302 Q-18 -318 -4 -322" stroke="#e2e8ee" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/></g>';
/** The emperor's kite shield: a black eagle on gold (centre at 0,0). */
export const kiteShield = (s = 1) => `<g transform="scale(${s})"><path d="M-36 -54 Q0 -64 36 -54 Q38 10 0 76 Q-38 10 -36 -54Z" fill="#7a5a2a"/>`
  + '<path d="M-31 -49 Q0 -58 31 -49 Q32 8 0 67 Q-32 8 -31 -49Z" fill="#e8c24a"/><path d="M6 -55 Q31 -49 31 -49 Q32 8 0 67 Q20 10 6 -55Z" fill="#c8a03a" opacity=".6"/>'
  + '<g fill="#2a2228"><circle cx="0" cy="-26" r="6"/><path d="M0 -20 L-6 10 L0 24 L6 10Z"/><path d="M-4 -16 Q-22 -30 -26 -6 Q-16 -10 -4 -4Z M4 -16 Q22 -30 26 -6 Q16 -10 4 -4Z"/>'
  + '<path d="M-4 22 L-10 32 M4 22 L10 32" stroke="#2a2228" stroke-width="3"/></g></g>';
/** A sword held up (hilt in the hand). */
const raisedSword = `<g transform="rotate(10)">${sword}</g>`;
/** His emblem: three swords fanned out in a glow (centre at 0,0). */
export const threeSwords = (s = 1) => `<g transform="scale(${s})"><circle cy="-60" r="130" fill="url(#haloGlow)" opacity=".85"/>`
  + [-28, 0, 28].map((r) => `<g transform="rotate(${r})">${sword}</g>`).join('') + '</g>';
/** The mitre fallen on the road (origin on the ground). */
const fallenMitre = (s = 1) => `<g transform="scale(${s})"><ellipse cx="0" cy="4" rx="44" ry="8" fill="#1a0f1a" opacity=".25"/><g transform="rotate(-72) translate(0,330)">${mitre}</g></g>`;

// ================================================================ characters
const SKA = '#efc6a2', HAIRA = '#8a5a34';
/** St. Albert of Louvain: young, clean-shaven, chestnut hair. bishop: mitre + pectoral cross; cardinal: red cope. */
export const albertL = (x, y, s, { bishop = true, cardinal = true, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#f4efe4', plain: true, mantle: cardinal ? '#b3202e' : null, lining: GOLD, trim: GOLD, belt: false, skin: SKA, hair: HAIRA, hairStyle: 'short', beard: null,
  age: 'young', iris: '#4a6a8a', shoes: '#b3202e', ...o, over: (bishop ? pectoralCross + mitre : '') + over });
/** Albert as a cleric of Liège: black cassock and white surplice (kid: the boy canon). */
const albertCanon = (x, y, s, { kid = false, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#24202a', plain: true, mantle: null, belt: false, skin: SKA, hair: HAIRA, hairStyle: 'short', beard: null, age: 'young', iris: '#4a6a8a', shoes: '#1a1820',
  ...o, over: surplice + over });
/** Albert as a boy at his father's court: blue tunic with gold trim. */
const albertBoy = (x, y, s, o = {}) => hd(x, y, s, { top: '#3f6fb8', mantle: null, trim: GOLD, belt: '#c8963e', skin: SKA, hair: HAIRA, hairStyle: 'short', beard: null,
  age: 'young', iris: '#4a6a8a', shoes: '#5a3a22', ...o });
/** Duke Godfrey III of Brabant: dark tunic, gold mantle, ducal coronet, brown beard. */
const godfrey = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#2e2a3a', mantle: '#c8963e', lining: '#2a2630', trim: GOLD, belt: '#c8963e', skin: '#e8bc9a',
  hair: '#6a4a30', beard: '#6a4a30', beardStyle: 'short', age: 'mid', iris: '#4a5a6a', shoes: '#3a2a1e', ...o, over: ducal + over });
/** A knight of 1192: mail, surcoat, conical helmet with a nose guard. */
export const knight = (x, y, s, { coat = '#6a2a2a', helm = true, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#8e98a6', mantle: '#3a3440', lining: '#6a6070', trim: '#9aa4b2', plain: true, belt: false, skin: '#e6bc98', hair: '#5a3e2a', beard: '#5a3e2a', beardStyle: 'short',
  age: 'mid', shoes: '#3a2a1e', iris: '#4a5a6a', ...o, over: mailRings + surcoat(coat) + (helm ? nasalHelm : '') + over });
/** Emperor Henry VI: purple tunic, red mantle with ermine lining, crown. */
export const emperorHenry = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#5a2a6a', mantle: '#8a1e2e', lining: '#f2ece0', trim: GOLD, belt: '#c8963e',
  skin: '#e8bc9a', hair: '#8a5a2e', beard: '#8a5a2e', beardStyle: 'short', age: 'mid', iris: '#4a5a6a', shoes: '#3a2a1e', mood: 'stern', ...o, over: crown + over });
/** Lothar of Hochstaden, the emperor's bishop: dark violet with a gold mantle and mitre. */
const lothar = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#3a2a4a', plain: true, mantle: '#8a6a2a', lining: '#3a2a4a', trim: GOLD, belt: false,
  skin: '#e2b48f', hair: '#3a2a20', beard: null, age: 'mid', iris: '#3a2a20', shoes: '#3a2a1e', ...o, over: pectoralCross + mitre + over });
/** Pope Celestine III (very old in 1191): white, red mantle, pallium, tiara. */
export const popeCelestine = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#f6f0e2', plain: true, mantle: '#b3202e', lining: GOLD, trim: GOLD, belt: false,
  skin: '#e8c0a0', hair: '#eee8de', hairStyle: 'old', beard: '#eee8de', beardStyle: 'long', age: 'old', iris: '#4a3a2a', shoes: '#b3202e', ...o, over: pallium + tiara + over });
/** A townsperson of Liège (i picks the look). */
const TOWN = [['#7a5a4a', '#e6bc98', '#4a3424', null], ['#4a6a5a', '#d9a47e', '#8a6a4a', '#8a6a4a'], ['#8a6a3a', '#efc6a2', '#2a1c14', null], ['#5a5a8a', '#e0b08a', '#5a3a24', null]];
const townsman = (x, y, s, i = 0, o = {}) => { const [c, sk, h, b] = TOWN[i % 4];
  return hd(x, y, s, { top: c, mantle: null, skin: sk, hair: h, beard: b, age: i === 1 ? 'old' : 'mid', shoes: '#4a3424', ...(i % 2 ? {} : { veil: light(c, 0.55), veilHair: 'covered' }), ...o }); };

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  aHook:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
  aYouth: { key: '#fff0d0', from: 'r', tint: '#fff4e4', amt: 0.05, rim: '#fff6e0', rimOp: 0.6 },
  aElect: { key: '#ffe0b0', from: 'r', tint: '#e8e0dc', amt: 0.08, rim: '#fff0d4', rimOp: 0.6 },
  aRome:  { key: '#ffd8a0', from: 'l', tint: '#ffe6c0', amt: 0.1, rim: '#fff0c8', rimOp: 0.8 },
  aRoad:  { key: '#ffe0c0', from: 'top', tint: '#b0a8d8', amt: 0.18, rim: '#ffe8d0', rimOp: 0.85 },
  aSaint: { key: '#ffc888', from: 'l', tint: '#ffe0b0', amt: 0.12, rim: '#fff0c8', rimOp: 0.8 },
  aGlory: { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `alit${++LID}`, d = 5;
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
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[LIGHT[mode].from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262.
// 0 · hook: the bishop at dusk before Reims; the emperor's knights greet him as friends (push-fast)
function scene0() {
  const k = at(0, 'had come'), s = at(0, 'This is'), n = at(0, 'Saint Albert');
  const A = (op) => albertL(380, 1345, 2.4, { armL: [18, 2, 3], propL: crozier, armR: [22, 2, 3], ...op });
  const K1 = (op) => knight(800, 1310, 2.0, { flip: true, armL: 30, propL: kiteShield(1), look: [2.4, 0], ...op });
  const K2 = (op) => knight(640, 1262, 1.6, { flip: true, coat: '#2f4a6a', armL: 26, propL: kiteShield(0.9), look: [2.4, 0], ...op });
  return layer(0.78, lit(castShadow(640, 1262, 1.6, 'aHook') + seq(K2, [[0, { mood: 'happy', armR: [40, 2, 3] }], [k, { mood: 'stern', armR: [40, 2, 3] }]]), 'aHook'))
    + layer(0.92, lit(castShadow(800, 1310, 2.0, 'aHook') + seq(K1, [[0, { mood: 'happy', armR: [46, 3, 2.6] }], [k, { mood: 'stern', armR: 110, propR: raisedSword }]]), 'aHook'))
    + lit(castShadow(380, 1345, 2.4, 'aHook') + `<g${punch(k, 0.035, 420, 900)}>`
      + seq(A, [[0, { mood: 'happy', look: [2.6, 0] }], [s, { mood: 'happy', look: [0, 0] }], [n, { mood: 'happy', look: [0, 0], halo: n }]]) + '</g>', 'aHook')
    + NEAR(foliage('l', 1640, { color: '#2a2440' }) + foliage('r', 1660, { color: '#2a2440', seed: 5 }));
}

// 1 · Louvain 1166: the duke's son; a canon of Liège at twelve (pan-r)
function scene1() {
  const sv = at(1, 'served'), tw = at(1, 'twelve');
  return layer(0.95, lit(castShadow(720, 1322, 2.1, 'aYouth') + seq((op) => godfrey(720, 1322, 2.1, { flip: true, armL: [16, 2, 3], armR: [40, 3, 2.6], ...op }),
      [[0, { mood: 'happy', look: [2.6, 0.6] }], [sv, { mood: 'tender', look: [2.6, 0.6] }]]), 'aYouth'))
    + lit(castShadow(420, 1345, 1.45, 'aYouth')
      + seq((op) => (op.canon ? albertCanon : albertBoy)(420, 1345, 1.45, { ...op }),
        [[0, { mood: 'joy', look: [2.4, -1], armL: [14, 2, 3], armR: [60, 4, 2.2] }],
         [sv, { canon: true, mood: 'happy', look: [0, 0], armL: 30, armR: 30, propR: `<g transform="translate(-30,10)">${book(true)}</g>` }]]), 'aYouth')
    + `<g opacity="0"${fadeIn(tw, 0.6)}>${sparkles(12, 280, 560, 880, 1180, { seed: 3 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#2e4a2a', seed: 2 }));
}

// 2 · Liège 1191: the people choose him; the emperor forces in his own man (drift)
function scene2() {
  const ch = at(2, 'Liège chose'), ag = at(2, 'twenty-five'), em = at(2, 'But Emperor'), mn = at(2, 'own man');
  const crowdG = [[560, 0, 1.25], [650, 1, 1.3], [740, 2, 1.2], [835, 3, 1.25]].map(([x, i, s]) =>
    castShadow(x, 1262, s, 'aElect') + seq((op) => townsman(x, 1262, s, i, { flip: true, look: [2.4, -0.4], ...op }),
      [[0, { mood: 'happy', armR: 16 }], [ch, { mood: 'joy', armR: [130, 8, 1.1 + i * 0.13] }], [em, { mood: 'worried', armR: 16 }]])).join('');
  return layer(0.78, lit(`<g${fadeOut(em + 0.3, 0.8)}>${crowdG}</g>`, 'aElect'))
    + layer(0.78, lit(`<g opacity="0"${walkIn(mn - 0.4, 160, 1.0)}>${castShadow(620, 1262, 1.5, 'aElect')}${lothar(620, 1262, 1.5, { flip: true, mood: 'happy', armL: 14, armR: 14, look: [2.4, 0] })}</g>`, 'aElect'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(em, 220, 1.1)}>${castShadow(800, 1310, 2.05, 'aElect')}${emperorHenry(800, 1310, 2.05, { flip: true, armL: 20, armR: [84, 3, 2.4], look: [2.4, 0] })}</g>`, 'aElect'))
    + lit(castShadow(330, 1345, 2.25, 'aElect') + seq((op) => albertCanon(330, 1345, 2.25, { armL: [14, 2, 3], armR: [14, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [2.4, 0] }], [ch, { mood: 'surprised', look: [2.4, -0.4] }], [ag, { mood: 'worried', look: [0, 1.6] }], [em, { mood: 'sad', look: [2.6, 0] }]]), 'aElect')
    + NEAR(foliage('l', 1640, { color: '#2e3a2a', seed: 4 }));
}

// 3 · Rome 1192: he takes his case to the pope, is made a cardinal, then a bishop at Reims (dolly)
function scene3() {
  const pc = at(3, 'Pope'), cd = at(3, 'cardinal'), bp = at(3, 'He became');
  const A = (op) => albertL(380, 1345, 2.3, { ...op });
  return layer(0.95, lit(castShadow(760, 1322, 2.1, 'aRome') + seq((op) => popeCelestine(760, 1322, 2.1, { flip: true, armL: 18, look: [2.6, 0.6], ...op }),
      [[0, { mood: 'happy', armR: [24, 2, 3] }], [pc, { mood: 'tender', armR: [110, 3, 2.4] }], [bp, { mood: 'happy', armR: [30, 2, 3], look: [2.6, 0] }]]), 'aRome'))
    + lit(castShadow(380, 1345, 2.3, 'aRome') + seq(A, [
      [0, { bishop: false, cardinal: false, kneel: true, mood: 'determined', look: [2.4, -1], armL: 34, armR: 34 }],
      [pc, { bishop: false, cardinal: false, kneel: true, mood: 'awe', look: [2.4, -1.4], armL: 34, armR: 34 }],
      [cd, { bishop: false, cardinal: true, kneel: true, mood: 'tender', look: [2.4, -1.4], armL: 34, armR: 34 }],
      [bp, { bishop: true, cardinal: true, mood: 'determined', look: [0, 0], armL: [16, 2, 3], propL: crozier, armR: [20, 2, 3] }]]), 'aRome')
    + `<g opacity="0"${fadeIn(cd, 0.6)}>${sparkles(14, 230, 560, 760, 1100, { seed: 8 })}</g>`
    + `<g opacity="0"${fadeIn(bp, 0.8)}>${glow(380, 820, 300, 0.4)}</g>`
    + NEAR(bokeh(6, { seed: 31 }) + foliage('r', 1650, { color: '#3a3a26', seed: 7 }));
}

// 4 · outside Reims, November 1192: the knights come as friends, ask him to ride out, and strike him down (tilt-up + rack)
function scene4() {
  const fr = at(4, 'as friends'), tr = at(4, 'trusted'), rd = at(4, 'ride outside'), st = at(4, 'There, on the road'), sd = at(4, 'struck him', 0.1);
  const A = (op) => albertL(330, 1345, 2.3, { ...op });
  const K = (x, y, s, coat, ph) => (op) => knight(x, y, s, { flip: true, coat, armL: 26, propL: kiteShield(0.95), ph, ...op });
  const knights = [[650, 1322, 1.95, '#6a2a2a', 0.1], [800, 1322, 2.0, '#2f4a6a', 0.6]].map(([x, y, s, c, ph], i) =>
    `<g${walkIn(fr - 0.6 + i * 0.25, 200, 1.1)}>${castShadow(x, y, s, 'aRoad')}`
    + seq(K(x, y, s, c, ph), [[0, { mood: 'happy', armR: [46, 3, 2.6], look: [2.4, 0] }], [st, { mood: 'stern', armR: 150, propR: raisedSword, look: [2.4, 0] }]]) + '</g>').join('');
  return MID(lit(`<g opacity="0"${fadeIn(rd, 0.8)}>${horse(960, 1250, 0.7, { flip: true, c: '#6a4a36', mane: '#2a1c14', cloth: '#6a2a2a' })}</g>`, 'aRoad'))
    + layer(0.95, lit(`<g${fadeOut(sd, 0.3)}>${knights}</g>`, 'aRoad'))
    + lit(castShadow(330, 1345, 2.3, 'aRoad') + seq(A, [
      [0, { mood: 'happy', look: [2.4, 0], armL: [16, 2, 3], armR: [22, 2, 3] }],
      [tr, { mood: 'tender', look: [2.4, 0], armL: [16, 2, 3], armR: [40, 3, 2.6] }],
      [st, { mood: 'surprised', look: [2.4, 0], armL: 40, armR: 40 }],
      [sd + 0.12, { bishop: false, kneel: true, mood: 'peaceful', look: [0, -1], armL: 34, armR: 34, halo: sd + 0.2 }]])
      + `<g opacity="0"${fadeIn(sd + 0.12, 0.3)}><g transform="translate(520,1342)">${fallenMitre(2.0)}</g></g>`, 'aRoad')
    + `<g opacity="0"${fadeIn(sd, 0.15)}><g${fadeOut(sd + 0.18, 0.6)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff4dc" opacity=".7"/></g></g>`
    + `<g opacity="0"${fadeIn(sd + 0.2, 0.8)}>${glow(330, 800, 420, 0.5)}${sparkles(14, 160, 520, 600, 1000, { seed: 12 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#1e1a2e', seed: 10 }) + foliage('r', 1650, { color: '#1e1a2e', seed: 11 }));
}

// 5 · 1613: declared a saint; the martyr's crown (pull)
function scene5() {
  const ds = at(5, 'declared him'), nv = at(5, 'He never'), mc = at(5, "martyr's crown");
  const X = 420, Y = 1345, S = 2.3;
  const pilgrims = [[640, 0, 1.2], [740, 1, 1.15], [830, 2, 1.1]].map(([x, i, s]) =>
    `<g${M.drift(50, 0)}>${castShadow(x, 1262, s, 'aSaint')}${townsman(x, 1262, s, i, { flip: true, mood: 'happy', armR: 20, look: [2, -0.6] })}</g>`).join('');
  return MID(lit(pilgrims, 'aSaint'))
    + layer(0.9, popAt(ds, 800, 640, `<g${M.bob(5, 3)}>${threeSwords(1.1)}</g>`, 0.7))
    + lit(castShadow(X, Y, S, 'aSaint') + seq((op) => albertL(X, Y, S, { bishop: false, halo: true, armL: [16, 2, 3], armR: 34, propR: palm_frond(1.1, -10, 2), ...op }),
      [[0, { mood: 'happy', look: [2.2, -0.4] }], [nv, { mood: 'happy', look: [0, 0] }], [mc, { mood: 'tender', look: [0, -0.6] }]])
      + `<g transform="translate(${X},${Y}) scale(${S})"><g opacity="0"${M.tw([{ at: mc - 0.9, dur: 0.9, from: { y: -160, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }])}>${heavenCrown}</g></g>`, 'aSaint')
    + `<g opacity="0"${fadeIn(mc, 0.8)}>${sparkles(16, 240, 600, 420, 760, { seed: 18 })}</g>`
    + NEAR(bokeh(7, { seed: 23 }) + foliage('l', 1650, { color: '#3a4a28', seed: 12 }));
}

// 6 · feast-day portrait: bishop and cardinal, crozier, palm, three swords (arc-r)
function scene6() {
  const fd = at(6, 'feast'), pr = at(6, 'pray for us');
  return layer(0.9, popAt(fd, 170, 760, `<g${M.bob(5, 3.2)}>${threeSwords(1.0)}</g>`, 0.8))
    + lit(castShadow(560, 1345, 2.35, 'aGlory') + seq((op) => albertL(560, 1345, 2.35, { halo: true, armL: [16, 2, 3], propL: crozier, armR: 34, propR: palm_frond(1.05, -8, 2), ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [fd, { mood: 'happy', look: [-2.4, -0.6] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'aGlory')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 480, 900, { seed: 21 })}</g>`
    + NEAR(bokeh(7, { seed: 25 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

export const STORY = {
  slug: 'st_albert_of_louvain', name: 'St_Albert_of_Louvain',
  bg3d: './albert_of_louvain.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  thumb_hook: 'Betrayed by knights who smiled', thumb_title: 'St. Albert of Louvain', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti wˈʌn': 'noʊvˈɛmbɚ twˈɛnti fˈɜːst',   // November 21 -> November twenty-first
    'lˈuːveɪn': 'luːvˈæn',          // Louvain: loo-VAN
    'lˈiːdʒ': 'liˈɛʒ',              // Liège: lee-EZH
    'ɹˈaɪmz': 'ɹˈiːmz',             // Reims: REEMZ (English)
    'səlˈɛstiːn': 'sˈɛləstaɪn',     // Celestine: SEL-es-tine
  },
  scenes: [
    { kicker: 'REIMS, FRANCE · 1192', title: 'The Knights Who Smiled', art: scene0, bg3d: 'aHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ["The emperor's knights greeted a young bishop as friends.", 'They had come to kill him.', 'This is Saint Albert of Louvain.'] },
    { kicker: 'LOUVAIN · 1166', title: "A Duke's Son", art: scene1, bg3d: 'aYouth', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ["Born a duke's son in 1166, he served the Church at Liège from the age of twelve."] },
    { kicker: 'LIÈGE · 1191', title: 'The Emperor Said No', art: scene2, bg3d: 'aElect', front3d: true, cam: 'drift-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['In 1191, Liège chose him as bishop, at just twenty-five.', 'But Emperor Henry VI forced in his own man.'] },
    { kicker: 'ROME · 1192', title: 'He Went to the Pope', art: scene3, bg3d: 'aRome', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Instead of fighting, he took his case to Pope Celestine III, who upheld him and made him a cardinal.', 'He became a bishop in exile, at Reims, in France.'] },
    { kicker: 'OUTSIDE REIMS · NOV 1192', title: 'Betrayed on the Road', art: scene4, bg3d: 'aRoad', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ["Weeks later, the emperor's knights came to Reims as friends.", 'Albert trusted them.', 'They asked him to ride with them outside the city.',
        { text: 'There, on the road, they struck him down.', speed: 0.85 }, 'He was only twenty-six.'] },
    { kicker: 'CANONIZED · 1613', title: "A Martyr's Crown", art: scene5, bg3d: 'aSaint', front3d: true, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['In 1613, Pope Paul V declared him a saint.', "He never ruled his city, but he won a martyr's crown."] },
    { kicker: 'FEAST DAY · NOVEMBER 21', title: 'Saint Albert of Louvain', art: scene6, bg3d: 'aGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 21.', 'Saint Albert of Louvain, pray for us.'] },
  ],
};
