"use client";
import { useState } from "react";
import { photograph } from "../lib/editorial";

const chapters = [
  {
    topic: "Finansman",
    scenario: "Alıcım vadeli ödeme istiyor",
    photo: "harbor",
    steps: [
      ["Tedarikçi ödemesi", "Üreticiye avans ve bakiye ödemelerinin tarihlerini yerleştirin."],
      ["Nakit açığı", "Alıcı avansını düşün. Tahsilata kadar kendi paranızla karşılamanız gereken en yüksek tutarı bulun."],
      ["Tahsilat", "Alıcının ödeme tarihini kredi vadesiyle eşleştirin. Gecikirse kaç günlük ek finansman gerekeceğini hesaplayın."],
    ],
    title: "Slovenya’da krediye erişim",
    body: "Avusturyalı bir alıcı 60 gün vade isterken Türk üretici sevkten önce ödeme bekliyorsa Slovenya şirketinin finanse edeceği bir nakit açığı doğar. Bankayla siparişe bağlı işletme sermayesi limitini görüşün. Makine veya üretim hattı kuracaksanız yatırım kredisini ayrı değerlendirin. Sloven Girişim Fonu’nun KOBİ garantilerinde ilgili çağrının koşulları ve bankanın olumlu kredi kararı aranır. Yeni kurulan şirkete limit ve faiz, kuruluş belgesiyle otomatik tanımlanmaz.",
    action: "Bir siparişin avans, tedarikçi ödemesi ve tahsilat tarihlerini çıkarın. Bankadan ihtiyaç duyulan tutar için faiz, komisyon, teminat ve varsa ana şirket kefaletini içeren yazılı koşulları isteyin.",
    refs: [["Sloven Girişim Fonu · banka kredisi garantileri","https://www.podjetniskisklad.si/en/sef-role/financial-incentives/guarantees/"],["SID Bank · finansman seçenekleri","https://www.sid.si/financiranje/"]]
  },
  {
    topic: "Kredibilite",
    scenario: "Yeni şirketime güven oluşturmak istiyorum",
    photo: "makine",
    steps: [
      ["Şirket kaydı", "Yetkili imzacı, sözleşme tarafı ve garanti muhatabını aynı dosyada gösterin."],
      ["Ödeme geçmişi", "İştirakin kendi teslimatlarını ve tahsilatlarını belgeleyin. Ana şirketten gelen desteğin kapsamını yazın."],
      ["Alıcı incelemesi", "Alıcıdan vadeli çalışmaya geçmeden önce hangi referansları ve mali bilgileri görmek istediğini öğrenin."],
    ],
    title: "Banka ve alıcı nezdinde kredibilite",
    body: "Bir Avrupalı distribütör vadeli çalışmadan önce sözleşmeyi kimin imzalayacağını, siparişin kimin bilançosunda yer alacağını ve kusurlu üründe kime başvuracağını bilmek ister. Slovenya’da teslimat ve garanti sorumluluğunu fiilen üstlenen bir şirket bu soruları tek muhatapta toplayabilir. Bankalar açısından SISBIZ işletmelerin kredi yükümlülükleriyle ilgili bilgi sağlar. Türk ana şirketinin geçmişi yeni iştirakin kendi ödeme geçmişinden ayrı değerlendirilir.",
    action: "Alıcıya şirket sicil bilgilerini, imza yetkisini ve garanti muhatabını sunun. Banka dosyasında iştirakin gerçekleşen satışlarını, ana şirket referanslarını ve varsa yazılı desteğini ayrı gösterin.",
    refs: [["Slovenya Merkez Bankası · SISBIZ","https://www.bsi.si/en/central-credit-register/sisbiz"]]
  },
  {
    topic: "Sigorta",
    scenario: "Alacağımı sigortalamak istiyorum",
    photo: "tekstil",
    steps: [
      ["Risk tanımı", "Alıcıyı, ülkeyi, vadeyi ve sigortalanacak alacak tutarını tanımlayın."],
      ["Eşdeğer teklifler", "Aynı vade ve teminat yüzdesi için yazılı fiyat isteyin. Prim, masraf ve kapsam dışı durumları yan yana koyun."],
      ["Hasar halinde", "Ödenmeyen bir faturada ihbar tarihini, bekleme süresini ve size kalan kaybı poliçede bulun."],
    ],
    title: "Sigorta primini aynı siparişte karşılaştırmak",
    body: "Bir makineyi vadeli sattığınızda alıcının ödememesi ile makinenin taşınırken hasar görmesi iki ayrı risktir. Slovenya üzerinden satış, uygun işlemlerde yeni bir ihracat kredi sigortası seçeneği sunabilir. SID Bank’ın yabancı alıcı kredisi ürününde prim, alıcı ülkesinin ve alıcının riski, teminat yüzdesi ve süreye bağlıdır. Şirket adresi tek başına düşük prim sağlamaz. Ürüne göre Slovenya’dan sağlanan katkı gibi uygunluk koşulları da bulunur.",
    action: "Aynı alıcı, bedel, vade ve teminat yüzdesiyle iki teklif alın. Prim ve masrafların yanında size kalan zarar payını, istisnaları ve tazminatın ne zaman ödeneceğini karşılaştırın.",
    refs: [["SID Bank · alıcı kredisi sigortasında prim ve kapsam","https://www.sid.si/zavarovanje/zavarovanje-za-banke/izvozni-krediti-zavarovanje-kredita-tujega-kupca/"]]
  },
  {
    topic: "İhaleler",
    scenario: "Avrupa’da bir ihaleye girmek istiyorum",
    photo: "celik",
    steps: [
      ["İlan seçimi", "Bir ilan numarası ve iş paketi seçin. Teklif sahibinden istenen belgeleri çıkarın."],
      ["Yeterlik", "Slovenya şirketinin hangi koşulları kendisinin karşıladığını ve hangi kapasiteyi ortağından sağlayacağını belgeleyin."],
      ["Teklif kararı", "Kalan belirsizlikleri idareye süresinde sorun. Yazılı açıklama, teminat ve maliyet üzerinden teklif kararını verin."],
    ],
    title: "Avrupa’da kamu ihalelerine katılım",
    body: "AB Adalet Divanının Kolin kararında, Hırvatistan’daki bir demiryolu ihalesine katılan Türk şirketi, ilgili uluslararası anlaşma kapsamında olmadığı için AB direktifine dayanarak eşit muamele talep edemedi. Bu, Türk firmalarına genel bir ihale yasağı anlamına gelmez. Slovenya’da fiilen faaliyet gösteren bir iştirak, kendi adına teklif verme olanağını belirli bir ilanda değerlendirebilir. Kuruluş yeri, mülkiyet veya kontrol, malın menşei, alt yüklenici kullanımı ve teknik yeterlik farklı koşullara tabi olabilir.",
    action: "Tek bir ihale numarası seçin. Şartnamede isteklinin uygunluğunu, cironun ve referansların kime ait olması gerektiğini, ana şirketin kapasitesine dayanmak için istenen taahhüdü ve teminatı işaretleyin. Belirsiz kalan maddeyi son tarihten önce idareye yazılı sorun.",
    refs: [["AB Adalet Divanı · Kolin, C-652/22","https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=ecli%3AECLI%3AEU%3AC%3A2024%3A910"],["AB · Uluslararası Kamu Alımları Aracı, madde 3","https://eur-lex.europa.eu/eli/reg/2022/1031"]]
  },
  {
    topic: "Dağıtım",
    scenario: "Teslimatı ve servisi hızlandırmak istiyorum",
    photo: "harbor",
    steps: [
      ["Türkiye", "Aynı parça için doğrudan sevkin fiyatını ve teslim süresini kaydedin."],
      ["Slovenya", "Yerel stok, elleçleme ve servis maliyetini sipariş başına hesaplayın."],
      ["Orta Avrupa", "Bir alıcı adresinde iki güzergâhı karşılaştırın. Acil parçanın teslim zamanını ve iade maliyetini ölçün."],
    ],
    title: "Türkiye ile Orta Avrupa arasında dağıtım ve servis",
    body: "Slovenya şirketi bir yedek parçayı yakın stokta tutabilir, iadeyi teslim alabilir veya müşterinin kendi saat diliminde montajı koordine edebilir. Örneğin Graz’daki bir fabrikaya düzenli ikmalde ana partiyi Türkiye’den, acil parçayı Slovenya’daki sözleşmeli depodan göndermek iki farklı teslim ihtiyacını karşılar. Koper’in Graz ve Budapeşte yönünde demir yolu bağlantıları vardır. En uygun güzergâhı sevkiyat büyüklüğü ve müşterinin teslim noktası belirler.",
    action: "Tek bir ürün ve teslim adresi seçin. Türkiye’den doğrudan sevki yerel stokla karşılaştırırken taşıma, elleçleme, depolama, iade ve stoka bağlanan parayı maliyete ekleyin. Teslim süresini ve servis yanıtını ilk siparişte ölçün.",
    refs: [["Koper Limanı · demir yolu bağlantıları","https://www.luka-kp.si/en/services-terminals/port-connections/railway-connections/"]]
  },
  {
    topic: "Üretim",
    scenario: "Avrupa için sertifikalı üretim planlıyorum",
    photo: "makine",
    steps: [
      ["Ürün tanımı", "Tek bir parça, üretim tesisi ve hedef kullanım belirleyin."],
      ["Üretim kontrolü", "Geçerli teknik şartnameye göre kontrol planını, test kayıtlarını ve değerlendirmede görev alacak tarafları belirleyin."],
      ["İlk parti", "Malzeme ve test kayıtlarını teslim edilen partiyle eşleştirin. Gereken beyan ve belgeleri müşteriye sunun."],
    ],
    title: "Sertifikalı üretim ve ürün uygunluğu",
    body: "Slovenya’da çelik konstrüksiyon üretmek isteyen bir firma önce imal edeceği parçayı ve kullanım amacını belirlemeli. Şirketin kalite yönetim belgesi, fabrikanın üretim kontrolü ve ürünün uygunluk beyanı farklı ihtiyaçları karşılar. İlgili kurallar gerektiriyorsa üretici teknik dosyayı ve beyanı hazırlar, gerekli kuruluş değerlendirmesini tamamlar ve CE işaretini ürüne iliştirir. CE, ürünün AB menşeli olduğunu göstermez. Üretim Türkiye’de, son işlem Slovenya’da yapılıyorsa iki tesisin sorumluluğunu ve belgelerin hangi tesisi kapsadığını açıklayın.",
    action: "Bir ürün çizimini, üretim adresini ve hedef kullanımı belirleyin. Uygulanacak teknik şartnameyi, gerekli testleri, fabrika üretim kontrolünü ve varsa yetkili kuruluşun kapsamını doğrulayın. İlk partiyi malzeme kaydından teslim tutanağına kadar izleyin.",
    refs: [["Avrupa Komisyonu · ürün kuralları ve CE rehberi","https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022XC0629(04)"],["AB · yapı ürünleri düzenlemesi","https://eur-lex.europa.eu/eli/reg/2024/3110/oj/eng"]]
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
          <div><h3>Brifing</h3><p>{chapter.body}</p></div>
          <aside><h3>İlk adım</h3><p>{chapter.action}</p></aside>
          <div className="venture-refs"><h3>Resmî kaynaklar</h3>
            {chapter.refs.map(([label,url]) => <a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}
          </div>
        </div>
      </section>
    </div>
  </article>;
}
