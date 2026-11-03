#!/usr/bin/env bash
# One-time setup per session: Python TTS deps, Kokoro models, font check, HyperFrames CLI warm-up.
set -e
cd "$(dirname "$0")"
pip install --break-system-packages -q kokoro-onnx soundfile >/dev/null 2>&1 || pip install -q kokoro-onnx soundfile
mkdir -p models work
R=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -s models/voices-v1.0.bin ] || curl -sSL -o models/voices-v1.0.bin $R/voices-v1.0.bin
[ -s models/kokoro-v1.0.onnx ] || curl -sSL -o models/kokoro-v1.0.onnx $R/kokoro-v1.0.onnx   # ~325 MB
for f in Lora-Variable.ttf Poppins-Medium.ttf Poppins-Bold.ttf; do
  [ -f fonts/$f ] || [ -f /usr/share/fonts/truetype/google-fonts/$f ] || echo "WARN: font $f missing (falls back to DejaVu)"
done
command -v ffmpeg >/dev/null || echo "WARN: ffmpeg missing"
npx -y hyperframes@0.9.4 --version >/dev/null 2>&1 && echo "hyperframes ready"
echo "kit ready: $(pwd)"
