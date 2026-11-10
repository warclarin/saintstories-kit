# Experiments (not used by any reel)

Kept for reference so the tests can be re-run. Nothing here is needed to make a reel.

## Render benchmarks (2026-11-10, 24-core laptop, RTX 5060, 16 GB)

36 s, 6-scene St. Francis bench (`three/bench_3d.mjs`), HyperFrames `render`, 10 workers, `--browser-gpu`,
interleaved rounds (`bench_round.sh`; raw numbers in `bench_results.tsv`). The machine's own load (a busy desktop
Chrome) swung single runs from 45 s to 83 s, so always compare variants within the same round.

| Variant | Time | Look |
|---|---|---|
| All SVG (today's reels) | 45–46 s | reference |
| three.js 3D background + SVG characters | 47–49 s | 3D background |
| Everything three.js, vector characters (`three/svg2three.js`, mode `vec`) | 49–53 s | SSIM 0.993 |
| Everything three.js, rasterized sprite characters (mode `sprite`) | 71–80 s | SSIM 0.998 |
| HyperFrames `--experimental-fast-capture=true` | 59–60 s | encode grows to ~20 s |
| `fast` (fastrender.mjs), SVG art unchanged | 17.6 s | matches |
| `fast` with three.js art | 11.5 s | matches |

HyperFrames trace: capture 33 s, encode 3.7 s of a 45 s render, so drawing faster can't speed `render` up;
skipping the screenshots (`fast`) does. `--browser-gpu` alone: ~17% faster than SwiftShader (10 s clip:
22 s vs 27 s), same frames. Full reels with `fast`: St. Jude 78 s in ~45 s (vs ~96 s), Calungsod 63 s in 38 s
(vs 88 s). Extra pages (`--pages 4`) gave nothing: the GPU encoder is the limit (~100+ fps).

## three.js (`three/`)

- `francis_3dtest.mjs` + `francis_3dtest.bg3d.js`: 2-scene St. Francis clip, 2D SVG characters over three.js
  backgrounds (dusk hill town with a dolly forward, sunny countryside with a truck right). Uses the opt-in
  `STORY.bg3d` hook in build.mjs (a canvas behind each scene's SVG, drawn from HyperFrames' `hf-seek` event).
  `NO3D=1` builds the same clip with SVG backgrounds.
  `node build.mjs experiments/three/francis_3dtest.mjs say` → narrate → `fast` / `render`.
- `svg2three.js` + `bench_full.js`: draws a scene's whole SVG art with three.js (hidden SVG keeps GSAP driving
  every motion; animated groups are mirrored onto three.js objects each frame). `vec` = SVGLoader meshes,
  gradients as textures, blurred parts rasterized; `sprite` = static parts rasterized once (cut-out puppet).
- `bench_3d.mjs`: the 6-scene benchmark, `BENCH=svg|bg3d|vec|sprite` (`svg` also needs `NO3D=1`). It needs
  `work/bench_<mode>/timings.json` + `narration.wav` (synthetic: 6 × 5 s, silence).

Verdict: three.js works and can match the look, but it isn't cheaper than SVG (characters +10–60%), so reels
stay SVG; a 3D background costs ~5% if a reel ever wants one.
