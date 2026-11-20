// St. Edmund the Martyr: "the guardian wolf" (one story: after his death in 869 his people search the woods for his head, a
// voice answers "Here, here, here", and they find a grey wolf guarding it; the wolf follows them home like a tame animal).
// Feast: November 20. All-3D backgrounds (edmund_guardian_wolf.bg3d.js, built on anglia() from edmund_last_stand.bg3d.js),
// cam3d (one camera for 3D + SVG). Characters use hd(); Edmund, the Vikings and the props come from edmund_last_stand.mjs,
// the wolf from francis_wolf_of_gubbio.mjs (wolf2).
// Sources: Ælfric of Eynsham, "Life of St Edmund" (before 1002, after Abbo of Fleury's Passio Sancti Eadmundi, c. 985;
// modern translation by K. Seigfried, norsemyth.org): the Vikings hid the head in thick brambles so that it would not be
// buried; the people found only the body, went into the wood calling to each other "Where are you now, comrade?", and the
// head answered "Here! Here! Here!" until they all reached it; a grey wolf, sent by God, lay with its two feet clasped around
// the head, greedy and hungry, but dared not taste of it and kept it from the wild animals; they carried the head home and
// the wolf followed them to the town as if it were tame, then went back to the woods; they laid the head by the body and
// buried him, and built a church over him. Bury St Edmunds (formerly Beodricesworth) grew around his shrine; the wolf and
// head appear on the town's coat of arms (crest). Abbo heard the story from St. Dunstan, who heard it from Edmund's old
// sword-bearer.
// Content: the head is never drawn (no severed parts): the wolf guards a soft light and the fallen crown between its paws.
// New (exported): wolfWalk (side-view walking wolf), bramble, casket (a small wooden chest for carrying him home), buryCrest,
// thane, searcher.
import { W, M, GOLD, sparkles, bokeh, foliage, dark, light, f, rng, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { edmund, viking, crown, heavenCrown, threeCrowns, roundShield, longbow, LIGHT, lit, castShadow } from './edmund_last_stand.mjs';
import { wolf2 } from './francis_wolf_of_gubbio.mjs';

const at = wordTimes('st_edmund_guardian_wolf');

// one light per scene (added to the shared table, so lit()/castShadow() and the 3D set both see it)
Object.assign(LIGHT, {
  wHook:   { key: '#c8d0ff', from: 'r', tint: '#b8c0e8', amt: 0.16, rim: '#dce4ff', rimOp: 0.85 },
  wRaid:   { key: '#ff9a60', from: 'back', tint: '#ffa888', amt: 0.18, rim: '#ffb474', rimOp: 0.85 },
  wSearch: { key: '#d8d4f0', from: 'top', tint: '#a8a8cc', amt: 0.2, rim: '#e4e0ff', rimOp: 0.7 },
  wFind:   { key: '#ffe0b0', from: 'top', tint: '#c8b8d8', amt: 0.14, rim: '#ffe8c0', rimOp: 0.9 },
  wHome:   { key: '#ffc888', from: 'r', tint: '#ffd0a8', amt: 0.12, rim: '#ffe0b8', rimOp: 0.8 },
  wAbbey:  { key: '#ffc888', from: 'l', tint: '#ffe0b0', amt: 0.12, rim: '#fff0c8', rimOp: 0.8 },
  wGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
});

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walk = (t, dx, dur = 1.2, ease = 'power2.out') => M.tw([{ at: t, dur, from: { x: dx }, to: { x: 0 }, ease }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;

// ================================================================ props and set pieces (exported)
/** St. Edmund's arrow held upright as his emblem (copied from edmund_last_stand.mjs). */
export const heldArrow = (s = 1) => `<g transform="scale(${s})"><circle cy="-60" r="54" fill="url(#haloGlow)" opacity=".6"/><rect x="-3" y="-150" width="6" height="200" rx="2" fill="#8a6a3a"/>`
  + '<path d="M0 -168 L-9 -146 L9 -146Z" fill="#c4ccd6"/><path d="M0 34 L-10 52 L-10 66 L0 50Z" fill="#f2ece0"/><path d="M0 34 L10 52 L10 66 L0 50Z" fill="#c8323a"/></g>';
/** The crown lying on the ground (origin at its base), optionally with a soft holy light. */
export const groundCrown = (s = 1, rot = -14, shine = 0.8) => `<g transform="scale(${s}) rotate(${rot})">${shine ? `<circle cy="-20" r="110" fill="url(#haloGlow)" opacity="${shine}"/>` : ''}`
  + `<ellipse cx="0" cy="4" rx="50" ry="9" fill="#1a0f1a" opacity=".25"/><g transform="translate(0,290)">${crown}</g></g>`;
/** A bramble thicket: dark rounded leaf masses with thorny canes and a few berries (base at x, y). */
export function bramble(x, y, s = 1, { seed = 3, w = 260, c = '#24382a' } = {}) {
  const r = rng(seed); let g = '';
  for (let i = 0; i < 16; i++) { const cx = (r() - 0.5) * w, cy = -30 - r() * 120 * (1 - Math.abs(cx) / w); g += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(36 + r() * 34)}" fill="${i % 3 ? c : dark(c, 0.25)}"/>`; }
  for (let i = 0; i < 9; i++) { const cx = (r() - 0.5) * w * 0.9, cy = -60 - r() * 90; g += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(14 + r() * 14)}" fill="${light(c, 0.25)}" opacity=".8"/>`; }
  let canes = '';
  for (let i = 0; i < 7; i++) {
    const x0 = (r() - 0.5) * w * 0.8, x1 = x0 + (r() - 0.5) * 220, y1 = -150 - r() * 90, mx = (x0 + x1) / 2 + (r() - 0.5) * 80;
    canes += `<path d="M${f(x0)} -20 Q${f(mx)} ${f(y1 - 60)} ${f(x1)} ${f(y1 + 50)}" stroke="#5a3a3a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    for (let k = 1; k < 4; k++) { const t = k / 4, px = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * mx + t * t * x1, py = (1 - t) * (1 - t) * -20 + 2 * t * (1 - t) * (y1 - 60) + t * t * (y1 + 50); canes += `<path d="M${f(px)} ${f(py)} l${f(6 + r() * 4)} -${f(5 + r() * 4)}" stroke="#7a4a4a" stroke-width="3" stroke-linecap="round"/>`; }
  }
  for (let i = 0; i < 6; i++) g += `<circle cx="${f((r() - 0.5) * w * 0.8)}" cy="${f(-50 - r() * 100)}" r="6" fill="#3a1a3a"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><g${M.sway(1, 4.2, seed * 0.2, 0, 0)}>${g}${canes}</g></g>`;
}
/** A hand torch (held in a hand; small glow so it does not wash a face). */
export const handTorch = `<g transform="rotate(-8)"><rect x="-5" y="-150" width="10" height="170" rx="4" fill="#5a3a22"/><circle cy="-172" r="70" fill="url(#sunGlow)" opacity=".75"${M.flick(1.2, 0.3, 0.7)}/>`
  + `<g${M.pulse(0.12, 0.5, 0, 0, -150)}><path d="M0 -150 Q-16 -168 -4 -196 Q0 -180 6 -188 Q16 -168 0 -150Z" fill="#ff8a3a"/><path d="M0 -153 Q-7 -163 -1 -176 Q3 -166 4 -169 Q7 -160 0 -153Z" fill="#ffe08a"/></g></g>`;
/** A small wooden casket draped with a blue cloth and a gold cross (carried home; origin at its bottom centre). */
export const casket = (s = 1) => `<g transform="scale(${s})"><circle cy="-40" r="95" fill="url(#haloGlow)" opacity=".55"/><rect x="-62" y="-58" width="124" height="58" rx="6" fill="#6a4228"/>`
  + `<path d="M-66 -58 Q0 -86 66 -58 Z" fill="#7a5032"/><path d="M-52 -66 Q0 -84 52 -66 L58 -20 Q0 -8 -58 -20Z" fill="#2f4f8f"/><path d="M-52 -66 Q0 -84 52 -66" stroke="${GOLD}" stroke-width="4" fill="none"/>`
  + `<path d="M0 -62 V-26 M-12 -48 H12" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/><rect x="-62" y="-8" width="124" height="8" fill="#4a2e1a"/></g>`;
/** The crest of Bury St Edmunds as a simple badge: a blue shield with three gold crowns, a grey wolf sitting on top. */
export const buryCrest = (s = 1) => {
  const c = (x, y, k) => `<g transform="translate(${x},${y}) scale(${k}) translate(0,300)">${crown}</g>`;
  return `<g transform="scale(${s})"><circle cy="-80" r="230" fill="url(#haloGlow)" opacity=".7"/>`
    + `<path d="M-110 -150 H110 V-30 Q110 70 0 120 Q-110 70 -110 -30Z" fill="${GOLD}"/><path d="M-98 -138 H98 V-30 Q98 58 0 104 Q-98 58 -98 -30Z" fill="#2f4f9a"/>`
    + `<path d="M20 -138 H98 V-30 Q98 58 0 104 Q30 40 20 -138Z" fill="#253f7e" opacity=".6"/>${c(-46, -86, 0.6)}${c(46, -86, 0.6)}${c(0, -8, 0.6)}`
    + `<rect x="-120" y="-166" width="240" height="18" rx="8" fill="#c8963e"/>${wolf2(0, -164, 0.75, { mood: 'calm', pose: 'lie' })}</g>`;
};

// ================================================================ people
/** Edmund's thane: an older Anglo-Saxon nobleman, green cloak, greying beard. */
export const thane = (x, y, s, o = {}) => hd(x, y, s, { top: '#6a4a3a', mantle: '#3a5a4a', lining: '#c8b890', trim: '#c8963e', skin: '#e6bc98', hair: '#7a6a5a', beard: '#9a8a7a',
  beardStyle: 'full', age: 'old', belt: '#4a3424', shoes: '#4a3424', iris: '#4f6a5a', ...o });
/** A young searcher: fair hair, ochre tunic, brown cloak, clean-shaven. */
export const searcher = (x, y, s, o = {}) => hd(x, y, s, { top: '#a8823a', mantle: '#6a4a32', lining: '#d8c4a0', trim: '#e2c27a', skin: '#efc6a2', hair: '#c89a5a', beard: null,
  age: 'young', belt: '#5a3a22', shoes: '#4a3424', iris: '#4f6f8f', ...o });
const edmundSaint = (x, y, s, o = {}) => edmund(x, y, s, { halo: true, armL: [16, 2, 3], armR: 30, propR: heldArrow(1), ...o });

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away, layer(d) at 20 / d; feet y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, MID ~1245.
// 0 · hook: Edmund, crowned and haloed, with the grey wolf at his side in the moonlit wood (push-fast)
function scene0() {
  const md = at(0, 'murdered'), gd = at(0, 'guarded'), s = at(0, 'This is'), n = at(0, 'Saint Edmund');
  return layer(0.97, lit(bramble(140, 1312, 1.1, { seed: 4 }) + bramble(960, 1312, 1.0, { seed: 8 }), 'wHook'))
    + lit(castShadow(400, 1345, 2.4, 'wHook') + `<g${punch(s, 0.03, 420, 900)}>`
      + seq((op) => edmundSaint(400, 1345, 2.4, op), [[0, { mood: 'determined', look: [2.6, 0.4] }], [md, { mood: 'sad', look: [2.6, 0.6] }],
        [gd, { mood: 'tender', look: [2.6, 0.4] }], [s, { mood: 'happy', look: [0, 0] }]]) + '</g>'
      + castShadow(770, 1345, 1.8, 'wHook') + seq((op) => wolf2(770, 1345, 1.9, { flip: true, ...op }), [[0, { mood: 'calm' }]]), 'wHook')
    + `<g opacity="0"${fadeIn(gd, 0.8)}>${glow(760, 1200, 260, 0.45)}${sparkles(10, 640, 900, 1020, 1260, { seed: 3 })}</g>`
    + `<g opacity="0"${fadeIn(n, 0.8)}>${sparkles(12, 220, 580, 520, 820, { seed: 5 })}</g>`
    + NEAR(foliage('l', 1640, { color: '#141a2c' }) + foliage('r', 1660, { color: '#141a2c', seed: 5 }));
}

// 1 · the Vikings leave for their ships; the crown lies hidden in the thorns (pan-r)
function scene1() {
  const k = at(1, 'killed'), ea = at(1, 'East Anglia'), h = at(1, 'hid'), th = at(1, 'thorny'), b = at(1, 'buried');
  const vk = (x, y, s, o) => viking(x, y, s, { flip: true, ...o });
  return MID(lit(`<g${M.tw([{ at: b - 0.4, dur: 2.2, from: { x: 0 }, to: { x: 260 }, ease: 'power1.in' }])}>`
      + `${castShadow(700, 1245, 1.2, 'wRaid')}${vk(700, 1245, 1.2, { armR: 16, propR: longbow, armL: 20 })}`
      + `${castShadow(820, 1240, 1.15, 'wRaid')}${vk(820, 1240, 1.15, { helm: false, armR: 22, armL: 30, propL: roundShield('#2f5a8a', '#efe6d2', 0.9) })}</g>`, 'wRaid'))
    + layer(0.97, lit(bramble(300, 1312, 1.5, { seed: 11, w: 320 })
      + bramble(330, 1330, 1.05, { seed: 12, w: 300, c: '#2a3e2c' })
      + `<g opacity="0"${fadeIn(th, 0.8)}><g transform="translate(390,1185)">${groundCrown(1.3, -14, 0.95)}</g>`
      + '<path d="M300 1230 Q400 1160 510 1222 M320 1190 Q410 1236 500 1180" stroke="#5a3a3a" stroke-width="5" fill="none" stroke-linecap="round"/></g>', 'wRaid'))
    + lit(`<g${M.tw([{ at: b, dur: 2.0, from: { x: 0 }, to: { x: 340 }, ease: 'power1.in' }])}>${castShadow(730, 1345, 2.1, 'wRaid')}`
      + seq((op) => viking(730, 1345, 2.1, { chief: true, armL: 28, propL: roundShield('#8a2a2a', '#e8c24a', 1), ...op }),
        [[0, { flip: true, armR: [22, 2, 3], look: [2.4, 0] }], [k, { flip: true, armR: [22, 2, 3], look: [2.4, 0.4] }],
          [h - 0.2, { flip: false, armR: [70, 3, 2.2], look: [2.6, 0.6] }], [b - 0.3, { flip: true, armR: [22, 2, 3], look: [2.4, 0] }]]) + '</g>', 'wRaid')
    + `<g opacity="0"${fadeIn(ea, 0.6)}><g transform="translate(860,1350) rotate(76)">${threeCrowns(0.7)}</g></g>`
    + NEAR(foliage('l', 1650, { color: '#2a1e24', seed: 9 }));
}

// 2 · the human beat: his people find only his body; they search the wood, calling (drift-l)
function scene2() {
  const se = at(2, 'searched'), cl = at(2, 'calling'), q = at(2, 'Where are you'), qe = at(2, 'friend', 0.5);
  return layer(0.92, lit(`<g opacity="0"${walkIn(se - 0.2, -200, 1.4)}>${castShadow(120, 1310, 1.6, 'wSearch')}${searcher(120, 1310, 1.6, { top: '#6a7a4a', hair: '#5a4030', beard: '#5a4030', beardStyle: 'short', age: 'mid', mood: 'worried', armR: [16, 2, 3], propR: handTorch, look: [2, 0] })}</g>`, 'wSearch'))
    + lit(castShadow(360, 1345, 2.15, 'wSearch') + seq((op) => thane(360, 1345, 2.15, { armL: [14, 2, 3], ...op }),
        [[0, { mood: 'sad', look: [0, 2.2], armR: [14, 2, 3] }], [se, { mood: 'worried', look: [2.6, -0.2], armR: [24, 2, 3], propR: handTorch }]])
      + `<g${walk(cl - 0.3, 120, 1.0)}>${castShadow(760, 1345, 2.05, 'wSearch')}`
      + seq((op) => searcher(760, 1345, 2.05, { flip: true, armL: [14, 2, 3], ...op }),
        [[0, { mood: 'sad', look: [0, 2], armR: [12, 2, 3] }], [cl, { mood: 'worried', look: [-2.6, -0.4], armR: [128, 3, 2.4] }], [q - 0.15, { mood: 'worried', look: [-2.6, -0.6], armR: [128, 3, 2.4], talk: [q, qe] }]]) + '</g>', 'wSearch')
    + NEAR(foliage('l', 1640, { color: '#1a1a2a', seed: 4 }) + foliage('r', 1650, { color: '#1a1a2a', seed: 6 }));
}

// 3 · "Here, here, here": the thicket parts; the grey wolf lies holding the crowned light between its paws (dolly + rack)
function scene3() {
  const v = at(3, 'voice'), h1 = at(3, 'Here'), tl = at(3, 'There lay'), gw = at(3, 'grey wolf'), hu = at(3, 'hungry'), tc = at(3, 'touch');
  const pulse3 = [0, 0.45, 0.9].map((d) => `<g opacity="0"${M.tw([{ at: h1 + d, dur: 0.25, from: { opacity: 0 }, to: { opacity: 1 } }, { at: h1 + d + 0.3, dur: 0.4, from: { opacity: 1 }, to: { opacity: 0 } }])}>${glow(650, 1250, 220, 0.8)}</g>`).join('');
  const W0 = 650, WY = 1345;
  const theWolf = seq((op) => wolf2(W0, WY, 2.15, { pose: 'lie', ...op }), [[0, { mood: 'calm' }]]);
  return layer(0.97, lit(bramble(330, 1312, 1.1, { seed: 21 }) + bramble(1000, 1312, 1.2, { seed: 22 }), 'wFind'))
    + `<g opacity="0"${fadeIn(gw, 1.2)}>${glow(W0, 1230, 330, 0.55)}</g>` + pulse3
    + lit(castShadow(W0, WY, 2.2, 'wFind') + `<g opacity="0"${fadeIn(tl - 0.1, 0.9)}>${theWolf}</g>`
      + `<g transform="translate(${W0 - 8},${WY - 2})">${groundCrown(1.15, -6, 0.95)}</g>`, 'wFind')
    + lit(`<g${M.tw([{ at: tl - 0.2, dur: 1.2, from: { x: 0 }, to: { x: -260 }, ease: 'power2.inOut' }])}>${bramble(560, 1365, 1.0, { seed: 23, w: 240, c: '#1e3026' })}</g>`
      + `<g${M.tw([{ at: tl - 0.2, dur: 1.2, from: { x: 0 }, to: { x: 280 }, ease: 'power2.inOut' }])}>${bramble(760, 1370, 1.0, { seed: 24, w: 240, c: '#1e3026' })}</g>`, 'wFind')
    + lit(castShadow(200, 1345, 2.1, 'wFind') + seq((op) => searcher(200, 1345, 2.1, { armL: [14, 2, 3], ...op }),
        [[0, { mood: 'worried', look: [2.6, 0], armR: [16, 2, 3] }], [v, { mood: 'surprised', look: [2.6, 0], armR: [40, 3, 2.4] }],
          [gw, { mood: 'awe', look: [2.6, 0.6], armR: [70, 3, 2.4] }], [tc, { mood: 'awe', look: [2.6, 0.8], kneel: true, armR: [24, 2, 3] }]]), 'wFind')
    + `<g opacity="0"${fadeIn(hu, 1.2)}>${sparkles(16, 480, 860, 1020, 1300, { seed: 31 })}</g>`
    + NEAR(foliage('r', 1650, { color: '#162018', seed: 7 }) + bokeh(5, { seed: 33, op: [0.2, 0.45] }));
}

// 4 · they carry him home; the wolf follows like a tame animal, then turns back to the woods (pan-l)
function scene4() {
  const wf = at(4, 'the wolf'), tm = at(4, 'tame'), tw = at(4, 'At the town'), tu = at(4, 'turned'), bk = at(4, 'back into');
  const group = `<g${M.tw([{ at: 0, dur: 4.4, from: { x: 70 }, to: { x: -40 }, ease: 'none' }])}>`;
  return MID(lit(`<g opacity="0"${fadeIn(tw - 0.3, 0.8)}>${[[620, 0.95, '#7a5a4a'], [700, 0.9, '#4a6a5a']].map(([x, s, c], k) =>
      `${castShadow(x, 1245, s, 'wHome')}${hd(x, 1245, s, { top: c, mantle: null, skin: ['#e6bc98', '#efc6a2'][k], hair: ['#4a3424', '#8a6a4a'][k], beard: null, flip: true, mood: 'joy', armR: [120, 6, 1.6] })}`).join('')}</g>`, 'wHome'))
    + lit(group + castShadow(250, 1345, 2.0, 'wHome') + seq((op) => thane(250, 1345, 2.0, { flip: true, armL: [14, 2, 3], armR: [16, 2, 3], ...op }),
        [[0, { mood: 'tender', look: [2.4, 0] }], [wf, { mood: 'surprised', look: [-2.6, 0], flip: false }], [tm, { mood: 'happy', look: [2.6, 0], flip: false }], [tu, { mood: 'tender', look: [2.6, 0], flip: false }]])
      + castShadow(470, 1345, 2.05, 'wHome') + searcher(470, 1345, 2.05, { flip: true, mood: 'peaceful', armL: 48, armR: 48 })
      + `<g transform="translate(395,1130)">${casket(0.95)}</g></g>`, 'wHome')
    + lit(`<g${walk(wf - 0.4, 300, 1.6)}><g${M.tw([{ at: bk, dur: 2.0, from: { x: 0, opacity: 1 }, to: { x: 420, opacity: 0 }, ease: 'power1.in' }])}>`
      + castShadow(760, 1345, 1.4, 'wHome') + seq((op) => wolf2(760, 1345, 1.45, op), [[0, { mood: 'calm', flip: true }], [tu, { mood: 'calm', flip: false }]]) + '</g></g>', 'wHome')
    + NEAR(foliage('r', 1650, { color: '#2a3a24', seed: 8 }) + bokeh(5, { seed: 41, op: [0.2, 0.45] }));
}

// 5 · the abbey town; the wolf on the crest; "God sent a wolf to guard him" (pull)
function scene5() {
  const cr = at(5, 'crest'), sh = at(5, 'shrine'), sw = at(5, 'sword'), gs = at(5, 'God sent'), gu = at(5, 'to guard');
  const pilgrims = [[620, 0.95, '#7a5a4a'], [700, 0.9, '#4a6a5a'], [775, 0.85, '#8a6a3a']].map(([x, s, c], k) =>
    `<g${M.drift(60, 0)}>${castShadow(x, 1245, s, 'wAbbey')}${hd(x, 1245, s, { top: c, mantle: null, skin: ['#e6bc98', '#d9a47e', '#efc6a2'][k], hair: ['#4a3424', '#8a6a4a', '#2a1c14'][k], beard: k === 1 ? '#8a6a4a' : null, flip: true, mood: 'happy', armR: 20 })}</g>`).join('');
  const dropSword = `<g opacity="0"${M.tw([{ at: sw, dur: 0.05, from: { opacity: 0 }, to: { opacity: 1 } }])}><g${M.tw([{ at: sw, dur: 0.7, from: { y: -220, rotation: -60 }, to: { y: 0, rotation: 0 }, ease: 'power2.in', origin: '200 1345' }])}>`
    + `${glow(140, 1330, 120, 0.5)}<g transform="translate(200,1345) rotate(-90)"><rect x="-4" y="-150" width="8" height="150" rx="2" fill="#c4ccd6"/><rect x="-22" y="-4" width="44" height="9" rx="3" fill="${GOLD}"/><rect x="-5" y="5" width="10" height="34" rx="3" fill="#6a4228"/><circle cy="44" r="7" fill="${GOLD}"/></g></g></g>`;
  return MID(`<g opacity="0"${fadeIn(sh - 0.6, 1.0)}>${lit(pilgrims, 'wAbbey')}</g>`)
    + layer(0.9, popAt(cr, 740, 640, `<g${M.bob(5, 3.2)}>${buryCrest(1.05)}</g>`, 0.7))
    + lit(castShadow(380, 1345, 2.3, 'wAbbey') + seq((op) => edmundSaint(380, 1345, 2.3, op),
        [[0, { mood: 'happy', look: [2.4, -0.6] }], [sw, { mood: 'peaceful', look: [0, 0] }], [gs, { mood: 'tender' }]]) + dropSword
      + `<g opacity="0"${walkIn(gu - 0.3, 200, 1.0)}>${castShadow(650, 1345, 1.4, 'wAbbey')}${wolf2(650, 1345, 1.45, { flip: true })}</g>`, 'wAbbey')
    + `<g opacity="0"${fadeIn(gu, 0.8)}>${sparkles(14, 260, 760, 700, 1150, { seed: 18 })}</g>`
    + NEAR(bokeh(7, { seed: 23 }) + foliage('l', 1650, { color: '#3a4a28', seed: 12 }));
}

// 6 · feast day portrait: Edmund with the arrow and crown, the wolf at his side, the three-crown banner (arc-r)
function scene6() {
  const pt = at(6, 'patron'), sn = at(6, 'Saint Edmund, pray'), pr = at(6, 'pray for us');
  return layer(0.9, lit(popAt(pt, 90, 1300, threeCrowns(1.2), 0.8), 'wGlory'))
    + lit(castShadow(500, 1345, 2.35, 'wGlory') + seq((op) => edmundSaint(500, 1345, 2.35, op),
        [[0, { mood: 'happy', look: [0, 0] }], [pt, { mood: 'happy', look: [-2.4, -0.6] }], [sn, { mood: 'happy', look: [0, 0] }], [pr, { mood: 'tender' }]])
      + castShadow(790, 1345, 1.4, 'wGlory') + wolf2(790, 1345, 1.45, { flip: true }), 'wGlory')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 260, 700, 480, 900, { seed: 21 })}</g>`
    + NEAR(bokeh(7, { seed: 25 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

const scenes = [scene0, scene1, scene2, scene3, scene4, scene5, scene6];

export const STORY = {
  slug: 'st_edmund_guardian_wolf', name: 'St_Edmund_Guardian_Wolf',
  bg3d: './edmund_guardian_wolf.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { edmund: { voice: 'bm_george', speed: 0.85 }, searcher: { voice: 'bm_daniel', speed: 0.95 } },
  thumb_hook: 'A wolf guarded the dead king', thumb_title: 'St. Edmund the Martyr', thumb_scene: 0, thumb_t: 5.0, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti': 'noʊvˈɛmbɚ twˈɛntiəθ',
  },
  scenes: [
    { kicker: 'EAST ANGLIA, ENGLAND · AD 869', title: 'The Guardian Wolf', art: scenes[0], bg3d: 'wHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['A hungry wolf found a murdered king in the forest, and guarded him.', 'This is Saint Edmund.'] },
    { kicker: '20 NOVEMBER 869', title: 'Hidden in the Thorns', art: scenes[1], bg3d: 'wRaid', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['In 869, Vikings killed Edmund, the king of East Anglia.', 'Then they hid his head deep in the thorny woods, so he could not be buried.'] },
    { kicker: 'THE SEARCH', title: 'Where Are You?', art: scenes[2], bg3d: 'wSearch', front3d: true, cam: 'drift-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['His people found only his body.', 'So they searched the woods, calling to each other:', { text: 'Where are you now, friend?', who: 'searcher' }] },
    { kicker: 'DEEP IN THE WOODS', title: 'Here, Here, Here', art: scenes[3], bg3d: 'wFind', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 640, oy: 1150, rack: { at: 3, dur: 2.5, blur: 5 } },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['And a voice answered:', { text: 'Here, here, here.', who: 'edmund' }, 'There lay a grey wolf, holding the head between its paws.',
        { text: 'It was hungry, but it would not touch him.', speed: 0.85 }] },
    { kicker: 'THE ROAD HOME', title: 'As If It Were Tame', art: scenes[4], bg3d: 'wHome', front3d: true, cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ['They carried him home, and the wolf walked behind them, as if it were tame.', 'At the town, it turned and went back into the woods.'] },
    { kicker: 'BURY ST EDMUNDS', title: 'A Wolf on the Crest', art: scenes[5], bg3d: 'wAbbey', front3d: true, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Today, a wolf still guards the crest of Bury St Edmunds, the town that grew around his shrine.', 'He laid down his sword, and God sent a wolf to guard him.'] },
    { kicker: 'FEAST DAY · NOVEMBER 20', title: 'Saint Edmund', art: scenes[6], bg3d: 'wGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 20, and he was once England\'s patron saint.', 'Saint Edmund, pray for us.'] },
  ],
};
