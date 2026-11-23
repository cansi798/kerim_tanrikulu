# RELEASE-AUDIT – Astro → ALL-INKL

**Projekt:** Website Kerim Mikael Tanrikulu („Tanrikulu Translations“), WS-0005 – allgemein beeidigter Dolmetscher und ermächtigter Übersetzer Türkisch, Standort Hamburg, Einsatz deutschlandweit
**Datum / Zeitzone:** 2026-11-23, 02:08–03:15 Europe/Berlin
**Version / Commit:** Quelle `quelle` ab 978d866, Prüf-Commits eae9c90, f7f55d6, f61b466, 8577493 und der Commit mit diesem Bericht (Branch `release-audit-20261123`)
**Prüfer / Agent:** Jan (Claude, Skill `astro-allinkl-release-auditor`)
**Zieldomain & Serverpfad:** https://dolmetscher-kt.de (ohne www), Webordner der Domain im ALL-INKL-KAS – `[BETREIBERANGABE ERFORDERLICH: genauer Zielordner, wessen ALL-INKL-Vertrag]`
**Vorschau:** https://cansi798.github.io/kerim_tanrikulu/ (noindex, mit Platzhalter-Markierungen)
**Geschäftsmodell / Rechtsgeltung:** Einzelunternehmer (freiberuflich), Lead-Website ohne Online-Vertragsschluss, B2C und Behörden/Gerichte. Kein Shop, kein Abo, kein Konto, keine Zahlung, kein Tracking, keine Cookies. Anfrageformular nur im Browser (Versand über eigenes E-Mail-Programm oder WhatsApp-Link).
**Stand der Rechtsquellen:** 23.11.2026 – § 5 DDG https://www.gesetze-im-internet.de/ddg/__5.html · § 25 TDDDG https://www.gesetze-im-internet.de/ttdsg/__25.html · DSGVO https://eur-lex.europa.eu/eli/reg/2016/679/oj · § 36 VSBG https://www.gesetze-im-internet.de/vsbg/__36.html · GDolmG § 6/§ 7 https://www.gesetze-im-internet.de/gdolmg/__6.html (am 23.11.2026 abgerufen) · BFSG § 1/§ 3 https://www.gesetze-im-internet.de/bfsg/__1.html

> Risikoprüfung, keine Rechtsberatung. Keine Aussage „rechtssicher“ oder „DSGVO-konform“.

## 1. Loop-Protokoll

**Vorgegebene Dauer:** bis 07:00 (Can, 23.11.2026 02:08), Arbeitsende spätestens 06:50
**Tatsächlich ausgeführte Runden:** 5
**Abschlussgrund:** Ziele erreicht – alle technischen P0/P1 behoben, Runden 4 und 5 ohne neue P0/P1. Was übrig ist, sind Angaben, die nur Kerim/Can liefern können; weitere Runden würden daran nichts ändern (kein Leerlauf-Loop laut Skill).

| Runde | Prüfzeit | P0 | P1 | P2 | Änderungen (Dateien) | Tests / Nachweise |
|---|---|---:|---:|---:|---|---|
| 1 | 02:08–02:40 | 0 | 2 technisch (Hero-Karte abgeschnitten 768–1000 px; Pflichtlinks fehlten auf Weiterleitungen) + preflight 34 (davon 30 TR-Fußlink-Heuristik, 4 GET-Formular) | 17 | Start.astro, Weiterleitung.astro, hero-variante (DE/TR), i18n.ts, texte/tr.ts, Anfrage.astro, allinkl/.htaccess, allinkl/_astro/.htaccess, scripts/allinkl-paket.sh, scripts/veroeffentlichen.sh, .gitignore, OFFENE-INFOS.md – Commit eae9c90 | Chrome 17 Seiten × 8 Breiten (1004 Prüfungen), Apache-Test der .htaccess, preflight vorher/nachher |
| 2 | 02:40–02:50 | 0 | 0 neu | 9 | package-lock.json (astro 7.4.13), Datenschutz.astro, Impressum.astro, Basis.astro – Commit f7f55d6 | npm audit 2 moderate → 0, WebKit 391, Formular DE/TR 40, Tastatur 12, Lighthouse |
| 3 | 02:50–02:56 | 0 | 1 (Fokus unter fester Kontaktleiste, WCAG 2.4.11) | – | Fuss.astro – Commit f61b466 | Verdeckungstest 12/12, Kontaktdaten-Konsistenz, JSON-LD, Titel |
| 4 | 02:56–03:05 | 0 | 0 | – | scripts/release-pruefung.cjs – Commit 8577493 | 200 %-Zoom/Querformat 238, WebKit 543 (1 nicht reproduzierbarer Animations-Kontrast) |
| 5 | 03:05–03:15 | 0 | 0 | 10 (alle begründet) | RELEASE-AUDIT.md, release-preflight.md | Endpaket in Apache: 544 Prüfungen 0 Fehler, Lighthouse, preflight 0 P0/P1 |

## 2. Pflichtcheck – kompakte Statusmatrix

| Bereich | Status | Nachweis | offene Risiken |
|---|---|---|---|
| Recht: Impressum / Datenschutz | ❌ blockiert | Seiten vorhanden, von jeder Seite im Fuß verlinkt (auch Weiterleitungen, TR mit „Künye (Impressum)“) | Anschrift, Urkunden-Angaben, USt-ID/VSBG-Entscheidung, AV-Vertrag, Speicherdauer, Aufsichtsbehörde fehlen → `[BETREIBERANGABE ERFORDERLICH]`, siehe 5. |
| Consent / TDDDG / DSGVO | ✅ | keine Cookies, kein Local/Session Storage (Code-Suche), 0 Fremd-Requests auf allen Seiten (Browser-Netzwerkprotokoll), Schriften lokal, WhatsApp nur Link → kein Banner nötig | WhatsApp-Abschnitt ist Entwurf (prüfen lassen) |
| Zusatzpflichten (BFSG/B2C etc.) | ⚠️ offen | kein Online-Vertragsschluss → §§ 312i/j/k, 356a BGB nicht einschlägig; BFSG: Dienstleistung ohne Vertragsschluss auf der Seite, zudem vermutlich Kleinstunternehmen → voraussichtlich nicht erfasst | GDolmG-Übergangsfrist (siehe 5.), VSBG-Entscheidung |
| Clean Design / Brand | ✅ | Jamils Vorgaben unverändert: #1D315A, #EFE6D6, Gold #C89B3C nur Conversion, Kopf/Fuß blau, Creme/Weiß-Wechsel, Ich-Form | Logo ist Nachbau (Original-Datei fehlt) |
| Mobile 320–430 | 🛠️ behoben | 320/360/390/430: kein Querscrollen, Fokus nicht unter Leiste | – |
| Tablet 768–1024 | 🛠️ behoben | 3. Hero-Karte war abgeschnitten → minmax(0,1fr) + Tablet-Layout | – |
| Desktop 1440–1920 | ✅ | 1440/1920 ohne Befund | – |
| Customer Journey / Conversion | ✅ | Formular DE/TR durchgespielt (Übersetzung, Fehlerfälle, Zusammenfassung, mailto/WhatsApp-Text) | „Schnell“ im Hero unbelegt (Kerim bestätigen) |
| SEO / Marketing | ✅ | Titel eindeutig, Beschreibung je Seite, canonical/hreflang/Sitemap auf Domain, robots live offen, 404 noindex, JSON-LD gültig | Beschreibungen teils >160 Zeichen, 2 Titel >60 Zeichen (P3) |
| WCAG / Accessibility | ✅ | axe WCAG 2.2 AA 0 Verstöße (Chrome + WebKit, 390/1440), Skiplink, Tastatur-Menüs, Lighthouse A11y 100 | Screenreader-Test mit echtem Gerät nicht gemacht (OFFEN) |
| Astro Build / Dependencies | 🛠️ behoben | astro 7.4.13, npm audit 0, 25 Seiten, Linkprüfung 0 Fehler | – |
| Security / Webapp / PHP | ✅ | statisch, kein PHP im Paket; CSP (meta + Header, frame-ancestors), nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, Dotfiles 403, Verzeichnislisting aus; Formular method=post + form-action 'none' | HSTS bewusst aus bis HTTPS live geprüft |
| ALL-INKL-Uploadpaket | ✅ | `bash scripts/allinkl-paket.sh` → release/kerim-allinkl-20261123-0305.zip (79 Dateien, SHA-256 eb863a19…99a0), in php:8.3-apache getestet | Skript bricht mit Warnung ab, solange Lücken markiert sind |
| Live-PHP / E-Mail / SSL | ⚠️ offen | kein PHP; Live-Test nach Upload nötig (SSL, Redirects, Header bei ALL-INKL) | – |

Detailcheck nach `references/checkliste.md`: siehe Abschnitte 3–5; nicht anwendbar (➖): Shop/Checkout, Login/Sessions, Datei-Upload, SQL, Newsletter, Cookie-Banner, PHP-Mailversand (Jamil #5251: kein Formular-Dienst; der lokale Branch `php-formular-entwurf` ist ungetestet und nicht Teil des Release).

## 3. Änderungen – vorher / nachher

| Priorität | Befund und Route | konkrete Änderung | Datei / Commit | Verifikation |
|---|---|---|---|---|
| P1 | `/`, `/tr/` 768–1000 px: 3. Leistungskarte rechts abgeschnitten | Grid `minmax(0,1fr)`, am Tablet Symbol/Pfeil oben, Text darunter, Silbentrennung | src/seiten/Start.astro – eae9c90 | Messung Kartenränder 768/1000/1100, Screenshots |
| P1 | Weiterleitungsseiten (themen, ratgeber, fragen, hero-variante, DE+TR) ohne Impressum/Datenschutz | Pflichtlinks + Beschreibung; hero-variante nutzt gemeinsame Weiterleitung | Weiterleitung.astro, i18n.ts, pages/(tr/)hero-variante.astro – eae9c90 | preflight: 0 P1 |
| P1 (Heuristik) | TR-Fuß „Künye“/„Veri koruma“ für deutsche Pflicht-Begriffe nicht erkennbar | „Künye (Impressum)“, „Veri koruma (Datenschutz)“ (Kerim prüfen) | src/texte/tr.ts – eae9c90 | preflight |
| P1 (Heuristik) | Formular ohne method (GET) – ohne CSP lägen Daten in der URL | `method="post"`; Versand weiter nur per Skript, CSP `form-action 'none'` | Anfrage.astro – eae9c90 | Formulartest: 0 Requests mit Daten |
| P1 | kein Server-Regelwerk für ALL-INKL | `allinkl/.htaccess` (HTTPS, ohne www, Header, 404, Caching, Kompression, Dotfiles), `_astro/.htaccess` (1 Jahr immutable) | allinkl/ – eae9c90 | Apache-Test: 301 https, 301 www, 404-Status, 403 Dotfiles, gzip, Header |
| P1 | Risiko: Livegang-Build könnte auf GitHub-Vorschau landen | veroeffentlichen.sh bricht ab, wenn dist kein Vorschau-Build ist; Paket wird im Temp-Ordner gebaut | scripts/ – eae9c90 | Skriptlauf |
| P2 | astro 7.4.1: 2 moderate Advisories (SSR/Node-Adapter) | Patch-Update 7.4.13 | package-lock.json – f7f55d6 | Diff: nur Datei-Hashes, 0 Advisories |
| P2 | Datenschutz: Hoster unbekannt | ALL-INKL eingetragen, Drittland-Lücke entfällt, Vertragspartner/AV markiert | Datenschutz.astro – f7f55d6 | Sichtprüfung |
| P2 | 404 mit canonical | live noindex, ohne canonical | Basis.astro – f7f55d6 | dist/404.html |
| P1 | WCAG 2.4.11: Tastatur-Fokus („Weiter“) unter fester Kontaktleiste | `scroll-padding-bottom` bis 66rem | Fuss.astro – f61b466 | Verdeckungstest 12/12 |
| P3 | Prüfung wiederholbar | scripts/release-pruefung.cjs | 8577493 | – |

## 4. Tests: **tatsächlich durchgeführt**

| Test | Befehl / Gerät / URL | Ergebnis | Zeitpunkt |
|---|---|---|---|
| Build | `bash scripts/bauen.sh` (Docker node:22), Live-Build `SITE=https://dolmetscher-kt.de BASE=/ VORSCHAU=false` | 25 Seiten, Link-/CSP-Prüfung 0 Fehler | jede Runde |
| Preflight | `preflight.py --dist <entpacktes Paket>` → `release-preflight.md` | P0 0 / P1 0 / P2 10 (8× noindex auf Weiterleitungen + 404 beabsichtigt, 1× „extern“ = eigene Domain in canonical/hreflang) | 03:06 |
| Browser Mobile | Chrome 147 headless 320/360/390/430 + WebKit (Playwright 1.48) 320/375/390 | 0 Fehler (kein Querscrollen, keine Konsolenfehler, keine Fremd-Requests) | R1–R5 |
| Browser Desktop | Chrome 768/1024/1440/1920, WebKit 768/1024/1440; Endpaket über Apache 320/390/1024/1440 | 0 Fehler (544 Prüfungen am Endpaket) | R5 03:08 |
| A11y | axe-core WCAG 2.0–2.2 AA bei 390/1440, Skiplink, Tastatur-Dropdown/Handy-Menü, Fokus-Verdeckung, 200 % (640 px) | 0 Verstöße; Lighthouse A11y 100 | R1–R5 |
| Lighthouse (Labor, Handy-Profil, Server unter Last ~4–7) | Endpaket via Apache | Start 98, Kontakt 98, TR-Start 92, Übersetzungen 99; CLS 0; LCP 2,0–2,4 s; Best Practices 100; Desktop 100 (R2) | 03:09 |
| Formular | form-Test DE/TR, Start/Kontakt, 390/1440 | 40/40: Pflichtfeld- und E-Mail-Fehler, HTML-Eingabe nicht gerendert, mailto/WhatsApp-Text korrekt, keine Server-Übertragung | R2, R3 |
| PHP Syntax | – | ➖ kein PHP im Release | – |
| PHP Live-Mail | – | ➖ kein PHP-Versand (mailto/WhatsApp) | – |
| Cookie/Consent Netzwerk | Request-Protokoll aller Seiten, Code-Suche Storage | 0 Fremd-Requests, keine Cookies/Storage | R1–R5 |
| Apache-Regeln | php:8.3-apache, AllowOverride All, curl | HTTP→HTTPS 301, www→ohne www 301, 404 echt, .htaccess 403, Verzeichnis 403, gzip, Cache-Header | R1, R5 |
| Echtes iPhone/Android, Screenreader | – | **OFFEN** | – |

## 5. Offene Punkte und Gate

**P0:** keine technischen.
**P1 (blockiert Livegang, nur Kerim/Can können liefern):**
1. `[BETREIBERANGABE ERFORDERLICH]` Ladungsfähige Anschrift (Impressum + Datenschutz „Verantwortlicher“) – nicht aus dem Justizregister übernommen.
2. `[BETREIBERANGABE ERFORDERLICH]` Berufsrechtliche Angaben laut Urkunde: genaue Berufsbezeichnung, Gericht mit Anschrift, Rechtsgrundlage.
3. **GDolmG:** Seit 01.01.2023 gilt für Dolmetscher bundesweit das Gerichtsdolmetschergesetz (Bezeichnung nach § 6: „allgemein beeidigter Gerichtsdolmetscher für die türkische Sprache“; § 11: falsche Bezeichnung bußgeldbewehrt). Für Beeidigungen nach altem Landesrecht (Kerim: Mai 2021) gibt es eine Übergangsfrist, nach unserem Kenntnisstand bis **31.12.2026** – die Vorschrift steht im Änderungsgesetz und war auf gesetze-im-internet.de nicht abrufbar, also **amtlich bzw. beim OLG prüfen**. Kerim fragen, ob er nach GDolmG neu beeidigt ist; danach Bezeichnung überall anpassen (DE+TR, Impressum, JSON-LD, daten.ts). Die Ermächtigung als Übersetzer (Landesrecht) ist davon nicht betroffen.
4. `[BETREIBERANGABE ERFORDERLICH]` USt-ID (falls vorhanden) und VSBG-Satz (Pflicht erst ab mehr als 10 Beschäftigten, sonst freiwillig oder streichen).
5. `[BETREIBERANGABE ERFORDERLICH]` ALL-INKL-Vertragspartner (Kerim oder Agentur) und AV-Vertrag nach Art. 28 DSGVO; Speicherdauer der Server-Logfiles.
6. `[BETREIBERANGABE ERFORDERLICH]` E-Mail-Anbieter für info@dolmetscher-kt.de (WEB.DE oder nach Umzug ALL-INKL?), Löschfristen für Anfragen und Dokumente, Rechtsgrundlage Art. 9 DSGVO für Gesundheitsdaten, zuständige Aufsichtsbehörde (je nach Sitz), WhatsApp-Abschnitt (privat/Business) – juristisch prüfen lassen.
7. „Stand“-Datum in Impressum und Datenschutz beim Livegang eintragen.

**P2/P3 (nicht blockierend):** „Schnell“ im Hero ohne belegte Bearbeitungszeit (Kerim bestätigen oder streichen) · Universitäten/Einbürgerungsverfahren im Hero bestätigen · alle TR-Texte von Kerim prüfen (danach `TR_GEPRUEFT = true` in src/i18n.ts, sonst bleibt der Entwurfs-Hinweis live) · Original-Logo als Datei · 5 Meta-Beschreibungen über 160 Zeichen, 2 Titel über 60 Zeichen · nicht gehashte Skripte nur 1 Tag Cache · HSTS nach erfolgreichem Live-HTTPS einschalten (Zeile in .htaccess) · Test mit echtem iPhone/Android und Screenreader.

**Betreiberangaben / individuelle Rechtsprüfung:** fehlt (siehe P1).
**Live-Tests:** ausstehend (nach Can-Upload).
**Freigabe:** **NO-GO** (für den Livegang)
**Begründung:** Technisch ist das Paket vorbereitet (Build, preflight 0 P0/P1, Browser-, Formular-, A11y- und Apache-Tests ohne Fehler). Gesetzlich nötige Impressumsangaben (Anschrift, berufsrechtliche Angaben) und Datenschutz-Angaben fehlen, und die Berufsbezeichnung muss wegen der GDolmG-Übergangsfrist bestätigt werden. Sobald 1–7 eingetragen und neu gebaut sind (das Paket-Skript läuft dann ohne Warnung durch), wird der Stand **GO – technisch vorbereitet**; nach dem Live-Smoke-Test **GO – nach Live-Test**.

## 6. Upload / Rollback

**Uploadquelle:** `bash scripts/allinkl-paket.sh` im Projekt (Branch `quelle`) → `release/kerim-allinkl-<datum>.zip` + `.sha256`. Das Skript baut für `https://dolmetscher-kt.de`, legt `allinkl/.htaccess` und `allinkl/_astro/.htaccess` dazu und bricht mit „NICHT HOCHLADEN“ ab, solange Lücken markiert sind. `release/` ist nicht im Git.
**Ziel:** Dokumentenordner der Domain dolmetscher-kt.de im ALL-INKL-KAS `[BETREIBERANGABE ERFORDERLICH]`.
**Manuelle Schritte (Can):**
1. Im KAS: Domain dolmetscher-kt.de auf den Zielordner zeigen lassen (DNS/Nameserver beim Domain-Anbieter, falls die Domain dort liegt), SSL-Zertifikat (Let's Encrypt) für `dolmetscher-kt.de` **und** `www.dolmetscher-kt.de` aktivieren. Achtung: Wenn das MX der Domain umzieht, vorher klären, wo info@dolmetscher-kt.de liegt.
2. Vorhandene Dateien im Zielordner sichern (herunterladen), falls dort schon etwas liegt.
3. ZIP lokal entpacken, Prüfsumme vergleichen (`sha256sum -c *.sha256`), den **Inhalt** (index.html, _astro/, .htaccess …, nicht den Ordner) per **SFTP** (falls Tarif es hat) oder **FTPS** (explizit, nicht FTP) hochladen. Versteckte Dateien (.htaccess) im FTP-Programm einblenden.
4. Live-Smoke-Test: `http://dolmetscher-kt.de` → 301 auf `https://dolmetscher-kt.de/`; `https://www.dolmetscher-kt.de/kontakt/` → 301 ohne www; `/gibt-es-nicht/` zeigt die Fehlerseite mit Status 404; Response-Header (CSP, nosniff, Referrer-Policy) im Browser prüfen; Start, Kontakt, Impressum, Datenschutz, `/tr/` am Handy und Desktop öffnen; Anfrageformular bis „Anfrage senden“ durchklicken (öffnet Mailprogramm/WhatsApp, keine echte Mail nötig); Konsole ohne Fehler; robots.txt ohne „Disallow: /“, sitemap.xml erreichbar.
5. Optional danach: `npm i --no-save playwright@1.48.2 @axe-core/playwright` und `PROXY= BASIS=https://dolmetscher-kt.de node scripts/release-pruefung.cjs`.
6. Erst wenn HTTPS für beide Hosts sicher läuft: HSTS-Zeile in `allinkl/.htaccess` einkommentieren, Paket neu bauen, `.htaccess` neu hochladen.
7. Search Console: Domain bestätigen, Sitemap `https://dolmetscher-kt.de/sitemap.xml` einreichen.

**Rollback:** Gesicherte Vorversion wieder hochladen bzw. Zielordner leeren; bei Fehlern in der `.htaccess` (Server-Fehler 500) nur diese Datei umbenennen – die Seite läuft dann ohne Zusatz-Header weiter. Quellstand je Release über Git-Commit + Paket-SHA-256 nachvollziehbar. Verantwortlich: Can.
**Post-Upload-Prüfer:** `[Person und Datum eintragen]`
