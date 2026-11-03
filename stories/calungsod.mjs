// Worked example: San Pedro Calungsod. Each scene's art() returns SVG (art coords, shifted down 70 px on screen).
import { W, H, M, SKIES, SKINS, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts,
  flowers, gulls, butterflies, petals, person, book, palm_frond, coconut, nipa_hut, ship, basilica, crowd, ground, dark, light } from '../art.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const pedroPortrait = (x, y, s, extra = {}) => person(x, y, s, {
  kind: 'pedro', armL: [24, 2, 3], armR: [22, 2, 3.4], halo: true,
  propL: palm_frond(1.1, -18), propR: book(false), ...extra });

function tree(x, y, s = 1) {
  const blobs = [[0, -540, 190, '#3f8a46'], [-110, -440, 140, '#4b9a50'], [130, -450, 150, '#4b9a50'], [10, -660, 130, '#56a65a'], [-60, -600, 110, '#5fb062']];
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30 0 Q-20 -300 -10 -480 L22 -480 Q30 -300 34 0 Z" fill="#6b4a2a"/><path d="M10 0 Q14 -300 14 -470 L22 -480 Q30 -300 34 0Z" fill="#4e3420"/>`
    + `<g${M.sway(1.4, 5.5, 0, 0, -300)}>` + blobs.map(([bx, by, r, c]) => `<circle cx="${bx}" cy="${by + 18}" r="${r}" fill="${dark(c, 0.25)}"/><circle cx="${bx - 8}" cy="${by}" r="${r * 0.94}" fill="${c}"/>`).join('')
    + `<circle cx="-40" cy="-640" r="60" fill="${light('#56a65a', 0.25)}" opacity=".55"/><circle cx="-130" cy="-470" r="44" fill="${light('#4b9a50', 0.2)}" opacity=".5"/></g></g>`;
}

// 0 · hook / portrait
function scene0() {
  return sky(SKIES.dusk, { stars: 28, seed: 3 })
    + rays(540, 720, { op: 0.08 })
    + glow(540, 1170, 520, 0.85)
    + clouds(560, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 5 })
    + hill(1165, 26, '#5d3f6c', 2, { freq: 2 })
    + `<rect x="-200" y="1165" width="${W + 400}" height="800" fill="url(#seaDusk)"/>`
    + waves(1172, 6, 300, 7, '#7a5a8a', { foam: '#f2b28a', op: 0.9 })
    + sparkles(14, 380, 700, 1180, 1250, { seed: 4, color: '#ffe0b0' })
    + waves(1205, 9, 360, 6, '#3c3a6e', { phase: 1 })
    + hill(1262, 14, '#6a4458', 6) + ground(1290, '#5a3a4c', { rim: '#c07a7a' })
    + `<ellipse cx="540" cy="1300" rx="300" ry="40" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>`
    + tufts(1296, 10, '#3a2438', { seed: 7 })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${pedroPortrait(540, 1260, 2.55, { halo: 0.6 })}</g>`
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 });
}

// 1 · born in the Visayas
function scene1() {
  return sky(SKIES.day)
    + sun(860, 560, 58, 260)
    + clouds(440, { seed: 2 })
    + hill(1010, 50, '#a4cbd0', 3, { freq: 1.4 })
    + hill(1052, 70, '#5f9d74', 4, { top: '#9ad49a' }) + hill(1062, 26, '#4f8f6a', 7, { freq: 2 })
    + `<rect x="-200" y="1060" width="${W + 400}" height="300" fill="url(#seaG)"/>`
    + waves(1064, 5, 240, 6, '#5a9cc4', { foam: '#d9f0f7' })
    + sparkles(10, 0, W, 1072, 1160, { seed: 6 })
    + waves(1182, 10, 420, 9, '#ecd6a4') + waves(1212, 7, 380, 11, '#dcc28a', { phase: 2 })
    + coconut(70, 1235, 0.8, { lean: 20 })
    + nipa_hut(250, 1245, 1.35)
    + coconut(940, 1305, 1.15, { flip: true })
    + person(610, 1330, 1.55, { kind: 'pedro', armR: [135, 22, 1.0], armL: 10 })
    + butterflies(2, { y0: 980, y1: 1120 })
    + ground(1292, '#d8bc84', { rim: '#f2dcae' }) + tufts(1296, 12, '#a99a5a', { seed: 3 })
    + foliage('r', 1630, { color: '#2f5a35', seed: 9 });
}

// 2 · sails to Guam
function scene2() {
  return sky(SKIES.sunrise)
    + sun(230, 560, 64, 330)
    + clouds(380, { color: '#fff7e8', op: 0.75, seed: 9 })
    + gulls(3)
    + `<rect x="-200" y="940" width="${W + 400}" height="1200" fill="url(#seaG)"/>`
    + waves(950, 8, 260, 7, '#4a8fbb', { foam: '#cfe8f2', op: 0.9 })
    + sparkles(12, 120, 360, 960, 1080, { seed: 8, color: '#fff2c8' })
    + waves(1010, 12, 320, 6, '#2d6f9c', { phase: 1 })
    + `<g${M.drift(40)}>${ship(520, 1120, 0.95)}</g>`
    + waves(1130, 18, 380, 5, '#245d88', { phase: 2, foam: '#9fd0ea' })
    + waves(1210, 22, 460, 4.5, '#1b4a70', { phase: 3 })
    + waves(1300, 26, 520, 4, '#143a5a', { phase: 4, foam: '#5f97bd' });
}

// 3 · teaching the faith
function scene3() {
  const kids = [[160, SKINS[0], '#d8644e', true], [330, SKINS[1], '#4b8bc4', false], [490, SKINS[2], '#e2b448', true]]
    .map(([x, skin, top, girl], i) => person(x, 1300, 1.12, { kind: 'kid', sitting: true, top, skin, girl, armL: 14, armR: [16, 6, 2 + i * 0.3] })).join('');
  return sky([[0, '#7fc0e2'], [0.6, '#d3ecf2'], [1, '#d3ecf2']])
    + clouds(470, { seed: 6 })
    + hill(1000, 60, '#a9d39a', 5) + hill(1105, 40, '#79b264', 8)
    + tree(98, 1150, 1)
    + flowers(1150, 1260, 16, { seed: 4 })
    + kids
    + person(800, 1320, 1.75, { kind: 'pedro', flip: true, talk: true, armL: [70, 22, 1.4], armR: 28, propR: book(true) })
    + butterflies(2, { x0: 300, x1: 900, y0: 860, y1: 1000, seed: 3 })
    + ground(1300, '#6aa457', { rim: '#9ad07a' }) + tufts(1304, 14, '#4f8a3c', { seed: 5 }) + flowers(1330, 1420, 10, { seed: 9 })
    + foliage('l', 1640, { color: '#24452c', seed: 2 });
}

// 4 · He stayed (death shown symbolically: beam, halo, palm frond)
function scene4() {
  const fr = M.tw([{ at: 2, dur: 1, from: { opacity: 0 }, to: { opacity: 1 } }, { at: 2, dur: 7, from: { y: 0 }, to: { y: 200 }, ease: 'power2.out' }]);
  return sky(SKIES.deep, { stars: 34, seed: 8 })
    + glow(540, 1080, 400, 0.55)
    + `<rect x="-200" y="1060" width="${W + 400}" height="900" fill="url(#seaDusk)"/>`
    + waves(1070, 8, 300, 8, '#6a4f7e', { op: 0.8, foam: '#d89a8a' })
    + waves(1220, 10, 420, 9, '#3a2a40') + waves(1250, 8, 380, 10, '#2e2236', { phase: 2 })
    + coconut(120, 1270, 1.0)
    + `<g${M.tw([{ at: 3, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(420, 660, 220, 860, 1300, 0.65)}${motes(14, { x0: 300, x1: 760, y0: 600, y1: 1250, color: '#fff2c4', seed: 2, rise: 120 })}</g>`
    + person(645, 1300, 1.85, { kind: 'priest', armL: 12, armR: 10 })
    + person(420, 1310, 1.75, { kind: 'pedro', armL: [72, 3, 3], armR: 12, halo: 3.2 })
    + `<g transform="translate(560,520)"><g${fr}>${palm_frond(1.6, 0, 12)}</g></g>`
    + ground(1290, '#2a1f30');
}

// 5 · canonized
function scene5() {
  const banner = `<g transform="translate(540,560)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/>'
    + '<rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${pedroPortrait(0, 400, 0.9, { armL: 22, armR: 22, propL: palm_frond(1.0, -15) })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return sky(SKIES.gold)
    + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7)
    + clouds(820, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 })
    + basilica(540, 1180, 1.05, { color: '#3a2a40' })
    + banner
    + ground(1180, '#3a2a40')
    + crowd(1420)
    + petals(26, { seed: 3 });
}

// 6 · patron of Filipino youth
function scene6() {
  const youth = [[150, '#4b8bc4', SKINS[1], false, false], [300, '#d8644e', SKINS[0], true, false], [780, '#e2b448', SKINS[3], true, true], [930, '#6aa457', SKINS[2], false, true]]
    .map(([x, top, skin, girl, flip], i) => person(x, 1330, 1.3, { kind: 'kid', top, skin, girl, flip, pants: '#3a3a4a', armL: 12, armR: i % 2 ? [70, 20, 1.2] : 12 })).join('');
  return sky([[0, '#3a3a7a'], [0.4, '#c07a8a'], [0.7, '#f6b97a'], [1, '#fbe0a8']], { stars: 10, seed: 6 })
    + rays(540, 620, { op: 0.1 }) + glow(540, 1150, 540, 0.85)
    + hill(1185, 40, '#6a5a7a', 3)
    + pedroPortrait(540, 1262, 2.2)
    + youth
    + motes(16, { y0: 600, y1: 1250, seed: 11 })
    + ground(1320, '#4a3e5a', { rim: '#8a6a8a' })
    + petals(14, { seed: 8, colors: ['#ffe2a0', '#ffffff'] });
}

export const STORY = {
  slug: 'san_pedro_calungsod', name: 'San_Pedro_Calungsod',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'The teen saint from the Visayas', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'kˈæləŋsˌɑːd': 'kɑːlˈuːŋsoʊd',  // Calungsod -> ka-LOONG-sod
    'vˈɪɾɚz': 'biːtˈɔːɹɛs',          // Vitores
    'aɪlˈɔɪloʊ': 'ˌiːloʊˈiːloʊ',     // Iloilo
    'bˈoʊhɑːl': 'boʊˈhoʊl',          // Bohol
    'vˈɪseɪəz': 'vɪsˈaɪəs',          // Visayas
    'wˈʌn θˈaʊzənd sˈɪkshˈʌndɹɪd': 'sˈɪkstiːn',  // 1654 -> sixteen fifty-four
  },
  scenes: [
    { kicker: 'A SAINT FROM THE VISAYAS', title: 'San Pedro Calungsod', art: scene0, cam: [540, 760, 0.06],
      say: ['Have you heard of the teenager from the Visayas who became a saint?', 'This is San Pedro Calungsod.'] },
    { kicker: 'c. 1654 · THE VISAYAS', title: 'Born in the Visayas', art: scene1,
      say: ['Pedro was born around 1654, somewhere in the Visayas.', 'To this day, Cebu, Iloilo, and Bohol all claim him as their own.'] },
    { kicker: '1668 · TO THE MARIANAS', title: 'Sails to Guam', art: scene2, cam: [540, 1000, 0.05],
      say: ['In 1668, at about fourteen, he sailed to Guam,', 'with the Jesuit missionary, Father Diego Luis de San Vitores.'] },
    { kicker: 'CATECHIST · GUAM', title: 'Teaching the Faith', art: scene3,
      say: ['There, he served as a catechist,', 'teaching prayers to children and adults, from village to village.'] },
    { kicker: 'APRIL 2, 1672 · TUMON, GUAM', title: 'He Stayed', art: scene4, cam: [520, 1000, 0.06],
      say: ['On April 2, 1672, after a baptism angered a local chief,', 'Pedro was attacked alongside Father San Vitores.', 'He could have escaped. He chose to stay.'] },
    { kicker: 'OCTOBER 21, 2012 · ROME', title: 'Canonized', art: scene5, cam: [540, 800, 0.05],
      say: ['In 2012, Pope Benedict the Sixteenth declared him a saint,', 'the second Filipino saint, after San Lorenzo Ruiz.'] },
    { kicker: 'FEAST DAY · APRIL 2', title: 'Patron of Filipino Youth', art: scene6, cam: [540, 900, 0.05],
      say: ['Today, he is a patron of Filipino youth.', 'San Pedro Calungsod, pray for us.'] },
  ],
};
