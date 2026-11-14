// St. Teresa of Calcutta (Mother Teresa), "The Day the Guns Fell Silent" (one story). Beirut, August 1982, during the
// siege: the head of the Red Cross mission in West Beirut told her about the children at the Dar al-Ajaza al-Islamia
// hospital in Sabra ("She came, she saw them, and said: 'I'll take them.'"). Accounts of those with her say officials
// called the crossing impossible without a ceasefire, and that she said she had asked Our Lady for one for the next
// day, August 14, the eve of the Assumption. That day, 37 children with disabilities (ages 7 to 21) were carried out,
// put into four Red Cross vehicles and taken across the green line to a Missionaries of Charity school in East Beirut.
// Her words that day (New York Times, Aug. 15, 1982): "I have never been in a war before, but I have seen famine and
// death." / "They are all the children of God." No armies or sides are named or shown (no political commentary).
// Born Skopje, August 26, 1910; died Calcutta, September 5, 1997; canonized September 4, 2016 by Pope Francis; feast
// September 5.
// Sources: New York Times, Aug. 15, 1982 (as reprinted); Wikipedia "Mother Teresa"; AsiaNews 2016 (ICRC account);
// St. John (Jackson) parish essay for the prayer and the officials' objection.
// New (exported for later reels): teresa (white sari with blue stripes), sister, redCrossWorker, official, child,
// redCrossVan, plane, room, cityRow, flashes.
import { W, M, SKIES, SKIN, SKINS, GOLD, sky, sun, rays, clouds, hill, sparkles, motes, foliage, person, rosary, basilica, coconut,
  ground, dark, light, bokeh, f, rng, FAR, BACK, MID, NEAR } from '../art.mjs';
import { cot } from './elizabeth_of_hungary.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
/** Show svg only from t0 to t1 (seconds from the scene start); t0 = 0 means from the first frame, t1 = null to the end. */
const span = (svg, t0 = 0, t1 = null, dur = 0.45) => {
  const inner = t0 > 0 ? `<g${fadeIn(t0, dur)}>${svg}</g>` : svg;
  return t1 == null ? inner : `<g${fadeOut(t1, dur)}>${inner}</g>`;
};
const pop = (svg, x, y, at, type = 'pop') => `<g transform="translate(${x},${y})"><g${M.in(type, at, 0.5)}>${svg}</g></g>`;
const walkIn = (at, dx, dur = 1.2) => M.tw([{ at, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);

// Line starts (s from scene start), from `node build.mjs stories/teresa_of_calcutta_beirut.mjs info`
const T = { s0b: 3.59, s0c: 6.45, s0d: 8.93, s1b: 5.22, s2b: 5.6, s2c: 6.61, s3b: 3.93, s3c: 6.3, s4b: 2.96, s5b: 3.96, s5c: 6.56, s6b: 3.71, s6c: 6.13 };

// ---------------------------------------------------------------- people
const SKT = '#d8a882', SARI = '#f6f3ec', BLUE = '#2f5fb8';
const veilBack = `<path d="M-50 -266 Q-68 -150 -58 -112 L58 -112 Q68 -150 50 -266Z" fill="${SARI}"/><path d="M20 -266 Q62 -200 58 -112 L36 -112 Q42 -200 20 -266Z" fill="${dark(SARI, 0.3)}" opacity=".5"/>`;
const sariOver = `<path d="M-40 -208 Q-6 -196 36 -150 L42 -118 Q0 -164 -44 -182Z" fill="${dark(SARI, 0.06)}"/><path d="M-44 -182 Q0 -164 42 -118" stroke="${BLUE}" stroke-width="5" fill="none"/><path d="M-44 -191 Q0 -173 41 -128" stroke="${BLUE}" stroke-width="2" fill="none"/>`
  + `<path d="M-44 -18 Q0 -8 44 -18" stroke="${BLUE}" stroke-width="6" fill="none"/><path d="M-44 -28 Q0 -18 44 -28 M-44 -35 Q0 -25 44 -35" stroke="${BLUE}" stroke-width="2.2" fill="none"/>`
  + `<path d="M-24 -186 v16 M-30 -180 h12" stroke="#5a4636" stroke-width="3.5" stroke-linecap="round"/>`
  + `<path d="M-48 -262 Q-48 -314 0 -314 Q48 -314 48 -262 Q41 -293 0 -295 Q-41 -293 -48 -262Z" fill="${SARI}"/>`
  + `<path d="M-45 -263 Q-39 -290 0 -292 Q39 -290 45 -263" stroke="${BLUE}" stroke-width="4.5" fill="none"/><path d="M-47 -266 Q-43 -299 0 -301 Q43 -299 47 -266" stroke="${BLUE}" stroke-width="1.8" fill="none"/>`
  + `<path d="M-36 -258 L-34 -200 M36 -258 L34 -200" stroke="${BLUE}" stroke-width="3.5" fill="none"/>`;
const wrinkles = `<g stroke="${dark(SKT, 0.3)}" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"><path d="M-13 -273 h26 M-9 -267 h18"/><path d="M-32 -244 q3 4 7 2 M25 -242 q4 2 7 -2"/></g>`;
/** St. Teresa of Calcutta: the white cotton sari with blue stripes worn over the head, a small crucifix at the shoulder. */
export const teresa = (x, y, s, { over = '', under = '', ...o } = {}) =>
  person(x, y, s, { kind: 'layman', robe: true, girl: true, top: SARI, skin: SKT, hair: SARI, ...o, under: veilBack + under, over: sariOver + wrinkles + over });
/** A Missionary of Charity sister (younger; the same sari). */
export const sister = (x, y, s, { skin = SKIN.s1, over = '', ...o } = {}) =>
  person(x, y, s, { kind: 'layman', robe: true, girl: true, top: SARI, skin, hair: SARI, ...o, under: veilBack, over: sariOver + over });
const redCross = '<rect x="-5" y="-190" width="10" height="34" fill="#d4213d"/><rect x="-17" y="-178" width="34" height="10" fill="#d4213d"/>';
/** A Red Cross worker: white vest with a red cross. */
export const redCrossWorker = (x, y, s, { skin = SKIN.priest, hair = '#5a4030', over = '', ...o } = {}) =>
  person(x, y, s, { kind: 'layman', top: '#f4f1ea', pants: '#4a5a6a', skin, hair, ...o, over: redCross + over });
/** An official in a dark suit and tie. */
export const official = (x, y, s, { over = '', ...o } = {}) =>
  person(x, y, s, { kind: 'layman', top: '#3a4458', pants: '#2e3444', skin: SKIN.priest, hair: '#8a8580', ...o,
    over: '<path d="M-14 -208 L0 -168 L14 -208Z" fill="#f4f1ea"/><path d="M-4 -204 L0 -160 L4 -204Z" fill="#8a2a32"/>' + over });
const TOPS = ['#e2a33a', '#5a9ac8', '#d8648a', '#6aa86a', '#c8704a'];
/** A cheerful child (i picks skin, hair and shirt). */
export const child = (x, y, s, i = 0, o = {}) => person(x, y, s, { kind: 'kid', girl: i % 2 === 1, top: TOPS[i % 5], pants: '#5a4a44', skin: SKINS[i % 4], hair: i % 3 ? '#2a1c14' : '#4a3020', mood: 'happy', ...o });

// ---------------------------------------------------------------- props + set pieces
/** A white Red Cross vehicle facing right; wheels on the ground at (x, y). */
export function redCrossVan(x, y, s = 1, { roll = true } = {}) {
  const wheel = (wx) => `<g transform="translate(${wx},-26)"><circle r="30" fill="#2a2630"/><g${roll ? M.spin(1.4) : ''}><circle r="13" fill="#b8b4ac"/><path d="M-13 0 H13 M0 -13 V13" stroke="#6a665e" stroke-width="4"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="190" ry="14" fill="#1a0f1a" opacity=".22" filter="url(#soft)"/>`
    + `<path d="M-170 -40 V-170 Q-170 -196 -144 -196 H70 Q96 -196 112 -170 L140 -120 Q170 -112 170 -84 V-40Z" fill="#f6f3ec"/><path d="M-170 -76 H170 V-40 H-170Z" fill="#d8d2c6"/>`
    + `<path d="M74 -178 Q92 -176 104 -158 L124 -122 H74Z" fill="#8ab8d8"/><rect x="-20" y="-178" width="74" height="54" rx="6" fill="#8ab8d8"/>`
    + `<circle cx="-96" cy="-132" r="40" fill="#fff"/><rect x="-106" y="-164" width="20" height="64" fill="#d4213d"/><rect x="-128" y="-142" width="64" height="20" fill="#d4213d"/>`
    + `<rect x="150" y="-90" width="24" height="14" rx="4" fill="#ffd98a"/>${wheel(-100)}${wheel(96)}</g>`;
}
/** A small airliner in the sky, nose to the right. */
export const plane = '<g><path d="M-90 0 Q-90 -14 -60 -14 H60 Q96 -10 104 0 Q96 10 60 12 H-60 Q-90 14 -90 0Z" fill="#f6f3ec"/><path d="M-84 -10 L-112 -44 L-90 -44 L-58 -12Z" fill="#d8d2c6"/><path d="M-10 4 L-50 54 L-24 54 L34 6Z" fill="#d8d2c6"/><path d="M60 -6 h26" stroke="#8ab8d8" stroke-width="6" stroke-linecap="round"/><path d="M-50 -2 h90" stroke="#8ab8d8" stroke-width="4" stroke-dasharray="6 8"/></g>';
/** An indoor wall with one tall window (what shows in it is drawn first, behind). Floor at y. */
export function room(y, { wall = '#6a5e6a', win = [700, 520, 260, 380] } = {}) {
  const [wx, wy, ww, wh] = win;
  return `<path d="M-200 200 H${W + 200} V${y} H-200Z M${wx} ${wy} V${wy + wh} H${wx + ww} V${wy}Z" fill="${wall}" fill-rule="evenodd"/>`
    + `<rect x="${wx - 10}" y="${wy - 10}" width="${ww + 20}" height="${wh + 20}" fill="none" stroke="${light(wall, 0.2)}" stroke-width="16"/><path d="M${wx + ww / 2} ${wy} V${wy + wh} M${wx} ${wy + wh / 2} H${wx + ww}" stroke="${light(wall, 0.2)}" stroke-width="8"/>`
    + `<rect x="-200" y="${y - 90}" width="${W + 400}" height="90" fill="${dark(wall, 0.2)}"/>`;
}
/** A row of flat-roofed city blocks (silhouette with a few windows). Base at y. */
export function cityRow(y, { c = '#8a7a80', win = '#5a4e58', seed = 4, hmin = 200, hvar = 220, x0 = -100, x1 = W + 100 } = {}) {
  const r = rng(seed); let o = '';
  for (let x = x0; x < x1;) {
    const w = 120 + r() * 90, h = hmin + r() * hvar;
    o += `<rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h + 20)}" fill="${c}"/><rect x="${f(x + w * 0.7)}" y="${f(y - h)}" width="${f(w * 0.3)}" height="${f(h + 20)}" fill="${dark(c, 0.2)}" opacity=".5"/>`;
    for (let wy = y - h + 30; wy < y - 50; wy += 70) for (const k of [0.2, 0.5]) o += `<rect x="${f(x + w * k)}" y="${f(wy)}" width="22" height="30" fill="${win}"/>`;
    x += w + 6;
  }
  return o;
}
/** Distant flashes behind the skyline (the shelling, far away): n soft orange glows that flare and fade. */
export const flashes = (pts, t0 = 0) => pts.map(([x, y, r], i) => `<g${M.tw([{ at: t0 + i * 0.7, dur: 0.25, from: { opacity: 0 }, to: { opacity: 0.9 } }])}><g${M.tw([{ at: t0 + i * 0.7 + 0.3, dur: 0.9, from: { opacity: 1 }, to: { opacity: 0 } }])}><circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)"/></g></g>`).join('');
const street = (y, c) => ground(y, c, { rim: light(c, 0.15) }) + `<path d="M-200 ${y + 90} H${W + 200}" stroke="${light(c, 0.3)}" stroke-width="8" stroke-dasharray="70 60" opacity=".5"/>`;
const rosaryP = `<g transform="translate(0,-4) scale(1.15)">${rosary()}</g>`;
const kidsBubble = `<g><ellipse rx="150" ry="104" fill="#fbf7ee"/><circle cx="118" cy="112" r="16" fill="#fbf7ee"/><circle cx="146" cy="140" r="9" fill="#fbf7ee"/>${child(-78, 78, 0.5, 0)}${child(0, 82, 0.55, 1)}${child(78, 78, 0.5, 2)}</g>`;

// ---------------------------------------------------------------- scenes
// 0 · hook (3D Beirut street under smoke, push-fast): Mother Teresa as the world knows her; flashes; the trapped children
function scene0() {
  const B = T.s0b, C = T.s0c, D = T.s0d;
  return MID(street(1245, '#5a5058'))
    + span(flashes([[160, 760, 150], [900, 700, 170], [420, 640, 130], [760, 820, 140]], 0.4), 0, B + 1)
    + span(pop(kidsBubble, 230, 700, B + 0.3), B, D)
    + glow(540, 900, 430, 0.8)
    + span(rays(540, 780, { op: 0.1 }) + sparkles(12, 220, 860, 600, 1100, { seed: 4 }), C, null, 0.8)
    + span(teresa(540, 1350, 2.2, { mood: 'happy', armL: [26, 2, 3], armR: [26, 2, 3], propR: rosaryP }), 0, D)
    + span(teresa(540, 1350, 2.2, { halo: D + 0.2, mood: 'happy', armL: [26, 2, 3], armR: [26, 2, 3], propR: rosaryP }), D, null)
    + motes(12, { x0: 120, x1: 940, y0: 650, y1: 1250, seed: 3, color: '#ffd0a0' });
}

// 1 · Calcutta (pan-r): caring for the dying; then, at 71, she flies into a war
function scene1() {
  const B = T.s1b;
  return FAR(sky(SKIES.sunrise) + sun(220, 600, 56, 340) + clouds(450, { seed: 5, n: 2, op: 0.7 }))
    + BACK(cityRow(1110, { c: '#d8a878', win: '#a8704a', seed: 7, hmin: 160, hvar: 160 }) + coconut(940, 1120, 0.8, { flip: true, lean: 22 }))
    + MID(coconut(70, 1235, 1.0, { lean: 26 }) + cot(720, 1250, 1.0, { blanket: '#c8704a', who: '<ellipse cx="-96" cy="-108" rx="40" ry="14" fill="#f4efe4"/><circle cx="-92" cy="-128" r="26" fill="#b97c52"/><path d="M-118 -132 Q-112 -158 -90 -156 Q-70 -154 -66 -134 Q-90 -146 -118 -132Z" fill="#d8d4cc"/>' }) + sister(930, 1275, 1.25, { flip: true, mood: 'happy', armL: 10, armR: 26 }))
    + street(1235, '#b89878')
    + span(`<g${M.tw([{ at: B, dur: 3.2, from: { x: -500, y: 60, opacity: 0 }, to: { x: 0, y: 0, opacity: 1 }, ease: 'power1.out' }])}><g transform="translate(600,560) rotate(-8)">${plane}</g></g>`, B)
    + span(glow(430, 950, 320, 0.6) + teresa(430, 1290, 2.1, { kneel: true, mood: 'happy', armL: 26, armR: [60, 3, 2] }), 0, B)
    + span(teresa(430, 1350, 2.1, { mood: 'determined', armL: 12, armR: [26, 2, 3], propR: rosaryP }), B, null)
    + NEAR(foliage('l', 1690, { color: '#3a4a2e', seed: 8 }));
}

// 2 · Beirut (drift-l): the Red Cross tells her about the children; "I'll take them."
function scene2() {
  const B = T.s2b, C = T.s2c;
  return FAR(sky([[0, '#4a3a4e'], [0.5, '#a8604a'], [1, '#e09060']]) + flashes([[820, 640, 150], [760, 760, 120], [880, 700, 130]], 0.6))
    + BACK(cityRow(960, { c: '#5a4a52', win: '#3a3038', seed: 3, hmin: 120, hvar: 200, x0: 660, x1: 1020 }))
    + MID(room(1235))
    + ground(1235, '#4e4450', { rim: '#6a5e6a' })
    + span(pop(kidsBubble, 330, 620, 1.6), 1.4, C + 2)
    + span(redCrossWorker(250, 1350, 2.0, { mood: 'worried', armL: 10, armR: [84, 4, 1.6] }), 0, C)
    + span(redCrossWorker(250, 1350, 2.0, { mood: 'surprised', armL: 10, armR: 12 }), C, null)
    + span(teresa(690, 1350, 2.1, { flip: true, mood: 'sad', armL: 12, armR: [26, 2, 3], propR: rosaryP }), 0, B)
    + span(glow(690, 900, 380, 0.8) + teresa(690, 1350, 2.1, { flip: true, mood: 'determined', talk: [C, 99], armL: [70, 4, 1.6], armR: [26, 2, 3], propR: rosaryP }), B, null);
}

// 3 · impossible (push): officials say no one can cross; she has never been in a war; she prays for a ceasefire
function scene3() {
  const B = T.s3b, C = T.s3c;
  return FAR(sky([[0, '#3a3046'], [0.5, '#8a4a44'], [1, '#c87a50']]) + flashes([[820, 640, 150], [760, 760, 120], [880, 700, 130], [800, 600, 140]], 0.3))
    + BACK(cityRow(960, { c: '#4a3e48', win: '#30282e', seed: 3, hmin: 120, hvar: 200, x0: 660, x1: 1020 }))
    + MID(room(1235, { wall: '#5a4e5e' }))
    + ground(1235, '#443a48', { rim: '#5e5262' })
    + span(official(240, 1350, 2.0, { mood: 'stern', armL: 10, armR: [96, 5, 1.2] }), 0, B)
    + span(official(240, 1350, 2.0, { mood: 'worried', armL: 10, armR: 12 }), B, null)
    + span(teresa(660, 1350, 2.1, { flip: true, mood: 'worried', armL: 12, armR: [26, 2, 3], propR: rosaryP }), 0, C)
    + span(glow(660, 880, 420, 0.9) + rays(660, 820, { op: 0.09 }), C, null, 0.8)
    + span(teresa(660, 1290, 2.1, { kneel: true, mood: 'peaceful', armL: 28, armR: 28 }), C, null)
    + span(pop(`<g><circle r="120" fill="url(#haloGlow)" opacity=".9"/>${person(0, 110, 0.62, { kind: 'nun', top: '#f6f3ec', veil: '#3f6fb8', skin: SKIN.fair, halo: true, mood: 'peaceful', armL: 26, armR: 26 })}</g>`, 500, 560, C + 0.9), C + 0.8, null)
    + span(sparkles(12, 420, 880, 520, 1000, { seed: 6 }), C + 1.2, null)
    + NEAR(bokeh(5, { seed: 11, op: [0.15, 0.4] }));
}

// 4 · the turning point (3D Beirut street, calm morning, dolly): the guns fall silent; she crosses with four Red Cross vehicles
function scene4() {
  const B = T.s4b;
  const drive = (at, x0) => M.tw([{ at, dur: 3.4, from: { x: x0, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
  return MID(street(1245, '#8a8088') + span(`<g${drive(B, -500)}>${redCrossVan(250, 1245, 0.62)}</g>`, B) + span(`<g${drive(B + 0.5, -500)}>${redCrossVan(-10, 1262, 0.7)}</g>`, B + 0.5))
    + glow(600, 900, 430, 0.75) + span(rays(600, 820, { op: 0.09 }), 1.0, null, 1)
    + span(teresa(600, 1350, 2.15, { mood: 'peaceful', armL: 28, armR: 28, propR: rosaryP }), 0, 1.6)
    + span(teresa(600, 1350, 2.15, { mood: 'surprised', armL: 12, armR: [26, 2, 3], propR: rosaryP }), 1.6, B)
    + span(`<g${M.tw([{ at: B + 0.6, dur: 3, from: { x: 0 }, to: { x: 120 }, ease: 'power1.inOut' }])}>${teresa(600, 1350, 2.15, { mood: 'determined', armL: 12, armR: [26, 2, 1.2], propR: rosaryP })}</g>`, B)
    + span(sparkles(12, 380, 860, 560, 1000, { seed: 8 }), 1.4, B + 1)
    + motes(10, { x0: 100, x1: 950, y0: 700, y1: 1250, seed: 5 });
}

// 5 · the rescue (tilt-up + rack focus): one by one, all 37; "They are all the children of God."
function scene5() {
  const B = T.s5b, C = T.s5c;
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + sun(540, 760, 70, 480) + rays(540, 760, { op: 0.1 }))
    + BACK(cityRow(1120, { c: '#b88a78', win: '#8a6258', seed: 9, hmin: 200, hvar: 240 }))
    + MID(redCrossVan(900, 1240, 0.72, { roll: false }) + redCrossWorker(170, 1275, 1.3, { mood: 'joy', armL: [120, 4, 1.6], armR: 10 })
      + span(child(60, 1262, 0.9, 3, { mood: 'joy' }), 1.2) + span(child(290, 1262, 0.85, 4, { mood: 'joy' }), 2.2))
    + street(1240, '#a08878')
    + span(`<g${walkIn(0.3, 160, 1)}>${child(340, 1345, 1.35, 0, { mood: 'joy', armL: 10, armR: [60, 4, 1.4] })}</g>`, 0.3)
    + span(`<g${walkIn(1.6, 200, 1)}>${child(760, 1345, 1.3, 1, { flip: true, mood: 'joy', armL: 10, armR: [60, 4, 1.6] })}</g>`, 1.6)
    + span(`<g${walkIn(2.8, 220, 1)}>${child(205, 1352, 1.15, 2, { mood: 'joy', armL: [130, 6, 1.2], armR: 10 })}</g>`, 2.8)
    + span(teresa(550, 1350, 2.15, { mood: 'joy', armL: [44, 3, 2], armR: [44, 3, 2.2] }), 0, B)
    + span(teresa(550, 1350, 2.15, { mood: 'happy', talk: [B, C - 0.2], armL: [44, 3, 2], armR: [44, 3, 2.2] }), B, C)
    + span(glow(550, 880, 420, 0.85) + teresa(550, 1350, 2.15, { halo: C + 0.3, mood: 'peaceful', armL: [44, 3, 2], armR: [44, 3, 2.2] }), C, null, 0.7)
    + span(sparkles(14, 260, 840, 560, 1100, { seed: 4 }), C + 0.6, null)
    + NEAR(bokeh(7, { seed: 17 }));
}

// 6 · feast portrait (arc): the saint with halo and rosary, a child beside her; St. Peter's at dusk (canonized 2016)
function scene6() {
  const B = T.s6b, C = T.s6c;
  return FAR(sky(SKIES.dusk, { stars: 20, seed: 5 }) + rays(540, 820, { op: 0.12 }))
    + BACK(hill(1090, 40, '#5a4a6a', 4) + basilica(700, 1120, 0.95))
    + MID(hill(1170, 18, '#6a5a6a', 7))
    + ground(1240, '#4a4458', { rim: '#8a7a8a' })
    + glow(520, 900, 470, 0.9)
    + span(`<g${walkIn(B, -180, 1)}>${child(250, 1350, 1.4, 1, { mood: 'joy', armL: 10, armR: [60, 4, 1.6] })}</g>`, B)
    + teresa(520, 1350, 2.3, { halo: true, mood: 'happy', armL: [26, 2, 3], armR: [26, 2, 3], propR: rosaryP })
    + span(sparkles(14, 240, 840, 600, 1100, { seed: 11 }), C)
    + NEAR(foliage('l', 1680, { color: '#2a2448', seed: 6 }) + bokeh(6, { seed: 9, op: [0.2, 0.5] }));
}

export const STORY = {
  slug: 'st_teresa_of_calcutta_beirut', name: 'St_Teresa_of_Calcutta_The_Day_the_Guns_Fell_Silent',
  bg3d: './teresa_of_calcutta_beirut.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'santo.bg3d.js': './santo_nino_cebu.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { teresa: { voice: 'hf_alpha', speed: 0.9 } },
  thumb_hook: 'She walked into a war', thumb_title: 'St. Teresa of Calcutta', thumb_scene: 6, thumb_t: 7, thumb_shift: -60,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'sɛptˈɛmbɚ fˈaɪv': 'sɛptˈɛmbɚ fˈɪfθ',   // September 5 -> September fifth
  },
  scenes: [
    { kicker: 'BEIRUT · AUGUST 1982', title: 'She Walked Into a War', art: scene0, bg3d: 'beirutSmoke', cam: { move: 'push-fast', oy: 1050 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Beirut, 1982. Bombs fell day and night.', '37 children were trapped at the front line.', 'Then a small nun in a white sari arrived.', 'This is Saint Teresa of Calcutta.'] },
    { kicker: 'CALCUTTA · INDIA', title: 'Mother Teresa', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['The world knew her as Mother Teresa, who cared for the dying on the streets of Calcutta.', 'At 71, she flew into a war.'] },
    { kicker: 'WEST BEIRUT', title: 'The Children', art: scene2, cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['The Red Cross told her about children with disabilities, left in a hospital under fire.', 'She answered:', { text: 'I\'ll take them.', who: 'teresa' }] },
    { kicker: 'AUGUST 13, 1982', title: 'Impossible', art: scene3, cam: { move: 'push', amt: 0.06, ox: 600, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Officials said no one could cross while the guns were firing.', 'She had never been in a war before.', 'But she prayed to Our Lady for a ceasefire.'] },
    { kicker: 'AUGUST 14, 1982', title: 'The Guns Fell Silent', art: scene4, bg3d: 'beirutCalm', cam: { move: 'dolly', amt: 0.08, ox: 600, oy: 900 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: [{ text: 'The next morning, the guns fell silent.', speed: 0.85 }, 'She crossed the front line with four Red Cross vehicles.'] },
    { kicker: 'THE RESCUE', title: 'All 37', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['One by one, the children were carried out, all 37.', { text: 'They are all the children of God.', who: 'teresa' }, 'Where others saw a battlefield, she saw only children.'] },
    { kicker: 'FEAST · SEPTEMBER 5', title: 'St. Teresa of Calcutta', art: scene6, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Pope Francis declared her a saint in 2016.', 'Her feast day is September 5.', 'Saint Teresa of Calcutta, pray for us.'] },
  ],
};
