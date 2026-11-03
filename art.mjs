// SaintStories art library (HyperFrames edition).
// Every helper returns an SVG string. Motion is declared with data-* attributes (see M below);
// reel.js turns them into seekable GSAP tweens, so story files never write timeline code.
export const W = 1080, H = 1920;
export const GOLD = '#f2c46b', INK = '#2b1d14', CREAM = '#f6f0e2';
export const SKIN = { pedro: '#a86d45', priest: '#e2b48f', s0: '#9a6340', s1: '#b97c52', s2: '#8a5534', s3: '#c48a5f', fair: '#f0c9a8' };
export const SKINS = [SKIN.s0, SKIN.s1, SKIN.s2, SKIN.s3];
export const SKIES = {
  day:     [[0, '#4f9fd3'], [0.5, '#a9d8ec'], [0.62, '#f6e3b8'], [1, '#f6e3b8']],
  sunrise: [[0, '#f09a62'], [0.35, '#f8d39a'], [0.55, '#bfe0ec'], [1, '#bfe0ec']],
  dusk:    [[0, '#221f4e'], [0.42, '#7d4876'], [0.66, '#e98a62'], [1, '#f8c07a']],
  deep:    [[0, '#181230'], [0.42, '#552c5a'], [0.66, '#b0545a'], [1, '#e88a5a']],
  gold:    [[0, '#f8d894'], [0.5, '#f2a970'], [1, '#e07e60']],
  night:   [[0, '#0e1430'], [0.6, '#2a3566'], [1, '#4a4f7e']],
};

// ------------------------------------------------------------- utilities
let U = 0;
export const uid = (n = 'u') => `${n}${++U}`;
export const f = (n) => +(+n).toFixed(1);
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const hx = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
export function mix(a, b, t) { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); }
export const dark = (c, t = 0.25) => mix(c, '#2a1c2a', t);
export const light = (c, t = 0.25) => mix(c, '#fff6e0', t);

// ------------------------------------------------------------- motion attributes
// All times are seconds relative to the scene start. Origins (ox oy) are in the element's local units.
export const M = {
  bob:   (a = 2, p = 2.6, ph = 0) => ` data-bob="${a} ${p} ${ph}"`,                       // up/down loop
  sway:  (d, p = 3, ph = 0, ox = 0, oy = 0) => ` data-sway="${d} ${p} ${ph} ${ox} ${oy}"`, // rotate -d..+d loop
  spin:  (degPerSec, ox = 0, oy = 0) => ` data-spin="${degPerSec} ${ox} ${oy}"`,
  pulse: (a, p = 2, ph = 0, ox = 0, oy = 0) => ` data-pulse="${a} ${p} ${ph} ${ox} ${oy}"`, // scale 1..1+a loop
  flick: (p = 1.6, ph = 0, lo = 0.2) => ` data-flick="${p} ${ph} ${lo}"`,                 // opacity twinkle
  flap:  (p = 0.5, ph = 0) => ` data-flap="${p} ${ph}"`,                                   // scaleY wing flap
  drift: (dx, dy = 0) => ` data-drift="${dx} ${dy}"`,                                      // linear over the scene
  scroll:(tile, p) => ` data-scroll="${tile} ${p}"`,                                       // seamless x loop
  in:    (type = 'fade', delay = 0, dur = 0.8, ox = 0, oy = 0) => ` data-in="${type} ${delay} ${dur} ${ox} ${oy}"`, // fade|rise|pop|grow|drop
  tw:    (list) => ` data-tw='${JSON.stringify(list)}'`,  // [{at, dur, from:{}, to:{}, ease, origin:"x y"}]
};

// ------------------------------------------------------------- parallax depth layers
// Wrap parts of a scene so camera moves (scene.cam = 'push'|'pull'|'pan-l'|'pan-r'|'tilt-up'|'tilt-down'|'drift-l'|'drift-r'
// or {move, amt, ox, oy}) shift them by different amounts. Depth 1 = character plane (moves with the camera);
// <1 = farther (sky 0, distant hills 0.3–0.5, set 0.7–0.85); >1 = nearer (foreground foliage 1.3–1.5).
// Keep layers on their own <g> (no other motion on the same element).
export const layer = (depth, svg) => `<g data-depth="${depth}">${svg}</g>`;
export const FAR = (svg) => layer(0.15, svg), BACK = (svg) => layer(0.45, svg), MID = (svg) => layer(0.75, svg), NEAR = (svg) => layer(1.4, svg);

// ------------------------------------------------------------- sky, light, atmosphere
export function sky(stops, { stars = 0, seed = 1 } = {}) {
  const id = uid('sky');
  let s = `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">`
    + stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')
    + `</linearGradient></defs><rect x="-200" y="-400" width="${W + 400}" height="${H + 800}" fill="url(#${id})"/>`;
  if (stars) {
    const r = rng(seed);
    for (let i = 0; i < stars; i++) {
      const x = r() * W, y = -80 + r() * 720, rr = 1.2 + r() * 2.4;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#fff8e0"${M.flick(1.4 + r() * 2.2, r() * 2, 0.25)}/>`;
    }
  }
  return s;
}

export const sun = (x, y, r = 60, glow = 340, op = 1) =>
  `<circle cx="${x}" cy="${y}" r="${glow}" fill="url(#sunGlow)" opacity="${op}"/>`
  + `<g transform="translate(${x},${y})"><circle r="${f(r * 1.35)}" fill="#fff3c8" opacity=".35"${M.pulse(0.06, 3.2)}/><circle r="${r}" fill="#fff7dc"/></g>`;

export function rays(cx, cy, { n = 12, op = 0.09, color = '#fff3d0', speed = 1.6, len = 1900 } = {}) {
  let s = `<g opacity="${op}" filter="url(#blur6)"><g transform="translate(${cx},${cy})"><g${M.spin(speed)}>`;
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n, w = 0.06 + 0.03 * (i % 3);
    s += `<path d="M0,0 L${f(len * Math.cos(a - w))},${f(len * Math.sin(a - w))} L${f(len * Math.cos(a + w))},${f(len * Math.sin(a + w))} Z" fill="${color}"/>`;
  }
  return s + '</g></g></g>';
}

// Light beam from above (use M.in or M.tw on a wrapper to fade it in)
export const beam = (x0, x1, xb0, xb1, y1, op = 0.6) =>
  `<path d="M${x0} -300 L${x1} -300 L${xb1} ${y1} L${xb0} ${y1} Z" fill="url(#beam)" opacity="${op}" filter="url(#blur6)"/>`;

export function clouds(y0 = 300, { color = '#ffffff', shade = null, op = 0.9, drift = 70, seed = 3, n = 3, scale = 1 } = {}) {
  const r = rng(seed), sh = shade || dark(color, 0.14);
  const puffs = [[0, 0, 92, 36], [-58, 10, 62, 27], [60, 8, 72, 30], [8, -26, 54, 34], [-22, -14, 42, 28], [34, -16, 40, 26]];
  let out = '';
  for (let i = 0; i < n; i++) {
    const cx = 60 + (i + r() * 0.7) * (W / n), cy = y0 + (r() - 0.5) * 240, s = (0.6 + r() * 0.6) * scale;
    out += `<g opacity="${op}"${M.drift(f(drift * (0.6 + r() * 0.8)))}><g transform="translate(${f(cx)},${f(cy)}) scale(${f(s)})">`
      + puffs.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y + 8}" rx="${rx}" ry="${ry}" fill="${sh}"/>`).join('')
      + puffs.map(([x, y, rx, ry]) => `<ellipse cx="${x - 3}" cy="${y - 2}" rx="${f(rx * 0.92)}" ry="${f(ry * 0.84)}" fill="${color}"/>`).join('')
      + `<ellipse cx="-10" cy="-30" rx="30" ry="12" fill="#fff" opacity=".45"/></g></g>`;
  }
  return out;
}

export function hill(base, amp, color, seed = 1, { freq = 1, top = null } = {}) {
  const r = rng(seed), p1 = r() * 6, p2 = r() * 6, pts = [];
  for (let x = -60; x <= W + 60; x += 20) {
    const y = base - amp * (0.62 * Math.sin((x / W) * Math.PI * 1.3 * freq + p1) + 0.38 * Math.sin((x / W) * Math.PI * 3.3 * freq + p2));
    pts.push(`${x},${f(y)}`);
  }
  const rim = top ? `<path d="M${pts.join(' L')}" stroke="${top}" stroke-width="5" fill="none" opacity=".55"/>` : '';
  return `<path d="M-60,${H + 300} L${pts.join(' L')} L${W + 60},${H + 300} Z" fill="${color}"/>${rim}`;
}

// Seamlessly scrolling wave band (period = seconds per wavelength)
export function waves(base, amp, L, period, fill, { phase = 0, op = 1, foam = null } = {}) {
  const pts = [];
  for (let x = -40; x <= W + L + 40; x += 16) pts.push(`${x},${f(base + amp * Math.sin((x / L) * 2 * Math.PI + phase))}`);
  const fm = foam ? `<path d="M${pts.join(' L')}" stroke="${foam}" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>` : '';
  return `<g${M.scroll(L, period)}><path d="M-40,${H + 300} L${pts.join(' L')} L${W + L + 40},${H + 300} Z" fill="${fill}" opacity="${op}"/>${fm}</g>`;
}

export function sparkles(n, x0, x1, y0, y1, { seed = 5, color = '#fff6d8', size = 1 } = {}) {
  const r = rng(seed); let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), k = (0.5 + r() * 0.8) * size;
    s += `<g transform="translate(${f(x)},${f(y)}) scale(${f(k)})"><path d="M0 -8 L1.8 -1.8 L8 0 L1.8 1.8 L0 8 L-1.8 1.8 L-8 0 L-1.8 -1.8Z" fill="${color}"${M.flick(0.9 + r() * 1.4, r() * 2, 0)}/></g>`;
  }
  return s;
}

// Floating light motes / dust in the air
export function motes(n, { x0 = 0, x1 = W, y0 = 420, y1 = 1300, color = '#ffe7a8', seed = 7, size = [2, 7], rise = 70 } = {}) {
  const r = rng(seed); let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), rr = size[0] + r() * (size[1] - size[0]);
    s += `<g${M.drift(f((r() - 0.5) * 40), f(-rise * (0.5 + r())))}><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="${color}" filter="url(#soft)"${M.flick(1.6 + r() * 2.4, r() * 3, 0.15)}/></g>`;
  }
  return s;
}

// Soft out-of-focus leaves framing a bottom corner (foreground depth)
export function foliage(side = 'l', y = 1560, { color = '#1c3526', s = 1, seed = 11 } = {}) {
  const r = rng(seed), x = side === 'l' ? -30 : W + 30, dir = side === 'l' ? 1 : -1;
  let leaves = '';
  for (let i = 0; i < 7; i++) {
    const a = dir * (-70 + i * 22 + r() * 10), len = 150 + r() * 90, c = i % 2 ? color : light(color, 0.08);
    leaves += `<path transform="rotate(${f(a)}) scale(${f(len / 130)})" d="M0 0 Q34 -62 0 -130 Q-34 -62 0 0Z" fill="${c}"/>`;
  }
  return `<g filter="url(#blur6)" opacity=".92"><g transform="translate(${x},${y}) scale(${s})"><g${M.sway(2.5, 4.2, r() * 2)}>${leaves}</g></g></g>`;
}

export function tufts(y, n, color, { seed = 9, x0 = 0, x1 = W, s = 1 } = {}) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), k = (0.6 + r() * 0.7) * s, yy = y + r() * 60;
    out += `<g transform="translate(${f(x)},${f(yy)}) scale(${f(k)})"><g${M.sway(4, 2.6 + r() * 1.5, r() * 2)}><path d="M-10 0 Q-14 -24 -20 -34 Q-6 -20 -2 0 Z M-2 0 Q0 -34 4 -46 Q8 -28 6 0 Z M6 0 Q14 -22 24 -30 Q14 -12 14 0Z" fill="${color}"/></g></g>`;
  }
  return out;
}

export function flowers(y0, y1, n, { seed = 4, colors = ['#f6d36b', '#f28fa6', '#ffffff', '#c99ef0'], x0 = 0, x1 = W } = {}) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), c = colors[i % colors.length], k = 0.7 + r() * 0.6;
    out += `<g transform="translate(${f(x)},${f(y)}) scale(${f(k)})"><g${M.sway(6, 2.8 + r(), r() * 2, 0, 14)}><path d="M0 14 V2" stroke="#4f8a3c" stroke-width="3"/>`
      + [0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-6" rx="4.5" ry="7" fill="${c}" transform="rotate(${a})"/>`).join('')
      + `<circle r="3.6" fill="#e2a33a"/></g></g>`;
  }
  return out;
}

export function gulls(n = 3, { y = 430, seed = 2, color = '#2a2a3a', drift = 220 } = {}) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = 120 + i * 300 + r() * 80, yy = y + i * 60 + r() * 40, k = 0.8 + r() * 0.5;
    out += `<g${M.drift(f(drift * (0.7 + r() * 0.6)), -20)}><g transform="translate(${f(x)},${f(yy)}) scale(${f(k)})"><g${M.bob(10, 3 + r(), r())}><g${M.flap(0.55 + r() * 0.2, r())}>`
      + `<path d="M-26 4 Q-13 -14 0 0 Q13 -14 26 4" stroke="${color}" stroke-width="5.5" fill="none" stroke-linecap="round"/></g></g></g></g>`;
  }
  return out;
}

export function butterflies(n = 2, { x0 = 100, x1 = 980, y0 = 900, y1 = 1150, seed = 8, colors = ['#f6b24a', '#8ec5f0'] } = {}) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), c = colors[i % colors.length];
    out += `<g${M.drift(f((r() - 0.5) * 260), f(-40 - r() * 40))}><g transform="translate(${f(x)},${f(y)})"><g${M.bob(18, 2.2 + r(), r())}><g${M.flap(0.28, r())}>`
      + `<ellipse cx="-9" cy="-4" rx="10" ry="8" fill="${c}"/><ellipse cx="9" cy="-4" rx="10" ry="8" fill="${c}"/><ellipse cx="-7" cy="7" rx="7" ry="5.5" fill="${dark(c, 0.15)}"/><ellipse cx="7" cy="7" rx="7" ry="5.5" fill="${dark(c, 0.15)}"/></g><rect x="-1.6" y="-9" width="3.2" height="20" rx="1.6" fill="#3a2a20"/></g></g></g>`;
  }
  return out;
}

// Falling petals / confetti (dy over the scene)
export function petals(n, { seed = 12, colors = ['#f6d36b', '#ffffff', '#f2a0b0'], y0 = -200, y1 = 600, fall = 700 } = {}) {
  const r = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = r() * W, y = y0 + r() * (y1 - y0), c = colors[i % colors.length];
    out += `<g${M.drift(f((r() - 0.5) * 160), f(fall * (0.6 + r() * 0.6)))}><g transform="translate(${f(x)},${f(y)})"><g${M.sway(60, 1.6 + r() * 1.4, r())}><ellipse rx="7" ry="4" fill="${c}"/></g></g></g>`;
  }
  return out;
}

// ------------------------------------------------------------- props (drawn at the hand)
export function book(open = true) {
  if (open) return '<g transform="translate(0,6)">'
    + '<path d="M0 0 L-36 -9 L-36 21 L0 30 Z" fill="#6e2828"/><path d="M0 0 L36 -9 L36 21 L0 30 Z" fill="#7a2e2e"/>'
    + '<path d="M0 2 L-31 -6 L-31 19 L0 27 Z" fill="#fbf3e0"/><path d="M0 2 L31 -6 L31 19 L0 27 Z" fill="#efe3c6"/>'
    + '<path d="M-25 2 L-6 6 M-25 8 L-6 12 M-25 14 L-6 18 M6 6 L25 2 M6 12 L25 8 M6 18 L25 14" stroke="#c2b08a" stroke-width="2"/>'
    + `<path d="M0 2 V27" stroke="${GOLD}" stroke-width="1.5" opacity=".6"/></g>`;
  return '<g><rect x="-19" y="-4" width="38" height="48" rx="3" fill="#6e2828"/><rect x="-15" y="0" width="30" height="40" rx="2" fill="#8e3a3a"/>'
    + `<rect x="11" y="0" width="4" height="40" fill="#5e2020" opacity=".6"/><path d="M0 8 V32 M-8 15 H8" stroke="${GOLD}" stroke-width="3.2" stroke-linecap="round"/></g>`;
}

export function palm_frond(scale = 1, rot = 0, sway = 3) {
  let leaves = '';
  for (let i = 1; i <= 11; i++) {
    const y = -i * 12.5, L = 32 * (1 - i / 13.5) + 8;
    leaves += `<path d="M0 ${y} q${f(-L * 0.6)} ${f(-L * 0.18)} ${f(-L)} ${f(L * 0.38)}" stroke="#6aa954" stroke-width="5.5" fill="none" stroke-linecap="round"/>`
      + `<path d="M0 ${y} q${f(L * 0.6)} ${f(-L * 0.18)} ${f(L)} ${f(L * 0.38)}" stroke="#4f8a3c" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
  }
  return `<g transform="rotate(${rot}) scale(${scale})"><g${M.sway(sway, 3.4, 0, 0, 20)}><path d="M0 22 Q5 -60 0 -150" stroke="#46742f" stroke-width="6.5" fill="none" stroke-linecap="round"/>${leaves}<path d="M-1 10 Q3 -60 -1 -140" stroke="#bfe39a" stroke-width="1.6" fill="none" opacity=".6"/></g></g>`;
}

export const cross_staff = (h = 230) =>
  `<g><rect x="-5" y="${-h + 40}" width="10" height="${h}" rx="4" fill="#7a5536"/><rect x="1" y="${-h + 40}" width="4" height="${h}" rx="2" fill="#5a3d22" opacity=".6"/><rect x="-32" y="${-h + 72}" width="64" height="10" rx="4" fill="#7a5536"/></g>`;

export function lily(scale = 1) {
  return `<g transform="scale(${scale})"><path d="M0 20 Q3 -60 0 -130" stroke="#5f9a4a" stroke-width="5" fill="none"/>`
    + [0, 1, 2].map((i) => `<g transform="translate(0,${-130 + i * 30}) rotate(${(-1) ** i * 30})"><ellipse cx="0" cy="-10" rx="9" ry="16" fill="#fffaf0"/><ellipse cx="-8" cy="-6" rx="7" ry="13" fill="#f2eadb" transform="rotate(-35)"/><ellipse cx="8" cy="-6" rx="7" ry="13" fill="#f2eadb" transform="rotate(35)"/><circle cy="-4" r="2.5" fill="#e2a33a"/></g>`).join('')
    + '</g>';
}

export const roses = (scale = 1) => `<g transform="scale(${scale})">`
  + [[-14, -6, '#d8404e'], [10, -12, '#e2566a'], [0, 8, '#c83242'], [16, 8, '#e2566a']]
    .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/><path d="M${x - 5} ${y} q5 -6 10 0 q-5 5 -10 0" fill="#8a1f2a"/>`).join('') + '</g>';

export function rosary() {
  let b = '';
  for (let i = 0; i < 10; i++) b += `<circle cx="${f(8 * Math.sin(i / 3))}" cy="${i * 7}" r="3.6" fill="#6b4a2a"/>`;
  return `<g>${b}<path d="M0 72 v22 M-8 80 h16" stroke="#c9a24a" stroke-width="4"/></g>`;
}

export const bread_basket = () => '<g><path d="M-36 -6 Q0 30 36 -6 Z" fill="#b07a3a"/><path d="M-30 2 Q0 22 30 2" stroke="#8a5a2a" stroke-width="3" fill="none"/><ellipse cx="-12" cy="-10" rx="14" ry="9" fill="#e2b061"/><ellipse cx="12" cy="-12" rx="14" ry="9" fill="#d9a04f"/></g>';

// ------------------------------------------------------------- character rig
const KIND = {
  layman: { top: CREAM, pants: '#4a3a2e', skin: SKIN.pedro, hair: '#1a130e' },
  pedro:  { top: CREAM, pants: '#4a3a2e', skin: SKIN.pedro, hair: '#1a130e' },
  kid:    { top: '#4b8bc4', pants: '#5a4a3a', skin: SKIN.s1, hair: '#1a120c' },
  priest: { top: '#26222c', skin: SKIN.priest, hair: '#5a3e2a', beard: '#5a3e2a', robe: true, collar: true },
  friar:  { top: '#6b4a2e', skin: SKIN.priest, hair: '#4a3424', beard: '#4a3424', robe: true, cord: true },
  nun:    { top: '#26222c', skin: SKIN.priest, robe: true, veil: '#26222c', girl: true },
  royal:  { top: '#7a2e5a', skin: SKIN.priest, hair: '#6b4a2a', robe: true, crown: true },
  elder:  { top: '#7a6a52', skin: SKIN.priest, hair: '#d9d4cc', beard: '#d9d4cc', robe: true },
};
let PIDX = 0;

/** person(x, y, s, opts) - feet at (x, y), s = 1 is ~300px tall.
 * opts: kind, flip, sitting, talk (true | [from, to]), halo (true | fade-in time),
 *       armL / armR: angle or [angle, swayDeg, period], propL / propR: SVG at the hand,
 *       top, pants, skin, hair, beard, robe, veil, crown, girl, collar, cord,
 *       under / over: extra SVG in body space (capes behind, mitres/stoles in front). */
export function person(x, y, s, o = {}) {
  const k = { ...KIND[o.kind || 'layman'] };
  for (const [a, b] of Object.entries(o)) if (b !== undefined) k[a] = b;
  const n = ++PIDX, ph = ((n * 0.618) % 1);
  const top = k.top, skin = k.skin || SKIN.pedro, hair = k.hair || '#1a130e', pants = k.pants || '#4a3a2e';
  const sh = dark(top, 0.28), skSh = dark(skin, 0.26), skHi = light(skin, 0.35);
  const veil = k.veil, beard = k.beard, robe = k.robe, girl = k.girl;
  const g = [];
  g.push(`<g transform="translate(${f(x)},${f(y)}) scale(${f(k.flip ? -s : s)},${f(s)})">`);
  g.push(`<ellipse cx="0" cy="2" rx="60" ry="12" fill="#1a0f1a" opacity=".25" filter="url(#soft)"/>`);
  g.push(`<g${M.bob(1.8, 2.3 + ph, ph)}><g transform="translate(0,${k.sitting ? 75 : 0})">`);
  if (k.halo !== undefined && k.halo !== false && k.halo !== null) {
    const fade = typeof k.halo === 'number' ? M.in('fade', k.halo, 1.2) : '';
    g.push(`<g transform="translate(0,-256)"${fade}><g${M.pulse(0.045, 2.6)}><circle r="135" fill="url(#haloGlow)"/>`
      + `<circle r="66" fill="none" stroke="${GOLD}" stroke-width="7"/><circle r="66" fill="none" stroke="#fff4cc" stroke-width="2.2" opacity=".85"/></g></g>`);
  }
  if (k.under) g.push(k.under);
  if (veil) g.push(`<path d="M-50 -266 Q-66 -150 -56 -116 L56 -116 Q66 -150 50 -266 Z" fill="${veil}"/><path d="M20 -266 Q60 -200 56 -116 L34 -116 Q40 -200 20 -266Z" fill="${dark(veil, 0.3)}" opacity=".6"/>`);
  // legs / robe
  if (k.sitting) {
    g.push(`<rect x="-48" y="-120" width="96" height="32" rx="16" fill="${robe ? top : pants}"/><ellipse cx="-50" cy="-104" rx="14" ry="9" fill="#3a2a20"/><ellipse cx="50" cy="-104" rx="14" ry="9" fill="#3a2a20"/>`);
  } else if (robe) {
    g.push('<ellipse cx="-15" cy="-4" rx="15" ry="7.5" fill="#1a1414"/><ellipse cx="15" cy="-4" rx="15" ry="7.5" fill="#1a1414"/>');
  } else {
    g.push(`<rect x="-27" y="-114" width="23" height="108" rx="10" fill="${pants}"/><rect x="4" y="-114" width="23" height="108" rx="10" fill="${pants}"/>`
      + `<rect x="17" y="-114" width="10" height="108" rx="5" fill="${dark(pants, 0.3)}" opacity=".7"/>`
      + '<ellipse cx="-17" cy="-5" rx="15" ry="7.5" fill="#3a2a20"/><ellipse cx="17" cy="-5" rx="15" ry="7.5" fill="#3a2a20"/>');
  }
  // torso
  if (robe && !k.sitting) {
    g.push(`<path d="M-37 -207 Q0 -218 37 -207 L56 -6 Q0 3 -56 -6 Z" fill="${top}"/>`
      + `<path d="M12 -212 Q30 -211 37 -207 L56 -6 Q38 -1 24 -2 Z" fill="${sh}" opacity=".55"/>`
      + `<path d="M-30 -200 Q-34 -110 -46 -10" stroke="${light(top, 0.25)}" stroke-width="3" fill="none" opacity=".45"/>`
      + `<path d="M-18 -120 Q-22 -60 -30 -8 M16 -110 Q20 -60 26 -6" stroke="${sh}" stroke-width="3" fill="none" opacity=".5"/>`);
    if (k.collar) g.push(`<g fill="${dark(top, 0.5)}">${[-180, -158, -136, -114, -92, -70].map((yy) => `<circle cx="0" cy="${yy}" r="2.6"/>`).join('')}</g>`);
    if (k.cord) g.push('<path d="M-42 -120 Q0 -108 42 -120 M12 -115 v74" stroke="#efe3c6" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="12" cy="-80" r="4" fill="#efe3c6"/><circle cx="12" cy="-56" r="4" fill="#efe3c6"/>');
  } else {
    g.push(`<path d="M-37 -207 Q0 -218 37 -207 L43 -101 Q0 -92 -43 -101 Z" fill="${top}"/>`
      + `<path d="M13 -212 Q31 -210 37 -207 L43 -101 Q31 -96 19 -95 Z" fill="${sh}" opacity=".5"/>`);
    if (top === CREAM) g.push('<path d="M-13 -208 L0 -188 L13 -208" stroke="#d6cab0" stroke-width="3" fill="none"/><path d="M0 -188 V-104" stroke="#d8cdb5" stroke-width="2.5"/>'
      + '<circle cx="0" cy="-170" r="2.6" fill="#c2b598"/><circle cx="0" cy="-148" r="2.6" fill="#c2b598"/><circle cx="0" cy="-126" r="2.6" fill="#c2b598"/>'
      + '<path d="M-28 -180 q6 8 0 16 M28 -180 q-6 8 0 16" stroke="#e2d8c2" stroke-width="2" fill="none"/>');
    if (girl) g.push(`<path d="M-41 -132 L-54 -94 Q0 -83 54 -94 L41 -132 Z" fill="${top}"/><path d="M18 -132 L41 -132 L54 -94 Q40 -90 26 -89 Z" fill="${sh}" opacity=".5"/>`);
  }
  const arm = (side, spec, prop) => {
    const [ang, amp = 0, per = 2.4] = Array.isArray(spec) ? spec : [spec];
    const px = side < 0 ? -33 : 33, rot = side < 0 ? ang : -ang;
    return `<g transform="translate(${px},-198) rotate(${f(rot)})"><g${amp ? M.sway(amp, per, ph * per) : ''}>`
      + `<rect x="-10.5" y="-6" width="21" height="98" rx="10.5" fill="${top}"/><rect x="2" y="-6" width="8.5" height="98" rx="4" fill="${sh}" opacity=".5"/>`
      + `<g transform="translate(0,94) rotate(${f(-rot)})"><circle r="11.5" fill="${skin}"/><ellipse cx="-8" cy="-4" rx="4.5" ry="6.5" fill="${skin}" transform="rotate(-28 -8 -4)"/><path d="M4 -9 A11.5 11.5 0 0 1 5 10" stroke="${skSh}" stroke-width="3" fill="none" opacity=".45"/>${prop || ''}</g></g></g>`;
  };
  g.push(arm(-1, k.armL ?? 8, k.propL));
  // neck + head
  g.push(`<rect x="-9.5" y="-228" width="19" height="26" fill="${skSh}"/>`);
  if (k.collar) g.push('<path d="M-15 -211 h30 v7 h-30 Z" fill="#fff"/>');
  if (!veil) g.push(`<circle cx="-39" cy="-250" r="8.5" fill="${skin}"/><circle cx="39" cy="-250" r="8.5" fill="${skin}"/><circle cx="39" cy="-250" r="4" fill="${skSh}" opacity=".5"/>`);
  g.push(`<circle cx="0" cy="-252" r="40" fill="${skin}"/>`
    + `<path d="M0 -292 A40 40 0 0 1 0 -212 A27 40 0 0 0 0 -292 Z" fill="${skSh}" opacity=".42"/>`
    + `<path d="M-31 -278 A40 40 0 0 0 -37 -236" stroke="${skHi}" stroke-width="3.5" fill="none" opacity=".55" stroke-linecap="round"/>`);
  // hair / headwear
  if (veil) {
    g.push('<path d="M-37 -262 Q-39 -211 0 -205 Q39 -211 37 -262 Q31 -223 0 -219 Q-31 -223 -37 -262 Z" fill="#fff"/>'
      + '<path d="M-41 -258 Q-41 -300 0 -300 Q41 -300 41 -258 Q21 -277 0 -277 Q-21 -277 -41 -258 Z" fill="#fff"/>'
      + `<path d="M-48 -262 Q-48 -313 0 -313 Q48 -313 48 -262 Q41 -292 0 -294 Q-41 -292 -48 -262 Z" fill="${veil}"/>`);
  } else if (girl) {
    g.push(`<path d="M-43 -250 Q-48 -300 0 -298 Q48 -300 43 -250 L47 -195 Q37 -189 33 -199 L35 -258 Q20 -277 0 -275 Q-20 -277 -35 -258 L-33 -199 Q-37 -189 -47 -195 Z" fill="${hair}"/>`
      + `<path d="M-22 -286 Q0 -294 20 -288" stroke="${light(hair, 0.35)}" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/>`);
  } else if (beard) {
    g.push(`<path d="M-40 -254 Q-41 -294 0 -294 Q41 -294 40 -254 Q37 -273 18 -277 Q0 -271 -18 -277 Q-37 -273 -40 -254 Z" fill="${hair}"/>`);
  } else {
    g.push(`<path d="M-41 -249 Q-45 -300 0 -298 Q45 -300 41 -249 Q35 -271 14 -273 Q8 -265 -2 -273 Q-26 -275 -41 -249 Z" fill="${hair}"/>`
      + `<path d="M-24 -286 Q-4 -295 16 -289" stroke="${light(hair, 0.4)}" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>`);
  }
  if (beard) g.push(`<path d="M-35 -242 Q-33 -204 0 -201 Q33 -204 35 -242 Q25 -223 0 -225 Q-25 -223 -35 -242 Z" fill="${beard}"/><path d="M12 -232 Q24 -228 30 -238 Q28 -210 6 -203Z" fill="${dark(beard, 0.3)}" opacity=".5"/>`);
  if (k.crown) g.push(`<path d="M-31 -285 L-31 -314 L-15 -299 L0 -320 L15 -299 L31 -314 L31 -285 Z" fill="${GOLD}" stroke="#b08a3a" stroke-width="3"/><circle cx="0" cy="-296" r="4.5" fill="#c8323a"/>`);
  // face; mood: happy (default) | joy | sad | worried | determined | stern | surprised | peaceful (eyes closed, praying)
  const mood = k.mood || 'happy', lc = beard ? '#3a2416' : INK, brC = veil ? INK : dark(hair, 0.05);
  if (mood === 'peaceful') {
    g.push(`<path d="M-21 -251 q7 6 14 0 M7 -251 q7 6 14 0" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`);
  } else {
    const ry = mood === 'surprised' ? 9.8 : 8.2, rx = mood === 'surprised' ? 6.8 : 6.2;
    g.push(`<g data-blink="${f(ph * 3)} 0 -250"><ellipse cx="-14" cy="-250" rx="${rx}" ry="${ry}" fill="${INK}"/><ellipse cx="14" cy="-250" rx="${rx}" ry="${ry}" fill="${INK}"/>`
      + '<circle cx="-16" cy="-253.5" r="2.5" fill="#fff"/><circle cx="12" cy="-253.5" r="2.5" fill="#fff"/><circle cx="-11.5" cy="-246.5" r="1.2" fill="#fff" opacity=".8"/><circle cx="16.5" cy="-246.5" r="1.2" fill="#fff" opacity=".8"/></g>');
  }
  const brows = {
    sad: 'M-23 -263 L-8 -270 M8 -270 L23 -263', worried: 'M-23 -264 Q-15 -266 -8 -271 M8 -271 Q15 -266 23 -264',
    determined: 'M-23 -268 Q-15 -268 -8 -265 M8 -265 Q15 -268 23 -268', stern: 'M-23 -271 L-7 -263 M7 -263 L23 -271',
    surprised: 'M-23 -273 q8 -7 15 0 M8 -273 q8 -7 15 0',
  }[mood] || 'M-23 -266 q8 -5 15 0 M8 -266 q8 -5 15 0';
  g.push(`<path d="${brows}" stroke="${brC}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + `<path d="M-3 -239 q3 3 6 0" stroke="${skSh}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
    + `<ellipse cx="-25" cy="-236" rx="8" ry="5" fill="#ef6f6a" opacity="${mood === 'sad' || mood === 'stern' ? 0.18 : 0.32}"/><ellipse cx="25" cy="-236" rx="8" ry="5" fill="#ef6f6a" opacity="${mood === 'sad' || mood === 'stern' ? 0.18 : 0.32}"/>`);
  if (k.talk) {
    const [a, b] = Array.isArray(k.talk) ? k.talk : [0.3, 999];
    g.push(`<g data-talk="${a} ${b} 0 -231"><ellipse cx="0" cy="-231" rx="7.5" ry="6" fill="#5a2620"/><ellipse cx="0" cy="-228" rx="4.5" ry="2.4" fill="#d86a6a"/></g>`);
  } else {
    const st = `stroke="${lc}" stroke-width="2.6" fill="none" stroke-linecap="round"`;
    g.push({
      joy: '<path d="M-11 -236 Q0 -220 11 -236 Z" fill="#5a2620"/><path d="M-6 -229 Q0 -225 6 -229" stroke="#d86a6a" stroke-width="3" fill="none" stroke-linecap="round"/>',
      sad: `<path d="M-8 -228 Q0 -235 8 -228" ${st}/>`,
      worried: `<path d="M-8 -231 q4 -3 8 0 q4 3 8 0" ${st}/>`,
      determined: `<path d="M-8 -233 Q0 -228 8 -233" ${st}/>`,
      stern: `<path d="M-8 -231 H8" ${st}/>`,
      surprised: `<ellipse cx="0" cy="-230" rx="5" ry="6.5" fill="#5a2620"/>`,
      peaceful: `<path d="M-7 -233 Q0 -228 7 -233" ${st}/>`,
    }[mood] || `<path d="M-9 -233 Q0 -225 9 -233" ${st}/>`);
  }
  if (k.over) g.push(k.over);
  g.push(arm(1, k.armR ?? 8, k.propR));
  g.push('</g></g></g>');
  return g.join('');
}

// ------------------------------------------------------------- set pieces
export function coconut(x, y, s = 1, { flip = false, lean = 30 } = {}) {
  const fr = [-160, -125, -85, -45, -10, 25, 55].map((a, i) => {
    const r = (a * Math.PI) / 180, ex = 130 * Math.cos(r), ey = 130 * Math.sin(r) + 30, c = i % 2 ? '#3f7d3a' : '#4f9446';
    return `<path d="M0 0 Q${f(ex * 0.45)} ${f(ey * 0.45 - 40)} ${f(ex)} ${f(ey)}" stroke="${c}" stroke-width="18" fill="none" stroke-linecap="round"/>`
      + `<path d="M0 0 Q${f(ex * 0.45)} ${f(ey * 0.45 - 40)} ${f(ex)} ${f(ey)}" stroke="#8fc46a" stroke-width="2.5" fill="none" opacity=".6"/>`;
  }).join('');
  let rings = '';
  for (let i = 1; i < 12; i++) { const t = i / 12; rings += `<path d="M${f(-12 + lean * t * t - 2)} ${f(-420 * t)} q12 4 26 0" stroke="#5a3d22" stroke-width="3" fill="none" opacity=".6"/>`; }
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">`
    + `<path d="M0 0 Q-18 -210 ${lean} -420" stroke="#7a5536" stroke-width="28" fill="none" stroke-linecap="round"/><path d="M8 0 Q-8 -210 ${lean + 8} -418" stroke="#5a3d22" stroke-width="8" fill="none" opacity=".5"/>${rings}`
    + `<g transform="translate(${lean},-420)"><g${M.sway(3, 4 + (x % 3) * 0.4, 0)}>${fr}<circle cx="-9" cy="13" r="13" fill="#6b4a2a"/><circle cx="12" cy="15" r="13" fill="#5d3f22"/><circle cx="2" cy="24" r="12" fill="#6b4a2a"/></g></g></g>`;
}

export function nipa_hut(x, y, s = 1) {
  let thatch = '';
  for (let i = 0; i < 6; i++) thatch += `<path d="M${-150 + i * 8} ${-140 - i * 20} L${150 - i * 8} ${-140 - i * 20}" stroke="#6f5226" stroke-width="3" opacity=".5"/>`;
  let slats = '';
  for (let i = 0; i < 11; i++) slats += `<path d="M${-104 + i * 20} -150 V-36" stroke="#b08446" stroke-width="3" opacity=".7"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + '<rect x="-104" y="-40" width="12" height="74" fill="#6b4a2a"/><rect x="92" y="-40" width="12" height="74" fill="#6b4a2a"/><rect x="-6" y="-40" width="12" height="74" fill="#5a3d22"/>'
    + `<rect x="-112" y="-152" width="224" height="118" fill="#cfa063"/>${slats}<rect x="40" y="-152" width="72" height="118" fill="#8a6234" opacity=".35"/>`
    + '<rect x="-112" y="-40" width="224" height="10" fill="#8a6234"/>'
    + '<rect x="-80" y="-128" width="50" height="44" fill="#3a2614"/><path d="M-84 -132 h58 M-55 -128 v44" stroke="#8a6234" stroke-width="5"/>'
    + '<rect x="10" y="-124" width="56" height="90" fill="#4a2f18"/>'
    + `<path d="M-160 -138 L0 -268 L160 -138 Z" fill="#9a7838"/>${thatch}<path d="M0 -268 L160 -138 L60 -138 Z" fill="#6f5226" opacity=".45"/>`
    + '<path d="M-160 -138 L0 -268 L160 -138" stroke="#6f5226" stroke-width="8" fill="none" stroke-linejoin="round"/>'
    + '<path d="M20 -34 L-4 34 M56 -34 L32 34 M14 -16 h36 M6 6 h36 M-1 26 h36" stroke="#6b4a2a" stroke-width="6"/></g>';
}

export function ship(x, y, s = 1, { crew = true } = {}) {
  const crewSvg = crew ? person(-70, -22, 0.55, { kind: 'priest' }) + person(12, -22, 0.5, { kind: 'pedro', armR: [115, 14, 1.4] }) : '';
  return `<g transform="translate(${f(x)},${f(y)}) scale(${s})"><g${M.sway(2, 5, 0, 0, 0)}><g${M.bob(8, 4.4)}>`
    + crewSvg
    + '<rect x="-210" y="-560" width="13" height="540" fill="#5a3d22"/><rect x="88" y="-470" width="12" height="450" fill="#5a3d22"/>'
    + '<path d="M-205 -560 L-205 -60 M94 -470 L94 -60 M-205 -560 L-330 -60 M-205 -560 L250 -60" stroke="#3a2614" stroke-width="2" opacity=".5"/>'
    + '<path d="M-330 -60 L-300 -60 L-280 -40 L-260 -60 L250 -60 Q300 -90 330 -112 L300 40 Q0 70 -290 40 Z" fill="#6b4226"/>'
    + '<path d="M-310 -2 Q0 22 312 -24 L300 40 Q0 70 -290 40 Z" fill="#4e2f1a"/>'
    + '<path d="M-320 -24 Q0 -2 316 -44" stroke="#8a5a34" stroke-width="10" fill="none"/><path d="M-320 -50 L250 -50" stroke="#a8743f" stroke-width="5"/>'
    + '<circle cx="-150" cy="-8" r="9" fill="#2a1a10"/><circle cx="-40" cy="0" r="9" fill="#2a1a10"/><circle cx="70" cy="-2" r="9" fill="#2a1a10"/><circle cx="180" cy="-10" r="9" fill="#2a1a10"/>'
    + `<g${M.pulse(0.03, 3, 0, -205, -400)}><path d="M-300 -540 Q-200 -500 -110 -540 L-100 -270 Q-205 -240 -310 -270 Z" fill="#f6ecd4"/><path d="M-170 -526 Q-140 -520 -110 -540 L-100 -270 Q-130 -260 -160 -256 Z" fill="#dccdaa"/>`
    + '<path d="M-205 -480 V-320 M-250 -420 H-160" stroke="#b03a2e" stroke-width="16" stroke-linecap="round"/></g>'
    + `<g${M.pulse(0.03, 3.4, 0.5, 95, -340)}><path d="M10 -450 Q95 -415 180 -450 L188 -230 Q95 -205 4 -230 Z" fill="#f1e5c8"/><path d="M120 -430 Q150 -440 180 -450 L188 -230 Q160 -222 130 -218 Z" fill="#d8c8a2"/>`
    + '<path d="M95 -400 V-270 M58 -350 H132" stroke="#b03a2e" stroke-width="13" stroke-linecap="round"/></g>'
    + `<g transform="translate(-198,-560)"><g${M.sway(10, 0.9, 0, 0, 0)}><path d="M0 0 l74 14 l-74 22 Z" fill="${GOLD}"/></g></g>`
    + '</g></g></g>';
}

export function basilica(x, y, s = 1, { color = '#3a2a40', glow = true } = {}) {
  const cols = Array.from({ length: 11 }, (_, i) => `<rect x="${-250 + i * 50}" y="-150" width="24" height="150"/>`).join('');
  const win = glow ? `<g fill="#ffd98a" opacity=".85">${[-200, -100, 0, 100, 200].map((wx) => `<path d="M${wx - 12} -250 v-30 a12 12 0 0 1 24 0 v30 Z"/>`).join('')}<path d="M-14 -420 v-40 a14 14 0 0 1 28 0 v40 Z"/><path d="M-70 -400 v-28 a10 10 0 0 1 20 0 v28Z M50 -400 v-28 a10 10 0 0 1 20 0 v28Z"/></g>` : '';
  return `<g transform="translate(${x},${y}) scale(${s})"><g fill="${color}">`
    + '<path d="M-150 -360 Q-150 -560 0 -582 Q150 -560 150 -360 Z"/><rect x="-14" y="-644" width="28" height="72"/><rect x="-32" y="-628" width="64" height="10"/>'
    + '<rect x="-182" y="-372" width="364" height="42"/><rect x="-290" y="-330" width="580" height="180"/><path d="M-312 -330 L0 -422 L312 -330 Z"/>'
    + cols + '<rect x="-560" y="-90" width="300" height="90"/><rect x="260" y="-90" width="300" height="90"/></g>'
    + `<path d="M-100 -540 Q0 -600 100 -540" stroke="${light(color, 0.18)}" stroke-width="5" fill="none" opacity=".6"/>${win}</g>`;
}

export function crowd(y, n = 12, { color = '#241a2e', flags = [['#2b4fa8', '#c8323a', '#f6f2e8']] } = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = 40 + (i * (W - 80)) / (n - 1), h = (20 * ((i * 37) % 5)) / 5;
    out += `<g transform="translate(${f(x)},${f(y + h)})"><g${M.bob(7, 1.4 + (i % 4) * 0.25, i * 0.3)} fill="${color}"><circle cx="0" cy="-130" r="34"/><path d="M-60 0 Q-60 -90 0 -95 Q60 -90 60 0 Z"/>`;
    if (i % 3 === 1) {
      const [a, b, c] = flags[i % flags.length];
      out += `<path d="M40 -220 v120" stroke="${color}" stroke-width="6"/><g transform="translate(40,-220)"><g${M.sway(6, 1.2, i * 0.2)}>`
        + `<path d="M0 0 h62 q-6 13 0 26 h-62 Z" fill="${a}"/><path d="M0 26 h62 q-6 13 0 26 h-62 Z" fill="${b}"/><path d="M0 0 l35 26 l-35 26 Z" fill="${c}"/><circle cx="12" cy="26" r="5" fill="${GOLD}"/></g></g>`;
    }
    out += '</g></g>';
  }
  return out;
}

export const ground = (y, color, { rim = null } = {}) =>
  `<rect x="-200" y="${y}" width="${W + 400}" height="${H - y + 500}" fill="${color}"/>` + (rim ? `<rect x="-200" y="${y}" width="${W + 400}" height="6" fill="${rim}" opacity=".5"/>` : '');
