// The first Advent wreath: Johann Hinrich Wichern's candle wheel at the Rauhes Haus, Hamburg, 1839 (one story).
// ALL-3D reel (user's request 2026-11-28, this reel only): characters, sets and camera are three.js
// (advent_wreath.bg3d.js: cel-shaded chibi figures + sets betsaal(mode), farm(), home(mode)); the SVG art is empty, so only
// titles, captions, watermark and finishing effects are 2D. The 3D camera moves freely (orbit, crane, low/high angles).
// Word times reach the 3D file through bg3d_vars.T.
// Sources: Hamburg Tourism / Stiftung Historische Museen Hamburg "Der Adventskranz: vier Kerzen erobern die Welt" (Betsaal of
// the Rauhes Haus, Hamburg-Horn, 1839; wooden wheel the size of a wagon wheel; one candle per day, red weekdays, white Sundays;
// fir and white ribbons from 1860; four candles for living rooms); evangelisch.de 27.11.2020 (children from Hamburg's slums
// kept asking when Christmas would finally come; wooden wagon wheel; to teach them to count; fir greenery from about 1860;
// first Catholic church Cologne 1925; red/white colours not attested in the archive); Wikipedia "Johann Hinrich Wichern".
import { wordTimes } from '../hd.mjs';

const SLUG = 'advent_wreath_wichern';
const at = wordTimes(SLUG);

// anchor times (s from scene start) for the 3D file
const T = {
  0: { wheel: at(0, 'wagon wheel'), candles: at(0, '24 candles'), this: at(0, 'This is') },
  1: { name: at(1, 'Wichern'), took: at(1, 'took in'), slums: at(1, 'slums') },
  2: { asked: at(2, 'asked him'), when: at(2, 'when is'), needed: at(2, 'Wichern needed'), see: at(2, 'could see') },
  3: { wheel: at(3, 'wagon wheel'), fixed: at(3, 'fixed one'), big: at(3, 'Big ones'), small: at(3, 'small ones') },
  4: { looked: at(4, 'looked up'), one: at(4, 'One flame') },
  5: { each: at(5, 'Each day'), dark: at(5, 'dark room'), bright: at(5, 'brighter') },
  6: { fir: at(6, 'fir branches'), wheel: at(6, 'the wheel') },
  7: { homes: at(7, 'homes'), four: at(7, 'four candles'), one: at(7, 'One flame'), light: at(7, 'became light') },
  8: { answer: at(8, 'an answer'), flame: at(8, 'every new'), closer: at(8, 'closer'), advent: at(8, 'it all began') },
};

const scene = (i) => () => '';   // no SVG: everything is drawn in 3D
const HOOK = { speed: 1.1, gap: 0.18, gain: 1 };
const MIDT = { speed: 1.0, gap: 0.26, gain: 0, voice: { am_michael: 0.85, am_onyx: 0.15 } };
const GLOW = { speed: 0.92, gap: 0.3, gain: -0.5 };
const CAM = { move: 'push', amt: 0.002 };

export const STORY = {
  slug: SLUG, name: 'Advent_Wreath_Wichern',
  bg3d: './advent_wreath.bg3d.js',
  bg3d_extra: { 'bakhita.bg3d.js': './bakhita_freedom.bg3d.js' },
  bg3d_vars: { T },
  voice: 'am_michael', speed: 0.95, flow: true, capChars: 24,
  fx: { handheld: false, leak: true, loop: true },
  video: { bitrate: 14e6, mode: 'constant' },
  music: { story: 'a pastor lights one more candle each day on a wooden wheel for poor children waiting for Christmas, Hamburg 1839',
    color: 'music box, celesta, warm strings, soft German chorale on organ, gentle sleigh-bell shimmer', cues: { 0: 'glowing music box and celesta opening, gentle, no drum hit', 1: 'warm', 2: 'warm', 3: 'warm and steady, light pizzicato', 4: 'hushed wonder', 5: 'rising, hopeful, the biggest swell', 6: 'warm glow', 7: 'tender, full and glowing', 8: 'calm, fading to the opening' } },
  thumb_hook: '24 candles on a wagon wheel', thumb_title: 'The First Advent Wreath', thumb_scene: 0, thumb_t: 3, thumb_shift: 0,
  wm_spots: [[56, 560, 'l'], [1024, 640, 'r'], [56, 1250, 'l']],
  waive: [{ from: 0, to: 999, rules: ['camera', 'faces', 'still'], why: 'all-3D reel: the camera and characters live in three.js, not cam.path/hd()' }],
  fix: { 'wˈɪtʃɚn': 'vˈɪʃɚn', 'hˈɪnɹɪtʃ': 'hˈɪnɹɪk' },   // Wichern -> VISH-ern, Hinrich -> HIN-rik
  scenes: [
    { kicker: 'HAMBURG · 1839', title: 'A Wheel of 24 Candles', art: scene(0), bg3d: 'hook', cam: CAM, tone: HOOK,
      say: ['A Hamburg pastor hung a wooden wagon wheel from the ceiling, with 24 candles on it.', 'This is how the Advent wreath began.'] },
    { kicker: 'THE RAUHES HAUS · HAMBURG', title: 'A Home for Poor Children', art: scene(1), bg3d: 'farm', cam: CAM, tone: HOOK,
      say: ['Johann Hinrich Wichern, a young Lutheran pastor, took in poor and orphaned children from Hamburg\'s slums.'] },
    { kicker: 'EVERY DECEMBER', title: '"When Is Christmas?"', art: scene(2), bg3d: 'ask', cam: CAM, tone: MIDT,
      say: ['Every December they asked him the same question: when is Christmas?', 'Wichern needed an answer they could see.'] },
    { kicker: 'ONE CANDLE A DAY', title: 'A Candle for Every Day', art: scene(3), bg3d: 'build', cam: CAM, tone: MIDT,
      say: ['So he took an old wagon wheel and fixed one candle for every day until Christmas.', 'Big ones for Sundays, small ones in between.'] },
    { kicker: 'FIRST SUNDAY OF ADVENT', title: 'The First Light', art: scene(4), bg3d: 'first', cam: CAM, tone: GLOW,
      say: ['On the first Sunday of Advent, the children looked up.', 'One flame was burning.'] },
    { kicker: 'DAY BY DAY', title: 'Brighter Every Day', art: scene(5), bg3d: 'grow', cam: CAM, tone: GLOW,
      say: ['Each day, they lit one more.', { text: 'And the dark room grew brighter, day by day.', speed: 0.85 }] },
    { kicker: 'FROM 1860', title: 'Fir on the Wheel', art: scene(6), bg3d: 'fir', cam: CAM, tone: GLOW,
      say: ['Years later, fir branches wrapped the wheel,'] },
    { kicker: 'THE WREATH TODAY', title: 'Four Candles', art: scene(7), bg3d: 'home', cam: CAM, tone: { speed: 0.95, gap: 0.32, gain: -0.5 },
      say: ['and homes made it smaller: four candles, one for each Sunday.', 'One flame at a time, the waiting became light.'] },
    { kicker: 'ADVENT TODAY', title: 'Every Flame Says Closer', art: scene(8), bg3d: 'last', cam: CAM, tone: { speed: 0.9, gap: 0.34, gain: -0.5 },
      say: ['The children\'s question finally had an answer: every new flame said, closer.', 'And it all began in one small prayer hall, where'] },
  ],
};
