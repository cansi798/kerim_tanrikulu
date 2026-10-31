// Türkische Fassung (Siz-Form). ENTWURF: Herr Tanrikulu ist selbst Übersetzer und muss jede Zeile prüfen
// (Hinweis auf allen türkischen Seiten, Schalter TR_GEPRUEFT in i18n.ts, OFFENE-INFOS).
// Gleiche Form wie de.ts. Fachbegriffe: allgemein beeidigter Dolmetscher = genel yeminli tercüman (sözlü),
// ermächtigter Übersetzer = yetkili mütercim (yazılı), beglaubigte Übersetzung = onaylı (yeminli) çeviri, Apostille = Apostil.
import { NAME, MAIL, TELEFON, TITEL_NAME } from "../daten";
import type { Texte } from "./de";

const HONORAR =
  "Ücret, JVEG'e (Almanya'da mahkemelerin ve resmî makamların tercümanlara ödediği ücretleri düzenleyen kanun) göre belirlenir. Size özel izlenecek yolu kişisel bir görüşmede memnuniyetle anlatırım.";

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
    portraitAlt: `${NAME} portresi`,
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
    themen: "Belgeler",
    ratgeber: "Rehber",
    ueber: "Hakkımda",
    fragen: "SSS",
    kontakt: "İletişim",
    impressum: "Künye",
    datenschutz: "Veri koruma",
  },

  meta: {
    titelStart: `Hamburg'da yeminli Türkçe tercüman ve mütercim | ${TITEL_NAME}`,
    beschreibung:
      "Türkçe–Almanca onaylı çeviri ve sözlü tercüme: Kerim Tanrikulu, Schleswig Eyalet Yüksek Mahkemesi'nden yeminli ve yetkili. Hamburg, Schleswig-Holstein, Bremen, Aşağı Saksonya.",
    uebersetzungen: { titel: "Hamburg'da Türkçe–Almanca onaylı çeviri", beschreibung: "Hamburg'da yetkili mütercim Kerim Mikael Tanrikulu'dan Türkçe ve Almanca onaylı çeviriler: kararlar, diplomalar, kimlikler, tıbbi belgeler, resmî belgeler. Ücret JVEG'e göre." },
    dolmetschen: { titel: "Türkçe sözlü tercüman: Hamburg, Schleswig-Holstein, Bremen, Aşağı Saksonya", beschreibung: "Türkçe ve Almanca genel yeminli tercüman (Schleswig Eyalet Yüksek Mahkemesi, Mayıs 2021'den beri). Hizmet bölgesi Hamburg, Schleswig-Holstein, Bremen ve Aşağı Saksonya." },
    themen: { titel: "Türkçe ve Almanca tipik belgeler", beschreibung: "Alman makamlarının hangi Türk belgelerini, Türk makamlarının hangi Alman belgelerini sıklıkla çevirili istediğine genel bakış: nüfus kayıtları, kararlar, diplomalar, kimlikler, tıbbi belgeler." },
    ratgeber: { titel: "Onaylı çeviri ve apostil rehberi", beschreibung: "Genel bilgiler: onaylı çeviri nedir, sözlü tercüman ile mütercim arasındaki fark, asıl belge mi fotokopi mi, Almanya ile Türkiye arasında apostil, çok dilli örnekler, JVEG." },
    ueber: { titel: "Hakkımda", beschreibung: "Kerim Mikael Tanrikulu, Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için genel yeminli tercüman ve yetkili mütercim." },
    fragen: { titel: "Sık sorulan sorular", beschreibung: "Türkçe ve Almanca onaylı çeviri ve sözlü tercüme hakkında cevaplar: onaylı çeviri nedir, hangi belgeler çevrilir, JVEG'e göre ücret, talep." },
    kontakt: { titel: "İletişim", beschreibung: "Hamburg'da Türkçe ve Almanca tercüman Kerim Mikael Tanrikulu ile iletişim: telefon ve e-posta." },
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
    ],
    dokumenteSatz: "Sizin için her türlü belgeyi memnuniyetle çeviriyorum; örneğin mahkeme kararları (boşanma kararları dahil), diplomalar ve karneler, kimlik kartları, tıbbi belgeler ve resmî belgeler.",
    dokumente: [
      { icon: "urteil", text: "Mahkeme kararları, boşanma kararları dahil" },
      { icon: "zeugnis", text: "Diplomalar ve karneler" },
      { icon: "ausweis", text: "Kimlik kartları" },
      { icon: "medizin", text: "Tıbbi belgeler" },
      { icon: "urkunde", text: "Resmî belgeler" },
    ],
    honorar: HONORAR,
    ermaechtigtSatz: "Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için yetkili mütercimim.",
    beeidigtSatz: "Mayıs 2021'den beri Schleswig Eyalet Yüksek Mahkemesi tarafından Türkçe ve Almanca için genel yeminli tercümanım.",
    nachweise: [
      { titel: "Sözlü tercüman", wert: "genel yeminli" },
      { titel: "Yazılı tercüman (mütercim)", wert: "yetkili" },
      { titel: "Yemin ve yetki veren makam", wert: "Schleswig Eyalet Yüksek Mahkemesi" },
      { titel: "Başlangıç", wert: "Mayıs 2021" },
      { titel: "Diller", wert: "Almanca ve Türkçe" },
      { titel: "Konum", wert: "Hamburg" },
    ],
  },

  hero: {
    badge: "Genel yeminli tercüman ve yetkili mütercim",
    h1: "Almanca ve Türkçe için onaylı çeviri ve sözlü tercümanlık hizmetleri",
    sub: "Resmî daireler, mahkemeler ve diğer resmî kurumlar için.",
    vertrauen: ["Sözlü tercüman", "Mütercim", "Almanca ve Türkçe"],
    karten: ["Onaylı çeviriler", "Sözlü tercüme", "Almanca ve Türkçe"],
    kartenKurz: ["Resmî belgeler, kararlar, diplomalar ve daha fazlası", "Görüşmeler ve randevular, genel yeminli", "İki yönde tipik belgeler"],
  },

  leistungen: {
    ueTitel: "Onaylı çeviriler",
    doTitel: "Sözlü tercüme",
  },

  warum: {
    eyebrow: "Avantajlarınız",
    titel: "Neden Sayın Tanrikulu?",
    details: "Ayrıntılar",
    platzhalter: "Altı avantajın ifadeleri ve hizmet bölgesi (Can\u2019ın belirlediği) Sayın Tanrikulu tarafından onaylanmalı.",
    punkte: [
      { icon: "gespraech", titel: "Sözlü ve yazılı tercüme tek elden", kurz: "Belgeler ve görüşmeler için tek muhatap.", lang: "Hem genel yeminli tercüman hem de yetkili mütercimdir. Çeviri ve randevu için tek bir muhatabınız olur.", seite: "dolmetschen", anker: "#unterschied-titel" },
      { icon: "schild", titel: "Schleswig Eyalet Yüksek Mahkemesi'nden yeminli ve yetkili", kurz: "Mayıs 2021'den beri, Türkçe ve Almanca için.", lang: "Almanya'da yetkili bir mütercimin çevirisi, Alman resmî makamları ve mahkemeleri için olağan biçimdir.", seite: "ratgeber", anker: "#beglaubigt" },
      { icon: "urteil", titel: "Mahkemeler ve resmî kurumlarla deneyim", kurz: "Yerel mahkemeler, konsolosluk, BAMF ve okullar.", lang: "Aralarında Schleswig-Holstein'daki yerel mahkemeler, Hamburg'daki Türk Konsolosluğu, Federal Göç ve Mülteciler Dairesi (BAMF), IQSH ve Hamburg'daki okullar var.", seite: "ueber", anker: "#erfahrung-titel" },
      { icon: "dokument", titel: "JVEG'e göre ücret", kurz: "Mahkemelerin de uyguladığı kanuna göre.", lang: "JVEG, mahkemelerin ve resmî makamların tercümanlara nasıl ödeme yaptığını düzenler. Sizin durumunuzdaki ücreti Sayın Tanrikulu sizinle kişisel olarak konuşur.", seite: "ratgeber", anker: "#jveg" },
      { icon: "telefon", titel: "Kolayca ulaşın", kurz: "Doğrudan telefon veya e-posta ile, form doldurmadan.", lang: "Form yok, aracı yok: Doğrudan Sayın Tanrikulu ile konuşur veya yazışırsınız.", seite: "kontakt", anker: "" },
      { icon: "bruecke", titel: "İki kültürle kişisel bağ", kurz: "Çeviriye olan ilgisi Türkiye'de başladı.", lang: "Bu ilgiyi Türkiye'deki bir öğrenim döneminde keşfetti. İşini \u201ckültürler arasında bir tür köprü kurma\u201d olarak görüyor.", seite: "ueber", anker: "" },
    ],
  },

  gebiet: {
    titel: "Hizmet bölgesi",
    laender: ["Hamburg", "Schleswig-Holstein", "Bremen", "Aşağı Saksonya"],
    satz: "Hamburg, Schleswig-Holstein, Bremen ve Aşağı Saksonya",
    zusatz: "Konum Hamburg. Bu dört eyalette yerinde sözlü tercüme.",
    karte: "Harita: hizmet bölgesi Hamburg, Schleswig-Holstein, Bremen ve Aşağı Saksonya",
  },

  ablauf: {
    eyebrow: "Süreç",
    titel: "Bu kadar kolay",
    text: "Çevirinize veya randevunuza üç adımda.",
    aria: "Üç adımda süreç",
    schritte: [
      { icon: "telefon", titel: "İletişime geçin", kurz: "Arayın veya e-posta yazın." },
      { icon: "gespraech", titel: "Talebinizi konuşun", kurz: "İzlenecek yolu Sayın Tanrikulu sizinle kişisel olarak konuşur." },
      { icon: "dokument", titel: "Çeviri veya randevu", kurz: "Onaylı çevirinizi alırsınız ya da randevunuzda sözlü tercüme yapılır." },
    ],
    platzhalter: "Süreç bilerek genel ifade edildi (Can 31.10.). Bir işin nasıl ilerlediğini Sayın Tanrikulu onaylamalı.",
  },

  gut: {
    eyebrow: "Bilmekte fayda var",
    titel: "Kısa cevaplar",
    mehr: "Ayrıntılar",
    fragen: [
      { frage: "Onaylı çeviriye ihtiyacım var mı?", antwort: "Resmî daireler, mahkemeler ve diğer resmî kurumlar yabancı dildeki belgeler için bunu isteyebilir. İhtiyacınız olup olmadığını, belgeyi teslim edeceğiniz makam söyler.", seite: "ratgeber", anker: "#beglaubigt" },
      { frage: "Hangi belgeler çevriliyor?", antwort: "Her türlü belge; örneğin mahkeme kararları (boşanma kararları dahil), diplomalar ve karneler, kimlik kartları, tıbbi belgeler ve resmî belgeler.", seite: "themen", anker: "" },
      { frage: "Sözlü tercüman mı, mütercim mi?", antwort: "Sözlü tercüman konuşulanı, mütercim yazılı metni aktarır. Sayın Tanrikulu her ikisi için de yetkilidir.", seite: "ratgeber", anker: "#dolmetscher-uebersetzer" },
      { frage: "Ücret ne kadar?", antwort: "Ücret JVEG'e göre belirlenir. Sizin durumunuzdaki ücreti Sayın Tanrikulu sizinle kişisel olarak konuşur.", seite: "ratgeber", anker: "#jveg" },
      { frage: "Sayın Tanrikulu hangi bölgelerde sözlü tercüme yapıyor?", antwort: "Hamburg, Schleswig-Holstein, Bremen ve Aşağı Saksonya'da. Konumu Hamburg.", seite: "dolmetschen", anker: "#gebiet-titel" },
      { frage: "Apostil gerekir mi?", antwort: "Apostil, resmî bir belgenin gerçek olduğunu teyit eder. Gerekip gerekmediği belgeye ve onu isteyen makama bağlıdır.", seite: "ratgeber", anker: "#apostille" },
    ],
  },

  themen: {
    eyebrow: "Belgeler",
    titel: "İki yönde tipik belgeler",
    text: "Resmî daireler, mahkemeler ve diğer kurumlar bu belgeler için sıklıkla onaylı çeviri ister. Bu liste geneldir. Sayın Tanrikulu'nun hangi işleri üstlendiğini lütfen doğrudan kendisine sorun.",
    legende: "Onay işaretiyle gösterilenler: Sayın Tanrikulu'nun web sitesinde kendisinin örnek olarak verdiği belge türleri.",
    laut: "Sayın Tanrikulu'ya göre",
    trde: {
      kopf: "Türkçe → Deutsch",
      titel: "Alman makamları için Türk belgeleri",
      gruppen: [
        { titel: "Nüfus ve aile", eintraege: [
          { text: "Nüfus kayıt örneği", tr: "Auszug aus dem Personenstandsregister", kerim: false },
          { text: "Doğum belgesi", tr: "Geburtsurkunde", kerim: true },
          { text: "Evlenme cüzdanı", tr: "Heiratsurkunde, Familienheft", kerim: true },
          { text: "Veraset ilamı", tr: "Erbschein", kerim: false },
        ] },
        { titel: "Mahkemeler ve resmî kurumlar", eintraege: [
          { text: "Mahkeme kararları", tr: "Gerichtsurteile", kerim: true },
          { text: "Boşanma kararı, çoğu zaman kesinleşme şerhiyle", tr: "Scheidungsurteil, Rechtskraftvermerk", kerim: true },
          { text: "Mahkeme ve resmî dairelerin yazıları", tr: "Behördenschreiben", kerim: false },
        ] },
        { titel: "Okul, üniversite, meslek", eintraege: [
          { text: "Diploma ve transkriptler, örneğin denklik için", tr: "Zeugnisse, Anerkennung", kerim: true },
        ] },
        { titel: "Kimlik, ehliyet, sağlık", eintraege: [
          { text: "Kimlik kartı", tr: "Personalausweis", kerim: true },
          { text: "Sürücü belgesi", tr: "Führerschein", kerim: false },
          { text: "Sağlık raporu, epikriz", tr: "Medizinische Unterlagen", kerim: true },
        ] },
      ],
    },
    detr: {
      kopf: "Deutsch → Türkçe",
      titel: "Türk makamları için Alman belgeleri",
      gruppen: [
        { titel: "Nüfus ve aile", eintraege: [
          { text: "Doğum, evlenme ve ölüm belgeleri", tr: "Geburts-, Heirats-, Sterbeurkunden", kerim: true },
        ] },
        { titel: "Mahkemeler ve noterler", eintraege: [
          { text: "Alman mahkemelerinin kararları", tr: "Urteile deutscher Gerichte", kerim: true },
          { text: "Boşanma kararları, örneğin Türkiye'de tanıma için", tr: "Scheidungsurteile", kerim: true },
          { text: "Vekâletnameler ve noter belgeleri", tr: "Vollmachten, notarielle Urkunden", kerim: false },
        ] },
        { titel: "Okul, üniversite, meslek", eintraege: [
          { text: "Diplomalar ve meslek eğitimi belgeleri", tr: "Zeugnisse, Ausbildungsnachweise", kerim: true },
          { text: "Çalışma ve emeklilik belgeleri", tr: "Arbeits- und Rentenunterlagen", kerim: false },
        ] },
        { titel: "Kimlik ve sağlık", eintraege: [
          { text: "Kimlik kartı", tr: "Personalausweis", kerim: true },
          { text: "Doktor mektupları ve raporlar", tr: "Arztbriefe, Befunde", kerim: true },
        ] },
      ],
    },
    teaserLink: "Tüm belgeleri görün",
    hinweisAnfrage: "Belgeniz listede yok mu? Sormanız yeterli.",
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
        frage: "\"JVEG'e göre ücret\" ne demek?",
        begriff: "JVEG",
        kurz: "JVEG, mahkemelerin ve resmî makamların tercümanlara nasıl ödeme yaptığını düzenler. Sayın Tanrikulu ücretini buna göre belirler.",
        absaetze: [
          "Almanya'daki JVEG (Justizvergütungs- und -entschädigungsgesetz), mahkemelerin ve resmî makamların sözlü tercümanlara ve mütercimlere nasıl ödeme yaptığını düzenler: sözlü tercümede süreye göre, yazılı çeviride metnin uzunluğuna göre.",
          "Sayın Tanrikulu ücretini JVEG'e göre belirler. Sizin durumunuzda bir çevirinin veya görevin ne kadar tutacağını en iyisi doğrudan kendisiyle konuşun.",
        ],
      },
    ],
    platzhalter: "Yalnızca Sayın Tanrikulu'nun cevaplayabileceği konuları, onun geri bildiriminden sonra ekleyeceğiz: somut fiyatlar, işlem süresi, iş akışı ve belgelerin posta veya e-posta ile gönderilip gönderilemeyeceği.",
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
      { frage: "Bir çeviri veya sözlü tercüme ne kadar tutar?", antwort: [HONORAR] },
      { frage: "Hangi bölgelerde sözlü tercüme yapıyorsunuz?", antwort: ["Hamburg, Schleswig-Holstein, Bremen ve Aşağı Saksonya'da. Konumum Hamburg."] },
      { frage: "Nasıl talep gönderebilirim?", antwort: [`${MAIL} adresine e-posta yazın veya ${TELEFON} numarasından arayın. Size özel izlenecek yolu kişisel bir görüşmede memnuniyetle anlatırım.`] },
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
      themenLink: "İki yönde tipik belgeler",
      anfrageTitel: "Talep",
      anfrageText: "Beni arayın veya e-posta ile talep gönderin.",
      honorarTitel: "Ücret",
    },
    dolmetschen: {
      zeile: "Türkçe ve Almanca",
      beeidigtTitel: "Genel yeminli",
      unterschiedTitel: "Sözlü ve yazılı",
      unterschiedText: "Sözlü tercüman konuşulanı, mütercim yazılı metni aktarır. Sayın Tanrikulu her ikisi için de yetkilidir.",
      erfahrungTitel: "Bugüne kadarki deneyimler",
      platzhalter: "Tipik görev yerleri müşteri tarafından belirtilmeli. Hizmet bölgesini (Hamburg, Schleswig-Holstein, Bremen, Aşağı Saksonya) Can belirledi; Sayın Tanrikulu onaylamalı.",
      ueberLink: "Hakkımda daha fazla",
    },
    ueber: {
      zeile: "Kerim Mikael Tanrikulu",
      beganTitel: "Her şey nasıl başladı",
      beganLabel: "Çeviriye nasıl başladım",
      zitatLabel: "İşimi nasıl görüyorum",
      qualiTitel: "Yeterlilik",
    },
    kontakt: {
      lead: "Sorularınız mı var veya bir çeviri ya da sözlü tercüman mı talep etmek istiyorsunuz? Arayın veya bana e-posta yazın.",
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
