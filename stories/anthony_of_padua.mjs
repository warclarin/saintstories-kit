// St. Anthony of Padua (feast: June 13). Young beardless Franciscan in a brown habit with tonsure and hood, holding the
// Child Jesus and a lily; Augustinian canon (black cassock, white rochet) before he became a friar. New set pieces
// (exported for later reels): Lisbon Cathedral (Sé), reliquary casket, wooden pulpit, Basilica of St. Anthony (Il Santo),
// walnut-tree cell of Camposampiero, found key, storm rain and lightning.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, person, book, lily, palm_frond, bread_basket, ship, crowd, ground, dark, light, bokeh, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { tree } from './francis.mjs';
import { mitre } from './francis.mjs';
import { cloister } from './martin_de_porres.mjs';
import { dominican } from './lorenzo_ruiz.mjs';
import { stoneRoom, graceFriary } from './padre_pio.mjs';
import { fish, candle } from './peter.mjs';
import { colonialTown } from './aparecida.mjs';

const SKA = '#e8b48e', HAIRA = '#4a3020', HABIT = '#6b4a2e';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const STORM = [[0, '#1e2236'], [0.45, '#3a4560'], [0.7, '#6a7488'], [1, '#8a8f9a']];

// ---------------------------------------------------------------- Anthony and companions
const tonsureA = `<ellipse cx="0" cy="-289" rx="21" ry="8" fill="${SKA}"/><ellipse cx="6" cy="-288" rx="10" ry="5" fill="${dark(SKA, 0.2)}" opacity=".35"/>`;
const hoodA = `<path d="M-41 -213 Q0 -196 41 -213 Q47 -190 31 -178 Q0 -170 -31 -178 Q-47 -190 -41 -213Z" fill="${dark(HABIT, 0.08)}"/><path d="M-30 -204 Q0 -192 30 -204" stroke="${light(HABIT, 0.2)}" stroke-width="3" fill="none" opacity=".6"/>`;
const rochet = '<path d="M-37 -207 Q0 -218 37 -207 L50 -64 Q0 -52 -50 -64Z" fill="#f6f2ea"/><path d="M14 -211 Q30 -210 37 -207 L50 -64 Q36 -59 24 -57Z" fill="#d9d2c4" opacity=".6"/>'
  + '<path d="M-50 -64 Q0 -52 50 -64" stroke="#e2dccf" stroke-width="4" fill="none"/>';
// Child Jesus (no rig halo: a small ring keeps it off Anthony's face)
export const childJesus = (s = 0.36, o = {}) => `<g transform="translate(0,${f(-252 * s)})"><circle r="${f(70 * s)}" fill="url(#haloGlow)"/><circle r="${f(44 * s)}" fill="none" stroke="${GOLD}" stroke-width="${f(10 * s)}"/></g>`
  + person(0, 0, s, { kind: 'kid', robe: true, top: '#fbf7ee', skin: '#f0c9a8', hair: '#c89a5a', beard: null, mood: 'joy', armL: [120, 10, 1.6], armR: [120, 10, 1.8], ...o });
// Held on Anthony's left arm, against his chest
const held = `<g transform="translate(0,22)">${childJesus(0.36)}</g>`;
export const anthony = (x, y, s, { canon = false, child = false, under = '', over = '', ...o } = {}) => person(x, y, s, canon
  ? { kind: 'priest', top: '#2b2733', skin: SKA, hair: HAIRA, beard: null, collar: false, ...o, over: tonsureA + rochet + over, under }
  : { kind: 'friar', top: HABIT, skin: SKA, hair: HAIRA, beard: null, ...o, under, over: tonsureA + hoodA + over,
      ...(child ? { armL: [30, 2, 3], propL: held } : {}) });
const youngFernando = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#2f4a8a', pants: '#3a3048', skin: SKA, hair: HAIRA, beard: null, ...o });
const noble = (x, y, s, lady, o = {}) => person(x, y, s, lady
  ? { kind: 'layman', girl: true, robe: true, top: '#8a2e4a', skin: SKA, hair: '#3a2418', beard: null, ...o }
  : { kind: 'layman', robe: true, top: '#5a3a6a', skin: SKA, hair: '#3a2418', beard: '#3a2418', ...o });
const friar = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'friar', skin: [SKIN.priest, SKIN.s3, SKIN.fair][i % 3], hair: ['#4a3424', '#2a1e16', '#8a5a32'][i % 3],
  beard: i % 2 ? null : ['#4a3424', '#2a1e16', '#8a5a32'][i % 3], ...o });
const townsfolk = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', girl: i % 2 === 1, robe: i % 2 === 1, top: ['#5a6a8a', '#a05a6a', '#6a8a5a', '#8a6a9a'][i % 4],
  pants: '#3a3448', skin: [SKIN.s3, SKIN.fair, SKIN.priest, SKIN.s1][i % 4], hair: ['#1a120c', '#3a2a20', '#6a4a2a', '#241a14'][i % 4], beard: null, ...o });

// ---------------------------------------------------------------- props
export const foundKey = `<g transform="translate(0,-14)"><circle r="44" fill="url(#haloGlow)"${M.pulse(0.12, 1.6)}/><g transform="rotate(-20)">`
  + `<circle cy="-22" r="12" fill="none" stroke="${GOLD}" stroke-width="7"/><rect x="-3.5" y="-12" width="7" height="44" rx="2" fill="${GOLD}"/>`
  + `<rect x="3" y="18" width="12" height="6" fill="${GOLD}"/><rect x="3" y="26" width="8" height="6" fill="${GOLD}"/></g>${sparkles(4, -30, 30, -50, 10, { seed: 3 })}</g>`;
const lilyR = lily(0.8);

// ---------------------------------------------------------------- set pieces (exported for later reels)
// Lisbon Cathedral (Sé): Romanesque fortress church, two crenellated towers and a rose window
export function lisbonSe(x, y, s = 1, { wall = '#e8dcc4', win = null, shade = 0.18 } = {}) {
  const tower = (tx) => `<rect x="${tx - 70}" y="-420" width="140" height="420" fill="${wall}"/><rect x="${tx + 25}" y="-420" width="45" height="420" fill="${dark(wall, shade)}" opacity=".6"/>`
    + [0, 1, 2, 3, 4].map((k) => `<rect x="${tx - 70 + k * 30.5}" y="-446" width="18" height="28" fill="${k > 2 ? dark(wall, shade * 0.6) : wall}"/>`).join('')
    + `<path d="M${tx - 16} -330 v-36 a16 16 0 0 1 32 0 v36Z" fill="${win || dark(wall, 0.5)}"/><path d="M${tx - 12} -210 v-30 a12 12 0 0 1 24 0 v30Z" fill="${dark(wall, 0.5)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-340" width="180" height="340" fill="${light(wall, 0.06)}"/>`
    + [0, 1, 2, 3, 4].map((k) => `<rect x="${-90 + k * 38}" y="-362" width="20" height="24" fill="${light(wall, 0.06)}"/>`).join('')
    + `${tower(-160)}${tower(160)}<circle cy="-236" r="50" fill="${dark(wall, 0.35)}"/><circle cy="-236" r="40" fill="${win || '#7aa6d8'}" opacity=".85"/>`
    + `<path d="M0 -276 V-196 M-40 -236 H40" stroke="${dark(wall, 0.35)}" stroke-width="5"/><path d="M-52 0 V-96 A52 52 0 0 1 52 -96 V0Z" fill="${dark(wall, 0.55)}"/></g>`;
}
// Reliquary casket with a gabled lid, on a draped stand
export function reliquary(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-110" width="300" height="110" fill="#7a5230"/><rect x="60" y="-110" width="90" height="110" fill="#5a3b22" opacity=".6"/>`
    + '<rect x="-162" y="-124" width="324" height="20" rx="4" fill="#c8323a"/><path d="M-162 -104 L-162 -60 L-130 -104Z M162 -104 L162 -60 L130 -104Z" fill="#c8323a"/>'
    + `<g transform="translate(0,-124)"><circle cy="-70" r="150" fill="url(#haloGlow)"${M.pulse(0.06, 2.4)}/>`
    + `<rect x="-100" y="-90" width="200" height="90" rx="6" fill="${GOLD}"/><rect x="40" y="-90" width="60" height="90" rx="4" fill="#c99a3a" opacity=".7"/>`
    + `<path d="M-110 -90 L0 -150 L110 -90Z" fill="#e8b850"/><path d="M0 -150 v-40 M-14 -176 h28" stroke="${GOLD}" stroke-width="7"/>`
    + [-60, -20, 20, 60].map((cx) => `<path d="M${cx - 12} -16 v-44 a12 12 0 0 1 24 0 v44Z" fill="#9a6a2a"/>`).join('') + '</g></g>';
}
// Wooden pulpit: draw it after the preacher so the box hides his legs
export function pulpit(x, y, s = 1, { wood = '#7a5230' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-26" y="0" width="52" height="150" fill="${dark(wood, 0.2)}"/>`
    + `<path d="M-120 -200 L120 -200 L100 0 L-100 0Z" fill="${wood}"/><path d="M50 -200 L120 -200 L100 0 L40 0Z" fill="${dark(wood, 0.25)}" opacity=".6"/>`
    + `<rect x="-132" y="-214" width="264" height="22" rx="6" fill="${light(wood, 0.15)}"/><path d="M-70 -170 L-64 -30 M0 -170 V-30 M70 -170 L64 -30" stroke="${dark(wood, 0.3)}" stroke-width="5"/>`
    + `<path d="M-20 -130 h40 M0 -150 v60" stroke="${GOLD}" stroke-width="6"/></g>`;
}
// Basilica of St. Anthony (Il Santo), Padua: brick facade, domes, a cone dome and two slender bell towers
export function santo(x, y, s = 1, { brick = '#b8654a', dome = '#8a9494', win = '#ffd98a', shade = 0.2 } = {}) {
  const domeAt = (dx, dy, r) => `<rect x="${dx - r * 0.85}" y="${dy - r * 0.45}" width="${r * 1.7}" height="${r * 0.6}" fill="${dark(brick, 0.12)}"/>`
    + `<path d="M${dx - r} ${dy - r * 0.45} a${r} ${r} 0 0 1 ${2 * r} 0Z" fill="${dome}"/><path d="M${dx + r * 0.3} ${dy - r * 1.4} a${r} ${r} 0 0 1 ${r * 0.7} ${r * 0.95} L${dx + r * 0.3} ${dy - r * 0.45}Z" fill="${dark(dome, 0.2)}" opacity=".5"/>`
    + `<path d="M${dx} ${dy - r * 1.45} v-${r * 0.45}" stroke="${GOLD}" stroke-width="5"/>`;
  const minaret = (mx) => `<rect x="${mx - 14}" y="-600" width="28" height="600" fill="${light(brick, 0.08)}"/><rect x="${mx + 2}" y="-600" width="12" height="600" fill="${dark(brick, shade)}" opacity=".5"/>`
    + `<rect x="${mx - 22}" y="-560" width="44" height="12" fill="${dark(brick, 0.1)}"/><path d="M${mx - 18} -600 Q${mx} -660 ${mx + 18} -600Z" fill="${dome}"/><path d="M${mx} -652 v-30" stroke="${GOLD}" stroke-width="4"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${domeAt(-250, -300, 74)}${domeAt(250, -300, 74)}${domeAt(-110, -350, 82)}${domeAt(110, -350, 82)}`
    + `<rect x="-60" y="-470" width="120" height="70" fill="${dark(brick, 0.12)}"/><path d="M-62 -470 L0 -640 L62 -470Z" fill="${dome}"/><path d="M0 -640 v-36 M-12 -664 h24" stroke="${GOLD}" stroke-width="5"/>`
    + `${minaret(-185)}${minaret(185)}`
    + `<rect x="-230" y="-300" width="460" height="300" fill="${brick}"/><rect x="110" y="-300" width="120" height="300" fill="${dark(brick, shade)}" opacity=".55"/>`
    + `<path d="M-244 -300 L0 -400 L244 -300Z" fill="${light(brick, 0.06)}"/><circle cy="-336" r="26" fill="${win}" opacity=".85"/>`
    + [-150, -50, 50, 150].map((ax) => `<path d="M${ax - 34} 0 V-90 A34 34 0 0 1 ${ax + 34} -90 V0Z" fill="${dark(brick, 0.5)}"/>`).join('')
    + Array.from({ length: 9 }, (_, i) => `<path d="M${-184 + i * 46 - 12} -200 v-30 a12 12 0 0 1 24 0 v30Z" fill="${win}" opacity=".7"/>`).join('') + '</g>';
}
// Camposampiero: a walnut tree with a little wooden cell built in its branches
export function walnutCell(x, y, s = 1, { base = '#3f7a46', win = '#ffd98a' } = {}) {
  return tree(x, y, s, base)
    + `<g transform="translate(${x + 40 * s},${y - 380 * s}) scale(${s})"><rect x="-90" y="-10" width="180" height="16" fill="#5a3d22"/>`
    + `<rect x="-70" y="-120" width="140" height="112" fill="#8a6234"/><rect x="20" y="-120" width="50" height="112" fill="#6b4a2a" opacity=".7"/>`
    + `<path d="M-84 -118 L0 -178 L84 -118Z" fill="#5a3d22"/><rect x="-36" y="-92" width="34" height="38" rx="4" fill="${win}" opacity=".9"/>`
    + `<path d="M-60 6 L-90 160 M60 6 L90 160" stroke="#5a3d22" stroke-width="10"/><path d="M-20 6 v170 M20 6 v170 M-20 50 h40 M-20 94 h40 M-20 138 h40" stroke="#7a5536" stroke-width="5"/></g>`;
}
export function rain(n = 60, { seed = 5, x0 = -100, x1 = W + 100, y0 = 200, y1 = 1500, op = 0.35, color = '#cfd8e8' } = {}) {
  let o = '';
  for (let k = 0; k < 3; k++) {
    let lines = '';
    for (let i = 0; i < n / 3; i++) {
      const r = ((i * 9301 + (k + seed) * 49297) % 233280) / 233280, q = ((i * 7919 + (k + seed) * 104729) % 65536) / 65536;
      const x = x0 + r * (x1 - x0), y = y0 + q * (y1 - y0);
      lines += `<path d="M${f(x)} ${f(y)} l-14 44" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`;
    }
    o += `<g opacity="${op}"${M.drift(-60, 260)}><g${M.flick(0.5 + k * 0.17, k * 0.2, 0.5)}>${lines}</g></g>`;
  }
  return o;
}
export const lightning = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"${M.flick(3.4, 0.8, 0)}><path d="M0 0 L-30 90 L6 86 L-26 190 L40 70 L4 76 L30 0Z" fill="#fff6c8"/><circle cx="0" cy="90" r="120" fill="url(#sunGlow)" opacity=".5"/></g>`;
const rock = (x, y, s = 1, c = '#6a6a7a') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-220 40 Q-230 -60 -150 -90 Q-60 -130 40 -110 Q150 -96 200 -40 Q230 0 220 40Z" fill="${c}"/>`
  + `<path d="M40 -110 Q150 -96 200 -40 Q230 0 220 40 L80 40 Q120 -40 40 -110Z" fill="${dark(c, 0.25)}" opacity=".6"/><path d="M-150 -90 Q-60 -130 40 -110" stroke="${light(c, 0.3)}" stroke-width="6" fill="none" opacity=".6"/></g>`;
// Fish lifting their heads out of the water (head up), popping in one after another
const fishUp = (x, y, c, s, delay) => `<g transform="translate(${x},${y})"><g${M.in('rise', delay, 0.7, 0, 0)}><g${M.bob(5, 1.6 + (x % 5) * 0.1, (x % 7) * 0.2)}>${fish(c, s, 90)}</g></g></g>`;

// ---------------------------------------------------------------- scene timing (sentence starts from timings.json + ~0.5 s)
const T1B = 6.1, T2B = 6.9, T3B = 4.7, T4B = 7.2, T6B = 3.0, T7B = 6.5, T8B = 5.2;

// ---------------------------------------------------------------- scenes
// 0 · hook: the finder of lost things
function scene0() {
  const kneeler = (x, i, o) => townsfolk(x, 1340, 1.25, i, { kneel: true, flip: i === 1, ...o });
  return FAR(sky(SKIES.dusk, { stars: 30, seed: 3 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1050, 520, 0.85))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 5 }) + santo(540, 1190, 0.62, { brick: '#7a4a5a', dome: '#5a4a6a', win: '#ffd98a' }))
    + MID(hill(1250, 14, '#4e3458', 6))
    + ground(1270, '#5a3a4c', { rim: '#c07a7a' })
    + `<ellipse cx="540" cy="1300" rx="300" ry="40" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>` + tufts(1276, 10, '#3a2438', { seed: 7 })
    + anthony(540, 1300, 2.3, { child: true, halo: true, mood: 'happy', armR: [30, 2, 3.3], propR: lilyR })
    + kneeler(150, 0, { mood: 'joy', armL: [40, 2, 3], armR: [120, 6, 1.8], propR: foundKey })
    + kneeler(930, 1, { mood: 'peaceful', armL: [40, 2, 3], armR: [40, 2, 3.2], propL: candle })
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(bokeh(6, { seed: 11, op: [0.25, 0.55] }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · born Fernando in Lisbon, joins the Augustinian canons
function scene1() {
  return FAR(sky(SKIES.day) + sun(860, 540, 58, 260))
    + BACK(clouds(430, { seed: 2 }) + hill(1010, 40, '#a8c4c0', 3, { freq: 1.4 }) + lisbonSe(820, 1060, 0.62))
    + `<rect x="-200" y="1060" width="${W + 400}" height="120" fill="url(#seaG)"/>` + sparkles(10, 0, W, 1070, 1130, { seed: 6 })
    + MID(colonialTown(300, 1180, 0.8, { wall: '#f4efe4', roof: '#c0623e', trim: '#3a6ab0' }))
    + ground(1180, '#d2bf98', { rim: '#ecdcb6' }) + tufts(1186, 12, '#a99a5a', { seed: 3 })
    + noble(170, 1300, 1.6, true, { mood: 'happy', armL: 14, armR: [26, 2, 3] })
    + noble(330, 1310, 1.7, false, { mood: 'happy', armL: [22, 2, 3], armR: 12 })
    + `<g${fadeOut(T1B)}>${youngFernando(640, 1320, 1.85, { mood: 'happy', armL: 14, armR: [26, 3, 2.6] })}</g>`
    + `<g${fadeIn(T1B)}>${anthony(640, 1320, 1.85, { canon: true, mood: 'joy', armL: [30, 2, 3], armR: [22, 2, 3.2], propL: book(false) })}</g>`
    + flowers(1300, 1380, 10, { seed: 6 })
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 9 }));
}

// 2 · Coimbra 1220: relics of the Morocco martyrs; he becomes a Franciscan
function scene2() {
  return FAR(sky(SKIES.sunrise) + glow(540, 880, 420, 0.6))
    + BACK(cloister(1150, { wall: '#efe2c4', arch: '#d9c39a' }))
    + ground(1150, '#c8b48e', { rim: '#e2d2ae' })
    + MID(friar(900, 1220, 1.35, 1, { flip: true, mood: 'peaceful', armL: [40, 2, 3], armR: [40, 2, 3.2] }))
    + [-40, -20, 0, 20, 40].map((r, i) => `<g transform="translate(${560 + r * 2.2},1010)"><g${M.in('grow', 0.6 + i * 0.15, 0.8, 0, 0)}>${palm_frond(1.05, r)}</g></g>`).join('')
    + reliquary(560, 1290, 0.95)
    + `<g${fadeOut(T2B)}>${anthony(250, 1320, 1.85, { canon: true, mood: 'surprised', armL: 12, armR: [60, 4, 2.4] })}</g>`
    + `<g${fadeIn(T2B)}>${anthony(250, 1320, 1.85, { mood: 'determined', armL: [30, 2, 3], armR: [40, 2, 3.2], propR: book(false) })}</g>`
    + motes(14, { x0: 340, x1: 780, y0: 760, y1: 1200, seed: 5, color: '#fff2c4' })
    + NEAR(bokeh(6, { seed: 7, op: [0.25, 0.5] }));
}

// 3 · Morocco, illness, a storm drives the ship to Sicily
function scene3() {
  const sx = 520, sy = 1260, ss = 0.9;
  return FAR(sky(STORM) + `<g${fadeIn(T3B, 2.5)}>${sun(930, 780, 50, 300, 0.9)}${rays(930, 780, { op: 0.12 })}</g>`)
    + BACK(clouds(380, { color: '#5a6278', op: 0.9, drift: 90, seed: 3, n: 4 }) + lightning(170, 560, 1.0)
      + `<g${fadeIn(T3B, 2.5)}>${hill(1110, 60, '#7a8a6a', 9, { freq: 0.6 })}</g>`)
    + `<rect x="-200" y="1100" width="${W + 400}" height="900" fill="url(#seaG)"/><rect x="-200" y="1100" width="${W + 400}" height="900" fill="#2a3450" opacity=".45"/>`
    + waves(1130, 14, 300, 5, '#4a5a7a', { foam: '#cfd8e8', op: 0.9 })
    + ship(sx, sy, ss, { crew: false })
    + `<g transform="translate(${sx},${sy}) scale(${ss})"><g${M.sway(2, 5, 0, 0, 0)}><g${M.bob(8, 4.4)}>${anthony(-40, -46, 0.75, { mood: 'worried', armL: [60, 4, 2], armR: [20, 2, 3] })}</g></g></g>`
    + waves(1300, 18, 360, 4, '#36456a', { phase: 1, foam: '#b8c4da' }) + waves(1420, 22, 420, 3.6, '#2a3658', { phase: 2 })
    + rain(66, { seed: 4 })
    + NEAR(waves(1560, 30, 480, 3.2, '#1e2846', { phase: 0.5 }));
}

// 4 · Forlì 1222: the hidden preacher
function scene4() {
  const listeners = (mood) => MID(dominican(80, 1250, 1.2, { mood, armL: 12, armR: 14 }) + friar(220, 1250, 1.2, 1, { mood, armL: 14, armR: 12 }))
    + person(900, 1300, 1.5, { kind: 'priest', top: '#f2ead8', beard: '#cfc8bc', hair: '#cfc8bc', skin: SKIN.priest, collar: false, flip: true, over: mitre, mood, armL: 14, armR: 14 })
    + dominican(720, 1310, 1.45, { flip: true, mood, armL: 12, armR: 18 }) + friar(560, 1320, 1.45, 2, { flip: true, mood, armL: 16, armR: 12 });
  return FAR(stoneRoom('#6a5a50', '#74645a', 1230) + `<path d="M440 600 V440 a100 100 0 0 1 200 0 V600Z" fill="#7aa6d8" opacity=".85"/>`
      + `<path d="M540 340 V600 M440 470 H640" stroke="#4a3a34" stroke-width="8"/>` + beam(450, 630, 200, 880, 1250, 0.35))
    + glow(320, 920, 360, 0.55)
    + ground(1230, '#4a3a32', { rim: '#8a6a5a' })
    + `<g${fadeOut(T4B)}>${listeners('happy')}</g><g${fadeIn(T4B)}>${listeners('surprised')}</g>`
    + anthony(340, 1110, 1.55, { mood: 'happy', talk: [0.6, 99], armL: [30, 2, 3], armR: [125, 12, 1.6] })
    + pulpit(340, 1120, 1.0)
    + motes(12, { y0: 600, y1: 1200, seed: 8, color: '#ffe0a0' })
    + NEAR(bokeh(6, { seed: 15, op: [0.2, 0.45] }));
}

// 5 · Rimini: one famous story, preaching to the fish
function scene5() {
  const fishes = [[560, 1250, '#9ab8c8'], [690, 1240, '#c8a86a'], [820, 1255, '#8ab0a0'], [950, 1245, '#b8c8d8'],
    [620, 1370, '#c8a86a'], [760, 1380, '#9ab8c8'], [900, 1370, '#d0b07a'], [1030, 1378, '#8ab0a0']]
    .map(([x, y, c], i) => fishUp(x, y, c, 2.6, 1.4 + i * 0.25));
  return FAR(sky(SKIES.sunrise) + sun(820, 860, 60, 320))
    + BACK(clouds(440, { color: '#fff7e8', op: 0.7, seed: 6 }) + hill(1070, 30, '#b8a8b8', 4, { freq: 1.2 }))
    + `<rect x="-200" y="1080" width="${W + 400}" height="900" fill="url(#seaG)"/>` + sparkles(14, 500, 1080, 1090, 1150, { seed: 5 })
    + waves(1110, 8, 300, 6, '#7ab0c8', { foam: '#eaf6fa', op: 0.9 })
    + fishes.slice(0, 4).join('') + waves(1280, 10, 340, 5.4, '#5a98b8', { phase: 1, foam: '#d8eef6' })
    + fishes.slice(4).join('') + waves(1400, 12, 380, 5, '#4a86a8', { phase: 2, foam: '#cfe6f0' })
    + rock(230, 1310, 1.1, '#8a7a6a')
    + anthony(250, 1250, 1.9, { mood: 'happy', talk: [0.4, 99], armL: [24, 2, 3], armR: [100, 8, 2] })
    + NEAR(waves(1520, 22, 440, 4.4, '#3a7898', { phase: 0.5, foam: '#bfe0ec' }));
}

// 6 · Camposampiero 1231: vision of the Child Jesus
function scene6() {
  return FAR(sky(SKIES.night, { stars: 60, seed: 8 }) + rays(540, 760, { op: 0.07 }))
    + BACK(hill(1120, 40, '#2a3460', 3, { freq: 1.1 }) + clouds(520, { color: '#8a90c0', op: 0.35, drift: 30, seed: 4 }))
    + MID(walnutCell(820, 1250, 0.85, { base: '#2e5a46' }))
    + ground(1250, '#22304a', { rim: '#4a5a8a' }) + tufts(1256, 10, '#18223a', { seed: 5 })
    + `<g${fadeIn(T6B, 1.6)}>${glow(470, 880, 420, 0.95)}${beam(380, 560, 200, 760, 1290, 0.4)}</g>`
    + `<g transform="translate(470,900)"><g${M.in('pop', T6B + 0.4, 1.0, 0, 0)}><g${M.bob(10, 3.2)}>${childJesus(1.05)}</g></g></g>`
    + anthony(470, 1310, 1.95, { kneel: true, mood: 'joy', halo: T6B + 0.6, armL: [125, 6, 2.4], armR: [125, 6, 2.6] })
    + motes(18, { x0: 260, x1: 720, y0: 560, y1: 1200, seed: 6, color: '#fff2c4', rise: 120 })
    + NEAR(bokeh(7, { seed: 9 }) + foliage('l', 1640, { color: '#141c30', seed: 3 }));
}

// 7 · death near Padua, June 13, 1231: "I see my Lord"
function scene7() {
  return FAR(sky(SKIES.deep, { stars: 44, seed: 9 }) + rays(540, 640, { op: 0.07 }))
    + BACK(hill(1150, 30, '#4a3560', 5, { freq: 1.3 }) + graceFriary(780, 1180, 0.7, { wall: '#8a7088', roof: '#5a3e5a' }))
    + ground(1230, '#44324e', { rim: '#8a6a8a' }) + tufts(1236, 10, '#2a1c34', { seed: 7 })
    + `<g${fadeIn(T7B, 2.5)}>${beam(440, 640, 300, 780, 1340, 0.55)}${motes(16, { x0: 360, x1: 720, y0: 560, y1: 1250, color: '#fff2c4', seed: 9, rise: 160 })}</g>`
    + friar(170, 1320, 1.35, 0, { kneel: true, mood: 'sad', armL: [40, 2, 3], armR: [40, 2, 3.2] })
    + friar(910, 1320, 1.35, 1, { kneel: true, flip: true, mood: 'sad', armL: [40, 2, 3], armR: [40, 2, 3.2] })
    + anthony(540, 1330, 2.0, { mood: 'peaceful', halo: T7B, armL: [36, 2, 3], armR: [36, 2, 3.3], propR: lilyR })
    + NEAR(bokeh(6, { seed: 19, op: [0.25, 0.55] }) + foliage('r', 1640, { color: '#1c1428', seed: 2 }));
}

// 8 · canonized 1232; Doctor of the Church 1946
function scene8() {
  const banner = `<g transform="translate(540,520)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${anthony(0, 400, 0.9, { child: true, halo: true, mood: 'happy', armR: [30, 2, 3.3], propR: lilyR })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  const doctorBook = `<g transform="translate(860,1080)"><g${M.in('pop', T8B, 0.9, 0, 0)}><g${M.bob(8, 3)}>${glow(0, 0, 140, 0.9)}<g transform="scale(2.2)">${book(true)}</g></g></g></g>`;
  return FAR(sky(GOLDSKY) + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7))
    + BACK(clouds(860, { color: '#ffe2b8', op: 0.5, seed: 13, drift: 30 }) + santo(540, 1200, 1.0, { brick: '#8a4a3e', dome: '#6a5a62', win: '#ffd98a' }))
    + banner
    + ground(1190, '#5a3436')
    + doctorBook
    + MID(crowd(1420, 12, { color: '#3a2228', flags: [['#f6f2e8', '#c8323a', '#f6f2e8']] }))
    + petals(26, { seed: 5 })
    + NEAR(bokeh(6, { seed: 23 }));
}

// 9 · feast day + patronage
function scene9() {
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + santo(540, 1200, 0.55, { brick: '#7a4a5a', dome: '#5a4a6a', win: '#ffd98a' }))
    + glow(540, 1100, 480, 0.85)
    + MID(hill(1262, 14, '#6a4458', 6))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1296, 10, '#3a2438', { seed: 7 })
    + anthony(540, 1305, 2.35, { child: true, halo: true, mood: 'happy', armR: [30, 2, 3.3], propR: lilyR })
    + townsfolk(150, 1345, 1.2, 0, { kneel: true, mood: 'joy', armL: [40, 2, 3], armR: [120, 6, 1.8], propR: foundKey })
    + person(900, 1345, 1.15, { kind: 'kid', skin: SKIN.s1, flip: true, mood: 'joy', armL: [28, 3, 2.4], armR: 16, propL: `<g transform="scale(1.4)">${bread_basket()}</g>` })
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#f2c46b', '#8a5a3a'] })
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(6, { seed: 29 }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_anthony_of_padua', name: 'St_Anthony_of_Padua',
  voice: 'am_michael', speed: 0.95,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'The saint who finds lost things', thumb_title: 'St. Anthony of Padua', thumb_shift: 0, thumb_t: 3,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'dʒˈuːn θˈɜːtiːn': 'dʒˈuːn θˈɜːtiːnθ',        // June 13 -> thirteenth
    'fˈɔːɹli': 'fɔːɹlˈiː',                          // Forlì -> for-LEE
    'kˈɔɪmbɹə': 'kwˈiːmbɹə',                        // Coimbra -> KWEEM-bra
    'fɜːnˈændoʊ': 'fɚnˈɑːndoʊ',                     // Fernando -> fer-NAHN-do
    'kˌæmpəsɐmpˈɪɹoʊ': 'kˌɑːmpoʊsɑːmpjˈɛɹoʊ',      // Camposampiero -> kahm-po-sahm-PYEH-ro
    'ɹɪmˈiːni': 'ɹˈiːmiːni',                        // Rimini -> REE-mee-nee
  },
  scenes: [
    { kicker: 'FINDER OF THE LOST', title: 'Lost Something?', art: scene0, cam: { move: 'push-fast', oy: 1000 },
      say: ['Lost your keys? Millions ask him to help find lost things.', 'This is Saint Anthony of Padua.'] },
    { kicker: 'c. 1195 · LISBON, PORTUGAL', title: 'Born Fernando', art: scene1, cam: 'drift-r',
      say: ['He was born Fernando, around 1195, in Lisbon, Portugal.', 'As a teenager, he joined the Augustinian canons.'] },
    { kicker: '1220 · COIMBRA', title: 'Five Brave Friars', art: scene2, cam: { move: 'push', amt: 0.07, ox: 420, oy: 1000 },
      say: ['In 1220, the relics of five Franciscan martyrs from Morocco reached Coimbra.', 'Fernando became a Franciscan, and took the name Anthony.'] },
    { kicker: 'MOROCCO · SICILY', title: 'Blown Off Course', art: scene3, cam: 'pan-r',
      say: ['He sailed to Morocco to preach, but fell gravely ill.', 'On the way back, a storm drove his ship to Sicily.'] },
    { kicker: '1222 · FORLÌ, ITALY', title: 'The Hidden Preacher', art: scene4, cam: { move: 'pull', amt: 0.06, ox: 340, oy: 900 },
      say: ['In 1222, at Forlì, no one was ready to preach, so the quiet friar spoke.', 'His words amazed everyone.'] },
    { kicker: 'RIMINI · THE ADRIATIC', title: 'Even the Fish Listened', art: scene5, cam: 'drift-l',
      say: ['One famous story says that at Rimini, when people would not listen, he preached to the fish instead.'] },
    { kicker: '1231 · CAMPOSAMPIERO', title: 'The Child Jesus', art: scene6, cam: { move: 'dolly', oy: 1000, ox: 470 },
      say: ['In his last weeks, resting at Camposampiero, he was blessed with a vision of the Child Jesus.'] },
    { kicker: 'JUNE 13, 1231 · PADUA', title: 'I See My Lord', art: scene7, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ['He died near Padua on June 13, 1231, at about thirty-five.', 'His last words were, I see my Lord.'] },
    { kicker: '1232 · SPOLETO', title: 'A Saint Within a Year', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['Less than a year later, Pope Gregory IX declared him a saint.', 'In 1946, he was named a Doctor of the Church.'] },
    { kicker: 'FEAST DAY · JUNE 13', title: 'Patron of Lost Things', art: scene9, cam: 'arc-l',
      say: ['His feast day is June 13. He is the patron of lost things, and of the poor.', 'Saint Anthony of Padua, pray for us.'] },
  ],
};
