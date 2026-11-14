// St. Catherine of Siena, "She Brought the Pope Home" (one story). From 1309 the popes lived at Avignon (the
// article used here counts 67 years). Catherine Benincasa, born in Siena on March 25, 1347, a cloth dyer's daughter and
// a lay Dominican (Mantellata), went to Avignon in June 1376 and for three months pressed Pope Gregory XI to return to
// Rome. He hesitated; her letters say his counsellors warned him "You will die", and she wrote: "Up, father, like a
// man! For I tell you that you have no need to fear." (tr. Vida Scudder). A traditional account says she spoke of a
// private vow he had made to return to Rome. He left Avignon on September 13, 1376 and entered Rome on January 17,
// 1377. How much of the decision was her doing is debated by historians, so the reel says only what happened.
// Feast April 29; co-patron of Italy (1939) and of Europe (1999); Doctor of the Church (1970).
// Sources: Wikipedia "Catherine of Siena"; catholic.com "How St. Catherine Brought the Pope Back to Rome"; Letters of
// Catherine Benincasa, tr. Vida D. Scudder (Project Gutenberg 7403); Britannica "Gregory XI".
// New (exported for later reels): catherine (Mantellata habit; optional crown of thorns), littleCatherine, gregory
// (Pope Gregory XI), cardinal, thornCrown, tiaraIcon, kingCrown, letter, dyeLine, hallWall.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, clouds, hill, sparkles, motes, foliage, tufts, flowers, person, book, lily,
  ship, crowd, ground, dark, light, bokeh, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { assisi, tree } from './francis.mjs';
import { chateau } from './joan_of_arc.mjs';
import { leo, oldStPeters, ferula } from './leo_the_great.mjs';
import { biretta, mozzetta, tiara } from './charles_borromeo.mjs';
import { romeSkyline } from './peter.mjs';

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

// Line starts (s from scene start), from `node build.mjs stories/catherine_of_siena_avignon.mjs info`
const T = { s0b: 3.41, s0c: 5.17, s0d: 6.49, s2b: 7.14, s3b: 3.41, s3c: 5.17, s4b: 5.36, s5b: 5.11, s6b: 6.34 };

// ---------------------------------------------------------------- people
const SKC = SKIN.fair, WHITE = '#f2ede2', BLACK = '#1d1a22';
const mantle = `<path d="M-44 -210 Q-76 -110 -66 -4 L66 -4 Q76 -110 44 -210Z" fill="${BLACK}"/><path d="M44 -210 Q76 -110 66 -4 L46 -4 Q54 -110 34 -206Z" fill="#000" opacity=".3"/>`;
const mantleFront = `<path d="M-42 -210 Q-58 -150 -54 -30 L-36 -30 Q-40 -150 -26 -208Z M42 -210 Q58 -150 54 -30 L36 -30 Q40 -150 26 -208Z" fill="${BLACK}"/>`
  + `<path d="M-42 -213 Q0 -197 42 -213 Q47 -194 33 -184 Q0 -176 -33 -184 Q-47 -194 -42 -213Z" fill="${BLACK}"/>`;   // mantle collar: frames the white wimple
/** The crown of thorns Catherine is shown with (worn over the veil). */
export const thornCrown = '<g fill="none" stroke="#7a5230" stroke-width="5" stroke-linecap="round"><path d="M-44 -282 Q0 -300 44 -282"/><path d="M-42 -276 Q0 -292 42 -276" stroke="#5a3a20"/>'
  + '<path d="M-34 -290 l-5 -10 M-16 -295 l-2 -11 M2 -297 l3 -11 M20 -294 l6 -10 M36 -288 l8 -8" stroke-width="3.5"/></g>';
/** St. Catherine of Siena: the Mantellata habit (white tunic and veil, black mantle). thorns: the crown of thorns. */
export const catherine = (x, y, s, { thorns = false, over = '', ...o } = {}) =>
  person(x, y, s, { kind: 'nun', top: WHITE, veil: WHITE, skin: SKC, under: o.kneel || o.sitting ? '' : mantle, ...o,
    over: (o.kneel || o.sitting ? '' : mantleFront) + (thorns ? thornCrown : '') + over });
export const littleCatherine = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', girl: true, robe: true, top: '#7a9ac8', skin: SKC, hair: '#b8864a', ...o });
/** Pope Gregory XI: white robe, red cope, pallium and tiara, clean-shaven. */
export const gregory = (x, y, s, o = {}) => leo(x, y, s, { hair: '#6a4a34', beard: false, ...o });
/** A cardinal in red with mozzetta and biretta. */
export const cardinal = (x, y, s, { hair = '#8a8078', skin = SKIN.priest, over = '', ...o } = {}) =>
  person(x, y, s, { kind: 'priest', top: '#b3202e', collar: false, skin, hair, beard: false, ...o, over: mozzetta + biretta + over });
const dyer = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#8a5a3a', pants: '#4a3a2e', skin: SKIN.priest, hair: '#4a3020', beard: '#4a3020', ...o });

// ---------------------------------------------------------------- props + set pieces
/** The papal tiara as a floating symbol. */
export const tiaraIcon = `<g><circle r="64" fill="url(#haloGlow)" opacity=".85"/><g transform="translate(0,330) scale(1)">${tiara}</g></g>`;
/** A king's crown as a floating symbol. */
export const kingCrown = `<g><circle r="58" fill="url(#haloGlow)" opacity=".7"/><path d="M-40 22 L-46 -22 L-22 0 L0 -32 L22 0 L46 -22 L40 22Z" fill="${GOLD}"/><path d="M0 -32 L22 0 L46 -22 L40 22 L0 22Z" fill="#c99a3a" opacity=".6"/><rect x="-40" y="16" width="80" height="12" rx="4" fill="#c99a3a"/><circle cy="-34" r="6" fill="#d4384a"/><circle cx="-46" cy="-24" r="5" fill="#8ec5f0"/><circle cx="46" cy="-24" r="5" fill="#8ec5f0"/></g>`;
/** A sealed letter. */
export const letter = '<g><circle r="70" fill="url(#haloGlow)" opacity=".9"/><g transform="rotate(-8)"><rect x="-46" y="-32" width="92" height="64" rx="5" fill="#f6ecd2"/><path d="M-46 -32 L0 6 L46 -32" stroke="#c8b890" stroke-width="4" fill="none"/><circle cy="8" r="10" fill="#b3202e"/></g></g>';
/** A line of dyed cloth drying between two poles (her father's trade). Ground at y. */
export function dyeLine(x, y, s = 1) {
  const cols = ['#b8323e', '#2f6fa8', '#e2a33a', '#5a9a5a'];
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-230" width="10" height="230" rx="4" fill="#7a5536"/><rect x="140" y="-230" width="10" height="230" rx="4" fill="#7a5536"/><path d="M-145 -222 Q0 -196 145 -222" stroke="#5a3d22" stroke-width="4" fill="none"/>`
    + cols.map((c, i) => `<g transform="translate(${-108 + i * 72},-212)"><g${M.sway(3, 2.6 + i * 0.3, i * 0.4, 0, 0)}><path d="M-28 0 L28 0 L24 120 Q0 132 -24 120Z" fill="${c}"/><path d="M8 0 L28 0 L24 120 Q14 126 6 126Z" fill="${dark(c, 0.25)}" opacity=".6"/></g></g>`).join('') + '</g>';
}
/** The wall of a papal hall: stone, tall arched windows, a red hanging with gold keys. Floor at y. */
export function hallWall(y, { wall = '#5a4a5e', win = '#e8b878' } = {}) {
  return `<rect x="-200" y="200" width="${W + 400}" height="${y - 200}" fill="${wall}"/>`
    + [120, 960].map((wx) => `<path d="M${wx - 70} ${y - 180} V${y - 520} Q${wx} ${y - 660} ${wx + 70} ${y - 520} V${y - 180}Z" fill="${win}"/><path d="M${wx - 70} ${y - 180} V${y - 520} Q${wx} ${y - 660} ${wx + 70} ${y - 520} V${y - 180}" stroke="${light(wall, 0.2)}" stroke-width="16" fill="none"/><path d="M${wx} ${y - 180} V${y - 590}" stroke="${light(wall, 0.2)}" stroke-width="8"/>`).join('')
    + `<path d="M380 ${y - 700} H700 V${y - 160} L540 ${y - 110} L380 ${y - 160}Z" fill="#8a2a32"/><path d="M620 ${y - 700} H700 V${y - 160} L620 ${y - 135}Z" fill="#6a1e26" opacity=".6"/><path d="M380 ${y - 700} H700" stroke="${GOLD}" stroke-width="12"/>`;
}
const stoneFloor = (y, c) => ground(y, c, { rim: light(c, 0.15) }) + Array.from({ length: 7 }, (_, i) => `<path d="M${-100 + i * 220} ${y + 6} l-40 400" stroke="${dark(c, 0.2)}" stroke-width="4" opacity=".4"/>`).join('');
const grass = (y, c) => ground(y, c, { rim: light(c, 0.2) });
const openBook = (s = 1) => `<g transform="scale(${s})">${book(true)}</g>`;
const lilyP = `<g transform="translate(0,-20)">${lily(1.25)}</g>`;

// ---------------------------------------------------------------- scenes
// 0 · hook (3D river town at dusk, push-fast): Catherine as she is known; a tiara and a crown: popes and kings
function scene0() {
  const B = T.s0b, C = T.s0c, D = T.s0d;
  return MID(grass(1245, '#5a4a78') + tufts(1255, 8, '#6a5a8a', { seed: 4 }))
    + glow(540, 900, 470, 0.85)
    + pop(tiaraIcon, 200, 760, 0.6) + span(pop(kingCrown, 880, 780, B + 0.3), B, C + 0.4)
    + span(rays(540, 780, { op: 0.1 }) + sparkles(12, 200, 880, 600, 1100, { seed: 4 }), C, null, 0.8)
    + span(catherine(540, 1350, 2.35, { halo: true, thorns: true, mood: 'happy', armL: [28, 2, 3], propL: openBook(1), armR: [26, 2, 3], propR: lilyP }), 0, C)
    + span(catherine(540, 1350, 2.35, { halo: true, thorns: true, mood: 'joy', armL: [28, 2, 3], propL: openBook(1), armR: [26, 2, 3], propR: lilyP }), C, null)
    + span(sparkles(10, 300, 780, 560, 900, { seed: 9 }), D, null)
    + motes(12, { x0: 120, x1: 940, y0: 650, y1: 1250, seed: 3 })
    + NEAR(foliage('l', 1680, { color: '#2a2448', seed: 6 }) + bokeh(6, { seed: 9, op: [0.2, 0.5] }));
}

// 1 · Siena, 1347 (pan-r): the dyer's daughter among the drying cloth → the young lay Dominican
function scene1() {
  const B = 4.2;
  return FAR(sky(SKIES.day) + sun(840, 560, 56, 320) + clouds(440, { seed: 4, n: 2, op: 0.8 }))
    + BACK(hill(1060, 50, '#9ab87a', 3) + assisi(560, 1080, 0.9, { wall: '#d8a078', roof: '#b0583a' }))
    + MID(dyeLine(250, 1235, 1.15) + tree(1010, 1235, 0.9) + dyer(820, 1290, 1.3, { flip: true, mood: 'happy', armL: 10, armR: [40, 3, 2] }))
    + grass(1230, '#7a9a52') + flowers(1245, 1330, 10, { seed: 5 })
    + span(littleCatherine(500, 1340, 1.7, { mood: 'joy', armL: [40, 4, 1.6], armR: [40, 4, 1.8] }), 0, B)
    + span(glow(500, 980, 340, 0.75) + sparkles(10, 360, 660, 760, 1100, { seed: 6 }), B, B + 1.8)
    + span(catherine(500, 1345, 2.15, { mood: 'happy', armL: 26, armR: 26 }), B, null)
    + NEAR(foliage('r', 1680, { color: '#2a4a2e', seed: 3 }));
}

// 2 · Avignon, 1376 (drift-l): she walks in and stands before Gregory XI; for three months she begs him to return
function scene2() {
  const B = T.s2b;
  return FAR(sky(SKIES.sunrise) + sun(200, 620, 56, 340) + clouds(450, { seed: 7, n: 2, op: 0.7 }))
    + BACK(hill(1070, 40, '#a8b888', 5) + chateau(600, 1100, 0.95, { wall: '#e6d8bc', roof: '#8a6a5a' }))
    + MID(tree(40, 1235, 0.9) + span(cardinal(985, 1270, 1.1, { flip: true, mood: 'stern', armL: 10, armR: 10 }), 5.2))
    + stoneFloor(1235, '#c8b898')
    + span(`<g${walkIn(3.8, 220, 1.2)}>${gregory(770, 1350, 2.05, { flip: true, mood: 'happy', armR: 10, armL: [26, 2, 3], propL: ferula() })}</g>`, 3.8, B)
    + span(gregory(770, 1350, 2.05, { flip: true, mood: 'worried', armR: 10, armL: [26, 2, 3], propL: ferula() }), B, null)
    + span(`<g${walkIn(0.4, -260, 1.6)}>${catherine(300, 1350, 2.1, { mood: 'determined', armL: 12, armR: 12 })}</g>`, 0.4, B)
    + span(glow(300, 950, 320, 0.6) + catherine(300, 1350, 2.1, { mood: 'sad', armL: [60, 5, 1.6], armR: [70, 5, 1.8] }), B, null)
    + NEAR(foliage('l', 1690, { color: '#3a4a2e', seed: 8 }));
}

// 3 · the Pope's hall (push): his cardinals warn him he will die; her letter: "Up, father, like a man!"
function scene3() {
  const B = T.s3b, C = T.s3c;
  return FAR(sky(SKIES.deep))
    + BACK(hallWall(1235))
    + MID(span(cardinal(390, 1275, 1.45, { mood: 'stern', armL: 10, armR: [84, 4, 1.2] }), 0, B) + span(cardinal(880, 1275, 1.4, { hair: '#4a3a30', skin: SKIN.s3, flip: true, mood: 'stern', armL: 10, armR: [70, 4, 1.4] }), 0, C)
      + span(cardinal(880, 1275, 1.4, { hair: '#4a3a30', skin: SKIN.s3, flip: true, mood: 'surprised', armL: 10, armR: 10 }), C))
    + stoneFloor(1235, '#4a3e52')
    + span(gregory(640, 1350, 2.1, { mood: 'worried', armL: 10, armR: [26, 2, 3], propR: ferula() }), 0, C + 1.4)
    + span(gregory(640, 1350, 2.1, { mood: 'surprised', armL: [40, 3, 2], armR: [26, 2, 3], propR: ferula() }), C + 1.4, null)
    + span(glow(210, 900, 360, 0.85) + pop(letter, 410, 700, C + 0.2), C - 0.2, null, 0.7)
    + span(`<g${walkIn(B, -200, 0.9)}>${catherine(210, 1350, 1.95, { mood: 'determined', talk: [C, 99], armL: 12, armR: [132, 4, 1.6] })}</g>`, B)
    + motes(8, { x0: 100, x1: 900, y0: 700, y1: 1250, seed: 8 });
}

// 4 · the turning point (3D river at sunset, dolly): the secret vow; in September 1376 he leaves Avignon
function scene4() {
  const B = T.s4b;
  const sail = M.tw([{ at: B + 0.4, dur: 4, from: { x: -260, opacity: 0 }, to: { x: 40, opacity: 1 }, ease: 'power1.out' }]);
  return MID(`<g${sail}>${ship(500, 1200, 0.5)}</g>`)
    + grass(1245, '#8a7a8a') + tufts(1255, 8, '#9a8a9a', { seed: 6 })
    + span(glow(740, 900, 420, 0.75) + rays(740, 860, { op: 0.09 }), 2.6, null, 0.8)
    + span(catherine(290, 1350, 2.1, { mood: 'happy', armL: 12, armR: [60, 3, 2] }), 0, B)
    + span(catherine(290, 1350, 2.1, { mood: 'joy', armL: 26, armR: 26 }), B, null)
    + span(gregory(740, 1350, 2.1, { flip: true, mood: 'worried', armR: 10, armL: [26, 2, 3], propL: ferula() }), 0, 2.6)
    + span(gregory(740, 1350, 2.1, { flip: true, mood: 'surprised', armR: 10, armL: [26, 2, 3], propL: ferula() }), 2.6, B)
    + span(gregory(740, 1350, 2.1, { mood: 'determined', armL: 10, armR: [84, 3, 2] }), B, null)
    + span(sparkles(12, 520, 880, 560, 1000, { seed: 8 }), 2.8, B + 1.5)
    + motes(10, { x0: 100, x1: 950, y0: 700, y1: 1250, seed: 5 });
}

// 5 · Rome, January 17, 1377 (tilt-up + rack focus): the Pope enters Rome; she had only the truth, spoken with love
function scene5() {
  const B = T.s5b;
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + sun(560, 760, 70, 500) + rays(560, 760, { op: 0.11 }))
    + BACK(romeSkyline(540, 1120, 1.0) + oldStPeters(640, 1130, 0.75))
    + MID(crowd(1235, 14, { flags: [['#ffe14a', '#ffffff', '#ffe14a']] }))
    + ground(1250, '#7a4a3a', { rim: '#c8865a' })
    + span(`<g${walkIn(0.2, 200, 1.4)}>${gregory(690, 1350, 2.0, { flip: true, mood: 'joy', armR: [120, 4, 2], armL: [26, 2, 3], propL: ferula() })}</g>`, 0.2, B)
    + span(sparkles(12, 420, 900, 560, 1000, { seed: 7 }), 2.6, B)
    + span(gregory(770, 1340, 1.7, { flip: true, mood: 'happy', armR: 10, armL: [26, 2, 3], propL: ferula() }), B, null)
    + span(glow(380, 900, 430, 0.9) + catherine(380, 1350, 2.25, { halo: B + 0.4, mood: 'peaceful', armL: 26, armR: 26 }), B, null, 0.8)
    + span(sparkles(14, 180, 600, 560, 1100, { seed: 4 }), B + 2.2, null)
    + NEAR(bokeh(7, { seed: 17 }));
}

// 6 · feast portrait (arc): Catherine with halo, crown of thorns, lily and book; Siena at dusk
function scene6() {
  const B = T.s6b;
  return FAR(sky(SKIES.dusk, { stars: 20, seed: 5 }) + rays(540, 820, { op: 0.12 }))
    + BACK(hill(1080, 44, '#5a4a6a', 4) + assisi(600, 1100, 0.8, { wall: '#b88a8a', roof: '#8a4a4a', hillC: '#5a5a6a', win: '#ffd98a' }))
    + MID(hill(1170, 18, '#6a5a6a', 7) + tree(70, 1240, 0.9, '#3a5a4a'))
    + ground(1240, '#4a4458', { rim: '#8a7a8a' })
    + glow(540, 900, 470, 0.9)
    + pop(tiaraIcon, 190, 720, 2.6) + pop(letter, 880, 800, 4.2)
    + catherine(540, 1350, 2.35, { halo: true, thorns: true, mood: 'happy', armL: [28, 2, 3], propL: openBook(1), armR: [26, 2, 3], propR: lilyP })
    + span(sparkles(14, 240, 840, 600, 1100, { seed: 11 }), B)
    + NEAR(foliage('l', 1680, { color: '#2a2448', seed: 6 }) + bokeh(6, { seed: 9, op: [0.2, 0.5] }));
}

export const STORY = {
  slug: 'st_catherine_of_siena_avignon', name: 'St_Catherine_of_Siena_She_Brought_the_Pope_Home',
  bg3d: './catherine_of_siena_avignon.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'loire.bg3d.js': './joan_of_arc_orleans.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { catherine: { voice: 'if_sara', speed: 0.95 } },
  thumb_hook: 'She brought the Pope home', thumb_title: 'St. Catherine of Siena', thumb_scene: 6, thumb_t: 5, thumb_shift: -40,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'dʒˈænjuːˌɛɹi sˈɛvəntˌiːn': 'dʒˈænjuːˌɛɹi sˌɛvəntˈiːnθ',   // January 17 -> January seventeenth
    'ˈeɪpɹəl twˈɛnti nˈaɪn': 'ˈeɪpɹəl twˈɛnti nˈaɪnθ',          // April 29 -> April twenty-ninth
  },
  scenes: [
    { kicker: 'AVIGNON · 1376', title: 'She Told the Pope: Go', art: scene0, bg3d: 'rhoneDusk', cam: { move: 'push-fast', oy: 1050 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['For 67 years, the popes had left Rome.', 'No king could bring them back.', 'A dyer\'s daughter did.', 'This is Saint Catherine of Siena.'] },
    { kicker: 'SIENA · 1347', title: 'The Dyer\'s Daughter', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Born in Siena in 1347, a cloth dyer\'s daughter, she became a lay Dominican.'] },
    { kicker: 'AVIGNON · JUNE 1376', title: 'Before the Pope', art: scene2, cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['In 1376, at 29, she traveled to Avignon and stood before Pope Gregory XI.', 'For three months, she begged him to return to Rome.'] },
    { kicker: 'THE PAPAL COURT', title: 'You Will Die', art: scene3, cam: { move: 'push', amt: 0.06, ox: 600, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['His cardinals warned him: go, and you will die.', 'So Catherine wrote to him:',
        { text: 'Up, father, like a man! For I tell you that you have no need to fear.', who: 'catherine' }] },
    { kicker: 'SEPTEMBER 1376', title: 'The Secret Vow', art: scene4, bg3d: 'rhoneSunset', cam: { move: 'dolly', amt: 0.08, ox: 520, oy: 900 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['Tradition says she even knew of a secret vow he had made, to return to Rome.',
        { text: 'In September 1376, he left Avignon.', speed: 0.85 }] },
    { kicker: 'ROME · JANUARY 17, 1377', title: 'The Pope Comes Home', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['On January 17, 1377, the Pope entered Rome.', 'She had no army and no crown, only the truth, spoken with love.'] },
    { kicker: 'FEAST · APRIL 29', title: 'St. Catherine of Siena', art: scene6, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is April 29. She is a patron saint of Italy and of Europe.', 'Saint Catherine of Siena, pray for us.'] },
  ],
};
