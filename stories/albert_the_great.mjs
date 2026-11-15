// St. Albert the Great (Albertus Magnus), whole life. Born around 1200 at Lauingen on the Danube (Bavaria), a knight's
// son; studied at Padua and joined the Dominicans there (habit from Bl. Jordan of Saxony, 1223 or 1229). Studied and
// wrote on plants, animals, stars and minerals; De Mineralibus: the aim of natural science is "not simply to accept
// what we are told but to inquire into the causes of natural things". Master at Paris 1245; opened the Dominican
// studium in Cologne in 1248, where Thomas Aquinas was his student (the "Dumb Ox" story is a traditional anecdote, so
// it is told as "tradition says", in indirect speech). Bishop of Regensburg 1260 (walked his diocese on foot instead of
// riding; resigned about 1262). Thomas died in 1274, which grieved him; defending Thomas's teaching was among his last
// labours. Died in Cologne, November 15, 1280. Beatified 1622; canonized and declared a Doctor of the Church by
// Pius XI in 1931; patron of natural scientists (Pius XII, 1941). Feast November 15.
// Sources: Benedict XVI, General Audience of 24 March 2010 (vatican.va); Wikipedia "Albertus Magnus"; Stanford
// Encyclopedia of Philosophy "Albert the Great"; New Catholic Encyclopedia.
// Redone 2026-11-15 with the detailed rig hd() (hd.mjs): every face changes on the word it reacts to (wordTimes + seq).
// New (exported for later reels): albert (young friar / old friar / bishop), aquinas (young Thomas, optional sun
// emblem), dominican, quill, oxBubble, crystal, leafSprig, starBurst, glowCross, studyDesk.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers, butterflies,
  book, basilica, crowd, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { mitre, perched, tree } from './francis.mjs';
import { gothic } from './joan_of_arc.mjs';
import { cloister } from './martin_de_porres.mjs';
import { crozier, horse } from './martin_of_tours.mjs';
import { wartburg } from './elizabeth_of_hungary.mjs';
import { cottage } from './kolbe.mjs';
import { staff } from './roch_dog.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
/** Show svg only from t0 to t1 (seconds from the scene start); t0 = 0 means from the first frame, t1 = null to the end. */
const span = (svg, t0 = 0, t1 = null, dur = 0.45) => {
  const inner = t0 > 0 ? `<g${fadeIn(t0, dur)}>${svg}</g>` : svg;
  return t1 == null ? inner : `<g${fadeOut(t1, dur)}>${inner}</g>`;
};
const pop = (svg, x, y, at, type = 'pop') => `<g transform="translate(${x},${y})"><g${M.in(type, at, 0.5)}>${svg}</g></g>`;

// When each word is spoken (s from the scene start), from work/<slug>/timings.json
const at = wordTimes('st_albert_the_great');

// ---------------------------------------------------------------- people
const SKA = SKIN.fair, BLACK = '#1d1a22', WHITE = '#e8e4dc';
const capeB = `<path d="M-42 -208 Q-72 -110 -62 -4 L62 -4 Q72 -110 42 -208Z" fill="${BLACK}"/><path d="M42 -208 Q72 -110 62 -4 L44 -4 Q52 -110 32 -204Z" fill="#000" opacity=".3"/>`;
const scap = '<rect x="-17" y="-204" width="34" height="198" rx="6" fill="#faf6ec"/><rect x="6" y="-204" width="11" height="198" fill="#d8d0c0" opacity=".6"/>';
const scapKneel = '<rect x="-17" y="-204" width="34" height="100" rx="6" fill="#faf6ec"/><rect x="6" y="-204" width="11" height="100" fill="#d8d0c0" opacity=".6"/>';
const capuce = `<path d="M-41 -213 Q0 -196 41 -213 Q47 -190 31 -178 Q0 -170 -31 -178 Q-47 -190 -41 -213Z" fill="${BLACK}"/>`;
const pectoralCross = `<path d="M-14 -200 Q0 -176 0 -166 Q0 -176 14 -200" stroke="${GOLD}" stroke-width="2.5" fill="none"/><path d="M0 -170 v24 M-8 -161 h16" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
const habit = (o) => (o.kneel ? scapKneel : scap) + capuce;
const HABIT = { top: '#f1ebdf', plain: true, belt: false, shoes: '#2a2228', beard: null, hairStyle: 'tonsure' };
/** A Dominican friar: white tunic and scapular, black cape and capuce, tonsure (detailed rig). */
export const dominican = (x, y, s, { hair = '#5a3e2a', skin = SKIN.priest, over = '', ...o } = {}) =>
  hd(x, y, s, { ...HABIT, age: 'young', skin, hair, ...o, under: o.kneel ? '' : capeB, over: habit(o) + over });
/** St. Albert the Great. Default: the young Dominican (brown hair, tonsure). old: white hair. bishop: mitre and
 * pectoral cross over the Dominican habit (hold the crozier with propL/propR). */
export const albert = (x, y, s, { old = false, bishop = false, over = '', ...o } = {}) =>
  hd(x, y, s, { ...HABIT, age: old || bishop ? 'old' : 'young', skin: SKA, hair: old || bishop ? WHITE : '#6a4a30', iris: '#4f6f8f', ...o,
    under: o.kneel ? '' : capeB, over: habit(o) + (bishop ? pectoralCross + mitre : '') + over });
const sunEmblem = `<g transform="translate(0,-160)"><circle r="30" fill="url(#haloGlow)"/><circle r="11" fill="${GOLD}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 -15 L3 -24 L-3 -24Z" fill="${GOLD}" transform="rotate(${i * 45})"/>`).join('')}</g>`;
/** Young Thomas Aquinas: a big, quiet Dominican student with dark hair. emblem: the sun on his chest (his attribute). */
export const aquinas = (x, y, s, { emblem = false, over = '', ...o } = {}) =>
  `<g transform="translate(${x},0) scale(1.12,1) translate(${-x},0)">${dominican(x, y, s, { hair: '#2a1c14', skin: '#e8bc96', ...o, over: (emblem ? sunEmblem : '') + over })}</g>`;
const kidAlbert = (x, y, s, o = {}) => hd(x, y, s, { top: '#3f6f8a', trim: '#e6c880', belt: '#5a4634', shoes: '#5a4634', skin: SKA, hair: '#6a4a30', iris: '#4f6f8f', beard: null, age: 'young', ...o });

// ---------------------------------------------------------------- props + set pieces
export const quill = '<g transform="translate(0,-10) rotate(18)"><path d="M0 30 L-3 -10 Q-16 -50 0 -96 Q16 -50 3 -10Z" fill="#f6f0e2"/><path d="M0 30 V-90" stroke="#b8a888" stroke-width="2"/><path d="M0 -96 Q16 -50 3 -10 L0 -10Z" fill="#d8ccb0" opacity=".7"/></g>';
export const crystal = (c = '#8ec5f0') => `<g><circle r="46" fill="url(#haloGlow)" opacity=".7"/><path d="M0 -40 L24 -10 L14 30 L-14 30 L-24 -10Z" fill="${c}"/><path d="M0 -40 L24 -10 L14 30 L0 30Z" fill="${dark(c, 0.25)}" opacity=".6"/><path d="M-24 -10 L0 -4 L24 -10 M0 -4 V30" stroke="#fff" stroke-width="2" opacity=".6" fill="none"/></g>`;
export const leafSprig = (c = '#5a9a4a') => `<g><circle r="46" fill="url(#haloGlow)" opacity=".7"/><path d="M0 34 Q-4 0 0 -36" stroke="${dark(c, 0.3)}" stroke-width="4" fill="none"/>${[[-1, 14], [1, 0], [-1, -14], [1, -28]].map(([sd, ly]) => `<path d="M0 ${ly} Q${sd * 26} ${ly - 18} ${sd * 32} ${ly - 2} Q${sd * 14} ${ly + 8} 0 ${ly}Z" fill="${sd > 0 ? dark(c, 0.15) : c}"/>`).join('')}</g>`;
export const starBurst = (c = '#fff0b0') => `<g><circle r="50" fill="url(#haloGlow)" opacity=".85"/><path d="M0 -34 L9 -10 L34 -10 L14 6 L22 32 L0 16 L-22 32 L-14 6 L-34 -10 L-9 -10Z" fill="${c}"/></g>`;
export const glowCross = (s = 1) => `<g transform="scale(${s})"><circle r="70" fill="url(#haloGlow)" opacity=".9"/><path d="M0 -44 V44 M-26 -16 H26" stroke="${GOLD}" stroke-width="13" stroke-linecap="round"/></g>`;
/** A thought bubble with an ox's head (the classmates' nickname for Thomas). Tail points down-left. */
export const oxBubble = '<g><ellipse cx="0" cy="0" rx="92" ry="74" fill="#fbf7ee"/><circle cx="-62" cy="78" r="15" fill="#fbf7ee"/><circle cx="-84" cy="106" r="8" fill="#fbf7ee"/>'
  + '<path d="M-40 -22 Q-70 -34 -66 -58 Q-48 -44 -34 -36Z M40 -22 Q70 -34 66 -58 Q48 -44 34 -36Z" fill="#e8dcc2"/>'
  + '<path d="M-44 -18 Q-62 -10 -58 4 Q-46 0 -40 -6Z M44 -18 Q62 -10 58 4 Q46 0 40 -6Z" fill="#8a6244"/>'
  + '<path d="M-40 -30 Q0 -46 40 -30 Q44 10 28 34 Q0 50 -28 34 Q-44 10 -40 -30Z" fill="#a87a52"/><ellipse cx="0" cy="28" rx="27" ry="18" fill="#e8c8a8"/>'
  + '<circle cx="-17" cy="-6" r="5" fill="#2b1d14"/><circle cx="17" cy="-6" r="5" fill="#2b1d14"/><ellipse cx="-9" cy="28" rx="3.5" ry="5" fill="#8a5a44"/><ellipse cx="9" cy="28" rx="3.5" ry="5" fill="#8a5a44"/></g>';
const candle = `<g><rect x="-6" y="-44" width="12" height="46" rx="3" fill="#fbf6ea"/><circle cy="-56" r="70" fill="url(#sunGlow)" opacity=".8"/><ellipse cy="-54" rx="5" ry="10" fill="#ffd98a"${M.flick(0.6, 0, 0.6)}/></g>`;
/** A friar's writing desk with books, an inkwell with a quill and a candle. Floor at (x, y). */
export function studyDesk(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-120" y="-150" width="240" height="18" rx="5" fill="#7a5230"/><rect x="-106" y="-132" width="16" height="132" fill="#5a3a22"/><rect x="90" y="-132" width="16" height="132" fill="#5a3a22"/>`
    + `<rect x="-96" y="-168" width="78" height="18" rx="3" fill="#8a3a32"/><rect x="-90" y="-184" width="66" height="16" rx="3" fill="#3f6f8a"/>`
    + `<g transform="translate(20,-150)"><rect x="-12" y="-18" width="24" height="18" rx="4" fill="#2a2430"/><g transform="translate(2,-22) scale(.7)">${quill}</g></g>`
    + `<g transform="translate(80,-150)">${candle}</g></g>`;
}
/** Albert's death (shown since 2026-11-15): the old friar lying on a plain bed in his cell, eyes closed, halo, a small
 * cross on the blanket. Sources give only the place and date (the Dominican convent in Cologne, 15 November 1280), so
 * nothing more is shown. cy = the height of the lying body's centre line. */
function deathbed(cy) {
  const bl = '#5a6a8e';
  return `<rect x="150" y="${cy - 70}" width="26" height="250" rx="6" fill="#5a3a22"/><rect x="170" y="${cy + 84}" width="660" height="44" rx="8" fill="#7a5230"/>`
    + `<rect x="790" y="${cy + 30}" width="24" height="150" rx="6" fill="#5a3a22"/><rect x="186" y="${cy + 60}" width="620" height="34" rx="12" fill="#efe6d2"/>`
    + `<ellipse cx="290" cy="${cy + 44}" rx="128" ry="52" fill="#fbf6ea"/><ellipse cx="300" cy="${cy + 62}" rx="110" ry="26" fill="#d8ccb4" opacity=".6"/>`
    + `<g transform="translate(770,${cy}) rotate(-90)">${albert(0, 0, 1.9, { old: true, halo: true, mood: 'peaceful', armL: 8, armR: 8 })}</g>`
    + `<path d="M420 ${cy - 112} Q600 ${cy - 128} 800 ${cy - 100} L806 ${cy + 92} L410 ${cy + 92} Q400 ${cy} 420 ${cy - 112}Z" fill="${bl}"/>`
    + `<path d="M420 ${cy - 112} Q600 ${cy - 128} 800 ${cy - 100}" stroke="${light(bl, 0.35)}" stroke-width="8" fill="none"/>`
    + `<path d="M470 ${cy - 80} Q480 ${cy} 470 ${cy + 80} M600 ${cy - 90} Q612 ${cy} 600 ${cy + 84} M720 ${cy - 84} Q730 ${cy} 722 ${cy + 86}" stroke="${dark(bl, 0.3)}" stroke-width="4" fill="none" opacity=".5"/>`
    + `<path d="M420 ${cy - 112} Q400 ${cy} 410 ${cy + 92} L440 ${cy + 92} Q432 ${cy} 448 ${cy - 112}Z" fill="#f4ecd8"/>`
    + `<g transform="translate(560,${cy - 6})">${glowCross(0.75)}</g>`;
}
const openBook = (s = 1) => `<g transform="scale(${s})">${book(true)}</g>`;
const grass = (y, c) => ground(y, c, { rim: light(c, 0.2) });
const stoneFloor = (y, c) => ground(y, c, { rim: light(c, 0.15) }) + Array.from({ length: 7 }, (_, i) => `<path d="M${-100 + i * 220} ${y + 6} l-40 400" stroke="${dark(c, 0.2)}" stroke-width="4" opacity=".4"/>`).join('');

// ---------------------------------------------------------------- scenes
// 0 · hook (3D forest at dusk, push-fast): Albert as he is known (bishop, halo, book); he looks to the cross on "faith" and to
// the star on "science", lights up on "mastered both", and turns to the viewer on "This is Saint Albert"
function scene0() {
  const Fa = at(0, 'faith'), Sc = at(0, 'science'), B = at(0, 'One medieval'), C = at(0, 'This is');
  const A = (o) => albert(540, 1350, 2.35, { bishop: true, halo: true, armL: [28, 2, 3], propL: openBook(1), armR: 10, ...o });
  return MID(grass(1240, '#33402a') + tufts(1250, 9, '#46573a', { seed: 4 }))
    + glow(540, 900, 470, 0.85)
    + pop(glowCross(1.25), 190, 760, Fa) + pop(starBurst(), 880, 700, Sc) + pop(leafSprig(), 890, 1010, Sc + 0.4)
    + span(sparkles(12, 150, 930, 620, 1100, { seed: 4 }), B, C + 1.5)
    + seq(A, [[0, { mood: 'happy' }], [Fa, { mood: 'happy', look: [-2.6, -0.4] }], [Sc, { mood: 'happy', look: [2.6, -0.8] }],
      [B, { mood: 'joy', armR: [112, 3, 2.4], propR: quill }], [C, { mood: 'happy', armR: [112, 3, 2.4], propR: quill }]], 0.3)
    + span(rays(540, 780, { op: 0.1 }), C, null, 0.8)
    + motes(14, { x0: 120, x1: 940, y0: 650, y1: 1250, seed: 3 })
    + NEAR(foliage('l', 1680, { color: '#1c2a1e', seed: 6 }) + bokeh(6, { seed: 9, op: [0.2, 0.5] }));
}

// 1 · Germany, around 1200 (pan-r): the knight's son by the Danube watching a bird in wonder → the young Dominican friar
function scene1() {
  const B = at(1, 'he became');
  return FAR(sky(SKIES.day) + sun(840, 560, 56, 320) + clouds(440, { seed: 4, n: 2, op: 0.8 }))
    + BACK(hill(1040, 60, '#8fb87a', 3) + wartburg(300, 1010, 0.5) + hill(1100, 30, '#7aa868', 8))
    + MID(waves(1150, 7, 240, 6, '#6aa6c8', { foam: '#c8e4f0' }) + cottage(900, 1215, 0.7) + tree(90, 1225, 1.0) + tree(1010, 1230, 0.8, '#3f8a48'))
    + grass(1225, '#6a9a52') + flowers(1240, 1330, 12, { seed: 5 }) + butterflies(2, { x0: 560, x1: 900, y0: 880, y1: 1080 })
    + perched(720, 1150, '#c86a4a', 1.5, true)
    + span(seq((o) => kidAlbert(440, 1340, 1.75, { armL: 10, armR: [84, 4, 1.6], look: [2.4, 1.4], ...o }), [[0, { mood: 'awe' }], [at(1, 'around 1200'), { mood: 'joy' }]]), 0, B)
    + span(glow(440, 980, 340, 0.75) + sparkles(10, 300, 600, 760, 1100, { seed: 6 }), B, B + 1.8)
    + span(albert(440, 1345, 2.15, { mood: 'happy', armL: [26, 2, 3], propL: openBook(0.9), armR: 10 }), B, null)
    + NEAR(foliage('r', 1680, { color: '#2a4a2e', seed: 3 }));
}

// 2 · the book of nature (3D forest full of light, drift-l): he looks at each thing as it is named (plants, animals, stars,
// stones), then speaks his own words on science (mouth only on his own line)
function scene2() {
  const Pl = at(2, 'plants'), An = at(2, 'animals'), St = at(2, 'stars'), Sn = at(2, 'stones'), B = at(2, 'Science, he wrote'), C = at(2, 'not simply');
  const A = (o) => albert(520, 1350, 2.25, { armL: [26, 2, 3], propL: openBook(0.95), armR: [26, 2, 3], propR: quill, ...o });
  return MID(grass(1240, '#3e5228') + tufts(1250, 10, '#56703a', { seed: 7 }) + flowers(1250, 1320, 8, { seed: 9, x0: 40, x1: 480 }))
    + pop(leafSprig(), 200, 800, Pl) + `<g${M.in('pop', An, 0.5, 790, 1080)}>${perched(790, 1080, '#6a8ac8', 1.7, true)}</g>`
    + pop(starBurst(), 830, 730, St) + pop(crystal(), 180, 1090, Sn)
    + span(glow(520, 940, 400, 0.7) + rays(520, 900, { op: 0.08 }), C, null, 0.8)
    + seq(A, [[0, { mood: 'happy' }], [Pl, { mood: 'awe', look: [-2.6, 0.4] }], [An, { mood: 'joy', look: [2.4, 1.6] }], [St, { mood: 'awe', look: [2.6, 0.2] }],
      [Sn, { mood: 'surprised', look: [-2.4, 1.6] }], [B, { mood: 'happy' }], [C - 0.15, { mood: 'happy', talk: [C, 99], propR: '', armR: [96, 4, 2] }]], 0.3)
    + motes(14, { x0: 100, x1: 950, y0: 700, y1: 1250, seed: 5, color: '#f4ffc8' })
    + NEAR(bokeh(7, { seed: 12 }));
}

// 3 · Cologne 1248 (dolly): classmates laugh at the quiet student (the Dumb Ox); Thomas looks down, hurt; Albert speaks up
// for him and the laughter turns to surprise; "It was Thomas Aquinas": the sun emblem and halo
function scene3() {
  const Mk = at(3, 'mocked'), Ox = at(3, 'Dumb Ox'), B = at(3, 'Tradition says'), Wh = at(3, 'whole world'), C = at(3, 'It was Thomas');
  const mate = (x, s, o1) => seq((o) => dominican(x, 1275, s, { flip: true, armL: 10, armR: 12, look: [2.2, 0.4], ...o1, ...o }),
    [[0, { mood: 'happy' }], [Mk, { mood: 'joy', armR: [78, 6, 0.8] }], [Wh, { mood: 'surprised', look: [2.6, -0.2] }], [C, { mood: 'awe', look: [2.2, 0] }]]);
  const Th = (o) => aquinas(540, 1350, 2.2, { armL: [26, 2, 3], propL: openBook(0.9), armR: 10, ...o });
  const A = (o) => albert(255, 1345, 1.95, { armL: [26, 2, 3], propL: openBook(0.85), armR: 10, ...o });
  return FAR(sky([[0, '#3a6ab0'], [0.4, '#8ab8e0'], [0.72, '#f4e4c0'], [1, '#f4e4c0']]) + sun(180, 600, 50, 300) + clouds(470, { seed: 8, n: 2, op: 0.75 }))
    + BACK(gothic(560, 1090, 0.72, { wall: '#d8ccb8' }) + hill(1100, 20, '#8aa87a', 5))
    + MID(cloister(1230, { wall: '#e8dcc0', arch: '#cdb890' }) + mate(800, 1.15, { hair: '#8a5a34' }) + mate(940, 1.1, { hair: '#3a2a20', skin: SKIN.s3 }))
    + stoneFloor(1230, '#b8a888')
    + span(glow(540, 940, 420, 0.8) + rays(540, 900, { op: 0.09 }), Wh, null, 0.8)
    + seq(A, [[0, { mood: 'happy', look: [2.4, 0] }], [Mk + 0.4, { mood: 'sad', look: [2.6, 0] }], [B, { mood: 'determined', look: [2.4, 0], armR: [128, 3, 2] }],
      [C, { mood: 'joy', look: [2.2, 0], armR: [128, 3, 2] }]])
    + seq(Th, [[0, { mood: 'happy', look: [-1, 2.4] }], [Mk + 0.2, { mood: 'sad', look: [-1, 2.4] }], [Wh, { mood: 'surprised', look: [-2.6, -0.2] }],
      [C, { mood: 'happy', emblem: true, halo: C + 0.2 }]])
    + span(pop(oxBubble, 730, 590, Ox), 0, Wh)
    + span(sparkles(12, 360, 740, 620, 1050, { seed: 8 }), C, null);
}

// 4 · Regensburg 1260 (pan-r): surprised to be made a bishop; then he sets out on foot, the horse left behind
function scene4() {
  const A = at(4, 'bishop'), Wk = at(4, 'he walked');
  const walk = M.tw([{ at: Wk, dur: 2.6, from: { x: 0 }, to: { x: 270 }, ease: 'power1.inOut' }]);
  return FAR(sky(SKIES.sunrise) + sun(860, 640, 60, 380) + clouds(450, { seed: 5, n: 2, op: 0.7 }))
    + BACK(hill(1050, 60, '#9ab87a', 6) + gothic(830, 1075, 0.36, { wall: '#e0d0b8' }) + cottage(640, 1085, 0.4) + cottage(1000, 1090, 0.36) + hill(1110, 26, '#84a868', 9))
    + MID(tree(60, 1230, 1.1) + horse(190, 1300, 0.78, { cloth: '#6a3a8a' }) + `<path d="M-200 1420 Q300 1290 700 1260 Q900 1250 ${W + 200} 1238 L${W + 200} 1300 Q700 1330 -200 1560Z" fill="#d8c090" opacity=".85"/>`)
    + grass(1235, '#7aa055') + `<path d="M-200 1470 Q300 1330 700 1296 Q900 1284 ${W + 200} 1272 L${W + 200} 1340 Q700 1370 -200 1640Z" fill="#dcc494"/>`
    + tufts(1250, 8, '#8ab060', { seed: 3 })
    + span(albert(470, 1350, 2.15, { old: true, mood: 'surprised', armL: 10, armR: 10 }), 0, A)
    + span(glow(470, 720, 260, 0.8) + sparkles(10, 330, 610, 560, 820, { seed: 5 }), A, A + 1.6)
    + span(`<g${walk}>${seq((o) => albert(470, 1350, 2.15, { bishop: true, armL: 10, armR: [26, 2, 1.2], propR: staff, ...o }),
      [[0, { mood: 'happy' }], [Wk - 0.2, { mood: 'determined', look: [2.6, 0] }], [Wk + 1.6, { mood: 'happy', look: [2.6, 0] }]])}</g>`, A)
    + NEAR(foliage('l', 1690, { color: '#2a4a2e', seed: 8 }));
}

// 5 · Cologne 1274–1280 (tilt-up + rack focus): the human beat: he looks up as Thomas dies and weeps on "grieved"; on the
// climax line he rises, book raised; then his own death: eyes closed, halo
function scene5() {
  const Td = at(5, 'Thomas died'), G = at(5, 'grieved'), B = at(5, 'Then he rose'), C = at(5, 'Albert died');
  const K = (o) => albert(470, 1290, 2.15, { old: true, kneel: true, armL: 26, armR: 26, ...o });
  const S = (o) => albert(470, 1350, 2.2, { old: true, ...o });
  return FAR(sky(SKIES.deep, { stars: 26, seed: 6 }) + span(rays(560, 620, { op: 0.1 }), B, null, 1))
    + BACK(`<rect x="-200" y="200" width="${W + 400}" height="1100" fill="#3a3046"/><path d="M640 1000 V620 Q790 470 940 620 V1000Z" fill="#20203c"/><path d="M640 1000 V620 Q790 470 940 620 V1000" stroke="#5a4e68" stroke-width="16" fill="none"/>`
      + sparkles(8, 670, 910, 600, 900, { seed: 3 }) + span(glow(790, 760, 230, 0.8) + aquinas(790, 1010, 1.0, { emblem: true, halo: true, mood: 'tender', armL: 10, armR: 10 }), Td, null, 0.9)
      + span(pop(starBurst(), 800, 560, B + 0.3), B, null))
    + MID(studyDesk(150, 1250, 1.15))
    + stoneFloor(1240, '#4a3e52')
    + span(seq(K, [[0, { mood: 'worried' }], [Td, { mood: 'worried', look: [2.4, -2.2] }], [G - 0.2, { mood: 'sad', tears: G }]]), 0, B)
    + span(glow(470, 900, 420, 0.8), B, null, 0.7)
    + span(S({ mood: 'determined', armR: 10, armL: [118, 3, 2.4], propL: openBook(0.95) }), B, C, 0.7)
    + span(deathbed(1140), C, null, 0.8)
    + span(sparkles(14, 250, 700, 560, 1100, { seed: 9 }), C + 0.4, null)
    + motes(10, { x0: 150, x1: 900, y0: 700, y1: 1250, seed: 8 })
    + NEAR(bokeh(6, { seed: 15, op: [0.2, 0.5] }));
}

// 6 · Rome 1931 (pull): the halo comes on "a saint"; joy on "Doctor of the Church"; he looks down at his book on "read
// nature like a book" and closes his eyes in a smile on "found God"
function scene6() {
  const Sa = at(6, 'a saint'), Dc = at(6, 'Doctor'), B = at(6, 'He read'), F = at(6, 'found God');
  const A = (o) => albert(540, 1350, 2.2, { bishop: true, halo: Sa, armL: [28, 2, 3], propL: openBook(1), armR: [26, 2, 3], propR: crozier, ...o });
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + sun(540, 760, 70, 500) + rays(540, 760, { op: 0.11 }))
    + BACK(basilica(540, 1130, 1.25) + clouds(520, { seed: 6, n: 2, op: 0.5, color: '#ffe8c0' }))
    + MID(crowd(1235, 14, { flags: [['#ffe14a', '#ffffff', '#ffe14a']] }))
    + ground(1250, '#7a4a3a', { rim: '#c8865a' })
    + glow(540, 900, 430, 0.9)
    + seq(A, [[0, { mood: 'happy' }], [Dc, { mood: 'joy' }], [B, { mood: 'happy', look: [-1.8, 2.4] }], [F, { mood: 'tender' }]])
    + span(sparkles(10, 300, 780, 560, 900, { seed: 7 }), Sa + 0.2, B)
    + pop(leafSprig(), 200, 880, B + 0.3) + pop(starBurst(), 860, 800, B + 0.9) + pop(glowCross(1.1), 250, 640, F)
    + span(sparkles(14, 200, 880, 600, 1100, { seed: 4 }), F, null)
    + NEAR(bokeh(7, { seed: 17 }));
}

// 7 · feast portrait (arc): Albert with mitre, halo, book and quill before a Gothic church at dusk; a warm closed-eye smile
// on "Saint Albert the Great, pray for us"
function scene7() {
  const B = at(7, 'Saint Albert the Great, pray');
  const A = (o) => albert(540, 1350, 2.35, { bishop: true, halo: true, armL: [28, 2, 3], propL: openBook(1), armR: [112, 3, 2.4], propR: quill, ...o });
  return FAR(sky(SKIES.dusk, { stars: 20, seed: 5 }) + rays(540, 820, { op: 0.12 }))
    + BACK(hill(1080, 44, '#5a4a6a', 4) + gothic(830, 1110, 0.42, { wall: '#b8a0a8', win: '#ffd98a' }))
    + MID(hill(1170, 18, '#6a5a6a', 7) + tree(80, 1240, 0.9, '#3a5a4a'))
    + ground(1240, '#4a4458', { rim: '#8a7a8a' })
    + glow(540, 900, 470, 0.9)
    + pop(leafSprig(), 190, 900, 0.8) + pop(starBurst(), 200, 660, at(7, 'He is the patron')) + pop(crystal(), 900, 700, at(7, 'scientists'))
    + seq(A, [[0, { mood: 'happy' }], [B, { mood: 'tender' }]])
    + span(sparkles(14, 240, 840, 600, 1100, { seed: 11 }), B)
    + NEAR(foliage('l', 1680, { color: '#1c2a1e', seed: 6 }) + bokeh(6, { seed: 9, op: [0.2, 0.5] }));
}

export const STORY = {
  slug: 'st_albert_the_great', name: 'St_Albert_the_Great',
  bg3d: './albert_the_great.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'roch.bg3d.js': './roch_dog.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { albert: { voice: 'bm_george', speed: 0.92 } },
  thumb_hook: 'The saint of science', thumb_title: 'St. Albert the Great', thumb_scene: 7, thumb_t: 5, thumb_shift: 40,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [1024, 1250, 'r']],
  fix: {
    'ˈækwɪnəz': 'əkwˈaɪnəs',                       // Aquinas -> uh-KWY-nus
    'dɪoʊsˈiːz': 'dˈaɪəsɪs',                        // diocese -> DY-uh-sis
    'hiː ɹˈiːd nˈeɪtʃɚ': 'hiː ɹˈɛd nˈeɪtʃɚ',        // read (past tense) -> red
    'noʊvˈɛmbɚ fˈɪftiːn': 'noʊvˈɛmbɚ fɪftˈiːnθ',    // November 15 -> November fifteenth
  },
  scenes: [
    { kicker: 'GERMANY · THE 1200s', title: 'Faith or Science? Both.', art: scene0, bg3d: 'woodsDusk', cam: { move: 'push-fast', oy: 1050 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Some say faith and science are enemies.', 'One medieval friar mastered both.', 'This is Saint Albert the Great.'] },
    { kicker: 'LAUINGEN · AROUND 1200', title: 'A Knight\'s Son', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Born in Germany around 1200, he became a Dominican friar.'] },
    { kicker: 'THE BOOK OF NATURE', title: 'He Studied Everything', art: scene2, bg3d: 'woodsLight', cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['He studied everything: plants, animals, stars and stones.', 'Science, he wrote, is',
        { text: 'not simply to accept what we are told, but to inquire into the causes of natural things.', who: 'albert' }] },
    { kicker: 'COLOGNE · 1248', title: 'The Dumb Ox', art: scene3, cam: { move: 'dolly', amt: 0.08, ox: 540, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['In Cologne, classmates mocked a quiet student as the Dumb Ox.', 'Tradition says Albert replied that the whole world would hear this ox.', 'It was Thomas Aquinas.'] },
    { kicker: 'REGENSBURG · 1260', title: 'A Bishop on Foot', art: scene4, cam: 'pan-r',
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['Made a bishop in 1260, he walked his whole diocese on foot.'] },
    { kicker: 'COLOGNE · 1274–1280', title: 'His Last Defense', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['In 1274, Thomas died, and the old teacher grieved.',
        { text: 'Then he rose once more, to defend his student\'s teaching.', speed: 0.85 },
        'Albert died in Cologne in 1280.'] },
    { kicker: 'ROME · 1931', title: 'Doctor of the Church', art: scene6, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['In 1931, Pope Pius XI named him a saint and Doctor of the Church.', 'He read nature like a book, and found God on every page.'] },
    { kicker: 'FEAST · NOVEMBER 15', title: 'St. Albert the Great', art: scene7, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 15. He is the patron saint of scientists.', 'Saint Albert the Great, pray for us.'] },
  ],
};
