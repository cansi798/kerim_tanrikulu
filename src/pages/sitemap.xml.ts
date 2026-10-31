// /sitemap.xml – öffentliche Seiten in beiden Sprachen mit hreflang-Verweisen (ohne Impressum/Datenschutz).
// Beim Livegang in robots.txt eingetragen (siehe robots.txt.ts).
import type { APIRoute } from "astro";
import { u } from "../daten";
import { OEFFENTLICH, SEITEN } from "../i18n";

export const GET: APIRoute = ({ site }) => {
  const heute = new Date().toISOString().slice(0, 10);
  const abs = (pfad: string) => new URL(u(pfad), site).href;
  const zeilen = OEFFENTLICH.flatMap((s) => (["de", "tr"] as const).map((l) =>
    `  <url><loc>${abs(SEITEN[s][l])}</loc><lastmod>${heute}</lastmod>` +
    `<xhtml:link rel="alternate" hreflang="de" href="${abs(SEITEN[s].de)}"/>` +
    `<xhtml:link rel="alternate" hreflang="tr" href="${abs(SEITEN[s].tr)}"/>` +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(SEITEN[s].de)}"/></url>`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${zeilen.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
