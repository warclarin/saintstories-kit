// St. Frances Xavier Cabrini (US memorial: November 13). New York tenements, Liberty silhouette, mule, hospital, courthouse exported for later reels.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, gulls, butterflies, person, book, ship, basilica, crowd, ground, dark, light, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { assisi, tree, flyer } from './francis.mjs';
import { horse, rider, romChurch } from './martin_of_tours.mjs';
import { cypress } from './nicholas.mjs';

const SKC = '#f0c9a8', HABIT = '#1e1a22';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ---------------------------------------------------------------- Cabrini + props
// Missionary Sisters of the Sacred Heart: black habit and veil, white ruffled bonnet edge, bow under the chin, small gold cross
const ruffle = '<path d="M-40 -232 Q-46 -296 0 -300 Q46 -296 40 -232" stroke="#fbf8f0" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M-40 -232 Q-46 -296 0 -300 Q46 -296 40 -232" stroke="#d8d2c6" stroke-width="3" fill="none" stroke-dasharray="2 7" opacity=".8"/>';
const bow = `<path d="M0 -204 L-22 -214 L-22 -194Z M0 -204 L22 -214 L22 -194Z" fill="${HABIT}"/><circle cx="0" cy="-204" r="5" fill="#3a3440"/>`;
const smallCrossChest = `<path d="M0 -176 v34 M-11 -164 h22" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
export const cabrini = (x, y, s, o = {}) => person(x, y, s, { kind: 'nun', top: HABIT, veil: HABIT, skin: SKC, ...o, over: ruffle + bow + smallCrossChest + (o.over || '') });
const sister = (x, y, s, o = {}) => person(x, y, s, { kind: 'nun', top: HABIT, veil: HABIT, ...o, over: ruffle + bow + (o.over || '') });
export const paperBoat = (x, y, s = 1, ph = 0) => `<g transform="translate(${x},${y}) scale(${s})"><g${M.bob(4, 1.8 + ph, ph)}>`
  + `<path d="M-34 0 L34 0 L22 16 L-22 16Z" fill="#fbf6ea"/><path d="M20 0 L34 0 L22 16 L14 16Z" fill="#d8d0c0"/><path d="M0 -38 L0 0 L-26 0Z" fill="#f2ead8"/>`
  + `<circle cx="-6" cy="-6" r="5" fill="#8a5ac4"/><circle cx="5" cy="-4" r="5" fill="#a070d8"/><circle cx="0" cy="-12" r="4" fill="#7a4ab4"/></g></g>`;
const violets = '<g><circle cx="-8" cy="-4" r="7" fill="#8a5ac4"/><circle cx="6" cy="-8" r="7" fill="#a070d8"/><circle cx="0" cy="6" r="7" fill="#7a4ab4"/><circle cx="0" cy="-2" r="3" fill="#f2c46b"/></g>';
const suitcase = `<g><rect x="-26" y="-6" width="52" height="38" rx="5" fill="#7a5536"/><rect x="-26" y="-6" width="52" height="8" fill="#5a3d22"/><path d="M-10 -6 v-8 h20 v8" stroke="#5a3d22" stroke-width="4" fill="none"/></g>`;
const certificate = `<g transform="translate(0,-14)"><rect x="-26" y="-34" width="52" height="40" rx="3" fill="#fbf6ea"/><path d="M-16 -22 h32 M-16 -14 h32 M-16 -6 h20" stroke="#b0a080" stroke-width="2.5"/><circle cx="14" cy="-2" r="6" fill="${GOLD}"/></g>`;

// ---------------------------------------------------------------- set pieces
export function tenements(y, { brick = '#8a4a3a', win = '#ffd98a', lit = 0.5 } = {}) {
  let s = '';
  [[-120, 230, 520], [110, 220, 600], [330, 210, 470], [560, 240, 560], [790, 220, 500], [1010, 230, 580], [1220, 220, 520]].forEach(([x, w, h], i) => {
    const c = i % 2 ? brick : light(brick, 0.08);
    s += `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x + w / 6}" y="${y - h}" width="${w / 3}" height="${h}" fill="${dark(c, 0.25)}" opacity=".5"/>`
      + `<rect x="${x - w / 2 - 6}" y="${y - h - 12}" width="${w + 12}" height="14" fill="${dark(c, 0.3)}"/>`;
    for (let r = 0; r < Math.floor((h - 60) / 90); r++) for (let k = 0; k < 3; k++) {
      const wx = x - w / 2 + 28 + k * (w - 56) / 2 - 14, wy = y - h + 40 + r * 90;
      s += `<rect x="${f(wx)}" y="${wy}" width="28" height="44" rx="3" fill="${(r + k + i) % 3 ? dark(c, 0.45) : win}" opacity="${(r + k + i) % 3 ? 1 : lit + 0.4}"/>`;
    }
    s += Array.from({ length: Math.floor((h - 80) / 90) }, (_, r) => `<rect x="${x - w / 2 + 14}" y="${y - h + 86 + r * 90}" width="${w - 28}" height="5" fill="#2a2228"/>`).join('');
  });
  return s;
}
export function liberty(x, y, s = 1, c = '#7aa89a') {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="${c}"><path d="M-60 0 L-40 -60 L40 -60 L60 0Z" fill="${dark(c, 0.25)}"/><rect x="-30" y="-120" width="60" height="62" fill="${dark(c, 0.15)}"/>`
    + `<path d="M-26 -120 Q-34 -230 -14 -300 L14 -300 Q30 -230 26 -120Z"/><circle cx="0" cy="-316" r="18"/>`
    + `<path d="M-18 -330 L-26 -352 M-8 -334 L-10 -358 M4 -334 L6 -358 M14 -330 L24 -352" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`
    + `<path d="M14 -290 L36 -360" stroke="${c}" stroke-width="12" stroke-linecap="round"/><path d="M28 -372 L44 -372 L40 -360 L32 -360Z"/>`
    + `<ellipse cx="36" cy="-384" rx="9" ry="13" fill="#ffd98a"${M.flick(1.2, 0, 0.6)}/><rect x="-26" y="-250" width="18" height="30" rx="3" fill="${dark(c, 0.2)}"/></g>`;
}
export function hospital(x, y, s = 1, { wall = '#e8dcc6', win = '#ffe6a8' } = {}) {
  let wins = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) wins += `<rect x="${-250 + k * 90}" y="${-400 + r * 90}" width="40" height="54" rx="4" fill="${win}" opacity=".85"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-290" y="-460" width="580" height="460" fill="${wall}"/><rect x="100" y="-460" width="190" height="460" fill="${dark(wall, 0.2)}" opacity=".5"/>`
    + `<rect x="-300" y="-476" width="600" height="20" fill="${dark(wall, 0.3)}"/>${wins}<path d="M-50 0 v-90 a50 50 0 0 1 100 0 v90Z" fill="${dark(wall, 0.5)}"/>`
    + `<path d="M0 -540 v60 M-22 -518 h44" stroke="${GOLD}" stroke-width="10"/></g>`;
}
export function courthouse(x, y, s = 1, { wall = '#ece4d4' } = {}) {
  const cols = Array.from({ length: 6 }, (_, i) => `<rect x="${-190 + i * 72}" y="-260" width="30" height="230" fill="${light(wall, 0.08)}"/><rect x="${-176 + i * 72}" y="-260" width="12" height="230" fill="${dark(wall, 0.15)}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-260" y="-30" width="520" height="30" fill="${dark(wall, 0.1)}"/><rect x="-230" y="-290" width="460" height="30" fill="${wall}"/>`
    + `<path d="M-250 -290 L0 -390 L250 -290Z" fill="${wall}"/><path d="M0 -390 L250 -290 L80 -290Z" fill="${dark(wall, 0.15)}"/>${cols}`
    + `<rect x="-3" y="-470" width="6" height="84" fill="#6a6a6a"/><g transform="translate(3,-466)"><g${M.sway(5, 1.4, 0, 0, 0)}>`
    + `<rect width="70" height="44" fill="#f6f2e8"/>${[0, 1, 2, 3].map((i) => `<rect y="${i * 11}" width="70" height="5.5" fill="#c8323a"/>`).join('')}<rect width="30" height="24" fill="#2f4a8a"/></g></g></g>`;
}
const peak = (x, y, s, c, snow = '#f6f0f4') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-400 0 L-40 -330 Q0 -350 40 -330 L400 0Z" fill="${c}"/><path d="M-86 -288 L-40 -330 Q0 -350 40 -330 L86 -288 L50 -270 L20 -292 L-10 -268 L-40 -292Z" fill="${snow}" opacity=".9"/></g>`;
function canal(y) {
  return `<rect x="-200" y="${y}" width="${W + 400}" height="150" fill="#5a9cc4"/>` + waves(y + 6, 4, 220, 6, '#6aaad0', { foam: '#d9f0f7' }) + waves(y + 60, 5, 260, 5, '#4a8cb4', { foam: '#c9e4f2', phase: 1 });
}
const kidsRow = (y, s = 1.15) => [[130, '#4b8bc4', SKIN.s1, false], [270, '#e2b448', SKIN.fair, true], [810, '#d8644e', '#6e4428', true], [950, '#6aa457', SKIN.priest, false]]
  .map(([x, top, skin, girl], i) => person(x, y, s, { mood: 'joy', kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#c98a3a' : '#2a1a10', pants: '#3a3a4a', armL: 14, armR: i % 2 ? [120, 14, 1.3] : 14 })).join('');

// ---------------------------------------------------------------- scenes
// 0 · hook: on the deck of a ship, afraid of water, crossing anyway
function scene0() {
  return FAR(sky(SKIES.sunrise) + sun(820, 640, 60, 320))
    + BACK(clouds(470, { color: '#fff4e4', op: 0.8, seed: 4 }) + gulls(3, { y: 560 }))
    + `<rect x="-200" y="1040" width="${W + 400}" height="900" fill="url(#seaG)"/>`
    + waves(1046, 6, 260, 6, '#5a9cc4', { foam: '#d9f0f7' }) + waves(1110, 8, 240, 5, '#4a8cb4', { foam: '#c9e4f2', phase: 1 })
    + MID(`<g${M.drift(-40)}>${ship(860, 1120, 0.5, { crew: false })}</g>`)
    + `<g${M.bob(6, 4.2)}><path d="M-200 1250 L1280 1250 L1280 1700 L-200 1700Z" fill="#7a5536"/><path d="M-200 1250 H1280" stroke="#a8743f" stroke-width="14"/>`
    + Array.from({ length: 12 }, (_, i) => `<rect x="${-60 + i * 100}" y="1190" width="12" height="62" fill="#5a3d22"/>`).join('') + `<rect x="-200" y="1186" width="${W + 400}" height="12" fill="#8a5a34"/></g>`
    + `<g${M.in('pop', 0, 1.0, 540, 1300)}>${cabrini(540, 1320, 2.3, { mood: 'determined', halo: 0.6, armL: [24, 2, 3], armR: [40, 3, 3.4], propR: suitcase })}</g>`
    + motes(10, { y0: 600, y1: 1200, seed: 2 })
    + NEAR(waves(1500, 10, 300, 4, '#3a7aa4', { foam: '#d9f0f7', phase: 2 }));
}

// 1 · 1850, Lombardy: paper boats with violets, and the canal
function scene1() {
  return FAR(sky(SKIES.day) + sun(860, 520, 54, 250))
    + BACK(clouds(460, { seed: 5 }) + hill(1020, 40, '#a8c9b0', 3) + assisi(560, 1060, 0.75, { hillC: '#9cbf80' }))
    + MID(tree(80, 1150, 0.55, '#5a9a4a') + tree(1000, 1140, 0.5, '#4b8a46'))
    + ground(1130, '#8fbe6a', { rim: '#b4dc8a' })
    + canal(1170)
    + paperBoat(300, 1230, 1.2, 0.2) + `<g${M.drift(180)}>${paperBoat(120, 1270, 1.0, 0.8)}</g>` + `<g${M.drift(140)}>${paperBoat(-40, 1220, 0.9, 1.4)}</g>`
    + ground(1320, '#86b86a', { rim: '#b0dc8a' }) + flowers(1330, 1400, 10, { seed: 6, colors: ['#8a5ac4', '#a070d8', '#ffffff'] })
    + person(660, 1360, 1.45, { kind: 'kid', girl: true, top: '#c47a8a', pants: '#7a4a5a', skin: SKC, hair: '#3a2416', mood: 'joy', armL: [50, 4, 2.6], armR: 16, propL: violets })
    + butterflies(2, { x0: 600, x1: 950, y0: 900, y1: 1050, seed: 4 })
    + NEAR(foliage('r', 1650, { color: '#2f5a35', seed: 3 }));
}

// 2 · turned away; the orphanage; a new order
function scene2() {
  const kids = [[760, '#6a8ab0', true], [880, '#b8a070', false], [980, '#a86a6a', true]].map(([x, top, girl], i) => person(x, 1300, 1.0, { kind: 'kid', top, girl, skin: SKC, hair: '#3a2416', pants: '#4a3a40', mood: 'joy', flip: true, armL: 12, armR: i === 1 ? [110, 10, 1.4] : 12 })).join('');
  const sisters = [[230, 'happy'], [360, 'joy']].map(([x, mood]) => sister(x, 1290, 1.25, { skin: [SKC, '#e6bc96'][x > 300 ? 1 : 0], mood, armL: [40, 2, 3], armR: [40, 2, 3.2] })).join('');
  return FAR(sky(SKIES.sunrise) + sun(540, 600, 56, 280))
    + BACK(clouds(470, { color: '#fff4e4', op: 0.7, seed: 7 }) + hill(1080, 30, '#c9b08a', 5))
    + MID(romChurch(540, 1220, 1.05, { wall: '#e8d8b8', roof: '#a86a4a' }) + cypress(980, 1220, 0.8, '#3a5a3a'))
    + ground(1230, '#d9c49a', { rim: '#f2e2bc' }) + tufts(1236, 10, '#b8a070', { seed: 3 })
    + sisters + kids
    + cabrini(560, 1330, 1.9, { mood: 'happy', armL: [30, 2, 3], armR: [60, 3, 2.8], propL: book(false) })
    + flowers(1290, 1360, 8, { seed: 9 })
    + NEAR(foliage('l', 1640, { color: '#4a5a2e', seed: 2 }));
}

// 3 · 1887, Rome: "Not to the East, but to the West"
function scene3() {
  const pope = person(320, 1320, 1.75, { kind: 'priest', top: '#f6f2ea', collar: false, skin: '#f0d6bc', hair: '#e8e4dc', beard: null, mood: 'happy', talk: [3.0, 6.5],
    over: `<ellipse cx="0" cy="-286" rx="30" ry="12" fill="#fbf8f0"/><path d="M-40 -206 Q0 -186 40 -206 L36 -170 Q0 -156 -36 -170Z" fill="#c8323a"/>`, armL: 12, armR: [70, 4, 2.6] });
  return FAR(sky(SKIES.gold) + rays(540, 600, { op: 0.11 }) + glow(540, 640, 420, 0.7))
    + BACK(clouds(470, { color: '#fff0d4', op: 0.7, seed: 11 }) + basilica(540, 1160, 0.95, { color: '#c98a6a', glow: false }))
    + ground(1220, '#d9b88a', { rim: '#f2d8aa' })
    + `<rect x="200" y="1220" width="680" height="400" fill="#9a2e3a" opacity=".85"/><rect x="200" y="1220" width="10" height="400" fill="${GOLD}"/><rect x="870" y="1220" width="10" height="400" fill="${GOLD}"/>`
    + pope
    + cabrini(720, 1330, 1.85, { mood: 'surprised', flip: true, armL: [40, 2, 3], armR: [40, 2, 3.2] })
    + petals(12, { seed: 5, colors: ['#ffffff', '#f2c46b'] })
    + NEAR(foliage('r', 1650, { color: '#5a3a2a', seed: 4 }));
}

// 4 · March 31, 1889, New York: a cold welcome
function scene4() {
  const sisters = [[260, 'worried'], [380, 'happy'], [820, 'worried']].map(([x, mood], i) => sister(x, 1300, 1.2, { skin: [SKC, '#e6bc96', '#f0d6bc'][i], mood, flip: i === 2, armL: [30, 2, 3], armR: i === 1 ? [30, 2, 3] : 10, propR: i === 1 ? suitcase : '' })).join('');
  return FAR(sky([[0, '#3a4468'], [0.55, '#8a92b0'], [1, '#c4c4d0']]))
    + BACK(clouds(520, { color: '#b4b8cc', op: 0.6, drift: 40, seed: 3 }) + liberty(980, 1060, 1.0, '#6a9a8c'))
    + MID(tenements(1240, { brick: '#7a4a40', lit: 0.3 }))
    + ground(1240, '#6a6670', { rim: '#8a8890' })
    + sisters
    + cabrini(580, 1330, 1.95, { mood: 'determined', armL: [26, 2, 3], armR: [20, 2, 3.2], propL: suitcase })
    + petals(20, { seed: 8, colors: ['#e8eef8', '#ffffff'], fall: 600 })
    + NEAR(`<rect x="-200" y="1580" width="${W + 400}" height="500" fill="#2a2630" opacity=".55" filter="url(#blur14)"/>`);
}

// 5 · builder of hope: over twenty crossings, a mule over the Andes, 67 institutions
function scene5() {
  const hx = 560, hy = 1330, hs = 1.25;
  return FAR(sky(SKIES.sunrise) + sun(220, 600, 54, 280))
    + BACK(peak(300, 1100, 1.1, '#9a9ac0') + peak(820, 1080, 1.3, '#8a8ab8') + clouds(560, { color: '#fff4e4', op: 0.6, seed: 13 }))
    + MID(hill(1200, 40, '#a88a6a', 4) + `<g${M.in('rise', 4.0, 1.0)}>${hospital(160, 1230, 0.35)}${romChurch(930, 1230, 0.4, { wall: '#efe2c4', roof: '#a86a4a' })}</g>`)
    + ground(1240, '#b89a72', { rim: '#d8be92' }) + tufts(1246, 10, '#8a7a52', { seed: 4 })
    + horse(hx, hy, hs, { c: '#8a6a4a', mane: '#4a3424', cloth: '#5a5a7a', walk: true })
    + rider(cabrini, hx, hy, hs, 1.5, { mood: 'joy', armL: [30, 2, 3], armR: [60, 4, 2.6] })
    + motes(10, { y0: 600, y1: 1200, seed: 5 })
    + NEAR(foliage('l', 1640, { color: '#4a3a2a', seed: 6 }));
}

// 6 · 1909, Seattle: a citizen of the United States
function scene6() {
  return FAR(sky(SKIES.day) + sun(860, 520, 50, 240))
    + BACK(peak(540, 1060, 1.2, '#a8b4cc') + clouds(470, { seed: 9 }))
    + MID(courthouse(540, 1230, 0.95) + cypress(80, 1240, 0.9, '#2f5a3a') + cypress(1000, 1240, 0.95, '#2f5a3a'))
    + ground(1240, '#9ac06e', { rim: '#b8e08e' }) + tufts(1246, 10, '#6aa457', { seed: 6 })
    + cabrini(540, 1330, 2.0, { mood: 'joy', armL: [26, 2, 3], armR: [70, 4, 2.6], propR: certificate })
    + flyer(200, 700, '#f6f0e2', 0.8, { ph: 0.3 }) + flyer(820, 640, '#f6f0e2', 0.7, { dx: 80, ph: 1.0 })
    + petals(10, { seed: 2, colors: ['#ffffff', '#f2c46b'] })
    + NEAR(foliage('r', 1650, { color: '#2f5a35', seed: 1 }));
}

// 7 · December 22, 1917, Chicago: at the hospital she founded
function scene7() {
  const sisters = [[200, 'sad'], [880, 'peaceful']].map(([x, mood], i) => sister(x, 1300, 1.2, { skin: i ? '#e6bc96' : SKC, mood, flip: i === 1, armL: [40, 2, 3], armR: [40, 2, 3.3] })).join('');
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 3 }) + rays(540, 720, { op: 0.08 }))
    + BACK(tenements(1150, { brick: '#4a3a4a', lit: 0.4 }))
    + MID(hospital(540, 1230, 0.85, { wall: '#c8b8b0', win: '#ffd98a' }))
    + ground(1240, '#4a3a4c', { rim: '#8a6a8a' })
    + petals(18, { seed: 6, colors: ['#ffffff', '#e8eef8'], fall: 500 })
    + `<g${M.tw([{ at: 2.4, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(450, 640, 330, 760, 1340, 0.55)}${motes(14, { x0: 360, x1: 720, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + sisters
    + cabrini(545, 1330, 1.95, { mood: 'peaceful', halo: 2.8, armL: [30, 2, 3], armR: [30, 2, 3.3] })
    + NEAR(foliage('l', 1640, { color: '#2a1a34', seed: 2 }));
}

// 8 · 1946, Rome: the first American citizen saint; patroness of immigrants (1950)
function scene8() {
  const banner = `<g transform="translate(540,520)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${cabrini(0, 400, 0.82, { halo: true, mood: 'happy', armL: [26, 2, 3], armR: [26, 2, 3.3] })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return FAR(sky(SKIES.gold) + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7))
    + BACK(clouds(860, { color: '#ffe2b8', op: 0.5, seed: 16, drift: 30 }) + basilica(540, 1180, 1.05, { color: '#3a2a40' }))
    + banner
    + ground(1180, '#3a2a40')
    + MID(crowd(1400, 12, { flags: [['#f2c46b', '#f6f2e8', '#f2c46b'], ['#f6f2e8', '#f2c46b', '#f6f2e8']] }))
    + petals(24, { seed: 2 });
}

// 9 · US memorial November 13
function scene9() {
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + `<rect x="-200" y="1120" width="${W + 400}" height="200" fill="#6a5a8a"/>` + waves(1126, 4, 240, 7, '#7a6a9a', { foam: '#e6dcf4' }) + liberty(930, 1120, 0.7, '#5a8a80'))
    + glow(540, 1100, 500, 0.85)
    + MID(`<g${M.drift(-50)}>${ship(160, 1150, 0.32, { crew: false })}</g>`)
    + ground(1240, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1246, 10, '#3a2438', { seed: 7 })
    + cabrini(540, 1262, 2.3, { mood: 'joy', halo: 0.3, armL: [40, 3, 3], armR: [40, 3, 3.4] })
    + kidsRow(1330)
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_frances_cabrini', name: 'St_Frances_Cabrini',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'Afraid of water, she crossed oceans', thumb_title: 'St. Frances Cabrini', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'nˈaɪntiːnhˈʌndɹɪd nˈaɪn': 'nˈaɪntiːn ˈoʊ nˈaɪn',   // 1909 -> nineteen oh nine
    'wˈʌn θˈaʊzənd ˈeɪthˈʌndɹɪd': 'ˈeɪtiːn',           // 1850, 1887, 1889
    'nˈaɪntiːnhˈʌndɹɪd': 'nˈaɪntiːn',                 // 1917, 1946, 1950
    'fɹˈæntʃɛskə': 'fɹɑːntʃˈɛskə',                    // Francesca
  },
  scenes: [
    { kicker: 'MOTHER OF IMMIGRANTS', title: 'St. Frances Cabrini', art: scene0, cam: { move: 'push', amt: 0.07, oy: 950 },
      say: ['She was afraid of water, yet she crossed the ocean more than twenty times to serve the poor.', 'This is Saint Frances Xavier Cabrini.'] },
    { kicker: '1850 · LOMBARDY, ITALY', title: 'Paper Boats', art: scene1, cam: 'pan-r',
      say: ['Francesca was born in 1850 near Milan, the youngest of thirteen children in a farming family.',
        'She sailed paper boats filled with violets, dreaming of missionaries in faraway lands.', 'But one day she fell into a canal, and nearly drowned.'] },
    { kicker: 'CODOGNO, ITALY', title: 'Turned Away', art: scene2, cam: 'drift-l',
      say: ['Convents turned her down because of her poor health, so she was sent to run a struggling orphanage.',
        'There, she founded the Missionary Sisters of the Sacred Heart, and took the name Frances Xavier.'] },
    { kicker: '1887 · ROME', title: 'West, Not East', art: scene3, cam: { move: 'push', amt: 0.07, ox: 520, oy: 1000 },
      say: ['She longed to go to China as a missionary.', 'But in 1887, Pope Leo the Thirteenth told her: not to the East, but to the West.'] },
    { kicker: 'MARCH 31, 1889 · NEW YORK', title: 'A Cold Welcome', art: scene4, cam: 'pan-l',
      say: ['On March 31, 1889, she landed in New York with a few sisters, to serve poor Italian immigrants.',
        'No convent was ready, so they spent their first night in a run-down lodging house.'] },
    { kicker: 'THE AMERICAS', title: 'Builder of Hope', art: scene5, cam: 'pan-r',
      say: ['She opened schools and orphanages, and kept going.', 'She crossed the Atlantic again and again, and even rode a mule over the Andes.',
        'In all, she founded sixty seven schools, hospitals and orphanages.'] },
    { kicker: '1909 · SEATTLE', title: 'An American Citizen', art: scene6, cam: { move: 'drift-r', amt: 0.07 },
      say: ['In 1909, in Seattle, she became a citizen of the United States.'] },
    { kicker: 'DECEMBER 22, 1917 · CHICAGO', title: 'Home to God', art: scene7, cam: 'tilt-up',
      say: ['She died on December 22, 1917, in Chicago, at Columbus Hospital, which she had founded.', 'She was sixty seven.'] },
    { kicker: 'JULY 7, 1946 · ROME', title: 'First Citizen Saint', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 900 },
      say: ['In 1946, Pope Pius the Twelfth declared her a saint, the first American citizen ever canonized.', 'In 1950, he named her the patroness of immigrants.'] },
    { kicker: 'FEAST DAY · NOVEMBER 13', title: 'Mother of Immigrants', art: scene9, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['In the United States, her feast day is November 13.', 'Saint Frances Xavier Cabrini, pray for us.'] },
  ],
};
