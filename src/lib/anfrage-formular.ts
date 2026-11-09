// Logik des mehrstufigen Anfrageformulars (aus Anfrage.astro ausgelagert, 09.11.2026, Jamil Talk xidc8qvq #5312): wird erst geladen,
// wenn das Formular in die Nähe des Bildschirms kommt (dynamischer Import, eigene JS-Datei) – so bremst es die Startseite nicht.
import { finden, thema as themaVon, suchen, richtwert, spanne, datumDe, MINDESTPREIS, type Eintrag } from "./anfrage";

const ENDPOINT: string = import.meta.env.PUBLIC_FORM_ENDPOINT || "";

export function starten(form: HTMLFormElement) {
  const $ = <T extends Element = HTMLElement>(s: string, w: ParentNode = form) => w.querySelector<T>(s)!;
  const schritte = new Map([...form.querySelectorAll<HTMLFieldSetElement>("[data-schritt]")].map((el) => [el.dataset.schritt!, el]));
  const feld = (name: string) => form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
  const wert = (name: string) => ((feld(name) as HTMLInputElement | RadioNodeList | null)?.value ?? "").trim();
  const MAIL = form.dataset.mail!;
  const WA = form.dataset.wa!;

  let aktuell = "leistung";
  let vonUebersicht = false;
  let ohneThema = false;
  let dokId = "";
  let zeigerZeit = 0;

  // Datumsfelder: frühestens heute
  const heute = new Date();
  const iso = `${heute.getFullYear()}-${String(heute.getMonth() + 1).padStart(2, "0")}-${String(heute.getDate()).padStart(2, "0")}`;
  form.querySelectorAll<HTMLInputElement>("[data-ab-heute]").forEach((i) => (i.min = iso));

  const pfad = () =>
    wert("leistung") === "dolmetschen"
      ? ["leistung", "termin", "art", ...(wert("art") === "vor-ort" ? ["ort"] : []), "dauer", "kontakt", "zusammenfassung"]
      : ["leistung", "richtung", "thema", "dokument", "umfang", "kontakt", "zusammenfassung"];

  const gewaehlt = (): Eintrag | undefined => (dokId && dokId !== "anderes" ? finden(dokId) : undefined);
  const seitenZaehlen = () => !!gewaehlt() && gewaehlt()!.dok.einheit === "seite";
  const seiten = () => Math.max(1, Math.min(500, Math.round(Number(wert("seiten"))) || 1));

  // ---------- Prüfen ----------
  type Fehler = { el: HTMLElement; text: string } | null;
  const erstesRadio = (name: string) => form.querySelector<HTMLInputElement>(`[data-schritt] input[name="${name}"]`)!;
  function pruefen(id: string): Fehler {
    const wahl = "Bitte wählen Sie eine Möglichkeit.";
    switch (id) {
      case "leistung": case "richtung": case "art": case "dauer":
        return wert(id) ? null : { el: erstesRadio(id), text: wahl };
      case "thema":
        return wert("thema") || ohneThema ? null : { el: erstesRadio("thema"), text: wahl };
      case "dokument":
        if (!dokId) return { el: (form.querySelector<HTMLInputElement>('.dokliste input') ?? $<HTMLInputElement>('input[value="anderes"]')), text: "Bitte wählen Sie ein Dokument oder „Anderes Dokument“." };
        if (dokId === "anderes" && !wert("anderes")) return { el: $("#dok-anderes"), text: "Bitte schreiben Sie kurz, um welches Dokument es geht." };
        return null;
      case "umfang": {
        if (!seitenZaehlen()) return null;
        const n = Number(wert("seiten"));
        return Number.isInteger(n) && n >= 1 && n <= 500 ? null : { el: $("#seiten"), text: "Bitte geben Sie eine Seitenzahl zwischen 1 und 500 an." };
      }
      case "ort":
        return wert("ort") ? null : { el: $("#d-ort"), text: "Bitte geben Sie den Ort des Termins an." };
      case "kontakt":
        if (!wert("name")) return { el: $("#k-name"), text: "Bitte geben Sie Ihren Namen an." };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert("email"))) return { el: $("#k-mail"), text: "Bitte geben Sie eine gültige E-Mail-Adresse an, damit Herr Tanrikulu Ihnen antworten kann." };
        return null;
      default:
        return null;
    }
  }
  function fehlerZeigen(id: string, f: NonNullable<Fehler>) {
    const p = $<HTMLParagraphElement>("[data-fehler]", schritte.get(id)!);
    p.id = `fehler-${id}`;
    p.hidden = false;
    p.textContent = f.text;
    p.setAttribute("role", "alert");
    f.el.setAttribute("aria-invalid", "true");
    f.el.setAttribute("aria-describedby", [f.el.getAttribute("aria-describedby"), p.id].filter((x) => x && !x.includes(p.id)).concat(p.id).join(" "));
    f.el.focus();
  }
  function fehlerWeg(id: string) {
    const s = schritte.get(id)!;
    const p = $<HTMLParagraphElement>("[data-fehler]", s);
    p.hidden = true;
    p.textContent = "";
    s.querySelectorAll("[aria-invalid]").forEach((el) => {
      el.removeAttribute("aria-invalid");
      const rest = (el.getAttribute("aria-describedby") || "").split(" ").filter((x) => x && x !== `fehler-${id}`);
      rest.length ? el.setAttribute("aria-describedby", rest.join(" ")) : el.removeAttribute("aria-describedby");
    });
  }

  // ---------- Anzeigen ----------
  function zeigen(id: string, fokus = true) {
    vorbereiten(id);
    schritte.forEach((el, k) => (el.hidden = k !== id));
    aktuell = id;
    const weg = pfad();
    const nr = weg.indexOf(id) + 1;
    $("[data-nr]").textContent = String(nr);
    $("[data-von]").textContent = String(weg.length);
    $("[data-balken]").style.transform = `scaleX(${nr / weg.length})`;
    $<HTMLButtonElement>("[data-zurueck]").hidden = nr <= 1;
    $<HTMLButtonElement>("[data-weiter]").hidden = id === "zusammenfassung";
    const h = $<HTMLHeadingElement>("h3", schritte.get(id)!);
    $("[data-ansage]").textContent = `Schritt ${nr} von ${weg.length}: ${h.textContent}`;
    if (fokus) h.focus();
  }

  function vorbereiten(id: string) {
    if (id === "dokument") liste();
    if (id === "umfang") {
      const mit = seitenZaehlen();
      $("[data-seiten-feld]").hidden = !mit;
      $("[data-umfang-titel]").textContent = mit ? "Wie viele Seiten, und bis wann?" : "Bis wann brauchen Sie die Übersetzung?";
    }
    if (id === "zusammenfassung") uebersicht();
  }

  function weiter() {
    const f = pruefen(aktuell);
    if (f) return fehlerZeigen(aktuell, f);
    fehlerWeg(aktuell);
    const weg = pfad();
    if (vonUebersicht && weg.every((s) => s === "zusammenfassung" || !pruefen(s))) return zeigen("zusammenfassung");
    zeigen(weg[Math.min(weg.indexOf(aktuell) + 1, weg.length - 1)]);
  }
  function zurueck() {
    const weg = pfad();
    const i = weg.indexOf(aktuell);
    if (i > 0) zeigen(weg[i - 1]);
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); weiter(); });
  $("[data-zurueck]").addEventListener("click", zurueck);
  // Nur eine Auswahl, die direkt mit Maus/Finger auf genau diese Karte getroffen wurde, springt automatisch weiter
  let zeigerZiel: Element | null = null;
  form.addEventListener("pointerdown", (e) => { zeigerZeit = Date.now(); zeigerZiel = (e.target as Element).closest("label"); });

  // Auswahl: mit Maus/Finger geht es nach kurzer Pause automatisch weiter; mit Tastatur bewusst über „Weiter“
  const AUTO = new Set(["leistung", "richtung", "thema", "art", "dauer", "dokument"]);
  form.addEventListener("change", (e) => {
    const el = e.target as HTMLInputElement;
    if (el.type !== "radio") return;
    fehlerWeg(aktuell);
    if (el.name === "thema") { ohneThema = false; const e2 = gewaehlt(); if (e2 && e2.thema.id !== el.value) dokId = ""; }
    if (el.name === "dokument") {
      dokId = el.value;
      const anders = dokId === "anderes";
      $("[data-anderes-feld]").hidden = !anders;
      auswahlZeile();
      if (anders) { $<HTMLInputElement>("#dok-anderes").focus(); return; }
    }
    if (el.name === "leistung") vonUebersicht = false;
    if (AUTO.has(el.name) && zeigerZiel?.contains(el) && Date.now() - zeigerZeit < 1000) {
      zeigerZiel = null;
      const hier = aktuell;
      setTimeout(() => { if (aktuell === hier) weiter(); }, 220);
    }
  });

  $("[data-ohne-thema]").addEventListener("click", () => {
    form.querySelectorAll<HTMLInputElement>('input[name="thema"]').forEach((i) => (i.checked = false));
    ohneThema = true;
    fehlerWeg("thema");
    zeigen("dokument");
  });

  // ---------- Dokumentliste + Suche (ohne Preise) ----------
  const suche = $<HTMLInputElement>("[data-suche]");
  suche.addEventListener("input", () => liste());
  suche.addEventListener("keydown", (e) => { if (e.key === "Enter") e.preventDefault(); });

  function auswahlZeile() {
    const z = $("[data-auswahl]");
    const e = gewaehlt();
    z.hidden = !e;
    z.textContent = e ? `Ihre Auswahl: ${e.dok.name}` : "";
  }

  function liste() {
    const ul = $("[data-dokliste]");
    const q = suche.value.trim();
    const t = themaVon(wert("thema"));
    let eintraege: Eintrag[];
    if (q) {
      eintraege = suchen(q);
      $("[data-treffer]").textContent = eintraege.length ? `${eintraege.length} ${eintraege.length === 1 ? "Dokument" : "Dokumente"} gefunden` : "Kein Dokument gefunden";
      $("[data-listenkopf]").textContent = eintraege.length ? "Treffer aus allen Themen" : "";
    } else {
      eintraege = t ? t.dokumente.map((dok) => ({ dok, thema: t })) : [];
      $("[data-treffer]").textContent = "";
      $("[data-listenkopf]").textContent = t
        ? `${t.dokumente.length} Dokumente im Thema „${t.titel}“, von A bis Z. Schneller geht es mit der Suche oben. Nicht dabei? Ganz unten „Anderes Dokument“ wählen.`
        : "Geben Sie oben ein, wie Ihr Dokument heißt – oder wählen Sie „Anderes Dokument“.";
    }
    const kinder = eintraege.map(({ dok, thema }) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      label.className = "wahl zeile";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "dokument";
      input.value = dok.id;
      input.checked = dok.id === dokId;
      const innen = document.createElement("span");
      innen.className = "innen";
      const text = document.createElement("span");
      text.className = "text";
      const titel = document.createElement("span");
      titel.className = "titel";
      titel.textContent = dok.name;
      text.append(titel);
      if (q) {
        const unter = document.createElement("span");
        unter.className = "unter";
        unter.textContent = thema.titel;
        text.append(unter);
      }
      const punkt = document.createElement("span");
      punkt.className = "punkt";
      punkt.setAttribute("aria-hidden", "true");
      innen.append(text, punkt);
      label.append(input, innen);
      li.append(label);
      return li;
    });
    if (q && !eintraege.length) {
      const li = document.createElement("li");
      li.className = "leer";
      li.textContent = "Kein passendes Dokument gefunden. Wählen Sie unten „Anderes Dokument“ und schreiben Sie, worum es geht.";
      kinder.push(li);
    }
    ul.replaceChildren(...kinder);
    $<HTMLInputElement>('input[value="anderes"]').checked = dokId === "anderes";
    $("[data-anderes-feld]").hidden = dokId !== "anderes";
    auswahlZeile();
  }

  // Seitenzahl − / +
  const seitenFeld = $<HTMLInputElement>("#seiten");
  $("[data-minus]").addEventListener("click", () => { seitenFeld.value = String(Math.max(1, seiten() - 1)); });
  $("[data-plus]").addEventListener("click", () => { seitenFeld.value = String(Math.min(500, seiten() + 1)); });

  // ---------- Zusammenfassung, Text, Versand ----------
  const RICHTUNG: Record<string, string> = { "tr-de": "Türkisch → Deutsch", "de-tr": "Deutsch → Türkisch" };
  const ART: Record<string, string> = { "vor-ort": "Vor Ort", video: "Per Video", telefon: "Per Telefon" };

  function zeilen(): [string, string, string][] {
    const z: [string, string, string][] = [];
    if (wert("leistung") === "dolmetschen") {
      z.push(["Leistung", "Dolmetschen", "leistung"]);
      const termin = wert("datum") ? datumDe(wert("datum")) + (wert("uhrzeit") ? `, ${wert("uhrzeit")} Uhr` : "") : "noch offen";
      z.push(["Termin", termin, "termin"]);
      z.push(["Art", ART[wert("art")] ?? "", "art"]);
      if (wert("art") === "vor-ort") z.push(["Ort", wert("ort"), "ort"]);
      z.push(["Dauer ca.", wert("dauer"), "dauer"]);
    } else {
      z.push(["Leistung", "Übersetzung", "leistung"]);
      z.push(["Sprachrichtung", RICHTUNG[wert("richtung")] ?? "", "richtung"]);
      const e = gewaehlt();
      const t = e?.thema ?? themaVon(wert("thema"));
      if (t) z.push(["Thema", t.titel, "thema"]);
      z.push(["Dokument", e ? e.dok.name : `Anderes Dokument: ${wert("anderes")}`, "dokument"]);
      if (seitenZaehlen()) z.push(["Seiten ca.", String(seiten()), "umfang"]);
      z.push(["Wunschtermin", wert("wunsch") ? datumDe(wert("wunsch")) : "keiner angegeben", "umfang"]);
    }
    z.push(["Name", wert("name"), "kontakt"]);
    z.push(["E-Mail", wert("email"), "kontakt"]);
    if (wert("tel")) z.push(["Telefon", wert("tel"), "kontakt"]);
    return z;
  }

  function preis() {
    // Dolmetschen: bewusst kein Richtwert – der Hinweis steht aber genauso deutlich im Kasten wie sonst der Preis (Jamil #5237)
    if (wert("leistung") === "dolmetschen") return { titel: "Honorar:", wert: "nach individueller Absprache", hinweis: "Herr Tanrikulu nennt Ihnen das Honorar nach Ihrer Anfrage – je nach Termin, Art und Dauer.", ohne: "" };
    const e = gewaehlt();
    if (!e) return { titel: "", wert: "", hinweis: "", ohne: "Preis nach Sichtung des Dokuments." };
    const n = seiten();
    const basis = e.dok.einheit === "seite"
      ? `Berechnet für ca. ${n} ${n === 1 ? "Seite" : "Seiten"}, pro Seite der fertigen Übersetzung, Mindestpreis ${MINDESTPREIS} €.`
      : `Pro Dokument, Mindestpreis ${MINDESTPREIS} €.`;
    return { titel: "Unverbindlicher Richtwert:", wert: spanne(richtwert(e.dok, n)), hinweis: `${basis} Verbindlich ist erst der Kostenvoranschlag nach Sichtung des Dokuments.`, ohne: "" };
  }

  function uebersicht() {
    const dl = $("[data-uebersicht]");
    const reihen = zeilen().map(([k, v, schritt]) => {
      const div = document.createElement("div");
      const dt = document.createElement("dt");
      dt.textContent = k;
      const dd = document.createElement("dd");
      const span = document.createElement("span");
      span.textContent = v;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "textknopf aendern";
      b.dataset.gehe = schritt;
      b.innerHTML = 'Ändern<span class="sr"></span>';
      b.querySelector(".sr")!.textContent = `: ${k}`;
      dd.append(span, b);
      div.append(dt, dd);
      return div;
    });
    if (wert("nachricht")) {
      const div = document.createElement("div");
      div.className = "lang";
      const dt = document.createElement("dt");
      dt.textContent = "Nachricht";
      const dd = document.createElement("dd");
      const span = document.createElement("span");
      span.textContent = wert("nachricht");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "textknopf aendern";
      b.dataset.gehe = "kontakt";
      b.innerHTML = 'Ändern<span class="sr">: Nachricht</span>';
      dd.append(span, b);
      div.append(dt, dd);
      reihen.push(div);
    }
    dl.replaceChildren(...reihen);

    const pr = preis();
    $("[data-preis]").hidden = !pr.wert;
    $("[data-preis-titel]").textContent = pr.titel;
    $("[data-preis-wert]").textContent = pr.wert;
    $("[data-preis-hinweis]").textContent = pr.hinweis;
    $("[data-ohne-preis]").hidden = !pr.ohne;
    $("[data-ohne-preis]").textContent = pr.ohne;
    $("[data-foto]").hidden = wert("leistung") === "dolmetschen";
    $("[data-gesendet]").textContent = "";

    const { betreff, text } = nachricht();
    const enc = encodeURIComponent;
    $<HTMLAnchorElement>("[data-senden-mail]").href = `mailto:${MAIL}?subject=${enc(betreff)}&body=${enc(text.replace(/\n/g, "\r\n"))}`;
    $<HTMLAnchorElement>("[data-senden-wa]").href = `${WA}?text=${enc(`${betreff}\n\n${text}`)}`;
  }

  function nachricht() {
    const dolm = wert("leistung") === "dolmetschen";
    const e = gewaehlt();
    const betreff = dolm
      ? `Anfrage Dolmetschen – ${wert("datum") ? datumDe(wert("datum")) : "Termin offen"}`
      : `Anfrage Übersetzung – ${e ? e.dok.name : wert("anderes") || "Anderes Dokument"}`;
    const pr = preis();
    const bau = (notiz: string) => {
      const t = ["Guten Tag Herr Tanrikulu,", "", "ich möchte folgende Anfrage stellen:", ""];
      zeilen().forEach(([k, v]) => t.push(`${k}: ${v}`));
      if (notiz) t.push("", `Nachricht: ${notiz}`);
      if (pr.wert && !dolm) t.push("", `Unverbindlicher Richtwert laut Website: ${pr.wert}`);
      else if (!dolm) t.push("", "Preis: nach Sichtung des Dokuments");
      if (!dolm) t.push("", "Ein Foto oder Scan des Dokuments schicke ich nach Ihrer Rückmeldung.");
      t.push("", "Viele Grüße", wert("name"));
      return t.join("\n");
    };
    // WhatsApp-/mailto-Links kurz halten (unter ca. 1800 Zeichen): notfalls nur die freie Nachricht kürzen
    let notiz = wert("nachricht");
    let text = bau(notiz);
    while (text.length + betreff.length > 1800 && notiz.length > 0) {
      notiz = notiz.slice(0, Math.max(0, notiz.length - (text.length + betreff.length - 1800) - 2)).trimEnd() + "…";
      if (notiz === "…") notiz = "";
      text = bau(notiz);
    }
    return { betreff, text };
  }

  form.addEventListener("click", (ev) => {
    const b = (ev.target as HTMLElement).closest<HTMLButtonElement>("[data-gehe]");
    if (b) { vonUebersicht = true; zeigen(b.dataset.gehe!); }
  });

  const gesendet = $("[data-gesendet]");
  $<HTMLAnchorElement>("[data-senden-mail]").addEventListener("click", (ev) => {
    const a = ev.currentTarget as HTMLAnchorElement;
    if (ENDPOINT) {
      ev.preventDefault();
      const { betreff, text } = nachricht();
      fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ betreff, text, email: wert("email"), name: wert("name") }) })
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          gesendet.textContent = "Vielen Dank, Ihre Anfrage ist angekommen. Herr Tanrikulu meldet sich bei Ihnen.";
        })
        .catch(() => { location.href = a.href; });
      return;
    }
    gesendet.textContent = `Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage. Falls nicht, schreiben Sie bitte direkt an ${MAIL} oder nutzen Sie WhatsApp.`;
  });
  $<HTMLAnchorElement>("[data-senden-wa]").addEventListener("click", () => {
    gesendet.textContent = "WhatsApp öffnet sich mit der fertigen Anfrage. Tippen Sie dort auf „Senden“.";
  });

  zeigen("leistung", false);
}
