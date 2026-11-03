"""Free offline narration with Kokoro TTS (Apache-2.0).
  python3 narrate.py work/<slug> --check   # print phonemes per sentence (find mispronounced names)
  python3 narrate.py work/<slug>           # timings.json + narration.wav (aligned to the scenes)
Reads work/<slug>/say.json written by `node build.mjs <story> say`.
"""
import json, os, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

D = sys.argv[1]
cfg = json.load(open(os.path.join(D, "say.json")))
KIT = os.path.dirname(os.path.abspath(__file__))
k = Kokoro(os.path.join(KIT, "models/kokoro-v1.0.onnx"), os.path.join(KIT, "models/voices-v1.0.bin"))

def phon(s):
    ph = k.tokenizer.phonemize(s, cfg["lang"])
    for a, b in cfg["fix"].items():
        ph = ph.replace(a, b)
    return ph

if "--check" in sys.argv:
    for say in cfg["scenes"]:
        for s in say:
            print(s, "\n   ", phon(s))
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
