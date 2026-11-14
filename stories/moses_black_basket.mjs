// St. Moses the Black (Moses the Ethiopian), "The Leaking Basket" (one story).
// A slave in Egypt, then leader of a gang of about 75 robbers; hiding among the monks of Scetis (Wadi El Natrun) he was
// converted and became a monk, later a priest. The story (Sayings of the Desert Fathers, Moses 2, tr. Benedicta Ward):
// "A brother at Scetis committed a fault. A council was called to which Abba Moses was invited, but he refused to go.
// Then the priest sent someone to say to him, 'Come, for everyone is waiting for you.' So he got up and went. He took a
// leaking jug, filled it with water and carried it with him. The others came out to meet him and said to him, 'What is
// this, Father?' The old man said to them, 'My sins run out behind me, and I do not see them, and today I am coming to
// judge the errors of another.' When they heard that they said no more to the brother but forgave him."
// Many tellings (and Wikipedia) have a basket or sack of sand with a hole instead of the jug; the reel uses the basket.
// Killed by raiders at Scetis about 405 with seven brothers after refusing to fight (Mt 26:52). Feast August 28;
// patron of Africa and of nonviolence.
// Sources: Wikipedia "Moses the Black"; Sayings of the Desert Fathers (Ward), Moses 2, as quoted at bombaxo.com and
// johnsanidopoulos.com; orthodoxwiki.org.
// New (exported for later reels): moses (monk / robber, optional leaking basket), monk (desert father), brother,
// leakBasket, sandPiles, cell (domed mud-brick cell), desertChurch, torch.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, clouds, hill, waves, sparkles, motes, foliage, tufts, person, palm_frond,
  coconut, ground, dark, light, bokeh, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { walkingStick } from './andrew_dung_lac.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
/** Show svg only from t0 to t1 (seconds from the scene start); t0 = 0 means from the first frame, t1 = null means to the end. */
const span = (svg, t0 = 0, t1 = null, dur = 0.45) => {
  const inner = t0 > 0 ? `<g${fadeIn(t0, dur)}>${svg}</g>` : svg;
  return t1 == null ? inner : `<g${fadeOut(t1, dur)}>${inner}</g>`;
};
const walkIn = (at, dx, dur = 1.2) => M.tw([{ at, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);

// Line starts (s from scene start), from `node build.mjs stories/moses_black_basket.mjs info`
const T = { s0b: 1.85, s0c: 4.36, s0d: 6.45, s1b: 3.47, s2b: 3.46, s3b: 2.14, s4b: 1.5, s4c: 3.95, s4d: 7.89, s5b: 2.8, s6b: 6.55 };

// ---------------------------------------------------------------- people
const SKM = '#6a4428', WHITE = '#e8e4dc', COWL = '#4a3628';
const hood = (c = COWL) => `<path d="M-47 -250 Q-52 -308 0 -310 Q52 -308 47 -250 Q42 -284 0 -286 Q-42 -284 -47 -250Z" fill="${c}"/>`
  + `<path d="M-47 -254 Q-56 -222 -46 -200 L-37 -212 Q-43 -234 -41 -258Z M47 -254 Q56 -222 46 -200 L37 -212 Q43 -234 41 -258Z" fill="${dark(c, 0.15)}"/>`;
const cape = (c = COWL) => `<path d="M-45 -206 Q0 -184 45 -206 L52 -152 Q0 -136 -52 -152Z" fill="${c}"/><path d="M20 -196 Q36 -200 45 -206 L52 -152 Q38 -146 26 -144Z" fill="${dark(c, 0.3)}" opacity=".6"/>`;
/** The old basket full of holes on his back (body space, goes in `under`), sand heaped on top and pouring out behind him. */
export const leakBasket = (pour = true) => '<g transform="translate(-78,-176)">'
  + '<path d="M-44 -46 Q-50 20 -30 52 L30 52 Q50 20 44 -46Z" fill="#a8763a"/><path d="M14 -46 L44 -46 Q50 20 30 52 L12 52Z" fill="#7e5626" opacity=".6"/>'
  + '<g stroke="#7e5626" stroke-width="3" fill="none" opacity=".8"><path d="M-46 -24 Q0 -12 46 -24 M-46 0 Q0 12 46 0 M-40 26 Q0 38 40 26"/><path d="M-22 -44 Q-26 10 -16 52 M6 -44 Q8 10 4 52"/></g>'
  + '<ellipse cx="0" cy="-48" rx="46" ry="14" fill="#e8c88a"/><path d="M-36 -50 Q0 -84 36 -50Z" fill="#f0d49a"/>'
  + '<g fill="#3a2414"><ellipse cx="-22" cy="14" rx="6" ry="5"/><ellipse cx="-4" cy="36" rx="7" ry="5"/><ellipse cx="-30" cy="38" rx="5" ry="4"/></g>'
  + (pour ? `<g${M.flick(0.5, 0, 0.55)}><path d="M-26 48 L-12 48 L-18 172 L-34 172Z" fill="#f0d49a"/><path d="M-22 48 L-16 48 L-22 172 L-28 172Z" fill="#fff0c8" opacity=".8"/></g>`
    + `<g${M.pulse(0.25, 0.7, 0, -26, 174)}><ellipse cx="-26" cy="174" rx="34" ry="9" fill="#f0d49a"/></g>` : '')
  + '</g>';
const strap = '<path d="M-44 -204 L30 -128" stroke="#7e5626" stroke-width="8" stroke-linecap="round"/>';
/** St. Moses the Black. Default: the old desert father (sand-coloured tunic, dark cowl, white beard). robber: his early
 * life (dark tunic, red headcloth, black beard). basket: the leaking basket on his back (pour: sand running out). */
export const moses = (x, y, s, { robber = false, basket = false, pour = true, over = '', under = '', ...o } = {}) => person(x, y, s, robber
  ? { kind: 'layman', top: '#5a2e2a', pants: '#2e2622', skin: SKM, hair: '#15100c', beard: '#15100c', ...o, under,
    over: '<path d="M-42 -128 Q0 -118 42 -128 L44 -112 Q0 -102 -44 -112Z" fill="#b8862e"/><path d="M-44 -268 Q0 -292 44 -268 Q46 -300 0 -304 Q-46 -300 -44 -268Z" fill="#8a2a26"/><path d="M40 -276 q22 6 26 34 q-14 -6 -24 -18Z" fill="#8a2a26"/>' + over }
  : { kind: 'elder', top: '#b89468', skin: SKM, hair: WHITE, beard: WHITE, cord: true, ...o,
    under: (basket && !o.kneel && !o.sitting ? leakBasket(pour) : '') + under,
    over: cape() + (basket && !o.kneel && !o.sitting ? strap : '') + hood() + over });
/** A desert father of Scetis: plain tunic, cowl and short cape. */
export const monk = (x, y, s, { c = '#a08a6a', cowl = '#5a4636', skin = SKIN.s1, beard = '#d9d4cc', over = '', ...o } = {}) =>
  person(x, y, s, { kind: 'elder', top: c, skin, hair: beard, beard, cord: true, ...o, over: cape(cowl) + hood(cowl) + over });
/** The young brother who was caught in a fault: bare head, short dark beard. */
export const brother = (x, y, s, o = {}) => person(x, y, s, { kind: 'elder', top: '#9a8466', skin: SKIN.s3, hair: '#2a1c14', beard: '#2a1c14', cord: true, ...o });
const thug = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#3a2a2e', pants: '#2a2228', skin: SKIN.s2, hair: '#15100c', beard: '#15100c', mood: 'stern', ...o });

// ---------------------------------------------------------------- props + set pieces
/** A burning torch (held at the hand). */
export const torch = `<g><rect x="-4" y="-70" width="8" height="120" rx="3" fill="#5a3a22"/><circle cy="-84" r="70" fill="url(#sunGlow)" opacity=".8"/><g${M.flick(0.35, 0, 0.6)}><path d="M-13 -70 Q-18 -100 0 -126 Q18 -100 13 -70Z" fill="#ff9a3a"/><path d="M-6 -72 Q-8 -92 0 -106 Q8 -92 6 -72Z" fill="#ffe08a"/></g></g>`;
const sack = '<g transform="translate(0,-10)"><path d="M-30 20 Q-44 -30 -10 -48 L10 -48 Q44 -30 30 20 Q0 34 -30 20Z" fill="#8a6a44"/><path d="M-10 -48 Q0 -62 10 -48" stroke="#5a4028" stroke-width="5" fill="none"/></g>';
const oilLamp = `<g transform="translate(0,-6)"><circle cy="-22" r="60" fill="url(#sunGlow)" opacity=".85"/><path d="M-20 4 Q-22 -12 0 -14 Q22 -12 26 0 L34 -4 L30 8 Q0 16 -20 4Z" fill="#b07a44"/><g${M.flick(0.5, 0, 0.6)}><path d="M26 -4 Q20 -20 30 -32 Q38 -18 32 -4Z" fill="#ffd27a"/></g></g>`;
/** Small heaps of spilled sand along the ground from x0 to x1; with t0 they pop in one after another every dt seconds. */
export const sandPiles = (x0, x1, y, n, t0 = null, dt = 0.4) => Array.from({ length: n }, (_, i) => {
  const x = x0 + (x1 - x0) * i / Math.max(1, n - 1), r = 24 + (i % 3) * 7;
  return `<g transform="translate(${f(x)},${y + (i % 2) * 12})"${t0 == null ? '' : M.in('pop', t0 + i * dt, 0.4)}><ellipse rx="${r}" ry="9" fill="#e8c88a"/><ellipse cx="-4" cy="-3" rx="${f(r * 0.55)}" ry="5" fill="#f6dfae"/></g>`;
}).join('');
/** A monk's cell at Scetis: mud brick with a low dome, a dark arched door and a small cross. Feet at (x, y). */
export function cell(x, y, s = 1, { wall = '#c8a070', lit = false } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-120 -120 Q-120 -230 0 -236 Q120 -230 120 -120Z" fill="${light(wall, 0.1)}"/><path d="M30 -234 Q120 -224 120 -120 L70 -120 Q76 -200 30 -234Z" fill="${dark(wall, 0.2)}" opacity=".6"/>`
    + `<rect x="-130" y="-124" width="260" height="124" fill="${wall}"/><rect x="60" y="-124" width="70" height="124" fill="${dark(wall, 0.2)}" opacity=".6"/>`
    + `<path d="M-34 0 V-62 Q0 -100 34 -62 V0Z" fill="${lit ? '#ffd27a' : dark(wall, 0.6)}"/><rect x="-96" y="-96" width="26" height="30" rx="12" fill="${dark(wall, 0.5)}"/>`
    + `<path d="M0 -236 v-44 M-14 -262 h28" stroke="${dark(wall, 0.45)}" stroke-width="7" stroke-linecap="round"/></g>`;
}
/** The church of Scetis: long mud-brick wall, two domes, a gold cross, an arched door. Feet at (x, y). */
export function desertChurch(x, y, s = 1, { wall = '#d0a878', win = '#5a4030' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-240 -200 Q-240 -330 -110 -336 Q20 -330 20 -200Z" fill="${light(wall, 0.1)}"/><path d="M60 -200 Q60 -290 150 -294 Q240 -290 240 -200Z" fill="${light(wall, 0.06)}"/>`
    + `<path d="M-80 -334 Q20 -322 20 -200 L-30 -200 Q-26 -290 -80 -334Z M176 -292 Q240 -282 240 -200 L206 -200 Q208 -264 176 -292Z" fill="${dark(wall, 0.2)}" opacity=".55"/>`
    + `<rect x="-280" y="-204" width="560" height="204" fill="${wall}"/><rect x="150" y="-204" width="130" height="204" fill="${dark(wall, 0.2)}" opacity=".55"/>`
    + `<path d="M-46 0 V-90 Q0 -140 46 -90 V0Z" fill="${win}"/>${[-200, -130, 110, 190].map((wx) => `<rect x="${wx - 13}" y="-150" width="26" height="46" rx="13" fill="${win}"/>`).join('')}`
    + `<path d="M-110 -336 v-64 M-132 -374 h44" stroke="${GOLD}" stroke-width="9" stroke-linecap="round"/></g>`;
}
const sand = (y, c) => ground(y, c, { rim: light(c, 0.25) }) + `<path d="M-200 ${y + 110} Q540 ${y + 80} ${W + 200} ${y + 120}" stroke="${dark(c, 0.1)}" stroke-width="46" fill="none" opacity=".35"/>`;

// ---------------------------------------------------------------- scenes
// 0 · hook (3D desert at dawn, push-fast): Moses with the leaking basket; the brother caught in sin; a flash of his robber past
function scene0() {
  const B = T.s0b, C = T.s0c, D = T.s0d;
  return MID(sand(1235, '#b8875a') + cell(880, 1245, 0.8, { wall: '#b08a62' }))
    + span(MID(brother(790, 1290, 1.3, { kneel: true, mood: 'sad', armL: 26, armR: 26 }) + monk(640, 1280, 1.2, { mood: 'stern', armL: 10, armR: [78, 3, 2] })), 0.3, B)
    + span(`<g opacity=".55">${moses(840, 1335, 1.7, { robber: true, mood: 'determined', flip: true, armL: 10, armR: 12 })}</g>`, B, C)
    + sandPiles(60, 300, 1375, 5, C, 0.3)
    + span(glow(330, 950, 230, 0.7) + sparkles(10, 200, 460, 820, 1100, { seed: 4 }), C, D + 1)
    + span(moses(500, 1350, 2.35, { basket: true, mood: 'happy', armL: 10, armR: [24, 2, 3], propR: walkingStick }), 0, D, 0.6)
    + span(moses(500, 1350, 2.35, { basket: true, mood: 'happy', halo: true, armL: 10, armR: [24, 2, 3], propR: walkingStick }), D, null, 0.6)
    + motes(12, { x0: 150, x1: 900, y0: 700, y1: 1250, seed: 3, color: '#ffe0a8' })
    + NEAR(foliage('r', 1680, { color: '#3a2a22', seed: 6 }));
}

// 1 · his past (pan-r): a gang of robbers by the Nile at night → dawn, a desert monk, and Moses in a monk's habit
function scene1() {
  const B = T.s1b, C = B + 2.0;
  return FAR(sky(SKIES.night, { stars: 30, seed: 4 }) + span(sky([[0, '#4a4a8a'], [0.4, '#c07a7a'], [0.7, '#f4c48a'], [1, '#f4c48a']]) + sun(820, 760, 60, 380), B, null, 1.2))
    + BACK(hill(1070, 50, '#3a3450', 3) + span(hill(1070, 50, '#b08a6a', 3) + cell(840, 1100, 0.6), B, null, 1.2))
    + MID(waves(1150, 8, 220, 6, '#2e3a5e', { foam: '#5a6a8e' }) + coconut(90, 1215, 0.85, { lean: 26 }) + coconut(1010, 1220, 0.75, { flip: true, lean: 20 })
      + span(thug(190, 1290, 1.35, { armL: 10, armR: [100, 4, 1.4], propR: torch }) + thug(330, 1300, 1.25, { top: '#2e3a3a', armR: [20, 2, 3], propR: sack }), 0, B + 0.2))
    + sand(1230, '#6a5448') + span(sand(1230, '#b89468'), B, null, 1.2)
    + span(`<g${walkIn(B + 0.2, 160, 1)}>${monk(800, 1340, 1.85, { flip: true, mood: 'happy', armL: 10, armR: [64, 3, 2], propR: oilLamp })}</g>`, B)
    + span(moses(460, 1345, 2.2, { robber: true, mood: 'determined', armL: 10, armR: [30, 2, 3], propR: sack }), 0, B)
    + span(moses(460, 1345, 2.2, { robber: true, mood: 'surprised', armL: 12, armR: 12 }), B, C)
    + span(glow(460, 1000, 380, 0.8) + sparkles(12, 300, 640, 760, 1150, { seed: 7 }) + moses(460, 1345, 2.2, { mood: 'peaceful', armL: 26, armR: 26 }), C)
    + NEAR(foliage('l', 1680, { color: '#1c1a26' }) + bokeh(4, { seed: 5, op: [0.15, 0.35] }));
}

// 2 · Scetis (drift-l): a brother caught in a fault; the monks gather to judge him and send a messenger for Moses
function scene2() {
  const B = T.s2b;
  const run = M.tw([{ at: B + 1.4, dur: 2.2, from: { x: 0, opacity: 1 }, to: { x: 320, opacity: 0 }, ease: 'power1.in' }]);
  return FAR(sky([[0, '#3a78b8'], [0.4, '#8cc0e0'], [0.72, '#f0e0b8'], [1, '#f0e0b8']]) + sun(860, 520, 56, 300) + clouds(430, { seed: 6, op: 0.7, n: 2 }))
    + BACK(hill(1060, 46, '#d8b888', 4) + hill(1110, 26, '#c8a070', 8) + cell(110, 1120, 0.5) + coconut(1020, 1130, 0.6, { flip: true, lean: 20 }))
    + MID(desertChurch(520, 1215, 0.95))
    + sand(1225, '#d8b480')
    + span(`<g${walkIn(B, -200, 0.9)}>${monk(170, 1335, 1.8, { mood: 'stern', armL: 10, armR: [82, 3, 2] })}</g>`, B)
    + span(`<g${walkIn(B + 0.3, 200, 0.9)}>${monk(840, 1335, 1.8, { c: '#8a7a66', cowl: '#3e3430', skin: SKIN.priest, flip: true, mood: 'stern', armL: 10, armR: [30, 2, 3], propR: walkingStick })}</g>`, B + 0.3)
    + span(`<g${run}>${monk(660, 1290, 1.3, { c: '#b09a78', skin: SKIN.s3, beard: '#3a2a20', mood: 'worried', armL: [40, 10, 0.5], armR: [40, 10, 0.5] })}</g>`, B + 0.9)
    + span(brother(500, 1345, 2.05, { kneel: true, mood: 'worried', armL: 26, armR: 26 }), 0, B)
    + span(brother(500, 1345, 2.05, { kneel: true, mood: 'sad', armL: 26, armR: 26 }), B)
    + NEAR(foliage('r', 1680, { color: '#4a3a2a', seed: 4 }));
}

// 3 · the basket (3D desert, pan-r): he refuses at first, then fills an old basket with sand and sets out, sand pouring out
function scene3() {
  const B = T.s3b;
  const walk = M.tw([{ at: B + 0.8, dur: 4.5, from: { x: 0 }, to: { x: 250 }, ease: 'power1.inOut' }]);
  return MID(sand(1235, '#d8b078') + cell(200, 1245, 1.0, { lit: true }))
    + span(monk(800, 1340, 1.8, { c: '#b09a78', skin: SKIN.s3, beard: '#3a2a20', flip: true, mood: 'worried', talk: [0.2, B - 0.2], armL: 12, armR: [80, 5, 1.2] }), 0, B)
    + span(moses(430, 1345, 2.15, { kneel: true, mood: 'peaceful', armL: 28, armR: 28 }), 0, B)
    + sandPiles(290, 520, 1385, 6, B + 1.3, 0.55)
    + span(`<g${walk}>${moses(430, 1350, 2.15, { basket: true, mood: 'determined', armL: 10, armR: [24, 2, 3], propR: walkingStick })}</g>`, B)
    + span(glow(280, 980, 200, 0.6) + sparkles(8, 180, 420, 850, 1080, { seed: 5 }), B, B + 2)
    + motes(10, { x0: 100, x1: 900, y0: 760, y1: 1250, seed: 9, color: '#fff0c8' });
}

// 4 · the turning point (3D golden desert, dolly): "What is this, Father?" / "My sins run out behind me, and I do not see them."
function scene4() {
  const B = T.s4b, C = T.s4c, D = T.s4d, E = D + 2.4;
  const L = (mood, extra = {}) => monk(150, 1340, 1.7, { mood, armL: 10, armR: [40, 3, 2], ...extra });
  const R = (mood, extra = {}) => monk(900, 1340, 1.65, { c: '#8a7a66', cowl: '#3e3430', skin: SKIN.priest, flip: true, mood, armL: 10, armR: 12, ...extra });
  return MID(sand(1235, '#c89a62') + brother(755, 1262, 1.2, { kneel: true, mood: 'sad', armL: 26, armR: 26 }))
    + sandPiles(-40, 340, 1385, 6)
    + span(L('stern', { talk: [B, C - 1.0], armR: [66, 3, 2] }), 0, C + 1.2) + span(L('surprised'), C + 1.2, E) + span(L('sad', { armR: 12 }), E)
    + span(R('stern'), 0, C + 1.5) + span(R('surprised'), C + 1.5, E + 0.3) + span(R('sad'), E + 0.3)
    + span(glow(580, 960, 420, 0.75) + rays(580, 960, { op: 0.09 }), C, null, 0.8)
    + span(moses(580, 1350, 2.2, { basket: true, mood: 'happy', armL: 10, armR: 10 }), 0, C - 0.5)
    + span(moses(580, 1350, 2.2, { basket: true, mood: 'sad', talk: [C, 99], armL: [34, 3, 2.4], armR: [30, 3, 2.8] }), C - 0.5)
    + span(sparkles(10, 330, 500, 1150, 1380, { seed: 8 }), C + 0.4, D);
}

// 5 · forgiven (tilt-up + rack focus): they say no more and forgive the brother; the quotable line
function scene5() {
  const B = T.s5b;
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + sun(560, 780, 70, 480) + rays(560, 780, { op: 0.1 }))
    + BACK(hill(1070, 46, '#c88a5a', 4) + desertChurch(860, 1120, 0.5, { wall: '#d8a070' }))
    + MID(hill(1160, 18, '#d8a468', 7) + coconut(60, 1220, 0.8, { lean: 24 }))
    + sand(1225, '#d0a268')
    + sandPiles(40, 250, 1380, 4)
    + span(brother(690, 1345, 1.8, { kneel: true, mood: 'sad', armL: 26, armR: 26 }) + monk(905, 1335, 1.5, { flip: true, mood: 'sad', armL: 10, armR: 12 }), 0, 1.7)
    + span(brother(690, 1345, 1.9, { mood: 'joy', armL: [40, 3, 2], armR: [40, 3, 2.2] }) + monk(905, 1335, 1.5, { flip: true, mood: 'happy', armL: 10, armR: [74, 3, 2] }), 1.7)
    + span(glow(700, 1050, 300, 0.6) + sparkles(10, 560, 860, 800, 1150, { seed: 6 }), 1.7, B + 0.8)
    + span(moses(400, 1350, 2.2, { basket: true, pour: false, mood: 'happy', armL: [62, 3, 2.4], armR: [24, 2, 3], propR: walkingStick }), 0, B)
    + span(moses(400, 1350, 2.2, { basket: true, pour: false, halo: true, mood: 'peaceful', armL: 12, armR: [24, 2, 3], propR: walkingStick }), B, null, 0.7)
    + span(sparkles(12, 30, 300, 1300, 1400, { seed: 12 }), B + 1.2)
    + motes(12, { y0: 700, y1: 1250, seed: 6 })
    + NEAR(bokeh(7, { seed: 14 }));
}

// 6 · feast portrait (arc): Moses with halo, martyr's palm, staff and the basket; the church of Scetis at dusk
function scene6() {
  const B = T.s6b;
  return FAR(sky([[0, '#2a2a5a'], [0.4, '#7a4a6a'], [0.68, '#e8906a'], [1, '#f8c87a']], { stars: 18, seed: 5 }) + rays(520, 840, { op: 0.12 }))
    + BACK(hill(1090, 44, '#6a4a5a', 3) + desertChurch(800, 1130, 0.55, { wall: '#c89a7a', win: '#ffd98a' }))
    + MID(hill(1170, 16, '#8a5e5a', 6) + coconut(1000, 1235, 0.9, { flip: true, lean: 26 }) + cell(110, 1240, 0.55, { wall: '#b88a6a', lit: true }))
    + sand(1240, '#8a6450')
    + sandPiles(60, 290, 1385, 5, 3.4, 0.4)
    + glow(500, 920, 460, 0.9)
    + moses(500, 1352, 2.3, { basket: true, halo: true, mood: 'happy', armL: [118, 2, 3], propL: palm_frond(1.1, -18), armR: [24, 2, 3], propR: walkingStick })
    + span(sparkles(14, 260, 760, 600, 1100, { seed: 11 }), B)
    + NEAR(bokeh(7, { seed: 19 }));
}

export const STORY = {
  slug: 'st_moses_black_basket', name: 'St_Moses_the_Black_The_Leaking_Basket',
  bg3d: './moses_black_basket.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { moses: { voice: { bm_george: 0.6, am_onyx: 0.4 }, speed: 0.9 }, monk: { voice: 'bm_lewis', speed: 1.0 } },
  thumb_hook: 'A basket full of holes', thumb_title: 'St. Moses the Black', thumb_scene: 6, thumb_t: 3, thumb_shift: -60,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 760, 'l']],
  fix: {
    'sˈɛɾiz': 'skˈɛtɪs',                       // Scetis -> SKET-iss
    'ˈɔːɡəst twˈɛnti ˈeɪt': 'ˈɔːɡəst twˈɛnti ˈeɪtθ',  // August 28 -> August twenty-eighth
  },
  scenes: [
    { kicker: 'SCETIS · THE DESERT OF EGYPT', title: 'Sent to Judge a Sinner', art: scene0, bg3d: 'desertDawn', cam: { move: 'push-fast', oy: 1100 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['A monk was caught in sin.', 'They sent a former gang leader to judge him.', 'He came with a basket full of holes.', 'This is Saint Moses the Black.'] },
    { kicker: 'EGYPT · AROUND 370', title: 'The Robber Chief', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Moses once led 75 robbers in Egypt.', 'Then he hid among the desert monks, and became one.'] },
    { kicker: 'YEARS LATER · SCETIS', title: 'The Council', art: scene2, cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['Years later, a brother at Scetis was caught in a fault.', 'The monks called a council, and sent for Moses.'] },
    { kicker: 'HIS CELL', title: 'A Basket of Sand', art: scene3, bg3d: 'desertDay', cam: 'pan-r',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['At first, he refused to go.', 'Then he filled an old basket with sand, and set out.', 'Sand poured out behind him with every step.'] },
    { kicker: 'BEFORE THE COUNCIL', title: 'What Is This, Father?', art: scene4, bg3d: 'desertGold', cam: { move: 'dolly', amt: 0.08, ox: 580, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['The monks asked:', { text: 'What is this, Father?', who: 'monk' },
        { text: 'My sins run out behind me, and I do not see them.', who: 'moses', beat: 0.9, speed: 0.85 },
        { text: 'And today I am coming to judge the errors of another?', who: 'moses' }] },
    { kicker: 'THE BROTHER', title: 'Forgiven', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['They said no more, and forgave the brother.', 'Before you judge another, look at the trail behind you.'] },
    { kicker: 'FEAST · AUGUST 28', title: 'St. Moses the Black', art: scene6, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is August 28. He is a patron of Africa and of nonviolence.', 'Saint Moses the Black, pray for us.'] },
  ],
};
