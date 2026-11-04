// Our Lady of Aparecida, Patroness of Brazil (feast: October 12). Paraíba river, dugout canoe, the small dark clay statue
// (found headless, then its head), the catch of fish, colonial Guaratinguetá, the 1904 crown, the Aparecida basilica.
// Exports for later reels: aparecida (statue), aparecidaHead, imperialCrown, canoe, strawHat, colonialChurch, colonialTown,
// aparecidaBasilica, babyBundle.
import { W, M, SKIES, SKINS, GOLD, sky, sun, rays, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, person, rosary, coconut, crowd, ground, dark, light, FAR, BACK, MID, NEAR } from '../art.mjs';
import { net, fish, candle } from './peter.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const CLAY = '#5a3a2a', CLAYD = '#3e281c', MANTLE = '#22408a', TRIM = '#e8c25a';

// ------------------------------------------------------------- the statue (base at 0, ~156 units tall with crown)
export const aparecidaHead = `<g><path d="M-14 -104 Q-16 -126 0 -127 Q16 -126 14 -104 Q12 -92 9 -88 L-9 -88 Q-12 -92 -14 -104Z" fill="${CLAYD}"/>`
  + `<circle cx="0" cy="-110" r="11.5" fill="#76503a"/><path d="M3 -121 A11.5 11.5 0 0 1 3 -99 A8 11 0 0 0 3 -121Z" fill="${CLAYD}" opacity=".5"/>`
  + '<path d="M-7 -111 q3 2.5 6 0 M2 -111 q3 2.5 6 0" stroke="#140a06" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
  + '<path d="M-3 -104 q3 2 6 0" stroke="#1e120c" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="-7" cy="-106" rx="2.6" ry="1.6" fill="#a8604a" opacity=".5"/><ellipse cx="7" cy="-106" rx="2.6" ry="1.6" fill="#a8604a" opacity=".5"/></g>';
export const imperialCrown = `<g transform="translate(0,-120)"><circle cy="-18" r="34" fill="url(#haloGlow)" opacity=".8"/>`
  + `<rect x="-17" y="-8" width="34" height="9" rx="3" fill="${GOLD}"/><path d="M-16 -8 Q-16 -30 0 -36 Q16 -30 16 -8" fill="none" stroke="${GOLD}" stroke-width="5"/>`
  + `<path d="M0 -8 V-36" stroke="${GOLD}" stroke-width="4"/><path d="M0 -36 v-12 M-5 -43 h10" stroke="${GOLD}" stroke-width="3.4" stroke-linecap="round"/>`
  + '<circle cx="-9" cy="-4" r="2.4" fill="#d8323a"/><circle cx="0" cy="-4" r="2.4" fill="#2a7a4a"/><circle cx="9" cy="-4" r="2.4" fill="#2a5ac8"/></g>';
/** The small dark clay image of the Immaculate Conception. mantle: the embroidered blue mantle (later years), head: false when
 * first pulled from the river, crown: the 1904 imperial crown. */
export function aparecida(s = 1, { mantle = true, crown = true, head = true, aura = true } = {}) {
  let g = `<g transform="scale(${s})">`;
  if (aura) g += '<circle cy="-80" r="120" fill="url(#haloGlow)" opacity=".9"/>';
  if (mantle) {
    g += `<path d="M-10 -136 Q0 -142 10 -136 L56 -4 Q0 6 -56 -4Z" fill="${MANTLE}"/><path d="M4 -140 Q10 -138 10 -136 L56 -4 Q30 2 14 2Z" fill="${dark(MANTLE, 0.3)}" opacity=".6"/>`
      + `<path d="M-10 -136 L-56 -4 Q0 6 56 -4 L10 -136" stroke="${TRIM}" stroke-width="3.5" fill="none" stroke-linejoin="round"/>`
      + [[-30, -40], [28, -50], [-16, -24], [36, -20], [-38, -14], [20, -86], [-22, -76]].map(([x, y]) => `<path d="M${x} ${y - 4} l1.2 3 l3 .2 l-2.4 2 l.9 3 l-2.7 -1.7 l-2.7 1.7 l.9 -3 l-2.4 -2 l3 -.2Z" fill="${TRIM}"/>`).join('')
      + '<rect x="-48" y="-18" width="14" height="10" fill="#2a8a4a"/><path d="M-41 -17 l6 4 l-6 4 l-6 -4Z" fill="#f6d330"/><rect x="34" y="-18" width="7" height="10" fill="#f6d330"/><rect x="41" y="-18" width="7" height="10" fill="#f6f2e8"/>'
      + `<path d="M-14 -96 L14 -96 L20 -6 L-20 -6Z" fill="${CLAY}"/><path d="M4 -96 L14 -96 L20 -6 L8 -6Z" fill="${CLAYD}" opacity=".6"/>`;
  } else {
    g += `<ellipse cx="0" cy="-2" rx="24" ry="6" fill="${CLAYD}"/><path d="M-24 -4 Q-28 -60 -13 -92 Q0 -99 13 -92 Q28 -60 24 -4Z" fill="${CLAY}"/>`
      + `<path d="M6 -96 Q28 -60 24 -4 L10 -4 Q16 -60 4 -94Z" fill="${CLAYD}" opacity=".6"/><path d="M-16 -70 Q-8 -40 -12 -8 M8 -60 Q12 -30 10 -8" stroke="${CLAYD}" stroke-width="2.4" fill="none" opacity=".7"/>`;
  }
  g += `<path d="M0 -80 L-7 -62 Q0 -58 7 -62Z" fill="${light(CLAY, 0.12)}"/><path d="M0 -80 L0 -60" stroke="${CLAYD}" stroke-width="1.4"/>`;   // joined hands
  if (head) g += aparecidaHead;
  if (crown) g += imperialCrown;
  return g + '</g>';
}

// ------------------------------------------------------------- people, props, set pieces
export const strawHat = '<path d="M-64 -282 Q0 -298 64 -282 Q42 -268 0 -270 Q-42 -268 -64 -282Z" fill="#d9b86a"/><path d="M-36 -283 Q-36 -320 0 -323 Q36 -320 36 -283Z" fill="#e6c87e"/>'
  + '<path d="M10 -321 Q36 -318 36 -283 L20 -283Z" fill="#c9a45a" opacity=".6"/><rect x="-36" y="-292" width="72" height="8" fill="#8a5a3a"/>';
const FISH_SK = [SKINS[1], '#e0b08a', SKINS[0]], FISH_TOP = ['#e8dcc0', '#9ab0c8', '#c9a87a'], FISH_HAIR = ['#1a120c', '#3a2a1e', '#1a120c'];
const fisher = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', top: FISH_TOP[i], pants: '#5a4a3a', skin: FISH_SK[i], hair: FISH_HAIR[i],
  beard: i === 1 ? '#3a2a1e' : null, ...o, over: (o.hat === false ? '' : strawHat) + (o.over || '') });
export function canoe(x, y, s = 1, { crew = '', wood = '#6b4226' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><g${M.sway(1.2, 4.6)}><g${M.bob(5, 3.6)}>${crew}`
    + `<path d="M-310 -46 L310 -46 Q292 18 230 28 L-230 28 Q-292 18 -310 -46Z" fill="${wood}"/><path d="M-300 -34 L300 -34" stroke="${light(wood, 0.22)}" stroke-width="7"/>`
    + `<path d="M-250 8 L250 8" stroke="${dark(wood, 0.3)}" stroke-width="5" opacity=".6"/></g></g></g>`;
}
const paddle = '<g transform="rotate(-20)"><rect x="-4" y="-40" width="8" height="190" rx="3" fill="#8a6234"/><ellipse cx="0" cy="160" rx="14" ry="34" fill="#8a6234"/></g>';
export const babyBundle = '<g transform="translate(0,-6)"><ellipse rx="26" ry="16" fill="#f4efe4"/><path d="M8 -14 Q30 -10 26 6" fill="#e2d8c2"/><circle cx="14" cy="-6" r="10" fill="#d9a47e"/><path d="M10 -7 q2 2 4 0 M16 -7 q2 2 4 0" stroke="#2b1d14" stroke-width="1.4" fill="none"/></g>';
// White Portuguese-colonial church: twin bell towers, blue trim, terracotta roof
export function colonialChurch(x, y, s = 1, { wall = '#f4efe4', trim = '#3a6ab0', roof = '#c0623e', win = null } = {}) {
  const tower = (tx) => `<rect x="${tx - 34}" y="-300" width="68" height="300" fill="${wall}"/><rect x="${tx + 8}" y="-300" width="26" height="300" fill="${dark(wall, 0.12)}"/>`
    + `<path d="M${tx - 40} -300 L${tx} -360 L${tx + 40} -300Z" fill="${trim}"/><path d="M${tx} -360 v-26 M${tx - 10} -376 h20" stroke="${GOLD}" stroke-width="5"/>`
    + `<path d="M${tx - 14} -230 v-24 a14 14 0 0 1 28 0 v24Z" fill="${win || dark(wall, 0.5)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${tower(-110)}${tower(110)}`
    + `<rect x="-76" y="-230" width="152" height="230" fill="${light(wall, 0.05)}"/><path d="M-86 -230 Q0 -300 86 -230Z" fill="${wall}"/><path d="M-86 -230 Q0 -300 86 -230" stroke="${trim}" stroke-width="6" fill="none"/>`
    + `<path d="M-26 0 v-70 a26 26 0 0 1 52 0 v70Z" fill="${dark(wall, 0.55)}"/><circle cx="0" cy="-160" r="20" fill="${win || trim}" opacity=".85"/>`
    + `<rect x="-80" y="-6" width="160" height="6" fill="${trim}"/><path d="M-160 0 L-150 -20 L150 -20 L160 0Z" fill="${roof}" opacity="0"/></g>`;
}
export function colonialTown(x, y, s = 1, { wall = '#f4efe4', roof = '#c0623e', trim = '#3a6ab0' } = {}) {
  let b = '';
  [[-470, 110, 90], [-360, 100, 110], [-250, 110, 84], [250, 120, 96], [370, 100, 118], [480, 110, 88]].forEach(([hx, w, h], i) => {
    const c = i % 2 ? wall : '#f2e2c4';
    b += `<rect x="${hx - w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><path d="M${hx - w / 2 - 10} ${-h} L${hx} ${-h - 38} L${hx + w / 2 + 10} ${-h}Z" fill="${roof}"/>`
      + `<rect x="${hx - 30}" y="${-h + 26}" width="20" height="26" fill="${trim}"/><rect x="${hx + 8}" y="${-h + 26}" width="20" height="26" fill="${trim}"/><rect x="${hx - 8}" y="${-46}" width="18" height="46" fill="${dark(roof, 0.3)}"/>`;
  });
  return `<g transform="translate(${x},${y}) scale(${s})">${b}${colonialChurch(0, 0, 0.6, { wall, trim })}</g>`;
}
// National Shrine of Aparecida: brick Greek-cross church, wide central dome on a drum, slender tower
export function aparecidaBasilica(x, y, s = 1, { brick = '#a0523a', win = '#ffd98a' } = {}) {
  const sh = dark(brick, 0.22);
  const winRow = (x0, n, yy) => Array.from({ length: n }, (_, i) => `<path d="M${x0 + i * 46} ${yy} v-30 a10 10 0 0 1 20 0 v30Z" fill="${win}" opacity=".75"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="410" y="-640" width="70" height="640" fill="${brick}"/><rect x="452" y="-640" width="28" height="640" fill="${sh}"/><path d="M400 -640 L445 -720 L490 -640Z" fill="${dark(brick, 0.35)}"/>`
    + `<path d="M445 -720 v-40 M430 -744 h30" stroke="${GOLD}" stroke-width="6"/>${winRow(425, 1, -560)}`
    + `<rect x="-520" y="-200" width="1040" height="200" fill="${brick}"/><rect x="200" y="-200" width="320" height="200" fill="${sh}" opacity=".7"/>`
    + `<path d="M-540 -200 L-260 -270 L260 -270 L540 -200Z" fill="${dark(brick, 0.1)}"/>${winRow(-480, 8, -60)}${winRow(140, 8, -60)}`
    + `<rect x="-170" y="-380" width="340" height="120" fill="${light(brick, 0.08)}"/>${winRow(-140, 7, -290)}`
    + `<path d="M-190 -380 Q-190 -520 0 -540 Q190 -520 190 -380Z" fill="#4a6a8a"/><path d="M60 -536 Q190 -510 190 -380 L90 -380 Q110 -480 60 -536Z" fill="#3a5470" opacity=".7"/>`
    + `<path d="M0 -540 v-50 M-16 -572 h32" stroke="${GOLD}" stroke-width="7"/><path d="M-120 0 v-120 a120 60 0 0 1 240 0 v120Z" fill="${dark(brick, 0.45)}"/></g>`;
}
const homeInterior = () => {
  let planks = '';
  for (let i = 0; i < 12; i++) planks += `<rect x="${-200 + i * 120}" y="-200" width="116" height="1400" fill="${i % 2 ? '#8a6040' : '#7e5638'}"/>`;
  return `${planks}<rect x="760" y="520" width="200" height="220" rx="10" fill="#1c2048"/><path d="M860 520 V740 M760 630 H960" stroke="#6b4a2a" stroke-width="12"/>`
    + `<circle cx="900" cy="580" r="18" fill="#f6efd8"/><rect x="740" y="740" width="240" height="18" fill="#5a3a22"/>`
    + `<rect x="380" y="1050" width="320" height="40" rx="6" fill="#5a3a22"/><rect x="400" y="1090" width="22" height="160" fill="#4a2e1a"/><rect x="658" y="1090" width="22" height="160" fill="#4a2e1a"/>`
    + '<rect x="390" y="1036" width="300" height="18" rx="4" fill="#f4efe4"/>';
};
const fishPile = (n, seed = 1) => Array.from({ length: n }, (_, i) => `<g transform="translate(${-200 + ((i * 97 + seed * 31) % 400)},${-52 - (i % 3) * 12})">${fish(['#9ab8c8', '#c9a070', '#a8c4d0', '#8aa8b8'][i % 4], 1, (i * 37) % 60 - 30)}</g>`).join('');
const jumper = (x, y, ph = 0) => `<g transform="translate(${x},${y})"><g${M.bob(40, 1.6 + ph, ph)}><g${M.sway(25, 1.6 + ph, ph)}>${fish('#a8c4d0', 1.3, -30)}</g></g></g>`;

// ------------------------------------------------------------- scenes
// 0 · hook: the crowned image glowing over the river at dusk, fishermen in their canoe
function scene0() {
  const crew = fisher(-150, 0, 0.62, 0, { mood: 'surprised', armL: [40, 4, 2], armR: [120, 6, 1.6] }) + fisher(0, 0, 0.6, 1, { mood: 'joy', armR: [100, 6, 1.8] })
    + fisher(150, 0, 0.62, 2, { mood: 'surprised', flip: true, armL: 10, armR: [30, 3, 2], propR: paddle });
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 2 }) + rays(560, 780, { op: 0.1 }))
    + BACK(hill(1040, 46, '#3e3a5e', 4, { freq: 1.2 }) + coconut(70, 1060, 0.55) + coconut(1000, 1050, 0.6, { flip: true }) + clouds(560, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 3 }))
    + `<rect x="-200" y="1050" width="${W + 400}" height="900" fill="url(#seaDusk)"/>`
    + waves(1056, 6, 300, 7, '#7a5a8a', { foam: '#f2b28a', op: 0.9 })
    + glow(570, 900, 460, 0.95)
    + `<g transform="translate(570,1165)"><g${M.in('rise', 0.2, 1.4)}><g${M.bob(10, 3.6)}>${aparecida(3.3)}</g></g></g>`
    + sparkles(16, 380, 760, 1140, 1240, { seed: 5, color: '#ffe8b0' })
    + waves(1180, 9, 360, 6, '#4a3a6e', { phase: 1, foam: '#d8a0a0' })
    + MID(canoe(250, 1290, 0.66, { crew, wood: '#4a3030' }))
    + waves(1300, 10, 420, 5, '#2e2c5a', { phase: 2, foam: '#8a7aa8' })
    + motes(16, { y0: 520, y1: 1200, seed: 4 })
    + NEAR(foliage('l', 1610, { color: '#1e2a24' }) + foliage('r', 1650, { color: '#1e2a24', seed: 5 }));
}

// 1 · October 1717: the empty river, Guaratinguetá on the far bank
function scene1() {
  const crew = fisher(-170, 0, 0.75, 0, { mood: 'worried', armL: [70, 8, 1.8], armR: [60, 8, 1.8], propR: net })
    + fisher(0, 0, 0.75, 1, { mood: 'sad', armL: 12, armR: 14 })
    + fisher(170, 0, 0.75, 2, { mood: 'determined', flip: true, armR: [30, 4, 2], propR: paddle });
  return FAR(sky(SKIES.sunrise) + sun(250, 640, 58, 300))
    + BACK(clouds(420, { seed: 6 }) + hill(1000, 50, '#8ab08a', 3, { freq: 1.1, top: '#b4d8a4' }) + colonialTown(780, 990, 0.62) + coconut(120, 1010, 0.6))
    + `<rect x="-200" y="1000" width="${W + 400}" height="900" fill="url(#seaG)"/>`
    + waves(1006, 5, 260, 7, '#6a9ab0', { foam: '#e2f0f2' }) + sparkles(10, 120, 380, 1014, 1100, { seed: 8, color: '#fff2c8' })
    + waves(1090, 8, 320, 6, '#4a8098', { phase: 1 })
    + canoe(540, 1250, 1.25, { crew })
    + waves(1262, 12, 380, 5, '#3a6a84', { phase: 2, foam: '#b8dce8' })
    + waves(1340, 14, 440, 4.5, '#2e5a72', { phase: 3 })
    + gullsLite();
}
const gullsLite = () => `<g${M.drift(160)}><g transform="translate(300,520)">${['M0 0 q14 -12 28 0 q14 -12 28 0', 'M90 40 q10 -9 20 0 q10 -9 20 0'].map((d) => `<path d="${d}" stroke="#4a5a6a" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}</g></g>`;

// 2 · the headless statue in the net, then its head
function scene2() {
  const headIn = M.tw([{ at: 5.6, dur: 0.6, from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } }]);
  const found = `<g transform="translate(0,-6)">${glow(0, -100, 180, 0.9)}${aparecida(1.5, { mantle: false, crown: false, head: false, aura: false })}`
    + `<g opacity="0"${headIn}><g transform="scale(1.5)">${aparecidaHead}</g></g>`
    + `<g opacity=".6" transform="translate(0,-170) scale(1.3)">${net}</g></g>`;
  const crew = fisher(-200, 0, 0.8, 0, { mood: 'surprised', armL: [40, 3, 2], armR: [60, 3, 2] })
    + fisher(10, 0, 0.84, 2, { mood: 'surprised', armL: [150, 4, 2], armR: [20, 2, 3], propL: found })
    + fisher(200, 0, 0.8, 1, { mood: 'surprised', flip: true, armR: [50, 3, 2] });
  return FAR(sky(SKIES.sunrise) + rays(540, 700, { op: 0.1 }))
    + BACK(clouds(460, { color: '#fff4e4', op: 0.8, seed: 9 }) + hill(1010, 40, '#8ab08a', 5, { freq: 1.4 }))
    + `<rect x="-200" y="1010" width="${W + 400}" height="900" fill="url(#seaG)"/>`
    + waves(1016, 5, 260, 7, '#6a9ab0', { foam: '#e2f0f2' })
    + MID(waves(1100, 8, 320, 6, '#4a8098', { phase: 1 }) + coconut(1010, 1070, 0.6, { flip: true }))
    + canoe(540, 1270, 1.3, { crew })
    + waves(1282, 12, 380, 5, '#3a6a84', { phase: 2, foam: '#b8dce8' })
    + waves(1350, 14, 440, 4.5, '#2e5a72', { phase: 3 })
    + sparkles(12, 300, 640, 640, 900, { seed: 3 });
}

// 3 · nets full of fish; the statue, whole again, rides at the bow
function scene3() {
  const crew = fisher(-240, 0, 0.8, 0, { mood: 'joy', armL: [130, 8, 1.4], armR: [40, 4, 2] })
    + fisher(-30, 0, 0.82, 1, { mood: 'joy', armL: [60, 6, 1.6], armR: [70, 6, 1.6], propR: fish('#c9a070', 1.3, 60) })
    + fisher(150, 0, 0.8, 2, { mood: 'joy', flip: true, armR: [140, 10, 1.2] })
    + `<g transform="translate(270,-40)">${glow(0, -60, 90, 0.9)}${aparecida(0.75, { mantle: false, crown: false, aura: false })}</g>`
    + fishPile(14, 2);
  return FAR(sky(SKIES.day) + sun(860, 560, 56, 260))
    + BACK(clouds(440, { seed: 4 }) + hill(1000, 46, '#8ab08a', 3, { freq: 1.2, top: '#b4d8a4' }) + coconut(90, 1010, 0.6))
    + `<rect x="-200" y="1000" width="${W + 400}" height="900" fill="url(#seaG)"/>`
    + waves(1006, 5, 260, 7, '#5a9cc4', { foam: '#d9f0f7' }) + sparkles(14, 0, W, 1014, 1120, { seed: 6 })
    + MID(waves(1090, 8, 320, 6, '#3f86b0', { phase: 1 }))
    + jumper(180, 1140, 0) + jumper(900, 1150, 0.5)
    + canoe(560, 1260, 1.3, { crew })
    + waves(1272, 12, 380, 5, '#2f74a0', { phase: 2, foam: '#cfe8f2' })
    + waves(1340, 14, 440, 4.5, '#245d88', { phase: 3 });
}

// 4 · Filipe Pedroso's home: the Rosary before the little statue
function scene4() {
  return FAR(`<rect x="-200" y="-400" width="${W + 400}" height="2800" fill="#6b4a32"/>`)
    + BACK(homeInterior())
    + `<g transform="translate(540,1040)">${glow(0, -80, 260, 0.9)}${aparecida(1.55, { mantle: false, crown: false })}</g>`
    + `<g transform="translate(420,1036)">${candle}</g><g transform="translate(660,1036)">${candle}</g>`
    + ground(1250, '#5a3a24', { rim: '#8a6040' })
    + person(250, 1330, 1.5, { kind: 'layman', top: '#9ab0c8', pants: '#5a4a3a', skin: '#e0b08a', hair: '#3a2a1e', beard: '#3a2a1e', sitting: true, mood: 'peaceful', armL: [40, 2, 3], armR: [40, 2, 3.2], propR: rosary() })
    + person(820, 1330, 1.4, { kind: 'layman', girl: true, robe: true, top: '#c9806a', skin: SKINS[0], hair: '#1a120c', sitting: true, flip: true, mood: 'peaceful', armL: [40, 2, 3], armR: [40, 2, 3.4], propR: rosary() })
    + person(980, 1340, 1.05, { kind: 'kid', top: '#e2b448', skin: SKINS[1], sitting: true, flip: true, mood: 'happy', armL: [30, 4, 2.6] })
    + person(100, 1340, 1.05, { kind: 'kid', top: '#6aa457', skin: SKINS[3], girl: true, sitting: true, mood: 'happy', armR: [30, 4, 2.6] })
    + motes(14, { x0: 360, x1: 720, y0: 760, y1: 1060, seed: 4 });
}

// 5 · 1737: a chapel on the hill, pilgrims climbing
function scene5() {
  const walkers = [[150, 0, 0.9], [300, 1, 0.85], [800, 2, 0.88], [930, 0, 0.82]]
    .map(([x, i, s], k) => `<g${M.drift(k < 2 ? 30 : -30, -10)}>${fisher(x, 1180 - k * 6, s, i, { hat: k % 2 === 0, mood: 'happy', flip: x > 540, armL: [40, 2, 3], propL: candle })}</g>`).join('');
  return FAR(sky([[0, '#5a9fd3'], [0.5, '#bfe0ec'], [0.66, '#f8e2b0'], [1, '#f8e2b0']]) + sun(880, 560, 50, 240))
    + BACK(clouds(430, { seed: 7 }) + hill(1040, 60, '#9cc48a', 4, { freq: 0.9 }))
    + MID(hill(1060, 120, '#7ab070', 2, { freq: 0.6, top: '#a8d896' }) + colonialChurch(540, 960, 0.95) + coconut(140, 1060, 0.7) + coconut(960, 1050, 0.75, { flip: true }))
    + `<path d="M440 1300 Q520 1180 500 1080 L580 1080 Q600 1180 640 1300Z" fill="#d9c08a" opacity=".8"/>`
    + walkers
    + ground(1250, '#6aa457', { rim: '#9ad07a' }) + tufts(1256, 14, '#4f8a3c', { seed: 5 })
    + person(420, 1330, 1.5, { kind: 'layman', girl: true, robe: true, top: '#e2a0a8', skin: '#e0b08a', hair: '#3a2a1e', mood: 'joy', armR: [30, 3, 2.6], propR: candle })
    + person(640, 1330, 1.2, { kind: 'kid', top: '#4b8bc4', skin: SKINS[1], mood: 'joy', flip: true, armL: [120, 10, 1.4] })
    + flowers(1270, 1340, 10, { seed: 2 })
    + NEAR(foliage('r', 1630, { color: '#2f5a35', seed: 4 }));
}

// 6 · 1904 crowned, 1930 Patroness of Brazil
function scene6() {
  const crownDrop = M.tw([{ at: 4.0, dur: 1.2, from: { y: -160, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }]);
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + rays(540, 820, { op: 0.15 }))
    + BACK(clouds(760, { color: '#fff0d4', op: 0.6, seed: 11, drift: 30 }))
    + glow(540, 860, 460, 0.95)
    + `<g transform="translate(540,1180)"><g${M.bob(8, 3.8)}>${aparecida(3.3, { crown: false })}<g transform="scale(3.3)"><g opacity="0"${crownDrop}>${imperialCrown}</g></g></g></g>`
    + MID(crowd(1420, 12, { color: '#3a2a3e', flags: [['#2a8a4a', '#2a8a4a', '#f6d330'], ['#f6d330', '#f6d330', '#2a8a4a']] }))
    + petals(20, { seed: 4, colors: ['#ffffff', '#f6d330', '#2a8a4a'] });
}

// 7 · 1980: the great basilica of Aparecida
function scene7() {
  return FAR(sky(SKIES.day) + sun(220, 520, 50, 240))
    + BACK(clouds(420, { seed: 3 }) + hill(1060, 40, '#9cc48a', 6, { freq: 1.3 }))
    + MID(aparecidaBasilica(470, 1160, 0.92) + coconut(980, 1170, 0.7, { flip: true }) + coconut(40, 1170, 0.65))
    + ground(1160, '#d9c8a8', { rim: '#f2e4c6' })
    + crowd(1420, 13, { color: '#4a3a4e', flags: [['#2a8a4a', '#2a8a4a', '#f6d330']] })
    + person(820, 1310, 1.35, { kind: 'layman', top: '#d8644e', pants: '#3a3a4a', skin: SKINS[1], hair: '#1a120c', beard: null, mood: 'joy', flip: true, armL: [130, 10, 1.4] })
    + person(260, 1310, 1.35, { kind: 'layman', girl: true, robe: true, top: '#4b8bc4', skin: '#e0b08a', hair: '#3a2a1e', mood: 'joy', armR: [120, 10, 1.6] })
    + NEAR(foliage('l', 1640, { color: '#2f5a35' }));
}

// 8 · feast day October 12: patroness of Brazil, mothers and newborns, rivers
function scene8() {
  return FAR(sky(SKIES.dusk, { stars: 22, seed: 7 }) + rays(540, 760, { op: 0.1 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 6 }) + hill(1060, 30, '#4a3a5e', 3, { freq: 1.4 }))
    + `<rect x="-200" y="1060" width="${W + 400}" height="900" fill="url(#seaDusk)"/>`
    + waves(1066, 6, 300, 7, '#7a5a8a', { foam: '#f2b28a', op: 0.9 })
    + MID(canoe(870, 1150, 0.45, { wood: '#4a3030', crew: fisher(0, 0, 0.9, 1, { mood: 'joy', armR: [130, 10, 1.4] }) }) + waves(1160, 8, 340, 6, '#4a3a6e', { phase: 1 }))
    + glow(540, 930, 440, 0.95)
    + ground(1270, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1276, 10, '#3a2438', { seed: 7 })
    + `<g transform="translate(540,1230)"><rect x="-90" y="0" width="180" height="40" rx="8" fill="#e8dcc0"/><g${M.bob(6, 3.6)}>${aparecida(3.2)}</g></g>`
    + person(220, 1320, 1.45, { kind: 'layman', girl: true, robe: true, top: '#e2a0a8', skin: '#e0b08a', hair: '#2a1e16', mood: 'joy', armL: [44, 2, 3], armR: [44, 2, 3.3], propR: babyBundle })
    + person(870, 1330, 1.2, { kind: 'kid', top: '#2a8a4a', skin: SKINS[0], mood: 'joy', flip: true, armL: [130, 10, 1.3] })
    + flowers(1290, 1350, 12, { seed: 3, colors: ['#ffffff', '#f6d330', '#2a8a4a', '#2a5ac8'] })
    + motes(16, { y0: 520, y1: 1200, seed: 2 })
    + NEAR(foliage('l', 1630, { color: '#1e2a24' }) + foliage('r', 1650, { color: '#1e2a24', seed: 5 }));
}

export const STORY = {
  slug: 'our_lady_of_aparecida', name: 'Our_Lady_of_Aparecida',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'Pulled from a river in a fishing net', thumb_title: 'Our Lady of Aparecida', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'wˈʌn θˈaʊzənd sˈɛvənhˈʌndɹɪd': 'sˈɛvəntiːn',   // 1717 / 1737 -> seventeen ...
    'ɐpˈɛɹsɪdə': 'ˌæpɐɹɛsˈiːdə',                  // Aparecida -> ah-pah-reh-SEE-dah
    'ɡˌæɹɐɾɪŋtˈɑː': 'ɡwˌɑːɹɑːtʃˌiŋɡɛtˈɑː',         // Guaratinguetá
    'doʊmˈɪŋɡoʊz': 'doʊmˈiːŋɡʊs',                  // Domingos
    'fᵻlˈiːp': 'fiːlˈiːpi',                        // Filipe
    'dʒˈoʊoʊz': 'ʒwˈaʊz',                         // João's
    'dʒˈoʊoʊ': 'ʒwˈaʊ',                           // João
    'pɛdɹˈoʊsoʊ': 'pɛdɾˈoʊzʊ',                     // Pedroso
  },
  scenes: [
    { kicker: 'PATRONESS OF BRAZIL', title: 'Our Lady of Aparecida', art: scene0, cam: { move: 'push', amt: 0.08, oy: 1000 },
      say: ['In 1717, three fishermen caught nothing all day, until their net brought up something unexpected.', 'This is Our Lady of Aparecida.'] },
    { kicker: 'OCTOBER 1717 · PARAÍBA RIVER', title: 'An Empty River', art: scene1, cam: { move: 'pan-r', amt: 0.07 },
      say: ['A governor was passing through Guaratinguetá, and three fishermen were sent to catch fish for his banquet.',
        'Domingos, Filipe and João prayed, and cast their nets, but caught nothing.'] },
    { kicker: 'THE PARAÍBA RIVER', title: 'A Statue in the Net', art: scene2, cam: { move: 'push', amt: 0.08, oy: 1000 },
      say: ['Then João\'s net pulled up a small statue of the Virgin Mary, without its head.', 'His next cast brought up the head.'] },
    { kicker: 'THE MIRACULOUS CATCH', title: 'Nets Full of Fish', art: scene3, cam: { move: 'drift-l', amt: 0.07 },
      say: ['After that, his net came up full of fish, and so did his friends\' nets.'] },
    { kicker: 'FILIPE PEDROSO\'S HOME', title: 'Prayer at Home', art: scene4, cam: { move: 'drift-r', amt: 0.06 },
      say: ['Filipe Pedroso kept the statue in his home.', 'Neighbors came to pray the Rosary before her, and they named her Our Lady Aparecida.'] },
    { kicker: '1737 · A CHAPEL ON THE HILL', title: 'A Growing Shrine', art: scene5, cam: { move: 'pan-l', amt: 0.07 },
      say: ['As crowds grew, and graces were reported, a chapel was built on a hill in 1737.', 'Later, a larger church rose in its place.'] },
    { kicker: '1904 – 1930', title: 'Crowned Patroness', art: scene6, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['In 1904, by order of Pope Saint Pius the Tenth, the little statue was crowned.', 'In 1930, Pope Pius the Eleventh declared her Patroness of Brazil.'] },
    { kicker: '1980 · APARECIDA, BRAZIL', title: 'The Great Basilica', art: scene7, cam: { move: 'pan-r', amt: 0.07 },
      say: ['In 1980, Saint John Paul the Second consecrated her vast new basilica.', 'Today, it is the second largest Catholic church in the world, after Saint Peter\'s.'] },
    { kicker: 'FEAST DAY · OCTOBER 12', title: 'Mother of Brazil', art: scene8, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['Her feast is October 12, a national holiday in Brazil.', 'She is patroness of Brazil, of mothers and newborns, and of rivers.', 'Our Lady of Aparecida, pray for us.'] },
  ],
};
