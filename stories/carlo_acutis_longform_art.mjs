// Pictures for the St. Carlo Acutis long-form (stories/carlo_acutis_longform.mjs): one art function per scene, in
// 1920x1080 coordinates, drawn from the narration (times from wordTimes). The 3D set behind each scene is in
// carlo_acutis_longform.bg3d.js; the character plane (depth 1) is 20 units away and its feet stand at art y 794.
// Exports for later landscape reels: carlo, kidCarlo, antonia, andrea, nanny, rajesh, popeFrancis, popeLeo, doctor, nurse,
// friar, mcSister, LIGHT_L, litL, shadowL, bed, sofa, desk, crt, tapestry, portrait, easelPanel, reliquary, sleepingBag, cup.
import '../landscape.mjs';
import { W, H, M, GOLD, sparkles, bokeh, rosary, book, dark, light, f, rng, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { monstrance, laptop, gamepad, codeTag, webPage, globe } from './carlo_acutis.mjs';
import { babyBundle } from './aparecida.mjs';
import { mitre } from './francis.mjs';

const at = wordTimes('longform_st_carlo_acutis');
const Y = 794, Y95 = 781, Y92 = 774, Y85 = 756;   // feet on the 3D ground by card depth (1, 0.95, 0.92, 0.85)
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const hglow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#haloGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.6) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.6) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const showAt = (t, svg, dur = 0.6) => `<g opacity="0"${fadeIn(t, dur)}>${svg}</g>`;
const hideAt = (t, svg, dur = 0.6) => `<g${fadeOut(t, dur)}>${svg}</g>`;
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const at2 = (x, y, svg, s = 1) => `<g transform="translate(${f(x)},${f(y)}) scale(${s})">${svg}</g>`;

// ================================================================ one light per scene (keys = the 3D set-up names)
export const LIGHT_L = {
  sq_hook:   { key: '#fff0d0', from: 'r', tint: '#fff2dc', amt: 0.06, rim: '#fff6e0', rimOp: 0.7 },
  sq_canon:  { key: '#ffc888', from: 'l', tint: '#ffd8a8', amt: 0.12, rim: '#fff0c8', rimOp: 0.85 },
  sq_youth:  { key: '#fff0d0', from: 'r', tint: '#fff2dc', amt: 0.05, rim: '#fff6e0', rimOp: 0.65 },
  sq_mourn:  { key: '#ffb890', from: 'l', tint: '#c8a8b8', amt: 0.18, rim: '#ffc8a0', rimOp: 0.7 },
  mi_day:    { key: '#fff0d4', from: 'r', tint: '#fff4e0', amt: 0.05, rim: '#fff6e4', rimOp: 0.65 },
  mi_dusk:   { key: '#ffb880', from: 'l', tint: '#ffc4b0', amt: 0.14, rim: '#ffcfa0', rimOp: 0.85 },
  mi_night:  { key: '#ffd8a8', from: 'r', tint: '#a8b0e0', amt: 0.2, rim: '#ffd8a0', rimOp: 0.8 },
  london:    { key: '#fff0dc', from: 'l', tint: '#eeeef4', amt: 0.06, rim: '#fff6ea', rimOp: 0.6 },
  room_living:  { key: '#fff0d4', from: 'r', tint: '#fff0dc', amt: 0.07, rim: '#fff4dc', rimOp: 0.6 },
  room_kitchen: { key: '#fff2d8', from: 'r', tint: '#fff2dc', amt: 0.07, rim: '#fff4dc', rimOp: 0.6 },
  room_bedroom: { key: '#fff4dc', from: 'r', tint: '#eef2fa', amt: 0.06, rim: '#fff4e0', rimOp: 0.6 },
  room_study:   { key: '#ffd8a0', from: 'r', tint: '#a8b4e8', amt: 0.18, rim: '#a8d8ff', rimOp: 0.75 },
  room_sick:    { key: '#e8e0e0', from: 'r', tint: '#e8e0e4', amt: 0.1, rim: '#f4ece8', rimOp: 0.5 },
  room_hospital:{ key: '#f4f8ff', from: 'r', tint: '#eef4f4', amt: 0.07, rim: '#f4fcff', rimOp: 0.6 },
  room_hospNight:{ key: '#c8d8ff', from: 'r', tint: '#a8b4e0', amt: 0.2, rim: '#fff0c8', rimOp: 0.8 },
  room_florence:{ key: '#ffd0b0', from: 'r', tint: '#ffe0d0', amt: 0.1, rim: '#ffd8b8', rimOp: 0.7 },
  ch_parish:    { key: '#ffe0b0', from: 'back', tint: '#ffe8c8', amt: 0.1, rim: '#ffe4b0', rimOp: 0.8 },
  ch_adoration: { key: '#ffd090', from: 'back', tint: '#e8b8a8', amt: 0.18, rim: '#ffd080', rimOp: 0.9 },
  ch_hall:      { key: '#fff0d0', from: 'r', tint: '#fff4e4', amt: 0.05, rim: '#fff6e8', rimOp: 0.6 },
  ch_basilica:  { key: '#ffe0b0', from: 'back', tint: '#ffe8c8', amt: 0.1, rim: '#ffe8b8', rimOp: 0.8 },
  sea:          { key: '#fff4dc', from: 'r', tint: '#fff6ea', amt: 0.05, rim: '#fff8ec', rimOp: 0.7 },
  um_dusk:      { key: '#ffb880', from: 'l', tint: '#ffc4a8', amt: 0.14, rim: '#ffd0a0', rimOp: 0.85 },
  um_day:       { key: '#ffe8c0', from: 'r', tint: '#fff4e0', amt: 0.05, rim: '#fff6e0', rimOp: 0.65 },
  um_pilgrims:  { key: '#ffe8c0', from: 'r', tint: '#fff4e0', amt: 0.05, rim: '#fff6e0', rimOp: 0.65 },
  um_glory:     { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.9 },
  brazil:       { key: '#ffe0b0', from: 'l', tint: '#ffeacc', amt: 0.08, rim: '#fff0d0', rimOp: 0.7 },
};
let LID = 0;
/** Light SVG like the 3D set: a colour wash plus a rim light on the edges facing the light (landscape filter region). */
export const litL = (svg, mode) => {
  const L = LIGHT_L[mode], id = `litl${++LID}`, d = 4;
  const offs = { l: [[d, 0]], r: [[-d, 0]], back: [[d, 0], [-d, 0], [0, d]], top: [[0, d], [d * 0.6, d * 0.6], [-d * 0.6, d * 0.6]] }[L.from];
  const rims = offs.map(([dx, dy], k) => `<feOffset in="SourceAlpha" dx="${dx}" dy="${dy}" result="o${k}"/><feComposite in="SourceAlpha" in2="o${k}" operator="out" result="e${k}"/>`).join('');
  const merge = offs.map((_, k) => `<feMergeNode in="e${k}"/>`).join('');
  return `<defs><filter id="${id}" filterUnits="userSpaceOnUse" x="-400" y="-300" width="${W + 800}" height="${H + 600}" color-interpolation-filters="sRGB">`
    + `<feFlood flood-color="${L.tint}" result="t"/><feBlend in="SourceGraphic" in2="t" mode="multiply" result="m"/><feComposite in="m" in2="SourceAlpha" operator="in" result="mm"/>`
    + `<feComposite in="SourceGraphic" in2="mm" operator="arithmetic" k1="0" k2="${f(1 - L.amt)}" k3="${f(L.amt)}" k4="0" result="base"/>`
    + `${rims}<feMerge result="edge">${merge}</feMerge><feGaussianBlur in="edge" stdDeviation="1.4" result="eb"/>`
    + `<feFlood flood-color="${L.rim}" flood-opacity="${L.rimOp}"/><feComposite in2="eb" operator="in"/><feComposite in2="SourceAlpha" operator="in" result="rim"/>`
    + `<feMerge><feMergeNode in="base"/><feMergeNode in="rim"/></feMerge></filter></defs><g filter="url(#${id})">${svg}</g>`;
};
/** A soft cast shadow thrown away from the scene's light. */
export const shadowL = (x, y, s, mode) => {
  const from = LIGHT_L[mode].from;
  const [dx, dy, rx, ry, rot] = { l: [60, 6, 90, 12, 4], r: [-60, 6, 90, 12, -4], back: [0, 16, 64, 20, 0], top: [0, 3, 70, 12, 0] }[from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".24" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ characters (hd rig)
const SKC = '#f2c9a6', HAIRC = '#3a2418', RED = '#cf3b3b', JEANS = '#3f5f96';
const polo = (c) => `<path d="M-23 -213 L-5 -192 L0 -205 L5 -192 L23 -213 Q0 -201 -23 -213Z" fill="${light(c, 0.12)}"/><path d="M0 -204 V-176" stroke="${dark(c, 0.3)}" stroke-width="2.4"/>`
  + `<circle cx="0" cy="-193" r="2.2" fill="#f6f0e2"/><circle cx="0" cy="-182" r="2.2" fill="#f6f0e2"/>`;
const sneakers = '<path d="M-33 -1 h32 M1 -1 h32" stroke="#c9ccd6" stroke-width="3"/><path d="M-26 -9 l10 -3 M8 -9 l10 -3" stroke="#2b4fa8" stroke-width="2.6" stroke-linecap="round"/>';
const gown = '<path d="M-20 -210 Q0 -196 20 -210" stroke="#8ab0c8" stroke-width="3" fill="none"/><path d="M-30 -150 h60 M-34 -110 h68" stroke="#9ac0d4" stroke-width="2" opacity=".5"/>';
/** St. Carlo Acutis as a teenager: curly dark hair, red polo, jeans, white sneakers. outfit: 'polo' | 'white' (shirt) | 'gown' (hospital). */
export const carlo = (x, y, s, { outfit = 'polo', over = '', ...o } = {}) => {
  const look = outfit, top = look === 'white' ? '#f6f4ee' : look === 'gown' ? '#c8e0ec' : RED;
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.15), trousers: look === 'gown' ? '#c8e0ec' : JEANS, shoes: look === 'gown' ? '#e8e4dc' : '#f6f4ee', belt: false,
    skin: SKC, hair: HAIRC, hairStyle: 'curly', beard: null, age: 'young', iris: '#5a3a22', ...o,
    over: (look === 'gown' ? gown : polo(top)) + (o.kneel ? '' : sneakers) + over });
};
/** Carlo as a little boy (0.62x of the adult scale on the same line). */
export const kidCarlo = (x, y, s, { white = false, over = '', ...o } = {}) => hd(x, y, s, { top: white ? '#f8f6f0' : '#4a7ab8', plain: true, trim: white ? '#d8d4c8' : '#3a5a8a',
  trousers: white ? '#2e3a5a' : '#c8a070', shoes: '#3a2a2a', belt: false, skin: SKC, hair: HAIRC, hairStyle: 'curly', beard: null, age: 'young', ...o, over: (white ? polo('#f8f6f0') : '') + over });
/** His mother, Antonia: long dark hair, a blue dress. */
export const antonia = (x, y, s, o = {}) => hd(x, y, s, { top: '#5a7ab0', plain: true, trim: '#3e5a8a', belt: false, skin: SKC, hair: '#3a2a20', hairStyle: 'long', beard: null, age: 'young', shoes: '#3a2a2a', iris: '#4a3a2a', ...o });
/** His father, Andrea: dark suit and tie. */
export const andrea = (x, y, s, o = {}) => hd(x, y, s, { top: '#3a3e52', plain: true, trim: '#2a2e40', trousers: '#2e3040', lapels: '#f6f0e2', tie: '#8a2a3a', belt: false, skin: '#eac2a0', hair: '#4a3424', beard: null, age: 'young', ...o });
const apron = '<path d="M-30 -180 Q0 -186 30 -180 L40 -40 Q0 -30 -40 -40Z" fill="#f6f2ea"/><path d="M-30 -180 Q0 -186 30 -180" stroke="#d8d0c0" stroke-width="3" fill="none"/>';
/** His nanny, a devout Polish woman: grey curls, a plum dress and an apron. */
export const nanny = (x, y, s, o = {}) => hd(x, y, s, { top: '#7a4e7a', plain: true, trim: '#5a3a5a', belt: false, skin: '#f0caa8', hair: '#cfc6bc', hairStyle: 'curly', beard: null, age: 'mid', shoes: '#3a2a2a', ...o, over: apron + (o.over || '') });
/** Rajesh, the family's helper from Mauritius. */
export const rajesh = (x, y, s, o = {}) => hd(x, y, s, { top: '#f0e6d2', plain: true, trim: '#d8c8a8', trousers: '#4a4a5a', belt: false, skin: '#a86d45', hair: '#1e1614', beard: null, age: 'young', iris: '#3a2418', ...o });
const zucchetto = '<path d="M-26 -286 Q0 -302 26 -286 Q0 -292 -26 -286Z" fill="#fbf8f2"/><ellipse cx="0" cy="-289" rx="22" ry="7" fill="#fbf8f2"/>';
const pectoral = (c = '#d8d8d8') => `<path d="M-14 -206 Q0 -180 0 -170 Q0 -180 14 -206" stroke="${c}" stroke-width="2" fill="none"/><path d="M0 -172 v26 M-8 -163 h16" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
/** Pope Francis: white cassock and skullcap, a plain silver cross. */
export const popeFrancis = (x, y, s, o = {}) => hd(x, y, s, { top: '#fbf8f2', plain: true, trim: '#e8e2d4', belt: '#f4efe4', skin: '#eac2a0', hair: '#e8e4dc', hairStyle: 'short', beard: null, age: 'old', shoes: '#2a2020', iris: '#4a3a2a', ...o, over: zucchetto + pectoral() + (o.over || '') });
/** Pope Leo XIV for the canonization Mass: white and gold vestments, mitre, the papal cross. */
const ferula = `<g><rect x="-4" y="-250" width="8" height="300" rx="3" fill="${GOLD}"/><path d="M0 -300 V-238 M-22 -276 H22" stroke="${GOLD}" stroke-width="9" stroke-linecap="round"/><circle cy="-276" r="44" fill="url(#haloGlow)" opacity=".5"/></g>`;
export const popeLeo = (x, y, s, o = {}) => hd(x, y, s, { top: '#fbf6ea', plain: true, trim: GOLD, mantle: '#fbf4e4', lining: GOLD, belt: false, skin: '#eebf9e', hair: '#a8a098', beard: null, age: 'mid', shoes: '#c9a24a', iris: '#5a5a6a',
  armR: 26, propR: ferula, ...o, over: mitre + pectoral(GOLD) + (o.over || '') });
const steth = '<path d="M-16 -208 Q-22 -170 -8 -160 M16 -208 Q22 -170 8 -160" stroke="#3a3a4a" stroke-width="3" fill="none"/><circle cx="0" cy="-156" r="6" fill="#9aa0aa"/><path d="M-8 -160 Q0 -150 0 -156" stroke="#3a3a4a" stroke-width="3" fill="none"/>';
/** A doctor in a white coat with a stethoscope. */
export const doctor = (x, y, s, o = {}) => hd(x, y, s, { top: '#f6f8fa', plain: true, trim: '#d8dce4', trousers: '#4a5a7a', lapels: '#9ab8d8', belt: false, skin: '#e8c0a0', hair: '#5a4a3a', beard: null, age: 'mid', ...o, over: steth + (o.over || '') });
/** A nurse in teal scrubs. */
export const nurse = (x, y, s, o = {}) => hd(x, y, s, { top: '#7ab8c0', plain: true, trim: '#5a9aa4', trousers: '#7ab8c0', belt: false, skin: '#d9a47e', hair: '#2a1c14', hairStyle: 'long', beard: null, age: 'young', shoes: '#f0f0f0', ...o });
/** A Capuchin friar: brown habit with a pointed hood and a white cord, full beard. */
const hood = '<path d="M-40 -214 Q0 -200 40 -214 Q44 -190 30 -178 Q0 -170 -30 -178 Q-44 -190 -40 -214Z" fill="#5a3e28"/>';
export const friar = (x, y, s, o = {}) => hd(x, y, s, { top: '#6a4a32', plain: true, trim: '#5a3e28', belt: '#efe6d2', skin: '#e2b48f', hair: '#4a3424', beard: '#4a3424', beardStyle: 'full', age: 'mid', ...o, over: hood + (o.over || '') });
/** A Missionary of Charity: white sari with blue borders over the head. */
const sariBands = '<path d="M-49 -252 Q-50 -300 0 -304 Q50 -300 49 -252" stroke="#3a6ab8" stroke-width="5" fill="none"/><path d="M-36 -200 L-40 -30 M36 -200 L40 -30" stroke="#3a6ab8" stroke-width="5" opacity=".9"/>';
export const mcSister = (x, y, s, o = {}) => hd(x, y, s, { top: '#fbfaf6', plain: true, trim: '#3a6ab8', belt: false, veil: '#fbfaf6', veilHair: 'hidden', skin: '#a86d45', age: 'mid', beard: null, shoes: '#6a4a32', ...o, over: sariBands + (o.over || '') });
const beanie = '<path d="M-42 -266 Q-44 -314 0 -316 Q44 -314 42 -266Z" fill="#8a3a3a"/><path d="M-43 -270 Q0 -280 43 -270 L43 -260 Q0 -270 -43 -260Z" fill="#6a2a2a"/>';
const homeless = (x, y, s, o = {}) => hd(x, y, s, { top: '#5a5a4a', plain: true, trim: '#4a4a3a', mantle: '#6a5a3a', skin: '#d9a47e', hair: '#6a5a4a', hairStyle: 'wild', beard: '#7a6a5a', beardStyle: 'full', age: 'mid', shoes: '#3a2a22', kneel: true, ...o, over: beanie + (o.over || '') });
const priest = (x, y, s, o = {}) => hd(x, y, s, { top: '#1e1a22', plain: true, trim: '#141018', belt: false, skin: '#e2b48f', hair: '#8a8078', beard: null, age: 'old', shoes: '#141018', ...o,
  over: '<rect x="-6" y="-212" width="12" height="8" fill="#fbfaf6"/>' + (o.over || '') });
const oldLady = (x, y, s, k, o = {}) => hd(x, y, s, { top: ['#3a3a4a', '#4a3a3a', '#2e3a46'][k % 3], plain: true, trim: '#2a2a32', belt: false, skin: ['#f0caa8', '#e8bc9a', '#e2b48f'][k % 3], hair: '#d8d2ca', hairStyle: 'curly', beard: null, age: 'old', shoes: '#2a2020', ...o });
const kid = (x, y, s, k, o = {}) => hd(x, y, s, { top: ['#e8a040', '#5a9a5a', '#c85a7a', '#5a8ac8'][k % 4], plain: true, trim: '#ffffff', trousers: ['#3a4a6a', '#6a4a3a', '#3a3a4a', '#5a5a6a'][k % 4], belt: false, skin: ['#f0c9a8', '#d9a47e', '#a86d45', '#e8bc9a'][k % 4],
  hair: ['#3a2418', '#8a5a2a', '#1e1614', '#c89a5a'][k % 4], hairStyle: k % 2 ? 'long' : 'curly', beard: null, age: 'young', ...o });

// ================================================================ props and set pieces
export const sleepingBag = `<g><rect x="-40" y="-34" width="80" height="44" rx="22" fill="#3a6ab0"/><rect x="-40" y="-34" width="80" height="44" rx="22" fill="none" stroke="#2a4a80" stroke-width="3"/>`
  + `<circle cx="-30" cy="-12" r="14" fill="#5a8ad0"/><path d="M-30 -12 m-8 0 a8 8 0 1 1 8 8" stroke="#2a4a80" stroke-width="2.5" fill="none"/><path d="M-10 -34 v44 M14 -34 v44" stroke="#e8c04a" stroke-width="3"/></g>`;
export const cup = `<g><path d="M-12 -26 L12 -26 L9 2 L-9 2Z" fill="#f6f0e2"/><path d="M12 -20 q9 0 8 8 q-1 6 -9 6" stroke="#f6f0e2" stroke-width="3" fill="none"/><rect x="-12" y="-26" width="24" height="5" fill="#c86a3a"/>`
  + `<g${M.sway(4, 2.4)}><path d="M-4 -32 q-6 -8 0 -16 q6 -8 0 -16 M5 -32 q-6 -8 0 -16" stroke="#fff" stroke-width="2.4" fill="none" opacity=".55" stroke-linecap="round"/></g></g>`;
const soupPot = `<g><ellipse cx="0" cy="-30" rx="34" ry="8" fill="#9aa0aa"/><path d="M-34 -30 L-30 4 Q0 12 30 4 L34 -30Z" fill="#7a808a"/><path d="M-40 -24 h-8 M40 -24 h8" stroke="#5a606a" stroke-width="5" stroke-linecap="round"/>`
  + `<g${M.sway(4, 2.6)}><path d="M-10 -40 q-6 -8 0 -16 M8 -40 q-6 -8 0 -16" stroke="#fff" stroke-width="2.4" fill="none" opacity=".5"/></g></g>`;
const host = (r = 16) => `<g><circle r="${r * 2.6}" fill="url(#haloGlow)"/><circle r="${r}" fill="#fffaf0"/><path d="M0 ${-r * 0.55} V${r * 0.55} M${-r * 0.45} ${-r * 0.1} H${r * 0.45}" stroke="#e8d8b0" stroke-width="2"/></g>`;
const chalice = `<g><path d="M-16 -46 Q-16 -22 0 -18 Q16 -22 16 -46Z" fill="${GOLD}"/><rect x="-3" y="-18" width="6" height="16" fill="#c9a24a"/><path d="M-14 0 Q0 -8 14 0Z" fill="${GOLD}"/></g>`;
export const reliquary = `<g><circle cy="-60" r="58" fill="url(#haloGlow)" opacity=".9"/><rect x="-3" y="-40" width="6" height="44" fill="#c9a24a"/><circle cy="-60" r="22" fill="${GOLD}"/><circle cy="-60" r="13" fill="#fff6e0"/><circle cy="-60" r="6" fill="#cf3b3b" opacity=".6"/>`
  + `<path d="M0 -84 v-16 M-7 -94 h14" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/><path d="M-18 4 Q0 -8 18 4Z" fill="${GOLD}"/></g>`;
const ball = `<g><circle r="20" fill="#fbfaf6"/><path d="M0 -8 l7.6 5.5 -2.9 9 h-9.4 l-2.9 -9Z" fill="#2a2a32"/><path d="M0 -8 V-20 M7.6 -2.5 L19 -6 M4.7 6.5 L11 16 M-4.7 6.5 L-11 16 M-7.6 -2.5 L-19 -6" stroke="#2a2a32" stroke-width="2"/></g>`;
const suitcase = `<g><rect x="-44" y="-62" width="88" height="62" rx="8" fill="#a8683e"/><rect x="-44" y="-62" width="88" height="10" rx="5" fill="#c88a5a"/><path d="M-14 -62 v-10 h28 v10" stroke="#5a3a22" stroke-width="5" fill="none"/>`
  + `<path d="M-28 -62 V0 M28 -62 V0" stroke="#7a4a2a" stroke-width="5"/><rect x="10" y="-44" width="22" height="14" rx="2" fill="#f6f0e2"/><path d="M14 -40 h14 M14 -35 h10" stroke="#cf3b3b" stroke-width="2"/></g>`;
const hourglass = `<g><rect x="-26" y="-74" width="52" height="8" rx="3" fill="#8a5a36"/><rect x="-26" y="-2" width="52" height="8" rx="3" fill="#8a5a36"/>`
  + `<path d="M-20 -66 Q-20 -40 0 -34 Q20 -40 20 -66Z M-20 -2 Q-20 -28 0 -34 Q20 -28 20 -2Z" fill="#e8f0f8" opacity=".7"/><path d="M-14 -60 Q0 -42 14 -60Z" fill="#e8c06a"/><path d="M-16 -4 Q0 -22 16 -4Z" fill="#e8c06a"/>`
  + `<path d="M0 -34 V-6" stroke="#e8c06a" stroke-width="2"${M.flick(0.4, 0, 0.4)}/></g>`;
const thermometer = '<g transform="rotate(30)"><rect x="-4" y="-46" width="8" height="46" rx="4" fill="#f6f6f6"/><rect x="-2" y="-30" width="4" height="28" fill="#cf3b3b"/><circle cy="0" r="6" fill="#cf3b3b"/></g>';
const clipboard = '<g><rect x="-26" y="-60" width="52" height="68" rx="4" fill="#a87a4a"/><rect x="-20" y="-52" width="40" height="54" fill="#fbf8f0"/><rect x="-10" y="-64" width="20" height="9" rx="2" fill="#9aa0aa"/><path d="M-14 -40 h28 M-14 -30 h22 M-14 -20 h26 M-14 -10 h18" stroke="#9aa0aa" stroke-width="2.4"/></g>';
const doc = (s = 1) => `<g transform="scale(${s})"><rect x="-60" y="-78" width="120" height="156" rx="6" fill="#fbf6ea"/><path d="M-40 -50 h80 M-40 -34 h70 M-40 -18 h80 M-40 -2 h60 M-40 14 h74" stroke="#c8b890" stroke-width="5" stroke-linecap="round"/>`
  + `<circle cx="26" cy="46" r="22" fill="#cf3b3b"/><circle cx="26" cy="46" r="15" fill="none" stroke="#f2c46b" stroke-width="3"/><path d="M16 66 l-8 22 l12 -6 l6 10 l4 -24 M36 66 l8 22 l-12 -6 l-6 10" fill="#cf3b3b"/></g>`;
const photoCard = (c, s = 1, map = false) => `<g transform="scale(${s})"><rect x="-44" y="-36" width="88" height="72" rx="6" fill="#fbf8f0"/><rect x="-38" y="-30" width="76" height="50" fill="${c}"/>`
  + (map ? '<path d="M-30 -20 q14 6 24 -2 q12 10 30 0 M-30 4 q20 -8 34 4 q8 -6 22 2" stroke="#fbf8f0" stroke-width="3" fill="none" opacity=".7"/><circle cx="8" cy="-6" r="5" fill="#cf3b3b"/>'
    : `<circle cx="0" cy="-5" r="14" fill="url(#haloGlow)"/><circle cx="0" cy="-5" r="8" fill="#fffaf0"/>`) + '<rect x="-30" y="25" width="50" height="5" rx="2" fill="#c8b890"/></g>';
const heart = (c = '#e25a6a', s = 1) => `<g transform="scale(${s})"><path d="M0 14 C-34 -8 -20 -36 0 -20 C20 -36 34 -8 0 14Z" fill="${c}"/></g>`;
const dove = (s = 1) => `<g transform="scale(${s})"><path d="M-30 0 Q-10 -18 10 -8 Q24 -24 40 -22 Q30 -10 34 0 Q14 14 -10 8 Q-24 14 -36 10Z" fill="#fbfaf6"/><circle cx="30" cy="-14" r="2" fill="#2b1d14"/><path d="M38 -16 l8 2 l-8 2" fill="#f2b04a"/></g>`;
const tau = (s = 1) => `<g transform="scale(${s})"><circle cy="-30" r="44" fill="url(#haloGlow)"/><path d="M-26 -60 H26 M0 -60 V0" stroke="#8a5a36" stroke-width="12" stroke-linecap="round"/></g>`;
const shell = `<g><circle cy="-10" r="40" fill="url(#haloGlow)"/><path d="M-26 0 Q-30 -30 0 -36 Q30 -30 26 0 Q0 8 -26 0Z" fill="#f6efe2"/><path d="M0 -34 V2 M-12 -32 L-8 2 M12 -32 L8 2 M-22 -24 L-17 0 M22 -24 L17 0" stroke="#d8c8b0" stroke-width="2"/>`
  + `<g${M.bob(4, 1.6)}><path d="M0 12 q-5 8 0 12 q5 -4 0 -12Z" fill="#8ac8f0"/></g></g>`;
const thought = (svg, w = 200, h = 140) => `<g><ellipse cx="0" cy="0" rx="${w / 2}" ry="${h / 2}" fill="#fbf8f2" opacity=".95"/><circle cx="${-w * 0.32}" cy="${h * 0.62}" r="16" fill="#fbf8f2" opacity=".95"/><circle cx="${-w * 0.44}" cy="${h * 0.86}" r="9" fill="#fbf8f2" opacity=".95"/>${svg}</g>`;
/** A rectangular wall clock / TV / CRT and other furniture. Bed and sofa use the "upper body above the blanket" trick:
 * draw back() behind the character and front() over it. */
export const bed = (x, y, s = 1, { blanket = '#a8c8e0', frame = '#d8dcdc', hospital = true } = {}) => ({
  back: at2(x, y, `<rect x="-150" y="-300" width="22" height="300" rx="8" fill="${frame}"/><rect x="-160" y="-310" width="190" height="20" rx="10" fill="${dark(frame, 0.1)}"/>`
    + `<ellipse cx="-40" cy="-200" rx="90" ry="34" fill="#fbfaf6"/>`, s),
  front: at2(x, y, `<path d="M-170 -168 Q40 -180 250 -166 L250 -40 Q40 -30 -170 -40Z" fill="${blanket}"/><path d="M-170 -168 Q40 -180 250 -166 L250 -150 Q40 -164 -170 -152Z" fill="${light(blanket, 0.35)}"/>`
    + `<path d="M-120 -120 Q0 -112 120 -126 M-100 -80 Q30 -72 200 -86" stroke="${dark(blanket, 0.2)}" stroke-width="3" fill="none" opacity=".6"/>`
    + `<rect x="-178" y="-42" width="436" height="26" rx="6" fill="${frame}"/>` + (hospital ? `<path d="M-160 -16 v14 M230 -16 v14" stroke="${dark(frame, 0.3)}" stroke-width="8"/><circle cx="-160" cy="-2" r="7" fill="#3a3a44"/><circle cx="230" cy="-2" r="7" fill="#3a3a44"/>`
      + `<path d="M190 -190 h56 v-30" stroke="#b8bcc4" stroke-width="5" fill="none"/>` : `<rect x="-178" y="-16" width="20" height="16" fill="${frame}"/><rect x="238" y="-16" width="20" height="16" fill="${frame}"/>`), s),
});
export const sofa = (x, y, s = 1, c = '#8a5a4a') => ({
  back: at2(x, y, `<rect x="-210" y="-330" width="420" height="230" rx="46" fill="${dark(c, 0.1)}"/><path d="M-170 -300 Q0 -320 170 -300" stroke="${light(c, 0.15)}" stroke-width="6" fill="none" opacity=".6"/>`, s),
  front: at2(x, y, `<rect x="-210" y="-140" width="420" height="80" rx="24" fill="${c}"/><rect x="-236" y="-190" width="60" height="150" rx="26" fill="${light(c, 0.08)}"/><rect x="176" y="-190" width="60" height="150" rx="26" fill="${light(c, 0.08)}"/>`
    + `<path d="M-150 -175 Q0 -190 150 -170 L170 -70 Q0 -60 -170 -70Z" fill="#d8b46a"/><path d="M-120 -140 Q0 -150 140 -132" stroke="#b8944a" stroke-width="3" fill="none"/><rect x="-200" y="-60" width="16" height="60" fill="${dark(c, 0.3)}"/><rect x="184" y="-60" width="16" height="60" fill="${dark(c, 0.3)}"/>`, s),
});
export const desk = (x, y, s = 1) => at2(x, y, '<rect x="-260" y="-190" width="520" height="22" rx="5" fill="#8a5a36"/><rect x="-260" y="-172" width="520" height="8" fill="#6a4226"/>'
  + '<rect x="-246" y="-166" width="20" height="166" fill="#6a4226"/><rect x="226" y="-166" width="20" height="166" fill="#6a4226"/><rect x="100" y="-166" width="126" height="110" fill="#7a4e2e"/><rect x="150" y="-120" width="28" height="7" rx="3" fill="#c9a24a"/>', s);
/** A 2000s CRT monitor with lines of code typing in (codeAt = when the code starts). */
export const crt = (x, y, s = 1, codeAt = 0, screen = '#1a2a3a') => {
  let lines = ''; const r = rng(7);
  for (let k = 0; k < 7; k++) { const w = 40 + r() * 90, c = ['#7ee08a', '#8ac8f0', '#f2c46b', '#e8a0c8'][k % 4]; lines += `<rect x="${-80 + (k % 3) * 12}" y="${-150 + k * 15}" width="${f(w)}" height="7" rx="3" fill="${c}" opacity="0"${fadeIn(codeAt + k * 0.35, 0.2)}/>`; }
  return at2(x, y, `<path d="M-110 -180 L110 -180 L96 -16 L-96 -16Z" fill="#d8d4c8"/><rect x="-96" y="-170" width="192" height="140" rx="10" fill="#cfcabe"/><rect x="-86" y="-162" width="172" height="124" rx="8" fill="${screen}"/>`
    + `<rect x="-86" y="-162" width="172" height="124" rx="8" fill="url(#haloGlow)" opacity=".25"/>${lines}<rect x="-30" y="-16" width="60" height="16" fill="#bcb8ac"/><rect x="-60" y="-2" width="120" height="8" rx="3" fill="#b0ac9e"/>`, s);
};
/** A gold-framed portrait (cardboard-cutout figure inside), for the tapestry and the memorial portraits. */
export const portrait = (x, y, s, inner, { frame = '#c9a24a', bg = '#2f5a9a', w = 300, h = 400 } = {}) => at2(x, y, `<rect x="${-w / 2 - 14}" y="${-h - 14}" width="${w + 28}" height="${h + 28}" rx="6" fill="${frame}"/>`
  + `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${bg}"/><defs><clipPath id="pc${x}${y}"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}"/></clipPath></defs>`
  + `<g clip-path="url(#pc${x}${y})"><circle cx="0" cy="${-h * 0.62}" r="${w * 0.6}" fill="url(#haloGlow)"/>${inner}</g>`, s);
/** The Assisi tapestry of Blessed Carlo: unrolls (grow) at t. */
export const tapestry = (x, y, s, t, o = {}) => at2(x, y, `<g${M.in('grow', t, 1.4, 0, 0)}><rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/>`
  + `<rect x="-128" y="20" width="256" height="400" fill="#2f5a9a"/><circle cx="0" cy="160" r="150" fill="url(#haloGlow)"/>`
  + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
  + `<g${M.in('pop', t + 1.0, 0.8, 0, 300)}>${carlo(0, 408, 1.1, { halo: true, mood: 'happy', armL: [26, 2, 3], armR: [30, 2, 3], propR: monstrance(0.62), ...o })}</g></g>`
  + '<rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/>', s);
/** An exhibition panel on an easel: a title bar, a photo, text lines (a Eucharistic miracle). */
export const easelPanel = (x, y, s, c, seed = 1) => {
  const r = rng(seed);
  return at2(x, y, '<path d="M-60 0 L-20 -330 M60 0 L20 -330 M0 -330 V-60" stroke="#7a5232" stroke-width="10" stroke-linecap="round"/>'
    + `<rect x="-110" y="-360" width="220" height="250" rx="6" fill="#fbf6ea"/><rect x="-110" y="-360" width="220" height="34" rx="6" fill="#8a2a3a"/><rect x="-80" y="-350" width="${f(100 + r() * 50)}" height="12" rx="6" fill="#f2c46b"/>`
    + `<rect x="-96" y="-316" width="110" height="96" rx="4" fill="${c}"/><circle cx="-41" cy="-268" r="22" fill="url(#haloGlow)"/><circle cx="-41" cy="-268" r="12" fill="#fffaf0"/>`
    + [0, 1, 2, 3, 4].map((k) => `<rect x="24" y="${-312 + k * 18}" width="${f(50 + r() * 22)}" height="8" rx="4" fill="#c8b890"/>`).join('')
    + [0, 1, 2].map((k) => `<rect x="-96" y="${-206 + k * 18}" width="${f(150 + r() * 40)}" height="8" rx="4" fill="#c8b890"/>`).join(''), s);
};
const ivPole = (x, y, s = 1) => at2(x, y, '<rect x="-4" y="-420" width="8" height="420" fill="#b8bcc4"/><path d="M-40 0 h80" stroke="#8a8e96" stroke-width="8" stroke-linecap="round"/><path d="M-24 -420 h48" stroke="#b8bcc4" stroke-width="5"/>'
  + '<path d="M14 -420 v12 q-4 0 -4 8 v52 q0 8 8 8 h12 q8 0 8 -8 v-52 q0 -8 -4 -8 v-12Z" fill="#e8f4fa" opacity=".9"/><rect x="14" y="-380" width="24" height="30" fill="#bfe4f6" opacity=".7"/><path d="M26 -340 Q30 -260 -10 -200" stroke="#d8e4ea" stroke-width="2.5" fill="none"/>', s);
const tv = (x, y, s = 1, offAt = null) => at2(x, y, '<rect x="-130" y="-170" width="260" height="160" rx="12" fill="#2a2a32"/><rect x="-118" y="-158" width="236" height="136" rx="8" fill="#3a8ac8"/>'
  + `<g${offAt != null ? fadeOut(offAt, 0.3) : ''}><rect x="-118" y="-158" width="236" height="136" rx="8" fill="#5ab0e8"/><rect x="-118" y="-70" width="236" height="48" fill="#5ab05a"/><circle cx="-60" cy="-120" r="16" fill="#ffd36a"/>`
  + `<g${M.bob(10, 0.8)}><rect x="-14" y="-104" width="28" height="34" rx="6" fill="#cf3b3b"/><circle cx="0" cy="-110" r="10" fill="#f2c9a6"/></g><rect x="40" y="-96" width="40" height="26" fill="#c88a4a"/></g>`
  + '<rect x="-50" y="-10" width="100" height="14" rx="4" fill="#3a3a44"/>', s);
const flag = (c1, c2) => `<g><rect x="-2" y="-120" width="4" height="120" fill="#7a5a3a"/><g${M.sway(6, 1.6, 0, 0, -110)}><path d="M2 -118 h48 v30 h-48Z" fill="${c1}"/><path d="M2 -103 h48 v15 h-48Z" fill="${c2}"/></g></g>`;
const candle = `<g><rect x="-5" y="-40" width="10" height="40" rx="2" fill="#fbf6ea"/><circle cy="-50" r="22" fill="url(#sunGlow)" opacity=".85"${M.flick(0.9, 0, 0.75)}/><path d="M0 -58 q-5 6 0 12 q5 -6 0 -12Z" fill="#ffd36a"/></g>`;
const highway = (t) => `<g opacity="0"${fadeIn(t, 1.2)}><path d="M1080 760 Q1300 640 1420 420 Q1520 230 1700 70" stroke="#ffe7a8" stroke-width="60" fill="none" opacity=".22" stroke-linecap="round"/>`
  + `<path d="M1080 760 Q1300 640 1420 420 Q1520 230 1700 70" stroke="#fff4cc" stroke-width="10" fill="none" opacity=".8" stroke-dasharray="30 30" stroke-linecap="round"${M.scroll(60, 1.2)}/>${glow(1700, 70, 220, 0.8)}</g>`;
const copies = (t, x, y) => [0, 1, 2, 3].map((k) => `<g opacity="0"${M.tw([{ at: t + k * 0.25, dur: 0.4, from: { opacity: 0 }, to: { opacity: 0.85 - k * 0.18 } }])}>${at2(x + k * 60, y + k * 16, `<rect x="-56" y="-74" width="112" height="148" rx="6" fill="${['#e8e4dc', '#d8d4cc', '#c8c4bc', '#b8b4ac'][k]}"/><circle cx="0" cy="-16" r="26" fill="${['#c8c0b8', '#b8b0a8', '#a8a098', '#989088'][k]}"/><rect x="-30" y="22" width="60" height="8" rx="4" fill="#a8a098"/>`, 1)}</g>`).join('');

// ================================================================ scenes
// 0 · hook: the canonization crowd in St. Peter's Square; the teenager they came for (push-fast)
function s0() {
  const e = at(0, 'eighty'), t = at(0, 'teenager'), sa = at(0, 'saint', 0.2);
  const fans = [[230, 0.92, '#c8323a', '#f6f2e8', 0], [380, 0.95, '#2f5a8a', '#f2c46b', 1], [1540, 0.93, '#f2c46b', '#f6f2e8', 2], [1700, 0.92, '#5a8a4a', '#f6f2e8', 3]];
  return layer(0.93, litL(fans.map(([x, d, c1, c2, k]) => shadowL(x, Y92, 1.2, 'sq_hook') + hd(x, Y92, 1.2, { top: ['#e8a040', '#5a8ac8', '#c85a7a', '#5a9a5a'][k], plain: true, trousers: '#3a4a6a', belt: false, skin: ['#f0c9a8', '#d9a47e', '#a86d45', '#e8bc9a'][k],
    hair: ['#3a2418', '#8a5a2a', '#1e1614', '#c89a5a'][k], hairStyle: k % 2 ? 'long' : 'short', beard: null, age: 'young', flip: x > 960, mood: 'joy', look: [2.4, -1], armR: [140, 6, 1.6 + k * 0.2], propR: popAtInner(e + k * 0.2, flag(c1, c2)) })).join(''), 'sq_hook'))
    + litL(shadowL(820, Y, 1.75, 'sq_hook') + seq((o) => carlo(820, Y, 1.75, { armL: [12, 2, 3], armR: 22, propR: laptop(0.6), ...o }),
      [[0, { mood: 'happy', look: [1.6, -0.6] }], [t, { mood: 'happy', look: [0, 0] }], [sa, { mood: 'joy', halo: sa }]]), 'sq_hook')
    + showAt(sa, sparkles(18, 560, 1080, 260, 640, { seed: 4 }))
    + NEAR(bokeh(7, { seed: 11, x1: W, y0: 120, y1: 900 }));
}
const popAtInner = (t, svg) => `<g opacity="0"${M.tw([{ at: t, dur: 0.4, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g>`;

// 1 · an ordinary teenager: jeans, sneakers, games, soccer, code (pan-r)
function s1() {
  const sn = at(1, 'sneakers'), vg = at(1, 'video'), so = at(1, 'soccer'), co = at(1, 'code'), wb = at(1, 'websites');
  return litL(shadowL(780, Y, 1.65, 'mi_day') + seq((o) => carlo(780, Y, 1.65, o), [[0, { mood: 'happy', look: [0, 1.6], armL: [10, 2, 3], armR: [12, 2, 3] }],
    [vg, { mood: 'joy', armL: [40, 3, 2], propL: gamepad(0.8), armR: [14, 2, 3] }], [co, { mood: 'happy', look: [2.4, -0.6], armL: [16, 2, 3], armR: [70, 3, 2.4] }]]), 'mi_day')
    + popAt(sn, 780, Y - 8, sparkles(10, -90, 90, -40, 10, { seed: 2 }), 0.4)
    + `<g opacity="0"${M.tw([{ at: so, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }, { at: so, dur: 0.9, from: { y: -300 }, to: { y: 0 }, ease: 'bounce.out' }])}>${at2(1030, Y - 36, `<g${M.spin(90)}>${ball}</g>`, 1.8)}</g>`
    + layer(0.95, popAt(co, 1270, 420, codeTag(1.3)) + popAt(wb, 1560, 500, webPage(0, 0, 0.62)))
    + NEAR(bokeh(5, { seed: 3, y0: 100, y1: 700 }));
}
// 2 · he died at fifteen; today a saint, patron of the internet (drift-l)
function s2() {
  const td = at(2, 'Today'), sa = at(2, 'Saint Carlo'), pa = at(2, 'patron'), st = at(2, 'This is');
  return litL(shadowL(900, Y, 1.75, 'mi_dusk') + seq((o) => carlo(900, Y, 1.75, { armL: [12, 2, 3], armR: [12, 2, 3], ...o }),
    [[0, { mood: 'peaceful' }], [td, { mood: 'happy', look: [0, 0] }], [sa, { mood: 'happy', halo: sa }], [pa, { mood: 'happy', halo: true, look: [2.6, -1], armR: [80, 3, 2.4] }], [st, { mood: 'tender', halo: true }]]), 'mi_dusk')
    + layer(0.95, `<g opacity="0"${fadeIn(pa, 0.8)}>${globe(1420, 400, 130, { pinAt: pa + 0.3 })}</g>`)
    + showAt(sa, glow(900, 460, 420, 0.4), 1.2)
    + NEAR(bokeh(8, { seed: 21 }));
}
// 3 · born in London to Andrea and Antonia; home to Milan (pull)
function s3() {
  const an = at(3, 'Andrea'), mi = at(3, 'A few months'), ml = at(3, 'Milan');
  return litL(shadowL(760, Y, 1.6, 'london') + seq((o) => antonia(760, Y, 1.6, { armL: [40, 2, 3], armR: [40, 2, 3], propR: babyBundle, ...o }), [[0, { mood: 'tender' }], [an, { mood: 'happy', look: [2.4, 0] }], [mi, { mood: 'tender' }]])
    + shadowL(1060, Y, 1.6, 'london') + seq((o) => andrea(1060, Y, 1.6, { flip: true, armL: [14, 2, 3], ...o }), [[0, { mood: 'happy', look: [2.4, 0.6], armR: [30, 2, 3] }], [ml, { mood: 'joy', armR: [24, 2, 3], propR: suitcase }]]), 'london')
    + popAt(an + 0.4, 910, 260, `${hglow(0, 0, 80, 0.7)}<g${M.pulse(0.06, 1.4)}>${heart('#e87a8a', 1.3)}</g>`)
    + NEAR(bokeh(5, { seed: 8, y0: 80, y1: 600 }));
}
// 4 · his questions about God, sparked by his Polish nanny; they led his mother back to the faith (drift-r)
function s4() {
  const bt = at(4, 'But little'), na = at(4, 'nanny'), mo = at(4, 'His mother'), fa = at(4, 'faith');
  return litL(shadowL(560, Y, 1.6, 'room_living') + seq((o) => antonia(560, Y, 1.6, { armL: [12, 2, 3], armR: [16, 2, 3], ...o }), [[0, { mood: 'happy', look: [2.6, 0.8] }], [mo, { mood: 'tender', armR: [30, 2, 3], propR: rosary() }]])
    + shadowL(900, Y, 1.0, 'room_living') + seq((o) => kidCarlo(900, Y, 1.0, o), [[0, { mood: 'happy', look: [-2.4, -1], armR: [70, 3, 2], armL: [12, 2, 3] }], [na, { mood: 'awe', look: [2.6, -1.6], armL: [12, 2, 3], armR: [20, 2, 3] }], [mo, { mood: 'joy', look: [-2.4, -1.4], armL: [14, 2, 3], armR: [14, 2, 3] }]])
    + `<g${walkIn(na - 0.6, 200, 1.0)}>${shadowL(1230, Y, 1.55, 'room_living')}${seq((o) => nanny(1230, Y, 1.55, { flip: true, armR: [40, 2, 3], armL: [36, 2, 3], propL: book(true), ...o }), [[0, { mood: 'happy', look: [2.4, 1.2] }], [mo, { mood: 'tender' }]])}</g>`, 'room_living')
    + popAt(bt, 960, 340, thought(`<g transform="translate(-50,4)">${heart('#e25a6a', 0.9)}</g><g transform="translate(10,10)"><path d="M0 -26 V22 M-16 -10 H16" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/></g><g transform="translate(60,0)">${sparkles(5, -16, 16, -16, 16, { seed: 9 })}<circle r="10" fill="#f2c46b"/></g>`, 220, 130), 0.6)
    + showAt(fa, glow(560, 470, 300, 0.45), 1.2)
    + NEAR(bokeh(5, { seed: 14 }));
}
// 5 · First Communion at seven; then the teenager in adoration: "my highway to heaven" (push)
function s5() {
  const fc = at(5, 'First Holy'), fo = at(5, 'From then'), pr = at(5, 'pray before'), hw = at(5, 'The Eucharist is'), he = at(5, 'heaven', 0.4);
  const altar = at2(1340, Y92, '<rect x="-110" y="-150" width="220" height="150" rx="6" fill="#f0e6d4"/><rect x="-118" y="-160" width="236" height="16" rx="4" fill="#fbf8f0"/><rect x="-100" y="-120" width="200" height="90" fill="#e2d2b4" opacity=".6"/><path d="M-60 -120 V-30 M60 -120 V-30" stroke="#c9a24a" stroke-width="4"/>');
  return layer(0.92, litL(altar + `<g opacity="0"${fadeIn(pr - 0.4, 1.0)}>${at2(1340, Y92 - 160, monstrance(1.5))}</g>`, 'ch_parish'))
    + `<g${fadeOut(fo, 0.8)}>${litL(shadowL(980, Y, 1.0, 'ch_parish') + kidCarlo(980, Y, 1.0, { white: true, kneel: true, mood: 'peaceful', armL: [24, 1, 3], armR: [24, 1, 3] })
      + shadowL(1240, Y, 1.6, 'ch_parish') + priest(1240, Y, 1.6, { flip: true, mood: 'tender', armR: [36, 2, 3], propR: chalice, armL: [64, 2, 3], propL: popAtInner(fc - 0.3, host(14)),
        over: '<path d="M-20 -206 L-24 -40 M20 -206 L24 -40" stroke="#f2c46b" stroke-width="12"/>' }), 'ch_parish')}</g>`
    + `<g opacity="0"${fadeIn(fo, 0.8)}>${litL(shadowL(980, Y, 1.6, 'ch_parish') + seq((o) => carlo(980, Y, 1.6, { kneel: true, armL: [26, 1, 3], armR: [26, 1, 3], ...o }),
      [[0, { mood: 'awe', look: [2.6, -1.2] }], [pr, { mood: 'peaceful' }], [hw - 0.2, { mood: 'happy', talk: [hw, he], look: [0, 0] }], [he, { mood: 'tender' }]]), 'ch_parish')}</g>`
    + highway(hw) + showAt(fc, sparkles(10, 1180, 1300, 420, 560, { seed: 6 }))
    + NEAR(bokeh(8, { seed: 17 }));
}
// 6 · summer by the sea: the rosary with the older ladies; "always close to Jesus" (pan-l)
function s6() {
  const ro = at(6, 'rosary'), pl = at(6, 'His plan'), q = at(6, 'To always'), qe = at(6, 'life plan', 0.5);
  return layer(0.95, litL([1180, 1360, 1530].map((x, k) => shadowL(x, Y95, 1.5, 'sea') + oldLady(x, Y95, 1.5, k, { flip: true, mood: k === 1 ? 'tender' : 'happy', look: [2.4, 0.4], armL: [30, 2, 3], armR: [30, 2, 3], propR: rosary() })).join(''), 'sea'))
    + litL(shadowL(800, Y, 1.6, 'sea') + seq((o) => carlo(800, Y, 1.6, o), [[0, { mood: 'happy', look: [2.6, 0], armL: [10, 2, 3], armR: [14, 2, 3] }], [ro, { mood: 'peaceful', armL: [30, 1, 3], armR: [30, 1, 3], propR: rosary() }],
      [pl, { mood: 'happy', look: [0, 0], armL: [30, 1, 3], armR: [30, 1, 3], propR: rosary() }], [q - 0.2, { mood: 'happy', talk: [q, qe], armL: [30, 1, 3], armR: [60, 3, 2.4], propR: rosary() }], [qe, { mood: 'tender', armL: [30, 1, 3], armR: [30, 1, 3], propR: rosary() }]]), 'sea')
    + popAt(q, 800, 250, `<g${M.pulse(0.06, 1.4)}>${heart('#e25a6a', 1.5)}</g>${hglow(0, 0, 90, 0.7)}`)
    + showAt(ro, sparkles(12, 1100, 1650, 300, 520, { seed: 12 }))
    + NEAR(bokeh(4, { seed: 19, y0: 80, y1: 500 }));
}
// 7 · sleeping bags and hot drinks for the homeless; soup kitchens with the Capuchins and Mother Teresa's sisters (pan-r)
function s7() {
  const sb = at(7, 'sleeping bags'), hot = at(7, 'hot drinks'), sk = at(7, 'soup kitchens'), mt = at(7, "Mother Teresa");
  return layer(0.92, `<g${walkIn(sk, 260, 1.2)}>${litL(shadowL(380, Y92, 1.5, 'mi_night') + friar(380, Y92, 1.5, { mood: 'joy', look: [2.4, 0], armL: [40, 2, 3], armR: [40, 2, 3], propR: soupPot }), 'mi_night')}</g>`
      + `<g${walkIn(mt, 260, 1.2)}>${litL(shadowL(200, Y92, 1.5, 'mi_night') + mcSister(200, Y92, 1.5, { mood: 'happy', look: [2.4, 0], armL: [30, 2, 3], armR: [36, 2, 3], propR: '<g><ellipse cx="0" cy="-8" rx="22" ry="8" fill="#f6f0e2"/><path d="M-22 -8 Q0 14 22 -8Z" fill="#e8e0d0"/></g>' }), 'mi_night')}</g>`)
    + litL(`<rect x="1260" y="${Y - 26}" width="300" height="30" rx="4" fill="#a88a5a"/>` + shadowL(1420, Y, 1.6, 'mi_night')
      + seq((o) => homeless(1420, Y, 1.6, { flip: true, armL: [14, 2, 3], armR: [14, 2, 3], ...o }), [[0, { mood: 'sad', look: [0, 1.6] }], [sb + 0.6, { mood: 'surprised', look: [2.4, -0.6] }], [hot + 0.4, { mood: 'joy', armR: [50, 2, 3], propR: cup }]])
      + `<g opacity="0"${fadeIn(sb + 0.8, 0.5)}>${at2(1500, Y - 10, sleepingBag, 1.4)}</g>`
      + `<g${walkIn(0.2, -260, 1.4)}>${shadowL(1020, Y, 1.6, 'mi_night')}${seq((o) => carlo(1020, Y, 1.6, o), [[0, { mood: 'happy', look: [2.6, 0.6], armL: [12, 2, 3], armR: [14, 2, 3] }],
        [sb - 0.3, { mood: 'tender', armL: [40, 2, 3], armR: [70, 2, 3], propR: sleepingBag }], [sb + 0.8, { mood: 'happy', armL: [20, 2, 3], armR: [14, 2, 3] }], [hot - 0.3, { mood: 'tender', armR: [76, 2, 3], propR: cup, armL: [20, 2, 3] }], [hot + 0.4, { mood: 'happy', armL: [16, 2, 3], armR: [16, 2, 3] }]])}</g>`, 'mi_night')
    + showAt(hot + 0.4, glow(1300, 600, 300, 0.35), 1.0);
}
// 8 · video games, one hour a week (drift-l)
function s8() {
  const bu = at(8, 'But he'), oh = at(8, 'one hour');
  return layer(0.92, litL(tv(1300, Y92 - 120, 1.4, oh + 0.8) + at2(1300, Y92, '<rect x="-180" y="-120" width="360" height="120" rx="6" fill="#8a5a36"/><rect x="-170" y="-110" width="160" height="80" rx="4" fill="#7a4e2e"/><rect x="10" y="-110" width="160" height="80" rx="4" fill="#7a4e2e"/>'), 'room_bedroom'))
    + litL(shadowL(820, Y, 1.6, 'room_bedroom') + seq((o) => carlo(820, Y, 1.6, o), [[0, { mood: 'joy', look: [2.6, 0], armL: [40, 3, 1.4], armR: [40, 3, 1.4], propL: gamepad(0.8) }],
      [bu, { mood: 'determined', look: [0, 0], armL: [40, 2, 3], armR: [14, 2, 3], propL: gamepad(0.8) }], [oh + 0.8, { mood: 'happy', look: [2.6, -1], armL: [14, 2, 3], armR: [14, 2, 3] }]]), 'room_bedroom')
    + popAt(oh - 0.3, 560, 330, `${hglow(0, -36, 80, 0.6)}${hourglass}`, 0.5) + popAt(oh + 0.2, 560, 420, '<rect x="-74" y="-26" width="148" height="44" rx="22" fill="#2a2a3a" opacity=".85"/><text y="7" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="26" fill="#f2c46b">1 HOUR / WEEK</text>', 0.4)
    + NEAR(bokeh(4, { seed: 23, y0: 100, y1: 600 }));
}
// 9 · self-taught coder: the parish website, a volunteer website (push)
function s9() {
  const ta = at(9, 'He taught'), pp = at(9, 'parish priest'), bu = at(9, 'Carlo built'), vo = at(9, 'He made');
  return layer(0.92, `<g${walkIn(pp - 0.4, 240, 1.0)}>${litL(shadowL(1580, Y92, 1.55, 'room_bedroom') + seq((o) => priest(1580, Y92, 1.55, { flip: true, armL: [14, 2, 3], ...o }), [[0, { mood: 'happy', look: [2.4, 0.6], armR: [60, 3, 2.4] }], [bu, { mood: 'joy', armR: [24, 2, 3] }]]), 'room_bedroom')}</g>`)
    + litL(shadowL(800, Y, 1.6, 'room_bedroom') + seq((o) => carlo(800, Y, 1.6, o), [[0, { mood: 'happy', look: [2.6, 0.8], armL: [14, 2, 3], armR: [34, 2, 2.4] }], [pp, { mood: 'happy', look: [2.6, -0.4], armL: [14, 2, 3], armR: [34, 2, 2.4] }], [bu, { mood: 'joy', look: [0, 0], armL: [14, 2, 3], armR: [100, 3, 2] }], [vo, { mood: 'happy', look: [2.6, 0.8], armL: [14, 2, 3], armR: [34, 2, 2.4] }]])
      + desk(900, Y, 1.0) + crt(1040, Y - 190, 1.0, ta) + at2(700, Y - 190, laptop(0.9)), 'room_bedroom')
    + layer(0.95, popAt(bu, 1230, 360, webPage(0, 0, 0.6) + `<g transform="translate(-150,-130)">${hglow(0, 0, 50, 0.8)}<path d="M0 -24 V24 M-14 -8 H14" stroke="${GOLD}" stroke-width="7" stroke-linecap="round"/></g>`)
      + popAt(vo + 0.3, 1500, 520, webPage(0, 0, 0.5) + `<g transform="translate(140,-110)">${heart('#e25a6a', 1.1)}</g>`))
    + NEAR(bokeh(4, { seed: 29, y0: 100, y1: 600 }));
}
// 10 · Rajesh asks to be baptized; Carlo the young catechist (drift-r)
function s10() {
  const af = at(10, 'After'), bp = at(10, 'baptized'), tw = at(10, 'At twelve'), ch = at(10, 'children');
  return `<g${fadeOut(tw - 0.2, 0.7)}>${litL(shadowL(1200, Y, 1.6, 'room_kitchen') + seq((o) => rajesh(1200, Y, 1.6, { flip: true, armL: [14, 2, 3], armR: [16, 2, 3], ...o }), [[0, { mood: 'happy', look: [2.4, 0.4] }], [af, { mood: 'surprised', look: [2.4, -0.4] }], [bp, { mood: 'tender' }]]), 'room_kitchen')}`
      + popAt(af + 0.4, 1000, 300, thought(`<path d="M0 -40 V36 M-24 -14 H24" stroke="${GOLD}" stroke-width="10" stroke-linecap="round"/>${hglow(0, 0, 60, 0.6)}`, 160, 130))
      + popAt(bp, 1200, 260, shell) + '</g>'
    + litL(shadowL(760, Y, 1.6, 'room_kitchen') + seq((o) => carlo(760, Y, 1.6, o), [[0, { mood: 'happy', look: [2.6, 0], armL: [14, 2, 3], armR: [14, 2, 3] }], [af, { mood: 'happy', look: [2.6, 0], armL: [14, 2, 3], armR: [70, 4, 2.2] }],
      [bp, { mood: 'joy', armL: [14, 2, 3], armR: [20, 2, 3] }], [tw, { mood: 'happy', look: [2.6, 1.2], armL: [40, 2, 3], armR: [40, 2, 3], propR: book(true) }]]), 'room_kitchen')
    + `<g opacity="0"${fadeIn(tw, 0.8)}>${litL([1050, 1220, 1390].map((x, k) => shadowL(x, Y, 0.95, 'room_kitchen') + kid(x, Y, 0.95, k, { flip: true, mood: k === 1 ? 'awe' : 'happy', look: [2.6, -1.4], armL: [14, 2, 3], armR: [k === 2 ? 130 : 14, 4, 1.8] })).join(''), 'room_kitchen')}</g>`
    + showAt(ch, sparkles(10, 980, 1460, 380, 560, { seed: 15 }));
}
// 11 · his biggest project: Eucharistic miracles from around the world, country by country (pull)
function s11() {
  const bg = at(11, 'biggest'), ar = at(11, 'around the world'), rc = at(11, 'recognized'), ov = at(11, 'Over a hundred'), ph = at(11, 'photos');
  const cards = [['#8a5a6a', false], ['#5a7aa8', true], ['#a8784a', false], ['#6a8a5a', true], ['#8a6aa8', false], ['#c8804a', true]];
  return litL(shadowL(640, Y, 1.6, 'room_study') + seq((o) => carlo(640, Y, 1.6, o), [[0, { mood: 'determined', look: [2.6, 0.8], armL: [14, 2, 3], armR: [34, 2, 2.4] }], [ar, { mood: 'awe', look: [2.6, -1.6], armL: [14, 2, 3], armR: [34, 2, 2.4] }], [ov, { mood: 'joy', look: [2.6, -0.8], armL: [14, 2, 3], armR: [110, 3, 2.2] }]])
      + desk(740, Y, 1.0) + crt(880, Y - 190, 1.0, bg, '#1a2a4a') + `<g>${glow(860, Y - 280, 160, 0.4)}</g>`, 'room_study')
    + layer(0.95, `<g opacity="0"${fadeIn(ar, 0.8)}>${globe(1380, 380, 150, { pinAt: ar + 0.3 })}</g>` + popAt(rc, 1600, 230, `${hglow(0, 0, 70, 0.8)}<circle r="34" fill="${GOLD}"/><path d="M-14 0 l10 10 l18 -20" stroke="#fffaf0" stroke-width="7" fill="none" stroke-linecap="round"/>`)
      + cards.map(([c, map], k) => popAt(ov + 0.3 + k * (ph - ov) / 6, 1120 + (k % 3) * 160, 640 + Math.floor(k / 3) * 120 - (k % 3) * 10, `<g transform="rotate(${(k % 3 - 1) * 5})">${photoCard(c, 1.2, map)}</g>`, 0.4)).join(''))
    + NEAR(bokeh(5, { seed: 31 }));
}
// 12 · a website and an exhibition anyone could show; years of work (pan-l)
function s12() {
  const ex = at(12, 'exhibition'), yw = at(12, 'It took');
  return layer(0.92, litL([[320, '#8a5a6a', 1], [620, '#5a7aa8', 2], [1360, '#6a8a5a', 3], [1660, '#a8784a', 4]].map(([x, c, sd]) => `<g opacity="0"${fadeIn(ex + sd * 0.25 - 0.4, 0.5)}>${shadowL(x, Y92, 1, 'ch_hall')}${easelPanel(x, Y92, 1.2, c, sd)}</g>`).join('')
      + [[470, 0], [1510, 1]].map(([x, k]) => `<g opacity="0"${fadeIn(ex + 0.8 + k * 0.4, 0.6)}>${shadowL(x, Y92, 1.45, 'ch_hall')}${oldLady(x, Y92, 1.45, k + 1, { flip: k === 1, mood: 'awe', look: [-2.6, -1.2], armL: [14, 2, 3], armR: [14, 2, 3] })}</g>`).join(''), 'ch_hall'))
    + litL(shadowL(960, Y, 1.6, 'ch_hall') + seq((o) => carlo(960, Y, 1.6, o), [[0, { mood: 'joy', look: [0, 0], armL: [30, 2, 3], armR: [24, 2, 3], propR: laptop(0.8) }], [ex, { mood: 'happy', look: [-2.6, -0.4], armL: [100, 3, 2.4], armR: [24, 2, 3], propR: laptop(0.8) }], [yw, { mood: 'tender', look: [0, 0], armL: [16, 2, 3], armR: [24, 2, 3], propR: laptop(0.8) }]]), 'ch_hall')
    + showAt(yw, sparkles(14, 700, 1220, 300, 600, { seed: 33 }))
    + NEAR(bokeh(5, { seed: 35, y0: 100, y1: 600 }));
}
// 13 · October 2006: a sore throat, then too weak to get up for Mass (drift-r) — the human beat
function s13() {
  const fl = at(13, 'flu'), we = at(13, 'weaker'), ma = at(13, 'Mass');
  const sf = sofa(860, Y, 1.0, '#7a6a8a');
  return sf.back + litL(seq((o) => carlo(860, Y + 70, 1.5, { armL: [14, 1, 3], armR: [14, 1, 3], ...o }), [[0, { mood: 'happy', look: [2.6, 0] }], [fl, { mood: 'worried', look: [0, 1.2] }], [we, { mood: 'peaceful' }], [ma, { mood: 'sad', look: [2.6, -0.8] }]]), 'room_sick') + sf.front
    + popAt(fl - 0.4, 1010, 600, thermometer, 0.4)
    + `<g${walkIn(we - 0.6, 240, 1.0)}>${litL(shadowL(1240, Y, 1.6, 'room_sick') + seq((o) => antonia(1240, Y, 1.6, { flip: true, ...o }), [[0, { mood: 'worried', look: [2.6, 0.6], armR: [30, 2, 3], propR: cup, armL: [14, 2, 3] }], [ma, { mood: 'sad', armR: [30, 2, 3], propR: cup, armL: [70, 2, 3] }]]), 'room_sick')}</g>`
    + popAt(ma, 1520, 330, thought(`<g transform="translate(0,20)"><path d="M-40 0 V-50 L0 -78 L40 -50 V0Z" fill="#e8d8c0"/><path d="M0 -78 V-104 M-10 -94 H10" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/><rect x="-10" y="-30" width="20" height="30" rx="10" fill="#8a6a4a"/></g>`, 170, 140));
}
// 14 · the diagnosis: acute promyelocytic leukemia; Carlo was fifteen (dolly)
function s14() {
  const nw = at(14, 'gave the news'), ac = at(14, 'acute'), fi = at(14, 'Carlo was');
  const b = bed(700, Y, 1.0);
  return layer(0.92, litL(ivPole(470, Y92, 1.0), 'room_hospital'))
    + b.back + litL(seq((o) => carlo(640, Y, 1.5, { outfit: 'gown', armL: [14, 1, 3], armR: [14, 1, 3], ...o }), [[0, { mood: 'worried', look: [2.6, 0] }], [ac + 0.6, { mood: 'sad', look: [2.6, 0.8] }], [fi, { mood: 'peaceful' }]]), 'room_hospital') + b.front
    + `<g${walkIn(0.3, 240, 1.0)}>${litL(shadowL(1280, Y, 1.6, 'room_hospital') + seq((o) => doctor(1280, Y, 1.6, { flip: true, armL: [40, 2, 3], propL: clipboard, ...o }), [[0, { mood: 'worried', look: [2.6, 0.4], armR: [14, 2, 3] }], [nw, { mood: 'sad', armR: [50, 2, 3] }], [fi, { mood: 'sad', armR: [14, 2, 3] }]]), 'room_hospital')}</g>`
    + litL(shadowL(1540, Y, 1.6, 'room_hospital') + seq((o) => antonia(1540, Y, 1.6, { flip: true, ...o }), [[0, { mood: 'worried', look: [2.6, 0.2], armL: [14, 2, 3], armR: [14, 2, 3] }], [ac + 0.6, { mood: 'sad', armL: [90, 2, 3], armR: [14, 2, 3], tears: ac + 1 }]]), 'room_hospital');
}
// 15 · no complaints: "There are people who suffer much more than me." (drift-l)
function s15() {
  const as = at(15, 'When the doctors'), q = at(15, 'There are'), qe = at(15, 'than me', 0.4);
  const b = bed(780, Y, 1.0);
  return layer(0.92, litL(ivPole(560, Y92, 1.0), 'room_hospital'))
    + b.back + litL(seq((o) => carlo(720, Y, 1.5, { outfit: 'gown', armL: [14, 1, 3], armR: [14, 1, 3], ...o }), [[0, { mood: 'peaceful' }], [as, { mood: 'happy', look: [2.6, 0] }], [q - 0.2, { mood: 'happy', talk: [q, qe], look: [2.6, 0] }], [qe, { mood: 'tender' }]]), 'room_hospital') + b.front
    + litL(shadowL(1330, Y, 1.6, 'room_hospital') + seq((o) => doctor(1330, Y, 1.6, { flip: true, armL: [40, 2, 3], propL: clipboard, hair: '#2a2a2a', skin: '#d9a47e', ...o }), [[0, { mood: 'happy', look: [2.6, 0.4], armR: [14, 2, 3] }], [as, { mood: 'worried', armR: [60, 3, 2.4] }], [qe, { mood: 'surprised', armR: [14, 2, 3] }]])
      + `<g${walkIn(0.6, 200, 1.0)}>${shadowL(1580, Y, 1.55, 'room_hospital')}${nurse(1580, Y, 1.55, { flip: true, mood: 'tender', look: [2.6, 0.4], armL: [16, 2, 3], armR: [16, 2, 3] })}</g>`, 'room_hospital')
    + showAt(qe, glow(720, 480, 260, 0.35), 1.0);
}
// 16 · the offering, for the Pope and for the Church — the climax line (push)
function s16() {
  const q = at(16, 'I offer'), pp = at(16, 'the Pope'), chu = at(16, 'the Church'), qe = at(16, 'the Church', 1.2);
  const b = bed(820, Y, 1.0, { blanket: '#c8d8e8' });
  return b.back + litL(seq((o) => carlo(760, Y, 1.5, { outfit: 'gown', ...o }), [[0, { mood: 'peaceful', armL: [24, 1, 3], armR: [24, 1, 3], propR: rosary() }], [q - 0.2, { mood: 'tender', talk: [q, qe], armL: [24, 1, 3], armR: [24, 1, 3], propR: rosary(), look: [2, -1.6] }], [qe, { mood: 'peaceful', armL: [24, 1, 3], armR: [24, 1, 3], propR: rosary() }]]), 'room_hospital') + b.front
    + `<g opacity="0"${fadeIn(q, 1.6)}>${glow(760, 470, 380, 0.5)}${glow(1330, 330, 420, 0.5)}</g>`
    + layer(0.9, popAt(pp, 1250, 330, `${hglow(0, 0, 160, 0.8)}<g transform="translate(0,150) scale(0.42)">${popeFrancis(0, 0, 1, { mood: 'tender', armL: [30, 2, 3], armR: [30, 2, 3], halo: undefined })}</g>`, 0.9)
      + popAt(chu, 1520, 360, `${hglow(0, 0, 150, 0.8)}<g fill="#fbf4e8"><path d="M-80 30 V-10 H80 V30Z"/><ellipse cx="0" cy="-10" rx="44" ry="50"/><rect x="-6" y="-84" width="12" height="26"/></g><path d="M0 -84 V-104 M-8 -96 H8" stroke="${GOLD}" stroke-width="4"/>`, 0.9))
    + showAt(qe, sparkles(16, 560, 1600, 200, 620, { seed: 41 }), 1.0)
    + NEAR(bokeh(6, { seed: 43 }));
}
// 17 · October 4: the website goes online; his wish to be buried in Assisi (pan-r)
function s17() {
  const on = at(17, 'gone online'), as = at(17, 'Assisi'), lv = at(17, 'he loved');
  return layer(0.95, litL(at2(980, Y95, '<rect x="-160" y="-110" width="320" height="110" fill="#c8b8a0"/><rect x="-170" y="-120" width="340" height="16" rx="4" fill="#d8c8b0"/>') + at2(980, Y95 - 120, laptop(1.4)), 'um_dusk')
      + popAt(on, 980, Y95 - 300, webPage(0, 0, 0.55) + `<g transform="translate(150,-120)"><rect x="-56" y="-20" width="112" height="40" rx="20" fill="#2a8a4a"/><text y="8" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#fff">ONLINE</text></g>`))
    + litL(shadowL(560, Y, 1.6, 'um_dusk') + seq((o) => carlo(560, Y, 1.6, { armL: [14, 2, 3], armR: [14, 2, 3], ...o }), [[0, { mood: 'happy', look: [2.6, 0.6] }], [as, { mood: 'tender', look: [2.6, -0.8], armR: [86, 3, 2.4] }], [lv, { mood: 'peaceful', armR: [14, 2, 3] }]]), 'um_dusk')
    + layer(0.9, popAt(as + 0.4, 1460, 300, tau(1.1)) + popAt(lv, 1640, 220, `<g${M.bob(8, 2.2)}>${dove(1.2)}</g>`))
    + NEAR(bokeh(6, { seed: 45 }));
}
// 18 · October 12, 2006: his death, bloodless and peaceful; light through the window (tilt-up + rack focus)
function s18() {
  const co = at(18, 'coma'), di = at(18, 'died'), fy = at(18, 'He was fifteen');
  const b = bed(860, Y, 1.0, { blanket: '#8a9ac0', frame: '#9aa0b8' });
  return b.back + litL(seq((o) => carlo(800, Y, 1.5, { outfit: 'gown', armL: [16, 0, 3], armR: [16, 0, 3], ...o }), [[0, { mood: 'peaceful' }], [di, { mood: 'peaceful', halo: di + 0.4 }]]), 'room_hospNight') + b.front
    + litL(shadowL(1360, Y, 1.6, 'room_hospNight') + seq((o) => antonia(1360, Y, 1.6, { flip: true, kneel: true, armL: [30, 1, 3], armR: [30, 1, 3], propR: rosary(), ...o }), [[0, { mood: 'sad', look: [2.6, 0.6] }], [co, { mood: 'sad', tears: co + 0.6 }], [fy, { mood: 'peaceful', tears: true }]]), 'room_hospNight')
    + `<g opacity="0"${fadeIn(di, 2.0)}>${glow(800, 420, 460, 0.55)}${sparkles(18, 600, 1000, 180, 520, { seed: 47 })}</g>`
    + NEAR(bokeh(6, { seed: 49, op: [0.25, 0.5] }));
}
// 19 · laid to rest in Assisi; the Sanctuary of the Spoliation, where St. Francis gave everything away (pull)
function s19() {
  const lr = at(19, 'laid to rest'), sp = at(19, 'Spoliation'), fr = at(19, 'Saint Francis');
  const francis = (o) => hd(1180, Y92, 1.5, { top: '#7a5a3a', plain: true, trim: '#6a4a2e', belt: '#efe6d2', skin: '#e2b48f', hair: '#5a3a22', hairStyle: 'tonsure', beard: '#5a3a22', beardStyle: 'short', age: 'mid', flip: true, ...o });
  return layer(0.92, `<g opacity="0"${fadeIn(fr, 1.2)}>${litL(shadowL(1180, Y92, 1.5, 'um_day') + francis({ mood: 'tender', halo: true, look: [2.4, 0.2], armL: [60, 2, 3], armR: [40, 2, 3], propL: '<g><rect x="-30" y="-22" width="60" height="30" rx="8" fill="#8a6a4a"/><path d="M-26 -14 h52" stroke="#6a4a2e" stroke-width="3"/></g>' }), 'um_day')}${glow(1180, 460, 300, 0.4)}</g>`)
    + `<g${walkIn(0.2, -200, 1.4)}>${litL(shadowL(620, Y, 1.6, 'um_day') + seq((o) => antonia(620, Y, 1.6, o), [[0, { mood: 'sad', look: [2.6, 0], armL: [14, 2, 3], armR: [40, 2, 3], propR: '<g><path d="M0 0 L-10 -60 M0 0 L6 -64 M0 0 L16 -56" stroke="#5a8a46" stroke-width="3"/><circle cx="-10" cy="-64" r="9" fill="#f6f0f0"/><circle cx="6" cy="-68" r="9" fill="#f2c46b"/><circle cx="16" cy="-60" r="9" fill="#e87a8a"/></g>' }], [sp, { mood: 'tender', look: [2.6, -0.4], armL: [14, 2, 3], armR: [40, 2, 3] }]])
      + shadowL(860, Y, 1.6, 'um_day') + seq((o) => andrea(860, Y, 1.6, { armL: [14, 2, 3], armR: [14, 2, 3], ...o }), [[0, { mood: 'sad', look: [2.6, 0] }], [sp, { mood: 'happy', look: [2.6, -0.4] }]]), 'um_day')}</g>`
    + showAt(lr, sparkles(10, 520, 960, 300, 560, { seed: 51 }))
    + NEAR(bokeh(4, { seed: 53, y0: 80, y1: 500 }));
}
// 20 · Christus Vivit: Pope Francis holds him up to young people; "born as originals, die as photocopies" (drift-r)
function s20() {
  const mo = at(20, 'held him up'), qw = at(20, 'quoted'), q = at(20, 'All people'), pc = at(20, 'photocopies'), qe = at(20, 'photocopies', 0.8);
  const inner = (o) => carlo(0, 0, 1.0, { halo: true, armL: [16, 2, 3], armR: [16, 2, 3], ...o });
  return layer(0.95, litL([1400, 1560, 1720].map((x, k) => shadowL(x, Y95, 1.45, 'sq_youth') + kid(x, Y95, 1.45, k + 1, { flip: true, mood: 'happy', look: [2.6, -0.6], armL: [14, 2, 3], armR: [14, 2, 3] })).join(''), 'sq_youth'))
    + litL(shadowL(520, Y, 1.6, 'sq_youth') + seq((o) => popeFrancis(520, Y, 1.6, { armL: [36, 2, 3], propL: book(false), ...o }), [[0, { mood: 'happy', look: [2.6, 0], armR: [14, 2, 3] }], [mo, { mood: 'joy', look: [2.6, -1], armR: [110, 3, 2.4] }], [q, { mood: 'tender', armR: [30, 2, 3] }]]), 'sq_youth')
    + layer(0.97, `<g opacity="0"${fadeIn(mo, 0.8)}>${portrait(960, 650, 1.0, `<g transform="translate(0,-20)">${seq((o) => inner(o), [[0, { mood: 'happy' }], [q - 0.2, { mood: 'happy', talk: [q, qe] }], [qe, { mood: 'tender' }]])}</g>`, { w: 260, h: 360 })}</g>`)
    + copies(pc - 0.6, 1230, 340) + popAt(pc + 0.3, 960, 230, `${hglow(0, 0, 90, 0.8)}<rect x="-44" y="-30" width="88" height="60" rx="8" fill="${GOLD}"/><text y="9" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="24" fill="#2b1d14">ORIGINAL</text>`, 0.5)
    + NEAR(bokeh(5, { seed: 55, y0: 100, y1: 600 }));
}
// 21 · Brazil: little Mattheus kisses a relic of Carlo and is healed (pan-l)
function s21() {
  const ma = at(21, 'Mattheus'), ki = at(21, 'kissed'), he = at(21, 'He was healed'), no = at(21, 'normal');
  const mom = (o) => hd(560, Y, 1.6, { top: '#e88a4a', plain: true, trim: '#c86a2a', belt: false, skin: '#c48a5f', hair: '#2a1c14', hairStyle: 'long', beard: null, age: 'young', shoes: '#5a3a22', ...o });
  const boy = (o) => hd(800, Y, 0.95, { top: '#f2d24a', plain: true, trim: '#3a8a4a', trousers: '#3a5a9a', belt: false, skin: '#b97c52', hair: '#1e1614', hairStyle: 'curly', beard: null, age: 'young', ...o });
  return litL(shadowL(560, Y, 1.6, 'brazil') + seq(mom, [[0, { mood: 'worried', look: [2.6, 0.8], armL: [14, 2, 3], armR: [50, 2, 3] }], [he, { mood: 'joy', look: [2.6, 0.6], armL: [120, 4, 1.8], armR: [50, 2, 3] }]])
      + shadowL(800, Y, 0.95, 'brazil') + `<g${M.tw([{ at: ki - 0.2, dur: 0.6, from: { x: 0 }, to: { x: 60 }, ease: 'power2.out' }, { at: ki + 1.4, dur: 0.6, from: { x: 60 }, to: { x: 0 } }])}>`
      + seq(boy, [[0, { mood: 'sad', look: [2.6, 0.4], armL: [14, 2, 3], armR: [14, 2, 3] }], [ki, { mood: 'peaceful', look: [2.6, -0.4], armL: [40, 2, 3], armR: [40, 2, 3] }], [he, { mood: 'joy', look: [0, 0], armL: [130, 5, 1.6], armR: [130, 5, 1.6] }],
        [no, { mood: 'joy', look: [0, 0], armL: [30, 2, 3], armR: [50, 2, 3], propR: '<g><ellipse cx="0" cy="-6" rx="30" ry="9" fill="#f6f0e2"/><path d="M-30 -6 Q0 18 30 -6Z" fill="#e8e0d0"/><circle cx="-8" cy="-12" r="8" fill="#e8a04a"/><circle cx="8" cy="-12" r="7" fill="#7ab05a"/></g>' }]]) + '</g>'
      + shadowL(1160, Y, 1.6, 'brazil') + seq((o) => priest(1160, Y, 1.6, { flip: true, armL: [14, 2, 3], ...o }), [[0, { mood: 'happy', look: [2.6, 0.8], armR: [40, 2, 3], propR: reliquary }], [ki - 0.4, { mood: 'tender', armR: [70, 2, 3], propR: reliquary }], [he, { mood: 'joy', armR: [40, 2, 3], propR: reliquary }]]), 'brazil')
    + showAt(ki, glow(960, 520, 240, 0.5), 0.8) + showAt(he, sparkles(18, 680, 1000, 380, 700, { seed: 57 }))
    + popAt(ma, 1520, 330, thought('<g transform="translate(0,6)"><ellipse rx="34" ry="12" fill="#f6f0e2"/><path d="M-34 0 Q0 26 34 0Z" fill="#e8e0d0"/><path d="M-50 -30 L50 30" stroke="#cf3b3b" stroke-width="6" stroke-linecap="round"/></g>', 160, 120));
}
// 22 · beatified, October 10, 2020, in the Basilica of St. Francis (push)
function s22() {
  const mi = at(22, 'recognized'), bt = at(22, 'beatified'), ba = at(22, 'Basilica');
  const cardinal = (o) => hd(1440, Y92, 1.55, { top: '#fbf4e4', plain: true, trim: GOLD, mantle: '#c8323a', lining: GOLD, belt: false, skin: '#e8c0a0', hair: '#d8d4cc', beard: null, age: 'old', shoes: '#c8323a', flip: true, ...o, over: mitre + pectoral(GOLD) });
  return layer(0.9, litL(tapestry(960, 120, 1.05, bt - 0.6), 'ch_basilica'))
    + layer(0.92, litL(shadowL(1440, Y92, 1.55, 'ch_basilica') + seq(cardinal, [[0, { mood: 'happy', look: [2.6, -0.6], armL: [14, 2, 3], armR: [40, 2, 3], propR: book(true) }], [bt, { mood: 'joy', look: [2.6, -1.4], armL: [14, 2, 3], armR: [110, 3, 2.4] }]]), 'ch_basilica'))
    + litL([[260, 0], [450, 1], [640, 2]].map(([x, k]) => shadowL(x, Y, 1.5, 'ch_basilica') + oldLady(x, Y, 1.5, k, { mood: k === 1 ? 'awe' : 'joy', look: [2.6, -1.6], armL: [30, 2, 3], armR: [30, 2, 3], propR: candle })).join(''), 'ch_basilica')
    + showAt(bt + 1.0, sparkles(22, 760, 1160, 120, 520, { seed: 59 }), 1.0)
    + NEAR(bokeh(8, { seed: 61 }));
}
// 23 · Florence 2022: Valeria's brain bleed; her mother prays at the tomb; she breathes; the second miracle (drift-l)
function s23() {
  const fe = at(23, 'Doctors feared'), mp = at(23, 'Her mother'), br = at(23, 'breathing'), ch = at(23, 'In 2024');
  const b = bed(760, Y, 1.0, { blanket: '#d8c8e0' });
  const val = (o) => hd(700, Y, 1.5, { top: '#c8e0ec', plain: true, trim: '#9ac0d4', trousers: '#c8e0ec', belt: false, skin: '#d9a47e', hair: '#2a1c14', hairStyle: 'long', beard: null, age: 'young', armL: [14, 1, 3], armR: [14, 1, 3], ...o });
  const momK = (o) => hd(0, 0, 1.0, { top: '#5a6a8a', plain: true, trim: '#3a4a6a', belt: false, skin: '#d9a47e', hair: '#4a3424', hairStyle: 'long', beard: null, age: 'mid', kneel: true, armL: [24, 1, 3], armR: [24, 1, 3], ...o });
  return layer(0.92, litL(ivPole(480, Y92, 1.0), 'room_florence'))
    + b.back + litL(seq(val, [[0, { mood: 'peaceful' }], [br, { mood: 'happy', look: [2.6, -0.4] }], [ch, { mood: 'joy', look: [0, 0] }]]), 'room_florence') + b.front
    + `<g${walkIn(fe - 0.6, 240, 1.0)}>${litL(shadowL(1250, Y, 1.6, 'room_florence') + seq((o) => doctor(1250, Y, 1.6, { flip: true, armL: [40, 2, 3], propL: clipboard, hair: '#8a6a4a', ...o }), [[0, { mood: 'sad', look: [2.6, 0.4], armR: [14, 2, 3] }], [br, { mood: 'surprised', armR: [70, 3, 2.4] }], [ch, { mood: 'joy', armR: [14, 2, 3] }]]), 'room_florence')}</g>`
    + `<g opacity="0"${M.tw([{ at: mp, dur: 0.6, from: { opacity: 0 }, to: { opacity: 1 } }, { at: ch, dur: 0.6, from: { opacity: 1 }, to: { opacity: 0 } }])}>${at2(1560, 330, `<circle r="170" fill="#2a2440"/><circle r="170" fill="url(#haloGlow)" opacity=".6"/><defs><clipPath id="vin23"><circle r="160"/></clipPath></defs><g clip-path="url(#vin23)"><rect x="-30" y="40" width="160" height="60" rx="6" fill="#d8c8b0"/>${at2(40, 40, candle, 1.2)}${at2(-60, 120, momK({ mood: 'peaceful' }), 0.55)}</g><circle r="166" fill="none" stroke="${GOLD}" stroke-width="6"/>`)}</g>`
    + showAt(br, `${glow(700, 460, 280, 0.45)}${sparkles(14, 540, 900, 300, 600, { seed: 63 })}`, 1.0)
    + popAt(ch, 1560, 360, doc(1.3), 0.6);
}
// 24 · April 2025: Pope Francis dies on Easter Monday; the canonization is postponed (drift-r)
function s24() {
  const pf = at(24, 'But Pope Francis'), po = at(24, 'postponed');
  return layer(0.92, litL(at2(1180, Y92, '<path d="M-70 0 L-30 -380 M70 0 L30 -380 M0 -380 V-80" stroke="#5a4a3a" stroke-width="10" stroke-linecap="round"/>')
      + portrait(1180, Y92 - 120, 0.75, `<g transform="translate(0,-10)">${popeFrancis(0, 0, 1.0, { mood: 'tender', armL: [20, 2, 3], armR: [20, 2, 3] })}</g>`, { frame: '#2a2420', bg: '#c8b8a8', w: 300, h: 380 })
      + `<path d="M${1180 - 125} ${Y92 - 420} l40 0 l-40 40Z M${1180 + 125} ${Y92 - 420} l-40 0 l40 40Z" fill="#1a1418"/>`, 'sq_mourn'))
    + litL([[560, 0], [780, 1]].map(([x, k]) => shadowL(x, Y, 1.55, 'sq_mourn') + oldLady(x, Y, 1.55, k + 2, { mood: 'sad', look: [2.6, -0.6], armL: [30, 2, 3], armR: [30, 2, 3], propR: candle })).join('')
      + shadowL(1500, Y, 1.55, 'sq_mourn') + seq((o) => priest(1500, Y, 1.55, { flip: true, armL: [30, 2, 3], armR: [30, 2, 3], propR: candle, ...o }), [[0, { mood: 'happy', look: [2.6, 0] }], [pf, { mood: 'sad', look: [2.6, -0.4] }]]), 'sq_mourn')
    + popAt(0.8, 380, 330, `<g transform="rotate(-6)"><rect x="-90" y="-60" width="180" height="120" rx="8" fill="#fbf6ea"/><rect x="-90" y="-60" width="180" height="30" rx="8" fill="#cf3b3b"/><text y="-37" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#fff">APRIL</text><text y="34" text-anchor="middle" font-family="Lora" font-weight="700" font-size="58" fill="#2b1d14">27</text></g>`, 0.5)
    + `<g opacity="0"${fadeIn(po, 0.4)}>${at2(380, 330, '<path d="M-90 -50 L90 50 M-90 50 L90 -50" stroke="#2b1d14" stroke-width="10" stroke-linecap="round" opacity=".7"/>')}</g>`;
}
// 25 · September 7, 2025: Pope Leo XIV declares him a saint, with Pier Giorgio Frassati; Michele reads (pull)
function s25() {
  const de = at(25, 'declared'), fr = at(25, 'Frassati'), mi = at(25, 'Michele');
  const frassati = hd(0, 0, 1.0, { top: '#3a3e52', plain: true, trousers: '#2e3040', lapels: '#f6f0e2', tie: '#2a2a3a', belt: false, skin: '#eac2a0', hair: '#2a1c14', beard: null, age: 'young', halo: true, mood: 'happy', armL: [16, 2, 3], armR: [16, 2, 3] });
  return layer(0.85, `<g opacity="0"${fadeIn(mi - 0.3, 0.8)}>${litL(at2(1660, Y85, '<rect x="-60" y="-150" width="120" height="150" rx="6" fill="#d8c8a8"/><rect x="-74" y="-170" width="148" height="26" rx="6" fill="#c9a24a"/>') + hd(1660, Y85 - 60, 1.3, { top: '#3a3e52', plain: true, trousers: '#2e3040', lapels: '#f6f0e2', tie: '#8a2a3a', belt: false, skin: SKC, hair: HAIRC, hairStyle: 'short', beard: null, age: 'young', mood: 'happy', look: [0, 1.4], armL: [40, 1, 3], armR: [40, 1, 3], propR: book(true) })
      + at2(1660, Y85, '<rect x="-64" y="-90" width="128" height="90" fill="#c8b898"/>'), 'sq_canon')}</g>`)
    + litL(shadowL(1220, Y, 1.6, 'sq_canon') + seq((o) => popeLeo(1220, Y, 1.6, { flip: true, armL: [14, 2, 3], ...o }), [[0, { mood: 'happy', look: [2.6, -0.4] }], [de, { mood: 'joy', look: [2.6, -0.8], armL: [110, 3, 2.4] }], [fr, { mood: 'happy', look: [2.6, -0.4] }]])
      + shadowL(580, Y, 1.65, 'sq_canon') + seq((o) => carlo(580, Y, 1.65, { halo: true, armL: [14, 2, 3], armR: [22, 2, 3], propR: laptop(0.6), ...o }), [[0, { mood: 'happy', look: [0, 0] }], [de, { mood: 'joy' }], [mi, { mood: 'tender', look: [2.6, -0.4] }]]), 'sq_canon')
    + layer(0.95, `<g opacity="0"${fadeIn(fr, 0.8)}>${portrait(880, 520, 0.7, `<g transform="translate(0,-14)">${frassati}</g>`, { w: 240, h: 330 })}</g>`)
    + showAt(de, sparkles(24, 380, 1400, 120, 600, { seed: 65 }), 1.0)
    + NEAR(bokeh(8, { seed: 67 }));
}
// 26 · today: a million pilgrims a year; the exhibition on five continents; "he never became a photocopy" (pan-r)
function s26() {
  const pi = at(26, 'pilgrims'), fc = at(26, 'five continents'), li = at(26, 'He lived'), ph = at(26, 'photocopy');
  return layer(0.95, litL([[300, 0], [460, 1], [620, 2]].map(([x, k]) => `<g${M.drift(40, 0)}>${shadowL(x, Y95, 1.45, 'um_pilgrims')}${kid(x, Y95, 1.45, k + 2, { mood: 'happy', look: [2.6, -0.4], armL: [14, 2, 3], armR: [k === 1 ? 60 : 14, 2, 3], over: '<rect x="-36" y="-196" width="72" height="80" rx="16" fill="#cf6a3a" opacity=".0"/>' })}</g>`).join(''), 'um_pilgrims'))
    + layer(0.95, `<g opacity="0"${fadeIn(fc - 0.5, 0.8)}>${globe(1500, 380, 150, { pinAt: fc })}</g>`)
    + `<g opacity="0"${fadeIn(li - 0.4, 1.2)}>${litL(shadowL(1000, Y, 1.7, 'um_pilgrims') + seq((o) => carlo(1000, Y, 1.7, { halo: true, armL: [14, 2, 3], armR: [22, 2, 3], ...o }), [[0, { mood: 'happy', look: [0, 0] }], [ph, { mood: 'tender' }]]), 'um_pilgrims')}${glow(1000, 450, 380, 0.4)}</g>`
    + popAt(ph + 0.2, 1000, 200, `${hglow(0, 0, 100, 0.9)}<rect x="-50" y="-34" width="100" height="68" rx="8" fill="${GOLD}"/><text y="10" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#2b1d14">ORIGINAL</text>`, 0.6)
    + showAt(pi, sparkles(10, 200, 760, 300, 600, { seed: 69 }))
    + NEAR(bokeh(6, { seed: 71, y0: 100, y1: 700 }));
}
// 27 · feast day portrait at sunset over Assisi; room on the right for YouTube's end screen (arc-r)
function s27() {
  const fd = at(27, 'feast'), pr = at(27, 'pray for us');
  return litL(shadowL(640, Y, 1.75, 'um_glory') + seq((o) => carlo(640, Y, 1.75, { halo: true, armL: [24, 2, 3], propL: rosary(), armR: [22, 2, 3], propR: laptop(0.6), ...o }),
      [[0, { mood: 'happy', look: [0, 0] }], [fd, { mood: 'happy', look: [0, 0] }], [pr, { mood: 'tender' }], [pr + 3.5, { mood: 'happy', look: [0, 0] }]]), 'um_glory')
    + layer(0.92, popAt(fd + 0.4, 960, 470, monstrance(1.2)))
    + showAt(pr, sparkles(20, 420, 900, 160, 560, { seed: 73 }), 1.0)
    + NEAR(bokeh(8, { seed: 75, sides: false, x0: 0, x1: 1000 }));
}

// cover (16:9 thumbnail): Carlo big on the right with his halo, St. Peter's in golden light, the title on the left
export function thumbArt() {
  return litL(carlo(1400, 1010, 2.75, { halo: true, mood: 'joy', look: [-0.6, 0], armL: [30, 2, 3], propL: rosary(), armR: [26, 2, 3], propR: laptop(0.62) }), 'sq_canon')
    + glow(1400, 300, 520, 0.35) + sparkles(16, 1100, 1800, 60, 500, { seed: 81 }) + layer(0.9, at2(1760, 420, monstrance(1.1)));
}

// ================================================================ per-scene art, 3D set-up and camera
export const ART = [
  { art: s0, bg3d: 'sqHook', cam: { move: 'push-fast', ox: 820, oy: 520 } },
  { art: s1, bg3d: 'miDay', cam: 'pan-r' },
  { art: s2, bg3d: 'miDusk', cam: 'drift-l' },
  { art: s3, bg3d: 'london', cam: { move: 'pull', ox: 900, oy: 520 } },
  { art: s4, bg3d: 'roomLiving', cam: 'drift-r' },
  { art: s5, bg3d: 'chParish', cam: { move: 'push', ox: 1000, oy: 520 } },
  { art: s6, bg3d: 'sea', cam: 'pan-l' },
  { art: s7, bg3d: 'miNight', cam: 'pan-r' },
  { art: s8, bg3d: 'roomBedroom', cam: 'drift-l' },
  { art: s9, bg3d: 'roomBedroom', cam: { move: 'push', ox: 900, oy: 520 } },
  { art: s10, bg3d: 'roomKitchen', cam: 'drift-r' },
  { art: s11, bg3d: 'roomStudy', cam: { move: 'pull', ox: 900, oy: 520 } },
  { art: s12, bg3d: 'chHall', cam: 'pan-l' },
  { art: s13, bg3d: 'roomSick', cam: 'drift-r' },
  { art: s14, bg3d: 'roomHospital', cam: { move: 'dolly', amt: 0.08, ox: 640, oy: 500 } },
  { art: s15, bg3d: 'roomHospital', cam: 'drift-l' },
  { art: s16, bg3d: 'roomHospital', cam: { move: 'push', ox: 760, oy: 500 } },
  { art: s17, bg3d: 'umDusk', cam: 'pan-r' },
  { art: s18, bg3d: 'roomHospNight', cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1.5, dur: 2.5, blur: 6 } } },
  { art: s19, bg3d: 'umDay', cam: { move: 'pull', ox: 900, oy: 520 } },
  { art: s20, bg3d: 'sqYouth', cam: 'drift-r' },
  { art: s21, bg3d: 'brazil', cam: 'pan-l' },
  { art: s22, bg3d: 'chBasilica', cam: { move: 'push', ox: 960, oy: 420 } },
  { art: s23, bg3d: 'roomFlorence', cam: 'drift-l' },
  { art: s24, bg3d: 'sqMourn', cam: 'drift-r' },
  { art: s25, bg3d: 'sqCanon', cam: { move: 'pull', ox: 900, oy: 520 } },
  { art: s26, bg3d: 'umPilgrims', cam: 'pan-r' },
  { art: s27, bg3d: 'umGlory', cam: { move: 'arc-r', amt: 0.06, ox: 640, oy: 500 } },
].map((a) => ({ ...a, front3d: true }));
