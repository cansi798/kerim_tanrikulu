// /llms.txt – Kurzfassung für KI-Suchen, aus daten.ts erzeugt (nur belegte Angaben).
import type { APIRoute } from "astro";
import { NAME, MARKE, BESCHREIBUNG, DOLMETSCHER, UEBERSETZER, GERICHT, SEIT, SPRACHEN, ORT, MAIL, TELEFON, TELEFON_BESTAETIGT, DOKUMENTE, ERFAHRUNGEN, HONORAR, NAV, FRAGEN, u } from "../daten";

export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(u(p), site).href;
  const zeilen = [
    `# ${NAME} (${MARKE})`,
    "",
    `> ${BESCHREIBUNG}`,
    "",
    "## Qualifikation",
    `- ${DOLMETSCHER} und ${UEBERSETZER}, durch das ${GERICHT}, seit ${SEIT}`,
    `- Sprachen: ${SPRACHEN}`,
    `- Standort: ${ORT}`,
    "",
    "## Leistungen",
    `- Beglaubigte Übersetzungen: ${url("/uebersetzungen/")}`,
    `- Dolmetschen: ${url("/dolmetschen/")}`,
    "",
    "## Dokumente (Beispiele)",
    ...DOKUMENTE.map((d) => `- ${d}`),
    "",
    "## Bisherige Erfahrungen (u. a. Arbeit mit)",
    ...ERFAHRUNGEN.map((e) => `- ${e}`),
    "",
    "## Honorar",
    HONORAR,
    "",
    "## Häufige Fragen",
    ...FRAGEN.map((f) => `- ${f.frage} ${f.antwort.join(" ")}`),
    "",
    "## Seiten",
    ...NAV.map((n) => `- [${n.label}](${url(n.href)})`),
    "",
    "## Kontakt",
    `- E-Mail: ${MAIL}`,
    ...(TELEFON_BESTAETIGT ? [`- Telefon: ${TELEFON}`] : []),
  ];
  return new Response(zeilen.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
