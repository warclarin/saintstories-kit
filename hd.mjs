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
// Not covered yet (use person() or add it here): sitting, veils/wimples (nuns, Mary), crowns, trousers/camisa, habits with
// hoods. Extend this file for those, keeping old options unchanged.
import { M, GOLD, INK, dark, light, uid, f } from './art.mjs';

let HID = 0;
export function hd(x, y, s, o = {}) {
  const n = ++HID, ph = (n * 0.618) % 1, id = uid('hd');
  const skin = o.skin || '#d9a47e', top = o.top || '#4f7f5c', trim = o.trim || GOLD, hair = o.hair || '#4a3424';
  const beard = o.beard === undefined ? hair : o.beard, mantle = o.mantle || null, lining = o.lining || (mantle ? light(mantle, 0.35) : null);
  const age = o.age || 'mid', mood = o.mood || 'happy', hs = o.hairStyle || (age === 'old' ? 'old' : 'short');
  const bs = o.beardStyle === undefined ? (beard ? (age === 'old' ? 'long' : 'full') : null) : o.beardStyle;
  const skSh = dark(skin, 0.24), skHi = light(skin, 0.42), sh = dark(top, 0.3), hi = light(top, 0.3);
  const hSh = dark(hair, 0.32), hHi = light(hair, 0.4), iris = o.iris || '#6a4228', belt = o.belt || '#7a5434';
  const g = [];
  g.push(`<defs><linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${hi}"/><stop offset=".42" stop-color="${top}"/><stop offset="1" stop-color="${sh}"/></linearGradient>`
    + `<radialGradient id="${id}f" cx=".36" cy=".34" r=".78"><stop offset="0" stop-color="${skHi}"/><stop offset=".5" stop-color="${skin}"/><stop offset="1" stop-color="${skSh}"/></radialGradient>`
    + `<linearGradient id="${id}h" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="${hHi}"/><stop offset=".45" stop-color="${hair}"/><stop offset="1" stop-color="${hSh}"/></linearGradient>`
    + (mantle ? `<linearGradient id="${id}m" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stop-color="${light(mantle, 0.25)}"/><stop offset=".5" stop-color="${mantle}"/><stop offset="1" stop-color="${dark(mantle, 0.32)}"/></linearGradient>` : '')
    + (beard ? `<linearGradient id="${id}b" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="${light(beard, 0.3)}"/><stop offset=".5" stop-color="${beard}"/><stop offset="1" stop-color="${dark(beard, 0.3)}"/></linearGradient>` : '')
    + '</defs>');
  const R = `url(#${id}r)`, FC = `url(#${id}f)`, HC = `url(#${id}h)`, MC = `url(#${id}m)`, BC = `url(#${id}b)`;
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
  // mantle, back panel
  if (mantle) g.push(`<path d="M-46 -214 Q-72 -120 -68 ${o.kneel ? -92 : -4} L68 ${o.kneel ? -92 : -4} Q72 -120 46 -214Z" fill="${dark(mantle, 0.2)}"/>`
    + `<path d="M40 -200 Q60 -110 58 ${o.kneel ? -94 : -8}" stroke="${dark(mantle, 0.42)}" stroke-width="3" fill="none" opacity=".6"/>`);
  // long hair falling behind the shoulders
  if (hs === 'old') g.push(`<path d="M-34 -284 Q-60 -276 -58 -242 Q-62 -216 -48 -200 L48 -200 Q62 -216 58 -242 Q60 -276 34 -284 Q0 -298 -34 -284Z" fill="${HC}"/>`
    + `<path d="M-50 -258 Q-54 -236 -48 -214 M50 -258 Q54 -236 48 -214" stroke="${hSh}" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>`);
  if (hs === 'long' || hs === 'wild') g.push(`<path d="M-44 -262 Q-56 -214 -50 -180 Q-30 -170 -20 -190 L20 -190 Q30 -170 50 -180 Q56 -214 44 -262Z" fill="${hSh}"/>`);
  // feet in sandals / kneeling knees
  if (o.kneel) {
    g.push(`<ellipse cx="-66" cy="-92" rx="17" ry="10" fill="${skSh}"/><ellipse cx="66" cy="-92" rx="17" ry="10" fill="${skSh}"/>`);
  } else {
    for (const sx of [-1, 1]) g.push(`<g transform="translate(${sx * 17},-6)"><ellipse cx="0" cy="3" rx="17" ry="6" fill="#5a3a22"/>`
      + `<ellipse cx="${sx * 2}" cy="-1" rx="14" ry="7.5" fill="${skin}"/><ellipse cx="${sx * 6}" cy="-3" rx="6" ry="3" fill="${skHi}" opacity=".5"/>`
      + `<path d="M-11 -2 Q0 -8 11 -2 M-3 -7 L-1 4" stroke="#6a4428" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`);
  }
  // tunic (gradient lit from the left), clavus stripes, folds, rim light, embroidered hem
  const hemY = o.kneel ? -96 : -8;
  if (o.kneel) {
    g.push(`<path d="M-37 -207 Q0 -218 37 -207 L68 -96 Q0 -78 -68 -96Z" fill="${R}"/>`
      + `<ellipse cx="-32" cy="-92" rx="36" ry="14" fill="${dark(top, 0.08)}"/><ellipse cx="32" cy="-92" rx="36" ry="14" fill="${dark(top, 0.18)}"/>`);
  } else {
    g.push(`<path d="M-37 -207 Q0 -218 37 -207 Q46 -110 58 -8 Q0 4 -58 -8 Q-46 -110 -37 -207Z" fill="${R}"/>`);
  }
  g.push(`<path d="M-17 -206 Q-20 -110 -26 ${hemY - 2} M17 -206 Q20 -110 26 ${hemY - 2}" stroke="${dark(top, 0.45)}" stroke-width="5" fill="none" opacity=".45"/>`
    + `<path d="M-6 -140 Q-10 -70 -14 ${hemY} M8 -120 Q14 -60 20 ${hemY} M-34 -100 Q-40 -50 -44 ${hemY}" stroke="${sh}" stroke-width="2.4" fill="none" opacity=".5" stroke-linecap="round"/>`
    + `<path d="M-35 -196 Q-42 -110 -52 ${hemY - 4}" stroke="${light(top, 0.55)}" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>`);
  if (o.shaggy) {   // camel-hair edge
    let z = `M-58 ${hemY}`; for (let k = 0; k <= 14; k++) z += ` L${-58 + k * 8.3} ${hemY + (k % 2 ? 10 : 0)}`;
    g.push(`<path d="${z} L58 ${hemY - 12} L-58 ${hemY - 12}Z" fill="${dark(top, 0.12)}"/>`
      + `<path d="M-30 -180 l6 8 M10 -160 l6 8 M-20 -120 l6 8 M24 -100 l6 8 M-36 -60 l6 8 M6 -50 l6 8 M30 -30 l6 8" stroke="${dark(top, 0.3)}" stroke-width="2.4" stroke-linecap="round"/>`);
  } else {
    let dots = ''; for (let k = -5; k <= 5; k++) dots += `<path d="M${k * 9.5} ${hemY - 10} l3.5 -4 l3.5 4 l-3.5 4Z" fill="${dark(trim, 0.25)}"/>`;
    g.push(`<path d="M-58 ${hemY} Q0 ${hemY + 12} 58 ${hemY} L56 ${hemY - 18} Q0 ${hemY - 6} -56 ${hemY - 18}Z" fill="${trim}"/>${dots}`);
  }
  // belt with a knot and hanging ends
  g.push(`<path d="M-45 -126 Q0 -114 45 -126 L46 -110 Q0 -98 -46 -110Z" fill="${belt}"/><path d="M-45 -124 Q0 -112 45 -124" stroke="${light(belt, 0.3)}" stroke-width="2" fill="none" opacity=".7"/>`
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
    + `<path d="M-19 -210 Q0 -190 19 -210" stroke="${trim}" stroke-width="4.5" fill="none"/><path d="M-19 -210 Q0 -190 19 -210" stroke="${dark(trim, 0.3)}" stroke-width="1.2" fill="none" stroke-dasharray="3 4"/>`);
  // ears, head, cheek shading, rim light
  g.push(`<g fill="${skin}"><ellipse cx="-40" cy="-250" rx="8.5" ry="10"/><ellipse cx="40" cy="-250" rx="8.5" ry="10"/></g>`
    + `<path d="M-42 -255 q-3 5 0 10 M42 -255 q3 5 0 10" stroke="${skSh}" stroke-width="2" fill="none"/>`
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
  } else {   // short wavy
    g.push(`<path d="M-42 -250 Q-46 -298 0 -297 Q46 -298 42 -250 Q38 -270 22 -276 Q14 -266 6 -276 Q-6 -266 -16 -277 Q-34 -272 -42 -250Z" fill="${HC}"/>`
      + strands('M-30 -282 Q-18 -292 -4 -290 M4 -291 Q18 -292 30 -280 M-38 -262 Q-34 -276 -24 -282', hSh, 2, 0.6)
      + strands('M-20 -288 Q-8 -294 6 -292', hHi, 3, 0.5));
  }
  // age lines
  if (age === 'old') g.push(`<path d="M-16 -278 Q0 -282 16 -278 M-12 -271 Q0 -274 12 -271" stroke="${skSh}" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>`
    + `<path d="M-28 -246 l-5 2 M-28 -250 l-6 -1 M28 -246 l5 2 M28 -250 l6 -1" stroke="${skSh}" stroke-width="1.4" opacity=".55" stroke-linecap="round"/>`);
  // beard and moustache
  if (bs) {
    const len = bs === 'long' ? -170 : bs === 'full' ? -196 : -206;
    g.push(`<path d="M-37 -246 Q-38 ${len + 24} -14 ${len + 6} Q0 ${len - 2} 14 ${len + 6} Q38 ${len + 24} 37 -246 Q30 -226 0 -226 Q-30 -226 -37 -246Z" fill="${BC}"/>`
      + (bs === 'long' ? `<path d="M-8 ${len + 4} Q-6 ${len - 10} -14 ${len - 16} M8 ${len + 4} Q6 ${len - 10} 14 ${len - 16}" stroke="${beard}" stroke-width="7" fill="none" stroke-linecap="round"/>` : '')
      + strands(`M-26 -232 Q-24 ${len + 30} -12 ${len + 12} M-10 -224 Q-8 ${len + 20} -4 ${len + 6} M10 -224 Q8 ${len + 20} 4 ${len + 6} M26 -232 Q24 ${len + 30} 12 ${len + 12}`, dark(beard, 0.32), 1.8, 0.55)
      + strands(`M-30 -240 Q-30 -224 -22 ${len + 30}`, light(beard, 0.45), 2, 0.5)
      + `<path d="M-17 -233 Q-8 -241 0 -235 Q8 -241 17 -233 Q10 -229 0 -231 Q-10 -229 -17 -233Z" fill="${dark(beard, 0.12)}"/>`);
  }
  // eyes (iris, pupil, two highlights, upper lid with a lash flick); peaceful = closed with lashes
  const lid = dark(hair === '#e8e2d8' || age === 'old' ? '#6a5a4a' : hair, 0.35);
  if (mood === 'peaceful') {
    g.push(`<path d="M-22 -250 Q-14 -243 -6 -250 M6 -250 Q14 -243 22 -250" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`
      + `<path d="M-22 -250 l-4 -2 M22 -250 l4 -2" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`);
  } else {
    const sur = mood === 'surprised', ry = sur ? 10 : 8.6, rx = sur ? 7.8 : 7.2, ir = sur ? 5 : 5.8;
    const eye = (cx, sx) => `<ellipse cx="${cx}" cy="-250" rx="${rx}" ry="${ry}" fill="#fffaf2"/>`
      + `<circle cx="${cx + sx * 0.6}" cy="-249" r="${ir}" fill="${iris}"/><circle cx="${cx + sx * 0.6}" cy="-247.5" r="${ir * 0.55}" fill="${light(iris, 0.35)}" opacity=".6"/>`
      + `<circle cx="${cx + sx * 0.6}" cy="-249" r="${ir * 0.52}" fill="${INK}"/>`
      + `<circle cx="${cx - 2}" cy="-252.5" r="2.4" fill="#fff"/><circle cx="${cx + 2}" cy="-246" r="1.1" fill="#fff" opacity=".9"/>`
      + `<path d="M${cx - rx - 1} -250 Q${cx} ${-250 - ry - 3} ${cx + rx + 1} -251" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`
      + `<path d="M${cx + sx * (rx + 1)} -251 l${sx * 4} -3" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`
      + `<path d="M${cx - rx + 2} -242.5 Q${cx} ${-240.5} ${cx + rx - 2} -242.5" stroke="${skSh}" stroke-width="1.4" fill="none" opacity=".7"/>`;
    g.push(`<g data-blink="${f(ph * 3)} 0 -250">${eye(-14, -1)}${eye(14, 1)}`
      + (mood === 'joy' ? `<path d="M-23 -241 Q-14 -247 -5 -241 L-5 -238 L-23 -238Z M5 -241 Q14 -247 23 -241 L23 -238 L5 -238Z" fill="${skin}"/>` : '') + '</g>');
  }
  // brows (tapered strokes) per mood
  const browC = beard ? dark(beard, 0.15) : dark(hair, 0.1);
  const br = {
    sad: ['M-24 -264 L-8 -271', 'M24 -264 L8 -271'], worried: ['M-24 -265 Q-15 -266 -8 -272', 'M24 -265 Q15 -266 8 -272'],
    determined: ['M-24 -269 Q-15 -269 -7 -265', 'M24 -269 Q15 -269 7 -265'], stern: ['M-24 -272 L-7 -264', 'M24 -272 L7 -264'],
    surprised: ['M-24 -273 Q-16 -281 -8 -274', 'M24 -273 Q16 -281 8 -274'],
  }[mood] || ['M-24 -267 Q-16 -273 -8 -268', 'M24 -267 Q16 -273 8 -268'];
  g.push(`<path d="${br[0]} ${br[1]}" stroke="${browC}" stroke-width="4.4" fill="none" stroke-linecap="round"/>`);
  // nose, blush
  const blush = mood === 'sad' || mood === 'stern' ? 0.16 : 0.3;
  g.push(`<path d="M-1 -246 Q-5 -239 -1 -237 Q3 -236 5 -239" stroke="${skSh}" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="-2" cy="-243" r="1.6" fill="${skHi}" opacity=".7"/>`
    + `<ellipse cx="-26" cy="-237" rx="8.5" ry="5" fill="#ef6f6a" opacity="${blush}"/><ellipse cx="26" cy="-237" rx="8.5" ry="5" fill="#ef6f6a" opacity="${blush}"/>`);
  // mouth (on top of the beard)
  const my = -227;
  if (o.talk) {
    const [a, b] = Array.isArray(o.talk) ? o.talk : [0.3, 999];
    g.push(`<g data-talk="${a} ${b} 0 ${my}"><ellipse cx="0" cy="${my}" rx="7.5" ry="6" fill="#5a2620"/><ellipse cx="0" cy="${my + 3}" rx="4.5" ry="2.4" fill="#d86a6a"/></g>`);
  } else {
    const lc = '#5a2a22', st = `stroke="${lc}" stroke-width="2.6" fill="none" stroke-linecap="round"`;
    g.push({
      joy: `<path d="M-10 ${my - 3} Q0 ${my + 12} 10 ${my - 3}Z" fill="#5a2620"/><path d="M-6 ${my + 3} Q0 ${my + 7} 6 ${my + 3}" stroke="#d86a6a" stroke-width="3" fill="none"/>`,
      sad: `<path d="M-7 ${my + 2} Q0 ${my - 4} 7 ${my + 2}" ${st}/>`, worried: `<path d="M-8 ${my} q4 -3 8 0 q4 3 8 0" ${st}/>`,
      determined: `<path d="M-8 ${my - 1} Q0 ${my + 3} 8 ${my - 1}" ${st}/>`, stern: `<path d="M-8 ${my} H8" ${st}/>`,
      surprised: `<ellipse cx="0" cy="${my}" rx="5" ry="6.5" fill="#5a2620"/>`, peaceful: `<path d="M-7 ${my - 1} Q0 ${my + 4} 7 ${my - 1}" ${st}/>`,
    }[mood] || `<path d="M-9 ${my - 2} Q0 ${my + 6} 9 ${my - 2}" ${st}/><path d="M-4 ${my + 3} Q0 ${my + 4.5} 4 ${my + 3}" stroke="#c87a6a" stroke-width="2" fill="none" opacity=".6"/>`);
  }
  if (o.over) g.push(o.over);
  g.push(arm(1, o.armR ?? 8, o.propR));
  g.push('</g></g></g>');
  return g.join('');
}
