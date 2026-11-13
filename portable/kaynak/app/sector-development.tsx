"use client";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { MarketExplorer } from "./markets";
import { growth, references } from "../lib/growth";
import { photograph, sectorsInPrint, type Sector } from "../lib/editorial";
const money = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});
function StockCase() {
  const [amount, setAmount] = useState("120"),
    [margin, setMargin] = useState("7"),
    [expense, setExpense] = useState("560");
  const input = (
    label: string,
    value: string,
    set: (x: string) => void,
    step: string,
  ) => (
    <label>
      {label}
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(e) => set(e.target.value)}
      />
    </label>
  );
  const q = Number(amount),
    m = Number(margin),
    c = Number(expense),
    valid =
      [amount, margin, expense].every(
        (x) => x !== "" && Number.isFinite(Number(x)) && Number(x) >= 0,
      ) && Number.isInteger(q);
  return (
    <section className="stock-case">
      <small>ÖRNEK HESAP · AYLIK · AVRO</small>
      <h2>Bölgesel stok kaç ek satışla kendini karşılar?</h2>
      <p>
        Bir iş pantolonunda ana siparişin her iki modelde de aynı kaldığını
        düşünün. Doğrudan sevkle yetişmeyecek ek siparişleri bölgesel beden
        stokundan karşılıyorsunuz. Aşağıdaki rakamlar deneme varsayımlarıdır.
        Kendi sipariş kaydınız ve depo teklifinizle değiştirin.
      </p>
      <div className="case-inputs">
        {input("Kazanılan ek satış (adet)", amount, setAmount, "1")}
        {input("Ek satış başına katkı (€)", margin, setMargin, "0.01")}
        {input("Aylık ek sabit gider (€)", expense, setExpense, "0.01")}
      </div>
      <div className="case-results" aria-live="polite">
        <div>
          <span>Aylık katkı farkı</span>
          <b>{valid ? money.format(q * m - c) : "Eksik veya geçersiz veri"}</b>
        </div>
        <div>
          <span>Gideri karşılayan en düşük satış</span>
          <b>
            {!valid
              ? "—"
              : c === 0
                ? "0 adet"
                : m === 0
                  ? "Bu katkıyla karşılanamaz"
                  : Math.ceil(c / m) + " adet"}
          </b>
        </div>
      </div>
      <p className="case-formula">
        Katkı farkı = ek adet × birim katkı − ek sabit gider. Birim katkıdan
        üretim, taşıma, toplama, beklenen iade ve finansman giderini düşün.
        Aylık gider alanına yalnızca ayrıca ödenen sabit bedelleri girin.
      </p>
      <p>
        Başlangıç örneğinde 120 ek satış × 7 € − 560 € = 280 €. Talep 60 adette
        kalırsa fark −140 € olur. İlk parti tamamen satılmış olsa bile ikinci
        siparişi kendi ziyaret ve satış kayıtlarınızla doğrulayın. Aksi halde
        deponun katkısı olduğundan yüksek görünür.
      </p>
    </section>
  );
}
const routes = [
  {
    name: "Doğrudan sevkiyat",
    title: "Tek alıcı, planlı sezon siparişi",
    flow: "Türkiye’de fabrika → alıcının dağıtım merkezi",
    detail:
      "Koleksiyon miktarı ve teslim günü baştan kesinleşmişse tüm partiyi doğrudan alıcıya teslim etmek çift elleçlemeyi ve stok finansmanını azaltabilir. Alıcı kendi deposundan mağazalara dağıtıyorsa bölgesel bir depoda ikinci durak ancak açıkça fiyatlanmış bir hizmet kazancı sağladığında anlamlıdır.",
    measure:
      "Aynı teslim noktasında koli başına taşıma ve zamanında tam teslim oranı.",
  },
  {
    name: "Bölgesel hizmet deposu",
    title: "Bir üretim partisi, birden fazla teslim takvimi",
    flow: "Türkiye’de fabrika → anlaşmalı bölge deposu → bölgesel müşteriler",
    detail:
      "Bursa’da birlikte üretilen personel kıyafetlerinden Ljubljana’daki dağıtıcı tam koli, Graz’daki müşteri karışık beden seti, Trieste çevresindeki müşteri ise haftalık küçük ikmal isteyebilir. Talep bu hatlarda yoğunlaşıyorsa tek stok havuzu, her ülke için ayrı emniyet stoğu tutma ihtiyacını azaltabilir. Ljubljana, Graz veya Trieste’deki depo adaylarından aynı teslim adreslerine teklif alın. Ortak renk ve kalıp, stoğun bir alıcıdan diğerine aktarılmasını kolaylaştırır.",
    measure:
      "Kurtarılan ikmal katkısı eksi fazladan raf, toplama, finansman ve son teslim gideri.",
  },
  {
    name: "Hedef pazarda satış şirketi",
    title: "Tekrar eden satış, yerel ticari sorumluluk",
    flow: "Türkiye’de üretici → yerel satış şirketi → distribütör veya perakendeci",
    detail:
      "Alıcı sezonluk çerçeve anlaşmayı, avro faturalamayı, yerel iade muhatabını ve bir sonraki koleksiyonun numune sunumunu aynı ekipten istiyorsa satış şirketi bu sorumlulukları üstlenebilir. Gelirin sözleşmeyle öngörülen kısmını muhasebe, yönetim, satış personeli, depo ve finansman giderleriyle karşılaştırın. Teslimlerin çoğu tek bir Alman depoya gidiyorsa alıcının ülkesindeki hizmet ortağını da aynı kapsamda fiyatlayın.",
    measure:
      "Tekrarlayan hesaplardan sağlanan yıllık katkı eksi yerel sabit gider ve alacak riski.",
  },
];
function RouteComparison() {
  const [active, setActive] = useState(1);
  const r = routes[active];
  return (
    <section className="route-choice">
      <small>TEKSTİLDE DAĞITIM MODELİ</small>
      <h2>Hangi sipariş düzeni için hangi dağıtım modeli?</h2>
      <div className="route-buttons">
        {routes.map((x, i) => (
          <button
            aria-pressed={active === i}
            key={x.name}
            onClick={() => setActive(i)}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <h3>{r.title}</h3>
        <p className="route-flow">{r.flow}</p>
        <p>{r.detail}</p>
        <p>
          <b>Karar ölçüsü.</b> {r.measure}
        </p>
      </div>
    </section>
  );
}
export function SectorDevelopment({
  sector,
  choose,
  map,
  guide,
  intake,
  pilot,
  start,
}: {
  sector: Sector;
  choose: (id: string) => void;
  map: () => void;
  guide: () => void;
  intake: () => void;
  pilot: () => void;
  start: () => void;
}) {
  const d = growth[sector.id];
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  return (
    <article className="sector-story">
      <div className="story-cover">
        <img src={photograph(sector.id)} alt="" />
        <div className="story-intro">
          <div className="story-switch">
            <span>SEKTÖR GELİŞTİRME</span>
            <label>
              <select
                value={sector.id}
                aria-label="Sektör dosyası seç"
                onChange={(e) => choose(e.target.value)}
              >
                {sectorsInPrint.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
          <h1>{d.headline}</h1>
          <p>{sector.name} · Türkiye’den Avrupa pazarlarına</p>
        </div>
      </div>
      <div className="story-body">
        <nav className="story-index" aria-label="Dosya içeriği">
          <strong>Bu dosyada</strong>
          <button onClick={() => scroll("ulke-rehberi")}>
            Avrupa pazarları
          </button>
          {d.chapters.map((ch, i) => (
            <button key={ch.title} onClick={() => scroll("chapter-" + i)}>
              {ch.theme[0]}
            </button>
          ))}
          {sector.id === "tekstil" && (
            <button onClick={() => scroll("stock-example")}>
              Başabaş hesabı
            </button>
          )}
          <button onClick={() => scroll("pilot-plan")}>Pilot planı</button>
          <button onClick={map}>
            İlişki haritası <ArrowUpRight size={13} />
          </button>
        </nav>
        <div className="story-reading">
          <p className="standfirst">{d.opening}</p>
          <div className="market-pair">
            <div>
              <small>HEDEF ALICILAR</small>
              <p>{d.buyer}</p>
            </div>
            <div>
              <small>ALICIYA SUNULACAK TEKLİF</small>
              <p>{d.deliverable}</p>
            </div>
          </div>
          <MarketExplorer sector={sector.id} />
          {sector.id === "tekstil" && <RouteComparison />}
          {d.chapters.map((ch, i) => (
            <section
              className="story-chapter"
              id={"chapter-" + i}
              key={ch.title}
            >
              <small>{ch.theme[0].toLocaleUpperCase("tr")}</small>
              <h2>{ch.title}</h2>
              {ch.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {ch.refs.length > 0 && (
                <div className="source-row">
                  <small>Dayanak · 13 Kasım 2026</small>
                  {ch.refs.map((ref) => (
                    <a
                      href={references[ref][1]}
                      target="_blank"
                      rel="noreferrer"
                      key={ref}
                    >
                      {references[ref][0]} ↗
                    </a>
                  ))}
                </div>
              )}
              <details className="field-notes">
                <summary>Uygulama adımları</summary>
                <ul>
                  {ch.actions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </details>
            </section>
          ))}
          {sector.id === "tekstil" && (
            <div id="stock-example">
              <StockCase />
            </div>
          )}
          <section className="story-chapter" id="pilot-plan">
            <small>PAZARA GİRİŞ PLANI</small>
            <h2>İlk pilotu nasıl yürütürsünüz?</h2>
            <ol className="pilot-steps">
              {d.pilot.map((p, i) => (
                <li key={p}>
                  <b>
                    {
                      [
                        "Kapsamı belirleyin",
                        "Teklifleri eşitleyin",
                        "Sonucu ölçün",
                      ][i]
                    }
                  </b>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
            <div className="story-actions">
              <button onClick={start}>
                Bu sektörde dosya başlat <ArrowRight size={16} />
              </button>
              <button onClick={pilot}>
                Pilot haritası <ArrowUpRight size={16} />
              </button>
            </div>
          </section>
          <div className="discovery-entry">
            <div>
              <small>MÜŞTERİYİ TANIMA</small>
              <h3>Firmanızın ihtiyacını paylaşın</h3>
              <p>
                Sektörünüzü, hedef pazarınızı ve son sipariş veya projenizde
                karşılaştığınız sorunu başvurunuza ekleyin.
              </p>
            </div>
            <button onClick={intake}>
              Firma başvurusunu aç <ArrowRight size={16} />
            </button>
            <button onClick={guide}>
              Görüşme soruları <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
