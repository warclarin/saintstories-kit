// Pope St. Clement I: "the anchor" (one story, told as tradition). Feast: November 23.
// All-3D backgrounds (clement_anchor.bg3d.js: taurica(), a new Crimean-coast set, and roma() from gelasius.bg3d.js);
// cam3d; characters hd().
// Sources: Catholic Encyclopedia "Pope St. Clement I" (feast 23 November; "the first of the successors of St. Peter of whom
// anything definite is known"; later tradition: exiled to the Crimea under Trajan; c. 868 St. Cyril found bones and an
// anchor in the Crimea, believed to be Clement's, and brought them to Rome; the anchor "appears to be the only evidence of
// identity"); Britannica "St. Clement I" and "First Letter of Clement" (fourth pope, the letter to Corinth c. 96);
// Wikipedia "Clement of Rome" (4th-century apocryphal Acts: banished to Chersonesus to work in a stone quarry; the
// prisoners lacked water, he prayed, a lamb showed the place and he struck the ground and a stream flowed; thrown into
// the sea with an anchor; the oldest sources, Eusebius and Jerome, say nothing of his martyrdom); OCA "Hieromartyr Clement"
// (prisoners without water, the lamb, many baptized, drowned with an anchor, d. 101); 1 Clement 49:5, Lake's translation:
// "Love unites us to God"; Catholic saint profile (patron of sailors, mariners and stonecutters).
// Legend framing: "Tradition says" in the hook and "ONE FAMOUS STORY" on the quarry scene.
// Bloodless: the anchor is shown on the ground with a rope; the climax is a white flash, a splash and light.
// Exported for later reels: clementHD, anchor, pickaxe, spring, splash, relicBundle, cyrilHD.
import { M, GOLD, sparkles, bokeh, foliage, f, palm_frond, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { pallium } from './leo_the_great.mjs';
import { legionary } from './rufus_simon_of_cyrene.mjs';
import { scroll } from './andrew_apostle.mjs';
import { sheep } from './peter.mjs';
import { churchIcon } from './cecilia_life.mjs';

const at = wordTimes('st_clement_anchor');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const flash = (t) => `<g opacity="0"${fadeIn(t, 0.15)}><g${fadeOut(t + 0.18, 0.7)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".8"/></g></g>`;

// ================================================================ props
/** An iron anchor hanging from its ring at (0,0): stock, shank, curved arms with flukes (about 110 units tall at s = 1). */
export const anchor = (s = 1, { c = '#5e6270', hi = '#9aa0ac', gold = false } = {}) => {
  const k = gold ? GOLD : c, h = gold ? '#fff4cc' : hi;
  return `<g transform="scale(${s})"><circle cy="-2" r="9" fill="none" stroke="${k}" stroke-width="5"/><rect x="-36" y="10" width="72" height="8" rx="4" fill="${k}"/>`
    + `<rect x="-5" y="6" width="10" height="90" rx="3" fill="${k}"/><path d="M-42 66 Q-42 100 0 100 Q42 100 42 66" stroke="${k}" stroke-width="9" fill="none" stroke-linecap="round"/>`
    + `<path d="M-42 50 L-52 72 L-32 72Z M42 50 L52 72 L32 72Z" fill="${k}"/><path d="M-3 14 V90 M-30 12 H20" stroke="${h}" stroke-width="2" opacity=".7"/></g>`;
};
/** A quarry pick held in the hand (handle up). */
export const pickaxe = (s = 1) => `<g transform="scale(${s})"><rect x="-4" y="-104" width="8" height="124" rx="3" fill="#8a6a44"/><rect x="0" y="-104" width="3" height="124" fill="#6a5034" opacity=".6"/>`
  + '<path d="M-50 -98 Q0 -122 50 -98 L46 -88 Q0 -108 -46 -88Z" fill="#7a7e88"/><path d="M-40 -100 Q0 -116 40 -100" stroke="#b0b4bc" stroke-width="2" fill="none"/></g>';
/** The spring bursting from the rock at (x, y): a rock, a rising jet with spray, and a spreading pool; starts at t. */
export const spring = (x, y, t, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">`
  + '<path d="M-90 0 Q-96 -46 -50 -64 Q0 -84 46 -60 Q92 -40 88 0Z" fill="#cbbba0"/><path d="M10 -78 Q60 -60 88 0 L40 0 Q40 -40 10 -78Z" fill="#a8987e" opacity=".7"/>'
  + `<g opacity="0"${fadeIn(t, 0.25)}><ellipse cx="0" cy="6" rx="150" ry="18" fill="#8ac4e0" opacity=".75"${M.tw([{ at: t, dur: 1.4, from: { scale: 0.2 }, to: { scale: 1 }, origin: '0 6' }])}/>`
  + `<g${M.tw([{ at: t, dur: 0.5, from: { scaleY: 0 }, to: { scaleY: 1 }, ease: 'power2.out', origin: '0 -40' }])}><g${M.pulse(0.06, 0.5)}>`
  + '<path d="M-16 -40 Q-22 -150 0 -210 Q22 -150 16 -40Z" fill="#bfe6f8" opacity=".9"/><path d="M-6 -50 Q-8 -140 0 -190 Q8 -140 6 -50Z" fill="#ffffff" opacity=".85"/></g></g>'
  + `<circle cx="0" cy="-200" r="90" fill="url(#haloGlow)" opacity=".6"/>${sparkles(12, -110, 110, -260, -60, { seed: 31, color: '#e8f8ff' })}</g></g>`;
/** A splash and rings on the water at (x, y), at time t. */
export const splash = (x, y, t) => `<g transform="translate(${x},${y})"><g opacity="0"${fadeIn(t, 0.1)}><g${fadeOut(t + 1.2, 1.0)}>`
  + [0, 0.25, 0.5].map((d, k) => `<ellipse rx="${120 + k * 70}" ry="${18 + k * 8}" fill="none" stroke="#e8f4ff" stroke-width="${6 - k * 1.5}" opacity="${0.9 - k * 0.2}"${M.tw([{ at: t + d, dur: 1.4, from: { scale: 0.2 }, to: { scale: 1.2 }, origin: '0 0' }])}/>`).join('')
  + `<g${M.tw([{ at: t, dur: 0.6, from: { scaleY: 0.1 }, to: { scaleY: 1 }, ease: 'power2.out', origin: '0 0' }])}><path d="M-60 0 Q-40 -120 -10 -160 Q0 -90 10 -160 Q40 -120 60 0Z" fill="#e8f4ff" opacity=".85"/></g></g></g></g>`;
/** The relics as Cyril found them: a linen-wrapped bundle on stones, the anchor lying beside it (centre x, ground y). */
export const relicBundle = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="170" ry="16" fill="#1a0f1a" opacity=".25"/>`
  + '<path d="M-150 0 Q-150 -30 -110 -34 L-10 -34 Q20 -34 20 0Z" fill="#a8987e"/>'
  + '<path d="M-140 -30 Q-140 -64 -100 -66 L-20 -66 Q6 -64 8 -30Z" fill="#f2ead8"/><path d="M-120 -64 L-112 -32 M-80 -66 L-74 -32 M-40 -66 L-36 -32" stroke="#d8ccb4" stroke-width="3"/>'
  + `<g transform="translate(90,-14) rotate(-78)">${anchor(1.05, { c: '#6a5a52', hi: '#a08a7a' })}</g></g>`;

// ================================================================ characters
const SK = '#d9a47e', GREY = '#cfc8bc';
/** St. Clement: as pope (white tunic, red mantle, pallium, grey hair and beard) or in exile (rough tunic, brown cloak). */
export const clementHD = (x, y, s, { exile = false, over = '', ...o } = {}) => hd(x, y, s, exile
  ? { top: '#c8b89a', plain: true, mantle: '#7a5a42', lining: '#a08060', trim: '#8a7050', belt: '#5a4a34', skin: SK, hair: GREY, hairStyle: 'short', beard: GREY, beardStyle: 'full',
      age: 'old', iris: '#4a3a2a', shoes: '#5a3a22', ...o, over }
  : { top: '#f6f0e2', plain: true, mantle: '#b3202e', lining: GOLD, trim: GOLD, belt: false, skin: SK, hair: GREY, hairStyle: 'short', beard: GREY, beardStyle: 'full',
      age: 'old', iris: '#4a3a2a', shoes: '#b3202e', ...o, over: pallium + over });
const PRIS = [['#a89878', '#e2b48f', '#3a2a1e', 'short'], ['#8a7a64', '#c48a5f', '#2a1c12', 'curly'], ['#b0a088', '#e8c09a', '#6a4a30', 'short'], ['#9a8a70', '#b97c52', '#1e1612', 'curly']];
const prisoner = (x, y, s, i, o = {}) => { const [top, skin, hair, hs] = PRIS[i % 4];
  return hd(x, y, s, { top, mantle: null, plain: true, belt: '#7a6a4a', skin, hair, hairStyle: hs, beard: i % 2 ? hair : null, beardStyle: i % 2 ? 'short' : null, age: i % 3 ? 'mid' : 'young', iris: '#3a2a20', shoes: '#5a4a34', ...o }); };
const corinthian = (x, y, s, i, o = {}) => hd(x, y, s, i
  ? { top: '#8a5a3a', mantle: '#d8ccb4', lining: '#b8a888', trim: '#8a5a3a', belt: false, skin: '#e2b48f', hair: '#4a3424', beard: '#4a3424', beardStyle: 'short', age: 'mid', iris: '#3a2a20', shoes: '#5a3a22', ...o }
  : { top: '#4e6e8a', mantle: '#c8b48a', lining: '#a8946a', trim: '#4e6e8a', belt: false, skin: '#d9a47e', hair: '#8a8278', hairStyle: 'old', beard: '#8a8278', beardStyle: 'full', age: 'old', iris: '#3a2a20', shoes: '#5a3a22', ...o });
/** St. Cyril (Constantine the Philosopher, d. 869): a Byzantine monk in black with a long dark beard. */
export const cyrilHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#2e2a30', mantle: '#3e3844', lining: '#6a6270', trim: '#8a8290', plain: true, belt: false, skin: '#e2b48f', hair: '#3a2a20',
  hairStyle: 'long', beard: '#3a2a20', beardStyle: 'long', age: 'mid', iris: '#3a2a20', shoes: '#2a2024', ...o });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  cHook:   { key: '#ffb880', from: 'r', tint: '#d8a8b0', amt: 0.12, rim: '#ffc8a0', rimOp: 0.85 },
  cRome:   { key: '#ffc090', from: 'r', tint: '#ffc4a4', amt: 0.12, rim: '#ffb878', rimOp: 0.75 },
  cExile:  { key: '#ffe0b0', from: 'l', tint: '#ffe8cc', amt: 0.08, rim: '#fff0d0', rimOp: 0.75 },
  cSpring: { key: '#fff0c8', from: 'top', tint: '#fff0d4', amt: 0.08, rim: '#fff4d8', rimOp: 0.8 },
  cAnchor: { key: '#ffe8c8', from: 'top', tint: '#9aa0d0', amt: 0.18, rim: '#ffe8d0', rimOp: 0.85 },
  cRelics: { key: '#ffd8b0', from: 'l', tint: '#ffd8c4', amt: 0.1, rim: '#ffe0c0', rimOp: 0.8 },
  cGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `kllit${++LID}`, d = 5;
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
const castShadow = (x, y, s, mode) => {
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[LIGHT[mode].from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262.
// 0 · hook: the pope with his anchor on the stormy coast (push-fast)
function scene0() {
  const an = at(0, 'anchor'), sea = at(0, 'into the sea'), nm = at(0, 'Saint Clement');
  return lit(castShadow(440, 1345, 2.4, 'cHook') + `<g${punch(an, 0.035, 440, 900)}>`
      + seq((op) => clementHD(440, 1345, 2.4, { halo: true, armL: [14, 2, 3], armR: 22, propR: anchor(1.0), ...op }),
        [[0, { mood: 'determined', look: [0, 0] }], [sea, { mood: 'peaceful', look: [0, -1] }], [nm, { mood: 'happy', look: [0, 0] }]]) + '</g>', 'cHook')
    + `<g opacity="0"${fadeIn(sea, 0.6)}>${glow(440, 820, 380, 0.35)}</g>`
    + `<g opacity="0"${fadeIn(nm, 0.6)}>${sparkles(14, 240, 660, 560, 1000, { seed: 3 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#2a2440' }) + foliage('r', 1660, { color: '#2a2440', seed: 5 }));
}

// 1 · Rome: one of the first popes; he wrote to a divided church; "Love unites us to God." (drift-r)
function scene1() {
  const wr = at(1, 'He once wrote'), q = at(1, 'Love unites');
  const pair = (op) => corinthian(630, 1310, 1.75, 0, { armR: op.a0, armL: 14, look: [2.4, 0], mood: op.m })
    + corinthian(830, 1310, 1.7, 1, { flip: true, armR: op.a1, armL: 14, look: [2.4, 0], mood: op.m });
  return layer(0.92, lit(`<g opacity="0"${walkIn(wr - 0.2, 160, 1.0)}>${castShadow(630, 1310, 1.75, 'cRome')}${castShadow(830, 1310, 1.7, 'cRome')}`
      + seq(pair, [[0, { m: 'stern', a0: 78, a1: 78 }], [q + 0.3, { m: 'tender', a0: 14, a1: 14 }]]) + '</g>', 'cRome'))
    + lit(castShadow(300, 1345, 2.25, 'cRome') + seq((op) => clementHD(300, 1345, 2.25, { armL: 40, propL: scroll(1.4), armR: 26, ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [wr, { mood: 'determined', look: [2.4, 0] }], [q, { mood: 'happy', look: [2.4, 0], talk: [q, q + 1.7] }], [q + 1.8, { mood: 'tender', look: [2.4, 0] }]]), 'cRome')
    + `<g opacity="0"${fadeIn(q + 0.3, 0.6)}>${glow(770, 900, 300, 0.4)}${sparkles(14, 600, 920, 620, 960, { seed: 8 })}</g>`
    + NEAR(bokeh(6, { seed: 13, sides: true }) + foliage('l', 1650, { color: '#2a2434', seed: 4 }));
}

// 2 · exile to the stone quarry by the Black Sea (pan-l)
function scene2() {
  const qy = at(2, 'far away'), bs = at(2, 'Black Sea');
  const worker = (x, i, ph) => `${castShadow(x, 1262, 1.5, 'cExile')}${prisoner(x, 1262, 1.5, i, { flip: i % 2 === 1, mood: 'sad', look: [0, 1], armR: [128, 14, 1.4 + ph], propR: pickaxe(1), armL: 20, ph })}`;
  return layer(0.78, lit(`<g opacity="0"${fadeIn(qy, 0.8)}>${worker(150, 0, 0.1)}${worker(640, 1, 0.3)}</g>`, 'cExile'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(0.2, 140, 1.1)}>${castShadow(810, 1310, 1.95, 'cExile')}${legionary(810, 1310, 1.95, { flip: true, armR: [72, 3, 2.2], armL: 14, look: [2.4, 0] })}</g>`, 'cExile'))
    + lit(castShadow(400, 1345, 2.2, 'cExile') + `<g${punch(bs, 0.03, 400, 900)}><g${walkIn(0, 80, 1.4)}>` + seq((op) => clementHD(400, 1345, 2.2, { exile: true, armL: 12, armR: 12, ...op }),
      [[0, { mood: 'sad', look: [0, 1.4] }], [bs, { mood: 'determined', look: [0, 0] }]]) + '</g></g>', 'cExile')
    + NEAR(foliage('l', 1650, { color: '#3a3a26', seed: 2 }));
}

// 3 · no water; he prays; a lamb shows the place; he strikes the ground and water flows (dolly)
function scene3() {
  const pr = at(3, 'Clement prayed'), lb = at(3, 'a lamb'), sk = at(3, 'He struck');
  const thirsty = (x, s, i) => castShadow(x, 1310, s, 'cSpring') + seq((op) => prisoner(x, 1310, s, i, { kneel: true, flip: true, armL: 20, armR: 30, ...op }),
    [[0, { mood: 'worried', look: [2.4, 0.8] }], [sk + 0.3, { mood: 'joy', look: [2.4, 0], armR: 130, armL: 120 }]]);
  return layer(0.78, `<g${fadeOut(sk + 0.1, 0.5)}>` + popAt(lb, 600, 1170, `${glow(0, -70, 230, 0.7)}<path d="M-120 6 Q-104 -30 -30 -38 Q60 -44 104 -14 Q124 6 118 8Z" fill="#cbbba0"/><g transform="translate(14,-22)">${sheep(0, 0, 1.6, 0.3, false)}</g>`, 0.7) + '</g>')
    + layer(0.95, spring(600, 1322, sk + 0.15, 1.3))
    + layer(0.92, lit(thirsty(770, 1.6, 1) + thirsty(880, 1.45, 3), 'cSpring'))
    + lit(castShadow(330, 1345, 2.2, 'cSpring') + seq((op) => clementHD(330, 1345, 2.2, { exile: true, ...op }),
      [[0, { mood: 'worried', look: [2.4, 0.6], armL: 14, armR: 14 }], [pr, { mood: 'peaceful', look: [0, -1], kneel: true, armL: 36, armR: 36 }],
        [lb + 0.4, { mood: 'awe', look: [2.6, -0.6], kneel: true, armL: 36, armR: 60 }], [sk, { mood: 'determined', look: [2.4, 0.4], armL: 14, armR: [140, 0, 2], propR: pickaxe(1.1) }],
        [sk + 0.9, { mood: 'joy', look: [2.4, 0], armL: 30, armR: 60 }]]), 'cSpring')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${glow(330, 760, 320, 0.4)}</g>`
    + NEAR(foliage('r', 1660, { color: '#4a4430', seed: 6 }));
}

// 4 · many believed; the emperor's men tie an anchor to his neck and throw him into the sea (tilt-up + rack)
function scene4() {
  const mb = at(4, 'Many came'), em = at(4, "So the emperor"), th = at(4, 'and threw');
  const convert = (x, i) => `${castShadow(x, 1262, 1.45, 'cAnchor')}${prisoner(x, 1262, 1.45, i, { kneel: true, flip: x > 540, mood: 'tender', look: [2.4, -0.4], armL: 36, armR: 36 })}`;
  const gone = (svg) => `<g${fadeOut(th + 0.12, 0.35)}>${svg}</g>`;
  return layer(0.78, lit(`<g opacity="0"${fadeIn(mb, 0.7)}><g${fadeOut(em + 0.2, 0.6)}>${convert(200, 0)}${convert(820, 2)}${convert(700, 1)}</g></g>`, 'cAnchor'))
    + layer(0.92, lit(gone(`<g opacity="0"${walkIn(em, 150, 0.9)}>${castShadow(780, 1310, 1.95, 'cAnchor')}${legionary(780, 1310, 1.95, { flip: true, armR: [70, 2, 2.2], armL: 14, look: [2.4, 0] })}</g>`), 'cAnchor'))
    + lit(gone(castShadow(440, 1345, 2.25, 'cAnchor')
        + seq((op) => clementHD(440, 1345, 2.25, { exile: true, armL: 30, armR: 30, ...op }),
          [[0, { mood: 'happy', look: [2.2, 0] }], [em + 0.3, { mood: 'peaceful', look: [0, -1.2], halo: em + 0.6 }]])
        + `<g opacity="0"${fadeIn(em + 0.4, 0.5)}><path d="M598 1330 Q560 1180 470 1150 Q448 1100 452 895" stroke="#b89a68" stroke-width="7" fill="none" stroke-linecap="round"/>`
        + `<g transform="translate(610,1238)">${anchor(1.0)}</g></g>`), 'cAnchor')
    + flash(th) + splash(540, 1290, th + 0.15)
    + `<g opacity="0"${fadeIn(th + 0.3, 1.0)}><path d="M470 300 L610 300 L640 1290 L440 1290Z" fill="#fff4d8" opacity=".18"/>${glow(540, 1180, 300, 0.55)}${sparkles(16, 380, 700, 700, 1250, { seed: 17 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#1c1a2a', seed: 10 }) + foliage('r', 1650, { color: '#1c1a2a', seed: 11 }));
}

// 5 · centuries later St. Cyril finds his bones beside an anchor and brings them to Rome; the anchor became his sign of hope (pull)
function scene5() {
  const fd = at(5, 'found his bones'), ro = at(5, 'to Rome'), mt = at(5, 'They meant'), hp = at(5, 'sign of hope');
  return layer(0.95, `<g opacity="0"${fadeIn(fd, 0.8)}>${glow(700, 1260, 260, 0.5)}</g>` + lit(relicBundle(705, 1322, 1.3), 'cRelics')
      + `<g opacity="0"${fadeIn(mt + 0.3, 0.8)}><g transform="translate(822,1304) rotate(-78)">${anchor(1.37, { gold: true })}</g>${glow(800, 1280, 240, 0.55)}</g>`)
    + layer(0.9, popAt(ro, 720, 620, `<g${M.bob(5, 3)}>${churchIcon(1.1)}</g>`, 0.6))
    + lit(castShadow(290, 1345, 2.2, 'cRelics') + seq((op) => cyrilHD(290, 1345, 2.2, { kneel: true, halo: true, armL: 30, ...op }),
      [[0, { mood: 'surprised', look: [2.6, 0.8], armR: 40 }], [ro - 0.6, { mood: 'tender', look: [2.4, 0.6], armR: 60 }], [hp, { mood: 'happy', look: [0, 0], armR: 40 }]]), 'cRelics')
    + `<g opacity="0"${fadeIn(hp, 0.6)}>${sparkles(16, 600, 900, 1100, 1320, { seed: 19 })}</g>`
    + NEAR(bokeh(6, { seed: 21, sides: true }) + foliage('l', 1640, { color: '#3a3026', seed: 12 }));
}

// 6 · feast-day portrait: patron of sailors and stonecutters (arc-r)
function scene6() {
  const sl = at(6, 'patron'), pr = at(6, 'pray for us');
  return lit(castShadow(470, 1345, 2.35, 'cGlory') + seq((op) => clementHD(470, 1345, 2.35, { halo: true, armL: 34, propL: palm_frond(1.0, -6, 2), armR: 22, propR: anchor(1.0), ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [sl, { mood: 'happy', look: [2.2, -0.4] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'cGlory')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 280, 760, 560, 900, { seed: 21 })}</g>`
    + NEAR(bokeh(7, { seed: 25, sides: true }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

export const STORY = {
  slug: 'st_clement_anchor', name: 'St_Clement_The_Anchor',
  bg3d: './clement_anchor.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'andrew.bg3d.js': './andrew_apostle.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { clement: { voice: 'im_nicola', speed: 0.9 } },
  music: { story: 'an early pope exiled to a stone quarry by the Black Sea, who found water for thirsty prisoners and was thrown into the sea with an anchor',
    cues: { 1: 'Warm and steady: soft strings and a gentle, hopeful melody over a light drum pulse.',
      3: 'Dry and tense at first, then a shimmering lift of strings and harp as the water flows.' } },
  thumb_hook: 'They sank him with an anchor', thumb_title: 'St. Clement I', thumb_scene: 0, thumb_t: 2.6, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti θɹˈiː': 'noʊvˈɛmbɚ twˈɛnti θˈɜːd',   // November 23 -> November twenty-third
    'tɹˈædʒən': 'tɹˈeɪdʒən',                                   // Trajan: TRAY-jun
  },
  scenes: [
    { kicker: 'BLACK SEA · AROUND AD 100', title: 'Sunk With an Anchor', art: scene0, bg3d: 'cHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Tradition says Rome tied an anchor to a pope, and threw him into the sea.', 'This is Saint Clement.'] },
    { kicker: 'ROME · AROUND AD 96', title: 'A Letter of Peace', art: scene1, bg3d: 'cRome', front3d: true, cam: 'drift-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Clement was one of the first popes after Saint Peter.', 'He once wrote to a divided church:', { text: 'Love unites us to God.', who: 'clement' }] },
    { kicker: 'CRIMEA · THE BLACK SEA', title: 'Sent Into Exile', art: scene2, bg3d: 'cExile', front3d: true, cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['But the emperor Trajan sent him far away, to work in a stone quarry by the Black Sea.'] },
    { kicker: 'THE QUARRY · ONE FAMOUS STORY', title: 'Water From the Rock', art: scene3, bg3d: 'cSpring', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['The prisoners there had no water, and suffered from thirst.', 'Clement prayed, and a lamb showed him a spot on the hill.', 'He struck the ground, and fresh water flowed.'] },
    { kicker: 'THE BLACK SEA', title: 'The Anchor', art: scene4, bg3d: 'cAnchor', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['Many came to believe in Christ.', "So the emperor's men tied an anchor to his neck,", { text: 'and threw him into the sea.', speed: 0.85 }] },
    { kicker: 'CENTURIES LATER', title: 'Found With the Anchor', art: scene5, bg3d: 'cRelics', front3d: true, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Centuries later, Saint Cyril found his bones beside an anchor, and brought them to Rome.', 'They meant the anchor to sink him.', 'It became his sign of hope.'] },
    { kicker: 'FEAST DAY · NOVEMBER 23', title: 'Saint Clement', art: scene6, bg3d: 'cGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 23, and he is a patron of sailors and stonecutters.', 'Saint Clement, pray for us.'] },
  ],
};
