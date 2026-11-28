# SaintStories kit guide (read this instead of the reference files)

One-file API reference + templates + catalog for writing a new reel. The rules (story beats, pacing, iconography, layout,
delivery) stay in the skill; this file is the **code** side. Read it once per session, then open source files only for the one
helper you reuse, and only that helper:

```bash
cd ~/saint-reel/kit
sed -n '/^export const legionary/,/^export /p' stories/rufus_simon_of_cyrene.mjs | head -40   # one helper, not the file
grep -n "^export" stories/<file>.mjs                                                       # what a file offers
```

Template reel (current house standard: all-3D, cam3d, hd(), Ricks Clips motion, instant pose swaps): `stories/stephen_the_younger_coin.mjs`
+ `.bg3d.js`. The skeletons below are taken from it; you don't need to open it.

## 1. Commands (Git Bash, in ~/saint-reel/kit)

| Step | Command |
|---|---|
| write narration text | `node build.mjs stories/<file>.mjs say` (prints the work folder `work/<slug>`) |
| check pronunciation | `python3 narrate.py work/<slug> --check` (fix names in `STORY.fix`, re-run `say`) |
| voice it | `python3 narrate.py work/<slug>` (prints total length; 55–70 s target) |
| line times | `node build.mjs stories/<file>.mjs info` (`@<s in scene> (<s in reel>)` per line) |
| preview | `node build.mjs stories/<file>.mjs preview [t1 t2 …]` → `work/<slug>/preview/contact-sheet.jpg` |
| cover | `node build.mjs stories/<file>.mjs thumb` → `$SAINTSTORIES_OUT/thumb_<slug>.png` |
| render | `node build.mjs stories/<file>.mjs render --workers 10` (final MP4s; `fast` starved frames on Nov 27: drafts only) |
| music | `… music prompt` · `… music check [files]` · `… music mix [file]` |
| tidy | `… clean` |

After any script change: `say` → `narrate.py` → re-run the art (`info` or `preview`) and fix every `[wordTimes] "…" not found` warning.

## 2. Story file skeleton (`stories/<slug>.mjs`)

```js
// St. <Name>: <story> (one story | whole life; places). Feast: <Month D>.
// All-3D backgrounds (<slug>.bg3d.js: <sets>); cam3d; characters hd(); Ricks Clips motion (cam.path, instant pose swaps).
// Sources: <site> "<page>" (facts used…); <site> (quote "…").
// Exported for later reels: <names>.
import { M, GOLD, sparkles, bokeh, foliage, dark, light, f, palm_frond, beam, NEAR, MID, layer } from '../art.mjs';
import { hd, wordTimes } from '../hd.mjs';
import { speedLines, sweat, rage, steam, crack, burst, squash, streaks } from '../cartoonfx.mjs';
import { walk, walkOut } from './peter_of_alexandria_torn_robe.mjs';
// + characters/props reused from earlier stories (catalog §9)

const SLUG = 'st_<saint>_<story>';
const at = wordTimes(SLUG);                      // at(scene, 'word or phrase', plus) → s from scene start
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
const until = (t, svg) => `<g${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 1 }, to: { opacity: 0 } }])}>${svg}</g>`;   // hard cut out at t
const from = (t, svg) => `<g opacity="0"${M.tw([{ at: t - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }])}>${svg}</g>`;  // hard cut in at t
const span = (t0, t1, svg) => `<g opacity="0"${M.tw([{ at: t0 - 0.02, dur: 0.04, from: { opacity: 0 }, to: { opacity: 1 } }, { at: t1 - 0.02, dur: 0.04, to: { opacity: 0 } }])}>${svg}</g>`;
const popAt = (t, x, y, svg, dur = 0.45) => `<g transform="translate(${x},${y})"><g opacity="0"${M.tw([{ at: t, dur, from: { opacity: 0, scale: 0.5 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(2.2)', origin: '0 0' }])}>${svg}</g></g>`;
const flash = (t) => `<g opacity="0"${fadeIn(t, 0.1)}><g${fadeOut(t + 0.2, 0.7)}><rect x="-300" y="-300" width="1680" height="2520" fill="#fff6e0" opacity=".85"/></g></g>`;
const face = (x, y, s, kneel = false) => [x, Math.round(y - (kneel ? 168 : 252) * s)];   // cam.path / zoom target
const PRAY = { armL: -20, armR: -20 };

// ---- characters (one helper per person, on hd(); export them)
export const saintHD = (x, y, s, { over = '', ...o } = {}) => hd(x, y, s, { top: '#…', plain: true, mantle: '#…', lining: '#…',
  skin: '#d9a47e', hair: '#3a2a1e', beard: null, age: 'young', hairStyle: 'short', ...o, over });

// ---- one light per scene; keys = the scenes' bg3d names (the 3D set reads the same table via bg3d_vars)
export const LIGHT = {
  sHook:  { key: '#ffe0a8', from: 'top', tint: '#ffe8c8', amt: 0.1, rim: '#fff0d0', rimOp: 0.85 },
  sDeath: { key: '#ffe8c8', from: 'top', tint: '#9aa0d0', amt: 0.22, rim: '#ffe8c0', rimOp: 0.9 },
  sGlory: { key: '#ffb880', from: 'r', tint: '#ffc2a8', amt: 0.14, rim: '#ffd2a8', rimOp: 0.85 },
  // from: 'l' | 'r' | 'back' | 'top'; warm interiors '#ffa060' r / amt .18; night tint '#9aa0d0'
};
let LID = 0;
export const lit = (svg, mode) => {
  const L = LIGHT[mode], id = `${SLUG}_lit${++LID}`, d = 5;
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

// ---- scenes. Comment each with its SHOTS ("sentence": what we see). Positions as [x, feetY, s] constants.
// cam3d feet art y (plane 20): depth 1 ~1345, 0.97 ~1312, 0.95 ~1322, 0.92 ~1310, 0.85 ~1286, 0.78 ~1262, MID 0.75 ~1245.
const S0 = [370, 1345, 2.3], E0 = [800, 1322, 2.05];
function scene0() {
  const k1 = at(0, 'key word'), ti = at(0, 'This is');
  return layer(0.95, lit(castShadow(...E0, 'sHook') + seq((op) => otherHD(...E0, { flip: true, look: [2.4, 0.4], armL: [16, 2, 3], ...op }),
      [[0, { mood: 'stern' }], [k1 + 0.1, { mood: 'surprised', armR: [70, 3, 2] }]]), 'sHook'))
    + lit(castShadow(...S0, 'sHook') + seq((op) => saintHD(...S0, { armL: [16, 2, 3], ...op }),
      [[0, { mood: 'determined', look: [2.4, 0] }], [ti, { mood: 'happy', look: [0, 0], halo: ti + 0.2 }]]), 'sHook')
    + speedLines(S0[0], 1100, { at: k1, dur: 0.7, op: 0.4 })
    + NEAR(bokeh(6, { seed: 5, sides: true, op: [0.2, 0.4] }));
}
// … scene1() … sceneN()

const GLIDE = { move: 'push', amt: 0.002, oy: 1000 };
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const STAND = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
export const STORY = {
  slug: SLUG, name: 'St_<Name>_<Story>',
  bg3d: './<slug>.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' /* + every set file the .bg3d.js imports, see §8 */ },
  voice: 'am_michael', speed: 0.95, flow: true,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  cam3d: { plane: 20, dof: 2 },
  bg3d_vars: { light: LIGHT },
  cast: { saint: { voice: 'bm_george', speed: 0.92 } },          // quoted speakers (nearest accent)
  music: { story: '<one line>', color: '<instruments of place/era>', cues: { 4: '<mood for that scene>' } },
  thumb_hook: '<≤34 chars>', thumb_title: 'St. <Full Name>', thumb_scene: 0, thumb_t: 0.8, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  fix: { /* 'wrong IPA word': 'right IPA' */ },
  scenes: [
    { kicker: '<PLACE · YEAR>', title: '<3–5 word hook>', art: scene0, bg3d: 'sHook', front3d: true,
      cam: { ...GLIDE, shake: { at: at(0, 'key word', 0.05), amt: 12, dur: 0.5 }, path: [
        { at: at(0, 'key word'), to: [S0[0] + 90, 1250], z: 1.2, frame: [540, 1080] },
        { at: at(0, 'This is'), to: face(...S0), z: 1.35, frame: [520, 840] }] },
      tone: HOOK,
      say: ['<hook sentence>', 'This is Saint <Name>.'] },
    // quote: { text: '…', who: 'saint' } · climax: { text: '…', speed: 0.85 } · last scene tone { speed: 0.9, gap: 0.34, gain: -0.5 }
  ],
};
```

## 3. 3D background skeleton (`stories/<slug>.bg3d.js`)

```js
// three.js backgrounds for St. <Name> (browser module; build.mjs copies it to work/<slug>/bg3d.mjs).
//   sHook  <what>  [<set>(), base '<mode>']   … one line per set-up. Exported for later reels: <names>.
import * as THREE from './three.module.min.js';
window.BG3D_MANUAL = true;
const B = await import('./bakhita.bg3d.js');
const { makeRig, lam, glowMat, atScreen } = B;
const prevLib = window.BG3D_LIB;
window.BG3D_LIB = true;                       // import other reels' sets without them wiring their own canvases
const R = await import('./roma.bg3d.js');     // the alias must be in STORY.bg3d_extra: { 'roma.bg3d.js': './gelasius.bg3d.js' }
window.BG3D_LIB = prevLib;

export const BUILD = {   // keys = scene bg3d names = LIGHT keys
  sHook:  () => R.roma('sHook', { base: 'hook', move: 'push' }),     // set(name, { base: <mode>, ...overrides })
  sGlory: () => R.roma('sGlory', { base: 'glory', move: 'push' }),
};

if (!window.BG3D_LIB) {
  const C3 = window.CAM3D || {};
  const rigs = [...document.querySelectorAll('canvas.bg3d')].map((cv) => makeRig(cv, BUILD, { dof: C3.dof ?? 2 }));
  const renderAt = (T) => { for (const w of rigs) w.draw(T); };
  window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
  renderAt(0);
  window.__bg3dDone && window.__bg3dDone();
}
```
- A builder returns `{ scene, cam, update(t, p), front? }`; `front` = the low grass scene drawn over the SVG (`front3d: true`).
- Sets with an `extra` arg take `(name, { base, ...overrides })`: `name` must be the scene's bg3d key (the key light is read
  from `BG3D_VARS.light[name]`), `base` picks the preset mode. Override keys seen: `sky` (gradient stops), `fog`, `ridges`,
  `hemi: [sky, ground, i]`, `key: [color, i]`, `sun: [sx, sy, size]`, `rays: { op, dir, spread, up }`, `stars`, `air`
  (`'gold'|'dust'|'embers'`), `near` (ground colour), `clouds`, `move: 'push'` (always with cam.path), plus set-specific
  ones (roma: `basilica, temples, colosseum, aqueduct, roofs, pines, lit`; cathedral: `wall, col, floorA, floorB, ceil, win,
  shaft, apse, bigFlames`).
- Add a landmark: `const p = atScreen(v.cam, sx, sy, dist); obj.position.set(p.x, -2.5, p.z); v.scene.add(obj)` (see hagia3d).
- Deterministic only: `rng(seed)`, time from `update(t)`; no `Math.random`, no clocks.

## 4. art.mjs (`import … from '../art.mjs'`)

Coordinates 1080×1920 (`W`, `H`), shown 70 px lower. Colours `GOLD #f2c46b`, `INK #2b1d14`, `CREAM #f6f0e2`, `SKIN.{pedro, priest, s0..s3, fair}`, `SKINS[0..3]`, `SKIES.{day, sunrise, dusk, deep, gold, night}`.
Utils: `uid(n)`, `f(n)` (1-decimal), `rng(seed)`, `mix(a, b, t)`, `dark(c, t=.25)`, `light(c, t=.25)`.

- Layers: `layer(depth, svg)`, `FAR` .15, `BACK` .45, `MID` .75, `NEAR` 1.4 (characters unwrapped = depth 1). Under cam3d a layer at depth d is a card at 20/d units.
- Atmosphere: `sky(stops, {stars, seed})` · `sun(x, y, r=60, glow=340, op)` · `rays(cx, cy, {n, op, color, speed, len})` · `beam(x0, x1, xb0, xb1, y1, op=.6)` · `clouds(y0, {color, shade, op, drift, seed, n, scale})` · `hill(base, amp, color, seed, {freq, top})` · `waves(base, amp, L, period, fill, {phase, op, foam})` · `ground(y, color, {rim})`. (3D scenes: no SVG sky/BACK/ground.)
- Air and detail: `sparkles(n, x0, x1, y0, y1, {seed, color, size})` · `motes(n, {x0, x1, y0, y1, color, seed, size, rise})` · `petals(n, {seed, colors, y0, y1, fall})` · `bokeh(n, {seed, x0, x1, y0, y1, r, op, sides, drift})` (in NEAR) · `foliage('l'|'r', y=1560, {color, s, seed})` (in NEAR) · `tufts(y, n, color, {seed, x0, x1, s})` · `flowers(y0, y1, n, {seed, colors, x0, x1})` · `gulls(n, {y, seed, color, drift})` · `butterflies(n, {…})`.
- Props: `book(open)`, `palm_frond(scale, rot, sway)`, `cross_staff(h)`, `lily(scale)`, `roses(scale)`, `rosary()`, `bread_basket()`. Sets: `coconut`, `nipa_hut`, `ship`, `basilica`, `crowd(y, n, {color, flags})`. Old rig `person(x, y, s, o)` (background figures only).
- Paint ids: `url(#sunGlow)`, `#haloGlow`, `#beam`, `#seaG`, `#seaDusk`; filters `url(#soft)`, `#blur6`, `#blur14`.

**Motion attributes** `M.*` (append to a `<g …>`; times in s from scene start):
`bob(a=2, p=2.6, ph)` · `sway(deg, p=3, ph, ox, oy)` · `spin(degPerSec, ox, oy)` · `pulse(a, p=2, ph, ox, oy)` · `flick(p, ph, lo)` · `flap(p, ph)` · `drift(dx, dy)` · `scroll(tile, p)` · `in(type='fade'|'rise'|'pop'|'grow'|'drop', delay, dur=.8, ox, oy)` · `tw([{ at, dur, from: {x, y, opacity, scale, rotation}, to: {…}, ease, origin: 'x y' }])` (GSAP; only the first step may carry `from`). One scale/rotation motion per element: nest `<g>`s.

## 5. hd() characters (`import { hd, wordTimes, seq } from '../hd.mjs'`)

`hd(x, y, s, o)`: feet at (x, y), s=1 ≈ 300 px (adults 2.0–2.3 on one line, kids ×0.62). Head centre (0, −252) r 40 (kneeling −168), eyes (±14, −250), shoulders ±33 at −198 (body units).
- Pose: `mood` (`happy joy tender sad worried pain determined stern surprised awe peaceful`), `talk` (`true | [from, to]`, own voiced line only), `look: [dx, dy]` (−3…3; +dx = the way the body faces), `flip`, `kneel`, `armL/armR` (deg or `[deg, sway, period]`: 0 hang, 16–25 rest/hold, 40–44 hold to chest, 70–90 point/protect, 110–160 raise; −20 both = prayer hands), `propL/propR` (SVG at the hand, origin = hand), `halo` (`true | fade-in time`), `tears` (`true | time`), `ph` (phase, seq sets it).
- Look: `top`, `mantle` (null none), `lining`, `trim`, `belt` (colour | false), `plain` (habits/cassocks), `skin`, `hair`, `beard` (null clean), `iris`, `age` (`young|mid|old`), `hairStyle` (`short curly long wild old tonsure`), `beardStyle` (`short full long null`), `shaggy`, `shoes`.
- Women/nuns: `veil`, `wimple`, `ruche`, `veilHair` (`'covered'|'parted'|'long'|'hidden'`), `undercloth`. Never bald: married/nuns no hair shown, girls show hair.
- Suits/uniforms: `trousers`, `lapels`, `tie`, `buckle`.
- Extra SVG in body space: `under` (behind: capes, wings), `over` (front: vestments, armour, crowns, headwear: mitre y −282…−370, crown band ~−276…−304).
- Not covered: `sitting`, camisa. Extend hd.mjs opt-in, or person() for a background figure.
- `wordTimes(slug)` → `at(scene, 'phrase', plus)`; `seq(draw, steps, dur)` in hd.mjs is the old crossfade version: use the instant `seq` in the skeleton.
- Walking: `walk(t, dur, dx, svg)` (enters from dx px away) / `walkOut(t, dur, dx, svg)` from `peter_of_alexandria_torn_robe.mjs`.

## 6. cartoonfx.mjs (`import … from '../cartoonfx.mjs'`; all timed by `at`)

`sweat(x, y, s, at, {dur, side})` · `steam(x, y, s, at, {dur, n})` · `rage(x, y, s, at, {dur, color, op})` (never on the saint) · `speedLines(x, y, {at, dur, n, r0, r1, color, op, seed})` · `streaks(x0, y0, x1, y1, {at, dur, n, spread, color, op})` · `crack(x, y, r, at, {n, seed, color, width, hold})` · `burst(x, y, r, at, {color, rays, sparks, seed})` (the payoff, once) · `squash(at, ox, oy, amt)` (an attribute: `<g${squash(…)}>`) · `mapCard({sea, land, rivers, extra, tone})` + `route(pts, at, dur, {color, width, traveller})` + `pin(x, y, at, icon, color)` (map scene, no front3d). x, y = a character's feet (x, y, s) for sweat/steam/rage.

## 7. Scene and camera options

Scene: `{ kicker, title, say, art, cam, tone, bg3d, front3d: true, whip? }`. `say` entries: string · `{ text, speed: 0.85 }` (climax, once) · `{ text, who }` (cast voice) · `{ text, voice }`. `tone: { speed, gap, gain, voice }`.

`cam` (cam3d): `{ move: 'push', amt: 0.002, oy: 1000, … }` plus
- `path: [{ at, to: [x, y], depth = 1, z, frame: [sx, sy] }]`: at time `at` the art point `to` on the card at `depth` sits at screen `frame`, `z`× closer (0.9–1.5). Key 0 = start pose; 2–3 keys per scene, one per sentence, on the word that names the subject.
- `zoom: { at, to, style: 'cut'|'snap'|'smooth'|'fly', z, in, hold ('end'), out, center, ease, depth }` (or a list). On a quote: the speaker.
- `shake: { at, amt: 10–24, dur: 0.5–0.8 }` (or list) · `hero: { h: 2.4 }` · `drone: { h: 8, back: 12, dur: 2.8 }` (never scene 0) · `whip: 'r'|'l'` (on the scene, whips the previous one out) · `rack: { at, dur, blur }`.

Layout (screen px): title band to y≈320 (keep art out of top centre), feet 1250–1345, caption pill y 1464–1556 (keep characters above ~1400), right-edge buttons x > ~900 from y 900 down. Face points for path/zoom: `face(x, y, s, kneel)`.

## 8. 3D helper library and sets

From `bakhita.bg3d.js` (= `bakhita_freedom.bg3d.js`): `rng(seed)`, `clamp01`, `EASE`, `canvasTex(w, h, draw)`, `skyTex(stops)`, `glowTex(stops)`, `lam(color, o)` (Lambert), `glowMat(color, op)` (unlit), `ridge({ w, d, x, z, y, amp, color, seed, freq, segX })`, `cloud(x, y, z, s, color, op, seed, glow)`, `stars`, `sprite(tex, scale, op, blend)`, `atScreen(cam, sx, sy, dist)`, `makeRig(cv, BUILD, { dof })`; sets `venice(mode)`, `savanna(mode)`, `hall(mode)`.
From `agnes.bg3d.js` (= `agnes_of_assisi_too_heavy`): `cumulus(seed, {lit, shade, glow, op})`, `godRays(cam, sx, sy, dist, {n, len, width, spread, dir, op, seed, color})` (returns `{ group }`), `fields(w, d, y, z, seed, palette)`, `cypress3d`, `olive3d`, `assisi3d`, set `subasio(mode)`.
From `edmund.bg3d.js` (= `edmund_last_stand`): `groundTex(base, leaves, seed, grass)`, `tufts3d(n, {x, z0, z1, h, colors, seed, blades, r})`, `particles('embers'|'dust'|'gold', {n, seed})`, `longship3d`, `hall3d`, `abbey3d`, `oak3d`, `smoke3d`, set `anglia(mode, extra)`.

**Whole worlds** (file → set(modes); `extra` = takes `(name, { base, … })`). Import with `BG3D_LIB` and alias the file in `bg3d_extra`:

| File (alias) | Set and modes | Place |
|---|---|---|
| gelasius (roma) | `roma` extra: hook city letter feast death glory; parts `basilica3d colosseum3d romanTemple3d aqueduct3d stonePine3d roofs3d` | late-antique Rome; with `hagia3d` → Constantinople |
| stephen_the_younger_coin | `hagia3d({stone, dome, lit})`, `PALACE` overrides for cathedral | Byzantine |
| conrad_spider_chalice (conrad) | `cathedral` extra: hook altar choice later; `lakeAlps(name, opts)` | Gothic/Romanesque interior; Alpine lake |
| clement_anchor (clement) | `taurica` extra: hook exile spring anchor relics glory; `quarry3d cliffs3d` | Crimea cliffs, sea, quarry, island |
| edmund_last_stand (edmund) | `anglia` extra: hook raid hall arrive oak abbey glory | Anglo-Saxon England, fields, river, hall, abbey |
| agnes_of_assisi_too_heavy (agnes) | `subasio`: hook miracle dawn church slope gold glory | Umbria, Assisi |
| catherine_of_alexandria | `alexandria` extra: hook youth emp debate cell wheel sinai glory; `datePalm3d flatCity3d pharos3d monastery3d` | Egypt, Alexandria, Sinai |
| miguel_pro_firing_squad | `mexico` extra: hook street night pray cross funeral glory; `courtWall3d flatRoofs3d facades3d cathedral3d volcanoes3d` | Mexico City |
| presentation_of_mary | `jerusalem3d` extra: hook home wait climb altar dusk glory; `temple3d templeMount3d house3d colonnade3d paveTex` | Jerusalem, the Temple |
| theophane_venard_cage | `tonkin` extra: hook france court court2 pond field carmel glory; `pavilion3d citadelWall3d gate3d flagTower3d palm3d bamboo3d hut3d vnChurch3d frenchChurch3d carmel3d brickTex` | Vietnam, France |
| andrew_apostle (andrew) | `sea(mode='galilee')`, `boat3d town3d saltireCloud` | Sea of Galilee, Patras |
| longinus | `golgotha('storm'|'dawn'|'dusk')`, `cappadocia()` | Calvary, Cappadocia |
| george_dragon | `lake('murk'|'shore'|'light')` | Silene lake, walls |
| duchesne_sugar_creek | `prairie(mode)`, `logChapel()`, `lodge3d cabin3d tree3d` | American frontier |
| elizabeth_of_hungary_roses | `winterValley(mode)`, `castle3d pine3d` | Wartburg in snow |
| miraculous_medal | `paris(name, opts)`, `CHAPEL` | Paris, Rue du Bac chapel |
| moses_black_basket | `scetis(mode)`, `domeCell datePalm` | Egyptian desert monks |
| joan_of_arc_orleans | `loire(mode='dusk')` | Orléans, the Loire |
| albert_the_great | `woods(mode='light')` | German forest |
| roch_dog | `forest(mode='dusk')` | woods, lean-to |
| santo_nino_cebu | `bay(mode)`, `shoreHuts smokeColumn` | Cebu shore |
| takayama_ukon_exile | `japanCastle(mode, {dimAt})`, `castleKeep` | Japan |
| teresa_of_calcutta_beirut | `cityStreet(mode='smoke')`, `block` | war-torn city street |
| carlo_acutis_longform | `square milan london room church sea umbria brazil` | modern Italy, interiors |
| bakhita_freedom | `venice(mode)`, `savanna(mode)`, `hall(mode='chapel')` | Venice, Sudan, chapel hall |

Files with only `SETS` (set-ups of the above, read when reusing that reel's look): albert_of_louvain, cecilia_life, edmund_guardian_wolf, john_berchmans, leonard_of_port_maurice_colosseum, paul_le_bao_tinh_letter, peter_of_alexandria_torn_robe, rufus_simon_of_cyrene.

## 9. Catalog: reusable characters, props and set pieces (SVG)

Import with `import { name } from './<file>.mjs'`. hd()-based helpers are marked **hd**; others are person()-based (redraw on hd() for a main character).

- **agnes_of_assisi_too_heavy** (hd): agnesA, clare, francisHD, knight, monaldo; scissors, monstrance, panzoChurch
- **albert_of_louvain** (hd): albertL, knight, emperorHenry, popeCelestine; kiteShield, threeSwords
- **albert_the_great** (hd): dominican, albert, aquinas; quill, crystal, leafSprig, starBurst, glowCross, oxBubble, studyDesk
- **andrew_apostle** (hd): andrew, jesusHD, peterHD, baptist, governor; saltire, scroll, reedCross
- **andrew_dung_lac**: khanDong, aoDai, nonLa, cangue, andrew, littleAndrew, peterThi, catechist, villager, guard, emperor; spear, handCross, groundCross, decree, walkingStick, lantern, vietHouse, vietChurch, onePillar, citadelGate, paddies, bamboo, buffalo, lotus, woodCell
- **anthony_of_padua**: childJesus, anthony; foundKey, lisbonSe, reliquary, pulpit, santo, walnutCell, rain, lightning
- **aparecida**: aparecida (statue), aparecidaHead, imperialCrown, strawHat, canoe, babyBundle, colonialChurch, colonialTown, aparecidaBasilica
- **bakhita_freedom**: bakhita, littleBakhita, bakhitaNun, sister, mimmina, michieli, patriarch, attorney, consul, trader; kerchief, brokenChain, groundChain, decree, lampPost, mudHouses, consulHouse, font
- **cabrini**: cabrini; paperBoat, tenements, liberty, hospital, courthouse
- **carlo_acutis**: carlo, littleCarlo; monstrance, laptop, gamepad, codeTag, foodBag, milanBlocks, streetLamp, webPage, globe, hospitalRoom
- **carlo_acutis_longform_art** (hd, 16:9): carlo, kidCarlo, antonia, andrea, nanny, rajesh, popeFrancis, popeLeo, doctor, nurse, friar, mcSister; cup, reliquary, bed, sofa, desk, crt, portrait, tapestry
- **catherine_of_alexandria** (hd): catherine, emperorMax, sage, maryVision; laurelCrown, spikedWheel, wheelPieces, brokenWheel, scrollPile
- **catherine_of_siena_avignon**: catherine, littleCatherine, gregory, cardinal; thornCrown, tiaraIcon, kingCrown, letter, dyeLine, hallWall
- **cecilia_life** (hd): ceciliaHD, valerianHD, tiburtiusHD, angelHD; peristyle, steam, bathRim, maderno, churchIcon
- **cecilia_wedding_angel**: cecilia, valerian, tiburtius, urban, angel, wings; wreath, organ, lyre, tambourine, notes, domusWall, column, oilLamp, garland, curtain, aqueduct, stonePine, roundTomb, milestone, santaCecilia
- **catherine_laboure_secret** (hd, reuses miraculous_medal characters and SETS): nearColumn (pale chapel column foreground card)
- **charbel**: charbel; prayerRope, oilLamp, cedarFlag, cedar, lebanonRange, stoneVillage, grotto, cow, annaya, hermitage, tomb, sickBed
- **charles_borromeo**: charles; biretta, mozzetta, pectoral, rope, archCross, chalice, tiara, bedCart, humilitas, duomo
- **clement_anchor** (hd): clementHD, cyrilHD; anchor, pickaxe, spring, splash, relicBundle
- **conrad_spider_chalice** (hd): conrad, canon, peasant; spider, chalice2, altarStone, mitreGold
- **duchesne_sugar_creek** (hd): duchesne, sacredHeartSister, verhaegen, potaKid, potaWoman, potaMan; kernel, cornOnHabit, logHouse, wigwam
- **edmund_guardian_wolf** (hd): thane, searcher; heldArrow, groundCrown, bramble, handTorch, casket, buryCrest
- **edmund_last_stand** (hd): edmund, viking, saxonBishop; crown, heavenCrown, roundShield, longbow, silverPenny, threeCrowns, oakTrunk
- **elizabeth_of_hungary(_roses)** (hd in _roses): elizabethHD, ludwigHD, elizabeth, littleElizabeth, elizabethGrey, ludwig; crownHead, circlet, rose, roseLap, wartburg, cot, pine, fachwerk, drifts
- **five_gifts_countdown** (hd): vincentHD, francisPaola, martinHD, pioHD, josephCupertino, lambertini, medieval, boatman; host, pennant, soundRings, boat, cloakRaft, postcard, bed, roomWall
- **five_saints_countdown** (hd): lawrenceHD, bartholomewHD, denisHD, denisBody, headsman, poorHD; knife, gridSmall, fork, gridiron, marbleTomb, postRopes, heldHead; `makeRankHud`/`rankHud` (countdown HUD)
- **francis / francis_wolf_of_gubbio**: francis; tonsure, mitre, cope, stole, plumedCap, smallCross, bird, perched, flyer, assisi, tree, olive, chapelRuin, porziuncola, clothStall, bunting, wolf, wolf2, rabbit, gubbio, cityWall, wolfGrave
- **gelasius** (hd): gelasiusHD, poorMother, poorChild, envoy, senator; loaf, breadBasket, popeMedallion
- **george_dragon**: george, princess, dragon, dragonNeck; lance, crossShield, beltProp
- **joan_of_arc**: joan; fleur, standard, sword, chateau, gothic · joan_of_arc_orleans: tourellesSvg
- **john_berchmans** (hd): johnB, shoemaker, altarBoy, jesuitStudent; ruleBook, threeTreasures, shoe, purse
- **james_of_the_marches_cup** (hd): jamesHD (Observant Franciscan), friarOFM(x, y, s, i), tvrtko, dorothea; snake(s, t), snakeCup(s, snakeAt), throneSeat; 3D `COURT` (torchlit royal hall overrides for cathedral)
- **jude**: jude; medallion, headFlame, club
- **kolbe**: kolbe, prisoner; glasses, medal, crownProp, WHITE_CROWN, fence, tower, barracks, woodChurch, cottage, friary, press, magazines
- **leo_the_great**: leo, attila; pallium, ferula, hunHat, oldStPeters
- **leonard_of_port_maurice_colosseum** (hd): leonard, popeBenedict, popeToday, noble1750, guard1750, roman1750, gladiator; tricorn, candle, station, ruinedArena, italyMap
- **longinus**: longinus, longinusPreacher, longinusOld, governor; holyLance, lanceDown, axe, coin, coinBag, helmetDown, crossOf, golgotha, emptyTomb, chimneys, idol, statueNiche
- **lorenzo_ruiz**: lorenzo, filipina, dominican, soldier, official; barong, saya, halberd, quill, writingDesk, binondo, intramuros, nagasakiTown, gallows, pit
- **martin_de_porres**: martin; broom, mortar, bandage, slate, lima, cloister, dog, cat, mouse
- **martin_of_tours**: roman, rider, horse; CLOAK, cloakBack, cloakFront, cuirass, romanHelmet, crozier, gate, tent, stoneHut, barn, romChurch, goose, boat
- **miguel_pro_firing_squad** (hd): miguelHD, soldierMX, policeMX, photographer, rebozoWoman; kepi, fedora, flatCap, stole, crucifixHand, rifle, newspaper, boxCamera, ironBars, churchDoor, homeAltar, vivaBanner
- **miraculous_medal** (hd): vision(gx, gy, gr, s, mode, {raysOn, steps}) (Mary on the globe with rays), mary, catherineL, girlCath, aladel, sisterDC, parisian, oldMan, maryStatue; globe, rays, medalOval, medalBack, medalCoin, smallMedal
- **moses_black_basket**: moses, monk, brother; leakBasket, torch, sandPiles, cell, desertChurch
- **nicholas**: bishopNicholas; goldBag, goldBallsBook, redCope, lycianTown, rockTombs, cypress
- **padre_pio**: pio, villager; MITT, STIGMA, capuchinCape, ticket, crucifix, altar, confessionalBack, confessionalFront, graceFriary, gargano, stoneRoom
- **paul_le_bao_tinh_letter** (hd): paulTinh, seminarian; manacle, stole, brokenChain
- **perpetua_arena**: perpetua, felicity, pFather; FELT, gladius, gladiusDown, scroll, waterJar, wildCow, dust, goldLadder, arenaStands, arenaGate, prisonVault, carthage
- **peter**: peter, jesus, followers; mantleBack, mantleFront, keys, net, fish, candle, fishingBoat, campfire(x, y, s), rooster, sheep, jerusalem, romeSkyline, obelisk, petrineCross, rockOut
- **peter_of_alexandria_torn_robe** (hd): peterAlex, childJesusTorn, monkEG, holyVirgin, envoyPriest, bishopHD, stonemason, arius; omophorion, tornRobe, goldCoin, markTomb, prisonWall, rain, **walk, walkOut**
- **presentation_of_mary** (hd): maryChild, anne, joachim, templePriest, maiden; handLamp, templeSteps, dove, laurel
- **roch_dog**: roch, gottardo; staff, breadDog, leanTo, sickbed
- **rufus_simon_of_cyrene** (hd): rufusHD, simonCyrene, legionary, paulHD; thornCrown, carriedCross, gospelBook
- **santo_nino_cebu**: santoNino, juana, camus, legazpi, augustinian, dancer; blessingHand, pineBox, cebuBasilica, magellanCross, charredHut
- **sebastian_left_for_dead**: sebastian, sebastianArmor, diocletian; arrow, arrows, stake
- **stephen_the_younger_coin** (hd): stephenHD, emperorC5, byzMonk(x, y, s, i); solidus, iconPanel('christ'|'mary', s), diptych, goldBag, spear, whip, club, prisonWall, stemma, loros
- **takayama_ukon_exile**: ukon, samurai, hideyoshi; swordCross, tenshu, nobori, snowRoofs, sakura
- **teresa_of_calcutta_beirut**: teresa, sister, redCrossWorker, official, child; redCrossVan, plane, room, cityRow, flashes
- **theophane_venard_cage** (hd): theophane, guardVN, mandarin, executioner, villagerVN, therese; bambooCage, notes, goat, letterProp, saber, pictureFrame, mandarinDesk

Keep this catalog current: when a new reel exports helpers or a new 3D set, add one line here in the same commit.

## 10. Before you render (technical checks, in order)

1. Art run (`info` or `preview`) prints no `[wordTimes] "…" not found` warning (stale anchors fire at the line start).
2. Narration 55–70 s (`narrate.py` total); climax line has `speed: 0.85` and no `beat`.
3. Every scene: `bg3d` key present in `BUILD` and in `LIGHT`, `front3d: true`, `tone`, `cam.path` keys timed with `at()`.
4. `STORY` has `flow`, `fx { handheld: false, leak, loop }`, `video { bitrate: 14e6, mode: 'constant' }`, `cam3d`, `bg3d_vars`, `music`, `thumb_title` naming the saint; every set file the `.bg3d.js` imports is aliased in `bg3d_extra`.
5. Preview clean (skill step 6), loop seam `0` = `<total − 0.05>`.
6. Render with `render --workers 10`; then smallest frame (`ffprobe … packet=pkt_size`) above ~1 KB and mid-motion frames sharp.
