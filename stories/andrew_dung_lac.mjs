// St. Andrew Dung-Lac and the Martyrs of Vietnam (feast: November 24). Black ao dai + khan dong turban, conical non la hat,
// Nguyen-era guard with spear, emperor in yellow, ladder cangue, rice paddies, bamboo, thatched house, water buffalo,
// One Pillar Pagoda, citadel gate, Vietnamese village church, lotus and silk lanterns exported for later reels.
import { W, H, M, SKIES, GOLD, INK, sky, sun, rays, beam, clouds, hill, sparkles, motes, foliage, tufts, flowers,
  petals, butterflies, person, book, palm_frond, basilica, crowd, ground, bokeh, dark, light, rng, f,
  FAR, BACK, MID, NEAR } from '../art.mjs';
import { babyBundle } from './aparecida.mjs';

const SKA = '#d6a074', HAIRA = '#15100c', ROBE = '#1e1b26';
const SKV = ['#c98f62', '#d9a47e', '#b97c52', '#e0b08a'];
const glow = (x, y, r, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#sunGlow)" opacity="${op}"/>`;

// ---------------------------------------------------------------- clothing + people
// Khan dong: pleated wrapped turban, sits above the brows
export const khanDong = (c = '#17141c') => `<path d="M-45 -266 Q-48 -300 -30 -313 Q0 -326 30 -313 Q48 -300 45 -266 Q0 -290 -45 -266Z" fill="${c}"/>`
  + `<path d="M-43 -280 Q0 -300 43 -280 M-38 -294 Q0 -314 38 -294" stroke="${light(c, 0.22)}" stroke-width="3" fill="none" opacity=".8"/>`
  + `<path d="M8 -320 Q34 -312 45 -266 Q30 -276 14 -280Z" fill="${dark(c, 0.3)}" opacity=".45"/>`;
// Ao dai: mandarin collar and the closure running to the right underarm
export const aoDai = (c = '#2c2836') => `<path d="M-14 -214 Q0 -208 14 -214 L14 -203 Q0 -197 -14 -203Z" fill="${c}"/>`
  + `<path d="M2 -202 Q10 -190 32 -182" stroke="${light(c, 0.25)}" stroke-width="3" fill="none"/>`
  + `<g fill="${GOLD}" opacity=".8"><circle cx="9" cy="-193" r="2.4"/><circle cx="19" cy="-186" r="2.4"/><circle cx="29" cy="-183" r="2.4"/></g>`;
// Non la: conical palm-leaf hat
export const nonLa = (c = '#e8d29a', w = 80, h = 74) => `<path d="M${-w} -276 L0 ${-276 - h} L${w} -276 Q0 -264 ${-w} -276Z" fill="${c}"/>`
  + `<path d="M0 ${-276 - h} L${w} -276 Q${w / 2} -268 0 -269Z" fill="${dark(c, 0.22)}" opacity=".55"/>`
  + `<path d="M${-w * 0.7} -298 Q0 -288 ${w * 0.7} -298 M${-w * 0.38} ${-276 - h * 0.62} Q0 ${-270 - h * 0.62} ${w * 0.38} ${-276 - h * 0.62}" stroke="${dark(c, 0.15)}" stroke-width="2.5" fill="none"/>`;
// Ladder cangue (gong): two bamboo poles with crossbars, locked at the neck, worn at rest
export const cangue = (c = '#a8843e') => `<g><rect x="-34" y="-214" width="10" height="192" rx="4" fill="${c}"/><rect x="24" y="-214" width="10" height="192" rx="4" fill="${dark(c, 0.15)}"/>`
  + `<rect x="-44" y="-212" width="88" height="12" rx="4" fill="${dark(c, 0.1)}"/><rect x="-40" y="-58" width="80" height="10" rx="4" fill="${c}"/>`
  + `<path d="M-30 -200 V-30 M28 -200 V-30" stroke="${light(c, 0.3)}" stroke-width="2" opacity=".6"/></g>`;

export const andrew = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', collar: false, top: ROBE, skin: SKA, hair: HAIRA, beard: '#1a140f',
  ...o, over: aoDai() + (o.hat ? nonLa() : khanDong()) + (o.over || '') });
export const littleAndrew = (x, y, s, o = {}) => person(x, y, s, { kind: 'kid', top: '#7a5a3e', pants: '#2a2420', skin: SKA, hair: HAIRA, ...o });
export const peterThi = (x, y, s, o = {}) => person(x, y, s, { kind: 'priest', collar: false, top: '#2a2530', skin: '#cf9a70', hair: '#cfc8bc', beard: '#e6e1d8',
  ...o, over: aoDai('#3a3444') + khanDong('#24202c') + (o.over || '') });
export const catechist = (x, y, s, o = {}) => person(x, y, s, { kind: 'elder', top: '#34465a', skin: '#c99468', hair: '#d9d4cc', beard: '#d9d4cc',
  ...o, over: aoDai('#24344a') + khanDong('#1c2230') + (o.over || '') });
export const villager = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#6b5038', pants: '#2a2420', skin: SKV[0], hair: HAIRA, beard: null,
  ...o, over: (o.hat ? nonLa(o.hatC) : '') + (o.over || '') });
const guardHat = nonLa('#2a2228', 62, 58) + '<circle cx="0" cy="-334" r="5" fill="#c8323a"/>';
const sash = '<path d="M-40 -122 Q0 -112 40 -122 L40 -108 Q0 -98 -40 -108Z" fill="#e2b448"/>';
export const guard = (x, y, s, o = {}) => person(x, y, s, { kind: 'layman', top: '#9a2e2a', pants: '#2a2432', skin: '#d0996c', hair: HAIRA, beard: null, mood: 'stern',
  ...o, over: sash + guardHat + (o.over || '') });
const dragonBadge = '<circle cx="0" cy="-160" r="19" fill="#c8323a" opacity=".85"/><path d="M-11 -158 q5 -9 11 0 q5 9 11 0" stroke="#f6e0a0" stroke-width="3" fill="none"/>';
export const emperor = (x, y, s, o = {}) => person(x, y, s, { kind: 'royal', crown: false, top: '#e0ae2e', skin: '#e2b48f', hair: HAIRA, beard: '#1a140f', mood: 'stern',
  ...o, over: dragonBadge + aoDai('#c08a1e') + khanDong('#d6a224') + (o.over || '') });

// ---------------------------------------------------------------- props
export const spear = '<g><rect x="-4" y="-270" width="8" height="390" rx="3" fill="#6b4a2a"/><path d="M0 -312 L10 -268 L-10 -268Z" fill="#b8bcc6"/><path d="M-9 -264 h18" stroke="#c8323a" stroke-width="6" stroke-linecap="round"/></g>';
export const handCross = (s = 1) => `<g transform="scale(${s}) translate(0,-26)"><circle r="42" fill="url(#haloGlow)" opacity=".7"/><rect x="-5" y="-40" width="10" height="80" rx="3" fill="#7a5232"/>`
  + '<rect x="-25" y="-24" width="50" height="9" rx="3" fill="#7a5232"/><path d="M-1 -16 v32" stroke="#f0d8b0" stroke-width="5" stroke-linecap="round"/><path d="M-14 -20 L14 -20" stroke="#f0d8b0" stroke-width="3.5" stroke-linecap="round"/><circle cy="-23" r="4.5" fill="#f0d8b0"/></g>';
// A crucifix lying on the ground, seen in perspective, with a soft glow
export const groundCross = (s = 1) => `<g transform="scale(${s})"><ellipse rx="160" ry="26" fill="#ffd98a" opacity=".4" filter="url(#blur6)"/>`
  + '<path d="M-11 -36 L11 -36 L16 34 L-16 34Z" fill="#7a5232"/><path d="M4 -36 L11 -36 L16 34 L6 34Z" fill="#4e3420" opacity=".6"/>'
  + '<path d="M-82 -18 L82 -18 L86 -3 L-86 -3Z" fill="#7a5232"/><path d="M-86 -3 L86 -3 L84 2 L-84 2Z" fill="#4e3420" opacity=".7"/>'
  + '<path d="M-3 -28 L3 -28 L5 22 L-5 22Z" fill="#f0d8b0"/><path d="M-60 -11 L60 -11" stroke="#f0d8b0" stroke-width="4" stroke-linecap="round"/><ellipse cx="0" cy="-30" rx="7" ry="4" fill="#f0d8b0"/></g>';
export const decree = '<g transform="translate(0,-34)"><rect x="-34" y="-30" width="68" height="62" rx="3" fill="#f6e2a0"/><rect x="-40" y="-36" width="80" height="9" rx="4" fill="#a8342e"/><rect x="-40" y="28" width="80" height="9" rx="4" fill="#a8342e"/>'
  + '<path d="M-20 -14 v34 M-6 -14 v30 M8 -14 v34 M22 -14 v26" stroke="#5a3a2a" stroke-width="3" stroke-linecap="round" opacity=".7"/><rect x="10" y="10" width="14" height="14" fill="#c8323a" opacity=".8"/></g>';
export const walkingStick = '<g><rect x="-4" y="-150" width="8" height="250" rx="3" fill="#8a6038"/><rect x="0" y="-150" width="4" height="250" rx="2" fill="#5e3e22" opacity=".6"/></g>';
export const lantern = (c = '#d8404e', s = 1) => `<g transform="scale(${s})"><path d="M0 -70 v28" stroke="#3a2a20" stroke-width="2.5"/><circle r="60" fill="url(#sunGlow)" opacity=".7"/>`
  + `<rect x="-16" y="-46" width="32" height="9" rx="2" fill="${GOLD}"/><ellipse rx="31" ry="39" fill="${c}"/><ellipse cx="-9" cy="-4" rx="10" ry="28" fill="#fff" opacity=".2"/>`
  + `<path d="M-27 -15 Q0 -8 27 -15 M-27 15 Q0 22 27 15" stroke="${dark(c, 0.3)}" stroke-width="2" fill="none"/><rect x="-16" y="37" width="32" height="9" rx="2" fill="${GOLD}"/><path d="M0 46 v28" stroke="${GOLD}" stroke-width="4"/></g>`;

// ---------------------------------------------------------------- set pieces
// Curved Vietnamese roof with upturned eaves; y = eave line, roof rises h
export function roofV(cx, y, w, h, c) {
  const L = cx - w, R = cx + w, t = y - h, iw = f(w * 0.6);
  return `<path d="M${L - 30} ${y - 22} Q${L - 4} ${y - 2} ${L + 30} ${y - 4} L${cx - iw} ${t} L${cx + iw} ${t} L${R - 30} ${y - 4} Q${R + 4} ${y - 2} ${R + 30} ${y - 22} Q${R + 22} ${y + 6} ${R - 20} ${y + 8} L${L + 20} ${y + 8} Q${L - 22} ${y + 6} ${L - 30} ${y - 22}Z" fill="${c}"/>`
    + `<path d="M${cx} ${t} L${cx + iw} ${t} L${R - 30} ${y - 4} Q${R + 4} ${y - 2} ${R + 30} ${y - 22} Q${R + 22} ${y + 6} ${R - 20} ${y + 8} L${cx} ${y + 8}Z" fill="${dark(c, 0.25)}" opacity=".55"/>`
    + `<path d="M${cx - iw - 16} ${t} H${cx + iw + 16}" stroke="${dark(c, 0.35)}" stroke-width="9" stroke-linecap="round"/>`
    + `<path d="M${cx - iw - 16} ${t} q-12 -2 -14 -18 M${cx + iw + 16} ${t} q12 -2 14 -18" stroke="${dark(c, 0.35)}" stroke-width="7" fill="none" stroke-linecap="round"/>`
    + `<path d="M${L + 30} ${y + 2} H${R - 30}" stroke="${light(c, 0.2)}" stroke-width="3" opacity=".5"/>`;
}
export function vietHouse(x, y, s = 1, { wall = '#c9a878', roof = '#a8844a', door = '#4a3424', win = null } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-130" y="-110" width="260" height="110" fill="${wall}"/><rect x="50" y="-110" width="80" height="110" fill="${dark(wall, 0.2)}" opacity=".55"/>`
    + `<rect x="-130" y="-8" width="260" height="8" fill="${dark(wall, 0.3)}"/><rect x="-34" y="-82" width="68" height="82" fill="${door}"/>`
    + [-90, 90].map((wx) => `<rect x="${wx - 22}" y="-80" width="44" height="34" fill="${win || dark(wall, 0.45)}"/><path d="M${wx - 11} -80 v34 M${wx} -80 v34 M${wx + 11} -80 v34" stroke="${dark(wall, 0.2)}" stroke-width="3"/>`).join('')
    + roofV(0, -104, 160, 96, roof) + '</g>';
}
export function vietChurch(x, y, s = 1, { wall = '#efe2c8', roof = '#8a3e2e', win = '#ffd98a', door = '#4a2e22' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="-200" y="-170" width="400" height="170" fill="${wall}"/><rect x="80" y="-170" width="120" height="170" fill="${dark(wall, 0.18)}" opacity=".6"/>`
    + [-150, -100, 100, 150].map((wx) => `<path d="M${wx - 14} -60 v-56 a14 14 0 0 1 28 0 v56Z" fill="${win}" opacity=".8"/>`).join('')
    + roofV(0, -164, 230, 110, roof)
    + `<rect x="-62" y="-300" width="124" height="300" fill="${light(wall, 0.08)}"/><rect x="20" y="-300" width="42" height="300" fill="${dark(wall, 0.15)}" opacity=".6"/>`
    + `<path d="M-34 0 v-90 a34 34 0 0 1 68 0 v90Z" fill="${door}"/><path d="M-28 0 v-88 a28 28 0 0 1 56 0 v88Z" fill="${win}" opacity=".3"/>`
    + `<circle cx="0" cy="-214" r="22" fill="${win}" opacity=".9"/>`
    + roofV(0, -296, 100, 58, roof) + `<rect x="-40" y="-372" width="80" height="38" fill="${light(wall, 0.08)}"/>` + roofV(0, -366, 70, 44, roof)
    + `<path d="M0 -410 v-64 M-20 -450 h40" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/></g>`;
}
export function onePillar(x, y, s = 1, { wood = '#8a3e2e', roof = '#5a4a3a', water = '#8fc0cc' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="220" ry="34" fill="${water}"/><ellipse cx="-50" cy="-4" rx="120" ry="9" fill="#fff" opacity=".3"/>`
    + '<rect x="-15" y="-118" width="30" height="118" fill="#8a8478"/><rect x="2" y="-118" width="13" height="118" fill="#6a665c"/>'
    + `<rect x="-76" y="-132" width="152" height="18" fill="${dark(wood, 0.25)}"/><rect x="-58" y="-206" width="116" height="78" fill="${wood}"/><rect x="-32" y="-192" width="64" height="50" fill="#ffd98a" opacity=".6"/>`
    + roofV(0, -202, 96, 62, roof) + '</g>';
}
export function citadelGate(x, y, s = 1, { stone = '#8a7c6c', wall = '#a8342e', roof = '#c9963a', door = '#2a1e22', lit = '#ffd98a' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})">`
    + `<rect x="-300" y="-190" width="600" height="190" fill="${stone}"/><rect x="130" y="-190" width="170" height="190" fill="${dark(stone, 0.18)}" opacity=".6"/>`
    + `<rect x="-312" y="-204" width="624" height="16" fill="${light(stone, 0.15)}"/>`
    + [-170, 0, 170].map((ax, i) => `<path d="M${ax - 40} 0 v-${i === 1 ? 110 : 76} a40 40 0 0 1 80 0 v${i === 1 ? 110 : 76}Z" fill="${door}"/>`).join('')
    + `<rect x="-210" y="-282" width="420" height="80" fill="${wall}"/><rect x="100" y="-282" width="110" height="80" fill="${dark(wall, 0.2)}" opacity=".6"/>`
    + [-150, -75, 0, 75, 150].map((wx) => `<rect x="${wx - 18}" y="-266" width="36" height="46" fill="${lit}" opacity=".7"/>`).join('')
    + roofV(0, -278, 250, 66, roof)
    + `<rect x="-130" y="-356" width="260" height="50" fill="${wall}"/>` + [-80, 0, 80].map((wx) => `<rect x="${wx - 14}" y="-348" width="28" height="34" fill="${lit}" opacity=".7"/>`).join('')
    + roofV(0, -352, 170, 56, roof) + '</g>';
}
export function paddies(y0, y1, { seed = 3, rice = '#7cba5c', water = '#bfe2e6', dike = '#9a8a5a' } = {}) {
  const R = rng(seed);
  let out = '', y = y0, i = 0;
  while (y < y1) {
    const h = 34 + i * 16, wet = i % 2 === 1;
    out += `<rect x="-200" y="${y}" width="${W + 400}" height="${h}" fill="${wet ? water : rice}"/>`;
    if (wet) out += `<rect x="-200" y="${y + 5}" width="${W + 400}" height="3" fill="#fff" opacity=".45"/>`;
    const n = 14 + i * 2;
    for (let k = 0; k < n; k++) {
      const x = -60 + (k + R() * 0.6) * ((W + 120) / n), yy = y + h * (0.55 + R() * 0.3), sz = 6 + i * 2;
      out += `<path d="M${f(x)} ${f(yy)} l${-sz * 0.5} ${-sz} M${f(x)} ${f(yy)} v${-sz * 1.2} M${f(x)} ${f(yy)} l${sz * 0.5} ${-sz}" stroke="${wet ? '#6aa84a' : dark(rice, 0.2)}" stroke-width="2.4" stroke-linecap="round"/>`;
    }
    out += `<rect x="-200" y="${y + h - 4}" width="${W + 400}" height="6" fill="${dike}"/>`;
    y += h; i++;
  }
  return out;
}
export function bamboo(x, y, s = 1, { c = '#6aa04a', leaf = '#4f8a3a', seed = 2 } = {}) {
  const R = rng(seed);
  let out = `<g transform="translate(${x},${y}) scale(${s})">`;
  for (let i = 0; i < 6; i++) {
    const bx = (i - 2.5) * 24, lean = (i - 2.5) * 14, h = 520 + R() * 160, col = i % 2 ? c : dark(c, 0.15);
    out += `<g${M.sway(1 + R(), 4 + R() * 2, R() * 3, bx, 0)}><path d="M${bx} 0 Q${f(bx + lean * 0.4)} ${f(-h / 2)} ${f(bx + lean)} ${f(-h)}" stroke="${col}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
    for (let k = 1; k < 7; k++) { const t = k / 7; out += `<path d="M${f(bx + lean * t * t - 8)} ${f(-h * t)} h16" stroke="${dark(col, 0.3)}" stroke-width="3"/>`; }
    for (let j = 0; j < 6; j++) {
      const lx = bx + lean + (R() - 0.5) * 90, ly = -h + j * 34 + R() * 20, a = (R() - 0.5) * 70 + (lx > bx + lean ? 20 : -20);
      out += `<ellipse cx="${f(lx)}" cy="${f(ly)}" rx="36" ry="8" fill="${j % 2 ? leaf : light(leaf, 0.15)}" transform="rotate(${f(a)} ${f(lx)} ${f(ly)})"/>`;
    }
    out += '</g>';
  }
  return out + '</g>';
}
export function buffalo(x, y, s = 1, { flip = false, c = '#4e4c56' } = {}) {
  const leg = (lx) => `<rect x="${lx - 11}" y="-74" width="22" height="74" rx="8" fill="${dark(c, 0.2)}"/>`;
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cy="2" rx="130" ry="12" fill="#1a0f1a" opacity=".2"/>`
    + leg(-80) + leg(-48) + leg(52) + leg(84)
    + `<path d="M-108 -112 q-24 30 -12 66" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`
    + `<ellipse cy="-104" rx="114" ry="58" fill="${c}"/><ellipse cx="10" cy="-80" rx="98" ry="30" fill="${dark(c, 0.2)}" opacity=".5"/><ellipse cx="-30" cy="-140" rx="60" ry="12" fill="${light(c, 0.2)}" opacity=".4"/>`
    + `<g${M.sway(4, 3.4, 0, 100, -110)}><path d="M112 -126 Q66 -150 88 -182 Q98 -150 134 -132Z" fill="#d8ccb4"/>`
    + `<ellipse cx="132" cy="-98" rx="40" ry="32" fill="${c}"/><ellipse cx="154" cy="-84" rx="22" ry="16" fill="${light(c, 0.18)}"/><circle cx="160" cy="-86" r="3" fill="${INK}"/>`
    + `<path d="M144 -128 Q176 -156 156 -186 Q158 -150 130 -128Z" fill="#c8bca4"/><circle cx="134" cy="-106" r="5.5" fill="${INK}"/><circle cx="132" cy="-108" r="2" fill="#fff"/></g></g>`;
}
export function lotus(x, y, s = 1, { c = '#f29ab4' } = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="-36" cy="8" rx="48" ry="12" fill="#3f7a46"/><ellipse cx="42" cy="12" rx="40" ry="10" fill="#4b8a50"/>`
    + [-62, 62, -32, 32, 0].map((a) => `<ellipse cx="0" cy="-24" rx="11" ry="27" fill="${a === 0 ? light(c, 0.25) : c}" transform="rotate(${a})"/>`).join('')
    + `<circle cy="-12" r="7" fill="${GOLD}"/></g>`;
}
export function woodCell({ wall = '#3e2c26', win = '#cfe0f4' } = {}) {
  let planks = '';
  for (let i = 0; i < 12; i++) {
    const x = -200 + i * 130;
    planks += `<rect x="${x}" y="-400" width="126" height="${H + 800}" fill="${i % 2 ? wall : dark(wall, 0.12)}"/><rect x="${x + 112}" y="-400" width="10" height="${H + 800}" fill="${dark(wall, 0.4)}" opacity=".7"/>`;
  }
  return planks + `<rect x="400" y="430" width="280" height="200" rx="8" fill="${win}"/><rect x="400" y="430" width="280" height="200" rx="8" fill="url(#sunGlow)" opacity=".45"/>`
    + `<g fill="${dark(wall, 0.4)}">${[452, 506, 560, 614].map((bx) => `<rect x="${bx - 7}" y="430" width="14" height="200"/>`).join('')}<rect x="400" y="520" width="280" height="12"/></g>`
    + `<rect x="-200" y="1250" width="${W + 400}" height="700" fill="#4a3a2a"/>`;
}
function hanoiRow(y, { roof = '#6a3a34', wall = '#d9c09a' } = {}) {
  return [[60, 0.62], [250, 0.55], [470, 0.6], [930, 0.58], [1100, 0.62]].map(([x, s], i) => vietHouse(x, y - (i % 2) * 12, s, { wall: i % 2 ? wall : light(wall, 0.1), roof: i % 2 ? roof : dark(roof, 0.1), win: '#ffd98a' })).join('');
}
const farm = (o) => villager(o.x, o.y, o.s, o);

// ---------------------------------------------------------------- scenes
// 0 · hook: the cross on the ground; he will not step on it
function scene0() {
  const guards = [150, 930].map((x, i) => guard(x, 1190, 1.15, { flip: i === 1, armR: 22, propR: spear, armL: 8 })).join('');
  return FAR(sky(SKIES.deep, { stars: 26, seed: 4 }) + glow(540, 860, 520, 0.6))
    + BACK(hill(1090, 20, '#3a2a48', 3) + citadelGate(540, 1110, 0.95, { stone: '#4a3c4c', wall: '#5a2a3a', roof: '#6a4a3a', door: '#1e1622' }))
    + MID(`<g opacity=".95">${guards}</g>`)
    + ground(1220, '#33263c', { rim: '#8a5a6a' })
    + `<ellipse cx="540" cy="1286" rx="270" ry="38" fill="#ffd98a" opacity=".28" filter="url(#blur14)"/>`
    + andrew(540, 1280, 2.25, { mood: 'determined', armL: [14, 2, 3], armR: [42, 3, 3.2], propR: handCross(1.25), halo: true })
    + `<g transform="translate(540,1338)">${groundCross(0.95)}</g>`
    + motes(16, { y0: 520, y1: 1220, seed: 5 })
    + NEAR(foliage('l', 1640, { color: '#1c1424' }) + foliage('r', 1660, { color: '#1c1424', seed: 3 }));
}

// 1 · born c. 1795, northern Vietnam
function scene1() {
  return FAR(sky(SKIES.day) + sun(850, 560, 56, 260))
    + BACK(clouds(440, { seed: 4 }) + hill(1050, 34, '#a8cbb8', 5, { freq: 1.6 }) + bamboo(70, 1070, 0.62) + bamboo(1010, 1060, 0.58, { seed: 5 }))
    + MID(paddies(1060, 1250, { seed: 2 }) + vietHouse(250, 1160, 0.95) + buffalo(860, 1200, 0.72, { flip: true }))
    + ground(1250, '#a8966a', { rim: '#d2c08e' }) + tufts(1256, 12, '#6a7a3a', { seed: 3 })
    + farm({ x: 420, y: 1325, s: 1.6, hat: true, mood: 'joy', armL: 12, armR: [36, 5, 3] })
    + farm({ x: 650, y: 1325, s: 1.6, girl: true, top: '#5a3e2c', skin: SKV[1], mood: 'joy', armL: [-24, 2, 3], armR: [-30, 2, 3.3], propR: `<g transform="translate(-4,-6) scale(1.35)">${babyBundle}</g>` })
    + butterflies(2, { y0: 900, y1: 1050 })
    + NEAR(foliage('r', 1630, { color: '#2f5a35', seed: 9 }));
}

// 2 · age 12, Hanoi: a catechist takes him in; baptized Andrew
function scene2() {
  return FAR(sky(SKIES.sunrise) + sun(220, 600, 60, 300))
    + BACK(clouds(420, { color: '#fff4e4', op: 0.8, seed: 7 }) + hanoiRow(1090))
    + MID(onePillar(800, 1190, 0.85) + bamboo(1010, 1200, 0.7, { seed: 8 }))
    + ground(1220, '#c8a878', { rim: '#ecd2a4' }) + tufts(1226, 10, '#8a8a4a', { seed: 6 })
    + catechist(360, 1320, 1.85, { mood: 'happy', talk: [0.6, 3.5], armL: [26, 2, 3], armR: [64, 6, 2.6], propL: book(true) })
    + littleAndrew(640, 1320, 1.35, { mood: 'joy', flip: true, armL: 10, armR: [30, 4, 3] })
    + `<g${M.in('fade', 3.8, 1)}>${sparkles(10, 560, 720, 820, 940, { seed: 3 })}</g>`
    + flowers(1300, 1350, 8, { seed: 2 })
    + NEAR(foliage('l', 1640, { color: '#3a4a2a', seed: 4 }));
}

// 3 · ordained 1823; preaching in the village (dolly: the church looms)
function scene3() {
  const sit = [[130, '#6b5038', true, false], [700, '#4a5a6a', false, true], [850, '#7a4a3a', true, false], [995, '#5a5038', false, true]]
    .map(([x, top, girl, hat], i) => villager(x, 1320, 1.08, { sitting: true, top, girl, hat, skin: SKV[i], mood: i % 2 ? 'joy' : 'happy', armL: 18, armR: [22, 4, 2.4 + i * 0.3], flip: x > 400 })).join('');
  return FAR(sky([[0, '#c8603e'], [0.38, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + sun(860, 760, 50, 280))
    + BACK(hill(1120, 30, '#c98a6a', 4, { freq: 1.4 }) + bamboo(60, 1130, 0.7, { seed: 11, c: '#7a9a4a' }))
    + MID(vietChurch(660, 1210, 1.12))
    + ground(1230, '#b8946a', { rim: '#e2c08a' }) + tufts(1236, 12, '#8a6a3a', { seed: 4 })
    + sit
    + andrew(370, 1320, 1.95, { mood: 'happy', talk: true, armL: [26, 2, 3], propL: book(true), armR: [74, 8, 2.6] })
    + motes(12, { y0: 600, y1: 1200, seed: 8 })
    + NEAR(bokeh(6, { seed: 5 }) + foliage('l', 1640, { color: '#4a3a24', seed: 6 }));
}

// 4 · 1832: the emperor's edict, trample the cross
function scene4() {
  return FAR(sky([[0, '#5a3a5a'], [0.45, '#b0645a'], [0.7, '#e8a46a'], [1, '#f2c88a']]))
    + BACK(clouds(500, { color: '#f6c0a0', op: 0.45, seed: 2, drift: 30 }) + citadelGate(540, 1110, 1.05))
    + MID(guard(110, 1200, 1.1, { armR: 22, propR: spear }) + guard(970, 1200, 1.1, { flip: true, armR: 22, propR: spear }))
    + ground(1215, '#8a6a52', { rim: '#c8a07a' }) + tufts(1222, 8, '#6a4a3a', { seed: 9 })
    + emperor(800, 1305, 1.9, { armL: [78, 4, 3], propL: decree, armR: 12 })
    + `<g transform="translate(520,1330)">${groundCross(0.8)}</g>`
    + farm({ x: 220, y: 1320, s: 1.55, mood: 'determined', armL: [40, 2, 3], armR: 10, propL: handCross(1.1) })
    + farm({ x: 420, y: 1335, s: 1.35, girl: true, kneel: true, top: '#4a3a5a', skin: SKV[3], mood: 'worried', armL: [36, 2, 3], armR: [36, 2, 3.3] })
    + NEAR(foliage('l', 1650, { color: '#3a2a2a', seed: 7 }));
}

// 5 · 1835: arrested, ransomed; takes the name Lac and moves on
function scene5() {
  return FAR(sky(SKIES.sunrise) + sun(860, 640, 62, 320))
    + BACK(clouds(440, { color: '#fff6e6', op: 0.75, seed: 12 }) + hill(1060, 40, '#9ab8a8', 7, { freq: 1.2 }) + bamboo(980, 1080, 0.6, { seed: 3 }))
    + MID(paddies(1070, 1250, { seed: 6, water: '#f6d8b0' }) + vietHouse(150, 1170, 0.8, { roof: '#9a7a44' }) + buffalo(420, 1200, 0.6))
    + ground(1250, '#a8966a', { rim: '#d8c48e' }) + tufts(1256, 12, '#7a7a3a', { seed: 2 })
    + farm({ x: 130, y: 1320, s: 1.3, girl: true, top: '#5a3e2c', skin: SKV[1], mood: 'sad', armL: [130, 18, 1.1], armR: 10 })
    + farm({ x: 290, y: 1320, s: 1.35, hat: true, skin: SKV[2], mood: 'happy', armL: 10, armR: [120, 16, 1.3] })
    + `<g${M.tw([{ at: 0, dur: 9, from: { x: -40 }, to: { x: 40 }, ease: 'none' }])}>${andrew(700, 1320, 1.95, { hat: true, mood: 'determined', armL: 10, armR: [24, 3, 2.2], propR: walkingStick })}</g>`
    + NEAR(foliage('r', 1640, { color: '#2f5a35', seed: 5 }));
}

// 6 · 1839: seized again with Fr. Peter Thi; prison and cangues
function scene6() {
  return FAR(sky(SKIES.night, { stars: 20, seed: 9 }))
    + BACK(woodCell())
    + beam(440, 640, 300, 820, 1320, 0.32)
    + ground(1260, '#3a2c22', { rim: '#6a5a4a' }) + tufts(1266, 14, '#a8945a', { seed: 5 })
    + peterThi(730, 1320, 1.75, { sitting: true, mood: 'peaceful', armL: [34, 2, 3], armR: [34, 2, 3.3], over: cangue() })
    + andrew(360, 1320, 1.9, { sitting: true, mood: 'determined', armL: [34, 2, 3], armR: [34, 2, 3.3], over: cangue() })
    + motes(14, { x0: 300, x1: 800, y0: 560, y1: 1200, color: '#e6eefa', seed: 6 })
    + NEAR(`<rect x="-200" y="1560" width="${W + 400}" height="500" fill="#140e1a" opacity=".6" filter="url(#blur14)"/>`);
}

// 7 · December 21, 1839: martyrdom shown by its setting, prayer, halos and palms
function scene7() {
  const fr = (d) => M.tw([{ at: d, dur: 1, from: { opacity: 0 }, to: { opacity: 1 } }, { at: d, dur: 6, from: { y: 0 }, to: { y: 170 }, ease: 'power2.out' }]);
  return FAR(sky(SKIES.deep, { stars: 30, seed: 7 }) + rays(540, 640, { op: 0.08 }))
    + BACK(hill(1110, 22, '#3a2440', 5) + citadelGate(540, 1150, 0.75, { stone: '#3e2c40', wall: '#4a2436', roof: '#5a3a3a', door: '#1a1220', lit: '#f6c07a' }))
    + glow(540, 1100, 420, 0.55)
    + `<g${M.tw([{ at: 2, dur: 3, from: { opacity: 0 }, to: { opacity: 1 } }])}>${beam(380, 700, 200, 880, 1320, 0.6)}${motes(14, { x0: 280, x1: 800, y0: 600, y1: 1250, color: '#fff2c4', seed: 2, rise: 120 })}</g>`
    + ground(1250, '#2a1f30', { rim: '#6a4a5a' })
    + peterThi(720, 1320, 1.7, { kneel: true, mood: 'peaceful', armL: [36, 2, 3], armR: [36, 2, 3.3], halo: 3.2 })
    + andrew(380, 1325, 1.85, { kneel: true, mood: 'peaceful', armL: [36, 2, 3], armR: [36, 2, 3.3], halo: 2.6 })
    + `<g transform="translate(250,560)"><g${fr(3)}>${palm_frond(1.4, -14, 10)}</g></g>`
    + `<g transform="translate(860,560)"><g${fr(3.6)}>${palm_frond(1.4, 14, 10)}</g></g>`
    + NEAR(bokeh(6, { seed: 9, op: [0.25, 0.5] }));
}

// 8 · canonized June 19, 1988 with 116 companions
function scene8() {
  const banner = `<g transform="translate(540,520)"><g${M.in('grow', 0.4, 1.6, 0, 0)}>`
    + '<rect x="-150" y="0" width="300" height="440" fill="#f4ead2" stroke="#c9a24a" stroke-width="8"/>'
    + '<rect x="-128" y="20" width="256" height="400" fill="none" stroke="#e2cf9c" stroke-width="3"/>'
    + '<path d="M-150 440 L-150 470 L-120 452 L-90 470 L-60 452 L-30 470 L0 452 L30 470 L60 452 L90 470 L120 452 L150 470 L150 440Z" fill="#c9a24a"/>'
    + `<g${M.in('pop', 1.5, 0.8, 0, 300)}>${andrew(0, 400, 0.9, { halo: true, armL: 22, armR: 22, propL: palm_frond(1.0, -15), propR: handCross(1) })}</g>`
    + '</g><rect x="-172" y="-14" width="344" height="20" rx="10" fill="#8a6a34"/><circle cx="-176" cy="-4" r="13" fill="#c9a24a"/><circle cx="176" cy="-4" r="13" fill="#c9a24a"/></g>';
  return FAR(sky([[0, '#b8603e'], [0.32, '#f0a46a'], [0.68, '#f8d894'], [1, '#f8d894']]) + rays(540, 560, { op: 0.13 }) + glow(540, 560, 440, 0.7))
    + BACK(clouds(860, { color: '#ffe2b8', op: 0.55, seed: 13, drift: 30 }) + basilica(540, 1200, 1.05, { color: '#4a3040' }))
    + banner
    + MID(ground(1200, '#4a3040') + crowd(1300, 12, { color: '#3a2434', flags: [['#f2c94c', '#ffffff', '#f2c94c']] }))
    + farm({ x: 170, y: 1345, s: 1.35, girl: true, top: '#c8404e', skin: SKV[3], mood: 'joy', armL: 12, armR: [130, 12, 1.3] })
    + person(320, 1345, 1.0, { kind: 'kid', top: '#e2b448', skin: SKV[1], hair: HAIRA, mood: 'joy', armL: [140, 14, 1.1], armR: 12 })
    + farm({ x: 900, y: 1345, s: 1.4, top: '#34465a', skin: SKV[2], mood: 'joy', flip: true, armL: 12, armR: [128, 12, 1.4] })
    + petals(24, { seed: 3, colors: ['#ffffff', '#f2c46b', '#f29ab4'] });
}

// 9 · feast day November 24
function scene9() {
  const lan = (x, y, c, d, ph) => `<g transform="translate(${x},${y})"${M.in('fade', d, 1)}><g${M.sway(4, 3.2, ph, 0, -70)}>${lantern(c, 1.05)}</g></g>`;
  return FAR(sky(SKIES.dusk, { stars: 24, seed: 4 }) + rays(540, 760, { op: 0.09 }))
    + BACK(clouds(600, { color: '#ffc9b0', op: 0.45, drift: 30, seed: 6 }) + hill(1190, 30, '#5d3f6c', 3, { freq: 1.6 }) + bamboo(60, 1200, 0.6, { seed: 13, c: '#3a4a3a', leaf: '#2a3a2e' }) + bamboo(1020, 1200, 0.62, { seed: 14, c: '#3a4a3a', leaf: '#2a3a2e' }))
    + glow(540, 1100, 480, 0.85)
    + lan(200, 520, '#d8404e', 0.4, 0) + lan(880, 540, '#e2a03a', 0.8, 1.2)
    + MID(`<rect x="-200" y="1250" width="${W + 400}" height="120" fill="#4a3a6a"/><rect x="-200" y="1256" width="${W + 400}" height="4" fill="#f2b28a" opacity=".5"/>`)
    + ground(1290, '#3e2c48', { rim: '#c07a7a' })
    + andrew(540, 1300, 2.4, { mood: 'happy', halo: 0.3, armL: [24, 2, 3], armR: [28, 2, 3.4], propL: palm_frond(1.05, -16), propR: handCross(1.2) })
    + lotus(150, 1320, 1.1) + lotus(930, 1330, 1.0, { c: '#f6b8c8' }) + lotus(300, 1360, 0.7)
    + motes(16, { y0: 520, y1: 1240, seed: 2 })
    + NEAR(bokeh(7, { seed: 6 }) + foliage('l', 1620, { color: '#2a1a34' }) + foliage('r', 1640, { color: '#2a1a34', seed: 5 }));
}

export const STORY = {
  slug: 'st_andrew_dung_lac', name: 'St_Andrew_Dung_Lac',
  voice: 'am_michael', speed: 0.95,
  fx: { handheld: true, leak: true, loop: true },
  thumb_hook: 'He would not step on the cross', thumb_title: 'St. Andrew Dung-Lac', thumb_shift: 0, thumb_t: 3,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: {
    'dˈʌŋlˈæk': 'zˈuːŋ lˈɑːk',                      // Dung-Lac -> zoong lahk
    'lˈæk': 'lˈɑːk',                                 // Lac -> lahk
    'mˈɪn mˈæŋ': 'mˈɪŋ mˈɑːŋ',                       // Minh Mang -> ming mahng
    'θˈaɪ': 'tˈiː',                                  // Thi -> tee
    'dᵻsˈɛmbɚ twˈɛnti wˈʌn': 'dᵻsˈɛmbɚ twˈɛnti fˈɜːst',  // December 21 -> twenty-first
    'noʊvˈɛmbɚ twˈɛnti fˈɔːɹ': 'noʊvˈɛmbɚ twˈɛnti fˈɔːɹθ', // November 24 -> twenty-fourth
    'wˈʌnhˈʌndɹɪd sˈɪkstiːn': 'wˈʌn hˈʌndɹɪd ænd sˈɪkstiːn',
  },
  scenes: [
    { kicker: '1830s · VIETNAM', title: 'Step on the Cross?', art: scene0, cam: 'push-fast',
      say: ['What if the law ordered you to step on the cross?', 'In Vietnam, one priest would rather die.', 'This is Saint Andrew Dung-Lac.'] },
    { kicker: 'c. 1795 · NORTHERN VIETNAM', title: 'Born in the North', art: scene1, cam: 'drift-r',
      say: ['He was born around 1795 in northern Vietnam, to a poor family.'] },
    { kicker: 'AGE 12 · HANOI', title: 'A Teacher of the Faith', art: scene2, cam: 'pan-r',
      say: ['When he was twelve, his family moved to Hanoi, where a Christian catechist taught him the faith.', 'He was baptized Andrew.'] },
    { kicker: '1823 · PRIESTHOOD', title: 'Father Andrew', art: scene3, cam: { move: 'dolly', oy: 840 },
      say: ['In 1823, he was ordained a priest, and his preaching led many to baptism.'] },
    { kicker: '1832 · IMPERIAL EDICT', title: "The Emperor's Order", art: scene4, cam: { move: 'push', amt: 0.08, ox: 520, oy: 1050 },
      say: ['In 1832, Emperor Minh Mang ordered Christians to trample on the cross.', 'Many refused, and hid their priests.'] },
    { kicker: '1835 · ON THE MOVE', title: 'A New Name: Lac', art: scene5, cam: 'pan-l',
      say: ['In 1835, he was arrested, and his parishioners paid to free him.', 'He took the name Lac, and moved to another region.'] },
    { kicker: '1839 · HANOI', title: 'Taken Again', art: scene6, cam: 'drift-l',
      say: ['In 1839, he was seized again, with Father Peter Thi.', 'Both were ransomed, arrested again, and tortured.'] },
    { kicker: 'DECEMBER 21, 1839 · HANOI', title: 'Faithful to the End', art: scene7, cam: { move: 'tilt-up', amt: 0.06, rack: { at: 1, dur: 2.5, blur: 6 } },
      say: ['On December 21, 1839, Andrew and Peter were beheaded in Hanoi.', 'They gave their lives rather than deny Christ.'] },
    { kicker: 'JUNE 19, 1988 · ROME', title: 'The 117 Martyrs', art: scene8, cam: { move: 'pull', amt: 0.07, oy: 900 },
      say: ['In 1988, Pope John Paul II declared him a saint, with 116 companions.', 'Among them, a mother of six, and a nine-year-old child.'] },
    { kicker: 'FEAST DAY · NOVEMBER 24', title: 'The Martyrs of Vietnam', art: scene9, cam: 'arc-r',
      say: ['Their feast day is November 24.', 'Saint Andrew Dung-Lac, and all the Martyrs of Vietnam, pray for us.'] },
  ],
};
