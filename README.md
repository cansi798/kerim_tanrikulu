# Kerim Tanrikulu – Website

Neue Website für Kerim Mikael Tanrikulu, allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für Deutsch und Türkisch.

- **Vorschau:** https://cansi798.github.io/kerim_tanrikulu/ (noindex, robots gesperrt, Vorschau-Banner)
- **Ziel-Domain:** dolmetscher-kt.de
- **Quelle:** Branch `quelle` (Astro, rein statisch, ohne JavaScript im Browser). **Gebaute Seite:** Branch `main` (GitHub Pages, „Deploy from branch main /“).

## Aufbau

- `src/daten.ts` – alle Angaben an einer Stelle (Kontakt, Qualifikation, Dokumente, Erfahrungen, Fragen, Navigation, Vorschau-Schalter). Seiten, JSON-LD, `sitemap.xml`, `llms.txt` und `robots.txt` lesen von hier.
- `src/components/Platzhalter.astro` – sichtbare Platzhalter, nur in der Vorschau. `Luecke.astro` – Pflichtangaben im Impressum/Datenschutz, immer markiert.
- `src/components/Logo.astro` – **Nachbau** des Logos (Federkiel + Schriftzug), bis das Original vorliegt.
- **Design v2** (30.10.2026, nach Jamils Rückmeldung „wärmer, edler, hochwertiger“): Elfenbein/Pergament, Tinte (Logo-Navy), feine Messinglinien. Im Hero schreibt die Feder aus dem Logo eine Brücke von „Deutsch“ nach „Türkçe“ (`src/components/Bruecke.astro`, SVG-Animation ohne JavaScript, einmalig, bei reduzierter Bewegung sofort das Endbild).
- **Design v1** zum Vergleich: Tags `design-v1` (Quelle) und `design-v1-main` (gebaute Seite).
- Schriften lokal: Libre Caslon Display/Text (Überschriften, Zitate), Jost (Text), Cormorant Garamond nur für den Logo-Nachbau. Keine externen Dienste, keine Cookies, kein Tracking.
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
