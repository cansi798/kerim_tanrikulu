#!/usr/bin/env bash
# Veröffentlicht dist/ (+ .nojekyll) als neuen Commit auf main (GitHub Pages: Branch main, /).
# Kein Force-Push: main behält seine Historie, jeder Deploy ist ein normaler Commit.
set -euo pipefail
cd "$(dirname "$0")/.."
QUELLE="$(git rev-parse --short HEAD)"
[ -f dist/index.html ] || { echo "Erst bauen: bash scripts/bauen.sh"; exit 1; }
git fetch -q origin main
rm -rf .deploy && git worktree add -q .deploy origin/main
git -C .deploy checkout -q -B main origin/main
# Gehashte Dateien (_astro/*) der bisher veröffentlichten Fassung behalten: Der GitHub-Zwischenspeicher liefert eine alte
# HTML-Seite bis zu 10 Minuten weiter aus – sie muss ihre eigenen Skripte/Styles dann noch finden (Jamil Talk #5237, 09.11.2026).
# Nur die Vorgängerfassung wird behalten (von deren HTML/CSS/JS referenziert), ältere fallen weg.
ALT="$(mktemp -d)"
if [ -d .deploy/_astro ]; then
  grep -rhoE '[A-Za-z0-9_@.-]+\.[A-Za-z0-9_-]{8}\.(js|css|woff2?|webp|avif|png|jpe?g|svg)' .deploy --include='*.html' --include='*.css' --include='*.js' 2>/dev/null \
    | sort -u | while read -r f; do [ -f ".deploy/_astro/$f" ] && cp ".deploy/_astro/$f" "$ALT/"; done
fi
find .deploy -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -r dist/. .deploy/
mkdir -p .deploy/_astro && cp -n "$ALT"/* .deploy/_astro/ 2>/dev/null || true
rm -rf "$ALT"
touch .deploy/.nojekyll
cp LICENSE .deploy/LICENSE   # Alle Rechte vorbehalten (Can 31.10.2026), auch im Root der gebauten Seite
printf '# Kerim Tanrikulu – gebaute Seite\n\nGebaute Vorschau. Quellcode im Branch `quelle`.\n' > .deploy/README.md
git -C .deploy add -A
if git -C .deploy diff --cached --quiet; then echo "Keine Änderungen."; else
  git -C .deploy commit -q -m "Gebaute Seite aus quelle@${QUELLE}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
  git -C .deploy push -q origin main
  echo "Veröffentlicht: main ← quelle@${QUELLE}"
fi
git worktree remove --force .deploy
