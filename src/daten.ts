// Eine Quelle für alle Angaben der Website. Seiten, JSON-LD, sitemap.xml und llms.txt lesen von hier.
// Inhalte stammen aus der bisherigen Jimdo-Seite des Kunden und aus Jamils Konzept (Talk 30.10.2026).
// Nichts ergänzen, was nicht belegt ist. Offene Punkte stehen in OFFENE-INFOS.md.

/** Vorschau-Modus: noindex, robots „Disallow: /“, Vorschau-Banner und sichtbare Platzhalter.
 *  Beim Livegang mit VORSCHAU=false bauen. */
export const VORSCHAU = process.env.VORSCHAU !== "false";

const BASIS = import.meta.env.BASE_URL.replace(/\/$/, "");
/** Pfad mit Base-Präfix, z. B. u("/kontakt/") → /kerim_tanrikulu/kontakt/ */
export const u = (pfad: string) => `${BASIS}${pfad}`;

export const NAME = "Kerim Mikael Tanrikulu";
export const MARKE = "Tanrikulu Translations";
export const DOLMETSCHER = "allgemein beeidigter Dolmetscher";
export const UEBERSETZER = "ermächtigter Übersetzer";
export const GERICHT = "Oberlandesgericht Schleswig";
export const SEIT = "Mai 2021";
export const SPRACHEN = "Deutsch und Türkisch";
/** Standort laut Jamils Konzept; vom Kunden bestätigen lassen (OFFENE-INFOS). */
export const ORT = "Hamburg";

export const MAIL = "info@dolmetscher-kt.de";
/** Aus dem Screenshot der Jimdo-Seite gelesen – vor dem Livegang vom Kunden bestätigen. */
export const TELEFON = "0177 4207 664";
export const TELEFON_LINK = "tel:+491774207664";
export const TELEFON_BESTAETIGT = false;

export const mailLink = (betreff = "Anfrage über die Website") =>
  `mailto:${MAIL}?subject=${encodeURIComponent(betreff)}`;

export const BESCHREIBUNG =
  "Kerim Mikael Tanrikulu ist allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für Deutsch und Türkisch (Oberlandesgericht Schleswig, seit Mai 2021). Beglaubigte Übersetzungen und Dolmetschen, Standort Hamburg.";

/** Bisherige Erfahrungen, wörtlich nach der Jimdo-Seite. */
export const ERFAHRUNGEN = [
  "Amtsgerichte in Schleswig-Holstein",
  "Türkisches Konsulat in Hamburg",
  "Institut für Qualitätsentwicklung an Schulen Schleswig-Holstein",
  "Hamburger Schulen",
  "Bundesamt für Migration und Flüchtlinge",
];

/** Dokumentarten, wörtlich nach der Jimdo-Seite („Dokumente aller Art, wie zum Beispiel …“). */
export const DOKUMENTE = [
  "Gerichtsurteile, darunter auch Scheidungsurteile",
  "Zeugnisse",
  "Personalausweise",
  "medizinische Unterlagen",
  "Urkunden",
];

export const HONORAR =
  "Das Honorar richtet sich nach dem JVEG (Justizvergütungs- und -entschädigungsgesetz). Das weitere individuelle Vorgehen teile ich Ihnen gerne in einem persönlichen Gespräch mit.";

/** Nachweisbare Angaben für den Vertrauensbereich. */
export const NACHWEISE = [
  { titel: "Dolmetscher", wert: "allgemein beeidigt" },
  { titel: "Übersetzer", wert: "ermächtigt" },
  { titel: "Beeidigt und ermächtigt durch", wert: GERICHT },
  { titel: "Seit", wert: SEIT },
  { titel: "Sprachen", wert: SPRACHEN },
  { titel: "Standort", wert: ORT },
];

export type Frage = { frage: string; antwort: string[] };
/** Nur Fragen, die mit belegten Angaben beantwortet werden können (Jamils Konzept). */
export const FRAGEN: Frage[] = [
  {
    frage: "Was ist eine beglaubigte Übersetzung?",
    antwort: [
      "Bei einer beglaubigten Übersetzung bestätigt ein ermächtigter Übersetzer schriftlich, dass die Übersetzung richtig und vollständig ist. Behörden und Gerichte verlangen diese Form häufig, wenn Sie fremdsprachige Unterlagen einreichen.",
    ],
  },
  {
    frage: "Brauche ich für mein Dokument eine beglaubigte Übersetzung?",
    antwort: [
      "Das legt die Stelle fest, bei der Sie das Dokument einreichen, also zum Beispiel die Behörde oder das Gericht. Fragen Sie dort im Zweifel nach, welche Form verlangt wird.",
    ],
  },
  {
    frage: "Welche Dokumente können übersetzt werden?",
    antwort: [
      "Dokumente aller Art, zum Beispiel Gerichtsurteile (auch Scheidungsurteile), Zeugnisse, Personalausweise, medizinische Unterlagen und Urkunden.",
    ],
  },
  {
    frage: "Was bedeutet „allgemein beeidigter Dolmetscher“?",
    antwort: [
      `Ein allgemein beeidigter Dolmetscher hat vor einem Gericht einen allgemeinen Eid geleistet, der für seine Dolmetschertätigkeit gilt. Umgangssprachlich heißt das oft „vereidigter Dolmetscher“. Ich bin seit ${SEIT} durch das ${GERICHT} allgemein beeidigt.`,
    ],
  },
  {
    frage: "Für welche Sprachen übersetzen und dolmetschen Sie?",
    antwort: ["Für die türkische und die deutsche Sprache."],
  },
  {
    frage: "Was kostet eine Übersetzung oder ein Dolmetscheinsatz?",
    antwort: [HONORAR],
  },
  {
    frage: "Wie kann ich eine Anfrage senden?",
    antwort: [
      `Schreiben Sie eine E-Mail an ${MAIL} oder rufen Sie an unter ${TELEFON}. Beschreiben Sie kurz, worum es geht: bei Übersetzungen welches Dokument und wofür Sie es brauchen, beim Dolmetschen Datum, Ort und Art des Termins.`,
    ],
  },
];

export const NAV = [
  { href: "/", label: "Startseite" },
  { href: "/uebersetzungen/", label: "Übersetzungen" },
  { href: "/dolmetschen/", label: "Dolmetschen" },
  { href: "/ueber-mich/", label: "Über mich" },
  { href: "/fragen/", label: "Häufige Fragen" },
  { href: "/kontakt/", label: "Kontakt" },
];

export const RECHTLICHES = [
  { href: "/impressum/", label: "Impressum" },
  { href: "/datenschutz/", label: "Datenschutz" },
];
