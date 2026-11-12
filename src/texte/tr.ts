// Türkische Fassung (Siz-Form). ENTWURF: Herr Tanrikulu ist selbst Übersetzer und muss jede Zeile prüfen
// (Hinweis auf allen türkischen Seiten, Schalter TR_GEPRUEFT in i18n.ts, OFFENE-INFOS).
// Gleiche Form wie de.ts. Fachbegriffe: allgemein beeidigter Dolmetscher = genel yeminli tercüman (sözlü),
// ermächtigter Übersetzer = yetkili mütercim (yazılı), beglaubigte Übersetzung = onaylı (yeminli) çeviri, Apostille = Apostil.
import { NAME, MAIL, TELEFON, TITEL_NAME } from "../daten";
import type { Texte } from "./de";

// Ücret: Kerim'in kendi ifadesi (Talk 3990), „JVEG'e göre ücret“ yerine.
const HONORAR_TITEL = "Bireysel anlaşmaya göre ücret";
const HONORAR =
  "Ücret, işin türüne, kapsamına ve zorluk derecesine göre belirlenir. Mahkeme ve resmî makam işlerinde ücretlendirme, uygulanabildiği ölçüde JVEG'e (Almanya'da tercüman ücretlerini düzenleyen kanun) göre yapılır. Özel işler için önceden size özel bir fiyat teklifi alırsınız.";
const HONORAR_BEISPIEL = "Örneğin: Çok acil talepler veya tıbbi belgeler gibi uzmanlık gerektiren metinler daha yüksek ücretli olabilir.";

export const tr: Texte = {
  lang: "tr",
  ogLocale: "tr_TR",

  ui: {
    skip: "İçeriğe geç",
    vorschau: "Ön izleme. Bu sayfa henüz yayında değildir ve arama motorlarına kapalıdır. Kırmızı kesik çizgili alanlar yer tutucudur. Logo, mevcut logonun yeniden çizimidir.",
    vorschauKurz: "Ön izleme.",
    trEntwurf: "Türkische Fassung: Entwurf – bitte von Herrn Tanrikulu prüfen. (Türkçe metin taslaktır ve Sayın Tanrikulu tarafından kontrol edilecektir.)",
    zurStart: "Tanrikulu Translations, ana sayfaya",
    hauptnav: "Ana menü",
    hauptnavMobil: "Ana menü (mobil)",
    menue: "Menü",
    sprache: "Dil seçin",
    spracheName: { de: "Deutsch", tr: "Türkçe" },
    anfrage: "Talep gönderin",
    anfrageBetreff: "Talep: Çeviri veya sözlü tercüme",
    anfrageBetreffUe: "Talep: Çeviri",
    anfrageBetreffDo: "Talep: Sözlü tercüme",
    mailBetreff: "Web sitesi üzerinden talep",
    anrufen: "Arayın",
    mailSchreiben: "E-posta yazın",
    mailKurz: "E-posta",
    preisanfrage: "Fiyat talebi",
    preisanfrageLabel: "Fiyat talebi: talep formuna git",
    whatsapp: "WhatsApp",
    whatsappLang: "WhatsApp ile mesaj",
    whatsappLabel: "WhatsApp ile yazın (WhatsApp açılır)",
    nachOben: "Başa dön",
    telefonPruefen: "Numara müşteri tarafından onaylanmalı",
    telefonLuecke: "Numara onaylanmalı",
    platzhalter: "Yer tutucu:",
    mehrErfahren: "Daha fazla bilgi",
    aufEinenBlick: "Bir bakışta",
    kontakt: "İletişim",
    seiten: "Sayfalar",
    schnellkontakt: "Hızlı iletişim",
    telefon: "Telefon",
    email: "E-posta",
    standort: "Konum",
    rechtHinweis: "Genel bilgidir, hukuki danışmanlık değildir. Somut durumda neyin geçerli olduğuna, belgeyi teslim ettiğiniz makam karar verir.",
    kerimNennt: "Sayın Tanrikulu'nun belirttiği",
    portraitFolgt: "Kerim'in portresi eklenecek",
    portraitFormat: "Format 4 : 5, ör. 800 × 1000 px",
    portraitAlt: NAME,
    original: "Asıl belge",
    uebersetzung: "Çeviri",
    bildUe: "Asıl belge ve çevirisi yan yana iki sayfa olarak",
    bildDo: "Sözlü tercüme: Türkçeden tercüman aracılığıyla Almancaya",
    deutsch: "Almanca",
    tuerkisch: "Türkçe",
  },

  nav: {
    start: "Ana sayfa",
    uebersetzungen: "Çeviriler",
    dolmetschen: "Sözlü tercüme",
    leistungen: "Hizmetler",
    wissen: "Bilmeniz gerekenler",
    ueber: "Hakkımda",
    kontakt: "İletişim",
    impressum: "Künye",
    datenschutz: "Veri koruma",
  },

  meta: {
    titelStart: `Hamburg'da yeminli Türkçe tercüman ve mütercim | ${TITEL_NAME}`,
    beschreibung:
      "Türkçe–Almanca onaylı çeviri ve sözlü tercüme: Kerim Tanrikulu, Schleswig Eyalet Yüksek Mahkemesi'nden yeminli ve yetkili. Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen, Aşağı Saksonya.",
    uebersetzungen: { titel: "Hamburg'da Türkçe–Almanca onaylı çeviri", beschreibung: "Hamburg'da yetkili mütercim Kerim Mikael Tanrikulu'dan Türkçe ve Almanca onaylı çeviriler: kararlar, diplomalar, kimlikler, tıbbi belgeler, resmî belgeler. Önceden size özel fiyat teklifi." },
    dolmetschen: { titel: "Hamburg ve Kuzey Almanya'da Türkçe sözlü tercüman, görüntülü de", beschreibung: "Türkçe ve Almanca genel yeminli tercüman (Schleswig Eyalet Yüksek Mahkemesi, Mayıs 2021'den beri). Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen ve Aşağı Saksonya'da yerinde; ayrıca görüntülü ve telefonla sözlü tercüme." },
    wissen: { titel: "Bilmeniz gerekenler: rehber ve sık sorulan sorular", beschreibung: "Genel bilgiler ve cevaplar: onaylı çeviri, sözlü tercüman mı mütercim mi, asıl belge mi fotokopi mi, Almanya ile Türkiye arasında apostil, hangi belgeler çevrilir, ücret, talep." }, // TR von Kerim prüfen lassen
    ueber: { titel: "Hakkımda", beschreibung: "Kerim Mikael Tanrikulu, Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için genel yeminli tercüman ve yetkili mütercim; felsefe ve Germanistik alanında lisans (Bachelor of Arts)." },
    kontakt: { titel: "İletişim", beschreibung: "Hamburg'da Türkçe ve Almanca tercüman Kerim Mikael Tanrikulu ile iletişim: talep formu, telefon, WhatsApp ve e-posta." },
    impressum: { titel: "Künye", beschreibung: "Kerim Mikael Tanrikulu'nun web sitesinin künyesi (Impressum)." },
    datenschutz: { titel: "Veri koruma", beschreibung: "Kerim Mikael Tanrikulu'nun web sitesinin veri koruma beyanı." },
    nichtGefunden: { titel: "Sayfa bulunamadı", beschreibung: "Bu sayfa mevcut değil." },
  },

  fakten: {
    dolmetscher: "genel yeminli tercüman",
    uebersetzer: "yetkili mütercim",
    gericht: "Schleswig Eyalet Yüksek Mahkemesi",
    seit: "Mayıs 2021",
    sprachen: "Almanca ve Türkçe",
    ort: "Hamburg",
    claim: "Diller arasında köprü kurmak",
    rolle: "Almanca ve Türkçe için genel yeminli tercüman ve yetkili mütercim",
    vorstellung: "Ben Kerim Mikael Tanrikulu. Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi (Oberlandesgericht Schleswig) tarafından Türkçe ve Almanca için genel yeminli tercüman ve yetkili mütercimim.",
    studium: "Çeviriye olan ilgimi Türkiye'de bulunduğum bir öğrenim döneminde keşfettim. O zamandan beri başarılı bir görüşmeye ve karşılıklı anlaşmaya katkıda bulunabildiğimde büyük mutluluk duyuyorum.",
    freude: "Başarılı bir görüşmeye ve karşılıklı anlaşmaya katkıda bulunabildiğimde her zaman büyük mutluluk duyuyorum.",
    kulturen: "Çalışmamı kültürler arasında bir tür köprü kurma olarak görüyorum.",
    kulturenMarke: "kültürler arasında bir tür köprü kurma",
    erfahrungEinleitung: "Bugüne kadarki deneyimlerim arasında özellikle şu kurumlarla çalışmak yer alıyor:",
    erfahrungen: [
      "Schleswig-Holstein'daki yerel mahkemeler (Amtsgerichte)",
      "Hamburg'daki Türk Konsolosluğu",
      "Schleswig-Holstein Okullarda Kalite Geliştirme Enstitüsü (IQSH)",
      "Hamburg'daki okullar",
      "Federal Göç ve Mülteciler Dairesi (BAMF)",
      "Nüfus idaresi (Standesamt)",
      "Hastaneler",
      "Tutukevleri (Untersuchungshaftanstalten)",
    ],
    dokumenteSatz: "Sizin için her türlü belgeyi memnuniyetle çeviriyorum; örneğin mahkeme kararları (boşanma kararları dahil), diplomalar ve karneler, kimlik kartları, tıbbi belgeler ve resmî belgeler.",
    dokumente: [
      { icon: "urteil", text: "Mahkeme kararları, boşanma kararları dahil" },
      { icon: "zeugnis", text: "Diplomalar ve karneler" },
      { icon: "ausweis", text: "Kimlik kartları" },
      { icon: "medizin", text: "Tıbbi belgeler" },
      { icon: "urkunde", text: "Resmî belgeler" },
    ],
    honorarTitel: HONORAR_TITEL,
    honorar: HONORAR,
    honorarBeispiel: HONORAR_BEISPIEL,
    studienabschluss: "Felsefe ve Germanistik alanında lisans (Bachelor of Arts), 2021'de tamamlandı",
    fernDolmetschen: "Görüntülü ve telefonla sözlü tercüme",
    ermaechtigtSatz: "Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için yetkili mütercimim.",
    beeidigtSatz: "Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için genel yeminli tercümanım.",
    nachweise: [
      { titel: "Sözlü tercüman", wert: "genel yeminli" },
      { titel: "Yazılı tercüman (mütercim)", wert: "yetkili" },
      { titel: "Yemin ve yetki veren makam", wert: "Schleswig Eyalet Yüksek Mahkemesi" },
      { titel: "Başlangıç", wert: "Mayıs 2021" },
      { titel: "Öğrenim", wert: "Felsefe ve Germanistik lisansı (Bachelor of Arts, 2021)" },
      { titel: "Diller", wert: "Almanca ve Türkçe" },
      { titel: "Konum", wert: "Hamburg" },
    ],
  },

  hero: {
    badge: "Genel yeminli tercüman ve yetkili mütercim",
    // Jamil #5332 (09.11.2026) – TR von Kerim prüfen lassen (OFFENE-INFOS)
    h1: "Belgelerinizin resmî olarak tanınması mı gerekiyor?",
    sub: "Resmî daireler, mahkemeler, üniversiteler ve vatandaşlığa geçiş işlemleri için Türkçe ↔ Almanca onaylı çeviriler. Hızlı, özenli ve genellikle Almanya genelinde tanınır.",
    vertrauen: ["Sözlü tercüman", "Mütercim", "Almanca ve Türkçe"],
    karten: ["Onaylı çeviriler", "Sözlü tercüme", "Almanca ve Türkçe"],
    kartenKurz: ["Resmî belgeler, kararlar, diplomalar ve daha fazlası", "Yerinde, görüntülü veya telefonla", "İki yönde tipik belgeler"],
  },

  leistungen: {
    ueTitel: "Onaylı çeviriler",
    doTitel: "Sözlü tercüme",
  },

  warum: {
    eyebrow: "Avantajlarınız",
    titel: "Neden Sayın Tanrikulu?",
    details: "Ayrıntılar",
    platzhalter: "Altı avantajın ifadeleri Sayın Tanrikulu tarafından onaylanmalı (hizmet bölgesi, ücret ve deneyimler 31.10. geri bildirimiyle onaylandı).",
    punkte: [
      { icon: "gespraech", titel: "Sözlü ve yazılı tercüme tek elden", kurz: "Belgeler ve görüşmeler için tek muhatap.", lang: "Hem genel yeminli tercüman hem de yetkili mütercimdir. Yerinde, görüntülü veya telefonla tercüme yapar; tek bir muhatabınız olur.", seite: "dolmetschen", anker: "#unterschied-titel" },
      { icon: "schild", titel: "Schleswig Eyalet Yüksek Mahkemesi'nden yeminli ve yetkili", kurz: "Mayıs 2021'den beri, Türkçe ve Almanca için.", lang: "Almanya'da yetkili bir mütercimin çevirisi, Alman resmî makamları ve mahkemeleri için olağan biçimdir. Buna ek olarak felsefe ve Germanistik alanında lisans (Bachelor of Arts, 2021).", seite: "wissen", anker: "#beglaubigt" },
      { icon: "urteil", titel: "Mahkemeler, resmî kurumlar ve hastanelerle deneyim", kurz: "Mahkemeler, konsolosluk, BAMF, nüfus idaresi, hastaneler ve daha fazlası.", lang: "Aralarında Schleswig-Holstein'daki yerel mahkemeler, Hamburg'daki Türk Konsolosluğu, BAMF, IQSH, Hamburg'daki okullar, nüfus idaresi (Standesamt), hastaneler ve tutukevleri var.", seite: "ueber", anker: "#erfahrung-titel" },
      { icon: "dokument", titel: "Anlaşmaya göre ücret", kurz: "Önceden size özel fiyat teklifi.", lang: "Ücret, işin türüne, kapsamına ve zorluk derecesine göre belirlenir. Mahkeme ve resmî makam işlerinde, uygulanabildiği ölçüde JVEG'e göre ücretlendirilir.", seite: "uebersetzungen", anker: "#honorar-titel" },
      { icon: "telefon", titel: "Kolayca ulaşın", kurz: "Doğrudan telefon, WhatsApp, e-posta veya talep formuyla.", lang: "Aracı yok: Doğrudan Sayın Tanrikulu ile konuşur veya yazışırsınız.", seite: "kontakt", anker: "" },
      { icon: "bruecke", titel: "İki kültürle kişisel bağ", kurz: "Çeviriye olan ilgisi Türkiye'de başladı.", lang: "Bu ilgiyi Türkiye'deki bir öğrenim döneminde keşfetti. İşini \u201ckültürler arasında bir tür köprü kurma\u201d olarak görüyor.", seite: "ueber", anker: "" },
    ],
  },

  gebiet: {
    titel: "Hizmet bölgesi",
    laender: ["Hamburg", "Schleswig-Holstein", "Mecklenburg-Vorpommern", "Bremen", "Aşağı Saksonya"],
    satz: "Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen ve Aşağı Saksonya",
    zusatz: "Konum Hamburg. Bu beş eyalette yerinde sözlü tercüme, ayrıca görüntülü veya telefonla.",
    karte: "Harita: hizmet bölgesi Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen ve Aşağı Saksonya",
  },

  ablauf: {
    eyebrow: "Süreç",
    titel: "Bu kadar kolay",
    text: "Çevirinize veya randevunuza üç adımda.",
    aria: "Üç adımda süreç",
    schritte: [
      { icon: "telefon", titel: "İletişime geçin", kurz: "Arayın, WhatsApp'tan veya e-posta ile yazın ya da talep formunu kullanın." },
      { icon: "gespraech", titel: "Talebinizi konuşun", kurz: "Belgelerinizin fotoğrafını veya taranmış hâlini bize gönderin, size bir fiyat teklifi sunalım." }, // Wortlaut von Jamil vorgegeben (Talk xidc8qvq #5604, 12.11.2026)
      { icon: "dokument", titel: "Çeviri veya randevu", kurz: "Onaylı çevirinizi alırsınız ya da randevunuzda sözlü tercüme yapılır." },
    ],
  },

  gut: {
    eyebrow: "Bilmekte fayda var",
    titel: "Kısa cevaplar",
    mehr: "Ayrıntılar",
    fragen: [
      { frage: "Onaylı çeviriye ihtiyacım var mı?", antwort: "Resmî daireler, mahkemeler ve diğer resmî kurumlar yabancı dildeki belgeler için bunu isteyebilir. İhtiyacınız olup olmadığını, belgeyi teslim edeceğiniz makam söyler.", seite: "wissen", anker: "#beglaubigt" },
      { frage: "Hangi belgeler çevriliyor?", antwort: "Her türlü belge; örneğin mahkeme kararları (boşanma kararları dahil), diplomalar ve karneler, kimlik kartları, tıbbi belgeler ve resmî belgeler.", seite: "uebersetzungen", anker: "#dok-titel" },
      { frage: "Sözlü tercüman mı, mütercim mi?", antwort: "Sözlü tercüman konuşulanı, mütercim yazılı metni aktarır. Sayın Tanrikulu her ikisi için de yetkilidir.", seite: "wissen", anker: "#dolmetscher-uebersetzer" },
      { frage: "Ücret ne kadar?", antwort: "Ücret, işin türüne, kapsamına ve zorluk derecesine göre bireysel olarak belirlenir. Özel işler için önceden bir fiyat teklifi alırsınız.", seite: "uebersetzungen", anker: "#honorar-titel" },
      { frage: "Sayın Tanrikulu hangi bölgelerde sözlü tercüme yapıyor?", antwort: "Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen ve Aşağı Saksonya'da yerinde. Konumu Hamburg. Görüntülü veya telefonla da tercüme yapar.", seite: "dolmetschen", anker: "#gebiet-titel" },
      { frage: "Apostil gerekir mi?", antwort: "Apostil, resmî bir belgenin gerçek olduğunu teyit eder. Gerekip gerekmediği belgeye ve onu isteyen makama bağlıdır.", seite: "wissen", anker: "#apostille" },
    ],
  },

  // Talep formu: başlıklar (Jamil #5312/#5314) – TR von Kerim prüfen lassen
  anfrage: {
    eyebrow: "Talep",
    startTitel: "Birkaç adımda talep",
    startZeile: "Her adımda bir soru, sonunda her şeyi özet olarak görürsünüz. Bilgileriniz ancak siz e-posta veya WhatsApp ile gönderdiğinizde Sayın Tanrikulu'ya ulaşır.",
    kontaktTitel: "Talep oluşturun",
    kontaktZeile: "Birkaç adımda talebinizi oluşturun. Bilgileriniz ancak sonunda kendiniz gönderdiğinizde Sayın Tanrikulu'ya ulaşır.",
    direktLink: "Doğrudan mı? Telefon, WhatsApp veya e-posta",
    direktTitel: "Doğrudan konuşmayı veya yazmayı mı tercih edersiniz?",
    zumFormular: "Talep formuna git",
  },

  // „Bilmeniz gerekenler“ = Rehber + SSS (Jamil Talk xidc8qvq #5318, 09.11.2026) – TR von Kerim prüfen lassen
  wissen: {
    titel: "Bilmeniz gerekenler",
    lead: "Almanya ile Türkiye arasında onaylı çeviri ve sözlü tercüme hakkında genel cevaplar: önce rehber, ardından sık sorulan sorular.",
    alle: "Devamı „Bilmeniz gerekenler“ sayfasında",
  },

  ratgeber: {
    eyebrow: "Rehber",
    titel: "Çeviri öncesi bilinmesi gerekenler",
    text: "Almanya ile Türkiye arasındaki onaylı çevirilerde sık sorulan sorulara genel cevaplar.",
    seitenTitel: "Rehber",
    seitenText: "Onaylı çeviri nedir, apostil ne zaman gerekir, iki yönde neler geçerlidir? Almanya ve Türkiye için genel açıklamalar.",
    teaserLink: "Rehbere git",
    weiter: "Devamını okuyun",
    kapitel: [
      {
        id: "beglaubigt",
        frage: "Onaylı çeviri nedir?",
        begriff: "onay şerhi",
        kurz: "Yetkili mütercimin onay şerhi, imzası ve çoğu zaman mührüyle birlikte verilen yazılı çeviri.",
        absaetze: [
          "Almanya'da onaylı çeviriyi (beglaubigte Übersetzung) yetkili ya da resmî olarak atanmış bir mütercim yapar. Çevirinin sonunda bir onay şerhi (Bestätigungsvermerk) bulunur: Mütercim bu şerhte çevirinin doğru ve eksiksiz olduğunu belgeler. Buna imzası ve genellikle mührü eklenir.",
          "Mütercimler ilgili eyaletin hukukuna göre, çoğunlukla bir mahkeme tarafından yetkilendirilir. Alman Hukuk Muhakemeleri Kanunu bu tür çevirileri açıkça anar (§ 142 Abs. 3 ZPO). Sayın Tanrikulu Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından yetkilendirilmiştir.",
        ],
      },
      {
        id: "dolmetscher-uebersetzer",
        frage: "Sözlü tercüman mı, mütercim mi?",
        begriff: "konuşulanı",
        kurz: "Sözlü tercüman konuşulanı, mütercim yazılı metni aktarır.",
        absaetze: [
          "Sözlü tercüman (Dolmetscher) konuşulanı aktarır, örneğin bir duruşmada ya da bir görüşmede. Mütercim (Übersetzer) yazılı çalışır ve belgeleri çevirir.",
          "\"Genel yeminli\" (allgemein beeidigt) şu anlama gelir: Tercüman bir kez genel yemin etmiştir. Mahkemede bu yemine dayanabilir ve her duruşma için yeniden yemin etmesi gerekmez (§ 189 Abs. 2 GVG). Sayın Tanrikulu her ikisidir: genel yeminli tercüman ve yetkili mütercim.",
        ],
      },
      {
        id: "original-kopie",
        frage: "Asıl belge mi, fotokopi mi?",
        begriff: "fotokopi",
        kurz: "Çeviri, getirdiğiniz belgeye göre yapılır. Fotokopinin yeterli olup olmadığına belgeyi isteyen makam karar verir.",
        absaetze: [
          "Çeviri, eldeki belgeye göre yapılır: asıl belge, onaylı bir suret ya da basit bir fotokopi. Onay şerhinde genellikle hangi belgenin kullanıldığı belirtilir.",
          "Fotokopiden yapılan bir çevirinin yeterli olup olmadığına, belgeyi teslim ettiğiniz makam karar verir. En iyisi önceden oraya sormanızdır.",
        ],
      },
      {
        id: "apostille",
        frage: "Apostil: Ne zaman gerekir?",
        begriff: "apostil",
        kurz: "Apostil, resmî bir belgenin gerçek olduğunu teyit eder. Almanya ile Türkiye arasında konsolosluk tasdikinin yerini alır.",
        absaetze: [
          "Bazı makamlar yabancı bir belgenin gerçek olduğundan emin olmak ister. Bunun için apostil vardır. Apostili, belgenin düzenlendiği ülkenin yetkili makamı belgeye ekler. Apostil imzayı ve mührü teyit eder, içeriği değil.",
          "Almanya ve Türkiye, 5 Ekim 1961 tarihli Lahey Sözleşmesi'nin taraf devletleridir. Bu nedenle iki ülke arasında apostil yeterlidir; daha zahmetli olan konsolosluk tasdiki gerekmez.",
          "Apostile gerçekten ihtiyaç olup olmadığı, belgeye ve belgeyi isteyen makama bağlıdır. Gerekiyorsa apostili çeviriden önce aldırmanız iyi olur. Böylece apostil de çeviriye dahil edilebilir.",
        ],
      },
      {
        id: "formuel",
        frage: "Çok dilli örnekler: Formül A, B ve C",
        begriff: "Formül",
        kurz: "Doğum, evlenme ve ölüm için Türkiye'de pek çok makamın çevirisiz kabul ettiği uluslararası örnekler vardır.",
        absaetze: [
          "Türk nüfus müdürlükleri istek üzerine uluslararası, çok dilli örnekler düzenler: doğum için Formül A, evlenme için Formül B ve ölüm için Formül C. Bu belgeler, Almanya'nın da üye olduğu Uluslararası Kişi Hali Komisyonu'nun (CIEC) bir sözleşmesine dayanır ve taraf devletlerde çeviri gerekmeden okunabilecek şekilde düzenlenmiştir.",
          "Pek çok Alman nüfus idaresi (Standesamt) ve resmî daire bu örnekleri çevirisiz kabul eder. Bir makam yine de çeviri veya ayrıntılı bir nüfus kayıt örneği (örneğin vukuatlı nüfus kayıt örneği) isterse, onun talebi geçerlidir.",
        ],
      },
      {
        id: "beide-richtungen",
        frage: "Çeviri Türkiye'de de geçerli mi?",
        begriff: "ek onay",
        kurz: "Alman makamları için yetkili mütercimin çevirisi olağandır. Türk makamları ek onay isteyebilir.",
        absaetze: [
          "Alman makamları için Almanya'da yetkilendirilmiş bir mütercimin çevirisi olağan biçimdir.",
          "Türk makamları için farklı kurallar geçerli olabilir. Türkiye'de çeviriyi çoğu zaman bir noter onaylar (noter onaylı tercüme) ve bazı makamlar, örneğin bir Türk konsolosluğu tarafından ek onay ister. Bu yüzden çeviriden önce belgeyi isteyen makamla hangi biçimi kabul ettiğini netleştirin.",
        ],
      },
      {
        id: "namen",
        frage: "Türkçe harfli isimler",
        begriff: "yazılışlar",
        kurz: "İsimler genellikle kaynak belgedeki gibi yazılır. Farklılıkları en iyisi baştan belirtin.",
        absaetze: [
          "Türkçe isimlerde sıklıkla ç, ğ, ı, İ, ö, ş veya ü gibi harfler bulunur. Çevirilerde isimler genellikle kaynak belgedeki gibi yazılır.",
          "Belgelerinizde yazılışlar birbirinden farklıysa, örneğin pasaport ile nüfus belgesi arasında, bunu talebinizde hemen belirtmeniz iyi olur.",
        ],
      },
      {
        id: "jveg",
        frage: "JVEG nedir?",
        begriff: "JVEG",
        kurz: "JVEG, mahkemelerin ve resmî makamların tercümanlara nasıl ödeme yaptığını düzenler. Mahkeme ve resmî makam işlerinde Sayın Tanrikulu, uygulanabildiği ölçüde buna göre ücretlendirir.",
        absaetze: [
          "Almanya'daki JVEG (Justizvergütungs- und -entschädigungsgesetz), mahkemelerin ve resmî makamların sözlü tercümanlara ve mütercimlere nasıl ödeme yaptığını düzenler: sözlü tercümede süreye göre, yazılı çeviride metnin uzunluğuna göre.",
          "Mahkeme ve resmî makam işlerinde Sayın Tanrikulu, uygulanabildiği ölçüde JVEG'e göre ücretlendirir. Diğer işlerde ücret bireysel anlaşmaya göre belirlenir: işin türüne, kapsamına ve zorluk derecesine göre; özel işler için önceden bir fiyat teklifi alırsınız.",
        ],
      },
    ],
    platzhalter: "Yalnızca Sayın Tanrikulu'nun cevaplayabileceği konuları, onun geri bildiriminden sonra ekleyeceğiz: işlem süresi ve asıl belgeler ile hassas belgeler için güvenli gönderim yolu.",
    inhalt: "İçindekiler",
  },

  fragen: {
    eyebrow: "Sık sorulan sorular",
    titelStart: "Kısaca cevaplar",
    alle: "Tüm soruları görün",
    seitenText: "Onaylı çeviri, sözlü tercüme ve talep hakkında cevaplar.",
    platzhalter: "Diğer sorular yalnızca müşterinin cevaplarıyla.",
    liste: [
      { frage: "Onaylı çeviri nedir?", antwort: ["Onaylı çeviriyi yetkili bir mütercim yapar. Resmî daireler, mahkemeler ve diğer resmî kurumlar yabancı dildeki belgeler için bunu isteyebilir. Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için yetkili mütercimim."] },
      { frage: "Hangi belgeler çevrilebilir?", antwort: ["Her türlü belge; örneğin mahkeme kararları (boşanma kararları dahil), diplomalar ve karneler, kimlik kartları, tıbbi belgeler ve resmî belgeler."] },
      { frage: "\"Genel yeminli tercüman\" ne demek?", antwort: ["Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için genel yeminli tercümanım (allgemein beeidigter Dolmetscher). Günlük dilde buna çoğu zaman \"yeminli tercüman\" denir."] },
      { frage: "Hangi dillerde çeviri ve sözlü tercüme yapıyorsunuz?", antwort: ["Türkçe ve Almanca."] },
      { frage: "Bir çeviri veya sözlü tercüme ne kadar tutar?", antwort: [`${HONORAR_TITEL}. ${HONORAR}`, HONORAR_BEISPIEL] },
      { frage: "Hangi bölgelerde sözlü tercüme yapıyorsunuz?", antwort: ["Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Bremen ve Aşağı Saksonya'da yerinde. Konumum Hamburg."] },
      { frage: "Görüntülü veya telefonla da sözlü tercüme yapıyor musunuz?", antwort: ["Evet. Yerinde görevlerin yanı sıra görüntülü veya telefonla da sözlü tercüme yapıyorum."] },
      { frage: "Nasıl talep gönderebilirim?", antwort: [`En kolayı iletişim sayfasındaki talep formu. Beni ${TELEFON} numarasından da arayabilir, WhatsApp'tan yazabilir veya ${MAIL} adresine e-posta gönderebilirsiniz. Belgelerinizi fotoğraf veya tarama olarak gönderin, size bir fiyat teklifi iletirim.`] },
    ],
  },

  aufruf: {
    titel: "Desteğe mi ihtiyacınız var?",
    text: "Bir çeviriye veya sözlü tercümana mı ihtiyacınız var? Benimle iletişime geçin.",
    knopf: "Şimdi iletişime geçin",
  },

  seiten: {
    uebersetzungen: {
      zeile: "Türkçe ve Almanca",
      lead: "Belgenizi bir resmî daireye, mahkemeye veya başka bir resmî kuruma mı vermeniz gerekiyor? Sizin için her türlü belgeyi memnuniyetle çeviriyorum.",
      dokTitel: "Her türlü belge",
      dokZeile: "Örneğin:",
      ermTitel: "Yetkili mütercim",
      ermPlatzhalter: "Yetki ve onay şerhinin metni müşteri tarafından onaylanmalı (ör. onay şerhinin nasıl göründüğü).",
      wissenTitel: "Bilmekte fayda var",
      wissenText: "Onay şerhinin ne olduğu, fotokopinin yeterli olup olmadığı ve apostilin ne zaman gerektiği rehberde anlatılıyor.",
      anfrageTitel: "Talep",
      anfrageText: "Talep formunu kullanın, beni arayın ya da WhatsApp veya e-posta ile yazın. Belgelerinizi fotoğraf veya tarama olarak gönderin, bir fiyat teklifi alırsınız.",
      honorarTitel: HONORAR_TITEL,
    },
    dolmetschen: {
      zeile: "Türkçe ve Almanca",
      beeidigtTitel: "Genel yeminli",
      unterschiedTitel: "Sözlü ve yazılı",
      unterschiedText: "Sözlü tercüman konuşulanı, mütercim yazılı metni aktarır. Sayın Tanrikulu her ikisi için de yetkilidir.",
      erfahrungTitel: "Bugüne kadarki deneyimler",
      fernTitel: "Yerinde, görüntülü veya telefonla",
      fernText: "Yerinde olduğu gibi görüntülü veya telefonla da sözlü tercüme yapıyorum. Randevunuz için neyin uygun olduğunu önceden konuşuruz.",
      ueberLink: "Hakkımda daha fazla",
    },
    ueber: {
      zeile: "Kerim Mikael Tanrikulu",
      beganTitel: "Her şey nasıl başladı",
      beganLabel: "Çeviriye nasıl başladım",
      zitatLabel: "İşimi nasıl görüyorum",
      qualiTitel: "Yeterlilik",
      studiumSatz: "Öğrenimimi 2021'de felsefe ve Germanistik alanında lisans (Bachelor of Arts) ile tamamladım.",
    },
    kontakt: {
      lead: "Sorularınız mı var veya bir çeviri ya da sözlü tercüman mı talep etmek istiyorsunuz? Kısa talep formunu kullanın, arayın ya da bana WhatsApp veya e-posta ile yazın.",
      wegeLabel: "İletişim yolları",
      schluss: "Size özel izlenecek yolu kişisel bir görüşmede memnuniyetle anlatırım.",
      hinweisLabel: "Talep hakkında not",
      platzhalter: "Mevcut web sitesinde bir iletişim formu var. Burada yeniden eklenip eklenmeyeceğini ve nasıl ekleneceğini (kendi gönderim, spam koruması, veri koruma) müşteriyle netleştireceğiz.",
    },
    nichtGefunden: {
      titel: "Bu sayfa mevcut değil",
      text: "Adres değişmiş olabilir.",
      start: "Ana sayfaya",
      kontakt: "İletişime",
    },
    recht: {
      hinweisTr: "Bu sayfanın bağlayıcı metni Almancadır. Almanca metin aşağıda yer almaktadır.",
    },
  },
};
