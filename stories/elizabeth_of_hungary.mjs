// St. Elizabeth of Hungary (feast: November 17). Princess in a rose gown and blue mantle with a crown (exported),
// little princess, Landgrave Ludwig (also as a crusader on horseback), Franciscan grey habit, Wartburg Castle (exported),
// castle chapel interior with crucifix, famine bread line, Marburg hospital ward with cots (exported), rose shower.
import { W, M, SKIES, SKIN, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, butterflies, person, roses, bread_basket, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { mantleBack, candle, followers } from './peter.mjs';
import { horse, rider, romChurch } from './martin_of_tours.mjs';
import { crucifix, altar } from './padre_pio.mjs';
import { crownProp } from './kolbe.mjs';
import { babyBundle } from './aparecida.mjs';
import { chateau, gothic } from './joan_of_arc.mjs';
import { tree } from './francis.mjs';
import { leo } from './leo_the_great.mjs';

const SKE = SKIN.fair, HAIRE = '#b8863a', GOWN = '#a8344e', MANTLE = '#2f4a8a', GREY = '#8a8580';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];
const WINTER = [[0, '#3a4a78'], [0.4, '#8a8cb8'], [0.68, '#e8b8a0'], [1, '#f4d0b0']];
const GREYSKY = [[0, '#4a4e6a'], [0.4, '#8a8a9e'], [0.7, '#c8b8a8'], [1, '#d8c4a8']];

// ---------------------------------------------------------------- Elizabeth, Ludwig and people
const trim = `<path d="M-16 -208 Q0 -194 16 -208" stroke="${GOLD}" stroke-width="4" fill="none"/><path d="M-36 -122 Q0 -112 36 -122" stroke="${GOLD}" stroke-width="7" fill="none"/>`
  + `<circle cx="0" cy="-116" r="5" fill="${GOLD}"/>`;
export const elizabeth = (x, y, s, { under = '', over = '', mantle = true, ...o } = {}) => person(x, y, s, {
  kind: 'royal', girl: true, top: GOWN, skin: SKE, hair: HAIRE, ...o, under: (mantle ? mantleBack(MANTLE) : '') + under, over: trim + over });
export const littleElizabeth = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', girl: true, robe: true, top: '#d8648a', skin: SKE, hair: HAIRE, crown: true, ...o });
// Franciscan years: plain grey habit, white veil, cord
export const elizabethGrey = (x, y, s, o = {}) => person(x, y, s, { kind: 'nun', top: GREY, veil: '#f2ede2', skin: SKE, cord: true, ...o });
const ermine = '<path d="M-40 -212 Q0 -196 40 -212 Q46 -194 36 -184 Q0 -174 -36 -184 Q-46 -194 -40 -212Z" fill="#f6f2ea"/>'
  + '<g fill="#2b1d14"><circle cx="-24" cy="-194" r="2.4"/><circle cx="0" cy="-186" r="2.4"/><circle cx="24" cy="-194" r="2.4"/></g>';
export const ludwig = (x, y, s, { under = '', over = '', ...o } = {}) => person(x, y, s, {
  kind: 'royal', top: '#2f6a5a', skin: SKIN.priest, hair: '#7a5232', beard: '#7a5232', ...o, under: mantleBack('#8a2e3a') + under, over: ermine + over });
const crusaderCross = '<path d="M0 -196 V-120 M-24 -170 H24" stroke="#c8323a" stroke-width="12"/>';
const crusader = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#f4efe4', pants: '#5a5a6a', skin: SKIN.priest, hair: '#7a5232', beard: '#7a5232', crown: false, ...o, over: crusaderCross });
const POOR = ['#8a6a4a', '#6a6a5a', '#7a5a4a', '#5a6a7a'], POORSK = [SKIN.priest, '#e0b08a', '#d8a47a', SKIN.fair];
const poor = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', top: POOR[i % 4], pants: '#4a3a32', skin: POORSK[i % 4], hair: ['#4a3424', '#2a1e16', '#8a6a4a', '#3a2a1e'][i % 4],
  beard: i === 1 ? '#2a1e16' : null, girl: i === 2, robe: i === 2, ...o, over: `<rect x="-20" y="-160" width="16" height="14" rx="3" fill="${dark(POOR[i % 4], 0.25)}"/>` + (o.over || '') });
const kidPoor = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'kid', top: ['#c87a4a', '#6a8ab0', '#b8a05a'][i % 3], skin: POORSK[(i + 1) % 4], hair: '#3a2a1e', girl: i % 2 === 1, ...o });

// ---------------------------------------------------------------- props
const goldCrown = (s = 1) => crownProp(GOLD, s);
const bread = '<g transform="translate(0,-4)"><ellipse rx="18" ry="11" fill="#d9a04f"/><path d="M-10 -4 q4 -4 8 0 M2 -4 q4 -4 8 0" stroke="#b07a3a" stroke-width="2.5" fill="none"/></g>';
const roseBunch = (s = 1) => `<g transform="scale(${s})"><circle r="40" fill="url(#haloGlow)" opacity=".7"/>${roses(1)}</g>`;
// A few roses dropping from the hands to the ground, timed to the reveal
const roseFall = (x0, y0, at, seed = 1) => [0, 1, 2, 3, 4].map((i) => {
  const dx = ((i * 37 + seed * 23) % 120) - 60, dy = 120 + ((i * 53) % 110);
  return `<g transform="translate(${x0 + dx},${y0 + dy})"><g${M.tw([{ at: at + i * 0.25, dur: 0.9, from: { y: -dy, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.in' }])}>${roses(0.8)}</g></g>`;
}).join('');
const arpad = (h = 260) => `<g><rect x="-4" y="${-h}" width="8" height="${h + 40}" rx="3" fill="#7a5536"/><circle cy="${-h - 6}" r="7" fill="${GOLD}"/><g transform="translate(4,${-h + 4})"><g${M.sway(5, 1.6, 0, 0, 0)}>`
  + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<rect x="0" y="${k * 10}" width="84" height="10" fill="${k % 2 ? '#f6f2e8' : '#c8323a'}"/>`).join('') + '</g></g></g>';

// ---------------------------------------------------------------- set pieces
// Wartburg Castle: Romanesque hall with an arcade, square keep with a cross, half-timbered wing, walls, wooded crag
export function wartburg(x, y, s = 1, { wall = '#dccab0', roof = '#8a4a3a', timber = '#6b4a2a', win = '#ffd98a', crag = '#4f7a4a', shade = 0.2 } = {}) {
  const arc = (ax, ay) => `<path d="M${ax - 11} ${ay} v-24 a11 11 0 0 1 22 0 v24Z" fill="${win}" opacity=".85"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<path d="M-470 120 Q-420 10 -300 -10 Q0 -40 300 -10 Q430 10 470 120Z" fill="${crag}"/><path d="M60 -30 Q330 -12 470 120 L240 120Z" fill="${dark(crag, 0.25)}" opacity=".6"/>`
    + [-380, -250, 290, 400].map((tx, i) => `<circle cx="${tx}" cy="${10 + (i % 2) * 20}" r="${48 + (i % 2) * 14}" fill="${i % 2 ? light(crag, 0.1) : dark(crag, 0.08)}"/>`).join('')
    + `<rect x="-430" y="-60" width="860" height="60" fill="${dark(wall, 0.08)}"/>` + Array.from({ length: 22 }, (_, i) => `<rect x="${-430 + i * 40}" y="-76" width="22" height="18" fill="${dark(wall, 0.08)}"/>`).join('')
    + `<rect x="-400" y="-230" width="150" height="190" fill="${light(wall, 0.12)}"/><path d="M-400 -230 L-250 -40 M-250 -230 L-400 -40 M-400 -135 H-250 M-325 -230 V-40" stroke="${timber}" stroke-width="7"/>`
    + `<path d="M-414 -230 L-325 -320 L-236 -230Z" fill="${dark(roof, 0.08)}"/>`
    + `<rect x="-250" y="-260" width="400" height="220" fill="${wall}"/><rect x="60" y="-260" width="90" height="220" fill="${dark(wall, shade)}" opacity=".5"/>`
    + `<path d="M-266 -260 L-200 -330 L100 -330 L166 -260Z" fill="${roof}"/><path d="M40 -330 L100 -330 L166 -260 L80 -260Z" fill="${dark(roof, 0.25)}"/>`
    + [-200, -150, -100, -50, 0, 50, 100].map((ax) => arc(ax, -170)).join('') + [-180, -100, -20, 60].map((ax) => arc(ax, -80)).join('')
    + `<rect x="170" y="-430" width="130" height="390" fill="${light(wall, 0.05)}"/><rect x="250" y="-430" width="50" height="390" fill="${dark(wall, shade)}" opacity=".5"/>`
    + `<path d="M160 -430 L235 -520 L310 -430Z" fill="${roof}"/><path d="M235 -520 L310 -430 L262 -430Z" fill="${dark(roof, 0.25)}"/>`
    + `<path d="M235 -520 v-70 M212 -566 h46" stroke="${GOLD}" stroke-width="9"/>` + arc(235, -340) + arc(235, -250)
    + `<path d="M-30 0 V-50 a30 30 0 0 1 60 0 V0Z" fill="${dark(wall, 0.5)}"/></g>`;
}
// Stone hall interior (castle chapel or hospital ward): back wall, round-arched window, two pillars
function stoneHall(floor = 1260, { wallC = '#6a5248', light2 = '#8a6a5a', win = '#ffe2a0', winX = 540, winY = 640 } = {}) {
  let blocks = '';
  for (let r = 0; r < 12; r++) for (let c = 0; c < 9; c++) {
    const x = -160 + c * 160 + (r % 2) * 80, y = 300 + r * 80;
    if (y < floor) blocks += `<rect x="${x}" y="${y}" width="150" height="72" rx="8" fill="${(r + c) % 3 ? wallC : light2}" opacity=".55"/>`;
  }
  return `<rect x="-200" y="-400" width="${W + 400}" height="${floor + 440}" fill="${dark(wallC, 0.2)}"/>${blocks}`
    + `<path d="M${winX - 110} ${winY + 200} V${winY} a110 110 0 0 1 220 0 V${winY + 200}Z" fill="${win}"/><path d="M${winX - 110} ${winY + 200} V${winY} a110 110 0 0 1 220 0 V${winY + 200}Z" fill="url(#sunGlow)" opacity=".7"/>`
    + `<path d="M${winX} ${winY - 110} V${winY + 200} M${winX - 110} ${winY + 60} H${winX + 110}" stroke="${dark(wallC, 0.3)}" stroke-width="10"/>`
    + [120, 960].map((px) => `<rect x="${px - 40}" y="360" width="80" height="${floor - 360}" fill="${light(wallC, 0.12)}"/><rect x="${px + 10}" y="360" width="30" height="${floor - 360}" fill="${dark(wallC, 0.25)}" opacity=".6"/><rect x="${px - 54}" y="340" width="108" height="30" rx="6" fill="${light(wallC, 0.2)}"/>`).join('')
    + `<path d="M-200 340 Q540 120 1280 340" stroke="${light(wallC, 0.15)}" stroke-width="30" fill="none"/>`;
}
// Hospital cot with a patient sitting up under a blanket
export function cot(x, y, s = 1, { blanket = '#6a7fa8', who = '' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-110" width="16" height="110" fill="#6a4a30"/><rect x="134" y="-80" width="16" height="80" fill="#6a4a30"/>`
    + `<rect x="-146" y="-70" width="292" height="22" fill="#7e5a3c"/>${who}<path d="M-120 -120 Q20 -136 146 -96 L146 -62 L-120 -62Z" fill="${blanket}"/>`
    + `<path d="M-120 -120 Q20 -136 146 -96" stroke="${light(blanket, 0.3)}" stroke-width="6" fill="none"/></g>`;
}
const sack = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40 0 Q-50 -70 -24 -90 L24 -90 Q50 -70 40 0Z" fill="#c8a870"/><path d="M8 -90 L24 -90 Q50 -70 40 0 L14 0Z" fill="#a8885a" opacity=".6"/><path d="M-24 -90 Q0 -80 24 -90" stroke="#8a6a3a" stroke-width="6" fill="none"/></g>`;

// ---------------------------------------------------------------- scene timing (sentence starts from timings.json + ~0.5 s)
const T0B = 5.0, T2B = 4.4, T3A = 2.8, T4B = 3.2, T5B = 5.6, T6B = 6.1;

// ---------------------------------------------------------------- scenes
// 0 · hook: bread in the cloak, then roses
function scene0() {
  return FAR(sky(WINTER, { stars: 16, seed: 3 }) + glow(470, 1060, 520, 0.8))
    + BACK(clouds(560, { color: '#f4d0c0', op: 0.5, drift: 40, seed: 5 }) + hill(1110, 40, '#6a6a96', 2, { freq: 1.4 }) + wartburg(760, 1050, 0.62, { crag: '#4a5a6a', wall: '#d8c4b0', roof: '#7a3e3a' }))
    + MID(hill(1200, 16, '#5a6a7a', 6) + tree(1010, 1240, 0.5, '#3e5a5a'))
    + ground(1250, '#d8d6e4', { rim: '#ffffff' }) + tufts(1256, 10, '#9a9ab4', { seed: 7 })
    + `<ellipse cx="460" cy="1300" rx="300" ry="40" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>`
    + `<g${fadeOut(T0B, 0.5)}>${ludwig(935, 1300, 1.7, { flip: true, mood: 'surprised', armL: 12, armR: [70, 3, 2.4] })}</g>`
    + `<g${fadeIn(T0B, 0.5)}>${ludwig(935, 1300, 1.7, { flip: true, mood: 'joy', armL: 12, armR: [40, 3, 2.4] })}</g>`
    + `<g${fadeOut(T0B, 0.5)}>${elizabeth(410, 1310, 2.2, { mood: 'surprised', armL: [30, 2, 3], armR: [30, 2, 3.2], propR: bread_basket() })}</g>`
    + `<g${fadeIn(T0B, 0.5)}>${elizabeth(410, 1310, 2.2, { mood: 'joy', armL: [80, 3, 2.6], armR: [80, 3, 2.9], propL: roseBunch(1.7), propR: roseBunch(1.7) })}</g>`
    + roseFall(410, 1150, T0B + 0.3, 2)
    + `<g${fadeIn(T0B, 1.0)}>${sparkles(16, 200, 700, 760, 1200, { seed: 4, color: '#ffe0e8' })}</g>`
    + motes(14, { y0: 520, y1: 1240, seed: 4, color: '#ffffff' })
    + NEAR(foliage('l', 1620, { color: '#2a2a40' }));
}

// 1 · born 1207, princess of Hungary; sent to the Wartburg at four
function scene1() {
  return FAR(sky(SKIES.sunrise) + sun(240, 620, 58, 300))
    + BACK(clouds(430, { color: '#fff7e8', op: 0.75, seed: 2 }) + hill(1060, 50, '#c0a8b8', 3, { freq: 1.3 })
      + chateau(170, 1130, 0.5, { wall: '#ecdcc4', roof: '#a8423a' }) + wartburg(930, 1080, 0.42, { crag: '#7a9a6a' }))
    + MID(hill(1170, 20, '#8aae6a', 5, { freq: 1.6, top: '#a8c87a' }) + tree(-20, 1220, 0.55, '#4b8a50'))
    + ground(1230, '#9ab66a', { rim: '#c8d898' }) + flowers(1240, 1320, 12, { seed: 6 }) + tufts(1236, 12, '#6a8a3a', { seed: 3 })
    + person(130, 1300, 1.5, { kind: 'royal', top: '#a8423a', skin: SKIN.fair, hair: '#6a4a2a', beard: '#6a4a2a', mood: 'happy', under: mantleBack('#2f4a6a'), armL: 12, armR: [130, 12, 1.4] })
    + `<g${M.tw([{ at: 0.4, dur: 9, from: { x: -40 }, to: { x: 90 }, ease: 'sine.inOut' }])}>`
    + horse(560, 1310, 0.95, { c: '#f2ece0', mane: '#d9cfbf', cloth: '#c8323a', walk: true })
    + rider(littleElizabeth, 560, 1310, 0.95, 1.15, { mood: 'joy', armL: [40, 3, 2.4], armR: [120, 10, 1.6] })
    + `<g transform="translate(330,1310)">${person(0, 0, 1.25, { kind: 'layman', top: '#5a6a8a', pants: '#3a3a4a', skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424', mood: 'happy', armL: 10, armR: [40, 2, 2.6], propR: arpad(240) })}</g></g>`
    + butterflies(2, { y0: 940, y1: 1100 })
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 9 }));
}

// 2 · married Ludwig at fourteen; three children
function scene2() {
  const kids = `<g${fadeIn(T2B, 0.9)}>`
    + kidPoor(150, 1320, 1.05, 0, { top: '#3f6fb8', skin: SKE, hair: HAIRE, girl: false, mood: 'joy', armL: [120, 12, 1.3] })
    + kidPoor(930, 1320, 1.0, 1, { top: '#d8648a', skin: SKE, hair: '#7a5232', girl: true, robe: true, mood: 'joy', flip: true, armR: [120, 12, 1.4] }) + '</g>';
  return FAR(sky(DAYSKY) + sun(860, 520, 56, 260))
    + BACK(clouds(420, { seed: 6 }) + hill(1040, 46, '#a8c4c0', 4, { freq: 1.2 }) + wartburg(540, 1000, 0.8))
    + MID(hill(1180, 14, '#7aa868', 2))
    + ground(1220, '#86b06a', { rim: '#b4d890' }) + tufts(1226, 14, '#5a8a4a', { seed: 8 }) + flowers(1230, 1320, 14, { seed: 5, colors: ['#f28fa6', '#ffffff', '#d8404e'] })
    + ludwig(640, 1310, 2.0, { flip: true, mood: 'joy', armL: [40, 3, 2.6], armR: [30, 2, 3] })
    + elizabeth(430, 1315, 1.95, { mood: 'joy', armL: [30, 2, 3], armR: [40, 3, 2.8] })
    + kids
    + petals(16, { seed: 3, colors: ['#f6b9c8', '#ffffff', '#e2566a'] })
    + NEAR(bokeh(6, { seed: 7 }) + foliage('l', 1640, { color: '#2f5a35' }));
}

// 3 · the crown laid before the crucifix (Feast of the Assumption)
function scene3() {
  return FAR(stoneHall(1260, { winY: 600 }))
    + BACK(`<g transform="translate(540,1170)">${crucifix(1.05)}</g>` + glow(540, 760, 300, 0.5))
    + beam(450, 640, 330, 760, 1300, 0.4)
    + MID(altar(540, 1250, 1.0, { cross: false }))
    + ground(1260, '#4a3a36', { rim: '#8a6a5a' })
    + `<g transform="translate(600,1060)"><g${M.in('pop', T3A, 0.8, 0, 0)}>${goldCrown(1.35)}</g></g>`
    + person(890, 1310, 1.6, { kind: 'royal', girl: true, top: '#5a3a6a', skin: SKIN.priest, hair: '#b0a8a0', veil: '#e8e0d2', mood: 'stern', flip: true, armL: 12, armR: [40, 3, 2.6], under: mantleBack('#3a2a4a') })
    + `<g${fadeOut(T3A, 0.6)}>${elizabeth(410, 1330, 1.95, { kneel: true, mantle: false, mood: 'peaceful', armL: [28, 2, 3], armR: [28, 2, 3.2] })}</g>`
    + `<g${fadeIn(T3A, 0.6)}>${elizabeth(410, 1330, 1.95, { kneel: true, mantle: false, crown: false, mood: 'peaceful', armL: [28, 2, 3], armR: [28, 2, 3.2] })}</g>`
    + motes(14, { x0: 300, x1: 800, y0: 560, y1: 1200, color: '#fff2c4', seed: 6 })
    + NEAR(bokeh(6, { seed: 13, op: [0.25, 0.55] }));
}

// 4 · famine of 1226: bread for the hungry, a hospital below the castle
function scene4() {
  const line = [[700, 0, 'sad'], [830, 2, 'worried'], [960, 1, 'sad']];
  const mk = (mood) => line.map(([x, i, m]) => poor(x, 1300, 1.3, i, { mood: mood || m, flip: true, armL: [30, 2, 3], armR: 10 })).join('')
    + kidPoor(590, 1315, 1.0, 0, { mood: mood || 'worried', flip: true, armL: [70, 3, 2.4] });
  return FAR(sky(GREYSKY) + glow(300, 760, 300, 0.4))
    + BACK(clouds(480, { color: '#c8c0c8', op: 0.6, seed: 4, drift: 30 }) + wartburg(300, 960, 0.6, { crag: '#5a6a5a', wall: '#cdbca4' }) + hill(1100, 30, '#8a8a6a', 5))
    + MID(romChurch(870, 1180, 0.7, { wall: '#d8c8a8', roof: '#7a4a3a' }) + sack(90, 1250, 1.2) + sack(180, 1260, 1.0))
    + ground(1230, '#a89470', { rim: '#d0bc94' }) + tufts(1236, 10, '#7a6a4a', { seed: 5 })
    + `<g${fadeOut(T4B)}>${mk(null)}</g><g${fadeIn(T4B)}>${mk('joy')}</g>`
    + elizabeth(340, 1315, 2.0, { mood: 'happy', armL: [30, 2, 3], armR: [78, 4, 2.4], propL: bread_basket(), propR: bread })
    + motes(10, { y0: 620, y1: 1200, seed: 3 })
    + NEAR(foliage('l', 1660, { color: '#3a3a2a', seed: 3 }));
}

// 5 · 1227: Ludwig leaves for the Crusade and dies of fever; a widow at twenty
function scene5() {
  const goingAway = `<g${M.tw([{ at: 0.3, dur: 5, from: { x: 0 }, to: { x: 260 }, ease: 'sine.in' }])}><g${fadeOut(T5B - 1.2, 1.4)}>`
    + horse(760, 1180, 0.7, { c: '#6a4a3a', mane: '#3a2a20', cloth: '#f4efe4', walk: true })
    + rider(crusader, 760, 1180, 0.7, 0.95, { mood: 'happy', armL: 12, armR: [130, 10, 1.6] }) + '</g></g>';
  return FAR(sky(SKIES.dusk, { stars: 20, seed: 6 }) + glow(760, 900, 340, 0.5))
    + BACK(clouds(520, { color: '#ffc9b0', op: 0.4, seed: 2, drift: 30 }) + hill(1100, 40, '#5d3f6c', 3, { freq: 1.4 }))
    + MID(wartburg(170, 1180, 0.55, { crag: '#3e3a5a', wall: '#a8909a', roof: '#4a2e3e', win: '#ffd98a' }) + hill(1200, 14, '#4e3458', 6))
    + ground(1230, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1236, 10, '#3a2438', { seed: 7 })
    + goingAway
    + `<g${fadeOut(T5B, 0.6)}>${elizabeth(440, 1315, 1.95, { mood: 'worried', armL: [130, 10, 1.6], armR: [40, 2, 3], propR: babyBundle })}</g>`
    + `<g${fadeIn(T5B, 0.6)}>${elizabeth(440, 1315, 1.95, { mood: 'sad', crown: false, armL: [30, 2, 3], armR: [40, 2, 3], propR: babyBundle })}</g>`
    + kidPoor(210, 1325, 1.0, 0, { top: '#3f6fb8', skin: SKE, hair: HAIRE, mood: 'sad', armL: 10, armR: 20 })
    + kidPoor(650, 1325, 0.95, 1, { top: '#d8648a', skin: SKE, hair: '#7a5232', girl: true, robe: true, mood: 'sad', flip: true, armR: 20 })
    + motes(10, { y0: 700, y1: 1250, seed: 5 })
    + NEAR(foliage('r', 1650, { color: '#2a1a34', seed: 4 }));
}

// 6 · 1228, Marburg: a lay Franciscan nursing the sick in her hospital
function scene6() {
  const sick1 = person(0, -60, 0.95, { kind: 'layman', top: '#d8d0c0', skin: '#d8b08a', hair: '#3a2a1e', beard: '#3a2a1e', sitting: true, mood: 'worried', armL: 20, armR: 20 });
  const sick1b = person(0, -60, 0.95, { kind: 'layman', top: '#d8d0c0', skin: '#d8b08a', hair: '#3a2a1e', beard: '#3a2a1e', sitting: true, mood: 'happy', armL: 20, armR: 20 });
  const sick2 = person(0, -60, 0.9, { kind: 'elder', sitting: true, mood: 'happy', armL: 20, armR: [60, 4, 2.6] });
  return FAR(stoneHall(1250, { wallC: '#8a7260', light2: '#a8907a', winX: 540, winY: 560 }))
    + BACK(`<g transform="translate(860,700) scale(0.28)">${crucifix(1)}</g>`)
    + beam(440, 640, 300, 780, 1300, 0.35)
    + ground(1250, '#6a5446', { rim: '#a8907a' })
    + MID(cot(800, 1240, 1.0, { blanket: '#8a7a5a', who: `<g transform="translate(-60,0)"><g${fadeOut(T6B)}>${sick2}</g><g${fadeIn(T6B)}>${sick2}</g></g>` }))
    + cot(245, 1300, 1.1, { blanket: '#6a7fa8', who: `<g transform="translate(-50,0)"><g${fadeOut(T6B)}>${sick1}</g><g${fadeIn(T6B)}>${sick1b}</g></g>` })
    + person(990, 1300, 1.25, { kind: 'friar', skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424', mood: 'happy', flip: true, armL: [40, 3, 2.6], propL: bread_basket() })
    + elizabethGrey(510, 1320, 2.0, { mood: 'happy', talk: [0.4, 2.5], armL: [70, 4, 2.4], armR: [30, 2, 3], propL: '<g transform="translate(0,-6)"><path d="M-22 -8 Q0 18 22 -8Z" fill="#c9b79a"/><ellipse cy="-8" rx="22" ry="6" fill="#e8d8b8"/></g>' })
    + motes(12, { x0: 300, x1: 800, y0: 600, y1: 1200, color: '#fff2c4', seed: 8 })
    + NEAR(bokeh(6, { seed: 17, op: [0.25, 0.55] }));
}

// 7 · death, November 17, 1231, at twenty-four
function scene7() {
  const sisters = [[170, 0], [910, 1]].map(([x, i]) => elizabethGrey(x, 1300, 1.3, { skin: i ? SKIN.priest : '#e8bd98', mood: i ? 'peaceful' : 'sad', flip: i === 1, cord: true, armL: 12, armR: [52, 2, 3], propR: candle })).join('');
  return FAR(sky(SKIES.deep, { stars: 44, seed: 9 }) + rays(540, 700, { op: 0.07 }))
    + BACK(romChurch(560, 1180, 0.9, { wall: '#7a6080', roof: '#3e2e54', win: '#ffd98a' }) + hill(1200, 12, '#4a3560', 5))
    + ground(1230, '#44324e', { rim: '#8a6a8a' }) + tufts(1236, 10, '#2a1c34', { seed: 7 })
    + `<g${fadeIn(2.0, 3)}>${beam(450, 640, 310, 770, 1340, 0.5)}${motes(14, { x0: 360, x1: 720, y0: 600, y1: 1250, color: '#fff2c4', seed: 9, rise: 140 })}</g>`
    + sisters
    + elizabethGrey(540, 1320, 1.95, { mood: 'peaceful', halo: 2.2, armL: [22, 2, 3], armR: [22, 2, 3.3], propR: roses(1.2) })
    + NEAR(bokeh(6, { seed: 19, op: [0.25, 0.55] }) + foliage('l', 1640, { color: '#1c1428', seed: 2 }));
}

// 8 · canonized in 1235 by Pope Gregory IX
function scene8() {
  return FAR(sky(GOLDSKY) + rays(540, 640, { op: 0.13 }))
    + BACK(clouds(470, { color: '#fff4dc', op: 0.7, seed: 9 }) + gothic(540, 1180, 0.85, { wall: '#d8a088', win: '#ffe2a0' }))
    + `<g transform="translate(120,-40)">${glow(540, 800, 240, 0.9)}<g${M.bob(8, 3.6)}>${elizabeth(540, 960, 1.2, { mood: 'joy', halo: true, armL: [60, 3, 2.6], armR: [60, 3, 2.9], propL: roseBunch(1.3), propR: roseBunch(1.3) })}</g></g>`
    + MID(followers(1270, 13, { color: '#5a3436' }))
    + ground(1290, '#6a3e3a')
    + leo(270, 1330, 1.6, { mood: 'joy', crown: true, beard: '#cfc8bc', armL: 14, armR: [120, 8, 1.6] })
    + petals(16, { seed: 5, colors: ['#ffffff', '#f2c46b', '#e2566a'] })
    + NEAR(bokeh(6, { seed: 23 }) + foliage('r', 1650, { color: '#2a1a24', seed: 8 }));
}

// 9 · feast day + patronage
function scene9() {
  const kids = [[150, 0, false], [930, 2, true]].map(([x, i, fl]) => kidPoor(x, 1335, 1.15, i, { mood: 'joy', flip: fl, armL: fl ? 14 : [120, 14, 1.3], armR: fl ? [120, 14, 1.4] : 14 })).join('');
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.5, drift: 30, seed: 6 }) + wartburg(800, 1130, 0.55, { crag: '#4a3a5a', wall: '#c8a8a8', roof: '#6a3a4a' }) + hill(1200, 30, '#5d3f6c', 3, { freq: 1.6 }))
    + glow(540, 1100, 480, 0.85)
    + MID(hill(1262, 14, '#6a4458', 6))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1296, 10, '#3a2438', { seed: 7 })
    + elizabeth(540, 1305, 2.35, { mood: 'happy', halo: 0.3, armL: [40, 2, 3], armR: [44, 2, 3.4], propL: roseBunch(1.5), propR: bread_basket() })
    + kids
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#d8404e', '#f28fa6'] })
    + petals(14, { seed: 8, colors: ['#e2566a', '#ffffff', '#f6b9c8'] })
    + NEAR(bokeh(6, { seed: 29 }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_elizabeth_of_hungary', name: 'St_Elizabeth_of_Hungary',
  voice: 'am_michael', speed: 0.95,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'Bread turned to roses in her cloak', thumb_title: 'St. Elizabeth of Hungary', thumb_shift: 0, thumb_t: 6.5,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'lˈʌdwɪɡ': 'lˈuːdvɪɡ',                                  // Ludwig (LOOD-vig)
    'wˈɔːɹtbɜːɡ': 'vˈɑːɹtbʊɹk',                             // Wartburg (VART-boork)
    'mˈɑːɹbɜːɡ': 'mˈɑːɹbʊɹk',                               // Marburg (MAR-boork)
    'noʊvˈɛmbɚ sˈɛvəntˌiːn': 'noʊvˈɛmbɚ sˌɛvəntˈiːnθ',      // November 17 -> seventeenth
  },
  scenes: [
    { kicker: 'THURINGIA · GERMANY', title: 'Bread Into Roses', art: scene0, cam: { move: 'push-fast', oy: 1000, ox: 470 },
      say: ['A princess was caught sneaking bread to the poor.', 'One famous story says, when she opened her cloak, it was full of roses.', 'This is Saint Elizabeth of Hungary.'] },
    { kicker: '1207 · HUNGARY', title: 'A Little Princess', art: scene1, cam: 'pan-r',
      say: ['Born in 1207, the daughter of King Andrew II of Hungary, she was sent at four to Wartburg Castle in Germany.'] },
    { kicker: '1221 · WARTBURG CASTLE', title: 'A Royal Love Story', art: scene2, cam: 'drift-l',
      say: ['At fourteen, she married Ludwig, the boy she grew up with.', 'They loved each other deeply, and had three children.'] },
    { kicker: 'FEAST OF THE ASSUMPTION', title: 'Her King Wore Thorns', art: scene3, cam: { move: 'dolly', oy: 1000, ox: 400 },
      say: ['One day in church, she laid her golden crown before the crucifix.', 'How could she wear gold, she said, when her King wore thorns?'] },
    { kicker: '1226 · FAMINE', title: 'Bread for the Hungry', art: scene4, cam: 'pan-l',
      say: ['When famine struck in 1226, she fed the hungry, gave away even her royal robes, and built a hospital below the castle.'] },
    { kicker: '1227 · A WIDOW AT 20', title: 'A Broken Heart', art: scene5, cam: 'drift-r',
      say: ['In 1227, Ludwig died of fever on his way to the Crusade.', 'A widow at twenty, she soon had to leave the castle.'] },
    { kicker: '1228 · MARBURG', title: 'The Princess Nurse', art: scene6, cam: 'pan-r',
      say: ['She became a lay Franciscan, and used her dowry to build a hospital in Marburg.', 'There, the princess nursed the sick with her own hands.'] },
    { kicker: 'NOVEMBER 17, 1231 · MARBURG', title: 'Home to God', art: scene7, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ['She fell ill, and died on November 17, 1231. She was only twenty four.'] },
    { kicker: '1235 · PERUGIA, ITALY', title: 'A Saint So Soon', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      say: ['Just four years later, Pope Gregory IX declared her a saint.'] },
    { kicker: 'FEAST DAY · NOVEMBER 17', title: 'Patron of Hospitals', art: scene9, cam: 'arc-l',
      say: ['Her feast day is November 17. She is patron of hospitals, nurses and bakers.', 'Saint Elizabeth of Hungary, pray for us.'] },
  ],
};
