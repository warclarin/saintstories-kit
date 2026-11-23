// Bl. Miguel Pro: the firing squad (one story). Feast: November 23.
// All-3D backgrounds (miguel_pro_firing_squad.bg3d.js: mexico(), a new Mexico City 1926-27 set: the walled police yard,
// a colonial street, the cathedral square); cam3d; characters hd() with the new opt-in suit options (trousers, lapels,
// tie, buckle in hd.mjs).
// Sources: Wikipedia "Miguel Pro" (born January 13, 1891, Guadalupe, Zacatecas; Jesuit; ordained August 31, 1925, Enghien;
// ulcers and several operations; back in Mexico July 1926; the Calles Law; secret ministry; re-arrested with his brothers
// Humberto and Roberto after the failed attempt on Álvaro Obregón, November 1927; an engineer who took part testified the
// Pro brothers were not involved; executed without trial November 23, 1927; blessed the soldiers, knelt and prayed,
// declined the blindfold, crucifix in one hand and rosary in the other, arms out like Christ; "May God have mercy on you!",
// "With all my heart I forgive my enemies!", then "¡Viva Cristo Rey!"; Calles had it photographed and the photos ran on
// front pages the next day, meant to scare the Cristeros, with the opposite effect; about 40,000 lined the funeral
// procession; beatified September 25, 1988, by Pope John Paul II; feast November 23). Catholic World Report, "What the
// executioner saw" (Nov 23, 2024: five men took aim; he asked for time to pray, knelt about two minutes, stood with
// crucifix and rosary; in the cell he led the prisoners in prayers and songs; Roberto was released). Catholic.org
// ("the actual perpetrator ... cleared the three men"; "Viva Cristo Rey" became the Cristeros' cry). Britannica.
// Bloodless: rifles are aimed but no shot is shown; the climax is a white flash and light.
// Exported for later reels: miguelHD, soldierMX, policeMX, photographer, rebozoWoman, crucifixHand, rifle, kepi, fedora,
// flatCap, stole, newspaper, boxCamera, ironBars, churchDoor, homeAltar, vivaBanner.
import { M, GOLD, sparkles, bokeh, foliage, f, palm_frond, rosary, NEAR, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { chalice } from './charles_borromeo.mjs';
import { candle } from './peter.mjs';

const at = wordTimes('bl_miguel_pro_firing_squad');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const flash = (t, hold = 0.7) => `<g opacity="0"${fadeIn(t, 0.15)}><g${fadeOut(t + 0.2, hold)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".85"/></g></g>`;

// ================================================================ head wear (head space: head centre (0,-252) r 40)
export const kepi = (c = '#8a8458', band = '#5e5a3a', badge = GOLD) => `<path d="M-37 -282 L-33 -326 Q0 -334 33 -326 L37 -282Z" fill="${c}"/>`
  + `<path d="M14 -330 L33 -326 L37 -282 L20 -282Z" fill="#000" opacity=".12"/><path d="M-37 -296 L37 -296 L37 -282 L-37 -282Z" fill="${band}"/>`
  + `<path d="M-43 -283 Q0 -266 43 -283 Q0 -276 -43 -283Z" fill="#1e1a1c"/><circle cx="0" cy="-311" r="5.5" fill="${badge}"/>`;
export const fedora = (c = '#46404a') => `<ellipse cx="0" cy="-284" rx="64" ry="11" fill="${c}"/><ellipse cx="0" cy="-287" rx="62" ry="8" fill="#000" opacity=".12"/>`
  + `<path d="M-38 -287 Q-40 -330 -14 -334 Q0 -326 14 -334 Q40 -330 38 -287Z" fill="${c}"/><path d="M14 -334 Q40 -330 38 -287 L18 -287Z" fill="#000" opacity=".14"/>`
  + `<path d="M-38 -298 Q0 -292 38 -298 L38 -289 Q0 -283 -38 -289Z" fill="#221e24"/>`;
export const flatCap = (c = '#5a4e44') => `<path d="M-44 -270 Q-47 -314 0 -316 Q45 -314 44 -272 Q22 -288 0 -288 Q-24 -288 -44 -270Z" fill="${c}"/>`
  + `<path d="M12 -314 Q45 -312 44 -272 Q34 -282 22 -286Z" fill="#000" opacity=".14"/><ellipse cx="4" cy="-276" rx="46" ry="7" fill="#3e352e"/>`;
/** A white priest's stole over a jacket (body space). */
export const stole = '<path d="M-15 -208 L-21 -64 L-8 -64 L-4 -202Z M15 -208 L21 -64 L8 -64 L4 -202Z" fill="#f6f0e2"/><path d="M-15 -78 h8 M-11 -82 v8 M15 -78 h-8 M11 -82 v8" stroke="#c9a24a" stroke-width="2.6"/>';

// ================================================================ props
/** A small hand crucifix held up (the cross rises above the hand). */
export const crucifixHand = (s = 1) => `<g transform="scale(${s})"><rect x="-3.5" y="-66" width="7" height="74" rx="2" fill="#4a3020"/><rect x="-21" y="-52" width="42" height="7" rx="2" fill="#4a3020"/>`
  + `<g fill="#ecd8b2"><circle cx="0" cy="-54" r="4"/><path d="M-2.6 -50 L2.6 -50 L2 -26 L-2 -26Z"/><path d="M-17 -49 L17 -49 L16 -46 L-16 -46Z"/></g></g>`;
/** A rifle held in the hand, barrel pointing +x (aim); rotate it for other holds. */
export const rifle = (s = 1) => `<g transform="scale(${s})"><path d="M-48 -4 L-8 -8 L-4 7 L-52 16Z" fill="#6a4a2e"/><rect x="-8" y="-6" width="96" height="9" rx="2" fill="#7a5634"/>`
  + '<rect x="-4" y="-9" width="134" height="5" rx="2" fill="#2e2a2e"/><rect x="120" y="-13" width="4" height="5" fill="#2e2a2e"/><path d="M6 3 q6 8 14 2" stroke="#2e2a2e" stroke-width="2.4" fill="none"/></g>';
const rifleUp = (s = 1) => `<g transform="translate(6,10) rotate(-90)">${rifle(s)}</g>`;
const blindfold = '<path d="M-4 2 Q12 16 4 40 Q0 52 10 64" stroke="#f4f0e6" stroke-width="9" fill="none" stroke-linecap="round"/>';
const host = '<g transform="translate(0,-26)"><circle r="44" fill="url(#haloGlow)" opacity=".9"/><circle r="15" fill="#fbf6ea"/><path d="M0 -8 V8 M-6 -2 H6" stroke="#d8c8a8" stroke-width="2"/></g>';
const flowers = (s = 1) => `<g transform="scale(${s})"><path d="M0 0 L-6 -46 M0 0 L4 -50 M0 0 L10 -42" stroke="#4a7a3a" stroke-width="3"/>`
  + [[-6, -50], [4, -55], [11, -46], [-1, -44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#fbf8f0"/><circle cx="${x}" cy="${y}" r="3" fill="#f2c46b"/>`).join('') + '</g>';
const rosaryHand = (s = 1.3) => `<g transform="scale(${s})">${rosary()}</g>`;
/** A 1920s newspaper page (centre at 0,0). kind 'attack' (a headline about the bomb) or 'photo' (the famous photo). */
export const newspaper = (kind = 'photo', s = 1) => {
  const lines = (y0, n, x0 = -96, w = 192) => Array.from({ length: n }, (_, k) => `<rect x="${x0}" y="${y0 + k * 11}" width="${w - (k % 3) * 18}" height="4" fill="#8a8478" opacity=".7"/>`).join('');
  const photo = kind === 'photo'
    ? '<rect x="-96" y="-58" width="192" height="120" fill="#a8a294"/><rect x="-96" y="-58" width="192" height="120" fill="none" stroke="#5a564e" stroke-width="2"/>'
      + '<path d="M-96 30 H96 V62 H-96Z" fill="#8a8478"/><g fill="#2e2c2a"><circle cx="0" cy="-22" r="9"/><path d="M-6 -12 H6 L8 32 H-8Z"/><path d="M-44 -10 H44 V-3 H-44Z"/><path d="M-6 32 L-10 52 H-3 L0 36 L3 52 H10 L6 32Z"/></g>'
      + '<g fill="#3e3a36" opacity=".8"><rect x="58" y="-8" width="10" height="40"/><rect x="74" y="-6" width="10" height="38"/></g>'
    : '<rect x="-96" y="-58" width="192" height="120" fill="#b4ae9e"/><path d="M-70 40 Q-60 10 -20 6 Q30 0 60 30 L70 40Z" fill="#4a4640"/><circle cx="-40" cy="44" r="12" fill="#2e2c2a"/><circle cx="40" cy="44" r="12" fill="#2e2c2a"/>'
      + '<g fill="#e8e2d4" opacity=".9"><circle cx="10" cy="-10" r="22"/><circle cx="30" cy="-24" r="16"/><circle cx="-8" cy="-26" r="14"/></g>';
  return `<g transform="scale(${s}) rotate(-4)"><rect x="-118" y="-160" width="236" height="320" fill="#1a1418" opacity=".25" transform="translate(8,10)"/>`
    + '<rect x="-118" y="-160" width="236" height="320" fill="#f2ecdc"/><rect x="-108" y="-150" width="216" height="34" fill="#2a2628"/>'
    + `<text x="0" y="-124" text-anchor="middle" font-family="Lora, serif" font-weight="700" font-size="25" fill="#f2ecdc">${kind === 'photo' ? 'EL FUSILAMIENTO' : '¡ATENTADO!'}</text>`
    + `<rect x="-108" y="-108" width="216" height="5" fill="#2a2628"/>${lines(-96, 3)}${photo}${lines(70, 7)}</g>`;
};
/** A press camera on a tripod with a flash pan; the flash fires at t (or never). Feet at (0,0). */
export const boxCamera = (t = null, s = 1) => `<g transform="scale(${s})"><path d="M0 -150 L-46 0 M0 -150 L46 0 M0 -150 L4 0" stroke="#4a3a2c" stroke-width="6" stroke-linecap="round"/>`
  + '<rect x="-42" y="-206" width="84" height="64" rx="5" fill="#2e2828"/><rect x="-42" y="-206" width="84" height="12" fill="#4a3e36"/><rect x="-56" y="-190" width="16" height="34" rx="3" fill="#6a5a48"/>'
  + '<circle cx="-52" cy="-174" r="12" fill="#8a7a5a"/><circle cx="-52" cy="-174" r="7" fill="#1e2430"/><circle cx="-54" cy="-176" r="2.5" fill="#cfe0f0"/>'
  + '<path d="M30 -206 L34 -246" stroke="#4a3a2c" stroke-width="4"/><path d="M14 -248 L54 -244 L52 -238 L16 -242Z" fill="#9a9aa2"/>'
  + (t == null ? '' : `<g opacity="0"${fadeIn(t, 0.08)}><g${fadeOut(t + 0.12, 0.6)}><circle cx="34" cy="-250" r="150" fill="url(#haloGlow)"/><circle cx="34" cy="-250" r="44" fill="#fffef6"/></g></g>`) + '</g>';
/** Prison bars across the frame (drawn in front of the characters), dropping in at t. */
export const ironBars = (t, { x0 = 40, x1 = 1040, y0 = 300, y1 = 1560, step = 118 } = {}) => {
  let b = ''; for (let x = x0; x <= x1; x += step) b += `<rect x="${x - 9}" y="${y0}" width="18" height="${y1 - y0}" rx="4" fill="#2a2428"/><rect x="${x - 7}" y="${y0}" width="5" height="${y1 - y0}" fill="#6a6268" opacity=".7"/>`;
  b += `<rect x="${x0 - 30}" y="${y0 + 120}" width="${x1 - x0 + 60}" height="20" rx="4" fill="#2a2428"/><rect x="${x0 - 30}" y="${y1 - 260}" width="${x1 - x0 + 60}" height="20" rx="4" fill="#2a2428"/>`;
  return `<g opacity="0"${M.tw([{ at: t, dur: 0.45, from: { opacity: 0, y: -260 }, to: { opacity: 1, y: 0 }, ease: 'power2.in' }])}>${b}</g>`;
};
/** A closed church door: a stone arch, wooden doors nailed shut with two planks and a notice. Base centre (0,0). */
export const churchDoor = (s = 1) => `<g transform="scale(${s})"><path d="M-150 0 V-330 Q-150 -470 0 -470 Q150 -470 150 -330 V0Z" fill="#d8c8a8"/>`
  + '<path d="M150 -330 V0 H120 V-330 Q120 -440 0 -446 Q140 -440 150 -330Z" fill="#000" opacity=".12"/><path d="M-112 0 V-320 Q-112 -420 0 -420 Q112 -420 112 -320 V0Z" fill="#6a4630"/>'
  + '<path d="M0 -420 V0" stroke="#4a3020" stroke-width="6"/><g fill="#4a3020" opacity=".6"><rect x="-96" y="-300" width="80" height="110" rx="6"/><rect x="16" y="-300" width="80" height="110" rx="6"/><rect x="-96" y="-160" width="80" height="120" rx="6"/><rect x="16" y="-160" width="80" height="120" rx="6"/></g>'
  + '<g transform="rotate(-24 0 -210)"><rect x="-150" y="-226" width="300" height="30" rx="4" fill="#a8845a"/></g><g transform="rotate(24 0 -210)"><rect x="-150" y="-226" width="300" height="30" rx="4" fill="#b8946a"/></g>'
  + '<g transform="translate(46,-150) rotate(5)"><rect x="-34" y="-44" width="68" height="88" fill="#f4eedc"/><rect x="-24" y="-32" width="48" height="6" fill="#5a4a40"/><rect x="-24" y="-18" width="40" height="4" fill="#8a8070"/><rect x="-24" y="-8" width="44" height="4" fill="#8a8070"/><rect x="-24" y="2" width="36" height="4" fill="#8a8070"/></g></g>';
/** A table made into a secret altar: white cloth, two candles, the chalice and a small crucifix. Base centre (0,0). */
export const homeAltar = (s = 1) => `<g transform="scale(${s})"><rect x="-92" y="-118" width="10" height="118" fill="#5a3e2a"/><rect x="82" y="-118" width="10" height="118" fill="#4a3222"/>`
  + '<path d="M-104 -124 H104 L100 -66 H-100Z" fill="#fbf8f0"/><path d="M60 -124 H104 L100 -66 H64Z" fill="#000" opacity=".08"/><rect x="-104" y="-130" width="208" height="10" rx="3" fill="#e8e0d0"/>'
  + `<g transform="translate(-66,-130)">${candle}</g><g transform="translate(66,-130)">${candle}</g><g transform="translate(0,-132)">${chalice(0.9)}</g>`
  + `<g transform="translate(0,-170) scale(.7)">${crucifixHand(1)}</g></g>`;
/** A cloth banner on two poles reading ¡VIVA CRISTO REY! (centre top at 0,0). */
export const vivaBanner = (s = 1) => `<g transform="scale(${s})"><path d="M-170 0 V220 M170 0 V220" stroke="#5a3e2a" stroke-width="7"/>`
  + `<g${M.sway(1.4, 2.6)}><path d="M-170 6 Q0 22 170 6 V82 Q0 98 -170 82Z" fill="#f6f0e2"/><path d="M-170 6 Q0 22 170 6 V18 Q0 34 -170 18Z" fill="#c8323a" opacity=".85"/>`
  + '<text x="0" y="66" text-anchor="middle" font-family="Lora, serif" font-weight="700" font-size="40" fill="#7a1e28">¡VIVA CRISTO REY!</text></g></g>';

// ================================================================ characters
const SKM = '#c48e68';
/** Bl. Miguel Pro: a slim young Mexican Jesuit in a dark suit and white shirt (as in the photos of November 23, 1927),
 * black hair, clean-shaven. hat: 'cap' | 'fedora' (his disguises); stole: true (saying Mass). */
export const miguelHD = (x, y, s, { hat = null, stole: st = false, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#383844', trousers: '#2e2e38', lapels: '#f4f0e6', plain: true, trim: '#2e2e38', belt: false, mantle: null, skin: SKM, hair: '#1a1210',
  hairStyle: 'short', beard: null, age: 'young', iris: '#3a2618', ...o,
  over: (st ? stole : '') + (hat === 'cap' ? flatCap() : hat === 'fedora' ? fedora('#5a5048') : '') + over });
const BRO = [['#5a4636', '#4a3a2e', '#d0a07a'], ['#5a5e66', '#4a4e56', '#c89a72']];
const brother = (x, y, s, i, o = {}) => hd(x, y, s, { top: BRO[i][0], trousers: BRO[i][1], lapels: '#f0ebe0', tie: i ? '#3a3a5a' : '#6a2a2a', plain: true, trim: BRO[i][1], belt: false,
  mantle: null, skin: BRO[i][2], hair: '#1e1612', hairStyle: i ? 'short' : 'curly', beard: null, age: 'young', iris: '#3a2618', ...o });
const SOLSK = ['#b07a52', '#c48e68', '#9a6a46', '#b8845c', '#a87650'];
/** A Mexican federal soldier of the 1920s: khaki uniform, kepi, belt with buckle, rifle (aim: pointing forward; else upright). */
export const soldierMX = (x, y, s, i = 0, { aim = false, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#8a8458', trousers: '#76704c', plain: true, trim: '#6a6444', belt: '#4a3a28', buckle: '#c8b070', mantle: null, skin: SOLSK[i % 5], hair: '#1e1612',
  hairStyle: 'short', beard: i % 3 === 1 ? '#1e1612' : null, beardStyle: i % 3 === 1 ? 'short' : null, age: 'young', iris: '#2e2018', mood: 'stern',
  armR: aim ? [82, 0.8, 3 + i * 0.2] : 10, propR: aim ? rifle(1) : rifleUp(1), armL: aim ? 64 : 10, ...o, over: kepi() + over });
/** A police officer of the 1920s: dark blue uniform and kepi with a gold band. */
export const policeMX = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#2c3450', trousers: '#262c44', plain: true, trim: '#262c44', belt: '#1e1a1c', buckle: GOLD,
  mantle: null, skin: '#c8966e', hair: '#1e1612', hairStyle: 'short', beard: '#1e1612', beardStyle: 'short', age: 'mid', iris: '#2e2018', mood: 'stern', ...o,
  over: kepi('#2c3450', '#b8943a', GOLD) + over });
/** A press photographer in a grey suit and fedora. */
export const photographer = (x, y, s, o = {}) => hd(x, y, s, { top: '#6a6a72', trousers: '#5a5a62', lapels: '#f0ebe0', tie: '#3a3a5a', plain: true, trim: '#5a5a62', belt: false,
  mantle: null, skin: '#d0a07a', hair: '#3a2a20', hairStyle: 'short', beard: null, age: 'mid', iris: '#3a2618', ...o, over: fedora('#4e4a50') + (o.over || '') });
const REB = [['#5a4a6a', '#8a4a3e', '#b8845c'], ['#3e4a5e', '#6a5a7a', '#c89a72'], ['#6a3e44', '#4a5a6a', '#a87650']];
/** A Mexican woman in a rebozo (shawl over the head). */
export const rebozoWoman = (x, y, s, i = 0, o = {}) => hd(x, y, s, { veil: REB[i % 3][0], veilHair: 'covered', top: REB[i % 3][1], plain: true, trim: '#e8d8b8', belt: false, mantle: null,
  skin: REB[i % 3][2], hair: '#1e1612', beard: null, age: i % 2 ? 'mid' : 'young', iris: '#2e2018', shoes: '#3a2a22', ...o });
const MOURN = [['#4a4a52', '#3a3a42'], ['#e8e0cc', '#dcd4c0'], ['#5a4a3e', '#4a3e34']];
const mourner = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: MOURN[i % 3][0], trousers: MOURN[i % 3][1], lapels: i % 3 === 1 ? null : '#f0ebe0', plain: true, trim: MOURN[i % 3][1],
  belt: false, mantle: null, skin: SOLSK[(i + 2) % 5], hair: '#1e1612', hairStyle: i % 2 ? 'curly' : 'short', beard: i % 4 === 3 ? '#1e1612' : null, beardStyle: i % 4 === 3 ? 'short' : null,
  age: i % 3 === 2 ? 'old' : 'mid', iris: '#2e2018', ...o });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  mHook:    { key: '#ffc090', from: 'l', tint: '#c8a8b8', amt: 0.12, rim: '#ffd0a8', rimOp: 0.85 },
  mStreet:  { key: '#ffb880', from: 'r', tint: '#c8a0b0', amt: 0.15, rim: '#ffc090', rimOp: 0.8 },
  mNight:   { key: '#c8d0ff', from: 'r', tint: '#8a90c0', amt: 0.22, rim: '#c8d4ff', rimOp: 0.75 },
  mPray:    { key: '#fff0c8', from: 'top', tint: '#fff0d4', amt: 0.08, rim: '#fff4d8', rimOp: 0.8 },
  mCross:   { key: '#ffe8c8', from: 'back', tint: '#ffe4cc', amt: 0.1, rim: '#fff2d6', rimOp: 0.95 },
  mFuneral: { key: '#ffd8b0', from: 'l', tint: '#ffe0c8', amt: 0.08, rim: '#ffe4c4', rimOp: 0.75 },
  mGlory:   { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `mplit${++LID}`, d = 5;
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
const squad = (xs, y, s, mode, o = {}) => [...xs].sort((a, b) => a - b).map((x, i) => castShadow(x, y, s, mode) + soldierMX(x, y, s, i, { flip: true, ...o })).join('');

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262.
// 0 · hook: five rifles aimed at one unarmed priest; he opens his arms (push-fast)
function scene0() {
  const ai = at(0, 'aimed'), nt = at(0, 'no trial'), nm = at(0, 'Blessed Miguel');
  return layer(0.65, lit(`<g${punch(ai, 0.03, 760, 900)}>` + squad([540, 655, 770, 885, 1000], 1214, 1.2, 'mHook', { aim: true }) + '</g>', 'mHook'))
    + lit(castShadow(320, 1345, 2.35, 'mHook') + seq((op) => miguelHD(320, 1345, 2.35, { propR: crucifixHand(1.1), propL: rosaryHand(1.3), ...op }),
      [[0, { mood: 'determined', look: [2.4, 0], armL: 18, armR: 34 }], [nt, { mood: 'determined', look: [1.6, 0], armL: 86, armR: 86 }],
        [nm, { mood: 'happy', look: [0, 0], armL: 86, armR: 86, halo: nm + 0.2 }]]), 'mHook')
    + `<g opacity="0"${fadeIn(nt, 0.7)}>${glow(320, 760, 400, 0.4)}</g>`
    + `<g opacity="0"${fadeIn(nm + 0.2, 0.6)}>${sparkles(14, 120, 520, 520, 1000, { seed: 3 })}</g>`
    + NEAR(foliage('l', 1660, { color: '#2a2234', seed: 3 }));
}

// 1 · 1926: churches shut, priests hunted; disguises and secret Masses (pan-r)
function scene1() {
  const hu = at(1, 'hunted'), dg = at(1, 'disguises'), ms = at(1, 'said Mass');
  return layer(0.92, lit(`<g${fadeOut(ms - 0.3, 0.5)}>${churchDoor(0.95)}</g>`.replace('<g', '<g transform="translate(170,1310)"><g') + '</g>', 'mStreet'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(hu - 0.3, 180, 1.0)}><g${fadeOut(ms - 0.2, 0.5)}>${castShadow(800, 1310, 1.9, 'mStreet')}`
      + seq((op) => policeMX(800, 1310, 1.9, { flip: true, armL: 12, ...op }), [[0, { look: [2.4, 0], armR: 12 }], [dg + 0.4, { look: [1.4, 0.4], armR: [70, 3, 2] }]]) + '</g></g>', 'mStreet'))
    + layer(0.95, lit(`<g opacity="0"${fadeIn(ms, 0.6)}>${glow(700, 1120, 260, 0.6)}${homeAltar(1.15).replace('<g transform="scale', '<g transform="translate(700,1322) scale')}`
      + `${castShadow(860, 1322, 1.55, 'mStreet')}${rebozoWoman(860, 1322, 1.55, 0, { kneel: true, flip: true, mood: 'peaceful', armL: 30, armR: 30 })}</g>`, 'mStreet'))
    + lit(castShadow(400, 1345, 2.25, 'mStreet') + seq((op) => miguelHD(400, 1345, 2.25, op),
      [[0, { hat: 'cap', mood: 'worried', look: [0, 0.6], armL: 10, armR: 14 }], [hu, { hat: 'cap', mood: 'worried', look: [2.6, 0], armL: 10, armR: 14 }],
        [dg, { hat: 'fedora', mood: 'happy', look: [0, 0], armL: 14, armR: [40, 2, 2.4] }],
        [ms, { stole: true, mood: 'peaceful', look: [2.2, -0.6], armL: 150, armR: 150, propR: host }]]), 'mStreet')
    + `<g opacity="0"${fadeIn(ms + 0.2, 0.6)}>${sparkles(12, 260, 760, 600, 1000, { seed: 6 })}</g>`
    + NEAR(foliage('l', 1660, { color: '#2a2030', seed: 5 }));
}

// 2 · the bomb; innocent but jailed with his brothers; 36 and sick for years (push)
function scene2() {
  const kl = at(2, 'tried to kill'), inn = at(2, 'innocent'), jl = at(2, 'jailed'), sk = at(2, 'He was 36');
  return layer(0.92, lit(`<g${fadeOut(jl + 0.1, 0.5)}>${castShadow(830, 1310, 1.9, 'mNight')}${policeMX(830, 1310, 1.9, { flip: true, armL: 12, armR: [84, 2, 2], look: [2.4, 0] })}</g>`, 'mNight'))
    + `<g${fadeOut(inn, 0.5)}>${popAt(kl + 0.2, 640, 760, newspaper('attack', 1.15), 0.6)}</g>`
    + layer(0.92, lit(`<g opacity="0"${walkIn(inn - 0.2, -120, 0.9)}>${castShadow(160, 1310, 1.85, 'mNight')}${brother(160, 1310, 1.85, 0, { mood: 'worried', look: [2.4, 0], armL: 10, armR: 12 })}</g>`
      + `<g opacity="0"${walkIn(inn, 140, 0.9)}>${castShadow(640, 1310, 1.85, 'mNight')}` + seq((op) => brother(640, 1310, 1.85, 1, { flip: true, armL: 10, armR: 12, ...op }),
        [[0, { mood: 'worried', look: [2.4, 0] }], [sk, { mood: 'sad', look: [2.4, 0.6] }]]) + '</g>', 'mNight'))
    + lit(castShadow(400, 1345, 2.2, 'mNight') + seq((op) => miguelHD(400, 1345, 2.2, op),
      [[0, { mood: 'surprised', look: [2.4, -0.4], armL: 10, armR: 12 }], [inn, { mood: 'determined', look: [0, 0], armL: 10, armR: 12 }],
        [sk, { mood: 'worried', look: [0, 1.6], armL: 10, armR: 44 }]]), 'mNight')
    + `<g opacity="0"${fadeIn(sk, 0.8)}>${glow(400, 900, 300, 0.25)}</g>`
    + layer(1.15, ironBars(jl + 0.05));
}

// 3 · led out to the squad; he blesses the soldiers and kneels to pray; "With all my heart, I forgive my enemies." (tilt-up + rack)
function scene3() {
  const bl = at(3, 'blessed'), kn = at(3, 'knelt'), st = at(3, 'Then he stood'), fg = at(3, 'With all my heart');
  return layer(0.78, lit(`<g opacity="0"${walkIn(0.6, 200, 1.6)}>` + seq((op) => squad([860, 780, 700, 620], 1262, 1.4, 'mPray', op),
      [[0, { look: [2.4, 0] }], [bl + 0.3, { look: [2.4, 0], mood: 'surprised' }], [kn + 0.6, { look: [2.4, 0], mood: 'stern' }], [fg + 0.5, { look: [2, 0.6], mood: 'sad' }]]) + '</g>', 'mPray'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(0.2, -150, 1.4)}>${castShadow(130, 1310, 1.9, 'mPray')}${soldierMX(130, 1310, 1.9, 3, { look: [2.4, 0] })}</g>`, 'mPray'))
    + `<g opacity="0"${fadeIn(kn, 0.8)}>${glow(420, 760, 360, 0.5)}</g>`
    + lit(castShadow(420, 1345, 2.25, 'mPray') + `<g${walkIn(0, -160, 1.6)}>` + seq((op) => miguelHD(420, 1345, 2.25, { propL: rosaryHand(1.3), ...op }),
      [[0, { mood: 'determined', look: [0, 0], armL: 14, armR: 14, propR: crucifixHand(1.1) }], [bl, { mood: 'tender', look: [2.6, 0], armL: 14, armR: 122, propR: crucifixHand(1.1) }],
        [kn, { mood: 'peaceful', look: [0, -1], kneel: true, armL: 34, armR: 34 }], [st, { mood: 'determined', look: [2.4, 0], armL: 16, armR: 30, propR: crucifixHand(1.1) }],
        [fg, { mood: 'tender', look: [2.4, 0], armL: 16, armR: 30, propR: crucifixHand(1.1), talk: [fg, fg + 2.4] }]]) + '</g>', 'mPray')
    + `<g opacity="0"${fadeIn(fg + 0.3, 0.6)}>${sparkles(14, 260, 620, 560, 1000, { seed: 9 })}</g>`
    + NEAR(bokeh(6, { seed: 15, sides: true }));
}

// 4 · he refuses the blindfold, opens his arms like a cross; "¡Viva Cristo Rey!" (dolly; the climax line, then a white flash)
function scene4() {
  const rf = at(4, 'refused'), op = at(4, 'opened'), cr = at(4, 'Then he cried'), vv = at(4, 'Viva'), ki = at(4, 'Long live'), end = at(4, 'King', 0.5);
  return layer(0.65, lit(`<g opacity="0"${fadeIn(op, 0.8)}>` + squad([600, 705, 810, 915, 1020], 1214, 1.15, 'mCross', { aim: true }) + '</g>', 'mCross'))
    + layer(0.92, lit(`<g${M.tw([{ at: rf + 0.5, dur: 1.0, from: { x: 0, opacity: 1 }, to: { x: 160, opacity: 0 }, ease: 'power1.in' }])}>${castShadow(700, 1310, 1.95, 'mCross')}`
      + policeMX(700, 1310, 1.95, { flip: true, armL: 12, armR: 60, propR: blindfold, look: [2.4, 0], mood: 'stern' }) + '</g>', 'mCross'))
    + `<g opacity="0"${fadeIn(op + 0.3, 1.0)}>${glow(420, 820, 460, 0.55)}</g>`
    + lit(castShadow(420, 1345, 2.3, 'mCross') + seq((o) => miguelHD(420, 1345, 2.3, { propR: crucifixHand(1.15), propL: rosaryHand(1.35), ...o }),
      [[0, { mood: 'determined', look: [2.4, 0], armL: 16, armR: 30 }], [op, { mood: 'peaceful', look: [0, 0], armL: 88, armR: 88 }],
        [cr, { mood: 'determined', look: [0, -0.6], armL: 88, armR: 88 }], [vv, { mood: 'determined', look: [0, -1], armL: 92, armR: 92, talk: [vv, vv + 1.5], halo: vv + 0.1 }],
        [ki, { mood: 'peaceful', look: [0, -1], armL: 92, armR: 92, halo: true }]]), 'mCross')
    + `<g opacity="0"${fadeIn(vv + 0.2, 0.5)}>${sparkles(18, 160, 700, 480, 1100, { seed: 21 })}</g>`
    + `<g opacity="0"${fadeIn(ki, 1.0)}><path d="M330 300 L510 300 L560 1345 L280 1345Z" fill="#fff4d8" opacity=".16"/></g>`
    + flash(end, 1.2)
    + NEAR(bokeh(7, { seed: 23, sides: true }));
}

// 5 · photographed to frighten Catholics; thousands at his funeral; the photos spread his last words (pull)
function scene5() {
  const ph = at(5, 'photographed'), fr = at(5, 'frighten'), th = at(5, 'thousands'), mt = at(5, 'They meant'), sp = at(5, 'Instead');
  const crowdRow = (y, s, n, x0, x1, d, seed) => Array.from({ length: n }, (_, k) => { const x = x0 + (x1 - x0) * k / (n - 1), i = k + seed;
    return i % 2 ? rebozoWoman(x, y, s, i, { mood: 'sad', look: [0, -0.4], armL: 26, armR: 26, propR: k % 3 === 0 ? flowers(1.1) : '', ph: (k * 0.29) % 1 })
      : mourner(x, y, s, i, { mood: 'sad', look: [0, -0.4], armL: 12, armR: 30, ph: (k * 0.37) % 1 }); }).join('');
  return layer(0.62, `<g opacity="0"${fadeIn(th, 0.9)}>${lit(crowdRow(1214, 1.0, 9, 80, 1000, 0.62, 1), 'mFuneral')}</g>`)
    + layer(0.72, `<g opacity="0"${fadeIn(sp, 0.8)}><g transform="translate(730,640)"><g${M.tw([{ at: sp, dur: 1.2, from: { y: 120 }, to: { y: 0 }, ease: 'power2.out' }])}>${vivaBanner(1.25)}</g></g>${glow(730, 700, 300, 0.4)}</g>`)
    + layer(0.78, `<g opacity="0"${fadeIn(th + 0.4, 0.9)}>${lit(crowdRow(1262, 1.3, 6, 140, 880, 0.78, 4), 'mFuneral')}</g>`)
    + layer(0.92, lit(`<g${fadeOut(th, 0.6)}>${castShadow(220, 1310, 1.9, 'mFuneral')}${photographer(220, 1310, 1.9, { mood: 'stern', look: [2.4, 0], armL: 40, armR: 46 })}`
      + `<g transform="translate(360,1310)">${boxCamera(ph + 0.3, 1.9)}</g></g>`, 'mFuneral'))
    + `<g${fadeOut(th + 0.2, 0.5)}>${popAt(fr, 720, 760, newspaper('photo', 1.2), 0.6)}</g>`
    + `<g opacity="0"${fadeIn(mt, 0.5)}><g${fadeOut(sp, 0.5)}><g transform="translate(720,780) scale(.9)">${newspaper('photo', 1)}</g></g></g>`
    + lit(`<g opacity="0"${walkIn(th - 0.2, -140, 1.2)}>${castShadow(380, 1345, 2.15, 'mFuneral')}` + seq((op) => rebozoWoman(380, 1345, 2.15, 1, { armL: 24, propR: flowers(1.3), ...op }),
      [[0, { mood: 'sad', look: [0, 0.6], armR: 30 }], [mt, { mood: 'worried', look: [2.4, -0.4], armR: 30 }], [sp, { mood: 'tender', look: [0.8, -1.4], armR: 40 }]]) + '</g>', 'mFuneral')
    + `<g opacity="0"${fadeIn(sp + 0.3, 0.6)}>${sparkles(16, 260, 820, 520, 900, { seed: 27 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#3a3030', seed: 7 }) + bokeh(6, { seed: 29, sides: true }));
}

// 6 · feast-day portrait: beatified in 1988; feast November 23 (arc-r)
function scene6() {
  const bt = at(6, 'beatified'), fd = at(6, 'feast day'), pr = at(6, 'pray for us');
  return `<g opacity="0"${fadeIn(bt, 0.8)}>${glow(460, 760, 420, 0.5)}</g>`
    + lit(castShadow(460, 1345, 2.35, 'mGlory') + seq((op) => miguelHD(460, 1345, 2.35, { halo: true, armL: 34, propL: palm_frond(1.0, -6, 2), armR: 30, propR: crucifixHand(1.15), ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [bt, { mood: 'happy', look: [2.2, -0.8] }], [fd, { mood: 'happy', look: [0, 0] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'mGlory')
    + `<g opacity="0"${fadeIn(bt + 0.3, 0.6)}>${sparkles(14, 260, 720, 520, 900, { seed: 31 })}</g>`
    + NEAR(bokeh(7, { seed: 33, sides: true }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

export const STORY = {
  slug: 'bl_miguel_pro_firing_squad', name: 'Bl_Miguel_Pro_Viva_Cristo_Rey',
  bg3d: './miguel_pro_firing_squad.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { miguel: { voice: 'em_alex', speed: 0.9 } },
  music: { story: 'a young Mexican priest in 1927, hunted for saying Mass in secret, who faced a firing squad with his arms open like a cross and cried "Long live Christ the King"',
    cues: { 1: 'Hushed and secretive: soft guitar and low strings, a quiet pulse, like sneaking through a city at night.',
      5: 'Mournful at first, a slow processional with solemn strings, then rising into a warm, hopeful swell.' } },
  thumb_hook: 'He faced the rifles with open arms', thumb_title: 'Blessed Miguel Pro', thumb_scene: 0, thumb_t: 4.6, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'blˈɛst miːɡˈɛl': 'blˈɛsᵻd miːɡˈɛl',                     // Blessed (title) -> BLESS-id
    'noʊvˈɛmbɚ twˈɛnti θɹˈiː': 'noʊvˈɛmbɚ twˈɛnti θˈɜːd',   // November 23 -> November twenty-third
  },
  scenes: [
    { kicker: 'MEXICO CITY · NOVEMBER 1927', title: 'Facing the Firing Squad', art: scene0, bg3d: 'mHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Five rifles were aimed at one unarmed priest.', 'He had no trial, and no weapon.', 'This is Blessed Miguel Pro.'] },
    { kicker: 'MEXICO · 1926', title: 'A Priest in Disguise', art: scene1, bg3d: 'mStreet', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['In 1926, Mexico shut its churches, and priests were hunted.', 'So Father Miguel wore disguises, and said Mass in secret.'] },
    { kicker: 'NOVEMBER 1927', title: 'Falsely Accused', art: scene2, bg3d: 'mNight', front3d: true, cam: { move: 'push', amt: 0.06, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Then someone tried to kill a former president.', 'Miguel was innocent, but he and his brothers were jailed.', 'He was 36, and had been sick for years.'] },
    { kicker: 'NOVEMBER 23, 1927', title: 'He Forgave Them', art: scene3, bg3d: 'mPray', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['On November 23, guards led him out to the firing squad.', 'He blessed the soldiers, and knelt to pray.', 'Then he stood and said:',
        { text: 'With all my heart, I forgive my enemies.', who: 'miguel' }] },
    { kicker: 'THE POLICE COURTYARD', title: '¡Viva Cristo Rey!', art: scene4, bg3d: 'mCross', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 1000 },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['He refused the blindfold, and opened his arms like a cross.', 'Then he cried out:', { text: '¡Viva Cristo Rey!', who: 'miguel' },
        { text: 'Long live Christ the King.', speed: 0.85 }] },
    { kicker: 'THE NEXT DAY', title: 'The Photos Backfired', art: scene5, bg3d: 'mFuneral', front3d: true, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['The government photographed it, to frighten Catholics.', 'But thousands filled the streets for his funeral.', 'They meant those photos to spread fear.',
        'Instead, they spread his last words.'] },
    { kicker: 'FEAST DAY · NOVEMBER 23', title: 'Blessed Miguel Pro', art: scene6, bg3d: 'mGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Pope John Paul II beatified him in 1988.', 'His feast day is November 23.', 'Blessed Miguel Pro, pray for us.'] },
  ],
};
