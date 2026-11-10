// TEST ONLY (not for commit): St. Francis, 2 scenes, 2D SVG characters over three.js 3D backgrounds.
// NO3D=1 builds the same clip with the usual SVG backgrounds (slug test_francis_2d) for a render-time A/B.
import { M, SKIES, SKIN, sky, sun, rays, clouds, hill, motes, foliage, tufts, flowers, butterflies, bokeh,
  person, book, ground, FAR, BACK, MID, NEAR } from '../../art.mjs';
import { francis, perched, flyer, assisi, tree, smallCross } from '../../stories/francis.mjs';

const USE3D = !process.env.NO3D;
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

function scene0() {
  const bg = USE3D ? '' : FAR(sky(SKIES.dusk, { stars: 26, seed: 4 }) + rays(540, 720, { op: 0.08 }) + glow(540, 1150, 520, 0.85))
    + BACK(clouds(560, { color: '#ffc9b0', op: 0.45, drift: 40, seed: 7 })
      + assisi(540, 1210, 1.25, { wall: '#6a4a6a', roof: '#5a3a5a', hillC: '#4e3656', win: '#ffd98a', shade: 0.3 }));
  return bg
    + ground(1290, '#3e2a44', { rim: '#c07a7a' }) + tufts(1296, 10, '#2e1e34', { seed: 7 })
    + francis(540, 1262, 2.5, { halo: true, mood: 'peaceful', armL: [30, 2, 3], armR: [24, 2, 3.4],
      propL: `<g transform="translate(0,-28)">${perched(0, 0, '#9a7a56', 1.05)}</g>`, propR: smallCross })
    + flyer(200, 760, '#b08a62', 1.2, { ph: 0.3 }) + flyer(860, 660, '#9a7a56', 1.0, { dx: 80, ph: 0.8 }) + flyer(900, 900, '#c49a6a', 0.8, { dx: 60, dy: -90, ph: 1.4 })
    + motes(16, { y0: 520, y1: 1240, seed: 3 })
    + NEAR(bokeh(7, { seed: 5 }) + foliage('l', 1600, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

function scene1() {
  const birdsOnTree = [[820, 860, '#9a7a56'], [930, 820, '#c49a6a', true], [1000, 900, '#8a6a4a'], [880, 960, '#b08a62', true]]
    .map(([x, y, c, fl], i) => perched(x, y, c, 0.9, fl, i * 0.3)).join('');
  const birdsGround = [[380, 1340, '#9a7a56', true], [450, 1360, '#c49a6a', true], [760, 1350, '#8a6a4a'], [520, 1385, '#b08a62', true]]
    .map(([x, y, c, fl], i) => perched(x, y, c, 1, fl, i * 0.4)).join('');
  const bg = USE3D ? '' : FAR(sky(SKIES.sunrise) + sun(260, 620, 54, 300))
    + BACK(clouds(470, { color: '#fff7e8', op: 0.75, seed: 11 }) + hill(1020, 50, '#b9cfa0', 2) + assisi(220, 1060, 0.6, { hillC: '#a8c48a' }))
    + MID(hill(1120, 40, '#8fbf6e', 7, { top: '#b8e08e' }));
  return bg
    + ground(1310, '#7fb069', { rim: '#a8d48a' }) + tufts(1312, 12, '#5f9a4a', { seed: 8 })
    + MID(tree(980, 1300, 0.95) + birdsOnTree)
    + person(150, 1320, 1.4, { kind: 'friar', skin: SKIN.fair, hair: '#8a5a32', beard: '#8a5a32', mood: 'joy', armL: 10, armR: [26, 4, 2.6] })
    + person(300, 1335, 1.45, { kind: 'friar', skin: SKIN.priest, hair: '#2a1e16', beard: false, mood: 'happy', armL: 22, armR: 10, propL: book(false) })
    + francis(620, 1320, 1.8, { mood: 'joy', talk: true, armR: [125, 14, 1.4], armL: 24 })
    + birdsGround
    + flyer(560, 780, '#b08a62', 0.9, { dx: 100, dy: -40, ph: 0.2 }) + flyer(400, 900, '#9a7a56', 0.8, { dx: 140, dy: -50, ph: 1.1 })
    + butterflies(2, { x0: 400, x1: 1000, y0: 900, y1: 1080 })
    + flowers(1360, 1440, 12, { seed: 2 })
    + NEAR(foliage('l', 1650, { color: '#2a4a2e', seed: 4 }));
}

export const STORY = {
  slug: USE3D ? 'test_francis_3d' : 'test_francis_2d', name: USE3D ? 'TEST_Francis_3D_Background' : 'TEST_Francis_2D_Background',
  voice: 'am_michael', speed: 0.95,
  bg3d: USE3D ? './francis_3dtest.bg3d.js' : undefined,
  fx: { handheld: true, leak: true, loop: true },
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: { 'ɐsˈɪsi': 'ɐsˈiːsi' },   // Assisi -> ah-SEE-see (from francis.mjs)
  scenes: [
    { kicker: 'THE POOR MAN OF ASSISI', title: 'St. Francis of Assisi', art: scene0, bg3d: 'assisiDusk', cam: { move: 'push-fast', amt: 0.06, oy: 760 },
      say: ['Why would a rich young man give it all away?', 'This is Saint Francis of Assisi.'] },
    { kicker: 'BROTHER SUN, SISTER BIRDS', title: 'Friend of Creation', art: scene1, bg3d: 'countryDay', cam: 'pan-r',
      say: ['He loved all creatures, and even preached to the birds.'] },
  ],
};
