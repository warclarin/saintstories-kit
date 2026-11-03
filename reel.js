// SaintStories runtime: turns data-* motion attributes into ONE paused, seekable GSAP timeline
// (registered as window.__timelines.main for HyperFrames). Deterministic: no clocks, no randomness.
(function () {
  const R = window.REEL || { total: 10, xf: 0.4 };
  const tl = gsap.timeline({ paused: true });
  const nums = (s) => String(s).trim().split(/\s+/).map(Number);
  const org = (el, ox = 0, oy = 0) => (el instanceof SVGElement ? { svgOrigin: `${ox} ${oy}` } : { transformOrigin: '50% 50%' });

  document.querySelectorAll('.scene').forEach((sc, si) => {
    const C = +sc.dataset.start;               // clip start (crossfade begins)
    const Z = +(sc.dataset.zero ?? C);          // scene "zero" (narration lead-in starts)
    const D = +sc.dataset.duration;             // clip length
    const END = D + 1;
    const st = (ph) => Math.max(0, C - 0.8 - ph);
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
    if (si > 0 && C < Z) tl.fromTo(sc, { opacity: 0 }, { opacity: 1, duration: Z - C, ease: 'none' }, C);
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
  document.querySelectorAll('.endcard').forEach((e) =>
    tl.fromTo(e, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, +e.dataset.start));
  const fi = document.getElementById('fadein'), fo = document.getElementById('fadeout');
  if (fi) tl.fromTo(fi, { opacity: 1 }, { opacity: 0, duration: 0.35, ease: 'none' }, 0);
  if (fo) tl.fromTo(fo, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'none' }, R.total - 0.5);
  if (R.seek != null) tl.seek(R.seek);  // thumbnails
  tl.set({}, {}, R.total);
  window.__timelines = window.__timelines || {};
  window.__timelines.main = tl;
})();
