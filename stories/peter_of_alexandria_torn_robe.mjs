// St. Peter of Alexandria: the torn robe and the secret execution (one story: his last imprisonment, 311). Feast: November 25.
// All-3D backgrounds (peter_of_alexandria_torn_robe.bg3d.js: set-ups of alexandria() from catherine_of_alexandria.bg3d.js:
// the prison cell, dusk over the city, a storm at the prison wall, dawn at St. Mark's tomb by the sea, Nicaea, sunset);
// cam3d; characters hd().
// Sources: Anastasius the Librarian, Latin Acts/Life of St. Peter of Alexandria (Hawkins 1879, Fordham Medieval Sourcebook;
// a legendary account): Maximin "ordered Peter to be apprehended and cast into prison"; "a band of monks and of virgins"
// surrounded the prison; Arius (still a deacon, "Levite") sent clergy to plead for him; Christ appeared as "a boy of about
// twelve years" in "a linen tunic divided into two parts, from the neck to the feet": "Lord, who hath rent thy tunic?" -
// "Arius hath rent it, and by all means beware of receiving him into communion" (put into plain English); Peter told the
// tribunes to dig at the back of the prison where they heard "a signal given on the wall from within"; "such a heavy
// whirlwind of wind and rain" that night; "Do what ye are about to do, before those are aware who are guarding me" (shortened);
// taken to Bucolia "where the holy St. Mark underwent martyrdom", prayed at Mark's tomb; the tribunes' "hands were paralyzed",
// "each of them brought forth five solidi" for the one who would strike; "Peter is the last of the martyred bishops of
// Alexandria" (a voice heard at the tomb). Wikipedia "Peter I of Alexandria": bishop 300-311, under Maximinus Daia, died
// 25 November 311, "the Seal of the Martyrs", excommunicated Arius; Severus: soldiers feared a riot. Nicaea (325) condemned
// Arius (Wikipedia "First Council of Nicaea"). Feast November 25 (Vatican News saint of the day, Butler).
// Bloodless (Meta/YouTube): no blow shown; he kneels in prayer, a flash of light, the halo and palm.
// Exported for later reels: peterAlex, childJesusTorn, omophorion, tornRobe, monkEG, holyVirgin, envoyPriest, bishopHD,
// stonemason, goldCoin, markTomb, prisonWall, rain, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, book, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { speedLines, sweat, crack, burst, squash } from '../cartoonfx.mjs';
import { legionary } from './rufus_simon_of_cyrene.mjs';
import { manacle } from './paul_le_bao_tinh_letter.mjs';
import { pickaxe } from './clement_anchor.mjs';
import { torch } from './moses_black_basket.mjs';
import { gladiusDown } from './perpetua_arena.mjs';
import { scroll } from './andrew_apostle.mjs';

const SLUG = 'st_peter_of_alexandria_torn_robe';
const at = wordTimes(SLUG);
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const flash = (t, c = '#fff6e0', op = 0.85) => `<g opacity="0"${fadeIn(t, 0.08)}><g${fadeOut(t + 0.12, 0.7)}><rect x="-300" y="-300" width="1680" height="2520" fill="${c}" opacity="${op}"/></g></g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props
/** The Eastern bishop's omophorion: a white band round the shoulders, one end hanging down the front, with crosses (body space). */
export const omophorion = (kneel = false) => {
  const e = kneel ? -110 : -46, cr = (x, y, s = 1) => `<path d="M${x} ${y - 8 * s} v${16 * s} M${x - 7 * s} ${y - 2 * s} h${14 * s}" stroke="#a8282e" stroke-width="${3.6 * s}" stroke-linecap="round"/>`;
  return `<g><path d="M-36 -206 Q-20 -176 0 -172 Q20 -176 36 -206" stroke="#f8f4ea" stroke-width="15" fill="none" stroke-linecap="round"/>`
    + `<path d="M-36 -206 Q-20 -176 0 -172 Q20 -176 36 -206" stroke="#d8d0c0" stroke-width="2" fill="none" transform="translate(0,6)" opacity=".7"/>`
    + `<path d="M-9 -178 L9 -178 L11 ${e} L-11 ${e}Z" fill="#f8f4ea"/><path d="M4 -178 L9 -178 L11 ${e} L6 ${e}Z" fill="#d8d0c0" opacity=".7"/>`
    + `<path d="M-11 ${e} L11 ${e} L11 ${e + 6} L-11 ${e + 6}Z" fill="${GOLD}"/>`
    + cr(0, -150) + cr(0, kneel ? -128 : -96) + cr(-27, -192, 0.7) + cr(27, -192, 0.7) + '</g>';
};
/** The linen tunic torn from the neck to the feet (body space, over the tunic; drawn under the right arm). */
export const tornRobe = (() => {
  const Lp = [], Rp = [];
  for (let k = 0; k <= 10; k++) { const y = -204 + k * 19.7, w = 1.5 + k * 1.4, j = k % 2 ? 4 : -3; Lp.push([-w + j, y]); Rp.push([w + j, y]); }
  const pts = (a) => a.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L');
  const L = `M${pts(Lp)}`, R = `M${pts(Rp)}`;
  return `<g><path d="M${pts(Lp)} L${pts(Rp.slice().reverse())}Z" fill="#7a6a5c" opacity=".9"/>`
    + `<path d="${L}" stroke="#fffdf6" stroke-width="2.4" fill="none" stroke-linejoin="round" opacity=".9"/><path d="${R}" stroke="#d8d0c0" stroke-width="2.4" fill="none" stroke-linejoin="round"/></g>`;
})();
/** A gold coin (solidus) lying flat. */
export const goldCoin = (x, y, r = 12, rot = 0) => `<g transform="translate(${f(x)},${f(y)}) rotate(${rot})"><ellipse rx="${r}" ry="${f(r * 0.42)}" fill="#a8762a"/>`
  + `<ellipse cy="-2.4" rx="${r}" ry="${f(r * 0.42)}" fill="${GOLD}"/><ellipse cx="-3" cy="-3.6" rx="${f(r * 0.45)}" ry="${f(r * 0.16)}" fill="#fff4c8" opacity=".8"/></g>`;
/** St. Mark's tomb: a stone sarcophagus with a cross, under a small arched shrine with an oil lamp (base centre at 0,0). */
export const markTomb = (s = 1, { lamp = true } = {}) => `<g transform="scale(${s})"><ellipse cy="6" rx="200" ry="18" fill="#140c14" opacity=".25"/>`
  + `<path d="M-180 0 V-330 Q-180 -440 0 -440 Q180 -440 180 -330 V0Z" fill="#d8c4a2"/><path d="M110 -420 Q180 -400 180 -330 V0 H130 V-330 Q130 -390 110 -420Z" fill="#b8a07e"/>`
  + `<path d="M-140 0 V-320 Q-140 -400 0 -400 Q140 -400 140 -320 V0Z" fill="#6a5444"/><path d="M-196 -330 H196 V-312 H-196Z M-200 0 H200 V14 H-200Z" fill="#c8b08a"/>`
  + `<path d="M-150 -6 V-150 H150 V-6Z" fill="#efe2c8"/><path d="M90 -150 H150 V-6 H90Z" fill="#cdbb98"/><path d="M-162 -150 H162 V-178 H-162Z" fill="#f6ecd6"/>`
  + `<path d="M0 -136 V-24 M-34 -96 H34" stroke="#a8282e" stroke-width="10" stroke-linecap="round"/>`
  + `<path d="M-120 -40 H-60 M60 -40 H120" stroke="#cdbb98" stroke-width="4"/>`
  + (lamp ? `<g transform="translate(0,-250)"><circle r="110" fill="url(#sunGlow)" opacity=".7"/><path d="M-22 6 Q0 20 22 6 L16 -2 H-16Z" fill="#b88a4a"/>`
    + `<g${M.flick(0.4, 0, 0.6)}><path d="M-5 -2 Q-8 -18 0 -30 Q8 -18 5 -2Z" fill="#ffb040"/><path d="M-2 -3 Q-3 -12 0 -18 Q3 -12 2 -3Z" fill="#fff0b0"/></g></g>` : '') + '</g>';
/** The prison's back wall (art coords): stone courses from y0 to y1 with an arched hole at cx that opens at time t:
 * the blocking stones fly out toward the camera; before t a knock signal rings out on the wall at time knock. */
export function prisonWall({ y0 = 640, y1 = 1296, cx = 560, w = 250, top = 900, t = 99, knock = null } = {}) {
  const id = `pw${Math.round(cx)}`, hole = `M${cx - w / 2} ${y1} V${top + 90} Q${cx - w / 2} ${top} ${cx} ${top} Q${cx + w / 2} ${top} ${cx + w / 2} ${top + 90} V${y1}Z`;
  let stones = '';
  const rows = Math.ceil((y1 - y0) / 46);
  for (let r = 0; r < rows; r++) {
    const y = y0 + r * 46; let x = -120 - (r % 2) * 60, k = 0;
    while (x < 1200) { const sw = 96 + ((r * 7 + k * 13) % 5) * 12, c = ['#5c5262', '#655a6a', '#544a5a', '#6a5e6e'][(r + k * 3) % 4];
      stones += `<rect x="${x + 3}" y="${y + 3}" width="${sw - 6}" height="40" rx="5" fill="${c}"/><rect x="${x + 3}" y="${y + 3}" width="${sw - 6}" height="6" rx="3" fill="#8a7e90" opacity=".45"/>`;
      x += sw; k++; }
  }
  // blocking stones inside the arch, each flying out at t
  let plug = '';
  for (let r = 0; r * 46 < y1 - top; r++) for (let c = 0; c < 3; c++) {
    const x = cx - w / 2 + c * w / 3 + (r % 2 ? 18 : 0) - 9, y = top + r * 46, dx = (c - 1) * 160 + (r % 2 ? 40 : -40), dur = 0.9 + ((r + c) % 3) * 0.15;
    const sx = f(x + w / 6), sy = f(y + 23);
    plug += `<g${M.tw([{ at: t, dur, from: { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 }, to: { x: dx, y: 260 + r * 30, rotation: (c - 1) * 70 + (r % 2 ? 30 : -30), scale: 2.2, opacity: 0 }, ease: 'power2.in', origin: `${sx} ${sy}` }])}>`
      + `<rect x="${f(x + 3)}" y="${y + 3}" width="${f(w / 3 - 6)}" height="40" rx="5" fill="${['#5c5262', '#655a6a', '#544a5a'][(r + c) % 3]}"/></g>`;
  }
  const ring = knock === null ? '' : [0, 0.32, 0.64].map((d) => `<g opacity="0"${M.tw([{ at: knock + d, dur: 0.7, from: { opacity: 0.9, scale: 0.3 }, to: { opacity: 0, scale: 1.4 }, ease: 'power2.out', origin: `${cx} ${top + 200}` }])}>`
    + `<circle cx="${cx}" cy="${top + 200}" r="90" fill="none" stroke="#fff0d0" stroke-width="7"/></g>`).join('');
  return `<defs><clipPath id="${id}"><path d="M-200 ${y0} H1300 V${y1} H-200Z ${hole}" clip-rule="evenodd"/></clipPath><clipPath id="${id}h"><path d="${hole}"/></clipPath></defs>`
    + `<path d="${hole}" fill="#1a1420"/><g clip-path="url(#${id}h)">${glow(cx, y1 - 120, 220, 0.55)}</g>`
    + `<g clip-path="url(#${id})">${stones}<rect x="-200" y="${y0}" width="1500" height="${y1 - y0}" fill="#1a1428" opacity=".18"/></g>`
    + `<path d="M-200 ${y0} H1300" stroke="#7a6e80" stroke-width="10"/><g clip-path="url(#${id}h)">${plug}</g>${ring}`;
}
/** Wind-driven rain over the frame (a layer card; seamless loop). */
export const rain = ({ n = 26, op = 0.32, c = '#c4cce4', seed = 3 } = {}) => {
  const tile = 300; let one = '';
  for (let k = 0; k < n; k++) { const x = (k * 113 + seed * 37) % tile, y = -1500 + ((k * 389 + seed * 71) % 3000), l = 50 + (k % 4) * 18; one += `<path d="M${x} ${y} h${l}" stroke="${c}" stroke-width="${2 + (k % 3)}" stroke-linecap="round"/>`; }
  let all = ''; for (let j = -6; j <= 10; j++) all += `<g transform="translate(${j * tile},0)">${one}</g>`;
  return `<g opacity="${op}" transform="rotate(256 540 960) translate(540,960)"><g${M.scroll(tile, 0.32)}>${all}</g></g>`;
};
/** A lightning bolt in the sky with a cold flash, at time t. */
const lightning = (t, x = 860) => `<g opacity="0"${M.tw([{ at: t, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t + 0.12, dur: 0.05, to: { opacity: 0.2 } }, { at: t + 0.2, dur: 0.05, to: { opacity: 1 } }, { at: t + 0.32, dur: 0.4, to: { opacity: 0 } }])}>`
  + `<path d="M${x} 360 L${x - 40} 470 L${x - 6} 476 L${x - 52} 610 L${x + 10} 500 L${x - 22} 494 L${x + 26} 380Z" fill="#f4f6ff"/>${glow(x - 20, 480, 260, 0.7)}</g>`
  + `<g opacity="0"${M.tw([{ at: t, dur: 0.05, from: { opacity: 0 }, to: { opacity: 0.4 } }, { at: t + 0.32, dur: 0.5, to: { opacity: 0 } }])}><rect x="-300" y="-300" width="1680" height="2520" fill="#c8d4ff"/></g>`;

// ================================================================ characters
const SKP = '#d4a27c', GREYP = '#cfc8bc';
/** St. Peter of Alexandria: a bishop of about sixty, grey hair and long grey beard, white sticharion, red phelonion with gold,
 * the white omophorion with red crosses. chained: manacles on both wrists. */
export const peterAlex = (x, y, s, { chained = false, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#f4eee2', plain: true, trim: GOLD, mantle: '#a8282e', lining: GOLD, belt: false, skin: SKP, hair: GREYP, hairStyle: 'old', beard: GREYP, beardStyle: 'long',
  age: 'old', iris: '#3a2a20', shoes: '#6a2a2a', ...(chained ? { propL: manacle, propR: manacle } : {}), ...o, over: omophorion(o.kneel) + over });
/** Christ as a boy of about twelve, in the linen tunic torn from neck to feet, holding the rent at his breast; cross halo. */
const crossNimbus = `<g fill="#a8282e" opacity=".85"><rect x="-70" y="-262" width="30" height="12" rx="3"/><rect x="40" y="-262" width="30" height="12" rx="3"/><rect x="-6" y="-326" width="12" height="32" rx="3"/></g>`;
export const childJesusTorn = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: '#f6f2e8', plain: true, trim: '#e8dfcc', mantle: null, belt: false, skin: '#e2b48f', hair: '#6a4428', hairStyle: 'long', beard: null, age: 'young', iris: '#4a2e1c',
  halo: true, armL: 8, armR: -24, mood: 'sad', ...o, under: crossNimbus + (o.under || ''), over: tornRobe + over });
const MONK = [['#5a4636', '#b07a52', '#2a1c12', '#3a2a1e'], ['#6a5440', '#c48a5f', '#8a8278', '#8a8278'], ['#4a3a2e', '#9a6540', '#1e1612', '#4a3c30']];
/** An Egyptian desert monk: dark brown tunic, a rough mantle, beard. */
export const monkEG = (x, y, s, i = 0, o = {}) => { const [top, skin, hair, beard] = MONK[i % 3];
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.12), mantle: '#7a6a52', lining: '#5a4a3a', belt: '#2a1e16', skin, hair, hairStyle: i % 3 === 1 ? 'old' : 'short', beard, beardStyle: 'full',
    age: i % 3 === 1 ? 'old' : 'mid', iris: '#2e2018', shoes: '#4a3424', ...o }); };
const VIRG = [['#ece4d4', '#3a3644', '#c48a5f'], ['#e2d8c4', '#4a3c4a', '#d9a47e'], ['#efe8da', '#2e2a36', '#a87048']];
/** A consecrated virgin of Alexandria: pale tunic, a dark veil. */
export const holyVirgin = (x, y, s, i = 0, o = {}) => { const [top, veil, skin] = VIRG[i % 3];
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.1), mantle: null, belt: false, veil, veilHair: 'covered', hair: '#2a1c12', skin, beard: null, age: 'young', iris: '#2e2018', shoes: '#5a4a34', ...o }); };
/** A cleric sent to plead for Arius: plain tunic, purple-grey mantle, short dark beard. */
export const envoyPriest = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: '#ece4d4', plain: true, trim: '#8a7a9a', mantle: i ? '#5a4a6a' : '#6a5a4a', lining: '#a89ab8', belt: false,
  skin: i ? '#c48a5f' : '#d9a47e', hair: '#2a1c12', hairStyle: i ? 'curly' : 'short', beard: '#2a1c12', beardStyle: 'short', age: 'mid', iris: '#2e2018', shoes: '#4a3424', ...o });
/** A bishop at Nicaea (Alexander of Alexandria when i = 0): white sticharion, coloured phelonion, omophorion. */
const BISH = [['#2f5a8a', '#6a5a4e', '#5a4a3e', 'short'], ['#7a5a2a', '#e8e2d8', '#e8e2d8', 'old'], ['#3e6a4e', '#8a8278', '#8a8278', 'old']];
export const bishopHD = (x, y, s, i = 0, { over = '', ...o } = {}) => { const [mantle, hair, beard, hs] = BISH[i % 3];
  return hd(x, y, s, { top: '#f4eee2', plain: true, trim: GOLD, mantle, lining: GOLD, belt: false, skin: ['#d9a47e', '#c48a5f', '#e2b48f'][i % 3], hair, hairStyle: hs, beard, beardStyle: 'full',
    age: i ? 'old' : 'mid', iris: '#3a2a20', shoes: '#5a3a22', ...o, over: omophorion(o.kneel) + over }); };
/** A stonemason: rough work tunic, short beard, a pickaxe. */
export const stonemason = (x, y, s, o = {}) => hd(x, y, s, { top: '#8a7a5a', plain: true, trim: '#6a5a40', mantle: null, belt: '#4a3424', skin: '#b07a52', hair: '#2a1c12', hairStyle: 'curly',
  beard: '#2a1c12', beardStyle: 'short', age: 'mid', iris: '#2e2018', shoes: '#4a3424', mood: 'determined', ...o });
const soldier = (x, y, s, o = {}) => legionary(x, y, s, o);

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  pHook:   { key: '#ffb878', from: 'r', tint: '#a4a8cc', amt: 0.16, rim: '#ffd0a0', rimOp: 0.9 },
  pArrest: { key: '#ffb880', from: 'back', tint: '#ffbe9a', amt: 0.14, rim: '#ffc08a', rimOp: 0.85 },
  pCell:   { key: '#c8d8ff', from: 'r', tint: '#9aa8d8', amt: 0.22, rim: '#d8e4ff', rimOp: 0.9 },
  pStorm:  { key: '#ffb070', from: 'r', tint: '#7a80a8', amt: 0.24, rim: '#ffc890', rimOp: 0.85 },
  pTomb:   { key: '#ffd0a0', from: 'l', tint: '#e8c8c0', amt: 0.12, rim: '#ffe0c0', rimOp: 0.8 },
  pNicaea: { key: '#fff4d8', from: 'r', tint: '#fff4e4', amt: 0.06, rim: '#fff8e8', rimOp: 0.7 },
  pGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `palit${++LID}`, d = 5;
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
// cam3d: the character plane (depth 1) is 20 units away; layer(d) at 20 / d. Feet art y: depth 1 ~1345, 0.97 ~1312,
// 0.95 ~1322, 0.92 ~1310, 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1240.
const P0 = [350, 1345, 2.5], HX = 770, HY = 1236;
/** A hole smashed through the cell's back wall (on the 3D wall, depth 0.74) at time t: cracks, stones flying at the camera,
 * a dust puff, then the dark gap with a soldier's torch blazing in it. */
const wallBreach = (t) => {
  const hole = `M${HX - 112} ${HY} L${HX - 118} ${HY - 120} L${HX - 92} ${HY - 196} L${HX - 40} ${HY - 250} L${HX + 18} ${HY - 262} L${HX + 74} ${HY - 228} L${HX + 110} ${HY - 160} L${HX + 120} ${HY - 70} L${HX + 114} ${HY}Z`;
  const pop = M.tw([{ at: t, dur: 0.22, from: { opacity: 0, scale: 0.25 }, to: { opacity: 1, scale: 1 }, ease: 'power3.out', origin: `${HX} ${HY - 130}` }]);
  let chunks = '';
  for (let k = 0; k < 10; k++) {
    const a = -2.6 + k * 0.42, D = 220 + (k % 3) * 90, w = 34 + (k % 4) * 12, x0 = HX + Math.cos(a) * 40, y0 = HY - 130 + Math.sin(a) * 40;
    chunks += `<g opacity="0"${M.tw([{ at: t, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t + 0.6, dur: 0.4, to: { opacity: 0 } }])}>`
      + `<g${M.tw([{ at: t, dur: 0.9, from: { x: 0, y: 0, rotation: 0, scale: 1 }, to: { x: f(Math.cos(a) * D), y: f(Math.sin(a) * D * 0.5 + 300), rotation: (k % 2 ? 1 : -1) * (80 + k * 15), scale: 2.4 }, ease: 'power2.in', origin: `${f(x0)} ${f(y0)}` }])}>`
      + `<rect x="${f(x0 - w / 2)}" y="${f(y0 - w * 0.35)}" width="${w}" height="${f(w * 0.7)}" rx="5" fill="${['#5c5262', '#655a6a', '#4e4456'][k % 3]}"/></g></g>`;
  }
  let dust = '';
  for (let k = 0; k < 7; k++) { const dx = (k - 3) * 46, r = 50 + (k % 3) * 16;
    dust += `<g opacity="0"${M.tw([{ at: t + 0.05, dur: 0.15, from: { opacity: 0 }, to: { opacity: 0.3 } }, { at: t + 0.5, dur: 1.2, to: { opacity: 0 } }])}>`
      + `<g${M.tw([{ at: t + 0.05, dur: 1.6, from: { x: 0, y: 0, scale: 0.5 }, to: { x: dx * 1.6, y: -40 - (k % 2) * 40, scale: 1.6 }, ease: 'power2.out', origin: `${HX + dx} ${HY - 60}` }])}>`
      + `<circle cx="${HX + dx}" cy="${HY - 60}" r="${r}" fill="#a89aa8" filter="url(#blur14)"/></g></g>`; }
  const seep = `<g${M.tw([{ at: t, dur: 0.1, from: { opacity: 1 }, to: { opacity: 0 } }])}><g${M.flick(0.9, 0, 0.55)}>`
    + `<path d="M${HX - 60} ${HY - 40} L${HX - 30} ${HY - 120} L${HX + 10} ${HY - 150} L${HX + 50} ${HY - 230} M${HX + 10} ${HY - 150} L${HX + 70} ${HY - 110} L${HX + 90} ${HY - 30}" stroke="#ffb050" stroke-width="5" fill="none" stroke-linejoin="round"/>`
    + `<circle cx="${HX}" cy="${HY - 130}" r="170" fill="url(#sunGlow)" opacity=".35"/></g></g>`;
  return seep + `<g transform="translate(${HX},${HY}) scale(1.35) translate(${-HX},${-HY})">`
    + `<g opacity="0"${pop}><path d="${hole}" fill="#1e1214"/><path d="${hole}" fill="none" stroke="#3a2e3e" stroke-width="10" stroke-linejoin="round"/>`
    + `<circle cx="${HX}" cy="${HY - 120}" r="230" fill="url(#sunGlow)" opacity=".9"/><g transform="translate(${HX + 20},${HY - 60}) scale(1.25)">${torch}</g></g>`
    + crack(HX, HY - 130, 250, t - 0.12, { seed: 7, color: '#1a1420', hold: 1.2 }) + '</g>' + chunks + dust;
};
// 0 · hook: Peter in chains in his cell; the back wall smashes open behind him, a torch in the gap (push-fast; jump cut on him)
function scene0() {
  const ob = at(0, 'one bishop'), br = at(0, 'broke'), kl = at(0, 'to kill'), ti = at(0, 'This is'), sp = at(0, 'Saint Peter');
  const P = (op) => peterAlex(...P0, { chained: true, halo: true, armL: [16, 2, 3], armR: [22, 2, 3], ...op });
  return layer(0.74, wallBreach(br))
    + speedLines(HX, HY - 130, { at: br - 0.02, dur: 0.75, r0: 260, op: 0.45, color: '#ffe0b0', seed: 3 })
    + `<g opacity="0"${fadeIn(br + 0.1, 0.5)}>${glow(640, 1020, 420, 0.35)}</g>`
    + lit(castShadow(...P0, 'pHook') + seq(P, [[0, { mood: 'determined', look: [0, 0] }], [ob + 0.3, { mood: 'determined', look: [0.8, 0.6] }],
      [br + 0.1, { mood: 'surprised', look: [2.6, 0] }], [kl, { mood: 'peaceful' }], [ti, { mood: 'happy', look: [0, 0] }], [sp + 0.6, { mood: 'tender', look: [0, 0] }]]), 'pHook')
    + NEAR(bokeh(6, { seed: 12, op: [0.2, 0.45] }));
}

// 1 · setup (both sides and the stakes): Maximin's soldiers take him through the city at dusk; monks and holy women gather (pan-r + drone)
const crowdRow = (y, list, t) => list.map(([x, s, kind, i, fl], k) => `<g opacity="0"${fadeIn(t + k * 0.14, 0.5)}>${castShadow(x, y, s, 'pArrest')}`
  + (kind === 'm' ? monkEG(x, y, s, i, { flip: fl, mood: 'worried', look: [fl ? -2 : 2, 0], armL: k % 2 ? -20 : 14, armR: k % 2 ? -20 : 20 })
    : holyVirgin(x, y, s, i, { flip: fl, mood: 'sad', armL: -20, armR: -20 })) + '</g>').join('');
function scene1() {
  const jl = at(1, 'wanted him'), mk = at(1, 'monks'), su = at(1, 'guarded');
  const S1 = [290, 1312, 2.05], S2 = [760, 1312, 2.05];
  return MID(lit(crowdRow(1240, [[330, 0.95, 'v', 2], [660, 0.94, 'v', 0, true], [740, 0.97, 'm', 2, true]], su), 'pArrest'))
    + layer(0.92, lit(crowdRow(1310, [[60, 1.55, 'm', 0], [150, 1.5, 'v', 0]], mk) + crowdRow(1310, [[940, 1.5, 'v', 1, true], [1030, 1.55, 'm', 1, true]], mk + 0.2), 'pArrest'))
    + layer(0.97, lit(castShadow(...S1, 'pArrest') + seq((op) => soldier(...S1, { armL: [16, 2, 3], ...op }), [[0, { mood: 'stern', look: [2.4, 0] }], [su, { mood: 'worried', look: [-2.6, 0] }]])
      + castShadow(...S2, 'pArrest') + seq((op) => soldier(...S2, { flip: true, armL: [24, 2, 3], propL: gladiusDown, ...op }), [[0, { mood: 'stern', look: [2.4, 0] }], [su, { mood: 'worried', look: [-2.6, 0] }]]), 'pArrest'))
    + lit(castShadow(520, 1345, 2.25, 'pArrest') + seq((op) => peterAlex(520, 1345, 2.25, { chained: true, armL: [10, 2, 3], armR: [10, 2, 3], ...op }),
      [[0, { mood: 'determined', look: [0, 0.4] }], [jl, { mood: 'sad', look: [0, 1.4] }], [mk + 0.3, { mood: 'tender', look: [-2.4, 0] }]]), 'pArrest')
    + NEAR(foliage('l', 1650, { color: '#2a2430', seed: 6 }) + foliage('r', 1660, { color: '#2a2430', seed: 2 }));
}

// 2 · Arius's clergy beg for him; Peter prays alone; Christ appears as a boy in the torn robe (tilt-up + rack focus)
const E1 = [690, 1322, 1.95], E2 = [850, 1312, 1.9], PK = [330, 1345, 2.3], CH2 = [740, 1322, 1.5];
function scene2() {
  const ar = at(2, 'Arius'), bg = at(2, 'begged'), al = at(2, 'Alone'), ja = at(2, 'Jesus appeared'), q1 = at(2, 'Lord, who'), q1e = at(2, 'your robe?', 0.5),
    q2 = at(2, 'Arius tore'), q2e = at(2, 'take him back', 0.6);
  const envoys = `<g${fadeOut(al - 0.3, 0.6)}>`
    + layer(0.95, lit(castShadow(...E1, 'pCell') + seq((op) => envoyPriest(...E1, 0, { flip: true, kneel: true, look: [2.4, -0.6], ...op }),
      [[0, { mood: 'happy', armL: 20, armR: 20 }], [bg, { mood: 'worried', armL: 60, armR: [80, 4, 1.6] }]]), 'pCell'))
    + layer(0.92, lit(castShadow(...E2, 'pCell') + seq((op) => envoyPriest(...E2, 1, { flip: true, kneel: true, look: [2.4, -0.6], ...op }),
      [[0, { mood: 'happy', armL: 20, armR: 20 }], [bg + 0.2, { mood: 'worried', ...PRAY }]]), 'pCell')) + '</g>';
  const child = layer(0.95, `<g opacity="0"${M.tw([{ at: ja - 0.2, dur: 1.0, from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>`
    + glow(CH2[0], 980, 380, 0.85) + `<g${M.bob(5, 3.2)}>` + lit(seq((op) => childJesusTorn(...CH2, { look: [-2.4, 0], ...op }),
      [[0, { mood: 'sad' }], [q2 - 0.2, { mood: 'sad', talk: [q2, q2e] }], [q2e, { mood: 'tender' }]]), 'pHook') + '</g>'
    + sparkles(16, 580, 900, 620, 1200, { seed: 9 }) + '</g>');
  return envoys + child
    + `<g opacity="0"${fadeIn(ja - 0.2, 0.3)}>${speedLines(CH2[0], 1060, { at: ja - 0.1, dur: 0.8, r0: 300, op: 0.4, color: '#fff4d8', seed: 6 })}</g>`
    + lit(castShadow(...PK, 'pCell') + seq((op) => peterAlex(...PK, { chained: true, ...op }),
      [[0, { mood: 'determined', look: [2.6, 0.6], armL: [14, 2, 3], armR: [14, 2, 3] }], [ar + 0.4, { mood: 'sad', look: [2.6, 0.8], armL: [14, 2, 3], armR: [14, 2, 3] }],
        [al - 0.2, { mood: 'worried', kneel: true, ...PRAY }], [al + 0.9, { mood: 'peaceful', kneel: true, ...PRAY }],
        [ja, { mood: 'awe', kneel: true, look: [2.6, -1.2], ...PRAY }], [q1 - 0.2, { mood: 'awe', kneel: true, look: [2.6, -1.2], talk: [q1, q1e], ...PRAY }],
        [q1e, { mood: 'sad', kneel: true, look: [2.6, -1.0], ...PRAY }], [q2e, { mood: 'determined', kneel: true, look: [2.6, -1.0], ...PRAY }]]), 'pCell')
    + `<g opacity="0"${fadeIn(ja, 1.0)}>${glow(PK[0], 900, 300, 0.35)}</g>`;
}

// 3 · the plan: the soldiers dig through the back wall in a storm; Peter steps out (dolly; crack + shake on the break)
const MS = [215, 1345, 2.2], TB = [870, 1312, 2.0], PW = [560, 1300, 2.0];
function scene3() {
  const rf = at(3, 'refused'), dg = at(3, 'dug'), bw = at(3, 'back wall', 0.3), stm = at(3, 'storm'), q = at(3, 'Do what'), qe = at(3, 'came to do', 0.5);
  const brk = bw + 0.25;
  return layer(0.85, lit(prisonWall({ t: brk, knock: at(3, 'secret plan') }), 'pStorm') + crack(560, 1120, 230, brk - 0.05, { seed: 5, color: '#1a1420' }))
    + layer(0.9, `<g opacity="0"${M.tw([{ at: brk + 0.5, dur: 0.7, from: { opacity: 0, y: -10, scale: 0.92 }, to: { opacity: 1, y: 0, scale: 1 }, ease: 'power2.out', origin: `${PW[0]} ${PW[1]}` }])}>`
      + lit(castShadow(...PW, 'pStorm') + seq((op) => peterAlex(...PW, { chained: true, look: [1.6, 0], ...op }),
        [[0, { mood: 'determined', armL: [14, 2, 3], armR: [14, 2, 3] }], [q - 0.2, { mood: 'determined', talk: [q, qe], armL: [14, 2, 3], armR: [40, 3, 2.4] }],
          [qe, { mood: 'peaceful', armL: [14, 2, 3], armR: [14, 2, 3] }]]), 'pStorm') + '</g>')
    + layer(0.97, lit(castShadow(...TB, 'pStorm') + seq((op) => soldier(...TB, { flip: true, armL: [34, 2, 3], propL: torch, armR: [16, 2, 3], look: [2.4, 0], ...op }),
      [[0, { mood: 'stern' }], [brk + 0.1, { mood: 'surprised' }], [q, { mood: 'worried' }]]), 'pStorm'))
    + lit(castShadow(...MS, 'pStorm') + `<g${squash(brk, MS[0], MS[1], 0.08)}>` + seq((op) => stonemason(...MS, { look: [2.4, -0.4], ...op }),
      [[0, { armR: [150, 22, 0.7], propR: pickaxe(1.0), armL: [40, 2, 3] }], [brk, { mood: 'surprised', armL: [26, 2, 3], propL: pickaxe(1.0), armR: [52, 3, 2] }]]) + '</g>', 'pStorm')
    + lightning(stm - 0.1)
    + `<g opacity="0"${fadeIn(brk, 0.1)}><g${fadeOut(brk + 0.4, 1.2)}>${glow(560, 1150, 360, 0.6)}${sparkles(14, 420, 700, 980, 1280, { seed: 21, color: '#e0d8e8' })}</g></g>`
    + layer(1.25, rain({ op: 0.3 }));
}

// 4 · St. Mark's tomb at dawn: no soldier dares; five gold coins each; the death in light; the Seal of the Martyrs
// (push + hero + whip-in; jump cut on a soldier; sweat; coins squash; burst on the climax line)
const TM = [190, 1312, 0.74], PT = [410, 1345, 2.3], SA = [730, 1322, 2.0], SB = [865, 1310, 1.95];
function scene4() {
  const ds = at(4, 'five officers'), gc = at(4, 'five gold'), fd = at(4, 'One finally'), lw = at(4, 'It looked'), sl = at(4, 'But Peter'), se = at(4, 'Seal');
  const coins = [[590, 1350, -8], [620, 1356, 12], [606, 1342, 4], [640, 1346, -16], [574, 1358, 20], [656, 1358, 6]].map(([x, y, r], k) =>
    `<g opacity="0"${M.tw([{ at: gc + k * 0.12, dur: 0.38, from: { opacity: 1, y: -240 }, to: { opacity: 1, y: 0 }, ease: 'bounce.out' }])}>${goldCoin(x, y, 13, r)}</g>`).join('');
  const back3 = [[600, 1.15, false], [665, 1.12, true], [995, 1.15, true]].map(([x, sc, fl]) => castShadow(x, 1250, sc, 'pTomb')
    + soldier(x, 1250, sc, { flip: fl, mood: 'worried', look: [fl ? -2 : 2, 0.4], armL: [12, 2, 3], armR: [14, 2, 3] })).join('');
  return MID(lit(back3, 'pTomb')) + layer(0.92, lit(castShadow(TM[0], TM[1], 0.9, 'pTomb') + `<g transform="translate(${TM[0]},${TM[1]})">${markTomb(TM[2])}</g>`, 'pTomb'))
    + layer(0.92, lit(castShadow(...SB, 'pTomb') + seq((op) => soldier(...SB, { flip: true, armL: [12, 2, 3], propL: gladiusDown, look: [2.4, 0.6], ...op }),
      [[0, { mood: 'stern' }], [ds + 0.2, { mood: 'worried' }], [gc + 0.2, { mood: 'worried', armR: [28, 2, 3] }], [sl, { mood: 'surprised', look: [2.6, -0.6] }]]), 'pTomb'))
    + layer(0.95, lit(castShadow(...SA, 'pTomb') + seq((op) => soldier(...SA, { flip: true, armL: [12, 2, 3], propL: gladiusDown, look: [2.4, 0.6], ...op }),
      [[0, { mood: 'stern' }], [ds, { mood: 'worried', look: [-2, 0] }], [gc, { mood: 'worried', armR: [28, 2, 3] }], [sl, { mood: 'surprised', look: [2.6, -0.6] }]])
      + sweat(...SA, ds + 0.1, { side: -1, dur: 2.4 }), 'pTomb'))
    + `<g${squash(gc + 0.7, 615, 1356, 0.2)}>${coins}</g>`
    + lit(castShadow(...PT, 'pTomb') + seq((op) => peterAlex(...PT, { kneel: true, ...PRAY, ...op }),
      [[0, { mood: 'peaceful', look: [-2.6, -0.6] }], [ds, { mood: 'peaceful' }], [fd, { mood: 'peaceful', halo: fd + 0.3 }],
        [sl, { mood: 'tender', halo: true, armR: -20, armL: [60, 3, 2.4], propL: palm_frond(1.0, 6) }]]), 'pTomb')
    + flash(fd + 0.2, '#fff8ea', 0.7)
    + `<g opacity="0"${fadeIn(lw - 0.2, 0.6)}><g${fadeOut(sl - 0.1, 0.4)}><rect x="-300" y="-300" width="1680" height="2520" fill="#1a1428" opacity=".35"/></g></g>`
    + burst(PT[0], 930, 520, se) + `<g opacity="0"${fadeIn(se, 0.6)}>${glow(PT[0], 940, 420, 0.6)}${sparkles(18, 280, 680, 700, 1180, { seed: 30 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#3a3428', seed: 4 }));
}

// 5 · Nicaea, 325: Alexander and the bishops condemn Arius; Peter in glory over them (pull)
const AX = [520, 1345, 2.2], PG = [790, 980, 1.2];
function scene5() {
  const ni = at(5, 'Nicaea'), co = at(5, 'condemned'), rm = at(5, 'Rome took'), ct = at(5, 'could not');
  return MID(lit(castShadow(200, 1240, 1.0, 'pNicaea') + bishopHD(200, 1240, 1.0, 1, { mood: 'happy', look: [2, 0], armL: 20, armR: 20 })
      + castShadow(330, 1240, 0.97, 'pNicaea') + bishopHD(330, 1240, 0.97, 2, { mood: 'happy', look: [2, 0], armL: 14, armR: [26, 2, 3], propR: scroll(0.8) })
      + castShadow(880, 1240, 0.98, 'pNicaea') + bishopHD(880, 1240, 0.98, 2, { flip: true, mood: 'happy', look: [2, 0], armL: 20, armR: 20 }), 'pNicaea'))
    + lit(castShadow(...AX, 'pNicaea') + seq((op) => bishopHD(...AX, 0, { armL: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', armR: [20, 2, 3], propR: scroll(1.1) }], [co - 0.2, { mood: 'determined', armR: [128, 4, 2], propR: scroll(1.1) }],
        [rm, { mood: 'tender', look: [2.4, -1.6], armR: [40, 2, 3], propR: scroll(1.1) }]]), 'pNicaea')
    + `<g opacity="0"${fadeIn(co, 0.5)}>${glow(AX[0] + 90, 760, 160, 0.6)}${sparkles(8, 560, 720, 640, 820, { seed: 17 })}</g>`
    + layer(0.9, `<g opacity="0"${M.tw([{ at: rm - 0.3, dur: 1.2, from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>`
      + glow(PG[0], 760, 280, 0.8) + `<g transform="translate(${PG[0]},${PG[1] + 10})"><ellipse rx="140" ry="32" fill="#fff8ec" opacity=".9"/><ellipse cx="-60" cy="-12" rx="60" ry="30" fill="#fffdf6"/><ellipse cx="54" cy="-14" rx="66" ry="32" fill="#fffdf6"/></g>`
      + `<g${M.bob(6, 3.4)}>${lit(peterAlex(...PG, { halo: true, mood: 'tender', look: [-2, 0.4], armL: [24, 2, 3], armR: [40, 2, 3], propR: palm_frond(0.9, -6) }), 'pNicaea')}</g>`
      + `<g opacity="0"${fadeIn(ct, 0.8)}>${sparkles(14, 640, 920, 560, 940, { seed: 23 })}</g></g>`)
    + NEAR(bokeh(6, { seed: 33 }) + foliage('l', 1650, { color: '#3e4a2a', seed: 8 }));
}

// 6 · feast-day portrait: halo, palm, Gospel book, omophorion; the Pharos at sunset (arc-r)
function scene6() {
  const nv = at(6, 'November'), pr = at(6, 'pray for us');
  return lit(castShadow(510, 1345, 2.35, 'pGlory') + seq((op) => peterAlex(510, 1345, 2.35, { halo: true, armR: [28, 2, 3], propR: palm_frond(1.1, -8), ...op }),
      [[0, { mood: 'happy', look: [0, 0], armL: [30, 2, 3], propL: book(false) }], [nv, { mood: 'happy', look: [-1.2, 0.4], armL: [40, 2, 3], propL: book(true) }],
        [pr, { mood: 'tender', armL: [40, 2, 3], propL: book(true) }]]), 'pGlory')
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(510, 740, 240, 0.45)}${sparkles(8, 390, 650, 660, 820, { seed: 35 })}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 520, 900, { seed: 29 })}</g>`
    + NEAR(bokeh(7, { seed: 47 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
const HUSH = { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } };
export const STORY = {
  slug: SLUG, name: 'St_Peter_of_Alexandria_Torn_Robe',
  bg3d: './peter_of_alexandria_torn_robe.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'andrew.bg3d.js': './andrew_apostle.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js', 'alexandria.bg3d.js': './catherine_of_alexandria.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  music: { story: 'St. Peter of Alexandria, the bishop who saw Christ in a torn robe in his prison cell and was led out through a hole in the wall to die in secret',
    color: 'Middle Eastern, ancient Alexandria: oud, ney flute, soft frame drum and a warm low drone, with a wordless low choir',
    cues: { 2: 'Hushed and mysterious in the cell, then a shimmer of high strings and harp as a holy light appears.',
      3: 'Storm: low drums and rumbling strings building, a sudden hit as the wall breaks.' } },
  cast: { peter: { voice: 'bm_george', speed: 0.92 }, jesus: { voice: 'bm_fable', speed: 0.9 } },
  thumb_hook: 'Rome killed him in secret', thumb_title: 'St. Peter of Alexandria', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'twˈɛnti fˈaɪv': 'twˈɛnti fˈɪfθ',      // November 25 -> November twenty-fifth
    'nɪkˈiə': 'naɪsˈiːə',                // Nicaea
  },
  scenes: [
    // one sentence = one shot: every spoken sentence gets its own framing (scene change, jump cut, zoom or whip)
    { kicker: 'ALEXANDRIA, EGYPT · 311', title: 'Killed in Secret', art: scene0, bg3d: 'pHook', front3d: true,
      cam: { move: 'push-fast', oy: 1000, shake: { at: at(0, 'broke'), amt: 20, dur: 0.7 },
        zoom: { at: at(0, 'This is'), to: face(...P0), style: 'snap', z: 1.35, hold: 'end' } },
      tone: HOOK,
      say: ['Five Roman officers broke through a prison wall at night to kill one bishop.', 'This is Saint Peter of Alexandria.'] },
    { kicker: 'THE GREAT PERSECUTION', title: 'Jailed by the Emperor', art: scene1, bg3d: 'pArrest', front3d: true,
      cam: { move: 'pan-r', drone: { h: 8, back: 12, dur: 2.8 } },
      tone: HOOK,
      say: ['Emperor Maximin wanted him dead, but crowds of monks and holy women guarded his prison.'] },
    { kicker: 'THE PRISON CELL', title: 'Who Tore Your Robe?', art: scene2, bg3d: 'pCell', front3d: true,
      cam: { move: 'tilt-up', amt: 0.06, rack: { at: 3, dur: 2.5, blur: 6 }, zoom: [
        { at: at(2, 'Alone'), to: [540, 1000], style: 'cut', z: 1.25, center: 0.3, hold: Math.max(0.6, at(2, 'Lord, who') - at(2, 'Alone') - 0.1) },
        { at: at(2, 'Lord, who'), to: face(PK[0], PK[1], PK[2], true), style: 'snap', z: 1.4, hold: Math.max(0.6, at(2, 'your robe?', 0.5) - at(2, 'Lord, who') - 0.3) },
        { at: at(2, 'Arius tore'), to: face(...CH2), depth: 0.95, style: 'smooth', z: 1.35, hold: 'end' }] },
      tone: HUSH,
      say: ['Then Arius, a deacon he had cut off, begged to come back.', 'Alone in chains, Peter prayed, and Jesus appeared as a boy, his robe torn from neck to feet.',
        { text: 'Lord, who tore your robe?', who: 'peter' }, { text: 'Arius tore it. Do not take him back.', who: 'jesus' }] },
    { kicker: 'A STORMY NIGHT', title: 'Through the Wall', art: scene3, bg3d: 'pStorm', front3d: true,
      cam: { move: 'dolly', amt: 0.08, ox: 560, oy: 1000, shake: [{ at: at(3, 'back wall', 0.55), amt: 22, dur: 0.7 }, { at: at(3, 'storm', -0.1), amt: 10, dur: 0.5 }],
        zoom: { at: at(3, 'Do what'), to: face(...PW), depth: 0.9, style: 'cut', z: 1.4, hold: 'end' } },
      tone: STAND,
      say: ['So Peter refused, and to save the crowd, he made a secret plan.', 'The officers dug through his back wall during a howling storm.', { text: 'Do what you came to do.', who: 'peter' }] },
    { kicker: "SAINT MARK'S TOMB · DAWN", title: 'Seal of the Martyrs', art: scene4, bg3d: 'pTomb', front3d: true,
      cam: { move: 'push', amt: 0.06, ox: 470, oy: 1000, whip: 'r', hero: { h: 2.2 }, zoom: [
        { at: at(4, 'One finally'), to: face(PT[0], PT[1], PT[2], true), style: 'cut', z: 1.45, hold: Math.max(0.5, at(4, 'It looked') - at(4, 'One finally') - 0.1) },
        { at: at(4, 'It looked'), to: face(...SA), depth: 0.95, style: 'cut', z: 1.5, hold: Math.max(0.5, at(4, 'But Peter') - at(4, 'It looked') - 0.1) },
        { at: at(4, 'But Peter'), to: face(PT[0], PT[1], PT[2], true), style: 'smooth', z: 1.3, hold: 'end' }] },
      tone: STAND,
      say: ["At Saint Mark's tomb, the five officers each put in five gold coins for whoever would strike.", 'One finally did.', 'It looked like Rome had won.',
        { text: 'But Peter became the Seal of the Martyrs.', speed: 0.85 }] },
    { kicker: 'NICAEA · 325', title: 'The Robe Kept Whole', art: scene5, bg3d: 'pNicaea', front3d: true,
      cam: { move: 'pull', amt: 0.06, oy: 1000, zoom: { at: at(5, 'Rome took'), to: [PG[0], PG[1] - 252 * PG[2]], depth: 0.9, style: 'fly', z: 1.5, in: 1.2, hold: 'end' } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Fourteen years later, at Nicaea, the Church condemned Arius.', "Rome took his life in secret, but it could not tear Christ's robe."] },
    { kicker: 'FEAST DAY · NOVEMBER 25', title: 'Saint Peter', art: scene6, bg3d: 'pGlory', front3d: true,
      cam: { move: 'arc-r', amt: 0.06, oy: 1000, zoom: { at: at(6, 'Saint Peter of'), to: [510, 1345 - 252 * 2.35], style: 'smooth', z: 1.2, center: 0.4, hold: 'end' } },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 25.', 'Saint Peter of Alexandria, pray for us.'] },
  ],
};
