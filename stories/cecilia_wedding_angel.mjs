// One story: St. Cecilia and the angel of her wedding night (from her Acts, a 5th-century legend retold in the Golden Legend).
// New (exported for later reels): Cecilia (white tunic, red palla, flame-orange bridal veil, crown of roses and lilies),
// Valerian and Tiburtius (Roman tunics with toga), old bishop Urban, angel with bright flame-tipped wings, portative organ,
// lyre, tambourine, floating music notes, Roman house interior (Pompeian red panels, columns, oil lamps, garlands,
// curtains, arched window), Appian Way (paved road, aqueduct, umbrella pines, round tomb, milestone),
// Santa Cecilia in Trastevere (portico and Romanesque bell tower).
import { W, M, SKIN, GOLD, sky, sun, rays, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, butterflies, person, palm_frond, ground, dark, light, mix, bokeh, rng, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { mantleBack, mantleFront, romeSkyline, followers } from './peter.mjs';
import { cypress } from './nicholas.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];
const MORN = [[0, '#b8603e'], [0.3, '#f0a46a'], [0.64, '#fbd9a0'], [1, '#fde6c0']];
const ROOM = [[0, '#24161c'], [0.22, '#4a2a26'], [1, '#6a4030']];
const ROOMN = [[0, '#141428'], [0.22, '#2a2240'], [1, '#3a2c44']];

// Line starts (s from scene start, from work/<slug>/timings.json + ~0.5 s lead-in)
const T = { s0b: 6.9, s1b: 7.1, s3b: 5.1, s4b: 6.4, s5b: 5.6, s6b: 4.9, s6c: 8.2 };

// ---------------------------------------------------------------- characters
export const SKC = SKIN.priest, HAIRC = '#4a2e1e', TUNIC = '#f4ede0', PALLA = '#b8323e', VEIL = '#ee7a3a';
const girdle = `<path d="M-38 -124 Q0 -114 38 -124" stroke="${GOLD}" stroke-width="5" fill="none"/>`;
const veilBack = `<path d="M-48 -292 Q-84 -200 -76 -112 L76 -112 Q84 -200 48 -292 Q0 -322 -48 -292Z" fill="${VEIL}" opacity=".9"/>`
  + `<path d="M30 -300 Q76 -210 76 -112 L56 -112 Q60 -200 24 -296Z" fill="${dark(VEIL, 0.25)}" opacity=".6"/>`;
const veilTop = `<path d="M-47 -258 Q-50 -314 0 -316 Q50 -314 47 -258 Q42 -292 0 -294 Q-42 -292 -47 -258Z" fill="${VEIL}"/>`
  + `<path d="M-47 -262 Q-54 -228 -48 -196 L-41 -198 Q-45 -230 -41 -262Z M47 -262 Q54 -228 48 -196 L41 -198 Q45 -230 41 -262Z" fill="${VEIL}"/>`
  + `<path d="M-30 -304 Q0 -312 28 -304" stroke="${light(VEIL, 0.35)}" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`;

// Crown of roses and lilies (body space: sits on the head). wreathProp: the same held in a hand, glowing.
export function wreathAt(cy = -284, sc = 1) {
  const fl = (x, y, i, back) => i % 2
    ? `<g transform="translate(${f(x)},${f(y)})"><circle r="${back ? 5 : 7}" fill="${back ? '#8a2430' : '#c8323a'}"/><circle r="${back ? 2.4 : 3.4}" fill="${back ? '#b8404a' : '#ec6a78'}"/></g>`
    : `<g transform="translate(${f(x)},${f(y)}) scale(${back ? 0.7 : 1})"><path d="M0 -8 L2.6 -2.6 L8 0 L2.6 2.6 L0 8 L-2.6 2.6 L-8 0 L-2.6 -2.6Z" fill="${back ? '#d8d2c4' : '#fffaf0'}"/><circle r="2.2" fill="${GOLD}"/></g>`;
  let b = '', fr = '', lv = '';
  for (let i = 0; i < 5; i++) { const a = Math.PI * (1.12 + i * 0.19); b += fl(44 * Math.cos(a), 13 * Math.sin(a), i, true); }
  for (let i = 0; i < 9; i++) {
    const a = Math.PI * (0.02 + i * 0.12), x = 45 * Math.cos(a), y = 13 * Math.sin(a);
    lv += `<ellipse cx="${f(x + 5)}" cy="${f(y + 2)}" rx="7" ry="3.5" fill="#4f9446" transform="rotate(${f(-20 + i * 6)} ${f(x + 5)} ${f(y + 2)})"/>`;
    fr += fl(x, y, i, false);
  }
  return `<g transform="translate(0,${cy}) scale(${sc})">${b}<ellipse rx="44" ry="13" fill="none" stroke="#3f7d3a" stroke-width="8"/>${lv}${fr}</g>`;
}
export const wreath = wreathAt();
export const wreathProp = (s = 1) => `<g transform="scale(${s})"><circle r="56" fill="url(#haloGlow)" opacity=".85"/>${wreathAt(0, 1)}</g>`;

export const cecilia = (x, y, s, { bride = false, crown = false, under = '', over = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, girl: true, top: TUNIC, skin: SKC, hair: HAIRC, beard: null, ...o,
  under: (bride ? veilBack : '') + (o.kneel ? '' : mantleBack(PALLA)) + under,
  over: (o.kneel ? '' : mantleFront(PALLA)) + girdle + (bride ? veilTop : '') + (crown ? wreath : '') + over });

const togaC = (stripe) => `<path d="M-38 -206 Q-4 -160 40 -120 L44 -100 Q0 -140 -40 -186Z" fill="#efe6d2"/><path d="M-38 -206 Q-4 -160 40 -120" stroke="${stripe}" stroke-width="6" fill="none"/>`;
export const valerian = (x, y, s, { crown = false, over = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, top: '#4f6fa8', skin: '#e0b08a', hair: '#5a3a24', beard: null, ...o, over: togaC('#7a3a6a') + (crown ? wreath : '') + over });
export const tiburtius = (x, y, s, { crown = false, over = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, top: '#4f8a5a', skin: '#dcaa82', hair: '#2e2018', beard: '#2e2018', ...o, over: togaC('#3a5a8a') + (crown ? wreath : '') + over });
const pendant = `<path d="M-14 -206 Q0 -176 14 -206" stroke="#7a5536" stroke-width="2.5" fill="none"/><path d="M0 -180 V-156 M-8 -170 H8" stroke="${GOLD}" stroke-width="4.5" stroke-linecap="round"/>`;
export const urban = (x, y, s, o = {}) => person(x, y, s, { kind: 'elder', top: '#d9cdb4', skin: '#e6bc96', ...o,
  under: mantleBack('#6a5040') + (o.under || ''), over: pendant + (o.over || '') });
const poor = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', robe: true, sitting: true, top: ['#7a6a5a', '#6a6a7a', '#8a6a4a'][i % 3],
  skin: ['#c48a5f', '#e0b08a', '#b97c52'][i % 3], hair: ['#3a2a20', '#d9d4cc', '#1a120c'][i % 3], beard: i % 2 ? '#d9d4cc' : null, girl: i === 2, ...o });

// Angel: white-gold robe, bright wings with flame-coloured tips, halo
const feathers = (fill, ext, w) => [[58, 230], [44, 252], [31, 246], [18, 228], [5, 200], [-8, 168]].map(([th, L]) =>
  `<ellipse cx="${f(-(L + ext) / 2)}" cy="0" rx="${f((L + ext) / 2)}" ry="${w}" fill="${fill}" transform="translate(-30,-196) rotate(${th})"/>`).join('');
const wingL = `<g${M.sway(3.5, 3.4, 0, -30, -196)}>${feathers('#f6a24a', 22, 24)}${feathers('#fde0a0', 8, 21)}${feathers('#fff8ec', -40, 18)}`
  + `<ellipse cx="-70" cy="-236" rx="62" ry="34" fill="#fffaf2" transform="rotate(30 -70 -236)"/></g>`;
export const wings = `<circle cx="0" cy="-220" r="250" fill="url(#haloGlow)" opacity=".75"/>${wingL}<g transform="scale(-1,1)">${wingL}</g>`;
const sash = `<path d="M-36 -204 Q0 -150 38 -110" stroke="${GOLD}" stroke-width="7" fill="none"/>`;
export const angel = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, girl: true, top: '#fbf4e4', skin: SKIN.fair, hair: '#e0a84a',
  beard: null, halo: true, mood: 'happy', ...o, under: wings + (o.under || ''), over: sash + (o.over || '') });

// ---------------------------------------------------------------- props
export const organ = (s = 1) => {
  const pipes = [90, 80, 71, 62, 54, 46, 39].map((h, i) => { const px = -30 + i * 10;
    return `<rect x="${px - 4}" y="${-6 - h}" width="8" height="${h}" rx="3" fill="#e2e6ec"/><rect x="${px + 1}" y="${-6 - h}" width="3" height="${h}" fill="#a8b0bc" opacity=".7"/><rect x="${px - 2}" y="-22" width="4" height="5" fill="#4a4a5a"/>`; }).join('');
  return `<g transform="scale(${s}) translate(0,-4)"><circle cy="-30" r="70" fill="url(#haloGlow)" opacity=".6"/>${pipes}`
    + '<rect x="-40" y="-8" width="80" height="30" rx="5" fill="#8a5a32"/><rect x="14" y="-8" width="26" height="30" rx="5" fill="#6a4224" opacity=".7"/>'
    + `<rect x="-36" y="14" width="72" height="9" rx="2" fill="#f6f0e2"/><path d="M-26 14 v9 M-16 14 v9 M-6 14 v9 M4 14 v9 M14 14 v9 M24 14 v9" stroke="#2b1d14" stroke-width="2"/><path d="M-40 -8 H40" stroke="${GOLD}" stroke-width="3"/></g>`;
};
export const lyre = `<g transform="translate(0,-8) rotate(-10)"><path d="M-22 10 Q-36 -40 -18 -68 M22 10 Q36 -40 18 -68" stroke="${GOLD}" stroke-width="7" fill="none" stroke-linecap="round"/>`
  + '<rect x="-26" y="4" width="52" height="16" rx="6" fill="#a8743a"/><path d="M-26 -58 H26" stroke="#b08a3a" stroke-width="5" stroke-linecap="round"/>'
  + '<path d="M-12 4 V-58 M-4 4 V-58 M4 4 V-58 M12 4 V-58" stroke="#fff4cc" stroke-width="1.6" opacity=".9"/></g>';
export const tambourine = `<g><circle r="26" fill="#ecd6a8" stroke="#a8743a" stroke-width="7"/><circle r="17" fill="#f4e4c0" opacity=".7"/>`
  + [0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${f(26 * Math.cos(i * 1.047))}" cy="${f(26 * Math.sin(i * 1.047))}" r="5" fill="${GOLD}"/>`).join('') + '</g>';
const shell = `<g transform="rotate(30)"><path d="M-20 0 Q0 -26 20 0 Q0 10 -20 0Z" fill="#f4e8d4"/><path d="M-12 -2 L0 -18 M0 -2 V-20 M12 -2 L0 -18" stroke="#c9b48e" stroke-width="2"/></g>`;
const note = (c) => `<g fill="${c}"><ellipse rx="9" ry="6.5" transform="rotate(-22)"/><rect x="6" y="-36" width="3.4" height="36"/><path d="M9.4 -36 q13 6 10 20 q-2 -9 -10 -11Z"/></g>`;
// Floating music notes that rise, sway and twinkle
export function notes(n, { x0 = 380, x1 = 700, y0 = 600, y1 = 1100, color = GOLD, seed = 3, rise = 220, s = [0.8, 1.4] } = {}) {
  const R = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), sc = s[0] + R() * (s[1] - s[0]);
    out += `<g transform="translate(${f(x)},${f(y)}) scale(${f(sc)})"><g${M.drift(f((R() - 0.5) * 80), -rise)}><g${M.sway(14, 2 + R() * 1.6, R() * 2)}><g${M.flick(2.4 + R() * 1.6, R() * 2, 0.35)}>${note(color)}</g></g></g></g>`;
  }
  return out;
}

// ---------------------------------------------------------------- set pieces
// Roman house (domus) back wall: frieze, Pompeian red panels, dado, optional arched window (day or night)
export function domusWall({ y = 1290, wall = '#d9b48a', panel = '#a8402e', dado = '#5a2a22', win = 'night', winX = 540, nightTint = 0 } = {}) {
  const t = (c) => (nightTint ? mix(c, '#1c1a38', nightTint) : c);
  let s = `<rect x="-200" y="380" width="${W + 400}" height="${y - 380}" fill="${t(wall)}"/><rect x="-200" y="372" width="${W + 400}" height="34" fill="${t('#3a2420')}"/>`
    + `<rect x="-200" y="406" width="${W + 400}" height="46" fill="${t('#c8903a')}"/>`
    + Array.from({ length: 22 }, (_, i) => `<rect x="${-190 + i * 70}" y="420" width="22" height="18" fill="${t('#7a4a24')}"/>`).join('');
  for (const cx of [-60, 210, 870, 1140]) {
    if (win && Math.abs(cx - winX) < 220) continue;
    s += `<rect x="${cx - 100}" y="520" width="200" height="${y - 760}" fill="${t(panel)}" stroke="${t('#2a1a1a')}" stroke-width="12"/>`
      + `<rect x="${cx - 78}" y="544" width="156" height="${y - 808}" fill="none" stroke="${t('#e2b45a')}" stroke-width="3" opacity=".7"/>`
      + `<circle cx="${cx}" cy="${f(520 + (y - 760) / 2)}" r="22" fill="none" stroke="${t('#e2b45a')}" stroke-width="3" opacity=".6"/>`;
  }
  if (win) {
    const night = win === 'night', id = 'w' + Math.round(winX);
    s += `<path d="M${winX - 130} 950 V650 a130 130 0 0 1 260 0 V950Z" fill="${t('#e8d4b0')}"/>`
      + `<path d="M${winX - 110} 940 V655 a110 110 0 0 1 220 0 V940Z" fill="${night ? '#1c2652' : '#9fd0ec'}"/>`
      + (night
        ? `<circle cx="${winX + 40}" cy="640" r="34" fill="#f8f0d8"/><circle cx="${winX + 40}" cy="640" r="110" fill="url(#haloGlow)" opacity=".55"/>`
          + sparkles(8, winX - 90, winX + 90, 600, 900, { seed: 4, color: '#fff6d8', size: 0.7 })
        : `<circle cx="${winX - 30}" cy="700" r="40" fill="#fff4cc" opacity=".8"/>`)
      + `<path d="M${winX} 560 V940 M${winX - 110} 780 H${winX + 110}" stroke="${t('#5a3a2a')}" stroke-width="8"/>`;
  }
  s += `<rect x="-200" y="${y - 200}" width="${W + 400}" height="200" fill="${t(dado)}"/><rect x="-200" y="${y - 206}" width="${W + 400}" height="10" fill="${t('#e2b45a')}" opacity=".7"/>`;
  return s;
}
export function column(x, y, h = 820, { c = '#efe4cc' } = {}) {
  return `<g transform="translate(${x},${y})"><rect x="-48" y="-30" width="96" height="30" fill="${dark(c, 0.12)}"/><rect x="-36" y="${-h}" width="72" height="${h - 30}" fill="${c}"/>`
    + `<rect x="10" y="${-h}" width="26" height="${h - 30}" fill="${dark(c, 0.18)}" opacity=".7"/>`
    + `<path d="M-20 ${-h + 10} V-40 M-4 ${-h + 10} V-40 M12 ${-h + 10} V-40" stroke="${dark(c, 0.14)}" stroke-width="3"/>`
    + `<rect x="-52" y="${-h - 24}" width="104" height="24" fill="${c}"/><circle cx="-44" cy="${-h - 10}" r="13" fill="${dark(c, 0.08)}"/><circle cx="44" cy="${-h - 10}" r="13" fill="${dark(c, 0.15)}"/>`
    + `<rect x="-60" y="${-h - 40}" width="120" height="18" fill="${light(c, 0.1)}"/></g>`;
}
export function oilLamp(x, y, top = 380, ph = 0) {
  return `<path d="M${x} ${top} V${y - 10}" stroke="#5a4030" stroke-width="3"/><g transform="translate(${x},${y})"><circle cy="-14" r="70" fill="url(#sunGlow)" opacity=".7"${M.flick(2.2, ph, 0.7)}/>`
    + `<path d="M-30 0 Q0 18 30 0 Q24 -8 -24 -8Z" fill="#b8863a"/><path d="M8 -6 Q24 -6 30 0 Q22 12 6 14Z" fill="#8a5a2a" opacity=".7"/>`
    + `<g${M.flick(0.9, ph, 0.6)}><ellipse cx="26" cy="-14" rx="5" ry="10" fill="#ffd27a"/><ellipse cx="26" cy="-12" rx="2.5" ry="5" fill="#fff6d8"/></g></g>`;
}
export function garland(x0, x1, y, sag = 70, { seed = 2 } = {}) {
  const R = rng(seed), mx = (x0 + x1) / 2;
  let dots = '';
  for (let i = 1; i < 8; i++) { const t = i / 8, px = x0 + (x1 - x0) * t, py = y + 4 * sag * t * (1 - t); dots += `<circle cx="${f(px)}" cy="${f(py)}" r="${f(6 + R() * 3)}" fill="${['#f2a0b0', '#ffffff', '#f6d36b'][i % 3]}"/>`; }
  return `<path d="M${x0} ${y} Q${mx} ${y + 2 * sag} ${x1} ${y}" stroke="#3f7d3a" stroke-width="18" fill="none" stroke-linecap="round"/>`
    + `<path d="M${x0} ${y - 4} Q${mx} ${y + 2 * sag - 6} ${x1} ${y - 4}" stroke="#6aa954" stroke-width="5" fill="none" opacity=".7"/>${dots}`
    + `<path d="M${x0} ${y} v40 M${x1} ${y} v40" stroke="#c8323a" stroke-width="5" stroke-linecap="round"/>`;
}
export function curtain(side = 'l', y = 1290, { c = '#8a2a3a', top = 372 } = {}) {
  const x = side === 'l' ? -80 : W + 80, d = side === 'l' ? 1 : -1;
  return `<g${M.sway(0.8, 6, 0, x, top)}><path d="M${x} ${top} H${x + d * 230} Q${x + d * 150} ${top + 380} ${x + d * 200} ${y - 40} L${x} ${y - 40}Z" fill="${c}"/>`
    + `<path d="M${x + d * 120} ${top} Q${x + d * 80} ${top + 380} ${x + d * 110} ${y - 40}" stroke="${dark(c, 0.3)}" stroke-width="10" fill="none" opacity=".6"/>`
    + `<path d="M${x + d * 190} ${top} Q${x + d * 130} ${top + 380} ${x + d * 170} ${y - 40}" stroke="${light(c, 0.2)}" stroke-width="5" fill="none" opacity=".5"/>`
    + `<path d="M${x} ${top + 560} Q${x + d * 160} ${top + 540} ${x + d * 180} ${top + 600}" stroke="${GOLD}" stroke-width="7" fill="none"/></g>`;
}
const floor = (y, c = '#9a6a4a') => ground(y, c, { rim: light(c, 0.25) })
  + `<rect x="-200" y="${y + 40}" width="${W + 400}" height="20" fill="${dark(c, 0.35)}"/>`
  + Array.from({ length: 30 }, (_, i) => `<rect x="${-190 + i * 50}" y="${y + 44}" width="24" height="12" fill="${light(c, 0.35)}"/>`).join('');

// Appian Way: aqueduct, umbrella pine, round tomb, milestone, paved road in perspective
export function aqueduct(y, { c = '#c8a088', h = 170, x0 = -200, x1 = W + 200 } = {}) {
  let a = '';
  for (let x = x0; x < x1; x += 84) a += `<path d="M${x + 12} ${y} v${-h + 56} a30 30 0 0 1 60 0 v${h - 56}Z" fill="${dark(c, 0.3)}"/>`;
  return `<rect x="${x0}" y="${y - h}" width="${x1 - x0}" height="${h}" fill="${c}"/>${a}<rect x="${x0}" y="${y - h - 16}" width="${x1 - x0}" height="18" fill="${light(c, 0.12)}"/>`;
}
export function stonePine(x, y, s = 1, c = '#3f6a3a') {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-8 0 Q-14 -160 6 -300 L18 -300 Q4 -160 10 0Z" fill="#6b4a2e"/>`
    + `<g${M.sway(1, 5.4, x % 3, 0, -300)}><ellipse cx="10" cy="-318" rx="170" ry="46" fill="${dark(c, 0.2)}"/><ellipse cx="-30" cy="-338" rx="120" ry="40" fill="${c}"/>`
    + `<ellipse cx="60" cy="-334" rx="110" ry="36" fill="${c}"/><ellipse cx="0" cy="-356" rx="90" ry="28" fill="${light(c, 0.2)}"/></g></g>`;
}
export function roundTomb(x, y, s = 1, { c = '#d8c8a8' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-110" width="300" height="110" fill="${dark(c, 0.12)}"/>`
    + `<rect x="-120" y="-300" width="240" height="190" fill="${c}"/><rect x="40" y="-300" width="80" height="190" fill="${dark(c, 0.2)}" opacity=".6"/>`
    + `<rect x="-124" y="-252" width="248" height="22" fill="${light(c, 0.12)}"/>`
    + Array.from({ length: 6 }, (_, i) => `<rect x="${-120 + i * 44}" y="-326" width="26" height="28" fill="${c}"/>`).join('') + '</g>';
}
export const milestone = (x, y, s = 1, c = '#d8ccb4') => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-26" y="-14" width="52" height="14" fill="${dark(c, 0.15)}"/>`
  + `<rect x="-20" y="-120" width="40" height="108" rx="6" fill="${c}"/><rect x="6" y="-120" width="14" height="108" rx="5" fill="${dark(c, 0.18)}" opacity=".7"/>`
  + `<path d="M-10 -96 v26 M0 -96 v26 M10 -96 v26 M-14 -98 h28 M-14 -68 h28" stroke="#6a5a48" stroke-width="3"/></g>`;
function road(hy, { c = '#9a8a7a', y1 = 1720 } = {}) {
  const L = (y) => 470 - (y - hy) * (690 / (y1 - hy)), Rr = (y) => 610 + (y - hy) * (690 / (y1 - hy));
  let rows = '';
  for (let i = 1; i < 14; i++) { const y = hy + (y1 - hy) * Math.pow(i / 14, 1.6); rows += `<path d="M${f(L(y))} ${f(y)} H${f(Rr(y))}" stroke="${dark(c, 0.2)}" stroke-width="${f(1 + i * 0.25)}" opacity=".6"/>`; }
  return `<path d="M${L(hy)} ${hy} H${Rr(hy)} L${Rr(y1)} ${y1} H${L(y1)}Z" fill="${c}"/>${rows}`
    + `<path d="M${L(hy)} ${hy} L${L(y1)} ${y1} M${Rr(hy)} ${hy} L${Rr(y1)} ${y1}" stroke="${light(c, 0.3)}" stroke-width="10"/>`;
}

// Santa Cecilia in Trastevere: portico with columns, gabled facade, Romanesque bell tower
export function santaCecilia(x, y, s = 1, { wall = '#e8d8b8', brick = '#b8654a', roof = '#8a4a3a', win = '#ffd98a', lit = null } = {}) {
  const litA = lit === null ? '' : fadeIn(lit, 1.4);
  const arch = (ax, ay, w, h, col) => `<path d="M${ax - w / 2} ${ay} v${-h} a${w / 2} ${w / 2} 0 0 1 ${w} 0 v${h}Z" fill="${col}"/>`;
  let tower = `<rect x="250" y="-650" width="130" height="650" fill="${brick}"/><rect x="330" y="-650" width="50" height="650" fill="${dark(brick, 0.22)}" opacity=".7"/>`
    + `<path d="M238 -650 L315 -720 L392 -650Z" fill="${roof}"/>`;
  for (let k = 0; k < 4; k++) {
    const ty = -270 - k * 100;
    tower += `<rect x="242" y="${ty}" width="146" height="10" fill="${light(brick, 0.25)}"/>` + arch(290, ty - 20, 26, 40, '#3a2420') + arch(340, ty - 20, 26, 40, '#3a2420');
  }
  const cols = [-170, -60, 60, 170].map((cx) => `<rect x="${cx - 13}" y="-200" width="26" height="200" fill="${light(wall, 0.1)}"/><rect x="${cx + 3}" y="-200" width="10" height="200" fill="${dark(wall, 0.15)}" opacity=".6"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">${tower}`
    + `<rect x="-230" y="-400" width="460" height="400" fill="${wall}"/><rect x="100" y="-400" width="130" height="400" fill="${dark(wall, 0.18)}" opacity=".55"/>`
    + `<path d="M-252 -400 L0 -500 L252 -400Z" fill="${roof}"/><path d="M0 -500 L252 -400 L110 -400Z" fill="${dark(roof, 0.25)}"/>`
    + `<rect x="-230" y="-200" width="460" height="200" fill="#4a3430"/><g${litA}><rect x="-230" y="-200" width="460" height="200" fill="${win}" opacity=".35"/></g>${cols}`
    + `<rect x="-244" y="-232" width="488" height="34" fill="${light(wall, 0.08)}"/><rect x="-230" y="-226" width="460" height="10" fill="${GOLD}" opacity=".7"/>`
    + `<g${litA}>${glow(0, -330, 170, 0.6)}</g>` + [-110, 0, 110].map((wx) => arch(wx, -300, 44, 60, win)).join('')
    + `<path d="M0 -500 v-34 M-14 -520 h28" stroke="${GOLD}" stroke-width="6"/></g>`;
}

// ---------------------------------------------------------------- scenes
// 0 · hook: the bride at night, an angel fading in behind her
function scene0() {
  return FAR(sky(ROOMN))
    + BACK(domusWall({ win: 'night', winX: 540, nightTint: 0.45 }))
    + MID(column(70, 1290, 860, { c: '#c8bca8' }) + column(1010, 1290, 860, { c: '#c8bca8' }) + oilLamp(250, 560, 380, 0.2) + oilLamp(840, 600, 380, 1.1))
    + floor(1290, '#6a4a4a')
    + `<g${M.tw([{ at: T.s0b, dur: 1.6, from: { opacity: 0 }, to: { opacity: 0.85 } }])}>${angel(330, 1070, 1.3, { mood: 'peaceful', armL: [24, 3, 3], armR: [40, 3, 3.3] })}</g>`
    + cecilia(560, 1300, 2.25, { bride: true, mood: 'happy', talk: [0.3, T.s0b - 0.3], armL: [28, 2, 3], armR: [40, 3, 2.8] })
    + valerian(890, 1310, 2.0, { flip: true, mood: 'surprised', armL: 12, armR: [30, 3, 3] })
    + motes(14, { y0: 560, y1: 1200, x0: 120, x1: 520, seed: 3, color: '#fff2c4' })
    + NEAR(bokeh(6, { seed: 4, op: [0.2, 0.45] }));
}

// 1 · setup: a Christian girl of Rome, promised to Valerian
function scene1() {
  const swap = T.s1b + 0.4;
  return FAR(sky(DAYSKY) + sun(860, 560, 56, 260))
    + BACK(clouds(470, { seed: 4 }) + hill(1080, 40, '#b8c8b0', 3, { freq: 1.4 }) + romeSkyline(540, 1140, 0.9, { c: '#c8a88a', win: '#fff0c8' }))
    + MID(hill(1180, 24, '#9ab86a', 5, { top: '#c0d88a' }) + cypress(90, 1230, 1.0) + cypress(990, 1220, 0.9) + cypress(170, 1200, 0.7))
    + ground(1290, '#b8b06a', { rim: '#dcd49a' }) + tufts(1296, 12, '#8a8a4a', { seed: 3 }) + flowers(1300, 1380, 10, { seed: 5 })
    + `<g${fadeOut(swap, 0.5)}>${cecilia(360, 1300, 2.15, { mood: 'happy', armL: [30, 2, 3], armR: [34, 2, 3.3] })}</g>`
    + `<g${fadeIn(swap, 0.5)}>${cecilia(360, 1300, 2.15, { mood: 'worried', armL: [30, 2, 3], armR: [34, 2, 3.3] })}</g>`
    + `<g${M.in('rise', T.s1b, 1.0, 800, 1300)}>${valerian(800, 1310, 2.05, { flip: true, mood: 'happy', armL: 14, armR: [55, 4, 2.6] })}</g>`
    + butterflies(2, { y0: 860, y1: 1000, seed: 6 })
    + NEAR(foliage('l', 1640, { color: '#2f5a35', seed: 3 }) + foliage('r', 1660, { color: '#2f5a35', seed: 9 }));
}

// 2 · the wedding feast: musicians play, she sings in her heart to God (tilt-up + rack focus)
function scene2() {
  return FAR(sky(ROOM) + rays(540, 300, { op: 0.07 }))
    + BACK(domusWall({ win: null, wall: '#e2bc8e' }) + garland(-60, 300, 470, 60) + garland(300, 780, 470, 70, { seed: 4 }) + garland(780, 1140, 470, 60, { seed: 6 }))
    + MID(column(40, 1290, 860) + column(1040, 1290, 860) + oilLamp(300, 600, 380, 0.4) + oilLamp(790, 620, 380, 1.4)
      + followers(1190, 9, { color: '#5a3430' })
      + person(170, 1300, 1.4, { kind: 'layman', robe: true, top: '#7a5a8a', skin: '#e0b08a', hair: '#3a2a20', beard: '#3a2a20', mood: 'joy', armL: [44, 6, 0.9], propL: lyre, armR: [30, 8, 0.5] })
      + person(960, 1300, 1.35, { kind: 'layman', robe: true, girl: true, flip: true, top: '#3f7a8a', skin: SKIN.fair, hair: '#6a4a2a', mood: 'joy', armR: [140, 14, 0.5], propR: tambourine, armL: 14 })
      + notes(7, { x0: 60, x1: 1020, y0: 780, y1: 1100, color: '#fbe8c8', seed: 8, rise: 160 }))
    + floor(1290, '#8a5a40')
    + valerian(790, 1310, 2.0, { flip: true, mood: 'happy', armL: 12, armR: [24, 2, 3] })
    + glow(540, 860, 200, 0.6)
    + cecilia(520, 1300, 2.3, { bride: true, mood: 'peaceful', armL: [36, 1, 3], armR: [36, 1, 3.2] })
    + notes(9, { x0: 430, x1: 640, y0: 660, y1: 940, color: GOLD, seed: 3, rise: 170, s: [1, 1.6] })
    + motes(10, { y0: 480, y1: 900, x0: 400, x1: 680, seed: 9 })
    + NEAR(bokeh(7, { seed: 12, op: [0.25, 0.55] }));
}

// 3 · the wedding night: her secret, and Valerian's question (push)
function scene3() {
  return FAR(sky(ROOMN))
    + BACK(domusWall({ win: 'night', winX: 560, nightTint: 0.5 }))
    + MID(curtain('l', 1290, { c: '#6a2434' }) + curtain('r', 1290, { c: '#6a2434' }) + oilLamp(300, 640, 380, 0.7))
    + floor(1290, '#5a4048')
    + `<g transform="translate(470,640)">${glow(0, 0, 150, 0.5)}${sparkles(7, -90, 90, -90, 90, { seed: 3, color: '#fff2c4' })}</g>`
    + cecilia(380, 1300, 2.2, { mood: 'happy', talk: [0.3, T.s3b - 0.2], armL: [26, 2, 3], armR: [125, 4, 2.6] })
    + valerian(790, 1310, 2.1, { flip: true, mood: 'surprised', talk: [T.s3b + 0.1, 99], armL: 14, armR: [46, 4, 2.4] })
    + motes(10, { y0: 560, y1: 1100, x0: 300, x1: 700, seed: 5, color: '#e8e4ff' });
}

// 4 · the Appian Way: Urban among the poor; Valerian baptized (pan-l)
function scene4() {
  const kneel = T.s4b + 0.3;
  return FAR(sky(MORN) + sun(250, 720, 60, 300))
    + BACK(clouds(470, { color: '#fff4e0', op: 0.7, seed: 6 }) + hill(1060, 40, '#d8b898', 2, { freq: 1.3 }) + aqueduct(1090, { c: '#d4ae92', h: 150 }))
    + MID(ground(1080, '#c8b070') + road(1080) + stonePine(110, 1180, 0.95) + cypress(330, 1110, 0.45) + cypress(760, 1105, 0.4)
      + roundTomb(960, 1170, 0.65) + cypress(1060, 1190, 0.8) + milestone(250, 1300, 1.1)
      + poor(970, 1300, 1.15, 0, { mood: 'happy', armL: 20, armR: 20 }) + poor(110, 1310, 1.1, 1, { mood: 'happy', armL: 22, armR: 22 }))
    + `<g${fadeOut(kneel, 0.5)}>${valerian(440, 1310, 1.95, { mood: 'surprised', armL: 14, armR: [40, 3, 2.6] })}</g>`
    + `<g${fadeIn(kneel, 0.5)}>${valerian(450, 1310, 1.9, { kneel: true, mood: 'peaceful', armL: 32, armR: 32 })}</g>`
    + `<g${fadeOut(kneel, 0.5)}>${urban(720, 1310, 2.0, { mood: 'happy', talk: [0.4, kneel - 0.3], armL: [30, 3, 3], armR: 16 })}</g>`
    + `<g${fadeIn(kneel, 0.5)}>${urban(720, 1310, 2.0, { mood: 'happy', armL: [116, 2, 3], propL: shell, armR: 16 })}</g>`
    + `<g${fadeIn(kneel + 0.6, 0.4)}>${sparkles(10, 460, 520, 820, 930, { seed: 7, color: '#d8f0ff', size: 1.1 })}</g>`
    + flowers(1300, 1400, 8, { seed: 2, x0: 0, x1: 300 })
    + NEAR(foliage('r', 1650, { color: '#3a4a2a', seed: 4 }));
}

// 5 · the angel crowns them with roses and lilies (dolly)
function scene5() {
  const kneel = T.s5b + 0.2, crownAt = T.s5b + 1.2;
  const drop = (dx) => M.tw([{ at: crownAt, dur: 0.9, from: { opacity: 0, x: dx, y: -80 }, to: { opacity: 1, x: 0, y: 0 }, ease: 'power2.out' }]);
  const heldL = `<g${fadeOut(crownAt, 0.35)}>${wreathProp(0.9)}</g>`, heldR = `<g${fadeOut(crownAt, 0.35)}>${wreathProp(0.9)}</g>`;
  return FAR(sky(ROOMN) + rays(540, 760, { op: 0.12 }))
    + BACK(domusWall({ win: 'night', winX: 540, nightTint: 0.4 }) + glow(540, 800, 520, 0.9))
    + MID(angel(540, 1060, 1.45, { mood: 'happy', armL: [72, 3, 3], armR: [72, 3, 3.3], propL: heldL, propR: heldR })
      + sparkles(14, 260, 820, 560, 1000, { seed: 9 }))
    + floor(1290, '#5a4048')
    + cecilia(330, 1310, 1.9, { kneel: true, mood: 'peaceful', armL: 34, armR: 34, over: `<g${drop(10)}>${wreath}</g>` })
    + `<g${fadeOut(kneel, 0.5)}>${valerian(800, 1310, 1.95, { flip: true, mood: 'surprised', armL: 14, armR: [60, 3, 2.4] })}</g>`
    + `<g${fadeIn(kneel, 0.5)}>${valerian(790, 1310, 1.9, { flip: true, kneel: true, mood: 'peaceful', armL: 34, armR: 34, over: `<g${drop(30)}>${wreath}</g>` })}</g>`
    + petals(12, { seed: 6, colors: ['#ffffff', '#c8323a', '#f2a0b0'] })
    + NEAR(bokeh(7, { seed: 7, op: [0.25, 0.55] }));
}

// 6 · Tiburtius believes; all three martyrs; her home becomes a church (pull)
function scene6() {
  const h = T.s6b + 0.3;
  const palm = (rot) => `<g${fadeIn(h, 0.8)}>${palm_frond(0.95, rot)}</g>`;
  return FAR(sky(GOLDSKY) + rays(540, 620, { op: 0.1 }))
    + BACK(clouds(470, { color: '#fff4dc', op: 0.75, seed: 9 }) + hill(1150, 30, '#c89a7a', 4) + santaCecilia(460, 1190, 0.95, { lit: T.s6c }))
    + MID(hill(1230, 18, '#a8945a', 7, { top: '#c8b47a' }) + cypress(60, 1250, 0.9) + cypress(1030, 1250, 0.85))
    + ground(1290, '#9a8a50', { rim: '#c8b87a' }) + tufts(1296, 10, '#7a6a3a', { seed: 4 })
    + valerian(230, 1310, 1.6, { crown: true, halo: h, mood: 'happy', armL: 14, armR: [30, 2, 3], propR: palm(14) })
    + cecilia(540, 1300, 1.8, { crown: true, halo: h, mood: 'happy', armL: [30, 2, 3], armR: [30, 2, 3.4], propL: palm(-14) })
    + tiburtius(840, 1310, 1.6, { flip: true, halo: h, mood: 'surprised', armL: 14, armR: [44, 3, 2.6], propR: palm(14) })
    + `<g transform="translate(760,840)">${petals(8, { seed: 4, colors: ['#c8323a', '#ffffff', '#f2a0b0'], y0: -120, y1: 120, fall: 260 })}</g>`
    + petals(14, { seed: 11, colors: ['#ffffff', '#c8323a', GOLD] })
    + NEAR(foliage('l', 1650, { color: '#4a3a2a', seed: 6 }));
}

// 7 · feast day: patron of music (arc)
function scene7() {
  return FAR(sky([[0, '#221f4e'], [0.42, '#7d4876'], [0.66, '#e98a62'], [1, '#f8c07a']], { stars: 26, seed: 5 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + hill(1200, 30, '#5d3f6c', 3, { freq: 1.6 }))
    + glow(540, 1080, 500, 0.85)
    + MID(hill(1262, 14, '#6a4458', 6))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1296, 10, '#3a2438', { seed: 7 })
    + cecilia(540, 1300, 2.45, { crown: true, halo: true, mood: 'happy', armL: [26, 2, 3], armR: [30, 2, 3.4], propL: palm_frond(1.05, -16), propR: organ(1.05) })
    + notes(10, { x0: 120, x1: 960, y0: 560, y1: 1120, color: GOLD, seed: 5, rise: 200 })
    + flowers(1300, 1370, 14, { seed: 3, colors: ['#ffffff', '#c8323a', '#f6d36b', '#fffaf0'] })
    + motes(14, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(7, { seed: 15, op: [0.25, 0.5] }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_cecilia_wedding_angel', name: 'St_Cecilia_Wedding_Angel',
  voice: 'am_michael', speed: 0.95,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'An angel guarded her', thumb_title: 'St. Cecilia', thumb_shift: 0, thumb_t: 9.5,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'ɐpˈɪən': 'ˈæpiən',   // Appian -> AP-ee-un
    'tɪbˈɜːɾɪəs': 'taɪbˈɜːʃəs',   // Tiburtius -> ty-BUR-shus
    'noʊvˈɛmbɚ twˈɛnti tˈuː': 'noʊvˈɛmbɚ twˈɛnti sˈɛkənd',   // November 22 -> twenty-second
  },
  scenes: [
    { kicker: 'ONE FAMOUS STORY', title: 'The Wedding Night Angel', art: scene0, cam: { move: 'push-fast', oy: 1000 },
      say: ['One famous story says that on her wedding night, a Roman bride told her new husband a secret.', 'An angel was guarding her.', 'This is Saint Cecilia.'] },
    { kicker: 'ANCIENT ROME', title: 'A Christian Bride', art: scene1, cam: 'drift-r',
      say: ['Cecilia was a young Christian from a noble family, when the faith was still persecuted in Rome.', 'She had given her life to God, but her family promised her in marriage to a young pagan, Valerian.'] },
    { kicker: 'THE WEDDING FEAST', title: 'Singing in Her Heart', art: scene2, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ['As the musicians played at her wedding,', 'Cecilia sang in her heart, to God alone.'] },
    { kicker: 'THE WEDDING NIGHT', title: 'Her Guardian Angel', art: scene3, cam: { move: 'push', amt: 0.07, ox: 560, oy: 1000 },
      say: ['That night, she told Valerian that an angel of God was guarding her.', 'Valerian asked to see this angel for himself.'] },
    { kicker: 'THE APPIAN WAY · ROME', title: 'On the Appian Way', art: scene4, cam: 'pan-l',
      say: ['She sent him out on the Appian Way, to the old bishop Urban, who was hiding among the poor.', 'There, Valerian was baptized.'] },
    { kicker: 'A GIFT FROM HEAVEN', title: 'Crowns from Paradise', art: scene5, cam: { move: 'dolly', oy: 1000 },
      say: ['When he came home, he found Cecilia at prayer, and an angel beside her.', 'The angel crowned them both, with roses and lilies from Paradise.'] },
    { kicker: 'TRASTEVERE · ROME', title: 'A House of Prayer', art: scene6, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ["Valerian's brother Tiburtius smelled the roses, and believed too.", 'In time, all three gave their lives for Christ,', 'and tradition says her home became a church that still stands in Rome.'] },
    { kicker: 'FEAST DAY · NOVEMBER 22', title: 'Patron of Music', art: scene7, cam: 'arc-l',
      say: ['Her feast day is November 22.', 'Because she sang to God in her heart, she is the patron of music and musicians.', 'Saint Cecilia, pray for us.'] },
  ],
};
