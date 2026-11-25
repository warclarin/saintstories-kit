# SaintStories reel kit (HyperFrames)

Vertical 1080×1920 animated saint explainers for the SaintStories Facebook page.
Art is hand-built SVG (art.mjs); motion is declared with `data-*` attributes and turned into one seekable
GSAP timeline by reel.js; HyperFrames renders it to MP4; Kokoro TTS narrates offline.

```bash
bash setup.sh                                   # once per machine/session
node build.mjs stories/<x>.mjs say              # export narration script
python3 narrate.py work/<slug> --check          # phonemes, fix names in STORY.fix
python3 narrate.py work/<slug>                  # timings.json + narration.wav
node build.mjs stories/<x>.mjs preview          # contact sheet, one frame per scene
node build.mjs stories/<x>.mjs fast             # the MP4 (standard render, ~2.3x faster than `render`)
node build.mjs stories/<x>.mjs render --workers 10   # fallback: same MP4 through HyperFrames (adds --browser-gpu)
node build.mjs stories/<x>.mjs thumb            # vertical reel/Shorts cover (square crop: thumb_square: true)
```

## Rendering: `fast` (standard) and `render` (fallback)

`fast` (fastrender.mjs) opens the same `work/<slug>/index.html` in one headless Chrome page, seeks the GSAP
timeline frame by frame, draws each frame into a canvas (scene SVG serialized with its live GSAP state, so
filters, gradients and rack focus work; titles, captions, watermark and end card take fonts, colours, shadows
and positions from the page's computed CSS) and encodes it on the GPU with WebCodecs H.264 (software H.264 if
the GPU encoder is missing). ffmpeg then adds the narration at 48 kHz with HyperFrames' −3 dB peak limit.
Measured on a 24-core laptop with an RTX 5060: St. Jude (78 s) ~45 s vs ~96 s with `render`; Calungsod (63 s)
38 s vs 88 s; frames match `render` (SSIM 0.96–0.97, identical by eye), audio identical. Files are ~25% bigger
(fixed 10 Mbps). The vignette, light-leak and grain drawing in fastrender.mjs mirrors the `.vig`/`.leak`/`.grain`
CSS in build.mjs: change both together. Validate the MP4 as usual (frame from every scene, ffprobe, volumedetect).

`render` is HyperFrames' screenshot capture: ~75% of its time is capturing frames, so drawing faster does not
help it. It now passes `--browser-gpu` (HyperFrames' auto probe picks SwiftShader on Windows; the GPU is ~17%
faster, same frames); `--no-browser-gpu` turns it off. Use about 10 workers on 24 cores. Don't pass `--gpu`
(NVENC: ~6% faster, ~70% bigger files) or `--experimental-fast-capture` (slower overall here, 59 s vs 45 s).
Benchmarks and the first three.js tests: `experiments/README.md`.

## 3D backgrounds (three.js on every scene, standard)
Since 2026-11-18 EVERY scene of a new reel has a three.js background: characters, props and overlays stay SVG on top
of a WebGL canvas. Build one world per story with one set-up per scene; each set-up moves its own camera to match the
scene's `cam` (the canvas sits outside the SVG camera: push = z, pan = x + yaw, tilt-up = `setViewOffset`, dolly =
fov, rack focus = fog closing in). Reference: `stories/agnes_of_assisi_too_heavy.bg3d.js` `subasio(mode)`.
Set `STORY.bg3d: './<slug>.bg3d.js'` and `bg3d: '<builder>'` on every scene; the module exports `BUILD` and draws
every frame from HyperFrames' `hf-seek` time. Helpers and wiring: `stories/bakhita_freedom.bg3d.js` (library:
`ridge`, `cloud`, `sprite`, `makeView`, `newRenderer`, sets `venice`, `savanna`, `hall`); reference story:
`stories/george_dragon.bg3d.js` (`BG3D_MANUAL` + `bg3d_extra`). More sets: `longinus.bg3d.js` (Golgotha, Cappadocia).
In a 3D scene drop the SVG sky and `BACK` layer so the canvas shows; `thumb_shift` does not move the canvas.

## One camera for 3D + SVG (`STORY.cam3d`, opt-in, first used on St. Edmund 2026-11-19)
`cam3d: { plane: 20, dof: 2 }` makes the three.js camera the only camera. build.mjs writes `data-cam3d` instead of
`data-camv` (reel.js leaves .cam and the layers alone, no SVG hand-held loop), and `makeRig()` in bakhita_freedom.bg3d.js
projects the SVG with the 3D camera every frame: the character plane sits `plane` units away and each `layer(d, svg)` at
plane / d, so every SVG part is a flat card at a real distance (true parallax, push, pan, tilt, dolly zoom, orbit, roll).
The set's `update(t, p)` moves the 3D camera (size the move for the character plane: push ~1.3 units, pan ~1.5, dolly = back
away while narrowing the fov with d0 = plane, arc = orbit around the plane); an optional `rig(o)` receives the scene's
`{ move, amt, ox, oy, plane }` first. The background renders through a depth-of-field pass focused on the character plane
(`dof` px always, rising to 2 x the rack blur on `cam.rack`). `scene.front3d: true` adds `canvas.front3d` over the SVG: the
set's `front` scene (grass in front of the feet) drawn with the same camera. Put the ground in 3D, place cards where the
3D ground is at their distance (plane 20: depth 1 feet at art y ~1345, 0.95 ~1322, 0.92 ~1310, 0.78 ~1262), and share one light
per scene (`stories/edmund_last_stand.mjs` LIGHT + `lit()` + `castShadow()`, passed to the set as `bg3d_vars.light`).
Reference: `stories/edmund_last_stand.mjs` / `.bg3d.js` (`anglia(mode)`, `groundTex`, `tufts3d`, `particles`). Stories without
`cam3d` render exactly as before.

## Detailed characters (`hd.mjs`, standard)
New reels draw their people with `hd(x, y, s, opts)` from `hd.mjs` instead of art.mjs `person()`: the same chibi
proportions, coordinates and options (`mood`, `talk`, `halo`, `armL/armR`, `propL/propR`, `flip`, `kneel`, `under/over`),
with gradient-lit clothes, folds, embroidered trim, a draped mantle (`mantle`, `lining`), belt, sandals, hands with fingers,
irises with highlights, hair and beard strands (`hairStyle`, `beardStyle`), age lines (`age`) and a richer halo.
Expressions change the eyes (lids, size, gaze), brows and mouth: `happy`, `joy`, `tender` (closed smiling eyes), `sad`,
`worried`, `pain`, `determined`, `stern`, `surprised`, `awe` (wide eyes looking up), `peaceful`; `look: [dx, dy]` turns the
gaze (characters can look at each other), `tears: true | time` adds tears. Change a character's look on the word it
illustrates with a timed sequence of copies (`seq()` in `stories/andrew_apostle.mjs`).
Write a small helper per character on top of it (see `andrew`, `jesusHD`, `peterHD`, `baptist`, `governor` in
`stories/andrew_apostle.mjs`). Nuns: `veil`, `wimple`, `ruche` (`duchesne` in `stories/duchesne_sugar_creek.mjs`). Not covered yet: sitting, crowns, trousers, hooded habits; use `person()` for
those or extend `hd.mjs` with new opt-in options. Older stories keep `person()` and render unchanged.

## Camera moves and parallax

Each scene can set `cam`:

- `[ox, oy, amt]` — legacy slow push-in (the default when `cam` is omitted).
- `'push'`, `'pull'`, `'pan-l'`, `'pan-r'`, `'tilt-up'`, `'tilt-down'`, `'drift-l'`, `'drift-r'`, or
  `{ move, amt = 0.07, ox = 540, oy = 1150 }` for control. Keep `amt` around 0.05–0.09.

Suggested moves by scene role: hook/decision → push; reveal/canonization → pull; journeys → pan;
visions/death → tilt-up; quiet character beats → drift.

Signature moves (use each once per reel at most, except the hook):
- `'push-fast'`: quick push that eases out and settles. Scene 1 hook.
- `'dolly'`: dolly zoom; the subject barely grows while the background looms in behind. Visions, a call, a miracle.
- `'arc-l'` / `'arc-r'`: slow pan with a slight roll, like circling the character. Final portrait.
- Rack focus on any move: `cam: { move: 'tilt-up', rack: { at: 1, dur: 2.5, blur: 6 } }` blurs layers farther
  than depth 0.9 while the characters stay sharp. Prayer, death, glory. Heavier to render: one scene per reel.
- Zoom to a spot (cam3d scenes only): `cam: { move: 'drift-l', zoom: { at: 2.4, to: [520, 880], style: 'snap' } }`
  zooms in on one part of the frame mid-scene and back out, on top of the move (a list gives several). Styles:
  `'snap'` an editor's punch-in (0.2 s in, 1.5x, no parallax), `'smooth'` a slow lens zoom (0.8 s, 1.35x),
  `'fly'` the camera flies in toward the spot (1 s, 1.8x, true parallax, near cards rush past). Override any of
  `z` (zoom factor; max 3, fly max 2.5), `in`, `hold` (s, or `'end'` to stay in), `out`, `center` (0..1, how far the
  spot slides to the frame centre), `ease` (`expo|p3o|sio`). `to` is in art coordinates (a face, a hand, a prop);
  time `at` with `wordTimes()` so the zoom lands on the word. Never zoom in scene 1 at t = 0 (the loop seam).

Wrap parts of a scene in depth layers so camera moves create parallax: `FAR(sky…)`, `BACK(hills…)`,
`MID(set…)`, characters unwrapped (depth 1), `NEAR(foliage…)`, or `layer(depth, svg)` for a custom depth.
Layers only move during the new moves, so stories without them render exactly as before.
`stories/kolbe.mjs` is the first story that uses both.

## Finishing effects (opt-in)

`STORY.fx = { handheld: true, leak: true, loop: true }`: a gentle hand-held wobble on top of every camera move
(`handheld: 1.5` for more), a warm golden light-leak over each scene change, and a seamless loop: no fade from
or to black, and the last 0.6 s crossfade into an exact copy of the first frame (the final caption and the end
card leave before it), so a Reels/Shorts replay continues without a visible restart. `NEAR(bokeh(6))` adds
soft out-of-focus light discs at the frame edges (gradients, no blur filter, so they render fast).
Stories without `fx` render exactly as before. `fx.grain` (moving film grain) exists but makes the MP4
about 6× bigger, so leave it off. Avoid objects sweeping across the lens: they distract from the story.

## Continuous narration (opt-in)

`STORY.flow: true` makes the voiceover one continuous read: a scene change gets a short breath (0.1 s lead +
0.3 s tail, close to the 0.28 s gap between sentences) instead of the default 0.4 + 0.6 s of silence, and the
pictures cut on the line where the story moves on. The first scene keeps a 0.3 s lead and the last a 0.9 s tail
(room for the end card and the loop seam). Tune with `flow: { lead, tail, first, last, gap }`. Saves about
0.6 s per scene (St. Jude: 78.3 s -> 73.7 s). Write the script as one voiceover first (link scenes with
"Then", "But", "Years later"), voice it, then run `info`: under each scene it lists every line as
`@<seconds from scene start> (<seconds in the reel>)`, the times to use for `M.in` / `M.tw` events. In flow
mode those times are about 0.3 s earlier than with the default lead-in. Stories without `flow` time exactly as before.

**Climax beat (opt-in, one line per reel):** a `say` line can be `{ text, beat, speed }` instead of a string, e.g.
`{ text: 'But he was still breathing.', beat: 0.9, speed: 0.85 }`: `beat` adds that many seconds of silence before
the line (a held breath before the miracle) and `speed` reads just that line slower. Captions and `info` times
follow automatically. Plain string lines voice exactly as before.

**Character voices (opt-in):** a quoted line can be read by the speaker instead of the narrator. Split the narration
from the quote (`'She answered:'`, then `{ text: 'I will not. I am a Christian.', who: 'perpetua' }`) and cast each
speaker in `STORY.cast = { perpetua: { voice: 'if_sara', speed: 0.95 }, judge: { voice: { im_nicola: 0.55, am_onyx: 0.45 } } }`
(a voice is a Kokoro name or a weighted blend). Pick the voice with the nearest accent to the speaker: US `a*`,
British `b*`, Spanish `e*`, French `ff_siwis`, Hindi `h*`, Italian `i*` (also Latin-speaking Romans), Japanese `j*`,
Portuguese/Brazilian `p*`, Mandarin `z*`; the text stays English phonemes, so the voice keeps its accent. Character
lines are levelled to the narrator's loudness. Only real, sourced quotes get a voice; keep it to a few lines per reel.

**Scene tone (opt-in):** `scene.tone = { speed, gap, gain, voice }` sets the narrator's speed, the pause between lines
(s), loudness (dB) and voice or blend for that scene, e.g. a hushed prison `{ speed: 0.92, gap: 0.32, gain: -1.5,
voice: { am_michael: 0.8, am_onyx: 0.2 } }` or a fast arena `{ speed: 1.0, gap: 0.24, gain: 1 }`. A line's own
`speed` still wins (the climax beat). `stories/perpetua_arena.mjs` uses both.

`stories/calungsod.mjs` is the reference story. Files: `art.mjs` (rig, props, set pieces, motion
helpers), `reel.js` (runtime), `build.mjs` (composition + CLI), `fastrender.mjs` (standard renderer),
`narrate.py`, `vendor/` (GSAP, grain; three.js r170 + SVGLoader for the 3D backgrounds).
