// SaintStories DETAILED chibi rig: hd(x, y, s, opts). Standard for new reels since 2026-11-15 (first used in
// stories/andrew_apostle.mjs). Same chibi proportions, coordinates and options as art.mjs person() (feet at (x, y),
// head centre (0,-252) r 40, shoulders ±33 at -198, s = 1 ≈ 300 px), so props, armL/armR (angle or [angle, sway, period]),
// propL/propR, mood, talk, halo (true | fade-in time), flip, kneel and under/over work the same way.
// Added detail: gradient-lit tunic with clavus stripes, fold lines, embroidered hem and neckline, cloth belt with a knot,
// a draped mantle with lining, folds and trim, sandalled feet, sleeves with trimmed cuffs, hands with fingers, gradient face
// with ears, nose, iris + pupil + two highlights + lids, tapered brows, hair and beard strands, moustache, age lines and a
// richer halo (double ring, fine rays).
// Opts beyond person(): top (tunic colour), mantle (null = none), lining, trim, belt, skin, hair, beard (null = clean-shaven),
// iris, age 'young' | 'mid' | 'old', hairStyle 'short' | 'curly' | 'long' | 'wild' | 'old' (bald crown, white mass behind),
// beardStyle 'short' | 'full' | 'long' | null, shaggy (camel-hair tunic edge).
// Also: plain (no clavus stripes or embroidery: habits, cassocks), belt: false (no belt), shoes (colour: closed shoes instead of sandals), hairStyle
// 'tonsure' (hair with a shaved crown), ph (bob / blink phase 0..1, so copies of one character move together).
// Nuns (opt-in, 2026-11-18, St. Rose Philippine Duchesne): veil (colour: hood over the head + drape down the back, hides
// hair and ears), wimple (colour: band framing the face), ruche: true (fluted frill on that band, as on the Sacred Heart
// bonnet). veilHair (2026-11-20): with a veil and no wimple, show hair under the hood: 'covered' (married/older women, a thin band),
// 'parted' or true (Western-style Mary), 'long' (young girls: veil set back, long locks over the shoulders), 'hidden' (no
// hair: the veil comes low on the forehead over a white under-cloth edge, `undercloth` colour; most depictions of St. Anne).
// Helpers: seq(draw, steps) changes a character's look on a word; wordTimes(slug) finds when a word is spoken.
// Suits and uniforms (opt-in, 2026-11-23, Bl. Miguel Pro): trousers (colour: two trouser legs and a jacket that ends at
// the hip; closed shoes by default), lapels (shirt colour: shirt V, collar points and jacket lapels with two buttons),
// tie (colour), buckle (colour: a plain belt band with a buckle, no knot; for uniforms).
// Not covered yet (use person() or add it here): sitting, crowns, camisa, habits with hoods. Extend this file
// for those, keeping old options unchanged.
import fs from 'fs';
import { M, GOLD, INK, dark, light, mix, uid, f } from './art.mjs';

let HID = 0;
export function hd(x, y, s, o = {}) {
  const n = ++HID, ph = o.ph ?? (n * 0.618) % 1, id = uid('hd');
  const skin = o.skin || '#d9a47e', top = o.top || '#4f7f5c', trim = o.trim || (o.plain ? dark(top, 0.1) : GOLD), hair = o.hair || '#4a3424';
  const beard = o.beard === undefined ? hair : o.beard, mantle = o.mantle || null, lining = o.lining || (mantle ? light(mantle, 0.35) : null);
  const age = o.age || 'mid', mood = o.mood || 'happy', veil = o.veil || null;
  const hs = veil ? 'none' : o.hairStyle || (age === 'old' ? 'old' : 'short');
  const bs = o.beardStyle === undefined ? (beard ? (age === 'old' ? 'long' : 'full') : null) : o.beardStyle;
  const skSh = dark(skin, 0.24), skHi = light(skin, 0.42), sh = dark(top, 0.3), hi = light(top, 0.3);
  const hSh = dark(hair, 0.32), hHi = light(hair, 0.4), iris = o.iris || '#6a4228', belt = o.belt || '#7a5434';
  const shoes = o.shoes || (o.trousers ? '#221c20' : null), tr = o.trousers || null;
  const g = [];
  g.push(`<defs><linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${hi}"/><stop offset=".42" stop-color="${top}"/><stop offset="1" stop-color="${sh}"/></linearGradient>`
    + `<radialGradient id="${id}f" cx=".36" cy=".34" r=".78"><stop offset="0" stop-color="${skHi}"/><stop offset=".5" stop-color="${skin}"/><stop offset="1" stop-color="${skSh}"/></radialGradient>`
    + `<linearGradient id="${id}h" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="${hHi}"/><stop offset=".45" stop-color="${hair}"/><stop offset="1" stop-color="${hSh}"/></linearGradient>`
    + (mantle ? `<linearGradient id="${id}m" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stop-color="${light(mantle, 0.25)}"/><stop offset=".5" stop-color="${mantle}"/><stop offset="1" stop-color="${dark(mantle, 0.32)}"/></linearGradient>` : '')
    + (beard ? `<linearGradient id="${id}b" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="${light(beard, 0.3)}"/><stop offset=".5" stop-color="${beard}"/><stop offset="1" stop-color="${dark(beard, 0.3)}"/></linearGradient>` : '')
    + `<linearGradient id="${id}e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(skin, '#fffaf2', 0.45)}"/><stop offset=".38" stop-color="#fffaf2"/><stop offset="1" stop-color="#fbf3ea"/></linearGradient>`
    + '</defs>');
  const EW = `url(#${id}e)`, R = `url(#${id}r)`, FC = `url(#${id}f)`, HC = `url(#${id}h)`, MC = `url(#${id}m)`, BC = `url(#${id}b)`;
  g.push(`<g transform="translate(${f(x)},${f(y)}) scale(${f(o.flip ? -s : s)},${f(s)})">`);
  g.push('<ellipse cx="0" cy="2" rx="64" ry="13" fill="#1a0f1a" opacity=".28" filter="url(#soft)"/>');
  g.push(`<g${M.bob(1.8, 2.3 + ph, ph)}><g transform="translate(0,${o.kneel ? 84 : 0})">`);
  // halo: soft glow, double gold ring, fine rays
  if (o.halo !== undefined && o.halo !== false && o.halo !== null) {
    const fade = typeof o.halo === 'number' ? M.in('fade', o.halo, 1.2) : '';
    let ticks = ''; for (let k = 0; k < 24; k++) { const a = k * 15 * Math.PI / 180; ticks += `M${f(Math.cos(a) * 74)} ${f(Math.sin(a) * 74)} L${f(Math.cos(a) * (k % 2 ? 82 : 88))} ${f(Math.sin(a) * (k % 2 ? 82 : 88))} `; }
    g.push(`<g transform="translate(0,-256)"${fade}><g${M.pulse(0.045, 2.6)}><circle r="140" fill="url(#haloGlow)"/>`
      + `<circle r="68" fill="${GOLD}" opacity=".16"/><circle r="68" fill="none" stroke="${GOLD}" stroke-width="7"/><circle r="61" fill="none" stroke="#fff4cc" stroke-width="1.6" opacity=".8"/>`
      + `<circle r="68" fill="none" stroke="#fff4cc" stroke-width="2.2" opacity=".85" stroke-dasharray="60 368" transform="rotate(200)"/>`
      + `<g${M.spin(6)}><path d="${ticks}" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/></g></g></g>`);
  }
  if (o.under) g.push(o.under);
  // veil drape behind the head and shoulders
  if (veil) {
    const vb = o.kneel ? -100 : -112;
    g.push(`<path d="M-52 -272 Q-72 -160 -62 ${vb} L62 ${vb} Q72 -160 52 -272Z" fill="${dark(veil, 0.08)}"/>`
      + `<path d="M24 -270 Q66 -200 60 ${vb} L40 ${vb} Q46 -200 24 -270Z" fill="${dark(veil, 0.35)}" opacity=".55"/>`
      + `<path d="M-50 -250 Q-64 -180 -58 ${vb + 6}" stroke="${light(veil, 0.3)}" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>`);
  }
  // mantle, back panel
  if (mantle) g.push(`<path d="M-46 -214 Q-72 -120 -68 ${o.kneel ? -92 : -4} L68 ${o.kneel ? -92 : -4} Q72 -120 46 -214Z" fill="${dark(mantle, 0.2)}"/>`
    + `<path d="M40 -200 Q60 -110 58 ${o.kneel ? -94 : -8}" stroke="${dark(mantle, 0.42)}" stroke-width="3" fill="none" opacity=".6"/>`);
  // long hair falling behind the shoulders
  if (hs === 'old') g.push(`<path d="M-34 -284 Q-60 -276 -58 -242 Q-62 -216 -48 -200 L48 -200 Q62 -216 58 -242 Q60 -276 34 -284 Q0 -298 -34 -284Z" fill="${HC}"/>`
    + `<path d="M-50 -258 Q-54 -236 -48 -214 M50 -258 Q54 -236 48 -214" stroke="${hSh}" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>`);
  if (hs === 'long' || hs === 'wild') g.push(`<path d="M-44 -262 Q-56 -214 -50 -180 Q-30 -170 -20 -190 L20 -190 Q30 -170 50 -180 Q56 -214 44 -262Z" fill="${hSh}"/>`);
  // feet in sandals / kneeling knees
  if (o.kneel) {
    g.push(tr ? `<ellipse cx="-66" cy="-92" rx="17" ry="10" fill="${shoes}"/><ellipse cx="66" cy="-92" rx="17" ry="10" fill="${shoes}"/>`
      : `<ellipse cx="-66" cy="-92" rx="17" ry="10" fill="${skSh}"/><ellipse cx="66" cy="-92" rx="17" ry="10" fill="${skSh}"/>`);
  } else {
    if (tr) for (const sx of [-1, 1]) g.push(`<path d="M${sx * 2} -114 L${sx * 37} -114 L${sx * 31} -9 L${sx * 5} -9Z" fill="${sx < 0 ? light(tr, 0.12) : dark(tr, 0.12)}"/>`
      + `<path d="M${sx * 20} -100 L${sx * 18} -14" stroke="${dark(tr, 0.35)}" stroke-width="2" fill="none" opacity=".55"/>`);
    if (shoes) for (const sx of [-1, 1]) g.push(`<ellipse cx="${sx * 17}" cy="-4" rx="17" ry="8" fill="${shoes}"/><ellipse cx="${sx * 17 - 5}" cy="-7" rx="7" ry="2.6" fill="${light(shoes, 0.3)}" opacity=".5"/>`);
    else for (const sx of [-1, 1]) g.push(`<g transform="translate(${sx * 17},-6)"><ellipse cx="0" cy="3" rx="17" ry="6" fill="#5a3a22"/>`
      + `<ellipse cx="${sx * 2}" cy="-1" rx="14" ry="7.5" fill="${skin}"/><ellipse cx="${sx * 6}" cy="-3" rx="6" ry="3" fill="${skHi}" opacity=".5"/>`
      + `<path d="M-11 -2 Q0 -8 11 -2 M-3 -7 L-1 4" stroke="#6a4428" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`);
  }
  // tunic (gradient lit from the left), clavus stripes, folds, rim light, embroidered hem
  const hemY = o.kneel ? -96 : tr ? -104 : -8;
  if (o.kneel) {
    g.push(`<path d="M-37 -207 Q0 -218 37 -207 L68 -96 Q0 -78 -68 -96Z" fill="${R}"/>`
      + `<ellipse cx="-32" cy="-92" rx="36" ry="14" fill="${dark(tr || top, 0.08)}"/><ellipse cx="32" cy="-92" rx="36" ry="14" fill="${dark(tr || top, 0.18)}"/>`);
  } else if (tr) {
    g.push(`<path d="M-37 -207 Q0 -218 37 -207 Q42 -150 47 -104 Q0 -92 -47 -104 Q-42 -150 -37 -207Z" fill="${R}"/>`);
  } else {
    g.push(`<path d="M-37 -207 Q0 -218 37 -207 Q46 -110 58 -8 Q0 4 -58 -8 Q-46 -110 -37 -207Z" fill="${R}"/>`);
  }
  g.push((o.plain ? '' : `<path d="M-17 -206 Q-20 -110 -26 ${hemY - 2} M17 -206 Q20 -110 26 ${hemY - 2}" stroke="${dark(top, 0.45)}" stroke-width="5" fill="none" opacity=".45"/>`)
    + `<path d="M-6 -140 Q-10 -70 -14 ${hemY} M8 -120 Q14 -60 20 ${hemY}${tr && !o.kneel ? '' : ` M-34 -100 Q-40 -50 -44 ${hemY}`}" stroke="${sh}" stroke-width="2.4" fill="none" opacity=".5" stroke-linecap="round"/>`
    + `<path d="M-35 -196 Q-42 -110 -52 ${hemY - 4}" stroke="${light(top, 0.55)}" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>`);
  if (o.shaggy) {   // camel-hair edge
    let z = `M-58 ${hemY}`; for (let k = 0; k <= 14; k++) z += ` L${-58 + k * 8.3} ${hemY + (k % 2 ? 10 : 0)}`;
    g.push(`<path d="${z} L58 ${hemY - 12} L-58 ${hemY - 12}Z" fill="${dark(top, 0.12)}"/>`
      + `<path d="M-30 -180 l6 8 M10 -160 l6 8 M-20 -120 l6 8 M24 -100 l6 8 M-36 -60 l6 8 M6 -50 l6 8 M30 -30 l6 8" stroke="${dark(top, 0.3)}" stroke-width="2.4" stroke-linecap="round"/>`);
  } else if (o.plain) {
    g.push(`<path d="M-58 ${hemY} Q0 ${hemY + 12} 58 ${hemY} L57 ${hemY - 9} Q0 ${hemY + 3} -57 ${hemY - 9}Z" fill="${trim}"/>`);
  } else {
    let dots = ''; for (let k = -5; k <= 5; k++) dots += `<path d="M${k * 9.5} ${hemY - 10} l3.5 -4 l3.5 4 l-3.5 4Z" fill="${dark(trim, 0.25)}"/>`;
    g.push(`<path d="M-58 ${hemY} Q0 ${hemY + 12} 58 ${hemY} L56 ${hemY - 18} Q0 ${hemY - 6} -56 ${hemY - 18}Z" fill="${trim}"/>${dots}`);
  }
  // belt with a knot and hanging ends
  if (o.buckle) g.push(`<path d="M-43 -130 Q0 -118 43 -130 L44 -116 Q0 -104 -44 -116Z" fill="${belt}"/><rect x="-8" y="-126" width="16" height="13" rx="2" fill="none" stroke="${o.buckle}" stroke-width="3.2"/>`);
  else if (o.belt !== false) g.push(`<path d="M-45 -126 Q0 -114 45 -126 L46 -110 Q0 -98 -46 -110Z" fill="${belt}"/><path d="M-45 -124 Q0 -112 45 -124" stroke="${light(belt, 0.3)}" stroke-width="2" fill="none" opacity=".7"/>`
    + `<g transform="translate(-16,-112)"><path d="M-2 4 Q-8 30 -4 52 M3 4 Q6 28 10 46" stroke="${belt}" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse rx="8" ry="6" fill="${dark(belt, 0.15)}"/></g>`);
  // mantle, front drape (left shoulder to right hip) with lining edge, folds and trim
  if (mantle) {
    const bot = o.kneel ? -90 : -6;
    g.push(`<path d="M-46 -214 Q-30 -224 -12 -214 Q-24 -160 18 -116 Q50 -72 58 ${bot} L22 ${bot + 2} Q14 -64 -4 -98 Q-40 -140 -50 -196Z" fill="${MC}"/>`
      + `<path d="M-12 -214 Q-24 -160 18 -116 Q50 -72 58 ${bot}" stroke="${lining}" stroke-width="5" fill="none"/>`
      + `<path d="M-38 -186 Q-18 -140 12 -106 M-10 -110 Q8 -70 14 ${bot - 4} M24 -98 Q40 -60 44 ${bot - 4}" stroke="${dark(mantle, 0.38)}" stroke-width="2.6" fill="none" opacity=".6" stroke-linecap="round"/>`
      + `<path d="M-44 -206 Q-36 -170 -22 -148" stroke="${light(mantle, 0.4)}" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>`
      + `<path d="M22 ${bot + 2} L58 ${bot} L57 ${bot - 9} L22 ${bot - 7}Z" fill="${trim}" opacity=".9"/>`);
  }
  // arms: sleeve widening to a trimmed cuff, a fold, a hand with thumb and finger lines
  const arm = (side, spec, prop) => {
    const [ang, amp = 0, per = 2.4] = Array.isArray(spec) ? spec : [spec];
    const px = side < 0 ? -34 : 34, rot = side < 0 ? ang : -ang;
    const cover = mantle && side < 0;
    const sc = cover ? MC : R, sk = cover ? dark(mantle, 0.3) : sh, cuff = cover ? lining : trim;
    return `<g transform="translate(${px},-198) rotate(${f(rot)})"><g${amp ? M.sway(amp, per, ph * per) : ''}>`
      + `<path d="M-11 -8 Q0 -14 11 -8 L16 84 Q0 92 -16 84Z" fill="${sc}"/><path d="M4 -8 L16 84 Q10 87 6 88Z" fill="${sk}" opacity=".45"/>`
      + `<path d="M-4 20 Q-6 50 -8 72" stroke="${sk}" stroke-width="2.2" fill="none" opacity=".55" stroke-linecap="round"/>`
      + `<path d="M-16 80 Q0 87 16 80 L16 88 Q0 95 -16 88Z" fill="${cuff}"/>`
      + `<g transform="translate(0,96) rotate(${f(-rot)})"><circle r="12" fill="${skin}"/><ellipse cx="-9" cy="-4" rx="4.8" ry="7" fill="${skin}" transform="rotate(-28 -9 -4)"/>`
      + `<path d="M-2 4 v6 M3 4 v6.5 M8 2 v6" stroke="${skSh}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`
      + `<path d="M5 -9 A12 12 0 0 1 6 10" stroke="${skSh}" stroke-width="3" fill="none" opacity=".45"/><circle cx="-4" cy="-5" r="3" fill="${skHi}" opacity=".5"/>${prop || ''}</g></g></g>`;
  };
  g.push(arm(-1, o.armL ?? 8, o.propL));
  // neck, embroidered neckline
  g.push(`<path d="M-10 -230 L10 -230 L11 -204 L-11 -204Z" fill="${skSh}"/>`
    + (o.lapels ? `<path d="M-16 -212 L0 -174 L16 -212Z" fill="${o.lapels}"/><path d="M-16 -212 L-5 -199 L-1 -210Z M16 -212 L5 -199 L1 -210Z" fill="${light(o.lapels, 0.4)}" stroke="${dark(o.lapels, 0.15)}" stroke-width="1"/>`
        + (o.tie ? `<path d="M-3.5 -207 L3.5 -207 L5.5 -176 L0 -168 L-5.5 -176Z" fill="${o.tie}"/><path d="M-3 -207 L3 -207 L2 -201 L-2 -201Z" fill="${dark(o.tie, 0.25)}"/>` : '')
        + `<path d="M-20 -211 L-2 -170 L-8 -160 L-27 -197 L-23 -207Z M20 -211 L2 -170 L8 -160 L27 -197 L23 -207Z" fill="${dark(top, 0.16)}"/>`
        + `<path d="M-20 -211 L-2 -170 M20 -211 L2 -170" stroke="${light(top, 0.35)}" stroke-width="1.4" fill="none" opacity=".6"/>`
        + `<circle cx="0" cy="-146" r="3" fill="${dark(top, 0.4)}"/><circle cx="0" cy="-124" r="3" fill="${dark(top, 0.4)}"/>`
      : `<path d="M-19 -210 Q0 -190 19 -210" stroke="${trim}" stroke-width="4.5" fill="none"/>` + (o.plain ? '' : `<path d="M-19 -210 Q0 -190 19 -210" stroke="${dark(trim, 0.3)}" stroke-width="1.2" fill="none" stroke-dasharray="3 4"/>`)));
  // ears, head, cheek shading, rim light
  g.push((veil ? '' : `<g fill="${skin}"><ellipse cx="-40" cy="-250" rx="8.5" ry="10"/><ellipse cx="40" cy="-250" rx="8.5" ry="10"/></g>`
    + `<path d="M-42 -255 q-3 5 0 10 M42 -255 q3 5 0 10" stroke="${skSh}" stroke-width="2" fill="none"/>`)
    + `<circle cx="0" cy="-252" r="40" fill="${FC}"/>`
    + `<path d="M8 -291 A40 40 0 0 1 8 -213 A30 40 0 0 0 8 -291Z" fill="${skSh}" opacity=".25"/>`
    + `<path d="M-30 -279 A40 40 0 0 0 -37 -236" stroke="${skHi}" stroke-width="3.5" fill="none" opacity=".6" stroke-linecap="round"/>`);
  // hair (by style), with strands
  const strands = (d, c, w = 2.2, op = 0.7) => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" opacity="${op}" stroke-linecap="round"/>`;
  if (hs === 'old') {
    g.push(`<path d="M-41 -258 Q-48 -278 -32 -286 Q-36 -274 -30 -264 Q-34 -258 -41 -258Z M41 -258 Q48 -278 32 -286 Q36 -274 30 -264 Q34 -258 41 -258Z" fill="${hair}"/>`
      + strands('M-14 -292 Q-6 -297 2 -292 Q9 -296 15 -291', hair, 3, 0.9));
  } else if (hs === 'curly') {
    let c = ''; [[-34, -270], [-24, -284], [-10, -292], [6, -293], [20, -288], [32, -276], [38, -260], [-40, -256]].forEach(([cx, cy], k) => { c += `<circle cx="${cx}" cy="${cy}" r="${11 + (k % 3)}"/>`; });
    g.push(`<path d="M-42 -252 Q-44 -296 0 -296 Q44 -296 42 -252 Q36 -270 18 -272 Q0 -266 -18 -272 Q-36 -270 -42 -252Z" fill="${HC}"/><g fill="${hair}">${c}</g>`
      + strands('M-30 -276 q4 -6 10 -4 M-6 -288 q4 -6 10 -4 M18 -284 q4 -6 10 -4 M30 -266 q4 -6 8 -2', hHi, 2, 0.6));
  } else if (hs === 'long' || hs === 'wild') {
    const wild = hs === 'wild';
    g.push(`<path d="M-44 -246 Q-48 ${wild ? -310 : -300} 0 ${wild ? -304 : -298} Q48 ${wild ? -310 : -300} 44 -246 Q44 -214 ${wild ? 52 : 46} -186 Q34 -184 32 -200 L34 -258 Q22 -276 4 -272 Q-2 -262 -8 -272 Q-24 -276 -34 -258 L-32 -200 Q-34 -184 ${wild ? -52 : -46} -186 Q-44 -214 -44 -246Z" fill="${HC}"/>`
      + strands('M-6 -294 Q-22 -288 -34 -264 M4 -294 Q22 -288 34 -264 M-38 -240 Q-40 -214 -42 -196 M38 -240 Q40 -214 42 -196', hSh, 2.2, 0.65)
      + strands('M-12 -290 Q-26 -282 -32 -268 M14 -290 Q26 -282 32 -268', hHi, 2, 0.55));
  } else if (hs === 'none') {   // veiled: white band framing the face (optionally fluted), then the hood
    const band = 'M-38 -224 Q-47 -297 0 -301 Q47 -297 38 -224';
    if (o.wimple) g.push(`<path d="${band}" stroke="${o.wimple}" stroke-width="13" fill="none" stroke-linecap="round"/>`
      + `<path d="M-35 -230 Q-42 -290 0 -294" stroke="${dark(o.wimple, 0.12)}" stroke-width="2" fill="none" opacity=".6"/>`
      + (o.ruche ? `<path d="${band}" stroke="${dark(o.wimple, 0.2)}" stroke-width="12" fill="none" stroke-dasharray="1.6 5" opacity=".7"/>` : ''));
    // veilHair (opt-in, 2026-11-20, Presentation of Mary): without a wimple the bare forehead dome under the hood read as a
    // bald head, so show hair under the hood. Styles: 'covered' (married / older women: the veil comes low on the forehead,
    // only a thin band of hair shows), 'parted' (true; Western-style Mary: centre-parted hair down to the temples, a short
    // lock each side), 'long' (young girls: the veil set back, fuller parted hair and long locks over the shoulders).
    const vh = o.wimple || !o.veilHair ? null : o.veilHair === true ? 'parted' : o.veilHair;
    if (vh === 'covered') g.push(`<path d="M-48 -256 Q-50 -298 0 -300 Q50 -298 48 -256 Q46 -244 42 -236 Q38 -258 24 -276 Q10 -284 2 -281 L0 -278 L-2 -281 Q-10 -284 -24 -276 Q-38 -258 -42 -236 Q-46 -244 -48 -256Z" fill="${HC}"/>`
      + strands('M-4 -292 Q-18 -286 -30 -272 Q-38 -260 -42 -244 M4 -292 Q18 -286 30 -272 Q38 -260 42 -244', hSh, 1.8, 0.55));
    else if (vh === 'long') g.push(`<path d="M-49 -262 Q-52 -312 0 -316 Q52 -312 49 -262 Q52 -214 50 -176 Q42 -168 34 -176 Q38 -214 37 -240 Q36 -262 22 -274 Q10 -278 2 -273 L0 -269 L-2 -273 Q-10 -278 -22 -274 Q-36 -262 -37 -240 Q-38 -214 -34 -176 Q-42 -168 -50 -176 Q-52 -214 -49 -262Z" fill="${HC}"/>`
      + strands('M-3 -308 Q-16 -296 -28 -278 Q-38 -262 -42 -232 Q-44 -204 -42 -182 M3 -308 Q16 -296 28 -278 Q38 -262 42 -232 Q44 -204 42 -182', hSh, 2, 0.55)
      + strands('M-8 -304 Q-24 -292 -32 -272 M8 -304 Q24 -292 32 -272 M-46 -230 Q-48 -206 -46 -186 M46 -230 Q48 -206 46 -186', hHi, 2, 0.5));
    else if (vh && vh !== 'hidden') g.push(`<path d="M-48 -256 Q-50 -304 0 -307 Q50 -304 48 -256 Q47 -232 42 -212 Q36 -216 37 -236 Q36 -262 22 -274 Q10 -278 2 -273 L0 -269 L-2 -273 Q-10 -278 -22 -274 Q-36 -262 -37 -236 Q-36 -216 -42 -212 Q-47 -232 -48 -256Z" fill="${HC}"/>`
      + strands('M-3 -300 Q-14 -290 -26 -276 Q-36 -262 -40 -232 M3 -300 Q14 -290 26 -276 Q36 -262 40 -232', hSh, 2, 0.55)
      + strands('M-8 -298 Q-22 -288 -30 -272 M8 -298 Q22 -288 30 -272', hHi, 2, 0.5));
    const hood = vh === 'hidden' ? 'M-52 -248 Q-55 -320 0 -320 Q55 -320 52 -248 Q50 -282 0 -288 Q-50 -282 -52 -248Z'
      : vh === 'covered' ?'M-52 -252 Q-55 -320 0 -320 Q55 -320 52 -252 Q48 -290 0 -293 Q-48 -290 -52 -252Z'
      : vh === 'long' ? 'M-50 -262 Q-53 -326 0 -327 Q53 -326 50 -262 Q45 -310 0 -315 Q-45 -310 -50 -262Z'
      : 'M-51 -256 Q-54 -320 0 -320 Q54 -320 51 -256 Q46 -302 0 -306 Q-46 -302 -51 -256Z';
    g.push(`<path d="${hood}" fill="${veil}"/>`
      + strands('M-40 -296 Q-20 -314 6 -314', light(veil, 0.35), 3, 0.5) + strands('M48 -262 Q48 -296 30 -310', dark(veil, 0.3), 2.4, 0.5)
      // 'hidden': the white under-cloth edge just inside the low veil (no hair shows, as in most depictions of St. Anne)
      + (vh === 'hidden' ? strands('M-49 -250 Q-47 -280 0 -285 Q47 -280 49 -250', o.undercloth || '#fbf8f0', 5, 0.95) : ''));
  } else {   // short wavy; 'tonsure' adds a shaved crown
    g.push(`<path d="M-42 -250 Q-46 -298 0 -297 Q46 -298 42 -250 Q38 -270 22 -276 Q14 -266 6 -276 Q-6 -266 -16 -277 Q-34 -272 -42 -250Z" fill="${HC}"/>`
      + strands('M-30 -282 Q-18 -292 -4 -290 M4 -291 Q18 -292 30 -280 M-38 -262 Q-34 -276 -24 -282', hSh, 2, 0.6)
      + (hs === 'tonsure' ? `<ellipse cx="0" cy="-290" rx="23" ry="8.5" fill="${skin}"/><ellipse cx="-6" cy="-292" rx="10" ry="3.4" fill="${skHi}" opacity=".7"/><ellipse cx="8" cy="-288" rx="10" ry="4.5" fill="${skSh}" opacity=".3"/>`
        : strands('M-20 -288 Q-8 -294 6 -292', hHi, 3, 0.5)));
  }
  // age lines
  if (age === 'old') g.push(`<path d="M-16 -278 Q0 -282 16 -278 M-12 -271 Q0 -274 12 -271" stroke="${skSh}" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>`
    + `<path d="M-28 -246 l-5 2 M-28 -250 l-6 -1 M28 -246 l5 2 M28 -250 l6 -1" stroke="${skSh}" stroke-width="1.4" opacity=".55" stroke-linecap="round"/>`);
  // beard and moustache
  if (bs) {
    // 2026-11-18 redraw (St. Agnes of Assisi): the beard grows from the sideburns along the jaw, hugs the face down to a
    // rounded chin tuft (no straight-sided bib), joins the moustache under the nose (no skin band between them), and every
    // strand stays inside the outline (the old highlight strand poked out onto the chest).
    const len = bs === 'long' ? -174 : bs === 'full' ? -194 : -204, w = bs === 'long' ? 20 : bs === 'full' ? 24 : 27, sx = f(w * 0.6);
    // outline: sideburn -> jaw -> a convex, rounded chin tuft whose lowest point is the centre (len + 2)
    const out = `M-40 -262 Q-45 -238 -38 -224 Q-32 ${len - 2} -${sx} ${len - 6} Q0 ${len + 10} ${sx} ${len - 6} Q32 ${len - 2} 38 -224 Q45 -238 40 -262`;
    g.push(`<path d="${out} L35 -260 Q34 -242 24 -235 Q12 -231 0 -233 Q-12 -231 -24 -235 Q-34 -242 -35 -260Z" fill="${BC}"/>`
      + `<path d="M-40 -262 Q-45 -238 -38 -224 Q-34 -210 -26 -206 Q-30 -224 -35 -260Z" fill="${light(beard, 0.22)}" opacity=".45"/>`
      + `<path d="M38 -224 Q32 ${len - 2} ${sx} ${len - 6} Q8 ${len + 3} 0 ${len + 2} Q16 ${len - 6} 26 -222Z" fill="${dark(beard, 0.3)}" opacity=".45"/>`
      + (bs === 'long' ? `<path d="M-7 ${len - 2} Q-5 ${len - 14} -11 ${len - 20} M7 ${len - 2} Q5 ${len - 14} 11 ${len - 20}" stroke="${beard}" stroke-width="7" fill="none" stroke-linecap="round"/>` : '')
      // strands end inside the outline
      + strands(`M-30 -234 Q-26 ${len + 10} -14 ${len - 10} M-12 -218 Q-8 ${len + 4} -5 ${len - 4} M12 -218 Q8 ${len + 4} 5 ${len - 4} M30 -234 Q26 ${len + 10} 14 ${len - 10}`, dark(beard, 0.34), 1.8, 0.55)
      + strands('M-36 -246 Q-36 -230 -28 -212', light(beard, 0.5), 2, 0.5)
      // moustache: fuller, sits right under the nose and runs into the beard at the corners of the mouth
      + `<path d="M-19 -229 Q-12 -240 -2 -236 Q0 -235 2 -236 Q12 -240 19 -229 Q11 -231 4 -230 Q0 -229 -4 -230 Q-11 -231 -19 -229Z" fill="${dark(beard, 0.14)}"/>`
      + `<path d="M-14 -235 Q-8 -238 -3 -236" stroke="${light(beard, 0.4)}" stroke-width="1.6" fill="none" opacity=".55" stroke-linecap="round"/>`);
  }
  // ---------------------------------------------------------------- face
  // Expressions (mood): every mood changes the EYES (upper / lower lid, size, gaze), the brows and the mouth, so faces read
  // even behind a beard. No eyelashes and no lid lines (user's choice 2026-11-15): lids are soft skin shapes over the eye-white.
  //   happy (soft smile, smiling eyes)   joy (laughing: squinted eyes, open grin)   tender (loving: closed smiling eyes ^ ^)
  //   sad (drooping outer lids, eyes down, mouth down)   worried (raised inner brows, wavy mouth)   pain (squeezed eyes, grimace)
  //   determined (calm resolve: slightly lowered lids, level brows, firm closed smile; reads brave, not angry)
  //   stern (judges, persecutors: heavy V brows, lowered lids, down-turned mouth; never on the saint)
  //   surprised (wide eyes, small pupils, high brows, O mouth)   awe (wonder at a vision: wide eyes looking up, soft open smile)
  //   peaceful (prayer, death, glory: closed eyes, gentle smile)
  //   downcast (opt-in 2026-11-27, Our Lady of the Miraculous Medal: serene, lids half lowered, eyes looking down, soft smile)
  // Options: look [dx, dy] moves the gaze (face units, about -3..3; flip mirrors it), tears true | fade-in time (a tear on each cheek).
  const MO = {   // lt: upper lid [inner, outer] as a share of the eye height; lb: lower lid share; sc: eye size; ir: iris radius; gz: gaze
    happy:      { lt: [0.12, 0.14], lb: 0.22, sc: 1, ir: 6.4, gz: [0, 0] },
    joy:        { lt: [0.12, 0.12], lb: 0.48, sc: 1, ir: 6.4, gz: [0, 0] },
    sad:        { lt: [0.08, 0.5], lb: 0.06, sc: 1, ir: 6.2, gz: [0, 1.8] },
    worried:    { lt: [0.0, 0.26], lb: 0.04, sc: 1.06, ir: 5.6, gz: [0, 0.6] },
    determined: { lt: [0.2, 0.14], lb: 0.16, sc: 1, ir: 6.4, gz: [0, 0] },
    stern:      { lt: [0.5, 0.22], lb: 0.12, sc: 1, ir: 6.2, gz: [0, 0] },
    surprised:  { lt: [0, 0], lb: 0, sc: 1.16, ir: 5.0, gz: [0, 0] },
    awe:        { lt: [0, 0.04], lb: 0.06, sc: 1.1, ir: 5.8, gz: [0, -2.4] },
  }[mood];
  const look = o.look || [0, 0];
  if (!MO && mood === 'downcast') {   // lowered lids looking down: a soft lash curve with a sliver of iris peeking below it
    g.push([-1, 1].map((sd) => { const cx = sd * 14;
      return `<path d="M${cx - 9} -251 Q${cx} -242 ${cx + 9} -251 Q${cx} -244.5 ${cx - 9} -251Z" fill="${iris}"/>`
        + `<path d="M${cx - 10} -252 Q${cx} -244 ${cx + 10} -252" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`
        + `<path d="M${cx + sd * 10} -252 l${sd * 4} -2.4" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`; }).join(''));
  } else if (!MO) {   // closed eyes: peaceful (downward arcs) | tender (smiling arcs ^ ^) | pain (squeezed > <)
    const d = mood === 'tender' ? 'M-22 -248 Q-14 -256 -6 -248 M6 -248 Q14 -256 22 -248'
      : mood === 'pain' ? 'M-22 -255 L-8 -250 L-22 -245 M22 -255 L8 -250 L22 -245' : 'M-22 -251 Q-14 -244 -6 -251 M6 -251 Q14 -244 22 -251';
    g.push(`<path d="${d}" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`);
  } else {
    const rx = 7.2 * MO.sc, ry = 8.6 * MO.sc, ir = MO.ir, top = -250 - ry, bot = -250 + ry, lidC = dark(skin, 0.05);
    const gx = MO.gz[0] + look[0], gy = MO.gz[1] + look[1];
    const eye = (cx, sx) => {
      const cl = uid('ey'), xi = cx - sx * (rx + 2), xo = cx + sx * (rx + 2);
      const [li, lo] = MO.lt, yi = top + li * 2 * ry, yo = top + lo * 2 * ry;
      const ix = f(cx + sx * 0.6 + gx), iy = f(-249 + gy);
      return `<clipPath id="${cl}"><ellipse cx="${cx}" cy="-250" rx="${f(rx)}" ry="${f(ry)}"/></clipPath>`
        + `<ellipse cx="${cx}" cy="-250" rx="${f(rx)}" ry="${f(ry)}" fill="${EW}"/>`
        + `<g clip-path="url(#${cl})"><circle cx="${ix}" cy="${iy}" r="${ir}" fill="${iris}"/><circle cx="${ix}" cy="${f(iy + 1.5)}" r="${f(ir * 0.55)}" fill="${light(iris, 0.35)}" opacity=".6"/>`
        + `<circle cx="${ix}" cy="${iy}" r="${f(ir * 0.52)}" fill="${INK}"/>`
        + `<circle cx="${f(ix - 2.6)}" cy="${f(iy - 3.4)}" r="2.4" fill="#fff"/><circle cx="${f(ix + 1.4)}" cy="${f(iy + 3)}" r="1.1" fill="#fff" opacity=".9"/>`
        + (li || lo ? `<path d="M${f(xi)} ${f(top - 3)} L${f(xo)} ${f(top - 3)} L${f(xo)} ${f(yo)} Q${cx} ${f((yi + yo) / 2 + 2)} ${f(xi)} ${f(yi)}Z" fill="${lidC}"/>` : '')
        + (MO.lb ? `<path d="M${f(xi)} ${f(bot + 3)} L${f(xo)} ${f(bot + 3)} L${f(xo)} ${f(bot - MO.lb * ry * 0.7)} Q${cx} ${f(bot - MO.lb * 2 * ry * 1.25)} ${f(xi)} ${f(bot - MO.lb * ry * 0.7)}Z" fill="${skin}"/>` : '')
        + '</g>';
    };
    g.push(`<g data-blink="${f(ph * 3)} 0 -250">${eye(-14, -1)}${eye(14, 1)}</g>`);
  }
  // brows: thick tapered strokes; white or grey hair gets a darker grey so they still read
  const pale = (c) => { const n = parseInt(c.slice(1), 16); return ((n >> 16) + ((n >> 8) & 255) + (n & 255)) / 3 > 170; };
  const browSrc = beard || hair, browC = pale(browSrc) ? '#8e847c' : dark(browSrc, 0.15);
  const BR = {   // left brow (viewer-left); the right one is mirrored
    happy: 'M-24 -268 Q-16 -275 -7 -270', joy: 'M-24 -271 Q-16 -279 -7 -273', tender: 'M-24 -269 Q-16 -274 -8 -270',
    sad: 'M-25 -265 Q-17 -266 -8 -275', worried: 'M-25 -266 Q-19 -266 -15 -270 Q-11 -274 -7 -276', pain: 'M-25 -264 Q-16 -266 -7 -273',
    determined: 'M-25 -271 Q-16 -274 -7 -270', stern: 'M-25 -274 L-6 -264', surprised: 'M-24 -276 Q-16 -285 -8 -278',
    awe: 'M-24 -275 Q-16 -283 -8 -277', peaceful: 'M-24 -267 Q-16 -271 -8 -268', downcast: 'M-23 -270 Q-15 -276 -8 -272',
  }[mood] || 'M-24 -268 Q-16 -275 -7 -270';
  g.push(`<g stroke="${browC}" stroke-width="${mood === 'downcast' ? 3.2 : 5}" fill="none" stroke-linecap="round"><path d="${BR}"/><path d="${BR}" transform="scale(-1,1)"/></g>`);
  // nose (no red cheeks: user's choice 2026-11-15; `blush: true` brings a faint blush back)
  g.push(`<path d="M-1 -248 Q-5 -241 -1 -239 Q3 -238 5 -241" stroke="${skSh}" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="-2" cy="-245" r="1.6" fill="${skHi}" opacity=".7"/>`
    + (o.blush ? `<ellipse cx="-26" cy="-237" rx="8.5" ry="5" fill="#ef6f6a" opacity=".22"/><ellipse cx="26" cy="-237" rx="8.5" ry="5" fill="#ef6f6a" opacity=".22"/>` : ''));
  if (o.tears !== undefined && o.tears !== false) {
    const tf = typeof o.tears === 'number' ? M.in('fade', o.tears, 0.8) : '';
    g.push(`<g${tf}>${[-1, 1].map((sx) => `<g transform="translate(${sx * 18},-238)"><g${M.bob(2.5, 1.8, sx > 0 ? 0.4 : 0)}><path d="M0 -6 Q4 1 3 4 A3.4 3.4 0 0 1 -3 4 Q-4 1 0 -6Z" fill="#bfe4ff" opacity=".9"/><circle cx="-1" cy="2" r="1" fill="#fff"/></g></g>`).join('')}</g>`);
  }
  // mouth: below the moustache, lip-coloured so it reads on a dark beard
  const my = -224, lip = '#b8584f', dk = '#4a1c18';
  const line = (d, w = 3) => `<path d="${d}" stroke="${lip}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  if (o.talk) {
    const [a, b] = Array.isArray(o.talk) ? o.talk : [0.3, 999];
    g.push(`<g data-talk="${a} ${b} 0 ${my}"><ellipse cx="0" cy="${my}" rx="7.5" ry="6" fill="${dk}" stroke="${lip}" stroke-width="1.6"/><ellipse cx="0" cy="${my + 3}" rx="4.5" ry="2.4" fill="#d86a6a"/></g>`);
  } else {
    g.push({
      happy: `<path d="M-10 ${my - 2} Q0 ${my + 8} 10 ${my - 2} Q0 ${my + 3} -10 ${my - 2}Z" fill="${lip}"/>${line(`M-10 ${my - 2} Q0 ${my + 8} 10 ${my - 2}`, 1.6)}`,
      joy: `<path d="M-12 ${my - 4} Q0 ${my + 14} 12 ${my - 4}Z" fill="${dk}" stroke="${lip}" stroke-width="1.6"/><path d="M-10.5 ${my - 3.4} Q0 ${my - 1} 10.5 ${my - 3.4} L9.5 ${my - 0.8} Q0 ${my + 1.6} -9.5 ${my - 0.8}Z" fill="#fffaf2"/><path d="M-6 ${my + 5} Q0 ${my + 1} 6 ${my + 5} Q0 ${my + 9} -6 ${my + 5}Z" fill="#e07a78"/>`,
      tender: `<path d="M-11 ${my - 2} Q0 ${my + 7} 11 ${my - 2} Q0 ${my + 3} -11 ${my - 2}Z" fill="${lip}"/>`,
      sad: `<path d="M-9 ${my + 3} Q0 ${my - 5} 9 ${my + 3} Q0 ${my - 1} -9 ${my + 3}Z" fill="${lip}"/>${line(`M-9 ${my + 3} Q0 ${my - 5} 9 ${my + 3}`, 1.6)}`,
      worried: line(`M-9 ${my} Q-5 ${my - 3.5} 0 ${my} Q5 ${my + 3.5} 9 ${my}`, 3.2),
      pain: `<path d="M-10 ${my + 1} Q-5 ${my - 4} 0 ${my - 1} Q5 ${my - 4} 10 ${my + 1} Q0 ${my + 5} -10 ${my + 1}Z" fill="${dk}" stroke="${lip}" stroke-width="1.6"/><path d="M-7 ${my - 0.5} Q0 ${my - 2} 7 ${my - 0.5}" stroke="#fffaf2" stroke-width="2" fill="none"/>`,
      determined: line(`M-9 ${my - 1} Q0 ${my + 3} 9 ${my - 1}`, 3.4),
      stern: line(`M-9 ${my + 2} Q0 ${my - 2} 9 ${my + 2}`, 3.4),
      surprised: `<ellipse cx="0" cy="${my + 1}" rx="5.5" ry="7" fill="${dk}" stroke="${lip}" stroke-width="1.8"/>`,
      awe: `<path d="M-6 ${my - 2} Q0 ${my + 9} 6 ${my - 2} Q0 ${my} -6 ${my - 2}Z" fill="${dk}" stroke="${lip}" stroke-width="1.6"/>`,
      peaceful: line(`M-8 ${my - 1} Q0 ${my + 4} 8 ${my - 1}`, 3),
      downcast: `<path d="M-8 ${my - 1} Q0 ${my + 5} 8 ${my - 1} Q0 ${my + 2} -8 ${my - 1}Z" fill="${lip}"/>`,
    }[mood] || line(`M-9 ${my - 2} Q0 ${my + 6} 9 ${my - 2}`, 3));
  }
  if (o.over) g.push(o.over);
  g.push(arm(1, o.armR ?? 8, o.propR));
  g.push('</g></g></g>');
  return g.join('');
}

// ---------------------------------------------------------------- timing helpers
const fadeInTw = (at, dur) => M.tw([{ at, dur, from: { opacity: 0 }, to: { opacity: 1 } }]);
let SEQ = 0;
/** One character through several looks: seq(draw, [[0, opts], [t, opts], ...]). draw(opts) returns the character (pass the
 * opts on to hd()). Each new look fades in ON TOP of the previous one, which is hidden once covered, so the face never turns
 * see-through mid-change; all copies share one bob / blink phase. Times are seconds from the scene start. */
export const seq = (draw, steps, dur = 0.4) => {
  const ph = (++SEQ * 0.37) % 1;
  return steps.map(([at, o], i) => {
    const next = steps[i + 1]?.[0], pic = draw({ ph, ...o });
    const body = next !== undefined ? `<g${M.tw([{ at: next + dur, dur: 0.05, from: { opacity: 1 }, to: { opacity: 0 } }])}>${pic}</g>` : pic;
    return i ? `<g opacity="0"${fadeInTw(at, dur)}>${body}</g>` : body;
  }).join('');
};
/** When is a word spoken? const at = wordTimes(STORY slug); at(sceneIndex, 'word or phrase', plus = 0) returns seconds from
 * the scene start (estimated from the line's start/end in work/<slug>/timings.json by the word's position in the text), so
 * expression changes and props land on the word they illustrate. A phrase that is not found returns the scene's first line
 * time; before the narration exists everything returns `plus`. flow lead-ins: 0.3 s for scene 0, 0.1 s for the others. */
// rough spoken length of caption text: digits and Roman numerals are read as words ("1931" = nineteen thirty-one, "XI" = the Eleventh)
const spokenLen = (t) => t.replace(/\d/g, '####').replace(/[IVX]{2,}/g, (m) => '#####'.repeat(m.length)).length;
export function wordTimes(slug, { first = 0.3, lead = 0.1 } = {}) {
  let T = null;
  try { T = JSON.parse(fs.readFileSync(new URL(`./work/${slug}/timings.json`, import.meta.url), 'utf8')); } catch { /* not narrated yet */ }
  return (scene, word, plus = 0) => {
    const sc = T?.[scene]; if (!sc) return plus;
    const L = scene === 0 ? first : lead;
    for (const se of sc.sentences) {
      const i = se.text.toLowerCase().indexOf(String(word).toLowerCase());
      if (i >= 0) return +(L + se.start + (se.end - se.start) * spokenLen(se.text.slice(0, i)) / spokenLen(se.text) + plus).toFixed(2);
    }
    console.warn(`[wordTimes] "${word}" not found in scene ${scene}`);
    return +(L + plus).toFixed(2);
  };
}
