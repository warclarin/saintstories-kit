// St. Rose Philippine Duchesne: "the Woman Who Prays Always" (one-story reel; feast: November 18).
// Facts (sources: Franciscan Media "Saint Rose Philippine Duchesne"; Wikipedia "Rose Philippine Duchesne" (Callan's 1954
// biography); Kansas Historical Society, Kansapedia "Rose Philippine Duchesne"; Citizen Potawatomi Nation, potawatomi.org
// "Rose Philippine Duchesne"; Our Sunday Visitor): born Grenoble 29 Aug 1769; as a little girl heard of missions in
// Louisiana and wanted to work among the Native Americans; Society of the Sacred Heart 1804; sailed 1818 at 49 to New
// Orleans, then up the Mississippi to St. Louis; first school in a log cabin at St. Charles, Missouri. In 1841 the
// Jesuits opened a mission among the Potawatomi at Sugar Creek (near today's Mound City, Kansas); they did not plan to
// take her (71-72, retired, in poor health), but Fr. Peter Verhaegen, S.J., insisted: "She must come; she may not be able
// to do much work, but she will assure success to the mission by praying for us." She could not learn the language;
// "while others taught, she prayed" (Franciscan Media). The Potawatomi named her Quah-kah-ka-num-ad, "Woman Who Prays
// Always". LEGEND ("one famous story"; potawatomi.org: children scattered kernels of corn on her robe while she prayed to
// see if she ever moved; Franciscan Media: bits of paper, undisturbed hours later). Recalled to St. Charles in 1842 for
// her health; died there 18 Nov 1852, aged 83; beatified 1940 (Pius XII), canonized 3 July 1988 (John Paul II).
// Patron of perseverance amid adversity. Habit of the Society of the Sacred Heart: black habit and veil, white fluted
// bonnet frill, black ribbon, silver cross.
// Characters use hd() with its new veil / wimple / ruche options. Exported for later reels: duchesne, verhaegen, sacredHeartSister,
// potaKid, potaWoman, potaMan, logHouse, wigwam, kernel, cornOnHabit.
import fs from 'fs';
import { W, M, SKIN, GOLD, sky, sun, rays, clouds, hill, waves, sparkles, motes, tufts, flowers, ground, ship, rosary,
  dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';

const SLUG = 'st_rose_philippine_duchesne_sugar_creek';
const at = wordTimes(SLUG);
let TIM = null;
try { TIM = JSON.parse(fs.readFileSync(new URL(`../work/${SLUG}/timings.json`, import.meta.url), 'utf8')); } catch { /* not narrated yet */ }
/** [start, end] of line i of a scene, in seconds from the scene start (flow lead-ins included). */
const lineSpan = (sc, i, a = 0.3, b = 999) => { const se = TIM?.[sc]?.sentences?.[i]; const L = sc === 0 ? 0.3 : 0.1; return se ? [+(L + se.start).toFixed(2), +(L + se.end).toFixed(2)] : [a, b]; };

const HABIT = '#26222c', BONNET = '#fbf8f0', SKD = SKIN.fair;
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.6) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const walkIn = (t, dx, dur = 1.1) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.035, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const PRAY = { armL: -20, armR: -20 };   // hands folded at the waist

// ================================================================ props and headwear (hd() body space)
const silverCross = '<path d="M0 -184 v30 M-10 -173 h20" stroke="#d8dce6" stroke-width="5" stroke-linecap="round"/><path d="M0 -184 v30" stroke="#ffffff" stroke-width="1.6" opacity=".7"/>';
const ribbon = `<path d="M-14 -212 Q0 -204 14 -212 L10 -204 Q0 -199 -10 -204Z" fill="${HABIT}"/>`;
const collar = '<path d="M-9 -212 L0 -200 L9 -212Z" fill="#f6f2ea"/>';
/** A walking cane held in the hand (upright, reaching the ground). */
const cane = '<g><path d="M0 -10 L4 112" stroke="#6a4428" stroke-width="8" stroke-linecap="round"/><path d="M0 -10 Q-4 -24 -18 -20" stroke="#6a4428" stroke-width="8" fill="none" stroke-linecap="round"/></g>';
const letter = '<g transform="rotate(-12)"><rect x="-20" y="-30" width="40" height="30" rx="2" fill="#f6efe0"/><path d="M-14 -22 h28 M-14 -15 h22 M-14 -8 h26" stroke="#8a7a6a" stroke-width="2"/></g>';
const slate = '<g transform="rotate(-8)"><rect x="-22" y="-34" width="44" height="32" rx="3" fill="#8a5e3a"/><rect x="-18" y="-30" width="36" height="24" fill="#3a4448"/><path d="M-12 -22 h10 M-12 -16 h18" stroke="#e8e8e0" stroke-width="2"/></g>';
const cornCob = '<g transform="rotate(20)"><ellipse rx="7" ry="16" cy="-12" fill="#f2c23a"/><path d="M-5 -22 h10 M-6 -14 h12 M-6 -6 h12" stroke="#c8902a" stroke-width="1.4"/><path d="M-6 0 Q-12 -14 -8 -30 M6 0 Q12 -14 8 -30" stroke="#8ab05a" stroke-width="3" fill="none"/></g>';
const handCorn = '<g><ellipse cx="0" cy="-6" rx="5" ry="6" fill="#f2c23a"/><ellipse cx="6" cy="-2" rx="4.5" ry="5.5" fill="#f6cc48"/></g>';
/** One corn kernel. */
export const kernel = (x, y, r = 0, k = 1) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${k})"><ellipse rx="6" ry="7.5" fill="#f2c23a"/><ellipse cx="-1.8" cy="-2.4" rx="2.4" ry="3" fill="#fff2b0" opacity=".85"/><path d="M-3.6 4.6 Q0 7 3.6 4.6" stroke="#c8902a" stroke-width="1.6" fill="none"/></g>`;
const KPOS = [[-30, -194, 20], [26, -186, -30], [-12, -158, 10], [16, -142, 60], [-34, -124, -20], [4, -112, 40], [-22, -98, 0], [34, -102, 30]];
/** Corn kernels dropping one by one onto a kneeling habit from time t (hd() body space, put in `over`). */
export const cornOnHabit = (t) => KPOS.map(([x, y, r], i) => `<g opacity="0"${M.tw([{ at: t + i * 0.16, dur: 0.45, from: { y: -50, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.in' }])}>${kernel(x, y, r)}</g>`).join('');
/** A Potawatomi man's cloth turban (1840s), on the head. */
const turban = (c = '#c8503a', b = '#3a6a9a') => `<g transform="translate(0,-286)"><path d="M-46 8 Q-50 -24 0 -30 Q50 -24 46 8 Q0 -2 -46 8Z" fill="${c}"/>`
  + `<path d="M-44 -6 Q0 -18 44 -6" stroke="${b}" stroke-width="6" fill="none"/><path d="M-40 -18 Q0 -26 40 -18" stroke="${dark(c, 0.3)}" stroke-width="2.4" fill="none" opacity=".6"/><circle cx="24" cy="-12" r="4" fill="#d8dce6"/></g>`;
/** Two braids falling to the chest. */
const braids = (c = '#1a1414') => `<path d="M-38 -232 Q-42 -200 -36 -168 M38 -232 Q42 -200 36 -168" stroke="${c}" stroke-width="11" fill="none" stroke-linecap="round"/>`
  + `<path d="M-38 -224 l-5 6 M-38 -210 l-5 6 M-38 -196 l-5 6 M38 -224 l5 6 M38 -210 l5 6 M38 -196 l5 6" stroke="${light(c, 0.3)}" stroke-width="2" opacity=".6"/>`
  + '<circle cx="-36" cy="-166" r="5" fill="#c8323a"/><circle cx="36" cy="-166" r="5" fill="#c8323a"/>';

// ================================================================ characters (hd rig)
/** St. Rose Philippine Duchesne in the Sacred Heart habit: black habit and veil, white fluted bonnet, silver cross. */
export const duchesne = (x, y, s, { over = '', age = 'old', ...o } = {}) => hd(x, y, s, {
  top: HABIT, plain: true, belt: '#1a1620', trim: '#1a1620', veil: HABIT, wimple: BONNET, ruche: true, skin: SKD, beard: null,
  hair: age === 'old' ? '#9a9088' : '#5a4030', age, iris: '#5a4a3a', shoes: '#1e1a22', ...o, over: ribbon + silverCross + over });
/** Philippine as a girl in Grenoble. */
const girlPhilippine = (x, y, s, o = {}) => hd(x, y, s, { top: '#5a76b0', plain: true, belt: '#e8dcc8', trim: '#e8dcc8', skin: SKD, hair: '#5a3a24',
  hairStyle: 'long', beard: null, age: 'young', iris: '#5a4a3a', shoes: '#4a3424', ...o });
/** Another Religious of the Sacred Heart (no cross on the chest). */
export const sacredHeartSister = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: HABIT, plain: true, belt: '#1a1620', trim: '#1a1620', veil: HABIT, wimple: BONNET, ruche: true, skin: '#e8b892', beard: null,
  hair: '#5a4030', age: 'young', iris: '#4a3a2a', shoes: '#1e1a22', ...o, over: ribbon + over });
/** Fr. Peter Verhaegen, S.J.: black cassock and sash, clean-shaven, white collar. */
export const verhaegen = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, {
  top: '#2a2630', plain: true, belt: '#1a1620', trim: '#1a1620', skin: SKIN.priest, hair: '#4a3628', hairStyle: 'short', beard: null,
  age: 'mid', iris: '#4a3424', shoes: '#1e1a20', ...o, over: collar + over });
const PSK = [SKIN.s1, SKIN.pedro, SKIN.s3, SKIN.s0], CAL = ['#c8503a', '#3a6a9a', '#d8a040', '#5a8a5a', '#8a4a7a'];
/** A Potawatomi child in a calico shirt or dress, moccasins. */
export const potaKid = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: CAL[i % 5], plain: true, belt: i % 2 ? false : '#3a6a9a', trim: CAL[(i + 2) % 5],
  skin: PSK[i % 4], hair: '#1a1414', hairStyle: i % 2 ? 'long' : 'short', beard: null, age: 'young', iris: '#2a1c14', shoes: '#9a6a40', ...o,
  over: (i % 2 ? braids() : '') + (o.over || '') });
/** A Potawatomi woman: calico blouse, trade-cloth blanket with ribbonwork edge, braids. */
export const potaWoman = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: CAL[(i + 3) % 5], mantle: ['#2a3a6a', '#7a2a2a'][i % 2], lining: ['#c8323a', '#3a6a9a'][i % 2],
  trim: '#f2c46b', belt: '#5a3a22', skin: PSK[(i + 1) % 4], hair: '#1a1414', hairStyle: 'long', beard: null, age: i % 2 ? 'old' : 'mid', iris: '#2a1c14', shoes: '#9a6a40', ...o,
  over: braids() + (o.over || '') });
/** A Potawatomi man: calico shirt, blanket over the shoulder, cloth turban with a silver brooch. */
export const potaMan = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: CAL[(i + 1) % 5], mantle: ['#7a2a2a', '#2a4a5a'][i % 2], lining: '#f2c46b', trim: '#3a6a9a',
  belt: '#5a3a22', skin: PSK[(i + 2) % 4], hair: '#1a1414', hairStyle: 'long', beard: null, age: i % 2 ? 'old' : 'mid', iris: '#2a1c14', shoes: '#9a6a40', ...o,
  over: turban(['#c8503a', '#d8a040'][i % 2]) + (o.over || '') });

// ================================================================ set pieces
/** A frontier log house (St. Charles) or, with church, the Sugar Creek log church. Base centre at (x, y). */
export function logHouse(x, y, s = 1, { w = 320, h = 200, church = false, wood = '#8a5e3a', roof = '#5a4030', win = '#ffd98a' } = {}) {
  let logs = '';
  for (let yy = 0, k = 0; yy > -h; yy -= 22, k++) logs += `<rect x="${-w / 2}" y="${yy - 21}" width="${w}" height="20" rx="10" fill="${[wood, dark(wood, 0.12), light(wood, 0.08)][k % 3]}"/>`
    + `<circle cx="${-w / 2 - 4}" cy="${yy - 11}" r="10" fill="${light(wood, 0.35)}"/><circle cx="${w / 2 + 4}" cy="${yy - 11}" r="10" fill="${light(wood, 0.25)}"/>`;
  const wins = (church ? [[-w / 4, -h * 0.62], [w / 4, -h * 0.62]] : [[-w / 3.2, -h * 0.6], [w / 3.2, -h * 0.6]]).map(([wx, wy]) =>
    `<rect x="${wx - 20}" y="${wy - 22}" width="40" height="44" fill="${win}"/><path d="M${wx} ${wy - 22} V${wy + 22} M${wx - 20} ${wy} H${wx + 20}" stroke="${dark(wood, 0.4)}" stroke-width="4"/>`).join('');
  const rh = church ? 150 : 110;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="${w / 2 - 40}" y="${-h}" width="40" height="${h}" fill="${dark(wood, 0.3)}" opacity=".4"/>${logs}${wins}`
    + `<path d="M-26 0 V-${church ? 100 : 86} Q0 -${church ? 116 : 100} 26 -${church ? 100 : 86} V0Z" fill="${dark(wood, 0.45)}"/>`
    + `<path d="M${-w / 2 - 26} ${-h + 4} L0 ${-h - rh} L${w / 2 + 26} ${-h + 4}Z" fill="${roof}"/><path d="M0 ${-h - rh} L${w / 2 + 26} ${-h + 4} L${w / 5} ${-h + 4}Z" fill="${dark(roof, 0.3)}" opacity=".6"/>`
    + `<path d="M${-w / 2 - 10} ${-h - 20} L0 ${-h - rh + 14} M${-w / 2 + 30} ${-h - 4} L0 ${-h - rh + 40}" stroke="${light(roof, 0.2)}" stroke-width="3" opacity=".4"/>`
    + (church ? `<rect x="-26" y="${-h - rh - 70}" width="52" height="80" fill="${wood}"/><path d="M-36 ${-h - rh - 66} L0 ${-h - rh - 120} L36 ${-h - rh - 66}Z" fill="${roof}"/>`
      + `<path d="M0 ${-h - rh - 120} v-60 M-20 ${-h - rh - 160} h40" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/>`
      : `<rect x="${-w / 2 + 20}" y="${-h - 90}" width="36" height="${90}" fill="#8a7a6a"/><rect x="${-w / 2 + 16}" y="${-h - 98}" width="44" height="12" fill="#6a5a4e"/>`)
    + '</g>';
}
/** A Potawatomi bark lodge (domed wigwam). Base centre at (x, y). */
export function wigwam(x, y, s = 1, { c = '#8a6a4a' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-110 0 Q-112 -150 0 -152 Q112 -150 110 0Z" fill="${c}"/>`
    + `<path d="M30 -150 Q112 -140 110 0 L62 0 Q68 -110 30 -150Z" fill="${dark(c, 0.3)}" opacity=".5"/>`
    + `<path d="M-106 -46 Q0 -62 106 -46 M-82 -104 Q0 -122 82 -104" stroke="${dark(c, 0.4)}" stroke-width="6" fill="none"/>`
    + `<path d="M-60 -10 v-30 M-20 -70 v-30 M40 -14 v-28 M60 -76 v-22" stroke="${light(c, 0.25)}" stroke-width="3" opacity=".6"/>`
    + `<path d="M-24 0 V-62 Q0 -80 24 -62 V0Z" fill="#2a1c18"/><ellipse cx="0" cy="-150" rx="16" ry="5" fill="${dark(c, 0.5)}"/></g>`;
}
const alps = (y) => `<path d="M-120 ${y} L60 ${y - 330} L150 ${y - 250} L280 ${y - 430} L420 ${y - 220} L520 ${y - 300} L680 ${y} Z" fill="#8a94b8"/>`
  + `<path d="M60 ${y - 330} L100 ${y - 270} L80 ${y - 262} L40 ${y - 300}Z M280 ${y - 430} L330 ${y - 350} L300 ${y - 340} L262 ${y - 380} L240 ${y - 370}Z M520 ${y - 300} L556 ${y - 250} L530 ${y - 246} L500 ${y - 270}Z" fill="#f4f2f8"/>`
  + `<path d="M280 ${y - 430} L420 ${y - 220} L680 ${y} L380 ${y}Z" fill="#6a7498" opacity=".45"/>`;
const townRow = (y) => [[-20, '#e8d8c0', '#a8503a'], [90, '#f2e2c8', '#8a4a3a'], [200, '#e0ccb0', '#a8603e'], [310, '#efe0c8', '#8a4a3a'], [420, '#e8d4b8', '#9a5038']].map(([x, wall, roof], k) =>
  `<g transform="translate(${x},${y})"><rect x="-50" y="-${130 + (k % 2) * 30}" width="100" height="${130 + (k % 2) * 30}" fill="${wall}"/><path d="M-58 -${128 + (k % 2) * 30} L0 -${190 + (k % 2) * 30} L58 -${128 + (k % 2) * 30}Z" fill="${roof}"/>`
  + `<rect x="-30" y="-${100 + (k % 2) * 30}" width="18" height="24" fill="#ffd98a"/><rect x="12" y="-${100 + (k % 2) * 30}" width="18" height="24" fill="#ffd98a"/><rect x="34" y="-${130 + (k % 2) * 30}" width="16" height="${130 + (k % 2) * 30}" fill="#2a1c2a" opacity=".15"/></g>`).join('');
const prairieGround = (y, seed = 3, c = '#b8a860') => ground(y, c, { rim: light(c, 0.3) }) + tufts(y + 30, 26, dark(c, 0.25), { seed }) + tufts(y + 90, 20, dark(c, 0.15), { seed: seed + 5, s: 1.3 });
const DREAM = (x, y, r, t0, t1) => `<g opacity="0"${M.tw([{ at: t0, dur: 0.8, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, origin: `${x} ${y}` }, { at: t1, dur: 0.6, from: { opacity: 1 }, to: { opacity: 0 } }])}>`
  + `<circle cx="${x - r * 0.9}" cy="${y + r * 1.15}" r="14" fill="#fffaf0" opacity=".9"/><circle cx="${x - r * 0.65}" cy="${y + r * 0.9}" r="22" fill="#fffaf0" opacity=".9"/>`
  + `<clipPath id="dreamClip"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath><circle cx="${x}" cy="${y}" r="${r + 10}" fill="#fffaf0"/>`
  + `<g clip-path="url(#dreamClip)"><rect x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}" fill="#f6d8a8"/><rect x="${x - r}" y="${y - r}" width="${r * 2}" height="${r}" fill="#9ac0e0"/>`
  + `<circle cx="${x + r * 0.45}" cy="${y - r * 0.35}" r="${r * 0.18}" fill="#fff2c0"/><path d="M${x - r} ${y + r * 0.2} Q${x} ${y} ${x + r} ${y + r * 0.15} L${x + r} ${y + r} L${x - r} ${y + r}Z" fill="#b8a860"/>`
  + `${wigwam(x - r * 0.35, y + r * 0.42, 0.42)}${wigwam(x + r * 0.35, y + r * 0.5, 0.32, { c: '#7a5a3e' })}</g></g>`;
const DUSKCHAPEL = '#2a2048';

// ================================================================ scenes
// 0 · hook (3D prairieHook, push-fast): she kneels in prayer on the prairie at frame 0, corn kernels already resting on her
// habit (a visual question, paid off in scene 4); worried on "Too sick"; a Potawatomi mother and child step in on
// "So why did a whole tribe"; halo and a look at us on "This is Saint"
const KEPT = KPOS.slice(0, 5).map(([x, y, r]) => kernel(x, y, r)).join('');
function scene0() {
  const tC = at(0, 'Too sick'), tY = at(0, 'So why'), tN = at(0, 'new name'), tT = at(0, 'This is');
  return prairieGround(1250, 2)
    + glow(430, 1060, 440, 0.45)
    + `<g opacity="0"${fadeIn(tT - 0.2, 0.8)}>${rays(430, 800, { op: 0.1, color: '#fff0d0' })}${glow(430, 940, 400, 0.5)}</g>`
    + `<g${punch(tT, 0.03, 430, 860)}>`
    + seq((o) => duchesne(430, 1350, 2.85, { kneel: true, ...PRAY, over: KEPT, ...o }),
      [[0, { mood: 'peaceful' }], [tC, { mood: 'worried', look: [2, 0.6] }], [tY + 0.3, { mood: 'peaceful' }], [tT, { mood: 'happy', halo: true }]])
    + '</g>'
    + `<g opacity="0"${walkIn(tY - 0.2, 220)}>`
    + seq((o) => potaWoman(800, 1270, 2.1, 0, { flip: true, armL: 12, look: [1, 0.6], ...o }), [[0, { mood: 'happy', armR: 18 }], [tN, { mood: 'tender', armR: [62, 2, 3] }]])
    + seq((o) => potaKid(680, 1275, 1.3, 1, { flip: true, armL: 10, look: [1, 0], ...o }), [[0, { mood: 'surprised', armR: 16 }], [tN + 0.3, { mood: 'joy', armR: [120, 10, 1.6] }]])
    + '</g>'
    + motes(14, { seed: 3, y0: 600, y1: 1250 })
    + NEAR(tufts(1680, 14, '#7a6a3a', { seed: 31, s: 2.2 }));
}

// 1 · setup (SVG, pan-r): Philippine as a girl in Grenoble; the dream bubble of a Potawatomi village on "dreamed";
// at "At 49" she is a nun; a ship sails in on "crossed the ocean"; the frontier bank rises on "frontier"
function scene1() {
  const tD = at(1, 'dreamed'), tA = at(1, 'At 49'), tO = at(1, 'crossed'), tF = at(1, 'frontier');
  return FAR(sky([[0, '#5a86c8'], [0.4, '#a8c8e8'], [0.7, '#f4e0c4'], [1, '#f4e0c4']]) + sun(880, 520, 50, 260))
    + BACK(clouds(430, { color: '#ffffff', op: 0.8, seed: 3 }) + alps(1000)
      + waves(1050, 8, 240, 6, '#4a78b0', { foam: '#e8f2ff' }) + waves(1090, 10, 280, 7, '#3a68a0', { phase: 0.4, foam: '#dceaf8' })
      + `<g opacity="0"${M.in('rise', tF - 0.2, 1, 0, 40)}><path d="M780 1050 Q900 1010 1180 1030 L1180 1110 L760 1110Z" fill="#7a8a4a"/>`
      + `${[820, 880, 960, 1040, 1110].map((x, k) => `<circle cx="${x}" cy="${1010 - (k % 2) * 12}" r="${28 + (k % 3) * 6}" fill="${k % 2 ? '#4a6a3a' : '#5a7a40'}"/>`).join('')}${logHouse(930, 1060, 0.28)}</g>`
      + `<g transform="translate(560,1060)"><g opacity="0"${M.tw([{ at: tO - 0.3, dur: 2.4, from: { x: 340, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power1.out' }])}><g${M.bob(5, 2.4, 0)}>${ship(0, 0, 0.75, { crew: false })}</g></g></g>`)
    + MID(`<path d="M-120 1150 Q160 1090 600 1130 L640 1300 L-120 1300Z" fill="#8aa05a"/>` + townRow(1170))
    + ground(1250, '#9ab060', { rim: '#c8d888' })
    + DREAM(660, 600, 140, tD, tA)
    + seq((o) => (o.nun ? duchesne(360, 1325, 2.05, { age: 'mid', ...o }) : girlPhilippine(360, 1325, 1.8, o)), [
      [0, { mood: 'happy', look: [2, -1], armL: 10, armR: [24, 2, 3] }],
      [tD, { mood: 'awe', look: [2.6, -2.4], armL: 10, armR: [40, 2, 3] }],
      [tA, { nun: true, mood: 'determined', look: [2.6, 0], armL: 12, armR: [20, 2, 3] }],
      [tF, { nun: true, mood: 'happy', look: [2.8, -0.6], armL: 12, armR: [62, 2, 3] }]])
    + `<g opacity="0"${fadeIn(tD, 0.6)}>${sparkles(10, 560, 880, 480, 800, { seed: 4, color: '#fff2d0' })}</g>`
    + NEAR(tufts(1660, 10, '#5a7a3a', { seed: 12, s: 2 }));
}

// 2 · St. Charles, 1841 (SVG, drift-l): Fr. Verhaegen arrives with news on "Jesuits"; the sister rejoices on "Potawatomi";
// the human beat on "But she was past seventy": worried, leaning on her cane
function scene2() {
  const tJ = at(2, 'Jesuits'), tP = at(2, 'Potawatomi'), tB = at(2, 'But she'), tWk = at(2, 'weak');
  return FAR(sky([[0, '#6a8ac0'], [0.4, '#b0c8e0'], [0.68, '#f2dcc0'], [1, '#f2dcc0']]) + sun(220, 560, 46, 240))
    + BACK(clouds(460, { color: '#fff8f0', op: 0.75, seed: 5 }) + hill(1040, 30, '#9ab080', 4, { freq: 0.8 })
      + `<path d="M-80 1040 Q540 1010 1160 1040 L1160 1080 L-80 1080Z" fill="#7a9ab8"/>`
      + [[-30, 1000], [120, 990], [960, 995], [1100, 1005]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${50 + k * 6}" fill="${k % 2 ? '#5a7a48' : '#6a8a50'}"/>`).join(''))
    + MID(logHouse(640, 1190, 0.9, { w: 420, h: 230 }) + `<path d="M-60 1180 H1140" stroke="#8a6a48" stroke-width="6"/>${[...Array(16)].map((_, k) => `<rect x="${-40 + k * 76}" y="1150" width="10" height="44" fill="#8a6a48"/>`).join('')}`)
    + ground(1240, '#a8b070', { rim: '#c8d090' })
    + seq((o) => sacredHeartSister(150, 1330, 1.9, { armL: 12, ...o }), [
      [0, { mood: 'happy', look: [2, 0], armR: 18 }], [tP, { mood: 'joy', look: [2.6, 0], armR: [130, 8, 1.6] }], [tB + 0.4, { mood: 'worried', look: [2.6, 0.4], armR: [60, 2, 3] }]])
    + `<g${M.tw([{ at: tWk, dur: 1.2, from: { rotation: 0 }, to: { rotation: -3 }, ease: 'sine.inOut', origin: '390 1330' }])}>`
    + seq((o) => duchesne(390, 1330, 1.95, { armR: [20, 1, 3], propR: cane, ...o }), [
      [0, { mood: 'happy', look: [2.4, 0], armL: 12 }], [tP, { mood: 'awe', look: [2.6, -1], armL: [40, 2, 3] }], [tB, { mood: 'worried', look: [0, 1.6], armL: 14 }]])
    + '</g>'
    + `<g opacity="0"${walkIn(tJ - 0.5, 260)}>` + seq((o) => verhaegen(790, 1330, 2.0, { flip: true, armL: 12, ...o }), [
      [0, { mood: 'happy', armR: [40, 2, 3], propR: letter }], [tB + 0.3, { mood: 'worried', look: [1, 0.8], armR: 18, propR: letter }]]) + '</g>'
    + NEAR(tufts(1660, 10, '#6a7a3a', { seed: 9, s: 2 }));
}

// 3 · "She must come" (SVG, push): Fr. Verhaegen insists (his own voice); she is surprised, then moved on "praying for us"
function scene3() {
  const [q0, q1] = lineSpan(3, 1, 1.5, 8), tM = at(3, 'She must'), tBw = at(3, 'but she will'), tPr = at(3, 'praying for us');
  return FAR(sky([[0, '#7a86c0'], [0.42, '#c8b8d8'], [0.7, '#f6d8b8'], [1, '#f6d8b8']]))
    + BACK(hill(1060, 26, '#9aa880', 6) + `<path d="M-80 1060 Q540 1040 1160 1060 L1160 1090 L-80 1090Z" fill="#8aa0c0"/>`)
    + MID(logHouse(560, 1200, 1.15, { w: 520, h: 260 }))
    + `<g opacity="0"${fadeIn(tPr - 0.2, 1)}>${rays(310, 820, { op: 0.09 })}${glow(310, 960, 360, 0.5)}</g>`
    + ground(1240, '#a8a870', { rim: '#c8c890' })
    + `<g${punch(tM, 0.03, 540, 900)}>`
    + seq((o) => duchesne(310, 1330, 2.25, { armL: 12, propR: cane, armR: [20, 1, 3], ...o }), [
      [0, { mood: 'worried', look: [2.6, 0.4] }], [tM + 0.3, { mood: 'surprised', look: [2.6, 0] }], [tPr, { mood: 'tender' }]])
    + seq((o) => verhaegen(790, 1330, 2.35, { flip: true, armL: 12, look: [1.4, 0.4], ...o }), [
      [0, { mood: 'determined', armR: 18, propR: letter }], [q0 - 0.1, { mood: 'determined', talk: [q0, q1], armR: [48, 3, 2.4] }], [tBw, { mood: 'happy', talk: [tBw, q1], armR: [128, 3, 2.4] }],
      [q1 + 0.1, { mood: 'happy', armR: [128, 3, 2.4] }]])
    + '</g>'
    + NEAR(bokeh(5, { seed: 14, op: [0.2, 0.45] }));
}

// 4 · the turning point (3D chapel, dolly): she kneels in the log chapel; the sisters teach outside the door; children
// slip in and drop corn on her habit; on "Hours later" the light turns to evening; "not one kernel had moved" (climax)
function scene4() {
  const tT = at(4, 'sisters taught'), tH = at(4, 'for hours'), tCh = at(4, 'children'), tCo = at(4, 'corn'), tX = at(4, 'to test'), tL = at(4, 'Hours later'), tN = at(4, 'not one');
  const kid = (x, i, o) => potaKid(x, 1335, 1.5, i, { armL: 10, ...o });
  const leave = (dx) => M.tw([{ at: tCh - 0.6, dur: 0.9, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }, { at: tX + 0.5, dur: 0.8, from: { x: 0, opacity: 1 }, to: { x: dx, opacity: 0 }, ease: 'power2.in' }]);
  return MID(`<g opacity="0"${fadeIn(tT - 0.3, 0.8)}><rect x="820" y="820" width="220" height="420" fill="#f8e8c0"/><rect x="820" y="1080" width="220" height="160" fill="#b8a860"/>`
      + `${sacredHeartSister(900, 1210, 0.7, { mood: 'happy', armL: 12, armR: [60, 2, 3], propR: slate })}${potaKid(980, 1215, 0.5, 0, { flip: true, mood: 'happy', armR: 12 })}${potaKid(1030, 1215, 0.48, 3, { flip: true, mood: 'joy', armR: 30 })}`
      + `<path d="M812 812 H1048 V1244 H812Z" stroke="#4a3020" stroke-width="16" fill="none"/></g>`)
    + `<g opacity="0"${fadeIn(tL - 0.1, 1.2)}><rect x="-200" y="-200" width="1480" height="2320" fill="${DUSKCHAPEL}" opacity=".32"/>${glow(520, 1000, 460, 0.35)}</g>`
    + `<g opacity="0"${fadeIn(tH - 0.3, 1)}>${glow(520, 980, 380, 0.4)}</g>`
    + seq((o) => duchesne(520, 1335, 2.45, { kneel: true, ...PRAY, over: cornOnHabit(tCo), ...o }), [
      [0, { mood: 'peaceful' }], [tN, { mood: 'peaceful', halo: tN + 0.1 }]])
    + `<g opacity="0"${leave(-300)}>${seq((o) => kid(190, 0, o), [[0, { mood: 'happy', look: [2.4, 0], armR: [40, 2, 3], propR: cornCob }], [tCo - 0.2, { mood: 'happy', look: [2.6, 1], armR: [76, 2, 2.4], propR: handCorn }], [tCo + 0.6, { mood: 'joy', armR: [40, 2, 3] }]])}</g>`
    + `<g opacity="0"${leave(320)}>${seq((o) => kid(820, 1, { flip: true, ...o }), [[0, { mood: 'surprised', look: [2.4, 0], armR: 20 }], [tCo, { mood: 'joy', armR: [76, 2, 2.4], propR: handCorn }]])}</g>`
    + `<g opacity="0"${walkIn(tL + 0.2, -260, 1)}>${seq((o) => kid(190, 0, o), [[0, { mood: 'surprised', look: [2.4, 0.6], armR: 16 }], [tN, { mood: 'awe', look: [2.6, 0.6], armR: [50, 2, 3] }]])}</g>`
    + `<g opacity="0"${walkIn(tL + 0.4, 280, 1)}>${seq((o) => kid(820, 1, { flip: true, ...o }), [[0, { mood: 'surprised', look: [2.4, 0.6], armR: 16 }], [tN + 0.2, { mood: 'awe', look: [2.6, 0], armR: [90, 3, 2.4] }]])}</g>`
    + `<g opacity="0"${fadeIn(tN, 0.5)}>${sparkles(14, 400, 640, 900, 1260, { seed: 8, color: '#fff2b0' })}</g>`
    + `<g opacity="0"${fadeIn(tH, 1)}>${motes(12, { seed: 6, x0: 300, x1: 760, y0: 700, y1: 1250 })}</g>`
    + NEAR(bokeh(6, { seed: 17, op: [0.25, 0.5] }));
}

// 5 · what came of it (SVG, tilt-up + rack): the Potawatomi name her; halo and rays on the quotable line
function scene5() {
  const tN = at(5, 'They named'), tWo = at(5, 'Woman Who'), tS = at(5, 'She never'), tE = at(5, 'every heart');
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.66, '#f8d894'], [1, '#f8d894']]) + sun(540, 900, 70, 360)
      + `<g opacity="0"${fadeIn(tE - 0.4, 1.2)}>${rays(540, 760, { op: 0.13 })}</g>`)
    + BACK(clouds(470, { color: '#fff0d8', op: 0.7, seed: 7 }) + hill(1060, 30, '#c8a070', 3, { freq: 0.7 })
      + [...Array(12)].map((_, k) => `<circle cx="${-40 + k * 100}" cy="${1040 - (k % 3) * 10}" r="${36 + (k % 4) * 8}" fill="${k % 2 ? '#7a7a40' : '#8a8448'}"/>`).join(''))
    + MID(wigwam(120, 1180, 0.8) + wigwam(330, 1160, 0.6, { c: '#7a5a3e' }) + logHouse(760, 1170, 0.6, { church: true }) + wigwam(990, 1180, 0.75))
    + prairieGround(1250, 7, '#c0a860')
    + glow(540, 1050, 420, 0.5)
    + seq((o) => potaWoman(205, 1330, 2.0, 1, { armL: 12, look: [2.4, -0.4], ...o }), [[0, { mood: 'happy', armR: 18 }], [tN, { mood: 'tender', armR: [70, 2, 3] }], [tS, { mood: 'happy', armR: 30 }]])
    + seq((o) => potaMan(830, 1330, 2.0, 1, { flip: true, armL: 12, look: [2.2, -0.4], ...o }), [[0, { mood: 'happy', armR: 18 }], [tWo, { mood: 'tender', armR: [56, 2, 3] }], [tS, { mood: 'happy', armR: 24 }]])
    + seq((o) => duchesne(520, 1330, 2.0, { ...PRAY, ...o }), [[0, { mood: 'surprised', look: [0, 0.6] }], [tWo, { mood: 'tender' }], [tE, { mood: 'peaceful', halo: tE }]])
    + `<g opacity="0"${walkIn(tWo - 0.2, -120)}>${potaKid(360, 1340, 1.25, 0, { mood: 'joy', armL: 10, armR: [120, 10, 1.5], look: [2, -0.6] })}</g>`
    + `<g opacity="0"${walkIn(tWo, 120)}>${potaKid(685, 1340, 1.25, 3, { flip: true, mood: 'joy', armL: 10, armR: [60, 2, 3], look: [2, -0.6] })}</g>`
    + `<g opacity="0"${fadeIn(tWo, 0.8)}>${sparkles(16, 300, 780, 640, 1000, { seed: 9, color: '#fff2d0' })}</g>`
    + NEAR(bokeh(6, { seed: 23 }));
}

// 6 · feast day (3D prairieGlory, arc-r): portrait with halo and rosary; children run in on "patron"; tender on "pray for us"
function scene6() {
  const tPa = at(6, 'patron'), tP = at(6, 'Saint Rose');
  return prairieGround(1290, 11, '#a88a50')
    + flowers(1330, 1560, 12, { seed: 5, colors: ['#f6c42a', '#f2b020', '#ffd84a'] })
    + glow(540, 1080, 470, 0.7)
    + seq((o) => duchesne(540, 1320, 2.45, { halo: true, armL: [30, 2, 3], armR: [40, 2, 3.3], propR: rosary(), ...o }), [
      [0, { mood: 'happy' }], [tPa, { mood: 'determined', look: [0, -0.6] }], [tP, { mood: 'tender' }]])
    + `<g opacity="0"${walkIn(tPa - 0.1, -160)}>${potaKid(195, 1335, 1.5, 1, { mood: 'joy', armL: 10, armR: [130, 12, 1.4], look: [2, -0.8] })}</g>`
    + `<g opacity="0"${walkIn(tPa + 0.3, 160)}>${potaKid(820, 1335, 1.5, 0, { flip: true, mood: 'joy', armL: 10, armR: [120, 12, 1.5], look: [2, -0.8] })}</g>`
    + motes(12, { seed: 19, y0: 600, y1: 1250 })
    + NEAR(bokeh(7, { seed: 29 }));
}

const dusk = at(4, 'Hours later') - 0.1;
export const STORY = {
  slug: SLUG, name: 'St_Rose_Philippine_Duchesne_Sugar_Creek',
  bg3d: './duchesne_sugar_creek.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' }, bg3d_vars: { dusk },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cast: { verhaegen: { voice: { bm_george: 0.75, am_onyx: 0.25 }, speed: 0.95 } },
  thumb_hook: 'Too weak to teach, so she prayed', thumb_title: 'St. Rose Philippine Duchesne', thumb_scene: 0, thumb_t: 7.2,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'fˈɪlᵻpˌiːn': 'fˌiːlɪpˈiːn',                         // Philippine (fee-lih-PEEN)
    'dˈʌtʃɛsni': 'duːʃˈeɪn',                            // Duchesne (doo-SHAYN)
    'vˈɜːhiːdʒən': 'vɚhˈɑːɡən',                          // Verhaegen (ver-HAH-gen)
    'kwˈɑːkɑːkˌænuːmˌæd': 'kwˌɑːkɑːkɑːnˈʌmɑːd',          // Quahkahkanumad (kwah-kah-kah-NUM-ahd)
    'noʊvˈɛmbɚɹ ˈeɪtiːn': 'noʊvˈɛmbɚɹ eɪtˈiːnθ',        // November 18 -> eighteenth
  },
  scenes: [
    { kicker: '1841 · SUGAR CREEK, KANSAS', title: 'Too Weak to Teach', art: scene0, bg3d: 'prairieHook', cam: { move: 'push-fast', ox: 470, oy: 950 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Too old. Too sick. She could not even speak their language.', 'So why did a whole tribe give her a new name?', 'This is Saint Rose Philippine Duchesne.'] },
    { kicker: 'FROM FRANCE TO AMERICA', title: 'A Childhood Dream', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['As a girl in France, she dreamed of serving Native Americans.', 'At 49, she finally crossed the ocean to the Missouri frontier.'] },
    { kicker: '1841 · ST. CHARLES, MISSOURI', title: 'Past Seventy', art: scene2, cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['In 1841, the Jesuits opened a mission for the Potawatomi in Kansas.', 'But she was past seventy, and weak.'] },
    { kicker: 'FATHER PETER VERHAEGEN, S.J.', title: 'She Must Come', art: scene3, cam: { move: 'push', ox: 540, oy: 950 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['Father Verhaegen insisted:', { text: 'She must come. She may not be able to do much work, but she will assure success to the mission by praying for us.', who: 'verhaegen' }] },
    { kicker: 'SUGAR CREEK MISSION · KANSAS', title: 'She Prayed for Hours', art: scene4, bg3d: 'chapel', cam: { move: 'dolly', amt: 0.08, ox: 520, oy: 950 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['So she went. While the sisters taught, she prayed for hours.', 'One famous story says the children dropped corn on her habit, to test her.', { text: 'Hours later, not one kernel had moved.', speed: 0.85 }] },
    { kicker: 'QUAH-KAH-KA-NUM-AD', title: 'Woman Who Prays Always', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['They named her Quahkahkanumad: Woman Who Prays Always.', 'She never learned their language, but her prayer spoke to every heart.'] },
    { kicker: 'FEAST DAY · NOVEMBER 18', title: 'Patron of Perseverance', art: scene6, bg3d: 'prairieGlory', cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is November 18. She is patron of perseverance in hard times.', 'Saint Rose Philippine Duchesne, pray for us.'] },
  ],
};
