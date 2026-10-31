// Grundskript jeder Seite (CSP: nur eigene Dateien, kein Inline-JS; dazu licht.js auf Start- und Dolmetschen-Seite). Ohne JavaScript ist alles sichtbar und lesbar.
// 1) Markiert <html> mit „js“, damit Szenen und .reveal-Blöcke erst beim Sichtbarwerden starten.
// 2) Startet jede Szene [data-szene] und jeden .reveal-Block genau einmal (Klasse „an“).
// 3) Kopfzeile wie Bauwelt: beim Scrollen nur Schatten und goldene Fortschrittsleiste (transform: scaleX).
// v4 (Can 31.10.2026, animierte Landingpage):
// 4) Scroll-Story [data-verlauf]: setzt --p (0…1) beim Durchscrollen; Kinder mit data-ab="0.4" starten ab diesem Wert.
//    Nur am breiten Bildschirm und ohne „Bewegung reduzieren“, sonst starten sie beim Sichtbarwerden.
// 5) Sanfte Parallaxe [data-parallax="0.08"] (nur breit, nur transform).
// 6) Zähler [data-zahl]: zählen einmal bis zum Endwert hoch (0,9 s). Der Endwert steht schon im HTML.
// Alles läuft nur beim Scrollen bzw. einmal beim Sichtbarwerden, nichts beim Laden (Ladezeit).
document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", function () {
  var ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var breit = window.matchMedia("(min-width: 62rem)");
  var story = !ruhig && breit.matches;

  var starten = function (el) {
    if (el.classList.contains("an")) return;
    el.classList.add("an");
    if (el.hasAttribute("data-zahl")) zaehlen(el);
    el.querySelectorAll && el.querySelectorAll("[data-zahl]").forEach(zaehlen);
  };

  function zaehlen(el) {
    if (ruhig || el.dataset.gezaehlt) return;
    el.dataset.gezaehlt = "1";
    var ziel = parseInt(el.textContent, 10);
    if (!(ziel > 0) || ziel > 100) return; // Jahreszahlen nicht hochzählen
    var t0 = performance.now();
    var schritt = function (t) {
      var x = Math.min(1, (t - t0) / 900);
      el.textContent = String(Math.round(ziel * (1 - Math.pow(1 - x, 3))));
      if (x < 1) requestAnimationFrame(schritt);
    };
    el.textContent = "0";
    requestAnimationFrame(schritt);
  }

  var ziele = document.querySelectorAll("[data-szene], .reveal, [data-zahl]");
  var beobachtet = [];
  ziele.forEach(function (el) { if (!(story && el.hasAttribute("data-ab"))) beobachtet.push(el); });
  if (!("IntersectionObserver" in window)) { ziele.forEach(starten); }
  else {
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { starten(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    beobachtet.forEach(function (el) { io.observe(el); });
  }

  var verlaeufe = story ? Array.prototype.slice.call(document.querySelectorAll("[data-verlauf]")) : [];
  var parallaxe = story ? Array.prototype.slice.call(document.querySelectorAll("[data-parallax]")) : [];
  var kopf = document.querySelector(".kopf");
  var balken = document.querySelector(".kopf-balken span");
  var an = false, geplant = false;

  var pruefen = function () {
    geplant = false;
    var y = window.scrollY, vh = window.innerHeight;
    var jetzt = y > 8;
    if (kopf && jetzt !== an) { an = jetzt; kopf.classList.toggle("gescrollt", an); }
    if (balken) {
      var max = document.documentElement.scrollHeight - vh;
      balken.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    }
    verlaeufe.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      var weg = r.height - vh;
      var p = weg > 0 ? Math.min(1, Math.max(0, (vh * 0.35 - r.top) / weg)) : (r.top < vh * 0.5 ? 1 : 0);
      el.style.setProperty("--p", p.toFixed(3));
      el.querySelectorAll("[data-ab]").forEach(function (k) {
        if (p >= parseFloat(k.getAttribute("data-ab"))) starten(k);
      });
    });
    parallaxe.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var f = parseFloat(el.getAttribute("data-parallax")) || 0.08;
      var mitte = r.top + r.height / 2 - vh / 2;
      el.style.transform = "translate3d(0," + (-mitte * f).toFixed(1) + "px,0)";
    });
  };
  window.addEventListener("scroll", function () { if (!geplant) { geplant = true; requestAnimationFrame(pruefen); } }, { passive: true });
  window.addEventListener("resize", function () { if (!geplant) { geplant = true; requestAnimationFrame(pruefen); } }, { passive: true });
  // Erste Messung erst nach dem ersten Bild (sonst erzwingt sie beim Laden eine zusätzliche Layout-Runde)
  // (auch scrollY nicht beim Start lesen – das erzwingt ebenfalls ein Layout)
  window.addEventListener("load", function () { setTimeout(function () { requestAnimationFrame(pruefen); }, 0); });
});
