// St. George: "The Dragon on a Leash" (one story: the dragon of Silene, a medieval legend about the real martyr George,
// as told in the Golden Legend, 1260s; Caxton's English, Fordham sourcebook). Feast: April 23.
// The spear strike is hidden in a flash of light and dust; the dragon is never wounded on screen. The legend ends with
// George killing the dragon after the city is baptized: not narrated or shown.
// New (exported for later reels): George (Roman armor, red cloak, red-cross shield, lance with red-cross pennant),
// cartoon dragon (fierce/meek, standing/lying, belt leash), princess in bridal veil with tiara and red belt,
// lake with poison mist, treasure chest, sign-of-the-cross glow.
import { W, M, SKIES, GOLD, sky, sun, rays, beam, clouds, hill, waves, sparkles, motes, foliage, tufts, flowers,
  person, palm_frond, book, ground, dark, light, rng, f, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';
import { roman, horse, rider, tent } from './martin_of_tours.mjs';
import { cityWall } from './francis_wolf_of_gubbio.mjs';
import { sheep, followers } from './peter.mjs';
import { column } from './cecilia_wedding_angel.mjs';
import { font } from './bakhita_freedom.mjs';
import { dust } from './perpetua_arena.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const swap = (a, b, at, dur = 0.45) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const MURK = [[0, '#1e2a2e'], [0.4, '#3e5452'], [0.75, '#7a8a72'], [1, '#a8a888']];
const DUSKG = [[0, '#3a2a4a'], [0.4, '#8a5a6a'], [0.75, '#d8a07a'], [1, '#f0c890']];
const HALL = [[0, '#2a1a26'], [0.4, '#5a3440'], [1, '#8a5a50']];

// Line starts (s from scene start), from `node build.mjs stories/george_dragon.mjs info`
const T = { s0c: 8.8, s1b: 5.11, s2b: 5.62, s2c: 7.85, s3b: 2.68, s3c: 6.82, s4b: 1.67, s4c: 4.3, s4d: 6.86, s5b: 2.71, s5c: 6.95, s6b: 3.05, s6c: 6.22, s6d: 8.86 };

// ---------------------------------------------------------------- characters
export const SKG = '#d9a47e', HAIRG = '#2a1a12', REDX = '#c8323a';
// George: Roman soldier in bronze armor and red cloak (helmet off so his face reads)
export const george = (x, y, s, o = {}) => roman(x, y, s, { skin: SKG, hair: HAIRG, helmet: false, ...o });
// Lance with a white pennant bearing the red cross (his traditional flag); h = shaft above the hand
export const lance = (h = 340) => `<g><rect x="-5" y="${-h}" width="10" height="${h + 90}" rx="4" fill="#8a6234"/><rect x="0" y="${-h}" width="5" height="${h + 90}" fill="#6b4a2a" opacity=".6"/>`
  + `<path d="M0 ${-h - 50} L-11 ${-h} L11 ${-h}Z" fill="#c4ccd6"/><path d="M0 ${-h - 50} L11 ${-h} L2 ${-h}Z" fill="#8a96a6"/>`
  + `<g transform="translate(5,${-h + 10})"><g${M.sway(5, 1.5, 0, 0, 0)}><path d="M0 0 H100 L84 28 L100 56 H0Z" fill="#f6f2e8"/><path d="M36 0 V56 M0 28 H92" stroke="${REDX}" stroke-width="12"/></g></g></g>`;
// White shield with the red cross, held on the arm
export const crossShield = (s = 1) => `<g transform="scale(${s})"><ellipse rx="44" ry="56" fill="#f6f2e8" stroke="#b8bcc6" stroke-width="6"/><path d="M0 -50 V50 M-40 0 H40" stroke="${REDX}" stroke-width="15"/>`
  + `<ellipse cx="14" rx="30" ry="50" fill="#1a1020" opacity=".08"/></g>`;
// The sign of the cross: a glowing cross that pops in at `at`
const signCross = (at) => `<g transform="translate(0,-40)"><g${M.in('pop', at, 0.7, 0, 0)}><circle r="62" fill="url(#haloGlow)"${M.pulse(0.1, 1.8)}/><path d="M0 -32 V32 M-21 -10 H21" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/></g></g>`;

// Princess of Silene: dressed as a bride (white veil, tiara), red belt (the "girdle" of the legend)
export const BELT = '#c8323a';
const VEILB = '#fbf6ee';
const bVeilBack = `<path d="M-48 -292 Q-92 -200 -82 -50 L82 -50 Q92 -200 48 -292 Q0 -322 -48 -292Z" fill="${VEILB}" opacity=".88"/>`;
const bVeilTop = `<path d="M-47 -258 Q-50 -314 0 -316 Q50 -314 47 -258 Q42 -292 0 -294 Q-42 -292 -47 -258Z" fill="${VEILB}"/>`;
const tiara = `<path d="M-30 -300 L-24 -320 L-12 -307 L0 -326 L12 -307 L24 -320 L30 -300Z" fill="${GOLD}"/><circle cy="-312" r="4.5" fill="${REDX}"/>`;
const girdleB = `<path d="M-40 -126 Q0 -114 40 -126 L42 -110 Q0 -98 -42 -110Z" fill="${BELT}"/><rect x="-9" y="-124" width="18" height="16" rx="3" fill="${GOLD}"/>`;
export const princess = (x, y, s, { bride = true, belt = true, ...o } = {}) => person(x, y, s, {
  kind: 'layman', robe: true, girl: true, top: '#f3e6ee', skin: '#c48a5f', hair: '#1e140e', beard: null, ...o,
  under: (bride ? bVeilBack : '') + (o.under || ''), over: (belt ? girdleB : '') + (bride ? bVeilTop : '') + tiara + (o.over || '') });
export const beltProp = `<g><path d="M0 0 Q18 44 6 96" stroke="${BELT}" stroke-width="13" fill="none" stroke-linecap="round"/><rect x="-1" y="88" width="16" height="16" rx="3" fill="${GOLD}"/></g>`;
// King of Silene
const king = (x, y, s, o = {}) => person(x, y, s, { kind: 'royal', top: '#6a2a6e', skin: '#b97c52', hair: '#cfc8be', beard: '#cfc8be', ...o });
const folk = (x, y, s, i, o = {}) => person(x, y, s, { kind: 'layman', girl: i % 2 === 1, robe: i % 2 === 1, top: ['#8a6a4a', '#5a6a8a', '#a05a4a', '#6a7a4a'][i % 4],
  pants: '#4a3a30', skin: ['#b97c52', '#c48a5f', '#9a6340', '#d9a47e'][i % 4], hair: ['#1a120c', '#2a1e16', '#3a2a20', '#1a120c'][i % 4], beard: i % 4 === 0 ? '#1a120c' : null, ...o });
const chest = `<g transform="translate(0,-8)"><circle cy="-18" r="56" fill="url(#haloGlow)" opacity=".6"/><rect x="-40" y="-30" width="80" height="44" rx="6" fill="#8a5a32"/><rect x="-40" y="-30" width="80" height="10" fill="#6a4224"/>`
  + `<path d="M-40 -30 Q0 -62 40 -30" fill="#a8743a"/>${[-24, -8, 8, 24].map((cx, i) => `<circle cx="${cx}" cy="${-36 - (i % 2) * 6}" r="9" fill="${GOLD}"/>`).join('')}<rect x="-6" y="-24" width="12" height="14" rx="2" fill="${GOLD}"/></g>`;

// ---------------------------------------------------------------- the dragon
// Cartoon dragon, faces right (flip to face left). mood 'fierce' (slit eyes, open jaws, green poison breath, beating
// wings) | 'meek' (round eyes, smile, slow wings). pose 'stand' | 'lie'. leash: draws the red belt around its neck.
const dragonHead = (pose) => (pose === 'lie' ? { hx: 178, hy: -64, rot: 8 } : { hx: 150, hy: -262, rot: 0 });
export function dragonNeck(x, y, s = 1, { pose = 'stand', flip = false } = {}) {   // world point where the belt sits
  const { hx, hy } = dragonHead(pose), nx = hx - 62, ny = hy + (pose === 'lie' ? 10 : 46);
  return [x + (flip ? -nx : nx) * s, y + ny * s];
}
export function dragon(x, y, s = 1, { mood = 'fierce', pose = 'stand', flip = false, leash = false, c = '#4f8a5a' } = {}) {
  const d = dark(c, 0.28), l = light(c, 0.35), belly = '#dcd89a', fierce = mood === 'fierce', lie = pose === 'lie';
  const { hx, hy, rot } = dragonHead(pose);
  const top = (bx) => -110 - 82 * Math.sqrt(Math.max(0, 1 - (bx / 130) ** 2));
  const tail = `<g transform="translate(-112,-96)"><g${M.sway(fierce ? 8 : 5, fierce ? 1.2 : 2.6, 0, 0, 0)}><path d="M0 0 Q-120 34 -170 -40 Q-190 -84 -158 -112" stroke="${c}" stroke-width="34" fill="none" stroke-linecap="round"/>`
    + `<path d="M-158 -112 L-198 -152 L-150 -142 L-138 -102Z" fill="${d}"/></g></g>`;
  const wing = (back) => `<g transform="translate(${back ? -30 : -6},-166)"><g${M.sway(fierce ? 10 : 4, fierce ? 0.8 : 2.8, back ? 0.25 : 0, 0, 0)}>`
    + `<path d="M0 0 L-56 -176 L-186 -206 Q-152 -154 -162 -112 Q-120 -112 -110 -62 Q-70 -72 -48 -20Z" fill="${back ? d : dark(c, 0.12)}"/>`
    + `<path d="M0 0 L-56 -176 M-56 -176 L-136 -124 M-56 -176 L-92 -70" stroke="${l}" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>`;
  const leg = (lx, back) => `<rect x="${lx - 19}" y="-74" width="38" height="76" rx="17" fill="${back ? d : c}"/><path d="M${lx - 14} 0 h28" stroke="#efe6cc" stroke-width="6" stroke-linecap="round" stroke-dasharray="5 6"/>`;
  const spikes = [-100, -66, -30, 6, 42].map((bx) => { const ty = top(bx); return `<path d="M${bx - 13} ${f(ty + 6)} L${bx} ${f(ty - 24)} L${bx + 13} ${f(ty + 6)}Z" fill="${d}"/>`; }).join('');
  const body = `<ellipse cx="0" cy="-110" rx="130" ry="82" fill="${c}"/><ellipse cx="22" cy="-80" rx="96" ry="44" fill="${belly}"/>`
    + [-30, 2, 34, 66].map((bx) => `<path d="M${bx} -118 Q${bx + 8} -82 ${bx} -42" stroke="${dark(belly, 0.15)}" stroke-width="4" fill="none"/>`).join('')
    + `<path d="M-96 -150 Q-40 -186 30 -180" stroke="${l}" stroke-width="7" fill="none" opacity=".5" stroke-linecap="round"/>` + spikes;
  const neck = lie ? `<path d="M80 -110 Q130 -90 ${hx - 30} ${hy}" stroke="${c}" stroke-width="66" fill="none" stroke-linecap="round"/>`
    : `<path d="M74 -150 Q130 -180 ${hx - 34} ${hy + 30}" stroke="${c}" stroke-width="66" fill="none" stroke-linecap="round"/><path d="M96 -130 Q136 -170 ${hx - 18} ${hy + 44}" stroke="${belly}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  const eye = fierce
    ? `<g data-blink="1.1 8 -14"><ellipse cx="8" cy="-14" rx="14" ry="11" fill="#f6d84a"/><ellipse cx="9" cy="-14" rx="3.5" ry="10" fill="#2b1d14"/></g><path d="M-10 -32 L26 -22" stroke="#1e2a1e" stroke-width="6" stroke-linecap="round"/>`
    : `<g data-blink="1.1 8 -14"><ellipse cx="8" cy="-14" rx="11" ry="13" fill="#2b1d14"/><circle cx="5" cy="-18" r="4" fill="#fff"/><circle cx="12" cy="-9" r="1.8" fill="#fff" opacity=".8"/></g>`
      + `<path d="M-6 -34 Q8 -40 22 -32" stroke="#1e2a1e" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="34" cy="2" rx="10" ry="6" fill="#ef6f6a" opacity=".35"/>`;
  const mouth = fierce
    ? `<path d="M18 18 Q60 44 96 22 L94 34 Q58 62 20 30Z" fill="#5a2620"/><path d="M40 24 l5 10 l5 -9 M60 27 l5 10 l5 -10 M80 24 l4 9 l4 -10" fill="#fbf6ea"/>`
    : `<path d="M40 22 Q62 32 84 20" stroke="#1e2a1e" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const breath = fierce ? [0, 1, 2, 3, 4].map((i) => `<g transform="translate(${104 + i * 10},${24 - i * 6})"><g${M.drift(140 + i * 20, -60 - i * 10)}><g${M.flick(1.6 + i * 0.3, i * 0.4, 0.15)}>`
    + `<circle r="${16 + i * 6}" fill="#9ad09a" opacity=".55" filter="url(#blur6)"/></g></g></g>`).join('') : '';
  const head = `<g transform="translate(${hx},${hy}) rotate(${fierce ? rot : rot + 14})"><g${M.sway(fierce ? 4 : 2, fierce ? 1.1 : 2.8, 0, -40, 30)}>`
    + `<path d="M-34 -30 Q-56 -76 -30 -92 Q-34 -62 -18 -40Z M-6 -38 Q-12 -86 18 -96 Q6 -66 10 -42Z" fill="#efe4cc"/>`
    + `<ellipse cx="0" cy="0" rx="62" ry="46" fill="${c}"/><ellipse cx="56" cy="16" rx="46" ry="30" fill="${light(c, 0.12)}"/><ellipse cx="60" cy="24" rx="34" ry="14" fill="${belly}" opacity=".7"/>`
    + `<circle cx="90" cy="6" r="4" fill="#1e2a1e"/><circle cx="80" cy="4" r="4" fill="#1e2a1e"/>${eye}${mouth}${breath}</g></g>`;
  const [nx, ny] = [hx - 62, hy + (lie ? 10 : 46)];
  const collar = leash ? `<g transform="translate(${nx},${ny}) rotate(${lie ? 70 : 36})"><ellipse rx="40" ry="14" fill="none" stroke="${BELT}" stroke-width="12"/><rect x="-8" y="6" width="16" height="16" rx="3" fill="${GOLD}"/></g>` : '';
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="10" cy="4" rx="170" ry="18" fill="#1a0f1a" opacity=".25" filter="url(#soft)"/>`
    + `<g${M.bob(fierce ? 4 : 2, fierce ? 1.1 : 2.6)}>${wing(true)}${tail}${leg(-70, true)}${leg(64, true)}${body}${leg(-44, false)}${leg(90, false)}${wing(false)}${neck}${head}${collar}</g></g>`;
}
// Belt leash from a hand point to the dragon's neck (slight sag)
const leashLine = ([x1, y1], [x2, y2]) => `<path d="M${f(x1)} ${f(y1)} Q${f((x1 + x2) / 2)} ${f(Math.max(y1, y2) + 60)} ${f(x2)} ${f(y2)}" stroke="${BELT}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
// Hand position of an unflipped person's right arm at angle a (degrees) — for attaching the leash
const handR = (x, y, s, a) => [x + s * (33 + 94 * Math.sin(a * Math.PI / 180)), y + s * (-198 + 94 * Math.cos(a * Math.PI / 180))];

// ---------------------------------------------------------------- set pieces
// Silene's walls with an open gate and roofs above, in the warm stone of a North African town
function silene(y, { stone = '#d8b88a', open = true, h = 280 } = {}) {
  const roofs = [[-60, 90], [120, 120], [300, 80], [780, 110], [960, 90], [1120, 120]].map(([rx, rh]) =>
    `<rect x="${rx - 60}" y="${y - h - rh}" width="120" height="${rh}" fill="${light(stone, 0.12)}"/><rect x="${rx + 20}" y="${y - h - rh}" width="40" height="${rh}" fill="${dark(stone, 0.18)}" opacity=".6"/>`
    + `<path d="M${rx - 52} ${y - h - rh} q52 -46 104 0Z" fill="${light(stone, 0.2)}"/>`).join('');
  return roofs + cityWall(y, { stone, gateX: 540, open, h });
}
// Murky lake with mist; the dragon's home
function lake(base, { c = '#3e6a5a' } = {}) {
  return waves(base, 8, 260, 9, dark(c, 0.15), { foam: light(c, 0.3), op: 0.95 }) + waves(base + 40, 10, 300, 7, c, { phase: 0.4, foam: light(c, 0.35) })
    + waves(base + 90, 12, 340, 6, light(c, 0.08), { phase: 0.8, foam: light(c, 0.4) });
}
const mist = (y, seed = 3) => clouds(y, { color: '#a8c8a8', op: 0.32, drift: 50, seed, n: 3 });

// ---------------------------------------------------------------- scenes
// 0 · hook: the end of the legend — the princess leads the meek dragon through Silene's gate; George beside them
function scene0() {
  const dX = 900, dY = 1300, dS = 1.0, pA = 62;
  return FAR(sky(DUSKG) + glow(540, 760, 420, 0.55) + rays(540, 760, { op: 0.08 }))
    + BACK(clouds(520, { color: '#f0b8a0', op: 0.4, seed: 2 }) + silene(1140))
    + MID(hill(1180, 8, '#a87a5a', 3))
    + ground(1180, '#c8a074', { rim: '#ecc898' })
    + dragon(dX, dY, dS, { mood: 'meek', flip: true, leash: true })
    + princess(520, 1320, 1.9, { mood: 'happy', armL: 14, armR: pA })
    + leashLine(handR(520, 1320, 1.9, pA), dragonNeck(dX, dY, dS, { flip: true }))
    + george(205, 1320, 2.05, { mood: 'determined', halo: T.s0c, armL: 14, armR: 24, propR: lance(300) })
    + motes(14, { y0: 560, y1: 1240, seed: 4 })
    + NEAR(foliage('l', 1650, { color: '#3a2a24' }) + foliage('r', 1660, { color: '#3a2a24', seed: 5 }));
}

// 1 · a real Roman soldier (martyred about 303) … centuries later, this legend was told about him
function scene1() {
  const L = T.s1b;
  return FAR(sky([[0, '#7a3a48'], [0.3, '#d8805a'], [0.66, '#f6c48a'], [1, '#f8d8a0']]) + sun(820, 560, 50, 300))
    + BACK(hill(1060, 30, '#b88a6a', 4) + clouds(480, { seed: 6, op: 0.7 }))
    + MID(tent(150, 1150, 1.1) + tent(330, 1120, 0.8) + horse(860, 1240, 0.75, { flip: true }))
    + ground(1200, '#c8a878', { rim: '#ecd0a0' }) + tufts(1206, 10, '#9a7a4a', { seed: 3 })
    + george(480, 1320, 2.2, { mood: 'happy', armL: 14, armR: 24, propR: lance(330), propL: `<g transform="translate(-10,-30)">${crossShield(1)}</g>` })
    + `<g transform="translate(830,820)"><g${M.in('pop', L, 0.8)}><circle r="150" fill="url(#haloGlow)"${M.pulse(0.06, 2.4)}/><g transform="scale(4.2)">${book(true)}</g></g></g>`
    + `<g${fadeIn(L, 0.6)}>${sparkles(10, 700, 960, 680, 960, { seed: 7 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#4a3a24' }));
}

// 2 · Silene: a dragon in the lake poisons the land; two sheep a day; then children chosen by lot (worried townsfolk)
function scene2() {
  const S = T.s2b, K = T.s2c;
  return FAR(sky(MURK) + glow(300, 600, 300, 0.25))
    + BACK(silene(1000, { stone: '#a8987a', open: false, h: 240 }) + mist(760, 3))
    + MID(lake(1030) + `<g${M.tw([{ at: 0.2, dur: 1.6, from: { y: 160 }, to: { y: 0 }, ease: 'power2.out' }])}>${dragon(620, 1150, 1.05, { mood: 'fierce', flip: true })}</g>`)
    + ground(1200, '#5a6a4a', { rim: '#8a9a6a' }) + tufts(1206, 12, '#3a4a2a', { seed: 5 })
    + `<g${fadeIn(S, 0.5)}><g${fadeOut(K, 0.5)}>${sheep(170, 1300, 1.1, 0.2)}${sheep(330, 1320, 1.0, 0.6)}</g></g>`
    + `<g${fadeIn(K, 0.6)}>${folk(130, 1320, 1.55, 1, { mood: 'sad', armL: 20, armR: 20 })}${folk(300, 1335, 1.65, 0, { mood: 'worried', armL: 14, armR: [40, 3, 2] })}</g>`
    + motes(16, { y0: 700, y1: 1260, seed: 5, color: '#b8e0b0', size: [3, 9] })
    + NEAR(mist(1500, 8));
}

// 3 · the lot falls on the king's daughter: "Take my gold…"; dressed like a bride and sent to the lake
function scene3() {
  const K = T.s3b, B = T.s3c;
  return FAR(sky(HALL) + glow(540, 680, 340, 0.4))
    + BACK(`<rect x="-200" y="380" width="${W + 400}" height="900" fill="#6a3a3a"/><rect x="-200" y="380" width="${W + 400}" height="40" fill="#3a1e22"/>`
      + `<path d="M440 1200 V760 a100 100 0 0 1 200 0 V1200Z" fill="#2e1a1e"/>` + column(120, 1240, 820, { c: '#e2cca8' }) + column(960, 1240, 820, { c: '#e2cca8' }))
    + MID(followers(1150, 9, { color: '#3a2228' }))
    + ground(1230, '#8a5a44', { rim: '#b8846a' })
    + king(330, 1320, 2.0, { mood: 'sad', talk: [K, B - 0.6], armL: [40, 3, 2], armR: [72, 4, 1.6], propR: chest })
    + swap(princess(760, 1320, 2.1, { bride: false, flip: true, mood: 'worried', armL: 14, armR: 14 }),
      princess(760, 1320, 2.1, { flip: true, mood: 'sad', armL: [30, 2, 3], armR: [30, 2, 3.3] }), B)
    + motes(8, { y0: 640, y1: 1200, seed: 3 })
    + NEAR(`<rect x="-200" y="1570" width="${W + 400}" height="500" fill="#1e1216" opacity=".5" filter="url(#blur14)"/>`);
}

// 4 · alone by the lake; George rides by; "Go away…"; the sign of the cross; he charges
function scene4() {
  const R = T.s4b, G = T.s4c, X = T.s4d;
  const hs = 1.12, ps = 1.3, hx = 830, hy = 1330;
  const mounted = `${horse(hx, hy, hs, { flip: true, walk: true })}${rider(george, hx, hy, hs, ps, { flip: true, mood: 'determined', armL: 20, armR: [24, 2, 3], propR: lance(300), propL: signCross(X) })}`;
  const arrive = M.tw([{ at: R - 0.4, dur: 1.6, from: { x: 560 }, to: { x: 0 }, ease: 'power2.out' }]);
  const charge = M.tw([{ at: X + 1.6, dur: 1.4, from: { x: 0 }, to: { x: -420 }, ease: 'power2.in' }]);
  return FAR(sky(MURK) + glow(700, 640, 320, 0.3))
    + BACK(mist(700, 6) + hill(1020, 20, '#4a5a4a', 7))
    + MID(lake(1060) + `<g${fadeIn(X + 0.9, 0.6)}><g${M.tw([{ at: X + 0.9, dur: 1.2, from: { y: 120 }, to: { y: 0 }, ease: 'power2.out' }])}>${dragon(445, 1070, 0.5, { mood: 'fierce' })}</g></g>`)
    + ground(1190, '#5a6a4a', { rim: '#8a9a6a' }) + tufts(1196, 10, '#3a4a2a', { seed: 8 })
    + `<g${fadeOut(G - 0.3, 0.45)}>${princess(220, 1320, 2.0, { mood: 'sad', armL: 14, armR: 14 })}</g>`
    + `<g${fadeIn(G - 0.3, 0.45)}><g${fadeOut(X, 0.4)}>${princess(220, 1320, 2.0, { mood: 'worried', talk: [G, X - 0.3], armL: 14, armR: [62, 4, 1.4] })}</g></g>`
    + `<g${fadeIn(X, 0.4)}>${princess(220, 1320, 2.0, { mood: 'worried', armL: [30, 2, 2], armR: [24, 2, 2.4] })}</g>`
    + `<g${charge}><g${arrive}>${mounted}</g></g>`
    + motes(12, { y0: 700, y1: 1260, seed: 9, color: '#b8e0b0', size: [3, 9] })
    + NEAR(mist(1520, 4));
}

// 5 · a flash hides the strike: the dragon lies down; "Give me your belt…"; it follows her, gentle as a lamb (dolly)
function scene5() {
  const Q = T.s5b, C = T.s5c;
  const dX = 870, dY = 1260, dS = 1.0, pA = 64;
  return FAR(sky(MURK) + glow(560, 700, 420, 0.5) + rays(560, 700, { op: 0.07 }))
    + BACK(mist(720, 2) + hill(1010, 16, '#4a5a4a', 2))
    + MID(lake(1050))
    + ground(1170, '#5e6e4c', { rim: '#94a46c' })
    + `<g${fadeOut(C, 0.5)}>${dragon(dX, dY, dS, { mood: 'meek', pose: 'lie', flip: true })}</g>`
    + george(220, 1300, 1.8, { mood: 'happy', talk: [Q, C - 0.4], armL: 22, armR: [40, 3, 2], propL: lance(300) })
    + swap(princess(470, 1320, 2.0, { mood: 'surprised', armL: 14, armR: [40, 3, 2] }),
      princess(470, 1320, 2.0, { mood: 'happy', belt: false, armL: 14, armR: pA }), C)
    + `<g${fadeIn(C, 0.5)}>${dragon(dX, dY, dS, { mood: 'meek', leash: true, flip: true })}${leashLine(handR(470, 1320, 2.0, pA), dragonNeck(dX, dY, dS, { flip: true }))}</g>`
    + dust(860, 1250, 1.2, { at: 0, hold: 0.9, c: '#e8f0d0' })
    + sparkles(10, 520, 980, 760, 1180, { seed: 3, size: 0.9 })
    + NEAR(mist(1520, 6));
}

// 6 · the people flee in fear; "Don't be afraid! Believe in Christ…"; fifteen thousand baptized (tilt-up + rack focus)
function scene6() {
  const P = T.s6b, B = T.s6c, Q = T.s6d;
  const dX = 975, dY = 1310, dS = 0.72;
  return FAR(sky(GOLDSKY) + rays(540, 620, { op: 0.12 }) + glow(540, 700, 480, 0.75))
    + BACK(silene(1120))
    + MID(swap(followers(1170, 12, { color: '#5a3a3a' }), followers(1170, 12, { color: '#7a5a4a' }), B, 0.6)
      + `<g${fadeIn(B, 0.6)}>${font(290, 1185, 1.1)}</g>`)
    + ground(1180, '#c8a074', { rim: '#f0d0a0' })
    + dragon(dX, dY, dS, { mood: 'meek', leash: true, flip: true })
    + princess(760, 1320, 1.6, { mood: 'happy', armL: 14, armR: 40 }) + leashLine(handR(760, 1320, 1.6, 40), dragonNeck(dX, dY, dS, { flip: true }))
    + george(490, 1310, 2.05, { mood: 'happy', talk: [P, B - 0.3], halo: Q, armL: [128, 4, 2], armR: 20 })
    + `<g${fadeIn(B + 0.3, 0.6)}>${folk(150, 1335, 1.35, 2, { kneel: true, mood: 'joy', armL: 20, armR: 20 })}</g>`
    + motes(16, { y0: 520, y1: 1240, seed: 6, color: '#fff2c4' })
    + NEAR(bokeh(6, { seed: 17 }));
}

// 7 · feast day portrait: George with lance, shield and martyr's palm; the meek dragon at his feet (arc)
function scene7() {
  return FAR(sky(SKIES.dusk, { stars: 22, seed: 5 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 2 }) + silene(1150, { stone: '#b08a8a' }))
    + glow(540, 1050, 480, 0.8)
    + MID(hill(1230, 14, '#5a3a52', 6))
    + ground(1250, '#4a3046', { rim: '#c08a7a' }) + tufts(1256, 10, '#2e1e32', { seed: 2 })
    + dragon(820, 1330, 0.62, { mood: 'meek', pose: 'lie', flip: true })
    + george(470, 1300, 2.3, { mood: 'happy', halo: 0.2, armL: [26, 2, 3], armR: 24, propR: lance(210), propL: palm_frond(0.95, -16) })
    + flowers(1300, 1360, 12, { seed: 3, colors: ['#ffffff', REDX, '#f6d36b'] })
    + motes(14, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(6, { seed: 12 }) + foliage('l', 1640, { color: '#2a1a34' }) + foliage('r', 1660, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_george_dragon', name: 'St_George_Dragon_on_a_Leash',
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'A dragon on a leash', thumb_title: 'St. George', thumb_shift: -20,
  wm_spots: [[56, 520, 'l'], [1024, 520, 'r'], [56, 1300, 'l']],
  // Character voices, nearest accent: no Greek or Libyan voice in Kokoro, so Italian for the Roman world (as in Perpetua)
  cast: {
    george: { voice: 'im_nicola', speed: 0.95 },
    princess: { voice: 'if_sara', speed: 0.98 },
    king: { voice: { im_nicola: 0.55, am_onyx: 0.45 }, speed: 0.88 },
  },
  fix: {
    'θɹˈiːhˈʌndɹɪd θɹˈiː': 'θɹˈiː ˈoʊ θɹˈiː',          // 303 -> three oh three
    'sˈaɪliːn': 'saɪlˈiːni',                            // Silene -> sy-LEE-nee
    'ˈeɪpɹəl twˈɛnti θɹˈiː': 'ˈeɪpɹəl twˈɛnti θˈɜːd',   // April 23 -> twenty-third
  },
  scenes: [
    { kicker: 'A FAMOUS LEGEND', title: 'A Dragon on a Leash', art: scene0, cam: { move: 'push-fast', oy: 1000, ox: 470 },
      tone: { speed: 1.0, gap: 0.24, gain: 1 },
      say: ['Everyone knows Saint George fought a dragon.', 'Almost no one knows how it ends: a princess leading that dragon into town, like a pet.', 'This is Saint George.'] },
    { kicker: 'A REAL SOLDIER · ABOUT 303', title: 'Soldier and Legend', art: scene1, cam: 'drift-r',
      tone: { speed: 1.0, gap: 0.26 },
      say: ['George was a real Roman soldier, killed for Christ around 303.', 'Centuries later, Christians told this famous legend about him.'] },
    { kicker: 'SILENE, LIBYA', title: 'A City in Terror', art: scene2, cam: 'pan-l',
      tone: { speed: 0.93, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['In the city of Silene, a dragon lived in a lake, and its breath poisoned the land.', 'The people fed it two sheep a day.', 'When the sheep ran out, they chose children by lot.'] },
    { kicker: 'THE KING’S DAUGHTER', title: 'Take My Gold', art: scene3, cam: { move: 'push', amt: 0.07, ox: 540, oy: 1000 },
      tone: { speed: 0.92, gap: 0.32, gain: -1.5 },
      say: ['Then the lot fell on the king’s own daughter.', { text: 'Take my gold and silver, all I have. Just let me keep my daughter!', who: 'king' },
        'The people said no. So she was dressed like a bride and sent to the lake.'] },
    { kicker: 'THE LAKE', title: 'Go Away, Young Man', art: scene4, cam: 'pan-r',
      tone: { speed: 1.0, gap: 0.24, gain: 1 },
      say: ['She waited there alone.', 'Then George rode by. She cried out:', { text: 'Go away, good young man, or you will die too!', who: 'princess' },
        'But George made the sign of the cross and charged.'] },
    { kicker: 'THE BELT', title: 'Gentle as a Lamb', art: scene5, cam: { move: 'dolly', amt: 0.08, ox: 560, oy: 1000 },
      tone: { speed: 0.93, gap: 0.32 },
      say: ['His spear threw the dragon to the ground.', { text: 'Give me your belt. Tie it around its neck, and do not be afraid.', who: 'george' },
        { text: 'And the dragon followed her, as gentle as a lamb.', beat: 0.9, speed: 0.85 }] },
    { kicker: 'THE CITY GATES', title: 'Set Free', art: scene6, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.28, gain: 0.5 },
      say: ['When the people ran in fear, George called out:', { text: 'Do not be afraid! Believe in Christ, and be baptized.', who: 'george' },
        'Then fifteen thousand men were baptized.', 'A city ruled by fear was set free by faith.'] },
    { kicker: 'FEAST DAY · APRIL 23', title: 'Patron of Soldiers', art: scene7, cam: { move: 'arc-l', amt: 0.06, oy: 1000 },
      tone: { speed: 0.95, gap: 0.28 },
      say: ['His feast day is April 23.', 'He is a patron of soldiers, scouts and England. Saint George, pray for us.'] },
  ],
};
