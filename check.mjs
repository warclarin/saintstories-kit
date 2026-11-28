// check.mjs: automated checks for a built reel (2026-11-28, "every mistake becomes a rule, every rule gets a check").
// Run through `node build.mjs <story.mjs> check [--step 0.2]`. Opens work/<slug>/index.html in headless Chrome (playwright,
// as fastrender.mjs), seeks the timeline every `step` seconds and tests what the eye used to catch on contact sheets:
//   faces   every hd() face (the invisible circle.hdface marker) that is visible: cut by the frame edge, under the title band
//           (y < 320), under the caption pill (y 1464-1556 while a caption shows), in the right-edge button zone (x > 900,
//           y > 900), under the watermark, or covered by something drawn over it (another character, a prop, the set).
//   change  the longest stretch in each scene with no new event (tweens other than loops, captions and watermark; camera
//           keys; cuts): fails over 4 s.
//   camera  how much of the reel the camera is still / drifts / moves (character-plane transform, % of frame width per second),
//           how many moves and how long the holds; measured Ricks Clips reference: moving ~77 %, still ~3 %, a move every
//           ~2.2 s, holds ~0.4 s (references from the user's breakdown, 2026-11-28).
//   mp4     with the final MP4 present: duration, smallest video packet (starved frames), peak level.
// Prints a short report (issues grouped into time ranges) and writes work/<slug>/check.txt. Exit code 1 when anything fails.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync, execFileSync } from 'child_process';
import { createRequire } from 'module';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.mp3': 'audio/mpeg' };

export async function runCheck({ dir, total, starts, titles = [], step = 0.2, mp4 = null, warnings = [], waive = [], chrome = process.env.HYPERFRAMES_BROWSER_PATH }) {
  const require = createRequire(import.meta.url);
  let pw; try { pw = require('playwright'); } catch { pw = require(execSync('npm root -g').toString().trim() + '/playwright'); }
  const srv = http.createServer((q, s) => {
    const p = path.join(dir, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
    if (!p.startsWith(path.resolve(dir))) { s.writeHead(403); s.end(); return; }
    fs.readFile(p, (e, b) => { if (e) { s.writeHead(404); s.end(); return; } s.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' }); s.end(b); });
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${srv.address().port}/index.html`;
  const browser = await pw.chromium.launch({ ...(chrome ? { executablePath: chrome } : {}), headless: true,
    args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const lines = [], fails = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(url);
    await page.waitForFunction(() => !!window.__timelines?.main, null, { polling: 200, timeout: 60000 });
    const res = await page.evaluate(pageCheck, { total, step });
    if (errs.length) lines.push(`page errors: ${errs.slice(0, 3).join(' | ')}`);
    const sceneOf = (t) => { let k = 0; while (k + 1 < starts.length && t >= starts[k + 1]) k++; return k; };

    // ---- faces: group per (rule, face) into time ranges, keep ranges >= 2 samples
    const groups = new Map();
    for (const it of res.faces) {
      const key = `${it.rule}|${it.id}`;
      const g = groups.get(key);
      if (g && it.t - g.t1 <= step * 1.6) { g.t1 = it.t; g.n++; g.note = g.note || it.note; } else {
        if (g) flush(g);
        groups.set(key, { ...it, t0: it.t, t1: it.t, n: 1 });
      }
    }
    // STORY.waive = [{ from, to, rules: ['covered', ...], why }]: accepted exceptions (a walk-past, an exit), listed in the report
    function waived(g) { return waive.find((w) => g.t0 >= w.from - 0.05 && g.t1 <= w.to + 0.05 && (!w.rules || w.rules.includes(g.rule))); }
    function flush(g) { if (g.n < 2) return; const w = waived(g); if (w) { lines.push(`waived ${g.rule} ${g.t0.toFixed(1)}-${g.t1.toFixed(1)} s: ${w.why}`); return; } fails.push(`face  ${g.rule.padEnd(9)} scene ${sceneOf(g.t0)} ${g.t0.toFixed(1)}-${g.t1.toFixed(1)} s  face at (${g.x}, ${g.y})${g.note ? '  ' + g.note : ''}`); }
    for (const g of groups.values()) flush(g);

    // ---- change: longest gap per scene
    const ev = [...new Set([...res.events, ...starts].map((t) => Math.round(t * 10) / 10))].sort((a, b) => a - b);
    starts.forEach((s0, k) => {
      const s1 = k + 1 < starts.length ? starts[k + 1] : total, e = [s0, ...ev.filter((t) => t > s0 && t < s1), s1];
      let gap = 0, at = s0; for (let i = 1; i < e.length; i++) if (e[i] - e[i - 1] > gap) { gap = e[i] - e[i - 1]; at = e[i - 1]; }
      const msg = `change scene ${k} longest gap ${gap.toFixed(1)} s (from ${at.toFixed(1)} s)`;
      if (gap > 4) fails.push(msg); else lines.push(msg);
    });

    // ---- camera
    const c = res.cam, n = c.rest + c.drift + c.move || 1, P = (k) => Math.round(100 * k / n);
    const runs = [...c.runs, [c.state, c.len]], holds = runs.filter(([s, l]) => s === 's' && l > 0).map(([, l]) => l).sort((a, b) => a - b);
    const moves = runs.filter(([s, l]) => s === 'm' && l >= 0.2).length, med = holds.length ? holds[holds.length >> 1] : 0;
    lines.push(`camera still ${P(c.rest)} %, drift ${P(c.drift)} %, moving ${P(c.move)} % (fast ${P(c.fast)} %), ${moves} moves (one per ${(total / Math.max(1, moves)).toFixed(1)} s), median still hold ${med.toFixed(1)} s, top ${Math.round(100 * c.top / 1080)} %/s at ${c.topAt.toFixed(1)} s`);
    lines.push('  measured reference (Ricks Clips): moving ~77 %, any drift ~97 % (still ~3 %), a move every ~2.2 s, holds ~0.4 s');
    if (P(c.rest) > 25) fails.push(`camera still ${P(c.rest)} % of the time (reference ~3 %): hold with a creep (key drift) instead of stopping`);
    if (P(c.move) < 35) fails.push(`camera moving only ${P(c.move)} % (reference ~77 %, floor 35 %): more subject-to-subject moves on the words`);
    if (total / Math.max(1, moves) > 4) fails.push(`only ${moves} camera moves (one per ${(total / Math.max(1, moves)).toFixed(1)} s; reference one per ~2.2 s)`);
  } finally { await browser.close(); srv.close(); }

  for (const w of warnings) fails.push(`build ${w}`);
  if (mp4 && fs.existsSync(mp4)) {
    const q = (a) => execFileSync('ffprobe', ['-v', 'error', ...a, mp4]).toString().trim();
    const dur = +q(['-show_entries', 'format=duration', '-of', 'csv=p=0']);
    const sizes = q(['-select_streams', 'v:0', '-show_entries', 'packet=size', '-of', 'csv=p=0']).split(/\s+/).map(Number).sort((a, b) => a - b);
    let peak = '?'; try { const o = execSync(`ffmpeg -i "${mp4}" -af volumedetect -f null - 2>&1`).toString(); peak = o.match(/max_volume: (-?[\d.]+)/)?.[1] ?? '?'; } catch {}
    let lufs = '?'; try { const o = execSync(`ffmpeg -i "${mp4}" -af ebur128 -f null - 2>&1`).toString(); lufs = [...o.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].pop()?.[1] ?? '?'; } catch {}
    const msg = `mp4 ${dur.toFixed(1)} s, smallest frame ${sizes[0]} B, peak ${peak} dB, loudness ${lufs} LUFS (reference master -14)`;
    if (sizes[0] < 1000) fails.push(`${msg} (starved frame: re-render with render)`); else lines.push(msg);
    if (dur > 90.5) fails.push(`mp4 longer than 1:30 (${dur.toFixed(1)} s)`);
  }
  const report = [`CHECK ${fails.length ? 'FAIL' : 'PASS'} (${fails.length} issue${fails.length === 1 ? '' : 's'})`, ...fails.map((f) => '  x ' + f), ...lines.map((l) => '  - ' + l)].join('\n');
  fs.writeFileSync(path.join(dir, 'check.txt'), report + '\n');
  return { ok: !fails.length, report };
}

// ------------------------------------------------------------------ in the page
async function pageCheck({ total, step }) {
  const tl = window.__timelines.main;
  const bR = window.__hf?.buildReady; if (bR) await Promise.all(Object.values(bR));
  await document.fonts.ready;
  await new Promise((r) => setTimeout(r, 800));
  const clipOf = (el) => el.closest('.clip');
  const active = (el, T) => { const c = clipOf(el); if (!c) return true; const s = +c.dataset.start || 0, d = +c.dataset.duration || 1e9; return T >= s && T < s + d; };
  const vis = (el) => { let a = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; a *= parseFloat(cs.opacity); if (a < 0.02) return 0; } return a; };
  const SVGNS = 'http://www.w3.org/2000/svg';
  const skipHit = (el) => el.namespaceURI !== SVGNS || el.closest('.cap, .t, .wm, .grain, .vig, .leak, .endcard') || /url\(#(sunGlow|haloGlow|beam)/.test(el.getAttribute('fill') || '') || el.tagName === 'svg';
  // events: every tween start that is not a loop and not caption/watermark/title animation, plus camera keys
  const events = [];
  const walk = (a, off) => { for (const ch of a.getChildren(false, true, true)) { const s = off + ch.startTime();
    if (ch.getChildren) { walk(ch, s); continue; }
    if (ch.repeat && ch.repeat() === -1) continue;
    const tg = ch.targets?.()[0]; if (tg && tg.nodeType === 1 && tg.closest('.cap, .t, .wm, .grain, .vig, .endcard, .leak')) continue;
    if (tg && tg.nodeType === 1 && tg.classList.contains('clip')) continue;
    events.push(s); } };
  walk(tl, 0);
  document.querySelectorAll('.clip.scene').forEach((sc) => { const s0 = +sc.dataset.start || 0;
    sc.querySelectorAll('.cam[data-path]').forEach((c) => JSON.parse(c.dataset.path).forEach((k) => { if (k.at > 0.01) events.push(s0 + k.at - (k.dur || 0)); }));
    sc.querySelectorAll('[data-zoom]').forEach((z) => { try { [].concat(JSON.parse(z.dataset.zoom)).forEach((q) => events.push(s0 + (+q.at || 0))); } catch {} }); });

  let camMoving = false;
  const last = new Map(), faces = [], cam = { rest: 0, drift: 0, move: 0, fast: 0, top: 0, topAt: 0, runs: [], state: '', len: 0 };
  let prev = null;
  const wmBox = (T) => { for (const w of document.querySelectorAll('.wm')) if (active(w, T) && vis(w) > 0.2) return w.getBoundingClientRect(); return null; };
  const capOn = (T) => [...document.querySelectorAll('.cap')].some((c) => active(c, T) && vis(c) > 0.2);
  for (let T = 0; T < total - 0.04; T += step) {
    tl.seek(T, false);
    window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: T, waitUntil() {} } }));
    const wm = wmBox(T), cap = capOn(T);
    // camera: the active scene's character-plane transform
    let camEl = null, best = 0;
    for (const sc of document.querySelectorAll('.clip.scene')) { if (!active(sc, T)) continue; const o = vis(sc); if (o > best) { best = o; camEl = sc.querySelector('.cam'); } }
    const m = camEl?.transform?.baseVal?.consolidate()?.matrix;
    camMoving = false;
    if (m) { const p = { x: m.a * 540 + m.c * 960 + m.e, y: m.b * 540 + m.d * 960 + m.f, s: Math.hypot(m.a, m.b), el: camEl, T };
      if (prev && prev.el === p.el) { const v = (Math.hypot(p.x - prev.x, p.y - prev.y) + 960 * Math.abs(p.s - prev.s)) / step;
        // measured thresholds (Ricks Clips camera grammar): % of frame width per second; still < 2 %/s, moving > 10 %/s, fast > 60 %/s
        const pct = 100 * v / 1080; if (pct < 2) cam.rest++; else if (pct < 10) cam.drift++; else { cam.move++; if (pct > 60) cam.fast++; }
        const stt = pct < 2 ? 's' : pct < 10 ? 'd' : 'm'; camMoving = stt === 'm'; if (cam.state !== stt) { cam.runs.push([cam.state, cam.len]); cam.state = stt; cam.len = 0; } cam.len += step;
        if (v > cam.top && v < 20000) { cam.top = v; cam.topAt = T; } }
      prev = p; } else prev = null;
    // faces
    document.querySelectorAll('circle.hdface').forEach((fc, idx) => {
      if (!active(fc, T) || vis(fc.parentElement) < 0.5) return;
      const r = fc.getBoundingClientRect(); if (r.width < 24) return;
      const cx = r.x + r.width / 2, cy = r.y + r.height / 2, R = r.width / 2, id = idx, x = Math.round(cx), y = Math.round(cy);
      const add = (rule, note = '') => faces.push({ t: Math.round(T * 100) / 100, rule, id, x, y, note });
      const lp = last.get(idx), sp = lp && T - lp[2] < step * 1.5 ? Math.hypot(cx - lp[0], cy - lp[1]) / step : 0; last.set(idx, [cx, cy, T]);
      if (sp > 250) return;   // walking or swept through the frame by a camera move: framing rules apply once it settles
      if (cx + R < 0 || cx - R > 1080 || cy + R < 0 || cy - R > 1920) return;   // fully out of frame: not seen
      const st = (c, lim) => c - R * 0.6 < lim && c + R * 0.6 > lim;   // the face straddles a frame edge
      if (camMoving) return;   // reference rule: during camera moves only the camera checks run; framing is judged at rest
      if (st(cx, 0) || st(cx, 1080) || st(cy, 0) || st(cy, 1920)) { add('edge'); return; }
      if (cy - R < 320) add('title');
      if (cap && cy + R > 1464 && cy - R < 1556) add('caption');
      if (cx + R * 0.5 > 900 && cy > 900) add('buttons');
      if (wm && cx + R > wm.left && cx - R < wm.right && cy + R > wm.top && cy - R < wm.bottom) add('watermark');
      const own = fc.closest('g.hd');
      for (const [px, py] of [[cx, cy], [cx - R * 0.45, cy - R * 0.2], [cx + R * 0.45, cy - R * 0.2], [cx, cy + R * 0.5]]) {
        const sc = fc.closest('.clip');   // only what is drawn in the same scene (crossfades are not occlusion)
        const hit = document.elementsFromPoint(px, py).find((e) => !skipHit(e) && e.closest('.clip') === sc && vis(e) > 0.5);
        if (hit && !own.contains(hit)) { const other = hit.closest('g.hd');
          add('covered', other ? 'by another character' : `by <${hit.tagName.toLowerCase()} fill=${hit.getAttribute('fill') || hit.getAttribute('stroke') || '?'}>`); break; }
      }
    });
  }
  return { faces, events, cam };
}
