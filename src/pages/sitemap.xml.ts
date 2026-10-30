// /sitemap.xml – öffentliche Seiten aus daten.ts (ohne Impressum/Datenschutz).
// Beim Livegang in robots.txt eingetragen (siehe robots.txt.ts).
import type { APIRoute } from "astro";
import { NAV, u } from "../daten";

export const GET: APIRoute = ({ site }) => {
  const heute = new Date().toISOString().slice(0, 10);
  const zeilen = NAV.map((n) => `  <url><loc>${new URL(u(n.href), site).href}</loc><lastmod>${heute}</lastmod></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${zeilen.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
