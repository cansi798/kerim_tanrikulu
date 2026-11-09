// Alle deutschen Texte der Website. Die türkische Fassung (tr.ts) hat genau dieselbe Form.
// Grundregel (Jamil Talk 3877/3904): Über Herrn Tanrikulu nur, was auf seiner bisherigen Website steht.
// Neu seit v4 (Can 31.10.2026): allgemeines Ratgeber-Wissen, das für jeden beeidigten Dolmetscher und
// ermächtigten Übersetzer in Deutschland gilt – als Wissen formuliert, nicht als Leistungsversprechen.
import { NAME, MAIL, TELEFON, TITEL_NAME } from "../daten";

// Honorar: Kerims eigener Wortlaut (Talk 3990, 31.10.2026), ersetzt „Honorar nach JVEG“.
const HONORAR_TITEL = "Honorar nach individueller Absprache";
const HONORAR =
  "Die Vergütung richtet sich nach Art, Umfang und Schwierigkeitsgrad des Auftrags. Bei gerichtlichen und behördlichen Aufträgen erfolgt die Abrechnung, soweit anwendbar, nach dem JVEG. Für private Aufträge erhalten Sie vorab ein individuelles Angebot.";
const HONORAR_BEISPIEL = "Zum Beispiel: Sehr kurzfristige Anfragen oder Fachtexte wie medizinische Dokumente können mehr kosten.";

export const de = {
  lang: "de",
  ogLocale: "de_DE",

  ui: {
    skip: "Zum Inhalt springen",
    vorschau: "Vorschau. Diese Seite ist noch nicht veröffentlicht und für Suchmaschinen gesperrt. Rot gestrichelte Stellen sind Platzhalter. Das Logo ist ein Nachbau des bisherigen Logos.",
    vorschauKurz: "Vorschau.",
    trEntwurf: "",
    zurStart: "Tanrikulu Translations, zur Startseite",
    hauptnav: "Hauptnavigation",
    hauptnavMobil: "Hauptnavigation (mobil)",
    menue: "Menü",
    sprache: "Sprache wählen",
    spracheName: { de: "Deutsch", tr: "Türkçe" },
    anfrage: "Anfrage senden",
    anfrageBetreff: "Anfrage: Übersetzung oder Dolmetschen",
    anfrageBetreffUe: "Anfrage: Übersetzung",
    anfrageBetreffDo: "Anfrage: Dolmetschen",
    mailBetreff: "Anfrage über die Website",
    anrufen: "Anrufen",
    mailSchreiben: "E-Mail schreiben",
    mailKurz: "E-Mail",
    whatsapp: "WhatsApp",
    whatsappLang: "Nachricht per WhatsApp",
    whatsappLabel: "Per WhatsApp schreiben (öffnet WhatsApp)",
    nachOben: "Nach oben",
    telefonPruefen: "Nummer bitte vom Kunden bestätigen",
    telefonLuecke: "Nummer bitte bestätigen",
    platzhalter: "Platzhalter:",
    mehrErfahren: "Mehr erfahren",
    aufEinenBlick: "Auf einen Blick",
    kontakt: "Kontakt",
    seiten: "Seiten",
    schnellkontakt: "Schnellkontakt",
    telefon: "Telefon",
    email: "E-Mail",
    standort: "Standort",
    rechtHinweis: "Allgemeine Information, keine Rechtsberatung. Was im Einzelfall gilt, entscheidet die Stelle, bei der Sie ein Dokument einreichen.",
    kerimNennt: "von Herrn Tanrikulu genannt",
    portraitFolgt: "Portrait von Kerim folgt",
    portraitFormat: "Format 4 : 5, z. B. 800 × 1000 px",
    portraitAlt: NAME,
    original: "Original",
    uebersetzung: "Übersetzung",
    bildUe: "Original und Übersetzung als zwei Blätter nebeneinander",
    bildDo: "Dolmetschen: von Deutsch über den Dolmetscher zu Türkisch",
    deutsch: "Deutsch",
    tuerkisch: "Türkisch",
  },

  nav: {
    start: "Startseite",
    uebersetzungen: "Übersetzungen",
    dolmetschen: "Dolmetschen",
    leistungen: "Leistungen",
    wissen: "Gut zu wissen",
    ueber: "Über mich",
    kontakt: "Kontakt",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
  },

  meta: {
    // SEO v5 (Can 10:46): Leistung + Region, natürlich formuliert
    titelStart: `Übersetzer und Dolmetscher Türkisch in Hamburg | ${TITEL_NAME}`,
    beschreibung:
      "Beglaubigte Übersetzungen und Dolmetschen Türkisch–Deutsch: Kerim Tanrikulu, beeidigt und ermächtigt vom OLG Schleswig. Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen, Niedersachsen.",
    uebersetzungen: { titel: "Beglaubigte Übersetzungen Türkisch–Deutsch in Hamburg", beschreibung: "Beglaubigte Übersetzungen Türkisch und Deutsch vom ermächtigten Übersetzer Kerim Mikael Tanrikulu in Hamburg: Urteile, Zeugnisse, Ausweise, medizinische Unterlagen, Urkunden. Vorab ein individuelles Angebot." },
    dolmetschen: { titel: "Dolmetscher Türkisch in Hamburg und Norddeutschland, auch per Video", beschreibung: "Allgemein beeidigter Dolmetscher für Türkisch und Deutsch (OLG Schleswig, seit Mai 2021). Vor Ort in Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen und Niedersachsen, dazu Video- und Telefondolmetschen." },
    wissen: { titel: "Gut zu wissen: Ratgeber und häufige Fragen", beschreibung: "Allgemeine Informationen und Antworten: beglaubigte Übersetzung, Dolmetscher oder Übersetzer, Original oder Kopie, Apostille zwischen Deutschland und der Türkei, welche Dokumente übersetzt werden, Honorar, Anfrage." },
    ueber: { titel: "Über mich", beschreibung: "Kerim Mikael Tanrikulu, allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für die türkische und deutsche Sprache durch das Oberlandesgericht Schleswig seit Mai 2021, Bachelor of Arts in Philosophie und Germanistik." },
    kontakt: { titel: "Kontakt", beschreibung: "Kontakt zu Kerim Mikael Tanrikulu, Dolmetscher und Übersetzer für Türkisch und Deutsch in Hamburg: Anfrageformular, Telefon, WhatsApp und E-Mail." },
    impressum: { titel: "Impressum", beschreibung: "Impressum der Website von Kerim Mikael Tanrikulu." },
    datenschutz: { titel: "Datenschutz", beschreibung: "Datenschutzerklärung der Website von Kerim Mikael Tanrikulu." },
    nichtGefunden: { titel: "Seite nicht gefunden", beschreibung: "Diese Seite gibt es nicht." },
  },

  // Fakten von der bisherigen Website (wörtlich, wo Kerim spricht)
  fakten: {
    dolmetscher: "allgemein beeidigter Dolmetscher",
    uebersetzer: "ermächtigter Übersetzer",
    gericht: "Oberlandesgericht Schleswig",
    seit: "Mai 2021",
    sprachen: "Deutsch und Türkisch",
    ort: "Hamburg",
    claim: "Brücken bauen zwischen den Sprachen",
    rolle: "allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für Deutsch und Türkisch",
    vorstellung: "Ich bin Kerim Mikael Tanrikulu, allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für die türkische und deutsche Sprache durch das Oberlandesgericht Schleswig seit Mai 2021.",
    studium: "Meine Begeisterung für das Übersetzen habe ich bei einem Studienaufenthalt in der Türkei entdeckt. Seither bereitet es mir immer große Freude, wenn ich zu einem gelungenen Gespräch und zu gegenseitiger Verständigung beitragen kann.",
    freude: "Es bereitet mir immer große Freude, wenn ich zu einem gelungenen Gespräch und zu gegenseitiger Verständigung beitragen kann.",
    kulturen: "Ich verstehe meine Arbeit als eine Form von Brückenbildung zwischen den Kulturen.",
    kulturenMarke: "Brückenbildung zwischen den Kulturen",
    erfahrungEinleitung: "Zu meinen bisherigen Erfahrungen gehört unter anderem die Arbeit mit:",
    erfahrungen: [
      "Amtsgerichte in Schleswig-Holstein",
      "Türkisches Konsulat in Hamburg",
      "Institut für Qualitätsentwicklung an Schulen Schleswig-Holstein",
      "Hamburger Schulen",
      "Bundesamt für Migration und Flüchtlinge",
      "Standesamt",
      "Krankenhäuser",
      "Untersuchungshaftanstalten",
    ],
    dokumenteSatz: "Gerne übersetze ich für Sie Dokumente aller Art, wie zum Beispiel Gerichtsurteile, darunter auch Scheidungsurteile, Zeugnisse, Personalausweise, medizinische Unterlagen und Urkunden.",
    dokumente: [
      { icon: "urteil", text: "Gerichtsurteile, darunter auch Scheidungsurteile" },
      { icon: "zeugnis", text: "Zeugnisse" },
      { icon: "ausweis", text: "Personalausweise" },
      { icon: "medizin", text: "medizinische Unterlagen" },
      { icon: "urkunde", text: "Urkunden" },
    ],
    honorarTitel: HONORAR_TITEL,
    honorar: HONORAR,
    honorarBeispiel: HONORAR_BEISPIEL,
    // Kerim (Talk 3990): „Bachelor of Arts in Philosophie und Germanistik, abgeschlossen 2021“
    studienabschluss: "Bachelor of Arts in Philosophie und Germanistik, abgeschlossen 2021",
    fernDolmetschen: "Video- und Telefondolmetschen",
    ermaechtigtSatz: "Seit Mai 2021 bin ich durch das Oberlandesgericht Schleswig als Übersetzer für die türkische und deutsche Sprache ermächtigt.",
    beeidigtSatz: "Seit Mai 2021 bin ich durch das Oberlandesgericht Schleswig als Dolmetscher für die türkische und deutsche Sprache allgemein beeidigt.",
    nachweise: [
      { titel: "Dolmetscher", wert: "allgemein beeidigt" },
      { titel: "Übersetzer", wert: "ermächtigt" },
      { titel: "Beeidigt und ermächtigt durch", wert: "Oberlandesgericht Schleswig" },
      { titel: "Seit", wert: "Mai 2021" },
      { titel: "Studium", wert: "Bachelor of Arts in Philosophie und Germanistik (2021)" },
      { titel: "Sprachen", wert: "Deutsch und Türkisch" },
      { titel: "Standort", wert: "Hamburg" },
    ],
  },

  hero: {
    badge: "Allgemein beeidigter Dolmetscher und ermächtigter Übersetzer",
    // Jamil Talk xidc8qvq #5332 (09.11.2026, „ohne ok“); bewusst „in der Regel“ statt „rechtssicher“ (keine Garantie der Anerkennung)
    h1: "Ihre Dokumente müssen offiziell anerkannt werden?",
    sub: "Beglaubigte Übersetzungen Deutsch ↔ Türkisch für Behörden, Gerichte, Universitäten und Einbürgerungsverfahren. Schnell, sorgfältig und in der Regel bundesweit anerkannt.",
    vertrauen: ["Dolmetscher", "Übersetzer", "Deutsch und Türkisch"],
    karten: ["Beglaubigte Übersetzungen", "Dolmetschen", "Deutsch und Türkisch"],
    kartenKurz: ["Urkunden, Urteile, Zeugnisse und mehr", "Vor Ort, per Video oder Telefon", "Typische Dokumente in beide Richtungen"],
  },

  leistungen: {
    ueTitel: "Beglaubigte Übersetzungen",
    doTitel: "Dolmetschen",
  },

  // v5 (Can 31.10.2026 10:41–10:46): weniger scrollen, USP direkt nach dem Hero, Ablauf als Grafik, Einsatzgebiet.
  // Je Baustein „kurz“ (immer sichtbar, auch am Handy) und „lang“ (nur breit sichtbar, steht aber immer im HTML).
  warum: {
    eyebrow: "Ihre Vorteile",
    titel: "Warum Herr Tanrikulu?",
    details: "Details",
    platzhalter: "Wortlaute der sechs Vorteile bitte von Herrn Tanrikulu freigeben lassen (Einsatzgebiet, Honorar und Erfahrungen sind seit seinem Feedback vom 31.10. bestätigt).",
    punkte: [
      { icon: "gespraech", titel: "Mündlich und schriftlich aus einer Hand", kurz: "Ein Ansprechpartner für Dokumente und Gespräche.", lang: "Er ist allgemein beeidigter Dolmetscher und ermächtigter Übersetzer. Er dolmetscht vor Ort, per Video oder am Telefon, und Sie brauchen nur einen Ansprechpartner.", seite: "dolmetschen", anker: "#unterschied-titel" },
      { icon: "schild", titel: "Beeidigt und ermächtigt vom OLG Schleswig", kurz: "Seit Mai 2021, für Türkisch und Deutsch.", lang: "Die Übersetzung eines in Deutschland ermächtigten Übersetzers ist die übliche Form für deutsche Behörden und Gerichte. Dazu kommt ein Studium: Bachelor of Arts in Philosophie und Germanistik (2021).", seite: "wissen", anker: "#beglaubigt" },
      { icon: "urteil", titel: "Erfahrung mit Gerichten, Behörden und Kliniken", kurz: "Gerichte, Konsulat, BAMF, Standesamt, Krankenhäuser und mehr.", lang: "Unter anderem Amtsgerichte in Schleswig-Holstein, das Türkische Konsulat in Hamburg, das BAMF, das IQSH, Hamburger Schulen, Standesamt, Krankenhäuser und Untersuchungshaftanstalten.", seite: "ueber", anker: "#erfahrung-titel" },
      { icon: "dokument", titel: "Honorar nach Absprache", kurz: "Vorab ein individuelles Angebot.", lang: "Das Honorar richtet sich nach Art, Umfang und Schwierigkeitsgrad des Auftrags. Bei Gerichten und Behörden wird, soweit anwendbar, nach dem JVEG abgerechnet.", seite: "uebersetzungen", anker: "#honorar-titel" },
      { icon: "telefon", titel: "Unkompliziert erreichbar", kurz: "Direkt per Telefon, WhatsApp, E-Mail oder Anfrageformular.", lang: "Keine Umwege: Sie sprechen oder schreiben direkt mit Herrn Tanrikulu.", seite: "kontakt", anker: "" },
      { icon: "bruecke", titel: "Persönlicher Bezug zu beiden Kulturen", kurz: "Seine Begeisterung fürs Übersetzen begann in der Türkei.", lang: "Entdeckt hat er sie bei einem Studienaufenthalt in der Türkei. Seine Arbeit versteht er als „Brückenbildung zwischen den Kulturen“.", seite: "ueber", anker: "" },
    ],
  },

  // Einsatzgebiet: Vorgabe von Can (31.10.2026 10:46), von Kerim bestätigt und um Mecklenburg-Vorpommern ergänzt (Talk 3990)
  gebiet: {
    titel: "Einsatzgebiet",
    laender: ["Hamburg", "Schleswig-Holstein", "Mecklenburg-Vorpommern", "Bremen", "Niedersachsen"],
    satz: "Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen und Niedersachsen",
    zusatz: "Standort Hamburg. Dolmetschen vor Ort in diesen fünf Ländern, dazu per Video oder Telefon.",
    karte: "Karte: Einsatzgebiet Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen und Niedersachsen",
  },

  ablauf: {
    eyebrow: "Ablauf",
    titel: "So einfach geht's",
    text: "In drei Schritten zu Ihrer Übersetzung oder Ihrem Termin.",
    aria: "Ablauf in drei Schritten",
    schritte: [
      { icon: "telefon", titel: "Kontakt aufnehmen", kurz: "Anrufen, per WhatsApp, per E\u2011Mail oder über das Anfrageformular." },
      { icon: "gespraech", titel: "Anliegen besprechen", kurz: "Sie schicken Ihre Dokumente als Foto oder Scan und erhalten einen Kostenvoranschlag." },
      { icon: "dokument", titel: "Übersetzung oder Termin", kurz: "Sie erhalten Ihre beglaubigte Übersetzung, oder er dolmetscht bei Ihrem Termin." },
    ],
  },

  gut: {
    eyebrow: "Gut zu wissen",
    titel: "Kurze Antworten",
    mehr: "Mehr dazu",
    fragen: [
      { frage: "Brauche ich eine beglaubigte Übersetzung?", antwort: "Behörden, Gerichte und andere offizielle Stellen können sie für fremdsprachige Dokumente verlangen. Ob Sie eine brauchen, sagt Ihnen die Stelle, bei der Sie das Dokument einreichen.", seite: "wissen", anker: "#beglaubigt" },
      { frage: "Welche Dokumente werden übersetzt?", antwort: "Dokumente aller Art, zum Beispiel Gerichtsurteile (auch Scheidungsurteile), Zeugnisse, Personalausweise, medizinische Unterlagen und Urkunden.", seite: "uebersetzungen", anker: "#dok-titel" },
      { frage: "Dolmetscher oder Übersetzer?", antwort: "Ein Dolmetscher überträgt das gesprochene Wort, ein Übersetzer das geschriebene. Herr Tanrikulu ist für beides zugelassen.", seite: "wissen", anker: "#dolmetscher-uebersetzer" },
      { frage: "Was kostet es?", antwort: "Das Honorar wird individuell abgesprochen, nach Art, Umfang und Schwierigkeitsgrad des Auftrags. Für private Aufträge erhalten Sie vorab ein Angebot.", seite: "uebersetzungen", anker: "#honorar-titel" },
      { frage: "In welchen Regionen dolmetscht Herr Tanrikulu?", antwort: "Vor Ort in Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen und Niedersachsen. Sein Standort ist Hamburg. Er dolmetscht auch per Video oder Telefon.", seite: "dolmetschen", anker: "#gebiet-titel" },
      { frage: "Brauche ich eine Apostille?", antwort: "Die Apostille bestätigt, dass eine öffentliche Urkunde echt ist. Ob sie nötig ist, hängt von der Urkunde und von der Stelle ab, die sie verlangt.", seite: "wissen", anker: "#apostille" },
    ],
  },

  // Anfrageformular: Überschriften auf Startseite und Kontaktseite (Jamil #5312/#5314)
  anfrage: {
    eyebrow: "Anfrage",
    startTitel: "Anfrage in wenigen Schritten",
    startZeile: "Eine Frage pro Schritt, am Ende sehen Sie alles im Überblick. Ihre Angaben gehen erst an Herrn Tanrikulu, wenn Sie selbst per E-Mail oder WhatsApp absenden.",
    kontaktTitel: "Anfrage stellen",
    kontaktZeile: "In wenigen Schritten zu Ihrer Anfrage. Ihre Angaben gehen erst an Herrn Tanrikulu, wenn Sie sie am Ende selbst absenden.",
    direktLink: "Lieber direkt: Telefon, WhatsApp oder E-Mail",
    direktTitel: "Lieber direkt sprechen oder schreiben?",
    zumFormular: "Zum Anfrageformular",
  },

  // Seite „Gut zu wissen“ = Ratgeber + Häufige Fragen (Jamil Talk xidc8qvq #5318, 09.11.2026)
  wissen: {
    titel: "Gut zu wissen",
    lead: "Allgemeine Antworten rund um beglaubigte Übersetzungen und Dolmetschen zwischen Deutschland und der Türkei: zuerst der Ratgeber, darunter die häufigen Fragen.",
    alle: "Mehr unter „Gut zu wissen“",
  },

  ratgeber: {
    eyebrow: "Ratgeber",
    titel: "Gut zu wissen vor dem Auftrag",
    text: "Allgemeine Antworten auf Fragen, die bei beglaubigten Übersetzungen zwischen Deutschland und der Türkei oft auftauchen.",
    seitenTitel: "Ratgeber",
    seitenText: "Was eine beglaubigte Übersetzung ist, wann eine Apostille nötig wird und was in beide Richtungen gilt. Allgemein erklärt, für Deutschland und die Türkei.",
    teaserLink: "Zum Ratgeber",
    weiter: "Weiterlesen",
    kapitel: [
      {
        id: "beglaubigt",
        frage: "Was ist eine beglaubigte Übersetzung?",
        begriff: "Bestätigungsvermerk",
        kurz: "Eine schriftliche Übersetzung mit Vermerk, Unterschrift und meist einem Stempel des ermächtigten Übersetzers.",
        absaetze: [
          "Eine beglaubigte Übersetzung fertigt ein in Deutschland ermächtigter oder öffentlich bestellter Übersetzer an. Am Ende steht ein Bestätigungsvermerk: Darin bescheinigt er, dass die Übersetzung richtig und vollständig ist. Dazu kommen seine Unterschrift und in der Regel ein Stempel.",
          "Ermächtigt werden Übersetzer nach dem Recht des jeweiligen Bundeslandes, meist durch ein Gericht. Die Zivilprozessordnung nennt solche Übersetzungen ausdrücklich (§ 142 Abs. 3 ZPO). Herr Tanrikulu ist seit Mai 2021 durch das Oberlandesgericht Schleswig ermächtigt.",
        ],
      },
      {
        id: "dolmetscher-uebersetzer",
        frage: "Dolmetscher oder Übersetzer?",
        begriff: "mündlich",
        kurz: "Ein Dolmetscher überträgt das gesprochene Wort, ein Übersetzer das geschriebene.",
        absaetze: [
          "Ein Dolmetscher überträgt mündlich, zum Beispiel in einer Gerichtsverhandlung oder bei einem Gespräch. Ein Übersetzer arbeitet schriftlich und überträgt Dokumente.",
          "„Allgemein beeidigt“ heißt: Der Dolmetscher hat einmal einen allgemeinen Eid geleistet. Vor Gericht kann er sich darauf berufen und muss nicht für jeden Termin neu vereidigt werden (§ 189 Abs. 2 GVG). Umgangssprachlich heißt das oft „vereidigter Dolmetscher“. Herr Tanrikulu ist beides: allgemein beeidigter Dolmetscher und ermächtigter Übersetzer.",
        ],
      },
      {
        id: "original-kopie",
        frage: "Original oder Kopie?",
        begriff: "Vorlage",
        kurz: "Übersetzt wird nach der Vorlage, die Sie mitbringen. Ob eine Kopie reicht, entscheidet die Stelle, die das Dokument verlangt.",
        absaetze: [
          "Übersetzt wird nach dem Dokument, das vorliegt: dem Original, einer beglaubigten Abschrift oder einer einfachen Kopie. Im Bestätigungsvermerk steht in der Regel, welche Vorlage benutzt wurde.",
          "Ob eine Übersetzung nach einer Kopie genügt, entscheidet die Stelle, bei der Sie das Dokument einreichen. Fragen Sie dort am besten vorher nach.",
        ],
      },
      {
        id: "apostille",
        frage: "Apostille: Wann wird sie gebraucht?",
        begriff: "Apostille",
        kurz: "Die Apostille bestätigt, dass eine öffentliche Urkunde echt ist. Zwischen Deutschland und der Türkei ersetzt sie die Legalisation.",
        absaetze: [
          "Manche Stellen wollen sicher sein, dass eine ausländische Urkunde echt ist. Dafür gibt es die Apostille. Eine Behörde des Landes, in dem die Urkunde ausgestellt wurde, bringt sie an. Sie bestätigt Unterschrift und Siegel, nicht den Inhalt.",
          "Deutschland und die Türkei sind beide Vertragsstaaten des Haager Übereinkommens vom 5. Oktober 1961. Zwischen beiden Ländern genügt deshalb die Apostille; die aufwendigere Legalisation durch ein Konsulat entfällt.",
          "Ob überhaupt eine Apostille nötig ist, hängt von der Urkunde und von der Stelle ab, die sie verlangt. Wird eine gebraucht, lassen Sie sie am besten vor der Übersetzung anbringen. Dann kann sie gleich mitübersetzt werden.",
        ],
      },
      {
        id: "formuel",
        frage: "Mehrsprachige Auszüge: Formül A, B und C",
        begriff: "Formül",
        kurz: "Für Geburt, Eheschließung und Tod gibt es in der Türkei internationale Auszüge, die viele Stellen ohne Übersetzung annehmen.",
        absaetze: [
          "Türkische Personenstandsbehörden stellen auf Wunsch internationale, mehrsprachige Auszüge aus: Formül A für die Geburt, Formül B für die Eheschließung und Formül C für den Tod. Sie beruhen auf einem Übereinkommen der Internationalen Kommission für das Zivilstandswesen (CIEC), dem auch Deutschland angehört, und sind so aufgebaut, dass man sie in den Vertragsstaaten ohne Übersetzung lesen kann.",
          "Viele deutsche Standesämter und Behörden nehmen diese Auszüge ohne Übersetzung an. Verlangt eine Stelle trotzdem eine Übersetzung oder einen ausführlichen Auszug aus dem Personenstandsregister (zum Beispiel einen vukuatlı nüfus kayıt örneği), gilt ihre Vorgabe.",
        ],
      },
      {
        id: "beide-richtungen",
        frage: "Gilt die Übersetzung auch in der Türkei?",
        begriff: "zusätzliche Bestätigung",
        kurz: "Für deutsche Stellen ist die Übersetzung eines ermächtigten Übersetzers üblich. Türkische Stellen können zusätzliche Bestätigungen verlangen.",
        absaetze: [
          "Für deutsche Stellen ist die Übersetzung eines in Deutschland ermächtigten Übersetzers die übliche Form.",
          "Für türkische Stellen kann etwas anderes gelten. In der Türkei bestätigt häufig ein Notar die Übersetzung (noter onaylı tercüme), und manche Stellen verlangen eine zusätzliche Bestätigung, zum Beispiel durch ein türkisches Konsulat. Klären Sie deshalb vor dem Auftrag mit der Stelle, die das Dokument verlangt, welche Form sie annimmt.",
        ],
      },
      {
        id: "namen",
        frage: "Namen mit türkischen Buchstaben",
        begriff: "Schreibweisen",
        kurz: "Namen werden in der Regel so geschrieben wie im Ausgangsdokument. Abweichungen am besten gleich mitteilen.",
        absaetze: [
          "Türkische Namen enthalten oft Buchstaben wie ç, ğ, ı, İ, ö, ş oder ü. In Übersetzungen werden Namen in der Regel so geschrieben wie im Ausgangsdokument.",
          "Weichen die Schreibweisen in Ihren Unterlagen voneinander ab, zum Beispiel zwischen Pass und Urkunde, erwähnen Sie das am besten gleich bei der Anfrage.",
        ],
      },
      {
        id: "jveg",
        frage: "Was ist das JVEG?",
        begriff: "JVEG",
        kurz: "Das JVEG regelt, wie Gerichte und Behörden Dolmetscher und Übersetzer vergüten. Bei gerichtlichen und behördlichen Aufträgen rechnet Herr Tanrikulu, soweit anwendbar, danach ab.",
        absaetze: [
          "Das Justizvergütungs- und -entschädigungsgesetz (JVEG) regelt, wie Gerichte und Behörden Dolmetscher und Übersetzer vergüten: beim Dolmetschen nach Zeit, bei Übersetzungen nach dem Umfang des Textes.",
          "Bei gerichtlichen und behördlichen Aufträgen rechnet Herr Tanrikulu, soweit anwendbar, nach dem JVEG ab. Sonst gilt ein Honorar nach individueller Absprache: Es richtet sich nach Art, Umfang und Schwierigkeitsgrad des Auftrags, und für private Aufträge erhalten Sie vorab ein Angebot.",
        ],
      },
    ],
    platzhalter: "Was nur Herr Tanrikulu beantworten kann, ergänzen wir nach seiner Rückmeldung: Bearbeitungszeit und der sichere Weg für Originale und sensible Unterlagen.",
    inhalt: "Inhalt",
  },

  fragen: {
    eyebrow: "Häufige Fragen",
    titelStart: "Antworten in Kürze",
    alle: "Alle Fragen ansehen",
    seitenText: "Antworten zu beglaubigten Übersetzungen, zum Dolmetschen und zur Anfrage.",
    platzhalter: "Weitere Fragen nur mit Antworten des Kunden.",
    liste: [
      { frage: "Was ist eine beglaubigte Übersetzung?", antwort: ["Eine beglaubigte Übersetzung fertigt ein ermächtigter Übersetzer an. Behörden, Gerichte und andere offizielle Stellen können sie für fremdsprachige Dokumente verlangen. Ich bin seit Mai 2021 durch das Oberlandesgericht Schleswig als Übersetzer für die türkische und deutsche Sprache ermächtigt."] },
      { frage: "Welche Dokumente können übersetzt werden?", antwort: ["Dokumente aller Art, zum Beispiel Gerichtsurteile (auch Scheidungsurteile), Zeugnisse, Personalausweise, medizinische Unterlagen und Urkunden."] },
      { frage: "Was bedeutet „allgemein beeidigter Dolmetscher“?", antwort: ["Ich bin seit Mai 2021 durch das Oberlandesgericht Schleswig als Dolmetscher für die türkische und deutsche Sprache allgemein beeidigt. Umgangssprachlich spricht man oft von einem „vereidigten Dolmetscher“."] },
      { frage: "Für welche Sprachen übersetzen und dolmetschen Sie?", antwort: ["Für die türkische und die deutsche Sprache."] },
      { frage: "Was kostet eine Übersetzung oder ein Dolmetscheinsatz?", antwort: [`${HONORAR_TITEL}. ${HONORAR}`, HONORAR_BEISPIEL] },
      { frage: "In welchen Regionen dolmetschen Sie?", antwort: ["Vor Ort in Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen und Niedersachsen. Mein Standort ist Hamburg."] },
      { frage: "Dolmetschen Sie auch per Video oder Telefon?", antwort: ["Ja. Neben Einsätzen vor Ort dolmetsche ich auch per Video oder am Telefon."] },
      { frage: "Wie kann ich eine Anfrage senden?", antwort: [`Am einfachsten über das Anfrageformular auf der Kontaktseite. Sie können mich auch anrufen unter ${TELEFON}, per WhatsApp schreiben oder eine E-Mail an ${MAIL} senden. Schicken Sie mir Ihre Dokumente als Foto oder Scan, dann erhalten Sie einen Kostenvoranschlag.`] },
    ],
  },

  aufruf: {
    titel: "Benötigen Sie Unterstützung?",
    text: "Sie benötigen eine Übersetzung oder einen Dolmetscher? Nehmen Sie Kontakt auf.",
    knopf: "Jetzt Kontakt aufnehmen",
  },

  seiten: {
    uebersetzungen: {
      zeile: "Türkisch und Deutsch",
      lead: "Ihr Dokument muss bei einer Behörde, einem Gericht oder einer anderen offiziellen Stelle eingereicht werden? Gerne übersetze ich für Sie Dokumente aller Art.",
      dokTitel: "Dokumente aller Art",
      dokZeile: "Zum Beispiel:",
      ermTitel: "Ermächtigter Übersetzer",
      ermPlatzhalter: "Wortlaut zur Ermächtigung und Beglaubigung bitte vom Kunden bestätigen lassen (z. B. wie der Bestätigungsvermerk aussieht).",
      wissenTitel: "Gut zu wissen",
      wissenText: "Was ein Bestätigungsvermerk ist, ob eine Kopie genügt und wann eine Apostille gebraucht wird, steht im Ratgeber.",
      anfrageTitel: "Anfrage",
      anfrageText: "Nutzen Sie das Anfrageformular, rufen Sie mich an oder schreiben Sie mir per WhatsApp oder E-Mail. Schicken Sie Ihre Dokumente als Foto oder Scan, dann erhalten Sie einen Kostenvoranschlag.",
      honorarTitel: HONORAR_TITEL,
    },
    dolmetschen: {
      zeile: "Türkisch und Deutsch",
      beeidigtTitel: "Allgemein beeidigt",
      unterschiedTitel: "Mündlich und schriftlich",
      unterschiedText: "Ein Dolmetscher überträgt das gesprochene Wort, ein Übersetzer das geschriebene. Herr Tanrikulu ist für beides zugelassen.",
      erfahrungTitel: "Bisherige Erfahrungen",
      fernTitel: "Vor Ort, per Video oder Telefon",
      fernText: "Ich dolmetsche vor Ort und auch per Video oder am Telefon. Was für Ihren Termin passt, besprechen wir vorab.",
      ueberLink: "Mehr über mich",
    },
    ueber: {
      zeile: "Kerim Mikael Tanrikulu",
      beganTitel: "Wie alles begann",
      beganLabel: "Wie ich zum Übersetzen kam",
      zitatLabel: "Mein Verständnis meiner Arbeit",
      qualiTitel: "Qualifikation",
      studiumSatz: "Mein Studium habe ich 2021 als Bachelor of Arts in Philosophie und Germanistik abgeschlossen.",
    },
    kontakt: {
      lead: "Haben Sie Fragen oder möchten Sie eine Übersetzung oder einen Dolmetscher anfragen? Nutzen Sie das kurze Anfrageformular, rufen Sie an oder schreiben Sie mir per WhatsApp oder E-Mail.",
      wegeLabel: "Kontaktwege",
      schluss: "Das weitere individuelle Vorgehen teile ich Ihnen gerne in einem persönlichen Gespräch mit.",
      hinweisLabel: "Hinweis zur Anfrage",
      platzhalter: "Die bisherige Website hat ein Kontaktformular. Ob und wie es hier wieder eingebaut wird (eigener Versand, Spamschutz, Datenschutz), klären wir mit dem Kunden.",
    },
    nichtGefunden: {
      titel: "Diese Seite gibt es nicht",
      text: "Vielleicht hat sich die Adresse geändert.",
      start: "Zur Startseite",
      kontakt: "Zum Kontakt",
    },
    recht: {
      hinweisTr: "",
    },
  },
};

export type Texte = typeof de;
