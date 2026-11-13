const chapters = [
  {
    title: "Slovenya’da krediye erişim",
    body: "Avusturyalı bir alıcı 60 gün vade isterken Türk üretici sevkten önce ödeme bekliyorsa Slovenya şirketinin finanse edeceği bir nakit açığı doğar. Bankayla siparişe bağlı işletme sermayesi limitini görüşün. Makine veya üretim hattı kuracaksanız yatırım kredisini ayrı değerlendirin. Sloven Girişim Fonu’nun KOBİ garantilerinde ilgili çağrının koşulları ve bankanın olumlu kredi kararı aranır. Yeni kurulan şirkete limit ve faiz, kuruluş belgesiyle otomatik tanımlanmaz.",
    action: "Bir siparişin avans, tedarikçi ödemesi ve tahsilat tarihlerini çıkarın. Bankadan ihtiyaç duyulan tutar için faiz, komisyon, teminat ve varsa ana şirket kefaletini içeren yazılı koşulları isteyin.",
    refs: [["Sloven Girişim Fonu · banka kredisi garantileri","https://www.podjetniskisklad.si/en/sef-role/financial-incentives/guarantees/"],["SID Bank · finansman seçenekleri","https://www.sid.si/financiranje/"]]
  },
  {
    title: "Banka ve alıcı nezdinde kredibilite",
    body: "Bir Avrupalı distribütör vadeli çalışmadan önce sözleşmeyi kimin imzalayacağını, siparişin kimin bilançosunda yer alacağını ve kusurlu üründe kime başvuracağını bilmek ister. Slovenya’da teslimat ve garanti sorumluluğunu fiilen üstlenen bir şirket bu soruları tek muhatapta toplayabilir. Bankalar açısından SISBIZ işletmelerin kredi yükümlülükleriyle ilgili bilgi sağlar. Türk ana şirketinin geçmişi yeni iştirakin kendi ödeme geçmişinden ayrı değerlendirilir.",
    action: "Alıcıya şirket sicil bilgilerini, imza yetkisini ve garanti muhatabını sunun. Banka dosyasında iştirakin gerçekleşen satışlarını, ana şirket referanslarını ve varsa yazılı desteğini ayrı gösterin.",
    refs: [["Slovenya Merkez Bankası · SISBIZ","https://www.bsi.si/en/central-credit-register/sisbiz"]]
  },
  {
    title: "Sigorta primini aynı siparişte karşılaştırmak",
    body: "Bir makineyi vadeli sattığınızda alıcının ödememesi ile makinenin taşınırken hasar görmesi iki ayrı risktir. Slovenya üzerinden satış, uygun işlemlerde yeni bir ihracat kredi sigortası seçeneği sunabilir. SID Bank’ın yabancı alıcı kredisi ürününde prim, alıcı ülkesinin ve alıcının riski, teminat yüzdesi ve süreye bağlıdır. Şirket adresi tek başına düşük prim sağlamaz. Ürüne göre Slovenya’dan sağlanan katkı gibi uygunluk koşulları da bulunur.",
    action: "Aynı alıcı, bedel, vade ve teminat yüzdesiyle iki teklif alın. Prim ve masrafların yanında size kalan zarar payını, istisnaları ve tazminatın ne zaman ödeneceğini karşılaştırın.",
    refs: [["SID Bank · alıcı kredisi sigortasında prim ve kapsam","https://www.sid.si/zavarovanje/zavarovanje-za-banke/izvozni-krediti-zavarovanje-kredita-tujega-kupca/"]]
  },
  {
    title: "Avrupa’da kamu ihalelerine katılım",
    body: "AB Adalet Divanının Kolin kararında, Hırvatistan’daki bir demiryolu ihalesine katılan Türk şirketi, ilgili uluslararası anlaşma kapsamında olmadığı için AB direktifine dayanarak eşit muamele talep edemedi. Bu, Türk firmalarına genel bir ihale yasağı anlamına gelmez. Slovenya’da fiilen faaliyet gösteren bir iştirak, kendi adına teklif verme olanağını belirli bir ilanda değerlendirebilir. Kuruluş yeri, mülkiyet veya kontrol, malın menşei, alt yüklenici kullanımı ve teknik yeterlik farklı koşullara tabi olabilir.",
    action: "Tek bir ihale numarası seçin. Şartnamede isteklinin uygunluğunu, cironun ve referansların kime ait olması gerektiğini, ana şirketin kapasitesine dayanmak için istenen taahhüdü ve teminatı işaretleyin. Belirsiz kalan maddeyi son tarihten önce idareye yazılı sorun.",
    refs: [["AB Adalet Divanı · Kolin, C-652/22","https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=ecli%3AECLI%3AEU%3AC%3A2024%3A910"],["AB · Uluslararası Kamu Alımları Aracı, madde 3","https://eur-lex.europa.eu/eli/reg/2022/1031"]]
  },
  {
    title: "Türkiye ile Orta Avrupa arasında dağıtım ve servis",
    body: "Slovenya şirketi bir yedek parçayı yakın stokta tutabilir, iadeyi teslim alabilir veya müşterinin kendi saat diliminde montajı koordine edebilir. Örneğin Graz’daki bir fabrikaya düzenli ikmalde ana partiyi Türkiye’den, acil parçayı Slovenya’daki sözleşmeli depodan göndermek iki farklı teslim ihtiyacını karşılar. Koper’in Graz ve Budapeşte yönünde demir yolu bağlantıları vardır. En uygun güzergâhı sevkiyat büyüklüğü ve müşterinin teslim noktası belirler.",
    action: "Tek bir ürün ve teslim adresi seçin. Türkiye’den doğrudan sevki yerel stokla karşılaştırırken taşıma, elleçleme, depolama, iade ve stoka bağlanan parayı maliyete ekleyin. Teslim süresini ve servis yanıtını ilk siparişte ölçün.",
    refs: [["Koper Limanı · demir yolu bağlantıları","https://www.luka-kp.si/en/services-terminals/port-connections/railway-connections/"]]
  },
  {
    title: "Sertifikalı üretim ve ürün uygunluğu",
    body: "Slovenya’da çelik konstrüksiyon üretmek isteyen bir firma önce imal edeceği parçayı ve kullanım amacını belirlemeli. Şirketin kalite yönetim belgesi, fabrikanın üretim kontrolü ve ürünün uygunluk beyanı farklı ihtiyaçları karşılar. İlgili kurallar gerektiriyorsa üretici teknik dosyayı ve beyanı hazırlar, gerekli kuruluş değerlendirmesini tamamlar ve CE işaretini ürüne iliştirir. CE, ürünün AB menşeli olduğunu göstermez. Üretim Türkiye’de, son işlem Slovenya’da yapılıyorsa iki tesisin sorumluluğunu ve belgelerin hangi tesisi kapsadığını açıklayın.",
    action: "Bir ürün çizimini, üretim adresini ve hedef kullanımı belirleyin. Uygulanacak teknik şartnameyi, gerekli testleri, fabrika üretim kontrolünü ve varsa yetkili kuruluşun kapsamını doğrulayın. İlk partiyi malzeme kaydından teslim tutanağına kadar izleyin.",
    refs: [["Avrupa Komisyonu · ürün kuralları ve CE rehberi","https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022XC0629(04)"],["AB · yapı ürünleri düzenlemesi","https://eur-lex.europa.eu/eli/reg/2024/3110/oj/eng"]]
  },
];

export function CompanyBrief() {
  return <article className="company-brief page-gutter">
    <header><p className="si-label">Slovenya / Şirket brifingi</p>
      <h1>Slovenya şirketiyle Avrupa’da iş geliştirmek</h1>
      <p>Türkiye’de üretilen bir ürünün Avrupa’da satışını büyütürken Slovenya şirketi hangi işi üstlenecek? Bir siparişi finanse etmek, yerel ihaleye teklif vermek ve sahada servis sunmak farklı kaynaklar gerektirir. Kendi işinize uyan başlığı açın.</p>
    </header>
    {chapters.map((chapter, index) => <details key={chapter.title} open={index === 0}>
      <summary>{chapter.title}</summary>
      <div className="company-reading"><p>{chapter.body}</p><div><h2>İlk adım</h2><p>{chapter.action}</p></div>
      <p className="company-sources">{chapter.refs.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</p></div>
    </details>)}
  </article>;
}
