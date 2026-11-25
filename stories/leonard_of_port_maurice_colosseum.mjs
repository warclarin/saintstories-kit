// St. Leonard of Port Maurice: the Stations of the Cross in the Colosseum (one story, Rome, 1750-1751). Feast: November 26.
// All-3D backgrounds (leonard_of_port_maurice_colosseum.bg3d.js: set-ups of roma() from gelasius.bg3d.js); cam3d; characters hd().
// Motion: the Ricks Clips standard (fixed camera, a hard cut on every sentence, characters act out each line, no sway or tilt).
// Sources: Catholic Encyclopedia (New Advent / catholic.org) "St. Leonard of Port Maurice": born 20 Dec 1676 at Porto Maurizio;
// Riformella Franciscan; "Besides the celebrated stations in the Colosseum at Rome, St. Leonard erected 571 others in all parts of
// Italy"; "The erection of the Stations of the Cross in the Coliseum in December, 1750, was really Leonard's last great work at
// Rome"; he induced Benedict XIV to have them erected in the Colosseum, "so frequently bedewed with the blood of martyrs", and
// "the saint himself preached on the occasion"; in Nov 1751 Benedict XIV called him to Rome from Bologna; "The strain of his
// missionary labours and his mortifications had completely exhausted his body"; he arrived on the evening of 26 Nov 1751 at
// S. Bonaventura on the Palatine and "expired on the same night at eleven o'clock"; beatified 1796 (Pius VI), canonized 29 June 1867
// (Pius IX). Italian Senate "Antiquorum habet" (search summary): on 25 January 1750 Leonard implored Benedict XIV to let the
// confraternity hold the fourteen Stations in the Colosseum, granted "by immediate rescript"; Benedict XIV's edict forbade the
// desecration of the monument and consecrated the arena to the Passion of Christ and the martyrs for the 1750 Jubilee.
// Wikipedia "Leonard of Port Maurice": over forty years of preaching; stations in over 500 places; townsfolk who expected "a
// bejeweled cardinal" got "a humble, shoeless, muddy friar"; patron of missionaries and preachers. The Catholic Company: the
// Vatican's Good Friday service is held at the Colosseum Stations; Aleteia: Stations of the Cross "in almost every Catholic church". Vatican News: feast November 26.
// Exported for later reels: leonard, popeBenedict, popeToday, noble1750, guard1750, roman1750, station, ruinedArena, italyMap,
// candle, tricorn, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, book, beam, cross_staff, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { speedLines, sweat, burst, squash, mapCard, pin, route } from '../cartoonfx.mjs';
import { walk, walkOut, stonemason } from './peter_of_alexandria_torn_robe.mjs';
import { friary } from './kolbe.mjs';
import { scroll } from './andrew_apostle.mjs';
import { roundShield } from './edmund_last_stand.mjs';
import { gladius, arenaStands } from './perpetua_arena.mjs';

const SLUG = 'st_leonard_of_port_maurice_colosseum';
const at = wordTimes(SLUG);
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };
const STILL = { move: 'push', amt: 0.002, oy: 1000 };   // a fixed camera (Ricks Clips shots)

// ================================================================ props and set pieces
/** A tricorn hat (hd body space, on the head). */
export const tricorn = (c = '#22202a', trim = GOLD) => `<g><path d="M-58 -282 Q-30 -300 0 -296 Q30 -300 58 -282 Q44 -318 0 -326 Q-44 -318 -58 -282Z" fill="${c}"/>`
  + `<path d="M-58 -282 Q-30 -300 0 -296 Q30 -300 58 -282" stroke="${trim}" stroke-width="3" fill="none"/><path d="M-20 -318 Q0 -326 20 -318" stroke="${light(c, 0.3)}" stroke-width="3" fill="none"/></g>`;
const zucchetto = '<ellipse cx="0" cy="-289" rx="22" ry="8" fill="#fbf8f0"/><ellipse cx="-5" cy="-291" rx="10" ry="3" fill="#ffffff" opacity=".8"/>';
const pectoral = `<path d="M-14 -200 Q0 -176 0 -166 Q0 -176 14 -200" stroke="${GOLD}" stroke-width="2.5" fill="none"/><path d="M0 -168 v24 M-8 -159 h16" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
/** The friar's hood lying on his shoulders, behind the head (body space, `under`). */
const hood = '<path d="M-44 -212 Q-52 -240 -32 -252 Q0 -238 32 -252 Q52 -240 44 -212 Q0 -194 -44 -212Z" fill="#4a3220"/>';
/** Mud on the hem and feet of a barefoot friar (body space, `over`). */
const mud = '<g fill="#4a3424" opacity=".75"><ellipse cx="-34" cy="-12" rx="14" ry="6"/><ellipse cx="6" cy="-8" rx="10" ry="5"/><ellipse cx="38" cy="-16" rx="12" ry="5"/><ellipse cx="-14" cy="-26" rx="6" ry="4"/></g>';
/** A lit candle held in the hand. */
export const candle = `<g><rect x="-4" y="-64" width="8" height="64" rx="3" fill="#f6efe0"/><circle cy="-76" r="46" fill="url(#sunGlow)" opacity=".75"/>`
  + `<g${M.flick(0.5, 0, 0.6)}><path d="M-5 -66 Q-7 -80 0 -92 Q7 -80 5 -66Z" fill="#ffb040"/><path d="M-2 -67 Q-3 -76 0 -83 Q3 -76 2 -67Z" fill="#fff0b0"/></g></g>`;
/** One Station of the Cross: a small stone shrine with a pediment and a painted panel with a cross (base centre at 0,0). */
export const station = (s = 1, n = 0) => `<g transform="scale(${s})"><ellipse cy="4" rx="34" ry="6" fill="#140c14" opacity=".25"/>`
  + `<rect x="-26" y="-108" width="52" height="108" rx="3" fill="#e8dcc4"/><rect x="10" y="-108" width="16" height="108" fill="#c8b898" opacity=".8"/>`
  + `<path d="M-34 -108 L0 -136 L34 -108Z" fill="#d8c8a8"/><path d="M0 -136 L34 -108 L12 -108Z" fill="#b8a684"/>`
  + `<rect x="-17" y="-96" width="34" height="46" rx="2" fill="${['#7a2a2a', '#2a3a6a', '#3a5a3a'][n % 3]}"/><path d="M0 -90 V-56 M-10 -78 H10" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>`
  + `<path d="M0 -136 v-18 M-7 -147 h14" stroke="${dark('#d8c8a8', 0.4)}" stroke-width="4"/></g>`;
/** The ruined arena of the Colosseum seen from the sand (a MID card): broken tiers of arches, terraces with weeds and a podium
 * wall; its base sits on the 3D sand at the card's feet line. */
export function ruinedArena({ top = 560, base = 1250, stone = '#cdb08a' } = {}) {
  const curve = (y, k = 68) => (x) => y + k * (1 - Math.min(1, ((x - 540) / 740) ** 2));
  let s = '';
  // broken top edge (jagged), outer wall with three tiers of arches
  let edge = `M-200 ${top + 40}`;
  for (let x = -200; x <= 1280; x += 40) edge += ` L${x} ${f(top - 40 + ((x * 7) % 90) + (x > 600 && x < 900 ? 70 : 0))}`;
  s += `<path d="${edge} L1280 ${base} L-200 ${base}Z" fill="${dark(stone, 0.1)}"/>`;
  for (let t = 0; t < 3; t++) {
    const y0 = top + 30 + t * 118, cy = curve(y0, 50 - t * 8);
    for (let i = 0; i < 18; i++) { const x = -180 + i * 84, y = cy(x);
      if (t === 0 && x > 600 && x < 900) continue;   // the broken stretch
      s += `<path d="M${x - 27} ${f(y + 96)} V${f(y + 30)} a27 27 0 0 1 54 0 V${f(y + 96)}Z" fill="${dark(stone, 0.5 - t * 0.06)}"/>`; }
    s += `<path d="M-200 ${f(y0 + 100)} Q540 ${f(y0 + 100 + 2 * (50 - t * 8))} 1280 ${f(y0 + 100)}" stroke="${light(stone, 0.2)}" stroke-width="9" fill="none"/>`;
  }
  // terraces of crumbling seats with weeds
  for (let t = 0; t < 3; t++) {
    const y0 = top + 380 + t * 60;
    s += `<path d="M-200 ${y0} Q540 ${y0 + 70} 1280 ${y0} V${y0 + 60} Q540 ${y0 + 130} -200 ${y0 + 60}Z" fill="${t % 2 ? stone : dark(stone, 0.07)}"/>`
      + `<path d="M-200 ${y0 + 56} Q540 ${y0 + 126} 1280 ${y0 + 56}" stroke="${light(stone, 0.25)}" stroke-width="5" fill="none"/>`;
    for (let x = -160 + t * 37; x < 1260; x += 130) { const yy = curve(y0 + 52, 70)(x);
      s += `<path d="M${x - 14} ${f(yy)} q6 -26 10 -2 q4 -30 8 0 q6 -22 10 2Z" fill="#6a7a3a" opacity=".85"/>`; }
  }
  // the podium wall around the sand
  s += `<path d="M-200 ${base - 110} Q540 ${base - 82} 1280 ${base - 110} V${base} H-200Z" fill="${dark(stone, 0.2)}"/>`
    + `<path d="M-200 ${base - 116} Q540 ${base - 88} 1280 ${base - 116} V${base - 104} Q540 ${base - 76} -200 ${base - 104}Z" fill="${light(stone, 0.18)}"/>`;
  return s;
}
/** Where the fourteen shrines stand along the podium (x, base y on the MID card), left to right. */
const STATIONS = Array.from({ length: 14 }, (_, k) => { const x = -40 + k * 86; return [x, Math.round(1250 - 112 + 28 * (1 - Math.min(1, ((x - 540) / 740) ** 2)))]; });
const stationsPop = (t0, dt = 0.16, s = 0.95) => STATIONS.map(([x, y], k) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t0 + k * dt, dur: 0.4, from: { opacity: 0, scale: 0.2, y: 40 }, to: { opacity: 1, scale: 1, y: 0 }, ease: 'back.out(2.2)', origin: '0 0' }])}>${station(s, k)}</g></g>`).join('');
const stationsAll = (s = 0.95) => STATIONS.map(([x, y], k) => `<g transform="translate(${x},${y})">${station(s, k)}</g>`).join('');
/** A simple map of Italy (no words): the boot, Sicily, Sardinia and Corsica. */
const ITALY = 'M330 470 C420 430 560 430 700 470 L725 560 L700 640 L760 760 L830 880 L900 1010 L975 1105 L1015 1110 L990 1170 L1062 1258 L1048 1292 L980 1262 L920 1250 L880 1300 L902 1382 L862 1462 L800 1442 L822 1362 L760 1250 L700 1180 L620 1080 L540 1000 L470 900 L430 820 L400 740 L330 652 L262 640 L250 560 Z'
  + ' M690 1520 L905 1494 L862 1606 Z M300 990 C340 960 372 1000 366 1060 C360 1130 318 1150 296 1110 C280 1070 280 1010 300 990 Z M318 820 C342 806 356 840 348 880 C340 920 318 916 312 880 C306 850 306 830 318 820 Z';
export const italyMap = (t, n = 48) => {
  const R = (k) => { const v = Math.sin(k * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };
  const inside = []; for (let k = 0; inside.length < n && k < 900; k++) {
    // sample points along the boot's spine (Liguria -> Calabria) with some spread, so every pin lands on land
    const u = R(k), x = 330 + u * 520 + (R(k + 300) - 0.5) * 150, y = 560 + u * 820 + (R(k + 600) - 0.5) * 90;
    if (x > 300 && x < 1000 && y > 540 && y < 1420 && !(y > 1150 && x < 700)) inside.push([x, y]); }
  const cross = `<path d="M0 -14 V14 M-9 -4 H9" stroke="#7a2a2a" stroke-width="5" stroke-linecap="round"/>`;
  return mapCard({ sea: 'M-400 -400 H1480 V2320 H-400 Z', land: ITALY })
    + inside.map(([x, y], k) => pin(f(x), f(y), t + k * 0.045, k % 6 ? '' : `<g transform="scale(1.4)">${cross}</g>`, k % 3 ? '#c8401e' : '#8a5a2a')).join('')
    + pin(540, 1000, t + 0.1, `<g transform="scale(1.1)"><circle r="34" fill="url(#sunGlow)"/><rect x="-26" y="-14" width="52" height="28" rx="12" fill="#e8d4b0" stroke="#9a7a48" stroke-width="3"/></g>`, '#f2a020');
};

// ================================================================ characters
const SKL = '#dba882';
/** St. Leonard of Port Maurice: an old Franciscan friar of the Riformella, brown habit with a hood, white cord, tonsure, grey
 * beard, barefoot in sandals; muddy: mud on the hem. */
export const leonard = (x, y, s, { muddy = false, over = '', under = '', ...o } = {}) => hd(x, y, s, {
  top: '#6a4a30', plain: true, trim: '#5a3e28', mantle: null, belt: '#efe6d2', skin: SKL, hair: '#bfb8ae', hairStyle: 'tonsure', beard: '#cfc8bc', beardStyle: 'full',
  age: 'old', iris: '#4a3424', ...o, under: hood + under, over: (muddy ? mud : '') + over });
const staff = (h = 300) => cross_staff(h);
/** Pope Benedict XIV: white cassock, red mozzetta, white zucchetto, gold pectoral cross, clean-shaven. */
export const popeBenedict = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#f6f2ea', plain: true, trim: GOLD, mantle: '#b3202e', lining: '#f6f2ea', belt: false,
  skin: '#e2b48f', hair: '#cfc8bc', hairStyle: 'old', beard: null, age: 'old', iris: '#4a3a2a', shoes: '#b3202e', ...o, over: pectoral + zucchetto + over });
/** The Pope today (generic): all in white, white zucchetto, gold pectoral cross. */
export const popeToday = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#f8f6f0', plain: true, trim: '#e8e2d4', mantle: '#f8f6f0', lining: '#e8e2d4', belt: false,
  skin: '#e2b48f', hair: '#bdb6ac', hairStyle: 'short', beard: null, age: 'old', iris: '#4a3a2a', shoes: '#7a3a2a', ...o, over: pectoral + zucchetto + over });
const NOB = [['#2f4a7a', '#e8e4dc'], ['#6a2a3a', '#d8d2c8'], ['#3a5a4a', '#e2ded6']];
/** A Roman nobleman of 1750: coat, breeches, lace shirt, powdered hair and a tricorn. */
export const noble1750 = (x, y, s, i = 0, { over = '', ...o } = {}) => hd(x, y, s, { top: NOB[i % 3][0], trousers: dark(NOB[i % 3][0], 0.3), lapels: '#f6f2ea', belt: false, mantle: null,
  shoes: '#2a2020', skin: ['#e8bc9a', '#e2b48f', '#d9a47e'][i % 3], hair: NOB[i % 3][1], hairStyle: 'curly', beard: null, age: 'mid', iris: '#3a2a20', ...o, over: tricorn() + over });
/** A papal guard of 1750: red coat, buff breeches, a buckle belt and a tricorn. */
export const guard1750 = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#a8282e', trousers: '#e8dcc0', lapels: '#f6f2ea', buckle: GOLD, belt: '#2a2020', mantle: null,
  shoes: '#2a2020', skin: '#d9a47e', hair: '#3a2a1e', hairStyle: 'short', beard: null, age: 'mid', iris: '#3a2a20', mood: 'stern', ...o, over: tricorn('#1e1c24') + over });
const ROM = [['#7a5a3a', null, '#c48a5f', '#2a1c12'], ['#3e5a6a', '#d8ccb4', '#e2b48f', '#4a3424'], ['#8a6a3a', null, '#b97c52', '#1e1612'], ['#5a3a5a', '#e8dcc8', '#d9a47e', '#3a2a20']];
/** A Roman of 1750 in the crowd: plain clothes; the women (odd i) wear a shawl over the head. */
export const roman1750 = (x, y, s, i = 0, o = {}) => { const [top, veil, skin, hair] = ROM[i % 4];
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.12), mantle: null, belt: '#4a3424', skin, hair, hairStyle: i % 4 === 2 ? 'curly' : 'short', beard: i % 4 === 2 ? hair : null,
    beardStyle: i % 4 === 2 ? 'short' : null, age: i % 3 ? 'mid' : 'young', iris: '#3a2a20', shoes: '#4a3424', ...(veil ? { veil, veilHair: 'covered' } : {}), ...o }); };

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  lHook:  { key: '#ffd8a0', from: 'r', tint: '#ffe0b8', amt: 0.1, rim: '#ffe4c0', rimOp: 0.85 },
  lAncient: { key: '#fff4d8', from: 'r', tint: '#fff4e4', amt: 0.06, rim: '#fff8e8', rimOp: 0.7 },
  lPope:  { key: '#ffc090', from: 'r', tint: '#ffcaa8', amt: 0.14, rim: '#ffd0a0', rimOp: 0.85 },
  lArena: { key: '#ffc090', from: 'l', tint: '#f0c0a8', amt: 0.14, rim: '#ffd8b0', rimOp: 0.85 },
  lNight: { key: '#ffe8c8', from: 'top', tint: '#9aa0d0', amt: 0.24, rim: '#ffe8c0', rimOp: 0.9 },
  lToday: { key: '#ffc890', from: 'l', tint: '#8a8ac0', amt: 0.22, rim: '#ffd8a0', rimOp: 0.9 },
  lGlory: { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `lelit${++LID}`, d = 5;
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
// ONE SENTENCE = ONE SHOT (fixed camera, a hard cut on each sentence; characters act out each line).
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.97 ~1312, 0.95 ~1322, 0.92 ~1310,
// 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1240-1250.
const L0 = [380, 1345, 2.45];
// 0 · SHOT "A barefoot friar set up fourteen shrines in the arena…": inside the ruined Colosseum; Leonard strides in a step,
//     plants his mission cross with a thump, and the fourteen shrines pop up one by one around the arena.
//     SHOT "This is Saint Leonard…": cut to him; he turns to the viewer.
function scene0() {
  const fu = at(0, 'set up'), ft = at(0, 'fourteen'), ch = at(0, 'Christians'), ti = at(0, 'This is'), sl = at(0, 'Saint Leonard');
  return MID(lit(ruinedArena() + stationsPop(ft, 0.14), 'lHook'))
    + `<g opacity="0"${fadeIn(ch, 0.8)}>${glow(540, 980, 480, 0.4)}${sparkles(14, 120, 960, 760, 1180, { seed: 4 })}</g>`
    + speedLines(L0[0] + 150, 860, { at: fu, dur: 0.7, r0: 300, op: 0.4, color: '#fff4d8', seed: 2 })
    + lit(castShadow(...L0, 'lHook') + walk(0.25, 0.7, -110, `<g${squash(fu, L0[0], L0[1], 0.07)}>` + seq((op) => leonard(...L0, { halo: true, armL: [14, 2, 3], propR: staff(300), ...op }),
      [[0, { mood: 'determined', look: [1.6, 0], armR: [30, 2, 3] }], [fu - 0.15, { mood: 'determined', look: [2.4, -0.4], armR: [64, 2, 3] }],
        [ch, { mood: 'peaceful', armR: [40, 2, 3] }], [ti - 0.1, { mood: 'happy', look: [0, 0], armR: [40, 2, 3] }], [sl + 0.6, { mood: 'tender', armR: [40, 2, 3] }]]) + '</g>'), 'lHook')
    + NEAR(bokeh(6, { seed: 14, op: [0.2, 0.45] }));
}

// 1 · SHOT "Rome's Colosseum was a neglected ruin…": Leonard walks in from the left and stops before the ruin, sad, then resolved.
//     SHOT "Almost every Catholic church has fourteen Stations of the Cross.": cut to a church nave, the plaques I-XIV lighting up.
//     SHOT "This friar set them up in over five hundred towns.": cut to a map of Italy; pins pop up all over it.
/** A gladiator: a bronze helmet with a crest, a short tunic, a round shield and a short sword (bloodless, as in a children's book). */
const gHelm = '<g><path d="M-44 -258 Q-46 -318 0 -322 Q46 -318 44 -258 L36 -232 L22 -240 L22 -262 L-22 -262 L-22 -240 L-36 -232Z" fill="#b8963e"/>'
  + '<path d="M-22 -262 L22 -262 L22 -240 L-22 -240Z" fill="none" stroke="#8a6a2a" stroke-width="3"/><path d="M8 -318 Q40 -306 44 -258 L30 -262Z" fill="#8a6a2a" opacity=".6"/>'
  + '<path d="M-26 -320 Q0 -366 26 -320 Q0 -334 -26 -320Z" fill="#c8323a"/></g>';
export const gladiator = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#c89a5a', plain: true, trim: '#8a6a3a', mantle: null, belt: '#5a3a22', skin: '#c48a5f', hair: '#2a1c12',
  hairStyle: 'short', beard: '#2a1c12', beardStyle: 'short', age: 'mid', iris: '#2e2018', shoes: '#5a3a22', mood: 'stern', ...o, over: gHelm + over });
/** An early Christian in the arena: a plain tunic and mantle; the women veiled. */
const EC = [['#e8dcc4', '#8a6a4a', null], ['#d8ccb4', '#6a5a7a', '#efe6d4'], ['#e2d6be', '#5a6a5a', null]];
const earlyChristian = (x, y, s, i = 0, o = {}) => { const [top, mantle, veil] = EC[i % 3];
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.1), mantle, lining: light(mantle, 0.3), belt: false, skin: ['#d9a47e', '#c48a5f', '#e2b48f'][i % 3], hair: '#3a2a1e',
    hairStyle: 'short', beard: i % 3 === 0 ? '#3a2a1e' : null, beardStyle: i % 3 === 0 ? 'short' : null, age: i % 3 === 2 ? 'young' : 'mid', iris: '#3a2a20', shoes: '#5a3a22',
    ...(veil ? { veil, veilHair: 'covered' } : {}), ...o }); };
// 1 · SHOT "For centuries, fifty thousand Romans packed this arena to watch men fight and die.": the stands full of cheering Romans;
//     two gladiators clash on the sand.  SHOT "Tradition says Christians were martyred here too.": cut: the gladiators are gone; three
//     Christians kneel in prayer in a beam of light.  SHOT "Later it became a quarry, a ruin full of weeds.": cut: the stands are an
//     empty, broken ruin; a stone-cutter carries a block of stone away.
const GA = [370, 1345, 2.2], GB = [700, 1322, 2.15];
function scene1() {
  const tr = at(1, 'Tradition'), qu = at(1, 'Later'), fi = at(1, 'fight');
  const until = (t, svg) => `<g${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 1 }, to: { opacity: 0 } }])}>${svg}</g>`;
  const from = (t, svg) => `<g opacity="0"${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }])}>${svg}</g>`;
  const fighters = lit(castShadow(...GA, 'lAncient') + `<g${M.sway(3, 0.9, 0, GA[0], GA[1])}>${gladiator(...GA, { look: [2.4, 0], armL: [40, 3, 1.4], propL: `<g transform="scale(1.1)">${roundShield('#c8323a', '#e8c24a')}</g>`, armR: [100, 30, 0.9], propR: gladius })}</g>`
    + castShadow(...GB, 'lAncient') + `<g${M.sway(3, 0.9, 0.45, GB[0], GB[1])}>${gladiator(...GB, { flip: true, skin: '#e2b48f', hair: '#6a4424', beard: '#6a4424', look: [2.4, 0], top: '#9a7a4a', armL: [40, 3, 1.4], propL: `<g transform="scale(1.1)">${roundShield('#2f4a7a', '#e8c24a')}</g>`, armR: [100, 30, 0.9], propR: gladius })}</g>`, 'lAncient');
  const martyrs = [[330, 1345, 2.1, 0], [540, 1345, 2.1, 1], [750, 1322, 2.0, 2]].map(([x, y, sc, i]) => lit(castShadow(x, y, sc, 'lAncient')
    + earlyChristian(x, y, sc, i, { kneel: true, mood: 'peaceful', ...PRAY, flip: i === 2 }), 'lAncient')).join('');
  const block = '<g transform="translate(0,-10)"><rect x="-34" y="-26" width="68" height="46" rx="5" fill="#d8c8a8"/><rect x="10" y="-26" width="24" height="46" fill="#b8a684"/></g>';
  return MID(until(qu, lit(arenaStands(1250, { top: 560, stone: '#d8ac7a', tiers: 4, seed: 5 }), 'lAncient')) + from(qu, lit(ruinedArena(), 'lAncient')))
    + until(tr, fighters + speedLines(540, 900, { at: fi - 0.05, dur: 0.6, r0: 280, op: 0.35, color: '#ffffff', seed: 9 }))
    + `<g opacity="0"${M.tw([{ at: tr - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }, { at: qu - 0.02, dur: 0.04, to: { opacity: 0 } }])}>`
      + beam(380, 700, 220, 860, 1380, 0.7) + glow(540, 1000, 420, 0.4) + martyrs + sparkles(14, 260, 820, 760, 1200, { seed: 6 }) + '</g>'
    + from(qu, walkOut(qu + 0.3, 2.4, 760, lit(castShadow(560, 1345, 2.15, 'lAncient') + stonemason(560, 1345, 2.15, { mood: 'happy', look: [2.4, 0], armR: [20, 2, 3], armL: [70, 2, 3], propL: block }), 'lAncient'), { hop: 7, step: 0.28 }))
    + NEAR(foliage('l', 1650, { color: '#3e4a2a', seed: 4 }));
}

// 2 · SHOT "Then Leonard asked Pope Benedict XIV to make the arena holy again.": Leonard walks in and kneels before the Pope.
//     SHOT "The Pope said yes at once.": cut on the Pope; he smiles and lifts his hand in blessing.
const PB = [740, 1312, 2.15], L2 = [430, 1345, 2.3];
function scene2() {
  const as = at(2, 'asked'), ye = at(2, 'The Pope said');
  return layer(0.97, lit(castShadow(...PB, 'lPope') + seq((op) => popeBenedict(...PB, { flip: true, look: [2.4, 0.8], armL: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', armR: [20, 2, 3] }], [ye, { mood: 'joy', armR: [110, 4, 2] }]]), 'lPope')
      + `<g opacity="0"${fadeIn(ye, 0.5)}>${glow(PB[0] - 60, 900, 220, 0.5)}${sparkles(10, 560, 860, 760, 1000, { seed: 7 })}</g>`)
    + lit(castShadow(...L2, 'lPope') + walk(0.1, 1.3, -380, `<g${squash(as + 0.2, L2[0], L2[1], 0.08)}>` + seq((op) => leonard(...L2, { propL: staff(300), armL: [26, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [2.4, 0], armR: [14, 2, 3] }], [as + 0.15, { mood: 'happy', kneel: true, look: [2.6, -1], ...PRAY, armL: [26, 2, 3] }],
        [ye + 0.3, { mood: 'joy', kneel: true, look: [2.6, -1], ...PRAY, armL: [26, 2, 3] }]], 0.15) + '</g>'), 'lPope');
}

// 3 · SHOT "The Pope banned the arena's misuse, and fourteen shrines rose around its floor.": inside the arena; a papal guard holds
//     up the edict, a stone-cutter with his pickaxe slinks off to the right, the shrines rise one by one.  SHOT "That December, the
//     old friar preached there himself.": Leonard preaches, his cross raised; Romans walk in and kneel.  SHOT the climax line: cut
//     wide: a procession with candles moves from shrine to shrine, light pours down, a burst of light at his cross.
const G3 = [800, 1322, 2.0], MS3 = [560, 1345, 2.15], L3 = [380, 1345, 2.35];
function scene3() {
  const bn = at(3, 'stopped'), sh = at(3, 'fourteen'), de = at(3, 'That December'), pr = at(3, 'preached'), ar = at(3, 'The arena'), wc = at(3, 'Way of the Cross');
  const crowd = [[640, 1262, 1.35, 0], [740, 1262, 1.35, 1], [860, 1262, 1.35, 2], [960, 1262, 1.35, 3]].map(([x, y, s, i], k) =>
    layer(0.78, walk(pr + k * 0.2, 1.0, 300, lit(castShadow(x, y, s, 'lArena') + seq((op) => roman1750(x, y, s, i, { flip: true, look: [2.2, -0.6], ...op }),
      [[0, { mood: 'happy', armL: 14, armR: 14 }], [pr + k * 0.2 + 1.0, { mood: 'peaceful', kneel: true, ...PRAY }]], 0.15), 'lArena')))).join('');
  const procession = [0, 1, 2, 3, 4, 5].map((k) => { const x = 1180 + k * 120, y = 1248, s = 0.9;
    return `<g opacity="0"${fadeIn(ar - 0.1, 0.3)}><g${M.tw([{ at: ar - 0.1, dur: 6, from: { x: 0 }, to: { x: -900 }, ease: 'none' }])}>`
      + lit(roman1750(x, y, s, k, { flip: true, mood: 'peaceful', armR: [40, 2, 3], propR: candle, armL: -20 }), 'lArena') + '</g></g>'; }).join('');
  return MID(lit(ruinedArena() + stationsPop(sh, 0.12), 'lArena') + procession)
    + layer(0.95, `<g${fadeOut(de - 0.05, 0.05)}>` + lit(castShadow(...G3, 'lArena') + seq((op) => guard1750(...G3, { flip: true, armL: [16, 2, 3], look: [2.4, 0], ...op }),
      [[0, { armR: [30, 2, 3] }], [bn - 0.2, { armR: [128, 3, 2], propR: scroll(1.1) }]]), 'lArena') + '</g>')
    + `<g${fadeOut(de - 0.05, 0.05)}>` + walkOut(bn + 0.3, 1.8, 700, lit(castShadow(...MS3, 'lArena') + seq((op) => stonemason(...MS3, op),
      [[0, { mood: 'happy', armR: [30, 2, 3], armL: [20, 2, 3] }], [bn + 0.2, { mood: 'worried', flip: true, armR: [20, 2, 3], armL: [20, 2, 3] }]]), 'lArena')) + '</g>'
    + `<g opacity="0"${M.tw([{ at: de - 0.05, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }])}>${crowd}</g>`
    + `<g opacity="0"${M.tw([{ at: ar - 0.2, dur: 0.6, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(L3[0] - 100, L3[0] + 100, L3[0] - 260, L3[0] + 260, 1360, 0.7)}</g>`
    + lit(castShadow(...L3, 'lArena') + `<g opacity="0"${M.tw([{ at: de - 0.05, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }])}>` + seq((op) => leonard(...L3, { propR: staff(320), armL: [30, 3, 2.4], ...op }),
      [[0, { mood: 'determined', look: [2.4, 0], armR: [60, 3, 2.4] }], [pr, { mood: 'happy', look: [2.4, -0.2], armR: [128, 4, 2], armL: [70, 5, 1.6] }],
        [ar, { mood: 'awe', look: [1, -2], armR: [140, 3, 2], armL: [60, 3, 2.4] }], [wc + 0.4, { mood: 'tender', halo: wc + 0.4, look: [1, -2], armR: [140, 3, 2], armL: [60, 3, 2.4] }]]) + '</g>', 'lArena')
    + burst(L3[0] + 150, 560, 420, wc) + `<g opacity="0"${fadeIn(wc, 0.6)}>${glow(L3[0] + 60, 760, 380, 0.6)}${sparkles(18, 200, 900, 560, 1200, { seed: 30 })}</g>`
    + NEAR(bokeh(6, { seed: 21, op: [0.2, 0.4] }));
}

// 4 · SHOT "Within a year, he came home to Rome worn out and died that same night.": night on the Palatine; Leonard trudges in from
//     the left to the friary door, kneels, and a light from above takes him (no death throes; a peaceful face, the halo).
const L4 = [430, 1345, 2.3];
function scene4() {
  const wo = at(4, 'worn out'), di = at(4, 'died');
  return MID(lit(friary(640, 1244, 0.95, { wall: '#b8a07c', roof: '#5a4434', win: '#ffd890' }), 'lNight'))
    + `<g opacity="0"${M.tw([{ at: di - 0.3, dur: 0.8, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(L4[0] - 90, L4[0] + 90, L4[0] - 200, L4[0] + 200, 1360, 0.75)}${glow(L4[0], 900, 320, 0.5)}</g>`
    + lit(castShadow(...L4, 'lNight') + walk(0.1, 2.0, -420, `<g${squash(di - 0.1, L4[0], L4[1], 0.07)}>` + seq((op) => leonard(...L4, { propL: staff(290), armL: [20, 2, 3], ...op }),
      [[0, { mood: 'peaceful', look: [2, 1.2], armR: [10, 2, 3] }], [wo, { mood: 'sad', look: [1, 1.6], armR: [10, 2, 3] }],
        [di - 0.2, { mood: 'peaceful', kneel: true, ...PRAY, armL: [20, 2, 3] }], [di + 0.6, { mood: 'peaceful', kneel: true, halo: di + 0.6, ...PRAY, armL: [20, 2, 3] }]], 0.15) + '</g>', { hop: 6, step: 0.32 }), 'lNight')
    + `<g opacity="0"${fadeIn(di + 0.4, 0.8)}>${sparkles(16, 260, 640, 640, 1160, { seed: 40 })}</g>`;
}

// 5 · SHOT "Today the Pope still prays the Way of the Cross there on Good Friday.": night at the Colosseum; the Pope walks left to
//     right carrying a wooden cross, people with candles follow.  SHOT the quotable line: cut up; Leonard comes down from the sky in
//     glory over the lit arena.
const PT5 = [500, 1345, 2.2], LG = [800, 900, 1.3];
const woodCross = '<g transform="translate(20,-150) rotate(-14)"><rect x="-9" y="-230" width="18" height="420" rx="3" fill="#7a5432"/><rect x="-80" y="-170" width="160" height="16" rx="3" fill="#8a6038"/><rect x="2" y="-230" width="7" height="420" fill="#5a3a22" opacity=".6"/></g>';
function scene5() {
  const to = at(5, 'That is why'), ab = at(5, 'Where crowds'), cr = at(5, 'now prays');
  const follower = (x, i, d) => layer(d, walk(to + 0.2, 3.2, -520, lit(castShadow(x, 1300, 1.7, 'lToday') + roman1750(x, 1300, 1.7, i, { mood: 'peaceful', armR: [40, 2, 3], propR: candle, armL: -20 }), 'lToday'), { hop: 5, step: 0.34 }));
  return follower(250, 1, 0.9) + follower(130, 3, 0.9)
    + lit(castShadow(...PT5, 'lToday') + walk(0.1, 3.4, -560, popeToday(...PT5, { mood: 'peaceful', armR: [40, 2, 3], armL: [30, 2, 3], under: woodCross }), { hop: 5, step: 0.36 }), 'lToday')
    + layer(0.9, `<g opacity="0"${M.tw([{ at: ab - 0.2, dur: 1.4, from: { opacity: 0, y: -520 }, to: { opacity: 1, y: 0 }, ease: 'power2.out' }])}>`
      + glow(LG[0], 740, 300, 0.85) + `<g transform="translate(${LG[0]},${LG[1] + 10})"><ellipse rx="150" ry="34" fill="#fff8ec" opacity=".9"/><ellipse cx="-64" cy="-12" rx="62" ry="30" fill="#fffdf6"/><ellipse cx="58" cy="-14" rx="68" ry="32" fill="#fffdf6"/></g>`
      + `<g${M.bob(6, 3.4)}>${lit(seq((op) => leonard(...LG, { halo: true, propR: staff(280), armL: [24, 2, 3], ...op }), [[0, { mood: 'tender', look: [-1, 0.6], armR: [40, 2, 3] }], [cr, { mood: 'happy', armR: [110, 3, 2] }]]), 'lToday')}</g>`
      + `<g opacity="0"${fadeIn(cr, 0.8)}>${sparkles(14, 640, 920, 480, 880, { seed: 23 })}</g></g>`)
    + NEAR(bokeh(6, { seed: 33, op: [0.2, 0.45] }));
}

// 6 · SHOT "His feast day is November 26…": the portrait at sunset with the Colosseum; he lifts his cross.  SHOT "Saint Leonard…,
//     pray for us.": cut closer; tender.
function scene6() {
  const nv = at(6, 'November'), pt = at(6, 'patron'), pr = at(6, 'Saint Leonard');
  return lit(castShadow(520, 1345, 2.35, 'lGlory') + seq((op) => leonard(520, 1345, 2.35, { halo: true, propR: staff(320), ...op }),
      [[0, { mood: 'happy', look: [0, 0], armR: [30, 2, 3], armL: [30, 2, 3], propL: book(false) }], [nv, { mood: 'happy', look: [-1.2, 0.4], armR: [70, 3, 2.4], armL: [30, 2, 3], propL: book(false) }],
        [pt, { mood: 'happy', look: [0, 0], armR: [70, 3, 2.4], armL: [44, 2, 3], propL: book(true) }], [pr, { mood: 'tender', armR: [44, 2, 3], armL: [44, 2, 3], propL: book(true) }]]), 'lGlory')
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(520, 740, 240, 0.45)}${sparkles(8, 400, 660, 660, 820, { seed: 35 })}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 520, 900, { seed: 29 })}</g>`
    + NEAR(bokeh(7, { seed: 47 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'St_Leonard_of_Port_Maurice_Colosseum',
  bg3d: './leonard_of_port_maurice_colosseum.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'roma.bg3d.js': './gelasius.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },   // no hand-held sway (Ricks Clips motion standard)
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  music: { story: 'the Colosseum, an arena built for blood, turned into a Way of the Cross by a barefoot friar, St. Leonard of Port Maurice',
    color: 'Italian Baroque Rome: solemn pipe organ, warm string ensemble, a Gregorian-style wordless chant and soft timpani',
    cues: { 1: 'Ancient Rome: war drums and low brass for the games, then a sudden hush of wordless choir for the martyrs, then a thin, lonely string line over the ruin.', 4: 'Hushed night: a lone cello and soft organ, very still, then a gentle high string light as he dies in peace.' } },
  thumb_hook: 'He made the Colosseum holy', thumb_title: 'St. Leonard of Port Maurice', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'twˈɛnti sˈɪks': 'twˈɛnti sˈɪksθ',      // November 26 -> November twenty-sixth
  },
  scenes: [
    // Ricks Clips motion: a fixed camera on every shot (STILL), a hard cut (zoom style 'cut') on each new sentence, shakes only on impacts.
    { kicker: 'THE COLOSSEUM, ROME · 1750', title: 'Crosses in the Colosseum', art: scene0, bg3d: 'lHook', front3d: true,
      cam: { ...STILL, shake: { at: at(0, 'set up', 0.05), amt: 12, dur: 0.5 }, zoom: { at: at(0, 'This is'), to: face(...L0), style: 'cut', z: 1.35, hold: 'end' } },
      tone: HOOK,
      say: ['A barefoot friar set up fourteen crosses in the Colosseum.', 'This is Saint Leonard of Port Maurice.'] },
    { kicker: 'THE COLOSSEUM · ANCIENT ROME', title: 'Built for Blood', art: scene1, bg3d: 'lAncient', front3d: true,
      cam: { ...STILL, zoom: [
        { at: at(1, 'Tradition'), to: [540, 1000], style: 'cut', z: 1.25, center: 0.3, hold: Math.max(0.5, at(1, 'Later') - at(1, 'Tradition') - 0.05) }] },
      tone: HOOK,
      say: ['For centuries, fifty thousand Romans packed this arena to watch men fight and die.', 'Tradition says Christians were martyred here too.', 'Later it became a quarry, a ruin full of weeds.'] },
    { kicker: "SAINT PETER'S · ROME · 1750", title: 'Make It Holy Again', art: scene2, bg3d: 'lPope', front3d: true,
      cam: { ...STILL, whip: 'r', zoom: { at: at(2, 'The Pope said'), to: face(...PB), depth: 0.97, style: 'cut', z: 1.45, hold: 'end' } },
      tone: STAND,
      say: ['Then Leonard asked Pope Benedict XIV to make the arena holy again.', 'The Pope said yes at once.'] },
    { kicker: 'THE COLOSSEUM · DECEMBER 1750', title: 'The Way of the Cross', art: scene3, bg3d: 'lArena', front3d: true,
      cam: { ...STILL, zoom: [
        { at: at(3, 'That December'), to: [520, 980], style: 'cut', z: 1.2, center: 0.3, hold: Math.max(0.5, at(3, 'The arena') - at(3, 'That December') - 0.05) }] },
      tone: STAND,
      say: ["The Pope stopped the stealing of its stones, and fourteen shrines rose around the floor.", 'That December, the old friar preached there himself.',
        { text: 'The arena built for blood became a Way of the Cross.', speed: 0.85 }] },
    { kicker: 'THE PALATINE · NOVEMBER 1751', title: 'Home to Die', art: scene4, bg3d: 'lNight', front3d: true,
      cam: { ...STILL },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['Within a year, he came home to Rome worn out and died that same night.'] },
    { kicker: 'GOOD FRIDAY · TODAY', title: 'Now the World Prays', art: scene5, bg3d: 'lToday', front3d: true,
      cam: { ...STILL, zoom: { at: at(5, 'Where crowds'), to: [LG[0], Math.round(LG[1] - 252 * LG[2]) + 80], depth: 0.9, style: 'cut', z: 1.4, hold: 'end' } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['That is why the Pope still prays the Way of the Cross there every Good Friday.', 'Where crowds once cheered for death, the world now prays.'] },
    { kicker: 'FEAST DAY · NOVEMBER 26', title: 'Saint Leonard', art: scene6, bg3d: 'lGlory', front3d: true,
      cam: { ...STILL, zoom: { at: at(6, 'Saint Leonard'), to: [520, Math.round(1345 - 252 * 2.35)], style: 'cut', z: 1.3, center: 0.4, hold: 'end' } },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 26, and he is the patron of preachers.', 'Saint Leonard of Port Maurice, pray for us.'] },
  ],
};
