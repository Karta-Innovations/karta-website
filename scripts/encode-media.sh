#!/usr/bin/env bash
# Derive the web footage in public/media from the marketing masters.
#
#   FFMPEG=/path/to/ffmpeg scripts/encode-media.sh "<marketing package dir>" [name ...]
#
# With no names every clip is rebuilt. Loops ship without audio. ASSETS.md says
# what each clip is used for, and which masters are deliberately not used.
set -euo pipefail

SRC="${1:?usage: encode-media.sh <marketing package dir> [name ...]}"
shift || true
ONLY=("$@")
FF="${FFMPEG:-ffmpeg}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT"

run() {
  local name="$1"
  if [ "${#ONLY[@]}" -eq 0 ] || printf '%s\n' "${ONLY[@]}" | grep -qx "$name"; then
    echo "== $name"
    return 0
  fi
  return 1
}
poster() { "$FF" -v error -y -ss "$2" -i "$1" -frames:v 1 -q:v 3 "$3"; }
x264=(-c:v libx264 -preset slow -pix_fmt yuv420p -movflags +faststart)

# TENERE: a survey mission inside its geofence volume (screen recording, desktop bar cropped).
if run tenere-mission; then
  "$FF" -v error -y -t 38 -i "$SRC/tenere_quad2.mp4" \
    -vf "crop=1920:1052:0:28,scale=1600:-2,setpts=PTS/1.25,fps=30,format=yuv420p" \
    -an "${x264[@]}" -crf 30 "$OUT/tenere-mission.mp4"
  poster "$OUT/tenere-mission.mp4" 4 "$OUT/tenere-mission-poster.jpg"
fi

ls -la "$OUT"
