// St. Edmund the Martyr: "the last stand" (one story: Hingwar's demand, the king's answer, and his death at the tree).
// Feast: November 20. All-3D backgrounds (edmund_last_stand.bg3d.js, anglia(mode)); characters use the detailed rig hd().
// Sources: Ælfric of Eynsham, "Life of St Edmund" (before 1002, after Abbo of Fleury's Passio Sancti Eadmundi, c. 985;
// modern translation by K. Seigfried, norsemyth.org): Hingwar's messenger demands that Edmund share his hidden gold
// and be his under-king; the bishop, afraid for the king's life, advises him to submit; the king is silent and looks at
// the ground; he answers "I follow Christ ... Edmund will never yield to Hingwar alive, to the heathen commander, unless he
// first submits with faith to Christ"; when Hingwar comes, Edmund stands in his hall and throws away his weapons, following
// Christ who forbade Peter to fight; he is tied to a tree, beaten with whips, calls out to Christ between the blows, is shot
// with arrows "as it were the bristles of a hedgehog, just as Sebastian was", and is beheaded while still calling on Christ.
// Abbo heard the story from St. Dunstan, who heard it as a young man from Edmund's old sword-bearer. Wikipedia "Edmund the
// Martyr": died 20 November 869; Great Heathen Army; memorial pennies "SCE EADMVND REX" from about 890 by the moneyers of the
// Danish king Guthrum; shrine at Bury St Edmunds; with Edward the Confessor, England's patron saint until St George.
// Iconography: crown, arrow(s), orb and sceptre, the wolf; red and blue royal robes. The death is shown bloodless: arrows
// in the tree and in his mantle, never a blow landing; the beheading is told only as "he gave his life".
// Exported for later reels: edmund, viking, saxonBishop, crown, heavenCrown, roundShield, longbow, silverPenny, threeCrowns, oakTrunk.
import { W, M, GOLD, motes, sparkles, bokeh, foliage, tufts, rays, dark, light, f, rng, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { arrow } from './sebastian_left_for_dead.mjs';
import { sword } from './joan_of_arc.mjs';
import { mitre } from './francis.mjs';
import { crozier } from './martin_of_tours.mjs';
import { wolf } from './francis.mjs';

const at = wordTimes('st_edmund_last_stand');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;

// ================================================================ props
/** An Anglo-Saxon king's crown in body space (sits on the hair, fleurons up to y -332). */
export const crown = `<g><path d="M-41 -283 Q0 -275 41 -283 L45 -309 L32 -297 L22 -324 L10 -302 L0 -334 L-10 -302 L-22 -324 L-32 -297 L-45 -309Z" fill="${GOLD}"/>`
  + `<path d="M10 -302 L22 -324 L32 -297 L45 -309 L41 -283 Q20 -279 4 -278Z" fill="#c8963e" opacity=".55"/>`
  + `<path d="M-41 -285 Q0 -277 41 -285 L41 -292 Q0 -284 -41 -292Z" fill="#fff0b8" opacity=".55"/>`
  + `<circle cx="0" cy="-289" r="4.6" fill="#c8323a"/><circle cx="-24" cy="-291" r="3.6" fill="#2f5a9a"/><circle cx="24" cy="-291" r="3.6" fill="#2f5a9a"/>`
  + `<circle cx="0" cy="-334" r="3.4" fill="#fff4cc"/><circle cx="-22" cy="-324" r="3" fill="#fff4cc"/><circle cx="22" cy="-324" r="3" fill="#fff4cc"/></g>`;
/** The heavenly crown: the same shape in light, with a glow (for glory). */
export const heavenCrown = `<g><circle cx="0" cy="-306" r="70" fill="url(#haloGlow)" opacity=".9"/>${crown}</g>`;
/** The crown lying on the ground, tipped over (origin at its base). */
const fallenCrown = (s = 1) => `<g transform="scale(${s}) rotate(-24)"><ellipse cx="0" cy="4" rx="50" ry="9" fill="#1a0f1a" opacity=".25"/><g transform="translate(0,290)">${crown}</g></g>`;
/** A round Viking/Saxon shield (centre at 0,0). */
export const roundShield = (c1 = '#c8323a', c2 = '#e8c24a', s = 1) => `<g transform="scale(${s})"><circle r="46" fill="${dark(c1, 0.35)}"/><circle r="42" fill="${c1}"/>`
  + `<path d="M0 -42 A42 42 0 0 1 0 42Z M-42 0 A42 42 0 0 0 0 42 L0 0Z" fill="${c2}" opacity=".9"/><circle r="11" fill="#9aa2ac"/><circle cx="-3" cy="-3" r="4" fill="#e2e8ee"/>`
  + `<circle r="42" fill="none" stroke="${light(c1, 0.3)}" stroke-width="2" opacity=".6"/></g>`;
/** A longbow held lowered, string side to the body. */
export const longbow = '<g transform="rotate(-6)"><path d="M0 -150 Q42 -40 0 74" stroke="#7a4a2a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M0 -150 V74" stroke="#efe6d2" stroke-width="2"/></g>';
/** An arrow held upright as his emblem (in the hand). */
const heldArrow = (s = 1) => `<g transform="scale(${s})"><circle cy="-60" r="54" fill="url(#haloGlow)" opacity=".6"/><rect x="-3" y="-150" width="6" height="200" rx="2" fill="#8a6a3a"/>`
  + '<path d="M0 -168 L-9 -146 L9 -146Z" fill="#c4ccd6"/><path d="M0 34 L-10 52 L-10 66 L0 50Z" fill="#f2ece0"/><path d="M0 34 L10 52 L10 66 L0 50Z" fill="#c8323a"/></g>';
/** A silver memorial penny, "SCE EADMVND REX", with a cross in the centre. */
export const silverPenny = (s = 1) => {
  const t = 'SCE · EADMVND · REX ·';
  return `<g transform="scale(${s})"><circle r="130" fill="url(#haloGlow)" opacity=".8"/><circle r="84" fill="#8a8e98"/><circle r="80" fill="#c8ccd4"/><circle r="80" fill="url(#sunGlow)" opacity=".25"/>`
    + `<circle r="58" fill="none" stroke="#8a8e98" stroke-width="3"/><path d="M0 -30 V30 M-30 0 H30" stroke="#7a7e88" stroke-width="10" stroke-linecap="round"/>`
    + `<path d="M-30 -60 A64 64 0 0 1 60 -14" stroke="#ffffff" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/>`
    + [...t].map((ch, i) => { const a = -90 + i * (360 / t.length); return `<text x="0" y="-62" transform="rotate(${f(a + 90)})" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="17" fill="#5a5e68">${ch}</text>`; }).join('')
    + '</g>';
};
/** St. Edmund's banner: three gold crowns on blue, on a pole (base at 0,0). */
export const threeCrowns = (s = 1) => {
  const c = (x, y, k) => `<g transform="translate(${x},${y}) scale(${k}) translate(0,300)">${crown}</g>`;
  return `<g transform="scale(${s})"><rect x="-5" y="-430" width="10" height="440" rx="4" fill="#8a6234"/><circle cy="-436" r="10" fill="${GOLD}"/>`
    + `<g${M.sway(2, 3.4, 0, 0, -420)}><path d="M5 -420 L190 -420 L190 -250 Q150 -236 100 -250 Q52 -262 5 -250Z" fill="#2f4f9a"/><path d="M120 -420 L190 -420 L190 -250 Q150 -236 120 -246Z" fill="#253f7e" opacity=".7"/>`
    + `<path d="M5 -420 L190 -420" stroke="${GOLD}" stroke-width="5"/>${c(62, -330, 0.55)}${c(132, -330, 0.55)}${c(97, -268, 0.55)}</g></g>`;
};
// rope over the robe of the bound king (body space)
const ropeBand = '<g fill="none" stroke-linecap="round"><path d="M-56 -170 Q0 -156 56 -170" stroke="#d8c090" stroke-width="7"/><path d="M-57 -158 Q0 -144 57 -158" stroke="#b89a68" stroke-width="6"/>'
  + '<path d="M-60 -60 Q0 -46 60 -60" stroke="#d8c090" stroke-width="7"/><path d="M-61 -49 Q0 -35 61 -49" stroke="#b89a68" stroke-width="6"/></g>';
// two arrows stuck in the mantle (body space, bloodless: only the cloth is pierced)
const cloakArrows = `${arrow(-50, -40, -62, 0.8)}${arrow(52, -90, 58, 0.8)}`;
// Viking helmet: rounded steel cap with a brow band and nose guard (no horns)
const vikingHelm = '<g><path d="M-44 -262 Q-46 -314 0 -316 Q46 -314 44 -262 Q0 -274 -44 -262Z" fill="#8a96a4"/><path d="M8 -314 Q42 -306 44 -262 Q30 -266 18 -267Z" fill="#6a7684" opacity=".7"/>'
  + '<path d="M-44 -262 Q0 -274 44 -262 L44 -270 Q0 -282 -44 -270Z" fill="#6a7684"/><path d="M0 -316 V-272" stroke="#6a7684" stroke-width="5"/><rect x="-4" y="-272" width="8" height="30" rx="3" fill="#7a8694"/>'
  + '<path d="M-30 -300 Q-18 -310 -4 -310" stroke="#d8e0e8" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/></g>';
const furCollar = '<path d="M-42 -214 Q0 -196 42 -214 Q48 -196 34 -186 Q0 -178 -34 -186 Q-48 -196 -42 -214Z" fill="#8a7458"/><path d="M-34 -200 l4 8 M-14 -194 l3 8 M8 -194 l3 8 M28 -200 l3 8" stroke="#5a4a38" stroke-width="2.4" stroke-linecap="round"/>';
const pectoralCross = `<path d="M-14 -200 Q0 -176 0 -166 Q0 -176 14 -200" stroke="${GOLD}" stroke-width="2.5" fill="none"/><path d="M0 -170 v24 M-8 -161 h16" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
const chestGold = `<g><ellipse cx="0" cy="4" rx="56" ry="9" fill="#1a0f1a" opacity=".25"/><rect x="-46" y="-48" width="92" height="50" rx="6" fill="#6a4228"/><rect x="-46" y="-48" width="92" height="9" fill="#8a5a36"/>`
  + `<circle cx="0" cy="-58" r="70" fill="url(#sunGlow)" opacity=".7"/><g fill="${GOLD}"><ellipse cx="-22" cy="-52" rx="16" ry="7"/><ellipse cx="4" cy="-58" rx="16" ry="7"/><ellipse cx="24" cy="-50" rx="16" ry="7"/><ellipse cx="-6" cy="-64" rx="14" ry="6"/></g>`
  + `<path d="M-46 -24 H46" stroke="#c8963e" stroke-width="5"/><rect x="-7" y="-32" width="14" height="16" rx="3" fill="#c8963e"/></g>`;
const torch = (x, y) => `<g transform="translate(${x},${y})"><rect x="-7" y="-300" width="14" height="300" rx="4" fill="#5a3a22"/><circle cy="-320" r="110" fill="url(#sunGlow)" opacity=".8"${M.flick(1.2, 0.3, 0.7)}/>`
  + `<g${M.pulse(0.12, 0.5, 0, 0, -300)}><path d="M0 -300 Q-22 -324 -6 -362 Q0 -340 8 -350 Q22 -322 0 -300Z" fill="#ff8a3a"/><path d="M0 -304 Q-10 -318 -2 -336 Q4 -322 6 -326 Q10 -314 0 -304Z" fill="#ffe08a"/></g></g>`;

// ================================================================ characters
const SKE = '#efc6a2', HAIRE = '#a8743e';
/** St. Edmund: young king, auburn hair, short beard, blue tunic, red mantle with white (ermine) lining, gold crown. */
export const edmund = (x, y, s, { crowned = true, bound = false, pierced = false, over = '', ...o } = {}) => hd(x, y, s, {
  top: '#2f4f8f', mantle: '#a8262e', lining: '#f6f1e6', trim: '#e2b45a', skin: SKE, hair: HAIRE, beard: HAIRE, beardStyle: 'short', age: 'young',
  iris: '#3f6a8f', belt: '#c8963e', shoes: '#5a3a22', ...o,
  over: (bound ? ropeBand : '') + (pierced ? cloakArrows : '') + (crowned ? crown : '') + over });
/** A Viking warrior: brown tunic, dark cloak with a fur collar, steel helmet with a nose guard, long fair hair and beard. chief: Hingwar (red cloak). */
export const viking = (x, y, s, { chief = false, helm = true, over = '', ...o } = {}) => hd(x, y, s, {
  top: chief ? '#4a3a30' : '#6a5a4a', mantle: chief ? '#8a2a2a' : '#3a4a5a', lining: '#8a7458', trim: chief ? '#c8963e' : '#9a7a4a', skin: '#e6bc98',
  hair: chief ? '#8a5a2e' : '#c89a5a', beard: chief ? '#7a4a24' : '#b8884a', hairStyle: 'long', beardStyle: 'full', age: 'mid', belt: '#4a3424', shoes: '#4a3424',
  iris: '#4f6f8f', mood: 'stern', ...o, over: furCollar + (helm ? vikingHelm : '') + over });
/** An Anglo-Saxon bishop: white alb, green chasuble, mitre, pectoral cross, white hair and beard. */
export const saxonBishop = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: '#f1ebdf', mantle: '#4a7a52', lining: GOLD, trim: GOLD, plain: true, skin: '#e8bc9a', hair: '#e8e2d8', beard: '#e8e2d8', beardStyle: 'full', age: 'old',
  belt: false, shoes: '#5a3a22', iris: '#5a4a3a', ...o, over: pectoralCross + mitre + over });

// ================================================================ set pieces (SVG, in front of the 3D)
/** The near ground: a soft curved field edge with a lit rim, tussocks and fallen leaves. */
const field = (y, c = '#5a6436', rim = '#8a9a5a', { seed = 3, leaves = ['#a8742e', '#8a5a2a', '#c8963e'] } = {}) => {
  const r = rng(seed); let lf = '';
  for (let k = 0; k < 26; k++) { const lx = r() * W, ly = y + 40 + r() * 330, cc = leaves[k % leaves.length]; lf += `<ellipse cx="${f(lx)}" cy="${f(ly)}" rx="${f(7 + r() * 6)}" ry="${f(3 + r() * 2)}" fill="${cc}" opacity=".7" transform="rotate(${f(r() * 180)} ${f(lx)} ${f(ly)})"/>`; }
  return `<path d="M-200 ${y + 12} Q220 ${y - 12} 540 ${y} Q860 ${y + 12} ${W + 200} ${y - 4} L${W + 200} 2200 L-200 2200Z" fill="${c}"/>`
    + `<path d="M-200 ${y + 12} Q220 ${y - 12} 540 ${y} Q860 ${y + 12} ${W + 200} ${y - 4}" stroke="${rim}" stroke-width="9" fill="none" opacity=".8"/>`
    + `<path d="M-200 ${y + 60} Q400 ${y + 40} ${W + 200} ${y + 70} L${W + 200} 2200 L-200 2200Z" fill="${dark(c, 0.12)}" opacity=".5"/>` + lf
    + tufts(y + 10, 14, dark(c, 0.25), { seed: seed + 2 });
};
/** A great oak trunk with two limbs spreading out of frame below the title (base at x, y). */
export const oakTrunk = (x, y, { c = '#5a4232', leaves = ['#8a5428', '#a8742e', '#6a4a24', '#b8863a'] } = {}) => {
  const d = dark(c, 0.3), l = light(c, 0.25), r = rng(31);
  const limb = (d0, w) => `<path d="${d0}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d0}" stroke="${d}" stroke-width="${f(w * 0.35)}" fill="none" stroke-linecap="round" opacity=".45" transform="translate(${f(w * 0.22)},0)"/>`;
  let clumps = '';
  for (const [cx, cy, n] of [[-330, -930, 13], [330, -930, 13], [-190, -1000, 8], [210, -990, 8], [0, -1010, 5]]) for (let k = 0; k < n; k++) {
    const px = cx + (r() - 0.5) * 230, py = cy + (r() - 0.5) * 110 + 40, rr = 30 + r() * 26;
    clumps += `<circle cx="${f(px + rr * 0.15)}" cy="${f(py + rr * 0.3)}" r="${f(rr)}" fill="${dark(leaves[k % leaves.length], 0.3)}"/><circle cx="${f(px)}" cy="${f(py)}" r="${f(rr)}" fill="${leaves[k % leaves.length]}"/><circle cx="${f(px - rr * 0.3)}" cy="${f(py - rr * 0.35)}" r="${f(rr * 0.45)}" fill="${light(leaves[k % leaves.length], 0.25)}" opacity=".6"/>`;
  }
  return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="6" rx="160" ry="24" fill="#1a0f1a" opacity=".3"/>`
    + limb('M-40 -660 Q-140 -820 -330 -900', 64) + limb('M40 -660 Q140 -820 330 -900', 64) + limb('M-20 -700 Q-80 -880 -190 -960', 40) + limb('M20 -700 Q90 -880 210 -950', 40)
    + `<path d="M-120 10 Q-80 -30 -86 -220 Q-96 -500 -70 -700 Q0 -740 70 -700 Q96 -500 86 -220 Q80 -30 120 10Z" fill="${c}"/>`
    + `<path d="M30 -716 Q66 -500 60 -220 Q60 -40 120 10 L64 10 Q44 -200 30 -716Z" fill="${d}" opacity=".6"/>`
    + `<path d="M-52 -640 Q-64 -400 -56 -120 M-20 -600 Q-28 -380 -20 -80 M14 -640 Q8 -420 16 -140" stroke="${d}" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>`
    + `<path d="M-70 -680 Q-80 -460 -72 -160" stroke="${l}" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>`
    + `<path d="M-120 10 Q-160 0 -190 16 M120 10 Q160 0 200 18" stroke="${c}" stroke-width="18" stroke-linecap="round" fill="none"/>`
    + `<g${M.sway(1.2, 5, 0, 0, -900)}>${clumps}</g></g>`;
};
// distant Viking warriors at the back of the set (small, in MID)
const vikingRow = (y, xs, t) => xs.map(([x, s, fl], k) => `<g opacity="0"${fadeIn(t + k * 0.18, 0.6)}>${viking(x, y, s, { flip: fl, armR: 22, propR: '<g transform="rotate(-8)"><rect x="-4" y="-260" width="8" height="320" rx="3" fill="#6b4a2a"/><path d="M0 -300 L-10 -258 L10 -258Z" fill="#c4ccd6"/></g>', armL: 30, propL: roundShield(['#c8323a', '#2f5a8a', '#e8c24a'][k % 3], '#efe6d2', 0.9) })}</g>`).join('');

// ================================================================ scenes (all backgrounds are 3D: no SVG sky or BACK layer)
// 0 · hook: the king before his hall, Viking sails on the river behind (push-fast)
function scene0() {
  const o = at(0, 'obey'), d = at(0, 'die'), s = at(0, 'This is'), n = at(0, 'Saint Edmund');
  const E = (op) => edmund(430, 1345, 2.45, { armL: [16, 2, 3], armR: 26, propR: sword, ...op });
  return MID(field(1250, '#4e5a30', '#7a8a4a', { seed: 3 }))
    + `<g${walkIn(at(0, 'Viking'), 160, 1.1)}>${viking(850, 1262, 1.55, { flip: true, armR: [70, 3, 2.4], armL: 28, propL: roundShield('#c8323a', '#e8c24a', 0.9) })}</g>`
    + `<g${punch(d, 0.035, 470, 900)}>`
    + seq(E, [[0, { mood: 'determined', look: [2.6, 0] }], [d, { mood: 'determined', look: [2.4, -0.4] }], [s, { mood: 'happy', look: [0, 0] }], [n, { mood: 'happy', halo: n }]])
    + '</g>'
    + motes(18, { y0: 600, y1: 1250, seed: 4, color: '#ffb070' })
    + NEAR(foliage('l', 1640, { color: '#2a2030' }) + foliage('r', 1660, { color: '#2a2030', seed: 5 }));
}

// 1 · the Great Heathen Army; Hingwar's messenger (pan-r)
function scene1() {
  const L2 = at(1, 'Their leader'), q0 = at(1, 'Share'), g = at(1, 'gold'), uk = at(1, 'under-king'), qe = at(1, 'under-king', 0.9);
  const E = (op) => edmund(300, 1345, 2.15, { armL: [14, 2, 3], armR: [20, 2, 3], look: [2.6, 0], ...op });
  return MID(field(1250, '#5e6a3c', '#8a9a5a', { seed: 6 }))
    + seq(E, [[0, { mood: 'worried', look: [2.4, -0.6] }], [L2, { mood: 'surprised' }], [uk, { mood: 'worried' }]])
    + `<g${walkIn(L2 - 0.3, 220, 1.1)}>`
    + seq((op) => viking(770, 1340, 2.05, { flip: true, armL: 24, propL: roundShield('#2f5a8a', '#efe6d2', 1), look: [2.4, 0], ...op }),
      [[0, { armR: [20, 2, 3] }], [q0 - 0.2, { talk: [q0, qe], armR: [82, 4, 2.2] }]])
    + '</g>'
    + popAt(g, 545, 1305, chestGold, 0.6)
    + NEAR(foliage('r', 1650, { color: '#2f3a26', seed: 9 }));
}

// 2 · the human beat: the bishop urges him to give in; the king looks at the ground (drift-l)
function scene2() {
  const g = at(2, 'told him'), lk = at(2, 'Edmund looked'), gr = at(2, 'ground');
  return MID(field(1250, '#55603a', '#8a905a', { seed: 8 }) + torch(110, 1262) + torch(980, 1250))
    + seq((op) => edmund(360, 1345, 2.2, { armL: [12, 2, 3], armR: [14, 2, 3], ...op }),
      [[0, { mood: 'worried', look: [2.6, 0] }], [lk, { mood: 'sad', look: [0, 2.4] }]])
    + seq((op) => saxonBishop(770, 1340, 2.0, { flip: true, armL: 24, propL: crozier, look: [2.6, 0], ...op }),
      [[0, { mood: 'worried', armR: [24, 2, 3] }], [g - 0.2, { mood: 'worried', armR: [44, 4, 2.2] }], [gr, { mood: 'sad', armR: [30, 2, 3] }]])
    + `<g opacity="0"${fadeIn(lk, 1.2)}>${glow(360, 1100, 380, 0.35)}</g>`
    + motes(14, { y0: 700, y1: 1250, seed: 9, color: '#ffc080' })
    + NEAR(foliage('l', 1640, { color: '#262434', seed: 4 }));
}

// 3 · his answer; Hingwar comes and the king throws away his weapons (dolly)
function scene3() {
  const q0 = at(3, 'I follow'), qe = at(3, 'alive', 0.5), hc = at(3, 'When Hingwar'), th = at(3, 'threw'), lc = at(3, 'like Christ');
  const E = (op) => edmund(370, 1345, 2.3, { look: [0, 0], ...op });
  const armed = { armL: 34, propL: roundShield('#2f4f8f', GOLD, 1), armR: 26, propR: sword };
  const drop = (x, y, rot, svg, dx) => `<g opacity="0"${M.tw([{ at: th, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }])}><g${M.tw([{ at: th, dur: 0.7, from: { x: dx, y: -260, rotation: 0 }, to: { x: 0, y: 0, rotation: rot }, ease: 'power2.in', origin: `${x} ${y}` }])}><g transform="translate(${x},${y})">${svg}</g></g></g>`;
  return MID(field(1250, '#4e5030', '#8a7a4a', { seed: 11 }) + vikingRow(1232, [[640, 1.05, true], [730, 1.1, true], [905, 1.0, true]], hc))
    + seq(E, [[0, { mood: 'determined', ...armed, look: [0, 0] }], [q0 - 0.2, { mood: 'determined', talk: [q0, qe], ...armed }],
      [hc, { mood: 'determined', ...armed, look: [2.6, 0] }], [th, { mood: 'determined', armL: [40, 3, 2.4], armR: [40, 3, 2.4], look: [2.6, 0] }],
      [lc, { mood: 'peaceful', armL: [24, 2, 3], armR: [24, 2, 3] }]])
    + drop(285, 1338, 8, `<g transform="rotate(90)">${sword}</g>`, 90) + drop(590, 1330, 0, `<g transform="scale(1.15,0.5)">${roundShield('#2f4f8f', GOLD, 1)}</g>`, -60)
    + `<g${walkIn(hc, 220, 1.2)}>${viking(800, 1340, 2.0, { chief: true, flip: true, armR: [22, 2, 3], armL: 28, propL: roundShield('#8a2a2a', '#e8c24a', 1), look: [2.4, 0] })}</g>`
    + `<g opacity="0"${fadeIn(lc, 0.8)}>${sparkles(12, 300, 600, 700, 1050, { seed: 6 })}</g>`
    + motes(16, { y0: 600, y1: 1250, seed: 12, color: '#ffa060' })
    + NEAR(foliage('l', 1650, { color: '#241a24', seed: 6 }) + foliage('r', 1660, { color: '#241a24', seed: 7 }));
}

// 4 · the tree, the arrows, and his death (tilt-up + rack focus)
function scene4() {
  const bt = at(4, 'beat'), ar = at(4, 'arrows'), bw = at(4, 'Between'), sc = at(4, 'Still calling'), gl = at(4, 'gave his life');
  const treeArrows = [[400, 760, -40], [655, 700, 46], [380, 980, -58], [680, 930, 52], [430, 560, -24]];
  const E = (op) => edmund(530, 1345, 2.3, { crowned: false, bound: true, armL: 6, armR: 6, ...op });
  return MID(field(1250, '#4a4a30', '#7a7a50', { seed: 14, leaves: ['#8a5428', '#6a3e22', '#9a6a2e'] })
      + `<g opacity="0"${fadeIn(0.4, 0.8)}>${viking(150, 1240, 1.35, { armR: [14, 2, 3], propR: longbow, armL: 18 })}${viking(255, 1236, 1.3, { armR: [16, 2, 3], propR: longbow, armL: 14, helm: false })}</g>`)
    + layer(0.95, oakTrunk(530, 1300))
    + treeArrows.map(([x, y, r], k) => `<g opacity="0"${fadeIn(ar + k * 0.22, 0.25)}>${arrow(x, y, r, 1.1)}</g>`).join('')
    + `<g transform="translate(300,1318)">${fallenCrown(1.3)}</g>`
    + seq(E, [[0, { mood: 'determined', look: [-2.4, 0] }], [bt, { mood: 'pain' }], [ar + 1.0, { mood: 'pain', pierced: true }],
      [bw, { mood: 'awe', pierced: true, look: [0, -1] }], [sc, { mood: 'peaceful', pierced: true }], [gl, { mood: 'peaceful', pierced: true, halo: gl }]])
    + `<g opacity="0"${fadeIn(sc, 1.6)}>${rays(540, 260, { op: 0.08, speed: 1.2 })}${glow(530, 760, 420, 0.5)}</g>`
    + `<g opacity="0"${fadeIn(gl, 1.2)}>${motes(18, { y0: 500, y1: 1200, seed: 15 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#1e1a26', seed: 10 }) + foliage('r', 1650, { color: '#1e1a26', seed: 11 }));
}

// 5 · his memory lives: coins in Viking-ruled land, the heavenly crown (pull)
function scene5() {
  const cn = at(5, 'coins'), hv = at(5, 'He lost'), hc = at(5, 'heavenly');
  const X = 410, Y = 1345, S = 2.25;
  const pilgrims = [[620, 0.95, '#7a5a4a'], [700, 0.9, '#4a6a5a'], [775, 0.85, '#8a6a3a']].map(([x, s, c], k) =>
    `<g${M.drift(60, 0)}>${hd(x, 1238, s, { top: c, mantle: null, skin: ['#e6bc98', '#d9a47e', '#efc6a2'][k], hair: ['#4a3424', '#8a6a4a', '#2a1c14'][k], beard: k === 1 ? '#8a6a4a' : null, flip: true, mood: 'happy', armR: 20, propR: k === 0 ? '<rect x="-3" y="-190" width="6" height="240" rx="3" fill="#7a5a3a"/>' : '' })}</g>`).join('');
  return MID(field(1250, '#6a7840', '#a8b060', { seed: 17 }) + pilgrims)
    + seq((op) => edmund(X, Y, S, { crowned: false, halo: true, armL: [16, 2, 3], armR: 30, propR: heldArrow(1), ...op }),
      [[0, { mood: 'happy', look: [2.2, -0.4] }], [hv, { mood: 'happy', look: [0, 0] }], [hc, { mood: 'tender' }]])
    + `<g transform="translate(${X},${Y}) scale(${S})"><g opacity="0"${M.tw([{ at: hc - 0.9, dur: 0.9, from: { y: -160, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }])}>${heavenCrown}</g></g>`
    + popAt(cn, 790, 600, `<g${M.bob(6, 3)}>${silverPenny(1.45)}</g>`, 0.7)
    + `<g opacity="0"${fadeIn(hc, 0.8)}>${sparkles(16, 240, 600, 420, 760, { seed: 18 })}</g>`
    + motes(14, { y0: 500, y1: 1250, seed: 19 })
    + NEAR(bokeh(7, { seed: 23 }) + foliage('l', 1650, { color: '#3a4a28', seed: 12 }));
}

// 6 · feast day portrait: crown, halo, arrow, the wolf, the three-crown banner (arc-r)
function scene6() {
  const pt = at(6, 'patron'), pr = at(6, 'pray for us');
  return MID(field(1250, '#5e6a3c', '#a8a060', { seed: 20 }))
    + popAt(pt, 70, 1300, threeCrowns(1.2), 0.8)
    + `<g transform="translate(1520,0) scale(-1,1)">${wolf(760, 1330, 1.35)}</g>`
    + seq((op) => edmund(500, 1345, 2.35, { halo: true, armL: [16, 2, 3], armR: 30, propR: heldArrow(1), ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [pt, { mood: 'happy', look: [-2.4, -0.6] }], [pr, { mood: 'tender' }]])
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 260, 700, 480, 900, { seed: 21 })}</g>`
    + motes(16, { y0: 500, y1: 1250, seed: 22 })
    + NEAR(bokeh(7, { seed: 25 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

export const STORY = {
  slug: 'st_edmund_last_stand', name: 'St_Edmund_Last_Stand',
  bg3d: './edmund_last_stand.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { edmund: { voice: 'bm_george', speed: 0.92 }, messenger: { voice: { bm_daniel: 0.55, am_onyx: 0.45 }, speed: 0.9 } },
  thumb_hook: 'He laid down his sword for Christ', thumb_title: 'St. Edmund the Martyr', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti': 'noʊvˈɛmbɚ twˈɛntiəθ',      // November 20 -> November twentieth
  },
  scenes: [
    { kicker: 'EAST ANGLIA, ENGLAND · AD 869', title: 'Obey, or Die', art: scene0, bg3d: 'angliaHook', cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['A Viking army gave a Christian king one choice: obey, or die.', 'This is Saint Edmund.'] },
    { kicker: 'THE GREAT HEATHEN ARMY', title: 'The Demand', art: scene1, bg3d: 'angliaRaid', cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['In 869, the Great Heathen Army reached his kingdom.', 'Their leader, Hingwar, sent word:', { text: 'Share your hidden gold with him, and be his under-king.', who: 'messenger' }] },
    { kicker: 'THE KING\'S HALL', title: 'The King Was Silent', art: scene2, bg3d: 'angliaHall', cam: 'drift-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['His bishop, afraid for his life, told him to give in.', 'Edmund looked at the ground in silence.'] },
    { kicker: 'HINGWAR ARRIVES', title: 'He Laid Down His Sword', art: scene3, bg3d: 'angliaArrive', cam: { move: 'dolly', amt: 0.08, ox: 450, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Then he answered:', { text: 'I follow Christ. Edmund will never yield to Hingwar alive.', who: 'edmund' },
        'When Hingwar came, Edmund threw away his weapons, like Christ, who stopped Peter from fighting.'] },
    { kicker: '20 NOVEMBER 869', title: 'Calling on Christ', art: scene4, bg3d: 'angliaOak', cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['They tied him to a tree, beat him, and shot him with arrows.', 'Between the blows, he called out to Jesus.',
        { text: 'Still calling on Christ, he gave his life.', speed: 0.85 }] },
    { kicker: 'BURY ST EDMUNDS', title: 'A Heavenly Crown', art: scene5, bg3d: 'angliaAbbey', cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['About twenty years later, even the land the Vikings ruled was making coins in his honor.', 'He lost an earthly crown, and won a heavenly one.'] },
    { kicker: 'FEAST DAY · NOVEMBER 20', title: 'Saint Edmund', art: scene6, bg3d: 'angliaGlory', cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 20, and he was once England\'s patron saint.', 'Saint Edmund, pray for us.'] },
  ],
};
