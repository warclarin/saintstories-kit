// Cartoon effects for SaintStories reels (opt-in, 2026-11-25, after the user compared the "Ricks Clips" explainer style).
// Every helper returns SVG in art coordinates (1080x1920, feet of an hd(x, y, s) character at (x, y), head centre at
// (x, y - 252 s), head radius 40 s) and times its own appearance: `at` = seconds from the scene start (use wordTimes()).
// Only the FIRST step of a multi-step tween may carry `from` (GSAP renders every fromTo start state at once).
// They are event effects, so they stay SVG; keep them off the saint's face (rage, steam and sweat are for persecutors,
// guards and doubters; sweat may show the saint's human beat).
//   sweat(x, y, s, at)          two drops slide down the temple            (worry, a doubter losing the argument)
//   steam(x, y, s, at)          puffs blow out of both sides of the head   (an angry ruler)
//   rage(x, y, s, at)           the face fills with purple from the chin   (the persecutor's fury)
//   speedLines(x, y, o)         radial anime lines around a point          (a sudden arrival, a shock, a miracle)
//   streaks(x0, y0, x1, y1, o)  motion streaks behind something moving     (a dove flying in, angels, a rider)
//   crack(x, y, r, at, o)       jagged cracks race out from a point        (the wheel breaking, a wall, an idol)
//   burst(x, y, r, at, o)       the big payoff: flash + shock ring + rays + sparks
//   squash(at, ox, oy, amt)     an M.tw attribute: squash-and-stretch on landing or impact (put it on a <g>)
//   mapCard(o) / route(pts, at, dur, o) / pin(x, y, at, icon)   an overhead map with a route drawn on (journeys)
import { M, GOLD, f } from './art.mjs';

let N = 0;
const uid = (p) => `${p}${++N}`;
const tw = (list) => M.tw(list);
const showFor = (at, dur, fin = 0.12, fout = 0.3) => tw([{ at, dur: fin, from: { opacity: 0 }, to: { opacity: 1 } }, { at: at + dur - fout, dur: fout, to: { opacity: 0 } }]);
const head = (x, y, s) => [x, y - 252 * s];

/** Two sweat drops on the temple facing `side` (1 = viewer's right, -1 = left), sliding down. */
export const sweat = (x, y, s = 1, at = 0, { dur = 1.8, side = 1 } = {}) => {
  const [hx, hy] = head(x, y, s);
  const drop = (dx, dy, k, d) => {
    const px = hx + side * dx * s, py = hy + dy * s, r = 7 * s * k;
    return `<g opacity="0"${showFor(at + d, dur - d, 0.1, 0.35)}><g${tw([{ at: at + d, dur: dur - d, from: { y: 0 }, to: { y: f(26 * s) }, ease: 'power1.in' }])}>`
      + `<path d="M${f(px)} ${f(py - r * 2.1)} Q${f(px + r * 1.15)} ${f(py - r * 0.2)} ${f(px)} ${f(py + r)} Q${f(px - r * 1.15)} ${f(py - r * 0.2)} ${f(px)} ${f(py - r * 2.1)}Z" fill="#9fd8ff" stroke="#3a8ad0" stroke-width="${f(1.4 * s)}"/>`
      + `<ellipse cx="${f(px - r * 0.3)}" cy="${f(py - r * 0.3)}" rx="${f(r * 0.25)}" ry="${f(r * 0.45)}" fill="#fff" opacity=".85"/></g></g>`;
  };
  return drop(44, -18, 1.1, 0) + drop(36, 6, 0.8, 0.35);
};

/** Steam puffs blowing out of both sides of the head, three bursts. */
export const steam = (x, y, s = 1, at = 0, { dur = 2, n = 3 } = {}) => {
  const [hx, hy] = head(x, y, s);
  let out = '';
  for (let k = 0; k < n; k++) for (const sd of [-1, 1]) {
    const t = at + k * (dur / n), px = hx + sd * 44 * s, py = hy - 14 * s;
    out += `<g opacity="0"${showFor(t, 0.8, 0.08, 0.4)}><g${tw([{ at: t, dur: 0.8, from: { x: 0, y: 0, scale: 0.4 }, to: { x: f(sd * 46 * s), y: f(-40 * s), scale: 1.25 }, ease: 'power2.out', origin: `${f(px)} ${f(py)}` }])}>`
      + `<circle cx="${f(px)}" cy="${f(py)}" r="${f(15 * s)}" fill="#ffffff"/><circle cx="${f(px + sd * 12 * s)}" cy="${f(py - 8 * s)}" r="${f(11 * s)}" fill="#f4f4f8"/>`
      + `<circle cx="${f(px - sd * 6 * s)}" cy="${f(py - 12 * s)}" r="${f(9 * s)}" fill="#eceef4"/></g></g>`;
  }
  return out;
};

/** The face fills with purple from the chin up (cartoon fury), holds, then drains. Draw it right after the character. */
export const rage = (x, y, s = 1, at = 0, { dur = 2.2, color = '#8a2aa8', op = 0.5 } = {}) => {
  const [hx, hy] = head(x, y, s), id = uid('rage'), r = 40 * s;
  return `<defs><clipPath id="${id}"><circle cx="${f(hx)}" cy="${f(hy)}" r="${f(r * 0.98)}"/></clipPath></defs>`
    + `<g clip-path="url(#${id})" opacity="0"${showFor(at, dur, 0.05, 0.5)} style="mix-blend-mode:multiply">`
    + `<g${tw([{ at, dur: 0.5, from: { y: f(2 * r) }, to: { y: 0 }, ease: 'power2.out' }])}><rect x="${f(hx - r)}" y="${f(hy - r)}" width="${f(2 * r)}" height="${f(2 * r)}" fill="${color}" opacity="${op}"/></g></g>`;
};

/** Radial anime speed lines around (x, y), flickering for `dur` s. */
export const speedLines = (x, y, { at = 0, dur = 0.8, n = 26, r0 = 300, r1 = 1100, color = '#ffffff', op = 0.7, seed = 1 } = {}) => {
  let ls = '';
  for (let k = 0; k < n; k++) {
    const a = (k + ((seed * 7 + k * 13) % 10) / 20) * 2 * Math.PI / n, w = 3 + ((k * 5 + seed) % 4) * 2, rr = r0 + ((k * 37 + seed * 11) % 120);
    const c = Math.cos(a), s = Math.sin(a), px = -s * w, py = c * w;
    ls += `<path d="M${f(x + c * rr)} ${f(y + s * rr)} L${f(x + c * r1 + px)} ${f(y + s * r1 + py)} L${f(x + c * r1 - px)} ${f(y + s * r1 - py)}Z" fill="${color}"${M.flick(0.18, (k % 5) * 0.03, 0.35)}/>`;
  }
  return `<g opacity="0"${showFor(at, dur, 0.06, 0.25)}><g opacity="${op}">${ls}</g></g>`;
};

/** Motion streaks trailing from (x0, y0) toward (x1, y1) (the direction of travel), shown for `dur` s. */
export const streaks = (x0, y0, x1, y1, { at = 0, dur = 0.8, n = 6, spread = 70, color = '#ffffff', op = 0.75 } = {}) => {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  let ls = '';
  for (let k = 0; k < n; k++) {
    const o = (k / (n - 1) - 0.5) * 2 * spread, len = L * (0.5 + ((k * 7) % 5) / 10), sx = x0 + nx * o + ux * ((k * 31) % 60), sy = y0 + ny * o + uy * ((k * 31) % 60);
    ls += `<path d="M${f(sx)} ${f(sy)} L${f(sx + ux * len)} ${f(sy + uy * len)}" stroke="${color}" stroke-width="${4 + (k % 3) * 2}" stroke-linecap="round" opacity="${f(0.5 + (k % 2) * 0.4)}"/>`;
  }
  return `<g opacity="0"${showFor(at, dur, 0.08, 0.3)}><g opacity="${op}"${tw([{ at, dur, from: { x: 0, y: 0 }, to: { x: f(ux * 60), y: f(uy * 60) }, ease: 'none' }])}>${ls}</g></g>`;
};

/** Jagged cracks racing out from (x, y) to radius r, drawn on in 0.18 s, then fading. */
export const crack = (x, y, r = 240, at = 0, { n = 7, seed = 3, color = '#2a1a14', width = 7, hold = 1.4 } = {}) => {
  let ps = '';
  for (let k = 0; k < n; k++) {
    let a = (k + 0.3 * Math.sin(seed + k * 2.1)) * 2 * Math.PI / n, px = x, py = y, d = `M${f(x)} ${f(y)}`, len = 0;
    const segs = 5;
    for (let j = 1; j <= segs; j++) {
      a += 0.45 * Math.sin(seed * 3 + k * 5 + j * 7); const step = r / segs * (0.75 + 0.5 * Math.abs(Math.sin(k + j * seed)));
      px += Math.cos(a) * step; py += Math.sin(a) * step * 0.6; d += ` L${f(px)} ${f(py)}`; len += step;
    }
    const L = f(len * 1.2);
    ps += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${f(width * (1 - k % 3 * 0.2))}" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L}"`
      + `${tw([{ at: at + (k % 3) * 0.03, dur: 0.18, from: { strokeDashoffset: +L }, to: { strokeDashoffset: 0 }, ease: 'power2.out' }])}/>`;
  }
  return `<g opacity="0"${showFor(at, hold + 0.6, 0.02, 0.6)}>${ps}</g>`;
};

/** The big payoff: a white-gold flash, a shock ring, rays and sparks bursting from (x, y). */
export const burst = (x, y, r = 420, at = 0, { color = GOLD, rays = 16, sparks = 22, seed = 5 } = {}) => {
  let ry = '', sp = '';
  for (let k = 0; k < rays; k++) {
    const a = (k / rays) * 2 * Math.PI + seed * 0.1, w = 0.05 + (k % 3) * 0.02, L = r * (0.9 + (k % 4) * 0.18);
    ry += `<path d="M${f(x)} ${f(y)} L${f(x + Math.cos(a - w) * L)} ${f(y + Math.sin(a - w) * L)} L${f(x + Math.cos(a + w) * L)} ${f(y + Math.sin(a + w) * L)}Z" fill="#fff4d0" opacity="${k % 2 ? 0.55 : 0.8}"/>`;
  }
  for (let k = 0; k < sparks; k++) {
    const a = (k * 2.39996 + seed) % (2 * Math.PI), D = r * (0.7 + ((k * 37) % 50) / 60), sz = 6 + (k % 4) * 3;
    sp += `<g opacity="0"${showFor(at + 0.02, 1.0, 0.03, 0.5)}><g${tw([{ at: at + 0.02, dur: 1.0, from: { x: 0, y: 0, scale: 1 }, to: { x: f(Math.cos(a) * D), y: f(Math.sin(a) * D + 80), scale: 0.3 }, ease: 'power3.out', origin: `${f(x)} ${f(y)}` }])}>`
      + `<path d="M${f(x)} ${f(y - sz)} L${f(x + sz * 0.3)} ${f(y - sz * 0.3)} L${f(x + sz)} ${f(y)} L${f(x + sz * 0.3)} ${f(y + sz * 0.3)} L${f(x)} ${f(y + sz)} L${f(x - sz * 0.3)} ${f(y + sz * 0.3)} L${f(x - sz)} ${f(y)} L${f(x - sz * 0.3)} ${f(y - sz * 0.3)}Z" fill="${k % 3 ? '#fff6d8' : color}"/></g></g>`;
  }
  const o = `${f(x)} ${f(y)}`;
  return `<g opacity="0"${showFor(at, 0.9, 0.03, 0.5)}><g${tw([{ at, dur: 0.9, from: { scale: 0.2, rotation: -8 }, to: { scale: 1.1, rotation: 6 }, ease: 'power3.out', origin: o }])}>${ry}</g></g>`
    + `<g opacity="0"${showFor(at, 0.7, 0.02, 0.45)}><g${tw([{ at, dur: 0.7, from: { scale: 0.1 }, to: { scale: 1 }, ease: 'power2.out', origin: o }])}>`
    + `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.9)}" fill="none" stroke="#fff8e0" stroke-width="18" opacity=".85"/></g></g>`
    + `<g opacity="0"${showFor(at, 0.55, 0.02, 0.45)}><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.75)}" fill="url(#sunGlow)"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.3)}" fill="#fffbea" opacity=".9"/></g>` + sp;
};

/** Squash-and-stretch on landing or impact: put it on a <g> around the character or prop (ox, oy = its feet). */
export const squash = (at, ox, oy, amt = 0.14) => tw([
  { at, dur: 0.09, from: { scaleX: 1, scaleY: 1 }, to: { scaleX: 1 + amt, scaleY: 1 - amt }, ease: 'power2.out', origin: `${ox} ${oy}` },
  { at: at + 0.09, dur: 0.12, to: { scaleX: 1 - amt * 0.5, scaleY: 1 + amt * 0.6 }, ease: 'power2.out', origin: `${ox} ${oy}` },
  { at: at + 0.21, dur: 0.45, to: { scaleX: 1, scaleY: 1 }, ease: 'elastic.out(1, 0.4)', origin: `${ox} ${oy}` }]);

// ------------------------------------------------------------------ overhead map (journeys)
/**
 * A parchment map that fills the frame (with overscan for camera moves). o.land / o.sea: SVG path data in art coords for
 * the coastline (sea drawn first, land on top); o.rivers: path data list; o.extra: more SVG (mountains, icons).
 * No words on the map (the narration names the places); icons and pins only.
 */
export const mapCard = ({ sea = '', land = '', rivers = [], extra = '', tone = '#ecd9aa' } = {}) => {
  const id = uid('mapg');
  return `<defs><radialGradient id="${id}" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="${tone}"/><stop offset="1" stop-color="#b8945a"/></radialGradient></defs>`
    + `<rect x="-400" y="-400" width="1880" height="2720" fill="url(#${id})"/>`
    + (sea ? `<path d="${sea}" fill="#7fb2c4"/><path d="${sea}" fill="none" stroke="#5a8ea2" stroke-width="10" opacity=".5"/>` : '')
    + (land ? `<path d="${land}" fill="${tone}" stroke="#9a7a48" stroke-width="5"/>` : '')
    + rivers.map((d) => `<path d="${d}" fill="none" stroke="#5a9ab4" stroke-width="9" stroke-linecap="round"/>`).join('')
    + extra
    + `<rect x="-400" y="-400" width="1880" height="2720" fill="none" stroke="#7a5a30" stroke-width="420" opacity=".22" filter="url(#blur14)"/>`;
};
/** A route drawn on over `dur` s (dashed gold line) with a glowing traveller moving along it. pts: [[x, y], …]. */
export const route = (pts, at = 0, dur = 2, { color = '#c8401e', width = 10, traveller = true } = {}) => {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`, L = 0;
  const seg = [];
  for (let k = 1; k < pts.length; k++) {
    const [x0, y0] = pts[k - 1], [x1, y1] = pts[k], l = Math.hypot(x1 - x0, y1 - y0);
    d += ` L${f(x1)} ${f(y1)}`; seg.push(l); L += l;
  }
  const id = uid('rtm');
  // the line is revealed by a mask path animated with stroke-dashoffset, so the visible line can stay dashed
  let out = `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-400" y="-400" width="1880" height="2720"><path d="${d}" fill="none" stroke="#fff" stroke-width="${width * 3}" stroke-linecap="round" stroke-linejoin="round"`
    + ` stroke-dasharray="${f(L + 10)}" stroke-dashoffset="${f(L + 10)}"${tw([{ at, dur, from: { strokeDashoffset: +f(L + 10) }, to: { strokeDashoffset: 0 }, ease: 'power1.inOut' }])}/></mask></defs>`
    + `<g mask="url(#${id})"><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-dasharray="${width * 2.2} ${width * 1.6}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  if (traveller) {
    // move the traveller with one tween per leg (offsets from the first point)
    const legs = [];
    let tt = at;
    for (let k = 1; k < pts.length; k++) {
      const d2 = dur * seg[k - 1] / L;
      legs.push({ at: tt, dur: d2, ...(k === 1 ? { from: { x: 0, y: 0 } } : {}), to: { x: f(pts[k][0] - pts[0][0]), y: f(pts[k][1] - pts[0][1]) }, ease: 'none' });
      tt += d2;
    }
    out += `<g opacity="0"${showFor(at, dur + 0.8, 0.2, 0.5)}><g${tw(legs)}><circle cx="${f(pts[0][0])}" cy="${f(pts[0][1])}" r="46" fill="url(#sunGlow)"/>`
      + `<circle cx="${f(pts[0][0])}" cy="${f(pts[0][1])}" r="13" fill="#fffbe8"/></g></g>`;
  }
  return out;
};
/** A map pin dropping in at time `at`, with an optional icon (SVG drawn around 0,0) above it. */
export const pin = (x, y, at = 0, icon = '', color = '#c8401e') =>
  `<g transform="translate(${f(x)},${f(y)})"><g opacity="0"${tw([{ at, dur: 0.45, from: { opacity: 0, y: -60 }, to: { opacity: 1, y: 0 }, ease: 'bounce.out' }])}>`
  + `<ellipse cx="0" cy="4" rx="18" ry="6" fill="#3a2410" opacity=".3"/><path d="M0 0 C-10 -18 -26 -30 -26 -48 A26 26 0 0 1 26 -48 C26 -30 10 -18 0 0Z" fill="${color}"/>`
  + `<circle cy="-48" r="10" fill="#fff4e0"/>${icon ? `<g transform="translate(0,-110)">${icon}</g>` : ''}</g></g>`;
