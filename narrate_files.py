"""Narration from recorded or generated audio files (e.g. ElevenLabs), one file per scene, in place of Kokoro.
  python3 narrate_files.py work/<slug> [audio_dir] [maxpause=0.65]    # default audio_dir: work/<slug>/vo
Expects <audio_dir>/scene_<i>.mp3 (or .wav), one per scene, each reading that scene's `say` lines in order.
Writes timings.json + narration.wav exactly like narrate.py, so build.mjs works unchanged.
Within a scene the take's own timing is kept (that is where the emotion lives); line boundaries are found in the
pauses between sentences: the n-1 pauses that best match where the line breaks should fall by text length.
A say line's `beat` (climax) adds that much extra silence before the line. Scene loudness is levelled to the median
scene, then the scene tone's `gain` (dB) applies. Prints each line's duration and characters/s: a line far off
the others (or a scene with fewer pauses than lines) means a boundary was missed; re-cut or retake that scene.
"""
import itertools, json, os, subprocess, sys
import numpy as np, soundfile as sf

sys.stdout.reconfigure(encoding="utf-8")
D = sys.argv[1]
POS = [x for x in sys.argv[2:] if "=" not in x]
A = POS[0] if POS else os.path.join(D, "vo")
cfg = json.load(open(os.path.join(D, "say.json"), encoding="utf-8"))
SR = 44100
TONES = cfg.get("tones") or [None] * len(cfg["scenes"])
text = lambda s: s if isinstance(s, str) else s["text"]
beat = lambda s: 0 if isinstance(s, str) else s.get("beat", 0)


def load(i):
    for ext in ("mp3", "wav", "m4a", "ogg"):
        p = os.path.join(A, f"scene_{i}.{ext}")
        if os.path.exists(p):
            raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                                 capture_output=True, check=True).stdout
            return np.frombuffer(raw, dtype=np.float32).copy()
    sys.exit(f"missing {A}/scene_{i}.mp3")


def pauses(a, hop=0.01, min_len=0.09):
    """Silent stretches (start, end) in s, from a 10 ms RMS envelope against an adaptive floor."""
    n = int(hop * SR)
    env = np.sqrt(np.convolve(a ** 2, np.ones(n) / n, mode="same"))[::n]
    thr = max(0.006, np.percentile(env, 95) * 0.06)
    quiet = env < thr
    out, s = [], None
    for k, q in enumerate(np.append(quiet, False)):
        if q and s is None: s = k
        if not q and s is not None:
            if (k - s) * hop >= min_len: out.append((s * hop, k * hop))
            s = None
    return out, thr, env, hop


MAXP = float(dict(x.split("=", 1) for x in sys.argv[2:] if "=" in x).get("maxpause", 0.65))
def cap(a, keep=MAXP):
    """Shorten every silence longer than `keep` s to `keep` (generated takes hold long pauses that add up)."""
    ps, *_ = pauses(a)
    out, pos = [], 0
    for s, e in ps:
        if e - s > keep and s > 0.05 and e < len(a) / SR - 0.05:
            mid = (s + e) / 2
            out += [a[pos:int((mid - keep / 2) * SR)]]
            pos = int((mid + keep / 2) * SR)
    return np.concatenate(out + [a[pos:]])


def trim(a, thr_abs=0.008):
    nz = np.where(np.abs(a) > thr_abs)[0]
    return a[max(0, nz[0] - int(0.03 * SR)): nz[-1] + int(0.12 * SR)]


takes = [cap(trim(load(i))) for i in range(len(cfg["scenes"]))]
rms = lambda a: float(np.sqrt(np.mean(a[np.abs(a) > 0.01] ** 2)))
ref = float(np.median([rms(a) for a in takes]))
out, wavs = [], []
for i, (say, a, tone) in enumerate(zip(cfg["scenes"], takes, TONES)):
    tone = tone or {}
    a = a * (ref / rms(a)) * 10 ** (tone.get("gain", 0) / 20)
    n, L = len(say), len(a) / SR
    ps, *_ = pauses(a)
    ps = [p for p in ps if 0.15 < p[0] and p[1] < L - 0.15]   # inner pauses only
    chars = [len(text(s)) for s in say]
    want = [L * sum(chars[:k + 1]) / sum(chars) for k in range(n - 1)]   # where each break should fall
    best, pick = None, []
    if n > 1:
        if len(ps) < n - 1: print(f"!! scene {i}: {len(ps)} pauses for {n} lines; re-cut by hand")
        for comb in itertools.combinations(range(len(ps)), min(n - 1, len(ps))):
            sc = sum(((ps[c][0] + ps[c][1]) / 2 - w) ** 2 / L ** 2 * 40 - (ps[c][1] - ps[c][0]) for c, w in zip(comb, want))
            if best is None or sc < best: best, pick = sc, list(comb)
    cuts = [ps[c] for c in pick]           # (pause start, pause end) between line k and k+1
    # rebuild the scene: lines keep their own audio and the take's own pause, plus any beat before a line
    chunks, tim, t, pos = [], [], 0.0, 0
    for k, s in enumerate(say):
        if k and beat(s):
            chunks.append(np.zeros(int(beat(s) * SR), dtype=np.float32)); t += beat(s)
        end = cuts[k][0] if k < len(cuts) else L
        nxt = cuts[k][1] if k < len(cuts) else L
        seg = a[int(pos * SR): int(end * SR)]
        tim.append(dict(text=text(s), start=round(t, 3), end=round(t + len(seg) / SR, 3)))
        gap = a[int(end * SR): int(nxt * SR)]
        chunks += [seg.astype(np.float32), gap.astype(np.float32)]
        t += (len(seg) + len(gap)) / SR
        pos = nxt
    wav = np.concatenate(chunks)
    wavs.append(wav)
    out.append(dict(sentences=tim, length=round(len(wav) / SR, 3)))
    print(i, round(len(wav) / SR, 2), "s")
    for x in tim:
        d = x["end"] - x["start"]
        print(f"   {x['start']:6.2f}-{x['end']:6.2f}  {len(x['text']) / max(d, 0.01):5.1f} ch/s  {x['text']}")
json.dump(out, open(os.path.join(D, "timings.json"), "w"), indent=1)

fps = cfg["fps"]
per = lambda v: v if isinstance(v, list) else [v] * len(out)
lead, tail = per(cfg["lead"]), per(cfg["tail"])
dur = [o["length"] + lead[i] + tail[i] for i, o in enumerate(out)]
total = round(sum(dur) * fps) / fps
track = np.zeros(int(total * SR) + SR, dtype=np.float32)
start = 0.0
for i, w in enumerate(wavs):
    s = int((start + lead[i]) * SR)
    track[s:s + len(w)] += w
    start += dur[i]
track = track[:int(total * SR)]
track = track / max(1e-6, np.abs(track).max()) * 0.9
sf.write(os.path.join(D, "narration.wav"), track, SR)
print("narration.wav", round(total, 2), "s")
