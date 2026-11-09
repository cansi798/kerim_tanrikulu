// Weiterleitung früherer Adressen (09.11.2026): Ziel aus data-ziel; ein Sprungziel im alten Link (#apostille …) wird übernommen.
(function () {
  var s = document.currentScript, z = s && s.getAttribute("data-ziel");
  if (!z) return;
  location.replace(location.hash && location.hash.length > 1 ? z.split("#")[0] + location.hash : z);
})();
