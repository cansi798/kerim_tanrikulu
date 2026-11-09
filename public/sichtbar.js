// Grundskript jeder Seite (CSP: nur eigene Dateien, kein Inline-JS; dazu licht.js auf Start- und Dolmetschen-Seite). Ohne JavaScript ist alles sichtbar und lesbar.
// 1) Markiert <html> mit „js“, damit Szenen und .reveal-Blöcke erst beim Sichtbarwerden starten.
// 2) Startet jede Szene [data-szene] und jeden .reveal-Block genau einmal (Klasse „an“), sobald er wirklich im Bild ist (≥ 35 %).
// 3) Kopfzeile wie Bauwelt: beim Scrollen nur Schatten und goldene Fortschrittsleiste (transform: scaleX).
// v4 (Can 31.10.2026, animierte Landingpage):
// 4) Scroll-Story [data-verlauf]: setzt --p (0…1) beim Durchscrollen; Kinder mit data-ab="0.4" starten ab diesem Wert.
//    Nur am breiten Bildschirm und ohne „Bewegung reduzieren“, sonst starten sie beim Sichtbarwerden.
// 5) Sanfte Parallaxe [data-parallax="0.08"] (nur breit, nur transform).
// 6) Zähler [data-zahl]: zählen einmal bis zum Endwert hoch (0,9 s). Der Endwert steht schon im HTML.
// 8) „Nach oben“-Knopf [data-hoch] (Can Talk 3964): erscheint nach ca. 1,5 Bildschirmhöhen (am Handy nur beim Hochscrollen), führt sanft zum Seitenanfang.
// 9) Kopf: Aufklappmenü „Leistungen“ [data-nav-gruppe] (Jamil Talk xidc8qvq #5315, 09.11.2026): Maus, Klick, Enter/Leertaste,
//    Pfeil runter in die Liste, Pfeiltasten in der Liste, Escape schließt; Zustand über aria-expanded + data-offen.
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

  // 7) Einsatzgebiet-Karte (v5, wie Bauwelt): eigene SVG-Datei ca. 300 px vor dem Sichtbarwerden laden und einsetzen
  //    (Farbblock der Datei entfernen – im Dokument gelten die Farben der Seite). Fehler → fertiges Bild als <img>.
  var karten = document.querySelectorAll("[data-karte]");
  var karteLaden = function (p) {
    var src = p.getAttribute("data-karte"); p.removeAttribute("data-karte");
    fetch(src).then(function (r) { if (!r.ok) throw r.status; return r.text(); })
      .then(function (t) { p.insertAdjacentHTML("afterend", t.replace(/<style data-datei(="")?>[\s\S]*?<\/style>/, "")); p.parentNode.removeChild(p); })
      .catch(function () { p.innerHTML = '<img class="rkarte-bild" src="' + src + '" alt="">'; });
  };
  if (karten.length) {
    if (!("IntersectionObserver" in window) || !window.fetch) karten.forEach(karteLaden);
    else {
      var kio = new IntersectionObserver(function (e) { e.forEach(function (x) { if (x.isIntersecting) { kio.unobserve(x.target); karteLaden(x.target); } }); }, { rootMargin: "300px 0px" });
      karten.forEach(function (k) { kio.observe(k); });
    }
  }

  var ziele = document.querySelectorAll("[data-szene], .reveal, [data-zahl]");
  var beobachtet = [];
  ziele.forEach(function (el) { if (!(story && el.hasAttribute("data-ab"))) beobachtet.push(el); });
  if (!("IntersectionObserver" in window)) { ziele.forEach(starten); }
  else {
    // Start erst, wenn der Bereich wirklich im Bild ist (Can 31.10. 08:45): mind. 35 % von ihm oder 35 % der Bildschirmhöhe
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting && (e.intersectionRatio >= 0.35 || e.intersectionRect.height >= window.innerHeight * 0.35)) { starten(e.target); io.unobserve(e.target); }
      });
    }, { threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1] });
    beobachtet.forEach(function (el) { io.observe(el); });
  }

  var verlaeufe = story ? Array.prototype.slice.call(document.querySelectorAll("[data-verlauf]")) : [];
  var parallaxe = story ? Array.prototype.slice.call(document.querySelectorAll("[data-parallax]")) : [];
  var kopf = document.querySelector(".kopf");
  var balken = document.querySelector(".kopf-balken span");
  var an = false, geplant = false;
  // 8) „Nach oben“ (Can Talk 3964): ab ca. 1,5 Bildschirmhöhen sichtbar; Klick → sanft nach oben (ruhig: sofort),
  //    danach Fokus an den Seitenanfang (Tastatur: Sprunglink, sonst Logo – ohne sichtbaren Rahmen beim Tippen).
  // Handy (Audit 09.11.2026, N1): Dort liegt der Knopf über dem Fließtext direkt oberhalb der Kontaktleiste. Deshalb erscheint er am Handy
  //    nur, während man nach oben scrollt (wer zurück will, scrollt meist erst ein Stück hoch), und verschwindet beim Weiterlesen nach unten
  //    bzw. 2,5 s nach dem letzten Scrollen – beim Lesen verdeckt er so keinen Text. Breit (ab 66rem, Knopf im Seitenrand) unverändert.
  var hoch = document.querySelector("[data-hoch]"), hochAn = false, schmalHoch = window.matchMedia("(max-width: 65.99rem)"), yAlt = -1, hochRuhe = 0, hochWeg = 0, hochN = 0;
  var hochZeigen = function (z) { if (z !== hochAn) { hochAn = z; hoch.classList.toggle("zeigen", z); } };
  if (hoch) hoch.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: ruhig ? "auto" : "smooth" });
    var ziel = e.detail === 0 ? document.querySelector(".skip") : document.querySelector(".kopf .marke");
    if (ziel) try { ziel.focus({ preventScroll: true }); } catch (x) { ziel.focus(); }
  });

  var pruefen = function () {
    geplant = false;
    var y = window.scrollY, vh = window.innerHeight;
    var jetzt = y > 8;
    if (kopf && jetzt !== an) { an = jetzt; kopf.classList.toggle("gescrollt", an); }
    if (hoch) {
      if (!schmalHoch.matches) hochZeigen(y > vh * 1.5);
      else if (y <= vh * 1.5) { hochZeigen(false); hochWeg = 0; }
      else if (yAlt >= 0 && y !== yAlt) {
        // Richtung über eine Strecke sammeln: kleine Sprünge (z. B. Scroll-Verankerung beim Nachrendern) schalten nicht um
        //   und erst nach mehreren Scroll-Schritten nach oben (die Verankerung springt in einem Schritt, ein Finger scrollt in vielen)
        var d = y - yAlt, gleich = (hochWeg < 0) === (d < 0);
        hochWeg = gleich ? hochWeg + d : d; hochN = gleich ? hochN + 1 : 1;
        if (hochWeg < -40 && hochN >= 3) {
          hochZeigen(true); clearTimeout(hochRuhe);
          hochRuhe = setTimeout(function () { if (document.activeElement !== hoch) hochZeigen(false); }, 2500);
        } else if (hochWeg > 120 && document.activeElement !== hoch) hochZeigen(false);
      }
      yAlt = y;
    }
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

// 9) Aufklappmenü „Leistungen“ im Kopf
document.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll("[data-nav-gruppe]"), function (gruppe) {
    var knopf = gruppe.querySelector(".gruppe-knopf");
    if (!knopf) return;
    var links = function () { return [].slice.call(gruppe.querySelectorAll(".unter a")); };
    var zu, perMaus = false; // per Darüberfahren geöffnet: der folgende Klick soll es nicht gleich wieder schließen
    var setzen = function (offen) {
      clearTimeout(zu);
      knopf.setAttribute("aria-expanded", String(offen));
      if (offen) gruppe.setAttribute("data-offen", ""); else gruppe.removeAttribute("data-offen");
    };
    knopf.addEventListener("click", function () { if (perMaus) { perMaus = false; setzen(true); } else setzen(knopf.getAttribute("aria-expanded") !== "true"); });
    knopf.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setzen(true); var l = links(); if (l[0]) l[0].focus(); }
    });
    gruppe.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && gruppe.hasAttribute("data-offen")) { e.preventDefault(); setzen(false); knopf.focus(); return; }
      var l = links(), i = l.indexOf(e.target); // nur Tasten auf den Links selbst (nicht auf dem Knopf)
      if (i >= 0 && (e.key === "ArrowDown" || e.key === "ArrowUp")) { e.preventDefault(); l[(i + (e.key === "ArrowDown" ? 1 : l.length - 1)) % l.length].focus(); }
    });
    gruppe.addEventListener("focusout", function (e) { if (!gruppe.contains(e.relatedTarget)) setzen(false); });
    gruppe.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse" && !gruppe.hasAttribute("data-offen")) { perMaus = true; setzen(true); } else clearTimeout(zu); });
    gruppe.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") { clearTimeout(zu); zu = setTimeout(function () { perMaus = false; setzen(false); }, 180); } });
    document.addEventListener("click", function (e) { if (!gruppe.contains(e.target)) setzen(false); });
  });
});
