// St. Andrew the Apostle (feast: November 30). The first ALL-3D-background reel (every scene has a three.js background,
// andrew_apostle.bg3d.js) and the first with the DETAILED chibi rig `hd()` below.
// Facts (sources: Vatican News "St. Andrew, Apostle"; Wikipedia "Andrew the Apostle"; Britannica; John 1:35-42, 6:8-9):
// fisherman from Bethsaida, brother of Simon Peter, disciple of John the Baptist; heard John say "Behold, the Lamb of God",
// followed Jesus ("Come, and you will see"), told Simon "We have found the Messiah" and brought him to Jesus (the
// Orthodox call him Protokletos, the First-Called). After Pentecost, early writers say he preached in Asia Minor, along the
// Black Sea and in Achaea (Greece). Martyred at Patras around AD 60; early texts say bound, not nailed; the X-shaped
// (saltire) cross is a later tradition. Golden Legend: on seeing the cross he greeted it ("O good cross, made beautiful by
// the body of the Lord", Latin "O bona crux"). Relics: Constantinople (c. 357), Amalfi (1208), skull returned to Patras
// by Paul VI (1964). Patron of Scotland, Greece, Russia, Ukraine, Romania and fishermen.
// Iconography: green tunic + red mantle, unkempt white hair and beard when old, saltire cross, book/scroll, fishing net.
//
// Characters use the detailed chibi rig hd() from ../hd.mjs (standard for new reels since 2026-11-15).
// Exported for later reels: andrew, jesusHD, peterHD, baptist, governor, saltire, scroll, reedCross.
import { W, M, motes, sparkles, bokeh, foliage, tufts, flowers, palm_frond, book, dark, light, f, rng, NEAR, MID } from '../art.mjs';
import { net, fish, keys } from './peter.mjs';
import { hd } from '../hd.mjs';
export { hd };   // re-exported so older imports from this file keep working

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
/** One character through several looks: steps = [[at, opts], ...] (first at 0). Each new look fades in on top of the
 * previous one, which is hidden once covered, so the face never turns see-through mid-change. */
const seq = (draw, steps, dur = 0.4) => steps.map(([at, o], i) => {
  const next = steps[i + 1]?.[0];
  const body = next !== undefined ? `<g${M.tw([{ at: next + dur, dur: 0.05, from: { opacity: 1 }, to: { opacity: 0 } }])}>${draw(o)}</g>` : draw(o);
  return i ? `<g opacity="0"${fadeIn(at, dur)}>${body}</g>` : body;
}).join('');
const walkIn = (at, dx, dur = 1.2) => M.tw([{ at, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (at, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);

// Line starts (s from scene start), from `node build.mjs stories/andrew_apostle.mjs info`
const T = { s0b: 3.48, s1b: 2.4, s2b: 4.25, s2c: 6.54, s3b: 1.85, s3c: 3.46, s4b: 4.34, s5b: 4.78, s5c: 8.27, s5d: 12.11, s6b: 4.35, s7b: 4.97 };
// Word times inside lines (estimated from timings.json), for expression changes on the word they illustrate
const WD = { greeted: 1.95, john: 3.0, behold: 2.35, lamb: 3.19, come: 6.54, comeEnd: 8.3, found: 2.28, andrewEnd: 3.24, became: 3.9,
  carried: 1.69, preached: 5.36, sentenced: 3.04, saw: 6.37, quoteEnd: 11.81, brother: 6.07 };

// ================================================================ characters
const SKA = '#d9a47e';
/** St. Andrew: green tunic, red mantle (traditional colours). age 'young' (brown hair, short beard), 'mid' (greying), 'old' (white, long beard). */
export const andrew = (x, y, s, { age = 'young', ...o } = {}) => hd(x, y, s, {
  top: '#4f7f5c', mantle: o.mantle === false ? null : '#b5523a', lining: '#e8b86a', trim: '#e2b45a', skin: SKA, age,
  hair: age === 'old' ? '#ece6dc' : age === 'mid' ? '#8a7a6a' : '#5a3a24', iris: '#5a3a24', ...o, mantle: o.mantle === false ? null : (o.mantle || '#b5523a') });
/** Jesus: cream tunic with red clavi, red mantle with gold lining, long brown hair, halo. */
export const jesusHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#f4eee2', mantle: '#b83a3e', lining: '#f2c46b', trim: '#c8963e', skin: SKA,
  hair: '#5a3a24', hairStyle: 'long', beardStyle: 'short', age: 'mid', halo: true, iris: '#4a2e1c', belt: '#c8963e', ...o });
/** Simon Peter (young): blue tunic, curly dark hair, short beard; mantle yellow when given. */
export const peterHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#3f6a9e', trim: '#e2a63c', skin: '#cf9a72', hair: '#2e2018', hairStyle: 'curly', beardStyle: 'short', age: 'young', ...o });
/** John the Baptist: camel-hair tunic, leather belt, wild long hair and beard. */
export const baptist = (x, y, s, o = {}) => hd(x, y, s, { top: '#9a7444', shaggy: true, belt: '#5a3a22', skin: '#c48a5f', hair: '#2a1c12', hairStyle: 'wild', beardStyle: 'full', age: 'mid', ...o });
/** A Roman governor: white toga with a red cloak over the shoulder, short hair, clean-shaven. */
export const governor = (x, y, s, o = {}) => hd(x, y, s, { top: '#f2ece0', mantle: '#9a2a2e', lining: '#c8963e', trim: '#9a2a2e', skin: '#e0b08a', hair: '#3a2a20', beard: null, age: 'mid', mood: 'stern', belt: '#e8e0d0', ...o });

// ================================================================ props
/** The saltire (X-shaped cross) of St. Andrew: two wooden beams with grain, standing at rest. Base at (0,0). */
export const saltire = (s = 1, { glowOp = 0.7 } = {}) => {
  const beam = (rot) => `<g transform="rotate(${rot})"><rect x="-17" y="-210" width="34" height="420" rx="6" fill="#8a5a36"/><rect x="5" y="-210" width="12" height="420" rx="4" fill="#6a4228" opacity=".7"/>`
    + `<path d="M-8 -190 Q-10 -60 -6 60 Q-8 140 -9 196 M0 -150 Q2 -40 -1 90" stroke="#5a3a22" stroke-width="2" fill="none" opacity=".55"/><rect x="-17" y="-210" width="5" height="420" fill="#b88a5e" opacity=".6"/></g>`;
  return `<g transform="scale(${s})"><circle cy="-190" r="260" fill="url(#sunGlow)" opacity="${glowOp}"/><g transform="translate(0,-190)">${beam(38)}${beam(-38)}`
    + '<rect x="-24" y="-24" width="48" height="48" rx="6" fill="#7a4e2e" transform="rotate(45)"/><path d="M-14 0 H14 M0 -14 V14" stroke="#4a2e1c" stroke-width="3"/></g></g>';
};
/** A small rolled Gospel scroll held in the hand. */
export const scroll = (s = 1) => `<g transform="scale(${s}) rotate(-20)"><rect x="-8" y="-46" width="16" height="64" rx="3" fill="#f2e6c8"/><rect x="2" y="-46" width="6" height="64" fill="#d8c8a0"/>`
  + '<rect x="-12" y="-52" width="24" height="10" rx="5" fill="#8a5a36"/><rect x="-12" y="12" width="24" height="10" rx="5" fill="#8a5a36"/><path d="M-4 -34 h8 M-4 -24 h8 M-4 -14 h8" stroke="#a89a7a" stroke-width="2"/></g>';
/** John the Baptist's reed staff with a small cross. */
export const reedCross = (s = 1) => `<g transform="scale(${s})"><rect x="-4" y="-230" width="8" height="300" rx="4" fill="#a88a4a"/><rect x="-26" y="-208" width="52" height="7" rx="3" fill="#a88a4a"/>`
  + '<path d="M0 -226 V64" stroke="#7a6232" stroke-width="2" opacity=".6"/></g>';
const lamb = (s = 1) => `<g transform="scale(${s})"><circle r="70" fill="url(#haloGlow)" opacity=".8"/><g fill="#fffaf0"><circle cx="-18" cy="0" r="16"/><circle cx="0" cy="-6" r="18"/><circle cx="18" cy="0" r="16"/><circle cx="0" cy="10" r="16"/></g>`
  + '<ellipse cx="30" cy="-12" rx="11" ry="9" fill="#f0e2d0"/><circle cx="33" cy="-14" r="1.8" fill="#2b1d14"/><path d="M-14 18 v16 M12 18 v16" stroke="#e8d8c0" stroke-width="5" stroke-linecap="round"/></g>';
const tongue = (s = 1) => `<g transform="scale(${s})"><circle cy="-16" r="34" fill="url(#sunGlow)" opacity=".9"/><g${M.pulse(0.14, 0.6, 0, 0, 0)}><path d="M0 0 Q-14 -14 -5 -36 Q0 -24 6 -30 Q15 -12 0 0Z" fill="#ff8a3a"/>`
  + '<path d="M0 -2 Q-7 -10 -2 -22 Q2 -14 5 -16 Q8 -8 0 -2Z" fill="#ffe08a"/></g></g>';

// ================================================================ near shore (SVG, in front of the 3D water)
const shore = (y, c = '#c8a878', rim = '#ecd2a0', { seed = 3, stones = '#8a7058' } = {}) => {
  const r = rng(seed); let st = '';
  for (let k = 0; k < 14; k++) { const sx = r() * W, sy = y + 30 + r() * 300, rr = 8 + r() * 16; st += `<ellipse cx="${f(sx)}" cy="${f(sy)}" rx="${f(rr * 1.4)}" ry="${f(rr * 0.7)}" fill="${stones}" opacity=".55"/><ellipse cx="${f(sx - rr * 0.3)}" cy="${f(sy - rr * 0.25)}" rx="${f(rr * 0.6)}" ry="${f(rr * 0.25)}" fill="${light(stones, 0.4)}" opacity=".5"/>`; }
  return `<path d="M-200 ${y + 14} Q200 ${y - 10} 540 ${y} Q880 ${y + 10} ${W + 200} ${y - 6} L${W + 200} 2200 L-200 2200Z" fill="${c}"/>`
    + `<path d="M-200 ${y + 14} Q200 ${y - 10} 540 ${y} Q880 ${y + 10} ${W + 200} ${y - 6}" stroke="${rim}" stroke-width="10" fill="none"/>`
    + `<path d="M-200 ${y + 26} Q300 ${y + 6} 600 ${y + 18} Q900 ${y + 26} ${W + 200} ${y + 10}" stroke="#ffffff" stroke-width="4" fill="none" opacity=".35"${M.drift(30, 0)}/>` + st;
};
const reeds = (x, y, s = 1, c = '#4a6a3a') => `<g transform="translate(${x},${y}) scale(${s})"><g${M.sway(3, 3.6, (x % 7) / 7, 0, 0)}>`
  + [-30, -16, -4, 8, 22, 34].map((dx, k) => `<path d="M${dx} 0 Q${dx + (k % 2 ? 8 : -8)} -90 ${dx + (k % 2 ? 4 : -6)} ${-150 - k * 12}" stroke="${k % 2 ? c : dark(c, 0.2)}" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')
  + `<ellipse cx="-4" cy="-160" rx="6" ry="22" fill="#6a4a2a"/><ellipse cx="22" cy="-180" rx="6" ry="22" fill="#6a4a2a"/></g></g>`;
const beachBoat = (x, y, s = 1, hull = '#6a4028') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-170 -40 Q-150 30 0 34 Q150 30 180 -50 Z" fill="${hull}"/>`
  + `<path d="M-170 -40 Q0 -20 180 -50" stroke="${light(hull, 0.35)}" stroke-width="8" fill="none"/><path d="M-120 -8 Q0 6 140 -18 M-90 14 Q0 22 110 6" stroke="${dark(hull, 0.3)}" stroke-width="3" fill="none"/>`
  + `<g transform="translate(-40,-40)">${net}</g></g>`;
const lightPool = (x, y, r = 420, op = 0.8) => glow(x, y, r, op);

// ================================================================ scenes (all backgrounds are 3D; no SVG sky or BACK layer)
// 0 · hook: old Andrew beside his cross at Patras at dusk (bg3d 'patras', push-fast)
function scene0() {
  const B = T.s0b;
  const A = (o) => andrew(580, 1340, 2.4, { age: 'old', halo: true, armR: [26, 2, 3], propR: scroll(1.1), ...o });
  return MID(shore(1236, '#8a6a6a', '#c89a88', { seed: 3, stones: '#5a4450' }))
    + `<g transform="translate(250,1300)"><g${M.tw([{ at: 1.2, dur: 1.4, from: { opacity: 0.85 }, to: { opacity: 1 } }])}>${saltire(1.2, { glowOp: 0.8 })}</g></g>`
    + `<g${punch(B + 0.2, 0.035, 560, 1000)}>`
    + seq(A, [[0, { mood: 'happy', look: [-2.6, 0], armL: [24, 2, 3] }], [WD.greeted, { mood: 'tender', armL: [78, 4, 2.6] }], [B, { mood: 'happy', armL: [78, 4, 2.6] }]])
    + `</g>`
    + `<g${fadeIn(B, 0.8)}>${sparkles(14, 180, 460, 780, 1150, { seed: 4, color: '#ffe0b0' })}</g>`
    + motes(16, { y0: 560, y1: 1240, seed: 4 })
    + NEAR(bokeh(7, { seed: 21 }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1650, { color: '#2a1a34', seed: 5 }));
}

// 1 · fisherman of Bethsaida, follower of John the Baptist (bg3d 'galilee', pan-r)
function scene1() {
  const B = T.s1b;
  return MID(beachBoat(860, 1250, 0.95) + shore(1240, '#dcc496', '#f4e2b8', { seed: 5 }) + reeds(70, 1290, 1.1))
    + `<g${M.tw([{ at: 0.4, dur: 0.9, from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'back.out(2)' }])}><g transform="translate(470,1250)">${fish('#a8c4d0', 1.3, -10)}<g transform="translate(36,12)">${fish('#8aa8b8', 1.2, 16)}</g></g></g>`
    + seq((o) => andrew(320, 1340, 2.1, { mantle: false, armL: [18, 2, 3], armR: [42, 4, 2.6], propR: net, ...o }), [[0, { mood: 'happy' }], [B + 0.3, { mood: 'happy', look: [2.6, -0.4] }]])
    + `<g${walkIn(B, 200, 1.1)}>${baptist(790, 1330, 1.95, { flip: true, mood: 'determined', talk: false, armR: [20, 2, 3], propR: reedCross(1), armL: [120, 4, 2] })}</g>`
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 9 }));
}

// 2 · "Behold, the Lamb of God" … "Come, and you will see." (bg3d 'jordan': real dolly zoom)
function scene2() {
  const B = T.s2b, C = T.s2c;
  const J = (o) => jesusHD(720, 1330, 2.15, { flip: true, mood: 'happy', look: [2.4, 0], armL: [16, 2, 3], ...o });
  const A = (o) => andrew(300, 1345, 2.0, { mantle: false, look: [2.6, -0.6], armL: 12, armR: [30, 3, 2], ...o });
  return MID(shore(1240, '#a8a070', '#d8cc98', { seed: 8, stones: '#6a6a4a' }) + reeds(980, 1280, 1.2) + reeds(80, 1300, 1.0, '#5a7a42'))
    + lightPool(720, 1000, 380, 0.7)
    + `<g transform="translate(150,860)"><g${M.in('pop', WD.behold, 0.9)}><g${M.bob(8, 3.2)}>${lamb(0.9)}</g></g></g>`
    + `<g transform="translate(0,0)"${M.tw([{ at: B, dur: 1.6, from: { x: -60 }, to: { x: 40 }, ease: 'power2.out' }])}>`
    + seq(A, [[0, { mood: 'happy' }], [WD.behold, { mood: 'awe' }], [C + 0.5, { mood: 'joy' }]])
    + '</g>'
    + seq(J, [[0, { armR: [26, 2, 3] }], [C - 0.2, { talk: [C, WD.comeEnd], armR: [86, 5, 2.2] }]])
    + `<g${fadeIn(C, 0.6)}>${sparkles(12, 520, 900, 700, 1100, { seed: 6 })}</g>`
    + `<g opacity="0"${fadeIn(WD.lamb, 0.8)}>${sparkles(10, 60, 260, 760, 960, { seed: 2 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#3a5a2a', seed: 3 }));
}

// 3 · "We have found the Messiah." Simon becomes Peter (bg3d 'brother', drift-l)
function scene3() {
  const B = T.s3b, C = T.s3c;
  const P = (o) => peterHD(770, 1340, 2.05, { flip: true, armL: [20, 2, 3], armR: [36, 3, 2.4], propR: net, ...o });
  const A = (o) => andrew(320, 1345, 2.1, { mantle: false, armL: [16, 2, 3], armR: [104, 5, 1.8], ...o });
  return MID(beachBoat(820, 1236, 0.85, '#5e3a26') + shore(1240, '#d8b88a', '#f2d8a8', { seed: 11 }))
    + seq(A, [[0, { mood: 'joy', look: [2.6, 0], talk: [B, WD.andrewEnd] }], [WD.andrewEnd + 0.1, { mood: 'happy', look: [2.6, -0.6] }]])
    + seq(P, [[0, { mood: 'happy', look: [-1, 2.2] }], [WD.found, { mood: 'surprised', look: [2.2, 0] }], [WD.became, { mood: 'awe' }]])
    + `<g transform="translate(770,700)"><g${M.in('pop', WD.became, 0.9)}>${glow(0, -20, 200, 0.8)}<g${M.bob(8, 3.2)}>${keys(1.6)}</g></g></g>`
    + `<g${fadeIn(WD.became + 0.2, 0.7)}>${sparkles(10, 620, 920, 560, 860, { seed: 9 })}</g>`
    + motes(10, { y0: 600, y1: 1200, seed: 8 })
    + NEAR(foliage('l', 1650, { color: '#4a3a2a', seed: 6 }));
}

// 4 · the missions: Pentecost fire, the Black Sea, Greece (bg3d 'mission', pan-l)
function scene4() {
  const B = T.s4b;
  const crowd = [[630, 0, '#7a5a8a', 'joy'], [730, 1, '#5a7a6a', 'awe'], [830, 2, '#9a6a4a', 'happy']].map(([px, i, c, m]) =>
    hd(px, 1300, 1.25, { top: c, skin: ['#c48a5f', '#e0b08a', '#b97c52'][i], hair: ['#2a1e16', '#5a3e2a', '#1a120c'][i], beard: i === 1 ? null : undefined, age: 'young', flip: true, mood: m, look: [1.6, -0.8], belt: '#5a4030' })).join('');
  const flame = `<g transform="translate(0,-310)"><g${M.in('pop', 0.3, 0.8)}>${tongue(1.2)}</g></g>`;
  return MID(shore(1236, '#b8a88a', '#dcd0b0', { seed: 13, stones: '#6a6a6a' }))
    + `<g${fadeIn(B, 0.8)}>${crowd}</g>`
    + `<g${M.tw([{ at: 0, dur: 4, from: { x: -90 }, to: { x: 0 }, ease: 'power2.out' }])}>`
    + seq((o) => andrew(360, 1345, 2.1, { age: 'mid', armL: [22, 3, 2], propL: scroll(1.1), armR: [70, 5, 2.2], over: flame, ...o }),
      [[0, { mood: 'awe' }], [WD.carried, { mood: 'determined' }], [WD.preached, { mood: 'happy', look: [2.4, 0] }]])
    + '</g>'
    + NEAR(foliage('r', 1650, { color: '#2a3a4a', seed: 4 }));
}

// 5 · Patras: the governor's sentence, "O good cross", the climax (bg3d 'martyr', tilt-up; the 3D fog thickens)
function scene5() {
  const B = T.s5b, C = T.s5c, D = T.s5d;
  const A = (o) => andrew(o.x || 600, 1345, 2.2, { age: 'old', ...o });
  const looks = [
    [0, { x: 590, mood: 'worried', look: [2.6, 0], armL: 12, armR: 14 }],
    [WD.sentenced, { x: 590, mood: 'sad', armL: 12, armR: 14 }],
    [WD.saw, { x: 620, flip: true, mood: 'awe', look: [2.4, -1], armL: [60, 3, 2.4], armR: [70, 3, 2.6] }],
    [C, { x: 620, flip: true, mood: 'joy', talk: [C, WD.quoteEnd], armL: [120, 4, 2.4], armR: [130, 4, 2.6] }],
  ];
  return MID(shore(1236, '#5a4250', '#8a6070', { seed: 17, stones: '#3a2a38' }))
    + `<g transform="translate(270,1300)"><g opacity="0"${fadeIn(WD.saw - 0.4, 1.0)}><g${M.tw([{ at: D, dur: 1.6, from: { scale: 1 }, to: { scale: 1.04 }, origin: '0 -190' }])}>${saltire(1.0, { glowOp: 0.9 })}</g></g></g>`
    + `<g${fadeOut(B + 1.2, 0.8)}><g${punch(2.0, 0.05, 900, 1000)}>${governor(850, 1290, 1.55, { flip: true, armL: 10, armR: [42, 4, 1.6] })}</g></g>`
    + `<g${M.tw([{ at: D + 0.8, dur: 0.05, from: { opacity: 1 }, to: { opacity: 0 } }])}>${seq(A, looks)}</g>`
    + `<g opacity="0"${fadeIn(D, 0.8)}>${glow(560, 760, 420, 0.75)}${A({ x: 620, flip: true, mood: 'peaceful', halo: true, armL: [40, 2, 3], armR: [40, 2, 3] })}</g>`
    + `<g opacity="0"${fadeIn(D + 0.3, 1.2)}>${sparkles(16, 300, 860, 600, 1100, { seed: 12, color: '#ffe0b0' })}</g>`
    + motes(12, { y0: 600, y1: 1240, seed: 15, color: '#ffc890' });
}

// 6 · patron of nations; the quotable line (bg3d 'scotland': the white saltire of cloud forms; pull)
function scene6() {
  const B = T.s6b;
  return MID(shore(1236, '#7a9a6a', '#a8c494', { seed: 19, stones: '#5a6a5a' }) + tufts(1250, 12, '#4a6a3a', { seed: 4 }) + flowers(1270, 1360, 12, { seed: 3, colors: ['#c99ef0', '#ffffff', '#f6d36b'] }))
    + `<g transform="translate(300,1290)"><g opacity="0"${fadeIn(B, 1.0)}>${saltire(0.95, { glowOp: 0.75 })}</g></g>`
    + seq((o) => andrew(600, 1345, 2.3, { age: 'old', halo: true, armL: [24, 2, 3], propL: book(false), armR: [26, 2, 3],
      propR: `<g opacity="0"${fadeIn(B + 0.6, 0.8)}>${palm_frond(1.05, 30)}</g>`, ...o }), [[0, { mood: 'happy' }], [WD.brother, { mood: 'tender' }]])
    + `<g${fadeIn(B + 0.4, 1)}>${sparkles(12, 380, 860, 600, 1000, { seed: 14 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#2a4a2a', seed: 2 }) + foliage('r', 1660, { color: '#2a4a2a', seed: 8 }));
}

// 7 · feast day portrait (bg3d 'glory', arc-r)
function scene7() {
  const B = T.s7b;
  return MID(shore(1236, '#a87a6a', '#e0b08a', { seed: 23, stones: '#6a4a50' }) + beachBoat(900, 1240, 0.7, '#6a4030'))
    + `<g transform="translate(290,1290)">${saltire(1.0, { glowOp: 0.85 })}</g>`
    + `<g opacity="0"${fadeIn(2.6, 1.2)}>${glow(580, 900, 380, 0.7)}</g>`
    + seq((o) => andrew(580, 1345, 2.4, { age: 'old', halo: true, armL: [28, 2, 3], propL: scroll(1.1), armR: [24, 2, 3], ...o }), [[0, { mood: 'happy' }], [B, { mood: 'tender' }]])
    + `<g transform="translate(820,1290)"><g${M.in('pop', 0.8, 0.8)}>${fish('#e0b890', 1.4, -10)}</g></g>`
    + `<g${fadeIn(B, 0.8)}>${sparkles(14, 260, 880, 560, 1050, { seed: 16 })}</g>`
    + motes(14, { y0: 540, y1: 1240, seed: 18 })
    + NEAR(bokeh(7, { seed: 27 }));
}

export const STORY = {
  slug: 'st_andrew_apostle', name: 'St_Andrew_the_Apostle',
  bg3d: './andrew_apostle.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { andrew: { voice: 'bm_lewis', speed: 0.92 }, jesus: { voice: 'bm_george', speed: 0.9 } },
  thumb_hook: 'He greeted his cross like a friend', thumb_title: 'St. Andrew the Apostle', thumb_scene: 0, thumb_t: 3, thumb_shift: -40,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'bɛθsˈeɪdə': 'bɛθsˈeɪɪdə',                     // Bethsaida -> beth-SAY-ih-da (from peter.mjs)
    'pˈætɹəz': 'pˈɑːtɹəs',                         // Patras -> PAH-truss
    'noʊvˈɛmbɚ θˈɜːɾi': 'noʊvˈɛmbɚ θˈɜːɾiəθ',      // November 30 -> November thirtieth
  },
  scenes: [
    { kicker: 'PATRAS, GREECE · AROUND AD 60', title: 'He Greeted His Cross', art: scene0, bg3d: 'patras', cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['They led him to a cross, and he greeted it like a friend.', 'This is Saint Andrew, the first Apostle.'] },
    { kicker: 'BETHSAIDA · SEA OF GALILEE', title: 'The Fisherman', art: scene1, bg3d: 'galilee', cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Andrew was a fisherman from Bethsaida,', 'and a follower of John the Baptist.'] },
    { kicker: 'THE JORDAN RIVER', title: 'Come and See', art: scene2, bg3d: 'jordan', cam: { move: 'dolly', amt: 0.08, ox: 560, oy: 1000 },
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['One day, John pointed to Jesus: Behold, the Lamb of God.', 'Andrew followed him, and Jesus said:', { text: 'Come, and you will see.', who: 'jesus' }] },
    { kicker: 'HIS BROTHER SIMON', title: 'We Found Him', art: scene3, bg3d: 'brother', cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['He ran to his brother Simon:', { text: 'We have found the Messiah.', who: 'andrew' }, 'That brother became Saint Peter.'] },
    { kicker: 'AFTER PENTECOST', title: 'Sent to the Nations', art: scene4, bg3d: 'mission', cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.26, gain: 0 },
      say: ['After Pentecost, Andrew carried the Gospel to distant lands.', 'Tradition says he preached around the Black Sea, and in Greece.'] },
    { kicker: 'PATRAS · AROUND AD 60', title: 'O Good Cross', art: scene5, bg3d: 'martyr', cam: { move: 'tilt-up', amt: 0.06 },
      tone: { speed: 0.97, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['In Patras, far from home, a Roman governor sentenced him to die.', 'Tradition says that when he saw the cross, he cried out:',
        { text: 'O good cross, made beautiful by the body of the Lord!', who: 'andrew' },
        { text: 'He was tied to it, and there he gave his life.', speed: 0.85 }] },
    { kicker: 'SCOTLAND · GREECE · RUSSIA', title: 'Patron of Nations', art: scene6, bg3d: 'scotland', cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Scotland, Greece, Russia and Ukraine call him their patron.', 'He began by bringing his brother to Jesus, and ended by embracing the cross.'] },
    { kicker: 'FEAST DAY · NOVEMBER 30', title: 'Saint Andrew', art: scene7, bg3d: 'glory', cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 30, and he is patron of fishermen.', 'Saint Andrew, pray for us.'] },
  ],
};
