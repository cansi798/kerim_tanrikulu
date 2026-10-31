// Alle deutschen Texte der Website. Die türkische Fassung (tr.ts) hat genau dieselbe Form.
// Grundregel (Jamil Talk 3877/3904): Über Herrn Tanrikulu nur, was auf seiner bisherigen Website steht.
// Neu seit v4 (Can 31.10.2026): allgemeines Ratgeber-Wissen, das für jeden beeidigten Dolmetscher und
// ermächtigten Übersetzer in Deutschland gilt – als Wissen formuliert, nicht als Leistungsversprechen.
import { NAME, MAIL, TELEFON, TITEL_NAME } from "../daten";

const HONORAR =
  "Das Honorar richtet sich nach dem JVEG (Justizvergütungs- und -entschädigungsgesetz). Das weitere individuelle Vorgehen teile ich Ihnen gerne in einem persönlichen Gespräch mit.";

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
    portraitAlt: `Portrait von ${NAME}`,
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
    themen: "Themen",
    ratgeber: "Ratgeber",
    ueber: "Über mich",
    fragen: "Häufige Fragen",
    kontakt: "Kontakt",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
  },

  meta: {
    // SEO v5 (Can 10:46): Leistung + Region, natürlich formuliert
    titelStart: `Übersetzer und Dolmetscher Türkisch in Hamburg | ${TITEL_NAME}`,
    beschreibung:
      "Beglaubigte Übersetzungen und Dolmetschen Türkisch–Deutsch: Kerim Tanrikulu, beeidigt und ermächtigt vom OLG Schleswig. Hamburg, Schleswig-Holstein, Bremen, Niedersachsen.",
    uebersetzungen: { titel: "Beglaubigte Übersetzungen Türkisch–Deutsch in Hamburg", beschreibung: "Beglaubigte Übersetzungen Türkisch und Deutsch vom ermächtigten Übersetzer Kerim Mikael Tanrikulu in Hamburg: Urteile, Zeugnisse, Ausweise, medizinische Unterlagen, Urkunden. Honorar nach JVEG." },
    dolmetschen: { titel: "Dolmetscher Türkisch: Hamburg, Schleswig-Holstein, Bremen, Niedersachsen", beschreibung: "Allgemein beeidigter Dolmetscher für Türkisch und Deutsch (OLG Schleswig, seit Mai 2021). Einsatzgebiet Hamburg, Schleswig-Holstein, Bremen und Niedersachsen." },
    themen: { titel: "Typische Dokumente Türkisch und Deutsch", beschreibung: "Welche türkischen Dokumente deutsche Stellen und welche deutschen Dokumente türkische Stellen häufig übersetzt verlangen: Personenstand, Urteile, Zeugnisse, Ausweise, medizinische Unterlagen." },
    ratgeber: { titel: "Ratgeber beglaubigte Übersetzung und Apostille", beschreibung: "Allgemeine Informationen: Was ist eine beglaubigte Übersetzung, was unterscheidet Dolmetscher und Übersetzer, Original oder Kopie, Apostille zwischen Deutschland und der Türkei, mehrsprachige Auszüge, JVEG." },
    ueber: { titel: "Über mich", beschreibung: "Kerim Mikael Tanrikulu, allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für die türkische und deutsche Sprache durch das Oberlandesgericht Schleswig seit Mai 2021." },
    fragen: { titel: "Häufige Fragen", beschreibung: "Antworten zu beglaubigten Übersetzungen und Dolmetschen Türkisch und Deutsch: was eine beglaubigte Übersetzung ist, welche Dokumente übersetzt werden, Honorar nach JVEG, Anfrage." },
    kontakt: { titel: "Kontakt", beschreibung: "Kontakt zu Kerim Mikael Tanrikulu, Dolmetscher und Übersetzer für Türkisch und Deutsch in Hamburg: Telefon und E-Mail." },
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
    ],
    dokumenteSatz: "Gerne übersetze ich für Sie Dokumente aller Art, wie zum Beispiel Gerichtsurteile, darunter auch Scheidungsurteile, Zeugnisse, Personalausweise, medizinische Unterlagen und Urkunden.",
    dokumente: [
      { icon: "urteil", text: "Gerichtsurteile, darunter auch Scheidungsurteile" },
      { icon: "zeugnis", text: "Zeugnisse" },
      { icon: "ausweis", text: "Personalausweise" },
      { icon: "medizin", text: "medizinische Unterlagen" },
      { icon: "urkunde", text: "Urkunden" },
    ],
    honorar: HONORAR,
    ermaechtigtSatz: "Seit Mai 2021 bin ich durch das Oberlandesgericht Schleswig als Übersetzer für die türkische und deutsche Sprache ermächtigt.",
    beeidigtSatz: "Seit Mai 2021 bin ich durch das Oberlandesgericht Schleswig als Dolmetscher für die türkische und deutsche Sprache allgemein beeidigt.",
    nachweise: [
      { titel: "Dolmetscher", wert: "allgemein beeidigt" },
      { titel: "Übersetzer", wert: "ermächtigt" },
      { titel: "Beeidigt und ermächtigt durch", wert: "Oberlandesgericht Schleswig" },
      { titel: "Seit", wert: "Mai 2021" },
      { titel: "Sprachen", wert: "Deutsch und Türkisch" },
      { titel: "Standort", wert: "Hamburg" },
    ],
  },

  hero: {
    badge: "Allgemein beeidigter Dolmetscher und ermächtigter Übersetzer",
    h1: "Beglaubigte Übersetzungen und Dolmetscher­dienstleistungen für Deutsch und Türkisch",
    sub: "Für Behörden, Gerichte und andere offizielle Stellen.",
    vertrauen: ["Dolmetscher", "Übersetzer", "Deutsch und Türkisch"],
    karten: ["Beglaubigte Übersetzungen", "Dolmetschen", "Deutsch und Türkisch"],
    kartenKurz: ["Urkunden, Urteile, Zeugnisse und mehr", "Gespräche und Termine, allgemein beeidigt", "Typische Dokumente in beide Richtungen"],
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
    platzhalter: "Wortlaute der sechs Vorteile und das Einsatzgebiet (Vorgabe von Can) bitte von Herrn Tanrikulu bestätigen lassen.",
    punkte: [
      { icon: "gespraech", titel: "Mündlich und schriftlich aus einer Hand", kurz: "Ein Ansprechpartner für Dokumente und Gespräche.", lang: "Er ist allgemein beeidigter Dolmetscher und ermächtigter Übersetzer. Für Übersetzung und Termin brauchen Sie nur einen Ansprechpartner.", seite: "dolmetschen", anker: "#unterschied-titel" },
      { icon: "schild", titel: "Beeidigt und ermächtigt vom OLG Schleswig", kurz: "Seit Mai 2021, für Türkisch und Deutsch.", lang: "Die Übersetzung eines in Deutschland ermächtigten Übersetzers ist die übliche Form für deutsche Behörden und Gerichte.", seite: "ratgeber", anker: "#beglaubigt" },
      { icon: "urteil", titel: "Erfahrung mit Gerichten und Behörden", kurz: "Amtsgerichte, Konsulat, BAMF und Schulen.", lang: "Unter anderem Amtsgerichte in Schleswig-Holstein, das Türkische Konsulat in Hamburg, das Bundesamt für Migration und Flüchtlinge, das IQSH und Hamburger Schulen.", seite: "ueber", anker: "#erfahrung-titel" },
      { icon: "dokument", titel: "Honorar nach JVEG", kurz: "Nach dem Gesetz, nach dem auch Gerichte vergüten.", lang: "Das JVEG regelt, wie Gerichte und Behörden Dolmetscher und Übersetzer bezahlen. Was es in Ihrem Fall kostet, bespricht Herr Tanrikulu persönlich mit Ihnen.", seite: "ratgeber", anker: "#jveg" },
      { icon: "telefon", titel: "Unkompliziert erreichbar", kurz: "Direkt per Telefon oder E-Mail, ohne Formular.", lang: "Kein Formular, keine Umwege: Sie sprechen oder schreiben direkt mit Herrn Tanrikulu.", seite: "kontakt", anker: "" },
      { icon: "bruecke", titel: "Persönlicher Bezug zu beiden Kulturen", kurz: "Seine Begeisterung fürs Übersetzen begann in der Türkei.", lang: "Entdeckt hat er sie bei einem Studienaufenthalt in der Türkei. Seine Arbeit versteht er als „Brückenbildung zwischen den Kulturen“.", seite: "ueber", anker: "" },
    ],
  },

  // Einsatzgebiet: Vorgabe von Can (31.10.2026 10:46), steht nicht auf Kerims bisheriger Seite → OFFENE-INFOS
  gebiet: {
    titel: "Einsatzgebiet",
    laender: ["Hamburg", "Schleswig-Holstein", "Bremen", "Niedersachsen"],
    satz: "Hamburg, Schleswig-Holstein, Bremen und Niedersachsen",
    zusatz: "Standort Hamburg. Dolmetschen vor Ort in diesen vier Ländern.",
    karte: "Karte: Einsatzgebiet Hamburg, Schleswig-Holstein, Bremen und Niedersachsen",
  },

  ablauf: {
    eyebrow: "Ablauf",
    titel: "So einfach geht's",
    text: "In drei Schritten zu Ihrer Übersetzung oder Ihrem Termin.",
    aria: "Ablauf in drei Schritten",
    schritte: [
      { icon: "telefon", titel: "Kontakt aufnehmen", kurz: "Anrufen oder eine E-Mail schreiben." },
      { icon: "gespraech", titel: "Anliegen besprechen", kurz: "Das weitere Vorgehen klärt Herr Tanrikulu persönlich mit Ihnen." },
      { icon: "dokument", titel: "Übersetzung oder Termin", kurz: "Sie erhalten Ihre beglaubigte Übersetzung, oder er dolmetscht bei Ihrem Termin." },
    ],
    platzhalter: "Ablauf bewusst allgemein formuliert (Can 31.10.). Bitte von Herrn Tanrikulu bestätigen, wie ein Auftrag bei ihm abläuft.",
  },

  gut: {
    eyebrow: "Gut zu wissen",
    titel: "Kurze Antworten",
    mehr: "Mehr dazu",
    fragen: [
      { frage: "Brauche ich eine beglaubigte Übersetzung?", antwort: "Behörden, Gerichte und andere offizielle Stellen können sie für fremdsprachige Dokumente verlangen. Ob Sie eine brauchen, sagt Ihnen die Stelle, bei der Sie das Dokument einreichen.", seite: "ratgeber", anker: "#beglaubigt" },
      { frage: "Welche Dokumente werden übersetzt?", antwort: "Dokumente aller Art, zum Beispiel Gerichtsurteile (auch Scheidungsurteile), Zeugnisse, Personalausweise, medizinische Unterlagen und Urkunden.", seite: "themen", anker: "" },
      { frage: "Dolmetscher oder Übersetzer?", antwort: "Ein Dolmetscher überträgt das gesprochene Wort, ein Übersetzer das geschriebene. Herr Tanrikulu ist für beides zugelassen.", seite: "ratgeber", anker: "#dolmetscher-uebersetzer" },
      { frage: "Was kostet es?", antwort: "Das Honorar richtet sich nach dem JVEG. Was es in Ihrem Fall kostet, bespricht Herr Tanrikulu persönlich mit Ihnen.", seite: "ratgeber", anker: "#jveg" },
      { frage: "In welchen Regionen dolmetscht Herr Tanrikulu?", antwort: "In Hamburg, Schleswig-Holstein, Bremen und Niedersachsen. Sein Standort ist Hamburg.", seite: "dolmetschen", anker: "#gebiet-titel" },
      { frage: "Brauche ich eine Apostille?", antwort: "Die Apostille bestätigt, dass eine öffentliche Urkunde echt ist. Ob sie nötig ist, hängt von der Urkunde und von der Stelle ab, die sie verlangt.", seite: "ratgeber", anker: "#apostille" },
    ],
  },

  themen: {
    eyebrow: "Themen",
    titel: "Typische Dokumente in beide Richtungen",
    text: "Für diese Dokumente verlangen Behörden, Gerichte und andere Stellen häufig eine beglaubigte Übersetzung. Die Übersicht ist allgemein. Welche Aufträge Herr Tanrikulu übernimmt, klären Sie bitte direkt mit ihm.",
    legende: "Mit Häkchen markiert: Dokumentarten, die Herr Tanrikulu auf seiner Website selbst als Beispiele nennt.",
    laut: "Laut Herrn Tanrikulu",
    trde: {
      kopf: "Türkçe → Deutsch",
      titel: "Türkische Dokumente für deutsche Stellen",
      gruppen: [
        { titel: "Personenstand und Familie", eintraege: [
          { text: "Auszug aus dem Personenstandsregister", tr: "Nüfus kayıt örneği", kerim: false },
          { text: "Geburtsurkunde", tr: "Doğum belgesi", kerim: true },
          { text: "Heiratsurkunde und Familienheft", tr: "Evlenme cüzdanı", kerim: true },
          { text: "Erbschein", tr: "Veraset ilamı", kerim: false },
        ] },
        { titel: "Gerichte und Behörden", eintraege: [
          { text: "Gerichtsurteile", tr: "Mahkeme kararları", kerim: true },
          { text: "Scheidungsurteile, oft mit Rechtskraftvermerk", tr: "Boşanma kararı, kesinleşme şerhi", kerim: true },
          { text: "Schreiben von Gerichten und Behörden", tr: "Resmî yazılar", kerim: false },
        ] },
        { titel: "Schule, Studium, Beruf", eintraege: [
          { text: "Zeugnisse und Diplome, zum Beispiel für die Anerkennung", tr: "Diploma, transkript", kerim: true },
        ] },
        { titel: "Ausweis, Führerschein, Gesundheit", eintraege: [
          { text: "Personalausweis", tr: "Kimlik kartı", kerim: true },
          { text: "Führerschein", tr: "Sürücü belgesi", kerim: false },
          { text: "Medizinische Unterlagen", tr: "Sağlık raporu, epikriz", kerim: true },
        ] },
      ],
    },
    detr: {
      kopf: "Deutsch → Türkçe",
      titel: "Deutsche Dokumente für türkische Stellen",
      gruppen: [
        { titel: "Personenstand und Familie", eintraege: [
          { text: "Geburts-, Heirats- und Sterbeurkunden", tr: "Doğum, evlenme ve ölüm belgeleri", kerim: true },
        ] },
        { titel: "Gerichte und Notare", eintraege: [
          { text: "Urteile deutscher Gerichte", tr: "Alman mahkeme kararları", kerim: true },
          { text: "Scheidungsurteile, etwa für die Anerkennung in der Türkei", tr: "Boşanma kararı, tanıma", kerim: true },
          { text: "Vollmachten und notarielle Urkunden", tr: "Vekâletname, noter belgeleri", kerim: false },
        ] },
        { titel: "Schule, Studium, Beruf", eintraege: [
          { text: "Zeugnisse und Ausbildungsnachweise", tr: "Diploma, denklik", kerim: true },
          { text: "Arbeits- und Rentenunterlagen", tr: "Çalışma ve emeklilik belgeleri", kerim: false },
        ] },
        { titel: "Ausweis und Gesundheit", eintraege: [
          { text: "Personalausweis", tr: "Kimlik kartı", kerim: true },
          { text: "Arztbriefe und Befunde", tr: "Doktor raporları", kerim: true },
        ] },
      ],
    },
    teaserLink: "Alle Themen ansehen",
    hinweisAnfrage: "Ihr Dokument ist nicht dabei? Fragen Sie einfach nach.",
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
        frage: "Was bedeutet „Honorar nach JVEG“?",
        begriff: "JVEG",
        kurz: "Das JVEG regelt, wie Gerichte und Behörden Dolmetscher und Übersetzer vergüten. Herr Tanrikulu richtet sein Honorar danach.",
        absaetze: [
          "Das Justizvergütungs- und -entschädigungsgesetz (JVEG) regelt, wie Gerichte und Behörden Dolmetscher und Übersetzer vergüten: beim Dolmetschen nach Zeit, bei Übersetzungen nach dem Umfang des Textes.",
          "Herr Tanrikulu richtet sein Honorar nach dem JVEG. Was eine Übersetzung oder ein Einsatz in Ihrem Fall kostet, besprechen Sie am besten direkt mit ihm.",
        ],
      },
    ],
    platzhalter: "Was nur Herr Tanrikulu beantworten kann, ergänzen wir nach seiner Rückmeldung: Preise im Einzelfall, Bearbeitungszeit, Ablauf eines Auftrags und ob Unterlagen per Post oder E-Mail geschickt werden können.",
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
      { frage: "Was kostet eine Übersetzung oder ein Dolmetscheinsatz?", antwort: [HONORAR] },
      { frage: "In welchen Regionen dolmetschen Sie?", antwort: ["In Hamburg, Schleswig-Holstein, Bremen und Niedersachsen. Mein Standort ist Hamburg."] },
      { frage: "Wie kann ich eine Anfrage senden?", antwort: [`Schreiben Sie eine E-Mail an ${MAIL} oder rufen Sie an unter ${TELEFON}. Das weitere individuelle Vorgehen teile ich Ihnen gerne in einem persönlichen Gespräch mit.`] },
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
      themenLink: "Typische Dokumente in beide Richtungen",
      anfrageTitel: "Anfrage",
      anfrageText: "Rufen Sie mich an oder senden Sie mir eine Anfrage per E-Mail.",
      honorarTitel: "Honorar",
    },
    dolmetschen: {
      zeile: "Türkisch und Deutsch",
      beeidigtTitel: "Allgemein beeidigt",
      unterschiedTitel: "Mündlich und schriftlich",
      unterschiedText: "Ein Dolmetscher überträgt das gesprochene Wort, ein Übersetzer das geschriebene. Herr Tanrikulu ist für beides zugelassen.",
      erfahrungTitel: "Bisherige Erfahrungen",
      platzhalter: "Typische Einsätze bitte vom Kunden nennen lassen. Das Einsatzgebiet (Hamburg, Schleswig-Holstein, Bremen, Niedersachsen) hat Can vorgegeben, bitte von Herrn Tanrikulu bestätigen.",
      ueberLink: "Mehr über mich",
    },
    ueber: {
      zeile: "Kerim Mikael Tanrikulu",
      beganTitel: "Wie alles begann",
      beganLabel: "Wie ich zum Übersetzen kam",
      zitatLabel: "Mein Verständnis meiner Arbeit",
      qualiTitel: "Qualifikation",
    },
    kontakt: {
      lead: "Haben Sie Fragen oder möchten Sie eine Übersetzung oder einen Dolmetscher anfragen? Rufen Sie an oder schreiben Sie mir eine E-Mail.",
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
