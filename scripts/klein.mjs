// Verkleinert die handgeschriebenen Skripte aus public/ nach dem Bauen (Audit 09.11.2026, M5 Ladezeit).
// Astro/Vite kopiert public/ unverändert – deshalb hier mit dem Minifier, der ohnehin mit Vite (rolldown/oxc) installiert ist.
// Kein Umbenennen auf oberster Ebene: window.LichtKern (licht.js → gespraech.js) und die Reihenfolge der Skripte bleiben, wie sie sind.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { minifySync } from "rolldown/utils";

const DATEIEN = ["licht.js", "gespraech.js", "sichtbar.js"];
let vorher = 0, nachher = 0;
for (const name of DATEIEN) {
  const pfad = `dist/${name}`;
  if (!existsSync(pfad)) continue;
  const roh = readFileSync(pfad, "utf8");
  const r = minifySync(name, roh, { compress: true, mangle: { toplevel: false } });
  if (r.errors && r.errors.length) { console.error("Fehler beim Verkleinern von", name, r.errors); process.exit(1); }
  writeFileSync(pfad, r.code);
  vorher += roh.length; nachher += r.code.length;
  console.log(`verkleinert ${name}: ${roh.length} → ${r.code.length} Zeichen`);
}
console.log(`Skripte gesamt: ${vorher} → ${nachher} Zeichen`);
