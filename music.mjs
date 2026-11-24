// Background music for a finished reel, made in an outside music generator (Gemini) and mixed here (2026-11-22).
//   node build.mjs <story.mjs> music prompt          -> the generator prompt, timed to this reel (also saved next to the MP4)
//   node build.mjs <story.mjs> music check [files]   -> scores each track against the plan (default: the newest audio files
//                                                       in ~/Downloads from the last 24 h) and names the best one
//   node build.mjs <story.mjs> music mix [file]      -> mixes a track (default: the best of `check`) under the narration:
//                                                       SaintStories_<Name>_music.mp4 next to the plain MP4 (kept as is)
// The plan comes from the story: scene 1 is the hook (a hit at frame 0), the scene with the climax line (a say entry with
// its own speed) is the quiet drop, the second-to-last scene rises to the peak at the end of its last line (the quotable
// line), the last scene is calm and fades for the seamless loop. Other scenes: tone speed >= 1.05 tense, else steady.
// STORY.music (optional) = { story: 'one-line summary for the prompt', cues: { <scene index>: 'sound for that scene' },
//   color: "instruments of the reel's place or mood" } (2026-11-24: the genre always stays cinematic; color adds the
//   setting's instruments on top of the orchestra, e.g. 'Middle Eastern: oud, ney flute, soft frame drum' for Alexandria).
// Most misses are fixed in the mix (dip under the quiet scene, softer ending, fade, ducking under the voice); regenerate
// only when the track is too short, has no build at all, or sounds wrong (genre, instruments) to the ear.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync, spawnSync } from 'child_process';

const mmss = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
const ff = (args) => spawnSync('ffmpeg', ['-hide_banner', ...args], { encoding: 'utf8', maxBuffer: 1 << 28 }).stderr || '';
const dur = (f) => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim();
const lufs = (f, extra = []) => { const m = ff(['-i', f, ...extra, '-af', 'loudnorm=print_format=json', '-f', 'null', '-']).match(/"input_i"\s*:\s*"(-?[\d.inf]+)"/); return m ? +m[1] : -30; };
/** RMS level in dB for each `bin` seconds (silence = -90). */
function curve(f, bin = 0.5) {
  const n = Math.round(8000 * bin);
  return [...ff(['-i', f, '-af', `aresample=8000,asetnsamples=n=${n},astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level`, '-f', 'null', '-'])
    .matchAll(/RMS_level=(-?[\d.]+|-inf)/g)].map((m) => (m[1] === '-inf' ? -90 : Math.max(-90, +m[1])));
}
const leadSilence = (f) => { const m = ff(['-i', f, '-t', '3', '-af', 'silencedetect=n=-50dB:d=0.05', '-f', 'null', '-']).match(/silence_start: 0[\s\S]*?silence_end: ([\d.]+)/); return m ? +m[1] : 0; };
const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : -90);
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[s.length >> 1] : -90; };

/** The music plan for this reel, from the scene times and the story's roles. */
export function plan({ STORY, TIM, STARTS, DUR, LEADS, TOTAL }) {
  const NS = STORY.scenes.length;
  const climax = STORY.scenes.findIndex((s) => s.say.some((l) => typeof l === 'object' && l.speed));
  const quotable = NS - 2, last = NS - 1;
  const lastLine = (i) => { const se = TIM[i]?.sentences || []; return STARTS[i] + LEADS[i] + (se.length ? se[se.length - 1].end : DUR[i] - 0.4); };
  const roles = STORY.scenes.map((s, i) => (i === 0 ? 'hook' : i === last ? 'calm' : i === quotable ? 'rise' : i === climax ? 'quiet'
    : (s.tone?.speed ?? 1) >= 1.05 ? 'tense' : 'stand'));
  const peak = lastLine(quotable);
  const quiet = climax > 0 ? [STARTS[climax], STARTS[climax] + DUR[climax]] : null;
  return { total: TOTAL, roles, peak, quiet, calm: [STARTS[last], TOTAL], sections: STORY.scenes.map((s, i) => ({ from: STARTS[i], to: STARTS[i] + DUR[i], title: s.title, role: roles[i] })) };
}

const SOUND = {
  hook: 'One huge low drum hit and a deep horn at the very first second, then a dark low drone.',
  tense: 'Tense and urgent: pulsing low frame drum and dark strings.',
  stand: 'Firm and noble: soft steady drums and a solemn low-string melody.',
  quiet: 'SUDDEN DROP, the quietest part of the track: no drums at all, only a whisper-soft wordless choir and gentle strings, prayerful.',
  rise: (pk) => `Rising: warm horns and choir build into a major key, reaching the single biggest, most glorious moment of the track at ${mmss(pk)}.`,
  calm: 'Calm after the peak: a long warm sustained chord fading gently to silence, so it can loop back to the opening.',
};
export function prompt(ctx) {
  const { STORY } = ctx, P = plan(ctx), M = STORY.music || {};
  const story = M.story || `the life of ${STORY.thumb_title || STORY.name}`;
  const lines = P.sections.map((s, i) => {
    const snd = M.cues?.[i] || (s.role === 'rise' ? SOUND.rise(P.peak) : SOUND[s.role]);
    return `${mmss(s.from)}–${mmss(s.to)} (${s.title.toLowerCase()}) ${snd}`;
  });
  const color = M.color ? `Colour: ${M.color}, woven into the orchestra from start to finish. ` : '';
  return `Instrumental cinematic film score for a ${Math.round(P.total)}-second story: ${story}. Built on strong contrasts between loud and almost silent. `
    + color + 'Reverent, slow 70 BPM, mixed soft under narration. No vocals, no lyrics, no sung words.\n\n' + lines.join('\n');
}

/** Score one track against the plan (0-100) and say what the mix will have to fix. */
export function check(file, P) {
  const lead = leadSilence(file), len = dur(file) - lead, bin = 0.5;
  const c = curve(file, bin).slice(Math.round(lead / bin));
  const at = (t0, t1) => c.slice(Math.max(0, Math.floor(t0 / bin)), Math.max(1, Math.ceil(t1 / bin)));
  const sm = c.map((_, k) => mean(c.slice(Math.max(0, k - 2), k + 3)));   // ~2.5 s smoothing
  const notes = [], fixes = [];
  let score = 0;
  // length
  if (len >= P.total - 0.5) score += 15; else if (len >= P.total - 3) { score += 6; notes.push(`a little short (${len.toFixed(1)} s for ${P.total.toFixed(1)} s); the mix fades early`); }
  else notes.push(`too short (${len.toFixed(1)} s for ${P.total.toFixed(1)} s): regenerate with Length: Standard`);
  // opening hit
  const hit = Math.max(...at(0, 1.5)) - median(at(1.5, 8));
  if (hit >= 2) score += 15; else { score += hit > 0 ? 7 : 0; notes.push('weak opening hit'); }
  // the quiet drop
  let dip = 0;
  if (P.quiet) {
    const q = mean(at(...P.quiet)), around = mean([...at(Math.max(0, P.quiet[0] - 8), P.quiet[0]), ...at(P.quiet[1], Math.min(P.calm[0], P.quiet[1] + 8))]);
    dip = around - q;
    if (dip >= 6) score += 30; else if (dip >= 3) { score += 15; fixes.push(`deepen the drop (${dip.toFixed(1)} dB)`); } else { fixes.push(`add the drop the track skipped (${dip.toFixed(1)} dB)`); notes.push(`no quiet drop at ${mmss(P.quiet[0])}–${mmss(P.quiet[1])}`); }
  }
  // the peak
  const from = Math.floor((P.quiet ? P.quiet[1] : P.total * 0.5) / bin), to = Math.min(sm.length, Math.ceil(P.total / bin));
  let pk = from; for (let k = from; k < to; k++) if (sm[k] > sm[pk]) pk = k;
  const peakT = pk * bin, dPeak = peakT - P.peak;
  if (Math.abs(dPeak) <= 2) score += 25; else if (Math.abs(dPeak) <= 4) { score += 12; notes.push(`peak ${dPeak > 0 ? 'late' : 'early'} by ${Math.abs(dPeak).toFixed(1)} s`); } else notes.push(`peak at ${mmss(peakT)}, planned ${mmss(P.peak)}`);
  // calm ending
  const endDrop = sm[pk] - mean(at(P.calm[0] + 1, P.total));
  if (endDrop >= 8) score += 15; else { score += endDrop >= 4 ? 7 : 0; fixes.push('soften the feast-day ending'); }
  return { file, lead, len, score, dip, peakT, dPeak, endDrop, notes, fixes,
    verdict: score >= 70 ? 'good' : score >= 45 ? 'usable: the mix fixes the rest' : 'regenerate' };
}

function newestAudio(dir, hours = 24, max = 6) {
  if (!fs.existsSync(dir)) return [];
  const now = Date.now();
  return fs.readdirSync(dir).filter((f) => /\.(mp3|wav|m4a|ogg|flac)$/i.test(f)).map((f) => path.join(dir, f))
    .map((f) => [f, fs.statSync(f).mtimeMs]).filter(([, t]) => now - t < hours * 3600e3).sort((a, b) => b[1] - a[1]).slice(0, max).map(([f]) => f);
}

/** Mix the track under the reel's narration and write SaintStories_<Name>_music.mp4. */
export function mix(file, P, R, video, out) {
  const T = P.total, voiceI = lufs(video, ['-vn']), musI = lufs(file);
  const base = (voiceI - 11) - musI;   // music about 11 dB under the voice before ducking
  const vol = ['1'];
  if (P.quiet && R.dip < 6) { const [a, b] = P.quiet, g = R.dip >= 3 ? 0.3 : 0.6;   // -3 / -8 dB, eased in and out
    vol.push(`-${g}*clip((t-${(a - 0.4).toFixed(2)})/0.8,0,1)+${g}*clip((t-${(b - 0.6).toFixed(2)})/1.2,0,1)`); }
  if (R.endDrop < 8) vol.push(`-0.5*clip((t-${(P.calm[0] - 0.8).toFixed(2)})/1.5,0,1)`);
  const fadeAt = Math.min(T, R.len) - 1.8;
  const fc = `[0:a]aresample=44100,asplit=2[v][key];[1:a]atrim=${R.lead.toFixed(3)}:${(R.lead + T).toFixed(3)},asetpts=PTS-STARTPTS,aresample=44100,`
    + `volume=${base.toFixed(1)}dB,volume='${vol.join('')}':eval=frame,afade=t=out:st=${fadeAt.toFixed(2)}:d=1.8[m];`
    + '[m][key]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=450[md];'
    + '[v][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[a]';
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', video, '-i', file, '-filter_complex', fc, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', out], { stdio: 'inherit' });
  return { base, applied: [`music ${base.toFixed(1)} dB (voice ${voiceI.toFixed(1)} LUFS, track ${musI.toFixed(1)} LUFS)`, ...(R.lead > 0.05 ? [`trimmed ${R.lead.toFixed(2)} s of silence at the start`] : []), ...R.fixes, 'ducked under the voice', `faded out from ${mmss(fadeAt)}`, 'mix at -14 LUFS'] };
}

export async function musicCmd(ctx) {
  const { STORY, FINAL, rest } = ctx;
  const sub = rest[0] || 'prompt', files = rest.slice(1);
  const P = plan(ctx), name = STORY.name || STORY.slug;
  const video = path.join(FINAL, `SaintStories_${name}.mp4`);
  if (sub === 'prompt') {
    // printed only (2026-11-24, user's choice): the prompt goes to the user as a chat message ready to copy, no .txt file
    const txt = prompt(ctx);
    console.log(`${txt}\n\n(settings: Vocals Instrumental · Genre Cinematic · Length Standard; climax/quiet ${P.quiet ? mmss(P.quiet[0]) + '–' + mmss(P.quiet[1]) : 'none'}, peak ${P.peak.toFixed(1)} s, total ${P.total.toFixed(1)} s)`);
    return;
  }
  // default: tracks downloaded after this reel was rendered (else the last 24 h), so other reels' tracks don't get scored
  const recent = newestAudio(path.join(os.homedir(), 'Downloads'));
  const since = fs.existsSync(video) ? fs.statSync(video).mtimeMs - 60e3 : 0;
  const fresh = recent.filter((f) => fs.statSync(f).mtimeMs > since);
  const list = files.length ? files : fresh.length ? fresh : recent;
  if (!list.length) { console.log('No audio files given and none in ~/Downloads from the last 24 h.'); process.exit(1); }
  const results = list.map((f) => check(f, P)).sort((a, b) => b.score - a.score);
  if (sub === 'check' || results.length > 1) for (const r of results) {
    console.log(`${String(r.score).padStart(3)}  ${r.verdict.padEnd(31)} ${path.basename(r.file)}  (${r.len.toFixed(1)} s, drop ${r.dip.toFixed(1)} dB, peak ${r.peakT.toFixed(1)} s vs ${P.peak.toFixed(1)} s, ending -${r.endDrop.toFixed(1)} dB)`);
    for (const n of r.notes) console.log(`       - ${n}`);
    for (const x of r.fixes) console.log(`       * mix will ${x}`);
  }
  if (sub === 'check') { console.log(`best: ${path.basename(results[0].file)}`); return; }
  if (sub !== 'mix') { console.log(`unknown: music ${sub} (prompt | check | mix)`); process.exit(1); }
  if (!fs.existsSync(video)) { console.log(`Render the reel first: ${video} not found.`); process.exit(1); }
  const best = results[0];
  if (best.verdict === 'regenerate') console.log(`warning: ${path.basename(best.file)} scored ${best.score}; mixing anyway.`);
  const out = path.join(FINAL, `SaintStories_${name}_music.mp4`);
  const m = mix(best.file, P, best, video, out);
  console.log(`mixed ${path.basename(best.file)} -> ${out}\n  ${m.applied.join('\n  ')}\nYouTube: AI music, so answer Yes to the altered or synthetic content question.`);
}
