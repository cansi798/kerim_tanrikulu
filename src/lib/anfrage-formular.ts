// Logik des mehrstufigen Anfrageformulars (aus Anfrage.astro ausgelagert, 09.11.2026, Jamil Talk xidc8qvq #5312): wird erst geladen,
// wenn das Formular in die Nähe des Bildschirms kommt (dynamischer Import, eigene JS-Datei) – so bremst es die Startseite nicht.
import { finden, thema as themaVon, suchen, richtwert, spanne, datumDe, MINDESTPREIS, STUNDENSATZ_DOLMETSCHEN, ANFAHRT_PAUSCHAL, ANFAHRT_PAUSCHAL_SCHULE_GERICHT, betrag, type Eintrag } from "./anfrage";
import { FT, themaTitel, dokName, type FormLang } from "./anfrage-texte";

const ENDPOINT: string = import.meta.env.PUBLIC_FORM_ENDPOINT || "";

export function starten(form: HTMLFormElement) {
  const $ = <T extends Element = HTMLElement>(s: string, w: ParentNode = form) => w.querySelector<T>(s)!;
  const schritte = new Map([...form.querySelectorAll<HTMLFieldSetElement>("[data-schritt]")].map((el) => [el.dataset.schritt!, el]));
  const feld = (name: string) => form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
  const wert = (name: string) => ((feld(name) as HTMLInputElement | RadioNodeList | null)?.value ?? "").trim();
  const MAIL = form.dataset.mail!;
  const WA = form.dataset.wa!;
  const lang: FormLang = form.dataset.lang === "tr" ? "tr" : "de";
  const F = FT[lang];
  const name = (e: Eintrag) => dokName(e.dok, lang);

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
    const wahl = F.fWahl;
    switch (id) {
      case "leistung": case "richtung": case "art": case "dauer":
        return wert(id) ? null : { el: erstesRadio(id), text: wahl };
      case "thema":
        return wert("thema") || ohneThema ? null : { el: erstesRadio("thema"), text: wahl };
      case "dokument":
        if (!dokId) return { el: (form.querySelector<HTMLInputElement>('.dokliste input') ?? $<HTMLInputElement>('input[value="anderes"]')), text: F.fDok };
        if (dokId === "anderes" && !wert("anderes")) return { el: $("#dok-anderes"), text: F.fAnderes };
        return null;
      case "umfang": {
        if (!seitenZaehlen()) return null;
        const n = Number(wert("seiten"));
        return Number.isInteger(n) && n >= 1 && n <= 500 ? null : { el: $("#seiten"), text: F.fSeiten };
      }
      case "ort":
        return wert("ort") ? null : { el: $("#d-ort"), text: F.fOrt };
      case "kontakt":
        if (!wert("name")) return { el: $("#k-name"), text: F.fName };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert("email"))) return { el: $("#k-mail"), text: F.fMail };
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
    $("[data-ansage]").textContent = F.ansage(nr, weg.length, h.textContent ?? "");
    if (fokus) h.focus();
  }

  function vorbereiten(id: string) {
    if (id === "dokument") liste();
    if (id === "umfang") {
      const mit = seitenZaehlen();
      $("[data-seiten-feld]").hidden = !mit;
      $("[data-umfang-titel]").textContent = mit ? F.umfangFrage : F.umfangFrageOhne;
    }
    // Preis vor den Kontaktdaten (Jamil Talk xidc8qvq #5548/#5550, 12.11.2026)
    if (id === "umfang" || id === "dauer") preisZeigen(id);
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
    z.textContent = e ? F.auswahl(name(e)) : "";
  }

  function liste() {
    const ul = $("[data-dokliste]");
    const q = suche.value.trim();
    const t = themaVon(wert("thema"));
    let eintraege: Eintrag[];
    if (q) {
      eintraege = suchen(q);
      $("[data-treffer]").textContent = F.treffer(eintraege.length);
      $("[data-listenkopf]").textContent = eintraege.length ? F.trefferKopf : "";
    } else {
      eintraege = t ? t.dokumente.map((dok) => ({ dok, thema: t })) : [];
      $("[data-treffer]").textContent = "";
      $("[data-listenkopf]").textContent = t ? F.themaKopf(t.dokumente.length, themaTitel(t, lang)) : F.ohneThemaKopf;
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
      titel.textContent = dokName(dok, lang);
      text.append(titel);
      if (q) {
        const unter = document.createElement("span");
        unter.className = "unter";
        unter.textContent = themaTitel(thema, lang);
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
      li.textContent = F.leer;
      kinder.push(li);
    }
    ul.replaceChildren(...kinder);
    $<HTMLInputElement>('input[value="anderes"]').checked = dokId === "anderes";
    $("[data-anderes-feld]").hidden = dokId !== "anderes";
    auswahlZeile();
  }

  // Seitenzahl − / + (der Richtwert darunter rechnet sofort mit, aria-live meldet den neuen Betrag)
  const seitenFeld = $<HTMLInputElement>("#seiten");
  const neuRechnen = () => { if (aktuell === "umfang") preisZeigen("umfang"); };
  $("[data-minus]").addEventListener("click", () => { seitenFeld.value = String(Math.max(1, seiten() - 1)); neuRechnen(); });
  $("[data-plus]").addEventListener("click", () => { seitenFeld.value = String(Math.min(500, seiten() + 1)); neuRechnen(); });
  seitenFeld.addEventListener("input", neuRechnen);

  // ---------- Zusammenfassung, Text, Versand ----------
  const RICHTUNG: Record<string, string> = { "tr-de": F.trde.sicht, "de-tr": F.detr.sicht };
  const ART = F.art;

  function zeilen(): [string, string, string][] {
    const z: [string, string, string][] = [];
    if (wert("leistung") === "dolmetschen") {
      z.push([F.zLeistung, F.dolmetschen, "leistung"]);
      const termin = wert("datum") ? datumDe(wert("datum")) + (wert("uhrzeit") ? F.uhr(wert("uhrzeit")) : "") : F.terminOffen;
      z.push([F.zTermin, termin, "termin"]);
      z.push([F.zArt, ART[wert("art")] ?? "", "art"]);
      if (wert("art") === "vor-ort") z.push([F.zOrt, wert("ort"), "ort"]);
      z.push([F.zDauer, wert("dauer"), "dauer"]);
    } else {
      z.push([F.zLeistung, F.uebersetzung, "leistung"]);
      z.push([F.zRichtung, RICHTUNG[wert("richtung")] ?? "", "richtung"]);
      const e = gewaehlt();
      const t = e?.thema ?? themaVon(wert("thema"));
      if (t) z.push([F.zThema, themaTitel(t, lang), "thema"]);
      z.push([F.zDokument, e ? name(e) : F.zAnderes(wert("anderes")), "dokument"]);
      if (seitenZaehlen()) z.push([F.zSeiten, String(seiten()), "umfang"]);
      z.push([F.zWunsch, wert("wunsch") ? datumDe(wert("wunsch")) : F.keinWunsch, "umfang"]);
    }
    z.push([F.name, wert("name"), "kontakt"]);
    z.push([F.email, wert("email"), "kontakt"]);
    if (wert("tel")) z.push([F.telefon, wert("tel"), "kontakt"]);
    return z;
  }

  function preis() {
    // Dolmetschen: fester Stundensatz 93 € (Jamil Talk xidc8qvq #5548/#5550, ohne MwSt.-Angabe seit #5556, 12.11.2026), im selben Kasten wie der Richtwert
    // Anfahrt pauschal nur „Vor Ort“ (Jamil #5559/#5561); Video/Telefon: gleicher Satz, keine Anfahrt
    if (wert("leistung") === "dolmetschen")
      return { titel: F.honorarTitel, wert: F.honorarWert(STUNDENSATZ_DOLMETSCHEN), hinweis: F.honorarHinweis, ohne: "",
        anfahrt: wert("art") === "vor-ort" ? F.anfahrt(betrag(ANFAHRT_PAUSCHAL), betrag(ANFAHRT_PAUSCHAL_SCHULE_GERICHT)) : "" };
    const e = gewaehlt();
    if (!e) return { titel: "", wert: "", hinweis: "", ohne: F.ohnePreis, anfahrt: "" };
    const n = seiten();
    const basis = e.dok.einheit === "seite" ? F.basisSeite(n, MINDESTPREIS) : F.basisDok(MINDESTPREIS);
    return { titel: F.richtwertTitel, wert: spanne(richtwert(e.dok, n), F.ca2), hinweis: `${basis} ${F.verbindlich}`, ohne: "", anfahrt: "" };
  }

  // Preiskasten eines Schritts füllen (umfang, dauer, zusammenfassung). Text nur bei Änderung setzen, damit aria-live nicht doppelt meldet.
  const setzen = (el: HTMLElement | null, t: string) => { if (el && el.textContent !== t) el.textContent = t; };
  function preisZeigen(id: string) {
    const box = schritte.get(id)?.querySelector<HTMLElement>("[data-preisbox]");
    if (!box) return;
    const pr = preis();
    const q = (s: string) => box.querySelector<HTMLElement>(s);
    q("[data-preis]")!.hidden = !pr.wert;
    setzen(q("[data-preis-titel]"), pr.titel);
    setzen(q("[data-preis-wert]"), pr.wert);
    setzen(q("[data-preis-hinweis]"), pr.hinweis);
    const anf = q("[data-preis-anfahrt]");
    if (anf) { anf.hidden = !pr.anfahrt; setzen(anf, pr.anfahrt); }
    const ohne = q("[data-ohne-preis]");
    if (ohne) { ohne.hidden = !pr.ohne; setzen(ohne, pr.ohne); }
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
      b.textContent = F.aendern;
      const sr = document.createElement("span");
      sr.className = "sr";
      b.append(sr);
      b.querySelector(".sr")!.textContent = `: ${k}`;
      dd.append(span, b);
      div.append(dt, dd);
      return div;
    });
    if (wert("nachricht")) {
      const div = document.createElement("div");
      div.className = "lang";
      const dt = document.createElement("dt");
      dt.textContent = F.nachricht;
      const dd = document.createElement("dd");
      const span = document.createElement("span");
      span.textContent = wert("nachricht");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "textknopf aendern";
      b.dataset.gehe = "kontakt";
      b.textContent = F.aendern;
      const sr = document.createElement("span");
      sr.className = "sr";
      sr.textContent = `: ${F.nachricht}`;
      b.append(sr);
      dd.append(span, b);
      div.append(dt, dd);
      reihen.push(div);
    }
    dl.replaceChildren(...reihen);

    preisZeigen("zusammenfassung");
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
    const betreff = dolm ? F.betreffDo(wert("datum") ? datumDe(wert("datum")) : "") : F.betreffUe(e ? name(e) : wert("anderes"));
    const pr = preis();
    const bau = (notiz: string) => {
      const t = [F.anrede, "", F.einleitung, ""];
      zeilen().forEach(([k, v]) => t.push(`${k}: ${v}`));
      if (notiz) t.push("", `${F.nachricht}: ${notiz}`);
      if (dolm) { t.push("", F.mHonorar(pr.wert)); if (pr.anfahrt) t.push(pr.anfahrt); }
      else if (pr.wert) t.push("", F.mRichtwert(pr.wert));
      else t.push("", F.mOhnePreis);
      if (!dolm) t.push("", F.mFoto);
      t.push("", F.gruss, wert("name"));
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
          gesendet.textContent = F.angekommen;
        })
        .catch(() => { location.href = a.href; });
      return;
    }
    gesendet.textContent = F.gesendetMail(MAIL);
  });
  $<HTMLAnchorElement>("[data-senden-wa]").addEventListener("click", () => {
    gesendet.textContent = F.gesendetWa;
  });

  zeigen("leistung", false);
}
