// Einsatzgebiet als handgezeichnete Skizzen-Karte (Can 31.10.2026 11:29: „so eine Rough.js-Landkarte wie bei Bauwelt“).
// Technik wie Bauwelt (src/lib/rough-szene.ts): rough.js läuft NUR beim Bauen (rough.generator() braucht kein DOM),
// im Browser liegt nur fertiges SVG – kein Skript, keine CSP-Ausnahme. Fester Seed → jede Linie sieht bei jedem Build gleich aus.
// Ausnahme von Jamils „keine ungeraden Linien“ (Talk 3957) nur für diese Karte, ausdrücklich auf Cans Wunsch;
// roughness bewusst moderat (edel, nicht kindlich). Umrisse vereinfacht nach Längen-/Breitengraden (keine Kartendaten Dritter).
import rough from "roughjs";
import type { Options } from "roughjs/bin/core";
import type { Lang } from "../i18n";

const gen = rough.generator();

// Projektion: x = (Länge − 6,55) · K, y = (55,1 − Breite) · K · 1,66 (1° Breite ≈ 1,66° Länge auf 53,5° N)
const K = 100;
const P = (lon: number, lat: number): [number, number] => [Math.round((lon - 6.55) * K * 10) / 10, Math.round((55.1 - lat) * K * 1.66 * 10) / 10];
const BREITE = 520, HOEHE = 640;

// Vereinfachte Umrisse (Länge, Breite)
const SH: [number, number][] = [
  [8.66, 54.91], [9.44, 54.83], [9.95, 54.78], [10.03, 54.55], [10.2, 54.43], [10.87, 54.38], [11.05, 54.36], [10.8, 54.08],
  [10.88, 53.96], [10.95, 53.85], [10.78, 53.6], [10.62, 53.38], [10.32, 53.45], [10.2, 53.55], [10.05, 53.72], [9.85, 53.67],
  [9.73, 53.57], [9.42, 53.79], [9.13, 53.9], [8.87, 54.0], [8.83, 54.18], [8.63, 54.3], [8.9, 54.46], [8.8, 54.62],
];
const HH: [number, number][] = [[9.73, 53.57], [9.85, 53.67], [10.05, 53.72], [10.2, 53.58], [10.32, 53.45], [10.1, 53.4], [9.92, 53.42], [9.77, 53.47]];
const HB: [number, number][] = [[8.48, 53.2], [8.7, 53.17], [8.98, 53.08], [8.92, 53.01], [8.7, 53.02], [8.55, 53.12]];
const HB_HAFEN: [number, number][] = [[8.53, 53.6], [8.63, 53.58], [8.62, 53.5], [8.52, 53.52]];
const NI: [number, number][] = [
  [7.2, 53.3], [7.15, 53.62], [7.75, 53.7], [8.05, 53.7], [8.12, 53.52], [8.3, 53.6], [8.5, 53.55], [8.5, 53.75], [8.68, 53.88],
  [9.0, 53.83], [9.3, 53.7], [9.73, 53.57], [9.77, 53.47], [9.92, 53.42], [10.1, 53.4], [10.32, 53.45], [10.62, 53.38], [10.95, 53.25],
  [11.3, 53.1], [11.6, 53.0], [11.2, 52.85], [10.95, 52.6], [10.95, 52.3], [11.05, 52.0], [10.65, 51.65], [10.45, 51.48], [10.0, 51.42],
  [9.65, 51.42], [9.55, 51.62], [9.3, 51.72], [9.1, 52.0], [8.75, 52.12], [8.45, 52.45], [8.0, 52.35], [7.9, 52.1], [7.6, 52.4],
  [7.05, 52.25], [6.75, 52.45], [7.05, 52.65], [7.0, 52.95],
];
const ELBE: [number, number][] = [[11.45, 53.05], [10.95, 53.25], [10.6, 53.37], [10.3, 53.43], [10.0, 53.53], [9.73, 53.56], [9.4, 53.75], [9.1, 53.88], [8.75, 53.96], [8.5, 54.02]];

const T: Record<Lang, { sh: string; ni: string; hh: string; hb: string; sitz: string; nordsee: string; ostsee: string }> = {
  de: { sh: "Schleswig-Holstein", ni: "Niedersachsen", hh: "Hamburg", hb: "Bremen", sitz: "Standort", nordsee: "Nordsee", ostsee: "Ostsee" },
  tr: { sh: "Schleswig-Holstein", ni: "Aşağı Saksonya", hh: "Hamburg", hb: "Bremen", sitz: "Konum", nordsee: "Kuzey Denizi", ostsee: "Baltık Denizi" },
};

type Teil = { d: string; art: "s" | "f"; t: number; dauer?: number; farbe: string; breite: number; fill?: string };

/** Farben und Schriften für die eigenständige Datei (Anzeige als <img> ohne JavaScript). Beim Einsetzen per Skript
 *  (public/sichtbar.js) wird dieser Block entfernt – dann gelten die Farben der Seite (RoughKarte.astro). */
const DATEI_STIL = (dunkel: boolean) =>
  "<style data-datei=\"\">svg{" + (dunkel
    ? "--k-linie:#d9bd85;--k-schraffur:rgba(217,189,133,.36);--k-gold:#c9a35b;--k-punkt-rand:#fbf7f0;--k-fluss:rgba(243,237,228,.24);--k-text:#fbf7f0;--k-leise:#ddd2c3;--k-meer:#c9bdad;--k-hof:#2b241f"
    : "--k-linie:#6e5020;--k-schraffur:rgba(168,128,60,.42);--k-gold:#c9a35b;--k-punkt-rand:#2b241f;--k-fluss:rgba(43,36,31,.13);--k-text:#2b241f;--k-leise:#5f5349;--k-meer:#5f5349;--k-hof:#ebe0cf") +
  "}.rk-x{stroke:var(--k-hof);stroke-width:6px;paint-order:stroke;stroke-linejoin:round}.rk-p{fill:var(--k-text)}" +
  ".rk-land{font:600 25px Georgia,serif;fill:var(--k-text)}.rk-stadt{font:700 23px Arial,sans-serif;fill:var(--k-text)}.rk-gross{font-size:25px}" +
  ".rk-klein{font:600 18px Arial,sans-serif;fill:var(--k-leise)}.rk-meer{font:italic 500 19px Georgia,serif;fill:var(--k-meer)}</style>";
export const KARTE_MASSE = { breite: 520, hoehe: 640 };

/** SVG der Karte. `datei` = eigenständige .svg-Datei (mit xmlns, Größe und Farbblock für hell/dunkel). */
export function karteSvg(lang: Lang, datei?: { dunkel: boolean }): string {
  let seed = 11;
  const teile: Teil[] = [];
  const opt = (o: Options): Options => ({ roughness: 0.75, bowing: 0.6, seed: seed++, ...o });
  // rough-Drawable → einzelne Striche (je Kante zwei Teilpfade, nacheinander „angelegt“) und Schraffur
  const aufnehmen = (dr: ReturnType<typeof gen.polygon>, t: number, dauer: number) => {
    for (const set of dr.sets) {
      const d = gen.opsToPath(set, 1);
      if (set.type === "fillSketch") teile.push({ d, art: "f", t: t + dauer * 0.45, farbe: "var(--k-schraffur)", breite: dr.options.fillWeight || 1 });
      else if (set.type === "fillPath") teile.push({ d, art: "f", t: t + dauer * 0.45, farbe: "none", breite: 0, fill: String(dr.options.fill) });
      else if (set.type === "path")
        d.split(/(?=M)/).map((s) => s.trim()).filter(Boolean).forEach((teil, i) =>
          teile.push({ d: teil, art: "s", t: t + (i % 2) * dauer * 0.2, dauer, farbe: String(dr.options.stroke), breite: dr.options.strokeWidth }));
    }
  };
  const land = (pkte: [number, number][], t: number, dauer: number, o: Options = {}) =>
    aufnehmen(gen.polygon(pkte.map(([a, b]) => P(a, b)), opt({ stroke: "var(--k-linie)", strokeWidth: 2.2, fill: "var(--k-schraffur)", fillStyle: "hachure", hachureGap: 14, hachureAngle: -41, fillWeight: 1, ...o })), t, dauer);

  // Elbe (breiter, heller Strich), dann Länder, Hamburg zuletzt (Standort)
  aufnehmen(gen.curve(ELBE.map(([a, b]) => P(a, b)), opt({ stroke: "var(--k-fluss)", strokeWidth: 4.5, roughness: 0.5 })), 0, 0.7);
  land(NI, 0.1, 0.9);
  land(SH, 0.35, 0.8, { hachureAngle: -48 });
  land(HB, 0.75, 0.35, { strokeWidth: 1.8, hachureGap: 5 });
  land(HB_HAFEN, 0.8, 0.3, { strokeWidth: 1.6, hachureGap: 5 });
  land(HH, 0.85, 0.4, { strokeWidth: 2, fill: "var(--k-gold)", fillStyle: "solid" });

  const L = T[lang];
  const [hx, hy] = P(10.0, 53.56), [bx, by] = P(8.8, 53.08);
  const sitz = gen.circle(hx, hy, 17, opt({ stroke: "var(--k-punkt-rand)", strokeWidth: 2, fill: "var(--k-gold)", fillStyle: "solid", roughness: 0.5 }));
  const sitzPfade = sitz.sets.map((s) => `<path d="${gen.opsToPath(s, 1)}"${s.type === "fillPath" ? ` fill="var(--k-gold)" stroke="none"` : ` stroke="var(--k-punkt-rand)" stroke-width="2" fill="none"`}/>`).join("");

  // Zeiten als Klassen in 0,05-s-Schritten (t0…t40, d1…d20) – die CSP erlaubt keine style-Attribute
  const tk = (t: number) => `t${Math.min(40, Math.round(t / 0.05))}`;
  const dk = (d: number) => `d${Math.max(1, Math.min(20, Math.round(d / 0.05)))}`;
  const pfade = teile.map((p) => p.art === "s"
    ? `<path class="rk-s ${tk(p.t)} ${dk(p.dauer!)}" pathLength="1" d="${p.d}" stroke="${p.farbe}" stroke-width="${p.breite}"/>`
    : p.fill ? `<path class="rk-f ${tk(p.t)}" d="${p.d}" fill="${p.fill}" stroke="none"/>`
    : `<path class="rk-f ${tk(p.t)}" d="${p.d}" stroke="${p.farbe}" stroke-width="${p.breite}"/>`).join("");
  const text = (x: number, y: number, s: string, kl: string, t: number, anker = "middle") =>
    `<text class="rk-x ${kl} ${tk(t)}" x="${x}" y="${y}" text-anchor="${anker}">${s}</text>`;
  const [shx, shy] = P(9.55, 54.3), [nix, niy] = P(9.2, 52.55), [nsx, nsy] = P(7.4, 54.35), [osx, osy] = P(11.2, 54.75);
  const kopf = datei ? ` xmlns="http://www.w3.org/2000/svg" width="${BREITE}" height="${HOEHE}"` : "";
  return `<svg${kopf} class="rk-svg" viewBox="0 0 ${BREITE} ${HOEHE}" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">` +
    (datei ? DATEI_STIL(datei.dunkel) : "") + pfade +
    `<g class="rk-sitz ${tk(1.25)}">${sitzPfade}</g>` +
    `<circle class="rk-p ${tk(1.1)}" cx="${bx}" cy="${by}" r="5"/>` +
    text(shx, shy, L.sh, "rk-land", 1.0) +
    text(nix, niy, L.ni, "rk-land", 0.9) +
    text(P(10.36, 0)[0] + 10, hy + 2, L.hh, "rk-stadt rk-gross", 1.3, "start") +
    text(P(10.36, 0)[0] + 10, hy + 26, L.sitz, "rk-klein", 1.35, "start") +
    text(bx - 14, by + 30, L.hb, "rk-stadt", 1.15, "end") +
    text(nsx, nsy, L.nordsee, "rk-meer", 0.6) +
    text(osx, osy, L.ostsee, "rk-meer", 0.6) +
    "</svg>";
}
