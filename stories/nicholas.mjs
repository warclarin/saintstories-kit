// St. Nicholas of Myra (feast: December 6). Lycian coast, rock tombs, gold bags, red-cope bishop exported for later reels.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, gulls, person, book, ship, crowd, ground, dark, light, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { mitre, stole, flyer } from './francis.mjs';
import { crozier, romChurch } from './martin_of_tours.mjs';
import { sword } from './joan_of_arc.mjs';

const SKN = '#d9a47e', WHITE = '#eeeae2', HAIRN = '#3a2a1e', RED = '#b8323e';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ---------------------------------------------------------------- props / overlays
export const goldBag = `<g><path d="M-16 -4 Q-20 22 0 24 Q20 22 16 -4 Q8 -12 0 -12 Q-8 -12 -16 -4Z" fill="#d9aa4a"/><path d="M4 -10 Q18 -6 16 -4 Q20 22 0 24 Q12 18 10 -6Z" fill="#a8822e" opacity=".6"/>`
  + `<path d="M-8 -12 Q0 -20 8 -12" stroke="#8a6a2a" stroke-width="4" fill="none"/><circle cx="-5" cy="6" r="3" fill="#fff3c8" opacity=".7"/><circle r="30" fill="url(#haloGlow)" opacity=".5"/></g>`;
// Book of the Gospels with the three gold balls of the dowry story
export const goldBallsBook = `<g transform="translate(0,6)">${book(false)}<circle cx="-11" cy="-14" r="9" fill="${GOLD}"/><circle cx="11" cy="-14" r="9" fill="${GOLD}"/><circle cx="0" cy="-30" r="9" fill="${GOLD}"/>`
  + `<circle cx="-14" cy="-17" r="3" fill="#fff4cc" opacity=".8"/><circle cx="8" cy="-17" r="3" fill="#fff4cc" opacity=".8"/><circle cx="-3" cy="-33" r="3" fill="#fff4cc" opacity=".8"/></g>`;
export const redCope = `<path d="M-40 -206 Q-92 -110 -84 -2 L84 -2 Q92 -110 40 -206 Z" fill="${RED}"/><path d="M40 -206 Q92 -110 84 -2 L58 -2 Q66 -110 30 -200Z" fill="#8a2230" opacity=".7"/>`
  + `<path d="M-40 -206 Q-92 -110 -84 -2 M40 -206 Q92 -110 84 -2" stroke="${GOLD}" stroke-width="7" fill="none"/>`;
const hoodCloak = `<path d="M-48 -262 Q-50 -316 0 -318 Q50 -316 48 -262 L52 -200 Q0 -192 -52 -200Z" fill="#4a3a52"/><path d="M-40 -206 Q-80 -110 -74 -4 L74 -4 Q80 -110 40 -206Z" fill="#4a3a52"/>`;
const hoodFront = `<path d="M-48 -262 Q-50 -316 0 -318 Q50 -316 48 -262 Q42 -296 0 -298 Q-42 -296 -48 -262Z" fill="#4a3a52"/>`;
export const bishopNicholas = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', top: '#f6f0e2', collar: false, skin: SKN, hair: WHITE, beard: WHITE,
  under: redCope, ...o, over: stole + mitre + (o.over || '') });
const youngNicholas = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#3f6fb8', skin: SKN, hair: HAIRN, beard: HAIRN, ...o });

// ---------------------------------------------------------------- set pieces
export function lycianTown(x, y, s = 1, { wall = '#f2ead8', roof = '#c98a5a', shade = 0.18, win = null } = {}) {
  let b = '';
  [[-460, 110, 120], [-340, 90, 150], [-220, 120, 110], [200, 110, 130], [320, 100, 160], [440, 120, 115]].forEach(([hx, w, h], i) => {
    const c = i % 2 ? wall : light(wall, 0.08);
    b += `<rect x="${hx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><rect x="${hx + w / 6}" y="${-h}" width="${w / 3}" height="${h}" fill="${dark(c, shade)}" opacity=".55"/>`
      + `<rect x="${hx - w / 2 - 6}" y="${-h - 10}" width="${w + 12}" height="12" fill="${roof}"/><rect x="${hx - 12}" y="${-h + 30}" width="24" height="30" rx="10" fill="${win || dark(c, 0.45)}"/>`;
  });
  b += `<rect x="-90" y="-210" width="180" height="210" fill="${light(wall, 0.1)}"/><path d="M-100 -210 Q0 -300 100 -210Z" fill="${roof}"/><path d="M0 -296 v-40 M-16 -322 h32" stroke="${GOLD}" stroke-width="6"/>`
    + `<path d="M-28 0 v-60 a28 28 0 0 1 56 0 v60Z" fill="${dark(wall, 0.5)}"/><rect x="-14" y="-170" width="28" height="44" rx="14" fill="${win || dark(wall, 0.4)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${b}</g>`;
}
// Cliff with Lycian rock-cut tombs (temple fronts carved in the rock, as at Myra)
export function rockTombs(x, y, s = 1, { rock = '#c9a882' } = {}) {
  const tomb = (tx, ty, k) => `<g transform="translate(${tx},${ty}) scale(${k})"><path d="M-40 0 V-70 L0 -96 L40 -70 V0Z" fill="${light(rock, 0.12)}"/><rect x="-30" y="-62" width="60" height="62" fill="${dark(rock, 0.35)}"/>`
    + `<path d="M-28 -62 V0 M28 -62 V0" stroke="${light(rock, 0.2)}" stroke-width="7"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-260 0 L-220 -260 Q-120 -330 40 -300 Q180 -280 240 -160 L260 0Z" fill="${rock}"/><path d="M40 -300 Q180 -280 240 -160 L260 0 L120 0Z" fill="${dark(rock, 0.2)}" opacity=".6"/>`
    + tomb(-130, -150, 1) + tomb(-30, -170, 1.1) + tomb(80, -140, 0.95) + tomb(-80, -60, 0.9) + tomb(40, -50, 1) + '</g>';
}
export function cypress(x, y, s = 1, c = '#2f5a3a') {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-6" y="-30" width="12" height="30" fill="#5a3a2a"/><g${M.sway(1.5, 4.6, x % 3, 0, 0)}><path d="M0 -300 Q36 -160 26 -30 Q0 -16 -26 -30 Q-36 -160 0 -300Z" fill="${c}"/><path d="M0 -300 Q36 -160 26 -30 Q14 -24 6 -26 Q18 -160 0 -300Z" fill="${dark(c, 0.25)}"/></g></g>`;
}
function stoneHouse(x, y, s = 1, { wall = '#c9b89a', win = '#ffd98a' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-170" y="-260" width="340" height="260" fill="${wall}"/><rect x="60" y="-260" width="110" height="260" fill="${dark(wall, 0.2)}" opacity=".55"/>`
    + `<rect x="-184" y="-276" width="368" height="20" fill="${dark(wall, 0.3)}"/><path d="M-40 0 v-110 a40 40 0 0 1 80 0 v110Z" fill="${dark(wall, 0.5)}"/>`
    + `<rect x="60" y="-210" width="76" height="80" rx="8" fill="${win}"/><circle cx="98" cy="-170" r="90" fill="url(#sunGlow)" opacity=".55"/><path d="M98 -210 v80 M60 -170 h76" stroke="${dark(wall, 0.35)}" stroke-width="5"/></g>`;
}
function cell() {
  let stones = '';
  for (let r = 0; r < 18; r++) for (let c = 0; c < 9; c++) {
    const x = -100 + c * 150 + (r % 2) * 75, y = 260 + r * 66;
    stones += `<rect x="${x}" y="${y}" width="140" height="58" rx="10" fill="${(r + c) % 3 ? '#4a3e46' : '#544652'}"/>`;
  }
  return `<rect x="-200" y="-400" width="${W + 400}" height="2700" fill="#2e2630"/>${stones}`
    + '<rect x="420" y="430" width="240" height="190" rx="12" fill="#f6dca0"/><rect x="420" y="430" width="240" height="190" rx="12" fill="url(#sunGlow)" opacity=".8"/>'
    + `<g fill="#2e2630">${[470, 525, 580].map((bx) => `<rect x="${bx}" y="430" width="12" height="190"/>`).join('')}</g>`;
}
const chest = `<g><rect x="-40" y="-40" width="80" height="44" rx="6" fill="${GOLD}"/><path d="M-40 -40 Q0 -70 40 -40Z" fill="#d9aa4a"/><rect x="-6" y="-30" width="12" height="16" fill="#8a6a2a"/><circle cy="-24" r="60" fill="url(#haloGlow)" opacity=".6"/></g>`;
const shoe = (x, y, c) => `<g transform="translate(${x},${y})"><path d="M-26 0 L-26 -24 Q-10 -30 0 -20 L30 -14 Q36 0 30 4 L-26 4Z" fill="${c}"/><rect x="-14" y="-46" width="26" height="24" rx="3" fill="${GOLD}"/><path d="M-1 -46 v24 M-14 -34 h26" stroke="${RED}" stroke-width="4"/></g>`;

// ---------------------------------------------------------------- scenes
// 0 · hook: the bishop at night with his three gold balls
function scene0() {
  return FAR(sky(SKIES.night, { stars: 40, seed: 12 }) + glow(540, 900, 520, 0.6))
    + BACK(clouds(560, { color: '#8a90b8', op: 0.4, drift: 30, seed: 2 }) + hill(1120, 40, '#2a3058', 4))
    + MID(stoneHouse(170, 1230, 0.8, { wall: '#6a6078' }) + cypress(980, 1240, 1.1, '#1e3a32') + cypress(880, 1250, 0.8, '#1e3a32'))
    + ground(1240, '#3a3450', { rim: '#7a6a9a' })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${bishopNicholas(560, 1300, 2.35, { mood: 'happy', halo: 0.6, armL: [26, 2, 3], armR: [40, 3, 3.4], propL: crozier, propR: goldBallsBook })}</g>`
    + sparkles(16, 200, 900, 500, 1100, { seed: 4 }) + motes(10, { y0: 560, y1: 1200, seed: 7 })
    + NEAR(foliage('l', 1640, { color: '#141428', seed: 3 }) + foliage('r', 1660, { color: '#141428', seed: 8 }));
}

// 1 · born c. 270 in Patara; gives away his inheritance
function scene1() {
  const poor = [[760, '#8a7a66', 'sad', false], [900, '#7a6a5a', 'joy', true]].map(([x, top, mood, girl], i) => person(x, 1300, i ? 1.05 : 1.4, { kind: i ? 'kid' : 'layman', top, pants: '#5a4a3a', skin: '#c48a5f', hair: '#2a1e16', girl, mood, flip: true, armL: [40, 4, 2.6], armR: 10 })).join('');
  return FAR(sky(SKIES.day) + sun(860, 520, 54, 250))
    + BACK(clouds(460, { seed: 3 }) + `<rect x="-200" y="1000" width="${W + 400}" height="300" fill="url(#seaG)"/>` + waves(1006, 4, 260, 7, '#5a9cc4', { foam: '#d9f0f7' }) + gulls(3, { y: 600 }))
    + MID(lycianTown(540, 1170, 0.95) + cypress(60, 1200, 0.8))
    + ground(1200, '#e2cfa0', { rim: '#f2e2bc' }) + tufts(1206, 8, '#b8a070', { seed: 3 })
    + youngNicholas(430, 1320, 1.85, { beard: null, mood: 'joy', armL: 12, armR: [70, 4, 2.6], propR: '<g transform="translate(0,-10)"><path d="M-36 -6 Q0 30 36 -6 Z" fill="#b07a3a"/><ellipse cx="-12" cy="-10" rx="14" ry="9" fill="#e2b061"/><ellipse cx="12" cy="-12" rx="14" ry="9" fill="#d9a04f"/></g>' })
    + poor
    + flowers(1290, 1370, 8, { seed: 2 })
    + NEAR(foliage('l', 1640, { color: '#3a5a2e', seed: 4 }));
}

// 2 · gold through the window at night
function scene2() {
  const girls = (mood) => [[120], [230], [330]].map(([x], i) => person(x, 1300, 1.05 + i * 0.02, { kind: 'layman', girl: true, top: ['#b8607a', '#7a8ac4', '#c49a5a'][i], pants: '#5a4a5a', skin: '#c48a5f', hair: '#2a1e16', mood: mood[i], armL: 10, armR: mood[i] === 'joy' ? [120, 10, 1.3] : 10 })).join('');
  const toss = `<g${M.tw([{ at: 1.2, dur: 1.1, from: { x: 0, y: 0, opacity: 1 }, to: { x: -170, y: -150, opacity: 0 }, ease: 'power1.out' }])}><g transform="translate(860,1000)">${goldBag}</g></g>`;
  return FAR(sky(SKIES.night, { stars: 44, seed: 5 }) + `<circle cx="820" cy="560" r="48" fill="#fff7dc"/>` + glow(820, 560, 260, 0.5))
    + BACK(hill(1080, 30, '#262c4e', 6) + clouds(620, { color: '#6a70a0', op: 0.4, drift: 30, seed: 7 }))
    + MID(stoneHouse(520, 1230, 1.1, { wall: '#7a7088' }))
    + ground(1230, '#2e2a42', { rim: '#5a5a7a' })
    + `<g${M.tw([{ at: 6.5, dur: 0.8, from: { opacity: 1 }, to: { opacity: 0 } }])}>${girls(['worried', 'sad', 'worried'])}</g>`
    + `<g opacity="0"${M.tw([{ at: 6.5, dur: 0.8, from: { opacity: 0 }, to: { opacity: 1 } }])}>${girls(['joy', 'joy', 'joy'])}</g>`
    + youngNicholas(880, 1320, 1.75, { mood: 'happy', under: hoodCloak, over: hoodFront, beard: HAIRN, armL: 10, armR: [130, 6, 2.2] })
    + toss
    + motes(10, { y0: 800, y1: 1150, x0: 500, x1: 900, seed: 3 })
    + NEAR(foliage('r', 1650, { color: '#141428', seed: 6 }));
}

// 3 · chosen bishop of Myra
function scene3() {
  const folk = [[130, '#7a2e5a'], [260, '#3f6fb8'], [820, '#5a8a4a'], [950, '#c47a3a']].map(([x, top], i) => person(x, 1290, 1.1, { kind: i === 1 ? 'priest' : 'layman', top, pants: '#4a3a40', skin: ['#d9a47e', SKIN.priest, '#c48a5f', '#e6bc96'][i], hair: '#2a1e16', beard: i === 1 ? '#5a4a3a' : null, girl: i === 2, mood: 'joy', flip: i > 1, armL: 10, armR: [120, 10, 1.4] })).join('');
  return FAR(sky(SKIES.sunrise) + sun(540, 620, 60, 320) + rays(540, 620, { op: 0.08 }))
    + BACK(clouds(470, { color: '#fff4e4', op: 0.8, seed: 8 }) + rockTombs(880, 1060, 0.9) + hill(1080, 20, '#d9b48a', 3))
    + MID(romChurch(470, 1220, 1.0, { wall: '#efe2c4', roof: '#a86a4a' }))
    + ground(1230, '#d9c49a', { rim: '#f2e2bc' })
    + folk
    + bishopNicholas(540, 1330, 1.95, { mood: 'surprised', hair: '#5a4a3a', beard: '#5a4a3a', armL: [40, 3, 2.6], armR: [26, 2, 3], propR: book(false) })
    + petals(14, { seed: 6, colors: ['#ffffff', '#f2c46b'] })
    + NEAR(foliage('l', 1640, { color: '#4a5a2e', seed: 9 }));
}

// 4 · imprisoned under Diocletian
function scene4() {
  return FAR(sky(SKIES.deep))
    + BACK(cell())
    + beam(450, 640, 300, 820, 1360, 0.5)
    + ground(1290, '#241c26', { rim: '#4a3c46' })
    + bishopNicholas(545, 1330, 2.05, { mood: 'peaceful', sitting: true, hair: '#7a6a5a', beard: '#7a6a5a', under: '', over: '', armL: [34, 2, 3], armR: [34, 2, 3.3], propR: book(false) })
    + `<g opacity="0"${M.tw([{ at: 4.6, dur: 1.4, from: { opacity: 0 }, to: { opacity: 1 } }])}>${glow(540, 820, 420, 0.8)}${sparkles(16, 300, 800, 500, 1100, { seed: 3 })}</g>`
    + motes(18, { y0: 520, y1: 1260, x0: 300, x1: 800, seed: 6 })
    + NEAR(`<rect x="-200" y="1560" width="${W + 400}" height="500" fill="#140e14" opacity=".6" filter="url(#blur14)"/>`);
}

// 5 · three innocent men saved
function scene5() {
  const men = (mood) => [180, 330, 480].map((x, i) => person(x, 1300, 1.05, { kind: 'layman', sitting: true, top: ['#8a7a66', '#6a7a8a', '#7a6a5a'][i], pants: '#4a3a40', skin: ['#d9a47e', '#c48a5f', '#e6bc96'][i], hair: '#2a1e16', beard: i === 1 ? '#2a1e16' : null, mood, armL: mood === 'joy' ? [120, 8, 1.4] : 20, armR: mood === 'joy' ? [120, 8, 1.5] : 20 })).join('');
  const governor = person(130, 1180, 1.0, { kind: 'royal', crown: false, top: '#6a3a6a', skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424', mood: 'worried', armL: 10, armR: 20 });
  const execu = person(600, 1300, 1.5, { kind: 'layman', top: '#5a4a5a', pants: '#3a3040', skin: '#c48a5f', hair: '#1a120c', beard: '#1a120c', mood: 'surprised', armL: 10, armR: [8, 2, 3], propR: `<g transform="rotate(180)">${sword}</g>` });
  return FAR(sky(SKIES.day) + sun(180, 520, 50, 240))
    + BACK(clouds(470, { seed: 10 }) + rockTombs(820, 1080, 0.8) + lycianTown(300, 1090, 0.6))
    + MID(`<rect x="-60" y="1080" width="400" height="110" fill="#c9b89a"/><rect x="-60" y="1080" width="400" height="14" fill="#a8977c"/>` + governor)
    + ground(1190, '#e2cfa0', { rim: '#f2e2bc' })
    + `<g${M.tw([{ at: 5, dur: 0.8, from: { opacity: 1 }, to: { opacity: 0 } }])}>${men('worried')}</g>`
    + `<g opacity="0"${M.tw([{ at: 5, dur: 0.8, from: { opacity: 0 }, to: { opacity: 1 } }])}>${men('joy')}</g>`
    + execu
    + `<g${M.tw([{ at: 0.4, dur: 1.2, from: { x: 90 }, to: { x: 0 }, ease: 'power2.out' }])}>${bishopNicholas(820, 1330, 1.85, { mood: 'determined', hair: '#7a6a5a', beard: '#7a6a5a', armL: [80, 3, 2.6], armR: [20, 2, 3], propR: crozier })}</g>`
    + NEAR(foliage('r', 1650, { color: '#4a5a2e', seed: 2 }));
}

// 6 · friend of sailors: the storm
function scene6() {
  const vision = `<g opacity="0"${M.tw([{ at: 1.2, dur: 1.6, from: { opacity: 0 }, to: { opacity: 1 } }])}>${glow(760, 700, 360, 0.9)}<g${M.bob(10, 3.6)}>${bishopNicholas(760, 960, 1.15, { mood: 'happy', halo: true, armL: [110, 4, 3], armR: [110, 4, 3.3] })}</g></g>`;
  return FAR(sky([[0, '#2a3048'], [0.5, '#5a6a8a'], [1, '#9aa8c0']]))
    + BACK(clouds(480, { color: '#6a7290', op: 0.85, drift: 80, seed: 5, n: 4 }) + clouds(700, { color: '#7a84a0', op: 0.7, drift: 60, seed: 9 }))
    + vision
    + `<rect x="-200" y="1060" width="${W + 400}" height="900" fill="#2e4a6a"/>`
    + waves(1070, 16, 300, 4, '#3e5e82', { foam: '#c8d8ea' })
    + `<g${M.sway(4, 3, 0, 380, 1180)}>${ship(380, 1190, 0.62)}</g>`
    + waves(1180, 20, 260, 3.4, '#2a4664', { foam: '#d8e6f4', phase: 1.3 })
    + waves(1260, 14, 220, 3, '#22405e', { foam: '#e6eef8', phase: 2.2 })
    + petals(30, { seed: 4, colors: ['#c8d4e6', '#e6eef8'], fall: 900 })
    + NEAR(`<rect x="-200" y="1560" width="${W + 400}" height="500" fill="#162a40" opacity=".7" filter="url(#blur14)"/>`);
}

// 7 · death in Myra, December 6, about 343
function scene7() {
  const mourners = [[220, 'sad'], [880, 'peaceful']].map(([x, mood], i) => person(x, 1300, 1.2, { kind: 'priest', top: '#3a2a40', collar: false, skin: i ? '#c48a5f' : SKIN.priest, hair: '#3a2a1e', beard: '#3a2a1e', mood, flip: i === 1, armL: [40, 2, 3], armR: [40, 2, 3.3] })).join('');
  return FAR(sky(SKIES.dusk, { stars: 22, seed: 9 }) + rays(540, 720, { op: 0.08 }))
    + BACK(rockTombs(860, 1120, 0.85, { rock: '#8a6a7a' }) + hill(1120, 20, '#5d3f6c', 5))
    + MID(romChurch(300, 1210, 0.75, { wall: '#b8a0a8', roof: '#4a3a52' }))
    + ground(1220, '#5a3a52', { rim: '#c08a8a' })
    + `<g${M.tw([{ at: 2.4, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(450, 640, 330, 760, 1340, 0.55)}${motes(14, { x0: 360, x1: 720, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + mourners
    + bishopNicholas(545, 1330, 1.95, { mood: 'peaceful', halo: 2.8, armL: [30, 2, 3], armR: [30, 2, 3.3], propL: crozier })
    + NEAR(foliage('l', 1640, { color: '#2a1a34', seed: 2 }));
}

// 8 · relics carried to Bari, 1087
function scene8() {
  return FAR(sky(SKIES.gold) + rays(820, 560, { op: 0.12 }) + glow(820, 600, 420, 0.7))
    + BACK(clouds(480, { color: '#fff0d4', op: 0.7, seed: 15 }))
    + MID(romChurch(800, 1080, 1.0, { wall: '#efe2c4', roof: '#9a6a4a' }) + `<rect x="560" y="1080" width="700" height="40" fill="#c9b89a"/>`)
    + `<rect x="-200" y="1080" width="${W + 400}" height="400" fill="#6a8ab8"/>`
    + waves(1096, 5, 260, 7, '#7a9cc8', { foam: '#e6f0fa' })
    + `<g${M.drift(90)}>${ship(330, 1200, 0.62, { crew: false })}<g transform="translate(300,1170)">${chest}</g></g>`
    + waves(1210, 6, 240, 6, '#5a7aa8', { foam: '#d6e6f6', phase: 1 })
    + ground(1280, '#b8a37e', { rim: '#d8c49a' })
    + MID(crowd(1360, 10, { color: '#3a2a3a', flags: [['#f6f2e8', RED, '#f6f2e8']] }))
    + flyer(200, 700, '#f6f0e2', 0.8, { ph: 0.3 }) + flyer(560, 640, '#f6f0e2', 0.7, { dx: 80, ph: 1.0 })
    + petals(16, { seed: 4, colors: ['#ffffff', '#f2c46b'] });
}

// 9 · feast day + patronage
function scene9() {
  const kids = [[130, '#4b8bc4', SKIN.s1, false], [270, '#e2b448', SKIN.fair, true], [830, '#d8644e', '#6e4428', true], [960, '#6aa457', SKIN.priest, false]]
    .map(([x, top, skin, girl], i) => person(x, 1330, 1.2, { mood: 'joy', kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#c98a3a' : '#2a1a10', pants: '#3a3a4a', armL: 14, armR: i % 2 ? [120, 14, 1.3] : 14 })).join('');
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + hill(1180, 36, '#5d3f6c', 3, { freq: 1.6 }))
    + glow(540, 1100, 500, 0.85)
    + MID(cypress(60, 1240, 0.9, '#2a3a3a') + cypress(1020, 1240, 0.95, '#2a3a3a'))
    + ground(1260, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1266, 10, '#3a2438', { seed: 7 })
    + bishopNicholas(540, 1262, 2.2, { mood: 'joy', halo: 0.3, armL: [26, 2, 3], armR: [40, 3, 3.4], propL: crozier, propR: goldBallsBook })
    + kids
    + shoe(440, 1350, '#6b4226') + shoe(650, 1350, '#7a2e3a')
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + petals(10, { seed: 3, colors: ['#ffe2a0', '#ffffff'] })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_nicholas', name: 'St_Nicholas',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'The real saint behind Santa', thumb_title: 'St. Nicholas', thumb_shift: 40,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'wˈʌn θˈaʊzənd ˈeɪɾi sˈɛvən': 'tˈɛn ˈeɪɾi sˈɛvən',   // 1087 -> ten eighty seven
    'pætˈɑːɹɹə': 'pˈætəɹə',                             // Patara
    'dɪəklˈɛʃən': 'daɪəklˈiːʃən',                       // Diocletian
    'bˈɑːɹɹi': 'bˈɑːɹi',                                // Bari
  },
  scenes: [
    { kicker: 'THE SECRET GIFT-GIVER', title: 'St. Nicholas', art: scene0, cam: { move: 'push', amt: 0.07, oy: 950 },
      say: ['Long before Santa Claus, a real bishop gave gifts in secret, at night, to people in need.', 'This is Saint Nicholas.'] },
    { kicker: 'ABOUT 270 · PATARA, LYCIA', title: 'A Generous Heart', art: scene1, cam: 'pan-r',
      say: ['Nicholas was born around 270 in Patara, a port town in what is now Turkey, to a wealthy Christian family.',
        'When his parents died, he gave his inheritance to the poor.'] },
    { kicker: 'BY NIGHT · LYCIA', title: 'Gold at the Window', art: scene2, cam: 'drift-l',
      say: ['One famous story tells of a poor father with three daughters, and no money for their dowries.',
        'Three times, Nicholas secretly tossed a bag of gold through their window at night.', 'When the father caught him, Nicholas begged him to tell no one.'] },
    { kicker: 'MYRA', title: 'Bishop of Myra', art: scene3, cam: { move: 'pull', amt: 0.07, oy: 1050 },
      say: ['He was chosen as bishop of Myra.', 'One story says the bishops picked the first priest to walk into church that morning, and it was Nicholas.'] },
    { kicker: 'UNDER DIOCLETIAN', title: 'Faith in Prison', art: scene4, cam: 'tilt-up',
      say: ['During the persecution under Emperor Diocletian, he was exiled and imprisoned for his faith.', 'He was set free when Constantine came to power.'] },
    { kicker: 'MYRA', title: 'Three Innocent Men', art: scene5, cam: { move: 'push', amt: 0.08, ox: 600, oy: 1050 },
      say: ['A bribed governor once condemned three innocent men to death.', 'Nicholas stopped the executioner, set them free, and called the governor to repent.'] },
    { kicker: 'THE LYCIAN COAST', title: 'Friend of Sailors', art: scene6, cam: 'pan-l',
      say: ['Sailors told how he came to their aid in a storm, and brought them safely to port.', 'Ever since, they have called him their patron.'] },
    { kicker: 'DECEMBER 6, 343 · MYRA', title: 'Home to God', art: scene7, cam: 'tilt-up',
      say: ['He died in Myra on December 6, around 343.', 'Pilgrims soon came from far and wide to pray at his tomb.'] },
    { kicker: '1087 · BARI, ITALY', title: 'Carried to Bari', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 1100 },
      say: ['In 1087, sailors from Bari carried his relics to Italy.', 'Pope Urban the Second placed them beneath the altar of a new church built in his honor.'] },
    { kicker: 'FEAST DAY · DECEMBER 6', title: 'Patron of Children', art: scene9, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['His feast day is December 6. He is patron of children, sailors and travelers.', 'His secret gifts inspired the custom of Saint Nicholas gifts, and later, Santa Claus.', 'Saint Nicholas, pray for us.'] },
  ],
};
