// SaintStories ANIME rig (soft & dreamy / shoujo style), first used in joan_of_arc_orleans.mjs.
// Cel-shaded characters with thin soft line art: big sparkly eyes with lashes, spiky bangs, hard-edged shadows,
// mood cross-fades, talk, tears; anime Joan (armor, cape, standard; poses 'none' | 'rest' | 'raise') and a friar.
// Plus painted cel clouds, light shafts, focus lines, lens flare, sparkle stars, pastel silhouettes.
// Everything here is opt-in; art.mjs is untouched.
import { W, M, GOLD, sky, sun, rays, hill, petals, sparkles, bokeh, ground, tufts, flowers, waves,
  FAR, BACK, MID, NEAR, rng, f, uid, dark, light } from '../art.mjs';
import { fleur, chateau } from './joan_of_arc.mjs';

// ---------------------------------------------------------------- palette (soft shoujo)
export const ANIME = {
  skin: '#fee6d6', skinSh: '#f1bba6', line: '#4a2838', lw: 2.2,
  hair: '#6a4430', hairSh: '#432a1e', hairHi: '#c4946a',
  iris: ['#26286e', '#5878de', '#a6ccff', '#e2f0ff'],
  steel: '#dde3ee', steelSh: '#a3aec4', steelHi: '#ffffff', ol: '#5a4060',
  blue: '#3a5aa0', blueSh: '#27407c', cape: '#2c4488', capeSh: '#1d3068', lining: '#e9c98a',
};
let AID = 0;
const star = (x, y, r, c = '#fff', op = 1) => `<path d="M${f(x)},${f(y - r)} L${f(x + r * 0.22)},${f(y - r * 0.22)} L${f(x + r)},${f(y)} L${f(x + r * 0.22)},${f(y + r * 0.22)} L${f(x)},${f(y + r)} L${f(x - r * 0.22)},${f(y + r * 0.22)} L${f(x - r)},${f(y)} L${f(x - r * 0.22)},${f(y - r * 0.22)}Z" fill="${c}" opacity="${op}"/>`;

// ---------------------------------------------------------------- anime eye (side -1 = viewer-left, +1 = viewer-right)
function aEye(cx, cy, side, o) {
  const P = o.pal, id = uid('ir'), cl = uid('ec'), ph = o.ph;
  const sclera = 'M-31,-2 C-25,-26 12,-31 27,-12 C31,6 25,28 4,31 C-17,33 -31,18 -31,-2Z';
  const hx = side < 0 ? -6 : 6;                    // highlights stay on the light side for both eyes
  const big = o.mood === 'surprised' ? 1.28 : 1.18;
  return `<g transform="translate(${cx},${cy}) scale(${side < 0 ? big : -big},${big})"><g data-blink="${f(ph)} 0 6">`
    + `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.iris[0]}"/><stop offset=".42" stop-color="${P.iris[1]}"/>`
    + `<stop offset=".8" stop-color="${P.iris[2]}"/><stop offset="1" stop-color="${P.iris[3]}"/></linearGradient><clipPath id="${cl}"><path d="${sclera}"/></clipPath></defs>`
    + `<path d="${sclera}" fill="#fffafc"/>`
    + `<g clip-path="url(#${cl})"><ellipse cx="0" cy="5" rx="20" ry="27" fill="url(#${id})"/>`
    + `<ellipse cx="0" cy="7" rx="13" ry="19" fill="none" stroke="${P.iris[3]}" stroke-width="1.6" opacity=".45"/>`
    + `<ellipse cx="0" cy="3" rx="8" ry="12" fill="#1a1240"/>`
    + `<path d="M-34,-34 H34 V-8 Q0,-18 -34,-4Z" fill="#1c1240" opacity=".36"/>`
    + `<path d="M-15,20 Q0,33 15,20 Q0,27 -15,20Z" fill="${P.iris[3]}" opacity=".75"/>`
    + `<ellipse cx="0" cy="5" rx="20" ry="27" fill="none" stroke="${P.iris[0]}" stroke-width="2"/></g>`
    + `<ellipse cx="${hx}" cy="-8" rx="7" ry="8" fill="#fff"/>` + star(-hx * 1.1, 16, 5.5) + `<circle cx="${hx * 1.9}" cy="4" r="1.8" fill="#fff"/><circle cx="${-hx * 0.2}" cy="24" r="1.4" fill="#fff" opacity=".9"/>`
    // long upper lashes with three spikes at the outer corner, soft crease, fine lower lashes
    + `<path d="M-37,4 C-33,-23 -2,-37 27,-17 L30,-9 C10,-27 -21,-25 -31,3 Z" fill="${P.line}"/>`
    + (o.male ? '' : `<path d="M-31,1 L-48,-5 L-35,-9Z M-27,-11 L-43,-23 L-29,-17Z M-19,-20 L-29,-34 L-13,-25Z" fill="${P.line}"/>`)
    + `<path d="M-30,-16 C-20,-34 6,-40 25,-28" stroke="${P.line}" stroke-width="1.6" fill="none" opacity=".45" stroke-linecap="round"/>`
    + `<path d="M-21,27 Q2,35 21,25" stroke="${P.line}" stroke-width="1.8" fill="none" opacity=".55" stroke-linecap="round"/>${o.male ? '' : `<path d="M-21,27 L-30,33 L-17,29Z" fill="${P.line}" opacity=".6"/>`}`
    + '</g></g>';
}
const closedEye = (cx, cy, side, P) => `<g transform="translate(${cx},${cy}) scale(${side < 0 ? 1.1 : -1.1},1.1)"><path d="M-30,6 Q-2,24 26,4" stroke="${P.line}" stroke-width="4" fill="none" stroke-linecap="round"/>`
  + `<path d="M-30,6 L-42,0 M-26,12 L-36,14" stroke="${P.line}" stroke-width="3" stroke-linecap="round"/></g>`;

// ---------------------------------------------------------------- anime head (head units: face half-width 90, chin y 120)
export function aHead(o = {}) {
  const P = o.pal || ANIME, mood = o.mood || 'determined', ph = o.ph || 0, wind = o.wind ?? 1;
  const L = `stroke="${P.line}" stroke-width="${P.lw}" stroke-linejoin="round"`;
  const tips = [[-104, 0], [-90, -40], [-80, -20], [-66, -78], [-50, -42], [-34, -86], [-18, -46], [0, -84], [16, -44], [32, -86], [50, -42], [66, -78], [80, -18], [92, -40], [104, 0]];
  const cap = `M-104,0 C-116,-130 -56,-168 0,-168 C56,-168 116,-130 104,0 ` + tips.slice().reverse().map(([x, y]) => `L${x},${y}`).join(' ') + 'Z';
  const shadowBand = 'M-90,-60 ' + tips.slice(1, -1).map(([x, y]) => `L${x},${y + 16}`).join(' ') + ' L90,-60 L90,-120 L-90,-120Z';
  const lock = (sx) => `<g transform="scale(${sx},${o.male ? 0.6 : 1})"><g${M.sway(3 * wind, 1.3, ph + (sx > 0 ? 0 : 0.5), -88, -10)}><path d="M-104,-10 C-114,40 -106,92 -90,130 L-80,106 L-70,124 C-72,72 -76,22 -72,-20Z" fill="${P.hair}" ${L}/>`
    + `<path d="M-92,10 C-96,50 -92,84 -84,108" stroke="${P.hairSh}" stroke-width="3" fill="none" opacity=".6"/><path d="M-98,0 C-100,30 -98,50 -94,64" stroke="${P.hairHi}" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/></g></g>`;
  const brows = {
    determined: ['M-74,-30 Q-50,-38 -20,-25', 'M74,-30 Q50,-38 20,-25'],
    surprised: ['M-72,-44 Q-48,-58 -22,-48', 'M72,-44 Q48,-58 22,-48'],
    worried: ['M-72,-36 Q-50,-36 -22,-46', 'M72,-36 Q50,-36 22,-46'],
    sad: ['M-72,-34 Q-50,-34 -22,-46', 'M72,-34 Q50,-34 22,-46'],
  }[mood] || ['M-72,-34 Q-48,-46 -22,-38', 'M72,-34 Q48,-46 22,-38'];
  const mouth = {
    joy: `<path d="M-15,86 Q0,106 15,86 Q0,91 -15,86Z" fill="#a03a48" ${L}/><ellipse cx="0" cy="98" rx="6" ry="3.5" fill="#f08a96"/>`,
    happy: `<path d="M-13,88 Q0,99 13,88" stroke="#a84a54" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
    surprised: `<ellipse cx="0" cy="92" rx="7" ry="9" fill="#a03a48"/>`,
    peaceful: `<path d="M-10,90 Q0,96 10,90" stroke="#a84a54" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    sad: `<path d="M-11,95 Q0,88 11,95" stroke="#a84a54" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    worried: `<path d="M-12,93 q6,-4 12,0 q6,4 12,0" stroke="#a84a54" stroke-width="3" fill="none" stroke-linecap="round" transform="translate(-6,0)"/>`,
  }[mood] || `<path d="M-12,92 Q0,89 12,92" stroke="#a84a54" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const eyes = mood === 'peaceful' ? closedEye(-42, 16, -1, P) + closedEye(42, 16, 1, P)
    : aEye(-42, 16, -1, { pal: P, ph, mood, male: o.male }) + aEye(42, 16, 1, { pal: P, ph, mood, male: o.male });
  // anime tears (o.tear = fade-in time): a shiny lower lid, a streak and a drop on each cheek
  const tears = o.tear === undefined ? '' : `<g${M.in('fade', o.tear, 0.6)}>` + [-1, 1].map((sd) => `<path d="M${sd * 16},48 Q${sd * 42},56 ${sd * 66},44" stroke="#fff" stroke-width="3" fill="none" opacity=".85" stroke-linecap="round"/>`
    + `<path d="M${sd * 30},52 Q${sd * 33},74 ${sd * 37},98" stroke="#cfe6ff" stroke-width="5" fill="none" opacity=".8" stroke-linecap="round"/>`
    + `<g${M.bob(3, 1.6, sd > 0 ? 0.5 : 0)}><path d="M${sd * 37},96 q8,13 0,22 q-8,-9 0,-22Z" fill="#e8f4ff" stroke="${P.line}" stroke-width="1.2"/><circle cx="${sd * 37 - 2}" cy="108" r="2" fill="#fff"/></g>`).join('') + '</g>';
  let s = '';
  if (o.halo !== undefined && o.halo !== false) {
    const fade = typeof o.halo === 'number' ? M.in('fade', o.halo, 1.2) : '';
    s += `<g${fade}><g${M.pulse(0.03, 2.8)}><circle r="260" fill="url(#haloGlow)"/><circle r="168" fill="none" stroke="${GOLD}" stroke-width="7"/><circle r="168" fill="none" stroke="#fff6d6" stroke-width="2.5"/>`
      + star(-150, -90, 14, '#fff6d6', 0.9) + star(160, -40, 10, '#fff6d6', 0.8) + '</g></g>';
  }
  s += (o.male ? `<path d="M-108,-10 C-122,-140 -60,-178 0,-178 C60,-178 122,-140 108,-10 L106,44 L-106,44 Z" fill="${P.hairSh}" ${L}/>`
    : `<path d="M-108,-10 C-122,-140 -60,-178 0,-178 C60,-178 122,-140 108,-10 L114,96 L96,84 L86,104 L-86,104 L-96,84 L-114,96 Z" fill="${P.hairSh}" ${L}/>`)
    + `<path d="M-26,90 L-28,210 L28,210 L26,90Z" fill="${P.skin}" ${L}/><path d="M-28,96 Q0,150 28,96 L28,146 Q0,176 -28,146Z" fill="${P.skinSh}"/>`
    + `<path d="M-90,-40 C-92,34 -64,90 -24,114 Q0,128 24,114 C64,90 92,34 90,-40 C88,-130 -88,-130 -90,-40Z" fill="${P.skin}" ${L}/>`
    + `<path d="M56,-80 C84,-20 88,40 66,84 Q48,104 26,114 Q62,60 62,-20 Q62,-56 56,-80Z" fill="${P.skinSh}" opacity=".6"/>`
    + `<path d="${shadowBand}" fill="${P.skinSh}" opacity=".75"/>`
    + [-1, 1].map((sd) => o.male ? `<ellipse cx="${sd * 60}" cy="66" rx="24" ry="10" fill="#ff9aa8" opacity=".14"/>` : `<ellipse cx="${sd * 60}" cy="66" rx="24" ry="12" fill="#ff9aa8" opacity=".28"/><path d="M${sd * 60 - 11},71 l5,-10 M${sd * 60 - 3},71 l5,-10 M${sd * 60 + 5},71 l5,-10" stroke="#f07a8a" stroke-width="1.6" opacity=".5" stroke-linecap="round"/>`).join('')
    + eyes + tears
    + `<path d="M5,56 L1,64" stroke="${P.skinSh}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="-3" cy="58" r="2" fill="#fff" opacity=".7"/>`
    + (o.talk ? `<g data-talk="${o.talk[0]} ${o.talk[1]} 0 92"><ellipse cx="0" cy="92" rx="8" ry="7" fill="#a03a48"/><ellipse cx="0" cy="96" rx="4.5" ry="2.4" fill="#f08a96"/></g>` : mouth)
    + lock(1) + lock(-1)
    + `<g${M.sway(1.2 * wind, 1.6, ph + 0.4, 0, -150)}><path d="${cap}" fill="${P.hair}" ${L}/>`
    + `<path d="M40,-160 C90,-140 112,-80 104,0 L92,-40 L80,-18 L66,-78 L50,-42 Q72,-104 40,-160Z" fill="${P.hairSh}" opacity=".5"/>`
    // soft angel-ring shine + glints
    + `<path d="M-80,-114 Q-30,-146 34,-142 L24,-127 L13,-137 L0,-121 L-14,-137 L-28,-119 L-43,-133 L-60,-108 Z" fill="${P.hairHi}" opacity=".85"/>`
    + `<ellipse cx="-40" cy="-130" rx="9" ry="3.5" fill="#fff" opacity=".7" transform="rotate(-14 -40 -130)"/><ellipse cx="14" cy="-138" rx="6" ry="2.5" fill="#fff" opacity=".6"/>`
    + `<path d="M-30,-86 L-24,-120 M2,-84 L4,-122 M30,-86 L26,-120 M-60,-80 L-50,-110" stroke="${P.hairSh}" stroke-width="2.4" opacity=".45" stroke-linecap="round"/>`
    + (o.rim ? `<path d="M52,-160 C100,-136 118,-76 108,-6" stroke="${o.rim}" stroke-width="5" fill="none" opacity=".85" stroke-linecap="round"/>` : '')
    + `</g><g${M.sway(6 * wind, 1.2, ph, 0, -166)}><path d="M-6,-166 Q8,-216 48,-208 Q18,-196 8,-164Z" fill="${P.hair}" ${L}/></g>`
    + `<path d="${brows[0]}" stroke="${P.hairSh}" stroke-width="${o.male ? 6 : 4}" fill="none" stroke-linecap="round"/><path d="${brows[1]}" stroke="${P.hairSh}" stroke-width="${o.male ? 6 : 4}" fill="none" stroke-linecap="round"/>`;
  return s;
}

// ---------------------------------------------------------------- armor arm segment + gloved (gauntlet) hand
function seg([ax, ay], [bx, by], w0, w1, P) {
  const dx = bx - ax, dy = by - ay, Ln = Math.hypot(dx, dy), nx = -dy / Ln, ny = dx / Ln;
  const p = (x, y, w) => `${f(x + nx * w)},${f(y + ny * w)}`;
  const at = (t, w) => p(ax + dx * t, ay + dy * t, w * (w0 + (w1 - w0) * t) / 2);
  return `<path d="M${p(ax, ay, w0 / 2)} L${p(bx, by, w1 / 2)} L${p(bx, by, -w1 / 2)} L${p(ax, ay, -w0 / 2)}Z" fill="${P.steel}" stroke="${P.ol}" stroke-width="2.6" stroke-linejoin="round"/>`
    + `<path d="M${p(ax, ay, 0)} L${p(bx, by, 0)} L${p(bx, by, -w1 / 2)} L${p(ax, ay, -w0 / 2)}Z" fill="${P.steelSh}" opacity=".75"/>`
    + `<path d="M${at(0.12, 0.55)} L${at(0.88, 0.55)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>`
    + [0.38, 0.66].map((t) => `<path d="M${at(t, 1)} L${at(t, -1)}" stroke="${P.ol}" stroke-width="1.8" opacity=".55"/>`).join('');
}
const couter = (x, y, P) => `<circle cx="${x}" cy="${y}" r="21" fill="#eef2f8" stroke="${P.ol}" stroke-width="2.6"/><circle cx="${x + 5}" cy="${y + 4}" r="11" fill="${P.steelSh}" opacity=".6"/><circle cx="${x - 7}" cy="${y - 7}" r="4" fill="#fff"/>`;
// Gauntlet fist closed around a vertical grip (pole / sword grip); ang tilts it with the grip
export function fist(x, y, ang = 0, P = ANIME, flip = false) {
  const fingers = [0, 1, 2, 3].map((i) => `<rect x="-20" y="${-17 + i * 9.5}" width="36" height="9.5" rx="4.7" fill="${i % 2 ? '#e8edf5' : P.steel}" stroke="${P.ol}" stroke-width="1.8"/>`).join('');
  return `<g transform="translate(${x},${y}) rotate(${ang}) scale(${flip ? -1 : 1},1)"><rect x="-6" y="-24" width="34" height="48" rx="13" fill="${P.steelSh}" stroke="${P.ol}" stroke-width="2.4"/>`
    + `<rect x="-22" y="-19" width="12" height="40" rx="6" fill="${P.steelSh}"/>${fingers}`
    + `<ellipse cx="-16" cy="-15" rx="8" ry="12" fill="${P.steel}" stroke="${P.ol}" stroke-width="2" transform="rotate(-30 -16 -15)"/><path d="M-12,-14 h22" stroke="#fff" stroke-width="2.4" opacity=".8" stroke-linecap="round"/></g>`;
}

// ---------------------------------------------------------------- Joan's standard, swallow-tailed, streaming in the wind
const flag = (P, wind = 1) => `<g${M.sway(3.5 * wind, 1.1, 0, 0, 0)}><path d="M0,0 C70,-26 160,22 260,-6 L222,104 L262,206 C160,232 80,190 0,222Z" fill="#fdf9f1" stroke="${P.ol}" stroke-width="2.4" stroke-linejoin="round"/>`
  + `<path d="M140,8 C190,16 226,8 260,-6 L222,104 L262,206 C220,214 180,208 150,204 C168,140 160,60 140,8Z" fill="#e4dcd2"/>`
  + `<path d="M76,8 C90,80 86,150 72,210" stroke="#ece4da" stroke-width="10" fill="none"/>`
  + fleur(52, 70, 1.25) + fleur(178, 60, 1.25) + fleur(118, 152, 1.25)
  + `<rect x="0" y="0" width="10" height="222" fill="${P.blue}"/></g>`;

// ---------------------------------------------------------------- anime Joan, full figure (feet at 0, ~1000 units tall at s = 1)
// o: mood, mood2: [mood, at] (cross-fade the face), pose: 'none' | 'rest' | 'raise', halo, rim, wind
export function animeJoan(x, y, s, o = {}) {
  const P = o.pal || ANIME, n = ++AID, ph = (n * 0.618) % 1, wind = o.wind ?? 1, pose = o.pose || 'rest';
  const OL = `stroke="${P.ol}" stroke-width="2.8" stroke-linejoin="round"`;
  const leg = (sd) => `<g transform="scale(${sd},1)"><path d="M20,-320 L70,-320 L86,-24 L30,-24Z" fill="${P.steel}" ${OL}/><path d="M52,-318 L70,-320 L86,-24 L62,-24Z" fill="${P.steelSh}"/>`
    + `<path d="M36,-300 L42,-60" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round"/>`
    + `<ellipse cx="50" cy="-196" rx="30" ry="24" fill="#eef2f8" ${OL}/><path d="M62,-214 A30 24 0 0 1 62 -178" stroke="${P.steelSh}" stroke-width="6" fill="none"/>`
    + `<path d="M22,-26 L90,-26 L106,0 L18,0Z" fill="#8c96ac" ${OL}/></g>`;
  const pauldron = (sd) => `<g transform="scale(${sd},1)"><ellipse cx="108" cy="-708" rx="52" ry="42" fill="#e6ebf3" ${OL}/><path d="M108,-750 A52 42 0 0 1 156 -690 Q130 -676 108 -680Z" fill="${P.steelSh}"/>`
    + `<path d="M64,-690 Q108,-664 154,-690" stroke="${P.ol}" stroke-width="2" fill="none" opacity=".6"/><path d="M78,-728 Q96,-746 120,-744" stroke="#fff" stroke-width="5" fill="none" opacity=".9" stroke-linecap="round"/>`
    + `<path d="M150,-694 Q160,-670 150,-648 Q126,-640 104,-650" fill="#e6ebf3" ${OL}/></g>`;
  // sword at rest in its scabbard, left hand on the grip
  const sword = `<g transform="translate(-116,-470) rotate(8)"><rect x="-10" y="4" width="20" height="400" rx="6" fill="#5a3e2e" ${OL}/><rect x="2" y="6" width="7" height="396" fill="#3e2a20"/>`
    + `<rect x="-12" y="370" width="24" height="36" rx="4" fill="${GOLD}" ${OL}/><rect x="-38" y="-8" width="76" height="13" rx="6" fill="${GOLD}" ${OL}/><rect x="-6" y="-62" width="12" height="56" rx="4" fill="#7a5436"/><circle cx="0" cy="-68" r="11" fill="${GOLD}" ${OL}/></g>`;
  // the standard: vertical at the side ('rest') or raised and leaning ('raise')
  let pole = '', R;
  if (pose === 'raise') {
    const B = [176, -400], H = [232, -925], T = [255, -1140], lean = 6.1;
    pole = `<path d="M${B[0]},${B[1]} L${T[0]},${T[1]}" stroke="${P.ol}" stroke-width="15" stroke-linecap="round"/><path d="M${B[0]},${B[1]} L${T[0]},${T[1]}" stroke="#9a6e3e" stroke-width="10" stroke-linecap="round"/>`
      + `<g transform="translate(${T[0]},${T[1]}) rotate(${lean})">${flag(P, wind)}</g><circle cx="${T[0]}" cy="${T[1] - 8}" r="12" fill="${GOLD}" ${OL}/>` + star(T[0], T[1] - 8, 26, '#fff8dc', 0.9);
    R = { S: [112, -700], E: [196, -795], H, ang: lean };
  } else if (pose === 'rest') {
    pole = `<rect x="199" y="-1086" width="12" height="1116" rx="5" fill="#9a6e3e" ${OL}/><circle cx="205" cy="-1094" r="13" fill="${GOLD}" ${OL}/>`
      + `<g transform="translate(211,-1070)">${flag(P, wind)}</g>`;
    R = { S: [112, -700], E: [176, -585], H: [205, -660], ang: 0 };
  } else {
    R = { S: [112, -700], E: [150, -575], H: [130, -478], ang: 0 };
  }
  const Lf = { S: [-112, -700], E: [-152, -580], H: [-116, -512] };
  const hk = o.head || 0.68, hy = f(-709 - 210 * hk);   // head scale (bigger = cuter), neck stays on the gorget
  const head = (mood, extra = '') => `<g${extra}><g transform="translate(0,${hy}) scale(${hk})">${aHead({ pal: P, mood, ph, halo: o.halo, rim: o.rim, wind, talk: mood === o.mood ? o.talk : undefined, tear: mood === 'sad' ? o.tear : undefined })}</g></g>`;
  let heads = head(o.mood);
  if (o.mood2) {
    const [m2, at] = o.mood2;
    heads = head(o.mood, M.tw([{ at, dur: 0.45, from: { opacity: 1 }, to: { opacity: 0 } }]))
      + head(m2, ` opacity="0"${M.tw([{ at, dur: 0.45, from: { opacity: 0 }, to: { opacity: 1 } }])}`);
  }
  if (o.tilt) {   // [at, deg]: a small head tilt (e.g. with the smile)
    const [at, deg] = o.tilt;
    heads = `<g${M.tw([{ at, dur: 0.7, from: { rotation: 0 }, to: { rotation: deg }, ease: 'sine.inOut', origin: '0 -740' }])}>${heads}</g>`;
  }
  // o.raiseAt: the standard swings up from the shoulder at that time (pole and right arm turn together)
  const swing = (svg) => (o.raiseAt === undefined ? svg
    : `<g${M.tw([{ at: o.raiseAt, dur: 0.75, from: { rotation: 24 }, to: { rotation: 0 }, ease: 'back.out(1.4)', origin: '112 -700' }])}>${svg}</g>`);
  const g = [`<g transform="translate(${f(x)},${f(y)}) scale(${f(s)})">`, `<ellipse cx="0" cy="4" rx="150" ry="22" fill="#3a2040" opacity=".22" filter="url(#soft)"/>`,
    `<g${M.bob(3, 2.4 + ph, ph)}>`];
  // cape: two layers whipping to the right, gold lining showing
  g.push(`<g${M.sway(2.4 * wind, 1.5, ph, 0, -735)}><path d="M-100,-735 C-170,-520 -176,-260 -150,-40 Q-20,-10 120,-60 Q230,-30 340,-130 Q300,-210 330,-310 C270,-470 214,-610 100,-735Z" fill="${P.lining}" ${OL}/></g>`
    + `<g${M.sway(3 * wind, 1.2, ph + 0.3, 0, -735)}><path d="M-100,-735 C-168,-520 -170,-270 -142,-70 Q-10,-40 110,-90 Q210,-70 300,-160 Q262,-240 290,-330 C240,-480 200,-610 100,-735Z" fill="${P.cape}" ${OL}/>`
    + `<path d="M40,-735 C140,-570 190,-360 300,-160 Q220,-90 140,-86 C160,-320 120,-560 40,-735Z" fill="${P.capeSh}"/></g>`);
  g.push(swing(pole));
  g.push(leg(-1) + leg(1));
  g.push(`<path d="M-104,-560 L104,-560 L124,-300 Q0,-280 -124,-300Z" fill="${P.blue}" ${OL}/><path d="M30,-560 L104,-560 L124,-300 Q80,-292 46,-288Z" fill="${P.blueSh}"/>`
    + `<path d="M-124,-302 Q0,-280 124,-302" stroke="${GOLD}" stroke-width="8" fill="none"/>${fleur(0, -420, 2.2)}`);
  g.push(sword);
  g.push(`<path d="M-96,-722 Q0,-748 96,-722 L104,-560 Q0,-540 -104,-560Z" fill="${P.steel}" ${OL}/>`
    + `<path d="M18,-744 Q64,-738 96,-722 L104,-560 Q60,-550 26,-546 Q40,-640 18,-744Z" fill="${P.steelSh}"/>`
    + `<path d="M0,-740 V-550" stroke="${P.steelSh}" stroke-width="3"/><path d="M-64,-704 Q-76,-640 -60,-582" stroke="#fff" stroke-width="8" fill="none" opacity=".9" stroke-linecap="round"/>`
    + star(-56, -690, 16, '#fff', 0.9)
    + `<path d="M-106,-570 H106 V-548 H-106Z" fill="#7a5436" ${OL}/><rect x="-14" y="-574" width="28" height="30" rx="4" fill="${GOLD}" ${OL}/>`);
  // arms: plated upper arm + vambrace, couter at the elbow, gauntlet fists
  g.push(seg(Lf.S, Lf.E, 40, 34, P) + seg(Lf.E, Lf.H, 36, 30, P) + couter(Lf.E[0], Lf.E[1], P) + fist(Lf.H[0], Lf.H[1], 8, P, true));
  g.push(swing(seg(R.S, R.E, 40, 34, P) + seg(R.E, R.H, 36, 30, P) + couter(R.E[0], R.E[1], P) + fist(R.H[0], R.H[1], R.ang, P)));
  g.push(pauldron(-1) + pauldron(1));
  g.push(heads);
  g.push(`<path d="M-60,-748 Q0,-722 60,-748 L70,-714 Q0,-688 -70,-714Z" fill="#cdd5e2" ${OL}/><path d="M-56,-744 Q0,-720 56,-744" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`);
  g.push('</g></g>');
  return g.join('');
}

// ---------------------------------------------------------------- painted cel clouds, light shafts, focus lines
export function pCloud(x, y, s = 1, { lit = '#fff4ec', mid = '#f6c8d0', sh = '#b88ab8', glow = '#fff2dc', drift = 30 } = {}) {
  const puffs = [[-180, 4, 66], [-104, -22, 90], [-4, -48, 118], [104, -16, 92], [182, 6, 62], [-52, -138, 82], [52, -152, 76], [0, -230, 66], [-120, -86, 56], [130, -92, 54]];
  const lay = (fill, k, ox, oy) => puffs.map(([px, py, r]) => `<circle cx="${f(px + r * ox)}" cy="${f(py + r * oy)}" r="${f(r * k)}" fill="${fill}"/>`).join('');
  return `<g${M.drift(drift)}><g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-90" rx="300" ry="230" fill="${glow}" opacity=".3" filter="url(#blur14)"/>`
    + lay(sh, 1, 0, 0) + `<rect x="-246" y="0" width="492" height="66" rx="30" fill="${sh}"/>`
    + lay(mid, 0.86, -0.1, -0.12) + lay(lit, 0.66, -0.2, -0.28)
    + puffs.slice(2, 8).map(([px, py, r]) => `<path d="M${f(px - r * 0.6)},${f(py - r * 0.5)} Q${f(px - r * 0.2)},${f(py - r * 0.95)} ${f(px + r * 0.3)},${f(py - r * 0.8)}" stroke="#fff" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/>`).join('')
    + '</g></g>';
}
export function shafts(x, { n = 4, op = 0.22, seed = 2, color = '#fff2d8' } = {}) {   // slanted light shafts from the upper left
  const r = rng(seed); let s = `<g opacity="${op}" filter="url(#blur14)">`;
  for (let i = 0; i < n; i++) {
    const x0 = x + i * 150 + r() * 60, w = 40 + r() * 70;
    s += `<path d="M${f(x0)},-200 L${f(x0 + w)},-200 L${f(x0 + w + 520)},1500 L${f(x0 + 380)},1500Z" fill="${color}"${M.flick(3 + r() * 2, r() * 3, 0.55)}/>`;
  }
  return s + '</g>';
}
export function focusLines(cx, cy, n = 40, { r0 = 470, r1 = 1500, color = '#fff6dc', op = 0.3, seed = 4 } = {}) {
  const r = rng(seed); let s = `<g opacity="${op}">`;
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, w = 0.004 + r() * 0.01, rr = r0 + r() * 160;
    s += `<path d="M${f(cx + rr * Math.cos(a))},${f(cy + rr * Math.sin(a))} L${f(cx + r1 * Math.cos(a - w))},${f(cy + r1 * Math.sin(a - w))} L${f(cx + r1 * Math.cos(a + w))},${f(cy + r1 * Math.sin(a + w))}Z" fill="${color}"${M.flick(0.5 + r() * 0.6, r(), 0.35)}/>`;
  }
  return s + '</g>';
}
export const windStreaks = (n, seed) => {
  const r = rng(seed); let s = '';
  for (let i = 0; i < n; i++) {
    const Ln = 70 + r() * 110, x = r() < 0.5 ? 10 + r() * 150 : 820 + r() * 200, y = 380 + r() * 900;
    s += `<g${M.drift(90, 0)}><path d="M${f(x)},${f(y)} h${f(Ln)}" stroke="#ffffff" stroke-width="${f(2 + r() * 2)}" stroke-linecap="round" opacity=".5"${M.flick(1.2 + r(), r() * 2, 0)}/></g>`;
  }
  return s;
};
export const sparkleStars = (n, seed, { x0 = 40, x1 = W - 40, y0 = 360, y1 = 1300 } = {}) => {
  const r = rng(seed); let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0);
    s += `<g${M.flick(1.2 + r() * 1.6, r() * 2, 0)}>${star(x, y, 7 + r() * 12, '#fffaf0', 0.9)}</g>`;
  }
  return s;
};

// Orléans on the Loire: walls, towers, a stone bridge, river with glints
export function orleans(y) {
  const wall = '#e6cfc4', roof = '#8a6aa8';
  return `<g transform="translate(0,${y})">`
    + waves(60, 5, 300, 7, '#b8c8f0', { foam: '#ffffff', op: 0.95 }) + waves(80, 4, 240, 5, '#a2b4e6', { phase: 1.3 })
    + `</g>`
    + chateau(700, y + 40, 0.62, { wall, roof, shade: 0.22 }) + chateau(1040, y + 46, 0.4, { wall, roof, shade: 0.22 })
    + `<rect x="-60" y="${y - 40}" width="${W + 120}" height="84" fill="${dark(wall, 0.06)}"/>`
    + Array.from({ length: 30 }, (_, i) => `<rect x="${-60 + i * 42}" y="${y - 54}" width="24" height="16" fill="${dark(wall, 0.06)}"/>`).join('')
    + `<path d="M-60,${y + 44} H${W + 60} V${y + 96} H-60Z" fill="${dark(wall, 0.18)}"/>`
    + Array.from({ length: 9 }, (_, i) => `<path d="M${-30 + i * 130},${y + 96} v-26 a40 40 0 0 1 80 0 v26Z" fill="#a2b4e6"/>`).join('')
    + sparkles(10, 0, W, y + 110, y + 160, { seed: 31, size: 0.8 });
}
// Soft lens flare: a glow at the light source and ghost discs along a line away from it (pulsing, never sweeping)
export function flare(x, y, dx, dy, { seed = 3 } = {}) {
  const r = rng(seed);
  return `<g opacity=".9"><circle cx="${x}" cy="${y}" r="70" fill="url(#sunGlow)"${M.pulse(0.08, 2.4, 0, x, y)}/>`
    + [[0.35, 18], [0.6, 34], [0.85, 14], [1.15, 56], [1.4, 24]].map(([t, rr], i) => `<circle cx="${f(x + dx * t)}" cy="${f(y + dy * t)}" r="${rr}" fill="${['#fff2e0', '#ffd8e8', '#e0e8ff'][i % 3]}" opacity="${f(0.12 + r() * 0.1)}"`
      + ` stroke="#fff" stroke-opacity=".25" stroke-width="2"${M.flick(2.6 + r() * 1.5, r() * 2, 0.5)}/>`).join('') + '</g>';
}
// Joan's army: far row of silhouettes, near row of helmeted soldiers with pennants (held, never fighting); n = how many in the near row
export function army(y, n = 10, nFar = 16) {
  const far = Array.from({ length: nFar }, (_, i) => `<g transform="translate(${20 + i * 66},${y - 50 + (i % 2) * 6})" fill="#9a86b8"><circle cy="-50" r="12"/><path d="M-16,0 Q-16,-36 0,-38 Q16,-36 16,0Z"/></g>`).join('');
  const near = Array.from({ length: n }, (_, i) => {
    const x = 40 + i * 112 + (i % 2) * 16, yy = y + (i % 3) * 10, c = i % 2 ? '#6a5a92' : '#5e5088';
    const pen = i % 3 === 1 ? `<rect x="24" y="-230" width="6" height="230" fill="#4a3e66"/><g transform="translate(30,-228)"><g${M.sway(7, 1.1, i * 0.2)}><path d="M0,0 L74,12 L0,30Z" fill="${i % 2 ? '#fdf9f1' : '#3a5aa0'}"/></g></g>` : '';
    return `<g transform="translate(${x},${yy})"><g${M.bob(3, 1.6 + (i % 4) * 0.2, i * 0.3)}>${pen}<path d="M-30,0 Q-32,-72 0,-76 Q32,-72 30,0Z" fill="${c}"/>`
      + `<circle cx="0" cy="-94" r="22" fill="${c}"/><path d="M-30,-98 Q0,-136 30,-98 Q0,-108 -30,-98Z" fill="${light(c, 0.25)}"/><path d="M-30,-60 Q0,-70 30,-60" stroke="${light(c, 0.3)}" stroke-width="4" fill="none"/></g></g>`;
  }).join('');
  return far + near;
}


// ---------------------------------------------------------------- anime friar (black habit with hood, hands folded) feet at 0
export const FRIAR = { ...ANIME, hair: '#4a3426', hairSh: '#2e2018', hairHi: '#8a6a50', iris: ['#3a2418', '#7a4e2e', '#c49a6a', '#efd8b8'],
  skin: '#f8dcc8', skinSh: '#e2ae98', habit: '#2e2a3a', habitSh: '#1c1a26', habitHi: '#4a4560' };
export function animeFriar(x, y, s, o = {}) {
  const P = o.pal || FRIAR, ph = ((++AID) * 0.618) % 1;
  const OL = `stroke="${P.ol}" stroke-width="2.8" stroke-linejoin="round"`;
  const head = (mood, extra = '') => `<g${extra}><g transform="translate(0,-852) scale(.68)">${aHead({ pal: P, mood, ph, male: true, wind: 0.4, talk: o.talk })}</g></g>`;
  let heads = head(o.mood || 'peaceful');
  if (o.mood2) {
    const [m2, at] = o.mood2;
    heads = head(o.mood || 'peaceful', M.tw([{ at, dur: 0.45, from: { opacity: 1 }, to: { opacity: 0 } }])) + head(m2, ` opacity="0"${M.tw([{ at, dur: 0.45, from: { opacity: 0 }, to: { opacity: 1 } }])}`);
  }
  return `<g transform="translate(${f(x)},${f(y)}) scale(${f(o.flip ? -s : s)},${f(s)})"><ellipse cx="0" cy="4" rx="160" ry="22" fill="#3a2040" opacity=".22" filter="url(#soft)"/><g${M.bob(2.5, 2.7 + ph, ph)}>`
    + `<path d="M-100,-725 Q0,-752 100,-725 L156,-6 Q0,14 -156,-6Z" fill="${P.habit}" ${OL}/>`
    + `<path d="M20,-748 Q70,-740 100,-725 L156,-6 Q100,4 50,6 Q70,-360 20,-748Z" fill="${P.habitSh}" opacity=".8"/>`
    + `<path d="M-60,-700 Q-80,-400 -96,-30 M-20,-420 Q-24,-200 -34,-10" stroke="${P.habitHi}" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`
    + `<path d="M-106,-470 Q0,-450 106,-470 L108,-446 Q0,-426 -108,-446Z" fill="#3a2a22" ${OL}/><path d="M-10,-450 L-14,-300 M8,-450 L10,-320" stroke="#3a2a22" stroke-width="7" stroke-linecap="round"/>`
    // folded hands in wide sleeves
    + `<path d="M-108,-700 Q-150,-560 -70,-520 L70,-520 Q150,-560 108,-700 Q60,-640 0,-600 Q-60,-640 -108,-700Z" fill="${P.habit}" ${OL}/>`
    + `<path d="M-70,-560 Q0,-540 70,-560 L66,-516 Q0,-500 -66,-516Z" fill="${P.habitSh}" ${OL}/>`
    + `<ellipse cx="-14" cy="-546" rx="24" ry="16" fill="${P.skin}" ${OL}/><ellipse cx="14" cy="-548" rx="24" ry="16" fill="${P.skin}" ${OL}/>`
    + heads
    // the hood lies folded around the neck as a soft cowl
    + `<path d="M-102,-738 Q-122,-690 -88,-656 Q0,-624 88,-656 Q122,-690 102,-738 Q60,-706 0,-704 Q-60,-706 -102,-738Z" fill="${P.habitSh}" ${OL}/>`
    + `<path d="M-80,-690 Q0,-662 80,-690" stroke="${P.habitHi}" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`
    + '</g></g>';
}

// ---------------------------------------------------------------- pastel back-lit people (crowds, soldiers): arms up when cheering
export function crowdSil(y, n, { x0 = 30, x1 = 1050, color = '#7a6aa8', seed = 3, cheer = true, flowers = false, s = 1, pennants = [] } = {}) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + (i + 0.5) * (x1 - x0) / n + (r() - 0.5) * 30, yy = y + (r() - 0.5) * 24, k = s * (0.85 + r() * 0.3), c = i % 2 ? color : dark(color, 0.08);
    const up = cheer && r() < 0.6, side = r() < 0.5 ? -1 : 1;
    const arm = up ? `<g${M.sway(10, 0.9 + r() * 0.5, r() * 2, side * 22, -64)}><path d="M${side * 22},-64 L${side * 40},-136" stroke="${c}" stroke-width="13" stroke-linecap="round"/>`
      + (flowers ? `<circle cx="${side * 42}" cy="-142" r="9" fill="${['#ffc4d6', '#fff0a8', '#ffffff'][i % 3]}"/>` : '') + '</g>' : '';
    const pen = pennants.length && i % 3 === 1 ? `<rect x="24" y="-210" width="6" height="210" fill="${dark(c, 0.15)}"/><g transform="translate(30,-208)"><g${M.sway(7, 1.1, i * 0.2)}><path d="M0,0 L70,12 L0,28Z" fill="${pennants[i % pennants.length]}"/></g></g>` : '';
    out += `<g transform="translate(${f(x)},${f(yy)}) scale(${f(k)})"><g${M.bob(cheer ? 6 : 2, 0.8 + r() * 0.6, r() * 2)}>${pen}${arm}<path d="M-30,0 Q-32,-72 0,-76 Q32,-72 30,0Z" fill="${c}"/><circle cx="0" cy="-94" r="22" fill="${c}"/>`
      + `<path d="M-26,-70 Q0,-80 26,-70" stroke="${light(c, 0.25)}" stroke-width="4" fill="none"/></g></g>`;
  }
  return out;
}
