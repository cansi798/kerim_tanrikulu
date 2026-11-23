#!/usr/bin/env bash
# Baut das Upload-Paket für ALL-INKL (Livegang auf eigener Domain). Lädt NICHTS hoch – den Upload macht Can selbst per SFTP/FTPS.
# Aufruf:  bash scripts/allinkl-paket.sh            → release/kerim-allinkl-<datum>.zip (+ .sha256)
#          SITE=https://www.dolmetscher-kt.de bash scripts/allinkl-paket.sh   (falls die Domain mit www laufen soll; dann .htaccess anpassen)
# Die Vorschau (dist/ → GitHub Pages) bleibt unberührt: gebaut wird in einem temporären Ordner.
set -euo pipefail
cd "$(dirname "$0")/.."
SITE="${SITE:-https://dolmetscher-kt.de}"
ZIEL="$PWD/release"; DATUM="$(date +%Y%m%d-%H%M)"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
rsync -a --exclude .git --exclude dist --exclude node_modules --exclude release --exclude .deploy --exclude .astro ./ "$TMP/"
(cd "$TMP" && SITE="$SITE" BASE=/ VORSCHAU=false bash scripts/bauen.sh)
# Apache-Regeln (HTTPS, Sicherheits-Header, Caching, 404) dazulegen
cp -r allinkl/. "$TMP/dist/"
# Sicherheitsnetz: keine Vorschau-Reste, keine Geheimnisse, keine Quell-/Versteckdateien
grep -rlq 'name="robots" content="noindex, nofollow"' "$TMP/dist/index.html" && { echo "ABBRUCH: Startseite hat noindex (Vorschau-Build)"; exit 1; }
if find "$TMP/dist" \( -name '.env*' -o -name '*.map' -o -name '.git' -o -name '*.bak' -o -name '*.sql' \) | grep -q .; then echo "ABBRUCH: verbotene Datei im Paket"; exit 1; fi
OFFEN="$(grep -rl 'class="luecke"' "$TMP/dist" | sed "s|$TMP/dist/||" || true)"
mkdir -p "$ZIEL"
python3 - "$TMP/dist" "$ZIEL/kerim-allinkl-$DATUM.zip" <<'PY'
import sys, zipfile, pathlib
src = pathlib.Path(sys.argv[1]); out = sys.argv[2]
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for f in sorted(src.rglob("*")):
        if f.is_file(): z.write(f, f.relative_to(src).as_posix())
print("Paket:", out)
PY
(cd "$ZIEL" && sha256sum "kerim-allinkl-$DATUM.zip" > "kerim-allinkl-$DATUM.zip.sha256" && cat "kerim-allinkl-$DATUM.zip.sha256")
if [ -n "$OFFEN" ]; then
  echo; echo "ACHTUNG – NICHT HOCHLADEN: Pflichtangaben fehlen noch (rot markierte Lücken) in:"; echo "$OFFEN" | sed 's/^/  /'
  echo "Erst die Angaben von Kerim eintragen (src/seiten/Impressum.astro, Datenschutz.astro), dann neu bauen."; exit 3
fi
echo "Inhalt des ZIPs in den Webordner der Domain hochladen (nicht den Ordner selbst). Danach Live-Test laut RELEASE-AUDIT.md."
