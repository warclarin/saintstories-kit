// St. Martin of Tours (feast: November 11). Horse, Roman soldier, red cloak, goose and Loire pieces are exported for later reels.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, butterflies, person, book, crowd, ground, dark, light, rng, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { mitre, cope, stole, flyer, tree, assisi, smallCross } from './francis.mjs';
import { sword, gothic } from './joan_of_arc.mjs';

const SKT = '#efc6a2', HAIRT = '#5a3a24', GREY = '#c9c2b8';
export const CLOAK = '#c8323a', BRONZE = '#c99a4a';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const snow = (n, seed = 3) => petals(n, { seed, colors: ['#ffffff', '#e8eef8', '#ffffff'], y0: -200, y1: 1100, fall: 600 });

// ---------------------------------------------------------------- Roman soldier pieces
export const cloakBack = `<path d="M-40 -212 Q-86 -120 -80 -24 Q0 -8 80 -24 Q86 -120 40 -212Z" fill="${CLOAK}"/><path d="M40 -212 Q86 -120 80 -24 L56 -20 Q62 -120 26 -206Z" fill="#9a2430" opacity=".7"/>`;
export const cloakFront = `<path d="M-42 -210 Q-54 -160 -48 -108 L-30 -114 Q-34 -160 -22 -210Z" fill="${CLOAK}"/><path d="M-36 -200 Q-44 -160 -40 -116" stroke="#e25a62" stroke-width="3" fill="none" opacity=".6"/><circle cx="-30" cy="-204" r="7" fill="${GOLD}"/>`;
export const cuirass = `<path d="M-37 -207 Q0 -218 37 -207 L41 -112 Q0 -102 -41 -112Z" fill="${BRONZE}"/><path d="M13 -212 L37 -207 L41 -112 L19 -106Z" fill="${dark(BRONZE, 0.3)}" opacity=".5"/>`
  + `<path d="M-22 -180 Q-10 -168 0 -180 Q10 -168 22 -180" stroke="${light(BRONZE, 0.3)}" stroke-width="3" fill="none"/><path d="M-30 -132 Q0 -124 30 -132" stroke="${dark(BRONZE, 0.25)}" stroke-width="3" fill="none"/>`
  + [-34, -20, -6, 8, 22].map((x) => `<rect x="${x}" y="-114" width="12" height="38" rx="3" fill="#7a4a2a"/>`).join('');
export const romanHelmet = `<path d="M-44 -256 Q-44 -308 0 -310 Q44 -308 44 -256 L38 -250 L-38 -250Z" fill="${BRONZE}"/><path d="M8 -306 Q40 -300 44 -256 L38 -250 L20 -250Z" fill="${dark(BRONZE, 0.25)}" opacity=".6"/>`
  + `<path d="M-44 -258 H44" stroke="${dark(BRONZE, 0.3)}" stroke-width="4"/><path d="M-40 -252 v30 M40 -252 v30" stroke="${BRONZE}" stroke-width="7" stroke-linecap="round"/>`
  + `<rect x="-5" y="-326" width="10" height="20" fill="${dark(BRONZE, 0.2)}"/><path d="M-40 -318 Q0 -366 40 -318 L30 -310 Q0 -344 -30 -310Z" fill="${CLOAK}"/><path d="M-20 -338 Q0 -352 20 -338" stroke="#e25a62" stroke-width="3" fill="none"/>`;
export const roman = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#d8c8a8', pants: '#7a5a3a', skin: SKIN.priest, hair: '#3a2a1e', beard: null,
  under: cloakBack, ...o, over: cuirass + cloakFront + (o.helmet === false ? '' : romanHelmet) + (o.over || '') });
const soldierMartin = (x, y, s, o = {}) => roman(x, y, s, { skin: SKT, hair: HAIRT, ...o });
const halfCloakProp = `<path d="M-6 0 Q-30 40 -18 120 L22 112 Q14 46 12 0Z" fill="${CLOAK}"/><path d="M8 4 Q14 50 20 110 L6 114 Q2 50 -2 4Z" fill="#9a2430" opacity=".55"/>`;
const ragPatches = '<rect x="-24" y="-180" width="14" height="12" fill="#6a5a46"/><rect x="10" y="-140" width="16" height="12" fill="#a08a6a"/>';
const sash = `<path d="M-44 -212 Q-30 -150 20 -96 L42 -110 Q0 -150 -20 -212Z" fill="${CLOAK}"/><path d="M-46 -210 Q-62 -140 -50 -60 L-30 -64 Q-40 -140 -28 -210Z" fill="#9a2430"/><circle cx="-34" cy="-206" r="7" fill="${GOLD}"/>`;
const halfCloakOn = `<path d="M-44 -212 Q-58 -150 -46 -90 L44 -96 Q50 -150 40 -212 Q0 -224 -44 -212Z" fill="${CLOAK}"/><path d="M20 -214 Q46 -206 40 -150 L44 -96 L26 -94 Q32 -150 12 -210Z" fill="#9a2430" opacity=".6"/>`;
const beggar = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#8a7a66', pants: '#6a5a4a', skin: '#d9a47e', hair: GREY, beard: GREY, sitting: true, ...o, over: ragPatches + (o.over || '') });

// Monk / bishop Martin
const monkMartin = (x, y, s, o = {}) => person(x, y, s, { kind: 'friar', top: '#5a4e44', cord: false, skin: SKT, hair: HAIRT, beard: HAIRT, ...o });
const bishopMartin = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', top: '#f2ead8', collar: false, skin: SKT, hair: GREY, beard: GREY, under: cope, ...o, over: stole + mitre + (o.over || '') });
export const crozier = `<g><rect x="-5" y="-250" width="10" height="300" rx="4" fill="${GOLD}"/><rect x="1" y="-250" width="4" height="300" fill="#b08a3a" opacity=".6"/>`
  + `<path d="M0 -248 Q-2 -312 38 -312 Q68 -308 62 -280 Q56 -258 34 -268" stroke="${GOLD}" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
const candle = `<g><rect x="-5" y="-30" width="10" height="34" rx="3" fill="#fbf6ea"/><circle cy="-38" r="16" fill="url(#sunGlow)"/><ellipse cy="-38" rx="4" ry="7" fill="#ffd98a"${M.flick(0.6, 0, 0.6)}/></g>`;

// ---------------------------------------------------------------- set pieces
// Horse (side view, facing right; hooves at y=0, back at about y=-215). flip faces left.
export function horse(x, y, s = 1, { c = '#f2ece0', mane = '#d9cfbf', cloth = CLOAK, flip = false, walk = false, ph = 0 } = {}) {
  const sh = dark(c, 0.2);
  const leg = (lx, p, back) => `<g transform="translate(${lx},-160)"><g${walk ? M.sway(12, 1.3, p, 0, 0) : ''}><rect x="-12" y="0" width="24" height="152" rx="11" fill="${back ? sh : c}"/><rect x="-13" y="140" width="26" height="20" rx="6" fill="#3a2a20"/></g></g>`;
  return `<g transform="translate(${f(x)},${f(y)}) scale(${f(flip ? -s : s)},${f(s)})"><ellipse cx="0" cy="2" rx="170" ry="16" fill="#1a0f1a" opacity=".22" filter="url(#soft)"/>`
    + `<g${M.bob(2.5, 2.4 + ph, ph)}>`
    + leg(-70, ph, true) + leg(100, ph + 0.65, true)
    + `<g transform="translate(-118,-188)"><g${M.sway(8, 2.2, ph, 0, 0)}><path d="M0 0 Q-40 50 -30 130" stroke="${mane}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M-4 10 Q-34 56 -26 120" stroke="${dark(mane, 0.2)}" stroke-width="8" fill="none" opacity=".6"/></g></g>`
    + `<ellipse cx="0" cy="-168" rx="128" ry="64" fill="${c}"/><ellipse cx="6" cy="-138" rx="110" ry="30" fill="${sh}" opacity=".5"/>`
    + `<path d="M70 -206 Q112 -262 130 -310 L180 -296 Q160 -236 128 -150 Z" fill="${c}"/>`
    + `<g transform="translate(176,-284) rotate(42)"><ellipse rx="58" ry="30" fill="${c}"/><ellipse cx="44" cy="2" rx="22" ry="24" fill="${light(c, 0.2)}"/><circle cx="54" cy="-6" r="4" fill="${dark(c, 0.5)}"/></g>`
    + `<path d="M150 -322 L146 -352 L166 -330Z M166 -318 L170 -348 L182 -322Z" fill="${c}"/>`
    + `<g data-blink="${f(ph * 2 + 0.4)} 172 -298"><ellipse cx="172" cy="-298" rx="5.5" ry="7" fill="#2b1d14"/><circle cx="170.5" cy="-300.5" r="2" fill="#fff"/></g>`
    + `<path d="M128 -318 Q100 -280 70 -214" stroke="${mane}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M134 -326 Q148 -340 160 -328" stroke="${mane}" stroke-width="14" fill="none" stroke-linecap="round"/>`
    + `<path d="M-62 -222 Q-6 -236 56 -220 L62 -150 Q0 -138 -70 -150Z" fill="${cloth}"/><path d="M-62 -222 Q-6 -236 56 -220" stroke="${GOLD}" stroke-width="6" fill="none"/><path d="M-70 -150 Q0 -138 62 -150" stroke="${GOLD}" stroke-width="6" fill="none"/>`
    + `<path d="M150 -280 Q120 -230 74 -214" stroke="#6b4a2a" stroke-width="4" fill="none"/>`
    + leg(-96, ph + 0.3, false) + leg(80, ph + 0.95, false)
    + '</g></g>';
}
// Rider seated on a horse made with horse(x, y, hs): pass the same x/y/hs plus the rider's scale
export const rider = (fn, x, y, hs, ps, o = {}) => fn(x - 10 * hs, y - 218 * hs + 44 * ps, ps, { sitting: true, ...o });

// Fortified Roman town gate (Amiens) with walls running across the frame
export function gate(x, y, s = 1, { wall = '#7a7a96', shade = 0.22, win = null } = {}) {
  const tw = (tx) => `<rect x="${tx - 70}" y="-420" width="140" height="420" fill="${light(wall, 0.05)}"/><rect x="${tx + 20}" y="-420" width="50" height="420" fill="${dark(wall, shade)}" opacity=".55"/>`
    + [0, 1, 2].map((k) => `<rect x="${tx - 70 + k * 52}" y="-446" width="36" height="28" fill="${light(wall, 0.05)}"/>`).join('')
    + `<rect x="${tx - 12}" y="-340" width="24" height="44" rx="11" fill="${win || dark(wall, 0.5)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-900" y="-280" width="1800" height="280" fill="${wall}"/>`
    + Array.from({ length: 30 }, (_, i) => `<rect x="${-900 + i * 62}" y="-302" width="34" height="24" fill="${wall}"/>`).join('')
    + `<rect x="-900" y="-280" width="1800" height="280" fill="${dark(wall, shade)}" opacity=".2"/>`
    + `<rect x="-120" y="-330" width="240" height="330" fill="${light(wall, 0.08)}"/><path d="M-70 0 V-150 A70 70 0 0 1 70 -150 V0Z" fill="${dark(wall, 0.55)}"/>`
    + `<path d="M-84 -150 A84 84 0 0 1 84 -150" stroke="${dark(wall, 0.25)}" stroke-width="12" fill="none"/>` + tw(-190) + tw(190) + '</g>';
}
export function tent(x, y, s = 1, c = '#d9c8a4') {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-110 0 L0 -150 L110 0Z" fill="${c}"/><path d="M0 -150 L110 0 L40 0Z" fill="${dark(c, 0.2)}"/><path d="M-20 0 L0 -90 L20 0Z" fill="${dark(c, 0.5)}"/><path d="M0 -150 v-30" stroke="#6b4a2a" stroke-width="5"/>`
    + `<g transform="translate(0,-178)"><g${M.sway(8, 1.4, x % 2)}><path d="M0 0 L34 8 L0 16Z" fill="${CLOAK}"/></g></g></g>`;
}
export function stoneHut(x, y, s = 1, { wall = '#b8aa92', roof = '#8a6a3a' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-70 0 V-90 Q0 -110 70 -90 V0Z" fill="${wall}"/><path d="M20 -100 Q50 -96 70 -90 V0 H30Z" fill="${dark(wall, 0.2)}" opacity=".6"/>`
    + `<path d="M-90 -88 L0 -190 L90 -88Z" fill="${roof}"/><path d="M0 -190 L90 -88 L30 -88Z" fill="${dark(roof, 0.25)}"/><path d="M-20 0 V-46 A20 20 0 0 1 20 -46 V0Z" fill="${dark(wall, 0.55)}"/></g>`;
}
export function barn(x, y, s = 1, { wall = '#9a6a42', roof = '#5a3a2e' } = {}) {
  let planks = '';
  for (let i = 0; i < 12; i++) planks += `<path d="M${-180 + i * 32} -230 V0" stroke="${dark(wall, 0.18)}" stroke-width="3"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-190" y="-240" width="380" height="240" fill="${wall}"/>${planks}<rect x="80" y="-240" width="110" height="240" fill="${dark(wall, 0.2)}" opacity=".5"/>`
    + `<path d="M-220 -236 L0 -360 L220 -236Z" fill="${roof}"/><path d="M0 -360 L220 -236 L80 -236Z" fill="${dark(roof, 0.25)}"/><rect x="-30" y="-320" width="60" height="44" fill="${dark(wall, 0.5)}"/>`
    + `<rect x="-90" y="-190" width="180" height="190" fill="#2a1a14"/><path d="M-90 -190 L90 0 M90 -190 L-90 0" stroke="${light(wall, 0.15)}" stroke-width="8" opacity="0"/>`
    + `<rect x="-98" y="-198" width="196" height="12" fill="${light(wall, 0.12)}"/><rect x="-98" y="-198" width="12" height="198" fill="${light(wall, 0.12)}"/><rect x="86" y="-198" width="12" height="198" fill="${light(wall, 0.12)}"/></g>`;
}
export function romChurch(x, y, s = 1, { wall = '#d9c8a8', roof = '#6a5a6a', win = '#ffd98a', shade = 0.2 } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-200" y="-170" width="300" height="170" fill="${wall}"/><path d="M-215 -170 L-50 -250 L115 -170Z" fill="${roof}"/>`
    + `<rect x="100" y="-330" width="110" height="330" fill="${light(wall, 0.06)}"/><rect x="170" y="-330" width="40" height="330" fill="${dark(wall, shade)}" opacity=".5"/><path d="M90 -330 L155 -400 L220 -330Z" fill="${roof}"/>`
    + `<path d="M155 -400 v-40 M140 -426 h30" stroke="${GOLD}" stroke-width="6"/>`
    + [-150, -80, -10].map((wx) => `<rect x="${wx}" y="-130" width="24" height="44" rx="12" fill="${win}" opacity=".85"/>`).join('')
    + `<rect x="140" y="-280" width="30" height="48" rx="15" fill="${win}" opacity=".85"/><path d="M130 0 V-70 A25 25 0 0 1 180 -70 V0Z" fill="${dark(wall, 0.5)}"/></g>`;
}
export function goose(x, y, s = 1, { flip = false, ph = 0, honk = false } = {}) {
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="2" rx="42" ry="8" fill="#1a0f1a" opacity=".18" filter="url(#soft)"/><g${M.bob(3, 0.9 + ph, ph)}>`
    + `<path d="M-8 0 v-20 M8 0 v-20" stroke="#e2903a" stroke-width="5"/><path d="M-16 0 h14 M2 0 h14" stroke="#e2903a" stroke-width="5" stroke-linecap="round"/>`
    + `<path d="M-40 -44 L-64 -60 L-50 -32Z" fill="#e2dccf"/><ellipse cx="0" cy="-42" rx="46" ry="27" fill="#f6f2ea"/><ellipse cx="-8" cy="-38" rx="28" ry="15" fill="#e2dccf"/>`
    + `<g${honk ? M.sway(9, 0.7, ph, 30, -52) : ''}><path d="M30 -52 Q42 -92 36 -116" stroke="#f6f2ea" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="40" cy="-120" r="16" fill="#f6f2ea"/>`
    + `<path d="M53 -126 L74 -119 L53 -111Z" fill="#e2903a"/>${honk ? `<path d="M53 -118 L70 -112 L53 -108Z" fill="#c4702a"/>` : ''}<circle cx="44" cy="-124" r="2.8" fill="#2b1d14"/><circle cx="43" cy="-125" r="1" fill="#fff"/></g></g></g>`;
}
// Loire river boat carrying the saint's bier
export function boat(x, y, s = 1) {
  const rowers = [-150, 150].map((rx, i) => person(rx, -40, 0.55, { kind: 'friar', top: '#5a4e44', cord: false, skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424', mood: 'sad', armL: [40, 10, 2, ], armR: [40, 10, 2.2], flip: i === 1 })).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><g${M.bob(6, 3.6)}>${rowers}`
    + `<rect x="-90" y="-110" width="180" height="70" rx="12" fill="#f4ead2"/><rect x="-90" y="-110" width="180" height="20" rx="8" fill="${GOLD}"/><path d="M0 -150 v40 M-16 -136 h32" stroke="${GOLD}" stroke-width="7"/>`
    + `<path d="M-280 -40 L280 -40 Q260 20 200 30 L-200 30 Q-260 20 -280 -40Z" fill="#6b4226"/><path d="M-262 -10 L262 -10" stroke="#8a5a34" stroke-width="8"/>`
    + `<g transform="translate(-230,-50)">${candle}</g><g transform="translate(230,-50)">${candle}</g></g></g>`;
}

// ---------------------------------------------------------------- scenes
// 0 · hook: the soldier on his white horse, snowy night
function scene0() {
  const hx = 520, hy = 1330, hs = 1.45;
  return FAR(sky(SKIES.night, { stars: 34, seed: 7 }) + glow(540, 900, 540, 0.55))
    + BACK(clouds(560, { color: '#8a90b8', op: 0.45, drift: 30, seed: 4 }) + gate(540, 1180, 1.0, { wall: '#4a4a6a', win: '#ffd98a' }))
    + ground(1250, '#d6dcec', { rim: '#ffffff' }) + tufts(1256, 8, '#aab4c8', { seed: 3 })
    + `<ellipse cx="540" cy="1262" rx="300" ry="40" fill="#ffd98a" opacity=".25" filter="url(#blur14)"/>`
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${horse(hx, hy, hs)}${rider(soldierMartin, hx, hy, hs, 1.75, { mood: 'happy', halo: 0.8, armL: [20, 2, 3], armR: [32, 2, 3.4], propR: sword })}</g>`
    + snow(26, 5) + motes(10, { y0: 560, y1: 1200, seed: 2 })
    + NEAR(foliage('l', 1640, { color: '#1a1a2e', seed: 6 }) + foliage('r', 1660, { color: '#1a1a2e', seed: 1 }));
}

// 1 · born c. 316 in Pannonia; catechumen at ten; army at fifteen
function scene1() {
  return FAR(sky(SKIES.day) + sun(860, 540, 54, 250))
    + BACK(clouds(460, { seed: 6 }) + hill(1040, 40, '#a8c9b0', 3) + assisi(560, 1120, 0.9, { hillC: '#9cbf80' }))
    + MID(tree(80, 1260, 0.62, '#5a9a4a') + hill(1200, 14, '#86b86a', 5))
    + ground(1240, '#9ac46e', { rim: '#b8e08e' }) + tufts(1246, 10, '#6aa457', { seed: 4 })
    + roman(330, 1320, 1.75, { mood: 'happy', helmet: false, beard: '#3a2a1e', armL: 10, armR: [30, 3, 3], propR: sword })
    + person(610, 1325, 1.3, { kind: 'kid', top: '#e2d6b8', pants: '#8a6a4a', skin: SKT, hair: HAIRT, mood: 'joy', armL: [40, 3, 2.6], armR: [40, 3, 2.8], propR: book(true) })
    + `<g${M.in('rise', 4.5, 1.0)}>${soldierMartin(860, 1320, 1.6, { mood: 'determined', armL: 12, armR: [24, 2, 3] })}</g>`
    + flowers(1290, 1380, 10, { seed: 8 }) + butterflies(2, { x0: 460, x1: 800, y0: 900, y1: 1050, seed: 3 })
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 2 }));
}

// 2 · Amiens, winter: the cloak cut in two
function scene2() {
  const hx = 680, hy = 1330, hs = 1.35;
  const sad = beggar(230, 1330, 1.45, { mood: 'sad', armL: [24, 2, 2.6], armR: [24, 2, 2.8] });
  const glad = beggar(230, 1330, 1.45, { mood: 'joy', armL: [24, 2, 2.6], armR: [24, 2, 2.8], over: halfCloakOn });
  return FAR(sky([[0, '#2a3156'], [0.55, '#6a7aa8'], [1, '#c9d2e6']]))
    + BACK(clouds(520, { color: '#c4cce0', op: 0.6, drift: 40, seed: 9 }) + gate(250, 1180, 1.0, { wall: '#8a8aa6' }))
    + ground(1240, '#e6ebf4', { rim: '#ffffff' }) + tufts(1246, 8, '#b4bccc', { seed: 7 })
    + `<g${M.tw([{ at: 4.2, dur: 0.8, from: { opacity: 1 }, to: { opacity: 0 } }])}>${sad}</g>`
    + `<g opacity="0"${M.tw([{ at: 4.2, dur: 0.8, from: { opacity: 0 }, to: { opacity: 1 } }])}>${glad}</g>`
    + horse(hx, hy, hs, { flip: true })
    + rider(soldierMartin, hx + 20, hy, hs, 1.7, { mood: 'happy', armL: [72, 3, 2.6], armR: [30, 2, 3], propL: halfCloakProp, propR: sword })
    + snow(30, 8)
    + NEAR(foliage('r', 1650, { color: '#2a3046', seed: 4 }));
}

// 3 · the dream: Christ wearing the half cloak
function scene3() {
  const wings = '<path d="M-30 -200 Q-150 -260 -170 -120 Q-110 -150 -40 -140Z M30 -200 Q150 -260 170 -120 Q110 -150 40 -140Z" fill="#fff6e0" opacity=".9"/>';
  const angel = (x, y, ph) => `<g${M.bob(10, 4 + ph, ph)}>${person(x, y, 0.85, { kind: 'layman', robe: true, top: '#f6e6c0', skin: SKIN.fair, hair: '#c98a3a', beard: null, mood: 'peaceful', under: wings, armL: 20, armR: 20 })}</g>`;
  const christ = person(560, 980, 1.4, { kind: 'layman', robe: true, top: '#f6f0e2', girl: true, skin: '#e2b48f', hair: HAIRT, beard: HAIRT, halo: true, mood: 'happy', over: sash, armL: [60, 4, 3], armR: [40, 3, 3.3] });
  return FAR(sky(SKIES.deep, { stars: 40, seed: 3 }))
    + `<g${M.in('fade', 0.4, 1.6)}>${glow(560, 760, 460, 0.9)}${rays(560, 760, { op: 0.1 })}${clouds(1030, { color: '#ffd8c0', op: 0.7, drift: 20, seed: 4, n: 3 })}${angel(260, 900, 0.3)}${angel(860, 900, 1.1)}<g${M.bob(10, 3.6)}>${christ}</g></g>`
    + MID(tent(150, 1290, 1.0, '#5a5470') + tent(950, 1300, 0.9, '#5a5470'))
    + ground(1300, '#2e2a40', { rim: '#5a5a7a' })
    + soldierMartin(540, 1330, 1.5, { mood: 'peaceful', sitting: true, helmet: false, armL: [20, 1, 4], armR: [20, 1, 4.2] })
    + sparkles(18, 200, 900, 560, 1100, { seed: 9 })
    + NEAR(foliage('l', 1640, { color: '#1a1428', seed: 3 }));
}

// 4 · Worms: "I am a soldier of Christ"
function scene4() {
  const julian = person(250, 1320, 1.7, { kind: 'royal', top: '#5a2a6a', skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424', crown: false, mood: 'stern', armL: 12, armR: [50, 4, 2.6],
    over: `<path d="M-42 -286 Q0 -306 42 -286" stroke="#6aa454" stroke-width="10" fill="none" stroke-linecap="round"/>`,
    propR: `<g><circle cx="-6" cy="-6" r="10" fill="${GOLD}"/><circle cx="8" cy="-2" r="10" fill="#e2b04a"/><circle cx="0" cy="8" r="10" fill="${GOLD}"/></g>` });
  return FAR(sky(SKIES.sunrise) + sun(840, 560, 60, 300))
    + BACK(clouds(470, { color: '#fff4e4', op: 0.8, seed: 3 }) + hill(1100, 40, '#b9a888', 6))
    + MID(tent(120, 1210, 0.9) + tent(470, 1180, 0.75) + tent(980, 1200, 0.95)
      + [620, 740, 860].map((x, i) => roman(x, 1210, 0.85, { mood: 'surprised', armL: 8, armR: 8, skin: [SKIN.priest, '#d9a47e', '#e6bc96'][i] })).join(''))
    + ground(1230, '#c8b88e', { rim: '#e2d4ac' }) + tufts(1236, 10, '#a8986e', { seed: 2 })
    + julian
    + soldierMartin(700, 1330, 1.95, { mood: 'determined', helmet: false, talk: [0.4, 5.5], armL: [62, 3, 2.6], armR: [20, 2, 3], propR: smallCross })
    + motes(10, { y0: 700, y1: 1200, seed: 6 })
    + NEAR(foliage('r', 1650, { color: '#4a3a2a', seed: 5 }));
}

// 5 · disciple of Hilary; the monastery at Ligugé
function scene5() {
  const hilary = person(260, 1320, 1.65, { kind: 'priest', top: '#f2ead8', collar: false, skin: SKIN.priest, hair: GREY, beard: GREY, under: cope, over: stole + mitre, mood: 'happy', armL: [20, 2, 3], armR: [24, 2, 3.2], propL: crozier });
  const monks = [[830, 1250, 0.95, '#d9a47e'], [960, 1260, 0.9, SKIN.priest]].map(([x, y, s, skin], i) => person(x, y, s, { kind: 'friar', top: '#5a4e44', cord: false, skin, hair: '#3a2a1e', beard: i ? null : '#3a2a1e', mood: 'peaceful', flip: true, armL: [40, 2, 3], armR: [40, 2, 3.2] })).join('');
  return FAR(sky(SKIES.sunrise) + sun(560, 580, 56, 300) + rays(560, 580, { op: 0.08 }))
    + BACK(clouds(480, { color: '#fff4e4', op: 0.7, seed: 12 }) + hill(1060, 50, '#9cb88a', 4, { freq: 1.2 }) + tree(980, 1120, 0.5, '#4b8a46') + tree(120, 1110, 0.45, '#5a9a4a'))
    + MID(stoneHut(700, 1220, 1.0) + stoneHut(920, 1210, 0.8) + stoneHut(450, 1200, 0.7) + monks)
    + ground(1230, '#86b06a', { rim: '#b4d890' }) + tufts(1236, 12, '#5a8a4a', { seed: 8 })
    + hilary
    + monkMartin(580, 1330, 1.85, { mood: 'joy', armL: [30, 2, 3], armR: [28, 2, 3.2], propL: book(false) })
    + flowers(1290, 1380, 10, { seed: 5 })
    + NEAR(foliage('l', 1640, { color: '#2f5a35', seed: 1 }));
}

// 6 · 371, Tours: the geese give him away
function scene6() {
  const folk = [[120, '#7a2e5a', 'joy', false, SKIN.priest], [300, '#3f6fb8', 'joy', true, '#e6bc96']]
    .map(([x, top, mood, girl, skin], i) => person(x, 1300, 1.35, { kind: 'layman', top, pants: '#4a3a40', skin, girl, hair: i ? '#6b4a2a' : '#2a1e16', mood, armL: 10, armR: [110, 10, 1.3] })).join('');
  return FAR(sky(SKIES.day) + sun(180, 520, 50, 240))
    + BACK(clouds(470, { seed: 13 }) + gothic(880, 1150, 0.5, { wall: '#e2d6c0' }) + hill(1130, 20, '#a8c48a', 3))
    + MID(barn(640, 1250, 1.05))
    + ground(1250, '#b8c87e', { rim: '#d4e09e' }) + tufts(1256, 10, '#8aa45a', { seed: 6 })
    + monkMartin(640, 1250, 1.3, { mood: 'surprised', armL: [60, 3, 2.4], armR: [20, 2, 3] })
    + goose(540, 1360, 1.25, { honk: true, ph: 0.2 }) + goose(760, 1370, 1.35, { flip: true, honk: true, ph: 0.8 }) + goose(900, 1330, 1.1, { flip: true, honk: true, ph: 1.4 })
    + folk
    + NEAR(foliage('r', 1650, { color: '#3a5a2e', seed: 7 }));
}

// 7 · a humble bishop; death at Candes, November 8, 397
function scene7() {
  const monks = [[220, 'sad'], [880, 'peaceful']].map(([x, mood], i) => person(x, 1310, 1.25, { kind: 'friar', top: '#5a4e44', cord: false, skin: i ? '#d9a47e' : SKIN.priest, hair: '#3a2a1e', beard: '#3a2a1e', mood, flip: i === 1, armL: [40, 2, 3], armR: [40, 2, 3.3], propR: i ? '' : candle })).join('');
  return FAR(sky(SKIES.dusk, { stars: 20, seed: 9 }) + rays(540, 720, { op: 0.08 }))
    + BACK(hill(1060, 30, '#5d3f6c', 5) + `<rect x="-200" y="1060" width="${W + 400}" height="80" fill="#8a7aa8" opacity=".7"/>` + waves(1070, 4, 240, 8, '#a898c4', { foam: '#e8dcf4', op: 0.8 }))
    + MID(romChurch(760, 1210, 0.85, { wall: '#b8a0a8', roof: '#4a3a52' }))
    + ground(1220, '#5a3a52', { rim: '#c08a8a' })
    + `<g${M.tw([{ at: 2.6, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(450, 640, 330, 760, 1340, 0.55)}${motes(14, { x0: 360, x1: 720, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + monks
    + bishopMartin(545, 1330, 1.95, { mood: 'peaceful', halo: 3.0, armL: [30, 2, 3], armR: [30, 2, 3.3], propL: crozier })
    + NEAR(foliage('l', 1640, { color: '#2a1a34', seed: 2 }));
}

// 8 · carried home by boat along the Loire; basilica over his tomb
function scene8() {
  const bank = [80, 230, 850, 1000].map((x, i) => person(x, 1300, 1.05, { kind: i % 2 ? 'friar' : 'layman', top: i % 2 ? '#5a4e44' : '#7a5a7a', cord: false, pants: '#3a3040', skin: [SKIN.priest, '#d9a47e', '#e6bc96', SKIN.priest][i], hair: '#3a2a1e', beard: i % 2 ? '#3a2a1e' : null, mood: 'peaceful', flip: i > 1, armL: 20, armR: [40, 2, 3], propR: candle })).join('');
  return FAR(sky(SKIES.gold) + rays(540, 600, { op: 0.12 }) + glow(540, 640, 440, 0.7))
    + BACK(clouds(500, { color: '#fff0d4', op: 0.7, seed: 15 }) + gothic(540, 1010, 0.55, { wall: '#e8d4b0' }) + hill(1010, 12, '#c89a70', 4))
    + `<rect x="-200" y="1010" width="${W + 400}" height="400" fill="#6a8ab8"/>`
    + waves(1030, 5, 260, 7, '#7a9cc8', { foam: '#e6f0fa' })
    + `<g${M.drift(60)}>${boat(500, 1150, 1.0)}</g>`
    + waves(1180, 6, 240, 6, '#5a7aa8', { foam: '#d6e6f6', phase: 1 })
    + ground(1250, '#7a6a4a', { rim: '#a89a72' })
    + MID(crowd(1330, 9, { color: '#3a2a3a', flags: [['#f6f2e8', CLOAK, '#f6f2e8']] }))
    + bank
    + petals(14, { seed: 4, colors: ['#ffffff', '#f2c46b'] });
}

// 9 · feast day + patronage
function scene9() {
  return FAR(sky(SKIES.dusk, { stars: 22, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + hill(1180, 36, '#5d3f6c', 3, { freq: 1.6 }) + gothic(900, 1180, 0.4, { wall: '#7a6a8a', win: '#ffd98a' }))
    + glow(560, 1100, 480, 0.85)
    + MID(horse(240, 1250, 0.95, { ph: 0.6 }))
    + ground(1260, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1266, 10, '#3a2438', { seed: 7 })
    + bishopMartin(600, 1300, 2.3, { mood: 'happy', halo: 0.3, armL: [26, 2, 3], armR: [44, 3, 3.4], propL: crozier, over: cloakFront })
    + goose(880, 1370, 1.2, { flip: true, ph: 0.5 })
    + flowers(1300, 1380, 12, { seed: 3, colors: ['#ffffff', CLOAK, '#f6d36b'] })
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_martin_of_tours', name: 'St_Martin_of_Tours',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'He shared his cloak with Christ', thumb_title: 'St. Martin of Tours', thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'ˈæmiənz': 'ɑːmjˈæn',            // Amiens
    'pˈɔɪɾɪɹz': 'pwɑːtjˈeɪ',          // Poitiers
    'lˌɪɡjuːɡˈeɪ': 'liːɡuːʒˈeɪ',      // Ligugé
    'mˈɑːɹmaʊɾiɚ': 'mɑːɹmuːtjˈeɪ',    // Marmoutier
    'kˈændz': 'kˈɑːnd',               // Candes
    'tˈʊɹz': 'tˈʊɹ',                  // Tours
  },
  scenes: [
    { kicker: 'A SOLDIER OF ROME', title: 'St. Martin of Tours', art: scene0, cam: { move: 'push', amt: 0.07, oy: 950 },
      say: ['One freezing night, a young Roman soldier met a beggar, and did something that changed his whole life.', 'This is Saint Martin of Tours.'] },
    { kicker: 'ABOUT 316 · PANNONIA', title: "A Soldier's Son", art: scene1, cam: 'drift-r',
      say: ['Martin was born around 316 in Pannonia, in what is now Hungary, the son of a Roman army officer.',
        'At ten, he chose to prepare for baptism, but at fifteen he had to join the army.'] },
    { kicker: 'WINTER · AMIENS, GAUL', title: 'The Cloak', art: scene2, cam: { move: 'push', amt: 0.08, ox: 420, oy: 1050 },
      say: ['At the gate of Amiens, he saw a beggar shivering in the cold.', 'Martin drew his sword, cut his soldier’s cloak in two, and gave him half.'] },
    { kicker: 'THAT NIGHT', title: 'The Dream', art: scene3, cam: 'tilt-up',
      say: ['That night, he dreamed of Jesus wearing the half cloak, and heard him tell the angels:',
        'Martin, still only a catechumen, clothed me with this robe.', 'Soon after, Martin was baptized.'] },
    { kicker: 'NEAR WORMS', title: 'A Soldier of Christ', art: scene4, cam: { move: 'drift-l', amt: 0.07 },
      say: ['Before a battle, he refused the emperor’s reward and said:', 'I am a soldier of Christ. It is not lawful for me to fight.', 'He was jailed, but soon set free.'] },
    { kicker: 'ABOUT 361 · LIGUGÉ', title: 'A Monk at Last', art: scene5, cam: 'pan-l',
      say: ['He became a disciple of Saint Hilary, the bishop of Poitiers.', 'Near Ligugé, he founded one of the first monasteries in Gaul.'] },
    { kicker: '371 · TOURS', title: 'Hiding From the Crowd', art: scene6, cam: 'drift-r',
      say: ['When the people of Tours wanted him as their bishop, one famous story says he hid in a barn.', 'But the cackling geese gave him away.'] },
    { kicker: 'NOVEMBER 8, 397 · CANDES', title: 'A Humble Bishop', art: scene7, cam: 'tilt-up',
      say: ['As bishop, he lived simply, founded the monastery of Marmoutier, and preached across the countryside.', 'He died at Candes on November 8, 397, among his monks.'] },
    { kicker: 'ALONG THE LOIRE', title: 'Carried Home', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 1100 },
      say: ['The people of Tours brought his body home by boat on the Loire.', 'About two thousand monks joined his funeral, and a great basilica later rose over his tomb.'] },
    { kicker: 'FEAST DAY · NOVEMBER 11', title: 'Patron of Soldiers', art: scene9, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['His feast day is November 11. He is a patron of soldiers, beggars, horses and France.', 'Saint Martin of Tours, pray for us.'] },
  ],
};
