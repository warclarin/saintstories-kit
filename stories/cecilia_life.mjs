// St. Cecilia (whole life, from her ancient Acts, told as "her ancient story says"). Feast: November 22.
// All-3D backgrounds (cecilia_life.bg3d.js: roma() from gelasius.bg3d.js); cam3d; characters hd() (redrawn from the
// person()-based Cecilia of cecilia_wedding_angel.mjs, same colours: cream tunic, red palla, crown of roses and lilies).
// Sources: Catholic Encyclopedia "St. Cecilia" (Kirsch 1908: a Roman of senatorial family, Christian from infancy, married
// to the pagan Valerianus; "cantantibus organis ... in corde suo soli domino decantabat"; Valerianus baptized by Urban on the
// Via Appia; with his brother Tiburtius he buried the martyrs and both were condemned by the prefect Turcius Almachius;
// Cecilia "condemned to be suffocated in the bath of her own house" and "remained unhurt in the overheated room"; the
// executioner "let his sword fall three times" and fled; "She lived three days, made dispositions in favour of the poor,
// and provided that after her death her house should be dedicated as a church"; buried by Urban in the Catacomb of
// Callistus; 1599, Cardinal Sfondrato found her sarcophagus; Maderno's statue shows her "lying ... just as she had received
// the death-blow"; the Acts are "a pious romance", her martyrdom a historical fact); Wikipedia "Cecilia of Rome" (1599:
// "according to multiple witnesses, her body was found to be still incorrupt"); Franciscan Media (struck three times,
// lived three days, asked the pope to make her home a church; patron of musicians; d. 230?).
// Meta-safe version (user's review 2026-11-22): no executioner on screen (prayer, a white flash, then light); the 1599 body
// is shown as Maderno's white marble statue; the bath shows her fully clothed and calm.
// Exported for later reels: ceciliaHD, valerianHD, tiburtiusHD, angelHD, steam, bathRim, peristyle, maderno, churchIcon.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { SKC, HAIRC, TUNIC, PALLA, VEIL, wreathAt, wreathProp, wings, organ, notes, column } from './cecilia_wedding_angel.mjs';
import { poorMother, poorChild, loaf, senator } from './gelasius.mjs';

const at = wordTimes('st_cecilia_life');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const flash = (t) => `<g opacity="0"${fadeIn(t, 0.15)}><g${fadeOut(t + 0.18, 0.7)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".75"/></g></g>`;

// ================================================================ characters
const wreath = wreathAt(-292);
/** St. Cecilia: cream tunic, red palla with gold, veil over her hair (a girl: hair showing; bride: the flame-orange veil). */
export const ceciliaHD = (x, y, s, { girl = false, bride = false, crown = false, over = '', ...o } = {}) => hd(x, y, s, {
  top: TUNIC, mantle: PALLA, lining: GOLD, trim: GOLD, belt: GOLD, skin: SKC, hair: HAIRC, hairStyle: 'long', beard: null, age: 'young', iris: '#4a3a2a', shoes: '#8a5a3a',
  veil: bride ? VEIL : '#f6efe2', veilHair: girl ? 'long' : 'covered', ...o, over: (crown ? wreath : '') + over });
export const valerianHD = (x, y, s, { crown = false, over = '', ...o } = {}) => hd(x, y, s, { top: '#e8dcc4', mantle: '#f2ece0', lining: '#e0d4c0', trim: '#8a2a3a', belt: false,
  skin: '#e2b48f', hair: '#3a2a1e', hairStyle: 'short', beard: null, age: 'young', iris: '#4a3a2a', shoes: '#6a4a34', ...o, over: (crown ? wreath : '') + over });
export const tiburtiusHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#4e6e56', mantle: '#ece4d2', lining: '#d8ccb4', trim: '#4e6e56', belt: false, skin: '#dcaa84',
  hair: '#2a1c14', hairStyle: 'curly', beard: '#2a1c14', beardStyle: 'short', age: 'young', iris: '#3a2a20', shoes: '#5a3a22', ...o });
export const angelHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#fbf4e4', mantle: null, trim: GOLD, belt: GOLD, skin: '#f0caa8', hair: '#e0a84a', hairStyle: 'long', beard: null,
  age: 'young', iris: '#5a7aa8', shoes: '#e8d8b0', halo: true, mood: 'tender', under: wings, ...o });
const father = (x, y, s, o = {}) => hd(x, y, s, { top: '#ece4d2', mantle: '#f4eee4', lining: '#e0d4c0', trim: '#6a2a6a', belt: false, skin: '#e8bc9a', hair: '#bcb4a8', beard: '#bcb4a8',
  beardStyle: 'short', age: 'old', iris: '#4a3a2a', shoes: '#6a2a2a', ...o });
const mother = (x, y, s, o = {}) => hd(x, y, s, { top: '#5a6aa0', mantle: '#c8a86a', lining: '#5a6aa0', veil: '#efe4d0', veilHair: 'covered', belt: '#c8963e', skin: '#e8bc9a',
  hair: '#5a4030', beard: null, age: 'mid', iris: '#4a3a2a', shoes: '#6a4a34', ...o });

// ================================================================ set pieces (SVG cards in front of the 3D Rome)
/** Two columns of her peristyle framing the scene (feet at y). */
export const peristyle = (y, xs = [70, 1010], h = 760) => xs.map((x) => column(x, y, h, { c: '#efe4cc' })).join('');
/** Soft drifting steam (n puffs between x0..x1, y0..y1); fades out at `out`. */
export const steam = (n, { x0 = 160, x1 = 920, y0 = 700, y1 = 1300, seed = 3, out = null, op = 0.4 } = {}) => {
  let s = '', r = seed;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < n; i++) { const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0), rr = 60 + rnd() * 90;
    s += `<g${M.drift((rnd() - 0.5) * 60, -120 - rnd() * 80)}><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#fffaf2" opacity="${f(op * (0.5 + rnd() * 0.5))}" filter="url(#blur14)"/></g>`; }
  return out == null ? s : `<g${fadeOut(out, 1.2)}>${s}</g>`;
};
/** The marble rim of the bath in front of her (centre x, top y). */
export const bathRim = (x, y, w = 620) => `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="0" width="${w}" height="70" rx="10" fill="#ece4d6"/><rect x="${-w / 2}" y="0" width="${w}" height="14" rx="7" fill="#fbf7ee"/>`
  + `<rect x="${w / 2 - 120}" y="0" width="120" height="70" rx="10" fill="#d4c8b4" opacity=".6"/><path d="M${-w / 2 + 30} 40 H${w / 2 - 30}" stroke="#d8ccb8" stroke-width="3"/></g>`;
/** Maderno's statue: Cecilia in white marble, lying on her side (centre x, floor y), on a slab, under an arched niche. */
export const maderno = (x, y, s = 1) => {
  const statue = hd(0, 0, s, { top: '#f4f0e8', mantle: '#ece6dc', lining: '#f8f4ee', trim: '#e4ddd2', belt: false, skin: '#f2ede4', hair: '#e8e2d8', hairStyle: 'long', beard: null,
    veil: '#efe8dc', veilHair: 'covered', age: 'young', iris: '#d8d0c4', shoes: '#e8e2d8', mood: 'peaceful', armL: 20, armR: 20, ph: 0.5 });
  return `<g transform="translate(${x},${y})"><path d="M-330 0 V-380 Q-330 -560 0 -580 Q330 -560 330 -380 V0Z" fill="#2a1e2a"/><path d="M-300 0 V-370 Q-300 -530 0 -548 Q300 -530 300 -370 V0Z" fill="#3e2a34"/>`
    + `<path d="M-300 -370 Q-300 -530 0 -548 Q300 -530 300 -370" stroke="${GOLD}" stroke-width="8" fill="none"/><circle cy="-200" r="260" fill="url(#haloGlow)" opacity=".35"/>`
    + `<rect x="-280" y="-80" width="560" height="80" rx="8" fill="#d8ccb8"/><rect x="-280" y="-80" width="560" height="14" rx="6" fill="#f2ece2"/>`
    + `<g transform="translate(${f(160 * s)},-80) rotate(-90)">${statue}</g></g>`;
};
const candle = (x, y, ph = 0) => `<g transform="translate(${x},${y})"><rect x="-8" y="-90" width="16" height="90" rx="4" fill="#fbf6ea"/><circle cy="-104" r="70" fill="url(#sunGlow)" opacity=".7"${M.flick(1.6, ph, 0.7)}/>`
  + `<g${M.flick(0.8, ph, 0.7)}><ellipse cy="-102" rx="6" ry="13" fill="#ffd27a"/><ellipse cy="-99" rx="3" ry="6" fill="#fff6d8"/></g><rect x="-22" y="-4" width="44" height="10" rx="4" fill="${GOLD}"/></g>`;
/** Santa Cecilia in Trastevere: a small church with a bell tower (her house became a church). */
export const churchIcon = (s = 1) => `<g transform="scale(${s})"><circle cy="-60" r="120" fill="url(#haloGlow)" opacity=".8"/><rect x="-70" y="-90" width="110" height="90" fill="#efe2cc"/><path d="M-78 -90 L-15 -134 L48 -90Z" fill="#b8603e"/>`
  + `<rect x="50" y="-170" width="40" height="170" fill="#e4d2b8"/><path d="M46 -170 L70 -196 L94 -170Z" fill="#b8603e"/><rect x="62" y="-150" width="16" height="22" rx="8" fill="#5a4030"/>`
  + `<rect x="-28" y="-46" width="26" height="46" rx="13" fill="#5a4030"/><circle cx="-15" cy="-110" r="8" fill="#ffd98a"/></g>`;
const sticker = (t, text) => `<g opacity="0"${fadeIn(t, 0.6)}><g transform="translate(540,470)"><rect x="-330" y="-40" width="660" height="80" rx="40" fill="#1a1222" opacity=".72"/>`
  + `<text y="13" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="34" fill="#fff4cc">${text}</text></g></g>`;

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  cHook:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.12, rim: '#ffd2a8', rimOp: 0.85 },
  cYouth: { key: '#ffd8a0', from: 'l', tint: '#ffe4c0', amt: 0.08, rim: '#fff0d0', rimOp: 0.75 },
  cWed:   { key: '#ffc090', from: 'r', tint: '#ffc4a4', amt: 0.12, rim: '#ffb878', rimOp: 0.75 },
  cMart:  { key: '#ffe8c8', from: 'top', tint: '#a8acd8', amt: 0.16, rim: '#ffe8d0', rimOp: 0.85 },
  cBath:  { key: '#ffe0b8', from: 'top', tint: '#c8c0dc', amt: 0.12, rim: '#ffe8c8', rimOp: 0.8 },
  cThree: { key: '#ffe8c8', from: 'top', tint: '#a8acd8', amt: 0.16, rim: '#ffe8d0', rimOp: 0.85 },
  c1599:  { key: '#ffc090', from: 'back', tint: '#ffc4a4', amt: 0.12, rim: '#ffb878', rimOp: 0.75 },
  cGlory: { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `clit${++LID}`, d = 5;
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
// 0 · hook: Cecilia with her organ and crown of roses and lilies; "twice they tried" (push-fast)
function scene0() {
  const tw = at(0, 'twice she'), nm = at(0, 'Saint Cecilia');
  return lit(castShadow(430, 1345, 2.4, 'cHook') + `<g${punch(tw, 0.035, 440, 900)}>`
      + seq((op) => ceciliaHD(430, 1345, 2.4, { crown: true, armL: [16, 2, 3], armR: 40, propR: organ(1.25), ...op }),
        [[0, { mood: 'determined', look: [0, 0] }], [tw, { mood: 'happy', look: [0, 0] }], [nm, { mood: 'happy', look: [0, 0], halo: nm }]]) + '</g>', 'cHook')
    + notes(7, { x0: 560, x1: 820, y0: 640, y1: 1000, seed: 4 })
    + `<g opacity="0"${fadeIn(tw, 0.6)}>${glow(430, 820, 380, 0.4)}${sparkles(14, 230, 660, 560, 1000, { seed: 3 })}</g>`
    + NEAR(bokeh(6, { seed: 7 }) + foliage('l', 1640, { color: '#2a2440' }) + foliage('r', 1660, { color: '#2a2440', seed: 5 }));
}

// 1 · a Roman noble who gave her heart to God; her parents marry her to a pagan, Valerian (pan-r)
function scene1() {
  const pa = at(1, 'But her parents'), va = at(1, 'Valerian');
  return layer(0.92, lit(`<g opacity="0"${walkIn(pa, 160, 1.0)}>${castShadow(700, 1310, 1.9, 'cYouth')}${father(700, 1310, 1.9, { flip: true, mood: 'stern', armR: [70, 3, 2.4], armL: 14, look: [2.4, 0] })}`
      + `${castShadow(860, 1310, 1.8, 'cYouth')}${mother(860, 1310, 1.8, { flip: true, mood: 'happy', armL: 14, armR: 14, look: [2.4, 0] })}</g>`, 'cYouth'))
    + layer(0.78, lit(`<g opacity="0"${walkIn(va, 140, 1.0)}>${castShadow(530, 1262, 1.5, 'cYouth')}${valerianHD(530, 1262, 1.5, { flip: true, mood: 'happy', armL: 14, armR: 14, look: [2.4, 0] })}</g>`, 'cYouth'))
    + lit(castShadow(330, 1345, 2.2, 'cYouth') + seq((op) => ceciliaHD(330, 1345, 2.2, { girl: true, ...op }),
      [[0, { mood: 'peaceful', look: [0, -1], armL: 36, armR: 36 }], [pa, { mood: 'worried', look: [2.4, 0], armL: 14, armR: 14 }]]), 'cYouth')
    + `<g${fadeOut(pa, 0.8)}>${glow(330, 760, 300, 0.4)}</g>`
    + NEAR(foliage('l', 1650, { color: '#3a3a26', seed: 2 }));
}

// 2 · the wedding: she sings to God in her heart; the angel; Valerian baptized, both crowned (drift)
function scene2() {
  const sg = at(2, 'sang'), bp = at(2, 'Soon Valerian');
  return MID(lit(peristyle(1250), 'cWed'))
    + layer(0.92, lit(`<g opacity="0"${fadeIn(bp - 0.4, 0.9)}>${angelHD(560, 1310, 1.8, { look: [0, 0.6], armL: 70, armR: 70 })}</g>`, 'cWed'))
    + lit(castShadow(330, 1345, 2.2, 'cWed') + seq((op) => ceciliaHD(330, 1345, 2.2, { bride: true, armL: 34, armR: 34, ...op }),
        [[0, { mood: 'happy', look: [2.4, 0] }], [sg, { mood: 'peaceful', look: [0, -1] }], [bp + 0.4, { mood: 'tender', crown: true, look: [2.4, 0] }]])
      + castShadow(780, 1345, 2.15, 'cWed') + seq((op) => valerianHD(780, 1345, 2.15, { flip: true, armL: 14, armR: 14, ...op }),
        [[0, { mood: 'happy', look: [2.4, 0] }], [bp, { mood: 'awe', look: [1, -1.6] }], [bp + 0.4, { mood: 'joy', crown: true, look: [2.4, 0] }]]), 'cWed')
    + `<g opacity="0"${fadeIn(sg, 0.6)}>${notes(8, { x0: 220, x1: 480, y0: 560, y1: 900, seed: 6 })}</g>`
    + `<g opacity="0"${fadeIn(bp + 0.3, 0.6)}>${sparkles(16, 260, 860, 520, 900, { seed: 8 })}</g>`
    + NEAR(bokeh(6, { seed: 13 }) + foliage('r', 1650, { color: '#2a2434', seed: 4 }));
}

// 3 · Valerian and his brother martyred for burying Christians (push)
function scene3() {
  const mt = at(3, 'martyred');
  const bro = (draw, x) => castShadow(x, 1310, 1.95, 'cMart') + seq((op) => draw(x, 1310, 1.95, { flip: true, look: [2.4, -0.4], armL: 14, armR: 34, propR: palm_frond(1.0, -8, 2), ...op }),
    [[0, { mood: 'determined' }], [mt, { mood: 'peaceful', halo: mt }]]);
  return layer(0.92, lit(`<g${M.tw([{ at: mt + 1.2, dur: 1.2, from: { opacity: 1 }, to: { opacity: 0.35 } }])}>${bro(valerianHD, 640)}${bro(tiburtiusHD, 820)}</g>`, 'cMart'))
    + lit(castShadow(320, 1345, 2.2, 'cMart') + seq((op) => ceciliaHD(320, 1345, 2.2, { armL: 34, armR: 34, ...op }),
      [[0, { mood: 'sad', look: [2.4, 0] }], [mt + 0.8, { mood: 'peaceful', look: [2.4, -1] }]]), 'cMart')
    + `<g opacity="0"${fadeIn(mt, 1.0)}>${glow(730, 760, 380, 0.5)}${sparkles(14, 560, 920, 560, 960, { seed: 11 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#1c1a2a', seed: 6 }) + foliage('r', 1660, { color: '#1c1a2a', seed: 7 }));
}

// 4 · condemned to die in the steam of her own bath; she comes out unhurt (dolly)
function scene4() {
  const st = at(4, 'scalding'), uh = at(4, 'She came out');
  return MID(lit(peristyle(1250), 'cBath'))
    + layer(0.92, lit(`<g${fadeOut(uh - 0.2, 0.8)}>${castShadow(820, 1310, 1.95, 'cBath')}${senator(820, 1310, 1.95, { flip: true, armR: [84, 3, 2.2], armL: 14, look: [2.4, 0] })}</g>`, 'cBath'))
    + lit(castShadow(400, 1345, 2.25, 'cBath') + seq((op) => ceciliaHD(400, 1345, 2.25, { ...op }),
      [[0, { mood: 'determined', look: [2.4, 0], armL: 16, armR: 16 }], [st, { mood: 'peaceful', look: [0, -1], armL: 36, armR: 36 }], [uh, { mood: 'happy', look: [0, 0], armL: 30, armR: 30 }]])
      + bathRim(400, 1180), 'cBath')
    + `<g opacity="0"${fadeIn(st - 0.3, 1.0)}>${steam(16, { x0: 140, x1: 720, y0: 760, y1: 1260, seed: 5, out: uh, op: 0.65 })}</g>`
    + `<g opacity="0"${fadeIn(uh, 0.8)}>${glow(400, 800, 400, 0.45)}${sparkles(14, 220, 600, 560, 980, { seed: 15 })}</g>`
    + NEAR(`<g opacity="0"${fadeIn(st, 1.0)}>${steam(6, { x0: 0, x1: 1080, y0: 1200, y1: 1500, seed: 9, out: uh, op: 0.3 })}</g>`);
}

// 5 · struck three times (no one on screen: prayer, a flash, then light); three more days; the poor; her home a church (tilt-up + rack)
function scene5() {
  const sk = at(5, 'struck'), ld = at(5, 'But she lived'), pr = at(5, 'the poor'), ch = at(5, 'church');
  return MID(lit(peristyle(1250), 'cThree'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(pr - 0.3, 160, 1.0)}>${castShadow(700, 1310, 1.6, 'cThree')}${poorMother(700, 1310, 1.6, { flip: true, mood: 'tender', look: [2.4, 0.4], armL: 10, armR: 52, propR: loaf(0, 0, 0.8) })}`
      + `${castShadow(830, 1310, 1.1, 'cThree')}${poorChild(830, 1310, 1.1, { flip: true, mood: 'joy', look: [2.4, -0.4], armL: 70, propL: loaf(0, 0, 0.8), armR: 20 })}</g>`, 'cThree'))
    + layer(0.9, popAt(ch, 820, 600, `<g${M.bob(5, 3)}>${churchIcon(1.2)}</g>`, 0.6))
    + lit(castShadow(380, 1345, 2.25, 'cThree') + seq((op) => ceciliaHD(380, 1345, 2.25, { kneel: true, armL: 36, armR: 36, ...op }),
      [[0, { mood: 'peaceful', look: [0, -1] }], [ld, { mood: 'peaceful', look: [0, -1], halo: ld }], [pr, { mood: 'tender', look: [2.4, 0], armL: 36, armR: 52 }]]), 'cThree')
    + flash(sk)
    + `<g opacity="0"${fadeIn(sk + 0.2, 1.2)}>${glow(380, 760, 440, 0.5)}${sparkles(14, 200, 600, 560, 980, { seed: 16 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#1c1a2a', seed: 10 }) + foliage('r', 1650, { color: '#1c1a2a', seed: 11 }));
}

// 6 · 1599: the tomb opened; Maderno's statue shows how she lay; her song (pull)
function scene6() {
  const fd = at(6, 'found'), sv = at(6, 'They silenced'), sg = at(6, 'song');
  return layer(0.95, lit(`<g${fadeOut(sv - 0.2, 0.7)}>${maderno(540, 1322, 1.35) + candle(210, 1322, 0.2) + candle(870, 1322, 0.6)}</g>`, 'c1599'))
    + lit(`<g opacity="0"${fadeIn(sv - 0.1, 0.7)}>${castShadow(480, 1345, 2.3, 'c1599')}${ceciliaHD(480, 1345, 2.3, { crown: true, halo: true, mood: 'happy', talk: [sv + 0.4, sv + 2.8], look: [0, -0.6], armL: 30, armR: 40, propR: organ(1.2) })}</g>`, 'c1599')
    + `<g opacity="0"${fadeIn(fd, 1.0)}>${glow(540, 1100, 380, 0.45)}</g>`
    + `<g opacity="0"${fadeIn(sg - 0.4, 0.8)}>${notes(10, { x0: 300, x1: 780, y0: 700, y1: 1100, seed: 9 })}</g>`
    + `<g opacity="0"${fadeIn(sv, 0.8)}>${sparkles(14, 260, 820, 560, 1000, { seed: 19 })}</g>`
    + NEAR(bokeh(6, { seed: 21 }) + foliage('l', 1640, { color: '#22202c', seed: 12 }));
}

// 7 · feast-day portrait: patron of music; the question for the comments on screen (arc-r)
function scene7() {
  const mu = at(7, 'patron'), pr = at(7, 'pray for us');
  return lit(castShadow(520, 1345, 2.35, 'cGlory') + seq((op) => ceciliaHD(520, 1345, 2.35, { crown: true, halo: true, armL: 34, propL: palm_frond(1.0, -6, 2), armR: 40, propR: organ(1.25), ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [mu, { mood: 'happy', look: [2.2, -0.4] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'cGlory')
    + `<g opacity="0"${fadeIn(mu, 0.6)}>${notes(8, { x0: 640, x1: 900, y0: 640, y1: 1000, seed: 12 })}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 280, 760, 560, 900, { seed: 21 })}</g>`
    + NEAR(bokeh(7, { seed: 25 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

export const STORY = {
  slug: 'st_cecilia_life', name: 'St_Cecilia_Twice_They_Tried',
  bg3d: './cecilia_life.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  thumb_hook: 'They tried to kill her twice', thumb_title: 'St. Cecilia', thumb_scene: 0, thumb_t: 2.6, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti tˈuː': 'noʊvˈɛmbɚ twˈɛnti sˈɛkənd',   // November 22 -> November twenty-second
  },
  scenes: [
    { kicker: 'ROME · AROUND AD 230', title: 'Twice They Tried', art: scene0, bg3d: 'cHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['They tried to kill her twice, and twice she survived.', 'This is Saint Cecilia.'] },
    { kicker: 'ANCIENT ROME · ONE FAMOUS STORY', title: 'Promised to God', art: scene1, bg3d: 'cYouth', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Her ancient story says she was a Roman noble who gave her heart to God.', 'But her parents married her to a pagan, Valerian.'] },
    { kicker: 'THE WEDDING', title: 'Singing to God', art: scene2, bg3d: 'cWed', front3d: true, cam: 'drift-r',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['At her wedding, she sang to God in her heart.', 'Soon Valerian was baptized too.'] },
    { kicker: 'THE PERSECUTION', title: 'Two Brothers', art: scene3, bg3d: 'cMart', front3d: true, cam: { move: 'push', amt: 0.07, ox: 560, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: -0.5, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Then Valerian and his brother were martyred for burying Christians.'] },
    { kicker: 'HER OWN HOUSE', title: 'The Burning Bath', art: scene4, bg3d: 'cBath', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Cecilia was condemned to die in the scalding steam of her own bath.', 'She came out unhurt.'] },
    { kicker: 'ROME', title: 'Three More Days', art: scene5, bg3d: 'cThree', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['So a soldier struck her neck three times, and fled.', { text: 'But she lived three more days,', speed: 0.85 },
        'giving all she had to the poor, and asking that her home become a church.'] },
    { kicker: 'SANTA CECILIA, ROME · 1599', title: 'Just As She Fell', art: scene6, bg3d: 'c1599', front3d: true, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['In 1599, witnesses said her body was found incorrupt, lying just as she died.', 'They silenced her voice, but never her song.'] },
    { kicker: 'FEAST DAY · NOVEMBER 22', title: 'Patron of Music', art: scene7, bg3d: 'cGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is November 22, and she is the patron of musicians.', 'Saint Cecilia, pray for us.'] },
  ],
};
