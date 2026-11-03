// St. Joan of Arc (feast: May 30)
import { W, M, SKIES, SKIN, SKINS, CREAM, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts,
  flowers, butterflies, petals, person, lily, basilica, crowd, ground, dark, light, rng, f } from '../art.mjs';
import { perched, flyer, tree, smallCross, mitre, cope, stole } from './francis.mjs';

const SKJ = SKIN.fair;
const HAIR = '#6b4a2a';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ---------------------------------------------------------------- props / overlays
export const fleur = (x, y, s = 1, c = GOLD) => `<g transform="translate(${x},${y}) scale(${s})" fill="${c}"><path d="M0 -22 Q9 -8 0 8 Q-9 -8 0 -22Z"/>`
  + `<path d="M-3 4 Q-18 -10 -14 4 Q-10 12 -3 8Z"/><path d="M3 4 Q18 -10 14 4 Q10 12 3 8Z"/><rect x="-10" y="6" width="20" height="4" rx="2"/><path d="M-3 10 L0 20 L3 10Z"/></g>`;
// Joan's standard: white field, gold fleurs-de-lis, waving on a tall staff (h = staff height above the hand)
export const standard = (h = 300) => `<g><rect x="-5" y="${-h}" width="10" height="${h + 60}" rx="4" fill="#8a6234"/><circle cx="0" cy="${-h - 6}" r="9" fill="${GOLD}"/>`
  + `<g transform="translate(5,${-h + 6})"><g${M.sway(4, 1.6, 0, 0, 0)}><path d="M0 0 Q70 -14 140 6 Q150 50 142 96 Q70 80 0 96Z" fill="#faf6ec"/><path d="M96 -6 Q130 -2 140 6 Q150 50 142 96 Q120 90 100 88Z" fill="#e2dccd"/>`
  + fleur(40, 34, 0.9) + fleur(96, 30, 0.9) + fleur(68, 70, 0.9) + `<rect x="0" y="0" width="6" height="96" fill="#2f4a8a"/></g></g></g>`;
export const sword = `<g transform="translate(0,-4)"><rect x="-4" y="-150" width="8" height="140" fill="#dfe5ec"/><rect x="0" y="-150" width="4" height="140" fill="#b8c2ce"/><path d="M-4 -150 L0 -164 L4 -150Z" fill="#dfe5ec"/>`
  + `<rect x="-24" y="-12" width="48" height="9" rx="4" fill="${GOLD}"/><rect x="-4" y="-4" width="8" height="26" rx="3" fill="#6b4a2a"/><circle cx="0" cy="24" r="6" fill="${GOLD}"/></g>`;
const basket = `<g><path d="M-30 -10 Q0 24 30 -10Z" fill="#b07a3a"/><path d="M-26 -10 Q0 -44 26 -10" stroke="#8a5a2a" stroke-width="4" fill="none"/><circle cx="-8" cy="-12" r="8" fill="#f6f0e2"/><circle cx="8" cy="-14" r="8" fill="#efe6d0"/></g>`;
const bob = `<path d="M-42 -262 Q-46 -224 -34 -212 L-30 -246Z M42 -262 Q46 -224 34 -212 L30 -246Z" fill="${HAIR}"/>`;
const armor = bob
  + `<path d="M-37 -207 Q0 -218 37 -207 L43 -101 Q0 -92 -43 -101 Z" fill="#c4ccd6"/><path d="M-20 -200 Q0 -206 20 -200 L22 -120 Q0 -114 -22 -120Z" fill="#dfe5ec"/><path d="M13 -212 L37 -207 L43 -101 L19 -95Z" fill="#8a96a6" opacity=".55"/>`
  + `<path d="M-26 -150 Q0 -142 26 -150 M-28 -126 Q0 -118 28 -126" stroke="#8a96a6" stroke-width="3" fill="none"/>`
  + `<path d="M-38 -104 L38 -104 L46 -60 Q0 -48 -46 -60Z" fill="#2f4a8a"/>` + fleur(0, -80, 0.7)
  + `<rect x="-42" y="-110" width="84" height="10" rx="4" fill="#6b4a2a"/><rect x="-6" y="-112" width="12" height="14" rx="2" fill="${GOLD}"/>`
  + `<ellipse cx="-40" cy="-200" rx="20" ry="16" fill="#aeb8c4"/><ellipse cx="40" cy="-200" rx="20" ry="16" fill="#8a96a6"/>`;
export const joan = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#c4ccd6', pants: '#9aa4b2', skin: SKJ, hair: HAIR, over: armor, ...o });
const helmet = `<path d="M-44 -258 Q-44 -312 0 -312 Q44 -312 44 -258 L44 -248 L-44 -248Z" fill="#9aa4b2"/><path d="M-44 -252 H44" stroke="#6e7a8a" stroke-width="5"/><path d="M0 -312 V-252" stroke="#c4ccd6" stroke-width="4"/>`;
const soldierArmor = `<path d="M-37 -207 Q0 -218 37 -207 L43 -101 Q0 -92 -43 -101 Z" fill="#9aa4b2"/><path d="M13 -212 L37 -207 L43 -101 L19 -95Z" fill="#6e7a8a" opacity=".5"/><path d="M-38 -104 L38 -104 L44 -64 Q0 -54 -44 -64Z" fill="#7a2e3a"/>`;
const soldier = (x, y, s, o = {}) => person(x, y, s, { mood: 'joy', kind: 'layman', top: '#9aa4b2', pants: '#6e7a8a', skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424', over: soldierArmor + helmet, ...o });
const pennant = (c) => `<g><rect x="-4" y="-260" width="8" height="300" rx="3" fill="#7a5536"/><g transform="translate(4,-256)"><g${M.sway(6, 1.4, 0, 0, 0)}><path d="M0 0 L90 18 L0 40Z" fill="${c}"/></g></g></g>`;

// French chateau / town silhouette with conical towers
export function chateau(x, y, s = 1, { wall = '#e2d6c0', roof = '#4a5a7a', win = null, shade = 0.18 } = {}) {
  const tw = (tx, h, w) => `<rect x="${tx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${light(wall, 0.05)}"/><rect x="${tx + w / 6}" y="${-h}" width="${w / 3}" height="${h}" fill="${dark(wall, shade)}" opacity=".5"/>`
    + `<path d="M${tx - w / 2 - 8} ${-h} L${tx} ${-h - w * 1.3} L${tx + w / 2 + 8} ${-h}Z" fill="${roof}"/><rect x="${tx - 8}" y="${-h + 40}" width="16" height="26" rx="7" fill="${win || dark(wall, 0.45)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-300" y="-200" width="600" height="200" fill="${wall}"/>`
    + Array.from({ length: 13 }, (_, i) => `<rect x="${-300 + i * 48}" y="-216" width="26" height="18" fill="${wall}"/>`).join('')
    + `<rect x="-300" y="-200" width="600" height="200" fill="${dark(wall, shade)}" opacity=".15"/><path d="M-50 0 V-90 A50 50 0 0 1 50 -90 V0Z" fill="${dark(wall, 0.5)}"/>`
    + tw(-300, 300, 90) + tw(300, 300, 90) + tw(-120, 380, 80) + tw(140, 420, 90) + '</g>';
}
export function gothic(x, y, s = 1, { wall = '#e8dcc2', win = '#7aa6d8', shade = 0.18 } = {}) {
  const tower = (tx) => `<rect x="${tx - 80}" y="-620" width="160" height="620" fill="${wall}"/><rect x="${tx + 30}" y="-620" width="50" height="620" fill="${dark(wall, shade)}" opacity=".5"/>`
    + `<path d="M${tx - 40} -420 V-520 A40 40 0 0 1 ${tx + 40} -520 V-420Z" fill="${dark(wall, 0.45)}"/>` + [0, 1, 2, 3].map((k) => `<rect x="${tx - 76 + k * 42}" y="-646" width="26" height="28" fill="${wall}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">${tower(-200)}${tower(200)}<rect x="-120" y="-460" width="240" height="460" fill="${light(wall, 0.06)}"/>`
    + `<path d="M-130 -460 L0 -560 L130 -460Z" fill="${wall}"/><circle cx="0" cy="-330" r="70" fill="${win}"/><circle cx="0" cy="-330" r="70" fill="none" stroke="${dark(wall, 0.3)}" stroke-width="10"/>`
    + Array.from({ length: 8 }, (_, i) => `<path d="M0 -330 L${f(70 * Math.cos(i * Math.PI / 4))} ${f(-330 + 70 * Math.sin(i * Math.PI / 4))}" stroke="${dark(wall, 0.3)}" stroke-width="5"/>`).join('')
    + [-200, 0, 200].map((px) => `<path d="M${px - 56} 0 V-150 Q${px} -250 ${px + 56} -150 V0Z" fill="${dark(wall, 0.5)}"/><path d="M${px - 66} 0 V-150 Q${px} -262 ${px + 66} -150" stroke="${dark(wall, 0.15)}" stroke-width="10" fill="none"/>`).join('') + '</g>';
}
function village(y, { wall = '#efe2c8', timber = '#6b4a2a', roof = '#9a5a3a' } = {}) {
  let s = '';
  [[120, 150, 200], [330, 130, 170], [780, 140, 190], [960, 150, 160]].forEach(([x, w, h], i) => {
    s += `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x - w / 2} ${y - h} L${x + w / 2} ${y} M${x + w / 2} ${y - h} L${x - w / 2} ${y} M${x - w / 2} ${y - h / 2} H${x + w / 2} M${x} ${y - h} V${y}" stroke="${timber}" stroke-width="6"/>`
      + `<path d="M${x - w / 2 - 14} ${y - h} L${x} ${y - h - 90} L${x + w / 2 + 14} ${y - h}Z" fill="${i % 2 ? dark(roof, 0.1) : roof}"/><rect x="${x - 16}" y="${y - 60}" width="32" height="60" rx="10" fill="${dark(timber, 0.2)}"/>`;
  });
  s += `<rect x="500" y="${y - 260}" width="90" height="260" fill="${wall}"/><path d="M490 ${y - 260} L545 ${y - 440} L600 ${y - 260}Z" fill="#5a6a7a"/><rect x="541" y="${y - 480}" width="8" height="44" fill="#5a6a7a"/><rect x="530" y="${y - 468}" width="30" height="7" fill="#5a6a7a"/>`;
  return s;
}
function sheep(x, y, s = 1, ph = 0) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="46" ry="9" fill="#1a0f1a" opacity=".18" filter="url(#soft)"/><g${M.bob(2, 2 + ph, ph)}>`
    + `<rect x="-26" y="-22" width="9" height="24" rx="4" fill="#4a3a3a"/><rect x="18" y="-22" width="9" height="24" rx="4" fill="#4a3a3a"/>`
    + [[-20, -40], [0, -48], [20, -40], [-10, -30], [12, -30]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="20" fill="#f4efe4"/>`).join('')
    + `<g transform="translate(34,-44)"><ellipse rx="16" ry="13" fill="#4a3a3a"/><circle cx="6" cy="-3" r="2.6" fill="#fff"/><ellipse cx="-10" cy="-10" rx="8" ry="4" fill="#4a3a3a" transform="rotate(-20)"/></g></g></g>`;
}

// ---------------------------------------------------------------- scenes
function scene0() {
  return sky(SKIES.dusk, { stars: 24, seed: 8 })
    + rays(540, 720, { op: 0.08 }) + glow(540, 1150, 520, 0.85)
    + clouds(600, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 5 })
    + chateau(540, 1235, 1.1, { wall: '#5e4466', roof: '#3a2a48', win: '#ffd98a', shade: 0.3 })
    + ground(1290, '#3e2a44', { rim: '#c07a7a' }) + tufts(1296, 10, '#2e1e34', { seed: 3 })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${joan(540, 1262, 2.35, { mood: 'determined', halo: 0.6, armL: [22, 2, 3], armR: [18, 2, 3.4], propL: `<g transform="scale(-.82,.82)">${standard(270)}</g>`, propR: sword })}</g>`
    + flyer(200, 780, '#f6f0e2', 1.0, { ph: 0.3 }) + flyer(880, 720, '#f6f0e2', 0.9, { dx: 80, ph: 1.1 })
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + foliage('l', 1600, { color: '#2a1a34', seed: 6 }) + foliage('r', 1640, { color: '#2a1a34', seed: 1 });
}

function scene1() {
  return sky(SKIES.day)
    + sun(860, 520, 56, 260) + clouds(450, { seed: 6 })
    + hill(1020, 50, '#a8c9b0', 3) + hill(1090, 40, '#86b86a', 5, { top: '#b0dc8a' })
    + village(1180)
    + ground(1180, '#9ac46e', { rim: '#b8e08e' })
    + sheep(250, 1300, 1.0) + sheep(140, 1330, 0.85, 0.5)
    + person(560, 1325, 1.7, { kind: 'layman', girl: true, top: '#b8323e', pants: '#7a2e3a', skin: SKJ, hair: HAIR, armL: 16, armR: [40, 6, 2.4], propR: basket })
    + butterflies(2, { x0: 500, x1: 1000, y0: 960, y1: 1100, seed: 6 })
    + flowers(1300, 1420, 14, { seed: 8 }) + tufts(1300, 10, '#6aa457', { seed: 4 })
    + foliage('r', 1640, { color: '#2f5a35', seed: 2 });
}

function scene2() {
  const angel = `<path d="M-30 -200 Q-150 -260 -170 -120 Q-110 -150 -40 -140Z M30 -200 Q150 -260 170 -120 Q110 -150 40 -140Z" fill="#fff6e0" opacity=".9"/>`;
  const voices = `<g opacity=".72"${M.tw([{ at: 0.8, dur: 2, from: { opacity: 0 }, to: { opacity: 0.72 } }])}>`
    + `<g${M.bob(10, 4)}>${person(540, 900, 1.15, { mood: 'peaceful', kind: 'layman', top: '#f6e6c0', pants: '#e2cf9c', skin: SKIN.fair, hair: '#c98a3a', under: angel, halo: true, armL: 20, armR: [60, 4, 3], propR: sword })}</g>`
    + `<g${M.bob(10, 4.4, 0.6)}>${person(300, 960, 1.0, { mood: 'peaceful', kind: 'royal', girl: true, top: '#f2d6e2', skin: SKIN.fair, hair: '#8a5a32', halo: true, armL: 24, armR: 18, propR: palm(0.8) })}</g>`
    + `<g${M.bob(10, 4.8, 1.2)}>${person(780, 960, 1.0, { mood: 'peaceful', kind: 'layman', girl: true, top: '#d6e6f2', skin: SKIN.fair, hair: '#c98a3a', halo: true, armL: 18, armR: [30, 3, 3], propR: smallCross })}</g></g>`;
  return sky(SKIES.sunrise)
    + glow(540, 800, 520, 0.8) + rays(540, 820, { op: 0.12, speed: 2 })
    + hill(1080, 50, '#b9cfa0', 4)
    + tree(140, 1240, 0.8, '#5a9a4a') + tree(1000, 1250, 0.75, '#4b8a46')
    + voices
    + ground(1180, '#86b86a', { rim: '#b0dc8a' }) + flowers(1200, 1300, 12, { seed: 2 })
    + `<g transform="translate(560,1330)"><circle r="160" fill="url(#haloGlow)" opacity=".5" transform="translate(0,-260)"/></g>`
    + person(560, 1335, 1.65, { mood: 'surprised', kind: 'layman', girl: true, top: '#b8323e', pants: '#7a2e3a', skin: SKJ, hair: HAIR, armL: [62, 3, 3], armR: [62, 3, 3.2] })
    + motes(14, { y0: 700, y1: 1250, seed: 5 })
    + foliage('l', 1640, { color: '#2f5a35', seed: 7 });
}
const palm = (s) => `<g transform="scale(${s}) rotate(-10)"><path d="M0 20 Q5 -60 0 -140" stroke="#46742f" stroke-width="6" fill="none"/>`
  + Array.from({ length: 9 }, (_, i) => `<path d="M0 ${-i * 14} q-18 -6 -28 10 M0 ${-i * 14} q18 -6 28 10" stroke="#5f9a4a" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('') + '</g>';

function scene3() {
  return sky([[0, '#7fbde0'], [0.6, '#d8eef4'], [1, '#d8eef4']])
    + clouds(470, { seed: 11, op: 0.8 })
    + chateau(540, 1170, 1.25, {})
    + ground(1170, '#cdb894') + `<path d="M-40 1240 H1120 M-40 1310 H1120" stroke="#b8a37e" stroke-width="3"/>`
    + `<g transform="translate(-20,1310)">${pennant('#2f4a8a')}</g>`
    + person(330, 1320, 1.75, { mood: 'surprised', kind: 'royal', top: '#2f4a8a', skin: SKIN.priest, hair: '#4a3424', beard: false, over: fleur(-14, -150, 0.8) + fleur(16, -90, 0.8), armR: [60, 6, 2.2], armL: 14 })
    + person(140, 1325, 1.5, { kind: 'layman', top: '#7a2e5a', pants: '#3a3060', skin: SKIN.priest, hair: '#6b4a2a', armL: 10, armR: 10 })
    + person(640, 1325, 1.6, { mood: 'determined', kind: 'layman', top: '#3a4a6a', pants: '#2a2a3a', skin: SKJ, hair: HAIR, over: bob, talk: true, armL: [70, 8, 1.8], armR: 18 })
    + person(900, 1325, 1.55, { mood: 'worried', kind: 'elder', skin: SKIN.priest, armL: 12, armR: 20 })
    + foliage('r', 1650, { color: '#4a3a2a', seed: 3 });
}

function scene4() {
  const walls = `<rect x="-200" y="900" width="${W + 400}" height="260" fill="#cbb994"/>` + Array.from({ length: 24 }, (_, i) => `<rect x="${-200 + i * 64}" y="882" width="36" height="22" fill="#cbb994"/>`).join('')
    + [80, 540, 1000].map((tx) => `<rect x="${tx - 60}" y="760" width="120" height="400" fill="#d9c8a4"/><path d="M${tx - 70} 760 L${tx} 650 L${tx + 70} 760Z" fill="#5a6a8a"/><rect x="${tx - 10}" y="800" width="20" height="40" rx="9" fill="#5a4636"/>`).join('');
  return sky(SKIES.sunrise)
    + sun(840, 560, 60, 320) + clouds(470, { color: '#fff7e8', op: 0.7, seed: 4 })
    + walls
    + ground(1160, '#a8b86e', { rim: '#c8d88e' })
    + soldier(150, 1300, 1.45, { armR: [110, 10, 1.4], propR: pennant('#c8323a'), armL: 10 })
    + soldier(330, 1310, 1.5, { armL: [120, 12, 1.2], armR: 14 })
    + soldier(900, 1300, 1.45, { flip: true, armR: [110, 10, 1.5], propR: pennant('#2f4a8a'), armL: 10 })
    + joan(620, 1330, 1.8, { mood: 'determined', armL: [150, 6, 1.6], propL: `<g transform="scale(.9)">${standard(260)}</g>`, armR: [20, 3, 2], propR: sword })
    + petals(14, { seed: 6, colors: ['#ffffff', '#f2c46b'] })
    + tufts(1180, 12, '#7a9a4a', { seed: 9 })
    + foliage('l', 1650, { color: '#3a4a2a', seed: 4 });
}

function scene5() {
  const crown = `<path d="M-31 -285 L-31 -314 L-15 -299 L0 -320 L15 -299 L31 -314 L31 -285 Z" fill="${GOLD}" stroke="#b08a3a" stroke-width="3"/>`;
  return sky(SKIES.gold)
    + rays(540, 600, { op: 0.12 }) + glow(540, 640, 460, 0.7)
    + gothic(540, 1180, 1.1)
    + ground(1180, '#b8a37e', { rim: '#d8c49a' }) + `<rect x="380" y="1180" width="320" height="400" fill="#9a2e3a"/><rect x="380" y="1180" width="12" height="400" fill="${GOLD}"/><rect x="688" y="1180" width="12" height="400" fill="${GOLD}"/>`
    + person(330, 1320, 1.75, { mood: 'peaceful', kind: 'priest', top: '#f2ead8', beard: '#cfc8bc', hair: '#cfc8bc', collar: false, under: cope, over: mitre + stole, armL: 14, armR: [70, 4, 2.4] })
    + person(540, 1320, 1.85, { mood: 'joy', kind: 'royal', top: '#2f4a8a', skin: SKIN.priest, hair: '#4a3424', crown: false, over: `<g${M.in('drop', 1.2, 0.8)}>${crown}</g>` + fleur(-14, -150, 0.8) + fleur(16, -90, 0.8), armL: 22, armR: 22 })
    + joan(770, 1325, 1.65, { mood: 'joy', armR: [20, 2, 3], propR: `<g transform="scale(.7)">${standard(260)}</g>`, armL: 14 })
    + petals(22, { seed: 9 })
    + foliage('r', 1650, { color: '#4a3a2a', seed: 9 });
}

function scene6() {
  const judges = [140, 300, 460, 620, 780, 940].map((x, i) => person(x, 940, 1.0, { mood: 'stern', kind: i === 2 ? 'priest' : 'friar', top: i % 2 ? '#3a2a40' : '#2a2030', skin: SKIN.priest, hair: '#5a4a3a', beard: i % 3 ? '#5a4a3a' : false, armL: 10, armR: 10, over: i === 2 ? mitre : '' })).join('');
  return sky([[0, '#2a2236'], [1, '#4a3a52']])
    + `<rect x="-200" y="300" width="${W + 400}" height="900" fill="#3a2e44"/>`
    + [180, 540, 900].map((x) => `<path d="M${x - 70} 780 V560 A70 70 0 0 1 ${x + 70} 560 V780Z" fill="#7a6a9a" opacity=".6"/>`).join('')
    + judges
    + `<rect x="-40" y="900" width="1160" height="120" fill="#5a3e2e"/><rect x="-40" y="900" width="1160" height="14" fill="#7a5536"/>`
    + ground(1180, '#2e2438')
    + `<g opacity=".9">${beam(470, 610, 380, 700, 1340, 0.5)}</g>`
    + person(540, 1330, 1.7, { mood: 'determined', kind: 'layman', top: '#3a4a6a', pants: '#2a2a3a', skin: SKJ, hair: HAIR, over: bob, armL: [60, 3, 3], armR: [60, 3, 3.2] })
    + motes(10, { x0: 400, x1: 700, y0: 700, y1: 1250, seed: 3, rise: 40 });
}

function scene7() {
  const doves = [[500, 1000, 0], [620, 920, 0.6], [560, 1080, 1.1], [690, 1030, 1.7]]
    .map(([x, y, ph]) => flyer(x, y, '#f6f0e2', 0.8, { dx: (x - 590) * 0.6, dy: -420, ph })).join('');
  return sky(SKIES.deep, { stars: 36, seed: 6 })
    + glow(560, 1060, 420, 0.5)
    + chateau(540, 1210, 1.0, { wall: '#3a2848', roof: '#2a1f3a', win: '#ffd98a', shade: 0.3 })
    + `<g${M.tw([{ at: 2.5, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(470, 710, 300, 900, 1310, 0.6)}${motes(14, { x0: 380, x1: 820, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + `<g${M.tw([{ at: 3, dur: 1, from: { opacity: 0 }, to: { opacity: 1 } }])}>${doves}</g>`
    + ground(1290, '#2a1f30') + tufts(1296, 10, '#1e1626', { seed: 7 })
    + `<g transform="translate(330,1290)"><ellipse cx="0" cy="-40" rx="160" ry="90" fill="#ff9a4a" opacity=".35" filter="url(#blur14)"${M.flick(1.2, 0, 0.6)}/>`
    + `<path d="M-90 0 L-60 -60 L-20 -20 L0 -80 L30 -24 L60 -66 L90 0Z" fill="#5a3a2a"/><rect x="-10" y="-420" width="20" height="420" rx="6" fill="#6b4a2a"/><rect x="-60" y="-360" width="120" height="16" rx="6" fill="#6b4a2a"/></g>`
    + motes(16, { x0: 230, x1: 430, y0: 1050, y1: 1290, color: '#ffb060', seed: 12, rise: 260, size: [2, 5] })
    + person(600, 1305, 1.8, { mood: 'peaceful', kind: 'layman', top: '#f2ece0', pants: '#d8d0c0', robe: true, skin: SKJ, hair: HAIR, over: bob, halo: 3.2, armL: [28, 2, 3], armR: [40, 2, 3.3], propR: smallCross })
    + foliage('r', 1650, { color: '#1e1626', seed: 4 });
}

function scene8() {
  const banner = `<g transform="translate(540,560)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${joan(0, 400, 0.82, { halo: true, armL: [22, 2, 3], armR: [18, 2, 3.4], propL: `<g transform="scale(-.6,.6)">${standard(260)}</g>`, propR: sword })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return sky(SKIES.gold)
    + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7)
    + clouds(860, { color: '#ffe2b8', op: 0.5, seed: 16, drift: 30 })
    + basilica(540, 1180, 1.05, { color: '#3a2a40' })
    + banner
    + ground(1180, '#3a2a40')
    + crowd(1420, 12, { flags: [['#f6f2e8', '#f6f2e8', '#2f4a8a'], ['#f2c46b', '#f6f2e8', '#f2c46b']] })
    + petals(26, { seed: 2 });
}

function scene9() {
  const kids = [[150, '#4b8bc4', SKINS[1], false], [290, '#e2b448', SKIN.fair, true], [790, '#d8644e', SKIN.s3, true], [930, '#6aa457', SKIN.priest, false]]
    .map(([x, top, skin, girl], i) => person(x, 1330, 1.2, { mood: 'joy', kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#c98a3a' : '#3a2a1a', pants: '#3a3a4a', armL: 14, armR: i % 2 ? [120, 14, 1.3] : 14 })).join('');
  return sky([[0, '#3a4a8a'], [0.42, '#a0a6d0'], [0.68, '#f8d0a0'], [1, '#fbe0a8']], { stars: 6, seed: 3 })
    + rays(540, 640, { op: 0.1 }) + glow(540, 1150, 540, 0.85)
    + hill(1120, 50, '#9ab07a', 4) + chateau(860, 1150, 0.45, { wall: '#d8cbb0' })
    + hill(1190, 34, '#7fa860', 7, { top: '#a8d088' })
    + joan(540, 1262, 2.15, { mood: 'joy', halo: true, armL: [22, 2, 3], armR: [18, 2, 3.4], propL: `<g transform="scale(-.75,.75)">${standard(270)}</g>`, propR: sword })
    + kids
    + `<g transform="translate(70,1400)">${lily(0.9)}</g><g transform="translate(1010,1400)">${lily(0.9)}</g>`
    + flyer(230, 760, '#f6f0e2', 0.9, { ph: 0.2 }) + flyer(870, 820, '#f6f0e2', 0.8, { dx: 90, ph: 1.0 })
    + motes(12, { y0: 600, y1: 1250, seed: 4 })
    + ground(1320, '#6a8a50', { rim: '#9ac07a' }) + flowers(1340, 1440, 12, { seed: 6, colors: ['#ffffff', '#f6d36b', '#c99ef0'] })
    + petals(10, { seed: 3, colors: ['#ffe2a0', '#ffffff'] });
}

export const STORY = {
  slug: 'st_joan_of_arc', name: 'St_Joan_of_Arc',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'The teenager who led an army', thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'wˈʌn θˈaʊzənd fˈɔːɹhˈʌndɹɪd': 'fˈɔːɹtiːn',   // 1412, 1429, 1431, 1456 -> fourteen …
    'nˈaɪntiːnhˈʌndɹɪd': 'nˈaɪntiːn',            // 1920 -> nineteen twenty
    'dˈɑːmɹeɪmi': 'dɔːmɹeɪmˈiː',                  // Domrémy
    'tʃˈɪnɑːn': 'ʃiːnˈoʊn',                        // Chinon
    'ɹˈaɪmz': 'ɹˈæns',                             // Reims
    'ɹˈaʊən': 'ɹuːˈɑːn',                           // Rouen
  },
  scenes: [
    { kicker: 'THE MAID OF ORLÉANS', title: 'St. Joan of Arc', art: scene0, cam: [540, 760, 0.06],
      say: ['How did a teenage peasant girl lead an army and change the history of France?', 'This is Saint Joan of Arc.'] },
    { kicker: '1412 · DOMRÉMY, FRANCE', title: 'A Village Girl', art: scene1,
      say: ['Joan was born around 1412 in Domrémy, a small village in France, to a pious peasant family.', 'She helped at home, spun wool, and loved to pray.'] },
    { kicker: "AGE 13 · HER FATHER'S GARDEN", title: 'The Voices', art: scene2,
      say: ["At thirteen, in her father's garden, she began to hear voices: Saint Michael, Saint Catherine and Saint Margaret.", 'They told her to help the Dauphin, Charles, be crowned king of France.'] },
    { kicker: '1429 · CHINON', title: 'Meeting the Dauphin', art: scene3,
      say: ['At about seventeen, she traveled to the royal court at Chinon and won the trust of Charles.', 'He sent her with his army to Orléans.'] },
    { kicker: 'MAY 1429 · ORLÉANS', title: 'The Siege Is Lifted', art: scene4,
      say: ['Carrying her banner at the front, she inspired the French soldiers.', 'Within ten days, the long siege of Orléans was lifted.'] },
    { kicker: 'JULY 17, 1429 · REIMS', title: 'A King Is Crowned', art: scene5, cam: [540, 900, 0.05],
      say: ['On July 17, 1429, Charles was crowned king in Reims Cathedral, with Joan standing near him.'] },
    { kicker: '1430 – 1431 · ROUEN', title: 'Captured and Tried', art: scene6,
      say: ['The next year she was captured, sold to the English, and put on trial in Rouen.', 'Alone, she answered her judges with courage and faith.'] },
    { kicker: 'MAY 30, 1431 · ROUEN', title: 'Faithful to the End', art: scene7, cam: [600, 1000, 0.06],
      say: ['On May 30, 1431, she was burned at the stake.', 'She was only about nineteen, and died calling on the name of Jesus.'] },
    { kicker: '1456 · 1920', title: 'Declared a Saint', art: scene8, cam: [540, 800, 0.05],
      say: ['In 1456, a new trial declared her innocent.', 'Pope Benedict the Fifteenth canonized her in 1920.'] },
    { kicker: 'FEAST DAY · MAY 30', title: 'Patron of France', art: scene9, cam: [540, 900, 0.05],
      say: ['Her feast day is May 30. She is a patron of France and of soldiers.', 'Saint Joan of Arc, pray for us.'] },
  ],
};
