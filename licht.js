// Licht-Szenen (Can 31.10.2026: „viel krasser, Wow“) – Canvas 2D, selbst geschrieben, ohne Bibliothek, CSP-konform (eigene Datei).
// Drei Szenen mit gemeinsamem Kern:
//   1) Sprachbrücke [data-bruecke] – seit 31.10.2026 12:39 nicht mehr im Hero (ersetzt durch gespraech.js); Code bleibt für eine Rückkehr (Tag design-v5-bruecke):
//      Ufer leuchten auf → der Bogen wächst aus Licht von beiden Ufern und trifft sich in der Mitte → Hänger, Innenbogen, Spiegelung →
//      Lichtteilchen lösen sich aus dem Wort links, wandern über den Bogen und setzen sich rechts zum Wort der anderen Sprache zusammen → Leitsatz.
//      Danach: alle 14 s läuft die ganze Intro erneut (kurz ausblenden, neu aufbauen), und jedes Mal, wenn die Szene wieder ins Bild kommt.
//      Beim Darüberfahren mit der Maus zieht ein kleiner Lichtzug über den Bogen.
//   2) Dolmetschen [data-dolmetschen] – der Ablauf eines Gesprächs (ca. 3,5 s):
//      Deutsch „spricht“ (goldene Schallwellen) → die Worte fließen als helles Licht zum Federkiel → dort Aufleuchten, Verwandlung in tiefes Gold →
//      sie kommen als neue Wellen bei Türkisch an → kurze Antwort zurück. Wiederholt sich wie die Brücke (alle 14 s, beim Wiederkommen).
//   3) Ablauf „So einfach geht's“ [data-ablauf] (v5, Can 31.10.2026 10:43): Licht zieht von Schritt zu Schritt (ca. 3,3 s).
// Ohne JS: fertiges Standbild (SVG/HTML). „Bewegung reduzieren“: dasselbe Standbild blendet beim ersten Sichtbarwerden nur sanft ein
// (1 s, keine Bewegung, keine Wiederholung). Texte bleiben echter Text, Canvas ist aria-hidden.
// Die Intro beginnt erst, wenn die Szene wirklich im Bild ist (mind. die Hälfte), und läuft dann ganz ab, auch beim Weiterscrollen;
// gerechnet wird nur, solange die Szene im Bild und der Tab sichtbar ist (IntersectionObserver, visibilitychange).
// Safari-tauglich: nur Canvas-2D-Grundfunktionen (kein ctx.filter, kein roundRect, kein OffscreenCanvas), requestIdleCallback mit Ersatz.
(function () {
  if (!window.requestAnimationFrame) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { // sanfte Kurzfassung: nur Einblenden, keine Bewegung
    [["[data-bruecke]", ".b-teil, .b-ziel, .claim"], ["[data-dolmetschen]", ".links, .rechts, .kiel"], ["[data-ablauf]", ".a-schritt, .a-linie"]].forEach(function (z) {
      document.querySelectorAll(z[0]).forEach(function (el) {
        var teile = el.querySelectorAll(z[1]);
        if (!teile.length || !("IntersectionObserver" in window)) return;
        teile.forEach(function (x) { x.style.opacity = "0"; });
        var io = new IntersectionObserver(function (e) {
          if (!e[0].isIntersecting || e[0].intersectionRatio < 0.5) return;
          io.disconnect();
          var t0 = performance.now();
          (function schritt(jetzt) {
            var k = Math.min(1, (jetzt - t0) / 1000);
            teile.forEach(function (x) { x.style.opacity = k < 1 ? k.toFixed(3) : ""; });
            if (k < 1) requestAnimationFrame(schritt);
          })(t0);
        }, { threshold: [0, 0.5, 1] });
        io.observe(el);
      });
    });
    return;
  }
  var M = Math, GOLD = "#4a5570"; // Farbkonzept Jamil 06.11.2026: Linien in leisem Primär, Licht creme-weiß statt Gold
  var klemm = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var bereich = function (t, a, b) { return klemm((t - a) / (b - a)); };
  var ioc = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - M.pow(-2 * x + 2, 3) / 2; };
  var oc = function (x) { return 1 - M.pow(1 - x, 3); };
  var buckel = function (t, a, b) { var k = bereich(t, a, b); return M.sin(M.PI * k); };

  // Leuchtpunkte als vorgezeichnete Bilder: HELL (weißer Kern, goldener Rand – auf Beige sichtbar) und TIEF (sattes Gold)
  function sprite(stops, gr) {
    gr = gr || 64; var c = document.createElement("canvas"), h = gr / 2; c.width = c.height = gr;
    var g = c.getContext("2d"), r = g.createRadialGradient(h, h, 0, h, h, h);
    stops.forEach(function (s) { r.addColorStop(s[0], s[1]); }); g.fillStyle = r; g.fillRect(0, 0, gr, gr); return c;
  }
  // erst beim ersten Start zeichnen (nicht beim Laden der Seite: spart Rechenzeit, wenn keine Szene im Bild ist)
  var HELL, WEICH, TIEF;
  function farben() {
    if (HELL) return;
    HELL = sprite([[0, "rgba(255,253,249,1)"], [0.2, "rgba(239,230,214,0.95)"], [0.42, "rgba(138,149,173,0.45)"], [1, "rgba(29,49,90,0)"]]);
    if (!handy.matches) WEICH = sprite([[0, "rgba(255,253,249,0.9)"], [0.25, "rgba(239,230,214,0.62)"], [0.5, "rgba(195,203,218,0.3)"], [0.75, "rgba(138,149,173,0.1)"], [1, "rgba(138,149,173,0)"]], 160); else WEICH = null; // großes weiches Licht nur breit (am Handy zu teuer)
    TIEF = sprite([[0, "rgba(239,230,214,1)"], [0.18, "rgba(44,70,119,0.95)"], [0.45, "rgba(29,49,90,0.4)"], [1, "rgba(29,49,90,0)"]]);
  }

  function proben(svg, sel, n, abb) { // Punkte gleichmäßig nach Länge entlang einer Kubik-Kurve „M x y C …“ (rechnerisch – getPointAtLength ist langsam)
    var z = svg.querySelector(sel).getAttribute("d").match(/-?[\d.]+/g).map(Number), roh = [], len = [0], i;
    var bz = function (a, b, c, d, t) { var m = 1 - t; return m * m * m * a + 3 * m * m * t * b + 3 * m * t * t * c + t * t * t * d; };
    for (i = 0; i <= 200; i++) { var t = i / 200; roh.push([bz(z[0], z[2], z[4], z[6], t), bz(z[1], z[3], z[5], z[7], t)]); if (i) len.push(len[i - 1] + M.hypot(roh[i][0] - roh[i - 1][0], roh[i][1] - roh[i - 1][1])); }
    var out = [], k = 0, L = len[200];
    for (i = 0; i < n; i++) {
      var ziel = (L * i) / (n - 1); while (k < 199 && len[k + 1] < ziel) k++;
      var f = (ziel - len[k]) / ((len[k + 1] - len[k]) || 1);
      out.push(abb(roh[k][0] + (roh[k + 1][0] - roh[k][0]) * f, roh[k][1] + (roh[k + 1][1] - roh[k][1]) * f));
    }
    return out;
  }
  function auf(liste, u) { // Punkt bei Anteil u entlang einer Probenliste (gleichmäßig nach Länge)
    var f = klemm(u) * (liste.length - 1), i = M.min(liste.length - 2, f | 0), k = f - i;
    return [liste[i][0] + (liste[i + 1][0] - liste[i][0]) * k, liste[i][1] + (liste[i + 1][1] - liste[i][1]) * k];
  }
  function qb(a, c, b, k) { var m = 1 - k; return [m * m * a[0] + 2 * m * k * c[0] + k * k * b[0], m * m * a[1] + 2 * m * k * c[1] + k * k * b[1]]; }
  function setz(el, a, dy, extra) { if (!el) return; el.style.opacity = a.toFixed(3); el.style.transform = (extra || "") + " translateY(" + dy.toFixed(1) + "px)"; }
  function frei(el) { if (el) { el.style.opacity = ""; el.style.transform = ""; } }
  function glaenzen(el, k) { if (!el) return; el.classList.add(k); setTimeout(function () { el.classList.remove(k); }, 700); }

  // Start erst nach dem Laden der Seite, den Schriften und einem ruhigen Moment – so stört die Intro das Laden nicht (Ladezeit)
  var geladen = new Promise(function (ok) { if (document.readyState === "complete") ok(); else window.addEventListener("load", function () { ok(); }); });
  function bereit(f) {
    Promise.all([geladen, document.fonts && document.fonts.ready ? document.fonts.ready : 0]).then(function () {
      if (window.requestIdleCallback) requestIdleCallback(f, { timeout: 250 }); else setTimeout(f, 150);
    });
  }

  // ---------- gemeinsamer Kern: Leinwand, Uhr, Sichtbarkeit, Funken, Leerlauf ----------
  var handy = window.matchMedia("(max-width: 899px)"); // statt innerWidth: erzwingt beim Laden keine Layout-Berechnung
  function Szene(el, c) {
    var cv, ctx, s = { el: el, ctx: null, W: 0, H: 0, PAD: c.pad, funken: [], schmal: false };
    var spaet = performance.now() > c.spaet; // Notfall-Endbild ist schon zu sehen → keine Intro
    el.classList.add(c.name + "-bereit");
    s.punkt = function (x, y, r, a, bild) { if (a <= 0.01 || bild === null) return; ctx.globalAlpha = a > 1 ? 1 : a; ctx.drawImage(bild || HELL, x - r, y - r, 2 * r, 2 * r); };
    s.funke = function (x, y, st, bild) { s.funken.push({ x: x, y: y, vx: (M.random() * 2 - 1) * st, vy: (M.random() * 2 - 1.3) * st, t: 0, l: 0.45 + M.random() * 0.45, r: 1.2 + M.random() * 1.8, b: bild }); };
    s.linie = function (liste, von, bis, breite, a) {
      if (bis <= von || a <= 0.01) return;
      var n = liste.length - 1, p = auf(liste, von);
      ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = breite; ctx.beginPath(); ctx.moveTo(p[0], p[1]);
      for (var i = M.floor(von * n) + 1; i < M.ceil(bis * n); i++) ctx.lineTo(liste[i][0], liste[i][1]);
      p = auf(liste, bis); ctx.lineTo(p[0], p[1]); ctx.stroke();
    };
    s.rel = function (node) { // Rechteck eines Elements in Leinwand-Koordinaten
      var r = node.getBoundingClientRect(), f = el.getBoundingClientRect();
      return { x: r.left - f.left + s.PAD, y: r.top - f.top + s.PAD, w: r.width, h: r.height };
    };
    function messen() {
      var r = el.getBoundingClientRect();
      // Auflösung: am Handy 1:1 (weiche Lichtpunkte brauchen keine Retina-Schärfe; spart ~2/3 der Pixel und damit Rechenzeit), breit höchstens 1,5
      var dpr = handy.matches ? 1 : M.min(1.5, window.devicePixelRatio || 1);
      s.W = r.width + 2 * s.PAD; s.H = r.height + 2 * s.PAD; s.schmal = r.width < 420;
      cv.style.cssText = "position:absolute;pointer-events:none;left:" + -s.PAD + "px;top:" + -s.PAD + "px;width:" + s.W + "px;height:" + s.H + "px" + (c.unten ? ";z-index:0" : "");
      cv.width = M.round(s.W * dpr); cv.height = M.round(s.H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.messen(s);
    }

    // Ablauf (Can 31.10. 09:26/3945): Die volle Intro läuft, sobald die Szene ins Bild kommt (mind. die Hälfte sichtbar),
    // wiederholt sich alle 14 s, solange sie im Bild ist (kurz ausblenden, neu aufbauen), und startet neu,
    // wann immer sie nach dem Verlassen wieder ins Bild kommt. Die Uhr läuft in echter Zeit: auch bei langsamen Bildern
    // (z. B. Safari ohne Grafikbeschleunigung) ist die Intro nach ca. 3,5 s fertig, statt in Zeitlupe stehen zu bleiben.
    var t = 0, intro = !spaet, zug = null, laeuft = false, raf = 0, letzte = 0, sichtbar = false, genug = false, aktiv = !document.hidden;
    var timer = 0, gestartet = false, hin = false, verlassen = false, WIEDER = 14000;
    var sparen = handy.matches; // Handy: 30 Bilder je Sekunde reichen für weiche Lichtpunkte und halbieren die Rechenzeit
    function bild(jetzt) {
      if (!laeuft) return;
      if (sparen && jetzt - letzte < 28) { raf = requestAnimationFrame(bild); return; }
      var dt = M.min(0.25, (jetzt - letzte) / 1000 || 0.016); letzte = jetzt; t += dt;
      // Spuren: das letzte Bild nur teilweise löschen → weiche Lichtschweife (Stärke an die Bildrate angepasst)
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "rgba(0,0,0," + (1 - M.pow(0.62, dt * 60)).toFixed(3) + ")"; ctx.fillRect(0, 0, s.W, s.H);
      ctx.globalCompositeOperation = "source-over";
      if (intro) intro = c.intro(s, t);
      if (zug) { zug.t += dt; if (!c.zug(s, zug)) zug = null; }
      for (var i = s.funken.length - 1; i >= 0; i--) {
        var f = s.funken[i]; f.t += dt; if (f.t > f.l) { s.funken.splice(i, 1); continue; }
        f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 14 * dt; s.punkt(f.x, f.y, f.r, 1 - f.t / f.l, f.b);
      }
      ctx.globalAlpha = 1;
      if (!intro && !zug && !s.funken.length) { ruhe(); return; }
      raf = requestAnimationFrame(bild);
    }
    function los() {
      if (laeuft || !sichtbar || !aktiv) return;
      if (intro && t === 0 && !genug) return; // Intro noch nicht begonnen: erst starten, wenn genug von der Szene zu sehen ist
      laeuft = true; letzte = performance.now(); raf = requestAnimationFrame(bild); }
    function stopp() { laeuft = false; cancelAnimationFrame(raf); }
    function ruhe() { stopp(); ctx.clearRect(0, 0, s.W, s.H); clearTimeout(timer); timer = setTimeout(wiederholen, WIEDER); }
    function zuruecksetzen() { // Szene auf den Anfang der Intro stellen (Endbild weg, Teilchen neu)
      stopp(); clearTimeout(timer); timer = 0; zug = null; s.funken.length = 0; t = 0; intro = true;
      if (ctx) ctx.clearRect(0, 0, s.W, s.H);
      c.zuruecksetzen(s);
    }
    function neuStart() { if (!gestartet) return; zuruecksetzen(); messen(); c.vorbereiten(s); los(); }
    function wiederholen() { // alle 14 s: sanft ausblenden, dann neu aufbauen
      timer = 0;
      if (intro) return;
      if (!sichtbar || !aktiv) { verlassen = true; return; } // beim nächsten Sichtbarwerden
      c.ausblenden(s);
      timer = setTimeout(function () { timer = 0; if (sichtbar && aktiv) neuStart(); else { zuruecksetzen(); verlassen = true; } }, 700);
    }
    function neuerZug() { // kleiner Lichtzug beim Darüberfahren mit der Maus (nur im fertigen Zustand)
      if (zug || intro || !sichtbar || !aktiv) return;
      hin = !hin; zug = { t: 0, hin: hin, an: false }; c.zugStart && c.zugStart(s, zug); los();
    }
    function start() {
      if (gestartet) return;
      cv = document.createElement("canvas"); ctx = s.ctx = cv.getContext("2d");
      if (!ctx) { intro = false; c.ende(s); return; }
      gestartet = true; farben(); cv.setAttribute("aria-hidden", "true"); el.appendChild(cv); messen();
      if (intro) { c.vorbereiten(s); los(); } else { c.ende(s); ruhe(); }
    }
    function weiter() {
      if (!gestartet) { if (genug && aktiv) bereit(start); return; }
      if (verlassen) { if (genug && aktiv) { verlassen = false; neuStart(); } return; }
      if (intro || zug || s.funken.length) los(); else if (!timer) timer = setTimeout(wiederholen, WIEDER);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        var x = e[0]; sichtbar = x.isIntersecting; genug = x.intersectionRatio >= 0.5 || x.intersectionRect.height >= window.innerHeight * 0.5;
        if (!sichtbar) {
          stopp();
          // ganz aus dem Bild: zurück auf Anfang, damit sie beim Wiederkommen neu aufgebaut wird
          if (gestartet && !verlassen) { zuruecksetzen(); verlassen = true; }
        } else weiter();
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] }).observe(el);
    } else { sichtbar = genug = true; weiter(); }
    document.addEventListener("visibilitychange", function () { aktiv = !document.hidden; if (!aktiv) stopp(); else weiter(); });
    // Größenänderung: Am iPhone feuert Safari „resize“, sobald beim Scrollen die Adressleiste ein- oder ausfährt (nur die Höhe ändert sich).
    // Früher sprang die Intro dabei sofort ans Ende („sofort fertig“, Can 3944). Jetzt: Höhe allein → nichts tun;
    // neue Breite (Drehen) → während der Intro neu beginnen, sonst nur neu vermessen.
    var rz = 0, breiteAlt = window.innerWidth;
    window.addEventListener("resize", function () {
      clearTimeout(rz); rz = setTimeout(function () {
        if (!gestartet || window.innerWidth === breiteAlt) return;
        breiteAlt = window.innerWidth;
        if (intro && t > 0) neuStart(); else messen();
      }, 200);
    }, { passive: true });
    el.addEventListener("pointerenter", function () { if (gestartet && !intro && !zug) neuerZug(); });
  }
  // gemeinsamer Kern auch für weitere Szenen in eigenen Dateien (z. B. gespraech.js der Hero-Variante, Jamil 31.10.2026)
  window.LichtKern = { Szene: Szene, GOLD: GOLD, klemm: klemm, bereich: bereich, ioc: ioc, oc: oc, buckel: buckel, qb: qb, setz: setz, frei: frei, glaenzen: glaenzen,
    bild: function (n) { return n === "tief" ? TIEF : n === "weich" ? WEICH : HELL; } };

  // ---------- 1) Sprachbrücke ----------
  var fig = document.querySelector("[data-bruecke]");
  if (fig && fig.querySelector("svg")) (function () {
    var svg = fig.querySelector("svg"), quelle = fig.querySelector(".b-quelle"), ziel = fig.querySelector(".b-ziel"), claim = fig.querySelector(".claim");
    var bogen, innen, spiegel, haenger, teile = [], S = 1, OY = 0, fertig = false;
    function wortPunkte(s, span, n) { // Pixel der echten Schrift abtasten → Start- bzw. Zielpunkte der Lichtteilchen
      var r = s.rel(span), cs = getComputedStyle(span), w = M.ceil(r.w) + 4, h = M.ceil(r.h) + 4, c = document.createElement("canvas");
      c.width = w; c.height = h;
      var g = c.getContext("2d", { willReadFrequently: true }); g.font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
      var m = g.measureText(span.textContent), as = m.fontBoundingBoxAscent || parseFloat(cs.fontSize) * 0.9, de = m.fontBoundingBoxDescent || 0;
      g.fillText(span.textContent, 2, 2 + (r.h - as - de) / 2 + as);
      var d = g.getImageData(0, 0, w, h).data, alle = [], out = [];
      for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 140) alle.push([r.x - 2 + x, r.y - 2 + y]);
      for (var i = 0; i < n && alle.length; i++) out.push(alle[(M.random() * alle.length) | 0]);
      return out.sort(function (a, b) { return a[0] - b[0]; });
    }
    function bahn(p, q) { // Wort links → hinauf zum Bogen → über den Bogen → hinab ins Wort rechts; gleichmäßig nach Weglänge
      var d = ioc(q) * p.L, k;
      if (d < p.l1) { k = d / p.l1; return [p.s[0] + (p.ein[0] - p.s[0]) * oc(k), p.s[1] + (p.ein[1] - p.s[1]) * k]; }
      if (d < p.l1 + p.l2) {
        var v = (d - p.l1) / p.l2, u = 0.05 + 0.9 * v, a = auf(bogen, u), b = auf(bogen, u + 0.01);
        var nx = a[1] - b[1], ny = b[0] - a[0], nl = M.hypot(nx, ny) || 1, w = M.sin(M.PI * v) * p.o;
        return [a[0] + (nx / nl) * w, a[1] + (ny / nl) * w];
      }
      k = (d - p.l1 - p.l2) / p.l3; return [p.aus[0] + (p.z[0] - p.aus[0]) * k, p.aus[1] + (p.z[1] - p.aus[1]) * (1 - (1 - k) * (1 - k))];
    }
    function endbild() {
      fertig = true; fig.classList.add("b-fertig"); frei(ziel); frei(claim); if (quelle) quelle.classList.remove("b-glanz");
    }
    Szene(fig, {
      name: "b", pad: 30, spaet: 3300,
      messen: function (s) {
        var o = s.rel(svg), vb = svg.viewBox.baseVal; S = o.w / vb.width; OY = o.y;
        var abb = function (x, y) { return [o.x + x * S, o.y + y * S]; };
        bogen = proben(svg, ".bogen", 180, abb); innen = proben(svg, ".bogen-innen", 120, abb); spiegel = proben(svg, ".spiegel", 120, abb);
        haenger = Array.prototype.map.call(svg.querySelectorAll(".haenger line"), function (l) {
          return [o.x + l.x1.baseVal.value * S, o.y + l.y1.baseVal.value * S, o.y + l.y2.baseVal.value * S];
        });
      },
      vorbereiten: function (s) { // Paare: Pixel im Wort links → Pixel im Wort rechts, linke Buchstaben starten zuerst
        var n = M.round(M.max(240, M.min(620, s.W * 1.05))), A = wortPunkte(s, quelle, n), B = wortPunkte(s, ziel, n);
        var minX = A.length ? A[0][0] : 0, maxX = A.length ? A[A.length - 1][0] : 1, bl = 0;
        for (var i = 1; i < bogen.length; i++) bl += M.hypot(bogen[i][0] - bogen[i - 1][0], bogen[i][1] - bogen[i - 1][1]);
        var ein = auf(bogen, 0.05), aus = auf(bogen, 0.95);
        teile = [];
        for (var j = 0; j < M.min(A.length, B.length); j++) {
          var a = A[j], z = B[j], l1 = M.hypot(ein[0] - a[0], ein[1] - a[1]) * 1.15, l2 = bl * 0.9, l3 = M.hypot(aus[0] - z[0], aus[1] - z[1]) * 1.15;
          teile.push({ s: a, z: z, ein: ein, aus: aus, l1: l1, l2: l2, l3: l3, L: l1 + l2 + l3,
            d: 1.35 + ((a[0] - minX) / (maxX - minX || 1)) * 0.55 + M.random() * 0.18, D: 1.05 + M.random() * 0.3,
            o: (M.random() * 2 - 1) * (s.schmal ? 4 : 6) * S, r: (s.schmal ? 1.7 : 2.1) * (0.6 + M.random() * 0.8), tief: M.random() < 0.35 });
        }
      },
      intro: function (s, t) {
        var ctx = s.ctx, a = bogen[0], b = bogen[bogen.length - 1], y = OY + 150 * S, uf = oc(bereich(t, 0, 0.5));
        var aus = 1 - bereich(t, 3.5, 4.0); // Übergabe an das SVG-Endbild (blendet gleichzeitig ein)
        // warmes Licht hinter der Brücke, solange sie entsteht
        var mi = auf(bogen, 0.5), hg = oc(bereich(t, 0.6, 1.6)) * (1 - ioc(bereich(t, 2.4, 3.9)));
        var cy = (mi[1] + y) / 2; s.punkt(mi[0], cy, M.min((b[0] - a[0]) * 0.5, cy, s.H - cy), 0.42 * hg, WEICH); // ganz innerhalb der Leinwand
        // Fahrbahn von beiden Seiten
        var dk = ioc(bereich(t, 0.15, 0.95)) * 0.5;
        ctx.globalAlpha = 0.7 * aus; ctx.strokeStyle = GOLD; ctx.lineWidth = 1.2 * S; ctx.beginPath();
        ctx.moveTo(a[0], y); ctx.lineTo(a[0] + (b[0] - a[0]) * dk, y); ctx.moveTo(b[0], y); ctx.lineTo(b[0] - (b[0] - a[0]) * dk, y); ctx.stroke();
        var sp = bereich(t, 1.5, 2.3);
        if (sp > 0) { ctx.setLineDash([5 * S, 7 * S]); s.linie(spiegel, 0, 1, 1.3 * S, 0.32 * sp * aus); ctx.setLineDash([]); }
        // Hänger von der Mitte nach außen
        var mitte = (haenger.length - 1) / 2;
        for (var i = 0; i < haenger.length; i++) {
          var h = haenger[i], v = M.abs(i - mitte) * 0.06, k = oc(bereich(t, 1.3 + v, 1.6 + v));
          if (k <= 0) continue;
          ctx.globalAlpha = 0.5 * aus; ctx.lineWidth = S; ctx.beginPath(); ctx.moveTo(h[0], h[1]); ctx.lineTo(h[0], h[1] + (h[2] - h[1]) * k); ctx.stroke();
          if (k < 1) s.punkt(h[0], h[1] + (h[2] - h[1]) * k, 4, 0.9 * (1 - k));
        }
        s.linie(innen, 0, 1, S, 0.45 * bereich(t, 1.3, 1.9) * aus);
        // Bogen wächst von beiden Ufern zur Mitte
        var g = ioc(bereich(t, 0.25, 1.25)) * 0.5;
        s.linie(bogen, 0, g, 2.2 * S, aus); s.linie(bogen, 1 - g, 1, 2.2 * S, aus);
        if (t > 0.25 && t < 1.28) {
          var kl = auf(bogen, g), kr = auf(bogen, 1 - g), gr = s.schmal ? 9 : 12;
          s.punkt(kl[0], kl[1], gr, 1); s.punkt(kr[0], kr[1], gr, 1);
          if (M.random() < 0.8) { s.funke(kl[0], kl[1], 16); s.funke(kr[0], kr[1], 16); }
        }
        // Ufer
        ctx.globalAlpha = aus; ctx.fillStyle = GOLD; ctx.beginPath();
        ctx.arc(a[0], y, 4.5 * S * uf, 0, 7); ctx.moveTo(b[0], y); ctx.arc(b[0], y, 4.5 * S * uf, 0, 7); ctx.fill();
        var ug = (1 - bereich(t, 0.5, 1.6)) * uf; s.punkt(a[0], y, 18 * ug + 4, ug); s.punkt(b[0], y, 18 * ug + 4, ug);
        // Treffen in der Mitte: Aufleuchten und ein feiner Ring
        var bl = bereich(t, 1.22, 1.95);
        if (bl > 0 && bl < 1) {
          var e = oc(bl), m = auf(bogen, 0.5);
          s.punkt(m[0], m[1], (s.schmal ? 22 : 32) * (0.5 + e), (1 - bl) * 0.95);
          ctx.globalAlpha = (1 - bl) * 0.4; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(m[0], m[1], 6 + e * (s.schmal ? 36 : 58), 0, 7); ctx.stroke();
          if (bl < 0.06) for (var f = 0; f < 8; f++) s.funke(m[0], m[1], 50);
        }
        // Wort-Teilchen
        for (var j = 0; j < teile.length; j++) {
          var p = teile[j], q = (t - p.d) / p.D, bi = p.tief ? TIEF : HELL;
          if (q <= 0) continue;
          if (q < 1) { var pos = bahn(p, q); s.punkt(pos[0], pos[1], p.r * (1 + 0.6 * M.sin(M.PI * q)), M.min(1, q * 8), bi); }
          else { var nach = (t - p.d - p.D) / 0.45; if (nach < 1) s.punkt(p.z[0], p.z[1], p.r * (1 - nach * 0.4), 1 - nach, bi); }
        }
        // echte Texte über dieselbe Uhr: Ziel-Wort, Leitsatz, kurzer Glanz auf dem Ausgangswort
        if (!fertig) {
          if (ziel) ziel.style.opacity = bereich(t, 2.45, 3.3).toFixed(3);
          var cl = oc(bereich(t, 2.9, 3.5)); setz(claim, cl, (1 - cl) * 12);
          if (quelle) quelle.classList.toggle("b-glanz", t > 1.2 && t < 2.1);
          if (t >= 3.5) endbild();
        }
        return t < 4.0;
      },
      ende: function () { teile = []; endbild(); },
      ausblenden: function () { fig.classList.add("b-aus"); },
      zuruecksetzen: function () {
        fertig = false; teile = [];
        fig.classList.remove("b-fertig", "b-aus"); if (ziel) ziel.style.opacity = "0"; setz(claim, 0, 12);
      },
      zug: function (s, z) { // Lichtzug: heller Kopf mit Funkenschweif, am Ziel ein kurzer Glanz auf dem Wort
        var k = klemm(z.t / 1.9), p = auf(bogen, z.hin ? ioc(k) : 1 - ioc(k));
        if (k < 1) { s.punkt(p[0], p[1], s.schmal ? 9 : 12, M.min(1, k * 6)); if (M.random() < 0.8) s.funke(p[0], p[1], 10, M.random() < 0.4 ? TIEF : HELL); }
        if (k >= 1 && !z.an) { z.an = true; for (var i = 0; i < 12; i++) s.funke(p[0], p[1], 36); glaenzen(z.hin ? ziel : quelle, "b-glanz"); }
        return !(k >= 1 && z.t > 2.6);
      },
    });
  })();

  // ---------- 2) Dolmetschen: ein Gespräch in beide Richtungen ----------
  document.querySelectorAll("[data-dolmetschen]").forEach(function (el) {
    var links = el.querySelector(".links"), rechts = el.querySelector(".rechts"), kiel = el.querySelector(".kiel");
    if (!links || !rechts || !kiel) return;
    var A, B, K, RA, RB, cAK, cKB, strom = [], fertig = false, gl = {}, ring = -1;
    function weg(von, nach, k) { return von === "A" ? qb(A, cAK, K, k) : von === "K" && nach === "B" ? qb(K, cKB, B, k) : von === "B" ? qb(B, cKB, K, k) : qb(K, cAK, A, k); }
    function wellen(s, r, t0, t, st) { // die Sprechblase „spricht“: drei goldene Umrisse breiten sich von ihr aus
      var ctx = s.ctx;
      for (var i = 0; i < 3; i++) {
        var k = bereich(t, t0 + i * 0.18, t0 + i * 0.18 + 0.9);
        if (k <= 0 || k >= 1) continue;
        var e = oc(k) * (s.schmal ? 16 : 24), x = r.x - e, y = r.y - e, w = r.w + 2 * e, h = r.h + 2 * e, rd = h / 2;
        ctx.globalAlpha = (1 - k) * 0.85 * (st || 1); ctx.strokeStyle = GOLD; ctx.lineWidth = 1.8 - k;
        ctx.beginPath(); ctx.moveTo(x + rd, y); ctx.lineTo(x + w - rd, y); ctx.arc(x + w - rd, y + rd, rd, -M.PI / 2, M.PI / 2);
        ctx.lineTo(x + rd, y + h); ctx.arc(x + rd, y + rd, rd, M.PI / 2, M.PI * 1.5); ctx.stroke();
      }
    }
    function teilchen(n, start, spread, dauer, richtung) { // ein Wortstrom: Sprecher → Federkiel → anderer Sprecher
      var von = richtung ? "A" : "B", nach = richtung ? "B" : "A";
      for (var i = 0; i < n; i++) {
        var d = start + (i / n) * spread + M.random() * 0.08;
        strom.push({ von: von, nach: nach, d: d, D: dauer * (0.9 + M.random() * 0.2), o: (M.random() * 2 - 1) * 11, r: 1.3 + M.random() * 1.4 });
      }
    }
    function zeichneStrom(s, t) {
      var lebt = false;
      for (var i = 0; i < strom.length; i++) {
        var p = strom[i], q = (t - p.d) / p.D;
        if (q < 2.25) lebt = true;
        if (q <= 0) continue;
        var pos, bild = HELL, r = p.r;
        if (q < 1) pos = weg(p.von, "K", ioc(q)); // hinein zum Federkiel: helles Licht (gesprochenes Wort)
        else if (q < 1.15) continue; // im Federkiel: Verwandlung (hinter dem Kiel, Leinwand liegt darunter)
        else if (q < 2.15) { pos = weg("K", p.nach, ioc(q - 1.15)); bild = TIEF; r *= 1.2; } // hinaus: tiefes Gold (andere Sprache)
        else continue;
        var w = M.sin(M.PI * (q < 1 ? q : q - 1.15)) * p.o;
        s.punkt(pos[0], pos[1] + w, r * (1 + 0.4 * M.sin(M.PI * (q % 1))), M.min(1, (q % 1) * 6 + 0.2), bild);
      }
      return lebt;
    }
    function kielGlanz(s, k, t) { // Verwandlung: Licht hinter dem Federkiel, er hebt und neigt sich kurz, ein Ring und Funken
      if (k > 0) {
        s.punkt(K[0], K[1], (s.schmal ? 60 : 84) * (0.6 + 0.5 * k), k * 0.55, WEICH);
        s.punkt(K[0], K[1], (s.schmal ? 22 : 30) * (0.7 + 0.5 * k), k * 0.95);
        kiel.style.transform = "translate(-50%, -50%) scale(" + (1 + 0.14 * k).toFixed(3) + ") rotate(" + (-7 * k).toFixed(2) + "deg)";
        if (k > 0.85 && ring < 0) { ring = t; for (var i = 0; i < 12; i++) s.funke(K[0], K[1], 46, i % 2 ? TIEF : HELL); }
      } else { kiel.style.transform = ""; if (ring >= 0 && t - ring > 0.9) ring = -1; }
      if (ring >= 0) {
        var e = bereich(t, ring, ring + 0.8);
        if (e < 1) { s.ctx.globalAlpha = (1 - e) * 0.5; s.ctx.strokeStyle = GOLD; s.ctx.lineWidth = 1.2; s.ctx.beginPath(); s.ctx.arc(K[0], K[1], 12 + oc(e) * (s.schmal ? 34 : 48), 0, 7); s.ctx.stroke(); }
      }
    }
    function endbild() { fertig = true; el.classList.add("d-fertig"); frei(links); frei(rechts); kiel.style.transform = ""; kiel.style.opacity = ""; }
    Szene(el, {
      name: "d", pad: 24, spaet: Infinity, unten: true, // kein Notfall-Endbild nötig: ohne Skript laufen die alten CSS-Einblendungen
      messen: function (s) {
        var l = s.rel(links), r = s.rel(rechts), k = s.rel(kiel); RA = l; RB = r;
        A = [l.x + l.w * 0.92, l.y + l.h * 0.62]; B = [r.x + r.w * 0.08, r.y + r.h * 0.38]; K = [k.x + k.w / 2, k.y + k.h / 2];
        cAK = [(A[0] + K[0]) / 2 + 6, M.min(A[1], K[1]) - 18]; cKB = [(K[0] + B[0]) / 2 - 6, M.max(K[1], B[1]) + 18];
      },
      vorbereiten: function (s) { strom = []; var n = s.schmal ? 70 : 110; teilchen(n, 0.5, 0.55, 0.6, true); teilchen(M.round(n * 0.5), 2.25, 0.3, 0.42, false); },
      intro: function (s, t) {
        if (!fertig) {
          var l = oc(bereich(t, 0, 0.5)), r = oc(bereich(t, 1.6, 2.1));
          setz(links, l, (1 - l) * 18); setz(rechts, r, (1 - r) * 18); kiel.style.opacity = oc(bereich(t, 0.2, 0.6)).toFixed(3);
        }
        wellen(s, RA, 0.4, t);                                                  // Deutsch spricht
        kielGlanz(s, M.max(buckel(t, 1.0, 1.9), buckel(t, 2.6, 3.1)), t);       // Verwandlung im Federkiel, dann die Antwort
        wellen(s, RB, 1.75, t);                                                 // Türkisch kommt an und spricht weiter
        wellen(s, RA, 3.0, t, 0.7);                                             // die Antwort kommt bei Deutsch an
        if (t > 1.8 && !gl.r) { gl.r = 1; glaenzen(rechts, "d-glanz"); }
        if (t > 3.05 && !gl.l) { gl.l = 1; glaenzen(links, "d-glanz"); }
        var lebt = zeichneStrom(s, t);
        if (t >= 3.4 && !fertig) endbild();
        return lebt || t < 3.9;
      },
      ende: function () { strom = []; endbild(); },
      ausblenden: function () { el.classList.add("d-aus"); },
      zuruecksetzen: function () {
        fertig = false; strom = []; gl = {}; kiel.style.transform = "";
        el.classList.remove("d-fertig", "d-aus"); setz(links, 0, 18); setz(rechts, 0, 18); kiel.style.opacity = "0";
      },
      zugStart: function (s, z) { strom = []; teilchen(s.schmal ? 36 : 54, 0.35, 0.4, 0.5, z.hin); },
      zug: function (s, z) {
        wellen(s, z.hin ? RA : RB, 0, z.t, 0.8);
        kielGlanz(s, buckel(z.t, 0.7, 1.5), z.t);
        wellen(s, z.hin ? RB : RA, 1.4, z.t, 0.8);
        if (!z.an && z.t > 1.45) { z.an = true; glaenzen(z.hin ? rechts : links, "d-glanz"); }
        return zeichneStrom(s, z.t) || z.t < 2.4;
      },
    });
  });

  // ---------- 3) Ablauf „So einfach geht's“ (Can 31.10.2026 10:43): Licht zieht von Schritt zu Schritt ----------
  // Schritt 1 leuchtet auf → ein Lichtpunkt zieht die goldene Linie zu Schritt 2 → Aufleuchten, Schritt 2 erscheint → weiter zu Schritt 3 →
  // großes warmes Aufleuchten (Ergebnis) → Übergabe an die fertige Leiste (ca. 3,3 s). Wiederholung und Neustart wie bei der Brücke.
  document.querySelectorAll("[data-ablauf]").forEach(function (el) {
    var schritte = Array.prototype.slice.call(el.querySelectorAll(".a-schritt")), kreise = schritte.map(function (x) { return x.querySelector(".a-kreis"); });
    if (schritte.length < 2 || kreise.some(function (k) { return !k; })) return;
    var P = [], R = 0, fertig = false, an = {};
    var ANK = [0.25, 1.4, 2.6]; // Ankunftszeiten des Lichts je Schritt (s)
    function bahn(k) { // Punkt bei Anteil k (0…1) der ganzen Linie
      var n = P.length - 1, f = klemm(k) * n, i = M.min(n - 1, f | 0), u = f - i;
      return [P[i][0] + (P[i + 1][0] - P[i][0]) * u, P[i][1] + (P[i + 1][1] - P[i][1]) * u];
    }
    function strich(s, von, bis, a) { // goldene Linie von Anteil von bis Anteil bis
      if (bis <= von || a <= 0.01) return;
      var p = bahn(von), q = bahn(bis), ctx = s.ctx;
      ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
    }
    function aufleuchten(s, i, t0, t, gross) { // Ankunft: Licht hinter dem Kreis, feiner Ring, Funken
      var k = bereich(t, t0, t0 + 0.9);
      if (k <= 0 || k >= 1) return;
      var c = P[i], e = oc(k);
      if (gross) s.punkt(c[0], c[1], R * (2.2 + e), (1 - k) * 0.6, WEICH);
      s.punkt(c[0], c[1], R * (0.9 + 0.7 * e), (1 - k) * 0.95);
      s.ctx.globalAlpha = (1 - k) * 0.5; s.ctx.strokeStyle = GOLD; s.ctx.lineWidth = 1.2; s.ctx.beginPath(); s.ctx.arc(c[0], c[1], R * (1 + e * (gross ? 1.4 : 0.9)), 0, 7); s.ctx.stroke();
    }
    function endbild() { fertig = true; el.classList.add("a-fertig"); schritte.forEach(frei); }
    Szene(el, {
      name: "a", pad: 40, spaet: 3300, unten: true,
      messen: function (s) {
        P = kreise.map(function (k) { var r = s.rel(k); return [r.x + r.w / 2, r.y + r.h / 2]; });
        R = s.rel(kreise[0]).w / 2;
      },
      vorbereiten: function () { an = {}; },
      intro: function (s, t) {
        var aus = 1 - bereich(t, 3.0, 3.5), n = P.length - 1;
        // Linie wächst mit dem Lichtkopf: Kopf fährt zwischen den Ankunftszeiten von Kreis zu Kreis
        var kopf = 0;
        for (var i = 0; i < n; i++) { var a = ANK[i] + 0.3, b = ANK[i + 1]; if (t >= a) kopf = (i + ioc(bereich(t, a, b))) / n; }
        strich(s, 0, kopf, aus);
        var fahrt = false;
        for (var j = 0; j < n; j++) if (t > ANK[j] + 0.3 && t < ANK[j + 1]) fahrt = true;
        if (fahrt) {
          var h = bahn(kopf); s.punkt(h[0], h[1], s.schmal ? 9 : 12, 1);
          if (M.random() < 0.8) s.funke(h[0], h[1], 14, M.random() < 0.35 ? TIEF : HELL);
        }
        for (var k = 0; k < P.length; k++) {
          aufleuchten(s, k, ANK[k], t, k === P.length - 1);
          if (t >= ANK[k] && !an[k]) { an[k] = 1; glaenzen(kreise[k], "a-glanz"); for (var f = 0; f < (k === P.length - 1 ? 14 : 8); f++) s.funke(P[k][0], P[k][1], 40, f % 2 ? TIEF : HELL); }
          if (!fertig) { var e = oc(bereich(t, ANK[k] - 0.15, ANK[k] + 0.4)); setz(schritte[k], e, (1 - e) * 14); }
        }
        if (t >= 3.3 && !fertig) endbild();
        return t < 3.6;
      },
      ende: function () { endbild(); },
      ausblenden: function () { el.classList.add("a-aus"); },
      zuruecksetzen: function () {
        fertig = false; an = {}; el.classList.remove("a-fertig", "a-aus");
        schritte.forEach(function (x) { setz(x, 0, 14); });
      },
      zug: function (s, z) { // beim Darüberfahren: ein Lichtpunkt läuft die Linie entlang, kurzer Glanz am Ziel
        var k = klemm(z.t / 1.6), p = bahn(z.hin ? ioc(k) : 1 - ioc(k));
        if (k < 1) { s.punkt(p[0], p[1], s.schmal ? 8 : 11, M.min(1, k * 6)); if (M.random() < 0.7) s.funke(p[0], p[1], 10); }
        if (k >= 1 && !z.an) { z.an = true; glaenzen(kreise[z.hin ? kreise.length - 1 : 0], "a-glanz"); }
        return !(k >= 1 && z.t > 2.2);
      },
    });
  });
})();
