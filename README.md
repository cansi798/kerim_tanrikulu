# Kerim Tanrikulu – Website

Neue Website für Kerim Mikael Tanrikulu, allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für Deutsch und Türkisch.

- **Vorschau:** https://cansi798.github.io/kerim_tanrikulu/ (noindex, robots gesperrt, Vorschau-Banner)
- **Ziel-Domain:** dolmetscher-kt.de
- **Quelle:** Branch `quelle` (Astro, rein statisch; ein kleines eigenes Skript `public/sichtbar.js` startet Animationen beim Sichtbarwerden – ohne JavaScript ist alles lesbar). **Gebaute Seite:** Branch `main` (GitHub Pages, „Deploy from branch main /“).

## Aufbau

- `src/daten.ts` – alle Angaben an einer Stelle (Kontakt, Qualifikation, Dokumente, Erfahrungen, Fragen, Navigation, Vorschau-Schalter). Seiten, JSON-LD, `sitemap.xml`, `llms.txt` und `robots.txt` lesen von hier.
- `src/components/Platzhalter.astro` – sichtbare Platzhalter, nur in der Vorschau. `Luecke.astro` – Pflichtangaben im Impressum/Datenschutz, immer markiert.
- **Design v3 „Zwei Ufer“** (30.10.2026, Redesign nach Can und Jamil Talk 3887–3898): Tinte als Bühne, Gold als Faden, Siegelrot für die Beglaubigung, Bütten als Lesefläche. Hero mit Logo, Name und Leitsatz; die Feder schreibt, der Faden verbindet „Deutsch“ und „Türkçe“. Szenen statt Text: `SzeneBeglaubigung.astro`, `SzeneDolmetschen.astro`, `Ablauf.astro`, `Nachweise.astro` (Siegel). Jede Szene läuft einmal beim Sichtbarwerden, höchstens 1,5 s; bei reduzierter Bewegung sofort das Endbild.
- **Logo (Entwurf, Freigabe durch den Kunden nötig):** Federspitze, deren zwei Zinken sich in einem Punkt treffen, plus Wortmarke „Tanrikulu Translations“. Dateien in `public/logo/` (SVG hell/dunkel/einfarbig, Siegel, App-Icon); `src/components/Logo.astro` (Kopfzeile), `Feder.astro` (Bildzeichen, animierbar). Das CI-Handbuch liegt nicht im Repo, sondern in Nextcloud (Kerim_Tanrikulu/CI).
- **Frühere Designs** zum Vergleich: Tags `design-v1`/`design-v1-main` und `design-v2`/`design-v2-main` (jeweils Quelle/gebaute Seite).
- Schriften lokal (fontsource, variabel): Bodoni Moda (Überschriften, Logo), Hanken Grotesk (Text). Keine externen Dienste, keine Cookies, kein Tracking.
- Content-Security-Policy als Meta-Tag (keine Inline-Skripte, keine Inline-Styles).

## Bauen und veröffentlichen

Kein Node auf dem Server, alles in Docker:

```bash
bash scripts/bauen.sh             # Vorschau-Build + Linkprüfung (H1, Inline-Code, 404, Anker)
bash scripts/veroeffentlichen.sh  # dist/ als normalen Commit auf main (kein Force-Push)
```

Livegang auf der eigenen Domain:

```bash
SITE=https://dolmetscher-kt.de BASE=/ VORSCHAU=false bash scripts/bauen.sh
```

Dann: Platzhalter sind ausgeblendet, `robots.txt` erlaubt alles und nennt die Sitemap, kein noindex. Vorher alle Punkte in `OFFENE-INFOS.md` klären, Hosting-Abschnitt der Datenschutzerklärung anpassen.

## Bildschirmfotos

```bash
docker run --rm --shm-size=1g -v "$PWD/scripts":/s:ro -v "$PWD/screens":/aus \
  -v <node_modules mit playwright 1.48.2>:/nm:ro -e NODE_PATH=/nm -e AUS=/aus \
  mcr.microsoft.com/playwright:v1.48.2-jammy node /s/screens.cjs
```

390 und 1440 px, meldet Querscrollen. `URL=` setzt eine andere Basisadresse.
