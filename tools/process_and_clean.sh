#!/usr/bin/env bash
# Process raw PNGs -> JPGs, commit the JPGs, push, then empty raw-images.
# Usage: tools/process_and_clean.sh "commit message"
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

MSG="${1:-Update processed simulation images}"

echo "== processing raws =="
python3 tools/name_images.py

echo "== staging processed JPGs =="
git add private/images/docs/

echo "== staging any doc changes you already made =="
git add content/docs/ 2>/dev/null || true

git --no-pager status --short
if git diff --cached --quiet; then
  echo "nothing to commit"
else
  git commit -m "$MSG"
  git push
fi

echo "== emptying local raw-images =="
find raw-images/ -type f -delete
echo "done. raw-images cleared."
