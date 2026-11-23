// St. Théophane Vénard: singing in the cage (one story). Feast: November 24, with St. Andrew Dung-Lac and the Martyrs of Vietnam.
// All-3D backgrounds (theophane_venard_cage.bg3d.js: tonkin(), a new set: the Hanoi citadel yard at night and by day with
// the mandarin's pavilion and the Flag Tower, a lotus pond at dusk, the execution ground by the river with rice paddies,
// a Poitou hillside in France, the Lisieux Carmel); cam3d; characters hd().
// Sources: Wikipedia "Théophane Vénard" (born November 21, 1829, Saint-Loup-sur-Thouet; as a boy read of the martyr
// Jean-Charles Cornay; Paris Foreign Missions; captured November 30, 1860; tried before a mandarin, refused to step on a
// crucifix; towards evening sometimes let out to hear confessions, pray the rosary and sing hymns, to the guards'
// amazement; beheaded February 2, 1861, aged 31; beatified 1909, canonized June 19, 1988 by John Paul II with the
// Vietnamese martyrs; feast November 24). Catholic Encyclopedia 1912 ("Ven. Théophane Vénard", J. A. Walsh: betrayed and
// captured; kept in a cage; letter to his father, the spring flower; chanted psalms and hymns on the way; the executioner
// coveted his clothes and asked what he would give to be killed promptly: "The longer it lasts the better it will be").
// Clairval, "Saint Théophane Vénard" (2003): at 9, tending his father's goat and reading the life of Fr. Cornay; arrested
// at the widow Can's home, a cousin informed the police; a narrow wooden cage, then in the Hanoi citadel a larger bamboo
// cage; the viceroy: "Trample the Cross underfoot ... you will not be put to death!"; he raised the crucifix, kissed it
// and said "What! I have preached the faith of the Cross till this day, and now you want me to renounce it?"; to his
// bishop: "My heart is like a calm lake"; the guards were won over by his kindness; St. Thérèse of Lisieux: "I like
// Théophane Vénard even more than Saint Louis de Gonzaga"; John Paul II (June 20, 1988): his picture never left her as
// she was dying).
// Bloodless: the executioner's saber hangs at his side; the climax is the saint kneeling in prayer and a white light.
// Exported for later reels: theophane, guardVN, mandarin, executioner, villagerVN, therese, bambooCage, notes, goat,
// letterProp, saber, pictureFrame, mandarinDesk.
import { M, GOLD, sparkles, bokeh, foliage, f, rng, palm_frond, rosary, book, NEAR, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { khanDong, aoDai, nonLa, spear, lantern, lotus, vietChurch } from './andrew_dung_lac.mjs';
import { crucifixHand } from './miguel_pro_firing_squad.mjs';

const at = wordTimes('st_theophane_venard_cage');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const flash = (t, hold = 0.7) => `<g opacity="0"${fadeIn(t, 0.15)}><g${fadeOut(t + 0.2, hold)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".85"/></g></g>`;

// ================================================================ props
const BAM = '#c4a85e', BAMD = '#8a7038', BAMS = '#6e5a2e';
/** A bamboo cage (about 2 m long, 1 m high), base centre (0,0). part 'back' (floor, back bars, roof) or 'front' (front bars
 * with a wide gap in the middle so the face shows, rails and lashings). Draw back, then the kneeling prisoner, then front. */
export const bambooCage = (s = 1, part = 'back') => {
  const pole = (x, y0, y1, c, w = 9) => `<rect x="${x - w / 2}" y="${y1}" width="${w}" height="${y0 - y1}" rx="3" fill="${c}"/>`
    + [0.25, 0.55, 0.82].map((k) => `<rect x="${x - w / 2 - 1}" y="${f(y1 + (y0 - y1) * k)}" width="${w + 2}" height="3" rx="1" fill="${BAMS}" opacity=".7"/>`).join('');
  const rail = (y, c, x0 = -172, x1 = 172, h = 10) => `<rect x="${x0}" y="${y - h / 2}" width="${x1 - x0}" height="${h}" rx="4" fill="${c}"/>`
    + [-0.6, -0.2, 0.2, 0.6].map((k) => `<rect x="${f(k * 172)}" y="${y - h / 2 - 1}" width="3" height="${h + 2}" fill="${BAMS}" opacity=".6"/>`).join('');
  let g = '';
  if (part === 'back') {
    g += '<rect x="-182" y="-20" width="364" height="26" rx="5" fill="#5e4a2a"/><rect x="-182" y="-20" width="364" height="7" rx="3" fill="#7a6234"/>';
    for (let x = -165; x <= 165; x += 30) g += pole(x, -20, -276, BAMD, 7);
    g += rail(-272, BAMD) + rail(-150, BAMD, -172, 172, 7);
    g += '<path d="M-196 -276 L0 -318 L196 -276 L190 -266 L0 -306 L-190 -266Z" fill="#9a8048"/><path d="M0 -318 L196 -276 L190 -266 L0 -306Z" fill="#6e5a32" opacity=".7"/>';
  } else {
    for (const x of [-172, -134, -96, 96, 134, 172]) g += pole(x, -14, -280, BAM, 11);
    g += rail(-276, BAM, -182, 182, 12) + rail(-18, BAM, -182, 182, 12);
    g += rail(-150, BAM, -182, -88, 9) + rail(-150, BAM, 88, 182, 9);
    for (const x of [-172, -134, -96, 96, 134, 172]) for (const y of [-276, -150, -18]) if (!(y === -150 && Math.abs(x) < 90)) g += `<path d="M${x - 7} ${y - 6} L${x + 7} ${y + 6} M${x + 7} ${y - 6} L${x - 7} ${y + 6}" stroke="#5a4626" stroke-width="2.6" stroke-linecap="round"/>`;
  }
  return `<g transform="scale(${s})">${g}</g>`;
};
/** Musical notes rising from (x, y): one starts every `every` s from t0 for n notes; each rises, sways and fades. */
export const notes = (x, y, t0, { n = 6, every = 0.8, seed = 1, color = '#fff1c8', s = 1 } = {}) => {
  const r = rng(seed); let out = '';
  for (let k = 0; k < n; k++) {
    const d = t0 + k * every, dx = f((r() - 0.35) * 150), sc = f(s * (0.8 + r() * 0.5));
    const glyph = k % 3 === 1
      ? `<ellipse cx="-14" cy="0" rx="9" ry="6.6" transform="rotate(-20 -14 0)" fill="${color}"/><ellipse cx="14" cy="-6" rx="9" ry="6.6" transform="rotate(-20 14 -6)" fill="${color}"/><rect x="-7.5" y="-40" width="3.4" height="40" fill="${color}"/><rect x="20.5" y="-46" width="3.4" height="40" fill="${color}"/><path d="M-7.5 -40 L24 -46 L24 -38 L-7.5 -32Z" fill="${color}"/>`
      : `<ellipse cx="0" cy="0" rx="9.5" ry="7" transform="rotate(-20)" fill="${color}"/><rect x="6.5" y="-42" width="3.4" height="42" fill="${color}"/><path d="M9.9 -42 Q24 -34 21 -16 Q18 -27 9.9 -30Z" fill="${color}"/>`;
    out += `<g transform="translate(${f(x + dx * 0.3)},${y})"><g${M.tw([{ at: d, dur: 3.2, from: { y: 0, x: 0 }, to: { y: -300, x: dx }, ease: 'power1.out' }])}>`
      + `<g opacity="0"${M.tw([{ at: d, dur: 0.4, from: { opacity: 0 }, to: { opacity: 0.95 } }])}><g${M.tw([{ at: d + 2.3, dur: 0.9, from: { opacity: 1 }, to: { opacity: 0 } }])}>`
      + `<g transform="scale(${sc})"><g${M.sway(10, 1.6, k * 0.3)}><circle r="30" fill="url(#haloGlow)" opacity=".5"/>${glyph}</g></g></g></g></g></g>`;
  }
  return out;
};
/** A farm goat (feet at 0,0, facing right; flip to face left), head bobbing down to graze. */
export const goat = (x, y, s = 1, { flip = false, c = '#efe6d6', sh = '#cfc2ae' } = {}) => `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">`
  + '<ellipse cx="0" cy="2" rx="80" ry="10" fill="#1a0f1a" opacity=".22" filter="url(#soft)"/>'
  + [-48, -30, 30, 46].map((lx, i) => `<rect x="${lx - 5}" y="-62" width="10" height="62" rx="4" fill="${i % 2 ? sh : c}"/><rect x="${lx - 6}" y="-8" width="12" height="8" rx="2" fill="#5a4a3a"/>`).join('')
  + `<path d="M-60 -78 Q-64 -112 -30 -116 L34 -118 Q66 -114 62 -80 Q60 -54 30 -54 L-34 -54 Q-60 -56 -60 -78Z" fill="${c}"/>`
  + `<path d="M-40 -58 Q0 -50 40 -58 Q30 -66 0 -66 Q-30 -66 -40 -58Z" fill="${sh}" opacity=".7"/><path d="M-62 -100 Q-80 -116 -74 -128 Q-66 -112 -58 -108Z" fill="${c}"/>`
  + `<g><g${M.sway(9, 3.4, 0.2, 58, -110)}>`
  + `<path d="M50 -104 Q70 -130 92 -128 Q112 -124 112 -104 Q110 -88 96 -86 L70 -86 Q54 -90 50 -104Z" fill="${c}"/>`
  + `<path d="M78 -128 Q72 -156 54 -160 Q70 -146 72 -126Z M90 -128 Q90 -154 76 -164 Q88 -148 84 -126Z" fill="#8a7a62"/>`
  + `<path d="M66 -120 Q50 -124 46 -114 Q58 -112 66 -114Z" fill="${sh}"/><circle cx="92" cy="-112" r="3.4" fill="#2b1d14"/><circle cx="93" cy="-113" r="1" fill="#fff"/>`
  + `<path d="M98 -88 Q100 -70 94 -62 Q90 -74 92 -88Z" fill="${sh}"/><ellipse cx="110" cy="-100" rx="4" ry="3" fill="#b8907a"/></g></g></g>`;
/** A sheet of paper with brushed lines and a writing brush (held in the hand at 0,0). */
export const letterProp = (s = 1) => `<g transform="scale(${s}) translate(0,-24) rotate(-8)"><rect x="-30" y="-40" width="60" height="78" rx="2" fill="#f6efdc"/>`
  + '<path d="M-20 -28 H18 M-20 -18 H14 M-20 -8 H20 M-20 2 H10 M-20 12 H16 M-20 22 H6" stroke="#3a2c26" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>'
  + '<g transform="translate(26,10) rotate(30)"><rect x="-2.5" y="-46" width="5" height="42" rx="2" fill="#8a5a32"/><path d="M-3 -4 L3 -4 L0 8Z" fill="#1a1416"/></g></g>';
/** A curved saber hanging point-down from the hand at (0,0). */
export const saber = (s = 1) => `<g transform="scale(${s})"><rect x="-4" y="-16" width="8" height="24" rx="3" fill="#4a3020"/><rect x="-13" y="6" width="26" height="6" rx="2" fill="${GOLD}"/>`
  + '<path d="M-4 12 Q-6 80 8 150 Q14 158 12 140 Q4 80 4 12Z" fill="#c8ccd6"/><path d="M0 14 Q0 80 10 142" stroke="#f0f2f8" stroke-width="1.6" fill="none" opacity=".8"/></g>';
/** A small framed picture of St. Théophane (held in the hand at 0,0). */
export const pictureFrame = (s = 1) => `<g transform="scale(${s}) translate(0,-40)"><circle r="56" fill="url(#haloGlow)" opacity=".6"/><rect x="-32" y="-42" width="64" height="82" rx="3" fill="#8a6a3a"/>`
  + '<rect x="-26" y="-36" width="52" height="70" fill="#efe4cc"/><circle cx="0" cy="-10" r="13" fill="none" stroke="#f2c46b" stroke-width="2.4"/>'
  + '<path d="M-20 34 Q-18 8 0 6 Q18 8 20 34Z" fill="#26283a"/><circle cx="0" cy="-10" r="10" fill="#e8c0a0"/><path d="M-10 -14 Q0 -26 10 -14 L10 -17 Q0 -29 -10 -17Z" fill="#17141c"/>'
  + '<path d="M-8 -4 Q0 6 8 -4 Q4 2 0 2 Q-4 2 -8 -4Z" fill="#5a3a24"/></g>';
/** The mandarin's red lacquered desk with a brush pot, an ink stone and the seal (base centre 0,0). */
export const mandarinDesk = (s = 1) => `<g transform="scale(${s})"><rect x="-120" y="-118" width="240" height="14" rx="4" fill="#7a2a24"/>`
  + '<path d="M-110 -104 H110 V-6 H-110Z" fill="#9a3228"/><path d="M-110 -104 H110 V-90 H-110Z" fill="#6a2420"/><path d="M-98 -84 H98 V-20 H-98Z" fill="none" stroke="#f2c46b" stroke-width="3" opacity=".8"/>'
  + '<path d="M-60 -52 Q0 -76 60 -52 Q0 -30 -60 -52Z" fill="#f2c46b" opacity=".5"/><rect x="60" y="-104" width="50" height="98" fill="#000" opacity=".12"/>'
  + '<rect x="-96" y="-150" width="22" height="32" rx="4" fill="#3a5a6a"/><path d="M-90 -150 L-94 -176 M-84 -150 L-82 -178 M-79 -150 L-72 -172" stroke="#6a4a2a" stroke-width="3"/>'
  + '<rect x="-40" y="-126" width="56" height="9" rx="2" fill="#2a2228"/><rect x="40" y="-138" width="26" height="20" rx="3" fill="#c8323a"/><rect x="46" y="-150" width="14" height="14" rx="3" fill="#a8842e"/></g>';
const rosaryHand = (s = 1.3) => `<g transform="scale(${s})">${rosary()}</g>`;
const lanternHand = (s = 0.9) => `<g transform="translate(0,74)">${lantern('#d8404e', s)}</g>`;
/** A bamboo pole with a crossarm and a hanging lantern (base at x, y). */
const lanternPole = (x, y, h = 560, c = '#d8404e', side = 1) => `<g transform="translate(${x},${y})"><rect x="-6" y="${-h}" width="12" height="${h}" rx="4" fill="${BAMD}"/>`
  + `<rect x="${side > 0 ? -6 : -96}" y="${-h + 8}" width="102" height="9" rx="4" fill="${BAMD}"/><g transform="translate(${side * 80},${-h + 84})"><g${M.sway(4, 3.2, 0.4, 0, -70)}>${lantern(c, 1)}</g></g></g>`;
/** A glowing thought-bubble vision (centre 0,0): a Vietnamese church, palm trees and a martyr's palm in gold light. */
const vision = (s = 1) => `<g transform="scale(${s})"><circle r="190" fill="url(#haloGlow)"/><circle r="150" fill="#fff4d8" opacity=".35"/>`
  + `<g transform="translate(0,96)">${vietChurch(0, 0, 0.42)}</g><g transform="translate(-112,92)">${palm_frond(1.1, -30, 2)}</g><g transform="translate(112,92) scale(-1,1)">${palm_frond(1.1, -30, 2)}</g>`
  + `<circle r="150" fill="none" stroke="${GOLD}" stroke-width="5" opacity=".7"/></g>`
  + '<circle cx="-150" cy="200" r="24" fill="#fff4d8" opacity=".45"/><circle cx="-200" cy="270" r="13" fill="#fff4d8" opacity=".4"/>';

// ================================================================ characters
const SKT = '#efc8a4';
/** St. Théophane Vénard: a young French missionary in Vietnamese dress (dark tunic, black khăn turban), brown hair and a
 * short brown beard, blue-grey eyes. */
export const theophane = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: '#2a2c40', plain: true, trim: '#20222e', belt: false, mantle: null, skin: SKT, hair: '#6a4428', beard: '#6a4428', beardStyle: 'short',
  hairStyle: 'short', age: 'young', iris: '#5a7a96', ...o, over: aoDai('#2a2c40') + khanDong('#18151c') + over });
/** Théophane as a nine-year-old in France: a blue smock, brown hair. */
const boyTheo = (x, y, s, o = {}) => hd(x, y, s, { top: '#4a6a9a', plain: true, trim: '#3a5680', belt: '#7a5434', mantle: null, skin: SKT, hair: '#7a5030', beard: null,
  hairStyle: 'short', age: 'young', iris: '#5a7a96', shoes: '#4a3424', ...o });
const SKV = ['#d6a074', '#c98f62', '#b97c52', '#e0b08a', '#cf9a70'];
/** A Nguyễn-era guard: red tunic, conical hat or turban, spear. */
export const guardVN = (x, y, s, i = 0, { hat = 'nonla', over = '', ...o } = {}) => hd(x, y, s, {
  top: i % 2 ? '#8a2a28' : '#a8342e', plain: true, trim: '#e8c46a', belt: '#2a2432', mantle: null, skin: SKV[i % 5], hair: '#15100c', beard: null, age: 'young',
  iris: '#2e2018', mood: 'stern', armR: 10, propR: spear, ...o, over: (hat === 'nonla' ? nonLa('#e0c890', 78, 70) : khanDong('#2a1e22')) + over });
/** The mandarin (viceroy of Hanoi): a blue court robe with an embroidered square, a black turban, a thin beard. */
export const mandarin = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: '#2e3a78', mantle: '#4a2a5a', lining: '#e8c46a', trim: GOLD, belt: false, skin: '#d6a074', hair: '#15100c', beard: '#2a2420', beardStyle: 'short',
  age: 'old', hairStyle: 'short', iris: '#2e2018', mood: 'stern', ...o,
  over: '<rect x="-21" y="-184" width="42" height="40" rx="3" fill="#e8c46a"/><circle cx="0" cy="-164" r="12" fill="#c8323a" opacity=".75"/><path d="M-14 -152 Q0 -162 14 -152" stroke="#2e3a78" stroke-width="3" fill="none"/>'
    + khanDong('#15100c') + over });
/** The executioner: a dark red tunic, red turban, a saber hanging point-down. */
export const executioner = (x, y, s, o = {}) => hd(x, y, s, { top: '#6a2426', plain: true, trim: '#4a1a1c', belt: '#c8323a', mantle: null, skin: '#b97c52', hair: '#15100c',
  beard: '#15100c', beardStyle: 'short', age: 'mid', iris: '#2e2018', mood: 'stern', armR: 8, propR: saber(1), ...o, over: khanDong('#8a2a2a') + (o.over || '') });
const VIL = [['#6b5038', '#e0c890'], ['#3e4a5e', '#d8c088'], ['#5a3e44', '#e8d4a0'], ['#4a5a3e', '#dcc490']];
/** A villager in a conical hat. */
export const villagerVN = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: VIL[i % 4][0], plain: true, trim: VIL[i % 4][0], belt: false, mantle: null, skin: SKV[(i + 1) % 5],
  hair: '#15100c', beard: null, age: i % 3 === 2 ? 'old' : 'mid', iris: '#2e2018', ...o, over: nonLa(VIL[i % 4][1], 76, 66) + (o.over || '') });
/** St. Thérèse of Lisieux: brown Carmelite habit, black veil, white wimple and white mantle. */
export const therese = (x, y, s, o = {}) => hd(x, y, s, { veil: '#1a1618', wimple: '#fbf8f0', top: '#6a4a32', plain: true, trim: '#5a3e2a', belt: '#2a1e18',
  mantle: '#f4efe4', lining: '#e6ddcc', skin: '#f0c9a8', hair: '#8a5a32', beard: null, age: 'young', iris: '#5a7aa0', ...o });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  tHook:   { key: '#ffb070', from: 'l', tint: '#8a8ab8', amt: 0.2, rim: '#ffc890', rimOp: 0.85 },
  tFrance: { key: '#fff0d0', from: 'r', tint: '#fff4e0', amt: 0.05, rim: '#fff4dc', rimOp: 0.7 },
  tCourt:  { key: '#ffe0b8', from: 'l', tint: '#f4dcc4', amt: 0.08, rim: '#ffe4c0', rimOp: 0.75 },
  tCourt2: { key: '#ffe8c8', from: 'back', tint: '#ffe4cc', amt: 0.1, rim: '#fff2d6', rimOp: 0.95 },
  tPond:   { key: '#ffb888', from: 'r', tint: '#c8a0b8', amt: 0.16, rim: '#ffc4a0', rimOp: 0.85 },
  tField:  { key: '#fff0c8', from: 'top', tint: '#fff0d4', amt: 0.08, rim: '#fff4d8', rimOp: 0.8 },
  tCarmel: { key: '#ffd0a0', from: 'l', tint: '#ffe0c4', amt: 0.1, rim: '#ffd8a8', rimOp: 0.8 },
  tGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `tvlit${++LID}`, d = 5;
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
const cageAt = (x, y, s, part) => `<g transform="translate(${x},${y})">${bambooCage(s, part)}</g>`;

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262, 0.75 ~1245.
// 0 · hook: a young priest kneeling in a bamboo cage at night begins to sing (push-fast)
function scene0() {
  const sg = at(0, 'began to sing'), nm = at(0, 'This is Saint');
  return layer(0.92, lit(castShadow(175, 1310, 1.85, 'tHook') + seq((op) => guardVN(175, 1310, 1.85, 0, { armL: 34, propL: lanternHand(0.9), ...op }),
      [[0, { mood: 'stern', look: [2.4, 0] }], [sg + 0.5, { mood: 'surprised', look: [2.4, -0.4] }]]), 'tHook'))
    + `<g opacity="0"${fadeIn(sg, 0.8)}>${glow(560, 900, 380, 0.45)}</g>`
    + lit(castShadow(560, 1345, 2.3, 'tHook') + cageAt(560, 1345, 2.3, 'back')
      + seq((op) => theophane(560, 1345, 2.3, { kneel: true, armL: 30, armR: 30, ...op }),
        [[0, { mood: 'peaceful', look: [0, 0] }], [sg, { mood: 'happy', look: [0.8, -1.6] }], [nm, { mood: 'happy', look: [0, 0], halo: nm + 0.15 }]])
      + cageAt(560, 1345, 2.3, 'front'), 'tHook')
    + notes(620, 760, sg + 0.1, { n: 7, every: 0.7, seed: 3, s: 1.3 })
    + `<g opacity="0"${fadeIn(nm + 0.2, 0.6)}>${sparkles(12, 330, 790, 560, 960, { seed: 4 })}</g>`
    + NEAR(foliage('r', 1660, { color: '#1a1a2a', seed: 3 }));
}

// 1 · France, about 1838: a boy tending the family goat reads of a martyr in Vietnam (pan-r)
function scene1() {
  const mt = at(1, 'martyr'), lg = at(1, 'longed');
  return layer(0.95, lit(castShadow(760, 1322, 1.15, 'tFrance') + goat(760, 1322, 1.15, { flip: true }), 'tFrance'))
    + `<g opacity="0"${fadeIn(mt, 0.6)}>${glow(420, 1000, 300, 0.4)}</g>`
    + lit(castShadow(400, 1345, 1.5, 'tFrance') + seq((op) => boyTheo(400, 1345, 1.5, { armL: 34, ...op }),
      [[0, { mood: 'happy', look: [0.8, 1.8], armR: 50, propR: book(true) }], [mt, { mood: 'awe', look: [2, -1], armR: 50, propR: book(true) }],
        [lg, { mood: 'determined', look: [0, 0], armR: 22, propR: book(false) }]]), 'tFrance')
    + popAt(mt + 0.2, 700, 720, vision(0.95), 0.7)
    + `<g opacity="0"${fadeIn(lg, 0.5)}>${sparkles(12, 520, 880, 560, 880, { seed: 7 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#2a4a2a', seed: 5 }) + bokeh(6, { seed: 9, sides: true }));
}

// 2 · 1860: betrayed and caught; the mandarin hands him a crucifix: "Trample the cross, and you will not die." (push)
function scene2() {
  const bt = at(2, 'betrayed'), cr = at(2, 'crucifix'), tr = at(2, 'Trample'), nd = at(2, 'not die', 0.5);
  return layer(0.78, lit(`<g opacity="0"${walkIn(bt + 0.3, 160, 1.0)}>${castShadow(590, 1262, 1.5, 'tCourt')}${guardVN(590, 1262, 1.5, 1, { hat: 'turban', flip: true, look: [2.4, 0] })}</g>`, 'tCourt'))
    + layer(0.92, lit(castShadow(780, 1310, 1.9, 'tCourt') + seq((op) => mandarin(780, 1310, 1.9, { flip: true, armL: 12, ...op }),
      [[0, { look: [2.4, 0], armR: 14 }], [cr, { look: [2.4, 0], armR: [64, 2, 2] }], [tr, { look: [2.4, 0], armR: [40, 3, 1.6], talk: [tr, nd] }], [nd, { look: [2.4, 0.6], armR: 14 }]])
      + `<g transform="translate(780,1310)">${mandarinDesk(1.55)}</g>`, 'tCourt'))
    + layer(0.97, lit(`<g opacity="0"${walkIn(bt, -180, 1.0)}>${castShadow(115, 1330, 1.95, 'tCourt')}${guardVN(115, 1330, 1.95, 0, { look: [2.4, 0], armL: [60, 2, 2] })}</g>`, 'tCourt'))
    + lit(castShadow(330, 1345, 2.2, 'tCourt') + seq((op) => theophane(330, 1345, 2.2, op),
      [[0, { mood: 'happy', look: [0, 0], armL: 10, armR: 12 }], [bt, { mood: 'surprised', look: [2.4, 0], armL: 10, armR: 12 }],
        [cr, { mood: 'worried', look: [1.6, 1.4], armL: 10, armR: 40, propR: crucifixHand(1.1) }], [tr + 0.4, { mood: 'determined', look: [2.4, 0], armL: 10, armR: 40, propR: crucifixHand(1.1) }]]), 'tCourt')
    + `<g opacity="0"${fadeIn(cr + 0.1, 0.5)}>${glow(400, 1050, 160, 0.5)}</g>`
    + NEAR(foliage('l', 1660, { color: '#2a3a24', seed: 7 }));
}

// 3 · he was 31 and far from home; he raises the cross and kisses it: "I have preached the cross ..." (dolly)
function scene3() {
  const yr = at(3, 'He was'), rk = at(3, 'raised'), ip = at(3, 'I have preached'), end = at(3, 'deny it', 0.5);
  return layer(0.88, lit(castShadow(810, 1294, 1.7, 'tCourt2') + seq((op) => mandarin(810, 1294, 1.7, { flip: true, armL: 12, armR: 14, ...op }),
      [[0, { look: [2.4, 0] }], [rk + 0.4, { look: [2.4, -0.6], mood: 'surprised' }], [ip + 1.2, { look: [2.4, 0], mood: 'stern' }]])
      + `<g transform="translate(810,1294)">${mandarinDesk(1.4)}</g>`, 'tCourt2'))
    + `<g opacity="0"${fadeIn(rk, 1.0)}>${glow(400, 820, 420, 0.55)}</g>`
    + lit(castShadow(400, 1345, 2.35, 'tCourt2') + seq((op) => theophane(400, 1345, 2.35, { armL: 10, ...op }),
      [[0, { mood: 'determined', look: [2.4, 0], armR: 40, propR: crucifixHand(1.1) }], [yr, { mood: 'worried', look: [0, 1.6], armR: 34, propR: crucifixHand(1.1) }],
        [rk, { mood: 'tender', look: [0, -1], armR: 168, propR: crucifixHand(1.15) }],
        [ip, { mood: 'determined', look: [2.4, 0], armR: 150, propR: crucifixHand(1.15), talk: [ip, end] }],
        [end, { mood: 'peaceful', look: [0, -1], armR: 150, propR: crucifixHand(1.15) }]]), 'tCourt2')
    + `<g opacity="0"${fadeIn(rk + 0.3, 0.6)}>${sparkles(16, 300, 640, 360, 760, { seed: 11 })}</g>`
    + NEAR(bokeh(6, { seed: 13, sides: true }));
}

// 4 · nine weeks in the cage at the citadel: hymns at dusk, the guard won over; the letter: "My heart is like a calm lake." (drift-l)
function scene4() {
  const sg = at(4, 'singing'), wr = at(4, 'He wrote'), ml = at(4, 'My heart'), end = at(4, 'calm lake', 0.6);
  return layer(0.92, lit(castShadow(820, 1310, 1.8, 'tPond') + seq((op) => guardVN(820, 1310, 1.8, 1, { flip: true, armL: 30, propL: lanternHand(0.85), ...op }),
      [[0, { mood: 'stern', look: [2.4, 0] }], [sg + 0.6, { mood: 'happy', look: [2.4, 0] }], [ml, { mood: 'tender', look: [2.4, 0] }]]), 'tPond'))
    + `<g opacity="0"${fadeIn(ml, 1.0)}>${glow(440, 940, 420, 0.5)}</g>`
    + lit(castShadow(430, 1345, 2.2, 'tPond') + cageAt(430, 1345, 2.2, 'back')
      + seq((op) => theophane(430, 1345, 2.2, { kneel: true, armL: 30, propL: rosaryHand(1.3), ...op }),
        [[0, { mood: 'peaceful', look: [0, 0], armR: 30 }], [sg, { mood: 'happy', look: [1, -1.4], armR: 30 }],
          [wr, { mood: 'happy', look: [1.4, 1.8], armR: 44, propR: letterProp(1.1) }], [ml, { mood: 'tender', look: [0, 0], armR: 44, propR: letterProp(1.1) }],
          [end, { mood: 'peaceful', look: [0, 0], armR: 44, propR: letterProp(1.1) }]])
      + cageAt(430, 1345, 2.2, 'front'), 'tPond')
    + notes(500, 820, sg + 0.1, { n: 5, every: 0.8, seed: 5, s: 1.2 })
    + `<g opacity="0"${fadeIn(ml + 0.3, 0.6)}>${sparkles(12, 260, 640, 600, 980, { seed: 15 })}</g>`
    + NEAR(lotus(110, 1600, 1.2) + lotus(980, 1640, 1.0, { c: '#f6b8c8' }) + bokeh(6, { seed: 17, sides: true }));
}

// 5 · February 2, 1861: he walks to his death singing; "The longer it lasts, the better." He kneels: the climax (tilt-up + rack)
function scene5() {
  const ex = at(5, 'executioner'), lo = at(5, 'The longer'), lend = at(5, 'the better', 0.5), gv = at(5, 'And he gave');
  const row = [[150, 0, 'v'], [290, 1, 'g'], [700, 2, 'v'], [860, 3, 'g'], [990, 0, 'v']].map(([x, i, k]) => k === 'v'
    ? villagerVN(x, 1245, 1.3, i, { mood: 'sad', look: [x < 540 ? 2 : -2, 0], armL: 26, armR: 26, ph: (i * 0.29) % 1 })
    : guardVN(x, 1245, 1.3, i, { flip: x > 540, look: [2.4, 0], ph: (i * 0.37) % 1 })).join('');
  return layer(0.75, lit(row, 'tField'))
    + layer(0.95, lit(castShadow(790, 1322, 2.0, 'tField') + seq((op) => executioner(790, 1322, 2.0, { flip: true, armL: 12, ...op }),
      [[0, { look: [2.4, 0] }], [ex, { look: [2.4, 0], mood: 'stern' }], [lo + 0.6, { look: [2.4, 0], mood: 'surprised' }], [gv, { look: [2.4, 0.8], mood: 'sad' }]]), 'tField'))
    + `<g opacity="0"${fadeIn(gv, 1.0)}>${glow(400, 820, 460, 0.6)}</g>`
    + lit(castShadow(400, 1345, 2.25, 'tField') + `<g${walkIn(0, -200, 1.6)}>` + seq((op) => theophane(400, 1345, 2.25, op),
      [[0, { mood: 'happy', look: [0.6, -1.4], armL: 12, armR: 14 }], [ex, { mood: 'happy', look: [2.4, 0], armL: 12, armR: 14 }],
        [lo, { mood: 'tender', look: [2.4, 0], armL: 12, armR: 30, talk: [lo, lend] }],
        [gv, { mood: 'peaceful', look: [0, -1], kneel: true, armL: 34, armR: 34, halo: gv + 0.3 }]]) + '</g>', 'tField')
    + notes(470, 800, 0.4, { n: 4, every: 0.75, seed: 8, s: 1.2 })
    + `<g opacity="0"${fadeIn(gv + 0.3, 1.0)}><path d="M310 300 L490 300 L540 1345 L260 1345Z" fill="#fff4d8" opacity=".16"/></g>`
    + `<g opacity="0"${fadeIn(gv + 0.4, 0.6)}>${sparkles(18, 200, 640, 460, 1100, { seed: 21 })}</g>`
    + flash(gv + 0.9, 1.2)
    + NEAR(bokeh(6, { seed: 23, sides: true }));
}

// 6 · Lisieux, 1897: St. Thérèse keeps his picture as she dies; "A cage could hold his body, but never his song." (pull)
function scene6() {
  const kp = at(6, 'kept'), cg = at(6, 'A cage'), sg = at(6, 'never his song');
  return `<g opacity="0"${fadeIn(cg, 0.9)}><g transform="translate(770,1060)">${glow(0, 0, 420, 0.6)}</g>`
    + `<g${M.bob(10, 3.4)}>${theophane(770, 1250, 1.55, { mood: 'tender', look: [-2.4, 0], halo: true, armL: 30, propL: palm_frond(1.0, -8, 2), armR: 20 })}</g></g>`
    + `<g opacity="0"${fadeIn(sg, 0.5)}>${notes(780, 760, sg, { n: 4, every: 0.6, seed: 12, s: 1.2 })}</g>`
    + lit(castShadow(360, 1345, 2.25, 'tCarmel') + seq((op) => therese(360, 1345, 2.25, { armL: 36, ...op }),
      [[0, { mood: 'tender', look: [1.2, 1.4], armR: 46, propR: pictureFrame(1.2) }], [kp, { mood: 'peaceful', look: [0, 0], armR: 46, propR: pictureFrame(1.2) }],
        [cg + 0.3, { mood: 'awe', look: [2.6, -1.2], armR: 46, propR: pictureFrame(1.2) }], [sg, { mood: 'happy', look: [2.6, -1], armR: 46, propR: pictureFrame(1.2) }]]), 'tCarmel')
    + `<g opacity="0"${fadeIn(sg + 0.2, 0.6)}>${sparkles(16, 520, 960, 560, 1100, { seed: 27 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#3a3428', seed: 9 }) + bokeh(6, { seed: 29, sides: true }));
}

// 7 · feast-day portrait: November 24, with the Martyrs of Vietnam (arc-r)
function scene7() {
  const fd = at(7, 'feast'), mv = at(7, 'Martyrs of Vietnam'), pr = at(7, 'pray for us');
  return layer(0.92, lit(lanternPole(185, 1310, 640, '#d8404e', -1) + lanternPole(950, 1310, 560, '#e0a02e', -1), 'tGlory'))
    + `<g opacity="0"${fadeIn(mv, 0.8)}>${glow(470, 780, 440, 0.5)}</g>`
    + lit(castShadow(470, 1345, 2.35, 'tGlory') + seq((op) => theophane(470, 1345, 2.35, { halo: true, armL: 34, propL: palm_frond(1.0, -6, 2), armR: 30, propR: crucifixHand(1.15), ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [fd, { mood: 'happy', look: [2.2, -0.8] }], [mv, { mood: 'happy', look: [0, 0] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'tGlory')
    + `<g opacity="0"${fadeIn(mv + 0.3, 0.6)}>${sparkles(14, 260, 720, 520, 900, { seed: 31 })}</g>`
    + NEAR(lotus(120, 1610, 1.15) + lotus(960, 1630, 1.0, { c: '#f6b8c8' }) + bokeh(7, { seed: 33, sides: true }));
}

export const STORY = {
  slug: 'st_theophane_venard_cage', name: 'St_Theophane_Venard_Cage',
  bg3d: './theophane_venard_cage.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { theophane: { voice: 'bm_lewis', speed: 0.92 }, mandarin: { voice: { zm_yunjian: 0.6, am_onyx: 0.4 }, speed: 0.88 } },
  music: { story: 'a young French missionary priest locked in a bamboo cage in Hanoi in 1860, who sang hymns in his cage and walked to his martyrdom singing',
    cues: { 1: 'Gentle and pastoral: a soft flute and warm strings over French hills, a boy dreaming of far lands.',
      4: 'Calm and tender: a quiet piano and soft strings, still as a lake at dusk, with a faint hymn-like melody.' } },
  thumb_hook: 'He sang inside his cage', thumb_title: 'St. Théophane Vénard', thumb_scene: 0, thumb_t: 4.0, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'θˈeɪəfˌeɪn vˈeɪnɑːɹd': 'tˌeɪoʊfˈɑːn veɪnˈɑːɹ',            // Théophane Vénard -> tay-oh-FAHN vay-NAR (French)
    'θˈeɪɹiːz': 'tɛɹˈɛz',                                        // Thérèse -> teh-REZ
    'lˈɪsɪˌʌ': 'liːzjˈɜː',                                        // Lisieux -> lee-ZYUH
    'fˈɛbɹuːˌɛɹi tˈuː': 'fˈɛbɹuːˌɛɹi sˈɛkənd',                  // February 2 -> February second
    'noʊvˈɛmbɚ twˈɛnti fˈɔːɹ': 'noʊvˈɛmbɚ twˈɛnti fˈɔːɹθ',      // November 24 -> November twenty-fourth
  },
  scenes: [
    { kicker: 'HANOI · DECEMBER 1860', title: 'Singing in a Cage', art: scene0, bg3d: 'tHook', front3d: true, cam: { move: 'push-fast', ox: 560, oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['They locked a young priest in a bamboo cage.', 'And he began to sing.', 'This is Saint Théophane Vénard.'] },
    { kicker: 'FRANCE · ABOUT 1838', title: 'A Boy’s Dream', art: scene1, bg3d: 'tFrance', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['As a boy in France, he read about a martyr in Vietnam, and longed to follow him.'] },
    { kicker: 'TONKIN · NOVEMBER 30, 1860', title: 'Trample the Cross', art: scene2, bg3d: 'tCourt', front3d: true, cam: { move: 'push', amt: 0.06, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Years later, as a missionary there, he was betrayed.', 'A judge handed him a crucifix.', { text: 'Trample the cross, and you will not die.', who: 'mandarin' }] },
    { kicker: 'BEFORE THE MANDARIN', title: 'He Kissed the Cross', art: scene3, bg3d: 'tCourt2', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 400, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['He was 31, and far from home.', 'But he raised the cross, and kissed it.', { text: 'I have preached the cross until today. Now you want me to deny it?', who: 'theophane' }] },
    { kicker: 'THE CAGE · NINE WEEKS', title: 'A Calm Lake', art: scene4, bg3d: 'tPond', front3d: true, cam: 'drift-l',
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['For nine weeks he waited in the cage, singing hymns. He wrote:', { text: 'My heart is like a calm lake.', who: 'theophane' }] },
    { kicker: 'HANOI · FEBRUARY 2, 1861', title: 'The Longer, the Better', art: scene5, bg3d: 'tField', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['On February 2, 1861, he walked to his death, singing.', 'The executioner asked what he would pay for a quick end.',
        { text: 'The longer it lasts, the better.', who: 'theophane' }, { text: 'And he gave his life for Christ.', speed: 0.85 }] },
    { kicker: 'LISIEUX · 1897', title: 'Her Favorite Martyr', art: scene6, bg3d: 'tCarmel', front3d: true, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Saint Thérèse of Lisieux kept his picture close as she died.', 'A cage could hold his body, but never his song.'] },
    { kicker: 'FEAST DAY · NOVEMBER 24', title: 'St. Théophane Vénard', art: scene7, bg3d: 'tGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 24, with the Martyrs of Vietnam.', 'Saint Théophane Vénard, pray for us.'] },
  ],
};
