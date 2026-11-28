// St. Saturninus (Sernin) of Toulouse: the bull of the Capitol (one story; Roman Toulouse, around 250). Feast: November 29.
// All-3D backgrounds (saturninus_bull.bg3d.js: roma() thinned into Roman Tolosa); cam3d; characters hd(); Ricks Clips motion.
// Sources: Passio Sancti Saturnini, tr. A. Eastbourne (tertullian.org): the oracles fell silent "at the sight of this man" who
//   "passed by the Capitol frequently"; a bull prepared as a victim; a priest and two deacons fled; his answer "I know only one God,
//   the true God ... I know that your gods are demons"; the rope tied round the bull's flanks and bound to his feet, the bull driven
//   down from the Capitol, his death in the first part of the descent, "the rope having snapped in two"; two women buried him deep
//   in a wooden coffin; Hilary and Exuperius later built churches over him. Vatican State saint of the day (Nov 29; Passio mid-5th c.);
//   New Advent "St. Saturninus" (first bishop of Toulouse, consulate of Decius and Gratus, 250); Wikipedia "Saturnin"
//   (Basilica of Saint-Sernin, patron of Toulouse). Depicted as told (tied by the feet, dragged down the steps), bloodless only.
// Exported for later reels: saturninusHD, paganPriest, townsman, cleric, tolosaWoman, bullHD, sacBull, brazier, mob, capitol, sideSteps, sernin, altarFire, woodCoffin.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, rng, palm_frond, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import { speedLines, rage, steam, burst } from '../cartoonfx.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';
import { mitre } from './francis.mjs';
import { crozier } from './martin_of_tours.mjs';
import { senator } from './gelasius.mjs';
import { wildCow } from './perpetua_arena.mjs';
import { templeSteps } from './presentation_of_mary.mjs';
import { idol } from './longinus.mjs';
import { shot, push, pull, crane, truck, follow, spot } from '../cammoves.mjs';

const SLUG = 'st_saturninus_bull';
const at = wordTimes(SLUG);
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
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };

// ================================================================ characters
/** St. Saturninus: a bishop in his prime, white alb, red cope with gold lining (a martyr), mitre, brown beard going grey. */
const SAT = { top: '#f4eee2', plain: true, trim: GOLD, mantle: '#a8202c', lining: GOLD, belt: false, skin: '#dca47c', hair: '#5e4a3a', hairStyle: 'short',
  beard: '#6e5a4a', beardStyle: 'full', age: 'mid', iris: '#3a2a20', shoes: '#6a2a2a' };
export const saturninusHD = (x, y, s, { over = '', mitred = true, ...o } = {}) => hd(x, y, s, { ...SAT, ...o, over: (mitred && !o.kneel ? mitre : '') + over });
const CROZ = `<g transform="rotate(-6) scale(0.74)">${crozier}</g>`;
/** A pagan priest of the Capitol: toga with a purple stripe and a laurel wreath (gelasius senator). */
const WREATH = '<path d="M-44 -266 Q0 -300 44 -266" stroke="#557a2e" stroke-width="8" fill="none" stroke-linecap="round"/>'
  + [-38, -26, -13, 0, 13, 26, 38].map((x) => `<ellipse cx="${x}" cy="${f(-270 - 22 * (1 - (x / 44) ** 2))}" rx="9" ry="5" fill="#6e9a3a" transform="rotate(${f(x * 1.4)} ${x} ${f(-270 - 22 * (1 - (x / 44) ** 2))})"/>`).join('');
export const paganPriest = (x, y, s, o = {}) => senator(x, y, s, { ...o, over: WREATH + (o.over || '') });
/** Townsmen of Tolosa: plain belted tunics (0 brown, 1 blue clean-shaven, 2 olive). */
const TOWN = [['#8a5a3a', '#3a2618', '#c48a5f'], ['#5a6a8a', '#2a1c14', '#d9a47e'], ['#7a7a4a', '#5a3a22', '#b8805a']];
export const townsman = (x, y, s, i = 0, o = {}) => { const [top, hair, skin] = TOWN[i % 3];
  return hd(x, y, s, { top, plain: true, mantle: null, belt: '#4a3020', trim: dark(top, 0.2), skin, hair, hairStyle: i % 2 ? 'curly' : 'short',
    beard: i === 1 ? null : hair, beardStyle: i === 1 ? null : 'short', age: 'mid', iris: '#3a2a20', shoes: '#4a3020', mood: 'stern', ...o }); };
/** His clergy: 0 the priest (brown mantle), 1–2 young deacons (dalmatic stripes). */
const DALM = '<path d="M-19 -207 L-25 -14 M19 -207 L25 -14" stroke="#b3202e" stroke-width="7"/>';
export const cleric = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: '#ece4d2', plain: true, trim: '#c8a060', mantle: i ? null : '#7a5a3a', lining: '#c8a060', belt: false,
  skin: ['#d9a47e', '#e2b48f', '#c99a72'][i % 3], hair: ['#4a3424', '#2a1c14', '#6a4a30'][i % 3], hairStyle: i === 2 ? 'curly' : 'short', beard: i ? null : '#4a3424',
  beardStyle: i ? null : 'short', age: i ? 'young' : 'mid', iris: '#3a2a20', shoes: '#5a3a22', ...o, over: (i && !o.kneel ? DALM : '') + (o.over || '') });
/** The two women who buried him: veiled (no hair shown), plain dark mantles. */
const WOM = [['#7a4a5a', '#3e3448', '#d9a47e'], ['#4a5a6a', '#e4dccb', '#c48a5f']];
export const tolosaWoman = (x, y, s, i = 0, o = {}) => { const [top, veil, skin] = WOM[i % 2];
  return hd(x, y, s, { top, mantle: dark(top, 0.2), lining: light(top, 0.2), veil, veilHair: 'hidden', belt: false, skin, hair: '#3a2618', beard: null,
    age: 'mid', iris: '#3a2a20', shoes: '#4a3020', ...o }); };

// ================================================================ props and set pieces
/** The bull prepared as a victim (wildCow, perpetua_arena) with a white sacrificial band round the neck. Feet at (x, y). */
/** The sacrificial bull, drawn in detail and dressed as Romans dressed a victim: gilded horn tips, a white wool infula with red
 *  ribbons on the brow, a red dorsuale (back cloth) with a gold border and fringe, a garland round the neck. Facing right, feet
 *  at (x, y), about 280 x 190 at s = 1 (rear flank ~(-96, -84), the rope point). run: a galloping gait with the head lowered. */
export function bullHD(x, y, s = 1, { flip = false, run = false, dressed = true, snort = true, c = '#4e3226', ph = 0 } = {}) {
  const d = dark(c, 0.32), l = light(c, 0.2), hoof = '#231610', horn = '#efe4cc', muz = '#8a5e4e';
  const leg = (lx, far, k) => {
    const col = far ? d : c, sw = run ? M.sway(30, 0.42, ph + k * 0.105, lx, -74) : '';
    return `<g${sw}><path d="M${lx - 12} -82 Q${lx - 15} -42 ${lx - 9} -14 L${lx + 9} -14 Q${lx + 13} -42 ${lx + 12} -82Z" fill="${col}"/>`
      + `<path d="M${lx - 8} -50 Q${lx - 2} -44 ${lx + 6} -50" stroke="${dark(col, 0.25)}" stroke-width="3" fill="none" opacity=".6"/>`
      + `<path d="M${lx - 10} -16 h20 l3 16 h-26Z" fill="${hoof}"/><path d="M${lx} -14 v14" stroke="#120a06" stroke-width="2"/></g>`;
  };
  const head = `<g transform="translate(118,-128) rotate(${run ? 22 : 6})">`
    + `<path d="M-28 -24 Q-54 -32 -52 -12 Q-40 -8 -26 -12Z" fill="${d}"/><path d="M-30 -22 Q-46 -24 -46 -14" stroke="#c89a8a" stroke-width="3" fill="none"/>`
    + `<path d="M-14 -36 Q-36 -78 -2 -94" stroke="${horn}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M12 -40 Q32 -80 64 -76" stroke="${horn}" stroke-width="10" fill="none" stroke-linecap="round"/>`
    + (dressed ? `<path d="M-6 -88 Q-4 -92 -2 -94" stroke="${GOLD}" stroke-width="12" stroke-linecap="round"/><path d="M56 -78 Q60 -77 64 -76" stroke="${GOLD}" stroke-width="12" stroke-linecap="round"/>` : '')
    + `<path d="M-32 -34 Q6 -48 34 -22 Q50 6 42 32 Q22 46 -4 38 Q-32 22 -36 -6Z" fill="${c}"/><path d="M-20 -30 Q4 -40 26 -24" stroke="${l}" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/>`
    + `<ellipse cx="30" cy="27" rx="23" ry="18" fill="${muz}"/><ellipse cx="24" cy="30" rx="4.5" ry="3.2" fill="#2b1810"/><ellipse cx="40" cy="27" rx="4.5" ry="3.2" fill="#2b1810"/>`
    + `<path d="M14 40 Q30 46 46 38" stroke="#5a3a30" stroke-width="2.5" fill="none"/>`
    + `<circle cx="2" cy="-8" r="7" fill="#fff6ea"/><circle cx="4" cy="-7" r="4.2" fill="#1e120e"/><circle cx="5.5" cy="-9" r="1.4" fill="#fff"/>`
    + `<path d="M-8 -21 L18 -12" stroke="#1e120e" stroke-width="4.5" stroke-linecap="round"/>`
    + (dressed ? `<path d="M-24 -36 Q4 -46 26 -32" stroke="#f4eee2" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M-22 -34 Q4 -42 24 -30" stroke="#e0d6c2" stroke-width="3" fill="none" stroke-dasharray="3 5"/>`
      + `<g${M.sway(run ? 16 : 6, run ? 0.42 : 2, ph, -22, -32)}><path d="M-22 -32 q-8 22 -2 44 M-16 -30 q-2 24 4 42" stroke="#b3202e" stroke-width="4" fill="none" stroke-linecap="round"/></g>` : '')
    + '</g>';
  const cloth = dressed ? `<path d="M-56 -158 Q8 -152 48 -176 L60 -112 Q2 -96 -50 -104Z" fill="#a8202c"/><path d="M-40 -150 Q8 -146 40 -164" stroke="#c83040" stroke-width="5" fill="none" opacity=".6"/>`
    + `<path d="M-50 -104 Q2 -96 60 -112" stroke="${GOLD}" stroke-width="7" fill="none"/>`
    + [...Array(9)].map((_, k) => { const t = k / 8, fx = -50 + 110 * t, fy = -104 + 8 * Math.sin(t * Math.PI) - 8 * t; return `<path d="M${f(fx)} ${f(fy + 3)} v10" stroke="${GOLD}" stroke-width="3"/>`; }).join('')
    + `<circle cx="4" cy="-134" r="9" fill="${GOLD}"/><circle cx="4" cy="-134" r="4" fill="#a8202c"/>` : '';
  const garland = dressed ? `<path d="M80 -172 Q104 -124 86 -80" stroke="#4e7e32" stroke-width="15" fill="none" stroke-linecap="round"/>`
    + [[84, -166, '#f2c46b'], [95, -142, '#f6f0e2'], [97, -118, '#d8607a'], [92, -96, '#f2c46b']].map(([gx, gy, gc]) => `<circle cx="${gx}" cy="${gy}" r="6" fill="${gc}"/>`).join('') : '';
  const body = `<path d="M-110 -100 Q-126 -152 -72 -160 Q-12 -152 30 -178 Q72 -194 96 -152 Q110 -112 90 -80 Q44 -64 -20 -66 Q-92 -64 -110 -100Z" fill="${c}"/>`
    + `<path d="M-102 -88 Q-20 -60 84 -82 Q40 -68 -20 -68Z" fill="${d}" opacity=".55"/>`
    + `<path d="M-84 -152 Q-14 -148 40 -174" stroke="${l}" stroke-width="7" fill="none" opacity=".5" stroke-linecap="round"/>`
    + `<path d="M-72 -142 Q-104 -112 -84 -82" stroke="${d}" stroke-width="5" fill="none" opacity=".5"/><path d="M62 -164 Q42 -124 58 -88" stroke="${d}" stroke-width="5" fill="none" opacity=".5"/>`
    + `<path d="M88 -112 Q100 -66 118 -98Z" fill="${d}"/>`;
  const tail = `<g${M.sway(run ? 24 : 9, run ? 0.42 : 2.4, ph, -108, -142)}><path d="M-108 -142 Q-136 -112 -126 -64" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="-126" cy="-58" rx="9" ry="14" fill="${hoof}"/></g>`;
  const puff = snort ? `<g transform="translate(${run ? 176 : 168},${run ? -70 : -92})"><g${M.pulse(0.3, 0.9)}><circle r="11" fill="#fff6e8" opacity=".45"/><circle cx="17" cy="-6" r="8" fill="#fff6e8" opacity=".3"/></g></g>` : '';
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="2" rx="128" ry="15" fill="#1a0f1a" opacity=".25"/>`
    + `<g${run ? M.bob(6, 0.42, ph) : M.bob(2, 0.9, ph)}>${leg(-74, true, 1)}${leg(48, true, 3)}${tail}${body}${cloth}${leg(-92, false, 0)}${leg(68, false, 2)}${garland}${head}${puff}</g></g>`;
}
export const sacBull = (x, y, s = 1, { flip = false, band = true, snort = true, run = false, ph = 0 } = {}) => bullHD(x, y, s, { flip, dressed: band, snort, run, ph });
/** A bronze tripod brazier with fire (dies to smoke at outAt). Base centre (x, y). */
export const brazier = (x, y, s = 1, { ph = 0, outAt = 99 } = {}) => `<g transform="translate(${x},${y}) scale(${s})">`
  + `<path d="M-34 0 L-14 -110 M34 0 L14 -110 M0 0 L0 -110" stroke="#8a6a3a" stroke-width="7" stroke-linecap="round"/><path d="M-40 -46 h80" stroke="#7a5a30" stroke-width="5"/>`
  + `<path d="M-48 -118 Q0 -84 48 -118Z" fill="#a8823e"/><path d="M-50 -120 h100" stroke="#d0a858" stroke-width="7" stroke-linecap="round"/>`
  + `<g${M.tw([{ at: outAt, dur: 0.35, from: { opacity: 1, scale: 1 }, to: { opacity: 0, scale: 0.3 }, origin: '0 -120' }])}>${glow(0, -160, 170, 0.55)}<g${M.flick(0.45, ph, 0.7)}>`
  + '<path d="M-32 -120 Q-36 -164 -6 -190 Q-8 -158 8 -152 Q14 -186 34 -198 Q46 -158 32 -120Z" fill="#f29a3a"/><path d="M-14 -120 Q-14 -150 2 -166 Q6 -142 18 -136 Q22 -126 16 -120Z" fill="#ffd27a"/></g></g>'
  + `<g opacity="0"${M.tw([{ at: outAt + 0.1, dur: 0.4, from: { opacity: 0, y: 0 }, to: { opacity: 0.7, y: -40 } }, { at: outAt + 0.5, dur: 2.4, to: { opacity: 0, y: -240 } }])}>`
  + '<circle cx="-8" cy="-150" r="24" fill="#9a9090"/><circle cx="14" cy="-186" r="32" fill="#a8a0a0"/><circle cx="-4" cy="-228" r="38" fill="#b8b0b0"/></g></g>';
/** A row of small townsmen (background crowd, faces under the check's size floor), some shaking fists. */
export const mob = (x0, x1, y, n, { s = 0.6, seed = 3, mood = 'stern', fists = true, ph = 0 } = {}) => { const R = rng(seed); let o = '';
  for (let k = 0; k < n; k++) { const x = x0 + (x1 - x0) * (k + 0.5) / n + (R() - 0.5) * 18;
    o += townsman(f(x), f(y + (R() - 0.5) * 10), s, k % 3, { flip: R() < 0.5, mood, look: [f(R() * 2 - 1), 0], armL: [16, 2, 3], armR: fists && k % 2 ? [140, 8, 0.5 + R() * 0.3] : [20, 2, 3] }); }
  return `<g class="extras">${o}</g>`; };
const STICK = '<rect x="-5" y="-210" width="10" height="250" rx="4" fill="#7a5a3a"/><rect x="0" y="-210" width="4" height="250" fill="#5a3e28" opacity=".6"/>';
const COIL = '<g><ellipse rx="22" ry="14" fill="none" stroke="#c8a870" stroke-width="7"/><ellipse rx="13" ry="8" fill="none" stroke="#b09058" stroke-width="5"/></g>';
const rope = (x0, y0, x1, y1, sag = 18) => `<path d="M${f(x0)} ${f(y0)} Q${f((x0 + x1) / 2)} ${f((y0 + y1) / 2 + sag)} ${f(x1)} ${f(y1)}" stroke="#c8a870" stroke-width="7" fill="none" stroke-linecap="round"/>`;
/** The Capitol of Tolosa from the front: steps, podium, six columns, pediment. Base centre at (x, y). */
export const capitol = (x, y, s = 1, { c = '#e8dcc0' } = {}) => {
  const cols = [-300, -180, -60, 60, 180, 300].map((cx) => `<rect x="${cx - 26}" y="-560" width="52" height="380" fill="${c}"/><rect x="${cx + 6}" y="-560" width="20" height="380" fill="${dark(c, 0.18)}" opacity=".6"/>`
    + `<rect x="${cx - 34}" y="-576" width="68" height="18" fill="${light(c, 0.1)}"/><rect x="${cx - 32}" y="-196" width="64" height="16" fill="${dark(c, 0.08)}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-340" y="-560" width="680" height="380" fill="${dark(c, 0.55)}"/>`
    + `<rect x="-70" y="-470" width="140" height="290" fill="#2a1c18" opacity=".7"/>${cols}`
    + `<rect x="-350" y="-620" width="700" height="46" fill="${c}"/><rect x="-350" y="-584" width="700" height="10" fill="${dark(c, 0.2)}"/>`
    + `<path d="M-370 -620 L0 -730 L370 -620Z" fill="${light(c, 0.06)}"/><path d="M-320 -628 L0 -712 L320 -628Z" fill="${dark(c, 0.12)}"/>`
    + [-300, -180, -60, 60, 180].map((cx) => `<path d="M${cx} -552 Q${cx + 60} -500 ${cx + 120} -552" stroke="#4e7e32" stroke-width="13" fill="none" stroke-linecap="round"/><circle cx="${cx + 60}" cy="-512" r="8" fill="#b3202e"/><path d="M${cx + 60} -506 v26" stroke="#b3202e" stroke-width="4"/>`).join('')
    + `${templeSteps(0, 0, { n: 6, w0: 800, dw: 30, sh: 30, c })}</g>`;
};
/** A stone staircase seen from the side, falling from the landing (x0, y0) to the street (x1, y1); temple columns on the landing. */
export const sideSteps = (x0, y0, x1, y1, n = 9, { c = '#dccaa8' } = {}) => {
  const w = (x1 - x0) / n, h = (y1 - y0) / n;
  let p = `M-300 ${y0} L${x0} ${y0}`, nose = '';
  for (let k = 0; k < n; k++) { const x = x0 + k * w, y = y0 + k * h; p += ` L${f(x)} ${f(y + h)} L${f(x + w)} ${f(y + h)}`;
    nose += `<rect x="${f(x - 2)}" y="${f(y + h - 1)}" width="${f(w + 4)}" height="7" fill="${light(c, 0.2)}"/>`; }
  p += ` L1500 ${y1} L1500 1900 L-300 1900Z`;
  const col = (cx) => `<rect x="${cx - 32}" y="${y0 - 520}" width="64" height="520" fill="${c}"/><rect x="${cx + 8}" y="${y0 - 520}" width="24" height="520" fill="${dark(c, 0.2)}" opacity=".6"/>`
    + `<rect x="${cx - 40}" y="${y0 - 536}" width="80" height="18" fill="${light(c, 0.1)}"/>`;
  return `<g><rect x="-300" y="${y0 - 560}" width="560" height="560" fill="${dark(c, 0.55)}"/>${col(-40)}${col(150)}`
    + `<rect x="-300" y="${y0 - 590}" width="560" height="44" fill="${c}"/>`
    + `<path d="${p}" fill="${dark(c, 0.1)}"/><rect x="-300" y="${y0 - 6}" width="${x0 + 300}" height="10" fill="${light(c, 0.2)}"/>${nose}`
    + `<rect x="-300" y="${y1}" width="1800" height="600" fill="${dark(c, 0.22)}" opacity=".55"/></g>`;
};
/** The Basilica of Saint-Sernin in Toulouse brick: long nave, transept, rounded apse, the tiered octagonal tower. Base centre (x, y). */
export const sernin = (x, y, s = 1, { lit = 1 } = {}) => {
  const b = '#c97a5a', d = dark(b, 0.22), rf = '#7a4a3a', win = (wx, wy, ww = 18, wh = 34) => `<path d="M${wx - ww / 2} ${wy} v${-wh + ww / 2} a${ww / 2} ${ww / 2} 0 0 1 ${ww} 0 v${wh - ww / 2}Z" fill="${lit ? '#ffd890' : '#4a2e28'}"/>`;
  let tw = ''; [[160, 70], [138, 62], [118, 58], [100, 54], [84, 50]].reduce((y0, [w, h]) => {
    tw += `<rect x="${-w / 2}" y="${y0 - h}" width="${w}" height="${h}" fill="${b}"/><rect x="${w / 6}" y="${y0 - h}" width="${w / 3}" height="${h}" fill="${d}" opacity=".55"/>`
      + `<rect x="${-w / 2 - 6}" y="${y0 - h - 6}" width="${w + 12}" height="8" fill="${light(b, 0.15)}"/>` + [-w / 4, 0, w / 4].map((wx) => win(wx, y0 - 12, 14, 30)).join('');
    return y0 - h; }, -260);
  return `<g transform="translate(${x},${y}) scale(${s})">${lit ? glow(0, -380, 420, 0.35) : ''}`
    + `<path d="M-330 -170 L-330 0 L330 0 L330 -170 L250 -230 L-250 -230Z" fill="${b}"/><path d="M-340 -170 L-250 -236 L250 -236 L340 -170Z" fill="${rf}"/>`
    + `<path d="M330 0 L330 -150 A110 150 0 0 1 400 0Z" fill="${d}"/>`
    + `<rect x="-120" y="-260" width="240" height="260" fill="${b}"/><path d="M-132 -260 L0 -320 L132 -260Z" fill="${rf}"/><rect x="40" y="-260" width="80" height="260" fill="${d}" opacity=".5"/>`
    + [-290, -230, -170, 170, 230, 290].map((wx) => win(wx, -40)).join('') + [-60, 0, 60].map((wx) => win(wx, -150, 22, 44)).join('')
    + `<rect x="-26" y="-70" width="52" height="70" rx="20" fill="#3a2420"/>`
    + `${tw}<path d="M-44 -554 L0 -700 L44 -554Z" fill="${rf}"/><path d="M0 -700 v-34 M-12 -722 h24" stroke="${GOLD}" stroke-width="6"/></g>`;
};
/** A stone altar with a sacrificial fire that dies at outAt (smoke rises). Base centre (x, y). */
export const altarFire = (x, y, s = 1, { outAt = 99 } = {}) => {
  const flames = `<g${M.tw([{ at: outAt, dur: 0.35, from: { opacity: 1, scale: 1 }, to: { opacity: 0, scale: 0.3 }, origin: '0 -126' }])}>${glow(0, -170, 150, 0.7)}`
    + `<g${M.flick(0.5, 0, 0.7)}><path d="M-46 -124 Q-50 -190 -10 -232 Q-14 -186 10 -170 Q20 -214 44 -236 Q60 -180 46 -124Z" fill="#f29a3a"/>`
    + '<path d="M-24 -124 Q-24 -170 0 -196 Q6 -160 26 -150 Q32 -136 24 -124Z" fill="#ffd27a"/></g></g>';
  const smoke = `<g opacity="0"${M.tw([{ at: outAt + 0.1, dur: 0.4, from: { opacity: 0, y: 0 }, to: { opacity: 0.7, y: -40 } }, { at: outAt + 0.5, dur: 2.4, to: { opacity: 0, y: -260 } }])}>`
    + '<circle cx="-10" cy="-160" r="26" fill="#9a9090"/><circle cx="16" cy="-196" r="34" fill="#a8a0a0"/><circle cx="-6" cy="-240" r="40" fill="#b8b0b0"/></g>';
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-80" y="-112" width="160" height="112" fill="#cfc2a8"/><rect x="24" y="-112" width="56" height="112" fill="#b0a288"/>`
    + `<rect x="-94" y="-128" width="188" height="20" rx="4" fill="#e2d6bc"/>${flames}${smoke}</g>`;
};
/** A plain wooden coffin seen from the side, base centre (x, y). */
export const woodCoffin = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-180 0 L-170 -70 L170 -70 L180 0Z" fill="#8a5a36"/>`
  + '<path d="M-186 -70 L-176 -88 L176 -88 L186 -70Z" fill="#a8703e"/><path d="M-160 -40 H160" stroke="#6a4228" stroke-width="4"/><path d="M100 -70 L110 0" stroke="#6a4228" stroke-width="5" opacity=".6"/></g>';
const tinyChurch = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-120" y="-170" width="240" height="170" fill="#e2cfae"/><rect x="40" y="-170" width="80" height="170" fill="#c4ae8a"/>`
  + '<path d="M-140 -166 L0 -250 L140 -166Z" fill="#a8583e"/><rect x="-30" y="-100" width="60" height="100" rx="26" fill="#5a3a26"/>'
  + `<rect x="-6" y="-310" width="12" height="62" fill="${GOLD}"/><rect x="-24" y="-292" width="48" height="12" fill="${GOLD}"/>`
  + `<rect x="-92" y="-130" width="34" height="40" rx="14" fill="#ffd890"/>${glow(-75, -110, 70, 0.5)}</g>`;
const mound = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-200 0 Q-150 -70 0 -76 Q150 -70 200 0Z" fill="#5a4a36"/><path d="M-120 -40 Q0 -66 120 -40" stroke="#6e5c44" stroke-width="8" fill="none"/></g>`;
const candle = `<g><rect x="-6" y="-36" width="12" height="40" rx="3" fill="#fbf6ea"/><circle cy="-46" r="40" fill="url(#sunGlow)"/><ellipse cy="-46" rx="5" ry="9" fill="#ffd98a"${M.flick(0.6, 0, 0.6)}/></g>`;

// ================================================================ light (keys = the scenes' bg3d names)
export const LIGHT = {
  sDragHook: { key: '#ffd8a0', from: 'l', tint: '#ffe0c0', amt: 0.12, rim: '#fff0d0', rimOp: 0.85 },
  sHook:   { key: '#ffd8a0', from: 'l', tint: '#ffe0c0', amt: 0.12, rim: '#fff0d0', rimOp: 0.85 },
  sCity:   { key: '#ffe0b0', from: 'r', tint: '#ffecd4', amt: 0.08, rim: '#fff4dc', rimOp: 0.8 },
  sTemple: { key: '#ffd8a0', from: 'r', tint: '#ffe6c6', amt: 0.1, rim: '#fff0d0', rimOp: 0.85 },
  sTrial:  { key: '#ffc090', from: 'r', tint: '#ffc8a8', amt: 0.16, rim: '#ffd8b0', rimOp: 0.9 },
  sDrag:   { key: '#ffe0b8', from: 'top', tint: '#a8a0b8', amt: 0.2, rim: '#ffe8c8', rimOp: 0.85 },
  sBurial: { key: '#ffe8c8', from: 'top', tint: '#9aa0d0', amt: 0.24, rim: '#e8e0ff', rimOp: 0.9 },
  sGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `${SLUG}_lit${++LID}`, d = 5;
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
// 0 · SHOT "Pagan priests claimed ... struck their gods silent.": the Capitol at sunset; a wreathed priest points at the bishop; the
//     altar fire before the idol dies to smoke on "silent". SHOT "This is Saint Saturninus.": he turns to us, the halo comes up.
// 0 · HOOK. SHOT "Pagan priests tied one bishop to a sacrificial bull": sunset on the Capitol landing; the bishop stands with the rope
//     at his feet, tied to the dressed bull; a townsman raises his stick; a brazier burns; a crowd waits at the foot of the steps.
//     SHOT (slow motion) "…and drove it down the temple steps.": the stick falls, the bull plunges down the steps and pulls him off his
//     feet; his mitre falls on the landing. SHOT "This is Saint Saturninus.": push in on his face, the halo comes up.
//     SHOT "It all began with gods that went silent.": crane up to the god's statue on the temple roof; the brazier dies to smoke.
const HX0 = 640, HY0 = 1010, HX1 = 1080, HY1 = 1340, HANG = f(Math.atan2(HY1 - HY0, HX1 - HX0) * 180 / Math.PI);
const HC = Math.cos(HANG * Math.PI / 180), HS = Math.sin(HANG * Math.PI / 180), HSS = 1.3, HBS = 1.9, HROPE = -300;
const SH = [150, HY0, 2.1], BH = [430, HY0, HBS], DH = [545, HY0, 1.9];
const hookDrag = () => { const dr = at(0, 'drove'), end = at(0, 'silent') + 1.2; return { dr, end, L: 0.6 * Math.hypot(HX1 - HX0, HY1 - HY0) }; };
/** The dragged bishop's face (art px) at hook-scene time t (camera keys follow it). */
const hookFace = (t) => {
  const { dr, end, L } = hookDrag(), u = Math.max(0, Math.min(1, (t - dr) / (end - dr))) * L, fx = HROPE - 252 * HSS, fy = -42 * HSS;
  return [Math.round(HX0 + u * HC + fx * HC - fy * HS), Math.round(HY0 + u * HS + fx * HS + fy * HC)];
};
const lyingHook = (op) => `<g transform="translate(${HROPE},${f(-42 * HSS)}) rotate(-90)">${saturninusHD(0, 0, HSS, { mitred: false, armL: 150, armR: 160, ...op })}</g>`;
const fallenMitre = `<g transform="translate(150,996) rotate(-78) scale(1.25)"><path d="M-30 0 L-34 -56 Q-18 -90 0 -102 Q18 -90 34 -56 L30 0Z" fill="#f4ead2"/><path d="M-4 -96 V-2 M-30 -40 H30" stroke="${GOLD}" stroke-width="8"/></g>`;
function sceneHook() {
  const ob = at(0, 'one bishop'), dr = at(0, 'drove'), ti = at(0, 'This is'), sl = at(0, 'silent');
  const { end, L } = hookDrag();
  const drag = `<g transform="translate(${HX0},${HY0}) rotate(${HANG})"><g${M.tw([{ at: dr, dur: end - dr, from: { x: 0 }, to: { x: f(L) }, ease: 'none' }])}>`
    + sacBull(0, 0, HBS, { run: true, snort: false }) + rope(-96 * HBS, -84 * HBS, HROPE + 14, -24, 12)
    + seq(lyingHook, [[0, { mood: 'pain' }], [ti, { mood: 'peaceful', halo: ti + 0.15 }]]) + '</g></g>';
  const standing = lit(castShadow(...SH, 'sDragHook') + seq((op) => saturninusHD(...SH, { armL: [20, 2, 3], ...op }),
      [[0, { mood: 'determined', look: [2.4, 0.4], armR: [16, 2, 3] }], [ob, { mood: 'determined', look: [0, 0], armR: [30, 2, 3] }]]), 'sDragHook')
    + lit(sacBull(...BH), 'sDragHook') + rope(BH[0] - 96 * HBS, BH[1] - 84 * HBS, SH[0] + 34, SH[1] - 10, 26);
  return lit(sideSteps(HX0, HY0, HX1, HY1, 9), 'sDragHook')
    + `<g transform="translate(100,${HY0 - 590})">${idol(0, 0, 0.62, { stone: '#d8ccb8' })}</g>`
    + lit(brazier(40, HY0, 1.15, { outAt: sl }), 'sDragHook')
    + lit(seq((op) => mob(700, 1060, HY1, 5, { s: 0.62, seed: 7, ...op }), [[0, { mood: 'stern' }], [dr + 0.3, { mood: 'surprised', fists: false }]]), 'sDragHook')
    + lit(castShadow(...DH, 'sDragHook') + seq((op) => townsman(...DH, 0, { look: [2.4, 0.6], armL: [16, 2, 3], propR: STICK, ...op }),
      [[0, { mood: 'stern', armR: [150, 2, 3] }], [dr - 0.15, { mood: 'stern', armR: [70, 2, 3] }], [dr + 0.4, { mood: 'stern', armR: [150, 2, 3] }]]), 'sDragHook')
    + rage(...DH, dr - 0.2, { dur: 1.4 })
    + until(dr, standing) + from(dr, fallenMitre) + from(dr, lit(drag, 'sDragHook'))
    + speedLines(HX0 + 60, HY0 - 140, { at: dr, dur: 0.8, op: 0.4 })
    + NEAR(bokeh(5, { seed: 13, sides: true, op: [0.15, 0.3] }));
}

const S0 = [340, 1345, 2.3], E0 = [830, 1322, 2.05];
function scene0() {   // (now the 3rd scene)
  const sl = at(2, 'silent');
  return MID(idol(560, 1150, 0.62, { stone: '#c8bcaa' }) + altarFire(560, 1245, 0.85, { outAt: sl }))
    + speedLines(560, 1000, { at: sl, dur: 0.7, op: 0.35 })
    + layer(0.95, lit(castShadow(...E0, 'sHook') + seq((op) => paganPriest(...E0, { flip: true, look: [2.4, 0.3], armL: [16, 2, 3], armR: [78, 2, 3], ...op }),
      [[0, { mood: 'stern' }], [sl, { mood: 'stern', armR: [120, 3, 2] }]]), 'sHook') + rage(...E0, sl + 0.05, { dur: 1.6 }))
    + lit(castShadow(...S0, 'sHook') + seq((op) => saturninusHD(...S0, { armL: [20, 2, 3], propL: CROZ, ...op }),
      [[0, { mood: 'determined', look: [2.4, 0], armR: [16, 2, 3] }], [sl + 0.3, { mood: 'peaceful', look: [2.4, 0.2], armR: [16, 2, 3] }]]), 'sHook')
    + NEAR(bokeh(6, { seed: 5, sides: true, op: [0.2, 0.4] }));
}

// 1 · SHOT "He was the first bishop of Toulouse, in Roman Gaul.": he walks in along the street, crozier in hand, and looks at us.
//     SHOT "His path to his tiny church passed the Capitol temple.": the camera goes to the little church (its lamp glows), then
//     to the temple across the roofs, where two townsmen turn and glare.
const S1 = [360, 1345, 2.3], T1a = [625, 1262, 1.55], T1b = [740, 1258, 1.5];
function scene1() {
  const fb = at(1, 'first bishop'), tc = at(1, 'tiny church'), cp = at(1, 'Capitol');
  const tw = (i, P) => layer(0.78, lit(castShadow(...P, 'sCity') + seq((op) => townsman(...P, i, { armL: [16, 2, 3], armR: [16, 2, 3], ...op }),
    [[0, { mood: 'happy', look: [2.4, 0] }], [cp, { mood: 'stern', flip: true, look: [2.4, 0.3] }]]), 'sCity'));
  return MID(tinyChurch(170, 1245, 0.95) + `<g opacity="0"${fadeIn(tc, 0.6)}>${glow(95, 1135, 160, 0.7)}</g>`)
    + tw(0, T1a) + tw(2, T1b)
    + walk(0, 1.2, 260, lit(castShadow(...S1, 'sCity') + seq((op) => saturninusHD(...S1, { flip: true, armL: [20, 2, 3], propL: CROZ, ...op }),
      [[0, { mood: 'happy', look: [2.4, 0] }], [fb, { mood: 'happy', look: [0, 0] }], [tc, { mood: 'tender', look: [2.4, 0] }], [cp, { mood: 'happy', look: [-2.4, 0] }]]), 'sCity'))
    + NEAR(foliage('l', 1640, { color: '#3a4a2a', seed: 3 }));
}

// 2 · SHOT "One day, a bull stood ready for sacrifice.": before the Capitol steps, the banded bull and the wreathed priest.
//     SHOT "A furious crowd seized the bishop.": two townsmen stride in and grab him (rage); he stands firm.
//     SHOT (human beat) "His priest and two deacons fled.": his three clerics turn and run off left; he watches them go, sad.
const S2 = [540, 1345, 2.3], B2 = [720, 1300, 2.0], G2 = [720, 1335, 2.15];
const C2 = [[105, 1286, 1.55, 0], [230, 1286, 1.55, 1], [355, 1290, 1.55, 2]];
function scene2() {
  const bu = at(3, 'bull'), cr = at(3, 'furious crowd'), fl = at(3, 'His priest');
  const clerics = C2.map(([x, y, s, i], k) => layer(0.85, walkOut(fl + 0.25 + k * 0.08, 1.5, -720, lit(castShadow(x, y, s, 'sTemple') + seq((op) => cleric(x, y, s, i, { armL: [16, 2, 3], armR: [16, 2, 3], ...op }),
    [[0, { mood: 'happy', look: [2.4, 0] }], [cr, { mood: 'worried', look: [2.4, 0.2] }], [fl, { mood: 'worried', flip: true, look: [2.4, 0], armL: [40, 4, 0.5], armR: [40, 4, 0.5] }]]), 'sTemple')))).join('');
  const grab = (P, i, d, dt) => layer(d, from(cr + dt, walk(cr + dt, 0.6, 420, lit(castShadow(...P, 'sTemple') + townsman(...P, i, { flip: true, look: [2.4, 0.2], armL: [60, 2, 3], armR: [86, 2, 3], mood: 'stern' }), 'sTemple'))));
  return MID(capitol(560, 1245, 0.95) + brazier(150, 1245, 0.9) + brazier(970, 1245, 0.9, { ph: 0.3 }))
    + layer(0.8, walk(cr - 0.1, 1.1, 520, mob(640, 1000, 1262, 5, { s: 0.62, seed: 4 })))
    + layer(0.9, lit(sacBull(...B2, { flip: true }), 'sTemple'))
    + clerics
    + grab(G2, 0, 1, 0) + rage(...G2, cr + 0.6, { dur: 1.6 }) + steam(...G2, cr + 0.9, { dur: 1.5 })
    + lit(castShadow(...S2, 'sTemple') + seq((op) => saturninusHD(...S2, { armL: [20, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [2.4, 0], armR: [16, 2, 3] }], [cr + 0.6, { mood: 'determined', look: [2.4, 0], armR: [30, 2, 3] }], [fl + 0.3, { mood: 'sad', look: [-2.4, 0.3], armR: [30, 2, 3] }]]), 'sTemple');
}

// 3 · SHOT "They ordered him to sacrifice it. He answered:": the priest points from the bull to the bishop; the fire burns on the altar.
//     SHOT (zoom on him, his own voice) "I know only one God, the true God. I know that your gods are demons."
//     SHOT "So they tied his feet to the bull.": a townsman walks in, kneels and binds a rope from the bull's flank to his feet.
const S3 = [280, 1345, 2.3], B3 = [660, 1300, 1.8], P3 = [780, 1272, 1.7], K3 = [500, 1322, 2.0];
function scene3() {
  const or = at(4, 'ordered'), ik = at(4, 'I know only'), dm = at(4, 'demons'), ti = at(4, 'So they tied'), fe = at(4, 'feet');
  return MID(capitol(560, 1245, 0.95) + altarFire(860, 1245, 0.8) + brazier(230, 1245, 0.9))
    + layer(0.8, mob(430, 650, 1262, 3, { s: 0.6, seed: 9 }))
    + layer(0.82, lit(castShadow(...P3, 'sTrial') + seq((op) => paganPriest(...P3, { flip: true, armL: [16, 2, 3], ...op }),
      [[0, { mood: 'stern', look: [2.4, 0.3], armR: [70, 2, 3] }], [or + 0.4, { mood: 'stern', look: [2.4, 0.2], armR: [90, 2, 3] }], [dm, { mood: 'surprised', look: [2.4, 0.2], armR: [30, 2, 3] }],
        [ti, { mood: 'stern', look: [2.4, 0.5], armR: [80, 2, 3] }]]), 'sTrial') + rage(...P3, dm + 0.4, { dur: 1.4 }))
    + layer(0.9, lit(sacBull(...B3), 'sTrial'))
    + layer(0.95, from(ti, walk(ti, 0.6, 340, lit(castShadow(...K3, 'sTrial') + seq((op) => townsman(...K3, 2, { flip: true, look: [2.4, 0.8], ...op }),
      [[0, { mood: 'stern', armL: [16, 2, 3], armR: [40, 2, 3], propR: COIL }], [ti + 0.65, { mood: 'stern', kneel: true, armL: [70, 2, 3], armR: [80, 2, 3] }]]), 'sTrial'))))
    + lit(castShadow(...S3, 'sTrial') + seq((op) => saturninusHD(...S3, { armL: [20, 2, 3], propL: CROZ, ...op }),
      [[0, { mood: 'determined', look: [2.4, 0.2], armR: [16, 2, 3] }], [ik, { mood: 'determined', look: [2.4, 0], armR: [44, 2, 3], talk: [ik, dm + 0.5] }],
        [dm + 0.6, { mood: 'determined', look: [2.4, 0], armR: [16, 2, 3] }], [fe, { mood: 'peaceful', look: [-1, 1.4], armR: [16, 2, 3] }]]), 'sTrial')
    + from(fe, rope(S3[0] + 50, S3[1] - 10, B3[0] - 96 * B3[2], B3[1] - 86 * B3[2], 40));
}

// 4 · SHOT "Then they drove it down the Capitol steps.": side view of the steps; a townsman on the landing beats the bull with a stick;
//     it plunges down the steps dragging the bishop by the feet (shake, speed lines).
//     SHOT (climax, slow) "He died before the rope snapped.": the rope snaps (a flash of light); the bull bolts away; he lies still
//     on the steps, peaceful, the halo comes up (bloodless). SHOT "It looked like the gods had won.": the priest on the landing raises his arms.
const X0 = 320, Y0 = 1010, X1 = 800, Y1 = 1340, ANG = f(Math.atan2(Y1 - Y0, X1 - X0) * 180 / Math.PI), SS = 1.15, BS = 1.5;
const DRV = [235, Y0, 1.6], PR4 = [62, Y0, 1.6];
const lyingSat = (op) => `<g transform="translate(-230,${f(-42 * SS)}) rotate(-90)">${saturninusHD(0, 0, SS, { mitred: false, armL: 150, armR: 160, ...op })}</g>`;
function scene4() {
  const dr = at(5, 'plunged'), sn = at(5, 'rope snapped'), gw = at(5, 'gods had won');
  const c = Math.cos(ANG * Math.PI / 180), s = Math.sin(ANG * Math.PI / 180), p0 = 0.4;
  const sx = X0 + (X1 - X0) * p0, sy = Y0 + (Y1 - Y0) * p0;
  const sat = seq(lyingSat, [[0, { mood: 'pain' }], [dr + 0.9, { mood: 'peaceful' }]]);
  const bullRope = sacBull(0, 0, BS, { band: true, snort: false, run: true }) + rope(-96 * BS, -84 * BS, -216, -24, 10);
  const drag = `<g transform="translate(${f(sx)},${f(sy)}) rotate(${ANG})"><g${M.tw([{ at: dr, dur: sn - dr, from: { x: 0 }, to: { x: f((X1 - sx) / c) }, ease: 'power1.in' }])}>`
    + `<g${M.bob(3, 0.35)}>${bullRope}${sat}</g></g></g>`;
  const rest = `<g transform="translate(${X1},${Y1}) rotate(${ANG})">${rope(-216, -24, -180, -40, 4)}`
    + seq(lyingSat, [[0, { mood: 'peaceful' }], [sn + 0.3, { mood: 'peaceful', halo: sn + 0.4 }]]) + '</g>';
  const bolt = `<g transform="translate(${X1},${Y1})"><g${M.tw([{ at: sn, dur: 0.15, from: { rotation: ANG }, to: { rotation: 0 }, origin: '0 0' }, { at: sn + 0.1, dur: 0.8, to: { x: 700 }, ease: 'power2.in' }])}>`
    + `${sacBull(0, 0, BS, { snort: false, run: true })}${rope(-96 * BS, -84 * BS, -130, -10, 6)}</g></g>`;
  const mx = X1 + (-180 * c - (-60) * s), my = Y1 + (-180 * s + (-60) * c);
  return lit(sideSteps(X0, Y0, X1, Y1, 9), 'sDrag')
    + lit(castShadow(...DRV, 'sDrag') + seq((op) => townsman(...DRV, 0, { look: [2.4, 1.2], armL: [16, 2, 3], propR: STICK, ...op }),
      [[0, { mood: 'stern', armR: [150, 2, 3] }], [dr + 0.1, { mood: 'stern', armR: [70, 2, 3] }], [dr + 0.5, { mood: 'stern', armR: [150, 2, 3] }]]), 'sDrag')
    + lit(castShadow(...PR4, 'sDrag') + seq((op) => paganPriest(...PR4, { look: [2.4, 0.6], armL: [16, 2, 3], ...op }),
      [[0, { mood: 'stern', armR: [16, 2, 3] }], [gw, { mood: 'stern', look: [2.4, -0.4], armL: [150, 3, 2], armR: [16, 2, 3] }]]), 'sDrag')
    + rage(...DRV, dr, { dur: 1.4 })
    + until(sn, lit(drag, 'sDrag')) + from(sn, lit(rest, 'sDrag')) + from(sn, lit(bolt, 'sDrag'))
    + lit(seq((op) => mob(860, 1070, Y1, 4, { s: 0.62, seed: 12, ...op }), [[0, { mood: 'stern' }], [sn, { mood: 'surprised', fists: false }]]), 'sDrag')
    + speedLines(f(sx + 200), f(sy - 120), { at: dr, dur: 0.8, op: 0.35 })
    + burst(f(mx), f(my), 90, sn, { color: '#fff4d8', rays: 10, sparks: 6, seed: 4 })
    + `<g opacity="0"${fadeIn(sn + 0.4, 1.2)}>${glow(387, 1020, 300, 0.45)}</g>`;
}

// 5 · SHOT "But two women buried him deep in a wooden coffin.": night; two veiled women walk to the trench where the coffin lies;
//     on "buried" the coffin sinks and the earth mound rises; they kneel. SHOT "They dragged him down to silence him.": the grave
//     and its candle. SHOT (quotable) "Now a great basilica in Toulouse bears his name.": Saint-Sernin rises behind them, glowing.
const W1 = [260, 1345, 2.2], W2 = [750, 1322, 2.0];
function scene5() {
  const bu = at(6, 'coffin'), dg = at(6, 'dragged'), ba = at(6, 'basilica');
  const woman = (P, i, d, dx, lk) => layer(d, walk(0, 1.3, dx, lit(castShadow(...P, 'sBurial') + seq((op) => tolosaWoman(...P, i, { flip: i === 1, ...op }),
    [[0, { mood: 'sad', look: [2.4, 0.8], armL: [40, 2, 3], armR: [40, 2, 3] }], [bu + 0.4, { mood: 'peaceful', kneel: true, look: [2.4, 0.8], ...PRAY }],
      [ba + 0.3, { mood: 'awe', kneel: true, look: lk, ...PRAY }]]), 'sBurial')));
  return MID(`<g${M.tw([{ at: ba, dur: 1.6, from: { y: 360, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }])}>${sernin(600, 1245, 0.9)}</g>`)
    + `<ellipse cx="520" cy="1352" rx="220" ry="30" fill="#1e1812" opacity=".75"/>`
    + `<g${M.tw([{ at: bu, dur: 1.2, from: { y: 0, opacity: 1 }, to: { y: 60, opacity: 0 }, ease: 'power1.in' }])}>${lit(woodCoffin(520, 1350, 1), 'sBurial')}</g>`
    + `<g opacity="0"${M.tw([{ at: bu + 0.5, dur: 0.9, from: { opacity: 0, scale: 0.4 }, to: { opacity: 1, scale: 1 }, origin: '520 1352' }])}>${lit(mound(520, 1352, 1.05), 'sBurial')}</g>`
    + `<g opacity="0"${fadeIn(dg - 0.2, 0.6)}><g transform="translate(520,1290)">${candle}</g></g>`
    + woman(W2, 1, 0.95, 320, [2.4, -1.6]) + woman(W1, 0, 1, -320, [-2.4, -1.6])
    + `<g opacity="0"${fadeIn(ba + 0.4, 1.2)}>${sparkles(14, 260, 940, 500, 1000, { seed: 8 })}</g>`
    + NEAR(bokeh(6, { seed: 11, sides: true, op: [0.15, 0.3] }));
}

// 6 · SHOT "His feast day is November 29.": the saint in glory before Saint-Sernin, crozier and martyr's palm, the bull calm beside him.
//     SHOT "He is the patron of Toulouse.": the basilica. SHOT "Saint Saturninus, pray for us.": he blesses us.
const S6 = [380, 1345, 2.3], B6 = [720, 1310, 1.45];
function scene6() {
  const pt = at(7, 'patron'), ss = at(7, 'Saint Saturninus');
  return MID(sernin(640, 1245, 0.95))
    + layer(0.92, lit(sacBull(...B6, { flip: true, band: false, snort: false }), 'sGlory'))
    + lit(castShadow(...S6, 'sGlory') + seq((op) => saturninusHD(...S6, { halo: true, armL: [20, 2, 3], propL: CROZ, ...op }),
      [[0, { mood: 'tender', look: [0, 0], armR: [30, 2, 3], propR: `<g transform="rotate(20)">${palm_frond(0.9, 0, 0)}</g>` }],
        [pt, { mood: 'happy', look: [2.4, -0.6], armR: [30, 2, 3], propR: `<g transform="rotate(20)">${palm_frond(0.9, 0, 0)}</g>` }],
        [ss, { mood: 'tender', look: [0, 0], armR: [118, 2, 3] }]]), 'sGlory')
    + sparkles(16, 180, 900, 420, 1150, { seed: 21 })
    + NEAR(bokeh(7, { seed: 9, sides: true, op: [0.2, 0.4] }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
const DANGER = { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } };
const GLORY = { speed: 0.95, gap: 0.32, gain: -0.5 };
const LAST = { speed: 0.9, gap: 0.34, gain: -0.5 };
export const STORY = {
  slug: SLUG, name: 'St_Saturninus_Bull_of_Toulouse',
  bg3d: './saturninus_bull.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'roma.bg3d.js': './gelasius.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { saturninus: { voice: 'im_nicola', speed: 0.92 } },
  music: { story: 'A lone bishop in Roman Toulouse refuses to sacrifice to the gods and is dragged by a bull down the temple steps; his grave becomes a great basilica.',
    color: 'low brass, war drums, wordless choir', cues: { 0: 'Dramatic open: one huge drum hit and low brass on the very first second, pounding war drums when the bull charges at 0:04, then a hushed held note under the name', 5: 'Violent: pounding war drums and a stabbing low-brass figure, then everything drops to one hushed held note', 6: 'Tender and hushed: soft wordless choir over a low string pad, slowly rising with hope', 7: 'Glory: full warm orchestra and wordless choir in a bright major key, resolving gently' } },
  thumb_hook: 'Dragged by a sacrificial bull', thumb_title: 'St. Saturninus', thumb_scene: 0, thumb_t: 0.15, thumb_shift: 0,
  wm_spots: [[56, 1300, 'l'], [1024, 480, 'r'], [1024, 1250, 'r']],
  waive: [{ from: 9.7, to: 11.6, rules: ['covered', 'buttons'], why: 'the saint walks in past the two townsmen as scene 1 opens' }],
  fix: { 'sˈæɾɚnˌɪnəs': 'sˌæɾɚnˈaɪnəs' },
  scenes: [
    { kicker: 'THE CAPITOL · TOULOUSE', title: 'Tied to the Bull', art: sceneHook, bg3d: 'sDragHook', front3d: true,
      cam: { ...GLIDE, shake: { at: at(0, 'drove', 0.05), amt: 14, dur: 0.6 }, path: [   // him bound -> the bull -> follow the drag -> his face -> the god on the roof -> the dying brazier
        shot(0, SH, 'FS', { place: 'l' }), push(at(0, 'one bishop'), SH, 'MS', { place: 'l' }),
        spot(at(0, 'sacrificial bull'), [BH[0] + 40, HY0 - 160], 130, 'MS'),
        spot(at(0, 'temple steps'), hookFace(at(0, 'temple steps')), 120, 'MS'),
        push(at(0, 'This is'), { at: hookFace(at(0, 'This is') + 0.5), r: 75 }, 'MS'),
        spot(at(0, 'gods'), [100, 250], 100, 'MS', { frame: [440, 620], dur: 1.3 }),
        spot(at(0, 'silent'), [40, HY0 - 170], 100, 'MS')] },
      tone: HOOK,
      say: ['Pagan priests tied one bishop to a sacrificial bull and drove it down the temple steps.', 'This is Saint Saturninus.',
        'It all began with gods that went silent.'] },
    { kicker: 'ROMAN GAUL · AROUND 250', title: 'First Bishop of Toulouse', art: scene1, bg3d: 'sCity', front3d: true,
      cam: { ...GLIDE, path: [   // he walks in -> on him -> crane up over the town -> the tiny church -> the townsmen by the temple
        shot(0, { x: 480, y: 1345, s: 2.3 }, 'FS'), push(at(1, 'first bishop'), S1, 'MS'), crane(at(1, 'Roman Gaul'), { x: 480, y: 1345, s: 2.3 }, 'FS', 'up'),
        spot(at(1, 'tiny church'), [170, 1110], 120, 'MS', { depth: 0.75, frame: [420, 1000] }), truck(at(1, 'Capitol'), { x: T1a[0] + 55, y: T1a[1], s: T1a[2], depth: 0.78 }, 'FS', 'c')] },
      tone: HOOK,
      say: ['He was the first bishop of Toulouse, in Roman Gaul.', 'Each day, his path to his tiny church passed the Capitol temple.'] },
    { kicker: 'AT THE CAPITOL TEMPLE', title: 'Their Gods Went Silent', art: scene0, bg3d: 'sHook', front3d: true,
      cam: { ...GLIDE, path: [   // the bishop and the priest -> on the priest's accusation -> the dying fire
        shot(0, { x: 585, y: 1345, s: 2.3 }, 'FS'), push(at(2, 'priests'), { x: 600, y: 1345, s: 2.2 }, 'FS', { zMul: 1.08 }),
        spot(at(2, 'silent'), [560, 1010], 120, 'MS', { depth: 0.75 })] },
      tone: HOOK,
      say: ['The priests claimed the sight of him struck their gods silent.'] },
    { kicker: 'THE CAPITOL TEMPLE', title: 'Seized by the Crowd', art: scene2, bg3d: 'sTemple', front3d: true,
      cam: { ...GLIDE, path: [   // wide on the temple -> the bull -> pull back as the crowd comes -> push on him -> his fleeing clergy
        shot(0, S2, 'FS'), push(at(3, 'bull'), { at: [B2[0], B2[1] - 120 * B2[2]], r: 110, depth: 0.9 }, 'MS', { frame: [760, 900] }), pull(at(3, 'furious crowd'), S2, 'FS'),
        push(at(3, 'seized'), S2, 'MS', { place: 'r' }), truck(at(3, 'His priest'), { x: 330, y: 1290, s: 1.55, depth: 0.85 }, 'FS', 'c'), pull(at(3, 'fled'), S2, 'FS')] },
      tone: STAND,
      say: ['One day, a bull stood ready for sacrifice.', 'A furious crowd seized the bishop.', 'His priest and two deacons fled.'] },
    { kicker: 'BEFORE THE ALTAR', title: 'One True God', art: scene3, bg3d: 'sTrial', front3d: true,
      cam: { ...GLIDE, path: [   // the priest orders -> the bull -> push on him for his answer, closer on "demons" -> pull back -> down to the rope
        shot(0, { x: P3[0], y: P3[1], s: P3[2], depth: 0.82 }, 'MS', { place: 'r' }), push(at(4, 'sacrifice it'), { at: [B3[0], B3[1] - 120 * B3[2]], r: 110, depth: 0.9 }, 'MS'),
        push(at(4, 'He answered'), S3, 'MCU'), push(at(4, 'demons'), S3, 'CU', { dur: 0.7 }), spot(at(4, 'So they tied'), [470, 1100], 118, 'MS', { dur: 1.5 }),
        spot(at(4, 'feet'), [S3[0] + 140, 1250], 120, 'MS', { frame: [540, 1060] })] },
      tone: STAND,
      say: ['They ordered him to sacrifice it. He answered:', { text: 'I know only one God, the true God. I know that your gods are demons.', who: 'saturninus' },
        'So they tied his feet to the bull.'] },
    { kicker: 'THE CAPITOL STEPS', title: 'Down the Steps', art: scene4, bg3d: 'sDrag', front3d: true,
      cam: { ...GLIDE, shake: { at: at(5, 'plunged', 0.05), amt: 16, dur: 0.6 }, path: [   // the driver -> follow the drag down -> on him as the rope snaps -> the priest
        shot(0, { x: DRV[0], y: DRV[1], s: DRV[2] }, 'FS', { place: 'l' }),
        ...follow(at(5, 'plunged'), at(5, 'rope snapped'), { at: [470, 1060], r: 130 }, { at: [560, 1180], r: 130 }, 'MS', { frame: [540, 1020] }),
        push(at(5, 'snapped'), { at: [387, 1020], r: 90 }, 'MS', { dur: 0.7, frame: [540, 960] }), pull(at(5, 'gods had won'), { x: PR4[0], y: PR4[1], s: PR4[2] }, 'FS', { place: 'l' })] },
      tone: DANGER,
      say: ['Then they beat the bull, and it plunged down the Capitol steps.', { text: 'He died before the rope snapped.', speed: 0.85 }, 'It looked like the gods had won.'] },
    { kicker: 'A SECRET BURIAL', title: 'Buried by Two Women', art: scene5, bg3d: 'sBurial', front3d: true, whip: 'r',
      cam: { ...GLIDE, path: [   // the two women -> down to the coffin -> the candle on the grave -> wide -> crane up to the basilica
        shot(0, W1, 'FS', { place: 'l' }), push(at(6, 'two women'), { x: 505, y: 1345, s: 2.2 }, 'FS', { zMul: 1.08 }), spot(at(6, 'coffin'), [520, 1290], 110, 'MS', { frame: [540, 1080], dur: 1.2 }),
        push(at(6, 'dragged'), { at: [520, 1240], r: 105 }, 'MS', { frame: [540, 1000] }), spot(at(6, 'silence'), [520, 1000], 118, 'MS', { dur: 1.5 }),
        crane(at(6, 'basilica'), { at: [600, 930], r: 170, depth: 0.75 }, 'MS', 'up'), push(at(6, 'name'), { at: [600, 760], r: 130, depth: 0.75 }, 'MS')] },
      tone: GLORY,
      say: ['But two women buried him deep in a wooden coffin.', 'They dragged him down to silence him.', { text: 'Now a great basilica in Toulouse bears his name.', speed: 0.95, gap: 0.32 }] },
    { kicker: 'FEAST · NOVEMBER 29', title: 'Saint Saturninus', art: scene6, bg3d: 'sGlory', front3d: true,
      cam: { ...GLIDE, path: [   // feast: the saint -> the basilica (patron of Toulouse) -> push on him for the blessing
        shot(0, S6, 'FS'), push(at(7, 'feast day'), S6, 'MS'), truck(at(7, 'patron'), { at: [640, 900], r: 170, depth: 0.75 }, 'MS', 'r'),
        pull(at(7, 'Toulouse'), S6, 'FS', { place: 'l' }), push(at(7, 'Saint Saturninus'), S6, 'MS')] },
      tone: LAST,
      say: ['His feast day is November 29.', 'He is the patron of Toulouse.', 'Saint Saturninus, pray for us.'] },
  ],
};
