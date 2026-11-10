// SaintStories fast renderer, the standard render: `node build.mjs <story.mjs> fast` (`render` is the HyperFrames fallback).
// Renders the same work/<slug>/index.html that HyperFrames renders, without per-frame screenshots: one headless Chrome page
// seeks the GSAP timeline, draws each frame into a 2D canvas and encodes it with WebCodecs (GPU H.264 when available);
// ffmpeg then adds the narration. About 2x faster than `render` on a full reel (St. Jude 78 s: ~45 s vs ~96 s).
//   Scene art: the scene SVG is serialized with its current GSAP state and drawn as an image (filters, gradients, rack
//   focus all work); a three.js canvas (STORY.bg3d) is drawn underneath. Text, captions, watermark, end card and black
//   fades take their fonts, colours, shadows, spacing and positions from the page's computed CSS, so build.mjs stays the
//   one place that defines the look. Vignette, light leak and grain mirror the .vig/.leak/.grain CSS gradients below.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execFileSync, execSync } from 'child_process';
import { createRequire } from 'module';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.mp3': 'audio/mpeg' };

export async function fastRender({ dir, out, fps = 30, pages = 1, bitrate = 10e6, chrome = process.env.HYPERFRAMES_BROWSER_PATH, log = console.log }) {
  const require = createRequire(import.meta.url);
  let pw; try { pw = require('playwright'); } catch { pw = require(execSync('npm root -g').toString().trim() + '/playwright'); }
  const srv = http.createServer((q, s) => {
    const p = path.join(dir, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
    if (!p.startsWith(path.resolve(dir))) { s.writeHead(403); s.end(); return; }
    fs.readFile(p, (e, b) => { if (e) { s.writeHead(404); s.end(); return; } s.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' }); s.end(b); });
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${srv.address().port}/index.html`;
  const tmp = path.join(dir, 'fast'); fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
  const t0 = Date.now();
  const browser = await pw.chromium.launch({ ...(chrome ? { executablePath: chrome } : {}), headless: true,
    args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  try {
    const probe = await browser.newPage();
    await probe.goto(url);
    const total = await probe.evaluate(() => window.REEL.total); await probe.close();
    const N = Math.round(total * fps), per = Math.ceil(N / pages);
    const results = await Promise.all(Array.from({ length: pages }, async (_, k) => {
      const F0 = k * per, F1 = Math.min(N, F0 + per), seg = path.join(tmp, `seg${k}.h264`), fd = fs.openSync(seg, 'w');
      const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
      const errs = [];
      page.on('pageerror', (e) => errs.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) errs.push(m.text()); });
      await page.exposeFunction('__chunk', (b64) => { fs.writeSync(fd, Buffer.from(b64, 'base64')); });
      await page.goto(url);
      await page.waitForFunction(() => !!window.__timelines?.main, null, { polling: 200, timeout: 60000 });
      const r = await page.evaluate(pageMain, { F0, F1, fps, bitrate });
      fs.closeSync(fd); await page.close();
      if (r.err) throw new Error(`page ${k}: ${r.err}`);
      if (errs.length) log(`[fast] page ${k} console:`, errs.slice(0, 3).join(' | '));
      return { k, seg, ...r };
    }));
    const cat = path.join(tmp, 'all.h264');
    fs.writeFileSync(cat, Buffer.concat(results.sort((a, b) => a.k - b.k).map((r) => fs.readFileSync(r.seg))));
    // raw H.264 has no timestamps: wrap it first (a one-step mux silently drops the audio), then add the narration at
    // 48 kHz through the same -3 dB peak limit HyperFrames applies (mean loudness unchanged)
    const vOnly = path.join(tmp, 'video.mp4');
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-r', String(fps), '-f', 'h264', '-i', cat, '-c', 'copy', vOnly]);
    const wav = path.join(dir, 'narration.wav');
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', vOnly, ...(fs.existsSync(wav) ? ['-i', wav, '-map', '0:v', '-map', '1:a',
      '-af', 'alimiter=limit=0.7079:attack=5:release=50:level=disabled', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-shortest'] : []),
      '-c:v', 'copy', '-movflags', '+faststart', out]);
    fs.rmSync(tmp, { recursive: true, force: true });
    const enc = results[0].codec;
    log(`[fast] ${N} frames in ${((Date.now() - t0) / 1000).toFixed(1)} s (${enc})`);
    return out;
  } finally { await browser.close(); srv.close(); }
}

// ------------------------------------------------------------------ runs inside the page
async function pageMain({ F0, F1, fps, bitrate }) {
  const W = 1080, H = 1920, g = window.gsap, tl = window.__timelines.main;
  const bR = window.__hf?.buildReady; if (bR) await Promise.all(Object.values(bR));
  await document.fonts.ready;
  const root = document.getElementById('root');
  const fontOf = (cs) => `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  await Promise.all([...root.querySelectorAll('.t, .pill')].map((el) => document.fonts.load(fontOf(getComputedStyle(el)), el.textContent || 'A')));
  const img = async (src) => { const i = new Image(); i.src = src; await i.decode(); return i; };
  const out = document.createElement('canvas'); out.width = W; out.height = H;
  const ctx = out.getContext('2d', { alpha: false });
  const mk = (draw) => { const c = document.createElement('canvas'); c.width = W; c.height = H; draw(c.getContext('2d')); return c; };
  const P = (el, p) => g.getProperty(el, p);
  const px = (v) => parseFloat(v) || 0;
  // "rgba(0, 0, 0, 0.5) 0px 4px 18px" (first shadow only)
  const shadowOf = (s) => { if (!s || s === 'none') return null; const col = s.match(/rgba?\([^)]*\)|#[0-9a-f]+/i)?.[0] || '#000';
    const n = s.replace(col, '').trim().split(/\s+/).map(px); return { col, x: n[0] || 0, y: n[1] || 0, blur: n[2] || 0 }; };
  const setShadow = (sh) => { ctx.shadowColor = sh ? sh.col : 'transparent'; ctx.shadowOffsetX = sh ? sh.x : 0; ctx.shadowOffsetY = sh ? sh.y : 0; ctx.shadowBlur = sh ? sh.blur : 0; };
  const metrics = (font, ls) => { ctx.font = font; ctx.letterSpacing = ls; const m = ctx.measureText('Hg'); return { A: m.fontBoundingBoxAscent, D: m.fontBoundingBoxDescent }; };

  // --- static text layout from the browser's own CSS (offsetTop/Left ignore GSAP transforms)
  function prepText(el) {
    const cs = getComputedStyle(el), font = fontOf(cs), ls = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    const { A, D } = metrics(font, ls), L = cs.lineHeight === 'normal' ? A + D : px(cs.lineHeight);
    let top = 0, left = 0; for (let e = el; e && e !== root; e = e.offsetParent) { top += e.offsetTop; left += e.offsetLeft; }
    const pl = px(cs.paddingLeft), pr = px(cs.paddingRight);
    const maxW = el.clientWidth - pl - pr, words = el.textContent.trim().split(/\s+/), lines = []; let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW + 0.5 && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur);
    return { el, font, ls, color: cs.color, sh: shadowOf(cs.textShadow), lines, L, A, D, cx: left + pl + maxW / 2, top: top + px(cs.paddingTop) };
  }
  function drawText(t, alpha = 1) {
    const o = P(t.el, 'opacity') * alpha; if (o <= 0.002) return;
    ctx.save(); ctx.globalAlpha = o; ctx.font = t.font; ctx.letterSpacing = t.ls; ctx.fillStyle = t.color; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    setShadow(t.sh);
    const y = t.top + P(t.el, 'y'), x = t.cx + P(t.el, 'x');
    t.lines.forEach((l, k) => ctx.fillText(l, x, y + k * t.L + (t.L - (t.A + t.D)) / 2 + t.A));
    ctx.restore();
  }
  function prepCap(el) {
    const pill = el.querySelector('.pill'), cs = getComputedStyle(pill), font = fontOf(cs);
    const ws = [...pill.querySelectorAll('.w')], m = px(getComputedStyle(ws[0]).marginLeft);
    const { A, D } = metrics(font, '0px'), widths = ws.map((w) => ctx.measureText(w.textContent).width);
    const L = px(cs.lineHeight), pw = widths.reduce((a, b) => a + b + 2 * m, 0) + px(cs.paddingLeft) + px(cs.paddingRight);
    let top = 0; for (let e = el; e && e !== root; e = e.offsetParent) top += e.offsetTop;
    return { pill, ws, widths, m, font, A, D, L, pw, ph: L, pl: px(cs.paddingLeft), r: px(cs.borderTopLeftRadius), bg: cs.backgroundColor,
      sh: shadowOf(cs.boxShadow), top, cx: W / 2 };
  }
  function drawCap(c) {
    const o = P(c.pill, 'opacity'), sc = P(c.pill, 'scale'); if (o <= 0.002) return;
    ctx.save(); ctx.globalAlpha = o; ctx.translate(c.cx, c.top + c.ph / 2); ctx.scale(sc, sc);
    setShadow(c.sh); ctx.fillStyle = c.bg; ctx.beginPath(); ctx.roundRect(-c.pw / 2, -c.ph / 2, c.pw, c.ph, c.r); ctx.fill(); setShadow(null);
    ctx.font = c.font; ctx.letterSpacing = '0px'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    let x = -c.pw / 2 + c.pl; const y = -c.ph / 2 + (c.L - (c.A + c.D)) / 2 + c.A;
    c.ws.forEach((w, k) => { x += c.m; ctx.fillStyle = P(w, 'color'); ctx.fillText(w.textContent, x, y); x += c.widths[k] + c.m; });
    ctx.restore();
  }
  async function prepWm(el) {
    const rr = root.getBoundingClientRect(), r = el.getBoundingClientRect(), sv = el.querySelector('svg'), sp = el.querySelector('span');
    const sr = sv.getBoundingClientRect(), tr = sp.getBoundingClientRect(), t = prepText(sp);
    const icon = await img('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sv.outerHTML.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')));
    return { el, icon, ix: sr.left - rr.left, iy: sr.top - rr.top, iw: sr.width, ih: sr.height, t, tx: tr.left - rr.left, ty: tr.top - rr.top, tw: tr.width };
  }
  function drawWm(w) {
    const o = P(w.el, 'opacity'); if (o <= 0.002) return;
    ctx.save(); ctx.globalAlpha = o; setShadow(w.t.sh); ctx.drawImage(w.icon, w.ix, w.iy, w.iw, w.ih);
    ctx.font = w.t.font; ctx.letterSpacing = w.t.ls; ctx.fillStyle = w.t.color; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(w.t.lines.join(' '), w.tx, w.ty + (w.t.L - (w.t.A + w.t.D)) / 2 + w.t.A); ctx.restore();
  }
  // --- full-frame effects (mirror the .vig / .leak / .grain CSS in build.mjs)
  const vig = mk((x) => { x.translate(540, 0.46 * H); x.scale(1, (0.62 * H) / (0.75 * W)); const r = 0.75 * W;
    const gr = x.createRadialGradient(0, 0, 0, 0, 0, r); gr.addColorStop(0.58, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(12,4,22,.45)');
    x.fillStyle = gr; x.fillRect(-W * 2, -H * 2, W * 4, H * 4); });
  const leakImg = (lx, la) => mk((x) => {
    x.save(); x.translate((px(lx) / 100) * W, 0.38 * H); x.scale(1, (0.42 * H) / (0.6 * W));
    const gr = x.createRadialGradient(0, 0, 0, 0, 0, 0.6 * W);
    gr.addColorStop(0, 'rgba(255,222,150,.95)'); gr.addColorStop(0.3, 'rgba(255,176,96,.55)'); gr.addColorStop(0.7, 'rgba(255,140,80,0)'); gr.addColorStop(1, 'rgba(255,140,80,0)');
    x.fillStyle = gr; x.fillRect(-W * 3, -H * 3, W * 6, H * 6); x.restore();
    const a = (px(la) * Math.PI) / 180, len = Math.abs(W * Math.sin(a)) + Math.abs(H * Math.cos(a)), dx = (Math.sin(a) * len) / 2, dy = (-Math.cos(a) * len) / 2;
    const lg = x.createLinearGradient(W / 2 - dx, H / 2 - dy, W / 2 + dx, H / 2 + dy);
    lg.addColorStop(0.3, 'rgba(255,200,120,0)'); lg.addColorStop(0.48, 'rgba(255,226,170,.5)'); lg.addColorStop(0.66, 'rgba(255,200,120,0)');
    x.fillStyle = lg; x.fillRect(0, 0, W, H); });
  let grain = null, grainOp = 0.16, grainW = 540, grainH = 960;
  const gEl = root.querySelector('.grain');
  if (gEl) { const cs = getComputedStyle(gEl); grainOp = px(cs.opacity) || 0.16; [grainW, grainH] = cs.backgroundSize.split(/\s+/).map(px); grain = await img('grain.png'); }

  const defs = document.querySelector('body > svg defs')?.outerHTML || '';
  const clips = [...root.querySelectorAll(':scope > .clip')].map((el, i) => ({ el, i, s: +el.dataset.start || 0, d: +el.dataset.duration || 1e9, z: +(el.style.zIndex || 0) }))
    .sort((a, b) => a.z - b.z || a.i - b.i);
  const unknown = new Set();
  for (const c of clips) {
    const cl = c.el.classList;
    if (cl.contains('scene')) {
      c.kind = 'scene'; c.cv = c.el.querySelector('canvas.bg3d'); c.svg = c.el.querySelector('svg');
      c.svgHidden = !c.svg || c.svg.style.visibility === 'hidden';
      c.texts = [...c.el.querySelectorAll('.t')].map(prepText);
    } else if (cl.contains('vig')) c.kind = 'vig';
    else if (cl.contains('leak')) { const cs = getComputedStyle(c.el); c.kind = 'leak'; c.img = leakImg(cs.getPropertyValue('--lx').trim(), cs.getPropertyValue('--la').trim()); }
    else if (cl.contains('grain')) c.kind = 'grain';
    else if (cl.contains('cap')) { c.kind = 'cap'; c.cap = prepCap(c.el); }
    else if (cl.contains('wm')) { c.kind = 'wm'; c.wm = await prepWm(c.el); }
    else if (cl.contains('black')) c.kind = 'black';
    else if (cl.contains('t')) { c.kind = 'text'; c.text = prepText(c.el); }
    else if (c.el.tagName === 'AUDIO') c.kind = 'skip';
    else { c.kind = 'skip'; unknown.add(c.el.className); }
  }
  if (unknown.size) console.warn('[fast] not drawn:', [...unknown].join(', '));

  async function drawSvg(svg) {
    let s = new XMLSerializer().serializeToString(svg);
    s = s.replace(/<svg([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height|style|class)="[^"]*"/g, '')} width="${W}" height="${H}">${defs}`);
    if (!/^<svg[^>]*xmlns=/.test(s)) s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    ctx.drawImage(await img('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s)), 0, 0, W, H);
  }

  async function frame(T) {
    tl.seek(T, false);
    window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: T, waitUntil() {} } }));
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; setShadow(null);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    for (const c of clips) {
      if (c.kind === 'skip' || T < c.s || T >= c.s + c.d) continue;
      if (c.kind === 'scene') {
        const a = P(c.el, 'opacity'); if (a <= 0.002) continue;
        ctx.save(); ctx.globalAlpha = a;
        if (c.cv) ctx.drawImage(c.cv, 0, 0);
        if (!c.svgHidden) await drawSvg(c.svg);
        ctx.restore();
        for (const t of c.texts) drawText(t, a);
      } else if (c.kind === 'vig') ctx.drawImage(vig, 0, 0);
      else if (c.kind === 'leak') {
        const o = P(c.el, 'opacity'); if (o <= 0.002) continue;
        ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = o; ctx.drawImage(c.img, P(c.el, 'x'), 0); ctx.restore();
      } else if (c.kind === 'grain' && grain) {
        ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = grainOp;
        const ox = px(c.el.style.backgroundPositionX), oy = px(c.el.style.backgroundPositionY);
        for (let gx = (ox % grainW) - grainW; gx < W; gx += grainW) for (let gy = (oy % grainH) - grainH; gy < H; gy += grainH) ctx.drawImage(grain, gx, gy, grainW, grainH);
        ctx.restore();
      } else if (c.kind === 'cap') drawCap(c.cap);
      else if (c.kind === 'wm') drawWm(c.wm);
      else if (c.kind === 'text') drawText(c.text);
      else if (c.kind === 'black') { const o = P(c.el, 'opacity'); if (o > 0.002) { ctx.save(); ctx.globalAlpha = o; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore(); } }
    }
  }

  // --- encoder: GPU H.264 when the browser has it, else software
  const base = { codec: 'avc1.640033', width: W, height: H, bitrate, framerate: fps, avc: { format: 'annexb' } };
  let cfg = { ...base, hardwareAcceleration: 'prefer-hardware' };
  if (!(await VideoEncoder.isConfigSupported(cfg)).supported) cfg = { ...base, hardwareAcceleration: 'no-preference' };
  if (!(await VideoEncoder.isConfigSupported(cfg)).supported) return { err: 'H.264 encoding not supported in this browser' };
  let err = null; const pending = [];
  const enc = new VideoEncoder({
    output: (chunk) => { const a = new Uint8Array(chunk.byteLength); chunk.copyTo(a); let s = ''; for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode.apply(null, a.subarray(i, i + 0x8000)); pending.push(window.__chunk(btoa(s))); },
    error: (e) => { err = String(e); } });
  enc.configure(cfg);
  for (let i = F0; i < F1 && !err; i++) {
    await frame(i / fps);
    const fr = new VideoFrame(out, { timestamp: Math.round((i * 1e6) / fps), duration: Math.round(1e6 / fps) });
    enc.encode(fr, { keyFrame: (i - F0) % (fps * 2) === 0 }); fr.close();
    if (enc.encodeQueueSize > 8) await new Promise((r) => enc.addEventListener('dequeue', r, { once: true }));
  }
  if (!err) await enc.flush();
  await Promise.all(pending);
  return { frames: F1 - F0, err, codec: cfg.hardwareAcceleration === 'prefer-hardware' ? 'GPU H.264' : 'software H.264' };
}
