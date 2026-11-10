#!/usr/bin/env bash
# Interleaved HyperFrames benchmark (see experiments/README.md): rounds x configs, records wall time and the capture/encode
# phase times from HyperFrames' trace. Needs work/bench_<mode>/index.html first (BENCH=<mode> node build.mjs
# experiments/three/bench_3d.mjs html; add NO3D=1 for svg). Interleave runs: the machine's own load swings timings a lot.
#   ROUNDS=3 CONFIGS="svg:none vec:none" bash experiments/bench_round.sh
KIT="$(cd "$(dirname "$0")/.." && pwd)"
K="$KIT/work"; O="${OUT:-$KIT/work/bench_out}"; RES="$O/results.tsv"
ROUNDS=${ROUNDS:-3}
CONFIGS=${CONFIGS:-"svg:none vec:none svg:fast vec:fast"}
mkdir -p "$O"
for r in $(seq 1 $ROUNDS); do
  for c in $CONFIGS; do
    m=${c%%:*}; opt=${c##*:}
    extra=""; [ "$opt" = fast ] && extra="--experimental-fast-capture=true"
    log="$K/bench_$m/trace_${opt}_$r.log"
    s=$(date +%s%N)
    (cd "$K/bench_$m" && npx -y hyperframes@0.9.4 render . -o "$O/rnd_${m}_${opt}.mp4" --fps 30 --workers 10 --browser-gpu $extra > "$log" 2>&1)
    e=$(date +%s%N)
    cap=$(grep -o '"phase":"capture_disk","status":"end","elapsedMs":[0-9]*,"durationMs":[0-9]*' "$log" | head -1 | grep -o 'durationMs":[0-9]*' | cut -d: -f2)
    enc=$(grep -o '"phase":"encode","status":"end","elapsedMs":[0-9]*,"durationMs":[0-9]*' "$log" | head -1 | grep -o 'durationMs":[0-9]*' | cut -d: -f2)
    mode=$(grep -o '"captureMode":"[^"]*"' "$log" | sort | uniq -c | tr -s ' ' | tr '\n' ' ')
    printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\n" "$r" "$m" "$opt" "$(( (e-s)/1000000 ))" "$cap" "$enc" "$mode" | tee -a "$RES"
  done
done
