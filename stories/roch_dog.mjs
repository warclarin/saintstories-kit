// San Roque (St. Roch): "The Dog with the Bread" (one story). Born rich in Montpellier, Roch gave his goods to the poor
// and went to Italy as a pilgrim, nursing plague victims. Near Piacenza he caught the plague himself, was driven out
// and withdrew into the forest (near Sarmato), where a dog belonging to the nobleman Gottardo Pallastrelli brought him
// bread every day; Gottardo followed the dog, found Roch, cared for him and became his follower. Roch recovered and
// went back to the sick. Feast August 16; patron of dogs, invalids and against plague. Dates and details are largely
// legend (Wikipedia: "uncertain and full of legendary elements"), so the story is told as tradition.
// Sources: Wikipedia "Saint Roch"; Scuola Grande di San Rocco (Venice) "St. Roch"; reliquarian.com.
// The plague sore of his iconography is shown as a bandage on the thigh (no wounds on screen).
// New (exported for later reels): roch (pilgrim: wide hat with scallop shell, cloak, staff with gourd; sick: bandage),
// breadDog (hunting dog, optional loaf in its mouth), gottardo (nobleman hunter), lean-to hut, sickbed.
import { W, M, SKIES, SKIN, GOLD, CREAM, sky, sun, rays, clouds, hill, sparkles, motes, foliage, tufts, flowers, petals,
  person, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { chateau, gothic } from './joan_of_arc.mjs';
import { plumedCap, bunting, tree } from './francis.mjs';
import { gubbio, cityWall } from './francis_wolf_of_gubbio.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const swap = (a, b, at, dur = 0.45) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;
const walkIn = (at, dx, dur = 1.2) => M.tw([{ at, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);

// Line starts (s from scene start), from `node build.mjs stories/roch_dog.mjs info`
const T = { s1b: 5.46, s3b: 3.19, s4b: 4.03, s4c: 9.0, s5b: 3.45, s5c: 6.01 };

// ---------------------------------------------------------------- people
const SKR = SKIN.fair, HAIRR = '#5a3a22';
const shell = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0 8 L-11 -6 Q0 -16 11 -6Z" fill="#f6ead0"/><path d="M0 8 L-6 -9 M0 8 V-11 M0 8 L6 -9" stroke="#c8b48a" stroke-width="1.6"/></g>`;
const pilgrimHat = `<ellipse cx="0" cy="-286" rx="78" ry="16" fill="#6a4a2a"/><path d="M-42 -288 Q-40 -326 0 -330 Q40 -326 42 -288Z" fill="#7a5634"/>`
  + `<path d="M8 -328 Q40 -322 42 -288 L20 -288Z" fill="#5a3c22" opacity=".5"/><path d="M-78 -286 Q0 -272 78 -286" stroke="#4a321c" stroke-width="3" fill="none"/>` + shell(0, -306, 1.2);
const cloak = '<path d="M-40 -210 Q-74 -120 -70 -28 L70 -28 Q74 -120 40 -210Z" fill="#8a3a2a"/><path d="M40 -210 Q74 -120 70 -28 L48 -28 Q52 -120 26 -200Z" fill="#6a2a1e" opacity=".6"/>';
const capelet = '<path d="M-42 -212 Q0 -190 42 -212 L46 -168 Q0 -150 -46 -168Z" fill="#9a4a32"/>' + shell(-22, -186, 0.9) + shell(22, -186, 0.9);
const bandage = '<path d="M-27 -78 h23 v14 h-23Z" fill="#fbf6ea"/><path d="M-27 -71 h23" stroke="#e0d6c0" stroke-width="2"/>';
/** The pilgrim staff with a gourd (water bottle) tied near the top. */
export const staff = `<g transform="translate(0,6)"><rect x="-4" y="-250" width="8" height="300" rx="4" fill="#7a5536"/><rect x="0" y="-250" width="4" height="300" fill="#5a3d22" opacity=".6"/>`
  + '<circle cy="-252" r="9" fill="#8a6440"/><g transform="translate(10,-200)"><ellipse cx="0" cy="12" rx="11" ry="15" fill="#c89a4a"/><circle cy="-6" r="7" fill="#c89a4a"/><rect x="-3" y="-16" width="6" height="6" fill="#6a4a2a"/></g></g>';
/** St. Roch. pilgrim: hat with scallop shell, red cloak with shell capelet, short tunic, staff. sick: bandage on the thigh.
 * rich: the young heir in Montpellier (red-and-gold doublet, no hat). */
const cloakSit = '<path d="M-40 -210 Q-62 -160 -58 -112 L58 -112 Q62 -160 40 -210Z" fill="#8a3a2a"/><path d="M40 -210 Q62 -160 58 -112 L42 -112 Q46 -160 26 -200Z" fill="#6a2a1e" opacity=".6"/>';
const bandageSit = '<path d="M-40 -121 h20 v34 h-20Z" fill="#fbf6ea"/><path d="M-40 -104 h20" stroke="#e0d6c0" stroke-width="2"/>';
export const roch = (x, y, s, { rich = false, sick = false, hat = true, over = '', under = '', ...o } = {}) => person(x, y, s, {
  kind: 'layman', top: rich ? '#a82a3a' : '#b89a6a', pants: rich ? '#2e2a46' : '#6a5a48', skin: SKR, hair: HAIRR, beard: rich ? null : HAIRR,
  under: (rich ? '' : o.sitting || o.kneel ? cloakSit : cloak) + under,
  over: (rich ? `<path d="M-37 -150 H37" stroke="${GOLD}" stroke-width="6"/><path d="M0 -206 V-104" stroke="${GOLD}" stroke-width="4"/>` : capelet) + (sick ? (o.sitting ? bandageSit : bandage) : '')
    + (hat && !rich ? pilgrimHat : '') + over, ...o });
/** Gottardo Pallastrelli, the nobleman whose dog fed Roch: green hunting doublet, plumed cap, dark beard. */
export const gottardo = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#3a6a44', pants: '#4a3a2a', skin: SKIN.priest, hair: '#2a1a10', beard: '#2a1a10', ...o,
  over: '<path d="M-37 -132 H37" stroke="#6a4a2a" stroke-width="8"/>' + plumedCap + (o.over || '') });
const poor = (x, y, s, o = {}) => person(x, y, s, { kind: 'elder', top: '#7a6a5a', skin: SKIN.s3, ...o });

/** A brown hunting dog walking or sitting; bread: a loaf held in its mouth. Faces right (flip for left). */
export function breadDog(x, y, s = 1, { c = '#a8703e', bread = false, flip = false, sit = false, wag = true } = {}) {
  const d = dark(c, 0.25), l = light(c, 0.45);
  const legs = sit
    ? `<ellipse cx="-26" cy="-8" rx="24" ry="12" fill="${d}"/><rect x="20" y="-46" width="15" height="46" rx="7" fill="${c}"/><rect x="40" y="-44" width="15" height="44" rx="7" fill="${d}"/>`
    : [-40, -22, 22, 40].map((lx, i) => `<g transform="translate(${lx},-24)"><g${M.sway(14, 0.55, i % 2 ? 0.27 : 0, 0, 0)}><rect x="-7" y="0" width="14" height="26" rx="6" fill="${i % 2 ? d : c}"/></g></g>`).join('');
  const body = sit ? `<ellipse cx="4" cy="-46" rx="44" ry="40" fill="${c}"/><ellipse cx="22" cy="-50" rx="18" ry="28" fill="${l}"/>` : `<ellipse cx="0" cy="-40" rx="56" ry="28" fill="${c}"/><ellipse cx="4" cy="-28" rx="34" ry="12" fill="${l}" opacity=".6"/>`;
  const hx = sit ? 34 : 52, hy = sit ? -96 : -66;
  const loaf = bread ? '<g transform="translate(36,16) rotate(-8)"><ellipse rx="26" ry="12" fill="#d89a4a"/><ellipse cx="-2" cy="-4" rx="20" ry="7" fill="#eab868"/><path d="M-12 -6 q4 -4 8 0 M2 -7 q4 -4 8 0" stroke="#b07a34" stroke-width="2" fill="none"/></g>' : '';
  const head = `<g transform="translate(${hx},${hy})"><ellipse cx="-16" cy="-6" rx="12" ry="24" fill="${d}" transform="rotate(20 -16 -6)"/><circle r="28" fill="${c}"/>`
    + `<ellipse cx="20" cy="10" rx="20" ry="14" fill="${l}"/><circle cx="36" cy="6" r="6" fill="#2b1d14"/>${loaf}`
    + `<g data-blink="0.4 0 -8"><ellipse cx="6" cy="-8" rx="4.5" ry="6" fill="#2b1d14"/><circle cx="5" cy="-10" r="1.5" fill="#fff"/></g></g>`;
  const tail = `<g transform="translate(${sit ? -30 : -50},${sit ? -40 : -50})"><g${wag ? M.sway(22, 0.5, 0, 0, 0) : ''}><path d="M0 0 Q-30 -12 -38 -46" stroke="${c}" stroke-width="11" fill="none" stroke-linecap="round"/></g></g>`;
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="2" rx="62" ry="10" fill="#1a0f1a" opacity=".22" filter="url(#soft)"/>`
    + `<g${M.bob(2, sit ? 2.6 : 0.55)}>${tail}${legs}${body}${head}</g></g>`;
}

// ---------------------------------------------------------------- set pieces
/** A lean-to of branches and leaves (Roch's shelter in the woods). */
export function leanTo(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-170 0 L-60 -230 L40 -236 L190 0Z" fill="#4a3a26"/><path d="M-60 -230 L40 -236 L190 0 L120 0Z" fill="#3a2c1c"/>`
    + Array.from({ length: 9 }, (_, i) => `<path d="M${-150 + i * 34} 0 L${-56 + i * 11} -228" stroke="#6a5034" stroke-width="7"/>`).join('')
    + [[-110, -60], [-40, -150], [30, -110], [100, -40], [-80, -190], [10, -200]].map(([lx, ly], i) => `<ellipse cx="${lx}" cy="${ly}" rx="46" ry="22" fill="${i % 2 ? '#3e5a2e' : '#4a6a34'}" transform="rotate(${i * 23 - 30} ${lx} ${ly})"/>`).join('')
    + '<ellipse cx="0" cy="-4" rx="150" ry="16" fill="#8a7a4a" opacity=".7"/></g>';
}
/** A sickbed with a patient (head on the pillow, under a blanket). */
export function sickbed(x, y, s = 1, { blanket = '#6a7fa8', skin = SKIN.s3, hair = '#3a2418' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-110" width="16" height="110" fill="#6a4a30"/><rect x="134" y="-80" width="16" height="80" fill="#6a4a30"/>`
    + '<rect x="-146" y="-70" width="292" height="22" fill="#7e5a3c"/><ellipse cx="-110" cy="-86" rx="38" ry="16" fill="#f4ecd8"/>'
    + `<circle cx="-104" cy="-108" r="26" fill="${skin}"/><path d="M-130 -110 Q-128 -136 -104 -136 Q-80 -134 -80 -116 Q-96 -126 -130 -110Z" fill="${hair}"/>`
    + '<path d="M-114 -108 q5 3 10 0 M-98 -108 q5 3 10 0" stroke="#2b1d14" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    + `<path d="M-84 -112 Q20 -132 146 -96 L146 -62 L-90 -62Z" fill="${blanket}"/><path d="M-84 -112 Q20 -132 146 -96" stroke="${light(blanket, 0.3)}" stroke-width="6" fill="none"/></g>`;
}
const candle = (h = 50) => `<g><rect x="-5" y="${-h}" width="10" height="${h}" rx="3" fill="#f4ecd8"/><g${M.flick(0.7)}><ellipse cx="0" cy="${-h - 10}" rx="5" ry="10" fill="#ffd27a"/></g><circle cy="${-h - 10}" r="30" fill="url(#sunGlow)" opacity=".7"/></g>`;
const coins = '<g><path d="M-14 -6 Q-16 -30 0 -32 Q16 -30 14 -6 Q0 2 -14 -6Z" fill="#8a5a34"/><circle cx="-4" cy="-30" r="5" fill="#f2c46b"/><circle cx="6" cy="-28" r="5" fill="#f2c46b"/></g>';
const loafProp = '<g transform="translate(6,-6)"><ellipse rx="22" ry="11" fill="#d89a4a"/><ellipse cx="-2" cy="-4" rx="16" ry="6" fill="#eab868"/></g>';
const cup = '<g transform="translate(4,-10)"><path d="M-10 -12 L10 -12 L8 8 L-8 8Z" fill="#a8b4c0"/><ellipse cy="-12" rx="10" ry="3" fill="#7ab0d8"/></g>';

// ---------------------------------------------------------------- scenes
// 0 · hook (3D forest at dusk, push-fast): Roch sick under his lean-to; the dog arrives with bread in its mouth
function scene0() {
  return MID(leanTo(300, 1250, 1.15))
    + ground(1240, '#3a3a24', { rim: '#6a6a3a' }) + tufts(1246, 10, '#2a2a18', { seed: 4 }) + flowers(1260, 1330, 6, { seed: 3, colors: ['#f6d36b', '#ffffff'] })
    + roch(310, 1350, 1.9, { sitting: true, sick: true, mood: 'happy', armL: [20, 2, 3], armR: [64, 4, 1.6] })
    + breadDog(660, 1360, 1.55, { bread: true, flip: true })
    + glow(560, 1000, 360, 0.55) + motes(16, { x0: 200, x1: 900, y0: 700, y1: 1250, seed: 5 })
    + NEAR(foliage('l', 1660, { color: '#1a2214' }) + foliage('r', 1640, { color: '#1a2214', seed: 6 }) + bokeh(6, { seed: 8 }));
}

// 1 · Montpellier: the young heir gives his money to the poor, then sets out as a pilgrim
function scene1() {
  const B = T.s1b;
  return FAR(sky(SKIES.day) + sun(820, 520, 60, 300) + clouds(420, { seed: 3, op: 0.8 }))
    + BACK(hill(1080, 40, '#9ab878', 2) + gothic(760, 1090, 0.62) + chateau(250, 1090, 0.55))
    + MID(hill(1160, 18, '#b8c890', 5) + tree(990, 1210, 0.4, '#5a9a50'))
    + ground(1210, '#d8c08a', { rim: '#ead8a8' }) + tufts(1216, 8, '#8a9a5a', { seed: 2 })
    + swap(roch(420, 1330, 2.05, { rich: true, mood: 'happy', armL: 10, armR: [62, 3, 2], propR: coins }),
      roch(420, 1330, 2.05, { mood: 'determined', armL: 14, armR: [26, 2, 2.6], propR: staff }), B, 0.6)
    + `<g${fadeOut(B + 0.4, 0.8)}>${poor(720, 1330, 1.85, { flip: true, mood: 'joy', armL: 10, armR: [58, 3, 2] })}</g>`
    + `<g${fadeIn(B + 0.4, 0.8)}>${poor(760, 1330, 1.7, { flip: true, mood: 'joy', armL: 10, armR: [130, 8, 1.3] })}${person(900, 1330, 1.3, { kind: 'kid', top: '#c96a4a', flip: true, mood: 'joy', armR: [140, 10, 1.1] })}</g>`
    + NEAR(foliage('r', 1660, { color: '#2a4a2a' }) + bokeh(5, { seed: 4, op: [0.2, 0.45] }));
}

// 2 · the plague hospital: while others ran, Roch stayed to nurse the sick
function scene2() {
  const wall = '#b8936a';
  const run = M.tw([{ at: 0.6, dur: 3.2, from: { x: 0, opacity: 1 }, to: { x: 260, opacity: 0 }, ease: 'power1.in' }]);
  return FAR(`<rect x="-200" y="-200" width="${W + 400}" height="2400" fill="${wall}"/>` + glow(540, 760, 500, 0.5))
    + BACK('<path d="M-200 520 Q540 400 1280 520 V600 H-200Z" fill="#9a7650"/>'
      + [180, 540, 900].map((ax) => `<path d="M${ax - 110} 1190 V720 a110 110 0 0 1 220 0 V1190" fill="none" stroke="#9a7650" stroke-width="26"/>`).join('')
      + '<path d="M820 1190 V840 a90 90 0 0 1 180 0 V1190Z" fill="#f6dfa8"/>')
    + MID(sickbed(250, 1200, 0.85, { blanket: '#7a8aa8' }) + sickbed(820, 1170, 0.7, { blanket: '#8a7a9a', skin: SKIN.s1 })
      + `<g transform="translate(560,1180)">${candle()}</g>`
      + `<g${run}>${person(910, 1190, 1.0, { kind: 'layman', top: '#5a6a7a', mood: 'worried', flip: true, armL: [40, 10, 0.5], armR: [40, 10, 0.5] })}</g>`)
    + ground(1230, '#7a5a40', { rim: '#9a7650' })
    + sickbed(540, 1320, 1.2, { blanket: '#6a7fa8', skin: SKIN.s2 })
    + roch(830, 1350, 1.75, { kneel: true, flip: true, hat: false, mood: 'happy', armL: [20, 2, 3], armR: [70, 4, 1.8], propR: cup })
    + motes(10, { y0: 700, y1: 1200, seed: 7 })
    + NEAR(bokeh(5, { seed: 6, op: [0.2, 0.45] }));
}

// 3 · near Piacenza (3D misty forest, pan-l): he catches the plague, is driven out, and limps alone into the woods
function scene3() {
  const B = T.s3b;
  const limp = M.tw([{ at: 0, dur: 9, from: { x: 120 }, to: { x: -60 }, ease: 'none' }]);
  return MID(`<g transform="translate(640,0)">${cityWall(1180, { stone: '#8a8a94', gateX: 380, h: 200 })}</g>`)
    + ground(1240, '#3a4236', { rim: '#5a6a52' }) + tufts(1246, 10, '#232a20', { seed: 7 })
    + `<g${limp}>${swap(roch(520, 1350, 1.95, { sick: true, mood: 'worried', armL: 12, armR: [30, 4, 1.4], propR: staff }),
      roch(520, 1350, 1.95, { sick: true, mood: 'sad', armL: 12, armR: [30, 4, 1.4], propR: staff }), B)}</g>`
    + `<g${fadeIn(B, 0.8)}>${person(960, 1260, 1.15, { kind: 'layman', top: '#5a5a6a', mood: 'stern', flip: true, armL: 10, armR: [80, 3, 2] })}</g>`
    + NEAR(foliage('l', 1660, { color: '#151c14' }) + foliage('r', 1650, { color: '#151c14', seed: 9 }));
}

// 4 · the dog with the bread (3D forest light, dolly): day after day; Gottardo follows it; "In the woods, he found Roch."
function scene4() {
  const B = T.s4b, C = T.s4c;
  return MID(leanTo(250, 1250, 1.05))
    + ground(1240, '#3a4426', { rim: '#6a7a3a' }) + tufts(1246, 10, '#26301a', { seed: 5 }) + flowers(1256, 1330, 6, { seed: 8, colors: ['#f6d36b', '#ffffff'] })
    + swap(roch(250, 1350, 1.85, { sitting: true, sick: true, mood: 'surprised', armL: [20, 2, 3], armR: [70, 4, 1.6] }),
      roch(250, 1350, 1.85, { sitting: true, sick: true, mood: 'happy', armL: [20, 2, 3], armR: [70, 4, 1.6] }), B)
    + `<g${walkIn(0.3, 260, 1.6)}>${breadDog(530, 1360, 1.45, { bread: true, flip: true })}</g>`
    + `<g${walkIn(B + 0.3, 300, 1.6)}><g${fadeOut(C + 0.3, 0.4)}>${gottardo(860, 1350, 1.9, { mood: 'worried', flip: true, armL: 12, armR: [40, 3, 2] })}</g>`
    + `<g${fadeIn(C + 0.3, 0.4)}>${gottardo(860, 1350, 1.9, { mood: 'surprised', flip: true, armL: [30, 3, 2], armR: [80, 3, 1.6] })}</g></g>`
    + `<g${fadeIn(C + 0.2, 1)}>${glow(300, 1080, 360, 0.6)}${sparkles(12, 120, 520, 900, 1250, { seed: 9 })}</g>`
    + NEAR(foliage('l', 1660, { color: '#182214' }) + bokeh(6, { seed: 11 }));
}

// 5 · Gottardo cares for him; Roch gets well and goes back to the sick (tilt-up + rack focus); the quotable line
function scene5() {
  const B = T.s5b;
  return FAR(sky([[0, '#d8884a'], [0.35, '#f2b870'], [0.7, '#f8dca0'], [1, '#f8dca0']]) + sun(560, 760, 70, 460) + rays(560, 760, { op: 0.1 }))
    + BACK(hill(1060, 50, '#7a9a5a', 4) + tree(120, 1140, 0.55, '#4a8a4a') + tree(980, 1150, 0.5, '#4a8a4a'))
    + MID(hill(1160, 20, '#9ab870', 6) + leanTo(860, 1220, 0.6))
    + ground(1220, '#a8b070', { rim: '#c8d090' }) + flowers(1230, 1320, 12, { seed: 5 })
    + `<g${fadeOut(B, 0.6)}>${roch(380, 1350, 1.9, { sitting: true, sick: true, mood: 'peaceful', armL: [20, 2, 3], armR: [24, 2, 3] })}`
    + `${gottardo(680, 1340, 1.85, { kneel: true, flip: true, mood: 'happy', armL: 14, armR: [62, 3, 2], propR: loafProp })}</g>`
    + `<g${fadeIn(B, 0.6)}>${roch(400, 1340, 2.0, { mood: 'joy', halo: B + 0.4, armL: [24, 2, 3], armR: [26, 2, 2.6], propR: staff })}`
    + `${gottardo(720, 1340, 1.85, { flip: true, mood: 'joy', armL: 12, armR: [30, 2, 2.4] })}</g>`
    + breadDog(560, 1390, 1.2, { sit: true, flip: true })
    + motes(14, { y0: 700, y1: 1250, seed: 6 })
    + NEAR(bokeh(7, { seed: 14 }));
}

// 6 · feast portrait: Roch with halo, hat and staff, the dog at his side with its loaf; fiesta bunting (arc)
function scene6() {
  return FAR(sky([[0, '#2a2a5a'], [0.4, '#6a4a7a'], [0.68, '#e8906a'], [1, '#f8c87a']], { stars: 18, seed: 5 }) + rays(540, 820, { op: 0.12 }))
    + BACK(hill(1100, 40, '#4a3a5a', 3) + gothic(540, 1110, 0.55, { wall: '#c8b0a8', win: '#ffd98a' }))
    + MID(bunting(430, { seed: 4 }))
    + ground(1240, '#5a4a4a', { rim: '#8a6a6a' }) + flowers(1250, 1330, 10, { seed: 9 })
    + glow(500, 900, 460, 0.9)
    + roch(470, 1350, 2.25, { halo: true, mood: 'happy', armL: [24, 2, 3], armR: [26, 2, 2.6], propR: staff })
    + breadDog(760, 1360, 1.4, { sit: true, bread: true, flip: true })
    + petals(14, { seed: 15, colors: [GOLD, '#ffffff', '#f28fa6'] })
    + NEAR(bokeh(7, { seed: 19 }));
}

export const STORY = {
  slug: 'st_roch_dog', name: 'San_Roque_The_Dog_with_the_Bread',
  bg3d: './roch_dog.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'A dog kept him alive', thumb_title: 'San Roque', thumb_scene: 6, thumb_t: 3, thumb_shift: -170,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 760, 'l']],
  fix: {
    'sˌæn ɹˈoʊk': 'sˌɑːn ɹˈoʊkɛ',        // San Roque -> sahn ROH-keh
    'mˈɔntpɪliɚ': 'mˌɔnpɛljˈeɪ',         // Montpellier -> mon-pel-YAY
    'pˈaɪəsˌɛnzə': 'pjɑːtʃˈɛntsɑː',      // Piacenza -> pyah-CHEN-tsah
    'ɡətˈɑːɹdoʊ': 'ɡɔtˈɑːɹdoʊ',          // Gottardo -> got-TAR-doh
  },
  scenes: [
    { kicker: 'NEAR PIACENZA · ITALY', title: 'The Dog with the Bread', art: scene0, bg3d: 'forestDusk', cam: { move: 'push-fast', oy: 1150 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Sick with the plague, alone in a forest.', 'Every day, a dog came with bread in its mouth.', 'This is Saint Roch, San Roque.'] },
    { kicker: 'MONTPELLIER · FRANCE', title: 'Born Rich', art: scene1, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Roch was born rich in Montpellier, France.', 'His father had chosen him to rule the city.', 'But he gave everything to the poor and walked to Italy as a pilgrim.'] },
    { kicker: 'ITALY · A TIME OF PLAGUE', title: 'He Stayed', art: scene2, cam: 'drift-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['Plague was spreading.', 'While others ran, Roch stayed to nurse the sick.', 'Tradition says many were healed through his prayers.'] },
    { kicker: 'PIACENZA', title: 'Driven Out', art: scene3, bg3d: 'forestMist', cam: 'pan-l',
      tone: { speed: 0.95, gap: 0.3, gain: -1.5, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['Near Piacenza, he caught the plague himself.', 'Driven out of town, he lay alone in the woods.'] },
    { kicker: 'THE FOREST', title: 'Day After Day', art: scene4, bg3d: 'forestLight', cam: { move: 'dolly', amt: 0.08, ox: 400, oy: 1050 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['Then a dog came, carrying a loaf of bread, day after day.', 'One day, its master, a nobleman named Gottardo, followed it.',
        { text: 'In the woods, he found Roch.', beat: 0.9, speed: 0.85 }] },
    { kicker: 'HEALED', title: 'Back to the Sick', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Gottardo cared for him and became his follower.', 'Roch got well and went back to the sick.', 'Everyone ran from him. A dog ran to him.'] },
    { kicker: 'FEAST · AUGUST 16', title: 'San Roque', art: scene6, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast is August 16. He is the patron of dogs and the sick.', 'San Roque, pray for us.'] },
  ],
};
