// Santo Niño de Cebú: "What the Fire Left" (one story: the 1521 gift to Queen Juana and the finding, Kaplag, of the image
// in a pine box by the sailor Juan de Camus on April 28, 1565, after Legazpi's men burned Cebu). Feast: third Sunday of
// January (Sinulog). Sources: Santo Niño Basilica "Some Historical Notes on Kaplag" (Legazpi's notarized statement of
// May 16, 1565), Wikipedia "Santo Niño de Cebú". The burning is shown only as distant smoke and glow; no violence on screen.
// New (exported for later reels): santoNino (the image: 1565 original with red velvet cap and orb, or today's crowned image
// with red cape, scepter and orb with cross), pineBox, cebuBasilica, magellanCross, juana (Cebuano queen), camus (sailor),
// legazpi, augustinian, sinulog dancers, charredHut.
import { W, M, SKIES, SKIN, GOLD, CREAM, sky, sun, rays, clouds, hill, waves, sparkles, motes, foliage, tufts, petals,
  person, cross_staff, coconut, nipa_hut, ship, crowd, ground, dark, light, bokeh, FAR, BACK, MID, NEAR } from '../art.mjs';

const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;
const fadeIn = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
const fadeOut = (at, dur = 0.5) => M.tw([{ at, dur, from: { opacity: 1 }, to: { opacity: 0 } }]);
const swap = (a, b, at, dur = 0.45) => `<g${fadeOut(at, dur)}>${a}</g><g${fadeIn(at, dur)}>${b}</g>`;
const GOLDSKY = [[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']];
const SMOKY = [[0, '#2a1e26'], [0.4, '#5a3a3a'], [0.7, '#b8704a'], [1, '#e0a060']];
const FEAST = [[0, '#2a1e4a'], [0.4, '#7a3e6a'], [0.7, '#e88a5a'], [1, '#f8c87a']];

// Line starts (s from scene start), from `node build.mjs stories/santo_nino_cebu.mjs info`
const T = { s2b: 4.48, s3c: 7.68, s4b: 4.71, s4c: 7.68, s4e: 12.08, s5b: 2.0, s5c: 4.42 };

// ---------------------------------------------------------------- the image (base at 0, ~150 units tall, ~185 with crown)
const FACE = '#b98058', FACED = '#8a5636', HAIRN = '#3a2418', CAPE = '#c8202e', CAPED = '#8a1420';
// The right hand raised in blessing, palm out: index and middle fingers up, ring and little finger folded, thumb across
// them (the Santo Niño's real gesture; not an open palm or a wave). Centred on the palm.
export const blessingHand = (x, y, c = FACE, k = 0.78) => {
  const ln = dark(c, 0.35), sh = dark(c, 0.16), hi = light(c, 0.22);
  return `<g transform="translate(${x},${y}) scale(${k})">`
    // lace cuff
    + '<path d="M-8 6 q2 3 4 0 q2 3 4 0 q2 3 4 0 q2 3 4 0 L8 10 L-8 10Z" fill="#fbf4e2"/><path d="M-8 6 H8" stroke="#e8d8b0" stroke-width="1"/>'
    // palm (facing out)
    + `<rect x="-7" y="-7" width="14" height="14" rx="5" fill="${c}"/><path d="M-7 -1 Q-7 7 0 7 Q7 7 7 0" fill="${sh}" opacity=".35"/>`
    // index and middle fingers raised, held together
    + `<rect x="-0.6" y="-20" width="5.6" height="15" rx="2.8" fill="${c}"/><rect x="-5.8" y="-22.5" width="5.6" height="17.5" rx="2.8" fill="${c}"/>`
    + `<path d="M-0.4 -20 V-6" stroke="${ln}" stroke-width=".8" opacity=".7"/><path d="M-3 -21 v5 M2.2 -18.6 v4" stroke="${hi}" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>`
    + `<path d="M-5.2 -12 h4.4 M0 -11 h4.4" stroke="${ln}" stroke-width=".6" opacity=".5"/>`
    // ring and little fingers curled down into the palm
    + `<ellipse cx="-4.6" cy="-4.6" rx="2.8" ry="2.4" fill="${sh}"/><ellipse cx="-7.4" cy="-1.6" rx="2.4" ry="2.1" fill="${sh}"/>`
    + `<path d="M-7.2 -5.4 q2.6 -1.8 5.2 0 M-9.4 -2.4 q2 -1.6 4 0" stroke="${ln}" stroke-width=".8" fill="none"/>`
    // thumb folded across to touch the ring finger
    + `<path d="M7 3 Q5 -3 -1.6 -3.6 Q-3.6 -3.6 -3.2 -1.6 Q-2.6 0.6 2 1.8 Q5 3.4 7 6Z" fill="${hi}"/>`
    + `<path d="M7 3 Q5 -3 -1.6 -3.6 Q-3.6 -3.6 -3.2 -1.6 Q-2.6 0.6 2 1.8" stroke="${ln}" stroke-width=".8" fill="none"/></g>`;
};
/** The Santo Niño de Cebú. old: the image as found in 1565 (red velvet cap, flounced white shirt, small gold necklace,
 * right hand raised in blessing, plain orb in the left hand). modern: today's crowned image (gold-and-red crown with a
 * cross, wide red cape with gold borders, cream tunic, orb with a cross, on a gold stand). */
export function santoNino(s = 1, { modern = false, aura = true } = {}) {
  let g = `<g transform="scale(${s})">`;
  if (aura) g += '<circle cy="-90" r="122" fill="url(#haloGlow)" opacity=".85"/>';
  if (modern) {
    // gold stand
    g += `<path d="M-14 -18 L14 -18 Q20 -12 11 -8 Q22 -4 20 0 L-20 0 Q-22 -4 -11 -8 Q-20 -12 -14 -18Z" fill="${GOLD}"/><path d="M4 -18 L14 -18 Q20 -12 11 -8 Q22 -4 20 0 L6 0Z" fill="${dark(GOLD, 0.25)}" opacity=".6"/>`
      + `<rect x="-26" y="0" width="52" height="7" rx="3" fill="${dark(GOLD, 0.2)}"/>`;
    // wide flaring red cape with gold borders
    const cape = 'M-13 -104 Q0 -110 13 -104 Q36 -66 62 -26 Q46 -18 30 -22 Q16 -16 0 -20 Q-16 -16 -30 -22 Q-46 -18 -62 -26 Q-36 -66 -13 -104Z';
    g += `<path d="${cape}" fill="${CAPE}"/><path d="M5 -106 Q13 -106 13 -104 Q36 -66 62 -26 Q46 -18 30 -22 Q22 -20 16 -22 Q22 -60 5 -104Z" fill="${CAPED}" opacity=".5"/>`
      + `<path d="${cape}" stroke="${GOLD}" stroke-width="4.6" fill="none" stroke-linejoin="round"/>`
      + `<path d="M-46 -30 Q-30 -26 -18 -28 M46 -30 Q30 -26 18 -28" stroke="${GOLD}" stroke-width="2.4" fill="none"/>`
      + `<path d="M-9 -98 L9 -98 L18 -22 L-18 -22Z" fill="#f6ecd2"/><path d="M-9 -98 L-18 -22 M9 -98 L18 -22" stroke="${GOLD}" stroke-width="3"/>`
      + `<path d="M-16 -30 h32" stroke="${GOLD}" stroke-width="2.4"/>`;
  } else {
    g += '<path d="M-12 -98 L12 -98 Q22 -50 30 -4 Q0 4 -30 -4 Q-22 -50 -12 -98Z" fill="#f4efe4"/><path d="M4 -98 L12 -98 Q22 -50 30 -4 L14 -2 Q12 -50 4 -96Z" fill="#d8d0c0" opacity=".6"/>'
      + [-70, -46, -20].map((y) => `<path d="M${-14 - (y + 98) * 0.16} ${y} q5 4 10 0 q5 4 10 0 q5 4 10 0" stroke="#cfc6b4" stroke-width="2.2" fill="none" transform="translate(${(y + 98) * -0.06},0)"/>`).join('');
  }
  // arms: right hand (viewer's left) raised in blessing, left hand (viewer's right) holding the orb
  const sleeve = modern ? '#f6ecd2' : '#f4efe4';
  g += `<path d="M-10 -94 Q-28 -88 -26 -80" stroke="${sleeve}" stroke-width="9" fill="none" stroke-linecap="round"/>` + blessingHand(-26, -84);
  g += `<path d="M10 -94 Q28 -88 26 -80" stroke="${sleeve}" stroke-width="9" fill="none" stroke-linecap="round"/>`
    + '<path d="M21 -78 q1.5 2.4 3 0 q1.5 2.4 3 0 q1.5 2.4 3 0 L30 -75 L21 -75Z" fill="#fbf4e2"/>'
    + `<ellipse cx="26" cy="-81.5" rx="4.8" ry="4.2" fill="${FACE}"/>`
    + `<circle cx="26" cy="-89" r="7.6" fill="${GOLD}"/><path d="M18.4 -89 h15.2" stroke="${dark(GOLD, 0.3)}" stroke-width="1.3"/><path d="M26 -96.6 v15.2" stroke="${dark(GOLD, 0.3)}" stroke-width="1" opacity=".6"/><circle cx="23.4" cy="-91.6" r="2.2" fill="#fff4cc" opacity=".8"/>`
    + `<path d="M21.6 -82.6 q4.4 2.8 8.8 0" stroke="${FACE}" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + (modern ? `<path d="M26 -96.6 v-9 M22.6 -102.4 h6.8" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round"/>` : '');
  // head: curly dark hair, open eyes, gentle smile
  g += `<rect x="-5" y="-104" width="10" height="8" fill="${FACED}"/><path d="M-9 -98 Q0 -92 9 -98" stroke="${GOLD}" stroke-width="2" fill="none"/>`
    + [[-14, -110], [-15, -118], [14, -110], [15, -118], [-12, -103], [12, -103]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${HAIRN}"/>`).join('')
    + `<circle cx="0" cy="-116" r="14" fill="${FACE}"/><path d="M4 -129 A14 14 0 0 1 4 -103 A10 13 0 0 0 4 -129Z" fill="${FACED}" opacity=".4"/>`
    + `<path d="M-14 -116 Q-15 -133 0 -134 Q15 -133 14 -116 Q11 -124 6 -126 Q2 -121 -3 -126 Q-9 -124 -14 -116Z" fill="${HAIRN}"/>`
    + '<ellipse cx="-5.4" cy="-115" rx="2" ry="2.6" fill="#1a0e08"/><ellipse cx="5.4" cy="-115" rx="2" ry="2.6" fill="#1a0e08"/>'
    + '<circle cx="-4.7" cy="-116" r=".8" fill="#fff"/><circle cx="6.1" cy="-116" r=".8" fill="#fff"/>'
    + '<path d="M-3.4 -109 q3.4 2.6 6.8 0" stroke="#5a1e14" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="-8.4" cy="-110" rx="2.6" ry="1.6" fill="#d86a5a" opacity=".5"/><ellipse cx="8.4" cy="-110" rx="2.6" ry="1.6" fill="#d86a5a" opacity=".5"/>';
  if (modern) {   // imperial crown: red velvet inside a gold band with arches, pearls and a cross
    g += `<g transform="translate(0,-130)"><circle cy="-18" r="32" fill="url(#haloGlow)" opacity=".8"/>`
      + `<path d="M-18 -4 Q-21 -22 0 -24 Q21 -22 18 -4Z" fill="${CAPE}"/>`
      + `<path d="M-18 -4 Q-20 -22 0 -27 Q20 -22 18 -4 M-9 -5 Q-10 -22 0 -27 Q10 -22 9 -5" fill="none" stroke="${GOLD}" stroke-width="3.2"/>`
      + `<rect x="-20" y="-6" width="40" height="9" rx="3" fill="${GOLD}"/><path d="M-20 -6 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5" fill="${GOLD}"/>`
      + `<circle cx="0" cy="-28" r="3.8" fill="${GOLD}"/><path d="M0 -31 v-12 M-5 -38 h10" stroke="${GOLD}" stroke-width="3.2" stroke-linecap="round"/>`
      + '<circle cx="-9" cy="-1.5" r="2.2" fill="#d8323a"/><circle cx="0" cy="-1.5" r="2.2" fill="#2a7a4a"/><circle cx="9" cy="-1.5" r="2.2" fill="#2a5ac8"/></g>';
  } else {        // the small flounced red velvet cap
    g += '<path d="M-14 -124 Q-14 -144 0 -146 Q14 -144 14 -124 Q0 -130 -14 -124Z" fill="#c42a3a"/><path d="M4 -145 Q14 -142 14 -124 L6 -126Z" fill="#8a1a28" opacity=".6"/>'
      + '<path d="M-16 -124 q4 3 8 0 q4 3 8 0 q4 3 8 0 q4 3 8 0" stroke="#e05a64" stroke-width="2.6" fill="none"/>';
  }
  return g + '</g>';
}

// ---------------------------------------------------------------- props and set pieces
const PINE = '#d9b47a';
/** The pine box, closed (tied with cord) until `openAt` s, then open with the lid standing behind. `inner` is drawn
 * between the lid and the front of the box (e.g. the image rising out of it). openAt: 'open' draws it open from the start. */
export function pineBox(s = 1, { openAt = null, inner = '' } = {}) {
  const front = `<rect x="-62" y="-52" width="124" height="52" rx="3" fill="${PINE}"/><rect x="22" y="-52" width="40" height="52" fill="${dark(PINE, 0.2)}" opacity=".6"/>`
    + `<path d="M-54 -36 h100 M-54 -18 h108" stroke="${dark(PINE, 0.25)}" stroke-width="1.6" opacity=".6"/>`;
  const closed = `<rect x="-66" y="-64" width="132" height="14" rx="3" fill="${light(PINE, 0.15)}"/>`
    + '<path d="M-28 -64 V0 M30 -64 V0 M-66 -40 H66" stroke="#c8b488" stroke-width="3.4" opacity=".9"/><path d="M-6 -66 q6 -10 12 0" stroke="#c8b488" stroke-width="3" fill="none"/>';
  const lid = `<rect x="-60" y="-118" width="120" height="62" rx="3" fill="${dark(PINE, 0.15)}"/><rect x="-54" y="-112" width="108" height="50" fill="${dark(PINE, 0.35)}" opacity=".5"/>`;
  const hollow = '<rect x="-58" y="-58" width="116" height="10" fill="#5a3a22"/>';
  if (openAt === null) return `<g transform="scale(${s})">${front}${closed}</g>`;
  if (openAt === 'open') return `<g transform="scale(${s})">${lid}${hollow}${inner}${front}</g>`;
  return `<g transform="scale(${s})"><g${fadeIn(openAt, 0.4)}>${lid}${hollow}</g>${inner}${front}<g${fadeOut(openAt, 0.4)}>${closed}</g></g>`;
}
/** Basilica del Santo Niño, Cebu: coral-stone facade with a pediment and arched door, bell tower on the left. */
export function cebuBasilica(x, y, s = 1, { stone = '#e2c9a0', win = '#ffd98a' } = {}) {
  const sh = dark(stone, 0.18), hi = light(stone, 0.12);
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="150" y="-230" width="190" height="230" fill="${sh}"/><path d="M150 -230 L340 -230 L340 -250 L150 -270Z" fill="${dark(stone, 0.35)}"/>`
    + [190, 250, 310].map((wx) => `<path d="M${wx - 12} -90 v-60 a12 12 0 0 1 24 0 v60Z" fill="${win}" opacity=".75"/>`).join('')
    + `<rect x="-150" y="-310" width="300" height="310" fill="${stone}"/><rect x="60" y="-310" width="90" height="310" fill="${sh}" opacity=".5"/>`
    + `<path d="M-166 -310 L0 -400 L166 -310Z" fill="${hi}"/><path d="M-166 -310 H166" stroke="${sh}" stroke-width="10"/><path d="M-150 -150 H150" stroke="${sh}" stroke-width="7"/>`
    + `<path d="M0 -400 v-40 M-14 -426 h28" stroke="${GOLD}" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-346" r="20" fill="${win}"/>`
    + '<path d="M-44 0 V-104 a44 44 0 0 1 88 0 V0Z" fill="#4a3226"/><path d="M-44 0 V-104 a44 44 0 0 1 88 0" stroke="#c8a878" stroke-width="5" fill="none"/>'
    + [-104, 104].map((wx) => `<path d="M${wx - 16} -190 v-50 a16 16 0 0 1 32 0 v50Z" fill="${win}" opacity=".85"/><path d="M${wx - 14} -60 v-40 a14 14 0 0 1 28 0 v40Z" fill="${dark(stone, 0.45)}"/>`).join('')
    // bell tower (left)
    + `<rect x="-290" y="-470" width="124" height="470" fill="${stone}"/><rect x="-206" y="-470" width="40" height="470" fill="${sh}" opacity=".55"/>`
    + `<rect x="-302" y="-330" width="148" height="14" fill="${hi}"/><rect x="-302" y="-470" width="148" height="16" fill="${hi}"/>`
    + `<path d="M-252 -380 v-50 a24 24 0 0 1 48 0 v50Z" fill="${win}" opacity=".9"/><path d="M-252 -230 v-50 a24 24 0 0 1 48 0 v50Z" fill="${dark(stone, 0.45)}"/>`
    + `<path d="M-290 -470 Q-228 -560 -166 -470Z" fill="#b86a4a"/><path d="M-228 -540 v-46 M-242 -572 h28" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/></g>`;
}
/** Magellan's Cross: the tall wooden cross planted at Cebu in 1521. */
export const magellanCross = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="70" ry="14" fill="#8a6a44" opacity=".6"/>`
  + '<rect x="-15" y="-430" width="30" height="430" rx="4" fill="#6b4226"/><rect x="4" y="-430" width="11" height="430" fill="#4a2c18" opacity=".6"/>'
  + '<rect x="-120" y="-340" width="240" height="28" rx="4" fill="#6b4226"/><rect x="-120" y="-322" width="240" height="10" fill="#4a2c18" opacity=".6"/></g>';
/** A burned stilt hut: charred posts, a broken roof frame. */
export function charredHut(x, y, s = 1, { c = '#2a2024' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="${c}">`
    + '<rect x="-104" y="-150" width="14" height="190"/><rect x="90" y="-120" width="14" height="160"/><rect x="-8" y="-170" width="14" height="210"/>'
    + '<path d="M-130 -150 L0 -250 L40 -220 L-110 -128Z"/><path d="M60 -180 L140 -110 L128 -98 L50 -168Z" opacity=".9"/>'
    + '<rect x="-112" y="-46" width="230" height="12" transform="rotate(4)"/><path d="M-60 -34 L-110 30 L-96 34 L-46 -30Z"/></g>';
}
const waveBand = (base, [c, foam]) => waves(base, 7, 240, 8, c, { foam, op: 0.95 }) + waves(base + 34, 8, 280, 6, light(c, 0.06), { phase: 0.5, foam, op: 0.95 });
const embers = (n, seed, y0 = 700, y1 = 1300) => motes(n, { y0, y1, seed, color: '#ffb070', size: [2, 6], rise: 120 });
const smokeWisps = (y, seed, op = 0.32) => clouds(y, { color: '#6a5a62', op, drift: 40, seed, n: 3 });

// ---------------------------------------------------------------- people
const goldBand = `<path d="M-38 -282 Q0 -298 38 -282" stroke="${GOLD}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="0" cy="-292" r="6" fill="${GOLD}"/>`;
const goldCollar = `<path d="M-26 -206 Q0 -184 26 -206" stroke="${GOLD}" stroke-width="5" fill="none"/><path d="M-30 -200 Q0 -172 30 -200" stroke="${GOLD}" stroke-width="4" fill="none" opacity=".85"/>`;
const wrapBands = '<path d="M-48 -60 Q0 -52 48 -60 M-52 -34 Q0 -26 52 -34" stroke="#f2c46b" stroke-width="4" fill="none" opacity=".8"/>';
/** Queen Juana (Hara Humamay) of Cebu: red wrap dress with gold bands, gold collar and headband. */
export const juana = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', girl: true, robe: true, top: '#b84a3a', skin: SKIN.s1, hair: '#1a120c', ...o,
  over: goldCollar + goldBand + wrapBands + (o.over || '') });
/** Fr. Pedro de Valderrama, Magellan's chaplain. */
const valderrama = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', beard: null, hair: '#4a3020', ...o });
const beret = '<ellipse cx="4" cy="-286" rx="44" ry="12" fill="#a82a34"/><path d="M-40 -284 Q-2 -316 46 -286Z" fill="#c43a40"/><circle cx="2" cy="-306" r="4" fill="#a82a34"/>';
/** Juan de Camus, seaman of the Capitana (Basque): blue shirt, red beret, beard. */
export const camus = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#3e5a7a', pants: '#3a3238', skin: SKIN.fair, hair: '#4a3020', beard: '#4a3020', ...o,
  over: beret + (o.over || '') });
const ruff = '<path d="M-30 -210 q7 -8 15 0 q7 -8 15 0 q7 -8 15 0 q7 -8 15 0" stroke="#f6f2e8" stroke-width="7" fill="none" stroke-linecap="round"/>';
/** Miguel López de Legazpi: dark doublet, white ruff, grey beard. */
export const legazpi = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#2e2a36', pants: '#2a2430', skin: SKIN.fair, hair: '#b8b2aa', beard: '#c8c2ba', ...o,
  over: ruff + (o.over || '') });
/** Augustinian friar: black habit, leather belt. */
export const augustinian = (x, y, s, o = {}) => person(x, y, s, { kind: 'friar', top: '#1d1a22', cord: false, beard: '#5a3e2a', ...o,
  over: '<rect x="-44" y="-122" width="88" height="8" fill="#3a2a1e"/>' + (o.over || '') });
const villager = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#c9a87a', pants: '#5a4a3a', skin: SKIN.s0, hair: '#1a120c', beard: null, ...o });
const villagerW = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', girl: true, robe: true, top: '#7a5a8a', skin: SKIN.s1, hair: '#1a120c', ...o, over: wrapBands + (o.over || '') });
/** Sinulog dancer: bright costume, arms raised and swaying. */
export const dancer = (x, y, s, i = 0, o = {}) => {
  const tops = ['#e8a020', '#d8324a', '#2a7ac8', '#2a9a5a'], skins = [SKIN.s1, SKIN.s0, SKIN.s3, SKIN.s2];
  const girl = i % 2 === 0;
  return person(x, y, s, { kind: girl ? 'layman' : 'layman', girl, robe: girl, top: tops[i % 4], skin: skins[i % 4], hair: '#1a120c', beard: null, mood: 'joy',
    armL: [140, 14, 1.1 + i * 0.1], armR: [140, 14, 1.2 + i * 0.1], ...o, over: (girl ? wrapBands : '') + (o.over || '') });
};
const candle = (h = 36) => `<g><rect x="-4" y="${-h}" width="8" height="${h}" rx="2" fill="#f4ecd8"/><g${M.flick(0.7)}><ellipse cx="0" cy="${-h - 9}" rx="5" ry="9" fill="#ffd27a"/></g><circle cy="${-h - 9}" r="18" fill="url(#sunGlow)" opacity=".6"/></g>`;

// ---------------------------------------------------------------- scenes
// 0 · hook: dusk after the fire; the crowned Santo Niño stands glowing in an open pine box among burning huts
// (symbolic opening portrait: the image as Cebuanos know it today; the 1565 finding itself is told in scene 4)
const flame = (x, y, s = 1, ph = 0) => `<g transform="translate(${x},${y}) scale(${s})"><g${M.pulse(0.12, 0.9 + ph * 0.3, ph, 0, 0)}>`
  + `<circle cy="-30" r="70" fill="url(#sunGlow)" opacity=".75"/><path d="M0 0 Q-34 -6 -26 -46 Q-20 -70 -4 -96 Q2 -70 14 -60 Q30 -40 26 -16 Q22 0 0 0Z" fill="#f07a2a"/>`
  + `<path d="M0 0 Q-18 -4 -14 -30 Q-10 -46 0 -60 Q6 -42 14 -32 Q18 -12 0 0Z" fill="#ffd27a"/></g></g>`;
function scene0() {
  return MID(charredHut(150, 1170, 0.95) + charredHut(960, 1160, 0.8, { c: '#241a1e' }) + waveBand(1080, ['#3a3456', '#c8806a'])
      + flame(110, 1120, 1.1, 0) + flame(220, 1150, 0.8, 1) + flame(930, 1110, 1.0, 2) + flame(1010, 1140, 0.75, 3))
    + ground(1160, '#3a2e30', { rim: '#7a4a3a' }) + tufts(1166, 8, '#241c1e', { seed: 3 })
    + smokeWisps(880, 4, 0.3)
    + glow(540, 960, 520, 1) + rays(540, 900, { n: 12, op: 0.1, len: 900 })
    + `<g transform="translate(540,1340)">${pineBox(2.6, { openAt: 'open', inner: `<g transform="translate(0,-34)"><g${M.bob(3, 3.4)}>${santoNino(1.08, { modern: true })}</g></g>` })}</g>`
    + sparkles(16, 330, 760, 760, 1250, { seed: 6, color: '#ffe8b0' })
    + embers(26, 5)
    + NEAR(foliage('l', 1640, { color: '#1a1416' }) + foliage('r', 1660, { color: '#1a1416', seed: 5 }));
}

// 1 · April 1521: Magellan's ships, the cross on the beach, Queen Juana receives the image (3D bay 'day')
function scene1() {
  return MID(ship(790, 1080, 0.42, { crew: false }) + ship(1000, 1050, 0.28, { crew: false }) + waveBand(1100, ['#2a8aa0', '#e8f6f6']))
    + ground(1180, '#ead7a6', { rim: '#f6e8c0' }) + tufts(1186, 8, '#9ab070', { seed: 4 })
    + MID(magellanCross(140, 1230, 0.95) + coconut(1060, 1200, 0.75, { flip: true }))
    + juana(380, 1320, 2.1, { mood: 'joy', armL: 14, armR: [64, 3, 2.2] })
    + valderrama(730, 1320, 2.1, { flip: true, mood: 'happy', armL: 10, armR: [58, 2, 2.6], propR: `<g transform="translate(0,6)">${santoNino(0.75, { aura: true })}</g>` })
    + sparkles(10, 480, 700, 900, 1120, { seed: 3 })
    + NEAR(bokeh(6, { seed: 11 }));
}

// 2 · 1521–1565: the ships sail away; the queen keeps the Child
function scene2() {
  const B = T.s2b;
  const leave = M.tw([{ at: 0, dur: 9, from: { x: 0 }, to: { x: -340 }, ease: 'none' }]);
  return FAR(sky(SKIES.dusk, { stars: 26, seed: 4 }) + sun(560, 1010, 64, 360))
    + BACK(hill(1030, 26, '#5a3e5a', 3, { freq: 0.8 }) + clouds(520, { color: '#ffc9b0', op: 0.5, drift: 40, seed: 2 }))
    + `<rect x="-200" y="1030" width="${W + 400}" height="900" fill="url(#seaDusk)"/>`
    + waves(1036, 5, 260, 7, '#7a5a8a', { foam: '#f2b28a', op: 0.9 })
    + MID(`<g${leave}><g${fadeOut(6.5, 2.5)}>${ship(700, 1040, 0.22, { crew: false })}${ship(860, 1030, 0.16, { crew: false })}</g></g>`
      + waves(1100, 8, 320, 6, '#5a4a7a', { phase: 1, foam: '#d8a0a0' }) + nipa_hut(900, 1200, 0.85) + coconut(1040, 1210, 0.8, { flip: true }) + coconut(40, 1200, 0.7))
    + ground(1200, '#c8a07a', { rim: '#e8c09a' }) + tufts(1206, 8, '#8a7a5a', { seed: 7 })
    + swap(juana(430, 1330, 2.1, { mood: 'sad', armL: 16, armR: [34, 2, 3], propR: santoNino(0.7) }),
      juana(430, 1330, 2.1, { mood: 'peaceful', armL: 16, armR: [34, 2, 3], propR: santoNino(0.7) }), B)
    + motes(10, { y0: 700, y1: 1200, seed: 3 })
    + NEAR(foliage('l', 1640, { color: '#2a1e2a' }) + bokeh(5, { seed: 8, op: [0.25, 0.5] }));
}

// 3 · 1565: Legazpi's ships, the town burning on the far shore; a family watches from the hill (3D bay 'fire')
function scene3() {
  const L = T.s3c;
  return MID(ship(620, 1070, 0.36, { crew: false }) + ship(830, 1060, 0.3, { crew: false }) + ship(1010, 1076, 0.26, { crew: false })
      + waveBand(1110, ['#2e2236', '#d87a5a']))
    + hill(1200, 36, '#3e2a2a', 6, { freq: 1.1, top: '#5a3a30' }) + ground(1230, '#3e2a2a', { rim: '#6a4434' }) + tufts(1236, 10, '#2a1c1c', { seed: 6 })
    + villager(250, 1340, 2.0, { mood: 'worried', armL: 10, armR: [70, 3, 1.8] })
    + swap(villagerW(450, 1345, 1.95, { mood: 'worried', armL: [24, 2, 3], armR: 12 }), villagerW(450, 1345, 1.95, { mood: 'sad', armL: [24, 2, 3], armR: 12 }), L)
    + person(355, 1360, 1.25, { kind: 'kid', top: '#c96a4a', mood: 'sad', armL: 10, armR: [30, 2, 2] })
    + embers(26, 8, 600, 1260)
    + NEAR(smokeWisps(1520, 9, 0.35) + foliage('r', 1660, { color: '#1a1214', seed: 4 }));
}

// 4 · April 28, 1565: inside a small hut, Camus cuts open a pine box: the Child Jesus, whole (dolly zoom)
function scene4() {
  const O = T.s4b + 0.9, R = T.s4c, Q = T.s4e;
  const wall = '#3a2a24';
  const back = `<path fill-rule="evenodd" d="M100 1240 V560 L540 420 L980 560 V1240Z M600 1200 V820 a80 80 0 0 1 160 0 V1200Z" fill="${wall}"/>`
    + Array.from({ length: 12 }, (_, i) => `<path d="M${150 + i * 70} 600 V1200" stroke="#2a1e1a" stroke-width="5" opacity=".7"/>`).join('')
    + '<path d="M80 560 L540 400 L1000 560" stroke="#1e1614" stroke-width="22" fill="none"/><path d="M240 500 L700 760" stroke="#1e1614" stroke-width="16"/>';
  const rise = M.tw([{ at: R, dur: 1.4, from: { y: 90, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }]);
  const image = `<g${rise}><g transform="translate(0,-30)">${santoNino(0.95)}</g></g>`;
  return FAR(sky(SMOKY) + glow(680, 900, 380, 0.6))
    + BACK(back)
    + MID('<rect x="60" y="560" width="26" height="700" fill="#1e1614"/><rect x="996" y="560" width="26" height="700" fill="#1e1614"/>'
      + '<g transform="translate(900,1260)"><rect x="-40" y="-40" width="80" height="40" rx="3" fill="#5a4030"/><rect x="-46" y="-48" width="92" height="10" fill="#6a4a36"/></g>')
    + ground(1230, '#2e2422', { rim: '#5a3a2e' }) + tufts(1236, 6, '#1e1614', { seed: 2 })
    + `<g${fadeIn(R, 1)}>${glow(680, 1150, 320, 0.95)}${rays(680, 1120, { n: 10, op: 0.08, len: 700 })}</g>`
    + `<g transform="translate(680,1320)">${pineBox(2.2, { openAt: O, inner: image })}</g>`
    + `<g${fadeOut(R, 0.45)}>${camus(340, 1330, 2.0, { kneel: true, mood: 'worried', armL: 14, armR: [62, 2, 2] })}</g>`
    + `<g${fadeIn(R, 0.45)}><g${fadeOut(Q, 0.4)}>${camus(340, 1330, 2.0, { kneel: true, mood: 'surprised', armL: [40, 3, 1.6], armR: [70, 3, 1.6] })}</g></g>`
    + `<g${fadeIn(Q, 0.4)}>${camus(340, 1330, 2.0, { kneel: true, mood: 'joy', talk: [Q, Q + 2.2], armL: [140, 6, 1.2], armR: [72, 3, 1.6] })}</g>`
    + `<g${fadeIn(R + 0.6, 1)}>${sparkles(14, 540, 820, 900, 1200, { seed: 9 })}${motes(14, { x0: 500, x1: 860, y0: 820, y1: 1260, seed: 4 })}</g>`
    + embers(8, 3, 600, 1100);
}

// 5 · Legazpi kneels and weeps; a church rises on that very spot (today's basilica)
function scene5() {
  const C = T.s5b;
  const grow = M.tw([{ at: C, dur: 1.6, from: { y: 120, opacity: 0 }, to: { y: 0, opacity: 1 }, ease: 'power2.out' }]);
  const tear = '<path d="M17 -236 q-4 9 0 11 q4 -2 0 -11Z" fill="#9ad0f0"/>';
  return FAR(sky(GOLDSKY) + sun(540, 760, 64, 420) + rays(540, 760, { op: 0.08 }))
    + BACK(`<g${grow}>${cebuBasilica(560, 1160, 0.95)}</g>` + clouds(560, { color: '#fff0d8', op: 0.5, drift: 40, seed: 5 }))
    + MID(coconut(40, 1200, 0.75) + coconut(1050, 1190, 0.7, { flip: true }))
    + ground(1210, '#c8a070', { rim: '#e8c890' }) + tufts(1216, 8, '#8a9a5a', { seed: 5 })
    + `<g transform="translate(540,1270)"><rect x="-110" y="-70" width="220" height="70" rx="4" fill="#efe6d0"/><rect x="-110" y="-70" width="220" height="14" fill="${GOLD}" opacity=".8"/>`
    + `<g transform="translate(-86,-70)">${candle()}</g><g transform="translate(86,-70)">${candle()}</g><g transform="translate(0,-70)">${santoNino(1.15)}</g></g>`
    + legazpi(250, 1340, 1.95, { kneel: true, mood: 'peaceful', armL: [28, 2, 3], armR: [28, 2, 3.3], over: tear })
    + augustinian(830, 1340, 1.95, { kneel: true, flip: true, mood: 'peaceful', armL: [28, 2, 3], armR: [28, 2, 3.3] })
    + motes(14, { y0: 700, y1: 1250, seed: 6 })
    + NEAR(bokeh(7, { seed: 14 }));
}

// 6 · feast: the third Sunday of January, the Sinulog dance before the crowned image
function scene6() {
  return FAR(sky(FEAST, { stars: 20, seed: 6 }) + rays(540, 820, { op: 0.12 }))
    + BACK(crowd(1120, 16, { color: '#2a1a34', flags: [['#0038a8', '#ce1126', '#ffffff'], ['#f2c46b', '#d8324a', '#ffffff']] }))
    + MID(`<g transform="translate(540,1170)"><rect x="-150" y="0" width="300" height="60" rx="6" fill="${dark(GOLD, 0.2)}"/><rect x="-150" y="0" width="300" height="12" fill="${GOLD}"/>`
      + [-120, -60, 60, 120].map((cx) => `<circle cx="${cx}" cy="-6" r="16" fill="#f28fa6"/><circle cx="${cx + 14}" cy="-2" r="12" fill="#ffffff"/>`).join('') + '</g>')
    + ground(1230, '#5a3a4a', { rim: '#8a5a6a' })
    + glow(540, 860, 440, 0.95)
    + `<g transform="translate(540,1170)"><g${M.bob(6, 3.4)}>${santoNino(3.1, { modern: true })}</g></g>`
    + dancer(170, 1350, 1.7, 0) + dancer(910, 1350, 1.7, 1, { flip: true }) + dancer(330, 1380, 1.25, 2) + dancer(760, 1380, 1.25, 3, { flip: true })
    + petals(18, { seed: 15, colors: [GOLD, '#ffffff', '#d8324a', '#2a7ac8'] })
    + NEAR(bokeh(7, { seed: 19 }));
}

export const STORY = {
  slug: 'santo_nino_de_cebu', name: 'Santo_Nino_de_Cebu_What_the_Fire_Left',
  // three.js backgrounds for the bay scenes (characters stay SVG); helpers come from the Bakhita module
  bg3d: './santo_nino_cebu.bg3d.js', bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'It survived the fire', thumb_title: 'Santo Niño de Cebú', thumb_scene: 6, thumb_t: 3, thumb_shift: -20,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 760, 'l']],
  // Juan de Camus was a Basque seaman: Spanish voice
  cast: { camus: { voice: 'em_alex', speed: 0.95 } },
  fix: {
    'sˈæntoʊ': 'sˈɑːntoʊ',                         // Santo -> SAHN-toh
    'sˈɛbuː': 'sɛbˈuː',                            // Cebu -> seh-BOO
    'mˈæktən': 'mɑktˈɑːn',                         // Mactan -> mak-TAHN
    'lˈɛɡæzpi': 'lɛɡˈɑːspi',                       // Legazpi -> leh-GAHS-pee
    'kˈæməs': 'kˈɑːmuːs',                          // Camus -> KAH-moos
    'sˈɪnuːlˌɑːɡ': 'sinˈuːlɔɡ',                     // Sinulog -> si-NOO-log
  },
  scenes: [
    { kicker: 'THE HOLY CHILD OF CEBU', title: 'What the Fire Left', art: scene0, bg3d: 'baySmoke', cam: { move: 'push-fast', oy: 1150 },
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['Everyone saw a town burn.', 'No one expected what waited in the ashes.', 'This is the Santo Niño de Cebú.'] },
    { kicker: 'APRIL 1521 · CEBU', title: 'A Gift for a Queen', art: scene1, bg3d: 'bayDay', cam: 'pan-r',
      tone: { speed: 1.1, gap: 0.18, gain: 1 },
      say: ['In 1521, Magellan\'s ships reached Cebu.', 'Queen Juana was baptized and asked for an image of the Child Jesus.'] },
    { kicker: '1521 – 1565', title: 'Forty-Four Years', art: scene2, cam: 'drift-l',
      tone: { speed: 1.05, gap: 0.22, gain: 0.5 },
      say: ['Weeks later, Magellan was killed at Mactan, and his men sailed away.', 'For 44 years, the Child stayed in Cebu.'] },
    { kicker: 'APRIL 1565 · CEBU', title: 'The Town Burns', art: scene3, bg3d: 'bayFire', cam: 'pan-l',
      tone: { speed: 1.0, gap: 0.28, gain: -0.5, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['In 1565, Spanish ships came back under Legazpi.', 'Cebu fought back, and the town was set on fire.', 'Hundreds of homes were lost.'] },
    { kicker: 'APRIL 28, 1565', title: 'The Pine Box', art: scene4, cam: { move: 'dolly', amt: 0.08, ox: 600, oy: 1150 },
      tone: { speed: 1.0, gap: 0.28, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } },
      say: ['As the smoke cleared, a sailor named Juan de Camus searched a small hut.', 'He cut open a pine box.',
        { text: 'Inside lay the Child Jesus, still whole.', beat: 0.9, speed: 0.85 }, 'He shouted:',
        { text: 'I found the Son of Holy Mary!', who: 'camus' }] },
    { kicker: 'THE FIRST CHURCH', title: 'On That Very Spot', art: scene5, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['Legazpi knelt and wept.', 'A church rose on that very spot.', 'Fire took the town, but the Child never left his people.'] },
    { kicker: 'FEAST · 3RD SUNDAY OF JANUARY', title: 'Pit Señor!', art: scene6, cam: { move: 'arc-r', amt: 0.06, oy: 1000 },
      tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['His feast is the third Sunday of January, with the Sinulog dance.', 'Señor Santo Niño, pray for us.'] },
  ],
};
