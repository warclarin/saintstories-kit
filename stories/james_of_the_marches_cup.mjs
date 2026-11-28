// St. James of the Marches: the poisoned cup (one story; Bosnia in the 1430s, then Hungary, Austria, Bohemia). Feast: November 28.
// All-3D backgrounds (james_of_the_marches_cup.bg3d.js: a torchlit Bosnian royal hall from cathedral(), mountain-lake country from
// lakeAlps()); cam3d; characters hd(); Ricks Clips motion (cam.path, instant pose swaps).
// Told as the sources tell it: the poisoned cup is TRADITION (his iconography, a chalice with a snake escaping, "alludes to some
// endeavours of heretics to poison him"); in Bosnia he himself accused Queen Dorothea of trying to poison him (an accusation, not a
// proven deed). No legend detail beyond that is narrated.
// Sources: Catholic Encyclopedia (New Advent) "St. James of the Marches" (born 1391 at Monteprandone; Franciscan; commissary in
// Bosnia; missions to Hungary, Austria, Bohemia; "remarkable for the miracles he performed" and "numerous conversions"; instituted
// montes pietatis; declined Milan; died at Naples 28 November 1476; one of the patrons of Naples; represented holding a chalice from
// which a snake escapes, alluding to "some endeavours of heretics to poison him"); Wikipedia "James of the Marches" (Vicar of Bosnia
// 1435-1439; "accused Queen Dorothea of trying to poison him"; King Tvrtko II opposed him and he left Bosnia; died Naples 1476; body at
// Monteprandone; co-patron of Naples); Franciscan Tradition blog (threadbare habit, fasting, little sleep; sermon: "What did Christ
// command his apostles to do? To preach."; "the Word of God is not less than the Body of Christ.").
// Exported for later reels: jamesHD, friarOFM, snake, snakeCup, tvrtko, dorothea, throneSeat, LIGHT, lit, castShadow.
import { M, GOLD, W, sparkles, bokeh, foliage, dark, light, f, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import { speedLines, sweat, rage, steam, burst, squash } from '../cartoonfx.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';
import { chalice2, peasant } from './conrad_spider_chalice.mjs';
import { crownHead } from './elizabeth_of_hungary_roses.mjs';
import { crown } from './edmund_last_stand.mjs';

const SLUG = 'st_james_of_the_marches_cup';
const at = wordTimes(SLUG);
let SNAP = 0;
const seq = (draw, steps) => {   // instant pose swaps: each look shows exactly from its time until the next one
  const ph = (++SNAP * 0.37) % 1;
  return steps.map(([t, o], i) => { const next = steps[i + 1]?.[0], tw = [];
    if (i) tw.push({ at: t, dur: 0.001, from: { opacity: 0 }, to: { opacity: 1 } });
    if (next !== undefined) tw.push(i ? { at: next, dur: 0.001, to: { opacity: 0 } } : { at: next, dur: 0.001, from: { opacity: 1 }, to: { opacity: 0 } });
    return `<g${i ? ' opacity="0"' : ''}${tw.length ? M.tw(tw) : ''}>${draw({ ph, ...o })}</g>`; }).join('');
};
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const until = (t, svg) => `<g${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 1 }, to: { opacity: 0 } }])}>${svg}</g>`;
const from = (t, svg) => `<g opacity="0"${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }])}>${svg}</g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };
/** A row of plain silhouette listeners (art.mjs crowd() without its flags). */
const listeners = (y, n = 14, color = '#3a2a34') => { let out = '';
  for (let i = 0; i < n; i++) { const x = 40 + (i * (W - 80)) / (n - 1), h = (20 * ((i * 37) % 5)) / 5;
    out += `<g transform="translate(${f(x)},${f(y + h)})"><g${M.bob(5, 1.6 + (i % 4) * 0.25, i * 0.3)} fill="${color}"><circle cx="0" cy="-130" r="34"/><path d="M-60 0 Q-60 -90 0 -95 Q60 -90 60 0 Z"/></g></g>`; }
  return out; };

// ================================================================ props
/** A green snake rising out of a cup: base at (0, 0) = the wine surface, head up. t = the moment it rises (null: already out). */
export const snake = (s = 1, t = null) => {
  const body = `<path d="M0 6 C-16 -14 14 -30 0 -50 C-10 -64 6 -78 14 -84" stroke="#3e7a34" stroke-width="9" fill="none" stroke-linecap="round"/>`
    + `<path d="M0 6 C-16 -14 14 -30 0 -50 C-10 -64 6 -78 14 -84" stroke="#7ab85a" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="4 7" opacity=".8"/>`
    + `<ellipse cx="17" cy="-88" rx="9" ry="6.5" fill="#3e7a34" transform="rotate(-25 17 -88)"/><circle cx="20" cy="-91" r="1.8" fill="#1a1410"/>`
    + `<path d="M25 -93 L33 -97 M25 -93 L33 -92" stroke="#c8323a" stroke-width="1.8" stroke-linecap="round"/>`;
  const sway = `<g${M.sway(6, 1.6, 0, 0, 6)}>${body}</g>`;
  if (t === null) return `<g transform="scale(${s})">${sway}</g>`;
  return `<g transform="scale(${s})"><g opacity="0"${M.tw([{ at: t, dur: 0.35, from: { opacity: 0 }, to: { opacity: 1 } }])}>${sway}</g></g>`;
};
/** The chalice with the snake escaping (his iconography). snakeAt: null = always out, false = no snake, a time = rises then. */
export const snakeCup = (s = 1, snakeAt = null) => chalice2(s, { wine: true, glowOp: 0.45 })
  + (snakeAt === false ? '' : `<g transform="translate(0,${f(-56 * s)})">${snake(s * 0.9, snakeAt)}</g>`);
/** Held upright in a hand whose arm is raised `ang` degrees (counter-rotates the arm). */
const held = (svg, ang, dy = 0) => `<g transform="translate(0,${dy})">${svg}</g>`;   // hd() already keeps the hand upright
/** A carved wooden throne (base at 0, 0). */
export const throneSeat = (s = 1) => `<g transform="scale(${s})"><path d="M-110 0 V-340 Q0 -420 110 -340 V0Z" fill="#6a4228"/>`
  + `<path d="M-92 -16 V-326 Q0 -394 92 -326 V-16Z" fill="#7a2a3a"/><path d="M-92 -16 V-326 Q-40 -360 -10 -364 V-16Z" fill="#8e3646" opacity=".7"/>`
  + `<circle cx="0" cy="-372" r="12" fill="${GOLD}"/><rect x="-120" y="-120" width="240" height="22" rx="6" fill="#5a3620"/></g>`;

// ================================================================ characters (hd)
/** St. James of the Marches: Observant Franciscan, grey-brown habit with white cord, tonsure, clean-shaven. */
export const jamesHD = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#6e5a4a', plain: true, trim: '#5a4838', mantle: null,
  belt: '#ece2cc', skin: '#e2b48f', hair: '#4a3424', hairStyle: 'tonsure', beard: null, age: 'mid', iris: '#4a3424', ...o, over });
/** A Bosnian Franciscan brother (i = 0 | 1). */
const FR = [['#6a5848', '#3a2a1e', '#d9a47e', 'full'], ['#74604e', '#8a8278', '#e2b48f', 'short']];
export const friarOFM = (x, y, s, i = 0, o = {}) => { const [top, hair, skin, bs] = FR[i % 2];
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.12), mantle: null, belt: '#ece2cc', skin, hair, hairStyle: 'tonsure', beard: hair, beardStyle: bs,
    age: i % 2 ? 'old' : 'mid', iris: '#3a2a20', ...o }); };
/** King Tvrtko II of Bosnia: red tunic, blue mantle, short dark beard, crown. */
export const tvrtko = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#8a2a3a', mantle: '#2a3a6a', lining: '#e8dcc4', trim: GOLD, belt: '#c8963e',
  skin: '#e2b48f', hair: '#3a2a1e', beard: '#3a2a1e', beardStyle: 'short', age: 'mid', mood: 'stern', iris: '#3a2a20', shoes: '#3a2a20', ...o, over: crown + over });
/** Queen Dorothea (Garai, a Hungarian noblewoman): green gown, purple mantle, veil, crown. */
export const dorothea = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#2f5a4a', mantle: '#5a2a5e', lining: GOLD, trim: GOLD, belt: '#c8963e',
  veil: '#f2ece0', veilHair: 'covered', skin: '#f0c9a8', hair: '#5a3a22', beard: null, age: 'young', iris: '#3e5e8a', shoes: '#4a2a3a', ...o, over: crownHead() + over });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  jHook:   { key: '#ffb070', from: 'r', tint: '#ffb890', amt: 0.18, rim: '#ffb070', rimOp: 0.9 },
  jRoad:   { key: '#ffe0a8', from: 'r', tint: '#ffe8c8', amt: 0.1, rim: '#fff0d0', rimOp: 0.85 },
  jCourt:  { key: '#ffd8a0', from: 'top', tint: '#ffe0c0', amt: 0.12, rim: '#fff0d0', rimOp: 0.85 },
  jCup:    { key: '#ffa060', from: 'l', tint: '#e8a888', amt: 0.2, rim: '#ffb070', rimOp: 0.9 },
  jLeave:  { key: '#d0d0f0', from: 'back', tint: '#9aa0d0', amt: 0.22, rim: '#e0d8ff', rimOp: 0.8 },
  jPreach: { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
  jGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `${SLUG}_lit${++LID}`, d = 5;
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
// cam3d feet art y (plane 20): depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1245.

// 0 · HOOK. SHOT "Tradition says heretics slipped poison into a wandering friar's cup, yet he preached nearly forty more years.": James in
//     the torchlit hall holds up his chalice; on "poison" a snake rises out of it; the queen watches from the right.  SHOT "This is
//     Saint James of the Marches.": he turns to us, calm, halo.
const S0 = [380, 1345, 2.3], Q0 = [690, 1286, 1.8], K0 = [550, 1245, 1.55];
/** A stone pillar with a burning torch, close to the camera (a foreground card for depth). x = its inner edge. */
const nearPillar = (x = 70, side = -1) => { const x0 = side < 0 ? x - 260 : x, w = 260;
  return `<g><rect x="${x0}" y="-200" width="${w}" height="2400" fill="#2a1e18"/><rect x="${side < 0 ? x - 40 : x}" y="-200" width="40" height="2400" fill="#4a3628" opacity=".9"/>`
    + `<rect x="${x0}" y="1180" width="${w}" height="30" fill="#3a2a20"/><g transform="translate(${x + side * -6},860)"><rect x="-6" y="0" width="12" height="90" fill="#5a3a22"/>`
    + `<circle cy="-14" r="120" fill="url(#sunGlow)" opacity=".55"/><g${M.flick(0.5, 0, 0.7)}><path d="M0 -50 Q-16 -20 -10 0 L10 0 Q16 -20 0 -50Z" fill="#ffb040"/><path d="M0 -30 Q-7 -14 -4 0 L4 0 Q7 -14 0 -30Z" fill="#fff0b0"/></g></g></g>`; };
function scene0() {
  const po = at(0, 'poison'), pr = at(0, 'preached'), ti = at(0, 'This is');
  return layer(0.75, lit(castShadow(...K0, 'jHook') + tvrtko(...K0, { flip: true, mood: 'stern', look: [2.4, 0.2], armL: [16, 2, 3], armR: [16, 2, 3] }), 'jHook'))
    + layer(0.85, lit(castShadow(...Q0, 'jHook') + seq((op) => dorothea(...Q0, { flip: true, look: [2.4, 0.2], armL: [16, 2, 3], armR: [24, 2, 3], ...op }),
      [[0, { mood: 'stern' }], [po + 0.3, { mood: 'surprised' }], [ti, { mood: 'stern' }]]), 'jHook'))
    + lit(castShadow(...S0, 'jHook') + seq((op) => jamesHD(...S0, op),
      [[0, { mood: 'determined', look: [-1.6, -1.2], armR: [16, 2, 3], armL: 112, propL: held(snakeCup(1.15, false), 112, -6) }],
        [po, { mood: 'determined', look: [-1.6, -1.6], armR: [16, 2, 3], armL: 112, propL: held(snakeCup(1.15, po), 112, -6) }],
        [pr, { mood: 'determined', look: [2.4, 0], armR: 128, armL: 112, propL: held(snakeCup(1.15), 112, -6) }],
        [ti, { mood: 'happy', look: [0, 0], armR: [16, 2, 3], armL: 44, propL: held(snakeCup(1.05), 44, -4), halo: ti + 0.2 }]]), 'jHook')
    + speedLines(S0[0] - 130, 760, { at: po + 0.1, dur: 0.7, r0: 160, r1: 640, op: 0.35, color: '#e8ffd8', seed: 2 })
    + layer(1.35, nearPillar(-40, -1))
    + NEAR(bokeh(6, { seed: 5, sides: true, op: [0.2, 0.4] }));
}

// 1 · SHOT "He was an Italian Franciscan, sent to lead Bosnia's friars.": a Bosnian mountain lake and friary; James walks in, two
//     brothers come to meet him.  SHOT "He wore a threadbare habit, fasted, and barely slept.": he kneels to pray at dusk, tired.
const S1 = [420, 1345, 2.25], F1a = [780, 1322, 2.0], F1b = [930, 1310, 1.9];
function scene1() {
  const it = at(1, 'Italian'), fr = at(1, "friars"), th = at(1, 'threadbare'), fa = at(1, 'fasted'), sl = at(1, 'barely slept');
  const patch = '<g><rect x="-26" y="-118" width="18" height="16" rx="2" fill="#5a4838"/><path d="M-26 -118 h18 M-26 -102 h18" stroke="#8a7460" stroke-width="1.4" stroke-dasharray="2 3"/>'
    + '<rect x="12" y="-64" width="16" height="14" rx="2" fill="#5a4838"/><path d="M12 -64 h16 M12 -50 h16" stroke="#8a7460" stroke-width="1.4" stroke-dasharray="2 3"/></g>';
  return layer(0.95, lit(from(fr - 0.4, walk(fr - 0.4, 0.8, 200, castShadow(...F1a, 'jRoad') + friarOFM(...F1a, 0, { flip: true, mood: 'happy', look: [2.4, 0], armL: [16, 2, 3], armR: [60, 2, 3] })
      + castShadow(...F1b, 'jRoad') + friarOFM(...F1b, 1, { flip: true, mood: 'joy', look: [2.4, 0], armL: [16, 2, 3], armR: [16, 2, 3] }))), 'jRoad'))
    + lit(castShadow(...S1, 'jRoad') + walk(0, Math.max(0.6, it), -220, seq((op) => jamesHD(...S1, { over: patch, ...op }),
      [[0, { mood: 'happy', look: [2.4, 0], armL: [16, 2, 3], armR: [16, 2, 3] }], [fr, { mood: 'happy', look: [2.4, 0], armL: [16, 2, 3], armR: [64, 2, 3] }],
        [th, { mood: 'happy', look: [0, 0.6], armL: [16, 2, 3], armR: [16, 2, 3] }], [fa, { mood: 'peaceful', kneel: true, ...PRAY }], [sl, { mood: 'sad', kneel: true, look: [0, 1.2], ...PRAY }]])), 'jRoad')
    + NEAR(foliage('l', 1650, { color: '#22362a', seed: 4 }));
}

// 2 · SHOT "King Tvrtko II opposed him and his preaching.": the king on his throne points at James, furious.  SHOT "His sermons asked
//     one question:" James turns to us, hand raised.  SHOT (quote): he preaches the line himself.
const S2 = [300, 1345, 2.25], K2 = [690, 1322, 2.0];
function scene2() {
  const op = at(2, 'opposed'), hs = at(2, 'His sermons'), wd = at(2, 'What did'), tp = at(2, 'To preach', 0.9);
  return layer(0.95, `<g transform="translate(${K2[0]},${K2[1] - 6})">${throneSeat(1.05)}</g>`
      + lit(castShadow(...K2, 'jCourt') + seq((o) => tvrtko(...K2, { flip: true, look: [2.4, 0.4], armL: [16, 2, 3], ...o }),
        [[0, { mood: 'stern', armR: [24, 2, 3] }], [op, { mood: 'stern', armR: 78 }], [hs, { mood: 'stern', armR: [24, 2, 3] }]]), 'jCourt')
      + rage(...K2, op + 0.2) + steam(...K2, op + 0.4))
    + lit(castShadow(...S2, 'jCourt') + seq((o) => jamesHD(...S2, { armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', look: [2.4, 0], armR: [16, 2, 3] }], [op + 0.3, { mood: 'determined', look: [2.4, 0], armR: [16, 2, 3] }],
        [hs, { mood: 'determined', look: [0, 0], armR: 132 }], [wd, { mood: 'determined', look: [0, 0], armR: 132, talk: [wd, tp] }]]), 'jCourt')
    + `<g opacity="0"${fadeIn(wd, 0.6)}>${glow(S2[0], 800, 240, 0.4)}</g>`
    + NEAR(bokeh(5, { seed: 9, sides: true, op: [0.15, 0.3] }));
}

// 3 · SHOT "Then James accused Queen Dorothea herself of trying to poison him.": the queen holds out a cup; James points at it.
//     SHOT "But the poison never took his life.": a snake rises out of the cup, a burst of light, the cup is harmless.  SHOT "That is
//     why he holds a chalice with a snake.": the icon pose, halo.
const S3 = [360, 1345, 2.25], Q3 = [790, 1322, 2.05];
function scene3() {
  const ac = at(3, 'accused'), bu = at(3, 'But the poison'), nv = at(3, 'never'), th = at(3, 'That is why');
  return layer(0.95, lit(castShadow(...Q3, 'jCup') + seq((o) => dorothea(...Q3, { flip: true, look: [2.4, 0.4], armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', armR: 62 }], [ac + 0.3, { mood: 'surprised', armR: 62 }], [th, { mood: 'worried', armR: [16, 2, 3] }]]), 'jCup')
      + until(th, lit(`<g transform="translate(${Q3[0] - 175},${Q3[1] - 300})">${snakeCup(1.5, bu + 0.1)}</g>`, 'jCup'))
      + sweat(...Q3, nv + 0.3))
    + lit(castShadow(...S3, 'jCup') + seq((o) => jamesHD(...S3, { armL: [16, 2, 3], ...o }),
      [[0, { mood: 'worried', look: [2.4, 0.4], armR: [16, 2, 3] }], [ac, { mood: 'determined', look: [2.4, 0.2], armR: 82 }],
        [bu, { mood: 'surprised', look: [2.4, 0], armR: 30 }], [nv + 0.5, { mood: 'peaceful', armR: 30 }],
        [th, { mood: 'happy', look: [0, 0], armR: [16, 2, 3], armL: 112, propL: held(snakeCup(1.15), 112, -6), halo: th + 0.2 }]]), 'jCup')
    + burst(Q3[0] - 150, 830, 380, nv, { color: '#fff0c8', rays: 14, sparks: 18, seed: 4 })
    + NEAR(bokeh(5, { seed: 13, sides: true, op: [0.15, 0.3] }));
}

// 4 · SHOT "He had to leave Bosnia.": dusk in the mountains; James walks away along the lake, looking back.  SHOT "It looked like his
//     enemies had won.": the king and queen on the castle terrace, satisfied.
const S4 = [520, 1345, 2.25], K4 = [640, 1286, 1.75], Q4 = [820, 1286, 1.7];
function scene4() {
  const le = at(4, 'leave'), en = at(4, 'enemies');
  return until(en, lit(castShadow(...S4, 'jLeave') + walkOut(le + 0.3, 2.6, -140, seq((o) => jamesHD(...S4, { flip: true, armL: [16, 2, 3], armR: [16, 2, 3], ...o }),
      [[0, { mood: 'sad', look: [2.4, 0.6] }], [le + 0.3, { mood: 'sad', look: [-2.4, 0.4] }]])), 'jLeave'))
    + from(en, layer(0.85, lit(castShadow(...K4, 'jLeave') + tvrtko(...K4, { mood: 'happy', look: [-1.6, 0], armL: [16, 2, 3], armR: [16, 2, 3] })
      + castShadow(...Q4, 'jLeave') + dorothea(...Q4, { flip: true, mood: 'happy', look: [2.4, 0], armL: [16, 2, 3], armR: [16, 2, 3] }), 'jLeave')))
    + NEAR(foliage('r', 1660, { color: '#1e2234', seed: 6 }));
}

// 5 · SHOT "But he preached on for decades, and crowds turned to God.": a sunset town square; James preaches from a stone step,
//     villagers gather and kneel.  SHOT "Poison could reach his cup, but never his words.": he lifts the chalice; we see him whole.
const S5 = [470, 1290, 2.2], P5 = [[680, 1322, 1.85, 0], [830, 1310, 1.75, 1]], PR5 = [[120, 1345, 1.8, 0]];
function scene5() {
  const bu = at(5, 'But he preached'), cr = at(5, 'crowds'), po = at(5, 'Poison could');
  const step = `<g transform="translate(${S5[0]},${S5[1] + 6})"><path d="M-120 0 L-110 -54 L110 -54 L120 0Z" fill="#8a7a68"/><path d="M-110 -54 L110 -54 L104 -44 L-104 -44Z" fill="#a8988a"/></g>`;
  return MID(`<g opacity="0"${fadeIn(cr - 0.2, 0.8)}>${listeners(1250, 16)}</g>`)
    + layer(0.95, P5.map(([x, y, s, i], k) => from(cr + k * 0.25, walk(cr + k * 0.25, 0.6, 140, lit(castShadow(x, y, s, 'jPreach')
      + seq((o) => peasant(x, y, s, i, { flip: true, look: [2.4, -0.4], armL: [16, 2, 3], armR: [16, 2, 3], ...o }),
        [[0, { mood: 'surprised' }], [cr + 1.0 + k * 0.3, { mood: 'awe', kneel: k !== 1, ...(k !== 1 ? PRAY : {}) }]]), 'jPreach')))).join(''))
    + lit(step + castShadow(...S5, 'jPreach') + seq((o) => jamesHD(...S5, { armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', look: [2.4, 0], armR: 132 }], [cr, { mood: 'joy', look: [2.4, 0], armR: 132 }],
        [po, { mood: 'happy', look: [0, 0], armR: [16, 2, 3], armL: 112, propL: held(snakeCup(1.15), 112, -6), halo: po + 0.2 }]]), 'jPreach')
    + layer(1, PR5.map(([x, y, s, i]) => from(cr + 0.5, lit(castShadow(x, y, s, 'jPreach') + peasant(x, y, s, i, { mood: 'joy', look: [2.4, -0.6], armL: [16, 2, 3], armR: [70, 2, 3] }), 'jPreach'))).join(''))
    + NEAR(bokeh(6, { seed: 17, sides: true, op: [0.2, 0.4] }));
}

// 6 · SHOT "His feast day is November 28, and he is a patron of Naples.": James in golden light with his chalice.  SHOT "Saint James
//     of the Marches, pray for us.": tender, sparkles.
const S6 = [470, 1345, 2.3];
function scene6() {
  const nv = at(6, 'November'), pa = at(6, 'patron'), pr = at(6, 'pray for us');
  return lit(castShadow(...S6, 'jGlory') + seq((o) => jamesHD(...S6, { halo: true, armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', look: [0, 0], armR: 44, propR: held(snakeCup(1.05), 44, -4) }], [pa, { mood: 'happy', look: [0, 0], armR: 112, propR: held(snakeCup(1.15), 112, -6) }],
        [pr, { mood: 'tender', armR: 112, propR: held(snakeCup(1.15), 112, -6) }]]), 'jGlory')
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(S6[0], 740, 240, 0.45)}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 520, 900, { seed: 27 })}</g>`
    + NEAR(bokeh(7, { seed: 45, sides: true }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'St_James_of_the_Marches_Cup',
  bg3d: './james_of_the_marches_cup.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'conrad.bg3d.js': './conrad_spider_chalice.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { james: { voice: 'im_nicola', speed: 0.92 } },
  music: { story: 'a Franciscan friar in medieval Bosnia whom heretics tried to poison, shown ever since holding a chalice with a snake escaping, who kept preaching for forty more years',
    color: 'Medieval Balkans and Italy: Gregorian-style chant, a low drone, soft frame drum, harp and a lone bowed string',
    cues: { 3: 'Hushed and tense: a held low drone and a whisper of choir, then a bright swell of light on the miracle.', 4: 'Lonely dusk: a single bowed string over a low drone.' } },
  thumb_hook: 'They tried to poison him', thumb_title: 'St. James of the Marches', thumb_scene: 0, thumb_t: 2.6, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'tˌiːvˌiːˈɑːɹtˌiːkˌeɪˈoʊ': 'tvˈɜːɹtkoʊ',   // Tvrtko (TVURT-ko)
    'dˈɔːɹəθˌiə': 'dˌɔːɹəθˈiːə',             // Dorothea (dor-uh-THEE-uh)
  },
  scenes: [
    { kicker: 'BOSNIA · 1430s', title: 'Poison in the Cup', art: scene0, bg3d: 'jHook', front3d: true,
      cam: { ...GLIDE, path: [
        { at: 0, to: [S0[0] + 40, 1000], z: 1.0, frame: [480, 1000] },
        { at: at(0, 'poison'), to: [S0[0] - 100, 760], z: 1.2, frame: [560, 900] },
        { at: at(0, 'This is'), to: face(...S0), z: 1.3, frame: [600, 860] }] },
      tone: HOOK,
      say: ["Tradition says heretics slipped poison into a wandering friar's cup, yet he preached nearly forty more years.", 'This is Saint James of the Marches.'] },
    { kicker: 'BOSNIA · 1435', title: 'Far From Home', art: scene1, bg3d: 'jRoad', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(1, 'friars'), to: [640, 1020], depth: 0.95, z: 1.08, frame: [560, 980] },
        { at: at(1, 'fasted'), to: face(...S1, true), z: 1.3, frame: [520, 900] }] },
      tone: HOOK,
      say: ['He was an Italian Franciscan, sent to lead Bosnia\'s friars.', 'He wore a threadbare habit, fasted, and barely slept.'] },
    { kicker: 'THE ROYAL COURT · BOSNIA', title: 'The King Said No', art: scene2, bg3d: 'jCourt', front3d: true,
      cam: { ...GLIDE, whip: 'r', path: [
        { at: at(2, 'opposed'), to: face(...K2), depth: 0.95, z: 1.2, frame: [560, 860] },
        { at: at(2, 'His sermons'), to: face(...S2), z: 1.1, frame: [500, 860] }],
        zoom: { at: at(2, 'What did'), to: face(...S2), style: 'snap', hold: 1.6 } },
      tone: STAND,
      say: ['King Tvrtko II opposed him and his preaching.', 'His sermons asked one question:', { text: 'What did Christ command his apostles to do? To preach.', who: 'james' }] },
    { kicker: 'BOSNIA · 1430s', title: "The Queen's Cup", art: scene3, bg3d: 'jCup', front3d: true,
      cam: { ...GLIDE, shake: { at: at(3, 'never', 0.05), amt: 16, dur: 0.6 }, path: [
        { at: at(3, 'accused'), to: [Q3[0] - 120, 900], depth: 0.95, z: 1.15, frame: [560, 900] },
        { at: at(3, 'never'), to: [Q3[0] - 150, 860], depth: 0.95, z: 1.3, frame: [560, 880] },
        { at: at(3, 'That is why'), to: face(...S3), z: 1.3, frame: [520, 860] }] },
      tone: { ...STAND, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['Then James accused Queen Dorothea herself of trying to poison him.', { text: 'But the poison never took his life.', speed: 0.85 }, 'That is why he holds a chalice with a snake.'] },
    { kicker: 'LEAVING BOSNIA · 1439', title: 'Forced Out', art: scene4, bg3d: 'jLeave', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(4, 'leave'), to: [380, 1000], z: 1.05, frame: [540, 980] },
        { at: at(4, 'enemies'), to: [790, 900], depth: 0.85, z: 1.15, frame: [560, 900] }] },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['He had to leave Bosnia.', 'It looked like his enemies had won.'] },
    { kicker: 'HUNGARY · AUSTRIA · BOHEMIA', title: 'He Kept Preaching', art: scene5, bg3d: 'jPreach', front3d: true,
      cam: { ...GLIDE, whip: 'l', path: [
        { at: at(5, 'crowds'), to: [620, 1040], depth: 0.95, z: 1.08, frame: [560, 1000] },
        { at: at(5, 'Poison could'), to: face(...S5), z: 1.3, frame: [520, 860] }] },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['But he preached on for decades, and crowds turned to God.', 'Poison could reach his cup, but never his words.'] },
    { kicker: 'FEAST DAY · NOVEMBER 28', title: 'Saint James', art: scene6, bg3d: 'jGlory', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(6, 'patron'), to: [S6[0], 1000], z: 1.12, frame: [540, 980] },
        { at: at(6, 'pray for us'), to: face(...S6), z: 1.3, frame: [540, 860] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 28, and he is a patron of Naples.', 'Saint James of the Marches, pray for us.'] },
  ],
};
