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
  themen: { de: "/themen/", tr: "/tr/konular/" },
  ratgeber: { de: "/ratgeber/", tr: "/tr/rehber/" },
  ueber: { de: "/ueber-mich/", tr: "/tr/hakkimda/" },
  fragen: { de: "/fragen/", tr: "/tr/sss/" },
  kontakt: { de: "/kontakt/", tr: "/tr/iletisim/" },
  impressum: { de: "/impressum/", tr: "/tr/kunye/" },
  datenschutz: { de: "/datenschutz/", tr: "/tr/gizlilik/" },
} as const;
export type Seite = keyof typeof SEITEN;

/** Pfad mit Base-Präfix für eine Seite in einer Sprache, z. B. p("tr", "themen") → /kerim_tanrikulu/tr/konular/ */
export const p = (lang: Lang, seite: Seite, anker = "") => u(SEITEN[seite][lang]) + anker;

/** Hauptnavigation (Startseite über das Logo) */
export const NAV_SEITEN: Seite[] = ["uebersetzungen", "dolmetschen", "themen", "ratgeber", "ueber", "fragen", "kontakt"];
/** In Sitemap und llms.txt */
export const OEFFENTLICH: Seite[] = ["start", ...NAV_SEITEN];
