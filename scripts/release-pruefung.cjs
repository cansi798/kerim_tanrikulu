// Release-Prüfung im Browser (23.11.2026, Skill astro-allinkl-release-auditor). Nicht Teil des Builds.
// Braucht: npm i --no-save playwright@1.48.2 @axe-core/playwright (oder Docker mcr.microsoft.com/playwright:v1.48.2-jammy) und eine laufende Seite:
//   Vorschau:  python3 -m http.server 18793 --directory <ordner mit kerim_tanrikulu -> dist>   →  BASIS=http://127.0.0.1:18793/kerim_tanrikulu
//   ALL-INKL-Paket in Apache (php:8.3-apache, AllowOverride All):  PROXY=1 BASIS=http://127.0.0.1:18794
// Lauf:  node scripts/release-pruefung.cjs   (MOTOR=webkit für Safari-Engine, BREITEN=320,390 …, AUS=ergebnis.json)
// Prüft je Seite und Breite: Status, Querscrollen, herausragende Elemente, Konsolenfehler, Fremd-Requests,
// Impressum/Datenschutz im Fuß, Schrift < 12 px; bei 390/1440 zusätzlich axe (WCAG 2.2 AA) und Skiplink als erster Fokus.
const { chromium, webkit } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const B = process.env.BASIS || "http://127.0.0.1:18793/kerim_tanrikulu";
const seiten = ["/", "/tr/", "/uebersetzungen/", "/tr/ceviriler/", "/dolmetschen/", "/tr/sozlu-tercume/", "/gut-zu-wissen/", "/tr/bilmeniz-gerekenler/", "/ueber-mich/", "/tr/hakkimda/", "/kontakt/", "/tr/iletisim/", "/impressum/", "/tr/kunye/", "/datenschutz/", "/tr/gizlilik/", "/404.html"];
const breiten = (process.env.BREITEN || "320,360,390,430,768,1024,1440,1920").split(",").map(Number);
const AXE_BREITEN = [390, 1440];
let fehler = 0, ok = 0; const funde = [];
const melde = (b, t) => { if (b) ok++; else { fehler++; funde.push(t); console.log("FEHLER:", t); } };
(async () => {
  const motor = process.env.MOTOR === "webkit" ? webkit : chromium;
  const br = await motor.launch(process.env.MOTOR || process.env.OHNE_CHROME ? {} : { channel: "chrome" });
  for (const w of breiten) {
    const ctx = await br.newContext({ extraHTTPHeaders: process.env.PROXY ? { "X-Forwarded-Proto": "https" } : {}, viewport: { width: w, height: w < 500 ? 780 : w < 1100 ? 1000 : 1000 }, reducedMotion: "reduce" });
    for (const s of seiten) {
      const pg = await ctx.newPage(); const errs = []; const fremd = [];
      pg.on("pageerror", (e) => errs.push("pageerror " + e.message));
      pg.on("console", (m) => { if (m.type() === "error") errs.push("console " + m.text()); });
      pg.on("request", (r) => { const u = new URL(r.url()); if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname) && u.protocol.startsWith("http")) fremd.push(r.url()); });
      const res = await pg.goto(B + s, { waitUntil: "networkidle" });
      melde(res && (s === "/404.html" || res.status() === 200), `${s}@${w} Status ${res && res.status()}`);
      const h = await pg.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 600) { await pg.evaluate((y) => scrollTo(0, y), y); await pg.waitForTimeout(60); }
      await pg.waitForTimeout(400);
      const quer = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      melde(quer <= 0, `${s}@${w} Querscroll ${quer}px`);
      // Elemente, die über den rechten Rand ragen (ohne versteckte)
      const raus = await pg.evaluate(() => { const W = document.documentElement.clientWidth; return [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width && r.right > W + 1 && cs.visibility !== "hidden" && cs.position !== "fixed" && !e.closest("[hidden],.sr-only,.visually-hidden") && !e.closest('[aria-hidden="true"], .hero-bg'); }).slice(0, 3).map((e) => e.tagName + "." + (e.getAttribute("class")||"") + " " + Math.round(e.getBoundingClientRect().right)); });
      melde(raus.length === 0, `${s}@${w} ragt raus: ${raus.join(" | ")}`);
      melde(errs.length === 0, `${s}@${w} Konsole: ${errs.join(" | ")}`);
      melde(fremd.length === 0, `${s}@${w} Fremd-Requests: ${fremd.join(" ")}`);
      const recht = await pg.evaluate(() => { const a = [...document.querySelectorAll("footer a")].map((x) => x.getAttribute("href")); return { i: a.some((h) => /impressum|kunye/.test(h)), d: a.some((h) => /datenschutz|gizlilik/.test(h)) }; });
      melde(recht.i && recht.d, `${s}@${w} Impressum/Datenschutz im Fuß fehlt`);
      const kleinschrift = await pg.evaluate(() => [...document.querySelectorAll("p,li,a,button,label,span")].filter((e) => e.offsetParent && e.textContent.trim() && parseFloat(getComputedStyle(e).fontSize) < 12).slice(0, 3).map((e) => e.tagName + ":" + e.textContent.trim().slice(0, 30)));
      melde(kleinschrift.length === 0, `${s}@${w} Schrift < 12px: ${kleinschrift.join(" | ")}`);
      if (AXE_BREITEN.includes(w)) {
        await pg.evaluate(() => scrollTo(0, 0));
        const r = await new AxeBuilder({ page: pg }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).exclude(".vorschau").analyze();
        for (const v of r.violations) melde(false, `${s}@${w} axe ${v.id} (${v.impact}) ${v.nodes.length}× ${v.nodes[0].target}`);
        if (!r.violations.length) ok++;
        // Tastatur: erster Tab = Skiplink sichtbar
        await pg.keyboard.press("Tab");
        const skip = await pg.evaluate(() => { const e = document.activeElement; const r = e.getBoundingClientRect(); return { k: e.className, sicht: r.width > 0 && r.top >= 0 && r.top < innerHeight }; });
        melde(/skip/.test(skip.k) && skip.sicht, `${s}@${w} Skiplink nicht erster sichtbarer Fokus (${skip.k})`);
      }
      if (process.env.SHOTS && [320, 390, 768, 1440, 1920].includes(w) && ["/", "/tr/", "/kontakt/", "/impressum/"].includes(s)) {
        await pg.addStyleTag({ content: "*{content-visibility:visible!important}" }).catch(() => {});
        await pg.evaluate(() => scrollTo(0, 0)); await pg.waitForTimeout(200);
        await pg.screenshot({ path: `${process.env.SHOTS}/${(s.replace(/\//g, "_") || "_")}-${w}.png`, fullPage: false });
      }
      await pg.close();
    }
    await ctx.close();
  }
  await br.close();
  console.log(`OK ${ok}, Fehler ${fehler}`);
  require("fs").writeFileSync(process.env.AUS || "/dev/null", JSON.stringify({ ok, fehler, funde }, null, 1));
})();
