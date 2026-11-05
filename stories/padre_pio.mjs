// St. Pio of Pietrelcina, Padre Pio (feast: September 23). Capuchin friar: brown habit with short cape, white cord, full beard, fingerless gloves, rosary.
// Exports for later reels: pio, MITT, capuchinCape, crucifix, altar, confessional, ticket, graceFriary, gargano, stoneRoom, villager.
// The stigmata are never drawn: the gloves and the light from the crucifix carry the story.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, person, rosary, cross_staff, basilica, ground, dark, light, FAR, BACK, MID, NEAR } from '../art.mjs';
import { followers, candle, sheep, obelisk } from './peter.mjs';
import { chalice } from './charles_borromeo.mjs';
import { hospital } from './cabrini.mjs';
import { assisi, olive, tree } from './francis.mjs';
import { friary, cottage } from './kolbe.mjs';

const SK = '#e3b48e', HABIT = '#5e3f28', GLOVE = '#3f2a1c', STONE = '#d9c8a6';
const BEARD = { boy: '#2a1c14', young: '#2e2016', mid: '#5a4636', old: '#d6d0c6' };
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);

// ---------------------------------------------------------------- Padre Pio: habit, short cape, cord, beard, fingerless gloves
export const MITT = `<g fill="${SK}"><ellipse cx="-7" cy="11" rx="3.8" ry="5.5"/><ellipse cx="0" cy="13" rx="3.8" ry="6"/><ellipse cx="7" cy="11" rx="3.8" ry="5.5"/></g><path d="M-12 7 A12.5 12.5 0 1 1 12 7 Q0 11 -12 7Z" fill="${GLOVE}"/><path d="M3 -11 A12.5 12.5 0 0 1 12 7 L7 9 Q9 -3 3 -11Z" fill="${dark(GLOVE, 0.3)}" opacity=".6"/>`;
export const capuchinCape = (c = HABIT) => `<path d="M-40 -211 Q0 -184 40 -211 Q53 -186 47 -158 Q0 -140 -47 -158 Q-53 -186 -40 -211Z" fill="${dark(c, 0.08)}"/>`
  + `<path d="M14 -196 Q30 -204 40 -211 Q53 -186 47 -158 Q32 -152 18 -149 Q28 -172 14 -196Z" fill="${dark(c, 0.3)}" opacity=".5"/><path d="M-44 -160 Q0 -142 44 -160" stroke="${light(c, 0.22)}" stroke-width="3" fill="none" opacity=".55"/>`;
export const pio = (x, y, s, { age = 'old', gloves = true, propL = '', propR = '', over = '', ...o } = {}) => person(x, y, s, {
  kind: 'friar', top: HABIT, skin: SK, hair: BEARD[age], beard: age === 'boy' ? null : BEARD[age],
  propL: (gloves ? MITT : '') + propL, propR: (gloves ? MITT : '') + propR, ...o, over: capuchinCape() + over });
const friarMan = (x, y, s, o = {}) => person(x, y, s, { kind: 'friar', top: dark(HABIT, 0.08), skin: SK, over: capuchinCape(dark(HABIT, 0.08)), ...o });
const SKINSET = [SK, '#d9a97f', '#f0c9a8', '#c99a72'], TOPS = ['#a04a4a', '#4a7aa8', '#6aa457', '#c49a3a', '#7a5a8a', '#b86a3a'];
export const villager = (x, y, s, i = 0, o = {}) => {
  const girl = i % 2 === 1;
  return person(x, y, s, { kind: 'layman', girl, robe: girl, top: TOPS[i % TOPS.length], pants: '#3a3448', skin: SKINSET[i % 4], hair: girl ? '#3a2a20' : '#241a14', beard: null, ...o });
};

// ---------------------------------------------------------------- props and set pieces
export const ticket = (n = 17, mirror = false) => `<g transform="translate(0,-22)${mirror ? ' scale(-1,1)' : ''}"><rect x="-20" y="-16" width="40" height="30" rx="4" fill="#fbf4dc"/><rect x="-20" y="-16" width="40" height="7" rx="3" fill="#d4384a"/><text y="11" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="17" fill="#2b1d14">${n}</text></g>`;
export const crucifix = (s = 1) => `<g transform="scale(${s})"><rect x="-13" y="-470" width="26" height="480" rx="5" fill="#6e4a2c"/><rect x="3" y="-470" width="10" height="480" rx="4" fill="#4e3420" opacity=".6"/>`
  + `<rect x="-150" y="-392" width="300" height="26" rx="5" fill="#6e4a2c"/><rect x="-150" y="-374" width="300" height="8" rx="3" fill="#4e3420" opacity=".55"/>`
  + `<path d="M-132 -384 Q-70 -370 -22 -354 L22 -354 Q70 -370 132 -384" stroke="#f0d8b0" stroke-width="15" fill="none" stroke-linecap="round"/>`
  + `<path d="M-22 -356 Q0 -348 22 -356 L17 -236 Q0 -228 -17 -236Z" fill="#f0d8b0"/><path d="M-20 -240 Q0 -232 20 -240 L16 -192 Q0 -184 -16 -192Z" fill="#f6efe0"/><path d="M-13 -196 L-9 -82 L9 -82 L13 -196Z" fill="#f0d8b0"/><path d="M4 -196 L9 -82 L1 -82 L0 -192Z" fill="#c9a880" opacity=".6"/>`
  + `<circle cy="-386" r="23" fill="#f0d8b0"/><path d="M-23 -392 Q-20 -414 0 -412 Q20 -414 23 -392 Q10 -402 0 -400 Q-10 -402 -23 -392Z" fill="#4a3424"/><path d="M-13 -372 Q0 -360 13 -372 Q0 -378 -13 -372Z" fill="#4a3424"/></g>`;
export function altar(x, y, s = 1, { cloth = '#fbf6ea', base = '#7e5a3c', cross = true } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-190" y="-138" width="380" height="138" fill="${base}"/><rect x="60" y="-138" width="130" height="138" fill="${dark(base, 0.25)}" opacity=".6"/>`
    + `<rect x="-202" y="-152" width="404" height="24" rx="4" fill="${cloth}"/><path d="M-202 -128 L-202 -86 L-160 -128Z M202 -128 L202 -86 L160 -128Z" fill="${cloth}"/><path d="M-38 -110 h76 M0 -128 v62" stroke="${GOLD}" stroke-width="6"/>`
    + `<g transform="translate(-150,-152) scale(1.3)">${candle}</g><g transform="translate(150,-152) scale(1.3)">${candle}</g>`
    + (cross ? `<g transform="translate(0,-152) scale(0.32)">${crucifix(1)}</g>` : '') + '</g>';
}
// Wooden confessional: the friar stands in the open centre behind a half door, kneelers and grilles at the sides
export const confessionalBack = (x, y, s = 1, c = '#6e4a2c') => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-250" y="-470" width="500" height="470" fill="${c}"/><path d="M-270 -470 L0 -560 L270 -470Z" fill="${dark(c, 0.22)}"/><path d="M0 -560 v-46 M-18 -586 h36" stroke="${GOLD}" stroke-width="7"/>`
  + `<path d="M-110 0 V-340 Q0 -440 110 -340 V0Z" fill="${dark(c, 0.55)}"/><rect x="-250" y="-470" width="18" height="470" fill="${light(c, 0.15)}"/><rect x="232" y="-470" width="18" height="470" fill="${dark(c, 0.25)}"/></g>`;
export const confessionalFront = (x, y, s = 1, c = '#6e4a2c') => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-118" y="-146" width="236" height="146" fill="${light(c, 0.1)}"/><rect x="-104" y="-132" width="208" height="118" rx="4" fill="${c}"/><rect x="-118" y="-156" width="236" height="16" rx="3" fill="${dark(c, 0.25)}"/>`
  + [-1, 1].map((d) => `<rect x="${d * 180 - 40}" y="-260" width="80" height="110" fill="${dark(c, 0.5)}"/><path d="M${d * 180 - 40} -240 h80 M${d * 180 - 40} -215 h80 M${d * 180 - 40} -190 h80 M${d * 180 - 20} -260 v110 M${d * 180} -260 v110 M${d * 180 + 20} -260 v110" stroke="${light(c, 0.3)}" stroke-width="3"/>`).join('') + '</g>';
// Our Lady of Grace friary, San Giovanni Rotondo: small gabled church, bell tower, long convent wing
export function graceFriary(x, y, s = 1, { wall = STONE, roof = '#8a5a40', win = '#ffe0a0' } = {}) {
  const wins = [150, 215, 280, 345, 410].map((wx) => `<rect x="${wx}" y="-112" width="30" height="42" rx="13" fill="${win}" opacity=".8"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="110" y="-160" width="340" height="160" fill="${dark(wall, 0.1)}"/><path d="M96 -160 L120 -196 L440 -196 L464 -160Z" fill="${roof}"/>${wins}`
    + `<rect x="-205" y="-330" width="84" height="330" fill="${light(wall, 0.06)}"/><rect x="-150" y="-330" width="29" height="330" fill="${dark(wall, 0.2)}" opacity=".55"/><path d="M-217 -330 L-163 -396 L-109 -330Z" fill="${roof}"/><path d="M-185 -270 V-296 Q-163 -320 -141 -296 V-270Z" fill="${dark(wall, 0.6)}"/><path d="M-163 -396 v-34 M-175 -416 h24" stroke="${GOLD}" stroke-width="6"/>`
    + `<rect x="-120" y="-240" width="240" height="240" fill="${wall}"/><rect x="50" y="-240" width="70" height="240" fill="${dark(wall, 0.2)}" opacity=".55"/><path d="M-136 -240 L0 -330 L136 -240Z" fill="${roof}"/><path d="M0 -330 v-44 M-16 -356 h32" stroke="${GOLD}" stroke-width="7"/>`
    + `<circle cy="-176" r="28" fill="${win}" opacity=".9"/><circle cy="-176" r="28" fill="none" stroke="${dark(wall, 0.4)}" stroke-width="5"/><path d="M-36 0 V-84 Q0 -126 36 -84 V0Z" fill="${dark(wall, 0.58)}"/></g>`;
}
export const gargano = (base, c, seed = 2) => hill(base, 70, c, seed, { freq: 0.8 });
export const stoneRoom = (c1 = '#3a3040', c2 = '#44384a', floor = 1200) => {
  let o = `<rect x="-200" y="-400" width="${W + 400}" height="${floor + 440}" fill="${dark(c1, 0.3)}"/>`;
  for (let r = 0, y = 330; y < floor; r++, y += 66) for (let c = -2; c < 10; c++) o += `<rect x="${c * 150 + (r % 2 ? 72 : 0)}" y="${y}" width="142" height="58" rx="10" fill="${(r + c) % 3 ? c1 : c2}"/>`;
  return o;
};
const floorAt = (y, c = '#2c2430', rim = '#5a4c5a') => `<rect x="-200" y="${y}" width="${W + 400}" height="${2000 - y}" fill="${c}"/><rect x="-200" y="${y - 4}" width="${W + 400}" height="8" fill="${rim}"/>`;
const choirStalls = (y, c = '#4a3020') => [...Array(12).keys()].map((i) => { const x = -60 + i * 110; return `<g transform="translate(${x},${y})"><rect x="-50" y="-210" width="100" height="210" fill="${i % 2 ? c : dark(c, 0.12)}"/><path d="M-40 -190 Q0 -224 40 -190 V-40 H-40Z" fill="${dark(c, 0.35)}"/></g>`; }).join('');
const scroll = `<g transform="translate(0,-6)"><rect x="-20" y="-40" width="40" height="52" rx="3" fill="#f6eed8"/><path d="M-13 -30 h26 M-13 -20 h26 M-13 -10 h20" stroke="#a89878" stroke-width="2.6"/><circle cy="4" r="7" fill="#b8322e"/></g>`;
const wheat = (y, { x0 = -60, x1 = W + 60, c = '#d9b35a' } = {}) => { let o = ''; for (let x = x0, i = 0; x < x1; x += 46, i++) o += `<g transform="translate(${x},${y + (i % 3) * 6})"><g${M.sway(2.2, 3 + (i % 3) * 0.5, i * 0.3, 0, 0)}><path d="M0 0 V-70" stroke="${dark(c, 0.2)}" stroke-width="3"/><ellipse cy="-82" rx="6" ry="16" fill="${c}"/></g></g>`; return o; };

// ---------------------------------------------------------------- scenes
// 0 · hook: the gloved friar with his rosary
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 30, seed: 3 }) + rays(540, 760, { op: 0.08 }) + glow(540, 1080, 520, 0.85))
    + BACK(clouds(590, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 5 }) + gargano(1150, '#5d4678', 4) + hill(1195, 24, '#4a3560', 3))
    + MID(graceFriary(650, 1225, 0.62, { wall: '#8a7088', roof: '#4a3858', win: '#ffd98a' }))
    + ground(1250, '#54364a', { rim: '#b87a80' }) + tufts(1260, 10, '#352236', { seed: 7 })
    + `<g${M.in('pop', 0, 1.0, 400, 1250)}>${pio(400, 1325, 2.3, { age: 'mid', halo: 0.6, mood: 'happy', armL: [30, 2, 3.2], armR: [34, 2, 2.8], propL: '', propR: rosary() })}</g>`
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · Pietrelcina: a poor farm family; a friar walks by on sentence 2
const S1B = 7.6;
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];
function scene1() {
  return FAR(sky(DAYSKY) + sun(690, 500, 58, 260))
    + BACK(clouds(500, { seed: 2 }) + assisi(420, 1030, 0.72, { hillC: '#9ab078', wall: '#e0cba8', roof: '#b8603e' }))
    + MID(hill(1090, 26, '#a8bc70', 6, { top: '#c4d48c' }) + olive(930, 1130, 1.05) + olive(90, 1120, 0.85) + cottage(780, 1150, 1.05, { wall: '#e0cba8', roof: '#a8603e', win: '#6a7a88' }))
    + ground(1150, '#b8ac5e', { rim: '#d8cc86' }) + wheat(1190)
    + sheep(860, 1300, 0.75, 0.3) + sheep(990, 1270, 0.6, 1.1, true)
    + person(250, 1335, 1.75, { kind: 'layman', top: '#8a7458', pants: '#4a3a30', skin: '#d9a97f', hair: '#2a1c14', beard: '#2a1c14', mood: 'happy', armL: 10, armR: [18, 2, 3] })
    + person(430, 1340, 1.7, { kind: 'layman', girl: true, robe: true, top: '#7a4a48', skin: SK, hair: '#2a1c14', mood: 'happy', armL: 10, armR: [24, 2, 3] })
    + person(585, 1345, 1.15, { kind: 'kid', top: '#a88c64', pants: '#4a3a30', skin: SK, hair: '#241810', mood: 'happy', flip: true, armL: 12, armR: 12 })
    + `<g${M.in('fade', S1B, 0.8)}><g${M.tw([{ at: S1B, dur: 2.6, from: { x: 300 }, to: { x: 0 }, ease: 'power1.out' }])}>${friarMan(805, 1350, 1.75, { hair: '#4a3424', beard: '#4a3424', mood: 'happy', flip: true, armL: 10, armR: [28, 3, 2.4] })}</g></g>`
    + `<g${M.in('pop', S1B + 1.4, 0.5, 585, 1100)}>${sparkles(10, 520, 660, 1040, 1180, { seed: 6, color: '#fff2c4' })}</g>`
    + motes(10, { y0: 620, y1: 1250, color: '#fff2c4', seed: 6 })
    + NEAR(foliage('r', 1650, { color: '#4a5a2e', seed: 9 }));
}

// 2 · Morcone: takes the habit; illness and home (sentence 2); priest with the chalice (end of sentence 2)
const S2B = 6.8, S2C = 8.5;
const MORN = [[0, '#b8603e'], [0.3, '#f0a46a'], [0.64, '#fbd9a0'], [1, '#fde6c0']];
function scene2() {
  return FAR(sky(MORN) + sun(880, 500, 56, 260))
    + BACK(clouds(600, { color: '#fff7e8', op: 0.6, seed: 9 }) + gargano(1090, '#a78a8e', 3) + hill(1095, 26, '#8fa070', 5))
    + MID(friary(590, 1160, 0.82, { wall: '#d9c8a6', roof: '#8a5a40' }) + olive(1000, 1170, 0.9))
    + ground(1160, '#a89a6a', { rim: '#ccbc88' }) + tufts(1170, 12, '#7a6e42', { seed: 2 })
    + `<g${fadeOut(S2B)}>${friarMan(230, 1335, 1.8, { hair: '#cfc8bc', beard: '#cfc8bc', mood: 'happy', armL: 10, armR: [62, 3, 3] })}${pio(600, 1340, 2.05, { age: 'boy', gloves: false, mood: 'joy', armL: 10, armR: 10 })}</g>`
    + `<g${fadeIn(S2B)}><g${fadeOut(S2C)}>${pio(540, 1340, 2.05, { age: 'young', gloves: false, mood: 'worried', armL: 8, armR: 8 })}</g></g>`
    + `<g${fadeIn(S2C)}>${glow(760, 960, 300, 0.7)}${pio(540, 1340, 2.05, { age: 'young', gloves: false, mood: 'joy', armL: 12, armR: [62, 3, 3], propR: chalice(1.3) })}</g>`
    + motes(12, { y0: 620, y1: 1200, color: '#fff2c4', seed: 6 })
    + NEAR(foliage('l', 1650, { color: '#4a3a2a', seed: 4 }));
}

// 3 · the choir, September 1918: light from the crucifix; on sentence 2 the gloves appear. The wounds themselves are not drawn.
const S3B = 8.1;
function scene3() {
  return FAR(stoneRoom('#3a2c2c', '#443432'))
    + MID(choirStalls(1200) + floorAt(1200, '#2c2024', '#5a4640'))
    + `<g${M.in('fade', 0.8, 2.2)}>${rays(340, 800, { op: 0.14, speed: 1.6 })}${glow(340, 800, 560, 0.95)}</g>`
    + `<g transform="translate(340,1200)">${crucifix(1.32)}</g>`
    + `<g${M.in('fade', 2.6, 1.6)}>${beam(250, 430, 600, 880, 1230, 0.42)}</g>`
    + `<g${fadeOut(S3B)}>${pio(700, 1325, 2.0, { age: 'young', gloves: false, kneel: true, mood: 'surprised', armL: -18, armR: -18 })}</g>`
    + `<g${fadeIn(S3B)}>${pio(700, 1325, 2.0, { age: 'young', kneel: true, mood: 'peaceful', armL: -18, armR: -18 })}${sparkles(14, 560, 840, 980, 1300, { seed: 5, color: '#ffe9b0' })}</g>`
    + motes(20, { x0: 120, x1: 900, y0: 620, y1: 1200, color: '#ffe0a0', seed: 3 });
}

// 4 · the confessional: pilgrims arrive with numbered tickets
const S4B = 0.7, S4C = 5.0;
function scene4() {
  const queue = [[85, 0, 38], [890, 3, 39], [1000, 4, 40]];
  return FAR(stoneRoom('#4a3a38', '#544240'))
    + MID(floorAt(1180, '#3a2c2c', '#6a5650') + `<path d="M180 700 V560 Q250 480 320 560 V700Z M760 700 V560 Q830 480 900 560 V700Z" fill="#ffe2a8" opacity=".8"/>`)
    + `<g${M.in('fade', 0.2, 1.2)}>${glow(540, 860, 520, 0.6)}</g>`
    + confessionalBack(540, 1270, 1.08)
    + pio(540, 1262, 1.62, { age: 'mid', mood: 'happy', armL: 10, armR: 10, talk: [S4C, 999] })
    + confessionalFront(540, 1270, 1.08)
    + `<g${M.tw([{ at: 0.1, dur: 1.2, from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 } }])}>${villager(735, 1335, 1.35, 1, { kneel: true, mood: 'peaceful', armL: -18, armR: -18, flip: true })}</g>`
    + `<g${fadeIn(S4B, 0.9)}>${queue.map(([x, i, n]) => villager(x, 1340, 1.6, i, { mood: 'happy', flip: x > 540, armL: 10, armR: [24, 2, 2.6], propR: ticket(n, x > 540) })).join('')}${villager(205, 1345, 1.65, 1, { mood: 'happy', armL: 10, armR: [24, 2, 3], propR: ticket(37) })}</g>`
    + `<g${fadeIn(S4C, 0.8)}>${sparkles(16, 400, 680, 760, 1100, { seed: 11, color: '#fff2c4' })}</g>`
    + motes(14, { y0: 620, y1: 1200, color: '#ffe7b8', seed: 7 });
}

// 5 · silenced: a stern order and a private Mass; then a public Mass with people again (sentence 3)
const S5B = 0.5, S5C = 6.0;
function scene5() {
  return FAR(stoneRoom('#2c2a3a', '#343244'))
    + MID(floorAt(1200, '#20202c', '#4a4858') + `<g transform="translate(790,560)"><path d="M-54 150 V30 Q0 -40 54 30 V150Z" fill="#101428"/><path d="M-54 150 V30 Q0 -40 54 30 V150Z M0 -8 V150 M-54 70 H54" stroke="#4a4858" stroke-width="9" fill="none"/></g>`)
    + `<g${fadeIn(S5C, 1.2)}>${rays(790, 700, { op: 0.14 })}${glow(650, 880, 680, 0.95)}${beam(720, 860, 480, 900, 1300, 0.42)}</g>`
    + altar(650, 1205, 1.05)
    + `<g${fadeOut(S5C)}><g${fadeIn(S5B, 0.7)}>${person(190, 1330, 1.95, { kind: 'priest', mood: 'stern', hair: '#7a6a5c', beard: null, armL: 10, armR: [64, 2, 3], propR: scroll })}</g>${pio(650, 1330, 1.95, { age: 'mid', mood: 'sad', armL: 10, armR: 10 })}</g>`
    + `<g${fadeIn(S5C)}>${pio(650, 1330, 1.95, { age: 'mid', mood: 'happy', armL: 14, armR: [64, 2, 3], propR: chalice(1.3) })}${[[110, 0], [270, 1], [880, 2], [985, 3]].map(([x, i]) => villager(x, 1370, 1.3, i, { kneel: true, mood: 'peaceful', armL: -18, armR: -18, flip: x > 540 })).join('')}</g>`
    + motes(14, { y0: 620, y1: 1200, color: '#ffe7b8', seed: 3 });
}

// 6 · the hospital rises on sentence 2
const S6B = 3.0;
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
function scene6() {
  const nurse = person(720, 1340, 1.45, { kind: 'nun', top: '#3a5a8a', veil: '#3a5a8a', skin: SKINSET[2], mood: 'joy', flip: true, armL: 12, armR: [40, 2, 3] });
  const patient = person(885, 1345, 1.55, { kind: 'elder', top: '#8a7a9a', skin: SKINSET[1], mood: 'joy', flip: true, armL: 12, armR: [30, 2, 3], propR: `<rect x="-5" y="-6" width="10" height="130" rx="4" fill="#6a4a30"/>` });
  return FAR(sky(GOLDSKY) + sun(930, 500, 58, 300) + rays(930, 500, { op: 0.08 }))
    + BACK(clouds(560, { color: '#fff4e0', op: 0.6, seed: 12 }) + gargano(1120, '#a07c88', 3) + hill(1135, 22, '#8a9a62', 4))
    + `<g${M.in('grow', S6B, 1.7, 690, 1175)}>${hospital(690, 1175, 0.98)}</g>`
    + MID(olive(170, 1190, 1.0) + tree(1040, 1190, 0.55))
    + ground(1170, '#9aaa66', { rim: '#c4d08a' }) + tufts(1180, 12, '#6a7a42', { seed: 8 }) + flowers(1200, 1300, 12, { seed: 5 })
    + pio(310, 1345, 2.05, { age: 'old', mood: 'happy', talk: [0.5, S6B], armL: 10, armR: [120, 3, 3] })
    + nurse + patient
    + `<g${fadeIn(S6B + 1.7, 1)}>${sparkles(20, 360, 1020, 560, 1120, { seed: 8, color: '#fff2c4', size: 1.2 })}${petals(12, { seed: 7, colors: ['#ffffff', '#f2c46b'] })}</g>`
    + motes(12, { y0: 620, y1: 1240, color: '#fff2c4', seed: 5 })
    + NEAR(foliage('l', 1650, { color: '#4a5a2e', seed: 4 }));
}

// 7 · last Mass, then the light; bare, unmarked hands on sentence 3
const S7B = 5.3, S7C = 10.2;
function scene7() {
  return FAR(sky(SKIES.deep, { stars: 48, seed: 9 }) + rays(540, 640, { op: 0.09 }))
    + BACK(gargano(1110, '#3f3358', 7) + hill(1160, 24, '#33284a', 5))
    + MID(graceFriary(620, 1205, 0.6, { wall: '#6f6078', roof: '#3e3248', win: '#ffd98a' }))
    + ground(1225, '#3a2c4a', { rim: '#7a5a78' })
    + `<g${fadeOut(S7B)}>${stoneRoom('#3a3040', '#44384a', 1400)}${floorAt(1230)}${glow(540, 960, 560, 0.75)}${altar(540, 1235, 1.05)}${pio(540, 1350, 1.95, { age: 'old', mood: 'peaceful', armL: [125, 2, 3], armR: [125, 2, 3.4], propR: chalice(1.2) })}</g>`
    + `<g${fadeIn(S7B, 1.2)}>${beam(430, 650, 300, 780, 1340, 0.55)}${glow(540, 780, 520, 0.85)}</g>`
    + `<g${fadeIn(S7B, 1.2)}><g${fadeOut(S7C)}>${pio(540, 1285, 2.0, { age: 'old', halo: S7B + 0.8, mood: 'peaceful', armL: -18, armR: -18 })}</g></g>`
    + `<g${fadeIn(S7C)}>${pio(540, 1285, 2.0, { age: 'old', gloves: false, halo: true, mood: 'happy', armL: 62, armR: 62 })}${sparkles(24, 230, 850, 760, 1160, { seed: 2, color: '#fff2c4', size: 1.2 })}</g>`
    + motes(20, { x0: 260, x1: 820, y0: 500, y1: 1240, color: '#fff2c4', seed: 9, rise: 160 });
}

// 8 · 1948: the young Polish priest at the confessional; then St. Peter's Square, 2002
const S8B = 5.0, S8C = 8.2;
function scene8() {
  const banner = `<g transform="translate(540,450)"><g${M.in('grow', S8B + 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', S8B + 1.4, 0.8, 0, 300)}>${pio(0, 408, 1.1, { age: 'old', halo: true, mood: 'happy', armL: [30, 2, 3], armR: [34, 2, 3], propR: rosary() })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  const zucchetto = '<path d="M-30 -284 Q0 -306 30 -284 Q0 -292 -30 -284Z" fill="#fbf7ee"/>';
  const pope = person(850, 1330, 1.7, { kind: 'priest', top: '#f6f0e2', collar: false, beard: null, skin: SKIN.fair, hair: '#c4bcb0', mood: 'joy', armL: [18, 2, 3], armR: [120, 3, 2.6], propL: cross_staff(250), over: zucchetto });
  return FAR(sky(GOLDSKY) + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7))
    + BACK(clouds(860, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + basilica(540, 1180, 1.05, { color: '#3a2a40' }) + obelisk(190, 1190, 0.95))
    + banner
    + ground(1180, '#6a5468', { rim: '#a88a98' })
    + `<g${fadeIn(S8C, 1)}>${MID(followers(1340, 14, { color: '#241a2e' }))}</g>`
    + pope
    + `<g${fadeIn(S8C, 1)}>${MID(followers(1420, 12, { color: '#2e2238' }))}${petals(24, { seed: 4, colors: ['#ffffff', '#f2c46b', '#f2a0b0'] })}</g>`
    + `<g${fadeOut(S8B, 0.8)}>${stoneRoom('#4a3a38', '#544240', 1300)}${floorAt(1180, '#3a2c2c', '#6a5650')}${glow(540, 860, 520, 0.5)}${confessionalBack(540, 1270, 1.08)}${pio(540, 1262, 1.62, { age: 'mid', mood: 'happy', armL: 10, armR: 10 })}${confessionalFront(540, 1270, 1.08)}`
    + `${person(800, 1335, 1.45, { kind: 'priest', beard: null, hair: '#6a4e36', skin: SKIN.fair, mood: 'peaceful', kneel: true, flip: true, armL: -18, armR: -18 })}</g>`;
}

// 9 · feast day: portrait with children and the friary
function scene9() {
  const kids = [[110, '#4b8bc4', SK, false], [235, '#e2b448', SKIN.fair, true], [850, '#d8644e', '#a06a44', true], [975, '#6aa457', SKIN.priest, false]]
    .map(([x, top, skin, girl], i) => person(x, 1335, 1.2, { mood: 'joy', kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#a06a30' : '#2a1a10', pants: '#3a3a4a', armL: 14, armR: 14 })).join('');
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(600, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 6 }) + gargano(1170, '#5d4678', 4))
    + glow(540, 1040, 500, 0.8)
    + MID(graceFriary(610, 1240, 0.6, { wall: '#8a7088', roof: '#4a3858', win: '#ffd98a' }))
    + ground(1260, '#54364a', { rim: '#b87a80' }) + tufts(1266, 10, '#352236', { seed: 7 })
    + pio(540, 1310, 2.2, { age: 'old', halo: 0.3, mood: 'happy', armL: [30, 2, 3], armR: [34, 2, 3.4], propR: rosary() })
    + kids
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + petals(10, { seed: 3, colors: ['#ffe2a0', '#ffffff'] })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_padre_pio', name: 'St_Padre_Pio',
  voice: 'am_michael', speed: 1.0,
  thumb_hook: 'He hid his hands for fifty years', thumb_title: 'St. Padre Pio', thumb_shift: 0, thumb_t: 3,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1290, 'l']],
  fix: {
    'fɔːɹdʒˈaɪəni': 'fɔːɹdʒˈoʊnɛ',          // Forgione (for-JO-neh)
    'pˈaɪətɹɪlsˌɪnə': 'pjɛtɹɛltʃˈiːnə',    // Pietrelcina (pyeh-trel-CHEE-na)
    'mˈɔːɹkoʊn': 'mɔːɹkˈoʊnɛ',             // Morcone (mor-KO-neh)
    'kˈæpətʃˌɪnz': 'kˈæpjuːtʃˌɪnz',        // Capuchins
    'lˈaɪv ˈɔn': 'lˈɪv ˈɔn',               // live on (verb)
  },
  scenes: [
    { kicker: 'THE FRIAR OF PIETRELCINA', title: 'Padre Pio', art: scene0, cam: { move: 'push', amt: 0.07, ox: 400, oy: 950 },
      say: ['For fifty years, he hid his hands in gloves.', 'Crowds took numbered tickets to confess to him.', 'This is Saint Padre Pio.'] },
    { kicker: 'MAY 25, 1887 · PIETRELCINA', title: "A Farmer's Son", art: scene1, cam: 'pan-r',
      say: ['Francesco Forgione was born in 1887 in Pietrelcina, Italy, to a poor farm family.', 'He wanted to be a friar.'] },
    { kicker: '1903 · MORCONE', title: 'Brother Pio', art: scene2, cam: 'drift-l',
      say: ['In 1903, at 15, he joined the Capuchins at Morcone, and took the name Pio.', 'Illness sent him home, yet in 1910, he was ordained a priest.'] },
    { kicker: 'SEPT. 20, 1918 · SAN GIOVANNI', title: 'The Stigmata', art: scene3, cam: { move: 'tilt-up', amt: 0.07 },
      say: ['In September 1918, praying before a crucifix, he received the stigmata, wounds like those of Christ.', 'They stayed for fifty years, and he hid them with gloves.'] },
    { kicker: 'SAN GIOVANNI ROTONDO', title: 'The Confessional', art: scene4, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['Busloads of pilgrims came.', 'He heard confessions about ten hours a day.', 'Many said he knew details of their lives they had never mentioned.'] },
    { kicker: '1931 – 1933', title: 'Silenced', art: scene5, cam: 'drift-r',
      say: ['In 1931, the Holy See ordered him to stop everything except private Mass.', 'In 1933, Pope Pius XI reversed the ban, saying he had been badly informed.'] },
    { kicker: 'MAY 5, 1956', title: 'A Home for the Suffering', art: scene6, cam: 'pan-l',
      say: ['He wanted a hospital for the body and the soul.', 'Built with small gifts, his Home for the Relief of Suffering opened in 1956.', 'He called it the apple of his eye.'] },
    { kicker: 'SEPTEMBER 23, 1968', title: 'Home to God', art: scene7, cam: 'tilt-up',
      say: ['In September 1968, frail and tired, he said his last Mass.', 'He died the next morning, at 81, repeating the names Jesus and Mary.', 'His wounds of fifty years were gone.'] },
    { kicker: 'JUNE 16, 2002 · ROME', title: 'Canonized', art: scene8, cam: { move: 'pull', amt: 0.06, oy: 800 },
      say: ['In 1948, a young Polish priest came to him for confession.', 'That priest became John Paul II, and in 2002, before some 300,000 people, he declared Padre Pio a saint.'] },
    { kicker: 'FEAST DAY · SEPTEMBER 23', title: "Pray, Hope, Don't Worry", art: scene9, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['His feast day is September 23, and he is a patron of civil defense volunteers.', "His famous words live on: pray, hope, and don't worry.", 'Saint Padre Pio, pray for us.'] },
  ],
};
