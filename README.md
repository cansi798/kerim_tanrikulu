# Kerim Tanrikulu – Website

Neue Website für Kerim Mikael Tanrikulu, allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für Deutsch und Türkisch.

- **Vorschau:** https://cansi798.github.io/kerim_tanrikulu/ (noindex, robots gesperrt, Vorschau-Banner)
- **Ziel-Domain:** dolmetscher-kt.de
- **Quelle:** Branch `quelle` (Astro, rein statisch; ein kleines eigenes Skript `public/sichtbar.js` startet Animationen beim Sichtbarwerden – ohne JavaScript ist alles lesbar). **Gebaute Seite:** Branch `main` (GitHub Pages, „Deploy from branch main /“).

## Aufbau

- `src/daten.ts` – alle Angaben an einer Stelle (Kontakt, Qualifikation, Dokumente, Erfahrungen, Fragen, Navigation, Vorschau-Schalter). Seiten, JSON-LD, `sitemap.xml`, `llms.txt` und `robots.txt` lesen von hier.
- `src/components/Platzhalter.astro` – sichtbare Platzhalter, nur in der Vorschau. `Luecke.astro` – Pflichtangaben im Impressum/Datenschutz, immer markiert.
- **Design v3d** (31.10.2026, Jamil Talk 3910): Aufbau und Hero-Bewegung nach Bauwelt (Vollbild-Hero mit langsamem Zoom des Hintergrunds, gestaffeltes Aufsteigen, Scroll-Pfeil wippt einmal; dunkle Vertrauensleiste; zentrierte Abschnittsköpfe mit goldener Kurzlinie; Karten; Fragen auf der Startseite; Kopfzeile mit Hauptknopf und Fortschrittsleiste). Schriften Source Serif 4 + Open Sans. Keine gezeichneten Strich-Animationen mehr; ruhige Bilder `BildUebersetzung.astro`, `BildDolmetschen.astro`, `Vertrauensband.astro`. v3c gesichert als `design-v3c`/`design-v3c-main`.
- **Design v3c** (31.10.2026, Jamil Talk 3907): elegantes Beige statt Violett, bisheriges Logo (Nachbau, `Logo.astro`, Schrift als Pfade), Hero ohne Portrait, Sprachbrücke groß rechts mit Lichtpunkt alle 10 s, Subheadline „Für Behörden, Gerichte und andere offizielle Stellen.“, Karten 0,15 s versetzt. v3b gesichert als `design-v3b`/`design-v3b-main`.
- **Design v3b** (31.10.2026, Jamil Talk 3904): Startseiten-Kopf nach Jamils Hero-Konzept (Trust-Badge, Leistungs-H1, Portrait-Platz `Portrait.astro`, Sprachbrücke Deutsch–Türkisch ca. 2 s, drei Karten, Scroll-Hinweis). **Strenge Faktenregel:** nur Angaben der bisherigen Website; auch Zeichnungen behaupten nichts (keine Siegel, keine Beispielsätze). v3a gesichert als Tags `design-v3a`/`design-v3a-main`.
- **Design v3 „Zwei Ufer“** (30.10.2026, Redesign nach Can und Jamil Talk 3887–3898): Tinte als Bühne, Gold als Faden, Siegelrot für die Beglaubigung, Bütten als Lesefläche. Szenen statt Text: `SzeneUebersetzung.astro`, `SzeneDolmetschen.astro`, `Nachweise.astro`. Jede Szene läuft einmal beim Sichtbarwerden, höchstens 1,5 s; bei reduzierter Bewegung sofort das Endbild.
- **Logo:** bisheriges Logo als Nachbau (Jamil 3907). Ein neuer Logo-Entwurf mit CI-Handbuch liegt nur als Vorschlag in Nextcloud (Kerim_Tanrikulu/CI), nicht im Repo.
- **Frühere Designs** zum Vergleich: Tags `design-v1`/`design-v1-main` und `design-v2`/`design-v2-main` (jeweils Quelle/gebaute Seite).
- Schriften lokal (fontsource, variabel): Source Serif 4 (Überschriften), Open Sans (Text). Keine externen Dienste, keine Cookies, kein Tracking.
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
