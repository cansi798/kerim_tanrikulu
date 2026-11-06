// Hero-Animation der Startseite „Gespräch über den Dolmetscher“ (Jamil, Talk 31.10.2026 11:58/3967/3968; Can „Ja“ 12:39 – ersetzt die Licht-Brücke).
// Nutzt den gemeinsamen Kern aus licht.js (window.LichtKern: Leinwand, Uhr, Sichtbarkeit, Funken, Wiederholung alle 14 s, iPhone-resize-sicher).
// Ablauf (ca. 4 s): Person links erscheint und spricht (goldene Schallwellen am Mund) → die Worte fließen als helles Licht zum Federkiel →
// dort Verwandlung (Aufleuchten, Ring, Funken, der Kiel hebt sich, tiefes Gold) → das Licht erreicht das Ohr der Person rechts
// (Wellen am Ohr, leichtes Nicken, goldener Rand leuchtet auf, Sprachname erscheint) → kurze Antwort zurück → Übergabe an das SVG-Endbild.
// „Bewegung reduzieren“: Endbild blendet beim ersten Sichtbarwerden sanft ein (1 s). Ohne JS: fertiges SVG.
(function () {
  var el = document.querySelector("[data-gespraech]");
  if (!el || !window.requestAnimationFrame) return;
  var personL = el.querySelector(".g-links"), personR = el.querySelector(".g-rechts"), kiel = el.querySelector(".g-kiel");
  var kopfR = personR && personR.querySelector(".g-kopf"), quelle = el.querySelector(".g-quelle"), ziel = el.querySelector(".g-ziel");
  var claim = el.querySelector(".claim"), svg = el.querySelector("svg");
  if (!personL || !personR || !kiel || !svg) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { // sanfte Kurzfassung: nur Einblenden
    var teile = el.querySelectorAll(".g-teil, .g-person, .g-kiel, .g-namen, .claim");
    if (!("IntersectionObserver" in window)) return;
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
    return;
  }
  var L = window.LichtKern;
  if (!L) return; // ohne Kern: Notfall-CSS zeigt das Endbild
  var M = Math, bereich = L.bereich, ioc = L.ioc, oc = L.oc, buckel = L.buckel, qb = L.qb, glaenzen = L.glaenzen, GOLD = L.GOLD;

  // Punkte im SVG-Koordinatensystem (viewBox 440 × 220), siehe HeroGespraech.astro
  var V = { mundL: [139, 97], ohrR: [340, 86], mundR: [301, 97], ohrL: [100, 86], kiel: [220, 80], cHin: [176, 62], cAus: [286, 50], cZur: [262, 110], cZur2: [152, 118], nicken: [96, 128] };
  var P = {}, S = 1, strom = [], fertig = false, gl = {}, ring = -1;
  // Stile nur schreiben, wenn sich der Wert ändert (sonst rechnet der Browser jedes Bild Stil und SVG neu – Ladezeit am Handy)
  function setz(el, a, dy, extra) { if (!el) return; var k = a.toFixed(3) + "|" + dy.toFixed(1); if (el._gk === k) return; el._gk = k; L.setz(el, a, dy, extra); }
  function frei(el) { if (el) { el._gk = ""; L.frei(el); } }
  function deckung(el, a) { var k = a.toFixed(3); if (el._gk === k) return; el._gk = k; el.style.opacity = k; }

  function sprechen(s, c, t0, t, richtung, st, rein) { // Schallwellen als Bogenstücke: am Mund nach außen, am Ohr nach innen
    var ctx = s.ctx;
    for (var i = 0; i < 3; i++) {
      var k = bereich(t, t0 + i * 0.17, t0 + i * 0.17 + 0.85);
      if (k <= 0 || k >= 1) continue;
      var e = oc(k), r = (rein ? 56 - 44 * e : 8 + 34 * e) * S;
      ctx.globalAlpha = (rein ? M.sin(M.PI * k) : 1 - k) * 0.9 * (st || 1); ctx.strokeStyle = rein ? "#8a95ad" : GOLD; ctx.lineWidth = (2.2 - k) * M.max(0.8, S);
      ctx.beginPath(); ctx.arc(c[0], c[1], r, richtung - 0.55, richtung + 0.55); ctx.stroke();
    }
  }
  function weg(p, k) {
    if (p.art === "hin") return qb(P.mundL, P.cHin, P.kiel, k);
    if (p.art === "aus") return qb(P.kiel, P.cAus, P.ohrR, k);
    if (p.art === "zur") return qb(P.mundR, P.cZur, P.kiel, k);
    return qb(P.kiel, P.cZur2, P.ohrL, k);
  }
  function teilchen(n, start, spread, dauer, antwort) { // ein Wortstrom: Mund → Federkiel (hell) → Ohr (tiefes Gold)
    for (var i = 0; i < n; i++) {
      var d = start + (i / n) * spread + M.random() * 0.07, D = dauer * (0.9 + M.random() * 0.2), o = (M.random() * 2 - 1) * 9, r = 1.3 + M.random() * 1.5;
      strom.push({ art: antwort ? "zur" : "hin", d: d, D: D, o: o, r: r, zweit: antwort ? "zurAus" : "aus" });
    }
  }
  function zeichneStrom(s, t) {
    var lebt = false, HELL = L.bild("hell"), TIEF = L.bild("tief");
    for (var i = 0; i < strom.length; i++) {
      var p = strom[i], q = (t - p.d) / p.D;
      if (q < 2.25) lebt = true;
      if (q <= 0 || q >= 2.15 || (q >= 1 && q < 1.15)) continue; // im Federkiel: Verwandlung
      var zwei = q >= 1.15, u = zwei ? q - 1.15 : q, pos = weg(zwei ? { art: p.zweit } : p, ioc(u));
      var w = M.sin(M.PI * u) * p.o * S;
      s.punkt(pos[0], pos[1] + w, p.r * (zwei ? 1.2 : 1) * (1 + 0.4 * M.sin(M.PI * u)) * M.max(0.8, S), M.min(1, u * 6 + 0.2), zwei ? TIEF : HELL);
    }
    return lebt;
  }
  function kielStellen(k) { // Federkiel hebt und neigt sich kurz (SVG-Attribut, keine Inline-Stile)
    var c = V.kiel;
    if (k <= 0.001) { if (kiel.hasAttribute("transform")) kiel.removeAttribute("transform"); }
    else kiel.setAttribute("transform", "translate(" + c[0] + " " + c[1] + ") scale(" + (1 + 0.16 * k).toFixed(3) + ") rotate(" + (-8 * k).toFixed(2) + ") translate(" + -c[0] + " " + -c[1] + ")");
  }
  function kielGlanz(s, k, t) { // Verwandlung: Licht hinter dem Kiel, Ring, Funken
    var K = P.kiel;
    if (k > 0) {
      s.punkt(K[0], K[1], (s.schmal ? 54 : 80) * (0.6 + 0.5 * k), k * 0.55, L.bild("weich"));
      s.punkt(K[0], K[1], (s.schmal ? 20 : 28) * (0.7 + 0.5 * k), k * 0.95);
      kielStellen(k);
      if (k > 0.85 && ring < 0) { ring = t; glaenzen(kiel, "g-glanz"); for (var i = 0; i < 12; i++) s.funke(K[0], K[1], 46, i % 2 ? L.bild("tief") : L.bild("hell")); }
    } else { kielStellen(0); if (ring >= 0 && t - ring > 0.9) ring = -1; }
    if (ring >= 0) {
      var e = bereich(t, ring, ring + 0.8);
      if (e < 1) { s.ctx.globalAlpha = (1 - e) * 0.5; s.ctx.strokeStyle = GOLD; s.ctx.lineWidth = 1.2; s.ctx.beginPath(); s.ctx.arc(K[0], K[1], 12 + oc(e) * (s.schmal ? 30 : 46), 0, 7); s.ctx.stroke(); }
    }
  }
  function nicken(k) { // leichtes Nicken der Person rechts (Drehpunkt am Hals, im gespiegelten Koordinatensystem)
    if (!kopfR) return;
    if (k <= 0.001) { if (kopfR.hasAttribute("transform")) kopfR.removeAttribute("transform"); }
    else kopfR.setAttribute("transform", "rotate(" + (5 * k).toFixed(2) + " " + V.nicken[0] + " " + V.nicken[1] + ")");
  }
  function endbild() {
    fertig = true; el.classList.add("g-fertig");
    [personL, personR, quelle, ziel, claim].forEach(frei); kiel._gk = ""; kiel.style.opacity = ""; kielStellen(0); nicken(0);
  }

  L.Szene(el, {
    name: "g", pad: 30, spaet: 3300,
    messen: function (s) {
      var r = s.rel(svg), vb = svg.viewBox.baseVal; S = r.w / vb.width; // viewBox kann oben beschnitten sein (y > 0)
      for (var k in V) P[k] = [r.x + (V[k][0] - vb.x) * S, r.y + (V[k][1] - vb.y) * S];
    },
    vorbereiten: function (s) {
      strom = []; var n = s.schmal ? 48 : 100;
      teilchen(n, 0.75, 0.6, 0.62, false);                 // das Gesagte
      teilchen(M.round(n * 0.4), 2.95, 0.3, 0.4, true);    // kurze Antwort zurück
    },
    intro: function (s, t) {
      if (!fertig) {
        var a = oc(bereich(t, 0, 0.55)), b = oc(bereich(t, 0.15, 0.7));
        setz(personL, a, (1 - a) * 16); setz(quelle, a, (1 - a) * 10, "translateX(-50%)");
        setz(personR, b, (1 - b) * 16);
        deckung(kiel, oc(bereich(t, 0.25, 0.65)));
        var z = oc(bereich(t, 2.35, 2.9)); setz(ziel, z, (1 - z) * 10, "translateX(-50%)");   // der Sprachname rechts erscheint, wenn das Gesagte ankommt
        var cl = oc(bereich(t, 3.0, 3.6)); setz(claim, cl, (1 - cl) * 12);
      }
      sprechen(s, P.mundL, 0.55, t, 0);                                    // links spricht
      kielGlanz(s, M.max(buckel(t, 1.2, 2.05), 0.55 * buckel(t, 3.2, 3.65)), t); // Verwandlung im Federkiel, dann die Antwort
      sprechen(s, P.ohrR, 2.05, t, M.PI, 1, true);                         // Wellen am Ohr rechts
      nicken(buckel(t, 2.4, 3.1));                                        // rechts hört und nickt
      if (t > 2.45 && !gl.r) { gl.r = 1; glaenzen(personR, "g-glanz"); glaenzen(ziel, "g-glanz"); s.punkt(P.ohrR[0], P.ohrR[1], 18 * S, 0.8); }
      sprechen(s, P.mundR, 2.85, t, M.PI, 0.6);                            // kurze Antwort
      sprechen(s, P.ohrL, 3.55, t, 0, 0.6, true);
      if (t > 3.7 && !gl.l) { gl.l = 1; glaenzen(personL, "g-glanz"); }
      var lebt = zeichneStrom(s, t);
      if (t >= 3.75 && !fertig) endbild();
      return lebt || t < 4.2;
    },
    ende: function () { strom = []; endbild(); },
    ausblenden: function () { el.classList.add("g-aus"); },
    zuruecksetzen: function () {
      fertig = false; strom = []; gl = {}; ring = -1; kielStellen(0); nicken(0);
      el.classList.remove("g-fertig", "g-aus");
      setz(personL, 0, 16); setz(personR, 0, 16); setz(quelle, 0, 10, "translateX(-50%)"); setz(ziel, 0, 10, "translateX(-50%)"); setz(claim, 0, 12); deckung(kiel, 0);
    },
    zugStart: function (s, z) { strom = []; teilchen(s.schmal ? 36 : 54, 0.35, 0.4, 0.5, !z.hin); },
    zug: function (s, z) { // beim Darüberfahren: ein kurzer Wortwechsel (abwechselnd hin und zurück)
      sprechen(s, z.hin ? P.mundL : P.mundR, 0, z.t, z.hin ? 0 : M.PI, 0.8);
      kielGlanz(s, buckel(z.t, 0.7, 1.45), z.t);
      sprechen(s, z.hin ? P.ohrR : P.ohrL, 1.3, z.t, z.hin ? M.PI : 0, 0.8, true);
      if (!z.an && z.t > 1.5) { z.an = true; glaenzen(z.hin ? personR : personL, "g-glanz"); }
      return zeichneStrom(s, z.t) || z.t < 2.4;
    },
  });
})();
