#!/usr/bin/env bash
# One-time setup per session: Python TTS deps, Kokoro models, font check, Playwright, HyperFrames CLI warm-up.
set -e
cd "$(dirname "$0")"
PKGS="kokoro-onnx soundfile"

# kokoro-onnx needs Python < 3.14. Use the system Python when it works, otherwise a uv-managed
# Python 3.13 in .venv (narrate.py switches to it by itself, so `python3 narrate.py` still works).
py_ok() { python3 -c 'import sys; sys.exit(sys.version_info >= (3, 14))' 2>/dev/null; }
pip_install() {
  py_ok && python3 -m pip --version >/dev/null 2>&1 || return 1
  python3 -m pip install --break-system-packages -q $PKGS >/dev/null 2>&1 || python3 -m pip install -q $PKGS >/dev/null 2>&1
}
# The venv's Python lives in Scripts/ on Windows (Git Bash).
VPY=.venv/bin/python; case "$(uname -s)" in MINGW*|MSYS*|CYGWIN*) VPY=.venv/Scripts/python.exe ;; esac
if [ -x $VPY ] && $VPY -c 'import kokoro_onnx, soundfile' 2>/dev/null; then
  echo "voice: using .venv"
elif python3 -c 'import kokoro_onnx, soundfile' 2>/dev/null; then
  echo "voice: using system Python"
elif pip_install; then
  echo "voice: installed for system Python"
else
  export PATH="$HOME/.local/bin:$PATH"
  command -v uv >/dev/null || curl -LsSf https://astral.sh/uv/install.sh | env UV_NO_MODIFY_PATH=1 sh >/dev/null 2>&1
  uv venv -q --allow-existing --python 3.13 .venv
  uv pip install -q --python $VPY $PKGS
  echo "voice: installed in .venv (Python 3.13, via uv)"
fi

mkdir -p models work
R=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -s models/voices-v1.0.bin ] || curl -sSL -o models/voices-v1.0.bin $R/voices-v1.0.bin
[ -s models/kokoro-v1.0.onnx ] || curl -sSL -o models/kokoro-v1.0.onnx $R/kokoro-v1.0.onnx   # ~325 MB
# Fonts come from google/fonts (OFL) unless the system already has them.
GF=https://raw.githubusercontent.com/google/fonts/main/ofl
mkdir -p fonts
fetch_font() { [ -f fonts/$1 ] || [ -f /usr/share/fonts/truetype/google-fonts/$1 ] || curl -fsSL -o fonts/$1 "$2" || rm -f fonts/$1; }
fetch_font Lora-Variable.ttf "$GF/lora/Lora%5Bwght%5D.ttf"
fetch_font Poppins-Medium.ttf "$GF/poppins/Poppins-Medium.ttf"
fetch_font Poppins-Bold.ttf "$GF/poppins/Poppins-Bold.ttf"
for f in Lora-Variable.ttf Poppins-Medium.ttf Poppins-Bold.ttf; do
  [ -f fonts/$f ] || [ -f /usr/share/fonts/truetype/google-fonts/$f ] || echo "WARN: font $f missing (falls back to DejaVu)"
done
command -v ffmpeg >/dev/null || echo "WARN: ffmpeg missing"

# `build.mjs thumb` needs Playwright: from the kit's node_modules or a global install.
if [ ! -d node_modules/playwright ] && [ ! -d "$(npm root -g)/playwright" ]; then
  npm install --no-save --no-package-lock --silent playwright
  npx playwright install chromium >/dev/null 2>&1
  echo "playwright ready"
fi

npx -y hyperframes@0.9.4 --version >/dev/null 2>&1 && echo "hyperframes ready"
echo "kit ready: $(pwd)"
