// St. Charbel Makhlouf (feast: July 24). Maronite hermit: black hooded habit, prayer rope, eyes always closed.
// Lebanese mountains, cedars, stone village, grotto, Annaya monastery, hilltop hermitage, oil lamp, stone room, tomb, sickbed (exported for later reels).
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, person, basilica, ground, dark, light, FAR, BACK, MID, NEAR } from '../art.mjs';
import { followers, candle } from './peter.mjs';
import { chalice } from './charles_borromeo.mjs';

const SKC = '#d9ab84', HABIT = '#211d27', GREY = '#d8d2c8', DARKBEARD = '#3a2a20', STONE = '#c9b08c';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);

// ---------------------------------------------------------------- Charbel: black hooded habit, leather belt, closed eyes
const hoodBack = `<path d="M-52 -258 Q-54 -322 0 -324 Q54 -322 52 -258 L56 -192 Q0 -180 -56 -192Z" fill="${HABIT}"/>`;
const hoodFront = `<path d="M-52 -258 Q-54 -322 0 -324 Q54 -322 52 -258 Q47 -298 0 -300 Q-47 -298 -52 -258Z" fill="${HABIT}"/><path d="M-30 -314 Q0 -322 28 -314" stroke="${light(HABIT, 0.18)}" stroke-width="3" fill="none" opacity=".7"/>`
  + `<path d="M-52 -258 Q-50 -226 -36 -204 L-50 -200 Q-60 -228 -52 -258Z M52 -258 Q50 -226 36 -204 L50 -200 Q60 -228 52 -258Z" fill="${HABIT}"/>`;
const belt = `<path d="M-45 -112 Q0 -100 45 -112" stroke="#4a3626" stroke-width="7" fill="none"/>`;
export const prayerRope = (s = 1) => `<g transform="scale(${s}) translate(0,4)">${[...Array(15).keys()].map((i) => { const t = i / 14, x = -30 + 60 * t, y = 62 * (1 - (2 * t - 1) ** 2); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#a8835a"/>`; }).join('')}`
  + `<path d="M26 44 q5 18 2 34 M30 44 q8 16 8 30" stroke="#a8835a" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
export const charbel = (x, y, s, { old = false, over = '', ...o } = {}) => person(x, y, s, {
  kind: 'friar', top: HABIT, cord: false, skin: SKC, hair: old ? GREY : DARKBEARD, beard: old ? GREY : DARKBEARD, mood: 'peaceful', under: hoodBack, ...o,
  over: hoodFront + belt + over });

// ---------------------------------------------------------------- props
export function oilLamp(s = 1, { lit = true, delay = 0 } = {}) {
  const fire = `<circle cy="-34" r="72" fill="url(#sunGlow)"/><g${M.pulse(0.12, 0.7, 0, 0, -22)}><path d="M0 -14 Q-12 -26 -4 -48 Q0 -36 5 -41 Q13 -24 0 -14Z" fill="#ff9a3a"/><path d="M0 -16 Q-6 -24 -2 -35 Q2 -28 4 -30 Q7 -22 0 -16Z" fill="#ffe08a"/></g>`;
  return `<g transform="scale(${s})"><path d="M-30 -8 Q-26 12 0 12 Q22 12 34 -6 L44 -14 L30 -16 Q0 -20 -30 -16 Q-36 -14 -30 -8Z" fill="#a8743e"/><path d="M6 10 Q24 8 34 -6 L44 -14 L30 -16 L10 -14Z" fill="#7e5228" opacity=".7"/>`
    + `<path d="M-30 -8 Q-52 -14 -42 -28" stroke="#a8743e" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cy="-16" rx="26" ry="5" fill="#5a3c20"/>`
    + (lit ? (delay ? `<g${M.in('pop', delay, 0.8, 0, -20)}>${fire}</g>` : fire) : '') + '</g>';
}
const waterJar = `<g><path d="M-24 0 Q-34 -50 -14 -74 L-14 -92 L14 -92 L14 -74 Q34 -50 24 0Z" fill="#b8824e"/><path d="M6 0 Q28 -40 14 -74 L14 -92 L4 -92 L4 -70 Q14 -40 -2 0Z" fill="#8a5c34" opacity=".7"/><ellipse cy="-92" rx="16" ry="5" fill="#5a3c20"/><path d="M14 -80 Q42 -64 22 -40" stroke="#8a5c34" stroke-width="6" fill="none"/></g>`;
const hoe = `<g><rect x="-3.5" y="-190" width="7" height="240" rx="3" fill="#7a5436"/><path d="M-4 -190 L-38 -176 Q-44 -158 -28 -158 L-4 -172Z" fill="#6a6470"/></g>`;
const foodBowl = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="-20" rx="36" ry="9" fill="#6a9a4a"/><circle cx="-12" cy="-23" r="8" fill="#7fb05a"/><circle cx="10" cy="-24" r="7" fill="#5a8a3e"/><path d="M-40 -20 Q-34 12 0 12 Q34 12 40 -20Z" fill="#9a6a40"/><path d="M8 11 Q34 10 40 -20 L18 -20Z" fill="#6e4a2a" opacity=".6"/></g>`;
const strawBed = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="-10" rx="125" ry="22" fill="#d8b868"/><path d="M-118 -12 L-70 -24 M-80 -8 L-30 -26 M-30 -6 L20 -24 M20 -8 L70 -24 M60 -8 L112 -20" stroke="#b8964a" stroke-width="4" stroke-linecap="round"/>`
  + `<rect x="-132" y="-46" width="74" height="30" rx="14" fill="#7a5436"/><ellipse cx="-132" cy="-31" rx="10" ry="15" fill="#c9a06a"/><ellipse cx="-132" cy="-31" rx="5" ry="8" fill="#9a7444"/></g>`;
export const cedarFlag = `<g><rect x="-4" y="-220" width="8" height="270" rx="3" fill="#8a6a44"/><g transform="translate(4,-216)"><rect width="130" height="24" fill="#d0232e"/><rect y="24" width="130" height="46" fill="#fbf7ee"/><rect y="70" width="130" height="24" fill="#d0232e"/>`
  + `<path d="M65 28 L47 44 H56 L42 58 H88 L74 44 H83Z M61 58 H69 V66 H61Z" fill="#1f7a42"/></g></g>`;

// ---------------------------------------------------------------- set pieces
export function cedar(x, y, s = 1, c = '#2c5a3e') {
  const tiers = [[-40, 170], [-100, 150], [-160, 118], [-216, 84]].map(([ty, w], i) => `<path d="M${-w} ${ty} Q${-w * 0.45} ${ty - 40} 0 ${ty - 62} Q${w * 0.45} ${ty - 40} ${w} ${ty} Q0 ${ty + 26} ${-w} ${ty}Z" fill="${i % 2 ? light(c, 0.1) : c}"/><path d="M0 ${ty - 62} Q${w * 0.45} ${ty - 40} ${w} ${ty} Q${w * 0.4} ${ty + 16} 10 ${ty + 14}Z" fill="${dark(c, 0.3)}" opacity=".5"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-14 0 L-9 -180 L9 -180 L14 0Z" fill="#5a3e2a"/><g${M.sway(0.8, 6, x % 3, 0, 0)}>${tiers}</g></g>`;
}
export const lebanonRange = (base, color, snow = null) => {
  const peaks = [[-160, 280], [110, 400], [390, 310], [660, 450], [930, 330], [1230, 400]];
  let d = `M-300 ${base}`, caps = '';
  peaks.forEach(([px, h]) => {
    d += ` L${px} ${base - h} L${px + 135} ${base - 110}`;
    if (snow) caps += `<path d="M${px - 56} ${base - h + 84} L${px} ${base - h} L${px + 56} ${base - h + 66} L${px + 26} ${base - h + 54} L${px + 6} ${base - h + 86} L${px - 20} ${base - h + 58}Z" fill="${snow}"/>`;
  });
  return `<path d="${d} L1380 ${base} Z" fill="${color}"/>${caps}`;
};
const stoneHouse = (x, y, s = 1, wall = STONE) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-70" y="-110" width="140" height="110" fill="${wall}"/><rect x="24" y="-110" width="46" height="110" fill="${dark(wall, 0.2)}" opacity=".6"/><rect x="-78" y="-120" width="156" height="14" rx="3" fill="${dark(wall, 0.28)}"/>`
  + `<path d="M-40 -60 V-82 Q-26 -98 -12 -82 V-60Z" fill="${dark(wall, 0.55)}"/><path d="M14 0 V-48 Q30 -66 46 -48 V0Z" fill="${dark(wall, 0.55)}"/></g>`;
export const stoneVillage = (y, s = 1, wall = STONE) => [[120, 0.8], [290, 1], [470, 0.75], [650, 0.95], [840, 0.8], [1000, 1]].map(([x, k], i) => stoneHouse(x, y - (i % 2) * 28 * s, k * s, i % 2 ? wall : light(wall, 0.1))).join('');
export function grotto(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-170 0 Q-190 -150 -90 -210 Q0 -250 90 -210 Q190 -150 170 0Z" fill="#8a7a6e"/><path d="M60 -222 Q190 -150 170 0 L110 0 Q140 -130 60 -222Z" fill="#6a5c54" opacity=".7"/><path d="M-100 0 Q-110 -110 -50 -150 Q0 -170 50 -150 Q110 -110 100 0Z" fill="#2c2228"/>`
    + `<circle cy="-66" r="90" fill="url(#sunGlow)" opacity=".7"/><rect x="-30" y="-112" width="60" height="84" rx="4" fill="${GOLD}"/><rect x="-24" y="-106" width="48" height="72" fill="#f4ead2"/><circle cy="-84" r="14" fill="#2f5a9a"/><circle cy="-82" r="8" fill="${SKC}"/><path d="M-16 -36 Q-16 -68 0 -72 Q16 -68 16 -36Z" fill="#2f5a9a"/>`
    + `<g transform="translate(-52,-2) scale(0.9)">${candle}</g><g transform="translate(52,-2) scale(0.9)">${candle}</g></g>`;
}
export function cow(x, y, s = 1, c = '#b07a4a', flip = false) {
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><g${M.bob(1.6, 3, x % 2)}><rect x="-62" y="-54" width="16" height="54" rx="6" fill="${dark(c, 0.25)}"/><rect x="38" y="-54" width="16" height="54" rx="6" fill="${dark(c, 0.25)}"/><rect x="-46" y="-54" width="16" height="54" rx="6" fill="${c}"/><rect x="22" y="-54" width="16" height="54" rx="6" fill="${c}"/>`
    + `<rect x="-70" y="-116" width="130" height="74" rx="30" fill="${c}"/><ellipse cx="-12" cy="-88" rx="24" ry="20" fill="#f4ead8"/><path d="M-70 -104 Q-92 -92 -84 -62" stroke="${c}" stroke-width="6" fill="none"/><g${M.sway(4, 2.6, 0, 60, -110)}><ellipse cx="74" cy="-116" rx="32" ry="27" fill="${c}"/><ellipse cx="90" cy="-104" rx="17" ry="13" fill="#eab8a8"/><circle cx="72" cy="-122" r="4.5" fill="#2b1d14"/><path d="M56 -138 L44 -152 M84 -140 L92 -154" stroke="#e8dcc0" stroke-width="6" stroke-linecap="round"/></g></g></g>`;
}
export function annaya(x, y, s = 1, { wall = '#d8c4a0', roof = '#a8583a', win = '#6a5a50' } = {}) {
  const arches = [-300, -210, -120, -30, 60].map((ax) => `<path d="M${ax - 30} 0 V-60 Q${ax} -102 ${ax + 30} -60 V0Z" fill="${dark(wall, 0.5)}"/>`).join('');
  const wins = [-300, -210, -120, -30, 60].map((ax) => `<rect x="${ax - 12}" y="-170" width="24" height="38" rx="11" fill="${win}"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-345" y="-220" width="450" height="220" fill="${wall}"/><path d="M-360 -220 L-335 -258 L100 -258 L120 -220Z" fill="${roof}"/>${arches}${wins}`
    + `<rect x="100" y="-300" width="190" height="300" fill="${light(wall, 0.08)}"/><rect x="230" y="-300" width="60" height="300" fill="${dark(wall, 0.18)}" opacity=".55"/><path d="M90 -300 L195 -372 L300 -300Z" fill="${roof}"/>`
    + `<path d="M195 -372 v-44 M178 -398 h34" stroke="${GOLD}" stroke-width="7"/><path d="M168 -220 V-260 Q195 -288 222 -260 V-220Z" fill="${dark(wall, 0.55)}"/><circle cx="195" cy="-244" r="10" fill="${GOLD}"/><path d="M165 0 V-70 Q195 -104 225 -70 V0Z" fill="${dark(wall, 0.55)}"/></g>`;
}
export function hermitage(x, y, s = 1, { wall = '#c8ae88', roof = '#7a5a48', win = '#ffd98a' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-130" width="130" height="130" fill="${dark(wall, 0.08)}"/><rect x="-168" y="-142" width="164" height="14" rx="3" fill="${roof}"/><rect x="-112" y="-96" width="30" height="36" rx="13" fill="${win}" opacity=".8"/>`
    + `<rect x="-20" y="-180" width="160" height="180" fill="${wall}"/><rect x="88" y="-180" width="52" height="180" fill="${dark(wall, 0.2)}" opacity=".55"/><path d="M-36 -180 L60 -252 L156 -180Z" fill="${roof}"/><path d="M60 -252 v-44 M44 -278 h32" stroke="${GOLD}" stroke-width="7"/>`
    + `<path d="M30 0 V-74 Q60 -106 90 -74 V0Z" fill="${dark(wall, 0.55)}"/><circle cx="60" cy="-132" r="16" fill="${win}" opacity=".85"/></g>`;
}
const vines = (y, x0 = -60, x1 = W + 60) => { let o = ''; for (let x = x0; x < x1; x += 120) o += `<g transform="translate(${x},${y})"><rect x="-4" y="-66" width="8" height="66" fill="#6a4a30"/><circle cy="-76" r="30" fill="#4a7a42"/><circle cx="-22" cy="-62" r="22" fill="#3f6c3a"/><circle cx="22" cy="-62" r="22" fill="#558a4a"/><circle cx="-6" cy="-52" r="7" fill="#5a3060"/><circle cx="10" cy="-50" r="7" fill="#6a3870"/></g>`; return o; };
export const tomb = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-70" width="300" height="70" rx="6" fill="#b4a490"/><rect x="60" y="-70" width="90" height="70" fill="#8e7f6e" opacity=".6"/><rect x="-168" y="-84" width="336" height="20" rx="6" fill="#c8b8a2"/><rect x="-9" y="-190" width="18" height="110" fill="#c8b8a2"/><rect x="-40" y="-162" width="80" height="16" fill="#c8b8a2"/><rect x="3" y="-190" width="6" height="110" fill="#a0907c"/></g>`;
const stoneRoom = (c1 = '#3a3040', c2 = '#44384a', floor = 1200) => {
  let o = `<rect x="-200" y="-400" width="${W + 400}" height="${floor + 440}" fill="${dark(c1, 0.3)}"/>`;
  for (let r = 0, y = 330; y < floor; r++, y += 66) for (let c = -1; c < 9; c++) o += `<rect x="${c * 150 + (r % 2 ? 72 : 0)}" y="${y}" width="142" height="58" rx="10" fill="${(r + c) % 3 ? c1 : c2}"/>`;
  return o;
};
export function sickBed(x, y, s = 1, { blanket = '#6a7fa8' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-280" y="-120" width="22" height="120" fill="#6a4a30"/><rect x="258" y="-84" width="22" height="84" fill="#6a4a30"/><rect x="-270" y="-64" width="540" height="26" fill="#7e5a3c"/><rect x="-262" y="-92" width="526" height="30" rx="12" fill="#efe8da"/><ellipse cx="-196" cy="-100" rx="66" ry="24" fill="#fbf7ee"/></g>`;
}
const blanketOver = (x, y, s = 1, c = '#6a7fa8') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-110 -128 Q40 -146 262 -88 L264 -60 L-110 -60Z" fill="${c}"/><path d="M-110 -128 Q40 -146 262 -88" stroke="${light(c, 0.3)}" stroke-width="7" fill="none"/></g>`;
const lady = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', girl: true, robe: true, top: '#a05a6a', skin: SKC, hair: '#4a3a34', ...o });

// ---------------------------------------------------------------- scenes
// 0 · hook
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 30, seed: 3 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1100, 520, 0.85))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 5 }) + lebanonRange(1170, '#5d4678', '#e8d8e8') + hill(1190, 26, '#4a3560', 3))
    + MID(hermitage(860, 1205, 0.82, { wall: '#8a7088', roof: '#4a3858' }) + cedar(140, 1230, 0.9, '#2a3e4a'))
    + ground(1250, '#54364a', { rim: '#b87a80' }) + tufts(1260, 10, '#352236', { seed: 7 })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${charbel(520, 1300, 2.3, { old: true, halo: 0.6, armL: -18, armR: -18, propR: prayerRope(1.1) })}</g>`
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · childhood: with his mother, then praying at the grotto (sentence 2)
const S1B = 9.0;
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];
function scene1() {
  return FAR(sky(DAYSKY) + sun(860, 560, 58, 260))
    + BACK(clouds(500, { seed: 2 }) + lebanonRange(1090, '#8fa8bc', '#f6f8fb') + hill(1085, 30, '#7fa878', 4, { top: '#a8cc98' }))
    + MID(stoneVillage(1110, 0.72) + cedar(1020, 1170, 0.7))
    + ground(1170, '#88ac62', { rim: '#b2d28a' }) + tufts(1180, 14, '#5e8a48', { seed: 3 }) + flowers(1200, 1320, 14, { seed: 6 })
    + grotto(270, 1290, 1.02)
    + cow(800, 1320, 0.9, '#b07a4a', true) + cow(940, 1270, 0.68, '#8a5c38')
    + `<g${fadeOut(S1B)}>${lady(520, 1315, 1.6, { mood: 'sad', armL: 10, armR: [30, 2, 3] })}${person(650, 1325, 1.15, { kind: 'kid', top: '#7a5a3e', pants: '#4a3a30', skin: SKC, hair: '#2a1c14', mood: 'sad', flip: true, armL: 10, armR: 10 })}</g>`
    + `<g${fadeIn(S1B)}>${person(490, 1345, 1.15, { kind: 'kid', top: '#7a5a3e', pants: '#4a3a30', skin: SKC, hair: '#2a1c14', mood: 'peaceful', kneel: true, armL: -18, armR: -18 })}</g>`
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 9 }));
}

// 2 · Annaya: arrival, then ordained priest with the chalice (sentence 2)
const S2B = 6.1;
const MORN = [[0, '#b8603e'], [0.3, '#f0a46a'], [0.64, '#fbd9a0'], [1, '#fde6c0']];
function scene2() {
  return FAR(sky(MORN) + sun(180, 590, 56, 260))
    + BACK(clouds(500, { color: '#fff7e8', op: 0.6, seed: 9 }) + lebanonRange(1060, '#a78a8e') + hill(1070, 30, '#8fa070', 5))
    + MID(annaya(690, 1140, 1.1, { wall: '#b39a7a' }) + cedar(70, 1150, 0.85))
    + ground(1150, '#a89a6a', { rim: '#ccbc88' }) + tufts(1160, 12, '#7a6e42', { seed: 2 })
    + `<g${fadeOut(S2B)}><g${M.tw([{ at: 0.2, dur: 3.2, from: { x: -240 }, to: { x: 0 }, ease: 'power1.out' }])}>${person(430, 1335, 2.0, { kind: 'layman', top: '#7a5a3e', pants: '#4a3a30', skin: SKC, hair: '#2a1c14', beard: '#2a1c14', mood: 'determined', armL: 10, armR: [20, 3, 2] })}</g></g>`
    + `<g${fadeIn(S2B)}>${charbel(430, 1335, 2.05, { mood: 'happy', armL: 12, armR: [62, 3, 3], propR: chalice(1.3) })}</g>`
    + motes(12, { y0: 620, y1: 1200, color: '#fff2c4', seed: 6 })
    + NEAR(foliage('l', 1650, { color: '#4a3a2a', seed: 4 }));
}

// 3 · the lamp: water jar, the flame, surprised superiors (sentence 2)
const S3B = 6.5;
function scene3() {
  const sup = (x, s, top, beard) => charbel(x, 1320, s, { top, beard, hair: beard, mood: 'surprised', armL: 12, armR: [68, 6, 1.6] });
  return FAR(stoneRoom())
    + MID(`<rect x="-200" y="1200" width="${W + 400}" height="800" fill="#2c2430"/><rect x="-200" y="1196" width="${W + 400}" height="8" fill="#5a4c5a"/>`
      + `<path d="M420 700 V560 Q490 480 560 560 V700Z" fill="#0e1a34"/><circle cx="490" cy="580" r="9" fill="#f6f0d8"/><path d="M420 700 V560 Q490 480 560 560 V700Z" fill="none" stroke="#5a4c5a" stroke-width="14"/>`)
    + `<g${M.in('fade', 0.5, 2.2)}>${glow(560, 1000, 640, 0.9)}</g>`
    + `<rect x="330" y="1080" width="420" height="30" rx="6" fill="#7e5a3c"/><rect x="330" y="1098" width="420" height="10" fill="#5a3c28"/><rect x="370" y="1108" width="26" height="170" fill="#6a4a30"/><rect x="684" y="1108" width="26" height="170" fill="#6a4a30"/>`
    + `<g transform="translate(680,1082)">${waterJar}</g><g transform="translate(520,1064)">${oilLamp(2.5, { delay: 0.6 })}</g>`
    + `<g${fadeIn(S3B, 0.7)}>${sup(140, 1.6, '#322c3a', '#a89c8e')}${sup(330, 1.45, '#3a3442', '#6a5240')}</g>`
    + charbel(850, 1385, 1.55, { kneel: true, armL: -18, armR: -18 })
    + motes(16, { x0: 300, x1: 780, y0: 760, y1: 1150, color: '#ffe0a0', seed: 3 });
}

// 4 · the hermitage: 23 years; bowl and straw bed appear on sentence 2
const S4B = 5.5;
function scene4() {
  return FAR(sky(MORN) + sun(170, 620, 60, 280))
    + BACK(clouds(510, { color: '#fff4e0', op: 0.6, seed: 12 }) + lebanonRange(1060, '#8a7a96', '#f4eef2') + hill(1090, 46, '#7a8a62', 2, { top: '#a4b480' }))
    + MID(hermitage(800, 1165, 1.2) + cedar(1010, 1170, 0.95) + cedar(70, 1160, 0.8) + vines(1190))
    + ground(1190, '#9a8a58', { rim: '#c4b47e' }) + tufts(1200, 12, '#6e6236', { seed: 8 })
    + `<g${fadeIn(S4B, 0.8)}>${strawBed(225, 1335, 1.05)}${foodBowl(790, 1345, 1.35)}</g>`
    + charbel(500, 1345, 2.15, { old: true, armL: [18, 2, 3], armR: [24, 3, 2.8], propL: hoe, propR: prayerRope(1) })
    + motes(14, { y0: 560, y1: 1240, seed: 5 })
    + NEAR(foliage('r', 1640, { color: '#3a3a26', seed: 7 }));
}

// 5 · Christmas Eve 1898: the liturgy (no collapse shown), then snow, light and halo on sentence 2
const S5B = 6.7;
function scene5() {
  const mourners = [[175, 'sad', '#2d2835', '#8a8078'], [905, 'peaceful', '#35303e', '#4a3a2e']].map(([x, mood, top, b], i) => charbel(x, 1300, 1.35, { mood, top, beard: b, hair: b, flip: i === 1, armL: 14, armR: 14 })).join('');
  return FAR(sky(SKIES.deep, { stars: 48, seed: 9 }) + rays(540, 700, { op: 0.07 }))
    + BACK(lebanonRange(1120, '#3f3358', '#b8b4cc') + hill(1160, 24, '#a8a8c0', 5))
    + MID(hermitage(820, 1205, 1.0, { wall: '#6f6078', roof: '#3e3248' }) + cedar(120, 1215, 0.9, '#22303e'))
    + ground(1225, '#b4b4c8', { rim: '#dcdce8' })
    + `<g${fadeIn(S5B, 2.2)}>${beam(450, 640, 310, 770, 1340, 0.55)}${mourners}</g>`
    + `<g${fadeOut(S5B)}>${charbel(540, 1335, 2.0, { old: true, armL: 12, armR: [130, 3, 3], propR: chalice(1.3) })}</g>`
    + `<g${fadeIn(S5B)}>${charbel(540, 1335, 2.0, { old: true, halo: S5B + 1, armL: -18, armR: -18, propR: prayerRope(1) })}</g>`
    + petals(30, { seed: 7, colors: ['#ffffff', '#eef0fa'], fall: 900 })
    + NEAR(foliage('l', 1660, { color: '#1c1428', seed: 2 }));
}

// 6 · light at the tomb; pilgrims gather; sparkles for the recorded miracles (sentence 2)
const S6B = 6.2;
function scene6() {
  const pil = [[105, '#a04a4a', 1], [260, '#4a7aa8', 0], [820, '#6aa457', 0], [975, '#c49a3a', 1]].map(([x, top, g], i) => person(x, 1375, 1.25, { kind: 'layman', girl: !!g, robe: !!g, top, pants: '#3a3448', skin: i % 2 ? SKC : SKIN.s3, hair: g ? '#3a2a20' : '#241a14', beard: null, mood: 'peaceful', kneel: true, armL: -18, armR: -18 })).join('');
  return FAR(sky(SKIES.night, { stars: 60, seed: 5 }) + rays(540, 880, { op: 0.12 }))
    + BACK(lebanonRange(1090, '#2a2c50') + annaya(620, 1160, 0.92, { wall: '#5e5470', roof: '#3a3048', win: '#ffd98a' }))
    + ground(1190, '#3a3448', { rim: '#7a6e88' }) + tufts(1200, 8, '#2a2438', { seed: 4 })
    + `<g${M.in('fade', 0.8, 2.4)}>${glow(540, 1050, 560, 1)}${beam(470, 610, 320, 760, 1290, 0.6)}</g>`
    + `<g${fadeIn(3.4, 1.2)}>${followers(1215, 12, { color: '#2a2438' })}</g>`
    + tomb(540, 1300, 1.25)
    + `<g${fadeIn(3.4, 1.2)}>${pil}</g>`
    + `<g${fadeIn(S6B, 1)}>${sparkles(26, 120, 960, 560, 1200, { seed: 8, color: '#fff2c4', size: 1.3 })}</g>`
    + motes(22, { x0: 280, x1: 800, y0: 620, y1: 1240, color: '#fff2c4', seed: 9, rise: 140 });
}

// 7 · Nohad El Shami: the night and the dream (two monks; no surgery shown), then morning with her family (end of sentence 2)
const S7B = 7.7, S7C = 11.5;
function scene7() {
  const kids = [[110, '#4b8bc4', false], [235, '#e2b448', true], [840, '#d8644e', true], [975, '#6aa457', false]].map(([x, top, girl], i) => person(x, 1335, 1.25, { kind: 'kid', top, girl, flip: i > 1, pants: '#3a3a4a', skin: SKC, hair: '#2a1a12', mood: 'joy', armL: i === 0 || i === 3 ? [125, 14, 1.3] : 14, armR: 14 })).join('');
  return FAR(stoneRoom('#4a4258', '#544a60'))
    + MID(`<rect x="-200" y="1200" width="${W + 400}" height="800" fill="#3a3244"/><rect x="-200" y="1196" width="${W + 400}" height="8" fill="#6a5e6e"/>`)
    + `<g${fadeIn(S7C, 1)}><rect x="-200" y="-400" width="${W + 400}" height="1600" fill="#f4dcb4" opacity=".55"/>${glow(540, 800, 620, 0.9)}</g>`
    + `<g${fadeOut(S7C, 0.7)}>`
    + `<g${fadeIn(S7B, 1.2)}>${glow(280, 960, 460, 0.95)}${charbel(190, 1215, 1.5, { old: true, halo: true, armL: 12, armR: [78, 3, 3] })}${charbel(450, 1190, 1.3, { top: '#322c3a', beard: GREY, hair: GREY, halo: true, armL: 12, armR: [40, 3, 3] })}</g>`
    + sickBed(540, 1320, 1.25)
    + `<g transform="translate(610,1200) rotate(-90)">${lady(0, 0, 1.2, { mood: 'sad', armL: 8, armR: 8 })}</g>`
    + blanketOver(540, 1320, 1.25)
    + `</g>`
    + `<g${fadeIn(S7C, 1)}>${kids}${lady(540, 1345, 2.1, { mood: 'joy', armL: [130, 10, 1.8], armR: [130, 10, 2] })}</g>`
    + motes(14, { y0: 620, y1: 1200, color: '#fff2c4', seed: 8 });
}

// 8 · beatified, canonized; Pope Leo XIV at the tomb (sentence 2)
const S8B = 8.2;
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
function scene8() {
  const banner = `<g transform="translate(540,560)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${charbel(0, 408, 1.1, { old: true, halo: true, armL: -18, armR: -18, propR: prayerRope(1) })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  const pope = person(770, 1385, 1.65, { kind: 'priest', top: '#f6f0e2', collar: false, beard: null, skin: SKIN.fair, hair: '#b0a89c', mood: 'peaceful', kneel: true, armL: -18, armR: -18, over: `<path d="M-30 -284 Q0 -306 30 -284 Q0 -292 -30 -284Z" fill="#fbf7ee"/>` });
  return FAR(sky(GOLDSKY) + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7))
    + BACK(clouds(820, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + basilica(540, 1180, 1.05, { color: '#3a2a40' }))
    + banner
    + ground(1180, '#3a2a40')
    + MID(followers(1400, 14, { color: '#241a2e' }))
    + petals(24, { seed: 4, colors: ['#ffffff', '#f2c46b', '#f2a0b0'] })
    + `<g${fadeIn(S8B, 1)}>${sky(SKIES.dusk, { stars: 24, seed: 2 })}${rays(540, 860, { op: 0.1 })}${lebanonRange(1120, '#4a3560')}${annaya(620, 1180, 0.9, { wall: '#7a6880', roof: '#4a3858', win: '#ffd98a' })}${ground(1205, '#54364a', { rim: '#b87a80' })}`
    + `${glow(400, 1030, 480, 0.9)}${tomb(370, 1290, 1.25)}${pope}</g>`;
}

// 9 · feast day, patron of Lebanon, closed eyes
function scene9() {
  const kids = [[110, '#4b8bc4', SKC, false], [235, '#e2b448', SKIN.fair, true], [850, '#d8644e', '#a06a44', true], [975, '#6aa457', SKIN.priest, false]]
    .map(([x, top, skin, girl], i) => person(x, 1335, 1.2, { mood: 'joy', kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#a06a30' : '#2a1a10', pants: '#3a3a4a', armL: 14, armR: 14 })).join('');
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(600, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 6 }) + lebanonRange(1170, '#5d4678', '#e8d8e8') + hill(1205, 18, '#4a3560', 3, { freq: 1.6 }))
    + glow(540, 1040, 500, 0.8)
    + MID(cedar(80, 1250, 1.05, '#2a3e4a') + `<g transform="translate(965,1190) scale(-1.7,1.7)">${cedarFlag}</g>`)
    + ground(1260, '#54364a', { rim: '#b87a80' }) + tufts(1266, 10, '#352236', { seed: 7 })
    + charbel(540, 1305, 2.2, { old: true, halo: 0.3, armL: -18, armR: -18, propR: prayerRope(1.1) })
    + kids
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + petals(10, { seed: 3, colors: ['#ffe2a0', '#ffffff'] })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_charbel_makhlouf', name: 'St_Charbel_Makhlouf',
  voice: 'am_michael', speed: 1.0,
  thumb_hook: 'After he died, the world came', thumb_title: 'St. Charbel Makhlouf', thumb_shift: 20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1290, 'l']],
  fix: {
    'tʃˈɑːɹbəl': 'ʃˈɑːɹbɛl',       // Charbel (Shar-bel)
    'jˈaʊsɛf': 'jˈuːsɛf',           // Youssef
    'mˈækuːf': 'mɑːklˈuːf',         // Makhlouf
    'bᵻkˈɑː': 'bˈɛkɑː',             // Bekaa
    'kˈæfɹə': 'kˈɑːfɹə',            // Kafra
    'ˈænəjə': 'ænˈaɪə',             // Annaya
    'nˈoʊhæd': 'noʊhˈɑːd',          // Nohad
  },
  scenes: [
    { kicker: 'THE HERMIT OF LEBANON', title: 'St. Charbel', art: scene0, cam: { move: 'push', amt: 0.07, oy: 950 },
      say: ['He spent his last 23 years as a hermit in Lebanon.', 'After he died, the world came looking for him.', 'This is Saint Charbel.'] },
    { kicker: '1828 · BEKAA KAFRA, LEBANON', title: 'A Mountain Boy', art: scene1, cam: 'pan-r',
      say: ['Youssef Makhlouf was born in 1828, in the mountain village of Bekaa Kafra. His father died when he was three.',
        'He tended the family cows, and prayed at a grotto with an icon of Mary.'] },
    { kicker: '1851 · ANNAYA', title: 'A New Name', art: scene2, cam: 'drift-l',
      say: ['At about 23, he left his village for the monastery, and took a new name, Charbel.',
        'Ordained a priest in 1859, he spent sixteen years at Annaya.'] },
    { kicker: 'ONE FAMOUS STORY', title: 'The Lamp', art: scene3, cam: { move: 'push', amt: 0.08, ox: 540, oy: 1050 },
      say: ['One famous story says his lamp was filled with water instead of oil, yet it burned all night.',
        'His superiors took it as a sign, and let him become a hermit.'] },
    { kicker: '1875 · THE HERMITAGE', title: 'Alone with God', art: scene4, cam: 'pan-l',
      say: ['In 1875, he moved to the hermitage of Saints Peter and Paul.',
        'He ate one simple meal a day, never meat, and slept on straw, with a log for a pillow.',] },
    { kicker: 'DECEMBER 24, 1898 · ANNAYA', title: 'Home to God', art: scene5, cam: 'tilt-up',
      say: ['Days before Christmas in 1898, he suffered a stroke while celebrating the liturgy.',
        'He died on Christmas Eve, at age 70.'] },
    { kicker: 'AFTER HIS DEATH · ANNAYA', title: 'Light at the Tomb', art: scene6, cam: { move: 'pull', amt: 0.07, oy: 1050 },
      say: ['Within months, a bright light was reported around his tomb, and pilgrims began to come.',
        'The monastery has now recorded more than 33,000 miracles attributed to his prayers.'] },
    { kicker: 'JANUARY 1993 · LEBANON', title: 'A Mother of Twelve', art: scene7, cam: 'drift-r',
      say: ['In 1993, Nohad El Shami, a mother of twelve, lay partly paralyzed after a stroke.',
        'She reported a dream of Saint Charbel operating on her neck.',
        'She woke able to move her whole body again.'] },
    { kicker: 'OCTOBER 9, 1977 · ROME', title: 'Canonized', art: scene8, cam: { move: 'pull', amt: 0.06, oy: 800 },
      say: ['Pope Paul VI had beatified him in 1965, and declared him a saint in 1977.',
        'In 2025, Pope Leo XIV came to pray at his tomb.'] },
    { kicker: 'FEAST DAY · JULY 24', title: 'Patron of Lebanon', art: scene9, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['His feast day is July 24, and he is a patron of Lebanon.', 'In his images, his eyes are always closed.', 'Saint Charbel, pray for us.'] },
  ],
};
