// St. John Berchmans (1599-1621), Jesuit scholastic (whole life). Feast: November 26 (Society of Jesus; August 13 in the Roman Martyrology).
// All-3D backgrounds (john_berchmans.bg3d.js: set-ups of anglia() from edmund_last_stand.bg3d.js and roma() from gelasius.bg3d.js);
// cam3d; characters hd(); Ricks Clips motion (cam.path travel, instant pose swaps, no sway).
// Sources: Catholic Encyclopedia (New Advent) "St. John Berchmans": born at Diest in Brabant, 13 March 1599; "When he was hardly seven
// years old, he was accustomed to rise early and serve two or three Masses"; his family was "decidedly opposed" to his entering the
// Jesuits; novitiate at Mechelen 24 September 1616; went to Rome "three hundred leagues on foot, carrying a wallet on his back";
// "If I do not become a saint when I am young," he used to say "I shall never become one"; "My penance is to live the common life";
// chosen for a philosophy disputation (August 1621), then "a violent fever"; died 13 August 1621, aged 22 years and five months; a
// great crowd came for several days to see his body and invoke him; beatified 1865, canonized 1888; statues show him "holding his
// crucifix, his book of rules, and his rosary". Wikipedia "John Berchmans": son of a shoemaker, oldest of five; his father threatened
// to end all financial support; Roman College; died of fever; remains at Sant'Ignazio, heart at Leuven; canonized 15 January 1888;
// Grand Coteau, Louisiana, 1866: he appeared to the dying novice Mary Wilson, who was healed; patron of altar servers, students,
// Jesuit scholastics; feast 26 November (Jesuits). Catholicism.org / Bible Hub: he died holding (at his request) a crucifix, a
// rosary and the Rule. RSCJ "Miracle at Grand Coteau": the healing was the miracle accepted for his canonization by Leo XIII.
// The voiced quote is his own saying (New Advent), in plain modern English. His deathbed words vary between sources: not voiced.
// Exported for later reels: johnB, shoemaker, altarBoy, jesuitStudent, ruleBook, threeTreasures, shoe, purse, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, book, rosary, beam, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import fs from 'fs';
import { speedLines, burst, squash, mapCard, pin, route } from '../cartoonfx.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';
import { popeBenedict, roman1750, candle } from './leonard_of_port_maurice_colosseum.mjs';
import { crucifixHand, homeAltar } from './miguel_pro_firing_squad.mjs';
import { sacredHeartSister } from './duchesne_sugar_creek.mjs';
import { friary } from './kolbe.mjs';

const SLUG = 'st_john_berchmans';
const at = wordTimes(SLUG);
let TIM = null;
try { TIM = JSON.parse(fs.readFileSync(new URL(`../work/${SLUG}/timings.json`, import.meta.url), 'utf8')); } catch { /* not narrated yet */ }
/** [start, end] of line i of a scene, in seconds from the scene start (flow lead-ins included). */
const lineSpan = (sc, i, a = 0.3, b = 999) => { const se = TIM?.[sc]?.sentences?.[i]; const L = sc === 0 ? 0.3 : 0.1; return se ? [+(L + se.start).toFixed(2), +(L + se.end).toFixed(2)] : [a, b]; };
// pose changes swap instantly (any fade shows two arms and two props at once)
let SNAP = 0;
const seq = (draw, steps) => {
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

// ================================================================ props
/** His book of rules: a small dark-red book with a gold cross on the cover. */
export const ruleBook = '<g transform="translate(0,-4) rotate(-8)"><rect x="-17" y="-24" width="34" height="44" rx="3" fill="#7a2a2e"/><rect x="11" y="-24" width="6" height="44" fill="#5a1e22"/>'
  + `<path d="M-3 -14 V8 M-10 -6 H4" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/><rect x="-17" y="18" width="34" height="3" fill="#f6efe0"/></g>`;
/** His three treasures for the left hand: the rule book with the rosary hanging from it. */
export const threeTreasures = `<g>${ruleBook}<g transform="translate(10,16) scale(.9)">${rosary()}</g></g>`;
const crucifix = crucifixHand(1.15);
/** A leather shoe (the father's trade), held in the hand. */
export const shoe = '<g transform="translate(0,-8)"><path d="M-30 6 Q-32 -16 -14 -18 Q-4 -18 2 -8 Q18 -6 30 0 Q36 6 30 10 L-28 10Z" fill="#6a4228"/>'
  + '<path d="M-30 8 H32" stroke="#2a1a12" stroke-width="5" stroke-linecap="round"/><path d="M-12 -14 L-4 -6" stroke="#f0dcb8" stroke-width="2"/></g>';
/** A small money purse with a coin peeking out. */
export const purse = `<g transform="translate(0,-14)"><path d="M-18 -10 Q-26 24 0 26 Q26 24 18 -10Z" fill="#8a5a2e"/><path d="M-18 -10 Q0 -18 18 -10" stroke="#5a3a1e" stroke-width="4" fill="none"/>`
  + `<ellipse cx="6" cy="-14" rx="8" ry="4" fill="${GOLD}"/><path d="M-6 -16 Q-2 -26 4 -20" stroke="#5a3a1e" stroke-width="3" fill="none"/></g>`;
/** A shoemaker's bench with a last and a hammer (base centre at 0,0, a MID or near card). */
const bench = (s = 1) => `<g transform="scale(${s})"><ellipse cy="6" rx="120" ry="12" fill="#140c14" opacity=".25"/><rect x="-110" y="-70" width="220" height="16" rx="4" fill="#8a5e3a"/>`
  + '<rect x="-100" y="-56" width="14" height="56" fill="#6a4428"/><rect x="86" y="-56" width="14" height="56" fill="#5a3a22"/>'
  + `<g transform="translate(-40,-70)">${shoe}</g><g transform="translate(40,-74) scale(.9)">${shoe}</g>`
  + '<g transform="translate(80,-76) rotate(-30)"><rect x="-3" y="-30" width="6" height="34" fill="#7a5432"/><rect x="-10" y="-36" width="20" height="9" rx="2" fill="#5a5a62"/></g></g>';
/** White collar of a Jesuit cassock (body space). */
const collar = '<path d="M-10 -213 L0 -201 L10 -213Z" fill="#f6f2ea"/>';
/** A leather apron (body space). */
const apron = '<path d="M-26 -186 L26 -186 L32 -40 L-32 -40Z" fill="#8a5e3a"/><path d="M-26 -186 L26 -186 L27 -176 L-27 -176Z" fill="#6a4428"/>';
/** An altar server's white surplice over a red cassock (body space, over). */
const surplice = '<path d="M-40 -196 Q0 -186 40 -196 L54 -96 Q0 -80 -54 -96Z" fill="#fbf8f0"/><path d="M-54 -96 Q0 -80 54 -96" stroke="#e0d8c8" stroke-width="4" fill="none"/>';

// ================================================================ characters
const SKJ = '#efc6a2';
/** St. John Berchmans: a young Flemish Jesuit; black cassock with a sash and a white collar, light-brown hair, clean-shaven.
 * lay: the plain clothes of a Flemish boy or student (before he entered). */
export const johnB = (x, y, s, { lay = false, over = '', ...o } = {}) => hd(x, y, s, lay
  ? { top: '#4e6a94', trim: '#e8dcc0', mantle: null, belt: '#4a3424', skin: SKJ, hair: '#8a5e36', hairStyle: 'short', beard: null, age: 'young', iris: '#4a5a6a', shoes: '#3a2a1e', ...o, over }
  : { top: '#2a2630', plain: true, belt: '#1a1620', trim: '#1a1620', mantle: null, skin: SKJ, hair: '#8a5e36', hairStyle: 'short', beard: null, age: 'young', iris: '#4a5a6a',
    shoes: '#1e1a20', ...o, over: collar + over });
/** His father, John Charles Berchmans, a shoemaker of Diest: leather apron, brown beard. */
export const shoemaker = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#7a6a4a', plain: true, trim: '#5a4a32', mantle: null, belt: '#4a3424', skin: '#e6b896',
  hair: '#5a3e28', hairStyle: 'short', beard: '#5a3e28', beardStyle: 'short', age: 'mid', iris: '#4a3424', shoes: '#4a3424', ...o, over: apron + over });
/** An altar server: red cassock and white surplice. */
export const altarBoy = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#a8282e', plain: true, trim: '#8a1e24', mantle: null, belt: false, skin: '#d9a47e',
  hair: '#3a2a1e', hairStyle: 'short', beard: null, age: 'young', iris: '#3a2a20', shoes: '#2a2020', ...o, over: surplice + over });
const JS = [['#d9a47e', '#3a2a1e'], ['#e2b48f', '#6a4a2a'], ['#c48a5f', '#2a1c12']];
/** A fellow Jesuit student in Rome (black cassock, collar). */
export const jesuitStudent = (x, y, s, i = 0, { over = '', ...o } = {}) => hd(x, y, s, { top: '#2e2a34', plain: true, belt: '#1a1620', trim: '#1a1620', mantle: null,
  skin: JS[i % 3][0], hair: JS[i % 3][1], hairStyle: i % 3 === 1 ? 'curly' : 'short', beard: null, age: 'young', iris: '#3a2a20', shoes: '#1e1a20', ...o, over: collar + over });
/** A professor: an older priest in a cassock with a grey beard. */
const professor = (x, y, s, o = {}) => hd(x, y, s, { top: '#3a3440', plain: true, belt: '#1a1620', trim: '#1a1620', mantle: '#4a3a4a', lining: '#6a5a6a', skin: '#e2b48f',
  hair: '#bdb6ac', hairStyle: 'old', beard: '#cfc8bc', beardStyle: 'full', age: 'old', iris: '#3a2a20', shoes: '#1e1a20', ...o, over: collar });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  jHook:    { key: '#ffc090', from: 'r', tint: '#ffcaa8', amt: 0.14, rim: '#ffd0a0', rimOp: 0.85 },
  jDiest:   { key: '#ffd8a0', from: 'l', tint: '#ffe8c8', amt: 0.08, rim: '#ffe8c0', rimOp: 0.8 },
  jMech:    { key: '#ffe0b0', from: 'r', tint: '#ece4dc', amt: 0.1, rim: '#fff0d8', rimOp: 0.75 },
  jCollege: { key: '#ffe0b0', from: 'r', tint: '#fff0dc', amt: 0.07, rim: '#fff4e0', rimOp: 0.75 },
  jFever:   { key: '#ffe0b8', from: 'top', tint: '#a8a0c0', amt: 0.2, rim: '#ffe8c8', rimOp: 0.9 },
  jCoteau:  { key: '#ffe8c8', from: 'top', tint: '#9aa0d0', amt: 0.24, rim: '#ffe8c0', rimOp: 0.9 },
  jCanon:   { key: '#ffd8a0', from: 'l', tint: '#ffe0b8', amt: 0.1, rim: '#ffe4c0', rimOp: 0.85 },
  jGlory:   { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `jblit${++LID}`, d = 5;
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
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[LIGHT[mode].from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.97 ~1312, 0.95 ~1322, 0.92 ~1310,
// 0.78 ~1262, MID 0.75 ~1240-1250.
const SAINT = { propR: crucifix, propL: threeTreasures, armR: [36, 2, 3], armL: [30, 2, 3] };

// 0 · SHOT "Crowds of Romans waited for days beside one student…": dusk in Rome; John stands big with his halo, cross, rule and
//     rosary; behind him Romans with candles file toward the lit church.  SHOT "This is Saint John Berchmans.": he looks at the viewer.
const J0 = [420, 1345, 2.45];
function scene0() {
  const cr = at(0, 'Crowds'), tw = at(0, 'twenty-two'), ti = at(0, 'This is'), sj = at(0, 'Saint John');
  const mourner = (k) => { const x = 600 + k * 125, y = 1262, s = 1.35;
    return `<g${M.tw([{ at: 0, dur: 7, from: { x: -180 }, to: { x: 60 }, ease: 'none' }])}>` + lit(castShadow(x, y, s, 'jHook')
      + roman1750(x, y, s, k, { mood: 'peaceful', look: [2, 0.6], armR: [40, 2, 3], propR: candle, armL: -20 }), 'jHook') + '</g>'; };
  return layer(0.78, [4, 3, 2, 1, 0].map(mourner).join(''))
    + glow(780, 900, 420, 0.35)
    + speedLines(J0[0] + 120, 820, { at: cr, dur: 0.7, r0: 300, op: 0.35, color: '#fff4d8', seed: 3 })
    + lit(castShadow(...J0, 'jHook') + seq((op) => johnB(...J0, { halo: true, ...SAINT, ...op }),
      [[0, { mood: 'peaceful', look: [1.6, -0.6] }], [tw, { mood: 'tender', look: [1.2, 0] }], [ti - 0.1, { mood: 'happy', look: [0, 0] }], [sj + 0.6, { mood: 'tender', look: [0, 0] }]]), 'jHook')
    + NEAR(bokeh(7, { seed: 12, op: [0.2, 0.45] }));
}

// 1 · SHOT "He was a shoemaker's son, and at seven he served two or three Masses every morning.": Diest, morning; his father works
//     at the bench; little John runs to the altar and kneels with a candle; the bell sparkles.
const F1 = [300, 1322, 2.15], K1 = [560, 1345, 1.45], AL = [800, 1250];
function scene1() {
  const sh = at(1, "shoemaker's"), se = at(1, 'served'), tw = at(1, 'two or three'), mo = at(1, 'every morning');
  return MID(lit(`<g transform="translate(${AL[0]},${AL[1]})"><g opacity="0"${M.tw([{ at: se - 0.1, dur: 0.45, from: { opacity: 0, scale: 0.3, y: 40 }, to: { opacity: 1, scale: 1, y: 0 }, ease: 'back.out(2)', origin: '0 0' }])}>${homeAltar(1.5)}</g></g>`, 'jDiest'))
    + `<g opacity="0"${fadeIn(se, 0.5)}>${glow(AL[0], 1000, 260, 0.5)}</g>`
    + layer(0.95, lit(castShadow(...F1, 'jDiest') + `<g transform="translate(${F1[0] - 10},${F1[1]})">${bench(1.15)}</g>`
      + seq((op) => shoemaker(...F1, { armL: [20, 2, 3], ...op }), [[0, { mood: 'happy', look: [2.2, 0.4], armR: [60, 3, 2], propR: shoe }], [sh + 0.4, { mood: 'tender', look: [2.4, 0.8], armR: [30, 2, 3], propR: shoe }]]), 'jDiest'))
    + lit(castShadow(...K1, 'jDiest') + walk(0.1, 0.8, -160, `<g${squash(se + 0.1, K1[0], K1[1], 0.08)}>` + seq((op) => johnB(...K1, { lay: true, top: '#5a7ab0', ...op }),
      [[0, { mood: 'joy', look: [2.2, 0], armL: [14, 2, 3], armR: [14, 2, 3] }], [se, { mood: 'happy', kneel: true, look: [2.4, -0.8], armR: [40, 2, 3], propR: candle, armL: -20 }],
        [mo, { mood: 'peaceful', kneel: true, armR: [40, 2, 3], propR: candle, armL: -20 }]]) + '</g>'), 'jDiest')
    + [0, 1, 2].map((k) => `<g opacity="0"${M.tw([{ at: tw + k * 0.35, dur: 0.15, from: { opacity: 0, scale: 0.4 }, to: { opacity: 1, scale: 1 }, origin: `${AL[0] - 60 + k * 60} 880` }, { at: tw + k * 0.35 + 0.5, dur: 0.4, to: { opacity: 0 } }])}>`
      + `<circle cx="${AL[0] - 60 + k * 60}" cy="880" r="34" fill="url(#sunGlow)"/><path d="M${AL[0] - 60 + k * 60} 862 v36 M${AL[0] - 72 + k * 60} 874 h24" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/></g>`).join('')
    + NEAR(foliage('l', 1650, { color: '#3e4a2a', seed: 6 }) + bokeh(5, { seed: 8, op: [0.15, 0.35] }));
}

// 2 · SHOT "At seventeen, he chose the Jesuits, but his father said no.": Mechelen; John (in lay clothes) asks, hand on heart; his
//     father shakes his head.  SHOT "His father threatened to cut him off.": the father holds up the purse and pulls it away; John
//     worried (the human beat).  SHOT "John joined them anyway.": John in the black cassock, determined; sparkles.
const J2 = [400, 1345, 2.3], F2 = [740, 1312, 2.2];
function scene2() {
  const je = at(2, 'Jesuits'), no = at(2, 'said no'), th = at(2, 'threatened'), cu = at(2, 'cut him off'), jo = at(2, 'John joined');
  return layer(0.97, lit(castShadow(...F2, 'jMech') + seq((op) => shoemaker(...F2, { flip: true, look: [2.4, 0.4], armL: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', armR: [20, 2, 3] }], [no - 0.1, { mood: 'stern', armR: [104, 22, 0.5] }], [th, { mood: 'stern', armR: [120, 3, 2], propR: purse }],
        [cu, { mood: 'stern', armR: [20, 2, 3], armL: [16, 2, 3] }], [jo, { mood: 'sad', look: [2.4, 0.8], armR: [10, 2, 3] }]]), 'jMech'))
    + lit(castShadow(...J2, 'jMech') + `<g${squash(jo, J2[0], J2[1], 0.08)}>` + seq((op) => johnB(...J2, { look: [2.4, -0.4], ...op }),
      [[0, { lay: true, mood: 'happy', armR: [74, 3, 2.4], armL: [14, 2, 3] }], [je + 0.2, { lay: true, mood: 'happy', armR: [-30, 2, 3], armL: [14, 2, 3] }],
        [no + 0.2, { lay: true, mood: 'surprised', armR: [14, 2, 3], armL: [14, 2, 3] }], [th, { lay: true, mood: 'worried', armR: [14, 2, 3], armL: [14, 2, 3] }],
        [jo, { mood: 'determined', armR: [36, 2, 3], propR: crucifix, armL: [30, 2, 3], propL: ruleBook }]]) + '</g>', 'jMech')
    + `<g opacity="0"${fadeIn(jo, 0.3)}>${sparkles(16, 220, 620, 640, 1200, { seed: 17 })}${glow(J2[0], 900, 260, 0.45)}</g>`
    + NEAR(foliage('r', 1640, { color: '#3e4a2a', seed: 9 }));
}

// 3 · SHOT "He walked hundreds of miles to Rome.": a map from Brabant over the Alps to Rome; the route draws on.
//     SHOT "He used to say:" + his own words: the Roman College; he speaks, an open book in his hand; two fellow students listen.
const DIEST = [340, 440], ROME = [560, 1000];
const ITALY = 'M330 470 C420 430 560 430 700 470 L725 560 L700 640 L760 760 L830 880 L900 1010 L975 1105 L1015 1110 L990 1170 L1062 1258 L1048 1292 L980 1262 L920 1250 L880 1300 L902 1382 L862 1462 L800 1442 L822 1362 L760 1250 L700 1180 L620 1080 L540 1000 L470 900 L430 820 L400 740 L330 652 L262 640 L250 560 Z'
  + ' M690 1520 L905 1494 L862 1606 Z M300 990 C340 960 372 1000 366 1060 C360 1130 318 1150 296 1110 C280 1070 280 1010 300 990 Z M318 820 C342 806 356 840 348 880 C340 920 318 916 312 880 C306 850 306 830 318 820 Z';
const NORTH = 'M-400 -400 H1480 V470 L760 470 C700 450 420 440 330 470 L-400 470 Z';
const alps = [400, 470, 540, 610, 680].map((x, k) => `<path d="M${x - 34} ${520 - (k % 2) * 8} L${x} ${470 - (k % 2) * 14} L${x + 34} ${520 - (k % 2) * 8}Z" fill="#b8a888"/><path d="M${x - 10} ${484 - (k % 2) * 10} L${x} ${470 - (k % 2) * 14} L${x + 10} ${484 - (k % 2) * 10}Z" fill="#fbf8f0"/>`).join('');
const churchIcon = '<g transform="scale(1.1)"><circle r="34" fill="url(#sunGlow)"/><rect x="-16" y="-10" width="32" height="26" fill="#e8d4b0" stroke="#9a7a48" stroke-width="3"/><path d="M-6 -10 V-30 H6 V-10" fill="#e8d4b0" stroke="#9a7a48" stroke-width="3"/><path d="M0 -42 V-30 M-5 -37 H5" stroke="#7a2a2a" stroke-width="3"/></g>';
const domeIcon = '<g transform="scale(1.1)"><circle r="34" fill="url(#sunGlow)"/><rect x="-22" y="0" width="44" height="16" fill="#e8d4b0" stroke="#9a7a48" stroke-width="3"/><path d="M-16 0 A16 16 0 0 1 16 0Z" fill="#e8d4b0" stroke="#9a7a48" stroke-width="3"/><path d="M0 -16 V-28 M-5 -23 H5" stroke="#7a2a2a" stroke-width="3"/></g>';
const J3 = [400, 1345, 2.35];
function scene3() {
  const wa = at(3, 'walked'), us = at(3, 'He used to say'), [q0, q1] = lineSpan(3, 2, 4, 9), sa = at(3, 'saint');
  const map = mapCard({ sea: 'M-400 -400 H1480 V2320 H-400 Z', land: NORTH + ' ' + ITALY, extra: alps + '<rect x="-400" y="-400" width="1880" height="700" fill="#2a1c10" opacity=".45" filter="url(#blur14)"/>' })
    + pin(DIEST[0], DIEST[1], 0.15, '', '#2f4a7a') + route([DIEST, [470, 560], [500, 760], ROME], wa, 2.6) + pin(ROME[0], ROME[1], wa + 2.5, domeIcon, '#f2a020');
  const college = MID(lit(friary(640, 1244, 0.95, { wall: '#e8d8b8', roof: '#9a5a3a', win: '#fff0c0' }), 'jCollege'))
    + layer(0.92, lit([[700, 0, true], [860, 1, true]].map(([x, i, fl]) => castShadow(x, 1310, 1.95, 'jCollege') + seq((op) => jesuitStudent(x, 1310, 1.95, i, { flip: fl, look: [2.4, 0.2], armL: [20, 2, 3], ...op }),
      [[0, { mood: 'happy', armR: [20, 2, 3] }], [sa, { mood: 'surprised', armR: [20, 2, 3] }], [sa + 0.8, { mood: 'happy', armR: [20, 2, 3] }]])).join(''), 'jCollege'))
    + lit(castShadow(...J3, 'jCollege') + seq((op) => johnB(...J3, { talk: [q0, q1], look: [2.2, -0.2], armL: [40, 2, 3], propL: book(true), ...op }),
      [[0, { mood: 'happy', armR: [30, 2, 3] }], [q0 + 0.3, { mood: 'determined', armR: [146, 3, 2] }], [sa, { mood: 'happy', armR: [146, 3, 2] }]]), 'jCollege')
    + `<g opacity="0"${fadeIn(sa, 0.5)}>${glow(J3[0], 700, 260, 0.5)}${sparkles(12, 240, 620, 560, 900, { seed: 31 })}</g>`;
  return until(us, layer(1, map)) + from(us, college);
}

// 4 · SHOT "After a great debate, a fever struck.": John speaks before professors and students, then sways, worried; the listeners
//     are gone.  SHOT the climax line: John kneels in peace in a beam of light with his cross, rosary and rule; the halo appears.
const J4 = [420, 1345, 2.35];
function scene4() {
  const de = at(4, 'debate'), fe = at(4, 'fever'), hd0 = at(4, 'He died'), ru = at(4, 'rule book');
  const listeners = layer(0.92, lit(castShadow(720, 1310, 2.0, 'jFever') + professor(720, 1310, 2.0, { flip: true, mood: 'surprised', look: [2.4, 0], armL: [20, 2, 3], armR: [60, 3, 2] })
      + castShadow(880, 1310, 1.9, 'jFever') + jesuitStudent(880, 1310, 1.9, 2, { flip: true, mood: 'awe', look: [2.4, 0], armL: [20, 2, 3], armR: [20, 2, 3] }), 'jFever'));
  return until(fe, listeners)
    + `<g opacity="0"${M.tw([{ at: hd0 - 0.2, dur: 0.8, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(J4[0] - 100, J4[0] + 100, J4[0] - 240, J4[0] + 240, 1380, 0.75)}${glow(J4[0], 880, 340, 0.55)}</g>`
    + lit(castShadow(...J4, 'jFever') + `<g${squash(fe, J4[0], J4[1], 0.08)}>` + seq((op) => johnB(...J4, op),
      [[0, { mood: 'happy', look: [2.4, 0], armR: [118, 4, 2], armL: [40, 2, 3], propL: book(true) }], [de + 0.3, { mood: 'joy', look: [2.4, 0], armR: [70, 3, 2], armL: [40, 2, 3], propL: book(true) }],
        [fe, { mood: 'worried', look: [0.4, 1.4], armR: [10, 2, 3], armL: [14, 2, 3] }], [hd0, { mood: 'peaceful', kneel: true, ...SAINT }],
        [ru + 0.4, { mood: 'peaceful', kneel: true, halo: ru + 0.4, ...SAINT }]]) + '</g>', 'jFever')
    + `<g opacity="0"${fadeIn(ru, 0.8)}>${sparkles(16, 220, 640, 620, 1180, { seed: 40 })}</g>`;
}

// 5 · SHOT "Years later, a dying nun in Louisiana prayed to him.": night under the oaks at the convent school; a young sister kneels,
//     weak.  SHOT "He appeared, and she was healed.": light breaks; John appears on a cloud in glory; she looks up in awe, then
//     rises with joy (the miracle; a burst of light).
const N5 = [380, 1345, 2.2], J5 = [760, 1060, 1.5];
function scene5() {
  const ap = at(5, 'He appeared'), he = at(5, 'healed'), pr = at(5, 'prayed');
  return MID(lit(friary(700, 1244, 0.95, { wall: '#f2ece0', roof: '#5a5a66', win: '#ffd890' }), 'jCoteau'))
    + layer(0.9, `<g opacity="0"${M.tw([{ at: ap - 0.1, dur: 0.9, from: { opacity: 0, y: -260 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>`
      + beam(J5[0] - 90, J5[0] + 90, J5[0] - 220, J5[0] + 220, 1380, 0.6) + glow(J5[0], 760, 320, 0.85)
      + `<g transform="translate(${J5[0]},${J5[1] + 6})"><ellipse rx="130" ry="30" fill="#fff8ec" opacity=".9"/><ellipse cx="-56" cy="-10" rx="56" ry="26" fill="#fffdf6"/><ellipse cx="52" cy="-12" rx="60" ry="28" fill="#fffdf6"/></g>`
      + `<g${M.bob(6, 3.4)}>${lit(johnB(...J5, { halo: true, mood: 'tender', look: [-2, 0.6], flip: true, ...SAINT, armR: [60, 3, 2.4] }), 'jCoteau')}</g></g>`)
    + lit(castShadow(...N5, 'jCoteau') + `<g${squash(he + 0.1, N5[0], N5[1], 0.08)}>` + seq((op) => sacredHeartSister(...N5, op),
      [[0, { mood: 'sad', kneel: true, look: [0.6, 1.6], ...PRAY }], [pr, { mood: 'peaceful', kneel: true, ...PRAY }], [ap + 0.3, { mood: 'awe', kneel: true, look: [2.4, -2], armR: [60, 3, 2], armL: -20 }],
        [he, { mood: 'joy', look: [2.4, -1.6], armR: [130, 4, 2], armL: [110, 4, 2] }]]) + '</g>', 'jCoteau')
    + burst(600, 560, 340, he) + `<g opacity="0"${fadeIn(he, 0.5)}>${sparkles(18, 180, 700, 560, 1200, { seed: 51 })}</g>`;
}

// 6 · SHOT "Then Pope Leo XIII declared him a saint.": golden Rome; the Pope raises his hand.  SHOT the quotable line: John comes down
//     in glory on a cloud over Rome, smiling, his cross raised.
const P6 = [760, 1312, 2.15], J6 = [380, 1000, 1.55];
function scene6() {
  const de = at(6, 'declared'), sm = at(6, 'He never'), gl = at(6, 'great love');
  return layer(0.97, lit(castShadow(...P6, 'jCanon') + seq((op) => popeBenedict(...P6, { flip: true, look: [2.4, 0.2], armL: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', armR: [20, 2, 3] }], [de, { mood: 'joy', armR: [116, 4, 2] }]]), 'jCanon'))
    + `<g opacity="0"${fadeIn(de, 0.4)}>${glow(P6[0] - 80, 820, 200, 0.5)}${sparkles(10, 560, 820, 700, 960, { seed: 61 })}</g>`
    + layer(0.92, `<g opacity="0"${M.tw([{ at: de + 0.6, dur: 1.2, from: { opacity: 0, y: -420 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>`
      + glow(J6[0], 640, 300, 0.85) + `<g transform="translate(${J6[0]},${J6[1] + 6})"><ellipse rx="140" ry="32" fill="#fff8ec" opacity=".9"/><ellipse cx="-60" cy="-10" rx="58" ry="28" fill="#fffdf6"/><ellipse cx="56" cy="-12" rx="64" ry="30" fill="#fffdf6"/></g>`
      + `<g${M.bob(6, 3.4)}>${lit(seq((op) => johnB(...J6, { halo: true, ...SAINT, ...op }), [[0, { mood: 'tender', look: [0.8, 0.6] }], [sm, { mood: 'happy', look: [0, 0], armR: [120, 3, 2] }], [gl, { mood: 'tender', look: [0, 0], armR: [120, 3, 2] }]]), 'jCanon')}</g>`
      + `<g opacity="0"${fadeIn(gl, 0.6)}>${sparkles(14, 200, 600, 420, 820, { seed: 63 })}</g></g>`)
    + NEAR(bokeh(6, { seed: 64, op: [0.2, 0.45] }));
}

// 7 · SHOT "His feast day is November 26; he is the patron of altar servers.": sunset over Brabant; John in his portrait pose; an
//     altar server with a candle walks in beside him.  SHOT "Saint John Berchmans, pray for us.": tender.
const J7 = [460, 1345, 2.35], A7 = [790, 1345, 1.45];
function scene7() {
  const nv = at(7, 'November'), as = at(7, 'altar servers'), pr = at(7, 'Saint John');
  return lit(castShadow(...J7, 'jGlory') + seq((op) => johnB(...J7, { halo: true, ...SAINT, ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [nv, { mood: 'happy', look: [-1, 0.4] }], [as + 0.5, { mood: 'tender', look: [2.2, 1] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'jGlory')
    + `<g opacity="0"${fadeIn(as - 0.1, 0.05)}>` + lit(castShadow(...A7, 'jGlory') + walk(as - 0.1, 0.9, 260, seq((op) => altarBoy(...A7, { flip: true, armR: [40, 2, 3], propR: candle, armL: -20, ...op }),
      [[0, { mood: 'happy', look: [2.4, -1] }], [pr, { mood: 'tender', look: [2.4, -1] }]])), 'jGlory') + '</g>'
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(J7[0], 740, 240, 0.45)}${sparkles(8, 340, 600, 640, 820, { seed: 71 })}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 260, 700, 520, 900, { seed: 72 })}</g>`
    + NEAR(bokeh(7, { seed: 77 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };   // the path does the travelling (cam.path)
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'St_John_Berchmans',
  bg3d: './john_berchmans.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'roma.bg3d.js': './gelasius.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  cast: { john: { voice: 'bm_lewis', speed: 0.95 } },
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  music: { story: 'St. John Berchmans, a shoemaker\'s son from Flanders who walked to Rome, became holy through small things and died at twenty-two',
    color: 'Flemish Renaissance: a warm string ensemble, soft pipe organ, a gentle recorder or harp line and a wordless boys\' choir',
    cues: { 1: 'Warm and innocent: a gentle harp and recorder over soft strings, like morning church bells.', 2: 'Tense and young: low strings under a hesitant harp, then a firm rising string phrase as he joins anyway.', 5: 'A hushed night: soft organ and a lone cello, then a bright choir swell as he appears and she is healed.' } },
  thumb_hook: 'All Rome came to see him', thumb_title: 'St. John Berchmans', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'bˈɜːtʃmənz': 'bˈɜːkmənz',            // Berchmans = BERK-mans
    'twˈɛnti sˈɪks': 'twˈɛnti sˈɪksθ',      // November 26 -> November twenty-sixth
  },
  scenes: [
    { kicker: 'ROME · AUGUST 1621', title: 'Rome Came to See Him', art: scene0, bg3d: 'jHook', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(0, 'student'), to: [700, 1080], depth: 0.78, z: 1.1, frame: [600, 1040] },
        { at: at(0, 'Saint John'), to: face(...J0), z: 1.45, frame: [520, 820] }] },
      tone: HOOK,
      say: ['Crowds of Romans waited for days beside one student, just twenty-two.', 'This is Saint John Berchmans.'] },
    { kicker: 'DIEST, BELGIUM · 1599', title: "A Shoemaker's Son", art: scene1, bg3d: 'jDiest', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(1, "shoemaker's"), to: face(...F1), depth: 0.95, z: 1.25, frame: [480, 860] },
        { at: at(1, 'two or three'), to: [680, 1080], z: 1.2, frame: [560, 1000] }] },
      tone: HOOK,
      say: ["He was a shoemaker's son, and at seven he served two or three Masses every morning."] },
    { kicker: 'MECHELEN · 1616', title: 'Father Said No', art: scene2, bg3d: 'jMech', front3d: true,
      cam: { ...GLIDE, whip: 'r', path: [
        { at: at(2, 'said no'), to: face(...F2), depth: 0.97, z: 1.3, frame: [640, 840] },
        { at: at(2, 'threatened'), to: [570, 900], z: 1.12, frame: [540, 900] },
        { at: at(2, 'John joined'), to: [J2[0] + 60, 1000], z: 1.05, frame: [540, 980] }] },
      tone: STAND,
      say: ['At seventeen, he chose the Jesuits, but his father said no.', 'His father threatened to cut him off.', 'John joined them anyway.'] },
    { kicker: 'ON FOOT TO ROME', title: 'A Saint While Young', art: scene3, bg3d: 'jCollege',
      cam: { ...GLIDE, path: [
        { at: at(3, 'He used to say', -0.05), to: [540, 1000], z: 1, frame: [540, 1000] },
        { at: at(3, 'If I'), to: face(...J3), z: 1.4, frame: [500, 840] }] },
      tone: STAND,
      say: ['He walked hundreds of miles to Rome.', 'He used to say:',
        { text: "If I don't become a saint while I'm young, I never will.", who: 'john' }] },
    { kicker: 'ROME · AUGUST 1621', title: 'A Fever Struck', art: scene4, bg3d: 'jFever', front3d: true,
      cam: { ...GLIDE, shake: { at: at(4, 'fever'), amt: 10, dur: 0.5 }, path: [
        { at: at(4, 'debate'), to: [600, 960], depth: 0.92, z: 1.1, frame: [540, 960] },
        { at: at(4, 'He died', 0.4), to: face(J4[0], J4[1], J4[2], true), z: 1.35, frame: [540, 880] }] },
      tone: STAND,
      say: ['After a great debate, a fever struck.', { text: 'He died holding his cross, his rosary and his rule book.', speed: 0.85 }] },
    { kicker: 'GRAND COTEAU, LOUISIANA · 1866', title: 'The Healing', art: scene5, bg3d: 'jCoteau', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(5, 'prayed'), to: face(N5[0], N5[1], N5[2], true), z: 1.3, frame: [480, 900] },
        { at: at(5, 'He appeared', 0.6), to: [J5[0], Math.round(J5[1] - 252 * J5[2])], depth: 0.9, z: 1.15, frame: [640, 780] },
        { at: at(5, 'healed'), to: [560, 1000], z: 1.0, frame: [540, 1000] }] },
      tone: { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Years later, a dying nun in Louisiana prayed to him.', 'He appeared, and she was healed.'] },
    { kicker: "SAINT PETER'S · ROME · 1888", title: 'Declared a Saint', art: scene6, bg3d: 'jCanon', front3d: true,
      cam: { ...GLIDE, whip: 'l', path: [
        { at: at(6, 'declared'), to: face(...P6), depth: 0.97, z: 1.35, frame: [600, 840] },
        { at: at(6, 'He never', 0.3), to: [J6[0], Math.round(J6[1] - 252 * J6[2])], depth: 0.92, z: 1.25, frame: [500, 760] }] },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Then Pope Leo XIII declared him a saint.', 'He never did great deeds, only small ones, done with great love.'] },
    { kicker: 'FEAST DAY · NOVEMBER 26', title: 'Saint John Berchmans', art: scene7, bg3d: 'jGlory', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(7, 'Saint John', 0.8), to: face(...J7), z: 1.35, frame: [540, 820] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 26; he is the patron of altar servers.', 'Saint John Berchmans, pray for us.'] },
  ],
};
