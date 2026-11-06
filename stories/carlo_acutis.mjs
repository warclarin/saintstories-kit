// St. Carlo Acutis (feast: October 12). Teen in a red polo, jeans and white sneakers, curly dark hair; monstrance, laptop, rosary.
// Exports for later reels: carlo, littleCarlo, monstrance, laptop, gamepad, codeTag, foodBag, milanBlocks, streetLamp, webPage, globe, hospitalRoom.
import { W, H, M, SKIES, SKIN, GOLD, sky, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, person, rosary, cross_staff, basilica, ground, dark, light, f, rng, uid, FAR, BACK, MID, NEAR } from '../art.mjs';
import { duomo, pectoral } from './charles_borromeo.mjs';
import { altar, stoneRoom } from './padre_pio.mjs';
import { followers, obelisk } from './peter.mjs';
import { assisi } from './francis.mjs';
import { sickBed } from './charbel.mjs';
import { glasses } from './kolbe.mjs';

const SKC = '#f2c9a6', HAIRC = '#3a2418', RED = '#cf3b3b', JEANS = '#3f5f96';
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.8) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.6) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const at = (x, y, svg, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${svg}</g>`;

// Sentence starts (s from scene start, from work/st_carlo_acutis/timings.json + ~0.5 s lead-in)
const S0B = 2.3, S0C = 4.0, S0H = 5.6;   // video games, code, "This is Saint…"
const S2B = 6.0;                          // "He called the Eucharist…"
const S4B = 6.8;                          // "His exhibition…"
const S5B = 5.5;                          // "He offered his suffering…"
const S6B = 6.8;                          // "He became the first millennial saint"
const S7B = 4.3;                          // "His feast day…"

// ---------------------------------------------------------------- Carlo
const curls = `<g fill="${HAIRC}"><circle cx="-31" cy="-279" r="11"/><circle cx="-16" cy="-291" r="12"/><circle cx="3" cy="-295" r="12"/><circle cx="21" cy="-291" r="11.5"/><circle cx="34" cy="-278" r="9.5"/></g>`
  + `<path d="M-14 -300 Q2 -306 18 -300" stroke="${light(HAIRC, 0.4)}" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/>`;
const polo = (c = RED) => `<path d="M-23 -211 L-5 -189 L0 -203 L5 -189 L23 -211 Q0 -199 -23 -211Z" fill="${light(c, 0.14)}"/>`
  + `<path d="M0 -203 V-170" stroke="${dark(c, 0.3)}" stroke-width="2.5"/><circle cx="0" cy="-190" r="2.4" fill="#f6f0e2"/><circle cx="0" cy="-178" r="2.4" fill="#f6f0e2"/>`;
const sneakers = '<g><ellipse cx="-17" cy="-6" rx="18" ry="9" fill="#f8f6f0"/><ellipse cx="17" cy="-6" rx="18" ry="9" fill="#f8f6f0"/>'
  + '<path d="M-33 -1 h32 M1 -1 h32" stroke="#c9ccd6" stroke-width="3"/><path d="M-24 -10 l9 -3 M10 -10 l9 -3" stroke="#2b4fa8" stroke-width="2.6" stroke-linecap="round"/></g>';
export const carlo = (x, y, s, { over = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', top: RED, pants: JEANS, skin: SKC, hair: HAIRC, beard: null, ...o,
  over: curls + polo(o.top || RED) + (o.kneel || o.sitting ? '' : sneakers) + over });
export const littleCarlo = (x, y, s, { over = '', ...o } = {}) => person(x, y, s, {
  kind: 'kid', top: RED, pants: '#2e3a5a', skin: SKC, hair: HAIRC, ...o, over: curls + (o.kneel || o.sitting ? '' : sneakers) + over });
const mom = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', girl: true, robe: true, top: '#5a7ab0', skin: SKC, hair: '#3a2a20', ...o });
const dad = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#3a3e52', pants: '#2e3040', skin: '#eac2a0', hair: '#4a3424', beard: null, ...o,
  over: '<path d="M-14 -209 L0 -180 L14 -209" fill="#f6f0e2"/><path d="M-3 -200 L0 -150 L3 -200Z" fill="#8a2a3a"/>' + (o.over || '') });

// ---------------------------------------------------------------- props
export const monstrance = (s = 1) => {
  let spikes = '';
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8, r1 = 26, r2 = i % 2 ? 44 : 56, w = 0.13;
    spikes += `<path d="M${f(r1 * Math.cos(a - w))} ${f(-74 + r1 * Math.sin(a - w))} L${f(r2 * Math.cos(a))} ${f(-74 + r2 * Math.sin(a))} L${f(r1 * Math.cos(a + w))} ${f(-74 + r1 * Math.sin(a + w))}Z" fill="${GOLD}"/>`;
  }
  return `<g transform="scale(${s})"><circle cy="-74" r="84" fill="url(#haloGlow)" opacity=".9"/>${spikes}`
    + `<circle cy="-74" r="27" fill="${GOLD}"/><circle cy="-74" r="27" fill="none" stroke="#b08a3a" stroke-width="3"/><circle cy="-74" r="18" fill="#fffaf0"/>`
    + `<path d="M0 -130 v-26 M-9 -146 h18" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`
    + `<rect x="-4.5" y="-48" width="9" height="40" fill="#c9a24a"/><circle cy="-28" r="7.5" fill="${GOLD}"/><path d="M-26 2 Q0 -16 26 2Z" fill="${GOLD}"/><rect x="-28" y="0" width="56" height="7" rx="3" fill="#b08a3a"/></g>`;
};
export const laptop = (s = 1) => `<g transform="scale(${s})"><rect x="-46" y="-66" width="92" height="62" rx="6" fill="#3a3c48"/><rect x="-40" y="-60" width="80" height="50" rx="3" fill="#6ab0e8"/>`
  + `<circle cx="0" cy="-35" r="16" fill="#fff" opacity=".22"/><circle cx="0" cy="-35" r="9" fill="${GOLD}"/><circle cx="0" cy="-35" r="5" fill="#fffaf0"/><rect x="-32" y="-20" width="40" height="4" rx="2" fill="#fff" opacity=".6"/>`
  + `<path d="M-56 -4 L56 -4 L64 8 L-64 8Z" fill="#5a5c6a"/><path d="M-64 8 L64 8 L62 12 L-62 12Z" fill="#2a2c36"/></g>`;
export const gamepad = (s = 1) => `<g transform="scale(${s}) translate(0,-4)"><path d="M-34 -14 Q-42 -16 -46 -4 L-52 16 Q-54 30 -40 30 Q-31 30 -26 16 L26 16 Q31 30 40 30 Q54 30 52 16 L46 -4 Q42 -16 34 -14Z" fill="#3a3a4a"/>`
  + '<path d="M-31 -2 h16 M-23 -10 v16" stroke="#cfd4e0" stroke-width="5" stroke-linecap="round"/><circle cx="22" cy="-8" r="4.5" fill="#e25a5a"/><circle cx="32" cy="0" r="4.5" fill="#5ab05a"/><circle cx="12" cy="0" r="4.5" fill="#5a8ae2"/><circle cx="22" cy="8" r="4.5" fill="#f2c46b"/></g>';
export const codeTag = (s = 1) => `<g transform="scale(${s})"><rect x="-62" y="-36" width="124" height="72" rx="18" fill="#2a2a3e"/><rect x="-62" y="-36" width="124" height="72" rx="18" fill="none" stroke="#7ee08a" stroke-width="3" opacity=".5"/>`
  + '<text y="14" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="40" fill="#7ee08a">&lt;/&gt;</text></g>';
export const foodBag = `<g transform="translate(0,-4)"><path d="M-18 -30 L18 -30 L22 16 L-22 16Z" fill="#c89a5e"/><path d="M6 -30 L18 -30 L22 16 L10 16Z" fill="#a8783e" opacity=".6"/>`
  + '<ellipse cx="-4" cy="-34" rx="14" ry="8" fill="#e2b061"/><rect x="6" y="-50" width="7" height="22" rx="3" fill="#7ab0d8"/><path d="M-18 -30 L18 -30" stroke="#a8783e" stroke-width="3"/></g>';
const heart = (c = '#e25a6a') => `<path d="M0 12 C-30 -8 -18 -32 0 -18 C18 -32 30 -8 0 12Z" fill="${c}"/>`;

// ---------------------------------------------------------------- set pieces
// Milan apartment blocks: ochre and terracotta facades with balconies and shutters (x0..x1 so a landmark can show between)
export function milanBlocks(y, { x0 = -80, x1 = W + 80, walls = ['#e8b98a', '#d99a6c', '#f0d0a0', '#c98a62'], win = '#7aa6d8', lit = 0, seed = 5, hmin = 260, hvar = 140 } = {}) {
  const r = rng(seed); let o = '';
  for (let x = x0, i = 0; x < x1; i++) {
    const w = 150 + r() * 60, h = hmin + r() * hvar, c = walls[i % walls.length], top = y - h;
    o += `<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(h + 30)}" fill="${c}"/><rect x="${f(x + w * 0.72)}" y="${f(top)}" width="${f(w * 0.28)}" height="${f(h + 30)}" fill="${dark(c, 0.16)}" opacity=".55"/>`
      + `<rect x="${f(x - 6)}" y="${f(top - 14)}" width="${f(w + 12)}" height="16" fill="${dark(c, 0.3)}"/>`;
    for (let wy = top + 40; wy < y - 70; wy += 82) for (const k of [0.2, 0.45, 0.7]) {
      const wx = x + w * k - 10, c2 = r() < lit ? '#ffd98a' : win;
      o += `<rect x="${f(wx)}" y="${f(wy)}" width="20" height="34" fill="${c2}"/><rect x="${f(wx - 5)}" y="${f(wy + 34)}" width="30" height="5" fill="${dark(c, 0.35)}"/>`;
    }
    x += w + 4;
  }
  return o;
}
export const streetLamp = (x, y, s = 1, on = true) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-5" y="-330" width="10" height="330" fill="#2e2a36"/><path d="M0 -330 Q0 -360 30 -360" stroke="#2e2a36" stroke-width="8" fill="none"/>`
  + `<path d="M18 -362 L42 -362 L48 -340 L12 -340Z" fill="#2e2a36"/>${on ? `<circle cx="30" cy="-334" r="70" fill="url(#sunGlow)" opacity=".8"/><ellipse cx="30" cy="-338" rx="13" ry="7" fill="#ffe6a8"/>` : ''}</g>`;
// A web page window: title bar, monstrance image, text lines, thumbnails
export function webPage(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-206" y="-146" width="420" height="310" rx="20" fill="#1a1022" opacity=".25" filter="url(#soft)"/>`
    + `<rect x="-210" y="-155" width="420" height="310" rx="20" fill="#fbf7ee"/><path d="M-210 -125 V-135 Q-210 -155 -190 -155 H190 Q210 -155 210 -135 V-125Z" fill="#3f6fb8"/>`
    + `<circle cx="-186" cy="-140" r="6" fill="#ff8a7a"/><circle cx="-166" cy="-140" r="6" fill="#ffd36a"/><circle cx="-146" cy="-140" r="6" fill="#8ad68a"/><rect x="-120" y="-147" width="230" height="14" rx="7" fill="#fff" opacity=".35"/>`
    + `<rect x="-188" y="-108" width="170" height="170" rx="12" fill="#3a2a50"/><g transform="translate(-103,48) scale(0.95)">${monstrance(1)}</g>`
    + [-96, -70, -44, -18].map((ly, i) => `<rect x="0" y="${ly}" width="${i % 2 ? 150 : 186}" height="12" rx="6" fill="${i ? '#d9cfba' : '#c8323a'}"/>`).join('')
    + [0, 64, 128].map((tx, i) => `<rect x="${tx}" y="10" width="56" height="52" rx="8" fill="${['#e2b061', '#8ab4d8', '#c99ef0'][i]}"/><circle cx="${tx + 28}" cy="32" r="10" fill="#fff" opacity=".6"/>`).join('')
    + `<rect x="-188" y="84" width="376" height="12" rx="6" fill="#d9cfba"/><rect x="-188" y="108" width="300" height="12" rx="6" fill="#d9cfba"/></g>`;
}
// Spinning globe with continents scrolling inside a clip; pins pop in at `pinAt`
export function globe(x, y, r = 110, { pinAt = null } = {}) {
  const id = uid('gl'), T = 2 * r;
  const land = (ox) => `<g transform="translate(${ox},0)" fill="#6ab070"><path d="M${-0.8 * r} ${-0.5 * r} q${0.3 * r} ${-0.25 * r} ${0.55 * r} ${-0.05 * r} q${0.1 * r} ${0.3 * r} ${-0.15 * r} ${0.45 * r} q${-0.3 * r} ${0.1 * r} ${-0.4 * r} ${-0.4 * r}Z"/>`
    + `<path d="M${-0.35 * r} ${0.1 * r} q${0.2 * r} ${-0.05 * r} ${0.22 * r} ${0.2 * r} q${-0.02 * r} ${0.35 * r} ${-0.16 * r} ${0.5 * r} q${-0.12 * r} ${-0.3 * r} ${-0.06 * r} ${-0.7 * r}Z"/>`
    + `<path d="M${0.1 * r} ${-0.6 * r} q${0.5 * r} ${-0.1 * r} ${0.75 * r} ${0.15 * r} q${-0.1 * r} ${0.3 * r} ${-0.35 * r} ${0.25 * r} q${-0.05 * r} ${0.5 * r} ${-0.2 * r} ${0.55 * r} q${-0.2 * r} ${-0.4 * r} ${-0.2 * r} ${-0.95 * r}Z"/>`
    + `<ellipse cx="${0.62 * r}" cy="${0.5 * r}" rx="${0.2 * r}" ry="${0.13 * r}"/></g>`;
  const pins = pinAt === null ? '' : [[-0.5, -0.35], [-0.2, 0.3], [0.3, -0.3], [0.45, 0.1], [0.62, 0.5], [-0.1, -0.6], [0.05, 0.05]]
    .map(([px, py], i) => `<g transform="translate(${f(px * r)},${f(py * r)})"${M.in('pop', pinAt + i * 0.25, 0.5)}><circle r="16" fill="url(#haloGlow)"/><circle r="7" fill="${GOLD}"/><circle r="3" fill="#fff8e0"/></g>`).join('');
  return `<g transform="translate(${x},${y})"><circle r="${r * 1.5}" fill="url(#haloGlow)" opacity=".5"/><defs><clipPath id="${id}"><circle r="${r}"/></clipPath></defs>`
    + `<circle r="${r}" fill="#4a8ac4"/><g clip-path="url(#${id})"><g${M.scroll(T, 9)}>${land(-T)}${land(0)}${land(T)}</g></g>`
    + `<path d="M0 ${r} A${r} ${r} 0 0 0 0 ${-r} A${r * 0.6} ${r} 0 0 1 0 ${r}Z" fill="#1a2a50" opacity=".22"/><circle cx="${-0.35 * r}" cy="${-0.4 * r}" r="${0.25 * r}" fill="#fff" opacity=".25"/>`
    + `<ellipse rx="${r * 0.45}" ry="${r}" fill="none" stroke="#bfe0f6" stroke-width="2" opacity=".5"/><path d="M${-r} 0 H${r}" stroke="#bfe0f6" stroke-width="2" opacity=".5"/>${pins}</g>`;
}
// Night hospital room with a window
export function hospitalRoom(floor = 1260, { wall = '#3a3f62', win = [760, 470, 280, 330] } = {}) {
  const [wx, wy, ww, wh] = win;
  let stars = ''; const r = rng(4);
  for (let i = 0; i < 16; i++) stars += `<circle cx="${f(wx + 14 + r() * (ww - 28))}" cy="${f(wy + 14 + r() * (wh - 28))}" r="${f(1.5 + r() * 2)}" fill="#fff8e0"${M.flick(1.6 + r() * 2, r() * 2, 0.2)}/>`;
  return `<rect x="-200" y="-400" width="${W + 400}" height="${floor + 440}" fill="${wall}"/><rect x="-200" y="${floor - 120}" width="${W + 400}" height="120" fill="${dark(wall, 0.15)}"/>`
    + `<rect x="${wx - 16}" y="${wy - 16}" width="${ww + 32}" height="${wh + 32}" rx="10" fill="${light(wall, 0.25)}"/><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#16183a"/>${stars}`
    + `<circle cx="${wx + ww * 0.7}" cy="${wy + wh * 0.3}" r="34" fill="#f6efd8"/><circle cx="${wx + ww * 0.7}" cy="${wy + wh * 0.3}" r="120" fill="url(#sunGlow)" opacity=".35"/>`
    + `<path d="M${wx + ww / 2} ${wy} V${wy + wh} M${wx} ${wy + wh / 2} H${wx + ww}" stroke="${light(wall, 0.25)}" stroke-width="10"/>`;
}
const desk = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-260" y="-12" width="520" height="26" rx="6" fill="#8a5a36"/><rect x="-260" y="6" width="520" height="8" fill="#6a4226"/>`
  + '<rect x="-240" y="14" width="22" height="170" fill="#6a4226"/><rect x="218" y="14" width="22" height="170" fill="#6a4226"/><rect x="100" y="14" width="120" height="90" fill="#7a4e2e"/><rect x="146" y="50" width="28" height="7" rx="3" fill="#c9a24a"/></g>';
const shelf = (x, y) => `<g transform="translate(${x},${y})"><rect x="-120" y="-300" width="240" height="300" fill="#7a5236"/><rect x="-108" y="-288" width="216" height="276" fill="#5a3a24"/>`
  + [-200, -100].map((sy) => `<rect x="-108" y="${sy}" width="216" height="10" fill="#7a5236"/>`).join('')
  + [[-96, -200, 80, '#c8323a'], [-70, -200, 70, '#3f6fb8'], [-46, -200, 84, '#e2b061'], [-20, -200, 64, '#6aa457'], [20, -100, 80, '#c99ef0'], [46, -100, 70, '#d8644e'], [-90, -12, 72, '#4a8ac4'], [-60, -12, 62, '#f2c46b']]
    .map(([bx, bot, h, c]) => `<rect x="${bx}" y="${bot - h}" width="22" height="${h}" fill="${c}"/>`).join('') + '</g>';
const tapestry = (x, y, t) => `<g transform="translate(${x},${y})"><g${M.in('grow', t, 1.4, 0, 0)}>`
  + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
  + '<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>'
  + `<g${M.in('pop', t + 1.0, 0.8, 0, 300)}>${carlo(0, 408, 1.1, { halo: true, mood: 'happy', armL: [26, 2, 3], armR: [30, 2, 3], propR: monstrance(0.62) })}</g>`
  + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';

// ---------------------------------------------------------------- scenes
// 0 · hook: jeans, sneakers, games, code — then the halo
function scene0() {
  return FAR(sky(SKIES.dusk, { stars: 22, seed: 3 }) + rays(540, 760, { op: 0.08 }))
    + BACK(clouds(620, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 5 }) + duomo(540, 1190, 0.8, { wall: '#8a6a8a', win: '#ffd98a', door: '#4a3450' }))
    + glow(540, 1080, 520, 0.8)
    + MID(milanBlocks(1250, { x0: -80, x1: 250, walls: ['#7a5470', '#6a4a66'], win: '#5a4060', lit: 0.5, seed: 3, hmin: 220, hvar: 80 })
      + milanBlocks(1250, { x0: 840, x1: W + 80, walls: ['#6a4a66', '#82607a'], win: '#5a4060', lit: 0.5, seed: 8, hmin: 220, hvar: 80 }))
    + ground(1270, '#4a3046', { rim: '#c08a7a' }) + tufts(1276, 10, '#3a2438', { seed: 7 })
    + `<ellipse cx="540" cy="1300" rx="280" ry="38" fill="#ffcf8a" opacity=".25" filter="url(#blur14)"/>`
    + carlo(540, 1305, 2.4, { mood: 'joy', armL: [30, 2, 3], armR: [28, 2, 3.4], propL: gamepad(0.75), propR: laptop(0.62), halo: S0H })
    + `<g transform="translate(205,700)"${M.in('pop', S0C, 0.7)}><g${M.bob(10, 2.6)}>${codeTag(1.2)}</g></g>`
    + `<g transform="translate(880,800)"${M.in('pop', S0B, 0.7)}><g${M.bob(10, 3, 0.7)}><circle r="70" fill="url(#haloGlow)" opacity=".6"/>${gamepad(1.4)}</g></g>`
    + `<g transform="translate(190,1040)"${M.in('pop', S0H + 0.4, 0.8)}><g${M.bob(8, 3.2, 0.3)}>${monstrance(0.9)}</g></g>`
    + motes(16, { y0: 520, y1: 1240, seed: 4 })
    + NEAR(foliage('l', 1610, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

// 1 · born in London 1991, grew up in Milan; the little boy who loved to pray
function scene1() {
  return FAR(sky(SKIES.day) + `<circle cx="880" cy="520" r="250" fill="url(#sunGlow)"/><circle cx="880" cy="520" r="52" fill="#fff7dc"/>`)
    + BACK(clouds(450, { seed: 2 }) + duomo(560, 1110, 0.7))
    + MID(milanBlocks(1200, { x0: -80, x1: 260, seed: 4 }) + milanBlocks(1200, { x0: 860, x1: W + 80, seed: 9 }) + hill(1210, 6, '#c9a87a', 3))
    + ground(1220, '#d9b98a', { rim: '#f0d8a8' })
    + dad(250, 1310, 1.75, { mood: 'happy', armL: 10, armR: [40, 4, 3] })
    + mom(830, 1310, 1.7, { mood: 'surprised', flip: true, armL: [40, 4, 3.2], armR: 10 })
    + `<g${M.in('rise', 0.4, 1)}>${littleCarlo(540, 1330, 1.55, { mood: 'peaceful', kneel: true, armL: -18, armR: -18 })}</g>`
    + sparkles(10, 420, 660, 860, 1060, { seed: 3 })
    + flowers(1240, 1320, 10, { seed: 5 })
    + NEAR(foliage('r', 1640, { color: '#3a5a2e', seed: 4 }));
}

// 2 · First Communion at seven; daily Mass; "highway to heaven"
function scene2() {
  return FAR(stoneRoom('#4a3a48', '#544252', 1200))
    + BACK(`<path d="M440 1000 V640 Q540 520 640 640 V1000Z" fill="#c8a24a" opacity=".25"/><path d="M462 980 V650 Q540 552 618 650 V980Z" fill="#2a3e7a"/><path d="M462 980 V820 H618 V980Z" fill="#8a2a4a"/><path d="M540 560 V980 M462 820 H618" stroke="#f2c46b" stroke-width="5"/>`)
    + `<g${M.in('fade', 0.6, 1.8)}>${rays(540, 900, { op: 0.13 })}${glow(540, 900, 520, 0.9)}</g>`
    + MID(`<rect x="-200" y="1200" width="${W + 400}" height="800" fill="#3a2c34"/><rect x="-200" y="1196" width="${W + 400}" height="8" fill="#6a5658"/>` + altar(540, 1200, 1.25, { cross: false }))
    + at(540, 1012, `<g${M.pulse(0.04, 2.6, 0, 0, -74)}>${monstrance(1.45)}</g>`)
    + `<g${M.in('fade', S2B, 1.4)}>${beam(470, 610, 300, 780, 1360, 0.42)}${sparkles(16, 300, 780, 560, 1300, { seed: 6, color: '#ffe9b0' })}</g>`
    + littleCarlo(540, 1360, 1.6, { mood: 'peaceful', kneel: true, top: '#fbf7ee', armL: -18, armR: -18 })
    + motes(18, { x0: 160, x1: 920, y0: 600, y1: 1200, color: '#ffe0a0', seed: 3 });
}

// 3 · defending classmates, food for the homeless
function scene3() {
  const man = person(800, 1320, 1.45, { kind: 'elder', robe: false, top: '#7a6a5a', pants: '#5a4e44', skin: '#e2b48f', hair: '#bdb6aa', beard: '#bdb6aa', sitting: true, flip: true, mood: 'surprised', armL: 12, armR: [60, 4, 3] });
  return FAR(sky(SKIES.sunrise) + glow(540, 760, 420, 0.6))
    + BACK(clouds(470, { color: '#fff4e4', op: 0.7, seed: 6 }) + milanBlocks(1200, { seed: 12, hmin: 420, hvar: 160, walls: ['#e8b98a', '#d99a6c', '#f0d0a0', '#c98a62'] }))
    + MID(streetLamp(990, 1240, 1.1) + `<rect x="-200" y="1200" width="${W + 400}" height="40" fill="#b8a48a"/>`)
    + ground(1240, '#9a8a7a', { rim: '#cfc0aa' })
    + man
    + `<path d="M690 1300 Q800 1250 905 1290 Q910 1330 800 1335 Q690 1330 690 1300Z" fill="#4a6a8a"/><path d="M700 1296 Q800 1262 900 1290" stroke="#6a8aaa" stroke-width="6" fill="none"/>`
    + person(150, 1300, 1.3, { kind: 'kid', top: '#6aa457', pants: '#3a3a4a', skin: SKIN.priest, hair: '#a06a30', mood: 'joy', armL: 10, armR: [30, 3, 3], over: glasses })
    + `<g${M.tw([{ at: 0.4, dur: 1.2, from: { x: -60 }, to: { x: 0 }, ease: 'power2.out' }])}>${carlo(430, 1320, 2.1, { mood: 'happy', armL: [20, 2, 3], armR: [55, 3, 3], propR: foodBag })}</g>`
    + `<g transform="translate(620,820)"${M.in('pop', 1.8, 0.8)}><g${M.bob(10, 2.8)}><circle r="60" fill="url(#haloGlow)" opacity=".6"/>${heart()}</g></g>`
    + NEAR(foliage('l', 1640, { color: '#3a4a2e' }));
}

// 4 · coding: the website of Eucharistic miracles, the exhibition goes round the world
function scene4() {
  return FAR(`<rect x="-200" y="-400" width="${W + 400}" height="${H + 800}" fill="#e6cfa6"/>` + [...Array(12).keys()].map((i) => `<rect x="${-120 + i * 110}" y="-400" width="40" height="1700" fill="#dcc298" opacity=".6"/>`).join(''))
    + BACK(shelf(160, 1190) + glow(720, 760, 460, 0.7))
    + MID(`<rect x="-200" y="1190" width="${W + 400}" height="800" fill="#a8784e"/><rect x="-200" y="1186" width="${W + 400}" height="8" fill="#c8986a"/>`)
    + `<g${M.in('rise', 0.4, 1.0)}>${webPage(700, 760, 1)}</g>`
    + carlo(330, 1330, 2.05, { mood: 'joy', armL: 10, armR: [95, 6, 2.6] })
    + desk(380, 1200, 1)
    + at(330, 1188, laptop(1.6))
    + `<g${M.in('pop', S4B - 0.6, 0.9)}>${globe(850, 1110, 105, { pinAt: S4B })}</g>`
    + sparkles(12, 520, 940, 600, 1200, { seed: 8, color: '#fff2c0' });
}

// 5 · leukemia at 15; offered his suffering; died October 12, 2006 in Monza
function scene5() {
  const lying = `<g transform="translate(560,1112) rotate(-90)">${carlo(0, 0, 1.25, { mood: 'peaceful', armL: 0, armR: 0, top: '#cfd8e8' })}</g>`;
  return FAR(hospitalRoom(1260))
    + `<g${M.in('fade', S5B, 1.6)}>${beam(800, 960, 230, 620, 1260, 0.42)}${glow(300, 1080, 300, 0.7)}</g>`
    + MID(`<rect x="-200" y="1260" width="${W + 400}" height="800" fill="#2a2c48"/><rect x="-200" y="1256" width="${W + 400}" height="8" fill="#5a5c7a"/>`)
    + sickBed(470, 1250, 1.15)
    + lying
    + `<path d="M330 1100 Q560 1060 785 1135 L788 1170 L330 1170Z" fill="#7a90c0"/><path d="M330 1100 Q560 1060 785 1135" stroke="#9ab0da" stroke-width="8" fill="none"/>`
    + mom(930, 1320, 1.55, { mood: 'peaceful', flip: true, top: '#4a5a8a', armL: [-18, 1, 3], armR: [-18, 1, 3], propL: rosary() })
    + `<g${M.in('fade', S5B + 0.6, 1.4)}>${motes(20, { x0: 200, x1: 760, y0: 640, y1: 1150, seed: 6, rise: 160 })}</g>`;
}

// 6 · two miracles; canonized by Pope Leo XIV, September 7, 2025, St. Peter's Square
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
function scene6() {
  const zucchetto = '<path d="M-30 -284 Q0 -306 30 -284 Q0 -292 -30 -284Z" fill="#fbf7ee"/>';
  const pope = person(860, 1330, 1.7, { kind: 'priest', top: '#f6f0e2', collar: false, beard: null, skin: SKIN.fair, hair: '#a8a098', mood: 'joy', flip: true,
    armL: [18, 2, 3], armR: [110, 3, 2.6], propL: cross_staff(250), over: zucchetto + pectoral });
  return FAR(sky(GOLDSKY) + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7))
    + BACK(clouds(860, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + basilica(540, 1180, 1.05, { color: '#3a2a40' }) + obelisk(190, 1190, 0.95))
    + tapestry(540, 440, 0.3)
    + ground(1180, '#6a5468', { rim: '#a88a98' })
    + MID(followers(1340, 14, { color: '#241a2e' }))
    + pope
    + MID(followers(1420, 12, { color: '#2e2238' }))
    + `<g${M.in('fade', S6B, 1)}>${petals(26, { seed: 4, colors: ['#ffffff', '#f2c46b', '#cf3b3b'] })}</g>`
    + NEAR(foliage('l', 1650, { color: '#2a1a24', seed: 8 }));
}

// 7 · rests in Assisi in jeans and sneakers; feast October 12; patron of the internet
function scene7() {
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(600, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 6 }) + assisi(540, 1170, 1.0, { wall: '#8a6a88', roof: '#5a3a5a', hillC: '#5d4678', win: '#ffd98a' }))
    + glow(540, 1060, 500, 0.8)
    + MID(hill(1262, 14, '#6a4458', 6))
    + ground(1290, '#5a3a4c', { rim: '#c07a7a' }) + tufts(1296, 10, '#3a2438', { seed: 7 })
    + carlo(540, 1305, 2.4, { mood: 'happy', halo: 0.3, armL: [26, 2, 3], armR: [10, 2, 3.4], propL: rosary(), propR: monstrance(0.58) })
    + `<g transform="translate(190,760)"${M.in('pop', S7B, 0.8)}><g${M.bob(10, 2.8)}>${laptop(1.6)}</g></g>`
    + `<g transform="translate(890,700)"${M.in('pop', S7B + 0.5, 0.8)}><g${M.bob(10, 3.1, 0.5)}>${globe(0, 0, 72)}</g></g>`
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', '#cf3b3b', '#f6d36b'] })
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_carlo_acutis', name: 'St_Carlo_Acutis',
  voice: 'am_michael', speed: 0.95,
  thumb_hook: 'The first millennial saint', thumb_title: 'St. Carlo Acutis', thumb_shift: 0, thumb_t: 7.3,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'ɐkjˈuːɾiz': 'ɐkˈuːtɪs',          // Acutis (a-KOO-tis)
  },
  scenes: [
    { kicker: "GOD'S INFLUENCER", title: 'Carlo Acutis', art: scene0, cam: { move: 'push', amt: 0.07, oy: 950 },
      say: ['He wore jeans and sneakers, played video games, and taught himself to code.', 'This is Saint Carlo Acutis.'] },
    { kicker: '1991 · LONDON & MILAN', title: 'A Boy Who Loved to Pray', art: scene1, cam: 'drift-r',
      say: ['Carlo was born in London in 1991, and grew up in Milan, Italy.', 'His parents rarely went to church, but little Carlo loved to pray.'] },
    { kicker: '1998 · FIRST COMMUNION', title: 'Highway to Heaven', art: scene2, cam: { move: 'tilt-up', amt: 0.06 },
      say: ['At seven, he made his First Communion, and from then on he went to Mass every day.', 'He called the Eucharist his highway to heaven.'] },
    { kicker: 'MILAN · A FRIEND TO ALL', title: 'Love in Action', art: scene3, cam: 'pan-r',
      say: ['He defended bullied classmates, and spent his pocket money on food for the homeless.'] },
    { kicker: 'THE EUCHARISTIC MIRACLES', title: 'Coding for God', art: scene4, cam: { move: 'push', amt: 0.07, ox: 640, oy: 900 },
      say: ['He taught himself computer code, and built a website about the Eucharistic miracles of the world.', 'His exhibition has since reached thousands of parishes on five continents.'] },
    { kicker: 'OCTOBER 12, 2006 · MONZA', title: 'Offered with Love', art: scene5, cam: { move: 'tilt-up', amt: 0.06 },
      say: ['In 2006, at just 15, Carlo fell ill with leukemia.', 'He offered his suffering for the Pope and the Church, and died a few days later.'] },
    { kicker: 'SEPTEMBER 7, 2025 · ROME', title: 'A Millennial Saint', art: scene6, cam: { move: 'pull', amt: 0.06, oy: 800 },
      say: ['After two healing miracles, Pope Leo XIV declared him a saint in 2025.', 'He became the first millennial saint.'] },
    { kicker: 'FEAST DAY · OCTOBER 12', title: 'Patron of the Internet', art: scene7, cam: { move: 'push', amt: 0.07, oy: 1000 },
      say: ['Today he rests in Assisi, in jeans and sneakers.', 'His feast day is October 12, and many call him the patron of the internet.', 'Saint Carlo Acutis, pray for us.'] },
  ],
};
