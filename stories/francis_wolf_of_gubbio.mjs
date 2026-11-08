// One story: St. Francis of Assisi and the wolf of Gubbio (Little Flowers of St. Francis, ch. 21; a legend first written
// down about a century after Francis). Reuses Francis, birds and the hill-town look from francis.mjs. New (exported):
// expressive wolf (calm/angry, sitting/lying, raised paw), Gubbio with the Palazzo dei Consoli, city wall with gate,
// wolf's grave slab.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, person, bread_basket, crowd, ground, dark, light, bokeh, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { francis, smallCross, perched, flyer, olive } from './francis.mjs';
import { dog } from './martin_de_porres.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const STONE = '#cfc2ac', ROOF = '#a8583a';

// ---------------------------------------------------------------- characters
const townsfolk = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', girl: i % 2 === 1, robe: i % 2 === 1, top: ['#6a5a8a', '#a05a5a', '#5a7a5a', '#8a6a4a'][i % 4],
  pants: '#3a3448', skin: [SKIN.priest, SKIN.fair, SKIN.s3, SKIN.priest][i % 4], hair: ['#3a2a20', '#5a3e2a', '#1a120c', '#6a4a2a'][i % 4], beard: i % 2 ? null : (i % 4 === 0 ? '#3a2a20' : null), ...o });
const kid = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', top: '#c0623e', skin: SKIN.fair, hair: '#6a4a2a', ...o });
const staff = '<g><rect x="-4" y="-200" width="8" height="250" rx="3" fill="#7a5536"/><rect x="0" y="-200" width="4" height="250" rx="2" fill="#5a3d22" opacity=".6"/></g>';
const signCross = (at) => `<g transform="translate(0,-40)"><g${M.in('pop', at, 0.7, 0, 0)}><circle r="58" fill="url(#haloGlow)"${M.pulse(0.1, 1.8)}/><path d="M0 -30 V30 M-20 -10 H20" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/></g></g>`;
const breadLoaf = '<g transform="translate(0,-4)"><ellipse rx="22" ry="13" fill="#d9a04f"/><path d="M-10 -4 q5 -6 10 0 M2 -4 q5 -6 10 0" stroke="#b07a3a" stroke-width="2.5" fill="none"/></g>';

// Wolf (front view): mood 'calm' | 'angry'; pose 'sit' | 'lie'; paw: time (s) when it raises its right forepaw toward the left
export function wolf2(x, y, s = 1, { mood = 'calm', pose = 'sit', paw = null, flip = false } = {}) {
  const c = '#8a8a96', d = dark(c, 0.25), l = light(c, 0.45), lie = pose === 'lie', angry = mood === 'angry';
  const hx = -6, hy = lie ? -82 : -118;
  const body = lie
    ? `<ellipse cx="0" cy="-34" rx="74" ry="36" fill="${c}"/><ellipse cx="-6" cy="-26" rx="40" ry="22" fill="${l}"/><ellipse cx="-30" cy="-4" rx="20" ry="10" fill="${d}"/><ellipse cx="18" cy="-4" rx="20" ry="10" fill="${d}"/>`
    : `<ellipse cx="0" cy="-50" rx="52" ry="58" fill="${c}"/><ellipse cx="-8" cy="-40" rx="26" ry="40" fill="${l}"/><ellipse cx="-24" cy="-6" rx="16" ry="10" fill="${d}"/><ellipse cx="22" cy="-6" rx="16" ry="10" fill="${d}"/>`;
  const eyes = angry
    ? `<g data-blink="0.7 0 -10"><ellipse cx="-16" cy="-8" rx="5" ry="5" fill="#2b1d14"/><ellipse cx="16" cy="-8" rx="5" ry="5" fill="#2b1d14"/><circle cx="-17.5" cy="-10" r="1.6" fill="#fff"/><circle cx="14.5" cy="-10" r="1.6" fill="#fff"/></g>`
      + '<path d="M-26 -22 L-8 -14 M26 -22 L8 -14" stroke="#2b1d14" stroke-width="4" stroke-linecap="round"/>'
    : `<g data-blink="0.7 0 -10"><ellipse cx="-16" cy="-10" rx="5" ry="6.5" fill="#2b1d14"/><ellipse cx="16" cy="-10" rx="5" ry="6.5" fill="#2b1d14"/><circle cx="-17.5" cy="-12.5" r="1.8" fill="#fff"/><circle cx="14.5" cy="-12.5" r="1.8" fill="#fff"/></g>`;
  const mouth = angry
    ? '<path d="M-14 18 Q0 36 14 18 Z" fill="#5a2620"/><path d="M-10 19 l3 7 l3 -6 M4 19 l3 6 l3 -7" fill="#fbf6ea"/>'
    : '<path d="M-8 20 Q0 27 8 20" stroke="#2b1d14" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  const head = `<g transform="translate(${hx},${hy})"><path d="M-38 -20 L-30 -66 L-8 -36Z" fill="${c}"/><path d="M38 -20 L30 -66 L8 -36Z" fill="${d}"/><path d="M-30 -26 L-28 -54 L-14 -34Z" fill="#e8a0a0"/>`
    + `<circle r="42" fill="${c}"/><ellipse cx="0" cy="16" rx="24" ry="18" fill="${l}"/><ellipse cx="0" cy="6" rx="8" ry="6" fill="#2b1d14"/>${eyes}${mouth}</g>`;
  const tail = `<g transform="translate(${lie ? 64 : 46},${lie ? -30 : -20})"><g${M.sway(angry ? 6 : 12, angry ? 0.6 : 1.4, 0, 0, 0)}><path d="M0 0 Q50 -10 60 -60 Q40 -30 0 -18Z" fill="${c}"/><path d="M48 -40 Q60 -55 60 -60 Q52 -48 44 -42Z" fill="${l}"/></g></g>`;
  const pawLeg = paw === null ? '' : `<g transform="translate(-24,${lie ? -40 : -56})"><g${M.tw([{ at: paw, dur: 0.9, from: { rotation: 0 }, to: { rotation: 118 }, ease: 'back.out(1.6)', origin: '0 0' }])}>`
    + `<rect x="-10" y="0" width="20" height="70" rx="10" fill="${c}"/><ellipse cx="0" cy="70" rx="14" ry="10" fill="${d}"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="2" rx="${lie ? 90 : 70}" ry="12" fill="#1a0f1a" opacity=".2" filter="url(#soft)"/><g${M.bob(angry ? 3 : 2, angry ? 0.9 : 2.6)}>`
    + tail + body + head + pawLeg + '</g></g>';
}

// ---------------------------------------------------------------- set pieces (exported)
// Gubbio: grey stone houses climbing Monte Ingino, the crenellated Palazzo dei Consoli with its slim bell tower
export function gubbio(x, y, s = 1, { stone = STONE, roof = ROOF, hillC = '#7a9a6a', win = null, shade = 0.2 } = {}) {
  let b = `<path d="M-620 40 Q-380 -330 -40 -420 Q300 -380 620 -120 L620 40Z" fill="${hillC}"/>`;
  for (let row = 0; row < 4; row++) for (let i = -6; i <= 6; i++) {
    const hx = i * 92 + (row % 2) * 46, base = -row * 80 - 10 + Math.abs(i) * row * 4, h = 60 + ((i * 7 + row * 3) % 4) * 14, w = 70;
    if (row > 1 && (i > 3 || i < -4)) continue;
    const cc = (i + row) % 2 ? stone : light(stone, 0.1);
    b += `<rect x="${f(hx - w / 2)}" y="${f(base - h)}" width="${w}" height="${f(h + 20)}" fill="${cc}"/><rect x="${f(hx + w / 6)}" y="${f(base - h)}" width="${f(w / 3)}" height="${f(h + 20)}" fill="${dark(cc, shade)}" opacity=".6"/>`
      + `<path d="M${f(hx - w / 2 - 4)} ${f(base - h)} L${f(hx)} ${f(base - h - 14)} L${f(hx + w / 2 + 4)} ${f(base - h)}Z" fill="${roof}"/>`;
    if (win) b += `<rect x="${f(hx - 6)}" y="${f(base - h + 14)}" width="10" height="14" rx="4" fill="${win}"/>`;
  }
  // Palazzo dei Consoli
  const pal = light(stone, 0.06);
  b += `<rect x="-120" y="-470" width="240" height="330" fill="${pal}"/><rect x="60" y="-470" width="60" height="330" fill="${dark(pal, shade)}" opacity=".6"/>`
    + Array.from({ length: 9 }, (_, k) => `<rect x="${-120 + k * 28}" y="-494" width="16" height="26" fill="${k > 6 ? dark(pal, shade * 0.6) : pal}"/>`).join('')
    + [-80, -30, 20, 70].map((ax) => `<path d="M${ax - 14} -300 v-40 a14 14 0 0 1 28 0 v40Z" fill="${win || dark(pal, 0.45)}"/>`).join('')
    + `<path d="M-60 -140 V-200 A30 30 0 0 1 0 -200 V-140Z M10 -140 V-200 A30 30 0 0 1 70 -200 V-140Z" fill="${dark(pal, 0.45)}"/>`
    + `<rect x="78" y="-610" width="40" height="150" fill="${pal}"/><rect x="100" y="-610" width="18" height="150" fill="${dark(pal, shade)}" opacity=".6"/>`
    + `<path d="M74 -610 L98 -650 L122 -610Z" fill="${roof}"/><path d="M90 -580 v-16 a8 8 0 0 1 16 0 v16Z" fill="${dark(pal, 0.5)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${b}</g>`;
}
// City wall with a gate (closed or open), spanning the whole width
export function cityWall(y, { stone = '#b8aa94', gateX = 540, open = false, h = 260 } = {}) {
  let o = `<rect x="-200" y="${y - h}" width="${W + 400}" height="${h}" fill="${stone}"/><rect x="-200" y="${y - h}" width="${W + 400}" height="14" fill="${light(stone, 0.15)}"/>`;
  for (let k = -4; k < 26; k++) o += `<rect x="${k * 54}" y="${y - h - 30}" width="32" height="32" fill="${stone}"/>`;
  for (let r = 0; r < 4; r++) o += `<path d="M-200 ${y - h + 60 + r * 52} H${W + 200}" stroke="${dark(stone, 0.12)}" stroke-width="3" opacity=".5"/>`;
  o += `<path d="M${gateX - 90} ${y} V${y - 150} A90 90 0 0 1 ${gateX + 90} ${y - 150} V${y}Z" fill="${open ? '#3a2e2a' : '#6b4a2a'}"/>`;
  if (!open) o += `<path d="M${gateX} ${y} V${y - 240}" stroke="#4a321e" stroke-width="5"/>` + [-60, -20, 20, 60].map((dx) => `<circle cx="${gateX + dx}" cy="${y - 110}" r="5" fill="#3a2a18"/>`).join('');
  return o;
}
export const wolfGrave = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-40" width="180" height="40" rx="6" fill="#a89a88"/><rect x="40" y="-40" width="50" height="40" rx="6" fill="#8a7c6c"/>`
  + `<path d="M0 -34 V-6 M-12 -24 H12" stroke="#6a5c4c" stroke-width="5" stroke-linecap="round"/></g>` + flowers(y - 10, y + 10, 6, { seed: 9, x0: x - 120, x1: x + 120 });

function houses(base) {
  return [[-60, 230, '#d8ccb6'], [160, 200, '#cbbfa8'], [350, 240, '#ddd2bc'], [580, 210, '#c8bca4'], [780, 230, '#d6cab2'], [990, 200, '#cdc0a8']]
    .map(([x, w, c], i) => { const h = 420 + (i % 3) * 50; return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x + w * 0.7}" y="${base - h}" width="${w * 0.3}" height="${h}" fill="${dark(c, 0.18)}" opacity=".5"/>`
      + `<path d="M${x - 8} ${base - h} h${w + 16} l-${w / 2 + 8} -36Z" fill="${ROOF}"/>` + `<rect x="${x + w * 0.3}" y="${base - h + 70}" width="34" height="46" rx="14" fill="#5a4a3a"/>`
      + (i % 2 ? `<path d="M${x + w * 0.25} ${base} v-130 a40 40 0 0 1 80 0 v130Z" fill="#6b4a2a"/>` : ''); }).join('');
}

// ---------------------------------------------------------------- scene timing (sentence starts from timings.json + ~0.5 s)
const T3B = 3.5, T5B = 6.7, T6B = 6.7;

// ---------------------------------------------------------------- scenes
// 0 · hook: a wolf hunting a town; one man walks out to meet it
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 26, seed: 4 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1100, 520, 0.8))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 7 }) + gubbio(560, 1150, 0.8, { stone: '#6a5a72', roof: '#4e3a52', hillC: '#4a3656', win: '#ffd98a', shade: 0.3 }))
    + MID(hill(1230, 20, '#3e2a44', 6))
    + ground(1260, '#3e2a44', { rim: '#c07a7a' }) + tufts(1266, 10, '#2e1e34', { seed: 7 })
    + francis(360, 1300, 2.2, { mood: 'happy', armL: [20, 2, 3], armR: [110, 6, 2.2], propR: signCross(0.6) })
    + wolf2(800, 1300, 1.55, { mood: 'angry', flip: true })
    + motes(14, { y0: 520, y1: 1240, seed: 3 })
    + NEAR(foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · Gubbio: a huge wolf; families afraid to leave the walls
function scene1() {
  return FAR(sky([[0, '#5a6a8a'], [0.45, '#a8b4c0'], [0.66, '#e8d8b8'], [1, '#e8d8b8']]))
    + BACK(clouds(440, { color: '#e8e8f0', op: 0.8, seed: 4 }) + gubbio(540, 1000, 0.95, {})
      + `<g transform="translate(900,760)"><g${fadeIn(1.2, 1)}>${wolf2(0, 0, 0.45, { mood: 'angry', flip: true })}</g></g>`)
    + MID(cityWall(1180, { open: false }))
    + ground(1180, '#a8987e', { rim: '#c8b89a' })
    + townsfolk(170, 1310, 1.55, 0, { mood: 'worried', armL: 14, armR: [26, 2, 2.6], propR: staff })
    + townsfolk(380, 1320, 1.5, 1, { mood: 'worried', armL: [60, 4, 2], armR: 14 })
    + kid(520, 1325, 1.15, { mood: 'worried', armL: [70, 3, 2.2], armR: 12 })
    + townsfolk(880, 1315, 1.6, 2, { flip: true, mood: 'worried', armL: 12, armR: [30, 2, 2.6], propR: staff })
    + NEAR(foliage('r', 1650, { color: '#3a4a3a', seed: 6 }));
}

// 2 · Francis, moved with pity, walks out against everyone's advice
function scene2() {
  return FAR(sky(SKIES.sunrise) + sun(880, 640, 54, 300))
    + BACK(clouds(460, { color: '#fff7e8', op: 0.7, seed: 11 }) + hill(1040, 60, '#a8b88a', 3, { freq: 0.9 }) + olive(860, 1080, 0.8))
    + MID(`<g transform="translate(-420,0)">${cityWall(1200, { open: true, gateX: 520 })}</g>`)
    + ground(1200, '#c8b48a', { rim: '#e2d2ae' }) + `<path d="M-200 1290 Q540 1240 ${W + 200} 1230" stroke="#d9c8a0" stroke-width="60" fill="none" opacity=".6"/>`
    + MID(townsfolk(60, 1230, 1.1, 1, { mood: 'worried', armL: [70, 4, 2], armR: 12 }) + townsfolk(170, 1235, 1.1, 0, { mood: 'worried', armL: 12, armR: [110, 8, 1.6] }))
    + person(300, 1310, 1.5, { kind: 'friar', skin: SKIN.fair, hair: '#8a5a32', beard: '#8a5a32', mood: 'worried', armL: [60, 4, 2.2], armR: 12 })
    + `<g${M.tw([{ at: 0.2, dur: 8, from: { x: -40 }, to: { x: 90 }, ease: 'sine.inOut' }])}>${francis(600, 1315, 1.95, { mood: 'determined', armL: [24, 2, 3], armR: [30, 2, 3.2], propR: smallCross })}</g>`
    + tufts(1300, 10, '#8a8a4a', { seed: 4 }) + flowers(1330, 1420, 8, { seed: 5 })
    + NEAR(foliage('r', 1650, { color: '#3a4a2a', seed: 9 }));
}

// 3 · the wolf charges; "Come, Brother Wolf"
function scene3() {
  return FAR(sky([[0, '#4a4a6a'], [0.45, '#9a8aa0'], [0.66, '#e8b88a'], [1, '#e8b88a']]) + sun(150, 560, 44, 240, 0.8))
    + BACK(clouds(480, { color: '#d8c8d8', op: 0.6, seed: 5, drift: 60 }) + hill(1080, 50, '#8a8a7a', 5, { freq: 1.1 }) + hill(1140, 30, '#7a7a62', 7))
    + ground(1220, '#9a8a6a', { rim: '#c8b48a' }) + tufts(1226, 12, '#6a6a4a', { seed: 3 })
    + francis(330, 1310, 2.0, { mood: 'happy', talk: [T3B, 99], armL: [20, 2, 3], armR: [120, 6, 2.2], propR: signCross(T3B) })
    + `<g${M.tw([{ at: 0, dur: 1.6, from: { x: 260 }, to: { x: 0 }, ease: 'power2.out' }])}>${wolf2(790, 1310, 1.6, { mood: 'angry', flip: true })}</g>`
    + motes(10, { x0: 200, x1: 600, y0: 700, y1: 1150, seed: 4, color: '#fff2c4' })
    + NEAR(foliage('l', 1640, { color: '#3a3a2a', seed: 3 }));
}

// 4 · the wolf closes its jaws and lies down, gentle as a lamb (dolly)
function scene4() {
  return FAR(sky(SKIES.dusk, { stars: 18, seed: 6 }) + rays(500, 760, { op: 0.11 }))
    + BACK(clouds(520, { color: '#ffc9b0', op: 0.45, seed: 8, drift: 30 }) + gubbio(560, 1110, 0.9, { stone: '#8a7488', roof: '#6a4a5a', hillC: '#5a4466', win: '#ffd98a', shade: 0.3 }))
    + glow(470, 1080, 460, 0.85)
    + MID(hill(1220, 16, '#5a3e56', 4) + townsfolk(940, 1210, 0.9, 1, { flip: true, mood: 'surprised', armL: [120, 6, 1.6], armR: 14 }) + townsfolk(1030, 1215, 0.9, 0, { flip: true, mood: 'surprised', armL: 12, armR: [120, 6, 1.8] }))
    + ground(1240, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1246, 10, '#3a2438', { seed: 7 })
    + francis(400, 1310, 2.1, { mood: 'happy', armL: [20, 2, 3], armR: [70, 4, 2.4] })
    + wolf2(720, 1320, 1.35, { mood: 'calm', pose: 'lie', flip: true })
    + motes(16, { x0: 260, x1: 860, y0: 700, y1: 1220, seed: 5, color: '#fff2c4' })
    + NEAR(bokeh(7, { seed: 9 }) + foliage('l', 1620, { color: '#2a1a34' }));
}

// 5 · the pact; in the town square the wolf puts its paw in his hand
function scene5() {
  return FAR(sky(SKIES.day) + sun(860, 520, 54, 260))
    + BACK(clouds(420, { seed: 3 }) + gubbio(540, 1080, 1.15, { stone: '#d8ccb6', roof: ROOF, hillC: '#8fae6a' }))
    + ground(1150, '#cbbd9e', { rim: '#e2d6ba' }) + `<path d="M-200 1220 H${W + 200} M-200 1300 H${W + 200}" stroke="#b8a888" stroke-width="3"/>`
    + MID(crowd(1260, 10, { color: '#5a4a52', flags: [['#f6f2e8', '#2f4a8a', '#f6f2e8']] }))
    + francis(400, 1320, 1.9, { mood: 'joy', talk: [0.4, T5B - 0.4], armL: [24, 2, 3], armR: [20, 2, 3] })
    + wolf2(650, 1330, 1.7, { mood: 'calm', paw: T5B, flip: false })
    + `<g transform="translate(540,1010)"><g${M.in('pop', T5B + 0.6, 0.8, 0, 0)}>${sparkles(8, -80, 80, -60, 60, { seed: 7 })}</g></g>`
    + petals(18, { seed: 4, colors: ['#ffffff', '#f2c46b', '#f2a0b0'] })
    + NEAR(foliage('r', 1650, { color: '#4a3a2a', seed: 6 }));
}

// 6 · two years door to door, no dog barked; when it died, the town mourned
function scene6() {
  const alive = `<g${fadeOut(T6B, 1.2)}>`
    + kid(420, 1320, 1.3, { mood: 'joy', armL: 12, armR: [60, 4, 2], propR: breadLoaf })
    + wolf2(640, 1330, 1.35, { mood: 'calm' })
    + dog(900, 1335, 1.0, '#b07a4a') + '</g>';
  const mourn = `<g${fadeIn(T6B, 1.2)}>${wolfGrave(640, 1340, 1.7)}`
    + kid(400, 1330, 1.3, { mood: 'sad', armL: [40, 2, 3], armR: [40, 2, 3.2] })
    + townsfolk(860, 1330, 1.5, 3, { flip: true, mood: 'sad', armL: [40, 2, 3], armR: [40, 2, 3.2] }) + '</g>';
  return FAR(sky([[0, '#7fbde0'], [0.6, '#d8eef4'], [1, '#d8eef4']]) + `<g${fadeIn(T6B, 1.5)}>${sky(SKIES.dusk)}</g>`)
    + BACK(clouds(470, { seed: 3, op: 0.8 }))
    + MID(houses(1200))
    + ground(1200, '#cdb894') + `<path d="M-200 1250 H${W + 200} M-200 1310 H${W + 200}" stroke="#b8a37e" stroke-width="3"/>`
    + alive + mourn
    + NEAR(foliage('l', 1650, { color: '#4a3a2a', seed: 6 }));
}

// 7 · feast day: patron of animals and ecology
function scene7() {
  return FAR(sky([[0, '#4a78b8'], [0.42, '#9fd0d8'], [0.66, '#f8d9a0'], [1, '#f8d9a0']]) + rays(540, 640, { op: 0.1 }))
    + BACK(clouds(460, { color: '#fff4dc', op: 0.7, seed: 9 }) + gubbio(540, 1130, 0.75, { hillC: '#9ac08a' }))
    + glow(540, 1120, 520, 0.8)
    + MID(hill(1200, 30, '#86bb68', 9, { top: '#b0dc8a' }) + olive(120, 1210, 0.8))
    + francis(470, 1290, 2.2, { halo: true, mood: 'happy', armL: [52, 4, 2.6], armR: [30, 2, 3],
      propL: `<g transform="translate(-6,-26)">${perched(0, 0, '#9a7a56', 1)}</g>` })
    + wolf2(800, 1320, 1.3, { mood: 'calm', flip: true })
    + flyer(250, 760, '#b08a62', 1, { ph: 0.4 }) + flyer(860, 820, '#9a7a56', 0.9, { dx: 90, ph: 1.2 })
    + ground(1320, '#6aa457', { rim: '#9ad07a' }) + flowers(1330, 1440, 18, { seed: 3 }) + tufts(1322, 12, '#4f8a3c', { seed: 6 })
    + NEAR(bokeh(6, { seed: 13, op: [0.25, 0.5] }) + foliage('l', 1650, { color: '#24452c', seed: 7 }) + foliage('r', 1660, { color: '#24452c', seed: 8 }));
}

export const STORY = {
  slug: 'st_francis_wolf_of_gubbio', name: 'St_Francis_Wolf_of_Gubbio',
  voice: 'am_michael', speed: 0.95,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'He tamed a hungry wolf', thumb_title: 'St. Francis of Assisi', thumb_shift: 0, thumb_t: 3,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'ɐsˈɪsi': 'ɐsˈiːsi',   // Assisi -> ah-SEE-see
    'ɡˈʌbɪˌoʊ': 'ɡˈuːbjoʊ',   // Gubbio -> GOOB-yo
    'ɑːktˈoʊbɚ fˈɔːɹ': 'ɑːktˈoʊbɚ fˈɔːɹθ',   // October 4 -> fourth
  },
  scenes: [
    { kicker: 'ONE FAMOUS STORY', title: 'The Wolf of Gubbio', art: scene0, cam: { move: 'push-fast', oy: 1000 },
      say: ['A wolf was hunting a whole town.', 'One famous story says one man walked out to meet it.', 'This is Saint Francis of Assisi.'] },
    { kicker: 'GUBBIO, ITALY', title: 'A Town in Fear', art: scene1, cam: 'drift-r',
      say: ['In the Italian hill town of Gubbio, a huge wolf was attacking animals, and even people.', 'Families were afraid to step outside the walls.'] },
    { kicker: 'OUTSIDE THE WALLS', title: 'Francis Goes Out', art: scene2, cam: 'pan-r',
      say: ['Francis was staying there, and he felt sorry for the people.', "Against everyone's advice, he walked out to find the wolf."] },
    { kicker: 'FACE TO FACE', title: 'Come, Brother Wolf', art: scene3, cam: { move: 'push', amt: 0.07, ox: 420, oy: 1000 },
      say: ['The wolf charged at him, jaws open.', 'Francis made the sign of the cross and said, Come here, Brother Wolf. In the name of Christ, do not harm me or anyone.'] },
    { kicker: 'A MIRACLE OF PEACE', title: 'Gentle as a Lamb', art: scene4, cam: { move: 'dolly', oy: 1000, ox: 470 },
      say: ['At once, the wolf closed its jaws, and lay down at his feet, as gentle as a lamb.'] },
    { kicker: 'THE TOWN SQUARE', title: 'The Peace Pact', art: scene5, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['Francis made a peace pact. The town would feed the wolf, and the wolf would harm no one.', 'In the town square, the wolf placed its paw in his hand.'] },
    { kicker: 'GUBBIO · TWO YEARS', title: 'A Friend at Every Door', art: scene6, cam: 'drift-l',
      say: ['For two years, it went from door to door, fed by the people, and no dog barked at it.', 'When it died of old age, the whole town mourned.'] },
    { kicker: 'FEAST DAY · OCTOBER 4', title: 'Patron of Animals', art: scene7, cam: 'arc-l',
      say: ['His feast day is October 4. He is a patron of animals and of ecology.', 'Saint Francis of Assisi, pray for us.'] },
  ],
};
