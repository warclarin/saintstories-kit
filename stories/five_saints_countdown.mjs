// "5 Saints Who Refused to Break": a countdown reel (#5 -> #1) of five martyrs. Format new on 2026-11-27 (user's blueprint):
// hook -> #5 St. Clement I -> #4 St. Catherine of Alexandria -> #3 St. Bartholomew -> #2 St. Lawrence -> #1 St. Denis ->
// outro question (the user chose to say the comment question in the voiceover this once). A screen-fixed ranking ladder
// (STORY.hud, opt-in in build.mjs) shows 5 4 3 2 ? at the top: each saint's number stamps in and flies into its badge,
// and #1 stays "?" until the last saint, so viewers can guess.
// All-3D backgrounds (five_saints_countdown.bg3d.js: set-ups of roma(), taurica(), alexandria(), anglia()); cam3d; hd().
// Motion: the Ricks Clips standard (cam.path travel on the words, no sway, instant pose swaps).
// Each martyrdom is shown as close to the story as the rules allow (user's instruction 2026-11-27), bloodless: Clement with
// the anchor and the splash; the wheel bursting; Bartholomew bound with the knife raised (no blow, no skin shown); Lawrence
// lying on the gridiron over the coals, smiling; Denis kneeling under the raised sword, a flash, then standing and holding
// his own head cleanly in his hands like the cathedral statues (user's choice), peaceful, with a halo on the head.
// Sources: Golden Legend "Life of St. Clement" (christianiconography.info; thrown into the sea with an anchor; the sea drew
// back three miles and a marble tomb like a church was found) and OCA "Hieromartyr Clement"; Wikipedia "Catherine of
// Alexandria" (18, fifty philosophers, the spiked wheel shattered at her touch, beheaded); Wikipedia / Britannica
// "Bartholomew the Apostle" (Armenia, converted King Polymius, flayed alive and beheaded at the order of the king's brother
// Astyages; iconography: knife); Britannica "Saint Lawrence" (Ambrose and Prudentius: roasted on a gridiron, "I am cooked on
// that side; turn me over"; deacon of Rome, executed August 10, 258) and Franciscan Media (the poor "are the treasure of the
// Church"); Wikipedia "Denis of Paris" (bishop of Paris, beheaded on Montmartre with Rusticus and Eleutherius; the most famous
// cephalophore, picked up his head and walked several miles preaching), OrthodoxWiki (about ten kilometres to where the
// town of Saint-Denis stands), Butler via Columbia MCAH (the walk from Montmartre).
// Exported for later reels: lawrenceHD, bartholomewHD, denisHD, denisBody, heldHead, headsman, poorHD, gridiron, gridSmall,
// knife, fork, marbleTomb, postRopes, rankHud.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, uid, palm_frond, book, beam, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import { speedLines, sweat, rage, burst, crack, squash } from '../cartoonfx.mjs';
import { clementHD, anchor, splash } from './clement_anchor.mjs';
import { catherine, emperorMax, sage, spikedWheel, wheelPieces, brokenWheel } from './catherine_of_alexandria.mjs';
import { legionary } from './rufus_simon_of_cyrene.mjs';
import { governor } from './andrew_apostle.mjs';
import { crownHead } from './elizabeth_of_hungary_roses.mjs';
import { gladius } from './perpetua_arena.mjs';
import { mitre } from './francis.mjs';
import { crozier } from './martin_of_tours.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';

const SLUG = 'five_saints_refused_to_break';
const at = wordTimes(SLUG);
// pose changes swap instantly: each look shows exactly from its time until the next one (no overlap frames)
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
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const until = (t, svg) => `<g${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 1 }, to: { opacity: 0 } }])}>${svg}</g>`;
const from = (t, svg) => `<g opacity="0"${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }])}>${svg}</g>`;
const span = (t0, t1, svg) => `<g opacity="0"${M.tw([{ at: t0 - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t1 - 0.02, dur: 0.04, to: { opacity: 0 } }])}>${svg}</g>`;
const rise = (t, svg, dy = 60, dur = 0.8) => `<g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, y: dy }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>${svg}</g>`;
const flash = (t) => `<g opacity="0"${fadeIn(t, 0.1)}><g${fadeOut(t + 0.2, 0.7)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".85"/></g></g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props
/** St. Bartholomew's attribute: a curved flaying knife, held blade up (hand at 0,0). */
export const knife = '<g transform="rotate(-8)"><rect x="-5" y="-18" width="10" height="42" rx="4" fill="#6a4a2a"/><rect x="-9" y="-22" width="18" height="7" rx="3" fill="#8a6a3a"/>'
  + '<path d="M-6 -22 Q-12 -70 8 -108 Q18 -70 6 -22Z" fill="#dfe5ec"/><path d="M1 -26 Q-3 -68 8 -102" stroke="#aab4c2" stroke-width="3" fill="none"/></g>';
/** St. Lawrence's attribute: a small gridiron on a handle (hand at 0,0). */
export const gridSmall = '<g transform="rotate(-6)"><rect x="-4" y="-44" width="8" height="58" rx="3" fill="#3a3844"/>'
  + '<rect x="-36" y="-138" width="72" height="96" rx="5" fill="none" stroke="#4a4856" stroke-width="7"/>'
  + '<path d="M-21 -138 V-42 M-7 -138 V-42 M7 -138 V-42 M21 -138 V-42" stroke="#5e5c6a" stroke-width="5"/><path d="M-30 -132 V-48" stroke="#8a8898" stroke-width="2" opacity=".6"/></g>';
/** A soldier's fork for the fire (hand at 0,0). */
export const fork = '<g transform="rotate(-4)"><rect x="-3.5" y="-170" width="7" height="230" rx="3" fill="#6a4a2a"/>'
  + '<path d="M-17 -168 V-208 M0 -168 V-214 M17 -168 V-208 M-17 -168 H17" stroke="#4a4a56" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
/** The gridiron over hot coals (centre of the grill top at 0, -top; legs to the ground at y = 0). */
export const gridiron = (w = 620, top = 128) => {
  const hw = w / 2, gy = -top;
  let bars = '', coals = '', flames = '';
  for (let k = 0; k <= 14; k++) { const x = -hw + 14 + k * (w - 28) / 14; bars += `M${f(x)} ${gy - 14} L${f(x + 10)} ${gy + 14} `; }
  const R = (k) => { const v = Math.sin(k * 12.9898 + 3.1) * 43758.5453; return v - Math.floor(v); };
  for (let k = 0; k < 26; k++) { const x = -hw + 40 + R(k) * (w - 80), y = -34 + R(k + 40) * 22, r = 10 + R(k + 80) * 12;
    coals += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 1.3)}" ry="${f(r * 0.8)}" fill="${['#c8401e', '#e8682a', '#a8301a', '#f0902e'][k % 4]}"/>`; }
  for (let k = 0; k < 9; k++) { const x = -hw + 70 + k * (w - 140) / 8, h = 30 + R(k + 7) * 26;
    flames += `<g transform="translate(${f(x)},-40)"><g${M.flick(0.45 + R(k) * 0.3, R(k + 3), 0.5)}><path d="M-12 0 Q-14 ${f(-h * 0.6)} 0 ${f(-h)} Q14 ${f(-h * 0.6)} 12 0Z" fill="#ffa040" opacity=".85"/>`
      + `<path d="M-5 0 Q-6 ${f(-h * 0.4)} 0 ${f(-h * 0.7)} Q6 ${f(-h * 0.4)} 5 0Z" fill="#fff0a0"/></g></g>`; }
  return `<g><ellipse cx="0" cy="4" rx="${hw + 30}" ry="22" fill="#140c14" opacity=".3"/>${glow(0, -60, hw * 0.9, 0.9)}`
    + `<path d="M${-hw + 20} 0 L${-hw + 30} ${gy} M${hw - 20} 0 L${hw - 30} ${gy} M${-hw + 60} 4 L${-hw + 50} ${gy + 10} M${hw - 60} 4 L${hw - 50} ${gy + 10}" stroke="#2e2c36" stroke-width="12" stroke-linecap="round"/>`
    + `<ellipse cx="0" cy="-24" rx="${hw - 30}" ry="26" fill="#3a1a14"/>${coals}${flames}`
    + `<path d="${bars}" stroke="#3e3c48" stroke-width="7" stroke-linecap="round"/>`
    + `<path d="M${-hw} ${gy - 14} L${hw} ${gy - 14} L${hw + 10} ${gy + 14} L${-hw + 10} ${gy + 14}Z" fill="none" stroke="#2e2c36" stroke-width="10" stroke-linejoin="round"/>`
    + `<path d="M${-hw + 10} ${gy + 14} L${hw + 10} ${gy + 14}" stroke="#ff9a50" stroke-width="3" opacity=".7"/></g>`;
};
/** The marble tomb of St. Clement under the sea: a small temple with columns, a dark door and an anchor on the pediment. */
export const marbleTomb = (s = 1) => {
  let cols = '';
  for (const x of [-112, -56, 56, 112]) cols += `<rect x="${x - 12}" y="-190" width="24" height="146" fill="#f6f2ea"/><rect x="${x + 2}" y="-190" width="10" height="146" fill="#d8d2c8"/>`;
  return `<g transform="scale(${s})"><ellipse cy="6" rx="180" ry="16" fill="#140c14" opacity=".25"/>`
    + '<rect x="-166" y="-24" width="332" height="26" fill="#d8d2c8"/><rect x="-146" y="-46" width="292" height="24" fill="#ece6dc"/>'
    + `${cols}<rect x="-30" y="-150" width="60" height="106" rx="4" fill="#3a3448"/>`
    + '<rect x="-136" y="-214" width="272" height="26" fill="#ece6dc"/><path d="M-148 -214 L0 -276 L148 -214Z" fill="#f6f2ea"/><path d="M0 -276 L148 -214 L40 -214Z" fill="#d8d2c8"/>'
    + `<g transform="translate(0,-262)">${anchor(0.42, { gold: true })}</g></g>`;
};
/** A wooden post behind a bound figure (hd `under`) and the ropes across chest and knees (hd `over`). */
export const postRopes = {
  under: '<rect x="-13" y="-360" width="26" height="362" rx="5" fill="#6a4a2e"/><rect x="2" y="-360" width="9" height="362" fill="#4e3620" opacity=".6"/>',
  over: '<g stroke="#b8925a" stroke-width="7" fill="none" stroke-linecap="round"><path d="M-62 -170 Q0 -150 62 -170"/><path d="M-60 -156 Q0 -136 60 -156"/>'
    + '<path d="M-52 -58 Q0 -44 52 -58"/></g><path d="M-62 -170 Q0 -150 62 -170" stroke="#e0c08a" stroke-width="2" fill="none" opacity=".7"/>',
};
/** A crutch held at the side, reaching down to the ground. */
const crutch = '<g><rect x="-4" y="-6" width="8" height="112" rx="3" fill="#8a6a44"/><rect x="-18" y="-12" width="36" height="9" rx="4" fill="#6a5034"/></g>';

// ================================================================ characters
/** St. Lawrence: a young Roman deacon in a red dalmatic with gold bands, clean-shaven. */
const DALMATIC = `<path d="M-19 -207 L-25 -14 M19 -207 L25 -14" stroke="${GOLD}" stroke-width="7"/><path d="M-30 -120 H30" stroke="${GOLD}" stroke-width="5" opacity=".9"/>`;
export const lawrenceHD = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#b3202e', plain: true, trim: GOLD, mantle: null, belt: false, skin: '#e2b48f',
  hair: '#4a3020', hairStyle: 'short', beard: null, age: 'young', iris: '#4a3424', shoes: '#5a3a22', ...o, over: (o.kneel ? '' : DALMATIC) + over });
/** St. Bartholomew: an apostle with dark curly hair and a full beard, cream tunic, purple mantle. */
export const bartholomewHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#e8dcc4', mantle: '#6a2e6a', lining: GOLD, trim: GOLD, belt: '#8a6a3a', skin: '#c99a72',
  hair: '#2a1c14', hairStyle: 'curly', beard: '#2a1c14', beardStyle: 'full', age: 'mid', iris: '#3a2a20', shoes: '#5a3a22', ...o });
/** St. Denis: an old bishop: white alb, red cope with gold lining (a martyr), mitre, grey hair, short grey beard. */
const DEN = { top: '#f4eee2', plain: true, trim: GOLD, mantle: '#a8202c', lining: GOLD, belt: false, skin: '#e2b48f', hair: '#bdb6ac', hairStyle: 'short',
  beard: '#cfc8bc', beardStyle: 'short', age: 'old', iris: '#4a3a2a', shoes: '#7a2a2a' };
export const denisHD = (x, y, s, { over = '', mitred = true, ...o } = {}) => hd(x, y, s, { ...DEN, ...o, over: (mitred ? mitre : '') + over });
/** Denis after the beheading (the traditional cephalophore, bloodless): the body with nothing above a high collar. */
export const denisBody = (x, y, s, o = {}) => {
  const id = uid('dnb'), ny = y - (o.kneel ? 128 : 212) * s;
  return `<defs><clipPath id="${id}"><rect x="-600" y="${f(ny)}" width="2400" height="2400"/></clipPath></defs>`
    + `<g clip-path="url(#${id})">${denisHD(x, y, s, { ...o, mitred: false, halo: undefined })}</g>`
    + `<ellipse cx="${f(x)}" cy="${f(ny + 4 * s)}" rx="${f(37 * s)}" ry="${f(13 * s)}" fill="${dark(DEN.mantle, 0.12)}"/>`
    + `<path d="M${f(x - 37 * s)} ${f(ny + 4 * s)} Q${f(x)} ${f(ny + 22 * s)} ${f(x + 37 * s)} ${f(ny + 4 * s)}" stroke="${GOLD}" stroke-width="${f(4 * s)}" fill="none"/>`;
};
/** Denis's head with its mitre, held in the hands: centre of the face at (cx, cy); a halo behind it. */
export const heldHead = (cx, cy, s, o = {}) => {
  const id = uid('dnh');
  return `<g transform="translate(${f(cx)},${f(cy + 252 * s)})"><circle cx="0" cy="${f(-262 * s)}" r="${f(96 * s)}" fill="url(#haloGlow)"/>`
    + `<circle cx="0" cy="${f(-268 * s)}" r="${f(56 * s)}" fill="none" stroke="${GOLD}" stroke-width="${f(5 * s)}"/>`
    + `<defs><clipPath id="${id}"><ellipse cx="0" cy="${f(-252 * s)}" rx="${f(51 * s)}" ry="${f(41 * s)}"/><rect x="${f(-42 * s)}" y="${f(-392 * s)}" width="${f(84 * s)}" height="${f(140 * s)}"/></clipPath></defs>`
    + `<g clip-path="url(#${id})">${denisHD(0, 0, s, { mood: 'tender', ...o })}</g></g>`;
};
/** An executioner: a plain dark tunic, a short dark beard. */
export const headsman = (x, y, s, o = {}) => hd(x, y, s, { top: '#5e4636', plain: true, trim: '#4a3426', mantle: null, belt: '#2e2018', skin: '#c48a5f', hair: '#2a1c12',
  hairStyle: 'short', beard: '#2a1c12', beardStyle: 'short', age: 'mid', iris: '#2e2018', shoes: '#3a2a1e', mood: 'stern', ...o });
const POOR = [['#8a7a64', '#c48a5f', '#2a1c12', null], ['#a89878', '#e2b48f', '#6a4a30', '#d8ccb4'], ['#7a6a5a', '#b97c52', '#3a2a1e', null], ['#9a8a70', '#d9a47e', '#8a8278', '#c8bca4']];
const PATCH = '<g fill="#6a5a44" opacity=".75"><rect x="-30" y="-90" width="18" height="16" rx="2"/><rect x="14" y="-150" width="16" height="14" rx="2"/></g>';
/** The poor and the sick of Rome, Lawrence's "treasure": patched tunics; the women (odd i) wear a shawl. */
export const poorHD = (x, y, s, i = 0, { over = '', ...o } = {}) => { const [top, skin, hair, veil] = POOR[i % 4];
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.12), mantle: null, belt: '#5a4a34', skin, hair, hairStyle: i % 4 === 2 ? 'curly' : 'short', beard: i % 2 ? null : hair,
    beardStyle: i % 2 ? null : 'short', age: i % 4 === 3 ? 'old' : 'mid', iris: '#3a2a20', ...(veil ? { veil, veilHair: 'covered' } : {}), ...o, over: PATCH + over }); };
const royal = (x, y, s, i, { over = '', ...o } = {}) => hd(x, y, s, i
  ? { top: '#3e2a4a', mantle: '#22202e', lining: '#8a6a3a', trim: '#8a6a3a', belt: GOLD, skin: '#c99a72', hair: '#1e1612', beard: '#1e1612', beardStyle: 'full', age: 'mid', iris: '#2a1c14', shoes: '#3a2a1e', mood: 'stern', ...o, over: crownHead('#c8963e') + over }
  : { top: '#2f4a7a', mantle: '#a8323a', lining: GOLD, trim: GOLD, belt: GOLD, skin: '#c99a72', hair: '#2a1c14', beard: '#2a1c14', beardStyle: 'short', age: 'mid', iris: '#2a1c14', shoes: '#5a3a22', ...o, over: crownHead() + over });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  xHook:      { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
  xClement:   { key: '#ffe8c8', from: 'top', tint: '#9aa0d0', amt: 0.18, rim: '#ffe8d0', rimOp: 0.85 },
  xCatherine: { key: '#ffe0b8', from: 'top', tint: '#b8b0c8', amt: 0.16, rim: '#ffe8c8', rimOp: 0.85 },
  xBart:      { key: '#ffe0c0', from: 'r', tint: '#e0d0d8', amt: 0.1, rim: '#fff0dc', rimOp: 0.8 },
  xLawrence:  { key: '#ffb070', from: 'r', tint: '#ffb890', amt: 0.18, rim: '#ffb070', rimOp: 0.9 },
  xDenis:     { key: '#ffc888', from: 'back', tint: '#ffd8b0', amt: 0.1, rim: '#ffe0b0', rimOp: 0.85 },
  xOutro:     { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `fslit${++LID}`, d = 5;
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

// ================================================================ the ranking ladder (screen-fixed, STORY.hud)
const RANK = [null, 5, 4, 3, 2, 1, null];
const BY = 362;   // badge row: rank 5 on the left ... rank 1 on the right
const txt = (s, size, fill, { font = 'Poppins', w = 700, stroke = '', sw = 0, y = 0 } = {}) =>
  `<text x="0" y="${y}" text-anchor="middle" font-family="${font},'DejaVu Sans',sans-serif" font-weight="${w}" font-size="${size}" fill="${fill}"`
  + (stroke ? ` stroke="${stroke}" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round"` : '') + `>${s}</text>`;
const badge = (r, state, label = String(r)) => {
  if (state === 'up') return `<circle r="34" fill="rgba(20,14,30,.58)" stroke="#fff4d8" stroke-opacity=".55" stroke-width="3"/>${txt(label, 36, '#fff4d8', { y: 13 })}`;
  if (state === 'past') return `<circle r="34" fill="rgba(20,14,30,.66)" stroke="${GOLD}" stroke-width="3.5"/>${txt(label, 36, GOLD, { y: 13 })}`;
  return `<circle r="70" fill="url(#haloGlow)"/><circle r="38" fill="${GOLD}" stroke="#fff4cc" stroke-width="4"/>${txt(label, 40, '#2b1d14', { y: 14 })}`;
};
/** The 5 4 3 2 ? ladder for scene i: the current saint's number stamps in big, flies into its badge, the badge lights up.
 * makeRankHud(at, ranks) builds one for any countdown story: at = that story's wordTimes(), ranks[i] = the rank shown in
 * scene i (null for the hook; the last scene shows every badge revealed). The number lands on the scene's word 'number'. */
export const makeRankHud = (at, RANK) => (i) => {
  const cur = RANK[i], t0 = cur ? at(i, 'number', -0.05) : 0, land = t0 + 1.45;
  let out = '';
  for (const r of [5, 4, 3, 2, 1]) {
    const x = 540 + (5 - r - 2) * 104, q = r === 1 ? '?' : String(r);
    let g;
    if (i === RANK.length - 1) g = badge(r, r === 1 ? 'cur' : 'past');
    else if (!cur || r < cur) g = badge(r, 'up', q);
    else if (r > cur) g = badge(r, 'past');
    else g = until(land, badge(r, 'up', q)) + `<g opacity="0"${M.tw([{ at: land - 0.02, dur: 0.3, from: { opacity: 0, scale: 1.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2.4)', origin: '0 0' }])}>${badge(r, 'cur')}</g>`;
    out += `<g transform="translate(${x},${BY})">${g}</g>`;
  }
  if (cur) {   // the big number: stamps in at the centre, then flies up into its badge
    const bx = 540 + (5 - cur - 2) * 104;
    out += `<g transform="translate(540,720)"><g opacity="0"${M.tw([{ at: t0, dur: 0.35, from: { opacity: 0, scale: 0.4 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 -100' },
      { at: t0 + 1.05, dur: 0.4, to: { x: bx - 540, y: BY - 720 + 100 * 0.2, scale: 0.18, opacity: 0 }, ease: 'power2.in' }])}>`
      + `<circle cx="0" cy="-100" r="230" fill="url(#haloGlow)" opacity=".9"/>${txt('#' + cur, 290, GOLD, { font: 'Lora', stroke: '#2b1d14', sw: 14 })}</g></g>`
      + `<g opacity="0"${M.tw([{ at: land - 0.02, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }, { at: land + 0.6, dur: 0.4, to: { opacity: 0 } }])}>${sparkles(10, bx - 70, bx + 70, BY - 60, BY + 60, { seed: 40 + i })}</g>`;
  }
  return out;
};
export const rankHud = makeRankHud(at, RANK);

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.85 ~1286,
// 0.78 ~1262, MID 0.75 ~1240-1250.
// The five in a row (hook and outro): one line, one scale, faces in the safe zone; Denis is not singled out (viewers guess #1).
const ROW = [[120, 'catherine'], [300, 'lawrence'], [480, 'clement'], [660, 'denis'], [840, 'bart']], RS = 1.45;
const rowSaint = (x, who, o) => ({
  catherine: () => catherine(x, 1345, RS, { armL: [26, 2, 3], propL: book(false), armR: [24, 2, 3], propR: o.glory ? palm_frond(0.9, -8) : '', ...o.p }),
  lawrence: () => lawrenceHD(x, 1345, RS, { armR: [30, 2, 3], propR: gridSmall, armL: [20, 2, 3], propL: o.glory ? palm_frond(0.9, 8) : '', ...o.p }),
  clement: () => clementHD(x, 1345, RS, { armR: [22, 2, 3], propR: anchor(0.95), armL: [16, 2, 3], ...o.p }),
  denis: () => denisHD(x, 1345, RS, { armR: [26, 2, 3], propR: crozier, armL: [20, 2, 3], ...o.p }),
  bart: () => bartholomewHD(x, 1345, RS, { flip: true, armR: [34, 2, 3], propR: knife, armL: [24, 2, 3], propL: book(false), ...o.p }),
}[who]());
const row = (mode, steps, glory = false) => ROW.map(([x, who]) => castShadow(x, 1345, RS, mode) + seq((op) => rowSaint(x, who, { glory, p: op }), steps)).join('');

// 0 · HOOK. SHOT "Five saints faced the cruelest deaths in history.": the five in a row at sunset over Rome, their signs in hand.
//     SHOT "Wait until you see what number one did after he was beheaded.": the camera pushes in on the row; speed lines.
function scene0() {
  const cr = at(0, 'cruelest'), wt = at(0, 'Wait'), no = at(0, 'number one');
  return lit(row('xHook', [[0, { mood: 'determined', look: [0, 0] }], [wt, { mood: 'determined', look: [0, -0.4] }], [no + 0.4, { mood: 'peaceful' }]]), 'xHook')
    + `<g opacity="0"${fadeIn(cr, 0.6)}>${glow(480, 760, 520, 0.35)}</g>`
    + speedLines(480, 900, { at: no, dur: 0.8, r0: 340, op: 0.38, color: '#fff4d8', seed: 4 })
    + NEAR(bokeh(6, { seed: 7, sides: true, op: [0.2, 0.4] }));
}

// 1 · #5 ST. CLEMENT I. SHOT "Number five, Pope Clement.": the old pope on the cliff top over the stormy Black Sea.
//     SHOT "Soldiers tied an iron anchor to his neck and threw him into the Black Sea.": a soldier strides in, the anchor and its
//     rope appear; on "threw" a flash, a splash, and he is gone.  SHOT "Tradition says the sea pulled back, and showed his
//     tomb.": the marble tomb rises in light where the water drew back.
const C1 = [400, 1345, 2.3], S1 = [790, 1322, 2.05], T1 = [600, 1286];
function scene1() {
  const pc = at(1, 'Pope Clement'), so = at(1, 'Soldiers'), an = at(1, 'anchor'), th = at(1, 'threw'), tr = at(1, 'Tradition'), tb = at(1, 'tomb');
  const gone = (svg) => `<g${fadeOut(th + 0.12, 0.3)}>${svg}</g>`;
  return layer(0.85, `<g opacity="0"${M.tw([{ at: tr + 0.2, dur: 1.2, from: { opacity: 0, y: 120 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>`
      + glow(T1[0], 1100, 300, 0.7) + `<g transform="translate(${T1[0]},${T1[1]})">${lit(marbleTomb(0.9), 'xClement')}</g>` + '</g>')
    + `<g opacity="0"${fadeIn(tb - 0.3, 0.8)}>${beam(T1[0] - 90, T1[0] + 90, T1[0] - 220, T1[0] + 220, 1300, 0.6)}${sparkles(16, 380, 820, 820, 1260, { seed: 11 })}</g>`
    + layer(0.95, lit(gone(walk(so - 0.1, 0.9, 260, castShadow(...S1, 'xClement') + seq((op) => legionary(...S1, { flip: true, armL: [16, 2, 3], look: [2.4, 0], ...op }),
      [[0, { armR: [20, 2, 3] }], [an - 0.2, { armR: [78, 3, 2.2] }], [th - 0.15, { armR: [118, 3, 2] }]]))), 'xClement'))
    + lit(gone(castShadow(...C1, 'xClement') + seq((op) => clementHD(...C1, { armL: [16, 2, 3], ...op }),
        [[0, { mood: 'determined', look: [0, 0], armR: [24, 2, 3] }], [pc + 0.5, { mood: 'happy', look: [0, 0], armR: [24, 2, 3] }],
          [so, { mood: 'determined', look: [2.4, 0], armR: [24, 2, 3] }], [an + 0.3, { mood: 'peaceful', look: [0, -1], armR: [30, 2, 3], halo: an + 0.3 }]])
      + `<g opacity="0"${fadeIn(an, 0.4)}><path d="M${C1[0] + 158} 1330 Q${C1[0] + 120} 1180 ${C1[0] + 30} 1150 Q${C1[0] + 8} 1100 ${C1[0] + 12} 868" stroke="#b89a68" stroke-width="8" fill="none" stroke-linecap="round"/>`
      + `<g transform="translate(${C1[0] + 170},1236)">${anchor(1.05)}</g></g>`), 'xClement')
    + flash(th) + splash(520, 1290, th + 0.15)
    + `<g opacity="0"${fadeIn(th + 0.3, 0.9)}>${glow(520, 1180, 280, 0.45)}</g>`
    + NEAR(foliage('l', 1640, { color: '#1c1a2a', seed: 10 }) + foliage('r', 1650, { color: '#1c1a2a', seed: 11 }));
}

// 2 · #4 ST. CATHERINE. SHOT "Number four, Catherine.": crowned, her book in hand, in Alexandria under a heavy sky.
//     SHOT "At eighteen, she out-argued fifty philosophers.": the philosophers fill in behind her, stern, then stunned.
//     SHOT "The emperor built a spiked wheel to break her.": the emperor points; the wheel rises beside her.
//     SHOT "She touched it, and it shattered.": she reaches out; cracks, a burst, the wheel flies apart (the reel's one big payoff).
const K2 = [320, 1345, 2.3], WX = 670, WY = 1080;
function scene2() {
  const ct = at(2, 'Catherine'), oa = at(2, 'out-argued'), ph = at(2, 'philosophers'), em = at(2, 'The emperor'), wh = at(2, 'spiked wheel'),
    bk = at(2, 'break her'), tc = at(2, 'She touched'), sh = at(2, 'shattered');
  const sages = [[600, 1.3, 0], [720, 1.35, 1], [840, 1.28, 2]].map(([x, s, i], k) => `<g opacity="0"${fadeIn(oa + k * 0.15, 0.4)}>${castShadow(x, 1245, s, 'xCatherine')}`
    + seq((op) => sage(x, 1245, s, i, { flip: true, look: [2.4, 0], armR: [14, 2, 3], armL: 20, ...op }), [[0, { mood: 'stern' }], [ph + 0.35 + k * 0.1, { mood: 'surprised' }]]) + '</g>').join('');
  const frame = `<path d="M${WX - 70} 1322 L${WX - 10} ${WY} M${WX + 70} 1322 L${WX + 10} ${WY}" stroke="#5a3a22" stroke-width="22" stroke-linecap="round"/><rect x="${WX - 90}" y="1312" width="180" height="16" rx="6" fill="#4a2e1c"/>`;
  return MID(lit(span(oa - 0.2, em, sages + sweat(720, 1245, 1.35, ph + 0.6)), 'xCatherine')
      + lit(from(em, walk(em, 0.8, 200, castShadow(850, 1245, 1.25, 'xCatherine') + seq((op) => emperorMax(850, 1245, 1.25, { flip: true, look: [2.4, 0], armL: [16, 2, 3], ...op }),
        [[0, { mood: 'stern', armR: [80, 3, 2.2] }], [tc, { mood: 'stern', armR: [24, 2, 3] }], [sh + 0.15, { mood: 'surprised', armR: [24, 2, 3] }]]) + sweat(850, 1245, 1.25, sh + 0.5))), 'xCatherine'))
    + layer(0.95, lit(`<g opacity="0"${M.tw([{ at: wh - 0.2, dur: 0.8, from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>${frame}`
      + `<g${M.tw([{ at: sh, dur: 0.05, from: { opacity: 1 }, to: { opacity: 0 } }])}><g transform="translate(${WX},${WY}) scale(1.1)"><g${M.spin(-22)}>${spikedWheel}</g></g></g>`
      + `<g transform="translate(${WX},${WY}) scale(1.1)">${wheelPieces(sh)}</g></g>`, 'xCatherine'))
    + lit(castShadow(...K2, 'xCatherine') + seq((op) => catherine(...K2, { ...op }),
      [[0, { mood: 'determined', look: [0, 0], armL: [24, 2, 3], propL: book(false), armR: [16, 2, 3] }], [ct + 0.5, { mood: 'happy', look: [0, 0], armL: [24, 2, 3], propL: book(false), armR: [16, 2, 3] }],
        [oa, { mood: 'happy', look: [2.4, -0.2], armL: [24, 2, 3], propL: book(true), armR: [96, 4, 2.2] }], [em, { mood: 'determined', look: [2.6, -0.4], armL: [16, 2, 3], armR: [16, 2, 3] }],
        [bk, { mood: 'worried', look: [2.6, -0.6], armL: [16, 2, 3], armR: [16, 2, 3] }], [tc, { mood: 'peaceful', armL: [16, 2, 3], armR: [74, 2, 3] }],
        [sh + 0.1, { mood: 'awe', look: [2.4, -1], armL: [16, 2, 3], armR: [60, 2, 3] }], [sh + 1.0, { mood: 'tender', look: [2.4, -1], armL: [16, 2, 3], armR: [40, 2, 3], halo: sh + 1.0 }]]), 'xCatherine')
    + crack(WX, WY, 220, sh - 0.25, { seed: 5 }) + flash(sh) + burst(WX, WY, 460, sh)
    + NEAR(foliage('r', 1660, { color: '#262230', seed: 10 }));
}

// 3 · #3 ST. BARTHOLOMEW. SHOT "Number three, the apostle Bartholomew.": he preaches in the mountains of Armenia, book in hand.
//     SHOT "He won an Armenian king to Christ, so the king's brother had him flayed alive.": the crowned king kneels to him;
//     cut: the king's brother points in fury, Bartholomew stands bound to a post, the executioner raises his knife (no blow).
//     SHOT "He kept praying to the end.": light pours down on him; the executioner shrinks back; a halo.
const B3 = [380, 1345, 2.3], KG = [770, 1322, 2.0], EX3 = [730, 1322, 2.05], BR = [880, 1245, 1.25];
function scene3() {
  const ba = at(3, 'Bartholomew'), ki = at(3, 'Armenian king'), so = at(3, "so the king's"), bro = at(3, 'brother'), fl = at(3, 'flayed'), kp = at(3, 'He kept'), pr = at(3, 'praying');
  return MID(lit(from(so, castShadow(...BR, 'xBart') + seq((op) => royal(...BR, 1, { flip: true, look: [2.4, 0], armL: [16, 2, 3], ...op }),
      [[0, { armR: [24, 2, 3] }], [bro, { armR: [84, 3, 2] }], [kp + 0.4, { armR: [24, 2, 3], mood: 'surprised' }]]) + rage(...BR, bro + 0.2)), 'xBart'))
    + layer(0.95, lit(span(ki - 0.3, so, walk(ki - 0.3, 0.8, 240, castShadow(...KG, 'xBart') + seq((op) => royal(...KG, 0, { flip: true, look: [2.4, -0.6], ...op }),
        [[0, { mood: 'happy', armL: [16, 2, 3], armR: [16, 2, 3] }], [ki + 0.6, { mood: 'joy', kneel: true, ...PRAY }]])))
      + from(fl - 0.6, `<g${fadeOut(kp + 0.3, 0.6)}>` + walk(fl - 0.6, 0.6, 160, castShadow(...EX3, 'xBart') + seq((op) => headsman(...EX3, { flip: true, look: [2.4, 0], armL: [20, 2, 3], ...op }),
        [[0, { armR: [12, 2, 3], propR: knife }], [fl - 0.1, { armR: [172, 2, 2], propR: knife }], [kp, { mood: 'worried', armR: [30, 2, 3], propR: knife }]])) + '</g>'), 'xBart'))
    + `<g opacity="0"${fadeIn(kp - 0.1, 0.6)}>${beam(B3[0] - 110, B3[0] + 110, B3[0] - 260, B3[0] + 260, 1360, 0.7)}${glow(B3[0], 760, 360, 0.5)}</g>`
    + lit(castShadow(...B3, 'xBart') + until(so, seq((op) => bartholomewHD(...B3, { armL: [26, 2, 3], propL: book(true), ...op }),
        [[0, { mood: 'happy', look: [0, 0], armR: [40, 2, 3] }], [ba + 0.4, { mood: 'happy', look: [2.4, -0.2], armR: [118, 4, 2.2] }], [ki + 0.6, { mood: 'tender', look: [2.4, 0.6], armR: [70, 2, 3] }]]))
      + from(so, seq((op) => bartholomewHD(...B3, { armL: 6, armR: 6, under: postRopes.under, over: postRopes.over, ...op }),
        [[0, { mood: 'determined', look: [2.4, 0] }], [fl + 0.2, { mood: 'peaceful' }], [kp, { mood: 'awe', look: [0, -2] }], [pr + 0.4, { mood: 'peaceful', halo: pr + 0.4 }]])), 'xBart')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(16, 200, 620, 560, 1100, { seed: 15 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#3a3a44', seed: 3 }));
}

// 4 · #2 ST. LAWRENCE. SHOT "Number two, Lawrence, a deacon of Rome.": the young deacon in his red dalmatic at dusk.
//     SHOT "Ordered to hand over the Church's treasure, he brought the poor.": the prefect strides in and demands; Lawrence
//     points to the poor and the sick walking in behind him.  SHOT "So they laid him on an iron grill over hot coals.": cut: the
//     gridiron glowing over the coals, Lawrence lying on it, calm; a soldier with a fork.  SHOT "He told them:" he turns his
//     head to the soldier.  SHOT (Lawrence's voice) "Turn me over. This side is done.": he smiles and speaks; the soldier is stunned.
const L4 = [340, 1345, 2.3], PF = [800, 1322, 2.05], GX = 560, GTOP = 140, LS = 1.55, LY = 1345 - GTOP - 78, FK = [860, 1322, 2.0];
const LHEAD = [GX + 236 - Math.round(252 * LS), LY];
function scene4() {
  const lw = at(4, 'Lawrence'), od = at(4, 'Ordered'), po = at(4, 'the poor'), so = at(4, 'So they'), gr = at(4, 'iron grill'), ht = at(4, 'He told'),
    q0 = at(4, 'Turn me over'), qe = at(4, 'side is done', 0.6);
  const poor = [[520, 0, 0.2], [650, 1, 0.45], [430, 3, 0.7]].map(([x, i, d]) => layer(0.78, lit(walk(po - 0.6 + d, 1.0, -420, castShadow(x, 1262, 1.4, 'xLawrence')
    + poorHD(x, 1262, 1.4, i, { mood: i === 3 ? 'tender' : 'happy', look: [2, 0], armL: [16, 2, 3], armR: i === 1 ? [10, 0, 3] : [20, 2, 3], propR: i === 1 ? crutch : '' })), 'xLawrence'))).join('');
  const lying = `<g transform="translate(${GX + 236},${LY}) rotate(-90)"><g${squash(gr - 0.1, 0, 0, 0.06)}>` + seq((op) => lawrenceHD(0, 0, LS, { armL: 8, armR: 8, ...op }),
    [[0, { mood: 'peaceful' }], [ht, { mood: 'happy', look: [0, 2.6] }], [q0 - 0.05, { mood: 'happy', look: [0, 2.6], talk: [q0, qe] }], [qe, { mood: 'joy', look: [0, 2.6] }]]) + '</g></g>';
  return until(so, MID(span(po - 0.6, so, poor))
      + layer(0.95, lit(walk(od - 0.2, 0.9, 260, castShadow(...PF, 'xLawrence') + seq((op) => governor(...PF, { flip: true, look: [2.4, 0], armL: [16, 2, 3], ...op }),
        [[0, { armR: [84, 3, 2.2] }], [po, { mood: 'surprised', armR: [24, 2, 3] }]])), 'xLawrence'))
      + lit(castShadow(...L4, 'xLawrence') + seq((op) => lawrenceHD(...L4, { armL: [20, 2, 3], ...op }),
        [[0, { mood: 'happy', look: [0, 0], armR: [24, 2, 3], propR: gridSmall }], [od, { mood: 'determined', look: [2.4, 0], armR: [24, 2, 3], propR: gridSmall }],
          [po - 0.3, { mood: 'happy', look: [2.2, -0.2], armR: [104, 4, 2.2] }]]), 'xLawrence'))
    + from(so, layer(0.95, lit(castShadow(...FK, 'xLawrence') + seq((op) => legionary(...FK, { flip: true, armL: [16, 2, 3], armR: [30, 2, 3], propR: fork, look: [2.4, 0.6], ...op }),
        [[0, { mood: 'stern' }], [qe - 0.4, { mood: 'surprised' }]]) + sweat(...FK, qe - 0.2), 'xLawrence'))
      + `<g transform="translate(${GX},1345)">${lit(gridiron(640, GTOP), 'xLawrence')}</g>` + lit(lying, 'xLawrence')
      + `<g opacity="0"${fadeIn(q0, 0.4)}>${sparkles(10, LHEAD[0] - 120, LHEAD[0] + 120, LHEAD[1] - 160, LHEAD[1] + 60, { seed: 17 })}</g>`)
    + NEAR(foliage('l', 1650, { color: '#2a1e1e', seed: 6 }));
}

// 5 · #1 ST. DENIS. SHOT "And number one, Denis, the bishop of Paris, beheaded on a hill called Montmartre.": the old bishop
//     kneels in prayer on the hill over Paris; the executioner raises his sword; on "beheaded" a white flash (no blow) and a
//     column of light hides him.  SHOT (slow) "Tradition says his body stood up, and picked up his own head.": the light clears:
//     Denis stands, holding his mitred head in his hands, at peace, a halo on the head; the executioner stumbles back.
//     SHOT "He walked for miles, preaching, until he fell.": he walks toward the far abbey (where Saint-Denis stands), then
//     kneels down in the light.  SHOT "They broke their bodies, but never their faith.": Denis in glory, whole, with his crozier.
const D5 = [400, 1345, 2.3], EX5 = [740, 1322, 2.1], DW = 300, DG = [500, 1345, 2.3];
const holding = (x, y, s, kneel = false) => heldHead(x, y - (kneel ? 60 : 104) * s, s * 0.84);   // at the waist, between the hands
function scene5() {
  const dn = at(5, 'Denis'), bh = at(5, 'beheaded'), su = at(5, 'stood up'), ph = at(5, 'picked up'), wk = at(5, 'He walked'), fe = at(5, 'until he fell'),
    tb = at(5, 'They broke'), fa = at(5, 'faith');
  const walker = (op) => denisBody(D5[0], D5[1], D5[2], { armL: 14, armR: 14, ...op }) + holding(D5[0], D5[1], D5[2]);
  return until(tb, layer(0.95, lit(until(su + 1.2, castShadow(...EX5, 'xDenis') + seq((op) => headsman(...EX5, { flip: true, armL: [20, 2, 3], look: [2.4, 0.6], ...op }),
        [[0, { armR: [14, 2, 3], propR: gladius }], [bh - 0.7, { armR: [150, 2, 2], propR: gladius }], [bh + 0.25, { armR: [12, 2, 3], propR: gladius, mood: 'worried' }],
          [su, { armR: [10, 2, 3], armL: [96, 4, 1.2], propR: gladius, mood: 'surprised' }]]) + sweat(...EX5, su + 0.2)), 'xDenis'))
      // kneeling in prayer, until the flash
      + lit(castShadow(...D5, 'xDenis') + until(bh + 0.15, seq((op) => denisHD(...D5, { kneel: true, ...PRAY, ...op }),
        [[0, { mood: 'peaceful' }], [dn + 0.3, { mood: 'peaceful', look: [0, -1] }]]))
        // standing, holding his head; then walking toward the abbey; then kneeling where he fell
        + span(su, wk, walker({}))
        + span(wk, fe + 0.2, walkOut(wk, Math.max(1, fe - wk), DW, walker({}), { hop: 6, step: 0.36 }))
        + from(fe + 0.2, denisBody(D5[0] + DW, D5[1], D5[2], { kneel: true, armL: 10, armR: 10 }) + holding(D5[0] + DW, D5[1], D5[2], true)), 'xDenis')
      + `<g opacity="0"${M.tw([{ at: bh + 0.05, dur: 0.15, from: { opacity: 0 }, to: { opacity: 1 } }, { at: su - 0.3, dur: 0.6, to: { opacity: 0 } }])}>`
        + beam(D5[0] - 120, D5[0] + 120, D5[0] - 260, D5[0] + 260, 1380, 0.95) + glow(D5[0], 1000, 420, 0.95) + '</g>'
      + flash(bh) + speedLines(D5[0], 900, { at: ph, dur: 0.9, r0: 320, op: 0.35, color: '#fff4d8', seed: 6 })
      + `<g opacity="0"${fadeIn(fe, 0.8)}>${beam(D5[0] + DW - 110, D5[0] + DW + 110, D5[0] + DW - 240, D5[0] + DW + 240, 1380, 0.6)}${glow(780, 1060, 260, 0.55)}</g>`)
    // glory: whole again, in light, with the crozier
    + from(tb, `${beam(DG[0] - 130, DG[0] + 130, DG[0] - 300, DG[0] + 300, 1380, 0.6)}${glow(DG[0], 820, 420, 0.5)}`
      + lit(castShadow(...DG, 'xDenis') + seq((op) => denisHD(...DG, { halo: true, armR: [26, 2, 3], propR: crozier, armL: [30, 2, 3], propL: palm_frond(1.0, 8), ...op }),
        [[0, { mood: 'peaceful', look: [0, -1] }], [fa, { mood: 'tender' }]]), 'xDenis') + `<g opacity="0"${fadeIn(fa, 0.6)}>${sparkles(16, 260, 760, 520, 1000, { seed: 23 })}</g>`)
    + NEAR(bokeh(6, { seed: 31, sides: true, op: [0.2, 0.4] }));
}

// 6 · OUTRO. SHOT "Which saint's courage surprised you the most?": the five again in a row, in glory, with halos and palms.
//     SHOT "Follow for more saint stories.": they smile at the viewer.
function scene6() {
  const wh = at(6, 'courage'), fo = at(6, 'Follow');
  return `${glow(480, 760, 560, 0.4)}`
    + lit(row('xOutro', [[0, { mood: 'tender', halo: true, look: [0, 0] }], [wh, { mood: 'happy', halo: true, look: [0, 0] }], [fo, { mood: 'tender', halo: true }]], true), 'xOutro')
    + `<g opacity="0"${fadeIn(fo, 0.8)}>${sparkles(18, 80, 900, 560, 980, { seed: 29 })}</g>`
    + NEAR(bokeh(7, { seed: 45, sides: true }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };   // the path does the travelling (cam.path)
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const FAST = { speed: 1.05, gap: 0.22, gain: 0.5 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
const DARK = { speed: 0.97, gap: 0.28, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } };
export const STORY = {
  slug: SLUG, name: 'Five_Saints_Who_Refused_to_Break',
  bg3d: './five_saints_countdown.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'andrew.bg3d.js': './andrew_apostle.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js', 'clement.bg3d.js': './clement_anchor.bg3d.js',
    'catherine.bg3d.js': './catherine_of_alexandria.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  hud: rankHud,
  cast: { lawrence: { voice: 'im_nicola', speed: 0.95 } },
  music: { story: 'a countdown of five early martyrs who would not break: an anchor in the Black Sea, a shattered wheel, an apostle in Armenia, a deacon on a gridiron in Rome, and a bishop of Paris who rose and walked after he was beheaded',
    color: 'Rome and the early martyrs: low brass, war drums, a wordless choir and a deep cello line',
    cues: { 4: 'Warm firelight menace: low drums and cello, then a wry, gentle lift of strings on his last words.', 5: 'The reveal: a hush, then the full wordless choir rising slowly into the biggest swell of the reel.' } },
  thumb_hook: 'Wait till you see #1', thumb_title: '5 Saints Who Never Broke', thumb_scene: 0, thumb_t: 2.6, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'dˈɛniz': 'dˈɛnɪs',                 // Denis: DEN-iss
    'mˈɔntmɑːɹɾɚ': 'mɔːnmˈɑːɹtɹə',       // Montmartre: mon-MAR-truh
  },
  scenes: [
    { kicker: 'A COUNTDOWN OF MARTYRS', title: 'They Refused to Break', art: scene0, bg3d: 'xHook', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(0, 'cruelest'), to: [480, 1000], z: 1.1, frame: [540, 980] },
        { at: at(0, 'number one'), to: [480, 960], z: 1.22, frame: [540, 960] }] },
      tone: HOOK,
      say: ['Five saints faced the cruelest deaths in history.', 'Wait until you see what number one did after he was beheaded.'] },
    { kicker: 'THE BLACK SEA · AROUND 101', title: '5. St. Clement I', art: scene1, bg3d: 'xClement', front3d: true,
      cam: { ...GLIDE, shake: { at: at(1, 'threw', 0.1), amt: 16, dur: 0.6 }, path: [
        { at: at(1, 'Pope Clement'), to: face(...C1), z: 1.3, frame: [520, 840] },
        { at: at(1, 'anchor'), to: [520, 1060], z: 1.08, frame: [540, 980] },
        { at: at(1, 'tomb'), to: [T1[0], 1150], depth: 0.85, z: 1.25, frame: [540, 980] }] },
      tone: FAST,
      say: ['Number five, Pope Clement.', 'Soldiers tied an iron anchor to his neck and threw him into the Black Sea.', 'Tradition says the sea pulled back, and showed his marble tomb.'] },
    { kicker: 'ALEXANDRIA · ABOUT 305', title: '4. St. Catherine', art: scene2, bg3d: 'xCatherine', front3d: true,
      cam: { ...GLIDE, shake: { at: at(2, 'shattered', 0.05), amt: 22, dur: 0.7 }, path: [
        { at: at(2, 'Catherine'), to: face(...K2), z: 1.3, frame: [500, 840] },
        { at: at(2, 'philosophers'), to: [700, 1080], depth: 0.75, z: 1.12, frame: [600, 980] },
        { at: at(2, 'spiked wheel'), to: [WX, WY], depth: 0.95, z: 1.12, frame: [600, 960] },
        { at: at(2, 'shattered'), to: [520, 1040], z: 1.0, frame: [540, 980] }] },
      tone: FAST,
      say: ['Number four, Catherine.', 'At eighteen, she out-argued fifty philosophers.', 'The emperor built a spiked wheel to break her.', 'She touched it, and it shattered.'] },
    { kicker: 'ARMENIA · FIRST CENTURY', title: '3. St. Bartholomew', art: scene3, bg3d: 'xBart', front3d: true,
      cam: { ...GLIDE, whip: 'r', path: [
        { at: at(3, 'Bartholomew'), to: face(...B3), z: 1.3, frame: [520, 840] },
        { at: at(3, 'flayed'), to: [580, 1000], z: 1.08, frame: [540, 960] },
        { at: at(3, 'praying'), to: face(...B3), z: 1.4, frame: [540, 860] }] },
      tone: STAND,
      say: ['Number three, the apostle Bartholomew.', "He won an Armenian king to Christ, so the king's brother had him flayed alive.", 'He kept praying to the end.'] },
    { kicker: 'ROME · AD 258', title: '2. St. Lawrence', art: scene4, bg3d: 'xLawrence', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(4, 'Lawrence'), to: face(...L4), z: 1.3, frame: [520, 840] },
        { at: at(4, 'the poor'), to: [560, 1060], depth: 0.78, z: 1.08, frame: [560, 980] },
        { at: at(4, 'iron grill'), to: [GX, 1160], z: 1.05, frame: [540, 1000] },
        { at: at(4, 'Turn me over'), to: LHEAD, z: 1.42, frame: [540, 900] }] },
      tone: STAND,
      say: ['Number two, Lawrence, a deacon of Rome.', "Ordered to hand over the Church's treasure, he brought the poor.", 'So they laid him on an iron grill over hot coals.', 'He told them:',
        { text: 'Turn me over. This side is done.', who: 'lawrence' }] },
    { kicker: 'MONTMARTRE, PARIS · ABOUT 250', title: '1. St. Denis', art: scene5, bg3d: 'xDenis', front3d: true,
      cam: { ...GLIDE, whip: 'r', shake: { at: at(5, 'beheaded', 0.05), amt: 10, dur: 0.5 }, path: [
        { at: at(5, 'Denis'), to: face(D5[0], D5[1], D5[2], true), z: 1.3, frame: [520, 880] },
        { at: at(5, 'stood up'), to: [D5[0], 1000], z: 1.1, frame: [500, 960] },
        { at: at(5, 'until he fell'), to: [D5[0] + DW - 40, 1040], z: 1.08, frame: [540, 980] },
        { at: at(5, 'faith'), to: face(...DG), z: 1.32, frame: [540, 860] }] },
      tone: DARK,
      say: ['And number one, Denis, the bishop of Paris, beheaded on a hill called Montmartre.', { text: 'Tradition says his body stood up, and picked up his own head.', speed: 0.85 },
        'He walked for miles, preaching, until he fell.', { text: 'They broke their bodies, but never their faith.', speed: 0.92 }] },
    { kicker: 'FIVE MARTYRS · FIVE CROWNS', title: 'They Never Broke', art: scene6, bg3d: 'xOutro', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(6, 'courage'), to: [480, 1000], z: 1.12, frame: [540, 980] },
        { at: at(6, 'Follow'), to: [480, 980], z: 1.2, frame: [540, 960] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ["Which saint's courage surprised you the most?", 'Follow for more saint stories.'] },
  ],
};
