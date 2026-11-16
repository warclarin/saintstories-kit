// St. Elizabeth of Hungary: the miracle of the roses (one-story reel; feast: November 17).
// Facts (sources: Catholic Encyclopedia "St. Elizabeth of Hungary" (New Advent); Wikipedia "Elizabeth of Hungary" and
// "Miracle of the roses"; Aleteia, Nov 17 2017): daughter of King Andrew II of Hungary, born 1207; married Ludwig IV,
// Landgrave of Thuringia, in 1221 at 14; lived at the Wartburg above Eisenach. LEGEND (not in her earliest lives; first
// written in a Franciscan prayer book of 1332): she carried bread (meat, eggs, bread) under her mantle down to the poor;
// suspicious courtiers thought she was taking castle treasure; Ludwig, back from a hunt with his party, met her halfway
// down and asked what she was carrying; she was embarrassed and speechless; he opened her mantle and found red and white
// roses, which he took as proof of God's protection; some versions set it in the dead of winter. Her lives say Ludwig
// always supported her charity. Died at Marburg 17 Nov 1231, aged 24; canonized by Gregory IX in 1235. Patron of bakers,
// hospitals, the homeless. Iconography: crown, roses in her mantle or lap, bread, basket.
// Characters use the detailed rig hd() (../hd.mjs); crowns are drawn in `over` (crownHead). Exported for later reels:
// elizabethHD, ludwigHD, crownHead, circlet, roseLap, rose, pine, fachwerk, drifts.
import { W, M, SKIN, GOLD, sky, sun, rays, clouds, hill, sparkles, motes, foliage, petals, bread_basket, ground,
  dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { wartburg } from './elizabeth_of_hungary.mjs';
import { horse } from './martin_of_tours.mjs';

const SLUG = 'st_elizabeth_of_hungary_roses';
const at = wordTimes(SLUG);
const SKE = SKIN.fair, HAIRE = '#b8863a', GOWN = '#a8344e', MANTLE = '#2f4a8a', LINING = '#e8c87a', SNOW = '#e6eaf4';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.6) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const walkIn = (t, dx, dur = 1.1) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.035, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const snowfall = (n, seed, o = {}) => petals(n, { seed, colors: ['#ffffff', '#eef2ff', '#f6f8ff'], y0: -200, y1: 1300, fall: 520, ...o });

// ================================================================ headwear and props
/** A princess's crown in hd() body space (sits on the head, top of the head at y -292). */
export const crownHead = (c = GOLD) => `<g transform="translate(0,-289)"><path d="M-31 4 L-34 -24 L-20 -10 L-10 -32 L0 -14 L10 -32 L20 -10 L34 -24 L31 4 Q0 10 -31 4Z" fill="${c}"/>`
  + `<path d="M-31 4 Q0 10 31 4 L31 -3 Q0 3 -31 -3Z" fill="${dark(c, 0.25)}"/><path d="M-10 -32 L0 -14 L-3 -10 L-13 -27Z" fill="${light(c, 0.45)}" opacity=".6"/>`
  + `<circle cx="0" cy="0" r="4" fill="#c8323a"/><circle cx="-18" cy="1" r="3" fill="#3a6ab8"/><circle cx="18" cy="1" r="3" fill="#3a6ab8"/>`
  + `<circle cx="-34" cy="-25" r="3" fill="${light(c, 0.35)}"/><circle cx="34" cy="-25" r="3" fill="${light(c, 0.35)}"/><circle cx="-10" cy="-33" r="3" fill="${light(c, 0.35)}"/><circle cx="10" cy="-33" r="3" fill="${light(c, 0.35)}"/></g>`;
/** A landgrave's low circlet. */
export const circlet = (c = GOLD) => `<g transform="translate(0,-287)"><path d="M-30 4 L-30 -9 L-18 -3 L-9 -15 L0 -5 L9 -15 L18 -3 L30 -9 L30 4 Q0 9 -30 4Z" fill="${c}"/>`
  + `<path d="M-30 4 Q0 9 30 4 L30 -1 Q0 4 -30 -1Z" fill="${dark(c, 0.25)}"/><circle cx="0" cy="1" r="3.4" fill="#c8323a"/></g>`;
const ermine = '<path d="M-40 -206 Q0 -190 40 -206 Q46 -190 36 -180 Q0 -170 -36 -180 Q-46 -190 -40 -206Z" fill="#f6f2ea"/>'
  + '<g fill="#2b1d14"><circle cx="-24" cy="-189" r="2.4"/><circle cx="0" cy="-181" r="2.4"/><circle cx="24" cy="-189" r="2.4"/></g>';
/** One rose (red or white) with a swirl and two leaves. */
export const rose = (x, y, r = 12, c = '#d8404e') => {
  const d = dark(c, c > '#e' ? 0.18 : 0.35);
  return `<g transform="translate(${x},${y})"><path d="M${-r * 0.9} ${r * 0.5} q${-r * 0.9} ${-r * 0.2} ${-r * 1.2} ${r * 0.6} q${r * 0.7} ${r * 0.3} ${r * 1.2} ${-r * 0.6}Z" fill="#4f8a3c"/>`
    + `<path d="M${r * 0.9} ${r * 0.5} q${r * 0.9} ${-r * 0.2} ${r * 1.2} ${r * 0.6} q${-r * 0.7} ${r * 0.3} ${-r * 1.2} ${-r * 0.6}Z" fill="#3f7a30"/>`
    + `<circle r="${r}" fill="${c}"/><path d="M${-r * 0.5} ${-r * 0.1} q${r * 0.5} ${-r * 0.6} ${r} 0 q${-r * 0.2} ${r * 0.5} ${-r * 0.6} ${r * 0.3} M${-r * 0.75} ${r * 0.25} q${r * 0.7} ${r * 0.7} ${r * 1.4} 0" stroke="${d}" stroke-width="${(r * 0.18).toFixed(1)}" fill="none" stroke-linecap="round"/>`
    + `<circle cx="${-r * 0.35}" cy="${-r * 0.4}" r="${r * 0.28}" fill="#fff" opacity=".25"/></g>`;
};
const RW = ['#d8404e', '#f8f2ee', '#e2566a', '#f4ecec', '#c83242', '#fff6f6', '#f2e6e6'];
/** Elizabeth's mantle gathered at the waist and full of red and white roses (hd() body space). */
export const roseLap = (s = 1, glowOp = 0.8) => `<g transform="translate(2,-140) scale(${s})"><circle r="78" fill="url(#haloGlow)" opacity="${glowOp}"/>`
  + `<ellipse rx="54" ry="34" fill="${MANTLE}"/><path d="M-54 0 Q0 42 54 0" stroke="${LINING}" stroke-width="5" fill="none"/>`
  + [[-28, -12], [0, -22], [26, -12], [-12, 4], [14, 6], [-38, 6], [38, 4], [0, -2]].map(([x, y], k) => rose(x, y, 13, RW[k % 7])).join('') + '</g>';
/** The bundle of bread hidden under her mantle (hd() body space; arms crossed over it with armL -14, armR -22). */
const bundle = `<g transform="translate(4,-138)"><ellipse rx="46" ry="36" fill="${MANTLE}"/><ellipse cx="-10" cy="-12" rx="26" ry="15" fill="${light(MANTLE, 0.25)}" opacity=".6"/>`
  + `<path d="M-36 6 Q0 26 38 4 M-20 -22 Q0 -8 24 -24" stroke="${dark(MANTLE, 0.35)}" stroke-width="3" fill="none" opacity=".7"/><path d="M-46 0 Q0 44 46 0" stroke="${LINING}" stroke-width="5" fill="none"/></g>`;
const bread = '<g transform="translate(0,-4)"><ellipse rx="18" ry="11" fill="#d9a04f"/><ellipse cx="-4" cy="-3" rx="10" ry="5" fill="#ecc070" opacity=".7"/><path d="M-10 -4 q4 -4 8 0 M2 -4 q4 -4 8 0" stroke="#b07a3a" stroke-width="2.5" fill="none"/></g>';
const spear = (h = 300) => `<g><rect x="-4" y="${-h}" width="8" height="${h + 60}" rx="3" fill="#7a5536"/><path d="M0 ${-h - 46} L10 ${-h} L-10 ${-h}Z" fill="#c8ccd8"/><path d="M0 ${-h - 46} L10 ${-h} L2 ${-h}Z" fill="#9aa0b0"/></g>`;
// roses tumbling from the mantle to the snow
const roseFall = (x0, y0, t, seed = 1) => [0, 1, 2, 3, 4, 5].map((i) => {
  const dx = ((i * 41 + seed * 23) % 150) - 75, dy = 140 + ((i * 53) % 110);
  return `<g transform="translate(${x0 + dx},${y0 + dy})"><g opacity="0"${M.tw([{ at: t + i * 0.22, dur: 0.9, from: { y: -dy, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.in' }])}>${rose(0, 0, 15, RW[i % 7])}</g></g>`;
}).join('');

// ================================================================ characters (hd rig)
/** St. Elizabeth: rose-red gown, blue mantle with gold lining, golden hair, crown (as in elizabeth_of_hungary.mjs). */
export const elizabethHD = (x, y, s, { crown = true, over = '', ...o } = {}) => hd(x, y, s, {
  top: GOWN, mantle: MANTLE, lining: LINING, trim: GOLD, belt: '#c8963e', skin: SKE, hair: HAIRE, hairStyle: 'long', beard: null,
  age: 'young', iris: '#3e5e8a', shoes: '#6a2a3a', ...o, over: (crown ? crownHead() : '') + over });
/** Ludwig IV of Thuringia: green tunic, red mantle with ermine collar, short beard, circlet. */
export const ludwigHD = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: '#2f6a5a', mantle: '#8a2e3a', lining: '#f6f2ea', trim: GOLD, belt: '#5a3a22', skin: SKIN.priest, hair: '#7a5232', beardStyle: 'short',
  age: 'young', iris: '#4a3424', shoes: '#4a3424', ...o, over: ermine + circlet() + over });
const POOR = ['#8a6a4a', '#6a6a5a', '#7a5a4a', '#5a6a7a'], POORSK = ['#e2b48f', '#d8a47a', '#c48a5f', '#f0c9a8'];
const patch = (c) => `<rect x="-24" y="-150" width="16" height="14" rx="3" fill="${dark(c, 0.25)}"/><rect x="18" y="-80" width="14" height="12" rx="3" fill="${light(c, 0.15)}"/>`;
const poorHD = (x, y, s, i, o = {}) => hd(x, y, s, { top: POOR[i % 4], plain: true, belt: '#5a4030', skin: POORSK[i % 4],
  hair: ['#4a3424', '#d8d2ca', '#2a1e16', '#6a4a2a'][i % 4], hairStyle: ['short', 'old', 'long', 'curly'][i % 4], age: i % 4 === 1 ? 'old' : 'mid',
  beard: i % 4 === 1 ? '#d8d2ca' : i % 4 === 0 ? '#4a3424' : null, mantle: i % 4 === 2 ? '#6a5a4a' : null, shoes: '#4a3a2a', ...o, over: patch(POOR[i % 4]) + (o.over || '') });
const kidHD = (x, y, s, i, o = {}) => hd(x, y, s, { top: ['#c87a4a', '#6a8ab0', '#b8a05a'][i % 3], plain: true, belt: false, skin: POORSK[(i + 1) % 4],
  hair: '#3a2a1e', hairStyle: i % 2 ? 'long' : 'curly', beard: null, age: 'young', shoes: '#4a3a2a', ...o });
const courtier = (x, y, s, i, o = {}) => hd(x, y, s, { top: ['#5a3a6a', '#7a5a2a'][i % 2], mantle: ['#3a2a4a', '#4a3a5a'][i % 2], trim: GOLD, skin: SKIN.priest,
  hair: ['#3a2a20', '#8a7a6a'][i % 2], beardStyle: 'short', age: 'mid', mood: 'stern', shoes: '#2a2228', ...o });
const hunter = (x, y, s, i, o = {}) => hd(x, y, s, { top: ['#5a6a3a', '#6a4a3a'][i % 2], mantle: ['#6a4a2a', '#4a5a3a'][i % 2], plain: true, skin: ['#e2b48f', '#d8a47a'][i % 2],
  hair: ['#4a3424', '#2a1e16'][i % 2], beardStyle: 'full', age: 'mid', shoes: '#3a2a20', armR: 22, propR: spear(280), ...o });

// ================================================================ set pieces
/** A snowy fir (SVG). Base at (x, y). */
export function pine(x, y, s = 1, { c = '#2e4a4e', snow = '#f2f4fa' } = {}) {
  let t = '';
  for (let k = 0; k < 4; k++) {
    const w = 120 - k * 24, yy = -30 - k * 90, tip = yy - 170;
    t += `<path d="M${-w} ${yy} L0 ${tip} L${w} ${yy}Z" fill="${k % 2 ? c : dark(c, 0.1)}"/><path d="M0 ${tip} L${w} ${yy} L${f1(w * 0.3)} ${yy}Z" fill="${dark(c, 0.32)}" opacity=".6"/>`
      + `<path d="M${f1(-w * 0.92)} ${yy - 4} Q${f1(-w * 0.4)} ${yy - 22} 0 ${yy - 10} Q${f1(w * 0.4)} ${yy - 22} ${f1(w * 0.92)} ${yy - 4} L${f1(w * 0.8)} ${yy - 22} Q0 ${yy - 34} ${f1(-w * 0.8)} ${yy - 22}Z" fill="${snow}" opacity=".92"/>`;
  }
  t += `<path d="M0 ${-30 - 3 * 90 - 170} L${-26} ${-30 - 3 * 90 - 110} Q0 ${-30 - 3 * 90 - 100} 26 ${-30 - 3 * 90 - 110}Z" fill="${snow}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-12" y="-40" width="24" height="44" fill="#4a3424"/>${t}</g>`;
}
const f1 = (n) => +n.toFixed(1);
/** A half-timbered (Fachwerk) house with a snowy roof and lit windows. Base at (x, y). */
export function fachwerk(x, y, s = 1, { wall = '#efe2c8', timber = '#6b4a2a', roof = '#8a4a3a', win = '#ffd98a', snow = '#f4f6fb' } = {}) {
  const wins = [[-60, -170], [0, -170], [60, -170], [-60, -72], [60, -72]].map(([wx, wy]) => `<rect x="${wx - 14}" y="${wy}" width="28" height="34" fill="${win}"/><path d="M${wx} ${wy} V${wy + 34} M${wx - 14} ${wy + 17} H${wx + 14}" stroke="${dark(timber, 0.2)}" stroke-width="3"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-200" width="180" height="200" fill="${wall}"/><rect x="40" y="-200" width="50" height="200" fill="${dark(wall, 0.2)}" opacity=".45"/>`
    + `<path d="M-90 -200 H90 M-90 -100 H90 M-90 -2 H90 M-88 -200 V0 M88 -200 V0 M-30 -200 V0 M30 -200 V0 M-90 -200 L-30 -100 M30 -100 L90 -200 M-90 -100 L-30 0 M30 0 L90 -100" stroke="${timber}" stroke-width="8"/>`
    + wins + `<path d="M-18 0 V-56 Q0 -70 18 -56 V0Z" fill="${dark(timber, 0.25)}"/>`
    + `<path d="M-110 -196 L0 -340 L110 -196Z" fill="${roof}"/><path d="M0 -340 L110 -196 L62 -196Z" fill="${dark(roof, 0.25)}"/>`
    + `<path d="M-64 -256 L0 -340 L64 -256 Q32 -246 0 -258 Q-32 -246 -64 -256Z" fill="${snow}"/><path d="M-112 -196 Q0 -186 112 -196 L104 -206 Q0 -198 -104 -206Z" fill="${snow}"/>`
    + `<rect x="34" y="-330" width="22" height="60" fill="${dark(wall, 0.3)}"/><rect x="30" y="-338" width="30" height="12" fill="${snow}"/></g>`;
}
/** Soft snow drifts along the ground line. */
export const drifts = (y, { seed = 3, c = '#ffffff', sh = '#c8d0e4' } = {}) => [[-60, 40, 220], [260, 22, 180], [620, 34, 240], [980, 26, 220]].map(([x, h, w], k) =>
  `<ellipse cx="${x + seed * 7}" cy="${y + 10}" rx="${w}" ry="${h}" fill="${sh}" opacity=".5"/><ellipse cx="${x + seed * 7 - 10}" cy="${y}" rx="${w * 0.92}" ry="${h * 0.8}" fill="${c}" opacity=".8"/>`).join('');
const snowGround = (y, seed = 3) => ground(y, SNOW, { rim: '#ffffff' }) + drifts(y + 8, { seed });
const WINTERDAY = [[0, '#5a78b0'], [0.36, '#9ab4d8'], [0.66, '#f0dcd0'], [1, '#f0dcd0']];
const GREYDAY = [[0, '#4a5478'], [0.4, '#8a90b0'], [0.68, '#d8c8c4'], [1, '#d8c8c4']];
const DUSKWOOD = [[0, '#232850'], [0.4, '#5a5488'], [0.66, '#d098a0'], [1, '#e8b8a8']];
const GOLDSNOW = [[0, '#a8603e'], [0.32, '#eaa070'], [0.66, '#f8dca0'], [1, '#f8dca0']];

// ================================================================ scenes
// 0 · hook (3D valleyHook, push-fast): the princess on the snowy path, cloak held tight; she looks at us on "This is Saint"
function scene0() {
  const T1 = at(0, 'This is');
  return MID(pine(-10, 1280, 1.45) + pine(1110, 1260, 1.25))
    + snowGround(1250, 2)
    + glow(430, 1150, 430, 0.35)
    + `<g opacity="0"${fadeIn(1.4, 1.2)}>${glow(1020, 1060, 300, 0.55)}</g>`
    + `<g${punch(at(0, 'secret'), 0.03, 430, 880)}>`
    + seq((o) => elizabethHD(430, 1310, 2.35, { armL: -14, armR: -22, over: bundle, ...o }),
      [[0, { mood: 'worried', look: [2.6, 0] }], [at(0, 'secret', -0.2), { mood: 'worried', look: [-2.4, 0.4] }], [T1, { mood: 'happy', look: [0, 0], halo: true }]])
    + '</g>'
    + snowfall(18, 4)
    + NEAR(snowfall(6, 9, { fall: 760 }));
}

// 1 · setup (SVG, pan-r): the young couple below the Wartburg; Eisenach's roofs rise on "Eisenach"
function scene1() {
  const tL = at(1, 'Ludwig'), tW = at(1, 'Wartburg'), tE = at(1, 'Eisenach'), tLg = at(1, 'legend');
  return FAR(sky(WINTERDAY) + sun(240, 600, 54, 280))
    + BACK(clouds(430, { color: '#fff7f0', op: 0.7, seed: 2 }) + hill(1060, 50, '#b8c4dc', 3, { freq: 1.3 })
      + `<g opacity="0"${fadeIn(tW - 0.2, 1)}>${glow(560, 760, 330, 0.7)}</g>` + wartburg(540, 900, 0.55, { crag: '#7a8aa8', wall: '#efe4d4', roof: '#8a4a3a' })
      + `<path d="M-80 960 Q540 900 1160 960 L1160 990 L-80 990Z" fill="#e8ecf6"/>`)
    + MID(`<g${M.in('rise', tE - 0.2, 1, 0, 60)}>${fachwerk(80, 1200, 0.5)}${fachwerk(250, 1190, 0.42, { wall: '#f2e8d8', roof: '#7a4a4a' })}${fachwerk(840, 1195, 0.46, { roof: '#6a4a3a' })}${fachwerk(1010, 1200, 0.52)}</g>`)
    + snowGround(1240, 4)
    + seq((o) => elizabethHD(370, 1320, 1.95, { armL: [18, 2, 3], ...o }),
      [[0, { mood: 'happy', armR: [30, 2, 3] }], [tL + 0.6, { mood: 'tender', armR: [52, 2, 3] }], [tW, { mood: 'happy', look: [1, -1.5], armR: [30, 2, 3] }]])
    + `<g opacity="0"${walkIn(tL - 0.4, 220)}>` + seq((o) => ludwigHD(650, 1320, 2.0, { flip: true, armL: 14, ...o }),
      [[0, { mood: 'happy', armR: [48, 2, 3] }], [tL + 0.6, { mood: 'joy', armR: [52, 2, 3] }], [tW, { mood: 'happy', look: [-1, -1.5], armR: [24, 2, 3] }]]) + '</g>'
    + `<g opacity="0"${fadeIn(tLg, 0.8)}>${sparkles(14, 380, 720, 560, 900, { seed: 6, color: '#fff2d0' })}</g>`
    + snowfall(10, 3)
    + NEAR(snowfall(4, 31, { fall: 760 }));
}

// 2 · the poor of Eisenach (SVG, drift-l): bread for a hungry family; two courtiers whisper on "But some at court"
function scene2() {
  const tB = at(2, 'bread'), tC = at(2, 'But some'), tS = at(2, 'stealing');
  return FAR(sky(GREYDAY))
    + BACK(clouds(470, { color: '#d8d0dc', op: 0.6, seed: 4, drift: 30 }) + hill(1000, 40, '#9aa0bc', 5) + wartburg(820, 820, 0.3, { crag: '#6a7088', wall: '#d8ccbc' })
      + `<path d="M-80 880 Q540 850 1160 880 L1160 900 L-80 900Z" fill="#dde2ee"/>`)
    + MID(fachwerk(40, 1190, 0.62) + fachwerk(300, 1180, 0.58, { wall: '#f2e8d8', roof: '#7a4a4a' }) + fachwerk(560, 1185, 0.6, { roof: '#6a4a3a' })
      + fachwerk(820, 1180, 0.6, { wall: '#ead8c0' }) + fachwerk(1080, 1190, 0.62, { roof: '#7a4a4a' })
      + `<g opacity="0"${walkIn(tC - 0.2, 160, 0.9)}>${courtier(760, 1200, 1.15, 0, { flip: true, armL: 10, armR: [150, 3, 2] })}${courtier(880, 1205, 1.12, 1, { flip: true, armL: 12, armR: 14 })}</g>`)
    + snowGround(1240, 6)
    + seq((o) => poorHD(150, 1320, 1.65, 1, { armL: 10, armR: 16, ...o }), [[0, { mood: 'worried' }], [tB + 0.5, { mood: 'happy', armR: [40, 2, 3] }]])
    + seq((o) => elizabethHD(400, 1315, 1.95, { armL: [26, 2, 3], propL: bread_basket(), ...o }),
      [[0, { mood: 'happy', armR: 20 }], [tB, { mood: 'tender', armR: [72, 3, 2.6], propR: bread }], [tS, { mood: 'happy', armR: [40, 2, 3] }]])
    + seq((o) => poorHD(660, 1320, 1.7, 2, { flip: true, armL: 10, ...o }), [[0, { mood: 'worried', armR: 20 }], [tB + 0.4, { mood: 'joy', armR: [70, 3, 2.4] }], [tS, { mood: 'happy', armR: [40, 2, 3] }]])
    + seq((o) => kidHD(800, 1325, 1.15, 0, { flip: true, armL: 10, ...o }), [[0, { mood: 'sad', armR: 20 }], [tB + 0.7, { mood: 'joy', armR: [140, 12, 1.4] }]])
    + snowfall(12, 7)
    + NEAR(snowfall(4, 33, { fall: 760 }));
}

// 3 · caught on the path (SVG, push): Ludwig steps in from his horse; hunters behind; her human beat on "She blushed"
function scene3() {
  const tH = at(3, 'hunting'), tA = at(3, 'asked'), tBl = at(3, 'She blushed');
  return FAR(sky(DUSKWOOD, { stars: 18, seed: 4 }) + glow(540, 1000, 420, 0.4))
    + BACK(hill(1040, 46, '#8a88b0', 2, { freq: 1.4 }) + [60, 200, 880, 1010].map((x, k) => pine(x, 1080, 0.55 + (k % 2) * 0.1, { c: '#3a4a60' })).join('')
      + `<path d="M-80 1080 Q540 1050 1160 1080 L1160 1110 L-80 1110Z" fill="#d8dcec"/>`)
    + MID(pine(-40, 1250, 1.2) + pine(1120, 1240, 1.3)
      + horse(905, 1235, 0.85, { c: '#7a5a42', mane: '#3a2a20', cloth: '#8a2e3a', flip: true })
      + `<g opacity="0"${fadeIn(tH - 0.3, 0.8)}>${hunter(115, 1170, 0.95, 0, { mood: 'stern' })}${hunter(205, 1175, 0.9, 1, { mood: 'surprised', flip: true, armR: 14, armL: 22, propL: spear(260), propR: '' })}</g>`)
    + `<path d="M180 1240 Q540 1215 900 1240 L1000 1330 L80 1330Z" fill="#f4f6fb" opacity=".7"/>`
    + snowGround(1250, 8)
    + `<g${punch(tBl, 0.03, 380, 900)}>`
    + seq((o) => elizabethHD(370, 1315, 2.15, { armL: -14, armR: -22, over: bundle, ...o }),
      [[0, { mood: 'surprised', look: [2.4, 0] }], [tBl, { mood: 'worried', look: [1, 1.6] }]])
    + '</g>'
    + `<g opacity="0"${walkIn(0.2, 240)}>` + seq((o) => ludwigHD(690, 1315, 2.1, { flip: true, armL: 14, ...o }),
      [[0, { mood: 'happy', armR: 20 }], [tA, { mood: 'determined', look: [0, 1], armR: [62, 2, 2.6] }], [tBl + 0.6, { mood: 'surprised', armR: 30 }]]) + '</g>'
    + snowfall(16, 11)
    + NEAR(snowfall(5, 13, { fall: 760 }));
}

// 4 · the miracle (3D valleyMiracle, dolly): he opens the cloak; red and white roses; light swells behind the castle
function scene4() {
  const tO = at(4, 'opened'), tT = at(4, 'There was'), tR = at(4, 'roses'), tW = at(4, 'And some say');
  return MID(pine(-20, 1270, 1.35) + pine(1110, 1260, 1.25))
    + snowGround(1250, 1)
    + `<g opacity="0"${fadeIn(tT, 1.2)}>${rays(540, 900, { op: 0.11, color: '#fff0d0' })}${glow(400, 1050, 460, 0.6)}</g>`
    + seq((o) => elizabethHD(410, 1315, 2.3, o), [
      [0, { mood: 'worried', look: [2.4, 0.6], armL: -14, armR: -22, over: bundle }],
      [tT, { mood: 'surprised', look: [0, 1.6], armL: [46, 2, 3], armR: [46, 2, 3.3], over: roseLap(1.05) }],
      [tR + 0.5, { mood: 'tender', armL: [46, 2, 3], armR: [46, 2, 3.3], over: roseLap(1.05) }],
      [tW + 0.4, { mood: 'happy', look: [0, 0], halo: true, armL: [46, 2, 3], armR: [46, 2, 3.3], over: roseLap(1.05) }]])
    + roseFall(410, 1060, tT + 0.3, 2)
    + `<g opacity="0"${fadeIn(tT, 0.6)}>${sparkles(18, 220, 620, 820, 1180, { seed: 4, color: '#ffe0e8' })}</g>`
    + seq((o) => ludwigHD(750, 1315, 2.1, { flip: true, armL: 14, ...o }), [
      [0, { mood: 'determined', look: [0, 1], armR: [58, 2, 2.6] }],
      [tT, { mood: 'surprised', armR: [30, 2, 3] }],
      [tR + 0.3, { mood: 'awe', look: [-1, 3], armR: [40, 2, 3] }],
      [tW + 0.4, { mood: 'joy', armR: [40, 2, 3] }]])
    + `<g opacity="0"${fadeIn(tW, 0.8)}>${snowfall(16, 21)}${petals(10, { seed: 6, colors: ['#e2566a', '#ffffff', '#f2a0b0'] })}</g>`
    + snowfall(10, 17)
    + NEAR(bokeh(6, { seed: 7, op: [0.25, 0.55] }));
}

// 5 · what came of it (SVG, tilt-up + rack): Ludwig stands by her; a child gets bread; halo and rays on the quotable line
function scene5() {
  const tG = at(5, 'God'), tS = at(5, 'stood'), tQ = at(5, 'She gave'), tH = at(5, 'heaven');
  return FAR(sky(GOLDSNOW) + `<g opacity="0"${fadeIn(tH - 0.3, 1.2)}>${rays(540, 640, { op: 0.13 })}</g>`)
    + BACK(clouds(460, { color: '#fff2dc', op: 0.7, seed: 9 }) + hill(1040, 44, '#d8b8b0', 4) + wartburg(300, 960, 0.48, { crag: '#a890a0', wall: '#f4e6d4', roof: '#8a4a3a' })
      + `<path d="M-80 1020 Q540 990 1160 1020 L1160 1050 L-80 1050Z" fill="#f4ecec"/>`)
    + MID(fachwerk(900, 1200, 0.5, { wall: '#f6ead8' }) + fachwerk(1060, 1205, 0.46))
    + snowGround(1250, 5)
    + glow(470, 1080, 440, 0.55)
    + seq((o) => elizabethHD(470, 1315, 2.2, { armL: [40, 2, 3], propL: `<g transform="translate(0,-10)">${rose(-8, 0, 13, RW[0])}${rose(10, -6, 12, RW[1])}${rose(2, 12, 12, RW[2])}</g>`, ...o }), [
      [0, { mood: 'happy', armR: [24, 2, 3], look: [2, 0] }],
      [tS + 0.3, { mood: 'tender', armR: [64, 3, 2.6], propR: bread }],
      [tH, { mood: 'peaceful', halo: tH + 0.2, armR: [30, 2, 3] }]])
    + seq((o) => ludwigHD(770, 1315, 2.05, { flip: true, armL: 14, ...o }), [
      [0, { mood: 'surprised', armR: 24 }], [tG, { mood: 'awe', look: [-1, 2.4], armR: 24 }], [tS, { mood: 'happy', armR: [96, 2, 3] }], [tQ, { mood: 'tender', armR: 30 }]])
    + `<g opacity="0"${walkIn(tS - 0.3, -160)}>` + seq((o) => kidHD(190, 1325, 1.2, 1, { armL: 12, ...o }), [[0, { mood: 'happy', armR: [70, 3, 2.4] }], [tS + 0.8, { mood: 'joy', armR: [70, 3, 2.4], propR: bread }]]) + '</g>'
    + `<g opacity="0"${fadeIn(tQ, 1)}>${petals(16, { seed: 5, colors: ['#e2566a', '#ffffff', '#f6b9c8'] })}</g>`
    + snowfall(8, 23)
    + NEAR(bokeh(6, { seed: 13 }));
}

// 6 · feast day (3D valleyGlory, arc-l): portrait with roses; bread basket on "bakers"; children on "homeless"
function scene6() {
  const tB = at(6, 'bakers'), tHo = at(6, 'homeless'), tP = at(6, 'Saint Elizabeth');
  return MID(pine(-30, 1290, 1.3) + pine(1110, 1280, 1.2))
    + snowGround(1290, 7)
    + glow(540, 1100, 480, 0.75)
    + seq((o) => elizabethHD(540, 1315, 2.45, { halo: true, over: roseLap(1.0, 0.6), armL: [46, 2, 3], ...o }), [
      [0, { mood: 'happy', armR: [46, 2, 3.3] }], [tB, { mood: 'happy', armR: [30, 2, 3.3], propR: `<g transform="scale(1.4)">${bread_basket()}</g>` }],
      [tP, { mood: 'tender', armR: [30, 2, 3.3], propR: `<g transform="scale(1.4)">${bread_basket()}</g>` }]])
    + `<g opacity="0"${walkIn(tHo - 0.2, -140)}>${kidHD(170, 1335, 1.15, 0, { mood: 'joy', armL: 12, armR: [130, 12, 1.4] })}</g>`
    + `<g opacity="0"${walkIn(tHo, 140)}>${kidHD(880, 1335, 1.1, 1, { mood: 'joy', flip: true, armL: 12, armR: [130, 12, 1.5] })}</g>`
    + petals(12, { seed: 8, colors: ['#e2566a', '#ffffff', '#f6b9c8'] })
    + snowfall(8, 27)
    + NEAR(bokeh(7, { seed: 29 }));
}

export const STORY = {
  slug: SLUG, name: 'St_Elizabeth_of_Hungary_Roses',
  bg3d: './elizabeth_of_hungary_roses.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'Her bread turned into roses', thumb_title: 'St. Elizabeth of Hungary', thumb_scene: 4, thumb_t: 7,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'lˈʌdwɪɡ': 'lˈuːdvɪɡ',                                  // Ludwig (LOOD-vig), from elizabeth_of_hungary.mjs
    'wˈɔːɹtbɜːɡ': 'vˈɑːɹtbʊɹk',                             // Wartburg (VART-boork)
    'noʊvˈɛmbɚ sˈɛvəntˌiːn': 'noʊvˈɛmbɚ sˌɛvəntˈiːnθ',      // November 17 -> seventeenth
    'ˈaɪzənˌæk': 'ˈaɪzənˌɑːk',                              // Eisenach (EYE-zen-ahk)
    'θjʊɹɹˈɪŋɡiə': 'θʊɹˈɪndʒiə',                            // Thuringia (thuh-RIN-jee-uh)
  },
  scenes: [
    { kicker: 'WARTBURG CASTLE · GERMANY', title: "What's Under Her Cloak?", art: scene0, bg3d: 'valleyHook', cam: { move: 'push-fast', ox: 430, oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Caught on a castle path, a princess held her cloak tight around a secret.', 'This is Saint Elizabeth of Hungary.'] },
    { kicker: '1221 · THURINGIA', title: 'A Princess Bride', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ["A Hungarian king's daughter, she married Ludwig of Thuringia at 14.", 'They lived at the Wartburg, high above Eisenach, where a famous legend begins.'] },
    { kicker: 'EISENACH · BELOW THE CASTLE', title: 'Bread for the Poor', art: scene2, cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['The poor in the town below were hungry, so she carried them bread herself.', 'But some at court whispered that she was stealing from the castle.'] },
    { kicker: 'THE CASTLE PATH', title: 'Caught on the Path', art: scene3, cam: { move: 'push', oy: 950 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Then Ludwig rode up with his hunting party, and asked what she was carrying.', 'She blushed, and could not say a word.'] },
    { kicker: 'THE MIRACLE OF THE ROSES', title: 'Roses in Winter', art: scene4, bg3d: 'valleyMiracle', cam: { move: 'dolly', amt: 0.08, ox: 540, oy: 950 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['So he opened her cloak.', { text: 'There was no bread, only red and white roses.', speed: 0.85 }, 'And some say it was the dead of winter.'] },
    { kicker: 'A SIGN FROM GOD', title: 'Heaven Gave Back Roses', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Ludwig saw that God was with her, and he always stood by her giving.', 'She gave away bread, and heaven gave back roses.'] },
    { kicker: 'FEAST DAY · NOVEMBER 17', title: 'Patron of Bakers', art: scene6, bg3d: 'valleyGlory', cam: { move: 'arc-l', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is November 17. She is patron of bakers, and of the homeless.', 'Saint Elizabeth of Hungary, pray for us.'] },
  ],
};
