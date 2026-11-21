// Pope St. Gelasius I (pope 492–496), "the last African pope" (whole life). Feast: November 21 (the day of his burial).
// All-3D backgrounds (gelasius.bg3d.js: roma(), the kit's first late-antique Rome set); cam3d; characters hd().
// Sources: Dictionary of African Christian Biography, "Gelasius" ("the third and last of the bishops of Rome born in the Roman
// province of Africa"; dealt with Rome's "danger of famine" and "perennial poor" with supplies from the papal estates);
// Wikipedia "Pope Gelasius I" (Liber Pontificalis "natione Afer"; his own "Romanus natus"; elected 1 March 492; the letter
// Duo sunt to Emperor Anastasius, 494; suppressed the Lupercalia after a long contest; letter to the senator Andromachus;
// died 19 November 496, feast 21 November, the day of his burial); Catholic Encyclopedia "Pope St. Gelasius I" ("There are two
// powers by which chiefly this world is ruled: the sacred authority of the priesthood and the authority of kings", the
// priests' charge "so much the weightier" because they answer to God even for kings; one fourth of church revenues for the
// poor; "a true father to the poor, dying empty-handed as a result of his lavish charity"); ACI Africa (three popes of
// African descent: Victor, Melchiades, Gelasius); Collectio Avellana letter 100 / Gibbon's notes (Andromachus and other
// senators blamed a pestilence on the suppression of the Lupercalia). The quote is his letter put into plain modern English.
// Exported for later reels: gelasiusHD, poorMother, poorChild, loaf, breadBasket, envoy, senator, popeMedallion, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { scroll } from './andrew_apostle.mjs';
import { pallium, ferula } from './leo_the_great.mjs';
import { quill } from './albert_the_great.mjs';
import { crown } from './edmund_last_stand.mjs';

const at = wordTimes('st_gelasius');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;

// ================================================================ props
export const loaf = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="30" ry="18" fill="#c8883e"/><ellipse cx="-4" cy="-5" rx="22" ry="10" fill="#e0a85a"/>`
  + '<path d="M-14 -8 l8 6 M0 -10 l8 6 M14 -8 l8 6" stroke="#9a6028" stroke-width="3" stroke-linecap="round"/></g>';
/** A wicker basket of loaves held out in the hand. */
export const breadBasket = '<g transform="translate(8,6)"><circle cy="-24" r="70" fill="url(#haloGlow)" opacity=".6"/>' + loaf(-20, -26, 0.7) + loaf(16, -30, 0.7) + loaf(0, -40, 0.62)
  + '<path d="M-46 -22 Q0 -14 46 -22 L36 18 Q0 26 -36 18Z" fill="#b07a3a"/><path d="M-42 -10 Q0 -2 42 -10 M-38 4 Q0 12 38 4" stroke="#8a5a2a" stroke-width="3" fill="none"/>'
  + '<path d="M-46 -22 Q0 -14 46 -22" stroke="#d8a05a" stroke-width="5" fill="none"/></g>';
/** A sack of grain (base at 0,0). */
const sack = (c = '#c8a878') => `<g><ellipse cx="0" cy="2" rx="40" ry="7" fill="#1a0f1a" opacity=".25"/><path d="M-34 0 Q-42 -60 -14 -78 L-18 -92 Q0 -98 18 -92 L14 -78 Q42 -60 34 0Z" fill="${c}"/>`
  + `<path d="M8 -78 Q40 -60 34 0 L16 0 Q26 -50 4 -76Z" fill="${dark(c, 0.25)}" opacity=".7"/><path d="M-16 -80 Q0 -74 16 -80" stroke="${dark(c, 0.45)}" stroke-width="4" fill="none"/>`
  + `<g fill="${GOLD}"><ellipse cx="-6" cy="-94" rx="5" ry="3"/><ellipse cx="4" cy="-97" rx="5" ry="3"/><ellipse cx="10" cy="-92" rx="5" ry="3"/></g></g>`;
/** A sealed imperial letter (purple seal), held in the hand. */
const sealedScroll = `<g transform="rotate(-20)"><rect x="-9" y="-50" width="18" height="70" rx="3" fill="#f2e6c8"/><rect x="-13" y="-56" width="26" height="10" rx="5" fill="#6a4a8a"/>`
  + '<rect x="-13" y="16" width="26" height="10" rx="5" fill="#6a4a8a"/><circle cx="0" cy="-14" r="9" fill="#7a2a8a"/><circle cx="-2" cy="-16" r="3" fill="#b06ac0"/></g>';
/** One of the three African popes: a gold medallion with a haloed bust. */
export const popeMedallion = (n, s = 1) => `<g transform="scale(${s})"><circle r="78" fill="url(#haloGlow)" opacity=".8"/><circle r="54" fill="#c8963e"/><circle r="49" fill="#3a2a3e"/>`
  + `<circle cy="-14" r="24" fill="none" stroke="${GOLD}" stroke-width="3" opacity=".8"/><circle cy="-12" r="14" fill="#8a5534"/><path d="M-26 34 Q-24 6 0 4 Q24 6 26 34Z" fill="#f6f0e2"/><path d="M-26 34 Q-24 6 -8 4 L-10 34Z" fill="#b3202e"/>`
  + `<text y="70" text-anchor="middle" font-family="Lora, serif" font-weight="700" font-size="26" fill="#fff4cc">${n}</text></g>`;
/** A pagan altar with its fire (base at 0,0); the flames die out at `out` (s from scene start, null = never). */
const pagan = (out = null) => `<g><ellipse cx="0" cy="4" rx="80" ry="12" fill="#1a0f1a" opacity=".3"/><rect x="-60" y="-120" width="120" height="120" rx="6" fill="#b8a888"/>`
  + '<rect x="-70" y="-134" width="140" height="18" rx="4" fill="#cbbc9c"/><rect x="-70" y="-12" width="140" height="14" rx="4" fill="#a89878"/><path d="M-30 -96 Q0 -60 30 -96" stroke="#8a7a5e" stroke-width="5" fill="none"/>'
  + `<g transform="translate(0,-136)"><g${out == null ? '' : M.tw([{ at: out, dur: 1.2, from: { scale: 1, opacity: 1 }, to: { scale: 0.05, opacity: 0 }, ease: 'power2.in', origin: '0 0' }])}>`
  + `<circle cy="-40" r="120" fill="url(#sunGlow)" opacity=".7"/><g${M.pulse(0.1, 0.6, 0, 0, 0)}><path d="M0 0 Q-44 -40 -14 -110 Q-4 -70 8 -84 Q40 -40 0 0Z" fill="#ff7a32"/>`
  + '<path d="M0 -4 Q-20 -30 -6 -66 Q2 -44 6 -52 Q18 -28 0 -4Z" fill="#ffe08a"/></g></g></g>'
  + (out == null ? '' : `<g transform="translate(0,-150)" opacity="0"${M.tw([{ at: out + 0.6, dur: 0.6, from: { opacity: 0 }, to: { opacity: 0.6 } }])}><g${M.drift(14, -160)}><circle r="26" fill="#8a8494" opacity=".5"/><circle cx="12" cy="-30" r="20" fill="#8a8494" opacity=".4"/></g></g>`) + '</g>';

// ================================================================ characters
/** Pope St. Gelasius I: of African descent, white hair and beard, white tunic, red mantle, pallium (no tiara: 5th century).
 * pope: false = before his election (plain white, no mantle or pallium). */
export const gelasiusHD = (x, y, s, { pope = true, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#f6f0e2', plain: true, mantle: pope ? '#b3202e' : '#8a7a6a', lining: pope ? GOLD : '#a89a88', trim: pope ? GOLD : '#c8bca8', belt: false, skin: '#8a5534',
  hair: '#e4ded4', hairStyle: 'old', beard: '#e4ded4', beardStyle: 'full', age: 'old', iris: '#2a1a10', shoes: pope ? '#b3202e' : '#6a4a34', ...o, over: (pope ? pallium : '') + over });
export const poorMother = (x, y, s, o = {}) => hd(x, y, s, { top: '#8a7a5e', mantle: null, veil: '#b8a888', veilHair: 'covered', plain: true, belt: '#5a4a34', skin: '#c48a5f',
  hair: '#2a1c12', beard: null, age: 'mid', iris: '#3a2416', shoes: '#5a4a34', ...o });
export const poorChild = (x, y, s, o = {}) => hd(x, y, s, { top: '#a87a4a', mantle: null, plain: true, belt: '#5a3a22', skin: '#b07a52', hair: '#1e140c', hairStyle: 'curly',
  beard: null, age: 'young', iris: '#3a2416', shoes: '#5a3a22', ...o });
const poorOld = (x, y, s, o = {}) => hd(x, y, s, { top: '#6a6a5a', mantle: '#8a7a5a', lining: '#6a5a44', plain: true, belt: '#4a3a2a', skin: '#d9a47e', hair: '#d8d2ca', hairStyle: 'old',
  beard: '#d8d2ca', beardStyle: 'short', age: 'old', iris: '#3a2a20', shoes: '#4a3a2a', ...o });
/** An envoy of the emperor in Constantinople: blue-violet court tunic, gold-trimmed purple cloak. */
export const envoy = (x, y, s, o = {}) => hd(x, y, s, { top: '#3e4a8a', mantle: '#5a2a6a', lining: GOLD, trim: GOLD, belt: '#c8963e', skin: '#e2b48f', hair: '#2a1c14', beard: '#2a1c14',
  beardStyle: 'short', age: 'mid', iris: '#3a2a20', shoes: '#3a2a1e', mood: 'stern', ...o });
/** A Roman senator (Andromachus): white toga with the broad purple stripe, grey hair, clean-shaven. */
export const senator = (x, y, s, o = {}) => hd(x, y, s, { top: '#f2ece0', mantle: '#f6f2ea', lining: '#e8e0d0', trim: '#6a2a6a', belt: false, skin: '#e8bc9a', hair: '#bcb6ac',
  hairStyle: 'short', beard: null, age: 'old', iris: '#4a3a2a', shoes: '#6a2a2a', mood: 'stern', ...o, over: '<path d="M-22 -206 L-26 -12" stroke="#6a2a6a" stroke-width="10"/>' + (o.over || '') });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  rHook:   { key: '#ffd8a0', from: 'l', tint: '#ffe4c0', amt: 0.1, rim: '#fff0d0', rimOp: 0.8 },
  rCity:   { key: '#ffe0b0', from: 'r', tint: '#fff0dc', amt: 0.06, rim: '#fff4e0', rimOp: 0.6 },
  rLetter: { key: '#ffc090', from: 'r', tint: '#ffc4a4', amt: 0.14, rim: '#ffb878', rimOp: 0.75 },
  rFeast:  { key: '#ffe0b8', from: 'top', tint: '#b8b0d0', amt: 0.16, rim: '#ffe8c8', rimOp: 0.8 },
  rDeath:  { key: '#ffe8c8', from: 'top', tint: '#a8acd8', amt: 0.18, rim: '#ffe8d0', rimOp: 0.85 },
  rGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `glit${++LID}`, d = 5;
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
export const castShadow = (x, y, s, mode) => {
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[LIGHT[mode].from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262.
// 0 · hook: the pope before Rome; three medallions for the three African popes, the last one glows (push-fast)
function scene0() {
  const th = at(0, 'three popes'), la = at(0, 'The last'), em = at(0, 'emperor'), ti = at(0, 'This is'), nm = at(0, 'Saint Gelasius');
  const G = (op) => gelasiusHD(400, 1345, 2.4, { armL: [18, 2, 3], propL: ferula(230), ...op });
  const meds = [['I', 600, 600], ['II', 770, 570], ['III', 930, 600]].map(([n, x, y], k) =>
    popAt(th + k * 0.25, x, y, k === 2 ? `<g${M.tw([{ at: la, dur: 0.6, from: { scale: 1 }, to: { scale: 1.3 }, ease: 'back.out(2)', origin: '0 0' }])}><g opacity="0"${fadeIn(la, 0.4)}>${glow(0, 0, 160, 0.8)}</g>${popeMedallion(n, 1.2)}</g>`
      : `<g${M.tw([{ at: la, dur: 0.5, from: { opacity: 1 }, to: { opacity: 0.45 } }])}>${popeMedallion(n, 1.0)}</g>`, 0.5)).join('');
  return layer(0.9, meds)
    + lit(castShadow(400, 1345, 2.4, 'rHook') + `<g${punch(em, 0.035, 420, 900)}>`
      + seq(G, [[0, { mood: 'determined', look: [2.4, -0.6], armR: [22, 2, 3] }], [la, { mood: 'determined', look: [2.4, -0.8], armR: [22, 2, 3] }],
        [em, { mood: 'determined', look: [0, 0], armR: 104, propR: `<g transform="translate(0,6)">${scroll(1.5)}</g>` }],
        [ti, { mood: 'happy', look: [0, 0], armR: [26, 2, 3] }], [nm, { mood: 'happy', look: [0, 0], armR: [26, 2, 3], halo: nm }]]) + '</g>', 'rHook')
    + NEAR(foliage('l', 1640, { color: '#3a3a26' }) + foliage('r', 1660, { color: '#3a3a26', seed: 5 }));
}

// 1 · born a Roman of African roots; pope in 492; the hungry city fed from the Church's lands (pan-r)
function scene1() {
  const bp = at(1, 'became pope'), hc = at(1, 'hungry'), fd = at(1, 'He fed'), ld = at(1, 'own lands');
  return MID(lit([[560, '#c8a878'], [640, '#b89868'], [600, '#d4b484']].map(([x, c], k) => popAt(ld + k * 0.18, x, 1250 - (k === 2 ? 70 : 0), sack(c), 0.5)).join(''), 'rCity'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(hc - 0.2, 180, 1.0)}>${castShadow(820, 1310, 1.5, 'rCity')}`
      + seq((op) => poorMother(820, 1310, 1.5, { flip: true, look: [2.4, -0.4], ...op }), [[0, { mood: 'sad', armL: 10, armR: 30 }], [fd, { mood: 'joy', armL: 10, armR: 30 }]])
      + castShadow(710, 1310, 1.05, 'rCity')
      + seq((op) => poorChild(710, 1310, 1.05, { flip: true, look: [2.4, -1], ...op }), [[0, { mood: 'sad', armL: 10, armR: 10 }], [fd + 0.4, { mood: 'joy', armL: 70, armR: 60, propL: loaf(0, 0, 0.9) }]])
      + '</g>', 'rCity'))
    + lit(castShadow(380, 1345, 2.3, 'rCity') + seq((op) => gelasiusHD(380, 1345, 2.3, { armL: [16, 2, 3], ...op }),
      [[0, { pope: false, mood: 'happy', look: [0, 0], armR: [16, 2, 3] }], [bp, { mood: 'happy', look: [0, -0.4], armR: [16, 2, 3], propL: ferula(230) }],
       [hc, { mood: 'worried', look: [2.4, 0], armR: [16, 2, 3], propL: ferula(230) }], [fd, { mood: 'tender', look: [2.4, 0], armR: 52, propR: breadBasket, propL: ferula(230) }]]), 'rCity')
    + `<g opacity="0"${fadeIn(bp, 0.6)}>${sparkles(12, 220, 560, 640, 1000, { seed: 4 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#3e3a26', seed: 2 }));
}

// 2 · the emperor's envoy; "no army, only a pen"; the two powers (push)
function scene2() {
  const em = at(2, 'When the emperor'), na = at(2, 'no army'), wr = at(2, 'He wrote'), q0 = at(2, 'Two powers'), kg = at(2, 'power of kings'), ga = at(2, 'answer to God'), qe = at(2, 'even for kings', 1.0);
  return layer(0.92, lit(`<g${walkIn(0.2, 200, 1.1)}>${castShadow(790, 1310, 2.0, 'rLetter')}`
      + seq((op) => envoy(790, 1310, 2.0, { flip: true, armL: 16, look: [2.4, 0], ...op }),
        [[0, { mood: 'stern', armR: [20, 2, 3] }], [em, { mood: 'stern', armR: 76, propR: sealedScroll }], [q0, { mood: 'stern', armR: [20, 2, 3] }], [ga, { mood: 'surprised', armR: [20, 2, 3] }]]) + '</g>', 'rLetter'))
    + lit(castShadow(360, 1345, 2.3, 'rLetter') + seq((op) => gelasiusHD(360, 1345, 2.3, { armL: 30, propL: `<g transform="translate(0,4)">${scroll(1.4)}</g>`, ...op }),
      [[0, { mood: 'happy', look: [2.4, 0], armR: [16, 2, 3] }], [na, { mood: 'worried', look: [0, 1.4], armR: 40, propR: quill }],
       [wr, { mood: 'determined', look: [2.4, 0], armR: 40, propR: quill }], [q0 - 0.1, { mood: 'determined', look: [2.4, 0], armR: 40, propR: quill, talk: [q0, qe] }],
       [qe, { mood: 'happy', look: [0, 0], armR: [20, 2, 3] }]]), 'rLetter')
    + layer(0.9, popAt(kg, 820, 760, `<g${M.bob(5, 3)}><circle cy="-300" r="80" fill="url(#haloGlow)" opacity=".7"/><g transform="translate(0,0) scale(1.6)">${crown}</g></g>`, 0.6))
    + `<g opacity="0"${fadeIn(ga, 0.9)}>${glow(360, 700, 380, 0.45)}${sparkles(12, 220, 520, 560, 900, { seed: 9 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#2a2434', seed: 4 }));
}

// 3 · the Lupercalia: the senator blames the pope for a plague; he stands firm and the pagan feast is gone (dolly)
function scene3() {
  const pl = at(3, 'When plague'), bl = at(3, 'blamed'), sf = at(3, 'He stood firm'), gn = at(3, 'gone for good');
  return MID(lit(`<g transform="translate(660,1250) scale(0.9)">${pagan(gn - 0.6)}</g>`, 'rFeast'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(pl - 0.3, 200, 1.0)}>${castShadow(830, 1310, 2.0, 'rFeast')}`
      + seq((op) => senator(830, 1310, 2.0, { flip: true, armL: 14, look: [2.4, 0], ...op }),
        [[0, { mood: 'stern', armR: [20, 2, 3] }], [bl, { mood: 'stern', armR: [84, 3, 2.2] }], [gn, { mood: 'surprised', armR: [20, 2, 3] }]]) + '</g>', 'rFeast'))
    + lit(castShadow(360, 1345, 2.35, 'rFeast') + seq((op) => gelasiusHD(360, 1345, 2.35, { armL: [18, 2, 3], propL: ferula(230), ...op }),
      [[0, { mood: 'sad', look: [2.4, 0], armR: [16, 2, 3] }], [bl, { mood: 'determined', look: [2.4, 0], armR: [16, 2, 3] }],
       [sf, { mood: 'determined', look: [0, 0], armR: [30, 2, 3], halo: sf + 0.3 }], [gn + 0.6, { mood: 'peaceful', look: [0, 0], armR: [30, 2, 3], halo: true }]]), 'rFeast')
    + `<g opacity="0"${fadeIn(sf, 1.2)}>${glow(360, 760, 420, 0.5)}${sparkles(14, 200, 560, 560, 980, { seed: 13 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#22202c', seed: 6 }) + foliage('r', 1660, { color: '#22202c', seed: 7 }));
}

// 4 · he dies with empty hands, having filled so many others (tilt-up + rack focus)
function scene4() {
  const eh = at(4, 'empty hands'), fl = at(4, 'filled');
  const poor = [[640, (o) => poorMother(640, 1262, 1.4, o)], [740, (o) => poorChild(740, 1262, 1.0, o)], [830, (o) => poorOld(830, 1262, 1.35, o)]].map(([x, draw], k) =>
    castShadow(x, 1262, 1.3, 'rDeath') + seq((op) => draw({ flip: true, look: [2.2, -0.6], ...op }), [[0, { mood: 'sad', armL: 10, armR: 12 }], [fl + k * 0.2, { mood: 'tender', armL: 10, armR: 52, propR: loaf(0, 0, 0.8) }]])).join('');
  return MID(lit(`<g opacity="0"${fadeIn(0.3, 0.8)}>${poor}</g>`, 'rDeath'))
    + lit(castShadow(400, 1345, 2.3, 'rDeath') + seq((op) => gelasiusHD(400, 1345, 2.3, { halo: true, ...op }),
      [[0, { mood: 'tender', look: [2, -0.4], armL: [16, 2, 3], armR: [16, 2, 3] }], [eh, { mood: 'peaceful', look: [0, -1], armL: 46, armR: 46 }]]), 'rDeath')
    + `<g opacity="0"${fadeIn(eh, 1.2)}>${glow(400, 760, 440, 0.5)}${sparkles(14, 220, 600, 560, 980, { seed: 16 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#1c1a2a', seed: 10 }) + foliage('r', 1650, { color: '#1c1a2a', seed: 11 }));
}

// 5 · feast-day portrait: papal staff, the basket of bread, halo (arc-r)
function scene5() {
  const fd = at(5, 'feast'), bu = at(5, 'buried'), pr = at(5, 'pray for us');
  return layer(0.92, lit(`<g opacity="0"${walkIn(bu, 120, 1.0)}>${castShadow(800, 1310, 1.05, 'rGlory')}${poorChild(800, 1310, 1.05, { flip: true, mood: 'joy', look: [2.4, -1], armL: 70, propL: loaf(0, 0, 0.9), armR: 20 })}</g>`, 'rGlory'))
    + lit(castShadow(500, 1345, 2.35, 'rGlory') + seq((op) => gelasiusHD(500, 1345, 2.35, { halo: true, armL: [16, 2, 3], propL: ferula(230), armR: 52, propR: breadBasket, ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [fd, { mood: 'happy', look: [2.2, -0.4] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'rGlory')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 260, 740, 480, 900, { seed: 21 })}</g>`
    + NEAR(bokeh(7, { seed: 25 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

export const STORY = {
  slug: 'st_gelasius', name: 'Pope_St_Gelasius_I_The_Last_African_Pope',
  bg3d: './gelasius.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { gelasius: { voice: 'im_nicola', speed: 0.88 } },
  thumb_hook: 'The last African pope', thumb_title: 'Pope St. Gelasius I', thumb_scene: 0, thumb_t: 3.2, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 900, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti wˈʌn': 'noʊvˈɛmbɚ twˈɛnti fˈɜːst',   // November 21 -> November twenty-first
    'dʒɛlˈeɪsɪəs': 'dʒəlˈeɪʃəs',     // Gelasius: jeh-LAY-shus
  },
  scenes: [
    { kicker: 'ROME · AD 492', title: 'The Last African Pope', art: scene0, bg3d: 'rHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Only three popes in history came from Africa.', 'The last one stood up to an emperor.', 'This is Pope Saint Gelasius.'] },
    { kicker: 'ROME · 492', title: 'Bread for a Hungry City', art: scene1, bg3d: 'rCity', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Born a Roman of African roots, he became pope in 492, leading a hungry city.', "He fed the poor from the Church's own lands."] },
    { kicker: 'A LETTER TO THE EMPEROR · 494', title: 'Two Powers', art: scene2, bg3d: 'rLetter', front3d: true, cam: { move: 'push', amt: 0.07, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['When the emperor in the East pushed Rome to bend on the faith, Gelasius had no army, only a pen.', 'He wrote:',
        { text: 'Two powers rule this world: the sacred authority of priests, and the power of kings. And priests answer to God, even for kings.', who: 'gelasius' }] },
    { kicker: 'ROME · AROUND 495', title: 'The Pagan Feast', art: scene3, bg3d: 'rFeast', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ["Rome's nobles still kept the Lupercalia, an old pagan feast.", 'When plague struck, a senator blamed the pope for ending it.',
        { text: 'He stood firm, and the pagan feast was gone for good.', speed: 0.85 }] },
    { kicker: 'ROME · NOVEMBER 496', title: 'Empty Hands', art: scene4, bg3d: 'rDeath', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['He died in 496, after only four years as pope.', 'He left with empty hands, because he had filled so many others.'] },
    { kicker: 'FEAST DAY · NOVEMBER 21', title: 'Pope Saint Gelasius I', art: scene5, bg3d: 'rGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 21, the day he was buried.', 'Pope Saint Gelasius, pray for us.'] },
  ],
};
