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
    if os.path.abspath(sys.prefix) != venv and os.path.exists(os.path.join(venv, "bin/python")):
        os.execv(os.path.join(venv, "bin/python"), [os.path.join(venv, "bin/python")] + sys.argv)
    raise

D = sys.argv[1]
cfg = json.load(open(os.path.join(D, "say.json")))
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

if "--check" in sys.argv:
    for say in cfg["scenes"]:
        for s in say:
            sp = spoken(s)
            print(s, "\n   ", ("spoken: " + sp + "\n    ") if sp != s else "", phon(s))
    sys.exit()

SR, GAP = 24000, 0.28
out, wavs = [], []
for i, say in enumerate(cfg["scenes"]):
    chunks, tim, t = [], [], 0.0
    for s in say:
        audio, _ = k.create(phon(s), voice=cfg["voice"], speed=cfg["speed"], is_phonemes=True)
        nz = np.where(np.abs(audio) > 0.01)[0]
        audio = audio[max(0, nz[0] - 600): nz[-1] + 1200]
        d = len(audio) / SR
        tim.append(dict(text=s, start=round(t, 3), end=round(t + d, 3)))
        chunks += [audio, np.zeros(int(GAP * SR), dtype=audio.dtype)]
        t += d + GAP
    wav = np.concatenate(chunks[:-1])
    wavs.append(wav)
    out.append(dict(sentences=tim, length=round(len(wav) / SR, 3)))
    print(i, round(len(wav) / SR, 2), "s")
json.dump(out, open(os.path.join(D, "timings.json"), "w"), indent=1)

lead, tail, fps = cfg["lead"], cfg["tail"], cfg["fps"]
dur = [o["length"] + lead + tail for o in out]
total = round(sum(dur) * fps) / fps
track = np.zeros(int(total * SR) + SR, dtype=np.float32)
start = 0.0
for i, w in enumerate(wavs):
    s = int((start + lead) * SR)
    track[s:s + len(w)] += w
    start += dur[i]
track = track[:int(total * SR)]
track = track / max(1e-6, np.abs(track).max()) * 0.9
sf.write(os.path.join(D, "narration.wav"), track, SR)
print("narration.wav", round(total, 2), "s")
