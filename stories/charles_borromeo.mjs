// St. Charles Borromeo (feast: November 4). Cardinal in red, barefoot with the penitent's rope and archbishop's cross,
// Milan Cathedral, Lake Maggiore castle, Alpine Trent, chapel interior, bed on a cart, crowned HUMILITAS scroll (exported for later reels).
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  petals, person, book, basilica, ground, bread_basket, dark, light, f, FAR, BACK, MID, NEAR } from '../art.mjs';
import { mitre, stole, cope, tree } from './francis.mjs';
import { chateau } from './joan_of_arc.mjs';
import { candle, romeSkyline, followers } from './peter.mjs';
import { lycianTown } from './nicholas.mjs';

const SKC = '#e8bd98', HAIRC = '#3a2a20', RED = '#b3202e', ROPE = '#cdae78';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);

// ---------------------------------------------------------------- Charles: cardinal's red, long nose, clean-shaven
export const biretta = `<path d="M-37 -278 Q-40 -304 -34 -316 Q0 -326 34 -316 Q40 -304 37 -278 Q0 -292 -37 -278Z" fill="${RED}"/><path d="M12 -322 Q24 -320 34 -316 Q40 -304 37 -278 Q24 -284 12 -286Z" fill="${dark(RED, 0.3)}" opacity=".7"/>`
  + `<path d="M-13 -322 V-290 M13 -322 V-290" stroke="${dark(RED, 0.4)}" stroke-width="3.5"/>`;
export const mozzetta = `<path d="M-37 -207 Q0 -218 37 -207 L47 -142 Q0 -128 -47 -142Z" fill="${RED}"/><path d="M12 -212 Q30 -211 37 -207 L47 -142 Q34 -136 22 -134Z" fill="${dark(RED, 0.3)}" opacity=".55"/>`
  + `<path d="M-47 -142 Q0 -128 47 -142" stroke="${light(RED, 0.3)}" stroke-width="3" fill="none"/>`;
export const pectoral = `<path d="M-12 -206 Q0 -180 0 -168 Q0 -180 12 -206" stroke="${GOLD}" stroke-width="2.5" fill="none"/><path d="M0 -170 V-140 M-9 -160 H9" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
const longNose = `<path d="M0 -246 Q9 -239 6 -234 Q1 -231 -4 -235 Q2 -239 0 -246Z" fill="${dark(SKC, 0.13)}"/>`;
// The penitent's rope, draped over the shoulders with a knotted tail
export const rope = `<path d="M-24 -207 Q-10 -168 0 -160 Q10 -168 24 -207 M0 -160 Q-4 -120 2 -82" stroke="${dark(ROPE, 0.25)}" stroke-width="7" fill="none" stroke-linecap="round"/>`
  + `<path d="M-24 -207 Q-10 -168 0 -160 Q10 -168 24 -207 M0 -160 Q-4 -120 2 -82" stroke="${ROPE}" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cy="-160" r="6.5" fill="${ROPE}"/><circle cx="2" cy="-82" r="5.5" fill="${ROPE}"/>`;
const bareFeet = (skin) => `<g fill="${skin}"><ellipse cx="-20" cy="-3" rx="19" ry="9"/><ellipse cx="20" cy="-3" rx="19" ry="9"/>`
  + `${[-34, -27, -20].map((x) => `<circle cx="${x}" cy="-1" r="3.4"/>`).join('')}${[34, 27, 20].map((x) => `<circle cx="${x}" cy="-1" r="3.4"/>`).join('')}</g>`;
export const charles = (x, y, s, { penitent = false, hat = biretta, over = '', ...o } = {}) => person(x, y, s, {
  kind: 'priest', top: RED, collar: false, beard: null, skin: SKC, hair: HAIRC, ...o,
  over: mozzetta + (penitent ? (o.kneel ? '' : bareFeet(SKC)) + rope : pectoral) + longNose + hat + over });

// ---------------------------------------------------------------- props
// Archbishop's two-barred processional cross; `nail` adds the glowing relic of the Holy Nail
export const archCross = (h = 240, { nail = false } = {}) => `<g><rect x="-5" y="${-h}" width="10" height="${h + 90}" rx="4" fill="${GOLD}"/><rect x="1" y="${-h}" width="4" height="${h + 90}" fill="#b08a3a" opacity=".6"/>`
  + `<rect x="-22" y="${-h + 26}" width="44" height="9" rx="4" fill="${GOLD}"/><rect x="-33" y="${-h + 62}" width="66" height="9" rx="4" fill="${GOLD}"/>`
  + (nail ? `<circle cy="${-h + 66}" r="42" fill="url(#haloGlow)"${M.pulse(0.1, 2.2, 0, 0, -h + 66)}/><path d="M-3 ${-h + 42} h6 l-2 44 h-2Z M-8 ${-h + 40} h16 v5 h-16Z" fill="#6a5a4a"/>` : '') + '</g>';
export const chalice = (s = 1) => `<g transform="scale(${s}) translate(0,-6)"><circle cy="-22" r="42" fill="url(#haloGlow)" opacity=".8"/><path d="M-20 -42 Q-18 -14 0 -10 Q18 -14 20 -42Z" fill="${GOLD}"/><path d="M8 -42 H20 Q18 -14 0 -10 Q10 -18 8 -42Z" fill="#b08a3a" opacity=".6"/>`
  + `<rect x="-3.5" y="-12" width="7" height="24" fill="#c9a24a"/><circle cy="-2" r="6" fill="${GOLD}"/><path d="M-16 16 Q0 4 16 16Z" fill="${GOLD}"/></g>`;
export const tiara = `<path d="M-33 -282 Q-36 -340 0 -372 Q36 -340 33 -282Z" fill="#f4ead2"/><path d="M10 -360 Q34 -340 33 -282 L14 -282Z" fill="#d9cca8" opacity=".7"/>`
  + `<path d="M-33 -290 Q0 -300 33 -290 M-34 -314 Q0 -324 34 -314 M-27 -340 Q0 -348 27 -340" stroke="${GOLD}" stroke-width="7" fill="none"/><path d="M0 -372 v-12 M-6 -380 h12" stroke="${GOLD}" stroke-width="4"/>`;
const pius = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', top: '#f6f0e2', collar: false, skin: SKIN.priest, hair: '#e6e0d6', beard: '#e6e0d6', ...o, over: tiara + mozzetta.replaceAll(RED, '#b3202e') + pectoral });
export function bedCart(x, y, s = 1) {
  const wheel = (cx) => `<g transform="translate(${cx},-20)"><g${M.spin(40)}><circle r="22" fill="none" stroke="#5a3e28" stroke-width="7"/><path d="M-22 0 H22 M0 -22 V22" stroke="#5a3e28" stroke-width="5"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-50" width="180" height="16" rx="4" fill="#7a5436"/><path d="M90 -44 L150 -26" stroke="#5a3e28" stroke-width="8" stroke-linecap="round"/>`
    + `<rect x="-78" y="-100" width="12" height="52" fill="#8a6240"/><rect x="66" y="-120" width="12" height="72" fill="#8a6240"/><rect x="-74" y="-84" width="146" height="20" rx="6" fill="#f0e4cc"/><rect x="-70" y="-74" width="140" height="12" fill="#8a2a3a"/>`
    + `<ellipse cx="46" cy="-90" rx="22" ry="10" fill="#fbf6ea"/>${wheel(-58)}${wheel(58)}</g>`;
}
// Crowned HUMILITAS scroll: the Borromeo motto
export const humilitas = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="190" fill="url(#haloGlow)" opacity=".5"/>`
  + `<path d="M-36 -44 L-42 -86 L-20 -66 L0 -96 L20 -66 L42 -86 L36 -44Z" fill="${GOLD}"/><rect x="-38" y="-48" width="76" height="11" rx="4" fill="#c9a24a"/><circle cy="-96" r="5" fill="#fff4cc"/>`
  + `<path d="M-210 -28 Q-226 8 -210 44 L-182 30 V-16Z" fill="#c9a24a"/><path d="M210 -28 Q226 8 210 44 L182 30 V-16Z" fill="#c9a24a"/><rect x="-190" y="-30" width="380" height="60" rx="8" fill="#f4ead2"/>`
  + `<text y="14" text-anchor="middle" font-family="Lora" font-weight="700" font-size="42" letter-spacing="4" fill="#8a2230">HUMILITAS</text></g>`;

// ---------------------------------------------------------------- set pieces
// Milan Cathedral: broad stepped facade bristling with pinnacles, main spire with the golden Madonnina
export function duomo(x, y, s = 1, { wall = '#f1e4d6', win = '#7aa6d8', shade = 0.18, door = null } = {}) {
  const prof = (px) => 330 - Math.abs(px) * 0.5;
  const pin = (px) => { const h = prof(px); return `<rect x="${px - 8}" y="${-h}" width="16" height="${h}" fill="${light(wall, 0.2)}"/><path d="M${px - 10} ${-h} L${px} ${-h - 62} L${px + 10} ${-h}Z" fill="${light(wall, 0.2)}"/>`; };
  const pins = [-340, -270, -200, -125, -45, 45, 125, 200, 270, 340].map(pin).join('');
  const face = `M-360 0 V${-prof(360)} L-200 ${-prof(200)} L-45 ${-prof(45) - 20} L0 ${-prof(0) - 30} L45 ${-prof(45) - 20} L200 ${-prof(200)} L360 ${-prof(360)} V0Z`;
  const doors = [-210, -105, 0, 105, 210].map((dx) => { const big = dx === 0 ? 1.25 : 1; return `<path d="M${dx - 26 * big} 0 V${-70 * big} Q${dx} ${-108 * big} ${dx + 26 * big} ${-70 * big} V0Z" fill="${door || dark(wall, 0.55)}"/>`; }).join('');
  const wins = [-210, -105, 105, 210].map((dx) => `<path d="M${dx - 13} -130 V-170 Q${dx} -192 ${dx + 13} -170 V-130Z" fill="${win}" opacity=".85"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<path d="M-10 -340 L-16 -510 Q0 -560 16 -510 L10 -340Z" fill="${dark(wall, 0.1)}"/><circle cy="-566" r="14" fill="${GOLD}"/><circle cy="-566" r="46" fill="url(#haloGlow)"/>`
    + `<path d="${face}" fill="${wall}"/><path d="M120 0 V${-prof(120) - 8} L200 ${-prof(200)} L360 ${-prof(360)} V0Z" fill="${dark(wall, shade)}" opacity=".5"/>${pins}${doors}${wins}`
    + `<circle cy="-210" r="30" fill="${win}"/><circle cy="-210" r="30" fill="none" stroke="${dark(wall, 0.3)}" stroke-width="6"/></g>`;
}
const alps = (base, color, snow, seed = 1) => {
  let d = `M-260 ${base}`, caps = '';
  const peaks = [[-120, 300], [150, 420], [420, 340], [700, 470], [980, 330], [1260, 380]];
  peaks.forEach(([px, h], i) => {
    const hh = h - (seed * i * 13) % 40;
    d += ` L${px} ${base - hh} L${px + 130} ${base - 90}`;
    caps += `<path d="M${px - 62} ${base - hh + 92} L${px} ${base - hh} L${px + 62} ${base - hh + 72} L${px + 28} ${base - hh + 62} L${px + 6} ${base - hh + 96} L${px - 22} ${base - hh + 66}Z" fill="${snow}"/>`;
  });
  return `<path d="${d} L1340 ${base} Z" fill="${color}"/>${caps}`;
};
const cypress = (x, y, s = 1, c = '#2f4a3a') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0 -280 Q44 -120 24 0 L-24 0 Q-44 -120 0 -280Z" fill="${c}"/><path d="M0 -280 Q44 -120 24 0 L6 0 Q18 -130 0 -280Z" fill="${dark(c, 0.3)}" opacity=".6"/></g>`;
const graveCross = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-9" y="-120" width="18" height="120" rx="3" fill="#b8b0b8"/><rect x="-38" y="-92" width="76" height="16" rx="3" fill="#b8b0b8"/><rect x="3" y="-120" width="6" height="120" fill="#8a8290" opacity=".6"/></g>`;
const seatedBishop = (x, y, s, i) => person(x, y, s, { kind: 'priest', top: i % 2 ? '#f2ead8' : '#e8dcc2', collar: false, skin: i % 3 ? SKIN.priest : SKIN.fair, hair: '#cfc8bc', beard: i % 3 === 1 ? '#cfc8bc' : '#5a3e2a', mood: i % 2 ? 'happy' : 'determined', sitting: true, armL: 12, armR: i % 2 ? [40, 8, 2.4] : 12, over: mitre });
function chapelRoom(floor = 1230) {
  const arch = (x, c) => `<path d="M${x - 92} ${floor} V760 Q${x} 620 ${x + 92} 760 V${floor}Z" fill="${c}"/>`;
  return `<rect x="-200" y="-300" width="${W + 400}" height="${floor + 340}" fill="#2c2038"/>`
    + `<rect x="-200" y="-300" width="${W + 400}" height="${floor + 340}" fill="#46325a" opacity=".5"/>`
    + `<path d="M-60 700 Q540 240 1140 700" stroke="#5a4668" stroke-width="20" fill="none"/>`
    + arch(120, '#1c1428') + arch(960, '#241a32')
    + `<path d="M470 980 V660 Q540 540 610 660 V980Z" fill="#c8a24a" opacity=".2"/><path d="M490 960 V670 Q540 575 590 670 V960Z" fill="#2a3e7a"/><path d="M490 960 V800 H590 V960Z" fill="#8a2a4a"/><path d="M540 590 V960 M490 800 H590" stroke="#f2c46b" stroke-width="5"/><circle cx="540" cy="730" r="26" fill="#f6d98a"/>`
    + `<path d="M470 980 V660 Q540 540 610 660 V980" fill="none" stroke="#5a4668" stroke-width="16"/>`
    + [290, 790].map((x) => `<rect x="${x - 15}" y="500" width="30" height="${floor - 500}" fill="#3a2c48"/><rect x="${x - 15}" y="500" width="10" height="${floor - 500}" fill="#54405e" opacity=".6"/>`).join('');
}

// ---------------------------------------------------------------- scenes
// 0 · hook
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 26, seed: 3 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1120, 520, 0.85))
    + BACK(clouds(540, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 5 }) + duomo(780, 1190, 0.95, { wall: '#7a5a80', win: '#ffd98a', door: '#4a3458' }) + hill(1200, 16, '#5d3f6c', 2, { freq: 2 }))
    + ground(1250, '#5a3a4c', { rim: '#c07a7a' })
    + `<ellipse cx="540" cy="1300" rx="300" ry="40" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>` + tufts(1260, 10, '#3a2438', { seed: 7 })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${charles(540, 1300, 2.3, { penitent: true, mood: 'happy', halo: 0.6, armL: [46, 2, 3], armR: [100, 7, 2.6], propL: archCross(210) })}</g>`
    + motes(18, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · born at Arona; the pope's nephew. Boy dissolves into the young cardinal on sentence 2.
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];
const MORN = [[0, '#b8603e'], [0.3, '#f0a46a'], [0.64, '#fbd9a0'], [1, '#fde6c0']];
const S1B = 6.7;
function scene1() {
  return FAR(sky(DAYSKY) + sun(180, 560, 58, 260))
    + BACK(clouds(500, { seed: 2 }) + alps(1060, '#a4bcd0', '#f4f8fc', 2) + hill(1060, 30, '#7fb08a', 4, { top: '#a8d4a0' }))
    + MID(`<rect x="-200" y="1056" width="${W + 400}" height="150" fill="url(#seaG)"/>` + waves(1062, 5, 240, 6, '#5a9cc4', { foam: '#d9f0f7' }) + sparkles(10, 0, W, 1072, 1170, { seed: 6 })
      + hill(1120, 34, '#6aa06a', 6) + chateau(800, 1100, 0.72, { wall: '#ecdcbc', roof: '#a8503a' }))
    + ground(1210, '#7fb06a', { rim: '#a8d48a' }) + tufts(1216, 14, '#5a8a4a', { seed: 3 }) + flowers(1230, 1330, 14, { seed: 2 })
    + `<g${fadeOut(S1B)}>${person(350, 1320, 1.5, { kind: 'kid', top: '#2f6a5a', pants: '#3a3a4a', skin: SKC, hair: HAIRC, mood: 'joy', armL: 14, armR: [125, 16, 1.2] })}</g>`
    + `<g${fadeIn(S1B)}>${pius(750, 1325, 1.75, { mood: 'happy', flip: true, armR: [70, 5, 2.4], armL: 14 })}${charles(330, 1325, 1.9, { mood: 'surprised', armL: 14, armR: [18, 3, 3] })}</g>`
    + NEAR(foliage('r', 1630, { color: '#2f5a35', seed: 9 }));
}

// 2 · Council of Trent; the Roman Catechism appears on sentence 3
const S2C = 7.9;
function scene2() {
  const row = [130, 290, 450, 610, 770, 930].map((x, i) => seatedBishop(x, 1085, 0.92, i)).join('');
  return FAR(sky(MORN) + sun(800, 560, 60, 300))
    + BACK(clouds(500, { color: '#fff7e8', op: 0.7, seed: 9 }) + alps(1000, '#7a84a4', '#f6f4f8', 3))
    + MID(`<rect x="-200" y="830" width="${W + 400}" height="400" fill="#c9a97e"/>`
      + [0, 1, 2, 3, 4, 5, 6].map((i) => { const x = 60 + i * 160; return `<path d="M${x - 58} 1100 V920 Q${x} 830 ${x + 58} 920 V1100Z" fill="#7a5a4a"/><path d="M${x - 58} 1100 V920 Q${x} 830 ${x + 58} 920" stroke="#e2cca4" stroke-width="10" fill="none"/>`; }).join('')
      + `<rect x="-200" y="812" width="${W + 400}" height="24" fill="#8a4a3a"/>` + row)
    + ground(1130, '#a88a68', { rim: '#d2b48c' })
    + charles(410, 1345, 2.0, { mood: 'determined', talk: [0.6, S2C - 0.4], armR: [80, 6, 2.2], armL: 18 })
    + `<g transform="translate(810,650)"><g${M.in('pop', S2C, 0.9, 0, 0)}><circle r="170" fill="url(#haloGlow)"/><g${M.bob(5, 2.6)}><g transform="scale(3.6)">${book(false)}</g></g></g></g>`
    + motes(14, { y0: 600, y1: 1200, seed: 6 });
}

// 3 · the choice. Sad Charles dissolves into determined Charles, chalice in hand, on sentence 2.
const S3B = 7.0;
function scene3() {
  const kin = person(120, 1320, 1.5, { kind: 'layman', robe: true, top: '#5a3a6a', skin: SKIN.fair, hair: '#6b4a2a', mood: 'worried', talk: [0.6, S3B], armR: [72, 8, 1.8], armL: 12 })
    + person(310, 1330, 1.42, { kind: 'layman', girl: true, robe: true, top: '#2f5a7a', skin: SKC, hair: '#5a3a24', mood: 'worried', armR: [66, 6, 2.1], armL: 12 });
  return FAR(sky(SKIES.dusk, { stars: 12, seed: 7 }) + glow(760, 900, 460, 0.7))
    + BACK(clouds(500, { color: '#ffc9b0', op: 0.45, seed: 8, drift: 30 }) + romeSkyline(540, 1140, 0.9, { c: '#5a3f62' }))
    + MID(cypress(980, 1220, 1.0, '#2c3a3c') + graveCross(860, 1224, 1.0) + `<g transform="translate(860,1226)">${flowers(0, 8, 5, { seed: 3, x0: -40, x1: 40 })}</g>`)
    + ground(1216, '#5a3a4c', { rim: '#b87a7a' }) + tufts(1222, 10, '#3a2438', { seed: 4 })
    + kin
    + `<g${fadeOut(S3B)}>${charles(650, 1335, 2.0, { mood: 'sad', armL: 12, armR: 12 })}</g>`
    + `<g${fadeIn(S3B)}>${charles(650, 1335, 2.0, { mood: 'determined', armL: 12, armR: [46, 2, 3], propR: chalice(1.2) })}</g>`
    + motes(12, { y0: 620, y1: 1220, seed: 8 })
    + NEAR(foliage('l', 1640, { color: '#2a1a34', seed: 2 }));
}

// 4 · Milan; seminarians and the Sunday class appear on sentence 2
const S4B = 7.3;
function scene4() {
  const kids = [[555, '#d8644e', true], [680, '#4b8bc4', false], [805, '#e2b448', true], [930, '#6aa457', false]]
    .map(([x, top, girl], i) => person(x, 1365, 1.0, { mood: 'joy', kind: 'kid', top, girl, skin: i % 2 ? SKC : SKIN.priest, hair: i === 2 ? '#a06a30' : '#3a2a18', pants: '#3a3a4a', sitting: true, armL: 12, armR: i === 1 ? [120, 12, 1.3] : 12 })).join('');
  const sems = [[620, 'happy'], [750, 'joy'], [880, 'happy']].map(([x, mood], i) => person(x, 1195, 1.08, { kind: 'priest', beard: null, top: '#26222c', hair: i === 1 ? '#6b4a2a' : '#3a2a18', skin: i === 2 ? SKIN.fair : SKC, mood, armL: 12, armR: i === 1 ? 30 : 12, propR: i === 1 ? book(false) : undefined })).join('');
  return FAR(sky(MORN) + sun(120, 600, 56, 240))
    + BACK(clouds(500, { color: '#fff7e8', op: 0.6, seed: 12 }) + duomo(680, 1150, 1.12, { wall: '#ecd2bc', win: '#5f8cc0' }))
    + MID(lycianTown(180, 1170, 0.62, { wall: '#e6c8a2', roof: '#b4603e' }))
    + ground(1170, '#b8a488', { rim: '#dcc8a6' })
    + `<g${fadeIn(S4B)}>${sems}</g>`
    + charles(280, 1340, 2.05, { mood: 'joy', hat: mitre, under: cope, armL: [44, 2, 3], armR: [118, 10, 2], propL: archCross(190) })
    + `<g${fadeIn(S4B + 0.5)}>${kids}</g>`
    + petals(14, { seed: 6, colors: ['#ffffff', '#f2c46b'] });
}

// 5 · the shot in the chapel (figure in the doorway only; no weapon and no moment of harm is shown)
const S5B = 2.8, S5C = 8.9;
function scene5() {
  const altar = `<rect x="760" y="1050" width="280" height="180" fill="#efe4cc"/><rect x="760" y="1050" width="280" height="26" fill="#c9a24a"/><rect x="930" y="1076" width="110" height="154" fill="#b8ad94" opacity=".55"/>`
    + `<path d="M900 1050 V880 M868 930 H932" stroke="${GOLD}" stroke-width="11" stroke-linecap="round"/>`
    + `<g transform="translate(800,1050) scale(1.6)">${candle}</g><g transform="translate(1000,1050) scale(1.6)">${candle}</g>`;
  const silhouette = `<g transform="translate(120,1230)" fill="#0e0a14"><circle cy="-262" r="42"/><path d="M-62 0 Q-70 -190 0 -220 Q70 -190 62 0Z"/></g>`;
  const household = person(285, 1255, 0.95, { kind: 'priest', top: '#26222c', kneel: true, beard: null, skin: SKC, hair: '#3a2a18', mood: 'peaceful', armL: -18, armR: -18 });
  return FAR(chapelRoom(1230) + `<rect x="-200" y="1230" width="${W + 400}" height="800" fill="#3a2a3e"/>`)
    + MID(altar)
    + `<ellipse cx="880" cy="1100" rx="460" ry="420" fill="#ffcf8a" opacity=".16" filter="url(#blur14)"/>`
    + ground(1230, '#3a2a3e', { rim: '#7a6070' })
    + household
    + `<g${M.tw([{ at: S5B + 1.2, dur: 1.0, from: { opacity: 0 }, to: { opacity: 0.92 } }, { at: S5C, dur: 0.8, from: { opacity: 0.92 }, to: { opacity: 0 } }])}>${silhouette}</g>`
    + `<g${fadeIn(S5C, 1.0)}>${glow(600, 1040, 420, 0.8)}${sparkles(14, 400, 800, 800, 1300, { seed: 5, color: '#fff2c4' })}</g>`
    + charles(600, 1345, 2.0, { mood: 'peaceful', kneel: true, armL: -18, armR: -18 })
    + motes(14, { x0: 620, x1: 1060, y0: 800, y1: 1200, color: '#ffe0a0', seed: 3 })
    + NEAR(foliage('l', 1700, { color: '#160f1e', seed: 5 }));
}

// 6 · plague: he stays, the bed leaves on the cart, bread for the hungry, then the barefoot procession with the Holy Nail
const S6B = 7.2, S6C = 13.7;
const PLAGUE = [[0, '#3e4a64'], [0.34, '#74809a'], [0.7, '#b0a6a0'], [1, '#b0a6a0']];
function scene6() {
  const family = person(925, 1340, 1.45, { kind: 'layman', robe: true, top: '#6a5f58', skin: SKC, hair: '#4a3424', beard: '#4a3424', mood: 'worried', flip: true, armR: [60, 6, 1.8], armL: 12 })
    + person(835, 1352, 1.0, { kind: 'kid', top: '#8a7a6a', pants: '#4a4048', skin: SKC, hair: '#2a1a10', mood: 'worried', flip: true, armL: 10, armR: 10 });
  const walkers = [90, 225, 360, 720, 855, 990].map((x, i) => person(x, 1205, 0.98, { kind: 'priest', beard: i % 3 ? null : '#4a3424', top: i % 2 ? '#3a3440' : '#57505a', collar: false, skin: i % 2 ? SKC : SKIN.priest, hair: '#3a2a18', mood: 'peaceful', armL: 12, armR: [52, 2, 3], propR: candle })).join('');
  return FAR(sky(PLAGUE) + glow(760, 620, 300, 0.25))
    + BACK(clouds(470, { color: '#8a92a8', op: 0.7, seed: 4, drift: 30 }) + duomo(800, 1110, 0.86, { wall: '#a8a2ac', win: '#5a6680', door: '#524c5e' }))
    + MID(lycianTown(540, 1150, 0.88, { wall: '#a8988c', roof: '#6a5650' }))
    + ground(1160, '#7a7068', { rim: '#a89e92' })
    + `<g${fadeIn(S6C, 1.0)}>${walkers}</g>`
    + `<g${fadeIn(S6B - 0.5)}><g${M.tw([{ at: S6B, dur: 7, from: { x: 0 }, to: { x: -240 }, ease: 'none' }])}>${bedCart(240, 1300, 1.25)}</g></g>`
    + `<g${fadeOut(S6C + 0.4, 0.8)}>${family}</g>`
    + `<g${fadeOut(S6C)}>${charles(540, 1340, 2.1, { mood: 'determined', armL: [14, 2, 3], armR: [58, 3, 2.4], propR: bread_basket() })}</g>`
    + `<g${fadeIn(S6C)}>${charles(540, 1340, 2.1, { mood: 'peaceful', penitent: true, hat: '', armL: [46, 2, 3], armR: 12, propL: archCross(210, { nail: true }) })}</g>`
    + motes(12, { color: '#d8d4cc', seed: 8, y0: 620, y1: 1260 })
    + NEAR(foliage('r', 1680, { color: '#26232c', seed: 3 }));
}

// 7 · death, November 3, 1584
function scene7() {
  const mourners = [[175, 'sad', 0], [905, 'peaceful', 1]].map(([x, mood, i]) => person(x, 1300, 1.3, { kind: 'priest', beard: null, top: '#2a2533', skin: i ? SKIN.priest : SKC, hair: '#3a2a18', mood, flip: i === 1, armL: 40, armR: 40 })).join('');
  return FAR(sky(SKIES.deep, { stars: 44, seed: 9 }) + rays(540, 700, { op: 0.07 }))
    + BACK(duomo(800, 1190, 0.95, { wall: '#65507a', win: '#ffd98a', door: '#3e2e54' }) + hill(1200, 14, '#4a3560', 5))
    + ground(1225, '#44324e', { rim: '#8a6a8a' }) + tufts(1232, 10, '#2a1c34', { seed: 7 })
    + `<g${fadeIn(2.6, 3)}>${beam(450, 640, 310, 770, 1340, 0.55)}${motes(14, { x0: 360, x1: 720, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + mourners
    + charles(540, 1335, 1.95, { mood: 'peaceful', hat: '', penitent: true, halo: 3.0, armL: [22, 2, 3], armR: [22, 2, 3.3] })
    + NEAR(foliage('l', 1640, { color: '#1c1428', seed: 2 }));
}

// 8 · canonized, 1610
function scene8() {
  const banner = `<g transform="translate(540,560)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${charles(0, 408, 1.05, { mood: 'happy', halo: true, penitent: true, armL: 44, armR: [100, 4, 2.6], propL: archCross(170) })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7))
    + BACK(clouds(820, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + basilica(540, 1180, 1.05, { color: '#3a2a40' }))
    + banner
    + ground(1180, '#3a2a40')
    + MID(followers(1400, 14, { color: '#241a2e' }))
    + petals(26, { seed: 4, colors: ['#ffffff', '#f2c46b', '#f2a0b0'] });
}

// 9 · feast day, patronage, the motto
const S9B = 6.7;
function scene9() {
  const kids = [[105, '#4b8bc4', SKC, false], [225, '#e2b448', SKIN.fair, true], [850, '#d8644e', '#a06a44', true], [975, '#6aa457', SKIN.priest, false]]
    .map(([x, top, skin, girl], i) => person(x, 1335, 1.2, { mood: 'joy', kind: 'kid', top, skin, girl, flip: i > 1, hair: i === 1 ? '#c98a3a' : '#2a1a10', pants: '#3a3a4a', armL: i === 0 || i === 3 ? [120, 14, 1.3] : 14, armR: 14 })).join('');
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(620, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 6 }) + duomo(800, 1190, 0.85, { wall: '#7a5a80', win: '#ffd98a', door: '#4a3458' }) + hill(1210, 18, '#5d3f6c', 3, { freq: 1.6 }))
    + glow(540, 1050, 500, 0.8)
    + ground(1260, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1266, 10, '#3a2438', { seed: 7 })
    + charles(540, 1305, 2.15, { mood: 'joy', halo: 0.3, penitent: true, armL: [46, 2, 3], armR: [100, 7, 2.6], propL: archCross(190) })
    + kids
    + `<g transform="translate(540,445)"><g${M.in('pop', S9B, 0.9, 0, 0)}>${humilitas(0, 0, 1)}</g></g>`
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + petals(10, { seed: 3, colors: ['#ffe2a0', '#ffffff'] })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_charles_borromeo', name: 'St_Charles_Borromeo',
  voice: 'am_michael', speed: 1.0,
  thumb_hook: 'He sold his own bed for the poor', thumb_title: 'St. Charles Borromeo', thumb_shift: 20, thumb_t: 4.5,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1170, 'l']],
  fix: {
    'bˈɔɹoʊmɪˌoʊ': 'bˌɔːɹəmˈeɪoʊ',            // Borromeo
    'mˈæɡɪɹ': 'mɑːdʒˈɔːɹeɪ',                   // Maggiore
    'æɹˈoʊnə': 'ɑːɹˈoʊnə',                     // Arona
    'kˈæɾɪtʃˌɪzəm': 'kˈæɾəkˌɪzəm',             // Catechism
    'hjˌuːmɪlˈiːɾəz': 'huːmˈiːlɪtˌɑːs',        // Humilitas (Latin)
    'noʊvˈɛmbɚ θɹˈiː': 'noʊvˈɛmbɚ θˈɜːd',      // November 3 -> third
    'noʊvˈɛmbɚ fˈɔːɹ': 'noʊvˈɛmbɚ fˈɔːɹθ',     // November 4 -> fourth
  },
  scenes: [
    { kicker: 'CARDINAL AND SERVANT', title: 'St. Charles Borromeo', art: scene0, cam: { move: 'push', amt: 0.07, oy: 950 },
      say: ['He was a cardinal at just 21, yet he sold his own bed for the sick and the poor.', 'This is Saint Charles Borromeo.'] },
    { kicker: '1538 · ARONA, ITALY', title: "The Pope's Nephew", art: scene1, cam: 'pan-r',
      say: ['Charles was born in 1538, in the castle of Arona, on Lake Maggiore.',
        'When his uncle became Pope Pius IV, he made the young Charles a cardinal.'] },
    { kicker: '1562 · ROME AND TRENT', title: 'Council of Trent', art: scene2, cam: { move: 'pull', amt: 0.07, oy: 1050 },
      say: ['Charles worked tirelessly to bring the stalled Council of Trent back together, and see it through to 1563.',
        'Then he helped produce the Roman Catechism.'] },
    { kicker: '1563 · ROME', title: 'His Choice', art: scene3, cam: 'drift-l',
      say: ['During the council, his older brother died, and his family urged him to leave the clergy and marry.',
        'Instead, Charles became a priest, and then a bishop.'] },
    { kicker: '1565 · MILAN', title: 'A Bishop Comes Home', art: scene4, cam: 'pan-l',
      say: ['In 1565, he entered Milan, which had gone over eighty years without a resident bishop.',
        'He founded seminaries for priests, and Sunday classes for children.'] },
    { kicker: 'OCTOBER 26, 1569 · MILAN', title: 'A Shot in the Chapel', art: scene5, cam: { move: 'push', amt: 0.08, ox: 600, oy: 1050 },
      say: ['In 1569, as he knelt at evening prayer, a man from a religious order he was reforming fired a shot at him.',
        'The ball did not pierce his robes, and Charles survived.'] },
    { kicker: '1576 · MILAN', title: 'Plague in Milan', art: scene6, cam: 'pan-r',
      say: ['In 1576, famine and plague struck Milan, and many of the rich fled. Charles stayed.',
        'He visited the sick, sold even his bed, and tried to feed more than 60,000 people a day.',
        'He walked in procession barefoot, with a rope around his neck, carrying the relic of the Holy Nail.'] },
    { kicker: 'NOVEMBER 3, 1584 · MILAN', title: 'Home to God', art: scene7, cam: 'tilt-up',
      say: ['Worn out, he fell ill on retreat, and died in Milan on November 3, 1584, at just 46.',
        'One account gives his last words as, See, Lord, I am coming.'] },
    { kicker: 'NOVEMBER 1, 1610 · ROME', title: 'Canonized', art: scene8, cam: { move: 'pull', amt: 0.06, oy: 800 },
      say: ['In 1610, just 26 years after his death, Pope Paul V declared him a saint.'] },
    { kicker: 'FEAST DAY · NOVEMBER 4', title: 'Patron of Catechists', art: scene9, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['His feast day is November 4. He is a patron of bishops, catechists and seminarians.',
        'His motto was one word, Humilitas, humility.', 'Saint Charles Borromeo, pray for us.'] },
  ],
};
