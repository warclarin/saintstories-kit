// St. Francis of Assisi
import { W, M, SKIES, SKIN, CREAM, GOLD, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts,
  flowers, gulls, butterflies, petals, person, book, cross_staff, crowd, ground, dark, light, rng, f } from '../art.mjs';

const SK = SKIN.priest;
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ---------------------------------------------------------------- props / overlays
export const tonsure = `<ellipse cx="0" cy="-289" rx="21" ry="8" fill="${SK}"/><ellipse cx="6" cy="-288" rx="10" ry="5" fill="${dark(SK, 0.2)}" opacity=".35"/>`;
export const mitre = `<path d="M-31 -282 L-35 -338 Q-20 -372 0 -384 Q20 -372 35 -338 L31 -282Z" fill="#f4ead2"/><path d="M8 -380 Q22 -368 35 -338 L31 -282 L14 -282Z" fill="#d9ccaa"/>`
  + `<path d="M0 -380 V-284 M-30 -300 H30" stroke="${GOLD}" stroke-width="7"/>`;
export const cope = `<path d="M-40 -206 Q-92 -110 -84 -2 L84 -2 Q92 -110 40 -206 Z" fill="#c9a24a"/><path d="M40 -206 Q92 -110 84 -2 L58 -2 Q66 -110 30 -200Z" fill="#a8822e" opacity=".7"/>`;
export const stole = `<path d="M-20 -206 L-24 -40 M20 -206 L24 -40" stroke="${GOLD}" stroke-width="12"/>`;
export const plumedCap = `<path d="M-44 -274 Q-40 -312 0 -314 Q40 -312 44 -274 Q0 -284 -44 -274Z" fill="#2f4a8a"/><path d="M-44 -274 Q0 -284 44 -274" stroke="#f2c46b" stroke-width="4" fill="none"/>`
  + `<path d="M28 -300 Q70 -330 54 -370" stroke="#f6f0e2" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M30 -302 Q66 -330 52 -364" stroke="#d8644e" stroke-width="3" fill="none"/>`;
export const smallCross = `<g transform="translate(0,20)"><rect x="-5" y="-140" width="10" height="150" rx="4" fill="#7a5536"/><rect x="1" y="-140" width="4" height="150" fill="#5a3d22" opacity=".6"/><rect x="-30" y="-112" width="60" height="10" rx="4" fill="#7a5536"/></g>`;
export const stone = `<g transform="translate(0,-6)"><rect x="-26" y="-20" width="52" height="34" rx="6" fill="#c9b79a"/><rect x="6" y="-20" width="20" height="34" rx="5" fill="#a8977c"/><path d="M-18 -8 h20" stroke="#a8977c" stroke-width="3"/></g>`;
export const clothes = `<g><rect x="-30" y="-14" width="60" height="22" rx="6" fill="#b8323e"/><rect x="-26" y="-30" width="52" height="18" rx="6" fill="#2f4a8a"/><path d="M-26 -22 h52" stroke="#f2c46b" stroke-width="3"/></g>`;

export function bird(c = '#8a6a4a', s = 1, flipX = false) {
  return `<g transform="scale(${flipX ? -s : s},${s})"><path d="M-14 0 L-32 -8 L-30 6Z" fill="${dark(c, 0.25)}"/><ellipse cx="0" cy="0" rx="17" ry="13" fill="${c}"/>`
    + `<ellipse cx="3" cy="5" rx="10" ry="7" fill="${light(c, 0.5)}"/><circle cx="13" cy="-11" r="10" fill="${c}"/><path d="M22 -13 L31 -10 L22 -7Z" fill="#e2a33a"/>`
    + `<circle cx="16" cy="-13" r="2.3" fill="#2b1d14"/><circle cx="16.8" cy="-13.8" r=".8" fill="#fff"/><ellipse cx="-4" cy="-2" rx="11" ry="6.5" fill="${dark(c, 0.22)}" transform="rotate(-15)"/>`
    + `<path d="M-2 12 v7 M5 12 v7" stroke="#c98a3a" stroke-width="2.4"/></g>`;
}
export const perched = (x, y, c, s = 1, fl = false, ph = 0) => `<g transform="translate(${x},${y})"><g${M.bob(5, 1.3 + ph, ph)}>${bird(c, s, fl)}</g></g>`;
export function flyer(x, y, c, s = 1, { dx = 120, dy = -60, ph = 0 } = {}) {
  return `<g${M.drift(dx, dy)}><g transform="translate(${x},${y}) scale(${s})"><g${M.bob(10, 2.4 + ph, ph)}>`
    + `<g${M.flap(0.4, ph)}><path d="M-4 -2 Q-26 -34 -44 -14 Q-24 -12 -4 4Z" fill="${dark(c, 0.15)}"/><path d="M4 -2 Q26 -34 44 -14 Q24 -12 4 4Z" fill="${c}"/></g>`
    + `<ellipse cx="0" cy="2" rx="14" ry="9" fill="${c}"/><circle cx="12" cy="-3" r="7" fill="${c}"/><path d="M18 -4 L25 -2 L18 0Z" fill="#e2a33a"/><circle cx="14" cy="-4" r="1.6" fill="#2b1d14"/></g></g></g>`;
}

// Hill town silhouette (Assisi): houses on a hill, a campanile, the Rocca fortress, the basilica
export function assisi(x, y, s = 1, { wall = '#d9c2a0', roof = '#c0623e', hillC = '#8fae6a', win = null, shade = 0.18 } = {}) {
  const r = rng(21); let b = '';
  b += `<path d="M-560 40 Q-320 -110 0 -175 Q320 -110 560 40Z" fill="${hillC}"/>`;
  for (let i = -9; i <= 9; i++) {
    const hx = i * 52 + (r() - 0.5) * 14, base = -175 * (1 - (hx / 560) ** 2) + 22, h = 40 + r() * 60, w = 44 + r() * 18;
    const c = i % 2 ? wall : light(wall, 0.12);
    b += `<rect x="${f(hx - w / 2)}" y="${f(base - h)}" width="${f(w)}" height="${f(h + 30)}" fill="${c}"/><rect x="${f(hx + w / 6)}" y="${f(base - h)}" width="${f(w / 3)}" height="${f(h + 30)}" fill="${dark(c, shade)}" opacity=".6"/>`
      + `<path d="M${f(hx - w / 2 - 5)} ${f(base - h)} L${f(hx)} ${f(base - h - 18)} L${f(hx + w / 2 + 5)} ${f(base - h)}Z" fill="${roof}"/>`;
    if (win) b += `<rect x="${f(hx - 6)}" y="${f(base - h + 14)}" width="10" height="14" rx="4" fill="${win}"/>`;
  }
  // basilica + campanile (left), Rocca (top)
  b += `<rect x="-420" y="-150" width="170" height="110" fill="${wall}"/><path d="M-430 -150 L-335 -205 L-240 -150Z" fill="${roof}"/><circle cx="-335" cy="-118" r="18" fill="${dark(wall, 0.3)}"/>`
    + `<rect x="-240" y="-250" width="44" height="200" fill="${light(wall, 0.1)}"/><path d="M-246 -250 L-218 -290 L-190 -250Z" fill="${roof}"/><rect x="-228" y="-236" width="20" height="26" rx="9" fill="${dark(wall, 0.4)}"/>`
    + `<rect x="10" y="-300" width="110" height="80" fill="${dark(wall, 0.1)}"/>` + [0, 1, 2, 3, 4].map((k) => `<rect x="${10 + k * 24}" y="-316" width="14" height="18" fill="${dark(wall, 0.1)}"/>`).join('')
    + `<rect x="120" y="-340" width="40" height="120" fill="${dark(wall, 0.15)}"/>`;
  if (win) b += `<circle cx="-335" cy="-118" r="12" fill="${win}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${b}</g>`;
}

export function tree(x, y, s = 1, base = '#4b9a50') {
  const blobs = [[0, -540, 190], [-110, -440, 140], [130, -450, 150], [10, -660, 130], [-60, -600, 110]];
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30 0 Q-20 -300 -10 -480 L22 -480 Q30 -300 34 0 Z" fill="#6b4a2a"/><path d="M10 0 Q14 -300 14 -470 L22 -480 Q30 -300 34 0Z" fill="#4e3420"/>`
    + `<path d="M0 -380 Q80 -420 150 -400" stroke="#6b4a2a" stroke-width="18" fill="none" stroke-linecap="round"/>`
    + `<g${M.sway(1.2, 5.5, 0, 0, -300)}>` + blobs.map(([bx, by, r], i) => { const c = i % 2 ? light(base, 0.08) : base; return `<circle cx="${bx}" cy="${by + 18}" r="${r}" fill="${dark(c, 0.25)}"/><circle cx="${bx - 8}" cy="${by}" r="${r * 0.94}" fill="${c}"/>`; }).join('')
    + `<circle cx="-40" cy="-640" r="60" fill="${light(base, 0.25)}" opacity=".55"/></g></g>`;
}
export const olive = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-8 0 Q-14 -60 -4 -110 L8 -110 Q4 -60 10 0Z" fill="#7a5a3a"/><g${M.sway(1.5, 5, 0, 0, -100)}>`
  + `<ellipse cx="-30" cy="-140" rx="60" ry="40" fill="#7f9a6a"/><ellipse cx="30" cy="-150" rx="58" ry="42" fill="#90aa78"/><ellipse cx="0" cy="-180" rx="50" ry="36" fill="#a2bb8a"/></g></g>`;

export function chapelRuin(x, y, s = 1) {
  const r = rng(5); let blocks = '';
  for (let row = 0; row < 7; row++) for (let c = 0; c < 8; c++) {
    if ((row > 4 && (c === 1 || c === 6)) || (row === 6 && c > 2 && c < 6) || (row > 3 && c === 7 && r() > 0.3)) continue;
    const bx = -200 + c * 50 + (row % 2) * 25, by = -40 - row * 44;
    if (bx > 170) continue;
    blocks += `<rect x="${bx}" y="${by}" width="48" height="42" rx="4" fill="${r() > 0.5 ? '#d8c6a4' : '#ccb994'}"/>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="-200" y="-330" width="380" height="330" fill="#6e5a46"/>${blocks}`
    + `<path d="M-60 0 V-170 A60 60 0 0 1 60 -170 V0Z" fill="#3a2a22"/>`
    + `<g transform="translate(0,-150)"><circle r="70" fill="url(#haloGlow)"${M.pulse(0.08, 2.4)}/><rect x="-6" y="-60" width="12" height="96" fill="${GOLD}"/><rect x="-34" y="-36" width="68" height="12" fill="${GOLD}"/><circle cx="0" cy="-30" r="7" fill="#fff4cc"/></g>`
    + `<path d="M-230 -330 L-10 -440 L40 -415 M-10 -440 L210 -330" stroke="#7a5536" stroke-width="16" stroke-linecap="round" fill="none"/>`
    + `<path d="M-230 -330 L-80 -405 L-60 -380 L-200 -312Z" fill="#a0583a"/>`
    + `<g transform="translate(150,-10)"><rect x="-30" y="-30" width="50" height="34" rx="5" fill="#c9b79a"/><rect x="-14" y="-60" width="48" height="32" rx="5" fill="#d8c6a4"/><rect x="18" y="-28" width="46" height="32" rx="5" fill="#bfae8e"/></g></g>`;
}

export function porziuncola(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-110" y="-200" width="220" height="200" fill="#4a3a4e"/><rect x="40" y="-200" width="70" height="200" fill="#3a2c40"/>`
    + `<path d="M-130 -200 L0 -300 L130 -200Z" fill="#5a3a3e"/><rect x="-14" y="-350" width="28" height="56" fill="#4a3a4e"/><path d="M-20 -350 L0 -372 L20 -350Z" fill="#5a3a3e"/>`
    + `<path d="M-40 0 V-90 A40 40 0 0 1 40 -90 V0Z" fill="#ffd98a" opacity=".85"/><circle cx="0" cy="-150" r="18" fill="#ffd98a" opacity=".85"/>`
    + `<ellipse cx="0" cy="-40" rx="120" ry="60" fill="#ffd98a" opacity=".18" filter="url(#blur14)"/></g>`;
}

export function clothStall(x, y, s = 1) {
  const rolls = ['#b8323e', '#2f4a8a', '#e2b448', '#6aa457', '#c97ab0', '#f6f0e2'];
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-260" width="10" height="260" fill="#6b4a2a"/><rect x="140" y="-260" width="10" height="260" fill="#6b4a2a"/>`
    + `<g${M.sway(1.2, 3, 0, 0, -270)}>` + [0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-160 + i * 53.3} -270 h53.3 v34 q-26.6 16 -53.3 0Z" fill="${i % 2 ? '#f6f0e2' : '#c0623e'}"/>`).join('') + '</g>'
    + `<rect x="-160" y="-110" width="320" height="110" fill="#8a6234"/><rect x="-160" y="-110" width="320" height="14" fill="#a8743f"/>`
    + rolls.map((c, i) => `<g transform="translate(${-128 + i * 50},-128)"><rect x="-22" y="-24" width="44" height="40" rx="18" fill="${c}"/><ellipse cx="-20" cy="-4" rx="6" ry="19" fill="${dark(c, 0.25)}"/></g>`).join('')
    + `<path d="M-120 -110 q20 60 0 100" stroke="#2f4a8a" stroke-width="22" fill="none"/></g>`;
}

export function bunting(y, { seed = 3 } = {}) {
  const cs = ['#c0623e', '#f2c46b', '#2f4a8a', '#6aa457', '#f6f0e2'];
  let s = `<path d="M-40 ${y} Q540 ${y + 90} 1120 ${y}" stroke="#6b4a2a" stroke-width="3" fill="none"/>`;
  for (let i = 0; i < 16; i++) {
    const t = i / 15, x = -40 + t * 1160, yy = y + 4 * 90 * t * (1 - t) * 0.5 * 2;
    s += `<g transform="translate(${f(x)},${f(yy)})"><g${M.sway(6, 1.8 + (i % 3) * 0.3, i * 0.2)}><path d="M-18 0 L18 0 L0 34Z" fill="${cs[i % cs.length]}"/></g></g>`;
  }
  return s;
}

export function wolf(x, y, s = 1) {
  const c = '#8a8a96', d = dark(c, 0.25), l = light(c, 0.45);
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="70" ry="12" fill="#1a0f1a" opacity=".2" filter="url(#soft)"/><g${M.bob(2, 2.6)}>`
    + `<g transform="translate(46,-20)"><g${M.sway(12, 1.4, 0, 0, 0)}><path d="M0 0 Q50 -10 60 -60 Q40 -30 0 -18Z" fill="${c}"/><path d="M48 -40 Q60 -55 60 -60 Q52 -48 44 -42Z" fill="${l}"/></g></g>`
    + `<ellipse cx="0" cy="-50" rx="52" ry="58" fill="${c}"/><ellipse cx="-8" cy="-40" rx="26" ry="40" fill="${l}"/><ellipse cx="-24" cy="-6" rx="16" ry="10" fill="${d}"/><ellipse cx="22" cy="-6" rx="16" ry="10" fill="${d}"/>`
    + `<g transform="translate(-6,-118)"><path d="M-38 -20 L-30 -66 L-8 -36Z" fill="${c}"/><path d="M38 -20 L30 -66 L8 -36Z" fill="${d}"/><path d="M-30 -26 L-28 -54 L-14 -34Z" fill="#e8a0a0"/>`
    + `<circle r="42" fill="${c}"/><ellipse cx="0" cy="16" rx="24" ry="18" fill="${l}"/><ellipse cx="0" cy="6" rx="8" ry="6" fill="#2b1d14"/>`
    + `<g data-blink="0.7 0 -10"><ellipse cx="-16" cy="-10" rx="5" ry="6.5" fill="#2b1d14"/><ellipse cx="16" cy="-10" rx="5" ry="6.5" fill="#2b1d14"/><circle cx="-17.5" cy="-12.5" r="1.8" fill="#fff"/><circle cx="14.5" cy="-12.5" r="1.8" fill="#fff"/></g>`
    + `<path d="M-8 20 Q0 27 8 20" stroke="#2b1d14" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></g></g>`;
}

export function rabbit(x, y, s = 1) {
  const c = '#e9dccb', d = dark(c, 0.2);
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="44" ry="9" fill="#1a0f1a" opacity=".2" filter="url(#soft)"/><g${M.bob(6, 1.1)}>`
    + `<ellipse cx="0" cy="-34" rx="38" ry="34" fill="${c}"/><circle cx="-34" cy="-30" r="10" fill="#fff"/><ellipse cx="20" cy="-6" rx="14" ry="8" fill="${d}"/>`
    + `<g transform="translate(18,-74)"><g${M.sway(6, 2.2, 0, 0, -20)}><ellipse cx="-12" cy="-44" rx="9" ry="30" fill="${c}"/><ellipse cx="-12" cy="-44" rx="4" ry="22" fill="#f0b0b0"/><ellipse cx="10" cy="-46" rx="9" ry="30" fill="${d}"/></g>`
    + `<circle r="26" fill="${c}"/><g data-blink="1.3 0 -4"><ellipse cx="-9" cy="-4" rx="4" ry="5" fill="#2b1d14"/><ellipse cx="9" cy="-4" rx="4" ry="5" fill="#2b1d14"/><circle cx="-10" cy="-6" r="1.4" fill="#fff"/><circle cx="8" cy="-6" r="1.4" fill="#fff"/></g>`
    + `<ellipse cx="0" cy="6" rx="4" ry="3" fill="#e08a8a"/></g></g></g>`;
}

export const francis = (x, y, s, o = {}) => person(x, y, s, { kind: 'friar', skin: SK, hair: '#5a3e2a', beard: '#5a3e2a', over: tonsure, ...o });

// ---------------------------------------------------------------- scenes
function scene0() {
  return sky(SKIES.dusk, { stars: 26, seed: 4 })
    + rays(540, 720, { op: 0.08 }) + glow(540, 1150, 520, 0.85)
    + clouds(560, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 7 })
    + assisi(540, 1210, 1.25, { wall: '#6a4a6a', roof: '#5a3a5a', hillC: '#4e3656', win: '#ffd98a', shade: 0.3 })
    + ground(1290, '#3e2a44', { rim: '#c07a7a' }) + tufts(1296, 10, '#2e1e34', { seed: 7 })
    + `<g${M.in('pop', 0, 1.0, 540, 1250)}>${francis(540, 1262, 2.5, { halo: 0.6, armL: [30, 2, 3], armR: [24, 2, 3.4], propL: `<g transform="translate(0,-28)">${perched(0, 0, '#9a7a56', 1.05)}</g>`, propR: smallCross })}</g>`
    + flyer(200, 760, '#b08a62', 1.2, { ph: 0.3 }) + flyer(860, 660, '#9a7a56', 1.0, { dx: 80, ph: 0.8 }) + flyer(900, 900, '#c49a6a', 0.8, { dx: 60, dy: -90, ph: 1.4 })
    + motes(16, { y0: 520, y1: 1240, seed: 3 })
    + foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 });
}

function scene1() {
  return sky(SKIES.day)
    + sun(860, 520, 56, 260) + clouds(440, { seed: 4 })
    + hill(1000, 40, '#a8c9d0', 3, { freq: 1.3 })
    + assisi(560, 1080, 1.0, {})
    + hill(1140, 36, '#7fb069', 4, { top: '#a8d48a' })
    + bunting(700)
    + ground(1290, '#d2bf98', { rim: '#ecdcb6' })
    + clothStall(250, 1300, 1.15)
    + person(680, 1325, 1.65, { kind: 'layman', top: '#b8323e', pants: '#3a3060', skin: SK, hair: '#5a3e2a', over: plumedCap, armR: [130, 18, 1.2], armL: 16 })
    + butterflies(2, { x0: 400, x1: 1000, y0: 900, y1: 1080 })
    + tufts(1300, 10, '#a99a5a', { seed: 2 }) + flowers(1320, 1400, 8, { seed: 6 })
    + foliage('r', 1640, { color: '#2f5a35', seed: 9 });
}

function scene2() {
  return sky([[0, '#6aa7cf'], [0.5, '#bfe0ec'], [0.62, '#f4d9a8'], [1, '#f4d9a8']])
    + sun(220, 600, 50, 280, 0.9) + clouds(460, { seed: 8, op: 0.8 })
    + hill(1040, 60, '#a9c48a', 5) + olive(860, 1080, 0.9) + olive(120, 1100, 0.8)
    + hill(1150, 30, '#8fae6a', 6)
    + `<g opacity=".9">${rays(430, 1060, { op: 0.07, n: 10, speed: 2.4 })}</g>`
    + chapelRuin(400, 1290, 1.15)
    + person(800, 1325, 1.65, { kind: 'layman', top: '#8a7a5a', pants: '#5a4a3a', skin: SK, hair: '#5a3e2a', armL: [78, 6, 2.2], armR: [26, 3, 2], propR: stone })
    + motes(10, { x0: 260, x1: 560, y0: 850, y1: 1150, seed: 8, rise: 50 })
    + ground(1295, '#b8a074', { rim: '#d9c49a' }) + tufts(1300, 12, '#8a8a4a', { seed: 4 })
    + foliage('l', 1640, { color: '#3a4a2a', seed: 3 });
}

function scene3() {
  const facades = [[-20, 200, '#e2cfa8'], [170, 170, '#d9b48a'], [330, 230, '#e8d8b8'], [540, 190, '#d4a87c'], [720, 220, '#e2cfa8'], [900, 180, '#cfb08a']]
    .map(([x, w, c], i) => { const h = 380 + (i % 3) * 60; return `<rect x="${x}" y="${1180 - h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x + w * 0.7}" y="${1180 - h}" width="${w * 0.3}" height="${h}" fill="${dark(c, 0.2)}" opacity=".5"/>`
      + `<path d="M${x - 8} ${1180 - h} h${w + 16} l-${w / 2 + 8} -40Z" fill="#c0623e"/>` + [0.25, 0.6].map((k) => `<rect x="${x + w * k - 16}" y="${1180 - h + 60}" width="32" height="48" rx="14" fill="#5a3a2a"/>`).join(''); }).join('');
  return sky([[0, '#7fbde0'], [0.6, '#d8eef4'], [1, '#d8eef4']])
    + clouds(470, { seed: 3, op: 0.8 })
    + facades
    + ground(1180, '#cdb894') + `<path d="M-40 1240 H1120 M-40 1300 H1120" stroke="#b8a37e" stroke-width="3"/>`
    + person(270, 1315, 1.8, { kind: 'priest', top: '#f2ead8', beard: '#cfc8bc', hair: '#cfc8bc', collar: false, under: cope, over: mitre + stole, armR: [62, 6, 2.2], armL: 14, propL: cross_staff(240) })
    + `<g transform="translate(540,1330)">${clothes}<g transform="translate(46,6)"><path d="M-14 0 Q-20 -30 0 -32 Q20 -30 14 0Z" fill="#8a6234"/><circle cx="0" cy="-30" r="5" fill="${GOLD}"/></g></g>`
    + person(560, 1320, 1.6, { kind: 'layman', top: CREAM, pants: '#8a7a6a', skin: SK, hair: '#5a3e2a', armL: [140, 10, 1.6], armR: 20 })
    + person(830, 1320, 1.75, { kind: 'layman', flip: true, robe: true, top: '#7a2e3a', skin: SK, hair: '#4a3424', beard: '#4a3424', armL: 20, armR: 14 })
    + `<g transform="translate(540,600)">${perched(0, 0, '#9a7a56', 0.9)}</g>`
    + foliage('r', 1650, { color: '#4a3a2a', seed: 6 });
}

function scene4() {
  const birdsOnTree = [[820, 860, '#9a7a56'], [930, 820, '#c49a6a', true], [1000, 900, '#8a6a4a'], [880, 960, '#b08a62', true]]
    .map(([x, y, c, fl], i) => perched(x, y, c, 0.9, fl, i * 0.3)).join('');
  const birdsGround = [[380, 1340, '#9a7a56', true], [450, 1360, '#c49a6a', true], [760, 1350, '#8a6a4a'], [520, 1385, '#b08a62', true]]
    .map(([x, y, c, fl], i) => perched(x, y, c, 1, fl, i * 0.4)).join('');
  return sky(SKIES.sunrise)
    + sun(260, 620, 54, 300) + clouds(470, { color: '#fff7e8', op: 0.75, seed: 11 })
    + hill(1020, 50, '#b9cfa0', 2)
    + assisi(220, 1060, 0.6, { hillC: '#a8c48a' })
    + hill(1120, 40, '#8fbf6e', 7, { top: '#b8e08e' })
    + tree(980, 1300, 0.95)
    + birdsOnTree
    + person(150, 1320, 1.4, { kind: 'friar', skin: SKIN.fair, hair: '#8a5a32', beard: '#8a5a32', armL: 10, armR: [26, 4, 2.6] })
    + person(300, 1335, 1.45, { kind: 'friar', skin: SK, hair: '#2a1e16', beard: false, armL: 22, armR: 10, propL: book(false) })
    + francis(620, 1320, 1.8, { talk: true, armR: [125, 14, 1.4], armL: 24 })
    + birdsGround
    + flyer(560, 780, '#b08a62', 0.9, { dx: 100, dy: -40, ph: 0.2 }) + flyer(400, 900, '#9a7a56', 0.8, { dx: 140, dy: -50, ph: 1.1 })
    + ground(1310, '#7fb069', { rim: '#a8d48a' }) + tufts(1312, 12, '#5f9a4a', { seed: 8 }) + flowers(1360, 1440, 12, { seed: 2 })
    + foliage('l', 1650, { color: '#2a4a2e', seed: 4 });
}

function scene5() {
  const larks = [[520, 1000, 0], [640, 920, 0.6], [580, 1080, 1.1], [700, 1040, 1.7], [470, 880, 2.2]]
    .map(([x, y, ph]) => flyer(x, y, '#f2e2c0', 0.75, { dx: (x - 590) * 0.6, dy: -420, ph })).join('');
  return sky(SKIES.deep, { stars: 36, seed: 9 })
    + glow(560, 1060, 420, 0.5)
    + hill(1080, 70, '#3a2848', 3) + hill(1150, 40, '#2e2038', 6)
    + porziuncola(250, 1290, 1.05)
    + `<g${M.tw([{ at: 2.5, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(470, 710, 300, 900, 1310, 0.6)}${motes(14, { x0: 380, x1: 820, y0: 600, y1: 1250, color: '#fff2c4', seed: 4, rise: 140 })}</g>`
    + `<g${M.tw([{ at: 3, dur: 1, from: { opacity: 0 }, to: { opacity: 1 } }])}>${larks}</g>`
    + francis(650, 1305, 1.85, { armL: [38, 3, 3], armR: [38, 3, 3.3], halo: 3.2 })
    + ground(1295, '#2a1f30') + tufts(1300, 10, '#1e1626', { seed: 5 })
    + foliage('r', 1650, { color: '#1e1626', seed: 2 });
}

function scene6() {
  const banner = `<g transform="translate(540,560)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/><rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + `<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>`
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${francis(0, 400, 0.88, { halo: true, armL: [30, 2, 3], armR: [24, 2, 3.4], propL: `<g transform="translate(0,-28)">${bird('#9a7a56', 1)}</g>`, propR: smallCross })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return sky(SKIES.gold)
    + rays(540, 520, { op: 0.13 }) + glow(540, 520, 440, 0.7)
    + clouds(860, { color: '#ffe2b8', op: 0.5, seed: 13, drift: 30 })
    + assisi(540, 1200, 1.3, { wall: '#4a3446', roof: '#3a2a3c', hillC: '#3a2a40', win: '#ffd98a', shade: 0.3 })
    + banner
    + ground(1190, '#3a2a40')
    + crowd(1420, 12, { flags: [['#f2c46b', '#7a5536', '#f6f2e8']] })
    + petals(26, { seed: 5 });
}

function scene7() {
  return sky([[0, '#4a78b8'], [0.42, '#9fd0d8'], [0.66, '#f8d9a0'], [1, '#f8d9a0']])
    + rays(540, 640, { op: 0.1 }) + glow(540, 1120, 520, 0.8)
    + hill(1080, 60, '#a9cf8a', 4) + olive(130, 1150, 0.9) + olive(960, 1140, 0.85)
    + hill(1180, 34, '#86bb68', 9, { top: '#b0dc8a' })
    + francis(540, 1262, 2.2, { halo: true, armL: [52, 4, 2.6], armR: [52, 4, 2.9],
      propL: `<g transform="translate(-6,-26)">${perched(0, 0, '#9a7a56', 1)}</g>`, propR: `<g transform="translate(6,-26)">${perched(0, 0, '#c49a6a', 1, true, 0.5)}</g>` })
    + wolf(230, 1330, 1.05) + rabbit(840, 1335, 1.1)
    + flyer(250, 760, '#b08a62', 1, { ph: 0.4 }) + flyer(860, 820, '#9a7a56', 0.9, { dx: 90, ph: 1.2 })
    + butterflies(3, { x0: 200, x1: 900, y0: 900, y1: 1100, seed: 5 })
    + ground(1320, '#6aa457', { rim: '#9ad07a' }) + flowers(1330, 1440, 18, { seed: 3 }) + tufts(1322, 12, '#4f8a3c', { seed: 6 })
    + foliage('l', 1650, { color: '#24452c', seed: 7 }) + foliage('r', 1660, { color: '#24452c', seed: 8 });
}

export const STORY = {
  slug: 'st_francis_of_assisi', name: 'St_Francis_of_Assisi',
  voice: 'am_michael', speed: 0.95,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  thumb_hook: 'He gave away everything', thumb_shift: 0,
  fix: {
    'wˈʌn θˈaʊzənd tˈuːhˈʌndɹɪd nˈaɪn': 'twˈɛlv ˈoʊ nˈaɪn',  // 1209 -> twelve oh nine
    'wˈʌn θˈaʊzənd tˈuːhˈʌndɹɪd': 'twˈɛlv',                  // 1226, 1228 -> twelve twenty-…
    'wˈʌn θˈaʊzənd wˈʌnhˈʌndɹɪd': 'ˈɪlɛvən',                 // 1182 -> eleven eighty-two
    'ɐsˈɪsi': 'ɐsˈiːsi',                                      // Assisi -> ah-SEE-see
    'dˌeɪmiˈɑːnoʊ': 'dɑːmjˈɑːnoʊ',                            // Damiano
    'pˌɔːɹzɪəŋkˈoʊlə': 'pɔːɹtsjˈuːŋkoʊlɑː',                   // Porziuncola -> port-SYOON-ko-la
  },
  scenes: [
    { kicker: 'THE POOR MAN OF ASSISI', title: 'St. Francis of Assisi', art: scene0, cam: [540, 760, 0.06],
      say: ['What would make a rich young man give away everything, even the clothes he was wearing?', 'This is Saint Francis of Assisi.'] },
    { kicker: 'c. 1182 · ASSISI, ITALY', title: "A Merchant's Son", art: scene1,
      say: ['Francis was born around 1182 in Assisi, Italy, the son of a wealthy cloth merchant.', 'He loved fine clothes and dreamed of glory, until war and a year as a prisoner changed him.'] },
    { kicker: 'SAN DAMIANO · ASSISI', title: 'Repair My Church', art: scene2,
      say: ['Praying in the ruined chapel of San Damiano, he heard a voice: Francis, go repair my church.', 'So he began rebuilding it, stone by stone.'] },
    { kicker: 'BEFORE THE BISHOP', title: 'God, My Father', art: scene3,
      say: ['When his angry father demanded his money back, Francis returned everything, even his clothes,', 'and said that from now on, God alone was his Father.'] },
    { kicker: '1209 · ROME', title: 'The Little Brothers', art: scene4,
      say: ['Friends joined him to live in poverty and preach the Gospel.', 'In 1209, Pope Innocent the Third approved their way of life.', 'Francis loved all creatures, and even preached to the birds.'] },
    { kicker: 'OCTOBER 3, 1226 · ASSISI', title: 'Sister Death', art: scene5, cam: [600, 1000, 0.06],
      say: ['Worn out by illness, Francis died on October 3, 1226, at the little chapel of the Porziuncola.', 'He was about forty-four.'] },
    { kicker: 'JULY 16, 1228 · ASSISI', title: 'Canonized', art: scene6, cam: [540, 800, 0.05],
      say: ['Less than two years later, in 1228, Pope Gregory the Ninth declared him a saint.', 'His tomb in Assisi still draws pilgrims from around the world.'] },
    { kicker: 'FEAST DAY · OCTOBER 4', title: 'Patron of Ecology', art: scene7, cam: [540, 900, 0.05],
      say: ['His feast day is October 4. He is a patron of Italy, of animals, and of ecology.', 'Saint Francis of Assisi, pray for us.'] },
  ],
};
