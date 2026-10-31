// Einsatzgebiet-Karte als eigene Datei (wie Bauwelt /szenen/): /karte/karte-<de|tr>-<hell|dunkel>.svg
// Die Seite lädt sie erst kurz vor dem Sichtbarwerden nach (public/sichtbar.js) – das HTML bleibt schlank (Ladezeit).
// Ohne JavaScript zeigt <noscript> sie als fertiges Bild.
import type { APIRoute, GetStaticPaths } from "astro";
import { karteSvg } from "../../lib/karte";
import type { Lang } from "../../i18n";

export const getStaticPaths: GetStaticPaths = () =>
  (["de", "tr"] as Lang[]).flatMap((lang) => (["hell", "dunkel"] as const).map((v) => ({ params: { datei: `karte-${lang}-${v}` }, props: { lang, dunkel: v === "dunkel" } })));

export const GET: APIRoute = ({ props }) =>
  new Response(karteSvg(props.lang as Lang, { dunkel: props.dunkel as boolean }), { headers: { "Content-Type": "image/svg+xml; charset=utf-8" } });
