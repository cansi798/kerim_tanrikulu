// Einziges Skript der Seite (CSP: nur eigene Dateien, kein Inline-JS).
// 1) Markiert <html> mit „js“, damit Szenen und .reveal-Blöcke erst beim Sichtbarwerden starten
//    (ohne JS ist alles sofort sichtbar bzw. läuft beim Laden).
// 2) Startet jede Szene [data-szene] und jeden .reveal-Block genau einmal (Klasse „an“), sobald ein Viertel im Bild ist.
// 3) Kopfzeile wie Bauwelt: beim Scrollen nur Schatten (Höhe bleibt) und goldene Fortschrittsleiste (transform: scaleX).
document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", function () {
  var ziele = document.querySelectorAll("[data-szene], .reveal");
  var starten = function (el) { el.classList.add("an"); };
  if (!("IntersectionObserver" in window)) { ziele.forEach(starten); }
  else {
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { starten(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    ziele.forEach(function (el) { io.observe(el); });
  }
  var kopf = document.querySelector(".kopf");
  var balken = document.querySelector(".kopf-balken span");
  var an = false, geplant = false;
  var pruefen = function () {
    geplant = false;
    var y = window.scrollY;
    var jetzt = y > 8;
    if (kopf && jetzt !== an) { an = jetzt; kopf.classList.toggle("gescrollt", an); }
    if (balken) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      balken.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    }
  };
  window.addEventListener("scroll", function () { if (!geplant) { geplant = true; requestAnimationFrame(pruefen); } }, { passive: true });
  pruefen();
});
