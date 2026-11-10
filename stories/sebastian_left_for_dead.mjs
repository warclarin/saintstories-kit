// St. Sebastian: "Left for Dead" (one story: the arrows, Irene, and the palace step). Feast: January 20.
// Source: the Passio Sancti Sebastiani as retold in the Golden Legend (tradition). Arrows are shown in the stake
// and the ground (or held as his emblem), never in the saint; his death is told, not shown.
import { W, M, SKIES, GOLD, sky, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers, petals,
  person, palm_frond, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { roman, cloakBack, cloakFront, romanHelmet } from './martin_of_tours.mjs';
import { column, oilLamp, domusWall, aqueduct, stonePine } from './cecilia_wedding_angel.mjs';
import { romeSkyline } from './peter.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const moon = (x, y, r = 46) => `<circle cx="${x}" cy="${y}" r="${r * 4}" fill="url(#sunGlow)" opacity=".35"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f6efd8"/><circle cx="${x + 14}" cy="${y - 10}" r="${r * 0.22}" fill="#e2d8bc" opacity=".7"/>`;
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const DAYSKY = [[0, '#3574b0'], [0.34, '#69b0e0'], [0.7, '#bfe4f2'], [1, '#bfe4f2']];

// ---------------------------------------------------------------- Sebastian (exported for later reels)
export const SKS = '#e8bd98', HAIRS = '#5a3a24', TUNIC_S = '#f2ebdc';
const belt = `<path d="M-40 -112 Q0 -102 40 -112" stroke="${GOLD}" stroke-width="7" fill="none"/>`;
const skirt = (c) => `<path d="M-42 -112 Q0 -100 42 -112 L46 -66 Q0 -56 -46 -66Z" fill="${c}"/><path d="M14 -108 L42 -112 L46 -66 L20 -60Z" fill="${dark(c, 0.25)}" opacity=".5"/>`
  + `<path d="M-24 -104 L-26 -62 M-6 -102 L-6 -58 M12 -104 L14 -60" stroke="${dark(c, 0.15)}" stroke-width="2.5"/>`;
const rope = '<path d="M-40 -170 Q0 -158 40 -170 M-41 -138 Q0 -126 41 -138" stroke="#b08a5a" stroke-width="7" fill="none" stroke-linecap="round"/>'
  + '<path d="M-40 -168 Q0 -156 40 -168" stroke="#d8b888" stroke-width="2" fill="none"/>';
// Roman tunic (red cloak optional)
export const sebastian = (x, y, s, { cloak = false, bound = false, over = '', under = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', top: TUNIC_S, pants: '#b98a62', skin: SKS, hair: HAIRS, beard: null, ...o,
  under: (cloak ? cloakBack : '') + under, over: skirt(TUNIC_S) + belt + (bound ? rope : '') + (cloak ? cloakFront : '') + over });
// Praetorian captain in bronze armor and red cloak
export const sebastianArmor = (x, y, s, o = {}) => roman(x, y, s, { skin: SKS, hair: HAIRS, ...o });

// Diocletian: purple toga with gold border, laurel wreath, grey beard
const laurel = `<g transform="translate(0,-284)">${Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.04 + i * 0.092), x = 46 * Math.cos(a) * (i % 2 ? 1 : -1) * (i < 1 ? 1 : 1);
  const xx = 46 * Math.cos(Math.PI * (1 - i / 10)), yy = -10 * Math.sin(Math.PI * (i / 10));
  return `<ellipse cx="${(xx).toFixed(1)}" cy="${(yy).toFixed(1)}" rx="11" ry="5" fill="${i % 2 ? GOLD : '#d9a440'}" transform="rotate(${(-60 + i * 12).toFixed(0)} ${xx.toFixed(1)} ${yy.toFixed(1)})"/>`; }).join('')}`
  + `<path d="M-46 0 Q0 -14 46 0" stroke="#b08a3a" stroke-width="4" fill="none"/></g>`;
const toga = `<path d="M-38 -206 Q-4 -160 40 -120 L46 -96 Q0 -136 -42 -184Z" fill="#efe6d2"/><path d="M-38 -206 Q-4 -160 40 -120" stroke="${GOLD}" stroke-width="6" fill="none"/>`;
export const diocletian = (x, y, s, o = {}) => person(x, y, s, { kind: 'royal', crown: false, robe: true, top: '#6a2a6e', skin: '#e2b48f',
  hair: '#bfb8ae', beard: '#bfb8ae', ...o, over: toga + laurel + (o.over || '') });
const guard = (x, y, s, o = {}) => roman(x, y, s, { skin: o.skin || '#d9a47e', mood: 'stern', armR: 22, propR: spear, ...o });
const irene = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', robe: true, girl: true, top: '#5a6a9a', skin: '#e6bc96', hair: '#3a2a1e', beard: null,
  ...o, under: widowVeilBack, over: widowVeilTop + (o.over || '') });
const VEILW = '#2e3a5e';
const widowVeilBack = `<path d="M-48 -292 Q-84 -200 -76 -112 L76 -112 Q84 -200 48 -292 Q0 -322 -48 -292Z" fill="${VEILW}"/>`;
const widowVeilTop = `<path d="M-47 -258 Q-50 -314 0 -316 Q50 -314 47 -258 Q42 -292 0 -294 Q-42 -292 -47 -258Z" fill="${VEILW}"/>`
  + `<path d="M-30 -304 Q0 -312 28 -304" stroke="${light(VEILW, 0.35)}" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`;
const friend = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', robe: true, top: ['#7a5a4a', '#4a6a5a'][i % 2], skin: ['#d9a47e', '#e8bd98'][i % 2],
  hair: ['#2a1e16', '#6b4a32'][i % 2], beard: i % 2 ? null : '#2a1e16', ...o });

// ---------------------------------------------------------------- props
// Arrow stuck in wood or earth: tip at (0,0), shaft and fletching pointing back along rot (0 = straight up)
export const arrow = (x, y, rot = 0, s = 1) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-2.6" y="-118" width="5.2" height="120" rx="2" fill="#8a6a3a"/>`
  + '<rect x="0.4" y="-118" width="2.2" height="120" fill="#5a4024" opacity=".5"/><path d="M0 -112 L-11 -132 L-11 -146 L0 -128Z" fill="#f2ece0"/><path d="M0 -112 L11 -132 L11 -146 L0 -128Z" fill="#c8323a"/></g>';
// A bundle of three arrows held as his emblem (in a hand)
export const arrows = (s = 1) => `<g transform="scale(${s}) translate(0,-14)"><circle cy="-60" r="58" fill="url(#haloGlow)" opacity=".55"/>`
  + [-14, 0, 14].map((r) => `<g transform="rotate(${r})"><rect x="-2.6" y="-130" width="5.2" height="180" rx="2" fill="#8a6a3a"/><path d="M0 -146 L-7 -128 L7 -128Z" fill="#c4ccd6"/>`
    + '<path d="M0 34 L-9 50 L-9 62 L0 48Z M0 34 L9 50 L9 62 L0 48Z" fill="#f2ece0"/></g>').join('') + '</g>';
const spear = '<g><rect x="-4" y="-270" width="8" height="330" rx="3" fill="#6b4a2a"/><path d="M0 -312 L-11 -268 L11 -268Z" fill="#c4ccd6"/><path d="M0 -312 L11 -268 L2 -268Z" fill="#8a96a6"/></g>';
const bow = '<g transform="rotate(-8)"><path d="M0 -150 Q46 -40 0 70" stroke="#7a4a2a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M0 -150 V70" stroke="#efe6d2" stroke-width="2"/></g>';
const handLamp = `<g transform="translate(0,-6)"><circle cy="-10" r="40" fill="url(#sunGlow)" opacity=".75"${M.flick(1.8, 0, 0.75)}/><path d="M-22 0 Q0 14 22 0 Q18 -6 -18 -6Z" fill="#b8863a"/>`
  + '<ellipse cx="18" cy="-12" rx="4" ry="8" fill="#ffd27a"/><ellipse cx="18" cy="-10" rx="2" ry="4" fill="#fff6d8"/></g>';

// ---------------------------------------------------------------- set pieces
// Wooden stake with rope coils; arrows stuck in its upper part
export function stake(x, y, h = 820, { arrowsAt = [[-12, -700, -30], [10, -640, 34], [-8, -560, -48], [12, -760, 18]] } = {}) {
  return `<g transform="translate(${x},${y})"><rect x="-26" y="${-h}" width="52" height="${h + 10}" rx="8" fill="#7a5232"/><rect x="6" y="${-h}" width="20" height="${h + 10}" rx="6" fill="#5a3a22" opacity=".7"/>`
    + `<path d="M-14 ${-h + 40} V-30 M2 ${-h + 80} V-60" stroke="#5a3a22" stroke-width="3" opacity=".6"/>`
    + `<ellipse cx="0" cy="${-h}" rx="26" ry="9" fill="#a07a52"/>`
    + arrowsAt.map(([ax, ay, r]) => arrow(ax, ay, r, 1)).join('') + '</g>';
}
// Arrows stuck in the ground around a spot
const groundArrows = (pts) => pts.map(([x, y, r, s = 1]) => arrow(x, y, r, s)).join('');
// A wide marble staircase across the frame, rising from y0 (bottom) by n steps of height h
function stairs(y0, n = 6, h = 42, { c = '#efe4cc' } = {}) {
  let s = '';
  for (let i = n - 1; i >= 0; i--) {
    const top = y0 - (i + 1) * h;
    s += `<rect x="-200" y="${top}" width="${W + 400}" height="${h}" fill="${dark(c, 0.14 + i * 0.015)}"/><rect x="-200" y="${top}" width="${W + 400}" height="9" fill="${light(c, 0.15)}"/>`;
  }
  return s;
}
// Roman prison vault: stone blocks, a small barred window with a shaft of light
function vault() {
  let blocks = '';
  for (let r = 0; r < 18; r++) for (let c = 0; c < 9; c++) blocks += `<rect x="${-200 + c * 170 + (r % 2) * 85}" y="${380 + r * 52}" width="162" height="46" rx="6" fill="${(r + c) % 3 ? '#4a3c4a' : '#54444f'}"/>`;
  return `<rect x="-200" y="-300" width="${W + 400}" height="1630" fill="#2e242e"/><rect x="-200" y="370" width="${W + 400}" height="960" fill="#3a2e3a"/>${blocks}`
    + `<rect x="700" y="520" width="150" height="120" rx="10" fill="#c9d6f0"/><path d="M730 520 V640 M760 520 V640 M790 520 V640 M820 520 V640" stroke="#2a222c" stroke-width="9"/>`;
}
function throne(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-420" width="180" height="420" rx="14" fill="#c99a4a"/><rect x="30" y="-420" width="60" height="420" rx="10" fill="#9a7034" opacity=".6"/>`
    + `<rect x="-74" y="-400" width="148" height="250" rx="10" fill="#7a2a4a"/><circle cx="-90" cy="-420" r="18" fill="${GOLD}"/><circle cx="90" cy="-420" r="18" fill="${GOLD}"/></g>`;
}

// ---------------------------------------------------------------- scenes
// 0 · hook: bound to the stake at sunset, arrows in the post and the ground; the emperor glances in
function scene0() {
  return FAR(sky(SKIES.deep, { stars: 16, seed: 4 }) + glow(540, 900, 560, 0.6) + rays(540, 820, { op: 0.07 }))
    + BACK(clouds(560, { color: '#f0a090', op: 0.4, drift: 30, seed: 6 }) + romeSkyline(540, 1130, 0.95, { c: '#4a2a44' }) + hill(1170, 20, '#5a3446', 3))
    + MID(stonePine(90, 1220, 1.0, '#2e3a2e') + stonePine(1000, 1200, 0.85, '#2e3a2e'))
    + ground(1250, '#5a3a3e', { rim: '#c0786a' }) + tufts(1256, 10, '#3a2430', { seed: 4 })
    + stake(540, 1300, 900)
    + `<ellipse cx="540" cy="1300" rx="260" ry="34" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>`
    + groundArrows([[300, 1330, -24], [380, 1300, -12, 0.9], [720, 1310, 20, 0.9], [800, 1340, 30]])
    + sebastian(540, 1310, 2.3, { bound: true, mood: 'determined', armL: 6, armR: 6, halo: 1.2 })
    + `<g${M.tw([{ at: 3.2, dur: 0.9, from: { opacity: 0, x: 140 }, to: { opacity: 1, x: 0 }, ease: 'power2.out' }])}>${diocletian(960, 1360, 1.35, { flip: true, mood: 'worried', armL: 10, armR: [40, 4, 1.4] })}</g>`
    + motes(16, { y0: 520, y1: 1240, seed: 4, color: '#ffd8a0' })
    + NEAR(foliage('l', 1640, { color: '#2a1a24' }) + foliage('r', 1660, { color: '#2a1a24', seed: 5 }));
}

// 1 · the emperor's trusted captain … secretly encouraging Christians in prison
function scene1() {
  const SW = 4.2;
  const palace = FAR(sky(DAYSKY) + glow(820, 560, 300, 0.5))
    + BACK(clouds(470, { seed: 3 }) + romeSkyline(540, 1060, 0.9, { c: '#c8a88a', win: '#fff0c0' }))
    + MID(column(70, 1230, 780) + column(1010, 1230, 780) + throne(300, 1200, 0.8) + guard(880, 1210, 1.15, { flip: true, mood: 'happy' }))
    + ground(1230, '#d8c4a0', { rim: '#f2e2c0' })
    + diocletian(300, 1290, 1.65, { mood: 'happy', armL: 10, armR: [60, 4, 2.4] })
    + sebastianArmor(640, 1320, 2.05, { mood: 'happy', armL: 14, armR: 24, propR: spear })
    + NEAR(foliage('r', 1640, { color: '#3a5a32', seed: 3 }));
  const prison = FAR(sky([[0, '#1e1626'], [1, '#2e2434']]))
    + BACK(vault())
    + `<path d="M705 600 L845 600 L960 1290 L560 1290Z" fill="url(#beam)" opacity=".35" filter="url(#blur6)"/>`
    + ground(1240, '#2a2230', { rim: '#4a3c56' })
    + person(300, 1300, 1.45, { kind: 'layman', robe: true, top: '#8a7a66', skin: '#d9a47e', hair: '#2a1e16', beard: '#2a1e16', sitting: true, mood: 'sad', armL: 20, armR: 20 })
    + person(820, 1300, 1.45, { kind: 'layman', robe: true, top: '#7a6a5a', skin: '#e2b48f', hair: '#4a3424', beard: '#4a3424', sitting: true, flip: true, mood: 'sad', armL: 20, armR: 20 })
    + `<g${fadeIn(SW + 2.3, 0.6)}>${person(300, 1300, 1.45, { kind: 'layman', robe: true, top: '#8a7a66', skin: '#d9a47e', hair: '#2a1e16', beard: '#2a1e16', sitting: true, mood: 'happy', armL: 20, armR: 20 })}`
    + `${person(820, 1300, 1.45, { kind: 'layman', robe: true, top: '#7a6a5a', skin: '#e2b48f', hair: '#4a3424', beard: '#4a3424', sitting: true, flip: true, mood: 'happy', armL: 20, armR: 20 })}</g>`
    + sebastianArmor(530, 1320, 2.0, { helmet: false, mood: 'happy', talk: [SW, SW + 4.8], armL: [26, 2, 3], armR: [60, 4, 2.6], propL: handLamp })
    + motes(10, { x0: 600, x1: 900, y0: 560, y1: 1200, seed: 6 });
  return `<g${fadeOut(SW, 0.45)}>${palace}</g><g${fadeIn(SW, 0.45)}>${prison}</g>`;
}

// 2 · "I made you master of my palace!" … then the field at dusk: the stake, the arrows, left for dead
function scene2() {
  const SW = 4.95;
  const court = FAR(sky([[0, '#2a1a22'], [1, '#4a2a2a']]))
    + BACK(domusWall({ win: null, wall: '#c8946a', panel: '#7a2a3a', dado: '#4a2026' }))
    + MID(column(60, 1290, 860, { c: '#e8dcc2' }) + column(1020, 1290, 860, { c: '#e8dcc2' }) + guard(930, 1240, 1.2, { flip: true }))
    + ground(1290, '#6a4a3a', { rim: '#9a7a5a' })
    + diocletian(330, 1320, 1.9, { mood: 'stern', talk: [0.1, 4.8], armL: 10, armR: [82, 6, 1.1] })
    + sebastianArmor(730, 1320, 2.0, { helmet: false, flip: true, mood: 'determined', armL: 12, armR: 12 })
    + NEAR(`<rect x="-200" y="1560" width="${W + 400}" height="500" fill="#1a0e14" opacity=".5" filter="url(#blur14)"/>`);
  const archers = [820, 930, 1040].map((x, i) => `<g${M.tw([{ at: SW, dur: 4.5, from: { x: 0 }, to: { x: 120 }, ease: 'none' }])}>`
    + person(x, 1180 + i * 6, 0.75, { kind: 'layman', top: '#2e2236', pants: '#2e2236', skin: '#3a2a3a', hair: '#1e1620', beard: null, mood: 'stern', armL: 10, armR: [20, 6, 1.2], propL: bow })
    + '</g>').join('');
  const field = FAR(sky(SKIES.deep, { stars: 20, seed: 9 }) + glow(540, 1000, 480, 0.45))
    + BACK(romeSkyline(380, 1110, 0.7, { c: '#3a2238' }) + hill(1150, 24, '#4a2c40', 5))
    + MID(stonePine(990, 1170, 0.7, '#22202a') + `<g opacity=".9">${archers}</g>`)
    + ground(1200, '#4a3038', { rim: '#a0606a' }) + tufts(1206, 10, '#2e1e2a', { seed: 7 })
    + stake(500, 1290, 860)
    + groundArrows([[260, 1320, -26], [340, 1290, -12, 0.85], [690, 1300, 22, 0.9], [760, 1330, 32]])
    + sebastian(520, 1330, 2.0, { bound: true, sitting: true, mood: 'peaceful', armL: 8, armR: 8 })
    + motes(10, { y0: 700, y1: 1240, seed: 9, color: '#ffc8a0' });
  return `<g${fadeOut(SW, 0.45)}>${court}</g><g${fadeIn(SW, 0.45)}>${field}</g>`;
}

// 3 · night: Irene comes with a lamp to bury him — and finds him breathing (dolly zoom)
function scene3() {
  const K = 2.1, B = 5.1;
  const walkIn = M.tw([{ at: 0.1, dur: 1.7, from: { x: -320 }, to: { x: 0 }, ease: 'power2.out' }, { at: K - 0.2, dur: 0.4, from: { opacity: 1 }, to: { opacity: 0 } }]);
  return FAR(sky(SKIES.night, { stars: 46, seed: 3 }) + moon(820, 560, 50))
    + BACK(romeSkyline(540, 1100, 0.85, { c: '#1e2240', win: '#f6d98a' }) + hill(1140, 22, '#242a4a', 2))
    + MID(stake(560, 1260, 860, { arrowsAt: [[-12, -700, -30], [10, -640, 34], [-8, -560, -48], [12, -760, 18], [-10, -480, -20]] })
      + stonePine(80, 1180, 0.8, '#1a2230'))
    + ground(1230, '#2a2a44', { rim: '#5a5a8a' }) + tufts(1236, 10, '#1a1a30', { seed: 3 })
    + groundArrows([[760, 1320, 26], [830, 1290, 34, 0.85], [300, 1350, -30, 0.9]])
    + `<g${fadeOut(B + 0.1, 0.4)}>${sebastian(600, 1320, 2.05, { bound: true, sitting: true, mood: 'peaceful', armL: 8, armR: 8 })}</g>`
    + `<g${fadeIn(B + 0.1, 0.4)}>${sebastian(600, 1320, 2.05, { bound: true, sitting: true, mood: 'happy', armL: 8, armR: 8 })}</g>`
    + `<g${walkIn}>${irene(310, 1310, 1.8, { mood: 'sad', armL: [30, 3, 2], armR: [40, 6, 1.0], propR: handLamp })}</g>`
    + `<g${fadeIn(K - 0.2, 0.4)}><g${fadeOut(B, 0.4)}>${irene(330, 1320, 1.8, { kneel: true, mood: 'worried', armL: [30, 3, 2], armR: [62, 4, 2], propL: handLamp })}</g></g>`
    + `<g${fadeIn(B, 0.4)}>${irene(330, 1320, 1.8, { kneel: true, mood: 'surprised', armL: [30, 3, 2], armR: [80, 4, 2], propL: handLamp })}</g>`
    + sparkles(10, 200, 900, 480, 900, { seed: 5, size: 0.8 })
    + NEAR(foliage('l', 1640, { color: '#12142a', seed: 4 }) + foliage('r', 1660, { color: '#12142a', seed: 2 }));
}

// 4 · Irene's house: he lies badly wounded (the human beat); friends urge him to run; he stands, cloak on, to go back
// Low Roman bed seen from the front: blanket over the lap, wooden front rail (drawn in front of the sitter)
function bedFront(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-250 -96 Q-120 -118 0 -110 Q130 -116 250 -96 L262 -40 L-262 -40Z" fill="#e2d4b4"/>`
    + `<path d="M-250 -96 Q-120 -118 0 -110 Q130 -116 250 -96" stroke="#f4ead2" stroke-width="8" fill="none"/><path d="M-40 -108 Q-30 -76 -36 -42 M120 -106 Q126 -74 118 -42" stroke="#c8b896" stroke-width="4" fill="none"/>`
    + `<rect x="-280" y="-48" width="560" height="44" rx="10" fill="#8a5a3a"/><rect x="-280" y="-48" width="560" height="10" rx="5" fill="#a87a52"/>`
    + `<rect x="-270" y="-6" width="26" height="12" fill="#5a3a24"/><rect x="244" y="-6" width="26" height="12" fill="#5a3a24"/></g>`;
}
function scene4() {
  const C = 6.4;
  return FAR(sky([[0, '#141428'], [1, '#2a2240']]))
    + BACK(domusWall({ win: 'night', winX: 540, nightTint: 0.4 }))
    + MID(oilLamp(240, 640, 380, 0.3) + oilLamp(860, 640, 380, 0.8))
    + ground(1290, '#5a3a32', { rim: '#8a6a4a' })
    + irene(200, 1320, 1.75, { mood: 'worried', armL: 12, armR: [44, 3, 2.6] })
    + friend(830, 1300, 1.55, 0, { flip: true, mood: 'worried', armL: 10, armR: [64, 8, 1.2] })
    + friend(980, 1300, 1.5, 1, { flip: true, mood: 'worried', armL: [40, 6, 1.4], armR: 12 })
    + `<g${fadeOut(C, 0.5)}>${sebastian(470, 1300, 2.0, { sitting: true, mood: 'sad', armL: 14, armR: 14 })}${bedFront(510, 1330)}</g>`
    + `<g${fadeIn(C, 0.5)}>${sebastian(530, 1330, 2.1, { cloak: true, mood: 'determined', armL: 12, armR: [20, 2, 3] })}</g>`
    + motes(8, { x0: 160, x1: 920, y0: 600, y1: 1100, seed: 2 })
    + NEAR(`<rect x="-200" y="1560" width="${W + 400}" height="500" fill="#140e1a" opacity=".55" filter="url(#blur14)"/>`);
}

// 5 · the palace step: the emperor freezes; Sebastian speaks
function scene5() {
  const F = 3.1;
  const procession = [820, 960, 1060].map((x, i) => guard(x, 1110, 0.95, { mood: i === 1 ? 'surprised' : 'stern', skin: ['#d9a47e', '#e2b48f', '#c48a5f'][i] })).join('');
  return FAR(sky(GOLDSKY) + glow(700, 640, 360, 0.6))
    + BACK(clouds(460, { color: '#fff0d8', op: 0.7, seed: 8 }) + romeSkyline(540, 980, 0.8, { c: '#c89a7a', win: '#fff0c0' }))
    + MID(column(140, 1060, 640) + column(400, 1060, 640) + column(680, 1060, 640) + column(940, 1060, 640)
      + `<rect x="-200" y="384" width="${W + 400}" height="48" fill="#efe4cc"/><rect x="-200" y="428" width="${W + 400}" height="12" fill="#c8b898"/>`
      + stairs(1330, 6, 45) + procession)
    + ground(1330, '#cdb894', { rim: '#efe0c0' })
    + `<g${fadeOut(F, 0.35)}>${diocletian(780, 1330, 1.8, { flip: true, mood: 'stern', armL: 10, armR: 10 })}</g>`
    + `<g${M.tw([{ at: F, dur: 0.35, from: { opacity: 0 }, to: { opacity: 1 } }, { at: F, dur: 0.6, from: { x: 0 }, to: { x: 50 }, ease: 'power2.out' }])}>`
    + diocletian(780, 1330, 1.8, { flip: true, mood: 'surprised', talk: [F + 0.4, 7.6], armL: 14, armR: [70, 4, 1.4] }) + '</g>'
    + sebastian(330, 1195, 2.05, { cloak: true, mood: 'determined', talk: [7.7, 14.0], armL: 12, armR: [52, 5, 2.2] })
    + NEAR(foliage('l', 1650, { color: '#5a3a2a', seed: 7 }));
}

// 6 · death told plainly; golden light through Roman arches, the martyr in glory (tilt-up + rack focus)
function scene6() {
  return FAR(sky(GOLDSKY) + rays(540, 640, { op: 0.13 }) + glow(540, 760, 520, 0.85))
    + BACK(clouds(820, { color: '#ffe8c8', op: 0.5, seed: 4, drift: 20 }) + aqueduct(1180, { c: '#d8a888', h: 520 }))
    + beam(400, 680, 200, 880, 1300, 0.45)
    + MID(hill(1230, 10, '#c88a6a', 4))
    + ground(1250, '#b07a5a', { rim: '#f2c49a' }) + flowers(1260, 1330, 12, { seed: 6, colors: ['#ffffff', '#f6d36b', '#c8323a'] })
    + sebastian(540, 1300, 2.35, { cloak: true, mood: 'peaceful', halo: true, armL: [24, 2, 3], armR: [26, 2, 3.4], propL: palm_frond(1.05, -16), propR: arrows(1.1) })
    + motes(18, { y0: 520, y1: 1240, seed: 8, color: '#fff2c4' })
    + NEAR(bokeh(7, { seed: 31 }));
}

// 7 · feast day portrait: soldier-saint with palm and arrows; patron of soldiers, athletes and archers (arc)
function scene7() {
  const athlete = person(910, 1340, 1.3, { kind: 'kid', top: '#e8dcc2', pants: '#b98a62', skin: '#c48a5f', hair: '#1a120c', mood: 'joy', flip: true, armL: [140, 10, 1.3], armR: 12,
    over: `<g transform="translate(0,-284)"><path d="M-44 0 Q0 -14 44 0" stroke="#4f8a3a" stroke-width="9" fill="none"/></g>` });
  return FAR(sky(SKIES.dusk, { stars: 22, seed: 5 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 2 }) + romeSkyline(540, 1160, 0.95, { c: '#4a3050' }))
    + glow(540, 1050, 480, 0.85)
    + MID(hill(1240, 14, '#5a3a52', 6) + stonePine(60, 1250, 0.9, '#2a2a3a') + stonePine(1030, 1250, 0.8, '#2a2a3a'))
    + ground(1270, '#4a3046', { rim: '#c08a7a' }) + tufts(1276, 10, '#2e1e32', { seed: 2 })
    + guard(170, 1340, 1.3, { mood: 'joy', armR: 20, propR: bow, helmet: true })
    + athlete
    + sebastianArmor(540, 1300, 2.4, { helmet: false, mood: 'happy', halo: 0.3, armL: [24, 2, 3], armR: [26, 2, 3.4], propL: palm_frond(1.05, -16), propR: arrows(1.1) })
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#c8323a', '#f6d36b'] })
    + motes(14, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(6, { seed: 12 }) + foliage('l', 1640, { color: '#2a1a34' }) + foliage('r', 1660, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_sebastian_left_for_dead', name: 'St_Sebastian_Left_for_Dead',
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'Shot with arrows. He came back.', thumb_title: 'St. Sebastian', thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1300, 'l']],
  fix: {
    'dɪəklˈɛʃən': 'daɪəklˈiːʃən',   // Diocletian
    'ˈaɪɹiːn': 'aɪɹˈiːn',           // Irene -> eye-REEN
    'dʒˈænjuːˌɛɹi twˈɛnti': 'dʒˈænjuːˌɛɹi twˈɛntiəθ',   // January 20 -> twentieth
  },
  scenes: [
    { kicker: 'ROME · ABOUT 288', title: 'He Came Back', art: scene0, cam: { move: 'push-fast', oy: 1000 },
      say: ['Everyone knows the saint shot full of arrows.', 'Almost no one knows what he did next.', 'This is Saint Sebastian.'] },
    { kicker: 'THE EMPEROR’S GUARD', title: 'A Secret Christian', art: scene1, cam: 'pan-r',
      say: ['Tradition says he was a captain in Diocletian’s own guard.', 'But he was secretly a Christian.', 'He gave courage to believers in prison.'] },
    { kicker: 'BETRAYED', title: 'Left for Dead', art: scene2, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['When Diocletian found out, he raged: I made you master of my palace!', 'He had him tied to a stake and shot with arrows.', 'Then the archers left him for dead.'] },
    { kicker: 'THAT NIGHT', title: 'Still Breathing', art: scene3, cam: { move: 'dolly', amt: 0.08, ox: 600, oy: 1050 },
      say: ['That night, a Christian widow named Irene came to bury him.', { text: 'But he was still breathing.', beat: 0.9, speed: 0.85 }] },
    { kicker: 'IRENE’S HOUSE', title: 'He Didn’t Run', art: scene4, cam: 'drift-r',
      say: ['She took him home. For days, he lay badly wounded.', 'His friends urged him to run from Rome.', 'Instead, he went back to face the emperor.'] },
    { kicker: 'THE PALACE STEP', title: 'Face to Face', art: scene5, cam: { move: 'push', amt: 0.07, ox: 560, oy: 1000 },
      say: ['He stood on a palace step as the emperor passed.', 'Diocletian froze. Aren’t you Sebastian, whom we had shot to death?',
        'Sebastian said God spared him for one reason: to tell the emperor to stop hurting Christians.'] },
    { kicker: 'MARTYR OF ROME', title: 'Untouched Faith', art: scene6, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ['This time, the emperor had him beaten to death.', 'Rome’s arrows wounded his body. They never touched his faith.'] },
    { kicker: 'FEAST DAY · JANUARY 20', title: 'Patron of Soldiers', art: scene7, cam: { move: 'arc-l', amt: 0.06, oy: 1000 },
      say: ['His feast day is January 20.', 'He is patron of soldiers, athletes and archers. Saint Sebastian, pray for us.'] },
  ],
};
