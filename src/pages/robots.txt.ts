// /robots.txt – in der Vorschau alles gesperrt, live alles erlaubt (auch KI-Crawler) plus Sitemap.
import type { APIRoute } from "astro";
import { VORSCHAU, u } from "../daten";

export const GET: APIRoute = ({ site }) => {
  const text = VORSCHAU
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(u("/sitemap.xml"), site).href}\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
