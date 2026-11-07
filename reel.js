// SaintStories runtime: turns data-* motion attributes into ONE paused, seekable GSAP timeline
// (registered as window.__timelines.main for HyperFrames). Deterministic: no clocks, no randomness.
(function () {
  const R = window.REEL || { total: 10, xf: 0.4 };
  const tl = gsap.timeline({ paused: true });
  const nums = (s) => String(s).trim().split(/\s+/).map(Number);
  const org = (el, ox = 0, oy = 0) => (el instanceof SVGElement ? { svgOrigin: `${ox} ${oy}` } : { transformOrigin: '50% 50%' });

  document.querySelectorAll('.scene').forEach((sc, si) => {
    // fx.loop: the last clip is a copy of scene 0 (data-loop) whose "zero" is the very end of the video, so its
    // motions are anchored exactly like scene 0's at t=0 and the end frame matches the first frame.
    const LOOP = sc.hasAttribute('data-loop');
    const Z = +(sc.dataset.zero ?? sc.dataset.start);  // scene "zero" (narration lead-in starts)
    const C = LOOP ? Z : +sc.dataset.start;           // clip start (crossfade begins); loop copy anchors on Z
    const D = +sc.dataset.duration;             // clip length
    const END = D + 1;
    const st = (ph) => (LOOP ? Z : Math.max(0, C - 0.8 - ph));
    const reps = (half) => Math.ceil((END + 1) / half) + 2;
    const each = (a, fn) => sc.querySelectorAll(`[${a}]`).forEach((el) => fn(el, nums(el.getAttribute(a))));

    each('data-bob', (el, [a = 2, p = 2.6, ph = 0]) =>
      tl.fromTo(el, { y: 0 }, { y: -a, duration: p / 2, ease: 'sine.inOut', yoyo: true, repeat: reps(p / 2) }, st(ph)));
    each('data-sway', (el, [d, p = 3, ph = 0, ox = 0, oy = 0]) =>
      tl.fromTo(el, { rotation: -d, ...org(el, ox, oy) }, { rotation: d, ...org(el, ox, oy), duration: p / 2, ease: 'sine.inOut', yoyo: true, repeat: reps(p / 2) }, st(ph)));
    each('data-spin', (el, [r, ox = 0, oy = 0]) =>
      tl.fromTo(el, { rotation: 0, ...org(el, ox, oy) }, { rotation: r * (END + 1), ...org(el, ox, oy), duration: END + 1, ease: 'none' }, st(0)));
    each('data-pulse', (el, [a, p = 2, ph = 0, ox = 0, oy = 0]) =>
      tl.fromTo(el, { scale: 1, ...org(el, ox, oy) }, { scale: 1 + a, ...org(el, ox, oy), duration: p / 2, ease: 'sine.inOut', yoyo: true, repeat: reps(p / 2) }, st(ph)));
    each('data-flick', (el, [p = 1.6, ph = 0, lo = 0.2]) =>
      tl.fromTo(el, { opacity: 1 }, { opacity: lo, duration: p / 2, ease: 'sine.inOut', yoyo: true, repeat: reps(p / 2) }, st(ph)));
    each('data-flap', (el, [p = 0.5, ph = 0]) =>
      tl.fromTo(el, { scaleY: 1, ...org(el) }, { scaleY: 0.2, ...org(el), duration: p / 2, ease: 'sine.inOut', yoyo: true, repeat: reps(p / 2) }, st(ph)));
    each('data-drift', (el, [dx = 0, dy = 0]) =>
      tl.fromTo(el, { x: 0, y: 0 }, { x: dx, y: dy, duration: D, ease: 'none' }, C));
    each('data-scroll', (el, [tile, p]) =>
      tl.fromTo(el, { x: 0 }, { x: -tile, duration: p, ease: 'none', repeat: reps(p) }, st(0)));
    each('data-in', (el, [, delay = 0, dur = 0.8, ox = 0, oy = 0]) => {
      const type = el.getAttribute('data-in').trim().split(/\s+/)[0];
      const o = org(el, ox, oy);
      const from = { fade: { opacity: 0 }, rise: { opacity: 0, y: 40 }, drop: { opacity: 0, y: -60 },
        pop: { opacity: 0, scale: 0.82, ...o }, grow: { scaleY: 0, ...o } }[type] || { opacity: 0 };
      const to = { fade: { opacity: 1 }, rise: { opacity: 1, y: 0 }, drop: { opacity: 1, y: 0 },
        pop: { opacity: 1, scale: 1, ...o }, grow: { scaleY: 1, ...o } }[type] || { opacity: 1 };
      tl.fromTo(el, from, { ...to, duration: dur, ease: type === 'pop' ? 'back.out(1.6)' : 'power3.out' }, Z + delay);
    });
    sc.querySelectorAll('[data-tw]').forEach((el) => {
      JSON.parse(el.getAttribute('data-tw')).forEach((s) => {
        const o = s.origin ? org(el, ...nums(s.origin)) : {};
        const to = { ...s.to, ...o, duration: s.dur ?? 1, ease: s.ease || 'power2.inOut' };
        if (s.from) tl.fromTo(el, { ...s.from, ...o }, to, Z + (s.at || 0));
        else tl.to(el, to, Z + (s.at || 0));
      });
    });
    each('data-blink', (el, [ph = 0, ox = 0, oy = 0]) => {
      for (let t = 0.6 + ph; t < END; t += 3.1 + ((t * 7.3) % 1.3)) {
        tl.to(el, { scaleY: 0.1, ...org(el, ox, oy), duration: 0.06, ease: 'none' }, C + t);
        tl.to(el, { scaleY: 1, ...org(el, ox, oy), duration: 0.09, ease: 'none' }, C + t + 0.06);
      }
    });
    each('data-talk', (el, [a = 0.3, b = 999, ox = 0, oy = 0]) => {
      const len = Math.min(b, D) - a, half = 0.11, r = Math.max(1, 2 * Math.floor(len / (2 * half)) - 1);
      tl.fromTo(el, { scaleY: 0.3, ...org(el, ox, oy) }, { scaleY: 1, ...org(el, ox, oy), duration: half, ease: 'sine.inOut', yoyo: true, repeat: r }, Z + a);
    });
    sc.querySelectorAll('.cam[data-cam]').forEach((el) => {
      const [ox = 540, oy = 1100, amt = 0.05] = nums(el.dataset.cam);
      tl.fromTo(el, { scale: 1, svgOrigin: `${ox} ${oy}` }, { scale: 1 + amt, svgOrigin: `${ox} ${oy}`, duration: D, ease: 'sine.inOut' }, C);
    });
    // camera moves: data-camv="move amt ox oy shift" (push|pull|pan-l|pan-r|tilt-up|tilt-down|drift-l|drift-r)
    // + parallax: every [data-depth] layer (0 far … 1 character plane … 1.5 foreground) moves (depth-1)× extra.
    sc.querySelectorAll('.cam[data-camv]').forEach((el) => {
      const [move, ...rest] = el.dataset.camv.trim().split(/\s+/);
      const [amt = 0.07, ox = 540, oy = 1150, shift = 0] = rest.map(Number);
      const s = 1 + amt, dx = 540 * amt * 0.85, dy = 960 * amt * 0.85, P = 0.7;
      const o = { svgOrigin: `${ox} ${oy}` }, lo = { svgOrigin: `${ox} ${oy - shift}` };
      const K = {   // [camera from, camera to, layer(k) from, layer(k) to]  (k = depth - 1)
        push:  [{ scale: 1 }, { scale: s }, (k) => ({ scale: 1 }), (k) => ({ scale: 1 + k * amt * P })],
        pull:  [{ scale: s }, { scale: 1 }, (k) => ({ scale: 1 + k * amt * P }), (k) => ({ scale: 1 })],
        'pan-l': [{ scale: s, x: -dx }, { scale: s, x: dx }, (k) => ({ x: -k * dx * P }), (k) => ({ x: k * dx * P })],
        'pan-r': [{ scale: s, x: dx }, { scale: s, x: -dx }, (k) => ({ x: k * dx * P }), (k) => ({ x: -k * dx * P })],
        'tilt-up': [{ scale: s, y: -dy }, { scale: s, y: dy }, (k) => ({ y: -k * dy * P }), (k) => ({ y: k * dy * P })],
        'tilt-down': [{ scale: s, y: dy }, { scale: s, y: -dy }, (k) => ({ y: k * dy * P }), (k) => ({ y: -k * dy * P })],
        'drift-l': [{ scale: 1 + amt * 0.4, x: -dx * 0.6 }, { scale: s, x: dx * 0.6 }, (k) => ({ x: -k * dx * 0.6 * P }), (k) => ({ x: k * dx * 0.6 * P })],
        'drift-r': [{ scale: 1 + amt * 0.4, x: dx * 0.6 }, { scale: s, x: -dx * 0.6 }, (k) => ({ x: k * dx * 0.6 * P }), (k) => ({ x: -k * dx * 0.6 * P })],
        // quick push that eases out and settles (hooks): same framing as push, most of the move in the first ~half
        'push-fast': [{ scale: 1 }, { scale: s }, (k) => ({ scale: 1 }), (k) => ({ scale: 1 + k * amt * P }), { ease: 'power3.out', f: 0.55 }],
        // dolly zoom (vertigo): the subject barely grows while the background looms in behind them
        dolly: [{ scale: 1 }, { scale: 1 + amt * 0.35 }, (k) => ({ scale: 1 }), (k) => ({ scale: 1 - k * amt * 2.6 })],
        // arc / orbit: a slow pan with a slight roll, like circling the character
        'arc-l': [{ scale: s, x: -dx, rotation: 0.9 }, { scale: s, x: dx, rotation: -0.9 }, (k) => ({ x: -k * dx * P }), (k) => ({ x: k * dx * P })],
        'arc-r': [{ scale: s, x: dx, rotation: -0.9 }, { scale: s, x: -dx, rotation: 0.9 }, (k) => ({ x: k * dx * P }), (k) => ({ x: -k * dx * P })],
      }[move] || null;
      if (!K) return;
      const opt = K[4] || {}, span = { duration: (D + 0.8) * (opt.f || 1), ease: opt.ease || 'sine.inOut' }, at = LOOP ? Z : Math.max(0, C - 0.4);
      tl.fromTo(el, { ...K[0], ...o }, { ...K[1], ...o, ...span }, at);
      el.querySelectorAll('[data-depth]').forEach((ly) => {
        const k = +ly.dataset.depth - 1;
        if (!k) return;
        tl.fromTo(ly, { ...K[2](k), ...lo }, { ...K[3](k), ...lo, ...span }, at);
      });
    });
    // rack focus: data-rack="at dur blur" on .cam; layers farther than depth 0.9 blur from 0 to `blur` (scene-own filter)
    sc.querySelectorAll('.cam[data-rack]').forEach((el) => {
      const [at = 1, dur = 2, b = 6] = nums(el.dataset.rack);
      const f = sc.querySelector('filter.rack'), fe = f && f.querySelector('feGaussianBlur');
      if (!fe) return;
      el.querySelectorAll('[data-depth]').forEach((ly) => { if (+ly.dataset.depth < 0.9) ly.setAttribute('filter', `url(#${f.id})`); });
      tl.fromTo(fe, { attr: { stdDeviation: 0 } }, { attr: { stdDeviation: b }, duration: dur, ease: 'sine.inOut' }, Z + at);
    });
    // fx.handheld: three slow, out-of-step sine loops (x, y, roll) read as a gentle hand-held camera
    sc.querySelectorAll('.hh[data-hh]').forEach((el) => {
      const a = +el.dataset.hh || 1, o = { svgOrigin: '540 1000' }, n = (p) => Math.ceil((END + 2) / p) + 1;
      tl.fromTo(el, { x: -5 * a }, { x: 5 * a, duration: 2.65, ease: 'sine.inOut', yoyo: true, repeat: n(2.65) }, st(0.3));
      tl.fromTo(el, { y: -3.5 * a }, { y: 3.5 * a, duration: 2.05, ease: 'sine.inOut', yoyo: true, repeat: n(2.05) }, st(1.1));
      tl.fromTo(el, { rotation: -0.3 * a, ...o }, { rotation: 0.3 * a, ...o, duration: 3.35, ease: 'sine.inOut', yoyo: true, repeat: n(3.35) }, st(0.7));
    });
    const C0 = +sc.dataset.start;   // real clip start (the loop copy fades in before its zero)
    // (the loop copy is fully in 0.1 s before the end, so the very last frames already equal the first frame)
    if (si > 0 && C0 < Z) tl.fromTo(sc, { opacity: 0 }, { opacity: 1, duration: Z - C0 - (LOOP ? 0.1 : 0), ease: LOOP ? 'sine.inOut' : 'none' }, C0);
  });

  // captions: pill pops in, current word turns gold
  document.querySelectorAll('.cap').forEach((c) => {
    const s = +c.dataset.start;
    tl.fromTo(c.querySelector('.pill'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' }, s);
    c.querySelectorAll('.w').forEach((w) => {
      tl.fromTo(w, { color: '#ffffff' }, { color: '#ffd27a', duration: 0.06, ease: 'none' }, +w.dataset.t);
      tl.to(w, { color: '#ffffff', duration: 0.1, ease: 'none' }, +w.dataset.u);
    });
  });
  document.querySelectorAll('.wm').forEach((w) => {
    const s = +w.dataset.start, d = +w.dataset.duration;
    tl.fromTo(w, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, s);
    tl.to(w, { opacity: 0, duration: 0.4, ease: 'none' }, s + d - 0.4);
  });
  document.querySelectorAll('.endcard').forEach((e) => {
    tl.fromTo(e, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, +e.dataset.start);
    if (e.dataset.fo) tl.to(e, { opacity: 0, duration: 0.35, ease: 'power1.in' }, +e.dataset.start + +e.dataset.duration - 0.35);
  });
  // fx.leak: golden light-leak over a scene change (peaks at data-leak, drifts sideways)
  document.querySelectorAll('.leak[data-leak]').forEach((e) => {
    const p = +e.dataset.leak;
    tl.fromTo(e, { opacity: 0, x: -60 }, { opacity: 0.7, x: 0, duration: 0.45, ease: 'power2.out' }, p - 0.45);
    tl.to(e, { opacity: 0, x: 60, duration: 0.8, ease: 'power1.in' }, p);
  });
  // fx.grain: the grain jumps to a new (deterministic) offset 12 times a second, like real film
  document.querySelectorAll('.grain[data-jit]').forEach((g) => {
    const step = 1 / (+g.dataset.jit || 12);
    for (let k = 0, t = 0; t < R.total; k++, t += step) {
      const x = Math.round(((k * 7919) % 541)), y = Math.round(((k * 104729) % 961));
      tl.set(g, { backgroundPosition: `${x}px ${y}px` }, t);
    }
  });
  const fi = document.getElementById('fadein'), fo = document.getElementById('fadeout');
  if (fi) tl.fromTo(fi, { opacity: 1 }, { opacity: 0, duration: 0.35, ease: 'none' }, 0);
  if (fo) tl.fromTo(fo, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none' }, R.total - 0.5);
  if (R.seek != null) tl.seek(R.seek);  // thumbnails
  tl.set({}, {}, R.total);
  window.__timelines = window.__timelines || {};
  window.__timelines.main = tl;
})();
