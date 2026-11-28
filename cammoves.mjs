// cammoves.mjs: named camera moves for cam.path, framed by SHOT SIZE from the subject (2026-11-28, from the measured Ricks Clips
// camera grammar in the user's breakdown: one camera per take, a move about every 2 s that lands ON the narration word, each
// move ~0.6-1.3 s with its speed peak at ~40 %, never fully still between moves: it creeps). Every helper returns one cam.path
// key { at, to, depth, z, frame, dur, drift }; `dur` switches makeRig to hold-and-move (the camera travels only in the last
// `dur` seconds before `at`), `drift` creeps it forward while it holds. Mix: push-in ~1/2, pull-back reveal ~1/4, crane ~1/8,
// truck ~1/8. Translation only (our characters are flat cards): no orbit, roll, drone or FPV.
//
//   import { shot, push, pull, crane, truck, follow, spot } from '../cammoves.mjs';
//   cam: { ...GLIDE, path: [ shot(0, S0, 'MS'), push(at(0, 'silent'), IDOL, 'MCU'), pull(at(0, 'This is'), S0, 'MS') ] }
//
// Subject P: [x, feetY, s] (a character, as the story constants) or { x, y, s, kneel, depth } or { at: [x, y], r, depth }
// for an object (r = its radius in art px). Sizes = the subject's head radius on screen (chibi heads are big):
//   CU 210 px (face fills the middle), MCU 160, MS 118, FS whole figure (feet above the caption pill), WS a little wider.
// Placement o.place: 'c' (default), 'l', 'r' (thirds, kept clear of the right-edge buttons) or o.frame [sx, sy] to override.
const R = { CU: 210, MCU: 160, MS: 118 };
const PLACE = { c: 540, l: 430, r: 640 };
const norm = (P) => (Array.isArray(P) ? { x: P[0], y: P[1], s: P[2], depth: 1 } : { depth: 1, ...P });

/** A framing of subject P at size on time `at` (seconds in the scene). Holds with a creep until the next key. */
export function shot(at, P, size = 'MS', o = {}) {
  const p = norm(P), depth = o.depth ?? p.depth ?? 1;
  let to, z, fy;
  if (p.at) {   // object: [x, y] with radius r
    to = p.at; const r = p.r || 80;
    z = (R[size] || 118) / r; fy = 860;
  } else {
    const hy = p.y - (p.kneel ? 168 : 252) * p.s, r0 = 40 * p.s;
    to = [p.x, Math.round(hy)];
    if (R[size]) { z = R[size] / r0; fy = size === 'CU' ? 800 : size === 'MCU' ? 790 : 760; }
    else { z = size === 'WS' ? 0.98 : 1.04; fy = Math.min(800, Math.round(1380 - (p.kneel ? 168 : 252) * p.s * z)); }   // feet above the pill
  }
  z = Math.max(0.95, Math.min(2.2, z * (o.zMul || 1)));
  const fx = o.frame?.[0] ?? PLACE[o.place || 'c'], fyy = o.frame?.[1] ?? fy;
  return { at: Math.max(0, at), to, depth, z: Math.round(z * 100) / 100, frame: [fx, fyy], dur: o.dur ?? (at > 0 ? 1.3 : undefined), drift: o.drift ?? 0.6 };
}
/** Push-in onto P (the default move): lands on the word at `at`. */
export const push = (at, P, size = 'MCU', o = {}) => shot(at, P, size, { dur: 1.3, ...o });
/** Pull-back reveal: wider on P (often the next subject), a touch longer. */
export const pull = (at, P, size = 'FS', o = {}) => shot(at, P, size, { dur: 1.5, ...o });
/** Crane: arrive with the subject low ('up': camera rises, looks over them) or high ('down') in frame. */
export const crane = (at, P, size = 'MS', dir = 'up', o = {}) => { const k = shot(at, P, size, { dur: 1.5, ...o }); k.frame = [k.frame[0], k.frame[1] + (dir === 'up' ? 130 : -110)]; return k; };
/** Truck: slide sideways so P arrives on the left or right third. */
export const truck = (at, P, size = 'MS', side = 'l', o = {}) => shot(at, P, size, { dur: 1.4, place: side, ...o });
/** Follow a travelling subject from Pa (at t0) to Pb (at t1): two keys, the second travels the whole time. */
export const follow = (t0, t1, Pa, Pb, size = 'MS', o = {}) => [shot(t0, Pa, size, { ...o }), shot(t1, Pb, size, { dur: Math.max(0.3, t1 - t0), ...o })];
/** A spot (object or place) at art [x, y] on the card at depth, size given as its radius in px. */
export const spot = (at, xy, r = 80, size = 'MS', o = {}) => shot(at, { at: xy, r, depth: o.depth ?? 1 }, size, o);
