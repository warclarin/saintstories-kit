// St. Conrad of Constance: the spider in the chalice (one story, Constance, 10th century). Feast: November 26.
// All-3D backgrounds (conrad_spider_chalice.bg3d.js: cathedral(mode), a Romanesque nave, and lakeAlps() set-ups of anglia() from
// edmund_last_stand.bg3d.js for Lake Constance); cam3d; characters hd(); Ricks Clips motion (cam.path travel, instant pose swaps,
// no sway).
// Sources: Butler's Lives of the Saints, Nov 26 "St. Conrad, Bishop of Constance": of the Guelph (Welf) family, son of Henry, count
// of Altorff; schooled at Constance; provost of the cathedral; chosen bishop when Noting died (934), consenting only after a long
// time; St. Ulric of Augsburg "had strenuously promoted his election"; "made an exchange of his estates with his brother... and
// settled them all upon that church and the poor"; thrice visited the Holy Land; built St. Maurice, St. John and St. Paul at
// Constance; the spider "dropped into the chalice while the prelate was saying mass on Easter-day", which the insect "might have
// been taken out, and then decently burnt, some spiders being poisonous"; "out of devotion and respect for the holy mysteries" he
// swallowed it, and vomited it up "some hours after without receiving any harm"; canonized by Calixtus II. Wikipedia "Conrad of
// Constance": c. 900 - 26 November 975; Welf family; bishop 934; "Spiders were believed at that time to be deadly poisonous, but
// Conrad nevertheless drank" it "as a token of faith"; shown "as a bishop holding a chalice with a spider in it or over it";
// canonized 1123 at the First Lateran Council by Callixtus II; Vita by Udalschalk about 1120. New Catholic Encyclopedia
// (encyclopedia.com): Guelf family; bishop 934 through the backing of Ulric of Augsburg; feast Nov. 26. B. Theil (BLB Karlsruhe):
// the Easter Mass spider scene is in the Konrad Vita; he drank trusting in God's protection.
// No words of Conrad are recorded for the episode, so no quote is voiced; the "fish it out and burn it" line is Butler's own
// remark, told in the narrator's voice.
// Exported for later reels: conrad (bishop; noble: the young Welf lord), chalice2, spider, canon, peasant, altarStone, mitreGold,
// LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, lily, beam, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import { speedLines, sweat, burst, squash, streaks } from '../cartoonfx.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';
import { altarBoy } from './john_berchmans.mjs';
import { candle } from './leonard_of_port_maurice_colosseum.mjs';
import { scroll } from './andrew_apostle.mjs';
import { crozier } from './martin_of_tours.mjs';

const SLUG = 'st_conrad_spider_chalice';
const at = wordTimes(SLUG);
// pose changes swap instantly: any fade shows two arms and two chalices at once
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
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
/** Where a hand ends up (art coords) for an hd(x, y, s) character: side -1 = armL (viewer's left), 1 = armR; ang as in hd. */
const hand = (x, y, s, side, ang, flip = false) => {
  const a = ang * Math.PI / 180, sx = flip ? -side : side;
  return [x + s * sx * (34 + 96 * Math.sin(a)) * (flip ? 1 : 1), y + s * (-198 + 96 * Math.cos(a))];
};
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props
/** A deadly cartoon spider: round dark body with a red mark, eight bent legs that twitch, two shiny eyes (body centre 0,0). */
export const spider = (s = 1, { still = false } = {}) => {
  let legs = '';
  for (const sd of [-1, 1]) for (let k = 0; k < 4; k++) {
    const y0 = -5 + k * 4.5, kx = sd * (17 + k * 2), ky = y0 - 13 + k * 5, tx = sd * (27 + k), ty = y0 + 9 + k * 3;
    legs += `<path d="M${sd * 5} ${y0} Q${kx} ${ky} ${tx} ${ty}" stroke="#251d2c" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  }
  return `<g transform="scale(${s})"><g${still ? '' : M.sway(7, 0.42, 0, 0, 0)}>${legs}</g>`
    + '<ellipse cx="0" cy="5" rx="13" ry="11.5" fill="#2e2638"/><ellipse cx="-4" cy="1" rx="5" ry="3.4" fill="#6a5a7e" opacity=".5"/>'
    + '<path d="M0 6 l-3.5 -4 h7Z M0 6 l-3.5 4 h7Z" fill="#c8323a"/>'
    + '<circle cx="0" cy="-8" r="8.4" fill="#3a3046"/>'
    + '<circle cx="-3.6" cy="-9.4" r="3.2" fill="#fffaf2"/><circle cx="3.6" cy="-9.4" r="3.2" fill="#fffaf2"/>'
    + '<circle cx="-3.2" cy="-8.8" r="1.7" fill="#1a1018"/><circle cx="3.8" cy="-8.8" r="1.7" fill="#1a1018"/><circle cx="-4" cy="-10" r=".7" fill="#fff"/><circle cx="3" cy="-10" r=".7" fill="#fff"/></g>';
};
/** A Romanesque gold chalice held by the stem at (0, 0): wide bowl, knop, round foot. wine: red wine at the rim; spider: the
 * spider sitting in the wine (legs over the rim); tilt: degrees (drinking). glowOp: the soft glow around it. */
export const chalice2 = (s = 1, { wine = true, spider: sp = false, tilt = 0, glowOp = 0.7, holy = false } = {}) => `<g transform="rotate(${tilt}) scale(${s})">`
  + `<circle cy="-34" r="${holy ? 70 : 46}" fill="url(#haloGlow)" opacity="${glowOp}"/>`
  + `<path d="M-24 -56 Q-22 -20 0 -15 Q22 -20 24 -56Z" fill="${GOLD}"/><path d="M9 -56 H24 Q22 -20 0 -15 Q12 -24 9 -56Z" fill="#b08a3a" opacity=".6"/>`
  + `<path d="M-21 -46 Q-12 -42 -2 -44" stroke="#fff4cc" stroke-width="2.4" fill="none" opacity=".8" stroke-linecap="round"/>`
  + `<path d="M-24 -36 Q0 -30 24 -36" stroke="#c89a3a" stroke-width="2.4" fill="none"/>`
  + `<ellipse cy="-56" rx="24" ry="5.6" fill="#c9a24a"/>` + (wine ? `<ellipse cy="-56" rx="20.5" ry="4" fill="#6a1424"/><ellipse cx="-7" cy="-57" rx="6" ry="1.4" fill="#c84a5a" opacity=".6"/>` : '<ellipse cy="-56" rx="20.5" ry="4" fill="#8a6a2a"/>')
  + (sp ? `<g transform="translate(3,-60)">${spider(0.62)}</g><ellipse cx="3" cy="-55" rx="13" ry="2.6" fill="#6a1424"/>` : '')
  + `<rect x="-3.5" y="-16" width="7" height="26" fill="#c9a24a"/><ellipse cy="-3" rx="8.5" ry="6" fill="${GOLD}"/><ellipse cx="-2.6" cy="-4.4" rx="3" ry="2" fill="#fff4cc" opacity=".7"/>`
  + `<path d="M-19 16 Q0 5 19 16 Q0 21 -19 16Z" fill="${GOLD}"/><path d="M4 9 Q14 11 19 16 Q10 19 4 19Z" fill="#b08a3a" opacity=".6"/></g>`;
/** A silk thread from (x, y0) down to (x, y1). */
const thread = (x, y0, y1, op = 0.75) => `<path d="M${f(x)} ${f(y0)} V${f(y1)}" stroke="#fbf6ea" stroke-width="1.8" opacity="${op}"/>`;
/** A Romanesque stone altar with a white cloth and a red frontal with a gold cross (x0..x1, cloth top y, floor y). */
export const altarStone = (x0, x1, top, base, { candles = true, book = true } = {}) => {
  const w = x1 - x0, cx = (x0 + x1) / 2;
  return `<g><ellipse cx="${cx}" cy="${base + 6}" rx="${w * 0.56}" ry="16" fill="#140c14" opacity=".3"/>`
    + `<rect x="${x0}" y="${top}" width="${w}" height="${base - top}" fill="#a8906e"/><rect x="${x1 - w * 0.18}" y="${top}" width="${w * 0.18}" height="${base - top}" fill="#7e6a52"/>`
    + `<rect x="${x0 + 22}" y="${top + 40}" width="${w - 44}" height="${base - top - 70}" rx="6" fill="#a8282e"/><rect x="${x0 + 22}" y="${top + 40}" width="${w - 44}" height="${base - top - 70}" rx="6" fill="none" stroke="${GOLD}" stroke-width="6"/>`
    + `<path d="M${cx} ${top + 70} V${base - 60} M${cx - 34} ${top + 112} H${cx + 34}" stroke="${GOLD}" stroke-width="10" stroke-linecap="round"/>`
    + `<rect x="${x0 - 12}" y="${top - 12}" width="${w + 24}" height="26" rx="5" fill="#fbf6ea"/><rect x="${x0 - 12}" y="${top + 8}" width="${w + 24}" height="6" fill="#e4dccc"/>`
    + `<path d="M${x0 - 12} ${top + 14} V${top + 52} M${x1 + 12} ${top + 14} V${top + 52}" stroke="#fbf6ea" stroke-width="10"/>`
    + (candles ? `<g transform="translate(${x0 + 34},${top - 10}) scale(1.3)">${candle}</g><g transform="translate(${x1 - 34},${top - 10}) scale(1.3)">${candle}</g>` : '')
    + (book ? `<g transform="translate(${cx + 10},${top - 14})"><path d="M-44 0 Q-22 -14 0 -6 Q22 -14 44 0 L44 6 Q22 -6 0 2 Q-22 -6 -44 6Z" fill="#f6efe0"/><path d="M-44 6 Q-22 -6 0 2 Q22 -6 44 6 L44 10 Q22 0 0 6 Q-22 0 -44 10Z" fill="#8a2a2a"/></g>` : '') + '</g>';
};
/** The tall Easter (paschal) candle on a stand, lit. */
const paschal = (x, base, h = 520) => `<g transform="translate(${x},${base})"><ellipse cy="4" rx="46" ry="10" fill="#140c14" opacity=".3"/>`
  + '<path d="M-34 0 L-14 -40 L-12 -140 L12 -140 L14 -40 L34 0Z" fill="#8a6a3a"/><path d="M4 -140 L14 -40 L34 0 L12 0Z" fill="#5a4428" opacity=".6"/>'
  + `<rect x="-15" y="${-140 - h}" width="30" height="${h}" rx="5" fill="#fbf6ea"/><rect x="5" y="${-140 - h}" width="10" height="${h}" fill="#e4dccc"/>`
  + `<path d="M0 ${-140 - h * 0.72} v70 M-18 ${-140 - h * 0.72 + 22} h36" stroke="#c8323a" stroke-width="6" stroke-linecap="round"/>`
  + `<circle cy="${-150 - h - 16}" r="60" fill="url(#sunGlow)" opacity=".8"/><g${M.flick(0.5, 0.1, 0.65)}><path d="M-7 ${-142 - h} Q-9 ${-164 - h} 0 ${-182 - h} Q9 ${-164 - h} 7 ${-142 - h}Z" fill="#ffb040"/><path d="M-3 ${-143 - h} Q-4 ${-156 - h} 0 ${-166 - h} Q4 ${-156 - h} 3 ${-143 - h}Z" fill="#fff0b0"/></g></g>`;
/** A vase of Easter lilies on the floor. */
const lilies = (x, base, s = 1.3) => `<g transform="translate(${x},${base}) scale(${s})"><ellipse cy="3" rx="30" ry="7" fill="#140c14" opacity=".3"/>`
  + `<g transform="translate(-12,-50) rotate(-12)">${lily(0.9)}</g><g transform="translate(12,-50) rotate(14)">${lily(0.85)}</g><g transform="translate(0,-52)">${lily(1)}</g>`
  + '<path d="M-22 -60 Q-26 -20 -14 0 L14 0 Q26 -20 22 -60Z" fill="#c8a870"/><path d="M8 -60 Q22 -20 14 0 L4 0 Q12 -30 8 -60Z" fill="#a8885a" opacity=".6"/></g>';
/** A tall candle on an iron stand that can burn down (shrink: [at, dur, toScale]). */
const standCandle = (x, base, h = 300, shrink = null) => {
  const tw = shrink ? M.tw([{ at: shrink[0], dur: shrink[1], from: { scaleY: 1 }, to: { scaleY: shrink[2] }, ease: 'power1.inOut', origin: `${x} ${base - 120}` }]) : '';
  const flameY = base - 120 - h;
  const flame = `<circle cy="-10" r="56" fill="url(#sunGlow)" opacity=".8"/><g${M.flick(0.5, 0.2, 0.65)}><path d="M-6 0 Q-8 -20 0 -36 Q8 -20 6 0Z" fill="#ffb040"/><path d="M-2.6 -1 Q-3.6 -12 0 -22 Q3.6 -12 2.6 -1Z" fill="#fff0b0"/></g>`;
  const ftw = shrink ? M.tw([{ at: shrink[0], dur: shrink[1], from: { y: 0 }, to: { y: f(h * (1 - shrink[2])) }, ease: 'power1.inOut' }]) : '';
  return `<g><ellipse cx="${x}" cy="${base + 4}" rx="40" ry="9" fill="#140c14" opacity=".3"/><path d="M${x - 28} ${base} L${x - 6} ${base - 30} L${x - 5} ${base - 120} L${x + 5} ${base - 120} L${x + 6} ${base - 30} L${x + 28} ${base}Z" fill="#3a3034"/>`
    + `<ellipse cx="${x}" cy="${base - 120}" rx="22" ry="6" fill="#4a4044"/><g${tw}><rect x="${x - 12}" y="${base - 120 - h}" width="24" height="${h}" rx="4" fill="#fbf6ea"/><rect x="${x + 4}" y="${base - 120 - h}" width="8" height="${h}" fill="#e4dccc"/></g>`
    + `<g${ftw}><g transform="translate(${x},${flameY - 2})">${flame}</g></g></g>`;
};
/** A carved gold frame, like a painted panel of the saint (x0, y0, x1, y1). */
const goldFrame = (x0, y0, x1, y1) => {
  const w = x1 - x0, h = y1 - y0;
  return `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="10" fill="none" stroke="#b08a3a" stroke-width="34"/><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="10" fill="none" stroke="${GOLD}" stroke-width="22"/>`
    + `<rect x="${x0 + 16}" y="${y0 + 16}" width="${w - 32}" height="${h - 32}" rx="6" fill="none" stroke="#fff0c0" stroke-width="3" opacity=".8"/>`
    + [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="30" fill="${GOLD}"/><circle cx="${cx}" cy="${cy}" r="14" fill="#c8323a"/><circle cx="${cx - 4}" cy="${cy - 4}" r="5" fill="#ffc8c8" opacity=".7"/>`).join('');
};

// ================================================================ characters
/** A bishop's mitre with gold bands (hd body space, on the head). */
export const mitreGold = `<path d="M-31 -282 L-35 -338 Q-20 -372 0 -384 Q20 -372 35 -338 L31 -282Z" fill="#f6f0e0"/><path d="M8 -380 Q22 -368 35 -338 L31 -282 L14 -282Z" fill="#ddd0b0"/>`
  + `<path d="M-6 -382 Q0 -385 6 -382 L6 -296 L-6 -296Z" fill="${GOLD}"/><path d="M-32 -300 L32 -300 L31 -282 L-31 -282Z" fill="${GOLD}"/><path d="M-32 -300 L32 -300" stroke="#fff0c0" stroke-width="1.6" opacity=".8"/>`
  + '<circle cx="0" cy="-340" r="5" fill="#c8323a"/>';
/** The gold Y-orphrey of an old chasuble down the front (hd body space). */
const orphrey = (kneel = false) => `<path d="M-30 -207 L0 -176 L30 -207" stroke="${GOLD}" stroke-width="9" fill="none" stroke-linejoin="round"/><path d="M0 -178 V${kneel ? -100 : -24}" stroke="${GOLD}" stroke-width="11"/>`
  + `<path d="M0 -150 v18 M-7 -143 h14" stroke="#c8323a" stroke-width="4" stroke-linecap="round"/>`;
const SKC = '#efc6a2';
/** St. Conrad of Constance: a German bishop of the Welf family in Easter white and gold (alb, chasuble with a gold Y-orphrey,
 * gold-banded mitre), greying brown hair and a short beard. noble: the young Welf lord before (blue tunic, red mantle). */
export const conrad = (x, y, s, { noble = false, mitre = true, over = '', ...o } = {}) => hd(x, y, s, noble
  ? { top: '#2f4a7a', trim: GOLD, mantle: '#a8282e', lining: GOLD, belt: '#5a3a22', skin: SKC, hair: '#7a5a3e', hairStyle: 'short', beard: '#7a5a3e', beardStyle: 'short',
    age: 'young', iris: '#4a5a6a', shoes: '#4a3424', ...o, over }
  : { top: '#f6f2ea', plain: true, trim: GOLD, mantle: '#efe2c0', lining: GOLD, belt: false, skin: SKC, hair: '#8a7a6a', hairStyle: 'short', beard: '#9a8a78', beardStyle: 'short',
    age: 'mid', iris: '#4a5a6a', shoes: '#8a2a2a', ...o, over: orphrey(o.kneel) + (mitre ? mitreGold : '') + over });
const surplice = '<path d="M-40 -196 Q0 -186 40 -196 L56 -92 Q0 -76 -56 -92Z" fill="#fbf8f0"/><path d="M-56 -92 Q0 -76 56 -92" stroke="#e0d8c8" stroke-width="4" fill="none"/>'
  + '<path d="M-20 -180 Q-24 -140 -30 -98 M18 -178 Q22 -140 26 -96" stroke="#e4dccc" stroke-width="2.4" fill="none"/>';
const CAN = [['#e2b48f', '#bdb6ac', '#cfc8bc', 'old'], ['#d9a47e', '#5a3e28', '#5a3e28', 'mid']];
/** A canon of the cathedral: black cassock under a white surplice (i = 0: old, grey beard; 1: younger, dark). */
export const canon = (x, y, s, i = 0, { over = '', ...o } = {}) => { const [skin, hair, beard, age] = CAN[i % 2];
  return hd(x, y, s, { top: '#2a2630', plain: true, trim: '#1a1620', mantle: null, belt: false, skin, hair, hairStyle: 'tonsure', beard, beardStyle: i % 2 ? 'short' : 'full',
    age, iris: '#3a2a20', shoes: '#1e1a20', ...o, over: surplice + over }); };
const PEA = [['#8a6a4a', '#5a3e28', '#c48a5f', true], ['#6a7a5a', '#8a5e36', '#e2b48f', false]];
/** A poor farmer of the Lake Constance country (i = 0: a man with a beard; 1: his child, use 0.62 x scale). */
export const peasant = (x, y, s, i = 0, { over = '', ...o } = {}) => { const [top, hair, skin, man] = PEA[i % 2];
  const patch = `<rect x="14" y="-80" width="16" height="14" rx="2" fill="${dark(top, 0.2)}"/><path d="M14 -80 h16 M14 -66 h16" stroke="${light(top, 0.3)}" stroke-width="1.4" stroke-dasharray="2 3"/>`;
  return hd(x, y, s, { top, plain: true, trim: dark(top, 0.15), mantle: null, belt: '#4a3424', skin, hair, hairStyle: man ? 'curly' : 'short', beard: man ? hair : null,
    beardStyle: man ? 'short' : null, age: man ? 'mid' : 'young', iris: '#3a2a20', ...o, over: patch + over }); };

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  cHook:   { key: '#ffd8a0', from: 'l', tint: '#ffe0b8', amt: 0.1, rim: '#ffe4c0', rimOp: 0.85 },
  cLake:   { key: '#fff0d0', from: 'l', tint: '#fff4e4', amt: 0.06, rim: '#fff8e8', rimOp: 0.75 },
  cAltar:  { key: '#fff0c8', from: 'l', tint: '#fff0dc', amt: 0.07, rim: '#fff4e0', rimOp: 0.8 },
  cChoice: { key: '#ffb878', from: 'r', tint: '#e8b898', amt: 0.18, rim: '#ffc890', rimOp: 0.9 },
  cLater:  { key: '#ffd0a0', from: 'top', tint: '#a8a0c8', amt: 0.2, rim: '#ffe0b0', rimOp: 0.9 },
  cCanon:  { key: '#ffd8a0', from: 'l', tint: '#ffe0b8', amt: 0.1, rim: '#ffe4c0', rimOp: 0.85 },
  cGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `cnlit${++LID}`, d = 5;
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

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.97 ~1312, 0.95 ~1322, 0.92 ~1310,
// 0.78 ~1262, MID 0.75 ~1240-1250. The cathedral floor sits where the outdoor ground would, so the same table holds inside.
const UP = 128;   // the arm angle that lifts the chalice
const CH = 1.35;  // chalice size in body units

// 0 · SHOT "A bishop swallowed a deadly spider at Easter Mass…": inside the cathedral at Easter; Conrad lifts the chalice over the
//     altar while a spider hangs on its thread above the cup; speed lines on "spider"; one drop of wine glints on "one drop".
//     SHOT "This is Saint Conrad of Constance.": the camera travels to his face; he turns to the viewer.
const C0 = [640, 1345, 2.4];
function scene0() {
  const sp = at(0, 'deadly spider'), dr = at(0, 'one drop'), ti = at(0, 'This is'), sc = at(0, 'Saint Conrad');
  const [hx, hy] = hand(...C0, -1, UP), cupY = hy - 56 * CH * C0[2];
  const sy0 = cupY - 150, sy1 = cupY - 70;
  const sp0 = `<g${M.tw([{ at: 0.2, dur: Math.max(0.5, sp - 0.2), from: { y: 0 }, to: { y: sy1 - sy0 }, ease: 'sine.inOut' }])}>`
    + `<g transform="translate(${f(hx)},${f(sy0)})"><g${M.bob(5, 1.6)}>${thread(0, 340 - sy0, -14)}${spider(1.7)}</g></g></g>`;
  return lit(altarStone(110, 470, 1060, 1345) + lilies(70, 1345, 1.25), 'cHook')
    + lit(castShadow(...C0, 'cHook') + seq((op) => conrad(...C0, { halo: true, armL: [UP, 1.5, 3], propL: chalice2(CH), armR: [30, 2, 3], ...op }),
      [[0, { mood: 'determined', look: [-2.2, -2.2] }], [sp, { mood: 'surprised', look: [-2.4, -2.4] }], [dr - 0.2, { mood: 'determined', look: [-2, -2] }],
        [ti - 0.05, { mood: 'happy', look: [0, 0] }], [sc + 0.7, { mood: 'tender' }]]), 'cHook')
    + sp0
    + speedLines(hx, sy1, { at: sp - 0.05, dur: 0.7, r0: 120, r1: 700, op: 0.45, color: '#fff4d8', seed: 3 })
    + `<g opacity="0"${M.tw([{ at: dr, dur: 0.15, from: { opacity: 0 }, to: { opacity: 1 } }, { at: dr + 1.2, dur: 0.4, to: { opacity: 0 } }])}>`
      + `<g transform="translate(${f(hx + 30)},${f(cupY + 6)})"><circle r="26" fill="url(#sunGlow)"/><path d="M0 -9 Q6 0 5 4 A5 5 0 0 1 -5 4 Q-6 0 0 -9Z" fill="#a8243a"/><circle cx="-1.5" cy="1" r="1.4" fill="#fff"/></g></g>`
    + NEAR(bokeh(6, { seed: 14, op: [0.18, 0.4] }));
}

// 1 · SHOT "Born into the powerful Welf family, Conrad became the bishop of Constance.": the lake shore, the cathedral town across
//     the water, the Alps beyond; young Conrad, a Welf lord in blue and red, walks in; on "bishop" he is in mitre and white with
//     the crozier (an instant swap with a squash and sparkles).
//     SHOT "He gave his family lands to his church and to the poor.": he holds out the deed; a poor farmer and his child kneel and
//     their faces light up on "poor".
const C1 = [400, 1345, 2.35], P1 = [700, 1312, 2.15], K1 = [835, 1312, 1.36];
function scene1() {
  const bi = at(1, 'became the bishop'), gv = at(1, 'He gave'), po = at(1, 'the poor');
  return lit(castShadow(...C1, 'cLake') + walk(0.1, 1.3, -400, `<g${squash(bi + 0.1, C1[0], C1[1], 0.08)}>` + seq((op) => conrad(...C1, op),
    [[0, { noble: true, mood: 'happy', look: [1.6, 0], armL: [14, 2, 3], armR: [14, 2, 3] }],
      [bi + 0.1, { mood: 'happy', look: [0, 0], armL: [16, 2, 3], armR: [30, 2, 3], propR: crozier }],
      [gv + 0.1, { mood: 'tender', look: [2.4, 0.4], armL: [16, 2, 3], armR: [30, 2, 3], propR: crozier }],
      [gv + 0.5, { mood: 'happy', look: [2.4, 0.6], armR: [72, 2, 3], propR: scroll(1.2), armL: [16, 2, 3], propL: crozier }]]) + '</g>'), 'cLake')
    + `<g opacity="0"${fadeIn(bi + 0.1, 0.3)}>${sparkles(14, C1[0] - 200, C1[0] + 200, 520, 1000, { seed: 5 })}</g>`
    + speedLines(C1[0], 760, { at: bi + 0.05, dur: 0.6, r0: 220, r1: 900, op: 0.35, color: '#ffffff', seed: 6 })
    + layer(0.97, lit(castShadow(...P1, 'cLake') + seq((op) => peasant(...P1, 0, { flip: true, ...op }),
      [[0, { mood: 'sad', look: [2.2, 0.8], armL: [10, 2, 3], armR: [10, 2, 3] }], [gv + 0.6, { mood: 'surprised', kneel: true, look: [2.4, -1], armL: [10, 2, 3], armR: [70, 2, 3] }],
        [po, { mood: 'joy', kneel: true, look: [2.4, -1], armL: [40, 2, 3], armR: [70, 2, 3] }]])
      + castShadow(...K1, 'cLake') + seq((op) => peasant(...K1, 1, { flip: true, ...op }),
      [[0, { mood: 'worried', look: [2.4, 0], armL: [10, 2, 3], armR: [20, 2, 3] }], [po + 0.1, { mood: 'joy', look: [2.4, -1], armL: [130, 4, 1.4], armR: [130, 4, 1.6] }]]), 'cLake'))
    + `<g opacity="0"${fadeIn(po, 0.4)}>${sparkles(10, 600, 880, 840, 1100, { seed: 8 })}</g>`
    + NEAR(foliage('l', 1660, { color: '#3e5a2a', seed: 4 }));
}

// 2 · SHOT "One Easter morning, Conrad lifted the chalice at the altar.": Easter morning in the cathedral: lilies, the paschal
//     candle, an altar boy kneeling; Conrad lifts the chalice on "lifted", looking up.
//     SHOT "Then a spider dropped straight into the wine.": a spider falls from the roof with streaks, lands in the cup with a
//     splash (squash, a small shake); a snap zoom onto the cup; Conrad and the boy are startled.
const C2 = [580, 1345, 2.4], B2 = [800, 1312, 1.46];
function scene2() {
  const li = at(2, 'lifted'), dp = at(2, 'dropped'), wi = at(2, 'into the wine');
  const [hx, hy] = hand(...C2, -1, UP), cupY = hy - 56 * CH * C2[2], land = dp + 0.35;
  return lit(altarStone(90, 430, 1060, 1345) + paschal(500, 1290, 380) + lilies(60, 1345, 1.25), 'cAltar')
    + layer(0.97, lit(castShadow(...B2, 'cAltar') + seq((op) => altarBoy(...B2, { flip: true, kneel: true, ...PRAY, ...op }),
      [[0, { mood: 'peaceful' }], [land, { mood: 'surprised', look: [2.4, -2] }]]), 'cAltar'))
    + lit(castShadow(...C2, 'cAltar') + seq((op) => conrad(...C2, { armR: [24, 2, 3], ...op }),
      [[0, { mood: 'peaceful', armL: [44, 2, 3], propL: chalice2(CH) }], [li, { mood: 'awe', look: [-1.6, -2.4], armL: [UP, 1.5, 3], propL: chalice2(CH) }],
        [land, { mood: 'surprised', look: [-2.4, -2.4], armL: [UP, 0, 3], propL: chalice2(CH, { spider: true }) }]]), 'cAltar')
    // the falling spider (hidden once it lands in the cup)
    + `<g opacity="0"${M.tw([{ at: dp - 0.05, dur: 0.02, from: { opacity: 0 }, to: { opacity: 1 } }, { at: land, dur: 0.02, to: { opacity: 0 } }])}>`
      + `<g${M.tw([{ at: dp - 0.05, dur: 0.4, from: { y: f(330 - cupY) }, to: { y: 0 }, ease: 'power2.in' }])}><g transform="translate(${f(hx + 4)},${f(cupY - 66)})">${spider(1.5, { still: true })}</g></g></g>`
    + streaks(hx, 420, hx, cupY - 60, { at: dp, dur: 0.45, n: 5, spread: 30, color: '#fff4d8', op: 0.7 })
    + speedLines(hx, cupY - 40, { at: land, dur: 0.6, r0: 110, r1: 620, op: 0.45, color: '#fff4d8', seed: 7 })
    + `<g opacity="0"${fadeIn(land, 0.08)}>${sparkles(10, hx - 70, hx + 70, cupY - 110, cupY - 20, { seed: 11 })}</g>`
    + NEAR(bokeh(6, { seed: 22, op: [0.2, 0.42] }));
}

// 3 · SHOT "Back then, people believed one spider could kill a man.": closer; Conrad looks into the cup (worried: the human beat);
//     an old canon beside him sweats. SHOT "He could have fished it out and burned it.": a jump cut to the canon, who points at the
//     cup and holds up a candle. SHOT "But to Conrad, this was now the Blood of Christ.": a low hero angle; light pours onto the
//     cup; Conrad looks up, then resolved. SHOT "He drank it all.": he lifts the cup to his lips, eyes closed; the canon gapes.
const C3 = [340, 1345, 2.5], N3 = [820, 1312, 2.25], A3 = 40;
function scene3() {
  const fi = at(3, 'fished'), bu = at(3, 'But to Conrad'), bl = at(3, 'Blood of Christ'), dk = at(3, 'He drank');
  const [hx, hy] = hand(...C3, 1, A3);
  return lit(altarStone(-120, 150, 1080, 1345, { book: false }), 'cChoice')
    + layer(0.97, lit(castShadow(...N3, 'cChoice') + seq((op) => canon(...N3, 0, { flip: true, ...op }),
      [[0, { mood: 'worried', look: [2.6, 0.6], armL: [14, 2, 3], armR: [14, 2, 3] }], [fi, { mood: 'worried', look: [2.6, 0.4], armR: [100, 2, 3], propR: candle, armL: [14, 2, 3] }],
        [bu, { mood: 'surprised', look: [2.6, -0.6], armL: [16, 2, 3], armR: [16, 2, 3] }], [dk + 0.2, { mood: 'surprised', look: [2.6, -1.4], armL: [100, 3, 1.4], armR: [16, 2, 3] }]]), 'cChoice')
      + sweat(...N3, 0.25, { dur: 2.2, side: 1 }) + sweat(...N3, dk + 0.4, { dur: 1.6, side: 1 }))
    + `<g opacity="0"${M.tw([{ at: bu, dur: 0.6, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(hx - 90, hx + 90, hx - 220, hx + 220, 1360, 0.6)}${glow(hx, hy - 90, 260, 0.6)}</g>`
    + lit(castShadow(...C3, 'cChoice') + `<g${squash(dk + 0.1, C3[0], C3[1], 0.06)}>` + seq((op) => conrad(...C3, { armL: [20, 2, 3], ...op }),
      [[0, { mood: 'worried', look: [2.4, 1.6], armR: [A3, 1, 3], propR: chalice2(CH, { spider: true }) }],
        [fi + 0.2, { mood: 'worried', look: [2.8, 0.2], armR: [A3, 1, 3], propR: chalice2(CH, { spider: true }) }],
        [bu, { mood: 'awe', look: [1.4, -2.4], armR: [A3, 1, 3], propR: chalice2(CH, { spider: true, holy: true, glowOp: 1 }) }],
        [bl + 0.4, { mood: 'determined', look: [2.2, 0.6], armR: [A3, 1, 3], propR: chalice2(CH, { spider: true, holy: true, glowOp: 1 }) }],
        [dk, { mood: 'peaceful', armR: [150, 0, 3], propR: `<g transform="translate(-6,22)">${chalice2(CH, { wine: false, tilt: -118, glowOp: 0.9 })}</g>` }]]) + '</g>', 'cChoice');
}

// 4 · SHOT "By the beliefs of his day, he had swallowed poison.": dusk in the cathedral; two canons watch him, worried and
//     sweating; Conrad stands calm in prayer by a tall candle. SHOT "Hours later, the spider came back out.": the candle burns down;
//     the spider pops out (speed lines), hops to the floor and scurries off past the startled canon; Conrad is surprised.
//     SHOT the climax line: a burst of gold light behind him, the halo fades in, everyone rejoices.
const C4 = [470, 1345, 2.4], NA = [810, 1312, 2.15], NB = [150, 1322, 2.1];
function scene4() {
  const ho = at(4, 'Hours later'), ca = at(4, 'came back out'), no = at(4, 'not harmed');
  const [fx, fy] = face(...C4), mouthY = fy + 30 * C4[2];
  const hop = `<g opacity="0"${M.tw([{ at: ca, dur: 0.02, from: { opacity: 0 }, to: { opacity: 1 } }, { at: ca + 2.6, dur: 0.2, to: { opacity: 0 } }])}>`
    + `<g${M.tw([{ at: ca, dur: 0.25, from: { x: 0, y: 0, scale: 0.2 }, to: { x: 30, y: -40, scale: 1 }, ease: 'back.out(2)', origin: `${fx} ${mouthY}` },
      { at: ca + 0.3, dur: 0.55, to: { x: 210, y: f(1335 - mouthY) }, ease: 'power2.in' }, { at: ca + 0.9, dur: 1.6, to: { x: 820, y: f(1335 - mouthY) }, ease: 'none' }])}>`
    + `<g transform="translate(${fx},${f(mouthY)})">${spider(1.1)}</g></g></g>`;
  return lit(standCandle(700, 1300, 260, [ho - 0.1, 1.6, 0.35]), 'cLater')
    + layer(0.95, lit(castShadow(...NB, 'cLater') + seq((op) => canon(...NB, 1, op),
      [[0, { mood: 'worried', look: [2.4, 0.4], armL: [14, 2, 3], armR: [14, 2, 3] }], [no, { mood: 'joy', look: [2.4, -0.6], armL: [130, 4, 1.4], armR: [130, 4, 1.6] }]]), 'cLater')
      + sweat(...NB, 0.4, { dur: 2, side: -1 }))
    + layer(0.97, lit(castShadow(...NA, 'cLater') + seq((op) => canon(...NA, 0, { flip: true, ...op }),
      [[0, { mood: 'worried', look: [2.6, 0.4], armL: [14, 2, 3], armR: [14, 2, 3] }], [ca + 1.2, { mood: 'surprised', look: [1, 2.4], armL: [70, 3, 1.4], armR: [70, 3, 1.6] }],
        [no, { mood: 'joy', look: [2.6, -0.6], armL: [130, 4, 1.4], armR: [130, 4, 1.6] }]]), 'cLater')
      + sweat(...NA, 0.5, { dur: 2, side: 1 }))
    + burst(C4[0], fy - 40, 520, no) + `<g opacity="0"${fadeIn(no, 0.5)}>${glow(C4[0], fy - 20, 420, 0.55)}${sparkles(18, 200, 880, 520, 1200, { seed: 41 })}</g>`
    + lit(castShadow(...C4, 'cLater') + seq((op) => conrad(...C4, op),
      [[0, { mood: 'peaceful', ...PRAY }], [ca - 0.05, { mood: 'surprised', look: [1.6, 1.4], armL: [20, 2, 3], armR: [40, 2, 3] }],
        [ca + 1.0, { mood: 'happy', look: [2.6, 2.4], armL: [20, 2, 3], armR: [40, 2, 3] }], [no, { mood: 'joy', halo: no + 0.1, armL: [120, 3, 2], armR: [120, 3, 2.2] }]]), 'cLater')
    + hop + speedLines(fx, mouthY, { at: ca, dur: 0.5, r0: 80, r1: 500, op: 0.4, color: '#fff4d8', seed: 12 });
}

// 5 · SHOT "The Church later named him a saint, and artists still paint him with a chalice and a spider.": gold light over the lake;
//     the halo and sparkles on "saint"; on "artists" a carved gold frame closes around him: he stands as in the old paintings,
//     crozier and chalice, the spider on its rim. SHOT the quotable line: the frame lifts away; light on the cup; he smiles at it.
const C5 = [520, 1345, 2.45];
const iconChalice = (holy = false) => `<g>${chalice2(CH, { holy, glowOp: holy ? 1 : 0.7 })}<g transform="translate(${f(20 * CH)},${f(-62 * CH)}) rotate(18)">${spider(0.75)}</g></g>`;
function scene5() {
  const sa = at(5, 'a saint'), ar = at(5, 'artists'), tr = at(5, 'He trusted'), cu = at(5, 'in the cup');
  return `<g opacity="0"${fadeIn(sa, 0.5)}>${glow(C5[0], 760, 380, 0.5)}${sparkles(16, 260, 820, 460, 1000, { seed: 51 })}</g>`
    + lit(castShadow(...C5, 'cCanon') + seq((op) => conrad(...C5, { armR: [30, 2, 3], propR: crozier, armL: [62, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [0, 0], propL: iconChalice() }], [sa, { mood: 'happy', halo: sa, look: [0, -0.6], propL: iconChalice() }],
        [tr, { mood: 'tender', halo: true, look: [-2.6, 1.2], propL: iconChalice(true) }], [cu + 1.4, { mood: 'happy', halo: true, look: [0, 0], propL: iconChalice(true) }]]), 'cCanon')
    + `<g opacity="0"${M.tw([{ at: ar, dur: 0.45, from: { opacity: 0, scale: 1.35 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(1.6)', origin: '520 900' }, { at: tr - 0.1, dur: 0.4, to: { opacity: 0, scale: 1.2 } }])}>`
      + goldFrame(200, 430, 840, 1400) + '</g>'
    + NEAR(bokeh(7, { seed: 61, op: [0.2, 0.45] }));
}

// 6 · SHOT "His feast day is November 26.": sunset over Lake Constance, the cathedral windows lit; Conrad with the chalice and the
//     spider. SHOT "Saint Conrad of Constance, pray for us.": the camera comes closer; he lifts his hand in blessing, tender.
const C6 = [520, 1345, 2.45];
function scene6() {
  const nv = at(6, 'November'), pr = at(6, 'Saint Conrad');
  return lit(castShadow(...C6, 'cGlory') + seq((op) => conrad(...C6, { halo: true, armL: [62, 2, 3], propL: iconChalice(true), ...op }),
      [[0, { mood: 'happy', look: [0, 0], armR: [30, 2, 3], propR: crozier }], [nv, { mood: 'happy', look: [-1.6, 0.6], armR: [30, 2, 3], propR: crozier }],
        [pr, { mood: 'tender', armR: [124, 2, 3] }]]), 'cGlory')
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(520, 740, 240, 0.45)}${sparkles(8, 400, 660, 660, 820, { seed: 35 })}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 520, 900, { seed: 29 })}</g>`
    + NEAR(bokeh(7, { seed: 47 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };   // the path does the travelling (cam.path)
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
const cup0 = (() => { const [hx, hy] = hand(...C0, -1, UP); return [Math.round(hx), Math.round(hy - 40 * CH * C0[2])]; })();
const cup2 = (() => { const [hx, hy] = hand(...C2, -1, UP); return [Math.round(hx), Math.round(hy - 40 * CH * C2[2])]; })();
const cup3 = (() => { const [hx, hy] = hand(...C3, 1, A3); return [Math.round(hx), Math.round(hy - 40 * CH * C3[2])]; })();
export const STORY = {
  slug: SLUG, name: 'St_Conrad_of_Constance_Spider_in_the_Chalice',
  bg3d: './conrad_spider_chalice.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },   // no hand-held sway (Ricks Clips motion standard)
  video: { bitrate: 14e6, mode: 'constant' },   // sharp cuts: constant bitrate + a keyframe on every cut (fastrender.mjs)
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  music: { story: 'a 10th-century bishop at Easter Mass in Constance cathedral who drank a spider fallen into the chalice rather than spill the consecrated wine, and was unharmed',
    color: 'medieval Germany, a Romanesque cathedral: Gregorian-style wordless chant, warm pipe organ, harp and low strings, soft timpani',
    cues: { 3: 'Tense and hushed: low strings and a ticking pizzicato, a held breath; a soft rise of choir on "the Blood of Christ".', 4: 'Quiet suspense under the dusk, then a bright release of choir and organ on the last line.' } },
  thumb_hook: 'He drank the spider', thumb_title: 'St. Conrad of Constance', thumb_scene: 0, thumb_t: 3, thumb_shift: 20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: { 'twˈɛnti sˈɪks': 'twˈɛnti sˈɪksθ' },   // November 26 -> November twenty-sixth
  scenes: [
    // Camera paths (cam.path): in each scene the camera travels through the 3D set from subject to subject, arriving on the word
    // that names each one (truck, push, crane; eased, no sway, no roll, ends at rest); scene changes are the cuts.
    { kicker: 'EASTER · CONSTANCE CATHEDRAL', title: 'A Spider in the Chalice', art: scene0, bg3d: 'cHook', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(0, 'deadly spider', 0.3), to: cup0, z: 1.22, frame: [470, 860] },
        { at: at(0, 'Saint Conrad'), to: face(...C0), z: 1.42, frame: [520, 820] }] },
      tone: HOOK,
      say: ['A bishop swallowed a deadly spider at Easter Mass rather than pour out one drop.', 'This is Saint Conrad of Constance.'] },
    { kicker: '934 · LAKE CONSTANCE', title: 'A Bishop by the Lake', art: scene1, bg3d: 'cLake', front3d: true,
      cam: { ...GLIDE, drone: { h: 8, back: 12, dur: 2.6 }, path: [
        { at: at(1, 'bishop'), to: face(...C1), z: 1.28, frame: [500, 840] },
        { at: at(1, 'the poor'), to: [640, 980], z: 1.08, frame: [540, 960] }] },
      tone: HOOK,
      say: ['Born into the powerful Welf family, Conrad became the bishop of Constance.', 'He gave his family lands to his church and to the poor.'] },
    { kicker: 'EASTER SUNDAY · THE ALTAR', title: 'Easter Morning', art: scene2, bg3d: 'cAltar', front3d: true,
      cam: { ...GLIDE, shake: { at: at(2, 'dropped', 0.38), amt: 10, dur: 0.5 }, zoom: { at: at(2, 'into the wine'), to: cup2, style: 'snap', z: 1.5, center: 0.4 }, path: [
        { at: at(2, 'lifted', 0.4), to: [Math.round((cup2[0] + C2[0]) / 2), cup2[1] + 60], z: 1.15, frame: [520, 880] }] },
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['One Easter morning, Conrad lifted the chalice at the altar.', 'Then a spider dropped straight into the wine.'] },
    { kicker: 'ONE SPIDER · ONE CHOICE', title: 'Lift It Out?', art: scene3, bg3d: 'cChoice', front3d: true,
      cam: { ...GLIDE, hero: { h: 2.2, at: at(3, 'But to Conrad'), dur: 0.9 },
        zoom: { at: at(3, 'fished'), to: face(...N3), depth: 0.97, style: 'cut', z: 1.45, hold: 1.7, center: 0.5 }, path: [
        { at: at(3, 'Back then', 0.6), to: cup3, z: 1.18, frame: [560, 900] },
        { at: at(3, 'Blood of Christ'), to: [Math.round((cup3[0] + C3[0]) / 2), cup3[1] - 40], z: 1.12, frame: [540, 900] },
        { at: at(3, 'He drank'), to: face(...C3), z: 1.32, frame: [500, 840] }] },
      tone: STAND,
      say: ['Back then, people believed one spider could kill a man.', 'He could have fished it out and burned it.', 'But to Conrad, this was now the Blood of Christ.', 'He drank it all.'] },
    { kicker: 'HOURS LATER', title: 'Not Even Harmed', art: scene4, bg3d: 'cLater', front3d: true,
      cam: { ...GLIDE, shake: { at: at(4, 'not harmed'), amt: 12, dur: 0.6 }, zoom: { at: at(4, 'came back out', -0.1), to: face(...C4), style: 'smooth', z: 1.35, hold: 0.9, center: 0.4 }, path: [
        { at: at(4, 'Hours later'), to: [600, 1000], z: 1.08, frame: [540, 960] },
        { at: at(4, 'not harmed'), to: face(...C4), z: 1.2, frame: [520, 860] }] },
      tone: { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['By the beliefs of his day, he had swallowed poison.', 'Hours later, the spider came back out.', { text: 'And Conrad was not harmed at all.', speed: 0.85 }] },
    { kicker: '1123 · CANONIZED IN ROME', title: 'The Spider Saint', art: scene5, bg3d: 'cCanon', front3d: true,
      cam: { ...GLIDE, whip: 'r', path: [
        { at: at(5, 'artists'), to: [520, 900], z: 0.96, frame: [540, 900] },
        { at: at(5, 'in the cup'), to: [Math.round(hand(...C5, -1, 62)[0]) + 60, Math.round(hand(...C5, -1, 62)[1]) - 60], z: 1.3, frame: [500, 900] }] },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['The Church later named him a saint, and artists still paint him with a chalice and a spider.', 'He trusted Christ in the cup more than he feared the spider.'] },
    { kicker: 'FEAST DAY · NOVEMBER 26', title: 'Saint Conrad', art: scene6, bg3d: 'cGlory', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(6, 'Saint Conrad', 0.8), to: face(...C6), z: 1.35, frame: [540, 820] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 26.', 'Saint Conrad of Constance, pray for us.'] },
  ],
};
