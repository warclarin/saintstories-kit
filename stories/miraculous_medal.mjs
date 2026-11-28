// Our Lady of the Miraculous Medal (one story, Paris, 1830-1832). Feast: November 27.
// All-3D backgrounds (miraculous_medal.bg3d.js: the Rue du Bac chapel as cathedral() from conrad_spider_chalice.bg3d.js, Burgundy
// fields from anglia(), Paris streets from mexico() + Parisian facades); cam3d; characters hd(); Ricks Clips motion.
// Sources (cross-checked): Association of the Miraculous Medal "Story of the Miraculous Medal" (amm.org): Catherine born 2 May 1806,
// ninth of eleven; at nine, after her mother's death, she kissed Our Lady's statue: "Now, dear Blessed Mother, now you will be my
// mother."; 18 July 1830 the child at half past eleven, Mary in the director's chair; 27 November 1830 at evening meditation Mary
// standing on a globe, rays from the rings on her fingers ("These rays symbolize the graces I shed upon those who ask for them. The
// gems from which rays do not fall are the graces for which souls forget to ask."); the oval inscription "O Mary conceived without
// sin, pray for us who have recourse to thee"; the reverse with twelve stars, the M with a cross and bar, two hearts (thorns,
// sword); "Have a medal struck after this model. All who wear it will receive great graces"; she kept the secret until shortly
// before her death, 46 years later; first medals 1832; called "Miraculous". Also confirmed by EWTN (her confessor did not believe
// her; 46-year secret, told her superior eight months before her death), Wikipedia "Miraculous Medal" (Vachette; 1,500 medals
// 30 June 1832; over 10 million distributed by 1839; Leo XIII, feast 27 Nov), New Advent "Miraculous Medal" (Aladel, Archbishop de
// Quelen), Famvin (2,000 medals delivered 30 June 1832; cholera "claimed 20,000 lives"; cures reported; Parisians called it
// "miraculous"), NCRegister, Hozana (Aladel told her to stop thinking about these "imaginations"), Wikipedia "Catherine Labouré"
// (farmer Pierre Labouré, Fain-lès-Moutiers; novice at 140 rue du Bac from 21 April 1830). Google check of Mary's words: amm.org,
// ewtn.com library, marian.org, stas.org agree.
// Voiced quotes: the girl Catherine (AMM, modern wording) and Mary ("Have a medal struck after this model.").
// Exported for later reels: mary, catherineL, girlCath, aladel, sisterDC, parisian, oldMan, maryStatue, globe, rays, medalOval,
// medalBack, medalCoin, smallMedal, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import fs from 'fs';
import { speedLines, sweat, burst, squash } from '../cartoonfx.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';
import { peasant } from './conrad_spider_chalice.mjs';

const SLUG = 'our_lady_miraculous_medal';
const at = wordTimes(SLUG);
let TIM = null;
try { TIM = JSON.parse(fs.readFileSync(new URL(`../work/${SLUG}/timings.json`, import.meta.url), 'utf8')); } catch { /* not narrated yet */ }
/** [start, end] of line i of a scene, in seconds from the scene start (flow lead-ins included). */
const lineSpan = (sc, i) => { const se = TIM?.[sc]?.sentences?.[i]; const L = sc === 0 ? 0.3 : 0.1; return se ? [+(L + se.start).toFixed(2), +(L + se.end).toFixed(2)] : [0.3, 999]; };
let SNAP = 0;
const seq = (draw, steps) => {
  const ph = (++SNAP * 0.37) % 1;
  return steps.map(([t, o], i) => { const next = steps[i + 1]?.[0], tw = [];
    if (i) tw.push({ at: t, dur: 0.001, from: { opacity: 0 }, to: { opacity: 1 } });
    if (next !== undefined) tw.push(i ? { at: next, dur: 0.001, to: { opacity: 0 } } : { at: next, dur: 0.001, from: { opacity: 1 }, to: { opacity: 0 } });
    return `<g${i ? ' opacity="0"' : ''}${tw.length ? M.tw(tw) : ''}>${draw({ ph, ...o })}</g>`; }).join('');
};
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const until = (t, svg) => `<g${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 1 }, to: { opacity: 0 } }])}>${svg}</g>`;
const from = (t, svg) => `<g opacity="0"${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }])}>${svg}</g>`;
const pop = (x, y, t, svg, dur = 0.45) => `<g transform="translate(${f(x)},${f(y)})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.2 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
/** Where a hand ends up (art coords) for hd(x, y, s): side -1 = armL (viewer's left), 1 = armR. */
const hand = (x, y, s, side, ang) => { const a = ang * Math.PI / 180; return [x + s * side * (34 + 96 * Math.sin(a)), y + s * (-198 + 96 * Math.cos(a))]; };
const PRAY = { armL: -20, armR: -20 };
const INSCR = 'O MARY CONCEIVED WITHOUT SIN PRAY FOR US WHO HAVE RECOURSE TO THEE';

// ================================================================ the medal and the vision
/** The globe under Mary's feet (centre cx, cy, radius r): the blue Earth with green and tan lands, lit from the upper left, and
 * the serpent coiled over it under her heel (redrawn 2026-11-27 after the user's reference painting). */
let GID = 0;
export const globe = (cx, cy, r) => {
  const id = `glb${++GID}`;
  const lands = '<path d="M-0.78 -0.36 Q-0.56 -0.64 -0.3 -0.46 Q-0.18 -0.22 -0.38 0 Q-0.28 0.26 -0.44 0.56 Q-0.62 0.42 -0.64 0.1 Q-0.88 -0.04 -0.78 -0.36Z" fill="#7aa65a"/>'
    + '<path d="M0.04 -0.56 Q0.34 -0.72 0.52 -0.46 Q0.4 -0.3 0.56 -0.1 Q0.62 0.26 0.34 0.58 Q0.18 0.3 0.14 0.06 Q-0.06 -0.1 0.04 -0.56Z" fill="#8aae62"/>'
    + '<path d="M0.2 -0.2 Q0.4 -0.24 0.44 -0.04 Q0.3 0.06 0.2 -0.2Z M-0.6 -0.2 Q-0.5 -0.3 -0.42 -0.18 Q-0.5 -0.08 -0.6 -0.2Z" fill="#c8b47a"/>'
    + '<path d="M0.62 0.5 Q0.78 0.44 0.84 0.6 Q0.72 0.72 0.62 0.5Z M-0.2 0.7 Q0 0.62 0.12 0.76 Q-0.04 0.86 -0.2 0.7Z" fill="#7aa65a"/>';
  const snake = 'M-0.92 -0.36 Q-0.62 -0.98 -0.04 -0.96 Q0.56 -0.92 0.86 -0.56 Q1.04 -0.3 0.98 0.02 Q0.94 0.24 1.1 0.3';
  return `<defs><radialGradient id="${id}g" cx=".34" cy=".3" r=".8"><stop offset="0" stop-color="#9ccff0"/><stop offset=".55" stop-color="#3a78b4"/><stop offset="1" stop-color="#1c4676"/></radialGradient>`
    + `<clipPath id="${id}c"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`
    + `<g><circle cx="${cx}" cy="${cy}" r="${f(r * 1.55)}" fill="url(#haloGlow)" opacity=".55"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}g)"/>`
    + `<g clip-path="url(#${id}c)"><g transform="translate(${cx},${cy}) scale(${r})">${lands}</g>`
    + `<path d="M${f(cx + r * 0.25)} ${f(cy - r)} A${r} ${r} 0 0 1 ${f(cx + r * 0.25)} ${f(cy + r)} A${f(r * 0.78)} ${r} 0 0 0 ${f(cx + r * 0.25)} ${f(cy - r)}Z" fill="#0e2240" opacity=".35"/></g>`
    + `<ellipse cx="${f(cx - r * 0.38)}" cy="${f(cy - r * 0.42)}" rx="${f(r * 0.3)}" ry="${f(r * 0.18)}" fill="#ffffff" opacity=".3" transform="rotate(-30 ${f(cx - r * 0.38)} ${f(cy - r * 0.42)})"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#bfe0ff" stroke-width="${f(r * 0.03)}" opacity=".6"/>`
    + `<g transform="translate(${cx},${cy}) scale(${r})"><path d="${snake}" stroke="#4a3e2a" stroke-width=".15" fill="none" stroke-linecap="round"/>`
    + `<path d="${snake}" stroke="#8a7a50" stroke-width=".05" fill="none" stroke-linecap="round" opacity=".8"/>`
    + '<ellipse cx="1.12" cy="0.3" rx=".13" ry=".085" fill="#4a3e2a" transform="rotate(20 1.12 .3)"/><circle cx="1.16" cy="0.27" r=".022" fill="#e8d070"/></g></g>';
};
/** Rays of light streaming from a hand at (hx, hy) down toward the globe, fanned by `spread`, flickering softly. */
export const rays = (hx, hy, { len = 300, spread = 0.45, dir = 0, n = 7, op = 0.6, seed = 1 } = {}) => {
  let s = '';
  for (let k = 0; k < n; k++) {
    const a = Math.PI / 2 + dir + (k / (n - 1) - 0.5) * spread, L = len * (0.8 + 0.25 * Math.sin(k * 2.3 + seed)), w = 5 + (k % 3) * 2;
    const ex = hx + Math.cos(a) * L, ey = hy + Math.sin(a) * L, px = -Math.sin(a) * w, py = Math.cos(a) * w;
    s += `<path d="M${f(hx)} ${f(hy)} L${f(ex + px)} ${f(ey + py)} L${f(ex - px)} ${f(ey - py)}Z" fill="#fff4c8" opacity="${f(0.55 + (k % 2) * 0.3)}"${M.flick(1.2 + (k % 3) * 0.3, k * 0.17, 0.55)}/>`;
  }
  return `<g opacity="${op}"><circle cx="${f(hx)}" cy="${f(hy)}" r="34" fill="url(#sunGlow)"/>${s}</g>`;
};
/** Rings with gems on the fingers (a hand prop): bright stones that shine and a dark one that does not. */
const rings = `<g><circle r="22" fill="url(#sunGlow)" opacity=".9"/><circle cx="-6" cy="6" r="3.2" fill="#fff6c0"/><circle cx="0" cy="9" r="3.2" fill="#9ae0ff"/><circle cx="6" cy="6" r="3.2" fill="#ffd0e0"/><circle cx="3" cy="11" r="2.4" fill="#4a3a5a"/></g>`;
/** Length of an ellipse arc (radii rx, ry) from angle a0 to a1 (degrees, y down, clockwise). */
const arcLen = (rx, ry, a0, a1) => { let L = 0, px = null, py = null; for (let k = 0; k <= 200; k++) { const a = (a0 + (a1 - a0) * k / 200) * Math.PI / 180, x = rx * Math.cos(a), y = ry * Math.sin(a); if (px !== null) L += Math.hypot(x - px, y - py); px = x; py = y; } return L; };
let OID = 0;
/** The oval frame of the medal's front with the inscription in golden letters (centre cx, cy, radii rx, ry). */
export const medalOval = (cx, cy, rx, ry, { size = 36, year = true, fill = 'none', ring = GOLD } = {}) => {
  const id = `insc${++OID}`, ir = size * 1.15, a0 = 128, a1 = 412, tx = rx - ir, ty = ry - ir;
  const p = (a) => [cx + tx * Math.cos(a * Math.PI / 180), cy + ty * Math.sin(a * Math.PI / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1), L = arcLen(tx, ty, a0, a1);
  return `<defs><path id="${id}" d="M${f(x0)} ${f(y0)} A${f(tx)} ${f(ty)} 0 1 1 ${f(x1)} ${f(y1)}"/></defs>`
    + `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="#b08a3a" stroke-width="${size * 0.5}"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${ring}" stroke-width="${size * 0.32}"/>`
    + `<ellipse cx="${cx}" cy="${cy}" rx="${rx - size * 0.3}" ry="${ry - size * 0.3}" fill="none" stroke="#fff4cc" stroke-width="2" opacity=".8"/>`
    + `<text font-family="Lora, serif" font-weight="700" font-size="${size}" fill="${GOLD}" stroke="#6a4a1a" stroke-width="${f(size * 0.05)}" paint-order="stroke">`
    + `<textPath href="#${id}" textLength="${f(L * 0.98)}" lengthAdjust="spacing">${INSCR}</textPath></text>`
    + (year ? `<text x="${cx}" y="${f(cy + ry - size * 0.55)}" text-anchor="middle" font-family="Lora, serif" font-weight="700" font-size="${f(size * 0.9)}" fill="${GOLD}" stroke="#6a4a1a" stroke-width="${f(size * 0.05)}" paint-order="stroke">1830</text>` : '');
};
const star = (x, y, r, c = GOLD) => `<path d="M${f(x)} ${f(y - r)} L${f(x + r * 0.29)} ${f(y - r * 0.31)} L${f(x + r)} ${f(y - r * 0.31)} L${f(x + r * 0.43)} ${f(y + r * 0.13)} L${f(x + r * 0.62)} ${f(y + r * 0.85)} L${f(x)} ${f(y + r * 0.4)} L${f(x - r * 0.62)} ${f(y + r * 0.85)} L${f(x - r * 0.43)} ${f(y + r * 0.13)} L${f(x - r)} ${f(y - r * 0.31)} L${f(x - r * 0.29)} ${f(y - r * 0.31)}Z" fill="${c}" stroke="#8a6a2a" stroke-width="${f(r * 0.08)}"/>`;
const heart = (x, y, s, kind) => {
  const H = 'M0 44 C-70 0 -56 -56 0 -22 C56 -56 70 0 0 44Z';
  const fl = '<path d="M-10 -26 Q-16 -52 0 -70 Q16 -52 10 -26Z" fill="#ffb040"/><path d="M-4 -28 Q-6 -44 0 -54 Q6 -44 4 -28Z" fill="#fff0b0"/>';
  const thorns = kind === 'sacred' ? '<ellipse cx="0" cy="2" rx="44" ry="16" fill="none" stroke="#5a6a2a" stroke-width="7"/><ellipse cx="0" cy="2" rx="44" ry="16" fill="none" stroke="#8a9a4a" stroke-width="3" stroke-dasharray="4 7"/>'
    + `<path d="M0 -62 v-22 M-8 -76 h16" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>` : '';
  const sword = kind === 'immaculate' ? `<path d="M-52 -38 L44 36" stroke="#e8ecf4" stroke-width="7" stroke-linecap="round"/><path d="M-44 -48 L-58 -28" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/><circle cx="-60" cy="-44" r="6" fill="${GOLD}"/>` : '';
  return `<g transform="translate(${f(x)},${f(y)}) scale(${s})">${fl}<path d="${H}" fill="#d83a4a"/><path d="M0 44 C40 18 56 -10 40 -34 C56 0 40 26 0 44Z" fill="#a82a3a" opacity=".6"/><ellipse cx="-22" cy="-14" rx="10" ry="6" fill="#ff9aa8" opacity=".7"/>${thorns}${sword}</g>`;
};
const MPATH = 'M-110 120 V-110 H-70 L0 30 L70 -110 H110 V120 H74 V-40 L8 96 H-8 L-74 -40 V120 Z';
/** The reverse of the medal inside an oval: the M with a cross rising from a bar, twelve stars, two hearts (centre cx, cy).
 * mAt / crossAt / starsAt / heartsAt: times each part pops in (null = shown from the start). */
export const medalBack = (cx, cy, rx, ry, { s = 1, starsAt = null, heartsAt = null, crossAt = null, mAt = null } = {}) => {
  const show = (t, svg, x, y) => (t == null ? svg : pop(x, y, t, `<g transform="translate(${-x},${-y})">${svg}</g>`));
  const mBody = `<g transform="translate(${cx},${f(cy - 10 * s)}) scale(${s})"><path d="${MPATH}" fill="${GOLD}" stroke="#8a6a2a" stroke-width="6"/><path d="M70 -110 H110 V120 H74 V-40Z" fill="#c89a3a" opacity=".6"/></g>`;
  const cross = `<g transform="translate(${cx},${f(cy - 10 * s)}) scale(${s})"><rect x="-120" y="-150" width="240" height="24" rx="4" fill="${GOLD}" stroke="#8a6a2a" stroke-width="5"/>`
    + `<rect x="-14" y="-330" width="28" height="200" rx="3" fill="${GOLD}" stroke="#8a6a2a" stroke-width="5"/><rect x="-66" y="-286" width="132" height="26" rx="3" fill="${GOLD}" stroke="#8a6a2a" stroke-width="5"/></g>`;
  let stars = '';
  for (let k = 0; k < 12; k++) { const a = (-90 + k * 30) * Math.PI / 180, x = cx + (rx - 40 * s) * Math.cos(a), y = cy + (ry - 44 * s) * Math.sin(a);
    stars += starsAt == null ? star(x, y, 22 * s) : pop(x, y, starsAt + k * 0.07, star(0, 0, 22 * s), 0.3); }
  const hearts = heart(cx - 78 * s, cy + 210 * s, 1.05 * s, 'sacred') + heart(cx + 78 * s, cy + 210 * s, 1.05 * s, 'immaculate');
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff6dc" opacity=".92"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#b08a3a" stroke-width="18"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${GOLD}" stroke-width="11"/>`
    + show(mAt, mBody, cx, cy) + show(crossAt, cross, cx, f(cy - 200 * s)) + stars + show(heartsAt, hearts, cx, f(cy + 210 * s));
};
/** A small embossed Mary of the medal front (arms out, rays, on the globe), feet at (0, 0), about 185 tall at s = 1. */
const maryRelief = (s = 1, c = '#f8e6a8', sh = '#b08a3a') => `<g transform="scale(${s})">`
  + `<path d="M-46 0 Q0 -18 46 0" stroke="${sh}" stroke-width="8" fill="none"/>`
  + [-1, 1].map((sd) => `<path d="M${sd * 26} -96 L${sd * 52} -6 M${sd * 30} -96 L${sd * 64} -14 M${sd * 22} -96 L${sd * 40} -2" stroke="${c}" stroke-width="3" opacity=".9"/>`).join('')
  + `<path d="M-14 -150 Q-30 -60 -34 -4 L34 -4 Q30 -60 14 -150Z" fill="${c}" stroke="${sh}" stroke-width="3"/>`
  + `<path d="M-14 -138 L-30 -100 M14 -138 L30 -100" stroke="${c}" stroke-width="10" stroke-linecap="round"/><path d="M-14 -138 L-30 -100 M14 -138 L30 -100" stroke="${sh}" stroke-width="2" opacity=".5"/>`
  + `<circle cy="-162" r="13" fill="${c}" stroke="${sh}" stroke-width="3"/><path d="M-16 -158 Q-18 -182 0 -184 Q18 -182 16 -158 Q22 -110 20 -60" stroke="${sh}" stroke-width="3" fill="none"/></g>`;
/** A gold medal coin (centre 0, 0, height 2 ry): the front (Mary and the lettering) or the back (M, cross, stars, hearts). */
export const medalCoin = (ry = 100, back = false) => {
  const rx = ry * 0.74, k = ry / 100;
  const rim = `<ellipse rx="${f(rx + 4 * k)}" ry="${f(ry + 4 * k)}" fill="#8a6a2a"/><ellipse rx="${f(rx)}" ry="${f(ry)}" fill="${GOLD}"/><ellipse rx="${f(rx - 7 * k)}" ry="${f(ry - 7 * k)}" fill="none" stroke="#b08a3a" stroke-width="${f(3 * k)}"/>`
    + `<ellipse cx="${f(-rx * 0.35)}" cy="${f(-ry * 0.45)}" rx="${f(rx * 0.2)}" ry="${f(ry * 0.12)}" fill="#fff4cc" opacity=".55" transform="rotate(-30 ${f(-rx * 0.35)} ${f(-ry * 0.45)})"/>`;
  if (!back) {
    let dots = ''; for (let j = 0; j < 46; j++) { const a = (128 + j * 6.2) * Math.PI / 180, px = (rx - 16 * k) * Math.cos(a), py = (ry - 16 * k) * Math.sin(a);
      dots += `<rect x="${f(px - 2.4 * k)}" y="${f(py - 4 * k)}" width="${f(4.8 * k)}" height="${f(8 * k)}" rx="1" fill="#9a7a32" transform="rotate(${f(j * 6.2 + 218)} ${f(px)} ${f(py)})"/>`; }
    return `<g>${rim}${dots}<g transform="translate(0,${f(ry * 0.62)})">${maryRelief(ry / 115)}</g></g>`;
  }
  let st = ''; for (let j = 0; j < 12; j++) { const a = (-90 + j * 30) * Math.PI / 180; st += star((rx - 14 * k) * Math.cos(a), (ry - 14 * k) * Math.sin(a), 6 * k, '#f8e6a8'); }
  return `<g>${rim}${st}<g transform="translate(0,${f(-8 * k)}) scale(${f(0.26 * k)})"><path d="${MPATH}" fill="#f8e6a8" stroke="#8a6a2a" stroke-width="8"/>`
    + '<rect x="-120" y="-150" width="240" height="24" fill="#f8e6a8" stroke="#8a6a2a" stroke-width="7"/><rect x="-14" y="-300" width="28" height="170" fill="#f8e6a8" stroke="#8a6a2a" stroke-width="7"/><rect x="-60" y="-262" width="120" height="24" fill="#f8e6a8" stroke="#8a6a2a" stroke-width="7"/></g>'
    + heart(-20 * k, 50 * k, 0.24 * k, 'sacred') + heart(20 * k, 50 * k, 0.24 * k, 'immaculate') + '</g>';
};
/** A small medal held in the hand or floating (glows). */
export const smallMedal = (s = 1, glowOp = 0.7) => `<g transform="scale(${s})"><circle r="34" fill="url(#sunGlow)" opacity="${glowOp}"/>${medalCoin(16)}</g>`;
/** A medal on a cord around the neck (hd body space). */
const neckMedal = `<path d="M-22 -212 Q0 -160 22 -212" stroke="#4a3a5a" stroke-width="2" fill="none"/><g transform="translate(0,-168)"><circle r="20" fill="url(#sunGlow)" opacity=".8"/>${medalCoin(10)}</g>`;

// ================================================================ characters
/** Our Lady as on the medal (redrawn 2026-11-27 after the user's reference painting): an ivory dress with a gold sash, a deep blue
 * mantle from the shoulders that frames her down both sides, a white veil with long brown hair, a halo; she stands on the globe. */
const MANTLE_BACK = '<path d="M-40 -226 Q-66 -200 -88 -120 Q-112 -50 -106 -4 L106 -4 Q112 -50 88 -120 Q66 -200 40 -226 Q0 -238 -40 -226Z" fill="#245a8a"/>'
  + '<path d="M-88 -120 Q-112 -50 -106 -4 M88 -120 Q112 -50 106 -4" stroke="#3f82b8" stroke-width="5" fill="none" opacity=".7"/>';
const MANTLE_FRONT = [-1, 1].map((sd) => `<path d="M${sd * 34} -216 Q${sd * 58} -202 ${sd * 66} -150 Q${sd * 82} -80 ${sd * 92} -6 L${sd * 68} -4 Q${sd * 62} -88 ${sd * 50} -150 Q${sd * 42} -190 ${sd * 24} -212Z" fill="${sd < 0 ? '#3474aa' : '#2a6296'}"/>`
  + `<path d="M${sd * 50} -150 Q${sd * 62} -88 ${sd * 68} -4" stroke="#5a9ad0" stroke-width="3" fill="none" opacity=".7"/><path d="M${sd * 60} -130 Q${sd * 72} -70 ${sd * 80} -10" stroke="#1c4a76" stroke-width="2.4" fill="none" opacity=".6"/>`).join('');
/** Two long braids falling from beside her face over the shoulders onto the chest (hd body space). */
const BRAIDS = [-1, 1].map((sd) => { let b = '';
  for (let k = 0; k < 8; k++) { const y = -234 + k * 11, x = sd * (37 - k * 1.1);
    b += `<ellipse cx="${f(x)}" cy="${y}" rx="6" ry="8.2" fill="${k % 2 ? '#8a6038' : '#7a5232'}" transform="rotate(${sd * (k % 2 ? 24 : -24)} ${f(x)} ${y})"/>`; }
  return b + `<rect x="${f(sd * 28 - 5)}" y="-150" width="10" height="5" rx="2" fill="#d8b060"/><path d="M${sd * 28 - 5} -145 Q${sd * 28} -132 ${sd * 28 + 5} -145Z" fill="#8a6038"/>`
    + `<path d="M${f(sd * 34)} -236 Q${f(sd * 38)} -200 ${f(sd * 30)} -160" stroke="#5a3a22" stroke-width="1.6" fill="none" opacity=".5"/>`; }).join('');
export const mary = (x, y, s, { over = '', under = '', ...o } = {}) => hd(x, y, s, { top: '#f4ead2', plain: true, trim: '#e2cc94', mantle: null, belt: '#d8b060', halo: true,
  skin: '#f2d2b6', hair: '#8a6038', veil: '#f6eedc', veilHair: 'parted', iris: '#6a5a4a', beard: null, age: 'young', mood: 'downcast', ...o,
  under: MANTLE_BACK + under, over: MANTLE_FRONT + BRAIDS + over });
const collarW = '<path d="M-20 -212 Q0 -192 20 -212 L18 -200 Q0 -184 -18 -200Z" fill="#fbf8f0"/>';
/** The Daughters of Charity cornette: a starched white headdress with two wide wings (hd body space). */
const cornette = '<g><path d="M-38 -278 Q-96 -268 -150 -292 Q-166 -318 -140 -334 Q-90 -330 -42 -310Z" fill="#fbfaf6"/><path d="M38 -278 Q96 -268 150 -292 Q166 -318 140 -334 Q90 -330 42 -310Z" fill="#f0eee8"/>'
  + '<path d="M-60 -292 Q-100 -296 -138 -318 M-56 -282 Q-104 -282 -146 -302 M60 -292 Q100 -296 138 -318 M56 -282 Q104 -282 146 -302" stroke="#d8d4cc" stroke-width="2.4" fill="none"/>'
  + '<path d="M-46 -270 Q-50 -310 0 -314 Q50 -310 46 -270 Q30 -292 0 -294 Q-30 -292 -46 -270Z" fill="#fbfaf6"/></g>';
const HABIT = { top: '#4e5e80', plain: true, trim: '#3e4e70', mantle: null, belt: false, veil: '#f6f2ea', veilHair: 'hidden', beard: null, shoes: '#2a2228', iris: '#5a6a4a' };
/** St. Catherine Labouré: a Daughter of Charity in a grey-blue habit; a plain white veil (the cornette was tried and dropped). */
export const catherineL = (x, y, s, { cornet = false, old = false, over = '', ...o } = {}) => hd(x, y, s, { ...HABIT, skin: '#f0c8a8', hair: '#6a4a30', age: old ? 'mid' : 'young',
  ...o, over: collarW + over });   // plain white veil (user's choice 2026-11-27: the cornette read as floppy ears); cornet kept as a no-op
/** Little Catherine (Zoé) at nine on the farm: a russet dress and apron, long brown hair. Use 0.62 x adult scale. */
export const girlCath = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#a8583a', trim: '#e8c880', belt: '#5a3a22', skin: '#f0c8a8', hair: '#7a5232', hairStyle: 'long',
  beard: null, age: 'young', iris: '#5a6a4a', shoes: '#4a3424', ...o, over: '<path d="M-30 -150 L30 -150 L40 -14 L-40 -14Z" fill="#f2ead8" opacity=".95"/>' + over });
const rabat = '<path d="M-7 -208 L-9 -186 L-1 -186 L0 -206 L1 -186 L9 -186 L7 -208Z" fill="#fbf8f0"/>';
/** Fr. Jean-Marie Aladel, Vincentian priest and her confessor: black cassock, white rabat, clean-shaven, dark hair. */
export const aladel = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#221e28', plain: true, trim: '#141018', mantle: null, belt: '#141018', skin: '#e8bc9a', hair: '#3a2a20',
  hairStyle: 'short', beard: null, age: 'mid', iris: '#3a2a20', shoes: '#1a1418', ...o, over: rabat + over });
const DCS = ['#e2b48f', '#d9a47e', '#efc6a2'];
/** A Daughter of Charity of 1832 (grey-blue habit, plain white veil). */
export const sisterDC = (x, y, s, i = 0, { over = '', ...o } = {}) => hd(x, y, s, { ...HABIT, skin: DCS[i % 3], hair: '#4a3424', age: i % 2 ? 'mid' : 'young', ...o, over: collarW + over });
const topHat = '<g><rect x="-30" y="-372" width="60" height="78" rx="4" fill="#26222c"/><rect x="-30" y="-310" width="60" height="10" fill="#6a2a2a"/><ellipse cx="0" cy="-294" rx="52" ry="11" fill="#1e1a22"/><path d="M10 -372 H30 V-300 H10Z" fill="#3a3640" opacity=".6"/></g>';
const bonnet = '<g><path d="M-56 -244 Q-62 -320 0 -326 Q62 -320 56 -244 Q44 -298 0 -302 Q-44 -298 -56 -244Z" fill="#e8d8b8"/><path d="M-40 -244 Q-34 -206 0 -204 Q34 -206 40 -244" stroke="#8a3a4a" stroke-width="5" fill="none"/></g>';
const PAR = [['#3a4a6a', '#e2b48f', '#4a3424'], ['#7a3a4a', '#efc6a2', '#6a4a30'], ['#4a5a3a', '#d9a47e', '#2a1c12'], ['#6a5a7a', '#e8bc9a', '#8a5e36']];
/** A Parisian of 1832: men (even i) in a frock coat and top hat, women (odd i) in a dress and bonnet. medal: wears the medal. */
export const parisian = (x, y, s, i = 0, { medal = false, over = '', ...o } = {}) => { const [c, skin, hair] = PAR[i % 4], man = i % 2 === 0;
  return hd(x, y, s, man ? { top: c, trousers: dark(c, 0.35), lapels: '#f6f2ea', tie: '#2a2228', belt: false, mantle: null, skin, hair, hairStyle: 'short', beard: i % 4 === 2 ? hair : null,
    beardStyle: i % 4 === 2 ? 'short' : null, age: 'mid', iris: '#3a2a20', ...o, over: (medal ? neckMedal : '') + topHat + over }
    : { top: c, plain: true, trim: light(c, 0.3), mantle: null, belt: false, skin, hair, beard: null, veil: '#e8d8b8', veilHair: 'covered', iris: '#3a2a20', age: 'young', shoes: '#3a2a22', ...o,
      over: (medal ? neckMedal : '') + bonnet + over }); };
/** An old man of the hospice with a white beard. */
export const oldMan = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#7a6a5a', plain: true, trim: '#5a4a3a', mantle: '#5a4a44', lining: '#8a7a6a', belt: false, skin: '#e2b48f',
  hair: '#e8e2d8', hairStyle: 'old', beard: '#e8e2d8', beardStyle: 'long', age: 'old', iris: '#4a3a2a', shoes: '#3a2a22', ...o, over });
const cane = '<g><rect x="-4" y="-60" width="8" height="300" rx="3" fill="#7a5432"/><path d="M0 -60 Q0 -84 22 -84 Q34 -82 32 -68" stroke="#7a5432" stroke-width="8" fill="none" stroke-linecap="round"/></g>';
const bowl = '<g transform="translate(0,-14)"><path d="M-26 -6 Q0 30 26 -6Z" fill="#c8a070"/><ellipse cy="-6" rx="26" ry="7" fill="#e8c890"/><path d="M-8 -16 q4 -8 0 -14 M6 -18 q4 -8 0 -14" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/></g>';
const blanket = '<path d="M-48 -214 Q-70 -120 -66 -96 L66 -96 Q70 -120 48 -214 Q0 -226 -48 -214Z" fill="#8a6a4a"/><path d="M-48 -214 Q0 -200 48 -214" stroke="#6a4a32" stroke-width="5" fill="none"/>';
/** A small statue of Our Lady on a base (held or on a shelf), base at (0, 0). */
export const maryStatue = (s = 1) => `<g transform="scale(${s})"><rect x="-18" y="-10" width="36" height="12" rx="2" fill="#8a6a4a"/>`
  + '<path d="M-14 -10 Q-18 -50 -8 -72 L8 -72 Q18 -50 14 -10Z" fill="#fbf6ea"/><path d="M-16 -10 Q-20 -44 -10 -70 Q-4 -60 -6 -10Z M16 -10 Q20 -44 10 -70 Q4 -60 6 -10Z" fill="#7aa0d8"/>'
  + '<circle cy="-80" r="9" fill="#f2d2b6"/><path d="M-11 -78 Q-12 -94 0 -94 Q12 -94 11 -78 Q14 -60 12 -46" stroke="#7aa0d8" stroke-width="4" fill="none"/>'
  + `<circle cy="-82" r="15" fill="none" stroke="${GOLD}" stroke-width="2.4"/></g>`;
/** A sheet with her drawing of the medal (held in the hand). */
const sketch = '<g transform="translate(0,-36) rotate(-6)"><rect x="-30" y="-40" width="60" height="78" rx="3" fill="#f6efe0"/><rect x="-30" y="-40" width="60" height="78" rx="3" fill="none" stroke="#c8b898" stroke-width="2"/>'
  + '<ellipse cx="0" cy="-2" rx="18" ry="26" fill="none" stroke="#6a5a4a" stroke-width="2.4"/><path d="M0 -18 V10 M-7 -10 L0 -16 L7 -10 M-6 14 L0 4 L6 14" stroke="#6a5a4a" stroke-width="2" fill="none"/></g>';
/** A wall calendar with tear-off pages: the year flips from 1830 to 1831 to 1832 at the two given times. */
const calendar = (x, y, flips) => {
  const page = (yr) => '<rect x="-70" y="-50" width="140" height="150" rx="6" fill="#fbf6ea"/><rect x="-70" y="-50" width="140" height="34" rx="6" fill="#a8282e"/>'
    + `<text x="0" y="68" text-anchor="middle" font-family="Lora, serif" font-weight="700" font-size="54" fill="#2b1d14">${yr}</text>`;
  const yrs = [1830, 1831, 1832];
  return `<g transform="translate(${x},${y})"><rect x="-76" y="-56" width="152" height="164" rx="8" fill="#5a3a22" opacity=".5"/>`
    + yrs.map((yr, k) => { const t1 = flips[k];
      const out = t1 != null ? M.tw([{ at: t1, dur: 0.35, from: { y: 0, rotation: 0, opacity: 1 }, to: { y: 220, rotation: 25, opacity: 0 }, ease: 'power2.in', origin: '0 -50' }]) : '';
      return `<g${out}>${page(yr)}</g>`; }).reverse().join('') + '</g>';
};
/** A Burgundy farmhouse (a MID card): pale stone, a brown tile roof, a door and a barn, base at (x, y). */
const farmhouse = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="6" rx="300" ry="20" fill="#140c14" opacity=".2"/>`
  + '<rect x="-220" y="-170" width="260" height="170" fill="#e4d4b4"/><rect x="0" y="-170" width="40" height="170" fill="#c8b490"/><path d="M-240 -170 L-90 -270 L60 -170Z" fill="#9a5a3a"/><path d="M-90 -270 L60 -170 L20 -170Z" fill="#7a4228"/>'
  + '<rect x="-130" y="-90" width="54" height="90" rx="4" fill="#6a4228"/><rect x="-200" y="-130" width="44" height="40" fill="#5a4a4a"/><rect x="-40" y="-130" width="44" height="40" fill="#5a4a4a"/>'
  + '<rect x="60" y="-120" width="180" height="120" fill="#b8946a"/><path d="M48 -120 L150 -190 L252 -120Z" fill="#8a5a3a"/><rect x="120" y="-80" width="60" height="80" fill="#5a3a22"/></g>';

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  oHook:    { key: '#fff0c8', from: 'r', tint: '#fff4e0', amt: 0.06, rim: '#fff8e4', rimOp: 0.8 },
  oFarm:    { key: '#fff0d0', from: 'r', tint: '#fff4e4', amt: 0.06, rim: '#fff8e8', rimOp: 0.75 },
  oVision:  { key: '#ffe0b0', from: 'r', tint: '#c8c0e0', amt: 0.14, rim: '#fff0c8', rimOp: 0.9 },
  oConfess: { key: '#ffc090', from: 'r', tint: '#e8b898', amt: 0.16, rim: '#ffc890', rimOp: 0.85 },
  oCholera: { key: '#ffd0a0', from: 'l', tint: '#a8a0b8', amt: 0.2, rim: '#ffd8a8', rimOp: 0.85 },
  oHidden:  { key: '#ffd8b0', from: 'l', tint: '#ffe8cc', amt: 0.08, rim: '#ffe8c8', rimOp: 0.8 },
  oGlory:   { key: '#ffd8a0', from: 'r', tint: '#ffe4c0', amt: 0.1, rim: '#ffe8c0', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `mmlit${++LID}`, d = 5;
  const offs = { l: [[d, 0]], r: [[-d, 0]], back: [[d, 0], [-d, 0], [0, d]], top: [[0, d], [d * 0.6, d * 0.6], [-d * 0.6, d * 0.6]] }[L.from];
  const rims = offs.map(([dx, dy], k) => `<feOffset in="SourceAlpha" dx="${dx}" dy="${dy}" result="o${k}"/><feComposite in="SourceAlpha" in2="o${k}" operator="out" result="e${k}"/>`).join('');
  const merge = offs.map((_, k) => `<feMergeNode in="e${k}"/>`).join('');
  return `<defs><filter id="${id}" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1680" height="2520" color-interpolation-filters="sRGB">`
    + `<feFlood flood-color="${L.tint}" result="t"/><feBlend in="SourceGraphic" in2="t" mode="multiply" result="m"/><feComposite in="m" in2="SourceAlpha" operator="in" result="mm"/>`
    + `<feComposite in="SourceGraphic" in2="mm" operator="arithmetic" k1="0" k2="${f(1 - L.amt)}" k3="${f(L.amt)}" k4="0" result="base"/>`
    + `${rims}<feMerge result="edge">${merge}</feMerge><feGaussianBlur in="edge" stdDeviation="1.6" result="eb"/>`
    + `<feFlood flood-color="${L.rim}" flood-opacity="${L.rimOp}"/><feComposite in2="eb" operator="in"/><feComposite in2="SourceAlpha" operator="in" result="rim"/>`
    + `<feMerge><feMergeNode in="base"/><feMergeNode in="rim"/></feMerge></filter></defs><g filter="url(#${id})">${svg}</g>`;
};
/** A soft cast shadow on the ground, thrown away from the scene's light (feet at x, y; s = character scale). */
export const castShadow = (x, y, s, mode) => {
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[LIGHT[mode].from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};
/** Our Lady of the medal standing on the globe with rays from her rings (globe centre gx, gy, radius gr; Mary scale s). */
export const vision = (gx, gy, gr, s, mode, { raysOn = 0, steps = [[0, {}]], rayOp = 0.75 } = {}) => {
  const my = gy - gr * 0.78, AR = 34;
  const [lx, ly] = hand(gx, my, s, -1, AR), [rx, ry] = hand(gx, my, s, 1, AR);
  const rr = rays(lx, ly + 10, { len: (gy - ly) * 0.95, dir: 0.32, spread: 0.6, op: rayOp, seed: 2 }) + rays(rx, ry + 10, { len: (gy - ry) * 0.95, dir: -0.32, spread: 0.6, op: rayOp, seed: 5 });
  let burst = ''; for (let k = 0; k < 40; k++) { const a = k * Math.PI / 20, L = (k % 2 ? 115 : 165) * s; burst += `M${f(Math.cos(a) * 60 * s)} ${f(Math.sin(a) * 60 * s)} L${f(Math.cos(a) * L)} ${f(Math.sin(a) * L)} `; }
  const radiance = `<g transform="translate(${gx},${f(my - 256 * s)})"><g${M.spin(3)}><path d="${burst}" stroke="#fff0c0" stroke-width="${f(3 * s)}" opacity=".24" stroke-linecap="round"/></g></g>`;
  return glow(gx, f(my - 252 * s), f(180 * s), 0.7) + radiance + globe(gx, gy, gr)
    + lit(seq((op) => mary(gx, my, s, { armL: [AR, 0.6, 3], armR: [AR, 0.6, 3.2], propL: rings, propR: rings, ...op }), steps), mode)
    + (raysOn ? `<g opacity="0"${fadeIn(raysOn, 0.6)}>${rr}</g>` : rr);
};
const maryFace = (G) => face(G[0], G[1] - G[2] * 0.78, G[3]);

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.97 ~1312, 0.95 ~1322, 0.92 ~1310,
// 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1240-1250. The chapel floor sits where the outdoor ground would.

// 0 · SHOT "A 24-year-old novice in Paris saw Mary standing on a globe, light pouring from her rings.": the chapel of the Rue du Bac;
//     Our Lady stands on the globe (frame 0), Catherine kneels before her; rays stream from the rings on "light pouring".
//     SHOT "This is Our Lady of the Miraculous Medal.": a low hero angle; the gold medal pops in above Catherine and flips.
const G0 = [640, 1262, 108, 2.05], K0 = [240, 1345, 2.05];
function scene0() {
  const sm = at(0, 'saw Mary'), lp = at(0, 'light pouring'), ti = at(0, 'This is'), mm = at(0, 'Miraculous Medal');
  const coin = `<g${M.tw([{ at: mm + 0.5, dur: 0.22, from: { scaleX: 1 }, to: { scaleX: 0.02 }, ease: 'power1.in', origin: '0 0' }])}>${medalCoin(92)}</g>`;
  const coinB = `<g opacity="0"${M.tw([{ at: mm + 0.72, dur: 0.02, from: { opacity: 0 }, to: { opacity: 1 } }])}><g${M.tw([{ at: mm + 0.72, dur: 0.22, from: { scaleX: 0.02 }, to: { scaleX: 1 }, ease: 'power1.out', origin: '0 0' }])}>${medalCoin(92, true)}</g></g>`;
  return vision(G0[0], G0[1], G0[2], G0[3], 'oHook', { raysOn: lp - 0.1, steps: [[0, { mood: 'downcast', look: [-0.5, 0] }], [ti, { mood: 'downcast', look: [0, 0] }]] })
    + speedLines(G0[0], 700, { at: sm - 0.05, dur: 0.6, r0: 320, r1: 900, op: 0.35, color: '#fff8e0', seed: 4 })
    + lit(castShadow(...K0, 'oHook') + seq((op) => catherineL(...K0, { kneel: true, ...PRAY, ...op }),
      [[0, { mood: 'peaceful' }], [sm, { mood: 'awe', look: [2.6, -2.4] }]]), 'oHook')
    + pop(K0[0] + 20, 700, mm - 0.1, `<circle r="140" fill="url(#sunGlow)" opacity=".8"/>${coin}${coinB}`)
    + NEAR(bokeh(7, { seed: 12, op: [0.2, 0.45] }));
}

// 1 · SHOT "She was Sister Catherine Labouré, a farmer's daughter.": Burgundy fields and the farmhouse; the novice stands by the
//     farm; on "farmer's daughter" her father walks in. SHOT "When her mother died, nine-year-old Catherine kissed a statue of
//     Mary:": cut to the past: little Catherine, sad, holding the statue; she kisses it on "kissed". SHOT the girl's own words.
const K1 = [380, 1345, 2.1], F1 = [740, 1312, 2.1], Z1 = [540, 1345, 1.32];
function scene1() {
  const fa = at(1, 'farmer'), wh = at(1, 'When her mother'), ki = at(1, 'kissed'), [q0, q1] = lineSpan(1, 2);
  const statueAt = (dy) => `<g transform="translate(0,${dy})">${maryStatue(1.15)}</g>`;
  const now = lit(castShadow(...K1, 'oFarm') + seq((op) => catherineL(...K1, { armL: [14, 2, 3], armR: [14, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [fa + 0.3, { mood: 'tender', look: [2.4, 0.2] }]]), 'oFarm')
    + layer(0.97, walk(fa - 0.1, 1.0, 320, lit(castShadow(...F1, 'oFarm') + peasant(...F1, 0, { flip: true, mood: 'happy', look: [2.4, 0], armL: [14, 2, 3], armR: [14, 2, 3] }), 'oFarm')));
  const past = glow(Z1[0], 1000, 420, 0.4) + lit(castShadow(...Z1, 'oFarm') + seq((op) => girlCath(...Z1, op),
      [[0, { mood: 'sad', look: [0, 1.6], armL: [40, 2, 3], armR: [40, 2, 3], propR: statueAt(0) }],
        [ki - 0.1, { mood: 'peaceful', armL: [40, 2, 3], armR: [118, 0, 3], propR: `<g transform="translate(-62,52) rotate(-12)">${maryStatue(1.15)}</g>` }],
        [q0 - 0.05, { mood: 'tender', talk: [q0, q1], armL: [40, 2, 3], armR: [70, 1, 3], propR: statueAt(-20) }]]), 'oFarm')
    + `<g opacity="0"${fadeIn(ki, 0.4)}>${sparkles(10, Z1[0] - 160, Z1[0] + 160, 780, 1080, { seed: 9 })}</g>`;
  return MID(lit(farmhouse(560, 1246, 0.9), 'oFarm')) + until(wh, now) + from(wh, past)
    + NEAR(foliage('r', 1660, { color: '#3e5a2a', seed: 6 }));
}

// 2 · SHOT "One November evening, golden words appeared around Mary.": the chapel at evening prayer; Mary on the globe with rays;
//     the oval of golden letters grows around her. SHOT the inscription (read slowly): the letters glow.
//     SHOT "Then it turned: an M, a cross, twelve stars, two hearts.": the oval flips over to the reverse; the M, the cross, the
//     twelve stars and the two hearts pop in on their words.
const OV = [600, 800, 270, 440], G2 = [600, 1150, 78, 1.72], K2 = [180, 1345, 2.0];
function scene2() {
  const gw = at(2, 'golden words'), om = at(2, 'O Mary'), tt = at(2, 'Then it turned'), mM = at(2, 'an M'), cr = at(2, 'a cross'), ts = at(2, 'twelve stars'), th = at(2, 'two hearts');
  const front = vision(G2[0], G2[1], G2[2], G2[3], 'oVision', { steps: [[0, { mood: 'downcast', look: [-0.5, 0] }]] })
    + `<g opacity="0"${M.tw([{ at: gw, dur: 0.6, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(1.4)', origin: `${OV[0]} ${OV[1]}` }])}>`
      + `<g${M.pulse(0.012, 2.2, 0, OV[0], OV[1])}>${medalOval(...OV)}</g></g>`
    + `<g opacity="0"${M.tw([{ at: om, dur: 0.4, from: { opacity: 0 }, to: { opacity: 0.8 } }])}>${glow(OV[0], OV[1] - OV[3] + 60, 260, 0.6)}${glow(OV[0] - OV[2] + 40, OV[1], 220, 0.5)}${glow(OV[0] + OV[2] - 40, OV[1], 220, 0.5)}</g>`;
  const flipOut = M.tw([{ at: tt, dur: 0.25, from: { scaleX: 1 }, to: { scaleX: 0.02 }, ease: 'power1.in', origin: `${OV[0]} ${OV[1]}` }]);
  const back = `<g opacity="0"${M.tw([{ at: tt + 0.25, dur: 0.02, from: { opacity: 0 }, to: { opacity: 1 } }])}><g${M.tw([{ at: tt + 0.25, dur: 0.25, from: { scaleX: 0.02 }, to: { scaleX: 1 }, ease: 'power1.out', origin: `${OV[0]} ${OV[1]}` }])}>`
    + `${glow(OV[0], OV[1], 520, 0.6)}${medalBack(...OV, { s: 1.05, mAt: mM, crossAt: cr, starsAt: ts, heartsAt: th })}</g></g>`;
  return `<g${flipOut}>${front}</g>` + back
    + lit(castShadow(...K2, 'oVision') + seq((op) => catherineL(...K2, { kneel: true, ...PRAY, ...op }),
      [[0, { mood: 'peaceful' }], [gw, { mood: 'awe', look: [2.6, -2.6] }], [tt, { mood: 'surprised', look: [2.6, -2] }], [th + 0.4, { mood: 'tender', look: [2.6, -2] }]]), 'oVision')
    + NEAR(bokeh(6, { seed: 22, op: [0.15, 0.35] }));
}

// 3 · SHOT "Mary told her:" + her words: Mary on the globe speaks (talk on her line); Catherine kneels, listening.
//     SHOT "But her confessor, Father Aladel, called it imagination.": cut; the vision is gone; Fr. Aladel shakes his hand at her
//     sketch of the medal (a jump cut on "imagination"); she stands, worried. SHOT "For almost two years, nothing happened.": he
//     walks off; the calendar pages tear away (1830 -> 1831 -> 1832); she prays, sad, alone.
const G3 = [720, 1265, 92, 1.95], K3 = [290, 1345, 2.05], A3 = [720, 1345, 2.2];
function scene3() {
  const [q0, q1] = lineSpan(3, 1), bc = at(3, 'But her confessor'), im = at(3, 'imagination'), fa = at(3, 'For almost'), nh = at(3, 'nothing happened');
  const maryV = vision(G3[0], G3[1], G3[2], G3[3], 'oConfess', { steps: [[0, { mood: 'downcast', look: [-0.5, 0] }], [q0 - 0.05, { mood: 'downcast', talk: [q0, q1], look: [-0.5, 0] }], [q1 + 0.1, { mood: 'downcast', look: [-0.5, 0] }]] });
  return until(bc, maryV + `<g opacity="0"${fadeIn(q0, 0.4)}>${sparkles(10, 560, 880, 520, 900, { seed: 31 })}</g>`)
    + from(bc, walkOut(fa + 0.2, 1.6, 520, lit(castShadow(...A3, 'oConfess') + seq((op) => aladel(...A3, { flip: true, ...op }),
      [[0, { mood: 'stern', look: [2.6, 0.6], armL: [14, 2, 3], armR: [40, 2, 3] }], [im - 0.2, { mood: 'stern', look: [2.6, 0.4], armL: [14, 2, 3], armR: [96, 14, 0.5] }],
        [fa, { mood: 'stern', look: [-1, 0], armL: [14, 2, 3], armR: [14, 2, 3] }]]), 'oConfess')))
    + from(fa + 0.6, calendar(470, 540, [fa + 1.0, nh + 0.2]))
    + lit(castShadow(...K3, 'oConfess') + seq((op) => catherineL(...K3, op),
      [[0, { kneel: true, mood: 'awe', look: [2.6, -2.4], ...PRAY }], [bc, { mood: 'worried', look: [2.6, -0.4], armL: [14, 2, 3], armR: [66, 2, 3], propR: sketch }],
        [fa + 0.4, { mood: 'sad', look: [0, 1.6], ...PRAY }]]), 'oConfess')
    + from(bc, sweat(...K3, im + 0.1, { dur: 1.6, side: 1 }));
}

// 4 · SHOT "Then cholera swept Paris, killing twenty thousand people.": a Paris street at dusk under a grey pall; a sick man
//     huddles in a blanket on the cobbles. SHOT "The sisters handed out the first medals, and cures were reported.": a Daughter
//     of Charity walks in and hands him a medal; on "cures" he stands up, well. SHOT the climax line: the people of Paris raise
//     their medals; a burst of gold light; the pall lifts.
const S4 = [380, 1345, 2.2], X4 = [740, 1312, 2.15];
function scene4() {
  const ch = at(4, 'cholera'), ts = at(4, 'The sisters'), fm = at(4, 'first medals'), cu = at(4, 'cures'), so = at(4, 'Soon all Paris'), mm = at(4, 'Miraculous Medal');
  const pall = `<g${M.tw([{ at: so, dur: 1.2, from: { opacity: 1 }, to: { opacity: 0 } }])}><rect x="-200" y="300" width="1480" height="1200" fill="#3a3848" opacity=".28"/>`
    + `<g opacity=".35"${M.drift(-60, 0)}><ellipse cx="300" cy="1100" rx="420" ry="90" fill="#8a8898" filter="url(#blur14)"/><ellipse cx="860" cy="1180" rx="380" ry="80" fill="#8a8898" filter="url(#blur14)"/></g></g>`;
  const crowd = [[230, 1262, 1.45, 0], [380, 1262, 1.45, 1], [880, 1262, 1.45, 2], [1000, 1262, 1.45, 3]].map(([x, y, s, i]) => lit(castShadow(x, y, s, 'oCholera')
    + parisian(x, y, s, i, { medal: true, flip: x > 540, mood: 'joy', look: [0, -1.4], armL: [140, 4, 1.4], armR: [30, 2, 3], propL: smallMedal(1.1) }), 'oCholera')).join('');
  return layer(0.78, from(so, crowd))
    + pall
    + layer(0.97, lit(castShadow(...X4, 'oCholera') + `<g${squash(cu + 0.05, X4[0], X4[1], 0.08)}>` + seq((op) => peasant(...X4, 0, { flip: true, ...op }),
      [[0, { kneel: true, mood: 'pain', armL: [10, 2, 3], armR: [10, 2, 3], over: blanket }], [fm + 0.4, { kneel: true, mood: 'worried', look: [2.6, -0.6], armL: [10, 2, 3], armR: [70, 1, 3], propR: smallMedal(1.2) }],
        [cu, { mood: 'joy', look: [0, -0.6], armL: [130, 4, 1.4], armR: [140, 4, 1.6], propR: smallMedal(1.2) }]]) + '</g>', 'oCholera')
      + sweat(...X4, ch + 0.3, { dur: 2.4, side: 1 }))
    + walk(ts, 1.1, -420, lit(castShadow(...S4, 'oCholera') + seq((op) => sisterDC(...S4, 0, op),
      [[0, { mood: 'happy', look: [2.6, 0.6], armL: [14, 2, 3], armR: [30, 2, 3], propR: smallMedal(1.2) }], [fm, { mood: 'tender', look: [2.6, 0.6], armL: [14, 2, 3], armR: [76, 1, 3], propR: smallMedal(1.2) }],
        [cu + 0.4, { mood: 'joy', look: [2.6, -0.6], armL: [14, 2, 3], armR: [40, 2, 3] }]]), 'oCholera'))
    + `<g opacity="0"${fadeIn(cu, 0.3)}>${sparkles(12, X4[0] - 160, X4[0] + 140, 640, 1000, { seed: 13 })}</g>`
    + burst(540, 760, 560, mm - 0.2) + `<g opacity="0"${fadeIn(mm - 0.2, 0.5)}>${glow(540, 760, 520, 0.45)}</g>`;
}

// 5 · SHOT "Ten million medals spread, yet Catherine kept her secret for forty-six years.": medals pop up all over the sky above
//     Paris; then the hidden sister, older, in her cornette, brings soup to an old man of the hospice. SHOT the quotable line:
//     Parisians wearing the medal walk past behind her without a glance; she smiles.
const K5 = [400, 1345, 2.15], O5 = [740, 1312, 2.1];
function scene5() {
  const tm = at(5, 'Ten million'), yc = at(5, 'yet Catherine'), se = at(5, 'secret'), tw = at(5, 'The world'), nk = at(5, 'never knew');
  let shower = ''; const R = (k) => { const v = Math.sin(k * 12.9898 + 7.3) * 43758.5453; return v - Math.floor(v); };
  for (let k = 0; k < 34; k++) shower += pop(80 + R(k) * 920, 380 + R(k + 50) * 560, tm + k * 0.06, `<g transform="rotate(${f((R(k + 90) - 0.5) * 50)})">${smallMedal(0.9 + R(k + 7) * 0.8, 0.5)}</g>`, 0.3);
  const passers = [[1180, 1286, 1.75, 0], [1340, 1286, 1.75, 1]].map(([x, y, s, i]) => layer(0.85, `<g${M.tw([{ at: tw - 0.3, dur: 4, from: { x: 0 }, to: { x: -1500 }, ease: 'none' }])}>`
    + lit(parisian(x, y, s, i, { medal: true, flip: true, mood: 'happy', look: [2.4, 0], armL: [14, 2, 3], armR: [14, 2, 3] }), 'oHidden') + '</g>')).join('');
  return `<g${M.tw([{ at: yc - 0.1, dur: 0.6, from: { opacity: 1 }, to: { opacity: 0.25 } }])}>${shower}</g>`
    + passers
    + layer(0.97, lit(castShadow(...O5, 'oHidden') + seq((op) => oldMan(...O5, { flip: true, armL: [24, 2, 3], propL: cane, ...op }),
      [[0, { mood: 'happy', look: [2.6, 0.4], armR: [14, 2, 3] }], [se, { mood: 'joy', look: [2.6, 0.4], armR: [60, 2, 3] }]]), 'oHidden'))
    + lit(castShadow(...K5, 'oHidden') + seq((op) => catherineL(...K5, { cornet: true, old: true, ...op }),
      [[0, { mood: 'happy', look: [2.4, 0.4], armL: [14, 2, 3], armR: [60, 2, 3], propR: bowl }], [se, { mood: 'tender', look: [0, 0], armL: [14, 2, 3], armR: [60, 2, 3], propR: bowl }],
        [nk, { mood: 'tender', look: [2.4, 0.2], armL: [14, 2, 3], armR: [60, 2, 3], propR: bowl }]]), 'oHidden')
    + NEAR(bokeh(6, { seed: 52, op: [0.18, 0.4] }));
}

// 6 · SHOT "Its feast day is November 27.": the chapel in gold: Our Lady on the globe inside the oval of golden words, as on the
//     medal; St. Catherine kneels with her halo. SHOT "Our Lady of the Miraculous Medal, pray for us.": closer on Our Lady; tender.
const OV6 = [620, 800, 280, 450], G6 = [620, 1150, 80, 1.75], K6 = [230, 1345, 1.95];
function scene6() {
  const nv = at(6, 'November'), ol = at(6, 'Our Lady');
  return vision(G6[0], G6[1], G6[2], G6[3], 'oGlory', { steps: [[0, { mood: 'downcast', look: [0, 0] }], [ol, { mood: 'downcast', look: [0, 0] }]] })
    + `<g${M.pulse(0.01, 2.4, 0, OV6[0], OV6[1])}>${medalOval(...OV6)}</g>`
    + lit(castShadow(...K6, 'oGlory') + catherineL(...K6, { kneel: true, halo: true, ...PRAY, mood: 'peaceful' }), 'oGlory')
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${sparkles(12, 360, 840, 420, 900, { seed: 61 })}</g>`
    + NEAR(bokeh(7, { seed: 47 }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };   // the path does the travelling (cam.path)
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'Our_Lady_of_the_Miraculous_Medal',
  bg3d: './miraculous_medal.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'conrad.bg3d.js': './conrad_spider_chalice.bg3d.js', 'mexico.bg3d.js': './miguel_pro_firing_squad.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  cast: { mary: { voice: 'ff_siwis', speed: 0.92 }, girl: { voice: { ff_siwis: 0.6, af_sky: 0.4 }, speed: 1.02 } },
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  music: { story: 'Our Lady of the Miraculous Medal: a young French novice, Catherine Labouré, sees Mary on a globe with rays of light pouring from her hands in a Paris chapel in 1830; the medal spreads through Paris during the cholera of 1832',
    color: 'France in 1830: a solo harp and celesta for the vision, warm strings, a soft pipe organ and a wordless female choir; gentle and luminous rather than martial',
    cues: { 1: 'A tender memory: a solo harp and a soft music-box celesta over warm strings, childlike and gentle.', 3: 'Doubt and waiting: a lone cello, sparse piano notes, hushed and slow.', 4: 'Plague-gloom in a minor key: low strings and a slow drum, then a bright rising release of choir and organ on the last line.' } },
  thumb_hook: 'Mary appeared with this medal', thumb_title: 'The Miraculous Medal', thumb_scene: 0, thumb_t: 6.2, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: { 'lˌeɪbɚɹˈeɪ': 'lˌɑːbuːɹˈeɪ', 'ɐlˈeɪdəl': 'ˌɑːlɑːdˈɛl' },   // Labouré = lah-boo-RAY, Aladel = ah-lah-DEL
  scenes: [
    { kicker: 'RUE DU BAC, PARIS · 1830', title: 'Light from Her Hands', art: scene0, bg3d: 'oHook', front3d: true,
      cam: { ...GLIDE, hero: { h: 1.8, at: at(0, 'This is'), dur: 0.8 }, path: [
        { at: at(0, 'light pouring', 0.4), to: [G0[0], 1000], z: 1.12, frame: [600, 960] },
        { at: at(0, 'Miraculous Medal', 0.6), to: [440, 780], z: 1.08, frame: [520, 860] }] },
      tone: HOOK,
      say: ['A 24-year-old novice in Paris saw Mary standing on a globe, light pouring from her rings.', 'This is Our Lady of the Miraculous Medal.'] },
    { kicker: 'BURGUNDY · A FARM GIRL', title: 'You Will Be My Mother', art: scene1, bg3d: 'oFarm', front3d: true,
      cam: { ...GLIDE, drone: { h: 8, back: 12, dur: 2.6 }, path: [
        { at: at(1, 'farmer'), to: [560, 900], z: 1.08, frame: [540, 900] },
        { at: at(1, 'kissed'), to: face(...Z1), z: 1.4, frame: [540, 880] }] },
      tone: HOOK,
      say: ["She was Sister Catherine Labouré, a farmer's daughter.", 'When her mother died, nine-year-old Catherine kissed a statue of Mary:', { text: 'Now, dear Blessed Mother, you will be my mother.', who: 'girl' }] },
    { kicker: 'NOVEMBER 27 · EVENING PRAYER', title: 'Golden Words', art: scene2, bg3d: 'oVision', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(2, 'golden words', 0.4), to: [OV[0] - 60, OV[1] + 40], z: 1.0, frame: [560, 880] },
        { at: at(2, 'two hearts'), to: [OV[0], OV[1] + 120], z: 1.12, frame: [560, 900] }] },
      tone: { speed: 1.0, gap: 0.24, gain: 0 },
      say: ['One November evening, golden words appeared around Mary.', { text: 'O Mary, conceived without sin, pray for us who have recourse to thee.', speed: 0.92 }, 'Then it turned: an M, a cross, twelve stars, two hearts.'] },
    { kicker: 'THE CONFESSOR · RUE DU BAC', title: 'Have a Medal Struck', art: scene3, bg3d: 'oConfess', front3d: true,
      cam: { ...GLIDE, zoom: [{ at: at(3, 'Have a medal'), to: maryFace(G3), style: 'snap', z: 1.45, hold: 1.4, center: 0.4 },
        { at: at(3, 'imagination', -0.1), to: face(...A3), style: 'cut', z: 1.45, hold: 1.4, center: 0.5 }], path: [
        { at: at(3, 'But her confessor'), to: [520, 960], z: 1.05, frame: [540, 940] },
        { at: at(3, 'nothing happened'), to: face(...K3), z: 1.2, frame: [500, 880] }] },
      tone: STAND,
      say: ['Mary told her:', { text: 'Have a medal struck after this model.', who: 'mary' }, 'But her confessor, Father Aladel, called it imagination.', 'For almost two years, nothing happened.'] },
    { kicker: 'PARIS · 1832 · CHOLERA', title: 'The Plague Year', art: scene4, bg3d: 'oCholera', front3d: true,
      cam: { ...GLIDE, whip: 'r', shake: { at: at(4, 'Miraculous Medal', -0.2), amt: 12, dur: 0.6 }, path: [
        { at: at(4, 'twenty thousand'), to: face(X4[0], X4[1], X4[2], true), depth: 0.97, z: 1.25, frame: [560, 900] },
        { at: at(4, 'cures'), to: [560, 900], z: 1.08, frame: [540, 900] },
        { at: at(4, 'Miraculous Medal'), to: [540, 860], z: 0.96, frame: [540, 900] }] },
      tone: { speed: 0.98, gap: 0.28, gain: -0.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['Then cholera swept Paris, killing twenty thousand people.', 'The sisters handed out the first medals, and cures were reported.', { text: 'Soon all Paris called it the Miraculous Medal.', speed: 0.85 }] },
    { kicker: '1839 · TEN MILLION MEDALS', title: 'The Hidden Sister', art: scene5, bg3d: 'oHidden', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(5, 'yet Catherine'), to: [560, 980], z: 1.05, frame: [540, 940] },
        { at: at(5, 'never knew'), to: face(...K5), z: 1.3, frame: [500, 860] }] },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Ten million medals spread, yet Catherine kept her secret for forty-six years.', 'The world wore her medal, but never knew her name.'] },
    { kicker: 'FEAST DAY · NOVEMBER 27', title: 'Our Lady of the Medal', art: scene6, bg3d: 'oGlory', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(6, 'Our Lady', 0.6), to: maryFace(G6), z: 1.3, frame: [540, 860] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Its feast day is November 27.', 'Our Lady of the Miraculous Medal, pray for us.'] },
  ],
};
