// St. Paul Lê Bảo Tịnh: the letter from prison (one story). Feast: November 24, with St. Andrew Dũng-Lạc and the 116 other
// Martyrs of Vietnam (his own memorial: April 6). All-3D backgrounds (paul_le_bao_tinh_letter.bg3d.js: tonkin() from
// theophane_venard_cage.bg3d.js and the prison cell of alexandria() from catherine_of_alexandria.bg3d.js); cam3d; hd().
// Sources: Our Sunday Visitor, "This Vietnamese martyr turned suffering into a hymn of praise" (M. Hierholzer, 2025: born
// 1793 to wealthy parents; seminary at 12, then a hermit; arrested in 1841 for missionary work; seven years in prison in
// Hanoi; in 1848 political changes lifted his death sentence; renewed his studies and was later ordained; arrested again
// in 1855 for working as a priest; beheaded; the letter: "I, Paul, in chains for the name of Christ, wish to relate to you
// the trials besetting me daily", "The prison is truly a living example of hell: to chains, shackles and manacles are added
// anger, vengeance...", "by the grace of God I am full of joy and happiness, because I am not alone, but Christ is with me",
// "He, my teacher, sustains the whole weight of the cross" (kept for the caption); Benedict XVI quotes it in Spe Salvi);
// Daria Sockey, "From a letter of St. Paul..." (2012: the letter to the seminary of Ke-Vinh, 1843, is the second reading of
// the Office of Readings on November 24); Vietnamese Martyrs website (born 1793 at Trịnh-Hà, Tonkin; beheaded; beatified
// 1909); catholicreadings.org and the Vatican list of the 117 (died 6 April 1857; canonized June 19, 1988 by John Paul II).
// In 1843 he was not yet a priest (ordained after 1848), so the hook never calls him one. Bloodless: no blow is shown; at
// "beheaded" he kneels in prayer in a growing light, the executioner's saber hanging at his side, far off.
// Exported for later reels: paulTinh, seminarian, manacle, brokenChain, stole, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, f, palm_frond, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { khanDong, aoDai } from './andrew_dung_lac.mjs';
import { guardVN, executioner, villagerVN, theophane, letterProp } from './theophane_venard_cage.mjs';
import { jesusHD } from './andrew_apostle.mjs';

const at = wordTimes('st_paul_le_bao_tinh_letter');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.035, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props
/** An iron manacle on the wrist with a chain hanging from it (held in the hand at 0,0). */
export const manacle = '<g><path d="M0 8 q-9 14 0 26 q9 14 0 26 q-9 14 0 26" stroke="#4a4e58" stroke-width="7" fill="none" stroke-linecap="round"/>'
  + '<path d="M0 8 q-9 14 0 26 q9 14 0 26 q-9 14 0 26" stroke="#8a909c" stroke-width="2.4" fill="none" stroke-dasharray="6 8" stroke-linecap="round"/>'
  + '<rect x="-16" y="-9" width="32" height="18" rx="7" fill="#4a4e58"/><rect x="-14" y="-8" width="28" height="6" rx="3" fill="#9aa0ac"/></g>';
// shackles on the ankles with a sagging chain between them (standing), or a chain across the knees (kneeling); body space
const ankleChain = '<g><rect x="-31" y="-26" width="28" height="13" rx="5" fill="#4a4e58"/><rect x="3" y="-26" width="28" height="13" rx="5" fill="#4a4e58"/>'
  + '<path d="M-17 -16 Q0 10 17 -16" stroke="#4a4e58" stroke-width="6" fill="none"/><path d="M-17 -16 Q0 10 17 -16" stroke="#9aa0ac" stroke-width="2" fill="none" stroke-dasharray="5 7"/></g>';
const kneeChain = '<g><path d="M-66 -96 Q0 -64 66 -96" stroke="#4a4e58" stroke-width="7" fill="none"/><path d="M-66 -96 Q0 -64 66 -96" stroke="#9aa0ac" stroke-width="2.4" fill="none" stroke-dasharray="6 8"/>'
  + '<rect x="-80" y="-104" width="28" height="14" rx="6" fill="#4a4e58"/><rect x="52" y="-104" width="28" height="14" rx="6" fill="#4a4e58"/></g>';
/** A priest's white stole with gold crosses, over the tunic (body space). */
export const stole = (kneel = false) => { const e = kneel ? -112 : -40;
  return `<g><path d="M-15 -207 Q-18 -150 -21 ${e} M15 -207 Q18 -150 21 ${e}" stroke="#f4eee0" stroke-width="12" fill="none" stroke-linecap="round"/>`
    + `<path d="M-21 ${e - 20} v-14 M-27 ${e - 27} h12 M21 ${e - 20} v-14 M15 ${e - 27} h12" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/></g>`; };
/** A broken chain lying on the ground (base at 0,0); links and one link snapped open. */
export const brokenChain = (s = 1) => {
  const link = (x, y, r) => `<g transform="translate(${x},${y}) rotate(${r})"><ellipse rx="22" ry="12" fill="none" stroke="#4a4e58" stroke-width="8"/><ellipse rx="22" ry="12" fill="none" stroke="#a8aeb8" stroke-width="2.6" stroke-dasharray="14 40"/></g>`;
  return `<g transform="scale(${s})"><ellipse cy="8" rx="140" ry="12" fill="#140c14" opacity=".22"/>${link(-110, -6, 10)}${link(-74, -12, -24)}${link(-36, -8, 18)}`
    + `<path d="M-6 -10 A22 12 0 1 1 16 4" fill="none" stroke="#4a4e58" stroke-width="8" stroke-linecap="round"/>`
    + `${link(64, -6, -14)}${link(102, -12, 22)}<rect x="-142" y="-20" width="30" height="16" rx="6" fill="#4a4e58"/></g>`;
};

// ================================================================ characters
const SKP = '#d6a074';
/** St. Paul Lê Bảo Tịnh: a Vietnamese man of about fifty in a dark áo dài and black khăn đóng turban, short greying beard.
 * chained: manacles on both wrists (unless a hand holds something) and shackles on the ankles; priest: a white stole. */
export const paulTinh = (x, y, s, { chained = true, priest = false, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#26242e', plain: true, trim: '#1c1a22', belt: false, mantle: null, skin: SKP, hair: '#2e2a26', beard: '#5a5450', beardStyle: 'short',
  hairStyle: 'short', age: 'mid', iris: '#2e2018', ...(chained ? { propL: manacle, propR: manacle } : {}), ...o,
  over: aoDai('#26242e') + khanDong('#18151c') + (priest ? stole(o.kneel) : '') + (chained ? (o.kneel ? kneeChain : ankleChain) : '') + over });
const SEM = [['#efe6d2', '#18151c'], ['#e2d8c2', '#26222e'], ['#ece4d4', '#1c1820']];
/** A young Vietnamese seminarian: a pale áo dài and a black turban. */
export const seminarian = (x, y, s, i = 0, { over = '', ...o } = {}) => hd(x, y, s, {
  top: SEM[i % 3][0], plain: true, trim: SEM[i % 3][0], belt: false, mantle: null, skin: ['#e0b08a', '#d6a074', '#cf9a70'][i % 3], hair: '#15100c', beard: null,
  hairStyle: 'short', age: 'young', iris: '#2e2018', ...o, over: aoDai(SEM[i % 3][0]) + khanDong(SEM[i % 3][1]) + over });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  pHook:   { key: '#ffb070', from: 'l', tint: '#8a8ab8', amt: 0.2, rim: '#ffc890', rimOp: 0.85 },
  pArrest: { key: '#ffe0b8', from: 'l', tint: '#f4dcc4', amt: 0.08, rim: '#ffe4c0', rimOp: 0.75 },
  pCell:   { key: '#c8d8ff', from: 'r', tint: '#9aa8d8', amt: 0.24, rim: '#d8e4ff', rimOp: 0.9 },
  pSem:    { key: '#fff0c8', from: 'r', tint: '#fff0d4', amt: 0.06, rim: '#fff4d8', rimOp: 0.75 },
  pCell2:  { key: '#ffe0b0', from: 'r', tint: '#b0a8d0', amt: 0.18, rim: '#ffe4b8', rimOp: 0.95 },
  pField:  { key: '#fff0c8', from: 'top', tint: '#fff0d4', amt: 0.08, rim: '#fff4d8', rimOp: 0.8 },
  pGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `litp${++LID}`, d = 5;
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
// cam3d feet art y: depth 1 ~1345, 0.97 ~1312, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262, MID 0.75 ~1240.
// 0 · hook: chained in the citadel at night, the letter in his hand, smiling; guards behind (push-fast)
function scene0() {
  const jy = at(0, 'joy'), s = at(0, 'This is'), n = at(0, 'Saint Paul');
  const P = (op) => paulTinh(410, 1345, 2.4, { armL: [16, 2, 3], armR: [34, 2, 3], propR: letterProp(0.8), ...op });
  return MID(lit([[700, 1.0, 0], [800, 0.96, 1]].map(([x, sc, i]) => `${castShadow(x, 1240, sc, 'pHook')}${guardVN(x, 1240, sc, i, { flip: true, look: [2.4, 0] })}`).join(''), 'pHook'))
    + lit(castShadow(410, 1345, 2.4, 'pHook') + `<g${punch(jy, 0.035, 420, 900)}>`
      + seq(P, [[0, { mood: 'happy', look: [0, 1.2] }], [jy, { mood: 'tender' }], [s, { mood: 'happy', look: [0, 0] }], [n, { mood: 'happy', halo: n }]]) + '</g>', 'pHook')
    + `<g opacity="0"${fadeIn(jy, 0.8)}>${glow(470, 1060, 260, 0.45)}${sparkles(10, 300, 640, 820, 1180, { seed: 4 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#1a1626' }) + foliage('r', 1660, { color: '#1a1626', seed: 5 }));
}

// 1 · 1841: Christians hunted; guards come for Paul (pan-r)
function scene1() {
  const hu = at(1, 'hunted'), ar = at(1, 'arrested'), sp = at(1, 'spreading');
  return MID(lit([[560, 0.98, 0], [640, 0.94, 2], [880, 0.96, 1]].map(([x, sc, i], k) => `<g opacity="0"${fadeIn(hu - 0.6 + k * 0.2, 0.6)}>${castShadow(x, 1240, sc, 'pArrest')}`
      + `${villagerVN(x, 1240, sc, i, { mood: 'worried', flip: x > 700, look: [2.2, 0] })}</g>`).join(''), 'pArrest'))
    + layer(0.95, lit(`<g${walkIn(ar - 0.6, 260, 1.1)}>${castShadow(760, 1322, 2.0, 'pArrest')}${guardVN(760, 1322, 2.0, 0, { flip: true, look: [2.4, 0] })}</g>`, 'pArrest'))
    + layer(0.92, lit(`<g${walkIn(ar - 0.3, 260, 1.1)}>${castShadow(860, 1310, 1.9, 'pArrest')}${guardVN(860, 1310, 1.9, 1, { flip: true, hat: 'khan', look: [2.4, 0] })}</g>`, 'pArrest'))
    + lit(castShadow(350, 1345, 2.3, 'pArrest') + seq((op) => paulTinh(350, 1345, 2.3, { look: [2.4, 0], ...op }),
      [[0, { chained: false, mood: 'happy', armL: [14, 2, 3], armR: [14, 2, 3] }], [hu, { chained: false, mood: 'worried', armL: [14, 2, 3], armR: [14, 2, 3] }],
        [ar + 0.3, { mood: 'surprised', armL: [26, 2, 3], armR: [26, 2, 3] }], [sp, { mood: 'determined', armL: [20, 2, 3], armR: [20, 2, 3] }]]), 'pArrest')
    + NEAR(foliage('l', 1650, { color: '#2a3a24', seed: 7 }));
}

// 2 · the human beat: fifty, chained hand and foot; he writes to the seminarians (push)
function scene2() {
  const fr = at(2, 'From his cell'), q0 = at(2, 'I, Paul'), qe = at(2, 'name of Christ', 0.7);
  const P = (op) => paulTinh(420, 1345, 2.35, { kneel: true, look: [0, 1.6], ...op });
  return lit(castShadow(420, 1345, 2.35, 'pCell') + `<g${punch(q0, 0.035, 440, 950)}>`
      + seq(P, [[0, { mood: 'sad', armL: [10, 2, 3], armR: [10, 2, 3] }], [fr - 0.3, { mood: 'determined', armL: [14, 2, 3], armR: [44, 2, 3], propR: letterProp(0.85) }],
        [q0 - 0.2, { mood: 'happy', talk: [q0, qe], look: [1.4, 0.6], armL: [14, 2, 3], armR: [48, 3, 2.4], propR: letterProp(0.85) }],
        [qe, { mood: 'happy', look: [2.2, -0.8], armL: [14, 2, 3], armR: [44, 2, 3], propR: letterProp(0.85) }]]) + '</g>', 'pCell')
    + `<g opacity="0"${fadeIn(fr, 1.0)}>${glow(560, 1080, 240, 0.4)}</g>`;
}

// 3 · the seminarians read his letter: a living hell (drift-l)
function scene3() {
  const hl = at(3, 'living hell'), ah = at(3, 'anger');
  const S = (x, y, sc, i, steps, extra = {}) => lit(castShadow(x, y, sc, 'pSem') + seq((op) => seminarian(x, y, sc, i, { ...extra, ...op }), steps), 'pSem');
  return layer(0.95, S(540, 1322, 1.95, 1, [[0, { mood: 'happy', look: [-2.4, 0.4], flip: true }], [hl, { mood: 'worried', look: [-2.2, 0.6], flip: true }], [ah, { mood: 'sad', flip: true }]]))
    + layer(0.92, S(720, 1310, 1.85, 2, [[0.4, { mood: 'happy', look: [-2.4, 0.4], flip: true }], [hl + 0.3, { mood: 'surprised', flip: true }], [ah + 0.3, { mood: 'sad', flip: true }]]))
    + S(300, 1345, 2.2, 0, [[0, { mood: 'happy', look: [1.2, 1.4], armR: [46, 2, 3], propR: letterProp(0.9), armL: [14, 2, 3] }], [hl, { mood: 'worried', look: [1.2, 1.6], armR: [46, 2, 3], propR: letterProp(0.9), armL: [14, 2, 3] }],
      [ah, { mood: 'sad', look: [0, 1.8], armR: [46, 2, 3], propR: letterProp(0.9), armL: [14, 2, 3] }]])
    + `<g opacity="0"${fadeIn(0.3, 0.8)}>${glow(400, 1060, 110, 0.5)}</g>`
    + NEAR(foliage('l', 1650, { color: '#2e3e22', seed: 9 }) + foliage('r', 1660, { color: '#2e3e22', seed: 10 }));
}

// 4 · the turning point: "I am not alone, but Christ is with me" (dolly; the light swells, Christ beside him)
function scene4() {
  const q0 = at(4, 'By the grace'), jy = at(4, 'full of joy'), na = at(4, 'not alone'), cw = at(4, 'Christ is with me'), qe = at(4, 'with me', 0.6);
  const P = (op) => paulTinh(380, 1345, 2.35, { kneel: true, ...op });
  return layer(0.93, `<g opacity="0"${M.tw([{ at: na - 0.4, dur: 1.4, from: { opacity: 0 }, to: { opacity: 0.92 } }])}>${glow(660, 900, 420, 0.7)}`
      + lit(jesusHD(660, 1312, 2.0, { mood: 'tender', flip: true, armL: [30, 2, 3], armR: [70, 2, 3], look: [2.4, 0.6] }), 'pCell2') + '</g>')
    + lit(castShadow(380, 1345, 2.35, 'pCell2') + seq(P, [[0, { mood: 'determined', look: [0, 1.4], armL: [14, 2, 3], armR: [44, 2, 3], propR: letterProp(0.85) }],
      [q0 - 0.2, { mood: 'happy', talk: [q0, qe], look: [1.6, 0], armL: [14, 2, 3], armR: [44, 2, 3], propR: letterProp(0.85) }],
      [na, { mood: 'awe', talk: [q0, qe], look: [2.6, -1.4], armL: [14, 2, 3], armR: [44, 2, 3], propR: letterProp(0.85) }],
      [qe, { mood: 'tender', look: [2.4, -1], ...PRAY }]]), 'pCell2')
    + `<g opacity="0"${fadeIn(jy, 1.2)}>${glow(400, 1000, 340, 0.45)}</g>`
    + `<g opacity="0"${fadeIn(cw, 0.8)}>${sparkles(16, 240, 860, 640, 1180, { seed: 14 })}</g>`;
}

// 5 · freed, ordained; arrested again; beheaded in 1857; the quotable line (tilt-up + rack focus)
function scene5() {
  const pr = at(5, 'priest'), ag = at(5, 'Arrested again'), bh = at(5, 'beheaded'), q = at(5, 'Chains held');
  const P = (op) => paulTinh(420, 1345, 2.35, { priest: true, ...op });
  return MID(lit([[620, 0.95, 0], [700, 0.9, 3], [790, 0.94, 1]].map(([x, sc, i], k) => `<g opacity="0"${fadeIn(pr - 0.4 + k * 0.18, 0.6)}><g${M.tw([{ at: ag, dur: 0.8, from: { opacity: 1 }, to: { opacity: 0 } }])}>`
      + `${castShadow(x, 1240, sc, 'pField')}${villagerVN(x, 1240, sc, i, { kneel: true, flip: true, mood: 'tender', ...PRAY })}</g></g>`).join('')
      + `<g opacity="0"${fadeIn(bh - 0.2, 0.8)}>${castShadow(860, 1240, 1.0, 'pField')}${executioner(860, 1240, 1.0, { flip: true, look: [2.4, 0] })}</g>`, 'pField'))
    + layer(0.95, lit(`<g${walkIn(ag - 0.3, 240, 1.0)}><g${M.tw([{ at: bh - 0.3, dur: 0.6, from: { opacity: 1 }, to: { opacity: 0 } }])}>${castShadow(740, 1322, 2.0, 'pField')}`
      + `${guardVN(740, 1322, 2.0, 0, { flip: true, look: [2.4, 0] })}</g></g>`, 'pField'))
    + lit(castShadow(420, 1345, 2.35, 'pField') + seq(P, [[0, { chained: false, mood: 'joy', look: [2, 0], armL: [14, 2, 3], armR: [124, 6, 2.2] }],
      [pr + 0.3, { chained: false, mood: 'tender', look: [2, 0.4], armL: [14, 2, 3], armR: [118, 4, 2.4] }],
      [ag, { mood: 'determined', look: [2.4, 0], armL: [18, 2, 3], armR: [18, 2, 3] }],
      [bh, { mood: 'peaceful', kneel: true, ...PRAY, halo: bh }]]), 'pField')
    + layer(1.03, `<g transform="translate(140,1366)">${popAt(q - 0.2, 0, 0, `${glow(0, -10, 150, 0.7)}${brokenChain(0.95)}`, 0.6)}</g>`)
    + `<g opacity="0"${fadeIn(bh, 1.4)}>${glow(420, 900, 420, 0.5)}</g>`
    + `<g opacity="0"${fadeIn(q, 0.8)}>${sparkles(14, 240, 760, 600, 1100, { seed: 21 })}</g>`
    + NEAR(foliage('r', 1660, { color: '#2e3a22', seed: 12 }));
}

// 6 · feast day: Paul with halo, palm and his letter; the Martyrs of Vietnam gather behind him (arc-r)
function scene6() {
  const mv = at(6, 'Martyrs of Vietnam'), pr = at(6, 'pray for us');
  const row = [[620, 0.98, (x, y, s) => theophane(x, y, s, { halo: true, mood: 'happy', flip: true, look: [2, 0] })],
    [720, 0.94, (x, y, s) => villagerVN(x, y, s, 0, { halo: true, mood: 'happy', flip: true })],
    [800, 0.97, (x, y, s) => paulTinh(x, y, s, { chained: false, halo: true, mood: 'happy', flip: true, top: '#3a2a2a', hair: '#15100c', beard: null, beardStyle: null, age: 'young' })],
    [870, 0.92, (x, y, s) => villagerVN(x, y, s, 2, { halo: true, mood: 'happy', flip: true })]];
  return MID(lit(row.map(([x, sc, draw], k) => `<g opacity="0"${fadeIn(mv - 0.3 + k * 0.18, 0.6)}>${castShadow(x, 1240, sc, 'pGlory')}${draw(x, 1240, sc)}</g>`).join(''), 'pGlory'))
    + layer(1.04, lit(`<g transform="translate(135,1370)">${brokenChain(0.9)}</g>`, 'pGlory'))
    + lit(castShadow(360, 1345, 2.35, 'pGlory') + seq((op) => paulTinh(360, 1345, 2.35, { chained: false, priest: true, halo: true, armL: [28, 2, 3], propL: letterProp(0.8), armR: [26, 2, 3], propR: palm_frond(1.1, -8), ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [mv, { mood: 'happy', look: [2.2, -0.2] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'pGlory')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 260, 700, 560, 900, { seed: 27 })}</g>`
    + NEAR(bokeh(7, { seed: 33 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

export const STORY = {
  slug: 'st_paul_le_bao_tinh_letter', name: 'St_Paul_Le_Bao_Tinh_Letter',
  bg3d: './paul_le_bao_tinh_letter.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'andrew.bg3d.js': './andrew_apostle.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js', 'tonkin.bg3d.js': './theophane_venard_cage.bg3d.js', 'alex.bg3d.js': './catherine_of_alexandria.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  music: { story: 'a Vietnamese Catholic chained in a Hanoi prison in 1843 who wrote a letter full of joy, later a priest and martyr',
    color: 'Vietnamese: dan bau monochord, bamboo flute (sao truc) and soft temple gongs, with a gentle dan tranh zither',
    cues: { 3: 'Sorrowful: a lone bamboo flute over low strings, heavy and dark like a prison.' } },
  cast: { paul: { voice: { zm_yunjian: 0.45, bm_george: 0.55 }, speed: 0.9 } },
  thumb_hook: 'Chained, and still full of joy', thumb_title: 'St. Paul Lê Bảo Tịnh', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [1024, 1280, 'r']],
  fix: {
    'lˈɛɹ bˈiː lˌɛɾɚwˈʌnˈiːˈeɪθɹˈiː ˈoʊ tˌiːlˌɛɾɚwˌʌnˈiːsˌiːbˌiːˌɛnˈeɪtʃ': 'lˈeɪ bˈaʊ tˈɪŋ',   // Lê Bảo Tịnh -> lay bow ting
    'noʊvˈɛmbɚ twˈɛnti fˈɔːɹ': 'noʊvˈɛmbɚ twˈɛnti fˈɔːɹθ',      // November 24 -> November twenty-fourth
  },
  scenes: [
    { kicker: 'HANOI, VIETNAM · 1843', title: 'A Letter From Hell', art: scene0, bg3d: 'pHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Chained in a Vietnamese prison, he wrote that he was full of joy.', 'This is Saint Paul Lê Bảo Tịnh.'] },
    { kicker: 'TONKIN · 1841', title: 'Arrested for the Faith', art: scene1, bg3d: 'pArrest', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['In 1841, Christians in Vietnam were being hunted.', 'Paul was arrested for spreading the faith.'] },
    { kicker: 'THE PRISON IN HANOI', title: 'In Chains', art: scene2, bg3d: 'pCell', front3d: true, cam: { move: 'push', oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['He was fifty years old, chained hand and foot.', 'From his cell, he wrote to young seminarians:', { text: 'I, Paul, in chains for the name of Christ.', who: 'paul' }] },
    { kicker: 'THE LETTER · 1843', title: 'A Living Hell', art: scene3, bg3d: 'pSem', front3d: true, cam: 'drift-l',
      tone: { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['He told them the prison was a living hell, full of chains, anger and hatred.'] },
    { kicker: 'THE PRISON IN HANOI', title: 'Not Alone', art: scene4, bg3d: 'pCell2', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 400, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['But then he wrote:', { text: 'By the grace of God I am full of joy and happiness, because I am not alone, but Christ is with me.', who: 'paul', speed: 0.85 }] },
    { kicker: '1848 – 1857', title: 'Faithful to the End', art: scene5, bg3d: 'pField', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Freed in 1848, he became a priest.', 'Arrested again, he was beheaded in 1857.', 'Chains held his body, but never his joy.'] },
    { kicker: 'FEAST DAY · NOVEMBER 24', title: 'Saint Paul Lê Bảo Tịnh', art: scene6, bg3d: 'pGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['He is honored with the 117 Martyrs of Vietnam on November 24.', 'Saint Paul Lê Bảo Tịnh, pray for us.'] },
  ],
};
