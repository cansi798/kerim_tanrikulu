# Offene Infos – das brauchen wir vom Kunden

Stand: 31.10.2026 (Design v5: kompakte Startseite mit Vorteilen, Ablauf und Einsatzgebiet; Deutsch/Türkisch, Themen, Ratgeber). Grundregel: Auf der Seite steht nur, was auf der bisherigen Website steht. In der Vorschau sind diese Stellen rot gestrichelt markiert.

## Vor dem Livegang nötig

1. **Telefonnummer bestätigen:** 0177 4207 664 wurde aus einem kleinen Bild der alten Seite gelesen. Bis zur Bestätigung steht sie nicht in den strukturierten Daten und nicht in `llms.txt`.
2. **Anschrift fürs Impressum** (Straße, Hausnummer, PLZ, Ort; geschäftlich oder privat).
3. **Standort Hamburg und Einsatzgebiet bestätigen (v5):** Das Einsatzgebiet **Hamburg, Schleswig-Holstein, Bremen und Niedersachsen** hat Can vorgegeben (31.10.2026); es steht nicht auf Kerims bisheriger Seite. Es steht jetzt auf der Startseite („Einsatzgebiet“ mit kleiner Karte), auf „Dolmetschen“, in den Fragen, in den Seitentiteln/-beschreibungen, in den strukturierten Daten (`areaServed` beim Dolmetschen) und in `llms.txt`. Bitte von Kerim bestätigen lassen: Dolmetscht er in allen vier Ländern vor Ort?
4. **Urkunde(n) zu Beeidigung und Ermächtigung:** genauer Wortlaut der Berufsbezeichnung, genaue Bezeichnung und Anschrift des Gerichts, Rechtsgrundlage (Landesgesetz). Bestätigung, dass beides aktuell gültig ist.
5. **Umsatzsteuer-ID** (falls vorhanden) und Entscheidung zur Verbraucherstreitbeilegung (§ 36 VSBG).
6. **Hoster der fertigen Seite** und Vertrag zur Auftragsverarbeitung; **E-Mail-Anbieter** bestätigen (WEB.DE?).
7. **Sicherer Weg für Dokumente:** Wie sollen Kunden Urkunden, Ausweise oder medizinische Unterlagen schicken (z. B. verschlüsselter Upload statt E-Mail)? Wie lange werden Dokumente aufbewahrt, wann gelöscht oder zurückgegeben?
8. **Domain dolmetscher-kt.de:** Zugang zum Domain-Anbieter, damit die Seite dort erreichbar wird.

## Für bessere Inhalte

9. **Logo:** Jamil (Talk 3907): Das bisherige Logo (Federkiel + „TANRIKULU / TRANSLATIONS“) bleibt. Auf der Website steht ein Nachbau nach der alten Seite. Bitte das Original als Datei (SVG oder PDF) vom Kunden holen. Der Entwurf eines neuen Logos und das CI-Handbuch liegen nur als Vorschlag in Nextcloud (Kerim_Tanrikulu/CI), nicht auf der Website.
10. **Portraitfoto** für den Kopf der Startseite und „Über mich“ (Format 4 : 5, z. B. 800 × 1000 px). Bis dahin steht in der Vorschau ein markierter Platzhalter; live ohne Foto bleibt die Stelle leer.
11. **Ablauf bestätigen (v5):** Auf der Startseite steht jetzt „So einfach geht's“ in drei allgemein gehaltenen Schritten: Kontakt aufnehmen (Anrufen oder E-Mail) → Anliegen besprechen („Das weitere Vorgehen klärt Herr Tanrikulu persönlich mit Ihnen“, nach seinem eigenen Satz) → Übersetzung oder Termin. In der Vorschau als Platzhalter markiert. Stimmt das so, oder gehört ein Schritt dazu (z. B. Unterlagen schicken, Kostenvoranschlag)?
12. **Wortlaut zur Beglaubigung bestätigen:** „Als ermächtigter Übersetzer kann ich schriftlich bestätigen, dass meine Übersetzung richtig und vollständig ist.“
13. **Typische Dolmetsch-Einsätze:** wo genau (Gericht, Behörde, Notar, Standesamt, Schule, Arzt …)?
14. **Unternehmen als Zielgruppe:** Übernimmt er auch Aufträge von Firmen (Geschäftskorrespondenz, Gespräche mit Geschäftspartnern)?
15. **Ein Satz zum Umgang mit Unterlagen** (Vertraulichkeit, Aufbewahrung) für „Über mich“.
16. **Weitere häufige Fragen** mit seinen Antworten.
17. **Eintrag im Justiz-Verzeichnis:** Darf die Seite darauf verweisen?
18. **Google-Unternehmensprofil:** vorhanden? Sonst anlegen, mit denselben Kontaktdaten wie auf der Website.
19. **Türkische Fassung prüfen (v4):** Alle Seiten gibt es jetzt auch auf Türkisch unter `/tr/`. Die Texte sind ein **Entwurf**; jede türkische Seite zeigt den Hinweis „Türkische Fassung: Entwurf – bitte von Herrn Tanrikulu prüfen“. Herr Tanrikulu ist selbst Übersetzer: bitte jede Zeile prüfen, besonders die Fachbegriffe (genel yeminli tercüman, yetkili mütercim, onaylı çeviri, Schleswig Eyalet Yüksek Mahkemesi für Oberlandesgericht Schleswig) und die Übersetzung seiner eigenen Sätze. Schreibweise des Namens im Türkischen (Tanrikulu oder Tanrıkulu?) bestätigen. Nach der Freigabe in `src/i18n.ts` `TR_GEPRUEFT = true` setzen. Impressum und Datenschutz stehen auf den türkischen Seiten bewusst auf Deutsch (bindende Fassung) mit türkischem Hinweis.
20. **Sprachrichtungen bestätigen:** Übersetzt er beide Richtungen (Türkisch → Deutsch und Deutsch → Türkisch)? Die Seite nennt wie die alte Seite nur „die türkische und deutsche Sprache“.
21. **Kontaktformular:** Jamils Konzept nennt eines, die Vorschau hat bewusst keins (nur Telefon und E-Mail, kein Fremddienst). Wenn gewünscht: eigener Versand mit Spamschutz und Datenschutz-Abschnitt.

22. **Claim bestätigen:** Auf der Startseite steht „Brücken bauen zwischen den Sprachen“ (Jamils Wortlaut, Talk 3904). Kerims eigener Satz auf der bisherigen Seite lautet: „Ich verstehe meine Arbeit als eine Form von Brückenbildung zwischen den Kulturen.“ Welchen Wortlaut möchte er?

23. **Themenliste bestätigen oder kürzen (v4):** Die Seite „Themen“ zeigt typische Dokumente in beide Richtungen (türkische Dokumente für deutsche Stellen, deutsche Dokumente für türkische Stellen). Das ist eine allgemeine Übersicht, kein Versprechen. Mit Häkchen und fett markiert sind nur Arten, die Kerim auf seiner Seite selbst nennt (v5: keine Unterstreichungen mehr, Jamil Talk 3957). Bitte mit ihm durchgehen: Was soll bleiben, was fehlt, was übernimmt er nicht (z. B. Führerschein, Erbschein, Vollmachten, Renten- und Arbeitsunterlagen)?
24. **Ratgeber-Texte prüfen (v4):** Allgemeine Informationen (beglaubigte Übersetzung und Bestätigungsvermerk, Dolmetscher und Übersetzer, Original oder Kopie, Apostille, Formül A/B/C, Anerkennung in der Türkei, Namen mit türkischen Buchstaben, JVEG). Sichtbar als „Allgemeine Information, keine Rechtsberatung“ markiert. Kerim soll fachlich gegenlesen.
25. **Was nur Kerim beantworten kann** (im Ratgeber als Platzhalter): Preise im Einzelfall, Bearbeitungszeit, Ablauf eines Auftrags, Versand von Unterlagen per Post oder E-Mail (Fernübersetzung).
26. **„Warum Herr Tanrikulu?“ prüfen (v5, ersetzt „Was ihn auszeichnet“):** sechs Vorteile aus belegten Fakten, als Kundennutzen formuliert: mündlich und schriftlich aus einer Hand (ein Ansprechpartner), beeidigt und ermächtigt vom OLG Schleswig seit Mai 2021 („die übliche Form für deutsche Behörden und Gerichte“ – allgemeine Aussage, keine Garantie), Erfahrung mit Gerichten/Konsulat/BAMF/IQSH/Schulen, Honorar nach JVEG, unkompliziert erreichbar (Telefon oder E-Mail, ohne Formular), persönlicher Bezug zu beiden Kulturen. Wortlaute von Kerim freigeben lassen.

## Von der Seite genommen (Talk 3904), erst nach Bestätigung wieder möglich

- Ablauf „Dokument senden – Anfrage prüfen – Rückmeldung erhalten“ (Punkt 11)
- Hinweise zum Dokument-Upload bzw. sicheren Versand (Punkt 7)
- Erklärung, dass die Übersetzung „richtig und vollständig“ bestätigt wird (Punkt 12)
- Angaben, was in eine Anfrage gehört (Termin, Ort, Dauer, Dokumentart)
- Beispiel-Einsätze wie Notar, Standesamt, Arzt; Unternehmen als Zielgruppe (Punkte 13, 14)
- Siegel- und Stempel-Motive in den Zeichnungen, Siegel-Logo auf der Website (nur noch im CI-Handbuch)
- Erfundene Beispielsätze in der Dolmetsch-Animation

## Bewusst nicht auf der Seite

Keine Preise, Bearbeitungszeiten, Referenzen, Kundenstimmen oder Zahlen, solange nichts davon belegt ist. Kein Kontaktformular mit Fremddienst; Kontakt per Telefon und E-Mail.
