// Bildschirmfotos 390 und 1440 px (Playwright-Container). URL=https://… setzt die Basisadresse.
// Aufruf siehe README. Meldet Querscrollen und schuldige Elemente.
const { chromium } = require("playwright");
const fs = require("node:fs");
(async () => {
  const BASIS = (process.env.URL || "https://cansi798.github.io/kerim_tanrikulu").replace(/\/$/, "");
  const AUS = process.env.AUS || "screens";
  fs.mkdirSync(AUS, { recursive: true });
  const seiten = (process.env.SEITEN || "/,/uebersetzungen/,/dolmetschen/,/ueber-mich/,/fragen/,/kontakt/,/impressum/,/datenschutz/").split(",");
  const geraete = [
    { name: "1440", viewport: { width: 1440, height: 900 } },
    { name: "390", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  ];
  const browser = await chromium.launch();
  for (const g of geraete) {
    const ctx = await browser.newContext({ viewport: g.viewport, isMobile: g.isMobile, hasTouch: g.hasTouch, deviceScaleFactor: g.deviceScaleFactor || 1, reducedMotion: process.env.RUHIG ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    for (const s of seiten) {
      await page.goto(BASIS + s, { waitUntil: "networkidle" });
      const h = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(80); }
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(2200);
      const info = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const zu = [...document.querySelectorAll("body *")].filter((el) => el.getBoundingClientRect().right > w + 1 && getComputedStyle(el).position !== "fixed").slice(0, 5).map((el) => el.tagName + "." + el.className);
        return { quer: document.documentElement.scrollWidth - innerWidth, zu };
      });
      const name = (s.replace(/\//g, "_").replace(/^_|_$/g, "") || "start") + "-" + g.name;
      await page.screenshot({ path: `${AUS}/${name}.png`, fullPage: true });
      console.log(name, "Querscrollen:", info.quer > 0 ? info.quer + " px" : "nein", "| Überlauf:", info.zu.length ? info.zu.join(", ") : "keiner");
    }
    await ctx.close();
  }
  await browser.close();
})();
