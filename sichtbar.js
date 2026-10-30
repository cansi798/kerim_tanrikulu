// Einziges Skript der Seite (CSP: nur eigene Dateien, kein Inline-JS).
// 1) Markiert <html> mit „js“, damit Szenen erst beim Sichtbarwerden starten (ohne JS laufen sie beim Laden).
// 2) Startet jede Szene [data-szene] genau einmal, sobald ein Viertel davon im Bild ist. Kein Neustart beim Zurückscrollen.
// 3) Kopfzeile bekommt beim Scrollen nur einen Schatten (Höhe bleibt gleich).
document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", function () {
  var szenen = document.querySelectorAll("[data-szene]");
  var starten = function (el) { el.classList.add("an"); };
  if (!("IntersectionObserver" in window)) { szenen.forEach(starten); }
  else {
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { starten(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    szenen.forEach(function (el) { io.observe(el); });
  }
  var kopf = document.querySelector(".kopf");
  if (kopf) {
    var an = false;
    var pruefen = function () {
      var jetzt = window.scrollY > 8;
      if (jetzt !== an) { an = jetzt; kopf.classList.toggle("gescrollt", an); }
    };
    window.addEventListener("scroll", pruefen, { passive: true });
    pruefen();
  }
});
