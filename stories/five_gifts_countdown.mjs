// "5 Saints With Supernatural Gifts": a countdown reel (#5 -> #1), the second in the countdown format (see
// five_saints_countdown.mjs). hook -> #5 St. Vincent Ferrer (gift of tongues) -> #4 St. Francis of Paola (sailed on his cloak)
// -> #3 St. Martin de Porres (bilocation) -> #2 St. Padre Pio (stigmata, reading souls) -> #1 St. Joseph of Cupertino (he flew)
// -> outro question in the voiceover (as in the first countdown). The 5 4 3 2 ? ladder (STORY.hud) from makeRankHud().
// Every scene is drawn as the story tells it (user's rule 2026-11-27): the sound of Vincent's sermon reaching people of every
// nation; the boatman refusing and Francis sailing on his cloak with his staff as the mast; Martin seen far away and walking
// into the sick man's room; Padre Pio's marked hands at Mass (small round marks with a glow, as in the earlier Padre Pio reel),
// gloves in the confessional, the marks fading before his death; Joseph rising into the air kneeling, before his brothers and
// before the Pope.
// Upgraded characters: Martin de Porres and Padre Pio were person()-based in martin_de_porres.mjs and padre_pio.mjs; here
// they are redrawn with hd() in the same colours and attributes (exported as martinHD, pioHD).
// All-3D backgrounds (five_gifts_countdown.bg3d.js: set-ups of roma(), anglia(), taurica(), mexico(), cathedral()); cam3d.
// Sources: Wikipedia / New Advent / Catholic.com "Vincent Ferrer" (biographers hold he spoke only Valencian yet was understood
// by hearers of many languages, a view backed by Nicholas de Clemangis of the University of Paris, who heard him preach);
// Aleteia "The Franciscan saint who walked on water", Wikipedia "Francis of Paola", Catholic Rural Life (1464: a boatman
// refused him passage to Sicily because he could not pay; he laid his cloak on the water, tied one end to his staff as a sail
// and crossed the Strait of Messina; patron of Italian seafarers, Pius XII 1943); Wikipedia / New World Encyclopedia / EWTN /
// Dominicains "Martin de Porres" (never left Lima, yet reported in Mexico, Africa, China, Japan; a Lima merchant fell ill in
// Mexico, called for Martin, and saw him enter his room); EWTN News / Aleteia / Hozana "Padre Pio" (stigmata from 1918 to his
// death in 1968, examined by Church investigators and doctors, vanished days before he died; told penitents the sins they
// needed to confess); Wikipedia / Catholic World Report / Catholic Education "Joseph of Cupertino" (about seventy levitations
// recorded; rose into the air before Pope Urban VIII; Prosper Lambertini, the devil's advocate and later Benedict XIV,
// conceded the witnesses were reliable; mocked as slow-witted, "the high-flying dunce", Catholic Herald).
// Exported for later reels: vincentHD, francisPaola, martinHD, pioHD, josephCupertino, lambertini, medieval, boatman, boat,
// cloakRaft, postcard, bed, roomWall, host, pennant, soundRings, LIGHT, lit, castShadow.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, book, beam, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import { speedLines, sweat, squash, streaks } from '../cartoonfx.mjs';
import { makeRankHud } from './five_saints_countdown.mjs';
import { dominican } from './albert_the_great.mjs';
import { broom } from './martin_de_porres.mjs';
import { MITT, STIGMA, capuchinCape, altar, confessionalFront, crucifix } from './padre_pio.mjs';
import { leonard, popeBenedict, roman1750 } from './leonard_of_port_maurice_colosseum.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';

const SLUG = 'five_saints_supernatural_gifts';
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
const fadeOut = (t, dur = 0.5) => M.tw([{ at: t, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const until = (t, svg) => `<g${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 1 }, to: { opacity: 0 } }])}>${svg}</g>`;
const from = (t, svg) => `<g opacity="0"${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }])}>${svg}</g>`;
const span = (t0, t1, svg) => `<g opacity="0"${M.tw([{ at: t0 - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t1 - 0.02, dur: 0.04, to: { opacity: 0 } }])}>${svg}</g>`;
const popAt = (t, x, y, svg, dur = 0.45) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.5 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2.2)', origin: '0 0' }])}>${svg}</g></g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];
const PRAY = { armL: -20, armR: -20 };

// ================================================================ props
/** The Host, raised at Mass (hand at 0,0). */
export const host = '<g transform="translate(0,-22)"><circle r="34" fill="url(#haloGlow)"/><circle r="17" fill="#fbf6ea" stroke="#e8dcc0" stroke-width="2.5"/><path d="M0 -8 V8 M-7 -2 H7" stroke="#e0d0a8" stroke-width="2"/></g>';
/** A small nation's pennant on a stick (base at 0,0): two colours and an optional mark. */
export const pennant = (a, b, mark = '') => `<g><rect x="-2.5" y="-96" width="5" height="96" rx="2" fill="#6a4a2a"/><path d="M2 -96 L64 -82 L2 -66Z" fill="${a}"/><path d="M2 -82 L64 -82 L2 -66Z" fill="${b}" opacity=".9"/>${mark}</g>`;
const NATIONS = [
  pennant('#c8323a', '#e8b83a', '<rect x="14" y="-90" width="10" height="10" fill="#f2c46b"/>'),   // Castile
  pennant('#2f4a9a', '#2f4a9a', '<circle cx="18" cy="-82" r="4" fill="#f2c46b"/><circle cx="32" cy="-81" r="3.5" fill="#f2c46b"/>'),   // France
  pennant('#f6f2ea', '#f6f2ea', '<path d="M2 -82 H58 M18 -94 V-70" stroke="#c8323a" stroke-width="5"/>'),   // England
  pennant('#e8b83a', '#2a2424'),   // the Empire
];
/** Golden sound rings from a speaker's mouth (cx, cy), travelling right, from t on. */
export const soundRings = (cx, cy, t, { n = 5, span = 460, dur = 1.8, every = 0.45, color = '#ffe4a0' } = {}) => {
  let o = '';
  for (let k = 0; k < n; k++) { const t0 = t + k * every;
    o += `<g transform="translate(${cx},${cy})"><g opacity="0"${M.tw([{ at: t0, dur, from: { opacity: 0.9, scale: 0.15, x: 0 }, to: { opacity: 0, scale: 1, x: span * 0.35 }, ease: 'power1.out', origin: '0 0' }])}>`
      + `<path d="M40 -120 Q130 0 40 120" stroke="${color}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M90 -170 Q210 0 90 170" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/></g></g>`; }
  return o;
};
/** A wooden rowing boat (centre of the deck at 0,0). */
export const boat = (s = 1) => `<g transform="scale(${s})"><ellipse cy="52" rx="210" ry="18" fill="#2a3a4a" opacity=".35"/>`
  + '<path d="M-200 -6 L200 -6 L160 46 L-160 46Z" fill="#7a4e2e"/><path d="M-200 -6 L200 -6 L196 6 L-196 6Z" fill="#a8723e"/><path d="M60 -6 L200 -6 L160 46 L40 46Z" fill="#5a3a22" opacity=".5"/>'
  + '<path d="M-170 20 H170" stroke="#5a3a22" stroke-width="4" opacity=".6"/></g>';
const oar = '<g transform="rotate(30)"><rect x="-4" y="-20" width="8" height="230" rx="3" fill="#8a6234"/><ellipse cx="0" cy="214" rx="14" ry="32" fill="#a8763e"/></g>';
/** Francis's cloak spread on the sea with his staff as the mast and one end of the cloak tied up as a sail (deck at 0,0). */
export const cloakRaft = (s = 1) => `<g transform="scale(${s})"><ellipse cy="20" rx="170" ry="20" fill="#2a3a4a" opacity=".35"/>`
  + '<path d="M-150 0 Q-160 -14 -120 -16 L120 -16 Q160 -14 150 0 Q0 22 -150 0Z" fill="#3e302a"/><path d="M-150 0 Q0 22 150 0" stroke="#5a4636" stroke-width="5" fill="none"/>'
  + '<rect x="56" y="-330" width="9" height="318" rx="3" fill="#8a6234"/>'
  + '<path d="M64 -318 Q150 -250 120 -60 L66 -40Z" fill="#4a3a30"/><path d="M64 -318 Q110 -260 96 -80" stroke="#6a5444" stroke-width="4" fill="none"/></g>';
/** A plain shepherd's staff (hand at 0,0). */
/** A patch of sea with ripples around a floating thing (centre x, waterline y, half-width w). */
const water = (x, y, w) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${f(w * 0.16)}" fill="#5a7a98" opacity=".92"/><ellipse cx="${x}" cy="${y - 4}" rx="${f(w * 0.86)}" ry="${f(w * 0.1)}" fill="#7a9ab4" opacity=".7"/>`
  + `<g${M.drift(18, 0, 3)}><path d="M${x - w * 0.7} ${y + 6} q30 -8 60 0 M${x + w * 0.1} ${y + 12} q30 -8 60 0 M${x - w * 0.2} ${y - 2} q24 -6 48 0" stroke="#e8f4ff" stroke-width="3" fill="none" opacity=".7"/></g>`;
const staff = '<g><rect x="-4.5" y="-250" width="9" height="320" rx="4" fill="#8a6234"/><rect x="0" y="-250" width="4.5" height="320" fill="#6a4a2a" opacity=".6"/></g>';
/** A postcard-like window onto a faraway place where Martin is seen: 'mexico' | 'africa' | 'china' (centre at 0,0). */
export const postcard = (place, mini = '') => {
  const sky = { mexico: ['#f4b47a', '#fbe0b0'], africa: ['#f0a060', '#f8d898'], china: ['#a8c0e0', '#f0e4cc'] }[place];
  const icon = {
    mexico: '<rect x="-60" y="-10" width="120" height="50" fill="#e8d0a8"/><rect x="-74" y="-58" width="30" height="98" fill="#e0c49a"/><rect x="44" y="-58" width="30" height="98" fill="#e0c49a"/>'
      + '<path d="M-74 -58 L-59 -78 L-44 -58Z M44 -58 L59 -78 L74 -58Z" fill="#c8a070"/><path d="M-22 -10 Q0 -40 22 -10Z" fill="#c8a070"/><rect x="-12" y="10" width="24" height="30" rx="10" fill="#7a5a3a"/>',
    africa: '<circle cx="-50" cy="10" r="30" fill="#b88a5a"/><path d="M-86 4 L-50 -40 L-14 4Z" fill="#8a6234"/><rect x="40" y="-60" width="8" height="100" fill="#7a5a3a"/>'
      + '<path d="M44 -60 Q10 -76 -4 -56 M44 -60 Q76 -78 92 -56 M44 -60 Q30 -92 12 -94 M44 -60 Q62 -92 82 -90" stroke="#4a7a3a" stroke-width="9" fill="none" stroke-linecap="round"/>',
    china: '<rect x="-30" y="-10" width="60" height="50" fill="#c8402e"/><path d="M-60 -10 Q0 -30 60 -10 L40 -24 L-40 -24Z" fill="#3a3a44"/><rect x="-22" y="-46" width="44" height="24" fill="#c8402e"/>'
      + '<path d="M-48 -46 Q0 -62 48 -46 L32 -58 L-32 -58Z" fill="#3a3a44"/><path d="M0 -58 V-74" stroke="#3a3a44" stroke-width="5"/>',
  }[place];
  const id = `pc${place}`;
  return `<g><rect x="-122" y="-96" width="244" height="192" rx="18" fill="#fbf6ea"/><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>`
    + `<rect x="-110" y="-84" width="220" height="168" rx="12" fill="url(#${id})"/><g transform="translate(-20,20)">${icon}</g>${mini}`
    + '<rect x="-122" y="-96" width="244" height="192" rx="18" fill="none" stroke="#e8c87a" stroke-width="4"/></g>';
};
/** A plain wooden bed with a pillow and a blanket (foot at the right; base centre at 0,0). */
export const bed = (s = 1) => `<g transform="scale(${s})"><ellipse cy="6" rx="250" ry="16" fill="#140c14" opacity=".25"/>`
  + '<rect x="-240" y="-100" width="480" height="70" rx="8" fill="#8a5a34"/><rect x="-240" y="-60" width="480" height="20" fill="#6a4426" opacity=".6"/>'
  + '<rect x="-236" y="-30" width="16" height="34" fill="#6a4426"/><rect x="220" y="-30" width="16" height="34" fill="#6a4426"/>'
  + '<rect x="-256" y="-190" width="26" height="194" rx="6" fill="#7a4e2c"/><rect x="230" y="-150" width="26" height="154" rx="6" fill="#7a4e2c"/></g>';
const blanket = (s = 1) => `<g transform="scale(${s})"><path d="M-110 -128 Q40 -146 226 -118 L226 -92 Q40 -100 -110 -96Z" fill="#c8a87a"/><path d="M-110 -128 Q40 -146 226 -118" stroke="#e8d0a8" stroke-width="4" fill="none"/></g>`;
const pillow = (s = 1) => `<g transform="scale(${s})"><ellipse cx="-196" cy="-118" rx="44" ry="20" fill="#f6f0e2"/></g>`;
/** The sick man's room in Mexico: a plaster wall with a night window and a small cross (a MID card, floor line at base). */
export const roomWall = (base = 1250) => `<rect x="-300" y="${base - 760}" width="1680" height="760" fill="#e8d4b4"/><rect x="-300" y="${base - 80}" width="1680" height="80" fill="#c8b090"/>`
  + `<rect x="620" y="${base - 620}" width="200" height="250" rx="100" fill="#22305a"/><circle cx="760" cy="${base - 540}" r="22" fill="#f4ecd0"/><path d="M620 ${base - 470} H820 M720 ${base - 620} V${base - 370}" stroke="#8a6a44" stroke-width="10"/>`
  + `<path d="M300 ${base - 600} V${base - 480} M270 ${base - 560} H330" stroke="#6a4a2a" stroke-width="12" stroke-linecap="round"/>`
  + `<rect x="-300" y="${base - 760}" width="1680" height="760" fill="#3a2a2a" opacity=".22"/>`;
const scrolls = (s = 1) => `<g transform="scale(${s})"><ellipse cy="4" rx="90" ry="10" fill="#140c14" opacity=".22"/>`
  + [[-46, -12, -6], [10, -14, 4], [-14, -38, -2], [40, -36, 8]].map(([x, y, r]) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-40" y="-11" width="80" height="22" rx="10" fill="#f4ead2"/><ellipse cx="-40" cy="0" rx="6" ry="11" fill="#d8c8a4"/><ellipse cx="40" cy="0" rx="6" ry="11" fill="#d8c8a4"/></g>`).join('') + '</g>';
const tally = (n) => `<g>${'<rect x="-64" y="-46" width="128" height="80" rx="16" fill="rgba(20,14,30,.6)"/>'}<text x="0" y="12" text-anchor="middle" font-family="Lora,'DejaVu Serif',serif" font-weight="700" font-size="54" fill="${GOLD}">${n}×</text></g>`;

// ================================================================ characters
/** St. Vincent Ferrer: a Dominican (white habit and scapular, black cape and capuce), tonsure, clean-shaven. */
export const vincentHD = (x, y, s, o = {}) => dominican(x, y, s, { hair: '#4a3424', skin: '#d9a47e', iris: '#4a3424', age: 'mid', ...o });
/** St. Francis of Paola: a Minim hermit: a dark brown habit with a hood, a cord, a long white beard, the CHARITAS sun. */
const MINIM = '#3e302a';
const minimHood = `<path d="M-44 -212 Q-52 -240 -32 -254 Q0 -238 32 -254 Q52 -240 44 -212 Q0 -194 -44 -212Z" fill="${dark(MINIM, 0.1)}"/>`;
const charitas = `<g transform="translate(0,-160)"><circle r="26" fill="url(#haloGlow)"/><circle r="12" fill="${GOLD}"/>${Array.from({ length: 10 }, (_, i) => `<path d="M0 -15 L3 -23 L-3 -23Z" fill="${GOLD}" transform="rotate(${i * 36})"/>`).join('')}</g>`;
export const francisPaola = (x, y, s, { over = '', under = '', ...o } = {}) => hd(x, y, s, { top: MINIM, plain: true, trim: dark(MINIM, 0.12), mantle: null, belt: '#c8b48a', skin: '#d9a47e',
  hair: '#e8e2d8', hairStyle: 'old', beard: '#ece6dc', beardStyle: 'long', age: 'old', iris: '#4a3424', ...o, under: minimHood + under, over: (o.kneel ? '' : charitas) + over });
/** St. Martin de Porres (upgraded from the person() rig of martin_de_porres.mjs): a Dominican lay brother, dark skin, short
 * black hair, a thin moustache and beard, the white habit with the black cape. */
export const martinHD = (x, y, s, o = {}) => dominican(x, y, s, { skin: '#6e4428', hair: '#140e0a', hairStyle: 'short', beard: '#140e0a', beardStyle: 'short', iris: '#2a1a12', age: 'mid', ...o });
/** St. Padre Pio (upgraded from the person() rig of padre_pio.mjs): brown Capuchin habit with the short cape, white cord,
 * grey-white hair and full beard; fingerless brown gloves (MITT) unless gloves: false; marks: true shows the stigmata. */
const PIOHAB = '#5e3f28', PIOSK = '#e3b48e';
export const pioHD = (x, y, s, { gloves = true, marks = false, propL = '', propR = '', over = '', ...o } = {}) => hd(x, y, s, { top: PIOHAB, plain: true, trim: dark(PIOHAB, 0.12), mantle: null,
  belt: '#efe6d2', skin: PIOSK, hair: '#d6d0c6', hairStyle: 'old', beard: '#d6d0c6', beardStyle: 'full', age: 'old', iris: '#4a3424', shoes: '#3a2a1c', ...o,
  propL: (gloves ? MITT : marks ? STIGMA : '') + propL, propR: (gloves ? MITT : marks ? STIGMA : '') + propR, over: (o.kneel ? '' : capuchinCape(dark(PIOHAB, 0.04))) + over });
/** St. Joseph of Cupertino: a Conventual Franciscan: grey habit with a hood, white cord, tonsure, short dark beard. */
const CONV = '#5a5450';
const convHood = `<path d="M-44 -212 Q-52 -240 -32 -252 Q0 -238 32 -252 Q52 -240 44 -212 Q0 -194 -44 -212Z" fill="${dark(CONV, 0.12)}"/>`;
export const josephCupertino = (x, y, s, { under = '', ...o } = {}) => hd(x, y, s, { top: CONV, plain: true, trim: dark(CONV, 0.12), mantle: null, belt: '#efe6d2', skin: '#dba882',
  hair: '#3a2a1e', hairStyle: 'tonsure', beard: '#3a2a1e', beardStyle: 'short', age: 'mid', iris: '#3a2a1e', ...o, under: convHood + under });
/** Prosper Lambertini, the Church's "devil's advocate": black cassock, white collar bands, a zucchetto, scrolls of testimony. */
export const lambertini = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#26222a', plain: true, trim: '#3a3440', mantle: null, belt: false, skin: '#e2b48f', hair: '#8a8278',
  hairStyle: 'short', beard: null, age: 'mid', iris: '#3a2a20', shoes: '#1e1a20', mood: 'stern', ...o,
  over: '<path d="M-6 -208 h5 v20 h-5Z M1 -208 h5 v20 h-5Z" fill="#fbf8f0"/><ellipse cx="0" cy="-289" rx="22" ry="8" fill="#6a1e3a"/>' + over });
const MED = [['#2f4a9a', null, '#e2b48f', '#6a4424'], ['#7a3a2e', '#e8dcc8', '#d9a47e', '#3a2a1e'], ['#4a6a3a', null, '#c99a72', '#2a1c14'], ['#8a6a3a', '#c8b8d8', '#e8bc96', '#5a3a22']];
/** A townsman or townswoman of 1400 (women veiled), for Vincent's crowds. */
export const medieval = (x, y, s, i = 0, o = {}) => { const [top, veil, skin, hair] = MED[i % 4];
  return hd(x, y, s, { top, plain: false, trim: light(top, 0.35), mantle: null, belt: '#5a3a22', skin, hair, hairStyle: i % 4 === 2 ? 'curly' : 'short', beard: i % 2 || i % 4 === 0 ? null : hair,
    beardStyle: i % 2 || i % 4 === 0 ? null : 'short', age: i % 3 ? 'mid' : 'young', iris: '#3a2a20', shoes: '#4a3424', ...(veil ? { veil, veilHair: 'covered' } : {}), ...o }); };
const CAP = '<path d="M-42 -268 Q-44 -300 0 -302 Q44 -300 42 -268 Q0 -282 -42 -268Z" fill="#7a2a2a"/>';
/** The boatman of the strait: a short tunic, a red cap, a stubbly beard. */
export const boatman = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#4e6a7a', plain: true, trim: '#3a5060', mantle: null, belt: '#5a3a22', skin: '#c48a5f', hair: '#2a1c12',
  beard: '#2a1c12', beardStyle: 'short', age: 'mid', iris: '#2e2018', mood: 'stern', ...o, over: CAP + over });

// ================================================================ one light per scene (shared with the 3D set)
export const LIGHT = {
  yHook:    { key: '#ffd8a0', from: 'l', tint: '#ffd8b0', amt: 0.12, rim: '#ffe0b8', rimOp: 0.85 },
  yVincent: { key: '#ffc888', from: 'back', tint: '#ffd8b0', amt: 0.1, rim: '#ffe0b0', rimOp: 0.85 },
  yPaola:   { key: '#ffd8b0', from: 'l', tint: '#ffd8c4', amt: 0.1, rim: '#ffe0c0', rimOp: 0.8 },
  yMartin:  { key: '#ffe0b0', from: 'r', tint: '#ffe4c4', amt: 0.1, rim: '#fff0d4', rimOp: 0.75 },
  yPio:     { key: '#fff0c8', from: 'top', tint: '#fff0d8', amt: 0.08, rim: '#fff4d8', rimOp: 0.8 },
  yJoseph:  { key: '#ffc090', from: 'r', tint: '#ffcaa8', amt: 0.14, rim: '#ffd0a0', rimOp: 0.85 },
  yOutro:   { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
};
let LID = 0;
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `fglit${++LID}`, d = 5;
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
// cam3d feet art y (plane 20): depth 1 ~1345, 0.95 ~1322, 0.92 ~1310, 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1245.
const ROW = [[120, 'martin'], [300, 'vincent'], [480, 'paola'], [660, 'joseph'], [840, 'pio']], RS = 1.45;
const rowSaint = (x, who, o) => ({
  martin: () => martinHD(x, 1345, RS, { armR: [24, 2, 3], propR: broom, armL: [20, 2, 3], ...o }),
  vincent: () => vincentHD(x, 1345, RS, { armR: [164, 3, 2.6], armL: [26, 2, 3], propL: book(false), ...o }),
  paola: () => francisPaola(x, 1345, RS, { armR: [26, 2, 3], propR: staff, armL: [18, 2, 3], ...o }),
  joseph: () => josephCupertino(x, 1345, RS, { ...PRAY, ...o }),
  pio: () => pioHD(x, 1345, RS, { flip: true, armL: [30, 2, 3], armR: [22, 2, 3], ...o }),
}[who]());
const row = (mode, steps) => ROW.map(([x, who]) => castShadow(x, 1345, RS, mode) + seq((op) => rowSaint(x, who, op), steps)).join('');

// 0 · HOOK. SHOT "Five saints did things no one on earth could explain.": the five in a row in Rome, each with his sign.
//     SHOT "Wait until you see what number one did in front of the Pope.": the camera pushes in on the row; speed lines.
function scene0() {
  const ex = at(0, 'explain'), wt = at(0, 'Wait'), no = at(0, 'number one');
  return lit(row('yHook', [[0, { mood: 'determined', look: [0, 0] }], [ex, { mood: 'happy', look: [0, 0] }], [no + 0.4, { mood: 'peaceful' }]]), 'yHook')
    + `<g opacity="0"${fadeIn(ex - 0.6, 0.6)}>${glow(480, 760, 520, 0.35)}</g>`
    + speedLines(480, 900, { at: no, dur: 0.8, r0: 340, op: 0.38, color: '#fff4d8', seed: 4 })
    + NEAR(bokeh(6, { seed: 7, sides: true, op: [0.2, 0.4] }));
}

// 1 · #5 ST. VINCENT FERRER. SHOT "Number five, Vincent Ferrer.": the Dominican preacher before a cathedral town, finger raised.
//     SHOT "He preached in his own Valencian tongue.": he preaches; golden sound rings roll out from his mouth across the square.
//     SHOT "Yet crowds from many nations understood every word.": people of four nations, each under his own pennant, light up.
const V1 = [340, 1345, 2.3];
function scene1() {
  const vf = at(1, 'Vincent'), pr = at(1, 'preached'), yc = at(1, 'Yet crowds'), un = at(1, 'understood');
  const crowd = [[560, 0], [690, 1], [820, 2], [950, 3]].map(([x, i], k) => `<g opacity="0"${fadeIn(pr - 0.4 + k * 0.15, 0.5)}>${castShadow(x, 1245, 1.3, 'yVincent')}`
    + seq((op) => medieval(x, 1245, 1.3, i, { flip: true, look: [2.4, 0], armL: [14, 2, 3], ...op }), [[0, { mood: 'happy', armR: [14, 2, 3] }], [un + k * 0.12, { mood: 'joy', armR: [64, 4, 2] }]])
    + `</g>` + popAt(yc + 0.2 + k * 0.25, x + 40, 1245 - 300 * 1.3 + 10, NATIONS[k])).join('');
  const rear = [[620, 4], [760, 5], [900, 6]].map(([x, i]) => `<g opacity="0"${fadeIn(yc + 0.6, 0.6)}>${medieval(x, 1225, 1.05, i, { flip: true, mood: 'joy', armR: [14, 2, 3], armL: 14 })}</g>`).join('');
  return MID(lit(rear + crowd, 'yVincent'))
    + soundRings(V1[0] + 40, V1[1] - 224 * V1[2], pr + 0.1, { n: 6 })
    + lit(castShadow(...V1, 'yVincent') + seq((op) => vincentHD(...V1, { armL: [26, 2, 3], propL: book(true), ...op }),
      [[0, { mood: 'happy', look: [0, 0], armR: [164, 3, 2.6] }], [pr - 0.1, { mood: 'happy', look: [2.4, -0.2], armR: [54, 4, 2.2], talk: [pr, yc - 0.2] }],
        [yc, { mood: 'tender', look: [2.4, -0.2], armR: [164, 3, 2.6] }]]), 'yVincent')
    + `<g opacity="0"${fadeIn(un, 0.6)}>${sparkles(16, 480, 960, 760, 1120, { seed: 9 })}</g>`
    + NEAR(foliage('l', 1650, { color: '#3a3424', seed: 3 }));
}

// 2 · #4 ST. FRANCIS OF PAOLA. SHOT "Number four, Francis of Paola.": the old hermit on the beach at dawn, staff in hand.
//     SHOT "A boatman refused him a ride to Sicily.": a boatman in his boat holds out his hand for money, then waves him off.
//     SHOT "So he spread his cloak on the sea and sailed across.": Francis walks down to the water; then out on the strait he
//     stands on his cloak, his staff the mast, the cloak's end the sail, and glides across; the boatman stares.
const F2 = [330, 1345, 2.3], BT = [700, 1240];
function scene2() {
  const fp = at(2, 'Francis'), bm = at(2, 'boatman'), rf = at(2, 'refused'), so = at(2, 'So he'), sa = at(2, 'sailed');
  const boatman1 = water(BT[0], BT[1] + 52, 300) + `<g transform="translate(${BT[0]},${BT[1] + 20})">${boat(0.85)}</g>` + seq((op) => boatman(BT[0] + 20, BT[1], 1.3, { flip: true, look: [2.4, 0], armL: [20, 2, 3], propL: oar, ...op }),
    [[0, { mood: 'stern', armR: [20, 2, 3] }], [bm, { mood: 'stern', armR: [74, 2, 3] }], [rf + 0.3, { mood: 'stern', armR: [110, 14, 0.5] }], [sa, { mood: 'surprised', armR: [20, 2, 3] }]])
    + sweat(BT[0] + 20, BT[1], 1.3, sa + 0.3);
  const raft = `<g opacity="0"${fadeIn(so + 0.9, 0.4)}><g${M.tw([{ at: so + 0.9, dur: 4.2, from: { x: -40 }, to: { x: 330 }, ease: 'sine.inOut' }])}><g${M.bob(5, 2.2)}>`
    + water(480, 1272, 220) + `<g transform="translate(480,1255)">${cloakRaft(0.8)}</g>`
    + seq((op) => francisPaola(470, 1240, 1.15, { armL: [26, 2, 3], armR: [60, 2, 3], look: [2, -0.4], ...op }), [[0, { mood: 'peaceful' }], [sa + 0.3, { mood: 'tender' }]])
    + leonard(400, 1240, 1.05, { top: MINIM, mood: 'awe', look: [2.4, -1], armL: 18, armR: [90, 3, 2] }) + '</g></g></g>';
  return MID(lit(boatman1 + raft, 'yPaola'))
    + `<g opacity="0"${fadeIn(sa, 0.8)}>${glow(640, 1100, 300, 0.45)}${sparkles(14, 420, 980, 920, 1200, { seed: 13 })}</g>`
    + lit(castShadow(...F2, 'yPaola') + until(so + 0.9, walkOut(so + 0.1, 0.9, 420, seq((op) => francisPaola(...F2, { armR: [26, 2, 3], propR: staff, armL: [18, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [0, 0] }], [fp + 0.4, { mood: 'happy', look: [2.4, -0.2] }], [rf, { mood: 'sad', look: [2.4, 0] }], [so - 0.2, { mood: 'determined', look: [2.4, 0] }]]), { hop: 7, step: 0.3 })), 'yPaola')
    + NEAR(bokeh(6, { seed: 21, sides: true, op: [0.2, 0.4] }));
}

// 3 · #3 ST. MARTIN DE PORRES. SHOT "Number three, Martin de Porres, who never left Lima, Peru.": Martin with his broom in a
//     Lima street.  SHOT "Yet people saw him in Mexico, Africa and China.": three postcard windows pop up around him, each with a
//     tiny Martin in it.  SHOT "A sick man in Mexico called his name.": cut: a room at night, a sick man in bed calls out.
//     SHOT "Then Martin walked in.": Martin is suddenly there beside the bed in a glow; the man lights up.
const M3 = [340, 1345, 2.3], BD = [690, 1322, 0.9], MM = [330, 1345, 2.25];
function scene3() {
  const mt = at(3, 'Martin'), ml = at(3, 'never left'), mx = at(3, 'Mexico'), af = at(3, 'Africa'), ch = at(3, 'China'), sk = at(3, 'A sick'), cl = at(3, 'called'), th = at(3, 'Then Martin');
  const mini = (k) => `<g transform="translate(70,70)"><circle cx="0" cy="-60" r="54" fill="url(#haloGlow)"/>${martinHD(0, 0, 0.42, { mood: 'happy', armR: [24, 2, 3], propR: broom, ph: k * 0.3 })}</g>`;
  const cards = [[mx, 640, 560, 'mexico'], [af, 880, 760, 'africa'], [ch, 610, 900, 'china']].map(([t, x, y, p], k) => popAt(t, x, y, `<g${M.bob(5, 3 + k * 0.4)}>${postcard(p, mini(k))}</g>`, 0.5)).join('');
  const lying = `<g transform="translate(${BD[0] + 150},${BD[1] - 112})"><g transform="rotate(-90)">` + seq((op) => roman1750(0, 0, 1.25, 0, { armL: 8, armR: 8, ...op }),
    [[0, { mood: 'pain' }], [cl, { mood: 'worried', look: [0, -2], talk: [cl, cl + 1.0] }], [th + 0.3, { mood: 'joy', look: [0, -2.4] }]]) + '</g></g>';
  return until(sk, layer(0.9, cards) + lit(castShadow(...M3, 'yMartin') + seq((op) => martinHD(...M3, { propR: broom, armL: [20, 2, 3], ...op }),
      [[0, { mood: 'happy', look: [0, 0], armR: [24, 2, 3] }], [ml, { mood: 'tender', look: [0, 0], armR: [24, 2, 3] }], [mx - 0.2, { mood: 'peaceful', armR: [24, 2, 3] }]]), 'yMartin'))
    + from(sk, MID(roomWall(1245)) + layer(0.95, lit(`<g transform="translate(${BD[0]},${BD[1]})">${bed(BD[2])}${pillow(BD[2])}</g>` + lying + `<g transform="translate(${BD[0]},${BD[1]})">${blanket(BD[2])}</g>`, 'yMartin'))
      + `<g opacity="0"${fadeIn(th - 0.1, 0.3)}>${glow(MM[0], 960, 340, 0.75)}${beam(MM[0] - 100, MM[0] + 100, MM[0] - 220, MM[0] + 220, 1360, 0.6)}`
      + lit(castShadow(...MM, 'yMartin') + martinHD(...MM, { mood: 'tender', look: [2.4, 0.8], halo: th + 0.2, armL: [20, 2, 3], armR: [56, 2, 3] }), 'yMartin')
      + sparkles(16, 160, 520, 700, 1240, { seed: 19 }) + '</g>'
      + speedLines(MM[0], 900, { at: th, dur: 0.7, r0: 300, op: 0.35, color: '#fff4d8', seed: 8 }))
    + NEAR(foliage('r', 1660, { color: '#3a2e24', seed: 5 }));
}

// 4 · #2 ST. PADRE PIO. SHOT "Number two, Padre Pio.": at the altar he lifts the Host; his bare hands show the round marks.
//     SHOT "For fifty years, he bore the wounds of Christ.": the marks glow; the crucifix behind him.
//     SHOT "He told people the sins they forgot to confess.": cut: in the confessional (gloves on) he leans to the grille;
//     the kneeling man is stunned.  SHOT "Days before he died, the wounds vanished.": cut: the old friar kneels in light, his
//     open hands bare: the marks fade away; a halo.
const P4 = [400, 1345, 2.3], PN = [770, 1322, 2.05], PD = [460, 1345, 2.3];
function scene4() {
  const pp = at(4, 'Padre Pio'), fy = at(4, 'fifty'), wo = at(4, 'wounds of Christ'), ht = at(4, 'He told'), sn = at(4, 'the sins'), dy = at(4, 'Days before'), va = at(4, 'vanished');
  const fading = (t) => `<g${fadeOut(t, 1.2)}>${STIGMA}</g>`;
  return until(ht, MID(lit(`<g transform="translate(780,1245)">${crucifix(0.7)}</g>`, 'yPio')) + `<g opacity="0"${fadeIn(fy, 0.6)}>${glow(780, 1000, 260, 0.5)}</g>`
      + lit(castShadow(...P4, 'yPio') + seq((op) => pioHD(...P4, { gloves: false, marks: true, ...op }),
        [[0, { mood: 'peaceful', armL: [150, 2, 3], armR: [150, 2, 3], propR: host }], [fy - 0.2, { mood: 'peaceful', look: [0, -1], armL: [60, 2, 3], armR: [60, 2, 3] }],
          [wo + 0.4, { mood: 'tender', look: [0, -1], armL: [60, 2, 3], armR: [60, 2, 3] }]]), 'yPio')
      + lit(altar(P4[0], 1370, 0.92), 'yPio')
      + `<g opacity="0"${fadeIn(fy, 0.6)}>${sparkles(12, 180, 620, 820, 1100, { seed: 11 })}</g>`)
    + span(ht, dy, layer(0.95, lit(castShadow(...PN, 'yPio') + seq((op) => roman1750(...PN, 2, { flip: true, kneel: true, look: [2.4, -0.4], ...PRAY, ...op }),
        [[0, { mood: 'worried' }], [sn + 0.3, { mood: 'surprised' }]]) + sweat(...PN, sn + 0.5), 'yPio'))
      + lit(castShadow(...P4, 'yPio') + seq((op) => pioHD(...P4, { look: [2.4, 0.4], ...op }), [[0, { mood: 'peaceful', armL: [20, 2, 3], armR: [20, 2, 3] }],
        [sn - 0.2, { mood: 'tender', armL: [20, 2, 3], armR: [34, 2, 3] }]]) + confessionalFront(P4[0], 1345, 1.05), 'yPio'))
    + from(dy, `${beam(PD[0] - 110, PD[0] + 110, PD[0] - 250, PD[0] + 250, 1360, 0.7)}${glow(PD[0], 900, 360, 0.55)}`
      + lit(castShadow(...PD, 'yPio') + seq((op) => pioHD(...PD, { gloves: false, kneel: true, armL: [44, 2, 3], armR: [44, 2, 3], propL: fading(va), propR: fading(va), ...op }),
        [[0, { mood: 'peaceful', look: [0, 1] }], [va + 0.5, { mood: 'tender', halo: va + 0.5 }]]), 'yPio')
      + `<g opacity="0"${fadeIn(va, 0.8)}>${sparkles(16, 240, 700, 700, 1180, { seed: 23 })}</g>`)
    + NEAR(bokeh(6, { seed: 27, sides: true, op: [0.2, 0.4] }));
}

// 5 · #1 ST. JOSEPH OF CUPERTINO. SHOT "And number one, Joseph of Cupertino, a friar mocked as slow.": the grey friar in Rome at
//     dusk; two brothers snicker and point.  SHOT "Witnesses saw him rise into the air in prayer, seventy times.": he kneels to
//     pray and rises into the air, still kneeling; the brothers gape; a "70×" tally pops.  SHOT (slow) "Once, he floated up in
//     front of Pope Urban VIII.": cut: before the Pope he rises again; the Pope is awestruck.  SHOT "Even the Church's skeptic
//     admitted the witnesses were reliable.": cut: the devil's advocate with the scrolls of testimony, stern, then convinced.
//     SHOT "Heaven lifted the man the world looked down on.": Joseph high in the light, haloed; the brothers kneel below.
const J5 = [380, 1345, 2.2], PU = [770, 1322, 2.05], LB = [760, 1322, 2.05];
function scene5() {
  const jc = at(5, 'Joseph'), mk = at(5, 'mocked'), wi = at(5, 'Witnesses'), ri = at(5, 'rise'), sv = at(5, 'seventy'), on = at(5, 'Once'), fl = at(5, 'floated'), ur = at(5, 'Urban'),
    ev = at(5, 'Even the'), ad = at(5, 'admitted'), hv = at(5, 'Heaven'), dn = at(5, 'looked down');
  const brothers = (mode) => [[700, 0.3], [850, 0.7]].map(([x, d], k) => castShadow(x, 1245, 1.3, mode) + seq((op) => leonard(x, 1245, 1.3, { flip: true, look: [2.4, 0], armL: [16, 2, 3], ph: d, ...op }),
    [[0, { mood: 'joy', armR: k ? [20, 2, 3] : [80, 3, 2] }], [ri + 0.4, { mood: 'surprised', armR: [24, 2, 3] }], [hv, { mood: 'peaceful', kneel: true, ...PRAY }]])).join('');
  // the flying friar: kneels at "Witnesses", rises on "rise", stays up; rises higher on "Heaven"
  const lift = M.tw([{ at: ri, dur: 1.6, from: { y: 0 }, to: { y: -300 }, ease: 'power2.inOut' }, { at: hv, dur: 1.6, to: { y: -460 }, ease: 'power2.inOut' }]);
  const joseph = `<g${lift}><g${M.bob(7, 3.2)}>` + seq((op) => josephCupertino(...J5, op),
    [[0, { mood: 'happy', look: [0, 0], armL: [16, 2, 3], armR: [16, 2, 3] }], [mk, { mood: 'worried', look: [2, 0.6], armL: [16, 2, 3], armR: [16, 2, 3] }],
      [wi, { mood: 'peaceful', kneel: true, ...PRAY }], [ri + 0.3, { mood: 'awe', kneel: true, look: [0, -2.6], armL: [128, 3, 2.4], armR: [128, 3, 2.4] }],
      [ev, { mood: 'peaceful', kneel: true, armL: [128, 3, 2.4], armR: [128, 3, 2.4] }], [hv, { mood: 'tender', kneel: true, halo: hv + 0.2, armL: [128, 3, 2.4], armR: [128, 3, 2.4] }]]) + '</g></g>';
  return MID(lit(until(on, brothers('yJoseph')) + from(hv, brothers('yJoseph')), 'yJoseph'))
    + layer(0.95, lit(span(on, ev, castShadow(...PU, 'yJoseph') + seq((op) => popeBenedict(...PU, { flip: true, beard: '#e8e2d8', beardStyle: 'short', look: [2.4, -1.2], armL: [16, 2, 3], ...op }),
        [[0, { mood: 'happy', armR: [20, 2, 3] }], [fl + 0.3, { mood: 'awe', armR: [20, 2, 3], armL: [96, 4, 1.4] }]]))
      + span(ev, hv, castShadow(...LB, 'yJoseph') + `<g transform="translate(${LB[0] - 150},${LB[1]})">${scrolls(1.0)}</g>` + seq((op) => lambertini(...LB, { flip: true, armL: [20, 2, 3], ...op }),
        [[0, { mood: 'stern', look: [2.4, 0.6], armR: [60, 2, 3] }], [ad - 0.2, { mood: 'surprised', look: [2.4, -1.4], armR: [30, 2, 3] }]]) + sweat(...LB, ad)), 'yJoseph'))
    + `<g opacity="0"${fadeIn(ri, 0.8)}>${beam(J5[0] - 120, J5[0] + 120, J5[0] - 260, J5[0] + 260, 1360, 0.55)}</g>`
    + lit(castShadow(...J5, 'yJoseph') + joseph, 'yJoseph') + sweat(J5[0], J5[1], J5[2], mk + 0.2)
    + streaks(J5[0], 1100, J5[0], 860, { at: ri + 0.1, dur: 1.0, n: 5, spread: 80, color: '#fff4d8', op: 0.6 })
    + span(sv, on, popAt(sv, 690, 760, tally(70)))
    + `<g opacity="0"${fadeIn(hv, 0.8)}>${glow(J5[0], 520, 380, 0.6)}${sparkles(18, 160, 640, 300, 900, { seed: 31 })}</g>`
    + NEAR(bokeh(6, { seed: 33, sides: true, op: [0.2, 0.4] }));
}

// 6 · OUTRO. SHOT "Which gift amazed you the most?": the five again, haloed, at golden sunset.  SHOT "Follow for more saint stories."
function scene6() {
  const wh = at(6, 'gift'), fo = at(6, 'Follow');
  return glow(480, 760, 560, 0.4)
    + lit(row('yOutro', [[0, { mood: 'tender', halo: true, look: [0, 0] }], [wh, { mood: 'happy', halo: true, look: [0, 0] }], [fo, { mood: 'tender', halo: true }]]), 'yOutro')
    + `<g opacity="0"${fadeIn(fo, 0.8)}>${sparkles(18, 80, 900, 560, 980, { seed: 29 })}</g>`
    + NEAR(bokeh(7, { seed: 45, sides: true }));
}

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const FAST = { speed: 1.05, gap: 0.22, gain: 0.5 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'Five_Saints_With_Supernatural_Gifts',
  bg3d: './five_gifts_countdown.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js', 'agnes.bg3d.js': './agnes_of_assisi_too_heavy.bg3d.js', 'edmund.bg3d.js': './edmund_last_stand.bg3d.js',
    'andrew.bg3d.js': './andrew_apostle.bg3d.js', 'roma.bg3d.js': './gelasius.bg3d.js', 'clement.bg3d.js': './clement_anchor.bg3d.js',
    'mexico.bg3d.js': './miguel_pro_firing_squad.bg3d.js', 'conrad.bg3d.js': './conrad_spider_chalice.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  hud: makeRankHud(at, [null, 5, 4, 3, 2, 1, null]),
  music: { story: 'a countdown of five saints with gifts no one could explain: a preacher understood in every language, a hermit who sailed the sea on his cloak, a friar seen on three continents at once, a priest who bore the wounds of Christ, and a friar who rose into the air before the Pope',
    color: 'Italian and Spanish Baroque: warm strings, harp, a soft pipe organ and a wordless choir, with gentle bells',
    cues: { 2: 'The open sea: rolling harp and strings, rising as he sails.', 5: 'Wonder: hushed high strings, then the wordless choir lifting slowly into the biggest swell of the reel.' } },
  thumb_hook: 'Wait till you see #1', thumb_title: '5 Saints, 5 Miracles', thumb_scene: 0, thumb_t: 2.6, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'fˈɜːɹɚ': 'fəɹˈɛɹ',          // Ferrer: fer-RER
    'pˈaʊlə': 'pˈɑːoʊlə',        // Paola: PAH-o-la
    'pˈɔɹəz': 'pˈɔːɹɛs',         // Porres: POR-res
  },
  scenes: [
    { kicker: 'A COUNTDOWN OF MIRACLES', title: 'No One Could Explain It', art: scene0, bg3d: 'yHook', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(0, 'explain'), to: [480, 1000], z: 1.1, frame: [540, 980] },
        { at: at(0, 'number one'), to: [480, 960], z: 1.22, frame: [540, 960] }] },
      tone: HOOK,
      say: ['Five saints did things no one on earth could explain.', 'Wait until you see what number one did in front of the Pope.'] },
    { kicker: 'SPAIN & EUROPE · AROUND 1400', title: '5. St. Vincent Ferrer', art: scene1, bg3d: 'yVincent', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(1, 'Vincent'), to: face(...V1), z: 1.3, frame: [520, 840] },
        { at: at(1, 'preached'), to: [560, 1000], z: 1.08, frame: [540, 960] },
        { at: at(1, 'understood'), to: [760, 1000], depth: 0.75, z: 1.15, frame: [580, 960] }] },
      tone: FAST,
      say: ['Number five, Vincent Ferrer.', 'He preached in his own Valencian tongue.', 'Yet crowds from many nations understood every word.'] },
    { kicker: 'STRAIT OF MESSINA · 1464', title: '4. St. Francis of Paola', art: scene2, bg3d: 'yPaola', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(2, 'Francis'), to: face(...F2), z: 1.3, frame: [520, 840] },
        { at: at(2, 'refused'), to: [620, 1060], depth: 0.75, z: 1.02, frame: [560, 980] },
        { at: at(2, 'sailed'), to: [700, 1060], depth: 0.75, z: 1.2, frame: [540, 960] }] },
      tone: FAST,
      say: ['Number four, Francis of Paola.', 'A boatman refused him a ride to Sicily.', 'So he spread his cloak on the sea and sailed across.'] },
    { kicker: 'LIMA, PERU · 1600s', title: '3. St. Martin de Porres', art: scene3, bg3d: 'yMartin', front3d: true,
      cam: { ...GLIDE, whip: 'r', path: [
        { at: at(3, 'Martin'), to: face(...M3), z: 1.3, frame: [500, 840] },
        { at: at(3, 'Mexico'), to: [640, 760], depth: 0.9, z: 1.05, frame: [560, 900] },
        { at: at(3, 'A sick'), to: [640, 1140], depth: 0.95, z: 1.1, frame: [560, 1000] },
        { at: at(3, 'Then Martin'), to: [520, 1020], z: 1.02, frame: [540, 960] }] },
      tone: STAND,
      say: ['Number three, Martin de Porres, who never left Lima, Peru.', 'Yet people saw him in Mexico, Africa and China.', 'A sick man in Mexico called his name.', 'Then Martin walked in.'] },
    { kicker: 'SAN GIOVANNI ROTONDO, ITALY', title: '2. St. Padre Pio', art: scene4, bg3d: 'yPio', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(4, 'Padre Pio'), to: face(...P4), z: 1.3, frame: [520, 840] },
        { at: at(4, 'wounds'), to: [P4[0], 860], z: 1.4, frame: [540, 880] },
        { at: at(4, 'the sins'), to: [560, 1020], z: 1.1, frame: [540, 960] },
        { at: at(4, 'vanished'), to: face(PD[0], PD[1], PD[2], true), z: 1.3, frame: [540, 880] }] },
      tone: STAND,
      say: ['Number two, Padre Pio.', 'For fifty years, he bore the wounds of Christ.', 'He told people the sins they forgot to confess.', 'Days before he died, the wounds vanished.'] },
    { kicker: 'ROME · THE 1600s', title: '1. St. Joseph of Cupertino', art: scene5, bg3d: 'yJoseph', front3d: true,
      cam: { ...GLIDE, whip: 'r', path: [
        { at: at(5, 'Joseph'), to: face(...J5), z: 1.3, frame: [520, 860] },
        { at: at(5, 'rise'), to: [J5[0] + 60, 900], z: 1.05, frame: [540, 900] },
        { at: at(5, 'Urban'), to: [600, 860], z: 1.1, frame: [540, 900] },
        { at: at(5, 'admitted'), to: face(...LB), depth: 0.95, z: 1.25, frame: [560, 860] },
        { at: at(5, 'looked down'), to: [J5[0], 700], z: 1.15, frame: [540, 820] }] },
      tone: { speed: 0.98, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['And number one, Joseph of Cupertino, a friar mocked as slow.', 'Witnesses saw him rise into the air in prayer, seventy times.',
        { text: 'Once, he floated up in front of Pope Urban VIII.', speed: 0.85 }, "Even the Church's skeptic admitted the witnesses were reliable.",
        { text: 'Heaven lifted the man the world looked down on.', speed: 0.92 }] },
    { kicker: 'FIVE SAINTS · ONE GIVER', title: 'Gifts From Heaven', art: scene6, bg3d: 'yOutro', front3d: true,
      cam: { ...GLIDE, path: [
        { at: at(6, 'gift'), to: [480, 1000], z: 1.12, frame: [540, 980] },
        { at: at(6, 'Follow'), to: [480, 980], z: 1.2, frame: [540, 960] }] },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['Which gift amazed you the most?', 'Follow for more saint stories.'] },
  ],
};
