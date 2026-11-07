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
node build.mjs stories/<x>.mjs render --workers 2
node build.mjs stories/<x>.mjs thumb            # vertical reel/Shorts cover (square crop: thumb_square: true)
```

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

`stories/calungsod.mjs` is the reference story. Files: `art.mjs` (rig, props, set pieces, motion
helpers), `reel.js` (runtime), `build.mjs` (composition + CLI), `narrate.py`, `vendor/` (GSAP, grain).
