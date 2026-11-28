// St. Catherine Labouré: the 46-year secret (one story; Paris, 1830-1876). Feast: November 28.
// All-3D backgrounds reused from miraculous_medal.bg3d.js (the Rue du Bac chapel set-ups, a Paris street); cam3d; characters hd()
// from miraculous_medal.mjs (catherineL, aladel, sisterDC, oldMan, mary via vision()); Ricks Clips motion; depth staging (a near
// column card, people on separate depths, a sideways slide in the hook).
// Sources: medaillemiraculeuse.org "Apparitions of the Virgin Mary" (Nov 27, 1830: "Mary's hands extend outward, and beams of light
// descend toward the earth"; "These rays are the graces I pour out upon those who ask for them."; the medal "quickly spread throughout
// the world"); congregatiomissionis.org "Saint Catherine Labouré" (Aladel "did not believe her and advised her to concern herself with
// other matters"; "Her confessor advised her not to speak about them, and she obeyed"; "left no diaries, gave no interviews"; reprimanded
// "sometimes unjustly" she "remained silent"; in autumn 1876 her health failed; she "asked to speak to her superior, Sister Dufès, and
// revealed that she was the visionary"; died 31 December 1876; the medal "distributed in millions of copies"); filles-de-la-charite.org
// (sent to the Enghien hospice in February 1831 to serve the poor and elderly); Wikipedia "Catherine Labouré" (the medal "quickly adopted
// by millions"; body "encased in glass beneath the side altar" of the Rue du Bac chapel; patron of seniors; feast 28 November).
// Exported for later reels: nearColumn.
import { M, GOLD, sparkles, bokeh, foliage, f, NEAR, MID, layer } from '../art.mjs';
import { wordTimes } from '../hd.mjs';
import { speedLines, burst } from '../cartoonfx.mjs';
import { walk } from './peter_of_alexandria_torn_robe.mjs';
import { catherineL, aladel, sisterDC, oldMan, parisian, maryStatue, smallMedal, vision, LIGHT, lit, castShadow } from './miraculous_medal.mjs';

const SLUG = 'st_catherine_laboure_secret';
const at = wordTimes(SLUG);
let SNAP = 0;
const seq = (draw, steps) => {   // instant pose swaps: each look shows exactly from its time until the next one
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
const popAt = (t, x, y, svg, dur = 0.45) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.5 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2.2)', origin: '0 0' }])}>${svg}</g></g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };
const OLD = { old: true };

/** A pale chapel column close to the camera (foreground card for depth). x = its inner edge, side -1 = left edge. */
export const nearColumn = (x = -40, side = -1) => { const x0 = side < 0 ? x - 240 : x, w = 240;
  return `<g><rect x="${x0}" y="-200" width="${w}" height="2400" fill="#cfc2ae"/><rect x="${side < 0 ? x - 36 : x}" y="-200" width="36" height="2400" fill="#e8dfd0"/>`
    + `<rect x="${x0}" y="-200" width="${w}" height="2400" fill="#2a2030" opacity=".45"/><rect x="${x0 - 10}" y="1180" width="${w + 20}" height="34" fill="#b8a890" opacity=".9"/></g>`; };

// cam3d feet art y (plane 20): depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1245.

// 0 · HOOK. SHOT "A young sister saw Mary, gave the world her medal, then stayed silent for forty-six years.": old Catherine in the
//     chapel, a statue of Mary behind; on "medal" a glowing medal appears in her hand; on "silent" she lowers her eyes.  SHOT "This is
//     Saint Catherine Labouré.": she looks at us, halo.
const S0 = [400, 1345, 2.25], X0 = [760, 1286, 1.8];
function scene0() {
  const me = at(0, 'medal'), si = at(0, 'silent'), ti = at(0, 'This is');
  return MID(`<g transform="translate(600,1150)">${glow(0, -140, 140, 0.6)}${maryStatue(2.6)}</g>`)
    + layer(0.85, lit(castShadow(...X0, 'oHook') + sisterDC(...X0, 1, { flip: true, mood: 'happy', look: [2.4, 0], armL: -20, armR: -20 }), 'oHook'))
    + lit(castShadow(...S0, 'oHook') + seq((o) => catherineL(...S0, { ...OLD, armL: [16, 2, 3], ...o }),
      [[0, { mood: 'peaceful', look: [1.6, -1.2], armR: [16, 2, 3] }], [me, { mood: 'happy', look: [1.6, -0.4], armR: 70, propR: smallMedal(1.3) }],
        [si, { mood: 'peaceful', armR: 40, propR: smallMedal(1.1) }], [ti, { mood: 'tender', look: [0, 0], armR: 40, propR: smallMedal(1.1), halo: ti + 0.2 }]]), 'oHook')
    + speedLines(S0[0] + 160, 1000, { at: me + 0.1, dur: 0.6, r0: 120, r1: 520, op: 0.3, color: '#fff4d8', seed: 3 })
    + layer(1.35, nearColumn(-40, -1))
    + NEAR(bokeh(6, { seed: 5, sides: true, op: [0.2, 0.4] }));
}

// 1 · SHOT "Mary appeared to her in a Paris chapel.": night chapel; Mary stands on the globe, Catherine kneels in awe.  SHOT (Mary's
//     words): rays pour from her hands.
const G1 = [660, 1262, 108, 2.05], K1 = [250, 1345, 2.05];
function scene1() {
  const ap = at(1, 'appeared'), ra = at(1, 'These rays'), en = at(1, 'ask for them', 0.6);
  return `<g opacity="0"${fadeIn(Math.max(0.1, ap - 0.2), 0.8)}>` + vision(...G1, 'oVision', { raysOn: ra,
      steps: [[0, { mood: 'downcast', look: [-0.5, 0] }], [ra, { mood: 'happy', look: [-1.2, 0.4], talk: [ra, en] }], [en, { mood: 'tender', look: [-1.2, 0.4] }]] }) + '</g>'
    + lit(castShadow(...K1, 'oVision') + seq((o) => catherineL(...K1, { kneel: true, look: [2.4, -1.6], ...o }),
      [[0, { mood: 'surprised', ...PRAY }], [ap + 0.3, { mood: 'awe', ...PRAY }]]), 'oVision')
    + NEAR(bokeh(7, { seed: 11, sides: true }));
}

// 2 · SHOT "Her confessor, Father Aladel, did not believe her.": in the confessional room he shakes his head.  SHOT "He told her to think
//     of other things, and to keep quiet.": he raises a hand.  SHOT "And she obeyed.": she bows her head.
const C2 = [330, 1345, 2.05], A2 = [740, 1322, 2.15];
function scene2() {
  const nb = at(2, 'did not'), th = at(2, 'think of'), kq = at(2, 'keep quiet'), ob = at(2, 'And she obeyed');
  return layer(0.95, lit(castShadow(...A2, 'oConfess') + seq((o) => aladel(...A2, { flip: true, look: [2.4, 0.4], armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', armR: [16, 2, 3] }], [nb, { mood: 'stern', armR: [16, 2, 3] }], [th, { mood: 'stern', armR: 70 }], [kq, { mood: 'stern', armR: 118 }], [ob, { mood: 'happy', armR: [16, 2, 3] }]]), 'oConfess'))
    + lit(castShadow(...C2, 'oConfess') + seq((o) => catherineL(...C2, { armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', look: [2.4, -0.4], armR: 40 }], [nb + 0.3, { mood: 'worried', look: [2.4, -0.4], armR: 40 }], [ob, { mood: 'peaceful', look: [0, 1.4], ...PRAY }]]), 'oConfess')
    + NEAR(bokeh(4, { seed: 7, sides: true, op: [0.12, 0.25] }));
}

// 3 · SHOT "Still, the medal was made, and millions wore it.": medals pop up across a Paris street, people wearing them.  SHOT "Yet for
//     forty-five years she cared for the elderly, unknown.": Catherine helps an old man with his cane, nobody looks at her.
const C3 = [380, 1345, 2.1], O3 = [700, 1322, 2.0], P3 = [[150, 1286, 1.7, 0], [930, 1286, 1.7, 1]];
function scene3() {
  const md = at(3, 'medal was'), mi = at(3, 'millions'), ye = at(3, 'Yet for'), el = at(3, 'elderly'), sc = at(3, 'scolded'), sn = at(3, 'said nothing');
  const MED = [[200, 700], [880, 640], [520, 560], [330, 900], [760, 880], [140, 1000], [960, 980], [620, 760]];
  return until(ye, popAt(md, 540, 820, smallMedal(3.2))
      + MED.map(([x, y], k) => popAt(mi + k * 0.12, x, y, smallMedal(1.5))).join('')
      + layer(0.85, P3.map(([x, y, s, i]) => lit(castShadow(x, y, s, 'oHidden') + parisian(x, y, s, i, { flip: i === 1, mood: 'joy', look: [i ? 2.4 : -2.4, -0.6], armL: [16, 2, 3], armR: [70, 2, 3], propR: smallMedal(1.0) }), 'oHidden')).join('')))
    + from(ye, lit(castShadow(...O3, 'oHidden') + oldMan(...O3, { flip: true, mood: 'tender', look: [2.4, 0.2], armL: [16, 2, 3], armR: [40, 2, 3] })
      + castShadow(...C3, 'oHidden') + seq((o) => catherineL(...C3, { ...OLD, look: [2.4, 0.2], armL: [16, 2, 3], ...o }),
        [[0, { mood: 'happy', armR: 60 }], [el + 0.2, { mood: 'tender', armR: 60 }], [sc, { mood: 'sad', look: [-2.4, 0.4], armR: [16, 2, 3] }], [sn, { mood: 'peaceful', look: [0, 1.2], ...PRAY }]]), 'oHidden'))
    + from(sc, layer(0.85, lit(castShadow(240, 1286, 1.75, 'oHidden') + sisterDC(240, 1286, 1.75, 1, { mood: 'stern', look: [2.4, 0.4], armL: [16, 2, 3], armR: 78 }), 'oHidden')))
    + NEAR(foliage('r', 1660, { color: '#2a2634', seed: 6 }));
}

// 4 · SHOT "In her final months, she told her superior the truth.": old Catherine and Sister Dufès by candlelight.  SHOT "She was the
//     one who had seen Mary.": light breaks behind her, Sister Dufès is astonished.  SHOT "She died before that year ended.": she
//     closes her eyes, at peace.
const C4 = [310, 1345, 2.1], D4 = [620, 1322, 2.05];
function scene4() {
  const fi = at(4, 'final months'), wa = at(4, 'She was the one'), di = at(4, 'She died');
  return layer(0.95, lit(castShadow(...D4, 'oConfess') + seq((o) => sisterDC(...D4, 2, { flip: true, look: [2.4, 0.2], armL: [16, 2, 3], armR: [16, 2, 3], ...o }),
      [[0, { mood: 'happy' }], [wa + 0.2, { mood: 'surprised', armR: 70 }], [di, { mood: 'sad' }]]), 'oConfess'))
    + `<g opacity="0"${fadeIn(wa, 0.4)}>${glow(C4[0], 760, 300, 0.75)}</g>`
    + burst(C4[0], 780, 340, wa, { color: '#fff4d8', rays: 16, sparks: 16, seed: 6 })
    + lit(castShadow(...C4, 'oConfess') + seq((o) => catherineL(...C4, { ...OLD, armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', look: [2.4, 0.2], armR: 40 }], [fi + 0.6, { mood: 'happy', look: [2.4, 0], armR: 70, talk: [fi + 0.6, wa] }],
        [wa, { mood: 'awe', look: [0, -1.4], armR: 40 }], [di, { mood: 'peaceful', ...PRAY, halo: di + 0.3 }]]), 'oConfess')
    + NEAR(bokeh(5, { seed: 13, sides: true, op: [0.15, 0.3] }));
}

// 5 · SHOT "Today she rests beneath an altar in that same chapel.": the side altar glows; pilgrims kneel before it.  SHOT "She hid her
//     lips stayed closed, but her medal spoke for her.": Catherine in light holding the medal.
const C5 = [420, 1345, 2.2], PK5 = [[760, 1322, 1.85, 0], [920, 1310, 1.75, 2]];
function scene5() {
  const re = at(5, 'rests'), hi = at(5, 'Her lips');
  const altar = '<g transform="translate(540,1250)"><rect x="-230" y="-200" width="460" height="200" fill="#e8dcc4"/><rect x="-230" y="-214" width="460" height="18" fill="#c8b48a"/>'
    + '<rect x="-180" y="-170" width="360" height="110" rx="10" fill="#cfe0ee" opacity=".55"/><rect x="-180" y="-170" width="360" height="110" rx="10" fill="none" stroke="#c8963e" stroke-width="5"/>'
    + `<path d="M-150 -90 Q0 -130 150 -90" stroke="#fbf6ea" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>${glow(0, -120, 260, 0.55)}</g>`;
  return until(hi, layer(0.85, altar) + layer(0.95, PK5.map(([x, y, s, i], k) => from(re + 0.3 + k * 0.3, lit(castShadow(x, y, s, 'oGlory')
      + sisterDC(x, y, s, i, { flip: true, kneel: true, mood: 'peaceful', ...PRAY }), 'oGlory'))).join('')))
    + from(hi, lit(castShadow(...C5, 'oGlory') + catherineL(...C5, { halo: true, mood: 'tender', look: [0, 0], armL: [16, 2, 3], armR: 70, propR: smallMedal(1.4) }), 'oGlory')
      + glow(C5[0], 760, 260, 0.5))
    + NEAR(bokeh(7, { seed: 17, sides: true }));
}

// 6 · SHOT "Her feast day is November 28, and she is patron of seniors.": Catherine with an elderly man and woman.  SHOT "Saint Catherine
//     Labouré, pray for us.": tender, sparkles.
const C6 = [470, 1345, 2.25], O6 = [800, 1310, 1.9];
function scene6() {
  const nv = at(6, 'November'), se = at(6, 'seniors'), pr = at(6, 'pray for us');
  return from(se - 0.2, layer(0.92, lit(castShadow(...O6, 'oGlory') + oldMan(...O6, { flip: true, mood: 'tender', look: [2.4, 0], armL: [16, 2, 3], armR: [16, 2, 3] }), 'oGlory')))
    + lit(castShadow(...C6, 'oGlory') + seq((o) => catherineL(...C6, { halo: true, armL: [16, 2, 3], ...o }),
      [[0, { mood: 'happy', look: [0, 0], armR: 40, propR: smallMedal(1.3) }], [pr, { mood: 'tender', armR: 40, propR: smallMedal(1.3) }]]), 'oGlory')
    + `<g opacity="0"${fadeIn(nv, 0.7)}>${glow(C6[0], 740, 240, 0.45)}</g>`
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 300, 760, 520, 900, { seed: 27 })}</g>`
    + NEAR(bokeh(7, { seed: 45, sides: true }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'St_Catherine_Laboure_Secret',
  bg3d: './catherine_laboure_secret.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'conrad.bg3d.js': './conrad_spider_chalice.bg3d.js', 'mexico.bg3d.js': './miguel_pro_firing_squad.bg3d.js', 'medal.bg3d.js': './miraculous_medal.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { mary: { voice: 'ff_siwis', speed: 0.92 } },
  music: { story: 'a young French sister who saw the Virgin Mary and gave the world the Miraculous Medal, then kept it secret for forty-six years while serving the elderly',
    color: 'Nineteenth-century France: warm strings, harp, soft organ and a gentle wordless choir, intimate and tender',
    cues: { 1: 'Luminous and awed: shimmering high strings and harp, a soft choir as light pours out.', 2: 'Hushed and humble: a single cello and soft organ.' } },
  thumb_hook: 'She kept it secret 46 years', thumb_title: 'St. Catherine Labouré', thumb_scene: 0, thumb_t: 3.6, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: { 'lˌeɪbɚɹˈeɪ': 'lˌɑːbuːɹˈeɪ', 'ɐlˈeɪdəl': 'ˌɑːlɑːdˈɛl' },   // Labouré = lah-boo-RAY, Aladel = ah-lah-DEL (from miraculous_medal.mjs)
  scenes: [
    { kicker: 'PARIS · 1876', title: 'Forty-Six Years Silent', art: scene0, bg3d: 'oHook', front3d: true,
      cam: { ...GLIDE, path: [
        { at: 0, to: [S0[0] + 40, 1000], z: 1.0, frame: [480, 1000] },
        { at: at(0, 'medal'), to: [S0[0] + 120, 1000], z: 1.2, frame: [560, 960] },
        { at: at(0, 'This is'), to: face(...S0), z: 1.3, frame: [580, 860] }] },
      tone: HOOK,
      say: ['A young sister saw Mary, gave the world her medal, then stayed silent for forty-six years.', 'This is Saint Catherine Labouré.'] },
    { kicker: 'RUE DU BAC · PARIS · 1830', title: 'The Lady of the Medal', art: scene1, bg3d: 'oVision', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(1, 'appeared'), to: [G1[0], 900], z: 1.08, frame: [560, 900] },
        { at: at(1, 'These rays'), to: face(G1[0], G1[1] - G1[2] * 0.78, G1[3]), z: 1.3, frame: [560, 840] }] },
      tone: HOOK,
      say: ['Mary appeared to her in a Paris chapel.', { text: 'These rays are the graces I pour out upon those who ask for them.', who: 'mary' }] },
    { kicker: 'PARIS · 1830', title: 'Say Nothing', art: scene2, bg3d: 'oConfess', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(2, 'did not'), to: face(...A2), depth: 0.95, z: 1.2, frame: [560, 860] },
        { at: at(2, 'And she obeyed'), to: face(...C2), z: 1.3, frame: [520, 880] }],
        zoom: { at: at(2, 'keep quiet'), to: face(...A2), depth: 0.95, style: 'cut', z: 1.45, hold: 1.0 } },
      tone: STAND,
      say: ['Her confessor, Father Aladel, did not believe her.', 'He told her to think of other things, and to keep quiet.', 'And she obeyed.'] },
    { kicker: 'ENGHIEN HOSPICE · PARIS', title: 'Millions, Unknown', art: scene3, bg3d: 'oHidden', front3d: true,
      cam: { ...GLIDE, whip: 'r', path: [
        { at: at(3, 'millions'), to: [540, 860], z: 1.05, frame: [540, 900] },
        { at: at(3, 'Yet for'), to: [C3[0] + 160, 1000], z: 1.15, frame: [540, 960] }] },
      tone: STAND,
      say: ['Still, the medal was made, and millions wore it.', 'Yet for forty-five years she cared for the elderly, unknown.', 'When superiors scolded her unfairly, she still said nothing.'] },
    { kicker: 'PARIS · 1876', title: 'The Secret Told', art: scene4, bg3d: 'oConfess', front3d: true,
      cam: { ...GLIDE, shake: { at: at(4, 'She was the one', 0.05), amt: 12, dur: 0.5 }, path: [
        { at: at(4, 'final months'), to: [550, 980], depth: 0.95, z: 1.08, frame: [540, 960] },
        { at: at(4, 'She was the one'), to: face(...C4), z: 1.3, frame: [520, 860] }] },
      tone: { speed: 0.95, gap: 0.3, gain: -1, voice: { am_michael: 0.8, am_onyx: 0.2 } },
      say: ['In her final months, she told her superior the truth.', { text: 'She was the one who had seen Mary.', speed: 0.85 }, 'She died before that year ended.'] },
    { kicker: 'RUE DU BAC CHAPEL', title: 'Under the Altar', art: scene5, bg3d: 'oGlory', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(5, 'rests'), to: [540, 1080], depth: 0.85, z: 1.08, frame: [540, 1000] },
        { at: at(5, 'Her lips'), to: face(...C5), z: 1.3, frame: [520, 860] }] },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Today she rests beneath an altar in that same chapel.', 'Her lips stayed closed, but her medal spoke for her.'] },
    { kicker: 'FEAST DAY · NOVEMBER 28', title: 'Saint Catherine', art: scene6, bg3d: 'oGlory', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(6, 'seniors'), to: [C6[0] + 120, 1000], z: 1.1, frame: [540, 980] },
        { at: at(6, 'pray for us'), to: face(...C6), z: 1.3, frame: [540, 860] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Her feast day is November 28, and she is patron of seniors.', 'Saint Catherine Labouré, pray for us.'] },
  ],
};
