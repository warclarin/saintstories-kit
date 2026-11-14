// Blessed Justo Takayama Ukon, "The Samurai of Christ" (one story: the lord who gave up his castle for Christ).
// Baptized "Justo" at about 12 (1564). A Christian daimyo; in 1587 the regent Toyotomi Hideyoshi ordered Christian lords
// to renounce the faith. Friends urged him to give in; he refused and gave up his land (Akashi castle) and rank.
// 26 years of exile in his own land (Kanazawa, under Maeda Toshiie). In 1614 the Tokugawa ban: he left Nagasaki on
// 8 Nov 1614 with about 300 Christians and was welcomed in Manila with honor (Dec 1614). Worn out by the voyage, he died
// of a fever about midnight on 3 Feb 1615; his Jesuit confessor recorded that he often said "I desire now to go to
// enjoy my Lord and Savior" (P. Pedro Morejon SJ, Relacion de la persecucion..., Mexico 1616). Beatified as a martyr
// on 7 Feb 2017 in Osaka (Cardinal Amato for Pope Francis). Feast February 3.
// Sources: Wikipedia "Takayama Ukon"; EWTN/CNA "Samurai martyr beatified in Japan" (2017); takayamaukon.com (Japanese
// bishops' write-up; Morejon's account of his death).
// Iconography: samurai robes with topknot, a sheathed katana held point-down with a crucifix hanging from it, palm.
// New (exported for later reels): ukon (samurai lord / exile / old), samurai (armored retainer), hideyoshi,
// swordCross (katana + crucifix), tenshu (Japanese castle keep), nobori (war banner), snowRoofs, sakura.
import { W, M, SKIES, SKIN, GOLD, CREAM, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers, petals,
  person, palm_frond, coconut, crowd, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { official, soldier, halberd, filipina, intramuros } from './lorenzo_ruiz.mjs';
import { decree, lantern } from './andrew_dung_lac.mjs';
import { sickbed } from './roch_dog.mjs';
import { crucifix } from './padre_pio.mjs';
import { ship } from '../art.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const swap = (a, b, at, dur = 0.45) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;
const walkIn = (at, dx, dur = 1.2) => M.tw([{ at, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const popIn = (at, dur = 0.6) => M.in('pop', at, dur);

// Line starts (s from scene start), from `node build.mjs stories/takayama_ukon_exile.mjs info`
const T = { s0b: 2.9, s0c: 5.57, s1b: 3.06, s2b: 3.2, s2c: 5.27, s3b: 4.11, s4b: 3.95, s5b: 4.05, s6b: 4.45, s7b: 2.61 };

// ---------------------------------------------------------------- people
const SKU = '#e2b48f', HAIRU = '#120d0a';
const kataginu = (c) => `<path d="M-37 -207 L-74 -216 L-48 -176 L-30 -120 L30 -120 L48 -176 L74 -216 L37 -207 L14 -120 L-14 -120Z" fill="${c}"/>`
  + `<path d="M37 -207 L74 -216 L48 -176 L30 -120 L14 -120Z" fill="${dark(c, 0.25)}" opacity=".6"/><path d="M-22 -120 h44 v108 h-44Z" fill="${dark(c, 0.15)}" opacity=".5"/>`;
const topknot = (c = HAIRU) => `<path d="M-34 -282 Q0 -300 34 -282 Q18 -290 0 -290 Q-18 -290 -34 -282Z" fill="#c9a07a" opacity=".9"/><rect x="-7" y="-318" width="14" height="30" rx="6" fill="${c}"/>`;
// a katana in its black scabbard worn through the sash at the left hip (only standing figures)
// eslint-disable-next-line no-unused-vars
const hipSword = '<g transform="translate(-30,-118) rotate(-14)"><rect x="-70" y="-5" width="150" height="10" rx="5" fill="#1a1418"/><rect x="80" y="-6" width="8" height="12" rx="2" fill="#c8a24a"/><rect x="88" y="-4" width="44" height="8" rx="3" fill="#3a2a2a"/></g>';
const sash = '<path d="M-42 -128 Q0 -118 42 -128 L44 -110 Q0 -100 -44 -110Z" fill="#d8c8a0"/>';
/** The katana held point-down in its scabbard with a crucifix hanging from the hilt (his traditional image). Hand at (0,0). */
export const swordCross = (s = 1) => `<g transform="scale(${s})"><rect x="-5" y="-40" width="10" height="44" rx="3" fill="#3a2a2a"/><path d="M-5 -36 h10 M-5 -26 h10 M-5 -16 h10" stroke="#c8a24a" stroke-width="2"/>`
  + '<ellipse cx="0" cy="8" rx="17" ry="5" fill="#c8a24a"/><rect x="-6" y="10" width="12" height="120" rx="5" fill="#1a1418"/><rect x="1" y="10" width="5" height="120" rx="2" fill="#3a3038" opacity=".8"/>'
  + `<path d="M-4 -4 Q-26 16 -32 40" stroke="${GOLD}" stroke-width="2.5" fill="none"/><g transform="translate(-32,64)"><circle r="34" fill="url(#haloGlow)" opacity=".9"/>`
  + `<path d="M0 -22 v46 M-14 -8 h28" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/><path d="M0 -14 v20 M-6 -6 h12" stroke="#fff4cc" stroke-width="2.5" stroke-linecap="round"/></g></g>`;
/** Justo Takayama Ukon. lord: dark kimono + winged kataginu, katana at the hip. plain: exile (plain kimono). old: grey hair, thin beard. */
export const ukon = (x, y, s, { lord = true, old = false, over = '', under = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, top: lord ? '#2a3350' : '#5a5048', skin: SKU, hair: old ? '#8a8580' : HAIRU, beard: old ? '#9a948c' : null, ...o,
  under, over: (lord ? kataginu('#3e5a8a') : '') + (o.sitting || o.kneel ? '' : sash) + topknot(old ? '#8a8580' : HAIRU) + over });
/** An armored samurai retainer: lacquered red armor bands, helmet with a gold crescent. */
export const samurai = (x, y, s, { armor = '#7a2a26', ...o } = {}) => person(x, y, s, {
  kind: 'layman', top: armor, pants: '#2a2228', skin: SKU, hair: HAIRU, beard: null, mood: 'determined', ...o,
  over: `<g stroke="${dark(armor, 0.35)}" stroke-width="3">${[-188, -170, -152, -134].map((yy) => `<path d="M-38 ${yy} H38"/>`).join('')}</g>`
    + `<path d="M-46 -214 Q-60 -196 -50 -178 L-30 -196Z M46 -214 Q60 -196 50 -178 L30 -196Z" fill="${dark(armor, 0.2)}"/>`
    + '<path d="M-46 -262 Q-46 -306 0 -308 Q46 -306 46 -262 Q30 -270 0 -270 Q-30 -270 -46 -262Z" fill="#22202a"/><path d="M-54 -262 Q-60 -240 -48 -226 L-38 -258Z M54 -262 Q60 -240 48 -226 L38 -258Z" fill="#22202a"/>'
    + `<path d="M-30 -300 Q-36 -340 -14 -354 Q-26 -330 -10 -308Z M30 -300 Q36 -340 14 -354 Q26 -330 10 -308Z" fill="${GOLD}"/>` + (o.over || '') });
/** Toyotomi Hideyoshi, the regent: red-and-gold court robe, tall black lacquered cap, thin moustache. */
export const hideyoshi = (x, y, s, o = {}) => person(x, y, s, {
  kind: 'royal', crown: false, robe: true, top: '#8a2a2a', skin: SKU, hair: HAIRU, beard: null, mood: 'stern', ...o,
  over: kataginu('#c8962e') + '<path d="M-12 -238 Q-6 -242 0 -238 Q6 -242 12 -238" stroke="#1a140f" stroke-width="3" fill="none"/>'
    + '<path d="M-30 -282 Q-38 -330 -14 -378 Q8 -372 22 -330 Q32 -300 30 -282Z" fill="#141014"/><path d="M-30 -284 Q0 -276 30 -284" stroke="#3a3240" stroke-width="4" fill="none"/>' + (o.over || '') });
const jesuit = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', collar: false, top: '#1e1b22', skin: SKIN.fair, hair: '#4a3424', beard: '#4a3424', ...o });
const boyUkon = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', top: '#3e5a8a', pants: '#2a2228', skin: SKU, hair: HAIRU, ...o });
const wife = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', girl: true, robe: true, top: '#7a3a4a', skin: SKU, hair: HAIRU, ...o });
const shellWater = '<g transform="translate(6,-10) rotate(-30)"><path d="M-16 0 Q0 -22 16 0 Q0 8 -16 0Z" fill="#f4e8d4"/><path d="M14 2 q8 14 2 30" stroke="#9ad0f0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/></g>';
const smallCross = `<g transform="translate(0,-18)"><circle r="40" fill="url(#haloGlow)"/><path d="M0 -34 v62 M-16 -16 h32" stroke="#6e4a2c" stroke-width="8" stroke-linecap="round"/><path d="M0 -24 v26 M-8 -14 h16" stroke="#f0d8b8" stroke-width="3.5" stroke-linecap="round"/></g>`;

// ---------------------------------------------------------------- set pieces
/** A Japanese castle keep (tenshu): stone base, three white storeys with dark curved roofs, gold roof fish. Feet at (x, y). */
export function tenshu(x, y, s = 1, { wall = '#f2ede2', roof = '#3a4050', stone = '#8a8478', lit = 0 } = {}) {
  const win = (wx, wy, n, gap) => Array.from({ length: n }, (_, i) => `<rect x="${wx + i * gap}" y="${wy}" width="16" height="22" rx="2" fill="${lit ? '#ffd27a' : dark(wall, 0.55)}"/>`).join('');
  const eave = (w, yb, h) => `<path d="M${-w - 46} ${yb + 4} Q${-w - 4} ${yb - 4} ${-w + 18} ${yb - h} L${w - 18} ${yb - h} Q${w + 4} ${yb - 4} ${w + 46} ${yb + 4} Q${w} ${yb - 10} 0 ${yb - 10} Q${-w} ${yb - 10} ${-w - 46} ${yb + 4}Z" fill="${roof}"/>`
    + `<path d="M0 ${yb - 10} Q${w} ${yb - 10} ${w + 46} ${yb + 4} Q${w + 4} ${yb - 4} ${w - 18} ${yb - h} L${w * 0.3} ${yb - h}Z" fill="${dark(roof, 0.3)}" opacity=".6"/>`;
  const gable = (yb, w) => `<path d="M${-w} ${yb} L0 ${yb - w * 0.7} L${w} ${yb}Z" fill="${roof}"/><path d="M${-w + 12} ${yb - 4} L0 ${yb - w * 0.7 + 12} L${w - 12} ${yb - 4}Z" fill="${wall}"/>`;
  let stones = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) stones += `<rect x="${-180 + r * 8 + c * 58 + (r % 2) * 26}" y="${-26 - r * 30}" width="${50 - r * 3}" height="24" rx="4" fill="${r % 2 ? light(stone, 0.08) : stone}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<path d="M-212 0 Q-190 -60 -168 -128 L168 -128 Q190 -60 212 0Z" fill="${dark(stone, 0.2)}"/>${stones}`
    + `<rect x="-150" y="-236" width="300" height="110" fill="${wall}"/><rect x="60" y="-236" width="90" height="110" fill="${dark(wall, 0.18)}"/>${win(-120, -200, 6, 46)}`
    + eave(150, -230, 46) + gable(-262, 60)
    + `<rect x="-108" y="-356" width="216" height="96" fill="${wall}"/><rect x="40" y="-356" width="68" height="96" fill="${dark(wall, 0.18)}"/>${win(-84, -326, 4, 48)}`
    + eave(108, -350, 40) + gable(-378, 44)
    + `<rect x="-70" y="-466" width="140" height="80" fill="${wall}"/><rect x="26" y="-466" width="44" height="80" fill="${dark(wall, 0.18)}"/>${win(-46, -440, 3, 38)}`
    + eave(70, -460, 44)
    + `<path d="M-60 -508 H60" stroke="${dark(roof, 0.3)}" stroke-width="8"/>`
    + `<path d="M-60 -510 q-14 -30 6 -40 q-2 18 10 26Z M60 -510 q14 -30 -6 -40 q2 18 -10 26Z" fill="${GOLD}"/>`
    + (lit ? glow(0, -320, 260, 0.35 * lit) : '') + '</g>';
}
/** A tall samurai war banner on a pole (nobori). */
export const nobori = (x, y, c = '#f6f0e2', mark = '#2a3350', s = 1, ph = 0) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-4" y="-420" width="8" height="420" fill="#3a2a20"/><rect x="-4" y="-420" width="70" height="8" fill="#3a2a20"/>`
  + `<g${M.sway(2.5, 2.2, ph, 0, -420)}><path d="M4 -412 h60 v300 h-60Z" fill="${c}"/><path d="M48 -412 h16 v300 h-16Z" fill="${dark(c, 0.15)}"/><circle cx="34" cy="-340" r="20" fill="none" stroke="${mark}" stroke-width="7"/><path d="M34 -300 v130" stroke="${mark}" stroke-width="6" opacity=".5"/></g></g>`;
/** A row of snowy Japanese house roofs (Kanazawa in winter). */
export function snowRoofs(x, y, s = 1, { wall = '#b8b0a4', roof = '#4a4e5e' } = {}) {
  const house = (hx, hy, k) => `<g transform="translate(${hx},${hy}) scale(${k})"><rect x="-58" y="-56" width="116" height="56" fill="${wall}"/><rect x="14" y="-56" width="44" height="56" fill="${dark(wall, 0.25)}" opacity=".7"/>`
    + `<path d="M-84 -50 Q-58 -60 -48 -96 L48 -96 Q58 -60 84 -50Z" fill="${roof}"/><path d="M-80 -54 Q-58 -64 -48 -98 L48 -98 Q58 -64 80 -54 Q40 -70 0 -70 Q-40 -70 -80 -54Z" fill="#f4f6fa"/>`
    + `<path d="M-36 -40 h28 v40 h-28Z" fill="#ffd27a" opacity=".85"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${house(-280, -30, 0.9)}${house(-80, -70, 0.8)}${house(120, -20, 1)}${house(320, -60, 0.85)}</g>`;
}
/** A blossoming cherry tree (sakura). */
export function sakura(x, y, s = 1, { seed = 3 } = {}) {
  let blooms = '';
  for (let i = 0; i < 16; i++) { const a = (i * 2.4 + seed) % 6.28, rr = 40 + ((i * 37 + seed * 11) % 90); blooms += `<circle cx="${Math.round(Math.cos(a) * rr * 1.3)}" cy="${Math.round(-320 + Math.sin(a) * rr * 0.7)}" r="${44 + (i % 3) * 10}" fill="${i % 3 ? '#f4b8c8' : '#f8d0dc'}"/>`; }
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-10 0 Q-20 -140 0 -260 M0 -200 Q60 -250 120 -280 M0 -220 Q-60 -260 -110 -300" stroke="#4a3030" stroke-width="22" fill="none" stroke-linecap="round"/>`
    + `<g${M.sway(1.5, 4, seed * 0.3, 0, -100)}>${blooms}</g></g>`;
}
const snow = (n, seed) => petals(n, { seed, colors: ['#ffffff', '#eef2f8'], y0: -100, y1: 1500, fall: 900 });
const sakuraPetals = (n, seed) => petals(n, { seed, colors: ['#f8c8d4', '#ffffff', '#f4a8bc'] });
const gravel = (y, c) => ground(y, c, { rim: light(c, 0.2) }) + `<path d="M-200 ${y + 120} H${W + 200}" stroke="${dark(c, 0.12)}" stroke-width="40" opacity=".4"/>`;

// ---------------------------------------------------------------- scenes
// 0 · hook (3D castle at dusk, push-fast): the samurai lord before his castle, katana and crucifix; his army; halo at his name
function scene0() {
  const B = T.s0b, C = T.s0c;
  return MID(gravel(1230, '#7a6a5a')
      + `<g${fadeIn(0.9, 0.7)}>${[60, 190].map((nx, i) => nobori(nx, 1240, '#f6f0e2', '#2a3350', 0.9, i * 0.4)).join('')}${nobori(990, 1240, '#f6f0e2', '#2a3350', 0.9, 0.8)}</g>`
      + `<g${walkIn(0.8, -120, 1.1)}>${samurai(110, 1290, 1.25, { armR: [20, 2, 3] })}${samurai(250, 1300, 1.2, { armor: '#6a2430' })}</g>`
      + `<g${walkIn(1.1, 120, 1.1)}>${samurai(860, 1290, 1.2, { flip: true, armor: '#6a2430' })}</g>`)
    + `<g${fadeIn(B, 0.8)}>${glow(470, 1050, 420, 0.5)}${rays(470, 1000, { op: 0.08 })}</g>`
    + swap(ukon(470, 1350, 2.35, { mood: 'determined', armL: 10, armR: [22, 2, 3], propR: swordCross(1.1) }),
      ukon(470, 1350, 2.35, { mood: 'happy', halo: true, armL: 10, armR: [22, 2, 3], propR: swordCross(1.1) }), C, 0.7)
    + motes(14, { x0: 200, x1: 900, y0: 700, y1: 1250, seed: 3, color: '#ffd8a0' })
    + NEAR(foliage('l', 1660, { color: '#1c2620' }) + foliage('r', 1650, { color: '#1c2620', seed: 6 }));
}

// 1 · baptized at twelve (Jesuit, shell of water) → 1587: Hideyoshi's order (pan-r)
function scene1() {
  const B = T.s1b;
  return FAR(sky([[0, '#5a6a9a'], [0.4, '#9ab0d0'], [0.7, '#e8dcc0'], [1, '#e8dcc0']]) + sun(820, 520, 50, 260) + clouds(420, { seed: 5, op: 0.7 }))
    + BACK(hill(1060, 50, '#7a8a7a', 3) + tenshu(860, 1100, 0.55))
    + MID(hill(1160, 18, '#9aa88a', 6) + `<g${fadeIn(B, 0.6)}>${sakura(120, 1220, 0.7, { seed: 2 })}</g>`)
    + gravel(1220, '#b8a888')
    + `<g${fadeOut(B, 0.5)}>${jesuit(300, 1330, 1.95, { mood: 'happy', armL: 10, armR: [72, 3, 2], propR: shellWater })}`
    + `${boyUkon(560, 1340, 1.5, { kneel: true, flip: true, mood: 'peaceful', armL: 30, armR: 30 })}${glow(520, 1100, 200, 0.5)}</g>`
    + `<g${fadeIn(B, 0.6)}>${hideyoshi(300, 1330, 2.1, { armL: 10, armR: [80, 3, 2], propR: decree })}</g>`
    + `<g${walkIn(B + 0.3, 200, 1)}>${ukon(780, 1340, 1.95, { flip: true, mood: 'surprised', armL: 12, armR: 12 })}</g>`
    + `<g${fadeIn(B + 2.6, 0.6)}>${ukon(780, 1340, 1.95, { flip: true, mood: 'worried', armL: 12, armR: 12 })}</g>`
    + sparkles(8, 160, 900, 700, 1100, { seed: 4 })
    + NEAR(foliage('r', 1660, { color: '#2a3a2a' }) + bokeh(4, { seed: 7, op: [0.2, 0.4] }));
}

// 2 · the choice (3D castle under storm clouds, dolly): friends beg him; "But Ukon chose Christ."; he leaves castle and rank
function scene2() {
  const B = T.s2b, C = T.s2c;
  return MID(gravel(1230, '#5a5458'))
    + `<g${fadeOut(B + 0.4, 0.6)}>${official(170, 1320, 1.75, { top: '#4a3a3a', mood: 'worried', armL: [30, 3, 1.6], armR: [70, 6, 1.2] })}`
    + `${official(900, 1320, 1.7, { top: '#3a4a3a', flip: true, mood: 'worried', armL: 14, armR: [74, 6, 1.3] })}</g>`
    + `<g${fadeOut(B, 0.4)}>${ukon(540, 1350, 2.3, { mood: 'worried', armL: 10, armR: 12 })}</g>`
    + `<g${fadeIn(B, 0.4)}><g${fadeOut(C, 0.6)}>${ukon(540, 1350, 2.3, { mood: 'determined', armL: 10, armR: [118, 3, 2.4], propR: swordCross(1.1) })}</g></g>`
    + `<g${fadeIn(C, 0.6)}>${ukon(540, 1350, 2.3, { lord: false, mood: 'peaceful', armL: 10, armR: [22, 2, 3], propR: swordCross(1.1) })}</g>`
    + `<g${fadeIn(B, 0.6)}>${glow(560, 900, 320, 0.7)}${beam(470, 650, 330, 790, 1350, 0.35)}${sparkles(10, 380, 720, 700, 1100, { seed: 6 })}</g>`
    + NEAR(foliage('l', 1660, { color: '#161a1c' }));
}

// 3 · twenty-six years of exile in his own land (Kanazawa snow, drift-l); "Then Japan banned the faith": an official posts the ban
function scene3() {
  const B = T.s3b;
  return FAR(sky([[0, '#3a4660'], [0.45, '#7a88a4'], [0.75, '#c8d0dc'], [1, '#c8d0dc']]))
    + BACK(hill(1040, 60, '#dfe4ec', 4) + hill(1100, 30, '#c8d0dc', 7))
    + MID(snowRoofs(560, 1170, 0.95))
    + ground(1210, '#e8ecf2', { rim: '#ffffff' })
    + `<g${fadeIn(0.8, 0.8)}>${wife(190, 1330, 1.7, { kneel: true, mood: 'peaceful', armL: 28, armR: 28 })}</g>`
    + swap(ukon(430, 1340, 2.1, { lord: false, old: true, kneel: true, mood: 'peaceful', armL: 26, armR: [40, 2, 3], propR: smallCross }),
      ukon(430, 1340, 2.1, { lord: false, old: true, kneel: true, flip: true, mood: 'worried', armL: 26, armR: [40, 2, 3], propR: smallCross }), B + 0.5)
    + `<g${walkIn(B, 220, 1)}>${official(850, 1330, 1.85, { flip: true, armL: 10, armR: [52, 3, 2], propR: decree })}</g>`
    + glow(430, 1080, 220, 0.35)
    + snow(26, 5);
}

// 4 · banished: the ship to Manila (3D tropical bay, pan-r); the city welcomes him with honor
function scene4() {
  const B = T.s4b;
  const deck = ukon(-40, -64, 0.62, { lord: false, old: true, mood: 'peaceful', armL: 10, armR: [22, 2, 3], propR: swordCross(0.9) })
    + wife(-150, -64, 0.55, { mood: 'happy' }) + person(70, -64, 0.5, { kind: 'layman', top: '#5a6a7a', skin: SKU, hair: HAIRU, beard: null, mood: 'happy' })
    + person(150, -64, 0.48, { kind: 'layman', girl: true, robe: true, top: '#6a5a3a', skin: SKU, hair: HAIRU, mood: 'happy' });
  const sail = M.tw([{ at: 0, dur: 9, from: { x: -150 }, to: { x: -30 }, ease: 'power1.out' }]);
  return `<g${sail}>${shipWithCrew(320, 1250, 0.85, deck)}</g>`
    + `<g${fadeIn(B, 0.7)}>${MID(`<path d="M640 1270 L1300 1270 L1300 1330 L640 1330Z" fill="#7a5a3e"/><path d="M640 1270 H1300" stroke="#a8804e" stroke-width="8"/>`
      + [690, 760, 830, 900].map((px) => `<rect x="${px}" y="1270" width="14" height="110" fill="#5a3e28"/>`).join(''))}`
    + `${soldier(690, 1280, 1.05, { flip: true, mood: 'happy', armL: 10, armR: [24, 2, 3], propR: halberd })}`
    + `${filipina(830, 1280, 1.0, { mood: 'joy', armL: 10, armR: [140, 10, 1.1] })}</g>`
    + `<g${fadeIn(B + 0.3, 1)}>${sparkles(12, 600, 940, 950, 1200, { seed: 8 })}</g>`;
}
// Ship with people standing on deck: the hull is redrawn in front so feet sit behind the rail (from lorenzo_ruiz.mjs)
function shipWithCrew(x, y, s, people) {
  return ship(x, y, s, { crew: false })
    + `<g transform="translate(${x},${y}) scale(${s})"><g${M.sway(2, 5, 0, 0, 0)}><g${M.bob(8, 4.4)}>${people}`
    + '<path d="M-330 -60 L-300 -60 L-280 -40 L-260 -60 L250 -60 Q300 -90 330 -112 L300 40 Q0 70 -290 40 Z" fill="#6b4226"/><path d="M-310 -2 Q0 22 312 -24 L300 40 Q0 70 -290 40 Z" fill="#4e2f1a"/>'
    + '<path d="M-320 -24 Q0 -2 316 -44" stroke="#8a5a34" stroke-width="10" fill="none"/><path d="M-320 -50 L250 -50" stroke="#a8743f" stroke-width="5"/></g></g></g>';
}

// 5 · his death in Manila (tilt-up + rack focus): worn out, a fever; "Now I want to go and enjoy my Lord and Savior."
function scene5() {
  const B = T.s5b;
  return FAR(`<rect x="-200" y="-200" width="${W + 400}" height="2400" fill="#c8a882"/>` + glow(540, 760, 520, 0.45))
    + BACK(`<rect x="620" y="560" width="300" height="380" rx="10" fill="#f8e4b0"/><rect x="620" y="560" width="300" height="380" rx="10" fill="url(#sunGlow)" opacity=".8"/>`
      + coconut(720, 940, 0.55, { lean: 20 }) + coconut(860, 960, 0.45, { flip: true, lean: 24 })
      + '<path d="M614 556 h312 v390 h-312Z M770 556 v390 M614 750 h312" stroke="#7a5a3e" stroke-width="14" fill="none"/>'
      + `<g transform="translate(300,860) scale(0.5)">${crucifix(1)}</g>`)
    + MID(`<rect x="-200" y="1180" width="${W + 400}" height="900" fill="#8a6a4a"/><path d="M-200 1180 H${W + 200}" stroke="#a8845a" stroke-width="10"/>`)
    + `<g${fadeIn(B, 1)}>${beam(600, 940, 380, 760, 1360, 0.4)}${sparkles(12, 360, 860, 800, 1200, { seed: 9 })}</g>`
    + sickbed(520, 1320, 1.75, { blanket: '#3e5a8a', skin: SKU, hair: '#8a8580' })
    + `<g${fadeIn(B + 0.2, 1.2)}>${glow(350, 1130, 180, 0.6)}</g>`
    + jesuit(860, 1350, 1.8, { kneel: true, flip: true, mood: 'peaceful', armL: 28, armR: [60, 2, 3], propR: smallCross })
    + `<g${fadeIn(2.0, 0.8)}>${wife(160, 1350, 1.7, { kneel: true, mood: 'sad', armL: 28, armR: 28 })}</g>`
    + motes(10, { y0: 700, y1: 1200, seed: 4 });
}

// 6 · 2017, Osaka: declared a Blessed martyr (pull reveal: the crowd with lanterns); the quotable line
function scene6() {
  const B = T.s6b;
  return FAR(sky([[0, '#2a2a5a'], [0.4, '#6a4a7a'], [0.66, '#e8906a'], [1, '#f8c87a']], { stars: 20, seed: 4 }) + rays(540, 800, { op: 0.12 }))
    + BACK(hill(1080, 40, '#4a3a5a', 3) + `<g${fadeOut(B, 1)}>${tenshu(180, 1110, 0.5, { wall: '#c8bcc0', roof: '#3a3048', lit: 1 })}</g>`
      + `<g${fadeIn(B, 1)}>${tenshu(180, 1110, 0.5, { wall: '#8a8090', roof: '#2a2434', stone: '#5a5460' })}</g>`)
    + MID(crowd(1260, 11, { color: '#2a2034', flags: [['#f6f0e2', '#f6f0e2', '#f2c46b']] })
      + [[260, 1040, 0], [540, 1000, 0.6], [820, 1040, 1.2]].map(([lx, ly, d]) => `<g transform="translate(${lx},${ly})"${M.in('fade', d, 1)}><g${M.sway(4, 3.2, d, 0, -70)}>${lantern('#d8404e', 0.9)}</g></g>`).join(''))
    + ground(1290, '#3a2e44', { rim: '#6a5a74' })
    + glow(560, 940, 420, 0.8)
    + ukon(560, 1370, 2.25, { halo: 0.4, mood: 'happy', armL: [118, 2, 3], propL: palm_frond(1.1, -18), armR: [22, 2, 3], propR: swordCross(1.1) })
    + `<g${fadeIn(B, 1)}>${sparkles(14, 300, 820, 600, 1100, { seed: 11 })}</g>`
    + NEAR(bokeh(7, { seed: 12 }));
}

// 7 · feast portrait (arc): cherry blossom (Japan) and coconut palm (Philippines), halo, katana with crucifix
function scene7() {
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + sun(540, 900, 80, 520) + rays(540, 900, { op: 0.1 }))
    + BACK(hill(1080, 50, '#c88a6a', 2) + tenshu(840, 1110, 0.4, { wall: '#f4e4d4', roof: '#7a5a5a' }) + intramuros(1120, { wall: '#b8907a', roof: '#9a5a46', dome: '#8a6a6a' }).replace(/^/, '<g transform="translate(-520,0) scale(0.9)">') + '</g>')
    + MID(sakura(110, 1250, 0.95, { seed: 5 }) + coconut(1000, 1260, 0.9, { flip: true, lean: 24 }))
    + ground(1240, '#b89a74', { rim: '#d8bc94' }) + flowers(1250, 1330, 10, { seed: 6, colors: ['#f6d36b', '#ffffff', '#f4b8c8'] })
    + glow(540, 920, 460, 0.9)
    + ukon(540, 1350, 2.3, { halo: true, mood: 'happy', armL: [118, 2, 3], propL: palm_frond(1.1, -18), armR: [22, 2, 3], propR: swordCross(1.1) })
    + sakuraPetals(16, 15)
    + NEAR(bokeh(7, { seed: 19 }));
}

export const STORY = {
  slug: 'bl_justo_takayama_ukon_exile', name: 'Bl_Justo_Takayama_Ukon_Samurai_of_Christ',
  bg3d: './takayama_ukon_exile.bg3d.js', bg3d_vars: { dimAt: 5.6 },
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'santo.bg3d.js': './santo_nino_cebu.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { ukon: { voice: 'jm_kumo', speed: 0.9 } },
  thumb_hook: 'He gave up his castle for Christ', thumb_title: 'Bl. Justo Takayama Ukon', thumb_scene: 7, thumb_t: 3, thumb_shift: -60,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 760, 'l']],
  fix: {
    'blˈɛst dʒˈʌstoʊ': 'blˈɛsɪd hˈuːstoʊ',  // Blessed Justo -> BLESS-id HOO-stoh
    'blˈɛst mˈɑːɹɾɚ': 'blˈɛsɪd mˈɑːɹɾɚ',     // a Blessed martyr
    'tˌækeɪˈɑːmə': 'tɑːkɑːjˈɑːmɑː',          // Takayama -> tah-kah-YAH-mah
    'jˈuːkən': 'ˈuːkɔn',                     // Ukon -> OO-kohn
    'haɪdjˈoʊʃi': 'hiːdeɪjˈoʊʃiː',           // Hideyoshi -> hee-day-YOH-shee
    'fˈɛbɹuːˌɛɹi θɹˈiː': 'fˈɛbɹuːˌɛɹi θˈɜːd', // February 3 -> February third
  },
  scenes: [
    { kicker: 'THE SAMURAI OF CHRIST', title: 'Castle or Christ?', art: scene0, bg3d: 'castleDusk', cam: { move: 'push-fast', oy: 1100 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['A samurai lord with a castle and an army.', 'Told to deny Christ, he gave it all up.', 'This is Blessed Justo Takayama Ukon.'] },
    { kicker: '1564 – 1587 · JAPAN', title: 'The Order', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Baptized at twelve, he became a Christian lord.', 'In 1587, the ruler Hideyoshi gave an order: give up your faith, or lose everything.'] },
    { kicker: '1587 · AKASHI', title: 'He Chose Christ', art: scene2, bg3d: 'castleStorm', cam: { move: 'dolly', amt: 0.08, ox: 540, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['His friends begged him to give in.', { text: 'But Ukon chose Christ.', beat: 0.9, speed: 0.85 }, 'He gave up his castle, his lands and his rank.'] },
    { kicker: '1588 – 1614 · KANAZAWA', title: 'Exile at Home', art: scene3, cam: 'drift-l',
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['For twenty-six years, he lived in exile in his own land.', 'Then Japan banned the faith.'] },
    { kicker: 'DECEMBER 1614 · MANILA', title: 'Banished', art: scene4, bg3d: 'manilaBay', cam: 'pan-r',
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['With 300 Christians, he was put on a ship to Manila,', 'where he was welcomed with honor.'] },
    { kicker: 'FEBRUARY 3, 1615 · MANILA', title: 'Home to His Lord', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['But the voyage broke his health. As fever took him, he said:', { text: 'Now I want to go and enjoy my Lord and Savior.', who: 'ukon' }] },
    { kicker: '2017 · OSAKA', title: 'Blessed Martyr', art: scene6, cam: 'pull',
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['In 2017, the Church declared him a Blessed martyr.', 'He gave up a castle on earth, and gained a kingdom in heaven.'] },
    { kicker: 'FEAST · FEBRUARY 3', title: 'Blessed Justo', art: scene7, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is February 3.', 'Blessed Justo Takayama Ukon, pray for us.'] },
  ],
};
