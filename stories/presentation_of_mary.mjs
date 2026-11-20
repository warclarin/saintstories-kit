// The Presentation of the Blessed Virgin Mary (one story: Joachim and Anne bring the three-year-old Mary to the Temple).
// Feast: November 21 (memorial; also Pro Orantibus Day, instituted by Pius XII in 1953 for cloistered religious).
// Told as tradition: the story is not in the Bible but in the Protoevangelium of James (2nd century; tr. A. Walker, Ante-Nicene
// Fathers vol. 8, newadvent.org/fathers/0847.htm): ch. 4 Anne's vow "if I beget either male or female, I will bring it as a
// gift to the Lord my God"; ch. 6 the child walks seven steps at six months, and Anne says she shall not walk on the earth until
// brought into the temple; ch. 7 at two Joachim wants to go up, Anne asks to wait for the third year "that the child may not
// seek for father or mother"; at three the undefiled daughters of the Hebrews go before her with lamps; the priest receives
// her, kisses and blesses her: "The Lord has magnified your name in all generations"; he sets her on the third step of the
// altar, she dances with her feet, and all the house of Israel loves her; ch. 8 her parents go down marvelling that the child
// had not turned back; she lives in the temple like a dove and is fed by an angel. Feast history (Wikipedia, Franciscan
// Media): kept in Jerusalem by the 6th century (New Church of the Theotokos, 543), Avignon 1372 (Gregory XI), suppressed 1568
// (Pius V), restored 1585 (Sixtus V). Franciscan Media: "She herself became a greater temple than any made by hands."
// All-3D backgrounds (presentation_of_mary.bg3d.js, jerusalem3d(mode)); cam3d; characters use the detailed rig hd().
// Exported for later reels: maryChild, anne, joachim, templePriest, maiden, handLamp, templeSteps, dove, laurel, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, lily, dark, light, f, rng, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { bird } from './francis.mjs';
import { clare } from './agnes_of_assisi_too_heavy.mjs';

const at = wordTimes('presentation_of_mary');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);

// ================================================================ props
/** A small clay oil lamp held in the hand, with a flame and a warm glow (hand at 0,0). lit: true | fade-in time. */
export const handLamp = (lit = true, s = 1) => {
  const fl = typeof lit === 'number' ? ` opacity="0"${fadeIn(lit, 0.6)}` : '';
  return `<g transform="scale(${s})"><path d="M-26 -2 Q0 16 26 -2 Q20 -12 -20 -12Z" fill="#b8763a"/><path d="M6 -10 Q20 -10 26 -2 Q18 10 4 12Z" fill="#8a5228" opacity=".7"/>`
    + `<ellipse cx="0" cy="-11" rx="12" ry="3.5" fill="#6a3e1e"/><path d="M22 -8 Q32 -12 34 -6 Q30 -2 24 -2Z" fill="#a8682e"/>`
    + `<g${fl}><circle cx="32" cy="-22" r="64" fill="url(#sunGlow)" opacity=".75"${M.flick(1.4, 0.3, 0.75)}/>`
    + `<g${M.pulse(0.14, 0.45, 0, 32, -12)}><path d="M32 -12 Q22 -24 31 -42 Q34 -30 38 -32 Q42 -20 32 -12Z" fill="#ffb04a"/><path d="M32 -14 Q27 -21 31 -31 Q34 -24 35 -25 Q37 -19 32 -14Z" fill="#fff2c0"/></g></g></g>`;
};
/** Frontal stone steps (base at x, y; n steps, widest at the bottom). Step k (1-based) has its tread at y - k * sh. */
export const templeSteps = (x, y, { n = 6, w0 = 1100, dw = 60, sh = 34, c = '#eadcc0', glowTop = false } = {}) => {
  let s = '';
  for (let k = n - 1; k >= 0; k--) {
    const w = w0 - k * dw, top = y - (k + 1) * sh, x0 = x - w / 2;
    s += `<rect x="${f(x0)}" y="${f(top + 8)}" width="${f(w)}" height="${sh - 8}" fill="${dark(c, 0.12 + k * 0.01)}"/>`
      + `<rect x="${f(x0 + w * 0.72)}" y="${f(top + 8)}" width="${f(w * 0.28)}" height="${sh - 8}" fill="${dark(c, 0.3)}" opacity=".35"/>`
      + `<rect x="${f(x0 - 4)}" y="${f(top)}" width="${f(w + 8)}" height="9" rx="2" fill="${light(c, 0.18)}"/>`
      + `<path d="M${f(x0 + 40)} ${f(top + 20)} h${f(w * 0.2)} M${f(x0 + w * 0.45)} ${f(top + 24)} h${f(w * 0.16)}" stroke="${dark(c, 0.22)}" stroke-width="2" opacity=".45"/>`;
  }
  return `<g>${glowTop ? glow(x, y - n * sh, 260, 0.45) : ''}${s}</g>`;
};
/** A white dove, wings flapping, facing right (centre at 0,0). */
export const dove = (s = 1) => `<g transform="scale(${s})"><circle r="90" fill="url(#haloGlow)" opacity=".8"/>`
  + `<g${M.flap(0.42)}><path d="M-6 -6 Q-40 -64 -92 -58 Q-62 -30 -36 -8Z" fill="#f4f2ee"/><path d="M-12 -10 Q-46 -48 -80 -50" stroke="#d8d4cc" stroke-width="3" fill="none"/></g>`
  + `<ellipse cx="0" cy="0" rx="40" ry="18" fill="#fbfaf6"/><path d="M-36 -2 L-70 -16 L-66 10Z" fill="#f0eee8"/><circle cx="34" cy="-10" r="14" fill="#fbfaf6"/>`
  + `<path d="M46 -10 L58 -6 L46 -4Z" fill="#e8a24a"/><circle cx="37" cy="-13" r="2.4" fill="#2b1d14"/>`
  + `<g${M.flap(0.42, 0.1)}><path d="M6 -6 Q-10 -70 -54 -84 Q-36 -40 -14 -8Z" fill="#ffffff"/></g></g>`;
/** A laurel tree with a sparrows' nest (Anne's tree in the Protoevangelium). Base at x, y. nestAt: pop-in time or null. */
export const laurel = (x, y, s = 1, nestAt = null) => {
  const r = rng(77);
  let leaves = '';
  for (let k = 0; k < 26; k++) leaves += `<circle cx="${f((r() - 0.5) * 360)}" cy="${f(-470 - r() * 260)}" r="${f(50 + r() * 40)}" fill="${['#2e4e34', '#3e6440', '#4e7648'][k % 3]}"/>`;
  for (let k = 0; k < 12; k++) leaves += `<circle cx="${f((r() - 0.5) * 300)}" cy="${f(-560 - r() * 200)}" r="${f(20 + r() * 18)}" fill="#6a9a5a" opacity=".85"/>`;
  const nest = `<g><path d="M-46 0 Q0 30 46 0 Q30 -14 -30 -14Z" fill="#7a5a34"/><path d="M-40 -4 Q0 18 40 -4" stroke="#5a3e22" stroke-width="3" fill="none"/>`
    + `<g transform="translate(-16,-14)">${bird('#8a6a4a', 0.7)}</g><g transform="translate(18,-16)">${bird('#9a7a52', 0.6, true)}</g></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="6" rx="150" ry="18" fill="#1a0f1a" opacity=".22"/>`
    + `<path d="M-30 0 Q-20 -200 -40 -420 L40 -420 Q22 -200 34 0Z" fill="#6a4a32"/><path d="M8 -420 Q22 -200 34 0 L14 0 Q4 -200 -4 -420Z" fill="#4a3424" opacity=".6"/>`
    + `<path d="M-30 -380 Q-120 -440 -150 -520 M30 -400 Q110 -450 140 -540" stroke="#6a4a32" stroke-width="20" fill="none" stroke-linecap="round"/>`
    + `<g${M.sway(0.6, 6, 0, 0, -420)}>${leaves}</g>`
    + (nestAt == null ? '' : `<g transform="translate(-118,-500)"><g opacity="0"${M.tw([{ at: nestAt, dur: 0.6, from: { opacity: 0, scale: 0.5 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${nest}</g></g>`) + '</g>';
};
// the high priest's breastplate (twelve stones in gold) and turban with a gold plate (body space)
const STONES = ['#c8323a', '#e8b84a', '#3a8a5a', '#3a5aa8', '#8a3aa8', '#e6e2d8', '#d8862e', '#4aa8a8', '#a83a6a', '#5a8a2e', '#2e4a8a', '#c89a5a'];
const breastplate = `<g><rect x="-26" y="-196" width="52" height="64" rx="5" fill="${GOLD}"/><rect x="-26" y="-196" width="52" height="64" rx="5" fill="none" stroke="#c8963e" stroke-width="2.5"/>`
  + STONES.map((c, i) => `<rect x="${-20 + (i % 3) * 14}" y="${-190 + Math.floor(i / 3) * 14.5}" width="11" height="11" rx="2.5" fill="${c}"/>`).join('')
  + `<path d="M-26 -196 L-34 -212 M26 -196 L34 -212" stroke="${GOLD}" stroke-width="4"/></g>`;
const turban = `<g><path d="M-45 -262 Q-52 -326 0 -330 Q52 -326 45 -262 Q0 -278 -45 -262Z" fill="#f6f2ea"/>`
  + `<path d="M-44 -276 Q0 -290 44 -276 M-46 -294 Q0 -308 46 -294 M-38 -312 Q0 -322 38 -312" stroke="#d8d0c0" stroke-width="3" fill="none"/>`
  + `<rect x="-17" y="-290" width="34" height="11" rx="2" fill="${GOLD}"/><path d="M-17 -284 H-40 M17 -284 H40" stroke="#3a5aa8" stroke-width="3"/></g>`;
const bells = `<g>${[-48, -30, -12, 6, 24, 42].map((x, i) => `<circle cx="${x}" cy="-4" r="4.5" fill="${i % 2 ? GOLD : '#c8323a'}"/>`).join('')}</g>`;
// a gold headband for little Mary
const circlet = `<path d="M-40 -266 Q0 -282 40 -266" stroke="${GOLD}" stroke-width="4" fill="none"/><circle cx="0" cy="-276" r="4" fill="#fff4cc"/>`;

// ================================================================ characters
const SKM = '#efc6a2', HAIRM = '#5a3a24';
/** The Virgin Mary as a little girl: white dress, blue mantle with gold lining, long dark hair with a thin gold band, halo. */
export const maryChild = (x, y, s, { over = '', dance = false, ...o } = {}) => {
  const fig = hd(x, y, s, { top: '#f6f1e6', mantle: '#3f6fb8', lining: '#f2c46b', trim: '#e2b45a', skin: SKM, hair: HAIRM, hairStyle: 'long', beard: null,
    age: 'young', iris: '#5a3a24', belt: '#7aa0d8', shoes: '#c8a070', halo: true, ...o, over: circlet + over });
  return dance ? `<g${M.sway(5, 1.1, 0, x, y)}>${fig}</g>` : fig;
};
/** St. Anne: red tunic, green mantle, cream veil. */
export const anne = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#b0343e', mantle: '#3e6e4e', lining: '#f2c46b', veil: '#f2ead8', trim: GOLD,
  skin: '#e6b894', hair: '#5a3a24', beard: null, age: 'mid', iris: '#4a3020', belt: '#c8963e', shoes: '#6a4428', ...o, over });
/** St. Joachim: blue-violet tunic, ochre mantle, white hair and long beard, a shepherd's staff. */
export const joachim = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#5a5a8a', mantle: '#b8863e', lining: '#f2dca0', trim: '#e2b45a',
  skin: '#e0b08a', hair: '#e2dcd2', beard: '#e2dcd2', beardStyle: 'long', age: 'old', iris: '#4a3a2a', belt: '#7a5434', shoes: '#5a3a22', ...o, over });
/** The priest of the Temple: blue robe with bells and pomegranates at the hem, breastplate of twelve stones, white turban. */
export const templePriest = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#2f4f9a', mantle: null, trim: GOLD, belt: '#c8963e',
  skin: '#e2b48f', hair: '#e8e2d8', beard: '#e8e2d8', beardStyle: 'long', age: 'old', iris: '#4a3a2a', shoes: '#8a6a4a', ...o, over: bells + breastplate + turban + over });
const MAIDS = [['#e8a0b0', '#f8ecec'], ['#a8c8e8', '#f0f4fa'], ['#f0d080', '#fbf4e0'], ['#b8d8a8', '#f2f8ee']];
/** A young daughter of Jerusalem in a pastel dress and veil, carrying a lamp (i picks the colours). */
export const maiden = (x, y, s, i = 0, { over = '', ...o } = {}) => hd(x, y, s, { top: MAIDS[i % 4][0], veil: MAIDS[i % 4][1], mantle: null, trim: light(MAIDS[i % 4][0], 0.3),
  skin: ['#efc6a2', '#e2b48f', '#d9a47e', '#f0caa8'][i % 4], beard: null, age: 'young', belt: dark(MAIDS[i % 4][0], 0.25), iris: '#4a3020', shoes: '#8a6a4a',
  armR: 38, propR: handLamp(true), ...o, over });
const monk = (x, y, s, o = {}) => hd(x, y, s, { top: '#26222a', plain: true, belt: false, trim: '#3a343e', skin: '#e2b48f', hair: '#6a5a4a', hairStyle: 'tonsure',
  beard: null, age: 'mid', iris: '#3a2a1e', ...o });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  hook:  { key: '#ffe0a8', from: 'l', tint: '#ffe4c0', amt: 0.1, rim: '#fff0d0', rimOp: 0.8 },
  home:  { key: '#ffb880', from: 'r', tint: '#ffc8a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
  wait:  { key: '#fff0c8', from: 'l', tint: '#fff0dc', amt: 0.06, rim: '#fff6e0', rimOp: 0.65 },
  climb: { key: '#fff0c8', from: 'r', tint: '#fff0dc', amt: 0.07, rim: '#fff6e0', rimOp: 0.7 },
  altar: { key: '#ffc888', from: 'back', tint: '#ffd8b0', amt: 0.12, rim: '#ffe0a8', rimOp: 0.9 },
  dusk:  { key: '#ffc898', from: 'back', tint: '#c8aec8', amt: 0.16, rim: '#ffd8b0', rimOp: 0.85 },
  glory: { key: '#ffb880', from: 'r', tint: '#ffc8a8', amt: 0.12, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
/** Light SVG characters and props like the 3D set: a colour wash plus a rim light on the edges facing the light. */
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `plit${++LID}`, d = 5;
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
// cam3d: the character plane (depth 1) is 20 units away; feet on the 3D ground: depth 1 ~1345, 0.97 ~1312, 0.95 ~1322,
// 0.92 ~1310, 0.78 ~1262, MID 0.75 ~1245. Steps are SVG cards on the character plane (tread k at 1345 - 34 k).
const SH = 34;
// 0 · hook: little Mary on the Temple steps between two lamp-bearers, the sanctuary behind (push-fast)
function scene0() {
  const g = at(0, 'gave her'), cl = at(0, 'climbed'), nb = at(0, 'never looked'), ti = at(0, 'This is'), vm = at(0, 'Virgin Mary');
  const MX = 540, MY = 1345 - 4 * SH + 4;
  const Mary = (op) => maryChild(MX, MY + SH, 1.62, { armL: [14, 2, 3], armR: [14, 2, 3], ...op });
  return lit(templeSteps(540, 1345, { n: 7, w0: 1120, dw: 64, sh: SH, glowTop: true })
      + castShadow(225, 1345 - SH + 4, 2.0, 'hook') + maiden(225, 1345 - SH + 4, 2.0, 0, { mood: 'happy', look: [2, -1] })
      + castShadow(805, 1345 - 2 * SH + 4, 1.95, 'hook') + maiden(805, 1345 - 2 * SH + 4, 1.95, 1, { flip: true, mood: 'happy', look: [2, -1] }), 'hook')
    + `<g opacity="0"${fadeIn(g, 0.8)}>${glow(540, 980, 360, 0.4)}</g>`
    + lit(`<g${punch(ti, 0.04, 540, 900)}><g${M.tw([{ at: cl, dur: 0.9, from: { y: 0 }, to: { y: -SH }, ease: 'power2.inOut' }])}>`
      + seq(Mary, [[0, { mood: 'awe', look: [0, -1.5] }], [g, { mood: 'happy', look: [0, -2.4] }], [nb, { mood: 'awe', look: [0, -2.6] }], [ti, { mood: 'happy', look: [0, 0] }], [vm, { mood: 'tender' }]])
      + '</g></g>', 'hook')
    + `<g opacity="0"${fadeIn(vm, 0.8)}>${sparkles(16, 300, 780, 560, 900, { seed: 4 })}</g>`
    + NEAR(bokeh(6, { seed: 31 }));
}

// 1 · Joachim and Anne pray for a child; Anne's promise (pan-r)
function scene1() {
  const pr = at(1, 'prayed'), ch = at(1, 'child'), pm = at(1, 'Anne promised'), q0 = at(1, 'Boy or girl'), qe = at(1, 'the Lord.', 0.4);
  return MID(lit(laurel(905, 1245, 0.95, ch), 'home'))
    + lit(castShadow(310, 1345, 2.3, 'home') + seq((op) => joachim(310, 1345, 2.3, { look: [0, -1], ...op }),
      [[0, { mood: 'sad', armL: [20, 2, 3], armR: [20, 2, 3] }], [pr, { mood: 'peaceful', armL: [140, 3, 3], armR: [140, 3, 3] }], [pm, { mood: 'peaceful', armL: [140, 3, 3], armR: [140, 3, 3], look: [2.6, 0] }]]), 'home')
    + lit(castShadow(730, 1345, 2.3, 'home') + seq((op) => anne(730, 1345, 2.3, { kneel: true, flip: true, ...op }),
      [[0, { mood: 'sad', look: [0, 1.4], armL: [24, 2, 3], armR: [24, 2, 3] }], [pr, { mood: 'peaceful', armL: [158, 3, 3], armR: [158, 3, 3] }],
        [ch, { mood: 'sad', armL: [158, 3, 3], armR: [158, 3, 3], look: [-2, -2] }], [pm, { mood: 'awe', armL: [158, 3, 3], armR: [158, 3, 3] }],
        [q0 - 0.2, { mood: 'determined', talk: [q0, qe], armL: [158, 3, 2.4], armR: [158, 3, 2.4], look: [0, -2] }]]), 'home')
    + `<g opacity="0"${fadeIn(pm, 1.2)}>${glow(730, 760, 420, 0.5)}<path d="M640 380 L820 380 L930 1300 L510 1300Z" fill="url(#beam)" opacity=".35" filter="url(#blur6)"/></g>`
    + NEAR(foliage('l', 1640, { color: '#2a2030', seed: 2 }));
}

// 2 · the human beat: little Mary is born; at two, Anne asks to wait one more year (drift-l)
function scene2() {
  const d = at(2, 'daughter'), tw = at(2, 'turned two'), wt = at(2, 'asked'), ms = at(2, 'miss them');
  const tod = (op) => maryChild(480, 1345, 1.05, { armL: [16, 2, 3], armR: [16, 2, 3], ...op });
  return lit(castShadow(230, 1345, 2.3, 'wait') + seq((op) => joachim(230, 1345, 2.3, { ...op }),
      [[0, { mood: 'happy', armL: [16, 2, 3], armR: [20, 2, 3], look: [2, 0] }], [d, { mood: 'joy', armL: [16, 2, 3], armR: [30, 2, 3], look: [2.4, 1] }],
        [tw, { mood: 'happy', armL: [16, 2, 3], armR: [112, 3, 2.4], look: [2.6, -1.6] }], [ms, { mood: 'tender', armL: [16, 2, 3], armR: [26, 2, 3] }]]), 'wait')
    + lit(castShadow(750, 1345, 2.3, 'wait') + seq((op) => anne(750, 1345, 2.3, { flip: true, ...op }),
      [[0, { mood: 'happy', armL: [20, 2, 3], armR: [16, 2, 3], look: [2, 0] }], [d, { mood: 'joy', armL: [40, 2, 3], armR: [16, 2, 3], look: [2.4, 1.4] }],
        [wt, { mood: 'worried', armL: [30, 2, 3], armR: [16, 2, 3], look: [-2.4, 0] }], [ms, { mood: 'tender', armL: [58, 2, 3], armR: [16, 2, 3], look: [2.4, 1.6] }]]), 'wait')
    + lit(castShadow(480, 1345, 1.05, 'wait') + `<g transform="translate(480,1345)"><g opacity="0"${M.tw([{ at: d, dur: 0.6, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}><g transform="translate(-480,-1345)">`
      + seq(tod, [[0, { mood: 'joy', look: [0, -1] }], [tw, { mood: 'happy', look: [2.6, -1.4] }], [ms, { mood: 'tender', look: [2.6, -2] }]]) + '</g></g></g>', 'wait')
    + `<g opacity="0"${fadeIn(d, 0.8)}>${sparkles(12, 380, 600, 900, 1150, { seed: 7 })}</g>`
    + NEAR(foliage('r', 1650, { color: '#3a4a28', seed: 9 }));
}

// 3 · at three, the lamp-bearers lead her up; the priest comes to meet her (push)
function scene3() {
  const th = at(3, 'At three'), lp = at(3, 'burning'), pr = at(3, 'The priest'), ks = at(3, 'kissed'), bl = at(3, 'blessed');
  return layer(0.95, lit(`<g${walkIn(th, -140, 1.1)}>${castShadow(345, 1322, 1.9, 'climb')}<g${M.drift(24, 0)}>${maiden(345, 1322, 1.9, 2, { mood: 'happy', look: [2, -1], propR: handLamp(lp) })}</g></g>`, 'climb'))
    + lit(`<g${walkIn(th - 0.3, -160, 1.1)}>${castShadow(150, 1345, 2.0, 'climb')}${maiden(150, 1345, 2.0, 0, { mood: 'happy', look: [2.4, 0], propR: handLamp(lp) })}</g>`
      + castShadow(530, 1345, 1.42, 'climb') + seq((op) => maryChild(530, 1345, 1.42, { armL: [14, 2, 3], ...op }),
        [[0, { mood: 'happy', armR: [16, 2, 3], look: [0, -1.4] }], [pr, { mood: 'surprised', armR: [16, 2, 3], look: [2.6, -2] }], [ks, { mood: 'tender', armR: [30, 2, 3] }], [bl, { mood: 'joy', armR: [30, 2, 3], look: [2.4, -2] }]])
      + `<g${walkIn(pr - 0.2, 220, 1.1)}>${castShadow(815, 1345, 2.3, 'climb')}`
      + seq((op) => templePriest(815, 1345, 2.3, { flip: true, armL: [16, 2, 3], look: [2.6, 1.6], ...op }),
        [[0, { mood: 'happy', armR: [20, 2, 3] }], [ks, { mood: 'tender', armR: [40, 2, 3] }], [bl, { mood: 'happy', armR: [118, 3, 2.4] }]]) + '</g>', 'climb')
    + `<g opacity="0"${fadeIn(ks, 0.6)}>${glow(530, 1000, 220, 0.55)}${sparkles(10, 480, 700, 880, 1080, { seed: 11 })}</g>`;
}

// 4 · the blessing; she dances on the altar step and all Israel loves her (dolly)
function scene4() {
  const q0 = at(4, 'The Lord'), qe = at(4, 'generations', 0.7), dn = at(4, 'Then she danced'), il = at(4, 'all Israel');
  const MX = 420, MY = 1345 - 3 * SH + 4;
  const people = [[60, '#7a5a4a', '#e2b48f', 0], [150, '#4a6a8a', '#d9a47e', 1], [245, '#8a6a3a', '#efc6a2', 2]].map(([x, c, sk, k]) =>
    `<g opacity="0"${fadeIn(il + k * 0.2, 0.6)}>${castShadow(x, 1262, 1.55, 'altar')}${hd(x, 1262, 1.55, { top: c, mantle: k === 1 ? '#c8963e' : null, veil: k === 2 ? '#f2ead8' : null, skin: sk,
      hair: ['#4a3424', '#8a8078', '#2a1c14'][k], beard: k === 1 ? '#8a8078' : null, mood: 'joy', look: [2.6, -0.6], armL: [16, 2, 3], armR: k === 0 ? [120, 6, 1.2] : [20, 2, 3], age: k === 1 ? 'old' : 'mid' })}</g>`).join('');
  return MID(lit(people, 'altar'))
    + lit(templeSteps(MX, 1345, { n: 3, w0: 560, dw: 70, sh: SH, c: '#efe2c8', glowTop: false }), 'altar')
    + `<g opacity="0"${fadeIn(dn, 0.8)}>${glow(MX, 1000, 300, 0.6)}</g>`
    + lit(castShadow(MX, MY, 1.42, 'altar') + seq((op) => maryChild(MX, MY, 1.42, { ...op }),
      [[0, { mood: 'awe', armL: [14, 2, 3], armR: [14, 2, 3], look: [2.6, -2] }], [qe - 0.5, { mood: 'tender', armL: [14, 2, 3], armR: [14, 2, 3], look: [2.6, -1.6] }],
        [dn, { mood: 'joy', dance: true, armL: [128, 14, 1.1], armR: [128, 14, 1.1], look: [0, 0] }]]), 'altar')
    + lit(castShadow(760, 1345, 2.3, 'altar') + seq((op) => templePriest(760, 1345, 2.3, { flip: true, armL: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', armR: [118, 3, 2.4], look: [2.6, 1.6] }], [q0 - 0.2, { mood: 'happy', talk: [q0, qe], armR: [126, 4, 2.2], look: [2.6, 1.4] }],
        [dn, { mood: 'joy', armR: [40, 2, 3], look: [2.6, 1.2] }]]), 'altar')
    + `<g opacity="0"${fadeIn(dn + 0.3, 0.6)}>${sparkles(18, 260, 620, 760, 1180, { seed: 14 })}</g>`
    + NEAR(bokeh(6, { seed: 33 }));
}

// 5 · her parents go home amazed; the girl in God's house becomes the house of God (tilt-up + rack)
function scene5() {
  const am = at(5, 'amazed'), gi = at(5, 'The girl'), hs = at(5, 'the house where');
  return lit(`<g${M.drift(-36, 0)}>${castShadow(190, 1345, 2.3, 'dusk')}`
      + seq((op) => joachim(190, 1345, 2.3, { armL: [16, 2, 3], armR: [16, 2, 3], ...op }), [[0, { mood: 'happy', look: [2.6, -0.6] }], [am, { mood: 'surprised', look: [2.6, -0.6] }], [hs, { mood: 'peaceful' }]])
      + castShadow(475, 1345, 2.3, 'dusk')
      + seq((op) => anne(475, 1345, 2.3, { armL: [16, 2, 3], ...op }), [[0, { mood: 'tender', armR: [20, 2, 3], look: [2.6, -0.8] }], [am, { mood: 'awe', armR: [60, 3, 2.4], look: [2.6, -1.4] }], [hs, { mood: 'tender', armR: [20, 2, 3] }]])
      + '</g>', 'dusk')
    + `<g opacity="0"${fadeIn(gi, 1.2)}>${glow(700, 860, 380, 0.55)}</g>`
    + `<g transform="translate(720,640)"><g opacity="0"${M.tw([{ at: gi, dur: 2.2, from: { x: 220, y: -260, opacity: 0 }, to: { x: 0, y: 0, opacity: 1 }, ease: 'power2.out' }])}><g${M.bob(8, 2.4)}>${dove(0.95)}</g></g></g>`
    + `<g opacity="0"${fadeIn(hs, 0.8)}>${sparkles(16, 560, 880, 560, 900, { seed: 18 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#1e1a26', seed: 10 }));
}

// 6 · feast day: little Mary with a lily on the steps; cloistered nuns and monks kneel in prayer (arc-r)
function scene6() {
  const cl = at(6, 'cloistered'), pr = at(6, 'pray for us'), hm = at(6, 'Holy Mary');
  const MX = 520, MY = 1345 - 2 * SH + 4;
  return lit(templeSteps(MX, 1345, { n: 2, w0: 460, dw: 70, sh: SH, c: '#efe2c8' }), 'glory')
    + lit(`<g opacity="0"${fadeIn(cl, 0.8)}>${castShadow(185, 1345, 2.1, 'glory')}${clare(185, 1345, 2.1, { kneel: true, mood: 'peaceful', armL: [22, 2, 3], armR: [22, 2, 3] })}</g>`
      + `<g opacity="0"${fadeIn(cl + 0.4, 0.8)}>${castShadow(805, 1345, 2.1, 'glory')}${monk(805, 1345, 2.1, { kneel: true, flip: true, mood: 'peaceful', armL: [22, 2, 3], armR: [22, 2, 3] })}</g>`, 'glory')
    + lit(castShadow(MX, MY, 1.42, 'glory') + seq((op) => maryChild(MX, MY, 1.42, { armL: [16, 2, 3], armR: 34, propR: `<g transform="translate(0,6)">${lily(0.9)}</g>`, ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [cl, { mood: 'tender', look: [-2.4, 0.6] }], [hm, { mood: 'happy', look: [0, 0] }], [pr, { mood: 'tender' }]]), 'glory')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(16, 300, 760, 640, 980, { seed: 21 })}</g>`
    + NEAR(bokeh(7, { seed: 25 }));
}

export const STORY = {
  slug: 'presentation_of_mary', name: 'Presentation_of_Mary',
  bg3d: './presentation_of_mary.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { anne: { voice: 'bf_emma', speed: 0.92 }, priest: { voice: { bm_george: 0.7, am_onyx: 0.3 }, speed: 0.88 } },
  thumb_hook: 'Given to God at just three', thumb_title: 'The Presentation of Mary', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti wˈʌn': 'noʊvˈɛmbɚ twˈɛnti fˈɜːst',   // November 21 -> November twenty-first
  },
  scenes: [
    { kicker: 'JERUSALEM · AN OLD TRADITION', title: 'She Never Looked Back', art: scene0, bg3d: 'jerHook', front3d: true, cam: { move: 'push-fast', oy: 950 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Her parents gave her to God at just three years old.', 'She climbed the Temple steps, and never looked back.', 'This is the Virgin Mary.'] },
    { kicker: 'JOACHIM AND ANNE', title: 'A Mother\'s Promise', art: scene1, bg3d: 'jerHome', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['An ancient story says Joachim and Anne prayed for years for a child.', 'Anne promised:', { text: 'Boy or girl, I will bring my child as a gift to the Lord.', who: 'anne' }] },
    { kicker: 'MARY IS BORN', title: 'One More Year', art: scene2, bg3d: 'jerWait', front3d: true, cam: 'drift-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['God gave them a daughter, Mary.', 'When she turned two, Anne asked to wait one more year, so she would not miss them.'] },
    { kicker: 'THE TEMPLE OF JERUSALEM', title: 'Lamps on the Steps', art: scene3, bg3d: 'jerClimb', front3d: true, cam: { move: 'push', amt: 0.07, ox: 600, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['At three, girls with burning lamps led her up to the Temple.', 'The priest kissed her and blessed her:'] },
    { kicker: 'THE PRIEST\'S BLESSING', title: 'She Danced for God', art: scene4, bg3d: 'jerAltar', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 980 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: [{ text: 'The Lord has made your name great in all generations.', who: 'priest' }, { text: 'Then she danced on the altar step, and all Israel loved her.', speed: 0.85 }] },
    { kicker: 'A HOUSE FOR GOD', title: 'The Living Temple', art: scene5, bg3d: 'jerDusk', front3d: true, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Her parents went home amazed.', 'The girl who entered God\'s house would become the house where God lived.'] },
    { kicker: 'FEAST DAY · NOVEMBER 21', title: 'The Presentation', art: scene6, bg3d: 'jerGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast is November 21, when the Church also prays for cloistered nuns and monks.', 'Holy Mary, Mother of God, pray for us.'] },
  ],
};
