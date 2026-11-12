// Logik des mehrstufigen Anfrageformulars (Kontaktseite und Startseite, DE und TR) (Jamil Talk xidc8qvq #5217, 09.11.2026).
// Läuft nur im Browser des Besuchers. Nichts wird gespeichert oder an die Website übertragen:
// Die fertige Anfrage schickt der Besucher selbst per E-Mail-Programm (mailto) oder WhatsApp (wa.me).
// Preise kommen nur aus src/daten/dokumente.ts und werden nur vom Skript eingesetzt (nie im HTML). Seit Jamil Talk xidc8qvq
// #5548/#5550 (12.11.2026) steht der Richtwert schon nach Dokument und Seitenzahl – vor den Kontaktdaten – und noch einmal in der Zusammenfassung.
import { THEMEN, MINDESTPREIS, STUNDENSATZ_DOLMETSCHEN, ANFAHRT_PAUSCHAL, ANFAHRT_PAUSCHAL_SCHULE_GERICHT, type Dokument, type Thema } from "../daten/dokumente";
import { DOK_TR } from "../daten/dokumente-tr";

export { THEMEN, MINDESTPREIS, STUNDENSATZ_DOLMETSCHEN, ANFAHRT_PAUSCHAL, ANFAHRT_PAUSCHAL_SCHULE_GERICHT };
/** Betrag mit Cent nur, wenn nötig: 93 → „93“, 46.5 → „46,50“ */
export const betrag = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
export type { Dokument, Thema };

/** Für die Suche: klein, ohne Akzente, ß → ss, türkisches ı/İ → i, nur Buchstaben/Ziffern. */
export const normal = (s: string) =>
  s
    .replace(/İ/g, "i")
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export type Eintrag = { dok: Dokument; thema: Thema };
const ALLE = THEMEN.flatMap((thema) =>
  thema.dokumente.map((dok) => ({ dok, thema, name: normal(dok.name), schluessel: normal([dok.name, ...(dok.aliase ?? []), DOK_TR[dok.id] ?? ""].join(" ")) })), // auch türkische Bezeichnung (#5314)
);

export const finden = (id: string): Eintrag | undefined => ALLE.find((e) => e.dok.id === id);
export const thema = (id: string): Thema | undefined => THEMEN.find((t) => t.id === id);

/** Suche über alle Dokumente inkl. Aliase. Alle Suchwörter müssen vorkommen; Namen, die mit dem Suchbegriff beginnen, zuerst. */
export function suchen(q: string, max = 40): Eintrag[] {
  const n = normal(q);
  const woerter = n.split(" ").filter(Boolean);
  if (!woerter.length) return [];
  return ALLE.filter((e) => woerter.every((w) => e.schluessel.includes(w)))
    .map((e) => ({ e, rang: e.name.startsWith(n) ? 0 : e.name.split(" ").some((w) => w.startsWith(woerter[0])) ? 1 : 2 }))
    .sort((a, b) => a.rang - b.rang)
    .slice(0, max)
    .map(({ e }) => ({ dok: e.dok, thema: e.thema }));
}

/** Unverbindlicher Richtwert: Spanne × Seiten (bei einheit „seite“), jeweils mindestens MINDESTPREIS. */
export function richtwert(dok: Dokument, seiten: number) {
  const faktor = dok.einheit === "seite" ? Math.max(1, Math.round(seiten) || 1) : 1;
  return {
    von: Math.max(dok.preisVon * faktor, MINDESTPREIS),
    bis: Math.max(dok.preisBis * faktor, MINDESTPREIS),
  };
}

export const euro = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 });
export const spanne = (r: { von: number; bis: number }, ca = "ca.") => (r.von === r.bis ? `${ca} ${euro(r.von)} €` : `${ca} ${euro(r.von)}–${euro(r.bis)} €`);

/** 2026-11-20 → 20.11.2026 */
export const datumDe = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};
