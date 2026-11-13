// Jesús Nazareno de Quiapo, the Black Nazarene (whole history of the image): carved by an unknown Mexican sculptor,
// brought to Manila by galleon from Acapulco in the early 1600s; "one famous story" says a fire on the ship darkened it
// (legend: historians say it is dark mesquite wood); Pope Innocent X approved its confraternity (bull of April 20, 1650);
// later moved to Quiapo; survived the 1929 fire that destroyed Quiapo Church and the 1945 bombing of Manila; the
// Traslación every January 9: devotees walk barefoot and pull the carriage (ándas) with two ropes (2026: 9.6 million).
// Renamed "Jesús Nazareno" in 2024. Sources: Wikipedia "Black Nazarene", "Feast of the Black Nazarene"; Inquirer
// "In The Know: Feast of the Black Nazarene"; UCA News.
// New (exported for later reels): nazareno (the image: dark Christ kneeling under a black cross with brass tips, maroon
// velvet tunic with gold embroidery, crown of thorns, the three gold rays; wood: true for the bare carving), andas
// (processional carriage), quiapoChurch, devotee (maroon/yellow shirt, towel, barefoot), towel, ropes, sculptor, papalBull.
import { W, M, SKIES, SKIN, GOLD, CREAM, sky, sun, rays, clouds, hill, sparkles, motes, foliage, tufts, petals,
  person, ship, crowd, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { augustinian } from './santo_nino_cebu.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const swap = (a, b, at, dur = 0.45) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;
const embers = (n, seed, y0 = 700, y1 = 1300) => motes(n, { y0, y1, seed, color: '#ffb070', size: [2, 6], rise: 120 });

// Line starts (s from scene start), from `node build.mjs stories/black_nazarene.mjs info`
const T = { s2b: 3.51, s2c: 6.78, s3b: 5.28, s4b: 4.16, s4c: 8.27, s5b: 5.88, s5c: 8.79 };

// ---------------------------------------------------------------- the image (base at 0, ~360 units tall at s = 1)
const SKINN = '#4a2c22', SKINND = '#2e1a14', HAIRB = '#160c08', MAROON = '#7a1628', MAROOND = '#4e0c1a';
const WOOD = '#6b4a30', WOODD = '#4a3020', WOODL = '#8a6440';
// the cross: from the top end (front, upper left) down over the near shoulder to the foot (behind, lower right)
const C0 = [-200, -355], C1 = [150, -10];
const at = (t) => [C0[0] + (C1[0] - C0[0]) * t, C0[1] + (C1[1] - C0[1]) * t];
const beamSeg = (t0, t1, c, w = 18) => { const [a, b] = at(t0), [x, y] = at(t1); return `<path d="M${a} ${b} L${x} ${y}" stroke="${c}" stroke-width="${w}" stroke-linecap="butt"/>`; };
function brassTip(x, y, ang) {
  return `<g transform="translate(${x},${y}) rotate(${ang})"><path d="M-11 -2 L11 -2 L11 6 L0 16 L-11 6Z" fill="${GOLD}"/><path d="M0 -2 L11 -2 L11 6 L0 16Z" fill="${dark(GOLD, 0.3)}"/></g>`;
}
function crossBar(cBeam, wood) {
  const [px, py] = at(0.1), nx = -0.703, ny = 0.713, L = 62;
  const e1 = [px + nx * L, py + ny * L], e2 = [px - nx * L, py - ny * L];
  return `<path d="M${e1[0]} ${e1[1]} L${e2[0]} ${e2[1]}" stroke="${cBeam}" stroke-width="17"/>`
    + `<path d="M${e1[0] + 4} ${e1[1] + 4} L${e2[0] + 4} ${e2[1] + 4}" stroke="${wood ? WOODL : '#3a3036'}" stroke-width="3" opacity=".6"/>`
    + (wood ? '' : brassTip(e1[0], e1[1], 135 + 90) + brassTip(e2[0], e2[1], 45 - 90) + brassTip(...at(0), 135));
}
function potencias() {   // the three gold rays (tres potencias), reserved for images of Christ
  const ray = (ang) => `<g transform="rotate(${ang})"><path d="M-7 -40 L0 -86 L7 -40Z" fill="${GOLD}"/><path d="M-12 -44 L-6 -74 M12 -44 L6 -74" stroke="${GOLD}" stroke-width="3"/>`
    + `<circle cy="-88" r="6" fill="#fff0c0"/><path d="M0 -44 L0 -84" stroke="#fff4cc" stroke-width="1.6" opacity=".8"/></g>`;
  return `<g${M.pulse(0.04, 2.8)}>${ray(-58)}${ray(0)}${ray(58)}</g>`;
}
/** Jesús Nazareno (the Black Nazarene): the dark Christ kneeling on one knee under a black cross with brass tips,
 * maroon velvet tunic with gold embroidery, white lace collar and cuffs, gold belt, crown of thorns and the three
 * gold rays. Facing the viewer's left, face turned toward us. wood: the bare carving in the sculptor's workshop. */
export function nazareno(s = 1, { wood = false, aura = true, rays3 = true } = {}) {
  const robe = wood ? WOOD : MAROON, robeD = wood ? WOODD : MAROOND, skin = wood ? WOODL : SKINN, skinD = wood ? WOOD : SKINND;
  const hair = wood ? WOODD : HAIRB, beamC = wood ? WOODD : '#1e1a1e', gold = wood ? WOODL : GOLD;
  let g = `<g transform="scale(${s})">`;
  if (aura) g += '<circle cx="-20" cy="-200" r="200" fill="url(#haloGlow)" opacity=".8"/>';
  g += '<ellipse cx="-10" cy="2" rx="150" ry="16" fill="#1a0f1a" opacity=".3"/>';
  g += beamSeg(0.42, 1, beamC);                                                   // the stem behind the body
  g += `<ellipse cx="78" cy="-8" rx="20" ry="11" fill="${skinD}"/>`;               // the back foot, bare sole
  // robe over the kneeling legs: front knee raised (left), back knee on the ground (right)
  g += `<path d="M-46 -132 Q-104 -128 -116 -80 L-112 -8 Q-70 4 -24 -6 L64 -6 Q82 -46 52 -132Z" fill="${robe}"/>`
    + `<path d="M10 -132 L52 -132 Q82 -46 64 -6 L20 -4 Q40 -70 10 -132Z" fill="${robeD}" opacity=".55"/>`
    + `<path d="M-116 -80 Q-80 -96 -40 -88" stroke="${robeD}" stroke-width="4" fill="none" opacity=".6"/>`
    + `<ellipse cx="-118" cy="-6" rx="16" ry="8" fill="${skin}"/>`;                // the front foot
  if (!wood) g += `<path d="M-112 -14 Q-70 -2 -24 -12 L64 -12" stroke="${GOLD}" stroke-width="5" fill="none"/>`
    + [-96, -66, -36, -6, 24, 50].map((x, i) => `<path d="M${x} -26 q8 -12 16 0 q-8 6 -16 0Z" fill="${GOLD}" opacity=".85" transform="rotate(${i % 2 ? 8 : -8} ${x + 8} -26)"/>`).join('')
    + '<path d="M-90 -60 q10 -14 20 0 q10 14 20 0 M-20 -70 q10 -14 20 0 q10 14 20 0" stroke="#f2c46b" stroke-width="3" fill="none" opacity=".7"/>';
  // torso leaning forward, belt
  g += `<path d="M-48 -132 Q-60 -180 -46 -206 Q-12 -224 22 -208 Q46 -172 52 -132Z" fill="${robe}"/>`
    + `<path d="M4 -216 Q22 -210 28 -200 Q46 -170 52 -132 L18 -132 Q28 -176 4 -216Z" fill="${robeD}" opacity=".5"/>`
    + `<rect x="-52" y="-140" width="106" height="12" rx="4" fill="${gold}"/>`;
  if (!wood) g += '<path d="M-30 -196 q10 -10 20 0 q10 10 20 0 M-34 -170 q12 -10 24 0 q12 10 24 0" stroke="#f2c46b" stroke-width="3" fill="none" opacity=".75"/>'
    + '<path d="M-44 -214 q5 6 10 0 q5 6 10 0 q5 6 10 0 q5 6 10 0 q5 6 10 0 q5 6 10 0" stroke="#fbf4e2" stroke-width="5" fill="none" stroke-linecap="round"/>';
  // hair falling behind the shoulders
  g += `<path d="M-66 -262 Q-74 -200 -52 -186 L-2 -190 Q12 -210 8 -262 Q-28 -300 -66 -262Z" fill="${hair}"/>`;
  // head: dark skin, face toward us, gentle sorrow
  g += `<rect x="-38" y="-226" width="18" height="20" fill="${skinD}"/>`
    + `<circle cx="-30" cy="-250" r="34" fill="${skin}"/><path d="M-30 -284 A34 34 0 0 1 -30 -216 A23 34 0 0 0 -30 -284Z" fill="${skinD}" opacity=".4"/>`
    + `<path d="M-64 -252 Q-66 -290 -30 -290 Q6 -290 4 -252 Q0 -272 -14 -276 Q-30 -268 -46 -276 Q-60 -272 -64 -252Z" fill="${hair}"/>`
    + `<path d="M-60 -242 Q-58 -208 -30 -205 Q-2 -208 0 -242 Q-10 -224 -30 -226 Q-50 -224 -60 -242Z" fill="${hair}"/>`;
  if (!wood) g += '<ellipse cx="-42" cy="-250" rx="5" ry="6.4" fill="#120806"/><ellipse cx="-18" cy="-250" rx="5" ry="6.4" fill="#120806"/>'
    + '<circle cx="-43.5" cy="-252.5" r="2" fill="#fff"/><circle cx="-19.5" cy="-252.5" r="2" fill="#fff"/>'
    + '<path d="M-50 -262 Q-44 -265 -36 -268 M-24 -268 Q-16 -265 -10 -262" stroke="#120806" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
    + '<path d="M-36 -230 Q-30 -233 -24 -230" stroke="#2a1410" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  else g += '<path d="M-48 -250 q6 4 12 0 M-24 -250 q6 4 12 0" stroke="#3a2618" stroke-width="2.4" fill="none"/>';
  // crown of thorns
  g += `<path d="M-64 -268 Q-30 -282 4 -268" stroke="${wood ? WOODD : '#8a6a3a'}" stroke-width="7" fill="none"/>`
    + `<path d="M-64 -268 Q-30 -282 4 -268" stroke="${wood ? WOODL : GOLD}" stroke-width="2.4" fill="none" stroke-dasharray="5 5"/>`
    + [-58, -46, -34, -22, -10, 0].map((x, i) => `<path d="M${x} ${-270 - (i % 2) * 4} l${i % 2 ? 4 : -4} -9" stroke="${wood ? WOODD : '#6a4a2a'}" stroke-width="2.4"/>`).join('');
  if (rays3 && !wood) g += `<g transform="translate(-30,-252)">${potencias()}</g>`;
  // the front part of the cross over the near shoulder, then the hands gripping it
  g += beamSeg(0, 0.47, beamC) + beamSeg(0.02, 0.45, wood ? WOODL : '#3a3036', 3).replace('stroke-linecap="butt"', 'opacity=".6" transform="translate(4,4)"') + crossBar(beamC, wood);
  const hand = (t, cuff = true) => { const [x, y] = at(t); return (cuff && !wood ? `<ellipse cx="${x + 10}" cy="${y + 12}" rx="12" ry="8" fill="#fbf4e2"/>` : '') + `<ellipse cx="${x}" cy="${y + 2}" rx="12" ry="10" fill="${skin}"/><path d="M${x - 8} ${y - 4} q8 -4 16 0" stroke="${skinD}" stroke-width="2" fill="none"/>`; };
  g += `<path d="M-40 -196 Q-70 -200 ${at(0.36)[0] + 6} ${at(0.36)[1] + 10}" stroke="${robe}" stroke-width="22" fill="none" stroke-linecap="round"/>` + hand(0.36)
    + `<path d="M8 -192 Q-6 -160 ${at(0.47)[0] + 4} ${at(0.47)[1] + 12}" stroke="${robeD}" stroke-width="22" fill="none" stroke-linecap="round"/>` + hand(0.47);
  return g + '</g>';
}

// ---------------------------------------------------------------- props and set pieces
/** The processional carriage (ándas): a gilded platform on a dark base with lights at the corners. `top` is drawn on it. */
export function andas(x, y, s = 1, top = '') {
  const lamp = (lx) => `<g transform="translate(${lx},-150)"><rect x="-5" y="0" width="10" height="150" fill="${dark(GOLD, 0.35)}"/><circle cy="-8" r="13" fill="#fff0c0"/><circle cy="-8" r="42" fill="url(#sunGlow)" opacity=".8"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + '<rect x="-210" y="-30" width="420" height="30" rx="6" fill="#2a1a24"/><circle cx="-160" cy="0" r="18" fill="#1a1016"/><circle cx="160" cy="0" r="18" fill="#1a1016"/>'
    + `<rect x="-190" y="-92" width="380" height="64" rx="6" fill="${dark(GOLD, 0.15)}"/><rect x="-190" y="-92" width="380" height="14" fill="${GOLD}"/>`
    + [-140, -70, 0, 70, 140].map((cx) => `<path d="M${cx - 22} -44 q22 -26 44 0" stroke="${light(GOLD, 0.3)}" stroke-width="4" fill="none"/><circle cx="${cx}" cy="-56" r="5" fill="#c8323a"/>`).join('')
    + `<rect x="-160" y="-108" width="320" height="18" rx="5" fill="${GOLD}"/>`
    + lamp(-176) + lamp(176)
    + `<g transform="translate(0,-108)">${top}</g></g>`;
}
/** Quiapo Church (Minor Basilica and National Shrine of Jesús Nazareno): cream facade, two bell towers with domed
 * tops, a central dome behind. */
export function quiapoChurch(x, y, s = 1, { stone = '#e8d6b0', win = '#ffd98a', lit = true } = {}) {
  const sh = dark(stone, 0.2), hi = light(stone, 0.15), w = lit ? win : dark(stone, 0.45);
  const tower = (tx) => `<g transform="translate(${tx},0)"><rect x="-70" y="-560" width="140" height="560" fill="${stone}"/><rect x="30" y="-560" width="40" height="560" fill="${sh}" opacity=".5"/>`
    + `<rect x="-80" y="-380" width="160" height="14" fill="${hi}"/><rect x="-80" y="-560" width="160" height="16" fill="${hi}"/>`
    + `<path d="M-26 -480 v-50 a26 26 0 0 1 52 0 v50Z" fill="${w}" opacity=".9"/><path d="M-22 -300 v-40 a22 22 0 0 1 44 0 v40Z" fill="${w}" opacity=".7"/>`
    + `<rect x="-56" y="-640" width="112" height="80" fill="${stone}"/><path d="M-56 -640 Q0 -720 56 -640Z" fill="#c8a868"/><path d="M0 -716 v-40 M-12 -742 h24" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>`
    + `<path d="M-18 -580 v-34 a18 18 0 0 1 36 0 v34Z" fill="${w}" opacity=".85"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<path d="M-150 -520 Q-150 -700 0 -720 Q150 -700 150 -520Z" fill="${sh}"/><rect x="-12" y="-790" width="24" height="76" fill="${sh}"/><path d="M0 -790 v-40 M-14 -816 h28" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>`
    + `<rect x="-200" y="-470" width="400" height="470" fill="${stone}"/><rect x="80" y="-470" width="120" height="470" fill="${sh}" opacity=".4"/>`
    + `<path d="M-214 -470 L0 -560 L214 -470Z" fill="${hi}"/><path d="M-214 -470 H214" stroke="${sh}" stroke-width="10"/><path d="M-200 -240 H200" stroke="${sh}" stroke-width="7"/>`
    + `<circle cx="0" cy="-500" r="22" fill="${w}"/><path d="M0 -560 v-36 M-12 -584 h24" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>`
    + `<path d="M-56 0 V-140 a56 56 0 0 1 112 0 V0Z" fill="#3a2420"/><path d="M-56 0 V-140 a56 56 0 0 1 112 0" stroke="${hi}" stroke-width="6" fill="none"/>`
    + [-130, 130].map((wx) => `<path d="M${wx - 20} -330 v-60 a20 20 0 0 1 40 0 v60Z" fill="${w}" opacity=".85"/><path d="M${wx - 18} -90 v-50 a18 18 0 0 1 36 0 v50Z" fill="${dark(stone, 0.45)}"/>`).join('')
    + tower(-270) + tower(270) + '</g>';
}
/** A small white towel (bimpo), held up or over the shoulder. */
export const towel = (c = '#fbf8f0') => `<g><path d="M-4 -46 Q12 -50 22 -44 L18 2 Q6 6 -6 2Z" fill="${c}"/><path d="M8 -46 L6 2" stroke="${dark(c, 0.15)}" stroke-width="3" opacity=".6"/></g>`;
const shoulderTowel = '<path d="M-36 -206 Q-10 -214 14 -208 L16 -150 Q4 -146 -4 -152 L-6 -196 Q-24 -196 -34 -186Z" fill="#fbf8f0"/>';
const bare = (skin) => `<ellipse cx="-17" cy="-5" rx="15" ry="7.5" fill="${skin}"/><ellipse cx="17" cy="-5" rx="15" ry="7.5" fill="${skin}"/>`;
/** A barefoot devotee in the Nazareno colours (maroon or yellow shirt), towel over the shoulder. */
export const devotee = (x, y, s, i = 0, o = {}) => {
  const tops = ['#7a1628', '#e8b830', '#8a2234', '#f0c040'], skins = [SKIN.s1, SKIN.s0, SKIN.s3, SKIN.s2], sk = skins[i % 4];
  const girl = i % 3 === 2;
  return person(x, y, s, { kind: 'layman', girl, robe: false, top: tops[i % 4], pants: '#3a3448', skin: sk, hair: '#1a120c', beard: null, ...o,
    over: bare(sk) + (o.towel === false ? '' : shoulderTowel) + (o.over || '') });
};
/** The two great ropes of the Traslación, running from the carriage at (x1, y) off to the left. */
const ropes = (x0, x1, y, sag = 14) => [0, 1].map((k) => `<path d="M${x0} ${y + k * 46} Q${(x0 + x1) / 2} ${y + k * 46 + sag} ${x1} ${y + k * 46 - 8}" stroke="#c8a870" stroke-width="13" fill="none" stroke-linecap="round"/>`
  + `<path d="M${x0} ${y + k * 46} Q${(x0 + x1) / 2} ${y + k * 46 + sag} ${x1} ${y + k * 46 - 8}" stroke="#8a6a3a" stroke-width="13" fill="none" stroke-dasharray="6 10" opacity=".5"/>`).join('');
/** The sculptor: Mexican craftsman with a leather apron. */
export const sculptor = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#e8dcc0', pants: '#5a4630', skin: SKIN.s3, hair: '#2a1a10', beard: '#2a1a10', ...o,
  over: '<path d="M-34 -190 L34 -190 L40 -40 Q0 -30 -40 -40Z" fill="#8a5a34"/><path d="M-30 -196 L-18 -214 M30 -196 L18 -214" stroke="#6a4226" stroke-width="5"/>' + (o.over || '') });
const mallet = '<g transform="rotate(-30)"><rect x="-3" y="-44" width="6" height="44" fill="#6a4a2a"/><rect x="-14" y="-62" width="28" height="22" rx="4" fill="#9a7048"/></g>';
const chisel = '<g transform="rotate(40)"><rect x="-3" y="-38" width="6" height="26" fill="#6a4a2a"/><rect x="-2" y="-58" width="4" height="22" fill="#b8b8c0"/></g>';
/** A papal bull: parchment with a red seal and the crossed keys. */
export const papalBull = (s = 1) => `<g transform="scale(${s})"><path d="M-120 -150 L120 -150 L120 130 Q0 112 -120 130Z" fill="#f2e6c8"/><path d="M60 -150 L120 -150 L120 130 Q90 124 60 122Z" fill="#dccca4" opacity=".7"/>`
  + [-100, -70, -40, -10, 20, 50].map((y) => `<path d="M-90 ${y} H90" stroke="#8a7a5a" stroke-width="5" opacity=".55" stroke-linecap="round"/>`).join('')
  + `<path d="M-130 -160 h260 v20 h-260Z" fill="#c8b48a"/><path d="M-6 120 L-20 190 M6 120 L20 190" stroke="#c8323a" stroke-width="6"/>`
  + `<circle cx="0" cy="118" r="34" fill="#b0202e"/><circle cx="0" cy="118" r="26" fill="none" stroke="#e05a64" stroke-width="3"/>`
  + `<g stroke="${GOLD}" stroke-width="5" stroke-linecap="round"><path d="M-14 104 L14 132 M14 104 L-14 132"/></g><circle cx="-14" cy="104" r="5" fill="${GOLD}"/><circle cx="14" cy="104" r="5" fill="${GOLD}"/></g>`;
const candle = (h = 60) => `<g><rect x="-6" y="${-h}" width="12" height="${h}" rx="3" fill="#f4ecd8"/><g${M.flick(0.7)}><ellipse cx="0" cy="${-h - 11}" rx="6" ry="11" fill="#ffd27a"/></g><circle cy="${-h - 11}" r="26" fill="url(#sunGlow)" opacity=".6"/></g>`;
const flame = (x, y, s = 1, ph = 0) => `<g transform="translate(${x},${y}) scale(${s})"><g${M.pulse(0.12, 0.9 + ph * 0.3, ph, 0, 0)}>`
  + `<circle cy="-30" r="70" fill="url(#sunGlow)" opacity=".75"/><path d="M0 0 Q-34 -6 -26 -46 Q-20 -70 -4 -96 Q2 -70 14 -60 Q30 -40 26 -16 Q22 0 0 0Z" fill="#f07a2a"/>`
  + `<path d="M0 0 Q-18 -4 -14 -30 Q-10 -46 0 -60 Q6 -42 14 -32 Q18 -12 0 0Z" fill="#ffd27a"/></g></g>`;
const smokeWisps = (y, seed, op = 0.32) => clouds(y, { color: '#6a5a62', op, drift: 40, seed, n: 3 });

// ---------------------------------------------------------------- scenes
// 0 · hook: the Traslación at night (3D Manila 'feast'); the image on its carriage, a sea of devotees with towels
function scene0() {
  const raise = (i) => [150, 10, 1.1 + i * 0.13];
  return MID(crowd(1170, 14, { color: '#3a1626', flags: [['#7a1628', '#e8b830', '#fbf8f0']] }))
    + ground(1240, '#2a1a24', { rim: '#5a3040' })
    + glow(540, 960, 540, 1) + rays(540, 860, { n: 12, op: 0.1, len: 900 })
    + andas(560, 1310, 1.15, `<g${M.bob(3, 3.6)}>${nazareno(1.55)}</g>`)
    + devotee(175, 1390, 1.6, 0, { mood: 'joy', armR: 14, armL: raise(0), propL: towel() })
    + devotee(915, 1390, 1.6, 1, { flip: true, mood: 'joy', armR: 12, armL: raise(1), propL: towel() })
    + sparkles(16, 300, 780, 700, 1200, { seed: 6, color: '#ffe8b0' })
    + NEAR(bokeh(7, { seed: 9 }));
}

// 1 · early 1600s, Mexico: a sculptor carves Jesus kneeling under his cross (warm workshop, wood shavings)
function scene1() {
  const wall = '#c88a5a';
  return FAR(`<rect x="-200" y="-200" width="${W + 400}" height="2400" fill="${wall}"/>` + glow(260, 600, 420, 0.7))
    + BACK('<path d="M120 420 h300 v330 h-300Z" fill="#ffe2a8"/><path d="M270 420 v330 M120 585 h300" stroke="#8a5a34" stroke-width="12"/>'
      + '<path d="M110 410 h320 v350 h-320Z" fill="none" stroke="#7a4a2a" stroke-width="18"/>'
      + `<path d="M420 760 L900 1240 L560 1240 L120 760Z" fill="#fff0c8" opacity=".18"/>`
      + '<g transform="translate(860,600)" fill="#6a4226"><rect x="-120" y="0" width="240" height="14"/>'
      + '<g transform="translate(-80,14) rotate(8)"><rect x="-4" y="0" width="8" height="70"/></g><g transform="translate(-20,14)"><rect x="-6" y="0" width="12" height="60"/></g><g transform="translate(50,14) rotate(-6)"><rect x="-3" y="0" width="6" height="80"/></g></g>')
    + MID('<rect x="-200" y="1180" width="1480" height="40" fill="#7a5034"/>'
      + `<g transform="translate(860,1230)"><rect x="-120" y="-150" width="240" height="20" rx="4" fill="#8a5a34"/><rect x="-104" y="-130" width="16" height="130" fill="#6a4226"/><rect x="88" y="-130" width="16" height="130" fill="#6a4226"/></g>`)
    + ground(1230, '#a8754a', { rim: '#c8946a' })
    + `<g transform="translate(700,1300)"><rect x="-150" y="0" width="300" height="34" rx="6" fill="#7a5034"/>${nazareno(1.45, { wood: true, aura: false })}</g>`
    + sculptor(300, 1330, 1.95, { mood: 'happy', armL: [62, 4, 1.1], armR: [44, 3, 1.4], propL: mallet, propR: chisel })
    + motes(14, { x0: 120, x1: 900, y0: 640, y1: 1200, seed: 4, color: '#fff0c8' })
    + Array.from({ length: 10 }, (_, i) => `<path d="M${470 + i * 37} ${1290 + (i % 3) * 12} q8 -10 16 0" stroke="#e8c08a" stroke-width="4" fill="none"/>`).join('')
    + NEAR(bokeh(5, { seed: 12, op: [0.2, 0.45] }));
}

// 2 · across the Pacific (3D ocean 'dusk'): the galleon; "a fire broke out on board"; the image came out dark but whole
function scene2() {
  const F = T.s2b, R = T.s2c;
  const fire = `<g${fadeIn(F, 0.8)}><g${fadeOut(R + 0.4, 1)}>${flame(470, 1010, 0.9, 0)}${flame(560, 1000, 0.7, 1)}${flame(640, 1015, 0.8, 2)}${embers(22, 5, 700, 1050)}</g></g>`;
  const rise = M.tw([{ at: R, dur: 1.4, from: { y: 120, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }]);
  return MID(`<g${fadeOut(R, 0.8)}>${ship(560, 1110, 0.62, { crew: false })}${fire}</g>`
      + `<g${fadeIn(F, 1)}><g${fadeOut(R + 0.6, 1)}>${smokeWisps(640, 4, 0.4)}</g></g>`)
    + `<g${fadeIn(R, 1)}>${glow(560, 1060, 420, 0.9)}${rays(560, 1000, { n: 10, op: 0.08, len: 800 })}</g>`
    + `<g transform="translate(600,1320)"><g${rise}><g${M.bob(5, 4)}>${nazareno(1.45)}</g></g></g>`
    + `<g${fadeIn(R + 0.6, 1)}>${sparkles(14, 330, 800, 760, 1240, { seed: 9 })}</g>`;
}

// 3 · 1650: the papal bull (Pope Innocent X approves the confraternity); later the image comes to Quiapo
function scene3() {
  const B = T.s3b;
  const bull = M.tw([{ at: 0.2, dur: 1, from: { y: -90, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }, { at: B, dur: 0.6, from: { opacity: 1 }, to: { opacity: 0 } }]);
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + sun(540, 760, 64, 420) + rays(540, 760, { op: 0.08 }))
    + BACK(quiapoChurch(540, 1150, 0.92) + clouds(470, { color: '#fff0d8', op: 0.5, drift: 40, seed: 5 }))
    + MID(hill(1200, 10, '#c8a070', 3))
    + ground(1210, '#c8a070', { rim: '#e8c890' }) + tufts(1216, 8, '#8a9a5a', { seed: 5 })
    + andas(540, 1300, 0.85, `<g transform="translate(-60,0)">${candle()}</g><g transform="translate(70,0)">${candle()}</g>${nazareno(1.0)}`)
    + augustinian(190, 1340, 1.85, { kneel: true, mood: 'peaceful', armL: [28, 2, 3], armR: [28, 2, 3.3] })
    + augustinian(890, 1340, 1.85, { kneel: true, flip: true, mood: 'happy', armL: [28, 2, 3], armR: [28, 2, 3.3] })
    + `<g transform="translate(770,560)"><g${bull}><g${M.bob(5, 3.4)}>${papalBull(0.95)}</g></g></g>`
    + motes(14, { y0: 700, y1: 1250, seed: 6 })
    + NEAR(bokeh(6, { seed: 14 }));
}

// 4 · 1929 fire, 1945 bombing (3D Manila 'fire'); climax: "Each time, the Nazarene was saved."
function scene4() {
  const B = T.s4b, C = T.s4c;
  const church = `<g${fadeOut(C, 0.8)}>${quiapoChurch(540, 1160, 0.8, { stone: '#5a4048', win: '#ff9a4a', lit: true })}</g>`
    + `<g${fadeIn(C, 0.8)}>${quiapoChurch(540, 1160, 0.8, { stone: '#7a6058', win: '#ffd98a', lit: true })}</g>`;
  const rise = M.tw([{ at: C, dur: 1.4, from: { y: 100, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }]);
  return MID(church + `<g${fadeOut(C, 1)}>${flame(240, 1140, 1.0, 0)}${flame(860, 1130, 1.1, 2)}${smokeWisps(560, 3, 0.45)}</g>`)
    + ground(1230, '#2e2226', { rim: '#5a3a34' }) + tufts(1236, 8, '#1e1618', { seed: 2 })
    + `<g${fadeIn(C, 1)}>${glow(540, 1080, 460, 1)}${rays(540, 1020, { n: 12, op: 0.1, len: 900 })}</g>`
    + `<g transform="translate(560,1330)"><g${rise}>${nazareno(1.3)}</g></g>`
    + swap(devotee(150, 1370, 1.8, 0, { mood: 'worried', armL: [20, 2, 2], armR: [70, 3, 1.8], towel: false, top: '#5a4a3a' }),
      devotee(150, 1370, 1.8, 0, { mood: 'joy', armL: [20, 2, 2], armR: [140, 6, 1.4], towel: false, top: '#5a4a3a' }), C + 0.3)
    + swap(devotee(940, 1370, 1.8, 2, { flip: true, mood: 'worried', armL: 14, armR: [40, 2, 2.4], towel: false, top: '#4a4a5a' }),
      devotee(940, 1370, 1.8, 2, { flip: true, mood: 'joy', armL: 14, armR: [120, 6, 1.6], towel: false, top: '#4a4a5a' }), C + 0.3)
    + `<g${fadeOut(C, 1)}>${embers(26, 8, 600, 1260)}</g><g${fadeIn(C + 0.5, 1)}>${sparkles(16, 330, 790, 760, 1250, { seed: 9 })}</g>`;
}

// 5 · the Traslación: barefoot devotees pull the carriage with two great ropes; many pray for healing (human beat)
function scene5() {
  const P = T.s5b;
  const pull = (x, i, flipMood) => swap(
    devotee(x, 1380, 1.45, i, { mood: i % 2 ? 'sad' : 'worried', armL: [26, 2, 2.2], armR: [26, 2, 2.6] }),
    devotee(x, 1380, 1.45, i, { mood: flipMood, armL: [30, 3, 1.4], armR: [30, 3, 1.6] }), P);
  return FAR(sky([[0, '#2a1e4a'], [0.4, '#7a3e6a'], [0.7, '#e88a5a'], [1, '#f8c87a']], { stars: 16, seed: 3 }) + rays(760, 820, { op: 0.08 }))
    + BACK(quiapoChurch(820, 1120, 0.6, { stone: '#c8a888' }) + crowd(1130, 16, { color: '#3a1626', flags: [['#7a1628', '#e8b830', '#fbf8f0']] }))
    + MID(crowd(1210, 12, { color: '#4a1e30', flags: [['#e8b830', '#7a1628', '#fbf8f0']] }))
    + ground(1240, '#4a3040', { rim: '#7a5060' })
    + glow(800, 980, 420, 0.9)
    + andas(850, 1300, 0.95, `<g${M.bob(3, 3.6)}>${nazareno(1.15)}</g>`)
    + pull(100, 0, 'determined') + pull(285, 1, 'joy') + pull(470, 3, 'determined')
    + ropes(-80, 680, 1168)
    + motes(14, { x0: 500, x1: 1060, y0: 700, y1: 1200, seed: 6 })
    + NEAR(bokeh(6, { seed: 17, op: [0.25, 0.5] }));
}

// 6 · feast: January 9, the image enthroned in Quiapo, devotees with towels raised (arc portrait)
function scene6() {
  return FAR(sky([[0, '#2a1e4a'], [0.4, '#7a3e6a'], [0.7, '#e88a5a'], [1, '#f8c87a']], { stars: 20, seed: 6 }) + rays(540, 820, { op: 0.12 }))
    + BACK(quiapoChurch(540, 1110, 0.62, { stone: '#b89a88' }))
    + MID(crowd(1170, 16, { color: '#3a1626', flags: [['#7a1628', '#e8b830', '#fbf8f0']] }))
    + ground(1240, '#4a2e3e', { rim: '#7a5060' })
    + glow(540, 900, 460, 0.95)
    + `<g transform="translate(540,1270)"><rect x="-170" y="0" width="340" height="40" rx="6" fill="${dark(GOLD, 0.2)}"/><rect x="-170" y="0" width="340" height="10" fill="${GOLD}"/>`
    + `<g transform="translate(-150,0)">${candle(90)}</g><g transform="translate(150,0)">${candle(90)}</g><g${M.bob(4, 3.8)}>${nazareno(1.85)}</g></g>`
    + devotee(160, 1400, 1.5, 1, { mood: 'peaceful', armR: 12, armL: [150, 8, 1.3], propL: towel() })
    + devotee(925, 1400, 1.5, 0, { flip: true, mood: 'joy', armR: 12, armL: [150, 8, 1.5], propL: towel() })
    + petals(14, { seed: 15, colors: [GOLD, '#ffffff', '#7a1628'] })
    + NEAR(bokeh(7, { seed: 19 }));
}

export const STORY = {
  slug: 'black_nazarene', name: 'Jesus_Nazareno_The_Black_Nazarene',
  bg3d: './black_nazarene.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'santo.bg3d.js': './santo_nino_cebu.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'Millions walk barefoot for him', thumb_title: 'The Black Nazarene', thumb_scene: 6, thumb_t: 3, thumb_shift: -20,
  wm_spots: [[56, 1250, 'l'], [1024, 640, 'r'], [56, 760, 'l']],
  fix: {
    'wˈʌn θˈaʊzənd sˈɪkshˈʌndɹɪd z': 'sˈɪkstiːn hˈʌndɹɪdz',   // 1600s -> sixteen hundreds (narrate.py reads only 4-digit years)
    'dʒˈɛsəs': 'hɛsˈuːs',                                       // Jesús -> heh-SOOS (Spanish; "Jesus" stays English)
    'nˌæzɐɹˈɛnoʊ': 'nˌɑsɑɾˈɛnoʊ',                               // Nazareno -> nah-sah-REH-no
    'kwɪˈɑːpoʊ': 'kiˈɑːpoʊ',                                    // Quiapo -> kee-AH-po
  },
  // The published narration is ElevenLabs, not Kokoro: one take per scene from these prompts (eleven_v4, premade voice
  // "Brian - Deep, Resonant and Comforting"), saved as work/<slug>/vo/scene_<i>.mp3, then `python narrate_files.py
  // work/<slug>` (caption lines found in the take's pauses, long pauses capped at 0.65 s). `say` + narrate.py re-voices
  // with Kokoro instead (fix and tone above are for that). Plain prompts on purpose: a first version with emotion tags
  // ([dramatically], [hushed], [long pause], ellipses) was "too much emotion" for the user; Brian's natural read is right.
  vo: { engine: 'elevenlabs', model: 'eleven_v4', voice: 'nPczCjzI2devNBz1zQrb', scenes: [
    'Over nine million people. Bare feet. One dark wooden image of Jesus. This is /xeˈsus nasaˈɾeno/, the Black Nazarene.',
    'In the early 1600s, a Mexican sculptor carved Jesus, kneeling under his cross.',
    'A galleon carried him across the Pacific to Manila. One famous story says a fire broke out on board. The image came out dark, but whole.',
    'In 1650, Pope Innocent the Tenth approved a brotherhood in his honor. Later, he was brought to /kiˈapo/, his home to this day.',
    'In 1929, fire destroyed /kiˈapo/ Church. In 1945, bombs fell on Manila. [pause] Each time, the Nazarene was saved.',
    'Every January, millions walk barefoot beside him, many praying for healing. They pull his carriage with two great ropes. He carried the cross for us. Now his people carry him.',
    'His feast is January 9. Señor /xeˈsus nasaˈɾeno/, have mercy on us.',
  ] },
  scenes: [
    { kicker: 'JANUARY 9 · QUIAPO, MANILA', title: 'Millions Walk Barefoot', art: scene0, bg3d: 'manilaFeast', cam: { move: 'push-fast', oy: 1100 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Over nine million people. Bare feet.', 'One dark wooden image of Jesus.', 'This is Jesús Nazareno, the Black Nazarene.'] },
    { kicker: 'EARLY 1600s · MEXICO', title: 'Carved Under the Cross', art: scene1, cam: 'drift-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['In the early 1600s, a Mexican sculptor carved Jesus, kneeling under his cross.'] },
    { kicker: 'ACROSS THE PACIFIC', title: 'Fire at Sea', art: scene2, bg3d: 'oceanDusk', cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['A galleon carried him across the Pacific to Manila.', 'One famous story says a fire broke out on board.', 'The image came out dark, but whole.'] },
    { kicker: '1650 · MANILA', title: 'Blessed by Rome', art: scene3, cam: 'pull',
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['In 1650, Pope Innocent X approved a brotherhood in his honor.', 'Later, he was brought to Quiapo, his home to this day.'] },
    { kicker: '1929 · 1945 · QUIAPO', title: 'Through Fire and War', art: scene4, bg3d: 'manilaFire', cam: { move: 'dolly', amt: 0.08, ox: 560, oy: 1050 },
      tone: { speed: 1.0, gap: 0.28, gain: -0.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['In 1929, fire destroyed Quiapo Church.', 'In 1945, bombs fell on Manila.', { text: 'Each time, the Nazarene was saved.', beat: 0.5, speed: 0.85 }] },
    { kicker: 'EVERY JANUARY · MANILA', title: 'The Traslación', art: scene5, cam: 'pan-r',
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Every January, millions walk barefoot beside him, many praying for healing.', 'They pull his carriage with two great ropes.', 'He carried the cross for us. Now his people carry him.'] },
    { kicker: 'FEAST · JANUARY 9', title: 'Jesús Nazareno', art: scene6, cam: { move: 'arc-l', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast is January 9.', 'Señor Jesús Nazareno, have mercy on us.'] },
  ],
};
