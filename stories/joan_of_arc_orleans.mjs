// St. Joan of Arc: the Siege of Orléans (one story, feast May 30). ANIME STYLE (soft & dreamy), rig in anime_rig.mjs.
// Sources: siege dates, Saint-Loup (May 4) and Augustins (May 6), the Tourelles (May 7), the arrow between neck and
// shoulder, the banner touching the wall and "Tout est vostre, et y entrez!" (Cousinot, Chronique de la Pucelle), the
// English withdrawal on Sunday May 8 (Wikipedia, Siege of Orléans); the prophecy "tomorrow blood will flow from my body
// above my breast" and "she was afraid and wept" (Jean Pasquerel, her confessor, testimony of 1456); Joan at her trial
// (Feb 27, 1431): first to set a ladder against the bridge fortress, wounded in the neck by an arrow.
import { W, M, GOLD, sky, sun, rays, hill, petals, bokeh, ground, tufts, flowers, waves, lily,
  FAR, BACK, MID, NEAR, rng, f, dark, light } from '../art.mjs';
import { animeJoan, animeFriar, pCloud, shafts, focusLines, flare, windStreaks, sparkleStars, crowdSil } from './anime_rig.mjs';
import { fleur, chateau } from './joan_of_arc.mjs';

// event times (s from scene start, from `node build.mjs … info`)
const T = { s2det: 3.1, s3talk: [2.6, 5.95], s3sad: 8.5, s4raise: 3.8, s4talk: [6.05, 7.45] };

// ---------------------------------------------------------------- set pieces (SVG, pastel)
// the Tourelles on the last piers of the bridge, with the bridge running off to the left
export function tourellesSvg(x, y, s = 1, { wall = '#f0d8d0', roof = '#9a78b8', ladders = false } = {}) {
  const sh = dark(wall, 0.16), ol = 'stroke="#6a5078" stroke-width="2" stroke-linejoin="round"';
  const tw = (tx) => `<rect x="${tx - 26}" y="-190" width="52" height="160" fill="${wall}" ${ol}/><rect x="${tx + 6}" y="-190" width="20" height="160" fill="${sh}"/>`
    + `<rect x="${tx - 30}" y="-200" width="60" height="14" fill="${light(wall, 0.1)}" ${ol}/><path d="M${tx - 34},-200 L${tx},-262 L${tx + 34},-200Z" fill="${roof}" ${ol}/>`
    + `<rect x="${tx - 5}" y="-150" width="10" height="20" rx="5" fill="#4a3a5a"/>`;
  let s2 = `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="-640" y="-58" width="560" height="18" fill="${wall}" ${ol}/>` + Array.from({ length: 9 }, (_, i) => `<rect x="${-630 + i * 64}" y="-40" width="18" height="40" fill="${sh}"/>`).join('')
    + `<rect x="-90" y="-30" width="180" height="30" fill="${sh}" ${ol}/>`
    + `<rect x="-42" y="-150" width="84" height="120" fill="${wall}" ${ol}/>` + [-36, -16, 4, 24].map((k) => `<rect x="${k}" y="-162" width="12" height="14" fill="${wall}"/>`).join('')
    + `<path d="M-14,-30 V-62 A14 14 0 0 1 14 -62 V-30Z" fill="#4a3a5a"/>` + tw(-62) + tw(62);
  if (ladders) s2 += `<g stroke="#8a6040" stroke-width="4"><path d="M-30,-2 L-14,-140 M-18,-2 L-2,-140 M-29,-20 L-17,-20 M-27,-44 L-15,-44 M-24,-68 L-12,-68 M-21,-92 L-9,-92 M-18,-116 L-6,-116"/></g>`;
  return s2 + '</g>';
}
// a captured English bastille: wooden palisade, now flying a French banner
function bastille(x, y, s = 1) {
  const post = (k) => `<path d="M${k},0 V-120 L${k + 10},-136 L${k + 20},-120 V0Z" fill="${k % 40 ? '#a07858' : '#8a6448'}" stroke="#5a4058" stroke-width="2"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${Array.from({ length: 14 }, (_, i) => post(-140 + i * 20)).join('')}`
    + `<rect x="-60" y="-210" width="120" height="100" fill="#b08a68" stroke="#5a4058" stroke-width="2"/><path d="M-70,-210 L0,-262 L70,-210Z" fill="#8a6a8a" stroke="#5a4058" stroke-width="2"/>`
    + `<rect x="-3" y="-380" width="6" height="130" fill="#6a4a3a"/><g transform="translate(3,-376)"><g${M.sway(4, 1.3)}><path d="M0,0 C30,-8 60,8 96,0 L92,64 C60,72 30,58 0,64Z" fill="#3a5aa0" stroke="#5a4058" stroke-width="2"/>${fleur(46, 32, 1.1)}</g></g></g>`;
}
// Joan's boat on the Loire at night, with a lantern on the bow
function boat(x, y) {
  return `<g transform="translate(${x},${y})"><path d="M-330,-30 Q-300,40 -200,60 L210,60 Q310,40 340,-40 Q0,-10 -330,-30Z" fill="#6a4a6a" stroke="#3a2840" stroke-width="3" stroke-linejoin="round"/>`
    + `<path d="M-320,-26 Q0,-6 334,-36" stroke="#a07a90" stroke-width="6" fill="none"/><path d="M-200,58 L210,58 Q260,50 300,20 Q0,40 -280,10Z" fill="#4a3050" opacity=".6"/>`
    + `<rect x="296" y="-150" width="6" height="120" fill="#4a3050"/><g transform="translate(300,-150)"><circle r="70" fill="url(#sunGlow)"${M.pulse(0.1, 1.4)}/>`
    + `<rect x="-12" y="-8" width="24" height="28" rx="5" fill="#ffe2a0" stroke="#3a2840" stroke-width="2"/><path d="M-14,-8 L0,-22 L14,-8Z" fill="#3a2840"/></g></g>`;
}
const glints = (n, seed, y0, y1) => { const r = rng(seed); let s = ''; for (let i = 0; i < n; i++) s += `<path d="M${f(r() * W)},${f(y0 + r() * (y1 - y0))} h${f(20 + r() * 40)}" stroke="#ffe8c0" stroke-width="3" stroke-linecap="round" opacity=".6"${M.flick(1 + r(), r() * 2, 0.1)}/>`; return s; };

// ---------------------------------------------------------------- scenes
const MORN = [[0, '#6a5ab0'], [0.18, '#a688c8'], [0.36, '#f0a8c0'], [0.56, '#ffd4b0'], [0.8, '#fff0d4'], [1, '#fff6e2']];
const DAWN = [[0, '#3e4090'], [0.24, '#8a78c0'], [0.44, '#e8a4c0'], [0.62, '#ffd0b4'], [1, '#fff0dc']];
const GLORY = [[0, '#6a54b0'], [0.24, '#c08ac8'], [0.46, '#ffc0b0'], [0.66, '#ffe2b0'], [1, '#fff6e4']];

function scene0() {   // hook (3D loireDusk): close-up, the Tourelles behind her at dusk
  return animeJoan(540, 3010, 2.5, { mood: 'determined', pose: 'none', halo: 0.6, rim: '#ffe8c8', wind: 1.6 })
    + NEAR(windStreaks(6, 3) + petals(14, { seed: 5, colors: ['#ffffff', '#ffc4d6', '#ffe6a8'] }) + sparkleStars(6, 6, { y0: 380, y1: 1200 }) + bokeh(7, { seed: 11, op: [0.3, 0.55] }));
}

function scene1() {   // April 29, 1429 (3D loireNight): she crosses the Loire by boat to Orléans
  return MID(waves(1500, 6, 260, 6, '#3a4080', { op: 0.55, foam: '#8a90d0' }))
    + animeJoan(470, 1575, 1.0, { mood: 'determined', pose: 'rest', head: 0.8, rim: '#ffd8a0', wind: 1.2 })
    + boat(540, 1590)
    + waves(1640, 7, 220, 5, '#2a3070', { op: 0.85, foam: '#a8b0f0', phase: 1 }) + glints(10, 4, 1660, 1800)
    + NEAR(sparkleStars(6, 13, { y0: 400, y1: 900 }));
}

function scene2() {   // May 4–6: two forts taken; the Tourelles across the river
  return FAR(sky(MORN) + sun(820, 760, 70, 460) + shafts(-200, { n: 4, op: 0.18 }))
    + BACK(pCloud(130, 560, 0.95, { lit: '#fffaf2', mid: '#ffd8d8', sh: '#c8a0c8' }) + pCloud(980, 470, 0.8, { lit: '#fffaf2', mid: '#ffdcd6', sh: '#c8a4cc', drift: -24 })
      + hill(1150, 30, '#c8b0d4', 4) + waves(1210, 4, 300, 7, '#b8c4f0', { foam: '#ffffff' }) + tourellesSvg(860, 1215, 0.9, {}))
    + MID(bastille(190, 1420, 0.95) + crowdSil(1500, 6, { x0: 0, x1: 380, color: '#7a6aa8', seed: 4, pennants: ['#fdf9f1', '#3a5aa0'] }) + hill(1560, 18, '#9cc08a', 4, { top: '#c8e4a8' }))
    + animeJoan(560, 1715, 1.1, { mood: 'happy', mood2: ['determined', T.s2det], pose: 'rest', head: 0.8, rim: '#fff4d6', wind: 1.4 })
    + ground(1700, '#8ab872', { rim: '#c4e4a0' }) + tufts(1704, 14, '#6a9a58', { seed: 5 }) + flowers(1700, 1800, 14, { seed: 7, colors: ['#ffffff', '#ffc4d6', '#fff0a8'] })
    + NEAR(petals(12, { seed: 8, colors: ['#ffffff', '#ffc4d6', '#f2c46b'] }) + bokeh(5, { seed: 3, op: [0.3, 0.5] }));
}

function scene3() {   // the night before / dawn of May 7: the prophecy, the ladder, the arrow, her tears
  return FAR(sky(DAWN, { stars: 14, seed: 6 }) + sun(560, 1130, 80, 520))
    + BACK(pCloud(160, 620, 0.9, { lit: '#fff0f0', mid: '#f8c8d8', sh: '#a890c8' }) + pCloud(960, 540, 0.75, { lit: '#fff0f0', mid: '#f8c8d8', sh: '#a890c8', drift: -20 })
      + hill(1180, 24, '#b0a0d0', 3) + waves(1230, 4, 300, 7, '#a8b4e8', { foam: '#ffffff' }) + tourellesSvg(560, 1235, 1.05, { ladders: true }))
    + MID(hill(1500, 16, '#8aa878', 6, { top: '#b8d8a0' }))
    + animeFriar(250, 1720, 1.0, { mood: 'peaceful', mood2: ['worried', T.s3sad] })
    + animeJoan(690, 1720, 1.05, { mood: 'determined', mood2: ['sad', T.s3sad], tear: T.s3sad + 1.6, talk: T.s3talk, pose: 'none', head: 0.8, wind: 1 })
    + ground(1705, '#7aa868', { rim: '#b4d898' }) + tufts(1709, 14, '#5a8a50', { seed: 9 })
    + NEAR(motes(8) + bokeh(5, { seed: 12, op: [0.25, 0.45] }));
}
const motes = (n) => sparkleStars(n, 21, { y0: 500, y1: 1200 });

function scene4() {   // climax (3D loireSunset, dolly): she comes back with her banner; it touches the wall
  return MID(crowdSil(1640, 4, { x0: 0, x1: 260, color: '#6a5a92', seed: 7, pennants: ['#3a5aa0', '#fdf9f1'] }) + crowdSil(1650, 3, { x0: 820, x1: 1080, color: '#6a5a92', seed: 9 })
      + hill(1640, 14, '#8ab070', 5, { top: '#c0e0a0' }))
    + animeJoan(380, 1720, 1.16, { mood: 'determined', pose: 'raise', raiseAt: T.s4raise, talk: T.s4talk, head: 0.8, halo: true, rim: '#fff4d6', wind: 2 })
    + flare(820, 940, -340, 420, { seed: 5 })
    + ground(1708, '#8ab872', { rim: '#c4e4a0' }) + tufts(1712, 14, '#6a9a58', { seed: 5 })
    + NEAR(petals(14, { seed: 18, colors: ['#ffffff', '#ffc4d6', '#f2c46b'] }) + sparkleStars(7, 19, { y0: 360, y1: 1300 }) + bokeh(5, { seed: 4, op: [0.3, 0.5] }));
}

function scene5() {   // May 8: the English march away; Orléans is free
  const leaving = `<g${M.drift(140, -6)}>` + Array.from({ length: 9 }, (_, i) => `<g transform="translate(${700 + i * 26},${1052 - (i % 2) * 3})" fill="#9a88b8"><circle cy="-30" r="6"/><path d="M-9,0 Q-9,-20 0,-22 Q9,-20 9,0Z"/>`
    + (i % 3 === 0 ? `<rect x="7" y="-62" width="2" height="62"/><path d="M9,-62 L34,-56 L9,-50Z" fill="#f4ecec"/><path d="M9,-57 h22" stroke="#c84a5a" stroke-width="2"/>` : '') + '</g>').join('') + '</g>';
  return FAR(sky(GLORY) + sun(540, 760, 90, 600) + rays(540, 760, { op: 0.12, n: 16, color: '#fff4e0' }))
    + BACK(pCloud(120, 580, 0.95, { lit: '#fffaf2', mid: '#ffd8dc', sh: '#c8a4cc' }) + pCloud(990, 500, 0.8, { lit: '#fffaf2', mid: '#ffdcd6', sh: '#c8a4cc', drift: -24 })
      + hill(1060, 26, '#d4c0dc', 7) + leaving + chateau(540, 1250, 0.95, { wall: '#f0dcd4', roof: '#9a78b8', shade: 0.18 }))
    + MID(crowdSil(1560, 5, { x0: 0, x1: 330, color: '#8a74b0', seed: 11, flowers: true }) + crowdSil(1560, 5, { x0: 750, x1: 1080, color: '#8a74b0', seed: 13, flowers: true })
      + hill(1600, 14, '#9cc08a', 2, { top: '#c8e4a8' }))
    + animeJoan(500, 1725, 1.12, { mood: 'joy', pose: 'raise', head: 0.8, halo: true, rim: '#fff4d6', wind: 1.4 })
    + ground(1712, '#8ab872', { rim: '#c4e4a0' }) + flowers(1712, 1820, 18, { seed: 15, colors: ['#ffffff', '#ffc4d6', '#fff0a8', '#d8c4f4'] })
    + NEAR(petals(26, { seed: 9, colors: ['#ffffff', '#ffc4d6', '#f2c46b'] }) + sparkleStars(8, 17, { y0: 360, y1: 1250 }) + bokeh(6, { seed: 6, op: [0.3, 0.55] }));
}

function scene6() {   // feast day portrait
  return FAR(sky(GLORY, { stars: 10, seed: 2 }) + rays(430, 760, { op: 0.13, n: 18, color: '#fff4e0' }) + focusLines(430, 760, 36, { op: 0.2, color: '#fffaf0' }) + sun(430, 760, 60, 640))
    + BACK(pCloud(140, 1050, 1.1, { lit: '#fffaf2', mid: '#ffd8e4', sh: '#c8a4d4' }) + pCloud(960, 980, 1.0, { lit: '#fffaf2', mid: '#ffdce4', sh: '#c8a4d4', drift: -22 }))
    + animeJoan(400, 1965, 1.4, { mood: 'joy', pose: 'rest', head: 0.8, halo: true, rim: '#fff4d6', wind: 1.2 })
    + `<g transform="translate(90,1460)">${lily(1.1)}</g><g transform="translate(990,1470)">${lily(1.1)}</g>`
    + NEAR(petals(18, { seed: 31, colors: ['#ffffff', '#ffc4d6', '#f2c46b'] }) + sparkleStars(9, 33, { y0: 360, y1: 1300 }) + bokeh(7, { seed: 9, op: [0.3, 0.55] }));
}

export const STORY = {
  slug: 'st_joan_of_arc_siege_of_orleans', name: 'St_Joan_of_Arc_Siege_of_Orleans',
  bg3d: './joan_of_arc_orleans.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'Wounded, she came back', thumb_title: 'St. Joan of Arc', thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 700, 'r'], [56, 1300, 'l']],
  // Joan's own words in the nearest accent: French (Kokoro's only French voice is female, ff_siwis)
  cast: { joan: { voice: 'ff_siwis', speed: 0.95 } },
  fix: {
    'ˈɔːɹleɪənz': 'ɔːɹleɪˈɑːn',   // Orléans -> or-lay-AHN
    'tʊɹɹˈɛlz': 'tʊɹˈɛl',          // Tourelles -> toor-EL
    'mˈeɪ θˈɜːɾi': 'mˈeɪ θˈɜːɾiəθ', // May 30 -> thirtieth
  },
  scenes: [
    { kicker: 'MAY 7, 1429 · ORLÉANS', title: 'St. Joan of Arc', art: scene0, bg3d: 'loireDusk', cam: { move: 'push-fast', amt: 0.07, oy: 840 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['An English arrow struck her.', 'Her own soldiers thought she was dead.', 'This is Saint Joan of Arc.'] },
    { kicker: 'APRIL 29, 1429 · THE LOIRE', title: 'A City Under Siege', art: scene1, bg3d: 'loireNight', cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['For six months, the English had held Orléans under siege.', 'Then, in April 1429, a girl of seventeen arrived.'] },
    { kicker: 'MAY 4 – 6, 1429', title: 'One Fort Left', art: scene2, cam: 'drift-r',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['In three days, her army took two English forts.', 'One remained: the Tourelles, guarding the bridge.'] },
    { kicker: 'MAY 7, 1429 · DAWN', title: 'A Wound Foretold', art: scene3, cam: { move: 'push', amt: 0.06, ox: 720, oy: 900 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['The night before, she told her confessor:', { text: 'Tomorrow, blood will flow from my body, above my breast.', who: 'joan' },
        'At dawn, she set the first ladder.', 'An arrow struck her. She was afraid, and she wept.'] },
    { kicker: 'MAY 7 · EVENING', title: 'All Is Yours', art: scene4, bg3d: 'loireSunset', cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 760 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: [{ text: 'But that evening, she came back with her banner.', beat: 0.9, speed: 0.85 }, 'When it touched the wall, she cried:',
        { text: 'All is yours. Go in!', who: 'joan' }] },
    { kicker: 'SUNDAY, MAY 8, 1429', title: 'Orléans Is Free', art: scene5, cam: { move: 'pull', amt: 0.06, oy: 900 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['The fort fell that night, and the next day the English marched away.', 'She came back wounded, and France came back to life.'] },
    { kicker: 'FEAST DAY · MAY 30', title: 'Patron of France', art: scene6, cam: { move: 'arc-l', amt: 0.06, oy: 900 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is May 30. She is a patron of France and of soldiers.', 'Saint Joan of Arc, pray for us.'] },
  ],
};
