// St. Lorenzo Ruiz of Manila (feast: September 28). Barong, Binondo Church, baro't saya, Spanish soldier, Dominican,
// Japanese official, wooden prison, gallows and pit (shown empty) and Nagasaki town exported for later reels.
import { W, M, SKIES, SKIN, CREAM, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, gulls, butterflies, person, book, palm_frond, rosary, coconut, nipa_hut, ship, basilica, crowd, ground, dark, light, f,
  FAR, BACK, MID, NEAR } from '../art.mjs';

const SKL = SKIN.s3, HAIRL = '#15100c';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ---------------------------------------------------------------- people
// Barong tagalog: sheer cream shirt with an embroidered front panel, black trousers
export const barong = '<path d="M-15 -205 L-18 -104 M15 -205 L18 -104" stroke="#d9c89c" stroke-width="2.5" fill="none"/>'
  + '<g fill="none" stroke="#cbb88a" stroke-width="2">' + [-192, -172, -152, -132, -114].map((y) => `<path d="M-13 ${y} q6 -6 11 0 M2 ${y} q6 -6 11 0"/>`).join('') + '</g>';
export const lorenzo = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: CREAM, pants: '#241e24', skin: SKL, hair: HAIRL, beard: null, ...o, over: barong + (o.over || '') });
// Baro't saya: cream blouse, long coloured skirt, folded panuelo at the neck
export const saya = (c = '#b8485a') => `<path d="M-42 -122 Q0 -110 42 -122 L56 -6 Q0 3 -56 -6Z" fill="${c}"/><path d="M14 -116 Q30 -118 42 -122 L56 -6 Q40 -1 26 -2Z" fill="${dark(c, 0.28)}" opacity=".55"/>`
  + `<path d="M-30 -204 L0 -160 L30 -204 Q0 -190 -30 -204Z" fill="#efe3c6"/>`;
export const filipina = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', girl: true, robe: true, top: CREAM, skin: SKIN.s1, hair: '#1a120c', ...o, over: saya(o.skirt || '#b8485a') + (o.over || '') });
// Dominican habit: white tunic and scapular, black cappa and hood
const cappa = '<path d="M-42 -208 Q-72 -110 -62 -4 L62 -4 Q72 -110 42 -208Z" fill="#1d1a22"/><path d="M42 -208 Q72 -110 62 -4 L44 -4 Q52 -110 32 -204Z" fill="#000" opacity=".3"/>';
const scap = '<rect x="-17" y="-204" width="34" height="198" rx="6" fill="#faf6ec"/><rect x="6" y="-204" width="11" height="198" fill="#d8d0c0" opacity=".6"/>';
const dHood = '<path d="M-41 -213 Q0 -196 41 -213 Q47 -190 31 -178 Q0 -170 -31 -178 Q-47 -190 -41 -213Z" fill="#1d1a22"/>';
const scapKneel = '<rect x="-17" y="-204" width="34" height="108" rx="6" fill="#faf6ec"/><rect x="6" y="-204" width="11" height="108" fill="#d8d0c0" opacity=".6"/>';
const cappaKneel = '<path d="M-42 -208 Q-72 -150 -66 -98 L66 -98 Q72 -150 42 -208Z" fill="#1d1a22"/>';
export const dominican = (x, y, s, o = {}) => person(x, y, s, { kind: 'friar', top: '#efe8da', cord: false, skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424',
  ...o, under: (o.kneel ? cappaKneel : cappa) + (o.under || ''), over: (o.kneel ? scapKneel : scap) + dHood + (o.over || '') });
// Spanish colonial soldier: morion helmet, halberd held upright at rest
const morion = '<path d="M-52 -282 Q-40 -270 0 -272 Q40 -270 52 -282 Q42 -300 34 -302 Q24 -338 0 -340 Q-24 -338 -34 -302 Q-42 -300 -52 -282Z" fill="#9aa0aa"/><path d="M6 -340 Q26 -336 34 -302 Q42 -300 52 -282 Q40 -272 18 -272Z" fill="#6c7280" opacity=".6"/><path d="M-12 -342 Q0 -356 12 -342 L8 -334 L-8 -334Z" fill="#7c828e"/>';
export const halberd = '<g><rect x="-4" y="-210" width="8" height="330" rx="3" fill="#6b4a2a"/><path d="M0 -258 L10 -210 L-10 -210Z" fill="#b8bcc6"/><path d="M4 -214 Q34 -204 30 -180 Q18 -190 4 -188Z" fill="#9aa0aa"/></g>';
export const soldier = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#7a2e34', pants: '#3a3238', skin: SKIN.fair, hair: '#4a3020', beard: '#4a3020', mood: 'stern', ...o, over: morion + (o.over || '') });
// Edo-period official: stiff-shouldered kataginu over a dark robe, topknot
const kataginu = (c) => `<path d="M-37 -207 L-74 -216 L-48 -176 L-30 -120 L30 -120 L48 -176 L74 -216 L37 -207 L14 -120 L-14 -120Z" fill="${c}"/><path d="M-22 -120 h44 v108 h-44Z" fill="${dark(c, 0.15)}" opacity=".5"/>`;
const topknot = '<path d="M-34 -282 Q0 -300 34 -282 Q18 -290 0 -290 Q-18 -290 -34 -282Z" fill="#c9a07a" opacity=".9"/><rect x="-7" y="-318" width="14" height="30" rx="6" fill="#120d0a"/>';
export const official = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#37405a', skin: '#e2b48f', hair: '#120d0a', mood: 'stern', ...o, over: kataginu('#23293c') + topknot + (o.over || '') });
const lazaro = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#8a7a5c', pants: '#5a4e3c', skin: '#e2b48f', hair: '#1a140e', beard: null, ...o });

// ---------------------------------------------------------------- props + set pieces
export const quill = '<g transform="rotate(24)"><path d="M0 16 L3 -6 Q14 -40 6 -74 Q-8 -46 -3 -6Z" fill="#5f86ac"/><path d="M0 16 L3 -6 Q6 -32 6 -70" stroke="#d8e4ee" stroke-width="2" fill="none"/></g>';
const bigRosary = (s = 1.5) => `<g transform="scale(${s})">${rosary()}</g>`;
export function writingDesk(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-250" y="0" width="500" height="26" rx="6" fill="#7a5230"/><rect x="-250" y="20" width="500" height="10" fill="#5a3b22"/>`
    + '<rect x="-226" y="30" width="26" height="210" fill="#5a3b22"/><rect x="200" y="30" width="26" height="210" fill="#4a3018"/><rect x="-226" y="120" width="452" height="14" fill="#4a3018"/>'
    + '<path d="M-70 -2 L78 -2 L96 -18 L-52 -18Z" fill="#fbf4e0"/><path d="M-40 -10 h86 M-30 -14 h70" stroke="#6a5a48" stroke-width="2"/>'
    + '<rect x="-182" y="-26" width="36" height="26" rx="5" fill="#26222c"/><ellipse cx="-164" cy="-26" rx="18" ry="5" fill="#0e0c12"/>'
    + '<g transform="translate(176,-16)"><rect x="-44" y="-14" width="88" height="30" rx="14" fill="#f2e6c8"/><rect x="-44" y="-14" width="14" height="30" rx="6" fill="#c9b88a"/><rect x="30" y="-14" width="14" height="30" rx="6" fill="#c9b88a"/></g></g>';
}
// Binondo Church: stone nave with a stepped octagonal bell tower that nods to the Chinese community around it
export function binondo(x, y, s = 1, { wall = '#d9b98a', roof = '#a85438', trim = '#f4e6c8', win = '#ffe6a8' } = {}) {
  const tiers = [[92, 120], [78, 100], [64, 90], [50, 80], [36, 70]];
  let ty = -60, tower = '';
  tiers.forEach(([hw, h]) => {
    tower += `<rect x="${-hw}" y="${ty - h}" width="${hw * 2}" height="${h}" fill="${trim}"/><rect x="${hw * 0.35}" y="${ty - h}" width="${hw * 0.65}" height="${h}" fill="${dark(trim, 0.2)}" opacity=".7"/>`
      + `<path d="M${-hw * 0.28} ${ty - 16} v${-h + 42} a${hw * 0.28} ${hw * 0.28} 0 0 1 ${hw * 0.56} 0 v${h - 42}Z" fill="${dark(wall, 0.5)}"/>`
      + `<path d="M${-hw - 22} ${ty - h + 6} Q0 ${ty - h - 22} ${hw + 22} ${ty - h + 6} L${hw} ${ty - h - 10} Q0 ${ty - h - 32} ${-hw} ${ty - h - 10}Z" fill="${roof}"/>`;
    ty -= h + 18;
  });
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="-420" y="-300" width="300" height="300" fill="${wall}"/><path d="M-440 -300 L-270 -420 L-100 -300Z" fill="${wall}"/><path d="M-270 -420 L-100 -300 L-230 -300Z" fill="${dark(wall, 0.2)}" opacity=".6"/>`
    + `<rect x="-442" y="-306" width="344" height="12" fill="${trim}"/><circle cx="-270" cy="-350" r="26" fill="${win}"/><path d="M-270 -420 v-58 M-288 -456 h36" stroke="${GOLD}" stroke-width="7"/>`
    + `<path d="M-308 0 v-120 a38 38 0 0 1 76 0 v120Z" fill="${dark(wall, 0.55)}"/>`
    + [-390, -180].map((wx) => `<rect x="${wx}" y="-210" width="30" height="62" rx="15" fill="${win}" opacity=".85"/>`).join('')
    + `<rect x="-100" y="-60" width="200" height="60" fill="${dark(trim, 0.1)}"/>${tower}`
    + `<path d="M0 ${ty + 8} v-52 M-16 ${ty - 22} h32" stroke="${GOLD}" stroke-width="6"/></g>`;
}
function lanterns(y, { n = 6, c = '#d8423a' } = {}) {
  const step = (W + 120) / (n - 1);
  let d = `M-60 ${y}`, out = '';
  for (let i = 0; i < n - 1; i++) d += ` Q${f(-60 + step * (i + 0.5))} ${y + 56} ${f(-60 + step * (i + 1))} ${y}`;
  for (let i = 0; i < n - 1; i++) {
    const x = -60 + step * (i + 0.5);
    out += `<g transform="translate(${f(x)},${y + 30})"><g${M.sway(4, 2.6 + i * 0.2, i * 0.3, 0, 0)}><path d="M0 0 v14" stroke="#4a3020" stroke-width="3"/><ellipse cy="40" rx="27" ry="26" fill="${c}"/><ellipse cx="9" cy="40" rx="13" ry="25" fill="${dark(c, 0.25)}" opacity=".6"/>`
      + `<rect x="-14" y="12" width="28" height="6" rx="2" fill="${GOLD}"/><rect x="-14" y="62" width="28" height="6" rx="2" fill="${GOLD}"/><path d="M0 68 v18" stroke="${GOLD}" stroke-width="3"/></g></g>`;
  }
  return `<path d="${d}" stroke="#4a3020" stroke-width="3" fill="none"/>${out}`;
}
// Intramuros: stone sea wall with bastions, tiled roofs and a church dome behind
export function intramuros(y, { wall = '#8a7264', roof = '#7a4436', dome = '#6a5a60' } = {}) {
  let m = '';
  for (let x = -60; x < W + 60; x += 62) m += `<rect x="${x}" y="${y - 214}" width="36" height="34" fill="${wall}"/>`;
  return `<path d="M640 ${y - 180} v-90 Q640 ${y - 400} 760 ${y - 420} Q880 ${y - 400} 880 ${y - 270} v90Z" fill="${dome}"/><path d="M760 ${y - 420} v-60 M742 ${y - 458} h36" stroke="${dark(dome, 0.2)}" stroke-width="8"/>`
    + `<path d="M120 ${y - 180} L230 ${y - 270} L340 ${y - 180}Z M340 ${y - 180} L440 ${y - 250} L540 ${y - 180}Z" fill="${roof}"/>`
    + `${m}<rect x="-60" y="${y - 186}" width="${W + 120}" height="186" fill="${wall}"/>`
    + Array.from({ length: 16 }, (_, i) => `<rect x="${-40 + i * 76 + (i % 2) * 18}" y="${y - 150 + (i % 3) * 44}" width="46" height="20" rx="3" fill="${dark(wall, 0.2)}" opacity=".5"/>`).join('');
}
// Traditional Japanese house roofs for a Nagasaki hillside
export function nagasakiTown(x, y, s = 1, { wall = '#c9c2b4', roof = '#3e4658' } = {}) {
  const house = (hx, hy, k) => `<g transform="translate(${hx},${hy}) scale(${k})"><rect x="-58" y="-56" width="116" height="56" fill="${wall}"/><rect x="14" y="-56" width="44" height="56" fill="${dark(wall, 0.25)}" opacity=".7"/>`
    + `<path d="M-84 -50 Q-58 -60 -48 -96 L48 -96 Q58 -60 84 -50Z" fill="${roof}"/><path d="M-36 -40 h28 v40 h-28Z" fill="${dark(wall, 0.5)}"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${house(-260, -30, 0.9)}${house(-60, -80, 0.8)}${house(140, -20, 1)}${house(330, -66, 0.8)}${house(-170, 10, 1.1)}${house(40, 16, 1)}</g>`;
}
// The gallows frame and pit are his traditional attributes. Always shown empty.
export function gallows(x, y, s = 1, { wood = '#3a2a24' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-430" width="24" height="430" fill="${wood}"/><rect x="126" y="-430" width="24" height="430" fill="${dark(wood, 0.2)}"/><rect x="-174" y="-452" width="348" height="28" rx="4" fill="${light(wood, 0.1)}"/>`
    + `<path d="M-126 -350 L-60 -426 M126 -350 L60 -426" stroke="${wood}" stroke-width="14"/><g fill="none" stroke="#a88e62" stroke-width="5"><ellipse cx="96" cy="-404" rx="17" ry="9"/><ellipse cx="96" cy="-392" rx="17" ry="9"/></g></g>`;
}
export function pit(x, y, s = 1, { rim = '#6c6470' } = {}) {
  const stones = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return `<ellipse cx="${f(Math.cos(a) * 150)}" cy="${f(Math.sin(a) * 42)}" rx="26" ry="13" fill="${i % 2 ? rim : light(rim, 0.14)}"/>`; }).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="146" ry="40" fill="#0c0a12"/>${stones}<ellipse cy="-4" rx="118" ry="24" fill="#08060c"/></g>`;
}
// Wooden prison: dark timber wall, high window, thick bars with an opening
function prisonRoom(y, { gapFrom = 690, gapTo = 960 } = {}) {
  let planks = '', bars = '';
  for (let x = -200; x < W + 200; x += 96) planks += `<rect x="${x}" y="-400" width="92" height="${y + 480}" fill="${(x / 96) % 2 ? '#3a2c2a' : '#433230'}"/>`;
  for (let x = -40; x < W + 60; x += 118) if (x < gapFrom || x > gapTo) bars += `<rect x="${x}" y="360" width="26" height="${y - 340}" rx="4" fill="#20161a"/><rect x="${x + 16}" y="360" width="10" height="${y - 340}" fill="#120c10" opacity=".7"/>`;
  return { wall: `${planks}<rect x="400" y="420" width="240" height="170" rx="8" fill="#a8c0dc"/><rect x="400" y="420" width="240" height="170" rx="8" fill="url(#sunGlow)" opacity=".7"/>`
    + `<g fill="#20161a">${[456, 516, 576].map((bx) => `<rect x="${bx}" y="420" width="12" height="170"/>`).join('')}</g>`,
  bars: `<rect x="-200" y="340" width="${W + 400}" height="30" fill="#20161a"/>${bars}` };
}

// Ship with a group standing on deck: the hull is redrawn in front with the same motion so feet sit behind the rail
function shipWithCrew(x, y, s, people) {
  return ship(x, y, s, { crew: false })
    + `<g transform="translate(${f(x)},${f(y)}) scale(${s})"><g${M.sway(2, 5, 0, 0, 0)}><g${M.bob(8, 4.4)}>${people}`
    + '<path d="M-330 -60 L-300 -60 L-280 -40 L-260 -60 L250 -60 Q300 -90 330 -112 L300 40 Q0 70 -290 40 Z" fill="#6b4226"/><path d="M-310 -2 Q0 22 312 -24 L300 40 Q0 70 -290 40 Z" fill="#4e2f1a"/>'
    + '<path d="M-320 -24 Q0 -2 316 -44" stroke="#8a5a34" stroke-width="10" fill="none"/><path d="M-320 -50 L250 -50" stroke="#a8743f" stroke-width="5"/>'
    + '<circle cx="-150" cy="-8" r="9" fill="#2a1a10"/><circle cx="-40" cy="0" r="9" fill="#2a1a10"/><circle cx="70" cy="-2" r="9" fill="#2a1a10"/><circle cx="180" cy="-10" r="9" fill="#2a1a10"/></g></g></g>';
}

const portrait = (x, y, s, extra = {}) => lorenzo(x, y, s, { armL: [24, 2, 3], armR: [24, 2, 3.4], halo: true, propL: palm_frond(1.1, -18), propR: bigRosary(0.85), ...extra });

// Scene-relative times of the lines these events illustrate (sentence start + ~0.5 s, from timings.json)
const T = { family: 5.5, soldiers: 0.8, officer: 1.0, last: 9.0 };

// ---------------------------------------------------------------- scenes
// 0 · hook: portrait over Manila Bay at dusk
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 26, seed: 3 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1170, 520, 0.85))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 5 }) + hill(1165, 20, '#5d3f6c', 2, { freq: 2 })
      + binondo(900, 1170, 0.5, { wall: '#7a5468', trim: '#8e6478', roof: '#54344e', win: '#ffd98a' })
      + `<rect x="-200" y="1165" width="${W + 400}" height="800" fill="url(#seaDusk)"/>`
      + waves(1172, 6, 300, 7, '#7a5a8a', { foam: '#f2b28a', op: 0.9 }) + sparkles(14, 380, 700, 1180, 1250, { seed: 4, color: '#ffe0b0' }))
    + MID(waves(1205, 9, 360, 6, '#3c3a6e', { phase: 1 }) + hill(1262, 14, '#6a4458', 6))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' })
    + `<ellipse cx="540" cy="1300" rx="300" ry="40" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>` + tufts(1296, 10, '#3a2438', { seed: 7 })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${portrait(540, 1270, 2.5, { halo: 0.6 })}</g>`
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · born in Binondo: Chinese father, Filipino mother, altar boy
function scene1() {
  const dad = person(225, 1320, 1.6, { kind: 'layman', robe: true, top: '#3f5f8a', skin: '#e0b48c', hair: '#120d0a', mood: 'happy', talk: [0.3, 5], armL: 8, armR: [30, 4, 2.6],
    over: '<path d="M-5 -205 h10 v200 h-10Z" fill="#2c4466"/><path d="M-41 -278 Q0 -318 41 -278 Q0 -292 -41 -278Z" fill="#1c1a2a"/>' });
  const mom = filipina(730, 1320, 1.55, { mood: 'joy', armL: [36, 4, 2.8], armR: 10, skirt: '#c25a44' });
  const boy = person(490, 1345, 1.2, { kind: 'kid', robe: true, top: '#c8323a', skin: SKL, hair: HAIRL, mood: 'joy', armL: [24, 3, 2.2], armR: [24, 3, 2.5],
    over: '<path d="M-37 -207 Q0 -218 37 -207 L46 -86 Q0 -74 -46 -86Z" fill="#fbf6ea"/><path d="M14 -212 Q30 -211 37 -207 L46 -86 Q34 -80 24 -80Z" fill="#d8d0c0" opacity=".6"/>' });
  return FAR(sky(SKIES.day) + sun(880, 500, 58, 260))
    + BACK(clouds(440, { seed: 2 }) + hill(1090, 30, '#a4cbd0', 3, { freq: 1.4 }))
    + MID(binondo(610, 1190, 1.05) + coconut(40, 1215, 0.8, { lean: 18 }) + lanterns(610, { n: 5 }))
    + ground(1190, '#d8bc84', { rim: '#f2dcae' }) + tufts(1196, 10, '#b8a56c', { seed: 3 })
    + dominican(945, 1300, 1.25, { mood: 'happy', armL: [30, 3, 3], armR: 10, propL: book(false) })
    + dad + mom + boy
    + butterflies(2, { x0: 780, x1: 1030, y0: 730, y1: 860 })
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 9 }));
}

// 2 · calligrapher, confraternity, Rosario and the children
function scene2() {
  const family = `<g${M.in('rise', T.family, 1.0)}>`
    + filipina(780, 1330, 1.55, { mood: 'joy', armL: 12, armR: [24, 3, 3], propR: bigRosary(0.7), hair: '#201610' })
    + person(925, 1345, 1.0, { kind: 'kid', top: '#4b8bc4', skin: SKL, hair: HAIRL, mood: 'joy', armL: [16, 4, 2.2], armR: 8 })
    + person(1015, 1345, 0.9, { kind: 'kid', top: '#d8644e', skin: SKL, hair: HAIRL, girl: true, mood: 'joy', armL: 8, armR: [120, 16, 1.2] })
    + person(655, 1355, 0.78, { kind: 'kid', top: '#e2b448', skin: SKL, hair: HAIRL, mood: 'happy', armL: [20, 3, 2], armR: 10 }) + '</g>';
  return FAR(sky([[0, '#5a8ec0'], [0.42, '#bfe0ec'], [0.7, '#e8f2ea'], [1, '#e8f2ea']]) + sun(180, 540, 56, 240))
    + BACK(clouds(470, { seed: 6 }) + hill(1010, 40, '#a9d39a', 5) + binondo(830, 1050, 0.55))
    + MID(nipa_hut(170, 1180, 1.25) + coconut(1010, 1200, 0.9, { flip: true }) + hill(1150, 20, '#79b264', 8))
    + ground(1170, '#6aa457', { rim: '#9ad07a' }) + tufts(1176, 12, '#4f8a3c', { seed: 5 }) + flowers(1200, 1270, 8, { seed: 9 })
    + lorenzo(340, 1320, 1.95, { mood: 'happy', armL: [20, 1, 3], armR: [30, 3, 1.3], propR: quill })
    + writingDesk(340, 1115, 0.95)
    + family
    + NEAR(foliage('l', 1640, { color: '#24452c', seed: 2 }));
}

// 3 · falsely accused
function scene3() {
  const guards = `<g${M.tw([{ at: T.soldiers, dur: 1.6, from: { x: -380, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }])}>`
    + soldier(120, 1305, 1.45, { armL: 8, armR: 16, propR: halberd })
    + soldier(305, 1325, 1.6, { armL: 8, armR: [78, 3, 2], flip: false }) + '</g>';
  return FAR(sky(SKIES.deep, { stars: 12, seed: 4 }) + glow(240, 980, 420, 0.5))
    + BACK(clouds(520, { color: '#d89a8a', op: 0.4, drift: 30, seed: 8 }))
    + MID(intramuros(1200, { wall: '#6c5560', roof: '#4e2e3a', dome: '#4a3a4e' }))
    + ground(1200, '#4a3644', { rim: '#8a6a7a' }) + tufts(1206, 8, '#2e2030', { seed: 4 })
    + guards
    + lorenzo(620, 1335, 1.95, { mood: 'worried', armL: [36, 3, 1.6], armR: [14, 2, 2] })
    + filipina(860, 1335, 1.5, { mood: 'worried', armL: 24, armR: [46, 3, 2], skirt: '#8a3a4a' })
    + person(1000, 1345, 0.92, { kind: 'kid', top: '#4b8bc4', skin: SKL, hair: HAIRL, mood: 'sad', armL: 8, armR: 24 })
    + motes(10, { y0: 620, y1: 1240, seed: 6, color: '#ffc896' })
    + NEAR(foliage('r', 1650, { color: '#22141e', seed: 3 }));
}

// 4 · the voyage
function scene4() {
  const crew = lazaro(-235, -30, 0.72, { mood: 'happy', armL: 10, armR: 14 })
    + dominican(-120, -30, 0.76, { mood: 'happy', armL: [20, 3, 3], armR: 12, propL: book(false) })
    + dominican(-20, -30, 0.76, { mood: 'determined', skin: '#eac6a4', hair: '#6a4a2e', beard: '#6a4a2e', armL: 10, armR: 14 })
    + dominican(80, -30, 0.76, { mood: 'happy', skin: '#d8a880', hair: '#2a1e14', beard: '#2a1e14', armL: 12, armR: 10 })
    + dominican(165, -30, 0.72, { mood: 'peaceful', skin: '#e2b48f', hair: '#120d0a', beard: null, armL: 10, armR: 10 })
    + lorenzo(258, -56, 0.88, { mood: 'sad', armL: [14, 2, 2], armR: [18, 2, 2.4], propR: bigRosary(0.8) });
  return FAR(sky([[0, '#b8603e'], [0.3, '#f0a46a'], [0.62, '#f8d894'], [1, '#f8d894']]) + sun(220, 560, 64, 330))
    + BACK(clouds(390, { color: '#fff7e8', op: 0.75, seed: 9 }) + gulls(3)
      + `<rect x="-200" y="960" width="${W + 400}" height="1200" fill="url(#seaG)"/>` + waves(970, 8, 260, 7, '#4a8fbb', { foam: '#cfe8f2', op: 0.9 })
      + sparkles(12, 100, 360, 985, 1080, { seed: 8, color: '#fff2c8' }))
    + MID(waves(1030, 12, 320, 6, '#2d6f9c', { phase: 1 }))
    + shipWithCrew(520, 1170, 1.25, crew)
    + waves(1185, 18, 380, 5, '#245d88', { phase: 2, foam: '#9fd0ea' })
    + NEAR(waves(1260, 22, 460, 4.5, '#1b4a70', { phase: 3 }) + waves(1350, 26, 520, 4, '#143a5a', { phase: 4, foam: '#5f97bd' }));
}

// 5 · imprisoned, pressed to renounce
function scene5() {
  const room = prisonRoom(1290);
  const off = `<g${M.tw([{ at: T.officer, dur: 1.2, from: { x: 120, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }])}>`
    + official(830, 1290, 1.55, { flip: true, talk: [T.officer + 0.5, 99], armR: [74, 4, 1.8], armL: 10 }) + '</g>';
  return FAR(room.wall)
    + MID(`<path d="M410 590 L630 590 L790 1290 L250 1290Z" fill="#cfe0f2" opacity=".16" filter="url(#blur14)"/>` + off + room.bars)
    + ground(1270, '#57484c', { rim: '#7c6a6e' })
        + dominican(150, 1335, 1.5, { mood: 'peaceful', kneel: true, armL: -18, armR: -18 })
    + lorenzo(470, 1335, 1.95, { mood: 'sad', kneel: true, armL: -18, armR: -18, propR: bigRosary(0.55) })
    + lazaro(692, 1345, 1.28, { mood: 'worried', kneel: true, armL: 16, armR: 16 })
    + motes(10, { x0: 340, x1: 760, y0: 620, y1: 1200, color: '#d8e6f4', seed: 3, rise: 50 });
}

// 6 · Nishizaka Hill: gallows and pit stand empty; he lifts his free hand with the rosary, refusing
function scene6() {
  return FAR(sky([[0, '#26304e'], [0.36, '#55688a'], [0.62, '#a0a8b4'], [1, '#c8c0b4']]) + glow(830, 820, 420, 0.35))
    + BACK(clouds(500, { color: '#8a94aa', op: 0.55, drift: 30, seed: 7 }) + hill(1040, 54, '#55687e', 3, { freq: 1.3 }) + nagasakiTown(620, 1090, 0.62)
      + `<rect x="-200" y="1100" width="${W + 400}" height="60" fill="#6c8098"/>` + hill(1160, 18, '#4c5868', 5))
    + MID(hill(1215, 14, '#46464e', 6) + gallows(790, 1250, 1.05))
    + ground(1230, '#3e3a3e', { rim: '#6c6668' }) + tufts(1236, 10, '#28262a', { seed: 8 })
    + pit(790, 1266, 1.05)
    + dominican(112, 1300, 1.25, { mood: 'peaceful', armL: 12, armR: 12 })
    + official(965, 1320, 1.45, { flip: true, armR: [62, 3, 2.4], armL: 10 })
    + lorenzo(345, 1335, 2.15, { mood: 'determined', armL: 10, armR: [134, 3, 2.6], propR: bigRosary(0.8) })
    + motes(12, { y0: 560, y1: 1220, seed: 12, color: '#e8ecf4', rise: 40 })
    + NEAR(foliage('l', 1660, { color: '#1c1a22', seed: 6 }));
}

// 7 · "a thousand lives": the moment of death is not shown; light, halo and palm over the bay where his ashes were scattered
function scene7() {
  const palm = M.tw([{ at: 0.8, dur: 1.2, from: { opacity: 0 }, to: { opacity: 1 } }, { at: 0.8, dur: 7, from: { y: 0 }, to: { y: 170 }, ease: 'power2.out' }]);
  return FAR(sky(SKIES.deep, { stars: 36, seed: 8 }) + rays(540, 520, { op: 0.09 }) + glow(540, 760, 480, 0.7))
    + BACK(hill(1040, 34, '#3a2a48', 3, { freq: 1.2 }) + gallows(120, 1120, 0.55, { wood: '#241a2a' })
      + `<rect x="-200" y="1090" width="${W + 400}" height="900" fill="url(#seaDusk)"/>` + waves(1100, 8, 300, 8, '#6a4f7e', { op: 0.8, foam: '#d89a8a' }) + sparkles(16, 320, 800, 1110, 1200, { seed: 4, color: '#ffe0b0' }))
    + MID(waves(1215, 10, 420, 9, '#3a2a48') + `<g${M.in('fade', 1.5, 2.5)}><path d="M440 340 L640 340 L880 1320 L200 1320Z" fill="url(#beam)" opacity=".55" filter="url(#blur14)"/></g>`)
    + ground(1262, '#5a4468', { rim: '#8a6a8c' })
    + `<ellipse cx="540" cy="1345" rx="300" ry="46" fill="#ffd98a" opacity=".3" filter="url(#blur14)"/>` + lorenzo(540, 1345, 2.25, { mood: 'peaceful', kneel: true, armL: -18, armR: -18, propR: bigRosary(0.55), halo: T.last })
    + `<g transform="translate(860,500)"><g${palm}>${palm_frond(1.5, 0, 10)}</g></g>`
    + motes(24, { x0: 200, x1: 880, y0: 560, y1: 1260, color: '#fff2c4', seed: 2, rise: 130 })
    + NEAR(foliage('r', 1660, { color: '#1a1224', seed: 4 }));
}

// 8 · beatified in Manila, canonized in Rome
function scene8() {
  const banner = `<g transform="translate(540,540)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + '<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>'
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${portrait(0, 410, 0.95, { armL: 22, armR: 22, propL: palm_frond(1.0, -15), propR: bigRosary(0.85) })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7))
    + BACK(clouds(830, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + basilica(540, 1190, 1.05, { color: '#3a2a40' }))
    + banner
    + ground(1190, '#3a2a40')
    + crowd(1420, 12, { flags: [['#0038a8', '#ce1126', '#fbf8ec']] })
    + petals(26, { seed: 3 });
}

// 9 · feast and patronage: youth, workers leaving home, separated families
function scene9() {
  const worker = person(105, 1340, 1.35, { kind: 'layman', top: '#5fa8b8', pants: '#5fa8b8', skin: SKIN.s1, hair: '#1a120c', girl: true, mood: 'joy', armR: 8, armL: 14,
    propL: '<g><rect x="-26" y="-6" width="52" height="46" rx="6" fill="#7a5536"/><path d="M-10 -6 v-10 h20 v10" stroke="#5a3d22" stroke-width="5" fill="none"/><rect x="-26" y="10" width="52" height="6" fill="#5a3d22"/></g>' });
  const dad = person(275, 1350, 1.3, { kind: 'layman', top: '#d8644e', pants: '#3a3a4a', skin: SKIN.s0, hair: '#1a120c', mood: 'joy', armL: 10, armR: 12 });
  const teen = person(810, 1350, 1.2, { kind: 'kid', top: '#e2b448', pants: '#3a3a4a', skin: SKIN.s2, hair: '#1a120c', girl: true, mood: 'joy', armL: 10, armR: 10 });
  const child = person(960, 1350, 1.05, { kind: 'kid', top: '#6aa457', pants: '#3a3a4a', skin: SKIN.s1, hair: '#1a120c', mood: 'joy', armL: 10, armR: [130, 16, 1.1] });
  return FAR(sky([[0, '#3a3a7a'], [0.4, '#c07a8a'], [0.7, '#f6b97a'], [1, '#fbe0a8']], { stars: 10, seed: 6 }) + rays(540, 620, { op: 0.1 }) + glow(540, 1120, 540, 0.85))
    + BACK(clouds(520, { color: '#ffd8b8', op: 0.45, drift: 30, seed: 3 }) + hill(1190, 40, '#6a5a7a', 3) + binondo(725, 1215, 0.55, { wall: '#7a5468', trim: '#8e6478', roof: '#54344e', win: '#ffd98a' }))
    + MID(coconut(50, 1250, 0.95, { lean: 24 }) + coconut(1030, 1260, 1.0, { flip: true, lean: 22 }))
    + ground(1290, '#4a3e5a', { rim: '#8a6a8a' })
    + portrait(540, 1280, 2.25)
    + worker + dad + teen + child
    + motes(16, { y0: 600, y1: 1250, seed: 11 })
    + petals(14, { seed: 8, colors: ['#ffe2a0', '#ffffff'] });
}

export const STORY = {
  slug: 'st_lorenzo_ruiz', name: 'St_Lorenzo_Ruiz',
  voice: 'am_michael', speed: 1.0,
  thumb_title: 'St. Lorenzo Ruiz', thumb_hook: 'If I had a thousand lives...', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'baɪnˈɑːndoʊ': 'biːnˈɔːndoʊ',    // Binondo
    'ɹoʊzˈɑːɹɹɪˌoʊ': 'ɹoʊsˈɑːɹioʊ',  // Rosario
    'læzˈæɹoʊ': 'lˈɑːsɑːɹoʊ',        // Lazaro
    'nˌæɡɐsˈæki': 'nˌɑːɡəsˈɑːki',    // Nagasaki
    'ˌɑːkɪnˈɑːwə': 'ˌoʊkiːnˈɑːwə',   // Okinawa
    'nˌɪʃɪzˈɑːkə': 'nˌiːʃiːzˈɑːkə',  // Nishizaka
    'tˈæɡɐlˌɑːɡ': 'tɐɡˈɑːlɔːɡ',      // Tagalog
    'ɹuːˈiːz': 'ɹuːˈiːs',            // Ruiz -> roo-EES
  },
  scenes: [
    { kicker: 'MANILA · NAGASAKI', title: 'From Clerk to Saint', art: scene0, cam: { move: 'push', amt: 0.07, oy: 800 },
      say: ['How did a church clerk with three children become the first Filipino saint?', 'This is Saint Lorenzo Ruiz.'] },
    { kicker: 'c. 1594 · BINONDO, MANILA', title: 'Son of Two Peoples', art: scene1, cam: 'pan-l',
      say: ['Lorenzo was born around 1594 in Binondo, Manila, to a Chinese father and a Filipino mother.',
        'His father taught him Chinese, and his mother taught him Tagalog.', 'He grew up an altar boy, taught by the Dominican friars.'] },
    { kicker: 'BINONDO CHURCH', title: 'The Calligrapher', art: scene2, cam: 'drift-r',
      say: ['His beautiful handwriting earned him work as a church clerk, copying documents.',
        'He joined the Confraternity of the Rosary, and married Rosario. They had three children.'] },
    { kicker: '1636 · MANILA', title: 'Falsely Accused', art: scene3, cam: { move: 'push', amt: 0.06, ox: 620, oy: 900 },
      say: ['Then, in 1636, Lorenzo was falsely accused of a killing.', 'Fearing for his life, he sought refuge with Dominican missionaries, and left his family behind.'] },
    { kicker: 'JUNE 10, 1636 · TO JAPAN', title: 'Setting Sail', art: scene4, cam: 'pan-r',
      say: ['On June 10, he sailed with three Dominican priests, a Japanese priest, and a man with leprosy named Lazaro.',
        'They were bound for Japan. They landed at Okinawa, and were arrested.'] },
    { kicker: 'OKINAWA · NAGASAKI', title: 'Imprisoned', art: scene5, cam: 'drift-l',
      say: ['They were locked in prison, and tortured to make them give up their faith.', 'Then they were taken to Nagasaki, for one last trial.'] },
    { kicker: 'SEPT. 27, 1637 · NAGASAKI', title: 'One Hand Left Free', art: scene6, cam: { move: 'push', amt: 0.06, ox: 400, oy: 950 },
      say: ['On September 27, 1637, on Nishizaka Hill, he was hung over a pit.', 'One hand was left free, so he could signal that he renounced his faith.', 'He never did.'] },
    { kicker: 'HIS LAST WORDS', title: 'A Thousand Lives', art: scene7, cam: 'tilt-up',
      say: ['"I am a Catholic," he said, "and I wholeheartedly accept death for God."', '"If I had a thousand lives, I would offer them all to Him."', 'He died on that hill, and his ashes were scattered on the sea.'] },
    { kicker: '1981 MANILA · 1987 ROME', title: 'First Filipino Saint', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 800 },
      say: ['In 1981, Pope John Paul II beatified him in Manila.', 'In 1987, in Rome, he was canonized with fifteen companions.'] },
    { kicker: 'FEAST DAY · SEPTEMBER 28', title: 'Patron of Filipinos', art: scene9, cam: { move: 'push', amt: 0.06, oy: 950 },
      say: ['His feast is September 28.', 'He is the patron of the Philippines, of Filipino youth, of overseas workers, and of separated families.', 'Saint Lorenzo Ruiz, pray for us.'] },
  ],
};
