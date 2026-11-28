// Opt-in 16:9 landscape format (2026-11-23, first used for the St. Carlo Acutis long-form YouTube video).
// Import this FIRST in a story file, before ../art.mjs or any other story module, and set STORY.format = 'landscape':
//   import '../landscape.mjs';
//   import { W, H, ... } from '../art.mjs';
// art.mjs then exports W = 1920, H = 1080 (art coordinates are 1920x1080), and build.mjs, reel.js, fastrender.mjs and the
// 3D rig (bakhita.bg3d.js) read the size from the page (#root data-width / data-height). Every story without it stays
// 1080x1920 portrait and renders exactly as before.
globalThis.SAINT_FORMAT = 'landscape';
