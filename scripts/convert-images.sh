#!/bin/bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")/../public/images/portfolio" && pwd)"

count=0
for heic in "$DIR"/*.heic "$DIR"/*.HEIC; do
  [ -f "$heic" ] || continue
  jpg="${heic%.*}.jpg"
  echo "Converting $(basename "$heic") → $(basename "$jpg")"
  sips -s format jpeg -s formatOptions 85 "$heic" --out "$jpg" >/dev/null
  rm "$heic"
  count=$((count + 1))
done

if [ "$count" -eq 0 ]; then
  echo "No HEIC files found in $DIR"
else
  echo "Done — converted $count file(s)"
fi
