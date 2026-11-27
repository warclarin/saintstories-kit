// St. Stephen the Younger: the coin (one story; Constantinople, iconoclasm under Emperor Constantine V). Feast: November 28.
// All-3D backgrounds (stephen_the_younger_coin.bg3d.js: the palace hall from cathedral(), Constantinople from roma() with a new
// hagia3d(), the island cliffs of taurica()); cam3d; characters hd(); Ricks Clips motion (cam.path, instant pose swaps).
// Drawn as the story tells it (user's rule 2026-11-27), bloodless: icons thrown on a fire; the coin thrown down and trodden;
// the whip and the club raised (no blow lands; a flash at the moment); dragged through the street by a rope; then light.
// Sources: Wikipedia "Stephen the Younger" (born Constantinople c. 715; at Mount Auxentius from about age 16; a leading opponent
// of Constantine V's iconoclast policies and of the Council of Hieria, 754; banished to the island of Prokonnesos; questioned by
// the emperor himself; after almost a year in prison condemned and "dragged by soldiers through the streets, where he was
// clubbed to death", 28 November 764 or 765; iconography: monk's habit, holding an icon of Christ and the Virgin);
// OrthodoxWiki "Stephen the New" (lured "with flattery and bribery, then by threats, but in vain"; exiled to an island in the
// Sea of Marmara; before his judges he threw the gold coin with the emperor's image down and trampled it; prison where "342
// Elders" were already held, eleven months; dragged through the streets and clubbed to death; feast 28 November);
// Saints Alive (siministries.org) "St. Stephen the Younger" (before the emperor he drew out a coin with Constantine's image and
// asked how one who trampled it should be treated; the emperor called it criminal; Stephen: "would not the treading under foot
// of the image of Christ be criminal, too?"; he was then scourged; Constantine: "Won't anybody rid me of this monk?").
// Exported for later reels: stephenHD, emperorC5, stemma, loros, solidus, iconPanel, diptych, goldBag, spear, whip, club,
// byzMonk, prisonWall, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, beam, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import { speedLines, sweat, rage, steam, crack, squash } from '../cartoonfx.mjs';
import { legionary } from './rufus_simon_of_cyrene.mjs';
import { governor } from './andrew_apostle.mjs';
import { campfire } from './peter.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';

const SLUG = 'st_stephen_the_younger_coin';
const at = wordTimes(SLUG);
let SNAP = 0;
const seq = (draw, steps) => {   // instant pose swaps: each look shows exactly from its time until the next one
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
const popAt = (t, x, y, svg, dur = 0.45) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.5 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2.2)', origin: '0 0' }])}>${svg}</g></g>`;
const flash = (t) => `<g opacity="0"${fadeIn(t, 0.1)}><g${fadeOut(t + 0.2, 0.7)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".85"/></g></g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props
/** A gold solidus with the emperor's crowned bust (centre at 0,0, radius 40 at s = 1). */
export const solidus = (s = 1) => `<g transform="scale(${s})"><circle r="58" fill="url(#haloGlow)" opacity=".8"/><circle r="40" fill="#c8963e"/><circle r="36" fill="#f2c46b"/>`
  + '<circle r="31" fill="none" stroke="#c8963e" stroke-width="2" stroke-dasharray="2 4"/>'
  + '<path d="M-16 26 Q-18 8 0 6 Q18 8 16 26Z" fill="#d8a848"/><circle cy="-6" r="11" fill="#d8a848"/><path d="M-11 -14 L-11 -20 L11 -20 L11 -14Z M0 -20 V-28 M-4 -25 H4" stroke="#b8862e" stroke-width="2.5" fill="#c8963e"/>'
  + '<ellipse cx="-14" cy="-16" rx="8" ry="5" fill="#fff4cc" opacity=".7" transform="rotate(-30 -14 -16)"/></g>';
/** A holy icon: a gold panel with Christ ('christ') or the Virgin ('mary'), in a dark wooden frame (centre at 0,0, 120 x 160). */
export const iconPanel = (kind = 'christ', s = 1) => {
  const halo = kind === 'christ'
    ? '<circle cy="-18" r="34" fill="#e8b84a"/><path d="M0 -52 V-36 M-34 -18 H-22 M22 -18 H34" stroke="#b8323a" stroke-width="6"/>'
    : '<circle cy="-18" r="34" fill="#e8b84a"/>';
  const fig = kind === 'christ'
    ? '<path d="M-44 80 Q-42 26 0 22 Q42 26 44 80Z" fill="#a8323a"/><path d="M-44 80 Q-30 34 -6 30 L-14 80Z" fill="#2f4a8a"/>'
      + '<path d="M-22 -36 Q-26 -2 -18 14 L18 14 Q26 -2 22 -36 Q0 -48 -22 -36Z" fill="#5a3a22"/><circle cy="-18" r="17" fill="#e8bc96"/><path d="M-13 -6 Q0 20 13 -6 Q0 2 -13 -6Z" fill="#5a3a22"/>'
      + '<path d="M-7 -20 h4 M3 -20 h4" stroke="#2b1d14" stroke-width="2.4" stroke-linecap="round"/>'
    : '<path d="M-46 80 Q-46 -10 0 -44 Q46 -10 46 80Z" fill="#7a2a34"/><path d="M-26 6 Q-30 -40 0 -44 Q30 -40 26 6 Q0 -4 -26 6Z" fill="#2f4a8a"/>'
      + '<circle cy="-16" r="16" fill="#e8bc96"/><path d="M-7 -18 h4 M3 -18 h4" stroke="#2b1d14" stroke-width="2.4" stroke-linecap="round"/>'
      + '<path d="M-30 -30 l3 3 l3 -3 l-3 -3Z M27 -30 l3 3 l3 -3 l-3 -3Z M-2 -52 l3 3 l3 -3 l-3 -3Z" fill="#f2c46b"/>';
  return `<g transform="scale(${s})"><rect x="-66" y="-86" width="132" height="172" rx="8" fill="#5a3a22"/><rect x="-60" y="-80" width="120" height="160" rx="5" fill="#e8c062"/>`
    + `<g clip-path="none">${halo}${fig}</g><rect x="-60" y="-80" width="120" height="160" rx="5" fill="none" stroke="#b8862e" stroke-width="3"/></g>`;
};
/** St. Stephen's icon: the diptych of Christ and the Virgin, hinged in the middle (centre at 0,0). */
export const diptych = (s = 1) => `<g transform="scale(${s})"><g transform="translate(-68,0) rotate(-4)">${iconPanel('mary', 0.95)}</g><g transform="translate(68,0) rotate(4)">${iconPanel('christ', 0.95)}</g>`
  + '<rect x="-4" y="-70" width="8" height="140" rx="3" fill="#3a2414"/></g>';
/** A bribe: a leather bag of gold, a few coins spilling (hand at 0,0). */
export const goldBag = '<g transform="translate(0,14)"><path d="M-24 0 Q-30 36 0 40 Q30 36 24 0 Q12 -10 0 -6 Q-12 -10 -24 0Z" fill="#8a5a2e"/><path d="M-10 -8 Q0 -16 10 -8" stroke="#5a3a1e" stroke-width="4" fill="none"/>'
  + '<circle cx="-14" cy="44" r="7" fill="#f2c46b"/><circle cx="2" cy="48" r="7" fill="#e8b84a"/><circle cx="16" cy="44" r="6" fill="#f2c46b"/></g>';
export const spear = '<g transform="rotate(-8)"><rect x="-3.5" y="-300" width="7" height="360" rx="3" fill="#7a5a3a"/><path d="M-11 -300 L0 -344 L11 -300Z" fill="#cfd6de"/><path d="M0 -344 L11 -300 L0 -304Z" fill="#9aa4b0"/></g>';
export const whip = '<g><rect x="-5" y="-6" width="10" height="44" rx="4" fill="#5a3a22"/><path d="M0 -6 Q-40 -80 20 -130 Q70 -170 40 -230" stroke="#6a4a2a" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
export const club = '<g transform="rotate(-6)"><path d="M-6 30 L-10 -120 Q0 -150 10 -120 L6 30Z" fill="#7a5232"/><path d="M2 30 L6 -120 Q8 -136 10 -120 L6 30Z" fill="#5a3a22" opacity=".6"/></g>';
const coinHand = `<g transform="translate(0,-34)">${solidus(1.05)}</g>`;
const iconHand = (kind) => `<g transform="translate(0,-34) rotate(-8)">${iconPanel(kind, 0.62)}</g>`;
/** The prison: a stone wall with a barred window (a MID card; floor line at base). */
export const prisonWall = (base = 1250) => {
  let st = `<rect x="-300" y="${base - 760}" width="1680" height="760" fill="#4a4250"/>`;
  for (let r = 0, y = base - 760; y < base; r++, y += 58) for (let c = -3; c < 12; c++) st += `<rect x="${c * 130 + (r % 2 ? 64 : 0)}" y="${y + 3}" width="124" height="52" rx="8" fill="${(r + c) % 3 ? '#544a5a' : '#5e5464'}"/>`;
  return st + `<rect x="430" y="${base - 640}" width="200" height="150" rx="10" fill="#1a1e3a"/><path d="M470 ${base - 640} V${base - 490} M520 ${base - 640} V${base - 490} M570 ${base - 640} V${base - 490}" stroke="#22202a" stroke-width="12"/>`
    + `<rect x="-300" y="${base - 30}" width="1680" height="30" fill="#3a3440"/>`;
};
const tally = (t) => `<g><rect x="-90" y="-50" width="180" height="84" rx="18" fill="rgba(20,14,30,.62)"/><text x="0" y="16" text-anchor="middle" font-family="Lora,'DejaVu Serif',serif" font-weight="700" font-size="60" fill="${GOLD}">${t}</text></g>`;

// ================================================================ characters
/** St. Stephen the Younger: a Byzantine monk: black habit and mantle, the soft black hood, a long greying beard, a small cross. */
export const stephenHD = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#2a2630', plain: true, trim: '#3a3440', mantle: '#1e1a22', lining: '#4a4450', belt: '#4a3a2a',
  skin: '#d9a47e', veil: '#24202a', veilHair: 'covered', hair: '#4a3e36', beard: '#6a5e54', beardStyle: 'long', age: 'mid', iris: '#3a2a20', shoes: '#2a2024', ...o,
  over: (o.kneel ? '' : '<path d="M0 -176 V-150 M-9 -166 H9" stroke="#e8dcc4" stroke-width="4" stroke-linecap="round"/>') + over });
/** The stemma: a Byzantine crown with a cross and strings of pearls (pendilia) at the sides (hd body space). */
export const stemma = `<g><path d="M-38 -276 L-36 -304 L36 -304 L38 -276 Q0 -268 -38 -276Z" fill="${GOLD}"/><path d="M-36 -296 H36" stroke="#c8963e" stroke-width="3"/>`
  + '<circle cx="-18" cy="-289" r="4" fill="#b8323a"/><circle cx="0" cy="-289" r="4.5" fill="#3a6ab8"/><circle cx="18" cy="-289" r="4" fill="#b8323a"/>'
  + `<path d="M0 -304 V-326 M-8 -318 H8" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`
  + [-1, 1].map((sx) => `<path d="M${sx * 38} -280 V-232" stroke="#f6f0e2" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/><circle cx="${sx * 38}" cy="-230" r="4" fill="#f6f0e2"/>`).join('') + '</g>';
/** The loros: the jewelled gold band of the Byzantine emperor, over the chest (hd body space). */
export const loros = `<g><path d="M-36 -206 L-14 -206 L38 -40 L18 -36Z" fill="${GOLD}"/><path d="M-30 -206 L26 -38" stroke="#c8963e" stroke-width="2"/>`
  + [0, 1, 2, 3, 4, 5].map((k) => `<circle cx="${f(-22 + k * 10)}" cy="${f(-188 + k * 30)}" r="4" fill="${k % 2 ? '#3a6ab8' : '#b8323a'}"/>`).join('') + '</g>';
/** Emperor Constantine V: purple chlamys with gold, a gold tunic, the loros and the stemma, a short dark beard. */
export const emperorC5 = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#e8d4a0', mantle: '#5a1e5e', lining: GOLD, trim: GOLD, belt: false, skin: '#e2b48f',
  hair: '#3a2a1e', hairStyle: 'short', beard: '#3a2a1e', beardStyle: 'short', age: 'mid', iris: '#3a2a20', shoes: '#8a2a3a', mood: 'stern', ...o, over: loros + stemma + over });
const MONKS = [['#2a2630', '#6a5e54', '#d9a47e'], ['#33303a', '#cfc8bc', '#e2b48f'], ['#26242c', '#3a2a1e', '#c99a72'], ['#2e2a34', '#8a8278', '#d9a47e']];
/** One of the imprisoned monks (black habit and hood, beard). */
export const byzMonk = (x, y, s, i = 0, o = {}) => { const [top, beard, skin] = MONKS[i % 4];
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.1), mantle: null, belt: '#4a3a2a', skin, veil: '#24202a', veilHair: 'covered', hair: beard, beard, beardStyle: i % 2 ? 'long' : 'full',
    age: i % 2 ? 'old' : 'mid', iris: '#3a2a20', shoes: '#2a2024', ...o }); };
const guard = (x, y, s, o = {}) => legionary(x, y, s, o);
const courtier = (x, y, s, o = {}) => governor(x, y, s, { top: '#e8dcc4', mantle: '#2f5a4a', lining: GOLD, trim: GOLD, ...o });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  sHook:  { key: '#ffe0a8', from: 'top', tint: '#ffe8c8', amt: 0.1, rim: '#fff0d0', rimOp: 0.85 },
  sIcons: { key: '#ffa060', from: 'r', tint: '#ffb890', amt: 0.18, rim: '#ffb070', rimOp: 0.9 },
  sExile: { key: '#ffb880', from: 'r', tint: '#d8a8b0', amt: 0.14, rim: '#ffc8a0', rimOp: 0.85 },
  sTrial: { key: '#ffe0a8', from: 'top', tint: '#ffe8c8', amt: 0.1, rim: '#fff0d0', rimOp: 0.85 },
  sQuote: { key: '#ffc890', from: 'l', tint: '#e8c0a8', amt: 0.16, rim: '#ffd8a8', rimOp: 0.9 },
  sDeath: { key: '#ffe8c8', from: 'top', tint: '#9aa0d0', amt: 0.22, rim: '#ffe8c0', rimOp: 0.9 },
  sGlory: { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `stlit${++LID}`, d = 5;
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
export const castShadow = (x, y, s, mode) => {
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[LIGHT[mode].from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ scenes
// cam3d feet art y (plane 20): depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1245.
/** The coin: raised in the hand, thrown down at t, lying on the floor at (lx, ly) after. Coordinates in the character plane. */
const thrownCoin = (hx, hy, lx, ly, t0, t1, s = 1.1) => `<g opacity="0"${M.tw([{ at: t1 - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }])}><g${M.tw([{ at: t1, dur: 0.35, from: { x: hx - lx, y: hy - ly, rotation: 0 }, to: { x: 0, y: 0, rotation: 200 }, ease: 'power2.in' }])}>`
  + `<g transform="translate(${lx},${ly}) scale(1,0.42)">${solidus(s)}</g></g></g>`;

// 0 · HOOK. SHOT "A monk threw the emperor's gold coin on the floor and stepped on it.": the monk lifts the gold coin before the
//     throne, throws it down, plants his foot on it; the emperor starts in fury.  SHOT "This is Saint Stephen the Younger.": he
//     turns to us, calm.
const S0 = [370, 1345, 2.3], E0 = [800, 1322, 2.05];
function scene0() {
  const th = at(0, 'threw'), st = at(0, 'stepped'), ti = at(0, 'This is');
  return layer(0.95, lit(castShadow(...E0, 'sHook') + seq((op) => emperorC5(...E0, { flip: true, look: [2.4, 0.4], armL: [16, 2, 3], ...op }),
      [[0, { mood: 'stern', armR: [24, 2, 3] }], [st + 0.1, { mood: 'surprised', armR: [70, 3, 2] }]]) + rage(...E0, st + 0.5) + steam(...E0, st + 0.6), 'sHook'))
    + thrownCoin(S0[0] + 240, 740, S0[0] + 60, 1338, 0, th + 0.2)
    + lit(castShadow(...S0, 'sHook') + `<g${squash(st, S0[0] + 40, S0[1], 0.08)}><g${M.tw([{ at: st - 0.1, dur: 0.25, from: { x: 0 }, to: { x: 40 }, ease: 'power2.out' }])}>`
      + seq((op) => stephenHD(...S0, { armL: [16, 2, 3], ...op }),
        [[0, { mood: 'determined', look: [2.4, -0.6], armR: [128, 3, 2.2], propR: coinHand }], [th + 0.2, { mood: 'determined', look: [2.4, 1.6], armR: [40, 2, 3] }],
          [ti, { mood: 'peaceful', look: [0, 0], armR: [20, 2, 3], halo: ti + 0.2 }], [ti + 1.0, { mood: 'happy', look: [0, 0], armR: [20, 2, 3], halo: true }]]) + '</g></g>', 'sHook')
    + speedLines(S0[0] + 90, 1300, { at: st, dur: 0.7, r0: 200, r1: 700, op: 0.4, color: '#fff4d8', seed: 3 })
    + NEAR(bokeh(6, { seed: 5, sides: true, op: [0.2, 0.4] }));
}

// 1 · SHOT "Emperor Constantine V was burning the holy icons of Christ and Mary.": Constantinople at dusk; a soldier throws icons
//     onto a bonfire.  SHOT "Stephen, a hermit monk, would not give them up.": Stephen holds his icon of Christ to his chest.
const S1 = [320, 1345, 2.25], G1 = [830, 1322, 2.0], FX1 = [640, 1322];
function scene1() {
  const bu = at(1, 'burning'), ic = at(1, 'icons'), sh = at(1, 'Stephen, a hermit'), wn = at(1, 'would not');
  const tossed = (t, dx, rot, kind) => `<g opacity="0"${M.tw([{ at: t, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t + 0.9, dur: 0.4, to: { opacity: 0 } }])}>`
    + `<g${M.tw([{ at: t, dur: 0.8, from: { x: 150, y: -170, rotation: 0 }, to: { x: dx, y: 0, rotation: rot }, ease: 'power1.in' }])}><g transform="translate(${FX1[0]},${FX1[1] - 90})">${iconPanel(kind, 0.5)}</g></g></g>`;
  return layer(0.95, `<g transform="translate(${FX1[0]},${FX1[1] - 50})"><g transform="translate(-50,0) rotate(-18)">${iconPanel('mary', 0.62)}</g><g transform="translate(50,0) rotate(20)">${iconPanel('christ', 0.6)}</g></g>`
      + campfire(FX1[0], FX1[1], 1.5) + tossed(bu, -20, -50, 'christ') + tossed(ic + 0.3, 30, 60, 'mary')
      + lit(castShadow(...G1, 'sIcons') + seq((op) => guard(...G1, { flip: true, look: [2.4, 0.6], armL: [16, 2, 3], ...op }),
        [[0, { armR: [110, 3, 2], propR: iconHand('christ') }], [bu + 0.05, { armR: [60, 2, 3] }], [ic + 0.2, { armR: [110, 3, 2], propR: iconHand('mary') }], [ic + 0.35, { armR: [50, 2, 3] }]]), 'sIcons'))
    + lit(castShadow(...S1, 'sIcons') + seq((op) => stephenHD(...S1, { armL: [44, 2, 3], armR: [44, 2, 3], propR: iconHand('christ'), ...op }),
      [[0, { mood: 'sad', look: [2.4, 0.6] }], [sh, { mood: 'determined', look: [0, 0] }], [wn + 0.3, { mood: 'determined', look: [2.4, 0] }]]), 'sIcons')
    + `<g opacity="0"${fadeIn(wn, 0.6)}>${glow(S1[0] + 50, 950, 220, 0.5)}</g>`
    + NEAR(foliage('l', 1650, { color: '#2a1e22', seed: 4 }));
}

// 2 · SHOT "The emperor's men tried flattery and bribes, then threats.": a courtier holds out a bag of gold; Stephen turns away;
//     a soldier levels his spear (it never touches him).  SHOT "When he still refused, they banished him to an island.": cut:
//     Stephen alone on an island cliff over the stormy sea, praying; the boat that left him sails off.
const S2 = [330, 1345, 2.25], C2 = [790, 1322, 2.0], SP2 = [800, 1322, 2.05], S2b = [430, 1345, 2.2];
function scene2() {
  const fl = at(2, 'flattery'), br = at(2, 'bribes'), tr = at(2, 'threats'), wh = at(2, 'When he still'), is = at(2, 'island');
  return until(wh, layer(0.95, lit(span(0, tr, castShadow(...C2, 'sExile') + seq((op) => courtier(...C2, { flip: true, look: [2.4, 0], armL: [16, 2, 3], ...op }),
        [[0, { mood: 'happy', armR: [40, 2, 3] }], [br - 0.2, { mood: 'happy', armR: [70, 2, 3], propR: goldBag }]]))
      + from(tr, walk(tr, 0.5, 160, castShadow(...SP2, 'sExile') + guard(...SP2, { flip: true, look: [2.4, 0], armL: [16, 2, 3], armR: [76, 2, 3], propR: `<g transform="rotate(-80)">${spear}</g>` }))), 'sExile'))
      + lit(castShadow(...S2, 'sExile') + seq((op) => stephenHD(...S2, { armL: [16, 2, 3], ...op }),
        [[0, { mood: 'happy', look: [2.4, 0], armR: [20, 2, 3] }], [br, { mood: 'determined', look: [-2.4, 0], armR: [20, 2, 3] }], [tr, { mood: 'determined', look: [2.4, 0], armR: [20, 2, 3] }]]), 'sExile'))
    + from(wh, MID(`<g transform="translate(820,1170)"><g${M.tw([{ at: wh, dur: 5, from: { x: 0 }, to: { x: 160 }, ease: 'none' }])}><g${M.bob(4, 2.4)}>`
        + '<path d="M-70 0 L70 0 L50 26 L-50 26Z" fill="#5a3a26"/><rect x="-3" y="-120" width="6" height="120" fill="#6a4a2a"/><path d="M3 -116 Q60 -70 3 -14Z" fill="#e8dcc4"/></g></g></g>')
      + lit(castShadow(...S2b, 'sExile') + seq((op) => stephenHD(...S2b, op),
        [[0, { mood: 'sad', look: [2.4, 0.8], armL: [16, 2, 3], armR: [16, 2, 3] }], [is + 0.2, { mood: 'peaceful', kneel: true, ...PRAY }]]), 'sExile')
      + `<g opacity="0"${fadeIn(is, 1.0)}>${glow(S2b[0], 900, 280, 0.4)}</g>`)
    + NEAR(foliage('r', 1660, { color: '#2a2234', seed: 6 }));
}

// 3 · SHOT "Years later, Stephen stood before the emperor himself.": the palace hall; Stephen walks in before the enthroned emperor.
//     SHOT "He pulled out a gold coin stamped with the emperor's face.": he holds up the coin; it glints.
//     SHOT (slow) "He threw it down, and stepped on it.": the coin hits the marble; he plants his foot on it; the hall shakes.
const S3 = [360, 1345, 2.3], E3 = [800, 1322, 2.05];
const throne = (s = 1) => `<g transform="scale(${s})"><path d="M-110 0 V-330 Q0 -420 110 -330 V0Z" fill="#c8963e"/><path d="M-90 -20 V-320 Q0 -396 90 -320 V-20Z" fill="#7a2a4a"/>`
  + '<rect x="-120" y="-150" width="240" height="40" rx="8" fill="#e8b84a"/><rect x="-130" y="-20" width="260" height="22" rx="6" fill="#b8862e"/></g>';
function scene3() {
  const yl = at(3, 'Years later'), gc = at(3, 'gold coin'), th = at(3, 'threw it down'), st = at(3, 'stepped');
  return layer(0.95, lit(`<g transform="translate(${E3[0]},${E3[1] + 4})">${throne(1.05)}</g>` + castShadow(...E3, 'sTrial') + seq((op) => emperorC5(...E3, { flip: true, armL: [16, 2, 3], ...op }),
      [[0, { mood: 'stern', look: [2.4, 0.2], armR: [24, 2, 3] }], [gc + 0.3, { mood: 'stern', look: [2.4, -0.2], armR: [24, 2, 3] }], [st + 0.1, { mood: 'surprised', look: [2.4, 1], armR: [80, 3, 2] }]])
      + rage(...E3, st + 0.4), 'sTrial'))
    + thrownCoin(S3[0] + 240, 740, S3[0] + 60, 1338, gc - 0.1, th + 0.2, 1.2)
    + `<g opacity="0"${fadeIn(gc, 0.3)}><g${fadeOut(th, 0.3)}>${sparkles(10, S3[0] + 180, S3[0] + 300, 640, 760, { seed: 8 })}</g></g>`
    + lit(castShadow(...S3, 'sTrial') + walk(0, Math.max(0.8, yl + 1.2), -260, `<g${squash(st, S3[0] + 40, S3[1], 0.09)}><g${M.tw([{ at: st - 0.1, dur: 0.25, from: { x: 0 }, to: { x: 40 }, ease: 'power2.out' }])}>`
      + seq((op) => stephenHD(...S3, { armL: [16, 2, 3], ...op }),
        [[0, { mood: 'determined', look: [2.4, 0], armR: [20, 2, 3] }], [gc - 0.15, { mood: 'determined', look: [2.4, -0.6], armR: [128, 3, 2.2], propR: coinHand }],
          [th + 0.2, { mood: 'determined', look: [2.4, 1.6], armR: [40, 2, 3] }]]) + '</g></g>', { hop: 6, step: 0.32 }), 'sTrial')
    + crack(S3[0] + 60, 1340, 150, st, { seed: 4, color: '#5a4a3a', width: 5 }) + speedLines(S3[0] + 90, 1300, { at: st, dur: 0.7, r0: 200, r1: 700, op: 0.4, color: '#fff4d8', seed: 6 })
    + NEAR(bokeh(5, { seed: 9, sides: true, op: [0.2, 0.35] }));
}

// 4 · SHOT "The guards seized him for insulting the emperor.": two guards grab his arms; the emperor fumes.
//     SHOT "Stephen answered:" he lifts his face to the emperor.  SHOT (Stephen's voice) "If trampling your image is a crime, what
//     about trampling the image of Christ?": he speaks calmly; light falls on him; the emperor is struck silent.
const S4 = [400, 1345, 2.3], GA = [180, 1312, 2.05], GB = [610, 1312, 2.05], E4 = [850, 1250, 1.35];
function scene4() {
  const gs = at(4, 'guards'), sa = at(4, 'Stephen answered'), q0 = at(4, 'If trampling'), qe = at(4, 'image of Christ', 0.7);
  return MID(lit(castShadow(...E4, 'sQuote') + `<g transform="translate(${E4[0]},${E4[1] + 4})">${throne(0.66)}</g>` + seq((op) => emperorC5(...E4, { flip: true, look: [2.4, 0], armL: [16, 2, 3], ...op }),
      [[0, { mood: 'stern', armR: [84, 3, 2] }], [q0, { mood: 'stern', armR: [24, 2, 3] }], [qe - 0.6, { mood: 'surprised', armR: [24, 2, 3] }]]) + steam(...E4, gs + 0.3), 'sQuote'))
    + layer(0.97, lit(walk(gs - 0.3, 0.5, -160, castShadow(...GA, 'sQuote') + guard(...GA, { mood: 'stern', look: [2.4, 0], armR: [72, 2, 3], armL: [16, 2, 3] }))
      + walk(gs - 0.3, 0.5, 160, castShadow(...GB, 'sQuote') + guard(...GB, { flip: true, mood: 'stern', look: [2.4, 0], armR: [72, 2, 3], armL: [16, 2, 3] }))
      + sweat(...GB, qe - 0.4), 'sQuote'))
    + `<g opacity="0"${fadeIn(sa, 0.8)}>${beam(S4[0] - 100, S4[0] + 100, S4[0] - 230, S4[0] + 230, 1360, 0.6)}${glow(S4[0], 820, 300, 0.45)}</g>`
    + lit(castShadow(...S4, 'sQuote') + seq((op) => stephenHD(...S4, { armL: [24, 2, 3], armR: [24, 2, 3], ...op }),
      [[0, { mood: 'determined', look: [0, 0] }], [gs, { mood: 'determined', look: [2.4, 0] }], [sa, { mood: 'peaceful', look: [2.4, -0.6] }],
        [q0 - 0.05, { mood: 'determined', look: [2.4, -0.6], talk: [q0, qe] }], [qe, { mood: 'peaceful', look: [2.4, -0.6] }]]), 'sQuote')
    + NEAR(foliage('l', 1650, { color: '#22161c', seed: 7 }));
}

// 5 · SHOT "He was whipped, then locked in a prison crowded with 342 monks.": a guard raises the whip over the kneeling monk (a
//     flash, no blow lands); then the prison: a crowd of monks behind bars, a "342" tally.  SHOT "At last, soldiers dragged him
//     through the streets and clubbed him to death.": the night street: a soldier drags him by a rope; another raises a club;
//     a flash.  SHOT "They could trample his body, but never the image of Christ.": light pours down on him at peace, a halo;
//     the icon of Christ shines above; the trampled coin lies dull in the dust.
const S5 = [380, 1345, 2.2], W5 = [740, 1322, 2.05];
function scene5() {
  const wp = at(5, 'whipped'), lk = at(5, 'locked'), cr = at(5, 'crowded'), sd = at(5, 'soldiers dragged'), cl = at(5, 'clubbed'), tc = at(5, 'They could'), nv = at(5, 'never');
  const monks = (y, s, xs, d) => xs.map((x, k) => layer(d, lit(byzMonk(x, y, s, k + Math.round(x), { mood: k % 3 ? 'peaceful' : 'sad', look: [0, 1], ...PRAY, kneel: k % 2 === 0, ph: (k * 0.29) % 1 }), 'sDeath'))).join('');
  // dragged: lying (head left), pulled to the right by a rope tied at the feet
  const LY = 1300, dragged = `<g${M.tw([{ at: sd, dur: Math.max(1.2, cl - sd), from: { x: -60 }, to: { x: 200 }, ease: 'sine.inOut' }])}>`
    + `<g transform="translate(560,${LY})"><g transform="rotate(-90)">${stephenHD(0, 0, 1.6, { mood: 'peaceful', armL: 8, armR: 8 })}</g></g>`
    + `<path d="M560 ${LY - 10} Q640 ${LY - 4} 720 ${LY - 150}" stroke="#b8925a" stroke-width="6" fill="none"/></g>`;
  const lying = `<g transform="translate(820,${LY})"><g transform="rotate(-90)">` + seq((op) => stephenHD(0, 0, 1.6, { armL: 8, armR: 8, ...op }), [[0, { mood: 'peaceful' }], [nv, { mood: 'tender', halo: nv }]]) + '</g></g>';
  return until(sd, MID(span(lk, sd, prisonWall(1245))) + span(lk, sd, monks(1250, 1.0, [-20, 90, 200, 640, 750, 870, 980, 1090], 0.75) + monks(1290, 1.2, [60, 220, 700, 860, 1010], 0.85))
      + span(cr, sd, popAt(cr + 0.2, 540, 620, tally('342')))
      + until(lk, layer(0.95, lit(castShadow(...W5, 'sDeath') + seq((op) => guard(...W5, { flip: true, look: [2.4, 0.8], armL: [16, 2, 3], propR: whip, ...op }),
        [[0, { armR: [40, 2, 3] }], [wp - 0.4, { armR: [160, 2, 2] }]]), 'sDeath')) + flash(wp + 0.2))
      + lit(castShadow(...S5, 'sDeath') + seq((op) => stephenHD(...S5, op), [[0, { mood: 'peaceful', kneel: true, ...PRAY }], [lk, { mood: 'peaceful', kneel: true, ...PRAY, look: [0, -1] }]]), 'sDeath'))
    + span(sd, tc, layer(0.95, lit(walk(sd, Math.max(1.2, cl - sd), -200, castShadow(900, 1322, 2.0, 'sDeath') + guard(900, 1322, 2.0, { flip: true, mood: 'stern', look: [-2.4, 0.6], armL: [16, 2, 3], armR: [40, 2, 3] }))
        + castShadow(300, 1322, 2.0, 'sDeath') + seq((op) => guard(300, 1322, 2.0, { mood: 'stern', look: [2.4, 0.6], armL: [16, 2, 3], propR: club, ...op }), [[0, { armR: [30, 2, 3] }], [cl - 0.5, { armR: [165, 2, 2] }]]), 'sDeath'))
      + lit(dragged, 'sDeath') + flash(cl + 0.1))
    + from(tc, `${beam(520, 720, 380, 860, 1380, 0.8)}${glow(620, 1000, 420, 0.6)}` + lit(lying, 'sDeath')
      + `<g transform="translate(900,1336) scale(1,0.42)"><g opacity=".7">${solidus(1.0)}</g></g>`
      + popAt(nv, 620, 700, `<g${M.bob(6, 3)}>${iconPanel('christ', 1.0)}</g>`, 0.6) + `<g opacity="0"${fadeIn(nv, 0.8)}>${sparkles(18, 480, 960, 520, 1200, { seed: 21 })}</g>`)
    + NEAR(bokeh(5, { seed: 13, sides: true, op: [0.15, 0.3] }));
}

// 6 · FEAST DAY. SHOT "His feast day is November 28, and he is shown holding an icon of Christ and Mary.": the portrait at
//     sunset over Constantinople, haloed, holding the diptych.  SHOT "Saint Stephen the Younger, pray for us.": tender.
const S6 = [470, 1345, 2.3];
function scene6() {
  const nv = at(6, 'November'), ho = at(6, 'holding'), pr = at(6, 'pray for us');
  return lit(castShadow(...S6, 'sGlory') + seq((op) => stephenHD(...S6, { halo: true, armL: [40, 2, 3], armR: [40, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [0, 0], propR: palm_frond(1.0, -8) }], [ho - 0.1, { mood: 'happy', look: [0, 0] }], [pr, { mood: 'tender' }]]), 'sGlory')
    + popAt(ho, S6[0], 1070, diptych(0.9), 0.5)
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(S6[0], 740, 240, 0.45)}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 520, 900, { seed: 27 })}</g>`
    + NEAR(bokeh(7, { seed: 45, sides: true }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'St_Stephen_the_Younger_Coin',
  bg3d: './stephen_the_younger_coin.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'andrew.bg3d.js': './andrew_apostle.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js', 'clement.bg3d.js': './clement_anchor.bg3d.js',
    'conrad.bg3d.js': './conrad_spider_chalice.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { stephen: { voice: 'bm_george', speed: 0.92 } },
  music: { story: "a monk in Constantinople who threw the emperor's gold coin down and stepped on it, to defend the holy icons, and was martyred for it",
    color: 'Byzantine: deep male drone like an ison, a wordless Byzantine-style choir, low strings, frame drum and a soft oud',
    cues: { 2: 'Lonely and windswept: a low drone and a single solo string line over the sea.', 4: 'Hushed and tense: almost silent, a held low drone, then a rising swell of choir under his words.' } },
  thumb_hook: "He stepped on the emperor's face", thumb_title: 'St. Stephen the Younger', thumb_scene: 0, thumb_t: 0.8, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'twˈɛnti ˈeɪt,': 'twˈɛnti ˈeɪtθ,',   // November 28 -> November twenty-eighth
  },
  scenes: [
    { kicker: 'CONSTANTINOPLE · AROUND 764', title: 'He Stepped on the Coin', art: scene0, bg3d: 'sHook', front3d: true,
      cam: { ...GLIDE, shake: { at: at(0, 'stepped', 0.05), amt: 12, dur: 0.5 }, path: [
        { at: at(0, 'stepped'), to: [S0[0] + 90, 1250], z: 1.2, frame: [540, 1080] },
        { at: at(0, 'This is'), to: face(...S0), z: 1.35, frame: [520, 840] }] },
      tone: HOOK,
      say: ["A monk threw the emperor's gold coin on the floor and stepped on it.", 'This is Saint Stephen the Younger.'] },
    { kicker: 'CONSTANTINOPLE · THE 750s', title: 'The War on Icons', art: scene1, bg3d: 'sIcons', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(1, 'icons'), to: [FX1[0], 1150], depth: 0.95, z: 1.15, frame: [560, 1020] },
        { at: at(1, 'would not'), to: face(...S1), z: 1.3, frame: [520, 840] }] },
      tone: HOOK,
      say: ['Emperor Constantine V was burning the holy icons of Christ and Mary.', 'Stephen, a hermit monk, would not give them up.'] },
    { kicker: 'THE SEA OF MARMARA', title: 'Bribes, Then Exile', art: scene2, bg3d: 'sExile', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(2, 'bribes'), to: [620, 1020], depth: 0.95, z: 1.12, frame: [560, 980] },
        { at: at(2, 'island'), to: face(S2b[0], S2b[1], S2b[2], true), z: 1.2, frame: [520, 900] }] },
      tone: STAND,
      say: ["The emperor's men tried flattery and bribes, then threats.", 'When he still refused, they banished him to an island.'] },
    { kicker: "THE EMPEROR'S PALACE", title: 'Face to Face', art: scene3, bg3d: 'sTrial', front3d: true,
      cam: { ...GLIDE, whip: 'r', shake: { at: at(3, 'stepped', 0.05), amt: 18, dur: 0.6 }, path: [
        { at: at(3, 'emperor himself'), to: face(...E3), depth: 0.95, z: 1.2, frame: [560, 860] },
        { at: at(3, 'gold coin'), to: [S3[0] + 200, 800], z: 1.3, frame: [560, 880] },
        { at: at(3, 'stepped'), to: [S3[0] + 90, 1240], z: 1.15, frame: [540, 1080] }] },
      tone: STAND,
      say: ['Years later, Stephen stood before the emperor himself.', "He pulled out a gold coin stamped with the emperor's face.", { text: 'He threw it down, and stepped on it.', speed: 0.85 }] },
    { kicker: 'WHOSE IMAGE?', title: 'The Question', art: scene4, bg3d: 'sQuote', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(4, 'guards'), to: [400, 1000], z: 1.05, frame: [540, 980] },
        { at: at(4, 'If trampling'), to: face(...S4), z: 1.4, frame: [520, 860] }] },
      tone: STAND,
      say: ['The guards seized him for insulting the emperor.', 'Stephen answered:', { text: 'If trampling your image is a crime, what about trampling the image of Christ?', who: 'stephen' }] },
    { kicker: 'CONSTANTINOPLE · NOVEMBER 764', title: 'Dragged Through the City', art: scene5, bg3d: 'sDeath', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(5, 'crowded'), to: [540, 1080], depth: 0.85, z: 1.05, frame: [540, 980] },
        { at: at(5, 'soldiers dragged'), to: [620, 1180], z: 1.05, frame: [540, 1040] },
        { at: at(5, 'never'), to: [620, 1000], z: 1.1, frame: [540, 940] }] },
      tone: { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['He was whipped, then locked in a prison crowded with 342 monks.', 'At last, soldiers dragged him through the streets and clubbed him to death.',
        { text: 'They could trample his body, but never the image of Christ.', speed: 0.92 }] },
    { kicker: 'FEAST DAY · NOVEMBER 28', title: 'Saint Stephen', art: scene6, bg3d: 'sGlory', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(6, 'holding'), to: [S6[0], 1000], z: 1.12, frame: [540, 980] },
        { at: at(6, 'pray for us'), to: face(...S6), z: 1.3, frame: [540, 860] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 28, and he is shown holding an icon of Christ and Mary.', 'Saint Stephen the Younger, pray for us.'] },
  ],
};
