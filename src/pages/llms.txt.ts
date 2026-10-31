// /llms.txt – Kurzfassung für KI-Suchen (nur belegte Angaben + als allgemein gekennzeichnetes Ratgeber-Wissen).
import type { APIRoute } from "astro";
import { NAME, MARKE, MAIL, TELEFON, TELEFON_BESTAETIGT, WHATSAPP_LINK, u } from "../daten";
import { OEFFENTLICH, SEITEN } from "../i18n";
import { t } from "../texte";

export const GET: APIRoute = ({ site }) => {
  const D = t("de"), R = t("tr");
  const url = (pfad: string) => new URL(u(pfad), site).href;
  const zeilen = [
    `# ${NAME} (${MARKE})`,
    "",
    `> ${D.meta.beschreibung}`,
    "",
    "Sprachen der Website: Deutsch (de) und Türkisch (tr). Die türkische Fassung ist ein Entwurf und wird vom Inhaber geprüft.",
    "",
    "## Qualifikation",
    `- ${D.fakten.dolmetscher} und ${D.fakten.uebersetzer}, durch das ${D.fakten.gericht}, seit ${D.fakten.seit}`,
    `- Studium: ${D.fakten.studienabschluss}`,
    `- Sprachen: ${D.fakten.sprachen}`,
    `- Standort: ${D.fakten.ort}`,
    `- Einsatzgebiet (Dolmetschen vor Ort): ${D.gebiet.satz}`,
    `- Außerdem: ${D.fakten.fernDolmetschen}`,
    "",
    "## Vorteile auf einen Blick",
    ...D.warum.punkte.map((w) => `- ${w.titel}: ${w.kurz}`),
    "",
    "## Leistungen",
    `- ${D.leistungen.ueTitel}: ${url(SEITEN.uebersetzungen.de)}`,
    `- ${D.leistungen.doTitel} (vor Ort, per Video oder Telefon): ${url(SEITEN.dolmetschen.de)}`,
    "",
    "## Dokumente (Beispiele laut Inhaber)",
    ...D.fakten.dokumente.map((d) => `- ${d.text}`),
    "",
    "## Bisherige Erfahrungen (u. a. Arbeit mit)",
    ...D.fakten.erfahrungen.map((e) => `- ${e}`),
    "",
    "## Honorar",
    `${D.fakten.honorarTitel}. ${D.fakten.honorar} ${D.fakten.honorarBeispiel}`,
    "",
    "## Ablauf",
    ...D.ablauf.schritte.map((a, i) => `${i + 1}. ${a.titel}: ${a.kurz}`),
    "",
    "## Häufige Fragen",
    ...D.fragen.liste.map((f) => `- ${f.frage} ${f.antwort.join(" ")}`),
    "",
    "## Ratgeber (allgemeine Information, keine Rechtsberatung)",
    ...D.ratgeber.kapitel.map((k) => `- ${k.frage} ${k.kurz} ${url(SEITEN.ratgeber.de)}#${k.id}`),
    "",
    "## Seiten (Deutsch)",
    ...OEFFENTLICH.map((s) => `- [${D.nav[s]}](${url(SEITEN[s].de)})`),
    "",
    "## Sayfalar (Türkçe)",
    ...OEFFENTLICH.map((s) => `- [${R.nav[s]}](${url(SEITEN[s].tr)})`),
    "",
    "## Kontakt",
    ...(TELEFON_BESTAETIGT ? [`- Telefon: ${TELEFON}`] : []),
    `- WhatsApp: ${WHATSAPP_LINK}`,
    `- E-Mail: ${MAIL}`,
  ];
  return new Response(zeilen.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
