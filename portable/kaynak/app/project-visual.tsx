import { useState } from "react";
import { photograph } from "../lib/editorial";

const offers = [
  { label: "Teslim", image: "harbor", title: "Türkiye’den ürün teslimi", scope: "İmalat → taşıma → teslim noktası", check: "Metrajı, taşıma bedelini ve teslimde riski kimin devralacağını yazılı teyit edin." },
  { label: "Montaj", image: "celik", title: "Slovenya’dan saha hizmeti", scope: "Keşif → montaj → saha kabulü", check: "Ekibin çalışma takvimini, şantiye erişimini ve garanti ziyaretlerini fiyatlayın." },
  { label: "EPC", image: "makine", title: "Ana yüklenici olarak proje teslimi", scope: "Mühendislik → satın alma → yapım ve devreye alma", check: "Performans testinin kabul ölçütünü, gecikme sorumluluğunu ve teminat ihtiyacını inceleyin." },
];

export function OfferComparison() {
  const [selected, setSelected] = useState(0);
  const offer = offers[selected];
  return <section className="offer-visual" aria-labelledby="offer-heading">
    <h3 id="offer-heading">Hangi kapsamla teklif vereceksiniz?</h3>
    <div className="offer-switch" role="group" aria-label="Teklif kapsamı">
      {offers.map((item, i) => <button type="button" key={item.label}
        aria-pressed={i === selected} onClick={() => setSelected(i)}>{item.label}</button>)}
    </div>
    <div className="offer-view" aria-live="polite">
      <img src={photograph(offer.image)} alt="" />
      <div><h4>{offer.title}</h4><p className="offer-scope">{offer.scope}</p><p>{offer.check}</p></div>
    </div>
  </section>;
}

export function ReceivableFigure() {
  return <figure className="receivable-figure">
    <figcaption>100.000 € tutarındaki örnek sipariş</figcaption>
    <div className="receivable-bar" aria-hidden="true"><span>30%</span><span>50%</span><span>20%</span></div>
    <dl>
      <div><dt>Alınan avans</dt><dd>30.000 €</dd></div>
      <div><dt>Yazılı sigorta limiti</dt><dd>50.000 €</dd></div>
      <div><dt>Limit dışı alacak</dt><dd>20.000 €</dd></div>
    </dl>
    <p>Teslimden sonra tahsil edilecek tutar 70.000 €. Poliçedeki muafiyet ve tazmin oranı, limit içindeki tutarın ne kadarının ödeneceğini belirler.</p>
  </figure>;
}
