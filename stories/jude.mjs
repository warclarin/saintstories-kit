// St. Jude Thaddeus, apostle (feast: October 28, with St. Simon). White tunic and green mantle, medallion with the face of
// Christ (Image of Edessa), Pentecost flame, club at rest (exported for later reels); Last Supper table, upper room,
// Middle Eastern road with date palms, writing desk with his letter, St. Peter's Basilica.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, person, palm_frond, basilica, ground, dark, light, bokeh, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { jesus, peter, mantleBack, mantleFront, candle, jerusalem, obelisk, followers } from './peter.mjs';
import { writingDesk, quill } from './lorenzo_ruiz.mjs';
import { stoneRoom } from './padre_pio.mjs';
import { oilLamp } from './charbel.mjs';
import { cypress } from './nicholas.mjs';
import { coconut } from '../art.mjs';

const SKJ = '#d9a47e', HAIRJ = '#4a3020', GREEN = '#3f7a4a';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const DESERT = [[0, '#c0703e'], [0.34, '#f0a86a'], [0.66, '#fbd9a0'], [1, '#fde6c0']];

// ---------------------------------------------------------------- Jude and companions
// Medallion with the face of Christ (Image of Edessa), worn on the chest
export const medallion = `<g transform="translate(0,-160)"><circle r="21" fill="${GOLD}"/><circle r="16" fill="#f4e6c8"/><circle cy="-1" r="9" fill="${SKJ}"/>`
  + `<path d="M-10 -2 Q-10 -13 0 -13 Q10 -13 10 -2 L10 8 Q0 4 -10 8Z" fill="#5a3a24" opacity=".9"/><circle cy="-1" r="7" fill="${SKJ}"/><path d="M-4 4 Q0 9 4 4" stroke="#5a3a24" stroke-width="2.5" fill="none"/>`
  + `<circle r="21" fill="none" stroke="#b08a3a" stroke-width="2.5"/></g>`;
const flame = (s = 1) => `<g transform="scale(${s})"><circle cy="-16" r="30" fill="url(#sunGlow)" opacity=".9"/><g${M.pulse(0.14, 0.6, 0, 0, 0)}><path d="M0 0 Q-14 -14 -5 -36 Q0 -24 6 -30 Q15 -12 0 0Z" fill="#ff8a3a"/>`
  + '<path d="M0 -2 Q-7 -10 -2 -22 Q2 -14 5 -16 Q8 -8 0 -2Z" fill="#ffe08a"/></g></g>';
export const headFlame = `<g transform="translate(0,-305)">${flame(1.15)}</g>`;
export const jude = (x, y, s, { fire = false, medal = true, under = '', over = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, top: '#f4efe4', skin: SKJ, hair: HAIRJ, beard: HAIRJ, ...o,
  under: mantleBack(GREEN) + under, over: mantleFront(GREEN) + (medal ? medallion : '') + (fire ? headFlame : '') + over });
const simon = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: '#8a5a4a', skin: '#c48a5f', hair: '#2a1e16', beard: '#2a1e16', ...o,
  under: mantleBack('#c8a050') + (o.under || ''), over: mantleFront('#c8a050') + (o.over || '') });
const disciple = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: ['#8a5a4a', '#5a7a6a', '#7a6a9a', '#9a7a4a'][i % 4],
  skin: ['#d9a47e', '#c48a5f', '#e0b08a', '#b97c52'][i % 4], hair: ['#2a1e16', '#4a3424', '#1a120c', '#5a3e2a'][i % 4], beard: i % 2 ? null : '#3a2a1e', ...o });
const mary = (x, y, s, o = {}) => person(x, y, s, { kind: 'nun', top: '#eef0f8', veil: '#4a78c4', skin: '#e2b48f', ...o });
const pilgrim = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', girl: i % 2 === 1, robe: i % 2 === 1, top: ['#5a6a8a', '#a05a6a', '#6a8a5a', '#8a6a9a'][i % 4],
  pants: '#3a3448', skin: [SKIN.s1, SKIN.fair, SKIN.s3, SKIN.priest][i % 4], hair: ['#1a120c', '#3a2a20', '#241a14', '#6a4a2a'][i % 4], beard: null, ...o });

// ---------------------------------------------------------------- props and set pieces
export const club = `<g transform="rotate(-8)"><path d="M-5 40 L-7 -120 Q-14 -170 0 -186 Q14 -170 7 -120 L5 40Z" fill="#8a6234"/><path d="M2 40 L3 -120 Q8 -168 0 -186 Q12 -170 7 -120 L5 40Z" fill="#6b4a2a" opacity=".6"/>`
  + '<circle cx="-4" cy="-150" r="3" fill="#5a3d22"/><circle cx="4" cy="-128" r="3" fill="#5a3d22"/></g>';
const staff = `<g><rect x="-4" y="-230" width="8" height="290" rx="3" fill="#8a6234"/><path d="M-4 -230 Q-4 -262 18 -262 Q34 -262 30 -244" stroke="#8a6234" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
const scrollProp = `<g transform="translate(0,-8)"><rect x="-30" y="-24" width="60" height="42" rx="3" fill="#f4ead2"/><rect x="-36" y="-28" width="10" height="50" rx="5" fill="#d9ccaa"/><rect x="26" y="-28" width="10" height="50" rx="5" fill="#d9ccaa"/>`
  + '<path d="M-18 -12 h36 M-18 -3 h36 M-18 6 h26" stroke="#a89878" stroke-width="2.6"/></g>';
const cup = `<g transform="translate(0,-4)"><path d="M-12 -26 Q-12 -6 0 -4 Q12 -6 12 -26Z" fill="${GOLD}"/><rect x="-2" y="-6" width="4" height="12" fill="${GOLD}"/><ellipse cy="8" rx="10" ry="3" fill="#b08a3a"/></g>`;
// Low Last Supper table with bread, cup and lamps
function supperTable(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-470" y="-120" width="940" height="26" rx="8" fill="#f4ead2"/><rect x="-470" y="-100" width="940" height="100" fill="#7a5230"/><rect x="200" y="-100" width="270" height="100" fill="#5a3b22" opacity=".6"/>`
    + `<path d="M-470 -96 L-470 -40 L-420 -96Z M470 -96 L470 -40 L420 -96Z" fill="#f4ead2"/>`
    + [-330, -150, 160, 340].map((bx, i) => `<g transform="translate(${bx},-124)"><ellipse rx="34" ry="13" fill="${i % 2 ? '#d9a04f' : '#e2b061'}"/><path d="M-16 -4 q6 -6 12 0 M2 -4 q6 -6 12 0" stroke="#b07a3a" stroke-width="2.5" fill="none"/></g>`).join('')
    + `<g transform="translate(0,-122) scale(1.5)">${cup}</g><g transform="translate(-250,-122) scale(0.9)">${oilLamp(1)}</g><g transform="translate(260,-122) scale(0.9)">${oilLamp(1)}</g></g>`;
}
const datePalm = (x, y, s = 1, flip = false) => coconut(x, y, s, { flip, lean: 16 });
// Small domed town (Syria / Mesopotamia)
function domeTown(x, y, s = 1, { wall = '#e2c89a', dome = '#c98a5a', shade = 0.18 } = {}) {
  let o = '';
  [[-300, 110, 120], [-170, 100, 160], [-40, 120, 120], [90, 100, 150], [220, 120, 110], [340, 100, 140]].forEach(([hx, w, h], i) => {
    const c = i % 2 ? wall : light(wall, 0.08);
    o += `<rect x="${hx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><rect x="${hx + w / 6}" y="${-h}" width="${w / 3}" height="${h}" fill="${dark(c, shade)}" opacity=".5"/>`
      + (i % 2 ? `<path d="M${hx - w / 3} ${-h} a${w / 3} ${w / 3} 0 0 1 ${w * 2 / 3} 0Z" fill="${dome}"/>` : '') + `<path d="M${hx - 10} ${-h + 50} v-16 a10 10 0 0 1 20 0 v16Z" fill="${dark(c, 0.45)}"/>`;
  });
  return `<g transform="translate(${x},${y}) scale(${s})">${o}</g>`;
}
// Dove of the Holy Spirit
const dove = (s = 1) => `<g transform="scale(${s})"><circle r="60" fill="url(#haloGlow)" opacity=".9"/><ellipse rx="26" ry="13" fill="#fbf7ee"/><circle cx="22" cy="-6" r="10" fill="#fbf7ee"/><path d="M31 -6 l9 3 l-9 3Z" fill="#e2a33a"/>`
  + `<g${M.flap(0.7)}><path d="M-6 -6 Q-30 -48 -52 -36 Q-34 -18 -10 0Z" fill="#f2ece0"/><path d="M4 -6 Q20 -50 44 -44 Q28 -20 8 0Z" fill="#fbf7ee"/></g><path d="M-24 2 L-44 10 L-26 -6Z" fill="#e8e0d0"/></g>`;

// ---------------------------------------------------------------- scene timing (sentence starts from timings.json + ~0.5 s)
const T0B = 7.5, T2B = 6.6;

// ---------------------------------------------------------------- scenes
// 0 · hook: avoided because of his name; now the saint of hope
function scene0() {
  const kneelers = (mood) => [[150, 0], [930, 1]].map(([x, i]) => pilgrim(x, 1330, 1.25, i, { kneel: true, mood, flip: i === 1, armL: [40, 2, 3], armR: [40, 2, 3.2], propR: i ? '' : candle, propL: i ? candle : '' })).join('');
  return FAR(sky(SKIES.dusk, { stars: 30, seed: 3 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1050, 520, 0.85))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 5 }) + hill(1150, 30, '#5d3f6c', 2, { freq: 1.6 }) + jerusalem(540, 1170, 0.55, { wall: '#9a7a8a' }))
    + MID(hill(1230, 16, '#4e3458', 6))
    + ground(1260, '#5a3a4c', { rim: '#c07a7a' })
    + `<ellipse cx="540" cy="1300" rx="300" ry="40" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>` + tufts(1266, 10, '#3a2438', { seed: 7 })
    + jude(540, 1300, 2.25, { fire: true, halo: true, mood: 'happy', armL: [40, 2, 3], armR: [34, 2, 3.3], propL: club, propR: scrollProp })
    + `<g${fadeOut(T0B)}>${kneelers('worried')}</g><g${fadeIn(T0B)}>${kneelers('peaceful')}</g>`
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(bokeh(6, { seed: 11, op: [0.25, 0.55] }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · one of the Twelve: Thaddeus, Judas son of James, not the Iscariot
function scene1() {
  return FAR(sky(SKIES.day) + sun(860, 540, 58, 260))
    + BACK(clouds(430, { seed: 2 }) + hill(1040, 50, '#a8c4c0', 3, { freq: 1.4 }))
    + `<rect x="-200" y="1060" width="${W + 400}" height="180" fill="url(#seaG)"/>` + sparkles(10, 0, W, 1070, 1140, { seed: 6 })
    + MID(hill(1170, 22, '#9ab66a', 5, { freq: 1.6, top: '#b8cc7a' }) + cypress(60, 1200, 1.0) + cypress(1010, 1200, 0.9))
    + ground(1230, '#a8b46a', { rim: '#d0d898' }) + tufts(1236, 12, '#6a8a3a', { seed: 3 }) + flowers(1240, 1320, 10, { seed: 6 })
    + disciple(150, 1290, 1.25, 1, { mood: 'happy', armL: 12, armR: 20 })
    + peter(290, 1295, 1.35, { mood: 'happy', armL: 14, armR: [30, 2, 3] })
    + jesus(500, 1315, 1.95, { mood: 'happy', armL: [20, 2, 3], armR: [100, 6, 2.6] })
    + jude(790, 1315, 1.95, { medal: false, mood: 'joy', flip: true, armL: [30, 2, 3], armR: 16 })
    + disciple(970, 1290, 1.2, 2, { mood: 'happy', flip: true, armL: 16, armR: 12 })
    + butterflies2()
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 9 }));
}
const butterflies2 = () => sparkles(8, 300, 900, 900, 1100, { seed: 12, color: '#fff6d8' });

// 2 · the Last Supper question (John 14:22-23)
function scene2() {
  return FAR(stoneRoom('#5a4438', '#644c40', 1240) + `<path d="M380 520 V420 a160 160 0 0 1 320 0 V520Z" fill="#2a2440"/>` + sparkles(8, 400, 680, 300, 500, { seed: 3, color: '#fff6d8' }))
    + glow(540, 1040, 460, 0.55)
    + ground(1240, '#3e302a', { rim: '#7a6050' })
    + MID(disciple(130, 1130, 1.05, 0, { mood: 'happy', armL: 14, armR: 14 }) + disciple(950, 1130, 1.05, 3, { mood: 'happy', flip: true, armL: 14, armR: 14 }))
    + jesus(540, 1200, 1.7, { mood: 'happy', talk: [T2B, 99], armL: [30, 2, 3], armR: [70, 4, 2.6] })
    + jude(250, 1220, 1.75, { medal: false, mood: 'surprised', talk: [0.5, 6.3], armL: 14, armR: [70, 4, 2.4] })
    + peter(840, 1220, 1.6, { mood: 'happy', flip: true, armL: 14, armR: 20 })
    + MID(supperTable(540, 1340, 1.0))
    + motes(12, { y0: 700, y1: 1200, seed: 8, color: '#ffe0a0' })
    + NEAR(bokeh(6, { seed: 7, op: [0.25, 0.5] }));
}

// 3 · Pentecost: the Holy Spirit as tongues of fire
function scene3() {
  const ap = (x, i, s, o = {}) => disciple(x, 1250, s, i, { mood: 'surprised', armL: [120, 8, 1.6], armR: [120, 8, 1.8], over: `<g${M.in('pop', 1.2 + i * 0.2, 0.6, 0, -305)}>${headFlame}</g>`, ...o });
  return FAR(stoneRoom('#6a5040', '#78584a', 1260) + rays(540, 420, { op: 0.16, color: '#fff3d0' }))
    + BACK(`<g transform="translate(540,470)"><g${M.bob(10, 3)}>${dove(1.3)}</g></g>` + beam(450, 630, 250, 830, 1260, 0.45))
    + ground(1260, '#4a3a32', { rim: '#8a6a5a' })
    + MID(ap(110, 0, 1.15) + ap(970, 3, 1.15, { flip: true }))
    + peter(300, 1290, 1.5, { age: 'mid', mood: 'surprised', armL: [120, 8, 1.6], armR: [110, 8, 1.8], over: `<g${M.in('pop', 1.0, 0.6, 0, -305)}>${headFlame}</g>` })
    + mary(540, 1290, 1.55, { mood: 'peaceful', halo: true, armL: [40, 2, 3], armR: [40, 2, 3.2], over: `<g${M.in('pop', 0.8, 0.6, 0, -305)}>${headFlame}</g>` })
    + jude(790, 1310, 1.85, { mood: 'joy', flip: true, armL: [130, 10, 1.4], armR: [30, 2, 3], over: `<g${M.in('pop', 1.4, 0.6, 0, -305)}>${headFlame}</g>` })
    + motes(18, { y0: 500, y1: 1200, seed: 6, color: '#ffd08a' })
    + NEAR(bokeh(6, { seed: 13 }));
}

// 4 · mission with Simon: Syria, Mesopotamia and beyond
function scene4() {
  return FAR(sky(DESERT) + sun(820, 640, 64, 330))
    + BACK(clouds(420, { color: '#fff7e8', op: 0.6, seed: 9 }) + hill(1080, 40, '#d8a878', 3, { freq: 1.2 }) + domeTown(760, 1130, 0.75))
    + MID(hill(1180, 18, '#c8986a', 5) + datePalm(70, 1220, 0.75) + datePalm(1010, 1230, 0.85, true))
    + ground(1230, '#d8b47a', { rim: '#f2d8a4' }) + tufts(1236, 10, '#a8885a', { seed: 5 })
    + `<g${M.tw([{ at: 0.2, dur: 9, from: { x: -60 }, to: { x: 60 }, ease: 'sine.inOut' }])}>`
    + simon(290, 1300, 1.7, { mood: 'happy', armL: 14, armR: [40, 2, 2.6], propR: staff })
    + jude(560, 1315, 1.95, { mood: 'determined', armL: [40, 2, 3], armR: [110, 8, 2.2], propL: staff }) + '</g>'
    + pilgrim(930, 1300, 1.3, 2, { mood: 'happy', flip: true, armL: [60, 6, 2], armR: 10 })
    + motes(10, { y0: 620, y1: 1200, seed: 3, color: '#fff2c4' })
    + NEAR(foliage('l', 1660, { color: '#5a4a2a', seed: 3 }));
}

// 5 · the Letter of Jude
function scene5() {
  return FAR(stoneRoom('#4a3a46', '#54424e', 1240) + `<path d="M760 700 V560 a90 90 0 0 1 180 0 V700Z" fill="#2a3a6a"/>` + sparkles(6, 780, 920, 500, 680, { seed: 5 }))
    + glow(400, 1060, 360, 0.6)
    + ground(1240, '#3a2e36', { rim: '#6a5462' })
    + jude(450, 1310, 2.0, { mood: 'happy', armL: [18, 2, 2.6], armR: [70, 4, 2.2], propR: quill })
    + MID(writingDesk(610, 1150, 1.0))
    + `<g transform="translate(610,1120)"><g${M.in('pop', 3.3, 0.8, 0, 0)}><g${M.bob(6, 3)}>${glow(0, -30, 120, 0.7)}${scrollProp}</g></g></g>`
    + motes(12, { x0: 300, x1: 760, y0: 700, y1: 1200, color: '#ffe0a0', seed: 8 })
    + NEAR(bokeh(6, { seed: 17, op: [0.25, 0.5] }));
}

// 6 · martyrdom (tradition): palm and club at rest
function scene6() {
  return FAR(sky(SKIES.deep, { stars: 44, seed: 9 }) + rays(540, 700, { op: 0.07 }))
    + BACK(domeTown(540, 1170, 0.9, { wall: '#7a6080', dome: '#5a3e64' }) + hill(1200, 12, '#4a3560', 5))
    + ground(1230, '#44324e', { rim: '#8a6a8a' }) + tufts(1236, 10, '#2a1c34', { seed: 7 })
    + `<g${fadeIn(1.6, 3)}>${beam(450, 640, 310, 770, 1340, 0.5)}${motes(14, { x0: 360, x1: 720, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + simon(220, 1300, 1.4, { mood: 'peaceful', halo: 2.4, armL: 12, armR: [40, 2, 3], propR: palm_frond(0.9, 10) })
    + jude(560, 1320, 2.0, { mood: 'peaceful', halo: 2.0, armL: [36, 2, 3], armR: [36, 2, 3.3], propL: palm_frond(1.0, -14), propR: club })
    + NEAR(bokeh(6, { seed: 19, op: [0.25, 0.55] }) + foliage('r', 1640, { color: '#1c1428', seed: 2 }));
}

// 7 · relics in St. Peter's Basilica, beside St. Simon
function scene7() {
  return FAR(sky(GOLDSKY) + rays(540, 640, { op: 0.13 }))
    + BACK(clouds(460, { color: '#fff4dc', op: 0.7, seed: 9 }) + basilica(540, 1180, 1.0, { color: '#8a5a5a' }))
    + `<g transform="translate(0,-40)">${glow(540, 800, 240, 0.9)}<g${M.bob(8, 3.6)}>${jude(440, 980, 1.15, { fire: true, mood: 'joy', halo: true, armL: [40, 3, 2.6], propL: club })}${simon(650, 980, 1.05, { mood: 'joy', halo: true, flip: true, armL: [40, 3, 2.6] })}</g></g>`
    + MID(obelisk(540, 1260, 0.8, '#6a3e4e') + followers(1280, 13, { color: '#5a3436' }))
    + ground(1300, '#6a3e3a')
    + petals(16, { seed: 5, colors: ['#ffffff', '#f2c46b', '#e2566a'] })
    + NEAR(bokeh(6, { seed: 23 }) + foliage('r', 1650, { color: '#2a1a24', seed: 8 }));
}

// 8 · feast day + patronage
function scene8() {
  const kneel = [[150, 0], [940, 3]].map(([x, i]) => pilgrim(x, 1340, 1.2, i, { kneel: true, mood: 'peaceful', flip: i === 3, armL: [40, 2, 3], armR: [40, 2, 3.2], propR: i ? '' : candle, propL: i ? candle : '' })).join('');
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + hill(1200, 30, '#5d3f6c', 3, { freq: 1.6 }))
    + glow(540, 1100, 480, 0.85)
    + MID(hill(1262, 14, '#6a4458', 6))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1296, 10, '#3a2438', { seed: 7 })
    + jude(540, 1305, 2.35, { fire: true, mood: 'happy', halo: 0.3, armL: [40, 2, 3], armR: [44, 2, 3.4], propL: club, propR: scrollProp })
    + kneel
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#3f7a4a', '#f2c46b'] })
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(6, { seed: 29 }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_jude_thaddeus', name: 'St_Jude_Thaddeus',
  voice: 'am_michael', speed: 0.95,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'The saint for hopeless cases', thumb_title: 'St. Jude Thaddeus', thumb_shift: 0, thumb_t: 9,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'ɑːktˈoʊbɚ twˈɛnti ˈeɪt': 'ɑːktˈoʊbɚ twˈɛnti ˈeɪtθ',   // October 28 -> twenty-eighth
  },
  scenes: [
    { kicker: 'APOSTLE OF HOPE', title: 'The Forgotten Apostle', art: scene0, cam: { move: 'push-fast', oy: 1000 },
      say: ['Many say Christians once avoided praying to him, because his name sounded like Judas, the traitor.', 'Today, millions call on him when all seems lost.', 'This is Saint Jude Thaddeus.'] },
    { kicker: 'GALILEE · THE TWELVE', title: 'Chosen by Jesus', art: scene1, cam: 'drift-r',
      say: ['Jude was one of the twelve apostles.', 'The Gospels call him Thaddeus, and Judas, son of James, not the Iscariot.'] },
    { kicker: 'JERUSALEM · THE LAST SUPPER', title: 'A Question of Love', art: scene2, cam: { move: 'push', amt: 0.07, ox: 400, oy: 1000 },
      say: ['At the Last Supper, he asked Jesus why He would show Himself to them, and not to the world.', 'Jesus said He would make His home in everyone who loves Him.'] },
    { kicker: 'JERUSALEM · PENTECOST', title: 'Tongues of Fire', art: scene3, cam: { move: 'dolly', oy: 1000, ox: 790 },
      say: ['After Jesus rose, Jude received the Holy Spirit with the apostles and Mary at Pentecost.'] },
    { kicker: 'SYRIA · MESOPOTAMIA', title: 'To the Ends of the Earth', art: scene4, cam: 'pan-r',
      say: ['Tradition says he carried the Gospel far, to Syria, Mesopotamia and beyond, often with Saint Simon.'] },
    { kicker: 'THE LETTER OF JUDE', title: 'Words for the Church', art: scene5, cam: 'drift-l',
      say: ['A short letter in the Bible bears his name.', 'It urges Christians to build themselves up in their most holy faith.'] },
    { kicker: 'ABOUT AD 65', title: 'Faithful to the End', art: scene6, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ['Tradition says he died a martyr around the year 65.', 'He is often shown with a club, a sign of his death.'] },
    { kicker: "ST. PETER'S BASILICA · ROME", title: 'Resting in Rome', art: scene7, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ["Today, his relics rest in Saint Peter's Basilica, beside Saint Simon."] },
    { kicker: 'FEAST DAY · OCTOBER 28', title: 'Patron of Hopeless Cases', art: scene8, cam: 'arc-l',
      say: ['His feast day is October 28. He is the patron of hopeless cases.', 'Saint Jude Thaddeus, pray for us.'] },
  ],
};
