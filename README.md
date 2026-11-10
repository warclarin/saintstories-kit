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
Benchmarks and the three.js experiment: `experiments/README.md`.

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

`stories/calungsod.mjs` is the reference story. Files: `art.mjs` (rig, props, set pieces, motion
helpers), `reel.js` (runtime), `build.mjs` (composition + CLI), `fastrender.mjs` (standard renderer),
`narrate.py`, `vendor/` (GSAP, grain; three.js r170 + SVGLoader only for the experiment in `experiments/three/`).
