// Zweisprachigkeit Deutsch/Türkisch (Can 31.10.2026): Routen je Sprache, Sprachwechsel bleibt auf der entsprechenden Seite.
// Deutsche Seiten liegen wie bisher unter /, türkische unter /tr/.
import { u } from "./daten";

export type Lang = "de" | "tr";
export const SPRACHEN_LISTE: Lang[] = ["de", "tr"];

/** Türkische Fassung von Kerim geprüft? Bis dahin zeigt jede türkische Seite den Entwurfs-Hinweis (auch live). */
export const TR_GEPRUEFT = false;

export const SEITEN = {
  start: { de: "/", tr: "/tr/" },
  uebersetzungen: { de: "/uebersetzungen/", tr: "/tr/ceviriler/" },
  dolmetschen: { de: "/dolmetschen/", tr: "/tr/sozlu-tercume/" },
  // Ratgeber + Häufige Fragen zusammengelegt (Jamil Talk xidc8qvq #5318, 09.11.2026); TR-Titel von Kerim prüfen lassen
  wissen: { de: "/gut-zu-wissen/", tr: "/tr/bilmeniz-gerekenler/" },
  ueber: { de: "/ueber-mich/", tr: "/tr/hakkimda/" },
  kontakt: { de: "/kontakt/", tr: "/tr/iletisim/" },
  impressum: { de: "/impressum/", tr: "/tr/kunye/" },
  datenschutz: { de: "/datenschutz/", tr: "/tr/gizlilik/" },
} as const;
export type Seite = keyof typeof SEITEN;

/** Frühere Adressen, die jetzt weiterleiten (kleine Seite mit meta refresh + Link, noindex):
 *  Themen entfällt (Jamil #5317) → Startseite der Sprache; Ratgeber und Häufige Fragen → „Gut zu wissen“ (Jamil #5318). */
export const ALTE_SEITEN = {
  themen: { de: "/themen/", tr: "/tr/konular/", ziel: "start", anker: "" },
  ratgeber: { de: "/ratgeber/", tr: "/tr/rehber/", ziel: "wissen", anker: "#ratgeber" },
  fragen: { de: "/fragen/", tr: "/tr/sss/", ziel: "wissen", anker: "#fragen" },
} as const satisfies Record<string, { de: string; tr: string; ziel: Seite; anker: string }>;

/** Pfad mit Base-Präfix für eine Seite in einer Sprache, z. B. p("tr", "wissen") → /kerim_tanrikulu/tr/bilmeniz-gerekenler/ */
export const p = (lang: Lang, seite: Seite, anker = "") => u(SEITEN[seite][lang]) + anker;

/** Seiten, auf denen das Anfrageformular selbst steht: Kontaktseite und seit Jamil Talk xidc8qvq #5312 (09.11.2026) die Startseite –
 *  seit #5314 in beiden Sprachen („türkische gleich gestalten wie deutsch“) */
export const mitFormular = (_lang: Lang, seite: Seite | null | undefined) => seite === "start" || seite === "kontakt";
/** Ziel des goldenen Hauptknopfs „Anfrage senden“ (Audit 09.11.2026, H1): Anfrageformular – auf Start- und Kontaktseite das Formular
 *  derselben Seite, sonst die Kontaktseite der Sprache. Der Betreff bleibt für einen möglichen E-Mail-Rückfall in der Signatur. */
export const anfrageLink = (lang: Lang, _betreff?: string, seite?: Seite | null) =>
  mitFormular(lang, seite) ? "#anfrage-titel" : p(lang, "kontakt", "#anfrage-titel");

/** Hauptnavigation (Startseite über das Logo), flach – so im Fuß, in Sitemap und llms.txt */
export const NAV_SEITEN: Seite[] = ["uebersetzungen", "dolmetschen", "wissen", "ueber", "kontakt"];
/** Kopf: Übersetzungen und Dolmetschen unter „Leistungen“ (Jamil Talk xidc8qvq #5315, 09.11.2026) */
export const LEISTUNGEN: Seite[] = ["uebersetzungen", "dolmetschen"];
export type NavEintrag = Seite | { gruppe: "leistungen"; seiten: Seite[] };
export const KOPF_NAV: NavEintrag[] = [{ gruppe: "leistungen", seiten: LEISTUNGEN }, "wissen", "ueber", "kontakt"];
/** In Sitemap und llms.txt */
export const OEFFENTLICH: Seite[] = ["start", ...NAV_SEITEN];
