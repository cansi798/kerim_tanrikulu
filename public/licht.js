// Licht-Szenen (Can 31.10.2026: „viel krasser, Wow“) – Canvas 2D, selbst geschrieben, ohne Bibliothek, CSP-konform (eigene Datei).
// Zwei Szenen mit gemeinsamem Kern:
//   1) Sprachbrücke im Hero der Startseite [data-bruecke] – Sinnbild Übersetzen (ca. 3,5 s):
//      Ufer leuchten auf → der Bogen wächst aus Licht von beiden Ufern und trifft sich in der Mitte → Hänger, Innenbogen, Spiegelung →
//      Lichtteilchen lösen sich aus dem Wort links, wandern über den Bogen und setzen sich rechts zum Wort der anderen Sprache zusammen → Leitsatz.
//      Leerlauf: alle 10 s ein Lichtzug über den Bogen, abwechselnd hin und zurück (auch beim Darüberfahren mit der Maus).
//   2) Dolmetschen [data-dolmetschen] – der Ablauf eines Gesprächs (ca. 3,5 s):
//      Deutsch „spricht“ (goldene Schallwellen) → die Worte fließen als helles Licht zum Federkiel → dort Aufleuchten, Verwandlung in tiefes Gold →
//      sie kommen als neue Wellen bei Türkisch an → kurze Antwort zurück. Leerlauf: alle 10 s ein Wortwechsel, abwechselnd die Richtung.
// Nur mit JS und ohne „Bewegung reduzieren“; sonst bleibt das fertige Standbild (SVG/HTML). Texte bleiben echter Text, Canvas ist aria-hidden.
// Rechnet nur, solange die Szene im Bild und der Tab sichtbar ist (IntersectionObserver, visibilitychange, kein rAF im Leerlauf).
(function () {
  if (!window.requestAnimationFrame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var M = Math, GOLD = "#a8803c";
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
  var HELL = sprite([[0, "rgba(255,253,246,1)"], [0.2, "rgba(255,244,214,0.95)"], [0.42, "rgba(220,178,100,0.45)"], [1, "rgba(168,128,60,0)"]]);
  var WEICH = sprite([[0, "rgba(255,250,236,0.9)"], [0.25, "rgba(255,240,206,0.62)"], [0.5, "rgba(236,206,150,0.3)"], [0.75, "rgba(214,176,108,0.1)"], [1, "rgba(214,176,108,0)"]], 256);
  var TIEF = sprite([[0, "rgba(255,238,196,1)"], [0.18, "rgba(206,152,62,0.95)"], [0.45, "rgba(170,120,46,0.4)"], [1, "rgba(150,105,40,0)"]]);

  function proben(svg, sel, n, abb) {
    var el = svg.querySelector(sel), l = el.getTotalLength(), out = [];
    for (var i = 0; i < n; i++) { var p = el.getPointAtLength((l * i) / (n - 1)); out.push(abb(p.x, p.y)); }
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
  function Szene(el, c) {
    var cv = document.createElement("canvas"), ctx = cv.getContext("2d");
    if (!ctx) return;
    var s = { el: el, ctx: ctx, W: 0, H: 0, PAD: c.pad, funken: [], schmal: false };
    var breit = window.innerWidth >= 900;
    var spaet = performance.now() > c.spaet; // Notfall-Endbild ist schon zu sehen → keine Intro
    el.classList.add(c.name + "-bereit");
    cv.setAttribute("aria-hidden", "true");
    el.appendChild(cv);
    s.punkt = function (x, y, r, a, bild) { if (a <= 0.01 || (bild === WEICH && !breit)) return; ctx.globalAlpha = a > 1 ? 1 : a; ctx.drawImage(bild || HELL, x - r, y - r, 2 * r, 2 * r); };
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
      var dpr = window.innerWidth < 900 ? 1 : M.min(1.5, window.devicePixelRatio || 1);
      s.W = r.width + 2 * s.PAD; s.H = r.height + 2 * s.PAD; s.schmal = r.width < 420;
      cv.style.cssText = "position:absolute;pointer-events:none;left:" + -s.PAD + "px;top:" + -s.PAD + "px;width:" + s.W + "px;height:" + s.H + "px" + (c.unten ? ";z-index:0" : "");
      cv.width = M.round(s.W * dpr); cv.height = M.round(s.H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.messen(s);
    }

    var t = 0, intro = !spaet, zug = null, laeuft = false, raf = 0, letzte = 0, sichtbar = false, aktiv = !document.hidden;
    var timer = 0, gestartet = false, erster = true, hin = false;
    function bild(jetzt) {
      if (!laeuft) return;
      var dt = M.min(0.05, (jetzt - letzte) / 1000 || 0.016); letzte = jetzt; t += dt;
      // Spuren: das letzte Bild nur teilweise löschen → weiche Lichtschweife
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "rgba(0,0,0,0.38)"; ctx.fillRect(0, 0, s.W, s.H);
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
    function los() { if (laeuft || !sichtbar || !aktiv) return; laeuft = true; letzte = performance.now(); raf = requestAnimationFrame(bild); }
    function stopp() { laeuft = false; cancelAnimationFrame(raf); }
    function ruhe() { stopp(); ctx.clearRect(0, 0, s.W, s.H); clearTimeout(timer); timer = setTimeout(neuerZug, erster ? 6500 : 10000); }
    function neuerZug() {
      timer = 0;
      if (zug || intro || !sichtbar || !aktiv) return; // wird beim Wiedersichtbarwerden nachgeholt
      hin = erster ? true : !hin; erster = false; zug = { t: 0, hin: hin, an: false }; c.zugStart && c.zugStart(s, zug); los();
    }
    function start() {
      if (gestartet) return; gestartet = true; messen();
      if (intro) { c.vorbereiten(s); los(); } else { c.ende(s); ruhe(); }
    }
    function weiter() {
      if (!gestartet) { if (sichtbar && aktiv) bereit(start); return; }
      if (intro || zug || s.funken.length) los(); else if (!timer) neuerZug();
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; if (!sichtbar) stopp(); else weiter(); }, { threshold: 0.35 }).observe(el);
    } else { sichtbar = true; weiter(); }
    document.addEventListener("visibilitychange", function () { aktiv = !document.hidden; if (!aktiv) stopp(); else weiter(); });
    var rz = 0;
    window.addEventListener("resize", function () {
      clearTimeout(rz); rz = setTimeout(function () { if (!gestartet) return; if (intro) { intro = false; c.ende(s); } messen(); }, 200);
    }, { passive: true });
    el.addEventListener("pointerenter", function () { if (gestartet && !intro && !zug) { clearTimeout(timer); neuerZug(); } });
  }

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
})();
