// St. Rufus: "his father carried the cross" (one story: Simon of Cyrene, and the son the Gospel names). Feast: November 21.
// All-3D backgrounds (rufus_simon_of_cyrene.bg3d.js: Jerusalem from presentation_of_mary.bg3d.js, Rome from gelasius.bg3d.js); cam3d; hd().
// Sources: Mark 15:21 (NABRE: "They pressed into service a passer-by, Simon, a Cyrenian, who was coming in from the country,
// the father of Alexander and Rufus, to carry his cross"); Luke 23:26 ("to carry it behind Jesus"); Romans 16:13 ("Greet Rufus,
// chosen in the Lord, and his mother and mine"); Catholic Encyclopedia "St. Rufus" (a disciple of the Apostles in Rome, greeted
// by Paul with his mother; feast 21 November); Wikipedia "Rufus (biblical figure)" and Biola's Good Book Blog (Mark names the
// sons because his readers likely knew them; the identification with the Rufus of Romans is widely held but not certain);
// National Catholic Register ("a son of Simon of Cyrene, perhaps"). The link between the two Rufuses is told as tradition.
// Christ on the way of the cross is shown reverently and bloodless (crown of thorns, no wounds).
// Exported for later reels: rufusHD, simonCyrene, legionary, paulHD, thornCrown, carriedCross, gospelBook, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, book, NEAR, MID, layer } from '../art.mjs';
import { hd, seq, wordTimes } from '../hd.mjs';
import { scroll, jesusHD } from './andrew_apostle.mjs';
import { quill } from './albert_the_great.mjs';

const at = wordTimes('st_rufus_simon_of_cyrene');
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const walkIn = (t, dx, dur = 1.2) => M.tw([{ at: t, dur, from: { x: dx, opacity: 0 }, to: { x: 0, opacity: 1 }, ease: 'power2.out' }]);
const punch = (t, amt = 0.04, ox = 540, oy = 1000) => M.tw([{ at: t, dur: 0.9, from: { scale: 1 }, to: { scale: 1 + amt }, ease: 'power2.out', origin: `${ox} ${oy}` }]);
const popAt = (t, x, y, svg, dur = 0.5) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.6 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2)', origin: '0 0' }])}>${svg}</g></g>`;

// ================================================================ props
/** The crown of thorns (body space, on the hair). */
export const thornCrown = '<g fill="none" stroke-linecap="round"><path d="M-44 -274 Q0 -292 44 -274" stroke="#6a4a2a" stroke-width="7"/><path d="M-44 -270 Q0 -284 44 -270" stroke="#8a6a3a" stroke-width="4"/>'
  + '<path d="M-36 -280 l-6 -10 M-20 -285 l-2 -12 M-4 -288 l3 -12 M12 -287 l6 -10 M28 -283 l8 -8 M-30 -275 l-8 6 M20 -278 l6 7" stroke="#5a3a20" stroke-width="2.4"/></g>';
/** The whole cross carried on the right shoulder (body space, drawn behind the body): crossbar at the shoulder, the upright
 * trailing down behind to the ground. */
export const carriedCross = '<g transform="translate(26,-196) rotate(58)"><rect x="-13" y="-90" width="26" height="430" rx="4" fill="#7a5432"/><rect x="1" y="-90" width="12" height="430" fill="#5a3a22" opacity=".6"/>'
  + '<rect x="-120" y="-12" width="240" height="24" rx="4" fill="#8a6038"/><rect x="-120" y="2" width="240" height="10" fill="#5a3a22" opacity=".55"/><path d="M-90 -2 h50 M30 -4 h60" stroke="#a87a48" stroke-width="3" opacity=".6"/></g>';
/** The Gospel of Mark open at 15:21 (centre at 0,0). */
export const gospelBook = (s = 1) => `<g transform="scale(${s})"><circle r="110" fill="url(#haloGlow)" opacity=".85"/><g transform="scale(3.2)">${book(true)}</g>`
  + '<text y="-34" text-anchor="middle" font-family="Lora, serif" font-weight="700" font-size="22" fill="#5a3a22">MARK 15:21</text></g>';
/** A Roman helmet with a red crest, and segmented armour (body space). */
const galea = '<g><path d="M-44 -262 Q-44 -318 0 -322 Q44 -318 44 -262 Q0 -272 -44 -262Z" fill="#b8a070"/><path d="M8 -320 Q42 -308 44 -262 L22 -266Z" fill="#8a7448" opacity=".7"/>'
  + '<path d="M-44 -262 L-50 -226 L-36 -224 L-34 -258Z M44 -262 L50 -226 L36 -224 L34 -258Z" fill="#a89060"/><path d="M-30 -322 Q0 -366 30 -322 Q0 -336 -30 -322Z" fill="#c8323a"/></g>';
const lorica = '<g><path d="M-40 -200 Q0 -190 40 -200 L46 -110 Q0 -100 -46 -110Z" fill="#a8b0bc"/><path d="M-44 -176 Q0 -166 44 -176 M-45 -152 Q0 -142 45 -152 M-46 -128 Q0 -118 46 -128" stroke="#6a7484" stroke-width="3" fill="none"/></g>';

// ================================================================ characters
const SKS = '#9a6540';
/** St. Rufus (grown, in Rome): curly dark hair, short beard, ochre tunic, blue mantle, halo. */
export const rufusHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#c8803e', mantle: '#2f5f7e', lining: '#f2c46b', trim: '#e8b45a', belt: '#6a4428', skin: '#b07a52',
  hair: '#24180f', hairStyle: 'curly', beard: '#24180f', beardStyle: 'short', age: 'young', iris: '#3a2416', shoes: '#6a4428', ...o });
/** Simon of Cyrene: a North African Jew, dark beard going grey, brown traveller's tunic and olive mantle. */
export const simonCyrene = (x, y, s, { cross = false, over = '', ...o } = {}) => hd(x, y, s, { top: '#8a6a4a', mantle: '#5e6a44', lining: '#c8a86a', trim: '#c8a86a', belt: '#4a3020',
  skin: SKS, hair: '#2e2018', hairStyle: 'short', beard: '#4a3c30', beardStyle: 'full', age: 'mid', iris: '#3a2416', shoes: '#5a3a22', ...o, under: (cross ? carriedCross : '') + (o.under || ''), over });
/** His two boys, Alexander and Rufus. */
const boy = (x, y, s, i = 0, o = {}) => hd(x, y, s, { top: i ? '#c8803e' : '#5a7a9a', mantle: null, belt: '#6a4428', skin: '#a87048', hair: '#20160e', hairStyle: 'curly', beard: null,
  age: 'young', iris: '#3a2416', shoes: '#6a4428', ...o });
/** A Roman soldier: red tunic, segmented armour, crested helmet. */
export const legionary = (x, y, s, o = {}) => hd(x, y, s, { top: '#a8323a', mantle: '#7a2028', lining: '#a8323a', plain: true, belt: '#5a3a22', skin: '#e2b48f', hair: '#3a2a1e', beard: null,
  age: 'mid', iris: '#3a2a20', shoes: '#5a3a22', mood: 'stern', ...o, over: lorica + galea + (o.over || '') });
/** St. Paul: balding with a long dark beard, green tunic, red mantle. */
export const paulHD = (x, y, s, o = {}) => hd(x, y, s, { top: '#3e6a4e', mantle: '#a8323a', lining: '#f2c46b', trim: GOLD, belt: '#c8963e', skin: '#d9a47e', hair: '#3a2a1e', hairStyle: 'old',
  beard: '#3a2a1e', beardStyle: 'long', age: 'mid', iris: '#3a2a20', shoes: '#5a3a22', halo: true, ...o });
const rufusMother = (x, y, s, o = {}) => hd(x, y, s, { top: '#7a5a8a', mantle: '#c8a86a', lining: '#7a5a8a', veil: '#efe4d0', veilHair: 'covered', belt: '#5a4a34', skin: '#a87048',
  hair: '#4a3a2e', beard: null, age: 'old', iris: '#3a2416', shoes: '#5a4a34', ...o });
const jesusWay = (x, y, s, o = {}) => jesusHD(x, y, s, { mantle: null, over: thornCrown, ...o });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  jHook:   { key: '#ffd8b0', from: 'l', tint: '#d8c8c8', amt: 0.12, rim: '#ffe0c0', rimOp: 0.75 },
  jRoad:   { key: '#fff0c8', from: 'l', tint: '#fff0dc', amt: 0.05, rim: '#fff6e0', rimOp: 0.6 },
  jWay:    { key: '#ffd8b0', from: 'l', tint: '#d8c8c8', amt: 0.14, rim: '#ffe0c0', rimOp: 0.75 },
  jName:   { key: '#ffc888', from: 'r', tint: '#ffe0b0', amt: 0.12, rim: '#fff0c8', rimOp: 0.8 },
  rLetter: { key: '#ffd8a0', from: 'l', tint: '#ffe4c0', amt: 0.1, rim: '#fff0d0', rimOp: 0.8 },
  rGlory:  { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `rlit${++LID}`, d = 5;
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
export const castShadow = (x, y, s, mode) => {
  const [dx, dy, rx, ry, rot] = { l: [70, 8, 100, 14, 6], r: [-70, 8, 100, 14, -6], back: [0, 20, 70, 24, 0], top: [0, 3, 74, 14, 0] }[LIGHT[mode].from];
  return `<ellipse cx="${f(x + dx * s)}" cy="${f(y + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}" fill="#140c14" opacity=".26" filter="url(#blur6)" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
};

// ================================================================ scenes
// cam3d: the character plane (depth 1) is 20 units away; feet art y: depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262.
// 0 · hook: Rufus in front; behind him a soldier forces his father to take up the cross (push-fast)
function scene0() {
  const fc = at(0, 'forced'), fa = at(0, 'That man'), ti = at(0, 'This is'), nm = at(0, 'Saint Rufus');
  return MID(lit(castShadow(650, 1250, 1.5, 'jHook') + seq((op) => simonCyrene(650, 1250, 1.5, { look: [2.4, 0], ...op }),
      [[0, { mood: 'surprised', armL: 20, armR: 20 }], [fc, { cross: true, mood: 'worried', armL: 20, armR: 44 }]])
    + castShadow(860, 1250, 1.45, 'jHook') + legionary(860, 1250, 1.45, { flip: true, armR: [84, 3, 2.2], armL: 18, look: [2.4, 0] }), 'jHook'))
    + lit(castShadow(330, 1345, 2.35, 'jHook') + `<g${punch(fa, 0.035, 360, 900)}>`
      + seq((op) => rufusHD(330, 1345, 2.35, { armL: 30, propL: `<g transform="translate(0,8)">${scroll(1.5)}</g>`, ...op }),
        [[0, { mood: 'sad', look: [2.6, -0.4], armR: [14, 2, 3] }], [fa, { mood: 'tender', look: [2.6, -0.4], armR: [14, 2, 3] }],
         [ti, { mood: 'happy', look: [0, 0], armR: [14, 2, 3] }], [nm, { mood: 'happy', look: [0, 0], armR: [14, 2, 3], halo: nm }]]) + '</g>', 'jHook')
    + NEAR(foliage('l', 1640, { color: '#2a2430' }) + foliage('r', 1660, { color: '#2a2430', seed: 5 }));
}

// 1 · Simon of Cyrene, coming in from the country (pan-r)
function scene1() {
  const cy = at(1, 'Cyrene'), cm = at(1, 'coming into');
  return lit(`<g${M.drift(60, 0)}>${castShadow(420, 1345, 2.3, 'jRoad')}`
      + seq((op) => simonCyrene(420, 1345, 2.3, { armL: [14, 2, 3], armR: 30, propR: '<rect x="-5" y="-250" width="10" height="320" rx="4" fill="#7a5a3a"/>', ...op }),
        [[0, { mood: 'happy', look: [0, 0] }], [cy, { mood: 'happy', look: [2.4, -0.4] }], [cm, { mood: 'joy', look: [2.4, -0.4] }]]) + '</g>', 'jRoad')
    + layer(0.9, popAt(cy, 800, 640, `<g${M.bob(5, 3)}><circle r="96" fill="url(#haloGlow)" opacity=".8"/><circle r="62" fill="#e8d8b0"/>`
      + '<path d="M-40 -18 Q-20 -40 10 -36 Q30 -40 42 -16 Q46 10 30 26 Q10 44 -14 38 Q-40 26 -40 -18Z" fill="#c8a868"/><circle cx="-6" cy="-6" r="7" fill="#c8323a"/>'
      + '<text y="92" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="26" fill="#fff4cc">CYRENE</text></g>', 0.6))
    + NEAR(foliage('l', 1650, { color: '#3a4a2a', seed: 2 }));
}

// 2 · he had not chosen this; he carries the cross behind Jesus (pan-l)
function scene2() {
  const nc = at(2, 'not chosen'), lf = at(2, 'laid the cross'), bh = at(2, 'behind Jesus');
  return layer(0.92, lit(castShadow(250, 1310, 2.0, 'jWay') + seq((op) => jesusWay(250, 1310, 2.0, { flip: true, armL: 16, armR: 16, ...op }),
      [[0, { mood: 'sad', look: [-2, 0.6] }], [bh, { mood: 'tender', look: [-2.4, 0] }]]), 'jWay'))
    + lit(castShadow(640, 1345, 2.3, 'jWay') + seq((op) => simonCyrene(640, 1345, 2.3, { flip: true, ...op }),
      [[0, { mood: 'worried', look: [2.4, 0], armL: 20, armR: 20 }], [nc, { mood: 'sad', look: [0, 1.6], armL: 16, armR: 16 }],
       [lf, { cross: true, mood: 'determined', look: [2.4, -0.3], armL: 44, armR: 24 }]]), 'jWay')
    + `<g opacity="0"${fadeIn(bh, 1.0)}>${glow(250, 780, 300, 0.35)}</g>`
    + NEAR(foliage('l', 1640, { color: '#262230', seed: 4 }) + foliage('r', 1660, { color: '#262230', seed: 8 }));
}

// 3 · the Gospel remembers him by name: "the father of Alexander and Rufus" (dolly)
function scene3() {
  const gs = at(3, "Mark's Gospel"), al = at(3, 'Alexander'), ru = at(3, 'and Rufus'), rd = at(3, 'first readers');
  return layer(0.9, popAt(gs, 800, 620, `<g${M.bob(5, 3.2)}>${gospelBook(1.1)}</g>`, 0.6))
    + lit(castShadow(400, 1345, 2.3, 'jName') + seq((op) => simonCyrene(400, 1345, 2.3, { armL: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [2.4, -0.6], armR: [16, 2, 3] }], [al, { mood: 'tender', look: [2.4, 0.6], armR: 40 }]])
      + `<g opacity="0"${walkIn(al, 120, 0.8)}>${castShadow(610, 1345, 1.3, 'jName')}${boy(610, 1345, 1.3, 0, { flip: true, mood: 'joy', look: [2.4, -1], armL: 20, armR: 16 })}</g>`
      + `<g opacity="0"${walkIn(ru, 120, 0.8)}>${castShadow(740, 1345, 1.2, 'jName')}${boy(740, 1345, 1.2, 1, { flip: true, mood: 'joy', look: [2.4, -1], armL: 20, armR: 16 })}</g>`, 'jName')
    + `<g opacity="0"${fadeIn(ru, 0.6)}>${sparkles(12, 640, 820, 860, 1060, { seed: 7 })}</g>`
    + `<g opacity="0"${fadeIn(rd, 0.8)}>${glow(560, 900, 360, 0.3)}</g>`
    + NEAR(bokeh(6, { seed: 31 }) + foliage('r', 1650, { color: '#3a3a26', seed: 7 }));
}

// 4 · Rome: Paul greets Rufus and his mother; tradition; the quotable line (pull)
function scene4() {
  const pw = at(4, 'Saint Paul'), q0 = at(4, 'Greet Rufus'), qe = at(4, 'mother and mine', 1.0), tr = at(4, 'Tradition'), fa = at(4, 'His father'), ff = at(4, 'carried the faith');
  return layer(0.95, lit(castShadow(220, 1322, 1.85, 'rLetter') + seq((op) => paulHD(220, 1322, 1.85, { armL: 30, propL: `<g transform="translate(0,4)">${scroll(1.3)}</g>`, armR: 40, propR: quill, ...op }),
      [[0, { mood: 'happy', look: [0, 1] }], [q0 - 0.1, { mood: 'happy', look: [2.4, 0], talk: [q0, qe] }], [qe, { mood: 'tender', look: [2.4, 0] }]]), 'rLetter'))
    + layer(0.92, lit(`<g opacity="0"${walkIn(q0 + 1.2, 140, 1.0)}>${castShadow(830, 1310, 1.75, 'rLetter')}${rufusMother(830, 1310, 1.75, { flip: true, mood: 'tender', look: [2.4, 0], armL: 14, armR: 14 })}</g>`, 'rLetter'))
    + lit(castShadow(560, 1345, 2.3, 'rLetter') + seq((op) => rufusHD(560, 1345, 2.3, { armL: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [-2.4, 0], armR: [16, 2, 3] }], [q0, { mood: 'surprised', look: [-2.4, 0], armR: [16, 2, 3] }], [qe, { mood: 'joy', look: [-2.4, 0], armR: [16, 2, 3], halo: qe }],
       [fa, { mood: 'tender', look: [0, -0.6], armR: 30, propR: `<g transform="translate(0,8)">${scroll(1.5)}</g>`, halo: true }]]), 'rLetter')
    + layer(0.9, popAt(fa, 560, 560, `<g${M.bob(4, 3)}><circle r="90" fill="url(#haloGlow)" opacity=".8"/><g transform="scale(0.32)">${carriedCross.replace('rotate(58)', 'rotate(0)').replace('translate(26,-196)', 'translate(0,-120)')}</g></g>`, 0.6))
    + `<g opacity="0"${fadeIn(ff, 0.8)}>${sparkles(14, 380, 760, 520, 900, { seed: 18 })}</g>`
    + NEAR(bokeh(6, { seed: 23 }) + foliage('l', 1650, { color: '#3a3a26', seed: 12 }));
}

// 5 · feast-day portrait (arc-r)
function scene5() {
  const fd = at(5, 'feast'), pr = at(5, 'pray for us');
  return lit(castShadow(520, 1345, 2.35, 'rGlory') + seq((op) => rufusHD(520, 1345, 2.35, { halo: true, armL: 30, propL: `<g transform="translate(0,8)">${scroll(1.5)}</g>`, armR: [16, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [fd, { mood: 'happy', look: [2.2, -0.4] }], [pr, { mood: 'tender', look: [0, 0] }]]), 'rGlory')
    + `<g opacity="0"${fadeIn(pr, 0.8)}>${sparkles(14, 280, 760, 480, 900, { seed: 21 })}</g>`
    + NEAR(bokeh(7, { seed: 25 }) + foliage('l', 1640, { color: '#2a2440', seed: 13 }) + foliage('r', 1660, { color: '#2a2440', seed: 14 }));
}

export const STORY = {
  slug: 'st_rufus_simon_of_cyrene', name: 'St_Rufus_His_Father_Carried_the_Cross',
  bg3d: './rufus_simon_of_cyrene.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'jer.bg3d.js': './presentation_of_mary.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { paul: { voice: 'bm_george', speed: 0.9 } },
  thumb_hook: 'His father carried the cross', thumb_title: 'St. Rufus', thumb_scene: 0, thumb_t: 7, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'noʊvˈɛmbɚ twˈɛnti wˈʌn': 'noʊvˈɛmbɚ twˈɛnti fˈɜːst',   // November 21 -> November twenty-first
    'sˈaɪɹɛn': 'saɪɹˈiːni',          // Cyrene: sigh-REE-nee
  },
  scenes: [
    { kicker: 'JERUSALEM · AROUND AD 30', title: 'Forced to Carry It', art: scene0, bg3d: 'jHook', front3d: true, cam: { move: 'push-fast', oy: 1000 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ["Roman soldiers pulled a man from the crowd and forced him to carry Jesus' cross.", 'That man was the father of this saint.', 'This is Saint Rufus.'] },
    { kicker: 'FROM CYRENE, NORTH AFRICA', title: 'Just Passing By', art: scene1, bg3d: 'jRoad', front3d: true, cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['His name was Simon, from Cyrene in North Africa.', 'He was only coming into the city from the country, a stranger in the crowd.'] },
    { kicker: 'THE WAY OF THE CROSS', title: 'Behind Jesus', art: scene2, bg3d: 'jWay', front3d: true, cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.28, gain: -0.5, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['He had not chosen this.', 'But the soldiers laid the cross on him, and he carried it behind Jesus, all the way to Golgotha.'] },
    { kicker: 'MARK 15:21', title: 'Remembered by Name', art: scene3, bg3d: 'jName', front3d: true, cam: { move: 'dolly', amt: 0.08, ox: 420, oy: 1000 },
      tone: { speed: 1.0, gap: 0.28, gain: 0 },
      say: ["Years later, Mark's Gospel still remembered him:", { text: 'Simon, the father of Alexander and Rufus.', speed: 0.85 }, "Mark's first readers seem to have known his sons."] },
    { kicker: 'ROME · AROUND AD 57', title: 'Chosen in the Lord', art: scene4, bg3d: 'rLetter', front3d: true, cam: { move: 'pull', amt: 0.07, oy: 1000 },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['In his letter to Rome, Saint Paul wrote:', { text: 'Greet Rufus, chosen in the Lord, and his mother and mine.', who: 'paul' },
        "Tradition holds he was Simon's son.", 'His father carried the cross for a few steps. Rufus carried the faith for life.'] },
    { kicker: 'FEAST DAY · NOVEMBER 21', title: 'Saint Rufus', art: scene5, bg3d: 'rGlory', front3d: true, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast day is November 21.', 'Saint Rufus, pray for us.'] },
  ],
};
