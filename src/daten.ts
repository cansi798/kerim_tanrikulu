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
/** Kurzform für Seitentitel (SEO v5, Can 31.10.2026): „<Leistung + Ort> | Kerim Tanrikulu“ */
export const TITEL_NAME = "Kerim Tanrikulu";
export const MARKE = "Tanrikulu Translations";
export const DOLMETSCHER = "allgemein beeidigter Dolmetscher";
export const UEBERSETZER = "ermächtigter Übersetzer";
export const GERICHT = "Oberlandesgericht Schleswig";
export const SEIT = "Mai 2021";
export const SPRACHEN = "Deutsch und Türkisch";
/** Standort laut Jamils Konzept; vom Kunden bestätigen lassen (OFFENE-INFOS). */
export const ORT = "Hamburg";
/** Einsatzgebiet fürs Dolmetschen vor Ort: Vorgabe von Can (31.10.2026 10:46), von Kerim bestätigt und um
 *  Mecklenburg-Vorpommern ergänzt (Kerims Feedback über Jamil, Talk 3990, 31.10.2026). Für JSON-LD areaServed (Bundesländer, deutsche Namen). */
export const GEBIET = ["Hamburg", "Schleswig-Holstein", "Mecklenburg-Vorpommern", "Bremen", "Niedersachsen"];

/** Claim laut Jamil (Talk 3904). Kerims eigener Satz lautet „Brückenbildung zwischen den Kulturen“ – Wortlaut bestätigen lassen (OFFENE-INFOS). */
export const CLAIM = "Brücken bauen zwischen den Sprachen";
/** Portraitfoto von Kerim (Talk 3991/3992, 31.10.2026): leicht aufgehellt, quadratisch aufs Gesicht zugeschnitten, rund per CSS.
 *  Basisname unter public/; es gibt <basis>-<größe>.avif und .webp in PORTRAIT_GROESSEN (ohne EXIF/Metadaten). */
export const PORTRAIT: string | null = "/portrait/kerim-portrait";
export const PORTRAIT_GROESSEN = [240, 400, 560];

export const MAIL = "info@dolmetscher-kt.de";
/** Von der Jimdo-Seite; seit Kerims Feedback (Talk 3993, WhatsApp über diese Nummer) als bestätigt behandelt. */
export const TELEFON = "0177 4207 664";
export const TELEFON_LINK = "tel:+491774207664";
export const TELEFON_INTERNATIONAL = "+49 177 4207664";
export const TELEFON_BESTAETIGT = true;
/** WhatsApp (Kerim Talk 3993, Jamil 3994: überall, wo „Anrufen“ oder „E-Mail schreiben“ steht). Nur ein Link, kein Widget/Skript. */
export const WHATSAPP_LINK = "https://wa.me/491774207664";

export const mailLink = (betreff = "Anfrage über die Website") =>
  `mailto:${MAIL}?subject=${encodeURIComponent(betreff)}`;

export const BESCHREIBUNG =
  "Kerim Mikael Tanrikulu ist allgemein beeidigter Dolmetscher und ermächtigter Übersetzer für Deutsch und Türkisch (Oberlandesgericht Schleswig, seit Mai 2021). Beglaubigte Übersetzungen und Dolmetschen (vor Ort, per Video oder Telefon), Standort Hamburg.";

// Texte (DE/TR), Erfahrungen, Dokumentarten, Fragen und Ratgeber stehen seit v4 in src/texte/de.ts und tr.ts,
// Routen und Navigation in src/i18n.ts.
