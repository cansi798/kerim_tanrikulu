// @ts-check
import { defineConfig } from 'astro/config';

// Vorschau: https://cansi798.github.io/kerim_tanrikulu/
// Livegang auf eigener Domain (dolmetscher-kt.de): SITE=https://dolmetscher-kt.de BASE=/ VORSCHAU=false
const SITE = process.env.SITE || 'https://cansi798.github.io';
const BASE = process.env.BASE || '/kerim_tanrikulu';

export default defineConfig({
  site: SITE,
  base: BASE,
  build: { format: 'directory', inlineStylesheets: 'never' },
  trailingSlash: 'ignore',
  compressHTML: true,
  // Skripte und Styles immer als eigene Dateien (CSP ohne 'unsafe-inline' möglich)
  vite: { build: { assetsInlineLimit: 0 } },
});
