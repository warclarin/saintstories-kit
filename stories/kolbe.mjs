// St. Maximilian Kolbe. First story using camera moves (scene.cam = 'push'|'pull'|'pan-l'|'pan-r'|'tilt-up'|'drift-l'…)
// and parallax depth layers (FAR / BACK / MID / NEAR from art.mjs; characters stay on the camera plane).
import { W, H, M, SKIES, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, gulls, person, book, palm_frond, ship, basilica, crowd, ground, dark, light, FAR, BACK, MID, NEAR } from '../art.mjs';
import { gothic } from './joan_of_arc.mjs';

const SKK = '#efc6a2', HAIRK = '#6b4a32', BEARDK = '#5a3e2a', HABIT = '#2b2733';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ------------------------------------------------------------- Kolbe + props (exported for later reels)
export const glasses = '<g fill="none" stroke="#2b1d14" stroke-width="2.8"><circle cx="-14" cy="-250" r="12.5"/><circle cx="14" cy="-250" r="12.5"/>'
  + '<path d="M-1.5 -252 q1.5 -3 3 0 M-26.5 -253 L-38 -257 M26.5 -253 L38 -257"/></g><g fill="#fff" opacity=".35"><circle cx="-19" cy="-256" r="3"/><circle cx="9" cy="-256" r="3"/></g>';
const hood = `<path d="M-41 -213 Q0 -196 41 -213 Q47 -190 31 -178 Q0 -170 -31 -178 Q-47 -190 -41 -213Z" fill="${HABIT}"/><path d="M-30 -204 Q0 -192 30 -204" stroke="${light(HABIT, 0.2)}" stroke-width="3" fill="none" opacity=".6"/>`;
export const medal = (s = 1) => `<g transform="scale(${s})"><path d="M0 -26 v6" stroke="#c9a24a" stroke-width="2"/><ellipse cx="0" cy="-8" rx="9" ry="12" fill="${GOLD}"/><ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="none" stroke="#b08a3a" stroke-width="1.5"/><circle cx="0" cy="-8" r="25" fill="url(#haloGlow)" opacity=".7"/></g>`;
export const crownProp = (c = '#fbf7ee', s = 1) => `<g transform="scale(${s}) translate(0,-18)"><circle r="44" fill="url(#haloGlow)" opacity=".8"/>`
  + `<path d="M-26 12 L-30 -16 L-14 -4 L0 -24 L14 -4 L30 -16 L26 12 Z" fill="${c}"/><path d="M8 -10 L14 -4 L30 -16 L26 12 L10 12Z" fill="${dark(c, 0.25)}" opacity=".5"/>`
  + `<rect x="-27" y="8" width="54" height="8" rx="3" fill="${dark(c, 0.15)}"/><circle cx="0" cy="-24" r="3.5" fill="${GOLD}"/><circle cx="-30" cy="-16" r="3" fill="${GOLD}"/><circle cx="30" cy="-16" r="3" fill="${GOLD}"/></g>`;
export const WHITE_CROWN = '#fbf7ee', RED_CROWN = '#d4384a';
export const kolbe = (x, y, s, o = {}) => person(x, y, s, {
  kind: 'friar', top: HABIT, skin: SKK, hair: HAIRK, beard: BEARDK, ...o, over: hood + glasses + (o.over || '') });

// Camp uniform (vertical stripes on torso and legs), used for Kolbe and Franciszek
const STRIPE = '#4c5c7c', CLOTH = '#b9c2d0';
const stripes = `<g fill="${STRIPE}" opacity=".8">${[-17, -3, 11].map((x) => `<rect x="${x}" y="-205" width="7" height="102" rx="2"/>`).join('')}`
  + '<rect x="-19" y="-112" width="6" height="104"/><rect x="13" y="-112" width="6" height="104"/></g>';
const patch = '<g transform="translate(22,-176)"><path d="M-9 -7 L9 -7 L0 7Z" fill="#c8323a"/></g>';
export const prisoner = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: CLOTH, pants: CLOTH, skin: SKK, hair: HAIRK, ...o, over: stripes + patch + (o.over || '') });
const kolbeCamp = (x, y, s, o = {}) => prisoner(x, y, s, { beard: null, ...o, over: glasses + (o.over || '') });

// ------------------------------------------------------------- set pieces
export function fence(y, { c = '#2a2433', wire = '#5a5068', x0 = -60, x1 = W + 60, step = 170, h = 300 } = {}) {
  let posts = '', wires = '';
  for (let x = x0; x <= x1; x += step) posts += `<path d="M${x - 6} ${y} V${y - h} Q${x} ${y - h - 30} ${x + 22} ${y - h - 34} L${x + 22} ${y - h - 26} Q${x + 6} ${y - h - 20} ${x + 6} ${y - h} V${y} Z" fill="${c}"/><ellipse cx="${x}" cy="${y - h + 30}" rx="5" ry="4" fill="#f6e6b0" opacity=".7"/>`;
  for (let i = 0; i < 6; i++) {
    const yy = y - 40 - i * 46;
    let d = `M${x0} ${yy}`;
    for (let x = x0; x < x1; x += step) d += ` Q${x + step / 2} ${yy + 10} ${x + step} ${yy}`;
    wires += `<path d="${d}" stroke="${wire}" stroke-width="2.4" fill="none"/>`;
  }
  return `<g>${wires}${posts}</g>`;
}
export function tower(x, y, s = 1, c = '#241e2e') {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="${c}"><path d="M-50 0 L-30 -300 L-22 -300 L-40 0Z M50 0 L30 -300 L22 -300 L40 0Z M-44 -90 L44 -150 L44 -140 L-44 -80Z M-38 -190 L38 -240 L38 -230 L-38 -180Z"/>`
    + '<rect x="-60" y="-380" width="120" height="84"/><path d="M-80 -380 L0 -440 L80 -380Z"/><rect x="-46" y="-366" width="92" height="34" fill="#f6d98a" opacity=".55"/></g>';
}
export function barracks(x, y, s = 1, { wall = '#7a4a40', roof = '#4a3038', win = '#2a1e26' } = {}) {
  const wins = [-150, -90, -30, 30, 90, 150].map((wx) => `<rect x="${wx - 14}" y="-120" width="28" height="36" fill="${win}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-200" y="-170" width="400" height="170" fill="${wall}"/><rect x="60" y="-170" width="140" height="170" fill="${dark(wall, 0.2)}" opacity=".6"/>`
    + `<path d="M-215 -170 L-180 -230 L180 -230 L215 -170Z" fill="${roof}"/>${wins}<rect x="-200" y="-60" width="400" height="6" fill="${dark(wall, 0.3)}" opacity=".6"/></g>`;
}
export function woodChurch(x, y, s = 1, { wall = '#8a5a34', roof = '#4a3226', win = '#ffd98a' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-110" y="-150" width="190" height="150" fill="${wall}"/><path d="M-130 -150 L-15 -260 L100 -150Z" fill="${roof}"/>`
    + `<rect x="80" y="-210" width="70" height="210" fill="${dark(wall, 0.1)}"/><path d="M70 -210 L115 -330 L160 -210Z" fill="${roof}"/><path d="M115 -330 v-40 M100 -356 h30" stroke="${GOLD}" stroke-width="6"/>`
    + `<path d="M-40 0 v-60 a20 20 0 0 1 40 0 v60Z" fill="${dark(wall, 0.45)}"/><rect x="100" y="-170" width="30" height="40" rx="14" fill="${win}" opacity=".8"/>`
    + `<rect x="-90" y="-110" width="26" height="36" rx="12" fill="${win}" opacity=".7"/><rect x="40" y="-110" width="26" height="36" rx="12" fill="${win}" opacity=".7"/></g>`;
}
export function cottage(x, y, s = 1, { wall = '#efe2c8', roof = '#9a7a4a', win = '#7aa6d8' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-70" y="-90" width="140" height="90" fill="${wall}"/><rect x="20" y="-90" width="50" height="90" fill="${dark(wall, 0.15)}" opacity=".6"/>`
    + `<path d="M-90 -88 Q-80 -150 0 -168 Q80 -150 90 -88Z" fill="${roof}"/><rect x="-40" y="-64" width="28" height="28" fill="${win}"/><rect x="14" y="-50" width="24" height="50" fill="#6b4a2a"/></g>`;
}
// Niepokalanów: long low wooden friary buildings with a chapel
export function friary(x, y, s = 1, { wall = '#c9a874', roof = '#6b4a3a', win = '#fff0c0' } = {}) {
  const block = (bx, w, hgt) => `<rect x="${bx}" y="${-hgt}" width="${w}" height="${hgt}" fill="${wall}"/><path d="M${bx - 14} ${-hgt} L${bx + w / 2} ${-hgt - 56} L${bx + w + 14} ${-hgt}Z" fill="${roof}"/>`
    + Array.from({ length: Math.floor(w / 60) }, (_, i) => `<rect x="${bx + 20 + i * 60}" y="${-hgt + 34}" width="24" height="30" fill="${win}" opacity=".75"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">${block(-420, 300, 110)}${block(120, 300, 110)}`
    + `<rect x="-90" y="-200" width="180" height="200" fill="${light(wall, 0.12)}"/><path d="M-110 -200 L0 -300 L110 -200Z" fill="${roof}"/>`
    + `<path d="M0 -300 v-60 M-20 -336 h40" stroke="${GOLD}" stroke-width="7"/><circle cx="0" cy="-150" r="30" fill="${win}" opacity=".85"/><path d="M-26 0 v-54 a26 26 0 0 1 52 0 v54Z" fill="${dark(wall, 0.45)}"/></g>`;
}
export function press(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-70" y="-120" width="140" height="120" rx="8" fill="#3a3a48"/><rect x="20" y="-120" width="50" height="120" rx="8" fill="#2a2a36"/>`
    + `<g transform="translate(-30,-80)"><g${M.spin(120)}><circle r="26" fill="#5a5a6a"/><path d="M-26 0 H26 M0 -26 V26" stroke="#7a7a8a" stroke-width="5"/></g></g>`
    + `<g transform="translate(30,-80)"><g${M.spin(-120)}><circle r="18" fill="#5a5a6a"/><path d="M-18 0 H18 M0 -18 V18" stroke="#7a7a8a" stroke-width="4"/></g></g>`
    + `<rect x="-60" y="-140" width="120" height="18" rx="4" fill="#f6f0e2"/></g>`;
}
export const magazines = `<g transform="translate(0,6)">${[0, 1, 2, 3].map((i) => `<rect x="-24" y="${-12 - i * 7}" width="48" height="8" rx="2" fill="${i % 2 ? '#3f6fb8' : '#f4efe2'}"/>`).join('')}<rect x="-24" y="-42" width="48" height="14" rx="2" fill="#3f6fb8"/><circle cx="0" cy="-35" r="4" fill="${GOLD}"/></g>`;
function pages(n, { seed = 3, y0 = 600, y1 = 1100 } = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = 120 + ((i * 197 + seed * 53) % 840), y = y0 + ((i * 131) % (y1 - y0));
    out += `<g transform="translate(${x},${y})"><g${M.drift(i % 2 ? 90 : -90, -140)}><g${M.sway(18, 2.2 + (i % 3) * 0.4, i * 0.3)}><rect x="-16" y="-20" width="32" height="40" rx="3" fill="#f6f0e2" opacity=".9"/><rect x="-10" y="-12" width="20" height="4" fill="#3f6fb8" opacity=".7"/></g></g></g>`;
  }
  return out;
}
function cherry(x, y, s = 1) {
  const blobs = [[0, -300, 110], [-90, -240, 80], [90, -250, 90], [20, -380, 80]];
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-14 0 Q-6 -150 6 -260 L22 -260 Q20 -150 16 0Z" fill="#5a3a2a"/>`
    + `<g${M.sway(1.2, 5, 0, 0, -200)}>${blobs.map(([bx, by, r]) => `<circle cx="${bx}" cy="${by + 12}" r="${r}" fill="#e98fa8"/><circle cx="${bx - 6}" cy="${by}" r="${r * 0.92}" fill="#f6b9c8"/>`).join('')}</g></g>`;
}
const mountain = (x, y, s, c, snow = '#f6f0f4') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-400 0 L-40 -330 Q0 -350 40 -330 L400 0Z" fill="${c}"/><path d="M-86 -288 L-40 -330 Q0 -350 40 -330 L86 -288 L50 -270 L20 -292 L-10 -268 L-40 -292Z" fill="${snow}" opacity=".85"/></g>`;
function cell() {   // starvation bunker interior: stone walls, barred window with a beam of light
  let stones = '';
  for (let r = 0; r < 18; r++) for (let c = 0; c < 9; c++) {
    const x = -100 + c * 150 + (r % 2) * 75, y = 260 + r * 66;
    stones += `<rect x="${x}" y="${y}" width="140" height="58" rx="10" fill="${(r + c) % 3 ? '#3a3046' : '#433856'}"/>`;
  }
  return `<rect x="-200" y="-400" width="${W + 400}" height="${H + 800}" fill="#2a2234"/>${stones}`
    + '<rect x="420" y="420" width="240" height="190" rx="12" fill="#f6dca0"/><rect x="420" y="420" width="240" height="190" rx="12" fill="url(#sunGlow)" opacity=".8"/>'
    + `<g fill="#2a2234">${[470, 525, 580].map((bx) => `<rect x="${bx}" y="420" width="12" height="190"/>`).join('')}</g>`;
}

// ------------------------------------------------------------- scenes
// 0 · hook: night roll call, one prisoner steps forward
function scene0() {
  const line = [90, 230, 850, 990].map((x, i) => prisoner(x, 1215, 1.05, { skin: dark(SKK, 0.2 + i * 0.05), mood: i % 2 ? 'worried' : 'sad', armL: 6, armR: 6 })).join('');
  return FAR(sky(SKIES.deep, { stars: 30, seed: 8 }) + glow(540, 900, 520, 0.55))
    + BACK(tower(150, 1080, 1, '#1e1828') + tower(930, 1060, 0.85, '#1e1828') + barracks(540, 1060, 1.1, { wall: '#3e2a3a', roof: '#24182a', win: '#f6d98a' }))
    + MID(fence(1150, { c: '#1a1424', wire: '#4a405c' }) + `<g opacity=".95">${line}</g>`)
    + beam(400, 680, 330, 750, 1300, 0.45)
    + ground(1250, '#2e2236', { rim: '#7a5a7a' })
    + `<ellipse cx="540" cy="1262" rx="240" ry="34" fill="#ffd98a" opacity=".3" filter="url(#blur14)"/>`
    + `<g${M.in('rise', 0.3, 1.0)}>${kolbeCamp(540, 1290, 2.3, { mood: 'determined', armL: [14, 2, 3], armR: [36, 3, 3.2], halo: 1.6, propL: palm_frond(1.0, -14) })}</g>`
    + motes(16, { y0: 520, y1: 1220, seed: 5 })
    + NEAR(foliage('l', 1640, { color: '#1a1222' }) + foliage('r', 1660, { color: '#1a1222', seed: 3 }));
}

// 1 · born 1894; the two crowns
function scene1() {
  const mary = person(720, 1010, 1.45, { kind: 'nun', top: '#eef0f8', veil: '#4a78c4', skin: '#f0cfae', halo: true, mood: 'happy',
    armL: [120, 4, 3], armR: [120, 4, 3.4], propL: crownProp(WHITE_CROWN, 1.1), propR: crownProp(RED_CROWN, 1.1) });
  return FAR(sky(SKIES.dusk, { stars: 18, seed: 2 }) + rays(720, 760, { op: 0.1 }))
    + BACK(hill(1120, 40, '#6a4a7a', 3, { freq: 1.3 }) + woodChurch(170, 1150, 0.9, { wall: '#6a4434', roof: '#3a2430' }))
    + `<g${M.in('fade', 0.6, 1.4)}>${glow(720, 760, 420, 0.95)}${clouds(1000, { color: '#ffd8c0', op: 0.75, drift: 20, seed: 4, n: 2 })}<g${M.bob(10, 3.4)}>${mary}</g></g>`
    + MID(hill(1230, 16, '#5a3a52', 6) + cottage(130, 1270, 1.1, { wall: '#d9c6a8', roof: '#7a5a3a', win: '#ffd98a' }))
    + ground(1270, '#4a3046', { rim: '#c08a7a' }) + tufts(1276, 10, '#2e1e32', { seed: 2 })
    + person(390, 1330, 1.35, { kind: 'kid', top: '#6a8ab0', skin: SKK, hair: HAIRK, mood: 'surprised', sitting: true, armL: [30, 2, 3], armR: [30, 2, 3.3] })
    + sparkles(14, 540, 920, 700, 1100, { seed: 9 })
    + NEAR(foliage('l', 1620, { color: '#2a1a30' }));
}

// 2 · Rome: Franciscan, Knights of the Immaculata, priest 1918
function scene2() {
  return FAR(sky(SKIES.sunrise) + sun(820, 620, 60, 300))
    + BACK(clouds(470, { color: '#fff4e4', op: 0.8, seed: 3 }) + basilica(560, 1120, 0.85, { color: '#c98a6a', glow: false }))
    + MID(hill(1180, 18, '#d9a77a', 5) + gothic(110, 1200, 0.55, { wall: '#ead2b0' }))
    + ground(1250, '#e6c69a', { rim: '#f6e2bc' }) + tufts(1256, 8, '#b49a6a', { seed: 5 })
    + person(230, 1300, 1.3, { kind: 'friar', top: HABIT, skin: '#e2b48f', hair: '#3a2a1e', beard: null, mood: 'joy', armL: 10, armR: [40, 6, 2.6], propR: magazines })
    + person(860, 1300, 1.3, { kind: 'friar', top: HABIT, skin: '#d9a47e', hair: '#2a1e16', beard: null, mood: 'happy', armL: [30, 4, 3], armR: 8, flip: true })
    + kolbe(545, 1330, 1.9, { beard: null, mood: 'happy', armL: [28, 2, 3], armR: [60, 4, 2.8], propR: medal(1.4), propL: book(true) })
    + flowers(1260, 1320, 10, { seed: 7 })
    + NEAR(foliage('r', 1630, { color: '#4a5a2e', seed: 4 }));
}

// 3 · Niepokalanów and the presses
function scene3() {
  return FAR(sky(SKIES.day) + sun(880, 520, 52, 240))
    + BACK(clouds(430, { seed: 6 }) + hill(1040, 46, '#9cc4a0', 4, { freq: 1.2 }))
    + MID(friary(540, 1150, 0.95) + hill(1170, 12, '#7aa868', 2))
    + ground(1200, '#86b06a', { rim: '#b4d890' }) + tufts(1206, 14, '#5a8a4a', { seed: 8 })
    + press(820, 1300, 1.35)
    + person(990, 1310, 1.05, { kind: 'friar', top: HABIT, skin: '#e2b48f', hair: '#4a3424', beard: null, mood: 'joy', flip: true, armL: [60, 10, 1.6] })
    + kolbe(400, 1320, 1.95, { beard: null, mood: 'joy', armL: [26, 2, 3], armR: [100, 8, 2.4], propL: magazines })
    + pages(9, { seed: 4, y0: 620, y1: 1050 })
    + NEAR(foliage('l', 1630, { color: '#2f5a35' }));
}

// 4 · Japan: Mugenzai no Sono near Nagasaki
function scene4() {
  return FAR(sky(SKIES.sunrise) + sun(250, 600, 58, 300))
    + BACK(mountain(700, 1010, 1, '#a9a6c8') + gulls(3, { y: 560 }))
    + `<rect x="-200" y="1010" width="${W + 400}" height="400" fill="url(#seaG)"/>`
    + waves(1016, 5, 260, 7, '#5a9cc4', { foam: '#d9f0f7' })
    + `<g${M.drift(-30)}>${ship(330, 1100, 0.55, { crew: false })}</g>`
    + MID(hill(1150, 70, '#6aa070', 3, { freq: 0.8, top: '#9ad49a' }) + friary(800, 1120, 0.45, { wall: '#efe6d2', roof: '#5a4a6a' }) + cherry(140, 1250, 1.05))
    + ground(1260, '#7ab070', { rim: '#a8d896' }) + tufts(1266, 10, '#4a8a4a', { seed: 3 })
    + person(800, 1320, 1.25, { kind: 'friar', top: HABIT, skin: '#e8bf98', hair: '#1a1410', beard: null, mood: 'joy', flip: true, armL: [40, 6, 2.6], propL: magazines })
    + kolbe(520, 1330, 1.9, { mood: 'joy', armL: [24, 2, 3], armR: [130, 18, 1.2] })
    + petals(14, { seed: 3, colors: ['#f6b9c8', '#ffffff', '#e98fa8'] })
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 6 }));
}

// 5 · war: sheltering refugees, then arrest
function scene5() {
  const ppl = [[640, '#8a6a5a', 'worried', false], [770, '#5a6a8a', 'sad', true], [900, '#7a5a4a', 'worried', false]]
    .map(([x, top, mood, girl], i) => person(x, 1290, 1.15, { kind: 'layman', top, pants: '#3a3240', skin: [SKK, '#e0b08a', '#d8a47a'][i], hair: ['#3a2a1e', '#1a120c', '#6b4a32'][i], girl, mood, flip: true, armL: [20, 3, 3], propR: i === 1 ? '<rect x="-16" y="-10" width="32" height="26" rx="6" fill="#8a6a4a"/>' : '' })).join('');
  return FAR(sky(SKIES.night, { stars: 40, seed: 6 }))
    + BACK(hill(1080, 40, '#2a2f52', 5) + clouds(520, { color: '#8a90b8', op: 0.4, drift: 30, seed: 2 }))
    + MID(friary(330, 1180, 0.9, { wall: '#7a6a5a', roof: '#3a2e3a', win: '#ffd98a' }) + glow(330, 1060, 260, 0.6))
    + ground(1230, '#2e2a40', { rim: '#5a5a7a' })
    + `<g${M.in('fade', 0.2, 1.2)}>${ppl}</g>`
    + kolbe(400, 1320, 1.85, { mood: 'happy', armL: [70, 4, 3], armR: [60, 4, 3.3], propR: '<g><circle cy="-6" r="22" fill="url(#sunGlow)"/><rect x="-10" y="-22" width="20" height="28" rx="5" fill="#ffd98a"/><path d="M0 -22 v-16" stroke="#3a2a20" stroke-width="3"/></g>' })
    + motes(10, { y0: 800, y1: 1250, seed: 3 })
    + NEAR(foliage('r', 1640, { color: '#141428', seed: 2 }));
}

// 7 · the selection: "Take me instead"
function scene7() {
  const back = [80, 210, 870, 1000].map((x, i) => prisoner(x, 1180, 0.9, { skin: dark(SKK, 0.25 + i * 0.04), mood: 'worried' })).join('');
  return FAR(sky([[0, '#4e5670'], [0.6, '#8e94aa'], [1, '#bcb8c2']]))
    + BACK(barracks(540, 1040, 1.2, { wall: '#7a5246', roof: '#3e2c34' }))
    + MID(`<g opacity=".9">${back}</g>`)
    + ground(1190, '#857f74', { rim: '#ada796' })
    + person(940, 1240, 1.1, { kind: 'layman', top: '#4a4e40', pants: '#3a3c32', skin: '#e8c4a4', hair: '#2a2420', mood: 'surprised', flip: true, armR: 10, armL: 6 })
    + prisoner(250, 1320, 1.65, { skin: '#e6bc96', hair: '#3a2a1e', mood: 'sad', armL: [150, 4, 1.4], armR: [150, 4, 1.6] })
    + `<g${M.tw([{ at: 0.6, dur: 1.2, from: { x: 70 }, to: { x: 0 }, ease: 'power2.out' }])}>${kolbeCamp(600, 1335, 2.1, { mood: 'determined', armL: [62, 3, 3], armR: [16, 2, 3] })}</g>`
    + NEAR(foliage('r', 1650, { color: '#3a3a36', seed: 5 }));
}

// 8 · the bunker: prayer, then death on August 14, 1941
function scene8() {
  const men = [[160, 'peaceful'], [930, 'peaceful']].map(([x, mood], i) => prisoner(x, 1300, 1.2, { sitting: true, skin: dark(SKK, 0.3), mood, armL: 30, armR: 30, flip: i === 1 })).join('');
  return FAR(sky(SKIES.deep))
    + BACK(cell())
    + beam(450, 640, 300, 820, 1360, 0.5)
    + ground(1290, '#241c2c', { rim: '#4a3c56' })
    + `<g opacity=".85">${men}</g>`
    + kolbeCamp(545, 1330, 2.05, { mood: 'peaceful', sitting: true, armL: [34, 2, 3], armR: [34, 2, 3.3], halo: 1.8, propR: palm_frond(0.9, 14) })
    + motes(18, { y0: 520, y1: 1260, x0: 300, x1: 800, seed: 6 })
    + NEAR(`<rect x="-200" y="1560" width="${W + 400}" height="500" fill="#140e1a" opacity=".6" filter="url(#blur14)"/>`);
}

// 9 · canonized 1982; Franciszek present
function scene9() {
  return FAR(sky(SKIES.gold) + rays(540, 620, { op: 0.12 }))
    + BACK(clouds(470, { color: '#fff4dc', op: 0.8, seed: 9 }) + basilica(540, 1170, 0.95))
    + `<g transform="translate(0,-40)">${glow(540, 820, 260, 0.9)}<g${M.bob(8, 3.6)}>${kolbe(540, 1000, 1.25, { mood: 'happy', halo: true, armL: [26, 2, 3], propL: palm_frond(0.9, -12), propR: medal(1.4) })}</g></g>`
    + MID(crowd(1270, 13, { color: '#2e2234', flags: [['#ffffff', '#d4213d', '#ffffff'], ['#ffffff', '#d4213d', '#ffffff']] }))
    + ground(1290, '#2e2234')
    + person(300, 1340, 1.5, { kind: 'elder', top: '#5a5a6a', skin: '#e6bc96', mood: 'joy', armL: [130, 10, 1.4], armR: 12 })
    + petals(16, { seed: 5, colors: ['#ffffff', '#f2c46b', '#d4384a'] })
    + NEAR(foliage('r', 1650, { color: '#2a1a24', seed: 8 }));
}

// 10 · feast day + patronage
function scene10() {
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + hill(1200, 30, '#5d3f6c', 3, { freq: 1.6 }))
    + glow(540, 1100, 480, 0.85)
    + `<g transform="translate(250,520)"${M.in('pop', 0.6, 0.9)}><g${M.bob(10, 3.2)}>${crownProp(WHITE_CROWN, 1.4)}</g></g>`
    + `<g transform="translate(830,520)"${M.in('pop', 1.0, 0.9)}><g${M.bob(10, 3.2, 0.8)}>${crownProp(RED_CROWN, 1.4)}</g></g>`
    + MID(hill(1262, 14, '#6a4458', 6))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1296, 10, '#3a2438', { seed: 7 })
    + kolbe(540, 1300, 2.45, { mood: 'happy', halo: 0.3, armL: [24, 2, 3], armR: [26, 2, 3.4], propL: palm_frond(1.05, -16), propR: medal(1.5) })
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#d4384a', '#f6d36b'] })
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_maximilian_kolbe', name: 'St_Maximilian_Kolbe',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'He took a stranger’s place', thumb_title: 'Take Me Instead', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'wˈʌn θˈaʊzənd ˈeɪthˈʌndɹɪd': 'ˈeɪtiːn',         // 1894 -> eighteen ninety four
    'kˈɑːlb': 'kˈoʊlbə',                              // Kolbe
    'nˈiːpəkˌælɐnˌoʊ': 'njɛpˌɔːkɑːlˈɑːnʊf',           // Niepokalanów
    'fɹˈænsɪszˌɛk': 'fɹɑːntʃˈiːʃɛk',                  // Franciszek
  },
  scenes: [
    { kicker: 'AUSCHWITZ · 1941', title: 'Take Me Instead', art: scene0, cam: { move: 'push', amt: 0.08, oy: 1000 },
      say: ['In a death camp, one prisoner stepped out of line to die for a stranger.', 'This is Saint Maximilian Kolbe.'] },
    { kicker: '1894 · POLAND', title: 'The Two Crowns', art: scene1, cam: { move: 'tilt-up', amt: 0.06 },
      say: ['Born Raymund Kolbe in Poland in 1894, he once prayed to Mary as a boy, and saw her holding two crowns.',
        'White for purity, red for martyrdom. He said he would accept both.'] },
    { kicker: '1910 – 1918 · ROME', title: 'Brother Maximilian', art: scene2, cam: { move: 'drift-l', amt: 0.07 },
      say: ['He joined the Franciscans and took the name Maximilian.', 'In Rome, he founded the Knights of the Immaculata, and became a priest in 1918.'] },
    { kicker: '1927 · NEAR WARSAW', title: 'The City of Mary', art: scene3, cam: { move: 'pan-r', amt: 0.07 },
      say: ['Back in Poland, he built Niepokalanów, a huge friary with its own printing presses.', 'His magazines reached hundreds of thousands of homes.'] },
    { kicker: '1931 · NAGASAKI, JAPAN', title: 'Mission to Japan', art: scene4, cam: { move: 'pan-l', amt: 0.07 },
      say: ['Then he sailed to Japan, and built a friary near Nagasaki.', 'Years later, it survived the atomic bomb.'] },
    { kicker: '1939 – 1941 · POLAND', title: 'Shelter, Then Prison', art: scene5, cam: { move: 'drift-r', amt: 0.07 },
      say: ['When war came, his friary sheltered refugees, including many Jews.', 'In 1941, he was arrested and sent to Auschwitz.'] },
    { kicker: 'JULY 1941 · AUSCHWITZ', title: 'Ten Men Chosen', art: scene7, cam: { move: 'push', amt: 0.09, ox: 450, oy: 1000 },
      say: ['After an escape, ten men were chosen to starve.', 'One cried out for his wife and children.', 'Father Kolbe stepped forward. Take me instead.'] },
    { kicker: 'AUGUST 14, 1941', title: 'Love to the End', art: scene8, cam: { move: 'tilt-up', amt: 0.06 },
      say: ['In the dark bunker, he led the men in prayer.', 'After two weeks, he was killed by lethal injection, at forty seven.'] },
    { kicker: 'OCTOBER 10, 1982 · ROME', title: 'Martyr of Charity', art: scene9, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['In 1982, Pope John Paul the Second declared him a saint.', 'Franciszek, the man he saved, was there.'] },
    { kicker: 'FEAST DAY · AUGUST 14', title: 'Patron of Prisoners', art: scene10, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['His feast day is August 14. He is patron of prisoners, families and journalists.', 'Saint Maximilian Kolbe, pray for us.'] },
  ],
};
