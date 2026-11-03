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

`stories/calungsod.mjs` is the reference story. Files: `art.mjs` (rig, props, set pieces, motion
helpers), `reel.js` (runtime), `build.mjs` (composition + CLI), `narrate.py`, `vendor/` (GSAP, grain).
