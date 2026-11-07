// St. Leo the Great (feast: November 10). Pope in white with red cope, pallium and tiara (exported for later reels),
// young deacon in a striped dalmatic, Attila the Hun on horseback with a fur hat, Hun camp by the Mincio, Vandal king Genseric,
// Roman senators in togas, council hall of Chalcedon, Old St. Peter's Basilica, Peter and Paul vision.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, butterflies, person, book, bread_basket, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { mitre } from './francis.mjs';
import { tiara } from './charles_borromeo.mjs';
import { horse, rider, roman, tent, gate } from './martin_of_tours.mjs';
import { keys, romeSkyline, followers, candle, peter, mantleBack, mantleFront } from './peter.mjs';
import { cypress, lycianTown, redCope } from './nicholas.mjs';
import { sword } from './joan_of_arc.mjs';

const SKL = '#e8bd98', GREYL = '#d8d2c8', HAIRL = '#4a3424';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];
const MORN = [[0, '#b8603e'], [0.3, '#f0a46a'], [0.64, '#fbd9a0'], [1, '#fde6c0']];
const SMOKY = [[0, '#3e3a5a'], [0.36, '#7a6a84'], [0.68, '#d8a07a'], [1, '#e8b88a']];

// ---------------------------------------------------------------- Leo: pope in white, red cope, pallium, tiara; deacon in a dalmatic
export const pallium = '<path d="M-27 -208 Q0 -166 27 -208" stroke="#fbf7ee" stroke-width="10" fill="none"/><rect x="-5.5" y="-180" width="11" height="124" rx="3" fill="#fbf7ee"/>'
  + '<path d="M0 -150 v14 M-7 -143 h14 M0 -96 v14 M-7 -89 h14 M-17 -196 v12 M-23 -190 h12 M17 -196 v12 M11 -190 h12" stroke="#2b1d14" stroke-width="3"/>';
export const ferula = (h = 250) => `<g><rect x="-5" y="${-h}" width="10" height="${h + 80}" rx="4" fill="${GOLD}"/><rect x="1" y="${-h}" width="4" height="${h + 80}" fill="#b08a3a" opacity=".6"/>`
  + `<rect x="-24" y="${-h + 24}" width="48" height="10" rx="4" fill="${GOLD}"/><circle cy="${-h}" r="8" fill="${GOLD}"/></g>`;
export const leo = (x, y, s, { crown = true, over = '', ...o } = {}) => person(x, y, s, {
  kind: 'priest', top: '#f6f0e2', collar: false, skin: SKL, hair: GREYL, beard: GREYL, under: redCope, ...o,
  over: pallium + (crown ? tiara : '') + over });
const clavi = '<path d="M-20 -206 L-24 -12 M20 -206 L24 -12" stroke="#b3202e" stroke-width="8"/>';
const deacon = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#f4efe4', skin: SKL, hair: HAIRL, beard: HAIRL, over: clavi, ...o });
const kidLeo = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', top: '#3f6fb8', pants: '#5a4a3a', skin: SKL, hair: HAIRL, ...o });

// Attila: fur-trimmed cap and collar, dark beard; Huns and the Vandal king
export const hunHat = '<path d="M-40 -264 Q-38 -330 0 -338 Q38 -330 40 -264Z" fill="#8a2e2a"/><path d="M10 -334 Q36 -322 40 -264 L20 -264Z" fill="#6a2020" opacity=".7"/>'
  + '<path d="M-48 -270 Q0 -290 48 -270 Q50 -250 42 -246 Q0 -264 -42 -246 Q-50 -250 -48 -270Z" fill="#9a7a56"/><path d="M-30 -276 Q0 -286 30 -276" stroke="#b8986e" stroke-width="4" fill="none"/><circle cy="-340" r="7" fill="' + GOLD + '"/>';
const furCollar = '<path d="M-42 -212 Q0 -190 42 -212 Q48 -192 36 -182 Q0 -172 -36 -182 Q-48 -192 -42 -212Z" fill="#9a7a56"/><path d="M-30 -132 H30" stroke="#c9a24a" stroke-width="7"/>';
export const attila = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#7a3a2e', pants: '#3a2e26', skin: '#d9a47e', hair: '#1a120c', beard: '#1a120c',
  ...o, over: furCollar + hunHat + (o.over || '') });
const hun = (x, y, s, o = {}) => attila(x, y, s, { top: '#5a4a3a', skin: '#c48a5f', ...o });
const vCloak = '<path d="M-40 -212 Q-86 -120 -80 -24 Q0 -8 80 -24 Q86 -120 40 -212Z" fill="#3a3050"/><path d="M40 -212 Q86 -120 80 -24 L56 -20 Q62 -120 26 -206Z" fill="#241e36" opacity=".7"/>';
const spear = '<g><rect x="-4" y="-270" width="8" height="330" rx="3" fill="#6b4a2a"/><path d="M0 -312 L-11 -268 L11 -268Z" fill="#c4ccd6"/><path d="M0 -312 L11 -268 L2 -268Z" fill="#9aa4b2"/></g>';
const genseric = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#4a5a3a', pants: '#3a3428', skin: SKIN.fair, hair: '#b8763a', beard: '#b8763a', crown: true, under: vCloak, ...o });
const toga = '<path d="M-38 -206 Q-4 -160 40 -120 L44 -100 Q0 -140 -40 -186Z" fill="#e8e0cc"/><path d="M-38 -206 Q-4 -160 40 -120" stroke="#7a3a6a" stroke-width="6" fill="none"/>';
const senator = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#f2ece0', skin: SKIN.priest, hair: '#bfb8ae', beard: null, over: toga, ...o });
const paul = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#4a7a5a', skin: '#d39e78', hair: '#d39e78', beard: '#3a2a1e',
  ...o, under: mantleBack('#b8323e') + (o.under || ''), over: mantleFront('#b8323e') + '<path d="M-36 -276 Q0 -296 36 -276" stroke="#3a2a1e" stroke-width="6" fill="none" opacity=".7"/>' + (o.over || '') });

// ---------------------------------------------------------------- props and set pieces
const scroll = '<g transform="translate(0,-10)"><rect x="-34" y="-26" width="68" height="46" rx="3" fill="#f4ead2"/><rect x="-40" y="-30" width="10" height="54" rx="5" fill="#d9ccaa"/><rect x="30" y="-30" width="10" height="54" rx="5" fill="#d9ccaa"/>'
  + '<path d="M-22 -14 h44 M-22 -4 h44 M-22 6 h30" stroke="#b0a080" stroke-width="3"/></g>';
// Old St. Peter's (Constantine's basilica): tall gabled nave with a gold mosaic band, low aisles, bell tower
export function oldStPeters(x, y, s = 1, { wall = '#d9c8a8', roof = '#7a5a5a', win = '#ffd98a', shade = 0.2 } = {}) {
  const arch = (dx, yy, w, h) => `<path d="M${dx - w / 2} ${yy} v${-h} a${w / 2} ${w / 2} 0 0 1 ${w} 0 v${h}Z" fill="${win}" opacity=".85"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="-470" y="-470" width="90" height="470" fill="${light(wall, 0.04)}"/><rect x="-410" y="-470" width="30" height="470" fill="${dark(wall, shade)}" opacity=".5"/><path d="M-482 -470 L-425 -560 L-368 -470Z" fill="${roof}"/>`
    + arch(-425, -380, 26, 30) + arch(-425, -260, 26, 30)
    + `<rect x="-360" y="-210" width="720" height="210" fill="${wall}"/><path d="M-372 -210 L-180 -270 L180 -270 L372 -210Z" fill="${roof}"/>`
    + `<rect x="-190" y="-400" width="380" height="400" fill="${light(wall, 0.08)}"/><rect x="80" y="-400" width="110" height="400" fill="${dark(wall, shade)}" opacity=".45"/>`
    + `<path d="M-212 -400 L0 -500 L212 -400Z" fill="${roof}"/><path d="M0 -500 L212 -400 L90 -400Z" fill="${dark(roof, 0.25)}"/>`
    + `<rect x="-160" y="-370" width="320" height="90" fill="${GOLD}" opacity=".75"/><circle cy="-325" r="30" fill="#fff4cc" opacity=".8"/>`
    + [-110, -40, 40, 110].map((dx) => arch(dx, -170, 34, 50)).join('') + [-290, -230, 230, 290].map((dx) => arch(dx, -90, 24, 30)).join('')
    + [-100, 0, 100].map((dx) => `<path d="M${dx - 28} 0 v-60 a28 28 0 0 1 56 0 v60Z" fill="${dark(wall, 0.55)}"/>`).join('')
    + `<path d="M0 -500 v-46 M-16 -528 h32" stroke="${GOLD}" stroke-width="7"/></g>`;
}
// Council hall at Chalcedon: warm stone, arched bays, a glowing apse
function councilHall(floor = 1260) {
  const bay = (x, c) => `<path d="M${x - 80} ${floor} V780 Q${x} 660 ${x + 80} 780 V${floor}Z" fill="${c}"/>`;
  return `<rect x="-200" y="-300" width="${W + 400}" height="${floor + 340}" fill="#5a3a3a"/><rect x="-200" y="-300" width="${W + 400}" height="${floor + 340}" fill="#7a5048" opacity=".45"/>`
    + `<path d="M-80 720 Q540 220 1160 720" stroke="#8a6050" stroke-width="22" fill="none"/>`
    + bay(80, '#3a2428') + bay(1000, '#3a2428')
    + `<path d="M360 1000 V640 Q540 420 720 640 V1000Z" fill="#2a1a22"/><path d="M380 990 V650 Q540 450 700 650 V990Z" fill="#c8963a" opacity=".55"/>`
    + `<circle cx="540" cy="620" r="70" fill="#fff0c0" opacity=".55"/><path d="M540 560 V690 M505 600 H575" stroke="#fff4cc" stroke-width="10" stroke-linecap="round"/>`
    + [260, 820].map((x) => `<rect x="${x - 18}" y="520" width="36" height="${floor - 520}" fill="#8a6a5a"/><rect x="${x + 4}" y="520" width="14" height="${floor - 520}" fill="#6a4a40" opacity=".6"/><rect x="${x - 26}" y="508" width="52" height="18" fill="#a88270"/>`).join('');
}
const tusc = (base) => hill(base, 40, '#c9b06a', 3, { freq: 1.3, top: '#e2cc88' });
const smoke = (x, y, s = 1, seed = 1) => `<g transform="translate(${x},${y}) scale(${s})"><g${M.drift(0, -60)}><g${M.pulse(0.06, 3.4, seed, 0, 0)}>`
  + `<circle cx="0" cy="0" r="46" fill="#6a6070" opacity=".55"/><circle cx="-20" cy="-60" r="56" fill="#7a7080" opacity=".45"/><circle cx="16" cy="-130" r="66" fill="#8a8090" opacity=".35"/></g></g></g>`;
const cloudPad = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="120" ry="34" fill="#fff6e4" opacity=".9"/><circle cx="-60" cy="-14" r="40" fill="#fff6e4" opacity=".9"/><circle cx="50" cy="-18" r="46" fill="#fff6e4" opacity=".9"/></g>`;
const hunRiders = (y, s = 0.3, c = '#2a1e30') => [620, 760, 900, 1040].map((x, i) => horse(x, y + (i % 2) * 10, s, { c, mane: c, cloth: c, walk: true, ph: i * 0.3 })
  + `<g transform="translate(${x - 8},${y - 218 * s + (i % 2) * 10})" fill="${c}"><circle cy="-58" r="14"/><path d="M-16 0 Q-14 -40 0 -44 Q14 -40 16 0Z"/></g>`).join('');

// ---------------------------------------------------------------- scene timing (sentence starts from timings.json + ~0.5 s)
const S1B = 2.8, S2B = 6.6, S4B = 8.0, S6B = 2.7, S7B = 5.0, S7C = 9.0;

// ---------------------------------------------------------------- scenes
// 0 · hook: one man, no army
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 26, seed: 3 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1120, 520, 0.85))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 5 }) + hill(1150, 30, '#5d3f6c', 2, { freq: 1.6 })
      + tent(690, 1140, 0.45, '#4a3450') + tent(820, 1150, 0.5, '#4a3450') + tent(960, 1140, 0.42, '#4a3450') + hunRiders(1185, 0.26, '#3a2a44'))
    + MID(hill(1220, 16, '#4e3458', 6))
    + ground(1250, '#5a3a4c', { rim: '#c07a7a' })
    + `<ellipse cx="540" cy="1300" rx="300" ry="40" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>` + tufts(1260, 10, '#3a2438', { seed: 7 })
    + leo(540, 1305, 2.2, { mood: 'determined', halo: true, armL: [46, 2, 3], armR: [100, 6, 2.6], propL: ferula(230) })
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(bokeh(6, { seed: 11 }) + foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · born in Tuscany; the boy becomes the young deacon in Rome
function scene1() {
  return FAR(sky(DAYSKY) + sun(860, 540, 58, 260))
    + BACK(clouds(430, { seed: 2 }) + hill(1010, 50, '#a8c4c0', 3, { freq: 1.4 }) + tusc(1070)
      + `<g${fadeIn(S1B, 1.2)}>${romeSkyline(540, 1080, 0.85, { c: '#c9a88a', win: '#fff0c0' })}</g>`)
    + MID(hill(1150, 26, '#8aa85a', 5, { freq: 1.8, top: '#a8c46a' }) + cypress(90, 1200, 1.2) + cypress(190, 1185, 0.9) + cypress(930, 1200, 1.15) + cypress(1020, 1190, 0.85)
      + `<g${fadeOut(S1B, 1.0)}>${lycianTown(560, 1150, 0.55, { wall: '#efe2c8', roof: '#c0623e' })}</g>`)
    + ground(1240, '#9ab25a', { rim: '#c8d888' }) + flowers(1250, 1330, 14, { seed: 4 }) + tufts(1246, 12, '#6a8a3a', { seed: 3 })
    + `<g${fadeOut(S1B)}>${kidLeo(540, 1310, 1.55, { mood: 'joy', armL: [40, 3, 2.6], armR: [40, 3, 2.9], propR: book(true) })}</g>`
    + `<g${fadeIn(S1B)}>${deacon(540, 1310, 2.05, { mood: 'happy', armL: [40, 3, 2.6], armR: [44, 3, 2.9], propR: book(true) })}</g>`
    + butterflies(2, { y0: 960, y1: 1120 })
    + NEAR(foliage('r', 1630, { color: '#2f5a35', seed: 9 }));
}

// 2 · peacemaker in Gaul; Rome chooses him as pope
function scene2() {
  const g1 = roman(150, 1310, 1.6, { mood: 'stern', armL: 10, armR: [70, 4, 2] });
  const g2 = roman(930, 1310, 1.6, { mood: 'stern', flip: true, armL: 10, armR: [70, 4, 2.2], skin: SKIN.fair, hair: '#6b4a2a' });
  return FAR(sky(MORN) + sun(860, 700, 56, 300))
    + BACK(clouds(420, { color: '#fff7e8', op: 0.7, seed: 9 }) + hill(1080, 40, '#c9a08a', 3) + gate(540, 1150, 0.7, { wall: '#a89a9a' }))
    + MID(hill(1200, 18, '#9a8a6a', 4))
    + ground(1230, '#a89060', { rim: '#d8c08a' }) + tufts(1236, 12, '#7a6a3a', { seed: 5 })
    + g1 + g2
    + `<g${fadeOut(S2B)}>${deacon(540, 1320, 2.0, { mood: 'determined', armL: [92, 4, 2.4], armR: [92, 4, 2.7] })}</g>`
    + `<g${fadeIn(S2B)}>${deacon(540, 1320, 2.0, { mood: 'surprised', armL: 20, armR: 20 })}</g>`
    + `<g transform="translate(540,560)"><g${M.in('pop', S2B + 0.6, 0.9, 0, 0)}>${keys(1.5)}</g></g>`
    + motes(10, { y0: 520, y1: 1200, seed: 6 })
    + NEAR(foliage('l', 1650, { color: '#4a3a2a', seed: 3 }));
}

// 3 · shepherd of Rome: preaching, the poor, sermons
function scene3() {
  const elder = person(140, 1300, 1.3, { kind: 'elder', sitting: true, mood: 'happy', armL: 20, armR: 20 });
  const mom = person(300, 1300, 1.45, { kind: 'layman', girl: true, robe: true, top: '#a05a6a', skin: SKIN.s3, hair: '#3a2a20', mood: 'happy', armL: 14, armR: [40, 3, 2.4] });
  const kid = person(985, 1305, 1.1, { kind: 'kid', top: '#e2b448', skin: SKIN.s1, mood: 'joy', flip: true, armL: 10, armR: [60, 6, 1.8], propR: bread_basket() });
  return FAR(sky(SKIES.sunrise) + sun(240, 560, 60, 300))
    + BACK(clouds(400, { color: '#fff7e8', op: 0.75, seed: 4 }) + romeSkyline(540, 1110, 1.0, { c: '#c99a7a', win: '#fff0c0' }))
    + MID(hill(1180, 12, '#b0866a', 7))
    + ground(1230, '#c0a07a', { rim: '#e8cca0' }) + tufts(1236, 10, '#8a6a4a', { seed: 2 })
    + elder + mom + kid
    + leo(640, 1310, 2.05, { mood: 'happy', talk: true, armL: [40, 3, 2.6], armR: [112, 6, 2.6], propL: book(true) })
    + `<g${fadeIn(1.5, 1.0)}>${sparkles(12, 520, 760, 560, 900, { seed: 5, color: '#fff2c4' })}</g>`
    + motes(12, { y0: 520, y1: 1200, seed: 3 })
    + NEAR(bokeh(6, { seed: 7 }) + foliage('l', 1640, { color: '#5a3a2a', seed: 4 }));
}

// 4 · Chalcedon: the letter is read, "Peter has spoken through Leo!"
const bishop = (x, i, mood, raise) => person(x, 1300, 1.2, { kind: 'priest', top: i % 2 ? '#f2ead8' : '#e8dcc2', collar: false, skin: i % 3 ? SKIN.priest : SKIN.s3,
  hair: '#cfc8bc', beard: i % 3 === 1 ? '#cfc8bc' : '#5a3e2a', mood, sitting: true, flip: x > 540, armL: raise ? [130, 10, 1.4 + i * 0.1] : 14, armR: raise ? [130, 10, 1.3 + i * 0.1] : 14, over: mitre });
function scene4() {
  const xs = [95, 245, 835, 985];
  return FAR(councilHall(1260))
    + ground(1260, '#4a3030', { rim: '#8a6a5a' })
    + `<ellipse cx="540" cy="1150" rx="460" ry="400" fill="#ffcf8a" opacity=".14" filter="url(#blur14)"/>`
    + `<g${fadeOut(S4B)}>${xs.map((x, i) => bishop(x, i, i % 2 ? 'happy' : 'surprised', false)).join('')}</g>`
    + `<g${fadeIn(S4B)}>${xs.map((x, i) => bishop(x, i, 'joy', true)).join('')}</g>`
    + deacon(540, 1310, 1.9, { mood: 'happy', talk: [0.3, S4B], beard: null, skin: SKIN.priest, hair: '#3a2a1e', armL: 14, armR: [40, 3, 2.4], propR: scroll })
    + `<g transform="translate(540,600)"><g${M.in('pop', S4B + 0.5, 0.9, 0, 0)}>${keys(1.4)}</g></g>`
    + `<g${fadeIn(S4B + 0.4, 1.0)}>${sparkles(16, 380, 700, 470, 760, { seed: 8, color: '#fff2c4' })}</g>`
    + motes(14, { color: '#ffe0a0', seed: 5, y0: 700, y1: 1220 })
    + NEAR(bokeh(7, { seed: 13 }));
}

// 5 · Attila at the Mincio; Leo goes out with two senators
function scene5() {
  return FAR(sky(SMOKY) + glow(820, 820, 300, 0.4))
    + BACK(smoke(700, 990, 1.1, 1) + smoke(950, 1010, 0.9, 2) + hill(1060, 22, '#7a6a7a', 4, { freq: 1.6 })
      + tent(640, 1070, 0.42, '#8a6a4a') + tent(790, 1080, 0.48, '#7a5a3e') + tent(940, 1070, 0.4, '#8a6a4a') + hunRiders(1100, 0.24, '#4a3a44'))
    + MID(`<rect x="-200" y="1100" width="${W + 400}" height="140" fill="#6a8aa8"/>` + waves(1104, 5, 260, 6, '#7aa0c0', { foam: '#d8e8f0' }) + waves(1160, 6, 320, 8, '#5a7a98', { phase: 1 }) + sparkles(10, 0, W, 1110, 1200, { seed: 3 }))
    + ground(1230, '#8a7a5a', { rim: '#b8a47a' }) + tufts(1236, 10, '#5a5a3a', { seed: 4 })
    + senator(235, 1290, 1.35, { mood: 'worried', armL: 12, armR: 12 })
    + senator(90, 1300, 1.4, { mood: 'worried', armL: 12, armR: [30, 3, 2.2], skin: SKIN.fair, hair: '#8a7a6a' })
    + leo(425, 1310, 2.0, { mood: 'determined', armL: [46, 2, 3], armR: [70, 4, 2.4], propL: ferula(220) })
    + horse(810, 1310, 0.95, { flip: true, c: '#5a3a2a', mane: '#2a1a14', cloth: '#3a5a4a' })
    + rider(attila, 830, 1310, 0.95, 1.25, { flip: true, mood: 'stern', armL: 20, armR: [30, 3, 2] })
    + NEAR(foliage('r', 1660, { color: '#2a2a20', seed: 6 }));
}

// 6 · Attila turns back; the famous story of Peter and Paul beside the pope
function scene6() {
  const vision = `<g${fadeIn(S6B, 1.4)}>${glow(100, 900, 260, 0.7)}${glow(580, 900, 260, 0.7)}`
    + cloudPad(100, 1000, 0.9) + cloudPad(580, 1000, 0.9)
    + peter(100, 995, 1.0, { age: 'old', halo: true, mood: 'determined', armL: 14, armR: [60, 3, 2.4], propR: keys(0.7) })
    + paul(580, 995, 1.0, { halo: true, mood: 'determined', flip: true, armL: 14, armR: [40, 2, 2.6], propR: sword })
    + sparkles(14, 40, 680, 700, 1040, { seed: 9, color: '#fff2c4' }) + '</g>';
  return FAR(sky(SKIES.sunrise) + rays(360, 700, { op: 0.1 }) + sun(360, 700, 60, 320))
    + BACK(clouds(460, { color: '#fff7e8', op: 0.7, seed: 6 }) + hill(1080, 30, '#b0a0a8', 3) + hill(1140, 24, '#8a9a6a', 5, { freq: 1.4 }))
    + MID(`<rect x="-200" y="1160" width="${W + 400}" height="80" fill="#7aa0c0"/>` + waves(1162, 4, 260, 6, '#8ab4d0', { foam: '#e0f0f8' }))
    + ground(1230, '#9a8a5a', { rim: '#c8b47a' }) + tufts(1236, 10, '#6a6a3a', { seed: 8 })
    + vision
    + leo(360, 1310, 1.95, { mood: 'peaceful', armL: [22, 2, 3], armR: [22, 2, 3.2] })
    + `<g${M.tw([{ at: 0.6, dur: 9, from: { x: 0 }, to: { x: 420 }, ease: 'power1.in' }])}>`
    + horse(820, 1310, 0.95, { c: '#5a3a2a', mane: '#2a1a14', cloth: '#3a5a4a', walk: true })
    + rider(attila, 800, 1310, 0.95, 1.25, { mood: 'surprised', armL: 20, armR: 20 }) + '</g>'
    + motes(12, { y0: 600, y1: 1200, seed: 7, color: '#fff2c4' })
    + NEAR(bokeh(6, { seed: 17 }) + foliage('l', 1660, { color: '#3a4a2a', seed: 2 }));
}

// 7 · Genseric at the gates; the basilicas spared
function scene7() {
  const fam = (mood) => person(90, 1300, 1.4, { kind: 'layman', girl: true, robe: true, top: '#5a7ab0', skin: SKIN.s1, hair: '#2a1a10', mood, armL: 40, armR: 20 })
    + person(200, 1305, 1.05, { kind: 'kid', top: '#d8644e', skin: SKIN.s1, mood, armL: 30, armR: mood === 'joy' ? [130, 12, 1.2] : 10 });
  return FAR(sky(SMOKY) + glow(540, 760, 320, 0.35))
    + BACK(clouds(470, { color: '#a89aa8', op: 0.6, seed: 4, drift: 30 }) + romeSkyline(540, 1000, 0.9, { c: '#7a5a6a', win: '#ffd98a' })
      + oldStPeters(540, 1060, 0.62, { wall: '#c8b49a', roof: '#6a4a4a' }))
    + MID(gate(540, 1190, 0.62, { wall: '#9a8a8a' }))
    + ground(1230, '#8a7a6a', { rim: '#b8a48a' }) + tufts(1236, 10, '#5a4a3a', { seed: 6 })
    + `<g${fadeOut(S7C)}>${fam('worried')}</g><g${fadeIn(S7C)}>${fam('joy')}</g>`
    + leo(540, 1315, 2.05, { mood: 'determined', armL: [66, 3, 2.4], armR: [66, 3, 2.7] })
    + `<g${fadeOut(S7B + 2)}>${genseric(900, 1310, 1.75, { mood: 'stern', flip: true, armL: [26, 2, 3], armR: 14, propL: spear })}</g>`
    + `<g${fadeIn(S7B + 2)}>${genseric(900, 1310, 1.75, { mood: 'happy', flip: true, armL: [26, 2, 3], armR: 14, propL: spear })}</g>`
    + motes(10, { color: '#d8d0c8', seed: 8, y0: 620, y1: 1200 })
    + NEAR(foliage('r', 1680, { color: '#2a2430', seed: 3 }));
}

// 8 · death, November 10, 461; first pope buried in St. Peter's
function scene8() {
  const mourners = [[150, 'sad', 0], [930, 'peaceful', 1]].map(([x, mood, i]) => person(x, 1300, 1.3, { kind: 'priest', top: '#f2ead8', collar: false, beard: i ? '#5a3e2a' : null, skin: i ? SKIN.priest : SKL, hair: '#3a2a18', mood, flip: i === 1, armL: 12, armR: [52, 2, 3], propR: candle })).join('');
  return FAR(sky(SKIES.deep, { stars: 44, seed: 9 }) + rays(540, 700, { op: 0.07 }))
    + BACK(oldStPeters(540, 1200, 0.95, { wall: '#7a6080', roof: '#3e2e54', win: '#ffd98a' }) + hill(1210, 12, '#4a3560', 5))
    + ground(1230, '#44324e', { rim: '#8a6a8a' }) + tufts(1236, 10, '#2a1c34', { seed: 7 })
    + `<g${fadeIn(2.4, 3)}>${beam(450, 640, 310, 770, 1340, 0.5)}${motes(14, { x0: 360, x1: 720, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + mourners
    + leo(540, 1320, 1.95, { mood: 'peaceful', halo: 2.6, armL: [22, 2, 3], armR: [22, 2, 3.3] })
    + NEAR(bokeh(6, { seed: 19, op: [0.25, 0.55] }) + foliage('l', 1640, { color: '#1c1428', seed: 2 }));
}

// 9 · "the Great", Doctor of the Church, feast day
function scene9() {
  const kids = [[110, '#4b8bc4', SKL, false], [235, '#e2b448', SKIN.fair, true], [845, '#d8644e', '#a06a44', true], [970, '#6aa457', SKIN.priest, false]]
    .map(([x, top, skin, girl], i) => person(x, 1335, 1.2, { mood: 'joy', kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#c98a3a' : '#2a1a10', pants: '#3a3a4a', armL: i === 0 || i === 3 ? [120, 14, 1.3] : 14, armR: 14 })).join('');
  return FAR(sky(GOLDSKY) + rays(540, 640, { op: 0.13 }) + glow(540, 760, 440, 0.6))
    + BACK(clouds(800, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + oldStPeters(540, 1200, 0.85, { wall: '#c89a7a', roof: '#7a4a4a' }))
    + MID(followers(1250, 12, { color: '#6a3e3e' }))
    + ground(1260, '#8a5a4a', { rim: '#e0a07a' }) + tufts(1266, 10, '#5a3a2e', { seed: 7 })
    + leo(540, 1310, 2.15, { mood: 'joy', halo: 0.3, armL: [46, 2, 3], armR: [60, 4, 2.6], propL: ferula(230), propR: book(true) })
    + kids
    + `<g${fadeIn(0.8, 1.2)}>${sparkles(12, 600, 800, 900, 1060, { seed: 2, color: '#fff2c4' })}</g>`
    + petals(18, { seed: 4, colors: ['#ffffff', '#f2c46b', '#f2a0b0'] })
    + NEAR(bokeh(6, { seed: 23 }) + foliage('l', 1620, { color: '#3a2420' }) + foliage('r', 1640, { color: '#3a2420', seed: 5 }));
}

export const STORY = {
  slug: 'st_leo_the_great', name: 'St_Leo_the_Great',
  voice: 'am_michael', speed: 1.0,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'He stood before Attila the Hun', thumb_title: 'St. Leo the Great', thumb_shift: 40, thumb_t: 3,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'tʃˈælsɛdən': 'kˈælsɪdən',                 // Chalcedon (KAL-si-don)
    'dʒɛnsˈɛɹɪk': 'dʒˈɛnsəɹɪk',                // Genseric (JEN-ser-ik)
    'mˈɪnsɪˌoʊ': 'mˈiːntʃoʊ',                  // Mincio (MEEN-cho)
    'noʊvˈɛmbɚ tˈɛn': 'noʊvˈɛmbɚ tˈɛnθ',       // November 10 -> tenth
  },
  scenes: [
    { kicker: '452 · NORTHERN ITALY', title: 'No Army, Only Faith', art: scene0, cam: 'push-fast',
      say: ['Attila the Hun was marching on Rome, and one man went out to meet him, with no army.', 'This is Saint Leo the Great.'] },
    { kicker: 'TUSCANY · ITALY', title: 'A Son of Tuscany', art: scene1, cam: 'drift-r',
      say: ['Leo was born in Tuscany, in Italy, and grew up to serve the Church in Rome.'] },
    { kicker: '440 · GAUL', title: 'Called to Lead', art: scene2, cam: 'pan-r',
      say: ['In 440, he was making peace between two generals in Gaul when the pope died.', 'Rome chose Leo as the new pope.'] },
    { kicker: '440 · ROME', title: 'Shepherd of Rome', art: scene3, cam: 'drift-l',
      say: ['As pope, he preached, cared for the poor, and taught the faith clearly.'] },
    { kicker: '451 · CHALCEDON', title: 'Peter Has Spoken', art: scene4, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['In 451, bishops met at Chalcedon to defend the truth that Jesus is fully God and fully man.', "When Leo's letter was read, they cried out, Peter has spoken through Leo!"] },
    { kicker: '452 · MINCIO RIVER', title: 'Face to Face', art: scene5, cam: { move: 'push', amt: 0.08, ox: 560, oy: 1000 },
      say: ['In 452, Attila swept into Italy, destroying city after city.', 'Leo went out to meet him by the Mincio River.'] },
    { kicker: '452 · ITALY SPARED', title: 'The Hun Turns Back', art: scene6, cam: 'dolly',
      say: ['Attila turned back and left Italy.', 'One famous story says he saw Saints Peter and Paul beside the pope.'] },
    { kicker: '455 · ROME', title: 'Mercy at the Gates', art: scene7, cam: 'pan-l',
      say: ['In 455, the Vandal king Genseric reached Rome.', 'Leo could not stop the attack, but he saved the great basilicas, and the thousands sheltering inside.'] },
    { kicker: 'NOVEMBER 10, 461 · ROME', title: 'Home to God', art: scene8, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ["Leo died on November 10, 461, and was the first pope buried in Saint Peter's."] },
    { kicker: 'FEAST DAY · NOVEMBER 10', title: 'Doctor of the Church', art: scene9, cam: 'arc-r',
      say: ['The first pope called the Great, he was named a Doctor of the Church in 1754.', 'His feast day is November 10.', 'Saint Leo the Great, pray for us.'] },
  ],
};
