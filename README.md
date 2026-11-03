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
node build.mjs stories/<x>.mjs thumb            # reel cover + square grid crop
```

## Camera moves and parallax

Each scene can set `cam`:

- `[ox, oy, amt]` — legacy slow push-in (the default when `cam` is omitted).
- `'push'`, `'pull'`, `'pan-l'`, `'pan-r'`, `'tilt-up'`, `'tilt-down'`, `'drift-l'`, `'drift-r'`, or
  `{ move, amt = 0.07, ox = 540, oy = 1150 }` for control. Keep `amt` around 0.05–0.09.

Suggested moves by scene role: hook/decision → push; reveal/canonization → pull; journeys → pan;
visions/death → tilt-up; quiet character beats → drift.

Wrap parts of a scene in depth layers so camera moves create parallax: `FAR(sky…)`, `BACK(hills…)`,
`MID(set…)`, characters unwrapped (depth 1), `NEAR(foliage…)`, or `layer(depth, svg)` for a custom depth.
Layers only move during the new moves, so stories without them render exactly as before.
`stories/kolbe.mjs` is the first story that uses both.

`stories/calungsod.mjs` is the reference story. Files: `art.mjs` (rig, props, set pieces, motion
helpers), `reel.js` (runtime), `build.mjs` (composition + CLI), `narrate.py`, `vendor/` (GSAP, grain).
