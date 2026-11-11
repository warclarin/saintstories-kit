"""Free offline narration with Kokoro TTS (Apache-2.0).
  python3 narrate.py work/<slug> --check   # print phonemes per sentence (find mispronounced names)
  python3 narrate.py work/<slug>           # timings.json + narration.wav (aligned to the scenes)
Reads work/<slug>/say.json written by `node build.mjs <story> say`.
"""
import json, os, sys
try:
    import numpy as np, soundfile as sf
    from kokoro_onnx import Kokoro
except ImportError:   # setup.sh installs into .venv when the system Python can't run Kokoro (3.14+)
    venv = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".venv")
    vpy = os.path.join(venv, "Scripts", "python.exe") if os.name == "nt" else os.path.join(venv, "bin", "python")
    if os.path.abspath(sys.prefix) != venv and os.path.exists(vpy):
        import subprocess   # os.execv on Windows detaches from the console and loses the exit code
        sys.exit(subprocess.call([vpy] + sys.argv))
    raise

# Windows defaults to cp1252, which can't print IPA and garbles the UTF-8 say.json.
sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

D = sys.argv[1]
cfg = json.load(open(os.path.join(D, "say.json"), encoding="utf-8"))
KIT = os.path.dirname(os.path.abspath(__file__))
k = Kokoro(os.path.join(KIT, "models/kokoro-v1.0.onnx"), os.path.join(KIT, "models/voices-v1.0.bin"))

import re
ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
ORD = ("_ first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth "
       "sixteenth seventeenth eighteenth nineteenth twentieth").split()
ROMAN = {"I": 1, "V": 5, "X": 10, "L": 50}

def two(n):   # 0-99 in words
    if n < 20: return ONES[n]
    return TENS[n // 10] + ("" if n % 10 == 0 else "-" + ONES[n % 10])

def year(y):  # the way people say years: 1930 nineteen thirty, 1904 nineteen oh four, 2012 twenty twelve
    hi, lo = divmod(y, 100)
    if lo == 0: return "two thousand" if y == 2000 else two(hi) + " hundred"
    if 2000 < y < 2010: return "two thousand " + ONES[lo]
    return two(hi) + " " + ("oh " + ONES[lo] if lo < 10 else two(lo))

def ordinal(n):
    if n <= 20: return ORD[n]
    t, o = divmod(n, 10)
    return TENS[t][:-1] + "ieth" if o == 0 else TENS[t] + "-" + ORD[o]

def roman(r):
    v = [ROMAN[c] for c in r]
    return sum(-a if i + 1 < len(v) and a < v[i + 1] else a for i, a in enumerate(v))

def spoken(s):
    """Text the voice reads; captions keep the written form. A regnal numeral after a name becomes an ordinal
    (Pope John Paul II -> Pope John Paul the Second) and 4-digit years are read as years (1930 -> nineteen thirty)."""
    if cfg["lang"].startswith("en"):
        s = re.sub(r"\b([A-Z][a-z]+) (X{0,3}(?:IX|IV|V?I{0,3}))\b(?=[\s,.;:!?'’]|$)",
                   lambda m: m.group(0) if m.group(2) in ("", "I") else f"{m.group(1)} the {ordinal(roman(m.group(2))).capitalize()}", s)
        s = re.sub(r"(?<![\d,.])\b(1[0-9]{3}|20[0-9]{2})\b(?!\d|[,.]\d)", lambda m: year(int(m.group(1))), s)
    return s

def phon(s):
    ph = k.tokenizer.phonemize(spoken(s), cfg["lang"])
    for a, b in cfg["fix"].items():
        ph = ph.replace(a, b)
    return ph

# A say line is a string, or (opt-in) {"text": ..., "beat": extra silence in s before the line, "speed": voice speed}
# for the climax: a held breath before the miracle line, read a little slower.
# Opt-in character voices: {"text": ..., "who": "<cast key>"} (or "voice": a name) reads a quoted line in that
# character's voice; STORY.cast = {key: "voice" | {"voice", "speed"}}; a voice is a name or a blend {name: weight}.
# Character lines are levelled to the narrator's loudness. Opt-in scene tone (scene.tone): {"speed", "gap" (s between
# lines), "gain" (dB), "voice" (the narrator's voice or blend for that scene)}. Stories without these voice as before.
line = lambda s: s if isinstance(s, str) else s["text"]
CAST = cfg.get("cast") or {}
TONES = cfg.get("tones") or [None] * len(cfg["scenes"])
_blends = {}
def voice_of(v):
    if isinstance(v, str): return v
    key = json.dumps(v, sort_keys=True)
    if key not in _blends:
        tot = sum(v.values())
        _blends[key] = sum(k.get_voice_style(n) * (w / tot) for n, w in v.items()).astype(np.float32)
    return _blends[key]
def spec(s, tone):
    """(text, voice, speed, beat, is_character) for one say line in a scene with this tone."""
    s = {"text": s} if isinstance(s, str) else s
    c = CAST.get(s.get("who"), {}) if s.get("who") else {}
    c = {"voice": c} if isinstance(c, str) else c
    tone = tone or {}
    voice = s.get("voice") or c.get("voice") or tone.get("voice") or cfg["voice"]
    spd = s.get("speed") or c.get("speed") or tone.get("speed") or cfg["speed"]
    return s["text"], voice, spd, s.get("beat", 0), bool(s.get("who") or s.get("voice"))

if "--check" in sys.argv:
    for say, tone in zip(cfg["scenes"], TONES):
        for raw in say:
            s, voice, spd, _, ch = spec(raw, tone)
            sp = spoken(s)
            tag = f"   [{raw.get('who') or 'voice'}: {voice}, {spd}]" if ch else ""
            print(s + tag, "\n   ", ("spoken: " + sp + "\n    ") if sp != s else "", phon(s))
    sys.exit()

SR, GAP = 24000, cfg.get("gap", 0.28)
rms = lambda a: float(np.sqrt(np.mean(a[np.abs(a) > 0.01] ** 2)))
lines = []   # per scene: [(text, audio, beat, is_character)]
for say, tone in zip(cfg["scenes"], TONES):
    sc = []
    for raw in say:
        s, voice, spd, beat, ch = spec(raw, tone)
        audio, _ = k.create(phon(s), voice=voice_of(voice), speed=spd, is_phonemes=True)
        nz = np.where(np.abs(audio) > 0.01)[0]
        sc.append((s, audio[max(0, nz[0] - 600): nz[-1] + 1200], beat, ch))
    lines.append(sc)
narr = [rms(a) for sc in lines for (_, a, _, ch) in sc if not ch]
ref = float(np.median(narr)) if narr else None
out, wavs = [], []
for i, (sc, tone) in enumerate(zip(lines, TONES)):
    tone = tone or {}
    gap, gain = tone.get("gap", GAP), 10 ** (tone.get("gain", 0) / 20)
    chunks, tim, t = [], [], 0.0
    for s, audio, beat, ch in sc:
        if ch and ref: audio = audio * min(2.0, max(0.5, ref / rms(audio)))
        audio = (audio * gain).astype(np.float32)
        if beat:
            chunks.append(np.zeros(int(beat * SR), dtype=np.float32))
            t += beat
        d = len(audio) / SR
        tim.append(dict(text=s, start=round(t, 3), end=round(t + d, 3)))
        chunks += [audio, np.zeros(int(gap * SR), dtype=np.float32)]
        t += d + gap
    wav = np.concatenate(chunks[:-1])
    wavs.append(wav)
    out.append(dict(sentences=tim, length=round(len(wav) / SR, 3)))
    print(i, round(len(wav) / SR, 2), "s")
json.dump(out, open(os.path.join(D, "timings.json"), "w"), indent=1)

fps = cfg["fps"]
# lead/tail: one value for every scene, or one per scene (STORY.flow: short breaths between scenes)
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
