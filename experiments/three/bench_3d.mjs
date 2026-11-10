// BENCHMARK ONLY (not for commit). 6 scenes (~36 s) from the Francis 3D test, rendered four ways:
//   BENCH=svg NO3D=1  all SVG (today's pipeline)          BENCH=bg3d   three.js background + SVG characters
//   BENCH=vec         everything three.js, vector meshes  BENCH=sprite everything three.js, rasterized cut-out sprites
import { STORY as T } from './francis_3dtest.mjs';

const MODE = process.env.BENCH || 'svg';
const cams = [{ move: 'push-fast', amt: 0.06, oy: 760 }, 'pan-r', 'push', 'pan-l', 'pull', 'pan-r'];
const scenes = cams.map((cam, i) => {
  const s = T.scenes[i % 2];
  return { ...s, cam, kicker: s.kicker, title: s.title, say: [`Benchmark scene ${i + 1}, line one for the captions.`, 'And a second line here.'] };
});

export const STORY = {
  slug: `bench_${MODE}`, name: `BENCH_${MODE}`,
  fx: { handheld: true, leak: true, loop: true },
  wm_spots: T.wm_spots,
  bg3d: MODE === 'svg' ? undefined : MODE === 'bg3d' ? './francis_3dtest.bg3d.js' : './bench_full.js',
  bg3d_extra: MODE === 'vec' || MODE === 'sprite' ? { 'bgbuild.js': './francis_3dtest.bg3d.js', 'svg2three.js': './svg2three.js', 'SVGLoader.js': '../../vendor/SVGLoader.js' } : undefined,
  bg3d_vars: { mode: MODE },
  scenes,
};
