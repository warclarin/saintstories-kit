// St. Martin de Porres (feast: November 3)
import { W, M, SKIES, SKIN, SKINS, CREAM, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts,
  flowers, butterflies, petals, person, book, bread_basket, basilica, crowd, ground, dark, light, rng, f } from '../art.mjs';
import { perched, flyer, bird, tree, smallCross } from './francis.mjs';

const SKM = '#6e4428';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ---------------------------------------------------------------- props / overlays
export const broom = `<g transform="rotate(-6)"><rect x="-4" y="-150" width="8" height="190" rx="3" fill="#8a6234"/><rect x="0" y="-150" width="4" height="190" fill="#6b4a2a" opacity=".6"/>`
  + `<path d="M-20 40 L20 40 L30 96 L-30 96Z" fill="#d9b45a"/><path d="M-15 48 L-21 94 M-5 48 L-7 95 M5 48 L7 95 M15 48 L21 94" stroke="#b08a3a" stroke-width="3"/><rect x="-22" y="34" width="44" height="10" rx="3" fill="#7a5536"/></g>`;
export const mortar = `<g transform="translate(0,4)"><path d="M-24 -10 L24 -10 Q20 18 0 20 Q-20 18 -24 -10Z" fill="#9a8a7a"/><ellipse cx="0" cy="-10" rx="24" ry="6" fill="#7a6a5a"/><rect x="2" y="-44" width="8" height="38" rx="4" fill="#c9b79a" transform="rotate(20)"/></g>`;
export const bandage = `<rect x="-14" y="-20" width="28" height="12" rx="4" fill="#fbf6ea"/>`;
export const slate = `<g><rect x="-22" y="-30" width="44" height="34" rx="4" fill="#8a6234"/><rect x="-18" y="-26" width="36" height="26" fill="#3a4a44"/><path d="M-12 -18 h14 M-12 -10 h20" stroke="#f6f0e2" stroke-width="2.5"/></g>`;
// Dominican lay brother: white habit + scapular, black cape and hood
const cape = `<path d="M-42 -208 Q-72 -110 -62 -4 L62 -4 Q72 -110 42 -208Z" fill="#1d1a22"/><path d="M42 -208 Q72 -110 62 -4 L44 -4 Q52 -110 32 -204Z" fill="#000" opacity=".3"/>`;
const scap = `<rect x="-17" y="-204" width="34" height="198" rx="6" fill="#faf6ec"/><rect x="6" y="-204" width="11" height="198" fill="#d8d0c0" opacity=".6"/>`;
const hood = `<path d="M-41 -213 Q0 -196 41 -213 Q47 -190 31 -178 Q0 -170 -31 -178 Q-47 -190 -41 -213Z" fill="#1d1a22"/>`;
const mustache = `<path d="M-11 -238 q11 -5 22 0" stroke="#140e0a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
export const martin = (x, y, s, o = {}) => person(x, y, s, { kind: 'friar', top: '#efe8da', cord: false, skin: SKM, hair: '#140e0a', beard: false,
  under: cape, over: scap + hood + mustache, ...o });
const scarf = (c) => `<path d="M-47 -256 Q-48 -314 0 -314 Q48 -314 47 -256 Q42 -292 0 -294 Q-42 -292 -47 -256Z" fill="${c}"/><path d="M30 -300 Q50 -290 47 -256 Q44 -280 26 -292Z" fill="${dark(c, 0.25)}" opacity=".6"/>`;

// Colonial Lima skyline: Andes foothills, cathedral with twin towers, houses with wooden balconies
export function lima(x, y, s = 1, { wall = '#ead7b0', accent = '#c9a26a', mount = '#9fb0bf', win = null, balcony = '#6b4226', shade = 0.18 } = {}) {
  const r = rng(13); let b = `<path d="M-620 0 L-460 -260 L-320 -150 L-160 -330 L20 -190 L200 -360 L380 -170 L520 -280 L640 0Z" fill="${mount}"/>`;
  const houses = [-520, -420, -330, 230, 330, 430, 530];
  houses.forEach((hx, i) => {
    const h = 120 + r() * 70, w = 96, c = i % 2 ? wall : mix2(wall, i);
    b += `<rect x="${hx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><rect x="${hx + w / 6}" y="${-h}" width="${w / 3}" height="${h}" fill="${dark(c, shade)}" opacity=".55"/>`
      + `<rect x="${hx - w / 2 - 4}" y="${-h - 8}" width="${w + 8}" height="10" fill="${dark(c, 0.15)}"/>`
      + `<rect x="${hx - 30}" y="${-h + 26}" width="60" height="40" fill="${balcony}"/><path d="M${hx - 30} ${-h + 38} h60 M${hx - 30} ${-h + 52} h60" stroke="${dark(balcony, 0.3)}" stroke-width="3"/>`
      + `<rect x="${hx - 14}" y="-50" width="28" height="50" rx="12" fill="${dark(c, 0.45)}"/>` + (win ? `<rect x="${hx - 20}" y="${-h + 32}" width="40" height="26" fill="${win}" opacity=".8"/>` : '');
  });
  // cathedral
  b += `<rect x="-160" y="-230" width="320" height="230" fill="${wall}"/><path d="M-160 -230 L0 -290 L160 -230Z" fill="${accent}"/><rect x="60" y="-230" width="100" height="230" fill="${dark(wall, shade)}" opacity=".5"/>`
    + `<path d="M-46 0 V-110 A46 46 0 0 1 46 -110 V0Z" fill="${dark(wall, 0.5)}"/><circle cx="0" cy="-180" r="26" fill="${win || dark(wall, 0.4)}"/>`
    + [-230, 230].map((tx) => `<rect x="${tx - 50}" y="-400" width="100" height="400" fill="${light(wall, 0.05)}"/><rect x="${tx + 10}" y="-400" width="40" height="400" fill="${dark(wall, shade)}" opacity=".5"/>`
      + `<rect x="${tx - 26}" y="-360" width="52" height="64" rx="24" fill="${win || dark(wall, 0.45)}"/><rect x="${tx - 58}" y="-410" width="116" height="14" fill="${accent}"/>`
      + `<path d="M${tx - 44} -410 Q${tx - 44} -470 ${tx} -480 Q${tx + 44} -470 ${tx + 44} -410Z" fill="${accent}"/><rect x="${tx - 4}" y="-520" width="8" height="44" fill="${accent}"/><rect x="${tx - 16}" y="-506" width="32" height="7" fill="${accent}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">${b}</g>`;
}
function mix2(c, i) { return i % 3 ? light(c, 0.1) : dark(c, 0.06); }

export function cloister(y, { wall = '#efe2c4', arch = '#d9c39a' } = {}) {
  let s = `<rect x="-200" y="${y - 520}" width="${W + 400}" height="520" fill="${wall}"/><rect x="-200" y="${y - 540}" width="${W + 400}" height="30" fill="#b85a3a"/>`;
  for (let i = 0; i < 6; i++) {
    const x = -60 + i * 220;
    s += `<path d="M${x} ${y} V${y - 300} A90 90 0 0 1 ${x + 180} ${y - 300} V${y}Z" fill="#5a4636" opacity=".85"/><path d="M${x - 12} ${y} V${y - 300} A102 102 0 0 1 ${x + 192} ${y - 300} V${y}" stroke="${arch}" stroke-width="14" fill="none"/>`;
  }
  return s;
}

export function dog(x, y, s = 1, c = '#b07a4a') {
  const d = dark(c, 0.25), l = light(c, 0.45);
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="60" ry="10" fill="#1a0f1a" opacity=".2" filter="url(#soft)"/><g${M.bob(2, 2.2)}>`
    + `<g transform="translate(-48,-24)"><g${M.sway(18, 0.8, 0, 0, 0)}><path d="M0 0 Q-34 -10 -40 -44" stroke="${c}" stroke-width="12" fill="none" stroke-linecap="round"/></g></g>`
    + `<ellipse cx="0" cy="-34" rx="56" ry="32" fill="${c}"/><rect x="-40" y="-20" width="16" height="22" rx="7" fill="${d}"/><rect x="26" y="-20" width="16" height="22" rx="7" fill="${c}"/>`
    + `<g transform="translate(44,-58) rotate(28)"><ellipse cx="-22" cy="-8" rx="13" ry="24" fill="${d}" transform="rotate(25 -22 -8)"/><circle r="30" fill="${c}"/><ellipse cx="18" cy="10" rx="18" ry="13" fill="${l}"/><circle cx="32" cy="6" r="6" fill="#2b1d14"/>`
    + `<g data-blink="0.4 0 -8"><ellipse cx="6" cy="-8" rx="4.5" ry="6" fill="#2b1d14"/><circle cx="5" cy="-10" r="1.5" fill="#fff"/></g></g></g></g>`;
}
export function cat(x, y, s = 1, c = '#f0a050') {
  const d = dark(c, 0.25), l = light(c, 0.5);
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="40" ry="8" fill="#1a0f1a" opacity=".2" filter="url(#soft)"/><g${M.bob(1.5, 2.6)}>`
    + `<g transform="translate(30,-14)"><g${M.sway(10, 2, 0, 0, 0)}><path d="M0 0 Q30 -6 30 -46" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/></g></g>`
    + `<ellipse cx="0" cy="-30" rx="34" ry="30" fill="${c}"/><ellipse cx="-6" cy="-22" rx="16" ry="20" fill="${l}"/>`
    + `<g transform="translate(-30,-36) rotate(-30)"><path d="M-22 -14 L-18 -42 L-4 -22Z M22 -14 L18 -42 L4 -22Z" fill="${c}"/><circle r="24" fill="${c}"/><path d="M-8 -22 h16 M-6 -16 h12" stroke="${d}" stroke-width="3"/>`
    + `<path d="M-10 0 q4 -5 8 0 M2 0 q4 -5 8 0" stroke="#2b1d14" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="8" rx="3" ry="2" fill="#e07a7a"/></g></g></g>`;
}
export function mouse(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><g${M.bob(3, 0.9)}><path d="M20 -8 Q46 -4 50 -24" stroke="#c9a6a0" stroke-width="3" fill="none"/><ellipse cx="0" cy="-12" rx="22" ry="14" fill="#a8a2a8"/>`
    + `<circle cx="-16" cy="-26" r="9" fill="#a8a2a8"/><circle cx="-16" cy="-26" r="5" fill="#e8b0b0"/><circle cx="-24" cy="-14" r="2.4" fill="#2b1d14"/><circle cx="-34" cy="-10" r="2.6" fill="#e07a7a"/></g></g>`;
}
const bowl = (x, y) => `<g transform="translate(${x},${y})"><ellipse cx="0" cy="-2" rx="58" ry="12" fill="#1a0f1a" opacity=".2"/><path d="M-54 -26 Q-50 0 0 2 Q50 0 54 -26Z" fill="#c0623e"/><ellipse cx="0" cy="-26" rx="54" ry="12" fill="#e2b061"/><ellipse cx="0" cy="-26" rx="54" ry="12" fill="none" stroke="#a04a2e" stroke-width="5"/></g>`;
function rainbow(cx, cy, r, op = 0.35) {
  return `<g opacity="${op}" filter="url(#blur6)">` + ['#e86a6a', '#f2a65a', '#f2d36b', '#7ec27a', '#6aa6e0', '#9a7ad8']
    .map((c, i) => `<path d="M${cx - r + i * 16} ${cy} A${r - i * 16} ${r - i * 16} 0 0 1 ${cx + r - i * 16} ${cy}" stroke="${c}" stroke-width="16" fill="none"/>`).join('') + '</g>';
}

// ---------------------------------------------------------------- scenes
function scene0() {
  return sky(SKIES.dusk, { stars: 24, seed: 2 })
    + rays(540, 720, { op: 0.08 }) + glow(540, 1150, 520, 0.85)
    + clouds(570, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 3 })
    + lima(540, 1230, 1.05, { wall: '#5e4466', accent: '#4a3456', mount: '#7a5a80', win: '#ffd98a', balcony: '#3a2840', shade: 0.3 })
    + ground(1290, '#3e2a44', { rim: '#c07a7a' }) + tufts(1296, 10, '#2e1e34', { seed: 4 })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${martin(540, 1262, 2.5, { halo: 0.6, armL: [24, 2, 3], armR: [20, 2, 3.4], propL: smallCross, propR: broom })}</g>`
    + flyer(210, 760, '#f6f0e2', 1.0, { ph: 0.4 }) + flyer(860, 700, '#f6f0e2', 0.9, { dx: 80, ph: 1.0 })
    + motes(16, { y0: 520, y1: 1240, seed: 6 })
    + foliage('l', 1600, { color: '#2a1a34', seed: 2 }) + foliage('r', 1640, { color: '#2a1a34', seed: 9 });
}

function scene1() {
  return sky(SKIES.day)
    + sun(840, 520, 56, 260) + clouds(450, { seed: 5 })
    + lima(540, 1110, 0.95, {})
    + ground(1100, '#d8c49c') + `<path d="M-40 1180 H1120 M-40 1250 H1120" stroke="#c4ae84" stroke-width="3"/>`
    + person(430, 1320, 1.7, { kind: 'layman', girl: true, top: '#c96a3a', pants: '#7a4a2e', skin: '#5e3a24', hair: '#140e0a', over: scarf('#e2b448'), armL: [30, 4, 2.4], armR: [56, 4, 2.6] })
    + person(580, 1325, 1.05, { kind: 'kid', top: '#f6f0e2', pants: '#6b5a48', skin: SKM, hair: '#140e0a', armR: [120, 16, 1.2], armL: 14 })
    + person(300, 1325, 0.95, { kind: 'kid', girl: true, top: '#6aa6c4', skin: SKM, hair: '#140e0a', armL: 12, armR: 14 })
    + butterflies(2, { x0: 600, x1: 1000, y0: 920, y1: 1060, seed: 4 })
    + tufts(1300, 8, '#a99a5a', { seed: 5 }) + flowers(1330, 1420, 8, { seed: 7 })
    + foliage('r', 1640, { color: '#2f5a35', seed: 3 });
}

function scene2() {
  const jars = ['#5a8ac4', '#c0623e', '#6aa457', '#e2b448', '#9a6ac0', '#c0623e', '#5a8ac4'].map((c, i) =>
    `<g transform="translate(${130 + i * 120},${i % 2 ? 680 : 860})"><rect x="-26" y="-60" width="52" height="60" rx="14" fill="${c}"/><rect x="-14" y="-74" width="28" height="16" rx="4" fill="${dark(c, 0.3)}"/><rect x="8" y="-56" width="12" height="50" rx="5" fill="#fff" opacity=".25"/></g>`).join('');
  return sky([[0, '#e8d2b0'], [1, '#d4b88e']])
    + `<rect x="-200" y="300" width="${W + 400}" height="900" fill="#e2c9a0"/><rect x="-200" y="300" width="${W + 400}" height="900" fill="url(#sunGlow)" opacity=".25"/>`
    + `<rect x="60" y="680" width="900" height="16" fill="#7a5536"/><rect x="60" y="860" width="900" height="16" fill="#7a5536"/>` + jars
    + `<g transform="translate(860,450)"><rect x="-90" y="-90" width="180" height="180" rx="10" fill="#9fd0e8"/><path d="M0 -90 V90 M-90 0 H90" stroke="#7a5536" stroke-width="10"/><rect x="-100" y="-100" width="200" height="200" rx="12" fill="none" stroke="#7a5536" stroke-width="14"/></g>`
    + `<g opacity=".8">${rays(860, 450, { op: 0.08, n: 8, speed: 1 })}</g>`
    + ground(1180, '#a8835a') + `<path d="M-40 1240 H1120" stroke="#8f6c46" stroke-width="3"/>`
    + `<g transform="translate(330,1250)"><rect x="-70" y="-120" width="140" height="20" rx="6" fill="#7a5536"/><rect x="-60" y="-100" width="12" height="100" fill="#6b4a2a"/><rect x="48" y="-100" width="12" height="100" fill="#6b4a2a"/></g>`
    + person(330, 1250, 1.5, { kind: 'layman', sitting: true, top: '#5a7aa0', pants: '#4a3a2e', skin: SKIN.s3, hair: '#3a2a1a', beard: '#3a2a1a', armR: [70, 4, 2], propR: bandage, armL: 12 })
    + person(640, 1300, 1.5, { kind: 'kid', top: '#8a7a5a', pants: '#5a4a3a', skin: SKM, hair: '#140e0a', talk: true, armL: [80, 10, 1.6], armR: 24, propR: mortar })
    + motes(10, { x0: 700, x1: 1040, y0: 400, y1: 900, seed: 5, rise: 40, color: '#fff2c4' });
}

function scene3() {
  const leaves = Array.from({ length: 10 }, (_, i) => `<g${M.drift((i % 2 ? 1 : -1) * 30, 0)}><ellipse cx="${200 + i * 70}" cy="${1300 + (i % 3) * 14}" rx="9" ry="5" fill="${i % 2 ? '#c0823a' : '#9a6a2e'}" transform="rotate(${i * 30} ${200 + i * 70} ${1300 + (i % 3) * 14})"/></g>`).join('');
  return sky(SKIES.sunrise)
    + sun(220, 560, 50, 260, 0.9) + clouds(440, { color: '#fff7e8', op: 0.7, seed: 6 })
    + cloister(1180)
    + tree(950, 1230, 0.75, '#5a9a4a')
    + `<g transform="translate(200,1230)"><ellipse cx="0" cy="0" rx="110" ry="24" fill="#bfae8e"/><rect x="-14" y="-110" width="28" height="110" fill="#d8c6a4"/><ellipse cx="0" cy="-110" rx="60" ry="14" fill="#d8c6a4"/><path d="M0 -150 Q-30 -130 -40 -112 M0 -150 Q30 -130 40 -112" stroke="#9fd0e8" stroke-width="5" fill="none"/></g>`
    + ground(1180, '#d9c7a2') + `<path d="M-40 1250 H1120 M-40 1320 H1120" stroke="#c4b08a" stroke-width="3"/>`
    + martin(600, 1320, 1.8, { armL: [36, 12, 1.0], armR: [26, 6, 1.0], propL: broom })
    + leaves + perched(820, 1350, '#9a7a56', 0.9, true, 0.2)
    + flowers(1340, 1430, 8, { seed: 3 })
    + foliage('l', 1640, { color: '#3a4a2a', seed: 5 });
}

function scene4() {
  return sky([[0, '#7fbde0'], [0.6, '#d8eef4'], [1, '#d8eef4']])
    + clouds(470, { seed: 9, op: 0.8 })
    + `<rect x="-200" y="560" width="${W + 400}" height="640" fill="#efe2c4"/><rect x="-200" y="540" width="${W + 400}" height="30" fill="#b85a3a"/>`
    + `<g transform="translate(760,1180)"><path d="M-150 0 V-320 A150 150 0 0 1 150 -320 V0Z" fill="#5a4636"/><path d="M-170 0 V-320 A170 170 0 0 1 170 -320 V0" stroke="#d9c39a" stroke-width="24" fill="none"/><rect x="-10" y="-560" width="20" height="70" fill="#7a5536"/><rect x="-30" y="-540" width="60" height="14" fill="#7a5536"/></g>`
    + ground(1180, '#cdb894') + `<path d="M-40 1250 H1120" stroke="#b8a37e" stroke-width="3"/>`
    + martin(760, 1310, 1.75, { flip: true, talk: true, armL: [62, 6, 1.8], armR: 18, propL: bread_basket() })
    + person(420, 1315, 1.6, { kind: 'layman', girl: true, top: '#8a6aa0', skin: SKIN.s2, hair: '#140e0a', over: scarf('#c0623e'), armR: [58, 5, 2.2], armL: 14 })
    + person(270, 1325, 1.0, { kind: 'kid', top: '#e2b448', skin: SKIN.s0, hair: '#140e0a', armL: 12, armR: [40, 4, 2], propR: slate })
    + person(120, 1325, 1.55, { kind: 'layman', top: '#6aa457', pants: '#4a3a2e', skin: '#4a2c1c', hair: '#140e0a', armL: 12, armR: 12 })
    + person(560, 1328, 0.95, { kind: 'kid', girl: true, top: '#d8644e', skin: SKIN.fair, hair: '#5a3e2a', armL: [110, 14, 1.3], armR: 12 })
    + foliage('r', 1650, { color: '#4a3a2a', seed: 4 });
}

function scene5() {
  return sky(SKIES.day)
    + sun(860, 520, 54, 240) + clouds(450, { seed: 12 })
    + cloister(1150, { wall: '#f2e6cc' })
    + ground(1150, '#c9b48a', { rim: '#e2d2ac' }) + tufts(1160, 10, '#9a9a5a', { seed: 9 })
    + martin(540, 1190, 1.6, { armL: [50, 5, 2.4], armR: [50, 5, 2.7] })
    + `<g transform="translate(540,1330) scale(1.5) translate(-540,-1330)">${bowl(540, 1330)}${dog(400, 1335, 0.95)}${cat(690, 1332, 0.95)}${mouse(560, 1306, 0.9)}</g>`
    + perched(200, 1330, '#9a7a56', 1, false, 0.3) + flyer(820, 820, '#f6f0e2', 0.9, { ph: 0.5 }) + flyer(260, 880, '#b08a62', 0.8, { dx: 100, ph: 1.3 })
    + butterflies(2, { x0: 300, x1: 800, y0: 950, y1: 1080, seed: 2 })
    + flowers(1440, 1520, 10, { seed: 5 })
    + foliage('l', 1650, { color: '#3a4a2a', seed: 8 }) + foliage('r', 1660, { color: '#3a4a2a', seed: 1 });
}

function scene6() {
  const doves = [[500, 1000, 0], [620, 920, 0.6], [560, 1080, 1.1], [690, 1030, 1.7]]
    .map(([x, y, ph]) => flyer(x, y, '#f6f0e2', 0.8, { dx: (x - 590) * 0.6, dy: -420, ph })).join('');
  return sky(SKIES.deep, { stars: 36, seed: 4 })
    + glow(560, 1060, 420, 0.5)
    + lima(540, 1200, 0.95, { wall: '#3a2848', accent: '#2e2038', mount: '#2a1f3a', win: '#ffd98a', balcony: '#241a30', shade: 0.3 })
    + `<g${M.tw([{ at: 2.5, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(470, 710, 300, 900, 1310, 0.6)}${motes(14, { x0: 380, x1: 820, y0: 600, y1: 1250, color: '#fff2c4', seed: 7, rise: 140 })}</g>`
    + `<g${M.tw([{ at: 3, dur: 1, from: { opacity: 0 }, to: { opacity: 1 } }])}>${doves}</g>`
    + ground(1290, '#2a1f30') + tufts(1296, 10, '#1e1626', { seed: 3 })
    + martin(600, 1305, 1.85, { armL: [36, 3, 3], armR: [36, 3, 3.3], halo: 3.2 })
    + foliage('r', 1650, { color: '#1e1626', seed: 6 });
}

function scene7() {
  const banner = `<g transform="translate(540,560)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${martin(0, 400, 0.88, { halo: true, armL: [24, 2, 3], armR: [20, 2, 3.4], propL: smallCross, propR: broom })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return sky(SKIES.gold)
    + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7)
    + clouds(840, { color: '#ffe2b8', op: 0.5, seed: 14, drift: 30 })
    + basilica(540, 1180, 1.05, { color: '#3a2a40' })
    + banner
    + ground(1180, '#3a2a40')
    + crowd(1420, 12, { flags: [['#d91023', '#f6f2e8', '#d91023'], ['#f2c46b', '#f6f2e8', '#f2c46b']] })
    + petals(26, { seed: 7 });
}

function scene8() {
  const kids = [[150, '#4b8bc4', SKINS[1], false], [290, '#e2b448', SKIN.fair, true], [790, '#d8644e', '#4a2c1c', true], [930, '#6aa457', SKIN.priest, false]]
    .map(([x, top, skin, girl], i) => person(x, 1330, 1.25, { kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#c98a3a' : '#1a120c', pants: '#3a3a4a', armL: 14, armR: [64, 6, 2 + i * 0.2] })).join('');
  return sky([[0, '#3a3a7a'], [0.4, '#c07a8a'], [0.7, '#f6b97a'], [1, '#fbe0a8']], { stars: 8, seed: 5 })
    + rainbow(540, 1150, 620, 0.3)
    + rays(540, 640, { op: 0.09 }) + glow(540, 1150, 540, 0.85)
    + hill(1185, 40, '#6a5a7a', 3)
    + martin(540, 1262, 2.2, { halo: true, armL: [40, 4, 2.6], armR: [40, 4, 2.9], propL: smallCross, propR: broom })
    + kids
    + dog(380, 1420, 0.8) + cat(700, 1415, 0.8)
    + flyer(240, 760, '#f6f0e2', 0.9, { ph: 0.2 }) + flyer(860, 820, '#f6f0e2', 0.8, { dx: 90, ph: 1.1 })
    + motes(14, { y0: 600, y1: 1250, seed: 9 })
    + ground(1320, '#4a3e5a', { rim: '#8a6a8a' })
    + petals(12, { seed: 4, colors: ['#ffe2a0', '#ffffff'] });
}

export const STORY = {
  slug: 'st_martin_de_porres', name: 'St_Martin_de_Porres',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'The saint of the broom', thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'pˈɔɹəz': 'pˈɔːɹɛs',                              // Porres -> POR-res
    'wˈʌn θˈaʊzənd fˈaɪvhˈʌndɹɪd': 'fˈɪftiːn',       // 1579 -> fifteen seventy-nine
    'wˈʌn θˈaʊzənd sˈɪkshˈʌndɹɪd': 'sˈɪkstiːn',      // 1639
    'wˈʌn θˈaʊzənd ˈeɪthˈʌndɹɪd': 'ˈeɪtiːn',         // 1837
    'nˈaɪntiːnhˈʌndɹɪd': 'nˈaɪntiːn',                // 1962 -> nineteen sixty-two
  },
  scenes: [
    { kicker: "TODAY'S SAINT · NOVEMBER 3", title: 'St. Martin de Porres', art: scene0, cam: [540, 760, 0.06],
      say: ['He was mocked for the color of his skin, yet he became one of the most loved saints of the Americas.', 'This is Saint Martin de Porres.'] },
    { kicker: '1579 · LIMA, PERU', title: 'A Child of Two Worlds', art: scene1,
      say: ['Martin was born in 1579 in Lima, Peru.', 'His father was a Spanish nobleman, and his mother a freed Black woman.', 'His father left them, and the family grew up poor.'] },
    { kicker: 'APPRENTICE · LIMA', title: 'The Young Healer', art: scene2,
      say: ['As a boy, he trained with a barber-surgeon, learning to treat wounds and prepare medicines.', 'He used these skills to care for the poor.'] },
    { kicker: 'AGE 15 · THE DOMINICANS', title: 'Saint of the Broom', art: scene3,
      say: ['At fifteen, he went to the Dominicans, asking only to serve as a helper.', 'He swept, cooked and washed, and people came to call him the saint of the broom.'] },
    { kicker: 'HOLY ROSARY CONVENT · LIMA', title: 'Serving the Poor', art: scene4,
      say: ['In time, he became a Dominican brother and cared for the sick in the convent infirmary.', 'He fed the hungry, helped enslaved Africans arriving in Lima, and opened a school for poor children.'] },
    { kicker: 'FRIEND OF ALL CREATURES', title: 'One Bowl for All', art: scene5,
      say: ['He cared for animals too.', 'In one famous story, a dog, a cat and a mouse ate peacefully from the same bowl.'] },
    { kicker: 'NOVEMBER 3, 1639 · LIMA', title: 'Going Home', art: scene6, cam: [600, 1000, 0.06],
      say: ['He died on November 3, 1639, at about sixty.', 'All of Lima mourned the humble brother who had served everyone.'] },
    { kicker: '1962 · ROME', title: 'Canonized', art: scene7, cam: [540, 800, 0.05],
      say: ['He was beatified in 1837, and in 1962, Pope John the Twenty-Third declared him a saint.'] },
    { kicker: 'FEAST DAY · NOVEMBER 3', title: 'Patron of Racial Harmony', art: scene8, cam: [540, 900, 0.05],
      say: ['Today is his feast day. He is a patron of racial harmony, social justice, and people of mixed race.', 'Saint Martin de Porres, pray for us.'] },
  ],
};
