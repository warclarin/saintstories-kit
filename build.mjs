#!/usr/bin/env node
// SaintStories reel builder (HyperFrames).
//   node build.mjs <story.mjs> say            -> work/<slug>/say.json (input for narrate.py)
//   node build.mjs <story.mjs> html           -> work/<slug>/index.html (+ assets)   [default]
//   node build.mjs <story.mjs> info           -> total length + scene times + preview times
//   node build.mjs <story.mjs> preview [t..]  -> contact sheet of frames (default: each scene at 60%)
//   node build.mjs <story.mjs> render         -> SaintStories_<Name>.mp4 (HyperFrames render)
//   node build.mjs <story.mjs> thumb          -> thumb_<slug>.png (1080x1920) + thumb_<slug>_square.png
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { createRequire } from 'module';
import { pathToFileURL, fileURLToPath } from 'url';

const KIT = path.dirname(fileURLToPath(import.meta.url));
const HF = 'hyperframes@0.9.4';
const [storyArg, cmd = 'html', ...rest] = process.argv.slice(2);
const { STORY } = await import(pathToFileURL(path.resolve(storyArg)).href);
const OUT = path.join(KIT, 'work', STORY.slug);
fs.mkdirSync(OUT, { recursive: true });
const LEAD = 0.4, TAIL = 0.6, XF = 0.4, FPS = 30;
const BRAND = STORY.brand || 'SaintStories';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// HyperFrames can't download its own headless shell in a sandbox: point it at an installed Chrome.
if (!process.env.HYPERFRAMES_BROWSER_PATH) {
  const c = ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) => fs.existsSync(p));
  if (c) process.env.HYPERFRAMES_BROWSER_PATH = c;
}
const sh = (bin, args, opts = {}) => execFileSync(bin, args, { stdio: 'inherit', cwd: OUT, ...opts });

if (cmd === 'say') {
  fs.writeFileSync(path.join(OUT, 'say.json'), JSON.stringify({
    voice: STORY.voice || 'am_michael', speed: STORY.speed || 0.95, lang: STORY.lang || 'en-us',
    fix: STORY.fix || {}, lead: LEAD, tail: TAIL, fps: FPS, scenes: STORY.scenes.map((s) => s.say),
  }, null, 1));
  console.log(path.join(OUT, 'say.json'));
  process.exit(0);
}

const TIM = JSON.parse(fs.readFileSync(path.join(OUT, 'timings.json'), 'utf8'));
const DUR = TIM.map((t) => t.length + LEAD + TAIL);
const STARTS = DUR.map((_, i) => DUR.slice(0, i).reduce((a, b) => a + b, 0));
const TOTAL = Math.round(DUR.reduce((a, b) => a + b, 0) * FPS) / FPS;

if (cmd === 'info') {
  console.log('total', TOTAL.toFixed(2), 's');
  STORY.scenes.forEach((s, i) => console.log(i, STARTS[i].toFixed(2), DUR[i].toFixed(2), s.title));
  console.log('preview at', STARTS.map((s, i) => (s + 0.6 * DUR[i]).toFixed(2)).join(','));
  process.exit(0);
}

// ------------------------------------------------------------------ assets
function assets() {
  fs.copyFileSync(path.join(KIT, 'reel.js'), path.join(OUT, 'reel.js'));
  fs.copyFileSync(path.join(KIT, 'vendor', 'gsap.min.js'), path.join(OUT, 'gsap.min.js'));
  fs.copyFileSync(path.join(KIT, 'vendor', 'grain.png'), path.join(OUT, 'grain.png'));
  fs.mkdirSync(path.join(OUT, 'fonts'), { recursive: true });
  const GF = '/usr/share/fonts/truetype/google-fonts/';
  for (const f of ['Lora-Variable.ttf', 'Poppins-Medium.ttf', 'Poppins-Bold.ttf']) {
    const src = fs.existsSync(path.join(KIT, 'fonts', f)) ? path.join(KIT, 'fonts', f) : GF + f;
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT, 'fonts', f));
    else console.warn('missing font', f, '- falling back to system serif/sans');
  }
  fs.writeFileSync(path.join(OUT, 'hyperframes.json'), '{}\n');
}

const SHARED_DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
<radialGradient id="haloGlow"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".9"/><stop offset=".55" stop-color="#ffd27a" stop-opacity=".28"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
<radialGradient id="sunGlow"><stop offset="0" stop-color="#fff3c8"/><stop offset=".25" stop-color="#ffd98a" stop-opacity=".7"/><stop offset="1" stop-color="#ffb070" stop-opacity="0"/></radialGradient>
<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c4" stop-opacity=".85"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></linearGradient>
<linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7fab"/><stop offset="1" stop-color="#173a5c"/></linearGradient>
<linearGradient id="seaDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5486"/><stop offset="1" stop-color="#1f1a3a"/></linearGradient>
<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="blur6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="blur14" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>
</defs></svg>`;

const CSS = `
@font-face{font-family:Lora;src:url(fonts/Lora-Variable.ttf);font-weight:400 700}
@font-face{font-family:Poppins;src:url(fonts/Poppins-Medium.ttf);font-weight:500}
@font-face{font-family:Poppins;src:url(fonts/Poppins-Bold.ttf);font-weight:700}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#000}
#root{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:Poppins,'DejaVu Sans',sans-serif}
.clip{position:absolute;inset:0}
.scene svg{position:absolute;left:0;top:0;width:1080px;height:1920px}
.t{position:absolute;left:0;right:0;text-align:center}
.brand{top:86px;font:500 28px Poppins;color:rgba(255,255,255,.6);letter-spacing:.05em}
.kicker{top:146px;font:500 32px Poppins;letter-spacing:.14em;color:#ffe2a0;text-shadow:0 3px 10px rgba(0,0,0,.55)}
.title{top:190px;padding:0 40px;font:700 76px/1.12 Lora,'DejaVu Serif',serif;color:#fffaf0;text-shadow:0 4px 18px rgba(0,0,0,.5)}
.cap{top:1464px;bottom:auto;display:flex;justify-content:center}
.pill{font:700 52px/92px Poppins;padding:0 30px;border-radius:46px;background:rgba(20,14,30,.74);color:#fff;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,.25)}
.w{display:inline-block;margin:0 .12em}
.wm{bottom:auto;right:auto;display:flex;align-items:center;gap:10px;font:500 30px Poppins;color:rgba(255,255,255,.62);text-shadow:0 2px 3px rgba(0,0,0,.45)}
.wm.r{left:auto;flex-direction:row}
.grain{background:url(grain.png);background-size:540px 960px;mix-blend-mode:overlay;opacity:.16;pointer-events:none}
.vig{background:radial-gradient(ellipse 75% 62% at 50% 46%,rgba(0,0,0,0) 58%,rgba(12,4,22,.45) 100%);pointer-events:none}
.endcard{top:1594px;bottom:auto;font:500 30px Poppins;color:#ffe2a0;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.black{background:#000}
.thumbfade{background:linear-gradient(to bottom,rgba(18,12,28,0) 0,rgba(18,12,28,0) var(--f0),rgba(18,12,28,.88) calc(var(--f0) + 300px),rgba(18,12,28,.88) 100%)}
.hook{font:700 46px Poppins;color:#ffd682;letter-spacing:.04em;text-shadow:0 4px 12px rgba(0,0,0,.6)}
.ttitle{font:700 132px/1.05 Lora,'DejaVu Serif',serif;color:#fffaf0;white-space:nowrap;text-shadow:0 6px 20px rgba(0,0,0,.6)}
.chip{left:40px;right:auto;top:446px;height:60px;padding:0 26px 0 20px;border-radius:30px;background:rgba(20,14,30,.6);display:flex;align-items:center;gap:12px;font:500 34px Poppins;color:#fff}
`;

const ICON = (c = 'rgba(255,255,255,.75)') =>
  `<svg width="30" height="38" viewBox="-15 -12 30 38"><ellipse cx="0" cy="-5" rx="13" ry="5" fill="none" stroke="${c}" stroke-width="3"/><path d="M0 2 V24 M-8 10 H8" stroke="${c}" stroke-width="4" stroke-linecap="round"/></svg>`;

function sceneDiv(i, { start, zero, dur, z, hud = true, shift }) {
  const s = STORY.scenes[i];
  const cam = s.cam || [540, 1150, 0.05];
  return `<div class="clip scene" id="s${i}" data-start="${start.toFixed(3)}" data-zero="${zero.toFixed(3)}" data-duration="${dur.toFixed(3)}" style="z-index:${z}">`
    + `<svg viewBox="0 0 1080 1920"><g class="cam" data-cam="${cam.join(' ')}"><g transform="translate(0,${shift})">${s.art()}</g></g></svg>`
    + (hud ? `<div class="t kicker" data-in="rise 0.1 0.5">${esc(s.kicker)}</div><div class="t title" data-in="rise 0.25 0.6">${esc(s.title)}</div>` : '')
    + '</div>';
}

function captionChunks(i) {
  const out = [];
  for (const s of TIM[i].sentences) {
    const words = s.text.split(/\s+/), groups = [];
    let cur = [];
    for (const w of words) {
      cur.push(w);
      if (cur.length >= 4 || (/[,.?!;]$/.test(w) && cur.length >= 2)) { groups.push(cur); cur = []; }
    }
    if (cur.length) { if (groups.length && cur.length === 1) groups[groups.length - 1].push(...cur); else groups.push(cur); }
    const total = groups.reduce((a, g) => a + g.join(' ').length, 0);
    let t = s.start;
    for (const g of groups) {
      const d = ((s.end - s.start) * g.join(' ').length) / total;
      out.push({ s: STARTS[i] + LEAD + t, e: STARTS[i] + LEAD + t + d, words: g });
      t += d;
    }
  }
  return out;
}

function page(body, reel) {
  return `<!doctype html><html lang="en" data-resolution="portrait"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<title>${esc(BRAND)} - ${esc(STORY.scenes[0].title)}</title><script src="gsap.min.js"></script><style>${CSS}</style></head><body>
${SHARED_DEFS}
${body}
<script>window.REEL=${JSON.stringify(reel)};</script><script src="reel.js"></script>
</body></html>`;
}

function buildHtml() {
  assets();
  const shift = STORY.shift ?? 70;
  const parts = [];
  STORY.scenes.forEach((_, i) => {
    const start = i ? STARTS[i] - XF : 0;
    const dur = DUR[i] + (i ? XF : 0) + (i === STORY.scenes.length - 1 ? 0 : 0.02);
    parts.push(sceneDiv(i, { start, zero: STARTS[i], dur, z: i + 1, shift }));
  });
  parts.push(`<div class="clip vig" data-start="0" data-duration="${TOTAL}" style="z-index:50"></div>`);
  parts.push(`<div class="clip grain" data-start="0" data-duration="${TOTAL}" style="z-index:60"></div>`);
  parts.push(`<div class="clip t brand" data-start="0" data-duration="${TOTAL}" style="z-index:70;bottom:auto">${esc(BRAND)}</div>`);
  // captions with per-word highlight
  STORY.scenes.forEach((_, i) => {
    const chunks = captionChunks(i);
    chunks.forEach((c, k) => {
      const last = k === chunks.length - 1;
      const end = Math.min(c.e + (last ? 0.6 : 0), STARTS[i] + DUR[i] - 0.05);
      const chars = c.words.join(' ').length;
      let t = c.s, words = '';
      c.words.forEach((w) => {
        const d = ((c.e - c.s) * (w.length + 1)) / (chars + 1);
        words += `<span class="w" data-t="${t.toFixed(3)}" data-u="${(t + d).toFixed(3)}">${esc(w)}</span>`;
        t += d;
      });
      parts.push(`<div class="clip cap" data-start="${(c.s - 0.05).toFixed(3)}" data-duration="${(end - c.s + 0.05).toFixed(3)}" style="z-index:80"><div class="pill">${words}</div></div>`);
    });
  });
  // anti-reupload watermark: hops between spots every 6 s
  const spots = STORY.wm_spots || [[56, 560, 'l'], [1024, 900, 'r'], [56, 1250, 'l']];
  for (let k = 0; k * 6 < TOTAL - 0.5; k++) {
    const [x, y, side] = spots[k % spots.length], d = Math.min(6, TOTAL - k * 6);
    const pos = side === 'r' ? `right:${1080 - x}px;top:${y - 6}px` : `left:${x}px;top:${y - 6}px`;
    parts.push(`<div class="clip wm ${side}" data-start="${k * 6}" data-duration="${d.toFixed(3)}" style="z-index:75;${pos}">${ICON()}<span>${esc(BRAND)}</span></div>`);
  }
  parts.push(`<div class="clip t endcard" data-start="${(TOTAL - 2.2).toFixed(3)}" data-duration="2.2" style="z-index:80">Follow ${esc(BRAND)} for more saints</div>`);
  parts.push(`<div class="clip black" id="fadein" data-start="0" data-duration="0.4" style="z-index:100"></div>`);
  parts.push(`<div class="clip black" id="fadeout" data-start="${(TOTAL - 0.5).toFixed(3)}" data-duration="0.5" style="z-index:100;opacity:0"></div>`);
  parts.push(`<audio id="vo" class="clip" data-start="0" data-duration="${TOTAL}" src="narration.wav"></audio>`);
  const body = `<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1080" data-height="1920">\n${parts.join('\n')}\n</div>`;
  fs.writeFileSync(path.join(OUT, 'index.html'), page(body, { total: TOTAL, xf: XF }));
  console.log(path.join(OUT, 'index.html'), `(${TOTAL.toFixed(2)} s)`);
}

function buildThumb() {
  assets();
  const i = STORY.thumb_scene ?? 0, t = STORY.thumb_t ?? 3.0, shift = STORY.thumb_shift ?? -60;
  const title = STORY.thumb_title || STORY.scenes[i].title, hook = STORY.thumb_hook || '';
  const f0 = 1080 - Math.max(0, shift + 60);
  const body = `<div id="root" data-composition-id="main" data-start="0" data-duration="${DUR[i]}" data-width="1080" data-height="1920">`
    + sceneDiv(i, { start: 0, zero: 0, dur: DUR[i], z: 1, hud: false, shift })
    + `<div class="clip vig" style="z-index:50"></div><div class="clip grain" style="z-index:60"></div>`
    + `<div class="clip thumbfade" style="z-index:61;--f0:${f0}px"></div>`
    + `<div class="t chip" style="z-index:70">${ICON('#f2c46b')}<span>${esc(BRAND)}</span></div>`
    + (hook ? `<div class="t hook" style="z-index:70;top:var(--hy)">${esc(hook.toUpperCase())}</div>` : '')
    + `<div class="t ttitle" id="tt" style="z-index:70">${esc(title)}</div></div>`
    + `<script>(function(){const e=document.getElementById('tt');let s=132;e.style.fontSize=s+'px';`
    + `while(s>70&&e.scrollWidth>980){s-=4;e.style.fontSize=s+'px';}const top=1440-s;e.style.top=top+'px';document.documentElement.style.setProperty('--hy',(top-74)+'px');})();</script>`;
  fs.writeFileSync(path.join(OUT, 'thumb.html'), page(body, { total: DUR[i], xf: XF, seek: t }));
  const require = createRequire(import.meta.url);
  let pw; try { pw = require('playwright'); } catch { pw = require(execFileSync('bash', ['-lc', 'npm root -g']).toString().trim() + '/playwright'); }
  return (async () => {
    const b = await pw.chromium.launch();
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    await p.goto(pathToFileURL(path.join(OUT, 'thumb.html')).href);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const png = path.join(OUT, `thumb_${STORY.slug}.png`);
    await p.screenshot({ path: png });
    await b.close();
    sh('ffmpeg', ['-y', '-loglevel', 'error', '-i', png, '-vf', 'crop=1080:1080:0:420', path.join(OUT, `thumb_${STORY.slug}_square.png`)]);
    console.log(png, path.join(OUT, `thumb_${STORY.slug}_square.png`));
  })();
}

if (cmd === 'html') buildHtml();
else if (cmd === 'preview') {
  buildHtml();
  const at = rest.length ? rest.join(',') : STARTS.map((s, i) => (s + 0.6 * DUR[i]).toFixed(2)).join(',');
  const dir = path.join(OUT, 'preview');
  fs.rmSync(dir, { recursive: true, force: true });
  sh('npx', ['-y', HF, 'snapshot', '.', '--at', at, '--no-end', '-o', dir]);
  console.log('contact sheet:', path.join(dir, 'contact-sheet.jpg'));
} else if (cmd === 'render') {
  buildHtml();
  const name = `SaintStories_${STORY.name || STORY.slug}.mp4`;
  sh('npx', ['-y', HF, 'render', '.', '-o', path.join(OUT, name), '--fps', String(FPS), '--quiet', ...rest]);
  console.log(path.join(OUT, name));
} else if (cmd === 'thumb') await buildThumb();
else console.error('unknown command', cmd);
