"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { photograph, sectorsInPrint } from "../lib/editorial";
import { marketPilots } from "../lib/markets";
import { growth } from "../lib/growth";

const decisions: Record<string, [string, string]> = {
  celik: ["Şantiyeye hangi kapsamla teklif verilmeli?", "Çelik imalatçısı için ton fiyatı tablonun ilk satırıdır. Aynı metrajı bir kez fabrikada teslim, bir kez şantiyede montaj dâhil fiyatlayın. Vinç beklemesi ve çizim revizyonunun hangi tarafa ait olduğu iki teklifin sırasını değiştirebilir."],
  tekstil: ["İkinci sipariş için hangi bedenler yakında tutulmalı?", "Sezon başında tam parti gönderen üretici, sezon ortasında eksilen tek bedeni de tamamlayabilirse aynı alıcıyla yeniden çalışabilir. Bir distribütörün satış kaydından sık tükenen bedenleri ayırıp ikmal maliyetini doğrudan sevkle karşılaştırın."],
  enerji: ["İlk enerji teklifini hangi tesis verisi taşıyabilir?", "Aynı aylık faturaya sahip iki tesisin gündüz tüketimi farklı olabilir. Tekliften önce bir tesisin saatlik tüketimini ve çalışma takvimini isteyin. Çatı üretiminin tesiste kullanılabilecek bölümünü ve bağlantı koşullarını bu verilerle inceleyin."],
  gida: ["Aktarma noktası sağlam teslim edilen palete ne kazandırıyor?", "Bir soğuk depo teklifi ancak alıcının kabul edeceği raf ömrüyle birlikte okunabilir. Tek ürün için doğrudan sevk ile ara depolu güzergâhı karşılaştırın. Sıcaklık kaydını ve reddedilen miktarı aynı teslimatın maliyetine ekleyin."],
  makine: ["Yerel teknik ortak hangi duruşu kısaltabilir?", "Alıcı için hat çalışmadığı her vardiya kurulum teklifinin bir parçasıdır. Bir modül seçin, kabul testini alıcıyla yazın ve ilk arızada hangi parçanın kim tarafından kaç saatte değiştirilebileceğini yerel servisle doğrulayın."],
  hvac: ["Cihaz satışına hangi servis taahhüdü eklenebilir?", "Tek bir tesiste cihazın hangi koşulda ölçüleceğini ve arıza halinde ekibin nereden geleceğini belirleyin. Devreye alma ve garanti ziyaretlerini ayrıca fiyatlamak, distribütöre vereceğiniz hizmet sözünü hesaplanabilir kılar."],
};
export function SloveniaBrief({ open }: { open: (id: string) => void }) {
  const [id, choose] = useState("celik");
  const [question, context] = decisions[id];
  const [buyer, pilot, measure] = marketPilots[id].SI;
  return <section className="si-brief" aria-labelledby="si-brief-heading">
    <div className="si-hero"><div className="si-hero-copy">
      <p className="si-label">investors.com.tr / Slovenya</p>
      <h1 id="si-brief-heading">Slovenya<br/>Brifing Masası</h1>
      <p>Slovenya’da ve komşu pazarlarda iş geliştiren üreticiler için alıcı profilleri, sahada sınanacak teklifler ve yatırım kararından önce aranacak kanıtlar.</p>
      <a href="#sektor-brifingi" onClick={e=>{e.preventDefault();document.getElementById("sektor-brifingi")?.focus();}}>Sektör brifingini seç <ArrowRight size={18}/></a>
    </div><div className="si-hero-image"><img src={photograph("harbor")} alt="Konteyner sahası ve yükleme vinçlerine havadan bakış" /></div></div>
    <div className="si-reading page-gutter" id="sektor-brifingi" tabIndex={-1}>
      <div className="si-brief-bar"><h2>Sektör brifingi</h2><label>Sektör seçin <select value={id} onChange={e=>choose(e.target.value)}>{sectorsInPrint.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label></div>
      <div className="si-brief-grid" aria-live="polite"><div><p className="si-label">{buyer}</p><h3>{question}</h3><p>{context}</p><button className="plain-link" onClick={()=>open(id)}>Ayrıntılı analizi oku <ArrowRight size={17}/></button></div>
      <dl><div><dt>İlk saha denemesi</dt><dd>{pilot}</dd></div><div><dt>Kararı değiştirecek ölçüm</dt><dd>{measure}</dd></div><div><dt>Görüşmeye götürülecek teklif</dt><dd>{growth[id].deliverable}</dd></div></dl></div>
    </div>
  </section>;
}
