"use client";
import { useState } from "react";
import { photograph } from "../lib/editorial";

const chapters = [
  {
    topic: "Finansman",
    scenario: "Kredi erişimini şirketin nakit akışı belirliyor",
    photo: "harbor",
    steps: [
  [
    "Tedarikçi ödemesi",
    "Avans ve bakiye ödeme tarihleri, siparişin ne zaman nakit gerektirdiğini gösterir."
  ],
  [
    "Nakit açığı",
    "Alıcıdan gelen avans düşüldüğünde kalan ödeme ihtiyacı, finansman tutarını etkiler."
  ],
  [
    "Tahsilat",
    "Alıcının ödeme süresindeki uzama, işletme sermayesine duyulan ihtiyacı artırabilir."
  ]
],
    title: "Slovenya’da krediye erişim",
    body: "Sloven Girişim Fonu, uygun KOBİ yatırımları için banka kredisi garantileri sunuyor. Süreç, ilgili çağrının koşullarını ve bankanın olumlu kredi kararını içeriyor. Şirketin Slovenya’da kayıtlı olması, bankanın gelir, borç, teminat ve geri ödeme kapasitesi değerlendirmesinin yalnızca bir parçası. Vadeli satış yapan bir işletmede finansman ihtiyacını tedarikçiye ödeme ile alıcıdan tahsilat arasındaki süre belirliyor.",
    outlook: "Düzenli siparişler ve öngörülebilir tahsilatlar oluşursa yerel finansman ilişkisi geliştirmek kolaylaşabilir. Talep zayıflar veya tahsilat süresi uzarsa aynı satış hacmi daha fazla işletme sermayesi gerektirebilir. Bu nedenle kredi teklifinin toplam maliyeti ve şirketin taşıyabileceği nakit açığı birlikte değerlendirilmelidir.",
    action: "Banka teklifindeki faiz, komisyon ve teminat koşulları. Sipariş avansları, ortalama tahsilat süresi ve en yüksek nakit açığı.",
    refs: [["Sloven Girişim Fonu · banka kredisi garantileri","https://www.podjetniskisklad.si/en/sef-role/financial-incentives/guarantees/"],["SID Bank · finansman seçenekleri","https://www.sid.si/financiranje/"]]
  },
  {
    topic: "Kredibilite",
    scenario: "Ticari güven, belgelenen faaliyetle oluşuyor",
    photo: "makine",
    steps: [
  [
    "Şirket kaydı",
    "Şirket sicili ve imza yetkisi, sözleşmenin tarafını tanımlar."
  ],
  [
    "Ödeme geçmişi",
    "Gerçekleşen teslimat ve ödemeler, işletmenin faaliyet kaydını oluşturur."
  ],
  [
    "Alıcı incelemesi",
    "Alıcının istediği referanslar ve hizmet koşulları, yerel şirketin sağlayabileceği katkıyı belirler."
  ]
],
    title: "Banka ve alıcı nezdinde kredibilite",
    body: "SISBIZ, Slovenya’da kredi veren kuruluşların işletmelere ilişkin bilgilere eriştiği bir sistem. Banka değerlendirmesiyle alıcının tedarikçi değerlendirmesi farklı süreçler üzerinden ilerliyor. Alıcı açısından sözleşmenin tarafı, teslimat geçmişi ve garanti hizmetinin kim tarafından sağlandığı önem taşıyabilir. Yeni iştirakin kendi faaliyet kaydı ile ana şirketin referansları farklı kanıtlar sunar.",
    outlook: "Yerel ekip ve servis kapasitesi, bunları satın alma koşulu olarak arayan müşterilerde iş ilişkisini kolaylaştırabilir. Şirketin faaliyet hacmi sınırlı kaldığında yerel operasyonun sabit gideri sipariş başına daha yüksek olur. Ticari güven üzerindeki etki, alıcının kabul koşulları ve tekrar siparişleri üzerinden izlenebilir.",
    action: "Tedarikçi kabulünde istenen belgeler, ilk siparişten tekrar siparişe geçiş, garanti yanıt süresi ve yerel operasyon gideri.",
    refs: [["Slovenya Merkez Bankası · SISBIZ","https://www.bsi.si/en/central-credit-register/sisbiz"]]
  },
  {
    topic: "Sigorta",
    scenario: "Sigorta maliyeti, alıcı ve işlem riskine bağlı",
    photo: "tekstil",
    steps: [
  [
    "Risk tanımı",
    "Alıcı, ülke ve vade, sigortalanacak işlemin risk profilini oluşturur."
  ],
  [
    "Eşdeğer teklifler",
    "Aynı kapsam ve teminat yüzdesiyle verilen teklifler karşılaştırılabilir bir maliyet zemini sağlar."
  ],
  [
    "Hasar halinde",
    "Bekleme süresi ve sigortalının üzerinde kalan zarar, poliçenin fiilî korumasını etkiler."
  ]
],
    title: "Sigorta primini aynı siparişte karşılaştırmak",
    body: "SID Bank’ın yabancı alıcı kredisi sigortasında prim, alıcı ülkesinin risk sınıfına, alıcının riskine, teminat yüzdesine ve süreye bağlı. İlgili üründe iki yıl ve üzeri geri ödeme vadeleri için Slovenya katkısı dâhil ek koşullar yer alıyor. Bir Slovenya şirketi için uygun sigorta kanalının belirlenmesi, ihracatın niteliği ve poliçe kapsamının incelenmesini gerektiriyor.",
    outlook: "Uygun bir poliçe tahsilat riskinin bir bölümünü sigortacıya aktarabilir ve finansman görüşmesine katkı sağlayabilir. Prim, kapsam dışında kalan riskler ve tazminat bekleme süresi toplam maliyeti artırabilir. İki ülke arasında maliyet avantajı, aynı alıcı ve aynı teminat koşullarına ait yazılı teklifler elde edildiğinde değerlendirilebilir.",
    action: "Aynı vade ve kapsam için prim, komisyon, sigortalının taşıdığı zarar payı, alıcı limiti ve tazminat süresi.",
    refs: [["SID Bank · alıcı kredisi sigortasında prim ve kapsam","https://www.sid.si/zavarovanje/zavarovanje-za-banke/izvozni-krediti-zavarovanje-kredita-tujega-kupca/"]]
  },
  {
    topic: "İhaleler",
    scenario: "İhale erişimi, katılım ve yeterlik koşullarına bağlı",
    photo: "celik",
    steps: [
  [
    "İlan seçimi",
    "Belirli bir ihale, uygulanacak koşulların ve iş paketinin incelenmesini sağlar."
  ],
  [
    "Yeterlik",
    "Teknik kapasite, referanslar ve mali yeterlik, teklif sahibinin uygunluğuna ilişkin kanıtları oluşturur."
  ],
  [
    "Teklif kararı",
    "Kabul koşulları, teminat ve sözleşme riski birlikte ele alındığında teklifin uygulanabilirliği değerlendirilir."
  ]
],
    title: "Avrupa’da kamu ihalelerine katılım",
    body: "AB Adalet Divanının 2024 tarihli Kolin kararı, ilgili uluslararası anlaşmanın kapsamı dışında kalan üçüncü ülke isteklilerinin AB ihale direktifinden eşit muamele hakkı talep etmesini ele alıyor. Bir Slovenya iştirakinin katılımı ise ilgili ihale ve uygulanabilir kurallar üzerinden incelenmeli. İsteklinin kuruluşu, malın menşei, teknik yeterlik, ortaklık yapısı ve başka bir kuruluşun kapasitesine dayanma koşulları değerlendirmeyi etkileyebilir.",
    outlook: "Fiilî faaliyet ve yeterli teknik kapasite geliştiren bir iştirak, uygun olduğu ihaleler için teklif hazırlayabilir. Ana şirketin deneyiminin kabulü, teminat ihtiyacı ve yerel yükümlülükler katılımın maliyetini değiştirebilir. İlan sayısındaki artışın ticari fırsata dönüşmesi, firmanın yeterlik koşullarını ve proje riskini karşılayabilmesine bağlıdır.",
    action: "İlgili ilanın katılım şartları, referans kabulü, idarenin yazılı açıklamaları, teminat tutarı ve teklif hazırlama maliyeti.",
    refs: [["AB Adalet Divanı · Kolin, C-652/22","https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=ecli%3AECLI%3AEU%3AC%3A2024%3A910"],["AB · Uluslararası Kamu Alımları Aracı, madde 3","https://eur-lex.europa.eu/eli/reg/2022/1031"]]
  },
  {
    topic: "Dağıtım",
    scenario: "Bölgesel stok, hizmet düzeyi ile maliyet arasında denge gerektiriyor",
    photo: "harbor",
    steps: [
  [
    "Türkiye",
    "Üretim çıkışındaki fiyat ve sevkiyat koşulları karşılaştırmanın başlangıcını oluşturur."
  ],
  [
    "Slovenya",
    "Aktarma, stok ve servis hizmetleri ek kapasiteyle birlikte ek maliyet getirir."
  ],
  [
    "Orta Avrupa",
    "Alıcıya ulaşan teslimatın süresi ve toplam maliyeti, güzergâhın ticari sonucunu gösterir."
  ]
],
    title: "Türkiye ile Orta Avrupa arasında dağıtım ve servis",
    body: "Koper Limanı’nın yayımladığı bağlantılar, Slovenya’yı Avusturya ve Macaristan dâhil bölgedeki merkezlere bağlıyor. Bu ağ bir dağıtım seçeneği sunuyor. Ürünün hacmi, teslim adresi, aktarma ihtiyacı ve taşıyıcının koşulları işletme açısından sonucun ne olacağını belirliyor. Yakın stok ve yerel servis, özellikle acil yedek parça veya sık ikmal ihtiyacı bulunan siparişlerde değerlendirilebilir.",
    outlook: "Siparişler sıklaşır ve müşteriler kısa teslim süresine değer verirse bölgesel stokun ticari katkısı artabilir. Talep dalgalandığında stokta bekleme, değer kaybı ve finansman gideri yükselir. Doğrudan sevk ile ara depolu modelin sonucu, aynı ürün ve teslim adresinde ölçülen toplam maliyete bağlıdır.",
    action: "Gerçekleşen teslim süresi, stok devir hızı, elleçleme ve iade gideri, servis yanıt süresi ve sipariş başına katkı.",
    refs: [["Koper Limanı · demir yolu bağlantıları","https://www.luka-kp.si/en/services-terminals/port-connections/railway-connections/"]]
  },
  {
    topic: "Üretim",
    scenario: "Üretim yatırımı, uygunluk ve kapasite kullanımına birlikte dayanıyor",
    photo: "makine",
    steps: [
  [
    "Ürün tanımı",
    "Kullanım amacı ve üretim yeri, ürün için incelenecek şartların belirlenmesine yardımcı olur."
  ],
  [
    "Üretim kontrolü",
    "Test, malzeme ve işlem kayıtları uygunluğun izlenmesini sağlar."
  ],
  [
    "İlk parti",
    "Müşteri kabulü ve üretim kayıtları, planlanan sürecin sahada nasıl işlediğini gösterir."
  ]
],
    title: "Sertifikalı üretim ve ürün uygunluğu",
    body: "AB ürün kurallarında yükümlülükler, ürünün niteliğine ve firmanın üretici veya ithalatçı olarak üstlendiği role göre belirleniyor. CE işareti, ilgili kurallar kapsamındaki ürünün uygunluk süreciyle ilişkili. Kalite yönetim belgesi, ürün beyanı ve fabrika üretim kontrolü farklı kapsamlar taşıyor. Türkiye ve Slovenya’daki tesislerin birlikte çalıştığı bir modelde üretim aşamaları, sorumluluklar ve izlenebilirlik kayıtları açıkça tanımlanmalı.",
    outlook: "Belgelendirme ve izlenebilirlik, bunları arayan alıcıların tedarikçi değerlendirmesini destekleyebilir. Test, denetim ve kayıt yükü üretim maliyetine eklenir. Yerel üretimin ekonomik sonucu, doğrulanmış talep, kapasite kullanımı, işçilik, enerji ve lojistik giderlerinin birlikte değerlendirilmesiyle ortaya çıkar.",
    action: "Ürüne uygulanacak kurallar, test ve denetim maliyeti, ilk partide uygunsuzluk oranı, kapasite kullanımı ve müşteri kabulü.",
    refs: [["Avrupa Komisyonu · ürün kuralları ve CE rehberi","https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/ce-marking/index_en.htm"],["AB · yapı ürünleri düzenlemesi","https://eur-lex.europa.eu/eli/reg/2024/3110/oj/eng"]]
  },
];

export function CompanyBrief() {
  const [topic, setTopic] = useState(0);
  const [stage, setStage] = useState(0);
  const chapter = chapters[topic];

  function selectTopic(index: number) {
    setTopic(index);
    setStage(0);
  }

  return <article className="venture">
    <div className="venture-cover">
      <img src={photograph("harbor")} alt="" />
      <div className="venture-cover-copy">
        <p className="si-label">Slovenya / Şirket brifingi</p>
        <h1>Slovenya şirketiyle<br />Avrupa’da iş geliştirmek</h1>
      </div>
    </div>
    <div className="venture-workspace page-gutter">
      <div className="venture-index">
        <h2>Hangi konuyu incelemek istiyorsunuz?</h2>
        <div className="venture-options" role="group" aria-label="Brifing konuları">
          {chapters.map((item, index) => <button key={item.topic} type="button"
            aria-pressed={topic === index} aria-controls="venture-panel" onClick={() => selectTopic(index)}>
            {item.topic}<span aria-hidden="true">↗</span>
          </button>)}
        </div>
      </div>
      <section id="venture-panel" aria-labelledby="venture-title">
        <div className="venture-scene" key={chapter.topic}>
          <img className="venture-image" src={photograph(chapter.photo)} alt="" />
          <div className="venture-scene-content">
            <p className="si-label">{chapter.title}</p>
            <h2 id="venture-title">{chapter.scenario}</h2>
            <div className="venture-steps" role="group" aria-label="İş akışının adımları">
              {chapter.steps.map(([label], index) => <button key={label} type="button"
                aria-pressed={stage === index} aria-controls="venture-step-note" onClick={() => setStage(index)}>
                <span aria-hidden="true" className="venture-stop" />{label}
              </button>)}
            </div>
            <div id="venture-step-note" aria-live="polite" aria-atomic="true">
              <p key={stage}>{chapter.steps[stage][1]}</p>
            </div>
          </div>
        </div>
        <div className="venture-reading" key={chapter.title}>
          <div><h3>Mevcut durum</h3><p>{chapter.body}</p></div>
          <aside><h3>İzlenecek göstergeler</h3><p>{chapter.action}</p></aside>
          <div className="venture-outlook"><h3>Koşullara bağlı öngörü</h3><p>{chapter.outlook}</p><small>investors.com.tr editoryal değerlendirmesi · 14 Kasım 2026</small></div>
          <div className="venture-refs"><h3>Resmî kaynaklar</h3>
            {chapter.refs.map(([label,url]) => <a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}
          </div>
        </div>
      </section>
    </div>
  </article>;
}
