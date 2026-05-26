#!/bin/zsh
set -euo pipefail

PROJECT_ROOT="/Users/viola/All/Yandex.Disk.localized/3 Process/8 Vibe Coding/AIM Website/V3 Site Repo - aimwebsite0.5"
PORT="3001"
URL="http://127.0.0.1:${PORT}/#cases"

cd "$PROJECT_ROOT"

if lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  open "$URL"
  exit 0
fi

npm run dev -- --host 0.0.0.0 --port "$PORT" >/tmp/aim-v3-current-site-preview.log 2>&1 &
sleep 2
open "$URL"
